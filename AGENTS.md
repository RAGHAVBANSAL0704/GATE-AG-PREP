# Repository Instructions & Agent Guidelines

## Master Project Context
Before analyzing files or writing code, refer to [`PROJECT_CONTEXT.md`](file:///Users/raghav/Desktop/GATE%20AG%20PREP%20WEB/PROJECT_CONTEXT.md) for the complete consolidated overview of architecture, datasets, scoring rules, offline sync engine, and automated testing setup.

## Quick Reference
- **Test Runner**: Run `npm test` (`node --test tests/**/*.test.js`) to verify all 264 tests pass with exit code 0.
- **Build Target**: Run `npm run build` (`vite build`) to verify clean bundle compilation into `dist/`.
- **Primary Entry Points**:
  - Main App: `src/App.jsx`
  - Scoring & Evaluation: `tests/scoring.test.js`
  - Offline Sync: `src/services/testAttemptService.js`
  - Service Worker: `public/sw.js` & `src/serviceWorkerRegistration.js`
- **Palette State Constants**: `NOT_VISITED`, `NOT_ANSWERED`, `ANSWERED`, `MARKED`, `ANSWERED_MARKED`.
- **Offline Rule**: Maintain 100% offline capability and graceful `localStorage` fallback.
