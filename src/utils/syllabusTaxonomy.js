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
  if (!sectionTitleOrName || sectionTitleOrName === 'ALL' || sectionTitleOrName === 'All Sections' || sectionTitleOrName === 'All') {
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

  if (inputLower === 'all' || inputLower === 'all sections') {
    return 'All';
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
  if (inputLower.includes('aptitude') || inputLower.includes('verbal') || inputLower.includes('spatial') || inputLower.includes('general') || inputLower.includes('reasoning') || inputLower.includes('quantitative') || inputLower === 'ga') {
    return 'Section 8: General Aptitude';
  }

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

  // Determine if arg1 or arg2 is section title
  if (arg1 && arg2) {
    const cleanArg1 = String(arg1).toLowerCase().trim();
    const cleanArg2 = String(arg2).toLowerCase().trim();

    const isArg2Section = cleanArg2.startsWith('section ') || officialSyllabus.some(s =>
      s.full_title.toLowerCase().trim() === cleanArg2 ||
      (s.section_id && s.section_id.toLowerCase().trim() === cleanArg2)
    );

    if (isArg2Section) {
      sectionTitle = arg2;
      topicInput = arg1;
    } else {
      const isArg1Section = cleanArg1.startsWith('section ') || officialSyllabus.some(s => 
        s.full_title.toLowerCase().trim() === cleanArg1 ||
        (s.section_id && s.section_id.toLowerCase().trim() === cleanArg1)
      );
      if (isArg1Section) {
        sectionTitle = arg1;
        topicInput = arg2;
      }
    }
  } else if (!arg2 && arg1) {
    topicInput = arg1;
    sectionTitle = 'ALL';
  }

  if (!topicInput) return 'General Aptitude';

  const canonSec = sectionTitle && sectionTitle !== 'ALL' ? normalizeSectionTitle(sectionTitle) : 'ALL';
  const topicLower = String(topicInput).toLowerCase().trim();
  const secTopics = getOfficialTopicsForSection(canonSec);

  // 1. Exact match pass (case-insensitive string equality / trim comparison)
  for (const top of secTopics) {
    if (
      topicLower === top.topic_name.toLowerCase().trim() ||
      (top.topic_id && topicLower === top.topic_id.toLowerCase().trim())
    ) {
      return top.topic_name;
    }
  }

  // 2. Specific domain synonyms & keyword mapping per section
  if (canonSec === 'Section 8: General Aptitude' || canonSec === 'ALL') {
    if (/spatial|pattern|cube|fold|mirror|shape|view|analogy|figure|rotation|diagram|deduction|logic|syllogism|relation|arrangement|inference/i.test(topicLower)) {
      return 'Analytical & Spatial Aptitude';
    }
    if (/grammar|verbal|english|vocabulary|reading|comprehension|passage|sentence|synonym|antonym|word/i.test(topicLower)) {
      return 'Verbal Aptitude';
    }
    if (/quantitative|numerical|math|ratio|percent|algebra|arithmetic|geometry|time|work|interest|permutation|probability/i.test(topicLower)) {
      return 'Quantitative Aptitude';
    }
  }

  if (canonSec === 'Section 1: Engineering Mathematics' || canonSec === 'ALL') {
    if (/matrix|matrices|determinant|eigen|linear equation|linear algebra/i.test(topicLower)) return 'Linear Algebra';
    if (/vector|gradient|divergence|curl|stokes|gauss|green/i.test(topicLower)) return 'Vector Calculus';
    if (/differential equation|ode|pde|laplace/i.test(topicLower)) return 'Differential Equations';
    if (/probability|statistics|mean|median|mode|poisson|normal|binomial|distribution/i.test(topicLower)) return 'Probability and Statistics';
    if (/numerical|trapezoidal|simpson|newton|bisection/i.test(topicLower)) return 'Numerical Methods';
    if (/calculus|integral|derivative|limit|continuity|series|maxima|minima/i.test(topicLower)) return 'Calculus';
  }

  if (canonSec === 'Section 2: Farm Machinery' || canonSec === 'ALL') {
    if (/design|gear|pulley|chain|sprocket|belt|coupling|bearing|shaft|stress|overload|knuckle/i.test(topicLower)) return 'Machine Design';
    if (/machinery|tillage|plough|plow|harrow|planter|seeder|sprayer|harvester|thresher|mower|implement/i.test(topicLower)) return 'Farm Machinery';
  }

  if (canonSec === 'Section 3: Farm Power' || canonSec === 'ALL') {
    if (/source|solar|wind|biomass|biogas|biofuel|bio-fuel|animal power|human power/i.test(topicLower)) return 'Sources of Power';
    if (/tractor|tiller|clutch|brake|transmission|differential|chassis|traction|steering|hitch/i.test(topicLower)) return 'Tractors and Power Tillers';
    if (/engine|fuel|combustion|thermodynamic|power efficiency|torque|heat load|governing/i.test(topicLower)) return 'Farm Power';
  }

  if (canonSec === 'Section 4: Soil and Water Conservation Engineering' || canonSec === 'ALL') {
    if (/fluid|viscosity|hydrostatic|manometer|continuity|bernoulli|reynolds|pipe|orifice|weir|open channel|dimensionless/i.test(topicLower)) return 'Fluid Mechanics';
    if (/soil mechanics|compaction|proctor|shear|mohr|permeability|seepage|void ratio|consolidation|terzaghi|bearing/i.test(topicLower)) return 'Soil Mechanics';
    if (/survey|theodolite|levelling|leveling|contour|chain|bearing|traverse|gps/i.test(topicLower)) return 'Surveying and Levelling';
    if (/erosion|terrace|bund|gully|spillway|waterway|soil loss|usle|rusle|dam/i.test(topicLower)) return 'Soil and Water Erosion';
    if (/watershed|rainwater|harvesting|check dam|farm pond|land capability/i.test(topicLower)) return 'Watershed Management';
    if (/hydrology|hydrograph|precipitation|runoff|flood|infiltration|drought/i.test(topicLower)) return 'Hydrology';
  }

  if (canonSec === 'Section 5: Irrigation and Drainage Engineering' || canonSec === 'ALL') {
    if (/drainage|drain spacing|hooghoudt|glover|leaching|salinity/i.test(topicLower)) return 'Agricultural Drainage';
    if (/groundwater|aquifer|darcy|theis|thiem|confined|unconfined|drawdown/i.test(topicLower)) return 'Groundwater Hydrology';
    if (/well|pump|centrifugal|impeller|cavitation|npsh/i.test(topicLower)) return 'Wells and Pumps';
    if (/soil-water-plant|plant|crop water|consumptive|evapotranspiration|field capacity|wilting/i.test(topicLower)) return 'Soil-Water-Plant Relationship';
    if (/conveyance|channel|pipeline|sprinkler|drip|micro irrigation|scheduling|efficiency/i.test(topicLower)) return 'Irrigation Water Conveyance and Application Methods';
  }

  if (canonSec === 'Section 6: Agricultural Process Engineering' || canonSec === 'ALL') {
    if (/property|physical|thermal|friction|rheolog|sphericity/i.test(topicLower)) return 'Engineering Properties of Agriculture Produce';
    if (/evaporat|dry|dryer|psychrom|thin layer|kinetics|osmotic|freeze/i.test(topicLower)) return 'Evaporation and Drying';
    if (/size reduction|crushing|grinding|bond|rittinger|kick|screen|sieve|cyclone|convey/i.test(topicLower)) return 'Size Reduction and Material Handling';
    if (/storage|silo|bin|godown|atmosphere|packaging/i.test(topicLower)) return 'Storage Systems';
    if (/processing|seed|spice|fruit|vegetable|value addition/i.test(topicLower)) return 'Processing of Agriculture Produce';
  }

  if (canonSec === 'Section 7: Dairy and Food Engineering' || canonSec === 'ALL') {
    if (/unit operation|blanching|homogeniz|pasteuriz|steriliz/i.test(topicLower)) return 'Unit Operations in Dairy and Food Engineering';
    if (/preservation|cooling|freezing|microbial death|plank|refrigeration/i.test(topicLower)) return 'Preservation of Food';
    if (/heat|mass transfer|conduction|convection|radiation|exchanger|isotherm|water activity/i.test(topicLower)) return 'Heat and Mass Transfer';
  }

  // 3. Loose substring matching fallback
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

/**
 * Maps raw or unnormalized subtopic name to an official subtopic string under the official topic.
 * @param {string} rawSubtopic 
 * @param {string} officialTopic 
 * @param {string} officialSection 
 * @param {string} [questionText] 
 */
export function normalizeSubtopicTitle(rawSubtopic, officialTopic, officialSection, questionText = '') {
  const subtopics = getOfficialSubtopicsForTopic(officialSection, officialTopic);
  if (!subtopics || subtopics.length === 0) return rawSubtopic || 'General';
  if (subtopics.length === 1) return subtopics[0];

  const rawClean = String(rawSubtopic || '')
    .toLowerCase()
    .replace(/^[^:]+:\s*/, '') // strip "Section X:" or "Topic X:" prefixes
    .replace(/^[^—–-]+[—–-]\s*/, '') // strip "Verbal Ability — " prefixes
    .trim();

  // 1. Direct case-insensitive equality
  for (const st of subtopics) {
    if (st.toLowerCase() === rawClean) return st;
  }

  // 2. Strict containment
  for (const st of subtopics) {
    const stLower = st.toLowerCase();
    if (stLower.includes(rawClean) || (rawClean.length > 5 && rawClean.includes(stLower))) {
      return st;
    }
  }

  // 3. Keyword / word overlap scoring
  const combinedContext = `${rawClean} ${String(questionText || '').toLowerCase()}`;
  let bestScore = -1;
  let bestSt = subtopics[0];

  for (const st of subtopics) {
    const keywords = st
      .toLowerCase()
      .split(/[\s,–—\-\/]+/)
      .filter(w => w.length > 2 && !['and', 'the', 'for', 'with', 'its', 'used', 'etc', 'their', 'under'].includes(w));

    let score = 0;
    for (const kw of keywords) {
      if (rawClean.includes(kw)) score += 6;
      if (combinedContext.includes(kw)) score += 2;
    }

    if (score > bestScore) {
      bestScore = score;
      bestSt = st;
    }
  }

  return bestSt;
}

/**
 * Authoritative single entry point to classify any question into 100% official GATE AG syllabus taxonomy.
 * @param {Object} question - The question object
 * @returns {{ section: string, topic: string, subtopic: string }}
 */
export function classifyQuestionTaxonomy(question) {
  if (!question) {
    return {
      section: 'Section 8: General Aptitude',
      topic: 'Quantitative Aptitude',
      subtopic: 'Numerical Computation'
    };
  }

  const rawSec = question.section;
  const rawTop = question.topic;
  const rawSub = question.subtopic;
  const qText = `${question.question || ''} ${question.solution || ''} ${rawSub || ''}`;

  const section = normalizeSectionTitle(rawSec);

  // If question is in Section 8: General Aptitude, resolve topic based on aptitude cues
  let topic;
  if (section === 'Section 8: General Aptitude') {
    if (/spatial|pattern|cube|fold|mirror|shape|view|analogy|figure|rotation|diagram|deduction|logic|syllogism|relation|arrangement|inference|seating/i.test(qText) ||
        /spatial|analytical|logic/i.test(rawTop)) {
      topic = 'Analytical & Spatial Aptitude';
    } else if (/grammar|verbal|english|vocabulary|reading|comprehension|passage|sentence|synonym|antonym|word|spelling|preposition|tense|speech/i.test(qText) ||
               /verbal/i.test(rawTop)) {
      topic = 'Verbal Aptitude';
    } else {
      topic = 'Quantitative Aptitude';
    }
  } else {
    topic = normalizeTopicTitle(rawTop, section);
  }

  // Strict invariant: topic must belong to the resolved section
  const validSecTopics = getOfficialTopicsForSection(section).map(t => t.topic_name);
  if (!validSecTopics.includes(topic)) {
    topic = validSecTopics[0];
  }

  const subtopic = normalizeSubtopicTitle(rawSub, topic, section, qText);

  return { section, topic, subtopic };
}
