import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

/**
 * Pure evaluation functions replicating the core scoring engine from MockTestMode.jsx & TestResultModal.jsx
 */

export function evaluateQuestion({ question, userAnswer, state, enableNegativeMarking = true }) {
  const isSubmitted = (state === 'ANSWERED' || state === 'ANSWERED_MARKED') && 
                      userAnswer !== undefined && 
                      userAnswer !== null && 
                      String(userAnswer).trim() !== '';

  if (!isSubmitted) {
    return {
      isAttempted: false,
      isCorrect: false,
      marksAwarded: 0,
      status: 'UNATTEMPTED'
    };
  }

  const correctKey = String(question.correct_answer || '');
  const userAnsStr = String(userAnswer).trim();
  let isCorrect = false;

  if (question.type === 'MCQ') {
    isCorrect = userAnsStr.toUpperCase() === correctKey.trim().toUpperCase();
    if (isCorrect) {
      return {
        isAttempted: true,
        isCorrect: true,
        marksAwarded: question.marks,
        status: 'CORRECT'
      };
    } else {
      const deduction = enableNegativeMarking ? (question.negative_marks || (question.marks === 1 ? 1/3 : 2/3)) : 0;
      return {
        isAttempted: true,
        isCorrect: false,
        marksAwarded: deduction === 0 ? 0 : -deduction,
        status: 'INCORRECT'
      };
    }
  }

  if (question.type === 'MSQ') {
    const userSorted = userAnsStr.split(',').map(s => s.trim().toUpperCase()).filter(Boolean).sort().join(';');
    const keySorted = correctKey.replace(/,/g, ';').split(';').map(s => s.trim().toUpperCase()).filter(Boolean).sort().join(';');
    isCorrect = userSorted === keySorted && userSorted.length > 0;
    return {
      isAttempted: true,
      isCorrect,
      marksAwarded: isCorrect ? question.marks : 0, // MSQ has NO negative marking
      status: isCorrect ? 'CORRECT' : 'INCORRECT'
    };
  }

  if (question.type === 'NAT') {
    const numVal = parseFloat(userAnsStr);
    if (!isNaN(numVal)) {
      if (correctKey.includes(' to ')) {
        const [minStr, maxStr] = correctKey.split(' to ');
        const min = parseFloat(minStr);
        const max = parseFloat(maxStr);
        isCorrect = numVal >= min && numVal <= max;
      } else {
        const target = parseFloat(correctKey);
        isCorrect = Math.abs(numVal - target) < 0.05;
      }
    }
    return {
      isAttempted: true,
      isCorrect,
      marksAwarded: isCorrect ? question.marks : 0, // NAT has NO negative marking
      status: isCorrect ? 'CORRECT' : 'INCORRECT'
    };
  }

  return {
    isAttempted: false,
    isCorrect: false,
    marksAwarded: 0,
    status: 'UNKNOWN'
  };
}

export function computeMockTestScore({ questions, userAnswers, questionStates, instructions = {} }) {
  let score = 0;
  let correctCount = 0;
  let incorrectCount = 0;
  let unattemptedCount = 0;

  const enableNeg = instructions?.enable_negative_marking !== false;

  questions.forEach(q => {
    const state = questionStates[q.id];
    const ans = userAnswers[q.id];
    const result = evaluateQuestion({
      question: q,
      userAnswer: ans,
      state,
      enableNegativeMarking: enableNeg
    });

    if (result.isAttempted) {
      if (result.isCorrect) {
        correctCount++;
        score += result.marksAwarded;
      } else {
        incorrectCount++;
        score += result.marksAwarded; // will be negative for MCQ, 0 for MSQ/NAT
      }
    } else {
      unattemptedCount++;
    }
  });

  const roundedScore = parseFloat(score.toFixed(2));
  const accuracy = (correctCount + incorrectCount) > 0 
    ? Math.round((correctCount / (correctCount + incorrectCount)) * 100) 
    : 0;

  return {
    score: roundedScore,
    rawScore: score,
    correctCount,
    incorrectCount,
    unattemptedCount,
    totalQuestions: questions.length,
    accuracy
  };
}

export function getEstimatedPercentile(score) {
  if (score >= 60) return "99.5+ (Top 10 AIR)";
  if (score >= 45) return "98.0+ (Top 50 AIR)";
  if (score >= 35) return "92.0+ (Top 200 AIR)";
  if (score >= 25) return "80.0+ (Qualifying Cutoff)";
  return "< 75.0 (Needs Revision)";
}

describe('Scoring Subsystem & Evaluation Engine', () => {

  describe('MCQ Scoring Unit Tests', () => {
    const mcq1Mark = { id: 'q1', type: 'MCQ', marks: 1, negative_marks: 0.3333333333333333, correct_answer: 'B' };
    const mcq2Mark = { id: 'q2', type: 'MCQ', marks: 2, negative_marks: 0.6666666666666666, correct_answer: 'D' };

    it('awards +1 mark for correct 1-mark MCQ answer', () => {
      const res = evaluateQuestion({ question: mcq1Mark, userAnswer: 'B', state: 'ANSWERED' });
      assert.strictEqual(res.isCorrect, true);
      assert.strictEqual(res.marksAwarded, 1);
      assert.strictEqual(res.status, 'CORRECT');
    });

    it('awards +2 marks for correct 2-mark MCQ answer', () => {
      const res = evaluateQuestion({ question: mcq2Mark, userAnswer: 'D', state: 'ANSWERED' });
      assert.strictEqual(res.isCorrect, true);
      assert.strictEqual(res.marksAwarded, 2);
      assert.strictEqual(res.status, 'CORRECT');
    });

    it('handles case insensitivity and whitespace trimming for correct MCQ', () => {
      const res1 = evaluateQuestion({ question: mcq1Mark, userAnswer: ' b ', state: 'ANSWERED' });
      assert.strictEqual(res1.isCorrect, true);
      assert.strictEqual(res1.marksAwarded, 1);

      const res2 = evaluateQuestion({ question: mcq2Mark, userAnswer: 'd', state: 'ANSWERED' });
      assert.strictEqual(res2.isCorrect, true);
      assert.strictEqual(res2.marksAwarded, 2);
    });

    it('deducts 1/3 mark for wrong 1-mark MCQ with negative marking enabled', () => {
      const res = evaluateQuestion({ question: mcq1Mark, userAnswer: 'A', state: 'ANSWERED', enableNegativeMarking: true });
      assert.strictEqual(res.isCorrect, false);
      assert.ok(Math.abs(res.marksAwarded - (-1/3)) < 1e-6);
      assert.strictEqual(res.status, 'INCORRECT');
    });

    it('deducts 2/3 mark for wrong 2-mark MCQ with negative marking enabled', () => {
      const res = evaluateQuestion({ question: mcq2Mark, userAnswer: 'C', state: 'ANSWERED', enableNegativeMarking: true });
      assert.strictEqual(res.isCorrect, false);
      assert.ok(Math.abs(res.marksAwarded - (-2/3)) < 1e-6);
      assert.strictEqual(res.status, 'INCORRECT');
    });

    it('does not deduct marks for wrong MCQ if enable_negative_marking is false', () => {
      const res = evaluateQuestion({ question: mcq1Mark, userAnswer: 'C', state: 'ANSWERED', enableNegativeMarking: false });
      assert.strictEqual(res.isCorrect, false);
      assert.strictEqual(res.marksAwarded, 0);
    });

    it('scores unattempted MCQ as 0 marks', () => {
      const res1 = evaluateQuestion({ question: mcq1Mark, userAnswer: undefined, state: 'NOT_ANSWERED' });
      assert.strictEqual(res1.isAttempted, false);
      assert.strictEqual(res1.marksAwarded, 0);
      assert.strictEqual(res1.status, 'UNATTEMPTED');

      const res2 = evaluateQuestion({ question: mcq1Mark, userAnswer: '', state: 'NOT_VISITED' });
      assert.strictEqual(res2.isAttempted, false);
      assert.strictEqual(res2.marksAwarded, 0);
    });

    it('treats MARKED without answer as unattempted (0 marks)', () => {
      const res = evaluateQuestion({ question: mcq1Mark, userAnswer: '', state: 'MARKED' });
      assert.strictEqual(res.isAttempted, false);
      assert.strictEqual(res.marksAwarded, 0);
    });

    it('treats ANSWERED_MARKED with answer as valid attempted response', () => {
      const res = evaluateQuestion({ question: mcq1Mark, userAnswer: 'B', state: 'ANSWERED_MARKED' });
      assert.strictEqual(res.isAttempted, true);
      assert.strictEqual(res.isCorrect, true);
      assert.strictEqual(res.marksAwarded, 1);
    });
  });

  describe('MSQ Scoring Unit Tests', () => {
    const msq2Mark = { id: 'q3', type: 'MSQ', marks: 2, negative_marks: 0, correct_answer: 'A, C' };

    it('awards full marks for exact MSQ match', () => {
      const res = evaluateQuestion({ question: msq2Mark, userAnswer: 'A, C', state: 'ANSWERED' });
      assert.strictEqual(res.isCorrect, true);
      assert.strictEqual(res.marksAwarded, 2);
      assert.strictEqual(res.status, 'CORRECT');
    });

    it('handles order independence in MSQ (e.g. "C, A" vs "A, C")', () => {
      const res = evaluateQuestion({ question: msq2Mark, userAnswer: 'C, A', state: 'ANSWERED' });
      assert.strictEqual(res.isCorrect, true);
      assert.strictEqual(res.marksAwarded, 2);
    });

    it('handles alternative separators and whitespace (e.g. "C,A", "A, C", "C;A")', () => {
      const res1 = evaluateQuestion({ question: msq2Mark, userAnswer: 'C,A', state: 'ANSWERED' });
      assert.strictEqual(res1.isCorrect, true);

      const msqSemicolon = { ...msq2Mark, correct_answer: 'A;C' };
      const res2 = evaluateQuestion({ question: msqSemicolon, userAnswer: 'C, A', state: 'ANSWERED' });
      assert.strictEqual(res2.isCorrect, true);
    });

    it('awards 0 marks for partial MSQ matches (no partial credit)', () => {
      const resSingle = evaluateQuestion({ question: msq2Mark, userAnswer: 'A', state: 'ANSWERED' });
      assert.strictEqual(resSingle.isCorrect, false);
      assert.strictEqual(resSingle.marksAwarded, 0);
      assert.strictEqual(resSingle.status, 'INCORRECT');
    });

    it('awards 0 marks for MSQ with extra wrong options (e.g. "A, C, D")', () => {
      const resExtra = evaluateQuestion({ question: msq2Mark, userAnswer: 'A, C, D', state: 'ANSWERED' });
      assert.strictEqual(resExtra.isCorrect, false);
      assert.strictEqual(resExtra.marksAwarded, 0);
    });

    it('has strictly 0 negative marking for wrong or partial MSQ', () => {
      const resWrong = evaluateQuestion({ question: msq2Mark, userAnswer: 'B, D', state: 'ANSWERED', enableNegativeMarking: true });
      assert.strictEqual(resWrong.isCorrect, false);
      assert.strictEqual(resWrong.marksAwarded, 0);
    });

    it('treats empty or unattempted MSQ as 0 marks', () => {
      const res = evaluateQuestion({ question: msq2Mark, userAnswer: '', state: 'NOT_ANSWERED' });
      assert.strictEqual(res.isAttempted, false);
      assert.strictEqual(res.marksAwarded, 0);
      assert.strictEqual(res.status, 'UNATTEMPTED');
    });
  });

  describe('NAT Scoring Unit Tests', () => {
    const natScalar = { id: 'q4', type: 'NAT', marks: 2, negative_marks: 0, correct_answer: '14.50' };
    const natRange = { id: 'q5', type: 'NAT', marks: 2, negative_marks: 0, correct_answer: '12.20 to 12.80' };

    it('awards full marks for exact scalar NAT match', () => {
      const res = evaluateQuestion({ question: natScalar, userAnswer: '14.50', state: 'ANSWERED' });
      assert.strictEqual(res.isCorrect, true);
      assert.strictEqual(res.marksAwarded, 2);
      assert.strictEqual(res.status, 'CORRECT');
    });

    it('awards full marks within ±0.05 scalar tolerance', () => {
      const resLower = evaluateQuestion({ question: natScalar, userAnswer: '14.47', state: 'ANSWERED' });
      assert.strictEqual(resLower.isCorrect, true);

      const resUpper = evaluateQuestion({ question: natScalar, userAnswer: '14.54', state: 'ANSWERED' });
      assert.strictEqual(resUpper.isCorrect, true);
    });

    it('rejects scalar NAT answers outside ±0.05 tolerance', () => {
      const resLow = evaluateQuestion({ question: natScalar, userAnswer: '14.40', state: 'ANSWERED' });
      assert.strictEqual(resLow.isCorrect, false);
      assert.strictEqual(resLow.marksAwarded, 0);

      const resHigh = evaluateQuestion({ question: natScalar, userAnswer: '14.60', state: 'ANSWERED' });
      assert.strictEqual(resHigh.isCorrect, false);
      assert.strictEqual(resHigh.marksAwarded, 0);
    });

    it('accepts answers within "min to max" interval range (inclusive)', () => {
      const resMin = evaluateQuestion({ question: natRange, userAnswer: '12.20', state: 'ANSWERED' });
      assert.strictEqual(resMin.isCorrect, true);

      const resMax = evaluateQuestion({ question: natRange, userAnswer: '12.80', state: 'ANSWERED' });
      assert.strictEqual(resMax.isCorrect, true);

      const resMid = evaluateQuestion({ question: natRange, userAnswer: '12.55', state: 'ANSWERED' });
      assert.strictEqual(resMid.isCorrect, true);
    });

    it('rejects answers outside "min to max" interval range', () => {
      const resBelow = evaluateQuestion({ question: natRange, userAnswer: '12.19', state: 'ANSWERED' });
      assert.strictEqual(resBelow.isCorrect, false);
      assert.strictEqual(resBelow.marksAwarded, 0);

      const resAbove = evaluateQuestion({ question: natRange, userAnswer: '12.81', state: 'ANSWERED' });
      assert.strictEqual(resAbove.isCorrect, false);
      assert.strictEqual(resAbove.marksAwarded, 0);
    });

    it('safely handles invalid number inputs (NaN, text, malformed)', () => {
      const invalidInputs = ['abc', '12.34.56', 'undefined', 'NaN', '--5'];
      for (const input of invalidInputs) {
        const res = evaluateQuestion({ question: natScalar, userAnswer: input, state: 'ANSWERED' });
        assert.strictEqual(res.isCorrect, false);
        assert.strictEqual(res.marksAwarded, 0);
      }
    });

    it('has strictly 0 negative marking for wrong NAT answers', () => {
      const res = evaluateQuestion({ question: natScalar, userAnswer: '999.9', state: 'ANSWERED', enableNegativeMarking: true });
      assert.strictEqual(res.isCorrect, false);
      assert.strictEqual(res.marksAwarded, 0);
    });
  });

  describe('Comprehensive Mock Test Score & Rounding Calculation', () => {
    const samplePaper = [
      { id: 'q1', type: 'MCQ', marks: 1, negative_marks: 1/3, correct_answer: 'A' }, // Correct -> +1
      { id: 'q2', type: 'MCQ', marks: 1, negative_marks: 1/3, correct_answer: 'B' }, // Wrong -> -0.333333
      { id: 'q3', type: 'MCQ', marks: 2, negative_marks: 2/3, correct_answer: 'C' }, // Correct -> +2
      { id: 'q4', type: 'MCQ', marks: 2, negative_marks: 2/3, correct_answer: 'D' }, // Wrong -> -0.666667
      { id: 'q5', type: 'MSQ', marks: 2, negative_marks: 0, correct_answer: 'A, B' }, // Correct -> +2
      { id: 'q6', type: 'MSQ', marks: 2, negative_marks: 0, correct_answer: 'B, C' }, // Partial/Wrong -> 0
      { id: 'q7', type: 'NAT', marks: 2, negative_marks: 0, correct_answer: '25.0 to 30.0' }, // Correct (27.5) -> +2
      { id: 'q8', type: 'NAT', marks: 2, negative_marks: 0, correct_answer: '10.0' }, // Wrong (15.0) -> 0
      { id: 'q9', type: 'MCQ', marks: 1, negative_marks: 1/3, correct_answer: 'A' }, // Unattempted -> 0
      { id: 'q10', type: 'MCQ', marks: 2, negative_marks: 2/3, correct_answer: 'B' } // Unattempted -> 0
    ];

    const sampleAnswers = {
      q1: 'A',
      q2: 'C',
      q3: 'C',
      q4: 'A',
      q5: 'B, A', // Order inverted
      q6: 'B',    // Partial
      q7: '27.5',
      q8: '15.0',
      q9: '',
      q10: undefined
    };

    const sampleStates = {
      q1: 'ANSWERED',
      q2: 'ANSWERED',
      q3: 'ANSWERED',
      q4: 'ANSWERED_MARKED',
      q5: 'ANSWERED',
      q6: 'ANSWERED',
      q7: 'ANSWERED',
      q8: 'ANSWERED',
      q9: 'NOT_ANSWERED',
      q10: 'NOT_VISITED'
    };

    it('calculates aggregate score, counts, accuracy, and roundings correctly', () => {
      const summary = computeMockTestScore({
        questions: samplePaper,
        userAnswers: sampleAnswers,
        questionStates: sampleStates,
        instructions: { enable_negative_marking: true }
      });

      // Correct: q1(+1), q3(+2), q5(+2), q7(+2) = 4 correct (+7 marks)
      // Incorrect: q2(-1/3), q4(-2/3), q6(0), q8(0) = 4 incorrect (-1 mark)
      // Net raw score = 7 - 1 = 6.00
      assert.strictEqual(summary.correctCount, 4);
      assert.strictEqual(summary.incorrectCount, 4);
      assert.strictEqual(summary.unattemptedCount, 2);
      assert.strictEqual(summary.score, 6.00);
      assert.strictEqual(summary.totalQuestions, 10);
      // Accuracy = 4 / (4 + 4) * 100 = 50%
      assert.strictEqual(summary.accuracy, 50);
    });

    it('handles 100% correct score scenario', () => {
      const allCorrectAns = {
        q1: 'A', q2: 'B', q3: 'C', q4: 'D', q5: 'A,B', q6: 'B,C', q7: '26.0', q8: '10.0', q9: 'A', q10: 'B'
      };
      const allAnsweredStates = {};
      samplePaper.forEach(q => { allAnsweredStates[q.id] = 'ANSWERED'; });

      const summary = computeMockTestScore({
        questions: samplePaper,
        userAnswers: allCorrectAns,
        questionStates: allAnsweredStates
      });

      assert.strictEqual(summary.correctCount, 10);
      assert.strictEqual(summary.incorrectCount, 0);
      assert.strictEqual(summary.unattemptedCount, 0);
      assert.strictEqual(summary.score, 17.00); // 1+1+2+2+2+2+2+2+1+2 = 17
      assert.strictEqual(summary.accuracy, 100);
    });

    it('handles 0% accuracy / zero attempts scenario gracefully', () => {
      const emptyAnswers = {};
      const emptyStates = {};
      samplePaper.forEach(q => { emptyStates[q.id] = 'NOT_VISITED'; });

      const summary = computeMockTestScore({
        questions: samplePaper,
        userAnswers: emptyAnswers,
        questionStates: emptyStates
      });

      assert.strictEqual(summary.correctCount, 0);
      assert.strictEqual(summary.incorrectCount, 0);
      assert.strictEqual(summary.unattemptedCount, 10);
      assert.strictEqual(summary.score, 0);
      assert.strictEqual(summary.accuracy, 0);
    });
  });

  describe('AIR Percentile & Tier Mapping Unit Tests', () => {
    it('maps scores >= 60 to Top 10 AIR tier', () => {
      assert.strictEqual(getEstimatedPercentile(100), "99.5+ (Top 10 AIR)");
      assert.strictEqual(getEstimatedPercentile(75.5), "99.5+ (Top 10 AIR)");
      assert.strictEqual(getEstimatedPercentile(60), "99.5+ (Top 10 AIR)");
    });

    it('maps scores 45 to 59.99 to Top 50 AIR tier', () => {
      assert.strictEqual(getEstimatedPercentile(59.99), "98.0+ (Top 50 AIR)");
      assert.strictEqual(getEstimatedPercentile(50.0), "98.0+ (Top 50 AIR)");
      assert.strictEqual(getEstimatedPercentile(45), "98.0+ (Top 50 AIR)");
    });

    it('maps scores 35 to 44.99 to Top 200 AIR tier', () => {
      assert.strictEqual(getEstimatedPercentile(44.99), "92.0+ (Top 200 AIR)");
      assert.strictEqual(getEstimatedPercentile(40), "92.0+ (Top 200 AIR)");
      assert.strictEqual(getEstimatedPercentile(35), "92.0+ (Top 200 AIR)");
    });

    it('maps scores 25 to 34.99 to Qualifying Cutoff tier', () => {
      assert.strictEqual(getEstimatedPercentile(34.99), "80.0+ (Qualifying Cutoff)");
      assert.strictEqual(getEstimatedPercentile(28.5), "80.0+ (Qualifying Cutoff)");
      assert.strictEqual(getEstimatedPercentile(25), "80.0+ (Qualifying Cutoff)");
    });

    it('maps scores < 25 to Needs Revision tier', () => {
      assert.strictEqual(getEstimatedPercentile(24.99), "< 75.0 (Needs Revision)");
      assert.strictEqual(getEstimatedPercentile(10), "< 75.0 (Needs Revision)");
      assert.strictEqual(getEstimatedPercentile(0), "< 75.0 (Needs Revision)");
      assert.strictEqual(getEstimatedPercentile(-5.33), "< 75.0 (Needs Revision)");
    });
  });

});
