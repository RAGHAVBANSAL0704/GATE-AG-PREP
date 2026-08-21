# PWA and Offline Capability Survey Report

## 1. Observation

Direct investigation of the codebase and workspace revealed the following concrete file paths, sizes, and architectural details:

### 1.1 Project Structure & Build Configuration
- **Root Files**:
  - `package.json` (`/Users/raghav/Desktop/GATE AG PREP WEB/package.json`): React 19 (`react@^19.0.0`, `react-dom@^19.0.0`), `katex@^0.16.21`, `lucide-react@^0.475.0`, `canvas-confetti@^1.9.4`, `tailwindcss@^3.4.17`, `vite@^6.1.0`.
  - `vite.config.js` (`/Users/raghav/Desktop/GATE AG PREP WEB/vite.config.js`):
    ```js
    export default defineConfig({
      plugins: [react()],
      base: './', // Enables relative paths
      server: { port: 3000, host: true }
    })
    ```
  - `index.html` (`/Users/raghav/Desktop/GATE AG PREP WEB/index.html`):
    - Line 5: Inline SVG data URI favicon.
    - Lines 10–12: Google Fonts `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:...&family=JetBrains+Mono:...&display=swap">`.
    - Line 14: External KaTeX CDN stylesheet `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css" ...>`.
    - Manifest link: Currently **missing** (no `<link rel="manifest" ...>`).
    - PWA meta tags: Currently **missing** (`theme-color`, `mobile-web-app-capable`, `apple-touch-icon`).

### 1.2 Data Bundling & Code Architecture
- **Question Data & Formula Storage**:
  - `src/data/questions.json` (318 KB): Practice questions dataset.
  - `src/data/mock_papers.json` (1.87 MB): Full mock papers & PYQs (2007–2026).
  - `src/data/formulas.js` (16.9 KB): Comprehensive GATE AG formula database across 6 subjects.
  - `src/data/syllabus.js` (7.4 KB): Full syllabus breakdown and topic weightages.
  - In `src/App.jsx` (lines 15–16):
    ```js
    import initialQuestions from './data/questions.json';
    import initialMockPapers from './data/mock_papers.json';
    ```
  - **No Dynamic Fetching**: There are zero `fetch()`, `axios`, or dynamic API calls in `src/`. The entire dataset (all 20 years of PYQ exams, practice questions, formulas, and syllabus) is imported statically at build time into the client JS bundle.

### 1.3 Styles & KaTeX Fonts
- In `src/index.css` (line 4):
  ```css
  @import "tailwindcss/base";
  @import "tailwindcss/components";
  @import "tailwindcss/utilities";
  @import "katex/dist/katex.min.css";
  ```
- **Vite Build Output (`dist/assets/`)**:
  - `index-[hash].js`: ~2.55 MB (contains React, all question data, formulas, CBT engine).
  - `index-[hash].css`: ~83.4 KB (contains Tailwind CSS and KaTeX styling).
  - KaTeX Font files: 60 files (`.woff2`, `.woff`, `.ttf`) totaling ~1.2 MB bundled directly into `dist/assets/` (e.g. `KaTeX_Main-Regular-*.woff2`, `KaTeX_Math-Italic-*.woff2`, `KaTeX_AMS-Regular-*.woff2`).

### 1.4 Public Directory & Asset Footprint
- `public/` directory breakdown (`du -sh public/*`):
  - `public/question_images/`: 53 MB (Diagrams referenced via `image_url: "/question_images/AG2012_page_1.png"` in questions and mock tests).
  - `public/docx_images/`: 696 KB (Diagrams extracted from DOCX solutions).
  - `public/downloads/`: 32 MB (Official PDFs of question papers 2007–2026, answer keys, and DOCX documents in `DownloadsHub.jsx`).
  - `public/question_snippets/`: 420 MB (High-res page snippet crops; `snippet_url` in `mock_papers.json`, but currently unreferenced in UI components).
  - **Missing PWA Icons**: No `manifest.webmanifest`, `icon-192.png`, `icon-512.png`, `icon-512-maskable.png`, or `apple-touch-icon.png` in `public/`.

### 1.5 State Persistence
- In `src/App.jsx` (lines 20–59, 73–84):
  - `gate_ag_theme`: UI theme setting (`cyber-dark`, `forest-emerald`, `midnight-amethyst`, `slate-light`).
  - `gate_ag_user_stats`: Exam attempt history, question scores, CBT performance metrics.
  - `gate_ag_bookmarks`: Bookmarked question IDs.
  - `gate_ag_progress`: Syllabus tracker checklist completion.
  - All state persists via `window.localStorage`.

---

## 2. Logic Chain

From the direct observations above, the design requirements for full PWA and offline readiness proceed through the following logical steps:

### 2.1 Static Asset & Precache Scope (Observation 1.2, 1.3, 1.4)
1. **Self-Contained SPA Architecture**: Because all questions, syllabus data, formulas, and test calculations are statically bundled into `dist/assets/index-[hash].js`, the web application does not require any backend API or database connection to operate.
2. **App Shell Size**: The core App Shell consists of `index.html` (~1.5 KB), `index-[hash].js` (~2.55 MB uncompressed, ~600 KB gzip), `index-[hash].css` (~83 KB), KaTeX woff2 fonts (~600 KB), and PWA icons (~100 KB). Total initial precache payload is ~3.8 MB (less than 1.5 MB gzipped).
3. **Selective Caching for Large Media**:
   - `public/question_snippets/` (420 MB) and `public/downloads/` (32 MB) must **never** be eagerly precached during the Service Worker `install` event. Doing so would exceed mobile cache quotas (e.g. Safari iOS limits) and cause install timeouts.
   - Question figures (`/question_images/*` and `/docx_images/*`, ~54 MB total) should use **Runtime Caching (Cache-First / Stale-While-Revalidate with LRU limit)** so figures load on demand and persist offline once viewed.

### 2.2 Web App Manifest Specification (Observation 1.1, 1.4)
1. **File Location**: `public/manifest.webmanifest` (copied directly to `dist/manifest.webmanifest` during build).
2. **Required Configuration Schema**:
   ```json
   {
     "name": "GATE AG Prep Portal - CBT & Practice Portal",
     "short_name": "GATE AG Prep",
     "description": "Comprehensive offline practice, formula sheet, and CBT mock exam portal for GATE Agricultural Engineering.",
     "start_url": "./",
     "scope": "./",
     "display": "standalone",
     "orientation": "any",
     "background_color": "#0B0F19",
     "theme_color": "#2563EB",
     "categories": ["education", "reference", "productivity"],
     "icons": [
       {
         "src": "./icons/icon-192.png",
         "sizes": "192x192",
         "type": "image/png",
         "purpose": "any"
       },
       {
         "src": "./icons/icon-512.png",
         "sizes": "512x512",
         "type": "image/png",
         "purpose": "any"
       },
       {
         "src": "./icons/icon-512-maskable.png",
         "sizes": "512x512",
         "type": "image/png",
         "purpose": "maskable"
       },
       {
         "src": "./icons/icon.svg",
         "sizes": "any",
         "type": "image/svg+xml",
         "purpose": "any"
       }
     ],
     "shortcuts": [
       {
         "name": "Practice Mode",
         "short_name": "Practice",
         "url": "./#practice",
         "description": "Topic-wise practice questions with instant solutions"
       },
       {
         "name": "CBT Mock Test",
         "short_name": "Mock Test",
         "url": "./#mock",
         "description": "Official GATE 3-hour computer-based test interface"
       },
       {
         "name": "Formula Sheet",
         "short_name": "Formulas",
         "url": "./#formulas",
         "description": "Quick revision formula sheets"
       }
     ]
   }
   ```
3. **HTML `<head>` Linking**:
   `index.html` must include:
   - `<link rel="manifest" href="./manifest.webmanifest">`
   - `<meta name="theme-color" content="#2563EB" media="(prefers-color-scheme: light)">`
   - `<meta name="theme-color" content="#0B0F19" media="(prefers-color-scheme: dark)">`
   - `<meta name="mobile-web-app-capable" content="yes">`
   - `<meta name="apple-mobile-web-app-capable" content="yes">`
   - `<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">`
   - `<meta name="apple-mobile-web-app-title" content="GATE AG Prep">`
   - `<link rel="apple-touch-icon" href="./icons/apple-touch-icon.png">`

### 2.3 Service Worker Architecture (Observation 1.1, 1.2, 1.3)
1. **Scope and Placement**: `public/sw.js` (served at origin root `/sw.js`).
2. **Cache Naming & Versioning**:
   - `CACHE_VERSION = 'gate-ag-v1.0.0'`
   - `STATIC_CACHE = 'gate-ag-static-v1.0.0'`
   - `RUNTIME_CACHE = 'gate-ag-runtime-v1.0.0'`
   - `IMAGES_CACHE = 'gate-ag-images-v1.0.0'`
3. **Lifecycle Events**:
   - **`install`**:
     - Call `self.skipWaiting()` for immediate lifecycle activation.
     - Precache core shell: `['./', './index.html', './manifest.webmanifest', './icons/icon.svg', './icons/icon-192.png', './icons/icon-512.png']`.
     - Resilient caching: use `.catch()` on individual precache assets so one optional asset failure does not abort installation.
   - **`activate`**:
     - Call `self.clients.claim()` so the active service worker immediately takes control of all client tabs without requiring a page reload.
     - Clean up stale caches: iterate through `caches.keys()` and delete any cache starting with `gate-ag-` that does not match current cache versions.
4. **Fetch Strategies by Resource Category**:
   - **HTML Navigations (`request.mode === 'navigate'`)**:
     - *Strategy*: Network-First with Cache Fallback (`./index.html`).
     - *Behavior*: Ensures users receive updates when online, but immediately falls back to cached `index.html` when offline.
   - **Immutable Hashed Assets (`/assets/.*` — JS, CSS, KaTeX webfonts)**:
     - *Strategy*: Cache-First with Network Fallback & Runtime Cache.
     - *Behavior*: Vite builds produce content-hashed filenames. Once stored in Cache Storage, they are served at 0ms latency offline.
   - **Question Images & Figures (`/question_images/.*`, `/docx_images/.*`)**:
     - *Strategy*: Stale-While-Revalidate or Cache-First with runtime caching.
     - *Behavior*: Serves cached figure if available, otherwise fetches from network, stores in `IMAGES_CACHE`, and returns to UI.
   - **Google Fonts (`fonts.googleapis.com`, `fonts.gstatic.com`)**:
     - *Strategy*: Stale-While-Revalidate for CSS, Cache-First for font binaries (`.woff2`).
   - **Document Downloads (`/downloads/.*`)**:
     - *Strategy*: Network-First with Cache fallback.
5. **Client-Side Registration Script (`src/main.jsx` / `src/serviceWorkerRegistration.js`)**:
   - Register on `window.addEventListener('load', ...)` when `'serviceWorker' in navigator`.
   - Add offline/online network listener hooks:
     ```js
     window.addEventListener('online', () => console.log('Online: Network reconnected'));
     window.addEventListener('offline', () => console.log('Offline: Running in offline mode'));
     ```

### 2.4 Offline Pitfall Identification & Mitigation (Observation 1.1, 1.3, 1.4, 1.5)
1. **Redundant KaTeX CDN Link**:
   - *Observation*: `index.html` line 14 loads `katex.min.css` from `cdn.jsdelivr.net`.
   - *Issue*: If network is unavailable on first boot or CDN fails, rendering may break if dependent on external CSS.
   - *Resolution*: `src/index.css` line 4 already imports `@import "katex/dist/katex.min.css";`, and Vite bundles all CSS and KaTeX fonts locally into `dist/assets/`. The redundant `<link rel="stylesheet" ...>` in `index.html` should be removed so the app has **zero external CSS CDN dependencies**.
2. **Google Fonts Dependency**:
   - *Resolution*: Tailwind's font stack already provides robust system fallbacks (`ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`). In addition, the Service Worker intercepts and caches Google Font stylesheets and `.woff2` files for offline visual parity.
3. **Storage Quotas on Mobile**:
   - *Resolution*: By decoupling the ~3.8 MB core shell from the 500 MB `public/` assets (snippets and large download archives), the app installs in < 1 second and consumes minimal storage while enabling 100% of Practice Mode questions, CBT Mock Tests, and Formula Sheets offline.
4. **Offline State Safety**:
   - *Resolution*: Since user performance, question attempts, bookmarks, and syllabus checklists use `localStorage` with JSON serialization, no backend synchronization errors or offline transaction queues are needed.

---

## 3. Caveats

1. **Question Snippet Images (420 MB)**:
   `public/question_snippets/` contains 420 MB of scanned PDF page crops. While `mock_papers.json` contains `snippet_url` keys pointing to them, the current React UI components (`MockTestMode.jsx`, `PracticeMode.jsx`) render question text directly via KaTeX math rendering and only load explicit diagrams via `image_url`. The 420 MB snippets directory should be excluded from precaching to avoid browser storage quota errors.
2. **Downloadable PDFs (32 MB)**:
   Official exam question paper PDFs (2007–2026) in `public/downloads/` will only be accessible offline if the student has downloaded/viewed them previously, or if the student explicitly clicks download while online.
3. **HTTPS / Localhost Requirement**:
   Service Workers require a secure context (HTTPS in production or `localhost`/`127.0.0.1` during development/testing). When testing via `vite preview`, `http://localhost:4173` or `http://localhost:3000` satisfies this requirement.
4. **Vite Hash Cache Synchronization**:
   When using standard Service Worker without build-time injection plugins, caching hashed `/assets/*` dynamically via a runtime Cache-First strategy avoids having to manually maintain asset hashes in `sw.js` across builds.

---

## 4. Conclusion

The GATE AG Prep Web Portal is an ideal candidate for Progressive Web App conversion because:
1. **100% of question text, formulas, PYQ papers (2007–2026), and CBT evaluation logic are client-side JavaScript** compiled directly into the application bundle.
2. **Precache footprint is lightweight (~3.8 MB uncompressed / < 1.5 MB gzipped)**, enabling instantaneous offline loading on desktop and mobile devices.
3. **Implementation Plan**:
   - **Asset Optimization**: Remove redundant `cdn.jsdelivr.net` KaTeX stylesheet link from `index.html` (since `src/index.css` already imports KaTeX locally).
   - **Web App Manifest**: Place `manifest.webmanifest` in `public/` and generate brand app icons (192x192, 512x512, maskable 512x512, SVG, Apple Touch Icon) in `public/icons/`. Link manifest and mobile meta tags in `index.html`.
   - **Service Worker (`public/sw.js`)**: Implement versioned cache management (`gate-ag-v1`), static shell precaching, Network-First navigation fallback, and Cache-First runtime asset caching.
   - **Client Registration**: Register `sw.js` in `src/main.jsx` with offline status event hooks.

---

## 5. Verification Method

To independently verify PWA and offline readiness:

### 5.1 Build Verification
Execute the production build to ensure all assets, KaTeX fonts, CSS, and manifest are processed cleanly:
```bash
npm run build
```
Verify the output structure:
- `dist/index.html` exists and contains `<link rel="manifest" href="./manifest.webmanifest">`.
- `dist/manifest.webmanifest` exists with valid JSON and icon references.
- `dist/sw.js` exists at the root of `dist/`.
- `dist/icons/` contains `icon-192.png`, `icon-512.png`, and `icon.svg`.
- `dist/assets/` contains the JS bundle, CSS bundle, and KaTeX `.woff2` font files.

### 5.2 Offline Execution Test via Local Server
1. Launch the preview server:
   ```bash
   npm run preview
   ```
2. Open the application in Chrome/Edge/Safari at `http://localhost:4173`.
3. Open **Chrome DevTools -> Application -> Service Workers**:
   - Confirm `sw.js` status is `Activated and is running`.
4. Open **Chrome DevTools -> Application -> Manifest**:
   - Confirm manifest is loaded with no errors, icons preview correctly, and "Installable" badge is green.
5. Open **Chrome DevTools -> Network**:
   - Toggle **Offline** mode (check the "Offline" box).
   - Refresh the page (`Cmd + R` / `Ctrl + F5`).
   - Navigate between **Practice Mode**, **Mock Test Mode**, **Formula Sheet**, and **Calculator**.
   - Verify that KaTeX formulas render correctly with no math glitching or missing fonts.
   - Attempt a practice question and verify instant solution reveal.
   - Start a CBT Mock Test and verify timer, question navigation, palette status updates, and score submission modal function 100% offline.
6. Open **Chrome DevTools -> Lighthouse**:
   - Run a **PWA audit** and verify all criteria pass: "Installable", "Configured for a custom splash screen", "Sets a theme color for the address bar", "Registers a service worker that controls page and start_url".
