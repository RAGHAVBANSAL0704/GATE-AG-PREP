/**
 * Forensic Error & Marks Loss Analyzer
 * Diagnoses wrong and unattempted responses in GATE CBT Mock Tests
 * to categorize precise root causes of score loss.
 */

export function analyzeTestResultForensics(resultData) {
  if (!resultData || !Array.isArray(resultData.userAnswers) || !Array.isArray(resultData.questions)) {
    return {
      totalLostMarks: 0,
      negativeDeductionMarks: 0,
      unattemptedLostMarks: 0,
      natUnitScaleErrors: 0,
      natBorderlineMisses: 0,
      msqPartialMatches: 0,
      conceptualMistakes: 0,
      breakdown: []
    };
  }

  const { questions, userAnswers } = resultData;

  let totalLost = 0;
  let negativeDeductions = 0;
  let unattemptedLost = 0;
  let natUnitScaleErrors = 0;
  let natBorderlineMisses = 0;
  let msqPartialMatches = 0;
  let conceptualMistakes = 0;

  const breakdown = [];

  questions.forEach((q, idx) => {
    const qMarks = Number(q.marks || 1);
    const uResp = userAnswers[idx] || {};
    const uState = uResp.state || 'NOT_VISITED';
    const uAns = uResp.answer;
    const isAnswered = uState === 'ANSWERED' || uState === 'ANSWERED_MARKED';

    const correctAnsStr = String(q.correct_answer !== undefined ? q.correct_answer : (q.answer || '')).trim();
    const qType = (q.type || 'MCQ').toUpperCase();

    if (!isAnswered || uAns === undefined || uAns === null || String(uAns).trim() === '') {
      // Unattempted
      unattemptedLost += qMarks;
      totalLost += qMarks;
      breakdown.push({
        questionIndex: idx + 1,
        questionId: q.id,
        qType,
        marks: qMarks,
        category: 'UNATTEMPTED_POTENTIAL',
        message: `Unattempted question. Opportunity to gain +${qMarks} marks missed.`
      });
      return;
    }

    // Attempted question evaluation
    let isCorrect = false;

    if (qType === 'MCQ') {
      isCorrect = String(uAns).trim().toUpperCase() === correctAnsStr.toUpperCase();
    } else if (qType === 'MSQ') {
      const uArr = Array.isArray(uAns) ? uAns.map(s => String(s).trim().toUpperCase()).sort() : String(uAns).split(/[,;]/).map(s => s.trim().toUpperCase()).filter(Boolean).sort();
      const cArr = correctAnsStr.split(/[,;]/).map(s => s.trim().toUpperCase()).filter(Boolean).sort();
      isCorrect = uArr.length === cArr.length && uArr.every((val, index) => val === cArr[index]);
    } else if (qType === 'NAT') {
      const uVal = parseFloat(String(uAns).trim());
      if (!isNaN(uVal)) {
        if (q.answer_min !== undefined && q.answer_max !== undefined) {
          isCorrect = uVal >= Number(q.answer_min) && uVal <= Number(q.answer_max);
        } else if (correctAnsStr.toLowerCase().includes(' to ')) {
          const parts = correctAnsStr.toLowerCase().split(' to ');
          const min = parseFloat(parts[0]);
          const max = parseFloat(parts[1]);
          if (!isNaN(min) && !isNaN(max)) {
            isCorrect = uVal >= min && uVal <= max;
          }
        } else {
          const cVal = parseFloat(correctAnsStr);
          const tol = Number(q.tolerance || 0.05);
          isCorrect = Math.abs(uVal - cVal) <= tol;
        }
      }
    }

    if (isCorrect) return;

    // Diagnose Incorrect Answer
    let penalty = 0;
    if (qType === 'MCQ') {
      penalty = qMarks === 2 ? (2 / 3) : (1 / 3);
      negativeDeductions += penalty;
      conceptualMistakes++;
      totalLost += (qMarks + penalty);

      breakdown.push({
        questionIndex: idx + 1,
        questionId: q.id,
        qType,
        marks: qMarks,
        penalty,
        category: 'MCQ_NEGATIVE_PENALTY',
        message: `Incorrect option selected. Lost ${qMarks} marks + ${penalty.toFixed(2)} negative penalty.`
      });
    } else if (qType === 'MSQ') {
      conceptualMistakes++;
      msqPartialMatches++;
      totalLost += qMarks;

      breakdown.push({
        questionIndex: idx + 1,
        questionId: q.id,
        qType,
        marks: qMarks,
        penalty: 0,
        category: 'MSQ_PARTIAL_OVERSELECTION',
        message: `MSQ partial or wrong combination. (No negative deduction, but 0 marks gained).`
      });
    } else if (qType === 'NAT') {
      totalLost += qMarks;
      const uVal = parseFloat(String(uAns).trim());
      const cVal = parseFloat(correctAnsStr);

      let category = 'NAT_CONCEPTUAL';
      let msg = `Wrong numerical value. Lost ${qMarks} marks.`;

      if (!isNaN(uVal) && !isNaN(cVal) && cVal !== 0) {
        const ratio = uVal / cVal;
        // Check scale factors (1000, 3600, 60, 100, 0.001)
        if (Math.abs(ratio - 1000) < 5 || Math.abs(ratio - 0.001) < 0.0005 || Math.abs(ratio - 3600) < 10 || Math.abs(ratio - 3.6) < 0.1 || ratio === -1) {
          natUnitScaleErrors++;
          category = 'NAT_UNIT_SCALE_ERROR';
          msg = `⚠️ Unit Conversion / Scale Factor Error! Your answer (${uVal}) is off by a unit factor relative to key (${cVal}).`;
        } else if (Math.abs(uVal - cVal) / Math.abs(cVal) <= 0.2) {
          natBorderlineMisses++;
          category = 'NAT_BORDERLINE_MISS';
          msg = `🎯 Borderline Range Miss! Your answer (${uVal}) was within 20% of exact tolerance range (${cVal}).`;
        } else {
          conceptualMistakes++;
        }
      } else {
        conceptualMistakes++;
      }

      breakdown.push({
        questionIndex: idx + 1,
        questionId: q.id,
        qType,
        marks: qMarks,
        penalty: 0,
        category,
        message: msg
      });
    }
  });

  return {
    totalLostMarks: Number(totalLost.toFixed(2)),
    negativeDeductionMarks: Number(negativeDeductions.toFixed(2)),
    unattemptedLostMarks: Number(unattemptedLost.toFixed(2)),
    natUnitScaleErrors,
    natBorderlineMisses,
    msqPartialMatches,
    conceptualMistakes,
    breakdown
  };
}
