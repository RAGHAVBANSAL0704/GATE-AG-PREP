import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { GATE_AG_FORMULAS } from '../src/data/formulas.js';
import { GATE_AG_SYLLABUS } from '../src/data/syllabus.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load real datasets for integration tests
const questionsPath = path.resolve(__dirname, '../src/data/questions.json');
const mockPapersPath = path.resolve(__dirname, '../src/data/mock_papers.json');

const questionsData = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));
const mockPapersData = JSON.parse(fs.readFileSync(mockPapersPath, 'utf8'));

/**
 * Replicated helper logic from PracticeMode.jsx
 */
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

function normSec(s) {
  if (!s || s === 'All') return 'All';
  const low = s.toLowerCase().trim();
  for (const [k, v] of Object.entries(SECTION_NORM_MAP)) {
    if (low.includes(k)) return v;
  }
  return s;
}

function filterPracticeQuestions(questions, {
  selectedSection = 'All',
  selectedTopic = 'All',
  selectedSubtopic = 'All',
  selectedType = 'All',
  selectedYear = 'All',
  selectedMarks = 'All',
  selectedStatusFilter = 'All',
  bookmarks = [],
  submittedState = {}
}) {
  return questions.filter(q => {
    if (selectedSection !== 'All' && normSec(q.section) !== normSec(selectedSection)) return false;
    if (selectedTopic !== 'All' && q.topic !== selectedTopic) return false;
    if (selectedSubtopic !== 'All' && q.subtopic !== selectedSubtopic) return false;
    if (selectedType !== 'All' && q.type !== selectedType) return false;
    if (selectedYear !== 'All' && q.year !== selectedYear) return false;
    if (selectedMarks !== 'All' && String(q.marks) !== String(selectedMarks)) return false;
    
    // Status filters
    if (selectedStatusFilter === 'Bookmarked') return bookmarks.includes(q.id);
    if (selectedStatusFilter === 'Unattempted') return !submittedState[q.id]?.isSubmitted;
    if (selectedStatusFilter === 'Correct') return submittedState[q.id]?.isCorrect === true;
    if (selectedStatusFilter === 'Incorrect') return submittedState[q.id]?.isSubmitted && !submittedState[q.id]?.isCorrect;

    return true;
  });
}

/**
 * Replicated helper logic from MockTestMode.jsx
 */
function formatTime(secs) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

class MockTestStateMachine {
  constructor(paper) {
    this.paper = paper;
    this.questions = [...(paper.questions || [])].sort((a, b) => (a.qnum || 0) - (b.qnum || 0));
    this.currentIndex = 0;
    this.userAnswers = {};
    this.questionStates = {};
    this.instructions = paper.instructions || {};
    this.timeLeft = (this.instructions.duration_mins || 180) * 60;
    this.isTimerRunning = !this.instructions.is_untimed;

    // Initial state: Q1 is NOT_ANSWERED, rest NOT_VISITED
    this.questions.forEach((q, idx) => {
      this.questionStates[q.id] = idx === 0 ? 'NOT_ANSWERED' : 'NOT_VISITED';
    });
  }

  getCurrentQuestion() {
    return this.questions[this.currentIndex];
  }

  navigateTo(index) {
    if (index < 0 || index >= this.questions.length) return;
    const currentQ = this.getCurrentQuestion();
    const targetQ = this.questions[index];

    if (this.questionStates[currentQ.id] === 'NOT_VISITED') {
      this.questionStates[currentQ.id] = 'NOT_ANSWERED';
    }
    if (this.questionStates[targetQ.id] === 'NOT_VISITED') {
      this.questionStates[targetQ.id] = 'NOT_ANSWERED';
    }
    this.currentIndex = index;
  }

  selectOption(optKey) {
    const currentQ = this.getCurrentQuestion();
    if (!currentQ) return;

    if (currentQ.type === 'MCQ') {
      this.userAnswers[currentQ.id] = optKey;
    } else if (currentQ.type === 'MSQ') {
      const currentList = this.userAnswers[currentQ.id] 
        ? this.userAnswers[currentQ.id].split(',').filter(Boolean) 
        : [];
      let updated;
      if (currentList.includes(optKey)) {
        updated = currentList.filter(k => k !== optKey);
      } else {
        updated = [...currentList, optKey];
      }
      updated.sort();
      this.userAnswers[currentQ.id] = updated.join(',');
    }
  }

  setNatInput(val) {
    const currentQ = this.getCurrentQuestion();
    if (!currentQ) return;
    this.userAnswers[currentQ.id] = val;
  }

  clearResponse() {
    const currentQ = this.getCurrentQuestion();
    if (!currentQ) return;
    delete this.userAnswers[currentQ.id];
    this.questionStates[currentQ.id] = 'NOT_ANSWERED';
  }

  saveAndNext() {
    const currentQ = this.getCurrentQuestion();
    if (!currentQ) return;
    const ans = this.userAnswers[currentQ.id];
    const hasAnswer = ans !== undefined && ans !== null && String(ans).trim() !== '';

    this.questionStates[currentQ.id] = hasAnswer ? 'ANSWERED' : 'NOT_ANSWERED';

    if (this.currentIndex < this.questions.length - 1) {
      this.navigateTo(this.currentIndex + 1);
    }
  }

  markForReviewAndNext() {
    const currentQ = this.getCurrentQuestion();
    if (!currentQ) return;
    const ans = this.userAnswers[currentQ.id];
    const hasAnswer = ans !== undefined && ans !== null && String(ans).trim() !== '';

    this.questionStates[currentQ.id] = hasAnswer ? 'ANSWERED_MARKED' : 'MARKED';

    if (this.currentIndex < this.questions.length - 1) {
      this.navigateTo(this.currentIndex + 1);
    }
  }

  getStatusCounts() {
    const counts = {
      NOT_VISITED: 0,
      NOT_ANSWERED: 0,
      ANSWERED: 0,
      MARKED: 0,
      ANSWERED_MARKED: 0
    };
    for (const st of Object.values(this.questionStates)) {
      if (counts[st] !== undefined) counts[st]++;
    }
    return counts;
  }

  tickTimer(seconds = 1) {
    if (this.isTimerRunning && this.timeLeft > 0) {
      this.timeLeft = Math.max(0, this.timeLeft - seconds);
    }
  }

  shouldAutoSubmit() {
    return this.isTimerRunning && this.timeLeft === 0;
  }
}

/**
 * Replicated helper logic from FormulaSheet.jsx
 */
function filterFormulas(formulaCategories, { searchTerm = '', selectedCat = 'All' }) {
  return formulaCategories.map(cat => {
    if (selectedCat !== 'All' && cat.category !== selectedCat) return null;

    const matchedTopics = cat.topics.map(top => {
      const matchedFormulas = top.formulas.filter(f => 
        f.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.explanation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        top.topicName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (matchedFormulas.length === 0) return null;
      return { ...top, formulas: matchedFormulas };
    }).filter(Boolean);

    if (matchedTopics.length === 0) return null;
    return { ...cat, topics: matchedTopics };
  }).filter(Boolean);
}

describe('Core Application Workflows Test Suite', () => {

  describe('Practice Mode Workflow', () => {
    it('normalizes various section name variations to standard titles', () => {
      assert.strictEqual(normSec('farm machinery & power'), 'Farm Power and Machinery');
      assert.strictEqual(normSec('Farm Power and Machinery'), 'Farm Power and Machinery');
      assert.strictEqual(normSec('soil and water conservation engineering'), 'Soil and Water Conservation Engineering');
      assert.strictEqual(normSec('Soil & Water Conservation Engineering'), 'Soil and Water Conservation Engineering');
      assert.strictEqual(normSec('agricultural process engineering'), 'Agricultural Process Engineering');
      assert.strictEqual(normSec('engineering mathematics'), 'Engineering Mathematics');
      assert.strictEqual(normSec('general aptitude'), 'General Aptitude');
      assert.strictEqual(normSec('All'), 'All');
      assert.strictEqual(normSec(null), 'All');
      assert.strictEqual(normSec(undefined), 'All');
    });

    it('filters questions by Section correctly', () => {
      const allQs = questionsData;
      const emQs = filterPracticeQuestions(allQs, { selectedSection: 'Engineering Mathematics' });
      assert.ok(emQs.length > 0);
      assert.ok(emQs.every(q => normSec(q.section) === 'Engineering Mathematics'));

      const fmpQs = filterPracticeQuestions(allQs, { selectedSection: 'Farm Power and Machinery' });
      assert.ok(fmpQs.length > 0);
      assert.ok(fmpQs.every(q => normSec(q.section) === 'Farm Power and Machinery'));
    });

    it('cascades filters through Section -> Topic -> Subtopic', () => {
      const allQs = questionsData;
      const fmpQuestions = filterPracticeQuestions(allQs, { selectedSection: 'Farm Power and Machinery' });
      assert.ok(fmpQuestions.length > 0);

      const targetTopic = fmpQuestions[0].topic;
      const topicFiltered = filterPracticeQuestions(allQs, { 
        selectedSection: 'Farm Power and Machinery',
        selectedTopic: targetTopic 
      });
      assert.ok(topicFiltered.length > 0);
      assert.ok(topicFiltered.every(q => q.topic === targetTopic));

      if (topicFiltered[0].subtopic) {
        const targetSubtopic = topicFiltered[0].subtopic;
        const subtopicFiltered = filterPracticeQuestions(allQs, {
          selectedSection: 'Farm Power and Machinery',
          selectedTopic: targetTopic,
          selectedSubtopic: targetSubtopic
        });
        assert.ok(subtopicFiltered.length > 0);
        assert.ok(subtopicFiltered.every(q => q.subtopic === targetSubtopic));
      }
    });

    it('filters by Question Type (MCQ, MSQ, NAT)', () => {
      const mcqs = filterPracticeQuestions(questionsData, { selectedType: 'MCQ' });
      assert.ok(mcqs.length > 0);
      assert.ok(mcqs.every(q => q.type === 'MCQ'));

      const msqs = filterPracticeQuestions(questionsData, { selectedType: 'MSQ' });
      assert.ok(msqs.length > 0);
      assert.ok(msqs.every(q => q.type === 'MSQ'));

      const nats = filterPracticeQuestions(questionsData, { selectedType: 'NAT' });
      assert.ok(nats.length > 0);
      assert.ok(nats.every(q => q.type === 'NAT'));
    });

    it('filters by Marks (1 or 2)', () => {
      const oneMark = filterPracticeQuestions(questionsData, { selectedMarks: '1' });
      assert.ok(oneMark.length > 0);
      assert.ok(oneMark.every(q => Number(q.marks) === 1));

      const twoMark = filterPracticeQuestions(questionsData, { selectedMarks: '2' });
      assert.ok(twoMark.length > 0);
      assert.ok(twoMark.every(q => Number(q.marks) === 2));
    });

    it('filters by Status (Bookmarked, Unattempted, Correct, Incorrect)', () => {
      const distinctIds = Array.from(new Set(questionsData.map(q => q.id)));
      const sampleId1 = distinctIds[0];
      const sampleId2 = distinctIds[1];
      const sampleId3 = distinctIds[2];

      const bookmarks = [sampleId1, sampleId2];
      const submittedState = {
        [sampleId1]: { isSubmitted: true, isCorrect: true },
        [sampleId2]: { isSubmitted: true, isCorrect: false },
        // sampleId3 unattempted
      };

      const bookmarked = filterPracticeQuestions(questionsData, {
        selectedStatusFilter: 'Bookmarked',
        bookmarks,
        submittedState
      });
      assert.ok(bookmarked.length >= 2);
      assert.ok(bookmarked.every(q => bookmarks.includes(q.id)));

      const correct = filterPracticeQuestions(questionsData, {
        selectedStatusFilter: 'Correct',
        bookmarks,
        submittedState
      });
      assert.ok(correct.length >= 1);
      assert.ok(correct.every(q => q.id === sampleId1));

      const incorrect = filterPracticeQuestions(questionsData, {
        selectedStatusFilter: 'Incorrect',
        bookmarks,
        submittedState
      });
      assert.ok(incorrect.length >= 1);
      assert.ok(incorrect.every(q => q.id === sampleId2));

      const unattempted = filterPracticeQuestions(questionsData, {
        selectedStatusFilter: 'Unattempted',
        bookmarks,
        submittedState
      });
      assert.ok(unattempted.length > 0);
    });
  });

  describe('CBT Mock Test Workflow', () => {
    const mockPaper2024 = mockPapersData.find(p => p.year === '2024') || mockPapersData[0];

    it('initializes paper state with Q1 as NOT_ANSWERED and remainder as NOT_VISITED', () => {
      const sm = new MockTestStateMachine(mockPaper2024);
      assert.strictEqual(sm.questions.length, 65);
      assert.strictEqual(sm.currentIndex, 0);

      const counts = sm.getStatusCounts();
      assert.strictEqual(counts.NOT_ANSWERED, 1);
      assert.strictEqual(counts.NOT_VISITED, 64);
      assert.strictEqual(counts.ANSWERED, 0);
      assert.strictEqual(counts.MARKED, 0);
      assert.strictEqual(counts.ANSWERED_MARKED, 0);
    });

    it('transitions states upon Save & Next (with and without answer)', () => {
      const sm = new MockTestStateMachine(mockPaper2024);
      
      // Q1: Select answer and Save & Next -> becomes ANSWERED
      sm.selectOption('C');
      sm.saveAndNext();

      assert.strictEqual(sm.questionStates[sm.questions[0].id], 'ANSWERED');
      assert.strictEqual(sm.currentIndex, 1);
      assert.strictEqual(sm.questionStates[sm.questions[1].id], 'NOT_ANSWERED');

      // Q2: Save & Next without answer -> becomes NOT_ANSWERED
      sm.saveAndNext();
      assert.strictEqual(sm.questionStates[sm.questions[1].id], 'NOT_ANSWERED');
      assert.strictEqual(sm.currentIndex, 2);
    });

    it('transitions states upon Mark For Review & Next (with and without answer)', () => {
      const sm = new MockTestStateMachine(mockPaper2024);

      // Q1: Without answer -> MARKED
      sm.markForReviewAndNext();
      assert.strictEqual(sm.questionStates[sm.questions[0].id], 'MARKED');
      assert.strictEqual(sm.currentIndex, 1);

      // Q2: With answer -> ANSWERED_MARKED
      sm.selectOption('A');
      sm.markForReviewAndNext();
      assert.strictEqual(sm.questionStates[sm.questions[1].id], 'ANSWERED_MARKED');
      assert.strictEqual(sm.currentIndex, 2);
    });

    it('handles direct question palette navigation and updates NOT_VISITED -> NOT_ANSWERED', () => {
      const sm = new MockTestStateMachine(mockPaper2024);

      // Jump directly to Q10 (index 9)
      sm.navigateTo(9);
      assert.strictEqual(sm.currentIndex, 9);
      assert.strictEqual(sm.questionStates[sm.questions[9].id], 'NOT_ANSWERED');
      // Q1 was already NOT_ANSWERED, Q2-Q8 remain NOT_VISITED
      assert.strictEqual(sm.questionStates[sm.questions[1].id], 'NOT_VISITED');
    });

    it('handles MSQ multi-select toggle (add, remove, sort)', () => {
      const dummyMSQPaper = {
        instructions: { duration_mins: 180 },
        questions: [
          { id: 'msq1', qnum: 1, type: 'MSQ', marks: 2, correct_answer: 'A, C' }
        ]
      };
      const sm = new MockTestStateMachine(dummyMSQPaper);

      sm.selectOption('C');
      assert.strictEqual(sm.userAnswers['msq1'], 'C');

      sm.selectOption('A');
      assert.strictEqual(sm.userAnswers['msq1'], 'A,C'); // sorted

      sm.selectOption('C'); // toggle remove C
      assert.strictEqual(sm.userAnswers['msq1'], 'A');

      sm.selectOption('B');
      assert.strictEqual(sm.userAnswers['msq1'], 'A,B');
    });

    it('handles Clear Response action', () => {
      const sm = new MockTestStateMachine(mockPaper2024);
      sm.selectOption('B');
      assert.strictEqual(sm.userAnswers[sm.questions[0].id], 'B');

      sm.clearResponse();
      assert.strictEqual(sm.userAnswers[sm.questions[0].id], undefined);
      assert.strictEqual(sm.questionStates[sm.questions[0].id], 'NOT_ANSWERED');
    });

    it('computes 180-min countdown timer and auto-submission accurately', () => {
      const sm = new MockTestStateMachine(mockPaper2024);
      assert.strictEqual(sm.timeLeft, 10800); // 180 * 60
      assert.strictEqual(formatTime(sm.timeLeft), '03:00:00');
      assert.strictEqual(formatTime(900), '00:15:00');
      assert.strictEqual(formatTime(65), '00:01:05');
      assert.strictEqual(formatTime(0), '00:00:00');

      sm.tickTimer(300); // 5 mins elapsed
      assert.strictEqual(sm.timeLeft, 10500);
      assert.strictEqual(formatTime(sm.timeLeft), '02:55:00');
      assert.strictEqual(sm.shouldAutoSubmit(), false);

      sm.tickTimer(10500); // drain all time
      assert.strictEqual(sm.timeLeft, 0);
      assert.strictEqual(sm.shouldAutoSubmit(), true);
    });
  });

  describe('Formula Sheet Workflow', () => {
    it('contains exactly 8 categorized sections in GATE_AG_FORMULAS matching official syllabus breakdown', () => {
      assert.strictEqual(GATE_AG_FORMULAS.length, 8);
      const codes = GATE_AG_FORMULAS.map(c => c.code);
      assert.deepStrictEqual(codes, ['EM', 'FMP', 'FP', 'SWCE', 'IDE', 'APE', 'DFE', 'GA']);
    });

    it('contains exactly 57 comprehensive formulas aligned with 14-year trend analysis report', () => {
      let totalFormulas = 0;
      GATE_AG_FORMULAS.forEach(cat => {
        cat.topics.forEach(top => {
          totalFormulas += top.formulas.length;
        });
      });
      assert.strictEqual(totalFormulas, 57);
    });

    it('performs accurate live search filtering matching title, explanation, and topicName', () => {
      // 1. Search by title keyword (e.g. "Eigenvalues")
      const eigenResults = filterFormulas(GATE_AG_FORMULAS, { searchTerm: 'Eigenvalues' });
      assert.ok(eigenResults.length > 0);
      assert.strictEqual(eigenResults[0].code, 'EM');
      const foundEigen = eigenResults[0].topics.some(t => t.formulas.some(f => f.title.includes('Eigenvalues')));
      assert.ok(foundEigen);

      // 2. Search by explanation keyword (e.g. "Manning")
      const manningResults = filterFormulas(GATE_AG_FORMULAS, { searchTerm: 'Manning' });
      assert.ok(manningResults.length > 0);
      assert.strictEqual(manningResults[0].code, 'SWCE');

      // 3. Search by topic name / keyword (e.g. "Evaporator")
      const psychroResults = filterFormulas(GATE_AG_FORMULAS, { searchTerm: 'Evaporator' });
      assert.ok(psychroResults.length > 0);
      assert.strictEqual(psychroResults[0].code, 'APE');
    });

    it('filters formulas by Category dropdown', () => {
      const emCategoryName = GATE_AG_FORMULAS[0].category;
      const emOnly = filterFormulas(GATE_AG_FORMULAS, { selectedCat: emCategoryName });
      assert.strictEqual(emOnly.length, 1);
      assert.strictEqual(emOnly[0].code, 'EM');
      assert.strictEqual(emOnly[0].topics.reduce((s, t) => s + t.formulas.length, 0), 10);
    });

    it('validates that all 57 formulas have valid non-empty LaTeX syntax and balanced braces', () => {
      let formulaIndex = 0;
      GATE_AG_FORMULAS.forEach(cat => {
        cat.topics.forEach(top => {
          top.formulas.forEach(f => {
            formulaIndex++;
            assert.ok(f.title && f.title.trim().length > 0, `Formula #${formulaIndex} missing title`);
            assert.ok(f.formula && f.formula.trim().length > 0, `Formula #${formulaIndex} missing formula text`);
            assert.ok(f.explanation && f.explanation.trim().length > 0, `Formula #${formulaIndex} missing explanation`);

            // Check balanced curly braces
            let openBraces = 0;
            for (let i = 0; i < f.formula.length; i++) {
              if (f.formula[i] === '{' && (i === 0 || f.formula[i-1] !== '\\')) openBraces++;
              if (f.formula[i] === '}' && (i === 0 || f.formula[i-1] !== '\\')) openBraces--;
              assert.ok(openBraces >= 0, `Unmatched closing brace in formula "${f.title}": ${f.formula}`);
            }
            assert.strictEqual(openBraces, 0, `Unbalanced open braces in formula "${f.title}": ${f.formula}`);
          });
        });
      });
      assert.strictEqual(formulaIndex, 57);
    });
  });

});
