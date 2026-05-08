(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/next/status.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/components/RoomDashboard.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RoomDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$next$2f$status$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/next/status.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function formatFetchedAt(value) {
    if (!value) return "";
    const date = new Date(value);
    return `Synced ${date.toLocaleString([], {
        dateStyle: "medium",
        timeStyle: "short"
    })}`;
}
function roomMatches(room, query) {
    return room.room.toLowerCase().includes(query.toLowerCase());
}
function slotSummary(slot) {
    if (slot.status !== "busy") return "Open";
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
function slotClassNames(slot) {
    return Array.isArray(slot.classes) ? slot.classes.filter((item)=>typeof item === "string") : [];
}
function classMatchesGroup(className, query) {
    const trimmedQuery = query.trim().toLowerCase();
    const normalizedQuery = normalizeLookup(query);
    if (!normalizedQuery) return false;
    return className.toLowerCase().includes(trimmedQuery) || normalizeLookup(className).includes(normalizedQuery);
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
function hasGroupOnDay(rooms, query) {
    if (!query.trim()) return false;
    return rooms.some((room)=>room.dailyPlan?.some((slot)=>matchingGroups(slot, query).length));
}
function fallbackFloorLabel(room) {
    return room.floorLabel || "Floor unknown";
}
function groupRoomsByFloor(rooms) {
    return rooms.reduce((groups, item)=>{
        const floor = item.room.floor ?? null;
        const label = fallbackFloorLabel(item.room);
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
function AvailableCard({ room, onOpen }) {
    const next = room.nextBusyAt ? `Free until ${room.nextBusyAt}` : "Free for the visible schedule";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: "room-card available",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "room-head",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "room-name",
                                children: room.room
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 145,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "room-floor",
                                children: fallbackFloorLabel(room)
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 146,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "status-dot",
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 148,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/RoomDashboard.tsx",
                lineNumber: 143,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "room-detail",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: "Available"
                    }, void 0, false, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, this),
                    next
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/RoomDashboard.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "room-footer room-action",
                type: "button",
                onClick: ()=>onOpen(room),
                children: "Open"
            }, void 0, false, {
                fileName: "[project]/app/components/RoomDashboard.tsx",
                lineNumber: 154,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/RoomDashboard.tsx",
        lineNumber: 142,
        columnNumber: 5
    }, this);
}
_c = AvailableCard;
function BusyCard({ room, onOpen }) {
    const details = room.details || {};
    const classes = Array.isArray(details.classes) && details.classes.length ? ` - ${details.classes.join(", ")}` : "";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: "room-card busy",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "room-head",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "room-name",
                                children: room.room
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 169,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "room-floor",
                                children: fallbackFloorLabel(room)
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 170,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 168,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "status-dot",
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 172,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/RoomDashboard.tsx",
                lineNumber: 167,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "room-detail",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: details.subject || "Busy"
                    }, void 0, false, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 175,
                        columnNumber: 9
                    }, this),
                    details.start,
                    "-",
                    details.end,
                    classes,
                    details.teacher ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 180,
                                columnNumber: 13
                            }, this),
                            details.teacher
                        ]
                    }, void 0, true) : null
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/RoomDashboard.tsx",
                lineNumber: 174,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "room-footer room-action",
                type: "button",
                onClick: ()=>onOpen(room),
                children: [
                    "Busy until ",
                    room.until
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/RoomDashboard.tsx",
                lineNumber: 185,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/RoomDashboard.tsx",
        lineNumber: 166,
        columnNumber: 5
    }, this);
}
_c1 = BusyCard;
function RoomPlanModal({ room, day, time, onClose }) {
    const plan = room.dailyPlan ?? [];
    const titleId = `room-plan-${room.roomKey}`;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "modal-backdrop",
        role: "presentation",
        onMouseDown: (event)=>{
            if (event.target === event.currentTarget) onClose();
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
            className: "room-modal",
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": titleId,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "modal-head",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "modal-kicker",
                                    children: [
                                        day,
                                        " plan"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/RoomDashboard.tsx",
                                    lineNumber: 213,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    id: titleId,
                                    children: room.room
                                }, void 0, false, {
                                    fileName: "[project]/app/components/RoomDashboard.tsx",
                                    lineNumber: 214,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/RoomDashboard.tsx",
                            lineNumber: 212,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "modal-close",
                            type: "button",
                            "aria-label": "Close room plan",
                            onClick: onClose,
                            children: "Close"
                        }, void 0, false, {
                            fileName: "[project]/app/components/RoomDashboard.tsx",
                            lineNumber: 216,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/RoomDashboard.tsx",
                    lineNumber: 211,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "plan-list",
                    children: plan.length ? plan.map((slot)=>{
                        const isBusy = slot.status === "busy";
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `plan-item ${isBusy ? "busy" : "available"}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "plan-time",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: [
                                                slot.start,
                                                "-",
                                                slot.end
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/components/RoomDashboard.tsx",
                                            lineNumber: 228,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: slot.periodName || slot.period || "Lesson"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/RoomDashboard.tsx",
                                            lineNumber: 229,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/RoomDashboard.tsx",
                                    lineNumber: 227,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "plan-content",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                            children: isBusy ? slot.subject || "Class" : "Available"
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/RoomDashboard.tsx",
                                            lineNumber: 232,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: slotSummary(slot)
                                        }, void 0, false, {
                                            fileName: "[project]/app/components/RoomDashboard.tsx",
                                            lineNumber: 233,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/components/RoomDashboard.tsx",
                                    lineNumber: 231,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, `${slot.periodName}-${slot.start}`, true, {
                            fileName: "[project]/app/components/RoomDashboard.tsx",
                            lineNumber: 226,
                            columnNumber: 17
                        }, this);
                    }) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "empty-state",
                        children: "No plan for this day"
                    }, void 0, false, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 239,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/components/RoomDashboard.tsx",
                    lineNumber: 221,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "modal-foot",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Now"
                        }, void 0, false, {
                            fileName: "[project]/app/components/RoomDashboard.tsx",
                            lineNumber: 244,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("time", {
                            children: time
                        }, void 0, false, {
                            fileName: "[project]/app/components/RoomDashboard.tsx",
                            lineNumber: 245,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/RoomDashboard.tsx",
                    lineNumber: 243,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/components/RoomDashboard.tsx",
            lineNumber: 210,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/components/RoomDashboard.tsx",
        lineNumber: 207,
        columnNumber: 5
    }, this);
}
_c2 = RoomPlanModal;
function RoomDashboard({ initialStatus, initialError }) {
    _s();
    const periods = initialStatus?.metadata.periods ?? [];
    const defaultStayUntil = periods[periods.length - 1]?.end || "17:00";
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialStatus);
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialStatus?.mode || "now");
    const [selectedDay, setSelectedDay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialStatus?.day || "");
    const [selectedTime, setSelectedTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialStatus?.time || "");
    const [stayUntil, setStayUntil] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultStayUntil);
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [groupQuery, setGroupQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [showBusy, setShowBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isRefreshing, setIsRefreshing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialError);
    const [selectedRoom, setSelectedRoom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const didMount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const optionKey = mode === "custom" ? `${mode}:${selectedDay}:${selectedTime}` : mode;
    const days = status?.metadata.days ?? [];
    const isCustom = mode === "custom";
    const loadStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "RoomDashboard.useCallback[loadStatus]": async (force = false)=>{
            const params = new URLSearchParams({
                mode
            });
            if (mode === "custom") {
                if (selectedDay) params.set("day", selectedDay);
                if (selectedTime) params.set("time", selectedTime);
            }
            if (force) params.set("reload", "1");
            setIsRefreshing(true);
            setError("");
            try {
                const response = await fetch(`/api/status?${params.toString()}`, {
                    cache: "no-store"
                });
                const payload = await response.json();
                if (!response.ok) {
                    throw new Error("error" in payload && payload.error ? payload.error : `HTTP ${response.status}`);
                }
                const nextStatus = payload;
                setStatus(nextStatus);
                setSelectedRoom({
                    "RoomDashboard.useCallback[loadStatus]": (current)=>{
                        if (!current) return current;
                        return [
                            ...nextStatus.available,
                            ...nextStatus.busy
                        ].find({
                            "RoomDashboard.useCallback[loadStatus]": (room)=>room.roomKey === current.roomKey
                        }["RoomDashboard.useCallback[loadStatus]"]) ?? current;
                    }
                }["RoomDashboard.useCallback[loadStatus]"]);
                if (mode !== "custom") {
                    setSelectedDay(nextStatus.day);
                    setSelectedTime(nextStatus.time);
                }
            } catch (loadError) {
                setError(loadError instanceof Error ? loadError.message : "Could not load room status.");
            } finally{
                setIsRefreshing(false);
            }
        }
    }["RoomDashboard.useCallback[loadStatus]"], [
        mode,
        selectedDay,
        selectedTime
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RoomDashboard.useEffect": ()=>{
            if (!didMount.current) {
                didMount.current = true;
                return;
            }
            void loadStatus();
        }
    }["RoomDashboard.useEffect"], [
        optionKey,
        loadStatus
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RoomDashboard.useEffect": ()=>{
            const interval = window.setInterval({
                "RoomDashboard.useEffect.interval": ()=>{
                    void loadStatus();
                }
            }["RoomDashboard.useEffect.interval"], 30000);
            return ({
                "RoomDashboard.useEffect": ()=>window.clearInterval(interval)
            })["RoomDashboard.useEffect"];
        }
    }["RoomDashboard.useEffect"], [
        loadStatus
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RoomDashboard.useEffect": ()=>{
            if (!selectedRoom) return;
            const onKeyDown = {
                "RoomDashboard.useEffect.onKeyDown": (event)=>{
                    if (event.key === "Escape") setSelectedRoom(null);
                }
            }["RoomDashboard.useEffect.onKeyDown"];
            window.addEventListener("keydown", onKeyDown);
            return ({
                "RoomDashboard.useEffect": ()=>window.removeEventListener("keydown", onKeyDown)
            })["RoomDashboard.useEffect"];
        }
    }["RoomDashboard.useEffect"], [
        selectedRoom
    ]);
    const availableRooms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RoomDashboard.useMemo[availableRooms]": ()=>(status?.available ?? []).filter({
                "RoomDashboard.useMemo[availableRooms]": (room)=>roomMatches(room, query)
            }["RoomDashboard.useMemo[availableRooms]"])
    }["RoomDashboard.useMemo[availableRooms]"], [
        query,
        status
    ]);
    const busyRooms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RoomDashboard.useMemo[busyRooms]": ()=>showBusy ? (status?.busy ?? []).filter({
                "RoomDashboard.useMemo[busyRooms]": (room)=>roomMatches(room, query)
            }["RoomDashboard.useMemo[busyRooms]"]) : []
    }["RoomDashboard.useMemo[busyRooms]"], [
        query,
        showBusy,
        status
    ]);
    const gridRooms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RoomDashboard.useMemo[gridRooms]": ()=>[
                ...availableRooms.map({
                    "RoomDashboard.useMemo[gridRooms]": (room)=>({
                            type: "available",
                            room
                        })
                }["RoomDashboard.useMemo[gridRooms]"]),
                ...busyRooms.map({
                    "RoomDashboard.useMemo[gridRooms]": (room)=>({
                            type: "busy",
                            room
                        })
                }["RoomDashboard.useMemo[gridRooms]"])
            ].sort({
                "RoomDashboard.useMemo[gridRooms]": (a, b)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$next$2f$status$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compareRoomsByFloor"])(a.room, b.room)
            }["RoomDashboard.useMemo[gridRooms]"])
    }["RoomDashboard.useMemo[gridRooms]"], [
        availableRooms,
        busyRooms
    ]);
    const floorGroups = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RoomDashboard.useMemo[floorGroups]": ()=>groupRoomsByFloor(gridRooms)
    }["RoomDashboard.useMemo[floorGroups]"], [
        gridRooms
    ]);
    const allRooms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RoomDashboard.useMemo[allRooms]": ()=>[
                ...status?.available ?? [],
                ...status?.busy ?? []
            ].sort(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$next$2f$status$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["compareRoomsByFloor"])
    }["RoomDashboard.useMemo[allRooms]"], [
        status
    ]);
    const lookupTime = status?.time || selectedTime || "";
    const groupMatches = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RoomDashboard.useMemo[groupMatches]": ()=>findGroupMatches(allRooms, groupQuery, lookupTime)
    }["RoomDashboard.useMemo[groupMatches]"], [
        allRooms,
        groupQuery,
        lookupTime
    ]);
    const groupHasDaySchedule = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RoomDashboard.useMemo[groupHasDaySchedule]": ()=>hasGroupOnDay(allRooms, groupQuery)
    }["RoomDashboard.useMemo[groupHasDaySchedule]"], [
        allRooms,
        groupQuery
    ]);
    const stayStart = selectedTime || status?.time || "";
    const hasValidStayRange = isValidTimeRange(stayStart, stayUntil);
    const stayRooms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "RoomDashboard.useMemo[stayRooms]": ()=>hasValidStayRange ? allRooms.filter({
                "RoomDashboard.useMemo[stayRooms]": (room)=>roomMatches(room, query) && !firstRangeConflict(room, stayStart, stayUntil)
            }["RoomDashboard.useMemo[stayRooms]"]) : []
    }["RoomDashboard.useMemo[stayRooms]"], [
        allRooms,
        hasValidStayRange,
        query,
        stayStart,
        stayUntil
    ]);
    const freshness = [
        "Next API",
        formatFetchedAt(status?.metadata.fetchedAt)
    ].filter(Boolean).join(" - ");
    const stayLabel = !status ? "Loading" : hasValidStayRange ? `${stayRooms.length} rooms - ${status.day} ${stayStart}-${stayUntil}` : "Choose a later end time";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "shell",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "site-header",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        className: "brand",
                        href: "#top",
                        "aria-label": "PDP Room Finder",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "brand-mark",
                                "aria-hidden": "true",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                    fileName: "[project]/app/components/RoomDashboard.tsx",
                                    lineNumber: 390,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 389,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "PDP ROOMS"
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 392,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 388,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "nav-links",
                        "aria-label": "Dashboard sections",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "#terminal",
                                children: "Terminal"
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 395,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "#finder",
                                children: "Finder"
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 396,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "#groups",
                                children: "Groups"
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 397,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "#rooms",
                                children: "Rooms"
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 398,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "#sync",
                                children: "Sync"
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 399,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 394,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "top-actions",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                id: "refreshButton",
                                type: "button",
                                disabled: isRefreshing,
                                "aria-busy": isRefreshing,
                                onClick: ()=>void loadStatus(true),
                                children: "Refresh"
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 402,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("time", {
                                id: "clock",
                                dateTime: status?.timestamp || "",
                                children: status ? `${status.day} ${status.time}` : ""
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 411,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 401,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/RoomDashboard.tsx",
                lineNumber: 387,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "top",
                className: "hero-panel",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    className: "hero-banner",
                    src: "/assets/share-preview-20260506.png",
                    alt: "Room Finder realtime campus routing banner",
                    width: 1200,
                    height: 630,
                    priority: true
                }, void 0, false, {
                    fileName: "[project]/app/components/RoomDashboard.tsx",
                    lineNumber: 418,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/RoomDashboard.tsx",
                lineNumber: 417,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "terminal",
                className: "metrics",
                "aria-label": "Room status summary",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "metric available",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "metric-value",
                                children: status?.counts.available ?? 0
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 430,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "metric-label",
                                children: "Available"
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 431,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 429,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "metric busy",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "metric-value",
                                children: status?.counts.busy ?? 0
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 434,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "metric-label",
                                children: "Busy"
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 435,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 433,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "metric total",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "metric-value",
                                children: status?.counts.total ?? 0
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 438,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "metric-label",
                                children: "Rooms"
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 439,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 437,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/RoomDashboard.tsx",
                lineNumber: 428,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "finder",
                className: "control-band",
                "aria-label": "Finder controls",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "When"
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 445,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: mode,
                                onChange: (event)=>setMode(event.target.value),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "now",
                                        children: "Right now"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/RoomDashboard.tsx",
                                        lineNumber: 447,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "next",
                                        children: "Next lesson"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/RoomDashboard.tsx",
                                        lineNumber: 448,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "custom",
                                        children: "Custom time"
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/RoomDashboard.tsx",
                                        lineNumber: 449,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 446,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 444,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Day"
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 453,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: selectedDay,
                                disabled: !isCustom,
                                onChange: (event)=>setSelectedDay(event.target.value),
                                children: days.map((day)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: day.name,
                                        children: day.name
                                    }, day.name, false, {
                                        fileName: "[project]/app/components/RoomDashboard.tsx",
                                        lineNumber: 456,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 454,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 452,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "From"
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 463,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: selectedTime,
                                disabled: !isCustom,
                                type: "time",
                                onChange: (event)=>setSelectedTime(event.target.value)
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 464,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 462,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Until"
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 472,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: stayUntil,
                                type: "time",
                                onChange: (event)=>setStayUntil(event.target.value)
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 473,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 471,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "search-label",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Room"
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 476,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: query,
                                type: "search",
                                placeholder: "Search rooms",
                                onChange: (event)=>setQuery(event.target.value)
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 477,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 475,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "check-label",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "checkbox",
                                checked: showBusy,
                                onChange: (event)=>setShowBusy(event.target.checked)
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 485,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Show busy"
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 486,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 484,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/RoomDashboard.tsx",
                lineNumber: 443,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "groups",
                className: "group-finder",
                "aria-label": "Group locator",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "section-title",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: "Group Locator"
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 492,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: status ? `${status.day} ${status.time}` : "Loading"
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 493,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 491,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "group-search-label",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Group"
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 496,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: groupQuery,
                                type: "search",
                                placeholder: "102",
                                onChange: (event)=>setGroupQuery(event.target.value)
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 497,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 495,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "group-results",
                        "aria-live": "polite",
                        children: !groupQuery.trim() ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "empty-state",
                            children: "Enter a group"
                        }, void 0, false, {
                            fileName: "[project]/app/components/RoomDashboard.tsx",
                            lineNumber: 506,
                            columnNumber: 13
                        }, this) : groupMatches.length ? groupMatches.map((match)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                className: "group-result-card",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "group-result-main",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "group-result-kicker",
                                                children: "In class"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                                lineNumber: 511,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: match.group
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                                lineNumber: 512,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: [
                                                    match.slot.subject || "Class",
                                                    " - ",
                                                    match.slot.start,
                                                    "-",
                                                    match.slot.end,
                                                    match.slot.teacher ? ` - ${match.slot.teacher}` : ""
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                                lineNumber: 513,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/RoomDashboard.tsx",
                                        lineNumber: 510,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "group-result-meta",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Room"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                                lineNumber: 519,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: match.room.room
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                                lineNumber: 520,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "room-footer room-action",
                                                type: "button",
                                                onClick: ()=>setSelectedRoom(match.room),
                                                children: "Open"
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                                lineNumber: 521,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/RoomDashboard.tsx",
                                        lineNumber: 518,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, `${match.group}-${match.room.roomKey}-${match.slot.start}`, true, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 509,
                                columnNumber: 15
                            }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "empty-state",
                            children: groupHasDaySchedule ? "Group has no class at this time" : "No matching group on this day"
                        }, void 0, false, {
                            fileName: "[project]/app/components/RoomDashboard.tsx",
                            lineNumber: 528,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 504,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/RoomDashboard.tsx",
                lineNumber: 490,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "finder",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "section-title",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    children: "Where To Go"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/RoomDashboard.tsx",
                                    lineNumber: 538,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: status ? `${status.modeLabel} - ${status.day} ${status.time}` : "Loading"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/RoomDashboard.tsx",
                                    lineNumber: 539,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/RoomDashboard.tsx",
                            lineNumber: 537,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "room-strip",
                            "aria-live": "polite",
                            children: availableRooms.length ? availableRooms.map((room)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "pill",
                                    children: room.room
                                }, room.roomKey, false, {
                                    fileName: "[project]/app/components/RoomDashboard.tsx",
                                    lineNumber: 544,
                                    columnNumber: 17
                                }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "empty-state",
                                children: error || "No matching free rooms"
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 549,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/RoomDashboard.tsx",
                            lineNumber: 541,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/RoomDashboard.tsx",
                    lineNumber: 536,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/RoomDashboard.tsx",
                lineNumber: 535,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "finder stay-finder",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "section-title",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    children: "Full Stay"
                                }, void 0, false, {
                                    fileName: "[project]/app/components/RoomDashboard.tsx",
                                    lineNumber: 558,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: stayLabel
                                }, void 0, false, {
                                    fileName: "[project]/app/components/RoomDashboard.tsx",
                                    lineNumber: 559,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/components/RoomDashboard.tsx",
                            lineNumber: 557,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "room-strip",
                            "aria-live": "polite",
                            children: hasValidStayRange && stayRooms.length ? stayRooms.map((room)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "pill stay-pill",
                                    children: room.room
                                }, room.roomKey, false, {
                                    fileName: "[project]/app/components/RoomDashboard.tsx",
                                    lineNumber: 564,
                                    columnNumber: 17
                                }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "empty-state",
                                children: hasValidStayRange ? error || "No rooms free for the whole time" : "Set a later end time"
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 569,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/components/RoomDashboard.tsx",
                            lineNumber: 561,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/components/RoomDashboard.tsx",
                    lineNumber: 556,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/components/RoomDashboard.tsx",
                lineNumber: 555,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "rooms",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        id: "sync",
                        className: "section-title",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: "Live Status"
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 579,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: error || freshness
                            }, void 0, false, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 580,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 578,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "floor-groups",
                        "aria-live": "polite",
                        children: floorGroups.length ? floorGroups.map((group)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "floor-group",
                                "aria-label": group.label,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "floor-heading",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: group.label
                                            }, void 0, false, {
                                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                                lineNumber: 587,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: [
                                                    group.rooms.length,
                                                    " rooms"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                                lineNumber: 588,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/components/RoomDashboard.tsx",
                                        lineNumber: 586,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "room-grid",
                                        children: group.rooms.map((item)=>item.type === "busy" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BusyCard, {
                                                room: item.room,
                                                onOpen: setSelectedRoom
                                            }, `${item.type}-${item.room.roomKey}`, false, {
                                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                                lineNumber: 593,
                                                columnNumber: 23
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AvailableCard, {
                                                room: item.room,
                                                onOpen: setSelectedRoom
                                            }, `${item.type}-${item.room.roomKey}`, false, {
                                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                                lineNumber: 595,
                                                columnNumber: 23
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/components/RoomDashboard.tsx",
                                        lineNumber: 590,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, group.floor ?? "unknown", true, {
                                fileName: "[project]/app/components/RoomDashboard.tsx",
                                lineNumber: 585,
                                columnNumber: 15
                            }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "empty-state",
                            children: error || "No matching rooms"
                        }, void 0, false, {
                            fileName: "[project]/app/components/RoomDashboard.tsx",
                            lineNumber: 606,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/components/RoomDashboard.tsx",
                        lineNumber: 582,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/components/RoomDashboard.tsx",
                lineNumber: 577,
                columnNumber: 7
            }, this),
            selectedRoom && status ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RoomPlanModal, {
                room: selectedRoom,
                day: status.day,
                time: status.time,
                onClose: ()=>setSelectedRoom(null)
            }, void 0, false, {
                fileName: "[project]/app/components/RoomDashboard.tsx",
                lineNumber: 611,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/app/components/RoomDashboard.tsx",
        lineNumber: 386,
        columnNumber: 5
    }, this);
}
_s(RoomDashboard, "Zcl82d4TZ5YLHmPVVSNc2KSw3LQ=");
_c3 = RoomDashboard;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "AvailableCard");
__turbopack_context__.k.register(_c1, "BusyCard");
__turbopack_context__.k.register(_c2, "RoomPlanModal");
__turbopack_context__.k.register(_c3, "RoomDashboard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_0t78eww._.js.map