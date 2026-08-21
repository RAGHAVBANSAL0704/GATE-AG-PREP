# Empirical Challenge Report: Milestone 1 — PWA Offline Capability

## Challenge Summary

**Overall Verdict**: **APPROVE**  
**Overall Risk Assessment**: LOW (Production Ready)

---

## 1. Observation

Direct empirical observations and verification results from testing Milestone 1 implementation:

1. **Manifest Integrity & Schemas**:
   - `public/manifest.webmanifest` (2,415 bytes) and `public/manifest.json` (2,415 bytes) both exist, are syntactically valid JSON, and have identical contents.
   - PWA properties validated:
     - `id`: `"./"`
     - `name`: `"GATE AG Prep Portal | Agricultural Engineering PYQ CBT & Practice"`
     - `short_name`: `"GATE AG Prep"`
     - `start_url`: `"./"`
     - `scope`: `"./"`
     - `display`: `"standalone"`
     - `display_override`: `["standalone", "window-controls-overlay", "minimal-ui"]`
     - `theme_color`: `"#2563EB"`
     - `background_color`: `"#0B0F19"`
     - `prefer_related_applications`: `false`
     - `categories`: `["education", "productivity", "utilities"]`
   - 5 icons declared with valid purposes (`any`, `maskable`) and resolved to existing disk files.
   - 3 shortcuts configured (`Practice Pool`, `PYQ Mock Tests`, `Formula Revision Sheet`) with valid targets and icon references.

2. **App Icon Binary & Header Verification**:
   - `public/icons/icon-192.png` (28,826 bytes): Valid PNG header (`89 50 4E 47 0D 0A 1A 0A`), IHDR width: 192, height: 192.
   - `public/icons/icon-512.png` (77,230 bytes): Valid PNG header, IHDR width: 512, height: 512.
   - `public/icons/icon-512-maskable.png` (51,504 bytes): Valid PNG header, IHDR width: 512, height: 512.
   - `public/icons/apple-touch-icon.png` (26,891 bytes): Valid PNG header, IHDR width: 180, height: 180.
   - `public/icons/icon.svg` (3,039 bytes): Valid XML/SVG markup with `<svg ... viewBox="0 0 512 512">`.

3. **Service Worker (`public/sw.js`) Syntax & Architecture**:
   - `node -c public/sw.js` exited with status 0 (no syntax errors).
   - Cache versioning: `STATIC_CACHE` (`"gate-ag-static-v1.0.0"`), `RUNTIME_CACHE` (`"gate-ag-runtime-v1.0.0"`), `IMAGES_CACHE` (`"gate-ag-images-v1.0.0"`), `FONTS_CACHE` (`"gate-ag-fonts-v1.0.0"`).
   - Lifecycle handlers verified:
     - `install`: Invokes `self.skipWaiting()`, precaches `PRECACHE_ASSETS` with `Promise.allSettled` resilience.
     - `activate`: Invokes `self.clients.claim()`, purges stale cache versions matching prefix `gate-ag-`.
     - `fetch`:
       - Filters non-GET requests and non-HTTP schemes.
       - Passes through Range requests to bypass 206 cache errors.
       - Handles navigation requests with network-first + offline fallback to cached `index.html` + inline 503 fallback.
       - Handles static hashed assets (`/assets/.*`) with cache-first + runtime caching.
       - Handles Google Fonts with stale-while-revalidate.
       - Handles images (`/question_images/`, `/docx_images/`, `/icons/`, etc.) with cache-first + runtime caching + safe 404 offline response.
     - `message`: Supports `SKIP_WAITING` and `CLEAR_CACHE`.

4. **Service Worker Registration Module (`src/serviceWorkerRegistration.js`)**:
   - Imports cleanly into Node/SSR environments without throwing reference errors.
   - Attaches `window.addEventListener('load', ...)` when `document.readyState !== 'complete'` and executes immediately when already complete.
   - Listens to `updatefound` and `statechange` to fire `onSuccess` / `sw-cached` and `onUpdate` / `sw-updated`.
   - Listens to `visibilitychange` to poll for service worker updates when the app returns to foreground.
   - Sets up `online` and `offline` event listeners and dispatches `app-online` / `app-offline` custom events.
   - Invoked in `src/main.jsx`.

5. **HTML Integration (`index.html`)**:
   - Meta tags for light/dark `theme-color`, `apple-mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style`, `apple-mobile-web-app-title`.
   - `<link rel="manifest" href="./manifest.webmanifest" />`.
   - Icon links for `icon.svg`, `icon-192.png`, `icon-512.png`, and `apple-touch-icon.png`.

6. **Production Build & Dist Verification**:
   - `npm run build` executed cleanly (1612 modules transformed in 1.47s, exit code 0).
   - `dist/` contains:
     - `dist/index.html`
     - `dist/manifest.webmanifest`
     - `dist/manifest.json`
     - `dist/sw.js`
     - `dist/icons/` (all 5 icon files present and non-empty)
     - `dist/assets/` (JS, CSS, and KaTeX local font binaries).

---

## 2. Logic Chain

1. **Premise 1**: A PWA is offline-capable if all required static resources, manifests, icons, and dynamic routing handlers are properly configured and precached or cached on first load.
2. **Premise 2**: Empirical inspection proves that all manifest files, icons (PNG 192x192, 512x512, 180x180, SVG), and service worker scripts are syntactically and architecturally sound.
3. **Premise 3**: Simulation of the ServiceWorker lifecycle (`install`, `activate`, `fetch` across 6 routing tiers, and `message`) confirms expected caching behavior and offline fallback handling without throwing unhandled exceptions.
4. **Premise 4**: Production build verification confirms Vite bundles all local assets, including KaTeX fonts and CSS, and copies the PWA subsystem files directly into `dist/`.
5. **Deduction**: The Milestone 1 deliverables meet all specified criteria for offline PWA readiness.

---

## 3. Caveats

- **Node 21+ Navigator Object Behavior**: In Node.js 21+, `globalThis.navigator` exists but `navigator.onLine` is `undefined`. In `src/serviceWorkerRegistration.js`, `getNetworkStatus()` evaluates `typeof navigator !== undefined ? navigator.onLine : true`, which returns `{ isOnline: undefined }` in non-browser Node environments. This has zero impact in browser runtimes (where `navigator.onLine` is always a boolean), but for Node-based test runners in Milestone 2, developers should be aware or consider defensive checking (`typeof navigator !== undefined && typeof navigator.onLine === boolean ? navigator.onLine : true`).
- **No live HTTPS origin required in dev**: PWA testing in production requires HTTPS or localhost, which is explicitly handled by the service worker scope and localhost check in `src/serviceWorkerRegistration.js`.

---

## 4. Conclusion

**Verdict: APPROVE**

Milestone 1 (PWA Offline Capability) is verified, robust, and production-ready. All acceptance criteria for Milestone 1 are satisfied.

---

## 5. Verification Method

To independently reproduce the empirical verification results, execute the following commands:

```bash
# 1. Verify Service Worker JS syntax
node -c public/sw.js

# 2. Run the empirical stress test harness (27 tests)
node .agents/challenger_m1_1/m1_stress_test.cjs

# 3. Verify production build output
npm run build
ls -la dist/manifest.webmanifest dist/sw.js dist/icons/
```
