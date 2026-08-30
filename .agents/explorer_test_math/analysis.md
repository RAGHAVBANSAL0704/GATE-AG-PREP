# Comprehensive Audit: Test Suite & Mathematical Robustness (Requirement R2)

**Audit Date**: 2026-08-30  
**Scope**: Unit test suite (`tests/**/*.test.js`), Mathematical robustness of scoring engines, NAT epsilon tolerances, MSQ evaluation rules, Negative marking toggles, Offline queue synchronization and idempotent deduplication (`src/services/testAttemptService.js`, `src/utils/indexedDB.js`).

---

## Executive Summary

A comprehensive investigation was conducted across all 17 test files and 64 suites in `tests/`, along with the underlying evaluation implementations in `MockTestMode.jsx`, `PracticeMode.jsx`, `TestResultModal.jsx`, `forensicAnalyzer.js`, and `testAttemptService.js`.

- **Test Suite Execution**: `npm test` (`node --test tests/**/*.test.js`) successfully executes **274 tests across 64 suites with 100% pass rate (0 failures, 0 skips, exit code 0)** in ~176ms.
- **Documentation Drift**: `PROJECT_CONTEXT.md` references 264 tests (historical count from 2026-08-28), whereas 274 tests are currently active in the test runner.
- **Mathematical Edge Defect in NAT Epsilon**: IEEE-754 binary floating-point representation causes exact boundary inputs (e.g. `14.55` for key `14.50`) to evaluate to `0.05000000000000071`. Because `scoring.test.js`, `MockTestMode.jsx`, and `TestResultModal.jsx` use strict inequality `Math.abs(numVal - target) < 0.05` instead of an epsilon-padded tolerance `Math.abs(numVal - target) <= 0.05 + 1e-7`, exact endpoints within the ±0.05 band are rejected.
- **Scoring Engine Code Duplication**: Pure evaluation logic is replicated in four separate files (`tests/scoring.test.js`, `MockTestMode.jsx`, `TestResultModal.jsx`, and `PracticeMode.jsx`) with slight implementation divergence rather than centralized in `src/utils/scoring.js`.
- **MSQ Evaluation & Negative Marking**: Strict zero-partial-credit and 0 negative deduction rules are enforced across all suites. An edge case bug was identified in `scoring.test.js` where falsy `negative_marks: 0` falls back to `2/3` due to `||` instead of `??`.
- **Offline Persistence & Sync Idempotency**: `testAttemptService.js` exhibits solid offline resilience, atomic queueing, 100-item FIFO cap, and UUID-based idempotent deduplication for both local storage and Supabase remote synchronization.

---

## 1. Test Suite Completeness & Execution Audit

### 1.1 Test Suite Breakdown (274 Tests Across 17 Files)

| Test File | Tests Passed | Suites | Key Coverage Areas |
|-----------|:------------:|:------:|-------------------|
| `tests/adversarial_challenger_1.test.js` | 14 | 4 | SHA-256 preimage/collision resistance, MathRenderer XSS disarming, offline sync concurrency & 100-cap |
| `tests/auth.test.js` | 5 | 1 | Username sign-up validation, DOB parsing, password verification |
| `tests/concepts.test.js` | 2 | 1 | Important concepts dataset schema and formula associations |
| `tests/custom_mocks.test.js` | 54 | 1 | 18 Custom Mock papers (65 Qs each, 100 marks, GA vs Tech balance) |
| `tests/dataset.test.js` | 13 | 5 | 1324 practice questions integrity, 20 PYQ papers (2007–2026), formula LaTeX validity |
| `tests/feedback.test.js` | 2 | 1 | WhatsApp issue reporter URL generation & parameter encoding |
| `tests/forensic.test.js` | 1 | 1 | Marks loss diagnosis, negative deduction tracking, NAT scale factor errors |
| `tests/gemini_ai.test.js` | 5 | 1 | Gemini API key storage, offline fallback hints, OCR prompt structuring |
| `tests/profanityFilter.test.js` | 5 | 1 | English and Hinglish profanity detection, asterisk sanitization |
| `tests/pwa.test.js` | 16 | 6 | Web App Manifest, 5-tier Service Worker caching, offline fallback |
| `tests/question_sync_security.test.js` | 5 | 1 | Live question sync, admin passcode verification, session unlock |
| `tests/schema.test.js` | 18 | 7 | Data schemas for questions, mock papers, flashcards, user stats |
| `tests/scoring.test.js` | 31 | 6 | MCQ (+1/+2, -1/3, -2/3), MSQ (exact match, order, delimiters), NAT (scalar, interval), AIR tiers |
| `tests/security.test.js` | 27 | 6 | Zero source secrets, input sanitization, passcode hashing, localStorage protection |
| `tests/stress.test.js` | 45 | 12 | Float epsilon ($0.1 + 0.2$), negative numbers, scientific notation, negative marking toggle, 0/0 accuracy |
| `tests/sync.test.js` | 13 | 6 | Client UUID generation, offline queueing, idempotent upsert, merged student history |
| `tests/workflows.test.js` | 18 | 4 | Practice mode cascading filters, CBT state transitions, 180m timer countdown, Formula search |
| **TOTAL** | **274** | **64** | **100% Pass (0 Fail, 0 Skip, 0 Todo) in 176ms** |

### 1.2 Documentation Discrepancy Note
`PROJECT_CONTEXT.md` (lines 15 and 117) states:
> `npm test` runs **264 tests across 62 suites (100% passing, exit code 0)**.

**Fact**: The test suite has 274 passing tests across 64 suites. The documentation in `PROJECT_CONTEXT.md` needs to be updated to reflect the 274 test count.

---

## 2. Mathematical Robustness Evaluation

### 2.1 Floating-Point Epsilon Tolerances in NAT Intervals (Requirement 2a)

#### Direct Observations
1. **In `tests/scoring.test.js` (lines 60–71)**:
   ```javascript
   if (question.type === 'NAT') {
     const numVal = parseFloat(userAnsStr);
     if (!isNaN(numVal)) {
       if (correctKey.includes(' to ')) {
         const [minStr, maxStr] = correctKey.split(' to ');
         const min = parseFloat(minStr);
         const max = parseFloat(maxStr);
         isCorrect = numVal >= min && numVal <= max;
       } else {
         const target = parseFloat(correctKey);
         isCorrect = Math.abs(numVal - target) < 0.05;
       }
     }
     ...
   }
   ```
2. **In `src/components/MockTestMode.jsx` (lines 385–396)**:
   ```javascript
   } else if (q.type === 'NAT') {
     const numVal = parseFloat(ans);
     if (!isNaN(numVal)) {
       if (correctKey.includes(' to ')) {
         const [minStr, maxStr] = correctKey.split(' to ');
         const min = parseFloat(minStr);
         const max = parseFloat(maxStr);
         isCorrect = numVal >= min && numVal <= max;
       } else {
         const target = parseFloat(correctKey);
         isCorrect = Math.abs(numVal - target) < 0.05;
       }
     }
   ...
   ```
3. **In `src/components/PracticeMode.jsx` (lines 230–243)**:
   ```javascript
   } else if (currentQ.type === 'NAT') {
     const numVal = parseFloat(userVal);
     if (!isNaN(numVal)) {
       if (correctKey.includes(' to ')) {
         const [minStr, maxStr] = correctKey.split(' to ');
         const min = parseFloat(minStr);
         const max = parseFloat(maxStr);
         isCorrect = numVal >= (min - 0.001) && numVal <= (max + 0.001);
       } else {
         const target = parseFloat(correctKey);
         isCorrect = !isNaN(target) && Math.abs(numVal - target) <= 0.05;
       }
     }
   }
   ```
4. **In `src/utils/forensicAnalyzer.js` (lines 67–85)**:
   ```javascript
   } else if (qType === 'NAT') {
     const uVal = parseFloat(String(uAns).trim());
     if (!isNaN(uVal)) {
       if (q.answer_min !== undefined && q.answer_max !== undefined) {
         isCorrect = uVal >= Number(q.answer_min) && uVal <= Number(q.answer_max);
       } else if (correctAnsStr.toLowerCase().includes(' to ')) {
         const parts = correctAnsStr.toLowerCase().split(' to ');
         const min = parseFloat(parts[0]);
         const max = parseFloat(parts[1]);
         if (!isNaN(min) && !isNaN(max)) {
           isCorrect = uVal >= min && uVal <= max;
         }
       } else {
         const cVal = parseFloat(correctAnsStr);
         const tol = Number(q.tolerance || 0.05);
         isCorrect = Math.abs(uVal - cVal) <= tol;
       }
     }
   }
   ```

#### Mathematical Vulnerability Analysis
- **IEEE-754 Floating-Point Precision Issue**: In JavaScript:
  ```javascript
  14.55 - 14.50 === 0.05000000000000071; // Not 0.05
  14.50 - 14.45 === 0.05000000000000071; // Not 0.05
  ```
  When evaluated with `Math.abs(numVal - target) < 0.05`:
  - `Math.abs(14.55 - 14.50) < 0.05` evaluates to `false`.
  - `Math.abs(14.45 - 14.50) < 0.05` evaluates to `false`.
  - Even with `<= 0.05`: `0.05000000000000071 <= 0.05` evaluates to `false`!
- **Impact on GATE Aspirants**: Official GATE AG answer keys specify numerical answer tolerances as closed intervals $[T - 0.05, T + 0.05]$. When an aspirant inputs the exact upper or lower boundary $14.55$ or $14.45$, the evaluation engine awards 0 marks.
- **Why Existing Tests Passed**: `tests/stress.test.js` tested `14.549` and `14.551`, which tested points just inside and outside the boundary, but omitted testing the exact boundary point `14.550` or `14.450`.
- **Solution**: The comparison should use `Math.abs(numVal - target) <= 0.05 + 1e-7` or `(Math.abs(numVal - target) - 0.05) <= 1e-7`.

---

### 2.2 Multiple Select Question (MSQ) Evaluation (Requirement 2b)

#### Direct Observations
1. **In `tests/scoring.test.js` (lines 47–57)**:
   ```javascript
   if (question.type === 'MSQ') {
     const userSorted = userAnsStr.split(',').map(s => s.trim().toUpperCase()).filter(Boolean).sort().join(';');
     const keySorted = correctKey.replace(/,/g, ';').split(';').map(s => s.trim().toUpperCase()).filter(Boolean).sort().join(';');
     isCorrect = userSorted === keySorted && userSorted.length > 0;
     return {
       isAttempted: true,
       isCorrect,
       marksAwarded: isCorrect ? question.marks : 0, // MSQ has NO negative marking
       status: isCorrect ? 'CORRECT' : 'INCORRECT'
     };
   }
   ```
2. **In `src/components/MockTestMode.jsx` (lines 374–384)**:
   ```javascript
   } else if (q.type === 'MSQ') {
     const userSorted = ans.split(',').map(s => s.trim().toUpperCase()).sort().join(';');
     const keySorted = correctKey.replace(/,/g, ';').split(';').map(s => s.trim().toUpperCase()).sort().join(';');
     isCorrect = userSorted === keySorted;
     if (isCorrect) {
       score += q.marks;
       correctCount++;
     } else {
       incorrectCount++;
     }
   }
   ```

#### Analysis & Findings
- **Order Independence**: Verified across all modules via `.sort().join(';')`. `"C, A"` matches key `"A, C"`.
- **Case Insensitivity**: Verified via `.toUpperCase()`. `"a, c"` matches `"A, C"`.
- **Strict Zero Partial Credit**: Tested in `scoring.test.js` and `stress.test.js`. Selecting `'A'` for key `'A, C'` awards 0 marks. Selecting `'A, C, D'` awards 0 marks.
- **Zero Negative Marking**: MSQ incorrect answers award 0 marks and deduct strictly 0 marks.
- **Implementation Discrepancy**: In `MockTestMode.jsx` line 375, `ans.split(',')` does not call `.filter(Boolean)`. If `ans` contains a trailing comma (e.g. `'A, C,'`), `userSorted` becomes `';A;C'`, causing a false mismatch against `keySorted` (`'A;C'`). `scoring.test.js` includes `.filter(Boolean)` on line 48.

---

### 2.3 Negative Marking Deduction Math & Toggle Flags (Requirement 2c)

#### Direct Observations
1. **Deductions by Question Type**:
   - **1-Mark MCQ**: $+1.00$ correct, $-\frac{1}{3} \approx -0.3333333333333333$ incorrect, $0.00$ unattempted.
   - **2-Mark MCQ**: $+2.00$ correct, $-\frac{2}{3} \approx -0.6666666666666666$ incorrect, $0.00$ unattempted.
   - **MSQ (1 or 2 Marks)**: $+M$ correct, $0.00$ incorrect/partial, strictly $0.00$ negative deduction.
   - **NAT (1 or 2 Marks)**: $+M$ correct, $0.00$ incorrect, strictly $0.00$ negative deduction.
2. **Toggle Flag Behavior**:
   - `enable_negative_marking !== false`: Standard deductions applied.
   - `enable_negative_marking: false`: Negative marking is disabled across all questions. Wrong MCQ responses award $0.00$ marks without penalty. Total score cannot become negative.
3. **Dataset Verification**:
   - Audit across all 1324 practice questions and 20 mock papers confirmed 100% of questions have `negative_marks` populated.
   - All NAT and MSQ questions have `negative_marks: 0`.
   - MCQs have `negative_marks: 0.3333333333333333` or `0.6666666666666666`, except `GATE_2010_Q51` which has `negative_marks: 0` (Common Data Linked Question).
4. **Falsy Zero Bug in `tests/scoring.test.js` (line 37)**:
   ```javascript
   const deduction = enableNegativeMarking ? (question.negative_marks || (question.marks === 1 ? 1/3 : 2/3)) : 0;
   ```
   Because `0` is falsy in JavaScript, `question.negative_marks || ...` evaluates `0 || (2/3) === 2/3`. For `GATE_2010_Q51` (a 2-mark MCQ with explicit `negative_marks: 0`), `evaluateQuestion` would incorrectly deduct 2/3 marks!
   In `MockTestMode.jsx` line 370: `score -= q.negative_marks`, which subtracts `0` correctly.
   **Fix**: Use `question.negative_marks !== undefined ? question.negative_marks : ...` or nullish coalescing `(question.negative_marks ?? (question.marks === 1 ? 1/3 : 2/3))`.

---

### 2.4 Offline Persistence Engine & Idempotent Sync (Requirement 2d)

#### Direct Observations in `src/services/testAttemptService.js`
1. **UUID Generation (`generateUUID()`, lines 8–13)**:
   Uses Web Crypto `crypto.randomUUID()` with fallback to timestamp-prefixed random alphanumeric string.
2. **Local Storage Atomic Queue (`saveTestAttempt()`, lines 18–63)**:
   - Sets `client_attempt_id` if missing.
   - Normalizes all numeric metrics (`score`, `total_marks`, `percentage`, `accuracy_percentage`, `correct_count`, `incorrect_count`, `unattempted_count`, `time_spent_seconds`).
   - Sets `_syncedToBackend: false`.
   - Performs idempotent upsert: if record with `client_attempt_id` already exists in `gate_ag_prep_test_attempts`, it updates the entry in place; otherwise unshifts to index 0.
   - Caps local storage queue at 100 entries via `.slice(0, 100)` to prevent browser quota exceptions.
3. **Idempotent Remote Sync (`syncPendingTestAttempts()`, lines 111–160)**:
   - Iterates through pending local attempts where `!att._syncedToBackend`.
   - Upserts to Supabase `test_attempts` table with `{ onConflict: 'client_attempt_id' }`.
   - Upon successful upsert, updates `att._syncedToBackend = true` in local storage.
4. **Student History Query & Deduplication (`getStudentTestAttempts()`, lines 165–226)**:
   - Queries Supabase by admission number, email, or student name.
   - Reads local storage attempts and filters for student identifier.
   - Merges results into a `Map` keyed by `client_attempt_id || (submitted_at + '_' + paper_title)`.
   - Sorts results descending by `submitted_at`.
5. **Network Auto-Sync (`initAutoSyncOnReconnect()`, lines 231–246)**:
   - Binds to `'online'` and `'app-online'` window events.
   - Returns unbind listener cleanup function.

#### Observations in `src/utils/indexedDB.js`
- Provides `initDB()` configuring 6 stores: `test_attempts`, `bookmarks`, `flashcards`, `chat_messages`, `community_posts`, `syllabus_progress`.
- Provides `exportFullDataJSON()` and `importFullDataJSON()`.
- **Gap Identified**: While `testAttemptService.js` has comprehensive unit tests in `tests/sync.test.js` and `tests/adversarial_challenger_1.test.js`, `src/utils/indexedDB.js` currently has **0 unit test coverage** in `tests/`.

---

## 3. Architecture & Code Quality Findings

### 3.1 Scoring Engine Logic Duplication
The pure question evaluation algorithm is copy-pasted across four different files:
1. `tests/scoring.test.js` (lines 8–86)
2. `src/components/MockTestMode.jsx` (lines 357–404)
3. `src/components/TestResultModal.jsx` (lines 157–180)
4. `src/components/PracticeMode.jsx` (lines 220–244)

Each implementation has subtle variations:
- `PracticeMode.jsx` adds `±0.001` margin to range intervals and `<= 0.05` for scalar NAT.
- `MockTestMode.jsx` and `scoring.test.js` use `< 0.05` without epsilon padding.
- `MockTestMode.jsx` omits `.filter(Boolean)` on MSQ splitting.
- `scoring.test.js` has `||` instead of `??` for `negative_marks: 0`.

**Architectural Recommendation**: Extract a unified, pure `evaluateQuestion()` and `computeMockTestScore()` module in `src/utils/scoring.js`. Export it and import it in `MockTestMode.jsx`, `PracticeMode.jsx`, `TestResultModal.jsx`, and `tests/scoring.test.js`.

---

## 4. Itemized Defect & Gap Matrix

| ID | Category | Severity | Description | Target File & Lines |
|---|---|---|---|---|
| **D1** | Mathematical Robustness | **Medium** | NAT scalar tolerance uses strict `< 0.05` without float epsilon, rejecting exact boundary inputs (e.g. 14.55 vs 14.50) due to IEEE-754 precision (`0.05000000000000071`). | `tests/scoring.test.js`:69, `MockTestMode.jsx`:394, `TestResultModal.jsx`:175 |
| **D2** | Mathematical Robustness | **Low** | Falsy zero evaluation bug: `(question.negative_marks \|\| (question.marks === 1 ? 1/3 : 2/3))` causes `negative_marks: 0` MCQs to deduct 2/3 marks. | `tests/scoring.test.js`:37 |
| **D3** | Edge-Case Parsing | **Low** | MSQ input parsing in `MockTestMode.jsx` lacks `.filter(Boolean)`, causing trailing commas to produce mismatched key strings. | `src/components/MockTestMode.jsx`:375, `TestResultModal.jsx`:165 |
| **D4** | Code Duplication | **Medium** | Scoring logic replicated across 4 files (`MockTestMode.jsx`, `PracticeMode.jsx`, `TestResultModal.jsx`, `scoring.test.js`) with divergent edge-case implementations. | Multiple components |
| **D5** | Test Suite Coverage | **Low** | `src/utils/indexedDB.js` (6 stores and backup import/export) has 0 unit tests in `tests/`. | `src/utils/indexedDB.js` |
| **D6** | Documentation Drift | **Informational** | `PROJECT_CONTEXT.md` reports 264 tests, but test runner executes 274 tests. | `PROJECT_CONTEXT.md`:15,117 |

---

## 5. Concrete Proposed Code Improvements

### Proposal 1: Unified, Robust `src/utils/scoring.js`

```javascript
/**
 * Canonical Scoring & Evaluation Engine for GATE AG Prep Web Portal
 */

export const EPSILON = 1e-7;
export const NAT_DEFAULT_TOLERANCE = 0.05;

/**
 * Evaluate single question response with mathematical precision
 */
export function evaluateQuestion({ question, userAnswer, state, enableNegativeMarking = true }) {
  const isSubmitted = (state === 'ANSWERED' || state === 'ANSWERED_MARKED') &&
                      userAnswer !== undefined &&
                      userAnswer !== null &&
                      String(userAnswer).trim() !== '';

  if (!isSubmitted) {
    return {
      isAttempted: false,
      isCorrect: false,
      marksAwarded: 0,
      status: 'UNATTEMPTED'
    };
  }

  const correctKey = String(question.correct_answer !== undefined ? question.correct_answer : (question.answer || '')).trim();
  const userAnsStr = String(userAnswer).trim();
  let isCorrect = false;

  // 1. MCQ Evaluation
  if (question.type === 'MCQ') {
    isCorrect = userAnsStr.toUpperCase() === correctKey.toUpperCase();
    if (isCorrect) {
      return {
        isAttempted: true,
        isCorrect: true,
        marksAwarded: Number(question.marks || 1),
        status: 'CORRECT'
      };
    } else {
      const defaultDeduction = (question.marks === 1 || question.marks === '1') ? (1 / 3) : (2 / 3);
      const configuredDeduction = question.negative_marks !== undefined ? Number(question.negative_marks) : defaultDeduction;
      const deduction = enableNegativeMarking ? configuredDeduction : 0;
      return {
        isAttempted: true,
        isCorrect: false,
        marksAwarded: deduction === 0 ? 0 : -deduction,
        status: 'INCORRECT'
      };
    }
  }

  // 2. MSQ Evaluation
  if (question.type === 'MSQ') {
    const userSorted = userAnsStr
      .split(/[,;\s]+/)
      .filter(Boolean)
      .map(s => s.trim().toUpperCase())
      .sort()
      .join(';');

    const keySorted = correctKey
      .replace(/,/g, ';')
      .replace(/and/gi, ';')
      .split(/[,;\s]+/)
      .filter(Boolean)
      .map(s => s.trim().toUpperCase())
      .sort()
      .join(';');

    isCorrect = userSorted === keySorted && userSorted.length > 0;
    return {
      isAttempted: true,
      isCorrect,
      marksAwarded: isCorrect ? Number(question.marks || 2) : 0, // Strict zero partial credit & 0 negative penalty
      status: isCorrect ? 'CORRECT' : 'INCORRECT'
    };
  }

  // 3. NAT Evaluation
  if (question.type === 'NAT') {
    const numVal = parseFloat(userAnsStr);
    if (!isNaN(numVal)) {
      if (correctKey.toLowerCase().includes(' to ')) {
        const [minStr, maxStr] = correctKey.toLowerCase().split(' to ');
        const min = parseFloat(minStr);
        const max = parseFloat(maxStr);
        if (!isNaN(min) && !isNaN(max)) {
          isCorrect = (numVal >= min - EPSILON) && (numVal <= max + EPSILON);
        }
      } else {
        const target = parseFloat(correctKey);
        if (!isNaN(target)) {
          const tol = question.tolerance !== undefined ? Number(question.tolerance) : NAT_DEFAULT_TOLERANCE;
          isCorrect = Math.abs(numVal - target) <= (tol + EPSILON);
        }
      }
    }
    return {
      isAttempted: true,
      isCorrect,
      marksAwarded: isCorrect ? Number(question.marks || 1) : 0, // Strict zero negative penalty
      status: isCorrect ? 'CORRECT' : 'INCORRECT'
    };
  }

  return {
    isAttempted: false,
    isCorrect: false,
    marksAwarded: 0,
    status: 'UNKNOWN'
  };
}
```

---

## Conclusion
The GATE AG Prep test suite is functional, fast, and passes 274/274 tests with 100% success. Incorporating the float epsilon fix and consolidating the scoring engine into `src/utils/scoring.js` will eliminate subtle edge-case discrepancies across CBT and practice modes.
