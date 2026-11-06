/* Wekidiくん — Service Worker
 *
 * Strategi:
 *  - Install   : simpan index.html + semua JS/CSS hasil build (diambil dari index.html) + ikon.
 *  - Navigasi  : network-first, jika offline pakai index.html dari cache (SPA fallback).
 *  - /assets/* : cache-first (nama file ber-hash, aman di-cache lama).
 *  - Lainnya   : stale-while-revalidate (gambar Unsplash, ikon sosial, Google Fonts, dsb).
 *
 * Naikkan VERSION jika ingin memaksa cache lama dibuang.
 */
const VERSION = "v1";
const STATIC_CACHE = `wekidi-static-${VERSION}`;
const RUNTIME_CACHE = `wekidi-runtime-${VERSION}`;
const MAX_RUNTIME_ENTRIES = 120;

const SCOPE = self.registration.scope; // selalu diakhiri "/"
const INDEX_URL = new URL("./", SCOPE).href;

const SHELL_FILES = [
  "manifest.webmanifest",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png",
  "icons/favicon.png",
  "icons/apple-touch-icon.png",
].map((p) => new URL(p, SCOPE).href);

async function precacheBuildAssets(cache) {
  // 1) index.html (kunci = SCOPE)
  const res = await fetch(INDEX_URL, { cache: "reload" });
  if (!res.ok) throw new Error("Gagal mengambil index.html");
  const html = await res.clone().text();
  await cache.put(INDEX_URL, res);

  // 2) JS/CSS ber-hash yang dirujuk index.html
  const found = new Set();
  const re = /(?:src|href)="([^"]+)"/g;
  let m;
  while ((m = re.exec(html))) {
    try {
      const u = new URL(m[1], INDEX_URL);
      if (u.origin === self.location.origin && /\.(js|css)$/.test(u.pathname)) {
        found.add(u.href);
      }
    } catch (_) {
      /* abaikan URL tidak valid */
    }
  }
  await Promise.allSettled([...found, ...SHELL_FILES].map((u) => cache.add(u)));
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then(precacheBuildAssets)
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keep = new Set([STATIC_CACHE, RUNTIME_CACHE]);
      const names = await caches.keys();
      await Promise.all(
        names
          .filter((n) => n.startsWith("wekidi-") && !keep.has(n))
          .map((n) => caches.delete(n))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});

async function trimCache(cacheName, max) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length > max) {
    await Promise.all(keys.slice(0, keys.length - max).map((k) => cache.delete(k)));
  }
}

function isCacheable(response) {
  // "opaque" = respons lintas-origin tanpa CORS (mis. <img> dari Unsplash)
  return response && (response.ok || response.type === "opaque");
}

async function networkFirstNavigation(request) {
  try {
    const fresh = await fetch(request);
    if (fresh.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(INDEX_URL, fresh.clone());
    }
    return fresh;
  } catch (_) {
    const cached =
      (await caches.match(INDEX_URL)) || (await caches.match(request));
    if (cached) return cached;
    return new Response(
      "<h1>Offline</h1><p>Buka aplikasi sekali saat online agar bisa dipakai offline.</p>",
      { status: 503, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }
}

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const fresh = await fetch(request);
  if (isCacheable(fresh)) {
    const cache = await caches.open(cacheName);
    cache.put(request, fresh.clone());
  }
  return fresh;
}

async function staleWhileRevalidate(request, event) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then((response) => {
      if (isCacheable(response)) {
        cache.put(request, response.clone()).then(() =>
          trimCache(RUNTIME_CACHE, MAX_RUNTIME_ENTRIES)
        );
      }
      return response;
    })
    .catch(() => undefined);

  if (cached) {
    event.waitUntil(network);
    return cached;
  }
  const response = await network;
  return response || Response.error();
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.protocol !== "http:" && url.protocol !== "https:") return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirstNavigation(request));
    return;
  }

  const sameOrigin = url.origin === self.location.origin;

  if (sameOrigin && url.pathname.startsWith(new URL("assets/", SCOPE).pathname)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  event.respondWith(staleWhileRevalidate(request, event));
});
