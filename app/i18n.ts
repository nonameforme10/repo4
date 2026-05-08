export type LanguageCode = "en" | "uz" | "ru";

export const DEFAULT_LANGUAGE: LanguageCode = "en";
export const LANGUAGE_STORAGE_KEY = "pdp-room-language";

export const LANGUAGES: Array<{
  code: LanguageCode;
  label: string;
  short: string;
}> = [
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
    terminal: "Terminal",
    until: "Until",
    heroAlt: "Room Finder realtime campus routing banner",
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
    terminal: "Terminal",
    until: "Tugash",
    heroAlt: "Xona qidirish uchun real vaqt banneri",
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
    from: "От",
    fullStay: "На весь период",
    fullStayLabel: "{count} комнат - {day} {start}-{end}",
    group: "Группа",
    groupHasNoClass: "У группы сейчас нет занятия",
    groupLocator: "Где группа",
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
    terminal: "Терминал",
    until: "До",
    heroAlt: "Баннер поиска комнат в реальном времени",
    when: "Когда",
    whereToGo: "Куда идти"
  }
} as const;

const DAY_NAMES: Record<LanguageCode, Record<string, string>> = {
  en: {
    Monday: "Monday",
    Tuesday: "Tuesday",
    Wednesday: "Wednesday",
    Thursday: "Thursday",
    Friday: "Friday",
    Saturday: "Saturday",
    Sunday: "Sunday"
  },
  uz: {
    Monday: "Dushanba",
    Tuesday: "Seshanba",
    Wednesday: "Chorshanba",
    Thursday: "Payshanba",
    Friday: "Juma",
    Saturday: "Shanba",
    Sunday: "Yakshanba"
  },
  ru: {
    Monday: "Понедельник",
    Tuesday: "Вторник",
    Wednesday: "Среда",
    Thursday: "Четверг",
    Friday: "Пятница",
    Saturday: "Суббота",
    Sunday: "Воскресенье"
  }
};

const LOCALES: Record<LanguageCode, string> = {
  en: "en-US",
  uz: "uz-UZ",
  ru: "ru-RU"
};

export type TranslationKey = keyof typeof TRANSLATIONS.en;
export type Translator = (key: TranslationKey, params?: Record<string, string | number>) => string;

export function isLanguageCode(value: string | null | undefined): value is LanguageCode {
  return value === "en" || value === "uz" || value === "ru";
}

export function translate(lang: LanguageCode, key: TranslationKey, params?: Record<string, string | number>) {
  const template = TRANSLATIONS[lang][key] || TRANSLATIONS.en[key] || key;

  if (!params) return template;

  return template.replace(/\{([a-zA-Z0-9_]+)\}/g, (match, token) =>
    Object.prototype.hasOwnProperty.call(params, token) ? String(params[token]) : match
  );
}

export function translatedDay(day: string, lang: LanguageCode) {
  return DAY_NAMES[lang][day] || day;
}

export function localeForLanguage(lang: LanguageCode) {
  return LOCALES[lang];
}
