import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

// Mock localStorage for Node test environment
const mockStorage = new Map();
globalThis.localStorage = {
  getItem: (key) => mockStorage.get(key) || null,
  setItem: (key, val) => mockStorage.set(key, String(val)),
  removeItem: (key) => mockStorage.delete(key),
  clear: () => mockStorage.clear()
};

import {
  getMistakeVault,
  recordQuestionOutcomes,
  getActiveMistakeIds,
  removeMistake,
  clearMistakeVault,
  getVaultStorageKey
} from '../src/services/mistakeVaultService.js';

describe('Mistake Vault User Isolation & Repeat Tracking Test Suite', () => {

  beforeEach(() => {
    mockStorage.clear();
  });

  it('generates distinct storage keys for different student IDs', () => {
    const keyAlice = getVaultStorageKey('student_alice');
    const keyBob = getVaultStorageKey('student_bob');

    assert.strictEqual(keyAlice, 'gate_ag_mistake_vault_student_alice');
    assert.strictEqual(keyBob, 'gate_ag_mistake_vault_student_bob');
    assert.notStrictEqual(keyAlice, keyBob);
  });

  it('strictly isolates mistake vaults between different students', () => {
    // Alice makes mistakes on Q1, Q2
    recordQuestionOutcomes({
      studentId: 'student_alice',
      incorrect: ['GATE_2024_Q1', 'GATE_2024_Q2'],
      correct: []
    });

    // Bob makes mistake on Q3
    recordQuestionOutcomes({
      studentId: 'student_bob',
      incorrect: ['GATE_2024_Q3'],
      correct: []
    });

    const aliceMistakes = getActiveMistakeIds('student_alice');
    const bobMistakes = getActiveMistakeIds('student_bob');

    assert.deepStrictEqual(aliceMistakes.sort(), ['GATE_2024_Q1', 'GATE_2024_Q2']);
    assert.deepStrictEqual(bobMistakes, ['GATE_2024_Q3']);
    assert.ok(!aliceMistakes.includes('GATE_2024_Q3'), 'Alice must not see Bob mistakes');
    assert.ok(!bobMistakes.includes('GATE_2024_Q1'), 'Bob must not see Alice mistakes');
  });

  it('increments mistakeCount when student makes repeated errors on the same question', () => {
    // First mistake
    recordQuestionOutcomes({
      studentId: 'student_alice',
      incorrect: ['GATE_2022_Q10'],
      correct: []
    });

    let vault = getMistakeVault('student_alice');
    assert.strictEqual(vault['GATE_2022_Q10'].mistakeCount, 1);
    assert.strictEqual(vault['GATE_2022_Q10'].mastered, false);

    // Second mistake on same question
    recordQuestionOutcomes({
      studentId: 'student_alice',
      incorrect: ['GATE_2022_Q10'],
      correct: []
    });

    vault = getMistakeVault('student_alice');
    assert.strictEqual(vault['GATE_2022_Q10'].mistakeCount, 2);

    // Third mistake
    recordQuestionOutcomes({
      studentId: 'student_alice',
      incorrect: ['GATE_2022_Q10'],
      correct: []
    });

    vault = getMistakeVault('student_alice');
    assert.strictEqual(vault['GATE_2022_Q10'].mistakeCount, 3);
  });

  it('marks question as mastered when solved correctly, and removes it from active list', () => {
    recordQuestionOutcomes({
      studentId: 'student_alice',
      incorrect: ['GATE_2023_Q5'],
      correct: []
    });

    assert.ok(getActiveMistakeIds('student_alice').includes('GATE_2023_Q5'));

    // Later, student solves it correctly
    recordQuestionOutcomes({
      studentId: 'student_alice',
      incorrect: [],
      correct: ['GATE_2023_Q5']
    });

    const activeMistakes = getActiveMistakeIds('student_alice');
    assert.ok(!activeMistakes.includes('GATE_2023_Q5'), 'Mastered question should not be in active mistakes');

    const vault = getMistakeVault('student_alice');
    assert.strictEqual(vault['GATE_2023_Q5'].mastered, true);
  });

  it('manually removes question from mistake vault', () => {
    recordQuestionOutcomes({
      studentId: 'student_alice',
      incorrect: ['GATE_2021_Q15', 'GATE_2021_Q16'],
      correct: []
    });

    removeMistake('GATE_2021_Q15', 'student_alice');

    const activeMistakes = getActiveMistakeIds('student_alice');
    assert.ok(!activeMistakes.includes('GATE_2021_Q15'));
    assert.ok(activeMistakes.includes('GATE_2021_Q16'));
  });
});
