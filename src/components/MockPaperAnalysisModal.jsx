import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  Layers, 
  BookOpen, 
  Sparkles, 
  X, 
  ChevronDown, 
  ChevronRight, 
  Search, 
  Play, 
  CheckCircle2, 
  Target, 
  Award, 
  FileText, 
  Hash, 
  ArrowRight,
  TrendingUp,
  PieChart,
  Percent
} from 'lucide-react';
import { normalizeSectionTitle, getOfficialSections } from '../utils/syllabusTaxonomy.js';

const SECTION_COLOR_PALETTE = {
  'General Aptitude': {
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    border: 'border-amber-200 dark:border-amber-800',
    bar: 'bg-amber-500',
    text: 'text-amber-700 dark:text-amber-300',
    badge: 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800'
  },
  'Section 8: General Aptitude': {
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    border: 'border-amber-200 dark:border-amber-800',
    bar: 'bg-amber-500',
    text: 'text-amber-700 dark:text-amber-300',
    badge: 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800'
  },
  'Section 1: Engineering Mathematics': {
    bg: 'bg-indigo-50 dark:bg-indigo-950/40',
    border: 'border-indigo-200 dark:border-indigo-800',
    bar: 'bg-indigo-500',
    text: 'text-indigo-700 dark:text-indigo-300',
    badge: 'bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800'
  },
  'Section 2: Farm Machinery': {
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    border: 'border-emerald-200 dark:border-emerald-800',
    bar: 'bg-emerald-500',
    text: 'text-emerald-700 dark:text-emerald-300',
    badge: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
  },
  'Section 3: Farm Power': {
    bg: 'bg-yellow-50 dark:bg-yellow-950/40',
    border: 'border-yellow-200 dark:border-yellow-800',
    bar: 'bg-yellow-500',
    text: 'text-yellow-700 dark:text-yellow-300',
    badge: 'bg-yellow-100 dark:bg-yellow-950 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-800'
  },
  'Section 4: Soil and Water Conservation Engineering': {
    bg: 'bg-sky-50 dark:bg-sky-950/40',
    border: 'border-sky-200 dark:border-sky-800',
    bar: 'bg-sky-500',
    text: 'text-sky-700 dark:text-sky-300',
    badge: 'bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 border-sky-300 dark:border-sky-800'
  },
  'Section 5: Irrigation and Drainage Engineering': {
    bg: 'bg-cyan-50 dark:bg-cyan-950/40',
    border: 'border-cyan-200 dark:border-cyan-800',
    bar: 'bg-cyan-500',
    text: 'text-cyan-700 dark:text-cyan-300',
    badge: 'bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border-cyan-300 dark:border-cyan-800'
  },
  'Section 6: Agricultural Process Engineering': {
    bg: 'bg-purple-50 dark:bg-purple-950/40',
    border: 'border-purple-200 dark:border-purple-800',
    bar: 'bg-purple-500',
    text: 'text-purple-700 dark:text-purple-300',
    badge: 'bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border-purple-300 dark:border-purple-800'
  },
  'Section 7: Dairy and Food Engineering': {
    bg: 'bg-rose-50 dark:bg-rose-950/40',
    border: 'border-rose-200 dark:border-rose-800',
    bar: 'bg-rose-500',
    text: 'text-rose-700 dark:text-rose-300',
    badge: 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800'
  }
};

const DEFAULT_PALETTE = {
  bg: 'bg-blue-50 dark:bg-blue-950/40',
  border: 'border-blue-200 dark:border-blue-800',
  bar: 'bg-blue-500',
  text: 'text-blue-700 dark:text-blue-300',
  badge: 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-800'
};

export default function MockPaperAnalysisModal({
  isOpen,
  onClose,
  paper,
  allPapers = [],
  onSelectPaper,
  onStartPaper
}) {
  const [activeTab, setActiveTab] = useState('visuals'); // 'visuals' | 'hierarchy' | 'questions'
  const [expandedSections, setExpandedSections] = useState({});
  const [expandedTopics, setExpandedTopics] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [sectionFilter, setSectionFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');

  const questions = useMemo(() => {
    return Array.isArray(paper?.questions) ? paper.questions : [];
  }, [paper]);

  // Aggregate Section, Topic, and Subtopic Hierarchy & Weightages
  const { sectionStats, typeStats, markStats, topTopics, totalMarks } = useMemo(() => {
    const secMap = {};
    const tStats = {
      MCQ: { count: 0, marks: 0 },
      MSQ: { count: 0, marks: 0 },
      NAT: { count: 0, marks: 0 }
    };
    const mStats = {
      oneMark: { count: 0, marks: 0 },
      twoMark: { count: 0, marks: 0 }
    };
    let totalM = 0;

    questions.forEach((q, idx) => {
      const marks = Number(q.marks || 1);
      totalM += marks;

      // Question Type
      const qType = (q.type || 'MCQ').toUpperCase();
      if (tStats[qType]) {
        tStats[qType].count += 1;
        tStats[qType].marks += marks;
      }

      // Mark Distribution
      if (marks === 1) {
        mStats.oneMark.count += 1;
        mStats.oneMark.marks += 1;
      } else {
        mStats.twoMark.count += 1;
        mStats.twoMark.marks += 2;
      }

      // Section
      const secTitle = normalizeSectionTitle(q.section) || 'General Technical';
      if (!secMap[secTitle]) {
        secMap[secTitle] = {
          section: secTitle,
          totalMarks: 0,
          questionCount: 0,
          mcqMarks: 0,
          msqMarks: 0,
          natMarks: 0,
          topicsMap: {},
          questions: []
        };
      }

      secMap[secTitle].totalMarks += marks;
      secMap[secTitle].questionCount += 1;
      if (qType === 'MCQ') secMap[secTitle].mcqMarks += marks;
      if (qType === 'MSQ') secMap[secTitle].msqMarks += marks;
      if (qType === 'NAT') secMap[secTitle].natMarks += marks;
      secMap[secTitle].questions.push(q);

      // Topic
      const topicName = q.topic && q.topic.trim() && q.topic !== 'None' ? q.topic.trim() : 'Core Principles';
      if (!secMap[secTitle].topicsMap[topicName]) {
        secMap[secTitle].topicsMap[topicName] = {
          topic: topicName,
          section: secTitle,
          totalMarks: 0,
          questionCount: 0,
          subtopicsMap: {},
          questions: []
        };
      }
      secMap[secTitle].topicsMap[topicName].totalMarks += marks;
      secMap[secTitle].topicsMap[topicName].questionCount += 1;
      secMap[secTitle].topicsMap[topicName].questions.push(q);

      // Subtopic
      const subtopicName = q.subtopic && q.subtopic.trim() && q.subtopic !== 'None' ? q.subtopic.trim() : topicName;
      if (!secMap[secTitle].topicsMap[topicName].subtopicsMap[subtopicName]) {
        secMap[secTitle].topicsMap[topicName].subtopicsMap[subtopicName] = {
          subtopic: subtopicName,
          topic: topicName,
          section: secTitle,
          totalMarks: 0,
          questionCount: 0,
          questions: []
        };
      }
      secMap[secTitle].topicsMap[topicName].subtopicsMap[subtopicName].totalMarks += marks;
      secMap[secTitle].topicsMap[topicName].subtopicsMap[subtopicName].questionCount += 1;
      secMap[secTitle].topicsMap[topicName].subtopicsMap[subtopicName].questions.push(q);
    });

    // Rank Sections by Marks descending
    const sList = Object.values(secMap).sort((a, b) => b.totalMarks - a.totalMarks);

    // Rank Top Topics across the whole paper
    const allTopics = [];
    sList.forEach(s => {
      Object.values(s.topicsMap).forEach(t => {
        allTopics.push({
          topic: t.topic,
          section: s.section,
          totalMarks: t.totalMarks,
          questionCount: t.questionCount,
          subtopicCount: Object.keys(t.subtopicsMap).length,
          questions: t.questions
        });
      });
    });
    allTopics.sort((a, b) => b.totalMarks - a.totalMarks);

    return {
      sectionStats: sList,
      typeStats: tStats,
      markStats: mStats,
      topTopics: allTopics,
      totalMarks: totalM || 100
    };
  }, [questions]);

  // Toggle Section Accordion
  const toggleSection = (secName) => {
    setExpandedSections(prev => ({
      ...prev,
      [secName]: !prev[secName]
    }));
  };

  // Toggle Topic Accordion
  const toggleTopic = (topicKey) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topicKey]: !prev[topicKey]
    }));
  };

  // Filtered Question List for the Question Matrix Tab
  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      if (sectionFilter !== 'ALL' && normalizeSectionTitle(q.section) !== normalizeSectionTitle(sectionFilter)) return false;
      if (typeFilter !== 'ALL' && (q.type || 'MCQ').toUpperCase() !== typeFilter) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const text = `${q.qnum} ${q.section} ${q.topic} ${q.subtopic} ${q.question}`.toLowerCase();
        if (!text.includes(query)) return false;
      }
      return true;
    });
  }, [questions, sectionFilter, typeFilter, searchQuery]);

  if (!isOpen || !paper) return null;

  return (
    <div className="fixed inset-0 z-[130] bg-slate-950/80 backdrop-blur-md overflow-y-auto p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="max-w-5xl mx-auto my-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Header */}
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-600/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shadow-xs">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] uppercase font-mono font-extrabold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-800">
                  Mock Blueprint Analysis
                </span>
                <span className="text-xs font-mono text-slate-500">
                  {paper.year || '2027'} &bull; 65 Qs &bull; 100.00 Marks
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight mt-0.5">
                {paper.title || 'Custom Mock Test'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Switcher Dropdown */}
            {allPapers.length > 1 && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300">
                <FileText className="w-3.5 h-3.5 text-blue-500" />
                <select
                  value={paper.id || paper.title}
                  onChange={(e) => {
                    const sel = allPapers.find(p => (p.id || p.title) === e.target.value);
                    if (sel && onSelectPaper) onSelectPaper(sel);
                  }}
                  className="bg-transparent outline-none cursor-pointer text-xs font-bold text-slate-800 dark:text-slate-200 max-w-[150px] sm:max-w-[200px] truncate"
                >
                  {allPapers.map((p, idx) => (
                    <option key={p.id || idx} value={p.id || p.title} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              title="Close Analysis"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View Mode Navigation Tabs */}
        <div className="px-5 py-2.5 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setActiveTab('visuals')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                activeTab === 'visuals'
                  ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <PieChart className="w-3.5 h-3.5" />
              <span>Weightage Visuals & Charts</span>
            </button>

            <button
              onClick={() => setActiveTab('hierarchy')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                activeTab === 'hierarchy'
                  ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Section &rarr; Topic &rarr; Subtopic</span>
            </button>

            <button
              onClick={() => setActiveTab('questions')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                activeTab === 'questions'
                  ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Question Blueprint Matrix ({questions.length})</span>
            </button>
          </div>

          {onStartPaper && (
            <button
              onClick={() => {
                onClose();
                onStartPaper(paper);
              }}
              className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-xs transition active:scale-95 cursor-pointer ml-auto"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Start This CBT Mock</span>
            </button>
          )}
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          
          {/* TAB 1: VISUALS & CHARTS */}
          {activeTab === 'visuals' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              
              {/* Macro Summary Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="text-[10px] uppercase font-bold text-slate-500">Total Marks</div>
                  <div className="text-xl font-black text-slate-900 dark:text-white font-mono">{totalMarks}.00</div>
                  <div className="text-[10px] text-slate-400">100% GATE Syllabus Aligned</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="text-[10px] uppercase font-bold text-slate-500">General Aptitude</div>
                  <div className="text-xl font-black text-amber-600 dark:text-amber-400 font-mono">15 Marks</div>
                  <div className="text-[10px] text-slate-400">10 Questions (Q.1 to Q.10)</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="text-[10px] uppercase font-bold text-slate-500">Technical Sections</div>
                  <div className="text-xl font-black text-blue-600 dark:text-blue-400 font-mono">85 Marks</div>
                  <div className="text-[10px] text-slate-400">55 Questions (Q.11 to Q.65)</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="text-[10px] uppercase font-bold text-slate-500">Unique Subtopics</div>
                  <div className="text-xl font-black text-purple-600 dark:text-purple-400 font-mono">{topTopics.length} Topics</div>
                  <div className="text-[10px] text-slate-400">Broad Syllabus Spread</div>
                </div>
              </div>

              {/* Section-Wise Weightage Bar Chart Meter */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                      Section-Wise Marks Distribution (Total: {totalMarks} Marks)
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">Share of 100 Marks</span>
                </div>

                {/* Stacked Percentage Bar */}
                <div className="w-full h-4 rounded-full overflow-hidden flex bg-slate-200 dark:bg-slate-800 shadow-inner">
                  {sectionStats.map((sec, idx) => {
                    const pct = ((sec.totalMarks / totalMarks) * 100);
                    const pal = SECTION_COLOR_PALETTE[sec.section] || DEFAULT_PALETTE;
                    return (
                      <div
                        key={idx}
                        className={`${pal.bar} h-full transition-all duration-300 relative group cursor-pointer`}
                        style={{ width: `${pct}%` }}
                        title={`${sec.section}: ${sec.totalMarks} Marks (${pct.toFixed(1)}%)`}
                      />
                    );
                  })}
                </div>

                {/* Section Cards with Individual Weightage Meters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {sectionStats.map((sec, idx) => {
                    const pct = ((sec.totalMarks / totalMarks) * 100).toFixed(1);
                    const pal = SECTION_COLOR_PALETTE[sec.section] || DEFAULT_PALETTE;
                    return (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-xl border ${pal.border} ${pal.bg} space-y-2`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-extrabold text-xs text-slate-900 dark:text-white leading-tight">
                              {sec.section}
                            </h4>
                            <span className="text-[10px] text-slate-500 font-mono">
                              {sec.questionCount} Questions &bull; {sec.totalMarks} Marks
                            </span>
                          </div>
                          <span className={`text-xs font-mono font-black px-2 py-0.5 rounded-md ${pal.badge}`}>
                            {pct}%
                          </span>
                        </div>

                        {/* Progress Meter */}
                        <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                          <div
                            className={`${pal.bar} h-full rounded-full`}
                            style={{ width: `${Math.min(100, (sec.totalMarks / 25) * 100)}%` }}
                          />
                        </div>

                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                          <span>MCQ: {sec.mcqMarks}M</span>
                          <span>MSQ: {sec.msqMarks}M</span>
                          <span>NAT: {sec.natMarks}M</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Question Types & Mark Distribution Dual Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* 1. Question Formats (MCQ / MSQ / NAT) */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 pb-1 border-b border-slate-200 dark:border-slate-800">
                    <Target className="w-4 h-4 text-emerald-500" />
                    <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                      Question Type Composition
                    </h3>
                  </div>

                  <div className="space-y-2.5 pt-1">
                    {['MCQ', 'MSQ', 'NAT'].map(t => {
                      const data = typeStats[t] || { count: 0, marks: 0 };
                      const pct = questions.length > 0 ? ((data.count / questions.length) * 100).toFixed(1) : 0;
                      const color = t === 'MCQ' ? 'bg-blue-500' : t === 'MSQ' ? 'bg-purple-500' : 'bg-emerald-500';

                      return (
                        <div key={t} className="space-y-1">
                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className="font-extrabold text-slate-800 dark:text-slate-200">{t} Format</span>
                            <span className="text-slate-500">{data.count} Qs ({data.marks} Marks &bull; {pct}%)</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                            <div className={`${color} h-full rounded-full`} style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 2. 1-Mark vs 2-Mark Distribution */}
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 pb-1 border-b border-slate-200 dark:border-slate-800">
                    <Award className="w-4 h-4 text-amber-500" />
                    <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                      Marks Weightage Composition
                    </h3>
                  </div>

                  <div className="space-y-2.5 pt-1">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="font-extrabold text-slate-800 dark:text-slate-200">1-Mark Questions (Standard)</span>
                        <span className="text-slate-500">{markStats.oneMark.count} Qs ({markStats.oneMark.marks} Marks)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        <div 
                          className="bg-indigo-500 h-full rounded-full" 
                          style={{ width: `${(markStats.oneMark.marks / totalMarks) * 100}%` }} 
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="font-extrabold text-slate-800 dark:text-slate-200">2-Mark Questions (Advanced NAT/MSQ)</span>
                        <span className="text-slate-500">{markStats.twoMark.count} Qs ({markStats.twoMark.marks} Marks)</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        <div 
                          className="bg-purple-500 h-full rounded-full" 
                          style={{ width: `${(markStats.twoMark.marks / totalMarks) * 100}%` }} 
                        />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* High-Yield Top Topics Ranked Horizontal Chart */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                      Top High-Yield Topics Ranked by Marks in this Paper
                    </h3>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">Top {Math.min(10, topTopics.length)} Topics</span>
                </div>

                <div className="space-y-3">
                  {topTopics.slice(0, 10).map((t, idx) => {
                    const pct = ((t.totalMarks / totalMarks) * 100).toFixed(1);
                    const pal = SECTION_COLOR_PALETTE[t.section] || DEFAULT_PALETTE;

                    return (
                      <div key={idx} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2 truncate max-w-[70%]">
                            <span className="font-mono text-[10px] font-bold text-slate-400">#{idx + 1}</span>
                            <span className="font-bold text-slate-900 dark:text-white truncate">{t.topic}</span>
                            <span className="text-[10px] text-slate-400 truncate hidden sm:inline">({t.section.replace(/Section \d+: /, '')})</span>
                          </div>
                          <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
                            {t.totalMarks} Marks <span className="text-slate-400 font-normal">({t.questionCount} Qs &bull; {pct}%)</span>
                          </span>
                        </div>

                        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                          <div 
                            className={`${pal.bar} h-full rounded-full transition-all duration-300`} 
                            style={{ width: `${Math.min(100, (t.totalMarks / 12) * 100)}%` }} 
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: SECTION -> TOPIC -> SUBTOPIC HIERARCHY */}
          {activeTab === 'hierarchy' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                <p className="text-xs text-slate-500">
                  Expand any section to inspect the exact tested topics, subtopics, question counts, and assigned marks.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const allSec = {};
                      sectionStats.forEach(s => allSec[s.section] = true);
                      setExpandedSections(allSec);
                    }}
                    className="text-[11px] font-bold text-purple-600 dark:text-purple-400 hover:underline cursor-pointer"
                  >
                    Expand All
                  </button>
                  <span className="text-slate-400">&bull;</span>
                  <button
                    onClick={() => setExpandedSections({})}
                    className="text-[11px] font-bold text-slate-500 hover:underline cursor-pointer"
                  >
                    Collapse All
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {sectionStats.map((sec, idx) => {
                  const isExpanded = !!expandedSections[sec.section];
                  const pal = SECTION_COLOR_PALETTE[sec.section] || DEFAULT_PALETTE;
                  const topicsList = Object.values(sec.topicsMap).sort((a, b) => b.totalMarks - a.totalMarks);

                  return (
                    <div
                      key={idx}
                      className={`rounded-2xl border ${pal.border} ${pal.bg} overflow-hidden transition`}
                    >
                      {/* Section Accordion Header */}
                      <button
                        onClick={() => toggleSection(sec.section)}
                        className="w-full p-4 flex items-center justify-between text-left hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          {isExpanded ? <ChevronDown className="w-4 h-4 text-slate-500" /> : <ChevronRight className="w-4 h-4 text-slate-500" />}
                          <div>
                            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                              {sec.section}
                            </h3>
                            <span className="text-xs font-mono text-slate-500">
                              {sec.questionCount} Questions &bull; {sec.totalMarks} Marks &bull; {topicsList.length} Topics
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-mono font-black px-2.5 py-1 rounded-lg ${pal.badge}`}>
                            {sec.totalMarks} Marks
                          </span>
                        </div>
                      </button>

                      {/* Section Content: Topics & Subtopics */}
                      {isExpanded && (
                        <div className="p-4 pt-0 space-y-3 border-t border-slate-200/50 dark:border-slate-800/50 bg-white/70 dark:bg-slate-900/70">
                          {topicsList.map((top, tIdx) => {
                            const topicKey = `${sec.section}:::${top.topic}`;
                            const isTopicExpanded = expandedTopics[topicKey] !== false; // default expanded
                            const subtopicsList = Object.values(top.subtopicsMap).sort((a, b) => b.totalMarks - a.totalMarks);

                            return (
                              <div
                                key={tIdx}
                                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 space-y-2 shadow-xs"
                              >
                                <div 
                                  onClick={() => toggleTopic(topicKey)}
                                  className="flex items-center justify-between cursor-pointer group"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                    <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 group-hover:text-purple-600 transition">
                                      {top.topic}
                                    </h4>
                                  </div>
                                  <div className="flex items-center gap-2 font-mono text-xs text-slate-500">
                                    <span>{top.questionCount} Qs &bull; {top.totalMarks} Marks</span>
                                    {isTopicExpanded ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                                  </div>
                                </div>

                                {isTopicExpanded && (
                                  <div className="pl-3.5 space-y-1.5 pt-1 border-l-2 border-purple-200 dark:border-purple-900">
                                    {subtopicsList.map((sub, sIdx) => (
                                      <div
                                        key={sIdx}
                                        className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950/70 text-xs flex flex-wrap items-center justify-between gap-2"
                                      >
                                        <div>
                                          <span className="font-bold text-slate-700 dark:text-slate-300">
                                            {sub.subtopic}
                                          </span>
                                          <div className="flex items-center gap-1 mt-0.5">
                                            {sub.questions.map((q, qIdx) => (
                                              <span
                                                key={qIdx}
                                                className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
                                                title={`${q.type} • ${q.marks} Mark(s)`}
                                              >
                                                Q.{q.qnum || q.id} ({q.type})
                                              </span>
                                            ))}
                                          </div>
                                        </div>

                                        <span className="font-mono text-[11px] font-extrabold text-purple-600 dark:text-purple-400">
                                          {sub.totalMarks} M
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                )}
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

          {/* TAB 3: COMPLETE QUESTION BLUEPRINT MATRIX */}
          {activeTab === 'questions' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              
              {/* Search & Filter Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs">
                <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                  <Search className="w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by topic, subtopic, or keywords..."
                    className="w-full bg-transparent outline-none text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400"
                  />
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <select
                    value={sectionFilter}
                    onChange={(e) => setSectionFilter(e.target.value)}
                    className="px-2.5 py-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 outline-none cursor-pointer"
                  >
                    <option value="ALL">All Sections</option>
                    {sectionStats.map((s, idx) => (
                      <option key={idx} value={s.section}>{s.section}</option>
                    ))}
                  </select>

                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="px-2.5 py-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 outline-none cursor-pointer"
                  >
                    <option value="ALL">All Types</option>
                    <option value="MCQ">MCQ Only</option>
                    <option value="MSQ">MSQ Only</option>
                    <option value="NAT">NAT Only</option>
                  </select>
                </div>
              </div>

              {/* Table of Questions */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="py-3 px-3">Q#</th>
                      <th className="py-3 px-3">Section</th>
                      <th className="py-3 px-3">Topic & Subtopic</th>
                      <th className="py-3 px-3">Type</th>
                      <th className="py-3 px-3">Marks</th>
                      <th className="py-3 px-3">Preview</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-sans">
                    {filteredQuestions.map((q, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                        <td className="py-2.5 px-3 font-mono font-extrabold text-slate-900 dark:text-white whitespace-nowrap">
                          Q.{q.qnum || (idx + 1)}
                        </td>
                        <td className="py-2.5 px-3 font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">
                          {q.section?.replace(/Section \d+: /, '') || 'Technical'}
                        </td>
                        <td className="py-2.5 px-3 max-w-[240px] truncate">
                          <span className="font-bold text-slate-900 dark:text-slate-100 block truncate">
                            {q.topic || 'General'}
                          </span>
                          <span className="text-[10px] text-purple-600 dark:text-purple-400 block truncate">
                            {q.subtopic || q.topic || 'Core Concept'}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 whitespace-nowrap">
                          <span className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded ${
                            q.type === 'MCQ' 
                              ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300' 
                              : q.type === 'MSQ' 
                              ? 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300' 
                              : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                          }`}>
                            {q.type}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 font-mono font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                          {q.marks || 1}M
                        </td>
                        <td className="py-2.5 px-3 text-slate-500 max-w-[320px] truncate">
                          {q.question?.slice(0, 80)}...
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Footer */}
        <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-slate-500 font-mono text-[11px]">
            GATE AG Examination Pattern: 65 Questions &bull; 100 Marks &bull; Negative marking on MCQs only
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold transition cursor-pointer"
            >
              Close
            </button>
            {onStartPaper && (
              <button
                onClick={() => {
                  onClose();
                  onStartPaper(paper);
                }}
                className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold shadow-xs transition active:scale-95 flex items-center gap-1.5 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Attempt This Paper in CBT Mode</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
