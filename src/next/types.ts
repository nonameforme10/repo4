export type AvailabilityMode = "now" | "next" | "custom";

export interface DayMetadata {
  id?: string;
  name: string;
  short?: string;
}

export interface PeriodMetadata {
  id?: string;
  name: string;
  short?: string;
  period?: string;
  start: string;
  end: string;
}

export interface RoomMetadata {
  id?: string;
  key?: string;
  name?: string;
  short?: string;
  color?: string;
}

export interface TimetableMetadata {
  source?: string;
  school?: string;
  edupage?: string;
  fetchedAt?: string;
  timezone?: string;
  schoolTimezone?: string;
  year?: number;
  timetableNumber?: string;
  timetableText?: string;
  validity?: {
    from?: string;
    note?: string;
  };
  days?: DayMetadata[];
  periods?: PeriodMetadata[];
  rooms?: RoomMetadata[];
  rights?: unknown;
  counts?: Record<string, number | undefined>;
}

export interface TimetableSlot {
  period?: string;
  periodName?: string;
  start?: string;
  end?: string;
  status?: "free" | "busy" | string;
  subject?: string;
  subjectShort?: string;
  teacher?: string;
  teachers?: string[];
  classes?: string[];
  cardId?: string;
  lessonId?: string;
  periodsCovered?: string[];
  conflicts?: TimetableSlot[];
  [key: string]: unknown;
}

export interface TimetableRoom {
  _room?: RoomMetadata;
  [dayName: string]: RoomMetadata | Record<string, TimetableSlot> | undefined;
}

export interface TimetableData {
  metadata?: TimetableMetadata;
  timetable?: Record<string, TimetableRoom>;
  [roomKey: string]: unknown;
}

export interface StatusRoom {
  room: string;
  roomKey: string;
  floor?: number | null;
  floorLabel?: string;
  dailyPlan?: TimetableSlot[];
  until?: string;
  details?: TimetableSlot;
  nextFree?: string;
  nextBusyAt?: string | null;
  nextBusy?: TimetableSlot | null;
}

export interface AvailabilityStatus {
  timestamp: string;
  timezone: string;
  day: string;
  time: string;
  mode: AvailabilityMode;
  modeLabel: string;
  available: StatusRoom[];
  busy: StatusRoom[];
  counts: {
    available: number;
    busy: number;
    total: number;
  };
  metadata: Required<Pick<TimetableMetadata, "days" | "periods" | "rooms">> &
    Pick<TimetableMetadata, "school" | "fetchedAt" | "timetableText" | "validity">;
}

export interface AvailabilityOptions {
  mode?: AvailabilityMode;
  day?: string;
  time?: string;
  now?: Date | number | string;
  timezone?: string;
}
