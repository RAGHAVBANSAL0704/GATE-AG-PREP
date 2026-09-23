import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const conceptsPath = path.resolve(__dirname, '../src/data/concepts.json');
const conceptsData = JSON.parse(fs.readFileSync(conceptsPath, 'utf8'));

describe('Important Concepts Dataset Integrity Test Suite', () => {

  it('contains compiled concept items', () => {
    assert.ok(Array.isArray(conceptsData), 'concepts.json must be an array');
    assert.ok(conceptsData.length >= 50, `concepts.json must contain at least 50 concept notes, found ${conceptsData.length}`);
  });

  it('verifies coverage across all 8 official GATE AG syllabus sections', () => {
    const sections = new Set(conceptsData.map(c => c.section));
    assert.ok(sections.has('Section 1: Engineering Mathematics'), 'Must cover Engineering Mathematics');
    assert.ok(sections.has('Section 2: Farm Machinery'), 'Must cover Farm Machinery');
    assert.ok(sections.has('Section 3: Farm Power'), 'Must cover Farm Power');
    assert.ok(sections.has('Section 4: Soil and Water Conservation Engineering'), 'Must cover Soil and Water Conservation Engineering');
    assert.ok(sections.has('Section 5: Irrigation and Drainage Engineering'), 'Must cover Irrigation and Drainage Engineering');
    assert.ok(sections.has('Section 6: Agricultural Process Engineering'), 'Must cover Agricultural Process Engineering');
    assert.ok(sections.has('Section 7: Dairy and Food Engineering'), 'Must cover Dairy and Food Engineering');
    assert.ok(sections.has('Section 8: General Aptitude') || sections.has('General Aptitude'), 'Must cover General Aptitude');
  });

  it('validates schema requirements for every concept entry', () => {
    conceptsData.forEach((c, idx) => {
      assert.ok(c.id && c.id.trim().length > 0, `Concept #${idx} missing id`);
      assert.ok(c.title && c.title.trim().length > 0, `Concept #${idx} (${c.id}) missing title`);
      assert.ok(c.section && c.section.trim().length > 0, `Concept #${idx} (${c.id}) missing section`);
      assert.ok(c.topic && c.topic.trim().length > 0, `Concept #${idx} (${c.id}) missing topic`);
      assert.ok(typeof c.content === 'string' && c.content.trim().length > 0, `Concept #${idx} (${c.id}) missing content string`);
      assert.ok(Array.isArray(c.formulas), `Concept #${idx} (${c.id}) formulas must be an array`);
    });
  });

});
