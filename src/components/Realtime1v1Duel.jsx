import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Swords, Trophy, Zap, Shield, Flame, UserCheck, Play, RotateCcw, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playCyberSound } from '../utils/cyberBreakSound';

const RIVALS = [
  { name: 'Speed Runner Turbo', rank: 'Master Tier', avatar: '⚡', skill: 'Lightning Reflexes' },
  { name: 'Neon Samurai', rank: 'Diamond Tier', avatar: '⚔️', skill: 'Blade Flash' },
  { name: 'Cyber Phantom', rank: 'Grandmaster', avatar: '👾', skill: 'Hypersonic Tap' },
  { name: 'Pixel Champion', rank: 'Arcade Legend', avatar: '👑', skill: 'Combo Burst' }
];

// FAST, JOYFUL MENTAL REFRESH QUESTIONS (Simple, Punchy, Fun)
const DUEL_QUESTIONS = [
  { q: '7 × 8 = ?', ans: 56 },
  { q: '25 + 38 = ?', ans: 63 },
  { q: '100 - 37 = ?', ans: 63 },
  { q: '9 × 6 = ?', ans: 54 },
  { q: '45 + 55 = ?', ans: 100 },
  { q: '12 × 4 = ?', ans: 48 },
  { q: '80 - 24 = ?', ans: 56 },
  { q: '63 ÷ 7 = ?', ans: 9 },
  { q: '15 + 29 = ?', ans: 44 },
  { q: '8 × 8 = ?', ans: 64 },
  { q: '120 - 45 = ?', ans: 75 },
  { q: '72 ÷ 8 = ?', ans: 9 },
  { q: '16 × 3 = ?', ans: 48 },
  { q: '33 + 47 = ?', ans: 80 },
  { q: '9 × 9 = ?', ans: 81 }
];

export default function Realtime1v1Duel({ breakXP, onAddXP }) {
  const [rival, setRival] = useState(RIVALS[0]);
  const [gameState, setGameState] = useState('lobby'); // lobby, dueling, victory, defeat
  const [playerHp, setPlayerHp] = useState(100);
  const [rivalHp, setRivalHp] = useState(100);
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [userAns, setUserAns] = useState('');
  const [feedback, setFeedback] = useState('');
  const [roundTime, setRoundTime] = useState(10);
  const [streak, setStreak] = useState(0);

  const timerRef = useRef(null);

  const startDuel = (selectedRival = RIVALS[0]) => {
    setRival(selectedRival);
    setPlayerHp(100);
    setRivalHp(100);
    setCurrentQIdx(Math.floor(Math.random() * DUEL_QUESTIONS.length));
    setUserAns('');
    setFeedback('');
    setRoundTime(10);
    setStreak(0);
    setGameState('dueling');
    playCyberSound('powerup');
  };

  // Timer loop for round
  useEffect(() => {
    if (gameState !== 'dueling') return;

    timerRef.current = setInterval(() => {
      setRoundTime(prev => {
        if (prev <= 1) {
          // Time expired - rival hits player!
          setPlayerHp(h => {
            const nextH = h - 18;
            if (nextH <= 0) setGameState('defeat');
            return Math.max(0, nextH);
          });
          playCyberSound('bossHit');
          setFeedback('⏳ TIME EXPIRED! Rival landed a quick counter-strike!');
          setStreak(0);
          // Move to next question
          setCurrentQIdx(idx => (idx + 1) % DUEL_QUESTIONS.length);
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [gameState]);

  // AI Rival background damage tick simulation
  useEffect(() => {
    if (gameState !== 'dueling') return;
    const aiInterval = setInterval(() => {
      // 25% chance rival attacks on timer tick
      if (Math.random() < 0.25) {
        playCyberSound('bossHit');
        setPlayerHp(h => {
          const nextH = h - 10;
          if (nextH <= 0) setGameState('defeat');
          return Math.max(0, nextH);
        });
      }
    }, 4000);

    return () => clearInterval(aiInterval);
  }, [gameState]);

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    const q = DUEL_QUESTIONS[currentQIdx];
    const val = parseFloat(userAns);

    if (val === q.ans) {
      playCyberSound('laser');
      setStreak(s => s + 1);
      setRivalHp(h => {
        const nextH = h - 35;
        if (nextH <= 0) {
          setGameState('victory');
          confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
          onAddXP(200);
        }
        return Math.max(0, nextH);
      });
      setFeedback('💥 PERFECT CRITICAL HIT! Rival took heavy damage!');
      onAddXP(30);
      setUserAns('');
      setRoundTime(10);
      setCurrentQIdx(idx => (idx + 1) % DUEL_QUESTIONS.length);
    } else {
      playCyberSound('explosion');
      setStreak(0);
      setPlayerHp(h => {
        const nextH = h - 12;
        if (nextH <= 0) setGameState('defeat');
        return Math.max(0, nextH);
      });
      setFeedback(`❌ MISS! Correct answer: ${q.ans}`);
      setUserAns('');
    }
  };

  return (
    <div className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-indigo-500/30 rounded-2xl p-6 shadow-xl text-slate-900 dark:text-white">

      {/* DUEL LOBBY */}
      {gameState === 'lobby' && (
        <div className="max-w-2xl mx-auto text-center my-4">
          <div className="inline-flex p-3 bg-indigo-500/10 rounded-full border border-indigo-400/40 mb-3 text-indigo-600 dark:text-indigo-400">
            <Swords className="w-8 h-8 animate-pulse" />
          </div>
          <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:to-pink-400">
            1v1 RAPID REFLEX SPEED CLASH ⚔️
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 mb-6">
            Challenge arcade speed rivals in lightning-fast reflex battles! Rapid correct hits launch laser counter-attacks!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {RIVALS.map((r, idx) => (
              <div
                key={idx}
                onClick={() => setRival(r)}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                  rival.name === r.name
                    ? 'border-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/60 shadow-lg shadow-indigo-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{r.avatar}</span>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{r.name}</h4>
                    <span className="text-xs text-indigo-700 dark:text-indigo-400 font-mono block">{r.rank}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Style: {r.skill}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => startDuel(rival)}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 font-black text-base rounded-xl shadow-xl shadow-indigo-500/30 text-white flex items-center justify-center gap-2"
          >
            <Swords className="w-5 h-5" /> START 1v1 SPEED DUEL (+200 XP)
          </button>
        </div>
      )}

      {/* LIVE DUEL ARENA */}
      {gameState === 'dueling' && (
        <div className="space-y-6">

          {/* DUAL HEALTH HUD */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-900/80 p-4 rounded-xl border border-slate-200 dark:border-indigo-500/30">
            {/* PLAYER HUD */}
            <div className="p-3 bg-white dark:bg-slate-950 rounded-lg border border-emerald-300 dark:border-emerald-500/40">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                  🚜 YOU {streak > 1 && <span className="text-xs bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded-full font-mono font-bold">Combo x{streak}</span>}
                </span>
                <span className="text-xs font-mono text-emerald-700 dark:text-emerald-300 font-bold">{playerHp} HP</span>
              </div>
              <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${playerHp}%` }}
                />
              </div>
            </div>

            {/* RIVAL HUD */}
            <div className="p-3 bg-white dark:bg-slate-950 rounded-lg border border-pink-300 dark:border-pink-500/40">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-sm text-pink-600 dark:text-pink-400 flex items-center gap-2">
                  {rival.avatar} {rival.name}
                </span>
                <span className="text-xs font-mono text-pink-700 dark:text-pink-300 font-bold">{rivalHp} HP</span>
              </div>
              <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-pink-500 transition-all duration-300"
                  style={{ width: `${rivalHp}%` }}
                />
              </div>
            </div>
          </div>

          {/* QUESTION ARENA */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-indigo-500/40 rounded-xl p-6 text-center shadow-inner relative">
            <div className="absolute top-4 right-4 bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-400 px-3 py-1 rounded-full font-mono text-xs text-indigo-700 dark:text-indigo-300 font-bold">
              ⏳ {roundTime}s
            </div>

            <span className="text-xs uppercase font-mono text-indigo-600 dark:text-indigo-400 font-bold tracking-widest block mb-2">
              SPEED REFLEX ROUND
            </span>

            <h4 className="text-3xl font-black text-slate-900 dark:text-white mb-6 tracking-wide">
              {DUEL_QUESTIONS[currentQIdx].q}
            </h4>

            <form onSubmit={handleAnswerSubmit} className="max-w-md mx-auto space-y-4">
              <input
                type="number"
                step="1"
                autoFocus
                placeholder="Answer & Enter..."
                value={userAns}
                onChange={(e) => setUserAns(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-indigo-500/60 text-slate-900 dark:text-indigo-300 font-mono font-extrabold text-2xl text-center focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />

              {feedback && (
                <div className="p-3 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-indigo-500/40 text-indigo-700 dark:text-indigo-300 animate-fade-in">
                  {feedback}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 font-black rounded-xl text-white shadow-lg"
              >
                FIRE ATTACK WAVE ⚡
              </button>
            </form>
          </div>

        </div>
      )}

      {/* VICTORY SCREEN */}
      {gameState === 'victory' && (
        <div className="text-center my-8 p-6 bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-500/60 rounded-xl max-w-md mx-auto shadow-lg">
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-3 animate-bounce" />
          <h3 className="text-2xl font-black text-emerald-600 dark:text-emerald-400">DUEL VICTORY! 🏆</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 my-2">You defeated {rival.name} in lightning reflex speed!</p>
          <div className="text-lg font-mono font-bold text-amber-600 dark:text-yellow-300 mb-6">+200 BREAK XP EARNED!</div>
          <button
            onClick={() => setGameState('lobby')}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 font-bold rounded-xl text-white shadow-lg"
          >
            RETURN TO DUEL LOBBY
          </button>
        </div>
      )}

      {/* DEFEAT SCREEN */}
      {gameState === 'defeat' && (
        <div className="text-center my-8 p-6 bg-white dark:bg-slate-900 border border-rose-300 dark:border-rose-500/60 rounded-xl max-w-md mx-auto shadow-lg">
          <div className="text-4xl mb-2">💔</div>
          <h3 className="text-2xl font-black text-rose-600 dark:text-rose-400">DUEL DEFEATED!</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 my-2">{rival.name} had faster reflex speed this round.</p>
          <button
            onClick={() => setGameState('lobby')}
            className="w-full py-3 mt-4 bg-rose-600 hover:bg-rose-500 font-bold rounded-xl text-white shadow-lg"
          >
            TRY AGAIN
          </button>
        </div>
      )}

    </div>
  );
}
