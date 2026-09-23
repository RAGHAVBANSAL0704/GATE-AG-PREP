import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import katex from 'katex';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const conceptsJsonPath = path.join(projectRoot, 'src/data/concepts.json');
const conceptsDataPath = path.join(projectRoot, 'src/data/conceptsData.js');

const conceptsJson = JSON.parse(fs.readFileSync(conceptsJsonPath, 'utf8'));
const { GATE_AG_CONCEPTS: conceptsJs } = await import(conceptsDataPath);

const OFFICIAL_SECTIONS = [
  'Section 1: Engineering Mathematics',
  'Section 2: Farm Machinery',
  'Section 3: Farm Power',
  'Section 4: Soil and Water Conservation Engineering',
  'Section 5: Irrigation and Drainage Engineering',
  'Section 6: Agricultural Process Engineering',
  'Section 7: Dairy and Food Engineering',
  'Section 8: General Aptitude'
];

/**
 * Helper: check balanced curly braces { and } ignoring escaped \{ and \}
 */
function checkBalancedBraces(str) {
  let depth = 0;
  // Replace escaped braces with dummy characters
  const sanitized = str.replace(/\\\{/g, '__').replace(/\\\}/g, '__');
  for (let i = 0; i < sanitized.length; i++) {
    const ch = sanitized[i];
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth < 0) return false;
    }
  }
  return depth === 0;
}

/**
 * Helper: extract all math blocks ($$...$$ and $...$) from content and check delimiter balance
 */
function extractAndAuditMathBlocks(content) {
  const blocks = [];
  const errors = [];

  // Check display math $$ balance
  const doubleDollarMatches = content.match(/\$\$/g) || [];
  if (doubleDollarMatches.length % 2 !== 0) {
    errors.push(`Unbalanced display math ($$) delimiter count: ${doubleDollarMatches.length}`);
  }

  // Temporary placeholder replacement for display math
  let placeholderIndex = 0;
  const displayBlocks = [];
  const withoutDisplay = content.replace(/\$\$([\s\S]*?)\$\$/g, (match, mathCode) => {
    displayBlocks.push({ raw: match, math: mathCode.trim(), display: true });
    return `___DISPLAY_MATH_${placeholderIndex++}___`;
  });

  // Check inline math $ balance
  // Make sure we ignore escaped dollar signs \$
  const sanitizedForDollar = withoutDisplay.replace(/\\\$/g, '__');
  const singleDollarMatches = sanitizedForDollar.match(/\$/g) || [];
  if (singleDollarMatches.length % 2 !== 0) {
    errors.push(`Unbalanced inline math ($) delimiter count: ${singleDollarMatches.length}`);
  }

  // Extract inline math $...$
  const inlineBlocks = [];
  withoutDisplay.replace(/\$([^\$\n]+?)\$/g, (match, mathCode) => {
    inlineBlocks.push({ raw: match, math: mathCode.trim(), display: false });
    return `___INLINE_MATH___`;
  });

  blocks.push(...displayBlocks, ...inlineBlocks);
  return { blocks, errors };
}

describe('Adversarial Deep Audit: GATE AG Core Concepts Expansion', () => {

  // =========================================================================
  // TASK 1: Deep Parity Test (concepts.json vs conceptsData.js)
  // =========================================================================
  describe('Task 1: Deep Parity Test (concepts.json <-> conceptsData.js)', () => {
    it('asserts identical array length of exactly 100 concepts', () => {
      assert.strictEqual(Array.isArray(conceptsJson), true, 'concepts.json must be an array');
      assert.strictEqual(Array.isArray(conceptsJs), true, 'conceptsData.js must export an array');
      assert.strictEqual(conceptsJson.length, 100, `Expected 100 concepts in concepts.json, found ${conceptsJson.length}`);
      assert.strictEqual(conceptsJs.length, 100, `Expected 100 concepts in conceptsData.js, found ${conceptsJs.length}`);
    });

    it('asserts 100% deep equality between concepts.json and conceptsData.js', () => {
      // Direct full deep strict equality
      assert.deepStrictEqual(conceptsJson, conceptsJs, 'concepts.json and conceptsData.js must be deeply identical');
    });

    it('asserts field-by-field key and value parity across all 100 concepts', () => {
      const expectedKeys = [
        'id', 'title', 'section', 'topic', 'importance',
        'content', 'formulas', 'takeaways', 'file_path', 'docx_url', 'has_docx'
      ].sort();

      for (let i = 0; i < 100; i++) {
        const jsonItem = conceptsJson[i];
        const jsItem = conceptsJs[i];

        const jsonKeys = Object.keys(jsonItem).sort();
        const jsKeys = Object.keys(jsItem).sort();

        assert.deepStrictEqual(
          jsonKeys,
          expectedKeys,
          `Concept #${i} (${jsonItem.id}) in concepts.json has unexpected keys`
        );
        assert.deepStrictEqual(
          jsKeys,
          expectedKeys,
          `Concept #${i} (${jsItem.id}) in conceptsData.js has unexpected keys`
        );

        for (const key of expectedKeys) {
          assert.deepStrictEqual(
            jsonItem[key],
            jsItem[key],
            `Discrepancy at Concept index #${i} (${jsonItem.id}), key: "${key}"`
          );
        }
      }
    });
  });

  // =========================================================================
  // TASK 2: KaTeX Delimiter & LaTeX Grammar Audit
  // =========================================================================
  describe('Task 2: KaTeX Delimiter & LaTeX Grammar Audit', () => {
    it('verifies formulas[0] exists and is a valid non-empty string for every concept', () => {
      conceptsJson.forEach((c, idx) => {
        assert.ok(Array.isArray(c.formulas), `Concept #${idx} (${c.id}) formulas must be an array`);
        assert.ok(c.formulas.length >= 1, `Concept #${idx} (${c.id}) formulas must have at least 1 entry, found ${c.formulas.length}`);
        assert.strictEqual(typeof c.formulas[0], 'string', `Concept #${idx} (${c.id}) formulas[0] must be string`);
        assert.ok(c.formulas[0].trim().length > 0, `Concept #${idx} (${c.id}) formulas[0] must not be empty`);
      });
    });

    it('verifies balanced braces and valid KaTeX rendering for all entries in formulas array', () => {
      const formulaFailures = [];

      conceptsJson.forEach((c, idx) => {
        c.formulas.forEach((f, fIdx) => {
          // Check balanced braces
          if (!checkBalancedBraces(f)) {
            formulaFailures.push({
              id: c.id,
              formulaIndex: fIdx,
              formula: f,
              reason: 'Unbalanced curly braces { }'
            });
          }

          // Clean formula for katex rendering (strip outer $$ or $ if present)
          let cleanLatex = f.trim();
          if (cleanLatex.startsWith('$$') && cleanLatex.endsWith('$$')) {
            cleanLatex = cleanLatex.slice(2, -2).trim();
          } else if (cleanLatex.startsWith('$') && cleanLatex.endsWith('$')) {
            cleanLatex = cleanLatex.slice(1, -1).trim();
          }

          // Normalize \degree if used
          cleanLatex = cleanLatex.replace(/\\degree\b/g, '^\\circ');

          try {
            katex.renderToString(cleanLatex, { throwOnError: true, displayMode: true });
          } catch (err) {
            formulaFailures.push({
              id: c.id,
              formulaIndex: fIdx,
              formula: f,
              reason: `KaTeX parse error: ${err.message}`
            });
          }
        });
      });

      assert.strictEqual(
        formulaFailures.length,
        0,
        `Found ${formulaFailures.length} formula syntax/KaTeX failures: ${JSON.stringify(formulaFailures, null, 2)}`
      );
    });

    it('verifies balanced math delimiters and valid KaTeX in content across all 100 concepts', () => {
      const contentFailures = [];
      let totalBlocksChecked = 0;

      conceptsJson.forEach((c, idx) => {
        const { blocks, errors } = extractAndAuditMathBlocks(c.content);

        if (errors.length > 0) {
          contentFailures.push({ id: c.id, index: idx, errors });
        }

        blocks.forEach((block, bIdx) => {
          totalBlocksChecked++;
          if (!checkBalancedBraces(block.math)) {
            contentFailures.push({
              id: c.id,
              blockIndex: bIdx,
              raw: block.raw,
              reason: 'Unbalanced curly braces { } inside content math block'
            });
          }

          let cleanMath = block.math.replace(/\\degree\b/g, '^\\circ');
          try {
            katex.renderToString(cleanMath, { throwOnError: true, displayMode: block.display });
          } catch (err) {
            contentFailures.push({
              id: c.id,
              blockIndex: bIdx,
              raw: block.raw,
              reason: `KaTeX parse error inside content: ${err.message}`
            });
          }
        });
      });

      assert.ok(totalBlocksChecked > 200, `Expected at least 200 math blocks in content across 100 concepts, found ${totalBlocksChecked}`);
      assert.strictEqual(
        contentFailures.length,
        0,
        `Found ${contentFailures.length} content math failures: ${JSON.stringify(contentFailures, null, 2)}`
      );
    });

    it('verifies raw concepts.json string has no unescaped illegal backslashes', () => {
      const rawJson = fs.readFileSync(conceptsJsonPath, 'utf8');
      // JSON.parse already passed in module load, which confirms valid JSON escapes.
      // Furthermore, check regex for invalid escape sequences: single backslash followed by invalid escape char
      // In JSON, valid escapes after \ are: ", \, /, b, f, n, r, t, uXXXX
      // Any other backslash is invalid in JSON.
      assert.doesNotThrow(() => {
        JSON.parse(rawJson);
      }, 'raw concepts.json must be 100% valid JSON without unescaped characters');
    });
  });

  // =========================================================================
  // TASK 3: Schema Invariants & Official Section Mapping
  // =========================================================================
  describe('Task 3: Schema Invariants & Official Section Mapping', () => {
    it('verifies all 100 concepts have non-null, non-empty required fields', () => {
      const seenIds = new Set();

      conceptsJson.forEach((c, idx) => {
        assert.ok(c.id && typeof c.id === 'string' && c.id.trim().length > 0, `Concept #${idx} missing id`);
        assert.ok(!seenIds.has(c.id), `Duplicate concept id detected: "${c.id}" at index ${idx}`);
        seenIds.add(c.id);

        assert.ok(c.title && typeof c.title === 'string' && c.title.trim().length > 0, `Concept #${idx} (${c.id}) missing title`);
        assert.ok(c.section && typeof c.section === 'string' && c.section.trim().length > 0, `Concept #${idx} (${c.id}) missing section`);
        assert.ok(c.topic && typeof c.topic === 'string' && c.topic.trim().length > 0, `Concept #${idx} (${c.id}) missing topic`);
        assert.ok(c.importance && typeof c.importance === 'string' && c.importance.trim().length > 0, `Concept #${idx} (${c.id}) missing importance`);
        assert.ok(c.content && typeof c.content === 'string' && c.content.trim().length > 0, `Concept #${idx} (${c.id}) missing content`);
        assert.ok(Array.isArray(c.takeaways) && c.takeaways.length > 0, `Concept #${idx} (${c.id}) missing takeaways`);
      });

      assert.strictEqual(seenIds.size, 100, `Expected 100 unique IDs, found ${seenIds.size}`);
    });

    it('verifies all 100 concepts match strictly one of the 8 official section titles', () => {
      const officialSet = new Set(OFFICIAL_SECTIONS);
      const sectionCounts = {};
      OFFICIAL_SECTIONS.forEach(sec => { sectionCounts[sec] = 0; });

      conceptsJson.forEach((c, idx) => {
        assert.ok(
          officialSet.has(c.section),
          `Concept #${idx} (${c.id}) section "${c.section}" does not match any official section title`
        );
        sectionCounts[c.section]++;
      });

      // Verify each of the 8 sections is represented
      OFFICIAL_SECTIONS.forEach(sec => {
        assert.ok(
          sectionCounts[sec] > 0,
          `Official section "${sec}" has 0 concepts populated!`
        );
      });
    });
  });

  // =========================================================================
  // TASK 4: Universal Search Engine & Component Invariants
  // =========================================================================
  describe('Task 4: Universal Search Engine & Component Invariants', () => {
    it('verifies Universal Search indexes and retrieves newly added concepts', async () => {
      const { executeUniversalSearch } = await import('../src/utils/universalSearchEngine.js');

      // Test search for representative terms from each section
      const testQueries = [
        { q: 'Newton-Raphson', expectedId: 'CONCEPT_NEWTON_RAPHSON_METHOD' },
        { q: 'Janssen', section: 'Section 6: Agricultural Process Engineering' },
        { q: 'Planck equation', section: 'Section 7: Dairy and Food Engineering' }
      ];

      for (const t of testQueries) {
        const res = executeUniversalSearch({ query: t.q, categoryFilter: 'concepts' });
        assert.ok(Array.isArray(res.results), `executeUniversalSearch should return results array for query: "${t.q}"`);
        assert.ok(res.results.length > 0, `executeUniversalSearch found 0 results for query: "${t.q}"`);
      }
    });
  });

});
