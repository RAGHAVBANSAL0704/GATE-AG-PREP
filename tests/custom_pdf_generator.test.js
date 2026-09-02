import test from 'node:test';
import assert from 'node:assert/strict';
import { generateQuestionPaperHtml } from '../src/services/questionPdfExportService.js';

test('Custom Question Paper & PDF Generator Test Suite', async (t) => {

  const sampleQuestions = [
    {
      id: 'Q_TEST_01',
      question: 'The draft of a 3-bottom mouldboard plough is $D = 15\\text{ kN}$ moving at speed $v = 5\\text{ km/h}$. Calculate unit draft if furrow slice is $30\\text{ cm} \\times 15\\text{ cm}$.',
      options: {
        A: '$0.33\\text{ N/cm}^2$',
        B: '$3.70\\text{ N/cm}^2$',
        C: '$11.1\\text{ N/cm}^2$',
        D: '$33.3\\text{ N/cm}^2$'
      },
      answer: 'C',
      marks: 2,
      type: 'MCQ',
      section: 'Section 3: Farm Machinery',
      topic: 'Tillage Implements & Draft',
      subtopic: 'Mouldboard Plough Draft',
      year: '2024',
      explanation: 'Total furrow cross-sectional area $= 3 \\times (30 \\times 15) = 1350\\text{ cm}^2$. Unit draft $= \\frac{15000\\text{ N}}{1350\\text{ cm}^2} = 11.11\\text{ N/cm}^2$.'
    },
    {
      id: 'Q_TEST_02',
      question: 'A trapezoidal channel has bed width $b = 3\\text{ m}$, side slope $1.5:1$ (H:V), and water depth $y = 1.2\\text{ m}$. Manning roughness coefficient is $n = 0.025$.',
      type: 'NAT',
      answer: '4.85 to 4.95',
      marks: 2,
      section: 'Section 4: Soil and Water Conservation Engineering',
      topic: 'Open Channel Hydraulics',
      subtopic: 'Manning Equation Flow',
      year: '2023',
      explanation: 'Area $A = (b + zy)y = (3 + 1.5 \\times 1.2) \\times 1.2 = 5.76\\text{ m}^2$.'
    },
    {
      id: 'Q_TEST_03',
      question: 'Which of the following are deep bed grain drying equations?',
      options: {
        A: "Page's equation",
        B: "Henderson and Pabis model",
        C: "Thompson model",
        D: "Universal Soil Loss Equation"
      },
      answer: 'A;B;C',
      marks: 1,
      type: 'MSQ',
      section: 'Section 6: Agricultural Processing Engineering',
      topic: 'Drying and Dehydration',
      year: '2025',
      explanation: "Page's, Henderson-Pabis, and Thompson are grain drying models. USLE is for soil erosion."
    }
  ];

  await t.test('generates valid HTML document structure with header, metadata and KaTeX', () => {
    const html = generateQuestionPaperHtml(sampleQuestions, {
      title: 'GATE AG Mixed Test Series 2026',
      subtitle: 'Farm Machinery + Soil & Water + Processing',
      studentName: 'Rahul Verma',
      includeAnswerKey: true,
      includeSolutions: true,
      includeRoughWork: true,
      paperCode: 'GATE-AG-TEST-01'
    });

    assert.ok(html.includes('<!DOCTYPE html>'), 'Must produce full HTML document');
    assert.ok(html.includes('GATE AG Mixed Test Series 2026'), 'Must include custom title');
    assert.ok(html.includes('Rahul Verma'), 'Must include student candidate name');
    assert.ok(html.includes('Total Questions:</span> <span class="meta-val">3</span>'), 'Must display 3 total questions');
    assert.ok(html.includes('Total Marks:</span> <span class="meta-val">5</span>'), 'Must display 5 total marks (2+2+1)');
    assert.ok(html.includes('GATE-AG-TEST-01'), 'Must include paper code');
  });

  await t.test('formats MCQ, MSQ and NAT question types accurately', () => {
    const html = generateQuestionPaperHtml(sampleQuestions, {
      includeAnswerKey: false,
      includeSolutions: false
    });

    // Check MCQ options rendered
    assert.ok(html.includes('(A)'), 'Must render option A bubble');
    assert.ok(html.includes('(D)'), 'Must render option D bubble');

    // Check NAT box
    assert.ok(html.includes('nat-answer-box'), 'Must render NAT answer box for Q2');
    assert.ok(html.includes('Numerical Answer:'), 'Must label NAT answer line');

    // Check Question badges
    assert.ok(html.includes('Q.1'), 'Must have Q.1 badge');
    assert.ok(html.includes('Q.2'), 'Must have Q.2 badge');
    assert.ok(html.includes('Q.3'), 'Must have Q.3 badge');
    assert.ok(html.includes('tag-type">MCQ<'), 'Must tag MCQ');
    assert.ok(html.includes('tag-type">NAT<'), 'Must tag NAT');
    assert.ok(html.includes('tag-type">MSQ<'), 'Must tag MSQ');
  });

  await t.test('renders Answer Key and Detailed Solutions appendix when enabled', () => {
    const html = generateQuestionPaperHtml(sampleQuestions, {
      includeAnswerKey: true,
      includeSolutions: true
    });

    // Check Answer Key section
    assert.ok(html.includes('ANSWER KEY APPENDIX'), 'Must contain Answer Key Appendix title');
    assert.ok(html.includes('answer-key-table'), 'Must render Answer Key table');
    assert.ok(html.includes('4.85 to 4.95'), 'Must render NAT answer in key');
    assert.ok(html.includes('A;B;C'), 'Must render MSQ answer in key');

    // Check Solutions section
    assert.ok(html.includes('DETAILED STEP-BY-STEP EXPLANATIONS & DERIVATIONS'), 'Must contain solutions title');
    assert.ok(html.includes('11.11'), 'Must render mathematical derivation content in Q1 solution');
    assert.ok(html.includes('5.76'), 'Must render area calculation in Q2 solution');
  });

  await t.test('omits Answer Key and Solutions when disabled for pure test worksheets', () => {
    const html = generateQuestionPaperHtml(sampleQuestions, {
      includeAnswerKey: false,
      includeSolutions: false
    });

    assert.equal(html.includes('ANSWER KEY APPENDIX'), false, 'Should not render Answer Key when disabled');
    assert.equal(html.includes('DETAILED STEP-BY-STEP EXPLANATIONS'), false, 'Should not render Solutions when disabled');
  });
});
