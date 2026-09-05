import React, { useState, useMemo } from 'react';
import { 
  Zap, 
  AlertTriangle, 
  CheckCircle2, 
  Flame, 
  BookOpen, 
  FileDown, 
  Play, 
  RotateCcw, 
  ShieldAlert, 
  HelpCircle, 
  Sparkles,
  TrendingDown,
  Layers,
  ArrowRight,
  Clock,
  Award
} from 'lucide-react';
import { 
  analyzeStudentWeakSpots, 
  generateRemediationTestPayload 
} from '../services/diagnosticRadarService.js';
import { exportQuestionsToPdf } from '../services/questionPdfExportService.js';
import MathRenderer from './MathRenderer.jsx';

export default function AIDiagnosticRadarHub({ 
  questions = [], 
  customMockPapers = [], 
  testAttempts = [], 
  onStartCustomTest,
  onOpenCalc 
}) {
  const [selectedSectionFilter, setSelectedSectionFilter] = useState('ALL');
  const [activeFormulaModal, setActiveFormulaModal] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  // Combined pool across questions and custom mocks
  const allQuestionsPool = useMemo(() => {
    const list = [...questions];
    (customMockPapers || []).forEach(p => {
      (p.questions || []).forEach(q => list.push(q));
    });
    return list;
  }, [questions, customMockPapers]);

  // Run AI Diagnostic Analysis
  const diagnosticReport = useMemo(() => {
    return analyzeStudentWeakSpots(allQuestionsPool, testAttempts);
  }, [allQuestionsPool, testAttempts]);

  // Section list array
  const sectionList = useMemo(() => {
    return Object.values(diagnosticReport.sectionStats || {});
  }, [diagnosticReport]);

  // Filtered subtopics based on user section filter
  const filteredSubtopics = useMemo(() => {
    if (selectedSectionFilter === 'ALL') {
      return diagnosticReport.rankedSubtopics || [];
    }
    return (diagnosticReport.rankedSubtopics || []).filter(
      st => st.section === selectedSectionFilter
    );
  }, [diagnosticReport, selectedSectionFilter]);

  // Handle 1-Click Launch 15-Minute Remediation CBT Test
  const handleLaunchRetest = () => {
    if (!onStartCustomTest) return;
    const weakList = diagnosticReport.topCriticalWeakSpots.length > 0 
      ? diagnosticReport.topCriticalWeakSpots 
      : diagnosticReport.rankedSubtopics.slice(0, 5);

    const retestPayload = generateRemediationTestPayload(weakList, allQuestionsPool, 15);
    onStartCustomTest(retestPayload);
  };

  // Handle Export Custom Remediation PDF Worksheet
  const handleExportRemediationPdf = async () => {
    try {
      setIsExportingPdf(true);
      const weakList = diagnosticReport.topCriticalWeakSpots.length > 0 
        ? diagnosticReport.topCriticalWeakSpots 
        : diagnosticReport.rankedSubtopics.slice(0, 5);

      const retestPayload = generateRemediationTestPayload(weakList, allQuestionsPool, 20);

      await exportQuestionsToPdf(retestPayload.questions, {
        title: 'GATE AG Targeted Weak-Area Remediation Worksheet',
        subtitle: `Auto-generated for Error Correction (${retestPayload.questions.length} Questions)`,
        includeAnswerKey: true,
        includeSolutions: true,
        includeRoughWork: true,
        paperCode: 'GATE-AG-REMEDIATION'
      });
    } catch (err) {
      console.error('Failed to export remediation PDF:', err);
    } finally {
      setIsExportingPdf(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto pb-12">
      
      {/* 1. Header Banner with Overall Diagnostic Health */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-50/70 via-indigo-50/50 to-slate-50 dark:from-purple-900 dark:via-indigo-900 dark:to-slate-950 p-6 sm:p-8 text-slate-900 dark:text-white shadow-sm dark:shadow-xl border border-purple-200 dark:border-purple-500/20">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-500/20 border border-purple-200 dark:border-purple-400/30 text-purple-800 dark:text-purple-300 text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 animate-pulse" />
              <span>Adaptive Performance Diagnostic Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              AI Weak-Area Radar & Auto-Remediation
            </h1>
            <p className="text-sm text-slate-600 dark:text-purple-200/80 leading-relaxed">
              Real-time multi-factor vulnerability assessment tracking error rates, negative mark leaks, and time overhead across all official GATE AG syllabus branches.
            </p>
          </div>

          {/* Health Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full md:w-auto">
            <div className="p-3.5 rounded-2xl bg-white dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 text-center shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-purple-700 dark:text-purple-300 tracking-wider">Evaluated Qs</span>
              <div className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                {diagnosticReport.totalQuestionsEvaluated}
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-500/10 backdrop-blur-md border border-rose-200 dark:border-rose-500/20 text-center shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-rose-700 dark:text-rose-300 tracking-wider">Negative Mark Leaks</span>
              <div className="text-xl font-black text-rose-600 dark:text-rose-400 mt-0.5">
                -{diagnosticReport.totalNegativeMarksLostAll} M
              </div>
            </div>
            <div className="col-span-2 sm:col-span-1 p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 backdrop-blur-md border border-emerald-200 dark:border-emerald-500/20 text-center shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-300 tracking-wider">Critical Weak Spots</span>
              <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                {diagnosticReport.topCriticalWeakSpots.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Tri-Action Auto-Remediation Quick Launch Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Action 1: Instant 15-Min Retest */}
        <div className="bg-gradient-to-br from-purple-500/10 via-indigo-500/5 to-transparent dark:from-purple-950/40 dark:via-indigo-950/20 dark:to-slate-900 border border-purple-500/30 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between gap-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Instant 15-Min Retest
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Auto-generate a 15-minute targeted CBT mock test sampling questions strictly from your diagnosed weak subtopics.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLaunchRetest}
            className="w-full py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Launch 15-Min Retest</span>
          </button>
        </div>

        {/* Action 2: Export Remediation PDF */}
        <div className="bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent dark:from-emerald-950/40 dark:via-teal-950/20 dark:to-slate-900 border border-emerald-500/30 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between gap-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <FileDown className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Printable Remediation PDF
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Download a personalized printable worksheet with your error questions, step-by-step KaTeX proofs, and rough work boxes.
            </p>
          </div>

          <button
            type="button"
            onClick={handleExportRemediationPdf}
            disabled={isExportingPdf}
            className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <FileDown className="w-4 h-4" />
            <span>{isExportingPdf ? 'Generating PDF...' : 'Download Remediation PDF'}</span>
          </button>
        </div>

        {/* Action 3: Targeted Formula Study Deck */}
        <div className="bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-transparent dark:from-blue-950/40 dark:via-cyan-950/20 dark:to-slate-900 border border-blue-500/30 rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between gap-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Targeted Formula Deck
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Review high-yield mathematical equations and derivations dynamically mapped to your diagnosed weak areas.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setActiveFormulaModal(true)}
            className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Review Weak-Spot Formulas ({diagnosticReport.relevantFormulas.length})</span>
          </button>
        </div>

      </div>

      {/* 3. Top Critical Vulnerabilities Leaderboard */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                Top Critical Vulnerabilities
              </h2>
              <p className="text-xs text-slate-500">
                Highest priority subtopics causing negative marks and accuracy drop in past tests
              </p>
            </div>
          </div>
        </div>

        {diagnosticReport.topCriticalWeakSpots.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
              No Critical Vulnerabilities Detected Yet!
            </p>
            <p className="text-[11px] text-slate-500 max-w-md mx-auto">
              Attempt full CBT Mock Tests or Practice Mode sessions. The AI Diagnostic Radar will automatically identify error patterns and negative mark leaks here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {diagnosticReport.topCriticalWeakSpots.map((item, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-500/20 text-rose-700 dark:text-rose-300">
                      Priority #{idx + 1}
                    </span>
                    <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400">
                      Score: {item.vulnerabilityScore}/100
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2">
                    {item.subtopic}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                    {item.section} • {item.topic}
                  </p>
                </div>

                <div className="pt-2 border-t border-rose-200/60 dark:border-rose-900/40 grid grid-cols-3 gap-2 text-center text-xs">
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold block">Attempted</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{item.attempted}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold block">Accuracy</span>
                    <span className="font-bold text-rose-600 dark:text-rose-400">{item.accuracy}%</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold block">Negative Leak</span>
                    <span className="font-bold text-rose-600 dark:text-rose-400">-{item.negativeMarksLost.toFixed(2)}M</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Section Mastery Matrix */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                Syllabus Section Mastery Matrix
              </h2>
              <p className="text-xs text-slate-500">
                Live health and proficiency breakdown across all 8 syllabus branches
              </p>
            </div>
          </div>

          {/* Section Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1">
            <button
              type="button"
              onClick={() => setSelectedSectionFilter('ALL')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                selectedSectionFilter === 'ALL'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              All Sections
            </button>
            {sectionList.map((sec, sIdx) => {
              const shortName = sec.section.replace(/^Section \d+:\s*/, '');
              const isSelected = selectedSectionFilter === sec.section;
              return (
                <button
                  key={sIdx}
                  type="button"
                  onClick={() => setSelectedSectionFilter(sec.section)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  {shortName}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sectionList.map((sec, idx) => {
            const shortTitle = sec.section.replace(/^Section \d+:\s*/, '');
            const isCritical = sec.masteryTier === 'Critical';
            const isStronghold = sec.masteryTier === 'Stronghold';
            const isUnattempted = sec.masteryTier === 'Unattempted';

            return (
              <div 
                key={idx}
                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                  isCritical 
                    ? 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/40'
                    : isStronghold
                      ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40'
                      : isUnattempted
                        ? 'bg-slate-50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800'
                        : 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/40'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      SEC 0{idx + 1}
                    </span>
                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                      isCritical
                        ? 'bg-rose-500/20 text-rose-700 dark:text-rose-300'
                        : isStronghold
                          ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                          : isUnattempted
                            ? 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                            : 'bg-amber-500/20 text-amber-700 dark:text-amber-300'
                    }`}>
                      {sec.masteryTier}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                    {shortTitle}
                  </h3>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-500">Accuracy</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {sec.attempted > 0 ? `${sec.accuracy}%` : '—'}
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        isCritical ? 'bg-rose-500' : isStronghold ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}
                      style={{ width: `${sec.accuracy || 0}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-200/60 dark:border-slate-800/60 pt-2">
                  <span>{sec.attempted} Attempted</span>
                  <span className="font-bold text-rose-500">-{sec.negativeMarksLost.toFixed(1)} Neg</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Subtopic Vulnerability Breakdown Table */}
      {filteredSubtopics.length > 0 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
              Diagnosed Subtopics Breakdown ({filteredSubtopics.length})
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                  <th className="py-3 px-4">Subtopic</th>
                  <th className="py-3 px-4">Section</th>
                  <th className="py-3 px-3 text-center">Attempted</th>
                  <th className="py-3 px-3 text-center">Accuracy</th>
                  <th className="py-3 px-3 text-center">Neg Marks</th>
                  <th className="py-3 px-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {filteredSubtopics.map((st, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                    <td className="py-3 px-4 text-slate-900 dark:text-white font-bold max-w-xs truncate">
                      {st.subtopic}
                    </td>
                    <td className="py-3 px-4 text-slate-500 dark:text-slate-400 text-[11px]">
                      {st.section.replace(/^Section \d+:\s*/, '')}
                    </td>
                    <td className="py-3 px-3 text-center font-mono">
                      {st.attempted}
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-bold">
                      <span className={st.accuracy >= 75 ? 'text-emerald-600 dark:text-emerald-400' : st.accuracy >= 50 ? 'text-amber-600' : 'text-rose-600'}>
                        {st.accuracy}%
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center font-mono text-rose-500 font-bold">
                      -{st.negativeMarksLost.toFixed(2)}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                        st.status === 'Critical' 
                          ? 'bg-rose-500/20 text-rose-700 dark:text-rose-300'
                          : st.status === 'Stronghold'
                            ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                            : 'bg-amber-500/20 text-amber-700 dark:text-amber-300'
                      }`}>
                        {st.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Formula Study Deck Modal */}
      {activeFormulaModal && (
        <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/60 dark:bg-slate-950/40">
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    Weak-Area Targeted Formula Revision Deck
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    High-yield formulas matching your top diagnosed vulnerabilities
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveFormulaModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Formulas List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {diagnosticReport.relevantFormulas.map((form, fIdx) => (
                <div 
                  key={fIdx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {form.title}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/20">
                      {form.category || 'Formula'}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center overflow-x-auto">
                    <MathRenderer content={`$$${form.latex || form.formula || ''}$$`} />
                  </div>

                  {form.explanation && (
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {form.explanation}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end bg-slate-50 dark:bg-slate-950">
              <button
                type="button"
                onClick={() => setActiveFormulaModal(false)}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs cursor-pointer hover:bg-blue-500"
              >
                Done Reviewing
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
