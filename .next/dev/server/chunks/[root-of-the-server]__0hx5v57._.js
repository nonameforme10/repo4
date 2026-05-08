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
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/api/telegram/auth/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "dynamic",
    ()=>dynamic,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
;
const dynamic = "force-dynamic";
const runtime = "nodejs";
const INIT_DATA_TTL_SECONDS = 60 * 60 * 24;
const FUTURE_SKEW_SECONDS = 60;
function getBotToken() {
    return process.env.TELEGRAM_BOT_TOKEN || process.env["TELEGRAM-BOT-TOKEN"] || "";
}
function jsonError(message, status = 401) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        ok: false,
        error: message
    }, {
        status,
        headers: {
            "Cache-Control": "no-store"
        }
    });
}
function parseJsonParam(params, key) {
    const value = params.get(key);
    if (!value) return undefined;
    try {
        return JSON.parse(value);
    } catch  {
        return undefined;
    }
}
function createDataCheckString(params) {
    return Array.from(params.entries()).filter(([key])=>key !== "hash").map(([key, value])=>`${key}=${value}`).sort().join("\n");
}
function secureCompareHex(expectedHex, receivedHex) {
    if (!/^[a-f0-9]{64}$/i.test(expectedHex) || !/^[a-f0-9]{64}$/i.test(receivedHex)) {
        return false;
    }
    const expected = Buffer.from(expectedHex, "hex");
    const received = Buffer.from(receivedHex, "hex");
    return expected.length === received.length && (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["timingSafeEqual"])(expected, received);
}
function validateInitData(initData, botToken) {
    const params = new URLSearchParams(initData);
    const receivedHash = params.get("hash") || "";
    const authDate = Number(params.get("auth_date") || "");
    if (!receivedHash) throw new Error("Missing Telegram hash.");
    if (!Number.isFinite(authDate) || authDate <= 0) throw new Error("Missing Telegram auth date.");
    const now = Math.floor(Date.now() / 1000);
    if (authDate > now + FUTURE_SKEW_SECONDS) throw new Error("Telegram auth date is in the future.");
    if (now - authDate > INIT_DATA_TTL_SECONDS) throw new Error("Telegram auth data has expired.");
    const secretKey = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["createHmac"])("sha256", "WebAppData").update(botToken).digest();
    const calculatedHash = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["createHmac"])("sha256", secretKey).update(createDataCheckString(params)).digest("hex");
    if (!secureCompareHex(calculatedHash, receivedHash)) {
        throw new Error("Telegram hash does not match.");
    }
    return {
        ok: true,
        authDate,
        chatInstance: params.get("chat_instance") || undefined,
        chatType: params.get("chat_type") || undefined,
        startParam: params.get("start_param") || undefined,
        user: parseJsonParam(params, "user")
    };
}
async function POST(request) {
    const botToken = getBotToken();
    if (!botToken) {
        return jsonError("Telegram bot token is not configured.", 500);
    }
    try {
        const authorization = request.headers.get("authorization") || "";
        const headerInitData = authorization.toLowerCase().startsWith("tma ") ? authorization.slice(4).trim() : "";
        let body = {};
        try {
            body = await request.json();
        } catch  {
            body = {};
        }
        const bodyInitData = typeof body.initData === "string" ? body.initData.trim() : "";
        const initData = bodyInitData || headerInitData;
        if (!initData) return jsonError("Missing Telegram init data.", 400);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(validateInitData(initData, botToken), {
            headers: {
                "Cache-Control": "no-store"
            }
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Telegram authentication failed.";
        return jsonError(message);
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0hx5v57._.js.map