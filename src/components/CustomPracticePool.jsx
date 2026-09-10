import React, { useMemo, Suspense, lazy } from 'react';

const QuestionBankView = lazy(() => import('./QuestionBankView'));

/**
 * CustomPracticePool
 * Full-featured practice environment for all 50 GATE AG Full-Length Mock Papers (3,250 questions),
 * structured section-wise, topic-wise, and subtopic-wise with minimizable palette and per-question timer.
 */
export default function CustomPracticePool({ 
  customMockPapers = [], 
  bookmarks = [], 
  onToggleBookmark, 
  onOpenCalc,
  currentStudent,
  onRequireAuth,
  mistakeFilterIds = null
}) {
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
  );
}
