import React, { useState, useEffect } from 'react';
import { 
  Filter, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Bookmark, 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  RotateCcw,
  Calculator,
  Sparkles,
  BookOpen,
  Layers,
  GraduationCap,
  Image as ImageIcon,
  FileText,
  Clock,
  Play,
  ArrowLeft,
  Shuffle,
  Edit3
} from 'lucide-react';
import MathRenderer from './MathRenderer';
import ConceptStudyModal from './ConceptStudyModal';
import { GATE_AG_SYLLABUS } from '../data/syllabus';

const SECTION_NORM_MAP = {
  'farm power and machinery': 'Farm Power and Machinery',
  'farm machinery & power': 'Farm Power and Machinery',
  'farm machinery and power': 'Farm Power and Machinery',
  'farm power': 'Farm Power and Machinery',
  'soil and water conservation engineering': 'Soil and Water Conservation Engineering',
  'soil & water conservation engineering': 'Soil and Water Conservation Engineering',
  'agricultural process engineering': 'Agricultural Process Engineering',
  'agricultural processing engineering': 'Agricultural Process Engineering',
  'engineering mathematics': 'Engineering Mathematics',
  'general aptitude': 'General Aptitude'
};

const normSec = (s) => {
  if (!s || s === 'All') return 'All';
  const low = s.toLowerCase().trim();
  for (const [k, v] of Object.entries(SECTION_NORM_MAP)) {
    if (low.includes(k)) return v;
  }
  return s;
};

const formatSec = (secs) => {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

export default function PracticeMode({ questions, customMockPapers = [], bookmarks, onToggleBookmark, initialSection, onOpenCalc, onEditQuestion }) {
  const [isHubActive, setIsHubActive] = useState(() => !initialSection || initialSection === 'All');
  const [sourceFilter, setSourceFilter] = useState('All'); // 'All' | 'Official GATE PYQs' | 'Custom Mock Questions'
  const [selectedSection, setSelectedSection] = useState(() => normSec(initialSection) || 'All');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [selectedSubtopic, setSelectedSubtopic] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedMarks, setSelectedMarks] = useState('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');
  const [activeSolutionTab, setActiveSolutionTab] = useState('solution'); // 'solution' | 'notes'

  // Personal question notes stored in localStorage
  const [questionNotes, setQuestionNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('gate_ag_question_notes');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const handleSaveNote = (qId, noteText) => {
    const updated = { ...questionNotes, [qId]: noteText };
    setQuestionNotes(updated);
    try {
      localStorage.setItem('gate_ag_question_notes', JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save note", e);
    }
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [submittedState, setSubmittedState] = useState({});
  const [showSolution, setShowSolution] = useState({});
  const [activeConceptQuestion, setActiveConceptQuestion] = useState(null);

  // Real-time clock and session elapsed timer
  const [realTimeStr, setRealTimeStr] = useState(() => new Date().toLocaleTimeString());
  const [sessionElapsedSec, setSessionElapsedSec] = useState(0);

  useEffect(() => {
    const clockInterval = setInterval(() => {
      setRealTimeStr(new Date().toLocaleTimeString());
      setSessionElapsedSec(prev => prev + 1);
    }, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  useEffect(() => {
    if (initialSection && initialSection !== 'All') {
      setSelectedSection(normSec(initialSection));
      setSelectedTopic('All');
      setSelectedSubtopic('All');
      setIsHubActive(false);
    }
  }, [initialSection]);

  const customQuestionsPool = (customMockPapers || []).flatMap(paper => 
    (paper.questions || []).map(q => ({
      ...q,
      sourceTitle: paper.title,
      isCustomUploaded: true
    }))
  );

  const combinedPool = [
    ...questions.map(q => ({ ...q, isCustomUploaded: false, sourceTitle: 'Official GATE PYQ' })),
    ...customQuestionsPool
  ];

  const sections = [
    'All',
    'Farm Power and Machinery',
    'Soil and Water Conservation Engineering',
    'Agricultural Process Engineering',
    'Engineering Mathematics',
    'General Aptitude'
  ];
  
  const yearsInPool = ['All', ...new Set(combinedPool.map(q => q.year))].sort().reverse();

  const topics = ['All', ...new Set(
    combinedPool
      .filter(q => selectedSection === 'All' || normSec(q.section) === normSec(selectedSection))
      .map(q => q.topic)
      .filter(Boolean)
  )].sort();

  const subtopics = ['All', ...new Set(
    combinedPool
      .filter(q => (selectedSection === 'All' || normSec(q.section) === normSec(selectedSection)) && (selectedTopic === 'All' || q.topic === selectedTopic))
      .map(q => q.subtopic)
      .filter(Boolean)
  )].sort();

  const filteredQuestions = combinedPool.filter(q => {
    if (sourceFilter === 'Official GATE PYQs' && q.isCustomUploaded) return false;
    if (sourceFilter === 'Custom Mock Questions' && !q.isCustomUploaded) return false;

    if (selectedSection !== 'All' && normSec(q.section) !== normSec(selectedSection)) return false;
    if (selectedTopic !== 'All' && q.topic !== selectedTopic) return false;
    if (selectedSubtopic !== 'All' && q.subtopic !== selectedSubtopic) return false;
    if (selectedType !== 'All' && q.type !== selectedType) return false;
    if (selectedYear !== 'All' && q.year !== selectedYear) return false;
    if (selectedMarks !== 'All' && String(q.marks) !== selectedMarks) return false;
    
    // Status filters
    if (selectedStatusFilter === 'Bookmarked') return bookmarks.includes(q.id);
    if (selectedStatusFilter === 'Unattempted') return !submittedState[q.id]?.isSubmitted;
    if (selectedStatusFilter === 'Correct') return submittedState[q.id]?.isCorrect === true;
    if (selectedStatusFilter === 'Incorrect') return submittedState[q.id]?.isSubmitted && !submittedState[q.id]?.isCorrect;

    return true;
  });

  useEffect(() => {
    setCurrentIndex(0);
  }, [sourceFilter, selectedSection, selectedTopic, selectedSubtopic, selectedType, selectedYear, selectedMarks, selectedStatusFilter]);

  const handleSectionChange = (sec) => {
    setSelectedSection(sec);
    setSelectedTopic('All');
    setSelectedSubtopic('All');
  };

  const handleTopicChange = (top) => {
    setSelectedTopic(top);
    setSelectedSubtopic('All');
  };

  const currentQ = filteredQuestions[currentIndex];

  const handleSelectMcq = (qId, optionKey) => {
    if (submittedState[qId]?.isSubmitted) return;
    setUserAnswers({ ...userAnswers, [qId]: optionKey });
  };

  const handleToggleMsq = (qId, optionKey) => {
    if (submittedState[qId]?.isSubmitted) return;
    const currentList = userAnswers[qId] ? userAnswers[qId].split(',').filter(Boolean) : [];
    let updated;
    if (currentList.includes(optionKey)) {
      updated = currentList.filter(k => k !== optionKey);
    } else {
      updated = [...currentList, optionKey];
    }
    updated.sort();
    setUserAnswers({ ...userAnswers, [qId]: updated.join(',') });
  };

  const handleNatInput = (qId, val) => {
    if (submittedState[qId]?.isSubmitted) return;
    setUserAnswers({ ...userAnswers, [qId]: val });
  };

  const handleSubmitAnswer = (qId) => {
    const userVal = userAnswers[qId];
    if (userVal === undefined || userVal === '') return;

    const correctKey = currentQ.correct_answer;
    let isCorrect = false;

    if (currentQ.type === 'MCQ') {
      isCorrect = userVal.trim().toUpperCase() === correctKey.trim().toUpperCase() || correctKey.toUpperCase().includes(userVal.trim().toUpperCase());
    } else if (currentQ.type === 'MSQ') {
      const userSorted = userVal.split(',').map(s => s.trim().toUpperCase()).sort().join(';');
      const keySorted = correctKey.replace(/,/g, ';').replace(/and/g, ';').split(/[,;\s]+/).filter(Boolean).map(s => s.trim().toUpperCase()).sort().join(';');
      isCorrect = userSorted === keySorted;
    } else if (currentQ.type === 'NAT') {
      const numVal = parseFloat(userVal);
      if (!isNaN(numVal)) {
        if (correctKey.includes(' to ')) {
          const [minStr, maxStr] = correctKey.split(' to ');
          const min = parseFloat(minStr);
          const max = parseFloat(maxStr);
          isCorrect = numVal >= (min - 0.001) && numVal <= (max + 0.001);
        } else {
          const target = parseFloat(correctKey);
          isCorrect = !isNaN(target) && Math.abs(numVal - target) <= 0.05;
        }
      }
    }

    setSubmittedState({ ...submittedState, [qId]: { isSubmitted: true, isCorrect } });
    setShowSolution({ ...showSolution, [qId]: true });
  };

  const handleResetAnswer = (qId) => {
    const updatedAnswers = { ...userAnswers };
    delete updatedAnswers[qId];
    setUserAnswers(updatedAnswers);

    const updatedSubmitted = { ...submittedState };
    delete updatedSubmitted[qId];
    setSubmittedState(updatedSubmitted);
  };

  const launchPracticeForSection = (secName) => {
    handleSectionChange(secName);
    setIsHubActive(false);
  };

  // Practice Hub / Launchpad Landing View
  if (isHubActive) {
    return (
      <div className="space-y-8 animate-in fade-in duration-200">
        
        {/* Header Hero Banner */}
        <div className="card-3d rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold">
                <Layers className="w-3.5 h-3.5" />
                <span>Official GATE AG PYQ Practice Pool</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Practice Solved PYQs by Syllabus Section
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Solved questions extracted from official GATE AG papers (2007–2026) with detailed step-by-step solutions.
              </p>
            </div>

            <button
              onClick={onOpenCalc}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-bold shadow-md hover:bg-slate-800 transition"
            >
              <Calculator className="w-4 h-4 text-blue-400 dark:text-blue-600" />
              <span>Scientific Calc</span>
            </button>
          </div>

          {/* Real-time Clock & Session Timers Bar */}
          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono">
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-2 font-bold">
              <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Real Time: {realTimeStr}</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-2 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span>Session Elapsed: {formatSec(sessionElapsedSec)}</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-2 font-bold">
              <BookOpen className="w-3.5 h-3.5 text-amber-500" />
              <span>{questions.length} Solved Questions</span>
            </div>
          </div>
        </div>

        {/* Section Selection Cards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
              Syllabus Section Launchpad
            </h2>
            <button
              onClick={() => launchPracticeForSection('All')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>Practice All {questions.length} Questions</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GATE_AG_SYLLABUS.map((sec) => {
              const rawTitle = sec.title.replace(/^Section \d+:\s*/, '').trim();
              const normTitle = rawTitle.replace(' and ', ' & ').trim();
              const secNameMap = normSec(normTitle);
              const count = questions.filter(q => normSec(q.section) === secNameMap).length;

              return (
                <div 
                  key={sec.id}
                  className="card-3d rounded-2xl p-6 flex flex-col justify-between space-y-4 group cursor-pointer"
                  onClick={() => launchPracticeForSection(secNameMap)}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-0.5 rounded-md border border-slate-200 dark:border-slate-700">
                        {sec.code}
                      </span>
                      <span className="text-xs font-bold text-amber-600 dark:text-amber-400">{sec.weightage}</span>
                    </div>

                    <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug">
                      {normTitle}
                    </h3>

                    <p className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                      {count} Solved Questions
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      launchPracticeForSection(secNameMap);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 group-hover:bg-blue-500 text-white text-xs font-extrabold transition shadow-md"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Start Practice ({count} Qs)</span>
                  </button>
                </div>
              );
            })}

            {/* Launch All Cards Button */}
            <div 
              className="card-3d rounded-2xl p-6 flex flex-col justify-between space-y-4 border-2 border-dashed border-blue-400/40 bg-blue-50/30 dark:bg-blue-950/20 cursor-pointer"
              onClick={() => launchPracticeForSection('All')}
            >
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 px-2.5 py-0.5 rounded-md">
                  ALL SECTIONS
                </span>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Full Mixed Question Pool
                </h3>
                <p className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                  {questions.length} Solved Questions (2016–2026)
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  launchPracticeForSection('All');
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-extrabold shadow-md hover:bg-slate-800 transition"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Practice Full Pool</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Header Bar with Back Button, Real Time, and Session Timers */}
      <div className="card-3d rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => setIsHubActive(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold transition border border-slate-200 dark:border-slate-700"
        >
          <ArrowLeft className="w-4 h-4 text-blue-600" />
          <span>Back to Practice Hub</span>
        </button>

        <div className="flex items-center gap-3 text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
          <div className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-500" />
            <span>Clock: {realTimeStr}</span>
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>Session: {formatSec(sessionElapsedSec)}</span>
          </div>
        </div>

        <button
          onClick={onOpenCalc}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-200 dark:border-blue-900 hover:bg-blue-600 hover:text-white transition"
        >
          <Calculator className="w-4 h-4" />
          <span>Scientific Calc</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="card-3d rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-blue-600" />
            <h2 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Question Filters
            </h2>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-mono">
            {filteredQuestions.length} Questions
          </span>
        </div>

        {/* Question Source Selector Column Filter */}
        <div className="flex flex-wrap items-center gap-2 pb-1 border-b border-slate-100 dark:border-slate-800 text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase mr-1">Source:</span>
          {[
            { id: 'All', label: 'All Pool Questions' },
            { id: 'Official GATE PYQs', label: 'Official PYQs (2007–2026)' },
            { id: 'Custom Mock Questions', label: `Custom Mocks (${customQuestionsPool.length})` }
          ].map((src) => (
            <button
              key={src.id}
              onClick={() => setSourceFilter(src.id)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition border ${
                sourceFilter === src.id
                  ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {src.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Section</label>
            <select
              value={selectedSection}
              onChange={(e) => handleSectionChange(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-2 text-slate-900 dark:text-slate-100 font-medium outline-none focus:ring-1 focus:ring-blue-500"
            >
              {sections.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Topic</label>
            <select
              value={selectedTopic}
              onChange={(e) => handleTopicChange(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-2 text-slate-900 dark:text-slate-100 font-medium outline-none focus:ring-1 focus:ring-blue-500"
            >
              {topics.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Sub-Topic</label>
            <select
              value={selectedSubtopic}
              onChange={(e) => setSelectedSubtopic(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-2 text-slate-900 dark:text-slate-100 font-medium outline-none focus:ring-1 focus:ring-blue-500"
            >
              {subtopics.map(st => <option key={st} value={st}>{st}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Question Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-2 text-slate-900 dark:text-slate-100 font-medium outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="All">All Types (MCQ/MSQ/NAT)</option>
              <option value="MCQ">MCQ (Multiple Choice)</option>
              <option value="MSQ">MSQ (Multiple Select)</option>
              <option value="NAT">NAT (Numerical Answer)</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-2 text-slate-900 dark:text-slate-100 font-medium outline-none focus:ring-1 focus:ring-blue-500"
            >
              {yearsInPool.map(y => <option key={y} value={y}>{y === 'All' ? 'All (2016-2026)' : `GATE ${y}`}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Marks</label>
            <select
              value={selectedMarks}
              onChange={(e) => setSelectedMarks(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-2 text-slate-900 dark:text-slate-100 font-medium outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="All">All Marks</option>
              <option value="1">1 Mark</option>
              <option value="2">2 Marks</option>
            </select>
          </div>
        </div>

        {/* Compact Status Filter Pills */}
        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase mr-1">Status Filter:</span>
          {[
            { id: 'All', label: 'All Questions' },
            { id: 'Unattempted', label: 'Unattempted' },
            { id: 'Correct', label: 'Correct' },
            { id: 'Incorrect', label: 'Incorrect' },
            { id: 'Bookmarked', label: 'Bookmarked' }
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => setSelectedStatusFilter(st.id)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition border ${
                selectedStatusFilter === st.id
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Question Display */}
      {filteredQuestions.length === 0 ? (
        <div className="card-3d rounded-2xl p-12 text-center space-y-3">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No questions match your current filters</h3>
          <p className="text-xs text-slate-500">Try adjusting your section, topic, or sub-topic filters above.</p>
        </div>
      ) : (
        <div className="card-3d rounded-2xl overflow-hidden">
          
          <div className="bg-slate-50 dark:bg-slate-800/80 px-6 py-3.5 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                Question {currentIndex + 1} of {filteredQuestions.length}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                GATE {currentQ.year}
              </span>
              {currentQ.isCustomUploaded && (
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-purple-500 shrink-0" />
                  <span>Custom Mock</span>
                </span>
              )}
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                {currentQ.type}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900">
                {currentQ.marks} {currentQ.marks === 1 ? 'Mark' : 'Marks'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {onEditQuestion && (
                <button
                  onClick={() => onEditQuestion(currentQ)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 font-bold text-xs border border-purple-200 dark:border-purple-800 hover:bg-purple-600 hover:text-white transition"
                  title="Manually edit question text, options, key, or solution"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Question</span>
                </button>
              )}

              <button
                onClick={() => onToggleBookmark(currentQ.id)}
                className={`p-1.5 rounded-lg border transition ${
                  bookmarks.includes(currentQ.id)
                    ? 'bg-amber-100 border-amber-300 text-amber-700 dark:bg-amber-950/80 dark:border-amber-800 dark:text-amber-300'
                    : 'border-slate-300 text-slate-500 hover:text-slate-900 dark:border-slate-700 dark:hover:text-white'
                }`}
                title="Bookmark Question"
              >
                <Bookmark className="w-4 h-4 fill-current" />
              </button>
            </div>
          </div>

          {/* Question Body */}
          <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 overflow-x-auto">
            
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                {currentQ.section} • {currentQ.topic} {currentQ.subtopic ? `— ${currentQ.subtopic}` : ''}
              </span>
              <div className="text-sm sm:text-base md:text-lg font-semibold leading-relaxed text-slate-900 dark:text-slate-100 pt-1 overflow-x-auto">
                <MathRenderer content={currentQ.question} inline={false} />
              </div>
            </div>

            {/* Official Embedded Figure */}
            {currentQ.image_url && (
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center space-y-2 overflow-hidden">
                <div className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center justify-center gap-1">
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Question Diagram / Chart</span>
                </div>
                <img
                  src={currentQ.image_url}
                  alt="Figure"
                  className="max-h-[380px] w-auto mx-auto rounded-lg border border-slate-200 dark:border-slate-800 object-contain"
                />
              </div>
            )}

            {/* MCQ Options */}
            {currentQ.type === 'MCQ' && currentQ.options && (
              <div className="space-y-3 pt-2">
                {Object.entries(currentQ.options).map(([optKey, optVal]) => {
                  const isSelected = userAnswers[currentQ.id] === optKey;
                  const isSubmitted = submittedState[currentQ.id]?.isSubmitted;

                  let optStyle = "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 hover:border-blue-500 dark:hover:border-blue-600";
                  if (isSelected) {
                    optStyle = "border-blue-600 bg-blue-50/80 dark:bg-blue-950/60 font-bold text-blue-900 dark:text-blue-100 shadow-xs";
                  }
                  if (isSubmitted && optKey.trim().toUpperCase() === currentQ.correct_answer.trim().toUpperCase()) {
                    optStyle = "border-emerald-600 bg-emerald-50/80 dark:bg-emerald-950/60 font-bold text-emerald-900 dark:text-emerald-100";
                  } else if (isSubmitted && isSelected && !submittedState[currentQ.id]?.isCorrect) {
                    optStyle = "border-rose-600 bg-rose-50/80 dark:bg-rose-950/60 font-bold text-rose-900 dark:text-rose-100";
                  }

                  return (
                    <button
                      key={optKey}
                      onClick={() => handleSelectMcq(currentQ.id, optKey)}
                      disabled={isSubmitted}
                      className={`w-full text-left p-4 rounded-xl border transition flex items-start gap-3.5 text-sm sm:text-base font-medium ${optStyle}`}
                    >
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 border ${
                        isSelected 
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600'
                      }`}>
                        {optKey}
                      </span>
                      <div className="pt-0.5 flex-1">
                        <MathRenderer content={optVal} />
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* MSQ Options */}
            {currentQ.type === 'MSQ' && currentQ.options && (
              <div className="space-y-3 pt-2">
                <p className="text-xs text-slate-500 italic">Select all correct options.</p>
                {Object.entries(currentQ.options).map(([optKey, optVal]) => {
                  const selectedList = userAnswers[currentQ.id] ? userAnswers[currentQ.id].split(',') : [];
                  const isChecked = selectedList.includes(optKey);
                  const isSubmitted = submittedState[currentQ.id]?.isSubmitted;

                  return (
                    <button
                      key={optKey}
                      onClick={() => handleToggleMsq(currentQ.id, optKey)}
                      disabled={isSubmitted}
                      className={`w-full text-left p-4 rounded-xl border transition flex items-start gap-3.5 text-sm sm:text-base font-medium ${
                        isChecked 
                          ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/60 text-blue-900 dark:text-blue-100 font-bold shadow-xs' 
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 hover:border-blue-500 dark:hover:border-blue-600'
                      }`}
                    >
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 border ${
                        isChecked 
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600'
                      }`}>
                        {optKey}
                      </span>
                      <div className="pt-0.5 flex-1">
                        <MathRenderer content={optVal} />
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* NAT Input */}
            {currentQ.type === 'NAT' && (
              <div className="pt-2 space-y-3">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Numerical Answer Input
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    placeholder="Enter numerical value..."
                    value={userAnswers[currentQ.id] || ''}
                    onChange={(e) => handleNatInput(currentQ.id, e.target.value)}
                    disabled={submittedState[currentQ.id]?.isSubmitted}
                    className="max-w-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-mono text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {submittedState[currentQ.id]?.isSubmitted && (
                    <span className="text-xs font-mono font-bold text-slate-500">
                      Answer Key Range: <span className="text-emerald-600 dark:text-emerald-400">{currentQ.correct_answer}</span>
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Action Bar: Submit & Navigation */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {!submittedState[currentQ.id]?.isSubmitted ? (
                  <button
                    onClick={() => handleSubmitAnswer(currentQ.id)}
                    disabled={!userAnswers[currentQ.id]}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs transition shadow-md"
                  >
                    Check & Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={() => handleResetAnswer(currentQ.id)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 transition border border-slate-200 dark:border-slate-700"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Try Again</span>
                  </button>
                )}

                <button
                  onClick={() => setShowSolution({ ...showSolution, [currentQ.id]: !showSolution[currentQ.id] })}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-xs border border-emerald-200 dark:border-emerald-900 transition"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{showSolution[currentQ.id] ? 'Hide Solution' : 'View Solved Solution'}</span>
                </button>

                <button
                  onClick={() => setActiveConceptQuestion(currentQ)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold text-xs border border-purple-200 dark:border-purple-900 transition"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Study Concept</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 disabled:opacity-40 text-slate-700 dark:text-slate-300 text-xs font-bold transition border border-slate-200 dark:border-slate-700"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={() => setCurrentIndex(prev => Math.min(filteredQuestions.length - 1, prev + 1))}
                  disabled={currentIndex === filteredQuestions.length - 1}
                  className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white text-xs font-bold transition shadow-md"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Solution & Personal Notes Display Drawer */}
            {showSolution[currentQ.id] && (
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveSolutionTab('solution')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        activeSolutionTab === 'solution'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      Step-by-Step Solution
                    </button>
                    <button
                      onClick={() => setActiveSolutionTab('notes')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                        activeSolutionTab === 'notes'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>My Personal Notes</span>
                      {questionNotes[currentQ.id] && <span className="w-2 h-2 rounded-full bg-amber-400" />}
                    </button>
                  </div>

                  <span className="font-mono text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                    Correct Answer: {currentQ.correct_answer}
                  </span>
                </div>

                {activeSolutionTab === 'solution' ? (
                  <div className="text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 font-medium space-y-2">
                    {(currentQ.solution || currentQ.explanation) ? (
                      <MathRenderer content={currentQ.solution || currentQ.explanation} />
                    ) : (
                      <p className="italic text-slate-400">Official answer key is verified as {currentQ.correct_answer}.</p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Personal Question Notes & Formulas (Saved automatically)
                    </label>
                    <textarea
                      rows={4}
                      value={questionNotes[currentQ.id] || ''}
                      onChange={(e) => handleSaveNote(currentQ.id, e.target.value)}
                      placeholder="Write your custom notes, shortcuts, key formulas, or hints for this question here..."
                      className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                    <p className="text-[10px] text-slate-400">
                      Notes are stored locally on your device for fast revision.
                    </p>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>
      )}

      {/* Concept Study Modal */}
      {activeConceptQuestion && (
        <ConceptStudyModal
          question={activeConceptQuestion}
          onClose={() => setActiveConceptQuestion(null)}
        />
      )}

    </div>
  );
}
