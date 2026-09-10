import katex from 'katex';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { ALL_QUESTION_BANK_QUESTIONS, getQuestionBankStats } from '../src/data/question_bank/index.js';
import { evaluateQuestion, EPSILON } from '../src/utils/scoring.js';
import { renderMathToHtmlString } from '../src/utils/mathFormatting.js';

console.log('===============================================================');
console.log('   EMPIRICAL CHALLENGER ADVERSARIAL STRESS TEST HARNESS       ');
console.log('===============================================================');
console.log(`Total Question Bank items under test: ${ALL_QUESTION_BANK_QUESTIONS.length}`);

const cwd = process.cwd();
const officialSyllabus = JSON.parse(readFileSync(join(cwd, 'src/data/official_syllabus.json'), 'utf8'));

const audit = {
  totalQuestions: ALL_QUESTION_BANK_QUESTIONS.length,
  byType: { MCQ: 0, MSQ: 0, NAT: 0 },
  byMarks: { 1: 0, 2: 0 },
  bySection: {},
  
  // KaTeX Results
  katexBlocksChecked: 0,
  katexStrictFailures: [],
  delimiterFailures: [],
  htmlEscapeIssues: [],

  // MSQ Results
  msqAudit: {
    total: 0,
    sortedArrayPass: 0,
    sortedArrayFailures: [],
    validOptionsPass: 0,
    validOptionsFailures: [],
    exactScoringPass: 0,
    exactScoringFailures: [],
    permutationScoringPass: 0,
    permutationScoringFailures: [],
    partialZeroPass: 0,
    partialZeroFailures: [],
    supersetZeroPass: 0,
    supersetZeroFailures: [],
    disjointZeroPass: 0,
    disjointZeroFailures: [],
    noNegativePenaltyPass: 0,
    negativePenaltyFailures: []
  },

  // NAT Results
  natAudit: {
    total: 0,
    finiteNumberPass: 0,
    finiteNumberFailures: [],
    validRangePass: 0,
    minGreaterThanMax: [],
    outsideRangeFailures: [],
    exactPass: 0,
    minBoundaryPass: 0,
    maxBoundaryPass: 0,
    midpointPass: 0,
    boundaryFailures: [],
    epsilonPass: 0,
    epsilonFailures: [],
    outerBoundaryZeroPass: 0,
    outerBoundaryFailures: [],
    negativeMarksZeroPass: 0,
    negativeMarksFailures: [],
    whitespaceResiliencePass: 0,
    whitespaceFailures: [],
    invalidInputResiliencePass: 0,
    invalidInputFailures: []
  },

  // MCQ Results
  mcqAudit: {
    total: 0,
    validKeyPass: 0,
    validKeyFailures: [],
    optionsCompletePass: 0,
    optionsFailures: [],
    exactScorePass: 0,
    exactScoreFailures: [],
    negativePenaltyPass: 0,
    negativePenaltyFailures: []
  },

  // Syllabus Coverage Results
  syllabusAudit: {
    totalOfficialSections: officialSyllabus.length,
    totalOfficialTopics: 0,
    totalOfficialSubtopics: 0,
    coveredOfficialSubtopics: 0,
    uncoveredOfficialSubtopics: [],
    coveredOfficialTopics: 0,
    uncoveredOfficialTopics: [],
    subtopicsPerSection: {}
  },

  // Invariants
  invariants: {
    pyqCount: 0,
    pyqValid: false,
    pyqLeakage: 0,
    mockCount: 0,
    mockValid: false,
    mockLeakage: 0
  }
};

// =========================================================================
// TEST 1: METRICS & DISTRIBUTION
// =========================================================================
for (const q of ALL_QUESTION_BANK_QUESTIONS) {
  audit.byType[q.type] = (audit.byType[q.type] || 0) + 1;
  audit.byMarks[q.marks] = (audit.byMarks[q.marks] || 0) + 1;
  if (!audit.bySection[q.section]) {
    audit.bySection[q.section] = { total: 0, MCQ: 0, MSQ: 0, NAT: 0, '1M': 0, '2M': 0 };
  }
  audit.bySection[q.section].total++;
  audit.bySection[q.section][q.type]++;
  audit.bySection[q.section][q.marks + 'M']++;
}

// =========================================================================
// TEST 2: KATEX FORMULA PARSING & DELIMITER INTEGRITY
// =========================================================================
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

    // Check $ delimiter pairing
    const unescapedDollars = (text.match(/(?<!\\)\$/g) || []).length;
    if (unescapedDollars % 2 !== 0) {
      audit.delimiterFailures.push({
        id: q.id,
        field: name,
        error: `Odd number of unescaped $ delimiters (${unescapedDollars})`
      });
    }

    // Check \[ \]
    const openDisplay = (text.match(/\\\[/g) || []).length;
    const closeDisplay = (text.match(/\\\]/g) || []).length;
    if (openDisplay !== closeDisplay) {
      audit.delimiterFailures.push({
        id: q.id,
        field: name,
        error: `Unbalanced display delimiters: ${openDisplay} '\\[', ${closeDisplay} '\\]'`
      });
    }

    // Check \( \)
    const openInline = (text.match(/\\\(/g) || []).length;
    const closeInline = (text.match(/\\\)/g) || []).length;
    if (openInline !== closeInline) {
      audit.delimiterFailures.push({
        id: q.id,
        field: name,
        error: `Unbalanced inline delimiters: ${openInline} '\\(', ${closeInline} '\\)'`
      });
    }

    // Extract all math blocks and render strictly
    const mathBlocks = [];
    text.replace(/\$\$([\s\S]*?)\$\$/g, (_, m) => { mathBlocks.push({ type: '$$', math: m }); return ''; });
    text.replace(/\$([^$\n]+)\$/g, (_, m) => { mathBlocks.push({ type: '$', math: m }); return ''; });
    text.replace(/\\\[([\s\S]*?)\\\]/g, (_, m) => { mathBlocks.push({ type: '\\[\\]', math: m }); return ''; });
    text.replace(/\\\(([\s\S]*?)\\\)/g, (_, m) => { mathBlocks.push({ type: '\\(\\)', math: m }); return ''; });

    for (const { type, math } of mathBlocks) {
      audit.katexBlocksChecked++;
      let cleanMath = math.trim();
      cleanMath = cleanMath.replace(/\\degree\b/g, '^\\circ');

      // KaTeX strict parse
      try {
        katex.renderToString(cleanMath, {
          displayMode: type === '$$' || type === '\\[\\]',
          throwOnError: true
        });
      } catch (err) {
        audit.katexStrictFailures.push({
          id: q.id,
          field: name,
          math: cleanMath,
          error: err.message
        });
      }
    }

    // Check production formatter
    try {
      const rendered = renderMathToHtmlString(text);
      if (typeof rendered !== 'string' || rendered.length === 0) {
        audit.htmlEscapeIssues.push({ id: q.id, field: name, error: 'Empty output from renderMathToHtmlString' });
      }
    } catch (err) {
      audit.htmlEscapeIssues.push({ id: q.id, field: name, error: err.message });
    }
  }
}

// =========================================================================
// TEST 3: MSQ DEEP ADVERSARIAL AUDIT
// =========================================================================
const msqQuestions = ALL_QUESTION_BANK_QUESTIONS.filter(q => q.type === 'MSQ');
audit.msqAudit.total = msqQuestions.length;

for (const q of msqQuestions) {
  // 1. Array check
  if (!Array.isArray(q.correct_answer) || q.correct_answer.length === 0 || q.correct_answer.length > 4) {
    audit.msqAudit.sortedArrayFailures.push({
      id: q.id,
      error: `correct_answer is not an array with 1-4 elements: ${JSON.stringify(q.correct_answer)}`
    });
    continue;
  }

  // 2. Sorted alphabetical check
  const sorted = [...q.correct_answer].sort();
  let isSorted = true;
  for (let i = 0; i < q.correct_answer.length; i++) {
    if (q.correct_answer[i] !== sorted[i]) {
      isSorted = false;
      break;
    }
  }
  if (!isSorted) {
    audit.msqAudit.sortedArrayFailures.push({
      id: q.id,
      actual: q.correct_answer,
      expected: sorted
    });
  } else {
    audit.msqAudit.sortedArrayPass++;
  }

  // 3. Options validation: A, B, C, D present and non-empty
  const validOptionKeys = ['A', 'B', 'C', 'D'];
  const hasAllOpts = q.options && validOptionKeys.every(k => q.options[k] && String(q.options[k]).trim().length > 0);
  const keysValid = q.correct_answer.every(k => validOptionKeys.includes(k));
  const uniqueKeys = new Set(q.correct_answer).size === q.correct_answer.length;

  if (!hasAllOpts || !keysValid || !uniqueKeys) {
    audit.msqAudit.validOptionsFailures.push({
      id: q.id,
      hasAllOpts,
      keysValid,
      uniqueKeys,
      answer: q.correct_answer
    });
  } else {
    audit.msqAudit.validOptionsPass++;
  }

  // 4. Exact scoring evaluation
  const exactEval = evaluateQuestion({ question: q, userAnswer: q.correct_answer, state: 'ANSWERED' });
  if (exactEval.isCorrect && exactEval.marksAwarded === q.marks) {
    audit.msqAudit.exactScoringPass++;
  } else {
    audit.msqAudit.exactScoringFailures.push({ id: q.id, actual: exactEval });
  }

  // 5. Permutation order independence: e.g. ['C', 'A'] instead of ['A', 'C']
  const reversed = [...q.correct_answer].reverse();
  const permEval = evaluateQuestion({ question: q, userAnswer: reversed, state: 'ANSWERED' });
  if (permEval.isCorrect && permEval.marksAwarded === q.marks) {
    audit.msqAudit.permutationScoringPass++;
  } else {
    audit.msqAudit.permutationScoringFailures.push({ id: q.id, actual: permEval });
  }

  // 6. Partial answers must award strictly 0 marks
  if (q.correct_answer.length > 1) {
    const partialAnswer = [q.correct_answer[0]];
    const partEval = evaluateQuestion({ question: q, userAnswer: partialAnswer, state: 'ANSWERED' });
    if (!partEval.isCorrect && partEval.marksAwarded === 0) {
      audit.msqAudit.partialZeroPass++;
    } else {
      audit.msqAudit.partialZeroFailures.push({ id: q.id, partialAnswer, actual: partEval });
    }
  } else {
    audit.msqAudit.partialZeroPass++;
  }

  // 7. Superset answers (correct + extra key) must award 0 marks
  const wrongKey = validOptionKeys.find(k => !q.correct_answer.includes(k));
  if (wrongKey) {
    const superset = [...q.correct_answer, wrongKey];
    const superEval = evaluateQuestion({ question: q, userAnswer: superset, state: 'ANSWERED' });
    if (!superEval.isCorrect && superEval.marksAwarded === 0) {
      audit.msqAudit.supersetZeroPass++;
    } else {
      audit.msqAudit.supersetZeroFailures.push({ id: q.id, superset, actual: superEval });
    }
  } else {
    audit.msqAudit.supersetZeroPass++;
  }

  // 8. Completely disjoint incorrect set
  const disjointKeys = validOptionKeys.filter(k => !q.correct_answer.includes(k));
  if (disjointKeys.length > 0) {
    const disjointEval = evaluateQuestion({ question: q, userAnswer: disjointKeys, state: 'ANSWERED' });
    if (!disjointEval.isCorrect && disjointEval.marksAwarded === 0) {
      audit.msqAudit.disjointZeroPass++;
    } else {
      audit.msqAudit.disjointZeroFailures.push({ id: q.id, disjointKeys, actual: disjointEval });
    }
  } else {
    audit.msqAudit.disjointZeroPass++;
  }

  // 9. Negative marks check: must strictly be 0
  if (q.negative_marks !== 0) {
    audit.msqAudit.negativePenaltyFailures.push({ id: q.id, negative_marks: q.negative_marks });
  } else {
    audit.msqAudit.noNegativePenaltyPass++;
  }
}

// =========================================================================
// TEST 4: NAT DEEP ADVERSARIAL AUDIT
// =========================================================================
const natQuestions = ALL_QUESTION_BANK_QUESTIONS.filter(q => q.type === 'NAT');
audit.natAudit.total = natQuestions.length;

for (const q of natQuestions) {
  const ansNum = parseFloat(String(q.correct_answer));
  if (!Number.isFinite(ansNum)) {
    audit.natAudit.finiteNumberFailures.push({ id: q.id, ans: q.correct_answer });
    continue;
  }
  audit.natAudit.finiteNumberPass++;

  let minVal, maxVal;
  if (q.numerical_range) {
    minVal = q.numerical_range.min;
    maxVal = q.numerical_range.max;

    if (minVal > maxVal) {
      audit.natAudit.minGreaterThanMax.push({ id: q.id, min: minVal, max: maxVal });
      continue;
    }
    audit.natAudit.validRangePass++;

    if (ansNum < minVal - 1e-4 || ansNum > maxVal + 1e-4) {
      audit.natAudit.outsideRangeFailures.push({ id: q.id, ans: ansNum, min: minVal, max: maxVal });
    }
  } else {
    const tol = q.tolerance !== undefined ? Number(q.tolerance) : 0.05;
    minVal = ansNum - tol;
    maxVal = ansNum + tol;
    audit.natAudit.validRangePass++;
  }

  // Test exact answer
  const exactEval = evaluateQuestion({ question: q, userAnswer: q.correct_answer, state: 'ANSWERED' });
  if (exactEval.isCorrect && exactEval.marksAwarded === q.marks) {
    audit.natAudit.exactPass++;
  } else {
    audit.natAudit.boundaryFailures.push({ id: q.id, test: 'exact', actual: exactEval });
  }

  // Test exact min
  const minEval = evaluateQuestion({ question: q, userAnswer: String(minVal), state: 'ANSWERED' });
  if (minEval.isCorrect) {
    audit.natAudit.minBoundaryPass++;
  } else {
    audit.natAudit.boundaryFailures.push({ id: q.id, test: 'min', val: minVal, actual: minEval });
  }

  // Test exact max
  const maxEval = evaluateQuestion({ question: q, userAnswer: String(maxVal), state: 'ANSWERED' });
  if (maxEval.isCorrect) {
    audit.natAudit.maxBoundaryPass++;
  } else {
    audit.natAudit.boundaryFailures.push({ id: q.id, test: 'max', val: maxVal, actual: maxEval });
  }

  // Test midpoint
  const midVal = (minVal + maxVal) / 2;
  const midEval = evaluateQuestion({ question: q, userAnswer: String(midVal), state: 'ANSWERED' });
  if (midEval.isCorrect) {
    audit.natAudit.midpointPass++;
  } else {
    audit.natAudit.boundaryFailures.push({ id: q.id, test: 'mid', val: midVal, actual: midEval });
  }

  // Float Epsilon checks: min - EPSILON/2 and max + EPSILON/2
  const epsInsideMin = minVal - (EPSILON / 2);
  const epsInsideMax = maxVal + (EPSILON / 2);
  const epsMinEval = evaluateQuestion({ question: q, userAnswer: String(epsInsideMin), state: 'ANSWERED' });
  const epsMaxEval = evaluateQuestion({ question: q, userAnswer: String(epsInsideMax), state: 'ANSWERED' });
  if (epsMinEval.isCorrect && epsMaxEval.isCorrect) {
    audit.natAudit.epsilonPass++;
  } else {
    audit.natAudit.epsilonFailures.push({ id: q.id, epsMinEval, epsMaxEval });
  }

  // Outer boundaries: min - 0.05 and max + 0.05 (must be incorrect and award strictly 0 marks)
  const delta = Math.max(0.05, Math.abs(minVal) * 0.01 + 0.05);
  const belowVal = minVal - delta;
  const aboveVal = maxVal + delta;
  const belowEval = evaluateQuestion({ question: q, userAnswer: String(belowVal), state: 'ANSWERED' });
  const aboveEval = evaluateQuestion({ question: q, userAnswer: String(aboveVal), state: 'ANSWERED' });

  if (!belowEval.isCorrect && !aboveEval.isCorrect && belowEval.marksAwarded === 0 && aboveEval.marksAwarded === 0) {
    audit.natAudit.outerBoundaryZeroPass++;
  } else {
    audit.natAudit.outerBoundaryFailures.push({ id: q.id, belowEval, aboveEval });
  }

  // Negative marks must strictly be 0
  if (q.negative_marks !== 0) {
    audit.natAudit.negativeMarksFailures.push({ id: q.id, negative_marks: q.negative_marks });
  } else {
    audit.natAudit.negativeMarksZeroPass++;
  }

  // Whitespace resilience: "   <val>   "
  const spaceEval = evaluateQuestion({ question: q, userAnswer: `   ${q.correct_answer}   `, state: 'ANSWERED' });
  if (spaceEval.isCorrect) {
    audit.natAudit.whitespaceResiliencePass++;
  } else {
    audit.natAudit.whitespaceFailures.push({ id: q.id, ans: q.correct_answer });
  }

  // Invalid inputs resilience: "invalid", "", null, undefined
  try {
    const inv1 = evaluateQuestion({ question: q, userAnswer: "not_a_number", state: 'ANSWERED' });
    const inv2 = evaluateQuestion({ question: q, userAnswer: "", state: 'ANSWERED' });
    const inv3 = evaluateQuestion({ question: q, userAnswer: null, state: 'ANSWERED' });
    if (!inv1.isCorrect && inv1.marksAwarded === 0 &&
        !inv2.isAttempted && inv2.marksAwarded === 0 &&
        !inv3.isAttempted && inv3.marksAwarded === 0) {
      audit.natAudit.invalidInputResiliencePass++;
    } else {
      audit.natAudit.invalidInputFailures.push({ id: q.id, inv1, inv2, inv3 });
    }
  } catch (err) {
    audit.natAudit.invalidInputFailures.push({ id: q.id, error: err.message });
  }
}

// =========================================================================
// TEST 5: MCQ AUDIT
// =========================================================================
const mcqQuestions = ALL_QUESTION_BANK_QUESTIONS.filter(q => q.type === 'MCQ');
audit.mcqAudit.total = mcqQuestions.length;

for (const q of mcqQuestions) {
  if (['A', 'B', 'C', 'D'].includes(q.correct_answer)) {
    audit.mcqAudit.validKeyPass++;
  } else {
    audit.mcqAudit.validKeyFailures.push({ id: q.id, key: q.correct_answer });
  }

  const hasAllOpts = q.options && ['A', 'B', 'C', 'D'].every(k => q.options[k] && String(q.options[k]).trim().length > 0);
  if (hasAllOpts) {
    audit.mcqAudit.optionsCompletePass++;
  } else {
    audit.mcqAudit.optionsFailures.push({ id: q.id });
  }

  const exactEval = evaluateQuestion({ question: q, userAnswer: q.correct_answer, state: 'ANSWERED' });
  if (exactEval.isCorrect && exactEval.marksAwarded === q.marks) {
    audit.mcqAudit.exactScorePass++;
  } else {
    audit.mcqAudit.exactScoreFailures.push({ id: q.id, actual: exactEval });
  }

  const wrongKey = ['A', 'B', 'C', 'D'].find(k => k !== q.correct_answer);
  const wrongEval = evaluateQuestion({ question: q, userAnswer: wrongKey, state: 'ANSWERED' });
  const expectedPenalty = q.marks === 1 ? -0.33 : -0.67;
  if (!wrongEval.isCorrect && Math.abs(wrongEval.marksAwarded - expectedPenalty) < 0.05) {
    audit.mcqAudit.negativePenaltyPass++;
  } else {
    audit.mcqAudit.negativePenaltyFailures.push({ id: q.id, actual: wrongEval, expected: expectedPenalty });
  }
}

// =========================================================================
// TEST 6: SYLLABUS SUBTOPIC COVERAGE AUDIT
// =========================================================================
const qbSubtopics = new Set();
const qbSubtopicsNormalized = new Set();
const qbTopics = new Set();

for (const q of ALL_QUESTION_BANK_QUESTIONS) {
  if (q.subtopic) {
    qbSubtopics.add(q.subtopic.trim());
    qbSubtopicsNormalized.add(q.subtopic.trim().toLowerCase().replace(/[^a-z0-9]/g, ''));
  }
  if (q.topic) {
    qbTopics.add(q.topic.trim());
  }
}

for (const sec of officialSyllabus) {
  audit.syllabusAudit.subtopicsPerSection[sec.full_title] = {
    officialTopics: sec.topics.length,
    officialSubtopics: 0,
    matchedSubtopics: 0,
    qbQuestions: ALL_QUESTION_BANK_QUESTIONS.filter(q => q.section === sec.full_title).length
  };

  for (const top of sec.topics) {
    audit.syllabusAudit.totalOfficialTopics++;
    if (qbTopics.has(top.topic_name.trim())) {
      audit.syllabusAudit.coveredOfficialTopics++;
    } else {
      audit.syllabusAudit.uncoveredOfficialTopics.push({ section: sec.full_title, topic: top.topic_name });
    }

    for (const sub of top.subtopics) {
      audit.syllabusAudit.totalOfficialSubtopics++;
      audit.syllabusAudit.subtopicsPerSection[sec.full_title].officialSubtopics++;
      
      const subTrim = sub.trim();
      const subNorm = subTrim.toLowerCase().replace(/[^a-z0-9]/g, '');

      // Check direct or substring match against QB subtopics or questions
      const matchedDirect = qbSubtopics.has(subTrim) || qbSubtopicsNormalized.has(subNorm);
      const matchedFuzzy = Array.from(qbSubtopics).some(qs => {
        const qNorm = qs.toLowerCase().replace(/[^a-z0-9]/g, '');
        return qNorm.includes(subNorm) || subNorm.includes(qNorm) ||
               qs.toLowerCase().split(/\s+/).filter(w => w.length > 4).some(w => sub.toLowerCase().includes(w));
      });

      if (matchedDirect || matchedFuzzy) {
        audit.syllabusAudit.coveredOfficialSubtopics++;
        audit.syllabusAudit.subtopicsPerSection[sec.full_title].matchedSubtopics++;
      } else {
        audit.syllabusAudit.uncoveredOfficialSubtopics.push({
          section: sec.full_title,
          topic: top.topic_name,
          subtopic: sub
        });
      }
    }
  }
}

// =========================================================================
// TEST 7: SYSTEM INVARIANTS AUDIT
// =========================================================================
const pyqs = JSON.parse(readFileSync(join(cwd, 'src/data/questions.json'), 'utf8'));
audit.invariants.pyqCount = pyqs.length;
audit.invariants.pyqValid = (pyqs.length === 1324);
audit.invariants.pyqLeakage = pyqs.filter(q => q.id && String(q.id).startsWith('QB_')).length;

let mockFilesValid = 0;
let totalMockQBLeakage = 0;
for (let i = 1; i <= 50; i++) {
  const pad = String(i).padStart(2, '0');
  const mockPath = join(cwd, 'src/data', `custom_mock_2027_${pad}.json`);
  if (existsSync(mockPath)) {
    const mock = JSON.parse(readFileSync(mockPath, 'utf8'));
    if (mock.questions && mock.questions.length === 65) {
      mockFilesValid++;
    }
    const leaked = mock.questions.filter(q => q.id && String(q.id).startsWith('QB_')).length;
    totalMockQBLeakage += leaked;
  }
}
audit.invariants.mockCount = mockFilesValid;
audit.invariants.mockValid = (mockFilesValid === 50);
audit.invariants.mockLeakage = totalMockQBLeakage;

// =========================================================================
// REPORT GENERATION
// =========================================================================
console.log('\n--- AUDIT RESULTS ---');
console.log(`Total QB Questions: ${audit.totalQuestions}`);
console.log(`Types: MCQ=${audit.byType.MCQ}, MSQ=${audit.byType.MSQ}, NAT=${audit.byType.NAT}`);
console.log(`Marks: 1M=${audit.byMarks[1]}, 2M=${audit.byMarks[2]}`);

console.log('\n--- Section Distribution ---');
for (const [sec, s] of Object.entries(audit.bySection)) {
  console.log(`- ${sec}: Total=${s.total} (MCQ: ${s.MCQ}, MSQ: ${s.MSQ}, NAT: ${s.NAT} | 1M: ${s['1M']}, 2M: ${s['2M']})`);
}

console.log('\n--- KaTeX Stress Audit ---');
console.log(`Checked ${audit.katexBlocksChecked} blocks.`);
console.log(`Strict parse errors: ${audit.katexStrictFailures.length}`);
console.log(`Delimiter failures: ${audit.delimiterFailures.length}`);
console.log(`Formatter failures: ${audit.htmlEscapeIssues.length}`);

console.log('\n--- MSQ Adversarial Audit ---');
console.log(`Total MSQ: ${audit.msqAudit.total}`);
console.log(`Sorted array check: ${audit.msqAudit.sortedArrayPass} pass / ${audit.msqAudit.sortedArrayFailures.length} fail`);
console.log(`Valid options (A-D) check: ${audit.msqAudit.validOptionsPass} pass / ${audit.msqAudit.validOptionsFailures.length} fail`);
console.log(`Exact match scoring: ${audit.msqAudit.exactScoringPass} pass / ${audit.msqAudit.exactScoringFailures.length} fail`);
console.log(`Permutation order-independence: ${audit.msqAudit.permutationScoringPass} pass / ${audit.msqAudit.permutationScoringFailures.length} fail`);
console.log(`Partial answers (strictly 0 marks): ${audit.msqAudit.partialZeroPass} pass / ${audit.msqAudit.partialZeroFailures.length} fail`);
console.log(`Superset answers (strictly 0 marks): ${audit.msqAudit.supersetZeroPass} pass / ${audit.msqAudit.supersetZeroFailures.length} fail`);
console.log(`Disjoint answers (strictly 0 marks): ${audit.msqAudit.disjointZeroPass} pass / ${audit.msqAudit.disjointZeroFailures.length} fail`);
console.log(`Zero negative penalty: ${audit.msqAudit.noNegativePenaltyPass} pass / ${audit.msqAudit.negativePenaltyFailures.length} fail`);

console.log('\n--- NAT Adversarial Audit ---');
console.log(`Total NAT: ${audit.natAudit.total}`);
console.log(`Finite numbers: ${audit.natAudit.finiteNumberPass} pass / ${audit.natAudit.finiteNumberFailures.length} fail`);
console.log(`Valid ranges (min <= max): ${audit.natAudit.validRangePass} pass / ${audit.natAudit.minGreaterThanMax.length} fail`);
console.log(`Answers within ranges: ${audit.natAudit.total - audit.natAudit.outsideRangeFailures.length} pass / ${audit.natAudit.outsideRangeFailures.length} fail`);
console.log(`Exact answers: ${audit.natAudit.exactPass} pass / ${audit.natAudit.boundaryFailures.filter(f => f.test === 'exact').length} fail`);
console.log(`Min boundaries: ${audit.natAudit.minBoundaryPass} pass / ${audit.natAudit.boundaryFailures.filter(f => f.test === 'min').length} fail`);
console.log(`Max boundaries: ${audit.natAudit.maxBoundaryPass} pass / ${audit.natAudit.boundaryFailures.filter(f => f.test === 'max').length} fail`);
console.log(`Midpoint boundaries: ${audit.natAudit.midpointPass} pass / ${audit.natAudit.boundaryFailures.filter(f => f.test === 'mid').length} fail`);
console.log(`Float Epsilon buffer (EPSILON/2): ${audit.natAudit.epsilonPass} pass / ${audit.natAudit.epsilonFailures.length} fail`);
console.log(`Outer boundaries (fail & 0 marks): ${audit.natAudit.outerBoundaryZeroPass} pass / ${audit.natAudit.outerBoundaryFailures.length} fail`);
console.log(`Negative penalty (strictly 0 marks): ${audit.natAudit.negativeMarksZeroPass} pass / ${audit.natAudit.negativeMarksFailures.length} fail`);
console.log(`Whitespace resilience: ${audit.natAudit.whitespaceResiliencePass} pass / ${audit.natAudit.whitespaceFailures.length} fail`);
console.log(`Invalid input resilience: ${audit.natAudit.invalidInputResiliencePass} pass / ${audit.natAudit.invalidInputFailures.length} fail`);

console.log('\n--- MCQ Audit ---');
console.log(`Total MCQ: ${audit.mcqAudit.total}`);
console.log(`Valid single keys (A-D): ${audit.mcqAudit.validKeyPass} pass / ${audit.mcqAudit.validKeyFailures.length} fail`);
console.log(`Options complete (A,B,C,D): ${audit.mcqAudit.optionsCompletePass} pass / ${audit.mcqAudit.optionsFailures.length} fail`);
console.log(`Exact scoring (+1 or +2): ${audit.mcqAudit.exactScorePass} pass / ${audit.mcqAudit.exactScoreFailures.length} fail`);
console.log(`Negative penalties (-0.33 or -0.67): ${audit.mcqAudit.negativePenaltyPass} pass / ${audit.mcqAudit.negativePenaltyFailures.length} fail`);

console.log('\n--- Syllabus Coverage Audit ---');
console.log(`Official Sections: ${audit.syllabusAudit.totalOfficialSections} / 8 represented`);
console.log(`Official Topics: ${audit.syllabusAudit.coveredOfficialTopics} / ${audit.syllabusAudit.totalOfficialTopics}`);
console.log(`Official Subtopics: ${audit.syllabusAudit.coveredOfficialSubtopics} / ${audit.syllabusAudit.totalOfficialSubtopics}`);
for (const [sec, d] of Object.entries(audit.syllabusAudit.subtopicsPerSection)) {
  console.log(`- ${sec}: QB Questions=${d.qbQuestions} | Subtopics Matched: ${d.matchedSubtopics} / ${d.officialSubtopics}`);
}

console.log('\n--- Invariants Audit ---');
console.log(`Official PYQs: ${audit.invariants.pyqCount} (Expected 1324) | QB Leakage: ${audit.invariants.pyqLeakage}`);
console.log(`Custom Mocks: ${audit.invariants.mockCount} (Expected 50) | QB Leakage: ${audit.invariants.mockLeakage}`);

const verdict = (
  audit.katexStrictFailures.length === 0 &&
  audit.delimiterFailures.length === 0 &&
  audit.msqAudit.sortedArrayFailures.length === 0 &&
  audit.msqAudit.validOptionsFailures.length === 0 &&
  audit.msqAudit.exactScoringFailures.length === 0 &&
  audit.msqAudit.partialZeroFailures.length === 0 &&
  audit.msqAudit.supersetZeroFailures.length === 0 &&
  audit.msqAudit.negativePenaltyFailures.length === 0 &&
  audit.natAudit.finiteNumberFailures.length === 0 &&
  audit.natAudit.minGreaterThanMax.length === 0 &&
  audit.natAudit.outsideRangeFailures.length === 0 &&
  audit.natAudit.boundaryFailures.length === 0 &&
  audit.natAudit.epsilonFailures.length === 0 &&
  audit.natAudit.outerBoundaryFailures.length === 0 &&
  audit.natAudit.negativeMarksFailures.length === 0 &&
  audit.mcqAudit.validKeyFailures.length === 0 &&
  audit.mcqAudit.optionsFailures.length === 0 &&
  audit.mcqAudit.exactScoreFailures.length === 0 &&
  audit.mcqAudit.negativePenaltyFailures.length === 0 &&
  audit.invariants.pyqValid &&
  audit.invariants.pyqLeakage === 0 &&
  audit.invariants.mockValid &&
  audit.invariants.mockLeakage === 0
) ? 'CONFIRMED_CORRECT' : 'FAIL';

console.log(`\n>>> HARNESS VERDICT: ${verdict} <<<`);
