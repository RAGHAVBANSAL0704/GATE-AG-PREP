/**
 * Canonical Scoring & Evaluation Engine for GATE AG Prep Web Portal
 * Implements exact GATE AG examination marking standards:
 * - 1-Mark MCQ: +1.00 correct, -0.3333 incorrect, 0 unattempted
 * - 2-Mark MCQ: +2.00 correct, -0.6667 incorrect, 0 unattempted
 * - MSQ (1 or 2 Marks): Full marks for exact match, 0 partial credit, 0 negative marks
 * - NAT (1 or 2 Marks): Full marks within tolerance/interval, 0 negative marks
 */

export const EPSILON = 1e-7;
export const NAT_DEFAULT_TOLERANCE = 0.05;

/**
 * Evaluate single question response with mathematical precision
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

  const correctKey = String(question.correct_answer !== undefined ? question.correct_answer : (question.answer || '')).trim();
  const userAnsStr = String(userAnswer).trim();
  let isCorrect = false;

  // 1. MCQ Evaluation (Strict exact case-insensitive match)
  if (question.type === 'MCQ') {
    isCorrect = userAnsStr.toUpperCase() === correctKey.toUpperCase();
    if (isCorrect) {
      return {
        isAttempted: true,
        isCorrect: true,
        marksAwarded: Number(question.marks || 1),
        status: 'CORRECT'
      };
    } else {
      const defaultDeduction = (Number(question.marks) === 1) ? (1 / 3) : (2 / 3);
      const configuredDeduction = question.negative_marks !== undefined ? Number(question.negative_marks) : defaultDeduction;
      const deduction = enableNegativeMarking ? configuredDeduction : 0;
      return {
        isAttempted: true,
        isCorrect: false,
        marksAwarded: deduction === 0 ? 0 : -deduction,
        status: 'INCORRECT'
      };
    }
  }

  // 2. MSQ Evaluation (Strict zero-partial-credit, order-independent, zero negative penalty)
  if (question.type === 'MSQ') {
    const userSorted = userAnsStr
      .split(/[,;\s]+/)
      .filter(Boolean)
      .map(s => s.trim().toUpperCase())
      .sort()
      .join(';');

    const keySorted = correctKey
      .replace(/,/g, ';')
      .replace(/and/gi, ';')
      .split(/[,;\s]+/)
      .filter(Boolean)
      .map(s => s.trim().toUpperCase())
      .sort()
      .join(';');

    isCorrect = userSorted === keySorted && userSorted.length > 0;
    return {
      isAttempted: true,
      isCorrect,
      marksAwarded: isCorrect ? Number(question.marks || 2) : 0,
      status: isCorrect ? 'CORRECT' : 'INCORRECT'
    };
  }

  // 3. NAT Evaluation (Closed tolerance interval with IEEE-754 float epsilon buffer)
  if (question.type === 'NAT') {
    const numVal = parseFloat(userAnsStr);
    if (!isNaN(numVal)) {
      if (correctKey.toLowerCase().includes(' to ')) {
        const [minStr, maxStr] = correctKey.toLowerCase().split(' to ');
        const min = parseFloat(minStr);
        const max = parseFloat(maxStr);
        if (!isNaN(min) && !isNaN(max)) {
          isCorrect = (numVal >= min - EPSILON) && (numVal <= max + EPSILON);
        }
      } else {
        const target = parseFloat(correctKey);
        if (!isNaN(target)) {
          const tol = question.tolerance !== undefined ? Number(question.tolerance) : NAT_DEFAULT_TOLERANCE;
          isCorrect = Math.abs(numVal - target) <= (tol + EPSILON);
        }
      }
    }
    return {
      isAttempted: true,
      isCorrect,
      marksAwarded: isCorrect ? Number(question.marks || 1) : 0,
      status: isCorrect ? 'CORRECT' : 'INCORRECT'
    };
  }

  return { isAttempted: false, isCorrect: false, marksAwarded: 0, status: 'UNKNOWN' };
}

/**
 * Compute total score and breakdown for a full mock test paper
 */
export function computeMockTestScore({ questions = [], userAnswers = {}, questionStates = {}, enableNegativeMarking = true }) {
  let totalScore = 0;
  let correctCount = 0;
  let incorrectCount = 0;
  let unattemptedCount = 0;
  const breakdown = [];

  questions.forEach((q) => {
    const evalRes = evaluateQuestion({
      question: q,
      userAnswer: userAnswers[q.id],
      state: questionStates[q.id],
      enableNegativeMarking
    });

    totalScore += evalRes.marksAwarded;
    if (evalRes.status === 'CORRECT') correctCount++;
    else if (evalRes.status === 'INCORRECT') incorrectCount++;
    else unattemptedCount++;

    breakdown.push({
      questionId: q.id,
      ...evalRes
    });
  });

  const attemptedCount = correctCount + incorrectCount;
  const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;
  const roundedScore = Math.round(totalScore * 100) / 100;

  return {
    score: roundedScore,
    totalMarks: questions.reduce((sum, q) => sum + Number(q.marks || 1), 0),
    correctCount,
    incorrectCount,
    unattemptedCount,
    attemptedCount,
    accuracy,
    breakdown,
    percentileTier: getEstimatedPercentile(roundedScore)
  };
}

/**
 * Estimate AIR Percentile Tier based on historical GATE AG score benchmarks
 */
export function getEstimatedPercentile(score) {
  if (score >= 60) return { tier: 'Top 10 AIR', badge: 'Elite Ranker', color: 'emerald' };
  if (score >= 45) return { tier: 'Top 50 AIR', badge: 'High Distinction', color: 'blue' };
  if (score >= 35) return { tier: 'Top 200 AIR', badge: 'Competitive Qualifying', color: 'purple' };
  if (score >= 25) return { tier: 'Qualifying Cutoff', badge: 'Qualified', color: 'amber' };
  return { tier: 'Needs Revision', badge: 'Foundation Focus', color: 'slate' };
}
