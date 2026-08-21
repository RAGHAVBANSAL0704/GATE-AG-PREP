## 2026-08-20T15:23:14Z
You are teamwork_preview_explorer_m1_2.
Working directory: /Users/raghav/Desktop/GATE AG PREP WEB/.agents/teamwork_preview_explorer_m1_2/
Read /Users/raghav/Desktop/GATE AG PREP WEB/ORIGINAL_REQUEST.md and /Users/raghav/Desktop/GATE AG PREP WEB/PROJECT.md first.

Milestone 1 Task - PWA Offline Capability:
Focus: Service Worker (`public/sw.js`) Architecture & Caching Strategy.
1. Detail the exact implementation for `public/sw.js`:
   - Cache versioning: `CACHE_VERSION = 'gate-ag-v1.0.0'`
   - Static shell precache list: `./`, `./index.html`, `./manifest.webmanifest`, `./manifest.json`, `./icons/icon.svg`, `./icons/icon-192.png`, `./icons/icon-512.png`.
   - Install event: `self.skipWaiting()`, resilient `cache.addAll` with individual `.catch` fallbacks.
   - Activate event: `self.clients.claim()`, purging of outdated `gate-ag-*` caches.
   - Fetch event strategies:
     - Navigation (`request.mode === 'navigate'`): Network-First falling back to `./index.html`.
     - Static hashed assets (`/assets/.*` — JS/CSS/KaTeX fonts): Cache-First with runtime caching.
     - Images (`/question_images/.*`, `/docx_images/.*`): Cache-First / Stale-While-Revalidate with runtime caching in `IMAGES_CACHE`.
     - External fonts (Google Fonts): Stale-While-Revalidate.
2. Provide concrete implementation code and edge-case handling for the Worker.

Write your report to /Users/raghav/Desktop/GATE AG PREP WEB/.agents/teamwork_preview_explorer_m1_2/handoff.md following the Handoff Protocol. Update your progress.md periodically.
Send a message to parent when complete.
