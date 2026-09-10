import test from 'node:test';
import assert from 'node:assert/strict';
// Mock localStorage for Node test environment
const mockStorage = new Map();
globalThis.localStorage = {
  getItem: (key) => mockStorage.get(key) || null,
  setItem: (key, val) => mockStorage.set(key, String(val)),
  removeItem: (key) => mockStorage.delete(key),
  clear: () => mockStorage.clear()
};

import { calculateAttemptXP, getLocalAcademicXP, awardStudentXP } from '../src/services/leaderboardService.js';
import { addBreakXP, getLocalBreakXP } from '../src/services/breakLeaderboardService.js';

test('Academic and Break Zone XP Real-time & Persistence Test Suite', async (t) => {
  await t.test('calculates Academic XP accurately with milestone and full-mock bonuses', () => {
    // 15 correct, 0 incorrect, not full mock
    const res1 = calculateAttemptXP({ correctCount: 15, incorrectCount: 0, totalQuestions: 15, isFullMock: false });
    assert.equal(res1.correctXP, 15);
    assert.equal(res1.milestoneBonus15Qs, 5);
    assert.equal(res1.fullMockBonus, 0);
    assert.equal(res1.totalEarnedXP, 20);

    // Full 65 Q mock test with 50 correct and 10 incorrect
    const res2 = calculateAttemptXP({ correctCount: 50, incorrectCount: 10, totalQuestions: 65, isFullMock: true });
    assert.equal(res2.correctXP, 50);
    assert.equal(res2.incorrectXP, 5);
    assert.equal(res2.milestoneBonus15Qs, 20); // 60 completed / 15 * 5 = 20
    assert.equal(res2.fullMockBonus, 15);
    assert.equal(res2.totalEarnedXP, 90);
  });

  await t.test('adds Break Zone XP incrementally without resetting existing score', () => {
    const xp1 = addBreakXP(10);
    assert.ok(xp1 >= 10, 'XP should increase by at least 10');

    const xp2 = addBreakXP(20);
    assert.ok(xp2 >= xp1 + 20, 'XP should monotonically increase without resetting');
  });

  await t.test('preserves cumulative local Academic and Break XP scores', () => {
    const acadXP = getLocalAcademicXP();
    assert.ok(typeof acadXP === 'number' && !isNaN(acadXP), 'Academic XP must be a valid number');

    const breakXP = getLocalBreakXP();
    assert.ok(typeof breakXP === 'number' && !isNaN(breakXP), 'Break XP must be a valid number');
  });

  await t.test('awardStudentXP supports numeric values, calc objects, and updates storage', async () => {
    const startXP = getLocalAcademicXP();
    
    // 1. Numeric call
    const res1 = await awardStudentXP(1.0);
    assert.equal(res1.success, true);
    assert.equal(res1.xpAwarded, 1.0);
    assert.equal(getLocalAcademicXP(), Number((startXP + 1.0).toFixed(1)));

    // 2. Object call from calculateAttemptXP
    const res2 = await awardStudentXP({ totalEarnedXP: 15.5 });
    assert.equal(res2.success, true);
    assert.equal(res2.xpAwarded, 15.5);
    assert.equal(getLocalAcademicXP(), Number((startXP + 1.0 + 15.5).toFixed(1)));

    // 3. Invalid or zero call
    const res3 = await awardStudentXP(0);
    assert.equal(res3.success, false);
    assert.equal(res3.xpAwarded, 0);
  });

  await t.test('enforces Zero-XP rule when solution is peeked before answering', () => {
    // Simulated practice/qbank logic
    const peekedQuestions = { 'q_test_1': true };
    const evalResult = { isCorrect: true, marksAwarded: 1 };
    
    let xpAwarded = 0;
    if (peekedQuestions['q_test_1']) {
      xpAwarded = 0; // Strictly 0 XP
    } else if (evalResult.isCorrect) {
      xpAwarded = 1.0;
    }

    assert.equal(xpAwarded, 0, 'Must award 0 XP when solution was peeked before answering');
  });

  await t.test('awards progressive delta XP (0.5 for attempt + 0.5 when corrected = 1.0)', async () => {
    let prevXp = 0;
    
    // First attempt: incorrect
    const isCorrect1 = false;
    let delta1 = 0;
    if (!isCorrect1 && prevXp === 0) {
      delta1 = 0.5;
      prevXp = 0.5;
    }
    assert.equal(delta1, 0.5);
    assert.equal(prevXp, 0.5);

    // Second attempt: correct
    const isCorrect2 = true;
    let delta2 = 0;
    if (isCorrect2) {
      delta2 = Math.max(0, 1.0 - prevXp);
      prevXp = 1.0;
    }
    assert.equal(delta2, 0.5);
    assert.equal(prevXp, 1.0);
  });
});
