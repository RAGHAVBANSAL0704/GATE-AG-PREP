# Plan: GATE AG Prep Web Portal Full Audit & Review

## Objectives
1. Comprehensive Architecture & Code Quality Audit across 4 key subsystems (Scoring, AI Suite, Live Sync & Admin HQ, Offline Persistence Engine).
2. Test Suite & Mathematical Robustness Verification (`npm test`, floating point tolerances, MSQ edge cases, negative marking, offline queue sync).
3. Performance, Bundle Size & Memory Audit (`vite.config.js`, chunk splitting, `React.lazy`, Core Web Vitals).
4. Security & Client-Side Vulnerability Assessment (Passcode SHA-256 hashing, API key storage/obfuscation, XSS/sanitization).
5. Comprehensive Itemized Audit Report with categorized severity and concrete, actionable remediations/diffs.
6. Execution verification: 100% passing tests and clean production build.

## Topology & Dispatch Plan
- **Round 1: Parallel Survey & Exploration**
  - `explorer_subsystems`: Deep dive into R1 (Scoring, AI/Vision, Live Sync, Offline DB) and overall architecture.
  - `explorer_test_math`: Deep dive into R2 (Test suite, mathematical rigor, NAT tolerances, MSQ, negative marking, offline sync test coverage) + execute tests via Worker.
  - `explorer_perf_sec`: Deep dive into R3 & R4 (Vite bundle config, memory, lazy loading, SHA-256 passcode hashing, API key handling, XSS/sanitization).
- **Round 2: Verification, Stress Testing & Integrity Audit**
  - Worker executes `npm test` and `npm run build`, captures detailed logs.
  - Auditor & Challenger inspect findings, verify validity of issues and verify no regressions.
- **Round 3: Final Synthesis & Reporting**
  - Synthesize findings into itemized categories (Critical, High, Medium, Low, Informational).
  - Draft concrete diffs and architectural recommendations.
  - Deliver final report to Sentinel.
