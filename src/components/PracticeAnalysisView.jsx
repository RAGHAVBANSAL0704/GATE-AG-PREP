import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Clock, 
  RotateCcw, 
  Sparkles, 
  ChevronRight, 
  ArrowLeft, 
  Bookmark, 
  Calculator, 
  Layers, 
  BarChart3, 
  Filter, 
  Zap,
  Award,
  BookOpen,
  Share2
} from 'lucide-react';
import MathRenderer from './MathRenderer';
import confetti from 'canvas-confetti';
import { downloadScorecardImage } from '../utils/scorecardGenerator';

function formatDuration(seconds) {
  const s = Math.max(0, Math.round(Number(seconds) || 0));
  const m = Math.floor(s / 60);
  const rem = s % 60;
  if (m > 0) return `${m}m ${rem}s`;
  return `${rem}s`;
}

export default function PracticeAnalysisView({
  sessionResult,
  onRetakeIncorrect,
  onRetakeAll,
  onReturnToHub,
  onOpenCalc,
  bookmarks = [],
  onToggleBookmark,
  onAskAI,
  returnLabel = 'Back to Practice Hub'
}) {
  const [filterType, setFilterType] = useState('ALL'); // 'ALL' | 'CORRECT' | 'INCORRECT' | 'UNATTEMPTED'

  useEffect(() => {
    if (sessionResult && sessionResult.accuracy >= 60) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  }, [sessionResult]);

  if (!sessionResult) return null;

  const {
    totalQuestions = 0,
    attemptedCount = 0,
    unattemptedCount = 0,
    correctCount = 0,
    incorrectCount = 0,
    score = 0,
    totalPossibleMarks = 0,
    accuracy = 0,
    totalTimeSec = 0,
    avgTimeSec = 0,
    questionEvaluations = [],
    sectionStats = []
  } = sessionResult;

  const filteredQuestions = questionEvaluations.filter(q => {
    if (filterType === 'CORRECT') return q.isCorrect;
    if (filterType === 'INCORRECT') return q.isAttempted && !q.isCorrect;
    if (filterType === 'UNATTEMPTED') return !q.isAttempted;
    return true;
  });

  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  const handleShareImage = async () => {
    setIsGeneratingImage(true);
    try {
      await downloadScorecardImage({
        title: 'GATE AG Practice Session Result',
        studentName: sessionResult?.student_name || 'Candidate',
        score: score,
        totalMarks: totalPossibleMarks || totalQuestions,
        accuracy: accuracy,
        airTier: accuracy >= 80 ? 'Mastery Tier' : (accuracy >= 60 ? 'Competitive Tier' : 'Needs Practice'),
        correctCount: correctCount,
        incorrectCount: incorrectCount,
        unattemptedCount: unattemptedCount,
        date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
      }, 'GATE_AG_Practice_Summary.png');
    } catch (err) {
      console.error("Scorecard generation error:", err);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 pb-16">
      
      {/* Top Banner Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onReturnToHub}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-xs transition shadow-xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{returnLabel}</span>
        </button>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleShareImage}
            disabled={isGeneratingImage}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-md transition cursor-pointer disabled:opacity-50"
            title="Download Shareable Scorecard Card (PNG)"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{isGeneratingImage ? 'Generating...' : 'Share Card (PNG)'}</span>
          </button>

          {onOpenCalc && (
            <button
              onClick={onOpenCalc}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-blue-500" />
              <span>Virtual Calc</span>
            </button>
          )}

          {incorrectCount > 0 && (
            <button
              onClick={onRetakeIncorrect}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 font-extrabold text-xs shadow-md shadow-amber-500/20 transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake {incorrectCount} Incorrect Qs</span>
            </button>
          )}

          <button
            onClick={onRetakeAll}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-500/25 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Entire Set</span>
          </button>
        </div>
      </div>

      {/* Hero Scorecard Card */}
      <div className="card-3d rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-white via-blue-50/40 to-indigo-50/30 dark:from-slate-900 dark:via-blue-950/20 dark:to-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 text-xs font-extrabold border border-blue-200 dark:border-blue-900">
              <Trophy className="w-3.5 h-3.5" />
              <span>Practice Session Completed</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Session Performance & Accuracy Analysis
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium max-w-xl">
              Here is your comprehensive scorecard covering answer evaluations, step-by-step solutions, section-wise mastery, and time pacing.
            </p>
          </div>

          {/* Big Score / Accuracy Badge */}
          <div className="flex items-center gap-4 bg-white dark:bg-slate-950/80 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm shrink-0">
            <div className="text-center">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-500 dark:text-slate-400 block">
                Session Accuracy
              </span>
              <span className={`text-3xl sm:text-4xl font-mono font-black ${
                accuracy >= 75 ? 'text-emerald-600 dark:text-emerald-400' :
                accuracy >= 45 ? 'text-blue-600 dark:text-blue-400' :
                'text-amber-600 dark:text-amber-400'
              }`}>
                {accuracy}%
              </span>
            </div>
            <div className="h-10 w-px bg-slate-200 dark:bg-slate-800" />
            <div className="text-center">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-500 dark:text-slate-400 block">
                Marks Obtained
              </span>
              <span className="text-2xl sm:text-3xl font-mono font-black text-slate-900 dark:text-white">
                {score} <span className="text-sm text-slate-400 font-normal">/ {totalPossibleMarks}</span>
              </span>
            </div>
          </div>
        </div>

        {/* 4 Core Summary Stat Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-2xs">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Correct</span>
            </div>
            <div className="text-2xl font-mono font-black text-emerald-600 dark:text-emerald-400 mt-1">
              {correctCount} <span className="text-xs font-normal text-slate-400">/ {totalQuestions}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-2xs">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-bold">
              <XCircle className="w-4 h-4 text-rose-500" />
              <span>Incorrect</span>
            </div>
            <div className="text-2xl font-mono font-black text-rose-600 dark:text-rose-400 mt-1">
              {incorrectCount}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-2xs">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-bold">
              <HelpCircle className="w-4 h-4 text-slate-400" />
              <span>Unattempted</span>
            </div>
            <div className="text-2xl font-mono font-black text-slate-700 dark:text-slate-300 mt-1">
              {unattemptedCount}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-2xs">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-bold">
              <Clock className="w-4 h-4 text-indigo-500" />
              <span>Time Spent</span>
            </div>
            <div className="text-xl font-mono font-black text-slate-900 dark:text-white mt-1 truncate">
              {formatDuration(totalTimeSec)} <span className="text-xs font-normal text-slate-400 font-sans">({avgTimeSec}s/Q)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section-Wise Mastery Breakdown */}
      {sectionStats && sectionStats.length > 0 && (
        <div className="card-3d rounded-3xl p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h2 className="text-base font-black text-slate-900 dark:text-white">
                Section-wise Breakdown
              </h2>
            </div>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              {sectionStats.length} Sections Tested
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {sectionStats.map((sec) => (
              <div 
                key={sec.section}
                className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-xs text-slate-900 dark:text-white truncate" title={sec.section}>
                    {sec.section}
                  </span>
                  <span className={`text-xs font-mono font-extrabold ${
                    sec.accuracy >= 70 ? 'text-emerald-600 dark:text-emerald-400' :
                    sec.accuracy >= 40 ? 'text-blue-600 dark:text-blue-400' :
                    'text-amber-600 dark:text-amber-400'
                  }`}>
                    {sec.accuracy}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      sec.accuracy >= 70 ? 'bg-emerald-500' :
                      sec.accuracy >= 40 ? 'bg-blue-500' :
                      'bg-amber-500'
                    }`}
                    style={{ width: `${Math.max(4, sec.accuracy)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium pt-0.5">
                  <span>{sec.correct} of {sec.total} Correct</span>
                  <span>{sec.attempted} Attempted</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Question Review & Solutions List */}
      <div className="card-3d rounded-3xl p-6 sm:p-7 space-y-6">
        
        {/* Review Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-base font-black text-slate-900 dark:text-white">
              Question-by-Question Solution & Review
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
            <button
              onClick={() => setFilterType('ALL')}
              className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                filterType === 'ALL'
                  ? 'bg-blue-600 text-white shadow-xs font-extrabold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All ({questionEvaluations.length})
            </button>
            <button
              onClick={() => setFilterType('CORRECT')}
              className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center gap-1 ${
                filterType === 'CORRECT'
                  ? 'bg-emerald-600 text-white shadow-xs font-extrabold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Correct ({correctCount})</span>
            </button>
            <button
              onClick={() => setFilterType('INCORRECT')}
              className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center gap-1 ${
                filterType === 'INCORRECT'
                  ? 'bg-rose-600 text-white shadow-xs font-extrabold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Incorrect ({incorrectCount})</span>
            </button>
            <button
              onClick={() => setFilterType('UNATTEMPTED')}
              className={`px-3 py-1.5 rounded-lg font-bold transition cursor-pointer flex items-center gap-1 ${
                filterType === 'UNATTEMPTED'
                  ? 'bg-slate-600 text-white shadow-xs font-extrabold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Skipped ({unattemptedCount})</span>
            </button>
          </div>
        </div>

        {/* Questions Cards */}
        <div className="space-y-4">
          {filteredQuestions.length === 0 ? (
            <div className="py-12 text-center space-y-2 text-slate-500 dark:text-slate-400 text-xs">
              <CheckCircle2 className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-700" />
              <p className="font-bold">No questions match this filter view.</p>
            </div>
          ) : (
            filteredQuestions.map((item, idx) => {
              const q = item.question;
              const isBookmarked = bookmarks.includes(q.id);

              return (
                <div
                  key={q.id || idx}
                  className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                    item.isCorrect
                      ? 'bg-emerald-50/30 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-900/50'
                      : item.isAttempted
                      ? 'bg-rose-50/30 dark:bg-rose-950/10 border-rose-200 dark:border-rose-900/50'
                      : 'bg-slate-50/50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {/* Question Header Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-black font-mono ${
                        item.isCorrect
                          ? 'bg-emerald-500 text-white'
                          : item.isAttempted
                          ? 'bg-rose-500 text-white'
                          : 'bg-slate-400 text-white'
                      }`}>
                        Q{idx + 1}
                      </span>

                      <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                        {q.section}
                      </span>

                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {q.type} • {q.marks || 1}M
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-mono font-medium flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{formatDuration(item.timeSpentSec || 0)}</span>
                      </span>

                      {onToggleBookmark && (
                        <button
                          onClick={() => onToggleBookmark(q.id)}
                          className={`p-1.5 rounded-lg border transition cursor-pointer ${
                            isBookmarked
                              ? 'bg-amber-500/20 text-amber-500 border-amber-500/40'
                              : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 border-slate-200 dark:border-slate-700'
                          }`}
                          title="Bookmark Question"
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500' : ''}`} />
                        </button>
                      )}

                      {onAskAI && (
                        <button
                          onClick={() => onAskAI(q, item.userAnswer, item.isCorrect)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-900 font-bold text-[11px] hover:bg-purple-100 transition cursor-pointer"
                        >
                          <Sparkles className="w-3 h-3 text-purple-500" />
                          <span>Ask AI Tutor</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Question Stem */}
                  <div className="text-sm leading-relaxed text-slate-900 dark:text-slate-100 font-medium mb-4">
                    <MathRenderer content={q.question || q.question_text} />
                  </div>

                  {/* Question Image if present */}
                  {q.image_url && (
                    <div className="my-3 max-w-md rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                      <img src={q.image_url} alt="Question Diagram" className="w-full h-auto object-contain" />
                    </div>
                  )}

                  {/* Answer Comparison Strip */}
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-500 dark:text-slate-400">Your Answer:</span>
                      <span className={`font-mono font-extrabold ${
                        item.isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 
                        item.isAttempted ? 'text-rose-600 dark:text-rose-400' : 'text-slate-400'
                      }`}>
                        {item.userAnswer ? String(item.userAnswer) : 'Not Attempted'}
                      </span>
                      {item.isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 inline" />
                      ) : item.isAttempted ? (
                        <XCircle className="w-4 h-4 text-rose-500 inline" />
                      ) : null}
                    </div>

                    <div className="flex items-center gap-2 font-mono">
                      <span className="font-bold text-slate-500 dark:text-slate-400">Official Key:</span>
                      <span className="font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                        {q.correct_answer || q.answer}
                      </span>
                    </div>
                  </div>

                  {/* Step-by-Step Solution Accordion / Box */}
                  {(q.solution || q.explanation) && (
                    <div className="mt-4 p-4 rounded-xl bg-slate-100/70 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
                        Step-by-Step Solution:
                      </span>
                      <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                        <MathRenderer content={q.solution || q.explanation} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

      </div>

    </div>
  );
}
