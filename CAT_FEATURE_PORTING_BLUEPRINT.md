# CAT Prep Portal — Feature Export & Porting Blueprint

This document details the highest-impact, battle-tested features and architectural subsystems from the **GATE AG Prep Platform** that are prime candidates for porting and adapting into the **CAT Exam Prep Portal**.

---

## 1. Pacing & Behavioral Forensics Engine

In CAT, time management is the single greatest determinant of percentiles (40 minutes per section $\times$ 3 sections):
- **Behavioral Pacing Buckets**:
  - **Rush Trap ($\le 45$s, Wrong)**: Detects impulsive guessing or falling for distractor options (especially critical in VARC RC inference questions).
  - **Time Sinkhole ($> 180$s, Wrong)**: Detects questions where the student spent over 3 minutes and still got negative/zero marks. In CAT DILR, one sinkhole set can destroy an entire sectional cutoff.
  - **Optimal (60–150s, High Accuracy)**: Ideal zone for QA and DILR set-solving.
  - **Rapid Fire ($\le 60$s, Correct)**: High-speed mastery (e.g., direct arithmetic or grammar).
  - **Clean Skip (0–30s)**: Conscious strategic abandonment. In CAT, knowing which DILR set to skip within 2 minutes is worth 15+ percentile points.
- **Porting Strategy**:
  - Re-use `getQuestionPacing(timeSpentSeconds, isCorrect)` in `scoring.js`.
  - Display a visual **Time-Investment vs. Accuracy Scatter Matrix** in `AnalyticsHub.jsx`.

---

## 2. Mistake Vault & Error Forensics Subsystem

Instead of simply showing wrong answers, the **Mistake Vault** turns errors into an active revision queue:
- **Error Categorization Tagging**:
  - *Silly / Calculation Slip* (arithmetic or sign errors in QA).
  - *Conceptual Blindspot* (did not know the formula or theorem).
  - *Time Pressure / Panicked Guess* (timer ran down).
  - *Misread Question / Trap Option* (fell for extreme words in VARC like 'always', 'never').
- **Repeat Error Tracking**:
  - Maintains error count per question ID (`timesWrong: 2`).
  - Flags persistent repeat blindspots.
- **"Practice Mistake Vault" Mode**:
  - One-click launch to re-attempt only questions currently in the student's vault until answered correctly twice in a row.

---

## 3. CBT Session Crash Recovery & Wall-Clock Resync

Candidates must never lose an ongoing 120-minute mock test due to accidental page refreshes, power cuts, or browser restarts:
- **Wall-Clock Timestamp Anchor**:
  - Never decrement a simple integer `secondsLeft--` in `setInterval` alone (which drifts when backgrounded).
  - Store target end timestamp: `targetEndTime = Date.now() + remainingSeconds * 1000`.
  - Re-sync remaining time on `document.addEventListener('visibilitychange')`.
- **Throttled State Persistence**:
  - Save full CBT snapshot to `localStorage.getItem('cat_active_cbt_session')` on every question navigation and throttled 10-second intervals.
  - On mount, detect if an active unsubmitted session exists; offer a seamless "Resume Test at [Time Left]" banner.

---

## 4. Deep Storage & Offline Sync Engine (`IndexedDB` + `LocalStorage`)

Ensures the portal works 100% offline on airplanes, subways, or flaky library WiFi:
- **Client-Generated UUID v4**:
  - Every attempt gets an immutable UUID (`client_attempt_id`) before saving.
- **2-Tier Persistence**:
  - **IndexedDB (`cat_prep_db`)**: Deep storage for complete question-by-question response arrays, time-spent maps, and full answer keys.
  - **LocalStorage Queue**: Lightweight attempt summary queue with `_syncedToBackend: false`.
- **Automatic Background Re-sync**:
  - Event listeners on `online` and `app-online`. Pushes pending attempts to backend idempotently with zero duplicates.

---

## 5. DILR Set-Selection Efficiency Diagnostic

A unique feature engineered specifically for CAT candidates:
- In CAT DILR, there are typically 4 sets (20 questions total). Most 99%ilers solve 2.5 to 3 sets with high accuracy rather than trying all 4 sets.
- **Set Diagnostics**:
  - Group questions by `passageId` / Set ID (`DILR_SET_1`, `DILR_SET_2`, etc.).
  - Calculate **Set ROI**: $\frac{\text{Total Marks Earned on Set}}{\text{Total Minutes Invested in Set}}$.
  - Pinpoint whether the student picked the easiest set first or fell into a trap set.

---

## 6. Command Palette (`Cmd + K` / `Ctrl + K`)

- Global fuzzy-search launcher across the entire application:
  - Jump directly to any QA Formula (e.g., "Alligation", "Apollonius", "Totient").
  - Jump to specific CAT Mocks or Practice categories (e.g., "Parajumbles", "Arrangements").
  - Toggle light/dark theme.

---

## 7. AI Doubt Solver & Option Eliminator

- Contextual explanation engine:
  - Explains not only why Option B is correct, but specifically why Option A, C, and D are traps (vital for RC critical reasoning and inference questions).
  - Provides alternative fast-track calculation shortcuts (e.g., digital roots, approximation, option-substitution).

---

## 8. Exportable PDF Scorecard & Mock Question Paper

- One-click generation of:
  - Clean printable question paper with watermarks for offline pen-and-paper solving.
  - Detailed diagnostic scorecard with IIM call prediction breakdown.

---

## Implementation Priority Roadmap for CAT Portal

| Feature | Impact on CAT Prep | Complexity | Priority |
|---|---|---|---|
| **Mistake Vault & Error Tags** | ⭐️⭐️⭐️⭐️⭐️ Extremely High | Low-Medium | **Phase 1** |
| **Pacing Scatter & Sinkhole Detector** | ⭐️⭐️⭐️⭐️⭐️ Critical for 40m timers | Low | **Phase 1** |
| **CBT Crash Recovery Anchor** | ⭐️⭐️⭐️⭐️⭐️ Essential Reliability | Low | **Phase 1** |
| **DILR Set Selection Efficiency** | ⭐️⭐️⭐️⭐️⭐️ CAT-Specific Gem | Medium | **Phase 2** |
| **Command Palette (`Cmd+K`)** | ⭐️⭐️⭐️⭐️ High UX Polish | Low-Medium | **Phase 2** |
| **AI Option Eliminator** | ⭐️⭐️⭐️⭐️ High Learning Value | Medium | **Phase 3** |
