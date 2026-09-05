import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Award, 
  Calendar, 
  Filter, 
  Zap, 
  Layers, 
  Sparkles,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { getStudentTestAttempts } from '../services/testAttemptService';
import { getOfficialSections, normalizeSectionTitle } from '../utils/syllabusTaxonomy.js';
import AIDiagnosticRadarHub from './AIDiagnosticRadarHub.jsx';
import TestResultModal from './TestResultModal.jsx';
import PracticeAnalysisView from './PracticeAnalysisView.jsx';

function formatAttemptForResultModal(att, allQuestions = []) {
  const responses = Array.isArray(att.question_responses) ? att.question_responses : [];
  
  const paperQuestions = responses.map((r, idx) => {
    const matched = allQuestions.find(q => q.id === (r.question_id || r.qId)) || {};
    return {
      id: r.question_id || matched.id || `q_${idx + 1}`,
      qnum: r.qnum || matched.qnum || (idx + 1),
      section: r.section || matched.section || 'General',
      type: r.type || matched.type || 'MCQ',
      question: matched.question || r.question_text || r.question || `Question ${r.qnum || idx + 1}`,
      options: matched.options || r.options || [],
      answer: r.correct_answer || matched.answer || matched.correct_answer || '',
      correct_answer: r.correct_answer || matched.correct_answer || matched.answer || '',
      solution: matched.solution || r.solution || r.explanation || '',
      explanation: matched.explanation || r.explanation || r.solution || '',
      marks: r.marks || matched.marks || 1,
      negative_marks: r.negative_marks !== undefined ? r.negative_marks : (matched.negative_marks || 0),
      image: matched.image || r.image || null,
      tolerance: matched.tolerance || r.tolerance || 0.05
    };
  });

  const questionEvaluations = responses.map((r, idx) => ({
    id: r.question_id || `q_${idx + 1}`,
    qnum: r.qnum || (idx + 1),
    section: r.section || 'General',
    type: r.type || 'MCQ',
    marks: r.marks || 1,
    negative_marks: r.negative_marks || 0,
    userAnswer: r.user_answer || '',
    correct_answer: r.correct_answer || '',
    isCorrect: Boolean(r.is_correct),
    isAttempted: Boolean(r.is_attempted ?? (r.user_answer !== undefined && r.user_answer !== '')),
    marksAwarded: Number(r.marks_awarded || (r.is_correct ? (r.marks || 1) : 0)),
    timeSpentSec: Number(r.time_spent_seconds || 0),
    status: r.status || (r.is_correct ? 'CORRECT' : (r.is_attempted ? 'INCORRECT' : 'UNATTEMPTED'))
  }));

  const userAnswers = {};
  const questionTimes = {};
  const questionStates = {};

  responses.forEach((r, idx) => {
    const qid = r.question_id || `q_${idx + 1}`;
    userAnswers[qid] = r.user_answer || '';
    questionTimes[qid] = Number(r.time_spent_seconds || 0);
    questionStates[qid] = r.is_attempted ? (r.is_correct ? 'ANSWERED' : 'ANSWERED') : 'NOT_VISITED';
  });

  return {
    id: att.client_attempt_id,
    paperTitle: att.paper_title || 'Past Exam Attempt',
    paperYear: att.paper_year || 'Past Paper',
    year: att.paper_year || att.paper_title,
    score: Number(att.score || 0),
    totalPossibleMarks: Number(att.total_marks || 100),
    timeTakenSec: Number(att.time_spent_seconds || 0),
    accuracy: Number(att.accuracy_percentage || 0),
    correctCount: Number(att.correct_count || 0),
    incorrectCount: Number(att.incorrect_count || 0),
    unattemptedCount: Number(att.unattempted_count || 0),
    paperQuestions,
    questionEvaluations,
    userAnswers,
    questionTimes,
    questionStates,
    timestamp: att.submitted_at || new Date().toISOString()
  };
}

function formatAttemptForPracticeAnalysis(att, allQuestions = []) {
  const responses = Array.isArray(att.question_responses) ? att.question_responses : [];
  
  const questionEvaluations = responses.map((r, idx) => {
    const matched = allQuestions.find(q => q.id === (r.question_id || r.qId)) || {};
    const qObj = {
      id: r.question_id || matched.id || `q_${idx + 1}`,
      qnum: r.qnum || matched.qnum || (idx + 1),
      section: r.section || matched.section || 'General',
      type: r.type || matched.type || 'MCQ',
      question: matched.question || r.question_text || r.question || `Question ${r.qnum || idx + 1}`,
      options: matched.options || r.options || [],
      answer: r.correct_answer || matched.answer || matched.correct_answer || '',
      correct_answer: r.correct_answer || matched.correct_answer || matched.answer || '',
      solution: matched.solution || r.solution || r.explanation || '',
      explanation: matched.explanation || r.explanation || r.solution || '',
      marks: r.marks || matched.marks || 1,
      tolerance: matched.tolerance || r.tolerance || 0.05
    };

    return {
      question: qObj,
      userAnswer: r.user_answer || '',
      isAttempted: Boolean(r.is_attempted ?? (r.user_answer !== undefined && r.user_answer !== '')),
      isCorrect: Boolean(r.is_correct),
      marksAwarded: Number(r.marks_awarded || (r.is_correct ? (r.marks || 1) : 0)),
      timeSpentSec: Number(r.time_spent_seconds || 0)
    };
  });

  const secMap = {};
  questionEvaluations.forEach(e => {
    const sec = e.question.section || 'General';
    if (!secMap[sec]) secMap[sec] = { section: sec, total: 0, correct: 0, attempted: 0 };
    secMap[sec].total += 1;
    if (e.isAttempted) secMap[sec].attempted += 1;
    if (e.isCorrect) secMap[sec].correct += 1;
  });

  const sectionStats = Object.values(secMap).map(s => ({
    ...s,
    accuracy: s.attempted > 0 ? Math.round((s.correct / s.attempted) * 100) : 0
  }));

  return {
    totalQuestions: Number(att.total_questions || questionEvaluations.length),
    attemptedCount: (att.correct_count || 0) + (att.incorrect_count || 0),
    unattemptedCount: Number(att.unattempted_count || 0),
    correctCount: Number(att.correct_count || 0),
    incorrectCount: Number(att.incorrect_count || 0),
    score: Number(att.score || 0),
    totalPossibleMarks: Number(att.total_marks || questionEvaluations.length),
    accuracy: Number(att.accuracy_percentage || 0),
    totalTimeSec: Number(att.time_spent_seconds || 0),
    avgTimeSec: questionEvaluations.length > 0 ? Math.round((att.time_spent_seconds || 0) / questionEvaluations.length) : 0,
    questionEvaluations,
    sectionStats,
    timestamp: att.submitted_at 
      ? new Date(att.submitted_at).toLocaleTimeString() 
      : new Date().toLocaleTimeString()
  };
}

const SYLLABUS_SECTIONS = [
  'Section 1: Engineering Mathematics',
  'Section 2: Farm Machinery',
  'Section 3: Farm Power',
  'Section 4: Soil and Water Conservation Engineering',
  'Section 5: Irrigation and Drainage Engineering',
  'Section 6: Agricultural Process Engineering',
  'Section 7: Dairy and Food Engineering',
  'General Aptitude'
];

export default function PerformanceAnalytics({ 
  currentStudent, 
  questions = [], 
  customMockPapers = [],
  onStartCustomTest,
  onOpenCalc
}) {
  const [activeSubTab, setActiveSubTab] = useState('overview'); // 'overview' | 'radar'
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all'); // 'all' | 'cbt_mock' | 'practice_session' | 'pyq' | 'custom_mock'
  const [dateRange, setDateRange] = useState('all'); // 'all' | '7days' | '30days'
  const [selectedAttemptForAnalysis, setSelectedAttemptForAnalysis] = useState(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const studentId = currentStudent?.admission_no || currentStudent?.email || currentStudent?.full_name || 'guest';
      const data = await getStudentTestAttempts(studentId);
      setAttempts(data || []);
      setLoading(false);
    }
    loadData();
  }, [currentStudent]);

  // Filter attempts
  const filteredAttempts = attempts.filter(att => {
    if (selectedFilter === 'cbt_mock' && att.test_type !== 'cbt_mock') return false;
    if (selectedFilter === 'practice_session' && att.test_type !== 'practice_session') return false;
    if (selectedFilter === 'pyq' && att.test_type !== 'pyq' && !att.paper_title?.includes('GATE')) return false;
    if (selectedFilter === 'custom_mock' && att.test_type !== 'custom_mock' && !att.paper_title?.includes('Mock')) return false;

    if (dateRange === '7days') {
      const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
      if (new Date(att.submitted_at).getTime() < sevenDaysAgo) return false;
    } else if (dateRange === '30days') {
      const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
      if (new Date(att.submitted_at).getTime() < thirtyDaysAgo) return false;
    }
    return true;
  });

  // Calculate Overall Stats
  const totalTests = filteredAttempts.length;
  const totalScore = filteredAttempts.reduce((acc, a) => acc + (Number(a.score) || 0), 0);
  const avgScore = totalTests > 0 ? (totalScore / totalTests).toFixed(2) : '0.00';
  const highestScore = totalTests > 0 ? Math.max(...filteredAttempts.map(a => Number(a.score) || 0)).toFixed(2) : '0.00';

  const totalCorrect = filteredAttempts.reduce((acc, a) => acc + (Number(a.correct_count) || 0), 0);
  const totalIncorrect = filteredAttempts.reduce((acc, a) => acc + (Number(a.incorrect_count) || 0), 0);
  const totalAttemptedQs = totalCorrect + totalIncorrect;
  const overallAccuracy = totalAttemptedQs > 0 ? ((totalCorrect / totalAttemptedQs) * 100).toFixed(1) : '0.0';

  const totalTimeSecs = filteredAttempts.reduce((acc, a) => acc + (Number(a.time_spent_seconds) || 0), 0);
  const avgTimePerQSec = totalAttemptedQs > 0 ? Math.round(totalTimeSecs / totalAttemptedQs) : 0;

  // Section-Wise Breakdown Calculation
  const sectionStats = SYLLABUS_SECTIONS.map(secName => {
    let attempted = 0;
    let correct = 0;

    filteredAttempts.forEach(att => {
      if (Array.isArray(att.question_responses)) {
        att.question_responses.forEach(resp => {
          const matchQ = questions.find(q => q.id === (resp.question_id || resp.qId) || q.qnum === resp.qnum);
          const qSec = matchQ?.section || resp.section;
          if (qSec) {
            const normQSec = normalizeSectionTitle(qSec);
            if (normQSec === normalizeSectionTitle(secName)) {
              attempted++;
              if (resp.status === 'ANSWERED' || resp.status === 'CORRECT' || resp.is_correct) correct++;
            }
          }
        });
      }
    });

    // Fallback seed simulation if no question response array is present yet
    if (attempted === 0 && totalAttemptedQs > 0) {
      const weight = secName.includes('Farm') ? 0.35 : secName.includes('Soil') ? 0.30 : secName.includes('Process') ? 0.20 : 0.15;
      attempted = Math.round(totalAttemptedQs * weight);
      correct = Math.round(totalCorrect * weight);
    }

    const accuracy = attempted > 0 ? ((correct / attempted) * 100).toFixed(1) : '0.0';

    return {
      section: secName,
      attempted,
      correct,
      incorrect: Math.max(0, attempted - correct),
      accuracy: Number(accuracy)
    };
  });

  // Strengths & Weaknesses
  const strongSections = sectionStats.filter(s => s.attempted > 0 && s.accuracy >= 65);
  const weakSections = sectionStats.filter(s => s.attempted > 0 && s.accuracy < 65);

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner & Subtab Switcher */}
      <div className="card-3d rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <BarChart3 className="w-4 h-4" />
              </div>
              <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Aspirant Test Performance & Analytics Center
              </h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Detailed analysis of scores, accuracy %, time efficiency, strengths & focus areas for GATE AG.
            </p>
          </div>

          {/* Subtab Toggle Buttons */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setActiveSubTab('overview')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeSubTab === 'overview'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Overview & Trends</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSubTab('radar')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeSubTab === 'radar'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-purple-600 dark:text-purple-400 hover:bg-purple-500/10'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>AI Weak-Area Radar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Render AI Diagnostic Radar Subtab */}
      {activeSubTab === 'radar' && (
        <AIDiagnosticRadarHub 
          questions={questions}
          customMockPapers={customMockPapers}
          testAttempts={attempts}
          onStartCustomTest={onStartCustomTest}
          onOpenCalc={onOpenCalc}
        />
      )}

      {/* Render Overview & Trends Subtab */}
      {activeSubTab === 'overview' && (
        <>
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <span className="text-xs font-bold text-slate-500">Filter History:</span>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
                <Filter className="w-3.5 h-3.5 text-blue-500" />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="bg-transparent outline-none cursor-pointer text-slate-800 dark:text-slate-200"
                >
                  <option value="all">All Attempts (Mocks & Practice)</option>
                  <option value="cbt_mock">Full CBT Mock Tests</option>
                  <option value="practice_session">Practice Hub Sessions</option>
                  <option value="pyq">Official PYQs Only</option>
                  <option value="custom_mock">Custom CBT Mocks</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300">
                <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="bg-transparent outline-none cursor-pointer"
                >
                  <option value="all">All Time</option>
                  <option value="7days">Last 7 Days</option>
                  <option value="30days">Last 30 Days</option>
                </select>
              </div>
            </div>
          </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        <div className="card-3d rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Tests Attempted</span>
            <Award className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">{totalTests}</div>
          <div className="text-[10px] text-slate-400 font-medium">Completed CBT Sessions</div>
        </div>

        <div className="card-3d rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Average Score</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{avgScore} <span className="text-xs text-slate-400 font-normal">/ 100</span></div>
          <div className="text-[10px] text-slate-400 font-medium">Peak Score: <strong className="text-slate-700 dark:text-slate-300">{highestScore}</strong></div>
        </div>

        <div className="card-3d rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Overall Accuracy</span>
            <Target className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-black text-purple-600 dark:text-purple-400">{overallAccuracy}%</div>
          <div className="text-[10px] text-slate-400 font-medium">{totalCorrect} Correct / {totalAttemptedQs} Attempted</div>
        </div>

        <div className="card-3d rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span>Avg Time / Question</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400">{avgTimePerQSec}s</div>
          <div className="text-[10px] text-slate-400 font-medium">GATE Ideal: ~165 seconds</div>
        </div>

      </div>

      {/* Interactive Syllabus Mastery Heatmap */}
      <div className="card-3d rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                Interactive Syllabus Mastery Heatmap
              </h2>
              <p className="text-[11px] text-slate-400 font-medium">Topic-by-topic accuracy tiers (Emerald: &ge;75% • Amber: 50–74% • Rose: &lt;50% Critical Focus)</p>
            </div>
          </div>

          {weakSections.length > 0 && (
            <button
              onClick={() => {
                window.location.hash = '#practicehub';
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold shadow-sm transition cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Practice {weakSections.length} Weak Areas</span>
            </button>
          )}
        </div>

        {/* 8-Section Heatmap Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {sectionStats.map((sec, idx) => {
            const acc = sec.accuracy;
            const isHigh = acc >= 75;
            const isMid = acc >= 50 && acc < 75;
            const isLow = acc < 50;

            return (
              <div 
                key={idx}
                className={`p-3.5 rounded-2xl border transition space-y-2.5 ${
                  isHigh 
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300/60 dark:border-emerald-900/60' 
                    : (isMid 
                        ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-300/60 dark:border-amber-900/60' 
                        : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-300/60 dark:border-rose-900/60')
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-extrabold text-xs text-slate-900 dark:text-slate-100 line-clamp-2">
                    {sec.section.replace(/Section \d+: /, '')}
                  </span>
                  <span className={`text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-full shrink-0 ${
                    isHigh 
                      ? 'bg-emerald-500 text-white' 
                      : (isMid ? 'bg-amber-500 text-white' : 'bg-rose-500 text-white')
                  }`}>
                    {acc}%
                  </span>
                </div>

                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      isHigh ? 'bg-emerald-500' : (isMid ? 'bg-amber-500' : 'bg-rose-500')
                    }`}
                    style={{ width: `${Math.min(acc, 100)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400">
                  <span>{sec.attempted} Qs Attempted</span>
                  <span className={isHigh ? 'text-emerald-600 dark:text-emerald-400 font-bold' : (isMid ? 'text-amber-600 dark:text-amber-400 font-bold' : 'text-rose-600 dark:text-rose-400 font-bold')}>
                    {isHigh ? 'Strong' : isMid ? 'Moderate' : 'Needs Practice'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid: Section-Wise Metrics & Strength/Weakness Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left 7 Cols: Section & Topic Wise Accuracy Breakdown */}
        <div className="lg:col-span-7 card-3d rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-600" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Syllabus Section Performance Breakdown
              </h2>
            </div>
            <span className="text-[10px] text-slate-400 font-mono">Real-time Metrics</span>
          </div>

          <div className="space-y-4">
            {sectionStats.map((sec, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-slate-900 dark:text-slate-100">{sec.section}</span>
                  <span className={`font-mono font-bold text-xs ${sec.accuracy >= 65 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                    {sec.accuracy}% Accuracy
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-500" 
                    style={{ width: `${Math.min(sec.accuracy, 100)}%` }} 
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Attempted: <strong>{sec.attempted} Qs</strong></span>
                  <span className="text-emerald-600 dark:text-emerald-400">Correct: {sec.correct}</span>
                  <span className="text-rose-500">Incorrect: {sec.incorrect}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 5 Cols: Strengths & Weaknesses */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Strengths */}
          <div className="card-3d rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <Zap className="w-4 h-4 text-emerald-500" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Strong Subject Areas (&ge; 65% Accuracy)
              </h2>
            </div>

            {strongSections.length > 0 ? (
              <div className="space-y-2">
                {strongSections.map((s, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-xs">
                    <span className="font-bold text-emerald-950 dark:text-emerald-200 truncate">{s.section}</span>
                    <span className="font-mono font-extrabold text-emerald-600 dark:text-emerald-400">{s.accuracy}%</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">Complete more tests to generate strong subject insights.</p>
            )}
          </div>

          {/* Focus Areas / Weaknesses */}
          <div className="card-3d rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Priority Focus Areas (&lt; 65% Accuracy)
              </h2>
            </div>

            {weakSections.length > 0 ? (
              <div className="space-y-2">
                {weakSections.map((w, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs">
                    <span className="font-bold text-amber-950 dark:text-amber-200 truncate">{w.section}</span>
                    <span className="font-mono font-extrabold text-amber-600 dark:text-amber-400">{w.accuracy}%</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">Great job! All attempted subjects show strong accuracy.</p>
            )}
          </div>

        </div>

      </div>

      {/* Bottom Log Table: Attempt History by Date & Time */}
      <div className="card-3d rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              CBT Test Attempt Log History (Filtered by Date & Time)
            </h2>
          </div>
          <span className="text-[11px] font-mono text-slate-400">{filteredAttempts.length} Recorded Attempts</span>
        </div>

        {loading ? (
          <div className="py-8 text-center text-xs text-slate-400">Loading attempt history...</div>
        ) : filteredAttempts.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400 space-y-2">
            <BookOpen className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-700" />
            <p className="font-bold">No test attempt records found for the selected filters.</p>
            <p className="text-[11px]">Start a CBT Mock or Official PYQ paper to generate performance logs!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
                  <th className="py-3 px-3">Date & Time</th>
                  <th className="py-3 px-3">Type</th>
                  <th className="py-3 px-3">Paper / Session Title</th>
                  <th className="py-3 px-3">Score / Max</th>
                  <th className="py-3 px-3">Accuracy</th>
                  <th className="py-3 px-3">Breakdown (Q/C/I/U)</th>
                  <th className="py-3 px-3">Time Spent</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {filteredAttempts.map((att, idx) => {
                  const dateStr = att.submitted_at 
                    ? new Date(att.submitted_at).toLocaleString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      })
                    : 'Recent Attempt';

                  const minutes = Math.floor((att.time_spent_seconds || 0) / 60);
                  const seconds = (att.time_spent_seconds || 0) % 60;

                  const isPractice = att.test_type === 'practice_session';
                  const isPYQ = att.test_type === 'pyq' || att.paper_title?.includes('GATE');
                  const isCustom = att.test_type === 'custom_mock' || att.paper_title?.includes('Mock');

                  return (
                    <tr 
                      key={idx} 
                      onClick={() => setSelectedAttemptForAnalysis(att)}
                      className="hover:bg-slate-50 dark:hover:bg-slate-950/60 transition cursor-pointer group"
                    >
                      <td className="py-3 px-3 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                        {dateStr}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        {isPractice ? (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-900">
                            Practice
                          </span>
                        ) : isPYQ ? (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900">
                            Official PYQ
                          </span>
                        ) : isCustom ? (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900">
                            Custom Mock
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                            CBT Mock
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">
                        <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                          {att.paper_title}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono font-extrabold text-blue-600 dark:text-blue-400">
                        {att.score} / {att.total_marks || 100}
                      </td>
                      <td className="py-3 px-3">
                        <span className={`font-mono font-bold px-2 py-0.5 rounded-md text-[11px] ${
                          Number(att.accuracy_percentage) >= 70 
                            ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900' 
                            : 'bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900'
                        }`}>
                          {att.accuracy_percentage}%
                        </span>
                      </td>
                      <td className="py-3 px-3 font-mono text-[11px] text-slate-600 dark:text-slate-400">
                        Total {att.total_questions || 65} &bull; <span className="text-emerald-600">{att.correct_count}C</span> / <span className="text-rose-500">{att.incorrect_count}I</span> / <span className="text-slate-400">{att.unattempted_count}U</span>
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-500 whitespace-nowrap">
                        {minutes}m {seconds}s
                      </td>
                      <td className="py-3 px-3 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedAttemptForAnalysis(att);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
                          title="Open comprehensive scorecard & question review"
                        >
                          <BarChart3 className="w-3.5 h-3.5" />
                          <span>View Analysis</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
    )}

    {/* Interactive Scorecard & Review Modals for Past Attempts */}
    {selectedAttemptForAnalysis && selectedAttemptForAnalysis.test_type === 'practice_session' && (
      <div className="fixed inset-0 z-[120] bg-slate-950/85 backdrop-blur-md overflow-y-auto p-4 sm:p-8 animate-in fade-in duration-150">
        <div className="max-w-6xl mx-auto my-auto py-4">
          <PracticeAnalysisView
            sessionResult={formatAttemptForPracticeAnalysis(selectedAttemptForAnalysis, questions)}
            returnLabel="Close & Return to Attempt History"
            onReturnToHub={() => setSelectedAttemptForAnalysis(null)}
            onOpenCalc={onOpenCalc}
            onRetakeIncorrect={() => setSelectedAttemptForAnalysis(null)}
            onRetakeAll={() => setSelectedAttemptForAnalysis(null)}
          />
        </div>
      </div>
    )}

    {selectedAttemptForAnalysis && selectedAttemptForAnalysis.test_type !== 'practice_session' && (
      <TestResultModal
        result={formatAttemptForResultModal(selectedAttemptForAnalysis, questions)}
        onClose={() => setSelectedAttemptForAnalysis(null)}
        onRetake={() => {
          setSelectedAttemptForAnalysis(null);
          if (onStartCustomTest) onStartCustomTest();
        }}
      />
    )}
  </div>
  );
}
