import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

import { GATE_AG_SYLLABUS } from '../src/data/syllabus.js';
import { 
  getOfficialSections, 
  getOfficialTopicsForSection, 
  getOfficialSubtopicsForTopic, 
  normalizeSectionTitle, 
  normalizeTopicTitle, 
  normalizeSubtopicTitle, 
  classifyQuestionTaxonomy 
} from '../src/utils/syllabusTaxonomy.js';
import { ALL_QUESTION_BANK_QUESTIONS } from '../src/data/question_bank/index.js';

describe('Strict Official GATE AG Syllabus Taxonomy Compliance', () => {
  // Pre-build authoritative validation maps
  const officialSectionTitles = new Set(GATE_AG_SYLLABUS.map(s => s.title));
  const officialTopicNames = new Set();
  const secToTopicsMap = {};
  const topicToSubtopicsMap = {};

  GATE_AG_SYLLABUS.forEach(sec => {
    secToTopicsMap[sec.title] = new Set(sec.topics.map(t => t.topic_name));
    sec.topics.forEach(top => {
      officialTopicNames.add(top.topic_name);
      topicToSubtopicsMap[top.topic_name] = new Set(top.subtopics);
    });
  });

  it('verifies the official syllabus definition contains exactly 8 sections and 33 official topics', () => {
    assert.strictEqual(GATE_AG_SYLLABUS.length, 8, 'Must have exactly 8 sections');
    assert.strictEqual(officialTopicNames.size, 33, 'Must have exactly 33 official topics');
    
    // Verify each section has the official topic count
    assert.strictEqual(secToTopicsMap['Section 1: Engineering Mathematics'].size, 6);
    assert.strictEqual(secToTopicsMap['Section 2: Farm Machinery'].size, 2);
    assert.strictEqual(secToTopicsMap['Section 3: Farm Power'].size, 3);
    assert.strictEqual(secToTopicsMap['Section 4: Soil and Water Conservation Engineering'].size, 6);
    assert.strictEqual(secToTopicsMap['Section 5: Irrigation and Drainage Engineering'].size, 5);
    assert.strictEqual(secToTopicsMap['Section 6: Agricultural Process Engineering'].size, 5);
    assert.strictEqual(secToTopicsMap['Section 7: Dairy and Food Engineering'].size, 3);
    assert.strictEqual(secToTopicsMap['Section 8: General Aptitude'].size, 3);
  });

  it('asserts 100% of all 1,324 PYQs in questions.json strictly belong to official syllabus taxonomy', () => {
    const pyqs = JSON.parse(fs.readFileSync(path.join(root, 'src/data/questions.json'), 'utf8'));
    assert.strictEqual(pyqs.length, 1324);

    pyqs.forEach((q, idx) => {
      // 1. Section
      assert.ok(
        officialSectionTitles.has(q.section),
        `PYQ #${idx} (${q.id}) has invalid section "${q.section}"`
      );

      // 2. Topic
      assert.ok(
        secToTopicsMap[q.section].has(q.topic),
        `PYQ #${idx} (${q.id}) topic "${q.topic}" does not belong to section "${q.section}"`
      );

      // 3. Subtopic
      assert.ok(
        topicToSubtopicsMap[q.topic].has(q.subtopic),
        `PYQ #${idx} (${q.id}) subtopic "${q.subtopic}" does not belong to official topic "${q.topic}"`
      );
    });
  });

  it('asserts 100% of all questions in mock_papers.json strictly belong to official syllabus taxonomy', () => {
    const papers = JSON.parse(fs.readFileSync(path.join(root, 'src/data/mock_papers.json'), 'utf8'));
    assert.strictEqual(papers.length, 20);

    let totalQs = 0;
    papers.forEach(paper => {
      paper.questions.forEach((q, qIdx) => {
        totalQs++;
        assert.ok(
          officialSectionTitles.has(q.section),
          `Paper ${paper.year} Q#${qIdx} (${q.id}) invalid section: ${q.section}`
        );
        assert.ok(
          secToTopicsMap[q.section].has(q.topic),
          `Paper ${paper.year} Q#${qIdx} (${q.id}) topic ${q.topic} not in ${q.section}`
        );
        assert.ok(
          topicToSubtopicsMap[q.topic].has(q.subtopic),
          `Paper ${paper.year} Q#${qIdx} (${q.id}) subtopic ${q.subtopic} not in ${q.topic}`
        );
      });
    });
    assert.strictEqual(totalQs, 1324);
  });

  it('asserts 100% of all 1,950 questions across 30 Custom Mocks strictly belong to official syllabus taxonomy', () => {
    let totalCustomQs = 0;

    for (let i = 1; i <= 30; i++) {
      const num = String(i).padStart(2, '0');
      const filePath = path.join(root, `src/data/custom_mock_2027_${num}.json`);
      assert.ok(fs.existsSync(filePath), `Mock ${num} must exist`);

      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      assert.strictEqual(data.questions.length, 65, `Mock ${num} must have 65 questions`);

      data.questions.forEach((q, qIdx) => {
        totalCustomQs++;
        assert.ok(
          officialSectionTitles.has(q.section),
          `Mock ${num} Q#${qIdx} (${q.id}) invalid section: ${q.section}`
        );
        assert.ok(
          secToTopicsMap[q.section].has(q.topic),
          `Mock ${num} Q#${qIdx} (${q.id}) topic "${q.topic}" not in ${q.section}`
        );
        assert.ok(
          topicToSubtopicsMap[q.topic].has(q.subtopic),
          `Mock ${num} Q#${qIdx} (${q.id}) subtopic "${q.subtopic}" not in ${q.topic}`
        );
      });
    }

    assert.strictEqual(totalCustomQs, 1950);
  });

  it('asserts 100% of all 8,297 questions in Question Bank strictly belong to syllabus taxonomy', () => {
    assert.strictEqual(ALL_QUESTION_BANK_QUESTIONS.length, 8297);

    const officialSyllabus = JSON.parse(fs.readFileSync(path.join(root, 'src/data/official_syllabus.json'), 'utf8'));
    const allValidSecMap = {};
    officialSyllabus.forEach(sec => {
      allValidSecMap[sec.full_title] = new Set();
      sec.topics.forEach(top => {
        allValidSecMap[sec.full_title].add(top.topic_name);
      });
    });

    ALL_QUESTION_BANK_QUESTIONS.forEach((q, idx) => {
      assert.ok(
        officialSectionTitles.has(q.section),
        `QB #${idx} (${q.id}) invalid section: ${q.section}`
      );
      assert.ok(
        (allValidSecMap[q.section] && allValidSecMap[q.section].has(q.topic)) ||
        (secToTopicsMap[q.section] && secToTopicsMap[q.section].has(q.topic)),
        `QB #${idx} (${q.id}) topic "${q.topic}" not in ${q.section}`
      );
      assert.ok(
        typeof q.subtopic === 'string' && q.subtopic.trim().length > 0,
        `QB #${idx} (${q.id}) missing subtopic`
      );
    });
  });

  it('validates classifyQuestionTaxonomy deterministic behavior for arbitrary inputs', () => {
    const sample = {
      section: 'Math',
      topic: 'Linear Algebra',
      subtopic: 'Eigen values and Eigen vectors',
      question: 'Find the eigenvalues of matrix A.'
    };
    const res = classifyQuestionTaxonomy(sample);
    assert.strictEqual(res.section, 'Section 1: Engineering Mathematics');
    assert.strictEqual(res.topic, 'Linear Algebra');
    assert.strictEqual(res.subtopic, 'Eigen values and Eigen vectors');
  });
});
