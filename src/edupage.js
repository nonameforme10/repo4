import { EDUPAGE_BASE_URL, APP_TIMEZONE } from "./config.js";

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
  const chars = String(bits).split("");
  const selected = [];

  for (let index = 0; index < chars.length; index += 1) {
    if (chars[index] === "1") selected.push(index);
  }

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
  if (payload.e) {
    throw new Error(payload.em || payload.e);
  }

  return payload.r;
}

export async function fetchEdupageProps(baseUrl = EDUPAGE_BASE_URL) {
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

export async function fetchTimetableListing(baseUrl = EDUPAGE_BASE_URL) {
  const props = await fetchEdupageProps(baseUrl);
  const listing = await rpc(
    "/timetable/server/ttviewer.js",
    "getTTViewerData",
    [null, props.year_auto],
    baseUrl
  );

  return { props, listing };
}

export async function fetchRegularTimetable(ttNum, baseUrl = EDUPAGE_BASE_URL) {
  return rpc(
    "/timetable/server/regulartt.js",
    "regularttGetData",
    [null, String(ttNum)],
    baseUrl
  );
}

export async function fetchLatestTimetable(baseUrl = EDUPAGE_BASE_URL) {
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

export function normalizeTimetable({
  accessorResult,
  props,
  timetableInfo,
  rights = {},
  sourceUrl = EDUPAGE_BASE_URL
}) {
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
    if (!card.days || !Array.isArray(card.classroomids) || !card.classroomids.length) {
      continue;
    }

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

  const busySlots = Object.values(timetable).reduce((total, room) => {
    return (
      total +
      days.reduce((dayTotal, day) => {
        const slots = Object.values(room[day.name] ?? {});
        return dayTotal + slots.filter((slot) => slot.status === "busy").length;
      }, 0)
    );
  }, 0);

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
