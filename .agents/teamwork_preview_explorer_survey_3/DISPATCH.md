## 2026-08-20T15:20:23Z
Investigate the Automated Verification & Test Suite requirements for the GATE AG Prep Web Portal:
1. Examine how tests should be structured to run via single CLI command `npm test` and exit 0.
2. Investigate the scoring logic in the codebase for:
   - MCQ (Multiple Choice Questions: +1 or +2 for correct, -1/3 or -2/3 for incorrect, 0 for unattempted)
   - MSQ (Multiple Select Questions: all correct options must be selected, no partial marks, no negative marks)
   - NAT (Numerical Answer Type Questions: within given numerical range/tolerance, no negative marks)
3. Investigate the student workflows to test: Practice Mode filtering (subject, topic, difficulty, year), CBT Mock Test timer & answer submission & score breakdown, Formula Sheet rendering/search.
4. Evaluate test runner choices (e.g., Node.js test runner `node --test`, Jest, Vitest, Playwright/Puppeteer or JSDOM/custom lightweight runner) that have minimal friction, work reliably in this environment, and require zero complex external dependencies while thoroughly testing the requirements.
