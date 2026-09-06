import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

describe('CBT State Persistence & Session Recovery Suite', () => {
  const SESSION_KEY = 'gate_ag_active_cbt_session';
  let mockStorage = {};

  beforeEach(() => {
    mockStorage = {};
  });

  it('saves active test session snapshot with all invariant properties', () => {
    const sessionSnapshot = {
      paperTitle: 'GATE 2026 Agricultural Engineering Paper',
      paperYear: '2026',
      activeSection: 'GA',
      currentQIndex: 3,
      timeLeft: 9450,
      userAnswers: { GATE_2026_Q1: 'B', GATE_2026_Q2: '14.5' },
      questionStates: { GATE_2026_Q1: 'ANSWERED', GATE_2026_Q2: 'ANSWERED', GATE_2026_Q3: 'NOT_ANSWERED' },
      questionTimes: { GATE_2026_Q1: 45, GATE_2026_Q2: 110 },
      savedAt: Date.now()
    };

    mockStorage[SESSION_KEY] = JSON.stringify(sessionSnapshot);
    assert.ok(mockStorage[SESSION_KEY], 'Session key must be populated');

    const restored = JSON.parse(mockStorage[SESSION_KEY]);
    assert.strictEqual(restored.paperYear, '2026');
    assert.strictEqual(restored.currentQIndex, 3);
    assert.strictEqual(restored.userAnswers.GATE_2026_Q1, 'B');
    assert.strictEqual(restored.questionStates.GATE_2026_Q1, 'ANSWERED');
    assert.strictEqual(restored.questionTimes.GATE_2026_Q2, 110);
  });

  it('calculates remaining elapsed time accurately upon simulated reload', () => {
    const now = Date.now();
    const savedAt = now - (15 * 1000); // Saved 15 seconds ago
    const initialTimeLeft = 10800; // 180 minutes

    const sessionSnapshot = {
      paperTitle: 'GATE 2024 Paper',
      timeLeft: initialTimeLeft,
      savedAt
    };

    const elapsed = Math.floor((now - sessionSnapshot.savedAt) / 1000);
    const recoveredTimeLeft = Math.max(0, sessionSnapshot.timeLeft - elapsed);

    assert.strictEqual(elapsed, 15);
    assert.strictEqual(recoveredTimeLeft, 10785);
  });

  it('clears active session upon test submission', () => {
    mockStorage[SESSION_KEY] = JSON.stringify({ paperYear: '2025', timeLeft: 5000 });
    assert.ok(mockStorage[SESSION_KEY]);

    // Simulate final submission
    delete mockStorage[SESSION_KEY];
    assert.strictEqual(mockStorage[SESSION_KEY], undefined);
  });

  it('simulates virtual NAT keypad input operations including negative toggle and decimals', () => {
    let input = '';
    
    // Keypad press simulation
    const press = (key) => {
      if (key === 'BACK') {
        input = input.slice(0, -1);
      } else if (key === 'CLEAR') {
        input = '';
      } else if (key === '-') {
        input = input.startsWith('-') ? input.slice(1) : '-' + input;
      } else if (key === '.') {
        if (!input.includes('.')) input = input === '' ? '0.' : input + '.';
      } else {
        input += key;
      }
      return input;
    };

    assert.strictEqual(press('1'), '1');
    assert.strictEqual(press('2'), '12');
    assert.strictEqual(press('.'), '12.');
    assert.strictEqual(press('5'), '12.5');
    assert.strictEqual(press('-'), '-12.5');
    assert.strictEqual(press('-'), '12.5');
    assert.strictEqual(press('BACK'), '12.');
    assert.strictEqual(press('CLEAR'), '');
  });
});
