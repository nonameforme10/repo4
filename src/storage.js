import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { TIMETABLE_DATA_URL } from "./config.js";

export async function readTimetableData(fileUrl = TIMETABLE_DATA_URL) {
  const text = await readFile(fileUrl, "utf8");
  return JSON.parse(text);
}

export async function writeTimetableData(data, fileUrl = TIMETABLE_DATA_URL) {
  const filePath = fileURLToPath(fileUrl);
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(fileUrl, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  return filePath;
}
