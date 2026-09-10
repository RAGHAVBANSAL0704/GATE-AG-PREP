import React, { useState, useEffect, useRef, useMemo } from 'react';
import ImportantConcepts from './ImportantConcepts';
import RevisionBank from './RevisionBank';
import FormulaSheet from './FormulaSheet';
import AgriSimulators from './AgriSimulators';
import SpacedRepetitionFlashcards from './SpacedRepetitionFlashcards';
import AIDiagnosticRadarHub from './AIDiagnosticRadarHub';
import InlineAIConceptExplainer from './InlineAIConceptExplainer';
import { 
  Lightbulb, 
  Bookmark, 
  FileText, 
  GraduationCap, 
  Cpu, 
  Brain, 
  Sparkles,
  Search,
  X,
  ArrowRight,
  ExternalLink,
  Target,
  Layers,
  ChevronRight
} from 'lucide-react';
import { executeUniversalSearch } from '../utils/universalSearchEngine.js';

export default function LearningHub({
  activeSubTab = 'concepts',
  onSubTabChange,
  questions = [],
  customMockPapers = [],
  userStats,
  bookmarks,
  onToggleBookmark,
  onOpenCalc,
  onEditQuestion,
  onStartCustomTest,
  currentStudent,
  onStartPracticeMistakes
}) {
  const [currentSubTab, setCurrentSubTab] = useState(activeSubTab);
  
  // Universal Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('all');
  const [explainingItemId, setExplainingItemId] = useState(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (activeSubTab) {
      setCurrentSubTab(activeSubTab);
    }
  }, [activeSubTab]);

  // Global Keyboard Shortcut: '/' or 'Cmd+K' / 'Ctrl+K' to focus Universal Search
  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeTag = document.activeElement?.tagName?.toLowerCase();
      const isTyping = activeTag === 'input' || activeTag === 'textarea' || document.activeElement?.isContentEditable;

      if (e.key === '/' && !isTyping) {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      } else if (e.key === 'Escape' && searchQuery) {
        setSearchQuery('');
        setExplainingItemId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchQuery]);

  const handleTabClick = (tabId) => {
    setCurrentSubTab(tabId);
    if (onSubTabChange) {
      onSubTabChange(tabId);
    }
  };

  const subTabs = [
    { id: 'concepts', label: 'Core Concepts', icon: Lightbulb, color: 'text-blue-500 bg-blue-500/10 border-blue-500/20' },
    { id: 'radar', label: 'AI Weak-Area Radar', icon: Sparkles, color: 'text-purple-500 bg-purple-500/10 border-purple-500/20' },
    { id: 'simulators', label: 'Physics Simulators', icon: Cpu, color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' },
    { id: 'flashcards', label: 'SM-2 Flashcards', icon: Brain, color: 'text-amber-500 bg-amber-500/10 border-amber-500/20' },
    { id: 'revision', label: 'Revision Bank', icon: Bookmark, color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20' },
    { id: 'formulas', label: 'Formula Sheet', icon: FileText, color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20' },
  ];

  // Execute 4-Way Universal Search
  const { results: searchResults, counts: searchCounts } = useMemo(() => {
    return executeUniversalSearch({
      query: searchQuery,
      questions,
      categoryFilter: searchCategory,
      maxResults: 30
    });
  }, [searchQuery, questions, searchCategory]);

  const handleOpenSearchResult = (item) => {
    if (item.type === 'concepts') {
      handleTabClick('concepts');
    } else if (item.type === 'formulas') {
      handleTabClick('formulas');
    } else if (item.type === 'flashcards') {
      handleTabClick('flashcards');
    } else if (item.type === 'questions') {
      handleTabClick('revision');
    }
  };

  const getCategoryBadgeClass = (type) => {
    switch (type) {
      case 'concepts':
        return 'bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'formulas':
        return 'bg-cyan-50 dark:bg-cyan-950/80 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800';
      case 'flashcards':
        return 'bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'questions':
        return 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      default:
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 min-w-0 max-w-full overflow-hidden">
      
      {/* Responsive Header & Navigation Hub Bar with Universal Search */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-5">
        
        {/* Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 text-xs font-bold border border-purple-200 dark:border-purple-800/60">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>GATE Agricultural Engineering Learning Suite</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Learning Hub & Interactive Tools
            </h1>
          </div>
        </div>

        {/* 🔍 Universal 4-Way Search Bar */}
        <div className="space-y-2.5 pt-1">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across all Concepts, Formulas, Flashcards, and GATE PYQs (press '/' to focus)..."
              className="w-full bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-2xl pl-10 pr-24 py-3 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:ring-2 focus:ring-purple-500 font-medium transition-all shadow-xs"
            />
            <div className="absolute right-3 top-2.5 flex items-center gap-1.5">
              {searchQuery ? (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setExplainingItemId(null);
                  }}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono font-bold bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md border border-slate-300 dark:border-slate-700 shadow-xs">
                  /
                </kbd>
              )}
            </div>
          </div>

          {/* Category Filter Pills (Shown when search is active or typing) */}
          {searchQuery && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none animate-fadeIn text-xs">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-1 shrink-0">
                Filter:
              </span>
              {[
                { id: 'all', label: `All (${searchCounts.all})` },
                { id: 'concepts', label: `💡 Concepts (${searchCounts.concepts})` },
                { id: 'formulas', label: `📐 Formulas (${searchCounts.formulas})` },
                { id: 'flashcards', label: `🧠 Flashcards (${searchCounts.flashcards})` },
                { id: 'questions', label: `🎯 PYQs (${searchCounts.questions})` },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSearchCategory(cat.id)}
                  className={`px-3 py-1 rounded-xl font-bold transition whitespace-nowrap border cursor-pointer ${
                    searchCategory === cat.id
                      ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700/60 hover:bg-slate-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 📋 Universal Search Results Dropdown / Panel */}
        {searchQuery && (
          <div className="p-4 sm:p-5 rounded-2xl border border-purple-200 dark:border-purple-900/60 bg-slate-50/70 dark:bg-slate-950/60 space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
              <span className="font-bold">
                Found {searchResults.length} matching {searchResults.length === 1 ? 'result' : 'results'} for "{searchQuery}"
              </span>
              <span className="text-[11px]">
                Click 'Open' or 'Explain with AI' for in-depth breakdown
              </span>
            </div>

            {searchResults.length === 0 ? (
              <div className="p-6 text-center text-slate-500 dark:text-slate-400 text-xs">
                No matching items found across Concepts, Formulas, Flashcards, or Questions. Try different keywords.
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[55vh] overflow-y-auto pr-1">
                {searchResults.map((item) => {
                  const isExplaining = explainingItemId === item.id;
                  return (
                    <div 
                      key={item.id}
                      className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:border-purple-300 dark:hover:border-purple-700 transition space-y-2"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md border ${getCategoryBadgeClass(item.type)}`}>
                              {item.typeLabel}
                            </span>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate max-w-xs">
                              {item.subtitle}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white pt-0.5">
                            {item.title}
                          </h4>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => setExplainingItemId(isExplaining ? null : item.id)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition border cursor-pointer ${
                              isExplaining
                                ? 'bg-purple-600 text-white border-purple-600'
                                : 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/60 hover:bg-purple-100'
                            }`}
                          >
                            <Sparkles className={`w-3.5 h-3.5 ${isExplaining ? 'text-amber-300' : 'text-purple-500'}`} />
                            <span>{isExplaining ? 'Hide AI Explanation' : 'Explain with AI'}</span>
                          </button>

                          <button
                            onClick={() => handleOpenSearchResult(item)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition border border-slate-200 dark:border-slate-700 cursor-pointer"
                          >
                            <span>Open</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {item.snippet && (
                        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                          {item.snippet}
                        </p>
                      )}

                      {/* In-line AI Concept Explainer Accordion Expansion */}
                      {isExplaining && (
                        <div className="pt-2">
                          <InlineAIConceptExplainer 
                            topic={item.title}
                            onClose={() => setExplainingItemId(null)}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Fully Responsive Grid of Sub-Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          {subTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`w-full min-w-0 flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-2.5 rounded-2xl text-[11px] sm:text-xs font-extrabold transition border cursor-pointer ${
                  isActive
                    ? 'bg-purple-600 text-white border-purple-600 shadow-md transform scale-[1.01]'
                    : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : tab.color.split(' ')[0]}`} />
                <span className="truncate text-center sm:text-left">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Sub-Tab View Container */}
      <div className="w-full min-w-0">
        {currentSubTab === 'concepts' && (
          <ImportantConcepts />
        )}

        {currentSubTab === 'radar' && (
          <AIDiagnosticRadarHub 
            questions={questions}
            customMockPapers={customMockPapers}
            testAttempts={userStats?.testHistory || []}
            onStartCustomTest={onStartCustomTest}
            onOpenCalc={onOpenCalc}
          />
        )}

        {currentSubTab === 'simulators' && (
          <AgriSimulators />
        )}

        {currentSubTab === 'flashcards' && (
          <SpacedRepetitionFlashcards />
        )}

        {currentSubTab === 'revision' && (
          <RevisionBank
            questions={questions}
            customMockPapers={customMockPapers}
            userStats={userStats}
            bookmarks={bookmarks}
            onToggleBookmark={onToggleBookmark}
            onOpenCalc={onOpenCalc}
            onEditQuestion={onEditQuestion}
            onStartPracticeMistakes={onStartPracticeMistakes}
          />
        )}

        {currentSubTab === 'formulas' && (
          <FormulaSheet
            onOpenCalc={onOpenCalc}
          />
        )}
      </div>

    </div>
  );
}
