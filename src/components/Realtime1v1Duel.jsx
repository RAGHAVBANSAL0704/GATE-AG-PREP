import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Swords, Trophy, Zap, Shield, Flame, UserCheck, Play, RotateCcw, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playCyberSound } from '../utils/cyberBreakSound';

const RIVALS = [
  { name: 'AIR-1 Aspirant (IIT KGP)', rank: 'Rank #1', avatar: '🥇', skill: 'Ultra Rapid Math' },
  { name: 'Hydraulic Specialist (TNAU)', rank: 'Rank #4', avatar: '💧', skill: 'Cavitation Barrage' },
  { name: 'Tractor Mechanist (PAU)', rank: 'Rank #9', avatar: '🚜', skill: 'Draft Shockwave' },
  { name: 'Dairy Tech Prodigy (NDRI)', rank: 'Rank #12', avatar: '🥛', skill: 'Spray Atomizer' }
];

const DUEL_QUESTIONS = [
  { q: 'Plow draft D = 0.4 kg/cm² × 25 cm × 12 cm. Draft D (kg):', ans: 120 },
  { q: 'Wheel slip S = (N_0 - N_L)/N_0 × 100. If N_0=100 & N_L=85, Slip (%):', ans: 15 },
  { q: 'Pump power P = (ρ g Q H)/1000. If Q=0.01 m³/s, H=20m, g=9.81, kW (1 dec):', ans: 2.0 },
  { q: 'USLE soil loss A = R K LS C P. If K=0.3, R=100, LS=2, C=0.5, P=1, A (t/ha/yr):', ans: 30 }
];

export default function Realtime1v1Duel({ breakXP, onAddXP }) {
  const [rival, setRival] = useState(RIVALS[0]);
  const [gameState, setGameState] = useState('lobby'); // lobby, dueling, victory, defeat
  const [playerHp, setPlayerHp] = useState(100);
  const [rivalHp, setRivalHp] = useState(100);
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [userAns, setUserAns] = useState('');
  const [feedback, setFeedback] = useState('');
  const [roundTime, setRoundTime] = useState(15);

  const timerRef = useRef(null);

  const startDuel = (selectedRival = RIVALS[0]) => {
    setRival(selectedRival);
    setPlayerHp(100);
    setRivalHp(100);
    setCurrentQIdx(0);
    setUserAns('');
    setFeedback('');
    setRoundTime(15);
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
            const nextH = h - 15;
            if (nextH <= 0) setGameState('defeat');
            return Math.max(0, nextH);
          });
          playCyberSound('bossHit');
          setFeedback('⏳ TIME EXPIRED! Rival launched counter-attack!');
          // Move to next question
          setCurrentQIdx(idx => (idx + 1) % DUEL_QUESTIONS.length);
          return 15;
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
      // 30% chance rival answers correctly on their side
      if (Math.random() < 0.3) {
        playCyberSound('bossHit');
        setPlayerHp(h => {
          const nextH = h - 12;
          if (nextH <= 0) setGameState('defeat');
          return Math.max(0, nextH);
        });
      }
    }, 4500);

    return () => clearInterval(aiInterval);
  }, [gameState]);

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    const q = DUEL_QUESTIONS[currentQIdx];
    const val = parseFloat(userAns);

    if (Math.abs(val - q.ans) < 0.2) {
      playCyberSound('laser');
      setRivalHp(h => {
        const nextH = h - 30;
        if (nextH <= 0) {
          setGameState('victory');
          confetti({ particleCount: 80 });
          onAddXP(200);
        }
        return Math.max(0, nextH);
      });
      setFeedback('💥 PERFECT HIT! Counter-attack wave launched at Rival!');
      onAddXP(50);
      setUserAns('');
      setRoundTime(15);
      setCurrentQIdx(idx => (idx + 1) % DUEL_QUESTIONS.length);
    } else {
      playCyberSound('explosion');
      setPlayerHp(h => {
        const nextH = h - 10;
        if (nextH <= 0) setGameState('defeat');
        return Math.max(0, nextH);
      });
      setFeedback(`❌ MISS! Correct answer: ${q.ans}`);
      setUserAns('');
    }
  };

  return (
    <div className="w-full bg-slate-950 border border-indigo-500/30 rounded-2xl p-6 shadow-2xl text-white">

      {/* DUEL LOBBY */}
      {gameState === 'lobby' && (
        <div className="max-w-2xl mx-auto text-center my-4">
          <div className="inline-flex p-3 bg-indigo-500/10 rounded-full border border-indigo-400/40 mb-3 text-indigo-400">
            <Swords className="w-8 h-8 animate-pulse" />
          </div>
          <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-400">
            REAL-TIME 1v1 GATE AG DUEL ARENA
          </h3>
          <p className="text-sm text-slate-300 mt-2 mb-6">
            Face off against top All-India aspirants in rapid math NAT speed battles. Answering correctly launches attack waves at your rival!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {RIVALS.map((r, idx) => (
              <div
                key={idx}
                onClick={() => setRival(r)}
                className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                  rival.name === r.name
                    ? 'border-indigo-400 bg-indigo-950/60 shadow-lg shadow-indigo-500/20'
                    : 'border-slate-800 bg-slate-900 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{r.avatar}</span>
                  <div>
                    <h4 className="font-bold text-sm text-white">{r.name}</h4>
                    <span className="text-xs text-indigo-400 font-mono block">{r.rank}</span>
                    <span className="text-xs text-slate-400 font-mono">Specialty: {r.skill}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => startDuel(rival)}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 font-black text-base rounded-xl shadow-xl shadow-indigo-500/30 flex items-center justify-center gap-2"
          >
            <Swords className="w-5 h-5" /> START 1v1 SPEED DUEL (+200 XP)
          </button>
        </div>
      )}

      {/* LIVE DUEL ARENA */}
      {gameState === 'dueling' && (
        <div className="space-y-6">

          {/* DUAL HEALTH HUD */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-900/80 p-4 rounded-xl border border-indigo-500/30">
            {/* PLAYER HUD */}
            <div className="p-3 bg-slate-950 rounded-lg border border-emerald-500/40">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-sm text-emerald-400 flex items-center gap-2">
                  🚜 YOU (GATE Aspirant)
                </span>
                <span className="text-xs font-mono text-emerald-300 font-bold">{playerHp} HP</span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${playerHp}%` }}
                />
              </div>
            </div>

            {/* RIVAL HUD */}
            <div className="p-3 bg-slate-950 rounded-lg border border-pink-500/40">
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-sm text-pink-400 flex items-center gap-2">
                  {rival.avatar} {rival.name}
                </span>
                <span className="text-xs font-mono text-pink-300 font-bold">{rivalHp} HP</span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-pink-500 transition-all duration-300"
                  style={{ width: `${rivalHp}%` }}
                />
              </div>
            </div>
          </div>

          {/* QUESTION ARENA */}
          <div className="bg-slate-900 border border-indigo-500/40 rounded-xl p-6 text-center shadow-inner relative">
            <div className="absolute top-4 right-4 bg-indigo-950 border border-indigo-400 px-3 py-1 rounded-full font-mono text-xs text-indigo-300 font-bold">
              ⏳ {roundTime}s REMAINING
            </div>

            <span className="text-xs uppercase font-mono text-indigo-400 font-bold tracking-widest block mb-2">
              SPEED NAT ROUND {currentQIdx + 1}
            </span>

            <h4 className="text-xl font-bold text-white mb-6">
              {DUEL_QUESTIONS[currentQIdx].q}
            </h4>

            <form onSubmit={handleAnswerSubmit} className="max-w-md mx-auto space-y-4">
              <input
                type="number"
                step="any"
                autoFocus
                placeholder="Type NAT Answer & Press Enter..."
                value={userAns}
                onChange={(e) => setUserAns(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-indigo-500/60 text-indigo-300 font-mono font-extrabold text-xl text-center focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />

              {feedback && (
                <div className="p-3 rounded-xl text-xs font-bold bg-slate-950 border border-indigo-500/40 text-indigo-300 animate-fade-in">
                  {feedback}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-pink-600 font-black rounded-xl text-white shadow-lg hover:from-indigo-400 hover:to-pink-500"
              >
                FIRE ATTACK WAVE ⚡
              </button>
            </form>
          </div>

        </div>
      )}

      {/* VICTORY SCREEN */}
      {gameState === 'victory' && (
        <div className="text-center my-8 p-6 bg-slate-900 border border-emerald-500/60 rounded-xl max-w-md mx-auto">
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-3 animate-bounce" />
          <h3 className="text-2xl font-black text-emerald-400">DUEL VICTORY!</h3>
          <p className="text-sm text-slate-300 my-2">You defeated {rival.name} in All-India 1v1 Speed Duel!</p>
          <div className="text-lg font-mono font-bold text-yellow-300 mb-6">+200 BREAK XP EARNED!</div>
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
        <div className="text-center my-8 p-6 bg-slate-900 border border-rose-500/60 rounded-xl max-w-md mx-auto">
          <div className="text-4xl mb-2">💔</div>
          <h3 className="text-2xl font-black text-rose-400">DUEL DEFEATED!</h3>
          <p className="text-sm text-slate-300 my-2">{rival.name} hit faster calculation responses.</p>
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
