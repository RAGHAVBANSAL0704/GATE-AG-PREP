import React, { useState, useMemo } from 'react';
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
  BarChart3,
  Award,
  Sparkles,
  History,
  Check,
  AlertTriangle
} from 'lucide-react';
import { GATE_AG_SYLLABUS } from '../data/syllabus';

const normalizeSectionName = (secName) => {
  if (!secName) return '';
  const cleaned = secName.replace(/^Section \d+:\s*/i, '').trim().toLowerCase();
  if (cleaned.includes('farm')) return 'Farm Power and Machinery';
  if (cleaned.includes('soil') || cleaned.includes('water')) return 'Soil and Water Conservation Engineering';
  if (cleaned.includes('process') || cleaned.includes('food') || cleaned.includes('agri')) return 'Agricultural Process Engineering';
  if (cleaned.includes('math')) return 'Engineering Mathematics';
  if (cleaned.includes('aptitude') || cleaned.includes('general') || cleaned.includes('ga')) return 'General Aptitude';
  return secName;
};

export default function Dashboard({ questions, mockPapers = [], userStats, onStartMock, onStartSectionPractice, setActiveTab }) {
  const [paperEraFilter, setPaperEraFilter] = useState('all'); // 'all' | 'recent' | 'classic'

  // Map mock paper objects by year for quick lookup
  const paperMap = useMemo(() => {
    const map = {};
    (mockPapers || []).forEach(p => {
      if (p.year) map[p.year] = p;
    });
    return map;
  }, [mockPapers]);

  // Real-time dynamic calculation of section counts
  const sectionCounts = useMemo(() => {
    const counts = {};
    questions.forEach(q => {
      const norm = normalizeSectionName(q.section);
      counts[norm] = (counts[norm] || 0) + 1;
    });
    return counts;
  }, [questions]);

  const totalQuestions = questions.length;
  const attemptedCount = userStats?.attempted?.length || 0;
  const correctCount = userStats?.correct?.length || 0;
  const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;

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

  // Map user score history per paper year
  const paperHistoryMap = useMemo(() => {
    const history = {};
    (userStats?.testHistory || []).forEach(item => {
      if (item.year && (history[item.year] === undefined || item.score > history[item.year].score)) {
        history[item.year] = item;
      }
    });
    return history;
  }, [userStats]);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Active Testing & Review Disclaimer Banner */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 flex items-start gap-3 text-xs sm:text-sm font-medium shadow-xs">
        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <div className="font-extrabold text-amber-800 dark:text-amber-200 uppercase tracking-wide text-[11px] flex items-center gap-1.5">
            <span>Notice: Portal Under Active Testing & Review</span>
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs">
            This portal is currently under active development, testing, and content review. Solved papers, CBT mock tests, and concept notes are continuously being updated and verified.
          </p>
        </div>
      </div>
      
      {/* 3D Hero Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute right-28 -bottom-16 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-xs font-bold text-blue-300 backdrop-blur-md shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Complete 2007–2026 GATE AG Preparation Portal</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            20 Years of GATE AG Papers & Real-Time Section Practice
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            Master {totalQuestions} verified practice questions segregated by topic, or attempt all 20 official papers (2007–2026) in realistic CBT exam format.
          </p>

          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              onClick={() => setActiveTab('mocktest')}
              className="btn-3d-primary flex items-center gap-2.5 px-6 py-3 rounded-2xl text-white font-extrabold text-xs sm:text-sm"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Explore All 20 PYQ Mock Tests</span>
            </button>
            <button
              onClick={() => setActiveTab('practice')}
              className="flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-md text-white border border-white/15 font-bold text-xs sm:text-sm transition shadow-sm"
            >
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Practice Pool ({totalQuestions} Qs)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Access Feature Hubs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div 
          onClick={() => setActiveTab('revision')}
          className="card-3d rounded-2xl p-5 cursor-pointer group flex items-center justify-between hover:border-amber-500/50 transition"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-200 dark:border-amber-900 group-hover:scale-110 transition">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>Misstep Tracker & Revision Vault</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300 font-mono font-bold">
                  {(userStats?.attempted?.length || 0) - (userStats?.correct?.length || 0)} Missteps
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Re-attempt wrong questions & saved bookmarks</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-1 transition shrink-0" />
        </div>

        <div 
          onClick={() => setActiveTab('formulas')}
          className="card-3d rounded-2xl p-5 cursor-pointer group flex items-center justify-between hover:border-blue-500/50 transition"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-900 group-hover:scale-110 transition">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>Formula Sheet & Printable Cheatsheet</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300 font-mono font-bold">
                  KaTeX
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Section-wise equations, variables & PDF export</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition shrink-0" />
        </div>
      </div>

      {/* 3D Elevated Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="card-3d rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Practice Pool</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-900">
              <HelpCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {totalQuestions} Qs
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">2016–2026 Solved Pool</p>
        </div>

        <div className="card-3d rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Mock Papers</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-200 dark:border-emerald-900">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            20 Papers
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Years 2007 to 2026</p>
        </div>

        <div className="card-3d rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Questions Solved</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-purple-200 dark:border-purple-900">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {attemptedCount}
          </div>
          <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">Accuracy: {accuracy}%</p>
        </div>

        <div className="card-3d rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Tests Completed</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center border border-amber-200 dark:border-amber-900">
              <Trophy className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {userStats?.testHistory?.length || 0}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Full CBT Exam Mocks</p>
        </div>

      </div>

      {/* Featured Mock Papers with 3D Era Tab Filters */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span>Official GATE PYQ Mock Papers (2007–2026)</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">All 20 papers with exact instructions, duration, and marking rules read directly from paper.</p>
          </div>

          {/* Era Filter Tabs */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold">
            <button
              onClick={() => setPaperEraFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition ${
                paperEraFilter === 'all'
                  ? 'bg-blue-600 text-white shadow-2xs font-extrabold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All (20 Papers)
            </button>
            <button
              onClick={() => setPaperEraFilter('recent')}
              className={`px-3 py-1.5 rounded-lg transition ${
                paperEraFilter === 'recent'
                  ? 'bg-blue-600 text-white shadow-2xs font-extrabold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Recent (2016–2026)
            </button>
            <button
              onClick={() => setPaperEraFilter('classic')}
              className={`px-3 py-1.5 rounded-lg transition ${
                paperEraFilter === 'classic'
                  ? 'bg-blue-600 text-white shadow-2xs font-extrabold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Classic (2007–2015)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredYears.map((year) => {
            const historyItem = paperHistoryMap[year];
            const paperObj = paperMap[year];
            const isAvail = paperObj?.has_solved_docx === true;

            return (
              <div 
                key={year}
                className="card-3d rounded-2xl p-5 flex flex-col justify-between space-y-4 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      GATE {year}
                    </span>
                    {historyItem ? (
                      <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900">
                        Score: {historyItem.score}
                      </span>
                    ) : isAvail ? (
                      <span className="text-xs font-mono font-bold text-slate-500">180 Mins</span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900">
                        Adding Soon!!!
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    GATE {year} Paper
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {parseInt(year) >= 2016 ? '65 Questions • 100 Marks' : '85 Questions • 150 Marks'}
                  </p>
                </div>

                {isAvail ? (
                  <button
                    onClick={() => onStartMock(year)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-600 dark:group-hover:text-white text-slate-900 dark:text-white text-xs font-extrabold transition shadow-2xs"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Launch CBT ({year})</span>
                  </button>
                ) : (
                  <button
                    onClick={() => alert(`Detailed Solved .docx Paper for GATE ${year} is currently being verified. Place ${year}-FULL-SOLVED.docx inside QUESTIONS/PAST YEAR/COMPLETE SOLVED to enable CBT.`)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-xs font-extrabold transition"
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>Adding Soon!!!</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Section-Wise Practice Cards */}
      <div className="space-y-4">
        <div>
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-600" />
            <span>Section-Wise Solved Practice Pool</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Questions extracted from solved papers sorted strictly by syllabus sections and topics.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {GATE_AG_SYLLABUS.map((sec) => {
            const rawTitle = sec.title.replace(/^Section \d+:\s*/, '').trim();
            const normTitle = rawTitle.replace(' and ', ' & ').trim();
            const canonSecName = normalizeSectionName(sec.title);
            const count = sectionCounts[canonSecName] || 0;

            return (
              <div 
                key={sec.id}
                className="card-3d rounded-2xl p-5 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-0.5 rounded-md border border-slate-200 dark:border-slate-700">
                      {sec.code}
                    </span>
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400">{sec.weightage}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base">
                    {normTitle}
                  </h3>
                  <p className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 mt-2">
                    {count} Solved Questions
                  </p>
                </div>

                <button
                  onClick={() => onStartSectionPractice(canonSecName)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900 text-xs font-extrabold hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition shadow-2xs"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Practice Section ({count} Qs)</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
