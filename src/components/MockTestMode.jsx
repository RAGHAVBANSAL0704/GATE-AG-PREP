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
  Edit3
} from 'lucide-react';
import MathRenderer from './MathRenderer';

export default function MockTestMode({ mockPapers, customMockPapers = [], customPaper, directLaunchPaper, onOpenCalc, onFinishTest, onEditQuestion }) {
  const [selectedPaper, setSelectedPaper] = useState(null);
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
      startMockTest(customPaper);
    } else if (directLaunchPaper) {
      startMockTest(directLaunchPaper);
    }
  }, [customPaper, directLaunchPaper]);

  const startMockTest = (paper) => {
    setSelectedPaper(paper);
    setPaperInstructions(paper.instructions);
    
    const paperQs = [...(paper?.questions || [])].sort((a, b) => (a.qnum || 0) - (b.qnum || 0));
    setPaperQuestions(paperQs);
    
    const initialStates = {};
    paperQs.forEach((q, idx) => {
      initialStates[q.id] = idx === 0 ? 'NOT_ANSWERED' : 'NOT_VISITED';
    });
    setQuestionStates(initialStates);
    setUserAnswers({});
    setCurrentQIndex(0);
    setActiveSection(paper.instructions?.ga_qs > 0 ? 'GA' : 'ALL');
    
    if (paper.instructions?.is_untimed) {
      setIsTimerRunning(false);
      setTimeLeft(0);
    } else {
      setTimeLeft((paper.instructions?.duration_mins || 180) * 60);
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

  if (!testStarted || !selectedPaper) {
    return (
      <div className="max-w-6xl mx-auto space-y-5 animate-in fade-in duration-200">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 space-y-5 shadow-xs">
          
          {/* Minimal Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>PYQ & Mocks</span>
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Official 180-minute GATE Agricultural Engineering papers (2007–2026) & custom mock tests in full CBT format.
              </p>
            </div>
            <div className="text-xs font-mono font-bold px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 shrink-0">
              20 Official Papers
            </div>
          </div>

          {/* Custom & Pre-Loaded Mock Papers Section */}
          {customMockPapers.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Custom & Pre-Loaded Mocks ({customMockPapers.length})</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {customMockPapers.map((paper) => (
                  <div
                    key={paper.id}
                    onClick={() => startMockTest(paper)}
                    className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-purple-500 rounded-xl p-4 flex flex-col justify-between space-y-3 transition group cursor-pointer"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-purple-600 text-white font-mono">
                          {paper.year}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {paper.questions?.length} Qs • {paper.instructions?.duration_mins || 180}m
                        </span>
                      </div>
                      <h3 className="text-xs font-extrabold text-slate-900 dark:text-white leading-snug">
                        {paper.title}
                      </h3>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startMockTest(paper);
                      }}
                      className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition shadow-xs"
                    >
                      <Play className="w-3 h-3 fill-white" />
                      <span>Start Custom CBT</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Official GATE Papers Grid */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Official GATE AG Past Papers (2007–2026)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {mockPapers.map((paper) => {
                const inst = paper.instructions;
                const isAvail = paper.has_solved_docx === true || (paper.questions && paper.questions.length > 0);
                return (
                  <div 
                    key={paper.year} 
                    className={`rounded-xl p-4 border flex flex-col justify-between space-y-3 transition ${
                      isAvail
                        ? 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-blue-500 cursor-pointer'
                        : 'bg-slate-50/50 dark:bg-slate-950/40 border-slate-200/40 dark:border-slate-900 opacity-60'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono font-extrabold text-blue-600 dark:text-blue-400">
                          GATE {paper.year}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {isAvail ? `${inst.duration_mins}m` : 'Adding Soon'}
                        </span>
                      </div>

                      <h3 className="font-extrabold text-slate-900 dark:text-white text-xs">
                        Official GATE {paper.year} Paper
                      </h3>
                      
                      <div className="text-[10px] text-slate-500 font-mono flex justify-between">
                        <span>{inst.max_marks} Marks</span>
                        <span>{isAvail ? `${inst.total_qs} Qs` : 'Pending'}</span>
                      </div>
                    </div>

                    {isAvail ? (
                      <button
                        onClick={() => startMockTest(paper)}
                        className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition shadow-xs"
                      >
                        <Play className="w-3 h-3 fill-white" />
                        <span>Start CBT ({paper.year})</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => alert(`Detailed Solved .docx Paper for GATE ${paper.year} is currently being verified.`)}
                        className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-400 text-xs font-bold transition cursor-not-allowed"
                      >
                        <Clock className="w-3 h-3" />
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

  const currentQ = paperQuestions[currentQIndex];

  if (!currentQ) {
    return (
      <div className="card-3d rounded-2xl p-12 text-center space-y-3">
        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto" />
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Loading Exam Paper Questions...</h3>
        <button
          onClick={() => {
            setTestStarted(false);
            setSelectedPaper(null);
          }}
          className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs"
        >
          Return to Mock Papers
        </button>
      </div>
    );
  }

  const formatTime = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const gaQuestions = paperQuestions.filter(q => q.gate_section === 'GA' || q.qnum <= 10);
  const agQuestions = paperQuestions.filter(q => q.gate_section === 'AG' && (paperInstructions?.ga_qs === 0 || q.qnum > 10));

  const activeQuestions = activeSection === 'GA' ? gaQuestions : (activeSection === 'AG' ? agQuestions : paperQuestions);

  const navigateToQ = (idxInPaper) => {
    const targetQ = paperQuestions[idxInPaper];
    if (!targetQ) return;

    const curId = currentQ.id;
    if (questionStates[curId] === 'NOT_VISITED') {
      setQuestionStates(prev => ({ ...prev, [curId]: 'NOT_ANSWERED' }));
    }
    if (questionStates[targetQ.id] === 'NOT_VISITED') {
      setQuestionStates(prev => ({ ...prev, [targetQ.id]: 'NOT_ANSWERED' }));
    }

    setCurrentQIndex(idxInPaper);
  };

  const handleSelectOption = (optKey) => {
    const qId = currentQ.id;
    if (currentQ.type === 'MCQ') {
      setUserAnswers({ ...userAnswers, [qId]: optKey });
    } else if (currentQ.type === 'MSQ') {
      const currentList = userAnswers[qId] ? userAnswers[qId].split(',').filter(Boolean) : [];
      let updated;
      if (currentList.includes(optKey)) {
        updated = currentList.filter(k => k !== optKey);
      } else {
        updated = [...currentList, optKey];
      }
      updated.sort();
      setUserAnswers({ ...userAnswers, [qId]: updated.join(',') });
    }
  };

  const handleNatInput = (val) => {
    setUserAnswers({ ...userAnswers, [currentQ.id]: val });
  };

  const handleClearResponse = () => {
    const qId = currentQ.id;
    const updated = { ...userAnswers };
    delete updated[qId];
    setUserAnswers(updated);
    setQuestionStates(prev => ({ ...prev, [qId]: 'NOT_ANSWERED' }));
  };

  const handleSaveAndNext = () => {
    const qId = currentQ.id;
    const hasAnswer = userAnswers[qId] !== undefined && userAnswers[qId] !== '';
    
    setQuestionStates(prev => ({
      ...prev,
      [qId]: hasAnswer ? 'ANSWERED' : 'NOT_ANSWERED'
    }));

    if (currentQIndex < paperQuestions.length - 1) {
      navigateToQ(currentQIndex + 1);
    }
  };

  const handleMarkForReviewAndNext = () => {
    const qId = currentQ.id;
    const hasAnswer = userAnswers[qId] !== undefined && userAnswers[qId] !== '';

    setQuestionStates(prev => ({
      ...prev,
      [qId]: hasAnswer ? 'ANSWERED_MARKED' : 'MARKED'
    }));

    if (currentQIndex < paperQuestions.length - 1) {
      navigateToQ(currentQIndex + 1);
    }
  };

  const handleSubmitFinal = () => {
    setIsTimerRunning(false);
    setShowSubmitModal(false);
    
    let score = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;

    paperQuestions.forEach(q => {
      const state = questionStates[q.id];
      const ans = userAnswers[q.id];

      if ((state === 'ANSWERED' || state === 'ANSWERED_MARKED') && ans !== undefined && ans !== '') {
        const correctKey = q.correct_answer;
        let isCorrect = false;

        const enableNeg = paperInstructions?.enable_negative_marking !== false;

        if (q.type === 'MCQ') {
          isCorrect = ans.trim().toUpperCase() === correctKey.trim().toUpperCase();
          if (isCorrect) {
            score += q.marks;
            correctCount++;
          } else {
            if (enableNeg) {
              score -= q.negative_marks;
            }
            incorrectCount++;
          }
        } else if (q.type === 'MSQ') {
          const userSorted = ans.split(',').map(s => s.trim().toUpperCase()).sort().join(';');
          const keySorted = correctKey.replace(/,/g, ';').split(';').map(s => s.trim().toUpperCase()).sort().join(';');
          isCorrect = userSorted === keySorted;
          if (isCorrect) {
            score += q.marks;
            correctCount++;
          } else {
            incorrectCount++;
          }
        } else if (q.type === 'NAT') {
          const numVal = parseFloat(ans);
          if (!isNaN(numVal)) {
            if (correctKey.includes(' to ')) {
              const [minStr, maxStr] = correctKey.split(' to ');
              const min = parseFloat(minStr);
              const max = parseFloat(maxStr);
              isCorrect = numVal >= min && numVal <= max;
            } else {
              const target = parseFloat(correctKey);
              isCorrect = Math.abs(numVal - target) < 0.05;
            }
          }
          if (isCorrect) {
            score += q.marks;
            correctCount++;
          } else {
            incorrectCount++;
          }
        }
      } else {
        unattemptedCount++;
      }
    });

    onFinishTest({
      year: selectedPaper?.year || '2026',
      score: parseFloat(score.toFixed(2)),
      correctCount,
      incorrectCount,
      unattemptedCount,
      timeTakenSec: ((paperInstructions?.duration_mins || 180) * 60) - timeLeft,
      userAnswers,
      questionStates,
      paperQuestions
    });
  };

  const statusCounts = {
    NOT_VISITED: Object.values(questionStates).filter(s => s === 'NOT_VISITED').length,
    NOT_ANSWERED: Object.values(questionStates).filter(s => s === 'NOT_ANSWERED').length,
    ANSWERED: Object.values(questionStates).filter(s => s === 'ANSWERED').length,
    MARKED: Object.values(questionStates).filter(s => s === 'MARKED').length,
    ANSWERED_MARKED: Object.values(questionStates).filter(s => s === 'ANSWERED_MARKED').length,
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-150">
      
      <div className="bg-slate-900 text-white rounded-xl p-4 border border-slate-800 flex flex-wrap items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-base">
            AG
          </div>
          <div>
            <h2 className="font-bold text-sm sm:text-base tracking-tight">{selectedPaper?.title || `GATE ${selectedPaper?.year || ''} Test`}</h2>
            <p className="text-[11px] text-slate-400 font-medium">Max Marks: {paperInstructions?.max_marks} • Total Qs: {paperInstructions?.total_qs}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-300">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span>Clock: {realTimeStr}</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Elapsed: {formatTime(((paperInstructions?.duration_mins || 180) * 60) - timeLeft)}</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950 px-3.5 py-1.5 rounded-lg border border-slate-800">
            <span className="text-slate-400 font-semibold">Remaining:</span>
            <span className={`font-bold ${
              !paperInstructions?.is_untimed && timeLeft < 900 ? 'text-red-400 animate-pulse' : 'text-emerald-400'
            }`}>
              {paperInstructions?.is_untimed ? 'Untimed' : formatTime(timeLeft)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to exit this active CBT exam? Your progress will be reset.")) {
                setTestStarted(false);
                setSelectedPaper(null);
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-xs font-semibold text-rose-300 border border-slate-700 hover:border-rose-700 transition"
            title="Exit CBT & Return to Papers List"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Exit CBT</span>
          </button>

          <button
            onClick={() => setShowInstructionsModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700 transition"
          >
            <Info className="w-3.5 h-3.5 text-amber-400" />
            <span>Instructions</span>
          </button>

          <button
            onClick={onOpenCalc}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-blue-300 border border-slate-700 transition"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Scientific Calc</span>
          </button>

          <button
            onClick={() => setShowQuestionPaperModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700 transition"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Question Paper</span>
          </button>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-xs"
          >
            Submit Test
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-2 flex items-center gap-2 overflow-x-auto">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 shrink-0">Sections:</span>
            {paperInstructions?.ga_qs > 0 ? (
              <>
                <button
                  onClick={() => setActiveSection('GA')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                    activeSection === 'GA' ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  General Aptitude (GA)
                </button>
                <button
                  onClick={() => setActiveSection('AG')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                    activeSection === 'AG' ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  Agricultural Engineering (AG)
                </button>
              </>
            ) : (
              <button
                onClick={() => setActiveSection('ALL')}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-blue-600 text-white shadow-xs"
              >
                Agricultural Engineering ({paperInstructions?.max_marks} Marks)
              </button>
            )}
          </div>

          {currentQ && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs overflow-hidden flex flex-col min-h-[500px]">
              <div className="bg-slate-50 dark:bg-slate-800/80 px-6 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-900 dark:text-white font-bold">
                  Question No. {currentQ.qnum}
                </span>
                <div className="flex items-center gap-2">
                  {onEditQuestion && (
                    <button
                      onClick={() => onEditQuestion(currentQ)}
                      className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold hover:bg-purple-600 hover:text-white transition"
                      title="Edit Question Statement or Answer Key"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                  )}
                  <span className="bg-slate-200 dark:bg-slate-700 px-2.5 py-0.5 rounded font-mono">
                    {currentQ.type}
                  </span>
                  <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2.5 py-0.5 rounded font-bold">
                    Marks: {currentQ.marks}
                  </span>
                  {currentQ.type === 'MCQ' && (
                    <span className="text-slate-400">
                      Negative: -{currentQ.negative_marks}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6 flex-1">
                <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  {currentQ.section} • {currentQ.topic}
                </div>

                <div className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 leading-relaxed">
                  <MathRenderer content={currentQ.question} inline={false} />
                </div>

                {/* Official Diagram / Figure Display */}
                {currentQ.image_url && (
                  <div className="my-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center overflow-hidden space-y-2">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center justify-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Official Question Diagram / Figure / Chart</span>
                    </div>
                    <img
                      src={currentQ.image_url}
                      alt={`Diagram for ${currentQ.id}`}
                      className="max-h-[420px] w-auto mx-auto rounded-lg border border-slate-200 dark:border-slate-800 object-contain shadow-xs"
                    />
                  </div>
                )}

                {currentQ.type === 'MCQ' && currentQ.options && (
                  <div className="space-y-3 pt-2">
                    {Object.entries(currentQ.options).map(([optKey, optVal]) => {
                      const isSelected = userAnswers[currentQ.id] === optKey;
                      return (
                        <button
                          key={optKey}
                          onClick={() => handleSelectOption(optKey)}
                          className={`w-full text-left p-4 rounded-xl border transition flex items-start gap-3.5 text-sm sm:text-base font-medium ${
                            isSelected
                              ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/60 text-blue-900 dark:text-blue-100 font-bold shadow-xs'
                              : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 hover:border-blue-500 dark:hover:border-blue-600'
                          }`}
                        >
                          <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 border ${
                            isSelected 
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600'
                          }`}>
                            {optKey}
                          </span>
                          <div className="pt-0.5 flex-1">
                            <MathRenderer content={optVal} />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {currentQ.type === 'MSQ' && currentQ.options && (
                  <div className="space-y-3 pt-2">
                    <p className="text-xs text-slate-500 italic">Select all correct options (one or more).</p>
                    {Object.entries(currentQ.options).map(([optKey, optVal]) => {
                      const selectedList = userAnswers[currentQ.id] ? userAnswers[currentQ.id].split(',') : [];
                      const isChecked = selectedList.includes(optKey);
                      return (
                        <button
                          key={optKey}
                          onClick={() => handleSelectOption(optKey)}
                          className={`w-full text-left p-4 rounded-xl border transition flex items-start gap-3.5 text-sm sm:text-base font-medium ${
                            isChecked
                              ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/60 text-blue-900 dark:text-blue-100 font-bold shadow-xs'
                              : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 hover:border-blue-500 dark:hover:border-blue-600'
                          }`}
                        >
                          <span className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 border ${
                            isChecked 
                              ? 'bg-blue-600 text-white border-blue-600'
                              : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600'
                          }`}>
                            {optKey}
                          </span>
                          <div className="pt-0.5 flex-1">
                            <MathRenderer content={optVal} />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}

                {currentQ.type === 'NAT' && (
                  <div className="pt-2 space-y-3">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Numerical Answer Input
                    </label>
                    <input
                      type="number"
                      step="any"
                      placeholder="Enter value..."
                      value={userAnswers[currentQ.id] || ''}
                      onChange={(e) => handleNatInput(e.target.value)}
                      className="max-w-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm font-mono text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleMarkForReviewAndNext}
                    className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition shadow-xs"
                  >
                    Mark for Review & Next
                  </button>
                  <button
                    onClick={handleClearResponse}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                  >
                    Clear Response
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveAndNext}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-xs"
                  >
                    Save & Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Question Palette Toggle Button */}
        <button
          onClick={() => setShowMobilePalette(!showMobilePalette)}
          className="lg:hidden w-full py-3 px-4 rounded-xl bg-slate-900 dark:bg-slate-800 text-white text-xs font-bold flex items-center justify-between border border-slate-700 shadow-md"
        >
          <span className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-400" />
            <span>Question Palette & Status Grid ({paperQuestions.length} Qs)</span>
          </span>
          <span className="font-mono text-amber-400">{showMobilePalette ? 'Hide Palette ▲' : 'Show Palette ▼'}</span>
        </button>

        <div className={`lg:col-span-4 space-y-4 ${showMobilePalette ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-xs space-y-5">
            <div className="pb-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-white">Question Palette</span>
              <span className="text-[11px] text-slate-500 font-mono">GATE {selectedPaper?.year || ''}</span>
            </div>

            <div className="grid grid-cols-5 gap-2 max-h-[260px] overflow-y-auto pr-1">
              {activeQuestions.map((q) => {
                const paperIdx = paperQuestions.findIndex(pq => pq.id === q.id);
                const isCurrent = paperIdx === currentQIndex;
                const state = questionStates[q.id] || 'NOT_VISITED';

                let bgClass = "gate-status-not-visited";
                if (state === 'NOT_ANSWERED') bgClass = "gate-status-not-answered";
                if (state === 'ANSWERED') bgClass = "gate-status-answered";
                if (state === 'MARKED') bgClass = "gate-status-marked";
                if (state === 'ANSWERED_MARKED') bgClass = "gate-status-marked-ans";

                return (
                  <button
                    key={q.id}
                    onClick={() => navigateToQ(paperIdx)}
                    className={`h-9 rounded-lg font-mono text-xs font-bold border transition flex items-center justify-center ${bgClass} ${
                      isCurrent ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-900' : ''
                    }`}
                  >
                    {q.qnum}
                  </button>
                );
              })}
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px]">
              <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px] block mb-1">
                Palette Legend
              </span>

              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {statusCounts.NOT_VISITED}
                  </span>
                  <span className="text-slate-500">Not Visited</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold bg-red-500 text-white">
                    {statusCounts.NOT_ANSWERED}
                  </span>
                  <span className="text-slate-500">Not Answered</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold bg-emerald-600 text-white">
                    {statusCounts.ANSWERED}
                  </span>
                  <span className="text-slate-500">Answered</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold bg-purple-600 text-white">
                    {statusCounts.MARKED}
                  </span>
                  <span className="text-slate-500">Marked for Review</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showInstructionsModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-150">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h2 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Info className="w-5 h-5 text-amber-500" />
                <span>{selectedPaper?.title || `GATE ${selectedPaper?.year || ''}`} Examination Instructions</span>
              </h2>
              <button onClick={() => setShowInstructionsModal(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 max-h-[70vh] overflow-y-auto leading-relaxed">
              {paperInstructions?.instructions?.map((inst, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  {inst}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showQuestionPaperModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-150">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h2 className="font-bold text-base text-slate-900 dark:text-white">
                Full Question Paper ({selectedPaper?.title || `GATE ${selectedPaper?.year || ''}`})
              </h2>
              <button onClick={() => setShowQuestionPaperModal(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
              {paperQuestions.map((q) => (
                <div key={q.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                    <span>Q.{q.qnum} ({q.type})</span>
                    <span>{q.marks} {q.marks === 1 ? 'Mark' : 'Marks'}</span>
                  </div>
                  <div className="font-medium text-slate-900 dark:text-slate-100">
                    <MathRenderer content={q.question} />
                  </div>
                  {q.image_url && (
                    <img src={q.image_url} alt="Figure" className="max-h-64 mx-auto rounded border" />
                  )}
                  {q.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {Object.entries(q.options).map(([k, v]) => (
                        <div key={k} className="p-2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                          <span className="font-bold uppercase mr-2">{k}.</span>
                          <MathRenderer content={v} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-5 animate-in fade-in zoom-in duration-150">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-600 flex items-center justify-center mx-auto border border-amber-200 dark:border-amber-800">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Submit Test Confirmation</h3>
              <p className="text-xs text-slate-500">Submit your test session?</p>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-2 font-mono">
              <div className="flex justify-between">
                <span>Total Questions:</span>
                <span className="font-bold">{paperQuestions.length}</span>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span>Answered:</span>
                <span className="font-bold">{statusCounts.ANSWERED + statusCounts.ANSWERED_MARKED}</span>
              </div>
              <div className="flex justify-between text-red-500">
                <span>Unanswered:</span>
                <span className="font-bold">{statusCounts.NOT_ANSWERED}</span>
              </div>
              <div className="flex justify-between text-purple-600">
                <span>Marked for Review:</span>
                <span className="font-bold">{statusCounts.MARKED}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Resume Test
              </button>
              <button
                onClick={handleSubmitFinal}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
