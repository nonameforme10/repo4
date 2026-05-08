import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { fetchLatestTimetable } from "./src/edupage.js";
import { getAvailability } from "./src/status.js";
import { readTimetableData, writeTimetableData } from "./src/storage.js";
import { PORT, REFRESH_TOKEN, TIMETABLE_DATA_URL, PUBLIC_TIMETABLE_DATA_URL } from "./src/config.js";

const rootDir = fileURLToPath(new URL(".", import.meta.url));
const publicDir = join(rootDir, "public");

const mimeTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".webmanifest", "application/manifest+json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"]
]);

let timetableCache = null;

async function readTimetableWithFallback(fileUrl = TIMETABLE_DATA_URL) {
  try {
    return await readTimetableData(fileUrl);
  } catch (error) {
    if (error.code !== "ENOENT" || fileUrl === PUBLIC_TIMETABLE_DATA_URL) {
      throw error;
    }

    return readTimetableData(PUBLIC_TIMETABLE_DATA_URL);
  }
}

async function readTimetableFileWithFallback(fileUrl = TIMETABLE_DATA_URL) {
  try {
    return await readFile(fileUrl);
  } catch (error) {
    if (error.code !== "ENOENT" || fileUrl === PUBLIC_TIMETABLE_DATA_URL) {
      throw error;
    }

    return readFile(PUBLIC_TIMETABLE_DATA_URL);
  }
}

async function loadTimetable() {
  if (!timetableCache) {
    timetableCache = await readTimetableWithFallback();
  }

  return timetableCache;
}

function sendJson(response, status, value) {
  response.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(value));
}

function sendError(response, status, message) {
  sendJson(response, status, { error: message });
}

async function serveStatic(requestUrl, response) {
  let urlPath = requestUrl.pathname === "/" ? "/index.html" : requestUrl.pathname;
  if (urlPath.startsWith("/public/")) {
    urlPath = urlPath.slice("/public".length);
  }

  const filePath = normalize(join(publicDir, urlPath));
  const publicPrefix = publicDir.endsWith(sep) ? publicDir : `${publicDir}${sep}`;

  if (filePath !== publicDir && !filePath.startsWith(publicPrefix)) {
    sendError(response, 403, "Forbidden");
    return;
  }

  try {
    const content = await readFile(filePath);
    response.writeHead(200, {
      "content-type": mimeTypes.get(extname(filePath)) || "application/octet-stream"
    });
    response.end(content);
  } catch {
    sendError(response, 404, "Not found");
  }
}

const server = createServer(async (request, response) => {
  const requestUrl = new URL(request.url, `http://${request.headers.host}`);

  try {
    if (requestUrl.pathname === "/api/timetable") {
      sendJson(response, 200, await loadTimetable());
      return;
    }

    if (requestUrl.pathname === "/data/timetable.json") {
      response.writeHead(200, { "content-type": "application/json; charset=utf-8" });
      response.end(await readTimetableFileWithFallback());
      return;
    }

    if (requestUrl.pathname === "/api/status") {
      const mode = requestUrl.searchParams.get("mode") || "now";
      const day = requestUrl.searchParams.get("day") || undefined;
      const time = requestUrl.searchParams.get("time") || undefined;
      const timetable = await loadTimetable();
      sendJson(response, 200, getAvailability(timetable, { mode, day, time }));
      return;
    }

    if (requestUrl.pathname === "/api/refresh" && request.method === "POST") {
      if (!REFRESH_TOKEN || request.headers.authorization !== `Bearer ${REFRESH_TOKEN}`) {
        sendError(response, 401, "Unauthorized");
        return;
      }

      timetableCache = await fetchLatestTimetable();
      await writeTimetableData(timetableCache);
      sendJson(response, 200, {
        ok: true,
        metadata: timetableCache.metadata,
        status: getAvailability(timetableCache)
      });
      return;
    }

    await serveStatic(requestUrl, response);
  } catch (error) {
    sendError(response, 500, error.message || "Internal server error");
  }
});

server.listen(PORT, () => {
  console.log(`Room timetable dashboard: http://localhost:${PORT}`);
});
