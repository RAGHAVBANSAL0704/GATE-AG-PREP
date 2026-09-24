import React, { useState, useEffect, useMemo } from 'react';
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
  BookOpen,
  ShieldAlert,
  Play,
  Flame,
  ArrowUpRight,
  HelpCircle,
  Activity,
  RotateCcw,
  Compass
} from 'lucide-react';
import { getStudentTestAttempts } from '../services/testAttemptService';
import { getLocalPracticeProgress } from '../services/studentProgressSyncService';
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
      image: matched.image_url || matched.image || r.image || null,
      image_url: matched.image_url || matched.image || r.image || null,
      tolerance: matched.tolerance || r.tolerance || 0.05
    };
  });

  const questionEvaluations = responses.map((r, idx) => {
    const matched = allQuestions.find(q => q.id === (r.question_id || r.qId)) || {};
    const qid = r.question_id || matched.id || `q_${idx + 1}`;
    const rawUserAns = r.user_answer !== undefined && r.user_answer !== null ? String(r.user_answer).trim() : '';
    const isUnattemptedState = r.status === 'UNATTEMPTED' || r.status === 'NOT_ANSWERED' || r.status === 'NOT_VISITED';
    
    // Explicit is_attempted flag check, fallback to non-empty answer and valid status
    const isAttempted = r.is_attempted !== undefined
      ? Boolean(r.is_attempted)
      : (rawUserAns !== '' && !isUnattemptedState);

    const isCorrect = isAttempted && Boolean(r.is_correct);

    return {
      id: qid,
      qnum: r.qnum || matched.qnum || (idx + 1),
      section: r.section || matched.section || 'General',
      type: r.type || matched.type || 'MCQ',
      marks: r.marks || matched.marks || 1,
      negative_marks: r.negative_marks !== undefined ? r.negative_marks : (matched.negative_marks || 0),
      userAnswer: isAttempted ? rawUserAns : '',
      correct_answer: r.correct_answer || matched.correct_answer || matched.answer || '',
      isCorrect,
      isAttempted,
      marksAwarded: Number(r.marks_awarded !== undefined ? r.marks_awarded : (isCorrect ? (r.marks || 1) : 0)),
      timeSpentSec: Number(r.time_spent_seconds || 0),
      status: !isAttempted ? 'UNATTEMPTED' : (isCorrect ? 'CORRECT' : 'INCORRECT')
    };
  });

  const userAnswers = {};
  const questionTimes = {};
  const questionStates = {};

  responses.forEach((r, idx) => {
    const matched = allQuestions.find(q => q.id === (r.question_id || r.qId)) || {};
    const qid = r.question_id || matched.id || `q_${idx + 1}`;
    const rawUserAns = r.user_answer !== undefined && r.user_answer !== null ? String(r.user_answer).trim() : '';
    const isUnattemptedState = r.status === 'UNATTEMPTED' || r.status === 'NOT_ANSWERED' || r.status === 'NOT_VISITED';
    const isAttempted = r.is_attempted !== undefined
      ? Boolean(r.is_attempted)
      : (rawUserAns !== '' && !isUnattemptedState);

    userAnswers[qid] = isAttempted ? rawUserAns : '';
    questionTimes[qid] = Number(r.time_spent_seconds || 0);
    questionStates[qid] = isAttempted ? 'ANSWERED' : 'NOT_VISITED';
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
      image: matched.image_url || matched.image || r.image || null,
      image_url: matched.image_url || matched.image || r.image || null,
      tolerance: matched.tolerance || r.tolerance || 0.05
    };

    const rawUserAns = r.user_answer !== undefined && r.user_answer !== null ? String(r.user_answer).trim() : '';
    const isUnattemptedState = r.status === 'UNATTEMPTED' || r.status === 'NOT_ANSWERED' || r.status === 'NOT_VISITED';
    const isAttempted = r.is_attempted !== undefined
      ? Boolean(r.is_attempted)
      : (rawUserAns !== '' && !isUnattemptedState);

    const isCorrect = isAttempted && Boolean(r.is_correct);

    return {
      question: qObj,
      userAnswer: isAttempted ? rawUserAns : '',
      isAttempted,
      isCorrect,
      marksAwarded: Number(r.marks_awarded !== undefined ? r.marks_awarded : (isCorrect ? (r.marks || 1) : 0)),
      timeSpentSec: Number(r.time_spent_seconds || 0),
      status: !isAttempted ? 'UNATTEMPTED' : (isCorrect ? 'CORRECT' : 'INCORRECT')
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
  onStartTypeDrill,
  onOpenCalc
}) {
  const [analyticsScope, setAnalyticsScope] = useState('cbt'); // 'cbt' | 'practice' | 'combined'
  const [activeSubTab, setActiveSubTab] = useState('overview'); // 'overview' | 'radar'
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all'); // 'all' | 'cbt_mock' | 'practice_session' | 'pyq' | 'custom_mock'
  const [dateRange, setDateRange] = useState('all'); // 'all' | '7days' | '30days'
  const [selectedAttemptForAnalysis, setSelectedAttemptForAnalysis] = useState(null);

  const studentId = currentStudent?.admission_no || currentStudent?.email || currentStudent?.full_name || currentStudent?.id || 'guest';
  const [practiceProgress, setPracticeProgress] = useState(() => getLocalPracticeProgress(studentId));

  // Re-hydrate practice progress when student changes
  useEffect(() => {
    setPracticeProgress(getLocalPracticeProgress(studentId));
  }, [studentId]);

  // Initial load of test attempts
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await getStudentTestAttempts(studentId);
      setAttempts(data || []);
      setLoading(false);
    }
    loadData();
  }, [studentId]);

  // Reactive listeners for live practice solves and cross-tab / cloud updates
  useEffect(() => {
    const handleProgressSynced = (e) => {
      if (e?.detail?.practiceProgress && typeof e.detail.practiceProgress === 'object') {
        setPracticeProgress(e.detail.practiceProgress);
      }
      getStudentTestAttempts(studentId).then(data => setAttempts(data || []));
    };

    const handlePracticeUpdated = (e) => {
      const { qid, progressEntry } = e.detail || {};
      if (qid && progressEntry) {
        setPracticeProgress(prev => ({
          ...prev,
          [qid]: progressEntry
        }));
      }
    };

    const handleStorage = (e) => {
      if (e.key && (e.key.includes('gate_ag_practice_progress') || e.key.includes('gate_ag_qbank_progress'))) {
        setPracticeProgress(getLocalPracticeProgress(studentId));
      }
      if (e.key === 'gate_ag_test_attempts' || e.key === 'gate_ag_prep_test_attempts') {
        getStudentTestAttempts(studentId).then(data => setAttempts(data || []));
      }
    };

    const handleAttemptSaved = () => {
      getStudentTestAttempts(studentId).then(data => setAttempts(data || []));
    };

    window.addEventListener('gate_ag_progress_synced', handleProgressSynced);
    window.addEventListener('gate_ag_practice_progress_updated', handlePracticeUpdated);
    window.addEventListener('gate_ag_test_attempt_saved', handleAttemptSaved);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('gate_ag_progress_synced', handleProgressSynced);
      window.removeEventListener('gate_ag_practice_progress_updated', handlePracticeUpdated);
      window.removeEventListener('gate_ag_test_attempt_saved', handleAttemptSaved);
      window.removeEventListener('storage', handleStorage);
    };
  }, [studentId]);

  // Filter attempts strictly for CBT mock papers (keeping practice separated)
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

  const cbtOnlyAttempts = filteredAttempts.filter(att => att.test_type !== 'practice_session');

  // ==========================================
  // 1. CBT MOCK PAPERS ANALYTICS PIPELINE (ISOLATED)
  // ==========================================
  const totalTests = cbtOnlyAttempts.length;
  const totalScore = cbtOnlyAttempts.reduce((acc, a) => acc + (Number(a.score) || 0), 0);
  const avgScore = totalTests > 0 ? (totalScore / totalTests).toFixed(2) : '0.00';
  const highestScore = totalTests > 0 ? Math.max(...cbtOnlyAttempts.map(a => Number(a.score) || 0)).toFixed(2) : '0.00';

  const totalCorrect = cbtOnlyAttempts.reduce((acc, a) => acc + (Number(a.correct_count) || 0), 0);
  const totalIncorrect = cbtOnlyAttempts.reduce((acc, a) => acc + (Number(a.incorrect_count) || 0), 0);
  const totalAttemptedQs = totalCorrect + totalIncorrect;
  const overallAccuracy = totalAttemptedQs > 0 ? ((totalCorrect / totalAttemptedQs) * 100).toFixed(1) : '0.0';

  const totalTimeSecs = cbtOnlyAttempts.reduce((acc, a) => acc + (Number(a.time_spent_seconds) || 0), 0);
  const avgTimePerQSec = totalAttemptedQs > 0 ? Math.round(totalTimeSecs / totalAttemptedQs) : 0;

  const allQuestionsPool = useMemo(() => {
    const list = [...questions];
    (customMockPapers || []).forEach(p => {
      (p.questions || []).forEach(q => list.push(q));
    });
    return list;
  }, [questions, customMockPapers]);

  // Section-Wise Breakdown Calculation for CBT Mocks
  const sectionStats = SYLLABUS_SECTIONS.map(secName => {
    let attempted = 0;
    let correct = 0;
    let unattempted = 0;

    cbtOnlyAttempts.forEach(att => {
      if (Array.isArray(att.question_responses)) {
        att.question_responses.forEach(resp => {
          const matchQ = allQuestionsPool.find(q => q.id === (resp.question_id || resp.qId) || q.qnum === resp.qnum);
          const qSec = matchQ?.section || resp.section;
          if (qSec) {
            const normQSec = normalizeSectionTitle(qSec);
            if (normQSec === normalizeSectionTitle(secName)) {
              const rawAns = resp.user_answer !== undefined && resp.user_answer !== null ? String(resp.user_answer).trim() : '';
              const isUnattemptedState = resp.status === 'UNATTEMPTED' || resp.status === 'NOT_ANSWERED' || resp.status === 'NOT_VISITED';
              const isAttempted = resp.is_attempted !== undefined
                ? Boolean(resp.is_attempted)
                : (rawAns !== '' && !isUnattemptedState);

              if (isAttempted) {
                attempted++;
                const isCorrect = Boolean(resp.is_correct || resp.status === 'CORRECT');
                if (isCorrect) correct++;
              } else {
                unattempted++;
              }
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

    const incorrect = Math.max(0, attempted - correct);
    const accuracy = attempted > 0 ? ((correct / attempted) * 100).toFixed(1) : '0.0';

    return {
      section: secName,
      attempted,
      unattempted,
      correct,
      incorrect,
      accuracy: Number(accuracy)
    };
  });

  // Strengths & Weaknesses for CBT Mocks
  const strongSections = sectionStats.filter(s => s.attempted > 0 && s.accuracy >= 65);
  const weakSections = sectionStats.filter(s => s.attempted > 0 && s.accuracy < 65);

  // Question-Type Strategy & Score Leak Analytics (Longitudinal Historical Aggregation for CBT Mocks)
  const questionTypeStats = useMemo(() => {
    const raw = {
      MCQ: { total: 0, attempted: 0, correct: 0, incorrect: 0, marksGained: 0, penaltyLost: 0, totalTimeSec: 0 },
      MSQ: { total: 0, attempted: 0, correct: 0, incorrect: 0, marksGained: 0, penaltyLost: 0, totalTimeSec: 0 },
      NAT: { total: 0, attempted: 0, correct: 0, incorrect: 0, marksGained: 0, penaltyLost: 0, totalTimeSec: 0 }
    };

    cbtOnlyAttempts.forEach(att => {
      if (Array.isArray(att.question_responses)) {
        att.question_responses.forEach(resp => {
          const matchQ = allQuestionsPool.find(q => q.id === (resp.question_id || resp.qId) || q.qnum === resp.qnum);
          const rawType = (resp.type || matchQ?.type || 'MCQ').toUpperCase().trim();
          const qType = rawType.includes('MSQ') ? 'MSQ' : rawType.includes('NAT') ? 'NAT' : 'MCQ';

          raw[qType].total += 1;

          const rawAns = resp.user_answer !== undefined && resp.user_answer !== null ? String(resp.user_answer).trim() : '';
          const isUnattemptedState = resp.status === 'UNATTEMPTED' || resp.status === 'NOT_ANSWERED' || resp.status === 'NOT_VISITED';
          const isAttempted = resp.is_attempted !== undefined
            ? Boolean(resp.is_attempted)
            : (rawAns !== '' && !isUnattemptedState);

          const timeSec = Number(resp.time_spent_seconds || 0);
          raw[qType].totalTimeSec += timeSec;

          if (isAttempted) {
            raw[qType].attempted += 1;
            const isCorrect = Boolean(resp.is_correct || resp.status === 'CORRECT');
            const marks = Number(resp.marks || matchQ?.marks || 1);
            if (isCorrect) {
              raw[qType].correct += 1;
              raw[qType].marksGained += Number(resp.marks_awarded !== undefined ? resp.marks_awarded : marks);
            } else {
              raw[qType].incorrect += 1;
              if (qType === 'MCQ') {
                const neg = Number(resp.negative_marks !== undefined ? resp.negative_marks : (marks === 2 ? 2/3 : 1/3));
                raw[qType].penaltyLost += neg;
              }
            }
          }
        });
      }
    });

    const formatMetrics = (type) => {
      const s = raw[type];
      const acc = s.attempted > 0 ? (s.correct / s.attempted) * 100 : 0;
      const netMarks = s.marksGained - s.penaltyLost;
      const avgTime = s.attempted > 0 ? Math.round(s.totalTimeSec / s.attempted) : 0;
      return {
        ...s,
        accuracy: Number(acc.toFixed(1)),
        netMarks: Number(netMarks.toFixed(2)),
        penaltyLost: Number(s.penaltyLost.toFixed(2)),
        avgTime
      };
    };

    const MCQ = formatMetrics('MCQ');
    const MSQ = formatMetrics('MSQ');
    const NAT = formatMetrics('NAT');

    // Determine Weakest Format for targeted remediation
    const activeTypes = ['MCQ', 'MSQ', 'NAT'].filter(t => raw[t].attempted > 0);
    let weakest = 'NAT';
    let weakestReason = 'Practice numerical calculations (0 negative risk) to maximize quantitative strike rate.';

    if (activeTypes.length > 0) {
      if (MCQ.penaltyLost >= 2) {
        weakest = 'MCQ';
        weakestReason = `Conceded -${MCQ.penaltyLost} marks across past tests to MCQ negative penalties. Precision drills will stop penalty bleed!`;
      } else {
        const sorted = [...activeTypes].sort((a, b) => {
          const accA = a === 'MCQ' ? MCQ.accuracy : a === 'MSQ' ? MSQ.accuracy : NAT.accuracy;
          const accB = b === 'MCQ' ? MCQ.accuracy : b === 'MSQ' ? MSQ.accuracy : NAT.accuracy;
          return accA - accB;
        });
        sorted[0] && (weakest = sorted[0]);
        if (weakest === 'NAT') {
          weakestReason = `Historical NAT accuracy is ${NAT.accuracy}% with zero negative penalty risk. Focus on calculation drills!`;
        } else if (weakest === 'MSQ') {
          weakestReason = `Historical MSQ accuracy is ${MSQ.accuracy}%. Targeted multi-select elimination will capture full marks.`;
        } else {
          weakestReason = `Historical MCQ accuracy is ${MCQ.accuracy}%. Strengthen conceptual clarity to minimize wrong guesses.`;
        }
      }
    }

    return {
      MCQ,
      MSQ,
      NAT,
      weakest,
      weakestReason
    };
  }, [cbtOnlyAttempts, allQuestionsPool]);

  // ==========================================
  // 2. DEDICATED PRACTICE HUB ANALYTICS PIPELINE (ISOLATED)
  // ==========================================
  const practiceList = useMemo(() => {
    return Object.entries(practiceProgress || {}).map(([qid, p]) => {
      const matchQ = allQuestionsPool.find(q => String(q.id) === String(qid) || String(q.qnum) === String(qid));
      return {
        qid,
        ...p,
        section: p.section || matchQ?.section || 'General Aptitude',
        topic: p.topic || matchQ?.topic || 'General Topic',
        subtopic: p.subtopic || matchQ?.subtopic || 'General Subtopic',
        type: (p.type || matchQ?.type || 'MCQ').toUpperCase().trim(),
        marks: Number(p.marks || matchQ?.marks || 1),
        marksAwarded: Number(p.marksAwarded !== undefined ? p.marksAwarded : (p.isCorrect ? (matchQ?.marks || 1) : 0)),
        timeSpentSeconds: Number(p.timeSpentSeconds || 0),
        hintLevelUsed: Number(p.hintLevelUsed || 0),
        lastAttemptedAt: p.lastAttemptedAt || new Date().toISOString()
      };
    }).filter(item => item && (item.attempted || item.lastAttemptedAt));
  }, [practiceProgress, allQuestionsPool]);

  const totalPracticed = practiceList.length;
  const totalPracticeCorrect = practiceList.filter(p => p.isCorrect).length;
  const totalPracticeIncorrect = practiceList.filter(p => !p.isCorrect).length;
  const practiceAccuracy = totalPracticed > 0 ? ((totalPracticeCorrect / totalPracticed) * 100).toFixed(1) : '0.0';
  const totalPracticeMarksGained = practiceList.reduce((acc, p) => acc + (p.marksAwarded || 0), 0).toFixed(2);
  const totalPracticeTimeSec = practiceList.reduce((acc, p) => acc + (p.timeSpentSeconds || 0), 0);
  const avgPracticeTimePerQ = totalPracticed > 0 ? Math.round(totalPracticeTimeSec / totalPracticed) : 0;
  const practiceHintsCount = practiceList.filter(p => (p.hintLevelUsed > 0 || p.peeked)).length;
  const practiceIndependenceRate = totalPracticed > 0 ? (((totalPracticed - practiceHintsCount) / totalPracticed) * 100).toFixed(1) : '100.0';

  const practiceSectionStats = useMemo(() => {
    return SYLLABUS_SECTIONS.map(secName => {
      const normSec = normalizeSectionTitle(secName);
      const items = practiceList.filter(p => normalizeSectionTitle(p.section) === normSec);
      const attempted = items.length;
      const correct = items.filter(p => p.isCorrect).length;
      const incorrect = attempted - correct;
      const accuracy = attempted > 0 ? ((correct / attempted) * 100).toFixed(1) : '0.0';
      const marks = items.reduce((acc, p) => acc + (p.marksAwarded || 0), 0);
      const totalTime = items.reduce((acc, p) => acc + (p.timeSpentSeconds || 0), 0);
      const avgTime = attempted > 0 ? Math.round(totalTime / attempted) : 0;
      return {
        section: secName,
        attempted,
        correct,
        incorrect,
        accuracy: Number(accuracy),
        marks: Number(marks.toFixed(2)),
        avgTime
      };
    });
  }, [practiceList]);

  const practiceFormatStats = useMemo(() => {
    const types = ['MCQ', 'MSQ', 'NAT'];
    const stats = {};
    types.forEach(t => {
      const items = practiceList.filter(p => {
        const rawT = (p.type || '').toUpperCase();
        return t === 'MSQ' ? rawT.includes('MSQ') : t === 'NAT' ? rawT.includes('NAT') : (!rawT.includes('MSQ') && !rawT.includes('NAT'));
      });
      const attempted = items.length;
      const correct = items.filter(p => p.isCorrect).length;
      const incorrect = attempted - correct;
      const accuracy = attempted > 0 ? ((correct / attempted) * 100).toFixed(1) : '0.0';
      const marks = items.reduce((acc, p) => acc + (p.marksAwarded || 0), 0);
      stats[t] = {
        type: t,
        attempted,
        correct,
        incorrect,
        accuracy: Number(accuracy),
        marks: Number(marks.toFixed(2))
      };
    });
    return stats;
  }, [practiceList]);

  // Practice batches grouped by date / session
  const practiceSessions = useMemo(() => {
    const dateGroups = {};
    practiceList.forEach(p => {
      const d = p.lastAttemptedAt ? new Date(p.lastAttemptedAt).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }) : 'Recent Practice';
      if (!dateGroups[d]) {
        dateGroups[d] = {
          date: d,
          items: [],
          lastTimestamp: p.lastAttemptedAt
        };
      }
      dateGroups[d].items.push(p);
      if (new Date(p.lastAttemptedAt) > new Date(dateGroups[d].lastTimestamp)) {
        dateGroups[d].lastTimestamp = p.lastAttemptedAt;
      }
    });

    return Object.values(dateGroups).map((grp, idx) => {
      const items = grp.items;
      const totalQ = items.length;
      const correct = items.filter(i => i.isCorrect).length;
      const incorrect = totalQ - correct;
      const score = items.reduce((acc, i) => acc + (i.marksAwarded || 0), 0);
      const totalMarks = items.reduce((acc, i) => acc + (i.marks || 1), 0);
      const accuracy = totalQ > 0 ? ((correct / totalQ) * 100).toFixed(1) : '0.0';
      const totalTime = items.reduce((acc, i) => acc + (i.timeSpentSeconds || 0), 0);

      const syntheticAttempt = {
        client_attempt_id: `practice_batch_${idx}_${grp.date}`,
        test_type: 'practice_session',
        paper_title: `Practice Hub Session (${grp.date})`,
        score: Number(score.toFixed(2)),
        total_marks: totalMarks,
        total_questions: totalQ,
        correct_count: correct,
        incorrect_count: incorrect,
        unattempted_count: 0,
        accuracy_percentage: accuracy,
        time_spent_seconds: totalTime,
        submitted_at: grp.lastTimestamp,
        question_responses: items.map(p => ({
          question_id: p.qid,
          qId: p.qid,
          section: p.section,
          topic: p.topic,
          type: p.type,
          user_answer: p.userAnswer,
          is_attempted: true,
          is_correct: p.isCorrect,
          marks: p.marks,
          marks_awarded: p.marksAwarded,
          time_spent_seconds: p.timeSpentSeconds
        }))
      };

      return {
        date: grp.date,
        totalQ,
        correct,
        incorrect,
        score: score.toFixed(2),
        totalMarks,
        accuracy,
        totalTime,
        syntheticAttempt
      };
    }).sort((a, b) => new Date(b.syntheticAttempt.submitted_at) - new Date(a.syntheticAttempt.submitted_at));
  }, [practiceList]);

  // Synthetic practice attempt for AI Diagnostic Radar
  const syntheticPracticeAttempt = useMemo(() => {
    if (practiceList.length === 0) return null;
    return {
      id: 'synthetic_practice_session',
      test_type: 'practice_session',
      paper_title: 'Practice Hub Session',
      score: Number(totalPracticeMarksGained),
      total_marks: practiceList.reduce((acc, p) => acc + (p.marks || 1), 0),
      total_questions: totalPracticed,
      correct_count: totalPracticeCorrect,
      incorrect_count: totalPracticeIncorrect,
      unattempted_count: 0,
      accuracy_percentage: practiceAccuracy,
      time_spent_seconds: totalPracticeTimeSec,
      submitted_at: practiceList[0]?.lastAttemptedAt || new Date().toISOString(),
      answers: Object.fromEntries(practiceList.map(p => [p.qid, p.userAnswer ?? 'solved'])),
      questionStates: Object.fromEntries(practiceList.map(p => [p.qid, 'ANSWERED'])),
      timeSpentPerQuestion: Object.fromEntries(practiceList.map(p => [p.qid, p.timeSpentSeconds || 45])),
      correctQuestionIds: practiceList.filter(p => p.isCorrect).map(p => p.qid),
      question_responses: practiceList.map(p => ({
        question_id: p.qid,
        qId: p.qid,
        section: p.section,
        topic: p.topic,
        type: p.type,
        user_answer: p.userAnswer,
        is_attempted: true,
        is_correct: p.isCorrect,
        marks: p.marks,
        marks_awarded: p.marksAwarded,
        time_spent_seconds: p.timeSpentSeconds
      }))
    };
  }, [practiceList, totalPracticeMarksGained, totalPracticed, totalPracticeCorrect, totalPracticeIncorrect, practiceAccuracy, totalPracticeTimeSec]);

  // Dynamic attempts for radar based on selected scope
  const radarAttempts = useMemo(() => {
    if (analyticsScope === 'cbt') {
      return cbtOnlyAttempts;
    }
    if (analyticsScope === 'practice') {
      return syntheticPracticeAttempt ? [syntheticPracticeAttempt] : [];
    }
    return syntheticPracticeAttempt ? [...cbtOnlyAttempts, syntheticPracticeAttempt] : cbtOnlyAttempts;
  }, [analyticsScope, cbtOnlyAttempts, syntheticPracticeAttempt]);

  // Comparative metrics across both modes for Combined Diagnostics
  const comparativeSectionStats = useMemo(() => {
    return SYLLABUS_SECTIONS.map(secName => {
      const cbtSec = sectionStats.find(s => s.section === secName) || { attempted: 0, correct: 0, accuracy: 0 };
      const pracSec = practiceSectionStats.find(s => s.section === secName) || { attempted: 0, correct: 0, accuracy: 0 };

      let diagnosis = 'Unattempted in both modes';
      let statusColor = 'text-slate-500 bg-slate-100 dark:bg-slate-800';

      if (cbtSec.attempted === 0 && pracSec.attempted === 0) {
        diagnosis = 'No practice or test records recorded yet';
      } else if (pracSec.attempted >= 3 && cbtSec.attempted >= 3) {
        if (pracSec.accuracy >= 70 && cbtSec.accuracy < 55) {
          diagnosis = '⚠️ Exam Execution Gap: Strong in practice, but conceding marks under timed mock exam pressure.';
          statusColor = 'text-amber-600 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-900';
        } else if (pracSec.accuracy >= 65 && cbtSec.accuracy >= 65) {
          diagnosis = '🏆 Solid Mastery: Consistent high performance across both practice and exam environments.';
          statusColor = 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-900';
        } else if (pracSec.accuracy < 50 && cbtSec.accuracy < 50) {
          diagnosis = '🚨 Critical Knowledge Gap: Needs fundamental theory revision and formula practice.';
          statusColor = 'text-rose-600 bg-rose-50 dark:bg-rose-950 border border-rose-200 dark:border-rose-900';
        } else {
          diagnosis = '📈 Developing: Continue practice drills to solidify exam execution.';
          statusColor = 'text-blue-600 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900';
        }
      } else if (pracSec.attempted > 0 && cbtSec.attempted === 0) {
        diagnosis = `💡 Practiced ${pracSec.attempted} questions (${pracSec.accuracy}% acc); take a CBT Mock to test exam execution.`;
        statusColor = 'text-purple-600 bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-900';
      } else if (cbtSec.attempted > 0 && pracSec.attempted === 0) {
        diagnosis = `🎯 Tested in mock (${cbtSec.accuracy}% acc); solve topic practice questions to reinforce concepts.`;
        statusColor = 'text-blue-600 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900';
      }

      return {
        section: secName,
        cbtAttempted: cbtSec.attempted,
        cbtAccuracy: cbtSec.accuracy,
        practiceAttempted: pracSec.attempted,
        practiceAccuracy: pracSec.accuracy,
        diagnosis,
        statusColor
      };
    });
  }, [sectionStats, practiceSectionStats]);

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

        {/* Analytics Scope Switcher (CBT vs Practice vs Combined) */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setAnalyticsScope('cbt')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                analyticsScope === 'cbt'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>CBT Mock Exams &amp; PYQs ({totalTests})</span>
            </button>

            <button
              type="button"
              onClick={() => setAnalyticsScope('practice')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                analyticsScope === 'practice'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Practice Hub Drills ({totalPracticed} Solved)</span>
            </button>

            <button
              type="button"
              onClick={() => setAnalyticsScope('combined')}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                analyticsScope === 'combined'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Combined Diagnostic Matrix</span>
            </button>
          </div>

          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            {analyticsScope === 'cbt' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                Pure CBT Exam Isolation: 100M Scale &amp; Negative Penalty Intact
              </span>
            )}
            {analyticsScope === 'practice' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                Untimed Modular Drills: Conceptual Accuracy &amp; Independence
              </span>
            )}
            {analyticsScope === 'combined' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/60">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                Unified Syllabus Matrix: Test Stress vs Practice Performance
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Render AI Diagnostic Radar Subtab */}
      {activeSubTab === 'radar' && (
        <AIDiagnosticRadarHub 
          questions={questions}
          customMockPapers={customMockPapers}
          testAttempts={radarAttempts}
          onStartCustomTest={onStartCustomTest}
          onOpenCalc={onOpenCalc}
        />
      )}

      {/* Render Overview & Trends Subtab */}
      {activeSubTab === 'overview' && (
        <>
          {analyticsScope === 'cbt' && (
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

      {/* Question-Type Strategy & Score Leak Analyzer (MCQ vs MSQ vs NAT) */}
      <div className="card-3d rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                Question-Type Strategy &amp; Score Leak Analyzer
              </h2>
              <p className="text-[11px] text-slate-400 font-medium">
                Longitudinal strike rates, penalty mark bleed (MCQ), and zero-penalty opportunities (MSQ &amp; NAT)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-bold">
              3 Format Categories
            </span>
          </div>
        </div>

        {/* 3 Interactive Strategy Cards: MCQ vs MSQ vs NAT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          
          {/* MCQ Card */}
          <div className={`p-4 rounded-2xl border transition space-y-3 ${
            questionTypeStats.MCQ.penaltyLost > 0
              ? 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/50'
              : 'bg-slate-50/70 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                Multiple Choice (MCQ)
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                {questionTypeStats.MCQ.attempted}/{questionTypeStats.MCQ.total} Attempted
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 text-center py-2 px-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/80">
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Accuracy</span>
                <span className={`text-xs font-extrabold font-mono ${
                  questionTypeStats.MCQ.accuracy >= 70 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
                }`}>
                  {questionTypeStats.MCQ.accuracy}%
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Penalty Lost</span>
                <span className="text-xs font-extrabold font-mono text-rose-600 dark:text-rose-400">
                  {questionTypeStats.MCQ.penaltyLost > 0 ? `-${questionTypeStats.MCQ.penaltyLost}` : '0.00'}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Net Score</span>
                <span className="text-xs font-extrabold font-mono text-slate-900 dark:text-white">
                  +{questionTypeStats.MCQ.netMarks}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Avg Time: {questionTypeStats.MCQ.avgTime}s / Q</span>
              <span className="text-[10px] text-rose-500 font-bold">
                {questionTypeStats.MCQ.incorrect} Negative Errors
              </span>
            </div>

            {onStartTypeDrill && (
              <button
                type="button"
                onClick={() => onStartTypeDrill('MCQ', 20)}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-bold text-xs transition shadow-xs cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Launch MCQ Drill (20 Qs)</span>
              </button>
            )}
          </div>

          {/* MSQ Card */}
          <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                Multiple Select (MSQ)
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                {questionTypeStats.MSQ.attempted}/{questionTypeStats.MSQ.total} Attempted
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 text-center py-2 px-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/80">
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Match Rate</span>
                <span className={`text-xs font-extrabold font-mono ${
                  questionTypeStats.MSQ.accuracy >= 60 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
                }`}>
                  {questionTypeStats.MSQ.accuracy}%
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Penalty Risk</span>
                <span className="text-xs font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
                  0.00 (Zero)
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Net Score</span>
                <span className="text-xs font-extrabold font-mono text-slate-900 dark:text-white">
                  +{questionTypeStats.MSQ.netMarks}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Avg Time: {questionTypeStats.MSQ.avgTime}s / Q</span>
              <span className="text-[10px] text-purple-600 dark:text-purple-400 font-bold">
                Zero Risk Format
              </span>
            </div>

            {onStartTypeDrill && (
              <button
                type="button"
                onClick={() => onStartTypeDrill('MSQ', 20)}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white font-bold text-xs transition shadow-xs cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Launch MSQ Drill (20 Qs)</span>
              </button>
            )}
          </div>

          {/* NAT Card */}
          <div className={`p-4 rounded-2xl border transition space-y-3 ${
            questionTypeStats.NAT.accuracy < 50 && questionTypeStats.NAT.attempted > 0
              ? 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50'
              : 'bg-slate-50/70 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                Numerical Answer (NAT)
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                {questionTypeStats.NAT.attempted}/{questionTypeStats.NAT.total} Attempted
              </span>
            </div>

            <div className="grid grid-cols-3 gap-1.5 text-center py-2 px-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/80">
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Calc Acc.</span>
                <span className={`text-xs font-extrabold font-mono ${
                  questionTypeStats.NAT.accuracy >= 65 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
                }`}>
                  {questionTypeStats.NAT.accuracy}%
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Penalty Risk</span>
                <span className="text-xs font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
                  0.00 (Zero)
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-medium">Net Score</span>
                <span className="text-xs font-extrabold font-mono text-slate-900 dark:text-white">
                  +{questionTypeStats.NAT.netMarks}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Avg Time: {questionTypeStats.NAT.avgTime}s / Q</span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                High-Yield Zero Risk
              </span>
            </div>

            {onStartTypeDrill && (
              <button
                type="button"
                onClick={() => onStartTypeDrill('NAT', 20)}
                className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs transition shadow-xs cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Launch NAT Drill (20 Qs)</span>
              </button>
            )}
          </div>

        </div>

        {/* Action-Focused Targeted Remediation Callout */}
        {questionTypeStats.weakest && onStartTypeDrill && (
          <div className="p-3.5 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10 dark:from-blue-950/40 dark:via-purple-950/40 dark:to-emerald-950/40 border border-blue-200/80 dark:border-blue-800/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 flex-1">
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
              <p className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                <strong className="text-blue-600 dark:text-blue-400 font-bold">Tactical Action Recommendation:</strong> {questionTypeStats.weakestReason}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onStartTypeDrill(questionTypeStats.weakest, 20)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs transition shadow-xs flex items-center justify-center gap-2 shrink-0 cursor-pointer active:scale-95"
            >
              <Target className="w-3.5 h-3.5" />
              <span>Launch {questionTypeStats.weakest} Remediation Drill (20 Qs)</span>
            </button>
          </div>
        )}
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

                <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono flex-wrap gap-1">
                  <span>Attempted: <strong>{sec.attempted} Qs</strong></span>
                  <span className="text-emerald-600 dark:text-emerald-400">Correct: {sec.correct}</span>
                  <span className="text-rose-500">Incorrect: {sec.incorrect}</span>
                  {sec.unattempted > 0 && <span className="text-slate-400">Unattempted: {sec.unattempted}</span>}
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

    {analyticsScope === 'practice' && (
      <>
        {/* Practice Hub Quick Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Modular Practice Drill Metrics (Isolated from CBT Mock Scaled Scores)
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              window.location.hash = '#practicehub';
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Go to Practice Hub</span>
          </button>
        </div>

        {/* Top 4 Practice KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="card-3d rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 space-y-1">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Questions Solved</span>
              <HelpCircle className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">{totalPracticed}</div>
            <div className="text-[10px] text-slate-400 font-medium">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">{totalPracticeCorrect} Correct</span> &bull; <span className="text-rose-500 font-bold">{totalPracticeIncorrect} Incorrect</span>
            </div>
          </div>

          <div className="card-3d rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 space-y-1">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Practice Strike Rate</span>
              <Target className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{practiceAccuracy}%</div>
            <div className="text-[10px] text-slate-400 font-medium">Target Benchmark: &ge; 70%</div>
          </div>

          <div className="card-3d rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 space-y-1">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Net Marks Yield</span>
              <Award className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-black text-blue-600 dark:text-blue-400">+{totalPracticeMarksGained}</div>
            <div className="text-[10px] text-slate-400 font-medium">Practice Question Marks Gained</div>
          </div>

          <div className="card-3d rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 space-y-1">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Speed &amp; Independence</span>
              <Clock className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-2xl font-black text-purple-600 dark:text-purple-400">{avgPracticeTimePerQ}s <span className="text-xs text-slate-400 font-normal">/ Q</span></div>
            <div className="text-[10px] text-slate-400 font-medium">
              <strong className="text-slate-700 dark:text-slate-300">{practiceIndependenceRate}%</strong> Solved Without Hints
            </div>
          </div>
        </div>

        {/* Practice Question-Type Performance Cards */}
        <div className="card-3d rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-600/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                  Practice Question Format Breakdown
                </h2>
                <p className="text-[11px] text-slate-400 font-medium">
                  Performance breakdown across Multiple Choice, Multiple Select, and Numerical questions
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {['MCQ', 'MSQ', 'NAT'].map(type => {
              const stats = practiceFormatStats[type];
              return (
                <div key={type} className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${
                        type === 'MCQ' ? 'bg-blue-500' : type === 'MSQ' ? 'bg-purple-500' : 'bg-emerald-500'
                      }`} />
                      {type === 'MCQ' ? 'Multiple Choice (MCQ)' : type === 'MSQ' ? 'Multiple Select (MSQ)' : 'Numerical Answer (NAT)'}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {stats.attempted} Solved
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 text-center py-2 px-1 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800/80">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Accuracy</span>
                      <span className={`text-xs font-extrabold font-mono ${
                        stats.accuracy >= 70 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
                      }`}>
                        {stats.accuracy}%
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Correct</span>
                      <span className="text-xs font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
                        {stats.correct}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Net Marks</span>
                      <span className="text-xs font-extrabold font-mono text-slate-900 dark:text-white">
                        +{stats.marks}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span>Avg Time: {stats.avgTime}s / Q</span>
                    <span className="text-rose-500">{stats.incorrect} Incorrect</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Practice Syllabus Section Breakdown */}
        <div className="card-3d rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                  Practice Syllabus Section Mastery
                </h2>
                <p className="text-[11px] text-slate-400 font-medium">
                  Topic-by-topic drill accuracy &amp; questions solved in Practice Hub
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {practiceSectionStats.map((sec, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-slate-900 dark:text-slate-100">{sec.section}</span>
                  <span className={`font-mono font-bold text-xs ${
                    sec.accuracy >= 70 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
                  }`}>
                    {sec.accuracy}% Accuracy
                  </span>
                </div>

                <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
                  <div 
                    className="h-full bg-amber-500 transition-all duration-500" 
                    style={{ width: `${Math.min(sec.accuracy, 100)}%` }} 
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Solved: <strong>{sec.attempted} Qs</strong></span>
                  <span className="text-emerald-600 dark:text-emerald-400">Correct: {sec.correct}</span>
                  <span className="text-rose-500">Incorrect: {sec.incorrect}</span>
                  <span className="text-blue-600 font-bold">+{sec.marks}M</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Practice Hub Sessions & Batches Table */}
        <div className="card-3d rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Practice Hub Session Activity Log
              </h2>
            </div>
            <span className="text-[11px] font-mono text-slate-400">{practiceSessions.length} Batches Logged</span>
          </div>

          {practiceSessions.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400 space-y-3">
              <BookOpen className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-700" />
              <p className="font-bold text-slate-600 dark:text-slate-300">No practice questions solved yet.</p>
              <p className="text-[11px]">Solve questions with hints and step-by-step solutions in Practice Hub!</p>
              <button
                type="button"
                onClick={() => {
                  window.location.hash = '#practicehub';
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs transition shadow-xs cursor-pointer"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Open Practice Hub Now</span>
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
                    <th className="py-3 px-3">Date</th>
                    <th className="py-3 px-3">Session / Section</th>
                    <th className="py-3 px-3">Questions</th>
                    <th className="py-3 px-3">Accuracy</th>
                    <th className="py-3 px-3">Marks Yield</th>
                    <th className="py-3 px-3">Time Spent</th>
                    <th className="py-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {practiceSessions.map((session, idx) => {
                    const minutes = Math.floor((session.timeSpentSeconds || 0) / 60);
                    const seconds = (session.timeSpentSeconds || 0) % 60;
                    return (
                      <tr
                        key={session.id || idx}
                        onClick={() => setSelectedAttemptForAnalysis(session.syntheticAttempt)}
                        className="hover:bg-slate-50 dark:hover:bg-slate-950/60 transition cursor-pointer group"
                      >
                        <td className="py-3 px-3 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                          {session.date}
                        </td>
                        <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">
                          <span className="group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">
                            {session.title}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-mono text-[11px]">
                          {session.totalQuestions} Qs &bull; <span className="text-emerald-600">{session.correct}C</span> / <span className="text-rose-500">{session.incorrect}I</span>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`font-mono font-bold px-2 py-0.5 rounded-md text-[11px] ${
                            session.accuracy >= 70
                              ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900'
                              : 'bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900'
                          }`}>
                            {session.accuracy}%
                          </span>
                        </td>
                        <td className="py-3 px-3 font-mono font-extrabold text-amber-600 dark:text-amber-400">
                          +{session.marksGained}M
                        </td>
                        <td className="py-3 px-3 font-mono text-slate-500 whitespace-nowrap">
                          {minutes}m {seconds}s
                        </td>
                        <td className="py-3 px-3 text-right whitespace-nowrap">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedAttemptForAnalysis(session.syntheticAttempt);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 active:bg-amber-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
                            title="Open interactive session scorecard"
                          >
                            <BarChart3 className="w-3.5 h-3.5" />
                            <span>View Scorecard</span>
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

    {analyticsScope === 'combined' && (
      <>
        {/* Combined High-Level Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* CBT Mock Column */}
          <div className="card-3d rounded-2xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/60 p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-500" />
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  CBT Mock Exams &amp; PYQs (Timed 180m)
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                {totalTests} Tests
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center py-2">
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950">
                <span className="text-[10px] text-slate-400 block font-medium">Average Score</span>
                <span className="text-sm font-black text-slate-900 dark:text-white font-mono">{avgScore} / 100</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950">
                <span className="text-[10px] text-slate-400 block font-medium">CBT Accuracy</span>
                <span className="text-sm font-black text-blue-600 dark:text-blue-400 font-mono">{overallAccuracy}%</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950">
                <span className="text-[10px] text-slate-400 block font-medium">Avg Speed</span>
                <span className="text-sm font-black text-slate-900 dark:text-white font-mono">{avgTimePerQSec}s</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Reflects actual exam temperament under negative marking penalties (-0.33 / -0.67) and clock pressure.
            </p>
          </div>

          {/* Practice Hub Column */}
          <div className="card-3d rounded-2xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/60 p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-500" />
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Practice Hub Drills (Modular)
                </h3>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                {totalPracticed} Solved
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center py-2">
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950">
                <span className="text-[10px] text-slate-400 block font-medium">Strike Rate</span>
                <span className="text-sm font-black text-amber-600 dark:text-amber-400 font-mono">{practiceAccuracy}%</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950">
                <span className="text-[10px] text-slate-400 block font-medium">Independence</span>
                <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 font-mono">{practiceIndependenceRate}%</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950">
                <span className="text-[10px] text-slate-400 block font-medium">Avg Speed</span>
                <span className="text-sm font-black text-slate-900 dark:text-white font-mono">{avgPracticeTimePerQ}s</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Reflects fundamental conceptual mastery during untimed study drills and problem-solving sessions.
            </p>
          </div>
        </div>

        {/* Comparative Section Performance Matrix Table */}
        <div className="card-3d rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-600/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                  Comparative Section Diagnostic Matrix
                </h2>
                <p className="text-[11px] text-slate-400 font-medium">
                  Side-by-side disparity analysis: reveals whether score gaps stem from conceptual weakness or exam-stress penalty bleed
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveSubTab('radar')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition shadow-xs cursor-pointer self-start sm:self-auto"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Launch AI Radar Diagnostic</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
                  <th className="py-3 px-3">Syllabus Section</th>
                  <th className="py-3 px-3">Practice Drill Acc.</th>
                  <th className="py-3 px-3">CBT Exam Acc.</th>
                  <th className="py-3 px-3">Disparity (CBT - Practice)</th>
                  <th className="py-3 px-3">AI Diagnostic Valuation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {comparativeSectionStats.map((row, idx) => {
                  const diff = (row.cbtAttempted > 0 && row.practiceAttempted > 0) ? (row.cbtAccuracy - row.practiceAccuracy) : null;
                  
                  let diagnosisBadge = { label: 'Untested', color: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400', desc: 'Attempt questions in both modes for full valuation.' };
                  if (row.cbtAttempted === 0 && row.practiceAttempted > 0) {
                    diagnosisBadge = { label: 'Untested in CBT', color: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300', desc: 'Strong practice baseline; attempt full mock tests to validate under exam stress.' };
                  } else if (row.cbtAttempted > 0 && row.practiceAttempted === 0) {
                    diagnosisBadge = { label: 'Untested in Practice', color: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300', desc: 'Tested in exam; solve modular drills to cement concepts.' };
                  } else if (row.cbtAccuracy < 50 && row.practiceAccuracy >= 65) {
                    diagnosisBadge = { label: 'Time-Pressure Deficit', color: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300', desc: 'Concept is understood in untimed drills, but accuracy drops under exam clock speed.' };
                  } else if (row.cbtAccuracy < 50 && row.practiceAccuracy < 50) {
                    diagnosisBadge = { label: 'Foundational Gap', color: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300', desc: 'Needs revision of core formulas and solved examples in both modes.' };
                  } else if (row.cbtAccuracy >= 65 && row.practiceAccuracy >= 65) {
                    diagnosisBadge = { label: 'Consistent Mastery', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300', desc: 'Solid performance across both modular drills and full-length CBT papers.' };
                  } else {
                    diagnosisBadge = { label: 'Moderate Stability', color: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300', desc: 'Steady performance; maintain practice to reach top percentile tier.' };
                  }

                  return (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-950/60 transition">
                      <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">
                        {row.section}
                      </td>
                      <td className="py-3 px-3 font-mono">
                        {row.practiceAttempted > 0 ? (
                          <span className="font-bold text-amber-600 dark:text-amber-400">
                            {row.practiceAccuracy}% <span className="text-[10px] text-slate-400">({row.practiceAttempted} Qs)</span>
                          </span>
                        ) : (
                          <span className="text-slate-400 italic">No drills</span>
                        )}
                      </td>
                      <td className="py-3 px-3 font-mono">
                        {row.cbtAttempted > 0 ? (
                          <span className="font-bold text-blue-600 dark:text-blue-400">
                            {row.cbtAccuracy}% <span className="text-[10px] text-slate-400">({row.cbtAttempted} Qs)</span>
                          </span>
                        ) : (
                          <span className="text-slate-400 italic">No tests</span>
                        )}
                      </td>
                      <td className="py-3 px-3 font-mono font-bold">
                        {diff !== null ? (
                          <span className={diff >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'}>
                            {diff > 0 ? `+${diff}%` : `${diff}%`}
                          </span>
                        ) : (
                          <span className="text-slate-400">&mdash;</span>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        <div className="space-y-1">
                          <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider ${diagnosisBadge.color}`}>
                            {diagnosisBadge.label}
                          </span>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                            {diagnosisBadge.desc}
                          </p>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </>
    )}
  </>
)}

    {/* Interactive Scorecard & Review Modals for Past Attempts */}
    {selectedAttemptForAnalysis && selectedAttemptForAnalysis.test_type === 'practice_session' && (
      <div className="fixed inset-0 z-[120] bg-slate-950/85 backdrop-blur-md overflow-y-auto p-4 sm:p-8 animate-in fade-in duration-150">
        <div className="max-w-6xl mx-auto my-auto py-4">
          <PracticeAnalysisView
            sessionResult={formatAttemptForPracticeAnalysis(selectedAttemptForAnalysis, allQuestionsPool)}
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
        result={formatAttemptForResultModal(selectedAttemptForAnalysis, allQuestionsPool)}
        onClose={() => setSelectedAttemptForAnalysis(null)}
        onStartTypeDrill={(type, count) => {
          setSelectedAttemptForAnalysis(null);
          if (onStartTypeDrill) onStartTypeDrill(type, count);
        }}
        onRetake={() => {
          setSelectedAttemptForAnalysis(null);
          if (onStartCustomTest) onStartCustomTest();
        }}
      />
    )}
  </div>
  );
}
