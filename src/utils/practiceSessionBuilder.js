import { normalizeSectionTitle } from './syllabusTaxonomy.js';
import { GATE_AG_SYLLABUS } from '../data/syllabus.js';

/**
 * Filter pool questions by global criteria (source, type, marks, year)
 */
export function filterQuestionsByCriteria(questions, filters = {}) {
  const {
    sourceFilter = 'All',
    selectedType = 'All',
    selectedMarks = 'All',
    selectedYear = 'All'
  } = filters;

  return questions.filter(q => {
    if (sourceFilter === 'Official GATE PYQs' && q.isCustomUploaded) return false;
    if (sourceFilter === 'Custom Mock Questions' && !q.isCustomUploaded) return false;
    if (selectedType !== 'All' && q.type !== selectedType) return false;
    if (selectedMarks !== 'All' && String(q.marks) !== String(selectedMarks)) return false;
    if (selectedYear !== 'All' && String(q.year) !== String(selectedYear)) return false;
    return true;
  });
}

/**
 * Calculate available question counts and topic breakdowns for all syllabus sections
 */
export function getSectionHierarchyStats(combinedPool, filters = {}) {
  const filteredPool = filterQuestionsByCriteria(combinedPool, filters);

  return GATE_AG_SYLLABUS.map(sec => {
    const canonTitle = normalizeSectionTitle(sec.title);
    const secQuestions = filteredPool.filter(q => normalizeSectionTitle(q.section) === canonTitle);

    // Group questions by topic
    const topicCountMap = {};
    secQuestions.forEach(q => {
      const top = q.topic || 'General';
      topicCountMap[top] = (topicCountMap[top] || 0) + 1;
    });

    // Compile topics list combining official syllabus topics and question topics
    const officialTopicNames = (sec.topics || []).map(t => t.topic_name);
    const allTopicNames = Array.from(new Set([
      ...officialTopicNames,
      ...Object.keys(topicCountMap)
    ])).sort();

    const topicsWithStats = allTopicNames.map(topName => {
      const officialObj = (sec.topics || []).find(t => t.topic_name === topName);
      return {
        topic_name: topName,
        availableCount: topicCountMap[topName] || 0,
        subtopics: officialObj?.subtopics || []
      };
    });

    return {
      id: sec.id,
      code: sec.code,
      title: sec.title,
      canonTitle,
      weightage: sec.weightage,
      totalAvailable: secQuestions.length,
      topics: topicsWithStats
    };
  });
}

/**
 * Builds the practice question pool from multi-section and multi-topic selections with custom counts
 */
export function buildPracticeSessionPool({
  combinedPool,
  selectedSections = {},
  selectedTopicsMap = {},
  sectionAllocations = {},
  filters = {},
  shuffle = false
}) {
  const eligibleQuestions = filterQuestionsByCriteria(combinedPool, filters);
  const chosenQuestions = [];
  const sectionBreakdown = {};

  GATE_AG_SYLLABUS.forEach(sec => {
    const canonTitle = normalizeSectionTitle(sec.title);
    if (!selectedSections[canonTitle]) return;

    let secQuestions = eligibleQuestions.filter(q => normalizeSectionTitle(q.section) === canonTitle);

    // Check if specific topics are selected for this section
    const topicSelection = selectedTopicsMap[canonTitle];
    if (topicSelection && typeof topicSelection === 'object') {
      const hasActiveTopicFilter = Object.values(topicSelection).some(Boolean);
      if (hasActiveTopicFilter) {
        secQuestions = secQuestions.filter(q => {
          const top = q.topic || 'General';
          return Boolean(topicSelection[top]);
        });
      }
    }

    if (secQuestions.length === 0) return;

    // Handle count allocation
    const alloc = sectionAllocations[canonTitle];
    let takeCount = secQuestions.length;
    if (alloc !== 'ALL' && alloc !== undefined && alloc !== null && !isNaN(Number(alloc))) {
      takeCount = Math.max(1, Math.min(Number(alloc), secQuestions.length));
    }

    let allocatedQuestions = secQuestions;
    if (shuffle) {
      allocatedQuestions = [...secQuestions].sort(() => 0.5 - Math.random());
    }
    const finalSecQs = allocatedQuestions.slice(0, takeCount);

    sectionBreakdown[canonTitle] = finalSecQs.length;
    chosenQuestions.push(...finalSecQs);
  });

  return {
    questions: chosenQuestions,
    totalQuestions: chosenQuestions.length,
    sectionBreakdown
  };
}
