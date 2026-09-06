import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mockPapersPath = path.resolve(__dirname, '../src/data/mock_papers.json');
const questionsPath = path.resolve(__dirname, '../src/data/questions.json');

const mockPapers = JSON.parse(fs.readFileSync(mockPapersPath, 'utf8'));
const questions = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));

describe('GATE Examination Pattern & Compliance Validation Suite', () => {

  it('validates 100-mark schema on all standard 65-question GATE AG papers', () => {
    const standard65Papers = mockPapers.filter(p => p.questions.length === 65);
    assert.ok(standard65Papers.length >= 15, 'At least 15 standard papers should have 65 questions');

    standard65Papers.forEach(paper => {
      const totalMarks = paper.questions.reduce((sum, q) => sum + Number(q.marks), 0);
      assert.strictEqual(
        totalMarks,
        100,
        `Paper ${paper.year} (${paper.title}) total marks must be exactly 100, got ${totalMarks}`
      );

      // Verify question marks breakdown: exactly 30 1-mark and 35 2-mark
      const oneMarkCount = paper.questions.filter(q => Number(q.marks) === 1).length;
      const twoMarkCount = paper.questions.filter(q => Number(q.marks) === 2).length;
      assert.strictEqual(oneMarkCount, 30, `Paper ${paper.year} must have exactly 30 1-mark questions`);
      assert.strictEqual(twoMarkCount, 35, `Paper ${paper.year} must have exactly 35 2-mark questions`);
    });
  });

  it('validates negative marking rules across all questions in mock papers', () => {
    mockPapers.forEach(paper => {
      paper.questions.forEach(q => {
        if (q.type === 'MCQ') {
          const marks = Number(q.marks);
          if (marks === 1) {
            assert.ok(Math.abs(q.negative_marks - (1 / 3)) < 1e-4, `1-mark MCQ ${q.id} must have -1/3 penalty`);
          } else if (marks === 2) {
            assert.ok(Math.abs(q.negative_marks - (2 / 3)) < 1e-4, `2-mark MCQ ${q.id} must have -2/3 penalty`);
          }
        } else if (q.type === 'MSQ' || q.type === 'NAT') {
          assert.strictEqual(q.negative_marks, 0, `${q.type} ${q.id} must have 0 negative marks`);
        }
      });
    });
  });

  it('validates every question in questions.json contains valid difficulty classification', () => {
    const validDifficulties = ['Easy', 'Moderate', 'Difficult'];
    questions.forEach(q => {
      assert.ok(q.difficulty, `Question ${q.id} missing difficulty`);
      assert.ok(
        validDifficulties.includes(q.difficulty),
        `Question ${q.id} has invalid difficulty "${q.difficulty}"`
      );
    });
  });

  it('verifies realistic difficulty distribution (Easy, Moderate, Difficult) exists', () => {
    const counts = { Easy: 0, Moderate: 0, Difficult: 0 };
    questions.forEach(q => {
      counts[q.difficulty]++;
    });

    assert.ok(counts.Easy > 200, `Expected at least 200 Easy questions, found ${counts.Easy}`);
    assert.ok(counts.Moderate > 300, `Expected at least 300 Moderate questions, found ${counts.Moderate}`);
    assert.ok(counts.Difficult > 150, `Expected at least 150 Difficult questions, found ${counts.Difficult}`);
  });
});
