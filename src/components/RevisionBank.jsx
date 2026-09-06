import React, { useState } from 'react';
import { 
  Bookmark, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Filter, 
  Search, 
  FileText, 
  Printer, 
  Sparkles,
  ChevronDown,
  ChevronUp,
  BrainCircuit,
  Play,
  Trash2,
  Flag,
  Image as ImageIcon
} from 'lucide-react';
import MathRenderer from './MathRenderer';
import QuestionReportModal from './QuestionReportModal';
import { getActiveMistakeIds, getMistakeVault, removeMistake } from '../services/mistakeVaultService.js';
import { normalizeSectionTitle, getOfficialSections } from '../utils/syllabusTaxonomy.js';

export default function RevisionBank({ 
  questions = [],
  customMockPapers = [], 
  userStats, 
  bookmarks = [], 
  onToggleBookmark,
  onOpenCalc,
  onEditQuestion,
  onStartPracticeMistakes,
  currentStudent = null
}) {
  const [activeTab, setActiveTab] = useState('missteps'); // 'missteps' | 'bookmarks'
  const [selectedSection, setSelectedSection] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSolutions, setExpandedSolutions] = useState({});
  const [userAnswers, setUserAnswers] = useState({});
  const [submittedAnswers, setSubmittedAnswers] = useState({});
  const [refreshKey, setRefreshKey] = useState(0);
  const [reportingQuestion, setReportingQuestion] = useState(null);

  // Combine PYQ and Custom Mock questions
  const customQuestions = customMockPapers.flatMap(p => p.questions || []);
  const allPool = [...questions, ...customQuestions];

  // Collect misstep question IDs from both Mistake Vault and legacy userStats
  const mistakeVaultMap = getMistakeVault(currentStudent?.id);
  const vaultMistakes = getActiveMistakeIds(currentStudent?.id);
  const legacyMistakes = (userStats?.attempted || []).filter(
    id => !(userStats?.correct || []).includes(id)
  );
  const wrongQuestionIds = Array.from(new Set([...vaultMistakes, ...legacyMistakes]));

  const targetIds = activeTab === 'missteps' ? wrongQuestionIds : bookmarks;
  
  // Filter questions matching target IDs
  const targetQuestions = allPool.filter(q => targetIds.includes(q.id));

  const sections = ['All', ...getOfficialSections().map(s => s.fullTitle)];

  const filteredQuestions = targetQuestions.filter(q => {
    const matchesSection = selectedSection === 'All' || normalizeSectionTitle(q.section) === normalizeSectionTitle(selectedSection);
    const matchesDifficulty = selectedDifficulty === 'All' || (q.difficulty || 'Moderate') === selectedDifficulty;
    const textContent = `${q.id} ${q.question || q.questionText || ''} ${q.section || ''} ${q.topic || ''}`.toLowerCase();
    const matchesSearch = textContent.includes(searchTerm.toLowerCase());
    return matchesSection && matchesDifficulty && matchesSearch;
  });

  const toggleSolution = (id) => {
    setExpandedSolutions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectOption = (qId, optKey) => {
    setUserAnswers(prev => ({ ...prev, [qId]: optKey }));
  };

  const handleTextAnswer = (qId, val) => {
    setUserAnswers(prev => ({ ...prev, [qId]: val }));
  };

  const handleVerify = (qId) => {
    setSubmittedAnswers(prev => ({ ...prev, [qId]: true }));
  };

  const handleRemoveFromVault = (qId) => {
    removeMistake(qId, currentStudent?.id);
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div key={refreshKey} className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="card-3d rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 text-xs font-bold border border-amber-200 dark:border-amber-800">
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>Revision Bank & Misstep Vault</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">
              {activeTab === 'missteps' ? 'Misstep Tracker (Incorrect Qs)' : 'Bookmarked Questions Vault'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {activeTab === 'missteps'
                ? 'Review, retry, and eliminate recurring errors from previous test attempts.'
                : 'Your saved repository of bookmarked questions for rapid revision.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {activeTab === 'missteps' && wrongQuestionIds.length > 0 && onStartPracticeMistakes && (
              <button
                onClick={() => onStartPracticeMistakes(wrongQuestionIds)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-sm transition group cursor-pointer"
                title="Launch focused practice session on all mistake questions"
              >
                <Play className="w-3.5 h-3.5 fill-white group-hover:scale-110 transition-transform" />
                <span>Practice Mistakes ({wrongQuestionIds.length})</span>
              </button>
            )}

            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 text-xs font-bold shadow-xs hover:bg-blue-100 transition no-print cursor-pointer"
              title="Print Revision Worksheet"
            >
              <Printer className="w-4 h-4" />
              <span>Print Worksheet</span>
            </button>
          </div>
        </div>

        {/* Tab Selector & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setActiveTab('missteps')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === 'missteps'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Misstep Tracker ({wrongQuestionIds.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === 'bookmarks'
                  ? 'bg-amber-500 text-slate-950 shadow-xs font-extrabold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Bookmarked ({bookmarks.length})</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:w-56">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search revision vault..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Difficulty Filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500 font-medium cursor-pointer"
            >
              <option value="All">All Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Moderate">Moderate</option>
              <option value="Difficult">Difficult</option>
            </select>

            {/* Section Filter */}
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500 font-medium cursor-pointer"
            >
              {sections.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Questions List */}
      {filteredQuestions.length === 0 ? (
        <div className="card-3d rounded-2xl p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {activeTab === 'missteps' ? 'No Missteps in this filter!' : 'No Bookmarked Questions Yet'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            {activeTab === 'missteps'
              ? 'Great job! As you attempt practice questions and CBT mock tests, any incorrect questions will appear here for targeted drills.'
              : 'Bookmark tricky questions during tests or practice sessions to assemble your personal revision deck.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredQuestions.map((q, idx) => {
            const isBookmarked = bookmarks.includes(q.id);
            const isSolutionOpen = expandedSolutions[q.id];
            const isSubmitted = submittedAnswers[q.id];
            const currentAns = userAnswers[q.id];
            const mistakeItem = mistakeVaultMap[q.id];

            // Normalize options whether array or object
            const optionsList = Array.isArray(q.options)
              ? q.options.map((opt, oIdx) => ({ key: String.fromCharCode(65 + oIdx), val: opt }))
              : (q.options && typeof q.options === 'object')
                ? Object.entries(q.options).map(([key, val]) => ({ key, val }))
                : [];

            const officialCorrectAnswer = String(
              q.correct_answer || q.answer || (q.correctOption !== undefined ? String.fromCharCode(65 + q.correctOption) : '')
            ).trim().toUpperCase();

            return (
              <div key={q.id || idx} className="card-3d rounded-2xl p-5 sm:p-6 space-y-4">
                
                {/* Header info */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs font-bold">
                    <span className="px-2.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400">
                      {q.id} ({q.year || 'PYQ'})
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-600 dark:text-slate-300 font-sans font-semibold">
                      {q.section || 'Agricultural Engineering'}
                    </span>
                    {q.difficulty && (
                      <span className={`px-2 py-0.2 rounded text-[10px] font-sans font-bold border ${
                        q.difficulty === 'Easy'
                          ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                          : q.difficulty === 'Difficult'
                            ? 'bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800'
                            : 'bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                      }`}>
                        {q.difficulty}
                      </span>
                    )}
                    {mistakeItem?.mistakeCount > 1 && (
                      <span className="px-2 py-0.2 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-300 dark:border-rose-800 text-[10px] font-extrabold flex items-center gap-1 font-sans">
                        <AlertTriangle className="w-2.5 h-2.5" />
                        <span>Repeated Error: {mistakeItem.mistakeCount}x</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setReportingQuestion(q)}
                      className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-rose-600 hover:border-rose-300 transition cursor-pointer"
                      title="Report issue with this question"
                    >
                      <Flag className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onToggleBookmark && onToggleBookmark(q.id)}
                      className={`p-1.5 rounded-lg border transition cursor-pointer ${
                        isBookmarked
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-2xs'
                          : 'text-slate-400 border-slate-200 dark:border-slate-800 hover:text-amber-500'
                      }`}
                      title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Question'}
                    >
                      <Bookmark className="w-3.5 h-3.5 fill-current" />
                    </button>

                    {activeTab === 'missteps' && (
                      <button
                        onClick={() => handleRemoveFromVault(q.id)}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-rose-600 hover:border-rose-300 transition cursor-pointer"
                        title="Remove from Mistake Vault"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Question Text & KaTeX */}
                <div className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-medium leading-relaxed">
                  <MathRenderer content={q.question || q.questionText || ''} />
                </div>

                {/* Question Diagram / Image */}
                {(q.image_url || q.image) && (
                  <div className="my-3 p-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-xl inline-block max-w-full">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-blue-800 dark:text-blue-400 mb-1.5 flex items-center gap-1">
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Question Diagram</span>
                    </div>
                    <img
                      src={q.image_url || q.image}
                      alt="Question Diagram"
                      className="max-h-72 max-w-full object-contain rounded-lg bg-white shadow-xs"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Options or NAT Input */}
                {q.type === 'NAT' ? (
                  <div className="space-y-2 pt-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                      Numerical Answer Type (NAT):
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        placeholder="Enter numerical value..."
                        value={currentAns || ''}
                        onChange={(e) => handleTextAnswer(q.id, e.target.value)}
                        className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-xs font-mono text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => handleVerify(q.id)}
                        className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition cursor-pointer"
                      >
                        Check Answer
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    {optionsList.map((optObj) => {
                      const isSelected = currentAns === optObj.key;
                      const isCorrect = officialCorrectAnswer === optObj.key;
                      let btnStyle = 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300';
                      
                      if (isSubmitted) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold';
                        } else if (isSelected) {
                          btnStyle = 'bg-rose-500/15 border-rose-500 text-rose-600 dark:text-rose-400 font-bold';
                        }
                      } else if (isSelected) {
                        btnStyle = 'bg-blue-500/15 border-blue-500 text-blue-600 dark:text-blue-400 font-bold';
                      }

                      return (
                        <button
                          key={optObj.key}
                          onClick={() => handleSelectOption(q.id, optObj.key)}
                          className={`p-3 rounded-xl border text-left text-xs font-medium transition flex items-start gap-2.5 cursor-pointer ${btnStyle}`}
                        >
                          <span className="font-bold font-mono text-slate-500 shrink-0">
                            ({optObj.key})
                          </span>
                          <span className="flex-1">
                            <MathRenderer content={optObj.val} inline={true} />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Bottom Bar Controls */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                  <button
                    onClick={() => toggleSolution(q.id)}
                    className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isSolutionOpen ? 'Hide Detailed Solution' : 'View Detailed Solution & Explanation'}</span>
                    {isSolutionOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {q.type !== 'NAT' && !isSubmitted && (
                    <button
                      onClick={() => handleVerify(q.id)}
                      disabled={!currentAns}
                      className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold disabled:opacity-50 transition cursor-pointer"
                    >
                      Check Answer
                    </button>
                  )}
                </div>

                {/* Detailed Solution Drawer */}
                {isSolutionOpen && (
                  <div className="p-4 rounded-xl bg-slate-900 text-white space-y-3 animate-in fade-in duration-150 border border-slate-800">
                    <div className="flex items-center justify-between text-xs font-bold text-emerald-400 border-b border-slate-800 pb-2">
                      <span>Official Solution & Step-by-Step Breakdown</span>
                      <span className="font-mono text-amber-400">
                        Official Answer: {officialCorrectAnswer}
                      </span>
                    </div>

                    <div className="text-xs leading-relaxed text-slate-300">
                      <MathRenderer content={q.solution || q.solutionText || q.explanation || 'Detailed step-by-step solution provided above.'} />
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}

      {/* Question Issue Reporting Modal */}
      <QuestionReportModal
        isOpen={Boolean(reportingQuestion)}
        onClose={() => setReportingQuestion(null)}
        question={reportingQuestion}
        paperTitle="Revision Bank"
        currentStudent={currentStudent}
      />

    </div>
  );
}
