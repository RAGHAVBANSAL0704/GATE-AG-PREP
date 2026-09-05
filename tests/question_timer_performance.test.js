import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { evaluateQuestion, getQuestionPacing } from '../src/utils/scoring.js';

describe('Per-Question Timer & Performance Breakdown Subsystem', () => {

  describe('GATE Exam Pacing Classifier (getQuestionPacing)', () => {
    it('classifies fast correct answers (<= 60s) as Rapid Fire', () => {
      const p1 = getQuestionPacing(25, true, true);
      assert.strictEqual(p1.label, 'Rapid Fire');
      assert.strictEqual(p1.color, 'emerald');
      assert.strictEqual(p1.category, 'fast_correct');

      const p2 = getQuestionPacing(60, true, true);
      assert.strictEqual(p2.label, 'Rapid Fire');
    });

    it('classifies benchmark optimal correct answers (61s - 150s) as Optimal Pacing', () => {
      const p = getQuestionPacing(110, true, true);
      assert.strictEqual(p.label, 'Optimal Pacing');
      assert.strictEqual(p.color, 'blue');
      assert.strictEqual(p.category, 'optimal_correct');
    });

    it('classifies slow correct answers (> 150s) as High Investment', () => {
      const p = getQuestionPacing(195, true, true);
      assert.strictEqual(p.label, 'High Investment');
      assert.strictEqual(p.color, 'purple');
      assert.strictEqual(p.category, 'slow_correct');
    });

    it('classifies hasty wrong answers (<= 45s) as Rush Trap', () => {
      const p = getQuestionPacing(30, false, true);
      assert.strictEqual(p.label, 'Rush Trap');
      assert.strictEqual(p.color, 'rose');
      assert.strictEqual(p.category, 'rush_error');
    });

    it('classifies long wrong answers (> 180s) as High Time Loss', () => {
      const p = getQuestionPacing(220, false, true);
      assert.strictEqual(p.label, 'High Time Loss');
      assert.strictEqual(p.color, 'red');
      assert.strictEqual(p.category, 'sinkhole_error');
    });

    it('classifies standard wrong answers as Standard Mistake', () => {
      const p = getQuestionPacing(90, false, true);
      assert.strictEqual(p.label, 'Standard Mistake');
      assert.strictEqual(p.color, 'amber');
      assert.strictEqual(p.category, 'standard_error');
    });

    it('classifies instant skips (0s) as Clean Skip', () => {
      const p = getQuestionPacing(0, false, false);
      assert.strictEqual(p.label, 'Clean Skip');
      assert.strictEqual(p.color, 'slate');
    });

    it('classifies considered skips (1s - 90s) as Considered Skip', () => {
      const p = getQuestionPacing(45, false, false);
      assert.strictEqual(p.label, 'Considered Skip');
    });

    it('classifies stalled skips (> 90s) as Stalled Skip', () => {
      const p = getQuestionPacing(120, false, false);
      assert.strictEqual(p.label, 'Stalled Skip');
      assert.strictEqual(p.color, 'amber');
    });
  });

  describe('evaluateQuestion Flexibility & Positional Compatibility', () => {
    const sampleMCQ = {
      id: 'q_test_1',
      qnum: 1,
      type: 'MCQ',
      marks: 2,
      negative_marks: 0.67,
      correct_answer: 'B'
    };

    it('evaluates correctly with canonical object parameter', () => {
      const res = evaluateQuestion({
        question: sampleMCQ,
        userAnswer: 'B',
        state: 'ANSWERED',
        enableNegativeMarking: true
      });
      assert.strictEqual(res.isCorrect, true);
      assert.strictEqual(res.marksAwarded, 2);
    });

    it('evaluates correctly with positional parameters (question, answer, enableNegativeMarking)', () => {
      const resCorrect = evaluateQuestion(sampleMCQ, 'B', true);
      assert.strictEqual(resCorrect.isCorrect, true);
      assert.strictEqual(resCorrect.marksAwarded, 2);

      const resWrong = evaluateQuestion(sampleMCQ, 'C', true);
      assert.strictEqual(resWrong.isCorrect, false);
      assert.strictEqual(resWrong.marksAwarded, -0.67);
    });

    it('evaluates correctly with positional parameters (question, answer, state, enableNegativeMarking)', () => {
      const res = evaluateQuestion(sampleMCQ, 'B', 'ANSWERED', true);
      assert.strictEqual(res.isCorrect, true);
      assert.strictEqual(res.marksAwarded, 2);
    });
  });

  describe('Per-Question Time Tracking Accumulator Simulation', () => {
    class MockQuestionTimerEngine {
      constructor() {
        this.questionTimes = {};
        this.currentQId = null;
      }

      navigateTo(qId) {
        this.currentQId = qId;
        if (!this.questionTimes[qId]) {
          this.questionTimes[qId] = 0;
        }
      }

      tick(seconds = 1) {
        if (this.currentQId) {
          this.questionTimes[this.currentQId] = (this.questionTimes[this.currentQId] || 0) + seconds;
        }
      }

      getTime(qId) {
        return this.questionTimes[qId] || 0;
      }
    }

    it('tracks time spent on current question and resumes when returning', () => {
      const engine = new MockQuestionTimerEngine();

      // Visit Q1 for 45 seconds
      engine.navigateTo('Q1');
      engine.tick(45);
      assert.strictEqual(engine.getTime('Q1'), 45);

      // Jump to Q2 for 70 seconds
      engine.navigateTo('Q2');
      engine.tick(70);
      assert.strictEqual(engine.getTime('Q2'), 70);
      assert.strictEqual(engine.getTime('Q1'), 45); // Q1 unchanged

      // Return to Q1 for 25 more seconds
      engine.navigateTo('Q1');
      engine.tick(25);
      assert.strictEqual(engine.getTime('Q1'), 70); // 45 + 25 = 70s accumulated

      // Jump to Q3, leave unvisited Q4
      engine.navigateTo('Q3');
      engine.tick(15);
      assert.strictEqual(engine.getTime('Q3'), 15);
      assert.strictEqual(engine.getTime('Q4'), 0);
    });
  });

  describe('Mock Test Result Breakdown & Pacing Aggregation', () => {
    const questions = [
      { id: 'q1', qnum: 1, type: 'MCQ', marks: 1, negative_marks: 0.33, correct_answer: 'A', section: 'Farm Machinery' },
      { id: 'q2', qnum: 2, type: 'MCQ', marks: 2, negative_marks: 0.67, correct_answer: 'B', section: 'Soil & Water' },
      { id: 'q3', qnum: 3, type: 'NAT', marks: 2, tolerance: 0.05, correct_answer: '25.0', section: 'Process Eng' },
      { id: 'q4', qnum: 4, type: 'MCQ', marks: 1, negative_marks: 0.33, correct_answer: 'D', section: 'General Aptitude' }
    ];

    const userAnswers = {
      q1: 'A', // Correct (+1) in 40s (Rapid Fire)
      q2: 'C', // Incorrect (-0.67) in 200s (High Time Loss)
      q3: '25.02', // Correct (+2) in 120s (Optimal Pacing)
      q4: '' // Unattempted (0) in 0s (Clean Skip)
    };

    const questionTimes = {
      q1: 40,
      q2: 200,
      q3: 120,
      q4: 0
    };

    it('generates accurate question-by-question breakdown with pacing tags', () => {
      const breakdown = questions.map(q => {
        const userAns = userAnswers[q.id];
        const state = userAns ? 'ANSWERED' : 'NOT_VISITED';
        const evalRes = evaluateQuestion({ question: q, userAnswer: userAns, state });
        const timeSpent = questionTimes[q.id] || 0;
        const pacing = getQuestionPacing(timeSpent, evalRes.isCorrect, evalRes.isAttempted);

        return {
          ...q,
          userAnswer: userAns,
          timeSpent,
          pacing,
          ...evalRes
        };
      });

      // Q1 Assertions
      assert.strictEqual(breakdown[0].isCorrect, true);
      assert.strictEqual(breakdown[0].marksAwarded, 1);
      assert.strictEqual(breakdown[0].pacing.label, 'Rapid Fire');

      // Q2 Assertions
      assert.strictEqual(breakdown[1].isCorrect, false);
      assert.strictEqual(breakdown[1].marksAwarded, -0.67);
      assert.strictEqual(breakdown[1].pacing.label, 'High Time Loss');

      // Q3 Assertions
      assert.strictEqual(breakdown[2].isCorrect, true);
      assert.strictEqual(breakdown[2].marksAwarded, 2);
      assert.strictEqual(breakdown[2].pacing.label, 'Optimal Pacing');

      // Q4 Assertions
      assert.strictEqual(breakdown[3].isAttempted, false);
      assert.strictEqual(breakdown[3].pacing.label, 'Clean Skip');

      // Aggregates
      const totalScore = breakdown.reduce((sum, item) => sum + item.marksAwarded, 0);
      assert.strictEqual(Math.round(totalScore * 100) / 100, 2.33);

      const correctItems = breakdown.filter(i => i.isCorrect);
      const avgCorrectTime = Math.round(correctItems.reduce((sum, i) => sum + i.timeSpent, 0) / correctItems.length);
      assert.strictEqual(avgCorrectTime, 80); // (40 + 120) / 2 = 80s
    });
  });

});
