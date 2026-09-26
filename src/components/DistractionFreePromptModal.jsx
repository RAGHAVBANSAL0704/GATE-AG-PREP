import React, { useEffect } from 'react';
import { 
  Maximize2, 
  Sparkles, 
  Clock, 
  Calculator, 
  BookOpen, 
  ShieldCheck, 
  X, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  Eye,
  Sliders
} from 'lucide-react';

/**
 * DistractionFreePromptModal
 * 
 * Confirmation modal before entering the dedicated distraction-free practice or CBT exam environment.
 * Ensures students can deliberately approve entering full focus mode with zero sidebars/banners.
 */
export default function DistractionFreePromptModal({
  isOpen,
  mode = 'practice', // 'practice' | 'cbt'
  title = 'Distraction-Free Focus Arena',
  subtitle = 'Agricultural Engineering Practice Session',
  scopeDetails = {},
  onConfirmDistractionFree,
  onConfirmStandard,
  onClose,
  allowStandardView = true
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
        onConfirmDistractionFree();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onConfirmDistractionFree]);

  if (!isOpen) return null;

  const isCbt = mode === 'cbt';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="prompt-modal-title"
    >
      <div 
        className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden transition-all transform animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className={`px-6 py-5 ${
          isCbt 
            ? 'bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white' 
            : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white'
        } relative`}>
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0 shadow-inner">
              {isCbt ? (
                <ShieldCheck className="w-6 h-6 text-white" />
              ) : (
                <Zap className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider font-black px-2 py-0.5 rounded-full bg-white/20 text-white border border-white/30">
                  {isCbt ? 'Official CBT Simulation' : 'Focus Arena'}
                </span>
                <span className="text-[11px] text-white/80 font-medium">
                  {isCbt ? 'GATE AG Test Hall' : 'Zero Distraction'}
                </span>
              </div>
              <h2 id="prompt-modal-title" className="text-xl sm:text-2xl font-black text-white mt-0.5">
                {title}
              </h2>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-white/90 font-medium mt-2 leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-5">
          {/* Scope / Session Info Card */}
          {scopeDetails && Object.keys(scopeDetails).length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-950/80 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-2.5">
              <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Session Blueprint
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {scopeDetails.section && (
                  <div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">Section</div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white truncate" title={scopeDetails.section}>
                      {scopeDetails.section}
                    </div>
                  </div>
                )}
                {scopeDetails.topic && (
                  <div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">Topic</div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white truncate" title={scopeDetails.topic}>
                      {scopeDetails.topic}
                    </div>
                  </div>
                )}
                {scopeDetails.questionCount !== undefined && (
                  <div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">Questions</div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      {scopeDetails.questionCount} {scopeDetails.questionCount === 1 ? 'Question' : 'Questions'}
                    </div>
                  </div>
                )}
                {scopeDetails.duration && (
                  <div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">Duration</div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      {scopeDetails.duration}
                    </div>
                  </div>
                )}
                {scopeDetails.type && (
                  <div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">Type Filter</div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      {scopeDetails.type}
                    </div>
                  </div>
                )}
                {scopeDetails.marks && (
                  <div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">Weightage</div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      {scopeDetails.marks} Marks
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Value Props / Distraction-Free Checklist */}
          <div className="space-y-2.5">
            <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Distraction-Free Environment Features
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Sidebars &amp; network strips hidden</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80">
                <Clock className="w-4 h-4 text-blue-500 shrink-0" />
                <span>{isCbt ? 'Official 180m live countdown' : 'Per-question focus timer'}</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80">
                <Calculator className="w-4 h-4 text-purple-500 shrink-0" />
                <span>Integrated GATE Virtual Calculator</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80">
                <BookOpen className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Quick-access GATE AG formulas</span>
              </div>
            </div>
          </div>

          {/* Quick Notice */}
          <p className="text-[11px] text-slate-500 dark:text-slate-400 bg-blue-50/60 dark:bg-blue-950/40 p-3 rounded-xl border border-blue-200/60 dark:border-blue-900/40 leading-relaxed">
            💡 <strong>Full Immersion:</strong> You can exit anytime using the top bar exit button or pressing <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-mono">ESC</kbd>. All progress and answers are saved automatically.
          </p>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition cursor-pointer text-center"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {allowStandardView && onConfirmStandard && (
              <button
                type="button"
                onClick={onConfirmStandard}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 text-xs font-bold transition cursor-pointer text-center"
              >
                Standard View
              </button>
            )}

            <button
              type="button"
              onClick={onConfirmDistractionFree}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl ${
                isCbt
                  ? 'bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white'
              } text-xs font-black shadow-md flex items-center justify-center gap-2 transition cursor-pointer`}
            >
              <span>Yes, Launch Distraction-Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
