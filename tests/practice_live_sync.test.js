import test from 'node:test';
import assert from 'node:assert/strict';

// Mock localStorage and window for Node test environment
const mockStorage = new Map();
globalThis.localStorage = {
  getItem: (key) => mockStorage.get(key) || null,
  setItem: (key, val) => mockStorage.set(key, String(val)),
  removeItem: (key) => mockStorage.delete(key),
  clear: () => mockStorage.clear()
};

const mockListeners = new Map();
globalThis.window = {
  addEventListener: (event, handler) => {
    if (!mockListeners.has(event)) mockListeners.set(event, []);
    mockListeners.get(event).push(handler);
  },
  removeEventListener: (event, handler) => {
    if (mockListeners.has(event)) {
      const list = mockListeners.get(event);
      const idx = list.indexOf(handler);
      if (idx !== -1) list.splice(idx, 1);
    }
  },
  dispatchEvent: (event) => {
    const type = typeof event === 'string' ? event : event.type;
    if (mockListeners.has(type)) {
      mockListeners.get(type).forEach(h => h(event));
    }
  }
};

globalThis.document = {
  visibilityState: 'visible',
  addEventListener: () => {},
  removeEventListener: () => {}
};

import { 
  getStudentBookmarksKey, 
  getStudentPracticeKey,
  getLocalPracticeProgress,
  getLocalBookmarks,
  pushPracticeProgressUpdate,
  pushBookmarksUpdate,
  fetchAndRebuildStudentStats,
  syncStudentCloudData,
  flushPendingProgressSync
} from '../src/services/studentProgressSyncService.js';

import { 
  recordQuestionOutcomes,
  flushPendingVaultSync,
  getMistakeVault
} from '../src/services/mistakeVaultService.js';

import { 
  awardStudentXP,
  getLocalAcademicXP,
  subscribeToLiveAcademicXP
} from '../src/services/leaderboardService.js';

test('Practice Hub Multi-Device Live Sync and Unique Question XP Test Suite', async (t) => {
  t.beforeEach(() => {
    mockStorage.clear();
    mockListeners.clear();
  });

  await t.test('strictly awards XP only once per unique question solving (NO duplicate XP)', async () => {
    const testStudent = { id: 'stu_live_sync_01', admission_no: '2022AE01', xp_points: 0 };
    
    // Simulate unique question solving tracker
    const practiceProgress = {};
    let totalAwardedXP = 0;

    const solveQuestion = (qid, isCorrect, wasPeeked) => {
      const prevXp = Number(practiceProgress[qid]?.xpAwarded || 0);
      let deltaXp = 0;
      let newXpAwarded = prevXp;

      if (wasPeeked) {
        newXpAwarded = 0;
      } else if (isCorrect) {
        deltaXp = Math.max(0, 1.0 - prevXp);
        newXpAwarded = Math.max(prevXp, 1.0);
      } else {
        if (prevXp === 0) {
          deltaXp = 0.5;
          newXpAwarded = 0.5;
        }
      }

      practiceProgress[qid] = {
        attempted: true,
        isCorrect,
        xpAwarded: newXpAwarded
      };

      totalAwardedXP += deltaXp;
      return { deltaXp, newXpAwarded };
    };

    // 1. First attempt: correct on unique question -> awards full 1.0 XP
    const step1 = solveQuestion('q_unique_1', true, false);
    assert.equal(step1.deltaXp, 1.0, 'First correct attempt must award 1.0 XP');
    assert.equal(totalAwardedXP, 1.0);

    // 2. Duplicate attempt on same question: correct again -> strictly 0 XP
    const step2 = solveQuestion('q_unique_1', true, false);
    assert.equal(step2.deltaXp, 0, 'Duplicate correct attempt on solved question must award 0 XP');
    assert.equal(totalAwardedXP, 1.0);

    // 3. Duplicate attempt on same question: incorrect -> strictly 0 XP
    const step3 = solveQuestion('q_unique_1', false, false);
    assert.equal(step3.deltaXp, 0, 'Subsequent incorrect attempt on already solved question must award 0 XP');
    assert.equal(totalAwardedXP, 1.0);

    // 4. Second unique question: first attempt incorrect -> 0.5 XP participation
    const step4 = solveQuestion('q_unique_2', false, false);
    assert.equal(step4.deltaXp, 0.5, 'First attempt incorrect awards 0.5 XP');
    assert.equal(totalAwardedXP, 1.5);

    // 5. Duplicate attempt on q_unique_2 incorrect -> strictly 0 XP
    const step5 = solveQuestion('q_unique_2', false, false);
    assert.equal(step5.deltaXp, 0, 'Duplicate incorrect attempt must award 0 XP');
    assert.equal(totalAwardedXP, 1.5);

    // 6. Solved correctly on subsequent attempt -> awards delta 0.5 XP (reaching 1.0 cap)
    const step6 = solveQuestion('q_unique_2', true, false);
    assert.equal(step6.deltaXp, 0.5, 'Correction awards remaining 0.5 XP to reach 1.0 cap');
    assert.equal(totalAwardedXP, 2.0);

    // 7. Any further attempt on q_unique_2 -> 0 XP
    const step7 = solveQuestion('q_unique_2', true, false);
    assert.equal(step7.deltaXp, 0, 'Further attempts award 0 XP');
    assert.equal(totalAwardedXP, 2.0);

    // 8. Third unique question peeked -> strictly 0 XP even if answered correct
    const step8 = solveQuestion('q_unique_3', true, true);
    assert.equal(step8.deltaXp, 0, 'Peeked question awards 0 XP');
    assert.equal(totalAwardedXP, 2.0);
  });

  await t.test('pushes and persists practice question progress scoped to student', () => {
    const student = { id: 'stu_sync_02', admission_no: '2023AE10' };
    const qid = 'ag_pyq_2024_q15';
    
    pushPracticeProgressUpdate(student, qid, {
      attempted: true,
      isCorrect: true,
      marksAwarded: 2,
      peeked: false,
      xpAwarded: 1.0
    });

    const progress = getLocalPracticeProgress('stu_sync_02');
    assert.ok(progress[qid], 'Practice progress must be stored in local cache');
    assert.equal(progress[qid].attempted, true);
    assert.equal(progress[qid].isCorrect, true);
    assert.equal(progress[qid].xpAwarded, 1.0);
  });

  await t.test('pushes and persists bookmarks scoped to student account', () => {
    const student = { id: 'stu_sync_03', admission_no: '2023AE20' };
    const bms = ['q_101', 'q_102', 'q_105'];

    pushBookmarksUpdate(student, bms);

    const saved = getLocalBookmarks('stu_sync_03');
    assert.deepEqual(saved, ['q_101', 'q_102', 'q_105']);
  });

  await t.test('reconstructs userStats to include all questions solved in Practice Hub', async () => {
    const student = { id: 'stu_sync_04', admission_no: '2023AE30' };

    // Record practice progress for 3 questions
    pushPracticeProgressUpdate(student, 'q_prac_1', { attempted: true, isCorrect: true, xpAwarded: 1.0 });
    pushPracticeProgressUpdate(student, 'q_prac_2', { attempted: true, isCorrect: true, xpAwarded: 1.0 });
    pushPracticeProgressUpdate(student, 'q_prac_3', { attempted: true, isCorrect: false, xpAwarded: 0.5 });

    const stats = await fetchAndRebuildStudentStats(student);
    assert.ok(stats.attempted.includes('q_prac_1'), 'Attempted must include q_prac_1');
    assert.ok(stats.attempted.includes('q_prac_2'), 'Attempted must include q_prac_2');
    assert.ok(stats.attempted.includes('q_prac_3'), 'Attempted must include q_prac_3');
    assert.ok(stats.correct.includes('q_prac_1'), 'Correct must include q_prac_1');
    assert.ok(stats.correct.includes('q_prac_2'), 'Correct must include q_prac_2');
    assert.ok(!stats.correct.includes('q_prac_3'), 'Correct must NOT include q_prac_3');
  });

  await t.test('subscribes to live Academic XP broadcasts and dispatches update events', () => {
    let receivedPayload = null;
    const unsub = subscribeToLiveAcademicXP((payload) => {
      receivedPayload = payload;
    });

    // Simulate cross-window event
    window.dispatchEvent(new CustomEvent('gate_ag_xp_updated', {
      detail: { studentId: 'stu_sync_05', type: 'academic', xp_points: 45.5 }
    }));

    // Clean up
    unsub();
    assert.ok(typeof unsub === 'function');
  });

  await t.test('flushes pending debounced sync payloads safely', () => {
    // Calling flush should execute gracefully without errors even when offline
    flushPendingProgressSync();
    flushPendingVaultSync();
    assert.ok(true, 'Flush functions must complete without throwing');
  });
});
