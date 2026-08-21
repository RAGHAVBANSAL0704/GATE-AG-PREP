import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

describe('Custom Mock Test Subsystem Tests', () => {
  const mockFiles = [
    'custom_mock_2027_01.json',
    'custom_mock_2027_02.json',
    'custom_mock_2027_03.json'
  ];

  mockFiles.forEach((filename, idx) => {
    const mockPath = join(process.cwd(), 'src', 'data', filename);

    it(`verifies that pre-loaded Mock Paper ${idx + 1} (${filename}) exists and is valid JSON`, () => {
      assert.equal(existsSync(mockPath), true, `${filename} should exist`);
      const raw = readFileSync(mockPath, 'utf8');
      const data = JSON.parse(raw);

      assert.ok(data.id.startsWith('GATE_2027_MOCK_'));
      assert.equal(data.isCustomUploaded, true);
      assert.ok(Array.isArray(data.questions), 'questions must be an array');
      assert.equal(data.questions.length, 65, `Mock Paper ${idx + 1} must have 65 questions`);
    });

    it(`verifies score and section breakdown of Mock Paper ${idx + 1}`, () => {
      const data = JSON.parse(readFileSync(mockPath, 'utf8'));
      const totalMarks = data.questions.reduce((sum, q) => sum + (q.marks || 1), 0);
      assert.equal(totalMarks, 100, `Total marks for ${filename} must sum to 100`);

      const gaQs = data.questions.filter(q => q.section === 'General Aptitude');
      const techQs = data.questions.filter(q => q.section !== 'General Aptitude');
      
      assert.equal(gaQs.length, 10, 'Must contain 10 General Aptitude questions');
      assert.equal(techQs.length, 55, 'Must contain 55 Agricultural Engineering technical questions');
    });

    it(`verifies question schema and options for Mock Paper ${idx + 1}`, () => {
      const data = JSON.parse(readFileSync(mockPath, 'utf8'));
      data.questions.forEach((q, qIdx) => {
        assert.ok(['MCQ', 'MSQ', 'NAT'].includes(q.type), `Q${qIdx + 1} has invalid type ${q.type}`);
        assert.ok(q.question && q.question.trim().length > 0, `Q${qIdx + 1} has empty question text`);
        assert.ok(q.correct_answer && String(q.correct_answer).trim().length > 0, `Q${qIdx + 1} has empty correct_answer`);
        assert.ok(q.solution && q.solution.trim().length > 0, `Q${qIdx + 1} has empty solution`);
      });
    });
  });
});
