import React, { useState, useEffect, useMemo } from 'react';
import { 
  Filter, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Bookmark, 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  RotateCcw,
  Calculator,
  Sparkles,
  BookOpen,
  Layers,
  GraduationCap,
  Image as ImageIcon,
  FileText,
  Clock,
  Play,
  ArrowLeft,
  Shuffle,
  Edit3,
  Printer,
  CheckSquare,
  Square,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  Plus,
  Minus,
  Grid,
  BarChart3,
  X
} from 'lucide-react';
import MathRenderer from './MathRenderer';
import { evaluateQuestion } from '../utils/scoring.js';
import { exportQuestionsToPdf } from '../services/questionPdfExportService.js';
import AITutorModal from './AITutorModal';
import PracticeAnalysisView from './PracticeAnalysisView';
import { GATE_AG_SYLLABUS } from '../data/syllabus';
import { detectNATUnitMismatch } from '../utils/hintGenerator';
import { getOfficialSections, getOfficialTopicsForSection, getOfficialSubtopicsForTopic, normalizeSectionTitle } from '../utils/syllabusTaxonomy.js';
import { getSectionHierarchyStats, buildPracticeSessionPool } from '../utils/practiceSessionBuilder.js';
import { saveTestAttempt, generateUUID, getStudentTestAttempts } from '../services/testAttemptService.js';
import { recordQuestionOutcomes } from '../services/mistakeVaultService.js';

const SECTION_NORM_MAP = {
  'farm power and machinery': 'Section 2: Farm Machinery',
  'farm machinery & power': 'Section 2: Farm Machinery',
  'farm machinery and power': 'Section 2: Farm Machinery',
  'farm machinery': 'Section 2: Farm Machinery',
  'farm power': 'Section 3: Farm Power',
  'soil and water conservation engineering': 'Section 4: Soil and Water Conservation Engineering',
  'soil & water conservation engineering': 'Section 4: Soil and Water Conservation Engineering',
  'irrigation and drainage engineering': 'Section 5: Irrigation and Drainage Engineering',
  'irrigation & drainage': 'Section 5: Irrigation and Drainage Engineering',
  'agricultural process engineering': 'Section 6: Agricultural Process Engineering',
  'agricultural processing engineering': 'Section 6: Agricultural Process Engineering',
  'agricultural processing': 'Section 6: Agricultural Process Engineering',
  'agricultural process': 'Section 6: Agricultural Process Engineering',
  'dairy and food engineering': 'Section 7: Dairy and Food Engineering',
  'dairy & food': 'Section 7: Dairy and Food Engineering',
  'dairy and food': 'Section 7: Dairy and Food Engineering',
  'engineering mathematics': 'Section 1: Engineering Mathematics',
  'general aptitude': 'Section 8: General Aptitude'
};

const normSec = (s) => {
  if (!s || s === 'All') return 'All';
  const low = s.toLowerCase().trim();
  for (const [k, v] of Object.entries(SECTION_NORM_MAP)) {
    if (low.includes(k)) return v;
  }
  return normalizeSectionTitle(s);
};

const formatSec = (secs) => {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

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
  onClearMistakeFilter
}) {
  // Always default isHubActive to true so user can configure sections/topics before starting
  const [isHubActive, setIsHubActive] = useState(() => !(Array.isArray(mistakeFilterIds) && mistakeFilterIds.length > 0));

  // Global filters on launchpad & in-session
  const [sourceFilter, setSourceFilter] = useState('All'); // 'All' | 'Official GATE PYQs' | 'Custom Mock Questions'
  const [selectedType, setSelectedType] = useState('All'); // 'All' | 'MCQ' | 'MSQ' | 'NAT'
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedMarks, setSelectedMarks] = useState('All');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All');
  const [activeSolutionTab, setActiveSolutionTab] = useState('solution'); // 'solution' | 'notes'
  const [showPaletteDrawer, setShowPaletteDrawer] = useState(false);

  // Multi-Section & Topic Selector States
  const [selectedSections, setSelectedSections] = useState(() => {
    if (initialSection && initialSection !== 'All') {
      return { [normSec(initialSection)]: true };
    }
    const init = {};
    GATE_AG_SYLLABUS.forEach(sec => {
      init[normalizeSectionTitle(sec.title)] = true;
    });
    return init;
  });

  const [sectionAllocations, setSectionAllocations] = useState(() => {
    const allocs = {};
    GATE_AG_SYLLABUS.forEach(sec => {
      allocs[normalizeSectionTitle(sec.title)] = 5; // default 5 Qs per section
    });
    return allocs;
  });

  const [selectedTopicsMap, setSelectedTopicsMap] = useState({});
  const [expandedSections, setExpandedSections] = useState({});

  // Active question pool generated for the current practice session
  const [activePracticePool, setActivePracticePool] = useState([]);

  // Per-question timer accumulator { [qId]: elapsedSeconds }
  const [questionTimes, setQuestionTimes] = useState({});

  // Clock & Session Timers
  const [realTimeStr, setRealTimeStr] = useState(() => new Date().toLocaleTimeString());
  const [sessionElapsedSec, setSessionElapsedSec] = useState(0);

  // Personal question notes stored in localStorage
  const [questionNotes, setQuestionNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('gate_ag_question_notes');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const handleSaveNote = (qId, noteText) => {
    const updated = { ...questionNotes, [qId]: noteText };
    setQuestionNotes(updated);
    try {
      localStorage.setItem('gate_ag_question_notes', JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save note", e);
    }
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [submittedState, setSubmittedState] = useState({});
  const [showSolution, setShowSolution] = useState({});
  const [activeAITutorQuestion, setActiveAITutorQuestion] = useState(null);
  const [natUnitWarning, setNatUnitWarning] = useState(null);
  const [sessionAnalysis, setSessionAnalysis] = useState(null);
  const [showSubmitConfirmModal, setShowSubmitConfirmModal] = useState(false);
  const [showPastHistoryModal, setShowPastHistoryModal] = useState(false);
  const [pastPracticeAttempts, setPastPracticeAttempts] = useState([]);
  const [loadingPastHistory, setLoadingPastHistory] = useState(false);

  const loadPastPracticeAttempts = async () => {
    setLoadingPastHistory(true);
    try {
      const studentId = currentStudent?.admission_no || currentStudent?.email || currentStudent?.full_name || 'guest';
      const allAttempts = await getStudentTestAttempts(studentId);
      const practiceOnly = (allAttempts || []).filter(a => a.test_type === 'practice_session');
      setPastPracticeAttempts(practiceOnly);
    } catch (e) {
      console.warn('Error loading past practice attempts:', e);
    } finally {
      setLoadingPastHistory(false);
    }
  };

  useEffect(() => {
    if (showPastHistoryModal) {
      loadPastPracticeAttempts();
    }
  }, [showPastHistoryModal, currentStudent]);

  const handleOpenPastAttemptAnalysis = (att) => {
    const responses = Array.isArray(att.question_responses) ? att.question_responses : [];
    const evaluations = responses.map((r, idx) => {
      const matched = questions.find(q => q.id === r.question_id || q.id === r.qId) || {};
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
    evaluations.forEach(e => {
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

    const result = {
      totalQuestions: Number(att.total_questions || evaluations.length),
      attemptedCount: (att.correct_count || 0) + (att.incorrect_count || 0),
      unattemptedCount: Number(att.unattempted_count || 0),
      correctCount: Number(att.correct_count || 0),
      incorrectCount: Number(att.incorrect_count || 0),
      score: Number(att.score || 0),
      totalPossibleMarks: Number(att.total_marks || evaluations.length),
      accuracy: Number(att.accuracy_percentage || 0),
      totalTimeSec: Number(att.time_spent_seconds || 0),
      avgTimeSec: evaluations.length > 0 ? Math.round((att.time_spent_seconds || 0) / evaluations.length) : 0,
      questionEvaluations: evaluations,
      sectionStats,
      timestamp: att.submitted_at ? new Date(att.submitted_at).toLocaleTimeString() : new Date().toLocaleTimeString()
    };

    setSessionAnalysis(result);
    setIsHubActive(false);
    setShowPastHistoryModal(false);
  };

  // Update real-time clock and session timer (only ticks when actively practicing)
  useEffect(() => {
    const clockInterval = setInterval(() => {
      setRealTimeStr(new Date().toLocaleTimeString());
      if (!isHubActive) {
        setSessionElapsedSec(prev => prev + 1);
      }
    }, 1000);
    return () => clearInterval(clockInterval);
  }, [isHubActive]);

  // Sync initialSection prop if passed externally
  useEffect(() => {
    if (initialSection && initialSection !== 'All') {
      const normalized = normSec(initialSection);
      setSelectedSections({ [normalized]: true });
      setIsHubActive(true); // Always keep on selector so user can pick count
    }
  }, [initialSection]);

  // Build combined pool of official questions and custom mock papers
  const customQuestionsPool = useMemo(() => {
    return (customMockPapers || []).flatMap(paper => 
      (paper.questions || []).map(q => ({
        ...q,
        sourceTitle: paper.title,
        isCustomUploaded: true
      }))
    );
  }, [customMockPapers]);

  const combinedPool = useMemo(() => {
    return [
      ...questions.map(q => ({ ...q, isCustomUploaded: false, sourceTitle: 'Official GATE PYQ' })),
      ...customQuestionsPool
    ];
  }, [questions, customQuestionsPool]);

  // Handle mistakeFilterIds if passed from Revision Bank / Mistake Vault
  useEffect(() => {
    if (Array.isArray(mistakeFilterIds) && mistakeFilterIds.length > 0 && combinedPool.length > 0) {
      const mistakePool = combinedPool.filter(q => mistakeFilterIds.includes(q.id));
      if (mistakePool.length > 0) {
        setActivePracticePool(mistakePool);
        setCurrentIndex(0);
        setIsHubActive(false);
      }
    }
  }, [mistakeFilterIds, combinedPool]);

  const yearsInPool = useMemo(() => {
    return ['All', ...new Set(combinedPool.map(q => q.year))].sort().reverse();
  }, [combinedPool]);

  // Hierarchical stats for all sections and topics
  const hierarchyStats = useMemo(() => {
    return getSectionHierarchyStats(combinedPool, {
      sourceFilter,
      selectedType,
      selectedMarks,
      selectedYear
    });
  }, [combinedPool, sourceFilter, selectedType, selectedMarks, selectedYear]);

  // Summary calculation of currently selected questions across all sections
  const selectedSummary = useMemo(() => {
    return hierarchyStats
      .filter(s => selectedSections[s.canonTitle])
      .map(s => {
        const alloc = sectionAllocations[s.canonTitle];
        let topicFilteredCount = s.totalAvailable;
        const topicSel = selectedTopicsMap[s.canonTitle];
        if (topicSel && Object.values(topicSel).some(Boolean)) {
          topicFilteredCount = s.topics
            .filter(t => topicSel[t.topic_name])
            .reduce((sum, t) => sum + t.availableCount, 0);
        }
        const count = (alloc === 'ALL' || alloc === undefined) 
          ? topicFilteredCount 
          : Math.min(Number(alloc), topicFilteredCount);
        return {
          code: s.code,
          canonTitle: s.canonTitle,
          count: Math.max(0, count),
          totalAvailable: s.totalAvailable
        };
      });
  }, [hierarchyStats, selectedSections, sectionAllocations, selectedTopicsMap]);

  const totalSelectedCount = useMemo(() => {
    return selectedSummary.reduce((sum, item) => sum + item.count, 0);
  }, [selectedSummary]);

  // Active question pool in practice mode (with in-session status filters applied)
  const filteredQuestions = useMemo(() => {
    const baseList = activePracticePool.length > 0 ? activePracticePool : combinedPool;
    return baseList.filter(q => {
      // In-session status filters
      if (selectedStatusFilter === 'Bookmarked') return bookmarks.includes(q.id);
      if (selectedStatusFilter === 'Unattempted') return !submittedState[q.id]?.isSubmitted;
      if (selectedStatusFilter === 'Correct') return submittedState[q.id]?.isCorrect === true;
      if (selectedStatusFilter === 'Incorrect') return submittedState[q.id]?.isSubmitted && !submittedState[q.id]?.isCorrect;
      return true;
    });
  }, [activePracticePool, combinedPool, selectedStatusFilter, bookmarks, submittedState]);

  const currentQ = filteredQuestions[currentIndex];

  const answeredCount = useMemo(() => {
    return Object.keys(userAnswers).filter(k => userAnswers[k] !== undefined && userAnswers[k] !== '').length;
  }, [userAnswers]);

  // Per-Question Active Timer Effect: Preserves and increments questionTimes[currentQ.id]
  useEffect(() => {
    if (!currentQ?.id || isHubActive) return;
    const qTimer = setInterval(() => {
      setQuestionTimes(prev => ({
        ...prev,
        [currentQ.id]: (prev[currentQ.id] || 0) + 1
      }));
    }, 1000);
    return () => clearInterval(qTimer);
  }, [currentQ?.id, isHubActive]);

  // Section & Topic Selection Handlers
  const toggleSection = (canonTitle) => {
    setSelectedSections(prev => ({
      ...prev,
      [canonTitle]: !prev[canonTitle]
    }));
  };

  const toggleTopic = (canonTitle, topicName) => {
    setSelectedTopicsMap(prev => {
      const currentSecTopics = prev[canonTitle] || {};
      return {
        ...prev,
        [canonTitle]: {
          ...currentSecTopics,
          [topicName]: !currentSecTopics[topicName]
        }
      };
    });
  };

  const setSectionCount = (canonTitle, count) => {
    setSectionAllocations(prev => ({
      ...prev,
      [canonTitle]: count
    }));
  };

  const toggleExpandSection = (secId) => {
    setExpandedSections(prev => ({
      ...prev,
      [secId]: !prev[secId]
    }));
  };

  // Quick Presets
  const applyPreset = (presetType) => {
    const newSections = {};
    const newAllocations = {};
    GATE_AG_SYLLABUS.forEach(sec => {
      const canon = normalizeSectionTitle(sec.title);
      newSections[canon] = true;
      if (presetType === 'quick10') {
        newAllocations[canon] = 1; // 8 * 1 + 2 = ~10
      } else if (presetType === 'sprint25') {
        newAllocations[canon] = 3; // 8 * 3 = 24 ~ 25
      } else if (presetType === 'comprehensive50') {
        newAllocations[canon] = 6;
      } else if (presetType === 'all') {
        newAllocations[canon] = 'ALL';
      }
    });

    if (presetType === 'quick10') {
      newAllocations['Section 1: Engineering Mathematics'] = 2;
      newAllocations['Section 8: General Aptitude'] = 2;
    } else if (presetType === 'sprint25') {
      newAllocations['Section 1: Engineering Mathematics'] = 4;
    }

    setSelectedSections(newSections);
    setSectionAllocations(newAllocations);
    setSelectedTopicsMap({});
  };

  const selectAllSections = () => {
    const newSections = {};
    GATE_AG_SYLLABUS.forEach(sec => {
      newSections[normalizeSectionTitle(sec.title)] = true;
    });
    setSelectedSections(newSections);
  };

  const deselectAllSections = () => {
    setSelectedSections({});
  };

  // Launch Active Practice Session
  const handleStartPracticeSession = () => {
    const result = buildPracticeSessionPool({
      combinedPool,
      selectedSections,
      selectedTopicsMap,
      sectionAllocations,
      filters: {
        sourceFilter,
        selectedType,
        selectedMarks,
        selectedYear
      }
    });

    if (result.totalQuestions === 0) {
      alert("No questions matched your selection. Please select at least one section or topic with available questions.");
      return;
    }

    setActivePracticePool(result.questions);
    setCurrentIndex(0);
    setIsHubActive(false);
  };

  // Quick practice for a single section directly
  const handleLaunchSingleSection = (canonTitle) => {
    const singleSectionMap = { [canonTitle]: true };
    const singleAlloc = { [canonTitle]: 10 };
    const result = buildPracticeSessionPool({
      combinedPool,
      selectedSections: singleSectionMap,
      selectedTopicsMap: {},
      sectionAllocations: singleAlloc,
      filters: {
        sourceFilter,
        selectedType,
        selectedMarks,
        selectedYear
      }
    });
    if (result.totalQuestions > 0) {
      setSelectedSections(singleSectionMap);
      setSectionAllocations(singleAlloc);
      setActivePracticePool(result.questions);
      setCurrentIndex(0);
      setIsHubActive(false);
    }
  };

  // Question Interaction Handlers
  const handleSelectMcq = (qId, optionKey) => {
    if (submittedState[qId]?.isSubmitted) return;
    setUserAnswers({ ...userAnswers, [qId]: optionKey });
  };

  const handleToggleMsq = (qId, optionKey) => {
    if (submittedState[qId]?.isSubmitted) return;
    const currentList = userAnswers[qId] ? userAnswers[qId].split(',').filter(Boolean) : [];
    let updated;
    if (currentList.includes(optionKey)) {
      updated = currentList.filter(k => k !== optionKey);
    } else {
      updated = [...currentList, optionKey];
    }
    updated.sort();
    setUserAnswers({ ...userAnswers, [qId]: updated.join(',') });
  };

  const handleNatInput = (qId, val) => {
    if (submittedState[qId]?.isSubmitted) return;
    setUserAnswers({ ...userAnswers, [qId]: val });
  };

  const handleSubmitAnswer = (qId) => {
    if (!currentStudent && onRequireAuth) {
      onRequireAuth("Sign In or Register free to submit practice answers, view step-by-step solutions, and record accuracy stats!");
      return;
    }
    const userVal = userAnswers[qId];
    if (userVal === undefined || userVal === '') return;

    const evalResult = evaluateQuestion({
      question: currentQ,
      userAnswer: userVal,
      state: 'ANSWERED'
    });
    const isCorrect = evalResult.isCorrect;

    if (!isCorrect && currentQ.type === 'NAT') {
      const warn = detectNATUnitMismatch(userVal, currentQ);
      setNatUnitWarning(warn);
    } else {
      setNatUnitWarning(null);
    }

    setSubmittedState({ ...submittedState, [qId]: { isSubmitted: true, isCorrect } });
    setShowSolution({ ...showSolution, [qId]: true });

    // Record into persistent Mistake Vault
    recordQuestionOutcomes({
      attempted: [qId],
      correct: isCorrect ? [qId] : [],
      incorrect: !isCorrect ? [qId] : [],
      source: 'Practice Mode'
    });
  };

  const handleResetAnswer = (qId) => {
    const updatedAnswers = { ...userAnswers };
    delete updatedAnswers[qId];
    setUserAnswers(updatedAnswers);

    const updatedSubmitted = { ...submittedState };
    delete updatedSubmitted[qId];
    setSubmittedState(updatedSubmitted);
  };

  const handleFinalSubmit = () => {
    const activeList = filteredQuestions.length > 0 ? filteredQuestions : activePracticePool;
    const evaluations = activeList.map((q, idx) => {
      const userAns = userAnswers[q.id];
      const isAttempted = userAns !== undefined && userAns !== '';
      let isCorrect = false;
      let marksAwarded = 0;

      if (isAttempted) {
        const evalResult = evaluateQuestion({
          question: q,
          userAnswer: userAns,
          state: 'ANSWERED'
        });
        isCorrect = evalResult.isCorrect;
        marksAwarded = evalResult.marksAwarded;
      }

      return {
        question: q,
        userAnswer: userAns || '',
        isAttempted,
        isCorrect,
        marksAwarded,
        timeSpentSec: questionTimes[q.id] || 0
      };
    });

    const correctCount = evaluations.filter(e => e.isCorrect).length;
    const incorrectCount = evaluations.filter(e => e.isAttempted && !e.isCorrect).length;
    const unattemptedCount = evaluations.filter(e => !e.isAttempted).length;
    const attemptedCount = correctCount + incorrectCount;
    const totalPossibleMarks = evaluations.reduce((acc, e) => acc + Number(e.question.marks || 1), 0);
    const score = Number(evaluations.reduce((acc, e) => acc + (e.isCorrect ? Number(e.question.marks || 1) : 0), 0).toFixed(2));
    const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;
    const avgTimeSec = evaluations.length > 0 ? Math.round(sessionElapsedSec / evaluations.length) : 0;

    // Group stats by section
    const sectionMap = {};
    evaluations.forEach(e => {
      const sec = e.question.section || 'General';
      if (!sectionMap[sec]) {
        sectionMap[sec] = { section: sec, total: 0, correct: 0, attempted: 0 };
      }
      sectionMap[sec].total += 1;
      if (e.isAttempted) sectionMap[sec].attempted += 1;
      if (e.isCorrect) sectionMap[sec].correct += 1;
    });

    const sectionStats = Object.values(sectionMap).map(s => ({
      ...s,
      accuracy: s.attempted > 0 ? Math.round((s.correct / s.attempted) * 100) : 0
    }));

    const result = {
      totalQuestions: evaluations.length,
      attemptedCount,
      unattemptedCount,
      correctCount,
      incorrectCount,
      score,
      totalPossibleMarks,
      accuracy,
      totalTimeSec: sessionElapsedSec,
      avgTimeSec,
      questionEvaluations: evaluations,
      sectionStats,
      timestamp: new Date().toLocaleTimeString()
    };

    // Persist practice attempt to LocalStorage and Supabase backend
    const clientAttemptId = generateUUID();
    const secSummary = sectionStats.map(s => s.section.replace(/^Section \d+:\s*/, '')).slice(0, 2).join(', ');
    const paperTitle = `Practice: ${evaluations.length} Qs${secSummary ? ` (${secSummary}${sectionStats.length > 2 ? '...' : ''})` : ''}`;

    saveTestAttempt({
      client_attempt_id: clientAttemptId,
      paper_title: paperTitle,
      paper_year: 'Practice Hub',
      test_type: 'practice_session',
      score: result.score,
      total_marks: result.totalPossibleMarks || evaluations.length,
      percentage: Number(((result.score / (result.totalPossibleMarks || 1)) * 100).toFixed(2)),
      accuracy_percentage: result.accuracy,
      correct_count: result.correctCount,
      incorrect_count: result.incorrectCount,
      unattempted_count: result.unattemptedCount,
      total_questions: result.totalQuestions,
      time_spent_seconds: result.totalTimeSec,
      question_responses: evaluations.map((e, idx) => ({
        question_id: e.question.id || `q_${idx+1}`,
        qnum: e.question.qnum || (idx + 1),
        section: e.question.section || 'General',
        type: e.question.type || 'MCQ',
        marks: e.question.marks || 1,
        user_answer: e.userAnswer,
        correct_answer: e.question.correct_answer || e.question.answer,
        is_correct: e.isCorrect,
        is_attempted: e.isAttempted,
        marks_awarded: e.marksAwarded,
        time_spent_seconds: e.timeSpentSec || 0,
        status: e.isCorrect ? 'CORRECT' : (e.isAttempted ? 'INCORRECT' : 'UNATTEMPTED'),
        question_text: e.question.question,
        options: e.question.options,
        solution: e.question.solution || e.question.explanation,
        explanation: e.question.explanation || e.question.solution
      })),
      student_id: currentStudent?.id || null,
      student_name: currentStudent?.full_name || currentStudent?.username || 'Candidate',
      admission_no: currentStudent?.admission_no || null,
      email: currentStudent?.email || null
    });

    const attemptedIds = evaluations.filter(e => e.isAttempted).map(e => e.question.id);
    const correctIds = evaluations.filter(e => e.isAttempted && e.isCorrect).map(e => e.question.id);
    const incorrectIds = evaluations.filter(e => e.isAttempted && !e.isCorrect).map(e => e.question.id);

    recordQuestionOutcomes({
      attempted: attemptedIds,
      correct: correctIds,
      incorrect: incorrectIds,
      source: 'Practice Session'
    });

    setSessionAnalysis(result);
    setShowSubmitConfirmModal(false);
  };

  const handleRetakeIncorrect = () => {
    if (!sessionAnalysis) return;
    const incorrectQs = sessionAnalysis.questionEvaluations
      .filter(e => !e.isCorrect && e.isAttempted)
      .map(e => e.question);
    if (incorrectQs.length > 0) {
      setActivePracticePool(incorrectQs);
      setCurrentIndex(0);
      setUserAnswers({});
      setSubmittedState({});
      setShowSolution({});
      setQuestionTimes({});
      setSessionElapsedSec(0);
      setSessionAnalysis(null);
    }
  };

  const handleRetakeAll = () => {
    setCurrentIndex(0);
    setUserAnswers({});
    setSubmittedState({});
    setShowSolution({});
    setQuestionTimes({});
    setSessionElapsedSec(0);
    setSessionAnalysis(null);
  };

  const handleReturnToHub = () => {
    setSessionAnalysis(null);
    setIsHubActive(true);
  };

  // =========================================================================
  // VIEW: COMPREHENSIVE PRACTICE SESSION RESULT & ANALYSIS
  // =========================================================================
  if (sessionAnalysis) {
    return (
      <PracticeAnalysisView
        sessionResult={sessionAnalysis}
        onRetakeIncorrect={handleRetakeIncorrect}
        onRetakeAll={handleRetakeAll}
        onReturnToHub={handleReturnToHub}
        onOpenCalc={onOpenCalc}
        bookmarks={bookmarks}
        onToggleBookmark={onToggleBookmark}
        onAskAI={(q, studentAns, isCorr) => setActiveAITutorQuestion(q)}
      />
    );
  }

  // =========================================================================
  // VIEW 1: INTERACTIVE PRACTICE HUB / QUESTION SELECTION LAUNCHPAD
  // =========================================================================
  if (isHubActive) {
    return (
      <div className="space-y-6 animate-in fade-in duration-200 pb-8">
        
        {/* Top Hero Banner */}
        <div className="card-3d rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-200 dark:border-blue-900">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Multi-Section & Topic Question Launchpad</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Configure Your Practice Session
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium max-w-2xl">
                Choose multiple sections, specific topics, and custom question counts. Your timer will start only when you click <strong>Start Practice Session</strong>.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowPastHistoryModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300 text-xs font-bold shadow-xs hover:bg-blue-100 dark:hover:bg-blue-900/50 transition cursor-pointer"
                title="View past practice attempts and analyze previous performance"
              >
                <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Practice History</span>
              </button>

              <button
                onClick={onOpenCalc}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-bold shadow-md hover:bg-slate-800 transition"
              >
                <Calculator className="w-4 h-4 text-blue-400 dark:text-blue-600" />
                <span>Scientific Calc</span>
              </button>
            </div>
          </div>

          {/* Quick Presets & Control Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase mr-1">Quick Presets:</span>
              <button
                onClick={() => applyPreset('quick10')}
                className="h-8.5 px-3 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 font-bold transition inline-flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3 h-3 text-blue-500" />
                <span>Quick 10 Mixed</span>
              </button>
              <button
                onClick={() => applyPreset('sprint25')}
                className="h-8.5 px-3 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 hover:bg-purple-100 font-bold transition inline-flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3 h-3 text-purple-500" />
                <span>Standard 25 Sprint</span>
              </button>
              <button
                onClick={() => applyPreset('comprehensive50')}
                className="h-8.5 px-3 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 font-bold transition inline-flex items-center justify-center gap-1.5"
              >
                <Layers className="w-3 h-3 text-emerald-500" />
                <span>Comprehensive 50</span>
              </button>
              <button
                onClick={() => applyPreset('all')}
                className="h-8.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 font-bold transition inline-flex items-center justify-center"
              >
                All Available
              </button>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={selectAllSections}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Select All
              </button>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <button
                onClick={deselectAllSections}
                className="text-xs font-bold text-slate-500 hover:underline"
              >
                Deselect All
              </button>
            </div>
          </div>
        </div>

        {/* Global Filters Bar */}
        <div className="card-3d rounded-2xl p-4 sm:p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-blue-600" />
              <h2 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                Question Filters & Scope
              </h2>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-mono">
              {hierarchyStats.reduce((sum, s) => sum + s.totalAvailable, 0)} Total Available
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Source Pool</label>
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-2 text-slate-900 dark:text-slate-100 font-medium outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="All">All Pool Questions</option>
                <option value="Official GATE PYQs">Official GATE PYQs (2007–2026)</option>
                <option value="Custom Mock Questions">Custom Mocks ({customQuestionsPool.length})</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Question Type</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-2 text-slate-900 dark:text-slate-100 font-medium outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="All">All Types (MCQ, MSQ, NAT)</option>
                <option value="MCQ">MCQ (Multiple Choice)</option>
                <option value="MSQ">MSQ (Multiple Select)</option>
                <option value="NAT">NAT (Numerical Answer)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Marks</label>
              <select
                value={selectedMarks}
                onChange={(e) => setSelectedMarks(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-2 text-slate-900 dark:text-slate-100 font-medium outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="All">All Marks (1 & 2)</option>
                <option value="1">1 Mark</option>
                <option value="2">2 Marks</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Exam Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-2 text-slate-900 dark:text-slate-100 font-medium outline-none focus:ring-1 focus:ring-blue-500"
              >
                {yearsInPool.map(y => <option key={y} value={y}>{y === 'All' ? 'All (2007–2026)' : `GATE ${y}`}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Section Cards List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <span>Select Syllabus Sections & Topic Breakdown</span>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 font-mono">
                ({selectedSummary.filter(s => s.count > 0).length} of 8 Selected)
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {hierarchyStats.map((sec) => {
              const isSelected = !!selectedSections[sec.canonTitle];
              const isExpanded = !!expandedSections[sec.id];
              const alloc = sectionAllocations[sec.canonTitle] ?? 5;
              const topicMap = selectedTopicsMap[sec.canonTitle] || {};
              const activeTopicFilters = Object.values(topicMap).filter(Boolean).length;

              return (
                <div 
                  key={sec.id}
                  className={`card-3d rounded-2xl transition border ${
                    isSelected 
                      ? 'border-blue-500/50 bg-blue-50/10 dark:bg-blue-950/10' 
                      : 'border-slate-200 dark:border-slate-800 opacity-80'
                  }`}
                >
                  {/* Card Header Row */}
                  <div className="p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    
                    {/* Left: Section Details & Checkbox */}
                    <div className="flex items-start gap-3.5 flex-1 cursor-pointer" onClick={() => toggleSection(sec.canonTitle)}>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSection(sec.canonTitle);
                        }}
                        className={`mt-0.5 w-5 h-5 rounded-lg flex items-center justify-center transition border ${
                          isSelected 
                            ? 'bg-blue-600 border-blue-600 text-white' 
                            : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800'
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-0.5 rounded-md border border-slate-200 dark:border-slate-700">
                            {sec.code}
                          </span>
                          <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                            {sec.weightage}
                          </span>
                          <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400">
                            • {sec.totalAvailable} Available Qs
                          </span>
                        </div>
                        <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                          {sec.title}
                        </h3>
                      </div>
                    </div>

                    {/* Right: Allocation Controls & Expand Toggle */}
                    <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                      {isSelected && (
                        <div className="h-10 inline-flex items-center gap-2 bg-white dark:bg-slate-900 px-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs shadow-2xs">
                          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase px-1">Questions:</span>
                          
                          {/* Stepper */}
                          <button
                            onClick={() => {
                              const curr = alloc === 'ALL' ? sec.totalAvailable : Number(alloc);
                              setSectionCount(sec.canonTitle, Math.max(1, curr - 1));
                            }}
                            className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 font-bold transition cursor-pointer"
                            title="Decrease questions"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>

                          <span className="font-mono font-black text-sm px-1.5 text-blue-600 dark:text-blue-400 min-w-[28px] text-center">
                            {alloc === 'ALL' ? 'ALL' : alloc}
                          </span>

                          <button
                            onClick={() => {
                              const curr = alloc === 'ALL' ? sec.totalAvailable : Number(alloc);
                              setSectionCount(sec.canonTitle, Math.min(sec.totalAvailable, curr + 1));
                            }}
                            className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300 font-bold transition cursor-pointer"
                            title="Increase questions"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>

                          {/* Quick count chips */}
                          <div className="flex items-center gap-1 pl-1.5 border-l border-slate-200 dark:border-slate-800">
                            {[5, 10, 15].map(cnt => (
                              <button
                                key={cnt}
                                onClick={() => setSectionCount(sec.canonTitle, cnt)}
                                className={`px-2 py-1 rounded-lg text-[10px] font-extrabold transition cursor-pointer ${
                                  alloc === cnt 
                                    ? 'bg-blue-600 text-white shadow-2xs' 
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                }`}
                              >
                                {cnt}
                              </button>
                            ))}
                            <button
                              onClick={() => setSectionCount(sec.canonTitle, 'ALL')}
                              className={`px-2 py-1 rounded-lg text-[10px] font-extrabold transition cursor-pointer ${
                                alloc === 'ALL' 
                                  ? 'bg-blue-600 text-white shadow-2xs' 
                                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                              }`}
                            >
                              All ({sec.totalAvailable})
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Expand Topics Toggle Button */}
                      <button
                        onClick={() => toggleExpandSection(sec.id)}
                        className="h-10 inline-flex items-center gap-1.5 px-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition border border-slate-200 dark:border-slate-700 cursor-pointer shadow-2xs"
                      >
                        <span>{sec.topics.length} Topics</span>
                        {activeTopicFilters > 0 && (
                          <span className="w-2 h-2 rounded-full bg-blue-500" />
                        )}
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Expandable Topic & Subtopic Breakdown Drawer */}
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-2 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 rounded-b-2xl space-y-4 animate-in fade-in duration-150">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                          Specific Topics in {sec.code} (Optional Filtering)
                        </span>
                        <div className="flex items-center gap-2 text-xs">
                          <button
                            onClick={() => {
                              const allT = {};
                              sec.topics.forEach(t => { allT[t.topic_name] = true; });
                              setSelectedTopicsMap(prev => ({ ...prev, [sec.canonTitle]: allT }));
                            }}
                            className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            Select All Topics
                          </button>
                          <span className="text-slate-300 dark:text-slate-700">•</span>
                          <button
                            onClick={() => {
                              setSelectedTopicsMap(prev => ({ ...prev, [sec.canonTitle]: {} }));
                            }}
                            className="text-[11px] font-bold text-slate-500 hover:underline"
                          >
                            Reset
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {sec.topics.map((t) => {
                          const isTopicSelected = !!topicMap[t.topic_name];
                          return (
                            <div 
                              key={t.topic_name}
                              className={`p-3 rounded-xl border transition ${
                                isTopicSelected 
                                  ? 'bg-blue-50/60 dark:bg-blue-950/40 border-blue-400/50' 
                                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                              }`}
                            >
                              <label className="flex items-start gap-2.5 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={isTopicSelected}
                                  onChange={() => toggleTopic(sec.canonTitle, t.topic_name)}
                                  className="mt-1 rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                                />
                                <div className="space-y-1 flex-1">
                                  <div className="flex items-center justify-between">
                                    <span className="font-bold text-xs text-slate-900 dark:text-white">
                                      {t.topic_name}
                                    </span>
                                    <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                                      {t.availableCount} Qs
                                    </span>
                                  </div>
                                  {t.subtopics && t.subtopics.length > 0 && (
                                    <div className="flex flex-wrap gap-1 pt-1">
                                      {t.subtopics.slice(0, 3).map((st, i) => (
                                        <span 
                                          key={i} 
                                          className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 leading-tight"
                                        >
                                          {st}
                                        </span>
                                      ))}
                                      {t.subtopics.length > 3 && (
                                        <span className="text-[9px] text-slate-400 font-mono">
                                          +{t.subtopics.length - 3} more
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>

        {/* Sticky Launchpad Section Scope Dock at Bottom */}
        <div className="sticky bottom-4 z-30 w-full mt-6">
          <div className="card-3d rounded-2xl p-4 sm:p-5 shadow-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-2 border-blue-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in slide-in-from-bottom-3">
            
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                  <Layers className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Section Scope:</span>
                </span>
                <span className="text-sm font-black text-blue-600 dark:text-blue-400 font-mono">
                  {totalSelectedCount} Questions Selected
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  across {selectedSummary.filter(s => s.count > 0).length} Sections
                </span>
              </div>

              {/* Allocation Breakdown Chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                {selectedSummary.filter(s => s.count > 0).map(s => (
                  <span 
                    key={s.canonTitle}
                    className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900"
                  >
                    {s.code}: {s.count}
                  </span>
                ))}
              </div>
            </div>

            {/* Launch Action Button */}
            <div className="flex items-center gap-3">
              {activePracticePool.length > 0 && (
                <button
                  onClick={() => setIsHubActive(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-xs transition border border-slate-200 dark:border-slate-700 cursor-pointer"
                >
                  Resume Current ({activePracticePool.length} Qs)
                </button>
              )}

              <button
                onClick={handleStartPracticeSession}
                disabled={totalSelectedCount === 0}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold text-sm shadow-lg shadow-blue-500/25 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start Practice Session ({totalSelectedCount} Qs)</span>
              </button>
            </div>

          </div>
        </div>

        {/* Past Practice History Modal */}
        {showPastHistoryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="card-3d rounded-3xl p-6 sm:p-7 max-w-2xl w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl max-h-[85vh] flex flex-col space-y-5">
              
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-black text-slate-900 dark:text-white tracking-tight">
                      Past Practice Sessions History
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      Review your question responses, section mastery, and solutions anytime.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowPastHistoryModal(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                  title="Close History Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {loadingPastHistory ? (
                  <div className="py-12 text-center text-xs text-slate-400 font-medium">
                    Loading practice attempts...
                  </div>
                ) : pastPracticeAttempts.length === 0 ? (
                  <div className="py-12 text-center text-xs text-slate-400 space-y-2">
                    <BookOpen className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-700" />
                    <p className="font-bold text-slate-700 dark:text-slate-300 text-sm">No Practice Sessions Saved Yet</p>
                    <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                      Complete a practice session and click <strong>Submit All Questions</strong> to save your results, pacing metrics, and question-by-question analysis!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {pastPracticeAttempts.map((att, idx) => {
                      const dateStr = att.submitted_at 
                        ? new Date(att.submitted_at).toLocaleString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                          })
                        : 'Recent Practice';

                      const mins = Math.floor((att.time_spent_seconds || 0) / 60);
                      const secs = (att.time_spent_seconds || 0) % 60;

                      return (
                        <div 
                          key={idx}
                          className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-900 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                                Practice Session
                              </span>
                              <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                                {dateStr}
                              </span>
                            </div>
                            <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                              {att.paper_title}
                            </h4>
                            <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-slate-600 dark:text-slate-400 pt-0.5">
                              <span>Score: <strong className="text-blue-600 dark:text-blue-400">{att.score} / {att.total_marks || att.total_questions}</strong></span>
                              <span>•</span>
                              <span>Accuracy: <strong className={Number(att.accuracy_percentage) >= 70 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}>{att.accuracy_percentage}%</strong></span>
                              <span>•</span>
                              <span>Time: {mins}m {secs}s</span>
                              <span>•</span>
                              <span>Breakdown: <span className="text-emerald-600">{att.correct_count}C</span> / <span className="text-rose-500">{att.incorrect_count}I</span> / <span className="text-slate-400">{att.unattempted_count}U</span></span>
                            </div>
                          </div>

                          <div className="shrink-0 flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200 dark:border-slate-800">
                            <button
                              onClick={() => handleOpenPastAttemptAnalysis(att)}
                              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition cursor-pointer"
                            >
                              <BarChart3 className="w-3.5 h-3.5" />
                              <span>View Analysis</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0 text-xs">
                <span className="text-[11px] font-mono text-slate-400">
                  {pastPracticeAttempts.length} Recorded Practice Session{pastPracticeAttempts.length === 1 ? '' : 's'}
                </span>
                <button
                  onClick={() => setShowPastHistoryModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold transition cursor-pointer"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    );
  }

  // =========================================================================
  // VIEW 2: ACTIVE QUESTION PRACTICE SCREEN (TIMER RUNNING)
  // =========================================================================
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Header Bar with Back Button, Real Time, and Session Timers */}
      <div className="card-3d rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => setIsHubActive(true)}
          className="h-10 inline-flex items-center gap-2 px-3.5 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900 text-xs font-bold transition border border-blue-200 dark:border-blue-900 shadow-xs cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← Modify Selection / Selection Hub</span>
          <span className="text-[10px] font-mono font-bold bg-blue-200 dark:bg-blue-800 text-blue-900 dark:text-blue-100 px-2 py-0.5 rounded-full">
            {activePracticePool.length || filteredQuestions.length} Qs
          </span>
        </button>

        <div className="flex items-center gap-3 text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
          <div className="h-10 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-500" />
            <span>Clock: {realTimeStr}</span>
          </div>

          <div className="h-10 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>Session: {formatSec(sessionElapsedSec)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPaletteDrawer(prev => !prev)}
            className="h-10 inline-flex items-center gap-1.5 px-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold border border-slate-200 dark:border-slate-700 transition cursor-pointer"
          >
            <Grid className="w-3.5 h-3.5 text-purple-500" />
            <span>Question Palette</span>
          </button>

          <button
            onClick={onOpenCalc}
            className="h-10 inline-flex items-center gap-2 px-3.5 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-200 dark:border-blue-900 hover:bg-blue-600 hover:text-white transition cursor-pointer"
          >
            <Calculator className="w-4 h-4" />
            <span>Scientific Calc</span>
          </button>

          <button
            onClick={() => setShowSubmitConfirmModal(true)}
            className="h-10 inline-flex items-center gap-1.5 px-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-extrabold shadow-sm transition cursor-pointer"
            title="Submit all attempted questions and view detailed analysis"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Submit All ({answeredCount}/{filteredQuestions.length})</span>
          </button>
        </div>
      </div>

      {/* Collapsible Question Palette Drawer */}
      {showPaletteDrawer && (
        <div className="card-3d rounded-2xl p-5 space-y-4 animate-in fade-in duration-150">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Grid className="w-4 h-4 text-purple-600" />
              <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                Question Quick Jump Palette ({filteredQuestions.length} Questions)
              </h3>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-medium">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Correct
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Incorrect
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Answered
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" /> Unattempted
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto pr-1">
            {filteredQuestions.map((q, idx) => {
              const isCurrent = idx === currentIndex;
              const sub = submittedState[q.id];
              const ans = userAnswers[q.id];
              const isBookmarked = bookmarks.includes(q.id);
              const timeSec = questionTimes[q.id] || 0;

              let colorClass = "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700";
              if (sub?.isSubmitted) {
                colorClass = sub.isCorrect
                  ? "bg-emerald-600 text-white border-emerald-600 font-extrabold"
                  : "bg-rose-600 text-white border-rose-600 font-extrabold";
              } else if (ans !== undefined && ans !== '') {
                colorClass = "bg-blue-600 text-white border-blue-600 font-extrabold";
              }

              return (
                <button
                  key={q.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setShowPaletteDrawer(false);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition flex flex-col items-center gap-0.5 border ${colorClass} ${
                    isCurrent ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <span>Q{idx + 1}</span>
                    {isBookmarked && <Bookmark className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />}
                  </div>
                  {timeSec > 0 && (
                    <span className="text-[9px] font-mono opacity-80">
                      {timeSec}s
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Palette Footer Submit All Button */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {answeredCount} of {filteredQuestions.length} answered
            </span>
            <button
              onClick={() => {
                setShowPaletteDrawer(false);
                setShowSubmitConfirmModal(true);
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-xs transition cursor-pointer flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Submit All & View Analysis</span>
            </button>
          </div>
        </div>
      )}

      {/* Filter Bar (Status & Question Scope) */}
      <div className="card-3d rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-blue-600" />
            <h2 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Status Filter:
            </h2>
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              {[
                { id: 'All', label: 'All Questions' },
                { id: 'Unattempted', label: 'Unattempted' },
                { id: 'Correct', label: 'Correct' },
                { id: 'Incorrect', label: 'Incorrect' },
                { id: 'Bookmarked', label: 'Bookmarked' }
              ].map((st) => (
                <button
                  key={st.id}
                  onClick={() => setSelectedStatusFilter(st.id)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition border ${
                    selectedStatusFilter === st.id
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              if (filteredQuestions.length === 0) return;
              exportQuestionsToPdf(filteredQuestions, {
                title: `GATE AG Practice Session`,
                subtitle: `${filteredQuestions.length} Selected Questions`,
                sections: ['GATE AG Practice Session Pool'],
                includeAnswerKey: true,
                includeSolutions: true
              });
            }}
            disabled={filteredQuestions.length === 0}
            className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white shadow-xs transition flex items-center gap-1.5 cursor-pointer"
            title="Download currently filtered questions as printable PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Download Filtered PDF ({filteredQuestions.length})</span>
          </button>
        </div>
      </div>

      {/* Main Question Display */}
      {filteredQuestions.length === 0 ? (
        <div className="card-3d rounded-2xl p-12 text-center space-y-3">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">No questions match your current filters</h3>
          <p className="text-xs text-slate-500">Try adjusting your status filter or return to the selection launchpad.</p>
          <button
            onClick={() => setIsHubActive(true)}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
          >
            Return to Launchpad
          </button>
        </div>
      ) : (
        <div className="card-3d rounded-2xl overflow-hidden">
          
          {/* Question Header Bar */}
          <div className="bg-slate-50 dark:bg-slate-800/80 px-6 py-3.5 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                Question {currentIndex + 1} of {filteredQuestions.length}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                GATE {currentQ.year}
              </span>
              {currentQ.isCustomUploaded && (
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-purple-500" />
                  <span>Custom Mock</span>
                </span>
              )}
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                {currentQ.type}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                {currentQ.marks} {currentQ.marks === 1 ? 'Mark' : 'Marks'}
              </span>

              {/* Real-time Per-Question Cumulative Timer (Never resets to zero on revisit!) */}
              <div 
                className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 font-mono text-[11px] font-bold shadow-2xs"
                title="Active cumulative time spent practicing this question"
              >
                <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 animate-pulse" />
                <span>Time on Q: {formatSec(questionTimes[currentQ.id] || 0)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  if (!currentStudent && onRequireAuth) {
                    onRequireAuth("Sign In or Register free to bookmark questions and build your revision list!");
                    return;
                  }
                  onToggleBookmark(currentQ.id);
                }}
                className={`p-1.5 rounded-lg border transition ${
                  bookmarks.includes(currentQ.id)
                    ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800 text-amber-500'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600'
                }`}
                title="Toggle Bookmark"
              >
                <Bookmark className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Question Section and Topic Hierarchy Pill */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
              <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                {currentQ.section}
              </span>
              <span>•</span>
              <span className="px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
                {currentQ.topic || 'General'}
              </span>
              {currentQ.subtopic && (
                <>
                  <span>•</span>
                  <span className="px-2.5 py-1 rounded-md bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-900">
                    {currentQ.subtopic}
                  </span>
                </>
              )}
            </div>

            {/* Question Text */}
            <div className="text-sm sm:text-base leading-relaxed text-slate-900 dark:text-slate-100 font-medium">
              <MathRenderer content={currentQ.question} />
            </div>

            {/* Question Image if present */}
            {currentQ.image && (
              <div className="my-4 p-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl inline-block max-w-full">
                <img 
                  src={currentQ.image} 
                  alt="Question Diagram" 
                  className="max-h-72 max-w-full object-contain rounded-lg"
                />
              </div>
            )}

            {/* Options Area */}
            {currentQ.type === 'MCQ' && (
              <div className="space-y-3 pt-2">
                {Object.entries(currentQ.options || {}).map(([key, optText]) => {
                  const isSelected = userAnswers[currentQ.id] === key;
                  const isSubmitted = submittedState[currentQ.id]?.isSubmitted;
                  const isCorrectAnswer = currentQ.correct_answer === key;

                  let borderStyle = 'border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700';
                  let bgStyle = 'bg-white dark:bg-slate-900';

                  if (isSubmitted) {
                    if (isCorrectAnswer) {
                      borderStyle = 'border-emerald-500 dark:border-emerald-500';
                      bgStyle = 'bg-emerald-50/50 dark:bg-emerald-950/30';
                    } else if (isSelected && !isCorrectAnswer) {
                      borderStyle = 'border-rose-500 dark:border-rose-500';
                      bgStyle = 'bg-rose-50/50 dark:bg-rose-950/30';
                    }
                  } else if (isSelected) {
                    borderStyle = 'border-blue-600 dark:border-blue-500';
                    bgStyle = 'bg-blue-50/50 dark:bg-blue-950/30';
                  }

                  return (
                    <div
                      key={key}
                      onClick={() => handleSelectMcq(currentQ.id, key)}
                      className={`flex items-start gap-3.5 p-4 rounded-xl border-2 transition cursor-pointer ${borderStyle} ${bgStyle}`}
                    >
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold transition ${
                        isSelected 
                          ? 'bg-blue-600 border-blue-600 text-white' 
                          : 'border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400'
                      }`}>
                        {key}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-normal flex-1">
                        <MathRenderer content={optText} />
                      </div>
                      {isSubmitted && isCorrectAnswer && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      )}
                      {isSubmitted && isSelected && !isCorrectAnswer && (
                        <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {currentQ.type === 'MSQ' && (
              <div className="space-y-3 pt-2">
                <div className="text-[11px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-2">
                  Multiple Select Question (One or more options may be correct)
                </div>
                {Object.entries(currentQ.options || {}).map(([key, optText]) => {
                  const currentSelected = userAnswers[currentQ.id] ? userAnswers[currentQ.id].split(',') : [];
                  const isSelected = currentSelected.includes(key);
                  const isSubmitted = submittedState[currentQ.id]?.isSubmitted;
                  const correctKeys = (currentQ.correct_answer || '').split(',').map(s => s.trim());
                  const isCorrectOption = correctKeys.includes(key);

                  let borderStyle = 'border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-700';
                  let bgStyle = 'bg-white dark:bg-slate-900';

                  if (isSubmitted) {
                    if (isCorrectOption) {
                      borderStyle = 'border-emerald-500 dark:border-emerald-500';
                      bgStyle = 'bg-emerald-50/50 dark:bg-emerald-950/30';
                    } else if (isSelected && !isCorrectOption) {
                      borderStyle = 'border-rose-500 dark:border-rose-500';
                      bgStyle = 'bg-rose-50/50 dark:bg-rose-950/30';
                    }
                  } else if (isSelected) {
                    borderStyle = 'border-purple-600 dark:border-purple-500';
                    bgStyle = 'bg-purple-50/50 dark:bg-purple-950/30';
                  }

                  return (
                    <div
                      key={key}
                      onClick={() => handleToggleMsq(currentQ.id, key)}
                      className={`flex items-start gap-3.5 p-4 rounded-xl border-2 transition cursor-pointer ${borderStyle} ${bgStyle}`}
                    >
                      <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold transition ${
                        isSelected 
                          ? 'bg-purple-600 border-purple-600 text-white' 
                          : 'border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400'
                      }`}>
                        {key}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-normal flex-1">
                        <MathRenderer content={optText} />
                      </div>
                      {isSubmitted && isCorrectOption && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      )}
                      {isSubmitted && isSelected && !isCorrectOption && (
                        <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {currentQ.type === 'NAT' && (
              <div className="pt-2 space-y-3">
                <div className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                  Numerical Answer Type (Enter exact decimal value)
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative w-full sm:w-80">
                    <input
                      type="text"
                      inputMode="decimal"
                      disabled={submittedState[currentQ.id]?.isSubmitted}
                      value={userAnswers[currentQ.id] || ''}
                      onChange={(e) => handleNatInput(currentQ.id, e.target.value)}
                      placeholder="Enter numerical value (e.g. 12.5)..."
                      className="w-full h-11 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl px-4 text-sm font-mono text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 placeholder:opacity-100 outline-none focus:border-blue-500 transition"
                    />
                  </div>
                  {submittedState[currentQ.id]?.isSubmitted && (
                    <div className="inline-flex items-center h-11 px-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      {submittedState[currentQ.id]?.isCorrect ? (
                        <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-4 h-4" /> Correct Answer
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400">
                          <XCircle className="w-4 h-4" /> Incorrect Answer
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Answer Action Buttons */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {!submittedState[currentQ.id]?.isSubmitted ? (
                  <button
                    onClick={() => handleSubmitAnswer(currentQ.id)}
                    disabled={userAnswers[currentQ.id] === undefined || userAnswers[currentQ.id] === ''}
                    className="h-10.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-bold text-xs shadow-md transition cursor-pointer inline-flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Submit Answer</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleResetAnswer(currentQ.id)}
                    className="h-10.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-xs transition cursor-pointer inline-flex items-center justify-center gap-1.5 border border-slate-200 dark:border-slate-700"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Try Again</span>
                  </button>
                )}

                <button
                  onClick={() => setShowSolution({ ...showSolution, [currentQ.id]: !showSolution[currentQ.id] })}
                  className="h-10.5 px-4 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 font-bold text-xs transition cursor-pointer inline-flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{showSolution[currentQ.id] ? 'Hide Solution' : 'View Solution & Notes'}</span>
                </button>

                <button
                  onClick={() => {
                    if (!currentStudent && onRequireAuth) {
                      onRequireAuth("Sign In or Register free to ask questions to AI Doubt Assistant!");
                      return;
                    }
                    setActiveAITutorQuestion(currentQ);
                  }}
                  className="h-10.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-sm transition cursor-pointer inline-flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>✨ Ask Gemini AI</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  className="h-10.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 disabled:opacity-40 text-slate-700 dark:text-slate-300 text-xs font-bold transition border border-slate-200 dark:border-slate-700 cursor-pointer inline-flex items-center justify-center gap-1 hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                {currentIndex === filteredQuestions.length - 1 ? (
                  <button
                    onClick={() => setShowSubmitConfirmModal(true)}
                    className="h-10.5 px-5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-extrabold shadow-md shadow-emerald-500/25 transition cursor-pointer inline-flex items-center justify-center gap-1.5 animate-in zoom-in-95"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Submit All Questions ({answeredCount}/{filteredQuestions.length})</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentIndex(prev => Math.min(filteredQuestions.length - 1, prev + 1))}
                    className="h-10.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition shadow-md cursor-pointer inline-flex items-center justify-center gap-1"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* NAT Unit Mismatch Alert Box */}
            {natUnitWarning && (
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs font-bold flex items-center gap-3 animate-in fade-in">
                <Sparkles className="w-5 h-5 text-amber-500 shrink-0" />
                <div>{natUnitWarning}</div>
              </div>
            )}

            {/* Solution & Personal Notes Display Drawer */}
            {showSolution[currentQ.id] && (
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveSolutionTab('solution')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                        activeSolutionTab === 'solution'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      Step-by-Step Solution
                    </button>
                    <button
                      onClick={() => setActiveSolutionTab('notes')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                        activeSolutionTab === 'notes'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>My Personal Notes</span>
                      {questionNotes[currentQ.id] && <span className="w-2 h-2 rounded-full bg-amber-400" />}
                    </button>
                  </div>

                  <span className="font-mono text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                    Correct Answer: {currentQ.correct_answer}
                  </span>
                </div>

                {activeSolutionTab === 'solution' ? (
                  <div className="text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 font-medium space-y-2">
                    {(currentQ.solution || currentQ.explanation) ? (
                      <MathRenderer content={currentQ.solution || currentQ.explanation} />
                    ) : (
                      <p className="italic text-slate-400">Official answer key is verified as {currentQ.correct_answer}.</p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Personal Question Notes & Formulas (Saved automatically)
                    </label>
                    <textarea
                      rows={4}
                      value={questionNotes[currentQ.id] || ''}
                      onChange={(e) => handleSaveNote(currentQ.id, e.target.value)}
                      placeholder="Write your custom notes, shortcuts, key formulas, or hints for this question here..."
                      className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl p-3.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 placeholder:opacity-100 outline-none focus:ring-2 focus:ring-blue-500 font-mono leading-relaxed transition"
                    />
                    <p className="text-[10px] text-slate-400">
                      Notes are stored locally on your device for fast revision.
                    </p>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>
      )}

      {/* Gemini AI Tutor Modal */}
      {activeAITutorQuestion && (
        <AITutorModal
          isOpen={Boolean(activeAITutorQuestion)}
          onClose={() => setActiveAITutorQuestion(null)}
          question={activeAITutorQuestion}
          studentAnswer={userAnswers[activeAITutorQuestion.id] || null}
          isCorrect={submittedState[activeAITutorQuestion.id]?.isCorrect || null}
        />
      )}

      {/* Submit All Questions Confirmation Modal */}
      {showSubmitConfirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 dark:bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl space-y-5 animate-in zoom-in-95">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold border border-emerald-200 dark:border-emerald-800 shadow-xs">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Submit Practice Session?
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Generate your accuracy scorecard & performance breakdown
                </p>
              </div>
            </div>

            {/* Quick Status Pill Overview */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 grid grid-cols-3 gap-2 text-center">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Total</span>
                <span className="text-lg font-mono font-black text-slate-900 dark:text-white">
                  {filteredQuestions.length}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Answered</span>
                <span className="text-lg font-mono font-black text-emerald-600 dark:text-emerald-400">
                  {answeredCount}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Unattempted</span>
                <span className="text-lg font-mono font-black text-amber-600 dark:text-amber-400">
                  {filteredQuestions.length - answeredCount}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Once submitted, you'll receive a detailed scorecard with question-by-question explanations, time analysis, and section mastery.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitConfirmModal(false)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold transition cursor-pointer"
              >
                Keep Practicing
              </button>
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-extrabold shadow-md shadow-emerald-500/25 transition cursor-pointer flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Submit & View Analysis</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
