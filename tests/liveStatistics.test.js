import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

// Mock Browser LocalStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, val) => { store[key] = String(val); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();

globalThis.localStorage = localStorageMock;

import { 
  fetchLivePlatformStats, 
  recordLiveAction, 
  getLocalLiveActivityFeed, 
  formatLiveRelativeTime 
} from '../src/services/liveStatisticsService.js';

describe('Real-Time Live Statistics & Telemetry Subsystem', () => {
  
  beforeEach(() => {
    localStorage.clear();
  });

  test('fetches real platform statistics with valid initial baseline and counts', async () => {
    const stats = await fetchLivePlatformStats();

    assert.ok(stats, 'Stats object must be defined');
    assert.strictEqual(typeof stats.totalRegisteredStudents, 'number');
    assert.ok(stats.totalRegisteredStudents >= 1, 'Registered students count must be >= 1');
    assert.strictEqual(typeof stats.totalQuestionsSolved, 'number');
    assert.strictEqual(typeof stats.totalSessionLogins, 'number');
    assert.ok(stats.totalSessionLogins >= 1, 'Total session logins must be >= 1');
    assert.strictEqual(typeof stats.overallAccuracy, 'number');
    assert.ok(Array.isArray(stats.colleges), 'Colleges must be an array');
    assert.ok(Array.isArray(stats.liveActivityFeed), 'Live activity feed must be an array');
    assert.ok(stats.liveActivityFeed.length > 0, 'Live activity feed must have baseline entries');
  });

  test('records a new live activity event and updates feed with real details', () => {
    const customEvent = recordLiveAction({
      type: 'question_solved',
      studentName: 'Test Aspirant Hisar',
      collegeName: 'COAET CCS HAU Hisar',
      details: 'Solved 12 Farm Machinery questions with 100% accuracy',
      count: 12,
      score: 24,
      section: 'Farm Machinery & Power'
    });

    assert.ok(customEvent.id, 'Event must have unique id');
    assert.strictEqual(customEvent.studentName, 'Test Aspirant Hisar');
    assert.strictEqual(customEvent.count, 12);
    assert.strictEqual(customEvent.score, 24);

    const feed = getLocalLiveActivityFeed();
    const found = feed.find(e => e.id === customEvent.id);
    assert.ok(found, 'Recorded live event must exist in feed');
    assert.strictEqual(found.studentName, 'Test Aspirant Hisar');
  });

  test('increments session login count when session_login event is recorded', async () => {
    recordLiveAction({
      type: 'session_login',
      studentName: 'New Logged Aspirant',
      collegeName: 'GBPUAT Pantnagar',
      details: 'Logged into portal'
    });

    const stats = await fetchLivePlatformStats();
    assert.ok(stats.totalSessionLogins >= 2, 'Total session logins should reflect the new login event');
  });

  test('aggregates question counts and test attempts from localStorage correctly', async () => {
    // Mock 2 local test attempts
    const mockAttempts = [
      {
        client_attempt_id: 'att_test_1',
        student_name: 'Aspirant 1',
        correct_count: 35,
        incorrect_count: 10,
        score: 45.0,
        paper_title: 'GATE AG 2026'
      },
      {
        client_attempt_id: 'att_test_2',
        student_name: 'Aspirant 2',
        correct_count: 40,
        incorrect_count: 5,
        score: 55.0,
        paper_title: 'Farm Machinery Practice Test'
      }
    ];

    localStorage.setItem('gate_ag_prep_test_attempts', JSON.stringify(mockAttempts));

    const stats = await fetchLivePlatformStats();
    assert.ok(stats.totalQuestionsSolved >= (35 + 10 + 40 + 5), 'Total questions solved should aggregate all attempts');
    assert.ok(stats.totalMockTestsCompleted >= 2, 'Total mock tests completed should be >= 2');
  });

  test('formatLiveRelativeTime properly formats timestamps', () => {
    const now = Date.now();
    assert.strictEqual(formatLiveRelativeTime(now - 10000), 'Just now');
    assert.strictEqual(formatLiveRelativeTime(now - 120000), '2m ago');
    assert.strictEqual(formatLiveRelativeTime(now - 7200000), '2h ago');
    assert.strictEqual(formatLiveRelativeTime(now - 172800000), '2d ago');
  });
});
