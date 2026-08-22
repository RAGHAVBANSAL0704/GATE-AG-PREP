import React, { useState, useEffect } from 'react';
import ImportantConcepts from './ImportantConcepts';
import RevisionBank from './RevisionBank';
import FormulaSheet from './FormulaSheet';
import { Lightbulb, Bookmark, FileText, GraduationCap } from 'lucide-react';

export default function LearningHub({
  activeSubTab = 'concepts',
  onSubTabChange,
  questions,
  customMockPapers,
  userStats,
  bookmarks,
  onToggleBookmark,
  onOpenCalc,
  onEditQuestion
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
    { id: 'concepts', label: 'Important Concepts', icon: Lightbulb },
    { id: 'revision', label: 'Revision Bank', icon: Bookmark },
    { id: 'formulas', label: 'Formula Sheet', icon: FileText },
  ];

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      
      {/* Minimalist Header & Segment Switcher */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span>Learning Hub</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              High-yield core concepts, bookmarked revision vault, and LaTeX formula cheat-sheets.
            </p>
          </div>

          {/* Minimal Segment Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto shrink-0">
            {subTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-xs font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : ''}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Tool View */}
      <div>
        {currentSubTab === 'concepts' && (
          <ImportantConcepts />
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
