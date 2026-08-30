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
  Quote
} from 'lucide-react';
import { GATE_AG_SYLLABUS } from '../data/syllabus';
import { normalizeSectionTitle } from '../utils/syllabusTaxonomy.js';

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
      
      {/* Inspiring Swami Vivekananda Hero Banner with Full Akhand Bharat Satellite Relief */}
      <div className="relative overflow-hidden bg-slate-950 text-white rounded-3xl border border-amber-500/40 shadow-2xl min-h-[340px]">
        
        {/* Photorealistic Akhand Bharat Satellite Relief Backdrop - Fully Zoomed Out & Centered */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-95 pointer-events-none transition duration-1000 filter brightness-105 contrast-110"
          style={{ backgroundImage: "url('/images/akhand_bharat_backdrop.jpg')" }}
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
              Harness your boundless potential to conquer GATE 2026. Access <strong>{totalQuestions} solved questions</strong>, <strong>20 official CBT mock tests</strong>, and comprehensive formula archives.
            </p>
          </div>

          {/* Right / Image Column - Authentic Historical Portrait */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative group max-w-[220px] sm:max-w-[250px] w-full">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500/60 via-orange-500/50 to-amber-600/60 rounded-3xl blur-md opacity-85 group-hover:opacity-100 transition duration-500"></div>
              
              <div className="relative rounded-3xl overflow-hidden border-2 border-amber-400/60 shadow-2xl bg-slate-950 aspect-[3/4]">
                <img 
                  src="/images/swami_vivekananda_real_portrait.jpg" 
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

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm hover:border-blue-500/40 transition">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-xs">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Pool</span>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
              {totalQuestions}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Solved Questions</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm hover:border-emerald-500/40 transition">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Mock Tests</span>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
              {20 + (customMockPapers?.length || 0)}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">PYQs + Custom Mocks</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm hover:border-purple-500/40 transition">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shadow-xs">
              <Target className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Solved Qs</span>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
              {attemptedCount}
            </div>
            <p className="text-xs font-bold text-emerald-500 mt-0.5 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Accuracy: {accuracy}%</span>
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm hover:border-amber-500/40 transition">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-xs">
              <Trophy className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Attempts</span>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
              {userStats?.testHistory?.length || 0}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">Full CBT Attempts</p>
          </div>
        </div>

      </div>

      {/* Hub Shortcuts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          onClick={() => setActiveTab('practicehub')}
          className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 hover:border-blue-500 cursor-pointer transition flex items-center justify-between group shadow-sm hover:shadow-md"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Practice Hub</h3>
              <p className="text-xs text-slate-400 mt-0.5">Pools & Speed Tests</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition" />
        </div>

        <div 
          onClick={() => setActiveTab('learninghub')}
          className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 hover:border-purple-500 cursor-pointer transition flex items-center justify-between group shadow-sm hover:shadow-md"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Learning Hub</h3>
              <p className="text-xs text-slate-400 mt-0.5">Concepts & Vault</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-purple-500 group-hover:translate-x-1 transition" />
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
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                Official GATE PYQ Mocks (2007–2026)
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">20 official CBT papers (Scroll below to view all years).</p>
            </div>
          </div>

          {/* Era Filter */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold">
            <button
              onClick={() => setPaperEraFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition ${
                paperEraFilter === 'all'
                  ? 'bg-blue-600 text-white shadow-xs font-extrabold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All (20)
            </button>
            <button
              onClick={() => setPaperEraFilter('recent')}
              className={`px-3 py-1.5 rounded-lg transition ${
                paperEraFilter === 'recent'
                  ? 'bg-blue-600 text-white shadow-xs font-extrabold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              2016–2026
            </button>
            <button
              onClick={() => setPaperEraFilter('classic')}
              className={`px-3 py-1.5 rounded-lg transition ${
                paperEraFilter === 'classic'
                  ? 'bg-blue-600 text-white shadow-xs font-extrabold'
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
              const isAvail = paperObj?.has_solved_docx === true;

              return (
                <div 
                  key={year}
                  onClick={() => isAvail && onStartMock(year)}
                  className={`p-3 rounded-2xl border text-center transition flex flex-col justify-between space-y-2 select-none cursor-pointer group ${
                    isAvail
                      ? 'bg-slate-50 hover:bg-blue-50 dark:bg-slate-950 dark:hover:bg-blue-950/40 border-slate-200 dark:border-slate-800 hover:border-blue-500 shadow-2xs hover:shadow-sm'
                      : 'bg-slate-50/50 dark:bg-slate-950/40 border-slate-200/50 dark:border-slate-900 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-extrabold text-blue-600 dark:text-blue-400">
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
                    disabled={!isAvail}
                    className={`w-full py-1.5 rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-1.5 ${
                      isAvail
                        ? 'bg-blue-600 text-white shadow-xs group-hover:bg-blue-700'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                    }`}
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

      {/* Custom Mock Papers Section */}
      {customMockPapers && customMockPapers.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Custom Mock Papers (GATE 2027)
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">Full-length curated mock papers with solution keys.</p>
              </div>
            </div>
            <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
              {customMockPapers.length} Papers
            </span>
          </div>

          {/* Scroll Container */}
          <div className="max-h-60 overflow-y-auto pr-1">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {customMockPapers.map((paper, idx) => (
                <div 
                  key={paper.id || idx}
                  onClick={() => onStartMock(paper)}
                  className="p-3 rounded-2xl border border-purple-200/70 dark:border-purple-900/50 bg-purple-50/30 dark:bg-purple-950/20 hover:bg-purple-50 dark:hover:bg-purple-950/40 text-center transition flex flex-col justify-between space-y-2 cursor-pointer hover:border-purple-400 shadow-2xs group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-extrabold text-purple-600 dark:text-purple-400 truncate max-w-[100px]">
                      {paper.title || `Mock ${idx + 1}`}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 shrink-0">180m</span>
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
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Section Practice Grid */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
              Section-Wise Practice
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Solve questions sorted by official syllabus sections (Includes PYQs & Custom Mock questions).</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {GATE_AG_SYLLABUS.map((sec) => {
            const canonSecName = normalizeSectionTitle(sec.title);
            const count = sectionCounts[canonSecName] || 0;
            const SecIcon = getSectionIcon(sec.code);

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
                  <p className="text-xs font-mono text-slate-400 mt-1 font-semibold">
                    {count} Solved Qs
                  </p>
                </div>

                <button
                  onClick={() => onStartSectionPractice(canonSecName)}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition shadow-xs flex items-center justify-center gap-2 active:scale-95"
                >
                  <Layers className="w-4 h-4" />
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
