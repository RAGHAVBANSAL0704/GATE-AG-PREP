import React, { useState, useEffect } from 'react';
import { Sparkles, Brain, RotateCcw, Check, Flame, ChevronRight, BookOpen, Clock } from 'lucide-react';
import MathRenderer from './MathRenderer';
import { saveToIDB, getAllFromIDB } from '../utils/indexedDB';

const INITIAL_FLASHCARDS = [
  { cardId: 'fc_1', topic: 'FMP', question: 'What is the standard PTO speed for tractors specified by BIS?', answer: '540 ± 10 rpm (Standard I) and 1000 ± 25 rpm (Standard II).' },
  { cardId: 'fc_2', topic: 'FMP', question: 'Formula for Theoretical Field Capacity (TFC)?', answer: 'TFC (ha/h) = \\frac{S \\times W}{10} where S = Speed (km/h) and W = Working Width (m).' },
  { cardId: 'fc_3', topic: 'SWCE', question: 'Rational Method Formula for Peak Runoff Discharge?', answer: 'Q = \\frac{C \\cdot I \\cdot A}{360} where Q in m³/s, C = runoff coeff, I in mm/h, A in hectares.' },
  { cardId: 'fc_4', topic: 'SWCE', question: 'What is the Critical Hydraulic Gradient (i_c) in Soil Mechanics?', answer: 'i_c = \\frac{G - 1}{1 + e} = (G - 1)(1 - n) where G = specific gravity, e = void ratio.' },
  { cardId: 'fc_5', topic: 'APFE', question: 'Relationship between Moisture Content Wet Basis (M_w) and Dry Basis (M_d)?', answer: 'M_d = \\frac{M_w}{1 - M_w} \\quad \\text{or} \\quad M_w = \\frac{M_d}{1 + M_d}.' },
  { cardId: 'fc_6', topic: 'APFE', question: 'Kick\'s Law of Size Reduction?', answer: 'E = C \\ln \\left(\\frac{D_1}{D_2}\\right). Energy is proportional to ratio of initial to final size.' },
  { cardId: 'fc_7', topic: 'Maths', question: 'Euler-Cauchy Differential Equation Form?', answer: 'x^2 \\frac{d^2y}{dx^2} + a x \\frac{dy}{dx} + b y = 0. Substitution: x = e^z.' },
  { cardId: 'fc_8', topic: 'FMP', question: 'Tractor Wheel Slip Formula?', answer: 'S = \\left( 1 - \\frac{V_a}{V_t} \\right) \\times 100\\% where V_a = actual speed, V_t = theoretical speed.' }
];

export default function SpacedRepetitionFlashcards() {
  const [cards, setCards] = useState(INITIAL_FLASHCARDS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardStats, setCardStats] = useState({});
  const [streakCount, setStreakCount] = useState(0);

  useEffect(() => {
    async function loadStats() {
      const saved = await getAllFromIDB('flashcards');
      if (Array.isArray(saved) && saved.length > 0) {
        const map = {};
        saved.forEach(c => { map[c.cardId] = c; });
        setCardStats(map);
      }
    }
    loadStats();
  }, []);

  const currentCard = cards[currentIndex] || cards[0];
  const currentCardState = cardStats[currentCard.cardId] || { repetitions: 0, interval: 1, easeFactor: 2.5 };

  /**
   * SuperMemo SM-2 Spaced Repetition Algorithm
   * Rating q: 1 (Again), 2 (Hard), 3 (Good), 4 (Easy)
   */
  const handleRateCard = async (rating) => {
    let { repetitions, interval, easeFactor } = currentCardState;

    if (rating === 1) {
      // Again: reset repetitions
      repetitions = 0;
      interval = 1;
    } else {
      if (repetitions === 0) interval = 1;
      else if (repetitions === 1) interval = 6;
      else interval = Math.round(interval * easeFactor);

      repetitions += 1;
    }

    // Update Ease Factor (EF)
    // EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
    const qScore = rating + 1; // map 1..4 to 2..5
    easeFactor = easeFactor + (0.1 - (5 - qScore) * (0.08 + (5 - qScore) * 0.02));
    if (easeFactor < 1.3) easeFactor = 1.3;

    const updatedState = { cardId: currentCard.cardId, repetitions, interval, easeFactor, lastReviewed: new Date().toISOString() };
    const newStats = { ...cardStats, [currentCard.cardId]: updatedState };
    setCardStats(newStats);
    await saveToIDB('flashcards', updatedState);

    setStreakCount(prev => prev + 1);
    setIsFlipped(false);

    if (currentIndex < cards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
      
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 text-xs font-bold">
              <Brain className="w-3.5 h-3.5" />
              <span>Anki SM-2 Spaced Repetition Engine</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              GATE AG High-Yield Flashcard Revision
            </h1>
            <p className="text-xs text-slate-500 max-w-xl">
              Master formulas, constants, and soil mechanics definitions using SuperMemo SM-2 memory retention scheduling.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-4 py-2 rounded-2xl text-amber-500 font-extrabold text-xs">
            <Flame className="w-4 h-4 fill-amber-500" />
            <span>Streak: {streakCount} Cards Reviewed</span>
          </div>
        </div>
      </div>

      {/* Main Flashcard Flip Container */}
      <div className="space-y-4">
        
        <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-2">
          <span>Card {currentIndex + 1} of {cards.length} • {currentCard.topic}</span>
          <span className="font-mono">Interval: {currentCardState.interval}d | EF: {currentCardState.easeFactor.toFixed(2)}</span>
        </div>

        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="cursor-pointer bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-amber-500 dark:hover:border-amber-500 rounded-3xl p-8 sm:p-12 min-h-[260px] flex flex-col items-center justify-center text-center space-y-4 shadow-md transition-all transform hover:-translate-y-0.5"
        >
          <div className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
            {isFlipped ? 'Answer (Click to Flip Back)' : 'Question (Click to Reveal Answer)'}
          </div>

          <div className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
            <MathRenderer math={isFlipped ? currentCard.answer : currentCard.question} />
          </div>

          {!isFlipped && (
            <div className="text-xs text-amber-500 font-bold flex items-center gap-1">
              <span>Click card or press Space to flip answer</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          )}
        </div>

        {/* SM-2 Rating Buttons */}
        {isFlipped && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-in fade-in">
            <button
              onClick={() => handleRateCard(1)}
              className="p-3.5 rounded-2xl bg-rose-500 hover:bg-rose-400 text-white font-extrabold text-xs transition shadow-sm space-y-0.5"
            >
              <div>1: Again</div>
              <div className="text-[10px] font-normal opacity-80">Reset (&lt; 1d)</div>
            </button>

            <button
              onClick={() => handleRateCard(2)}
              className="p-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition shadow-sm space-y-0.5"
            >
              <div>2: Hard</div>
              <div className="text-[10px] font-normal opacity-80">Hard (1.2×)</div>
            </button>

            <button
              onClick={() => handleRateCard(3)}
              className="p-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition shadow-sm space-y-0.5"
            >
              <div>3: Good</div>
              <div className="text-[10px] font-normal opacity-80">Good (2.5×)</div>
            </button>

            <button
              onClick={() => handleRateCard(4)}
              className="p-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs transition shadow-sm space-y-0.5"
            >
              <div>4: Easy</div>
              <div className="text-[10px] font-normal opacity-80">Easy (3.5×)</div>
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
