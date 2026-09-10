import { normalizeSectionTitle } from './syllabusTaxonomy.js';
import { GATE_AG_SYLLABUS } from '../data/syllabus.js';

/**
 * Filter pool questions by global criteria (source, type, marks, year, paper, difficulty, subtopic)
 */
export function filterQuestionsByCriteria(questions, filters = {}) {
  const {
    sourceFilter = 'All',
    selectedType = 'All',
    selectedMarks = 'All',
    selectedYear = 'All',
    selectedPaper = 'All',
    selectedDifficulty = 'All',
    selectedSubtopic = 'All'
  } = filters;

  return questions.filter(q => {
    if (sourceFilter === 'Official GATE PYQs' && q.isCustomUploaded) return false;
    if (sourceFilter === 'Custom Mock Questions' && !q.isCustomUploaded) return false;
    if (selectedType !== 'All' && q.type !== selectedType) return false;
    if (selectedMarks !== 'All' && String(q.marks) !== String(selectedMarks)) return false;
    if (selectedYear !== 'All' && String(q.year) !== String(selectedYear)) return false;
    if (selectedPaper !== 'All' && q.sourceTitle !== selectedPaper && q.paperTitle !== selectedPaper) return false;
    if (selectedDifficulty !== 'All' && q.difficulty !== selectedDifficulty) return false;
    if (selectedSubtopic !== 'All' && q.subtopic !== selectedSubtopic) return false;
    return true;
  });
}

/**
 * Calculate available question counts and topic/subtopic breakdowns for all syllabus sections
 */
export function getSectionHierarchyStats(combinedPool, filters = {}) {
  const filteredPool = filterQuestionsByCriteria(combinedPool, filters);

  return GATE_AG_SYLLABUS.map(sec => {
    const canonTitle = normalizeSectionTitle(sec.title);
    const secQuestions = filteredPool.filter(q => normalizeSectionTitle(q.section) === canonTitle);

    // Group questions by topic and subtopic
    const topicCountMap = {};
    const subtopicCountMap = {};
    secQuestions.forEach(q => {
      const top = q.topic || 'General';
      const sub = q.subtopic || 'General';
      topicCountMap[top] = (topicCountMap[top] || 0) + 1;
      if (!subtopicCountMap[top]) subtopicCountMap[top] = {};
      subtopicCountMap[top][sub] = (subtopicCountMap[top][sub] || 0) + 1;
    });

    // Compile topics list combining official syllabus topics and question topics
    const officialTopicNames = (sec.topics || []).map(t => t.topic_name);
    const allTopicNames = Array.from(new Set([
      ...officialTopicNames,
      ...Object.keys(topicCountMap)
    ])).sort();

    const topicsWithStats = allTopicNames.map(topName => {
      const officialObj = (sec.topics || []).find(t => t.topic_name === topName);
      const subtopicsList = Array.from(new Set([
        ...(officialObj?.subtopics || []),
        ...Object.keys(subtopicCountMap[topName] || {})
      ])).sort();

      return {
        topic_name: topName,
        availableCount: topicCountMap[topName] || 0,
        subtopics: officialObj?.subtopics || [],
        subtopicsWithStats: subtopicsList.map(st => ({
          subtopic_name: st,
          availableCount: subtopicCountMap[topName]?.[st] || 0
        }))
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
 * Builds the practice question pool from multi-section, multi-topic and subtopic selections with custom counts
 */
export function buildPracticeSessionPool({
  combinedPool,
  selectedSections = {},
  selectedTopicsMap = {},
  selectedSubtopicsMap = {},
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

    // Check if specific subtopics are selected for this section
    const subtopicSelection = selectedSubtopicsMap[canonTitle];
    if (subtopicSelection && typeof subtopicSelection === 'object') {
      const hasActiveSubtopicFilter = Object.values(subtopicSelection).some(Boolean);
      if (hasActiveSubtopicFilter) {
        secQuestions = secQuestions.filter(q => {
          const sub = q.subtopic || '';
          return Boolean(subtopicSelection[sub]);
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
