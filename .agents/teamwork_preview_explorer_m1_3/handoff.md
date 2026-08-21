# Milestone 1 Exploration Report: Client SW Registration, `index.html` PWA Tags & Build Verification

**Agent**: `teamwork_preview_explorer_m1_3`  
**Working Directory**: `/Users/raghav/Desktop/GATE AG PREP WEB/.agents/teamwork_preview_explorer_m1_3/`  
**Milestone Focus**: Client Service Worker Lifecycle (`src/serviceWorkerRegistration.js`), Entry Point Integration (`src/main.jsx`), HTML Shell PWA Metadata & CDN Audit (`index.html`), and Build/Preview Verification Workflow.

---

## 1. Observation

Direct observations from examining the codebase, dependencies, and build pipeline:

### 1.1 `index.html` (Current State, Lines 1–21)
```html
1: <!doctype html>
2: <html lang="en">
3:   <head>
4:     <meta charset="UTF-8" />
5:     <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232563eb' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 2v20M2 12h20'/></svg>" />
6:     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
7:     <title>GATE AG Prep Portal | Practice & PYQ CBT Portal</title>
8:     <meta name="description" content="GATE Agricultural Engineering (AG) Exam Practice Portal " />
9:     <!-- Google Fonts -->
10:     <link rel="preconnect" href="https://fonts.googleapis.com">
11:     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
12:     <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
13:     <!-- KaTeX CSS for math formulas -->
14:     <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css" integrity="sha384-zh0CIsljEV4xM24pORrLz7voUtgMPH59vADqlj85549A7+46E7g4EO2gkgT8zJ4Q" crossorigin="anonymous">
15:   </head>
16:   <body class="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 antialiased min-h-screen selection:bg-blue-500 selection:text-white">
17:     <div id="root"></div>
18:     <script type="module" src="/src/main.jsx"></script>
19:   </body>
20: </html>
```
- **Line 14**: External CDN link for KaTeX (`https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css`).
- **Lines 1–15**: Missing `<link rel="manifest" href="./manifest.webmanifest">`.
- **Lines 1–15**: Missing `<meta name="theme-color">`, `<meta name="apple-mobile-web-app-capable">`, `<meta name="apple-mobile-web-app-status-bar-style">`, `<link rel="apple-touch-icon">`.
- **Line 5**: Uses inline SVG data URI instead of referencing standalone PWA icon assets in `public/icons/`.

### 1.2 KaTeX Local Bundling Evidence (`package.json` & `src/index.css`)
- `package.json:13`: `"katex": "^0.16.21"` is installed in `dependencies`.
- `src/index.css:4`: `@import "katex/dist/katex.min.css";` is present at the top of the stylesheet.
- Output from `npm run build`:
  ```
  dist/assets/KaTeX_Size3-Regular-CTq5MqoE.woff       4.42 kB
  dist/assets/KaTeX_Size4-Regular-Dl5lxZxV.woff2      4.93 kB
  ... (58 KaTeX font woff2/woff/ttf chunks bundled) ...
  dist/assets/index-QnRNKEst.css                     83.39 kB
  dist/assets/index-D-yrLvzt.js                    2,552.30 kB
  ```
  Vite bundles all required KaTeX CSS rules and web fonts locally into `dist/assets/`. The external CDN `<link>` in `index.html:14` is completely redundant and acts as a single point of failure in offline environments.

### 1.3 `src/main.jsx` (Current State, Lines 1–14)
```javascript
1: import React from 'react'
2: import ReactDOM from 'react-dom/client'
3: import App from './App.jsx'
4: import ErrorBoundary from './components/ErrorBoundary.jsx'
5: import './index.css'
6: 
7: ReactDOM.createRoot(document.getElementById('root')).render(
8:   <React.StrictMode>
9:     <ErrorBoundary>
10:       <App />
11:     </ErrorBoundary>
12:   </React.StrictMode>,
13: )
```
- No client-side service worker registration helper is imported or called.

### 1.4 `vite.config.js` (Current State, Lines 1–13)
```javascript
1: import { defineConfig } from 'vite'
2: import react from '@vitejs/plugin-react'
3: 
4: export default defineConfig({
5:   plugins: [react()],
6:   base: './', // Enables relative paths so dist/index.html works when opened directly in any browser
7:   server: {
8:     port: 3000,
9:     host: true
10:   }
11: })
```
- `base: './'` generates relative asset URLs (`./assets/...`). All public files (`sw.js`, `manifest.webmanifest`, `icons/`) are copied to `dist/` root on build and must be registered relative to `./`.

---

## 2. Logic Chain

1. **Service Worker Registration Timing**:
   - Registering a service worker during initial critical rendering contends with initial script evaluation, stylesheet parsing, and first contentful paint (FCP/LCP).
   - Deferring registration to `window.addEventListener('load', ...)` (or executing immediately if `document.readyState === 'complete'`) ensures the app renders without network/CPU contention before caching begins.

2. **Scope & Path Resolution (`./sw.js` with `{ scope: './' }`)**:
   - Because `vite.config.js` configures `base: './'`, the application may be hosted under a domain root (`https://example.com/`) or a subdirectory path (`https://example.com/gate-prep/`).
   - Using relative path `./sw.js` and explicit scope `./` ensures the service worker is registered under the current path context without hardcoding absolute domain origins.

3. **Lifecycle & Update Detection Protocol**:
   - When a user revisits the application or a tab is open when a new deployment occurs, the browser detects changes in byte content of `sw.js`.
   - The registration script must monitor `registration.addEventListener('updatefound')` and track `installingWorker.onstatechange`.
   - If `installingWorker.state === 'installed'`:
     - If `navigator.serviceWorker.controller` exists: an update is ready. Log notification and dispatch custom event `'sw-updated'` so the UI can prompt or reload.
     - If `navigator.serviceWorker.controller` is null: the content is cached for the very first time. Log confirmation and dispatch custom event `'sw-cached'`.

4. **Network Online/Offline State Monitoring**:
   - To provide real-time connection awareness, `serviceWorkerRegistration.js` attaches listeners to `window.addEventListener('online')` and `window.addEventListener('offline')`.
   - It maintains an exported helper `getNetworkStatus()` and dispatches global `CustomEvent('app-online')` / `CustomEvent('app-offline')` events for UI notification badges if needed.

5. **Eliminating External CDN Blockers**:
   - Offline PWA functionality requires that all critical scripts, styles, and fonts load with 0 active internet connection.
   - `src/index.css:4` already imports `@import "katex/dist/katex.min.css";` from local `node_modules/katex/`, which Vite bundles with local KaTeX fonts into `dist/assets/`.
   - Leaving `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex...">` in `index.html` causes the browser to attempt an external network request on offline page load. Removing it guarantees 100% self-contained local styling.

6. **Web App Manifest & Apple PWA Meta Tags**:
   - Standard Progressive Web App installability on Chromium, Android, and desktop requires `<link rel="manifest" href="./manifest.webmanifest">` and `<meta name="theme-color" content="#2563EB">`.
   - iOS Safari standalone mode requires `<meta name="apple-mobile-web-app-capable" content="yes">`, `<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">`, `<meta name="apple-mobile-web-app-title" content="GATE AG Prep">`, and `<link rel="apple-touch-icon" sizes="180x180" href="./icons/apple-touch-icon.png">`.

---

## 3. Caveats

1. **Peer Dependency on M1_1 & M1_2**:
   - Client registration assumes `public/sw.js` (designed by `m1_2`) and `public/manifest.webmanifest` + `public/icons/*` (designed by `m1_1`) exist in `public/` so Vite copies them to `dist/`.
2. **Local Development (HTTP vs HTTPS)**:
   - Service workers require HTTPS in production, but browsers permit `http://localhost` or `http://127.0.0.1` as secure contexts for development testing (`npm run preview`).
3. **Google Fonts Offline Behavior**:
   - Google Fonts (`Inter` and `JetBrains Mono`) are requested via `<link href="https://fonts.googleapis.com/css2?...">`.
   - In offline mode, if fonts are not yet cached by `sw.js` runtime cache, the app gracefully falls back to Tailwind's system sans-serif (`ui-sans-serif, system-ui, sans-serif`) and monospace stack without failing or breaking layout.
4. **Browser Hard Reload (`Cmd+Shift+R`)**:
   - Hard reloading temporarily bypasses service worker caching in Chrome DevTools by specification. Normal navigation and reload (`Cmd+R` / `F5`) properly route through the service worker.

---

## 4. Conclusion & Concrete Code Specifications

### 4.1 Target File 1: `src/serviceWorkerRegistration.js` (New File)

```javascript
/**
 * Service Worker Registration and Lifecycle Manager
 * GATE AG Prep Web Portal - PWA Offline Capability
 */

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
);

/**
 * Registers the Service Worker located at `./sw.js` with proper lifecycle hooks.
 * @param {Object} [config] Optional configuration callbacks: { onSuccess, onUpdate, onError }
 */
export function registerServiceWorker(config = {}) {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    console.info('[PWA] Service Workers are not supported in this browser environment.');
    return;
  }

  // Setup global network connectivity monitoring
  setupNetworkListeners();

  const registerHandler = () => {
    // Resolve relative sw.js path
    const swUrl = `./sw.js`;

    navigator.serviceWorker
      .register(swUrl, { scope: './' })
      .then((registration) => {
        console.log(`[PWA] ServiceWorker registered with scope: ${registration.scope}`);

        // Check for updates on page load and visibility change
        registration.addEventListener('updatefound', () => {
          const installingWorker = registration.installing;
          if (!installingWorker) return;

          installingWorker.addEventListener('statechange', () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // New update available (previous controller active)
                console.log('[PWA] New content is available; please refresh to update.');
                window.dispatchEvent(
                  new CustomEvent('sw-updated', { detail: registration })
                );
                if (typeof config.onUpdate === 'function') {
                  config.onUpdate(registration);
                }
              } else {
                // Content cached for offline use for the first time
                console.log('[PWA] Content is cached for offline use.');
                window.dispatchEvent(
                  new CustomEvent('sw-cached', { detail: registration })
                );
                if (typeof config.onSuccess === 'function') {
                  config.onSuccess(registration);
                }
              }
            }
          });
        });

        // Trigger an update check when tab becomes visible again
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible') {
            registration.update().catch((err) => {
              console.debug('[PWA] Periodic update check skipped:', err);
            });
          }
        });
      })
      .catch((error) => {
        console.error('[PWA] Error during ServiceWorker registration:', error);
        if (typeof config.onError === 'function') {
          config.onError(error);
        }
      });
  };

  // Register only after full page load to prioritize critical initial render
  if (document.readyState === 'complete') {
    registerHandler();
  } else {
    window.addEventListener('load', registerHandler);
  }
}

/**
 * Attaches online/offline event listeners and dispatches app-level events.
 */
function setupNetworkListeners() {
  window.addEventListener('online', () => {
    console.log('[PWA] Network status: ONLINE. Synchronization active.');
    window.dispatchEvent(new CustomEvent('app-online', { detail: { isOnline: true } }));
  });

  window.addEventListener('offline', () => {
    console.log('[PWA] Network status: OFFLINE. Running in offline cache mode.');
    window.dispatchEvent(new CustomEvent('app-offline', { detail: { isOnline: false } }));
  });
}

/**
 * Returns current network connectivity status.
 * @returns {{ isOnline: boolean }}
 */
export function getNetworkStatus() {
  return {
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true
  };
}

/**
 * Unregisters any active service workers.
 */
export function unregisterServiceWorker() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister().then(() => {
          console.log('[PWA] ServiceWorker successfully unregistered.');
        });
      })
      .catch((error) => {
        console.error('[PWA] Error unregistering ServiceWorker:', error);
      });
  }
}
```

---

### 4.2 Target File 2: `src/main.jsx` (Modifications)

#### Before:
```javascript
1: import React from 'react'
2: import ReactDOM from 'react-dom/client'
3: import App from './App.jsx'
4: import ErrorBoundary from './components/ErrorBoundary.jsx'
5: import './index.css'
6: 
7: ReactDOM.createRoot(document.getElementById('root')).render(
8:   <React.StrictMode>
9:     <ErrorBoundary>
10:       <App />
11:     </ErrorBoundary>
12:   </React.StrictMode>,
13: )
```

#### After:
```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import { registerServiceWorker } from './serviceWorkerRegistration'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)

// Initialize Service Worker for PWA Offline Functionality
registerServiceWorker({
  onSuccess: (reg) => {
    console.log('[PWA] App is ready for offline use.');
  },
  onUpdate: (reg) => {
    console.log('[PWA] New version available. Refresh to activate.');
  }
});
```

---

### 4.3 Target File 3: `index.html` (Modifications)

#### Detailed Changes:
1. **Manifest Link**: Added `<link rel="manifest" href="./manifest.webmanifest" />`.
2. **Icons**: Added high-res SVG, 192px PNG, 512px PNG, and 180px Apple touch icon links.
3. **Theme & Mobile Metas**: Added `theme-color`, `apple-mobile-web-app-capable`, `apple-mobile-web-app-status-bar-style`, `apple-mobile-web-app-title`, `mobile-web-app-capable`, and `application-name`.
4. **CDN Stylesheet Removal**: Removed redundant `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css" ...>` since `src/index.css` compiles it locally.

#### Before:
```html
1: <!doctype html>
2: <html lang="en">
3:   <head>
4:     <meta charset="UTF-8" />
5:     <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232563eb' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 2v20M2 12h20'/></svg>" />
6:     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
7:     <title>GATE AG Prep Portal | Practice & PYQ CBT Portal</title>
8:     <meta name="description" content="GATE Agricultural Engineering (AG) Exam Practice Portal " />
9:     <!-- Google Fonts -->
10:     <link rel="preconnect" href="https://fonts.googleapis.com">
11:     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
12:     <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
13:     <!-- KaTeX CSS for math formulas -->
14:     <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css" integrity="sha384-zh0CIsljEV4xM24pORrLz7voUtgMPH59vADqlj85549A7+46E7g4EO2gkgT8zJ4Q" crossorigin="anonymous">
15:   </head>
16:   <body class="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 antialiased min-h-screen selection:bg-blue-500 selection:text-white">
17:     <div id="root"></div>
18:     <script type="module" src="/src/main.jsx"></script>
19:   </body>
20: </html>
```

#### After:
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>GATE AG Prep Portal | Practice & PYQ CBT Portal</title>
    <meta name="description" content="GATE Agricultural Engineering (AG) Exam Practice Portal" />
    
    <!-- PWA & Mobile Web App Metadata -->
    <meta name="theme-color" content="#2563EB" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="application-name" content="GATE AG Prep" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="apple-mobile-web-app-title" content="GATE AG Prep" />

    <!-- Web App Manifest -->
    <link rel="manifest" href="./manifest.webmanifest" />

    <!-- Icons & Favicons -->
    <link rel="icon" type="image/svg+xml" href="./icons/icon.svg" />
    <link rel="icon" type="image/png" sizes="192x192" href="./icons/icon-192.png" />
    <link rel="icon" type="image/png" sizes="512x512" href="./icons/icon-512.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="./icons/apple-touch-icon.png" />

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
  </head>
  <body class="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 antialiased min-h-screen selection:bg-blue-500 selection:text-white">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

## 5. Verification Method

### 5.1 Build Verification Procedure
Run the production build:
```bash
npm run build
```
**Expected Assertions**:
1. Build finishes with exit code `0` (built in ~2 seconds).
2. Inspect `dist/index.html`:
   - Contains `<link rel="manifest" href="./manifest.webmanifest">`.
   - Contains `<meta name="theme-color" content="#2563EB">`.
   - Contains `<link rel="apple-touch-icon" sizes="180x180" href="./icons/apple-touch-icon.png">`.
   - Does **NOT** contain `cdn.jsdelivr.net/npm/katex`.
3. Inspect `dist/` root files:
   - `dist/sw.js` exists.
   - `dist/manifest.webmanifest` and `dist/manifest.json` exist.
   - `dist/icons/` contains `icon-192.png`, `icon-512.png`, `icon-512-maskable.png`, `icon.svg`, `apple-touch-icon.png`.
4. Inspect `dist/assets/`:
   - KaTeX fonts (`.woff2`, `.woff`, `.ttf`) bundled locally.
   - Main JS bundle contains registration logic.

### 5.2 Preview & Interactive Offline Emulation Procedure
Start the preview server:
```bash
npm run preview -- --port 4173 --host
```
Open `http://localhost:4173` in Chrome/Edge:

1. **Service Worker Registration Check**:
   - Open DevTools -> **Application** -> **Service Workers**.
   - Verify `sw.js` is registered under scope `http://localhost:4173/` (Status: Activated and running).
   - Console logs: `[PWA] ServiceWorker registered with scope: http://localhost:4173/`.

2. **Web App Manifest Check**:
   - DevTools -> **Application** -> **Manifest**.
   - Verify App Name (`GATE AG Prep Portal`), Short Name (`GATE AG Prep`), Theme Color (`#2563EB`), Display (`standalone`), and 5 Icons resolve without 404s.

3. **Offline Mode Functionality Check**:
   - DevTools -> **Network** tab -> Check **Offline** (or **Application** -> Service Workers -> Check **Offline**).
   - Reload page (`Cmd+R` / `F5`).
   - Confirm status code `200 (from service worker)` for `index.html`, JS chunks, CSS, and KaTeX fonts.
   - Navigate across all tabs:
     - **Practice Mode**: Filter questions by topic/section -> Questions & LaTeX formulas render cleanly.
     - **Mock Test Mode**: Launch 2026 CBT Paper -> 180m timer runs, question palette responds, calculator opens.
     - **Formula Sheet**: Search formulas -> LaTeX formulas render without CDN requests.
   - Console logs: `[PWA] Network status: OFFLINE. Running in offline cache mode.`.

4. **Online Reconnection Check**:
   - Uncheck **Offline** in Network tab.
   - Console logs: `[PWA] Network status: ONLINE. Synchronization active.`.

### 5.3 Automated Structural Test Assertion (Milestone 2 Integration)
Automated verification will execute in `tests/pwa.test.js` via `node --test`:
- Assert `src/serviceWorkerRegistration.js` exists and exports `registerServiceWorker`.
- Assert `src/main.jsx` invokes `registerServiceWorker()`.
- Assert `index.html` has no CDN KaTeX `<link>` and contains required PWA manifest & meta elements.
