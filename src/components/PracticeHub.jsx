import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import PracticeMode from './PracticeMode';
import CustomPracticePool from './CustomPracticePool';
import CustomTestCreator from './CustomTestCreator';
import { Layers, Sparkles, Sliders, Target, Database } from 'lucide-react';

const QuestionBankView = lazy(() => import('./QuestionBankView'));

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
  onRequireAuth,
  mistakeFilterIds,
  onClearMistakeFilter
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
    { id: 'qbank', label: 'Question Bank (Topic-wise)', icon: Database },
    { id: 'practice', label: 'PYQ Pool (Past Papers)', icon: Layers },
    { id: 'custompractice', label: 'Custom Pool (Mock Papers)', icon: Sparkles },
    { id: 'customtest', label: 'Custom Speed Test', icon: Sliders },
  ];

  const allCustomQuestions = useMemo(() => {
    return (customMockPapers || []).flatMap((p, pIdx) =>
      (p.questions || []).map(q => ({
        ...q,
        paperTitle: p.title || `Mock Test ${pIdx + 1}`,
        sourceTitle: p.title || `Mock Test ${pIdx + 1}`,
        isCustomUploaded: true
      }))
    );
  }, [customMockPapers]);

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
                <strong className="text-emerald-600 dark:text-emerald-400">Question Bank</strong>: 1,200+ Topic-wise Qs • <strong className="text-blue-600 dark:text-blue-400">PYQ Pool</strong>: Solved Official Past Papers • <strong className="text-purple-600 dark:text-purple-400">Custom Pool</strong>: Curated Mocks
              </p>
            </div>
          </div>

          {/* Segment Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-950 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-none shrink-0 w-full sm:w-auto">
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
        {(currentSubTab === 'qbank' || currentSubTab === 'questionbank') && (
          <Suspense fallback={
            <div className="p-12 text-center text-slate-500 dark:text-slate-400 font-semibold bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
              Loading Autonomous Question Bank...
            </div>
          }>
            <QuestionBankView
              poolType="qbank"
              poolTitle="Autonomous Question Bank"
              poolSubtitle="Modular repository of high-yield questions categorized across all 8 official GATE AG sections."
              badgeLabel="Topic & Subtopic Wise"
              badgeColor="emerald"
              storageKey="gate_ag_qbank_progress"
              onOpenCalc={onOpenCalc}
              bookmarks={bookmarks}
              onToggleBookmark={onToggleBookmark}
              currentStudent={currentStudent}
              onRequireAuth={onRequireAuth}
              mistakeFilterIds={mistakeFilterIds}
            />
          </Suspense>
        )}

        {currentSubTab === 'practice' && (
          <Suspense fallback={
            <div className="p-12 text-center text-slate-500 dark:text-slate-400 font-semibold bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
              Loading Official GATE AG PYQ Practice Pool...
            </div>
          }>
            <QuestionBankView
              poolType="pyq"
              questionsData={questions}
              poolTitle="Official GATE AG PYQ Practice Pool"
              poolSubtitle="1,324 official GATE Agricultural Engineering past paper questions (2007–2026) organized section-wise, topic-wise, and subtopic-wise with real-time per-question timer."
              badgeLabel="Official GATE PYQ Pool (2007–2026)"
              badgeColor="blue"
              storageKey="gate_ag_pyq_progress"
              initialSection={practiceSection}
              onOpenCalc={onOpenCalc}
              bookmarks={bookmarks}
              onToggleBookmark={onToggleBookmark}
              currentStudent={currentStudent}
              onRequireAuth={onRequireAuth}
              mistakeFilterIds={mistakeFilterIds}
            />
          </Suspense>
        )}

        {currentSubTab === 'custompractice' && (
          <Suspense fallback={
            <div className="p-12 text-center text-slate-500 dark:text-slate-400 font-semibold bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
              Loading Custom Mock Questions Practice Pool...
            </div>
          }>
            <QuestionBankView
              poolType="custom"
              questionsData={allCustomQuestions}
              poolTitle="Custom Mock Questions Practice Pool"
              poolSubtitle="3,250 curated questions across all 50 full-length GATE AG mock papers with section, topic, and subtopic breakdown."
              badgeLabel="Custom Mock Pool (50 Full-Length Mocks)"
              badgeColor="purple"
              storageKey="gate_ag_custom_progress"
              onOpenCalc={onOpenCalc}
              bookmarks={bookmarks}
              onToggleBookmark={onToggleBookmark}
              currentStudent={currentStudent}
              onRequireAuth={onRequireAuth}
              mistakeFilterIds={mistakeFilterIds}
            />
          </Suspense>
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
