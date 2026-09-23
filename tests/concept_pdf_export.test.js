import test from 'node:test';
import assert from 'node:assert/strict';
import { 
  generateConceptPrintHtml, 
  generateConceptPlainText, 
  cleanTextForPlainExport 
} from '../src/utils/conceptPdfExportService.js';
import conceptsData from '../src/data/conceptsData.js';

test('Clean Concept Print & Plain-Text Export Test Suite', async (t) => {

  const sampleConcept = {
    id: 'CONCEPT_TEST_01',
    title: 'Dynamic Weight Transfer in 2WD Tractors',
    section: 'Section 3: Farm Power',
    topic: 'Tractor Mechanics',
    importance: 'High (2-Mark Core Numerical)',
    content: '## Governing Principles\nWhen a tractor pulls a horizontal load $P$, weight transfers to the rear axle.\n\n### Essential Equations\n$$R_{rd} = R_{rs} + \\frac{P \\cdot h}{x}$$\n\n- Parameter $P$: Drawbar pull in kN.\n- Parameter $h$: Hitch height in m.\n- Parameter $x$: Wheelbase in m.\n\n## Common Traps\nAlways convert pull $P$ to consistent units.',
    formulas: [
      'R_{rd} = R_{rs} + \\frac{P \\cdot h}{x}',
      'R_{fd} = R_{fs} - \\frac{P \\cdot h}{x}'
    ],
    takeaways: [
      'Dynamic rear axle reaction increases directly with drawbar pull.',
      'Wheelbase $x$ appears in the denominator.'
    ],
    has_docx: false
  };

  await t.test('cleanTextForPlainExport normalizes LaTeX and markdown symbols cleanly', () => {
    const raw = '## Header\n**Bold text** with equation $$\\frac{a}{b} \\le c \\times d$$ and `code` tags.';
    const cleaned = cleanTextForPlainExport(raw);

    assert.ok(!cleaned.includes('##'), 'Should strip markdown header');
    assert.ok(!cleaned.includes('**'), 'Should strip markdown bold');
    assert.ok(!cleaned.includes('`'), 'Should strip markdown code backticks');
    assert.ok(!cleaned.includes('$$'), 'Should strip display math delimiters');
    assert.ok(cleaned.includes('(a / b)'), 'Should format fractions as (a / b)');
    assert.ok(cleaned.includes('≤'), 'Should convert \\le to ≤');
    assert.ok(cleaned.includes('×'), 'Should convert \\times to ×');
  });

  await t.test('generateConceptPlainText creates structured ASCII document with all core fields', () => {
    const plainText = generateConceptPlainText(sampleConcept);

    assert.ok(typeof plainText === 'string' && plainText.length > 100, 'Must produce non-empty plain text string');
    assert.ok(plainText.includes('GATE AGRICULTURAL ENGINEERING (AG) — CORE STUDY NOTE'), 'Must have header banner');
    assert.ok(plainText.includes('Dynamic Weight Transfer in 2WD Tractors'), 'Must contain title');
    assert.ok(plainText.includes('Section 3: Farm Power'), 'Must contain section');
    assert.ok(plainText.includes('Tractor Mechanics'), 'Must contain topic');
    assert.ok(plainText.includes('[KEY FORMULAS & GOVERNING EQUATIONS]'), 'Must include formulas section');
    assert.ok(plainText.includes('[CORE TAKEAWAYS & EXAM TIPS]'), 'Must include takeaways section');
    assert.ok(plainText.includes('[COMPLETE STUDY NOTE & DERIVATIONS]'), 'Must include content section');
    assert.ok(!plainText.includes('<div>'), 'Must have zero HTML tags');
    assert.ok(!plainText.includes('</div>'), 'Must have zero HTML tags');
  });

  await t.test('generateConceptPlainText safely handles empty or null input', () => {
    assert.strictEqual(generateConceptPlainText(null), '');
    assert.strictEqual(generateConceptPlainText(undefined), '');
  });

  await t.test('generateConceptPrintHtml creates publication-grade HTML with KaTeX and zero UI chrome', () => {
    const html = generateConceptPrintHtml(sampleConcept);

    assert.ok(html.includes('<!DOCTYPE html>'), 'Must be valid HTML5 document');
    assert.ok(html.includes('<title>Dynamic Weight Transfer in 2WD Tractors — GATE AG Revision Notes</title>'), 'Must have proper title');
    assert.ok(html.includes('katex.min.css'), 'Must include KaTeX stylesheet');
    assert.ok(html.includes('CLEAN ACADEMIC PRINT & PDF STYLESHEET'), 'Must include clean print styles');
    assert.ok(html.includes('@page'), 'Must include @page margins');
    assert.ok(html.includes('class="document-header"'), 'Must have document header');
    assert.ok(html.includes('Section 3: Farm Power'), 'Must render section');
    assert.ok(html.includes('Key Formulas &amp; Mathematical Governing Equations') || html.includes('Key Formulas & Mathematical Governing Equations'), 'Must render formulas block');
    assert.ok(html.includes('Essential Takeaways &amp; Exam Tips') || html.includes('Essential Takeaways & Exam Tips'), 'Must render takeaways block');
    assert.ok(html.includes('katex'), 'Must render KaTeX math markup');
    assert.ok(!html.includes('navbar'), 'Must contain no navbar markup');
    assert.ok(!html.includes('sidebar'), 'Must contain no sidebar markup');
  });

  await t.test('verifies clean print and plain-text export across all 100 live concepts in conceptsData', () => {
    assert.ok(Array.isArray(conceptsData) && conceptsData.length === 100, 'Must have exactly 100 concepts in conceptsData');

    conceptsData.forEach((concept, idx) => {
      // 1. Plain text generation
      const txt = generateConceptPlainText(concept);
      assert.ok(txt.length > 50, `Concept #${idx} (${concept.id}) produced too short plain text`);
      assert.ok(txt.includes(concept.title), `Concept #${idx} plain text missing title`);
      assert.ok(txt.includes(concept.section), `Concept #${idx} plain text missing section`);

      // 2. HTML print generation
      const html = generateConceptPrintHtml(concept);
      assert.ok(html.includes('<!DOCTYPE html>'), `Concept #${idx} HTML missing doctype`);
      assert.ok(html.includes('document-header'), `Concept #${idx} HTML missing header`);
    });
  });

});
