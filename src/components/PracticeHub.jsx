import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import CustomTestCreator from './CustomTestCreator';
import { Layers, Sparkles, Sliders, Target, Database, FileDown } from 'lucide-react';

const QuestionBankView = lazy(() => import('./QuestionBankView'));
const CustomPdfQuestionGenerator = lazy(() => import('./CustomPdfQuestionGenerator'));

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
  onDiscussQuestion,
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
    { id: 'qbank', label: 'Question Bank', count: '1,915 Qs', icon: Database },
    { id: 'practice', label: 'PYQ Pool', count: '1,324 Qs', icon: Layers },
    { id: 'custompractice', label: 'Custom Pool', count: '3,250 Qs', icon: Sparkles },
    { id: 'customtest', label: 'Speed Test Creator', icon: Sliders },
    { id: 'generator', label: 'PDF Generator', icon: FileDown },
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
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-xs">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Practice Hub
              </h1>
            </div>
          </div>

          {/* Segment Switcher */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-slate-950 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 w-full xl:w-auto max-w-full">
            {subTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex-1 sm:flex-initial whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs font-extrabold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                  {tab.count && (
                    <span className={`text-[11px] font-normal ${isActive ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>
                      ({tab.count})
                    </span>
                  )}
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
              Loading Autonomous Question Bank (1,915 Questions)...
            </div>
          }>
            <QuestionBankView
              poolType="qbank"
              poolTitle="Autonomous Question Bank"
              poolSubtitle="Modular repository of 1,915 high-yield questions categorized across all 8 official GATE AG sections."
              badgeLabel="1,915 Topic-Wise Qs"
              badgeColor="emerald"
              storageKey="gate_ag_qbank_progress"
              onOpenCalc={onOpenCalc}
              bookmarks={bookmarks}
              onToggleBookmark={onToggleBookmark}
              onDiscussQuestion={onDiscussQuestion}
              currentStudent={currentStudent}
              onRequireAuth={onRequireAuth}
              mistakeFilterIds={mistakeFilterIds}
            />
          </Suspense>
        )}

        {currentSubTab === 'practice' && (
          <Suspense fallback={
            <div className="p-12 text-center text-slate-500 dark:text-slate-400 font-semibold bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
              Loading Official GATE AG PYQ Practice Pool (1,324 Questions)...
            </div>
          }>
            <QuestionBankView
              poolType="pyq"
              questionsData={questions}
              poolTitle="Official GATE AG PYQ Practice Pool"
              poolSubtitle="1,324 official GATE Agricultural Engineering past paper questions (2007–2026) organized section-wise, topic-wise, and subtopic-wise with real-time per-question timer."
              badgeLabel="1,324 Official PYQs (2007–2026)"
              badgeColor="blue"
              storageKey="gate_ag_pyq_progress"
              initialSection={practiceSection}
              onOpenCalc={onOpenCalc}
              bookmarks={bookmarks}
              onToggleBookmark={onToggleBookmark}
              onDiscussQuestion={onDiscussQuestion}
              currentStudent={currentStudent}
              onRequireAuth={onRequireAuth}
              mistakeFilterIds={mistakeFilterIds}
            />
          </Suspense>
        )}

        {currentSubTab === 'custompractice' && (
          <Suspense fallback={
            <div className="p-12 text-center text-slate-500 dark:text-slate-400 font-semibold bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
              Loading Custom Mock Questions Practice Pool (3,250 Questions)...
            </div>
          }>
            <QuestionBankView
              poolType="custom"
              questionsData={allCustomQuestions}
              poolTitle="Custom Mock Questions Practice Pool"
              poolSubtitle="3,250 curated questions across all 50 full-length GATE AG mock papers with section, topic, and subtopic breakdown."
              badgeLabel="3,250 Mocks (50 Full Papers)"
              badgeColor="purple"
              storageKey="gate_ag_custom_progress"
              onOpenCalc={onOpenCalc}
              bookmarks={bookmarks}
              onToggleBookmark={onToggleBookmark}
              onDiscussQuestion={onDiscussQuestion}
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
            customMockPapers={customMockPapers}
            allCustomQuestions={allCustomQuestions}
            onStartCustomTest={onStartCustomTest}
            onOpenCalc={onOpenCalc}
            currentStudent={currentStudent}
            onRequireAuth={onRequireAuth}
          />
        )}

        {currentSubTab === 'generator' && (
          <Suspense fallback={
            <div className="p-12 text-center text-slate-500 dark:text-slate-400 font-semibold bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
              Loading Printable PDF &amp; Custom Paper Generator...
            </div>
          }>
            <CustomPdfQuestionGenerator
              questions={questions}
              mockPapers={mockPapers}
              customMockPapers={customMockPapers}
            />
          </Suspense>
        )}
      </div>

    </div>
  );
}
