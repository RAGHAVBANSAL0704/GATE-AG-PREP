import emQuestions from './section_1_engineering_mathematics.js';
import fmQuestions from './section_2_farm_machinery.js';
import fpQuestions from './section_3_farm_power.js';
import swceQuestions from './section_4_soil_water_conservation.js';
import ideQuestions from './section_5_irrigation_drainage.js';
import apeQuestions from './section_6_agri_process_engineering.js';
import dfeQuestions from './section_7_dairy_food_engineering.js';
import gaQuestions from './section_8_general_aptitude.js';
import { GATE_AG_SYLLABUS } from '../syllabus.js';

// Export individual section datasets for direct modular consumption
export {
  emQuestions,
  fmQuestions,
  fpQuestions,
  swceQuestions,
  ideQuestions,
  apeQuestions,
  dfeQuestions,
  gaQuestions
};

// Map of sections to their respective question sets
export const SECTION_DATASETS = Object.freeze({
  'Section 1: Engineering Mathematics': emQuestions,
  'Section 2: Farm Machinery': fmQuestions,
  'Section 3: Farm Power': fpQuestions,
  'Section 4: Soil and Water Conservation Engineering': swceQuestions,
  'Section 5: Irrigation and Drainage Engineering': ideQuestions,
  'Section 6: Agricultural Process Engineering': apeQuestions,
  'Section 7: Dairy and Food Engineering': dfeQuestions,
  'Section 8: General Aptitude': gaQuestions
});

// Master aggregated collection
export const ALL_QUESTION_BANK_QUESTIONS = Object.freeze([
  ...emQuestions,
  ...fmQuestions,
  ...fpQuestions,
  ...swceQuestions,
  ...ideQuestions,
  ...apeQuestions,
  ...dfeQuestions,
  ...gaQuestions
]);

// Internal O(1) ID lookup index
const questionByIdMap = new Map();
ALL_QUESTION_BANK_QUESTIONS.forEach(q => {
  if (q && q.id) {
    questionByIdMap.set(q.id, q);
  }
});

// Memoization caches for fast interactive querying across thousands of entries
const sectionQueryCache = new Map();
const topicQueryCache = new Map();
const subtopicQueryCache = new Map();

/**
 * Returns complete list of questions for a specified section.
 * Fast O(1) cached lookup after initial resolution.
 */
export function getQuestionsBySection(sectionName) {
  if (!sectionName || sectionName === 'All') return ALL_QUESTION_BANK_QUESTIONS;
  
  const cacheKey = sectionName.toLowerCase().trim();
  if (sectionQueryCache.has(cacheKey)) {
    return sectionQueryCache.get(cacheKey);
  }

  const sLow = cacheKey;
  const filtered = ALL_QUESTION_BANK_QUESTIONS.filter(q => 
    q.section && q.section.toLowerCase().includes(sLow)
  );

  sectionQueryCache.set(cacheKey, filtered);
  return filtered;
}

/**
 * Returns questions for a specific topic within a section.
 * Fast O(1) cached lookup after initial resolution.
 */
export function getQuestionsByTopic(sectionName, topicName) {
  const secQs = getQuestionsBySection(sectionName);
  if (!topicName || topicName === 'All') return secQs;

  const cacheKey = `${(sectionName || 'All').toLowerCase().trim()}:::${topicName.toLowerCase().trim()}`;
  if (topicQueryCache.has(cacheKey)) {
    return topicQueryCache.get(cacheKey);
  }

  const tLow = topicName.toLowerCase().trim();
  const filtered = secQs.filter(q => q.topic && q.topic.toLowerCase().includes(tLow));

  topicQueryCache.set(cacheKey, filtered);
  return filtered;
}

/**
 * Returns questions for a specific subtopic.
 * Fast O(1) cached lookup after initial resolution.
 */
export function getQuestionsBySubtopic(sectionName, topicName, subtopicName) {
  const topQs = getQuestionsByTopic(sectionName, topicName);
  if (!subtopicName || subtopicName === 'All') return topQs;

  const cacheKey = `${(sectionName || 'All').toLowerCase().trim()}:::${(topicName || 'All').toLowerCase().trim()}:::${subtopicName.toLowerCase().trim()}`;
  if (subtopicQueryCache.has(cacheKey)) {
    return subtopicQueryCache.get(cacheKey);
  }

  const subLow = subtopicName.toLowerCase().trim();
  const filtered = topQs.filter(q => q.subtopic && q.subtopic.toLowerCase().includes(subLow));

  subtopicQueryCache.set(cacheKey, filtered);
  return filtered;
}

/**
 * Fast O(1) retrieval of a single question by its unique identifier.
 */
export function getQuestionById(id) {
  if (!id) return null;
  return questionByIdMap.get(id) || null;
}

/**
 * Computes high-level aggregated statistics of the Question Bank.
 * Memoized singleton for zero-overhead repeat invocations in UI components.
 */
let _cachedQuestionBankStats = null;

export function getQuestionBankStats() {
  if (_cachedQuestionBankStats) {
    return _cachedQuestionBankStats;
  }

  const total = ALL_QUESTION_BANK_QUESTIONS.length;
  let mcqCount = 0;
  let msqCount = 0;
  let natCount = 0;
  let oneMarkCount = 0;
  let twoMarkCount = 0;

  const sectionCounts = {};
  const topicCounts = {};

  ALL_QUESTION_BANK_QUESTIONS.forEach(q => {
    if (q.type === 'MCQ') mcqCount++;
    else if (q.type === 'MSQ') msqCount++;
    else if (q.type === 'NAT') natCount++;

    if (q.marks === 1) oneMarkCount++;
    else if (q.marks === 2) twoMarkCount++;

    const sec = q.section || 'Unassigned';
    sectionCounts[sec] = (sectionCounts[sec] || 0) + 1;

    const top = q.topic || 'General';
    topicCounts[top] = (topicCounts[top] || 0) + 1;
  });

  _cachedQuestionBankStats = Object.freeze({
    totalQuestions: total,
    mcqCount,
    msqCount,
    natCount,
    oneMarkCount,
    twoMarkCount,
    sectionCounts,
    topicCounts,
    syllabusSections: GATE_AG_SYLLABUS.map(sec => ({
      id: sec.id,
      title: sec.title,
      code: sec.code,
      icon: sec.icon,
      weightage: sec.weightage,
      topics: (sec.topics || []).map(t => ({
        topic_name: t.topic_name,
        questionCount: topicCounts[t.topic_name] || 0,
        subtopics: t.subtopics || []
      })),
      totalQuestions: sectionCounts[sec.title] || 0
    }))
  });

  return _cachedQuestionBankStats;
}
