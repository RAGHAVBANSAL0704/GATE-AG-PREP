# BRIEFING — 2026-08-20T15:24:00Z

## Mission
Investigate the Automated Verification & Test Suite requirements for the GATE AG Prep Web Portal (scoring logic for MCQ/MSQ/NAT, student workflows, test runner options for `npm test`).

## 🔒 My Identity
- Archetype: explorer
- Roles: investigation, synthesis
- Working directory: /Users/raghav/Desktop/GATE AG PREP WEB/.agents/teamwork_preview_explorer_survey_3
- Original parent: 40aff111-8fba-4d8a-b8f1-1d042e97af41
- Milestone: survey

## 🔒 Key Constraints
- Read-only investigation — do NOT implement
- Investigate scoring logic for MCQ (+1/+2, -1/3 / -2/3, 0 unattempted), MSQ (all correct, no partial, no negative), NAT (range/tolerance, no negative)
- Investigate student workflows: Practice Mode filtering, CBT Mock Test timer & answer submission & score breakdown, Formula Sheet rendering/search
- Evaluate test runner choices for zero friction, zero complex external dependencies, 100% pass via `npm test`
- Follow Handoff Protocol (handoff.md)

## Current Parent
- Conversation ID: 40aff111-8fba-4d8a-b8f1-1d042e97af41
- Updated: 2026-08-20T15:24:00Z

## Investigation State
- **Explored paths**: `ORIGINAL_REQUEST.md`, `package.json`, `src/App.jsx`, `src/components/MockTestMode.jsx`, `src/components/TestResultModal.jsx`, `src/components/PracticeMode.jsx`, `src/components/FormulaSheet.jsx`, `src/data/questions.json`, `src/data/mock_papers.json`, `src/data/formulas.js`, `src/data/syllabus.js`.
- **Key findings**:
  1. Scoring logic is verified across `MockTestMode.jsx`, `PracticeMode.jsx`, and `TestResultModal.jsx`. MCQ applies +1/+2 and -1/3 / -2/3; MSQ requires all correct options with 0 marks/0 penalty for partial; NAT supports range (`min to max`) and single value (±0.05 tolerance) with 0 penalty for incorrect.
  2. Student workflows map cleanly to filter engines, question state machines, countdown timers, and formula category search/flat-table renderers.
  3. Node 24 native test runner (`node --test`) with `node:assert/strict` provides zero-dependency, sub-10ms execution, full ESM support, and clean exit code 0 via `npm test`.
- **Unexplored areas**: None for survey scope.

## Key Decisions Made
- Recommending `node --test` with modular test suites in `tests/` (`scoring.test.js`, `workflows.test.js`, `dataset.test.js`, `pwa.test.js`) and adding `"test": "node --test"` to `package.json`.

## Artifact Index
- handoff.md — Comprehensive 5-component handoff report with exact observations, logic chains, caveats, conclusions, and verification methods.
