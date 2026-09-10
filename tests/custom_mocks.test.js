import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

describe('Custom Mock Test Subsystem Tests', () => {
  const mockFiles = Array.from({ length: 50 }, (_, i) => `custom_mock_2027_${String(i + 1).padStart(2, '0')}.json`);

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

      const gaQs = data.questions.filter(q => q.section === 'General Aptitude' || q.section === 'Section 8: General Aptitude');
      const techQs = data.questions.filter(q => q.section !== 'General Aptitude' && q.section !== 'Section 8: General Aptitude');
      
      assert.equal(gaQs.length, 10, 'Must contain 10 General Aptitude questions');
      assert.equal(techQs.length, 55, 'Must contain 55 Agricultural Engineering technical questions');
    });

    it(`verifies question schema, MCQ key format and options for Mock Paper ${idx + 1}`, () => {
      const data = JSON.parse(readFileSync(mockPath, 'utf8'));
      data.questions.forEach((q, qIdx) => {
        assert.ok(['MCQ', 'MSQ', 'NAT'].includes(q.type), `Q${qIdx + 1} has invalid type ${q.type}`);
        assert.ok(q.question && q.question.trim().length > 0, `Q${qIdx + 1} has empty question text`);
        assert.ok(q.correct_answer && String(q.correct_answer).trim().length > 0, `Q${qIdx + 1} has empty correct_answer`);
        assert.ok(q.solution && q.solution.trim().length > 0, `Q${qIdx + 1} has empty solution`);

        if (q.type === 'MCQ') {
          const key = String(q.correct_answer).trim().toUpperCase();
          assert.ok(['A', 'B', 'C', 'D'].includes(key), `Q${qIdx + 1} (${q.id}) MCQ correct_answer must be strictly 'A', 'B', 'C', or 'D', but got '${q.correct_answer}'`);
        }
      });
    });

    it(`verifies blueprint, topic and subtopic weightage hierarchy for Mock Paper ${idx + 1}`, () => {
      const data = JSON.parse(readFileSync(mockPath, 'utf8'));
      const secMap = {};
      const tStats = { MCQ: 0, MSQ: 0, NAT: 0 };
      const mStats = { 1: 0, 2: 0 };

      data.questions.forEach((q) => {
        const m = Number(q.marks || 1);
        mStats[m] = (mStats[m] || 0) + 1;
        tStats[q.type] = (tStats[q.type] || 0) + 1;

        const sec = q.section || 'General Technical';
        if (!secMap[sec]) {
          secMap[sec] = { totalMarks: 0, questionCount: 0, topics: {} };
        }
        secMap[sec].totalMarks += m;
        secMap[sec].questionCount += 1;

        const top = q.topic || 'General Topic';
        if (!secMap[sec].topics[top]) {
          secMap[sec].topics[top] = { totalMarks: 0, questionCount: 0, subtopics: {} };
        }
        secMap[sec].topics[top].totalMarks += m;
        secMap[sec].topics[top].questionCount += 1;

        const sub = q.subtopic || 'General Subtopic';
        if (!secMap[sec].topics[top].subtopics[sub]) {
          secMap[sec].topics[top].subtopics[sub] = { totalMarks: 0, questionCount: 0 };
        }
        secMap[sec].topics[top].subtopics[sub].totalMarks += m;
        secMap[sec].topics[top].subtopics[sub].questionCount += 1;
      });

      // 30 questions with 1 mark (30M) + 35 questions with 2 marks (70M) = 100M
      assert.equal(mStats[1], 30, `Mock ${idx + 1} must have exactly 30 1-mark questions`);
      assert.equal(mStats[2], 35, `Mock ${idx + 1} must have exactly 35 2-mark questions`);

      // All 65 questions accounted for in question types
      assert.equal(tStats.MCQ + tStats.MSQ + tStats.NAT, 65);

      // Section integrity
      const gaSec = secMap['General Aptitude'] || secMap['Section 8: General Aptitude'];
      assert.ok(gaSec, `GA section must exist in Mock ${idx + 1}`);
      assert.equal(gaSec.totalMarks, 15, `GA must carry 15 marks in Mock ${idx + 1}`);
      assert.equal(gaSec.questionCount, 10, `GA must have 10 questions in Mock ${idx + 1}`);

      // Ensure every topic and subtopic is non-empty
      Object.keys(secMap).forEach(secKey => {
        const secObj = secMap[secKey];
        assert.ok(Object.keys(secObj.topics).length > 0, `Section ${secKey} must have topics`);
        Object.keys(secObj.topics).forEach(topKey => {
          const topObj = secObj.topics[topKey];
          assert.ok(topObj.questionCount > 0);
          assert.ok(topObj.totalMarks > 0);
          assert.ok(Object.keys(topObj.subtopics).length > 0, `Topic ${topKey} must have subtopics`);
        });
      });
    });
  });
});

