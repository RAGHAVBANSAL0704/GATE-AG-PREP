import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { 
  fetchAndRebuildStudentStats, 
  fetchAndMergeMistakeVault, 
  syncStudentCloudData,
  LOCAL_STORAGE_USER_STATS_KEY
} from '../src/services/studentProgressSyncService.js';
import { LOCAL_STORAGE_TEST_ATTEMPTS_KEY } from '../src/services/testAttemptService.js';

// Polyfill minimal browser environment for node test runner
if (typeof globalThis.localStorage === 'undefined') {
  const store = new Map();
  globalThis.localStorage = {
    getItem: (key) => store.get(key) || null,
    setItem: (key, val) => store.set(key, String(val)),
    removeItem: (key) => store.delete(key),
    clear: () => store.clear()
  };
}

describe('Student Cross-Device Progress Synchronization Test Suite', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  it('safely handles null or undefined student', async () => {
    const stats = await fetchAndRebuildStudentStats(null);
    assert.deepEqual(stats, { attempted: [], correct: [], testHistory: [] });

    const fullSync = await syncStudentCloudData(null);
    assert.equal(fullSync.synced, false);
    assert.deepEqual(fullSync.userStats, { attempted: [], correct: [], testHistory: [] });
  });

  it('reconstructs userStats correctly from local and cloud test attempts', async () => {
    const mockStudent = {
      id: 'stud_123',
      admission_no: '2022AG55B',
      email: 'student@hau.ac.in',
      full_name: 'Raghav Bansal'
    };

    // Simulate attempts in local storage
    const mockAttempts = [
      {
        client_attempt_id: 'att_01',
        student_id: 'stud_123',
        admission_no: '2022AG55B',
        paper_title: 'GATE 2026 Official Mock',
        paper_year: '2026',
        score: 65.5,
        total_marks: 100,
        correct_count: 45,
        incorrect_count: 10,
        unattempted_count: 10,
        submitted_at: '2026-09-20T10:00:00.000Z',
        question_responses: [
          { qid: 'q_2026_01', is_attempted: true, is_correct: true, marks_awarded: 1 },
          { qid: 'q_2026_02', is_attempted: true, is_correct: false, marks_awarded: -0.33 },
          { qid: 'q_2026_03', is_attempted: false, is_correct: false, marks_awarded: 0 }
        ]
      },
      {
        client_attempt_id: 'att_02',
        student_id: 'stud_123',
        admission_no: '2022AG55B',
        paper_title: 'GATE 2025 Official Mock',
        paper_year: '2025',
        score: 72.0,
        total_marks: 100,
        correct_count: 50,
        incorrect_count: 5,
        unattempted_count: 10,
        submitted_at: '2026-09-21T10:00:00.000Z',
        question_responses: [
          { qid: 'q_2025_01', is_attempted: true, is_correct: true, marks_awarded: 2 },
          { qid: 'q_2025_02', is_attempted: true, is_correct: true, marks_awarded: 1 }
        ]
      }
    ];

    localStorage.setItem(LOCAL_STORAGE_TEST_ATTEMPTS_KEY, JSON.stringify(mockAttempts));

    const rebuilt = await fetchAndRebuildStudentStats(mockStudent);

    // Verify attempted IDs are captured
    assert.ok(rebuilt.attempted.includes('q_2026_01'));
    assert.ok(rebuilt.attempted.includes('q_2026_02'));
    assert.ok(rebuilt.attempted.includes('q_2025_01'));
    assert.ok(rebuilt.attempted.includes('q_2025_02'));
    assert.ok(!rebuilt.attempted.includes('q_2026_03')); // Unattempted

    // Verify correct IDs (q_2026_02 was incorrect so shouldn't be in correct list)
    assert.ok(rebuilt.correct.includes('q_2026_01'));
    assert.ok(!rebuilt.correct.includes('q_2026_02'));
    assert.ok(rebuilt.correct.includes('q_2025_01'));
    assert.ok(rebuilt.correct.includes('q_2025_02'));

    // Verify test history is reconstructed and sorted chronologically
    assert.equal(rebuilt.testHistory.length, 2);
    assert.equal(rebuilt.testHistory[0].year, '2025'); // Latest submitted first
    assert.equal(rebuilt.testHistory[1].year, '2026');

    // Verify it is saved to localStorage
    const saved = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_STATS_KEY));
    assert.equal(saved.testHistory.length, 2);
  });

  it('merges existing local userStats with incoming cloud attempts seamlessly', async () => {
    const mockStudent = { id: 'stud_456', admission_no: '2022AG99B' };

    const initialLocalStats = {
      attempted: ['local_q1', 'local_q2'],
      correct: ['local_q1'],
      testHistory: [
        { year: '2024', score: 50, date: '2026-09-18T10:00:00.000Z' }
      ]
    };

    const mockAttempts = [
      {
        client_attempt_id: 'att_remote_1',
        student_id: 'stud_456',
        admission_no: '2022AG99B',
        paper_year: '2026',
        score: 80,
        submitted_at: '2026-09-22T10:00:00.000Z',
        question_responses: [
          { qid: 'remote_q1', is_attempted: true, is_correct: true }
        ]
      }
    ];

    localStorage.setItem(LOCAL_STORAGE_TEST_ATTEMPTS_KEY, JSON.stringify(mockAttempts));

    const rebuilt = await fetchAndRebuildStudentStats(mockStudent, initialLocalStats);

    assert.ok(rebuilt.attempted.includes('local_q1'));
    assert.ok(rebuilt.attempted.includes('local_q2'));
    assert.ok(rebuilt.attempted.includes('remote_q1'));
    assert.equal(rebuilt.testHistory.length, 2);
  });

  it('handles full syncStudentCloudData execution cleanly', async () => {
    const student = { id: 'test_student', admission_no: 'TEST001' };
    const result = await syncStudentCloudData(student);
    assert.equal(typeof result, 'object');
    assert.ok(Array.isArray(result.userStats.attempted));
    assert.ok(Array.isArray(result.userStats.correct));
    assert.ok(Array.isArray(result.userStats.testHistory));
    assert.equal(result.synced, true);
  });

});
