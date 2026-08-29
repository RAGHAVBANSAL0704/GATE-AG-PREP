import officialSyllabus from '../data/official_syllabus.json' with { type: 'json' };

/**
 * Returns array of all 8 official sections.
 */
export function getOfficialSections() {
  return officialSyllabus.map(s => ({
    id: s.section_id,
    number: s.section_number,
    name: s.section_name,
    fullTitle: s.full_title
  }));
}

/**
 * Returns topics belonging strictly to the selected section.
 * @param {string} sectionTitleOrName 
 */
export function getOfficialTopicsForSection(sectionTitleOrName) {
  if (!sectionTitleOrName || sectionTitleOrName === 'ALL' || sectionTitleOrName === 'All Sections') {
    // Return all unique topics across all sections
    const allTopics = [];
    officialSyllabus.forEach(s => {
      s.topics.forEach(t => {
        if (!allTopics.some(item => item.topic_name === t.topic_name)) {
          allTopics.push(t);
        }
      });
    });
    return allTopics;
  }

  const cleanSec = sectionTitleOrName.toLowerCase().trim();

  // 1. Exact match first
  let foundSec = officialSyllabus.find(s => 
    s.section_name.toLowerCase().trim() === cleanSec ||
    s.full_title.toLowerCase().trim() === cleanSec ||
    (s.section_id && s.section_id.toLowerCase().trim() === cleanSec)
  );

  // 2. Loose substring match fallback
  if (!foundSec) {
    foundSec = officialSyllabus.find(s => 
      cleanSec.includes(s.section_name.toLowerCase().trim()) ||
      s.section_name.toLowerCase().trim().includes(cleanSec) ||
      cleanSec.includes(s.full_title.toLowerCase().trim()) ||
      s.full_title.toLowerCase().trim().includes(cleanSec)
    );
  }

  return foundSec ? foundSec.topics : [];
}

/**
 * Returns subtopics belonging strictly to the selected topic under a section.
 * Supports both (sectionTitleOrName, topicName) and single-argument (topicName).
 * @param {string} sectionTitleOrName 
 * @param {string} [topicName] 
 */
export function getOfficialSubtopicsForTopic(sectionTitleOrName, topicName) {
  let sec = sectionTitleOrName;
  let top = topicName;

  // Handle single-argument invocation: getOfficialSubtopicsForTopic(topicName)
  if (top === undefined && sec !== undefined) {
    top = sec;
    sec = 'ALL';
  }

  if (!top || top === 'ALL' || top === 'All Topics') return [];

  const topics = getOfficialTopicsForSection(sec);
  const cleanTop = String(top).toLowerCase().trim();

  // 1. Exact match first (case-insensitive string equality / trim comparison)
  let foundTop = topics.find(t => 
    t.topic_name.toLowerCase().trim() === cleanTop ||
    (t.topic_id && t.topic_id.toLowerCase().trim() === cleanTop)
  );

  // 2. Loose substring matching fallback
  if (!foundTop) {
    foundTop = topics.find(t => 
      cleanTop.includes(t.topic_name.toLowerCase().trim()) ||
      t.topic_name.toLowerCase().trim().includes(cleanTop)
    );
  }

  return foundTop ? foundTop.subtopics : [];
}

/**
 * Maps legacy or unnormalized section names to official Section full title.
 */
export function normalizeSectionTitle(sectionInput) {
  if (!sectionInput) return 'Section 8: General Aptitude';
  const inputLower = String(sectionInput).toLowerCase().trim();

  if (inputLower.includes('aptitude') || inputLower.includes('verbal') || inputLower.includes('spatial') || inputLower.includes('general') || inputLower.includes('reasoning') || inputLower.includes('quantitative')) {
    return 'Section 8: General Aptitude';
  }

  // 1. Exact match first
  for (const sec of officialSyllabus) {
    if (
      inputLower === sec.section_name.toLowerCase().trim() ||
      inputLower === sec.full_title.toLowerCase().trim() ||
      (sec.section_id && inputLower === sec.section_id.toLowerCase().trim())
    ) {
      return sec.full_title;
    }
  }

  // 2. Loose substring match
  for (const sec of officialSyllabus) {
    if (
      inputLower.includes(sec.section_name.toLowerCase().trim()) ||
      sec.section_name.toLowerCase().trim().includes(inputLower)
    ) {
      return sec.full_title;
    }
  }

  // Keyword fallbacks
  if (inputLower.includes('math')) return 'Section 1: Engineering Mathematics';
  if (inputLower.includes('machinery') || inputLower.includes('tillage') || inputLower.includes('implement')) return 'Section 2: Farm Machinery';
  if (inputLower.includes('power') || inputLower.includes('engine') || inputLower.includes('tractor')) return 'Section 3: Farm Power';
  if (inputLower.includes('erosion') || inputLower.includes('survey') || inputLower.includes('hydrology') || inputLower.includes('soil mechanics') || inputLower.includes('fluid')) return 'Section 4: Soil and Water Conservation Engineering';
  if (inputLower.includes('irrigation') || inputLower.includes('drainage') || inputLower.includes('well') || inputLower.includes('pump')) return 'Section 5: Irrigation and Drainage Engineering';
  if (inputLower.includes('process') || inputLower.includes('drying') || inputLower.includes('storage') || inputLower.includes('size reduction')) return 'Section 6: Agricultural Process Engineering';
  if (inputLower.includes('dairy') || inputLower.includes('food') || inputLower.includes('heat') || inputLower.includes('preservation')) return 'Section 7: Dairy and Food Engineering';

  return 'Section 8: General Aptitude';
}

/**
 * Maps legacy topic name to official topic name.
 * Supports both (topicInput, sectionTitle) and (sectionTitle, topicInput).
 * @param {string} arg1 
 * @param {string} [arg2] 
 */
export function normalizeTopicTitle(arg1, arg2) {
  if (!arg1 && !arg2) return 'General Aptitude';

  let topicInput = arg1;
  let sectionTitle = arg2;

  // Determine if arg1 is section title and arg2 is topic input
  if (arg1 && arg2) {
    const cleanArg1 = String(arg1).toLowerCase().trim();
    const isArg1Section = officialSyllabus.some(s => 
      s.section_name.toLowerCase().trim() === cleanArg1 ||
      s.full_title.toLowerCase().trim() === cleanArg1 ||
      (s.section_id && s.section_id.toLowerCase().trim() === cleanArg1) ||
      cleanArg1.startsWith('section ')
    );
    if (isArg1Section) {
      sectionTitle = arg1;
      topicInput = arg2;
    }
  } else if (!arg2 && arg1) {
    topicInput = arg1;
    sectionTitle = 'ALL';
  }

  if (!topicInput) return 'General Aptitude';

  const topicLower = String(topicInput).toLowerCase().trim();
  const secTopics = getOfficialTopicsForSection(sectionTitle);

  // 1. Exact match pass (case-insensitive string equality / trim comparison)
  for (const top of secTopics) {
    if (
      topicLower === top.topic_name.toLowerCase().trim() ||
      (top.topic_id && topicLower === top.topic_id.toLowerCase().trim())
    ) {
      return top.topic_name;
    }
  }

  // 2. Loose substring matching fallback
  for (const top of secTopics) {
    const topNameLower = top.topic_name.toLowerCase().trim();
    if (
      topicLower.includes(topNameLower) ||
      topNameLower.includes(topicLower)
    ) {
      return top.topic_name;
    }
  }

  return secTopics.length > 0 ? secTopics[0].topic_name : String(topicInput).trim();
}
