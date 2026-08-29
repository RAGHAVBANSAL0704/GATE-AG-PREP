import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const officialSyllabusPath = path.join(projectRoot, 'src/data/official_syllabus.json');
const questionsPath = path.join(projectRoot, 'src/data/questions.json');
const mockPapersPath = path.join(projectRoot, 'src/data/mock_papers.json');
const conceptsPath = path.join(projectRoot, 'src/data/concepts.json');
const schemaSqlPath = path.join(projectRoot, 'scripts/schema.sql');

const officialSyllabus = JSON.parse(fs.readFileSync(officialSyllabusPath, 'utf8'));
const questionsData = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));
const mockPapersData = JSON.parse(fs.readFileSync(mockPapersPath, 'utf8'));
const conceptsData = JSON.parse(fs.readFileSync(conceptsPath, 'utf8'));
const schemaSqlContent = fs.readFileSync(schemaSqlPath, 'utf8');

import { 
  getOfficialSections, 
  getOfficialTopicsForSection, 
  getOfficialSubtopicsForTopic, 
  normalizeSectionTitle, 
  normalizeTopicTitle 
} from '../src/utils/syllabusTaxonomy.js';

describe('Official 8-Section Taxonomy, Dataset Schema & SQL Parity Test Suite', () => {

  // =========================================================================
  // 1. Official Syllabus Structure & 8-Section Verification
  // =========================================================================
  describe('Official Syllabus Definition (official_syllabus.json)', () => {
    it('contains exactly 8 official sections matching GATE AG specification', () => {
      assert.ok(Array.isArray(officialSyllabus), 'official_syllabus.json must be an array');
      assert.strictEqual(officialSyllabus.length, 8, 'official_syllabus.json must have exactly 8 sections');
      
      const expectedSections = [
        { id: 'section_1', number: 1, name: 'Engineering Mathematics', full_title: 'Section 1: Engineering Mathematics' },
        { id: 'section_2', number: 2, name: 'Farm Machinery', full_title: 'Section 2: Farm Machinery' },
        { id: 'section_3', number: 3, name: 'Farm Power', full_title: 'Section 3: Farm Power' },
        { id: 'section_4', number: 4, name: 'Soil and Water Conservation Engineering', full_title: 'Section 4: Soil and Water Conservation Engineering' },
        { id: 'section_5', number: 5, name: 'Irrigation and Drainage Engineering', full_title: 'Section 5: Irrigation and Drainage Engineering' },
        { id: 'section_6', number: 6, name: 'Agricultural Process Engineering', full_title: 'Section 6: Agricultural Process Engineering' },
        { id: 'section_7', number: 7, name: 'Dairy and Food Engineering', full_title: 'Section 7: Dairy and Food Engineering' },
        { id: 'section_8', number: 8, name: 'General Aptitude', full_title: 'Section 8: General Aptitude' }
      ];

      expectedSections.forEach((exp, idx) => {
        const sec = officialSyllabus[idx];
        assert.strictEqual(sec.section_id, exp.id, `Section #${idx + 1} id mismatch`);
        assert.strictEqual(sec.section_number, exp.number, `Section #${idx + 1} number mismatch`);
        assert.strictEqual(sec.section_name, exp.name, `Section #${idx + 1} name mismatch`);
        assert.strictEqual(sec.full_title, exp.full_title, `Section #${idx + 1} full_title mismatch`);
        assert.ok(Array.isArray(sec.topics) && sec.topics.length > 0, `Section #${idx + 1} must have topics`);
      });
    });

    it('verifies Section 8: General Aptitude contains Verbal, Quantitative, and Spatial Aptitude topics', () => {
      const sec8 = officialSyllabus.find(s => s.section_number === 8);
      assert.ok(sec8, 'Section 8 must be present in official syllabus');
      assert.strictEqual(sec8.section_name, 'General Aptitude');
      assert.strictEqual(sec8.full_title, 'Section 8: General Aptitude');

      const topicNames = sec8.topics.map(t => t.topic_name);
      assert.ok(topicNames.includes('Verbal Aptitude'), 'Section 8 must contain Verbal Aptitude');
      assert.ok(topicNames.includes('Quantitative Aptitude'), 'Section 8 must contain Quantitative Aptitude');
      assert.ok(topicNames.includes('Analytical & Spatial Aptitude'), 'Section 8 must contain Analytical & Spatial Aptitude');

      sec8.topics.forEach(t => {
        assert.ok(t.topic_id, `Topic ${t.topic_name} missing topic_id`);
        assert.ok(Array.isArray(t.subtopics) && t.subtopics.length > 0, `Topic ${t.topic_name} missing subtopics`);
      });
    });

    it('verifies all topics across all 8 sections define non-empty subtopic lists', () => {
      let totalSubtopics = 0;
      officialSyllabus.forEach(sec => {
        sec.topics.forEach(top => {
          assert.ok(top.topic_id && top.topic_id.length > 0, `Topic missing id in ${sec.full_title}`);
          assert.ok(top.topic_name && top.topic_name.length > 0, `Topic missing name in ${sec.full_title}`);
          assert.ok(Array.isArray(top.subtopics) && top.subtopics.length > 0, `Topic ${top.topic_name} has empty subtopics`);
          totalSubtopics += top.subtopics.length;
        });
      });
      assert.ok(totalSubtopics >= 60, `Expected at least 60 granular subtopics across 8 sections, found ${totalSubtopics}`);
    });
  });

  // =========================================================================
  // 2. Syllabus Taxonomy Mapping & Helper Functions
  // =========================================================================
  describe('Syllabus Taxonomy Resolver (syllabusTaxonomy.js)', () => {
    it('normalizes General Aptitude variations to "Section 8: General Aptitude"', () => {
      const gaInputs = [
        'General Aptitude',
        'general aptitude',
        'Verbal Aptitude',
        'Quantitative Aptitude',
        'Analytical & Spatial Aptitude',
        'Spatial Reasoning',
        'Aptitude',
        'Section 8: General Aptitude'
      ];

      gaInputs.forEach(input => {
        assert.strictEqual(
          normalizeSectionTitle(input),
          'Section 8: General Aptitude',
          `Failed to normalize "${input}" to Section 8: General Aptitude`
        );
      });
    });

    it('normalizes section titles to all 8 official full titles', () => {
      assert.strictEqual(normalizeSectionTitle('Engineering Mathematics'), 'Section 1: Engineering Mathematics');
      assert.strictEqual(normalizeSectionTitle('Engineering Math'), 'Section 1: Engineering Mathematics');
      assert.strictEqual(normalizeSectionTitle('Farm Machinery'), 'Section 2: Farm Machinery');
      assert.strictEqual(normalizeSectionTitle('Farm Power'), 'Section 3: Farm Power');
      assert.strictEqual(normalizeSectionTitle('Soil and Water Conservation Engineering'), 'Section 4: Soil and Water Conservation Engineering');
      assert.strictEqual(normalizeSectionTitle('Irrigation and Drainage Engineering'), 'Section 5: Irrigation and Drainage Engineering');
      assert.strictEqual(normalizeSectionTitle('Agricultural Process Engineering'), 'Section 6: Agricultural Process Engineering');
      assert.strictEqual(normalizeSectionTitle('Dairy and Food Engineering'), 'Section 7: Dairy and Food Engineering');
      assert.strictEqual(normalizeSectionTitle('General Aptitude'), 'Section 8: General Aptitude');
    });

    it('verifies getOfficialSections returns 8 structured section records', () => {
      const sections = getOfficialSections();
      assert.strictEqual(sections.length, 8);
      assert.strictEqual(sections[0].name, 'Engineering Mathematics');
      assert.strictEqual(sections[7].name, 'General Aptitude');
    });

    it('verifies getOfficialTopicsForSection returns topics for any section query', () => {
      const mathTopics = getOfficialTopicsForSection('Section 1: Engineering Mathematics');
      assert.ok(mathTopics.length >= 6);

      const gaTopics = getOfficialTopicsForSection('Section 8: General Aptitude');
      assert.strictEqual(gaTopics.length, 3);
    });
  });

  // =========================================================================
  // 3. 100% Questions Taxonomy Alignment (questions.json)
  // =========================================================================
  describe('Questions Dataset Taxonomy & Section Validation (questions.json)', () => {
    it('verifies all 1,324 questions belong to the 8 official sections', () => {
      assert.strictEqual(questionsData.length, 1324, 'questions.json must contain 1,324 questions');

      const officialTitles = new Set([
        'Section 1: Engineering Mathematics',
        'Section 2: Farm Machinery',
        'Section 3: Farm Power',
        'Section 4: Soil and Water Conservation Engineering',
        'Section 5: Irrigation and Drainage Engineering',
        'Section 6: Agricultural Process Engineering',
        'Section 7: Dairy and Food Engineering',
        'Section 8: General Aptitude'
      ]);

      const sectionCounts = {};
      officialTitles.forEach(t => sectionCounts[t] = 0);

      questionsData.forEach((q, idx) => {
        assert.ok(
          officialTitles.has(q.section),
          `Question #${idx} (${q.id}) has unmapped or legacy section: "${q.section}"`
        );
        sectionCounts[q.section]++;
      });

      // Verify that every single section has representation
      officialTitles.forEach(secTitle => {
        assert.ok(
          sectionCounts[secTitle] > 0,
          `Section "${secTitle}" has 0 questions in practice pool`
        );
      });

      // Verify General Aptitude specifically has questions
      assert.ok(
        sectionCounts['Section 8: General Aptitude'] >= 50,
        `Section 8: General Aptitude has only ${sectionCounts['Section 8: General Aptitude']} questions (expected >= 50)`
      );
    });

    it('asserts zero questions in questions.json have empty or whitespace question text', () => {
      questionsData.forEach((q, idx) => {
        assert.ok(
          typeof q.question === 'string' && q.question.trim().length > 0,
          `Question #${idx} (${q.id}) has empty or whitespace question text`
        );
      });
    });

    it('asserts all MCQ and MSQ questions in questions.json have valid options dictionary structure', () => {
      let mcqCount = 0;
      let msqCount = 0;

      questionsData.forEach((q, idx) => {
        if (q.type === 'MCQ' || q.type === 'MSQ') {
          if (q.type === 'MCQ') mcqCount++;
          if (q.type === 'MSQ') msqCount++;

          assert.ok(
            q.options && typeof q.options === 'object' && !Array.isArray(q.options),
            `Question #${idx} (${q.id}) missing options object`
          );

          const keys = Object.keys(q.options);
          assert.ok(
            keys.length >= 2,
            `Question #${idx} (${q.id}) must have at least 2 options, found ${keys.length}`
          );
        }
      });

      assert.ok(mcqCount > 0, 'Must have MCQ questions');
    });
  });

  // =========================================================================
  // 4. Mock Papers Completeness & Schema Integrity (mock_papers.json)
  // =========================================================================
  describe('Mock Papers Dataset Completeness (mock_papers.json)', () => {
    it('asserts zero questions across all 20 mock papers have empty question text', () => {
      assert.strictEqual(mockPapersData.length, 20);

      mockPapersData.forEach(paper => {
        paper.questions.forEach((q, qIdx) => {
          assert.ok(
            typeof q.question === 'string' && q.question.trim().length > 0,
            `Paper ${paper.year} Q#${qIdx} (${q.id}) has blank question text`
          );
        });
      });
    });

    it('asserts all MCQ and MSQ questions across mock papers have valid options dictionaries', () => {
      mockPapersData.forEach(paper => {
        paper.questions.forEach((q, qIdx) => {
          if (q.type === 'MCQ' || q.type === 'MSQ') {
            assert.ok(
              q.options && typeof q.options === 'object',
              `Paper ${paper.year} Q#${qIdx} (${q.id}) missing options object`
            );

            const keys = Object.keys(q.options);
            assert.ok(
              keys.length >= 2,
              `Paper ${paper.year} Q#${qIdx} (${q.id}) has fewer than 2 options`
            );
          }
        });
      });
    });
  });

  // =========================================================================
  // 5. Concept Notes Taxonomy & Section Mapping (concepts.json)
  // =========================================================================
  describe('Concept Notes Dataset Taxonomy (concepts.json)', () => {
    it('asserts all concept notes belong strictly to the 8 official sections', () => {
      const officialTitles = new Set([
        'Section 1: Engineering Mathematics',
        'Section 2: Farm Machinery',
        'Section 3: Farm Power',
        'Section 4: Soil and Water Conservation Engineering',
        'Section 5: Irrigation and Drainage Engineering',
        'Section 6: Agricultural Process Engineering',
        'Section 7: Dairy and Food Engineering',
        'Section 8: General Aptitude'
      ]);

      assert.ok(Array.isArray(conceptsData) && conceptsData.length > 0);

      conceptsData.forEach((concept, idx) => {
        assert.ok(
          officialTitles.has(concept.section),
          `Concept #${idx} (${concept.id}) section "${concept.section}" is not an official section title`
        );
        assert.ok(concept.title && concept.title.trim().length > 0, `Concept #${idx} missing title`);
        assert.ok(concept.topic && concept.topic.trim().length > 0, `Concept #${idx} missing topic`);
        assert.ok(concept.content && concept.content.trim().length > 0, `Concept #${idx} missing content`);
      });
    });
  });

  // =========================================================================
  // 6. Supabase Database Schema DDL Parity (scripts/schema.sql)
  // =========================================================================
  describe('Supabase Schema SQL DDL Parity (scripts/schema.sql)', () => {
    it('defines public.students table with all required auth & profile columns', () => {
      assert.ok(schemaSqlContent.includes('create table if not exists public.students'), 'Missing students table definition');
      
      const requiredColumns = [
        'password_hash',
        'has_custom_password',
        'current_year_sem',
        'profile_updates_count',
        'last_update_timestamp',
        'email_verified',
        'admission_no',
        'username',
        'gender',
        'xp_points',
        'break_xp',
        'student_type'
      ];

      requiredColumns.forEach(col => {
        assert.ok(
          schemaSqlContent.includes(col),
          `schema.sql missing definition/alter statement for column: ${col}`
        );
      });

      // Assert dropping of insecure plaintext password column
      assert.ok(
        schemaSqlContent.includes('drop column if exists password_plain'),
        'schema.sql must include drop column if exists password_plain'
      );
    });

    it('defines public.device_sessions table with token and device tracking columns', () => {
      assert.ok(schemaSqlContent.includes('create table if not exists public.device_sessions'), 'Missing device_sessions table');
      assert.ok(schemaSqlContent.includes('device_token'), 'device_sessions must include device_token');
      assert.ok(schemaSqlContent.includes('device_info'), 'device_sessions must include device_info');
      assert.ok(schemaSqlContent.includes('student_id'), 'device_sessions must include student_id');
    });

    it('defines public.test_attempts table with client_attempt_id and evaluation metrics', () => {
      assert.ok(schemaSqlContent.includes('create table if not exists public.test_attempts'), 'Missing test_attempts table');
      
      const attemptColumns = [
        'client_attempt_id',
        'student_id',
        'student_name',
        'admission_no',
        'email',
        'mobile_number',
        'paper_title',
        'paper_year',
        'test_type',
        'score',
        'total_marks',
        'percentage',
        'accuracy_percentage',
        'correct_count',
        'incorrect_count',
        'unattempted_count',
        'total_questions',
        'time_spent_seconds',
        'question_responses',
        'submitted_at'
      ];

      attemptColumns.forEach(col => {
        assert.ok(
          schemaSqlContent.includes(col),
          `test_attempts missing column: ${col}`
        );
      });

      // Assert unique idempotency index on client_attempt_id
      assert.ok(
        schemaSqlContent.includes('idx_test_attempts_client_id'),
        'schema.sql must define idx_test_attempts_client_id index'
      );
    });

    it('defines check constraints for student_type and test_type', () => {
      assert.ok(schemaSqlContent.includes("'hau', 'non_hau', 'visitor', 'external'"), 'Missing student_type check constraint');
      assert.ok(schemaSqlContent.includes("'cbt_mock', 'custom_mock', 'practice_pool', 'pyq', 'section_practice'"), 'Missing test_type check constraint');
    });

    it('enables Row Level Security (RLS) on all public tables', () => {
      assert.ok(schemaSqlContent.includes('alter table public.students enable row level security;'));
      assert.ok(schemaSqlContent.includes('alter table public.device_sessions enable row level security;'));
      assert.ok(schemaSqlContent.includes('alter table public.test_attempts enable row level security;'));
    });
  });

});
