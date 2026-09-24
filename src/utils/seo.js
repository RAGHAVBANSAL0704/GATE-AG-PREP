/**
 * SEO & Meta Tag Management Utility
 * 
 * Centralized route-based metadata, dynamic title updates, meta description
 * synchronization, contextual keyword targeting, canonical link handling,
 * and dynamic Schema.org JSON-LD BreadcrumbList management.
 */

export const BASE_SITE_URL = 'https://gate-ag-prep.vercel.app';
export const DEFAULT_PAGE_TITLE = 'GATE AG Prep Portal | Agricultural Engineering PYQ CBT, 50 Mock Tests & Formula Sheet';
export const DEFAULT_PAGE_DESCRIPTION = 'Comprehensive offline-capable preparation portal for GATE Agricultural Engineering (AG) featuring 1,324+ official PYQs (2007-2026), 50 full-length CBT Mock Tests, Topic-wise Practice Pool, and Formula Sheet.';

export const TAB_SEO_CONFIG = {
  dashboard: {
    title: 'GATE AG Prep Portal | Agricultural Engineering PYQ CBT & Mock Tests',
    description: 'Comprehensive preparation portal for GATE Agricultural Engineering (AG). 1,324+ official PYQs (2007-2026), 50 full-length CBT mock tests, formula sheet, and topic-wise practice.',
    keywords: 'GATE AG, GATE Agricultural Engineering, GATE AG 2027, GATE AG 2026, GATE AG PYQ, Agricultural Engineering mock test, CBT mock test, Farm Power and Machinery, Soil and Water Conservation Engineering, Agricultural Processing, Dairy Engineering, TCS iON CBT practice',
    path: '',
    breadcrumbTitle: 'Home'
  },
  mocktest: {
    title: 'Official CBT Mock Tests (2007-2026 PYQs & 50 Mocks) | GATE AG Prep',
    description: 'Attempt authentic 3-hour GATE AG Computer-Based Tests with official TCS-iON palette, instant scoring, percentile estimator, and detailed solutions.',
    keywords: 'GATE AG CBT mock test, GATE Agricultural Engineering test series, TCS iON CBT exam simulator, GATE AG 2007-2026 PYQ papers, full length mock test, online test series GATE AG',
    path: 'mocktest',
    breadcrumbTitle: 'Official CBT Mock Tests'
  },
  practicehub: {
    title: 'Topic-Wise Practice Pool & Question Bank | GATE AG Prep',
    description: 'Practice 1,324+ official GATE Agricultural Engineering questions filtered by subject, topic, subtopic, difficulty, and question type (MCQ, MSQ, NAT).',
    keywords: 'GATE AG practice questions, agricultural engineering question bank, topic wise questions, Farm Power, Soil and Water, Post Harvest, Dairy engineering, MCQ MSQ NAT practice',
    path: 'practicehub',
    breadcrumbTitle: 'Topic-Wise Practice Pool'
  },
  practice: {
    title: 'Topic-Wise Practice Pool & Question Bank | GATE AG Prep',
    description: 'Practice 1,324+ official GATE Agricultural Engineering questions filtered by subject, topic, subtopic, difficulty, and question type (MCQ, MSQ, NAT).',
    keywords: 'GATE AG practice questions, agricultural engineering question bank, topic wise questions, Farm Power, Soil and Water, Post Harvest, Dairy engineering, MCQ MSQ NAT practice',
    path: 'practice',
    breadcrumbTitle: 'Practice Mode'
  },
  custompractice: {
    title: 'Custom Adaptive Test & Practice Generator | GATE AG Prep',
    description: 'Generate personalized GATE AG practice sets by choosing custom question counts, sections, difficulty levels, and timer constraints.',
    keywords: 'GATE AG custom test generator, adaptive practice test, agricultural engineering sectional test, GATE AG timed quiz, subject wise test generator',
    path: 'custompractice',
    breadcrumbTitle: 'Custom Test Generator'
  },
  customtest: {
    title: 'Custom Adaptive Test & Practice Generator | GATE AG Prep',
    description: 'Generate personalized GATE AG practice sets by choosing custom question counts, sections, difficulty levels, and timer constraints.',
    keywords: 'GATE AG custom test generator, adaptive practice test, agricultural engineering sectional test, GATE AG timed quiz, subject wise test generator',
    path: 'custompractice',
    breadcrumbTitle: 'Custom Test Generator'
  },
  formulas: {
    title: 'Complete Agricultural Engineering Formula Sheet | GATE AG Prep',
    description: 'Comprehensive interactive formula revision sheet covering Farm Power & Machinery, Soil & Water Conservation, Post Harvest, Dairy, and Engineering Mathematics.',
    keywords: 'GATE AG formula sheet, Agricultural Engineering formulas, Farm Power equations, Hydrology formula sheet, Psychrometric equations, Darcy law formula, Bernoulli equation, Stokes law',
    path: 'formulas',
    breadcrumbTitle: 'Formula Revision Sheet'
  },
  revision: {
    title: 'Complete Agricultural Engineering Formula Sheet | GATE AG Prep',
    description: 'Comprehensive interactive formula revision sheet covering Farm Power & Machinery, Soil & Water Conservation, Post Harvest, Dairy, and Engineering Mathematics.',
    keywords: 'GATE AG formula sheet, Agricultural Engineering formulas, Farm Power equations, Hydrology formula sheet, Psychrometric equations, Darcy law formula',
    path: 'formulas',
    breadcrumbTitle: 'Formula Revision Sheet'
  },
  syllabus: {
    title: 'GATE AG Syllabus Tracker & Subject Weightage | GATE AG Prep',
    description: 'Track your preparation against the official GATE Agricultural Engineering syllabus with 181 subtopics and multi-year topic weightage analysis.',
    keywords: 'GATE AG syllabus 2027, Agricultural Engineering syllabus, GATE AG topic weightage, GATE AG chapter wise marks distribution, 181 subtopics syllabus tracker',
    path: 'syllabus',
    breadcrumbTitle: 'Syllabus & Weightage Tracker'
  },
  learninghub: {
    title: 'Concepts & Topic Learning Hub | GATE AG Prep',
    description: 'Revise core agricultural engineering concepts with visual summaries, high-yield topic breakdowns, and universal search.',
    keywords: 'GATE AG study material, agricultural engineering concepts, high yield notes, universal concept search, engineering fundamentals, agri-flowsheets',
    path: 'learninghub',
    breadcrumbTitle: 'Concepts Learning Hub'
  },
  concepts: {
    title: 'Concepts & Topic Learning Hub | GATE AG Prep',
    description: 'Revise core agricultural engineering concepts with visual summaries, high-yield topic breakdowns, and universal search.',
    keywords: 'GATE AG study material, agricultural engineering concepts, high yield notes, universal concept search, engineering fundamentals',
    path: 'learninghub',
    breadcrumbTitle: 'Concepts Learning Hub'
  },
  simulators: {
    title: 'Interactive Engineering Simulators | GATE AG Prep',
    description: 'Interactive simulation lab for Hydrology, Soil Water Balance, Tractor Mechanics, and Psychrometric processes.',
    keywords: 'Agricultural engineering virtual lab, tractor mechanics simulator, Darcy soil hydrology simulator, psychrometric process simulator, hydraulic jump calculator',
    path: 'simulators',
    breadcrumbTitle: 'Engineering Simulators'
  },
  flashcards: {
    title: 'High-Yield Revision Flashcards | GATE AG Prep',
    description: 'Rapid-fire memory retention flashcards for key agricultural engineering constants, definitions, and formulas.',
    keywords: 'GATE AG flashcards, spaced repetition revision, agricultural engineering constants, quick revision flash cards',
    path: 'flashcards',
    breadcrumbTitle: 'Revision Flashcards'
  },
  downloads: {
    title: 'Download Mock Papers & Offline Study Material | GATE AG Prep',
    description: 'Download 50 full-length GATE AG mock test papers in DOCX format, formula cheat sheets, and offline study materials.',
    keywords: 'GATE AG docx papers download, GATE Agricultural engineering pdf download, mock test docx download, free study materials, GATE AG question papers offline',
    path: 'downloads',
    breadcrumbTitle: 'Downloads Hub'
  },
  community: {
    title: 'Aspirants Community Forum & Q&A | GATE AG Prep',
    description: 'Join fellow GATE Agricultural Engineering aspirants to discuss questions, share study strategies, and get mentor verified solutions.',
    keywords: 'GATE AG discussion forum, agricultural engineering aspirants, question doubts, mentor solutions, study community',
    path: 'community',
    breadcrumbTitle: 'Aspirants Community'
  },
  chat: {
    title: 'Aspirants Community Forum & Q&A | GATE AG Prep',
    description: 'Join fellow GATE Agricultural Engineering aspirants to discuss questions, share study strategies, and get mentor verified solutions.',
    keywords: 'GATE AG discussion forum, agricultural engineering aspirants, question doubts, mentor solutions',
    path: 'community',
    breadcrumbTitle: 'Aspirants Community'
  },
  qa: {
    title: 'Aspirants Community Forum & Q&A | GATE AG Prep',
    description: 'Join fellow GATE Agricultural Engineering aspirants to discuss questions, share study strategies, and get mentor verified solutions.',
    keywords: 'GATE AG Q&A, agricultural engineering doubts, question solutions, peer discussion',
    path: 'community',
    breadcrumbTitle: 'Aspirants Community Q&A'
  },
  discussions: {
    title: 'Aspirants Community Forum & Q&A | GATE AG Prep',
    description: 'Join fellow GATE Agricultural Engineering aspirants to discuss questions, share study strategies, and get mentor verified solutions.',
    keywords: 'GATE AG discussion forum, agricultural engineering aspirants, question doubts, mentor solutions',
    path: 'community',
    breadcrumbTitle: 'Aspirants Discussions'
  },
  ai_tutor: {
    title: 'AI Agri-Engineering Tutor & Problem Solver | GATE AG Prep',
    description: 'Instant step-by-step problem solver and AI tutor tailored specifically for GATE Agricultural Engineering syllabus questions.',
    keywords: 'AI tutor agricultural engineering, GATE AG problem solver, instant question solution, AI step by step derivation',
    path: 'ai_tutor',
    breadcrumbTitle: 'AI Agri-Engineering Tutor'
  },
  aisolver: {
    title: 'AI Agri-Engineering Tutor & Problem Solver | GATE AG Prep',
    description: 'Instant step-by-step problem solver and AI tutor tailored specifically for GATE Agricultural Engineering syllabus questions.',
    keywords: 'AI tutor agricultural engineering, GATE AG problem solver, instant question solution',
    path: 'ai_tutor',
    breadcrumbTitle: 'AI Agri-Engineering Tutor'
  },
  aitutor: {
    title: 'AI Agri-Engineering Tutor & Problem Solver | GATE AG Prep',
    description: 'Instant step-by-step problem solver and AI tutor tailored specifically for GATE Agricultural Engineering syllabus questions.',
    keywords: 'AI tutor agricultural engineering, GATE AG problem solver, instant question solution',
    path: 'ai_tutor',
    breadcrumbTitle: 'AI Agri-Engineering Tutor'
  },
  livestats: {
    title: 'Live Community Statistics & Telemetry | GATE AG Prep',
    description: 'Real-time student activity, community question attempts, active learners, and collective preparation milestones.',
    keywords: 'GATE AG live telemetry, real time aspirants online, exam preparation stats, all india test takers live',
    path: 'livestats',
    breadcrumbTitle: 'Live Community Telemetry'
  },
  telemetry: {
    title: 'Live Community Statistics & Telemetry | GATE AG Prep',
    description: 'Real-time student activity, community question attempts, active learners, and collective preparation milestones.',
    keywords: 'GATE AG live telemetry, real time aspirants online, exam preparation stats',
    path: 'livestats',
    breadcrumbTitle: 'Live Community Telemetry'
  },
  liveboard: {
    title: 'Live Community Statistics & Telemetry | GATE AG Prep',
    description: 'Real-time student activity, community question attempts, active learners, and collective preparation milestones.',
    keywords: 'GATE AG live telemetry, real time aspirants online, exam preparation stats',
    path: 'livestats',
    breadcrumbTitle: 'Live Community Telemetry'
  },
  games: {
    title: 'Break Zone & Mini Games | GATE AG Prep',
    description: 'Recharge your mind with engineering-themed mini-games while reinforcing technical intuition.',
    keywords: 'engineering mini games, agricultural break zone, mind recharge games, engineering puzzles',
    path: 'games',
    breadcrumbTitle: 'Break Zone'
  },
  admin: {
    title: 'Admin & Creator HQ | GATE AG Prep',
    description: 'Administrative management hub for question moderation, announcements, and platform telemetry.',
    keywords: 'admin portal, internal portal',
    path: 'admin',
    breadcrumbTitle: 'Admin HQ',
    noindex: true
  },
  creator: {
    title: 'Admin & Creator HQ | GATE AG Prep',
    description: 'Administrative management hub for question moderation, announcements, and platform telemetry.',
    keywords: 'creator portal, internal portal',
    path: 'creator',
    breadcrumbTitle: 'Creator HQ',
    noindex: true
  },
  hq: {
    title: 'Admin & Creator HQ | GATE AG Prep',
    description: 'Administrative management hub for question moderation, announcements, and platform telemetry.',
    keywords: 'hq portal, internal portal',
    path: 'hq',
    breadcrumbTitle: 'HQ',
    noindex: true
  },
  feedback: {
    title: 'Support & Feedback Forum | GATE AG Prep',
    description: 'Send suggestions, report question discrepancies, and get assistance from the platform maintainers.',
    keywords: 'GATE AG feedback, support, report error, suggestions',
    path: 'feedback',
    breadcrumbTitle: 'Support & Feedback'
  },
  support: {
    title: 'Support & Feedback Forum | GATE AG Prep',
    description: 'Send suggestions, report question discrepancies, and get assistance from the platform maintainers.',
    keywords: 'GATE AG feedback, support, contact maintainer',
    path: 'support',
    breadcrumbTitle: 'Support'
  }
};

/**
 * Returns metadata object for a given tab identifier
 * @param {string} tab 
 * @returns {{ tab: string, title: string, description: string, canonicalUrl: string, keywords: string, breadcrumbTitle: string, noindex: boolean }}
 */
export function getPageMetadata(tab) {
  const normalizedTab = String(tab || '').toLowerCase().trim();
  const config = TAB_SEO_CONFIG[normalizedTab] || TAB_SEO_CONFIG.dashboard;
  const pathSegment = config.path !== undefined ? config.path : (config.hash || '');
  const canonicalUrl = pathSegment ? `${BASE_SITE_URL}/${pathSegment}` : `${BASE_SITE_URL}/`;

  return {
    tab: normalizedTab,
    title: config.title,
    description: config.description,
    canonicalUrl,
    keywords: config.keywords || TAB_SEO_CONFIG.dashboard.keywords,
    breadcrumbTitle: config.breadcrumbTitle || config.title.split('|')[0].trim(),
    noindex: Boolean(config.noindex)
  };
}

/**
 * Helper to update or create a meta element in document.head
 */
function setMetaTag(attributeName, attributeValue, content) {
  if (typeof document === 'undefined') return;
  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Dynamically updates document.title, meta description, keywords, robots, canonical link,
 * and Schema.org JSON-LD BreadcrumbList.
 * Safe to execute in browser and SSR/test environments.
 * @param {string} tab 
 */
export function updatePageSEO(tab) {
  if (typeof document === 'undefined') return;

  const meta = getPageMetadata(tab);

  // 1. Update Document Title
  document.title = meta.title;

  // 2. Update Meta Description & Keywords
  setMetaTag('name', 'description', meta.description);
  setMetaTag('name', 'keywords', meta.keywords);

  // 3. Update Robots Directives (protect admin views with noindex)
  const robotsDirective = meta.noindex 
    ? 'noindex, nofollow' 
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  setMetaTag('name', 'robots', robotsDirective);

  // 4. Update Open Graph Meta
  setMetaTag('property', 'og:title', meta.title);
  setMetaTag('property', 'og:description', meta.description);
  setMetaTag('property', 'og:url', meta.canonicalUrl);

  // 5. Update Twitter Card Meta
  setMetaTag('name', 'twitter:title', meta.title);
  setMetaTag('name', 'twitter:description', meta.description);

  // 6. Update Canonical Link
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', meta.canonicalUrl);

  // 7. Dynamic JSON-LD BreadcrumbList update
  try {
    let breadcrumbScript = document.getElementById('seo-breadcrumb-jsonld');
    if (!breadcrumbScript) {
      breadcrumbScript = document.createElement('script');
      breadcrumbScript.setAttribute('id', 'seo-breadcrumb-jsonld');
      breadcrumbScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(breadcrumbScript);
    }

    const breadcrumbData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `${meta.canonicalUrl}#breadcrumb`,
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': `${BASE_SITE_URL}/`
        }
      ]
    };

    if (meta.tab && meta.tab !== 'dashboard' && meta.canonicalUrl !== `${BASE_SITE_URL}/`) {
      breadcrumbData.itemListElement.push({
        '@type': 'ListItem',
        'position': 2,
        'name': meta.breadcrumbTitle,
        'item': meta.canonicalUrl
      });
    }

    breadcrumbScript.textContent = JSON.stringify(breadcrumbData);
  } catch (e) {
    // Non-fatal breadcrumb script error in limited test environments
  }
}
