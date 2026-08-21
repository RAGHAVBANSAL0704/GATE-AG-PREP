# Service Worker (`public/sw.js`) Architecture & Caching Strategy Report

## 1. Observation

Direct investigation of the codebase, project configuration, and asset distribution revealed the following structural details:

### 1.1 Project Structure & Build Configuration
- **Root Configuration**:
  - `package.json` (`/Users/raghav/Desktop/GATE AG PREP WEB/package.json`):
    ```json
    {
      "name": "gate-ag-prep-portal",
      "version": "1.0.0",
      "dependencies": {
        "katex": "^0.16.21",
        "react": "^19.0.0",
        "react-dom": "^19.0.0"
      },
      "devDependencies": {
        "vite": "^6.1.0"
      }
    }
    ```
  - `vite.config.js` (`/Users/raghav/Desktop/GATE AG PREP WEB/vite.config.js`):
    ```javascript
    export default defineConfig({
      plugins: [react()],
      base: './', // Enables relative paths so dist/index.html works in any environment
      server: { port: 3000, host: true }
    })
    ```
  - `index.html` (`/Users/raghav/Desktop/GATE AG PREP WEB/index.html`):
    - Line 5: Inline SVG data URI favicon `<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,..." />`.
    - Lines 10–12: Google Fonts `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap">`.
    - Line 14: External KaTeX CDN link `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css" ...>`.
    - Line 18: Main entrypoint `<script type="module" src="/src/main.jsx"></script>`.

### 1.2 Data Bundling & Asset Generation
- **Client-Side Self-Containment**:
  - `src/data/questions.json` (318 KB) and `src/data/mock_papers.json` (1.87 MB) are statically imported into React components (`src/App.jsx`).
  - No external backend API or dynamic network database calls are executed during exam simulation or practice mode.
- **Vite Output (`dist/assets/`)**:
  - `dist/assets/index-[hash].js`: ~2.55 MB (contains all React logic, questions, CBT evaluation engines, formulas).
  - `dist/assets/index-[hash].css`: ~83.4 KB (contains Tailwind CSS and KaTeX layout rules).
  - KaTeX Font files: 60 font binaries (`.woff2`, `.woff`, `.ttf`) totaling ~1.2 MB bundled directly into `dist/assets/` (e.g. `KaTeX_Main-Regular-*.woff2`, `KaTeX_Math-Italic-*.woff2`).

### 1.3 Public Directory Distribution
- `public/` structure (`/Users/raghav/Desktop/GATE AG PREP WEB/public`):
  - `public/question_images/`: 73 diagram images (~53 MB) referenced in PYQs (e.g., `/question_images/AG2012_page_1.png`).
  - `public/docx_images/`: 18 diagram images (~696 KB) extracted from DOCX solution sets.
  - `public/question_snippets/`: 420 MB of page crop images (not actively loaded in default UI).
  - `public/downloads/`: 32 MB of downloadable PDF papers.
  - `public/icons/`: App icons (`icon-192.png`, `icon-512.png`, `icon.svg`).

---

## 2. Logic Chain

From the observations above, the Service Worker architecture and caching engine are designed through the following evidence-backed reasoning:

### 2.1 Cache Versioning & Namespace Strategy
1. **Namespace Partitioning**:
   To prevent cache collisions and facilitate fine-grained eviction, caches are partitioned into four distinct sub-caches under a common prefix:
   - `CACHE_VERSION = 'gate-ag-v1.0.0'`
   - `CACHE_PREFIX = 'gate-ag-'`
   - `STATIC_CACHE = 'gate-ag-static-v1.0.0'` — Core App Shell & Precache assets.
   - `RUNTIME_CACHE = 'gate-ag-runtime-v1.0.0'` — Dynamic hashed JS/CSS bundles and runtime scripts.
   - `IMAGES_CACHE = 'gate-ag-images-v1.0.0'` — Question diagrams and UI imagery.
   - `FONTS_CACHE = 'gate-ag-fonts-v1.0.0'` — External Google Fonts stylesheets and webfont binaries.
2. **Current Valid Set**:
   `CURRENT_CACHES = [STATIC_CACHE, RUNTIME_CACHE, IMAGES_CACHE, FONTS_CACHE]`.

### 2.2 Precache List & Resilient Install Strategy
1. **Precache Targets**:
   The static shell precache list must cover the minimum essential payload to boot the PWA offline:
   - `'./'` (Root navigation context)
   - `'./index.html'` (App entry HTML)
   - `'./manifest.webmanifest'` (Standard W3C manifest)
   - `'./manifest.json'` (Alias for legacy browser compatibility)
   - `'./icons/icon.svg'` (Vector icon)
   - `'./icons/icon-192.png'` (Standard PWA launcher icon)
   - `'./icons/icon-512.png'` (High-res splash icon)
2. **Resilience Against Install Failures**:
   Standard `cache.addAll()` aborts the entire installation if any single item fails (e.g. returns 404 or network timeout).
   By fetching assets individually within `Promise.allSettled()` and putting successful responses into `STATIC_CACHE`, the Service Worker guarantees that missing optional assets will not crash the install lifecycle.
3. **Immediate Takeover (`self.skipWaiting()`)**:
   Calling `self.skipWaiting()` ensures the newly installed Service Worker immediately transitions to the `active` state without waiting for all tabs to close.

### 2.3 Activation & Outdated Cache Purge Strategy
1. **Client Control (`self.clients.claim()`)**:
   Calling `self.clients.claim()` during `activate` ensures the worker immediately assumes control of all active client tabs.
2. **Atomic Cache Purging**:
   Iterating over `caches.keys()` and deleting any key that starts with `gate-ag-` but is not in `CURRENT_CACHES` automatically cleans up outdated application versions upon update, reclaiming device storage.

### 2.4 Request Routing & Fetch Strategies Matrix

| Resource Category | Match Pattern | Strategy | Rationale |
| :--- | :--- | :--- | :--- |
| **HTML Navigation** | `request.mode === 'navigate'` | **Network-First** (Fallback: cached `index.html`) | Ensures users always receive the latest app updates when online, but immediately falls back to `index.html` offline so the SPA can mount. |
| **Hashed App Bundles** | `/assets/.*` (JS, CSS, KaTeX fonts) | **Cache-First** (Runtime cache in `RUNTIME_CACHE`) | Vite creates content-hashed filenames (`index-D-yrLvzt.js`). Content is immutable; serving from cache delivers 0ms load times. |
| **Question & Solution Images** | `/question_images/.*`, `/docx_images/.*`, `/question_snippets/.*`, images | **Cache-First** (Runtime cache in `IMAGES_CACHE`) | Avoids precaching 500+ MB upfront while ensuring that any question image viewed once is permanently available offline. |
| **Google Fonts** | `fonts.googleapis.com`, `fonts.gstatic.com` | **Stale-While-Revalidate** (Cache in `FONTS_CACHE`) | Fonts CSS revalidates in the background, while cached WOFF2 binaries load instantly without blocking render. |
| **Downloads / PDFs** | `/downloads/.*` | **Network-First** (Cache in `RUNTIME_CACHE`) | Prefers fresh official PDFs when online, allows offline viewing if previously downloaded. |
| **Other Same-Origin** | Any other HTTP(S) GET request | **Network-First** (Runtime cache in `RUNTIME_CACHE`) | Safe catch-all strategy for auxiliary assets. |

### 2.5 Edge Case Handling Architecture

1. **Protocol & Method Filtering**:
   - Ignore all non-GET requests (`POST`, `PUT`, `DELETE`).
   - Ignore non-HTTP/HTTPS schemes (e.g. `chrome-extension:`, `moz-extension:`, `blob:`, `data:`) to prevent worker crashes on browser extension network traffic.
2. **Range Requests (206 Partial Content)**:
   - Requests containing the `Range` header (often generated for large media/PDFs) cannot be placed in Cache Storage via `cache.put()`.
   - Handling: Detect `event.request.headers.has('range')` and bypass caching, piping directly to `fetch(event.request)`.
3. **Opaque Responses (Cross-Origin Assets)**:
   - External resources (like Google Fonts or external CDNs) return opaque responses with `status === 0` and `type === 'opaque'`.
   - Handling: Cache validation explicitly permits `(response.status === 200 || response.type === 'opaque')`.
4. **Storage Quota Exceptions (`QuotaExceededError`)**:
   - On low-storage mobile devices, `cache.put()` can throw quota errors.
   - Handling: All `cache.put()` calls are wrapped in `.catch(() => {})` handlers to prevent unhandled promise rejections.
5. **Path Resolution Across Base URLs**:
   - To support Vite's `base: './'`, fallback matching checks `./index.html`, `/index.html`, `./`, and `/` in order.
6. **Client Inter-Process Communication (`message` Event)**:
   - Implements listeners for `SKIP_WAITING` and `CLEAR_CACHE` message actions from `serviceWorkerRegistration.js`.

---

## 3. Caveats

1. **Exclusion of Large Snippets (420 MB) from Precache**:
   `public/question_snippets/` contains 420 MB of scanned page crops. These are deliberately excluded from static precaching to prevent mobile storage quota exhaustion. They are loaded on-demand via runtime caching.
2. **First-Load Offline Constraint**:
   A student must visit the website at least once while online to allow the Service Worker to install and precache the application shell.
3. **HTTPS / Secure Context Requirement**:
   Service Workers operate only in secure contexts (`https://` or `http://localhost`). Testing in local environments should be conducted over `http://localhost:3000` or `http://localhost:4173`.

---

## 4. Conclusion & Implementation Code

The complete reference implementation for `public/sw.js` is detailed below.

### 4.1 Concrete Implementation: `public/sw.js`

```javascript
/**
 * GATE AG Prep Portal - Service Worker
 * Version: 1.0.0
 * Architecture: Offline PWA with Versioned Multi-Tier Caching
 */

const CACHE_VERSION = 'gate-ag-v1.0.0';
const CACHE_PREFIX = 'gate-ag-';

const STATIC_CACHE = `${CACHE_PREFIX}static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `${CACHE_PREFIX}runtime-${CACHE_VERSION}`;
const IMAGES_CACHE = `${CACHE_PREFIX}images-${CACHE_VERSION}`;
const FONTS_CACHE = `${CACHE_PREFIX}fonts-${CACHE_VERSION}`;

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
```

---

## 5. Verification Method

To independently verify the Service Worker architecture and caching behavior:

### 5.1 Automated Syntax & Compilation Check
Verify the script syntax using Node:
```bash
node -c public/sw.js
```
*Expected Output*: Exits with code 0 (no syntax errors).

### 5.2 Build & Asset Verification
Run the production build:
```bash
npm run build
```
Verify the build output:
1. `dist/sw.js` is generated at the distribution root.
2. `dist/manifest.webmanifest` is present and accessible.
3. `dist/assets/` contains the hashed JS bundle, CSS bundle, and KaTeX fonts.

### 5.3 Offline Functionality Verification via Local Preview
1. Start the preview server:
   ```bash
   npm run preview
   ```
2. Open `http://localhost:4173` in Google Chrome or Microsoft Edge.
3. Open **DevTools -> Application -> Service Workers**:
   - Status must show **Activated and is running**.
   - Source should point to `sw.js`.
4. Open **DevTools -> Application -> Storage -> Cache Storage**:
   - Verify `gate-ag-static-v1.0.0` contains `./index.html`, `./manifest.webmanifest`, and icons.
   - Verify `gate-ag-runtime-v1.0.0` contains `/assets/index-*.js`, `/assets/index-*.css`, and KaTeX webfonts.
5. In **DevTools -> Network**, toggle **Offline**:
   - Reload the page (`Cmd + R` or `Ctrl + F5`).
   - Navigate across all 4 modes: Practice Mode, CBT Mock Test, Formula Sheet, Scientific Calculator.
   - Verify all math formulas render with zero LaTeX glitches.
   - Attempt a question and verify score calculations execute instantly offline.
