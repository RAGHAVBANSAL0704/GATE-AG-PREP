# Repository Instructions & Agent Guidelines

## Master Project Context
Before analyzing files or writing code, refer to [`PROJECT_CONTEXT.md`](file:///Users/raghav/Desktop/GATE%20AG%20PREP%20WEB/PROJECT_CONTEXT.md) for the complete consolidated overview of architecture, datasets, scoring rules, offline sync engine, and automated testing setup.

## Quick Reference
- **Test Runner**: Run `npm test` (`node --test tests/**/*.test.js`) to verify all 359 tests pass with exit code 0.
- **Build Target**: Run `npm run build` (`vite build`) to verify clean bundle compilation into `dist/`.
- **Primary Entry Points**:
  - Main App: `src/App.jsx`
  - Scoring & Evaluation: `tests/scoring.test.js`
  - Offline Sync: `src/services/testAttemptService.js`
  - Service Worker: `public/sw.js` & `src/serviceWorkerRegistration.js`
- **Palette State Constants**: `NOT_VISITED`, `NOT_ANSWERED`, `ANSWERED`, `MARKED`, `ANSWERED_MARKED`.
- **Offline Rule**: Maintain 100% offline capability and graceful `localStorage` fallback.

## Theme & Visual Design Invariants
- **Streamlined 2-Theme System**: The portal strictly supports exactly two themes: `light` (Light Mode, default) and `dark` (Dark Theme). Do not re-introduce cluttered multi-theme pickers or unnecessary themes.
- **Dual-Theme Contrast Guardrail**:
  - Never hardcode pitch-black containers (`bg-slate-950`, `bg-slate-900`) or white text (`text-white`) without responsive light mode counterparts (`bg-white dark:bg-slate-900`, `text-slate-900 dark:text-white`).
  - All cards, spotlight banners, and podiums must adapt to light theme using subtle light gradients (`bg-gradient-to-r from-blue-50/90 via-indigo-50/80... dark:from-blue-900...`) and crisp borders (`border-slate-200 dark:border-slate-800`).
  - Form inputs, textareas, and search boxes must ensure full legibility in light mode (`bg-slate-50 dark:bg-slate-950/80`, `text-slate-900 dark:text-white`, `placeholder-slate-400 dark:placeholder-slate-500`).
  - Subtitle, footnote, and rule card text on light backgrounds must use `text-slate-600 dark:text-slate-400` to prevent low contrast.
