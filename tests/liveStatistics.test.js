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

  test('fetches real platform statistics with zero baseline when no data exists', async () => {
    const stats = await fetchLivePlatformStats(true);

    assert.ok(stats, 'Stats object must be defined');
    assert.strictEqual(typeof stats.totalRegisteredStudents, 'number');
    assert.strictEqual(typeof stats.totalQuestionsSolved, 'number');
    assert.strictEqual(typeof stats.totalSessionLogins, 'number');
    assert.strictEqual(typeof stats.overallAccuracy, 'number');
    assert.strictEqual(stats.totalMockTestsCompleted, 0);
    assert.strictEqual(stats.avgScore, 0);
    assert.strictEqual(stats.highestScore, 0);
    assert.ok(Array.isArray(stats.scoreDistribution), 'scoreDistribution must be an array');
    assert.strictEqual(stats.scoreDistribution.length, 4);
    
    // Each tier must have count 0 and percentage 0
    stats.scoreDistribution.forEach(tier => {
      assert.strictEqual(tier.count, 0, `Tier ${tier.label} count must be 0`);
      assert.strictEqual(tier.percentage, 0, `Tier ${tier.label} percentage must be 0`);
    });

    assert.ok(Array.isArray(stats.colleges), 'Colleges must be an array');
    assert.ok(Array.isArray(stats.liveActivityFeed), 'Live activity feed must be an array');
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

  test('aggregates question counts and test attempts from localStorage correctly and computes accurate AIR tiers', async () => {
    // Mock 4 attempts spanning each tier
    const mockAttempts = [
      {
        client_attempt_id: 'att_top_tier',
        student_name: 'Topper Aspirant',
        correct_count: 50,
        incorrect_count: 5,
        score: 75.0,
        paper_title: 'GATE AG 2026 Mock 1'
      },
      {
        client_attempt_id: 'att_comp_tier',
        student_name: 'Competitive Aspirant',
        correct_count: 40,
        incorrect_count: 10,
        score: 55.0,
        paper_title: 'GATE AG 2026 Mock 2'
      },
      {
        client_attempt_id: 'att_dev_tier',
        student_name: 'Developing Aspirant',
        correct_count: 30,
        incorrect_count: 15,
        score: 38.0,
        paper_title: 'GATE AG 2026 Mock 3'
      },
      {
        client_attempt_id: 'att_rev_tier',
        student_name: 'Revision Aspirant',
        correct_count: 15,
        incorrect_count: 25,
        score: 18.0,
        paper_title: 'GATE AG 2026 Mock 4'
      }
    ];

    localStorage.setItem('gate_ag_prep_test_attempts', JSON.stringify(mockAttempts));

    const stats = await fetchLivePlatformStats(true);
    assert.strictEqual(stats.totalMockTestsCompleted, 4);
    assert.strictEqual(stats.highestScore, 75.0);
    assert.strictEqual(stats.avgScore, (75 + 55 + 38 + 18) / 4); // 46.5
    
    // Each of the 4 tiers should have count: 1 and percentage: 25.0%
    const topTier = stats.scoreDistribution.find(t => t.label.includes('Top Tier'));
    const compTier = stats.scoreDistribution.find(t => t.label.includes('Competitive Zone'));
    const devTier = stats.scoreDistribution.find(t => t.label.includes('Developing Zone'));
    const revTier = stats.scoreDistribution.find(t => t.label.includes('Needs Revision'));

    assert.strictEqual(topTier.count, 1);
    assert.strictEqual(topTier.percentage, 25.0);

    assert.strictEqual(compTier.count, 1);
    assert.strictEqual(compTier.percentage, 25.0);

    assert.strictEqual(devTier.count, 1);
    assert.strictEqual(devTier.percentage, 25.0);

    assert.strictEqual(revTier.count, 1);
    assert.strictEqual(revTier.percentage, 25.0);
  });

  test('formatLiveRelativeTime properly formats timestamps', () => {
    const now = Date.now();
    assert.strictEqual(formatLiveRelativeTime(now - 10000), 'Just now');
    assert.strictEqual(formatLiveRelativeTime(now - 120000), '2m ago');
    assert.strictEqual(formatLiveRelativeTime(now - 7200000), '2h ago');
    assert.strictEqual(formatLiveRelativeTime(now - 172800000), '2d ago');
  });
});
