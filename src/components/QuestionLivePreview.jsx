import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Check, 
  HelpCircle, 
  Eye, 
  EyeOff, 
  Zap, 
  Hash, 
  Layers, 
  Award,
  Image as ImageIcon,
  ZoomIn,
  X
} from 'lucide-react';
import MathRenderer from './MathRenderer';

/**
 * QuestionLivePreview
 * Real-time student-experience live preview of the complete question as it will appear in CBT / Practice modes.
 * Displays:
 * - Diagram / uploaded figure
 * - Question statement (with KaTeX math)
 * - Options with highlighted correct answer keys (MCQ / MSQ) or NAT numerical range
 * - Interactive progressive hints tester (Level 1, 2, 3)
 * - Step-by-step mathematical derivation / explanation
 * - Difficulty level badge & syllabus taxonomy tags
 */
export default function QuestionLivePreview({
  formData = {},
  paperTitle = '',
  className = ''
}) {
  const [revealedHintLevel, setRevealedHintLevel] = useState(0); // 0 = none, 1, 2, 3
  const [showFullSolution, setShowFullSolution] = useState(true);
  const [showLightbox, setShowLightbox] = useState(false);

  const {
    id = 'PREVIEW_Q',
    qnum = 1,
    section = 'Section 1: Engineering Mathematics',
    topic = '',
    subtopic = '',
    type = 'MCQ',
    marks = 1,
    difficulty = 'Moderate',
    question = '',
    image_url = '',
    options = { A: '', B: '', C: '', D: '' },
    correct_answer = 'A',
    solution = '',
    disable_hints = false,
    hint_level_1 = '',
    hint_level_2 = '',
    hint_level_3 = '',
    hints = []
  } = formData;

  // Gather hints array from either hints array or explicit hint_level_X fields
  const hint1 = hint_level_1 || (hints && hints[0]) || '';
  const hint2 = hint_level_2 || (hints && hints[1]) || '';
  const hint3 = hint_level_3 || (hints && hints[2]) || '';
  const activeHints = [hint1, hint2, hint3].filter(Boolean);

  // Normalize correct answer tokens for MCQ / MSQ comparison
  const correctTokens = (correct_answer || '')
    .split(',')
    .map(s => s.trim().toUpperCase())
    .filter(Boolean);

  // Difficulty badge styling
  const difficultyConfig = {
    Easy: {
      label: 'Easy',
      badgeClass: 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
      dotClass: 'bg-emerald-500'
    },
    Moderate: {
      label: 'Moderate',
      badgeClass: 'bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800',
      dotClass: 'bg-amber-500'
    },
    Difficult: {
      label: 'Difficult',
      badgeClass: 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800',
      dotClass: 'bg-rose-500'
    }
  };

  const diffStyle = difficultyConfig[difficulty] || difficultyConfig.Moderate;

  return (
    <div className={`space-y-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-lg ${className}`}>
      
      {/* Top Banner: Student Experience Live Preview */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Student Live Preview (KaTeX Math)</span>
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Paper / Section Pill */}
          <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            {paperTitle || 'GATE AG'} • Q{qnum}
          </span>

          {/* Question Type Badge */}
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            {type}
          </span>

          {/* Marks Badge */}
          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
            +{marks}M {type === 'MCQ' ? `(-${marks === 2 ? '0.67' : '0.33'})` : '(No Negative)'}
          </span>

          {/* Difficulty Badge */}
          <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-md border flex items-center gap-1.5 ${diffStyle.badgeClass}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${diffStyle.dotClass}`} />
            <span>{diffStyle.label}</span>
          </span>
        </div>
      </div>

      {/* Syllabus Taxonomy Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 flex-wrap font-medium">
        <Layers className="w-3.5 h-3.5 text-blue-500" />
        <span className="font-bold text-slate-700 dark:text-slate-300">{section}</span>
        {topic && topic !== 'None' && (
          <>
            <span>›</span>
            <span>{topic}</span>
          </>
        )}
        {subtopic && subtopic !== 'None' && (
          <>
            <span>›</span>
            <span className="text-slate-400">{subtopic}</span>
          </>
        )}
      </div>

      {/* Question Problem Statement */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
          <span>Question Statement:</span>
          <span className="font-mono text-[10px] text-slate-400">ID: {id}</span>
        </div>
        
        <div className="text-sm sm:text-base font-medium text-slate-900 dark:text-slate-100 leading-relaxed">
          <MathRenderer content={question || 'Type question statement to see rendered text...'} />
        </div>

        {/* Uploaded Diagram / Figure Rendering */}
        {image_url && (
          <div className="pt-2">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Question Diagram / Reference Figure</span>
                </span>
                <button
                  type="button"
                  onClick={() => setShowLightbox(true)}
                  className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-blue-600 cursor-pointer"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Inspect</span>
                </button>
              </div>

              <div 
                onClick={() => setShowLightbox(true)}
                className="flex items-center justify-center p-2 cursor-pointer bg-slate-50 dark:bg-slate-950/60 rounded-lg group"
                title="Click to zoom diagram"
              >
                <img
                  src={image_url}
                  alt="Question Diagram"
                  className="max-h-64 sm:max-h-72 max-w-full object-contain rounded transition group-hover:scale-[1.01]"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Options (MCQ / MSQ) or NAT Interval */}
      {type === 'NAT' ? (
        <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-blue-900 dark:text-blue-200 flex items-center gap-1.5 uppercase tracking-wider">
              <Hash className="w-4 h-4 text-blue-500" />
              <span>Official NAT Answer Evaluation Range</span>
            </span>
            <span className="text-xs font-mono font-extrabold text-blue-700 dark:text-blue-300 px-3 py-1 bg-white dark:bg-slate-900 rounded-xl border border-blue-200 dark:border-blue-800">
              {correct_answer || 'Enter numerical value / range'}
            </span>
          </div>
          <p className="text-[11px] text-blue-700 dark:text-blue-300">
            Students enter numerical values via the TCS iON virtual keypad. Evaluated against closed range or tolerance boundaries with zero negative penalty.
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>Options & Correct Answer Key:</span>
            <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
              Key: {correct_answer || 'None'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {['A', 'B', 'C', 'D'].map((key) => {
              const isCorrect = correctTokens.includes(key);
              const optText = options?.[key] || '';

              return (
                <div
                  key={key}
                  className={`p-3.5 rounded-2xl border transition flex items-start gap-3 ${
                    isCorrect
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-700 text-slate-900 dark:text-white shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 transition ${
                      isCorrect
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {isCorrect ? <Check className="w-4 h-4" /> : key}
                  </span>

                  <div className="flex-1 text-xs sm:text-sm font-medium pt-0.5 leading-relaxed">
                    <MathRenderer content={optText || `Option ${key}`} />
                  </div>

                  {isCorrect && (
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 shrink-0">
                      Correct Key
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Interactive Progressive Hints Live Preview */}
      <div className="p-4 rounded-2xl bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/20 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-amber-800 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-amber-500" />
            <span>Interactive Progressive Hints Tester</span>
          </span>

          {disable_hints ? (
            <span className="text-[11px] font-bold text-rose-500">
              🚫 Hints disabled for this question
            </span>
          ) : (
            <span className="text-[11px] text-slate-500">
              {activeHints.length} Hint{activeHints.length !== 1 ? 's' : ''} Configured
            </span>
          )}
        </div>

        {!disable_hints && (
          <div className="space-y-2">
            {/* Reveal Step Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setRevealedHintLevel(prev => prev === 1 ? 0 : 1)}
                disabled={!hint1}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border ${
                  revealedHintLevel >= 1
                    ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                    : hint1
                    ? 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-amber-400'
                    : 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Level 1: Core Formula {hint1 ? '' : '(Empty)'}</span>
              </button>

              <button
                type="button"
                onClick={() => setRevealedHintLevel(prev => prev === 2 ? 1 : 2)}
                disabled={!hint2}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border ${
                  revealedHintLevel >= 2
                    ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                    : hint2
                    ? 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-amber-400'
                    : 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Level 2: Unit Conversions {hint2 ? '' : '(Empty)'}</span>
              </button>

              <button
                type="button"
                onClick={() => setRevealedHintLevel(prev => prev === 3 ? 2 : 3)}
                disabled={!hint3}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border ${
                  revealedHintLevel >= 3
                    ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                    : hint3
                    ? 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-amber-400'
                    : 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Level 3: Calculation Lead-in {hint3 ? '' : '(Empty)'}</span>
              </button>

              {revealedHintLevel > 0 && (
                <button
                  type="button"
                  onClick={() => setRevealedHintLevel(0)}
                  className="text-[11px] text-slate-500 hover:underline font-semibold ml-auto cursor-pointer"
                >
                  Reset Hints
                </button>
              )}
            </div>

            {/* Revealed Hint Content Cards */}
            {revealedHintLevel >= 1 && hint1 && (
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200 leading-relaxed animate-in fade-in">
                <span className="font-extrabold uppercase text-[10px] text-amber-700 dark:text-amber-400 block mb-0.5">
                  Hint 1 (Formula / Principle):
                </span>
                <MathRenderer content={hint1} />
              </div>
            )}

            {revealedHintLevel >= 2 && hint2 && (
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200 leading-relaxed animate-in fade-in">
                <span className="font-extrabold uppercase text-[10px] text-amber-700 dark:text-amber-400 block mb-0.5">
                  Hint 2 (Units & Dimensions):
                </span>
                <MathRenderer content={hint2} />
              </div>
            )}

            {revealedHintLevel >= 3 && hint3 && (
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs text-amber-900 dark:text-amber-200 leading-relaxed animate-in fade-in">
                <span className="font-extrabold uppercase text-[10px] text-amber-700 dark:text-amber-400 block mb-0.5">
                  Hint 3 (Algebraic Guidance):
                </span>
                <MathRenderer content={hint3} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Step-by-Step Mathematical Derivation & Solution Preview */}
      <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Step-by-Step Mathematical Solution & Derivation</span>
          </span>

          <button
            type="button"
            onClick={() => setShowFullSolution(!showFullSolution)}
            className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
          >
            {showFullSolution ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showFullSolution ? 'Collapse' : 'Expand'}</span>
          </button>
        </div>

        {showFullSolution && (
          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-emerald-100 dark:border-emerald-950 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed space-y-2">
            <MathRenderer content={solution || 'Type step-by-step solution derivation to preview...'} />
          </div>
        )}
      </div>

      {/* Full Lightbox Inspection */}
      {showLightbox && image_url && (
        <div
          onClick={() => setShowLightbox(false)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white">
              <span className="flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-blue-500" />
                <span>Question Figure Inspection</span>
              </span>
              <button
                type="button"
                onClick={() => setShowLightbox(false)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-slate-50 dark:bg-slate-950/70 rounded-2xl mt-3">
              <img
                src={image_url}
                alt="Full Diagram Preview"
                className="max-h-[70vh] max-w-full object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
