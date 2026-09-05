import test from 'node:test';
import assert from 'node:assert/strict';

// Mock localStorage for node test runner
const storage = {};
global.localStorage = {
  getItem: (key) => storage[key] || null,
  setItem: (key, val) => { storage[key] = String(val); },
  removeItem: (key) => { delete storage[key]; },
  clear: () => { Object.keys(storage).forEach(k => delete storage[k]); }
};

import { 
  recordQuestionOutcomes, 
  getActiveMistakeIds, 
  getAllMistakeItems, 
  removeMistake, 
  clearMistakeVault 
} from '../src/services/mistakeVaultService.js';

test('Mistake Vault & Error Tracking Subsystem', async (t) => {
  clearMistakeVault();

  await t.test('records incorrect questions into mistake vault', () => {
    recordQuestionOutcomes({
      attempted: ['q1', 'q2', 'q3'],
      correct: ['q1'],
      incorrect: ['q2', 'q3'],
      source: 'Mock 2024'
    });

    const active = getActiveMistakeIds();
    assert.equal(active.length, 2);
    assert.ok(active.includes('q2'));
    assert.ok(active.includes('q3'));
    assert.ok(!active.includes('q1'));
  });

  await t.test('increments mistakeCount when answered wrong multiple times', () => {
    recordQuestionOutcomes({
      attempted: ['q2'],
      correct: [],
      incorrect: ['q2'],
      source: 'Practice Session'
    });

    const all = getAllMistakeItems();
    const q2 = all.find(item => item.qId === 'q2');
    assert.ok(q2);
    assert.equal(q2.mistakeCount, 2);
    assert.equal(q2.mastered, false);
  });

  await t.test('marks question as mastered when later solved correctly', () => {
    recordQuestionOutcomes({
      attempted: ['q2'],
      correct: ['q2'],
      incorrect: [],
      source: 'Practice Session'
    });

    const active = getActiveMistakeIds();
    assert.ok(!active.includes('q2'));

    const all = getAllMistakeItems();
    const q2 = all.find(item => item.qId === 'q2');
    assert.ok(q2);
    assert.equal(q2.mastered, true);
  });

  await t.test('removes specific mistake from vault', () => {
    removeMistake('q3');
    const active = getActiveMistakeIds();
    assert.ok(!active.includes('q3'));
  });

  await t.test('clears entire mistake vault cleanly', () => {
    clearMistakeVault();
    assert.equal(getActiveMistakeIds().length, 0);
  });
});
