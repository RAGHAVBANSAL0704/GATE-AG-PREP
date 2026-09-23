/**
 * SEO & Meta Tag Management Utility
 * 
 * Provides centralized route-based metadata, dynamic title updates,
 * meta description synchronization, and canonical link handling.
 */

export const BASE_SITE_URL = 'https://gate-ag-prep.vercel.app';
export const DEFAULT_PAGE_TITLE = 'GATE AG Prep Portal | Agricultural Engineering PYQ CBT, 50 Mock Tests & Formula Sheet';
export const DEFAULT_PAGE_DESCRIPTION = 'Comprehensive offline-capable preparation portal for GATE Agricultural Engineering (AG) featuring 1,324+ official PYQs (2007-2026), 50 full-length CBT Mock Tests, Topic-wise Practice Pool, and Formula Sheet.';

export const TAB_SEO_CONFIG = {
  dashboard: {
    title: 'GATE AG Prep Portal | Agricultural Engineering PYQ CBT & Mock Tests',
    description: 'Comprehensive preparation portal for GATE Agricultural Engineering (AG). 1,324+ official PYQs (2007-2026), 50 full-length CBT mock tests, formula sheet, and topic-wise practice.',
    hash: ''
  },
  mocktest: {
    title: 'Official CBT Mock Tests (2007-2026 PYQs & 50 Mocks) | GATE AG Prep',
    description: 'Attempt authentic 3-hour GATE AG Computer-Based Tests with official TCS-iON palette, instant scoring, percentile estimator, and detailed solutions.',
    hash: 'mocktest'
  },
  practicehub: {
    title: 'Topic-Wise Practice Pool & Question Bank | GATE AG Prep',
    description: 'Practice 1,324+ official GATE Agricultural Engineering questions filtered by subject, topic, subtopic, difficulty, and question type (MCQ, MSQ, NAT).',
    hash: 'practicehub'
  },
  practice: {
    title: 'Topic-Wise Practice Pool & Question Bank | GATE AG Prep',
    description: 'Practice 1,324+ official GATE Agricultural Engineering questions filtered by subject, topic, subtopic, difficulty, and question type (MCQ, MSQ, NAT).',
    hash: 'practice'
  },
  custompractice: {
    title: 'Custom Adaptive Test & Practice Generator | GATE AG Prep',
    description: 'Generate personalized GATE AG practice sets by choosing custom question counts, sections, difficulty levels, and timer constraints.',
    hash: 'custompractice'
  },
  customtest: {
    title: 'Custom Adaptive Test & Practice Generator | GATE AG Prep',
    description: 'Generate personalized GATE AG practice sets by choosing custom question counts, sections, difficulty levels, and timer constraints.',
    hash: 'customtest'
  },
  formulas: {
    title: 'Complete Agricultural Engineering Formula Sheet | GATE AG Prep',
    description: 'Comprehensive interactive formula revision sheet covering Farm Power & Machinery, Soil & Water Conservation, Post Harvest, Dairy, and Engineering Mathematics.',
    hash: 'formulas'
  },
  revision: {
    title: 'Complete Agricultural Engineering Formula Sheet | GATE AG Prep',
    description: 'Comprehensive interactive formula revision sheet covering Farm Power & Machinery, Soil & Water Conservation, Post Harvest, Dairy, and Engineering Mathematics.',
    hash: 'formulas'
  },
  syllabus: {
    title: 'GATE AG Syllabus Tracker & Subject Weightage | GATE AG Prep',
    description: 'Track your preparation against the official GATE Agricultural Engineering syllabus with 181 subtopics and multi-year topic weightage analysis.',
    hash: 'syllabus'
  },
  learninghub: {
    title: 'Concepts & Topic Learning Hub | GATE AG Prep',
    description: 'Revise core agricultural engineering concepts with visual summaries, high-yield topic breakdowns, and universal search.',
    hash: 'learninghub'
  },
  concepts: {
    title: 'Concepts & Topic Learning Hub | GATE AG Prep',
    description: 'Revise core agricultural engineering concepts with visual summaries, high-yield topic breakdowns, and universal search.',
    hash: 'concepts'
  },
  simulators: {
    title: 'Interactive Engineering Simulators | GATE AG Prep',
    description: 'Interactive simulation lab for Hydrology, Soil Water Balance, Tractor Mechanics, and Psychrometric processes.',
    hash: 'simulators'
  },
  flashcards: {
    title: 'High-Yield Revision Flashcards | GATE AG Prep',
    description: 'Rapid-fire memory retention flashcards for key agricultural engineering constants, definitions, and formulas.',
    hash: 'flashcards'
  },
  downloads: {
    title: 'Download Mock Papers & Offline Study Material | GATE AG Prep',
    description: 'Download 50 full-length GATE AG mock test papers in DOCX format, formula cheat sheets, and offline study materials.',
    hash: 'downloads'
  },
  community: {
    title: 'Aspirants Community Forum & Q&A | GATE AG Prep',
    description: 'Join fellow GATE Agricultural Engineering aspirants to discuss questions, share study strategies, and get mentor verified solutions.',
    hash: 'community'
  },
  chat: {
    title: 'Aspirants Community Forum & Q&A | GATE AG Prep',
    description: 'Join fellow GATE Agricultural Engineering aspirants to discuss questions, share study strategies, and get mentor verified solutions.',
    hash: 'chat'
  },
  qa: {
    title: 'Aspirants Community Forum & Q&A | GATE AG Prep',
    description: 'Join fellow GATE Agricultural Engineering aspirants to discuss questions, share study strategies, and get mentor verified solutions.',
    hash: 'qa'
  },
  discussions: {
    title: 'Aspirants Community Forum & Q&A | GATE AG Prep',
    description: 'Join fellow GATE Agricultural Engineering aspirants to discuss questions, share study strategies, and get mentor verified solutions.',
    hash: 'discussions'
  },
  ai_tutor: {
    title: 'AI Agri-Engineering Tutor & Problem Solver | GATE AG Prep',
    description: 'Instant step-by-step problem solver and AI tutor tailored specifically for GATE Agricultural Engineering syllabus questions.',
    hash: 'ai_tutor'
  },
  aisolver: {
    title: 'AI Agri-Engineering Tutor & Problem Solver | GATE AG Prep',
    description: 'Instant step-by-step problem solver and AI tutor tailored specifically for GATE Agricultural Engineering syllabus questions.',
    hash: 'aisolver'
  },
  aitutor: {
    title: 'AI Agri-Engineering Tutor & Problem Solver | GATE AG Prep',
    description: 'Instant step-by-step problem solver and AI tutor tailored specifically for GATE Agricultural Engineering syllabus questions.',
    hash: 'aitutor'
  },
  livestats: {
    title: 'Live Community Statistics & Telemetry | GATE AG Prep',
    description: 'Real-time student activity, community question attempts, active learners, and collective preparation milestones.',
    hash: 'livestats'
  },
  telemetry: {
    title: 'Live Community Statistics & Telemetry | GATE AG Prep',
    description: 'Real-time student activity, community question attempts, active learners, and collective preparation milestones.',
    hash: 'telemetry'
  },
  liveboard: {
    title: 'Live Community Statistics & Telemetry | GATE AG Prep',
    description: 'Real-time student activity, community question attempts, active learners, and collective preparation milestones.',
    hash: 'liveboard'
  },
  games: {
    title: 'Break Zone & Mini Games | GATE AG Prep',
    description: 'Recharge your mind with engineering-themed mini-games while reinforcing technical intuition.',
    hash: 'games'
  },
  admin: {
    title: 'Admin & Creator HQ | GATE AG Prep',
    description: 'Administrative management hub for question moderation, announcements, and platform telemetry.',
    hash: 'admin'
  },
  creator: {
    title: 'Admin & Creator HQ | GATE AG Prep',
    description: 'Administrative management hub for question moderation, announcements, and platform telemetry.',
    hash: 'creator'
  },
  hq: {
    title: 'Admin & Creator HQ | GATE AG Prep',
    description: 'Administrative management hub for question moderation, announcements, and platform telemetry.',
    hash: 'hq'
  },
  feedback: {
    title: 'Support & Feedback Forum | GATE AG Prep',
    description: 'Send suggestions, report question discrepancies, and get assistance from the platform maintainers.',
    hash: 'feedback'
  },
  support: {
    title: 'Support & Feedback Forum | GATE AG Prep',
    description: 'Send suggestions, report question discrepancies, and get assistance from the platform maintainers.',
    hash: 'support'
  }
};

/**
 * Returns metadata object for a given tab identifier
 * @param {string} tab 
 * @returns {{ title: string, description: string, canonicalUrl: string }}
 */
export function getPageMetadata(tab) {
  const normalizedTab = String(tab || '').toLowerCase().trim();
  const config = TAB_SEO_CONFIG[normalizedTab] || TAB_SEO_CONFIG.dashboard;
  const canonicalUrl = config.hash ? `${BASE_SITE_URL}/#${config.hash}` : `${BASE_SITE_URL}/`;

  return {
    title: config.title,
    description: config.description,
    canonicalUrl
  };
}

/**
 * Dynamically updates document.title, meta description, and canonical link
 * Safe to execute in browser and SSR/test environments.
 * @param {string} tab 
 */
export function updatePageSEO(tab) {
  if (typeof document === 'undefined') return;

  const meta = getPageMetadata(tab);

  // 1. Update Document Title
  document.title = meta.title;

  // 2. Update Meta Description
  let descMeta = document.querySelector('meta[name="description"]');
  if (!descMeta) {
    descMeta = document.createElement('meta');
    descMeta.setAttribute('name', 'description');
    document.head.appendChild(descMeta);
  }
  descMeta.setAttribute('content', meta.description);

  // 3. Update Open Graph Meta
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', meta.title);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', meta.description);

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', meta.canonicalUrl);

  // 4. Update Twitter Card Meta
  const twTitle = document.querySelector('meta[name="twitter:title"]');
  if (twTitle) twTitle.setAttribute('content', meta.title);

  const twDesc = document.querySelector('meta[name="twitter:description"]');
  if (twDesc) twDesc.setAttribute('content', meta.description);

  // 5. Update Canonical Link
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', meta.canonicalUrl);
}
