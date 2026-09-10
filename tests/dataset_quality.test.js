import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const VALID_PYQ_SECTIONS = new Set([
  'Section 1: Engineering Mathematics',
  'Section 2: Farm Machinery',
  'Section 3: Farm Power',
  'Section 4: Soil and Water Conservation Engineering',
  'Section 5: Irrigation and Drainage Engineering',
  'Section 6: Agricultural Process Engineering',
  'Section 7: Dairy and Food Engineering',
  'Section 8: General Aptitude'
]);

const VALID_MOCK_SECTIONS = new Set([
  'General Aptitude',
  'Engineering Mathematics',
  'Farm Power and Machinery',
  'Soil and Water Conservation Engineering',
  'Irrigation and Drainage Engineering',
  'Agricultural Process Engineering',
  'Dairy and Food Engineering',
  'Farm Structures and Environmental Control'
]);

describe('Dataset Quality & Sanitization Invariant Tests', () => {
  const questionsPath = join(process.cwd(), 'src', 'data', 'questions.json');
  assert.equal(existsSync(questionsPath), true, 'questions.json must exist');
  const pyqs = JSON.parse(readFileSync(questionsPath, 'utf8'));

  it('verifies that questions.json contains exactly 1,324 official PYQs', () => {
    assert.equal(pyqs.length, 1324);
  });

  it('asserts ZERO trailing quotes or backslashes on topics and subtopics in PYQs', () => {
    pyqs.forEach((q) => {
      const top = q.topic || '';
      const sub = q.subtopic || '';
      assert.ok(!top.endsWith('"') && !top.endsWith('\\'), `Q ${q.id} has trailing quote in topic: ${top}`);
      assert.ok(!sub.endsWith('"') && !sub.endsWith('\\'), `Q ${q.id} has trailing quote in subtopic: ${sub}`);
    });
  });

  it('asserts ZERO lingering "Options:" strings or OCR prefixes in question stems in PYQs', () => {
    pyqs.forEach((q) => {
      const body = q.question || '';
      assert.ok(!/\n?Options:\s*$/i.test(body), `Q ${q.id} has trailing Options tag: ${body.slice(-30)}`);
      assert.ok(!/^Question\s*(Statement)?\s*:/i.test(body), `Q ${q.id} has redundant Question Statement prefix`);
      assert.ok(!/^Figure\s*\(reconstruction\)\s*:/i.test(body), `Q ${q.id} has Figure reconstruction prefix`);
    });
  });

  it('asserts that 100% of PYQs have detailed explanatory solutions (0 stub solutions)', () => {
    pyqs.forEach((q) => {
      const sol = q.solution || '';
      assert.ok(sol.trim().length >= 20, `Q ${q.id} has empty or stub solution: "${sol}"`);
      assert.ok(!sol.startsWith('Official Verified Key:'), `Q ${q.id} has stub explanation: "${sol}"`);
    });
  });

  it('asserts that all PYQs map to valid canonical GATE AG sections', () => {
    pyqs.forEach((q) => {
      assert.ok(VALID_PYQ_SECTIONS.has(q.section), `Q ${q.id} has invalid section: "${q.section}"`);
      assert.ok(['GA', 'AG'].includes(q.gate_section), `Q ${q.id} has invalid gate_section: "${q.gate_section}"`);
    });
  });

  it('asserts quality invariants across all 50 Custom Mock Papers', () => {
    for (let i = 1; i <= 50; i++) {
      const fn = `custom_mock_2027_${String(i).padStart(2, '0')}.json`;
      const fp = join(process.cwd(), 'src', 'data', fn);
      assert.equal(existsSync(fp), true, `${fn} must exist`);
      const mockData = JSON.parse(readFileSync(fp, 'utf8'));

      mockData.questions.forEach((q) => {
        const top = q.topic || '';
        const sub = q.subtopic || '';
        const body = q.question || '';
        const sol = q.solution || '';

        assert.ok(!top.endsWith('"') && !sub.endsWith('"'), `Mock ${fn} Q ${q.id} has trailing quote`);
        assert.ok(!/\n?Options:\s*$/i.test(body), `Mock ${fn} Q ${q.id} has lingering Options tag`);
        assert.ok(sol.trim().length >= 20, `Mock ${fn} Q ${q.id} has short solution`);
        assert.ok(!top.includes('Core Concepts'), `Mock ${fn} Q ${q.id} has unmapped generic Core Concepts topic: ${top}`);
      });
    }
  });
});
