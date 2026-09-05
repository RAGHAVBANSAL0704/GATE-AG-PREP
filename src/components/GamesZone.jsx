import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Gamepad2, 
  RotateCcw, 
  Trophy, 
  Zap, 
  Play, 
  XCircle, 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight,
  Shield, 
  Target, 
  Sparkles, 
  HelpCircle, 
  Wrench, 
  Layers, 
  CheckCircle2, 
  Sun, 
  Volume2, 
  VolumeX, 
  Search, 
  ArrowLeft as ArrowLeftIcon, 
  Award, 
  Medal, 
  Building2, 
  Flame, 
  Activity, 
  Droplets, 
  Crosshair, 
  Timer,
  Maximize2,
  Minimize2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../utils/soundFX';
import { 
  getLocalBreakXP, 
  addBreakXP, 
  getLeaderboardData, 
  getActiveStudentSession 
} from '../services/breakLeaderboardService';
import AgriFarmGarage from './AgriFarmGarage';
import CyberBulletHellBoss from './CyberBulletHellBoss';
import Realtime1v1Duel from './Realtime1v1Duel';
import CyberGarageCrafting from './CyberGarageCrafting';
import CyberDroneCosmosGame from './CyberDroneCosmosGame';
import {
  FieldDeMinerGame,
  AquaFlowGame,
  LocustInvadersGame,
  CanalFroggerGame,
  CropSlicerGame,
  WhackAWeedGame,
  CyberSequenceGame,
  CyberPongGame,
  Connect4Game,
  SokobanGame,
  LightsOutGame
} from './ClassicMiniGames';

// ==========================================
// 1. JOYFUL BREAK ZONE GAME CATALOGUE
// ==========================================
const GAME_CATALOGUE = [
  { id: 'cosmos', name: 'Cyber Drone: Cosmos Interceptor', icon: '🚀', category: 'arcade', desc: 'Vertical space warship shooter with dual plasma cannons, warp boost & dreadnought bosses.', bg: 'from-cyan-500 via-blue-600 to-indigo-700' },
  { id: 'minesweeper', name: 'Field De-Miner (Minesweeper)', icon: '💣', category: 'puzzle', desc: 'Unearth farm plots, flag underground stones, and clear the field safely with logic.', bg: 'from-slate-600 to-zinc-800' },
  { id: 'aquaflow', name: 'AquaFlow: Pipeline Connect', icon: '🚰', category: 'puzzle', desc: 'Rotate pressurized pipe elbows & valves to route irrigation water to thirsty crops.', bg: 'from-cyan-600 to-blue-700' },
  { id: 'locust', name: 'Locust Swarm Invaders', icon: '👾', category: 'arcade', desc: 'Classic arcade defender! Blast descending waves of cyber locusts behind hay bale bunkers.', bg: 'from-purple-600 to-indigo-800' },
  { id: 'frogger', name: 'Canal Crossing Frogger', icon: '🦘', category: 'arcade', desc: 'Hop across busy tractor highways and float over rushing canal logs to fill safe barns.', bg: 'from-emerald-600 to-green-700' },
  { id: 'cropslicer', name: 'Crop Slicer Turbo', icon: '🍉', category: 'reflex', desc: 'Swipe & slash flying watermelons, pineapples & apples in mid-air while dodging skull bombs.', bg: 'from-rose-500 to-red-700' },
  { id: 'whackaweed', name: 'Whack-A-Weed Frenzy', icon: '🦔', category: 'reflex', desc: 'High-speed reflex tapping! Whack weeds and sneaky gophers while sparing friendly flowers.', bg: 'from-amber-600 to-yellow-700' },
  { id: 'simon', name: 'Cyber Sequence (Simon Memory)', icon: '🎵', category: 'puzzle', desc: 'Audio-visual pattern challenge! Memorize and repeat the glowing neon synth frequencies.', bg: 'from-fuchsia-600 to-pink-700' },
  { id: 'cyberpong', name: 'Neon Cyber Pong (vs AI)', icon: '🏓', category: 'arcade', desc: 'Fast-paced retro table tennis against adaptive AI with spin shots and power smashes.', bg: 'from-blue-600 to-cyan-700' },
  { id: 'connect4', name: 'Connect 4 Grid Clash', icon: '🔴', category: 'puzzle', desc: 'Drop red discs into the 7x6 vertical grid and outsmart the strategic AI in 4-in-a-row.', bg: 'from-blue-700 to-indigo-900' },
  { id: 'sokoban', name: 'Silo Crate Sokoban', icon: '📦', category: 'puzzle', desc: 'Push heavy seed crates onto glowing warehouse target markers with unlimited undo.', bg: 'from-amber-700 to-orange-800' },
  { id: 'lightsout', name: 'Solar Grid: Lights Out', icon: '💡', category: 'puzzle', desc: 'Flip solar inverters to turn all 25 panels online (Neon Green) in minimum moves.', bg: 'from-emerald-500 to-teal-700' },
  { id: 'flappy', name: 'Flappy Tractor Field Runner', icon: '🚜', category: 'arcade', desc: 'Throttle a tractor through silos & collect wheat stars with calibrated delta-time physics.', bg: 'from-amber-500 to-orange-600' },
  { id: 'snake', name: 'Agri Retro Snake', icon: '🐍', category: 'arcade', desc: 'Classic 90s retro snake with anti-reverse input buffering & score multipliers.', bg: 'from-green-600 to-emerald-800' },
  { id: 'brickbreaker', name: 'Neon Brick Breaker', icon: '🧱', category: 'arcade', desc: 'Smash colourful neon bricks with mouse, touch or keyboard paddle bounce physics.', bg: 'from-pink-600 to-rose-700' },
  { id: 'tower', name: 'Yield Tower Stacker', icon: '🏗️', category: 'arcade', desc: 'Precision stack crop sacks with ultra-smooth sine oscillation to build the sky tower.', bg: 'from-amber-600 to-yellow-700' },
  { id: 'archery', name: 'Target Archery Master', icon: '🎯', category: 'arcade', desc: 'Calculate projectile parabolic trajectory & hit the bullseye target.', bg: 'from-indigo-600 to-blue-800' },
  { id: '2048', name: 'Farm Machinery 2048', icon: '🚜', category: 'puzzle', desc: 'Merge matching machinery tiles with swipe & arrow keys to advance to 2048.', bg: 'from-orange-500 to-amber-700' },
  { id: 'memory', name: 'Emoji Memory Match', icon: '🧠', category: 'puzzle', desc: 'Flip and pair colorful emoji cards with non-blocking click debounce.', bg: 'from-teal-600 to-cyan-700' },
  { id: 'tictactoe', name: 'Tic-Tac-Toe vs AI', icon: '❌⭕', category: 'puzzle', desc: 'Smart Tractor 🚜 vs Wheat 🌾 battle with strategic AI opponent.', bg: 'from-slate-700 to-slate-900' },
  { id: 'speedtap', name: 'Reflex Reaction Tap', icon: '⚡', category: 'reflex', desc: 'Test reaction speed in milliseconds with calibrated randomized delays.', bg: 'from-yellow-500 to-emerald-600' },
  { id: 'agwordle', name: 'Wordle Joy: 5-Letter Guesser', icon: '🔤', category: 'puzzle', desc: 'Guess 5-letter words with full virtual on-screen QWERTY & keyboard support.', bg: 'from-fuchsia-600 to-purple-700' },
  { id: 'speedmath', name: 'Speed Mental Math Blitz', icon: '⚡', category: 'reflex', desc: 'Quick 30-second rapid mental arithmetic sprint with streak combo bonuses.', bg: 'from-rose-600 to-red-700' },
  { id: 'popper', name: 'Star & Bubble Popper', icon: '🎈', category: 'reflex', desc: 'Pop floating stars and bubbles drifting smoothly with popping particles.', bg: 'from-blue-500 to-cyan-600' }
];

export default function GamesZone() {
  const [mainTab, setMainTab] = useState('cosmos'); // 'cosmos', 'boss', 'duel', 'cybergarage', 'classic'
  const [activeVehicle, setActiveVehicle] = useState('Cyber Tractor Mk-IV');
  const [unlockedVehicles, setUnlockedVehicles] = useState(['tractor']);
  const [activeMutators, setActiveMutators] = useState(['quad']);
  const [activeGame, setActiveGame] = useState(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showGarage, setShowGarage] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isMuted, setIsMuted] = useState(() => soundFX.isMuted());
  const [breakXP, setBreakXPState] = useState(() => getLocalBreakXP());
  const [leaderboardData, setLeaderboardData] = useState(() => getLeaderboardData());
  const [isGameFullscreen, setIsGameFullscreen] = useState(false);
  const activeGameContainerRef = useRef(null);

  const activeStudent = getActiveStudentSession();

  const handleRewardXP = useCallback((pts = 10) => {
    const updatedXP = addBreakXP(pts);
    setBreakXPState(updatedXP);
    setLeaderboardData(getLeaderboardData());
  }, []);

  const handleToggleMute = () => {
    const muted = soundFX.toggleMute();
    setIsMuted(muted);
  };

  const handleSelectGame = (gameId) => {
    soundFX.playClick();
    setActiveGame(gameId);
  };

  const handleBackToGallery = () => {
    soundFX.playClick();
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
      setIsGameFullscreen(false);
    }
    setActiveGame(null);
  };

  const toggleGameFullscreen = () => {
    if (!activeGameContainerRef.current) return;
    if (!document.fullscreenElement) {
      activeGameContainerRef.current.requestFullscreen().catch(() => {});
      setIsGameFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsGameFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsGameFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Filtered Game catalogue
  const filteredGames = GAME_CATALOGUE.filter(game => {
    const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory;
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          game.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const currentUserRank = leaderboardData.find(item => item.isCurrentUser) || { rank: '1', break_xp: breakXP };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      
      {/* Top Header Banner */}
      <div className="card-3d relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-50/90 via-indigo-50/80 to-purple-50/90 dark:from-blue-700 dark:via-indigo-700 dark:to-purple-800 p-6 sm:p-8 text-slate-900 dark:text-white border border-blue-200 dark:border-white/10 shadow-sm dark:shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-blue-400/10 dark:bg-white/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-white/10 backdrop-blur-md text-xs font-bold text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-white/20 mb-3">
              <Gamepad2 className="w-4 h-4 text-blue-600 dark:text-yellow-300" />
              <span>Study Break & Brain Refresh Zone 🎮</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2 text-slate-900 dark:text-white">
              <span>Student Relaxation Arcade 🎯</span>
            </h1>
            <p className="text-sm text-slate-600 dark:text-blue-100 mt-1 max-w-xl">
              100% Fun, Zero Exam Stress! Play action games, reflex challenges, puzzle merge & earn Break XP.
            </p>
          </div>

          {/* Controls & XP Bar */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="px-3.5 py-2 rounded-xl bg-amber-50 dark:bg-white/10 backdrop-blur-md border border-amber-200 dark:border-white/20 text-xs font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500 dark:text-yellow-300 animate-pulse" />
              <span>Break XP: <span className="font-mono text-amber-600 dark:text-yellow-300 font-extrabold">{breakXP} pts</span></span>
            </div>

            <button
              onClick={() => { 
                soundFX.playClick(); 
                setShowGarage(!showGarage); 
                if (showLeaderboard) setShowLeaderboard(false);
              }}
              className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 dark:bg-emerald-400 dark:hover:bg-emerald-300 text-slate-950 font-extrabold text-xs shadow-md transition flex items-center gap-1.5"
            >
              <Wrench className="w-4 h-4 text-slate-950" />
              <span>{showGarage ? 'Close Garage' : '🚜 Virtual Garage'}</span>
            </button>

            <button
              onClick={() => { 
                soundFX.playClick(); 
                if (!showLeaderboard) {
                  setLeaderboardData(getLeaderboardData());
                }
                setShowLeaderboard(!showLeaderboard);
                if (showGarage) setShowGarage(false); 
              }}
              className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 dark:bg-amber-400 dark:hover:bg-amber-300 text-slate-900 font-extrabold text-xs shadow-md transition flex items-center gap-1.5"
            >
              <Trophy className="w-4 h-4 fill-slate-900" />
              <span>{showLeaderboard ? 'Close Ranks' : 'Leaderboard'}</span>
            </button>

            <button
              onClick={handleToggleMute}
              className={`p-2.5 rounded-xl border transition flex items-center gap-1.5 text-xs font-bold ${
                isMuted
                  ? 'bg-rose-100 dark:bg-rose-500/20 border-rose-200 dark:border-rose-400/30 text-rose-700 dark:text-rose-200'
                  : 'bg-emerald-100 dark:bg-emerald-500/20 border-emerald-200 dark:border-emerald-400/30 text-emerald-800 dark:text-emerald-200'
              }`}
              title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-500 dark:text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
              <span>{isMuted ? 'Muted' : 'Sound ON'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* JOY BREAK ZONE MAIN MODE TAB NAVIGATION */}
      <div className="card-3d flex flex-wrap gap-3 bg-white dark:bg-slate-900/90 p-3 rounded-2xl border border-slate-200 dark:border-cyan-500/30 shadow-sm dark:shadow-xl">
        {[
          { id: 'cosmos', label: '🚀 Cyber Drone: Cosmos Interceptor', desc: '360° Flight, Combat & Space Harvest' },
          { id: 'boss', label: '🕹️ Cyber Bullet-Hell Arena', desc: 'Epic Boss Fights & Super Lasers' },
          { id: 'duel', label: '⚔️ 1v1 Rapid Speed Clash', desc: 'Fast Reflex Battle vs AI Rivals' },
          { id: 'cybergarage', label: '🚜 Cyber-Garage & Crafting', desc: 'Hyper Vehicles & Rogue Mutators' },
          { id: 'classic', label: '🎯 Casual Mini-Games Vault', desc: 'Flappy, Snake, Brick Breaker & Puzzles' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              soundFX.playClick();
              setMainTab(tab.id);
              if (tab.id !== 'classic') setActiveGame(null);
            }}
            className={`flex-1 min-w-[200px] p-3 rounded-xl text-left transition-all border ${
              mainTab === tab.id
                ? 'bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950 dark:to-blue-950 border-cyan-500 dark:border-cyan-400 text-slate-900 dark:text-white shadow-md shadow-cyan-500/10 dark:shadow-cyan-500/20 ring-1 ring-cyan-400/30'
                : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <div className={`font-extrabold text-sm flex items-center gap-1.5 ${
              mainTab === tab.id ? 'text-cyan-800 dark:text-cyan-300' : 'text-slate-800 dark:text-slate-300'
            }`}>
              <span>{tab.label}</span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">{tab.desc}</div>
          </button>
        ))}
      </div>

      {mainTab === 'cosmos' && <CyberDroneCosmosGame onRewardXP={handleRewardXP} />}
      {mainTab === 'boss' && <CyberBulletHellBoss breakXP={breakXP} onAddXP={handleRewardXP} activeVehicle={activeVehicle} mutators={activeMutators} />}
      {mainTab === 'duel' && <Realtime1v1Duel breakXP={breakXP} onAddXP={handleRewardXP} />}
      {mainTab === 'cybergarage' && <CyberGarageCrafting breakXP={breakXP} onAddXP={handleRewardXP} activeVehicle={activeVehicle} onSelectVehicle={setActiveVehicle} unlockedVehicles={unlockedVehicles} onUnlockVehicle={(id) => setUnlockedVehicles(prev => [...prev, id])} activeMutators={activeMutators} onToggleMutator={(id) => setActiveMutators(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id])} />}
      
      {mainTab === 'classic' && (
        <div className="space-y-6">

          {/* REAL-TIME ALL-INDIA BREAK XP LEADERBOARD PANEL */}
          {showLeaderboard && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5 shadow-lg animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>Real-Time All-India Break Arcade Leaderboard</span>
                  </div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-500" />
                    <span>Top Arcade & Mini-Game Champions</span>
                  </h2>
                </div>

                <div className="px-4 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-200 text-xs font-bold flex items-center gap-3">
                  <Award className="w-5 h-5 text-amber-500" />
                  <div>
                    <div className="text-[10px] uppercase font-mono tracking-wider opacity-70">Your Live Rank</div>
                    <div className="font-extrabold text-sm">#{currentUserRank.rank} • {breakXP} XP</div>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase font-mono text-[10px]">
                      <th className="py-2.5 px-3">Rank</th>
                      <th className="py-2.5 px-3">Student Name</th>
                      <th className="py-2.5 px-3">Institute / College</th>
                      <th className="py-2.5 px-3 text-right">Break XP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                    {leaderboardData.slice(0, 10).map((item) => {
                      let rankBadge = `#${item.rank}`;
                      if (item.rank === 1) rankBadge = '🥇 #1';
                      if (item.rank === 2) rankBadge = '🥈 #2';
                      if (item.rank === 3) rankBadge = '🥉 #3';

                      return (
                        <tr
                          key={item.id}
                          className={`transition ${
                            item.isCurrentUser
                              ? 'bg-blue-50/80 dark:bg-blue-950/60 font-bold border-l-4 border-l-blue-600'
                              : 'hover:bg-slate-50 dark:hover:bg-slate-850'
                          }`}
                        >
                          <td className="py-3 px-3 font-mono font-extrabold text-slate-900 dark:text-white">
                            {rankBadge}
                          </td>
                          <td className="py-3 px-3 font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                            <span>{item.full_name}</span>
                            {item.isCurrentUser && (
                              <span className="px-2 py-0.5 rounded-full bg-blue-600 text-white text-[9px] font-mono uppercase tracking-wider">
                                YOU
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-3 text-slate-500 font-medium flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5 text-slate-400" />
                            <span>{item.college_name}</span>
                          </td>
                          <td className="py-3 px-3 font-mono font-bold text-right text-emerald-600 dark:text-emerald-400">
                            {item.break_xp} XP
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIRTUAL FARM GARAGE MODAL / EXPANSION */}
          {showGarage && (
            <div className="animate-in fade-in">
              <AgriFarmGarage 
                breakXP={breakXP} 
                onAddXP={handleRewardXP} 
                onClose={() => setShowGarage(false)} 
              />
            </div>
          )}

          {/* CASUAL GAMES VAULT GALLERY OR ACTIVE MINI-GAME */}
          {activeGame === null ? (
            /* VIEW A: MINI-GAME GALLERY CARDS */
            <div className="space-y-6">

              {/* Filter Pills & Search */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  {[
                    { id: 'all', label: `All Mini-Games (${GAME_CATALOGUE.length})` },
                    { id: 'arcade', label: '🕹️ Arcade & Action' },
                    { id: 'puzzle', label: '🧩 Relaxing Puzzles' },
                    { id: 'reflex', label: '⚡ Speed & Reflex' }
                  ].map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => { soundFX.playClick(); setSelectedCategory(cat.id); }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-xs ${
                        selectedCategory === cat.id
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search game..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Game Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredGames.map(game => (
                  <div
                    key={game.id}
                    onClick={() => handleSelectGame(game.id)}
                    className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-400 p-5 rounded-2xl shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${game.bg} flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition`}>
                          {game.icon}
                        </div>
                        <div>
                          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                            {game.name}
                          </h3>
                          <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                            {game.category}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {game.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                      <span className="text-blue-600 dark:text-blue-400 font-extrabold flex items-center gap-1 group-hover:translate-x-1 transition">
                        Play Game <Play className="w-3.5 h-3.5 fill-current" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ) : (
            /* VIEW B: ACTIVE GAME CONTAINER WITH UNIVERSAL FULLSCREEN SUPPORT */
            <div 
              ref={activeGameContainerRef}
              className={`space-y-4 ${
                isGameFullscreen 
                  ? 'fixed inset-0 z-50 bg-slate-950 p-6 overflow-y-auto flex flex-col justify-between' 
                  : ''
              }`}
            >
              <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
                <button
                  onClick={handleBackToGallery}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-extrabold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition flex items-center gap-2"
                >
                  <ArrowLeftIcon className="w-4 h-4" />
                  <span>Back to Games Gallery</span>
                </button>

                <div className="text-xs font-bold text-slate-500">
                  Playing: <span className="text-slate-900 dark:text-white font-extrabold">{GAME_CATALOGUE.find(g => g.id === activeGame)?.name}</span>
                </div>

                <button
                  onClick={toggleGameFullscreen}
                  className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-extrabold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition flex items-center gap-1.5"
                  title={isGameFullscreen ? 'Exit Fullscreen' : 'Enable Fullscreen Mode'}
                >
                  {isGameFullscreen ? <Minimize2 className="w-4 h-4 text-cyan-400" /> : <Maximize2 className="w-4 h-4 text-cyan-400" />}
                  <span className="hidden sm:inline">{isGameFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
                </button>
              </div>

              <div>
                {activeGame === 'cosmos' && <CyberDroneCosmosGame onRewardXP={handleRewardXP} onBack={handleBackToGallery} />}
                {activeGame === 'minesweeper' && <FieldDeMinerGame onRewardXP={handleRewardXP} />}
                {activeGame === 'aquaflow' && <AquaFlowGame onRewardXP={handleRewardXP} />}
                {activeGame === 'locust' && <LocustInvadersGame onRewardXP={handleRewardXP} />}
                {activeGame === 'frogger' && <CanalFroggerGame onRewardXP={handleRewardXP} />}
                {activeGame === 'cropslicer' && <CropSlicerGame onRewardXP={handleRewardXP} />}
                {activeGame === 'whackaweed' && <WhackAWeedGame onRewardXP={handleRewardXP} />}
                {activeGame === 'simon' && <CyberSequenceGame onRewardXP={handleRewardXP} />}
                {activeGame === 'cyberpong' && <CyberPongGame onRewardXP={handleRewardXP} />}
                {activeGame === 'connect4' && <Connect4Game onRewardXP={handleRewardXP} />}
                {activeGame === 'sokoban' && <SokobanGame onRewardXP={handleRewardXP} />}
                {activeGame === 'lightsout' && <LightsOutGame onRewardXP={handleRewardXP} />}
                {activeGame === 'flappy' && <FlappyTractorGame onRewardXP={handleRewardXP} />}
                {activeGame === 'snake' && <AgriSnakeGame onRewardXP={handleRewardXP} />}
                {activeGame === 'brickbreaker' && <NeonBrickBreakerGame onRewardXP={handleRewardXP} />}
                {activeGame === 'tower' && <AgriTowerGame onRewardXP={handleRewardXP} />}
                {activeGame === 'archery' && <IrrigationArcheryGame onRewardXP={handleRewardXP} />}
                {activeGame === '2048' && <Farm2048Game onRewardXP={handleRewardXP} />}
                {activeGame === 'memory' && <EmojiMemoryMatchGame onRewardXP={handleRewardXP} />}
                {activeGame === 'tictactoe' && <TicTacToeGame onRewardXP={handleRewardXP} />}
                {activeGame === 'speedtap' && <ReflexTapGame onRewardXP={handleRewardXP} />}
                {activeGame === 'agwordle' && <AgWordleGame onRewardXP={handleRewardXP} />}
                {activeGame === 'speedmath' && <SpeedMathGame onRewardXP={handleRewardXP} />}
                {activeGame === 'popper' && <StarPopperGame onRewardXP={handleRewardXP} />}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ====================================================================
// 2. FULLY OPTIMIZED & CALIBRATED CASUAL MINI-GAMES
// ====================================================================

// --- GAME 1: FLAPPY TRACTOR (DELTA-TIME CALIBRATED) ---
function FlappyTractorGame({ onRewardXP }) {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('ready');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      const s = localStorage.getItem('joy_flappy_high');
      return s ? parseInt(s, 10) : 0;
    } catch (e) {
      return 0;
    }
  });

  const stateRef = useRef({
    bird: { y: 200, vy: 0, gravity: 0.32, jump: -6.8, size: 26 },
    pipes: [],
    stars: [],
    lastTime: performance.now(),
    score: 0
  });

  const jump = useCallback(() => {
    if (gameState === 'ready' || gameState === 'gameover') {
      stateRef.current = {
        bird: { y: 200, vy: -6.8, gravity: 0.32, jump: -6.8, size: 26 },
        pipes: [],
        stars: [],
        lastTime: performance.now(),
        score: 0
      };
      setScore(0);
      setGameState('playing');
      soundFX.playJump();
    } else if (gameState === 'playing') {
      stateRef.current.bird.vy = stateRef.current.bird.jump;
      soundFX.playJump();
    }
  }, [gameState]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [jump]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    stateRef.current.lastTime = performance.now();

    const loop = (now) => {
      const state = stateRef.current;
      const dt = Math.min(2.0, (now - state.lastTime) / 16.666);
      state.lastTime = now;

      // Update Bird with Delta Time
      state.bird.vy += state.bird.gravity * dt;
      state.bird.y += state.bird.vy * dt;

      // Spawn Pipes (Timer based)
      if (!state.lastPipeSpawn || now - state.lastPipeSpawn > 1650) {
        state.lastPipeSpawn = now;
        const gap = 145;
        const topH = Math.floor(Math.random() * (canvas.height - gap - 100)) + 40;
        state.pipes.push({
          x: canvas.width,
          topH,
          bottomY: topH + gap,
          width: 52,
          passed: false
        });
      }

      // Spawn Stars
      if (!state.lastStarSpawn || now - state.lastStarSpawn > 2800) {
        state.lastStarSpawn = now;
        state.stars.push({
          x: canvas.width,
          y: Math.random() * (canvas.height - 120) + 60,
          collected: false
        });
      }

      // Update Pipes
      for (let i = state.pipes.length - 1; i >= 0; i--) {
        const p = state.pipes[i];
        p.x -= 2.6 * dt;

        // Check Score
        if (!p.passed && p.x + p.width < 100) {
          p.passed = true;
          state.score += 1;
          setScore(state.score);
          soundFX.playScore();
          onRewardXP?.(5);
        }

        // Check Collision with pipe
        const birdBox = { x: 100, y: state.bird.y, size: state.bird.size };
        if (
          birdBox.x + birdBox.size > p.x &&
          birdBox.x < p.x + p.width &&
          (birdBox.y < p.topH || birdBox.y + birdBox.size > p.bottomY)
        ) {
          soundFX.playCrash();
          setGameState('gameover');
          if (state.score > highScore) {
            setHighScore(state.score);
            try { localStorage.setItem('joy_flappy_high', state.score.toString()); } catch (e) {}
            confetti({ particleCount: 80 });
          }
          return;
        }

        if (p.x < -60) state.pipes.splice(i, 1);
      }

      // Update Stars
      for (let i = state.stars.length - 1; i >= 0; i--) {
        const s = state.stars[i];
        s.x -= 2.6 * dt;
        if (!s.collected && Math.hypot(s.x - 110, s.y - state.bird.y) < 28) {
          s.collected = true;
          state.score += 3;
          setScore(state.score);
          soundFX.playScore();
          onRewardXP?.(10);
        }
        if (s.x < -30 || s.collected) state.stars.splice(i, 1);
      }

      // Check ground / ceiling
      if (state.bird.y > canvas.height - state.bird.size || state.bird.y < 0) {
        soundFX.playCrash();
        setGameState('gameover');
        if (state.score > highScore) {
          setHighScore(state.score);
          try { localStorage.setItem('joy_flappy_high', state.score.toString()); } catch (e) {}
        }
        return;
      }

      // --- RENDER ---
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Scenery Silos
      ctx.fillStyle = '#1e293b';
      for (let i = 0; i < 6; i++) {
        ctx.fillRect((i * 120 - ((now * 0.05) % 120)), canvas.height - 35, 45, 35);
      }

      // Draw Pipes
      state.pipes.forEach(p => {
        ctx.fillStyle = '#059669';
        ctx.fillRect(p.x, 0, p.width, p.topH);
        ctx.fillRect(p.x, p.bottomY, p.width, canvas.height - p.bottomY);

        ctx.fillStyle = '#10b981';
        ctx.fillRect(p.x - 4, p.topH - 15, p.width + 8, 15);
        ctx.fillRect(p.x - 4, p.bottomY, p.width + 8, 15);
      });

      // Draw Stars
      state.stars.forEach(s => {
        ctx.font = '22px sans-serif';
        ctx.fillText('⭐', s.x, s.y);
      });

      // Draw Tractor
      ctx.font = '28px sans-serif';
      ctx.fillText('🚜', 90, state.bird.y + 18);

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [gameState, highScore, onRewardXP]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 max-w-xl mx-auto shadow-lg text-center">
      <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
          <span>🚜 Flappy Tractor Field Runner</span>
        </h3>
        <div className="flex gap-3 text-xs font-mono font-bold">
          <span className="text-amber-500">Score: {score}</span>
          <span className="text-slate-400">Best: {highScore}</span>
        </div>
      </div>

      <div className="relative flex justify-center cursor-pointer select-none" onClick={jump}>
        <canvas ref={canvasRef} width={480} height={400} className="rounded-xl border border-slate-700 bg-slate-950 max-w-full" />
        
        {gameState !== 'playing' && (
          <div className="absolute inset-0 bg-slate-950/80 rounded-xl flex flex-col items-center justify-center p-6 text-white space-y-3">
            <div className="text-4xl animate-bounce">🚜</div>
            <h4 className="text-xl font-black text-amber-400">
              {gameState === 'ready' ? 'FLAPPY TRACTOR' : 'GAME OVER!'}
            </h4>
            <p className="text-xs text-slate-300">
              {gameState === 'ready' ? 'Tap or press Spacebar / Up Arrow to fly & dodge silos!' : `Final Score: ${score} | High Score: ${highScore}`}
            </p>
            <button
              onClick={jump}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs transition shadow-lg"
            >
              {gameState === 'ready' ? 'TAP TO FLY 🚀' : 'PLAY AGAIN 🔄'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// --- GAME 2: RETRO SNAKE (ANTI-REVERSE BUFFERED) ---
function AgriSnakeGame({ onRewardXP }) {
  const [snake, setSnake] = useState([[8, 8], [8, 9], [8, 10]]);
  const [food, setFood] = useState([4, 4]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try { return parseInt(localStorage.getItem('joy_snake_high') || '0', 10); } catch (e) { return 0; }
  });
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const dirRef = useRef([0, -1]);
  const nextDirRef = useRef([0, -1]);

  const resetGame = () => {
    dirRef.current = [0, -1];
    nextDirRef.current = [0, -1];
    setSnake([[8, 8], [8, 9], [8, 10]]);
    setFood([Math.floor(Math.random() * 14) + 1, Math.floor(Math.random() * 14) + 1]);
    setScore(0);
    setIsGameOver(false);
    setIsPlaying(true);
    soundFX.playClick();
  };

  const handleSetDir = (d) => {
    const cur = dirRef.current;
    if (d[0] !== -cur[0] || d[1] !== -cur[1]) {
      nextDirRef.current = d;
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowUp', 'KeyW'].includes(e.code)) handleSetDir([0, -1]);
      if (['ArrowDown', 'KeyS'].includes(e.code)) handleSetDir([0, 1]);
      if (['ArrowLeft', 'KeyA'].includes(e.code)) handleSetDir([-1, 0]);
      if (['ArrowRight', 'KeyD'].includes(e.code)) handleSetDir([1, 0]);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    const timer = setInterval(() => {
      dirRef.current = nextDirRef.current;
      const d = dirRef.current;

      setSnake(prev => {
        const head = [prev[0][0] + d[0], prev[0][1] + d[1]];

        // Wall collision
        if (head[0] < 0 || head[0] >= 16 || head[1] < 0 || head[1] >= 16) {
          setIsGameOver(true);
          soundFX.playCrash();
          return prev;
        }

        // Self collision
        if (prev.some(seg => seg[0] === head[0] && seg[1] === head[1])) {
          setIsGameOver(true);
          soundFX.playCrash();
          return prev;
        }

        const next = [head, ...prev];

        // Eat food
        if (head[0] === food[0] && head[1] === food[1]) {
          soundFX.playScore();
          onRewardXP?.(10);
          setScore(s => {
            const ns = s + 10;
            if (ns > highScore) {
              setHighScore(ns);
              try { localStorage.setItem('joy_snake_high', ns.toString()); } catch (e) {}
            }
            return ns;
          });
          setFood([Math.floor(Math.random() * 14) + 1, Math.floor(Math.random() * 14) + 1]);
        } else {
          next.pop();
        }

        return next;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [isPlaying, isGameOver, food, highScore, onRewardXP]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 max-w-md mx-auto shadow-lg text-center">
      <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">🐍 Retro Agri Snake</h3>
        <div className="flex gap-3 text-xs font-mono font-bold">
          <span className="text-emerald-500">Score: {score}</span>
          <span className="text-slate-400">Best: {highScore}</span>
        </div>
      </div>

      <div className="relative aspect-square max-w-[340px] mx-auto bg-slate-950 rounded-xl border-2 border-emerald-500/40 p-2 grid grid-cols-16 grid-rows-16 gap-0.5">
        {Array(256).fill(null).map((_, i) => {
          const x = i % 16;
          const y = Math.floor(i / 16);
          const isHead = snake[0][0] === x && snake[0][1] === y;
          const isBody = snake.slice(1).some(s => s[0] === x && s[1] === y);
          const isFood = food[0] === x && food[1] === y;

          let bg = 'bg-slate-900/40';
          if (isHead) bg = 'bg-emerald-400 rounded-sm shadow-sm';
          else if (isBody) bg = 'bg-emerald-600 rounded-sm';
          else if (isFood) bg = 'bg-amber-400 rounded-full animate-pulse';

          return <div key={i} className={`w-full h-full ${bg}`} />;
        })}

        {(!isPlaying || isGameOver) && (
          <div className="absolute inset-0 bg-slate-950/85 rounded-xl flex flex-col items-center justify-center p-4 text-white space-y-3">
            <span className="text-3xl">🐍</span>
            <h4 className="font-extrabold text-base text-emerald-400">{isGameOver ? 'SNAKE CRASHED!' : 'RETRO SNAKE'}</h4>
            <button
              onClick={resetGame}
              className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs transition"
            >
              {isGameOver ? 'PLAY AGAIN 🔄' : 'START SNAKE 🎮'}
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 max-w-[200px] mx-auto sm:hidden pt-2">
        <div />
        <button onClick={() => handleSetDir([0, -1])} className="p-3 bg-slate-800 rounded-xl font-bold">▲</button>
        <div />
        <button onClick={() => handleSetDir([-1, 0])} className="p-3 bg-slate-800 rounded-xl font-bold">◀</button>
        <button onClick={() => handleSetDir([0, 1])} className="p-3 bg-slate-800 rounded-xl font-bold">▼</button>
        <button onClick={() => handleSetDir([1, 0])} className="p-3 bg-slate-800 rounded-xl font-bold">▶</button>
      </div>
    </div>
  );
}

// --- GAME 3: NEON BRICK BREAKER (DELTA-TIME & MOUSE FOLLOW) ---
function NeonBrickBreakerGame({ onRewardXP }) {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const stateRef = useRef({
    paddle: { x: 180, width: 85, height: 12, speed: 7.5 },
    ball: { x: 220, y: 300, vx: 4, vy: -4.5, radius: 6 },
    bricks: [],
    keys: {},
    lastTime: performance.now()
  });

  const initBricks = () => {
    const rows = 4;
    const cols = 7;
    const bricks = [];
    const colors = ['#f43f5e', '#f59e0b', '#10b981', '#06b6d4'];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        bricks.push({
          x: c * 58 + 25,
          y: r * 25 + 40,
          w: 50,
          h: 18,
          color: colors[r],
          active: true
        });
      }
    }
    return bricks;
  };

  const startGame = () => {
    stateRef.current = {
      paddle: { x: 180, width: 85, height: 12, speed: 7.5 },
      ball: { x: 220, y: 280, vx: (Math.random() > 0.5 ? 3.8 : -3.8), vy: -4.5, radius: 6 },
      bricks: initBricks(),
      keys: {},
      lastTime: performance.now()
    };
    setScore(0);
    setIsGameOver(false);
    setIsPlaying(true);
    soundFX.playClick();
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (['ArrowLeft', 'KeyA'].includes(e.code)) stateRef.current.keys.left = e.type === 'keydown';
      if (['ArrowRight', 'KeyD'].includes(e.code)) stateRef.current.keys.right = e.type === 'keydown';
    };
    window.addEventListener('keydown', handleKey);
    window.addEventListener('keyup', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('keyup', handleKey);
    };
  }, []);

  // Mouse / Touch paddle dragging
  const handleCanvasMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    if (!clientX) return;
    const scaleX = canvas.width / rect.width;
    const targetX = (clientX - rect.left) * scaleX - stateRef.current.paddle.width / 2;
    stateRef.current.paddle.x = Math.max(0, Math.min(canvas.width - stateRef.current.paddle.width, targetX));
  };

  useEffect(() => {
    if (!isPlaying) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    stateRef.current.lastTime = performance.now();

    const loop = (now) => {
      const state = stateRef.current;
      const dt = Math.min(2.0, (now - state.lastTime) / 16.666);
      state.lastTime = now;

      const { paddle, ball, bricks } = state;

      // Move Paddle with Keys
      if (state.keys.left && paddle.x > 0) paddle.x -= paddle.speed * dt;
      if (state.keys.right && paddle.x < canvas.width - paddle.width) paddle.x += paddle.speed * dt;

      // Move Ball with Delta Time
      ball.x += ball.vx * dt;
      ball.y += ball.vy * dt;

      // Wall Bounce
      if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        ball.vx *= -1;
        soundFX.playClick();
      }
      if (ball.y - ball.radius < 0) {
        ball.vy *= -1;
        soundFX.playClick();
      }

      // Paddle Bounce
      if (
        ball.y + ball.radius >= canvas.height - 30 &&
        ball.y - ball.radius <= canvas.height - 18 &&
        ball.x >= paddle.x &&
        ball.x <= paddle.x + paddle.width
      ) {
        ball.vy = -Math.abs(ball.vy);
        const hitOffset = (ball.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2);
        ball.vx = hitOffset * 5.8;
        soundFX.playJump();
      }

      // Brick Collision
      bricks.forEach(b => {
        if (!b.active) return;
        if (
          ball.x > b.x &&
          ball.x < b.x + b.w &&
          ball.y > b.y &&
          ball.y < b.y + b.h
        ) {
          b.active = false;
          ball.vy *= -1;
          soundFX.playScore();
          onRewardXP?.(10);
          setScore(s => s + 20);
        }
      });

      // Bottom Fall
      if (ball.y > canvas.height) {
        soundFX.playCrash();
        setIsPlaying(false);
        setIsGameOver(true);
        return;
      }

      // Check Win
      if (bricks.every(b => !b.active)) {
        soundFX.playWin();
        confetti({ particleCount: 100 });
        setIsPlaying(false);
        setIsGameOver(true);
        onRewardXP?.(100);
        return;
      }

      // --- RENDER ---
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Bricks
      bricks.forEach(b => {
        if (!b.active) return;
        ctx.fillStyle = b.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = b.color;
        ctx.fillRect(b.x, b.y, b.w, b.h);
        ctx.shadowBlur = 0;
      });

      // Draw Paddle
      ctx.fillStyle = '#38bdf8';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#38bdf8';
      ctx.fillRect(paddle.x, canvas.height - 30, paddle.width, paddle.height);
      ctx.shadowBlur = 0;

      // Draw Ball
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, onRewardXP]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 max-w-xl mx-auto shadow-lg text-center">
      <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">🧱 Neon Brick Breaker</h3>
        <span className="text-pink-500 font-mono font-bold text-xs">Score: {score}</span>
      </div>

      <div className="relative flex justify-center">
        <canvas 
          ref={canvasRef} 
          width={450} 
          height={380} 
          onMouseMove={handleCanvasMouseMove}
          onTouchMove={handleCanvasMouseMove}
          className="rounded-xl border border-slate-700 bg-slate-950 max-w-full cursor-ew-resize touch-none" 
        />
        
        {!isPlaying && (
          <div className="absolute inset-0 bg-slate-950/85 rounded-xl flex flex-col items-center justify-center p-6 text-white space-y-3">
            <span className="text-4xl">🧱</span>
            <h4 className="text-lg font-black text-pink-400">{isGameOver ? 'ROUND COMPLETED!' : 'NEON BRICK BREAKER'}</h4>
            <p className="text-xs text-slate-400">Move paddle with mouse/touch or A/D & Arrow Keys to break bricks!</p>
            <button
              onClick={startGame}
              className="px-6 py-2.5 bg-pink-600 hover:bg-pink-500 text-white font-black rounded-xl text-xs transition shadow-lg"
            >
              {isGameOver ? 'PLAY AGAIN 🔄' : 'START GAME 🕹️'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// --- GAME 4: TOWER STACKER (ULTRA-SMOOTH SINE OSCILLATION) ---
function AgriTowerGame({ onRewardXP }) {
  const [towerHeight, setTowerHeight] = useState(1);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [blocks, setBlocks] = useState([{ width: 140, left: 130 }]);
  const [movingLeft, setMovingLeft] = useState(130);

  const animRef = useRef(null);
  const startTimeRef = useRef(performance.now());

  const startTower = () => {
    setTowerHeight(1);
    setScore(0);
    setBlocks([{ width: 140, left: 130 }]);
    setMovingLeft(130);
    setIsGameOver(false);
    setIsPlaying(true);
    startTimeRef.current = performance.now();
    soundFX.playClick();
  };

  useEffect(() => {
    if (!isPlaying || isGameOver) return;
    
    const animate = (time) => {
      const elapsed = time - startTimeRef.current;
      const pos = 130 + Math.sin(elapsed * 0.004) * 115;
      setMovingLeft(pos);
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [isPlaying, isGameOver]);

  const handleDrop = () => {
    if (!isPlaying || isGameOver) return;
    soundFX.playJump();

    const topBlock = blocks[blocks.length - 1];
    const currentW = topBlock.width;
    const diff = movingLeft - topBlock.left;

    if (Math.abs(diff) >= currentW) {
      soundFX.playCrash();
      setIsGameOver(true);
      return;
    }

    const overlap = currentW - Math.abs(diff);
    const newLeft = diff > 0 ? movingLeft : topBlock.left;

    soundFX.playScore();
    onRewardXP?.(15);
    setScore(s => s + 25);
    setTowerHeight(h => h + 1);
    setBlocks(prev => [...prev.slice(-6), { width: overlap, left: newLeft }]);
    startTimeRef.current = performance.now();
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 max-w-md mx-auto shadow-lg text-center">
      <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">🏗️ Yield Tower Stacker</h3>
        <div className="flex gap-3 text-xs font-mono font-bold">
          <span className="text-amber-500">Height: {towerHeight}</span>
          <span className="text-blue-500">Score: {score}</span>
        </div>
      </div>

      <div
        onClick={handleDrop}
        className="relative h-72 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden cursor-pointer select-none flex flex-col-reverse p-4"
      >
        {blocks.map((b, idx) => (
          <div
            key={idx}
            style={{ width: `${b.width}px`, transform: `translateX(${b.left}px)` }}
            className="h-8 bg-gradient-to-r from-amber-500 to-yellow-400 rounded-md border border-amber-300 shadow-md transition-all shrink-0"
          />
        ))}

        {isPlaying && !isGameOver && (
          <div
            style={{ width: `${blocks[blocks.length - 1].width}px`, transform: `translateX(${movingLeft}px)` }}
            className="h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-md border border-cyan-200 shadow-lg absolute top-4 shrink-0"
          />
        )}

        {(!isPlaying || isGameOver) && (
          <div className="absolute inset-0 bg-slate-950/85 flex flex-col items-center justify-center p-4 text-white space-y-3">
            <span className="text-3xl">🏗️</span>
            <h4 className="font-black text-amber-400">{isGameOver ? 'TOWER TOPPLED!' : 'TOWER STACKER'}</h4>
            <p className="text-xs text-slate-400">Click anywhere to drop the moving block at the right timing!</p>
            <button
              onClick={startTower}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs transition"
            >
              {isGameOver ? 'RETRY TOWER 🔄' : 'START STACKING 🧱'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// --- GAME 5: TARGET ARCHERY (PARABOLIC TRAJECTORY) ---
function IrrigationArcheryGame({ onRewardXP }) {
  const [angle, setAngle] = useState(45);
  const [power, setPower] = useState(70);
  const [score, setScore] = useState(0);
  const [targetDist, setTargetDist] = useState(65);
  const [feedback, setFeedback] = useState('');

  const handleShoot = () => {
    soundFX.playJump();
    const rad = (angle * Math.PI) / 180;
    const v = power * 0.45;
    const dist = Math.round((v * v * Math.sin(2 * rad)) / 9.81);
    const diff = Math.abs(dist - targetDist);

    if (diff <= 4) {
      soundFX.playWin();
      confetti({ particleCount: 70, spread: 60 });
      setScore(s => s + 50);
      onRewardXP?.(30);
      setFeedback(`🎯 BULLSEYE! Distance: ${dist}m (Target: ${targetDist}m) +50 XP!`);
      setTargetDist(Math.floor(Math.random() * 40) + 45);
    } else {
      soundFX.playCrash();
      setFeedback(`❌ Missed! Shot landed at ${dist}m (Target: ${targetDist}m).`);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 max-w-md mx-auto shadow-lg text-center text-xs">
      <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
          <span>🎯 Target Archery Master</span>
        </h3>
        <span className="text-indigo-500 font-mono font-bold">Score: {score}</span>
      </div>

      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex justify-between font-mono font-bold text-sm">
          <span>Target Distance: <span className="text-indigo-500 font-black">{targetDist} m</span></span>
        </div>

        {feedback && (
          <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-200 font-bold">
            {feedback}
          </div>
        )}

        <div className="space-y-3 pt-2 text-left font-bold">
          <div>
            <div className="flex justify-between mb-1">
              <span>Bow Angle: {angle}°</span>
            </div>
            <input
              type="range"
              min="15"
              max="75"
              value={angle}
              onChange={(e) => setAngle(parseInt(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span>Bow Draw Power: {power}%</span>
            </div>
            <input
              type="range"
              min="30"
              max="100"
              value={power}
              onChange={(e) => setPower(parseInt(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>
        </div>

        <button
          onClick={handleShoot}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-black rounded-xl shadow-md transition"
        >
          RELEASE ARROW 🏹
        </button>
      </div>
    </div>
  );
}

// --- GAME 6: FARM 2048 (TOUCH SWIPES & ARROW KEYS) ---
function Farm2048Game({ onRewardXP }) {
  const [board, setBoard] = useState(() => {
    const b = Array(4).fill(null).map(() => Array(4).fill(0));
    b[0][0] = 2;
    b[1][1] = 2;
    return b;
  });
  const [score, setScore] = useState(0);
  const touchStartRef = useRef({ x: 0, y: 0 });

  const move = useCallback((direction) => {
    soundFX.playClick();
    let newBoard = JSON.parse(JSON.stringify(board));
    let gained = 0;

    const slide = (row) => {
      let arr = row.filter(val => val);
      for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] === arr[i + 1]) {
          arr[i] *= 2;
          gained += arr[i];
          arr[i + 1] = 0;
        }
      }
      arr = arr.filter(val => val);
      while (arr.length < 4) arr.push(0);
      return arr;
    };

    if (direction === 'LEFT') {
      newBoard = newBoard.map(row => slide(row));
    } else if (direction === 'RIGHT') {
      newBoard = newBoard.map(row => slide(row.reverse()).reverse());
    } else if (direction === 'UP') {
      for (let c = 0; c < 4; c++) {
        let col = [newBoard[0][c], newBoard[1][c], newBoard[2][c], newBoard[3][c]];
        col = slide(col);
        for (let r = 0; r < 4; r++) newBoard[r][c] = col[r];
      }
    } else if (direction === 'DOWN') {
      for (let c = 0; c < 4; c++) {
        let col = [newBoard[3][c], newBoard[2][c], newBoard[1][c], newBoard[0][c]];
        col = slide(col);
        for (let r = 0; r < 4; r++) newBoard[3 - r][c] = col[r];
      }
    }

    // Add Random Tile
    const emptyCells = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (newBoard[r][c] === 0) emptyCells.push({ r, c });
      }
    }
    if (emptyCells.length > 0) {
      const rand = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      newBoard[rand.r][rand.c] = Math.random() > 0.8 ? 4 : 2;
    }

    setBoard(newBoard);
    if (gained > 0) {
      setScore(s => s + gained);
      onRewardXP?.(Math.floor(gained / 4));
    }
  }, [board, onRewardXP]);

  useEffect(() => {
    const handleKey = (e) => {
      if (['ArrowUp', 'KeyW'].includes(e.code)) { e.preventDefault(); move('UP'); }
      if (['ArrowDown', 'KeyS'].includes(e.code)) { e.preventDefault(); move('DOWN'); }
      if (['ArrowLeft', 'KeyA'].includes(e.code)) { e.preventDefault(); move('LEFT'); }
      if (['ArrowRight', 'KeyD'].includes(e.code)) { e.preventDefault(); move('RIGHT'); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [move]);

  const handleTouchStart = (e) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 30) move('RIGHT');
      else if (dx < -30) move('LEFT');
    } else {
      if (dy > 30) move('DOWN');
      else if (dy < -30) move('UP');
    }
  };

  return (
    <div 
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 max-w-md mx-auto shadow-lg text-center select-none"
    >
      <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">🚜 Farm Machinery 2048</h3>
        <span className="text-amber-500 font-mono font-bold">Score: {score}</span>
      </div>

      <div className="grid grid-cols-4 gap-2 bg-slate-950 p-3 rounded-2xl border border-slate-800 max-w-[320px] mx-auto aspect-square">
        {board.flat().map((val, idx) => {
          let bg = 'bg-slate-900 text-slate-600';
          if (val === 2) bg = 'bg-amber-100 text-slate-900 font-bold';
          if (val === 4) bg = 'bg-amber-200 text-slate-900 font-bold';
          if (val === 8) bg = 'bg-orange-400 text-white font-extrabold';
          if (val === 16) bg = 'bg-orange-500 text-white font-extrabold';
          if (val === 32) bg = 'bg-red-500 text-white font-extrabold';
          if (val >= 64) bg = 'bg-yellow-400 text-slate-950 font-black shadow-lg';

          return (
            <div key={idx} className={`rounded-xl flex items-center justify-center font-mono text-base select-none transition-all ${bg}`}>
              {val > 0 ? val : ''}
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-2 max-w-[200px] mx-auto pt-2">
        <div />
        <button onClick={() => move('UP')} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold">▲</button>
        <div />
        <button onClick={() => move('LEFT')} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold">◀</button>
        <button onClick={() => move('DOWN')} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold">▼</button>
        <button onClick={() => move('RIGHT')} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold">▶</button>
      </div>
    </div>
  );
}

// --- GAME 7: EMOJI MEMORY MATCH (DEBOUNCED FLIP) ---
function EmojiMemoryMatchGame({ onRewardXP }) {
  const EMOJIS = ['🚜', '🌾', '🍕', '🚀', '🎮', '⚡', '💎', '🏆'];
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  const initGame = useCallback(() => {
    const deck = [...EMOJIS, ...EMOJIS].map((emoji, idx) => ({ id: idx, emoji }));
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    setCards(deck);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const handleCardClick = (idx) => {
    if (flipped.length === 2 || flipped.includes(idx) || matched.includes(cards[idx].emoji)) return;
    soundFX.playClick();
    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const c1 = cards[newFlipped[0]];
      const c2 = cards[newFlipped[1]];

      if (c1.emoji === c2.emoji) {
        soundFX.playScore();
        onRewardXP?.(15);
        const newMatched = [...matched, c1.emoji];
        setMatched(newMatched);
        setFlipped([]);
        if (newMatched.length === EMOJIS.length) {
          soundFX.playWin();
          confetti({ particleCount: 90 });
        }
      } else {
        setTimeout(() => setFlipped([]), 850);
      }
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 max-w-lg mx-auto shadow-lg text-center">
      <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">🧠 Emoji Memory Match</h3>
        <div className="flex gap-3 text-xs font-mono font-bold">
          <span>Moves: {moves}</span>
          <button onClick={initGame} className="text-teal-500 hover:underline">Reset</button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2.5 max-w-sm mx-auto">
        {cards.map((c, idx) => {
          const isFlipped = flipped.includes(idx) || matched.includes(c.emoji);
          return (
            <div
              key={c.id}
              onClick={() => handleCardClick(idx)}
              className={`h-20 rounded-xl border flex items-center justify-center text-3xl cursor-pointer transition-all duration-300 select-none ${
                isFlipped
                  ? 'bg-teal-50 dark:bg-teal-950/80 border-teal-400 shadow-md scale-105'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
              }`}
            >
              {isFlipped ? c.emoji : '❓'}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- GAME 8: TIC-TAC-TOE VS STRATEGIC AI ---
function TicTacToeGame({ onRewardXP }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);

  const checkWinner = (sq) => {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    for (let l of lines) {
      const [a,b,c] = l;
      if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) return sq[a];
    }
    if (sq.every(x => x)) return 'Draw';
    return null;
  };

  const handleClick = (idx) => {
    if (board[idx] || winner) return;
    soundFX.playClick();
    const newB = [...board];
    newB[idx] = '🚜';
    setBoard(newB);

    const w = checkWinner(newB);
    if (w) {
      setWinner(w);
      if (w === '🚜') { soundFX.playWin(); confetti({ particleCount: 70 }); onRewardXP?.(30); }
      return;
    }

    // Strategic AI turn
    setTimeout(() => {
      const emptyIdxs = newB.map((v, i) => v === null ? i : null).filter(v => v !== null);
      if (emptyIdxs.length > 0) {
        // Check if AI can win
        let aiPick = null;
        for (let i of emptyIdxs) {
          const testB = [...newB];
          testB[i] = '🌾';
          if (checkWinner(testB) === '🌾') { aiPick = i; break; }
        }
        // Check if player can win to block
        if (aiPick === null) {
          for (let i of emptyIdxs) {
            const testB = [...newB];
            testB[i] = '🚜';
            if (checkWinner(testB) === '🚜') { aiPick = i; break; }
          }
        }
        if (aiPick === null) {
          aiPick = emptyIdxs[Math.floor(Math.random() * emptyIdxs.length)];
        }

        newB[aiPick] = '🌾';
        setBoard(newB);
        const aiWin = checkWinner(newB);
        if (aiWin) {
          setWinner(aiWin);
          if (aiWin === '🌾') soundFX.playCrash();
        }
      }
    }, 300);
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 max-w-sm mx-auto shadow-lg text-center">
      <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">❌⭕ Tic-Tac-Toe vs AI</h3>
        <button onClick={reset} className="text-xs text-blue-500 font-bold hover:underline">New Game</button>
      </div>

      <div className="grid grid-cols-3 gap-2.5 aspect-square max-w-[260px] mx-auto">
        {board.map((val, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(idx)}
            className="h-20 bg-slate-100 dark:bg-slate-800 rounded-2xl text-3xl border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-blue-50 dark:hover:bg-slate-750 transition"
          >
            {val}
          </button>
        ))}
      </div>

      {winner && (
        <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-xl font-bold text-xs text-blue-800 dark:text-blue-200 animate-fade-in">
          {winner === 'Draw' ? '🤝 It is a Draw!' : `🎉 Winner: ${winner}!`}
        </div>
      )}
    </div>
  );
}

// --- GAME 9: REFLEX REACTION TAP (CALIBRATED PRECISION) ---
function ReflexTapGame({ onRewardXP }) {
  const [gameState, setGameState] = useState('waiting'); // 'waiting', 'ready', 'click', 'result'
  const [reactionTime, setReactionTime] = useState(null);
  const [bestTime, setBestTime] = useState(null);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  const startTest = () => {
    setGameState('ready');
    const delay = Math.floor(Math.random() * 2500) + 1500;
    timerRef.current = setTimeout(() => {
      startTimeRef.current = performance.now();
      setGameState('click');
      soundFX.playJump();
    }, delay);
  };

  const handleTap = () => {
    if (gameState === 'ready') {
      clearTimeout(timerRef.current);
      setGameState('waiting');
      soundFX.playCrash();
      alert('Too early! Wait until the box turns GREEN!');
    } else if (gameState === 'click') {
      const elapsed = Math.round(performance.now() - startTimeRef.current);
      setReactionTime(elapsed);
      setGameState('result');
      soundFX.playScore();
      onRewardXP?.(20);
      if (!bestTime || elapsed < bestTime) setBestTime(elapsed);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 max-w-md mx-auto shadow-lg text-center">
      <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">⚡ Reflex Reaction Tap</h3>
        {bestTime && <span className="text-xs font-mono font-bold text-emerald-500">Best: {bestTime}ms</span>}
      </div>

      <div
        onClick={gameState === 'waiting' || gameState === 'result' ? startTest : handleTap}
        className={`h-60 rounded-2xl border-2 flex flex-col items-center justify-center p-6 cursor-pointer select-none transition-colors shadow-inner ${
          gameState === 'ready'
            ? 'bg-rose-600 border-rose-400 text-white'
            : gameState === 'click'
            ? 'bg-emerald-500 border-emerald-300 text-white animate-pulse'
            : 'bg-slate-100 dark:bg-slate-950 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-200'
        }`}
      >
        {gameState === 'waiting' && (
          <>
            <span className="text-4xl mb-2">⚡</span>
            <h4 className="text-lg font-black text-slate-900 dark:text-white">TAP TO START TEST</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Wait for red to turn GREEN, then tap as fast as possible!</p>
          </>
        )}
        {gameState === 'ready' && (
          <>
            <h4 className="text-2xl font-black">HOLD ON...</h4>
            <p className="text-xs text-rose-200 mt-1">Wait for GREEN...</p>
          </>
        )}
        {gameState === 'click' && (
          <>
            <h4 className="text-3xl font-black">TAP NOW! ⚡</h4>
          </>
        )}
        {gameState === 'result' && (
          <>
            <span className="text-4xl font-mono font-black text-yellow-300 mb-1">{reactionTime} ms</span>
            <p className="text-xs text-slate-300">
              {reactionTime < 220 ? '⚡ Ultra Reflex!' : reactionTime < 300 ? '🔥 Pro Speed!' : '👍 Good Job!'} Tap to test again 🔄
            </p>
          </>
        )}
      </div>
    </div>
  );
}

// --- GAME 10: WORDLE JOY 5-LETTER GUESSER (WITH VIRTUAL KEYBOARD) ---
function AgWordleGame({ onRewardXP }) {
  const WORDS = ['CRANE', 'SPARK', 'BRAVE', 'POWER', 'SWEET', 'FLASH', 'SMILE', 'DREAM', 'SPEED', 'TIGER', 'PLANT', 'WATER', 'SOLAR', 'GRAIN', 'OCEAN'];
  const [targetWord, setTargetWord] = useState(() => WORDS[Math.floor(Math.random() * WORDS.length)]);
  const [currentInput, setCurrentInput] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleKeyClick = (char) => {
    if (char === 'ENTER') {
      submitGuess();
    } else if (char === 'BACK') {
      setCurrentInput(prev => prev.slice(0, -1));
    } else if (currentInput.length < 5) {
      setCurrentInput(prev => prev + char);
    }
  };

  const submitGuess = () => {
    if (currentInput.length !== 5) return;
    const upper = currentInput.toUpperCase();
    const newGuesses = [...guesses, upper];
    setGuesses(newGuesses);
    setCurrentInput('');

    if (upper === targetWord) {
      soundFX.playWin();
      setScore(s => s + 30);
      onRewardXP?.(25);
      setFeedback(`🎉 Awesome! Word Solved: ${targetWord} (+25 XP)`);
      confetti({ particleCount: 70 });
    } else if (newGuesses.length >= 6) {
      soundFX.playCrash();
      setFeedback(`❌ Out of tries! Word was: ${targetWord}`);
    } else {
      soundFX.playClick();
    }
  };

  useEffect(() => {
    const handlePhysicalKey = (e) => {
      if (e.key === 'Enter') submitGuess();
      else if (e.key === 'Backspace') setCurrentInput(prev => prev.slice(0, -1));
      else if (/^[a-zA-Z]$/.test(e.key) && currentInput.length < 5) {
        setCurrentInput(prev => (prev + e.key.toUpperCase()).slice(0, 5));
      }
    };
    window.addEventListener('keydown', handlePhysicalKey);
    return () => window.removeEventListener('keydown', handlePhysicalKey);
  });

  const KEY_ROWS = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK']
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 max-w-md mx-auto shadow-lg text-center">
      <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">🔤 Wordle Joy 5-Letter Guesser</h3>
        <span className="text-fuchsia-500 font-mono font-bold text-xs">Score: {score}</span>
      </div>

      {feedback && (
        <div className="p-2.5 rounded-lg bg-fuchsia-50 dark:bg-fuchsia-950 text-fuchsia-800 dark:text-fuchsia-200 font-bold text-xs">
          {feedback}
        </div>
      )}

      {/* Grid */}
      <div className="space-y-2 max-w-xs mx-auto">
        {Array(6).fill(null).map((_, rIdx) => {
          const isCurrentRow = rIdx === guesses.length;
          const w = guesses[rIdx] || (isCurrentRow ? currentInput : '');
          return (
            <div key={rIdx} className="grid grid-cols-5 gap-1.5">
              {Array(5).fill(null).map((_, cIdx) => {
                const letter = w[cIdx] || '';
                let bg = 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300';
                if (guesses[rIdx]) {
                  if (letter === targetWord[cIdx]) bg = 'bg-emerald-600 text-white font-extrabold';
                  else if (targetWord.includes(letter)) bg = 'bg-amber-500 text-slate-950 font-extrabold';
                  else bg = 'bg-slate-400 dark:bg-slate-700 text-white';
                }
                return (
                  <div key={cIdx} className={`h-10 rounded-xl border flex items-center justify-center font-mono font-black text-sm uppercase ${bg}`}>
                    {letter}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Virtual Keyboard */}
      <div className="space-y-1.5 pt-2">
        {KEY_ROWS.map((row, rIdx) => (
          <div key={rIdx} className="flex justify-center gap-1">
            {row.map((char) => (
              <button
                key={char}
                onClick={() => handleKeyClick(char)}
                className={`py-2 px-2.5 rounded-lg text-xs font-mono font-bold transition ${
                  char === 'ENTER' || char === 'BACK'
                    ? 'bg-slate-300 dark:bg-slate-700 text-slate-900 dark:text-white px-3'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-fuchsia-600 hover:text-white'
                }`}
              >
                {char === 'BACK' ? '⌫' : char}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// --- GAME 11: SPEED MENTAL MATH BLITZ ---
function SpeedMathGame({ onRewardXP }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [currentQ, setCurrentQ] = useState(null);

  const generateQ = () => {
    const a = Math.floor(Math.random() * 12) + 2;
    const b = Math.floor(Math.random() * 12) + 2;
    const isMult = Math.random() > 0.4;
    const ans = isMult ? a * b : a + b;
    const qStr = isMult ? `${a} × ${b}` : `${a} + ${b}`;
    const fake1 = ans + (Math.random() > 0.5 ? 2 : -2);
    const fake2 = ans + (Math.random() > 0.5 ? 4 : -4);
    const fake3 = ans + (Math.random() > 0.5 ? 6 : -6);
    const opts = [ans, fake1, fake2, fake3].sort(() => Math.random() - 0.5);
    return { q: qStr, ans, opts };
  };

  const startBlitz = () => {
    setScore(0);
    setTimeLeft(30);
    setCurrentQ(generateQ());
    setIsPlaying(true);
    soundFX.playClick();
  };

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          setIsPlaying(false);
          soundFX.playWin();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handlePick = (opt) => {
    if (opt === currentQ.ans) {
      soundFX.playScore();
      setScore(s => s + 10);
      onRewardXP?.(10);
    } else {
      soundFX.playCrash();
    }
    setCurrentQ(generateQ());
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 max-w-md mx-auto shadow-lg text-center">
      <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">⚡ Speed Mental Math Blitz</h3>
        <div className="flex gap-3 text-xs font-mono font-bold">
          <span className="text-rose-500">⏳ {timeLeft}s</span>
          <span className="text-emerald-500">Score: {score}</span>
        </div>
      </div>

      {!isPlaying ? (
        <div className="py-8 space-y-3">
          <span className="text-4xl">⚡</span>
          <h4 className="text-base font-extrabold text-slate-900 dark:text-white">30-Second Rapid Sprint</h4>
          <button
            onClick={startBlitz}
            className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-xl text-xs transition shadow-md"
          >
            START 30s BLITZ ⚡
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h4 className="text-3xl font-black text-slate-900 dark:text-white font-mono">{currentQ?.q} = ?</h4>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {currentQ?.opts.map((opt, i) => (
              <button
                key={i}
                onClick={() => handlePick(opt)}
                className="p-4 bg-slate-100 dark:bg-slate-800 hover:bg-rose-600 hover:text-white rounded-xl font-mono font-bold text-lg text-slate-900 dark:text-white transition"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// --- GAME 12: STAR & BUBBLE POPPER (SMOOTH DRIFT PHYSICS) ---
function StarPopperGame({ onRewardXP }) {
  const [bubbles, setBubbles] = useState([]);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const startPopper = () => {
    setScore(0);
    setBubbles([]);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setBubbles(prev => [
        ...prev.slice(-12),
        {
          id: Date.now() + Math.random(),
          x: Math.random() * 80 + 10,
          y: Math.random() * 65 + 15,
          emoji: ['⭐', '🎈', '🍉', '🍩', '💎'][Math.floor(Math.random() * 5)]
        }
      ]);
    }, 550);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const popBubble = (id) => {
    soundFX.playScore();
    setScore(s => s + 10);
    onRewardXP?.(5);
    setBubbles(prev => prev.filter(b => b.id !== id));
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 max-w-md mx-auto shadow-lg text-center">
      <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
        <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">🎈 Star & Bubble Popper</h3>
        <span className="text-blue-500 font-mono font-bold text-xs">Popped: {score / 10}</span>
      </div>

      <div className="relative h-72 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden select-none">
        {bubbles.map((b) => (
          <button
            key={b.id}
            onClick={() => popBubble(b.id)}
            style={{ left: `${b.x}%`, top: `${b.y}%` }}
            className="absolute text-3xl animate-bounce hover:scale-125 transition"
          >
            {b.emoji}
          </button>
        ))}

        {!isPlaying && (
          <div className="absolute inset-0 bg-slate-950/85 flex flex-col items-center justify-center p-4 text-white space-y-3">
            <span className="text-4xl">🎈</span>
            <h4 className="font-black text-blue-400">BUBBLE POPPER</h4>
            <p className="text-xs text-slate-400">Tap and pop floating bubbles for easy relaxation!</p>
            <button
              onClick={startPopper}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-xl text-xs transition"
            >
              START POPPING 🎈
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
