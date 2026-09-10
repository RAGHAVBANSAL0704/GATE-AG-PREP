import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  filterQuestionsByCriteria,
  getSectionHierarchyStats,
  buildPracticeSessionPool
} from '../src/utils/practiceSessionBuilder.js';
import { normalizeSectionTitle } from '../src/utils/syllabusTaxonomy.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Custom Pool (50 Full-Length Mocks) Comprehensive Audit & Feature Parity Suite', () => {

  const customMocks = [];
  let allCustomQuestions = [];

  it('loads all 50 full-length mock papers with exactly 65 questions each (3,250 total)', () => {
    for (let i = 1; i <= 50; i++) {
      const numStr = String(i).padStart(2, '0');
      const filePath = path.resolve(__dirname, `../src/data/custom_mock_2027_${numStr}.json`);
      assert.ok(fs.existsSync(filePath), `Mock paper ${numStr} must exist at ${filePath}`);
      const mockData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      assert.strictEqual(mockData.questions.length, 65, `Mock ${numStr} must contain exactly 65 questions`);
      customMocks.push(mockData);

      const qsWithMeta = mockData.questions.map(q => ({
        ...q,
        sourceTitle: mockData.title,
        paperTitle: mockData.title,
        paperYear: mockData.year,
        isCustomUploaded: true
      }));
      allCustomQuestions.push(...qsWithMeta);
    }

    assert.strictEqual(customMocks.length, 50, 'Exactly 50 mock papers must be loaded');
    assert.strictEqual(allCustomQuestions.length, 3250, 'Exactly 3,250 custom mock questions must be loaded');
  });

  it('verifies 100% topic, subtopic and section sanitization across all 3,250 custom questions', () => {
    const validSections = new Set([
      'Section 1: Engineering Mathematics',
      'Section 2: Farm Machinery',
      'Section 3: Farm Power',
      'Section 4: Soil and Water Conservation Engineering',
      'Section 5: Irrigation and Drainage Engineering',
      'Section 6: Agricultural Process Engineering',
      'Section 7: Dairy and Food Engineering',
      'Section 8: General Aptitude'
    ]);

    allCustomQuestions.forEach(q => {
      assert.ok(validSections.has(q.section), `Q ${q.id} has invalid canonical section: ${q.section}`);
      assert.ok(q.topic && q.topic.trim().length > 0, `Q ${q.id} missing topic`);
      assert.ok(q.subtopic && q.subtopic.trim().length > 0, `Q ${q.id} missing subtopic`);

      assert.ok(!q.topic.endsWith('"') && !q.topic.endsWith('\\'), `Q ${q.id} has trailing quote in topic: ${q.topic}`);
      assert.ok(!q.subtopic.endsWith('"') && !q.subtopic.endsWith('\\'), `Q ${q.id} has trailing quote in subtopic: ${q.subtopic}`);

      assert.ok(!/\n?Options:\s*$/i.test(q.question), `Q ${q.id} has lingering Options prefix in question`);
      assert.ok(!/^Question\s*(Statement)?\s*:/i.test(q.question), `Q ${q.id} has OCR Question Statement prefix`);
      assert.ok(q.solution && q.solution.trim().length >= 20, `Q ${q.id} has stub solution`);
    });
  });

  it('asserts zero unbalanced KaTeX math delimiters ($ or $$) across all custom questions', () => {
    allCustomQuestions.forEach(q => {
      ['question', 'solution'].forEach(field => {
        const text = q[field] || '';
        const clean = text.replace(/\\\$/g, '');
        const matches = clean.match(/\$/g);
        if (matches) {
          assert.strictEqual(matches.length % 2, 0, `Q ${q.id} has odd number of $ in ${field}`);
        }
      });

      if (q.options) {
        Object.entries(q.options).forEach(([k, opt]) => {
          const clean = (opt || '').replace(/\\\$/g, '');
          const matches = clean.match(/\$/g);
          if (matches) {
            assert.strictEqual(matches.length % 2, 0, `Q ${q.id} option ${k} has odd number of $`);
          }
        });
      }
    });
  });

  it('generates section hierarchy stats and available counts for Custom Pool', () => {
    const stats = getSectionHierarchyStats(allCustomQuestions, { sourceFilter: 'Custom Mock Questions' });
    assert.strictEqual(stats.length, 8, 'Must return stats for all 8 syllabus sections');
    
    const totalCount = stats.reduce((sum, s) => sum + s.totalAvailable, 0);
    assert.strictEqual(totalCount, 3250, 'All 3,250 questions must be distributed across the 8 sections');

    stats.forEach(s => {
      assert.ok(s.totalAvailable > 0, `Section ${s.title} should have questions available`);
      assert.ok(s.topics.length > 0, `Section ${s.title} should have topics`);
      s.topics.forEach(t => {
        assert.ok(Array.isArray(t.subtopics), 'Topic should have subtopics array');
      });
    });
  });

  it('filters Custom Pool questions by specific Mock Paper', () => {
    const mock01Title = customMocks[0].title;
    const filteredMock01 = filterQuestionsByCriteria(allCustomQuestions, {
      selectedPaper: mock01Title
    });
    assert.strictEqual(filteredMock01.length, 65, 'Filtering by Mock 01 must yield exactly 65 questions');
    assert.ok(filteredMock01.every(q => q.sourceTitle === mock01Title));
  });

  it('filters Custom Pool questions by Question Type and Marks', () => {
    const mcq1M = filterQuestionsByCriteria(allCustomQuestions, {
      selectedType: 'MCQ',
      selectedMarks: '1'
    });
    assert.ok(mcq1M.length > 0, 'Should find 1-mark MCQs in custom pool');
    assert.ok(mcq1M.every(q => q.type === 'MCQ' && Number(q.marks) === 1));

    const nat2M = filterQuestionsByCriteria(allCustomQuestions, {
      selectedType: 'NAT',
      selectedMarks: '2'
    });
    assert.ok(nat2M.length > 0, 'Should find 2-mark NATs in custom pool');
    assert.ok(nat2M.every(q => q.type === 'NAT' && Number(q.marks) === 2));
  });

  it('builds custom practice session pool from multiple sections with specific allocations', () => {
    const session = buildPracticeSessionPool({
      combinedPool: allCustomQuestions,
      selectedSections: {
        'Section 1: Engineering Mathematics': true,
        'Section 2: Farm Machinery': true,
        'Section 3: Farm Power': true
      },
      sectionAllocations: {
        'Section 1: Engineering Mathematics': 10,
        'Section 2: Farm Machinery': 10,
        'Section 3: Farm Power': 10
      },
      filters: {
        sourceFilter: 'Custom Mock Questions'
      }
    });

    assert.strictEqual(session.totalQuestions, 30);
    assert.strictEqual(session.sectionBreakdown['Section 1: Engineering Mathematics'], 10);
    assert.strictEqual(session.sectionBreakdown['Section 2: Farm Machinery'], 10);
    assert.strictEqual(session.sectionBreakdown['Section 3: Farm Power'], 10);
  });

  it('builds custom practice session with specific subtopic filtering', () => {
    const session = buildPracticeSessionPool({
      combinedPool: allCustomQuestions,
      selectedSections: {
        'Section 8: General Aptitude': true
      },
      selectedSubtopicsMap: {
        'Section 8: General Aptitude': {
          'Vocabulary': true
        }
      },
      sectionAllocations: {
        'Section 8: General Aptitude': 15
      }
    });

    assert.ok(session.totalQuestions > 0, 'Should allocate questions for selected subtopic');
    assert.ok(session.totalQuestions <= 15);
    assert.ok(session.questions.every(q => q.subtopic === 'Vocabulary'));
  });
});
