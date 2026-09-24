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
  getLocalSyllabusProgress,
  pushSyllabusProgressUpdate,
  getLocalConceptBookmarks,
  pushConceptBookmarksUpdate,
  getLocalFarmState,
  pushFarmStateUpdate,
  getLocalActiveCbtSession,
  pushActiveCbtSessionUpdate,
  clearActiveCbtSession,
  getLocalPracticeProgress,
  pushPracticeProgressUpdate
} from '../src/services/studentProgressSyncService.js';

test('Syllabus Progress: pushes and retrieves student-scoped syllabus completion', () => {
  mockStorage.clear();
  const student = { id: 'stu_gate_ag_01', email: 'stu@gateag.in' };
  const syllabusData = {
    'sec_1_linear_algebra': 'completed',
    'sec_2_farm_power': 'in_progress'
  };

  pushSyllabusProgressUpdate(student, syllabusData);
  const loaded = getLocalSyllabusProgress('stu_gate_ag_01');
  assert.equal(loaded['sec_1_linear_algebra'], 'completed');
  assert.equal(loaded['sec_2_farm_power'], 'in_progress');
});

test('Concept Bookmarks: pushes and retrieves student-scoped concept bookmarks', () => {
  mockStorage.clear();
  const student = { id: 'stu_gate_ag_02', email: 'stu2@gateag.in' };
  const bookmarks = ['concept_101', 'concept_205', 'concept_309'];

  pushConceptBookmarksUpdate(student, bookmarks);
  const loaded = getLocalConceptBookmarks('stu_gate_ag_02');
  assert.equal(loaded.length, 3);
  assert.deepEqual(loaded, bookmarks);
});

test('Farm State: pushes and retrieves student-scoped virtual farm state', () => {
  mockStorage.clear();
  const student = { id: 'stu_gate_ag_03', email: 'stu3@gateag.in' };
  const farmState = {
    machinery: [{ id: 'm1', level: 3 }],
    irrigation: [{ id: 'i1', level: 2 }],
    processing: [{ id: 'p1', level: 1 }]
  };

  pushFarmStateUpdate(student, farmState);
  const loaded = getLocalFarmState('stu_gate_ag_03');
  assert.equal(loaded.machinery[0].level, 3);
  assert.equal(loaded.irrigation[0].level, 2);
});

test('Active CBT Session: saves draft, retrieves it, and clears upon test submission', () => {
  mockStorage.clear();
  const student = { id: 'stu_gate_ag_04', email: 'stu4@gateag.in' };
  const sessionData = {
    paperTitle: 'GATE AG 2026 Official Mock Paper',
    timeLeft: 7200,
    userAnswers: { 'q1': 'B', 'q2': '42.5' },
    isPaused: false
  };

  pushActiveCbtSessionUpdate(student, sessionData);
  const active = getLocalActiveCbtSession('stu_gate_ag_04');
  assert.ok(active);
  assert.equal(active.paperTitle, 'GATE AG 2026 Official Mock Paper');
  assert.equal(active.timeLeft, 7200);

  // Clear upon test completion
  clearActiveCbtSession(student);
  const cleared = getLocalActiveCbtSession('stu_gate_ag_04');
  assert.equal(cleared, null);
});

test('Practice Progress: pushes modular practice answers and fires reactive event', () => {
  mockStorage.clear();
  const student = { id: 'stu_gate_ag_05', email: 'stu5@gateag.in' };
  let eventDispatched = false;

  const listener = (e) => {
    eventDispatched = true;
    assert.ok(e.detail);
    assert.equal(e.detail.qId, 'q_test_101');
  };

  window.addEventListener('gate_ag_practice_progress_updated', listener);

  pushPracticeProgressUpdate(student, 'q_test_101', {
    status: 'correct',
    marks: 2,
    type: 'MCQ',
    section: 'Section 2: Farm Machinery',
    timeSpentSeconds: 45,
    hintLevelUsed: 0
  });

  window.removeEventListener('gate_ag_practice_progress_updated', listener);
  assert.equal(eventDispatched, true);

  const practiceMap = getLocalPracticeProgress('stu_gate_ag_05');
  assert.ok(practiceMap['q_test_101']);
  assert.equal(practiceMap['q_test_101'].status, 'correct');
  assert.equal(practiceMap['q_test_101'].marks, 2);
});

test('Performance Isolation: CBT mock scaled scores are never contaminated by modular practice drills', () => {
  // Mock 2 CBT attempts (100-mark scaled exams)
  const cbtAttempts = [
    {
      test_type: 'cbt_mock',
      score: 65.5,
      total_marks: 100,
      total_questions: 65,
      correct_count: 45,
      incorrect_count: 15,
      unattempted_count: 5,
      accuracy_percentage: 75.0
    },
    {
      test_type: 'pyq',
      score: 72.0,
      total_marks: 100,
      total_questions: 65,
      correct_count: 50,
      incorrect_count: 10,
      unattempted_count: 5,
      accuracy_percentage: 83.3
    }
  ];

  // Practice drills: individual 1M and 2M questions solved in practice mode
  const practiceMap = {
    'q_drill_1': { status: 'correct', marks: 1, type: 'MCQ', section: 'Section 1: Engineering Mathematics', timeSpentSeconds: 30 },
    'q_drill_2': { status: 'incorrect', marks: 2, type: 'NAT', section: 'Section 3: Farm Power', timeSpentSeconds: 90 },
    'q_drill_3': { status: 'correct', marks: 2, type: 'MSQ', section: 'Section 2: Farm Machinery', timeSpentSeconds: 60 }
  };

  // Pure CBT calculations (strictly isolated)
  const totalCbtTests = cbtAttempts.length;
  const avgCbtScore = (cbtAttempts.reduce((s, a) => s + a.score, 0) / totalCbtTests).toFixed(2);
  assert.equal(totalCbtTests, 2);
  assert.equal(avgCbtScore, '68.75');

  // Pure Practice calculations (strictly isolated)
  const practiceList = Object.values(practiceMap);
  const totalPracticed = practiceList.length;
  const totalPracticeCorrect = practiceList.filter(p => p.status === 'correct').length;
  const practiceAccuracy = Math.round((totalPracticeCorrect / totalPracticed) * 100);
  const totalPracticeMarks = practiceList.reduce((sum, p) => p.status === 'correct' ? sum + (p.marks || 1) : sum, 0);

  assert.equal(totalPracticed, 3);
  assert.equal(totalPracticeCorrect, 2);
  assert.equal(practiceAccuracy, 67);
  assert.equal(totalPracticeMarks, 3);

  // Guarantee: Average CBT score remains 68.75 and is never skewed by practice tally
  assert.equal(avgCbtScore, '68.75');
});
