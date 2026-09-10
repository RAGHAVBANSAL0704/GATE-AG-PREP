import React, { useMemo, Suspense, lazy } from 'react';

const QuestionBankView = lazy(() => import('./QuestionBankView'));

/**
 * PracticeMode
 * Unified practice player bridging QuestionBankView for both Official GATE PYQs and Custom Mocks,
 * providing the exact Section, Topic, and Subtopic hierarchy explorer, minimizable question palette,
 * real-time per-question timer, and step-by-step mathematical explanations.
 */
export default function PracticeMode({ 
  questions = [], 
  customMockPapers = [], 
  bookmarks = [], 
  onToggleBookmark, 
  initialSection, 
  onOpenCalc, 
  onEditQuestion,
  currentStudent,
  onRequireAuth,
  mistakeFilterIds = null,
  onClearMistakeFilter,
  poolMode = 'pyq', // 'pyq' | 'custom' | 'all'
  initialSourceFilter = null,
  poolTitle = null,
  poolSubtitle = null,
  badgeText = null
}) {
  const isCustom = poolMode === 'custom' || initialSourceFilter === 'Custom Mock Questions';

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

  const poolQuestions = isCustom ? allCustomQuestions : questions;

  return (
    <Suspense fallback={
      <div className="p-12 text-center text-slate-500 dark:text-slate-400 font-semibold bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
        Loading Practice Session...
      </div>
    }>
      <QuestionBankView
        questionsData={poolQuestions}
        poolType={isCustom ? 'custom' : 'pyq'}
        poolTitle={poolTitle || (isCustom ? 'Custom Mock Questions Practice Pool' : 'Official GATE AG PYQ Practice Pool')}
        poolSubtitle={poolSubtitle || (isCustom 
          ? '3,250 curated questions across all 50 full-length GATE AG mock papers with section, topic, and subtopic breakdown.'
          : '1,324 official GATE Agricultural Engineering past paper questions (2007–2026) organized section-wise, topic-wise, and subtopic-wise with real-time per-question timer.')}
        badgeLabel={badgeText || (isCustom ? 'Custom Mock Pool (50 Full-Length Mocks)' : 'Official GATE PYQ Pool (2007–2026)')}
        badgeColor={isCustom ? 'purple' : 'blue'}
        storageKey={isCustom ? 'gate_ag_custom_progress' : 'gate_ag_pyq_progress'}
        initialSection={initialSection}
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
