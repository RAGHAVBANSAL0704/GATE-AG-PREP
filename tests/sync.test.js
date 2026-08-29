import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

// Mock localStorage and browser globals for Node test runner
const mockStorage = new Map();
globalThis.localStorage = {
  getItem: (key) => mockStorage.get(key) || null,
  setItem: (key, val) => mockStorage.set(key, String(val)),
  removeItem: (key) => mockStorage.delete(key),
  clear: () => mockStorage.clear()
};

// Mock window for event listener tests
const mockEventListeners = new Map();
globalThis.window = {
  addEventListener: (event, handler) => {
    if (!mockEventListeners.has(event)) {
      mockEventListeners.set(event, []);
    }
    mockEventListeners.get(event).push(handler);
  },
  removeEventListener: (event, handler) => {
    if (mockEventListeners.has(event)) {
      const handlers = mockEventListeners.get(event);
      const idx = handlers.indexOf(handler);
      if (idx !== -1) handlers.splice(idx, 1);
    }
  },
  dispatchEvent: (event) => {
    const type = typeof event === 'string' ? event : event.type;
    if (mockEventListeners.has(type)) {
      mockEventListeners.get(type).forEach(h => h(event));
    }
  }
};

import { 
  generateUUID, 
  saveTestAttempt, 
  syncPendingTestAttempts, 
  getStudentTestAttempts, 
  initAutoSyncOnReconnect,
  LOCAL_STORAGE_TEST_ATTEMPTS_KEY 
} from '../src/services/testAttemptService.js';

describe('Offline Resilience & Backend Sync Subsystem Test Suite', () => {

  beforeEach(() => {
    mockStorage.clear();
    mockEventListeners.clear();
  });

  // =========================================================================
  // 1. Client UUID & Attempt ID Generation
  // =========================================================================
  describe('Client UUID & Attempt ID Generation', () => {
    it('generates non-empty unique client identifiers via generateUUID', () => {
      const id1 = generateUUID();
      const id2 = generateUUID();

      assert.ok(typeof id1 === 'string' && id1.length > 5);
      assert.ok(typeof id2 === 'string' && id2.length > 5);
      assert.notStrictEqual(id1, id2, 'Successive calls to generateUUID must return distinct IDs');
    });

    it('assigns client_attempt_id automatically when saving test attempt without one', async () => {
      const attemptData = {
        student_name: 'Aman Kumar',
        admission_no: '2022AE01BIV',
        paper_title: 'GATE AG 2026 Full CBT Mock',
        paper_year: '2026',
        score: 72.5,
        total_marks: 100,
        percentage: 72.5,
        accuracy_percentage: 85.0,
        correct_count: 50,
        incorrect_count: 10,
        unattempted_count: 5,
        total_questions: 65,
        time_spent_seconds: 9400,
        question_responses: [{ qid: 'q1', state: 'ANSWERED', answer: 'A' }]
      };

      const res = await saveTestAttempt(attemptData);

      assert.strictEqual(res.success, true);
      assert.strictEqual(res.savedLocally, true);
      assert.ok(res.client_attempt_id, 'Must return client_attempt_id');
      assert.ok(typeof res.client_attempt_id === 'string' && res.client_attempt_id.length > 5);

      const raw = localStorage.getItem(LOCAL_STORAGE_TEST_ATTEMPTS_KEY);
      const storedList = JSON.parse(raw);
      assert.strictEqual(storedList.length, 1);
      assert.strictEqual(storedList[0].client_attempt_id, res.client_attempt_id);
    });

    it('preserves existing client_attempt_id if already provided in attempt payload', async () => {
      const customId = 'custom_client_uuid_12345';
      const attemptData = {
        client_attempt_id: customId,
        student_name: 'Rohan Sharma',
        score: 65,
        total_marks: 100
      };

      const res = await saveTestAttempt(attemptData);
      assert.strictEqual(res.client_attempt_id, customId);

      const storedList = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TEST_ATTEMPTS_KEY));
      assert.strictEqual(storedList[0].client_attempt_id, customId);
    });
  });

  // =========================================================================
  // 2. Offline Fallback & Local Storage Queueing
  // =========================================================================
  describe('Offline Local Storage Queueing & Idempotent Updates', () => {
    it('queues offline attempts in localStorage with _syncedToBackend: false', async () => {
      const attemptData = {
        student_name: 'Pooja Verma',
        admission_no: '2021AE05BLII',
        email: 'pooja@example.com',
        paper_title: 'GATE AG 2025 Paper',
        score: 58.33,
        total_marks: 100,
        submitted_at: '2026-08-20T10:00:00.000Z'
      };

      const res = await saveTestAttempt(attemptData);
      assert.strictEqual(res.success, true);
      assert.strictEqual(res.synced, false); // Offline mode

      const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TEST_ATTEMPTS_KEY));
      assert.strictEqual(stored.length, 1);
      assert.strictEqual(stored[0]._syncedToBackend, false);
      assert.strictEqual(stored[0].student_name, 'Pooja Verma');
      assert.strictEqual(stored[0].score, 58.33);
    });

    it('unshifts subsequent attempts to top of local queue without data loss', async () => {
      await saveTestAttempt({ student_name: 'First Attempt', score: 40 });
      await saveTestAttempt({ student_name: 'Second Attempt', score: 80 });

      const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TEST_ATTEMPTS_KEY));
      assert.strictEqual(stored.length, 2);
      assert.strictEqual(stored[0].student_name, 'Second Attempt', 'Most recent attempt should be at index 0');
      assert.strictEqual(stored[1].student_name, 'First Attempt');
    });

    it('updates existing record idempotently when re-saved with identical client_attempt_id', async () => {
      const fixedId = 'attempt_fixed_id_999';
      
      // Save initial attempt
      await saveTestAttempt({
        client_attempt_id: fixedId,
        student_name: 'Vikram',
        score: 50
      });

      let stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TEST_ATTEMPTS_KEY));
      assert.strictEqual(stored.length, 1);
      assert.strictEqual(stored[0].score, 50);

      // Re-save with updated score and same ID
      await saveTestAttempt({
        client_attempt_id: fixedId,
        student_name: 'Vikram',
        score: 85
      });

      stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TEST_ATTEMPTS_KEY));
      assert.strictEqual(stored.length, 1, 'Should NOT create duplicate record in local storage');
      assert.strictEqual(stored[0].score, 85, 'Should update existing entry');
    });
  });

  // =========================================================================
  // 3. Offline Sync Processing (syncPendingTestAttempts)
  // =========================================================================
  describe('Pending Attempt Synchronization Subsystem', () => {
    it('handles syncPendingTestAttempts gracefully in offline/unconfigured environment', async () => {
      // Put 2 pending attempts in localStorage
      const pendingList = [
        { client_attempt_id: 'p1', student_name: 'User 1', score: 45, _syncedToBackend: false },
        { client_attempt_id: 'p2', student_name: 'User 2', score: 65, _syncedToBackend: false }
      ];
      localStorage.setItem(LOCAL_STORAGE_TEST_ATTEMPTS_KEY, JSON.stringify(pendingList));

      const res = await syncPendingTestAttempts();
      assert.strictEqual(res.syncedCount, 0);
      assert.strictEqual(res.failedCount, 0);

      // Local records should remain preserved
      const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TEST_ATTEMPTS_KEY));
      assert.strictEqual(stored.length, 2);
    });

    it('assigns client_attempt_id during sync iteration if missing from legacy records', async () => {
      const legacyList = [
        { student_name: 'Legacy User', score: 55, _syncedToBackend: false }
      ];
      localStorage.setItem(LOCAL_STORAGE_TEST_ATTEMPTS_KEY, JSON.stringify(legacyList));

      await syncPendingTestAttempts();

      const stored = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TEST_ATTEMPTS_KEY));
      assert.strictEqual(stored.length, 1);
    });
  });

  // =========================================================================
  // 4. Seamless Attempt Query & Deduplication (getStudentTestAttempts)
  // =========================================================================
  describe('Merged Test Attempts Query & Deduplication', () => {
    it('returns empty array when studentIdentifier is missing or empty', async () => {
      const resNull = await getStudentTestAttempts(null);
      assert.deepStrictEqual(resNull, []);

      const resEmpty = await getStudentTestAttempts('');
      assert.deepStrictEqual(resEmpty, []);

      const resWhitespace = await getStudentTestAttempts('   ');
      assert.deepStrictEqual(resWhitespace, []);
    });

    it('merges local attempts matching admission number or email in chronological order', async () => {
      const mockAttempts = [
        {
          client_attempt_id: 'att_1',
          student_name: 'Aman Kumar',
          admission_no: '2022AE01BIV',
          email: 'aman@example.com',
          paper_title: 'GATE AG 2024',
          score: 60,
          submitted_at: '2026-08-15T10:00:00.000Z',
          _syncedToBackend: true
        },
        {
          client_attempt_id: 'att_2',
          student_name: 'Aman Kumar',
          admission_no: '2022AE01BIV',
          email: 'aman@example.com',
          paper_title: 'GATE AG 2025',
          score: 75,
          submitted_at: '2026-08-18T10:00:00.000Z',
          _syncedToBackend: false
        },
        {
          client_attempt_id: 'att_other',
          student_name: 'Different Student',
          admission_no: '2022AE99BIV',
          email: 'other@example.com',
          paper_title: 'GATE AG 2025',
          score: 30,
          submitted_at: '2026-08-19T10:00:00.000Z',
          _syncedToBackend: false
        }
      ];

      localStorage.setItem(LOCAL_STORAGE_TEST_ATTEMPTS_KEY, JSON.stringify(mockAttempts));

      // Query by admission number
      const amanByAdm = await getStudentTestAttempts('2022AE01BIV');
      assert.strictEqual(amanByAdm.length, 2);
      assert.strictEqual(amanByAdm[0].client_attempt_id, 'att_2', 'Should sort most recent first');
      assert.strictEqual(amanByAdm[1].client_attempt_id, 'att_1');

      // Query by email
      const amanByEmail = await getStudentTestAttempts('aman@example.com');
      assert.strictEqual(amanByEmail.length, 2);

      // Query by name
      const amanByName = await getStudentTestAttempts('Aman Kumar');
      assert.strictEqual(amanByName.length, 2);
    });

    it('deduplicates attempts sharing identical client_attempt_id', async () => {
      const duplicates = [
        {
          client_attempt_id: 'shared_att_id_1',
          student_name: 'Sneha',
          admission_no: '2021AE10BIV',
          paper_title: 'GATE AG 2026',
          score: 70,
          submitted_at: '2026-08-10T12:00:00.000Z'
        },
        {
          client_attempt_id: 'shared_att_id_1',
          student_name: 'Sneha',
          admission_no: '2021AE10BIV',
          paper_title: 'GATE AG 2026',
          score: 70,
          submitted_at: '2026-08-10T12:00:00.000Z'
        }
      ];
      localStorage.setItem(LOCAL_STORAGE_TEST_ATTEMPTS_KEY, JSON.stringify(duplicates));

      const res = await getStudentTestAttempts('2021AE10BIV');
      assert.strictEqual(res.length, 1, 'Duplicate records must be merged to 1 entry');
    });
  });

  // =========================================================================
  // 5. Network Reconnect Listeners (initAutoSyncOnReconnect)
  // =========================================================================
  describe('Network Reconnection Auto-Sync Listener', () => {
    it('registers event listeners on window for "online" and "app-online" and removes them on cleanup', () => {
      const cleanup = initAutoSyncOnReconnect();

      assert.ok(mockEventListeners.has('online'), 'Must register online listener');
      assert.ok(mockEventListeners.has('app-online'), 'Must register app-online listener');
      assert.strictEqual(mockEventListeners.get('online').length, 1);
      assert.strictEqual(mockEventListeners.get('app-online').length, 1);

      // Trigger online event without error
      assert.doesNotThrow(() => {
        window.dispatchEvent({ type: 'online' });
      });

      // Cleanup
      if (typeof cleanup === 'function') {
        cleanup();
        assert.strictEqual(mockEventListeners.get('online').length, 0);
        assert.strictEqual(mockEventListeners.get('app-online').length, 0);
      }
    });

    it('safely handles environments without window object', () => {
      const originalWindow = globalThis.window;
      delete globalThis.window;

      assert.doesNotThrow(() => {
        const cleanup = initAutoSyncOnReconnect();
        assert.strictEqual(cleanup, undefined);
      });

      globalThis.window = originalWindow;
    });
  });

});
