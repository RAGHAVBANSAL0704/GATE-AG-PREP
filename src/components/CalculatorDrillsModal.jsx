import React, { useState, useEffect } from 'react';
import { Calculator, Trophy, Zap, RefreshCw, CheckCircle2, XCircle, Clock, X } from 'lucide-react';
import MathRenderer from './MathRenderer';

const DRILL_QUESTIONS = [
  { id: 1, expr: '\\ln(5.4) \\times \\sqrt{14.2}', answer: 6.37, tolerance: 0.05, hint: 'Calculate ln(5.4) then multiply by sqrt(14.2)' },
  { id: 2, expr: '\\sin(35^\\circ) \\times 1000', answer: 573.58, tolerance: 1.0, hint: 'Ensure calculator is in DEG mode! sin(35) * 1000' },
  { id: 3, expr: '\\frac{4.5 \\times 10^6}{9.81 \\times 1000}', answer: 458.72, tolerance: 1.0, hint: 'Divide 4,500,000 by 9810' },
  { id: 4, expr: '\\frac{1 - e^{-0.5}}{0.5}', answer: 0.787, tolerance: 0.01, hint: 'Find e^(-0.5), subtract from 1, divide by 0.5' },
  { id: 5, expr: '\\log_{10}(2500) + 12.5', answer: 15.898, tolerance: 0.05, hint: 'log10(2500) is ~3.398 + 12.5' },
  { id: 6, expr: '\\sqrt{8.5^2 + 12.4^2}', answer: 15.034, tolerance: 0.1, hint: 'Pythagoras: 72.25 + 153.76 = 226.01, sqrt is 15.034' },
  { id: 7, expr: '\\frac{350 \\times 0.85}{75} \\times 9.81', answer: 38.91, tolerance: 0.5, hint: 'Power/efficiency conversion factor' },
  { id: 8, expr: '\\cos(42^\\circ) \\times 25.4', answer: 18.87, tolerance: 0.1, hint: 'cos(42) in DEG mode * 25.4' },
  { id: 9, expr: 'e^{1.25} \\times 4.2', answer: 14.66, tolerance: 0.1, hint: 'exp(1.25) * 4.2' },
  { id: 10, expr: '\\tan(28^\\circ) \\times 15.0', answer: 7.976, tolerance: 0.05, hint: 'tan(28) in DEG * 15' }
];

export default function CalculatorDrillsModal({ isOpen, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInputs, setUserInputs] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (isOpen && !startTime) {
      setStartTime(Date.now());
      setIsCompleted(false);
      setCurrentIndex(0);
      setUserInputs({});
    }
  }, [isOpen]);

  useEffect(() => {
    let timer = null;
    if (isOpen && startTime && !isCompleted) {
      timer = setInterval(() => {
        setElapsedSec(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen, startTime, isCompleted]);

  if (!isOpen) return null;

  const currentQ = DRILL_QUESTIONS[currentIndex];
  const totalQs = DRILL_QUESTIONS.length;

  const handleNext = () => {
    if (currentIndex < totalQs - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    DRILL_QUESTIONS.forEach(q => {
      const uVal = parseFloat(userInputs[q.id]);
      if (!isNaN(uVal) && Math.abs(uVal - q.answer) <= q.tolerance) {
        correct++;
      }
    });

    const cpm = elapsedSec > 0 ? ((correct / elapsedSec) * 60).toFixed(1) : 0;
    return { correct, total: totalQs, cpm, elapsedSec };
  };

  const results = isCompleted ? calculateScore() : null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden text-slate-900 dark:text-white flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
            <h2 className="text-base font-extrabold">TCS Virtual Calculator Finger-Memory Speed Drill</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Content */}
        {!isCompleted ? (
          <div className="p-6 space-y-6 flex-1">
            
            <div className="flex items-center justify-between text-xs font-bold text-slate-400">
              <span>Question {currentIndex + 1} of {totalQs}</span>
              <span className="flex items-center gap-1 font-mono text-amber-500">
                <Clock className="w-3.5 h-3.5" />
                {Math.floor(elapsedSec / 60)}m {elapsedSec % 60}s
              </span>
            </div>

            {/* Expression Box */}
            <div className="p-6 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center space-y-3">
              <div className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">Evaluate Target Expression</div>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-amber-400">
                <MathRenderer math={`\\mathbf{${currentQ.expr}}`} />
              </div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                💡 {currentQ.hint}
              </div>
            </div>

            {/* Answer Input */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-400">
                Enter Result (Round appropriately or exact decimal):
              </label>
              <input
                type="number"
                step="any"
                autoFocus
                placeholder="e.g. 6.37"
                value={userInputs[currentQ.id] || ''}
                onChange={(e) => setUserInputs({ ...userInputs, [currentQ.id]: e.target.value })}
                onKeyDown={(e) => { if (e.key === 'Enter') handleNext(); }}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-lg font-mono font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between pt-2">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(prev => prev - 1)}
                className="px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-40 text-xs font-bold transition cursor-pointer"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition shadow-md cursor-pointer"
              >
                {currentIndex === totalQs - 1 ? 'Finish & Analyze Speed' : 'Submit & Next →'}
              </button>
            </div>

          </div>
        ) : (
          /* Results View */
          <div className="p-6 space-y-6 text-center animate-in fade-in">
            <Trophy className="w-12 h-12 text-amber-500 mx-auto fill-amber-500/20" />
            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">Drill Completed!</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">TCS Scientific Calculator Speed & Accuracy Report</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="text-[10px] uppercase font-bold text-slate-600 dark:text-slate-400">Accuracy</div>
                <div className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono mt-1">
                  {results.correct} / {results.total}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="text-[10px] uppercase font-bold text-slate-600 dark:text-slate-400">Speed (CPM)</div>
                <div className="text-xl font-extrabold text-amber-600 dark:text-amber-400 font-mono mt-1">
                  {results.cpm}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="text-[10px] uppercase font-bold text-slate-600 dark:text-slate-400">Total Time</div>
                <div className="text-xl font-extrabold text-purple-600 dark:text-purple-400 font-mono mt-1">
                  {results.elapsedSec}s
                </div>
              </div>
            </div>

            <div className="space-y-2 text-left text-xs max-h-48 overflow-y-auto pr-1">
              <div className="font-bold text-slate-600 dark:text-slate-400 text-[10px] uppercase">Detailed Question Breakdown</div>
              {DRILL_QUESTIONS.map((q, idx) => {
                const uVal = parseFloat(userInputs[q.id]);
                const isOk = !isNaN(uVal) && Math.abs(uVal - q.answer) <= q.tolerance;
                return (
                  <div key={q.id} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
                    <span className="font-mono text-slate-800 dark:text-slate-200">Q{idx + 1}. Expected: {q.answer}</span>
                    <span className={`font-mono font-bold flex items-center gap-1 ${isOk ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                      {isOk ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      Entered: {userInputs[q.id] || 'None'}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setStartTime(Date.now());
                  setIsCompleted(false);
                  setCurrentIndex(0);
                  setUserInputs({});
                }}
                className="flex-1 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-extrabold text-xs transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Retry Drill</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition cursor-pointer"
              >
                Done
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
