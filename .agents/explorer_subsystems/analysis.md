# Deep Architectural & Code Quality Audit: Core Subsystems (Requirement R1)

**Audit Date**: 2026-08-30  
**Target Repository**: GATE Agricultural Engineering (GATE AG) Prep Web Portal  
**Scope**: In-depth adversarial architectural and code quality audit across the 4 primary application subsystems:
1. **Scoring & Evaluation Subsystem** (`src/utils/scoring.js`, `tests/scoring.test.js`, CBT & Practice Evaluators)
2. **AI Academic Suite & Vision OCR** (`src/components/AIDoubtSolverHub.jsx`, `src/services/geminiService.js`, `src/components/AITutorModal.jsx`)
3. **Live Multi-Device Sync & Admin Security** (`src/services/questionSyncService.js`, `src/components/CreatorAdminHQ.jsx`, `src/components/AdminQuestionManager.jsx`)
4. **Offline Persistence Engine** (`src/utils/indexedDB.js`, `src/services/testAttemptService.js`, `public/sw.js`, `src/services/authService.js`)

---

## Executive Summary

| Subsystem | Architectural Health | Code Quality & Maintainability | Critical Risk / Primary Gap |
|---|:---:|:---:|---|
| **1. Scoring & Evaluation Engine** | ⚠️ Moderate | ⚠️ Fragmented (DRY violation) | Absence of central `src/utils/scoring.js`; evaluation logic copy-pasted across 4 components with divergence in MCQ substring matching, NAT float boundaries, and missing negative marks fallback. |
| **2. AI Academic Suite & Vision OCR** | ✅ Robust (Offline fallback) | ⚠️ Moderate | Trivial Base64 key obfuscation; memory bloat from uncompressed Base64 image accumulation in chat state; unstructured conversation history string concatenation in general doubt solver. |
| **3. Live Sync & Admin Security** | ⚠️ Moderate | ⚠️ High Risk | Admin passcode uses weak 32-bit FNV-1a non-cryptographic hash rather than SHA-256; hardcoded plaintext master passcodes in client bundle; no timestamp/LWW conflict resolution on multi-device question broadcasts. |
| **4. Offline Persistence Engine** | ✅ High (PWA 5-tier cache) | ⚠️ Moderate | Missing `edited_questions` object store in `indexedDB.js` causing silent DOMExceptions; conflicting duplicate sync logic in `authService.js` using `.insert()` vs `testAttemptService.js` using `.upsert()`. |

---

## Subsystem 1: Scoring & Evaluation Subsystem

### 1.1 Architectural Mapping & Call Graph
- **Test Baseline**: `tests/scoring.test.js` (lines 8–86), `tests/stress.test.js` (lines 15–100)
- **Component Evaluators**:
  - `src/components/MockTestMode.jsx` (lines 353–407)
  - `src/components/TestResultModal.jsx` (lines 156–180)
  - `src/components/PracticeMode.jsx` (lines 220–250)
  - `src/components/CustomPracticePool.jsx` (lines 188–210)
  - `src/components/Realtime1v1Duel.jsx` (lines 106–136)
  - `src/utils/forensicAnalyzer.js` (lines 35–70)

### 1.2 Identified Strengths
1. **Strict Gate Exam Negative Marking Compliance**: Correctly implements $+1.00 / -0.333$ for 1-mark MCQs, $+2.00 / -0.667$ for 2-mark MCQs, and zero negative deductions for MSQ and NAT types.
2. **MSQ Order Independence**: Set-based comparisons ensure permutations such as `"A, C"` vs `"C, A"` evaluate to identical results.
3. **Division-by-Zero Resilience**: Accuracy calculations guard against zero attempts via `(correctCount + incorrectCount) > 0 ? (correctCount / attemptedCount) * 100 : 0`.
4. **AIR Tier Mapping**: Pure function `getEstimatedPercentile` accurately stratifies scores across Top 10, Top 50, Top 200, Qualifying Cutoff, and Revision tiers.

### 1.3 Anti-Patterns, Divergences & Gaps

#### Issue 1.1 (High): Lack of Centralized Evaluation Engine (DRY Violation & Divergent Logic)
- **Evidence**: There is no `src/utils/scoring.js` module. Every component implements its own inline evaluation routine.
- **Code Discrepancies**:
  1. **MCQ Substring Bug**: In `PracticeMode.jsx` (line 225) and `CustomPracticePool.jsx` (line 192):
     ```javascript
     // PracticeMode.jsx:225 & CustomPracticePool.jsx:192
     isCorrect = userVal.trim().toUpperCase() === correctKey.trim().toUpperCase() || correctKey.toUpperCase().includes(userVal.trim().toUpperCase());
     ```
     *Impact*: If `correctKey` is `"A, B"` or `"AB"`, entering a single letter `"A"` erroneously evaluates as correct due to `.includes()`. In contrast, `MockTestMode.jsx` (line 364) enforces strict exact matching `ans.trim().toUpperCase() === correctKey.trim().toUpperCase()`.
  2. **NAT Tolerance Boundary Inconsistency**:
     - `MockTestMode.jsx` (line 394): `Math.abs(numVal - target) < 0.05` (strict inequality).
     - `PracticeMode.jsx` (line 240): `Math.abs(numVal - target) <= 0.05` (inclusive inequality).
     - `PracticeMode.jsx` (line 237): `numVal >= (min - 0.001) && numVal <= (max + 0.001)` (0.001 epsilon buffer).
     - `MockTestMode.jsx` (line 391): `numVal >= min && numVal <= max` (zero buffer).
     *Impact*: An answer at exact distance `0.05` (e.g. `10.05` for target `10.00`) is marked correct in Practice Mode but marked incorrect in CBT Mock Test Mode.
  3. **MSQ Normalization Tokenization**:
     - `PracticeMode.jsx` (line 228) strips `"and"` and splits on whitespace/commas/semicolons with `.filter(Boolean)`.
     - `MockTestMode.jsx` (line 375) splits only on `,` without `.filter(Boolean)`. A trailing comma (e.g., `"A, B,"`) generates an empty token `";A;B"` and fails evaluation.

#### Issue 1.2 (High): Missing Negative Marks Fallback in `MockTestMode.jsx`
- **Evidence**: In `MockTestMode.jsx` (line 370):
  ```javascript
  // MockTestMode.jsx:370
  if (enableNeg) {
    score -= q.negative_marks;
  }
  ```
- **Risk**: In custom mock papers or dynamically uploaded questions where `negative_marks` property is omitted/undefined, subtracting `undefined` results in `score = NaN`. The entire test score and percentage become `NaN`.
- **Contrast**: `tests/scoring.test.js` (line 37) includes fallback: `(question.negative_marks || (question.marks === 1 ? 1/3 : 2/3))`.

#### Issue 1.3 (Medium): Strict Float Equality in `Realtime1v1Duel.jsx`
- **Evidence**: In `src/components/Realtime1v1Duel.jsx` (line 108):
  ```javascript
  // Realtime1v1Duel.jsx:108
  if (val === q.ans) {
  ```
- **Risk**: Direct `===` float comparison fails on IEEE 754 precision issues (e.g. `0.1 + 0.2 === 0.3`). Numerical questions should use an epsilon tolerance (`Math.abs(val - q.ans) < 1e-4`).

---

## Subsystem 2: AI Academic Suite & Vision OCR

### 2.1 Architectural Mapping & Call Graph
- **Service Layer**: `src/services/geminiService.js` (lines 1–494)
- **UI Components**: `src/components/AIDoubtSolverHub.jsx` (lines 1–786), `src/components/AITutorModal.jsx` (lines 1–300)
- **Test Baseline**: `tests/gemini_ai.test.js` (lines 1–113)

### 2.2 Identified Strengths
1. **3-Tier Model Fallback Matrix**: Dynamically cascades `gemini-2.0-flash` $\rightarrow$ `gemini-1.5-flash` $\rightarrow$ `gemini-1.5-pro`, ensuring high availability if an API tier experiences rate-limiting (HTTP 429) or quota errors.
2. **Comprehensive Offline Knowledge Base**: Detailed LaTeX formulas and physical derivations embedded for key GATE AG domains (Tractor drawbar dynamics, Thiem/Dupuit well hydraulics, Psychrometric mass balances, Manning's open-channel flow, USLE, Tillage soil resistance).
3. **Structured Solver Personas**: Supports 4 distinct academic modes (`rigorous`, `formula_shortcut`, `mistake_checker`, `socratic`) with tailored engineering prompts.
4. **Multimodal Base64 Image Processing**: Directly supports clipboard image paste (`Ctrl+V` / `Cmd+V`) and diagram uploads.

### 2.3 Anti-Patterns, Divergences & Gaps

#### Issue 2.1 (Medium): Trivial API Key Obfuscation (Not Cryptographic Encryption)
- **Evidence**: In `src/services/geminiService.js` (lines 30–36):
  ```javascript
  // geminiService.js:30-36
  function obfuscateKey(rawKey) {
    if (!rawKey) return '';
    try {
      return 'ag_sec_' + btoa(rawKey.split('').reverse().join(''));
    } catch (e) {
      return rawKey;
    }
  }
  ```
- **Risk**: Base64 encoding + string reversal is security-through-obscurity. Any script with access to `localStorage` can reverse this via `atob(stored.slice(7)).split('').reverse().join('')`. (Note: in a purely client-side SPA, true secret storage is impossible without a proxy backend, but documentation should clearly mark this as local obfuscation rather than cryptographic security).

#### Issue 2.2 (Medium): Memory Pressure from Base64 Image Accumulation in Chat State
- **Evidence**: In `src/components/AIDoubtSolverHub.jsx` (lines 284–294):
  ```javascript
  // AIDoubtSolverHub.jsx:284-294
  const newUserMessage = {
    id: userMessageId,
    sender: 'user',
    text: textToQuery || '...',
    image: imagePreview, // Raw full-resolution Base64 data URL
    ...
  };
  setMessages(prev => [...prev, newUserMessage]);
  ```
- **Risk**: When a user captures high-resolution camera photos (3MB–8MB per photo), the raw Base64 string remains in React state (`messages` array) permanently. Over a multi-turn session with 5–10 diagrams, memory consumption exceeds 50MB–100MB of heap, degrading UI responsiveness on low-end mobile devices.

#### Issue 2.3 (Low): Unstructured Multi-Turn Prompting in `solveGeneralDoubt`
- **Evidence**: In `AIDoubtSolverHub.jsx` (lines 304–307):
  ```javascript
  // AIDoubtSolverHub.jsx:304-307
  if (messages.length > 1) {
    const lastFewTurns = messages.slice(-4).map(m => `${m.sender === 'user' ? 'Student' : 'Assistant'}: ${m.text}`).join('\n\n');
    contextualPrompt = `Previous Conversation Context:\n${lastFewTurns}\n\nStudent's New Query:\n${textToQuery}`;
  }
  ```
- **Risk**: History turns are flattened into a single text prompt within a single `user` role rather than utilizing the Gemini API's native multi-turn conversation format (`{ role: 'user' | 'model', parts: [...] }`). This reduces model context comprehension and increases prompt injection vulnerability.

---

## Subsystem 3: Live Multi-Device Sync & Admin Security

### 3.1 Architectural Mapping & Call Graph
- **Service Layer**: `src/services/questionSyncService.js` (lines 1–243)
- **UI Components**: `src/components/CreatorAdminHQ.jsx`, `src/components/AdminQuestionManager.jsx`, `src/App.jsx` (lines 188–212)
- **Test Baseline**: `tests/question_sync_security.test.js`

### 3.2 Identified Strengths
1. **Dual-Tier Realtime Architecture**: Combines zero-latency tab-to-tab `BroadcastChannel` with remote multi-device Supabase Realtime broadcast.
2. **Reactive Question Patching**: `App.jsx` leverages `useMemo` to overlay `editedQuestionsMap` onto practice and mock paper datasets in real time without mutating static JSON bundles.
3. **Session-Scoped Authorization**: Unlocking admin state is stored in `sessionStorage`, automatically terminating access when the browser tab closes.

### 3.3 Anti-Patterns, Divergences & Gaps

#### Issue 3.1 (High): Non-Cryptographic 32-bit FNV-1a Hash for Admin Passcodes
- **Evidence**: In `src/services/questionSyncService.js` (lines 21–29):
  ```javascript
  // questionSyncService.js:21-29
  function computePasscodeHash(str) {
    if (!str) return '';
    let hash = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
      hash ^= str.charCodeAt(i);
      hash = Math.imul(hash, 0x01000193);
    }
    return (hash >>> 0).toString(16);
  }
  ```
- **Risk**: This is a 32-bit non-cryptographic FNV-1a hash producing an 8-character hex digest. The collision space is only $2^{32} \approx 4.29 \times 10^9$, which can be brute-forced or collided within seconds in JavaScript.
- **Requirement Conflict**: Requirement R4 explicitly mandates SHA-256 hash digests for admin passcode comparisons. Notably, `src/services/authService.js` (lines 209–300) already contains a full pure-JS SHA-256 implementation that should be shared.

#### Issue 3.2 (High): Plaintext Master Passcode Exposure in Client Source
- **Evidence**: In `src/services/questionSyncService.js` (lines 32–37):
  ```javascript
  // questionSyncService.js:32-37
  const MASTER_PASSCODE_HASHES = new Set([
    computePasscodeHash('gateag2026'),
    computePasscodeHash('raghav0704'),
    computePasscodeHash('admin2026'),
    computePasscodeHash('gateagadmin')
  ]);
  ```
- **Risk**: Computing the hash of hardcoded plaintext strings at runtime leaves `'gateag2026'`, `'raghav0704'`, `'admin2026'`, `'gateagadmin'` visible in plain text within the compiled client bundle. The source code should store only the pre-computed SHA-256 digests.

#### Issue 3.3 (Medium): Missing Timestamp / LWW (Last-Write-Wins) Conflict Resolution in Sync
- **Evidence**: In `src/App.jsx` (lines 190–197) and `questionSyncService.js` (lines 69–76):
  ```javascript
  // App.jsx:190-197
  const unsubscribe = subscribeToLiveQuestionSync((remoteUpdatedQ) => {
    if (remoteUpdatedQ && remoteUpdatedQ.id) {
      setEditedQuestionsMap(prev => ({
        ...prev,
        [remoteUpdatedQ.id]: remoteUpdatedQ
      }));
    }
  });
  ```
- **Risk**: There is no timestamp comparison (`remoteUpdatedQ.updated_at > prev[id]?.updated_at`). If Device A and Device B both edit question Q1, or if a network reconnect event delivers a delayed message, an older edit can overwrite a newer one.

---

## Subsystem 4: Offline Persistence Engine

### 4.1 Architectural Mapping & Call Graph
- **IndexedDB Engine**: `src/utils/indexedDB.js` (lines 1–200)
- **Sync & Test Storage**: `src/services/testAttemptService.js` (lines 1–247), `src/services/authService.js` (lines 58–75)
- **Service Worker & PWA**: `public/sw.js` (lines 1–265), `src/serviceWorkerRegistration.js`
- **Test Baseline**: `tests/pwa.test.js`, `tests/sync.test.js`

### 4.2 Identified Strengths
1. **5-Tier Service Worker Caching**: Implements dedicated cache stores (`STATIC_CACHE`, `RUNTIME_CACHE`, `IMAGES_CACHE`, `FONTS_CACHE`) with cache-first routing for assets and network-first navigation with offline fallback.
2. **Resilient Precache Lifecycle**: Precache fetches use `Promise.allSettled` with individual asset try-catches, preventing single asset 404s from failing service worker installation.
3. **Idempotent UUID v4 Attempt Tracking**: Every test attempt receives a unique `client_attempt_id`, enabling conflict-free upserting into Supabase `test_attempts`.
4. **Auto-Sync Network Reconnect Engine**: Automatic sync handler bound to `online` and custom `app-online` window events.

### 4.3 Anti-Patterns, Divergences & Gaps

#### Issue 4.1 (Critical Bug): Missing `edited_questions` Object Store in IndexedDB
- **Evidence**: In `src/App.jsx` (line 209):
  ```javascript
  // App.jsx:209
  saveToIDB('edited_questions', updatedQ);
  ```
  However, in `src/utils/indexedDB.js` (lines 31–68), `initDB()` only creates the following stores:
  - `test_attempts`
  - `bookmarks`
  - `flashcards`
  - `chat_messages`
  - `community_posts`
  - `syllabus_progress`
- **Risk & Impact**: `edited_questions` was never registered in `onupgradeneeded`. Consequently, every call to `saveToIDB('edited_questions', ...)` throws a DOMException `NotFoundError: One of the specified object stores was not found` and fails silently.

#### Issue 4.2 (High): Conflicting Duplicate Sync Logic in `authService.js` vs `testAttemptService.js`
- **Evidence**: In `src/services/authService.js` (lines 58–75):
  ```javascript
  // authService.js:67
  const { error } = await supabase.from('test_attempts').insert([cleanAtt]);
  ```
  In contrast, `src/services/testAttemptService.js` (lines 73, 137):
  ```javascript
  // testAttemptService.js:73, 137
  await supabase.from('test_attempts').upsert([dbPayload], { onConflict: 'client_attempt_id' });
  ```
- **Risk**: `authService.syncAllUserDataToBackend()` uses `.insert()` without conflict resolution. If an attempt is already in Supabase, `.insert()` throws a duplicate key error and marks subsequent sync operations as failed. `authService.js` should delegate attempt syncing directly to `syncPendingTestAttempts()`.

#### Issue 4.3 (Medium): Dual-Storage Disconnect (LocalStorage vs IndexedDB for Test Attempts)
- **Evidence**: `testAttemptService.js` reads and writes test attempts solely to `localStorage` (`LOCAL_STORAGE_TEST_ATTEMPTS_KEY`) with a hard cap of 100 items (`localAttempts.slice(0, 100)`). Meanwhile, `indexedDB.js` creates a `test_attempts` store that is only utilized during manual JSON export/import.
- **Risk**: If a user attempts more than 100 mock tests in offline mode, older attempts are permanently truncated from `localStorage` without being preserved in the higher-capacity IndexedDB store.

---

## Synthesis of Subsystem Cross-Cutting Concerns

| Subsystem Focus | Race Conditions / State Sync | Security & Authentication | Error Handling & Offline Fallback | Code Maintainability |
|---|---|---|---|---|
| **Scoring & Evaluation** | None observed | N/A | Missing fallback for `negative_marks` causing `NaN` in mock tests. | Severe duplication across 4 components; inconsistent NAT/MCQ logic. |
| **AI Academic Suite** | Concurrent fetch requests handled by model fallback loop. | Plaintext API key obfuscation in localStorage. | Excellent LaTeX offline domain fallback derivations. | Chat state holds uncompressed Base64 image strings. |
| **Live Sync & Admin HQ** | LWW race condition: no timestamp check on incoming WebSocket updates. | 32-bit FNV-1a hash + hardcoded plaintext passcodes in source. | Graceful fallback to LocalStorage map when Supabase unconfigured. | Good component modularity in Admin HQ. |
| **Offline Persistence** | Duplicate sync in `authService` conflicts with `testAttemptService`. | RLS required on backend tables for client broadcast safety. | `edited_questions` store missing from IndexedDB schema. | LocalStorage and IndexedDB attempt stores out of sync. |

---

## Actionable Recommendations & Code Changes

### Priority 1: Unify Scoring Engine into `src/utils/scoring.js`
Extract all evaluation logic (`evaluateQuestion`, `computeMockTestScore`, `getEstimatedPercentile`) into a dedicated module `src/utils/scoring.js` and import it into `MockTestMode.jsx`, `TestResultModal.jsx`, `PracticeMode.jsx`, `CustomPracticePool.jsx`, and `tests/scoring.test.js`. Ensure consistent NAT tolerance ($\le 0.05$ and $0.001$ epsilon), strict MCQ matching, and safe `negative_marks` fallbacks.

### Priority 2: Upgrade Admin Passcode Hashing to SHA-256
Replace the FNV-1a hash in `questionSyncService.js` with SHA-256 digests (importing `sha256Pure` from `authService.js` or a shared `crypto.js` utility) and replace hardcoded plaintext passcodes with pre-computed SHA-256 hex constants.

### Priority 3: Add `edited_questions` Store to `indexedDB.js`
Update `indexedDB.js` to increment `DB_VERSION` to 2 and add `edited_questions` object store with `keyPath: 'id'` in `onupgradeneeded`.

### Priority 4: Reconcile Test Attempt Sync in `authService.js`
Remove duplicate `.insert()` code from `authService.js` and call `syncPendingTestAttempts()` from `testAttemptService.js`.
