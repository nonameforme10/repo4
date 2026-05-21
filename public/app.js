const APP_TIMEZONE = "Asia/Tashkent";
const STATIC_TIMETABLE_URLS = ["timetable.json", "/timetable.json", "../data/timetable.json", "/data/timetable.json"];
const LANGUAGE_STORAGE_KEY = "pdp-room-language";
const DEFAULT_LANGUAGE = "en";
const LANGUAGES = [
  { code: "en", label: "English", short: "EN" },
  { code: "uz", label: "O'zbek", short: "UZ" },
  { code: "ru", label: "Русский", short: "RU" }
];
const TRANSLATIONS = {
  en: {
    available: "Available",
    busy: "Busy",
    busyUntil: "Busy until {time}",
    chooseLaterEndTime: "Choose a later end time",
    classFallback: "Class",
    close: "Close",
    closeRoomPlan: "Close room plan",
    currentClass: "Current class",
    customTime: "Custom time",
    day: "Day",
    dayClasses: "Day classes",
    dayPlan: "{day} plan",
    earlierClass: "Earlier",
    enterGroup: "Enter a group",
    finder: "Finder",
    floorLabel: "{floor} floor",
    floorUnknown: "Floor unknown",
    freeForVisibleSchedule: "Free for the visible schedule",
    freeUntil: "Free until {time}",
    from: "From",
    fullStay: "Full Stay",
    fullStayLabel: "{count} rooms - {day} {start}-{end}",
    group: "Group",
    groupHasNoClass: "Group has no class at this time",
    groupLocator: "Group Locator",
    heroAlt: "Room Finder realtime campus routing banner",
    inClass: "In class",
    language: "Language",
    lesson: "Lesson",
    liveStatus: "Live Status",
    loading: "Loading",
    nextApi: "Local data",
    nextClass: "Next class",
    nextLesson: "Next lesson",
    noMatchingFreeRooms: "No matching free rooms",
    noMatchingGroup: "Such group doesn't exist",
    noMatchingRooms: "No matching rooms",
    noPlanForDay: "No plan for this day",
    noRoomsFullStay: "No rooms free for the whole time",
    now: "Now",
    open: "Open",
    openStatus: "Open",
    refresh: "Refresh",
    rightNow: "Right now",
    room: "Room",
    rooms: "Rooms",
    searchRooms: "Search rooms",
    setLaterEndTime: "Set a later end time",
    showBusy: "Show busy",
    syncedAt: "Synced {value}",
    sync: "Sync",
    teacher: "Teacher",
    teacherLocator: "Teacher Locator",
    enterTeacher: "Enter a teacher",
    noMatchingTeacher: "Such teacher doesn't exist",
    teacherHasNoClass: "Teacher has no class at this time",
    teaching: "Teaching",
    terminal: "Terminal",
    until: "Until",
    when: "When",
    whereToGo: "Where To Go"
  },
  uz: {
    available: "Bo'sh",
    busy: "Band",
    busyUntil: "{time} gacha band",
    chooseLaterEndTime: "Tugash vaqtini keyinroq tanlang",
    classFallback: "Dars",
    close: "Yopish",
    closeRoomPlan: "Xona rejasini yopish",
    currentClass: "Hozirgi dars",
    customTime: "Tanlangan vaqt",
    day: "Kun",
    dayClasses: "Kun darslari",
    dayPlan: "{day} rejasi",
    earlierClass: "Oldingi",
    enterGroup: "Guruhni kiriting",
    finder: "Qidirish",
    floorLabel: "{floor}-qavat",
    floorUnknown: "Qavat noma'lum",
    freeForVisibleSchedule: "Ko'rinayotgan jadval bo'yicha bo'sh",
    freeUntil: "{time} gacha bo'sh",
    from: "Boshlanish",
    fullStay: "To'liq vaqt",
    fullStayLabel: "{count} xona - {day} {start}-{end}",
    group: "Guruh",
    groupHasNoClass: "Bu vaqtda guruhda dars yo'q",
    groupLocator: "Guruh qayerda",
    heroAlt: "Xona qidirish uchun real vaqt banneri",
    inClass: "Darsda",
    language: "Til",
    lesson: "Dars",
    liveStatus: "Jonli holat",
    loading: "Yuklanmoqda",
    nextApi: "Local data",
    nextClass: "Keyingi dars",
    nextLesson: "Keyingi dars",
    noMatchingFreeRooms: "Mos bo'sh xona topilmadi",
    noMatchingGroup: "Bunday guruh mavjud emas",
    noMatchingRooms: "Mos xona topilmadi",
    noPlanForDay: "Bu kun uchun reja yo'q",
    noRoomsFullStay: "Butun vaqt uchun bo'sh xona yo'q",
    now: "Hozir",
    open: "Ochish",
    openStatus: "Ochiq",
    refresh: "Yangilash",
    rightNow: "Hozir",
    room: "Xona",
    rooms: "Xonalar",
    searchRooms: "Xonalarni qidirish",
    setLaterEndTime: "Tugash vaqtini keyinroq qo'ying",
    showBusy: "Bandlarni ko'rsatish",
    syncedAt: "Sinxronlandi {value}",
    sync: "Sinxronlash",
    teacher: "O'qituvchi",
    teacherLocator: "O'qituvchi qayerda",
    enterTeacher: "O'qituvchini kiriting",
    noMatchingTeacher: "Bunday o'qituvchi mavjud emas",
    teacherHasNoClass: "Bu vaqtda o'qituvchida dars yo'q",
    teaching: "Dars bermoqda",
    terminal: "Terminal",
    until: "Tugash",
    when: "Qachon",
    whereToGo: "Qayerga borish"
  },
  ru: {
    available: "Свободно",
    busy: "Занято",
    busyUntil: "Занято до {time}",
    chooseLaterEndTime: "Выберите более позднее время окончания",
    classFallback: "Занятие",
    close: "Закрыть",
    closeRoomPlan: "Закрыть план комнаты",
    currentClass: "Текущее занятие",
    customTime: "Свое время",
    day: "День",
    dayClasses: "Занятия за день",
    dayPlan: "План на {day}",
    earlierClass: "Раньше",
    enterGroup: "Введите группу",
    finder: "Поиск",
    floorLabel: "{floor} этаж",
    floorUnknown: "Этаж неизвестен",
    freeForVisibleSchedule: "Свободно по видимому расписанию",
    freeUntil: "Свободно до {time}",
    from: "С",
    fullStay: "На весь период",
    fullStayLabel: "{count} комнат - {day} {start}-{end}",
    group: "Группа",
    groupHasNoClass: "У группы сейчас нет занятия",
    groupLocator: "Где группа",
    heroAlt: "Баннер поиска комнат в реальном времени",
    inClass: "На занятии",
    language: "Язык",
    lesson: "Урок",
    liveStatus: "Текущий статус",
    loading: "Загрузка",
    nextApi: "Local data",
    nextClass: "Следующее занятие",
    nextLesson: "Следующий урок",
    noMatchingFreeRooms: "Нет подходящих свободных комнат",
    noMatchingGroup: "Такой группы не существует",
    noMatchingRooms: "Нет подходящих комнат",
    noPlanForDay: "На этот день плана нет",
    noRoomsFullStay: "Нет свободных комнат на весь период",
    now: "Сейчас",
    open: "Открыть",
    openStatus: "Открыто",
    refresh: "Обновить",
    rightNow: "Сейчас",
    room: "Комната",
    rooms: "Комнаты",
    searchRooms: "Поиск комнат",
    setLaterEndTime: "Укажите более позднее время окончания",
    showBusy: "Показывать занятые",
    syncedAt: "Синхронизировано {value}",
    sync: "Синхронизация",
    teacher: "Преподаватель",
    teacherLocator: "Где преподаватель",
    enterTeacher: "Введите преподавателя",
    noMatchingTeacher: "Такого преподавателя не существует",
    teacherHasNoClass: "У преподавателя сейчас нет занятия",
    teaching: "Ведёт занятие",
    terminal: "Терминал",
    until: "До",
    when: "Когда",
    whereToGo: "Куда идти"
  }
};
const DAY_NAMES = {
  en: { Monday: "Monday", Tuesday: "Tuesday", Wednesday: "Wednesday", Thursday: "Thursday", Friday: "Friday", Saturday: "Saturday", Sunday: "Sunday" },
  uz: { Monday: "Dushanba", Tuesday: "Seshanba", Wednesday: "Chorshanba", Thursday: "Payshanba", Friday: "Juma", Saturday: "Shanba", Sunday: "Yakshanba" },
  ru: { Monday: "Понедельник", Tuesday: "Вторник", Wednesday: "Среда", Thursday: "Четверг", Friday: "Пятница", Saturday: "Суббота", Sunday: "Воскресенье" }
};
const LANGUAGE_LOCALES = { en: "en-US", uz: "uz-UZ", ru: "ru-RU" };

const state = {
  status: null,
  lang: getSavedLanguage(),
  query: "",
  groupQuery: "",
  teacherQuery: "",
  showBusy: true,
  stayUntil: "17:00",
  loadedControls: false,
  staticTimetable: null,
  usingStaticData: false,
  selectedRoom: null
};

const elements = {
  availableCount: document.querySelector("#availableCount"),
  busyCount: document.querySelector("#busyCount"),
  totalCount: document.querySelector("#totalCount"),
  clock: document.querySelector("#clock"),
  refreshButton: document.querySelector("#refreshButton"),
  languageSwitcher: document.querySelector("#languageSwitcher"),
  languageCompactButton: document.querySelector("#languageCompactButton"),
  modeSelect: document.querySelector("#modeSelect"),
  daySelect: document.querySelector("#daySelect"),
  timeInput: document.querySelector("#timeInput"),
  stayUntilInput: document.querySelector("#stayUntilInput"),
  searchInput: document.querySelector("#searchInput"),
  groupSearchInput: document.querySelector("#groupSearchInput"),
  teacherSearchInput: document.querySelector("#teacherSearchInput"),
  showBusyToggle: document.querySelector("#showBusyToggle"),
  availableList: document.querySelector("#availableList"),
  stayAvailableList: document.querySelector("#stayAvailableList"),
  groupResults: document.querySelector("#groupResults"),
  teacherResults: document.querySelector("#teacherResults"),
  teacherOptions: document.querySelector("#teacherOptions"),
  roomGrid: document.querySelector("#roomGrid"),
  modeLabel: document.querySelector("#modeLabel"),
  stayLabel: document.querySelector("#stayLabel"),
  groupLookupTime: document.querySelector("#groupLookupTime"),
  teacherLookupTime: document.querySelector("#teacherLookupTime"),
  dataFreshness: document.querySelector("#dataFreshness")
};

function isLanguageCode(value) {
  return value === "en" || value === "uz" || value === "ru";
}

function getSavedLanguage() {
  try {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (isLanguageCode(saved)) return saved;
  } catch {}

  return DEFAULT_LANGUAGE;
}

function t(key, params = null) {
  const template = TRANSLATIONS[state.lang]?.[key] || TRANSLATIONS.en[key] || key;

  if (!params) return template;

  return String(template).replace(/\{([a-zA-Z0-9_]+)\}/g, (match, token) =>
    Object.prototype.hasOwnProperty.call(params, token) ? String(params[token]) : match
  );
}

function translatedDay(day) {
  return DAY_NAMES[state.lang]?.[day] || day;
}

function currentModeLabel(status) {
  if (status.mode === "next") return t("nextLesson");
  if (status.mode === "custom") return t("customTime");
  return t("rightNow");
}

function activeLanguage() {
  return LANGUAGES.find((item) => item.code === state.lang) || LANGUAGES[0];
}

function nextLanguageCode(lang = state.lang) {
  const index = LANGUAGES.findIndex((item) => item.code === lang);
  return LANGUAGES[(index + 1) % LANGUAGES.length]?.code || DEFAULT_LANGUAGE;
}

function renderLanguageSwitcher() {
  elements.languageSwitcher.innerHTML = LANGUAGES.map((item) => `
    <button
      class="language-option ${state.lang === item.code ? "active" : ""}"
      type="button"
      role="radio"
      aria-checked="${state.lang === item.code}"
      aria-label="${escapeHtml(item.label)}"
      data-lang="${item.code}"
    >
      <span class="language-flag language-flag-${item.code}" aria-hidden="true"></span>
      <span>${item.short}</span>
    </button>
  `).join("");

  const active = activeLanguage();
  elements.languageCompactButton.setAttribute("aria-label", active.label);
  elements.languageCompactButton.innerHTML = `
    <span class="language-flag language-flag-${active.code}" aria-hidden="true"></span>
    <span>${active.short}</span>
  `;
}

function renderStaticText() {
  document.documentElement.lang = state.lang;
  elements.languageSwitcher.setAttribute("aria-label", t("language"));

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder));
  });
  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    element.setAttribute("alt", t(element.dataset.i18nAlt));
  });
  renderLanguageSwitcher();
}

function setLanguage(lang) {
  if (!isLanguageCode(lang)) return;
  state.lang = lang;

  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  } catch {}

  renderStaticText();
  if (state.status) render(state.status);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
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

function isValidTimeRange(start, end) {
  return Boolean(start && end) && timeToMinutes(end) > timeToMinutes(start);
}

function busySlotOverlapsRange(slot, start, end) {
  if (slot.status !== "busy" || !slot.start || !slot.end) return false;

  const startMinute = timeToMinutes(start);
  const endMinute = timeToMinutes(end);

  return timeToMinutes(slot.start) < endMinute && timeToMinutes(slot.end) > startMinute;
}

function firstRangeConflict(room, start, end) {
  return room.dailyPlan?.find((slot) => busySlotOverlapsRange(slot, start, end)) ?? null;
}

function normalizeLookup(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function groupLookupTokens(value) {
  return String(value || "").toLowerCase().match(/[a-z0-9]+/g) ?? [];
}

function slotClassNames(slot) {
  return Array.isArray(slot.classes) ? slot.classes.filter((item) => typeof item === "string") : [];
}

function classMatchesGroup(className, query) {
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

function slotActiveAt(slot, time) {
  if (slot.status !== "busy" || !slot.start || !slot.end) return false;

  const minute = timeToMinutes(time);
  return minute >= timeToMinutes(slot.start) && minute <= timeToMinutes(slot.end);
}

function matchingGroups(slot, query) {
  return slotClassNames(slot).filter((className) => classMatchesGroup(className, query));
}

function findGroupMatches(rooms, query, time) {
  if (!String(query || "").trim() || !time) return [];

  return rooms.flatMap((room) => {
    const currentSlot = room.dailyPlan?.find((slot) => slotActiveAt(slot, time));
    if (!currentSlot) return [];

    return matchingGroups(currentSlot, query).map((group) => ({ group, room, slot: currentSlot }));
  });
}

function groupScheduleForDay(rooms, query, time) {
  if (!String(query || "").trim()) return [];

  const currentMinute = timeToMinutes(time);
  const schedule = rooms.flatMap((room) =>
    (room.dailyPlan ?? []).flatMap((slot) => {
      if (slot.status !== "busy" || !slot.start || !slot.end) return [];

      return matchingGroups(slot, query).map((group) => ({
        group,
        room,
        slot,
        state: "later",
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

  return schedule.map((item) => ({
    ...item,
    state:
      item.startMinute <= currentMinute && item.endMinute >= currentMinute
        ? "current"
        : nextStart !== null && item.startMinute === nextStart
          ? "next"
          : item.startMinute > currentMinute
            ? "later"
            : "past"
  }));
}

function groupScheduleStateLabel(stateName) {
  if (stateName === "current") return t("currentClass");
  if (stateName === "next") return t("nextClass");
  if (stateName === "past") return t("earlierClass");
  return t("lesson");
}

function slotTeacherNames(slot) {
  const names = Array.isArray(slot.teachers)
    ? slot.teachers.filter((item) => typeof item === "string")
    : [];

  if (typeof slot.teacher === "string" && slot.teacher && !names.includes(slot.teacher)) {
    names.unshift(slot.teacher);
  }

  return names;
}

function teacherMatchesQuery(teacherName, query) {
  const trimmed = String(query || "").trim().toLowerCase();
  if (!trimmed) return false;

  return teacherName.toLowerCase().includes(trimmed);
}

function matchingTeachers(slot, query) {
  return slotTeacherNames(slot).filter((name) => teacherMatchesQuery(name, query));
}

function findTeacherMatches(rooms, query, time) {
  if (!String(query || "").trim() || !time) return [];

  return rooms.flatMap((room) => {
    const currentSlot = room.dailyPlan?.find((slot) => slotActiveAt(slot, time));
    if (!currentSlot) return [];

    return matchingTeachers(currentSlot, query).map((teacher) => ({ teacher, room, slot: currentSlot }));
  });
}

function teacherScheduleForDay(rooms, query, time) {
  if (!String(query || "").trim()) return [];

  const currentMinute = timeToMinutes(time);
  const schedule = rooms.flatMap((room) =>
    (room.dailyPlan ?? []).flatMap((slot) => {
      if (slot.status !== "busy" || !slot.start || !slot.end) return [];

      return matchingTeachers(slot, query).map((teacher) => ({
        teacher,
        room,
        slot,
        state: "later",
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

  return schedule.map((item) => ({
    ...item,
    state:
      item.startMinute <= currentMinute && item.endMinute >= currentMinute
        ? "current"
        : nextStart !== null && item.startMinute === nextStart
          ? "next"
          : item.startMinute > currentMinute
            ? "later"
            : "past"
  }));
}

function teacherNameList(rooms) {
  const names = new Set();

  for (const room of rooms) {
    for (const slot of room.dailyPlan ?? []) {
      for (const name of slotTeacherNames(slot)) names.add(name);
    }
  }

  return [...names].sort((a, b) => a.localeCompare(b));
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
    return {
      day: currentDay,
      time: nextPeriod.start,
      label: `${t("nextLesson")} ${nextPeriod.start}`
    };
  }

  const firstPeriod = metadata.periods?.[0];
  const day = nextDayName(metadata.days ?? [], currentDay);

  return {
    day,
    time: firstPeriod?.start || currentTime,
    label: firstPeriod ? `${t("nextLesson")} ${translatedDay(day)} ${firstPeriod.start}` : t("nextLesson")
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
  if (!floor) return t("floorUnknown");
  return t("floorLabel", { floor });
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

function getAvailability(timetableData, options = {}) {
  const metadata = timetableData.metadata ?? {};
  const timetable = timetableData.timetable ?? timetableData;
  const now = zonedParts(new Date(), metadata.timezone || APP_TIMEZONE);
  let day = options.day || now.weekday;
  let time = options.time || now.time;
  let modeLabel = t("rightNow");

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

function currentOptions() {
  const mode = elements.modeSelect.value;
  const options = { mode };

  if (mode === "custom") {
    if (elements.daySelect.value) options.day = elements.daySelect.value;
    if (elements.timeInput.value) options.time = elements.timeInput.value;
  }

  return options;
}

async function fetchJson(url, cache = "force-cache") {
  const response = await fetch(url, { cache });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

async function loadStaticTimetable(force = false) {
  if (!force && state.staticTimetable) return state.staticTimetable;

  const failures = [];
  for (const url of STATIC_TIMETABLE_URLS) {
    try {
      state.staticTimetable = await fetchJson(url, force ? "reload" : "force-cache");
      return state.staticTimetable;
    } catch (error) {
      failures.push(`${url}: ${error.message}`);
    }
  }

  throw new Error(`Could not load local timetable data. ${failures.join("; ")}`);
}

async function fetchStatus(options = {}) {
  const timetable = await loadStaticTimetable(options.forceStaticReload);
  state.usingStaticData = true;
  return getAvailability(timetable, currentOptions());
}

function formatFetchedAt(value) {
  if (!value) return "";
  const date = new Date(value);
  return t("syncedAt", {
    value: date.toLocaleString(LANGUAGE_LOCALES[state.lang], { dateStyle: "medium", timeStyle: "short" })
  });
}

function setControls(status) {
  const selectedDay = elements.daySelect.value || status.day;
  elements.daySelect.innerHTML = status.metadata.days
    .map((day) => `<option value="${escapeHtml(day.name)}">${escapeHtml(translatedDay(day.name))}</option>`)
    .join("");
  elements.daySelect.value = selectedDay;

  if (state.loadedControls) return;

  elements.daySelect.value = status.day;
  elements.timeInput.value = status.time;
  const periods = status.metadata.periods ?? [];
  state.stayUntil = periods[periods.length - 1]?.end || state.stayUntil;
  elements.stayUntilInput.value = state.stayUntil;
  state.loadedControls = true;
}

function roomMatches(room) {
  return room.room.toLowerCase().includes(state.query.toLowerCase());
}

function slotSummary(slot) {
  if (slot.status !== "busy") return t("openStatus");

  return [
    Array.isArray(slot.classes) && slot.classes.length ? slot.classes.join(", ") : "",
    slot.teacher || ""
  ].filter(Boolean).join(" - ");
}

function fallbackFloorLabel(room) {
  return typeof room.floor === "number" ? t("floorLabel", { floor: room.floor }) : t("floorUnknown");
}

function groupRoomsByFloor(rooms) {
  return rooms.reduce((groups, item) => {
    const floor = item.room.floor ?? null;
    const label = fallbackFloorLabel(item.room);
    const current = groups[groups.length - 1];

    if (current && current.floor === floor) {
      current.rooms.push(item);
    } else {
      groups.push({ floor, label, rooms: [item] });
    }

    return groups;
  }, []);
}

function findRoom(roomKey) {
  if (!state.status) return null;
  return [...state.status.available, ...state.status.busy].find((room) => room.roomKey === roomKey) || null;
}

function renderRoomModal() {
  document.querySelector("#roomPlanModal")?.remove();

  if (!state.selectedRoom || !state.status) return;

  const room = state.selectedRoom;
  const plan = room.dailyPlan ?? [];
  const titleId = `room-plan-${String(room.roomKey).replace(/[^\w-]/g, "-")}`;
  const planHtml = plan.length
    ? plan.map((slot) => {
        const isBusy = slot.status === "busy";
        return `
          <div class="plan-item ${isBusy ? "busy" : "available"}">
            <div class="plan-time">
              <strong>${escapeHtml(slot.start)}-${escapeHtml(slot.end)}</strong>
              <span>${escapeHtml(slot.periodName || slot.period || t("lesson"))}</span>
            </div>
            <div class="plan-content">
              <strong>${escapeHtml(isBusy ? slot.subject || t("classFallback") : t("available"))}</strong>
              <span>${escapeHtml(slotSummary(slot))}</span>
            </div>
          </div>
        `;
      }).join("")
    : `<div class="empty-state">${t("noPlanForDay")}</div>`;

  document.body.insertAdjacentHTML("beforeend", `
    <div id="roomPlanModal" class="modal-backdrop" role="presentation">
      <article class="room-modal" role="dialog" aria-modal="true" aria-labelledby="${escapeHtml(titleId)}">
        <div class="modal-head">
          <div>
            <span class="modal-kicker">${escapeHtml(t("dayPlan", { day: translatedDay(state.status.day) }))}</span>
            <h3 id="${escapeHtml(titleId)}">${escapeHtml(room.room)}</h3>
          </div>
          <button class="modal-close" type="button" aria-label="${escapeHtml(t("closeRoomPlan"))}" data-room-plan-close>${escapeHtml(t("close"))}</button>
        </div>
        <div class="plan-list">${planHtml}</div>
        <div class="modal-foot">
          <span>${escapeHtml(t("now"))}</span>
          <time>${escapeHtml(state.status.time)}</time>
        </div>
      </article>
    </div>
  `);
}

function openRoomPlan(roomKey) {
  state.selectedRoom = findRoom(roomKey);
  renderRoomModal();
}

function closeRoomPlan() {
  state.selectedRoom = null;
  renderRoomModal();
}

function renderAvailableList(status) {
  const available = status.available.filter(roomMatches);

  if (!available.length) {
    elements.availableList.innerHTML = `<div class="empty-state">${t("noMatchingFreeRooms")}</div>`;
    return;
  }

  elements.availableList.innerHTML = available
    .map((room) => `<span class="pill">${escapeHtml(room.room)}</span>`)
    .join("");
}

function renderStayAvailableList(status) {
  const stayStart = elements.timeInput.value || status.time;
  const stayEnd = state.stayUntil;
  const hasValidStayRange = isValidTimeRange(stayStart, stayEnd);
  const allRooms = [...status.available, ...status.busy].sort(compareRoomsByFloor);
  const stayRooms = hasValidStayRange
    ? allRooms.filter((room) => roomMatches(room) && !firstRangeConflict(room, stayStart, stayEnd))
    : [];

  elements.stayLabel.textContent = hasValidStayRange
    ? t("fullStayLabel", { count: stayRooms.length, day: translatedDay(status.day), start: stayStart, end: stayEnd })
    : t("chooseLaterEndTime");

  if (!hasValidStayRange) {
    elements.stayAvailableList.innerHTML = `<div class="empty-state">${t("setLaterEndTime")}</div>`;
    return;
  }

  if (!stayRooms.length) {
    elements.stayAvailableList.innerHTML = `<div class="empty-state">${t("noRoomsFullStay")}</div>`;
    return;
  }

  elements.stayAvailableList.innerHTML = stayRooms
    .map((room) => `<span class="pill stay-pill">${escapeHtml(room.room)}</span>`)
    .join("");
}

function renderGroupLocator(status) {
  const allRooms = [...status.available, ...status.busy].sort(compareRoomsByFloor);
  const groupMatches = findGroupMatches(allRooms, state.groupQuery, status.time);
  const groupDaySchedule = groupScheduleForDay(allRooms, state.groupQuery, status.time);
  const nextGroupClasses = groupDaySchedule.filter((item) => item.state === "next");
  const groupHasDaySchedule = groupDaySchedule.length > 0;

  elements.groupLookupTime.textContent = `${translatedDay(status.day)} ${status.time}`;

  if (!state.groupQuery.trim()) {
    elements.groupResults.innerHTML = `<div class="empty-state">${t("enterGroup")}</div>`;
    return;
  }

  const currentHtml = groupMatches.length
    ? groupMatches.map((match) => `
      <article class="group-result-card current">
        <div class="group-result-main">
          <span class="group-result-kicker">${escapeHtml(t("inClass"))}</span>
          <strong>${escapeHtml(match.group)}</strong>
          <p>
            ${escapeHtml(match.slot.subject || t("classFallback"))} - ${escapeHtml(match.slot.start)}-${escapeHtml(match.slot.end)}
            ${match.slot.teacher ? ` - ${escapeHtml(match.slot.teacher)}` : ""}
          </p>
        </div>
        <div class="group-result-meta">
          <span>${escapeHtml(t("room"))}</span>
          <strong>${escapeHtml(match.room.room)}</strong>
          <button class="room-footer room-action" type="button" data-room-plan="${escapeHtml(match.room.roomKey)}">${escapeHtml(t("open"))}</button>
        </div>
      </article>
    `).join("")
    : `<div class="empty-state">${
        groupHasDaySchedule ? t("groupHasNoClass") : t("noMatchingGroup")
      }</div>`;

  const nextHtml = nextGroupClasses.map((match) => `
    <article class="group-result-card next">
      <div class="group-result-main">
        <span class="group-result-kicker">${escapeHtml(t("nextClass"))}</span>
        <strong>${escapeHtml(match.group)}</strong>
        <p>
          ${escapeHtml(match.slot.subject || t("classFallback"))} - ${escapeHtml(match.slot.start)}-${escapeHtml(match.slot.end)}
          ${match.slot.teacher ? ` - ${escapeHtml(match.slot.teacher)}` : ""}
        </p>
      </div>
      <div class="group-result-meta">
        <span>${escapeHtml(t("room"))}</span>
        <strong>${escapeHtml(match.room.room)}</strong>
        <button class="room-footer room-action" type="button" data-room-plan="${escapeHtml(match.room.roomKey)}">${escapeHtml(t("open"))}</button>
      </div>
    </article>
  `).join("");

  const scheduleHtml = groupDaySchedule.length
    ? `
      <div class="group-schedule">
        <div class="group-schedule-head">
          <strong>${escapeHtml(t("dayClasses"))}</strong>
          <span>${groupDaySchedule.length} ${escapeHtml(t("lesson").toLowerCase())}</span>
        </div>
        <div class="group-schedule-list">
          ${groupDaySchedule.map((item) => `
            <article class="group-schedule-item ${escapeHtml(item.state)}">
              <div class="group-schedule-time">
                <span>${escapeHtml(groupScheduleStateLabel(item.state))}</span>
                <strong>${escapeHtml(item.slot.start)}-${escapeHtml(item.slot.end)}</strong>
              </div>
              <div class="group-schedule-main">
                <strong>${escapeHtml(item.slot.subject || t("classFallback"))}</strong>
                <p>
                  ${escapeHtml(item.group)}
                  ${item.slot.teacher ? ` - ${escapeHtml(item.slot.teacher)}` : ""}
                </p>
              </div>
              <div class="group-schedule-room">
                <span>${escapeHtml(t("room"))}</span>
                <button class="room-action" type="button" data-room-plan="${escapeHtml(item.room.roomKey)}">${escapeHtml(item.room.room)}</button>
              </div>
            </article>
          `).join("")}
        </div>
      </div>
    `
    : "";

  elements.groupResults.innerHTML = `${currentHtml}${nextHtml}${scheduleHtml}`;
}

function setTeacherOptions(status) {
  const allRooms = [...status.available, ...status.busy];
  elements.teacherOptions.innerHTML = teacherNameList(allRooms)
    .map((name) => `<option value="${escapeHtml(name)}"></option>`)
    .join("");
}

function renderTeacherLocator(status) {
  const allRooms = [...status.available, ...status.busy].sort(compareRoomsByFloor);
  const teacherMatches = findTeacherMatches(allRooms, state.teacherQuery, status.time);
  const teacherDaySchedule = teacherScheduleForDay(allRooms, state.teacherQuery, status.time);
  const nextTeacherClasses = teacherDaySchedule.filter((item) => item.state === "next");
  const teacherHasDaySchedule = teacherDaySchedule.length > 0;

  elements.teacherLookupTime.textContent = `${translatedDay(status.day)} ${status.time}`;

  if (!state.teacherQuery.trim()) {
    elements.teacherResults.innerHTML = `<div class="empty-state">${t("enterTeacher")}</div>`;
    return;
  }

  const slotClassesText = (slot) => {
    const classes = slotClassNames(slot);
    return classes.length ? ` - ${escapeHtml(classes.join(", "))}` : "";
  };

  const currentHtml = teacherMatches.length
    ? teacherMatches.map((match) => `
      <article class="group-result-card current">
        <div class="group-result-main">
          <span class="group-result-kicker">${escapeHtml(t("teaching"))}</span>
          <strong>${escapeHtml(match.teacher)}</strong>
          <p>
            ${escapeHtml(match.slot.subject || t("classFallback"))} - ${escapeHtml(match.slot.start)}-${escapeHtml(match.slot.end)}
            ${slotClassesText(match.slot)}
          </p>
        </div>
        <div class="group-result-meta">
          <span>${escapeHtml(t("room"))}</span>
          <strong>${escapeHtml(match.room.room)}</strong>
          <button class="room-footer room-action" type="button" data-room-plan="${escapeHtml(match.room.roomKey)}">${escapeHtml(t("open"))}</button>
        </div>
      </article>
    `).join("")
    : `<div class="empty-state">${
        teacherHasDaySchedule ? t("teacherHasNoClass") : t("noMatchingTeacher")
      }</div>`;

  const nextHtml = nextTeacherClasses.map((match) => `
    <article class="group-result-card next">
      <div class="group-result-main">
        <span class="group-result-kicker">${escapeHtml(t("nextClass"))}</span>
        <strong>${escapeHtml(match.teacher)}</strong>
        <p>
          ${escapeHtml(match.slot.subject || t("classFallback"))} - ${escapeHtml(match.slot.start)}-${escapeHtml(match.slot.end)}
          ${slotClassesText(match.slot)}
        </p>
      </div>
      <div class="group-result-meta">
        <span>${escapeHtml(t("room"))}</span>
        <strong>${escapeHtml(match.room.room)}</strong>
        <button class="room-footer room-action" type="button" data-room-plan="${escapeHtml(match.room.roomKey)}">${escapeHtml(t("open"))}</button>
      </div>
    </article>
  `).join("");

  const scheduleHtml = teacherDaySchedule.length
    ? `
      <div class="group-schedule">
        <div class="group-schedule-head">
          <strong>${escapeHtml(t("dayClasses"))}</strong>
          <span>${teacherDaySchedule.length} ${escapeHtml(t("lesson").toLowerCase())}</span>
        </div>
        <div class="group-schedule-list">
          ${teacherDaySchedule.map((item) => `
            <article class="group-schedule-item ${escapeHtml(item.state)}">
              <div class="group-schedule-time">
                <span>${escapeHtml(groupScheduleStateLabel(item.state))}</span>
                <strong>${escapeHtml(item.slot.start)}-${escapeHtml(item.slot.end)}</strong>
              </div>
              <div class="group-schedule-main">
                <strong>${escapeHtml(item.slot.subject || t("classFallback"))}</strong>
                <p>
                  ${escapeHtml(item.teacher)}
                  ${slotClassesText(item.slot)}
                </p>
              </div>
              <div class="group-schedule-room">
                <span>${escapeHtml(t("room"))}</span>
                <button class="room-action" type="button" data-room-plan="${escapeHtml(item.room.roomKey)}">${escapeHtml(item.room.room)}</button>
              </div>
            </article>
          `).join("")}
        </div>
      </div>
    `
    : "";

  elements.teacherResults.innerHTML = `${currentHtml}${nextHtml}${scheduleHtml}`;
}

function availableCard(room) {
  const next = room.nextBusyAt
    ? escapeHtml(t("freeUntil", { time: room.nextBusyAt }))
    : escapeHtml(t("freeForVisibleSchedule"));
  return `
    <article class="room-card available">
      <div class="room-head">
        <div>
          <div class="room-name">${escapeHtml(room.room)}</div>
          <span class="room-floor">${escapeHtml(fallbackFloorLabel(room))}</span>
        </div>
        <span class="status-dot" aria-hidden="true"></span>
      </div>
      <p class="room-detail"><strong>${escapeHtml(t("available"))}</strong>${next}</p>
      <button class="room-footer room-action" type="button" data-room-plan="${escapeHtml(room.roomKey)}">${escapeHtml(t("open"))}</button>
    </article>
  `;
}

function busyCard(room) {
  const details = room.details || {};
  const classes = Array.isArray(details.classes) && details.classes.length
    ? ` - ${escapeHtml(details.classes.join(", "))}`
    : "";
  const teacher = details.teacher ? `<br>${escapeHtml(details.teacher)}` : "";

  return `
    <article class="room-card busy">
      <div class="room-head">
        <div>
          <div class="room-name">${escapeHtml(room.room)}</div>
          <span class="room-floor">${escapeHtml(fallbackFloorLabel(room))}</span>
        </div>
        <span class="status-dot" aria-hidden="true"></span>
      </div>
      <p class="room-detail">
        <strong>${escapeHtml(details.subject || t("busy"))}</strong>
        ${escapeHtml(details.start)}-${escapeHtml(details.end)}${classes}${teacher}
      </p>
      <button class="room-footer room-action" type="button" data-room-plan="${escapeHtml(room.roomKey)}">${escapeHtml(t("busyUntil", { time: room.until || "" }))}</button>
    </article>
  `;
}

function renderGrid(status) {
  const available = status.available.filter(roomMatches);
  const busy = state.showBusy ? status.busy.filter(roomMatches) : [];
  const rooms = [
    ...available.map((room) => ({ type: "available", room })),
    ...busy.map((room) => ({ type: "busy", room }))
  ].sort((a, b) => compareRoomsByFloor(a.room, b.room));
  const html = groupRoomsByFloor(rooms)
    .map((group) => `
      <section class="floor-group" aria-label="${escapeHtml(group.label)}">
        <div class="floor-heading">
          <span>${escapeHtml(group.label)}</span>
          <strong>${group.rooms.length} rooms</strong>
        </div>
        <div class="room-grid">
          ${group.rooms
            .map((item) => (item.type === "busy" ? busyCard(item.room) : availableCard(item.room)))
            .join("")}
        </div>
      </section>
    `)
    .join("");

  elements.roomGrid.innerHTML = html || `<div class="empty-state">${t("noMatchingRooms")}</div>`;
}

function render(status) {
  state.status = status;
  renderStaticText();
  setControls(status);

  elements.availableCount.textContent = status.counts.available;
  elements.busyCount.textContent = status.counts.busy;
  elements.totalCount.textContent = status.counts.total;
  elements.modeLabel.textContent = `${currentModeLabel(status)} - ${translatedDay(status.day)} ${status.time}`;
  elements.clock.textContent = `${translatedDay(status.day)} ${status.time}`;
  elements.clock.dateTime = status.timestamp;
  elements.dataFreshness.textContent = [
    state.usingStaticData ? "Local data" : t("nextApi"),
    formatFetchedAt(status.metadata.fetchedAt)
  ].filter(Boolean).join(" - ");

  if (elements.modeSelect.value !== "custom") {
    elements.daySelect.value = status.day;
    elements.timeInput.value = status.time;
  }

  if (state.selectedRoom) {
    state.selectedRoom = findRoom(state.selectedRoom.roomKey);
  }

  renderGroupLocator(status);
  setTeacherOptions(status);
  renderTeacherLocator(status);
  renderAvailableList(status);
  renderStayAvailableList(status);
  renderGrid(status);
  renderRoomModal();
}

async function loadStatus(options = {}) {
  elements.refreshButton.disabled = true;
  try {
    render(await fetchStatus(options));
  } catch (error) {
    const message = escapeHtml(error.message);
    elements.availableList.innerHTML = `<div class="empty-state">${message}</div>`;
    elements.stayAvailableList.innerHTML = `<div class="empty-state">${message}</div>`;
    elements.groupResults.innerHTML = `<div class="empty-state">${message}</div>`;
    elements.teacherResults.innerHTML = `<div class="empty-state">${message}</div>`;
    elements.roomGrid.innerHTML = `<div class="empty-state">${message}</div>`;
  } finally {
    elements.refreshButton.disabled = false;
  }
}

function rerenderOnly() {
  if (state.status) {
    renderGroupLocator(state.status);
    renderTeacherLocator(state.status);
    renderAvailableList(state.status);
    renderStayAvailableList(state.status);
    renderGrid(state.status);
  }
}

elements.refreshButton.addEventListener("click", () => loadStatus({ forceStaticReload: true }));
elements.languageSwitcher.addEventListener("click", (event) => {
  const button = event.target.closest("[data-lang]");
  if (!button) return;
  setLanguage(button.dataset.lang);
});
elements.languageCompactButton.addEventListener("click", () => {
  setLanguage(nextLanguageCode());
});
elements.modeSelect.addEventListener("change", loadStatus);
elements.daySelect.addEventListener("change", loadStatus);
elements.timeInput.addEventListener("change", loadStatus);
elements.stayUntilInput.addEventListener("input", (event) => {
  state.stayUntil = event.target.value;
  rerenderOnly();
});
elements.searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  rerenderOnly();
});
elements.groupSearchInput.addEventListener("input", (event) => {
  state.groupQuery = event.target.value;
  rerenderOnly();
});
elements.teacherSearchInput.addEventListener("input", (event) => {
  state.teacherQuery = event.target.value;
  rerenderOnly();
});
elements.showBusyToggle.addEventListener("change", (event) => {
  state.showBusy = event.target.checked;
  rerenderOnly();
});
elements.roomGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-room-plan]");
  if (!button) return;
  openRoomPlan(button.dataset.roomPlan);
});
elements.groupResults.addEventListener("click", (event) => {
  const button = event.target.closest("[data-room-plan]");
  if (!button) return;
  openRoomPlan(button.dataset.roomPlan);
});
elements.teacherResults.addEventListener("click", (event) => {
  const button = event.target.closest("[data-room-plan]");
  if (!button) return;
  openRoomPlan(button.dataset.roomPlan);
});
document.addEventListener("click", (event) => {
  if (event.target.closest("[data-room-plan-close]") || event.target.id === "roomPlanModal") {
    closeRoomPlan();
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeRoomPlan();
});

renderStaticText();
void loadStatus();
setInterval(() => {
  void loadStatus();
}, 30000);
