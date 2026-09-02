import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Calculator, 
  FileText, 
  HelpCircle, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronLeft, 
  ChevronRight, 
  X,
  Play,
  RotateCcw,
  Trophy,
  Award,
  BookOpen,
  Info,
  Sparkles,
  Layers,
  Image as ImageIcon,
  Edit3,
  CheckSquare,
  Shield,
  User,
  AlertCircle
} from 'lucide-react';
import MathRenderer from './MathRenderer';
import { evaluateQuestion } from '../utils/scoring.js';
import { saveTestAttempt } from '../services/testAttemptService';
import { calculateAttemptXP, awardStudentXP } from '../services/leaderboardService';

export default function MockTestMode({ 
  mockPapers = [], 
  customMockPapers = [], 
  customPaper, 
  directLaunchPaper, 
  onOpenCalc, 
  onFinishTest, 
  onEditQuestion, 
  currentStudent,
  onRequireAuth
}) {
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [showingPreExamInstructions, setShowingPreExamInstructions] = useState(false);
  const [hasAgreedDeclaration, setHasAgreedDeclaration] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [testStarted, setTestStarted] = useState(false);

  // Test state
  const [paperQuestions, setPaperQuestions] = useState([]);
  const [paperInstructions, setPaperInstructions] = useState(null);
  const [activeSection, setActiveSection] = useState('ALL');
  const [currentQIndex, setCurrentQIndex] = useState(0);

  // Time remaining in seconds
  const [timeLeft, setTimeLeft] = useState(10800);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Question Statuses
  const [userAnswers, setUserAnswers] = useState({});
  const [questionStates, setQuestionStates] = useState({});

  // Modals
  const [showQuestionPaperModal, setShowQuestionPaperModal] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showMobilePalette, setShowMobilePalette] = useState(false);

  const [realTimeStr, setRealTimeStr] = useState(() => new Date().toLocaleTimeString());

  useEffect(() => {
    const clockInterval = setInterval(() => {
      setRealTimeStr(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  useEffect(() => {
    if (customPaper) {
      handleSelectPaperForInstructions(customPaper);
    } else if (directLaunchPaper) {
      handleSelectPaperForInstructions(directLaunchPaper);
    }
  }, [customPaper, directLaunchPaper]);

  // Step 1: User selects a paper -> Show Official GATE / TCS iON Pre-Exam Instructions Screen
  const handleSelectPaperForInstructions = (paper) => {
    if (!currentStudent && onRequireAuth) {
      onRequireAuth("Sign In or Register free to attempt 180-minute official CBT Mock Tests, record scores, and track your AIR Rank!");
      return;
    }
    setSelectedPaper(paper);
    setPaperInstructions(paper.instructions);
    const paperQs = [...(paper?.questions || [])].sort((a, b) => (a.qnum || 0) - (b.qnum || 0));
    setPaperQuestions(paperQs);
    setHasAgreedDeclaration(false);
    setShowingPreExamInstructions(true);
  };

  // Step 2: User confirms declaration and clicks "I am ready to begin" -> Start Active Exam
  const handleStartExam = () => {
    if (!currentStudent && onRequireAuth) {
      onRequireAuth("Sign In or Register free to start timed CBT Mock Tests!");
      return;
    }
    if (!hasAgreedDeclaration) return;
    setShowingPreExamInstructions(false);

    const initialStates = {};
    paperQuestions.forEach((q, idx) => {
      initialStates[q.id] = idx === 0 ? 'NOT_ANSWERED' : 'NOT_VISITED';
    });
    setQuestionStates(initialStates);
    setUserAnswers({});
    setCurrentQIndex(0);
    setActiveSection(paperInstructions?.ga_qs > 0 ? 'GA' : 'ALL');

    if (paperInstructions?.is_untimed) {
      setIsTimerRunning(false);
      setTimeLeft(0);
    } else {
      setTimeLeft((paperInstructions?.duration_mins || 180) * 60);
      setIsTimerRunning(true);
    }
    setTestStarted(true);
  };

  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      handleSubmitFinal();
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  // Current question data
  const currentQ = paperQuestions[currentQIndex];

  // Auto-sync activeSection when current question changes
  useEffect(() => {
    if (!currentQ || !paperInstructions?.ga_qs) return;
    const gaCount = paperInstructions.ga_qs || 10;
    const isGA = currentQ.section === 'General Aptitude' || currentQ.qnum <= gaCount;
    if (isGA && activeSection !== 'GA' && activeSection !== 'ALL') {
      setActiveSection('GA');
    } else if (!isGA && activeSection !== 'AG' && activeSection !== 'ALL') {
      setActiveSection('AG');
    }
  }, [currentQIndex, currentQ]);

  // Filtered Questions for the Active Section
  const getSectionQuestions = () => {
    if (!paperInstructions?.ga_qs || activeSection === 'ALL') {
      return paperQuestions;
    }
    const gaCount = paperInstructions.ga_qs || 10;
    if (activeSection === 'GA') {
      return paperQuestions.filter(q => q.section === 'General Aptitude' || q.qnum <= gaCount);
    }
    return paperQuestions.filter(q => q.section !== 'General Aptitude' && q.qnum > gaCount);
  };

  const sectionQuestions = getSectionQuestions();

  // Palette Navigation
  const handleJumpToQuestion = (targetQnumOrIdx) => {
    let targetIdx = -1;
    if (typeof targetQnumOrIdx === 'number') {
      targetIdx = targetQnumOrIdx;
    } else if (targetQnumOrIdx?.id) {
      targetIdx = paperQuestions.findIndex(q => q.id === targetQnumOrIdx.id);
    }

    if (targetIdx < 0 || targetIdx >= paperQuestions.length) return;
    
    const targetQ = paperQuestions[targetIdx];
    if (questionStates[targetQ.id] === 'NOT_VISITED') {
      setQuestionStates(prev => ({ ...prev, [targetQ.id]: 'NOT_ANSWERED' }));
    }
    
    // Auto switch active section if jumping across sections
    const gaCount = paperInstructions?.ga_qs || 10;
    const isGA = targetQ.section === 'General Aptitude' || targetQ.qnum <= gaCount;
    if (paperInstructions?.ga_qs > 0) {
      setActiveSection(isGA ? 'GA' : 'AG');
    }

    setCurrentQIndex(targetIdx);
    setShowMobilePalette(false);
  };

  // Option selection for MCQ
  const handleSelectOption = (optKey) => {
    if (!currentQ) return;
    if (currentQ.type === 'MCQ') {
      setUserAnswers(prev => ({ ...prev, [currentQ.id]: optKey }));
    } else if (currentQ.type === 'MSQ') {
      const currentList = userAnswers[currentQ.id] ? userAnswers[currentQ.id].split(',').map(s => s.trim()) : [];
      let nextList = [];
      if (currentList.includes(optKey)) {
        nextList = currentList.filter(k => k !== optKey);
      } else {
        nextList = [...currentList, optKey].sort();
      }
      setUserAnswers(prev => ({ ...prev, [currentQ.id]: nextList.join(',') }));
    }
  };

  // NAT Input
  const handleNatInput = (val) => {
    if (!currentQ) return;
    setUserAnswers(prev => ({ ...prev, [currentQ.id]: val }));
  };

  // Action: Save & Next
  const handleSaveAndNext = () => {
    if (!currentQ) return;
    const ans = userAnswers[currentQ.id];
    const isAnswered = ans !== undefined && ans !== null && String(ans).trim() !== '';

    setQuestionStates(prev => ({
      ...prev,
      [currentQ.id]: isAnswered ? 'ANSWERED' : 'NOT_ANSWERED'
    }));

    if (currentQIndex < paperQuestions.length - 1) {
      handleJumpToQuestion(currentQIndex + 1);
    }
  };

  // Action: Mark For Review & Next
  const handleMarkForReviewAndNext = () => {
    if (!currentQ) return;
    const ans = userAnswers[currentQ.id];
    const isAnswered = ans !== undefined && ans !== null && String(ans).trim() !== '';

    setQuestionStates(prev => ({
      ...prev,
      [currentQ.id]: isAnswered ? 'ANSWERED_MARKED' : 'MARKED'
    }));

    if (currentQIndex < paperQuestions.length - 1) {
      handleJumpToQuestion(currentQIndex + 1);
    }
  };

  // Action: Clear Response
  const handleClearResponse = () => {
    if (!currentQ) return;
    setUserAnswers(prev => {
      const next = { ...prev };
      delete next[currentQ.id];
      return next;
    });
    setQuestionStates(prev => ({
      ...prev,
      [currentQ.id]: 'NOT_ANSWERED'
    }));
  };

  // Status Counts for the Active Section or Full Test
  const getStatusCounts = () => {
    const counts = {
      ANSWERED: 0,
      NOT_ANSWERED: 0,
      NOT_VISITED: 0,
      MARKED: 0,
      ANSWERED_MARKED: 0
    };
    sectionQuestions.forEach(q => {
      const state = questionStates[q.id] || 'NOT_VISITED';
      counts[state] = (counts[state] || 0) + 1;
    });
    return counts;
  };

  const statusCounts = getStatusCounts();

  // Submit Final
  const handleSubmitFinal = () => {
    setShowSubmitModal(false);
    setIsTimerRunning(false);

    let totalMarks = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;
    const questionEvaluations = [];

    paperQuestions.forEach(q => {
      const userAns = userAnswers[q.id];
      const result = evaluateQuestion(q, userAns, true);
      totalMarks += result.marksAwarded;
      if (result.isAttempted) {
        if (result.isCorrect) correctCount++;
        else incorrectCount++;
      } else {
        unattemptedCount++;
      }
      questionEvaluations.push({
        ...q,
        userAnswer: userAns || '',
        ...result
      });
    });

    const totalPossibleMarks = paperQuestions.reduce((sum, q) => sum + (Number(q.marks) || 1), 0);
    const durationTakenMins = Math.max(1, Math.round(((paperInstructions?.duration_mins || 180) * 60 - timeLeft) / 60));

    const attemptResult = {
      id: 'attempt_' + Date.now(),
      paperId: selectedPaper.id || `gate_${selectedPaper.year}`,
      paperTitle: selectedPaper.title || `GATE ${selectedPaper.year} Official Paper`,
      paperYear: selectedPaper.year,
      score: Number(totalMarks.toFixed(2)),
      totalPossibleMarks,
      correctCount,
      incorrectCount,
      unattemptedCount,
      totalQuestions: paperQuestions.length,
      durationTakenMins,
      userAnswers,
      questionStates,
      questionEvaluations,
      timestamp: new Date().toISOString()
    };

    saveTestAttempt(attemptResult);
    const earnedXP = calculateAttemptXP(attemptResult);
    awardStudentXP(earnedXP);

    setTestStarted(false);
    setSelectedPaper(null);

    if (typeof onFinishTest === 'function') {
      onFinishTest(attemptResult);
    }
  };

  const formatTimer = (sec) => {
    const hrs = Math.floor(sec / 3600);
    const mins = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    if (hrs > 0) {
      return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
    return `${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // =========================================================================
  // VIEW 1: PRE-EXAM INSTRUCTIONS & CONFIRMATION SCREEN (REAL GATE / TCS iON)
  // =========================================================================
  if (showingPreExamInstructions && selectedPaper) {
    const candidateName = currentStudent?.full_name || currentStudent?.username || 'GATE AG Aspirant';
    const rollNo = currentStudent?.admission_no || 'AG27S41094820';

    return (
      <div className="tcs-cbt-container max-w-5xl mx-auto bg-white border border-slate-300 rounded-3xl shadow-xl overflow-hidden animate-in fade-in duration-200 text-slate-900 font-sans">
        
        {/* Top TCS iON Header */}
        <div className="cbt-top-bar bg-[#0B4A8F] text-white px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b-4 border-[#003366]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center font-black text-sm text-white">
              IIT
            </div>
            <div>
              <h1 className="font-extrabold text-base sm:text-lg tracking-wide uppercase text-white">
                GATE Examination • Agricultural Engineering (AG)
              </h1>
              <p className="text-xs text-blue-100 font-medium">
                {selectedPaper.title || `Official GATE ${selectedPaper.year} CBT Mock Paper`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="text-right">
              <div className="font-bold text-white">{candidateName}</div>
              <div className="text-blue-200 text-[11px]">Roll No: {rollNo}</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/20 border border-white/40 flex items-center justify-center text-white font-bold text-sm">
              {currentStudent?.profile_photo_url ? (
                <img src={currentStudent.profile_photo_url} alt="Photo" className="w-full h-full rounded-full object-cover" />
              ) : (
                <User className="w-5 h-5 text-white" />
              )}
            </div>
          </div>
        </div>

        {/* Instructions Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto text-xs sm:text-sm text-slate-800 leading-relaxed bg-white">
          
          <div className="p-3 bg-[#e8f1fa] border border-[#b8d5f3] rounded-xl flex items-center justify-between text-xs font-bold text-[#0B4A8F]">
            <span className="cbt-blue-header">Subject: Agricultural Engineering (AG)</span>
            <span className="cbt-blue-header">Duration: {paperInstructions?.duration_mins || 180} Minutes</span>
            <span className="cbt-blue-header">Total Marks: {paperInstructions?.max_marks || 100}</span>
          </div>

          {/* Section 1: General Instructions */}
          <div className="space-y-3">
            <h3 className="cbt-blue-header text-sm sm:text-base font-extrabold text-[#0B4A8F] border-b pb-1">
              General Instructions:
            </h3>
            <ol className="list-decimal pl-5 space-y-2 text-slate-800">
              <li>
                <strong>Total Duration:</strong> The examination duration is <strong>{paperInstructions?.duration_mins || 180} minutes</strong>.
              </li>
              <li>
                <strong>Server Clock:</strong> The countdown timer at the top right corner displays the remaining time. When the timer reaches zero, the examination ends automatically.
              </li>
              <li>
                <strong>Question Palette Legend:</strong> The question palette displayed on the right screen uses the following status symbols:
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-100 border border-slate-200">
                    <span className="w-6 h-6 rounded bg-slate-200 border border-slate-300 text-slate-700 font-bold flex items-center justify-center text-xs">1</span>
                    <span className="status-legend-text font-semibold text-slate-700">You have not visited the question yet.</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-red-50 border border-red-200">
                    <span className="w-6 h-6 rounded bg-[#E53935] text-white font-bold flex items-center justify-center text-xs">2</span>
                    <span className="status-legend-text font-semibold text-red-900">You have not answered the question.</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50 border border-emerald-200">
                    <span className="w-6 h-6 rounded bg-[#2E7D32] text-white font-bold flex items-center justify-center text-xs">3</span>
                    <span className="status-legend-text font-semibold text-emerald-900">You have answered the question.</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-purple-50 border border-purple-200">
                    <span className="w-6 h-6 rounded bg-[#7B1FA2] text-white font-bold flex items-center justify-center text-xs">4</span>
                    <span className="status-legend-text font-semibold text-purple-900">You have marked the question for review (Unanswered).</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-purple-50 border border-purple-200 col-span-1 sm:col-span-2">
                    <span className="w-6 h-6 rounded bg-[#7B1FA2] text-white font-bold flex items-center justify-center text-xs relative">
                      5
                      <span className="w-2 h-2 rounded-full bg-emerald-400 absolute -top-0.5 -right-0.5"></span>
                    </span>
                    <span className="status-legend-text font-semibold text-purple-900">You have answered the question and marked it for review (Evaluated in final scoring).</span>
                  </div>
                </div>
              </li>
            </ol>
          </div>

          {/* Section 2: Navigating & Answering Questions */}
          <div className="space-y-3">
            <h3 className="cbt-blue-header text-sm sm:text-base font-extrabold text-[#0B4A8F] border-b pb-1">
              Navigating & Answering Questions:
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-800">
              <li>Click on the question number in the Question Palette to jump directly to that question.</li>
              <li>Click <strong>Save & Next</strong> to save your answer and proceed to the next question.</li>
              <li>Click <strong>Mark for Review & Next</strong> to save your response (if selected) and flag it for review.</li>
              <li>Click <strong>Clear Response</strong> to deselect your chosen option or clear NAT input.</li>
              <li>For <strong>NAT (Numerical Answer Type)</strong> questions, enter decimal numbers using keyboard or numeric input box.</li>
            </ul>
          </div>

          {/* Section 3: Marking Scheme */}
          <div className="space-y-3">
            <h3 className="cbt-blue-header text-sm sm:text-base font-extrabold text-[#0B4A8F] border-b pb-1">
              Marking Scheme & Paper Structure:
            </h3>
            <div className="overflow-x-auto border border-slate-300 rounded-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#0B4A8F] text-white font-bold">
                  <tr>
                    <th className="p-2.5 border-r border-blue-800 text-white">Section</th>
                    <th className="p-2.5 border-r border-blue-800 text-white">Questions</th>
                    <th className="p-2.5 border-r border-blue-800 text-white">Marks for Correct</th>
                    <th className="p-2.5 text-white">Negative Marking (MCQ)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="bg-white">
                    <td className="p-2.5 font-bold border-r text-slate-900">General Aptitude (GA)</td>
                    <td className="p-2.5 border-r text-slate-800">Q.1 – Q.5 (1 Mark) | Q.6 – Q.10 (2 Marks)</td>
                    <td className="p-2.5 border-r text-emerald-700 font-bold">+1 / +2</td>
                    <td className="p-2.5 text-red-600 font-bold">-0.33 / -0.67 (NAT: 0)</td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="p-2.5 font-bold border-r text-slate-900">Agricultural Engg (AG)</td>
                    <td className="p-2.5 border-r text-slate-800">Q.11 – Q.35 (1 Mark) | Q.36 – Q.65 (2 Marks)</td>
                    <td className="p-2.5 border-r text-emerald-700 font-bold">+1 / +2</td>
                    <td className="p-2.5 text-red-600 font-bold">-0.33 / -0.67 (NAT: 0)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Language Selection & Declaration */}
          <div className="p-4 bg-[#fff9e6] border border-[#ffe082] rounded-2xl space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-bold text-xs text-amber-900">Choose your default language:</span>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="p-1.5 rounded-lg border border-amber-300 bg-white text-xs font-bold text-slate-800 outline-none"
              >
                <option value="English">English</option>
              </select>
            </div>

            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={hasAgreedDeclaration}
                onChange={(e) => setHasAgreedDeclaration(e.target.checked)}
                className="w-4 h-4 mt-0.5 text-[#0B4A8F] rounded border-amber-400 focus:ring-0 cursor-pointer"
              />
              <span className="text-xs font-semibold text-slate-800 leading-relaxed">
                I have read and understood all the instructions. All computer hardware allotted to me are in proper working condition. I declare that I am not in possession of any unauthorized materials. I agree that in case of not adhering to the instructions, I will be debarred from this examination.
              </span>
            </label>
          </div>

        </div>

        {/* Bottom Control Bar */}
        <div className="p-5 bg-slate-100 border-t border-slate-300 flex items-center justify-between">
          <button
            onClick={() => {
              setShowingPreExamInstructions(false);
              setSelectedPaper(null);
            }}
            className="px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition shadow-xs cursor-pointer"
          >
            ← Back to Papers List
          </button>

          <button
            onClick={handleStartExam}
            disabled={!hasAgreedDeclaration}
            className={`px-8 py-3 rounded-xl text-xs font-extrabold transition shadow-md flex items-center gap-2 cursor-pointer ${
              hasAgreedDeclaration
                ? 'bg-[#0B4A8F] hover:bg-[#003366] text-white active:scale-95'
                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
            }`}
          >
            <Play className="w-4 h-4 fill-current" />
            <span>I am ready to begin</span>
          </button>
        </div>

      </div>
    );
  }

  // =========================================================================
  // VIEW 2: PAPERS SELECTION LIST (DEFAULT PORTAL VIEW)
  // =========================================================================
  if (!testStarted || !selectedPaper) {
    return (
      <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-200 font-sans">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 space-y-6 shadow-sm">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-xs">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  Official GATE AG CBT Exam Simulator
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  100% authentic TCS iON Computer-Based Test (CBT) platform replica with complete instructions, virtual calculator, and official scoring.
                </p>
              </div>
            </div>
            <div className="text-xs font-mono font-bold px-3.5 py-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 shrink-0">
              20 Official Papers
            </div>
          </div>

          {/* Custom & Curated Mock Tests Section */}
          {customMockPapers.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Custom & Curated Mock Tests ({customMockPapers.length})</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {customMockPapers.map((paper) => (
                  <div
                    key={paper.id}
                    onClick={() => handleSelectPaperForInstructions(paper)}
                    className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-purple-500 rounded-3xl p-5 flex flex-col justify-between space-y-4 transition group cursor-pointer shadow-sm hover:shadow-md"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                            <Sparkles className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded bg-purple-600 text-white font-mono">
                            {paper.year}
                          </span>
                        </div>
                        <span className="text-xs font-mono text-slate-400">
                          {paper.questions?.length} Qs • {paper.instructions?.duration_mins || 180}m
                        </span>
                      </div>
                      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white leading-snug">
                        {paper.title}
                      </h3>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectPaperForInstructions(paper);
                      }}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition shadow-xs active:scale-95 cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>Take CBT Exam</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Official GATE Papers Grid */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Official GATE AG Past Papers (2007–2026)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockPapers.map((paper) => {
                const inst = paper.instructions;
                const isAvail = paper.has_solved_docx === true || (paper.questions && paper.questions.length > 0);
                return (
                  <div 
                    key={paper.year} 
                    className={`rounded-3xl p-5 border flex flex-col justify-between space-y-4 transition ${
                      isAvail
                        ? 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-blue-500 cursor-pointer shadow-sm hover:shadow-md group'
                        : 'bg-slate-50/50 dark:bg-slate-950/40 border-slate-200/40 dark:border-slate-900 opacity-60'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-mono font-black text-xs">
                          {paper.year.slice(-2)}'
                        </div>
                        <span className="text-xs font-mono font-extrabold text-blue-600 dark:text-blue-400">
                          GATE {paper.year}
                        </span>
                      </div>

                      <h3 className="font-extrabold text-slate-900 dark:text-white text-xs leading-snug">
                        Official GATE {paper.year} AG Paper
                      </h3>
                      
                      <div className="text-xs text-slate-500 font-mono flex justify-between">
                        <span>{inst.max_marks} Marks</span>
                        <span>{isAvail ? `${inst.total_qs} Qs • ${inst.duration_mins}m` : 'Pending'}</span>
                      </div>
                    </div>

                    {isAvail ? (
                      <button
                        onClick={() => handleSelectPaperForInstructions(paper)}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#0B4A8F] hover:bg-[#003366] text-white font-bold text-xs transition shadow-xs active:scale-95 cursor-pointer"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        <span>Start CBT ({paper.year})</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => alert(`Detailed Solved Paper for GATE ${paper.year} is currently being verified.`)}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-400 text-xs font-bold transition cursor-not-allowed"
                      >
                        <Clock className="w-4 h-4" />
                        <span>Adding Soon</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 3: ACTIVE CBT EXAM INTERFACE (UNIFIED OFFICIAL TCS iON LIGHT THEME)
  // =========================================================================
  const candidateName = currentStudent?.full_name || currentStudent?.username || 'GATE Aspirant';
  const rollNo = currentStudent?.admission_no || 'AG27S41094820';

  return (
    <div className="tcs-cbt-container max-w-7xl mx-auto bg-[#f4f7f9] border border-slate-300 rounded-2xl shadow-xl overflow-hidden animate-in fade-in duration-200 text-slate-900 font-sans">
      
      {/* Top Bar: Official TCS iON Blue Header */}
      <div className="cbt-top-bar bg-[#0B4A8F] text-white px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#003366]">
        <div className="flex items-center gap-3">
          <span className="font-extrabold text-sm sm:text-base tracking-wide uppercase text-white">
            GATE 2027 • Agricultural Engineering (AG)
          </span>
          <span className="hidden md:inline-block text-xs text-blue-200 font-mono">
            | {selectedPaper.title || `Official Paper ${selectedPaper.year}`}
          </span>
        </div>

        {/* Live Countdown Clock & Tools */}
        <div className="flex items-center gap-3">
          <div className="cbt-timer px-3.5 py-1.5 rounded-lg bg-[#003366] border border-blue-400/40 text-amber-300 font-mono font-black text-sm flex items-center gap-2 shadow-inner">
            <Clock className="w-4 h-4 animate-pulse" />
            <span>Time Left: {formatTimer(timeLeft)}</span>
          </div>

          <button
            onClick={onOpenCalc}
            className="px-3 py-1.5 rounded-lg bg-[#ffffff]/10 hover:bg-[#ffffff]/20 border border-white/30 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
            title="Open Scientific Virtual Calculator"
          >
            <Calculator className="w-4 h-4 text-blue-200" />
            <span>Calculator</span>
          </button>

          <button
            onClick={() => setShowInstructionsModal(true)}
            className="px-3 py-1.5 rounded-lg bg-[#ffffff]/10 hover:bg-[#ffffff]/20 border border-white/30 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
          >
            <Info className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">Instructions</span>
          </button>

          <button
            onClick={() => setShowQuestionPaperModal(true)}
            className="px-3 py-1.5 rounded-lg bg-[#ffffff]/10 hover:bg-[#ffffff]/20 border border-white/30 text-white font-bold text-xs flex items-center gap-1.5 transition cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Paper</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to exit the active test? Your current progress will be reset.")) {
                setTestStarted(false);
                setSelectedPaper(null);
              }
            }}
            className="px-3 py-1.5 rounded-lg bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs transition shadow-xs cursor-pointer"
          >
            Exit
          </button>
        </div>
      </div>

      {/* Sections Header Bar */}
      <div className="bg-[#e8f1fa] border-b border-[#b8d5f3] px-4 sm:px-6 py-2 flex items-center gap-2 overflow-x-auto">
        <span className="cbt-blue-header text-xs font-bold text-[#0B4A8F] uppercase tracking-wider pr-2 shrink-0">Sections:</span>
        {paperInstructions?.ga_qs > 0 ? (
          <>
            <button
              onClick={() => {
                setActiveSection('GA');
                const firstGA = paperQuestions.find(q => q.section === 'General Aptitude' || q.qnum <= (paperInstructions?.ga_qs || 10));
                if (firstGA) handleJumpToQuestion(firstGA);
              }}
              className={`px-4 py-1.5 rounded-md text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeSection === 'GA' 
                  ? 'bg-[#0B4A8F] text-white shadow-xs' 
                  : 'bg-white text-slate-800 border border-slate-300 hover:bg-slate-50'
              }`}
            >
              General Aptitude (GA) [Q.1–Q.10]
            </button>
            <button
              onClick={() => {
                setActiveSection('AG');
                const firstAG = paperQuestions.find(q => q.section !== 'General Aptitude' && q.qnum > (paperInstructions?.ga_qs || 10));
                if (firstAG) handleJumpToQuestion(firstAG);
              }}
              className={`px-4 py-1.5 rounded-md text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeSection === 'AG' 
                  ? 'bg-[#0B4A8F] text-white shadow-xs' 
                  : 'bg-white text-slate-800 border border-slate-300 hover:bg-slate-50'
              }`}
            >
              Agricultural Engineering (AG) [Q.11–Q.65]
            </button>
          </>
        ) : (
          <button
            onClick={() => setActiveSection('ALL')}
            className="px-4 py-1.5 rounded-md text-xs font-bold bg-[#0B4A8F] text-white shadow-xs whitespace-nowrap cursor-pointer"
          >
            Agricultural Engineering ({paperInstructions?.max_marks || 100} Marks)
          </button>
        )}
      </div>

      {/* Main Examination Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4">
        
        {/* Left / Center Column: Question Display Pane */}
        <div className="lg:col-span-8 flex flex-col space-y-4">
          
          {currentQ && (
            <div className="cbt-card bg-white border border-slate-300 rounded-xl shadow-xs overflow-hidden flex flex-col min-h-[480px]">
              
              {/* Question Meta Header Strip */}
              <div className="bg-[#f0f4f8] border-b border-slate-300 px-5 py-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="cbt-blue-header font-extrabold text-[#0B4A8F] text-sm">
                  Question No. {currentQ.qnum}
                </span>

                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-slate-200 font-mono font-bold text-slate-900 border border-slate-300">
                    Type: {currentQ.type}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold border border-emerald-300">
                    Marks: +{currentQ.marks}.00
                  </span>
                  {currentQ.type === 'MCQ' && (
                    <span className="px-2 py-0.5 rounded bg-red-100 text-red-900 font-bold border border-red-300">
                      Negative: -{Number(currentQ.negative_marks).toFixed(2)}
                    </span>
                  )}
                  {currentQ.type !== 'MCQ' && (
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-bold border border-blue-300">
                      Negative: 0.00
                    </span>
                  )}
                </div>
              </div>

              {/* Question Stem Content Area */}
              <div className="p-6 sm:p-8 space-y-5 flex-1 overflow-x-auto text-slate-900 leading-relaxed font-sans bg-white">
                
                <div className="text-[11px] font-bold text-blue-800 uppercase tracking-wider">
                  {currentQ.section} • {currentQ.topic}
                </div>

                <div className="text-sm sm:text-base md:text-lg font-bold text-[#111827] leading-relaxed overflow-x-auto">
                  <MathRenderer content={currentQ.question} inline={false} />
                </div>

                {/* Embedded Diagram / Chart */}
                {currentQ.image_url && (
                  <div className="my-4 p-4 rounded-xl bg-slate-50 border border-slate-300 text-center overflow-hidden space-y-2">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-blue-800 flex items-center justify-center gap-1">
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Question Figure / Schematic Diagram</span>
                    </div>
                    <img
                      src={currentQ.image_url}
                      alt={`Diagram for Q${currentQ.qnum}`}
                      className="max-h-[340px] w-auto mx-auto rounded-lg border border-slate-200 object-contain shadow-xs"
                    />
                  </div>
                )}

                {/* MCQ Options */}
                {currentQ.type === 'MCQ' && currentQ.options && (
                  <div className="space-y-3 pt-2">
                    {Object.entries(currentQ.options).map(([optKey, optVal]) => {
                      const isSelected = userAnswers[currentQ.id] === optKey;
                      return (
                        <button
                          key={optKey}
                          onClick={() => handleSelectOption(optKey)}
                          className={`w-full text-left p-4 rounded-xl border transition flex items-start gap-3.5 text-xs sm:text-sm font-semibold cursor-pointer ${
                            isSelected
                              ? 'border-[#0B4A8F] bg-[#eef7ff] text-[#0B4A8F] font-bold shadow-xs ring-1 ring-[#0B4A8F]'
                              : 'border-slate-300 bg-white text-slate-900 hover:border-[#0B4A8F] hover:bg-slate-50'
                          }`}
                        >
                          <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 border ${
                            isSelected
                              ? 'bg-[#0B4A8F] text-white border-[#0B4A8F]'
                              : 'bg-slate-100 text-slate-800 border-slate-300'
                          }`}>
                            {optKey}
                          </span>
                          <div className="pt-0.5 flex-1 min-w-0 overflow-x-auto text-[#111827] font-semibold">
                            <MathRenderer content={optVal} />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* MSQ Options */}
                {currentQ.type === 'MSQ' && currentQ.options && (
                  <div className="space-y-3 pt-2">
                    <p className="text-xs text-slate-700 font-bold italic">Select all correct options (one or more).</p>
                    {Object.entries(currentQ.options).map(([optKey, optVal]) => {
                      const selectedList = userAnswers[currentQ.id] ? userAnswers[currentQ.id].split(',').map(s => s.trim()) : [];
                      const isChecked = selectedList.includes(optKey);
                      return (
                        <button
                          key={optKey}
                          onClick={() => handleSelectOption(optKey)}
                          className={`w-full text-left p-4 rounded-xl border transition flex items-start gap-3.5 text-xs sm:text-sm font-semibold cursor-pointer ${
                            isChecked
                              ? 'border-[#0B4A8F] bg-[#eef7ff] text-[#0B4A8F] font-bold shadow-xs ring-1 ring-[#0B4A8F]'
                              : 'border-slate-300 bg-white text-slate-900 hover:border-[#0B4A8F] hover:bg-slate-50'
                          }`}
                        >
                          <span className={`w-6 h-6 sm:w-7 sm:h-7 rounded-md flex items-center justify-center font-bold text-xs shrink-0 border ${
                            isChecked
                              ? 'bg-[#0B4A8F] text-white border-[#0B4A8F]'
                              : 'bg-slate-100 text-slate-800 border-slate-300'
                          }`}>
                            {optKey}
                          </span>
                          <div className="pt-0.5 flex-1 min-w-0 overflow-x-auto text-[#111827] font-semibold">
                            <MathRenderer content={optVal} />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* NAT Numerical Input */}
                {currentQ.type === 'NAT' && (
                  <div className="pt-3 space-y-3">
                    <label className="cbt-blue-header block text-xs font-extrabold text-[#0B4A8F] uppercase tracking-wider">
                      Numerical Answer Input (Use on-screen keypad or keyboard)
                    </label>
                    <input
                      type="number"
                      step="any"
                      placeholder="Enter numerical answer..."
                      value={userAnswers[currentQ.id] || ''}
                      onChange={(e) => handleNatInput(e.target.value)}
                      className="w-full sm:max-w-xs bg-white border-2 border-slate-400 rounded-xl px-4 py-3 text-base font-mono font-bold text-slate-900 outline-none focus:border-[#0B4A8F]"
                    />
                  </div>
                )}

              </div>

              {/* Bottom Actions Bar */}
              <div className="bg-[#f0f4f8] px-4 sm:px-6 py-3.5 border-t border-slate-300 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleMarkForReviewAndNext}
                    className="px-4 py-2 rounded-xl bg-[#7B1FA2] hover:bg-[#6A1B9A] text-white font-bold text-xs transition shadow-xs cursor-pointer"
                  >
                    Mark for Review & Next
                  </button>

                  <button
                    onClick={handleClearResponse}
                    className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold text-xs transition shadow-xs cursor-pointer"
                  >
                    Clear Response
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveAndNext}
                    className="px-6 py-2.5 rounded-xl bg-[#0B4A8F] hover:bg-[#003366] text-white font-extrabold text-xs transition shadow-md active:scale-95 cursor-pointer"
                  >
                    Save & Next →
                  </button>

                  <button
                    onClick={() => setShowSubmitModal(true)}
                    className="px-5 py-2.5 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-extrabold text-xs transition shadow-md active:scale-95 cursor-pointer"
                  >
                    Submit Test
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Right Column: Candidate Card & Question Palette */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Candidate Profile Box */}
          <div className="cbt-card bg-white border border-slate-300 rounded-xl p-4 flex items-center gap-3.5 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-slate-200 border-2 border-[#0B4A8F] flex items-center justify-center text-slate-700 font-bold overflow-hidden shrink-0">
              {currentStudent?.profile_photo_url ? (
                <img src={currentStudent.profile_photo_url} alt="Candidate" className="w-full h-full object-cover" />
              ) : (
                <User className="w-6 h-6 text-[#0B4A8F]" />
              )}
            </div>
            <div className="min-w-0">
              <div className="font-extrabold text-xs text-slate-900 truncate">{candidateName}</div>
              <div className="text-[11px] font-mono text-slate-700 font-bold">Roll: {rollNo}</div>
              <div className="text-[10px] font-bold text-emerald-800">Exam: GATE AG 2027</div>
            </div>
          </div>

          {/* Palette Status Breakdown Legend */}
          <div className="cbt-card bg-white border border-slate-300 rounded-xl p-4 space-y-3 shadow-xs text-xs">
            <h3 className="cbt-blue-header font-extrabold text-[#0B4A8F] uppercase tracking-wider text-[11px] border-b pb-1.5">
              Question Palette Legend ({activeSection === 'GA' ? 'GA Section' : (activeSection === 'AG' ? 'AG Section' : 'All Sections')})
            </h3>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-[#2E7D32] text-white font-bold text-[10px] flex items-center justify-center">
                  {statusCounts.ANSWERED}
                </span>
                <span className="status-legend-text font-bold text-slate-800">Answered</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-[#E53935] text-white font-bold text-[10px] flex items-center justify-center">
                  {statusCounts.NOT_ANSWERED}
                </span>
                <span className="status-legend-text font-bold text-slate-800">Not Answered</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-slate-200 border border-slate-300 text-slate-800 font-bold text-[10px] flex items-center justify-center">
                  {statusCounts.NOT_VISITED}
                </span>
                <span className="status-legend-text font-bold text-slate-800">Not Visited</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-[#7B1FA2] text-white font-bold text-[10px] flex items-center justify-center">
                  {statusCounts.MARKED}
                </span>
                <span className="status-legend-text font-bold text-slate-800">Marked Review</span>
              </div>

              <div className="flex items-center gap-2 col-span-2">
                <span className="w-5 h-5 rounded bg-[#7B1FA2] text-white font-bold text-[10px] flex items-center justify-center relative">
                  {statusCounts.ANSWERED_MARKED}
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 absolute -top-0.5 -right-0.5"></span>
                </span>
                <span className="status-legend-text font-bold text-slate-800">Ans & Marked for Review</span>
              </div>
            </div>
          </div>

          {/* Question Palette Number Grid */}
          <div className="cbt-card bg-white border border-slate-300 rounded-xl p-4 space-y-3 shadow-xs">
            <div className="flex items-center justify-between border-b pb-1.5">
              <span className="cbt-blue-header font-extrabold text-[#0B4A8F] uppercase tracking-wider text-[11px]">
                {activeSection === 'GA' ? 'GA Questions (1–10)' : (activeSection === 'AG' ? `AG Questions (11–${paperQuestions.length})` : `Questions (1–${paperQuestions.length})`)}
              </span>
              <span className="font-mono text-[10px] text-blue-900 font-extrabold">
                Q.{currentQ?.qnum || 1} Selected
              </span>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 max-h-64 overflow-y-auto pr-1">
              {sectionQuestions.map((q) => {
                const targetIdx = paperQuestions.findIndex(pQ => pQ.id === q.id);
                const st = questionStates[q.id] || 'NOT_VISITED';
                const isCur = targetIdx === currentQIndex;

                let btnBg = "bg-slate-100 text-slate-800 border-slate-300";
                if (st === 'ANSWERED') btnBg = "bg-[#2E7D32] text-white border-[#2E7D32]";
                else if (st === 'NOT_ANSWERED') btnBg = "bg-[#E53935] text-white border-[#E53935]";
                else if (st === 'MARKED') btnBg = "bg-[#7B1FA2] text-white border-[#7B1FA2]";
                else if (st === 'ANSWERED_MARKED') btnBg = "bg-[#7B1FA2] text-white border-[#7B1FA2] ring-2 ring-emerald-500";

                return (
                  <button
                    key={q.id}
                    onClick={() => handleJumpToQuestion(targetIdx)}
                    className={`h-9 rounded-lg font-bold text-xs flex items-center justify-center transition border shadow-2xs cursor-pointer relative ${btnBg} ${
                      isCur ? 'ring-3 ring-[#0B4A8F] scale-105 font-black' : ''
                    }`}
                  >
                    <span>{q.qnum}</span>
                    {st === 'ANSWERED_MARKED' && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 absolute top-0.5 right-0.5"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* MODAL 1: QUESTION PAPER OVERVIEW */}
      {showQuestionPaperModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-4xl max-h-[85vh] bg-white border border-slate-300 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="bg-[#0B4A8F] text-white p-4 flex items-center justify-between">
              <h3 className="font-extrabold text-sm uppercase text-white">Full Question Paper Overview</h3>
              <button onClick={() => setShowQuestionPaperModal(false)} className="text-white hover:text-blue-200 cursor-pointer">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4 divide-y divide-slate-200 bg-white">
              {paperQuestions.map((q) => (
                <div key={q.id} className="pt-3 first:pt-0 space-y-1.5 text-xs text-slate-800">
                  <div className="cbt-blue-header font-extrabold text-[#0B4A8F]">Q.{q.qnum} [{q.type} • {q.marks} Mark]</div>
                  <div className="font-bold text-slate-900"><MathRenderer content={q.question} /></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: INSTRUCTIONS POPUP */}
      {showInstructionsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-2xl max-h-[85vh] bg-white border border-slate-300 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="bg-[#0B4A8F] text-white p-4 flex items-center justify-between">
              <h3 className="font-extrabold text-sm uppercase text-white">Exam Instructions</h3>
              <button onClick={() => setShowInstructionsModal(false)} className="text-white hover:text-blue-200 cursor-pointer">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-3 text-xs text-slate-800 leading-relaxed bg-white">
              <div>✅ 180 Minutes total duration.</div>
              <div>✅ MCQ 1 Mark (-0.33), 2 Marks (-0.67). MSQ and NAT have 0 negative marking.</div>
              <div>✅ Green = Answered, Red = Not Answered, Purple = Marked for Review.</div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: FINAL SUBMIT CONFIRMATION */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md bg-white border border-slate-300 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-2 border-b pb-3">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h3 className="font-extrabold text-sm text-slate-900">Confirm Exam Submission</h3>
            </div>

            <p className="text-xs text-slate-700 font-semibold">
              Are you sure you want to submit your examination? Summary of your responses:
            </p>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5 text-xs text-slate-900">
              <div className="flex justify-between"><span>Answered Questions:</span> <strong className="text-emerald-700">{statusCounts.ANSWERED + statusCounts.ANSWERED_MARKED}</strong></div>
              <div className="flex justify-between"><span>Marked for Review:</span> <strong className="text-purple-700">{statusCounts.MARKED}</strong></div>
              <div className="flex justify-between"><span>Not Answered:</span> <strong className="text-red-600">{statusCounts.NOT_ANSWERED}</strong></div>
              <div className="flex justify-between"><span>Not Visited:</span> <strong className="text-slate-700">{statusCounts.NOT_VISITED}</strong></div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs cursor-pointer border border-slate-300"
              >
                Continue Test
              </button>
              <button
                onClick={handleSubmitFinal}
                className="px-5 py-2 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-extrabold text-xs shadow-md cursor-pointer"
              >
                Yes, Submit Final
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
