import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// Mock Browser LocalStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, val) => { store[key] = String(val); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; },
    get length() { return Object.keys(store).length; },
    key: (i) => Object.keys(store)[i] || null
  };
})();

// Mock Browser SessionStorage
const sessionStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, val) => { store[key] = String(val); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; },
    get length() { return Object.keys(store).length; },
    key: (i) => Object.keys(store)[i] || null
  };
})();

const windowListeners = new Map();
const windowMock = {
  addEventListener: (event, handler) => {
    if (!windowListeners.has(event)) windowListeners.set(event, new Set());
    windowListeners.get(event).add(handler);
  },
  removeEventListener: (event, handler) => {
    if (windowListeners.has(event)) windowListeners.get(event).delete(handler);
  },
  dispatchEvent: (event) => {
    const type = event?.type || event;
    const handlers = windowListeners.get(type);
    if (handlers) handlers.forEach(h => h(event));
  },
  setInterval: globalThis.setInterval,
  clearInterval: globalThis.clearInterval
};

globalThis.localStorage = localStorageMock;
globalThis.sessionStorage = sessionStorageMock;
globalThis.window = windowMock;

import { 
  fetchLivePlatformStats, 
  invalidatePlatformStatsCache,
  triggerLiveStatsSync,
  registerLocalTabHeartbeat,
  unregisterLocalTabHeartbeat,
  getActiveLocalTabCount,
  subscribeToLiveStats
} from '../src/services/liveStatisticsService.js';

describe('Team Roles Removal, Live Board Privacy & Live Telemetry Sync Tests', () => {

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    invalidatePlatformStatsCache();
  });

  test('CreatorAdminHQ does not list Sahid Iqbal or Pankaj Goswami as active team members', () => {
    const filePath = path.resolve('src/components/CreatorAdminHQ.jsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    // teamMembers must be empty
    assert.match(content, /const teamMembers\s*=\s*\[\s*\];/);
    assert.doesNotMatch(content, /name:\s*["']Pankaj Goswami["']/);
    assert.doesNotMatch(content, /name:\s*["']Sahid Iqbal["']/);
    assert.match(content, /\{teamMembers\.length > 0 && \(/);
  });

  test('LiveStatisticsBoard hides personal user names and renders numbers-only telemetry', () => {
    const filePath = path.resolve('src/components/LiveStatisticsBoard.jsx');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Must not display individual user cards with user.name
    assert.doesNotMatch(content, /user\.name/);
    assert.doesNotMatch(content, /user\.college/);
    assert.match(content, /Privacy Protected • Aggregate Metrics Only/);
    assert.match(content, /\{onlineCount\} Online Active/);
    assert.match(content, /\{devices\.mobile\}%/);
    assert.match(content, /\{devices\.desktop\}%/);
  });

  test('Multi-tab local heartbeat tracks active presence and prunes stale tabs', () => {
    // Tab 1 registers
    sessionStorage.setItem('gate_ag_tab_presence_key', 'tab_1_session');
    registerLocalTabHeartbeat({ id: 'stu_1', full_name: 'Student 1' });
    assert.strictEqual(getActiveLocalTabCount(), 1);

    // Tab 2 registers
    sessionStorage.setItem('gate_ag_tab_presence_key', 'tab_2_session');
    registerLocalTabHeartbeat({ id: 'stu_2', full_name: 'Student 2' });
    assert.strictEqual(getActiveLocalTabCount(), 2);

    // Tab 1 unregisters on close
    sessionStorage.setItem('gate_ag_tab_presence_key', 'tab_1_session');
    unregisterLocalTabHeartbeat();
    assert.strictEqual(getActiveLocalTabCount(), 1);
  });

  test('fetchLivePlatformStats aggregates questions across scoped stats and practice progress caches', async () => {
    // 1. Scoped student user stats (e.g. from studentProgressSyncService)
    localStorage.setItem('gate_ag_user_stats_stu_100', JSON.stringify({
      attempted: ['q1', 'q2', 'q3', 'q4'],
      correct: ['q1', 'q2']
    }));

    // 2. Unscoped legacy stats
    localStorage.setItem('gate_ag_user_stats', JSON.stringify({
      attempted: ['q3', 'q4', 'q5'],
      correct: ['q3']
    }));

    // 3. PYQ progress map
    localStorage.setItem('gate_ag_pyq_progress', JSON.stringify({
      q6: { isCorrect: true },
      q7: { isCorrect: false }
    }));

    // 4. Custom mock progress map
    localStorage.setItem('gate_ag_custom_progress', JSON.stringify({
      q8: { isCorrect: true }
    }));

    const stats = await fetchLivePlatformStats(true);
    // Total unique questions attempted: q1, q2, q3, q4, q5, q6, q7, q8 = 8 questions
    assert.strictEqual(stats.totalQuestionsSolved, 8);
    // Total unique correct: q1, q2, q3, q6, q8 = 5 questions
    assert.strictEqual(stats.totalCorrectSolved, 5);
  });

  test('triggerLiveStatsSync invalidates cache and triggers subscriber updates', async () => {
    let subscriberCallCount = 0;
    const unsub = subscribeToLiveStats((data) => {
      subscriberCallCount++;
    });

    // Wait a brief moment for initial subscribe fetch
    await new Promise(r => setTimeout(r, 20));
    const initialCalls = subscriberCallCount;
    assert.ok(initialCalls >= 1, 'Initial subscriber fetch should trigger');

    // Trigger sync
    triggerLiveStatsSync();
    await new Promise(r => setTimeout(r, 20));

    assert.ok(subscriberCallCount > initialCalls, 'triggerLiveStatsSync should trigger subscribers');
    unsub();
  });
});
