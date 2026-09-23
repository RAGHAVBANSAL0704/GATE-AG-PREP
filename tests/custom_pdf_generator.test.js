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
    // By default, question metadata tags are omitted for clean, space-efficient exam layout
    assert.equal(html.includes('<div class="q-meta">'), false, 'Must omit q-meta tags when includeQuestionMetadata is false');

    const htmlWithMeta = generateQuestionPaperHtml(sampleQuestions, {
      includeQuestionMetadata: true
    });
    assert.ok(htmlWithMeta.includes('<div class="q-meta">'), 'Must render q-meta tags when includeQuestionMetadata is true');
    assert.ok(htmlWithMeta.includes('tag-type">MCQ<'), 'Must tag MCQ');
    assert.ok(htmlWithMeta.includes('tag-type">NAT<'), 'Must tag NAT');
    assert.ok(htmlWithMeta.includes('tag-type">MSQ<'), 'Must tag MSQ');
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

  await t.test('correctly parses questions.json schema (correct_answer and solution properties)', () => {
    const questionsJsonSample = [
      {
        id: 'GATE_2026_Q1',
        question: 'Suresh said, “I did it yesterday.” Which one of the following options is the correct form of this sentence in indirect speech?',
        options: {
          A: 'Suresh said that I did it yesterday.',
          B: 'Suresh says I did it yesterday.',
          C: 'Suresh says that he did it the day before.',
          D: 'Suresh said that he had done it the day before.'
        },
        correct_answer: 'D',
        solution: 'Converting direct to indirect speech requires three simultaneous shifts: pronoun shift, tense back-shift, and adverbial shift.'
      }
    ];

    const html = generateQuestionPaperHtml(questionsJsonSample, {
      includeAnswerKey: true,
      includeSolutions: true
    });

    // Check Answer Key
    assert.ok(html.includes('<strong>D</strong>'), 'Answer key must extract correct_answer: D');

    // Check Solution derivation
    assert.ok(html.includes('tense back-shift'), 'Solution must extract solution text from questions.json format');
    assert.equal(html.includes('Detailed solution will be added shortly'), false, 'Must not fallback to placeholder when solution exists');
  });

  await t.test('renders inline solution cards when layoutMode is study_guide', () => {
    const html = generateQuestionPaperHtml(sampleQuestions, {
      layoutMode: 'study_guide',
      includeSolutions: true,
      includeAnswerKey: true
    });

    assert.ok(html.includes('inline-solution-card'), 'Must render inline-solution-card in study_guide mode');
    assert.ok(html.includes('Verified Answer & Detailed Solution'), 'Must include inline solution header');
    assert.ok(html.includes('11.11'), 'Must include question derivation inline');
    // In study_guide mode, the bottom duplicate solutions block should be omitted
    assert.equal(html.includes('DETAILED STEP-BY-STEP EXPLANATIONS & DERIVATIONS'), false, 'Should omit bottom duplicate solutions in study_guide mode');
  });

  await t.test('renders candidate blank header box and supports toggling', () => {
    const htmlWithBox = generateQuestionPaperHtml(sampleQuestions, {
      includeCandidateBox: true,
      studentName: 'Priya Sharma'
    });

    assert.ok(htmlWithBox.includes('<div class="candidate-box">'), 'Must render candidate box container');
    assert.ok(htmlWithBox.includes('Candidate Name:'), 'Must include Candidate Name line');
    assert.ok(htmlWithBox.includes('Roll No. / ID:'), 'Must include Roll No line');
    assert.ok(htmlWithBox.includes('Class / Institute:'), 'Must include Class line');
    assert.ok(htmlWithBox.includes('Invigilator Sign:'), 'Must include Invigilator Sign line');
    assert.ok(htmlWithBox.includes('Priya Sharma'), 'Must include pre-filled student name');

    const htmlWithoutBox = generateQuestionPaperHtml(sampleQuestions, {
      includeCandidateBox: false
    });
    assert.equal(htmlWithoutBox.includes('<div class="candidate-box">'), false, 'Must omit candidate box when disabled');
  });

  await t.test('supports custom paper size, orientation and 2-column compact layout', () => {
    const html = generateQuestionPaperHtml(sampleQuestions, {
      paperSize: 'legal',
      orientation: 'landscape',
      columnLayout: '2-col'
    });

    assert.ok(html.includes('size: legal landscape;'), 'Must apply legal landscape to @page CSS');
    assert.ok(html.includes('questions-list two-column'), 'Must apply two-column class to questions list');
    assert.ok(html.includes('column-count: 2;'), 'Must have CSS rule for 2 columns');
  });

  await t.test('renders dedicated rough workspace section at end and omits per-question rough boxes', () => {
    const htmlWithRough = generateQuestionPaperHtml(sampleQuestions, {
      includeRoughWork: true
    });

    assert.ok(htmlWithRough.includes('SPACE FOR ROUGH WORK'), 'Must contain dedicated rough work section');
    assert.ok(htmlWithRough.includes('<div class="rough-workspace-box">'), 'Must render rough workspace box container');
    assert.ok(htmlWithRough.includes('page-bottom-rough-space'), 'Must render consistent rough workspace on question sheet');
    assert.equal(htmlWithRough.includes('<div class="rough-work-box">'), false, 'Must NOT render per-question rough work boxes');

    const htmlWithoutRough = generateQuestionPaperHtml(sampleQuestions, {
      includeRoughWork: false
    });
    assert.equal(htmlWithoutRough.includes('<div class="rough-workspace-box">'), false, 'Must omit rough workspace when disabled');
    assert.ok(htmlWithoutRough.includes('page-bottom-rough-space'), 'Must still render consistent rough workspace on question page');
  });

  await t.test('guarantees Questions, Answer Key, and Solutions each start on distinct pages', () => {
    const html = generateQuestionPaperHtml(sampleQuestions, {
      includeAnswerKey: true,
      includeSolutions: true,
      includeRoughWork: true
    });

    assert.ok(html.includes('break-before: page !important;'), 'Must enforce CSS break-before: page for distinct pages');
    assert.ok(html.includes('page-break-before: always !important;'), 'Must enforce CSS page-break-before: always');
    assert.ok(html.includes('<div class="page-break-before distinct-section">\n        <div class="section-divider">\n          <h2 class="section-title">ANSWER KEY APPENDIX</h2>'), 'Answer key must start on distinct page');
    assert.ok(html.includes('<div class="page-break-before distinct-section">\n        <div class="section-divider">\n          <h2 class="section-title">DETAILED STEP-BY-STEP EXPLANATIONS & DERIVATIONS</h2>'), 'Solutions must start on distinct page');
  });

  await t.test('supports individual selection of total questions section-wise and topic-wise', () => {
    const extendedPool = [
      { id: 'FM_1', section: 'Section 2: Farm Machinery', topic: 'Tillage', marks: 1, type: 'MCQ', question: 'FM Q1' },
      { id: 'FM_2', section: 'Section 2: Farm Machinery', topic: 'Tillage', marks: 2, type: 'MCQ', question: 'FM Q2' },
      { id: 'FM_3', section: 'Section 2: Farm Machinery', topic: 'Plant Protection', marks: 1, type: 'MCQ', question: 'FM Q3' },
      { id: 'SWCE_1', section: 'Section 4: Soil and Water Conservation Engineering', topic: 'Hydrology', marks: 2, type: 'NAT', question: 'SWCE Q1' },
      { id: 'SWCE_2', section: 'Section 4: Soil and Water Conservation Engineering', topic: 'Hydrology', marks: 2, type: 'NAT', question: 'SWCE Q2' },
      { id: 'EM_1', section: 'Section 1: Engineering Mathematics', topic: 'Linear Algebra', marks: 1, type: 'MCQ', question: 'EM Q1' },
      { id: 'EM_2', section: 'Section 1: Engineering Mathematics', topic: 'Calculus', marks: 2, type: 'MCQ', question: 'EM Q2' }
    ];

    // Simulate section-wise quota: 1 from FM, 2 from SWCE, 1 from EM = 4 Qs
    const sectionQuotas = {
      'Section 2: Farm Machinery': 1,
      'Section 4: Soil and Water Conservation Engineering': 2,
      'Section 1: Engineering Mathematics': 1
    };

    const sectionPicked = [];
    Object.keys(sectionQuotas).forEach(sec => {
      const matching = extendedPool.filter(q => q.section === sec);
      sectionPicked.push(...matching.slice(0, sectionQuotas[sec]));
    });

    assert.equal(sectionPicked.length, 4, 'Must pick exactly 4 questions via section-wise quota');
    assert.equal(sectionPicked.filter(q => q.section === 'Section 2: Farm Machinery').length, 1);
    assert.equal(sectionPicked.filter(q => q.section === 'Section 4: Soil and Water Conservation Engineering').length, 2);
    assert.equal(sectionPicked.filter(q => q.section === 'Section 1: Engineering Mathematics').length, 1);

    // Simulate topic-wise quota: 2 from Tillage, 1 from Hydrology = 3 Qs
    const topicQuotas = {
      'Tillage': 2,
      'Hydrology': 1
    };

    const topicPicked = [];
    Object.keys(topicQuotas).forEach(top => {
      const matching = extendedPool.filter(q => q.topic === top);
      topicPicked.push(...matching.slice(0, topicQuotas[top]));
    });

    assert.equal(topicPicked.length, 3, 'Must pick exactly 3 questions via topic-wise quota');
    assert.equal(topicPicked.filter(q => q.topic === 'Tillage').length, 2);
    assert.equal(topicPicked.filter(q => q.topic === 'Hydrology').length, 1);

    // Render HTML from sectionPicked
    const html = generateQuestionPaperHtml(sectionPicked, {
      title: 'Section Quota Practice Worksheet',
      includeAnswerKey: true
    });
    assert.ok(html.includes('Total Questions:</span> <span class="meta-val">4</span>'));
    assert.ok(html.includes('FM Q1'));
    assert.ok(html.includes('SWCE Q1'));
  });

  await t.test('verifies all 18 custom mock papers have 100% clean solutions without prompt artifacts', async () => {
    const fs = await import('fs');
    for (let i = 1; i <= 18; i++) {
      const pad = String(i).padStart(2, '0');
      const data = JSON.parse(fs.readFileSync(`./src/data/custom_mock_2027_${pad}.json`, 'utf8'));
      assert.equal(data.questions.length, 65, `Mock ${pad} must contain exactly 65 questions`);
      data.questions.forEach((q, qIdx) => {
        const sol = (q.solution || '').toLowerCase();
        assert.equal(sol.includes('blueprint verification table'), false, `Mock ${pad} Q${qIdx+1} must not contain blueprint verification table`);
        assert.equal(sol.includes('self-check confirmation'), false, `Mock ${pad} Q${qIdx+1} must not contain self-check confirmation`);
      });
    }
  });
});

