## 2026-08-20T15:31:11Z
Task: Implement Milestone 2 - Automated Verification & Test Suite for GATE AG Prep Web Portal

Exclusive Write Ownership:
- `package.json` (add `"test": "node --test tests/**/*.test.js"`)
- `tests/scoring.test.js`
- `tests/workflows.test.js`
- `tests/pwa.test.js`
- `tests/dataset.test.js`

Execution Details:
1. Update `package.json` to include `"test": "node --test tests/**/*.test.js"` in the `scripts` object.
2. Implement `tests/scoring.test.js` using Node's built-in `node:test` (`describe`, `it`) and `node:assert/strict`:
   - Comprehensive unit tests for MCQ (+1/+2, negative marking -1/3 and -2/3, unattempted = 0, score rounding).
   - Comprehensive unit tests for MSQ (exact set match, order independence e.g. "B, D" vs "D, B" vs "B,D", 0 for partial/wrong, 0 negative marks).
   - Comprehensive unit tests for NAT (interval range `min to max`, scalar tolerance ±0.05, invalid number input handling, 0 negative marks).
   - Tests for accuracy %, AIR percentile tiers from `TestResultModal.jsx`.
3. Implement `tests/workflows.test.js`:
   - Practice Mode: Section normalization (`normSec` / `SECTION_NORM_MAP`), hierarchical cascading filters (Section, Topic, Subtopic, Type, Year, Marks, Status).
   - CBT Mock Test: 5 question states (`NOT_VISITED`, `NOT_ANSWERED`, `ANSWERED`, `MARKED`, `ANSWERED_MARKED`), question palette transition logic, 180-min (10,800s) countdown timer calculation, auto-submission calculation.
   - Formula Sheet: 5 categories (`EM`, `FMP`, `SWCE`, `APE`, `GA`), formula count validation (41 formulas), live search filter matching (title, explanation, topic), LaTeX format validity.
4. Implement `tests/pwa.test.js`:
   - Validate `public/manifest.webmanifest` and `public/manifest.json` schema, required fields (`name`, `short_name`, `theme_color: "#2563EB"`, `background_color: "#0B0F19"`, `display: "standalone"`, `start_url: "./"`), 5 icons, 3 shortcuts.
   - Validate all icon files exist in `public/icons/` and match required dimensions.
   - Validate `public/sw.js` caching namespaces, precache asset list, and offline fallback handlers.
   - Validate `src/serviceWorkerRegistration.js` exports and SSR safety guards.
   - Validate `index.html` PWA meta tags, manifest link, icon links, and absence of blocking external CDN links.
5. Implement `tests/dataset.test.js`:
   - Validate 260 curated questions in `src/data/questions.json` (required schema fields, correct question type distribution).
   - Validate 20 mock papers in `src/data/mock_papers.json` (1,421 questions, instructions schema, year coverage 2007–2026).
   - Validate 41 formulas in `src/data/formulas.js` and 83 syllabus subtopics in `src/data/syllabus.js`.
6. Run `npm test` and `npm run build` to verify that 100% of the tests execute cleanly and pass with exit code 0.
