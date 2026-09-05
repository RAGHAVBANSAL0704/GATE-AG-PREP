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
export function evaluateQuestion(param1, param2, param3, param4) {
  let question, userAnswer, state, enableNegativeMarking;

  if (param1 && typeof param1 === 'object' && ('question' in param1 || 'state' in param1)) {
    ({ question, userAnswer, state, enableNegativeMarking = true } = param1);
  } else {
    question = param1;
    userAnswer = param2;
    if (typeof param3 === 'boolean') {
      enableNegativeMarking = param3;
      state = (param2 !== undefined && param2 !== null && String(param2).trim() !== '') ? 'ANSWERED' : 'UNATTEMPTED';
    } else {
      state = param3 || ((param2 !== undefined && param2 !== null && String(param2).trim() !== '') ? 'ANSWERED' : 'UNATTEMPTED');
      enableNegativeMarking = param4 !== undefined ? param4 : true;
    }
  }

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

/**
 * Helper to assess candidate pacing on a specific question relative to GATE exam benchmarks
 * GATE AG has 65 questions in 180 mins (~166 seconds per question)
 */
export function getQuestionPacing(timeSpentSec = 0, isCorrect = false, isAttempted = false) {
  const time = Number(timeSpentSec) || 0;

  if (!isAttempted) {
    if (time === 0) {
      return {
        label: 'Clean Skip',
        description: 'Skipped instantly without burning exam time',
        category: 'skip_fast',
        color: 'slate',
        icon: '⚪'
      };
    }
    if (time > 90) {
      return {
        label: 'Stalled Skip',
        description: `Spent ${Math.round(time)}s on question before leaving unattempted`,
        category: 'skip_slow',
        color: 'amber',
        icon: '⏳'
      };
    }
    return {
      label: 'Considered Skip',
      description: `Evaluated for ${Math.round(time)}s and skipped`,
      category: 'skip_normal',
      color: 'slate',
      icon: '⚪'
    };
  }

  if (isCorrect) {
    if (time <= 60) {
      return {
        label: 'Rapid Fire',
        description: `Solved in ${Math.round(time)}s (<1m) with high efficiency`,
        category: 'fast_correct',
        color: 'emerald',
        icon: '⚡'
      };
    }
    if (time <= 150) {
      return {
        label: 'Optimal Pacing',
        description: `Solved in ${Math.round(time)}s within benchmark window`,
        category: 'optimal_correct',
        color: 'blue',
        icon: '🎯'
      };
    }
    return {
      label: 'High Investment',
      description: `Solved correctly but required ${Math.round(time)}s (>2.5m)`,
      category: 'slow_correct',
      color: 'purple',
      icon: '⏱️'
    };
  }

  // If Incorrect:
  if (time <= 45) {
    return {
      label: 'Rush Trap',
      description: `Answered wrong in only ${Math.round(time)}s — possible hasty mistake`,
      category: 'rush_error',
      color: 'rose',
      icon: '🚨'
    };
  }
  if (time > 180) {
    return {
      label: 'High Time Loss',
      description: `Spent ${Math.round(time)}s (>3m) and incurred negative deduction`,
      category: 'sinkhole_error',
      color: 'red',
      icon: '⚠️'
    };
  }
  return {
    label: 'Standard Mistake',
    description: `Attempted in ${Math.round(time)}s — review concept and calculation`,
    category: 'standard_error',
    color: 'amber',
    icon: '❌'
  };
}

