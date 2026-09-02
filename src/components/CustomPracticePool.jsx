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
  FileText,
  Clock,
  Play,
  ArrowLeft,
  Shuffle,
  Edit3
} from 'lucide-react';
import MathRenderer from './MathRenderer';
import { evaluateQuestion } from '../utils/scoring.js';
import ConceptStudyModal from './ConceptStudyModal';
import { GATE_AG_SYLLABUS } from '../data/syllabus';
import { getOfficialSections, normalizeSectionTitle } from '../utils/syllabusTaxonomy.js';

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

export default function CustomPracticePool({ 
  customMockPapers = [], 
  bookmarks = [], 
  onToggleBookmark, 
  onOpenCalc,
  onEditQuestion,
  currentStudent,
  onRequireAuth
}) {
  // Aggregate all custom questions from custom mock papers
  const customQuestions = customMockPapers.flatMap(paper => 
    (paper.questions || []).map(q => ({
      ...q,
      paperTitle: paper.title,
      paperYear: paper.year,
      isCustomUploaded: true
    }))
  );

  const [isHubActive, setIsHubActive] = useState(true);
  const [selectedSection, setSelectedSection] = useState('All');
  const [selectedPaper, setSelectedPaper] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedMarks, setSelectedMarks] = useState('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');
  const [activeSolutionTab, setActiveSolutionTab] = useState('solution');

  // Personal question notes
  const [questionNotes, setQuestionNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('gate_ag_custom_notes');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const handleSaveNote = (qId, noteText) => {
    const updated = { ...questionNotes, [qId]: noteText };
    setQuestionNotes(updated);
    try {
      localStorage.setItem('gate_ag_custom_notes', JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save note", e);
    }
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [submittedState, setSubmittedState] = useState({});
  const [showSolution, setShowSolution] = useState({});
  const [activeConceptQuestion, setActiveConceptQuestion] = useState(null);

  // Timer
  const [realTimeStr, setRealTimeStr] = useState(() => new Date().toLocaleTimeString());
  const [sessionElapsedSec, setSessionElapsedSec] = useState(0);

  useEffect(() => {
    const clockInterval = setInterval(() => {
      setRealTimeStr(new Date().toLocaleTimeString());
      setSessionElapsedSec(prev => prev + 1);
    }, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  const sections = [
    'All',
    'Section 1: Engineering Mathematics',
    'Section 2: Farm Machinery',
    'Section 3: Farm Power',
    'Section 4: Soil and Water Conservation Engineering',
    'Section 5: Irrigation and Drainage Engineering',
    'Section 6: Agricultural Process Engineering',
    'Section 7: Dairy and Food Engineering',
    'General Aptitude'
  ];

  const paperTitles = ['All', ...new Set(customMockPapers.map(p => p.title))];

  const filteredQuestions = customQuestions.filter(q => {
    if (selectedSection !== 'All' && normalizeSectionTitle(q.section) !== normalizeSectionTitle(selectedSection)) return false;
    if (selectedPaper !== 'All' && q.paperTitle !== selectedPaper) return false;
    if (selectedType !== 'All' && q.type !== selectedType) return false;
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
  }, [selectedSection, selectedPaper, selectedType, selectedMarks, selectedStatusFilter]);

  const launchPracticeForSection = (secName) => {
    setSelectedSection(secName);
    setIsHubActive(false);
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
    if (!currentStudent && onRequireAuth) {
      onRequireAuth("Sign In or Register free to submit practice answers and view step-by-step solutions!");
      return;
    }
    const userVal = userAnswers[qId];
    if (userVal === undefined || userVal === '') return;

    const evalResult = evaluateQuestion({
      question: currentQ,
      userAnswer: userVal,
      state: 'ANSWERED'
    });
    const isCorrect = evalResult.isCorrect;

    setSubmittedState({
      ...submittedState,
      [qId]: { isSubmitted: true, isCorrect }
    });
    setShowSolution({ ...showSolution, [qId]: true });
  };

  const handleResetQuestion = (qId) => {
    const newAnswers = { ...userAnswers };
    delete newAnswers[qId];
    const newSubmitted = { ...submittedState };
    delete newSubmitted[qId];
    const newShowSol = { ...showSolution };
    delete newShowSol[qId];

    setUserAnswers(newAnswers);
    setSubmittedState(newSubmitted);
    setShowSolution(newShowSol);
  };

  // Launchpad Hub View
  if (isHubActive) {
    return (
      <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-200">
        
        {/* Top Header Card */}
        <div className="card-3d rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                <span>Custom Mock Questions Pool</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                Custom Mock Questions Practice Pool
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Questions extracted from uploaded and pre-loaded custom mock papers (e.g. GATE 2027 Mock 01 to 18).
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-2 font-bold text-xs">
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                <span>Elapsed: {formatSec(sessionElapsedSec)}</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 flex items-center gap-2 font-extrabold text-xs">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{customQuestions.length} Custom Qs Loaded</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section Launchpad Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
              Custom Syllabus Section Launchpad
            </h2>
            <button
              onClick={() => launchPracticeForSection('All')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>Practice All {customQuestions.length} Custom Questions</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {GATE_AG_SYLLABUS.map((sec) => {
              const rawTitle = sec.title.replace(/^Section \d+:\s*/, '').trim();
              const normTitle = rawTitle.replace(' and ', ' & ').trim();
              const secNameMap = normSec(normTitle);
              const count = customQuestions.filter(q => normSec(q.section) === secNameMap).length;

              return (
                <div 
                  key={sec.id}
                  className="card-3d rounded-2xl p-6 flex flex-col justify-between space-y-4 group cursor-pointer hover:border-blue-500/50 transition"
                  onClick={() => launchPracticeForSection(secNameMap)}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-2.5 py-0.5 rounded-md border border-blue-200 dark:border-blue-800">
                        {sec.code}
                      </span>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{sec.weightage}</span>
                    </div>

                    <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug">
                      {normTitle}
                    </h3>

                    <p className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {count} Custom Questions
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      launchPracticeForSection(secNameMap);
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 group-hover:bg-emerald-500 text-white text-xs font-extrabold transition shadow-md cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Practice Section ({count} Qs)</span>
                  </button>
                </div>
              );
            })}

            {/* Launch All Custom Pool Card */}
            <div 
              className="card-3d rounded-2xl p-6 flex flex-col justify-between space-y-4 border-2 border-dashed border-emerald-400/40 bg-emerald-50/30 dark:bg-emerald-950/20 cursor-pointer"
              onClick={() => launchPracticeForSection('All')}
            >
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 px-2.5 py-0.5 rounded-md">
                  ALL CUSTOM MOCKS
                </span>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Full Custom Mixed Question Pool
                </h3>
                <p className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {customQuestions.length} Questions across {customMockPapers.length} Custom Mock Papers
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  launchPracticeForSection('All');
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-extrabold shadow-md hover:bg-emerald-500 transition cursor-pointer"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Practice All Custom Qs</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Header Bar */}
      <div className="card-3d rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => setIsHubActive(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold transition border border-slate-200 dark:border-slate-700"
        >
          <ArrowLeft className="w-4 h-4 text-blue-600" />
          <span>Back to Custom Pool Launchpad</span>
        </button>

        <div className="flex items-center gap-3 text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
          <div className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-500" />
            <span>Clock: {realTimeStr}</span>
          </div>

          <div className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
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
              Custom Mock Pool Filters
            </h2>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-mono">
            {filteredQuestions.length} Custom Questions Found
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Section</label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-2 text-slate-900 dark:text-slate-100 font-medium outline-none focus:ring-1 focus:ring-blue-500"
            >
              {sections.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Paper</label>
            <select
              value={selectedPaper}
              onChange={(e) => setSelectedPaper(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-2 text-slate-900 dark:text-slate-100 font-medium outline-none focus:ring-1 focus:ring-blue-500"
            >
              {paperTitles.map(p => <option key={p} value={p}>{p}</option>)}
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

        {/* Status Filter Pills */}
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
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No custom questions match your current filters</h3>
          <p className="text-xs text-slate-500">Try adjusting your section, paper, or status filters above.</p>
        </div>
      ) : (
        <div className="card-3d rounded-2xl overflow-hidden">
          
          <div className="bg-slate-900/40 border-b border-slate-800/60 px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                Question {currentIndex + 1} of {filteredQuestions.length}
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-blue-600 text-white flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>{currentQ.paperTitle || currentQ.year}</span>
              </span>
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
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold text-xs border border-blue-200 dark:border-blue-800 hover:bg-blue-600 hover:text-white transition"
                  title="Manually edit question text, options, key, or solution"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Question</span>
                </button>
              )}

              <button
                onClick={() => {
                  if (!currentStudent && onRequireAuth) {
                    onRequireAuth("Sign In or Register free to bookmark questions and build your revision list!");
                    return;
                  }
                  onToggleBookmark(currentQ.id);
                }}
                className={`p-1.5 rounded-lg border transition ${
                  bookmarks.includes(currentQ.id)
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700 hover:text-blue-500'
                }`}
                title={bookmarks.includes(currentQ.id) ? "Remove Bookmark" : "Bookmark Question"}
              >
                <Bookmark className="w-4 h-4 fill-current" />
              </button>

              <button
                onClick={() => setActiveConceptQuestion(currentQ)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold text-xs border border-blue-200 dark:border-blue-800 hover:bg-blue-600 hover:text-white transition"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Concept Study</span>
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              {currentQ.section} {currentQ.subtopic ? `• ${currentQ.subtopic}` : ''}
            </div>

            {/* Question Text */}
            <div className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 leading-relaxed space-y-3">
              <MathRenderer content={currentQ.question} />
            </div>

            {/* MCQ Options */}
            {currentQ.type === 'MCQ' && currentQ.options && (
              <div className="space-y-3 pt-2">
                {Object.entries(currentQ.options).map(([key, val]) => {
                  const isSelected = userAnswers[currentQ.id] === key;
                  const isSubmitted = submittedState[currentQ.id]?.isSubmitted;
                  const isCorrectOpt = currentQ.correct_answer?.toUpperCase().includes(key.toUpperCase());

                  let btnStyle = "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 hover:border-blue-400 dark:hover:border-blue-600";
                  if (isSelected) {
                    btnStyle = "border-blue-600 bg-blue-50/80 dark:bg-blue-950/60 text-blue-900 dark:text-blue-100 font-bold shadow-xs";
                  }

                  if (isSubmitted) {
                    if (isCorrectOpt) {
                      btnStyle = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-100 font-bold";
                    } else if (isSelected && !isCorrectOpt) {
                      btnStyle = "border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-900 dark:text-rose-100 font-bold";
                    }
                  }

                  return (
                    <button
                      key={key}
                      onClick={() => handleSelectMcq(currentQ.id, key)}
                      disabled={isSubmitted}
                      className={`w-full text-left p-4 rounded-xl border text-sm sm:text-base font-medium transition flex items-start gap-3.5 ${btnStyle}`}
                    >
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 border ${
                        isSelected 
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600'
                      }`}>
                        {key}
                      </span>
                      <div className="pt-0.5 flex-1">
                        <MathRenderer content={val} />
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* MSQ Options */}
            {currentQ.type === 'MSQ' && currentQ.options && (
              <div className="space-y-3 pt-2">
                {Object.entries(currentQ.options).map(([key, val]) => {
                  const selectedList = userAnswers[currentQ.id] ? userAnswers[currentQ.id].split(',') : [];
                  const isSelected = selectedList.includes(key);
                  const isSubmitted = submittedState[currentQ.id]?.isSubmitted;

                  let btnStyle = "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 hover:border-blue-400 dark:hover:border-blue-600";
                  if (isSelected) {
                    btnStyle = "border-blue-600 bg-blue-50/80 dark:bg-blue-950/60 text-blue-900 dark:text-blue-100 font-bold shadow-xs";
                  }

                  return (
                    <button
                      key={key}
                      onClick={() => handleToggleMsq(currentQ.id, key)}
                      disabled={isSubmitted}
                      className={`w-full text-left p-4 rounded-xl border text-sm sm:text-base font-medium transition flex items-start gap-3.5 ${btnStyle}`}
                    >
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 border ${
                        isSelected 
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600'
                      }`}>
                        {key}
                      </span>
                      <div className="pt-0.5 flex-1">
                        <MathRenderer content={val} />
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* NAT Input */}
            {currentQ.type === 'NAT' && (
              <div className="space-y-3 pt-2 max-w-sm">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Enter Numerical Value:
                </label>
                <input
                  type="text"
                  placeholder="e.g. 12.5 or 0.14"
                  value={userAnswers[currentQ.id] || ''}
                  onChange={(e) => handleNatInput(currentQ.id, e.target.value)}
                  disabled={submittedState[currentQ.id]?.isSubmitted}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm font-mono text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            {/* Action Bar: Submit / Reset / Solution */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {!submittedState[currentQ.id]?.isSubmitted ? (
                  <button
                    onClick={() => handleSubmitAnswer(currentQ.id)}
                    disabled={!userAnswers[currentQ.id]}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-bold text-xs transition shadow-xs flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Submit Answer</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleResetQuestion(currentQ.id)}
                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 transition flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Try Again</span>
                  </button>
                )}
              </div>

              {/* Navigation Prev/Next */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
                  disabled={currentIndex === 0}
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-200 transition"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono font-bold px-2 text-slate-500">
                  {currentIndex + 1} / {filteredQuestions.length}
                </span>
                <button
                  onClick={() => setCurrentIndex(Math.min(filteredQuestions.length - 1, currentIndex + 1))}
                  disabled={currentIndex === filteredQuestions.length - 1}
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-40 hover:bg-slate-200 transition"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Solution & Explanation Box */}
            {showSolution[currentQ.id] && (
              <div className="p-6 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-blue-200 dark:border-blue-900/60 pb-3">
                  <div className="flex items-center gap-2 font-extrabold text-xs text-blue-900 dark:text-blue-200 uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Verified Answer & Detailed Solution</span>
                  </div>

                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-blue-200 dark:bg-blue-900 text-blue-900 dark:text-blue-100">
                    Key: {currentQ.correct_answer}
                  </span>
                </div>

                <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed space-y-3">
                  <MathRenderer content={currentQ.solution} />
                </div>
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
