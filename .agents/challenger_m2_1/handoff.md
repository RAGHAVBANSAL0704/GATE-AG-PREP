# Empirical Challenger Verdict & Handoff Report — Milestone 2 & Milestone 3

## Verdict: APPROVE

---

### 1. Observation

1. **CLI Test Suite Execution (`npm test`)**:
   - Command: `npm test` (`node --test tests/**/*.test.js`)
   - Exit status code: `0`
   - Total test suites: `33 suites`
   - Total tests executed: `122 tests` (`122 pass`, `0 fail`, `0 cancelled`, `0 skipped`)
   - Duration: `~56 ms`
   - All 5 test files (`dataset.test.js`, `pwa.test.js`, `scoring.test.js`, `workflows.test.js`, `stress.test.js`) execute cleanly and without errors.

2. **Production Build Execution (`npm run build`)**:
   - Command: `npm run build` (`vite build`)
   - Exit status code: `0`
   - Output: KaTeX fonts, CSS bundle (`83.42 kB`), and JS bundle (`2,554.73 kB`) rendered and bundled cleanly into `dist/` in `2.81s`.

3. **Core Scoring Logic (`src/components/MockTestMode.jsx:281-335`, `src/components/TestResultModal.jsx:136-160`, `tests/scoring.test.js:8-86`)**:
   - **MCQ Scoring**:
     - 1-mark correct: `+1.00`, 2-mark correct: `+2.00`
     - Case insensitivity & whitespace trimming: `" b "` / `"d"` correctly normalized.
     - Negative marking: `-0.333333` (-1/3) for 1-mark wrong, `-0.666667` (-2/3) for 2-mark wrong when `enable_negative_marking !== false`.
     - Negative marking disabled (`enable_negative_marking: false`): wrong MCQ yields `0` deduction.
   - **MSQ Scoring**:
     - Exact match awards full marks (`+q.marks`).
     - Order independence verified: `"C, A"` matches key `"A, C"`.
     - Delimiters & casing: `"A;C"`, `"c, a"`, `"A , C"` all normalized to `A;C`.
     - Partial credit strictly denied (e.g. answering `"A"` when key is `"A, C"` yields `0` marks).
     - Extra wrong option strictly denied (e.g. answering `"A, C, D"` yields `0` marks).
     - Negative marking on MSQ: strictly `0` penalty.
   - **NAT Scoring**:
     - Scalar tolerance: `Math.abs(numVal - target) < 0.05` verified. Answers within `+/- 0.049` pass; answers outside `+/- 0.05` fail.
     - Float addition epsilon: `0.1 + 0.2` (`0.30000000000000004`) for target `0.3` evaluates to `true`.
     - Range interval: `min to max` (e.g. `"12.20 to 12.80"`) accepts inclusive boundaries `12.20`, `12.80`, `12.55` and rejects `12.19`, `12.81`.
     - Negative numbers: `-15.50` accepts `-15.52`, `-15.48` and rejects `-15.60`; `-25.5 to -10.2` verified.
     - Scientific notation: `5e-3` for target `0.005` evaluates to `true`.
     - Invalid inputs: `NaN`, `Infinity`, malformed strings (`"abc42.0"`) safely fail with `0` marks and `0` penalty.
   - **State Handling & Status Differentiation**:
     - `NOT_VISITED`, `NOT_ANSWERED`, `MARKED` (without answer) -> `UNATTEMPTED` (0 marks).
     - `ANSWERED` and `ANSWERED_MARKED` with answer -> evaluated and scored.
     - Blank / whitespace string answers with state `ANSWERED` -> safely treated as unattempted (0 marks).
   - **Division by Zero Safety**:
     - 0 questions attempted -> accuracy returns `0` (not `NaN` or `Infinity`).
     - Empty question list -> accuracy `0`, score `0`, totalQuestions `0`.

4. **Assertion Rigor Audit (`tests/**/*.test.js`)**:
   - Total assertions: 390+ across 5 suites using `node:assert/strict`.
   - Verified that assertions test actual computed properties (`assert.strictEqual`, `assert.deepStrictEqual`, `assert.ok` on length > 0, regex matching, binary PNG header dimensions, LaTeX brace balance). No tautologies like `assert.ok(true)` exist.

---

### 2. Logic Chain

1. **Observation 1 & 2** demonstrate that the test infrastructure CLI (`npm test`) and build system (`npm run build`) meet the acceptance criteria of running cleanly via a single CLI command with 100% passing tests and exit code 0.
2. **Observation 3** establishes through empirical testing that all GATE AG scoring rules (MCQ positive/negative fractional marking, MSQ exact-set requirement with zero partial credit and zero negative marking, NAT scalar and range tolerances, negative marking flag toggle, and unattempted/marked state transitions) behave correctly according to GATE standards and application specifications.
3. **Observation 3 (Division by Zero & Float Epsilon)** confirms numerical stability across edge-case inputs without runtime crashes, `NaN`, `Infinity`, or precision leakage.
4. **Observation 4** confirms that test suites are genuine, robust verifications rather than superficial assertions.
5. Therefore, Milestone 2 and Milestone 3 scoring and test runner requirements are satisfied.

---

### 3. Caveats

- **Raw Mock Papers Dataset**: In `src/data/mock_papers.json`, certain legacy exam papers (2012–2022) contain instruction/section header rows that share duplicate question IDs (e.g. `GATE_2012_Q1`) or contain official "MTA" (Marks to All) keys for cancelled exam questions. The application's UI components and scoring engine handle these without crashing.
- No other caveats.

---

### 4. Conclusion

The scoring engine, CBT mock test state machine, practice mode workflows, PWA subsystem, and test infrastructure meet all acceptance criteria and empirical stress challenges.

**Verdict**: **APPROVE**

---

### 5. Verification Method

To independently verify this verdict:

1. **Run full automated test suite**:
   ```bash
   npm test
   ```
   *Expected result*: All 122 tests pass across 33 suites with exit code 0.

2. **Run production Vite build**:
   ```bash
   npm run build
   ```
   *Expected result*: Build completes cleanly with exit code 0 into `dist/`.

3. **Inspect empirical challenger stress tests**:
   Inspect `tests/stress.test.js` to review edge cases for floating-point tolerance, MSQ permutations, negative marking toggle, and 0/0 division safety.
