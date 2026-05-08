import { APP_TIMEZONE } from "./config.js";

function timeToMinutes(time) {
  const [hour, minute] = String(time || "00:00").split(":").map(Number);
  return hour * 60 + minute;
}

function minutesToTime(minutes) {
  const hour = Math.floor(minutes / 60);
  const minute = minutes % 60;
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

function zonedParts(date = new Date(), timeZone = APP_TIMEZONE) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23"
  }).formatToParts(date);

  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return {
    weekday: value.weekday,
    date: `${value.year}-${value.month}-${value.day}`,
    time: `${value.hour}:${value.minute}`,
    seconds: value.second
  };
}

function roomDisplayName(roomKey, roomData, metadata) {
  return (
    roomData._room?.name ||
    metadata.rooms?.find((room) => room.key === roomKey)?.name ||
    roomKey.replace(/_/g, " ")
  );
}

function roomSortName(value) {
  return String(value?.room || value?.name || value?.short || value?.roomKey || value || "")
    .replace(/\s+/g, " ")
    .trim();
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

function compareRoomsByFloor(a, b) {
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

export function getNextLessonTarget(metadata, currentDay, currentTime) {
  const minute = timeToMinutes(currentTime);
  const nextPeriod = metadata.periods?.find((period) => timeToMinutes(period.start) > minute);

  if (nextPeriod) {
    return {
      day: currentDay,
      time: nextPeriod.start,
      label: `Next lesson at ${nextPeriod.start}`
    };
  }

  const firstPeriod = metadata.periods?.[0];
  const day = nextDayName(metadata.days ?? [], currentDay);

  return {
    day,
    time: firstPeriod?.start || currentTime,
    label: firstPeriod ? `Next lesson ${day} at ${firstPeriod.start}` : "Next lesson"
  };
}

export function getAvailability(timetableData, options = {}) {
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

  available.sort(compareRoomsByFloor);
  busy.sort(compareRoomsByFloor);

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

export { timeToMinutes, minutesToTime, zonedParts };
