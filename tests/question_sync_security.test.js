import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

// Mock localStorage and sessionStorage for Node environment
const mockLocalStorage = new Map();
const mockSessionStorage = new Map();

globalThis.localStorage = {
  getItem: (key) => mockLocalStorage.get(key) || null,
  setItem: (key, val) => mockLocalStorage.set(key, String(val)),
  removeItem: (key) => mockLocalStorage.delete(key),
  clear: () => mockLocalStorage.clear()
};

globalThis.sessionStorage = {
  getItem: (key) => mockSessionStorage.get(key) || null,
  setItem: (key, val) => mockSessionStorage.set(key, String(val)),
  removeItem: (key) => mockSessionStorage.delete(key),
  clear: () => mockSessionStorage.clear()
};

import {
  getLocalEditedQuestionsMap,
  saveAndBroadcastQuestion,
  deleteAndBroadcastQuestion,
  processAndOptimizeImageFile,
  subscribeToLiveQuestionSync,
  isAdminUnlocked,
  setAdminUnlocked,
  verifyAdminPasscode,
  setCustomAdminPasscode
} from '../src/services/questionSyncService.js';

describe('Question Live Multi-Device Sync & Admin Passcode Security Tests', () => {

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  test('saves and retrieves edited questions from local store with difficulty, hints, and image_url', async () => {
    assert.deepEqual(getLocalEditedQuestionsMap(), {});

    const mockQ = {
      id: 'gate_2026_q1',
      question: 'Updated draft question text with figure',
      correct_answer: 'B',
      marks: 2,
      difficulty: 'Difficult',
      image_url: 'data:image/webp;base64,UklGRkAAAABXRUJQVlA4IDQAAADwAQCdASoBAAEAAQAcJaACdLoAAP7/2QAA',
      hints: [
        'Hint 1: Draft equation',
        'Hint 2: Convert ha to m2',
        'Hint 3: Substitute Q'
      ]
    };

    const saved = await saveAndBroadcastQuestion(mockQ);
    assert.equal(saved, true);

    const map = getLocalEditedQuestionsMap();
    assert.equal(map['gate_2026_q1']?.correct_answer, 'B');
    assert.equal(map['gate_2026_q1']?.marks, 2);
    assert.equal(map['gate_2026_q1']?.difficulty, 'Difficult');
    assert.equal(map['gate_2026_q1']?.image_url.startsWith('data:image/webp'), true);
    assert.equal(map['gate_2026_q1']?.hints.length, 3);
  });

  test('deletes and broadcasts question removal to revert to original', async () => {
    const mockQ = { id: 'gate_2026_q5', question: 'Temporary edit', correct_answer: 'C' };
    await saveAndBroadcastQuestion(mockQ);
    assert.equal(getLocalEditedQuestionsMap()['gate_2026_q5']?.correct_answer, 'C');

    const deleted = await deleteAndBroadcastQuestion('gate_2026_q5');
    assert.equal(deleted, true);
    assert.equal(getLocalEditedQuestionsMap()['gate_2026_q5'], undefined);
  });

  test('processAndOptimizeImageFile rejects non-image inputs safely', async () => {
    await assert.rejects(
      async () => {
        await processAndOptimizeImageFile(null);
      },
      { message: 'No file provided' }
    );

    const fakeTextFile = { name: 'notes.txt', type: 'text/plain', size: 120 };
    await assert.rejects(
      async () => {
        await processAndOptimizeImageFile(fakeTextFile);
      },
      { message: 'Selected file must be an image (PNG, JPEG, WebP, SVG, GIF)' }
    );
  });

  test('verifies master and default admin passcodes correctly', () => {
    assert.equal(verifyAdminPasscode('gateag2026'), true);
    assert.equal(verifyAdminPasscode('raghav0704'), true);
    assert.equal(verifyAdminPasscode('admin2026'), true);
    assert.equal(verifyAdminPasscode('GATEAG2026'), true); // case insensitive

    assert.equal(verifyAdminPasscode('wrong_password'), false);
    assert.equal(verifyAdminPasscode(''), false);
    assert.equal(verifyAdminPasscode(null), false);
  });

  test('manages session-based admin unlock state', () => {
    assert.equal(isAdminUnlocked(), false);

    setAdminUnlocked(true);
    assert.equal(isAdminUnlocked(), true);

    setAdminUnlocked(false);
    assert.equal(isAdminUnlocked(), false);

    // Official admin student role automatically passes
    const adminStudent = { id: 'admin1', is_admin: true, student_type: 'admin' };
    assert.equal(isAdminUnlocked(adminStudent), true);
  });

  test('allows custom admin passcode updates with valid authorization', () => {
    const failRes = setCustomAdminPasscode('wrong_old_code', 'new_pass_1234');
    assert.equal(failRes.success, false);

    const successRes = setCustomAdminPasscode('gateag2026', 'custom_master_9999');
    assert.equal(successRes.success, true);
    assert.equal(verifyAdminPasscode('custom_master_9999'), true);
  });

  test('subscribes and unsubscribes cleanly without throwing errors', () => {
    let received = null;
    const unsub = subscribeToLiveQuestionSync((q) => {
      received = q;
    });

    assert.equal(typeof unsub, 'function');
    unsub();
  });

  test('verifies getQuestionNumber correctly parses numeric and formatted IDs', async () => {
    const { getQuestionNumber } = await import('../src/utils/questionUtils.js');

    assert.equal(getQuestionNumber({ qnum: 65 }), 65);
    assert.equal(getQuestionNumber({ qnum: '45' }), 45);
    assert.equal(getQuestionNumber({ id: 'GATE_2022_Q65' }), 65);
    assert.equal(getQuestionNumber({ id: 'GATE_2027_MOCK_01_Q45' }), 45);
    assert.equal(getQuestionNumber({ id: 'custom_mock_99' }), 99);
    assert.equal(getQuestionNumber({}, 5), 6);
  });

  test('sorts question palette deterministically so Q65 opens question 65', async () => {
    const { getQuestionNumber, sortQuestionsByNumber } = await import('../src/utils/questionUtils.js');

    const rawUnsortedList = [
      { id: 'GATE_2022_Q4', qnum: 4 },
      { id: 'GATE_2022_Q65', qnum: 65 },
      { id: 'GATE_2022_Q45', qnum: 45 },
      { id: 'GATE_2022_Q1', qnum: 1 }
    ];

    const sortedList = sortQuestionsByNumber(rawUnsortedList);

    assert.equal(sortedList[0].qnum, 1);
    assert.equal(sortedList[1].qnum, 4);
    assert.equal(sortedList[2].qnum, 45);
    assert.equal(sortedList[3].qnum, 65);

    // Clicking tile 4 (index 3) opens Q65
    assert.equal(sortedList[3].id, 'GATE_2022_Q65');
  });

});
