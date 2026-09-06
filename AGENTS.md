# MASTER DIRECTIVE: GATE AGRICULTURAL ENGINEERING (AG) FULL-STACK PLATFORM

Refer to [`PROJECT_CONTEXT.md`](file:///Users/raghav/Desktop/GATE%20AG%20PREP%20WEB/PROJECT_CONTEXT.md) for full architecture, scoring rules, offline sync, and schemas. Do not re-read raw data files or crawl the repo when context is available there.

## 1. Absolute System Invariants & Guardrails
- **Official PYQ Integrity**: `src/data/questions.json` contains strictly the 1,324 official GATE AG PYQs (2007–2026). NEVER append mock tests or custom questions to `questions.json`.
- **Custom Mock Papers**: 29 full-length mocks reside in `src/data/custom_mock_2027_01.json` through `custom_mock_2027_29.json`, ingested in `allCustomMockPapers` in `src/App.jsx`. Original docx files reside in `public/downloads/mock_tests/MOCK XX GATE AG.docx`.
- **Verification Commands**: `npm test` runs 426 tests across 85 suites (100% pass, exit 0). `npm run build` compiles Vite bundle into `dist/`.
- **Entry Points**: App (`src/App.jsx`), Scoring (`src/utils/scoring.js`, `tests/scoring.test.js`), Offline Sync (`src/services/testAttemptService.js`), SW (`public/sw.js`).
- **CBT Palette States**: `NOT_VISITED`, `NOT_ANSWERED`, `ANSWERED`, `MARKED`, `ANSWERED_MARKED`.
- **Offline Rule**: 100% offline functionality with graceful `localStorage` fallback.
- **2-Theme System**: Strictly `light` (default) and `dark`. No extra themes.
  - Never hardcode dark background (`bg-slate-900`) or white text without responsive light mode counterpart (`bg-white dark:bg-slate-900`, `text-slate-900 dark:text-white`).
  - Inputs: `bg-slate-50 dark:bg-slate-950/80`, `text-slate-900 dark:text-white`.
  - Muted text: `text-slate-600 dark:text-slate-400`.

## 2. Official GATE AG Examination Pattern & Scoring
- **Total Duration**: 180 Minutes (3 Hours).
- **Total Questions**: 65 Questions | **Total Marks**: 100.00 Marks.
- **Section Distribution**:
  - General Aptitude (GA): Questions 1 to 10 (Q1–5 = 1M; Q6–10 = 2M; Total = 15M).
  - Technical (Agricultural Engineering & Engg Mathematics): Questions 11 to 65 (Q11–35 = 1M; Q36–65 = 2M; Total = 85M).
- **Evaluation Rules**:
  - MCQ: 1M correct = +1.0, wrong = -1/3; 2M correct = +2.0, wrong = -2/3.
  - MSQ: Full marks (+1 or +2) ONLY for exact set match. No partial, no negative.
  - NAT: Official range/interval evaluation. No negative.

## 3. Protocol for Ingesting New Mock Papers
1. Extract docx (66-row table) to `src/data/custom_mock_2027_XX.json`.
2. Ensure Q1–10 are General Aptitude; Q11–65 are Technical sections.
3. Copy docx to `public/downloads/mock_tests/MOCK XX GATE AG.docx`.
4. Import and wire in `src/App.jsx` (`allCustomMockPapers`).
5. Update `vite.config.js` `manualChunks` grouping.
6. Verify `DownloadsHub.jsx` download link routing.
7. Update `tests/custom_mocks.test.js` mock count.
8. Run `npm test` and `npm run build`.
