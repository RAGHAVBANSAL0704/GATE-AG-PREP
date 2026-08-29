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
  Sparkles,
  GraduationCap,
  Gamepad2
} from 'lucide-react';
import { GATE_AG_SYLLABUS } from '../data/syllabus';
import { normalizeSectionTitle } from '../utils/syllabusTaxonomy.js';

const normalizeSectionName = (secName) => {
  if (!secName) return '';
  return normalizeSectionTitle(secName);
};

export default function Dashboard({ questions, mockPapers = [], customMockPapers = [], userStats, onStartMock, onStartSectionPractice, setActiveTab }) {
  const [paperEraFilter, setPaperEraFilter] = useState('all');

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

  const sectionCounts = useMemo(() => {
    const counts = {};
    combinedPool.forEach(q => {
      const norm = normalizeSectionName(q.section);
      counts[norm] = (counts[norm] || 0) + 1;
    });
    return counts;
  }, [combinedPool]);

  const totalQuestions = combinedPool.length;
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
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Sleek Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-blue-200 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>GATE Agricultural Engineering Portal 2026</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
            Master 20 Years of GATE AG Papers
          </h1>

          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed max-w-xl">
            Access {totalQuestions} topic-wise solved questions, 20 official CBT mock tests (2007–2026), and formula cheat sheets.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={() => setActiveTab('practicehub')}
              className="px-5 py-2.5 rounded-xl bg-white text-blue-900 font-extrabold text-xs shadow-md hover:bg-blue-50 transition flex items-center gap-2"
            >
              <Target className="w-4 h-4 text-blue-600" />
              <span>Practice Hub</span>
            </button>
            <button
              onClick={() => setActiveTab('mocktest')}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs transition flex items-center gap-2"
            >
              <Play className="w-4 h-4 text-emerald-400" />
              <span>Attempt PYQ Mocks</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 space-y-1 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Practice Pool</span>
            <HelpCircle className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">
            {totalQuestions}
          </div>
          <p className="text-[10px] text-slate-400 font-medium">Solved Questions</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 space-y-1 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Mock Papers</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">
            {20 + (customMockPapers?.length || 0)}
          </div>
          <p className="text-[10px] text-slate-400 font-medium">PYQs + Custom Mocks</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 space-y-1 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Questions Solved</span>
            <Target className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">
            {attemptedCount}
          </div>
          <p className="text-[10px] font-bold text-emerald-500">Accuracy: {accuracy}%</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 space-y-1 shadow-xs">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Mocks Taken</span>
            <Trophy className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">
            {userStats?.testHistory?.length || 0}
          </div>
          <p className="text-[10px] text-slate-400 font-medium">Full CBT Attempts</p>
        </div>

      </div>

      {/* Hub Shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div 
          onClick={() => setActiveTab('practicehub')}
          className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 cursor-pointer transition flex items-center justify-between group shadow-xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center shrink-0">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-xs text-slate-900 dark:text-white">Practice Hub</h3>
              <p className="text-[10px] text-slate-400">Pools & Speed Tests</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition" />
        </div>

        <div 
          onClick={() => setActiveTab('learninghub')}
          className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 cursor-pointer transition flex items-center justify-between group shadow-xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-600 flex items-center justify-center shrink-0">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-xs text-slate-900 dark:text-white">Learning Hub</h3>
              <p className="text-[10px] text-slate-400">Concepts, Vault & Formulas</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-500 group-hover:translate-x-0.5 transition" />
        </div>

        <div 
          onClick={() => setActiveTab('games')}
          className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 cursor-pointer transition flex items-center justify-between group shadow-xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center shrink-0">
              <Gamepad2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-xs text-slate-900 dark:text-white">Break Zone</h3>
              <p className="text-[10px] text-slate-400">2048 & Refresh Games</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-0.5 transition" />
        </div>
      </div>

      {/* Official GATE PYQ Papers (Compact Vertical Scroll View) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Official GATE PYQ Mocks (2007–2026)</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">20 official CBT papers (Scroll below to view all years).</p>
          </div>

          {/* Era Filter */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold">
            <button
              onClick={() => setPaperEraFilter('all')}
              className={`px-2.5 py-1 rounded-lg transition ${
                paperEraFilter === 'all'
                  ? 'bg-blue-600 text-white shadow-xs font-extrabold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All (20)
            </button>
            <button
              onClick={() => setPaperEraFilter('recent')}
              className={`px-2.5 py-1 rounded-lg transition ${
                paperEraFilter === 'recent'
                  ? 'bg-blue-600 text-white shadow-xs font-extrabold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              2016–2026
            </button>
            <button
              onClick={() => setPaperEraFilter('classic')}
              className={`px-2.5 py-1 rounded-lg transition ${
                paperEraFilter === 'classic'
                  ? 'bg-blue-600 text-white shadow-xs font-extrabold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              2007–2015
            </button>
          </div>
        </div>

        {/* Compact Scroll Container */}
        <div className="max-h-56 overflow-y-auto pr-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {filteredYears.map((year) => {
              const historyItem = paperHistoryMap[year];
              const paperObj = paperMap[year];
              const isAvail = paperObj?.has_solved_docx === true;

              return (
                <div 
                  key={year}
                  onClick={() => isAvail && onStartMock(year)}
                  className={`p-2.5 rounded-xl border text-center transition flex flex-col justify-between space-y-1.5 select-none cursor-pointer ${
                    isAvail
                      ? 'bg-slate-50 hover:bg-blue-50 dark:bg-slate-950 dark:hover:bg-blue-950/40 border-slate-200 dark:border-slate-800 hover:border-blue-400'
                      : 'bg-slate-50/50 dark:bg-slate-950/40 border-slate-200/50 dark:border-slate-900 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-extrabold text-blue-600 dark:text-blue-400">
                      GATE {year}
                    </span>
                    {historyItem ? (
                      <span className="text-[9px] font-mono font-bold text-emerald-500">
                        {historyItem.score} pts
                      </span>
                    ) : (
                      <span className="text-[9px] text-slate-400">180m</span>
                    )}
                  </div>

                  <div className="text-[10px] font-bold text-slate-700 dark:text-slate-300">
                    {parseInt(year) >= 2016 ? '65 Qs • 100 M' : '85 Qs • 150 M'}
                  </div>

                  <button
                    disabled={!isAvail}
                    className={`w-full py-1 rounded-lg text-[10px] font-extrabold transition flex items-center justify-center gap-1 ${
                      isAvail
                        ? 'bg-blue-600 text-white shadow-xs hover:bg-blue-700'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                    }`}
                  >
                    <Play className="w-3 h-3" />
                    <span>Launch</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Custom Mock Papers Section (Compact Vertical Scroll View) */}
      {customMockPapers && customMockPapers.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span>Custom Mock Papers (GATE 2027)</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Attempt custom mock papers (Scroll below to view all papers).</p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
              {customMockPapers.length} Papers
            </span>
          </div>

          {/* Compact Scroll Container */}
          <div className="max-h-56 overflow-y-auto pr-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {customMockPapers.map((paper, idx) => (
                <div 
                  key={paper.id || idx}
                  onClick={() => onStartMock(paper)}
                  className="p-2.5 rounded-xl border border-purple-200/70 dark:border-purple-900/50 bg-purple-50/30 dark:bg-purple-950/20 hover:bg-purple-50 dark:hover:bg-purple-950/40 text-center transition flex flex-col justify-between space-y-1.5 cursor-pointer hover:border-purple-400"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-extrabold text-purple-600 dark:text-purple-400 truncate max-w-[100px]">
                      {paper.title || `Mock ${idx + 1}`}
                    </span>
                    <span className="text-[9px] text-slate-400 shrink-0">180m</span>
                  </div>

                  <div className="text-[10px] font-bold text-slate-700 dark:text-slate-300">
                    {(paper.questions || []).length || 65} Qs • 100 M
                  </div>

                  <button
                    className="w-full py-1 rounded-lg text-[10px] font-extrabold bg-purple-600 text-white shadow-xs hover:bg-purple-700 transition flex items-center justify-center gap-1"
                  >
                    <Play className="w-3 h-3" />
                    <span>Launch</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Section Practice Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-500" />
            <span>Section-Wise Practice</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Solve questions sorted by official syllabus sections (Includes PYQs & Custom Mock questions).</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {GATE_AG_SYLLABUS.map((sec) => {
            const canonSecName = normalizeSectionTitle(sec.title);
            const count = sectionCounts[canonSecName] || 0;

            return (
              <div 
                key={sec.id}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-3 hover:border-emerald-400 transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400">
                      {sec.code}
                    </span>
                    <span className="text-[10px] font-bold text-amber-500">{sec.weightage}</span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-xs leading-tight">
                    {sec.title}
                  </h3>
                  <p className="text-[11px] font-mono text-slate-400 mt-1">
                    {count} Solved Qs
                  </p>
                </div>

                <button
                  onClick={() => onStartSectionPractice(canonSecName)}
                  className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs flex items-center justify-center gap-1.5"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Practice ({count} Qs)</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
