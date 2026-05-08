"use strict";

const CACHE_VERSION = "v2";
const CORE_CACHE = `pdp-room-finder-core-${CACHE_VERSION}`;
const RUNTIME_CACHE = `pdp-room-finder-runtime-${CACHE_VERSION}`;
const CORE_ASSETS = [
  "/",
  "/manifest.webmanifest",
  "/icon.svg",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/apple-touch-icon.png",
  "/assets/room-finder-hero.jpg",
  "/timetable.json"
];

async function cacheCoreAssets() {
  const cache = await caches.open(CORE_CACHE);

  await Promise.all(
    CORE_ASSETS.map(async (url) => {
      try {
        const response = await fetch(new Request(url, { cache: "reload" }));
        if (response.ok) await cache.put(url, response);
      } catch {}
    })
  );
}

self.addEventListener("install", (event) => {
  event.waitUntil(cacheCoreAssets().then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.map((name) =>
          name === CORE_CACHE || name === RUNTIME_CACHE ? undefined : caches.delete(name)
        )
      )
    ).then(() => self.clients.claim())
  );
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(RUNTIME_CACHE);
    await cache.put(request, response.clone());
  }

  return response;
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      await cache.put(request, response.clone());
    }
    return response;
  } catch {
    return (await caches.match(request)) || (await caches.match("/")) || Response.error();
  }
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/")) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request));
    return;
  }

  if (
    request.destination === "image" ||
    request.destination === "font" ||
    url.pathname.endsWith(".webmanifest") ||
    url.pathname.endsWith(".json")
  ) {
    event.respondWith(cacheFirst(request));
    return;
  }

  event.respondWith(networkFirst(request));
});
