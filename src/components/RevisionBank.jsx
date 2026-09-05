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
  Trash2
} from 'lucide-react';
import MathRenderer from './MathRenderer';
import { getActiveMistakeIds, clearMistakeVault, removeMistake } from '../services/mistakeVaultService.js';

export default function RevisionBank({ 
  questions = [],
  customMockPapers = [], 
  userStats, 
  bookmarks, 
  onToggleBookmark,
  onOpenCalc,
  onEditQuestion,
  onStartPracticeMistakes 
}) {
  const [activeTab, setActiveTab] = useState('missteps'); // 'missteps' | 'bookmarks'
  const [selectedSection, setSelectedSection] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSolutions, setExpandedSolutions] = useState({});
  const [userAnswers, setUserAnswers] = useState({});
  const [submittedAnswers, setSubmittedAnswers] = useState({});

  // Combine PYQ and Custom Mock questions
  const customQuestions = customMockPapers.flatMap(p => p.questions || []);
  const allPool = [...questions, ...customQuestions];

  // Collect misstep question IDs from both Mistake Vault and legacy userStats
  const vaultMistakes = getActiveMistakeIds();
  const legacyMistakes = (userStats?.attempted || []).filter(
    id => !(userStats?.correct || []).includes(id)
  );
  const wrongQuestionIds = Array.from(new Set([...vaultMistakes, ...legacyMistakes]));

  const targetIds = activeTab === 'missteps' ? wrongQuestionIds : bookmarks;
  
  // Filter questions matching target IDs
  const targetQuestions = allPool.filter(q => targetIds.includes(q.id));

  const sections = ['All', ...new Set(allPool.map(q => q.section).filter(Boolean))];

  const filteredQuestions = targetQuestions.filter(q => {
    const matchesSection = selectedSection === 'All' || q.section === selectedSection;
    const textToSearch = `${q.id} ${q.questionText} ${q.section || ''}`.toLowerCase();
    const matchesSearch = textToSearch.includes(searchTerm.toLowerCase());
    return matchesSection && matchesSearch;
  });

  const toggleSolution = (id) => {
    setExpandedSolutions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectOption = (qId, optionIdx) => {
    setUserAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleTextAnswer = (qId, val) => {
    setUserAnswers(prev => ({ ...prev, [qId]: val }));
  };

  const handleVerify = (qId) => {
    setSubmittedAnswers(prev => ({ ...prev, [qId]: true }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
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
                ? 'Retry and eliminate errors from previous test attempts.'
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
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition ${
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
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition ${
                activeTab === 'bookmarks'
                  ? 'bg-amber-500 text-slate-950 shadow-xs font-extrabold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Bookmarked ({bookmarks.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search revision bank..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Section Filter */}
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500 font-medium"
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
            {activeTab === 'missteps' ? 'No Missteps Found!' : 'No Bookmarked Questions Yet'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            {activeTab === 'missteps'
              ? 'Great job! As you attempt practice questions and mock tests, any missed questions will appear here for targeted practice.'
              : 'Bookmark questions while practicing or taking mocks to save them into your personal revision bank.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredQuestions.map((q, idx) => {
            const isBookmarked = bookmarks.includes(q.id);
            const isSolutionOpen = expandedSolutions[q.id];
            const isSubmitted = submittedAnswers[q.id];
            const currentAns = userAnswers[q.id];

            return (
              <div key={q.id || idx} className="card-3d rounded-2xl p-5 sm:p-6 space-y-4">
                
                {/* Header info */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                    <span className="px-2.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800">
                      Q{q.id} ({q.year || 'PYQ'})
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-600 dark:text-slate-300 font-sans font-semibold">
                      {q.section || 'Agricultural Engineering'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onToggleBookmark(q.id)}
                      className={`p-1.5 rounded-lg border transition ${
                        isBookmarked
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-2xs'
                          : 'text-slate-400 border-slate-200 dark:border-slate-800 hover:text-amber-500'
                      }`}
                      title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Question'}
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>
                  </div>
                </div>

                {/* Question Text & KaTeX */}
                <div className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-medium leading-relaxed">
                  <MathRenderer content={q.questionText} />
                </div>

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
                        className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition"
                      >
                        Check Answer
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                    {q.options?.map((opt, oIdx) => {
                      const isSelected = currentAns === oIdx;
                      const isCorrect = q.correctOption === oIdx;
                      let btnStyle = 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300';
                      
                      if (isSubmitted) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold';
                        } else if (isSelected) {
                          btnStyle = 'bg-rose-500/10 border-rose-500 text-rose-600 dark:text-rose-400 font-bold';
                        }
                      } else if (isSelected) {
                        btnStyle = 'bg-blue-500/10 border-blue-500 text-blue-600 dark:text-blue-400 font-bold';
                      }

                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectOption(q.id, oIdx)}
                          className={`p-3 rounded-xl border text-left text-xs font-medium transition flex items-start gap-2.5 ${btnStyle}`}
                        >
                          <span className="font-bold font-mono text-slate-400 shrink-0">
                            ({String.fromCharCode(65 + oIdx)})
                          </span>
                          <span className="flex-1">
                            <MathRenderer content={opt} inline={true} />
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
                    className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isSolutionOpen ? 'Hide Detailed Solution' : 'View Detailed Solution & Explanation'}</span>
                    {isSolutionOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {q.type !== 'NAT' && !isSubmitted && (
                    <button
                      onClick={() => handleVerify(q.id)}
                      disabled={currentAns === undefined}
                      className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold disabled:opacity-50 hover:bg-emerald-700 transition"
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
                        Correct Answer: {q.type === 'NAT' ? q.natAnswerRange || q.correctAnswer : `Option (${String.fromCharCode(65 + q.correctOption)})`}
                      </span>
                    </div>

                    <div className="text-xs leading-relaxed text-slate-300">
                      <MathRenderer content={q.solution || q.solutionText || q.explanation || 'Detailed step-by-step calculation provided above.'} />
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
