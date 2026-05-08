import { NextRequest, NextResponse } from "next/server";
import { getAvailability } from "@/src/next/status";
import {
  clearTimetableCache,
  PUBLIC_TIMETABLE_DATA_URL,
  writeTimetableData
} from "@/src/next/storage";
import type { TimetableData } from "@/src/next/types";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type EdupageModule = {
  fetchLatestTimetable: () => Promise<TimetableData>;
};

export async function POST(request: NextRequest) {
  const refreshToken = process.env.REFRESH_TOKEN || "";

  if (!refreshToken || request.headers.get("authorization") !== `Bearer ${refreshToken}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { fetchLatestTimetable } = (await import("../../../src/edupage.js") as unknown) as EdupageModule;
    const data = await fetchLatestTimetable();

    await writeTimetableData(data);
    await writeTimetableData(data, PUBLIC_TIMETABLE_DATA_URL);
    clearTimetableCache();

    return NextResponse.json({
      ok: true,
      metadata: data.metadata,
      status: getAvailability(data)
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
