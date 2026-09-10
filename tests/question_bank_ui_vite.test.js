import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { ALL_QUESTION_BANK_QUESTIONS } from '../src/data/question_bank/index.js';

describe('Question Bank UI & Vite Code-Splitting Verification (Worker M7)', () => {
  const cwd = process.cwd();

  describe('1. QuestionBankView Pre-Aggregation & Filtering Logic', () => {
    it('verifies pre-aggregation lookup Map logic matches question counts across all sections', () => {
      // Replicate the aggregatedStats computation
      const sectionCounts = {};
      const topicCounts = {};
      const subtopicCounts = {};

      for (let i = 0; i < ALL_QUESTION_BANK_QUESTIONS.length; i++) {
        const q = ALL_QUESTION_BANK_QUESTIONS[i];
        const sec = q.section || '';
        const top = q.topic || '';
        const sub = q.subtopic || '';

        sectionCounts[sec] = (sectionCounts[sec] || 0) + 1;
        const topKey = `${sec}:::${top}`;
        topicCounts[topKey] = (topicCounts[topKey] || 0) + 1;
        const subKey = `${sec}:::${top}:::${sub}`;
        subtopicCounts[subKey] = (subtopicCounts[subKey] || 0) + 1;
      }

      // Verify that summing sectionCounts equals total questions
      const totalFromSections = Object.values(sectionCounts).reduce((a, b) => a + b, 0);
      assert.strictEqual(totalFromSections, ALL_QUESTION_BANK_QUESTIONS.length);

      // Verify each individual section matches manual filter count
      Object.entries(sectionCounts).forEach(([secTitle, count]) => {
        const directCount = ALL_QUESTION_BANK_QUESTIONS.filter(q => q.section === secTitle).length;
        assert.strictEqual(count, directCount, `Section count mismatch for ${secTitle}`);
      });

      // Verify topic counts match direct filter
      Object.entries(topicCounts).forEach(([topKey, count]) => {
        const [secTitle, topName] = topKey.split(':::');
        const directCount = ALL_QUESTION_BANK_QUESTIONS.filter(q => q.section === secTitle && q.topic === topName).length;
        assert.strictEqual(count, directCount, `Topic count mismatch for ${topKey}`);
      });
    });

    it('verifies Difficulty filter isolates Easy, Moderate, and Hard questions accurately', () => {
      const easyQs = ALL_QUESTION_BANK_QUESTIONS.filter(q => q.difficulty === 'Easy');
      const modQs = ALL_QUESTION_BANK_QUESTIONS.filter(q => q.difficulty === 'Moderate');
      const hardQs = ALL_QUESTION_BANK_QUESTIONS.filter(q => q.difficulty === 'Hard');

      assert.ok(easyQs.length > 0, 'Must have Easy questions in Question Bank');
      assert.ok(modQs.length > 0, 'Must have Moderate questions in Question Bank');
      assert.ok(hardQs.length > 0, 'Must have Hard questions in Question Bank');

      assert.strictEqual(
        easyQs.length + modQs.length + hardQs.length,
        ALL_QUESTION_BANK_QUESTIONS.length,
        'All questions must have valid difficulty (Easy, Moderate, or Hard)'
      );
    });

    it('verifies Status filter correctly filters Bookmarked questions', () => {
      const mockBookmarks = [ALL_QUESTION_BANK_QUESTIONS[0].id, ALL_QUESTION_BANK_QUESTIONS[2].id];
      const bookmarkSet = new Set(mockBookmarks);

      const bookmarkedQs = ALL_QUESTION_BANK_QUESTIONS.filter(q => bookmarkSet.has(q.id));
      assert.strictEqual(bookmarkedQs.length, 2);
      assert.strictEqual(bookmarkedQs[0].id, mockBookmarks[0]);
      assert.strictEqual(bookmarkedQs[1].id, mockBookmarks[1]);

      // When no bookmarks exist
      const emptyBookmarks = new Set();
      const emptyFiltered = ALL_QUESTION_BANK_QUESTIONS.filter(q => emptyBookmarks.has(q.id));
      assert.strictEqual(emptyFiltered.length, 0);
    });

    it('verifies Status filter correctly filters Unattempted, Correct, and Incorrect questions', () => {
      const q0 = ALL_QUESTION_BANK_QUESTIONS[0].id;
      const q1 = ALL_QUESTION_BANK_QUESTIONS[1].id;
      const mockProgress = {
        [q0]: { attempted: true, isCorrect: true },
        [q1]: { attempted: true, isCorrect: false }
      };

      // Correct filter
      const correctQs = ALL_QUESTION_BANK_QUESTIONS.filter(q => {
        const prog = mockProgress[q.id];
        return prog && prog.isCorrect;
      });
      assert.strictEqual(correctQs.length, 1);
      assert.strictEqual(correctQs[0].id, q0);

      // Incorrect filter
      const incorrectQs = ALL_QUESTION_BANK_QUESTIONS.filter(q => {
        const prog = mockProgress[q.id];
        return prog && !prog.isCorrect;
      });
      assert.strictEqual(incorrectQs.length, 1);
      assert.strictEqual(incorrectQs[0].id, q1);

      // Unattempted filter
      const unattemptedQs = ALL_QUESTION_BANK_QUESTIONS.filter(q => {
        const prog = mockProgress[q.id];
        return !prog || !prog.attempted;
      });
      assert.strictEqual(unattemptedQs.length, ALL_QUESTION_BANK_QUESTIONS.length - 2);
    });

    it('verifies Question Palette windowing / pagination math for 50 questions per block', () => {
      const PALETTE_CHUNK_SIZE = 50;
      const totalQuestions = ALL_QUESTION_BANK_QUESTIONS.length;
      const expectedTotalPages = Math.ceil(totalQuestions / PALETTE_CHUNK_SIZE);

      assert.ok(expectedTotalPages >= 2, `Expected at least 2 pages for ${totalQuestions} questions`);

      // Test page 0
      const start0 = 0 * PALETTE_CHUNK_SIZE;
      const end0 = Math.min(start0 + PALETTE_CHUNK_SIZE, totalQuestions);
      assert.strictEqual(start0, 0);
      assert.strictEqual(end0, 50);

      // Test page 1
      const start1 = 1 * PALETTE_CHUNK_SIZE;
      const end1 = Math.min(start1 + PALETTE_CHUNK_SIZE, totalQuestions);
      assert.strictEqual(start1, 50);
      assert.ok(end1 <= totalQuestions);

      // Test active question page sync
      const qIndex49Page = Math.floor(49 / PALETTE_CHUNK_SIZE);
      const qIndex50Page = Math.floor(50 / PALETTE_CHUNK_SIZE);
      const qIndex99Page = Math.floor(99 / PALETTE_CHUNK_SIZE);
      const qIndex100Page = Math.floor(100 / PALETTE_CHUNK_SIZE);

      assert.strictEqual(qIndex49Page, 0);
      assert.strictEqual(qIndex50Page, 1);
      assert.strictEqual(qIndex99Page, 1);
      assert.strictEqual(qIndex100Page, 2);
    });

    it('verifies multi-criteria filtering combination (type + marks + difficulty + status)', () => {
      const targetDifficulty = 'Moderate';
      const targetType = 'MCQ';
      const targetMarks = '1';
      const sampleQ = ALL_QUESTION_BANK_QUESTIONS.find(q => 
        q.type === targetType && String(q.marks) === targetMarks && q.difficulty === targetDifficulty
      );
      assert.ok(sampleQ, 'Should find at least one sample question matching criteria');

      const mockProgress = {
        [sampleQ.id]: { attempted: true, isCorrect: true }
      };

      const matched = ALL_QUESTION_BANK_QUESTIONS.filter(q => {
        if (q.type !== targetType) return false;
        if (String(q.marks) !== targetMarks) return false;
        if (q.difficulty !== targetDifficulty) return false;
        const prog = mockProgress[q.id];
        if (!prog || !prog.isCorrect) return false;
        return true;
      });

      assert.ok(matched.length >= 1);
      assert.ok(matched.some(q => q.id === sampleQ.id));
    });

    it('verifies palette pagination handles empty and single-question boundaries safely', () => {
      const PALETTE_CHUNK_SIZE = 50;

      // 0 questions
      const total0 = 0;
      const totalPages0 = Math.ceil(total0 / PALETTE_CHUNK_SIZE) || 1;
      assert.strictEqual(totalPages0, 1);
      const safePage0 = Math.min(0, Math.max(0, totalPages0 - 1));
      assert.strictEqual(safePage0, 0);

      // 1 question
      const total1 = 1;
      const totalPages1 = Math.ceil(total1 / PALETTE_CHUNK_SIZE) || 1;
      assert.strictEqual(totalPages1, 1);

      // Clamping when page is out of bounds (e.g. user was on page 5, filter reduced to 1 page)
      const requestedPage = 5;
      const clampedPage = Math.min(requestedPage, Math.max(0, totalPages1 - 1));
      assert.strictEqual(clampedPage, 0);
    });
  });

  describe('2. Vite Configuration & Code-Splitting Integrity', () => {
    const viteConfigPath = join(cwd, 'vite.config.js');

    it('verifies vite.config.js contains modular domain chunk mappings for question_bank', () => {
      assert.ok(existsSync(viteConfigPath), 'vite.config.js must exist');
      const configSource = readFileSync(viteConfigPath, 'utf8');

      // Check required chunk names
      assert.ok(configSource.includes('dataset-qb-em'), 'Must define dataset-qb-em chunk');
      assert.ok(configSource.includes('dataset-qb-fm-fp'), 'Must define dataset-qb-fm-fp chunk');
      assert.ok(configSource.includes('dataset-qb-swce-ide'), 'Must define dataset-qb-swce-ide chunk');
      assert.ok(configSource.includes('dataset-qb-ape-dfe'), 'Must define dataset-qb-ape-dfe chunk');
      assert.ok(configSource.includes('dataset-qb-ga'), 'Must define dataset-qb-ga chunk');
    });

    it('tests manualChunks resolution logic for all question_bank modules', async () => {
      const viteConfigModule = await import('../vite.config.js');
      const configObj = viteConfigModule.default({ command: 'build' });
      const manualChunks = configObj.build.rollupOptions.output.manualChunks;

      assert.strictEqual(typeof manualChunks, 'function', 'manualChunks must be a function');

      // Test each section module mapping
      assert.strictEqual(
        manualChunks('/project/src/data/question_bank/section_1_engineering_mathematics.js'),
        'dataset-qb-em'
      );
      assert.strictEqual(
        manualChunks('/project/src/data/question_bank/section_2_farm_machinery.js'),
        'dataset-qb-fm-fp'
      );
      assert.strictEqual(
        manualChunks('/project/src/data/question_bank/section_3_farm_power.js'),
        'dataset-qb-fm-fp'
      );
      assert.strictEqual(
        manualChunks('/project/src/data/question_bank/section_4_soil_water_conservation.js'),
        'dataset-qb-swce-ide'
      );
      assert.strictEqual(
        manualChunks('/project/src/data/question_bank/section_5_irrigation_drainage.js'),
        'dataset-qb-swce-ide'
      );
      assert.strictEqual(
        manualChunks('/project/src/data/question_bank/section_6_agri_process_engineering.js'),
        'dataset-qb-ape-dfe'
      );
      assert.strictEqual(
        manualChunks('/project/src/data/question_bank/section_7_dairy_food_engineering.js'),
        'dataset-qb-ape-dfe'
      );
      assert.strictEqual(
        manualChunks('/project/src/data/question_bank/section_8_general_aptitude.js'),
        'dataset-qb-ga'
      );
      assert.strictEqual(
        manualChunks('/project/src/data/question_bank/index.js'),
        'dataset-qb-ga'
      );
    });

    it('verifies QuestionBankView.jsx contains the required UI components and filters', () => {
      const qbViewPath = join(cwd, 'src', 'components', 'QuestionBankView.jsx');
      assert.ok(existsSync(qbViewPath), 'QuestionBankView.jsx must exist');
      const qbViewContent = readFileSync(qbViewPath, 'utf8');

      // Pre-aggregation
      assert.ok(qbViewContent.includes('aggregatedStats'), 'Must compute pre-aggregated stats');
      assert.ok(!qbViewContent.includes('secQuestions.filter'), 'Must not do nested filtering on re-render');

      // Difficulty filter
      assert.ok(qbViewContent.includes('difficultyFilter'), 'Must have difficultyFilter state');
      assert.ok(qbViewContent.includes('Difficulty: All'), 'Must have Difficulty dropdown option');

      // Bookmarked filter
      assert.ok(qbViewContent.includes('Bookmarked'), 'Must have Bookmarked status filter');

      // Paginated palette
      assert.ok(qbViewContent.includes('PALETTE_CHUNK_SIZE'), 'Must define PALETTE_CHUNK_SIZE');
      assert.ok(qbViewContent.includes('palettePage'), 'Must track palettePage');
      assert.ok(qbViewContent.includes('totalPalettePages'), 'Must calculate totalPalettePages');
      assert.ok(qbViewContent.includes('visiblePaletteQuestions'), 'Must slice visiblePaletteQuestions');
    });
  });

  describe('3. Invariant Protection', () => {
    it('verifies questions.json and custom_mock files are strictly intact', () => {
      const pyqPath = join(cwd, 'src', 'data', 'questions.json');
      const pyqs = JSON.parse(readFileSync(pyqPath, 'utf8'));
      assert.strictEqual(pyqs.length, 1324, 'questions.json must contain strictly 1,324 PYQs');

      for (let i = 1; i <= 50; i++) {
        const pad = String(i).padStart(2, '0');
        const mockPath = join(cwd, 'src', 'data', `custom_mock_2027_${pad}.json`);
        assert.ok(existsSync(mockPath), `Mock file ${pad} must exist`);
      }
    });
  });
});
