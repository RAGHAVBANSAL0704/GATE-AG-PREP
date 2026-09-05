import React, { useState, useEffect, useMemo } from 'react';
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
  Sparkles,
  Zap,
  Timer,
  LayoutList,
  Table as TableIcon,
  HelpCircle,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import MathRenderer from './MathRenderer';
import AITutorModal from './AITutorModal';
import confetti from 'canvas-confetti';
import { analyzeTestResultForensics } from '../utils/forensicAnalyzer';
import { getQuestionPacing } from '../utils/scoring';

function formatSec(seconds) {
  const s = Math.max(0, Math.round(Number(seconds) || 0));
  const mins = Math.floor(s / 60);
  const remSec = s % 60;
  if (mins > 0) {
    return `${mins}m ${remSec}s`;
  }
  return `${remSec}s`;
}

export default function TestResultModal({ result, onClose, onRetake }) {
  const [filterType, setFilterType] = useState('ALL'); // 'ALL', 'CORRECT', 'INCORRECT', 'UNATTEMPTED', 'SLOW', 'RUSH'
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'table'
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

  const rawPaperQuestions = result.paperQuestions || result.questionEvaluations || [];
  const questionEvaluations = result.questionEvaluations || [];
  const questionTimes = result.questionTimes || {};
  const userAnswers = result.userAnswers || {};
  const questionStates = result.questionStates || {};
  const year = result.year || result.paperYear || result.paperTitle || 'GATE AG Mock';
  const score = result.score ?? 0;
  const timeTakenSec = result.timeTakenSec ?? ((result.durationTakenMins || 0) * 60);

  const processedQuestions = useMemo(() => {
    return rawPaperQuestions.map((q, idx) => {
      const evalData = questionEvaluations.find(qe => qe.id === q.id) || (q.isAttempted !== undefined ? q : null);
      const rawUserAns = evalData?.userAnswer !== undefined ? evalData.userAnswer : userAnswers[q.id];
      const userAns = rawUserAns !== undefined && rawUserAns !== null ? String(rawUserAns).trim() : '';
      const qState = evalData?.state || questionStates[q.id] || (userAns !== '' ? 'ANSWERED' : 'NOT_VISITED');

      const isAttempted = evalData?.isAttempted !== undefined
        ? evalData.isAttempted
        : (userAns !== '' && (qState === 'ANSWERED' || qState === 'ANSWERED_MARKED'));

      const key = String(q.correct_answer || q.answer || '').trim();
      let isCorrect = evalData?.isCorrect;
      if (isCorrect === undefined) {
        if (!isAttempted) {
          isCorrect = false;
        } else if (q.type === 'MCQ') {
          isCorrect = userAns.toUpperCase() === key.toUpperCase();
        } else if (q.type === 'MSQ') {
          const uSort = userAns.split(/[,;\s]+/).filter(Boolean).map(s => s.trim().toUpperCase()).sort().join(';');
          const kSort = key.replace(/,/g, ';').replace(/and/gi, ';').split(/[,;\s]+/).filter(Boolean).map(s => s.trim().toUpperCase()).sort().join(';');
          isCorrect = uSort === kSort && uSort.length > 0;
        } else if (q.type === 'NAT') {
          const n = parseFloat(userAns);
          if (!isNaN(n)) {
            if (key.toLowerCase().includes(' to ')) {
              const [min, max] = key.toLowerCase().split(' to ').map(parseFloat);
              isCorrect = n >= (min - 1e-7) && n <= (max + 1e-7);
            } else {
              const target = parseFloat(key);
              isCorrect = Math.abs(n - target) <= (Number(q.tolerance || 0.05) + 1e-7);
            }
          } else {
            isCorrect = false;
          }
        }
      }

      let marksAwarded = evalData?.marksAwarded;
      if (marksAwarded === undefined) {
        if (!isAttempted) {
          marksAwarded = 0;
        } else if (isCorrect) {
          marksAwarded = Number(q.marks || 1);
        } else {
          const defaultDeduction = Number(q.marks) === 2 ? (2 / 3) : (1 / 3);
          const deduction = q.type === 'MCQ' ? (q.negative_marks !== undefined ? Number(q.negative_marks) : defaultDeduction) : 0;
          marksAwarded = deduction === 0 ? 0 : -deduction;
        }
      }

      const timeSpent = evalData?.timeSpentSec ?? (questionTimes[q.id] || 0);
      const pacing = getQuestionPacing(timeSpent, isCorrect, isAttempted);

      return {
        ...q,
        qnum: q.qnum || (idx + 1),
        userAns,
        key,
        isAttempted: !!isAttempted,
        isCorrect: !!isCorrect,
        marksAwarded: Number(Number(marksAwarded).toFixed(2)),
        timeSpent,
        pacing,
        qState
      };
    });
  }, [rawPaperQuestions, questionEvaluations, questionTimes, userAnswers, questionStates]);

  const totalQuestions = processedQuestions.length;
  const correctCount = processedQuestions.filter(q => q.isCorrect).length;
  const incorrectCount = processedQuestions.filter(q => q.isAttempted && !q.isCorrect).length;
  const unattemptedCount = processedQuestions.filter(q => !q.isAttempted).length;
  const attemptedCount = correctCount + incorrectCount;

  const accuracy = attemptedCount > 0 
    ? Math.round((correctCount / attemptedCount) * 100) 
    : 0;

  const minutesTaken = Math.floor(timeTakenSec / 60);
  const secondsTaken = timeTakenSec % 60;

  // Pacing Summary Metrics
  const pacingAnalytics = useMemo(() => {
    const correctQs = processedQuestions.filter(q => q.isCorrect);
    const incorrectQs = processedQuestions.filter(q => q.isAttempted && !q.isCorrect);
    const unattemptedQs = processedQuestions.filter(q => !q.isAttempted);

    const avgTimeCorrect = correctQs.length > 0 
      ? Math.round(correctQs.reduce((acc, q) => acc + q.timeSpent, 0) / correctQs.length) 
      : 0;

    const avgTimeIncorrect = incorrectQs.length > 0 
      ? Math.round(incorrectQs.reduce((acc, q) => acc + q.timeSpent, 0) / incorrectQs.length) 
      : 0;

    const avgTimeUnattempted = unattemptedQs.length > 0 
      ? Math.round(unattemptedQs.reduce((acc, q) => acc + q.timeSpent, 0) / unattemptedQs.length) 
      : 0;

    const avgTimeTotal = processedQuestions.length > 0
      ? Math.round(processedQuestions.reduce((acc, q) => acc + q.timeSpent, 0) / processedQuestions.length)
      : 0;

    let fastestCorrect = null;
    if (correctQs.length > 0) {
      fastestCorrect = [...correctQs].sort((a, b) => a.timeSpent - b.timeSpent)[0];
    }

    const attemptedQs = [...correctQs, ...incorrectQs];
    let slowestAttempt = null;
    if (attemptedQs.length > 0) {
      slowestAttempt = [...attemptedQs].sort((a, b) => b.timeSpent - a.timeSpent)[0];
    }

    const timeLostOnErrors = incorrectQs.reduce((acc, q) => acc + q.timeSpent, 0);

    return {
      avgTimeCorrect,
      avgTimeIncorrect,
      avgTimeUnattempted,
      avgTimeTotal,
      fastestCorrect,
      slowestAttempt,
      timeLostOnErrors
    };
  }, [processedQuestions]);

  // Estimated Percentile
  let estimatedPercentile = "90.0+";
  if (score >= 60) estimatedPercentile = "99.5+ (Top 10 AIR)";
  else if (score >= 45) estimatedPercentile = "98.0+ (Top 50 AIR)";
  else if (score >= 35) estimatedPercentile = "92.0+ (Top 200 AIR)";
  else if (score >= 25) estimatedPercentile = "80.0+ (Qualifying Cutoff)";
  else estimatedPercentile = "< 75.0 (Needs Revision)";

  // Filtered Questions for list & table
  const filteredQs = useMemo(() => {
    return processedQuestions.filter(q => {
      if (filterType === 'CORRECT') return q.isCorrect;
      if (filterType === 'INCORRECT') return q.isAttempted && !q.isCorrect;
      if (filterType === 'UNATTEMPTED') return !q.isAttempted;
      if (filterType === 'SLOW') return q.timeSpent >= 150;
      if (filterType === 'RUSH') return q.timeSpent <= 45 && !q.isCorrect && q.isAttempted;
      return true;
    });
  }, [processedQuestions, filterType]);

  const handleDownloadPDF = () => {
    const printWindow = window.open('', '_blank', 'width=950,height=1100');
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

    const tableRows = processedQuestions.map(q => {
      const userAns = q.userAns || 'Unattempted';
      const key = q.key;
      const qnum = q.qnum || '';
      const qtype = q.type || '';
      const timeSpentStr = formatSec(q.timeSpent);
      const pacingBadge = q.pacing.label;
      const marksStr = q.marksAwarded >= 0 ? `+${q.marksAwarded.toFixed(2)}` : q.marksAwarded.toFixed(2);
      const statusStr = q.isCorrect ? 'Correct' : (q.isAttempted ? 'Incorrect' : 'Unattempted');
      const statusColor = q.isCorrect ? '#059669' : (q.isAttempted ? '#dc2626' : '#64748b');

      return `
        <tr style="border-bottom: 1px solid #e2e8f0; font-size: 11px;">
          <td style="padding: 8px; font-weight: bold;">Q.${escapeHtml(qnum)}</td>
          <td style="padding: 8px;">${escapeHtml(q.section || 'AG')}</td>
          <td style="padding: 8px;">${escapeHtml(qtype)} (${escapeHtml(q.marks)}M)</td>
          <td style="padding: 8px; font-family: monospace;">${escapeHtml(userAns)}</td>
          <td style="padding: 8px; font-family: monospace; font-weight: bold; color: #059669;">${escapeHtml(key)}</td>
          <td style="padding: 8px; font-family: monospace; font-weight: bold;">${escapeHtml(timeSpentStr)}</td>
          <td style="padding: 8px;">${escapeHtml(pacingBadge)}</td>
          <td style="padding: 8px; font-family: monospace; font-weight: bold; color: ${statusColor};">${escapeHtml(marksStr)}</td>
          <td style="padding: 8px; font-weight: bold; color: ${statusColor};">${escapeHtml(statusStr)}</td>
        </tr>
      `;
    }).join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>GATE ${escapeHtml(year)} AG Exam Performance Scorecard</title>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; padding: 24px; color: #0f172a; line-height: 1.4; }
            h1 { font-size: 20px; color: #1e293b; margin-bottom: 4px; }
            .badge { display: inline-block; padding: 4px 8px; background: #eff6ff; color: #1d4ed8; font-size: 11px; font-weight: bold; border-radius: 4px; margin-bottom: 12px; }
            .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 20px; }
            .card { background: #f8fafc; border: 1px solid #cbd5e1; padding: 12px; border-radius: 8px; font-size: 12px; }
            .val { font-size: 18px; font-weight: bold; font-family: monospace; margin-top: 4px; }
            .pacing-strip { display: flex; gap: 12px; background: #f1f5f9; padding: 10px; border-radius: 8px; font-size: 11px; margin-bottom: 20px; border: 1px solid #e2e8f0; }
            table { width: 100%; border-collapse: collapse; margin-top: 12px; }
            th { background: #0f172a; color: #fff; padding: 8px; font-size: 11px; text-align: left; }
          </style>
        </head>
        <body>
          <div class="badge">GATE AG PREP PORTAL — OFFICIAL CBT REPORT</div>
          <h1>GATE ${escapeHtml(year)} Paper Performance Scorecard & Question Breakdown</h1>
          <p style="font-size: 12px; color: #64748b; margin-bottom: 16px;">
            Test Date: ${escapeHtml(new Date().toLocaleDateString())} • Total Duration: ${minutesTaken}m ${secondsTaken}s • Estimated Percentile: ${escapeHtml(estimatedPercentile)}
          </p>
          
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
              <div>Overall Accuracy</div>
              <div class="val" style="color: #7c3aed;">${escapeHtml(accuracy)}%</div>
            </div>
          </div>

          <div class="pacing-strip">
            <div><strong>Avg Time / Q:</strong> ${formatSec(pacingAnalytics.avgTimeTotal)}</div>
            <div>•</div>
            <div><strong>Avg on Correct:</strong> ${formatSec(pacingAnalytics.avgTimeCorrect)}</div>
            <div>•</div>
            <div><strong>Avg on Errors:</strong> ${formatSec(pacingAnalytics.avgTimeIncorrect)}</div>
            <div>•</div>
            <div><strong>Total Time on Errors:</strong> ${formatSec(pacingAnalytics.timeLostOnErrors)}</div>
          </div>

          <h2>Question-by-Question Detailed Breakdown & Pacing Matrix</h2>
          <table>
            <thead>
              <tr>
                <th>Q#</th>
                <th>Section</th>
                <th>Type</th>
                <th>Candidate Ans</th>
                <th>Official Key</th>
                <th>Time Spent</th>
                <th>Pacing</th>
                <th>Marks</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
            </tbody>
          </table>
        </body>
      </html>
    `);

    printWindow.document.close();
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-5xl w-full my-6 overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[92vh]">
        
        {/* Result Header Banner */}
        <div className="bg-slate-900 text-white p-5 sm:p-7 relative overflow-hidden shrink-0">
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-blue-400">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>GATE {year} Official CBT Performance Report</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
                <span>Score:</span>
                <span className="text-emerald-400 font-mono">{score}</span>
                <span className="text-slate-400 text-lg font-normal">/ 100</span>
              </h1>
              <p className="text-xs text-slate-300 flex items-center gap-2">
                <span>Estimated Percentile:</span>
                <span className="font-bold text-amber-300 font-mono">{estimatedPercentile}</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-md cursor-pointer"
                title="Download Comprehensive Result Scorecard as PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Download Scorecard PDF</span>
              </button>

              <button
                onClick={onRetake}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Test</span>
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>

        {/* Primary Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-4 sm:p-5 bg-slate-50 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800 text-xs shrink-0">
          
          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Correct</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-lg sm:text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1 font-mono">
              {correctCount} <span className="text-xs text-slate-400 font-sans">/ {totalQuestions}</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Incorrect</span>
              <XCircle className="w-4 h-4 text-rose-500" />
            </div>
            <div className="text-lg sm:text-xl font-bold text-rose-500 mt-1 font-mono">
              {incorrectCount} <span className="text-xs text-slate-400 font-sans">Qs</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Accuracy</span>
              <TrendingUp className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-lg sm:text-xl font-bold text-purple-600 dark:text-purple-400 mt-1 font-mono">
              {accuracy}%
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">Exam Duration</span>
              <Clock className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-1 font-mono">
              {minutesTaken}m {secondsTaken}s
            </div>
          </div>

        </div>

        {/* Question Pacing & Time Breakdown Banner */}
        <div className="bg-blue-50/70 dark:bg-slate-950/80 p-4 border-b border-blue-100 dark:border-slate-800 shrink-0">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="font-extrabold text-xs uppercase tracking-wider text-blue-900 dark:text-blue-200">
                Question Pacing & Time Distribution
              </span>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              Target GATE Pacing: ~166s / Question
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Avg on Correct Qs</span>
              <div className="text-emerald-600 dark:text-emerald-400 font-extrabold font-mono text-sm mt-0.5">
                {formatSec(pacingAnalytics.avgTimeCorrect)}
              </div>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                Fastest: {pacingAnalytics.fastestCorrect ? `Q.${pacingAnalytics.fastestCorrect.qnum} (${formatSec(pacingAnalytics.fastestCorrect.timeSpent)})` : 'N/A'}
              </span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Avg on Wrong Qs</span>
              <div className="text-rose-500 font-extrabold font-mono text-sm mt-0.5">
                {formatSec(pacingAnalytics.avgTimeIncorrect)}
              </div>
              <span className="text-[10px] text-rose-400 block mt-0.5">
                Total Lost: {formatSec(pacingAnalytics.timeLostOnErrors)}
              </span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Avg on Skipped Qs</span>
              <div className="text-slate-600 dark:text-slate-300 font-extrabold font-mono text-sm mt-0.5">
                {formatSec(pacingAnalytics.avgTimeUnattempted)}
              </div>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                {unattemptedCount} Skipped Questions
              </span>
            </div>

            <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Peak Investment Q</span>
              <div className="text-purple-600 dark:text-purple-400 font-extrabold font-mono text-sm mt-0.5">
                {pacingAnalytics.slowestAttempt ? formatSec(pacingAnalytics.slowestAttempt.timeSpent) : '0s'}
              </div>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                {pacingAnalytics.slowestAttempt ? `Q.${pacingAnalytics.slowestAttempt.qnum} (${pacingAnalytics.slowestAttempt.isCorrect ? 'Correct' : 'Wrong'})` : 'N/A'}
              </span>
            </div>
          </div>
        </div>

        {/* Forensic Diagnostics Collapsible/Summary */}
        {(() => {
          const forensic = analyzeTestResultForensics({
            questions: rawPaperQuestions,
            userAnswers: rawPaperQuestions.map(q => ({
              state: userAnswers[q.id] !== undefined ? 'ANSWERED' : 'NOT_VISITED',
              answer: userAnswers[q.id]
            }))
          });

          return (
            <div className="px-4 sm:px-6 py-3 bg-slate-900 text-white border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-amber-400" />
                <span className="font-extrabold text-xs tracking-wide uppercase">Forensic Marks Lost:</span>
                <span className="text-rose-400 font-mono font-bold">-{forensic.totalLostMarks} pts</span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-300">
                <span>Negative Deductions: <strong className="text-rose-400 font-mono">-{forensic.negativeDeductionMarks} pts</strong></span>
                <span>•</span>
                <span>Unattempted Potential: <strong className="text-amber-400 font-mono">-{forensic.unattemptedLostMarks} pts</strong></span>
                <span>•</span>
                <span>NAT Unit/Scale Errors: <strong className="text-purple-400 font-mono">{forensic.natUnitScaleErrors} Qs</strong></span>
              </div>
            </div>
          );
        })()}

        {/* Controls & Filter Bar */}
        <div className="px-4 sm:px-6 py-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          
          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition cursor-pointer ${
                viewMode === 'cards' 
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold' 
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LayoutList className="w-3.5 h-3.5" />
              <span>Detailed Cards</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition cursor-pointer ${
                viewMode === 'table' 
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold' 
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Breakdown Matrix</span>
            </button>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {[
              { id: 'ALL', label: `All (${totalQuestions})` },
              { id: 'CORRECT', label: `Correct (${correctCount})`, activeColor: 'bg-emerald-600 text-white' },
              { id: 'INCORRECT', label: `Incorrect (${incorrectCount})`, activeColor: 'bg-rose-600 text-white' },
              { id: 'UNATTEMPTED', label: `Unattempted (${unattemptedCount})`, activeColor: 'bg-slate-700 text-white' },
              { id: 'SLOW', label: 'Slow (>2.5m)', activeColor: 'bg-purple-600 text-white' },
              { id: 'RUSH', label: 'Rush Traps (<45s)', activeColor: 'bg-amber-600 text-white' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`px-2.5 py-1 rounded-md transition font-semibold cursor-pointer ${
                  filterType === tab.id
                    ? (tab.activeColor || 'bg-blue-600 text-white shadow-xs')
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>

        {/* Content Body: Cards View OR Table View */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50 dark:bg-slate-900/50">
          
          {filteredQs.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <HelpCircle className="w-8 h-8 mx-auto text-slate-400" />
              <p className="font-bold text-sm">No questions match your current filter ({filterType}).</p>
              <button
                onClick={() => setFilterType('ALL')}
                className="text-xs text-blue-500 underline font-bold cursor-pointer"
              >
                Reset to All Questions
              </button>
            </div>
          ) : viewMode === 'table' ? (
            
            /* =======================================================
               VIEW A: PERFORMANCE BREAKDOWN MATRIX (COMPACT TABLE)
               ======================================================= */
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                      <th className="py-3 px-3">Q#</th>
                      <th className="py-3 px-3">Section & Topic</th>
                      <th className="py-3 px-3">Type</th>
                      <th className="py-3 px-3">Candidate Ans</th>
                      <th className="py-3 px-3">Official Key</th>
                      <th className="py-3 px-3">Time Spent</th>
                      <th className="py-3 px-3">Pacing Evaluation</th>
                      <th className="py-3 px-3">Marks Awarded</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3 text-right">Tutor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredQs.map(q => {
                      const statusColor = q.isCorrect 
                        ? 'text-emerald-600 dark:text-emerald-400' 
                        : (q.isAttempted ? 'text-rose-600 dark:text-rose-400' : 'text-slate-400');
                      
                      const marksDisplay = q.marksAwarded > 0 
                        ? `+${q.marksAwarded.toFixed(2)}` 
                        : q.marksAwarded.toFixed(2);

                      return (
                        <tr key={q.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                          <td className="py-3 px-3 font-mono font-bold text-slate-900 dark:text-white whitespace-nowrap">
                            Q.{q.qnum}
                          </td>
                          <td className="py-3 px-3 max-w-[200px] truncate">
                            <span className="font-bold text-slate-800 dark:text-slate-200 block truncate">{q.section}</span>
                            <span className="text-[10px] text-slate-400 block truncate">{q.topic}</span>
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[10px] font-bold text-slate-600 dark:text-slate-300">
                              {q.type} • {q.marks}M
                            </span>
                          </td>
                          <td className="py-3 px-3 font-mono">
                            <span className={q.isAttempted ? (q.isCorrect ? 'text-emerald-600 font-bold' : 'text-rose-500 font-bold') : 'text-slate-400 italic'}>
                              {q.userAns || 'Skipped'}
                            </span>
                          </td>
                          <td className="py-3 px-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                            {q.key}
                          </td>
                          <td className="py-3 px-3 font-mono font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                            {formatSec(q.timeSpent)}
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              q.pacing.color === 'emerald' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' :
                              q.pacing.color === 'blue' ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800' :
                              q.pacing.color === 'purple' ? 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800' :
                              q.pacing.color === 'rose' || q.pacing.color === 'red' ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800' :
                              'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                            }`} title={q.pacing.description}>
                              <span>{q.pacing.icon}</span>
                              <span>{q.pacing.label}</span>
                            </span>
                          </td>
                          <td className={`py-3 px-3 font-mono font-extrabold whitespace-nowrap ${statusColor}`}>
                            {marksDisplay}
                          </td>
                          <td className="py-3 px-3 whitespace-nowrap">
                            <span className={`font-bold ${statusColor}`}>
                              {q.isCorrect ? 'Correct' : (q.isAttempted ? 'Incorrect' : 'Unattempted')}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right whitespace-nowrap">
                            <button
                              onClick={() => setActiveAIQuestion({ question: q, userAns: q.userAns, isCorrect: q.isCorrect })}
                              className="px-2 py-1 rounded bg-purple-100 hover:bg-purple-200 dark:bg-purple-950 dark:hover:bg-purple-900 text-purple-700 dark:text-purple-300 text-[10px] font-bold transition inline-flex items-center gap-1 cursor-pointer"
                              title="Ask AI Tutor for concept clarification"
                            >
                              <Sparkles className="w-3 h-3" />
                              <span>Tutor</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          ) : (

            /* =======================================================
               VIEW B: DETAILED QUESTION REVIEW CARDS
               ======================================================= */
            <div className="space-y-4">
              {filteredQs.map(q => {
                const marksDisplay = q.marksAwarded > 0 
                  ? `+${q.marksAwarded.toFixed(2)}` 
                  : q.marksAwarded.toFixed(2);

                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-2xl border transition shadow-xs space-y-3.5 ${
                      !q.isAttempted
                        ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                        : q.isCorrect
                        ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900'
                        : 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900'
                    }`}
                  >
                    {/* Card Meta Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2 border-b border-slate-100 dark:border-slate-800 text-xs">
                      
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-extrabold text-sm font-mono text-slate-900 dark:text-white">
                          Q.{q.qnum}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                          {q.type} • {q.marks} {q.marks === 1 ? 'Mark' : 'Marks'}
                        </span>
                        <span className="text-[10px] font-medium text-blue-600 dark:text-blue-400">
                          {q.section} • {q.topic}
                        </span>
                      </div>

                      {/* Performance & Pacing Chips */}
                      <div className="flex items-center gap-2 flex-wrap">
                        
                        {/* Time Spent Chip */}
                        <div 
                          className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold text-slate-700 dark:text-slate-300 text-[11px]"
                          title="Time spent actively on this question"
                        >
                          <Clock className="w-3.5 h-3.5 text-blue-500" />
                          <span>Time: {formatSec(q.timeSpent)}</span>
                        </div>

                        {/* Pacing Badge */}
                        <span 
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md font-bold text-[10px] ${
                            q.pacing.color === 'emerald' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800' :
                            q.pacing.color === 'blue' ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-300 dark:border-blue-800' :
                            q.pacing.color === 'purple' ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border border-purple-300 dark:border-purple-800' :
                            q.pacing.color === 'rose' || q.pacing.color === 'red' ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-800' :
                            'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                          }`}
                          title={q.pacing.description}
                        >
                          <span>{q.pacing.icon}</span>
                          <span>{q.pacing.label}</span>
                        </span>

                        {/* Marks Awarded Badge */}
                        <span className={`px-2.5 py-0.5 rounded-md font-mono font-bold text-[11px] ${
                          q.isCorrect 
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                            : (q.isAttempted ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400')
                        }`}>
                          Marks: {marksDisplay}
                        </span>

                      </div>

                    </div>

                    {/* Question Statement */}
                    <div className="font-medium text-slate-900 dark:text-slate-100 text-sm leading-relaxed overflow-x-auto">
                      <MathRenderer content={q.question} />
                    </div>

                    {/* Question Image (if any) */}
                    {q.image_url && (
                      <div className="my-2 p-2 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 max-w-md mx-auto text-center">
                        <img
                          src={q.image_url}
                          alt={`Figure for Q${q.qnum}`}
                          className="max-h-[220px] w-auto mx-auto object-contain rounded-lg"
                        />
                      </div>
                    )}

                    {/* Answer Comparison Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 font-mono text-xs">
                      
                      <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <span className="text-slate-400 block text-[10px] uppercase font-sans font-bold">Candidate Answer:</span>
                        <span className={`font-extrabold text-sm ${q.isAttempted ? (q.isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500') : 'text-slate-400 italic'}`}>
                          {q.userAns || 'Not Answered (Skipped)'}
                        </span>
                      </div>

                      <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <span className="text-slate-400 block text-[10px] uppercase font-sans font-bold">Official Key:</span>
                        <span className="font-extrabold text-sm text-emerald-600 dark:text-emerald-400">
                          {q.key}
                        </span>
                      </div>

                    </div>

                    {/* Solution Note & AI Tutor Footer Strip */}
                    <div className="pt-2 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex-1">
                        <span className="font-bold text-slate-900 dark:text-white">Solution Note: </span>
                        <span>{q.solution || 'Official answer verified.'}</span>
                      </div>

                      <button
                        onClick={() => setActiveAIQuestion({ question: q, userAns: q.userAns, isCorrect: q.isCorrect })}
                        className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 shrink-0 self-start sm:self-auto cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>✨ Ask AI Tutor</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>

          )}

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
