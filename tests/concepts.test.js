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
    assert.ok(conceptsData.length >= 5, 'concepts.json must contain at least 5 concept notes');
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
