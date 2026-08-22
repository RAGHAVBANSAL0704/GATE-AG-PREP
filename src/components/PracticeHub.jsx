import React, { useState, useEffect } from 'react';
import PracticeMode from './PracticeMode';
import CustomPracticePool from './CustomPracticePool';
import CustomTestCreator from './CustomTestCreator';
import { Layers, Sparkles, Sliders, Target } from 'lucide-react';

export default function PracticeHub({
  activeSubTab = 'practice',
  onSubTabChange,
  questions,
  customMockPapers,
  mockPapers,
  bookmarks,
  onToggleBookmark,
  practiceSection,
  onOpenCalc,
  onEditQuestion,
  onStartCustomTest
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
    { id: 'practice', label: 'PYQ Pool (Past Papers)', icon: Layers },
    { id: 'custompractice', label: 'Custom Pool (Mock Papers)', icon: Sparkles },
    { id: 'customtest', label: 'Custom Speed Test', icon: Sliders },
  ];

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      
      {/* Minimalist Header & Segment Switcher */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Practice Hub</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
              <strong className="text-blue-600 dark:text-blue-400">PYQ Pool</strong>: Solved Official GATE AG Past Year Questions • <strong className="text-purple-600 dark:text-purple-400">Custom Pool</strong>: Questions from Custom Mock Papers
            </p>
          </div>

          {/* Minimal Segment Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto shrink-0 w-full sm:w-auto">
            {subTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs font-bold'
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
        {currentSubTab === 'practice' && (
          <PracticeMode
            questions={questions}
            customMockPapers={customMockPapers}
            bookmarks={bookmarks}
            onToggleBookmark={onToggleBookmark}
            initialSection={practiceSection}
            onOpenCalc={onOpenCalc}
            onEditQuestion={onEditQuestion}
          />
        )}

        {currentSubTab === 'custompractice' && (
          <CustomPracticePool
            customMockPapers={customMockPapers}
            bookmarks={bookmarks}
            onToggleBookmark={onToggleBookmark}
            onOpenCalc={onOpenCalc}
            onEditQuestion={onEditQuestion}
          />
        )}

        {currentSubTab === 'customtest' && (
          <CustomTestCreator
            questions={questions}
            mockPapers={mockPapers}
            onStartCustomTest={onStartCustomTest}
            onOpenCalc={onOpenCalc}
          />
        )}
      </div>

    </div>
  );
}
