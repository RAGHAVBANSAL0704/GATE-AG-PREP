# Forensic Integrity & Security Audit Report

**Work Product**: GATE Agricultural Engineering (AG) Prep Web Portal  
**Project Root**: `/Users/raghav/Desktop/GATE AG PREP WEB`  
**Auditor Archetype**: Forensic Integrity Auditor  
**Integrity Mode**: `development` (per `ORIGINAL_REQUEST.md`)  
**Audit Timestamp**: 2026-08-30T09:30:53Z  
**Verdict**: **CLEAN (Authentic Implementation) with Security & Data Integrity Findings**

---

## Executive Summary

A comprehensive forensic integrity audit was conducted across the GATE AG Prep Web Portal repository. The investigation covered:
1. **Source Code & Test Suite Integrity**: Verification of genuine logic vs. hardcoded test cheats or facade implementations.
2. **Security Integrity & Access Control**: Verification of admin passcode authentication in `questionSyncService.js` and `CreatorAdminHQ.jsx` (evaluating FNV-1a vs SHA-256 and hardcoded plaintext credentials).
3. **API Key & Secrets Management**: Verification of Gemini API key storage and network transmission in `geminiService.js`.
4. **Client-Side Data Integrity & Storage**: Analysis of IndexedDB vs LocalStorage persistence and backup export/restore consistency across `indexedDB.js` and `testAttemptService.js`.
5. **Input Sanitization & XSS Defenses**: Examination of KaTeX math parsing in `MathRenderer.jsx`, user-generated content in `AIDoubtSolverHub.jsx` and `CommunityChatHub.jsx`, and dynamic evaluation in `ScientificCalculator.jsx`.

---

## Phase 1: Mode-Agnostic Forensic Investigation

| Check Category | Target Module(s) | Verification Command / Tool | Status | Empirical Findings |
|---|---|---|---|---|
| **Test Suite Execution** | `tests/**/*.test.js` | `npm test` (`node --test`) | **PASS** | 274 / 274 unit tests pass across 64 suites with exit code 0 in 221ms. |
| **Production Build** | `src/`, `vite.config.js` | `npm run build` (`vite build`) | **PASS** | 1,721 modules transformed, compiled into clean `dist/` bundle in 2.10s. |
| **Facade & Cheat Detection** | `src/utils/`, `tests/` | Source AST & Grep Inspection | **PASS** | No hardcoded `return true` stubs, facade mocks, or dummy verification bypasses found. |
| **Admin Passcode Security** | `questionSyncService.js`, `CreatorAdminHQ.jsx` | Static Code Review | **VIOLATION (Security)** | Master passcodes embedded in plaintext; 32-bit FNV-1a hash used instead of salted SHA-256. |
| **API Key Network Transmission** | `geminiService.js` | Static Code Review | **WARNING (Security)** | API key passed in URL query parameter `?key=` rather than HTTP header `x-goog-api-key`. |
| **Client Storage & Backup Sync** | `indexedDB.js`, `testAttemptService.js` | Data Flow Analysis | **DEFECT (Data Integrity)** | `exportFullDataJSON()` misses test attempts stored in `gate_ag_prep_test_attempts`. |
| **XSS & HTML Injection** | `MathRenderer.jsx`, `CommunityChatHub.jsx` | Regex & Sanitizer Audit | **PASS (Robust)** | `escapeHtml` + KaTeX isolation prevents XSS; `profanityFilter` blocks malicious tags & payloads. |
| **Dynamic Code Execution** | `ScientificCalculator.jsx` | Static Code Review | **LOW RISK (Code Quality)** | Uses `Function()` for calculator evaluation; currently shielded by keypad input constraints. |

---

## Phase 2: Mode-Specific Flagging & Detailed Evidence

### 1. Source Code & Test Suite Integrity (Mode: Development) — [CLEAN]
- **Observation**:
  - `npm test` executes 274 tests across 64 test suites with 0 failures, 0 skipped, 0 cancelled.
  - Test suites in `tests/` (`scoring.test.js`, `stress.test.js`, `sync.test.js`, `workflows.test.js`, `forensic.test.js`, `dataset.test.js`) test mathematical boundary conditions:
    - Floating-point epsilon tolerances in NAT questions ($\pm 0.05$).
    - MSQ whitespace, delimiter normalization, case insensitivity, and zero partial credit.
    - Negative marking toggle deduction calculations ($1/3$ and $2/3$ marks).
    - 0/0 division handling in accuracy metrics.
- **Evidence**:
  ```
  ℹ tests 274
  ℹ suites 64
  ℹ pass 274
  ℹ fail 0
  ℹ cancelled 0
  ℹ skipped 0
  ℹ todo 0
  ℹ duration_ms 221.520875
  ```
- **Verdict**: **CLEAN**. Genuine algorithms and datasets are in place.

---

### 2. Admin Passcode Security in `questionSyncService.js` & `CreatorAdminHQ.jsx` — [SECURITY VIOLATION]

#### Vulnerability Description:
1. **Plaintext Passcode Exposure in Client Code**:
   In `src/services/questionSyncService.js` (lines 31–37):
   ```javascript
   // Pre-computed hashes for master passcodes (gateag2026, raghav0704, admin2026)
   const MASTER_PASSCODE_HASHES = new Set([
     computePasscodeHash('gateag2026'),
     computePasscodeHash('raghav0704'),
     computePasscodeHash('admin2026'),
     computePasscodeHash('gateagadmin')
   ]);
   ```
   The master passcodes (`'gateag2026'`, `'raghav0704'`, `'admin2026'`, `'gateagadmin'`) are hardcoded as string literals directly in the client bundle. Any user opening Chrome DevTools can read the plain strings in the source file or compiled bundle.

2. **Non-Cryptographic FNV-1a Hash**:
   In `src/services/questionSyncService.js` (lines 21–29):
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
   This implements a 32-bit Fowler–Noll–Vo (FNV-1a) hash algorithm. FNV-1a is intended for hash tables and non-cryptographic checksums; it has only a $2^{32}$ space, has no cryptographic collision resistance, and is vulnerable to trivial brute-force collisions. This violates the project requirement R4 ("Validate that admin passcode comparisons use SHA-256 hash digests rather than plaintext strings").

#### Recommended Remediation:
- Replace `computePasscodeHash` with pre-computed SHA-256 hexadecimal digests (or `hashPasswordSync` from `authService.js`).
- Store only the SHA-256 hash digests in `MASTER_PASSCODE_HASHES` without the plaintext seeds.
- Example:
  ```javascript
  // Pre-computed SHA-256 digests (salted or standard SHA-256)
  const MASTER_PASSCODE_HASHES = new Set([
    'a3f8...', // sha256 of master 1
    'b4c9...'  // sha256 of master 2
  ]);
  ```

---

### 3. Gemini API Key Handling in `geminiService.js` — [SECURITY WARNING]

#### Observations:
1. **Client-Side Obfuscation**:
   In `src/services/geminiService.js` (lines 30–50):
   ```javascript
   function obfuscateKey(rawKey) {
     if (!rawKey) return '';
     try {
       return 'ag_sec_' + btoa(rawKey.split('').reverse().join(''));
     } catch (e) {
       return rawKey;
     }
   }
   ```
   This provides basic obfuscation to prevent casual plaintext inspection in `localStorage`, but is trivially reversible. (Acceptable for client-only SPA architecture where the user brings their own key).

2. **Query Parameter Leakage**:
   In `src/services/geminiService.js` (line 96):
   ```javascript
   const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
   ```
   Passing the API key in the URL query string exposes the key in HTTP request logs, browser history, network proxy logs, and Referer headers.

#### Recommended Remediation:
Pass the API key via the official `x-goog-api-key` request header:
```javascript
const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
const response = await fetch(endpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-goog-api-key': apiKey
  },
  body: JSON.stringify(payload)
});
```

---

### 4. Client-Side Data Integrity & IndexedDB Sync — [DATA INTEGRITY DEFECT]

#### Observations:
1. **Storage Disconnect in Backup Export**:
   In `src/utils/indexedDB.js` (lines 129–158):
   ```javascript
   export async function exportFullDataJSON() {
     const attempts = await getAllFromIDB('test_attempts');
     ...
     const exportData = {
       ...
       testHistory: attempts.length > 0 ? attempts : (localStats.testHistory || []),
       ...
     };
   }
   ```
   In `src/services/testAttemptService.js` (line 59):
   ```javascript
   localStorage.setItem(LOCAL_STORAGE_TEST_ATTEMPTS_KEY, JSON.stringify(localAttempts.slice(0, 100)));
   // LOCAL_STORAGE_TEST_ATTEMPTS_KEY = 'gate_ag_prep_test_attempts'
   ```
   `saveTestAttempt()` writes test attempts to `localStorage['gate_ag_prep_test_attempts']` (and Supabase `test_attempts` table), but never writes to IndexedDB `'test_attempts'` store.
   `exportFullDataJSON()` reads from IndexedDB and `localStats.testHistory`, but fails to inspect `localStorage['gate_ag_prep_test_attempts']`. As a result, exported JSON backups omit local test attempts (`testHistory: []`).

2. **Restore Desynchronization**:
   In `src/utils/indexedDB.js` (lines 183–187), `importFullDataJSON()` saves imported test history into IndexedDB `'test_attempts'`, but `getStudentTestAttempts()` in `testAttemptService.js` only queries `localStorage['gate_ag_prep_test_attempts']`. Imported test attempts are never displayed in the student's test history.

#### Recommended Remediation:
- Update `saveTestAttempt()` to also persist attempts to IndexedDB store `'test_attempts'`.
- Update `exportFullDataJSON()` to read from both IndexedDB `'test_attempts'` and `localStorage['gate_ag_prep_test_attempts']`.
- Update `importFullDataJSON()` to sync imported records into `localStorage['gate_ag_prep_test_attempts']`.

---

### 5. XSS Defense & Input Sanitization — [CLEAN / LOW RISK]

#### Observations:
1. **`MathRenderer.jsx`**:
   - `escapeHtml()` escapes `&`, `<`, `>`, `"`, `'` across all non-KaTeX content before injecting markdown bold/code tags.
   - KaTeX rendering uses `throwOnError: false` without `trust: true`, which disables unsafe LaTeX command execution.
   - Fallback raw rendering is sanitized with `escapeHtml(mathStr)`.
2. **`profanityFilter.js`**:
   - `containsDangerousPayload()` detects `<script>`, `<iframe>`, `<object>`, `<embed>`, `javascript:`, and inline handlers (`onload=`, `onerror=`).
   - `validateCleanInput()` rejects dangerous payloads on user input submissions.
3. **`ScientificCalculator.jsx`**:
   - Line 152 uses `Function('"use strict"; return (' + sanitized + ')')()`.
   - While currently restricted to button clicks, replacing `Function()` with a tokenized arithmetic evaluator or regex whitelist (`/^[\d+\-*/.() ]+$/`) ensures defensive hardening.

---

## Itemized Audit Findings & Severity Matrix

| ID | Component | Severity | Description | Status |
|---|---|---|---|---|
| **SEC-01** | `questionSyncService.js` | **High** | Plaintext admin passcodes hardcoded in client source code. | Action Required |
| **SEC-02** | `questionSyncService.js` | **Medium** | 32-bit FNV-1a hash used instead of SHA-256 for admin passcode verification. | Action Required |
| **SEC-03** | `geminiService.js` | **Medium** | Gemini API key passed in URL query string instead of `x-goog-api-key` header. | Action Required |
| **DAT-01** | `indexedDB.js` / `testAttemptService.js` | **Medium** | Disconnect between `localStorage` attempts and IndexedDB backup export/import. | Action Required |
| **COD-01** | `ScientificCalculator.jsx` | **Low** | Use of `Function()` evaluator for calculator expressions. | Advisory |
| **INT-01** | Test Suite & Core Engines | **Clean** | All 274 unit tests authentic, 0 facades, 0 cheats. | Verified |

---

## Final Verdict

**VERDICT: CLEAN (Authentic Implementation)**  
No fraudulent facades, hardcoded test cheats, or fabricated test results were found. All 274 tests execute real logic and 100% pass. Remediations are specified above for the identified client-side security and data backup persistence items.
