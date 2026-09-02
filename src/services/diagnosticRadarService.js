/**
 * AI Diagnostic Radar & Weak-Area Auto-Remediation Engine
 * 
 * Computes multi-factor vulnerability scores across official GATE AG syllabus branches,
 * detects weak subtopics, negative mark leaks, and time overheads, and generates
 * instant remediation tests and printable error-correction worksheets.
 */

import { normalizeSectionTitle, getOfficialSections } from '../utils/syllabusTaxonomy.js';
import { GATE_AG_FORMULAS } from '../data/formulas.js';

// Section High-Yield Weightage Weights (0 to 1)
const SECTION_WEIGHTAGE_FACTORS = {
  'Section 1: Engineering Mathematics': 0.85,
  'Section 2: Farm Machinery': 0.90,
  'Section 3: Farm Power': 0.95,
  'Section 4: Soil and Water Conservation Engineering': 0.95,
  'Section 5: Irrigation and Drainage Engineering': 0.85,
  'Section 6: Agricultural Process Engineering': 0.90,
  'Section 7: Dairy and Food Engineering': 0.80,
  'Section 8: General Aptitude': 0.90
};

/**
 * Perform comprehensive multi-factor diagnostic analysis on student attempt history.
 * @param {Array} allQuestions - Combined questions repository
 * @param {Array} testAttempts - Array of student test attempt objects
 * @returns {Object} Diagnostic report with section mastery, weak subtopics, and recommendations
 */
export function analyzeStudentWeakSpots(allQuestions = [], testAttempts = []) {
  const questionMap = new Map();
  allQuestions.forEach(q => {
    if (q.id) questionMap.set(String(q.id), q);
  });

  // Track subtopic level statistics
  const subtopicStats = {};
  const sectionStats = {};

  // Initialize Section Stats from official syllabus
  const officialSecs = getOfficialSections();
  officialSecs.forEach(secObj => {
    const sec = secObj.fullTitle;
    sectionStats[sec] = {
      section: sec,
      totalQuestionsAvailable: 0,
      attempted: 0,
      correct: 0,
      incorrect: 0,
      negativeMarksLost: 0,
      totalMarksGained: 0,
      totalMarksPossible: 0,
      timeSpentSecTotal: 0,
      accuracy: 0,
      masteryTier: 'Unattempted', // 'Stronghold' | 'Moderate' | 'Critical' | 'Unattempted'
      vulnerabilityScore: 0
    };
  });

  // Count available questions per section
  allQuestions.forEach(q => {
    const normSec = normalizeSectionTitle(q.section);
    if (sectionStats[normSec]) {
      sectionStats[normSec].totalQuestionsAvailable += 1;
    }
  });

  let totalQuestionsEvaluated = 0;
  let totalNegativeMarksLostAll = 0;

  // Process attempt history
  (testAttempts || []).forEach(attempt => {
    // Attempt can have answers object { [qId]: answer } or questionStates
    const answers = attempt.answers || attempt.userAnswers || {};
    const questionStates = attempt.questionStates || {};
    const timeSpentMap = attempt.timeSpentPerQuestion || {};

    Object.keys(answers).forEach(qId => {
      const q = questionMap.get(String(qId));
      if (!q) return;

      const normSec = normalizeSectionTitle(q.section);
      const topic = q.topic || 'General Topic';
      const subtopic = q.subtopic || topic;
      const subtopicKey = `${normSec}:::${topic}:::${subtopic}`;

      if (!subtopicStats[subtopicKey]) {
        subtopicStats[subtopicKey] = {
          key: subtopicKey,
          section: normSec,
          topic,
          subtopic,
          attempted: 0,
          correct: 0,
          incorrect: 0,
          negativeMarksLost: 0,
          timeSpentSecTotal: 0,
          failedQuestions: []
        };
      }

      const isCorrect = attempt.correctQuestionIds 
        ? attempt.correctQuestionIds.includes(qId)
        : (attempt.results && attempt.results[qId] ? attempt.results[qId].isCorrect : false);

      const isAttempted = answers[qId] !== undefined && String(answers[qId]).trim() !== '';
      const timeSpent = parseInt(timeSpentMap[qId]) || 60;

      if (isAttempted) {
        totalQuestionsEvaluated += 1;
        subtopicStats[subtopicKey].attempted += 1;
        subtopicStats[subtopicKey].timeSpentSecTotal += timeSpent;

        if (sectionStats[normSec]) {
          sectionStats[normSec].attempted += 1;
          sectionStats[normSec].timeSpentSecTotal += timeSpent;
        }

        if (isCorrect) {
          subtopicStats[subtopicKey].correct += 1;
          if (sectionStats[normSec]) {
            sectionStats[normSec].correct += 1;
            sectionStats[normSec].totalMarksGained += (parseInt(q.marks) || 1);
          }
        } else {
          subtopicStats[subtopicKey].incorrect += 1;
          subtopicStats[subtopicKey].failedQuestions.push(q);

          // Calculate negative deduction
          const qType = (q.type || 'MCQ').toUpperCase();
          const marks = parseInt(q.marks) || 1;
          let neg = 0;
          if (qType === 'MCQ') {
            neg = marks === 2 ? 0.6667 : 0.3333;
          }

          subtopicStats[subtopicKey].negativeMarksLost += neg;
          totalNegativeMarksLostAll += neg;

          if (sectionStats[normSec]) {
            sectionStats[normSec].incorrect += 1;
            sectionStats[normSec].negativeMarksLost += neg;
          }
        }
      }
    });
  });

  // Calculate Multi-Factor Vulnerability Scores for each subtopic
  const rankedSubtopics = Object.values(subtopicStats).map(st => {
    const errorRate = st.attempted > 0 ? (st.incorrect / st.attempted) : 0;
    const accuracy = st.attempted > 0 ? Math.round((st.correct / st.attempted) * 100) : 0;
    const avgTimeSec = st.attempted > 0 ? Math.round(st.timeSpentSecTotal / st.attempted) : 60;
    const timePenalty = Math.min(1.0, Math.max(0, (avgTimeSec - 120) / 120)); // Penalty if avg > 2 mins
    const secWeight = SECTION_WEIGHTAGE_FACTORS[st.section] || 0.8;

    // Weighted Formula: Error (45%) + Negative Penalty (25%) + Time Overhead (15%) + Weightage (15%)
    const rawVulnerability = (errorRate * 45) + 
                             (Math.min(st.negativeMarksLost / 3, 1.0) * 25) + 
                             (timePenalty * 15) + 
                             (secWeight * 15);

    const vulnerabilityScore = Math.round(Math.min(100, Math.max(0, rawVulnerability)));

    let status = 'Moderate';
    if (vulnerabilityScore >= 55 || (st.attempted >= 2 && errorRate >= 0.5)) {
      status = 'Critical';
    } else if (accuracy >= 80 && st.attempted >= 2) {
      status = 'Stronghold';
    }

    return {
      ...st,
      accuracy,
      errorRate,
      avgTimeSec,
      vulnerabilityScore,
      status
    };
  }).sort((a, b) => b.vulnerabilityScore - a.vulnerabilityScore);

  // Update Section Level Mastery Tiers
  Object.values(sectionStats).forEach(sec => {
    if (sec.attempted === 0) {
      sec.masteryTier = 'Unattempted';
      sec.accuracy = 0;
      sec.vulnerabilityScore = 50;
    } else {
      sec.accuracy = Math.round((sec.correct / sec.attempted) * 100);
      const errRate = (sec.incorrect / sec.attempted);
      sec.vulnerabilityScore = Math.round(errRate * 60 + (sec.negativeMarksLost > 2 ? 30 : sec.negativeMarksLost * 10));
      
      if (sec.accuracy >= 75) {
        sec.masteryTier = 'Stronghold';
      } else if (sec.accuracy >= 50) {
        sec.masteryTier = 'Moderate';
      } else {
        sec.masteryTier = 'Critical';
      }
    }
  });

  // Top Critical Vulnerabilities (Top 5 highest score with errors)
  const topCriticalWeakSpots = rankedSubtopics.filter(s => s.incorrect > 0).slice(0, 5);

  // Extract relevant formulas for weak spots
  const relevantFormulas = getFormulasForWeakSubtopics(topCriticalWeakSpots);

  return {
    totalQuestionsEvaluated,
    totalNegativeMarksLostAll: parseFloat(totalNegativeMarksLostAll.toFixed(2)),
    sectionStats,
    rankedSubtopics,
    topCriticalWeakSpots,
    relevantFormulas,
    hasData: totalQuestionsEvaluated > 0
  };
}

/**
 * Filter formulas matching diagnosed weak subtopics
 */
export function getFormulasForWeakSubtopics(weakSubtopics = []) {
  if (!weakSubtopics || weakSubtopics.length === 0) {
    return (GATE_AG_FORMULAS || []).slice(0, 8);
  }

  const matched = [];
  const weakKeywords = weakSubtopics.flatMap(s => [
    s.subtopic.toLowerCase(),
    s.topic.toLowerCase(),
    s.section.toLowerCase().replace(/^section \d+:\s*/, '')
  ]);

  (GATE_AG_FORMULAS || []).forEach(f => {
    const fTitle = (f.title || '').toLowerCase();
    const fTopic = (f.topicName || '').toLowerCase();
    const fCat = (f.category || '').toLowerCase();

    const isMatch = weakKeywords.some(kw => 
      fTitle.includes(kw) || fTopic.includes(kw) || fCat.includes(kw) || kw.includes(fTopic)
    );

    if (isMatch && !matched.some(m => m.title === f.title)) {
      matched.push(f);
    }
  });

  // Fallback to top formulas if specific match count is low
  if (matched.length < 4) {
    (GATE_AG_FORMULAS || []).slice(0, 6).forEach(f => {
      if (!matched.some(m => m.title === f.title)) matched.push(f);
    });
  }

  return matched.slice(0, 10);
}

/**
 * Auto-generate a focused 15-minute Remediation Test targeting diagnosed weak areas.
 * @param {Array} weakSubtopics - Array of diagnosed weak subtopics
 * @param {Array} allQuestions - Pool of all questions
 * @param {number} count - Target question count (default: 12)
 * @returns {Object} Remediation Mock Test Payload ready for CBT test runner
 */
export function generateRemediationTestPayload(weakSubtopics = [], allQuestions = [], count = 12) {
  const weakTopicNames = (weakSubtopics || []).map(s => s.topic.toLowerCase());
  const weakSubtopicNames = (weakSubtopics || []).map(s => s.subtopic.toLowerCase());
  const weakSections = (weakSubtopics || []).map(s => s.section);

  // 1. First priority: Questions from diagnosed failed questions
  const failedPool = (weakSubtopics || []).flatMap(s => s.failedQuestions || []);

  // 2. Second priority: Questions matching weak subtopics and topics from main pool
  const matchingPool = allQuestions.filter(q => {
    const qTop = (q.topic || '').toLowerCase();
    const qSub = (q.subtopic || '').toLowerCase();
    const normSec = normalizeSectionTitle(q.section);

    return weakSubtopicNames.includes(qSub) || 
           weakTopicNames.includes(qTop) || 
           weakSections.includes(normSec);
  });

  const selectedQuestions = [];
  const seenIds = new Set();

  // Add failed questions first
  failedPool.forEach(q => {
    if (!seenIds.has(q.id) && selectedQuestions.length < count) {
      seenIds.add(q.id);
      selectedQuestions.push(q);
    }
  });

  // Fill remaining slots with matching pool questions
  matchingPool.forEach(q => {
    if (!seenIds.has(q.id) && selectedQuestions.length < count) {
      seenIds.add(q.id);
      selectedQuestions.push(q);
    }
  });

  // Fallback to general questions if not enough
  if (selectedQuestions.length < count) {
    allQuestions.forEach(q => {
      if (!seenIds.has(q.id) && selectedQuestions.length < count) {
        seenIds.add(q.id);
        selectedQuestions.push(q);
      }
    });
  }

  const totalMarks = selectedQuestions.reduce((sum, q) => sum + (parseInt(q.marks) || 1), 0);

  return {
    id: `REMEDIATION_${Date.now()}`,
    title: 'AI Targeted Weak-Area Remediation CBT Test',
    subtitle: `Custom Retest covering ${weakSubtopics.length} Diagnosed Weak Subtopics`,
    duration_mins: 15,
    max_marks: totalMarks,
    total_qs: selectedQuestions.length,
    instructions: {
      duration_mins: 15,
      max_marks: totalMarks,
      total_qs: selectedQuestions.length,
      instructions: [
        "1. This 15-minute targeted remediation test directly addresses your diagnosed weak topics.",
        "2. Marks distribution follows official GATE AG marking rules.",
        "3. Focus on avoiding negative marking penalties and verifying mathematical formulas."
      ]
    },
    questions: selectedQuestions
  };
}
