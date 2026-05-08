import { NextRequest, NextResponse } from "next/server";
import { getAvailability } from "@/src/next/status";
import { loadTimetable } from "@/src/next/storage";
import type { AvailabilityMode } from "@/src/next/types";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function availabilityMode(value: string | null): AvailabilityMode {
  return value === "next" || value === "custom" ? value : "now";
}

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;
    const mode = availabilityMode(params.get("mode"));
    const day = params.get("day") || undefined;
    const time = params.get("time") || undefined;
    const force = params.get("reload") === "1";
    const timetable = await loadTimetable(force);
    const status = getAvailability(timetable, { mode, day, time });

    return NextResponse.json(status, {
      headers: {
        "Cache-Control": "no-store"
      }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
