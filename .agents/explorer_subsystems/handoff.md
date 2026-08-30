# Handoff Report: Subsystems Architectural & Code Quality Audit (R1)

## 1. Observation

### Observation 1.1: Missing Central `src/utils/scoring.js` & Component Code Duplication
- **File Search Result**: No file exists at path `src/utils/scoring.js`.
- **Duplication Locations**:
  - `src/components/MockTestMode.jsx:353-407`: Inline implementation of MCQ, MSQ, and NAT scoring.
  - `src/components/TestResultModal.jsx:156-180`: Inline filtering and evaluation for review mode.
  - `src/components/PracticeMode.jsx:220-250`: Inline evaluation routine for practice questions.
  - `src/components/CustomPracticePool.jsx:188-210`: Inline evaluation routine for custom pool.
  - `tests/scoring.test.js:8-86`: Standalone pure evaluation functions `evaluateQuestion` and `computeMockTestScore`.
- **Verbatim Code Discrepancies**:
  - `PracticeMode.jsx:225` & `CustomPracticePool.jsx:192`:
    ```javascript
    isCorrect = userVal.trim().toUpperCase() === correctKey.trim().toUpperCase() || correctKey.toUpperCase().includes(userVal.trim().toUpperCase());
    ```
    Matches any substring of `correctKey`.
  - `MockTestMode.jsx:364`:
    ```javascript
    isCorrect = ans.trim().toUpperCase() === correctKey.trim().toUpperCase();
    ```
    Requires exact match.
  - `MockTestMode.jsx:370`:
    ```javascript
    if (enableNeg) {
      score -= q.negative_marks;
    }
    ```
    If `q.negative_marks` is `undefined`, evaluates to `score -= undefined` $\rightarrow$ `score = NaN`.

### Observation 1.2: AI Academic Suite & Vision OCR
- **API Key Obfuscation in `src/services/geminiService.js:33`**:
  ```javascript
  return 'ag_sec_' + btoa(rawKey.split('').reverse().join(''));
  ```
  Uses string reversal and Base64 encoding.
- **Multimodal State in `src/components/AIDoubtSolverHub.jsx:289`**:
  Stores full-resolution Base64 data URLs in React state array (`messages`), keeping all past images in heap memory.
- **Model Fallback Chain in `src/services/geminiService.js:91`**:
  Defines `models = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-pro']` with fallback on error.

### Observation 1.3: Admin Passcode Hashing & Live Sync
- **Passcode Hash in `src/services/questionSyncService.js:21-29`**:
  ```javascript
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
  Uses 32-bit FNV-1a non-cryptographic hash resulting in an 8-character hex string.
- **Hardcoded Plaintext Passcodes in `src/services/questionSyncService.js:33-36`**:
  Passcodes `'gateag2026'`, `'raghav0704'`, `'admin2026'`, `'gateagadmin'` are present in plaintext in source code.
- **SHA-256 Implementation in `src/services/authService.js:209-300`**:
  `authService.js` contains a complete 256-bit pure-JS SHA-256 implementation `sha256Pure` with salt.

### Observation 1.4: IndexedDB Object Store Omission & Dual Sync Divergence
- **Object Store Registration in `src/utils/indexedDB.js:31-68`**:
  `initDB()` creates object stores: `test_attempts`, `bookmarks`, `flashcards`, `chat_messages`, `community_posts`, `syllabus_progress`. The store `edited_questions` is omitted.
- **Store Invocation in `src/App.jsx:209`**:
  `saveToIDB('edited_questions', updatedQ);` throws a DOMException `NotFoundError` because the object store does not exist.
- **Conflicting Sync Logic in `src/services/authService.js:67`**:
  `supabase.from('test_attempts').insert([cleanAtt])` vs `testAttemptService.js:73` `supabase.from('test_attempts').upsert([dbPayload], { onConflict: 'client_attempt_id' })`.

### Observation 1.5: Test Suite Execution
- Running `npm test` executes `node --test tests/**/*.test.js`.
- Output: 274 passing tests across 64 test suites (0 failures, exit code 0).

---

## 2. Logic Chain

1. **Premise 1**: Duplicate implementations of mathematical evaluation across UI components lead to logic drift unless backed by a single source of truth.
   - *Evidence from Obs 1.1*: `PracticeMode` uses substring inclusion (`correctKey.includes(...)`) and inclusive tolerance (`<= 0.05`), while `MockTestMode` uses exact equality and strict tolerance (`< 0.05`). Furthermore, `MockTestMode` lacks a fallback for missing `negative_marks`, causing `NaN` scores on custom questions.
   - *Inference*: A centralized `src/utils/scoring.js` module must be established and imported across all evaluation sites to guarantee uniform grading.

2. **Premise 2**: Cryptographic operations for admin access must resist brute-force and collision attacks.
   - *Evidence from Obs 1.3*: `questionSyncService.js` uses a 32-bit FNV-1a hash with hardcoded plaintext passcodes in source code, whereas Requirement R4 mandates SHA-256.
   - *Inference*: `computePasscodeHash` must be upgraded to SHA-256 using `sha256Pure` and plaintext strings replaced with pre-computed SHA-256 constants.

3. **Premise 3**: Unhandled IndexedDB store accesses cause runtime exceptions in storage transactions.
   - *Evidence from Obs 1.4*: `App.jsx` writes to `edited_questions` via `saveToIDB`, but `indexedDB.js` never created this object store during database initialization.
   - *Inference*: `indexedDB.js` requires an updated schema definition adding `edited_questions`.

4. **Premise 4**: Redundant backend sync implementations with differing conflict strategies create race conditions and unhandled rejection errors.
   - *Evidence from Obs 1.4*: `authService.js` attempts raw `.insert()` on test attempts while `testAttemptService.js` uses `.upsert()` with `onConflict`.
   - *Inference*: `authService.js` must delegate test attempt synchronization to `testAttemptService.js`.

---

## 3. Caveats

- **No Caveats on Local Codebase Scope**: All 4 subsystems, services, components, and test files were completely inspected via direct file viewing and grep searches.
- **Client-Side Secret Limitations**: In a purely client-side Single Page Application without a dedicated backend reverse proxy, any client-side API key storage (even with obfuscation) is technically readable by in-browser scripts. True secret management requires a serverless proxy endpoint if user-provided keys are not used.

---

## 4. Conclusion

The GATE AG Prep Web Portal exhibits high architectural quality in its PWA 5-tier caching, comprehensive 274-test suite, and rich offline domain knowledge fallbacks. However, the audit identified 4 critical areas requiring remediation:
1. **Scoring Subsystem**: Establish `src/utils/scoring.js` to eliminate code duplication and fix the `NaN` negative marks bug and substring match discrepancy.
2. **Security & Passcode Management**: Upgrade `questionSyncService.js` admin passcode validation from 32-bit FNV-1a to SHA-256, and remove plaintext passcodes from the client bundle.
3. **IndexedDB Persistence**: Add the missing `edited_questions` object store to `src/utils/indexedDB.js`.
4. **Data Sync Architecture**: Eliminate the conflicting `.insert()` sync code in `authService.js` in favor of `testAttemptService.js` idempotent upserts.

---

## 5. Verification Method

To independently verify all findings:

1. **Verify Unit Test Suite Execution**:
   ```bash
   npm test
   ```
   *Expected Result*: Runs 274 unit tests across 64 suites with 0 failures and exit code 0.

2. **Verify Missing `scoring.js`**:
   ```bash
   ls src/utils/scoring.js
   ```
   *Expected Result*: Returns `No such file or directory`.

3. **Verify IndexedDB Missing Object Store**:
   Inspect `src/utils/indexedDB.js:31-68` and confirm `edited_questions` is absent from `db.createObjectStore` declarations.

4. **Verify Passcode Hashing Algorithm**:
   Inspect `src/services/questionSyncService.js:21-29` and confirm FNV-1a implementation (`0x811c9dc5` and `0x01000193`).

5. **Verify Production Build Integrity**:
   ```bash
   npm run build
   ```
   *Expected Result*: Compiles cleanly with exit code 0 into `dist/`.
