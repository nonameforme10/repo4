module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/next/status.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
"[externals]/node:fs/promises [external] (node:fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:fs/promises", () => require("node:fs/promises"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[externals]/node:url [external] (node:url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:url", () => require("node:url"));

module.exports = mod;
}),
"[project]/src/next/storage.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PUBLIC_TIMETABLE_DATA_URL",
    ()=>PUBLIC_TIMETABLE_DATA_URL,
    "TIMETABLE_DATA_URL",
    ()=>TIMETABLE_DATA_URL,
    "clearTimetableCache",
    ()=>clearTimetableCache,
    "loadTimetable",
    ()=>loadTimetable,
    "readTimetableData",
    ()=>readTimetableData,
    "readTimetableDataWithFallback",
    ()=>readTimetableDataWithFallback,
    "writeTimetableData",
    ()=>writeTimetableData
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs/promises [external] (node:fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$url__$5b$external$5d$__$28$node$3a$url$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:url [external] (node:url, cjs)");
;
;
;
const ROOT_DIR = process.cwd();
const TIMETABLE_DATA_URL = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$url__$5b$external$5d$__$28$node$3a$url$2c$__cjs$29$__["pathToFileURL"])((0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["join"])(ROOT_DIR, "data", "timetable.json"));
const PUBLIC_TIMETABLE_DATA_URL = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$url__$5b$external$5d$__$28$node$3a$url$2c$__cjs$29$__["pathToFileURL"])((0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["join"])(ROOT_DIR, "public", "timetable.json"));
let timetableCache = null;
function clearTimetableCache() {
    timetableCache = null;
}
async function readTimetableData(fileUrl = TIMETABLE_DATA_URL) {
    const text = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["readFile"])(fileUrl, "utf8");
    return JSON.parse(text);
}
async function readTimetableDataWithFallback(fileUrl = TIMETABLE_DATA_URL) {
    try {
        return await readTimetableData(fileUrl);
    } catch (error) {
        if (error.code !== "ENOENT" || fileUrl === PUBLIC_TIMETABLE_DATA_URL) {
            throw error;
        }
        return readTimetableData(PUBLIC_TIMETABLE_DATA_URL);
    }
}
async function loadTimetable(force = false) {
    if (!force && timetableCache) return timetableCache;
    timetableCache = await readTimetableDataWithFallback();
    return timetableCache;
}
async function writeTimetableData(data, fileUrl = TIMETABLE_DATA_URL) {
    const filePath = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$url__$5b$external$5d$__$28$node$3a$url$2c$__cjs$29$__["fileURLToPath"])(fileUrl);
    await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["mkdir"])((0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["dirname"])(filePath), {
        recursive: true
    });
    await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["writeFile"])(fileUrl, `${JSON.stringify(data, null, 2)}\n`, "utf8");
    return filePath;
}
}),
"[project]/app/api/status/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "dynamic",
    ()=>dynamic,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$next$2f$status$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/next/status.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$next$2f$storage$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/next/storage.ts [app-route] (ecmascript)");
;
;
;
const dynamic = "force-dynamic";
const runtime = "nodejs";
function availabilityMode(value) {
    return value === "next" || value === "custom" ? value : "now";
}
async function GET(request) {
    try {
        const params = request.nextUrl.searchParams;
        const mode = availabilityMode(params.get("mode"));
        const day = params.get("day") || undefined;
        const time = params.get("time") || undefined;
        const force = params.get("reload") === "1";
        const timetable = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$next$2f$storage$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["loadTimetable"])(force);
        const status = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$next$2f$status$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getAvailability"])(timetable, {
            mode,
            day,
            time
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(status, {
            headers: {
                "Cache-Control": "no-store"
            }
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Internal server error";
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0fw-.6w._.js.map