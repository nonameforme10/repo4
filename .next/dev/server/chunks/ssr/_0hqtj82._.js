module.exports = [
"[project]/app/i18n.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_LANGUAGE",
    ()=>DEFAULT_LANGUAGE,
    "LANGUAGES",
    ()=>LANGUAGES,
    "LANGUAGE_STORAGE_KEY",
    ()=>LANGUAGE_STORAGE_KEY,
    "isLanguageCode",
    ()=>isLanguageCode,
    "localeForLanguage",
    ()=>localeForLanguage,
    "translate",
    ()=>translate,
    "translatedDay",
    ()=>translatedDay
]);
const DEFAULT_LANGUAGE = "en";
const LANGUAGE_STORAGE_KEY = "pdp-room-language";
const LANGUAGES = [
    {
        code: "en",
        label: "English",
        short: "EN"
    },
    {
        code: "uz",
        label: "O'zbek",
        short: "UZ"
    },
    {
        code: "ru",
        label: "Русский",
        short: "RU"
    }
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
};
const DAY_NAMES = {
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
const LOCALES = {
    en: "en-US",
    uz: "uz-UZ",
    ru: "ru-RU"
};
function isLanguageCode(value) {
    return value === "en" || value === "uz" || value === "ru";
}
function translate(lang, key, params) {
    const template = TRANSLATIONS[lang][key] || TRANSLATIONS.en[key] || key;
    if (!params) return template;
    return template.replace(/\{([a-zA-Z0-9_]+)\}/g, (match, token)=>Object.prototype.hasOwnProperty.call(params, token) ? String(params[token]) : match);
}
function translatedDay(day, lang) {
    return DAY_NAMES[lang][day] || day;
}
function localeForLanguage(lang) {
    return LOCALES[lang];
}
}),
"[project]/src/next/status.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "compareRoomsByFloor",
    ()=>compareRoomsByFloor,
    "getAvailability",
    ()=>getAvailability,
    "getNextLessonTarget",
    ()=>getNextLessonTarget,
    "roomFloor",
    ()=>roomFloor,
    "roomFloorLabel",
    ()=>roomFloorLabel,
    "roomSortName",
    ()=>roomSortName,
    "zonedParts",
    ()=>zonedParts
]);
const APP_TIMEZONE = "Asia/Tashkent";
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
    }).formatToParts(new Date(date));
    const value = Object.fromEntries(parts.map((part)=>[
            part.type,
            part.value
        ]));
    return {
        weekday: value.weekday,
        time: `${value.hour}:${value.minute}`
    };
}
function roomDisplayName(roomKey, roomData, metadata) {
    return roomData._room?.name || metadata.rooms?.find((room)=>room.key === roomKey)?.name || roomKey.replace(/_/g, " ");
}
function slotMap(value) {
    if (!value || typeof value !== "object" || Array.isArray(value)) return {};
    return value;
}
function slotsFor(roomDay) {
    return Object.entries(slotMap(roomDay)).map(([periodName, slot])=>({
            periodName,
            ...slot
        })).filter((slot)=>slot.start && slot.end).sort((a, b)=>timeToMinutes(a.start) - timeToMinutes(b.start));
}
function activeSlot(slots, minute) {
    return slots.find((slot)=>{
        const start = timeToMinutes(slot.start);
        const end = timeToMinutes(slot.end);
        return minute >= start && minute <= end;
    });
}
function nextBusySlot(slots, minute) {
    return slots.find((slot)=>slot.status === "busy" && timeToMinutes(slot.start) > minute);
}
function nextDayName(days, currentDay) {
    const index = days.findIndex((day)=>day.name === currentDay);
    if (index < 0) return days[0]?.name || currentDay;
    return days[(index + 1) % days.length]?.name || currentDay;
}
function getNextLessonTarget(metadata, currentDay, currentTime) {
    const minute = timeToMinutes(currentTime);
    const nextPeriod = metadata.periods?.find((period)=>timeToMinutes(period.start) > minute);
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
function roomSortName(value) {
    if (value && typeof value === "object") {
        const room = value;
        return String(room.room || room.name || room.short || room.roomKey || "").replace(/\s+/g, " ").trim();
    }
    return String(value ?? "").replace(/\s+/g, " ").trim();
}
function roomSortParts(value) {
    const numbers = [
        ...roomSortName(value).matchAll(/\d+/g)
    ].map((match)=>Number(match[0]));
    const number = numbers.find((candidate)=>candidate >= 100) ?? numbers[0];
    if (!Number.isFinite(number)) {
        return {
            floor: Number.MAX_SAFE_INTEGER,
            number: Number.MAX_SAFE_INTEGER
        };
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
    return partsA.floor - partsB.floor || partsA.number - partsB.number || nameA.localeCompare(nameB, "en", {
        numeric: true,
        sensitivity: "base"
    });
}
function timetableRooms(timetableData) {
    if (timetableData.timetable) return timetableData.timetable;
    return Object.fromEntries(Object.entries(timetableData).filter(([key, value])=>key !== "metadata" && value && typeof value === "object"));
}
function getAvailability(timetableData, options = {}) {
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
    const available = [];
    const busy = [];
    for (const [roomKey, roomData] of Object.entries(timetable)){
        const displayName = roomDisplayName(roomKey, roomData, metadata);
        const floor = roomFloor(displayName);
        const floorLabel = roomFloorLabel(displayName);
        const todaySlots = slotsFor(roomData[day]);
        const dailyPlan = todaySlots.map((slot)=>({
                ...slot
            }));
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
}),
"[project]/app/components/RoomDashboard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RoomDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/i18n.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$next$2f$status$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/next/status.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function formatFetchedAt(value, language, t) {
    if (!value) return "";
    const date = new Date(value);
    return t("syncedAt", {
        value: date.toLocaleString((0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["localeForLanguage"])(language), {
            dateStyle: "medium",
            timeStyle: "short"
        })
    });
}
function roomMatches(room, query) {
    return room.room.toLowerCase().includes(query.toLowerCase());
}
function slotSummary(slot, t) {
    if (slot.status !== "busy") return t("openStatus");
    return [
        Array.isArray(slot.classes) && slot.classes.length ? slot.classes.join(", ") : "",
        slot.teacher || ""
    ].filter(Boolean).join(" - ");
}
function timeToMinutes(time) {
    const [hour, minute] = String(time || "00:00").split(":").map(Number);
    return (Number.isFinite(hour) ? hour : 0) * 60 + (Number.isFinite(minute) ? minute : 0);
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
    return room.dailyPlan?.find((slot)=>busySlotOverlapsRange(slot, start, end)) ?? null;
}
function normalizeLookup(value) {
    return value.toLowerCase().replace(/[^a-z0-9]+/g, "");
}
function groupLookupTokens(value) {
    return value.toLowerCase().match(/[a-z0-9]+/g) ?? [];
}
function slotClassNames(slot) {
    return Array.isArray(slot.classes) ? slot.classes.filter((item)=>typeof item === "string") : [];
}
function classMatchesGroup(className, query) {
    const normalizedQuery = normalizeLookup(query);
    const normalizedClass = normalizeLookup(className);
    const tokens = groupLookupTokens(className);
    const numericCode = tokens[0] && tokens[1] && /^\d+$/.test(tokens[0]) && /^\d+$/.test(tokens[1]) ? `${tokens[0]}${tokens[1]}` : "";
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
    return slotClassNames(slot).filter((className)=>classMatchesGroup(className, query));
}
function findGroupMatches(rooms, query, time) {
    if (!query.trim() || !time) return [];
    return rooms.flatMap((room)=>{
        const currentSlot = room.dailyPlan?.find((slot)=>slotActiveAt(slot, time));
        if (!currentSlot) return [];
        const groups = matchingGroups(currentSlot, query);
        return groups.map((group)=>({
                group,
                room,
                slot: currentSlot
            }));
    });
}
function groupScheduleForDay(rooms, query, time) {
    if (!query.trim()) return [];
    const currentMinute = timeToMinutes(time);
    const schedule = rooms.flatMap((room)=>(room.dailyPlan ?? []).flatMap((slot)=>{
            if (slot.status !== "busy" || !slot.start || !slot.end) return [];
            return matchingGroups(slot, query).map((group)=>({
                    group,
                    room,
                    slot,
                    state: "later",
                    startMinute: timeToMinutes(slot.start),
                    endMinute: timeToMinutes(slot.end)
                }));
        })).sort((a, b)=>a.startMinute - b.startMinute || a.endMinute - b.endMinute || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$next$2f$status$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["compareRoomsByFloor"])(a.room, b.room));
    const nextStart = schedule.find((item)=>item.startMinute > currentMinute)?.startMinute ?? null;
    return schedule.map((item)=>{
        const state = item.startMinute <= currentMinute && item.endMinute >= currentMinute ? "current" : nextStart !== null && item.startMinute === nextStart ? "next" : item.startMinute > currentMinute ? "later" : "past";
        return {
            ...item,
            state
        };
    });
}
function groupScheduleStateLabel(state, t) {
    if (state === "current") return t("currentClass");
    if (state === "next") return t("nextClass");
    if (state === "past") return t("earlierClass");
    return t("lesson");
}
function currentModeLabel(status, t) {
    if (status.mode === "next") return t("nextLesson");
    if (status.mode === "custom") return t("customTime");
    return t("rightNow");
}
function nextLanguageCode(language) {
    const index = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LANGUAGES"].findIndex((item)=>item.code === language);
    return __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LANGUAGES"][(index + 1) % __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LANGUAGES"].length]?.code || __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_LANGUAGE"];
}
function languageFromTelegram(languageCode) {
    const primaryLanguage = languageCode?.split("-")[0]?.toLowerCase();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isLanguageCode"])(primaryLanguage) ? primaryLanguage : null;
}
function telegramDisplayName(user) {
    if (!user) return "Telegram";
    return [
        user.first_name,
        user.last_name
    ].filter(Boolean).join(" ") || user.username || "Telegram";
}
function fallbackFloorLabel(room, t) {
    return typeof room.floor === "number" ? t("floorLabel", {
        floor: room.floor
    }) : t("floorUnknown");
}
function groupRoomsByFloor(rooms, t) {
    return rooms.reduce((groups, item)=>{
        const floor = item.room.floor ?? null;
        const label = fallbackFloorLabel(item.room, t);
        const current = groups[groups.length - 1];
        if (current && current.floor === floor) {
            current.rooms.push(item);
        } else {
            groups.push({
                floor,
                label,
                rooms: [
                    item
                ]
            });
        }
        return groups;
    }, []);
}
function AvailableCard({ room, onOpen, t }) {
    const next = room.nextBusyAt ? t("freeUntil", {
        time: room.nextBusyAt
    }) : t("freeForVisibleSchedule");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: "room-card available",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "room-head",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "room-name",
                                children: room.room
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 321,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "room-floor",
                                children: fallbackFloorLabel(room, t)
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 322,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 320,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "status-dot",
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 324,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/RoomDashboard.tsx",
                lineNumber: 319,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "room-detail",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: t("available")
                    }, void 0, false, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 327,
                        columnNumber: 9
                    }, this),
                    next
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/RoomDashboard.tsx",
                lineNumber: 326,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "room-footer room-action",
                type: "button",
                onClick: ()=>onOpen(room),
                children: t("open")
            }, void 0, false, {
                fileName: "[project]/app/components/RoomDashboard.tsx",
                lineNumber: 330,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/RoomDashboard.tsx",
        lineNumber: 318,
        columnNumber: 5
    }, this);
}
function BusyCard({ room, onOpen, t }) {
    const details = room.details || {};
    const classes = Array.isArray(details.classes) && details.classes.length ? ` - ${details.classes.join(", ")}` : "";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: "room-card busy",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "room-head",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "room-name",
                                children: room.room
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 353,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "room-floor",
                                children: fallbackFloorLabel(room, t)
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 354,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 352,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "status-dot",
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 356,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/RoomDashboard.tsx",
                lineNumber: 351,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "room-detail",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: details.subject || t("busy")
                    }, void 0, false, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 359,
                        columnNumber: 9
                    }, this),
                    details.start,
                    "-",
                    details.end,
                    classes,
                    details.teacher ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 364,
                                columnNumber: 13
                            }, this),
                            details.teacher
                        ]
                    }, void 0, true) : null
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/RoomDashboard.tsx",
                lineNumber: 358,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "room-footer room-action",
                type: "button",
                onClick: ()=>onOpen(room),
                children: t("busyUntil", {
                    time: room.until || ""
                })
            }, void 0, false, {
                fileName: "[project]/app/components/RoomDashboard.tsx",
                lineNumber: 369,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/RoomDashboard.tsx",
        lineNumber: 350,
        columnNumber: 5
    }, this);
}
function RoomPlanModal({ room, day, time, language, t, onClose }) {
    const plan = room.dailyPlan ?? [];
    const titleId = `room-plan-${room.roomKey}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "modal-backdrop",
        role: "presentation",
        onMouseDown: (event)=>{
            if (event.target === event.currentTarget) onClose();
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
            className: "room-modal",
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": titleId,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "modal-head",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "modal-kicker",
                                    children: t("dayPlan", {
                                        day: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["translatedDay"])(day, language)
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/app/components/RoomDashboard.tsx",
                                    lineNumber: 401,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    id: titleId,
                                    children: room.room
                                }, void 0, false, {
                                    fileName: "[project]/app/components/RoomDashboard.tsx",
                                    lineNumber: 402,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/RoomDashboard.tsx",
                            lineNumber: 400,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "modal-close",
                            type: "button",
                            "aria-label": t("closeRoomPlan"),
                            onClick: onClose,
                            children: t("close")
                        }, void 0, false, {
                            fileName: "[project]/app/components/RoomDashboard.tsx",
                            lineNumber: 404,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/RoomDashboard.tsx",
                    lineNumber: 399,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "plan-list",
                    children: plan.length ? plan.map((slot)=>{
                        const isBusy = slot.status === "busy";
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `plan-item ${isBusy ? "busy" : "available"}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "plan-time",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: [
                                                slot.start,
                                                "-",
                                                slot.end
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/RoomDashboard.tsx",
                                            lineNumber: 416,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: slot.periodName || slot.period || t("lesson")
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/RoomDashboard.tsx",
                                            lineNumber: 417,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/RoomDashboard.tsx",
                                    lineNumber: 415,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "plan-content",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: isBusy ? slot.subject || t("classFallback") : t("available")
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/RoomDashboard.tsx",
                                            lineNumber: 420,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: slotSummary(slot, t)
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/RoomDashboard.tsx",
                                            lineNumber: 421,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/RoomDashboard.tsx",
                                    lineNumber: 419,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, `${slot.periodName}-${slot.start}`, true, {
                            fileName: "[project]/app/components/RoomDashboard.tsx",
                            lineNumber: 414,
                            columnNumber: 17
                        }, this);
                    }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "empty-state",
                        children: t("noPlanForDay")
                    }, void 0, false, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 427,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/RoomDashboard.tsx",
                    lineNumber: 409,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "modal-foot",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: t("now")
                        }, void 0, false, {
                            fileName: "[project]/app/components/RoomDashboard.tsx",
                            lineNumber: 432,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("time", {
                            children: time
                        }, void 0, false, {
                            fileName: "[project]/app/components/RoomDashboard.tsx",
                            lineNumber: 433,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/RoomDashboard.tsx",
                    lineNumber: 431,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/RoomDashboard.tsx",
            lineNumber: 398,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/RoomDashboard.tsx",
        lineNumber: 395,
        columnNumber: 5
    }, this);
}
function RoomDashboard({ initialStatus, initialError }) {
    const periods = initialStatus?.metadata.periods ?? [];
    const defaultStayUntil = periods[periods.length - 1]?.end || "17:00";
    const [language, setLanguage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_LANGUAGE"]);
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialStatus);
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialStatus?.mode || "now");
    const [selectedDay, setSelectedDay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialStatus?.day || "");
    const [selectedTime, setSelectedTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialStatus?.time || "");
    const [stayUntil, setStayUntil] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(defaultStayUntil);
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [groupQuery, setGroupQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [showBusy, setShowBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isRefreshing, setIsRefreshing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialError);
    const [selectedRoom, setSelectedRoom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [installPrompt, setInstallPrompt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [installDismissed, setInstallDismissed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isInstalled, setIsInstalled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [telegramSession, setTelegramSession] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        isTelegram: false,
        status: "idle"
    });
    const didMount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const staticTimetable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const telegramWebApp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const optionKey = mode === "custom" ? `${mode}:${selectedDay}:${selectedTime}` : mode;
    const days = status?.metadata.days ?? [];
    const isCustom = mode === "custom";
    const activeLanguage = __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LANGUAGES"].find((item)=>item.code === language) || __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LANGUAGES"][0];
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((key, params)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["translate"])(language, key, params), [
        language
    ]);
    const triggerTelegramImpact = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((style = "light")=>{
        try {
            telegramWebApp.current?.HapticFeedback?.impactOccurred?.(style);
        } catch  {
        // Telegram clients can omit haptics on unsupported platforms.
        }
    }, []);
    const changeLanguage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((nextLanguage)=>{
        setLanguage(nextLanguage);
        try {
            window.localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LANGUAGE_STORAGE_KEY"], nextLanguage);
        } catch  {
        // Local storage can be unavailable in private contexts.
        }
        document.documentElement.lang = nextLanguage;
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const webApp = window.Telegram?.WebApp;
        if (!webApp?.initData) {
            setTelegramSession({
                isTelegram: false,
                status: "idle"
            });
            return;
        }
        telegramWebApp.current = webApp;
        setInstallPrompt(null);
        setInstallDismissed(true);
        setIsInstalled(true);
        document.documentElement.classList.add("telegram-webapp");
        document.documentElement.dataset.tgPlatform = webApp.platform || "telegram";
        const applyTelegramTheme = ()=>{
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
        } catch  {
            applyTelegramTheme();
        }
        let cancelled = false;
        setTelegramSession({
            isTelegram: true,
            status: "checking",
            colorScheme: webApp.colorScheme,
            platform: webApp.platform
        });
        const verifyTelegramSession = async ()=>{
            try {
                const response = await fetch("/api/telegram/auth", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        initData: webApp.initData
                    }),
                    cache: "no-store"
                });
                const payload = await response.json();
                if (!response.ok) {
                    throw new Error("error" in payload && payload.error || "Telegram authentication failed.");
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
                let savedLanguage = null;
                try {
                    savedLanguage = window.localStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LANGUAGE_STORAGE_KEY"]);
                } catch  {
                    savedLanguage = null;
                }
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isLanguageCode"])(savedLanguage) && telegramLanguage) {
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
        return ()=>{
            cancelled = true;
            webApp.offEvent?.("themeChanged", applyTelegramTheme);
            telegramWebApp.current = null;
            document.documentElement.classList.remove("telegram-webapp");
            delete document.documentElement.dataset.tgPlatform;
            delete document.documentElement.dataset.tgColorScheme;
        };
    }, [
        changeLanguage
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let savedLanguage = null;
        try {
            savedLanguage = window.localStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LANGUAGE_STORAGE_KEY"]);
        } catch  {
            savedLanguage = null;
        }
        const nextLanguage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isLanguageCode"])(savedLanguage) ? savedLanguage : __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DEFAULT_LANGUAGE"];
        setLanguage(nextLanguage);
        document.documentElement.lang = nextLanguage;
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (window.Telegram?.WebApp?.initData) {
            setIsInstalled(true);
            return;
        }
        const navigatorWithStandalone = navigator;
        const standalone = window.matchMedia("(display-mode: standalone)").matches || window.matchMedia("(display-mode: window-controls-overlay)").matches || navigatorWithStandalone.standalone === true;
        setIsInstalled(standalone);
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("/sw.js").catch(()=>undefined);
        }
        const onBeforeInstallPrompt = (event)=>{
            event.preventDefault();
            setInstallPrompt(event);
            setInstallDismissed(false);
        };
        const onAppInstalled = ()=>{
            setInstallPrompt(null);
            setInstallDismissed(true);
            setIsInstalled(true);
        };
        window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
        window.addEventListener("appinstalled", onAppInstalled);
        return ()=>{
            window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
            window.removeEventListener("appinstalled", onAppInstalled);
        };
    }, []);
    const loadStaticTimetable = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (force = false)=>{
        if (!force && staticTimetable.current) return staticTimetable.current;
        const response = await fetch("/timetable.json", {
            cache: force ? "reload" : "force-cache"
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const timetable = await response.json();
        staticTimetable.current = timetable;
        return timetable;
    }, []);
    const loadStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (force = false)=>{
        setIsRefreshing(true);
        setError("");
        try {
            const timetable = await loadStaticTimetable(force);
            const nextStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$next$2f$status$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAvailability"])(timetable, mode === "custom" ? {
                mode,
                day: selectedDay || undefined,
                time: selectedTime || undefined
            } : {
                mode
            });
            setStatus(nextStatus);
            setSelectedRoom((current)=>{
                if (!current) return current;
                return [
                    ...nextStatus.available,
                    ...nextStatus.busy
                ].find((room)=>room.roomKey === current.roomKey) ?? current;
            });
            if (mode !== "custom") {
                setSelectedDay(nextStatus.day);
                setSelectedTime(nextStatus.time);
            }
            if (force) {
                try {
                    telegramWebApp.current?.HapticFeedback?.notificationOccurred?.("success");
                } catch  {
                // Haptics are best effort.
                }
            }
        } catch (loadError) {
            if (force) {
                try {
                    telegramWebApp.current?.HapticFeedback?.notificationOccurred?.("error");
                } catch  {
                // Haptics are best effort.
                }
            }
            setError(loadError instanceof Error ? loadError.message : "Could not load room status.");
        } finally{
            setIsRefreshing(false);
        }
    }, [
        loadStaticTimetable,
        mode,
        selectedDay,
        selectedTime
    ]);
    const installApp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!installPrompt) return;
        await installPrompt.prompt();
        await installPrompt.userChoice.catch(()=>({
                outcome: "dismissed",
                platform: ""
            }));
        setInstallPrompt(null);
        setInstallDismissed(true);
    }, [
        installPrompt
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (initialStatus) return;
        void loadStatus();
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!didMount.current) {
            didMount.current = true;
            return;
        }
        void loadStatus();
    }, [
        optionKey,
        loadStatus
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const interval = window.setInterval(()=>{
            void loadStatus();
        }, 30000);
        return ()=>window.clearInterval(interval);
    }, [
        loadStatus
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!selectedRoom) return;
        const onKeyDown = (event)=>{
            if (event.key === "Escape") setSelectedRoom(null);
        };
        window.addEventListener("keydown", onKeyDown);
        return ()=>window.removeEventListener("keydown", onKeyDown);
    }, [
        selectedRoom
    ]);
    const availableRooms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>(status?.available ?? []).filter((room)=>roomMatches(room, query)), [
        query,
        status
    ]);
    const busyRooms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>showBusy ? (status?.busy ?? []).filter((room)=>roomMatches(room, query)) : [], [
        query,
        showBusy,
        status
    ]);
    const gridRooms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>[
            ...availableRooms.map((room)=>({
                    type: "available",
                    room
                })),
            ...busyRooms.map((room)=>({
                    type: "busy",
                    room
                }))
        ].sort((a, b)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$next$2f$status$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["compareRoomsByFloor"])(a.room, b.room)), [
        availableRooms,
        busyRooms
    ]);
    const floorGroups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>groupRoomsByFloor(gridRooms, t), [
        gridRooms,
        t
    ]);
    const allRooms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>[
            ...status?.available ?? [],
            ...status?.busy ?? []
        ].sort(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$next$2f$status$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["compareRoomsByFloor"]), [
        status
    ]);
    const lookupTime = status?.time || selectedTime || "";
    const groupMatches = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>findGroupMatches(allRooms, groupQuery, lookupTime), [
        allRooms,
        groupQuery,
        lookupTime
    ]);
    const groupDaySchedule = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>groupScheduleForDay(allRooms, groupQuery, lookupTime), [
        allRooms,
        groupQuery,
        lookupTime
    ]);
    const nextGroupClasses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>groupDaySchedule.filter((item)=>item.state === "next"), [
        groupDaySchedule
    ]);
    const groupHasDaySchedule = groupDaySchedule.length > 0;
    const stayStart = selectedTime || status?.time || "";
    const hasValidStayRange = isValidTimeRange(stayStart, stayUntil);
    const stayRooms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>hasValidStayRange ? allRooms.filter((room)=>roomMatches(room, query) && !firstRangeConflict(room, stayStart, stayUntil)) : [], [
        allRooms,
        hasValidStayRange,
        query,
        stayStart,
        stayUntil
    ]);
    const freshness = [
        t("nextApi"),
        formatFetchedAt(status?.metadata.fetchedAt, language, t)
    ].filter(Boolean).join(" - ");
    const stayLabel = !status ? t("loading") : hasValidStayRange ? t("fullStayLabel", {
        count: stayRooms.length,
        day: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["translatedDay"])(status.day, language),
        start: stayStart,
        end: stayUntil
    }) : t("chooseLaterEndTime");
    const openRoom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((room)=>{
        triggerTelegramImpact("light");
        setSelectedRoom(room);
    }, [
        triggerTelegramImpact
    ]);
    const closeRoom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        triggerTelegramImpact("light");
        setSelectedRoom(null);
    }, [
        triggerTelegramImpact
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "shell",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "site-header",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        className: "brand",
                        href: "#top",
                        "aria-label": "PDP Room Finder",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                className: "brand-mark",
                                src: "/icon.svg",
                                alt: "",
                                "aria-hidden": "true",
                                width: 42,
                                height: 42
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 818,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "PDP ROOMS"
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 819,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 817,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "nav-links",
                        "aria-label": "Dashboard sections",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "#terminal",
                                children: t("terminal")
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 822,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "#finder",
                                children: t("finder")
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 823,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "#groups",
                                children: t("group")
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 824,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "#rooms",
                                children: t("rooms")
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 825,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "#sync",
                                children: t("sync")
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 826,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 821,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "top-actions",
                        children: [
                            telegramSession.isTelegram ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `telegram-chip ${telegramSession.status}`,
                                title: telegramSession.error || telegramSession.platform || "Telegram",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "telegram-chip-dot",
                                        "aria-hidden": "true"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/RoomDashboard.tsx",
                                        lineNumber: 834,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: telegramSession.status === "verified" ? telegramDisplayName(telegramSession.user) : "Telegram"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/RoomDashboard.tsx",
                                        lineNumber: 835,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 830,
                                columnNumber: 13
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "language-switcher",
                                role: "radiogroup",
                                "aria-label": t("language"),
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LANGUAGES"].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: `language-option ${language === item.code ? "active" : ""}`,
                                        type: "button",
                                        role: "radio",
                                        "aria-checked": language === item.code,
                                        "aria-label": item.label,
                                        onClick: ()=>changeLanguage(item.code),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `language-flag language-flag-${item.code}`,
                                                "aria-hidden": "true"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                                lineNumber: 849,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: item.short
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                                lineNumber: 850,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, item.code, true, {
                                        fileName: "[project]/app/components/RoomDashboard.tsx",
                                        lineNumber: 840,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 838,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "language-compact-button",
                                type: "button",
                                "aria-label": activeLanguage.label,
                                onClick: ()=>changeLanguage(nextLanguageCode(language)),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `language-flag language-flag-${activeLanguage.code}`,
                                        "aria-hidden": "true"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/RoomDashboard.tsx",
                                        lineNumber: 860,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: activeLanguage.short
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/RoomDashboard.tsx",
                                        lineNumber: 861,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 854,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                id: "refreshButton",
                                type: "button",
                                disabled: isRefreshing,
                                "aria-busy": isRefreshing,
                                onClick: ()=>{
                                    triggerTelegramImpact("light");
                                    void loadStatus(true);
                                },
                                children: t("refresh")
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 863,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("time", {
                                id: "clock",
                                dateTime: status?.timestamp || "",
                                children: status ? `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["translatedDay"])(status.day, language)} ${status.time}` : ""
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 875,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 828,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/RoomDashboard.tsx",
                lineNumber: 816,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "top",
                className: "hero-panel",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                    className: "hero-banner",
                    src: "/assets/room-finder-hero.jpg",
                    alt: t("heroAlt"),
                    width: 1200,
                    height: 630,
                    priority: true
                }, void 0, false, {
                    fileName: "[project]/app/components/RoomDashboard.tsx",
                    lineNumber: 882,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/RoomDashboard.tsx",
                lineNumber: 881,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "terminal",
                className: "metrics",
                "aria-label": "Room status summary",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "metric available",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "metric-value",
                                children: status?.counts.available ?? 0
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 894,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "metric-label",
                                children: t("available")
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 895,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 893,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "metric busy",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "metric-value",
                                children: status?.counts.busy ?? 0
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 898,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "metric-label",
                                children: t("busy")
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 899,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 897,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "metric total",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "metric-value",
                                children: status?.counts.total ?? 0
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 902,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "metric-label",
                                children: t("rooms")
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 903,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 901,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/RoomDashboard.tsx",
                lineNumber: 892,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "finder",
                className: "control-band",
                "aria-label": "Finder controls",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: t("when")
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 909,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: mode,
                                onChange: (event)=>setMode(event.target.value),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "now",
                                        children: t("rightNow")
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/RoomDashboard.tsx",
                                        lineNumber: 911,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "next",
                                        children: t("nextLesson")
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/RoomDashboard.tsx",
                                        lineNumber: 912,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "custom",
                                        children: t("customTime")
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/RoomDashboard.tsx",
                                        lineNumber: 913,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 910,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 908,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: t("day")
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 917,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: selectedDay,
                                disabled: !isCustom,
                                onChange: (event)=>setSelectedDay(event.target.value),
                                children: days.map((day)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: day.name,
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["translatedDay"])(day.name, language)
                                    }, day.name, false, {
                                        fileName: "[project]/app/components/RoomDashboard.tsx",
                                        lineNumber: 920,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 918,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 916,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: t("from")
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 927,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: selectedTime,
                                disabled: !isCustom,
                                type: "time",
                                onChange: (event)=>setSelectedTime(event.target.value)
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 928,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 926,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: t("until")
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 936,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: stayUntil,
                                type: "time",
                                onChange: (event)=>setStayUntil(event.target.value)
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 937,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 935,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "search-label",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: t("room")
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 940,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: query,
                                type: "search",
                                placeholder: t("searchRooms"),
                                onChange: (event)=>setQuery(event.target.value)
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 941,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 939,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "check-label",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                checked: showBusy,
                                onChange: (event)=>setShowBusy(event.target.checked)
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 949,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: t("showBusy")
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 950,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 948,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/RoomDashboard.tsx",
                lineNumber: 907,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "groups",
                className: "group-finder",
                "aria-label": t("groupLocator"),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "section-title",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: t("groupLocator")
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 956,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: status ? `${(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["translatedDay"])(status.day, language)} ${status.time}` : t("loading")
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 957,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 955,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "group-search-label",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: t("group")
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 960,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: groupQuery,
                                type: "search",
                                placeholder: "102",
                                onChange: (event)=>setGroupQuery(event.target.value)
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 961,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 959,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "group-results",
                        "aria-live": "polite",
                        children: !groupQuery.trim() ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "empty-state",
                            children: t("enterGroup")
                        }, void 0, false, {
                            fileName: "[project]/app/components/RoomDashboard.tsx",
                            lineNumber: 970,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                groupMatches.length ? groupMatches.map((match)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                        className: "group-result-card current",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "group-result-main",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "group-result-kicker",
                                                        children: t("inClass")
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/RoomDashboard.tsx",
                                                        lineNumber: 977,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: match.group
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/RoomDashboard.tsx",
                                                        lineNumber: 978,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            match.slot.subject || t("classFallback"),
                                                            " - ",
                                                            match.slot.start,
                                                            "-",
                                                            match.slot.end,
                                                            match.slot.teacher ? ` - ${match.slot.teacher}` : ""
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/components/RoomDashboard.tsx",
                                                        lineNumber: 979,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                                lineNumber: 976,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "group-result-meta",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: t("room")
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/RoomDashboard.tsx",
                                                        lineNumber: 985,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: match.room.room
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/RoomDashboard.tsx",
                                                        lineNumber: 986,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "room-footer room-action",
                                                        type: "button",
                                                        onClick: ()=>openRoom(match.room),
                                                        children: t("open")
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/RoomDashboard.tsx",
                                                        lineNumber: 987,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                                lineNumber: 984,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, `${match.group}-${match.room.roomKey}-${match.slot.start}`, true, {
                                        fileName: "[project]/app/components/RoomDashboard.tsx",
                                        lineNumber: 975,
                                        columnNumber: 19
                                    }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "empty-state",
                                    children: groupHasDaySchedule ? t("groupHasNoClass") : t("noMatchingGroup")
                                }, void 0, false, {
                                    fileName: "[project]/app/components/RoomDashboard.tsx",
                                    lineNumber: 994,
                                    columnNumber: 17
                                }, this),
                                nextGroupClasses.map((match)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                        className: "group-result-card next",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "group-result-main",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "group-result-kicker",
                                                        children: t("nextClass")
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/RoomDashboard.tsx",
                                                        lineNumber: 1002,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: match.group
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/RoomDashboard.tsx",
                                                        lineNumber: 1003,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            match.slot.subject || t("classFallback"),
                                                            " - ",
                                                            match.slot.start,
                                                            "-",
                                                            match.slot.end,
                                                            match.slot.teacher ? ` - ${match.slot.teacher}` : ""
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/components/RoomDashboard.tsx",
                                                        lineNumber: 1004,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                                lineNumber: 1001,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "group-result-meta",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: t("room")
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/RoomDashboard.tsx",
                                                        lineNumber: 1010,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                        children: match.room.room
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/RoomDashboard.tsx",
                                                        lineNumber: 1011,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "room-footer room-action",
                                                        type: "button",
                                                        onClick: ()=>openRoom(match.room),
                                                        children: t("open")
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/components/RoomDashboard.tsx",
                                                        lineNumber: 1012,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                                lineNumber: 1009,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, `next-${match.group}-${match.room.roomKey}-${match.slot.start}`, true, {
                                        fileName: "[project]/app/components/RoomDashboard.tsx",
                                        lineNumber: 1000,
                                        columnNumber: 17
                                    }, this)),
                                groupDaySchedule.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "group-schedule",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "group-schedule-head",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: t("dayClasses")
                                                }, void 0, false, {
                                                    fileName: "[project]/app/components/RoomDashboard.tsx",
                                                    lineNumber: 1022,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: [
                                                        groupDaySchedule.length,
                                                        " ",
                                                        t("lesson").toLowerCase()
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/components/RoomDashboard.tsx",
                                                    lineNumber: 1023,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/RoomDashboard.tsx",
                                            lineNumber: 1021,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "group-schedule-list",
                                            children: groupDaySchedule.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                                    className: `group-schedule-item ${item.state}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "group-schedule-time",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: groupScheduleStateLabel(item.state, t)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/RoomDashboard.tsx",
                                                                    lineNumber: 1032,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    children: [
                                                                        item.slot.start,
                                                                        "-",
                                                                        item.slot.end
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/components/RoomDashboard.tsx",
                                                                    lineNumber: 1033,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/components/RoomDashboard.tsx",
                                                            lineNumber: 1031,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "group-schedule-main",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                                    children: item.slot.subject || t("classFallback")
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/RoomDashboard.tsx",
                                                                    lineNumber: 1036,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    children: [
                                                                        item.group,
                                                                        item.slot.teacher ? ` - ${item.slot.teacher}` : ""
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/components/RoomDashboard.tsx",
                                                                    lineNumber: 1037,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/components/RoomDashboard.tsx",
                                                            lineNumber: 1035,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "group-schedule-room",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: t("room")
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/RoomDashboard.tsx",
                                                                    lineNumber: 1043,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    className: "room-action",
                                                                    type: "button",
                                                                    onClick: ()=>openRoom(item.room),
                                                                    children: item.room.room
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/components/RoomDashboard.tsx",
                                                                    lineNumber: 1044,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/components/RoomDashboard.tsx",
                                                            lineNumber: 1042,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, `${item.group}-${item.room.roomKey}-${item.slot.start}-${item.slot.end}`, true, {
                                                    fileName: "[project]/app/components/RoomDashboard.tsx",
                                                    lineNumber: 1027,
                                                    columnNumber: 23
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/RoomDashboard.tsx",
                                            lineNumber: 1025,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/RoomDashboard.tsx",
                                    lineNumber: 1020,
                                    columnNumber: 17
                                }, this) : null
                            ]
                        }, void 0, true)
                    }, void 0, false, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 968,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/RoomDashboard.tsx",
                lineNumber: 954,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "finder",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "section-title",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    children: t("whereToGo")
                                }, void 0, false, {
                                    fileName: "[project]/app/components/RoomDashboard.tsx",
                                    lineNumber: 1061,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: status ? `${currentModeLabel(status, t)} - ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$i18n$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["translatedDay"])(status.day, language)} ${status.time}` : t("loading")
                                }, void 0, false, {
                                    fileName: "[project]/app/components/RoomDashboard.tsx",
                                    lineNumber: 1062,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/RoomDashboard.tsx",
                            lineNumber: 1060,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "room-strip",
                            "aria-live": "polite",
                            children: availableRooms.length ? availableRooms.map((room)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "pill",
                                    children: room.room
                                }, room.roomKey, false, {
                                    fileName: "[project]/app/components/RoomDashboard.tsx",
                                    lineNumber: 1071,
                                    columnNumber: 17
                                }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "empty-state",
                                children: error || t("noMatchingFreeRooms")
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 1076,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/RoomDashboard.tsx",
                            lineNumber: 1068,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/RoomDashboard.tsx",
                    lineNumber: 1059,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/RoomDashboard.tsx",
                lineNumber: 1058,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "finder stay-finder",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "section-title",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    children: t("fullStay")
                                }, void 0, false, {
                                    fileName: "[project]/app/components/RoomDashboard.tsx",
                                    lineNumber: 1085,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: stayLabel
                                }, void 0, false, {
                                    fileName: "[project]/app/components/RoomDashboard.tsx",
                                    lineNumber: 1086,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/RoomDashboard.tsx",
                            lineNumber: 1084,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "room-strip",
                            "aria-live": "polite",
                            children: hasValidStayRange && stayRooms.length ? stayRooms.map((room)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "pill stay-pill",
                                    children: room.room
                                }, room.roomKey, false, {
                                    fileName: "[project]/app/components/RoomDashboard.tsx",
                                    lineNumber: 1091,
                                    columnNumber: 17
                                }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "empty-state",
                                children: hasValidStayRange ? error || t("noRoomsFullStay") : t("setLaterEndTime")
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 1096,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/RoomDashboard.tsx",
                            lineNumber: 1088,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/RoomDashboard.tsx",
                    lineNumber: 1083,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/RoomDashboard.tsx",
                lineNumber: 1082,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "rooms",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        id: "sync",
                        className: "section-title",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: t("liveStatus")
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 1106,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: error || freshness
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 1107,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 1105,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "floor-groups",
                        "aria-live": "polite",
                        children: floorGroups.length ? floorGroups.map((group)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "floor-group",
                                "aria-label": group.label,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "floor-heading",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: group.label
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                                lineNumber: 1114,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: [
                                                    group.rooms.length,
                                                    " rooms"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                                lineNumber: 1115,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/RoomDashboard.tsx",
                                        lineNumber: 1113,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "room-grid",
                                        children: group.rooms.map((item)=>item.type === "busy" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(BusyCard, {
                                                room: item.room,
                                                onOpen: openRoom,
                                                t: t
                                            }, `${item.type}-${item.room.roomKey}`, false, {
                                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                                lineNumber: 1120,
                                                columnNumber: 23
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AvailableCard, {
                                                room: item.room,
                                                onOpen: openRoom,
                                                t: t
                                            }, `${item.type}-${item.room.roomKey}`, false, {
                                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                                lineNumber: 1127,
                                                columnNumber: 23
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/RoomDashboard.tsx",
                                        lineNumber: 1117,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, group.floor ?? "unknown", true, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 1112,
                                columnNumber: 15
                            }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "empty-state",
                            children: error || t("noMatchingRooms")
                        }, void 0, false, {
                            fileName: "[project]/app/components/RoomDashboard.tsx",
                            lineNumber: 1139,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 1109,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/RoomDashboard.tsx",
                lineNumber: 1104,
                columnNumber: 7
            }, this),
            selectedRoom && status ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RoomPlanModal, {
                room: selectedRoom,
                day: status.day,
                time: status.time,
                language: language,
                t: t,
                onClose: closeRoom
            }, void 0, false, {
                fileName: "[project]/app/components/RoomDashboard.tsx",
                lineNumber: 1144,
                columnNumber: 9
            }, this) : null,
            installPrompt && !installDismissed && !isInstalled ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "install-card",
                "aria-label": "Install PDP Room Finder",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "install-card-top",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "install-badge",
                                children: "Install Available"
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 1156,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "install-close",
                                type: "button",
                                "aria-label": "Close install prompt",
                                onClick: ()=>setInstallDismissed(true),
                                children: "×"
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 1157,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 1155,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "install-card-body",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        children: "Install PDP Room Finder"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/RoomDashboard.tsx",
                                        lineNumber: 1168,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: "Add PDP Room Finder to your device for faster launch and quick room checks."
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/RoomDashboard.tsx",
                                        lineNumber: 1169,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 1167,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "/icon.svg",
                                alt: "",
                                "aria-hidden": "true",
                                width: 58,
                                height: 58
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 1171,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 1166,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "install-card-actions",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "install-primary",
                                type: "button",
                                onClick: ()=>void installApp(),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        "aria-hidden": "true",
                                        viewBox: "0 0 24 24",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M12 3v11m0 0 4-4m-4 4-4-4M5 17v3h14v-3"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/RoomDashboard.tsx",
                                            lineNumber: 1176,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/RoomDashboard.tsx",
                                        lineNumber: 1175,
                                        columnNumber: 15
                                    }, this),
                                    "Install App"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 1174,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "install-secondary",
                                type: "button",
                                onClick: ()=>setInstallDismissed(true),
                                children: "Maybe later"
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 1180,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 1173,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/RoomDashboard.tsx",
                lineNumber: 1154,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/RoomDashboard.tsx",
        lineNumber: 815,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_0hqtj82._.js.map