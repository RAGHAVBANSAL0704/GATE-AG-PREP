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

import { 
  generateUUID, 
  saveTestAttempt, 
  getStudentTestAttempts, 
  LOCAL_STORAGE_TEST_ATTEMPTS_KEY 
} from '../src/services/testAttemptService.js';

describe('Test & Practice History Persistence and Analysis Subsystem', () => {

  beforeEach(() => {
    mockStorage.clear();
  });

  describe('Practice Session History Saving & Retrieval', () => {
    it('persists a practice session attempt with full question responses and metrics', async () => {
      const practiceAttempt = {
        client_attempt_id: 'prac_att_001',
        paper_title: 'Practice: 10 Qs (Farm Machinery, Soil & Water)',
        paper_year: 'Practice Hub',
        test_type: 'practice_session',
        score: 8.5,
        total_marks: 10,
        percentage: 85,
        accuracy_percentage: 80,
        correct_count: 8,
        incorrect_count: 2,
        unattempted_count: 0,
        total_questions: 10,
        time_spent_seconds: 480,
        question_responses: [
          {
            question_id: 'q1',
            qnum: 1,
            section: 'Section 2: Farm Machinery',
            type: 'MCQ',
            marks: 1,
            user_answer: 'B',
            correct_answer: 'B',
            is_correct: true,
            is_attempted: true,
            marks_awarded: 1,
            time_spent_seconds: 45,
            status: 'CORRECT'
          },
          {
            question_id: 'q2',
            qnum: 2,
            section: 'Section 4: Soil and Water Conservation Engineering',
            type: 'NAT',
            marks: 2,
            user_answer: '14.5',
            correct_answer: '15.0',
            is_correct: false,
            is_attempted: true,
            marks_awarded: 0,
            time_spent_seconds: 90,
            status: 'INCORRECT'
          }
        ],
        student_id: 'stu_123',
        student_name: 'Priya Sharma',
        admission_no: '2023AE05BIV',
        email: 'priya@example.com'
      };

      const result = await saveTestAttempt(practiceAttempt);
      assert.strictEqual(result.success, true);
      assert.strictEqual(result.client_attempt_id, 'prac_att_001');

      // Verify stored in localStorage
      const rawStored = localStorage.getItem(LOCAL_STORAGE_TEST_ATTEMPTS_KEY);
      assert.ok(rawStored, 'localStorage should contain saved attempts');
      const parsed = JSON.parse(rawStored);
      assert.strictEqual(parsed.length, 1);
      assert.strictEqual(parsed[0].test_type, 'practice_session');
      assert.strictEqual(parsed[0].score, 8.5);
      assert.strictEqual(parsed[0].total_questions, 10);
      assert.strictEqual(parsed[0].question_responses.length, 2);
    });

    it('retrieves both CBT mock and practice session attempts for a user in chronological order', async () => {
      // 1. CBT Mock
      await saveTestAttempt({
        client_attempt_id: 'mock_001',
        paper_title: 'GATE AG 2024 Official Paper',
        test_type: 'cbt_mock',
        score: 55.33,
        total_marks: 100,
        accuracy_percentage: 78,
        correct_count: 42,
        incorrect_count: 12,
        unattempted_count: 11,
        total_questions: 65,
        time_spent_seconds: 9000,
        submitted_at: '2026-09-01T10:00:00.000Z',
        admission_no: '2023AE05BIV',
        email: 'priya@example.com',
        student_name: 'Priya Sharma'
      });

      // 2. Practice Session
      await saveTestAttempt({
        client_attempt_id: 'prac_002',
        paper_title: 'Practice: 15 Qs (Irrigation & Drainage)',
        test_type: 'practice_session',
        score: 12.0,
        total_marks: 15,
        accuracy_percentage: 85.7,
        correct_count: 12,
        incorrect_count: 2,
        unattempted_count: 1,
        total_questions: 15,
        time_spent_seconds: 720,
        submitted_at: '2026-09-03T15:30:00.000Z',
        admission_no: '2023AE05BIV',
        email: 'priya@example.com',
        student_name: 'Priya Sharma'
      });

      const attempts = await getStudentTestAttempts('2023AE05BIV');
      assert.strictEqual(attempts.length, 2);
      
      // Most recent should be first
      assert.strictEqual(attempts[0].client_attempt_id, 'prac_002');
      assert.strictEqual(attempts[0].test_type, 'practice_session');
      assert.strictEqual(attempts[1].client_attempt_id, 'mock_001');
      assert.strictEqual(attempts[1].test_type, 'cbt_mock');
    });

    it('allows guest visitors to retrieve all local attempts seamlessly', async () => {
      await saveTestAttempt({
        client_attempt_id: 'guest_prac_01',
        paper_title: 'Guest Practice Session',
        test_type: 'practice_session',
        score: 5,
        total_marks: 5,
        accuracy_percentage: 100,
        student_name: 'Guest Candidate'
      });

      const guestAttempts = await getStudentTestAttempts('guest');
      assert.strictEqual(guestAttempts.length, 1);
      assert.strictEqual(guestAttempts[0].client_attempt_id, 'guest_prac_01');
    });
  });
});
