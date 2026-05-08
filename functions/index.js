"use strict";

const { initializeApp } = require("firebase-admin/app");
const { getDatabase } = require("firebase-admin/database");
const { logger, setGlobalOptions } = require("firebase-functions/v2");
const { onRequest } = require("firebase-functions/v2/https");
const { onSchedule } = require("firebase-functions/v2/scheduler");

const EDUPAGE_BASE_URL = process.env.EDUPAGE_BASE_URL || "https://pdpuniversity.edupage.org";
const FIREBASE_DATABASE_URL =
  process.env.FIREBASE_DATABASE_URL || "https://time-table-3327d-default-rtdb.firebaseio.com";
const FIREBASE_TIMETABLE_PATH = process.env.FIREBASE_TIMETABLE_PATH || "timetable";
const FIREBASE_METADATA_PATH = process.env.FIREBASE_METADATA_PATH || "metadata";
const APP_TIMEZONE = process.env.APP_TIMEZONE || "Asia/Tashkent";
const REFRESH_TOKEN = process.env.REFRESH_TOKEN || "";
const REGION = process.env.FUNCTION_REGION || "us-central1";

initializeApp({ databaseURL: FIREBASE_DATABASE_URL });
setGlobalOptions({ region: REGION, maxInstances: 10 });

const FIREBASE_KEY_UNSAFE = /[.#$\[\]/\u0000-\u001f\u007f]/g;

function cleanName(value, fallback = "") {
  return String(value ?? fallback).replace(/\s+/g, " ").trim();
}

function firebaseKey(value) {
  return cleanName(value)
    .replace(FIREBASE_KEY_UNSAFE, "-")
    .replace(/\s+/g, "_");
}

function numericId(value) {
  const number = Number(String(value ?? "").replace(/^\*/, ""));
  return Number.isFinite(number) ? number : Number.MAX_SAFE_INTEGER;
}

function roomSortName(value) {
  return cleanName(value?.room || value?.name || value?.short || value?.roomKey || value?.id || value || "");
}

function roomSortParts(value) {
  const numbers = [...roomSortName(value).matchAll(/\d+/g)].map((match) => Number(match[0]));
  const number = numbers.find((candidate) => candidate >= 100) ?? numbers[0];

  if (!Number.isFinite(number)) {
    return { floor: Number.MAX_SAFE_INTEGER, number: Number.MAX_SAFE_INTEGER };
  }

  return {
    floor: number >= 100 ? Math.floor(number / 100) : Number.MAX_SAFE_INTEGER - 1,
    number
  };
}

function roomFloor(value) {
  const { floor } = roomSortParts(value);
  return floor >= Number.MAX_SAFE_INTEGER - 1 ? null : floor;
}

function roomFloorLabel(value) {
  const floor = roomFloor(value);
  if (!floor) return "Floor unknown";
  return `${floor}${floor === 1 ? "st" : floor === 2 ? "nd" : floor === 3 ? "rd" : "th"} floor`;
}

function sortByRoomFloor(a, b) {
  const nameA = roomSortName(a);
  const nameB = roomSortName(b);
  const partsA = roomSortParts(nameA);
  const partsB = roomSortParts(nameB);

  return (
    partsA.floor - partsB.floor ||
    partsA.number - partsB.number ||
    nameA.localeCompare(nameB, "en", { numeric: true, sensitivity: "base" })
  );
}

function tableRows(accessorResult, tableId) {
  return accessorResult.tables.find((table) => table.id === tableId)?.data_rows ?? [];
}

function rowsById(rows) {
  return new Map(rows.map((row) => [row.id, row]));
}

function selectedBitIndexes(bits, fallbackLength) {
  if (!bits) return [];
  const selected = [];

  String(bits).split("").forEach((char, index) => {
    if (char === "1") selected.push(index);
  });

  if (!selected.length && /^1+$/.test(String(bits))) {
    return Array.from({ length: fallbackLength }, (_, index) => index);
  }

  return selected;
}

function teacherName(row) {
  if (!row) return "";
  return cleanName(row.short || [row.firstname, row.lastname].filter(Boolean).join(" "));
}

function roomKey(row) {
  return firebaseKey(row.name || row.short || row.id);
}

async function rpc(path, func, args, baseUrl = EDUPAGE_BASE_URL) {
  const url = new URL(path, baseUrl);
  url.searchParams.set("__func", func);

  const response = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      __args: args,
      __gsh: "00000000",
      __client_redirect: null
    })
  });

  if (!response.ok) {
    throw new Error(`EduPage RPC ${func} failed with HTTP ${response.status}`);
  }

  const payload = await response.json();
  if (payload.e) throw new Error(payload.em || payload.e);
  return payload.r;
}

async function fetchEdupageProps(baseUrl = EDUPAGE_BASE_URL) {
  const response = await fetch(new URL("/timetable/", baseUrl));
  if (!response.ok) {
    throw new Error(`EduPage timetable page failed with HTTP ${response.status}`);
  }

  const html = await response.text();
  const match = html.match(/ASC\.req_props=(\{[\s\S]*?\});ASC\.bundle_v/);
  if (!match) {
    throw new Error("Could not locate ASC.req_props in the EduPage timetable page");
  }

  return JSON.parse(match[1]);
}

async function fetchTimetableListing(baseUrl = EDUPAGE_BASE_URL) {
  const props = await fetchEdupageProps(baseUrl);
  const listing = await rpc(
    "/timetable/server/ttviewer.js",
    "getTTViewerData",
    [null, props.year_auto],
    baseUrl
  );

  return { props, listing };
}

async function fetchRegularTimetable(ttNum, baseUrl = EDUPAGE_BASE_URL) {
  return rpc(
    "/timetable/server/regulartt.js",
    "regularttGetData",
    [null, String(ttNum)],
    baseUrl
  );
}

async function fetchLatestTimetable(baseUrl = EDUPAGE_BASE_URL) {
  const { props, listing } = await fetchTimetableListing(baseUrl);
  const timetableInfo = listing.regular?.timetables?.[0];

  if (!timetableInfo?.tt_num) {
    throw new Error("No public regular timetable is published on EduPage");
  }

  const regular = await fetchRegularTimetable(timetableInfo.tt_num, baseUrl);
  return normalizeTimetable({
    accessorResult: regular.dbiAccessorRes,
    props,
    timetableInfo,
    rights: regular.rights ?? {},
    sourceUrl: baseUrl
  });
}

function normalizeTimetable({ accessorResult, props, timetableInfo, rights = {}, sourceUrl = EDUPAGE_BASE_URL }) {
  const days = tableRows(accessorResult, "days").sort((a, b) => numericId(a.id) - numericId(b.id));
  const periods = tableRows(accessorResult, "periods").sort(
    (a, b) => Number(a.period || a.id) - Number(b.period || b.id)
  );
  const classrooms = tableRows(accessorResult, "classrooms").sort(sortByRoomFloor);
  const subjects = rowsById(tableRows(accessorResult, "subjects"));
  const teachers = rowsById(tableRows(accessorResult, "teachers"));
  const classes = rowsById(tableRows(accessorResult, "classes"));
  const lessons = rowsById(tableRows(accessorResult, "lessons"));
  const cards = tableRows(accessorResult, "cards");
  const globals = tableRows(accessorResult, "globals")[0] ?? {};

  const roomById = rowsById(classrooms);
  const timetable = {};

  for (const classroom of classrooms) {
    const key = roomKey(classroom);
    timetable[key] = {
      _room: {
        id: classroom.id,
        name: cleanName(classroom.name || classroom.short || classroom.id),
        short: cleanName(classroom.short || classroom.name || classroom.id),
        color: classroom.color || ""
      }
    };

    for (const day of days) {
      timetable[key][day.name] = {};
      for (const period of periods) {
        timetable[key][day.name][period.name] = {
          period: period.period || period.id,
          start: period.starttime,
          end: period.endtime,
          status: "free"
        };
      }
    }
  }

  const periodIndexById = new Map();
  periods.forEach((period, index) => {
    periodIndexById.set(String(period.period || period.id), index);
    periodIndexById.set(String(period.id), index);
  });

  for (const card of cards) {
    if (!card.days || !Array.isArray(card.classroomids) || !card.classroomids.length) continue;

    const lesson = lessons.get(card.lessonid);
    if (!lesson) continue;

    const startPeriodIndex = periodIndexById.get(String(card.period));
    if (startPeriodIndex === undefined) continue;

    const duration = Math.max(1, Number(lesson.durationperiods || 1));
    const endPeriod = periods[Math.min(periods.length - 1, startPeriodIndex + duration - 1)];
    const startPeriod = periods[startPeriodIndex];
    const dayIndexes = selectedBitIndexes(card.days, days.length);
    const subject = subjects.get(lesson.subjectid);
    const teacherNames = (lesson.teacherids ?? []).map((id) => teacherName(teachers.get(id))).filter(Boolean);
    const classNames = (lesson.classids ?? [])
      .map((id) => cleanName(classes.get(id)?.short || classes.get(id)?.name))
      .filter(Boolean);

    const busyDetails = {
      status: "busy",
      start: startPeriod.starttime,
      end: endPeriod.endtime,
      subject: cleanName(subject?.name || subject?.short || "Lesson"),
      subjectShort: cleanName(subject?.short || subject?.name || "Lesson"),
      teacher: teacherNames.join(", "),
      teachers: teacherNames,
      classes: classNames,
      cardId: card.id,
      lessonId: lesson.id,
      periodsCovered: periods
        .slice(startPeriodIndex, startPeriodIndex + duration)
        .map((period) => period.name)
    };

    for (const roomId of card.classroomids) {
      const classroom = roomById.get(roomId);
      if (!classroom) continue;

      const key = roomKey(classroom);
      for (const dayIndex of dayIndexes) {
        const day = days[dayIndex];
        if (!day || !timetable[key]?.[day.name]) continue;

        for (let offset = 0; offset < duration; offset += 1) {
          const period = periods[startPeriodIndex + offset];
          if (!period) continue;

          const slot = timetable[key][day.name][period.name];
          if (!slot || slot.status === "free") {
            timetable[key][day.name][period.name] = {
              ...slot,
              ...busyDetails,
              period: period.period || period.id
            };
          } else {
            slot.conflicts = slot.conflicts || [];
            slot.conflicts.push(busyDetails);
          }
        }
      }
    }
  }

  const busySlots = Object.values(timetable).reduce((total, room) => (
    total +
    days.reduce((dayTotal, day) => {
      const slots = Object.values(room[day.name] ?? {});
      return dayTotal + slots.filter((slot) => slot.status === "busy").length;
    }, 0)
  ), 0);

  return {
    metadata: {
      source: sourceUrl,
      school: props.school_name,
      edupage: props.edupage,
      fetchedAt: new Date().toISOString(),
      timezone: APP_TIMEZONE,
      schoolTimezone: props.timezone,
      year: props.year_auto,
      timetableNumber: timetableInfo.tt_num,
      timetableText: timetableInfo.text,
      validity: {
        from: timetableInfo.datefrom,
        note: globals.settings?.m_strDateBellowTimeTable || ""
      },
      days: days.map((day) => ({ id: day.id, name: day.name, short: day.short })),
      periods: periods.map((period) => ({
        id: period.id,
        name: period.name,
        short: period.short,
        period: period.period,
        start: period.starttime,
        end: period.endtime
      })),
      rooms: classrooms.map((classroom) => ({
        id: classroom.id,
        key: roomKey(classroom),
        name: cleanName(classroom.name || classroom.short || classroom.id),
        short: cleanName(classroom.short || classroom.name || classroom.id),
        color: classroom.color || ""
      })),
      rights,
      counts: {
        rooms: classrooms.length,
        periods: periods.length,
        cards: cards.length,
        busySlots
      }
    },
    timetable
  };
}

function timeToMinutes(time) {
  const [hour, minute] = String(time || "00:00").split(":").map(Number);
  return hour * 60 + minute;
}

function zonedParts(date = new Date(), timeZone = APP_TIMEZONE) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  }).formatToParts(date);
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return {
    weekday: value.weekday,
    time: `${value.hour}:${value.minute}`
  };
}

function slotsFor(roomDay) {
  return Object.entries(roomDay ?? {})
    .map(([periodName, slot]) => ({ periodName, ...slot }))
    .filter((slot) => slot.start && slot.end)
    .sort((a, b) => timeToMinutes(a.start) - timeToMinutes(b.start));
}

function activeSlot(slots, minute) {
  return slots.find((slot) => {
    const start = timeToMinutes(slot.start);
    const end = timeToMinutes(slot.end);
    return minute >= start && minute <= end;
  });
}

function nextBusySlot(slots, minute) {
  return slots.find((slot) => slot.status === "busy" && timeToMinutes(slot.start) > minute);
}

function nextDayName(days, currentDay) {
  const index = days.findIndex((day) => day.name === currentDay);
  if (index < 0) return days[0]?.name || currentDay;
  return days[(index + 1) % days.length]?.name || currentDay;
}

function getNextLessonTarget(metadata, currentDay, currentTime) {
  const minute = timeToMinutes(currentTime);
  const nextPeriod = metadata.periods?.find((period) => timeToMinutes(period.start) > minute);

  if (nextPeriod) {
    return { day: currentDay, time: nextPeriod.start, label: `Next lesson at ${nextPeriod.start}` };
  }

  const firstPeriod = metadata.periods?.[0];
  const day = nextDayName(metadata.days ?? [], currentDay);
  return {
    day,
    time: firstPeriod?.start || currentTime,
    label: firstPeriod ? `Next lesson ${day} at ${firstPeriod.start}` : "Next lesson"
  };
}

function roomDisplayName(roomKey, roomData, metadata) {
  return (
    roomData._room?.name ||
    metadata.rooms?.find((room) => room.key === roomKey)?.name ||
    roomKey.replace(/_/g, " ")
  );
}

function getAvailability(timetableData, options = {}) {
  const metadata = timetableData.metadata ?? {};
  const timetable = timetableData.timetable ?? timetableData;
  const now = zonedParts(options.now ?? new Date(), options.timezone || metadata.timezone || APP_TIMEZONE);
  let day = options.day || now.weekday;
  let time = options.time || now.time;
  let modeLabel = "Right now";

  if (options.mode === "next") {
    const target = getNextLessonTarget(metadata, day, time);
    day = target.day;
    time = target.time;
    modeLabel = target.label;
  } else if (options.mode === "custom") {
    modeLabel = `${day} ${time}`;
  }

  const minute = timeToMinutes(time);
  const available = [];
  const busy = [];

  for (const [roomKey, roomData] of Object.entries(timetable)) {
    const displayName = roomDisplayName(roomKey, roomData, metadata);
    const floor = roomFloor(displayName);
    const floorLabel = roomFloorLabel(displayName);
    const todaySlots = slotsFor(roomData[day]);
    const dailyPlan = todaySlots.map((slot) => ({ ...slot }));
    const current = activeSlot(todaySlots, minute);
    const nextBusy = nextBusySlot(todaySlots, minute);

    if (current?.status === "busy") {
      busy.push({
        room: displayName,
        roomKey,
        floor,
        floorLabel,
        dailyPlan,
        until: current.end,
        details: current,
        nextFree: current.end
      });
    } else {
      available.push({
        room: displayName,
        roomKey,
        floor,
        floorLabel,
        dailyPlan,
        nextBusyAt: nextBusy?.start || null,
        nextBusy
      });
    }
  }

  available.sort(sortByRoomFloor);
  busy.sort(sortByRoomFloor);

  return {
    timestamp: new Date().toISOString(),
    timezone: metadata.timezone || APP_TIMEZONE,
    day,
    time,
    mode: options.mode || "now",
    modeLabel,
    available,
    busy,
    counts: {
      available: available.length,
      busy: busy.length,
      total: available.length + busy.length
    },
    metadata: {
      school: metadata.school,
      fetchedAt: metadata.fetchedAt,
      timetableText: metadata.timetableText,
      validity: metadata.validity,
      days: metadata.days ?? [],
      periods: metadata.periods ?? [],
      rooms: metadata.rooms ?? []
    }
  };
}

function database() {
  return getDatabase();
}

async function readTimetableFromDatabase() {
  const [metadataSnap, timetableSnap] = await Promise.all([
    database().ref(FIREBASE_METADATA_PATH).get(),
    database().ref(FIREBASE_TIMETABLE_PATH).get()
  ]);

  if (!metadataSnap.exists() || !timetableSnap.exists()) return null;
  return { metadata: metadataSnap.val(), timetable: timetableSnap.val() };
}

async function writeTimetableToDatabase(data) {
  await Promise.all([
    database().ref(FIREBASE_METADATA_PATH).set(data.metadata),
    database().ref(FIREBASE_TIMETABLE_PATH).set(data.timetable)
  ]);
  return data;
}

async function getTimetableData({ refresh = false } = {}) {
  if (!refresh) {
    const data = await readTimetableFromDatabase();
    if (data) return data;
  }

  const data = await fetchLatestTimetable();
  await writeTimetableToDatabase(data);
  return data;
}

function routePath(req) {
  const url = new URL(req.url || "/", "https://firebase.local");
  let path = url.pathname || "/";

  if (path === "/api") path = "/";
  if (path.startsWith("/api/")) path = path.slice("/api".length);
  if (!path.startsWith("/")) path = `/${path}`;

  return { url, path };
}

function sendJson(res, status, value) {
  res.status(status).set("cache-control", "no-store").json(value);
}

function isRefreshAuthorized(req) {
  if (!REFRESH_TOKEN) return false;
  return req.get("authorization") === `Bearer ${REFRESH_TOKEN}`;
}

exports.api = onRequest(
  {
    cors: true,
    timeoutSeconds: 120,
    memory: "512MiB"
  },
  async (req, res) => {
    try {
      const { url, path } = routePath(req);

      if (req.method === "OPTIONS") {
        res.status(204).end();
        return;
      }

      if (req.method === "GET" && (path === "/" || path === "/health")) {
        sendJson(res, 200, { ok: true, service: "pdp-room-timetable-api" });
        return;
      }

      if (req.method === "GET" && path === "/timetable") {
        sendJson(res, 200, await getTimetableData());
        return;
      }

      if (req.method === "GET" && path === "/status") {
        const mode = url.searchParams.get("mode") || "now";
        const day = url.searchParams.get("day") || undefined;
        const time = url.searchParams.get("time") || undefined;
        const timetable = await getTimetableData();
        sendJson(res, 200, getAvailability(timetable, { mode, day, time }));
        return;
      }

      if (req.method === "POST" && path === "/refresh") {
        if (!isRefreshAuthorized(req)) {
          sendJson(res, 401, { error: "Unauthorized" });
          return;
        }

        const timetable = await getTimetableData({ refresh: true });
        sendJson(res, 200, {
          ok: true,
          metadata: timetable.metadata,
          status: getAvailability(timetable)
        });
        return;
      }

      sendJson(res, 404, { error: "Not found", path });
    } catch (error) {
      logger.error(error);
      sendJson(res, 500, { error: error.message || "Internal server error" });
    }
  }
);

exports.syncTimetable = onSchedule(
  {
    schedule: "every 6 hours",
    timeZone: APP_TIMEZONE,
    timeoutSeconds: 120,
    memory: "512MiB"
  },
  async () => {
    const data = await fetchLatestTimetable();
    await writeTimetableToDatabase(data);
    logger.info("Timetable synced", data.metadata.counts);
  }
);
