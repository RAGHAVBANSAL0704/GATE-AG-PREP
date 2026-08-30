import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Clock, 
  RotateCcw, 
  ArrowRight,
  Eye,
  Award,
  BarChart3,
  Download,
  Printer,
  Sparkles
} from 'lucide-react';
import MathRenderer from './MathRenderer';
import AITutorModal from './AITutorModal';
import confetti from 'canvas-confetti';
import { analyzeTestResultForensics } from '../utils/forensicAnalyzer';

export default function TestResultModal({ result, onClose, onRetake }) {
  const [filterType, setFilterType] = useState('ALL'); // 'ALL', 'CORRECT', 'INCORRECT', 'UNATTEMPTED'
  const [activeAIQuestion, setActiveAIQuestion] = useState(null);

  useEffect(() => {
    if (result && result.score > 30) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  }, [result]);

  if (!result) return null;

  const {
    year,
    score,
    correctCount,
    incorrectCount,
    unattemptedCount,
    timeTakenSec,
    userAnswers,
    questionStates,
    paperQuestions
  } = result;

  const totalQuestions = paperQuestions.length;
  const accuracy = (correctCount + incorrectCount) > 0 
    ? Math.round((correctCount / (correctCount + incorrectCount)) * 100) 
    : 0;

  const minutesTaken = Math.floor(timeTakenSec / 60);
  const secondsTaken = timeTakenSec % 60;

  // Estimated Percentile
  let estimatedPercentile = "90.0+";
  if (score >= 60) estimatedPercentile = "99.5+ (Top 10 AIR)";
  else if (score >= 45) estimatedPercentile = "98.0+ (Top 50 AIR)";
  else if (score >= 35) estimatedPercentile = "92.0+ (Top 200 AIR)";
  else if (score >= 25) estimatedPercentile = "80.0+ (Qualifying Cutoff)";
  else estimatedPercentile = "< 75.0 (Needs Revision)";

  const handleDownloadPDF = () => {
    const printWindow = window.open('', '_blank', 'width=900,height=1100');
    if (!printWindow) return;

    const escapeHtml = (str) => {
      if (str === null || str === undefined) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };

    const itemsHtml = paperQuestions.map(q => {
      const rawUserAns = userAnswers[q.id];
      const userAns = rawUserAns !== undefined && rawUserAns !== '' ? rawUserAns : 'Not Answered';
      const key = q.correct_answer || q.answer || '';
      const solution = q.solution || 'Official key confirmed.';
      const qnum = q.qnum || '';
      const qtype = q.type || '';
      const qmarks = q.marks !== undefined ? q.marks : '';

      return `
        <div style="margin-bottom: 12px; padding: 10px; border: 1px solid #e2e8f0; border-radius: 8px; font-family: sans-serif; font-size: 12px;">
          <div style="font-weight: bold; margin-bottom: 4px; color: #0f172a;">Q.${escapeHtml(qnum)} (${escapeHtml(qtype)} • ${escapeHtml(qmarks)} Mark)</div>
          <div style="margin-bottom: 6px; color: #334155;">${escapeHtml(q.question)}</div>
          <div style="font-family: monospace; font-size: 11px; margin-bottom: 4px; background: #f8fafc; padding: 6px; border-radius: 4px;">
            <strong>Your Answer:</strong> ${escapeHtml(userAns)} | <strong>Official Key:</strong> ${escapeHtml(key)}
          </div>
          <div style="color: #475569; font-size: 11px;">
            <strong>Solution Note:</strong> ${escapeHtml(solution)}
          </div>
        </div>
      `;
    }).join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>GATE ${escapeHtml(year)} AG Exam Scorecard Report</title>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; padding: 24px; color: #0f172a; }
            h1 { font-size: 20px; color: #1e293b; margin-bottom: 4px; }
            .badge { display: inline-block; padding: 4px 8px; background: #eff6ff; color: #1d4ed8; font-size: 11px; font-weight: bold; border-radius: 4px; margin-bottom: 12px; }
            .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px; }
            .card { background: #f8fafc; border: 1px solid #cbd5e1; padding: 12px; border-radius: 8px; font-size: 12px; }
            .val { font-size: 18px; font-weight: bold; font-family: monospace; margin-top: 4px; }
          </style>
        </head>
        <body>
          <div class="badge">GATE AG PREP PORTAL — OFFICIAL CBT REPORT</div>
          <h1>GATE ${escapeHtml(year)} Paper Performance Scorecard</h1>
          <p style="font-size: 12px; color: #64748b; margin-bottom: 16px;">Test Date: ${escapeHtml(new Date().toLocaleDateString())} | Candidate ID: AG-GATE-${escapeHtml(year)}</p>
          
          <div class="grid">
            <div class="card">
              <div>Total Marks</div>
              <div class="val" style="color: #059669;">${escapeHtml(score)} / 100</div>
            </div>
            <div class="card">
              <div>Correct Answers</div>
              <div class="val" style="color: #059669;">${escapeHtml(correctCount)} / ${escapeHtml(totalQuestions)}</div>
            </div>
            <div class="card">
              <div>Incorrect Answers</div>
              <div class="val" style="color: #dc2626;">${escapeHtml(incorrectCount)}</div>
            </div>
            <div class="card">
              <div>Accuracy</div>
              <div class="val" style="color: #7c3aed;">${escapeHtml(accuracy)}%</div>
            </div>
          </div>

          <h2>Question-by-Question Detailed Review & Answers</h2>
          ${itemsHtml}
        </body>
      </html>
    `);

    printWindow.document.close();
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 500);
  };

  const filteredQs = paperQuestions.filter(q => {
    const userAns = userAnswers[q.id];
    const key = q.correct_answer;
    const isSubmitted = userAns !== undefined && userAns !== '';

    let isCorrect = false;
    if (isSubmitted) {
      if (q.type === 'MCQ') isCorrect = userAns.trim().toUpperCase() === key.trim().toUpperCase();
      else if (q.type === 'MSQ') {
        const uSort = userAns.split(',').map(s => s.trim().toUpperCase()).sort().join(';');
        const kSort = key.replace(/,/g, ';').split(';').map(s => s.trim().toUpperCase()).sort().join(';');
        isCorrect = uSort === kSort;
      } else if (q.type === 'NAT') {
        const n = parseFloat(userAns);
        if (!isNaN(n)) {
          if (key.includes(' to ')) {
            const [min, max] = key.split(' to ').map(parseFloat);
            isCorrect = n >= min && n <= max;
          } else {
            isCorrect = Math.abs(n - parseFloat(key)) < 0.05;
          }
        }
      }
    }

    if (filterType === 'CORRECT') return isSubmitted && isCorrect;
    if (filterType === 'INCORRECT') return isSubmitted && !isCorrect;
    if (filterType === 'UNATTEMPTED') return !isSubmitted;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-4xl w-full my-8 overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Result Header Banner */}
        <div className="bg-slate-900 text-white p-6 sm:p-8 relative overflow-hidden">
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-blue-400">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>GATE {year} Paper Performance Report</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Test Score: <span className="text-emerald-400 font-mono">{score}</span> / 100
              </h1>
              <p className="text-xs text-slate-300">
                Estimated Percentile: <span className="font-bold text-amber-300 font-mono">{estimatedPercentile}</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-md"
                title="Download Result Report as PDF"
              >
                <Printer className="w-4 h-4" />
                <span>Download Result PDF</span>
              </button>

              <button
                onClick={onRetake}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Test</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition"
              >
                Done
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-6 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 text-xs">
          
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-slate-500 font-medium">Correct</span>
            <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1 font-mono">
              {correctCount} / {totalQuestions}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-slate-500 font-medium">Incorrect</span>
            <div className="text-xl font-bold text-red-500 mt-1 font-mono">
              {incorrectCount}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-slate-500 font-medium">Accuracy</span>
            <div className="text-xl font-bold text-purple-600 dark:text-purple-400 mt-1 font-mono">
              {accuracy}%
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <span className="text-slate-500 font-medium">Time Spent</span>
            <div className="text-xl font-bold text-slate-900 dark:text-white mt-1 font-mono">
              {minutesTaken}m {secondsTaken}s
            </div>
          </div>

        </div>

        {/* Forensic Diagnostics Card */}
        {(() => {
          const forensic = analyzeTestResultForensics({
            questions: paperQuestions,
            userAnswers: paperQuestions.map(q => ({
              state: userAnswers[q.id] !== undefined ? 'ANSWERED' : 'NOT_VISITED',
              answer: userAnswers[q.id]
            }))
          });

          return (
            <div className="p-6 bg-slate-900 text-white border-b border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-amber-400" />
                  <span className="font-extrabold text-sm tracking-wide uppercase">Forensic Marks Loss & Diagnostics</span>
                </div>
                <div className="text-xs text-rose-400 font-mono font-bold">
                  Total Lost Marks: -{forensic.totalLostMarks} pts
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 space-y-1">
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Negative Deductions</div>
                  <div className="text-rose-400 font-extrabold text-base font-mono">-{forensic.negativeDeductionMarks} pts</div>
                  <div className="text-[10px] text-slate-400">Strict MCQ wrong answers</div>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 space-y-1">
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Unattempted Missed</div>
                  <div className="text-amber-400 font-extrabold text-base font-mono">-{forensic.unattemptedLostMarks} pts</div>
                  <div className="text-[10px] text-slate-400">{unattemptedCount} unattempted questions</div>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 space-y-1">
                  <div className="text-slate-400 text-[10px] uppercase font-bold">NAT Scale / Unit Errors</div>
                  <div className="text-purple-400 font-extrabold text-base font-mono">{forensic.natUnitScaleErrors} Qs</div>
                  <div className="text-[10px] text-slate-400">Off by unit/scale factors</div>
                </div>

                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 space-y-1">
                  <div className="text-slate-400 text-[10px] uppercase font-bold">NAT Borderline Misses</div>
                  <div className="text-blue-400 font-extrabold text-base font-mono">{forensic.natBorderlineMisses} Qs</div>
                  <div className="text-[10px] text-slate-400">Within 20% margin</div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Detailed Question Review List */}
        <div className="p-6 space-y-4 max-h-[50vh] overflow-y-auto">
          
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
              Question-by-Question Review
            </h3>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs font-semibold">
              <button
                onClick={() => setFilterType('ALL')}
                className={`px-3 py-1 rounded-md transition ${filterType === 'ALL' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xs' : 'text-slate-500'}`}
              >
                All ({paperQuestions.length})
              </button>
              <button
                onClick={() => setFilterType('CORRECT')}
                className={`px-3 py-1 rounded-md transition ${filterType === 'CORRECT' ? 'bg-emerald-600 text-white shadow-2xs' : 'text-slate-500'}`}
              >
                Correct ({correctCount})
              </button>
              <button
                onClick={() => setFilterType('INCORRECT')}
                className={`px-3 py-1 rounded-md transition ${filterType === 'INCORRECT' ? 'bg-red-500 text-white shadow-2xs' : 'text-slate-500'}`}
              >
                Incorrect ({incorrectCount})
              </button>
              <button
                onClick={() => setFilterType('UNATTEMPTED')}
                className={`px-3 py-1 rounded-md transition ${filterType === 'UNATTEMPTED' ? 'bg-slate-700 text-white shadow-2xs' : 'text-slate-500'}`}
              >
                Unattempted ({unattemptedCount})
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredQs.map((q) => {
              const userAns = userAnswers[q.id];
              const isAttempted = userAns !== undefined && userAns !== '';
              const key = q.correct_answer;

              let isCorrect = false;
              if (isAttempted) {
                if (q.type === 'MCQ') isCorrect = userAns.trim().toUpperCase() === key.trim().toUpperCase();
                else if (q.type === 'MSQ') {
                  const uSort = userAns.split(',').map(s => s.trim().toUpperCase()).sort().join(';');
                  const kSort = key.replace(/,/g, ';').split(';').map(s => s.trim().toUpperCase()).sort().join(';');
                  isCorrect = uSort === kSort;
                } else if (q.type === 'NAT') {
                  const n = parseFloat(userAns);
                  if (!isNaN(n)) {
                    if (key.includes(' to ')) {
                      const [min, max] = key.split(' to ').map(parseFloat);
                      isCorrect = n >= min && n <= max;
                    } else {
                      isCorrect = Math.abs(n - parseFloat(key)) < 0.05;
                    }
                  }
                }
              }

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-xl border text-xs sm:text-sm space-y-3 ${
                    !isAttempted
                      ? 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                      : isCorrect
                      ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900'
                      : 'bg-rose-50/60 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-900 dark:text-white font-mono">Q.{q.qnum}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        {q.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {!isAttempted ? (
                        <span className="text-slate-500 font-semibold">Unattempted (0 Marks)</span>
                      ) : isCorrect ? (
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Correct (+{q.marks})
                        </span>
                      ) : (
                        <span className="text-red-500 font-bold flex items-center gap-1">
                          <XCircle className="w-4 h-4" /> Incorrect ({q.type === 'MCQ' ? `-${q.negative_marks}` : '0'})
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="font-medium text-slate-900 dark:text-slate-100">
                    <MathRenderer content={q.question} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs">
                    <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 block text-[10px] uppercase font-sans">Your Answer:</span>
                      <span className={`font-bold ${isCorrect ? 'text-emerald-600' : 'text-rose-500'}`}>
                        {userAns || 'Not Answered'}
                      </span>
                    </div>

                    <div className="p-2.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 block text-[10px] uppercase font-sans">Official Key:</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        {key}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">Solution Note: </span>
                      {q.solution}
                    </div>

                    <button
                      onClick={() => setActiveAIQuestion({ question: q, userAns, isCorrect })}
                      className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 shrink-0 self-start sm:self-auto cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>✨ Ask AI Tutor</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* Gemini AI Tutor Modal */}
      {activeAIQuestion && (
        <AITutorModal
          isOpen={Boolean(activeAIQuestion)}
          onClose={() => setActiveAIQuestion(null)}
          question={activeAIQuestion.question}
          studentAnswer={activeAIQuestion.userAns}
          isCorrect={activeAIQuestion.isCorrect}
        />
      )}

    </div>
  );
}
