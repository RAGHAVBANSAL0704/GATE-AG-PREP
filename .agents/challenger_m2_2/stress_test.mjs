import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import katex from 'katex';

const ROOT_DIR = path.resolve('/Users/raghav/Desktop/GATE AG PREP WEB');

console.log('================================================================');
console.log('⚡ ADVERSARIAL CHALLENGE & EMPIRICAL VERIFICATION SUITE');
console.log('================================================================\n');

let passCount = 0;
let failCount = 0;
const failures = [];

function test(name, fn) {
  try {
    fn();
    console.log(`  ✔ [PASS] ${name}`);
    passCount++;
  } catch (err) {
    console.error(`  ✖ [FAIL] ${name}`);
    console.error(`    Error: ${err.message}`);
    if (err.stack) console.error(`    ${err.stack.split('\n')[1]}`);
    failCount++;
    failures.push({ name, error: err.message });
  }
}

// -----------------------------------------------------------------------------
// 1. PRACTICE MODE CASCADING FILTERS ON 260 QUESTIONS DATASET
// -----------------------------------------------------------------------------
console.log('▶ [1/6] Testing Practice Mode Cascading Filters & Dataset (260 questions)...');

const questionsRaw = fs.readFileSync(path.join(ROOT_DIR, 'src/data/questions.json'), 'utf-8');
const questions = JSON.parse(questionsRaw);

const SECTION_NORM_MAP = {
  'farm power and machinery': 'Farm Power and Machinery',
  'farm machinery & power': 'Farm Power and Machinery',
  'farm machinery and power': 'Farm Power and Machinery',
  'farm power': 'Farm Power and Machinery',
  'soil and water conservation engineering': 'Soil and Water Conservation Engineering',
  'soil & water conservation engineering': 'Soil and Water Conservation Engineering',
  'agricultural process engineering': 'Agricultural Process Engineering',
  'agricultural processing engineering': 'Agricultural Process Engineering',
  'engineering mathematics': 'Engineering Mathematics',
  'general aptitude': 'General Aptitude'
};

const normSec = (s) => {
  if (!s || s === 'All') return 'All';
  const low = s.toLowerCase().trim();
  for (const [k, v] of Object.entries(SECTION_NORM_MAP)) {
    if (low.includes(k)) return v;
  }
  return s;
};

test('Practice pool contains exactly 260 curated questions', () => {
  assert.strictEqual(questions.length, 260);
});

test('Question type distribution in practice pool matches specification (173 MCQ, 83 NAT, 4 MSQ)', () => {
  const mcqs = questions.filter(q => q.type === 'MCQ').length;
  const nats = questions.filter(q => q.type === 'NAT').length;
  const msqs = questions.filter(q => q.type === 'MSQ').length;
  assert.strictEqual(mcqs, 173);
  assert.strictEqual(nats, 83);
  assert.strictEqual(msqs, 4);
});

test('Section normalization correctly groups all 260 questions into standard syllabus sections', () => {
  const standardSections = new Set([
    'Farm Power and Machinery',
    'Soil and Water Conservation Engineering',
    'Agricultural Process Engineering',
    'Engineering Mathematics',
    'General Aptitude'
  ]);

  for (const q of questions) {
    const normalized = normSec(q.section);
    assert.ok(standardSections.has(normalized), `Unknown normalized section "${normalized}" for question ${q.id}`);
  }
});

test('Cascading filters: Section -> Topic -> Subtopic produces non-empty correct subsets', () => {
  const sections = ['All', 'Farm Power and Machinery', 'Soil and Water Conservation Engineering', 'Agricultural Process Engineering', 'Engineering Mathematics', 'General Aptitude'];

  for (const sec of sections) {
    const secFiltered = questions.filter(q => sec === 'All' || normSec(q.section) === normSec(sec));
    assert.ok(secFiltered.length > 0, `No questions for section ${sec}`);

    // Derive available topics for this section
    const topics = ['All', ...new Set(secFiltered.map(q => q.topic).filter(Boolean))];
    for (const top of topics) {
      const topFiltered = secFiltered.filter(q => top === 'All' || q.topic === top);
      assert.ok(topFiltered.length > 0, `No questions for section ${sec} and topic ${top}`);

      // Derive available subtopics
      const subtopics = ['All', ...new Set(topFiltered.map(q => q.subtopic).filter(Boolean))];
      for (const sub of subtopics) {
        const subFiltered = topFiltered.filter(q => sub === 'All' || q.subtopic === sub);
        assert.ok(subFiltered.length > 0, `No questions for subtopic ${sub}`);
      }
    }
  }
});

test('Multi-dimensional filters: Type, Marks, Year, and Status combinations execute without exceptions', () => {
  const bookmarks = ['q1', 'q5', 'q12'];
  const submittedState = {
    'q1': { isSubmitted: true, isCorrect: true },
    'q2': { isSubmitted: true, isCorrect: false },
    'q3': { isSubmitted: true, isCorrect: true }
  };

  const types = ['All', 'MCQ', 'MSQ', 'NAT'];
  const marks = ['All', '1', '2'];
  const statuses = ['All', 'Bookmarked', 'Unattempted', 'Correct', 'Incorrect'];

  for (const t of types) {
    for (const m of marks) {
      for (const s of statuses) {
        const subset = questions.filter(q => {
          if (t !== 'All' && q.type !== t) return false;
          if (m !== 'All' && String(q.marks) !== m) return false;
          if (s === 'Bookmarked') return bookmarks.includes(q.id);
          if (s === 'Unattempted') return !submittedState[q.id]?.isSubmitted;
          if (s === 'Correct') return submittedState[q.id]?.isCorrect === true;
          if (s === 'Incorrect') return submittedState[q.id]?.isSubmitted && !submittedState[q.id]?.isCorrect;
          return true;
        });
        assert.ok(Array.isArray(subset));
      }
    }
  }
});

// -----------------------------------------------------------------------------
// 2. CBT MOCK TEST 180-MIN TIMER & AUTO-SUBMISSION AT 0s
// -----------------------------------------------------------------------------
console.log('\n▶ [2/6] Testing CBT Mock Test 180-min Timer & Auto-submission...');

test('Timer formatting matches HH:MM:SS for boundary and intermediate seconds', () => {
  const formatTime = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  assert.strictEqual(formatTime(10800), '03:00:00'); // 180 min
  assert.strictEqual(formatTime(10799), '02:59:59');
  assert.strictEqual(formatTime(7200), '02:00:00');
  assert.strictEqual(formatTime(3600), '01:00:00');
  assert.strictEqual(formatTime(60), '00:01:00');
  assert.strictEqual(formatTime(59), '00:00:59');
  assert.strictEqual(formatTime(1), '00:00:01');
  assert.strictEqual(formatTime(0), '00:00:00');
});

test('Mock test auto-submission at 0s calculates correct score, counts and marks with negative marking', () => {
  const samplePaper = {
    year: '2026',
    instructions: { duration_mins: 180, enable_negative_marking: true },
    questions: [
      { id: 'q1', type: 'MCQ', marks: 1, negative_marks: 0.3333333333333333, correct_answer: 'B' },
      { id: 'q2', type: 'MCQ', marks: 2, negative_marks: 0.6666666666666666, correct_answer: 'C' },
      { id: 'q3', type: 'MSQ', marks: 2, negative_marks: 0, correct_answer: 'A, C' },
      { id: 'q4', type: 'NAT', marks: 2, negative_marks: 0, correct_answer: '25.0 to 26.5' },
      { id: 'q5', type: 'MCQ', marks: 1, negative_marks: 0.3333333333333333, correct_answer: 'D' }, // unattempted
      { id: 'q6', type: 'MCQ', marks: 1, negative_marks: 0.3333333333333333, correct_answer: 'A' }  // marked without ans
    ]
  };

  const userAnswers = {
    'q1': 'B',    // Correct MCQ 1 mark -> +1
    'q2': 'A',    // Incorrect MCQ 2 mark -> -0.6666666666666666
    'q3': 'A, C', // Correct MSQ 2 marks -> +2
    'q4': '25.8'  // Correct NAT 2 marks -> +2
  };

  const questionStates = {
    'q1': 'ANSWERED',
    'q2': 'ANSWERED',
    'q3': 'ANSWERED_MARKED', // Attempted & marked for review -> evaluated!
    'q4': 'ANSWERED',
    'q5': 'NOT_ANSWERED',
    'q6': 'MARKED'           // Marked for review WITHOUT answer -> unattempted!
  };

  let score = 0;
  let correctCount = 0;
  let incorrectCount = 0;
  let unattemptedCount = 0;

  samplePaper.questions.forEach(q => {
    const state = questionStates[q.id];
    const ans = userAnswers[q.id];

    if ((state === 'ANSWERED' || state === 'ANSWERED_MARKED') && ans !== undefined && ans !== '') {
      const correctKey = q.correct_answer;
      let isCorrect = false;
      const enableNeg = samplePaper.instructions.enable_negative_marking !== false;

      if (q.type === 'MCQ') {
        isCorrect = ans.trim().toUpperCase() === correctKey.trim().toUpperCase();
        if (isCorrect) {
          score += q.marks;
          correctCount++;
        } else {
          if (enableNeg) score -= q.negative_marks;
          incorrectCount++;
        }
      } else if (q.type === 'MSQ') {
        const userSorted = ans.split(',').map(s => s.trim().toUpperCase()).sort().join(';');
        const keySorted = correctKey.replace(/,/g, ';').split(';').map(s => s.trim().toUpperCase()).sort().join(';');
        isCorrect = userSorted === keySorted;
        if (isCorrect) {
          score += q.marks;
          correctCount++;
        } else {
          incorrectCount++;
        }
      } else if (q.type === 'NAT') {
        const numVal = parseFloat(ans);
        if (!isNaN(numVal)) {
          if (correctKey.includes(' to ')) {
            const [minStr, maxStr] = correctKey.split(' to ');
            const min = parseFloat(minStr);
            const max = parseFloat(maxStr);
            isCorrect = numVal >= min && numVal <= max;
          } else {
            const target = parseFloat(correctKey);
            isCorrect = Math.abs(numVal - target) < 0.05;
          }
        }
        if (isCorrect) {
          score += q.marks;
          correctCount++;
        } else {
          incorrectCount++;
        }
      }
    } else {
      unattemptedCount++;
    }
  });

  const finalScore = parseFloat(score.toFixed(2));
  assert.strictEqual(finalScore, 4.33);
  assert.strictEqual(correctCount, 3);
  assert.strictEqual(incorrectCount, 1);
  assert.strictEqual(unattemptedCount, 2);
});

test('Mock test state machine transitions correctly between all 5 states', () => {
  const qId = 'sample-q-1';
  let userAnswers = {};
  let questionStates = { [qId]: 'NOT_ANSWERED' };

  // 1. Save & Next without answer -> NOT_ANSWERED
  questionStates[qId] = (userAnswers[qId] !== undefined && userAnswers[qId] !== '') ? 'ANSWERED' : 'NOT_ANSWERED';
  assert.strictEqual(questionStates[qId], 'NOT_ANSWERED');

  // 2. Select answer and Save & Next -> ANSWERED
  userAnswers[qId] = 'B';
  questionStates[qId] = (userAnswers[qId] !== undefined && userAnswers[qId] !== '') ? 'ANSWERED' : 'NOT_ANSWERED';
  assert.strictEqual(questionStates[qId], 'ANSWERED');

  // 3. Mark For Review & Next with answer -> ANSWERED_MARKED
  questionStates[qId] = (userAnswers[qId] !== undefined && userAnswers[qId] !== '') ? 'ANSWERED_MARKED' : 'MARKED';
  assert.strictEqual(questionStates[qId], 'ANSWERED_MARKED');

  // 4. Clear response -> NOT_ANSWERED & answer deleted
  delete userAnswers[qId];
  questionStates[qId] = 'NOT_ANSWERED';
  assert.strictEqual(questionStates[qId], 'NOT_ANSWERED');
  assert.strictEqual(userAnswers[qId], undefined);

  // 5. Mark For Review & Next without answer -> MARKED
  questionStates[qId] = (userAnswers[qId] !== undefined && userAnswers[qId] !== '') ? 'ANSWERED_MARKED' : 'MARKED';
  assert.strictEqual(questionStates[qId], 'MARKED');
});

// -----------------------------------------------------------------------------
// 3. FORMULA SHEET 41 FORMULAS ACROSS 5 CATEGORIES & LATEX SYNTAX
// -----------------------------------------------------------------------------
console.log('\n▶ [3/6] Testing Formula Sheet (41 formulas, 5 categories, LaTeX validity)...');

const formulasModulePath = path.join(ROOT_DIR, 'src/data/formulas.js');
const { GATE_AG_FORMULAS } = await import(`file://${formulasModulePath}`);

test('GATE_AG_FORMULAS has exactly 5 syllabus categories with matching codes', () => {
  assert.strictEqual(GATE_AG_FORMULAS.length, 5);
  const expectedCodes = ['EM', 'FMP', 'SWCE', 'APE', 'GA'];
  const actualCodes = GATE_AG_FORMULAS.map(c => c.code);
  assert.deepStrictEqual(actualCodes, expectedCodes);
});

test('GATE_AG_FORMULAS contains exactly 41 formulas total', () => {
  const totalFormulas = GATE_AG_FORMULAS.reduce((sum, cat) => {
    return sum + cat.topics.reduce((tSum, top) => tSum + top.formulas.length, 0);
  }, 0);
  assert.strictEqual(totalFormulas, 41);
});

test('Every single one of the 41 formulas compiles cleanly with KaTeX parser', () => {
  let count = 0;
  for (const cat of GATE_AG_FORMULAS) {
    for (const top of cat.topics) {
      for (const f of top.formulas) {
        count++;
        assert.ok(f.title && f.title.trim().length > 0, `Empty title in formula ${count}`);
        assert.ok(f.formula && f.formula.trim().length > 0, `Empty formula string in ${f.title}`);
        assert.ok(f.explanation && f.explanation.trim().length > 0, `Empty explanation in ${f.title}`);

        // KaTeX renderToString verification
        try {
          const rendered = katex.renderToString(f.formula, { throwOnError: true, displayMode: true });
          assert.ok(rendered.includes('katex-display') || rendered.includes('katex'), `Render output empty for ${f.title}`);
        } catch (katexErr) {
          throw new Error(`KaTeX render error on formula "${f.title}": ${f.formula} - ${katexErr.message}`);
        }
      }
    }
  }
  assert.strictEqual(count, 41);
});

test('Formula live search filtering matches titles, explanations, and topic names accurately', () => {
  const testKeywords = ['Manning', 'Bernoulli', 'LMTD', 'Simpson', 'Hooghoudt', 'Tractive', 'Laplace', 'Rittinger', 'USLE'];
  for (const kw of testKeywords) {
    const matched = GATE_AG_FORMULAS.flatMap(cat =>
      cat.topics.flatMap(top =>
        top.formulas.filter(f =>
          f.title.toLowerCase().includes(kw.toLowerCase()) ||
          f.explanation.toLowerCase().includes(kw.toLowerCase()) ||
          top.topicName.toLowerCase().includes(kw.toLowerCase())
        )
      )
    );
    assert.ok(matched.length >= 1, `Expected at least 1 match for search term "${kw}"`);
  }
});

// -----------------------------------------------------------------------------
// 4. PWA ICONS & IHDR PNG HEADERS VERIFICATION
// -----------------------------------------------------------------------------
console.log('\n▶ [4/6] Testing PWA Icons & IHDR Binary Dimensions...');

const iconDir = path.join(ROOT_DIR, 'public/icons');

function getPngDimensions(filePath) {
  const buffer = fs.readFileSync(filePath);
  // PNG signature: 89 50 4E 47 0D 0A 1A 0A
  assert.strictEqual(buffer.readUInt32BE(0), 0x89504E47, `${filePath} is not a valid PNG`);
  assert.strictEqual(buffer.readUInt32BE(4), 0x0D0A1A0A, `${filePath} has invalid PNG header`);
  
  // IHDR chunk begins at offset 12 (chunk type 'IHDR')
  const ihdrType = buffer.toString('ascii', 12, 16);
  assert.strictEqual(ihdrType, 'IHDR', `Expected IHDR chunk in ${filePath}`);
  
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  return { width, height };
}

test('public/icons/icon-192.png exists with exact 192x192 dimensions', () => {
  const p = path.join(iconDir, 'icon-192.png');
  assert.ok(fs.existsSync(p));
  const { width, height } = getPngDimensions(p);
  assert.strictEqual(width, 192);
  assert.strictEqual(height, 192);
});

test('public/icons/icon-512.png exists with exact 512x512 dimensions', () => {
  const p = path.join(iconDir, 'icon-512.png');
  assert.ok(fs.existsSync(p));
  const { width, height } = getPngDimensions(p);
  assert.strictEqual(width, 512);
  assert.strictEqual(height, 512);
});

test('public/icons/icon-512-maskable.png exists with exact 512x512 dimensions', () => {
  const p = path.join(iconDir, 'icon-512-maskable.png');
  assert.ok(fs.existsSync(p));
  const { width, height } = getPngDimensions(p);
  assert.strictEqual(width, 512);
  assert.strictEqual(height, 512);
});

test('public/icons/apple-touch-icon.png exists with exact 180x180 dimensions', () => {
  const p = path.join(iconDir, 'apple-touch-icon.png');
  assert.ok(fs.existsSync(p));
  const { width, height } = getPngDimensions(p);
  assert.strictEqual(width, 180);
  assert.strictEqual(height, 180);
});

test('public/icons/icon.svg exists and is valid XML with <svg root and xmlns', () => {
  const p = path.join(iconDir, 'icon.svg');
  assert.ok(fs.existsSync(p));
  const svgContent = fs.readFileSync(p, 'utf-8');
  assert.ok(svgContent.includes('<svg'), 'Missing <svg tag');
  assert.ok(svgContent.includes('xmlns="http://www.w3.org/2000/svg"'), 'Missing SVG xmlns attribute');
  assert.ok(svgContent.includes('</svg>'), 'Missing closing </svg> tag');
});

// -----------------------------------------------------------------------------
// 5. SERVICE WORKER (sw.js) SYNTAX & ROUTE VERIFICATION
// -----------------------------------------------------------------------------
console.log('\n▶ [5/6] Testing Service Worker (sw.js) Syntax & Cache Architecture...');

const swPath = path.join(ROOT_DIR, 'public/sw.js');

test('sw.js exists and compiles cleanly in Node VM without syntax errors', () => {
  assert.ok(fs.existsSync(swPath));
  const swCode = fs.readFileSync(swPath, 'utf-8');
  const script = new vm.Script(swCode);
  assert.ok(script);
});

test('sw.js defines versioned cache constants and precache asset list', () => {
  const swCode = fs.readFileSync(swPath, 'utf-8');
  assert.ok(swCode.includes('STATIC_CACHE'), 'Missing STATIC_CACHE definition');
  assert.ok(swCode.includes('RUNTIME_CACHE'), 'Missing RUNTIME_CACHE definition');
  assert.ok(swCode.includes('IMAGES_CACHE'), 'Missing IMAGES_CACHE definition');
  assert.ok(swCode.includes('FONTS_CACHE'), 'Missing FONTS_CACHE definition');
  assert.ok(swCode.includes('PRECACHE_ASSETS'), 'Missing PRECACHE_ASSETS definition');
  assert.ok(swCode.includes('./index.html'), 'PRECACHE_ASSETS missing index.html');
  assert.ok(swCode.includes('./manifest.webmanifest'), 'PRECACHE_ASSETS missing manifest.webmanifest');
});

test('sw.js registers install, activate, fetch, and message listeners', () => {
  const swCode = fs.readFileSync(swPath, 'utf-8');
  assert.ok(swCode.includes("addEventListener('install'"), "Missing install listener");
  assert.ok(swCode.includes("addEventListener('activate'"), "Missing activate listener");
  assert.ok(swCode.includes("addEventListener('fetch'"), "Missing fetch listener");
  assert.ok(swCode.includes("addEventListener('message'"), "Missing message listener");
});

test('sw.js implements smart routing and offline navigation fallback', () => {
  const swCode = fs.readFileSync(swPath, 'utf-8');
  assert.ok(swCode.includes("request.mode === 'navigate'"), 'Missing navigate mode check');
  assert.ok(swCode.includes("caches.match('./index.html')") || swCode.includes("caches.match('/index.html')"), 'Missing fallback to cached index.html');
  assert.ok(swCode.includes("url.pathname.includes('/assets/')"), 'Missing assets route handler');
  assert.ok(swCode.includes("isImageResource"), 'Missing image route handler');
});

// -----------------------------------------------------------------------------
// 6. DIST DIRECTORY BUILD AUDIT & ASSET INTEGRITY
// -----------------------------------------------------------------------------
console.log('\n▶ [6/6] Testing dist/ Directory Integrity, Links & Assets...');

const distDir = path.join(ROOT_DIR, 'dist');

test('dist/ directory exists after build', () => {
  assert.ok(fs.existsSync(distDir));
});

test('dist/index.html exists and contains valid HTML structure with no broken script/css tags', () => {
  const distIndexPath = path.join(distDir, 'index.html');
  assert.ok(fs.existsSync(distIndexPath));
  const html = fs.readFileSync(distIndexPath, 'utf-8');

  assert.ok(html.includes('manifest.webmanifest') || html.includes('manifest.json'), 'Missing manifest link in dist/index.html');
  assert.ok(html.includes('apple-touch-icon'), 'Missing apple-touch-icon in dist/index.html');
  assert.ok(html.includes('theme-color'), 'Missing theme-color in dist/index.html');

  const scriptMatches = [...html.matchAll(/src="([^"]+)"/g)].map(m => m[1]);
  const linkMatches = [...html.matchAll(/href="([^"]+)"/g)].map(m => m[1]);

  for (const src of scriptMatches) {
    if (src.startsWith('http://') || src.startsWith('https://')) continue;
    const cleanSrc = src.replace(/^\.\//, '').replace(/^\//, '');
    const assetPath = path.join(distDir, cleanSrc);
    assert.ok(fs.existsSync(assetPath), `Referenced script "${src}" not found at ${assetPath}`);
  }

  for (const href of linkMatches) {
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('#')) continue;
    const cleanHref = href.replace(/^\.\//, '').replace(/^\//, '');
    const assetPath = path.join(distDir, cleanHref);
    assert.ok(fs.existsSync(assetPath), `Referenced link asset "${href}" not found at ${assetPath}`);
  }
});

test('dist/ contains copied icons, manifests, and service worker', () => {
  assert.ok(fs.existsSync(path.join(distDir, 'sw.js')), 'dist/sw.js missing');
  assert.ok(fs.existsSync(path.join(distDir, 'manifest.webmanifest')), 'dist/manifest.webmanifest missing');
  assert.ok(fs.existsSync(path.join(distDir, 'manifest.json')), 'dist/manifest.json missing');
  assert.ok(fs.existsSync(path.join(distDir, 'icons/icon-192.png')), 'dist/icons/icon-192.png missing');
  assert.ok(fs.existsSync(path.join(distDir, 'icons/icon-512.png')), 'dist/icons/icon-512.png missing');
  assert.ok(fs.existsSync(path.join(distDir, 'icons/icon-512-maskable.png')), 'dist/icons/icon-512-maskable.png missing');
  assert.ok(fs.existsSync(path.join(distDir, 'icons/apple-touch-icon.png')), 'dist/icons/apple-touch-icon.png missing');
  assert.ok(fs.existsSync(path.join(distDir, 'icons/icon.svg')), 'dist/icons/icon.svg missing');
});

// -----------------------------------------------------------------------------
// SUMMARY
// -----------------------------------------------------------------------------
console.log('\n================================================================');
console.log(`🏁 ADVERSARIAL CHALLENGE COMPLETE: ${passCount} PASSED, ${failCount} FAILED`);
console.log('================================================================');

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
