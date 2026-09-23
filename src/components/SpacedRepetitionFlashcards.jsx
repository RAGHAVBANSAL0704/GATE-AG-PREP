import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sparkles, 
  Brain, 
  RotateCcw, 
  Check, 
  Flame, 
  ChevronRight, 
  ChevronLeft,
  BookOpen, 
  Clock, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Award
} from 'lucide-react';
import MathRenderer from './MathRenderer';
import { saveToIDB, getAllFromIDB } from '../utils/indexedDB';
import { GATE_AG_FLASHCARDS } from '../data/flashcardsData.js';

export default function SpacedRepetitionFlashcards() {
  const [selectedTopic, setSelectedTopic] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardStats, setCardStats] = useState({});
  const [streakCount, setStreakCount] = useState(0);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

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

  const topics = [
    { id: 'ALL', label: 'All Subjects', count: GATE_AG_FLASHCARDS.length },
    { id: 'FMP', label: 'Farm Machinery & Power', count: GATE_AG_FLASHCARDS.filter(c => c.topic === 'FMP').length },
    { id: 'SWCE', label: 'Soil & Water / Hydrology', count: GATE_AG_FLASHCARDS.filter(c => c.topic === 'SWCE').length },
    { id: 'APFE', label: 'Process & Food Engg', count: GATE_AG_FLASHCARDS.filter(c => c.topic === 'APFE').length },
    { id: 'Maths', label: 'Engg Mathematics', count: GATE_AG_FLASHCARDS.filter(c => c.topic === 'Maths').length },
    { id: 'GA', label: 'General Aptitude', count: GATE_AG_FLASHCARDS.filter(c => c.topic === 'GA').length },
  ];

  const filteredCards = useMemo(() => {
    let list = GATE_AG_FLASHCARDS;
    if (selectedTopic !== 'ALL') {
      list = list.filter(c => c.topic === selectedTopic);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(c => 
        c.question.toLowerCase().includes(q) || 
        c.answer.toLowerCase().includes(q)
      );
    }
    return list;
  }, [selectedTopic, searchQuery]);

  // Adjust current index if filter changes
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [selectedTopic, searchQuery]);

  const currentCard = filteredCards[currentIndex] || filteredCards[0] || GATE_AG_FLASHCARDS[0];
  const currentCardState = cardStats[currentCard?.cardId] || { repetitions: 0, interval: 1, easeFactor: 2.5 };

  // Calculate Mastery Metrics
  const masteryMetrics = useMemo(() => {
    let mastered = 0;
    let learning = 0;
    let fresh = 0;

    filteredCards.forEach(c => {
      const s = cardStats[c.cardId];
      if (!s || s.repetitions === 0) {
        fresh += 1;
      } else if (s.repetitions >= 3 && s.easeFactor >= 2.3) {
        mastered += 1;
      } else {
        learning += 1;
      }
    });

    const total = filteredCards.length || 1;
    return {
      mastered,
      learning,
      fresh,
      masteredPct: Math.round((mastered / total) * 100),
      learningPct: Math.round((learning / total) * 100),
      freshPct: Math.round((fresh / total) * 100)
    };
  }, [filteredCards, cardStats]);

  /**
   * SuperMemo SM-2 Spaced Repetition Algorithm
   * Rating q: 1 (Again), 2 (Hard), 3 (Good), 4 (Easy)
   */
  const handleRateCard = async (rating) => {
    if (!currentCard) return;
    let { repetitions, interval, easeFactor } = currentCardState;

    if (rating === 1) {
      repetitions = 0;
      interval = 1;
    } else {
      if (repetitions === 0) interval = 1;
      else if (repetitions === 1) interval = 6;
      else interval = Math.round(interval * easeFactor);

      repetitions += 1;
    }

    const qScore = rating + 1; // map 1..4 to 2..5
    easeFactor = easeFactor + (0.1 - (5 - qScore) * (0.08 + (5 - qScore) * 0.02));
    if (easeFactor < 1.3) easeFactor = 1.3;

    const updatedState = { 
      cardId: currentCard.cardId, 
      repetitions, 
      interval, 
      easeFactor, 
      lastReviewed: new Date().toISOString() 
    };
    const newStats = { ...cardStats, [currentCard.cardId]: updatedState };
    setCardStats(newStats);
    await saveToIDB('flashcards', updatedState);

    setStreakCount(prev => prev + 1);
    setIsFlipped(false);

    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setCurrentIndex(filteredCards.length - 1);
    }
  };

  const handleResetDeck = async () => {
    setCardStats({});
    setStreakCount(0);
    setShowResetConfirm(false);
    // Note: IDB clear or reset
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeTag = document.activeElement?.tagName?.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea') return;

      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (isFlipped) {
        if (e.key === '1') handleRateCard(1);
        else if (e.key === '2') handleRateCard(2);
        else if (e.key === '3') handleRateCard(3);
        else if (e.key === '4') handleRateCard(4);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped, currentIndex, filteredCards]);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 space-y-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 text-xs font-bold border border-amber-200 dark:border-amber-800/60">
              <Brain className="w-3.5 h-3.5" />
              <span>Anki SuperMemo SM-2 Spaced Repetition</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              High-Yield Spaced Repetition Decks
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl">
              Reinforce formulas, soil mechanics constants, grain properties, and math identities across {GATE_AG_FLASHCARDS.length} curated active-recall flashcards.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-2 rounded-2xl text-amber-500 font-extrabold text-xs">
              <Flame className="w-4 h-4 fill-amber-500" />
              <span>Streak: {streakCount}</span>
            </div>

            <button
              onClick={() => setShowResetConfirm(true)}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="Reset Deck Progress"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mastery Progress Bar */}
        <div className="space-y-2 pt-1 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-wrap items-center justify-between text-xs font-bold gap-2">
            <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>Deck Mastery Overview ({filteredCards.length} Cards)</span>
            </span>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Mastered: {masteryMetrics.mastered} ({masteryMetrics.masteredPct}%)
              </span>
              <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                Learning: {masteryMetrics.learning} ({masteryMetrics.learningPct}%)
              </span>
              <span className="text-slate-500 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                New: {masteryMetrics.fresh} ({masteryMetrics.freshPct}%)
              </span>
            </div>
          </div>

          <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex shadow-inner">
            <div 
              style={{ width: `${masteryMetrics.masteredPct}%` }} 
              className="bg-emerald-500 transition-all duration-300"
              title={`Mastered: ${masteryMetrics.mastered}`}
            />
            <div 
              style={{ width: `${masteryMetrics.learningPct}%` }} 
              className="bg-amber-500 transition-all duration-300"
              title={`Learning: ${masteryMetrics.learning}`}
            />
            <div 
              style={{ width: `${masteryMetrics.freshPct}%` }} 
              className="bg-slate-300 dark:bg-slate-700 transition-all duration-300"
              title={`New: ${masteryMetrics.fresh}`}
            />
          </div>
        </div>

        {/* Subject Filter Pills & Search */}
        <div className="flex flex-col md:flex-row gap-3 pt-1">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search flashcards by question or formula..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition"
            />
          </div>

          {/* Subject Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {topics.map(t => (
              <button
                key={t.id}
                onClick={() => setSelectedTopic(t.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 ${
                  selectedTopic === t.id
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>{t.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  selectedTopic === t.id ? 'bg-amber-600 text-white' : 'bg-slate-200 dark:bg-slate-700'
                }`}>
                  {t.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* No matching cards */}
      {filteredCards.length === 0 ? (
        <div className="card-3d rounded-3xl p-12 text-center space-y-3">
          <HelpCircle className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="font-bold text-slate-900 dark:text-white">No flashcards found</h3>
          <p className="text-xs text-slate-500">Try changing your search term or select &quot;All Subjects&quot;.</p>
          <button 
            onClick={() => { setSelectedTopic('ALL'); setSearchQuery(''); }}
            className="px-4 py-2 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 font-bold text-xs"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        /* Main Flashcard Container */
        <div className="space-y-4">
          
          {/* Card Position & Navigation Toolbar */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 px-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono">
                {currentCard.topic}
              </span>
              <span>Card {currentIndex + 1} of {filteredCards.length}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] hidden sm:inline">
                Interval: {currentCardState.interval}d | EF: {currentCardState.easeFactor.toFixed(2)} | Reps: {currentCardState.repetitions}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrev}
                  className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition"
                  title="Previous Card (Left Arrow)"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition"
                  title="Next Card (Right Arrow)"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Interactive 3D Flip Card */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-amber-500 dark:hover:border-amber-500 rounded-3xl p-8 sm:p-12 min-h-[280px] flex flex-col items-center justify-center text-center space-y-5 shadow-md transition-all transform hover:-translate-y-0.5"
          >
            <div className="text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {isFlipped ? 'Answer (Click or Space to Flip)' : 'Question (Click or Space to Reveal)'}
            </div>

            <div className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white max-w-2xl leading-relaxed">
              <MathRenderer content={isFlipped ? currentCard.answer : currentCard.question} />
            </div>

            {!isFlipped ? (
              <div className="text-xs text-amber-500 font-bold flex items-center gap-1.5 pt-2">
                <span>Click card or press [Space] to reveal answer</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            ) : (
              <div className="text-[11px] text-slate-400 font-medium pt-1">
                Rate your recall below (Keys: 1, 2, 3, 4)
              </div>
            )}
          </div>

          {/* SM-2 Rating Buttons */}
          {isFlipped && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-in fade-in">
              <button
                onClick={() => handleRateCard(1)}
                className="p-3.5 rounded-2xl bg-rose-500 hover:bg-rose-400 text-white font-extrabold text-xs transition shadow-xs space-y-0.5"
              >
                <div>[1] Again</div>
                <div className="text-[10px] font-normal opacity-85">Reset (&lt; 1d)</div>
              </button>

              <button
                onClick={() => handleRateCard(2)}
                className="p-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition shadow-xs space-y-0.5"
              >
                <div>[2] Hard</div>
                <div className="text-[10px] font-normal opacity-85">Repeat sooner (1.2×)</div>
              </button>

              <button
                onClick={() => handleRateCard(3)}
                className="p-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition shadow-xs space-y-0.5"
              >
                <div>[3] Good</div>
                <div className="text-[10px] font-normal opacity-85">Standard interval (2.5×)</div>
              </button>

              <button
                onClick={() => handleRateCard(4)}
                className="p-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs transition shadow-xs space-y-0.5"
              >
                <div>[4] Easy</div>
                <div className="text-[10px] font-normal opacity-85">Long interval (3.5×)</div>
              </button>
            </div>
          )}

        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 max-w-sm w-full shadow-2xl space-y-4 text-center">
            <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              Reset Deck Mastery Progress?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              This will reset all your review intervals, ease factors, and streak counts back to beginning.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleResetDeck}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-500 transition shadow-xs"
              >
                Yes, Reset
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

