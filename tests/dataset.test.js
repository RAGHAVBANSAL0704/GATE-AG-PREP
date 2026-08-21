import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { GATE_AG_FORMULAS } from '../src/data/formulas.js';
import { GATE_AG_SYLLABUS } from '../src/data/syllabus.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const questionsPath = path.resolve(__dirname, '../src/data/questions.json');
const mockPapersPath = path.resolve(__dirname, '../src/data/mock_papers.json');

const questionsData = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));
const mockPapersData = JSON.parse(fs.readFileSync(mockPapersPath, 'utf8'));

describe('Dataset Integrity & Schema Validation Test Suite', () => {

  describe('Curated Practice Pool Dataset (questions.json)', () => {
    it('contains exactly 902 curated DOCX questions', () => {
      assert.strictEqual(questionsData.length, 902, 'questions.json must contain 902 curated DOCX questions');
    });

    it('verifies question type distribution (MCQ, NAT, MSQ)', () => {
      const typeCounts = { MCQ: 0, MSQ: 0, NAT: 0 };
      questionsData.forEach(q => {
        assert.ok(['MCQ', 'MSQ', 'NAT'].includes(q.type), `Invalid question type "${q.type}" on question ${q.id}`);
        typeCounts[q.type]++;
      });

      assert.ok(typeCounts.MCQ > 0, 'Expected MCQ questions');
      assert.ok(typeCounts.NAT > 0, 'Expected NAT questions');
      assert.strictEqual(typeCounts.MCQ + typeCounts.NAT + typeCounts.MSQ, questionsData.length);
    });

    it('validates required schema fields and correct data types on all 902 questions', () => {
      questionsData.forEach((q, idx) => {
        assert.ok(q.id && q.id.trim().length > 0, `Question #${idx} missing id`);
        assert.ok(q.year, `Question #${idx} (${q.id}) missing year`);
        assert.ok(q.qnum !== undefined && q.qnum !== null, `Question #${idx} (${q.id}) missing qnum`);
        assert.ok(q.section && q.section.trim().length > 0, `Question #${idx} (${q.id}) missing section`);
        assert.ok(q.topic && q.topic.trim().length > 0, `Question #${idx} (${q.id}) missing topic`);
        assert.ok(typeof q.question === 'string', `Question #${idx} (${q.id}) question must be string`);
        assert.ok(q.correct_answer && String(q.correct_answer).trim().length > 0, `Question #${idx} (${q.id}) missing correct_answer`);
        assert.ok(q.solution && q.solution.trim().length > 0, `Question #${idx} (${q.id}) missing solution`);
        
        // Marks validation (1 or 2)
        assert.ok([1, 2].includes(Number(q.marks)), `Question ${q.id} marks must be 1 or 2`);
        assert.ok(typeof q.negative_marks === 'number' && q.negative_marks >= 0, `Question ${q.id} negative_marks must be non-negative number`);

        // MCQ/MSQ options validation
        if (q.type === 'MCQ' || q.type === 'MSQ') {
          assert.ok(q.options && typeof q.options === 'object', `Question ${q.id} must have options object`);
        }
      });
    });
  });

  describe('Official PYQ Mock Papers Dataset (mock_papers.json)', () => {
    it('contains exactly 20 official GATE AG exam papers', () => {
      assert.strictEqual(mockPapersData.length, 20, 'mock_papers.json must contain 20 papers');
    });

    it('covers all consecutive years from 2007 through 2026', () => {
      const years = mockPapersData.map(p => String(p.year)).sort();
      const expectedYears = [
        '2007', '2008', '2009', '2010', '2011',
        '2012', '2013', '2014', '2015', '2016',
        '2017', '2018', '2019', '2020', '2021',
        '2022', '2023', '2024', '2025', '2026'
      ];
      assert.deepStrictEqual(years, expectedYears, 'All 20 years from 2007 to 2026 must be present');
    });

    it('contains exactly 902 questions total across all solved DOCX papers', () => {
      let totalQuestions = 0;
      mockPapersData.forEach(p => {
        assert.ok(Array.isArray(p.questions), `Paper ${p.year} missing questions array`);
        totalQuestions += p.questions.length;
      });
      assert.strictEqual(totalQuestions, 902, 'Total mock questions must equal 902');
    });

    it('validates instructions and metadata schema on each paper', () => {
      mockPapersData.forEach(paper => {
        assert.ok(paper.year, 'Paper must have year');
        assert.ok(paper.title, 'Paper must have title');
        assert.ok(paper.instructions && typeof paper.instructions === 'object', `Paper ${paper.year} missing instructions`);

        const inst = paper.instructions;
        assert.ok(inst.duration_mins > 0, `Paper ${paper.year} invalid duration_mins`);
        assert.ok(inst.max_marks > 0, `Paper ${paper.year} invalid max_marks`);
        assert.ok(inst.total_qs > 0, `Paper ${paper.year} invalid total_qs`);
        if (paper.has_solved_docx) {
          const minExpected = paper.year === '2016' ? 55 : (paper.year === '2020' ? 64 : inst.total_qs);
          assert.ok(paper.questions.length >= minExpected, `Paper ${paper.year} question count must be >= ${minExpected}`);
        } else {
          assert.strictEqual(paper.status, 'ADDING_SOON');
        }
      });
    });

    it('verifies question schema within every mock paper', () => {
      mockPapersData.forEach(paper => {
        paper.questions.forEach((q, qIdx) => {
          assert.ok(q.id, `Paper ${paper.year} Q#${qIdx} missing id`);
          assert.ok(q.qnum !== undefined, `Paper ${paper.year} Q#${qIdx} missing qnum`);
          assert.ok(['MCQ', 'MSQ', 'NAT'].includes(q.type), `Paper ${paper.year} Q#${qIdx} invalid type ${q.type}`);
          assert.ok(typeof q.question === 'string', `Paper ${paper.year} Q#${qIdx} invalid question type`);
          assert.ok(q.correct_answer !== undefined && q.correct_answer !== null, `Paper ${paper.year} Q#${qIdx} missing correct_answer`);
          assert.ok(typeof q.marks === 'number' && q.marks > 0, `Paper ${paper.year} Q#${qIdx} marks must be > 0`);
        });
      });
    });
  });

  describe('Formulas Reference Dataset (formulas.js)', () => {
    it('exports GATE_AG_FORMULAS with 8 official syllabus categories', () => {
      assert.ok(Array.isArray(GATE_AG_FORMULAS));
      assert.strictEqual(GATE_AG_FORMULAS.length, 8);

      const expectedCodes = ['EM', 'FMP', 'FP', 'SWCE', 'IDE', 'APE', 'DFE', 'GA'];
      const actualCodes = GATE_AG_FORMULAS.map(c => c.code);
      assert.deepStrictEqual(actualCodes, expectedCodes);
    });

    it('contains exactly 57 formulas across all topics', () => {
      let formulaCount = 0;
      GATE_AG_FORMULAS.forEach(category => {
        assert.ok(category.category && category.category.length > 0);
        assert.ok(Array.isArray(category.topics) && category.topics.length > 0);
        
        category.topics.forEach(topic => {
          assert.ok(topic.topicName && topic.topicName.length > 0);
          assert.ok(Array.isArray(topic.formulas) && topic.formulas.length > 0);
          
          topic.formulas.forEach(f => {
            assert.ok(f.title && f.title.length > 0);
            assert.ok(f.formula && f.formula.length > 0);
            assert.ok(f.explanation && f.explanation.length > 0);
            formulaCount++;
          });
        });
      });

      assert.strictEqual(formulaCount, 57, 'Formulas dataset must contain exactly 57 formulas');
    });
  });

  describe('Syllabus Tracker Dataset (syllabus.js)', () => {
    it('exports GATE_AG_SYLLABUS with 5 major sections', () => {
      assert.ok(Array.isArray(GATE_AG_SYLLABUS));
      assert.strictEqual(GATE_AG_SYLLABUS.length, 5);

      const sectionIds = GATE_AG_SYLLABUS.map(s => s.id);
      assert.deepStrictEqual(sectionIds, ['sec-1', 'sec-2', 'sec-3', 'sec-4', 'sec-5']);

      const sectionCodes = GATE_AG_SYLLABUS.map(s => s.code);
      assert.deepStrictEqual(sectionCodes, ['EM', 'FMP', 'SWCE', 'APE', 'GA']);
    });

    it('contains exactly 83 granular subtopics across all syllabus topics', () => {
      let subtopicCount = 0;
      GATE_AG_SYLLABUS.forEach(sec => {
        assert.ok(sec.title && sec.title.length > 0);
        assert.ok(sec.weightage && sec.weightage.length > 0);
        assert.ok(Array.isArray(sec.topics) && sec.topics.length > 0);

        sec.topics.forEach(top => {
          assert.ok(top.name && top.name.length > 0);
          assert.ok(Array.isArray(top.subtopics) && top.subtopics.length > 0);
          
          top.subtopics.forEach(sub => {
            assert.ok(typeof sub === 'string' && sub.trim().length > 0);
            subtopicCount++;
          });
        });
      });

      assert.strictEqual(subtopicCount, 83, 'Syllabus tracker must contain exactly 83 subtopics');
    });
  });

});
