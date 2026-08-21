# Codebase Survey & Architectural Assessment: GATE AG Prep Web Portal

## 1. Observation

### 1.1 Project Structure & Entry Points
- **Root Directory (`/Users/raghav/Desktop/GATE AG PREP WEB`)**:
  - `index.html` (21 lines): Entry HTML file. Contains:
    - Line 5: Favicon data URI (`data:image/svg+xml,...`).
    - Line 12: External Google Fonts CDN link (`https://fonts.googleapis.com/css2?family=Inter:...`).
    - Line 14: External KaTeX stylesheet CDN link (`https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css`).
    - Line 17: `<div id="root"></div>`.
    - Line 18: `<script type="module" src="/src/main.jsx"></script>`.
    - Note: No `<link rel="manifest">`, `<meta name="theme-color">`, or service worker script tags exist.
  - `vite.config.js` (13 lines):
    - Line 6: Uses `@vitejs/plugin-react`.
    - Line 7: `base: './'` for relative asset resolution.
    - Line 9: Dev server port 3000.
  - `package.json` (30 lines):
    - `name`: `"gate-ag-prep-portal"`, `type`: `"module"`, `version`: `"1.0.0"`.
    - `scripts`: `"dev": "vite"`, `"build": "vite build"`, `"preview": "vite preview"`.
    - No `"test"` script exists.
    - Runtime `dependencies`: `canvas-confetti` (^1.9.4), `katex` (^0.16.21), `lucide-react` (^0.475.0), `react` (^19.0.0), `react-dom` (^19.0.0).
    - `devDependencies`: `@types/canvas-confetti`, `@types/katex`, `@types/react`, `@types/react-dom`, `@vitejs/plugin-react` (^4.3.4), `autoprefixer` (^10.4.20), `postcss` (^8.5.1), `tailwindcss` (^3.4.17), `vite` (^6.1.0).
  - `src/main.jsx` (14 lines):
    - Line 7-13: Renders `<ErrorBoundary><App /></ErrorBoundary>` into `document.getElementById('root')`.
    - Line 5: Imports `./index.css`.
  - `src/App.jsx` (272 lines):
    - Main layout shell with persistent sidebar and tab management.
    - Active tabs: `'dashboard'`, `'practice'`, `'mocktest'`, `'downloads'`, `'customtest'`, `'syllabus'`, `'revision'`, `'formulas'`, `'creator'`.
    - Manages theme states (`'cyber-dark'`, `'forest-emerald'`, `'midnight-amethyst'`, `'slate-light'`) persisted to `localStorage` key `'gate_ag_theme'`.
    - Persistent state in `localStorage`: `'gate_ag_user_stats'`, `'gate_ag_bookmarks'`, `'gate_ag_progress'`, `'gate_ag_question_notes'`.
    - Renders global modals: `<ScientificCalculator>` (Lines 253-256) and `<TestResultModal>` (Lines 258-268).
  - `src/index.css` (241 lines):
    - Line 4: `@import "katex/dist/katex.min.css";`.
    - Custom theme variables, `.calc-btn` utility, `.card-3d` utility, and KaTeX math overflow styling (`.katex-display`, `.katex-mathml`).

### 1.2 Data Files & Assets
- `src/data/questions.json`:
  - 260 curated questions across recent GATE papers (2021, 2024, 2025, 2026).
  - Distribution: 173 MCQ, 83 NAT, 4 MSQ.
  - Schema per item: `id` (e.g. `"GATE_2026_Q5"`), `year` (`"2026"`), `qnum` (`5`), `section` (`"General Aptitude"`), `topic` (`"Analytical Aptitude"`), `subtopic`, `gate_section` (`"GA"` / `"AG"`), `type` (`"MCQ"` | `"MSQ"` | `"NAT"`), `marks` (`1` | `2`), `negative_marks` (`0.33` | `0.67`), `question` (string), `options` (object `{"A":..., "B":...}`), `correct_answer` (string), `solution` (LaTeX / string), `snippet_url`, `image_url`.
- `src/data/mock_papers.json`:
  - 20 complete official GATE AG papers from 2007 through 2026.
  - 1,421 total questions across all 20 papers (983 MCQ, 423 NAT, 15 MSQ).
  - Paper schema: `year`, `title`, `instructions` (`duration_mins`, `max_marks`, `total_qs`, `ga_qs`, `ag_qs`, `instructions` list), `questions` array.
- `src/data/formulas.js`:
  - 5 categories: `EM` (Engineering Mathematics - 10 formulas), `FMP` (Farm Power & Machinery - 10 formulas), `SWCE` (Soil & Water Conservation Engineering - 10 formulas), `APE` (Agricultural Process Engineering - 8 formulas), `GA` (General Aptitude - 3 formulas) -> Total 41 formulas.
  - Schema per formula: `title`, `formula` (LaTeX string), `explanation`, `unit`.
- `src/data/syllabus.js`:
  - 5 major sections, 24 topics, 83 subtopics covering the entire GATE AG syllabus.
- `public/`:
  - Contains 1,480 static assets in `docx_images/`, `downloads/`, `question_images/`, and `question_snippets/`.

### 1.3 Core Component Implementations

#### Practice Mode (`src/components/PracticeMode.jsx`, 833 lines)
- **Hub vs Detail View**: Allows landing on a Section Launchpad (`isHubActive`) or jumping straight into question practice.
- **Section Normalization**: `SECTION_NORM_MAP` (lines 28-48) maps string variants (e.g., `'farm machinery & power'` -> `'Farm Power and Machinery'`).
- **Cascading Filter Logic** (lines 124-155):
  - Section -> Topic -> Subtopic -> Question Type (`MCQ`/`MSQ`/`NAT`) -> Year (`2021`–`2026`) -> Marks (`1`/`2`) -> Status Filter (`All`, `Bookmarked`, `Unattempted`, `Correct`, `Incorrect`).
- **Answer Validation & Scoring Evaluation** (lines 197-227):
  - **MCQ**: `userVal.trim().toUpperCase() === correctKey.trim().toUpperCase() || correctKey.toUpperCase().includes(userVal.trim().toUpperCase())`.
  - **MSQ**: Sorts selected options and compares exact comma/semicolon-separated string with normalized key: `userSorted === keySorted`.
  - **NAT**: 
    - If key contains `' to '` (range format `min to max`): evaluates `numVal >= (min - 0.001) && numVal <= (max + 0.001)`.
    - If single scalar value: evaluates `Math.abs(numVal - target) <= 0.05`.
- **Feedback & Notes**: Submitting sets `submittedState[qId]` with `{ isSubmitted: true, isCorrect }`, reveals step-by-step LaTeX derivation, allows saving rich personal notes to `localStorage['gate_ag_question_notes']`, and opens `ConceptStudyModal`.

#### CBT Mock Test (`src/components/MockTestMode.jsx`, 821 lines)
- **Paper Selection**: Pre-exam launcher displaying cards for all 20 papers (2007–2026) with max marks, duration, and question count.
- **Timer & Auto-Submit** (lines 33-35, 89-100):
  - Initialized with `(paper.instructions?.duration_mins || 180) * 60` (10,800 seconds for 3 hours).
  - Ticks down every 1000ms via `setInterval`.
  - Automatically triggers `handleSubmitFinal()` when `timeLeft === 0`. Supports untimed mode (`paper.instructions?.is_untimed`).
- **Official GATE CBT Palette State Machine** (lines 200-270):
  - Five distinct states: `NOT_VISITED` (Grey), `NOT_ANSWERED` (Red), `ANSWERED` (Green), `MARKED` (Purple), `ANSWERED_MARKED` (Purple with Green badge).
  - "Save & Next" marks answered/not-answered and advances index.
  - "Mark for Review & Next" marks reviewed/answered-marked and advances.
  - "Clear Response" resets selection and returns status to `NOT_ANSWERED`.
- **Scoring Engine** (lines 272-348):
  - Evaluates only `ANSWERED` and `ANSWERED_MARKED` questions with valid answers.
  - **MCQ**: Correct -> `score += q.marks`, `correctCount++`. Incorrect -> `score -= q.negative_marks` (if `enable_negative_marking !== false`), `incorrectCount++`.
  - **MSQ**: Correct (exact set match) -> `score += q.marks`, `correctCount++`. Incorrect -> `incorrectCount++` (0 negative marks).
  - **NAT**: Correct (inside tolerance range or within +/- 0.05) -> `score += q.marks`, `correctCount++`. Incorrect -> `incorrectCount++` (0 negative marks).
  - Score rounded to 2 decimal places: `parseFloat(score.toFixed(2))`.
  - Passes result to `onFinishTest()` which records in `localStorage['gate_ag_user_stats']` and displays `TestResultModal.jsx`.

#### Formula Sheet (`src/components/FormulaSheet.jsx`, 261 lines & `MathRenderer.jsx`, 173 lines)
- **Data**: Reads 41 formulas across 5 categories from `src/data/formulas.js`.
- **Dual View Modes**: Detailed 3D Cards (`viewMode === 'cards'`) vs. Compact Responsive Table (`viewMode === 'table'`).
- **Search & Filtering**: Live real-time search matching title, explanation, or topic name, combined with section category dropdown.
- **Math Rendering (`MathRenderer.jsx`)**:
  - Direct integration with `katex` package (`import katex from 'katex'`).
  - Converts display math (`\[ ... \]`, `$$ ... $$`) and inline math (`\( ... \)`, `$ ... $`) using `katex.renderToString()`.
  - Pre-processes engineering units (e.g. `m 3 / s` -> `m³/s`, `deg C` -> `°C`, `kN m -2` -> `kN/m²`).
  - Parses and renders Markdown tables.

### 1.4 State of PWA & Offline Readiness
- **Manifest**: No `manifest.json` or `manifest.webmanifest` exists in `public/` or anywhere in the workspace. No `<link rel="manifest">` in `index.html`.
- **Service Worker**: No `sw.js` or service worker script exists. No `navigator.serviceWorker.register` call in `src/main.jsx`, `src/App.jsx`, or `index.html`.
- **Offline Caching**: Completely absent. Offline load will fail on first load and cannot update or cache runtime assets.
- **External CDN Dependencies**:
  - `index.html` line 12: Google Fonts CDN (`fonts.googleapis.com`, `fonts.gstatic.com`).
  - `index.html` line 14: KaTeX CSS CDN (`cdn.jsdelivr.net`). Note: `index.css` also imports `@import "katex/dist/katex.min.css"`, so local bundling is partially present in Vite output, but CDN links are still present in HTML.
  - Favicon is currently an inline SVG; PWA icons (192x192, 512x512, maskable) are missing.

### 1.5 Dependencies & Build/Test Tooling
- **Build Tooling**: `vite` v6.1.0, `@vitejs/plugin-react` v4.3.4.
  - Executed `npm run build`: Exit code 0, built in 2.88s, generated minified bundles in `dist/`.
- **Test Tooling**:
  - Executed `npm test`: Failed with `npm error Missing script: "test"`.
  - No test framework (`vitest`, `playwright`, `jest`) is listed in `package.json` or installed in `node_modules`.
  - Node environment: `v24.14.0`, npm `11.9.0`.

---

## 2. Logic Chain

1. **PWA Status Reasoning**:
   - *Observation*: Neither `public/manifest.json` nor any service worker file (`sw.js`) exists in the repository; `index.html` lacks manifest links and service worker registration scripts; no caching strategies (CacheStorage, Workbox, or custom fetch handlers) are implemented.
   - *Deduction*: The application is currently a standard single-page React application without Progressive Web App capabilities. It cannot be installed to desktop/mobile home screens or function offline without internet connectivity.
   - *Action Required for R1*: Must create `public/manifest.json` with valid metadata (name, short_name, icons, start_url, display mode, theme/background colors), create a robust service worker `public/sw.js` (or Vite PWA plugin) handling asset precaching and runtime caching (HTML, JS, CSS, JSON datasets, images, fonts), and register it in `index.html`/`src/main.jsx`.

2. **Automated Testing Suite Status Reasoning**:
   - *Observation*: Running `npm test` throws `npm error Missing script: "test"`. No testing library or runner is in `package.json` or `node_modules`.
   - *Deduction*: There are currently zero automated tests covering Practice Mode filtering, CBT Mock Test scoring/timers, or Formula Sheet KaTeX rendering.
   - *Action Required for R2*: Must configure a testing framework (e.g. `vitest` with `@testing-library/react` and `jsdom` or Node test runner) and add `"test": "vitest run"` to `package.json` scripts, writing comprehensive unit and component tests that verify:
     - Practice Mode cascading filters and question state transitions.
     - CBT Mock Test timers, palette state transitions, and precise MCQ / MSQ / NAT scoring algorithms (including negative marking, tolerance range checks, and rounding).
     - Formula Sheet data presence, search filtering, and MathRenderer KaTeX parsing.

3. **Data Integrity & Consistency Reasoning**:
   - *Observation*: `questions.json` has 260 questions, and `mock_papers.json` has 1,421 questions. In `RevisionBank.jsx:47`, text search references `q.questionText`, whereas the JSON schema standard is `q.question`.
   - *Deduction*: When testing and building, verifying field access patterns (`q.question || q.questionText`) ensures robust cross-component compatibility.

---

## 3. Caveats

1. **Static Media Volume**: The `public/` directory contains 1,480 static assets (~30-50MB of PDFs and image snippets). In an offline PWA service worker precache list, precaching all 1,480 images upfront could cause slow initial installation. A cache-first / stale-while-revalidate runtime caching strategy for `/question_snippets/`, `/docx_images/`, and `/question_images/` alongside precaching the core app shell and JSON data is recommended.
2. **KaTeX & Fonts Offline Availability**: While `katex` fonts and CSS are bundled by Vite into `dist/assets/`, `index.html` retains external CDN `<link>` tags for Google Fonts and KaTeX CSS. For 100% offline resilience, CSS should rely on bundled assets and font fallbacks without hard-blocking on CDN requests.
3. **No Prior Test Setup**: Since no testing dependencies currently exist in `package.json`, installing test dependencies (such as `vitest`, `@testing-library/react`, `jsdom`) or leveraging Node 24 native test runner will be required during implementation.

---

## 4. Conclusion

The GATE AG Prep Web Portal is a well-structured, functional React 19 + Tailwind CSS single-page application containing:
1. Complete, high-quality question datasets: 260 curated practice questions and 20 full mock papers (1,421 questions from 2007–2026).
2. Fully developed client-side UI modes: Dashboard, Practice Mode, CBT Mock Test, Formula Sheet, Syllabus Tracker, Revision Bank, Custom Test Creator, and Downloads Hub.
3. Accurate GATE scoring algorithms for MCQ (with negative marking), MSQ (exact multi-match, no negative marks), and NAT (range/tolerance matching, no negative marks).

However, to meet the requirements of `ORIGINAL_REQUEST.md`:
- **R1 (Offline PWA Capability)**: Must implement `manifest.json`, PWA icon assets, a service worker with precaching and runtime caching strategies, and service worker registration.
- **R2 (Automated Test Suite)**: Must establish a test runner (`npm test`), configure the test environment, and write unit/integration tests verifying Practice Mode filtering, CBT Mock Test scoring/timers, and Formula Sheet rendering.

---

## 5. Verification Method

To independently verify these findings:

1. **Verify Project Structure & Dependencies**:
   ```bash
   cat package.json
   ```
   *Expected*: Shows `scripts` missing `"test"`, and runtime dependencies without test packages.

2. **Verify Build Execution**:
   ```bash
   npm run build
   ```
   *Expected*: Vite builds to `dist/` with exit code 0.

3. **Verify Absence of Test Runner**:
   ```bash
   npm test
   ```
   *Expected*: Fails with `npm error Missing script: "test"`.

4. **Verify Absence of Service Worker & Manifest**:
   ```bash
   ls -la public/manifest.json public/sw.js
   ```
   *Expected*: Files do not exist (error: No such file or directory).

5. **Verify Dataset Counts and Schemas**:
   ```bash
   node -e "console.log(JSON.parse(fs.readFileSync('src/data/questions.json')).length, JSON.parse(fs.readFileSync('src/data/mock_papers.json')).length)"
   ```
   *Expected*: Outputs `260 20`.
