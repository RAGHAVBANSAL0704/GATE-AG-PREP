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
  AlertTriangle
} from 'lucide-react';
import MathRenderer from './MathRenderer';
import { evaluateQuestion } from '../utils/scoring.js';
import { awardStudentXP } from '../services/leaderboardService.js';
import { 
  ALL_QUESTION_BANK_QUESTIONS, 
  getQuestionBankStats 
} from '../data/question_bank/index.js';

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

export default function QuestionBankView({
  onOpenCalc,
  bookmarks = [],
  onToggleBookmark,
  currentStudent
}) {
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

  // Question navigation & interaction state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [checkedQuestions, setCheckedQuestions] = useState({});
  const [showSolutions, setShowSolutions] = useState({});
  const [peekedQuestions, setPeekedQuestions] = useState({});
  const [showPalette, setShowPalette] = useState(false);

  // Question Palette Windowing / Pagination (blocks of 50 questions for stutter-free DOM)
  const PALETTE_CHUNK_SIZE = 50;
  const [palettePage, setPalettePage] = useState(0);

  // Persistent user attempt progress for Question Bank
  const [qbankProgress, setQbankProgress] = useState(() => {
    try {
      const saved = localStorage.getItem('gate_ag_qbank_progress');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('gate_ag_qbank_progress', JSON.stringify(qbankProgress));
    } catch (e) {}
  }, [qbankProgress]);

  const bankStats = useMemo(() => getQuestionBankStats(), []);

  // Pre-aggregate question counts and solved counts by section, topic, and subtopic
  // Eliminates nested O(S * T * Sub * N) filtering on re-renders
  const aggregatedStats = useMemo(() => {
    const sectionCounts = {};
    const sectionSolved = {};
    const topicCounts = {};
    const subtopicCounts = {};

    for (let i = 0; i < ALL_QUESTION_BANK_QUESTIONS.length; i++) {
      const q = ALL_QUESTION_BANK_QUESTIONS[i];
      const sec = q.section || '';
      const top = q.topic || '';
      const sub = q.subtopic || '';
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
  }, [qbankProgress]);

  const bookmarkSet = useMemo(() => new Set(bookmarks || []), [bookmarks]);

  // Filter questions for the practice player based on scope and filters
  const activeQuestions = useMemo(() => {
    return ALL_QUESTION_BANK_QUESTIONS.filter(q => {
      // Scope filters
      if (activeScope.section !== 'All' && q.section !== activeScope.section) return false;
      if (activeScope.topic !== 'All' && q.topic !== activeScope.topic) return false;
      if (activeScope.subtopic !== 'All' && q.subtopic !== activeScope.subtopic) return false;

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
  }, [activeScope, typeFilter, marksFilter, difficultyFilter, statusFilter, searchQuery, qbankProgress, bookmarkSet]);

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

  const toggleSectionExpand = (secTitle) => {
    setExpandedSections(prev => ({
      ...prev,
      [secTitle]: !prev[secTitle]
    }));
  };

  const handleStartPractice = (section = 'All', topic = 'All', subtopic = 'All') => {
    setActiveScope({ section, topic, subtopic });
    setCurrentIndex(0);
    setActiveView('practice');
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
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-xs">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  Autonomous Question Bank
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  Topic & Subtopic Wise
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Modular repository of high-yield questions categorized across all 8 official GATE AG sections.
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
              <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400">Solved</span>
              <p className="text-sm font-black text-emerald-600 dark:text-emerald-400">{userProgressStats.attempted}</p>
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
              onClick={() => setActiveView('explorer')}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Question Bank Explorer</span>
            </button>

            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 truncate max-w-md">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">{activeScope.section}</span>
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
                placeholder="Search question bank by keyword, topic, or formula..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            <button
              onClick={() => handleStartPractice('All', 'All', 'All')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-2xl shadow-xs transition shrink-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>Practice All Bank Questions</span>
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
                  className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs transition hover:border-emerald-500/40"
                >
                  {/* Section Summary Header */}
                  <div
                    onClick={() => toggleSectionExpand(sec.title)}
                    className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-850 transition"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
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
                              className="h-full bg-emerald-500 rounded-full transition-all duration-300"
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
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow-xs"
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
                                <BookOpen className="w-4 h-4 text-emerald-500 shrink-0" />
                                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                                  {top.topic_name}
                                </h4>
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                                  {topCount} Qs in Bank
                                </span>
                              </div>

                              <button
                                onClick={() => handleStartPractice(sec.title, top.topic_name, 'All')}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
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
                                    className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[11px] font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 text-slate-700 dark:text-slate-300 transition"
                                  >
                                    <span className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition"
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
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-emerald-500'
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
                    btnColor += ' ring-2 ring-emerald-500 ring-offset-2 dark:ring-offset-slate-900';
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
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                    {currentIndex + 1}
                  </span>
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      Question {currentIndex + 1} of {activeQuestions.length}
                    </span>
                    <p className="text-[11px] text-slate-400">{currentQ.id} • {currentQ.topic}</p>
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
                  {currentQ.source && (
                    <span 
                      className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/80 flex items-center gap-1" 
                      title={`Textbook Source: ${currentQ.source}`}
                    >
                      <BookOpen className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                      <span className="truncate max-w-[160px] sm:max-w-[240px]">{currentQ.source}</span>
                    </span>
                  )}
                  {onToggleBookmark && (
                    <button
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
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl"
              >
                Reset All Filters
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
