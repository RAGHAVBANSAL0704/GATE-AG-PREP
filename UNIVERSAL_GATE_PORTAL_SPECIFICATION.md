# Universal GATE Examination Portal Architecture & Replication Specification
> **Portable Master Blueprint**: A complete guide to replicating the GATE Web Portal architecture for any other GATE engineering stream (CS, ME, CE, EE, EC, CH, BT, DA, IN, etc.).

---

## 1. System Philosophy & Architecture

This portal is built as an **offline-first, zero-dependency-runtime Single Page Application (SPA) & Progressive Web App (PWA)** designed to replicate the official GATE Computer-Based Test (CBT) environment while providing comprehensive self-study tools.

### Core Technology Stack
- **Framework**: React 19 (Hooks, Suspense, Concurrent Mode).
- **Bundler & Tooling**: Vite 6 (ESM, dynamic chunk code-splitting with `lazyWithRetry`).
- **Styling**: Tailwind CSS v3.4 (Strict 2-Theme System: `light` and `dark`).
- **Math & Typography**: KaTeX (`katex.min.js` + CSS) for LaTeX formula typesetting, Lucide React icons, Canvas Confetti.
- **Persistence & Offline Hierarchy**:
  1. Service Worker 5-tier caching engine (`sw.js`).
  2. IndexedDB (`gate_portal_db`) for deep offline attempt storage.
  3. LocalStorage for offline queueing and lightweight telemetry state.
  4. Remote Cloud Database (Supabase PostgreSQL + Realtime Channels).
- **Automated Verification**: Native Node.js Test Runner (`node --test tests/**/*.test.js`) requiring 100% pass on all test suites before deployment.

---

## 2. Universal GATE Exam Pattern Invariants

Every official GATE paper adheres to the following structural invariants:

| Metric | Official Value | Implementation Rule |
| :--- | :--- | :--- |
| **Duration** | **180 Minutes (3 Hours)** | Absolute wall-clock target timestamp comparison with `visibilitychange` recovery. |
| **Total Questions** | **65 Questions** | Validated strict length constraint. |
| **Total Marks** | **100.00 Marks** | Sum of question marks strictly equals 100.00. |
| **Section 1: General Aptitude (GA)** | **Q1 to Q10 (15 Marks)** | **Q1–Q5**: 1 Mark each; **Q6–Q10**: 2 Marks each. Identical across all GATE streams. |
| **Section 2: Technical Stream** | **Q11 to Q65 (85 Marks)** | **Q11–Q35**: 1 Mark each (25M); **Q36–Q65**: 2 Marks each (60M). |
| **MCQ 1-Mark** | $+1.00$ correct, $-1/3$ wrong | Zero if unattempted. |
| **MCQ 2-Mark** | $+2.00$ correct, $-2/3$ wrong | Zero if unattempted. |
| **MSQ (1M & 2M)** | Full marks (+1 or +2) ONLY for exact set match | **Strictly NO partial credit, NO negative marking**. |
| **NAT (1M & 2M)** | Full marks if within scalar $\pm \text{tol}$ or interval | **Strictly NO negative marking**. Non-numeric = 0. |

---

## 3. Standardized Data Schemas

### A. Question Schema (Used in `questions.json`, `custom_mock_*.json`, `question_bank/`)

```json
{
  "id": "GATE_STREAM_YEAR_QXX",
  "year": 2024,
  "question_number": 15,
  "type": "MCQ",
  "marks": 1,
  "negative_marks": 0.33,
  "section": "Core Technical Section Name",
  "topic": "Topic Name",
  "subtopic": "Subtopic Name",
  "question": "Problem text with mathematical formulas formatted in LaTeX like $E = mc^2$ or $\\int_0^\\infty f(x)\\,dx$.",
  "options": [
    "A) First option with $LaTeX$",
    "B) Second option",
    "C) Third option",
    "D) Fourth option"
  ],
  "correct_answer": "A",
  "solution": "Step-by-step mathematical proof and explanation with derivations:\n$$\\sigma = \\frac{P}{A}$$\nHence, option **(A)** is correct.",
  "difficulty": "Medium",
  "hints": [
    "Conceptual principle hint.",
    "Formula hint.",
    "Calculation roadmap hint."
  ],
  "image_url": null
}
```

#### MSQ Variations:
```json
{
  "type": "MSQ",
  "marks": 2,
  "negative_marks": 0,
  "correct_answer": "A, C",
  "correct_options": ["A", "C"]
}
```

#### NAT Variations:
```json
{
  "type": "NAT",
  "marks": 2,
  "negative_marks": 0,
  "options": [],
  "correct_answer": "45.50",
  "nat_range": [45.00, 46.00],
  "tolerance": 0.05
}
```

---

### B. Mock Paper Container Schema (`src/data/mock_papers.json` & `custom_mock_XXXX.json`)

```json
{
  "id": "mock_stream_2027_01",
  "title": "GATE CS 2027 All India Grand Mock Test 01",
  "exam_code": "CS",
  "total_marks": 100,
  "duration_minutes": 180,
  "total_questions": 65,
  "is_official": false,
  "year": 2027,
  "organizing_institute": "Antigravity Academic Council",
  "sections_breakdown": {
    "GA": 10,
    "Technical": 55
  },
  "questions": [
    /* Array of 65 Question Objects matching Question Schema */
  ]
}
```

---

### C. Syllabus Taxonomy Schema (`src/data/syllabus.js`)

```javascript
export const GATE_STREAM_SYLLABUS = [
  {
    id: "sec_ga",
    section: "General Aptitude",
    shortCode: "GA",
    totalWeightage: 15,
    icon: "Brain",
    themeColor: "amber",
    subtopics: [
      { id: "ga_verbal", name: "Verbal Ability", avgWeightage: 5 },
      { id: "ga_numerical", name: "Quantitative Ability", avgWeightage: 5 },
      { id: "ga_analytical", name: "Analytical & Spatial Reasoning", avgWeightage: 5 }
    ]
  },
  {
    id: "sec_core_1",
    section: "Core Stream Section 1",
    shortCode: "SEC1",
    totalWeightage: 25,
    icon: "Layers",
    themeColor: "blue",
    subtopics: [
      { id: "sub_1_1", name: "Subtopic 1", avgWeightage: 8 },
      { id: "sub_1_2", name: "Subtopic 2", avgWeightage: 9 },
      { id: "sub_1_3", name: "Subtopic 3", avgWeightage: 8 }
    ]
  }
];
```

---

### D. Formula Sheet Schema (`src/data/formulas.js`)

```javascript
export const STREAM_FORMULAS = [
  {
    id: "form_01",
    category: "Mechanics",
    sectionCode: "MECH",
    title: "Formula Title",
    latex: "\\sigma = \\frac{M y}{I}",
    variables: [
      { symbol: "M", meaning: "Bending Moment (N·m)" },
      { symbol: "y", meaning: "Distance from neutral axis (m)" },
      { symbol: "I", meaning: "Second Moment of Area (m^4)" }
    ],
    applicationTip: "Maximum stress occurs at extreme fibers ($y = c$).",
    searchTokens: ["bending stress", "flexure", "beam moment"]
  }
];
```

---

## 4. Key Subsystem Implementation Blueprints

### A. CBT Mock Test Engine & State Recovery
- **Palette State Invariants**: `NOT_VISITED`, `NOT_ANSWERED`, `ANSWERED`, `MARKED`, `ANSWERED_MARKED`.
- **Wall-Clock Timer Mechanism**:
  ```javascript
  const targetEndTimeRef = useRef(Date.now() + remainingSeconds * 1000);
  
  useEffect(() => {
    const syncRemainingTime = () => {
      const diffMs = targetEndTimeRef.current - Date.now();
      const leftSec = Math.max(0, Math.round(diffMs / 1000));
      setTimeLeft(leftSec);
      if (leftSec <= 0) autoSubmitTest();
    };

    const interval = setInterval(syncRemainingTime, 1000);
    const handleVisibility = () => {
      if (!document.hidden) syncRemainingTime();
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);
  ```
- **Crash Recovery**: Save test responses and palette state to `localStorage.setItem('active_cbt_session', JSON.stringify(...))` throttled on answer changes and 10s intervals.

### B. Universal GATE Scoring Engine (`src/utils/scoring.js`)
```javascript
export function evaluateQuestion(question, studentAnswer) {
  const marks = Number(question.marks) || 1;
  const qType = (question.type || 'MCQ').toUpperCase();
  
  if (studentAnswer === null || studentAnswer === undefined || studentAnswer === '') {
    return { isCorrect: false, marksAwarded: 0, status: 'unattempted' };
  }

  if (qType === 'MCQ') {
    const isCorrect = String(studentAnswer).trim().toUpperCase() === String(question.correct_answer).trim().toUpperCase();
    const penalty = marks === 1 ? -1 / 3 : -2 / 3;
    return {
      isCorrect,
      marksAwarded: isCorrect ? marks : penalty,
      status: isCorrect ? 'correct' : 'incorrect'
    };
  }

  if (qType === 'MSQ') {
    const studentTokens = Array.isArray(studentAnswer) 
      ? studentAnswer 
      : String(studentAnswer).split(/[,; ]+/).filter(Boolean);
    const correctTokens = Array.isArray(question.correct_options) 
      ? question.correct_options 
      : String(question.correct_answer).split(/[,; ]+/).filter(Boolean);
    
    const setA = new Set(studentTokens.map(s => s.trim().toUpperCase()));
    const setB = new Set(correctTokens.map(s => s.trim().toUpperCase()));
    
    const isExactMatch = setA.size === setB.size && [...setA].every(val => setB.has(val));
    return {
      isCorrect: isExactMatch,
      marksAwarded: isExactMatch ? marks : 0, // Strictly NO negative
      status: isExactMatch ? 'correct' : 'incorrect'
    };
  }

  if (qType === 'NAT') {
    const parsedVal = parseFloat(studentAnswer);
    if (isNaN(parsedVal)) return { isCorrect: false, marksAwarded: 0, status: 'invalid' };

    let isCorrect = false;
    if (Array.isArray(question.nat_range) && question.nat_range.length === 2) {
      const [minR, maxR] = question.nat_range.map(Number);
      isCorrect = parsedVal >= (minR - 1e-9) && parsedVal <= (maxR + 1e-9);
    } else {
      const correctVal = parseFloat(question.correct_answer);
      const tolerance = parseFloat(question.tolerance ?? 0.05);
      isCorrect = Math.abs(parsedVal - correctVal) <= (tolerance + 1e-9);
    }

    return {
      isCorrect,
      marksAwarded: isCorrect ? marks : 0, // Strictly NO negative
      status: isCorrect ? 'correct' : 'incorrect'
    };
  }

  return { isCorrect: false, marksAwarded: 0, status: 'unknown' };
}
```

### C. Zero-Binary Dynamic PDF Generator (`questionPdfExportService.js`)
- Do **not** store static binary PDF files in `public/downloads/`.
- Parse question JSON dynamically.
- Render LaTeX expressions to HTML using `katex.renderToString(mathStr, { throwOnError: false })`.
- Injected Print CSS:
  ```css
  @media print {
    body { font-size: 11pt; color: #000; background: #fff; }
    .question-card { break-inside: avoid; page-break-inside: avoid; margin-bottom: 18pt; }
    .no-print { display: none !important; }
    .page-break { page-break-after: always; }
  }
  ```
- Trigger clean print dialog via hidden `iframe.contentWindow.print()`.

---

## 5. Automated DOCX Mock Test Extraction Pipeline

Store master mock tests as standardized 66-row Word (`.docx`) tables with columns:
`[Q.No | Marks | Type | Section | Question Text | Options | Key | Detailed Solution]`

Use this script (`scripts/extract_docx_mock.js`) to extract to clean JSON:

```javascript
import fs from 'fs';
import mammoth from 'mammoth';

export async function extractDocxToMockJson(docxPath, outputJsonPath, metadata) {
  const result = await mammoth.convertToHtml({ path: docxPath });
  const html = result.value;
  const rowMatches = [...html.matchAll(/<tr>(.*?)<\/tr>/gs)];

  if (rowMatches.length < 66) {
    throw new Error(`Expected 66 rows in master table, got ${rowMatches.length}`);
  }

  const questions = [];
  for (let i = 1; i <= 65; i++) {
    const cells = [...rowMatches[i][1].matchAll(/<td[^>]*>(.*?)<\/td>/gs)].map(m =>
      m[1].replace(/<[^>]+>/g, '').trim()
    );

    const qNum = parseInt(cells[0], 10) || i;
    const marks = parseInt(cells[1], 10) || (i <= 5 || (i >= 11 && i <= 35) ? 1 : 2);
    const type = (cells[2] || 'MCQ').toUpperCase();
    const section = cells[3] || (i <= 10 ? 'General Aptitude' : 'Technical');
    const questionText = cells[4];
    const rawOptions = cells[5];
    const key = cells[6];
    const solution = cells[7] || '';

    let options = [];
    if (type !== 'NAT' && rawOptions) {
      options = rawOptions.split(/(?=[A-D]\))/g).map(s => s.trim()).filter(Boolean);
    }

    questions.push({
      id: `${metadata.prefix}_Q${String(qNum).padStart(2, '0')}`,
      question_number: qNum,
      type,
      marks,
      negative_marks: type === 'MCQ' ? (marks === 1 ? 0.33 : 0.67) : 0,
      section,
      question: questionText,
      options,
      correct_answer: key,
      solution,
      difficulty: marks === 1 ? 'Medium' : 'Hard'
    });
  }

  const output = {
    id: metadata.id,
    title: metadata.title,
    exam_code: metadata.examCode,
    total_marks: 100,
    duration_minutes: 180,
    total_questions: 65,
    is_official: false,
    questions
  };

  fs.writeFileSync(outputJsonPath, JSON.stringify(output, null, 2), 'utf-8');
  console.log(`Exported: ${outputJsonPath}`);
}
```

---

## 6. Catalog of Solved Engineering Pitfalls (Must Read Before Replication)

1. **Vite Dynamic Chunk Loading 404s**:
   - *Problem*: In an SPA, when deploying a new version to production, Vite generates new chunk filenames. Active users visiting a new route request the old chunk which is now a 404, causing white screens.
   - *Fix*: Wrap dynamic imports in `lazyWithRetry()` with `sessionStorage` reload guards.
2. **Background Tab Timer Throttling**:
   - *Problem*: `setInterval(..., 1000)` freezes or slows down when browser tabs are backgrounded.
   - *Fix*: Always track `targetEndTime = Date.now() + remainingSeconds * 1000` and resync via `document.addEventListener('visibilitychange', ...)` and `Date.now()`.
3. **NAT Floating-Point Precision Flaws**:
   - *Problem*: Standard JS floating-point arithmetic ($0.1 + 0.2 \neq 0.3$) marks correct student answers wrong.
   - *Fix*: Use `Math.abs(val - key) <= tolerance + 1e-9`.
4. **KaTeX Crash on Unescaped Characters**:
   - *Problem*: Unescaped LaTeX backslashes (`\frac`) in JSON strings get eaten by JavaScript string parsers.
   - *Fix*: Store double backslashes (`\\frac`) in JSON files and wrap rendering in React ErrorBoundaries with raw text fallbacks.
5. **Static Binary Storage Bloat**:
   - *Problem*: Pre-compiled PDF/DOCX files bloat git repos and risk copyright complaints.
   - *Fix*: Keep all papers strictly as JSON in `src/data/` and render dynamic A4 PDFs in the browser using HTML5 + KaTeX + Print CSS.
6. **Multi-User Mistake Vault Collision**:
   - *Problem*: On shared machines, logout doesn't isolate mistake vaults if stored under a single global key.
   - *Fix*: Key all storage partitions by student ID: `gate_mistake_vault_${studentId}`.

---

## 7. Automated Test Suite Template (`tests/domain_compliance.test.js`)

Run natively using `node --test tests/**/*.test.js`:

```javascript
import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateQuestion } from '../src/utils/scoring.js';
import mockPapers from '../src/data/mock_papers.json' with { type: 'json' };

test('Mock Paper Verification: 65 Qs, 100 Marks, 10 GA / 55 Tech', () => {
  mockPapers.forEach(paper => {
    assert.strictEqual(paper.questions.length, 65, `${paper.id} must have 65 Qs`);
    let totalMarks = 0;
    let gaMarks = 0;
    let techMarks = 0;

    paper.questions.forEach((q, idx) => {
      assert.strictEqual(q.question_number, idx + 1);
      assert.ok(['MCQ', 'MSQ', 'NAT'].includes(q.type));
      totalMarks += q.marks;
      if (idx < 10) {
        gaMarks += q.marks;
        assert.strictEqual(q.section, 'General Aptitude');
      } else {
        techMarks += q.marks;
      }
    });

    assert.strictEqual(gaMarks, 15, `GA marks must be 15 in ${paper.id}`);
    assert.strictEqual(techMarks, 85, `Technical marks must be 85 in ${paper.id}`);
    assert.strictEqual(totalMarks, 100, `Total marks must be 100 in ${paper.id}`);
  });
});
```

---

## 8. Summary Replication Checklist

1. [ ] Clone this repository to new repository (e.g. `GATE-CS-PREP`).
2. [ ] Replace `src/data/questions.json` with domain PYQs (2007–2026).
3. [ ] Replace `src/data/syllabus.js` with official stream syllabus sections and subtopics.
4. [ ] Replace `src/data/formulas.js` with domain-specific equations.
5. [ ] Run `node scripts/extract_docx_mock.js` to populate `custom_mock_2027_01.json` through `30.json`.
6. [ ] Update branding in `public/manifest.webmanifest`, `index.html`, and `src/components/Navbar.jsx`.
7. [ ] Run `npm test` (all tests must pass with exit code 0).
8. [ ] Run `npm run build` and deploy to Netlify/Vercel/Cloudflare Pages.
