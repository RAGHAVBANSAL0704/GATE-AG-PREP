# Project: GATE AG Prep Web Portal - Offline PWA & Automated E2E Test Suite

## Architecture
The application is a client-side Single Page Application (SPA) built with React 19, Vite 6, and Tailwind CSS.
- **Frontend Core**: `src/App.jsx`, `src/main.jsx`, `src/index.css`.
- **Data Store**: Client-side JSON & JS modules (`src/data/questions.json`, `src/data/mock_papers.json`, `src/data/formulas.js`, `src/data/syllabus.js`).
- **PWA Subsystem**:
  - `public/manifest.webmanifest`: Web App Manifest containing metadata, icons, shortcuts, and display configuration.
  - `public/sw.js`: Service Worker handling precaching of application shell, runtime caching of hashed assets and diagrams, and offline navigation fallback.
  - `src/serviceWorkerRegistration.js`: Client-side service worker lifecycle registration and online/offline event monitoring.
  - `public/icons/`: App icons in standard sizes (192x192, 512x512, SVG, Apple touch icon).
- **Test Subsystem**:
  - Native Node.js Test Runner (`node --test tests/**/*.test.js`) orchestrated via `npm test`.
  - `tests/scoring.test.js`: Unit tests for MCQ, MSQ, NAT scoring, negative marking, tolerance parsing, and score summaries.
  - `tests/workflows.test.js`: Integration tests for Practice Mode filtering, CBT Mock Test state transitions, 180-min timer math, and Formula Sheet search.
  - `tests/pwa.test.js`: Structural verification of manifest, service worker caching, and registration script.
  - `tests/dataset.test.js`: Structural integrity verification of question datasets, mock papers, formulas, and syllabus.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Web App Manifest | `manifest.webmanifest` with name, icons, start_url, display mode, theme colors, shortcuts | M1 | survey |
| 2 | PWA Icons & Meta Tags | 192x192, 512x512, SVG icons, apple-touch-icon, and HTML head meta tags in `index.html` | M1 | survey |
| 3 | Service Worker (`sw.js`) | Versioned caching, precaching core shell, runtime caching for assets/images, offline fallback | M1 | survey |
| 4 | SW Client Registration | `serviceWorkerRegistration.js` with registration on load and online/offline listeners | M1 | survey |
| 5 | CDN Decoupling & Asset Self-containment | Ensure KaTeX and styling bundle locally so offline rendering works 100% | M1 | survey |
| 6 | Test Infrastructure CLI | Add `"test": "node --test tests/**/*.test.js"` script to `package.json` | M2 | survey |
| 7 | MCQ Scoring Verification | Test +1/+2 marks, -1/3 and -2/3 negative deduction, unattempted (0), score rounding | M2 | survey |
| 8 | MSQ Scoring Verification | Test exact option set matching, order independence, 0 for wrong/partial, 0 negative | M2 | survey |
| 9 | NAT Scoring Verification | Test range interval `min to max`, scalar tolerance `±0.05`, invalid number input, 0 negative | M2 | survey |
| 10 | Practice Mode Workflow Test | Test section normalization, cascading filters (Topic, Subtopic, Type, Year, Marks, Status) | M2 | survey |
| 11 | CBT Mock State & Timer Test | Test 5 question states (`NOT_VISITED`, `NOT_ANSWERED`, `ANSWERED`, `MARKED`, `ANSWERED_MARKED`), 180m timer | M2 | survey |
| 12 | Formula Sheet Workflow Test | Test formula categorization across 5 sections, LaTeX rendering string validity, live search | M2 | survey |
| 13 | PWA & Dataset Integrity Tests | Test manifest schema, icon existence, SW syntax, 20 mock papers (1421 Qs), 260 practice Qs | M2 | survey |
| 14 | 100% Pass Single Command Verification | Verify `npm test` runs all test suites and exits 0 | M3 | survey |
| 15 | Adversarial Coverage & Forensic Audit | Stress testing edge cases and forensic integrity verification | M3 | survey |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | PWA Offline Capability | Manifest, icons, service worker, registration, and index.html PWA tags | none | DONE |
| M2 | Automated Verification & Test Suite | Test runner script, scoring tests (MCQ/MSQ/NAT), workflow tests, dataset tests | M1 | DONE |
| M3 | Final E2E Verification & Audit | 100% test pass via `npm test`, build check (`npm run build`), challenger & forensic audit | M1, M2 | DONE |

## Interface Contracts
### Service Worker ↔ Client Application
- **Registration**: `registerServiceWorker()` exported from `src/serviceWorkerRegistration.js` invoked in `src/main.jsx`.
- **Cache Names**:
  - `STATIC_CACHE`: `'gate-ag-static-v1.0.0'` (precached `./`, `./index.html`, `./manifest.webmanifest`, icons)
  - `RUNTIME_CACHE`: `'gate-ag-runtime-v1.0.0'` (dynamic assets under `/assets/`)
  - `IMAGES_CACHE`: `'gate-ag-images-v1.0.0'` (runtime cached `/question_images/`, `/docx_images/`)
- **Navigation Fallback**: All `request.mode === 'navigate'` requests fall back to cached `index.html` if offline.

### Test Runner ↔ Test Suites
- **Command**: `npm test` -> `node --test tests/**/*.test.js`
- **Output**: TAP/Spec formatted output from `node:test`, exit code 0 on success.
- **Assertion Library**: `node:assert/strict`.

## Code Layout
- `public/manifest.webmanifest` — Web App Manifest
- `public/manifest.json` — Manifest alias for browser compatibility
- `public/sw.js` — Service worker script
- `public/icons/` — App icons (`icon-192.png`, `icon-512.png`, `icon-512-maskable.png`, `icon.svg`, `apple-touch-icon.png`)
- `src/serviceWorkerRegistration.js` — SW registration helper
- `src/main.jsx` — SW registration entrypoint
- `index.html` — Linked manifest and PWA meta tags
- `package.json` — Test script definition
- `tests/scoring.test.js` — MCQ, MSQ, NAT scoring unit tests
- `tests/workflows.test.js` — Practice mode, CBT test, and Formula sheet tests
- `tests/pwa.test.js` — PWA manifest & SW validation tests
- `tests/dataset.test.js` — Dataset schema & count validation tests
