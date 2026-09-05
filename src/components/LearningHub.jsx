import React, { useState, useEffect } from 'react';
import ImportantConcepts from './ImportantConcepts';
import RevisionBank from './RevisionBank';
import FormulaSheet from './FormulaSheet';
import AgriSimulators from './AgriSimulators';
import SpacedRepetitionFlashcards from './SpacedRepetitionFlashcards';
import AIDiagnosticRadarHub from './AIDiagnosticRadarHub';
import { Lightbulb, Bookmark, FileText, GraduationCap, Cpu, Brain, FlaskConical, Sparkles } from 'lucide-react';

export default function LearningHub({
  activeSubTab = 'concepts',
  onSubTabChange,
  questions,
  customMockPapers,
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

  useEffect(() => {
    if (activeSubTab) {
      setCurrentSubTab(activeSubTab);
    }
  }, [activeSubTab]);

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

  return (
    <div className="space-y-6 animate-in fade-in duration-200 min-w-0 max-w-full overflow-hidden">
      
      {/* Notice Banner: Under Testing & Improvements */}
      <div className="bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-blue-500/10 border border-amber-500/30 dark:border-amber-500/20 rounded-2xl p-4 sm:p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-slate-800 dark:text-slate-200 shadow-xs">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 shrink-0">
            <FlaskConical className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold text-amber-700 dark:text-amber-300 uppercase tracking-wider bg-amber-500/20 px-2 py-0.5 rounded-md">
                Active Beta / Testing
              </span>
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                Learning Hub is under active testing & continuous improvement
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 mt-1">
              We are constantly refining concept guides, physics simulations, and formula sheets. Your valuable suggestions and feedback are warmly welcomed!
            </p>
          </div>
        </div>
      </div>

      {/* Responsive Header & Navigation Hub Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 text-xs font-bold">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>GATE Agricultural Engineering Learning Portal</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Learning Hub & Interactive Tools
            </h1>
          </div>
        </div>

        {/* Fully Responsive Flex-Wrap Bar of Sub-Tabs — Ensures 100% Full Un-truncated Text */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {subTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex-1 min-w-[140px] sm:min-w-[160px] flex items-center justify-center sm:justify-start gap-2 px-3.5 py-2.5 rounded-2xl text-[11px] sm:text-xs font-extrabold transition border cursor-pointer ${
                  isActive
                    ? 'bg-purple-600 text-white border-purple-600 shadow-md transform scale-[1.02]'
                    : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : tab.color.split(' ')[0]}`} />
                <span className="whitespace-normal break-words leading-tight text-center sm:text-left">{tab.label}</span>
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
