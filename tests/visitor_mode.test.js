import test from 'node:test';
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

test('Visitor / Guest Preview Mode Test Suite', async (t) => {
  t.beforeEach(() => {
    localStorage.clear();
  });

  await t.test('Guest Mode Persistence & Flag Lifecycle', () => {
    // 1. Initial State: No session, no guest mode flag
    assert.equal(localStorage.getItem('gate_ag_guest_mode'), null);

    // 2. User clicks "Continue as Guest" -> sets flag
    localStorage.setItem('gate_ag_guest_mode', 'true');
    assert.equal(localStorage.getItem('gate_ag_guest_mode'), 'true');

    // 3. User logs in -> guest mode flag is cleared
    localStorage.removeItem('gate_ag_guest_mode');
    assert.equal(localStorage.getItem('gate_ag_guest_mode'), null);
  });

  await t.test('Visitor Permission Matrix Validation', () => {
    // Define the capability checker
    function checkPermission(action, isGuest) {
      const guestAllowedActions = [
        'VIEW_DASHBOARD',
        'VIEW_SYLLABUS',
        'VIEW_FORMULAS',
        'VIEW_SIMULATORS',
        'VIEW_CONCEPT_NOTES',
        'VIEW_QUESTIONS_LIST',
        'USE_CALCULATOR',
        'SEARCH_PORTAL',
        'SWITCH_THEME'
      ];

      const authRequiredActions = [
        'ATTEMPT_CBT_MOCK_TEST',
        'SUBMIT_PRACTICE_ANSWER',
        'BOOKMARK_QUESTION',
        'POST_COMMUNITY_MESSAGE',
        'POST_DISCUSSION_THREAD',
        'UPVOTE_DISCUSSION',
        'ASK_AI_TUTOR_SOLVER',
        'SYNC_OFFLINE_ATTEMPTS'
      ];

      if (!isGuest) {
        // Authenticated user can perform everything
        return { allowed: true };
      }

      if (guestAllowedActions.includes(action)) {
        return { allowed: true };
      }

      if (authRequiredActions.includes(action)) {
        return { 
          allowed: false, 
          requiresAuth: true, 
          reason: `Sign in required to perform ${action}` 
        };
      }

      return { allowed: false, requiresAuth: true };
    }

    // Test Guest permissions
    assert.equal(checkPermission('VIEW_DASHBOARD', true).allowed, true);
    assert.equal(checkPermission('VIEW_SYLLABUS', true).allowed, true);
    assert.equal(checkPermission('VIEW_FORMULAS', true).allowed, true);
    assert.equal(checkPermission('VIEW_SIMULATORS', true).allowed, true);
    assert.equal(checkPermission('USE_CALCULATOR', true).allowed, true);
    assert.equal(checkPermission('SWITCH_THEME', true).allowed, true);

    // Test Gated permissions for guest
    assert.equal(checkPermission('ATTEMPT_CBT_MOCK_TEST', true).allowed, false);
    assert.equal(checkPermission('ATTEMPT_CBT_MOCK_TEST', true).requiresAuth, true);
    assert.equal(checkPermission('SUBMIT_PRACTICE_ANSWER', true).allowed, false);
    assert.equal(checkPermission('BOOKMARK_QUESTION', true).allowed, false);
    assert.equal(checkPermission('POST_COMMUNITY_MESSAGE', true).allowed, false);
    assert.equal(checkPermission('POST_DISCUSSION_THREAD', true).allowed, false);
    assert.equal(checkPermission('ASK_AI_TUTOR_SOLVER', true).allowed, false);

    // Test Logged in student permissions
    assert.equal(checkPermission('ATTEMPT_CBT_MOCK_TEST', false).allowed, true);
    assert.equal(checkPermission('SUBMIT_PRACTICE_ANSWER', false).allowed, true);
    assert.equal(checkPermission('POST_COMMUNITY_MESSAGE', false).allowed, true);
    assert.equal(checkPermission('ASK_AI_TUTOR_SOLVER', false).allowed, true);
  });

  await t.test('Auth Gate Interceptor Functionality', () => {
    let interceptedReason = null;
    let authModalOpened = false;

    function handleRequireAuth(reason) {
      interceptedReason = reason;
      authModalOpened = true;
    }

    function mockStartMockTest(student) {
      if (!student) {
        handleRequireAuth('Sign In or Register free to attempt 180-minute official CBT Mock Tests and calculate your All-India Rank (AIR) Tier!');
        return false;
      }
      return true;
    }

    // Guest attempts to start test
    const startedAsGuest = mockStartMockTest(null);
    assert.equal(startedAsGuest, false);
    assert.equal(authModalOpened, true);
    assert.match(interceptedReason, /Sign In or Register free to attempt 180-minute/);

    // Reset and test with authenticated student
    interceptedReason = null;
    authModalOpened = false;
    const mockStudent = { id: 'stu_1', full_name: 'Test Student' };
    const startedAsStudent = mockStartMockTest(mockStudent);
    assert.equal(startedAsStudent, true);
    assert.equal(authModalOpened, false);
    assert.equal(interceptedReason, null);
  });
});
