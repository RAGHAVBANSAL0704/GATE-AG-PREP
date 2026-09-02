import test from 'node:test';
import assert from 'node:assert/strict';
import { 
  analyzeStudentWeakSpots, 
  generateRemediationTestPayload, 
  getFormulasForWeakSubtopics 
} from '../src/services/diagnosticRadarService.js';

test('AI Diagnostic Radar & Weak-Area Remediation Engine Test Suite', async (t) => {

  const sampleQuestions = [
    {
      id: 'Q_FM_01',
      question: 'Tractor hitch dynamics question with 3-point linkage draft.',
      section: 'Section 2: Farm Machinery',
      topic: 'Tractor Hitches & Implement Mechanics',
      subtopic: '3-Point Linkage Force Resolution',
      type: 'MCQ',
      marks: 2,
      correct_answer: 'B'
    },
    {
      id: 'Q_FM_02',
      question: 'Mouldboard plough specific draft calculation.',
      section: 'Section 2: Farm Machinery',
      topic: 'Tillage Implements & Draft',
      subtopic: 'Mouldboard Plough Draft',
      type: 'MCQ',
      marks: 1,
      correct_answer: 'A'
    },
    {
      id: 'Q_SW_01',
      question: 'Manning formula open channel flow velocity.',
      section: 'Section 4: Soil and Water Conservation Engineering',
      topic: 'Open Channel Hydraulics',
      subtopic: 'Manning Equation Flow',
      type: 'NAT',
      marks: 2,
      correct_answer: '4.85 to 4.95'
    },
    {
      id: 'Q_EM_01',
      question: 'Eigenvalues and Cayley-Hamilton theorem matrix rank.',
      section: 'Section 1: Engineering Mathematics',
      topic: 'Linear Algebra',
      subtopic: 'Eigenvalues and Eigenvectors',
      type: 'MCQ',
      marks: 1,
      correct_answer: 'C'
    }
  ];

  await t.test('handles empty / new student history gracefully with unattempted status', () => {
    const report = analyzeStudentWeakSpots(sampleQuestions, []);

    assert.equal(report.hasData, false);
    assert.equal(report.totalQuestionsEvaluated, 0);
    assert.equal(report.totalNegativeMarksLostAll, 0);
    assert.ok(report.sectionStats['Section 2: Farm Machinery']);
    assert.equal(report.sectionStats['Section 2: Farm Machinery'].masteryTier, 'Unattempted');
    assert.ok(Array.isArray(report.relevantFormulas));
  });

  await t.test('accurately calculates error rates, negative marks, and ranks weak subtopics', () => {
    const mockAttempts = [
      {
        id: 'ATTEMPT_01',
        answers: {
          'Q_FM_01': 'C', // Incorrect (Lost 0.67 negative marks on 2M MCQ)
          'Q_FM_02': 'D', // Incorrect (Lost 0.33 negative marks on 1M MCQ)
          'Q_SW_01': '4.90', // Correct
          'Q_EM_01': 'C' // Correct
        },
        correctQuestionIds: ['Q_SW_01', 'Q_EM_01'],
        timeSpentPerQuestion: {
          'Q_FM_01': 180, // 3 mins (high time overhead)
          'Q_FM_02': 60,
          'Q_SW_01': 90,
          'Q_EM_01': 45
        }
      }
    ];

    const report = analyzeStudentWeakSpots(sampleQuestions, mockAttempts);

    assert.equal(report.hasData, true);
    assert.equal(report.totalQuestionsEvaluated, 4);
    assert.ok(report.totalNegativeMarksLostAll >= 0.9, 'Must record negative marks lost');

    // Check ranked subtopics
    assert.ok(report.rankedSubtopics.length > 0);
    const topWeak = report.topCriticalWeakSpots[0];
    assert.ok(topWeak, 'Must identify top critical weak spot');
    assert.ok(topWeak.section.includes('Farm Machinery'));
    assert.equal(topWeak.incorrect, 1);
    assert.ok(topWeak.vulnerabilityScore > 50, 'Vulnerability score should be elevated for incorrect answers');

    // Check Section Stats
    const fmSection = report.sectionStats['Section 2: Farm Machinery'];
    assert.ok(fmSection.attempted >= 2);
    assert.equal(fmSection.correct, 0);
    assert.equal(fmSection.masteryTier, 'Critical');
  });

  await t.test('generates focused 15-minute Remediation Test payload targeting weak spots', () => {
    const weakSubtopics = [
      {
        section: 'Section 2: Farm Machinery',
        topic: 'Tractor Hitches & Implement Mechanics',
        subtopic: '3-Point Linkage Force Resolution',
        failedQuestions: [sampleQuestions[0]]
      }
    ];

    const testPayload = generateRemediationTestPayload(weakSubtopics, sampleQuestions, 2);

    assert.ok(testPayload.id.startsWith('REMEDIATION_'));
    assert.equal(testPayload.duration_mins, 15);
    assert.equal(testPayload.questions.length, 2);
    assert.equal(testPayload.questions[0].id, 'Q_FM_01', 'Must include failed question first');
  });

  await t.test('extracts matching high-yield formulas for weak subtopics', () => {
    const weakSubtopics = [
      {
        section: 'Section 4: Soil and Water Conservation Engineering',
        topic: 'Open Channel Hydraulics',
        subtopic: 'Manning Equation Flow'
      }
    ];

    const formulas = getFormulasForWeakSubtopics(weakSubtopics);
    assert.ok(Array.isArray(formulas));
    assert.ok(formulas.length > 0);
  });
});
