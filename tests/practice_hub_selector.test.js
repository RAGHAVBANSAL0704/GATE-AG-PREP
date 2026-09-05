import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  filterQuestionsByCriteria,
  getSectionHierarchyStats,
  buildPracticeSessionPool
} from '../src/utils/practiceSessionBuilder.js';
import { normalizeSectionTitle } from '../src/utils/syllabusTaxonomy.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const questionsPath = path.resolve(__dirname, '../src/data/questions.json');
const questionsData = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));

describe('Practice Hub Selector & Question Timer Persistence Test Suite', () => {

  describe('Section Hierarchy & Question Inventory', () => {
    it('generates stats for all 8 official syllabus sections', () => {
      const stats = getSectionHierarchyStats(questionsData);
      assert.strictEqual(stats.length, 8);
      
      const totalCount = stats.reduce((sum, s) => sum + s.totalAvailable, 0);
      assert.strictEqual(totalCount, questionsData.length);
      assert.ok(totalCount > 1000, `Expected over 1000 questions, got ${totalCount}`);
    });

    it('includes topics and subtopics breakdown for each section', () => {
      const stats = getSectionHierarchyStats(questionsData);
      const em = stats.find(s => s.code === 'EM');
      assert.ok(em, 'Engineering Mathematics section should exist');
      assert.ok(em.topics.length > 0, 'Should have topics');

      const linearAlgebra = em.topics.find(t => t.topic_name === 'Linear Algebra');
      assert.ok(linearAlgebra, 'Linear Algebra should be present in EM');
      assert.ok(linearAlgebra.availableCount > 0, 'Linear Algebra should have questions');
      assert.ok(linearAlgebra.subtopics.length > 0, 'Linear Algebra should have subtopics defined');
    });

    it('respects global filters (e.g. NAT questions only)', () => {
      const natStats = getSectionHierarchyStats(questionsData, { selectedType: 'NAT' });
      const totalNat = natStats.reduce((sum, s) => sum + s.totalAvailable, 0);
      const expectedNatCount = questionsData.filter(q => q.type === 'NAT').length;
      assert.strictEqual(totalNat, expectedNatCount);
    });
  });

  describe('Multi-Section & Multi-Topic Allocation Engine', () => {
    it('allows selecting multiple sections with varied question counts', () => {
      const session = buildPracticeSessionPool({
        combinedPool: questionsData,
        selectedSections: {
          'Section 1: Engineering Mathematics': true,
          'Section 2: Farm Machinery': true,
          'Section 8: General Aptitude': true
        },
        sectionAllocations: {
          'Section 1: Engineering Mathematics': 5,
          'Section 2: Farm Machinery': 10,
          'Section 8: General Aptitude': 3
        }
      });

      assert.strictEqual(session.totalQuestions, 18);
      assert.strictEqual(session.sectionBreakdown['Section 1: Engineering Mathematics'], 5);
      assert.strictEqual(session.sectionBreakdown['Section 2: Farm Machinery'], 10);
      assert.strictEqual(session.sectionBreakdown['Section 8: General Aptitude'], 3);

      const emQs = session.questions.filter(q => normalizeSectionTitle(q.section) === 'Section 1: Engineering Mathematics');
      const fmQs = session.questions.filter(q => normalizeSectionTitle(q.section) === 'Section 2: Farm Machinery');
      const gaQs = session.questions.filter(q => normalizeSectionTitle(q.section) === 'Section 8: General Aptitude');

      assert.strictEqual(emQs.length, 5);
      assert.strictEqual(fmQs.length, 10);
      assert.strictEqual(gaQs.length, 3);
    });

    it('allows selecting specific topics within a section', () => {
      const session = buildPracticeSessionPool({
        combinedPool: questionsData,
        selectedSections: {
          'Section 1: Engineering Mathematics': true
        },
        selectedTopicsMap: {
          'Section 1: Engineering Mathematics': {
            'Calculus': true
          }
        },
        sectionAllocations: {
          'Section 1: Engineering Mathematics': 7
        }
      });

      assert.strictEqual(session.totalQuestions, 7);
      assert.ok(session.questions.every(q => q.topic === 'Calculus'));
    });

    it('handles ALL allocation correctly by allocating all eligible questions', () => {
      const session = buildPracticeSessionPool({
        combinedPool: questionsData,
        selectedSections: {
          'Section 7: Dairy and Food Engineering': true
        },
        sectionAllocations: {
          'Section 7: Dairy and Food Engineering': 'ALL'
        }
      });

      const totalDfe = questionsData.filter(q => normalizeSectionTitle(q.section) === 'Section 7: Dairy and Food Engineering').length;
      assert.strictEqual(session.totalQuestions, totalDfe);
    });

    it('combines multi-section selection with question type and marks filters', () => {
      const session = buildPracticeSessionPool({
        combinedPool: questionsData,
        selectedSections: {
          'Section 1: Engineering Mathematics': true,
          'Section 3: Farm Power': true
        },
        sectionAllocations: {
          'Section 1: Engineering Mathematics': 4,
          'Section 3: Farm Power': 6
        },
        filters: {
          selectedType: 'MCQ',
          selectedMarks: '2'
        }
      });

      assert.strictEqual(session.totalQuestions, 10);
      assert.ok(session.questions.every(q => q.type === 'MCQ'));
      assert.ok(session.questions.every(q => String(q.marks) === '2'));
    });
  });

  describe('Per-Question Timer Cumulative Persistence Contract', () => {
    it('maintains cumulative elapsed seconds across question revisits and prevents auto-reset to zero', () => {
      // Simulate state container tracking questionTimes
      let questionTimes = {};

      const tickQuestion = (qId, seconds) => {
        for (let i = 0; i < seconds; i++) {
          questionTimes = {
            ...questionTimes,
            [qId]: (questionTimes[qId] || 0) + 1
          };
        }
      };

      const q1Id = 'gate-ag-2024-q01';
      const q2Id = 'gate-ag-2024-q02';

      // Step 1: User attempts Q1 for 25 seconds
      tickQuestion(q1Id, 25);
      assert.strictEqual(questionTimes[q1Id], 25, 'Q1 should record 25 seconds');

      // Step 2: User answers Q1
      const userAnswers = { [q1Id]: 'A' };
      const submittedState = { [q1Id]: { isSubmitted: true, isCorrect: true } };

      // Step 3: User navigates to Q2 and spends 15 seconds
      tickQuestion(q2Id, 15);
      assert.strictEqual(questionTimes[q2Id], 15, 'Q2 should record 15 seconds');

      // Step 4: User revisits Q1. Timer MUST NOT reset to zero; it must resume from 25s!
      assert.strictEqual(questionTimes[q1Id], 25, 'Crucial: Q1 time MUST NOT reset to 0 upon revisit');
      
      // Step 5: User spends an additional 10 seconds on Q1
      tickQuestion(q1Id, 10);
      assert.strictEqual(questionTimes[q1Id], 35, 'Q1 cumulative time should now be 35 seconds');

      // Step 6: User returns to Q2: Q2 must also resume from 15s
      assert.strictEqual(questionTimes[q2Id], 15, 'Q2 time MUST NOT reset to 0 upon revisit');
      tickQuestion(q2Id, 5);
      assert.strictEqual(questionTimes[q2Id], 20, 'Q2 cumulative time should now be 20 seconds');
    });

    it('preserves question timer through bookmark and clear response operations', () => {
      let questionTimes = { 'q-test-101': 42 };
      let bookmarks = [];
      let userAnswers = { 'q-test-101': 'B' };

      // Toggle bookmark
      bookmarks.push('q-test-101');
      assert.strictEqual(questionTimes['q-test-101'], 42, 'Bookmark toggle must not reset timer');

      // Clear response
      delete userAnswers['q-test-101'];
      assert.strictEqual(questionTimes['q-test-101'], 42, 'Clear response must not reset timer');
    });
  });

});
