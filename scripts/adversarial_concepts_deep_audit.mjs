/**
 * Empirical Challenger Adversarial Deep Audit Script
 * Core Concepts Expansion (100 Concepts Parity & KaTeX Integrity)
 */

import katex from 'katex';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const conceptsJsonPath = path.join(projectRoot, 'src/data/concepts.json');
const conceptsDataPath = path.join(projectRoot, 'src/data/conceptsData.js');

console.log('===============================================================');
console.log('   EMPIRICAL CHALLENGER ADVERSARIAL STRESS TEST HARNESS       ');
console.log('       Core Concepts Expansion (100 Concepts Audit)           ');
console.log('===============================================================');

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

function checkBalancedBraces(str) {
  let depth = 0;
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

function extractAndAuditMathBlocks(content) {
  const blocks = [];
  const errors = [];

  const doubleDollarMatches = content.match(/\$\$/g) || [];
  if (doubleDollarMatches.length % 2 !== 0) {
    errors.push(`Unbalanced display math ($$) delimiter count: ${doubleDollarMatches.length}`);
  }

  let placeholderIndex = 0;
  const displayBlocks = [];
  const withoutDisplay = content.replace(/\$\$([\s\S]*?)\$\$/g, (match, mathCode) => {
    displayBlocks.push({ raw: match, math: mathCode.trim(), display: true });
    return `___DISPLAY_MATH_${placeholderIndex++}___`;
  });

  const sanitizedForDollar = withoutDisplay.replace(/\\\$/g, '__');
  const singleDollarMatches = sanitizedForDollar.match(/\$/g) || [];
  if (singleDollarMatches.length % 2 !== 0) {
    errors.push(`Unbalanced inline math ($) delimiter count: ${singleDollarMatches.length}`);
  }

  const inlineBlocks = [];
  withoutDisplay.replace(/\$([^\$\n]+?)\$/g, (match, mathCode) => {
    inlineBlocks.push({ raw: match, math: mathCode.trim(), display: false });
    return `___INLINE_MATH___`;
  });

  blocks.push(...displayBlocks, ...inlineBlocks);
  return { blocks, errors };
}

const audit = {
  totalJsonConcepts: conceptsJson.length,
  totalJsConcepts: conceptsJs.length,
  parityDiscrepancies: [],
  schemaViolations: [],
  sectionDistribution: {},
  formulasTotal: 0,
  formulas0MissingOrEmpty: [],
  formulaKatexErrors: [],
  contentMathBlocksTotal: 0,
  contentDelimiterErrors: [],
  contentKatexErrors: []
};

OFFICIAL_SECTIONS.forEach(s => { audit.sectionDistribution[s] = 0; });

// 1. Parity Audit
console.log('\n[1/4] Auditing Deep Parity between concepts.json and conceptsData.js...');
if (conceptsJson.length !== conceptsJs.length) {
  audit.parityDiscrepancies.push(`Length mismatch: JSON has ${conceptsJson.length}, JS has ${conceptsJs.length}`);
}

const expectedKeys = [
  'id', 'title', 'section', 'topic', 'importance',
  'content', 'formulas', 'takeaways', 'file_path', 'docx_url', 'has_docx'
].sort();

for (let i = 0; i < Math.max(conceptsJson.length, conceptsJs.length); i++) {
  const jsonItem = conceptsJson[i];
  const jsItem = conceptsJs[i];

  if (!jsonItem || !jsItem) {
    audit.parityDiscrepancies.push(`Index ${i} missing in one dataset`);
    continue;
  }

  if (JSON.stringify(jsonItem) !== JSON.stringify(jsItem)) {
    audit.parityDiscrepancies.push({
      index: i,
      id: jsonItem.id || jsItem.id,
      reason: 'Deep equality mismatch between JSON and JS objects'
    });
  }
}
console.log(`  -> Parity Discrepancies: ${audit.parityDiscrepancies.length}`);

// 2. Schema Invariants Audit
console.log('\n[2/4] Auditing Schema Invariants & Official Section Mapping...');
const officialSet = new Set(OFFICIAL_SECTIONS);
const seenIds = new Set();

conceptsJson.forEach((c, idx) => {
  if (!c.id || typeof c.id !== 'string' || c.id.trim().length === 0) {
    audit.schemaViolations.push({ index: idx, id: c.id, field: 'id', reason: 'Missing or empty' });
  } else if (seenIds.has(c.id)) {
    audit.schemaViolations.push({ index: idx, id: c.id, field: 'id', reason: 'Duplicate ID' });
  } else {
    seenIds.add(c.id);
  }

  ['title', 'section', 'topic', 'importance', 'content'].forEach(field => {
    if (!c[field] || typeof c[field] !== 'string' || c[field].trim().length === 0) {
      audit.schemaViolations.push({ index: idx, id: c.id, field, reason: 'Missing or empty' });
    }
  });

  if (!officialSet.has(c.section)) {
    audit.schemaViolations.push({ index: idx, id: c.id, field: 'section', reason: `Invalid section: "${c.section}"` });
  } else {
    audit.sectionDistribution[c.section] = (audit.sectionDistribution[c.section] || 0) + 1;
  }

  if (!Array.isArray(c.formulas) || c.formulas.length === 0) {
    audit.schemaViolations.push({ index: idx, id: c.id, field: 'formulas', reason: 'Not an array or empty' });
  }
  if (!Array.isArray(c.takeaways) || c.takeaways.length === 0) {
    audit.schemaViolations.push({ index: idx, id: c.id, field: 'takeaways', reason: 'Not an array or empty' });
  }
});

console.log(`  -> Schema Violations: ${audit.schemaViolations.length}`);
console.log('  -> Section Distribution:');
Object.entries(audit.sectionDistribution).forEach(([sec, cnt]) => {
  console.log(`     * ${sec}: ${cnt} concepts`);
});

// 3. KaTeX & LaTeX Grammar Audit
console.log('\n[3/4] Auditing KaTeX Math Delimiters & LaTeX Grammar...');
conceptsJson.forEach((c, idx) => {
  // Check formulas[0]
  if (!c.formulas || !c.formulas[0] || typeof c.formulas[0] !== 'string' || c.formulas[0].trim().length === 0) {
    audit.formulas0MissingOrEmpty.push({ index: idx, id: c.id });
  }

  // Check all formulas
  (c.formulas || []).forEach((f, fIdx) => {
    audit.formulasTotal++;
    if (!checkBalancedBraces(f)) {
      audit.formulaKatexErrors.push({
        id: c.id,
        formulaIndex: fIdx,
        formula: f,
        reason: 'Unbalanced curly braces { }'
      });
    }

    let cleanLatex = f.trim();
    if (cleanLatex.startsWith('$$') && cleanLatex.endsWith('$$')) {
      cleanLatex = cleanLatex.slice(2, -2).trim();
    } else if (cleanLatex.startsWith('$') && cleanLatex.endsWith('$')) {
      cleanLatex = cleanLatex.slice(1, -1).trim();
    }
    cleanLatex = cleanLatex.replace(/\\degree\b/g, '^\\circ');

    try {
      katex.renderToString(cleanLatex, { throwOnError: true, displayMode: true });
    } catch (err) {
      audit.formulaKatexErrors.push({
        id: c.id,
        formulaIndex: fIdx,
        formula: f,
        reason: err.message
      });
    }
  });

  // Check content math blocks
  const { blocks, errors } = extractAndAuditMathBlocks(c.content || '');
  if (errors.length > 0) {
    audit.contentDelimiterErrors.push({ id: c.id, errors });
  }

  blocks.forEach((block, bIdx) => {
    audit.contentMathBlocksTotal++;
    if (!checkBalancedBraces(block.math)) {
      audit.contentKatexErrors.push({
        id: c.id,
        blockIndex: bIdx,
        raw: block.raw,
        reason: 'Unbalanced curly braces { }'
      });
    }

    let cleanMath = block.math.replace(/\\degree\b/g, '^\\circ');
    try {
      katex.renderToString(cleanMath, { throwOnError: true, displayMode: block.display });
    } catch (err) {
      audit.contentKatexErrors.push({
        id: c.id,
        blockIndex: bIdx,
        raw: block.raw,
        reason: err.message
      });
    }
  });
});

console.log(`  -> Total Formulas Checked: ${audit.formulasTotal}`);
console.log(`  -> formulas[0] Missing/Empty: ${audit.formulas0MissingOrEmpty.length}`);
console.log(`  -> Formula KaTeX Errors: ${audit.formulaKatexErrors.length}`);
console.log(`  -> Total Content Math Blocks: ${audit.contentMathBlocksTotal}`);
console.log(`  -> Content Delimiter Errors: ${audit.contentDelimiterErrors.length}`);
console.log(`  -> Content KaTeX Parse Errors: ${audit.contentKatexErrors.length}`);

// 4. Universal Search Integration
console.log('\n[4/4] Auditing Universal Search Engine Integration...');
const { executeUniversalSearch } = await import(path.join(projectRoot, 'src/utils/universalSearchEngine.js'));
const searchSampleQueries = [
  'Newton-Raphson',
  'Janssen',
  'Planck equation',
  'Euler-Venn',
  'Tractor mechanics',
  'Bernoulli equation'
];
let searchPassed = 0;
searchSampleQueries.forEach(q => {
  const res = executeUniversalSearch({ query: q, categoryFilter: 'concepts' });
  if (res && res.results && res.results.length > 0) {
    searchPassed++;
  } else {
    console.warn(`  [!] Search yielded 0 results for query: "${q}"`);
  }
});
console.log(`  -> Search Sample Test: ${searchPassed}/${searchSampleQueries.length} passed.`);

console.log('\n===============================================================');
console.log('                     AUDIT SUMMARY RESULTS                    ');
console.log('===============================================================');
const hasDefects = (
  audit.parityDiscrepancies.length > 0 ||
  audit.schemaViolations.length > 0 ||
  audit.formulas0MissingOrEmpty.length > 0 ||
  audit.formulaKatexErrors.length > 0 ||
  audit.contentDelimiterErrors.length > 0 ||
  audit.contentKatexErrors.length > 0 ||
  searchPassed !== searchSampleQueries.length
);

if (hasDefects) {
  console.log('VERDICT: REQUEST_CHANGES (Defects detected!)');
  console.log('\nDefect Details:');
  if (audit.formulaKatexErrors.length > 0) {
    console.log('Formula KaTeX Errors:', JSON.stringify(audit.formulaKatexErrors, null, 2));
  }
  if (audit.contentKatexErrors.length > 0) {
    console.log('Content KaTeX Errors:', JSON.stringify(audit.contentKatexErrors, null, 2));
  }
  if (audit.parityDiscrepancies.length > 0) {
    console.log('Parity Discrepancies:', JSON.stringify(audit.parityDiscrepancies, null, 2));
  }
  if (audit.schemaViolations.length > 0) {
    console.log('Schema Violations:', JSON.stringify(audit.schemaViolations, null, 2));
  }
} else {
  console.log('VERDICT: APPROVE (All 100 concepts passed all adversarial checks!)');
}
console.log('===============================================================');
