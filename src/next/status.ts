import type {
  AvailabilityMode,
  AvailabilityOptions,
  AvailabilityStatus,
  DayMetadata,
  StatusRoom,
  TimetableData,
  TimetableMetadata,
  TimetableRoom,
  TimetableSlot
} from "./types";

const APP_TIMEZONE = "Asia/Tashkent";

function timeToMinutes(time: string | undefined) {
  const [hour, minute] = String(time || "00:00").split(":").map(Number);
  return hour * 60 + minute;
}

export function zonedParts(date: Date | number | string = new Date(), timeZone = APP_TIMEZONE) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  }).formatToParts(new Date(date));
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return {
    weekday: value.weekday,
    time: `${value.hour}:${value.minute}`
  };
}

function roomDisplayName(roomKey: string, roomData: TimetableRoom, metadata: TimetableMetadata) {
  return (
    roomData._room?.name ||
    metadata.rooms?.find((room) => room.key === roomKey)?.name ||
    roomKey.replace(/_/g, " ")
  );
}

function slotMap(value: TimetableRoom[string]): Record<string, TimetableSlot> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return value as Record<string, TimetableSlot>;
}

function slotsFor(roomDay: TimetableRoom[string]) {
  return Object.entries(slotMap(roomDay))
    .map(([periodName, slot]) => ({ periodName, ...slot }))
    .filter((slot) => slot.start && slot.end)
    .sort((a, b) => timeToMinutes(a.start) - timeToMinutes(b.start));
}

function activeSlot(slots: TimetableSlot[], minute: number) {
  return slots.find((slot) => {
    const start = timeToMinutes(slot.start);
    const end = timeToMinutes(slot.end);
    return minute >= start && minute <= end;
  });
}

function nextBusySlot(slots: TimetableSlot[], minute: number) {
  return slots.find((slot) => slot.status === "busy" && timeToMinutes(slot.start) > minute);
}

function nextDayName(days: DayMetadata[], currentDay: string) {
  const index = days.findIndex((day) => day.name === currentDay);
  if (index < 0) return days[0]?.name || currentDay;
  return days[(index + 1) % days.length]?.name || currentDay;
}

export function getNextLessonTarget(metadata: TimetableMetadata, currentDay: string, currentTime: string) {
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

export function roomSortName(value: unknown) {
  if (value && typeof value === "object") {
    const room = value as Partial<StatusRoom & { name: string; short: string }>;
    return String(room.room || room.name || room.short || room.roomKey || "")
      .replace(/\s+/g, " ")
      .trim();
  }

  return String(value ?? "").replace(/\s+/g, " ").trim();
}

function roomSortParts(value: unknown) {
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

export function roomFloor(value: unknown) {
  const { floor } = roomSortParts(value);
  return floor >= Number.MAX_SAFE_INTEGER - 1 ? null : floor;
}

export function roomFloorLabel(value: unknown) {
  const floor = roomFloor(value);
  if (!floor) return "Floor unknown";
  return `${floor}${floor === 1 ? "st" : floor === 2 ? "nd" : floor === 3 ? "rd" : "th"} floor`;
}

export function compareRoomsByFloor(a: unknown, b: unknown) {
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

function timetableRooms(timetableData: TimetableData) {
  if (timetableData.timetable) return timetableData.timetable;

  return Object.fromEntries(
    Object.entries(timetableData).filter(([key, value]) => key !== "metadata" && value && typeof value === "object")
  ) as Record<string, TimetableRoom>;
}

export function getAvailability(timetableData: TimetableData, options: AvailabilityOptions = {}): AvailabilityStatus {
  const metadata = timetableData.metadata ?? {};
  const timetable = timetableRooms(timetableData);
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
  const available: StatusRoom[] = [];
  const busy: StatusRoom[] = [];

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

export type { AvailabilityMode, AvailabilityStatus, StatusRoom };
