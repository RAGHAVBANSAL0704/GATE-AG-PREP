import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { evaluateQuestion, computeMockTestScore, getEstimatedPercentile } from './scoring.test.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const questions = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/data/questions.json'), 'utf8'));
const mockPapers = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/data/mock_papers.json'), 'utf8'));

describe('Empirical Challenger Stress & Edge-Case Test Suite', () => {

  describe('Floating Point & NAT Tolerance Boundaries', () => {
    const natQ = { id: 'q_nat', type: 'NAT', marks: 2, negative_marks: 0, correct_answer: '14.50' };

    it('handles exact +/- 0.049 boundary within tolerance', () => {
      assert.strictEqual(evaluateQuestion({ question: natQ, userAnswer: '14.549', state: 'ANSWERED' }).isCorrect, true);
      assert.strictEqual(evaluateQuestion({ question: natQ, userAnswer: '14.451', state: 'ANSWERED' }).isCorrect, true);
    });

    it('rejects answers outside +/- 0.05 tolerance', () => {
      assert.strictEqual(evaluateQuestion({ question: natQ, userAnswer: '14.551', state: 'ANSWERED' }).isCorrect, false);
      assert.strictEqual(evaluateQuestion({ question: natQ, userAnswer: '14.449', state: 'ANSWERED' }).isCorrect, false);
    });

    it('handles float addition epsilon (0.1 + 0.2 = 0.30000000000000004)', () => {
      const floatQ = { id: 'q_float', type: 'NAT', marks: 1, negative_marks: 0, correct_answer: '0.3' };
      const floatSum = 0.1 + 0.2;
      const res = evaluateQuestion({ question: floatQ, userAnswer: String(floatSum), state: 'ANSWERED' });
      assert.strictEqual(res.isCorrect, true);
      assert.strictEqual(res.marksAwarded, 1);
    });

    it('handles negative numbers with scalar tolerance and range intervals', () => {
      const natNegScalar = { id: 'q_neg_scalar', type: 'NAT', marks: 2, negative_marks: 0, correct_answer: '-15.50' };
      assert.strictEqual(evaluateQuestion({ question: natNegScalar, userAnswer: '-15.52', state: 'ANSWERED' }).isCorrect, true);
      assert.strictEqual(evaluateQuestion({ question: natNegScalar, userAnswer: '-15.48', state: 'ANSWERED' }).isCorrect, true);
      assert.strictEqual(evaluateQuestion({ question: natNegScalar, userAnswer: '-15.60', state: 'ANSWERED' }).isCorrect, false);

      const natNegRange = { id: 'q_neg_range', type: 'NAT', marks: 2, negative_marks: 0, correct_answer: '-25.5 to -10.2' };
      assert.strictEqual(evaluateQuestion({ question: natNegRange, userAnswer: '-25.5', state: 'ANSWERED' }).isCorrect, true);
      assert.strictEqual(evaluateQuestion({ question: natNegRange, userAnswer: '-10.2', state: 'ANSWERED' }).isCorrect, true);
      assert.strictEqual(evaluateQuestion({ question: natNegRange, userAnswer: '-18.0', state: 'ANSWERED' }).isCorrect, true);
      assert.strictEqual(evaluateQuestion({ question: natNegRange, userAnswer: '-25.51', state: 'ANSWERED' }).isCorrect, false);
      assert.strictEqual(evaluateQuestion({ question: natNegRange, userAnswer: '-10.19', state: 'ANSWERED' }).isCorrect, false);
    });

    it('handles scientific notation / exponential inputs', () => {
      const natSci = { id: 'q_sci', type: 'NAT', marks: 2, negative_marks: 0, correct_answer: '0.005' };
      assert.strictEqual(evaluateQuestion({ question: natSci, userAnswer: '5e-3', state: 'ANSWERED' }).isCorrect, true);
      assert.strictEqual(evaluateQuestion({ question: natSci, userAnswer: '0.0050', state: 'ANSWERED' }).isCorrect, true);
    });

    it('handles user whitespace and malformed number strings safely', () => {
      const natQ2 = { id: 'q_ws', type: 'NAT', marks: 2, negative_marks: 0, correct_answer: '42.0' };
      assert.strictEqual(evaluateQuestion({ question: natQ2, userAnswer: '  42.0  \n', state: 'ANSWERED' }).isCorrect, true);
      assert.strictEqual(evaluateQuestion({ question: natQ2, userAnswer: 'abc42.0', state: 'ANSWERED' }).isCorrect, false);
      assert.strictEqual(evaluateQuestion({ question: natQ2, userAnswer: '   ', state: 'ANSWERED' }).isAttempted, false);
      assert.strictEqual(evaluateQuestion({ question: natQ2, userAnswer: 'NaN', state: 'ANSWERED' }).isCorrect, false);
      assert.strictEqual(evaluateQuestion({ question: natQ2, userAnswer: 'Infinity', state: 'ANSWERED' }).isCorrect, false);
    });
  });

  describe('MSQ Delimiters, Case Sensitivity, Permutations and Duplicates', () => {
    const msqQ = { id: 'q_msq', type: 'MSQ', marks: 2, negative_marks: 0, correct_answer: 'A, B, D' };

    it('handles permutations, lowercase, extra spaces, and delimiters', () => {
      assert.strictEqual(evaluateQuestion({ question: msqQ, userAnswer: 'A, B, D', state: 'ANSWERED' }).isCorrect, true);
      assert.strictEqual(evaluateQuestion({ question: msqQ, userAnswer: 'D, A, B', state: 'ANSWERED' }).isCorrect, true);
      assert.strictEqual(evaluateQuestion({ question: msqQ, userAnswer: 'b, d, a', state: 'ANSWERED' }).isCorrect, true);
      assert.strictEqual(evaluateQuestion({ question: msqQ, userAnswer: 'A,B,D', state: 'ANSWERED' }).isCorrect, true);
      assert.strictEqual(evaluateQuestion({ question: msqQ, userAnswer: '  A ,  B ,  D  ', state: 'ANSWERED' }).isCorrect, true);
    });

    it('strictly denies partial answers, supersets, and wrong combinations with 0 marks and 0 penalty', () => {
      const msq2 = { id: 'q_msq2', type: 'MSQ', marks: 2, negative_marks: 0, correct_answer: 'A, C' };
      
      const resA = evaluateQuestion({ question: msq2, userAnswer: 'A', state: 'ANSWERED' });
      assert.strictEqual(resA.isCorrect, false);
      assert.strictEqual(resA.marksAwarded, 0);

      const resC = evaluateQuestion({ question: msq2, userAnswer: 'C', state: 'ANSWERED' });
      assert.strictEqual(resC.isCorrect, false);
      assert.strictEqual(resC.marksAwarded, 0);

      const resExtra = evaluateQuestion({ question: msq2, userAnswer: 'A, C, D', state: 'ANSWERED' });
      assert.strictEqual(resExtra.isCorrect, false);
      assert.strictEqual(resExtra.marksAwarded, 0);

      const resWrong = evaluateQuestion({ question: msq2, userAnswer: 'B, D', state: 'ANSWERED', enableNegativeMarking: true });
      assert.strictEqual(resWrong.isCorrect, false);
      assert.strictEqual(resWrong.marksAwarded, 0);
    });

    it('parses answer key configured with semicolons or irregular spacing', () => {
      const msqSemi = { id: 'q_semi', type: 'MSQ', marks: 2, negative_marks: 0, correct_answer: 'B; D' };
      assert.strictEqual(evaluateQuestion({ question: msqSemi, userAnswer: 'D, B', state: 'ANSWERED' }).isCorrect, true);
      assert.strictEqual(evaluateQuestion({ question: msqSemi, userAnswer: 'b,d', state: 'ANSWERED' }).isCorrect, true);
    });
  });

  describe('Negative Marking Toggle Flag Stress', () => {
    const mcq1 = { id: 'm1', type: 'MCQ', marks: 1, negative_marks: 1/3, correct_answer: 'A' };
    const mcq2 = { id: 'm2', type: 'MCQ', marks: 2, negative_marks: 2/3, correct_answer: 'B' };
    const msq2 = { id: 'ms2', type: 'MSQ', marks: 2, negative_marks: 0, correct_answer: 'A, B' };
    const nat2 = { id: 'n2', type: 'NAT', marks: 2, negative_marks: 0, correct_answer: '10.0' };

    it('evaluates deductions correctly when enabled vs disabled vs default', () => {
      // Enabled
      assert.ok(Math.abs(evaluateQuestion({ question: mcq1, userAnswer: 'C', state: 'ANSWERED' }).marksAwarded - (-1/3)) < 1e-6);
      assert.ok(Math.abs(evaluateQuestion({ question: mcq2, userAnswer: 'C', state: 'ANSWERED' }).marksAwarded - (-2/3)) < 1e-6);
      assert.strictEqual(evaluateQuestion({ question: msq2, userAnswer: 'C', state: 'ANSWERED' }).marksAwarded, 0);
      assert.strictEqual(evaluateQuestion({ question: nat2, userAnswer: '99', state: 'ANSWERED' }).marksAwarded, 0);

      // Explicit false
      assert.strictEqual(evaluateQuestion({ question: mcq1, userAnswer: 'C', state: 'ANSWERED', enableNegativeMarking: false }).marksAwarded, 0);
      assert.strictEqual(evaluateQuestion({ question: mcq2, userAnswer: 'C', state: 'ANSWERED', enableNegativeMarking: false }).marksAwarded, 0);
      assert.strictEqual(evaluateQuestion({ question: msq2, userAnswer: 'C', state: 'ANSWERED', enableNegativeMarking: false }).marksAwarded, 0);
      assert.strictEqual(evaluateQuestion({ question: nat2, userAnswer: '99', state: 'ANSWERED', enableNegativeMarking: false }).marksAwarded, 0);
    });

    it('calculates total mock score with enable_negative_marking: false', () => {
      const qs = [mcq1, mcq2];
      const wrongAnswers = { m1: 'X', m2: 'Y' };
      const answeredStates = { m1: 'ANSWERED', m2: 'ANSWERED' };

      const withNeg = computeMockTestScore({ questions: qs, userAnswers: wrongAnswers, questionStates: answeredStates, instructions: { enable_negative_marking: true } });
      assert.strictEqual(withNeg.score, -1.00);

      const noNeg = computeMockTestScore({ questions: qs, userAnswers: wrongAnswers, questionStates: answeredStates, instructions: { enable_negative_marking: false } });
      assert.strictEqual(noNeg.score, 0.00);
    });
  });

  describe('Unattempted & State Mapping Robustness', () => {
    const mcq = { id: 'm1', type: 'MCQ', marks: 1, negative_marks: 1/3, correct_answer: 'A' };

    it('properly differentiates NOT_VISITED, NOT_ANSWERED, MARKED, and ANSWERED_MARKED', () => {
      assert.strictEqual(evaluateQuestion({ question: mcq, userAnswer: undefined, state: 'NOT_VISITED' }).status, 'UNATTEMPTED');
      assert.strictEqual(evaluateQuestion({ question: mcq, userAnswer: undefined, state: 'NOT_ANSWERED' }).status, 'UNATTEMPTED');
      assert.strictEqual(evaluateQuestion({ question: mcq, userAnswer: '', state: 'MARKED' }).status, 'UNATTEMPTED');
      assert.strictEqual(evaluateQuestion({ question: mcq, userAnswer: undefined, state: 'MARKED' }).status, 'UNATTEMPTED');

      const amCorrect = evaluateQuestion({ question: mcq, userAnswer: 'A', state: 'ANSWERED_MARKED' });
      assert.strictEqual(amCorrect.status, 'CORRECT');
      assert.strictEqual(amCorrect.marksAwarded, 1);

      const amWrong = evaluateQuestion({ question: mcq, userAnswer: 'B', state: 'ANSWERED_MARKED' });
      assert.strictEqual(amWrong.status, 'INCORRECT');
      assert.ok(Math.abs(amWrong.marksAwarded - (-1/3)) < 1e-6);

      const blankAnswered = evaluateQuestion({ question: mcq, userAnswer: '   ', state: 'ANSWERED' });
      assert.strictEqual(blankAnswered.status, 'UNATTEMPTED');
      assert.strictEqual(blankAnswered.marksAwarded, 0);
      assert.strictEqual(blankAnswered.isAttempted, false);
    });
  });

  describe('0/0 Accuracy & Edge Mathematics', () => {
    it('safely handles 0 attempted questions without producing NaN or Infinity', () => {
      const qs = [
        { id: 'q1', type: 'MCQ', marks: 1, correct_answer: 'A' },
        { id: 'q2', type: 'MCQ', marks: 1, correct_answer: 'B' }
      ];

      const resZero = computeMockTestScore({
        questions: qs,
        userAnswers: {},
        questionStates: { q1: 'NOT_VISITED', q2: 'NOT_VISITED' }
      });
      assert.strictEqual(resZero.accuracy, 0);
      assert.strictEqual(resZero.score, 0);
      assert.strictEqual(isNaN(resZero.accuracy), false);
      assert.strictEqual(isFinite(resZero.accuracy), true);
    });

    it('safely handles empty question list', () => {
      const resEmpty = computeMockTestScore({
        questions: [],
        userAnswers: {},
        questionStates: {}
      });
      assert.strictEqual(resEmpty.accuracy, 0);
      assert.strictEqual(resEmpty.score, 0);
      assert.strictEqual(resEmpty.totalQuestions, 0);
    });
  });

});
