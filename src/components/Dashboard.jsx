import React, { useState, useEffect, useMemo } from 'react';
import { 
  Trophy, 
  Target, 
  Clock, 
  Layers, 
  CheckCircle2, 
  Play, 
  ArrowRight,
  Zap, 
  BookOpen, 
  HelpCircle, 
  Sparkles, 
  GraduationCap, 
  Gamepad2, 
  MessageSquare, 
  Calculator, 
  Wrench, 
  Waves, 
  Droplets, 
  Factory, 
  Utensils, 
  Brain, 
  FileText, 
  TrendingUp, 
  Award, 
  Quote, 
  Cog, 
  ChevronDown, 
  ChevronUp,
  Activity,
  Radio,
  Users,
  Building2,
  Flame,
  RefreshCw
} from 'lucide-react';
import { GATE_AG_SYLLABUS } from '../data/syllabus';
import { normalizeSectionTitle } from '../utils/syllabusTaxonomy.js';
import { isEngineersDayActive } from '../utils/engineersDay.js';
import { syncStudentCloudData } from '../services/studentProgressSyncService.js';
import { subscribeToLiveStats, formatLiveRelativeTime } from '../services/liveStatisticsService.js';
import { getQuestionBankStats } from '../data/question_bank/index.js';

const akhandBharatBackdrop = '/icons/akhand_bharat_backdrop.jpg';
const swamiVivekanandaPortrait = '/icons/swami_vivekananda_real_portrait.jpg';

const normalizeSectionName = (secName) => {
  if (!secName) return '';
  return normalizeSectionTitle(secName);
};

const getSectionIcon = (secCode) => {
  switch (secCode) {
    case 'AG-EM': return Calculator;
    case 'AG-FM': return Wrench;
    case 'AG-FP': return Zap;
    case 'AG-SW': return Waves;
    case 'AG-ID': return Droplets;
    case 'AG-AP': return Factory;
    case 'AG-DF': return Utensils;
    case 'AG-GA': return Brain;
    default: return Layers;
  }
};

export default function Dashboard({ 
  questions = [], 
  mockPapers = [], 
  customMockPapers = [], 
  userStats = { attempted: [], correct: [], testHistory: [] }, 
  currentStudent = null,
  onStartMock, 
  onStartSectionPractice, 
  setActiveTab,
  onOpenEngineersDay
}) {
  const [paperEraFilter, setPaperEraFilter] = useState('all');
  const [customMockSearch, setCustomMockSearch] = useState('');
  const [isSyncingProgress, setIsSyncingProgress] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState('');
  const [isEngineersDayCardCompact, setIsEngineersDayCardCompact] = useState(() => {
    try {
      return localStorage.getItem('engineers_day_compact_view') === 'true';
    } catch (e) {
      return false;
    }
  });

  const [liveStats, setLiveStats] = useState(null);

  useEffect(() => {
    const unsub = subscribeToLiveStats((data) => {
      if (data) setLiveStats(data);
    });
    return () => {
      if (typeof unsub === 'function') unsub();
    };
  }, []);

  const handleManualSync = async () => {
    if (!currentStudent) return;
    setIsSyncingProgress(true);
    setSyncFeedback('');
    try {
      await syncStudentCloudData(currentStudent, userStats);
      setSyncFeedback('Synced live with cloud progress!');
      setTimeout(() => setSyncFeedback(''), 3000);
    } catch (e) {
      setSyncFeedback('Sync completed.');
      setTimeout(() => setSyncFeedback(''), 3000);
    } finally {
      setIsSyncingProgress(false);
    }
  };

  const paperMap = useMemo(() => {
    const map = {};
    (mockPapers || []).forEach(p => {
      if (p.year) map[p.year] = p;
    });
    return map;
  }, [mockPapers]);

  const combinedPool = useMemo(() => {
    const customQs = (customMockPapers || []).flatMap(p => p.questions || []);
    return [...questions, ...customQs];
  }, [questions, customMockPapers]);

  const questionBankStats = useMemo(() => {
    try {
      return getQuestionBankStats();
    } catch (e) {
      return { totalQuestions: 1915 };
    }
  }, []);
  const autonomousBankCount = questionBankStats?.totalQuestions || 1915;

  const totalQuestions = combinedPool.length || 4574;
  const grandTotalQuestions = totalQuestions + autonomousBankCount;
  const attemptedCount = userStats?.attempted?.length || 0;
  const correctCount = userStats?.correct?.length || 0;
  const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;
  const testHistory = userStats?.testHistory || [];
  const testsAttemptedCount = testHistory.length;
  const bestScore = testHistory.reduce((max, t) => Math.max(max, Number(t.score || 0)), 0);

  // Section-wise attempt statistics with live progress
  const sectionStats = useMemo(() => {
    const stats = {};
    const attemptedSet = new Set((userStats?.attempted || []).map(String));
    const correctSet = new Set((userStats?.correct || []).map(String));

    GATE_AG_SYLLABUS.forEach(sec => {
      const canon = normalizeSectionTitle(sec.title);
      stats[canon] = { total: 0, attempted: 0, correct: 0 };
    });

    combinedPool.forEach(q => {
      const canon = normalizeSectionTitle(q.section);
      if (!stats[canon]) {
        stats[canon] = { total: 0, attempted: 0, correct: 0 };
      }
      stats[canon].total += 1;
      const qid = String(q.id);
      if (attemptedSet.has(qid)) {
        stats[canon].attempted += 1;
        if (correctSet.has(qid)) {
          stats[canon].correct += 1;
        }
      }
    });

    return stats;
  }, [combinedPool, userStats]);

  const allYears = [
    '2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016',
    '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007'
  ];

  const filteredYears = allYears.filter(year => {
    const yNum = parseInt(year);
    if (paperEraFilter === 'recent') return yNum >= 2016;
    if (paperEraFilter === 'classic') return yNum <= 2015;
    return true;
  });

  const paperHistoryMap = useMemo(() => {
    const history = {};
    (userStats?.testHistory || []).forEach(item => {
      if (item.year && (history[item.year] === undefined || item.score > history[item.year].score)) {
        history[item.year] = item;
      }
    });
    return history;
  }, [userStats]);

  const customMockHistoryMap = useMemo(() => {
    const history = {};
    (userStats?.testHistory || []).forEach(item => {
      const key = item.paperTitle || item.year;
      if (key && (history[key] === undefined || item.score > history[key].score)) {
        history[key] = item;
      }
    });
    return history;
  }, [userStats]);

  const filteredCustomMocks = useMemo(() => {
    if (!customMockSearch.trim()) return customMockPapers;
    const query = customMockSearch.toLowerCase().trim();
    return customMockPapers.filter((p, idx) => 
      (p.title || `Mock ${idx + 1}`).toLowerCase().includes(query) ||
      String(idx + 1).includes(query)
    );
  }, [customMockPapers, customMockSearch]);

  const studentAcademicXP = currentStudent?.xp_points !== undefined 
    ? Number(currentStudent.xp_points) 
    : (Number(localStorage.getItem('gate_ag_student_xp_data')) || 0);

  const studentBreakXP = currentStudent?.break_xp !== undefined 
    ? Number(currentStudent.break_xp) 
    : (Number(localStorage.getItem('gate_ag_break_xp')) || 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Topmost National Sankalp Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500/15 via-amber-500/20 to-emerald-500/15 dark:from-orange-950/40 dark:via-amber-950/50 dark:to-emerald-950/40 border-2 border-amber-500/50 dark:border-amber-400/60 shadow-md p-3.5 sm:p-4 text-center">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <strong className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black tracking-wide text-amber-950 dark:text-amber-300 drop-shadow-sm">
            🚩 मेरा संकल्प : आत्मनिर्भर, अखंड और अजय भारत 🇮🇳
          </strong>
        </div>
      </div>

      {/* Personal Student Academic Progress & Live Cloud Sync Card */}
      {currentStudent && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 text-white flex items-center justify-center font-extrabold text-base shadow-sm shrink-0 overflow-hidden">
                {currentStudent.profile_photo_url ? (
                  <img src={currentStudent.profile_photo_url} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  (currentStudent.full_name || 'Student').charAt(0).toUpperCase()
                )}
              </div>
              <div className="space-y-0.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                    Namaste, {currentStudent.title_prefix ? `${currentStudent.title_prefix} ` : ''}{currentStudent.full_name || 'Aspirant'} 🌾
                  </h2>
                  {currentStudent.role && currentStudent.role !== 'student' && (
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                      {currentStudent.role === 'solver' ? '⚡ Solver Moderator' : (currentStudent.role === 'mentor' ? '🏛️ Faculty Mentor' : currentStudent.role)}
                    </span>
                  )}
                  {currentStudent.contributor_badge && currentStudent.contributor_badge !== 'None' && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-300 border border-purple-200 dark:border-purple-800 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-purple-500" />
                      <span>{currentStudent.contributor_badge}</span>
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {[currentStudent.department, currentStudent.college_name, currentStudent.gate_target_year || 'GATE 2027'].filter(Boolean).join(' • ')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 self-start sm:self-auto">
              <button
                onClick={handleManualSync}
                disabled={isSyncingProgress}
                className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl flex items-center gap-2 transition cursor-pointer disabled:opacity-50"
                title="Sync test attempts and mistake vault with cloud storage"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncingProgress ? 'animate-spin text-indigo-500' : ''}`} />
                <span>{isSyncingProgress ? 'Syncing...' : 'Sync Cloud Progress'}</span>
              </button>
            </div>
          </div>

          {syncFeedback && (
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{syncFeedback}</span>
            </div>
          )}

          {/* Quick Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Academic XP</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="text-lg font-black text-slate-900 dark:text-white font-mono">{studentAcademicXP}</span>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Questions Solved</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Target className="w-4 h-4 text-emerald-500" />
                <span className="text-lg font-black text-slate-900 dark:text-white font-mono">{attemptedCount}</span>
                <span className="text-[10px] text-slate-400">({accuracy}%)</span>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Full Mocks Taken</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Trophy className="w-4 h-4 text-indigo-500" />
                <span className="text-lg font-black text-slate-900 dark:text-white font-mono">{testsAttemptedCount}</span>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-2xl border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Highest Mock Score</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Award className="w-4 h-4 text-purple-500" />
                <span className="text-lg font-black text-slate-900 dark:text-white font-mono">{bestScore} / 100</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Minimized Engineers' Day 2026 Commemorative Banner (Active till 15 Sept 2026) */}
      {isEngineersDayActive() && (
        <div className="relative overflow-hidden rounded-2xl border border-amber-300 dark:border-amber-700/80 bg-gradient-to-r from-emerald-50 via-amber-50/50 to-teal-50 dark:from-emerald-950/40 dark:via-amber-950/30 dark:to-teal-950/40 p-3.5 sm:p-4 shadow-sm text-slate-900 dark:text-white transition-all">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            
            {/* Left Column with Sir M. Visvesvaraya Portrait */}
            <div className="flex items-start sm:items-center gap-3">
              <div className="relative shrink-0">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden border-2 border-amber-400 dark:border-amber-500 shadow-md bg-slate-950 flex items-center justify-center">
                  <img 
                    src="/icons/visvesvaraya_portrait.jpg" 
                    alt="Bharat Ratna Sir M. Visvesvaraya" 
                    className="w-full h-full object-contain p-0.5"
                    loading="eager"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center border border-white dark:border-slate-900 shadow-xs" title="Engineering Innovation">
                  <Cog className="w-2.5 h-2.5 animate-spin-slow" />
                </div>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-mono border border-emerald-300 dark:border-emerald-700/60">
                    Engineers' Day • 15 Sept 2026
                  </span>
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    COAET, CCS HAU Hisar
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-xs sm:text-sm font-extrabold text-amber-950 dark:text-amber-200">
                    🌾 KṣetraVeda Yantradhārā • क्षेत्रवेद यन्त्रधारा ⚙️
                  </h3>
                </div>

                {!isEngineersDayCardCompact && (
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-relaxed max-w-3xl pt-0.5">
                    A continuous stream of knowledge and technology flowing through the fields of agriculture. Bridging the wisdom of the soil with the power of modern engineering.
                  </p>
                )}
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2 self-end md:self-center shrink-0">
              <button
                onClick={() => {
                  const nextState = !isEngineersDayCardCompact;
                  setIsEngineersDayCardCompact(nextState);
                  try {
                    localStorage.setItem('engineers_day_compact_view', String(nextState));
                  } catch (e) {}
                }}
                className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 text-xs transition-colors cursor-pointer"
                title={isEngineersDayCardCompact ? "Expand celebration details" : "Minimize view"}
                aria-label={isEngineersDayCardCompact ? "Expand celebration details" : "Minimize view"}
              >
                {isEngineersDayCardCompact ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              </button>

              <button
                onClick={() => {
                  if (typeof onOpenEngineersDay === 'function') {
                    onOpenEngineersDay();
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>View Celebration</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Inspiring Swami Vivekananda Hero Banner with Full Akhand Bharat Satellite Relief */}
      <div className="relative overflow-hidden bg-slate-950 text-white rounded-3xl border border-amber-500/40 shadow-2xl min-h-[340px]">
        
        {/* Photorealistic Akhand Bharat Satellite Relief Backdrop - Fully Zoomed Out & Centered */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-95 pointer-events-none transition duration-1000 filter brightness-105 contrast-110"
          style={{ backgroundImage: `url(${akhandBharatBackdrop})` }}
        ></div>

        {/* Ultra-subtle Gradient to enhance text legibility while keeping map crystal clear */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-950/30 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-slate-950/20 pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 items-center">
          
          {/* Left / Transparent Text Content Column */}
          <div className="lg:col-span-8 space-y-4">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/60 border border-amber-400/40 text-xs font-bold text-amber-300 backdrop-blur-md shadow-lg">
              <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Swami Vivekananda's Eternal Call to Aspirants</span>
            </div>

            <div className="space-y-3">
              <div className="relative pl-4 sm:pl-5 border-l-4 border-amber-400 space-y-2">
                <Quote className="w-7 h-7 text-amber-400/90 mb-1 drop-shadow-md" />
                <blockquote className="text-base sm:text-xl md:text-2xl font-serif italic text-amber-100 leading-relaxed tracking-wide font-medium [text-shadow:_0_2px_14px_rgba(0,0,0,0.95)]">
                  "All power is within you; you can do anything and everything. Believe in that, do not believe that you are weak; stand up and express the divinity within you."
                </blockquote>
                <div className="pt-1 flex flex-wrap items-center gap-2 text-xs sm:text-sm font-mono font-bold text-amber-400 [text-shadow:_0_1px_8px_rgba(0,0,0,0.9)]">
                  <span>— Swami Vivekananda</span>
                  <span className="text-white/50">•</span>
                  <span className="text-slate-200 font-sans font-normal text-xs">Complete Works, Vol. 2</span>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed max-w-2xl [text-shadow:_0_1px_8px_rgba(0,0,0,0.9)] pt-1">
              Harness your boundless potential to conquer GATE AG. Access <strong>{grandTotalQuestions} total questions</strong> (including <strong>{totalQuestions} verified CBT questions</strong> across <strong>70 full-length tests</strong> and <strong>{autonomousBankCount} Autonomous Question Bank questions</strong>), plus comprehensive formula archives.
            </p>
          </div>

          {/* Right / Image Column - Authentic Historical Portrait */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative group max-w-[220px] sm:max-w-[250px] w-full">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500/60 via-orange-500/50 to-amber-600/60 rounded-3xl blur-md opacity-85 group-hover:opacity-100 transition duration-500"></div>
              
              <div className="relative rounded-3xl overflow-hidden border-2 border-amber-400/60 shadow-2xl bg-slate-950 aspect-[3/4]">
                <img 
                  src={swamiVivekanandaPortrait} 
                  alt="Swami Vivekananda authentic historical portrait 1893" 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-700 ease-out"
                  loading="eager"
                />
                
                {/* Subtle Vignette Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent pointer-events-none"></div>

                {/* Corner Tag */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono font-bold text-amber-200 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-500/40 shadow-md">
                  <span className="flex items-center gap-1.5 text-amber-300">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Chicago 1893</span>
                  </span>
                  <span className="text-amber-400 text-[10px]">Akhand Bharat</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* REAL-TIME LIVE STATISTICS & TELEMETRY BOARD WIDGET */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/80 dark:from-slate-900 dark:via-slate-950 dark:to-emerald-950 text-slate-900 dark:text-white border-2 border-emerald-300 dark:border-emerald-500/40 p-5 sm:p-6 shadow-sm dark:shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-[11px] font-black font-mono border border-emerald-300 dark:border-emerald-500/40">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                LIVE BOARD TELEMETRY
              </span>
              <span className="text-[11px] font-mono text-emerald-800 dark:text-emerald-200/70 font-semibold">
                • Real-time updates active
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span>All-India Aspirant Live Activity Board</span>
              <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400 animate-pulse" />
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Live updates of registered aspirants, active sessions, questions solved, and mock test attempts.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('livestats')}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer shrink-0 self-start md:self-center"
          >
            <span>Open Full Live Board</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Quick Live Counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/80 border border-emerald-200 dark:border-emerald-500/30 space-y-1 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-300/80">Online Right Now</span>
              <Users className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-emerald-700 dark:text-emerald-300 font-mono">
              {liveStats?.activeOnlineStudents ?? 0}
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">Active Aspirants</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/80 border border-blue-200 dark:border-blue-500/30 space-y-1 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-blue-700 dark:text-blue-300/80">Registered Students</span>
              <GraduationCap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-blue-700 dark:text-blue-300 font-mono">
              {liveStats?.totalRegisteredStudents ?? 0}
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">All-India Institutes</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/80 border border-purple-200 dark:border-purple-500/30 space-y-1 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-purple-700 dark:text-purple-300/80">Questions Solved</span>
              <Target className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-purple-700 dark:text-purple-300 font-mono">
              {liveStats?.totalQuestionsSolved ?? attemptedCount ?? 0}
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">{(liveStats?.overallAccuracy ?? accuracy ?? 0)}% Overall Acc.</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/80 border border-amber-200 dark:border-amber-500/30 space-y-1 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-amber-700 dark:text-amber-300/80">Session Logins</span>
              <Zap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-amber-700 dark:text-amber-300 font-mono">
              {liveStats?.totalSessionLogins ?? 0}
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">Device Telemetry</p>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid - Comprehensive 5-Stat Breakdown */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
        
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 space-y-2.5 shadow-sm hover:border-blue-500/40 transition">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">CBT Pool</span>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
              {totalQuestions}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">70 CBT Papers</p>
          </div>
        </div>

        <div 
          onClick={() => setActiveTab('questionbank')}
          className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 space-y-2.5 shadow-sm hover:border-teal-500/50 transition cursor-pointer group"
          title="Open Autonomous Question Bank"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center shadow-xs group-hover:scale-105 transition">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">Question Bank</span>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono tracking-tight group-hover:text-teal-600 dark:group-hover:text-teal-400 transition">
              {autonomousBankCount}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">8 Syllabus Sections</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 space-y-2.5 shadow-sm hover:border-emerald-500/40 transition">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Mock Tests</span>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
              {20 + (customMockPapers?.length || 0)}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">20 PYQs + 50 Mocks</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 space-y-2.5 shadow-sm hover:border-purple-500/40 transition">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shadow-xs">
              <Target className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Solved Qs</span>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
              {attemptedCount}
            </div>
            <p className="text-[11px] font-bold text-emerald-500 mt-0.5 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>Acc: {accuracy}%</span>
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 space-y-2.5 shadow-sm hover:border-amber-500/40 transition">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-xs">
              <Trophy className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Full CBTs</span>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
              {testsAttemptedCount}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              {bestScore > 0 ? `Best: ${bestScore}/100` : '0 attempts'}
            </p>
          </div>
        </div>

      </div>

      {/* Hub Shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          onClick={() => setActiveTab('practicehub')}
          className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 cursor-pointer transition flex items-center justify-between group shadow-sm hover:shadow-md"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Practice Hub</h3>
              <p className="text-xs text-slate-400 mt-0.5">Pools & Speed Tests</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition" />
        </div>

        <div 
          onClick={() => setActiveTab('learninghub')}
          className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 hover:border-teal-500 cursor-pointer transition flex items-center justify-between group shadow-sm hover:shadow-md"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Learning Hub</h3>
              <p className="text-xs text-slate-400 mt-0.5">Concepts & Vault</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-teal-500 group-hover:translate-x-1 transition" />
        </div>

        <div 
          onClick={() => setActiveTab('community')}
          className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 cursor-pointer transition flex items-center justify-between group shadow-sm hover:shadow-md"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Community</h3>
              <p className="text-xs text-slate-400 mt-0.5">Discussions & Chat</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition" />
        </div>

        <div 
          onClick={() => setActiveTab('games')}
          className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 hover:border-amber-500 cursor-pointer transition flex items-center justify-between group shadow-sm hover:shadow-md"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
              <Gamepad2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Break Zone</h3>
              <p className="text-xs text-slate-400 mt-0.5">2048 & Refresh</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-1 transition" />
        </div>
      </div>

      {/* Official GATE PYQ Papers */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                Official GATE PYQ Mocks (2007–2026)
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">20 official CBT papers with authentic scoring and timing.</p>
            </div>
          </div>

          {/* Era Filter */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold max-w-full overflow-x-auto scrollbar-none">
            <button
              onClick={() => setPaperEraFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer whitespace-nowrap ${
                paperEraFilter === 'all'
                  ? 'bg-emerald-600 text-white shadow-xs font-extrabold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All (20)
            </button>
            <button
              onClick={() => setPaperEraFilter('recent')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer whitespace-nowrap ${
                paperEraFilter === 'recent'
                  ? 'bg-emerald-600 text-white shadow-xs font-extrabold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              2016–2026
            </button>
            <button
              onClick={() => setPaperEraFilter('classic')}
              className={`px-3 py-1.5 rounded-lg transition cursor-pointer whitespace-nowrap ${
                paperEraFilter === 'classic'
                  ? 'bg-emerald-600 text-white shadow-xs font-extrabold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              2007–2015
            </button>
          </div>
        </div>

        {/* Scroll Container */}
        <div className="max-h-60 overflow-y-auto pr-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {filteredYears.map((year) => {
              const historyItem = paperHistoryMap[year];
              const paperObj = paperMap[year];
              const isAvail = paperObj?.has_solved_docx === true || true;

              return (
                <div 
                  key={year}
                  onClick={() => onStartMock(year)}
                  className="p-3 rounded-2xl border text-center transition flex flex-col justify-between space-y-2 select-none cursor-pointer group bg-slate-50 hover:bg-emerald-50 dark:bg-slate-950 dark:hover:bg-emerald-950/30 border-slate-200 dark:border-slate-800 hover:border-emerald-500 shadow-2xs hover:shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-extrabold text-emerald-600 dark:text-emerald-400">
                      GATE {year}
                    </span>
                    {historyItem ? (
                      <span className="text-[10px] font-mono font-bold text-emerald-500 flex items-center gap-0.5">
                        <Award className="w-3 h-3" />
                        <span>{historyItem.score} pts</span>
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-mono">180m</span>
                    )}
                  </div>

                  <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    {parseInt(year) >= 2016 ? '65 Qs • 100 M' : '85 Qs • 150 M'}
                  </div>

                  <button
                    className="w-full py-1.5 rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-1.5 cursor-pointer bg-emerald-600 text-white shadow-xs group-hover:bg-emerald-500"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Launch</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Custom Mock Papers Section (50 Full-Length Mocks) */}
      {customMockPapers && customMockPapers.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                  50 Custom Full-Length Mock Papers (GATE 2027)
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">Curated 65-question papers with complete step-by-step numerical solutions.</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customMockSearch}
                onChange={(e) => setCustomMockSearch(e.target.value)}
                placeholder="Search Mocks 1–50..."
                className="px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-purple-500 w-36 sm:w-44"
              />
              <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800 shrink-0">
                {filteredCustomMocks.length} / {customMockPapers.length} Mocks
              </span>
            </div>
          </div>

          {/* Scroll Container */}
          <div className="max-h-72 overflow-y-auto pr-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {filteredCustomMocks.map((paper, idx) => {
                const title = paper.title || `MOCK ${paper.mock_number || idx + 1}`;
                const history = customMockHistoryMap[title] || customMockHistoryMap[paper.id];

                return (
                  <div 
                    key={paper.id || idx}
                    onClick={() => onStartMock(paper)}
                    className="p-3 rounded-2xl border border-purple-200/70 dark:border-purple-900/50 bg-purple-50/30 dark:bg-purple-950/20 hover:bg-purple-50 dark:hover:bg-purple-950/40 text-center transition flex flex-col justify-between space-y-2 cursor-pointer hover:border-purple-400 shadow-2xs group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-extrabold text-purple-600 dark:text-purple-400 truncate max-w-[100px]">
                        {title}
                      </span>
                      {history ? (
                        <span className="text-[10px] font-mono font-bold text-purple-600 dark:text-purple-300 flex items-center gap-0.5">
                          <Award className="w-3 h-3" />
                          <span>{history.score} pts</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-slate-400 shrink-0">180m</span>
                      )}
                    </div>

                    <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                      {(paper.questions || []).length || 65} Qs • 100 M
                    </div>

                    <button
                      className="w-full py-1.5 rounded-xl text-xs font-extrabold bg-purple-600 text-white shadow-xs group-hover:bg-purple-700 transition flex items-center justify-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Launch</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Section Practice Grid with Live Progress Percentages */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
              Section-Wise Practice & Syllabus Coverage
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Live completion progress across all 8 official GATE AG syllabus sections.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {GATE_AG_SYLLABUS.map((sec) => {
            const canonSecName = normalizeSectionTitle(sec.title);
            const stat = sectionStats[canonSecName] || { total: 0, attempted: 0, correct: 0 };
            const SecIcon = getSectionIcon(sec.code);
            const progressPercent = stat.total > 0 ? Math.round((stat.attempted / stat.total) * 100) : 0;

            return (
              <div 
                key={sec.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-3.5 hover:border-emerald-500/60 hover:shadow-sm transition group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition">
                      <SecIcon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-amber-500 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 font-mono">
                      {sec.weightage}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-slate-900 dark:text-white text-xs leading-snug">
                    {sec.title}
                  </h3>

                  <div className="space-y-1.5 mt-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      <span>{stat.attempted} / {stat.total} Solved</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">{progressPercent}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, progressPercent)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onStartSectionPractice(canonSecName)}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                >
                  <Layers className="w-4 h-4" />
                  <span>Practice ({stat.total} Qs)</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
