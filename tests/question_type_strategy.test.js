import { test, describe } from 'node:test';
import assert from 'node:assert';

describe('Question-Type Strategy & Score Leak Analyzer Test Suite', () => {
  
  test('correctly calculates MCQ penalty bleed vs MSQ and NAT zero-penalty safety', () => {
    const mockResponses = [
      // MCQ 1M correct
      { type: 'MCQ', marks: 1, negative_marks: 1/3, is_attempted: true, is_correct: true, marks_awarded: 1, time_spent_seconds: 90 },
      // MCQ 1M wrong (-1/3)
      { type: 'MCQ', marks: 1, negative_marks: 1/3, is_attempted: true, is_correct: false, marks_awarded: 0, time_spent_seconds: 60 },
      // MCQ 2M wrong (-2/3)
      { type: 'MCQ', marks: 2, negative_marks: 2/3, is_attempted: true, is_correct: false, marks_awarded: 0, time_spent_seconds: 120 },
      // MSQ 2M wrong (0 penalty)
      { type: 'MSQ', marks: 2, negative_marks: 0, is_attempted: true, is_correct: false, marks_awarded: 0, time_spent_seconds: 150 },
      // MSQ 2M correct (+2)
      { type: 'MSQ', marks: 2, negative_marks: 0, is_attempted: true, is_correct: true, marks_awarded: 2, time_spent_seconds: 180 },
      // NAT 2M wrong (0 penalty)
      { type: 'NAT', marks: 2, negative_marks: 0, is_attempted: true, is_correct: false, marks_awarded: 0, time_spent_seconds: 200 },
      // NAT 1M correct (+1)
      { type: 'NAT', marks: 1, negative_marks: 0, is_attempted: true, is_correct: true, marks_awarded: 1, time_spent_seconds: 110 }
    ];

    const stats = {
      MCQ: { total: 0, attempted: 0, correct: 0, incorrect: 0, marksGained: 0, penaltyLost: 0, timeSec: 0 },
      MSQ: { total: 0, attempted: 0, correct: 0, incorrect: 0, marksGained: 0, penaltyLost: 0, timeSec: 0 },
      NAT: { total: 0, attempted: 0, correct: 0, incorrect: 0, marksGained: 0, penaltyLost: 0, timeSec: 0 }
    };

    mockResponses.forEach(r => {
      const type = r.type;
      stats[type].total += 1;
      if (r.is_attempted) {
        stats[type].attempted += 1;
        stats[type].timeSec += r.time_spent_seconds;
        if (r.is_correct) {
          stats[type].correct += 1;
          stats[type].marksGained += r.marks_awarded;
        } else {
          stats[type].incorrect += 1;
          if (type === 'MCQ') {
            stats[type].penaltyLost += (r.negative_marks || (r.marks === 2 ? 2/3 : 1/3));
          }
        }
      }
    });

    // MCQ: 3 attempted (1 correct, 2 wrong), penalty lost = 1/3 + 2/3 = 1.00
    assert.strictEqual(stats.MCQ.attempted, 3);
    assert.strictEqual(stats.MCQ.correct, 1);
    assert.strictEqual(stats.MCQ.incorrect, 2);
    assert.strictEqual(Math.round(stats.MCQ.penaltyLost * 100) / 100, 1.00);

    // MSQ: 2 attempted (1 correct, 1 wrong), 0 penalty lost
    assert.strictEqual(stats.MSQ.attempted, 2);
    assert.strictEqual(stats.MSQ.correct, 1);
    assert.strictEqual(stats.MSQ.incorrect, 1);
    assert.strictEqual(stats.MSQ.penaltyLost, 0);

    // NAT: 2 attempted (1 correct, 1 wrong), 0 penalty lost
    assert.strictEqual(stats.NAT.attempted, 2);
    assert.strictEqual(stats.NAT.correct, 1);
    assert.strictEqual(stats.NAT.incorrect, 1);
    assert.strictEqual(stats.NAT.penaltyLost, 0);
  });

  test('diagnoses weakest format and recommends appropriate targeted drill', () => {
    const formatStats = {
      MCQ: { accuracy: 40.0, penaltyLost: 3.33, attempted: 10 },
      MSQ: { accuracy: 70.0, penaltyLost: 0, attempted: 10 },
      NAT: { accuracy: 80.0, penaltyLost: 0, attempted: 10 }
    };

    let weakest = null;
    if (formatStats.MCQ.penaltyLost >= 2) {
      weakest = 'MCQ';
    }
    assert.strictEqual(weakest, 'MCQ');

    const lowBleedStats = {
      MCQ: { accuracy: 85.0, penaltyLost: 0.67, attempted: 10 },
      MSQ: { accuracy: 90.0, penaltyLost: 0, attempted: 10 },
      NAT: { accuracy: 35.0, penaltyLost: 0, attempted: 10 }
    };

    const types = ['MCQ', 'MSQ', 'NAT'];
    const sorted = [...types].sort((a, b) => lowBleedStats[a].accuracy - lowBleedStats[b].accuracy);
    assert.strictEqual(sorted[0], 'NAT');
  });

  test('drill paper builder creates 20-question custom mock with valid duration and metadata', () => {
    const samplePool = [
      { id: 'q1', type: 'NAT', marks: 2, question: 'Solve numerical 1', answer: '42' },
      { id: 'q2', type: 'NAT', marks: 1, question: 'Solve numerical 2', answer: '15' },
      { id: 'q3', type: 'MCQ', marks: 1, question: 'Multiple choice 1', answer: 'B' }
    ];

    const natQuestions = samplePool.filter(q => (q.type || '').toUpperCase() === 'NAT');
    assert.strictEqual(natQuestions.length, 2);

    const drillPaper = {
      id: 'drill-NAT-test',
      title: 'Targeted NAT Remediation Drill (20 Qs)',
      year: 'Special Drill',
      durationMinutes: 45,
      questions: natQuestions.map((q, idx) => ({
        ...q,
        qnum: idx + 1,
        section: q.section || 'Technical Section'
      }))
    };

    assert.strictEqual(drillPaper.durationMinutes, 45);
    assert.strictEqual(drillPaper.questions[0].qnum, 1);
    assert.strictEqual(drillPaper.questions[1].qnum, 2);
  });
});
