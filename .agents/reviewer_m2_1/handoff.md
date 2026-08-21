# Review & Adversarial Audit Report: Milestone 2 & Milestone 3

## 1. Observation
- **Test Runner Script in `package.json`**:
  - Line 10 of `package.json`: `"test": "node --test tests/**/*.test.js"`
  - Exit code from `npm test`: 0
  - Test suites: 4 test files (`tests/scoring.test.js`, `tests/workflows.test.js`, `tests/pwa.test.js`, `tests/dataset.test.js`) containing 21 sub-suites and 77 automated test cases.
  - Test execution result: 77 passed, 0 failed, 0 cancelled, 0 skipped in 47.03 ms.

- **Scoring Engine Verification (`tests/scoring.test.js`)**:
  - **MCQ Scoring**: Verified +1 mark for 1-mark correct, +2 marks for 2-mark correct; negative deduction -1/3 for 1-mark incorrect, -2/3 for 2-mark incorrect; 0 marks for unattempted; 0 marks for `MARKED` without answer; correct marks for `ANSWERED_MARKED` with answer.
  - **MSQ Scoring**: Verified exact option set matching, order independence (e.g. `"C, A"` vs `"A, C"`), separator normalization (`,` and `;`), strictly 0 partial marks for partial subsets (e.g. `"A"` when key is `"A, C"`), 0 marks for extra wrong choices, and strictly 0 negative deduction.
  - **NAT Scoring**: Verified scalar matching within `±0.05` tolerance (e.g. 14.47 and 14.54 for key 14.50), inclusive `"min to max"` interval evaluation (e.g. 12.20, 12.55, 12.80 for key `"12.20 to 12.80"`), rejection of out-of-range answers (12.19, 12.81), malformed/NaN input resilience, and strictly 0 negative deduction.
  - **Mock Aggregation & Rounding**: Verified composite 10-question mixed exam scorecard scoring (raw 7 - 1 = 6.00 marks, accuracy 50%), edge cases of 100% correct (17.00 marks, 100% accuracy), and 0 attempts (0.00 marks, 0% accuracy).
  - **AIR Percentile Tiers**: Verified score mapping to `99.5+ (Top 10 AIR)` (score >= 60), `98.0+ (Top 50 AIR)` (45 to 59.99), `92.0+ (Top 200 AIR)` (35 to 44.99), `80.0+ (Qualifying Cutoff)` (25 to 34.99), and `< 75.0 (Needs Revision)` (< 25).

- **Workflow & Integration Verification (`tests/workflows.test.js`)**:
  - **Practice Mode**: Verified section title normalization across variations (e.g. `farm machinery & power` -> `Farm Power and Machinery`), cascading filters (Section -> Topic -> Subtopic -> Type -> Marks -> Status), and bookmarked/attempted status filtering.
  - **CBT Mock Test State Machine**: Verified initial state (Q1 `NOT_ANSWERED`, remainder `NOT_VISITED`), `Save & Next` transitions to `ANSWERED`, `Mark For Review & Next` transitions to `MARKED` / `ANSWERED_MARKED`, palette direct jumping, MSQ multi-select checkbox toggle, `Clear Response` reset, and 180-minute timer countdown with auto-submission trigger.
  - **Formula Sheet**: Verified 5 syllabus sections, 41 formulas, live search by title/explanation/topic, category filtering, and balanced LaTeX brace validation across all 41 formula strings.

- **PWA & Dataset Verification (`tests/pwa.test.js`, `tests/dataset.test.js`)**:
  - Validated `manifest.webmanifest` and `manifest.json` schema, display mode (`standalone`), start URL, colors, and 3 shortcuts.
  - Validated PNG dimensions (192x192, 512x512, 512x512 maskable, 180x180 apple touch) and SVG validity.
  - Validated `sw.js` multi-tier cache namespaces, precache asset list, fetch interceptor, and offline navigation fallback.
  - Validated dataset integrity: 260 practice questions (173 MCQ, 83 NAT, 4 MSQ), 20 PYQ mock papers (2007–2026, 1,421 total questions), 41 formulas, and 83 syllabus subtopics.

- **Production Build Execution**:
  - `npm run build` executed cleanly with Vite 6.1.0 in 1.53s, transforming 1,612 modules into `dist/` with exit code 0.

## 2. Logic Chain
1. Requirement R2 in `ORIGINAL_REQUEST.md` demands an automated end-to-end test suite that verifies core student workflows: Practice Mode filtering, CBT Mock Test timing & score calculation, and Formula Sheet rendering, passing via a single command `npm test` with 100% success.
2. Inspection of `package.json` demonstrates that `"test": "node --test tests/**/*.test.js"` is configured using Node.js built-in test runner without extraneous external runtime dependencies.
3. Execution of `npm test` independently validated 77 test cases across 4 test suites with 0 failures and 0 flaky/skipped tests.
4. Independent dataset audit confirmed that all 983 MCQs across mock papers and 173 MCQs in practice questions have valid marks and negative mark coefficients, and MSQ/NAT evaluations adhere to GATE standard rules of zero negative deduction.
5. Forensic integrity audit confirmed zero dummy/facade implementations, no hardcoded cheating shortcuts, and complete self-containment (zero blocking third-party CDNs).
6. Production build verification confirmed that the entire React SPA bundles cleanly for distribution.

## 3. Caveats
- Minor build notice: Vite emitted a chunk size notice for `index-*.js` (~2.55 MB uncompressed / 396 kB gzip) due to bundled inline KaTeX math fonts and embedded question datasets. This is normal and expected for a 100% offline self-contained PWA.
- In `mock_papers.json`, two disputed official GATE questions from historical papers (2023 Q65, 2025 Q65) have key `"MTA"` (Marks To All). They are handled gracefully without runtime exceptions.

## 4. Conclusion
**Verdict**: **APPROVE**
- Milestone 2 (Automated Test Suite) and Milestone 3 (Final E2E Verification) are fully met with high quality, rigorous assertions, zero test failures, and clean production build.

## 5. Verification Method
1. Run automated test suite:
   `npm test`
   Expect: 77 tests pass, 0 fail, exit code 0.
2. Run production build:
   `npm run build`
   Expect: Vite bundles cleanly into `dist/`, exit code 0.
3. Inspect test files:
   - `tests/scoring.test.js`
   - `tests/workflows.test.js`
   - `tests/pwa.test.js`
   - `tests/dataset.test.js`
