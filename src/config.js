import { join } from "node:path";
import { pathToFileURL } from "node:url";

const ROOT_DIR = process.cwd();

export const EDUPAGE_BASE_URL =
  process.env.EDUPAGE_BASE_URL || "https://pdpuniversity.edupage.org";

export const FIREBASE_DATABASE_URL =
  process.env.FIREBASE_DATABASE_URL ||
  "https://time-table-3327d-default-rtdb.firebaseio.com";

export const FIREBASE_TIMETABLE_PATH =
  process.env.FIREBASE_TIMETABLE_PATH || "timetable";

export const FIREBASE_METADATA_PATH =
  process.env.FIREBASE_METADATA_PATH || "metadata";

export const FIREBASE_AUTH_TOKEN = process.env.FIREBASE_AUTH_TOKEN || "";

export const APP_TIMEZONE = process.env.APP_TIMEZONE || "Asia/Tashkent";

export const REFRESH_TOKEN = process.env.REFRESH_TOKEN || "";

export const PORT = Number(process.env.PORT || 3000);

export const TIMETABLE_DATA_URL = pathToFileURL(join(ROOT_DIR, "data", "timetable.json"));

export const PUBLIC_TIMETABLE_DATA_URL = pathToFileURL(join(ROOT_DIR, "public", "timetable.json"));
