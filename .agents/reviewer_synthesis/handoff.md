# Reviewer Synthesis Handoff Report

- **Subagent**: `reviewer_synthesis`
- **Milestone**: `master_audit_synthesis`
- **Date**: 2026-08-30T15:05:45+05:30
- **Type**: Hard Handoff (Task Complete)

---

## 1. Observation

1. **Test Suite Execution**:
   - Command: `npm test` (`node --test tests/**/*.test.js`)
   - Verbatim Result:
     ```
     ℹ tests 274
     ℹ suites 64
     ℹ pass 274
     ℹ fail 0
     ℹ cancelled 0
     ℹ skipped 0
     ℹ todo 0
     ℹ duration_ms 169.324
     ```
   - Exit code: 0 across all 17 test files and 64 suites.

2. **Production Build Execution**:
   - Command: `npm run build` (`vite build`)
   - Verbatim Result:
     ```
     ✓ 1721 modules transformed.
     rendering chunks...
     computing gzip size...
     ✓ built in 2.09s
     ```
   - Output: 26 JavaScript chunk assets, 1 CSS bundle (137 kB / 24.8 kB gzip), 60 KaTeX web font files, and HTML entry point.
   - Rollup warning: `(!) Some chunks are larger than 1500 kB after minification.` specifically for the 3 offline datasets: `dataset-custom-mocks` (1,613.55 kB), `dataset-pyq-mocks` (1,546.29 kB), and `dataset-questions-archive` (1,533.16 kB).

3. **Plaintext Master Passcodes & FNV-1a Hash**:
   - File: `src/services/questionSyncService.js` (lines 21–37)
   - Code:
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

     const MASTER_PASSCODE_HASHES = new Set([
       computePasscodeHash('gateag2026'),
       computePasscodeHash('raghav0704'),
       computePasscodeHash('admin2026'),
       computePasscodeHash('gateagadmin')
     ]);
     ```
   - Observed: Plaintext strings `'gateag2026'`, `'raghav0704'`, `'admin2026'`, `'gateagadmin'` are compiled into the client bundle; 32-bit FNV-1a hash is non-cryptographic and has a small $2^{32}$ collision space.

4. **Missing Central Scoring Module & Substring MCQ Bug**:
   - File: `src/components/PracticeMode.jsx` (line 225) & `src/components/CustomPracticePool.jsx` (line 192)
   - Code: `isCorrect = userVal.trim().toUpperCase() === correctKey.trim().toUpperCase() || correctKey.toUpperCase().includes(userVal.trim().toUpperCase());`
   - Observed: Multi-option keys like `"A, B"` allow single letter `"A"` to evaluate as correct.
   - File: `src/components/MockTestMode.jsx` (lines 353–407) vs `tests/scoring.test.js` (lines 8–86) vs `TestResultModal.jsx` (lines 156–180): duplicate inline scoring implementations with subtle divergence in NAT float boundaries and MSQ splitting.

5. **Missing `edited_questions` Object Store in IndexedDB**:
   - File: `src/App.jsx` (line 209): `saveToIDB('edited_questions', updatedQ);`
   - File: `src/utils/indexedDB.js` (lines 31–68): `initDB()` registers only `test_attempts`, `bookmarks`, `flashcards`, `chat_messages`, `community_posts`, and `syllabus_progress`.
   - Observed: Writing to `edited_questions` throws a silent `NotFoundError` DOMException.

6. **Conflicting Test Attempt Sync**:
   - File: `src/services/authService.js` (line 67): `supabase.from('test_attempts').insert([cleanAtt])` throws duplicate key error on existing attempts.
   - File: `src/services/testAttemptService.js` (lines 73, 137): `supabase.from('test_attempts').upsert([dbPayload], { onConflict: 'client_attempt_id' })` handles conflicts properly.

7. **NAT Floating-Point Boundary & Epsilon Tolerance**:
   - In IEEE-754: `14.55 - 14.50 = 0.05000000000000071`.
   - Strict inequality `Math.abs(numVal - target) < 0.05` in `MockTestMode.jsx:394` rejects exact boundary inputs ($14.55$ and $14.45$) for target $14.50$.

8. **Gemini API Key Transmission**:
   - File: `src/services/geminiService.js` (line 96): `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}` transmits key in URL query parameter.

---

## 2. Logic Chain

1. **From Observation 1 & 2 to Baseline Quality Assessment**:
   - The test suite of 274 unit tests passes with 100% success and exit code 0.
   - Production compilation via Vite produces valid bundles without syntax, import, or circular dependency errors.
   - No mock stubs or hardcoded cheats were discovered; the implementation is authentic.

2. **From Observation 3 to [HIGH-01] Finding**:
   - Computing hashes from string literals in client code bundles the plaintext strings into `dist/assets/index-*.js`.
   - FNV-1a is a non-cryptographic polynomial hash with $2^{32}$ states, violating Requirement R4 which requires SHA-256.
   - Pre-computing SHA-256 hex digests and removing the plaintext seeds eliminates client-side exposure.

3. **From Observation 4 to [HIGH-02] Finding**:
   - Duplicating question evaluation across `MockTestMode`, `PracticeMode`, `CustomPracticePool`, and `TestResultModal` violates the DRY principle and introduced a bug where `.includes()` allows partial MCQ guesses in Practice Mode.
   - Centralizing all logic into `src/utils/scoring.js` guarantees uniform evaluation across all modes and tests.

4. **From Observation 5 to [HIGH-03] Finding**:
   - When `App.jsx` calls `saveToIDB('edited_questions', ...)`, IndexedDB attempts to open a transaction on an unregistered store.
   - Incrementing `DB_VERSION` to 2 and adding `edited_questions` in `onupgradeneeded` resolves the failure.

5. **From Observation 6 to [HIGH-04] Finding**:
   - `authService.syncAllUserDataToBackend` uses `.insert()` which fails on existing records with duplicate primary keys.
   - Refactoring `authService.js` to call `syncPendingTestAttempts()` from `testAttemptService.js` uses idempotent upserting.

6. **From Observation 7 to [MED-01] Finding**:
   - IEEE-754 binary arithmetic introduces rounding residues ($\approx 7.1 \times 10^{-17}$) on decimal subtractions like $14.55 - 14.50$.
   - Adding a small epsilon $10^{-7}$ ensures closed interval inclusion $[T - 0.05, T + 0.05]$ matching official GATE AG evaluation criteria.

7. **From Observation 8 to [MED-03] Finding**:
   - URL query parameters are logged by proxies, browser history, and network traces.
   - Switching to the `x-goog-api-key` HTTP header shields the key from URI exposure.

---

## 3. Caveats

1. In a purely client-side Single Page Application without a dedicated backend reverse proxy, any API key entered by the user in `localStorage` is vulnerable to extraction via physical access or client-side XSS. The current Base64 reversal in `geminiService.js` serves as basic obfuscation, not cryptographic encryption.
2. In Supabase deployments, ensure Row Level Security (RLS) policies are active on `test_attempts`, `students`, and `community_posts` tables to prevent unauthorized read/write access via client tokens.
3. No further caveats.

---

## 4. Conclusion

- **Overall Integrity Assessment**: The GATE AG Prep Web Portal is an authentic, feature-complete, high-performance offline-first PWA with passing unit tests (274/274) and clean production compilation.
- **Deliverables Completed**:
  - Saved Master Audit Report to `/Users/raghav/Desktop/GATE AG PREP WEB/AUDIT_REPORT.md` and `.agents/reviewer_synthesis/master_audit_report.md`.
  - Itemized 4 High Severity, 5 Medium Severity, 5 Low Severity, and 5 Informational Strength items.
  - Provided exact Unified Diffs for all High and Medium findings.
  - Provided independent verification instructions for test suite, production build, and float math edge cases.

---

## 5. Verification Method

To independently verify the audit conclusions and artifacts:

1. **Verify Master Audit Report Artifacts**:
   ```bash
   test -f "/Users/raghav/Desktop/GATE AG PREP WEB/AUDIT_REPORT.md" && echo "AUDIT_REPORT.md exists"
   test -f "/Users/raghav/Desktop/GATE AG PREP WEB/.agents/reviewer_synthesis/master_audit_report.md" && echo "master_audit_report.md exists"
   ```

2. **Verify Test Suite**:
   ```bash
   npm test
   ```
   *Expected*: 274 passed, 0 failed, 64 suites, exit code 0.

3. **Verify Production Build**:
   ```bash
   npm run build
   ```
   *Expected*: Exit code 0, 1,721 modules transformed into `dist/`.

4. **Verify Float Epsilon Boundary Invalidation Condition**:
   - Condition: If `Math.abs(14.55 - 14.50) < 0.05` evaluates to `true`, the premise of IEEE-754 inaccuracy would be invalidated.
   - Verification: In Node.js, `Math.abs(14.55 - 14.50) < 0.05` evaluates to `false` due to `0.05000000000000071`.
