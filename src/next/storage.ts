import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import type { TimetableData } from "./types";

const ROOT_DIR = process.cwd();

export const TIMETABLE_DATA_URL = pathToFileURL(join(ROOT_DIR, "data", "timetable.json"));
export const PUBLIC_TIMETABLE_DATA_URL = pathToFileURL(join(ROOT_DIR, "public", "timetable.json"));

let timetableCache: TimetableData | null = null;

export function clearTimetableCache() {
  timetableCache = null;
}

export async function readTimetableData(fileUrl = TIMETABLE_DATA_URL): Promise<TimetableData> {
  const text = await readFile(fileUrl, "utf8");
  return JSON.parse(text) as TimetableData;
}

export async function readTimetableDataWithFallback(fileUrl = TIMETABLE_DATA_URL): Promise<TimetableData> {
  try {
    return await readTimetableData(fileUrl);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT" || fileUrl === PUBLIC_TIMETABLE_DATA_URL) {
      throw error;
    }

    return readTimetableData(PUBLIC_TIMETABLE_DATA_URL);
  }
}

export async function loadTimetable(force = false): Promise<TimetableData> {
  if (!force && timetableCache) return timetableCache;

  timetableCache = await readTimetableDataWithFallback();
  return timetableCache;
}

export async function writeTimetableData(data: TimetableData, fileUrl = TIMETABLE_DATA_URL) {
  const filePath = fileURLToPath(fileUrl);
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(fileUrl, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  return filePath;
}
