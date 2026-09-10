import katex from 'katex';
import { ALL_QUESTION_BANK_QUESTIONS, getQuestionBankStats } from '../src/data/question_bank/index.js';
import { evaluateQuestion, EPSILON } from '../src/utils/scoring.js';
import { renderMathToHtmlString } from '../src/utils/mathFormatting.js';

console.log('=== STARTING ADVERSARIAL STRESS-TEST HARNESS ===');
console.log(`Total Question Bank Questions to verify: ${ALL_QUESTION_BANK_QUESTIONS.length}`);

const report = {
  totalQuestions: ALL_QUESTION_BANK_QUESTIONS.length,
  katexBlocksChecked: 0,
  katexErrors: [],
  delimiterErrors: [],
  natChecks: {
    totalNat: 0,
    validRangeCount: 0,
    minGreaterThanMax: [],
    answerOutsideRange: [],
    boundaryFailures: [],
    epsilonPassFailures: [],
    robustnessFailures: []
  },
  scoringAnomalies: []
};

// =========================================================================
// 1. KATEX DELIMITERS & STRICT RENDERING VERIFICATION
// =========================================================================
console.log('\n--- Checking LaTeX delimiters and KaTeX rendering ---');

for (const q of ALL_QUESTION_BANK_QUESTIONS) {
  const fields = [
    { name: 'question', text: q.question },
    { name: 'solution', text: q.solution }
  ];
  if (q.options) {
    for (const [k, v] of Object.entries(q.options)) {
      fields.push({ name: `option_${k}`, text: String(v) });
    }
  }

  for (const { name, text } of fields) {
    if (!text) continue;

    // Check delimiter balance
    // 1. Single dollar delimiters
    const dollarMatches = text.match(/(?<!\\)\$/g) || [];
    if (dollarMatches.length % 2 !== 0) {
      report.delimiterErrors.push({
        id: q.id,
        field: name,
        error: `Odd number of unescaped $ delimiters (${dollarMatches.length})`,
        sample: text.slice(0, 100)
      });
    }

    // 2. Bracket display math delimiters \[ \]
    const openDisplay = (text.match(/\\\[/g) || []).length;
    const closeDisplay = (text.match(/\\\]/g) || []).length;
    if (openDisplay !== closeDisplay) {
      report.delimiterErrors.push({
        id: q.id,
        field: name,
        error: `Unbalanced display delimiters: ${openDisplay} '\\[', ${closeDisplay} '\\]'`
      });
    }

    // 3. Parentheses inline math delimiters \( \)
    const openInline = (text.match(/\\\(/g) || []).length;
    const closeInline = (text.match(/\\\)/g) || []).length;
    if (openInline !== closeInline) {
      report.delimiterErrors.push({
        id: q.id,
        field: name,
        error: `Unbalanced inline delimiters: ${openInline} '\\(', ${closeInline} '\\)'`
      });
    }

    // Extract all math blocks for strict rendering
    const mathBlocks = [];
    text.replace(/\$\$([\s\S]*?)\$\$/g, (_, m) => { mathBlocks.push({ type: '$$', math: m }); return ''; });
    text.replace(/\$([^$\n]+)\$/g, (_, m) => { mathBlocks.push({ type: '$', math: m }); return ''; });
    text.replace(/\\\[([\s\S]*?)\\\]/g, (_, m) => { mathBlocks.push({ type: '\\[\\]', math: m }); return ''; });
    text.replace(/\\\(([\s\S]*?)\\\)/g, (_, m) => { mathBlocks.push({ type: '\\(\\)', math: m }); return ''; });

    for (const { type, math } of mathBlocks) {
      report.katexBlocksChecked++;
      let cleanMath = math.trim();
      cleanMath = cleanMath.replace(/\\degree\b/g, '^\\circ');

      // Test strict KaTeX rendering
      try {
        katex.renderToString(cleanMath, {
          displayMode: type === '$$' || type === '\\[\\]',
          throwOnError: true
        });
      } catch (err) {
        report.katexErrors.push({
          id: q.id,
          field: name,
          math: cleanMath,
          error: err.message
        });
      }
    }

    // Also test production math formatter
    try {
      const renderedHtml = renderMathToHtmlString(text);
      if (typeof renderedHtml !== 'string' || renderedHtml.length === 0) {
        report.katexErrors.push({
          id: q.id,
          field: name,
          error: 'renderMathToHtmlString returned empty or non-string output'
        });
      }
    } catch (err) {
      report.katexErrors.push({
        id: q.id,
        field: name,
        error: `renderMathToHtmlString exception: ${err.message}`
      });
    }
  }
}

console.log(`KaTeX blocks verified: ${report.katexBlocksChecked}`);
console.log(`KaTeX syntax errors: ${report.katexErrors.length}`);
console.log(`Delimiter balance errors: ${report.delimiterErrors.length}`);

// =========================================================================
// 2. NAT NUMERICAL RANGE & BOUNDARY STRESS TESTING
// =========================================================================
console.log('\n--- Checking NAT numerical ranges and boundary values ---');

const natQuestions = ALL_QUESTION_BANK_QUESTIONS.filter(q => q.type === 'NAT');
report.natChecks.totalNat = natQuestions.length;
console.log(`Total NAT questions: ${natQuestions.length}`);

for (const q of natQuestions) {
  const ansNum = parseFloat(String(q.correct_answer));

  if (!Number.isFinite(ansNum)) {
    report.natChecks.robustnessFailures.push({
      id: q.id,
      error: `correct_answer "${q.correct_answer}" is not a finite number`
    });
    continue;
  }

  let minVal, maxVal;
  if (q.numerical_range) {
    minVal = q.numerical_range.min;
    maxVal = q.numerical_range.max;

    if (typeof minVal !== 'number' || typeof maxVal !== 'number') {
      report.natChecks.robustnessFailures.push({
        id: q.id,
        error: `numerical_range min (${minVal}) or max (${maxVal}) is not a number`
      });
      continue;
    }

    if (minVal > maxVal) {
      report.natChecks.minGreaterThanMax.push({
        id: q.id,
        min: minVal,
        max: maxVal
      });
    } else {
      report.natChecks.validRangeCount++;
    }

    // Check if correct_answer falls in [min - 1e-4, max + 1e-4]
    if (ansNum < minVal - 1e-4 || ansNum > maxVal + 1e-4) {
      report.natChecks.answerOutsideRange.push({
        id: q.id,
        answer: ansNum,
        min: minVal,
        max: maxVal
      });
    }
  } else {
    // If no numerical_range, fallback to tolerance interval
    const tol = q.tolerance !== undefined ? Number(q.tolerance) : 0.05;
    minVal = ansNum - tol;
    maxVal = ansNum + tol;
    report.natChecks.validRangeCount++;
  }

  // Adversarial Boundary Stress Tests on evaluateQuestion:
  // 1. Exact Answer
  const exactEval = evaluateQuestion({ question: q, userAnswer: q.correct_answer, state: 'ANSWERED' });
  if (!exactEval.isCorrect || exactEval.marksAwarded !== q.marks) {
    report.natChecks.boundaryFailures.push({
      id: q.id,
      test: 'exact_answer',
      input: q.correct_answer,
      expected: { isCorrect: true, marks: q.marks },
      actual: exactEval
    });
  }

  // 2. Exact min boundary
  const minEval = evaluateQuestion({ question: q, userAnswer: String(minVal), state: 'ANSWERED' });
  if (!minEval.isCorrect) {
    report.natChecks.boundaryFailures.push({
      id: q.id,
      test: 'min_boundary',
      input: minVal,
      expected: { isCorrect: true },
      actual: minEval
    });
  }

  // 3. Exact max boundary
  const maxEval = evaluateQuestion({ question: q, userAnswer: String(maxVal), state: 'ANSWERED' });
  if (!maxEval.isCorrect) {
    report.natChecks.boundaryFailures.push({
      id: q.id,
      test: 'max_boundary',
      input: maxVal,
      expected: { isCorrect: true },
      actual: maxEval
    });
  }

  // 4. Midpoint boundary
  const midVal = (minVal + maxVal) / 2;
  const midEval = evaluateQuestion({ question: q, userAnswer: String(midVal), state: 'ANSWERED' });
  if (!midEval.isCorrect) {
    report.natChecks.boundaryFailures.push({
      id: q.id,
      test: 'midpoint',
      input: midVal,
      expected: { isCorrect: true },
      actual: midEval
    });
  }

  // 5. Slightly below min: min - 0.05 (beyond tolerance/epsilon)
  const belowDelta = Math.max(0.05, Math.abs(minVal) * 0.01 + 0.05);
  const belowMin = minVal - belowDelta;
  const belowEval = evaluateQuestion({ question: q, userAnswer: String(belowMin), state: 'ANSWERED' });
  if (belowEval.isCorrect) {
    report.natChecks.boundaryFailures.push({
      id: q.id,
      test: 'below_min_should_fail',
      input: belowMin,
      min: minVal,
      expected: { isCorrect: false },
      actual: belowEval
    });
  }

  // 6. Slightly above max: max + 0.05 (beyond tolerance/epsilon)
  const aboveDelta = Math.max(0.05, Math.abs(maxVal) * 0.01 + 0.05);
  const aboveMax = maxVal + aboveDelta;
  const aboveEval = evaluateQuestion({ question: q, userAnswer: String(aboveMax), state: 'ANSWERED' });
  if (aboveEval.isCorrect) {
    report.natChecks.boundaryFailures.push({
      id: q.id,
      test: 'above_max_should_fail',
      input: aboveMax,
      max: maxVal,
      expected: { isCorrect: false },
      actual: aboveEval
    });
  }

  // 7. Float Epsilon buffer test: min - 1e-8 (must pass due to EPSILON = 1e-7)
  const epsInsideMin = minVal - (EPSILON / 2);
  const epsMinEval = evaluateQuestion({ question: q, userAnswer: String(epsInsideMin), state: 'ANSWERED' });
  if (!epsMinEval.isCorrect) {
    report.natChecks.epsilonPassFailures.push({
      id: q.id,
      test: 'epsilon_inside_min',
      input: epsInsideMin,
      min: minVal,
      actual: epsMinEval
    });
  }

  // 8. Float Epsilon buffer test: max + 1e-8 (must pass due to EPSILON = 1e-7)
  const epsInsideMax = maxVal + (EPSILON / 2);
  const epsMaxEval = evaluateQuestion({ question: q, userAnswer: String(epsInsideMax), state: 'ANSWERED' });
  if (!epsMaxEval.isCorrect) {
    report.natChecks.epsilonPassFailures.push({
      id: q.id,
      test: 'epsilon_inside_max',
      input: epsInsideMax,
      max: maxVal,
      actual: epsMaxEval
    });
  }

  // 9. Negative marks check: NAT must never have negative marks when incorrect
  if (belowEval.marksAwarded !== 0 || aboveEval.marksAwarded !== 0) {
    report.scoringAnomalies.push({
      id: q.id,
      error: `NAT incorrect answer was awarded non-zero marks: below=${belowEval.marksAwarded}, above=${aboveEval.marksAwarded}`
    });
  }

  // 10. Whitespace resiliency check: "  <ans>  "
  const spaceEval = evaluateQuestion({ question: q, userAnswer: `  ${q.correct_answer}  `, state: 'ANSWERED' });
  if (!spaceEval.isCorrect) {
    report.natChecks.robustnessFailures.push({
      id: q.id,
      test: 'whitespace_tolerance',
      error: `Evaluating trimmed answer failed: "${q.correct_answer}"`
    });
  }
}

console.log(`NAT questions checked: ${report.natChecks.totalNat}`);
console.log(`Valid range count: ${report.natChecks.validRangeCount}`);
console.log(`min > max violations: ${report.natChecks.minGreaterThanMax.length}`);
console.log(`answer outside range: ${report.natChecks.answerOutsideRange.length}`);
console.log(`Boundary failures: ${report.natChecks.boundaryFailures.length}`);
console.log(`Epsilon buffer failures: ${report.natChecks.epsilonPassFailures.length}`);
console.log(`Robustness failures: ${report.natChecks.robustnessFailures.length}`);
console.log(`Scoring anomalies: ${report.scoringAnomalies.length}`);

// Output summary as JSON
console.log('\n=== FINAL SUMMARY REPORT ===');
console.log(JSON.stringify({
  katexErrors: report.katexErrors,
  delimiterErrors: report.delimiterErrors,
  minGreaterThanMax: report.natChecks.minGreaterThanMax,
  answerOutsideRange: report.natChecks.answerOutsideRange,
  boundaryFailures: report.natChecks.boundaryFailures.slice(0, 10),
  epsilonPassFailures: report.natChecks.epsilonPassFailures.slice(0, 10),
  robustnessFailures: report.natChecks.robustnessFailures,
  scoringAnomalies: report.scoringAnomalies
}, null, 2));
