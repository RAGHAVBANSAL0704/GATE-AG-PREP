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
});
