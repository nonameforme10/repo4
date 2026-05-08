import { createHmac, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const INIT_DATA_TTL_SECONDS = 60 * 60 * 24;
const FUTURE_SKEW_SECONDS = 60;

type TelegramUser = {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  allows_write_to_pm?: boolean;
  photo_url?: string;
};

type AuthSuccess = {
  ok: true;
  authDate: number;
  chatInstance?: string;
  chatType?: string;
  startParam?: string;
  user?: TelegramUser;
};

function getBotToken() {
  return process.env.TELEGRAM_BOT_TOKEN || process.env["TELEGRAM-BOT-TOKEN"] || "";
}

function jsonError(message: string, status = 401) {
  return NextResponse.json(
    { ok: false, error: message },
    {
      status,
      headers: {
        "Cache-Control": "no-store"
      }
    }
  );
}

function parseJsonParam<T>(params: URLSearchParams, key: string): T | undefined {
  const value = params.get(key);
  if (!value) return undefined;

  try {
    return JSON.parse(value) as T;
  } catch {
    return undefined;
  }
}

function createDataCheckString(params: URLSearchParams) {
  return Array.from(params.entries())
    .filter(([key]) => key !== "hash")
    .map(([key, value]) => `${key}=${value}`)
    .sort()
    .join("\n");
}

function secureCompareHex(expectedHex: string, receivedHex: string) {
  if (!/^[a-f0-9]{64}$/i.test(expectedHex) || !/^[a-f0-9]{64}$/i.test(receivedHex)) {
    return false;
  }

  const expected = Buffer.from(expectedHex, "hex");
  const received = Buffer.from(receivedHex, "hex");

  return expected.length === received.length && timingSafeEqual(expected, received);
}

function validateInitData(initData: string, botToken: string): AuthSuccess {
  const params = new URLSearchParams(initData);
  const receivedHash = params.get("hash") || "";
  const authDate = Number(params.get("auth_date") || "");

  if (!receivedHash) throw new Error("Missing Telegram hash.");
  if (!Number.isFinite(authDate) || authDate <= 0) throw new Error("Missing Telegram auth date.");

  const now = Math.floor(Date.now() / 1000);
  if (authDate > now + FUTURE_SKEW_SECONDS) throw new Error("Telegram auth date is in the future.");
  if (now - authDate > INIT_DATA_TTL_SECONDS) throw new Error("Telegram auth data has expired.");

  const secretKey = createHmac("sha256", "WebAppData").update(botToken).digest();
  const calculatedHash = createHmac("sha256", secretKey).update(createDataCheckString(params)).digest("hex");

  if (!secureCompareHex(calculatedHash, receivedHash)) {
    throw new Error("Telegram hash does not match.");
  }

  return {
    ok: true,
    authDate,
    chatInstance: params.get("chat_instance") || undefined,
    chatType: params.get("chat_type") || undefined,
    startParam: params.get("start_param") || undefined,
    user: parseJsonParam<TelegramUser>(params, "user")
  };
}

export async function POST(request: NextRequest) {
  const botToken = getBotToken();

  if (!botToken) {
    return jsonError("Telegram bot token is not configured.", 500);
  }

  try {
    const authorization = request.headers.get("authorization") || "";
    const headerInitData = authorization.toLowerCase().startsWith("tma ") ? authorization.slice(4).trim() : "";
    let body: { initData?: unknown } = {};

    try {
      body = (await request.json()) as { initData?: unknown };
    } catch {
      body = {};
    }

    const bodyInitData = typeof body.initData === "string" ? body.initData.trim() : "";
    const initData = bodyInitData || headerInitData;

    if (!initData) return jsonError("Missing Telegram init data.", 400);

    return NextResponse.json(validateInitData(initData, botToken), {
      headers: {
        "Cache-Control": "no-store"
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Telegram authentication failed.";
    return jsonError(message);
  }
}
