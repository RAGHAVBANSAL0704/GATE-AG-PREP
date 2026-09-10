import React, { useState, useEffect, useMemo } from 'react';
import { 
  Database, 
  Search, 
  Filter, 
  ChevronRight, 
  ChevronDown, 
  ChevronLeft, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Bookmark, 
  Calculator, 
  RotateCcw, 
  ArrowLeft, 
  BookOpen, 
  Award, 
  Sparkles, 
  Layers, 
  Clock, 
  CheckSquare, 
  Square,
  Wrench,
  Tractor,
  Waves,
  Droplets,
  Factory,
  Utensils,
  Brain,
  Zap,
  AlertTriangle,
  Flag,
  Play,
  Pause,
  Sliders,
  Shuffle,
  Hash,
  X,
  Image as ImageIcon
} from 'lucide-react';
import MathRenderer from './MathRenderer';
import QuestionReportModal from './QuestionReportModal';
import { evaluateQuestion } from '../utils/scoring.js';
import { awardStudentXP } from '../services/leaderboardService.js';
import { 
  ALL_QUESTION_BANK_QUESTIONS, 
  getQuestionBankStats 
} from '../data/question_bank/index.js';
import { GATE_AG_SYLLABUS } from '../data/syllabus.js';
import { normalizeSectionTitle } from '../utils/syllabusTaxonomy.js';

const SECTION_ICON_MAP = {
  'Calculator': Calculator,
  'Wrench': Wrench,
  'Tractor': Tractor,
  'Waves': Waves,
  'Droplets': Droplets,
  'Factory': Factory,
  'Utensils': Utensils,
  'Brain': Brain
};

export const THEME_CONFIG = {
  emerald: {
    badgeBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
    iconBox: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400',
    codeBadge: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    btnPrimary: 'bg-emerald-600 hover:bg-emerald-500 text-white',
    textPrimary: 'text-emerald-600 dark:text-emerald-400',
    hoverTextPrimary: 'hover:text-emerald-600 dark:hover:text-emerald-400',
    borderHover: 'hover:border-emerald-500',
    groupHoverText: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400',
    progressBar: 'bg-emerald-500',
    paletteBtn: 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/50',
    paletteActiveBlock: 'bg-emerald-600 text-white',
    qNumBadge: 'bg-emerald-600 text-white'
  },
  blue: {
    badgeBg: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-300 dark:border-blue-800',
    iconBox: 'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400',
    codeBadge: 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    btnPrimary: 'bg-blue-600 hover:bg-blue-500 text-white',
    textPrimary: 'text-blue-600 dark:text-blue-400',
    hoverTextPrimary: 'hover:text-blue-600 dark:hover:text-blue-400',
    borderHover: 'hover:border-blue-500',
    groupHoverText: 'group-hover:text-blue-600 dark:group-hover:text-blue-400',
    progressBar: 'bg-blue-500',
    paletteBtn: 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/50',
    paletteActiveBlock: 'bg-blue-600 text-white',
    qNumBadge: 'bg-blue-600 text-white'
  },
  purple: {
    badgeBg: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-300 dark:border-purple-800',
    iconBox: 'bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400',
    codeBadge: 'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    btnPrimary: 'bg-purple-600 hover:bg-purple-500 text-white',
    textPrimary: 'text-purple-600 dark:text-purple-400',
    hoverTextPrimary: 'hover:text-purple-600 dark:hover:text-purple-400',
    borderHover: 'hover:border-purple-500',
    groupHoverText: 'group-hover:text-purple-600 dark:group-hover:text-purple-400',
    progressBar: 'bg-purple-500',
    paletteBtn: 'bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/50',
    paletteActiveBlock: 'bg-purple-600 text-white',
    qNumBadge: 'bg-purple-600 text-white'
  }
};

export function computePoolStats(questionsList) {
  const total = questionsList.length;
  let mcqCount = 0;
  let msqCount = 0;
  let natCount = 0;
  let oneMarkCount = 0;
  let twoMarkCount = 0;
  const yearsSet = new Set();
  const papersSet = new Set();
  const sectionCounts = {};
  const topicCounts = {};
  const subtopicCounts = {};
  const sectionTopicSubtopics = {};

  questionsList.forEach(q => {
    if (q.type === 'MCQ') mcqCount++;
    else if (q.type === 'MSQ') msqCount++;
    else if (q.type === 'NAT') natCount++;

    if (q.marks === 1) oneMarkCount++;
    else if (q.marks === 2) twoMarkCount++;

    if (q.year) yearsSet.add(String(q.year));
    if (q.paperTitle) papersSet.add(q.paperTitle);
    else if (q.sourceTitle) papersSet.add(q.sourceTitle);

    const sec = normalizeSectionTitle(q.section);
    sectionCounts[sec] = (sectionCounts[sec] || 0) + 1;

    const top = q.topic || 'General';
    const topKey = `${sec}:::${top}`;
    topicCounts[topKey] = (topicCounts[topKey] || 0) + 1;

    const sub = q.subtopic || 'General';
    const subKey = `${sec}:::${top}:::${sub}`;
    subtopicCounts[subKey] = (subtopicCounts[subKey] || 0) + 1;

    if (!sectionTopicSubtopics[sec]) sectionTopicSubtopics[sec] = {};
    if (!sectionTopicSubtopics[sec][top]) sectionTopicSubtopics[sec][top] = new Set();
    sectionTopicSubtopics[sec][top].add(sub);
  });

  const yearsList = Array.from(yearsSet).sort((a, b) => b.localeCompare(a, undefined, { numeric: true }));
  const papersList = Array.from(papersSet).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const syllabusSections = GATE_AG_SYLLABUS.map(sec => {
    const canonTitle = normalizeSectionTitle(sec.title);
    const questionTopics = sectionTopicSubtopics[canonTitle] || {};
    const officialTopics = (sec.topics || []).map(t => t.topic_name);
    const combinedTopicNames = Array.from(new Set([
      ...officialTopics,
      ...Object.keys(questionTopics)
    ])).filter(tName => {
      const qCount = topicCounts[`${canonTitle}:::${tName}`] || 0;
      return qCount > 0 || officialTopics.includes(tName);
    });

    const topics = combinedTopicNames.map(topName => {
      const topKey = `${canonTitle}:::${topName}`;
      const officialObj = (sec.topics || []).find(t => t.topic_name === topName);
      const subtopicsFound = Array.from(questionTopics[topName] || []);
      const combinedSubtopics = Array.from(new Set([
        ...(officialObj?.subtopics || []),
        ...subtopicsFound
      ])).filter(sName => {
        const subKey = `${canonTitle}:::${topName}:::${sName}`;
        return (subtopicCounts[subKey] || 0) > 0 || (officialObj?.subtopics || []).includes(sName);
      });

      return {
        topic_name: topName,
        questionCount: topicCounts[topKey] || 0,
        subtopics: combinedSubtopics.length > 0 ? combinedSubtopics : ['General']
      };
    });

    return {
      id: sec.id,
      title: sec.title,
      code: sec.code,
      icon: sec.icon,
      weightage: sec.weightage,
      topics,
      totalQuestions: sectionCounts[canonTitle] || 0
    };
  });

  return {
    totalQuestions: total,
    mcqCount,
    msqCount,
    natCount,
    oneMarkCount,
    twoMarkCount,
    yearsList,
    papersList,
    sectionCounts,
    topicCounts,
    subtopicCounts,
    syllabusSections
  };
}

export default function QuestionBankView({
  questionsData = null,
  poolTitle = 'Autonomous Question Bank',
  poolSubtitle = 'Modular repository of high-yield questions categorized across all 8 official GATE AG sections.',
  badgeLabel = 'Topic & Subtopic Wise',
  badgeColor = 'emerald', // 'emerald' | 'blue' | 'purple'
  poolType = 'qbank', // 'qbank' | 'pyq' | 'custom'
  storageKey = 'gate_ag_qbank_progress',
  initialSection = null,
  mistakeFilterIds = null,
  onOpenCalc,
  bookmarks = [],
  onToggleBookmark,
  currentStudent,
  onRequireAuth
}) {
  const theme = THEME_CONFIG[badgeColor] || THEME_CONFIG.emerald;
  const poolQuestions = useMemo(() => questionsData || ALL_QUESTION_BANK_QUESTIONS, [questionsData]);

  // Explorer vs Practice Player mode
  const [activeView, setActiveView] = useState('explorer'); // 'explorer' | 'practice'
  const [expandedSections, setExpandedSections] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Scope for Practice Player
  const [activeScope, setActiveScope] = useState({
    section: 'All',
    topic: 'All',
    subtopic: 'All'
  });

  // Filters within Practice Player
  const [typeFilter, setTypeFilter] = useState('All'); // 'All' | 'MCQ' | 'MSQ' | 'NAT'
  const [marksFilter, setMarksFilter] = useState('All'); // 'All' | '1' | '2'
  const [difficultyFilter, setDifficultyFilter] = useState('All'); // 'All' | 'Easy' | 'Moderate' | 'Hard'
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Unattempted' | 'Correct' | 'Incorrect' | 'Bookmarked'
  const [yearFilter, setYearFilter] = useState('All');
  const [paperFilter, setPaperFilter] = useState('All');

  // Question navigation & interaction state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [showSolutions, setShowSolutions] = useState({});
  const [peekedQuestions, setPeekedQuestions] = useState({});
  const [showPalette, setShowPalette] = useState(false);

  // Per-Question Real-time Timer State { [qId]: elapsedSeconds }
  const [questionTimes, setQuestionTimes] = useState({});
  const [isTimerPaused, setIsTimerPaused] = useState(false);

  // Question Error / Issue Reporting State
  const [reportingQuestion, setReportingQuestion] = useState(null);

  // Multi-Topic Custom Session Builder State
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState({}); // { [sec:::top]: boolean }
  const [questionCountInput, setQuestionCountInput] = useState(25);
  const [shuffleQuestions, setShuffleQuestions] = useState(true);
  const [customTypeFilter, setCustomTypeFilter] = useState('All'); // 'All' | 'MCQ' | 'MSQ' | 'NAT'
  const [customMarksFilter, setCustomMarksFilter] = useState('All'); // 'All' | '1' | '2'
  const [customSessionQuestions, setCustomSessionQuestions] = useState(null);

  // Question Palette Windowing / Pagination (blocks of 50 questions for stutter-free DOM)
  const PALETTE_CHUNK_SIZE = 50;
  const [palettePage, setPalettePage] = useState(0);

  // Persistent user attempt progress for Question Bank / Pool
  const [qbankProgress, setQbankProgress] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(qbankProgress));
    } catch (e) {}
  }, [qbankProgress, storageKey]);

  useEffect(() => {
    if (initialSection) {
      const canon = normalizeSectionTitle(initialSection);
      setExpandedSections(prev => ({ ...prev, [canon]: true }));
    }
  }, [initialSection]);

  const bankStats = useMemo(() => {
    if (questionsData) {
      return computePoolStats(questionsData);
    }
    return getQuestionBankStats();
  }, [questionsData]);

  // Pre-aggregate question counts and solved counts by section, topic, and subtopic
  // Eliminates nested O(S * T * Sub * N) filtering on re-renders
  const aggregatedStats = useMemo(() => {
    const sectionCounts = {};
    const sectionSolved = {};
    const topicCounts = {};
    const subtopicCounts = {};

    for (let i = 0; i < poolQuestions.length; i++) {
      const q = poolQuestions[i];
      const sec = normalizeSectionTitle(q.section);
      const top = q.topic || 'General';
      const sub = q.subtopic || 'General';
      const isSolved = !!qbankProgress[q.id]?.attempted;

      // Section counts
      sectionCounts[sec] = (sectionCounts[sec] || 0) + 1;
      if (isSolved) {
        sectionSolved[sec] = (sectionSolved[sec] || 0) + 1;
      }

      // Topic counts (keyed by section + ':::' + topic)
      const topKey = `${sec}:::${top}`;
      topicCounts[topKey] = (topicCounts[topKey] || 0) + 1;

      // Subtopic counts (keyed by section + ':::' + topic + ':::' + subtopic)
      const subKey = `${sec}:::${top}:::${sub}`;
      subtopicCounts[subKey] = (subtopicCounts[subKey] || 0) + 1;
    }

    return {
      sectionCounts,
      sectionSolved,
      topicCounts,
      subtopicCounts
    };
  }, [poolQuestions, qbankProgress]);

  const bookmarkSet = useMemo(() => new Set(bookmarks || []), [bookmarks]);

  // Live pool of questions matching multi-topic modal configuration
  const customMatchingPool = useMemo(() => {
    const selectedKeys = Object.entries(selectedTopics).filter(([_, v]) => Boolean(v)).map(([k]) => k);
    const hasTopicSelection = selectedKeys.length > 0;

    return poolQuestions.filter(q => {
      if (hasTopicSelection) {
        const secNorm = normalizeSectionTitle(q.section);
        const key = `${secNorm}:::${q.topic}`;
        if (!selectedTopics[key]) return false;
      }
      if (yearFilter !== 'All' && String(q.year) !== String(yearFilter)) return false;
      if (paperFilter !== 'All' && q.paperTitle !== paperFilter && q.sourceTitle !== paperFilter) return false;
      if (customTypeFilter !== 'All' && q.type !== customTypeFilter) return false;
      if (customMarksFilter !== 'All' && String(q.marks) !== customMarksFilter) return false;
      return true;
    });
  }, [poolQuestions, selectedTopics, yearFilter, paperFilter, customTypeFilter, customMarksFilter]);

  // Filter questions for the practice player based on scope and filters
  const activeQuestions = useMemo(() => {
    const sourceList = customSessionQuestions || poolQuestions;
    return sourceList.filter(q => {
      // Mistake filter if provided
      if (mistakeFilterIds && mistakeFilterIds.length > 0 && !mistakeFilterIds.includes(q.id)) {
        return false;
      }

      // Scope filters (only apply when NOT in custom multi-topic session)
      if (!customSessionQuestions) {
        if (activeScope.section !== 'All' && normalizeSectionTitle(q.section) !== normalizeSectionTitle(activeScope.section)) return false;
        if (activeScope.topic !== 'All' && q.topic !== activeScope.topic) return false;
        if (activeScope.subtopic !== 'All' && q.subtopic !== activeScope.subtopic) return false;
      }

      // Year Filter (for PYQs)
      if (yearFilter !== 'All' && String(q.year) !== String(yearFilter)) return false;

      // Paper Filter (for Custom Mocks)
      if (paperFilter !== 'All' && q.paperTitle !== paperFilter && q.sourceTitle !== paperFilter) return false;

      // Metadata filters
      if (typeFilter !== 'All' && q.type !== typeFilter) return false;
      if (marksFilter !== 'All' && String(q.marks) !== marksFilter) return false;
      if (difficultyFilter !== 'All' && q.difficulty !== difficultyFilter) return false;

      // Status filter
      if (statusFilter !== 'All') {
        const prog = qbankProgress[q.id];
        if (statusFilter === 'Unattempted' && prog?.attempted) return false;
        if (statusFilter === 'Correct' && (!prog || !prog.isCorrect)) return false;
        if (statusFilter === 'Incorrect' && (!prog || prog.isCorrect)) return false;
        if (statusFilter === 'Bookmarked' && !bookmarkSet.has(q.id)) return false;
      }

      // Live search query filter (when active)
      if (searchQuery.trim()) {
        const qText = (q.question || '').toLowerCase();
        const topText = (q.topic || '').toLowerCase();
        const subText = (q.subtopic || '').toLowerCase();
        const sTerm = searchQuery.toLowerCase();
        if (!qText.includes(sTerm) && !topText.includes(sTerm) && !subText.includes(sTerm)) {
          return false;
        }
      }

      return true;
    });
  }, [customSessionQuestions, poolQuestions, mistakeFilterIds, activeScope, yearFilter, paperFilter, typeFilter, marksFilter, difficultyFilter, statusFilter, searchQuery, qbankProgress, bookmarkSet]);

  // Sync palette page with current question index so current question is always in active block
  useEffect(() => {
    const targetPage = Math.floor(currentIndex / PALETTE_CHUNK_SIZE);
    setPalettePage(targetPage);
  }, [currentIndex]);

  const totalPalettePages = Math.ceil(activeQuestions.length / PALETTE_CHUNK_SIZE) || 1;
  const safePalettePage = Math.min(palettePage, Math.max(0, totalPalettePages - 1));
  const paletteStartIdx = safePalettePage * PALETTE_CHUNK_SIZE;
  const paletteEndIdx = Math.min(paletteStartIdx + PALETTE_CHUNK_SIZE, activeQuestions.length);
  const visiblePaletteQuestions = useMemo(() => {
    return activeQuestions.slice(paletteStartIdx, paletteEndIdx);
  }, [activeQuestions, paletteStartIdx, paletteEndIdx]);

  // Safeguard current index
  useEffect(() => {
    if (currentIndex >= activeQuestions.length) {
      setCurrentIndex(0);
    }
  }, [activeQuestions.length, currentIndex]);

  const currentQ = activeQuestions[currentIndex];

  // Per-Question Active Cumulative Timer (ticks every second when question is open and timer unpaused)
  useEffect(() => {
    if (activeView !== 'practice' || !currentQ || isTimerPaused) return;

    const timer = setInterval(() => {
      setQuestionTimes(prev => ({
        ...prev,
        [currentQ.id]: (prev[currentQ.id] || 0) + 1
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, [activeView, currentQ?.id, isTimerPaused]);

  const formatTimer = (totalSec = 0) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const toggleSectionExpand = (secTitle) => {
    setExpandedSections(prev => ({
      ...prev,
      [secTitle]: !prev[secTitle]
    }));
  };

  const handleStartPractice = (section = 'All', topic = 'All', subtopic = 'All') => {
    setCustomSessionQuestions(null);
    setActiveScope({ section, topic, subtopic });
    setCurrentIndex(0);
    setActiveView('practice');
    setShowPalette(false);
  };

  const handleToggleTopic = (secTitle, topicName) => {
    const key = `${secTitle}:::${topicName}`;
    setSelectedTopics(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleToggleSectionTopics = (sec) => {
    const secTopicKeys = (sec.topics || []).map(t => `${sec.title}:::${t.topic_name}`);
    const allSelected = secTopicKeys.every(k => selectedTopics[k]);
    
    setSelectedTopics(prev => {
      const next = { ...prev };
      secTopicKeys.forEach(k => {
        next[k] = !allSelected;
      });
      return next;
    });
  };

  const handleSelectAllTopics = () => {
    const next = {};
    bankStats.syllabusSections.forEach(sec => {
      (sec.topics || []).forEach(t => {
        next[`${sec.title}:::${t.topic_name}`] = true;
      });
    });
    setSelectedTopics(next);
  };

  const handleClearAllTopics = () => {
    setSelectedTopics({});
  };

  const handleLaunchCustomSession = () => {
    let pool = [...customMatchingPool];
    if (pool.length === 0) return;

    if (shuffleQuestions) {
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
    }

    const count = Math.min(Math.max(1, parseInt(questionCountInput, 10) || 25), pool.length);
    const selected = pool.slice(0, count);

    const selectedCount = Object.values(selectedTopics).filter(Boolean).length;
    setCustomSessionQuestions(selected);
    setActiveScope({
      section: 'Custom Multi-Topic Session',
      topic: selectedCount > 0 ? `${selectedCount} Topics Selected` : 'All Topics',
      subtopic: `${selected.length} Questions (${shuffleQuestions ? 'Randomized' : 'Sequential'})`
    });
    setCurrentIndex(0);
    setActiveView('practice');
    setShowCustomModal(false);
    setShowPalette(false);
  };

  const handleSelectOption = (optKey) => {
    if (!currentQ) return;
    if (currentQ.type === 'MCQ') {
      setUserAnswers(prev => ({ ...prev, [currentQ.id]: optKey }));
    } else if (currentQ.type === 'MSQ') {
      const existing = Array.isArray(userAnswers[currentQ.id]) ? [...userAnswers[currentQ.id]] : [];
      const updated = existing.includes(optKey) 
        ? existing.filter(k => k !== optKey) 
        : [...existing, optKey].sort();
      setUserAnswers(prev => ({ ...prev, [currentQ.id]: updated }));
    }
  };

  const handleNatInput = (val) => {
    if (!currentQ) return;
    setUserAnswers(prev => ({ ...prev, [currentQ.id]: val }));
  };

  const handleCheckAnswer = () => {
    if (!currentQ) return;
    const ans = userAnswers[currentQ.id];
    const evalResult = evaluateQuestion({ 
      question: currentQ, 
      userAnswer: ans, 
      state: 'ANSWERED' 
    });

    setCheckedQuestions(prev => ({ ...prev, [currentQ.id]: true }));
    setShowSolutions(prev => ({ ...prev, [currentQ.id]: true }));

    // Award Academic XP (with strict Solution-Peek Zero-XP penalty)
    const wasPeeked = Boolean(peekedQuestions[currentQ.id] || qbankProgress[currentQ.id]?.peeked);
    const prevXpAwarded = Number(qbankProgress[currentQ.id]?.xpAwarded || 0);

    let newXpAwarded = prevXpAwarded;
    let deltaXp = 0;

    if (wasPeeked) {
      newXpAwarded = 0;
    } else if (evalResult.isCorrect) {
      deltaXp = Math.max(0, 1.0 - prevXpAwarded);
      newXpAwarded = 1.0;
      if (deltaXp > 0) {
        awardStudentXP(deltaXp);
      }
    } else {
      if (prevXpAwarded === 0) {
        deltaXp = 0.5;
        newXpAwarded = 0.5;
        awardStudentXP(0.5);
      }
    }

    // Record persistent progress
    setQbankProgress(prev => ({
      ...prev,
      [currentQ.id]: {
        attempted: true,
        isCorrect: evalResult.isCorrect,
        marksAwarded: evalResult.marksAwarded,
        peeked: wasPeeked,
        xpAwarded: newXpAwarded,
        lastAttemptedAt: new Date().toISOString()
      }
    }));
  };

  const handleResetCurrent = () => {
    if (!currentQ) return;
    setUserAnswers(prev => {
      const copy = { ...prev };
      delete copy[currentQ.id];
      return copy;
    });
    setCheckedQuestions(prev => {
      const copy = { ...prev };
      delete copy[currentQ.id];
      return copy;
    });
    setShowSolutions(prev => {
      const copy = { ...prev };
      delete copy[currentQ.id];
      return copy;
    });
  };

  // Calculate student mastery statistics across question bank
  const userProgressStats = useMemo(() => {
    const totalBank = ALL_QUESTION_BANK_QUESTIONS.length;
    let attempted = 0;
    let correct = 0;
    let totalXpEarned = 0;

    Object.values(qbankProgress).forEach(p => {
      if (p.attempted) attempted++;
      if (p.isCorrect) correct++;
      if (p.xpAwarded) totalXpEarned += Number(p.xpAwarded);
    });

    return {
      totalBank,
      attempted,
      correct,
      totalXpEarned: Number(totalXpEarned.toFixed(1)),
      accuracy: attempted > 0 ? Math.round((correct / attempted) * 100) : 0,
      pctComplete: Math.round((attempted / totalBank) * 100)
    };
  }, [qbankProgress]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Sleek Top Banner & View Switcher */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl ${theme.iconBox} flex items-center justify-center shrink-0 shadow-xs`}>
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  {poolTitle}
                </h1>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${theme.badgeBg}`}>
                  {badgeLabel}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {poolSubtitle}
              </p>
            </div>
          </div>

          {/* Quick Mastery Counters */}
          <div className="flex items-center gap-2 sm:gap-3 bg-slate-50 dark:bg-slate-950 p-2 rounded-2xl border border-slate-200 dark:border-slate-800">
            <div className="px-3 py-1.5 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400">Total Qs</span>
              <p className="text-sm font-black text-slate-900 dark:text-white">{userProgressStats.totalBank}</p>
            </div>
            <div className="w-px h-8 bg-slate-200 dark:bg-slate-800" />
            <div className="px-3 py-1.5 text-center">
              <span className={`text-[10px] uppercase font-bold ${theme.textPrimary}`}>Solved</span>
              <p className={`text-sm font-black ${theme.textPrimary}`}>{userProgressStats.attempted}</p>
            </div>
            <div className="w-px h-8 bg-slate-200 dark:bg-slate-800" />
            <div className="px-3 py-1.5 text-center">
              <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400">Accuracy</span>
              <p className="text-sm font-black text-blue-600 dark:text-blue-400">{userProgressStats.accuracy}%</p>
            </div>
            <div className="w-px h-8 bg-slate-200 dark:bg-slate-800" />
            <div className="px-3 py-1.5 text-center">
              <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400">XP Earned</span>
              <p className="text-sm font-black text-amber-600 dark:text-amber-400 font-mono">+{userProgressStats.totalXpEarned}</p>
            </div>
          </div>
        </div>

        {/* View Switcher Tabs if in practice mode */}
        {activeView === 'practice' && (
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={() => {
                setActiveView('explorer');
                setCustomSessionQuestions(null);
              }}
              className={`inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 ${theme.hoverTextPrimary} transition`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Explorer</span>
            </button>

            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 truncate max-w-md">
              <span className={`${theme.textPrimary} font-bold`}>{activeScope.section}</span>
              {activeScope.topic !== 'All' && <span> • {activeScope.topic}</span>}
              {activeScope.subtopic !== 'All' && <span> • {activeScope.subtopic}</span>}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* VIEW A: SECTION & TOPIC HIERARCHY EXPLORER                                */}
      {/* ========================================================================= */}
      {activeView === 'explorer' && (
        <div className="space-y-6">
          {/* Search & Global Action Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={`Search ${poolTitle} by keyword, topic, or formula...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <button
              onClick={() => setShowCustomModal(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-2xl shadow-xs transition shrink-0"
              title="Select multiple topics and set custom question count"
            >
              <Sliders className="w-4 h-4" />
              <span>Multi-Topic Custom Practice</span>
            </button>

            <button
              onClick={() => handleStartPractice('All', 'All', 'All')}
              className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 ${theme.btnPrimary} font-bold text-xs rounded-2xl shadow-xs transition shrink-0`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Practice All ({bankStats.totalQuestions})</span>
            </button>
          </div>

          {/* 8 Syllabus Section Accordions */}
          <div className="grid grid-cols-1 gap-4">
            {bankStats.syllabusSections.map((sec) => {
              const IconComponent = SECTION_ICON_MAP[sec.icon] || BookOpen;
              const isExpanded = !!expandedSections[sec.title];
              const secCount = aggregatedStats.sectionCounts[sec.title] || 0;
              const secSolved = aggregatedStats.sectionSolved[sec.title] || 0;
              const secPct = secCount > 0 ? Math.round((secSolved / secCount) * 100) : 0;

              return (
                <div
                  key={sec.id}
                  className={`bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs transition ${theme.borderHover}`}
                >
                  {/* Section Summary Header */}
                  <div
                    onClick={() => toggleSectionExpand(sec.title)}
                    className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-850 transition"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-10 h-10 rounded-xl ${theme.iconBox} flex items-center justify-center shrink-0`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${theme.codeBadge}`}>
                            {sec.code}
                          </span>
                          <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                            {sec.title}
                          </h3>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          Official Weightage: <strong className="text-slate-700 dark:text-slate-300">{sec.weightage}</strong> • {sec.topics.length} Topics • {secCount} Questions
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 justify-between sm:justify-end">
                      {/* Progress meter */}
                      <div className="flex items-center gap-2 text-right">
                        <div>
                          <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                            {secSolved}/{secCount} Solved
                          </p>
                          <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mt-1">
                            <div 
                              className={`h-full ${theme.progressBar} rounded-full transition-all duration-300`}
                              style={{ width: `${secPct}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartPractice(sec.title, 'All', 'All');
                        }}
                        className={`px-3 py-1.5 ${theme.btnPrimary} rounded-xl text-xs font-bold transition shadow-xs`}
                      >
                        Practice Section
                      </button>

                      <div className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                        {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                      </div>
                    </div>
                  </div>

                  {/* Collapsible Topics & Subtopics List */}
                  {isExpanded && (
                    <div className="p-5 border-t border-slate-100 dark:border-slate-800 space-y-4 bg-white dark:bg-slate-900">
                      {sec.topics.map((top, idx) => {
                        const topKey = `${sec.title}:::${top.topic_name}`;
                        const topCount = aggregatedStats.topicCounts[topKey] || 0;
                        return (
                          <div
                            key={idx}
                            className="bg-slate-50 dark:bg-slate-950/60 rounded-2xl border border-slate-200 dark:border-slate-800 p-4"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800/80">
                              <div className="flex items-center gap-2">
                                <BookOpen className={`w-4 h-4 ${theme.textPrimary} shrink-0`} />
                                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                                  {top.topic_name}
                                </h4>
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                  {topCount} Qs
                                </span>
                              </div>

                              <button
                                onClick={() => handleStartPractice(sec.title, top.topic_name, 'All')}
                                className={`inline-flex items-center gap-1.5 text-xs font-bold ${theme.textPrimary} hover:underline`}
                              >
                                <span>Practice Topic</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Subtopics pill list */}
                            <div className="mt-3 flex flex-wrap gap-2">
                              {top.subtopics.map((sub, sIdx) => {
                                const subKey = `${sec.title}:::${top.topic_name}:::${sub}`;
                                const subCount = aggregatedStats.subtopicCounts[subKey] || 0;
                                return (
                                  <button
                                    key={sIdx}
                                    onClick={() => handleStartPractice(sec.title, top.topic_name, sub)}
                                    className={`group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[11px] font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 ${theme.borderHover} text-slate-700 dark:text-slate-300 transition`}
                                  >
                                    <span className={`${theme.groupHoverText} transition`}>
                                      {sub}
                                    </span>
                                    <span className="px-1.5 py-0.2 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-500 font-bold">
                                      {subCount}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW B: INDEPENDENT QUESTION PRACTICE PLAYER                             */}
      {/* ========================================================================= */}
      {activeView === 'practice' && (
        <div className="space-y-5">
          
          {/* Filter & Jump Toolbar */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase mr-1">Filters:</span>

              {/* Type Filter */}
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none"
              >
                <option value="All">Type: All</option>
                <option value="MCQ">MCQ</option>
                <option value="MSQ">MSQ</option>
                <option value="NAT">NAT</option>
              </select>

              {/* Marks Filter */}
              <select
                value={marksFilter}
                onChange={(e) => setMarksFilter(e.target.value)}
                className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none"
              >
                <option value="All">Marks: All</option>
                <option value="1">1 Mark</option>
                <option value="2">2 Marks</option>
              </select>

              {/* Difficulty Filter */}
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none"
              >
                <option value="All">Difficulty: All</option>
                <option value="Easy">Easy</option>
                <option value="Moderate">Moderate</option>
                <option value="Hard">Hard</option>
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none"
              >
                <option value="All">Status: All</option>
                <option value="Unattempted">Unattempted</option>
                <option value="Correct">Correct</option>
                <option value="Incorrect">Incorrect</option>
                <option value="Bookmarked">Bookmarked</option>
              </select>

              {/* Year Filter (for PYQs or when years are present) */}
              {bankStats.yearsList && bankStats.yearsList.length > 0 && (
                <select
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none"
                >
                  <option value="All">Year: All</option>
                  {bankStats.yearsList.map(yr => (
                    <option key={yr} value={yr}>GATE {yr}</option>
                  ))}
                </select>
              )}

              {/* Paper Filter (for Custom Mocks or when papers are present) */}
              {bankStats.papersList && bankStats.papersList.length > 0 && (
                <select
                  value={paperFilter}
                  onChange={(e) => setPaperFilter(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none max-w-[140px]"
                >
                  <option value="All">Paper: All</option>
                  {bankStats.papersList.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Virtual Calc Button */}
              {onOpenCalc && (
                <button
                  onClick={onOpenCalc}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Calculator</span>
                </button>
              )}

              {/* Palette Toggle */}
              <button
                onClick={() => {
                  setShowPalette(prev => {
                    const next = !prev;
                    if (next) {
                      setPalettePage(Math.floor(currentIndex / PALETTE_CHUNK_SIZE));
                    }
                    return next;
                  });
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold ${theme.paletteBtn} transition`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Question Palette ({activeQuestions.length})</span>
              </button>
            </div>
          </div>

          {/* Collapsible Windowed / Paginated Palette Grid */}
          {showPalette && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Jump to Question</span>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {activeQuestions.length} Total
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-semibold text-slate-500">
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"/> Correct</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"/> Incorrect</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 inline-block"/> Unattempted</span>
                </div>
              </div>

              {/* Block pagination controls if more than 50 questions */}
              {totalPalettePages > 1 && (
                <div className="flex flex-wrap items-center justify-between gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-semibold text-[11px]">
                    <span>Showing</span>
                    <strong className="text-slate-900 dark:text-white font-mono">{paletteStartIdx + 1}–{paletteEndIdx}</strong>
                    <span>of</span>
                    <strong className="text-slate-900 dark:text-white font-mono">{activeQuestions.length}</strong>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setPalettePage(p => Math.max(0, p - 1))}
                      disabled={safePalettePage === 0}
                      className="p-1 rounded-lg border border-slate-200 dark:border-slate-800 disabled:opacity-30 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition"
                      title="Previous Block"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-1 overflow-x-auto max-w-[280px] sm:max-w-md py-0.5 scrollbar-thin">
                      {Array.from({ length: totalPalettePages }, (_, pIdx) => {
                        const blockStart = pIdx * PALETTE_CHUNK_SIZE + 1;
                        const blockEnd = Math.min((pIdx + 1) * PALETTE_CHUNK_SIZE, activeQuestions.length);
                        const isCurrentBlock = pIdx === safePalettePage;
                        return (
                          <button
                            key={pIdx}
                            onClick={() => setPalettePage(pIdx)}
                            className={`px-2 py-0.5 rounded-lg text-[10px] font-bold shrink-0 transition ${
                              isCurrentBlock
                                ? `${theme.paletteActiveBlock} shadow-xs`
                                : `bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 ${theme.borderHover}`
                            }`}
                          >
                            {blockStart}–{blockEnd}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => setPalettePage(p => Math.min(totalPalettePages - 1, p + 1))}
                      disabled={safePalettePage >= totalPalettePages - 1}
                      className="p-1 rounded-lg border border-slate-200 dark:border-slate-800 disabled:opacity-30 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition"
                      title="Next Block"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-5 sm:grid-cols-10 md:grid-cols-12 gap-2 max-h-48 overflow-y-auto p-1">
                {visiblePaletteQuestions.map((q, localIdx) => {
                  const globalIdx = paletteStartIdx + localIdx;
                  const prog = qbankProgress[q.id];
                  let btnColor = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200';
                  if (prog?.attempted) {
                    btnColor = prog.isCorrect ? 'bg-emerald-500 text-white font-bold' : 'bg-rose-500 text-white font-bold';
                  }
                  if (globalIdx === currentIndex) {
                    btnColor += ` ring-2 ring-offset-2 dark:ring-offset-slate-900 ${badgeColor === 'blue' ? 'ring-blue-500' : badgeColor === 'purple' ? 'ring-purple-500' : 'ring-emerald-500'}`;
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        setCurrentIndex(globalIdx);
                        setShowPalette(false);
                      }}
                      className={`h-8 rounded-lg text-xs font-bold transition flex items-center justify-center ${btnColor}`}
                    >
                      {globalIdx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Current Question Player Canvas */}
          {currentQ ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
              
              {/* Question Metadata Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-xl ${theme.qNumBadge} font-black text-xs flex items-center justify-center shadow-xs`}>
                    {currentIndex + 1}
                  </span>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      Question {currentIndex + 1} of {activeQuestions.length}
                    </span>
                    <p className="text-[11px] text-slate-400">{currentQ.id} • {currentQ.topic}</p>
                  </div>

                  {/* Real-time Per-Question Cumulative Timer */}
                  <div className="flex items-center gap-1.5 ml-2 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs font-bold border border-slate-200/80 dark:border-slate-700/80">
                    <Clock className={`w-3.5 h-3.5 ${isTimerPaused ? 'text-amber-500' : 'text-emerald-500 animate-pulse'}`} />
                    <span>{formatTimer(questionTimes[currentQ.id] || 0)}</span>
                    <button
                      type="button"
                      onClick={() => setIsTimerPaused(prev => !prev)}
                      className="p-0.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition ml-0.5"
                      title={isTimerPaused ? "Resume Question Timer" : "Pause Question Timer"}
                    >
                      {isTimerPaused ? <Play className="w-3 h-3 text-emerald-500 fill-emerald-500" /> : <Pause className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {currentQ.type}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    +{currentQ.marks} Marks
                  </span>
                  {currentQ.difficulty && (
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                      {currentQ.difficulty}
                    </span>
                  )}
                  {currentQ.year && (
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800">
                      GATE {currentQ.year}
                    </span>
                  )}
                  {currentQ.paperTitle && (
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 truncate max-w-[140px] sm:max-w-[180px]" title={currentQ.paperTitle}>
                      {currentQ.paperTitle}
                    </span>
                  )}
                  {currentQ.source && (
                    <span 
                      className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/80 flex items-center gap-1" 
                      title={`Textbook Source: ${currentQ.source}`}
                    >
                      <BookOpen className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                      <span className="truncate max-w-[140px] sm:max-w-[200px]">{currentQ.source}</span>
                    </span>
                  )}

                  {/* Report Question Button */}
                  <button
                    type="button"
                    onClick={() => setReportingQuestion(currentQ)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition flex items-center gap-1 text-xs font-semibold"
                    title="Report question error or typo"
                  >
                    <Flag className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Report</span>
                  </button>

                  {/* Calculator trigger */}
                  {onOpenCalc && (
                    <button
                      type="button"
                      onClick={onOpenCalc}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                      title="Open Scientific Calculator"
                    >
                      <Calculator className="w-4 h-4" />
                    </button>
                  )}

                  {onToggleBookmark && (
                    <button
                      type="button"
                      onClick={() => onToggleBookmark(currentQ.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 transition"
                      title="Bookmark Question"
                    >
                      <Bookmark className={`w-4 h-4 ${bookmarks.includes(currentQ.id) ? 'fill-amber-500 text-amber-500' : ''}`} />
                    </button>
                  )}
                </div>
              </div>

              {/* Question Statement */}
              <div className="text-sm sm:text-base text-slate-900 dark:text-white leading-relaxed">
                <MathRenderer text={currentQ.question} />
              </div>

              {/* Question Image / Diagram if present */}
              {(currentQ.image_url || currentQ.image) && (
                <div className="my-4 p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl inline-block max-w-full text-center">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 mb-2 flex items-center justify-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Question Figure / Diagram</span>
                  </div>
                  <img 
                    src={currentQ.image_url || currentQ.image} 
                    alt={`Diagram for ${currentQ.id || currentQ.qnum || ''}`} 
                    className="max-h-80 max-w-full mx-auto object-contain rounded-lg bg-white shadow-xs border border-slate-100 dark:border-slate-800"
                  />
                </div>
              )}

              {/* Interaction Elements by Type */}
              <div className="pt-2">
                {/* MCQ Options */}
                {currentQ.type === 'MCQ' && currentQ.options && (
                  <div className="grid grid-cols-1 gap-3">
                    {Object.entries(currentQ.options).map(([optKey, optVal]) => {
                      const isSelected = userAnswers[currentQ.id] === optKey;
                      const isChecked = checkedQuestions[currentQ.id];
                      const isCorrect = currentQ.correct_answer === optKey;

                      let borderClass = 'border-slate-200 dark:border-slate-800 hover:border-emerald-500';
                      let bgClass = 'bg-slate-50/50 dark:bg-slate-950/50';

                      if (isSelected) {
                        borderClass = 'border-emerald-500 ring-2 ring-emerald-500/20';
                        bgClass = 'bg-emerald-50/50 dark:bg-emerald-950/30';
                      }
                      if (isChecked) {
                        if (isCorrect) {
                          borderClass = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100';
                        } else if (isSelected && !isCorrect) {
                          borderClass = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100';
                        }
                      }

                      return (
                        <div
                          key={optKey}
                          onClick={() => !isChecked && handleSelectOption(optKey)}
                          className={`p-4 rounded-2xl border text-sm flex items-start gap-3.5 transition cursor-pointer ${borderClass} ${bgClass}`}
                        >
                          <div className={`w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                          }`}>
                            {optKey}
                          </div>
                          <div className="flex-1 text-slate-800 dark:text-slate-200 leading-normal">
                            <MathRenderer text={optVal} />
                          </div>
                          {isChecked && isCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          )}
                          {isChecked && isSelected && !isCorrect && (
                            <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* MSQ Options */}
                {currentQ.type === 'MSQ' && currentQ.options && (
                  <div className="grid grid-cols-1 gap-3">
                    <p className="text-xs font-semibold text-slate-400 mb-1">Select one or more correct options:</p>
                    {Object.entries(currentQ.options).map(([optKey, optVal]) => {
                      const selList = Array.isArray(userAnswers[currentQ.id]) ? userAnswers[currentQ.id] : [];
                      const isSelected = selList.includes(optKey);
                      const isChecked = checkedQuestions[currentQ.id];
                      const correctList = Array.isArray(currentQ.correct_answer) ? currentQ.correct_answer : [currentQ.correct_answer];
                      const isCorrect = correctList.includes(optKey);

                      return (
                        <div
                          key={optKey}
                          onClick={() => !isChecked && handleSelectOption(optKey)}
                          className={`p-4 rounded-2xl border text-sm flex items-start gap-3.5 transition cursor-pointer ${
                            isSelected
                              ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 ring-2 ring-emerald-500/20'
                              : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 hover:border-emerald-500'
                          }`}
                        >
                          <div className="mt-0.5">
                            {isSelected ? (
                              <CheckSquare className="w-5 h-5 text-emerald-600" />
                            ) : (
                              <Square className="w-5 h-5 text-slate-400" />
                            )}
                          </div>
                          <div className="flex-1 text-slate-800 dark:text-slate-200 leading-normal">
                            <span className="font-bold mr-2 text-xs">{optKey}.</span>
                            <MathRenderer text={optVal} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* NAT Numeric Input */}
                {currentQ.type === 'NAT' && (
                  <div className="space-y-3 max-w-sm">
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                      Enter Your Numerical Answer:
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="e.g. 12.5"
                        value={userAnswers[currentQ.id] || ''}
                        disabled={checkedQuestions[currentQ.id]}
                        onChange={(e) => handleNatInput(e.target.value)}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-sm font-mono font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons: Check Answer, Reset, Show Solution */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCheckAnswer}
                    disabled={userAnswers[currentQ.id] === undefined || userAnswers[currentQ.id] === ''}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold shadow-xs transition"
                  >
                    Check Answer
                  </button>

                  <button
                    onClick={handleResetCurrent}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>

                  {/* XP Reward Badge */}
                  {checkedQuestions[currentQ.id] && qbankProgress[currentQ.id] && (
                    qbankProgress[currentQ.id].peeked ? (
                      <span className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold inline-flex items-center gap-1.5 animate-in fade-in">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>Solution Viewed (0 XP)</span>
                      </span>
                    ) : (
                      <span className={`px-3 py-1.5 rounded-xl ${
                        qbankProgress[currentQ.id].xpAwarded >= 1
                          ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                          : 'bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                      } text-xs font-bold inline-flex items-center gap-1.5 animate-in fade-in`}>
                        <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{qbankProgress[currentQ.id].xpAwarded >= 1 ? '+1.0 XP Earned 🎯' : '+0.5 XP Attempt Credit 💡'}</span>
                      </span>
                    )
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (!checkedQuestions[currentQ.id]) {
                        setPeekedQuestions(prev => ({ ...prev, [currentQ.id]: true }));
                      }
                      setShowSolutions(prev => ({ ...prev, [currentQ.id]: !prev[currentQ.id] }));
                    }}
                    className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                  >
                    {showSolutions[currentQ.id] ? 'Hide Solution' : 'View Solution'}
                  </button>
                </div>
              </div>

              {/* Solution Box (Step-by-step KaTeX) */}
              {showSolutions[currentQ.id] && (
                <div className="p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-3 animate-in fade-in duration-200">
                  {(peekedQuestions[currentQ.id] || qbankProgress[currentQ.id]?.peeked) && (
                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs font-semibold flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>Solution revealed before checking an answer: Academic XP is withheld (0 XP).</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      Step-by-Step Solution & Key
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300">
                      Correct: {Array.isArray(currentQ.correct_answer) ? currentQ.correct_answer.join(', ') : currentQ.correct_answer}
                    </span>
                  </div>

                  <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed pt-1">
                    <MathRenderer text={currentQ.solution || 'No detailed solution text provided.'} />
                  </div>
                </div>
              )}

              {/* Prev / Next Bottom Navigator */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-800 disabled:opacity-30 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={() => setCurrentIndex(prev => Math.min(activeQuestions.length - 1, prev + 1))}
                  disabled={currentIndex >= activeQuestions.length - 1}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white dark:bg-white dark:text-slate-900 disabled:opacity-30 shadow-xs hover:opacity-90 transition"
                >
                  <span>Next Question</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ) : (
            <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
              <HelpCircle className="w-10 h-10 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">No Questions Match Filter</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try resetting your question type or status filters to view questions in this category.
              </p>
              <button
                onClick={() => {
                  setTypeFilter('All');
                  setMarksFilter('All');
                  setDifficultyFilter('All');
                  setStatusFilter('All');
                  setYearFilter('All');
                  setPaperFilter('All');
                  setSearchQuery('');
                }}
                className={`px-4 py-2 ${theme.btnPrimary} font-bold text-xs rounded-xl shadow-xs transition`}
              >
                Reset All Filters
              </button>
            </div>
          )}

        </div>
      )}

      {/* Question Error / Typo Reporting Modal */}
      {reportingQuestion && (
        <QuestionReportModal
          isOpen={Boolean(reportingQuestion)}
          onClose={() => setReportingQuestion(null)}
          question={reportingQuestion}
          paperTitle={reportingQuestion?.paperTitle || reportingQuestion?.sourceTitle || poolTitle}
          currentStudent={currentStudent}
        />
      )}

      {/* Multi-Topic Custom Practice Builder Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0 bg-slate-50/50 dark:bg-slate-950/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900 dark:text-white">
                    Multi-Topic Custom Practice Builder
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Select multiple topics, set your target question count, and launch targeted practice.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowCustomModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="overflow-y-auto p-5 sm:p-6 space-y-6">
              
              {/* Controls: Selection Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-500 uppercase text-[11px]">Topic Selection:</span>
                  <button
                    onClick={handleSelectAllTopics}
                    className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-900 hover:bg-blue-100"
                  >
                    Select All Topics
                  </button>
                  <button
                    onClick={handleClearAllTopics}
                    className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-300"
                  >
                    Clear All
                  </button>
                </div>

                <div className="text-slate-500 font-semibold">
                  Selected: <strong className="text-blue-600 dark:text-blue-400">{Object.values(selectedTopics).filter(Boolean).length}</strong> topics
                </div>
              </div>

              {/* Sections & Topics Accordion/Grid */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Step 1: Choose Sections & Topics
                </h3>
                
                <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                  {bankStats.syllabusSections.map((sec) => {
                    const secTopicKeys = (sec.topics || []).map(t => `${sec.title}:::${t.topic_name}`);
                    const selectedInSec = secTopicKeys.filter(k => selectedTopics[k]).length;
                    const allInSecSelected = secTopicKeys.length > 0 && selectedInSec === secTopicKeys.length;

                    return (
                      <div 
                        key={sec.id}
                        className="rounded-2xl border border-slate-200 dark:border-slate-800 p-3 bg-white dark:bg-slate-900/60 space-y-2.5"
                      >
                        <div className="flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => handleToggleSectionTopics(sec)}
                            className="flex items-center gap-2 text-left group"
                          >
                            <div className="text-blue-600 dark:text-blue-400">
                              {allInSecSelected ? (
                                <CheckSquare className="w-4 h-4 fill-blue-600/10" />
                              ) : selectedInSec > 0 ? (
                                <div className="w-4 h-4 rounded border-2 border-blue-600 bg-blue-600/30 flex items-center justify-center text-[10px] font-bold text-blue-600">
                                  -
                                </div>
                              ) : (
                                <Square className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
                              )}
                            </div>
                            <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                              {sec.title}
                            </span>
                          </button>

                          <span className="text-[11px] font-semibold text-slate-400">
                            {selectedInSec}/{sec.topics.length} Selected
                          </span>
                        </div>

                        {/* Topic Checkbox Pills */}
                        <div className="flex flex-wrap gap-1.5 pl-6">
                          {sec.topics.map((t) => {
                            const key = `${sec.title}:::${t.topic_name}`;
                            const isTopicSelected = !!selectedTopics[key];
                            const count = aggregatedStats.topicCounts[key] || 0;

                            return (
                              <button
                                key={t.topic_name}
                                type="button"
                                onClick={() => handleToggleTopic(sec.title, t.topic_name)}
                                className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold transition flex items-center gap-1.5 border ${
                                  isTopicSelected
                                    ? 'bg-blue-50 dark:bg-blue-950/70 border-blue-300 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-bold'
                                    : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                                }`}
                              >
                                <span>{t.topic_name}</span>
                                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/5 dark:bg-white/10 text-slate-500 dark:text-slate-400">
                                  {count}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Target Question Count & Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                {/* Question Count Input */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Step 2: Number of Questions to Practice
                  </label>
                  
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setQuestionCountInput(prev => Math.max(5, prev - 5))}
                      className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 font-black text-sm flex items-center justify-center hover:bg-slate-100"
                    >
                      -5
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={customMatchingPool.length || 1000}
                      value={questionCountInput}
                      onChange={(e) => setQuestionCountInput(Math.max(1, parseInt(e.target.value, 10) || 1))}
                      className="flex-1 text-center font-mono font-bold text-sm px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500/20"
                    />
                    <button
                      type="button"
                      onClick={() => setQuestionCountInput(prev => Math.min(customMatchingPool.length || 1000, prev + 5))}
                      className="w-9 h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 font-black text-sm flex items-center justify-center hover:bg-slate-100"
                    >
                      +5
                    </button>
                  </div>

                  {/* Preset chips */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {[10, 25, 50, 100].map(cnt => (
                      <button
                        key={cnt}
                        type="button"
                        onClick={() => setQuestionCountInput(cnt)}
                        className={`px-2.5 py-0.8 rounded-lg text-xs font-bold border ${
                          questionCountInput === cnt 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {cnt} Qs
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setQuestionCountInput(customMatchingPool.length)}
                      className={`px-2.5 py-0.8 rounded-lg text-xs font-bold border ${
                        questionCountInput === customMatchingPool.length 
                          ? 'bg-blue-600 text-white border-blue-600' 
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      All ({customMatchingPool.length})
                    </button>
                  </div>
                </div>

                {/* Question Type & Marks Filter */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Question Format & Marks
                  </label>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-semibold text-slate-400 w-12">Format:</span>
                    {['All', 'MCQ', 'MSQ', 'NAT'].map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setCustomTypeFilter(t)}
                        className={`px-2.5 py-1 rounded-lg font-bold border ${
                          customTypeFilter === t
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-semibold text-slate-400 w-12">Marks:</span>
                    {['All', '1', '2'].map(m => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setCustomMarksFilter(m)}
                        className={`px-2.5 py-1 rounded-lg font-bold border ${
                          customMarksFilter === m
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {m === 'All' ? 'All' : `${m} Mark`}
                      </button>
                    ))}
                  </div>

                  <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={shuffleQuestions}
                      onChange={(e) => setShuffleQuestions(e.target.checked)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    <span className="font-semibold flex items-center gap-1.5">
                      <Shuffle className="w-3.5 h-3.5 text-blue-500" />
                      Shuffle / Randomize question order
                    </span>
                  </label>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-5 sm:p-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 bg-slate-50/50 dark:bg-slate-950/50">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Found <strong className="text-slate-900 dark:text-white font-bold">{customMatchingPool.length}</strong> matching questions • Practice will launch with <strong className="text-blue-600 dark:text-blue-400 font-bold">{Math.min(questionCountInput, customMatchingPool.length)}</strong> questions.
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleLaunchCustomSession}
                  disabled={customMatchingPool.length === 0}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white text-xs font-bold shadow-xs transition inline-flex items-center gap-2"
                >
                  <span>Start Practice Session</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
