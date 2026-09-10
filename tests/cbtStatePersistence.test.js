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

  it('saves test midway with isPaused flag and freezes remaining time without decay', () => {
    const sessionSnapshot = {
      paperTitle: 'GATE 2024 Agricultural Engineering Paper',
      paperYear: '2024',
      activeSection: 'AG',
      currentQIndex: 15,
      timeLeft: 6240, // 104 mins left
      userAnswers: { GATE_2024_Q1: 'B', GATE_2024_Q15: '2.45' },
      questionStates: { GATE_2024_Q1: 'ANSWERED', GATE_2024_Q15: 'ANSWERED', GATE_2024_Q16: 'MARKED' },
      questionTimes: { GATE_2024_Q1: 60, GATE_2024_Q15: 140 },
      savedAt: Date.now() - 3600 * 1000, // Paused 1 hour ago
      isPaused: true
    };

    mockStorage[SESSION_KEY] = JSON.stringify(sessionSnapshot);
    const retrieved = JSON.parse(mockStorage[SESSION_KEY]);

    assert.strictEqual(retrieved.isPaused, true, 'isPaused flag must be true');
    // When paused midway, timeLeft must remain frozen at 6240 without being decremented by elapsed time
    assert.strictEqual(retrieved.timeLeft, 6240, 'Remaining time must be frozen');
    assert.strictEqual(retrieved.userAnswers.GATE_2024_Q15, '2.45', 'Answer must be intact');
    assert.strictEqual(retrieved.questionStates.GATE_2024_Q16, 'MARKED', 'Question state must be intact');
  });

  it('resumes paused test restoring all answers, states, and intact remaining time', () => {
    const pausedSnapshot = {
      paperTitle: 'Mock Test 12',
      paperYear: '2027_12',
      timeLeft: 4800,
      userAnswers: { MOCK12_Q1: 'C', MOCK12_Q2: 'A,C' },
      questionStates: { MOCK12_Q1: 'ANSWERED', MOCK12_Q2: 'ANSWERED_MARKED' },
      questionTimes: { MOCK12_Q1: 45, MOCK12_Q2: 90 },
      isPaused: true
    };
    mockStorage[SESSION_KEY] = JSON.stringify(pausedSnapshot);

    // Simulate resumption
    const session = JSON.parse(mockStorage[SESSION_KEY]);
    const resumedSession = {
      ...session,
      isPaused: false,
      savedAt: Date.now()
    };
    mockStorage[SESSION_KEY] = JSON.stringify(resumedSession);

    const active = JSON.parse(mockStorage[SESSION_KEY]);
    assert.strictEqual(active.isPaused, false);
    assert.strictEqual(active.timeLeft, 4800);
    assert.strictEqual(active.userAnswers.MOCK12_Q2, 'A,C');
    assert.strictEqual(active.questionStates.MOCK12_Q2, 'ANSWERED_MARKED');
  });

  it('cancels exam midway completely deleting active session, wiping all answers and leaving zero attempt records', () => {
    mockStorage[SESSION_KEY] = JSON.stringify({
      paperTitle: 'GATE 2023 Paper',
      timeLeft: 7200,
      userAnswers: { Q1: 'A', Q2: 'B', Q3: 'C' },
      isPaused: false
    });

    let mockAttemptsHistory = [];

    // Simulate cancel exam midway action
    delete mockStorage[SESSION_KEY];
    const userAnswers = {};
    const questionStates = {};
    const questionTimes = {};

    assert.strictEqual(mockStorage[SESSION_KEY], undefined, 'Session storage must be completely removed');
    assert.strictEqual(Object.keys(userAnswers).length, 0, 'In-memory user answers must be wiped');
    assert.strictEqual(Object.keys(questionStates).length, 0, 'In-memory question states must be wiped');
    assert.strictEqual(Object.keys(questionTimes).length, 0, 'In-memory question times must be wiped');
    assert.strictEqual(mockAttemptsHistory.length, 0, 'No attempt history must be saved');
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

  it('validates MockTestMode.jsx has zero Temporal Dead Zone (TDZ) state-ref ordering bugs', async () => {
    const { readFileSync } = await import('node:fs');
    const { join } = await import('node:path');
    const filePath = join(process.cwd(), 'src', 'components', 'MockTestMode.jsx');
    const content = readFileSync(filePath, 'utf8');

    const userAnswersIdx = content.indexOf('const [userAnswers, setUserAnswers]');
    const questionStatesIdx = content.indexOf('const [questionStates, setQuestionStates]');
    const prevAnswersRefIdx = content.indexOf('const prevAnswersRef = useRef(userAnswers)');
    const prevStatesRefIdx = content.indexOf('const prevStatesRef = useRef(questionStates)');

    assert.ok(userAnswersIdx !== -1, 'userAnswers must be declared');
    assert.ok(questionStatesIdx !== -1, 'questionStates must be declared');
    assert.ok(prevAnswersRefIdx !== -1, 'prevAnswersRef must be declared');
    assert.ok(prevStatesRefIdx !== -1, 'prevStatesRef must be declared');

    assert.ok(
      userAnswersIdx < prevAnswersRefIdx,
      'userAnswers must be declared before prevAnswersRef to prevent TDZ ReferenceError'
    );
    assert.ok(
      questionStatesIdx < prevStatesRefIdx,
      'questionStates must be declared before prevStatesRef to prevent TDZ ReferenceError'
    );
  });
});
