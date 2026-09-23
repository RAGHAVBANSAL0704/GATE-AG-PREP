import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { ALL_QUESTION_BANK_QUESTIONS } from '../src/data/question_bank/index.js';
import { normalizeSectionTitle } from '../src/utils/syllabusTaxonomy.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const questionsPath = path.resolve(__dirname, '../src/data/questions.json');
const officialPyqs = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));

// Load all 50 custom mock files
const customMocks = [];
const allCustomMockQuestions = [];
for (let i = 1; i <= 50; i++) {
  const numStr = String(i).padStart(2, '0');
  const filePath = path.resolve(__dirname, `../src/data/custom_mock_2027_${numStr}.json`);
  if (fs.existsSync(filePath)) {
    const mockData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    customMocks.push(mockData);
    (mockData.questions || []).forEach(q => {
      allCustomMockQuestions.push({
        ...q,
        paperTitle: mockData.title,
        sourceTitle: mockData.title,
        isCustomUploaded: true
      });
    });
  }
}

const getQuestionDifficulty = (q) => {
  if (q.difficulty) {
    const s = String(q.difficulty).trim().toLowerCase();
    if (s === 'hard' || s === 'difficult' || s === 'advanced') return 'Hard';
    if (s === 'moderate' || s === 'medium' || s === 'intermediate') return 'Moderate';
    if (s === 'easy' || s === 'basic') return 'Easy';
  }
  return Number(q.marks) === 2 ? 'Moderate' : 'Easy';
};

function filterTestCandidatePool({
  selectedPools = ['qbank', 'pyq', 'mocks'],
  pyqRange = 'all',
  selectedSections = [],
  selectedDifficulties = ['Easy', 'Moderate', 'Hard'],
  selectedTypes = ['MCQ', 'MSQ', 'NAT'],
  selectedMarks = [1, 2]
}) {
  let combined = [];

  if (selectedPools.includes('qbank')) {
    const qbList = (ALL_QUESTION_BANK_QUESTIONS || []).map(q => ({
      ...q,
      poolSource: 'qbank',
      sourceTitle: q.source || 'Autonomous Question Bank'
    }));
    combined = combined.concat(qbList);
  }

  if (selectedPools.includes('pyq')) {
    let pyqList = officialPyqs || [];
    if (pyqRange === 'recent') {
      pyqList = pyqList.filter(q => {
        const yr = Number(q.year || q.paper_year);
        return yr >= 2016;
      });
    }
    pyqList = pyqList.map(q => ({
      ...q,
      poolSource: 'pyq',
      sourceTitle: q.paper_name || `GATE AG ${q.year || q.paper_year || 'Official'}`
    }));
    combined = combined.concat(pyqList);
  }

  if (selectedPools.includes('mocks')) {
    const mockList = allCustomMockQuestions.map(q => ({
      ...q,
      poolSource: 'mocks',
      sourceTitle: q.paperTitle || q.sourceTitle || 'Curated Mock Test'
    }));
    combined = combined.concat(mockList);
  }

  const normSelectedSections = selectedSections.map(s => normalizeSectionTitle(s));

  return combined.filter(q => {
    const qSec = normalizeSectionTitle(q.section);
    if (normSelectedSections.length > 0 && !normSelectedSections.includes(qSec)) return false;

    const qType = (q.type || 'MCQ').toUpperCase();
    if (!selectedTypes.includes(qType)) return false;

    const qDiff = getQuestionDifficulty(q);
    if (!selectedDifficulties.includes(qDiff)) return false;

    const qMarks = Number(q.marks) || 1;
    if (!selectedMarks.includes(qMarks)) return false;

    return true;
  });
}

describe('Full-Spectrum Custom Test Generator & Flexible Combination Test Suite', () => {

  it('aggregates total master pool accurately (Q-Bank: 1,915 + PYQs: 1,324 + Mocks: 3,250 = 6,489 Qs)', () => {
    const fullPool = filterTestCandidatePool({
      selectedPools: ['qbank', 'pyq', 'mocks'],
      selectedSections: [],
      selectedDifficulties: ['Easy', 'Moderate', 'Hard'],
      selectedTypes: ['MCQ', 'MSQ', 'NAT'],
      selectedMarks: [1, 2]
    });

    assert.strictEqual(fullPool.length, 1915 + 1324 + 3250);
    assert.strictEqual(fullPool.length, 6489);
  });

  it('executes user combination: Question Bank Pool + Hard + NAT & MCQ', () => {
    const pool = filterTestCandidatePool({
      selectedPools: ['qbank'],
      selectedDifficulties: ['Hard'],
      selectedTypes: ['MCQ', 'NAT'],
      selectedMarks: [1, 2]
    });

    assert.ok(pool.length > 0, 'Candidate pool must not be empty');
    assert.ok(pool.every(q => q.poolSource === 'qbank'), 'All questions must come from Question Bank');
    assert.ok(pool.every(q => getQuestionDifficulty(q) === 'Hard'), 'All questions must be Hard difficulty');
    assert.ok(pool.every(q => ['MCQ', 'NAT'].includes(q.type.toUpperCase())), 'All questions must be MCQ or NAT');
    assert.ok(pool.some(q => q.type.toUpperCase() === 'MCQ'), 'Must contain MCQs');
    assert.ok(pool.some(q => q.type.toUpperCase() === 'NAT'), 'Must contain NATs');
  });

  it('filters by combined pool + Hard questions drill across all question types', () => {
    const pool = filterTestCandidatePool({
      selectedPools: ['qbank', 'pyq', 'mocks'],
      selectedDifficulties: ['Hard'],
      selectedTypes: ['MCQ', 'MSQ', 'NAT'],
      selectedMarks: [1, 2]
    });

    assert.ok(pool.length >= 1000, `Expected at least 1,000 Hard questions across full pool, found ${pool.length}`);
    assert.ok(pool.every(q => getQuestionDifficulty(q) === 'Hard'));
    assert.ok(pool.some(q => q.poolSource === 'qbank'));
    assert.ok(pool.some(q => q.poolSource === 'pyq'));
    assert.ok(pool.some(q => q.poolSource === 'mocks'));
  });

  it('filters NAT numerical mastery pool across all sources and difficulties', () => {
    const natPool = filterTestCandidatePool({
      selectedPools: ['qbank', 'pyq', 'mocks'],
      selectedDifficulties: ['Easy', 'Moderate', 'Hard'],
      selectedTypes: ['NAT'],
      selectedMarks: [1, 2]
    });

    assert.ok(natPool.length > 1500, `Expected > 1500 NAT questions, found ${natPool.length}`);
    assert.ok(natPool.every(q => q.type.toUpperCase() === 'NAT'));
  });

  it('filters Core Agriculture 2-mark numerical questions', () => {
    const coreAgriSections = [
      'Section 2: Farm Machinery',
      'Section 3: Farm Power',
      'Section 4: Soil and Water Conservation Engineering',
      'Section 5: Irrigation and Drainage Engineering',
      'Section 6: Agricultural Process Engineering',
      'Section 7: Dairy and Food Engineering'
    ];

    const pool = filterTestCandidatePool({
      selectedPools: ['qbank', 'pyq', 'mocks'],
      selectedSections: coreAgriSections,
      selectedDifficulties: ['Moderate', 'Hard'],
      selectedTypes: ['NAT'],
      selectedMarks: [2]
    });

    assert.ok(pool.length > 200, `Expected > 200 Core Agri 2M NATs, found ${pool.length}`);
    assert.ok(pool.every(q => Number(q.marks) === 2));
    assert.ok(pool.every(q => q.type.toUpperCase() === 'NAT'));
    assert.ok(pool.every(q => {
      const s = normalizeSectionTitle(q.section);
      return s !== 'Section 1: Engineering Mathematics' && s !== 'Section 8: General Aptitude';
    }));
  });

  it('supports Recent Official PYQs (2016–2026) filter', () => {
    const recentPyqs = filterTestCandidatePool({
      selectedPools: ['pyq'],
      pyqRange: 'recent',
      selectedDifficulties: ['Easy', 'Moderate', 'Hard'],
      selectedTypes: ['MCQ', 'MSQ', 'NAT'],
      selectedMarks: [1, 2]
    });

    assert.ok(recentPyqs.length > 500, `Expected > 500 recent PYQs, found ${recentPyqs.length}`);
    assert.ok(recentPyqs.every(q => {
      const yr = Number(q.year || q.paper_year);
      return yr >= 2016;
    }));
  });

});
