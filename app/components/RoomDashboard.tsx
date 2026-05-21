"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  DEFAULT_LANGUAGE,
  LANGUAGES,
  LANGUAGE_STORAGE_KEY,
  isLanguageCode,
  localeForLanguage,
  translate,
  translatedDay,
  type LanguageCode,
  type Translator
} from "@/app/i18n";
import { compareRoomsByFloor, getAvailability } from "@/src/next/status";
import type { AvailabilityMode, AvailabilityStatus, StatusRoom, TimetableData, TimetableSlot } from "@/src/next/types";

interface RoomDashboardProps {
  initialStatus: AvailabilityStatus | null;
  initialError: string;
}

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

type TelegramImpactStyle = "light" | "medium" | "heavy" | "rigid" | "soft";

type TelegramWebAppUser = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  allows_write_to_pm?: boolean;
  photo_url?: string;
};

type TelegramWebApp = {
  initData: string;
  initDataUnsafe?: {
    chat_type?: string;
    start_param?: string;
    user?: TelegramWebAppUser;
  };
  colorScheme?: string;
  platform?: string;
  ready?: () => void;
  expand?: () => void;
  setBackgroundColor?: (color: string) => void;
  setBottomBarColor?: (color: string) => void;
  setHeaderColor?: (color: string) => void;
  HapticFeedback?: {
    impactOccurred?: (style: TelegramImpactStyle) => void;
    notificationOccurred?: (type: "error" | "success" | "warning") => void;
  };
  onEvent?: (eventType: "themeChanged", handler: () => void) => void;
  offEvent?: (eventType: "themeChanged", handler: () => void) => void;
};

type TelegramSession =
  | { isTelegram: false; status: "idle" }
  | {
      isTelegram: true;
      status: "checking" | "verified" | "unverified";
      colorScheme?: string;
      error?: string;
      platform?: string;
      user?: TelegramWebAppUser;
    };

type TelegramAuthResponse =
  | {
      ok: true;
      authDate: number;
      chatInstance?: string;
      chatType?: string;
      startParam?: string;
      user?: TelegramWebAppUser;
    }
  | {
      ok: false;
      error?: string;
    };

declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp;
    };
  }
}

type GridRoom = {
  type: "available" | "busy";
  room: StatusRoom;
};

type FloorGroup = {
  floor: number | null;
  label: string;
  rooms: GridRoom[];
};

type GroupMatch = {
  group: string;
  room: StatusRoom;
  slot: TimetableSlot;
};

type GroupScheduleState = "current" | "next" | "later" | "past";

type GroupScheduleItem = GroupMatch & {
  state: GroupScheduleState;
  startMinute: number;
  endMinute: number;
};

function formatFetchedAt(value: string | undefined, language: LanguageCode, t: Translator) {
  if (!value) return "";
  const date = new Date(value);
  return t("syncedAt", {
    value: date.toLocaleString(localeForLanguage(language), { dateStyle: "medium", timeStyle: "short" })
  });
}

function roomMatches(room: StatusRoom, query: string) {
  return room.room.toLowerCase().includes(query.toLowerCase());
}

function slotSummary(slot: TimetableSlot, t: Translator) {
  if (slot.status !== "busy") return t("openStatus");

  return [
    Array.isArray(slot.classes) && slot.classes.length ? slot.classes.join(", ") : "",
    slot.teacher || ""
  ].filter(Boolean).join(" - ");
}

function timeToMinutes(time: string | undefined) {
  const [hour, minute] = String(time || "00:00").split(":").map(Number);
  return (Number.isFinite(hour) ? hour : 0) * 60 + (Number.isFinite(minute) ? minute : 0);
}

function isValidTimeRange(start: string, end: string) {
  return Boolean(start && end) && timeToMinutes(end) > timeToMinutes(start);
}

function busySlotOverlapsRange(slot: TimetableSlot, start: string, end: string) {
  if (slot.status !== "busy" || !slot.start || !slot.end) return false;

  const startMinute = timeToMinutes(start);
  const endMinute = timeToMinutes(end);

  return timeToMinutes(slot.start) < endMinute && timeToMinutes(slot.end) > startMinute;
}

function firstRangeConflict(room: StatusRoom, start: string, end: string) {
  return room.dailyPlan?.find((slot) => busySlotOverlapsRange(slot, start, end)) ?? null;
}

function normalizeLookup(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function groupLookupTokens(value: string): string[] {
  return value.toLowerCase().match(/[a-z0-9]+/g) ?? [];
}

function slotClassNames(slot: TimetableSlot) {
  return Array.isArray(slot.classes) ? slot.classes.filter((item): item is string => typeof item === "string") : [];
}

function classMatchesGroup(className: string, query: string) {
  const normalizedQuery = normalizeLookup(query);
  const normalizedClass = normalizeLookup(className);
  const tokens = groupLookupTokens(className);
  const numericCode = tokens[0] && tokens[1] && /^\d+$/.test(tokens[0]) && /^\d+$/.test(tokens[1])
    ? `${tokens[0]}${tokens[1]}`
    : "";

  if (!normalizedQuery) return false;
  if (normalizedClass === normalizedQuery || numericCode === normalizedQuery) return true;

  if (/^\d+$/.test(normalizedQuery)) {
    return normalizedQuery.length >= 3 && tokens.includes(normalizedQuery);
  }

  return false;
}

function slotActiveAt(slot: TimetableSlot, time: string) {
  if (slot.status !== "busy" || !slot.start || !slot.end) return false;

  const minute = timeToMinutes(time);
  return minute >= timeToMinutes(slot.start) && minute <= timeToMinutes(slot.end);
}

function matchingGroups(slot: TimetableSlot, query: string) {
  return slotClassNames(slot).filter((className) => classMatchesGroup(className, query));
}

function findGroupMatches(rooms: StatusRoom[], query: string, time: string) {
  if (!query.trim() || !time) return [];

  return rooms.flatMap((room): GroupMatch[] => {
    const currentSlot = room.dailyPlan?.find((slot) => slotActiveAt(slot, time));
    if (!currentSlot) return [];

    const groups = matchingGroups(currentSlot, query);

    return groups.map((group) => ({ group, room, slot: currentSlot }));
  });
}

function groupScheduleForDay(rooms: StatusRoom[], query: string, time: string): GroupScheduleItem[] {
  if (!query.trim()) return [];

  const currentMinute = timeToMinutes(time);
  const schedule = rooms.flatMap((room): GroupScheduleItem[] =>
    (room.dailyPlan ?? []).flatMap((slot) => {
      if (slot.status !== "busy" || !slot.start || !slot.end) return [];

      return matchingGroups(slot, query).map((group) => ({
        group,
        room,
        slot,
        state: "later" as GroupScheduleState,
        startMinute: timeToMinutes(slot.start),
        endMinute: timeToMinutes(slot.end)
      }));
    })
  ).sort((a, b) =>
    a.startMinute - b.startMinute ||
    a.endMinute - b.endMinute ||
    compareRoomsByFloor(a.room, b.room)
  );
  const nextStart = schedule.find((item) => item.startMinute > currentMinute)?.startMinute ?? null;

  return schedule.map((item) => {
    const state: GroupScheduleState =
      item.startMinute <= currentMinute && item.endMinute >= currentMinute
        ? "current"
        : nextStart !== null && item.startMinute === nextStart
          ? "next"
          : item.startMinute > currentMinute
            ? "later"
            : "past";

    return { ...item, state };
  });
}

function groupScheduleStateLabel(state: GroupScheduleState, t: Translator) {
  if (state === "current") return t("currentClass");
  if (state === "next") return t("nextClass");
  if (state === "past") return t("earlierClass");
  return t("lesson");
}

type TeacherMatch = {
  teacher: string;
  room: StatusRoom;
  slot: TimetableSlot;
};

type TeacherScheduleItem = TeacherMatch & {
  state: GroupScheduleState;
  startMinute: number;
  endMinute: number;
};

function slotTeacherNames(slot: TimetableSlot): string[] {
  const names = Array.isArray(slot.teachers)
    ? slot.teachers.filter((item): item is string => typeof item === "string")
    : [];

  if (typeof slot.teacher === "string" && slot.teacher && !names.includes(slot.teacher)) {
    names.unshift(slot.teacher);
  }

  return names;
}

function teacherMatchesQuery(teacherName: string, query: string) {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return false;

  return teacherName.toLowerCase().includes(trimmed);
}

function matchingTeachers(slot: TimetableSlot, query: string) {
  return slotTeacherNames(slot).filter((name) => teacherMatchesQuery(name, query));
}

function findTeacherMatches(rooms: StatusRoom[], query: string, time: string): TeacherMatch[] {
  if (!query.trim() || !time) return [];

  return rooms.flatMap((room): TeacherMatch[] => {
    const currentSlot = room.dailyPlan?.find((slot) => slotActiveAt(slot, time));
    if (!currentSlot) return [];

    return matchingTeachers(currentSlot, query).map((teacher) => ({ teacher, room, slot: currentSlot }));
  });
}

function teacherScheduleForDay(rooms: StatusRoom[], query: string, time: string): TeacherScheduleItem[] {
  if (!query.trim()) return [];

  const currentMinute = timeToMinutes(time);
  const schedule = rooms.flatMap((room): TeacherScheduleItem[] =>
    (room.dailyPlan ?? []).flatMap((slot) => {
      if (slot.status !== "busy" || !slot.start || !slot.end) return [];

      return matchingTeachers(slot, query).map((teacher) => ({
        teacher,
        room,
        slot,
        state: "later" as GroupScheduleState,
        startMinute: timeToMinutes(slot.start),
        endMinute: timeToMinutes(slot.end)
      }));
    })
  ).sort((a, b) =>
    a.startMinute - b.startMinute ||
    a.endMinute - b.endMinute ||
    compareRoomsByFloor(a.room, b.room)
  );
  const nextStart = schedule.find((item) => item.startMinute > currentMinute)?.startMinute ?? null;

  return schedule.map((item) => {
    const state: GroupScheduleState =
      item.startMinute <= currentMinute && item.endMinute >= currentMinute
        ? "current"
        : nextStart !== null && item.startMinute === nextStart
          ? "next"
          : item.startMinute > currentMinute
            ? "later"
            : "past";

    return { ...item, state };
  });
}

function teacherNameList(rooms: StatusRoom[]) {
  const names = new Set<string>();

  for (const room of rooms) {
    for (const slot of room.dailyPlan ?? []) {
      for (const name of slotTeacherNames(slot)) names.add(name);
    }
  }

  return [...names].sort((a, b) => a.localeCompare(b));
}

function currentModeLabel(status: AvailabilityStatus, t: Translator) {
  if (status.mode === "next") return t("nextLesson");
  if (status.mode === "custom") return t("customTime");
  return t("rightNow");
}

function nextLanguageCode(language: LanguageCode) {
  const index = LANGUAGES.findIndex((item) => item.code === language);
  return LANGUAGES[(index + 1) % LANGUAGES.length]?.code || DEFAULT_LANGUAGE;
}

function languageFromTelegram(languageCode: string | undefined) {
  const primaryLanguage = languageCode?.split("-")[0]?.toLowerCase();
  return isLanguageCode(primaryLanguage) ? primaryLanguage : null;
}

function telegramDisplayName(user: TelegramWebAppUser | undefined) {
  if (!user) return "Telegram";

  return [user.first_name, user.last_name].filter(Boolean).join(" ") || user.username || "Telegram";
}

function fallbackFloorLabel(room: StatusRoom, t: Translator) {
  return typeof room.floor === "number" ? t("floorLabel", { floor: room.floor }) : t("floorUnknown");
}

function groupRoomsByFloor(rooms: GridRoom[], t: Translator) {
  return rooms.reduce<FloorGroup[]>((groups, item) => {
    const floor = item.room.floor ?? null;
    const label = fallbackFloorLabel(item.room, t);
    const current = groups[groups.length - 1];

    if (current && current.floor === floor) {
      current.rooms.push(item);
    } else {
      groups.push({ floor, label, rooms: [item] });
    }

    return groups;
  }, []);
}

function AvailableCard({
  room,
  onOpen,
  t
}: {
  room: StatusRoom;
  onOpen: (room: StatusRoom) => void;
  t: Translator;
}) {
  const next = room.nextBusyAt ? t("freeUntil", { time: room.nextBusyAt }) : t("freeForVisibleSchedule");

  return (
    <article className="room-card available">
      <div className="room-head">
        <div>
          <div className="room-name">{room.room}</div>
          <span className="room-floor">{fallbackFloorLabel(room, t)}</span>
        </div>
        <span className="status-dot" aria-hidden="true" />
      </div>
      <p className="room-detail">
        <strong>{t("available")}</strong>
        {next}
      </p>
      <button className="room-footer room-action" type="button" onClick={() => onOpen(room)}>
        {t("open")}
      </button>
    </article>
  );
}

function BusyCard({
  room,
  onOpen,
  t
}: {
  room: StatusRoom;
  onOpen: (room: StatusRoom) => void;
  t: Translator;
}) {
  const details = room.details || {};
  const classes = Array.isArray(details.classes) && details.classes.length ? ` - ${details.classes.join(", ")}` : "";

  return (
    <article className="room-card busy">
      <div className="room-head">
        <div>
          <div className="room-name">{room.room}</div>
          <span className="room-floor">{fallbackFloorLabel(room, t)}</span>
        </div>
        <span className="status-dot" aria-hidden="true" />
      </div>
      <p className="room-detail">
        <strong>{details.subject || t("busy")}</strong>
        {details.start}-{details.end}
        {classes}
        {details.teacher ? (
          <>
            <br />
            {details.teacher}
          </>
        ) : null}
      </p>
      <button className="room-footer room-action" type="button" onClick={() => onOpen(room)}>
        {t("busyUntil", { time: room.until || "" })}
      </button>
    </article>
  );
}

function RoomPlanModal({
  room,
  day,
  time,
  language,
  t,
  onClose
}: {
  room: StatusRoom;
  day: string;
  time: string;
  language: LanguageCode;
  t: Translator;
  onClose: () => void;
}) {
  const plan = room.dailyPlan ?? [];
  const titleId = `room-plan-${room.roomKey}`;

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <article className="room-modal" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <div className="modal-head">
          <div>
            <span className="modal-kicker">{t("dayPlan", { day: translatedDay(day, language) })}</span>
            <h3 id={titleId}>{room.room}</h3>
          </div>
          <button className="modal-close" type="button" aria-label={t("closeRoomPlan")} onClick={onClose}>
            {t("close")}
          </button>
        </div>

        <div className="plan-list">
          {plan.length ? (
            plan.map((slot) => {
              const isBusy = slot.status === "busy";
              return (
                <div className={`plan-item ${isBusy ? "busy" : "available"}`} key={`${slot.periodName}-${slot.start}`}>
                  <div className="plan-time">
                    <strong>{slot.start}-{slot.end}</strong>
                    <span>{slot.periodName || slot.period || t("lesson")}</span>
                  </div>
                  <div className="plan-content">
                    <strong>{isBusy ? slot.subject || t("classFallback") : t("available")}</strong>
                    <span>{slotSummary(slot, t)}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="empty-state">{t("noPlanForDay")}</div>
          )}
        </div>

        <div className="modal-foot">
          <span>{t("now")}</span>
          <time>{time}</time>
        </div>
      </article>
    </div>
  );
}

export default function RoomDashboard({ initialStatus, initialError }: RoomDashboardProps) {
  const periods = initialStatus?.metadata.periods ?? [];
  const defaultStayUntil = periods[periods.length - 1]?.end || "17:00";
  const [language, setLanguage] = useState<LanguageCode>(DEFAULT_LANGUAGE);
  const [status, setStatus] = useState(initialStatus);
  const [mode, setMode] = useState<AvailabilityMode>(initialStatus?.mode || "now");
  const [selectedDay, setSelectedDay] = useState(initialStatus?.day || "");
  const [selectedTime, setSelectedTime] = useState(initialStatus?.time || "");
  const [stayUntil, setStayUntil] = useState(defaultStayUntil);
  const [query, setQuery] = useState("");
  const [groupQuery, setGroupQuery] = useState("");
  const [teacherQuery, setTeacherQuery] = useState("");
  const [showBusy, setShowBusy] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(initialError);
  const [selectedRoom, setSelectedRoom] = useState<StatusRoom | null>(null);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installDismissed, setInstallDismissed] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [telegramSession, setTelegramSession] = useState<TelegramSession>({ isTelegram: false, status: "idle" });
  const didMount = useRef(false);
  const staticTimetable = useRef<TimetableData | null>(null);
  const telegramWebApp = useRef<TelegramWebApp | null>(null);

  const optionKey = mode === "custom" ? `${mode}:${selectedDay}:${selectedTime}` : mode;
  const days = status?.metadata.days ?? [];
  const isCustom = mode === "custom";
  const activeLanguage = LANGUAGES.find((item) => item.code === language) || LANGUAGES[0];
  const t = useCallback<Translator>(
    (key, params) => translate(language, key, params),
    [language]
  );

  const triggerTelegramImpact = useCallback((style: TelegramImpactStyle = "light") => {
    try {
      telegramWebApp.current?.HapticFeedback?.impactOccurred?.(style);
    } catch {
      // Telegram clients can omit haptics on unsupported platforms.
    }
  }, []);

  const changeLanguage = useCallback((nextLanguage: LanguageCode) => {
    setLanguage(nextLanguage);

    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    } catch {
      // Local storage can be unavailable in private contexts.
    }

    document.documentElement.lang = nextLanguage;
  }, []);

  useEffect(() => {
    const webApp = window.Telegram?.WebApp;

    if (!webApp?.initData) {
      setTelegramSession({ isTelegram: false, status: "idle" });
      return;
    }

    telegramWebApp.current = webApp;
    setInstallPrompt(null);
    setInstallDismissed(true);
    setIsInstalled(true);

    document.documentElement.classList.add("telegram-webapp");
    document.documentElement.dataset.tgPlatform = webApp.platform || "telegram";

    const applyTelegramTheme = () => {
      document.documentElement.dataset.tgColorScheme = webApp.colorScheme || "dark";
    };

    try {
      webApp.ready?.();
      webApp.expand?.();
      webApp.setHeaderColor?.("#050606");
      webApp.setBackgroundColor?.("#050606");
      webApp.setBottomBarColor?.("#050606");
      applyTelegramTheme();
      webApp.onEvent?.("themeChanged", applyTelegramTheme);
    } catch {
      applyTelegramTheme();
    }

    let cancelled = false;
    setTelegramSession({
      isTelegram: true,
      status: "checking",
      colorScheme: webApp.colorScheme,
      platform: webApp.platform
    });

    const verifyTelegramSession = async () => {
      try {
        const response = await fetch("/api/telegram/auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ initData: webApp.initData }),
          cache: "no-store"
        });
        const payload = (await response.json()) as TelegramAuthResponse;

        if (!response.ok) {
          throw new Error(("error" in payload && payload.error) || "Telegram authentication failed.");
        }

        if (!payload.ok) {
          throw new Error(payload.error || "Telegram authentication failed.");
        }

        if (cancelled) return;

        setTelegramSession({
          isTelegram: true,
          status: "verified",
          colorScheme: webApp.colorScheme,
          platform: webApp.platform,
          user: payload.user
        });

        const telegramLanguage = languageFromTelegram(payload.user?.language_code);
        let savedLanguage: string | null = null;

        try {
          savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
        } catch {
          savedLanguage = null;
        }

        if (!isLanguageCode(savedLanguage) && telegramLanguage) {
          changeLanguage(telegramLanguage);
        }
      } catch (authError) {
        if (cancelled) return;

        setTelegramSession({
          isTelegram: true,
          status: "unverified",
          colorScheme: webApp.colorScheme,
          error: authError instanceof Error ? authError.message : "Telegram authentication failed.",
          platform: webApp.platform
        });
      }
    };

    void verifyTelegramSession();

    return () => {
      cancelled = true;
      webApp.offEvent?.("themeChanged", applyTelegramTheme);
      telegramWebApp.current = null;
      document.documentElement.classList.remove("telegram-webapp");
      delete document.documentElement.dataset.tgPlatform;
      delete document.documentElement.dataset.tgColorScheme;
    };
  }, [changeLanguage]);

  useEffect(() => {
    let savedLanguage: string | null = null;

    try {
      savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    } catch {
      savedLanguage = null;
    }

    const nextLanguage = isLanguageCode(savedLanguage) ? savedLanguage : DEFAULT_LANGUAGE;
    setLanguage(nextLanguage);
    document.documentElement.lang = nextLanguage;
  }, []);

  useEffect(() => {
    if (window.Telegram?.WebApp?.initData) {
      setIsInstalled(true);
      return;
    }

    const navigatorWithStandalone = navigator as Navigator & { standalone?: boolean };
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      window.matchMedia("(display-mode: window-controls-overlay)").matches ||
      navigatorWithStandalone.standalone === true;

    setIsInstalled(standalone);

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    }

    const onBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
      setInstallDismissed(false);
    };

    const onAppInstalled = () => {
      setInstallPrompt(null);
      setInstallDismissed(true);
      setIsInstalled(true);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    window.addEventListener("appinstalled", onAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, []);

  const loadStaticTimetable = useCallback(async (force = false) => {
    if (!force && staticTimetable.current) return staticTimetable.current;

    const response = await fetch("/timetable.json", { cache: force ? "reload" : "force-cache" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const timetable = (await response.json()) as TimetableData;
    staticTimetable.current = timetable;
    return timetable;
  }, []);

  const loadStatus = useCallback(
    async (force = false) => {
      setIsRefreshing(true);
      setError("");

      try {
        const timetable = await loadStaticTimetable(force);
        const nextStatus = getAvailability(
          timetable,
          mode === "custom" ? { mode, day: selectedDay || undefined, time: selectedTime || undefined } : { mode }
        );
        setStatus(nextStatus);
        setSelectedRoom((current) => {
          if (!current) return current;
          return [...nextStatus.available, ...nextStatus.busy].find((room) => room.roomKey === current.roomKey) ?? current;
        });

        if (mode !== "custom") {
          setSelectedDay(nextStatus.day);
          setSelectedTime(nextStatus.time);
        }

        if (force) {
          try {
            telegramWebApp.current?.HapticFeedback?.notificationOccurred?.("success");
          } catch {
            // Haptics are best effort.
          }
        }
      } catch (loadError) {
        if (force) {
          try {
            telegramWebApp.current?.HapticFeedback?.notificationOccurred?.("error");
          } catch {
            // Haptics are best effort.
          }
        }
        setError(loadError instanceof Error ? loadError.message : "Could not load room status.");
      } finally {
        setIsRefreshing(false);
      }
    },
    [loadStaticTimetable, mode, selectedDay, selectedTime]
  );

  const installApp = useCallback(async () => {
    if (!installPrompt) return;

    await installPrompt.prompt();
    await installPrompt.userChoice.catch(() => ({ outcome: "dismissed" as const, platform: "" }));
    setInstallPrompt(null);
    setInstallDismissed(true);
  }, [installPrompt]);

  useEffect(() => {
    if (initialStatus) return;

    void loadStatus();
  }, []);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    void loadStatus();
  }, [optionKey, loadStatus]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      void loadStatus();
    }, 30000);

    return () => window.clearInterval(interval);
  }, [loadStatus]);

  useEffect(() => {
    if (!selectedRoom) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedRoom(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedRoom]);

  const availableRooms = useMemo(
    () => (status?.available ?? []).filter((room) => roomMatches(room, query)),
    [query, status]
  );
  const busyRooms = useMemo(
    () => (showBusy ? (status?.busy ?? []).filter((room) => roomMatches(room, query)) : []),
    [query, showBusy, status]
  );
  const gridRooms = useMemo(
    () =>
      [
        ...availableRooms.map((room): GridRoom => ({ type: "available", room })),
        ...busyRooms.map((room): GridRoom => ({ type: "busy", room }))
      ].sort((a, b) => compareRoomsByFloor(a.room, b.room)),
    [availableRooms, busyRooms]
  );
  const floorGroups = useMemo(() => groupRoomsByFloor(gridRooms, t), [gridRooms, t]);
  const allRooms = useMemo(
    () => [...(status?.available ?? []), ...(status?.busy ?? [])].sort(compareRoomsByFloor),
    [status]
  );
  const lookupTime = status?.time || selectedTime || "";
  const groupMatches = useMemo(
    () => findGroupMatches(allRooms, groupQuery, lookupTime),
    [allRooms, groupQuery, lookupTime]
  );
  const groupDaySchedule = useMemo(
    () => groupScheduleForDay(allRooms, groupQuery, lookupTime),
    [allRooms, groupQuery, lookupTime]
  );
  const nextGroupClasses = useMemo(() => groupDaySchedule.filter((item) => item.state === "next"), [groupDaySchedule]);
  const groupHasDaySchedule = groupDaySchedule.length > 0;
  const allTeachers = useMemo(() => teacherNameList(allRooms), [allRooms]);
  const teacherMatches = useMemo(
    () => findTeacherMatches(allRooms, teacherQuery, lookupTime),
    [allRooms, teacherQuery, lookupTime]
  );
  const teacherDaySchedule = useMemo(
    () => teacherScheduleForDay(allRooms, teacherQuery, lookupTime),
    [allRooms, teacherQuery, lookupTime]
  );
  const nextTeacherClasses = useMemo(
    () => teacherDaySchedule.filter((item) => item.state === "next"),
    [teacherDaySchedule]
  );
  const teacherHasDaySchedule = teacherDaySchedule.length > 0;
  const stayStart = selectedTime || status?.time || "";
  const hasValidStayRange = isValidTimeRange(stayStart, stayUntil);
  const stayRooms = useMemo(
    () =>
      hasValidStayRange
        ? allRooms.filter((room) => roomMatches(room, query) && !firstRangeConflict(room, stayStart, stayUntil))
        : [],
    [allRooms, hasValidStayRange, query, stayStart, stayUntil]
  );
  const freshness = [t("nextApi"), formatFetchedAt(status?.metadata.fetchedAt, language, t)].filter(Boolean).join(" - ");
  const stayLabel = !status
    ? t("loading")
    : hasValidStayRange
      ? t("fullStayLabel", {
          count: stayRooms.length,
          day: translatedDay(status.day, language),
          start: stayStart,
          end: stayUntil
        })
      : t("chooseLaterEndTime");

  const openRoom = useCallback((room: StatusRoom) => {
    triggerTelegramImpact("light");
    setSelectedRoom(room);
  }, [triggerTelegramImpact]);

  const closeRoom = useCallback(() => {
    triggerTelegramImpact("light");
    setSelectedRoom(null);
  }, [triggerTelegramImpact]);

  return (
    <main className="shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="PDP Room Finder">
          <img className="brand-mark" src="/icon.svg" alt="" aria-hidden="true" width={42} height={42} />
          <span>PDP ROOMS</span>
        </a>
        <nav className="nav-links" aria-label="Dashboard sections">
          <a href="#terminal">{t("terminal")}</a>
          <a href="#finder">{t("finder")}</a>
          <a href="#groups">{t("group")}</a>
          <a href="#teachers">{t("teacher")}</a>
          <a href="#rooms">{t("rooms")}</a>
          <a href="#sync">{t("sync")}</a>
        </nav>
        <div className="top-actions">
          {telegramSession.isTelegram ? (
            <span
              className={`telegram-chip ${telegramSession.status}`}
              title={telegramSession.error || telegramSession.platform || "Telegram"}
            >
              <span className="telegram-chip-dot" aria-hidden="true" />
              <span>{telegramSession.status === "verified" ? telegramDisplayName(telegramSession.user) : "Telegram"}</span>
            </span>
          ) : null}
          <div className="language-switcher" role="radiogroup" aria-label={t("language")}>
            {LANGUAGES.map((item) => (
              <button
                className={`language-option ${language === item.code ? "active" : ""}`}
                type="button"
                role="radio"
                aria-checked={language === item.code}
                aria-label={item.label}
                key={item.code}
                onClick={() => changeLanguage(item.code)}
              >
                <span className={`language-flag language-flag-${item.code}`} aria-hidden="true" />
                <span>{item.short}</span>
              </button>
            ))}
          </div>
          <button
            className="language-compact-button"
            type="button"
            aria-label={activeLanguage.label}
            onClick={() => changeLanguage(nextLanguageCode(language))}
          >
            <span className={`language-flag language-flag-${activeLanguage.code}`} aria-hidden="true" />
            <span>{activeLanguage.short}</span>
          </button>
          <button
            id="refreshButton"
            type="button"
            disabled={isRefreshing}
            aria-busy={isRefreshing}
            onClick={() => {
              triggerTelegramImpact("light");
              void loadStatus(true);
            }}
          >
            {t("refresh")}
          </button>
          <time id="clock" dateTime={status?.timestamp || ""}>
            {status ? `${translatedDay(status.day, language)} ${status.time}` : ""}
          </time>
        </div>
      </header>

      <section id="top" className="hero-panel">
        <Image
          className="hero-banner"
          src="/assets/room-finder-hero.jpg"
          alt={t("heroAlt")}
          width={1200}
          height={630}
          priority
        />
      </section>

      <section id="terminal" className="metrics" aria-label="Room status summary">
        <div className="metric available">
          <span className="metric-value">{status?.counts.available ?? 0}</span>
          <span className="metric-label">{t("available")}</span>
        </div>
        <div className="metric busy">
          <span className="metric-value">{status?.counts.busy ?? 0}</span>
          <span className="metric-label">{t("busy")}</span>
        </div>
        <div className="metric total">
          <span className="metric-value">{status?.counts.total ?? 0}</span>
          <span className="metric-label">{t("rooms")}</span>
        </div>
      </section>

      <section id="finder" className="control-band" aria-label="Finder controls">
        <label>
          <span>{t("when")}</span>
          <select value={mode} onChange={(event) => setMode(event.target.value as AvailabilityMode)}>
            <option value="now">{t("rightNow")}</option>
            <option value="next">{t("nextLesson")}</option>
            <option value="custom">{t("customTime")}</option>
          </select>
        </label>
        <label>
          <span>{t("day")}</span>
          <select value={selectedDay} disabled={!isCustom} onChange={(event) => setSelectedDay(event.target.value)}>
            {days.map((day) => (
              <option key={day.name} value={day.name}>
                {translatedDay(day.name, language)}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>{t("from")}</span>
          <input
            value={selectedTime}
            disabled={!isCustom}
            type="time"
            onChange={(event) => setSelectedTime(event.target.value)}
          />
        </label>
        <label>
          <span>{t("until")}</span>
          <input value={stayUntil} type="time" onChange={(event) => setStayUntil(event.target.value)} />
        </label>
        <label className="search-label">
          <span>{t("room")}</span>
          <input
            value={query}
            type="search"
            placeholder={t("searchRooms")}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <label className="check-label">
          <input type="checkbox" checked={showBusy} onChange={(event) => setShowBusy(event.target.checked)} />
          <span>{t("showBusy")}</span>
        </label>
      </section>

      <section id="groups" className="group-finder" aria-label={t("groupLocator")}>
        <div className="section-title">
          <h2>{t("groupLocator")}</h2>
          <span>{status ? `${translatedDay(status.day, language)} ${status.time}` : t("loading")}</span>
        </div>
        <label className="group-search-label">
          <span>{t("group")}</span>
          <input
            value={groupQuery}
            type="search"
            placeholder="102"
            onChange={(event) => setGroupQuery(event.target.value)}
          />
        </label>
        <div className="group-results" aria-live="polite">
          {!groupQuery.trim() ? (
            <div className="empty-state">{t("enterGroup")}</div>
          ) : (
            <>
              {groupMatches.length ? (
                groupMatches.map((match) => (
                  <article className="group-result-card current" key={`${match.group}-${match.room.roomKey}-${match.slot.start}`}>
                    <div className="group-result-main">
                      <span className="group-result-kicker">{t("inClass")}</span>
                      <strong>{match.group}</strong>
                      <p>
                        {match.slot.subject || t("classFallback")} - {match.slot.start}-{match.slot.end}
                        {match.slot.teacher ? ` - ${match.slot.teacher}` : ""}
                      </p>
                    </div>
                    <div className="group-result-meta">
                      <span>{t("room")}</span>
                      <strong>{match.room.room}</strong>
                      <button className="room-footer room-action" type="button" onClick={() => openRoom(match.room)}>
                        {t("open")}
                      </button>
                    </div>
                  </article>
                ))
              ) : (
                <div className="empty-state">
                  {groupHasDaySchedule ? t("groupHasNoClass") : t("noMatchingGroup")}
                </div>
              )}

              {nextGroupClasses.map((match) => (
                <article className="group-result-card next" key={`next-${match.group}-${match.room.roomKey}-${match.slot.start}`}>
                  <div className="group-result-main">
                    <span className="group-result-kicker">{t("nextClass")}</span>
                    <strong>{match.group}</strong>
                    <p>
                      {match.slot.subject || t("classFallback")} - {match.slot.start}-{match.slot.end}
                      {match.slot.teacher ? ` - ${match.slot.teacher}` : ""}
                    </p>
                  </div>
                  <div className="group-result-meta">
                    <span>{t("room")}</span>
                    <strong>{match.room.room}</strong>
                    <button className="room-footer room-action" type="button" onClick={() => openRoom(match.room)}>
                      {t("open")}
                    </button>
                  </div>
                </article>
              ))}

              {groupDaySchedule.length ? (
                <div className="group-schedule">
                  <div className="group-schedule-head">
                    <strong>{t("dayClasses")}</strong>
                    <span>{groupDaySchedule.length} {t("lesson").toLowerCase()}</span>
                  </div>
                  <div className="group-schedule-list">
                    {groupDaySchedule.map((item) => (
                      <article
                        className={`group-schedule-item ${item.state}`}
                        key={`${item.group}-${item.room.roomKey}-${item.slot.start}-${item.slot.end}`}
                      >
                        <div className="group-schedule-time">
                          <span>{groupScheduleStateLabel(item.state, t)}</span>
                          <strong>{item.slot.start}-{item.slot.end}</strong>
                        </div>
                        <div className="group-schedule-main">
                          <strong>{item.slot.subject || t("classFallback")}</strong>
                          <p>
                            {item.group}
                            {item.slot.teacher ? ` - ${item.slot.teacher}` : ""}
                          </p>
                        </div>
                        <div className="group-schedule-room">
                          <span>{t("room")}</span>
                          <button className="room-action" type="button" onClick={() => openRoom(item.room)}>
                            {item.room.room}
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>

      <section id="teachers" className="group-finder" aria-label={t("teacherLocator")}>
        <div className="section-title">
          <h2>{t("teacherLocator")}</h2>
          <span>{status ? `${translatedDay(status.day, language)} ${status.time}` : t("loading")}</span>
        </div>
        <label className="group-search-label">
          <span>{t("teacher")}</span>
          <input
            value={teacherQuery}
            type="search"
            list="teacher-options"
            placeholder={t("enterTeacher")}
            onChange={(event) => setTeacherQuery(event.target.value)}
          />
        </label>
        <datalist id="teacher-options">
          {allTeachers.map((name) => (
            <option key={name} value={name} />
          ))}
        </datalist>
        <div className="group-results" aria-live="polite">
          {!teacherQuery.trim() ? (
            <div className="empty-state">{t("enterTeacher")}</div>
          ) : (
            <>
              {teacherMatches.length ? (
                teacherMatches.map((match) => (
                  <article
                    className="group-result-card current"
                    key={`${match.teacher}-${match.room.roomKey}-${match.slot.start}`}
                  >
                    <div className="group-result-main">
                      <span className="group-result-kicker">{t("teaching")}</span>
                      <strong>{match.teacher}</strong>
                      <p>
                        {match.slot.subject || t("classFallback")} - {match.slot.start}-{match.slot.end}
                        {slotClassNames(match.slot).length ? ` - ${slotClassNames(match.slot).join(", ")}` : ""}
                      </p>
                    </div>
                    <div className="group-result-meta">
                      <span>{t("room")}</span>
                      <strong>{match.room.room}</strong>
                      <button className="room-footer room-action" type="button" onClick={() => openRoom(match.room)}>
                        {t("open")}
                      </button>
                    </div>
                  </article>
                ))
              ) : (
                <div className="empty-state">
                  {teacherHasDaySchedule ? t("teacherHasNoClass") : t("noMatchingTeacher")}
                </div>
              )}

              {nextTeacherClasses.map((match) => (
                <article
                  className="group-result-card next"
                  key={`next-${match.teacher}-${match.room.roomKey}-${match.slot.start}`}
                >
                  <div className="group-result-main">
                    <span className="group-result-kicker">{t("nextClass")}</span>
                    <strong>{match.teacher}</strong>
                    <p>
                      {match.slot.subject || t("classFallback")} - {match.slot.start}-{match.slot.end}
                      {slotClassNames(match.slot).length ? ` - ${slotClassNames(match.slot).join(", ")}` : ""}
                    </p>
                  </div>
                  <div className="group-result-meta">
                    <span>{t("room")}</span>
                    <strong>{match.room.room}</strong>
                    <button className="room-footer room-action" type="button" onClick={() => openRoom(match.room)}>
                      {t("open")}
                    </button>
                  </div>
                </article>
              ))}

              {teacherDaySchedule.length ? (
                <div className="group-schedule">
                  <div className="group-schedule-head">
                    <strong>{t("dayClasses")}</strong>
                    <span>{teacherDaySchedule.length} {t("lesson").toLowerCase()}</span>
                  </div>
                  <div className="group-schedule-list">
                    {teacherDaySchedule.map((item) => (
                      <article
                        className={`group-schedule-item ${item.state}`}
                        key={`${item.teacher}-${item.room.roomKey}-${item.slot.start}-${item.slot.end}`}
                      >
                        <div className="group-schedule-time">
                          <span>{groupScheduleStateLabel(item.state, t)}</span>
                          <strong>{item.slot.start}-{item.slot.end}</strong>
                        </div>
                        <div className="group-schedule-main">
                          <strong>{item.slot.subject || t("classFallback")}</strong>
                          <p>
                            {item.teacher}
                            {slotClassNames(item.slot).length ? ` - ${slotClassNames(item.slot).join(", ")}` : ""}
                          </p>
                        </div>
                        <div className="group-schedule-room">
                          <span>{t("room")}</span>
                          <button className="room-action" type="button" onClick={() => openRoom(item.room)}>
                            {item.room.room}
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>

      <section className="finder">
        <div>
          <div className="section-title">
            <h2>{t("whereToGo")}</h2>
            <span>
              {status
                ? `${currentModeLabel(status, t)} - ${translatedDay(status.day, language)} ${status.time}`
                : t("loading")}
            </span>
          </div>
          <div className="room-strip" aria-live="polite">
            {availableRooms.length ? (
              availableRooms.map((room) => (
                <span className="pill" key={room.roomKey}>
                  {room.room}
                </span>
              ))
            ) : (
              <div className="empty-state">{error || t("noMatchingFreeRooms")}</div>
            )}
          </div>
        </div>
      </section>

      <section className="finder stay-finder">
        <div>
          <div className="section-title">
            <h2>{t("fullStay")}</h2>
            <span>{stayLabel}</span>
          </div>
          <div className="room-strip" aria-live="polite">
            {hasValidStayRange && stayRooms.length ? (
              stayRooms.map((room) => (
                <span className="pill stay-pill" key={room.roomKey}>
                  {room.room}
                </span>
              ))
            ) : (
              <div className="empty-state">
                {hasValidStayRange ? error || t("noRoomsFullStay") : t("setLaterEndTime")}
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="rooms">
        <div id="sync" className="section-title">
          <h2>{t("liveStatus")}</h2>
          <span>{error || freshness}</span>
        </div>
        <div className="floor-groups" aria-live="polite">
          {floorGroups.length ? (
            floorGroups.map((group) => (
              <section className="floor-group" key={group.floor ?? "unknown"} aria-label={group.label}>
                <div className="floor-heading">
                  <span>{group.label}</span>
                  <strong>{group.rooms.length} rooms</strong>
                </div>
                <div className="room-grid">
                  {group.rooms.map((item) =>
                    item.type === "busy" ? (
                      <BusyCard
                        key={`${item.type}-${item.room.roomKey}`}
                        room={item.room}
                        onOpen={openRoom}
                        t={t}
                      />
                    ) : (
                      <AvailableCard
                        key={`${item.type}-${item.room.roomKey}`}
                        room={item.room}
                        onOpen={openRoom}
                        t={t}
                      />
                    )
                  )}
                </div>
              </section>
            ))
          ) : (
            <div className="empty-state">{error || t("noMatchingRooms")}</div>
          )}
        </div>
      </section>
      {selectedRoom && status ? (
        <RoomPlanModal
          room={selectedRoom}
          day={status.day}
          time={status.time}
          language={language}
          t={t}
          onClose={closeRoom}
        />
      ) : null}
      {installPrompt && !installDismissed && !isInstalled ? (
        <aside className="install-card" aria-label="Install PDP Room Finder">
          <div className="install-card-top">
            <span className="install-badge">Install Available</span>
            <button
              className="install-close"
              type="button"
              aria-label="Close install prompt"
              onClick={() => setInstallDismissed(true)}
            >
              ×
            </button>
          </div>
          <div className="install-card-body">
            <div>
              <h2>Install PDP Room Finder</h2>
              <p>Add PDP Room Finder to your device for faster launch and quick room checks.</p>
            </div>
            <img src="/icon.svg" alt="" aria-hidden="true" width={58} height={58} />
          </div>
          <div className="install-card-actions">
            <button className="install-primary" type="button" onClick={() => void installApp()}>
              <svg aria-hidden="true" viewBox="0 0 24 24">
                <path d="M12 3v11m0 0 4-4m-4 4-4-4M5 17v3h14v-3" />
              </svg>
              Install App
            </button>
            <button className="install-secondary" type="button" onClick={() => setInstallDismissed(true)}>
              Maybe later
            </button>
          </div>
        </aside>
      ) : null}
    </main>
  );
}
