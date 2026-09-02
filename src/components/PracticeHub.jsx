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
  onStartCustomTest,
  currentStudent,
  onRequireAuth
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
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Sleek Header & Segment Switcher */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-xs">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Practice Hub
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                <strong className="text-blue-600 dark:text-blue-400">PYQ Pool</strong>: Solved Official GATE AG Past Questions • <strong className="text-purple-600 dark:text-purple-400">Custom Pool</strong>: Curated Mock Questions
              </p>
            </div>
          </div>

          {/* Segment Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-950 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-x-auto shrink-0 w-full sm:w-auto">
            {subTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs font-extrabold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
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
            currentStudent={currentStudent}
            onRequireAuth={onRequireAuth}
          />
        )}

        {currentSubTab === 'custompractice' && (
          <CustomPracticePool
            customMockPapers={customMockPapers}
            bookmarks={bookmarks}
            onToggleBookmark={onToggleBookmark}
            onOpenCalc={onOpenCalc}
            onEditQuestion={onEditQuestion}
            currentStudent={currentStudent}
            onRequireAuth={onRequireAuth}
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
