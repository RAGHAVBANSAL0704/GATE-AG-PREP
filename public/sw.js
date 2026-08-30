/**
 * GATE AG Prep Portal - Service Worker
 * Version: 1.0.0
 * Architecture: Offline PWA with Versioned Multi-Tier Caching
 */

const CACHE_VERSION = 'v1.0.20';
const CACHE_PREFIX = 'gate-ag-';

const STATIC_CACHE = 'gate-ag-static-v1.0.20';
const RUNTIME_CACHE = 'gate-ag-runtime-v1.0.20';
const IMAGES_CACHE = 'gate-ag-images-v1.0.20';
const FONTS_CACHE = 'gate-ag-fonts-v1.0.20';

const CURRENT_CACHES = [
  STATIC_CACHE,
  RUNTIME_CACHE,
  IMAGES_CACHE,
  FONTS_CACHE,
];

// Core application shell precache manifest
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './manifest.json',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/akhand_bharat_backdrop.jpg',
  './icons/swami_vivekananda_real_portrait.jpg',
];

/**
 * Install Event: Precache core application shell with resilient individual catches
 */
self.addEventListener('install', (event) => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(STATIC_CACHE).then(async (cache) => {
      // Use Promise.allSettled to guarantee that a 404 on an optional asset does not break installation
      const precachePromises = PRECACHE_ASSETS.map(async (assetUrl) => {
        try {
          const response = await fetch(assetUrl, { cache: 'no-cache' });
          if (response.ok) {
            await cache.put(assetUrl, response);
            return assetUrl;
          } else {
            console.warn(`[SW] Precache asset responded with status ${response.status}: ${assetUrl}`);
          }
        } catch (error) {
          console.warn(`[SW] Precache failed for ${assetUrl}:`, error);
        }
      });

      return Promise.allSettled(precachePromises);
    })
  );
});

/**
 * Activate Event: Claim uncontrolled clients and purge outdated caches
 */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName.startsWith(CACHE_PREFIX) && !CURRENT_CACHES.includes(cacheName)) {
              console.log(`[SW] Purging outdated cache: ${cacheName}`);
              return caches.delete(cacheName);
            }
          })
        );
      }),
    ])
  );
});

/**
 * Fetch Event: Smart routing by resource category
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // 1. Filter non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);

  // 2. Filter non-HTTP schemes (e.g. chrome-extension:, blob:, data:)
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // 3. Bypass Cache Storage for Range requests (prevents 206 caching errors)
  if (request.headers.has('range')) {
    event.respondWith(fetch(request));
    return;
  }

  // 4. HTML Navigation Requests (Network-First with fallback to index.html)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(STATIC_CACHE).then((cache) => {
              cache.put(request, responseToCache).catch(() => {});
            });
          }
          return networkResponse;
        })
        .catch(async () => {
          const cachedIndex =
            (await caches.match('./index.html')) ||
            (await caches.match('/index.html')) ||
            (await caches.match('./')) ||
            (await caches.match('/'));

          if (cachedIndex) {
            return cachedIndex;
          }

          return new Response(
            '<!DOCTYPE html><html><head><title>Offline</title></head><body style="font-family:sans-serif;text-align:center;padding:2rem;"><h1>GATE AG Prep Portal</h1><p>You are currently offline. Please connect to the internet to load new content.</p></body></html>',
            {
              status: 503,
              statusText: 'Service Unavailable',
              headers: { 'Content-Type': 'text/html; charset=utf-8' },
            }
          );
        })
    );
    return;
  }

  // 5. Static Hashed Assets (/assets/.* — JS, CSS, KaTeX fonts) -> Cache-First
  if (url.pathname.includes('/assets/')) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request).then((networkResponse) => {
          if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
            const responseToCache = networkResponse.clone();
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, responseToCache).catch(() => {});
            });
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // 6. External Fonts (Google Fonts) -> Stale-While-Revalidate
  if (url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com') {
    event.respondWith(
      caches.open(FONTS_CACHE).then(async (cache) => {
        const cachedResponse = await cache.match(request);
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
              cache.put(request, networkResponse.clone()).catch(() => {});
            }
            return networkResponse;
          })
          .catch(() => null);

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // 7. Question Images, Solution Figures, Snippets, and Icons -> Cache-First with Runtime Caching
  const isImageResource =
    request.destination === 'image' ||
    url.pathname.includes('/question_images/') ||
    url.pathname.includes('/docx_images/') ||
    url.pathname.includes('/question_snippets/') ||
    url.pathname.includes('/icons/') ||
    /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/i.test(url.pathname);

  if (isImageResource) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request)
          .then((networkResponse) => {
            if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
              const responseToCache = networkResponse.clone();
              caches.open(IMAGES_CACHE).then((cache) => {
                cache.put(request, responseToCache).catch(() => {});
              });
            }
            return networkResponse;
          })
          .catch(() => {
            // Return empty 404 response on offline image miss so UI does not hang
            return new Response('', { status: 404, statusText: 'Not Found' });
          });
      })
    );
    return;
  }

  // 8. General Resources (Downloads, documents, other same-origin requests) -> Network-First
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      return fetch(request)
        .then((networkResponse) => {
          if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
            const responseToCache = networkResponse.clone();
            caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(request, responseToCache).catch(() => {});
            });
          }
          return networkResponse;
        })
        .catch(() => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return new Response('Network error and no cached resource available.', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
          });
        });
    })
  );
});

/**
 * Message Event: Client-driven worker actions
 */
self.addEventListener('message', (event) => {
  if (!event.data) return;

  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((keys) =>
        Promise.all(keys.filter((k) => k.startsWith(CACHE_PREFIX)).map((k) => caches.delete(k)))
      )
    );
  }
});
