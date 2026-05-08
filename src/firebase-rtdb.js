import {
  FIREBASE_AUTH_TOKEN,
  FIREBASE_DATABASE_URL,
  FIREBASE_METADATA_PATH,
  FIREBASE_TIMETABLE_PATH
} from "./config.js";

function normalizePath(path) {
  return String(path || "")
    .replace(/^\/+|\/+$/g, "")
    .replace(/\.json$/i, "");
}

async function putJson(path, value) {
  const normalizedPath = normalizePath(path);
  const base = FIREBASE_DATABASE_URL.replace(/\/+$/g, "");
  const url = new URL(`${base}/${normalizedPath}.json`);

  if (FIREBASE_AUTH_TOKEN) {
    url.searchParams.set("auth", FIREBASE_AUTH_TOKEN);
  }

  const response = await fetch(url, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(value)
  });

  if (!response.ok) {
    const hint = FIREBASE_AUTH_TOKEN ? "" : " Set FIREBASE_AUTH_TOKEN for secured rules.";
    throw new Error(`Firebase write failed for /${normalizedPath}: HTTP ${response.status}.${hint}`);
  }

  return response.json();
}

export async function syncTimetableToFirebase(data) {
  await putJson(FIREBASE_TIMETABLE_PATH, data.timetable);
  await putJson(FIREBASE_METADATA_PATH, data.metadata);
}
