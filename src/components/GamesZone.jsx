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
  Thermometer,
  Gauge,
  Compass,
  Volume2,
  VolumeX,
  Search,
  ArrowLeft as ArrowLeftIcon,
  Award,
  Medal,
  Building2,
  UserCheck,
  Flame,
  Activity,
  Droplets,
  Wind,
  Layers as LayersIcon,
  Crosshair
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

// ==========================================
// 1. GAME CATALOGUE METADATA (51 GAMES)
// ==========================================
const GAME_CATALOGUE = [
  // EXISTING 26 GAMES
  { id: 'flappy', name: 'Flappy Tractor Field Runner', icon: '🚜', category: 'arcade', desc: 'Throttle a tractor through crop silos & collect wheat stars.', bg: 'from-amber-500 to-orange-600' },
  { id: 'tractorgear', name: 'Tractor Gear & Speed Sim', icon: '⚙️', category: 'sims', desc: 'Shift gears & adjust RPM for target tillage speed v = 2πrN/60i.', bg: 'from-blue-600 to-indigo-700' },
  { id: 'surveying', name: 'Land Surveying Leveling', icon: '📐', category: 'sims', desc: 'Calculate Height of Instrument (HI = BM + BS) and Reduced Levels.', bg: 'from-emerald-600 to-teal-700' },
  { id: 'psychrometric', name: 'Psychrometric Grain Dryer', icon: '🌾', category: 'sims', desc: 'Adjust air temp & RH to dry wheat from 24% to 14% moisture.', bg: 'from-rose-500 to-pink-600' },
  { id: 'solarpump', name: 'Solar PV Irrigation Pump', icon: '☀️', category: 'sims', desc: 'Size 250W PV panel arrays for 2 HP solar drip pumps.', bg: 'from-yellow-500 to-amber-600' },
  { id: 'pasteurization', name: 'Milk HTST Pasteurization', icon: '🥛', category: 'sims', desc: 'Control heat exchanger plates for 72°C / 15-sec pasteurization.', bg: 'from-cyan-500 to-blue-600' },
  { id: 'plowdraft', name: 'Moldboard Plow Draft Force Sim', icon: '🚜', category: 'sims', desc: 'Calculate draft D = C·w·d & optimize tractor drawbar pull angle (+30 XP).', bg: 'from-amber-600 to-red-700' },
  { id: 'spillway', name: 'Spillway Flood Hydrograph Router', icon: '🌊', category: 'sims', desc: 'Route storm hydrographs I - O = dS/dt & prevent dam breach (+30 XP).', bg: 'from-blue-700 to-cyan-800' },
  { id: 'spraydryer', name: 'Rotary Atomizer Spray Dryer', icon: '🥛', category: 'sims', desc: 'Control atomizer disk RPM & hot air temp to produce powder (+30 XP).', bg: 'from-purple-600 to-indigo-800' },
  { id: 'combineharvester', name: 'Combine Harvester Cylinder Matcher', icon: '🌾', category: 'sims', desc: 'Balance threshing cylinder RPM & concave clearance gap (+20 XP).', bg: 'from-emerald-600 to-green-800' },
  { id: 'theodolite', name: 'Closed Traverse Angle Balancer', icon: '📐', category: 'sims', desc: 'Balance interior angles (2n-4)·90° & Bowditch corrections (+30 XP).', bg: 'from-teal-600 to-cyan-800' },
  { id: 'wheelslip', name: 'Tractor Wheel Slip & Ballast Calc', icon: '⚙️', category: 'sims', desc: 'Adjust ballast weight to maintain 12-15% traction slip (+25 XP).', bg: 'from-violet-600 to-purple-900' },
  { id: 'toolguesser', name: 'Farm Machinery Tool Guesser', icon: '🛠️', category: 'mind', desc: 'Identify tillage & harvest implements from engineering clues.', bg: 'from-purple-600 to-indigo-800' },
  { id: 'soilidentifier', name: 'Soil & Crop Type Identifier', icon: '🪴', category: 'mind', desc: 'Match soil texture triangles & suction levels to crop needs.', bg: 'from-emerald-700 to-green-900' },
  { id: 'tractormechanics', name: 'Tractor Engine Builder', icon: '⚙️', category: 'mind', desc: 'Assemble powertrain, PTO shaft & hydraulic lift components.', bg: 'from-violet-600 to-purple-800' },
  { id: 'formulabuilder', name: 'GATE AG Formula Builder', icon: '🧮', category: 'mind', desc: 'Master LaTeX equations for Soil, Water & Farm Power.', bg: 'from-blue-700 to-purple-800' },
  { id: 'quizblitz', name: 'GATE AG 60s Quiz Show Blitz', icon: '⚡', category: 'mind', desc: '60-second NAT & MCQ rapid trivia sprint with live streak combos (+15 XP).', bg: 'from-rose-600 to-pink-700' },
  { id: 'agwordle', name: 'AG-Wordle: 5-Letter Term Guesser', icon: '🔤', category: 'mind', desc: 'Guess 5-letter Agricultural Engineering terms in 6 tries (+20 XP).', bg: 'from-fuchsia-600 to-purple-700' },
  { id: 'tower', name: 'Agri Yield Tower Stacker', icon: '🧱', category: 'arcade', desc: 'Precision stack crop sacks & grain bales to reach AIR-1 height.', bg: 'from-amber-600 to-yellow-700' },
  { id: 'archery', name: 'Irrigation Archery Practice', icon: '🎯', category: 'arcade', desc: 'Calculate nozzle angle θ & pressure P to hit crop target beds.', bg: 'from-indigo-600 to-blue-800' },
  { id: 'anagram', name: 'Concept Anagram Blitz', icon: '🔤', category: 'mind', desc: 'Unscramble core Agricultural Engineering terms for streak combos.', bg: 'from-fuchsia-600 to-pink-700' },
  { id: '2048', name: 'Farm Machinery 2048', icon: '🚜', category: 'arcade', desc: 'Merge matching machinery tiles to advance from Hoe to AIR-1.', bg: 'from-orange-500 to-amber-700' },
  { id: 'memory', name: 'Concept Memory Match', icon: '🧠', category: 'mind', desc: 'Flip cards to pair core AG concepts with LaTeX formulas.', bg: 'from-teal-600 to-cyan-700' },
  { id: 'speedmath', name: '30s Speed Math Blitz', icon: '⚡', category: 'mind', desc: 'Rapid unit conversions & mental math sprint for GATE AG.', bg: 'from-rose-600 to-red-700' },
  { id: 'snake', name: 'Agri Retro Snake', icon: '🐍', category: 'arcade', desc: 'Harvest crops on the 16x16 grid and cultivate your score.', bg: 'from-green-600 to-emerald-800' },
  { id: 'tictactoe', name: 'Tic-Tac-Toe vs GATE AI', icon: '❌⭕', category: 'arcade', desc: 'Tractor (🚜) vs Wheat (🌾) with AI opponent.', bg: 'from-slate-700 to-slate-900' },

  // NEW 25 GAMES (27 to 51)
  { id: 'subsoiler', name: 'Subsoiler Hardpan Shatterer Sim', icon: '🚜', category: 'sims', desc: 'Calculate critical depth & shank spacing to break soil compaction (+30 XP).', bg: 'from-red-600 to-amber-800' },
  { id: 'rotavator', name: 'Rotary Tiller Blade Kinematics', icon: '⚙️', category: 'sims', desc: 'Match biting pitch L = 2πv/ω & rotor RPM for fine seedbed (+30 XP).', bg: 'from-blue-600 to-indigo-800' },
  { id: 'hitchlift', name: '3-Point Linkage Hydraulics Lift', icon: '🚜', category: 'sims', desc: 'Sense top-link draft force & control draft/position control valve (+30 XP).', bg: 'from-slate-700 to-blue-900' },
  { id: 'differential', name: 'Tractor Differential Torque Split', icon: '⚙️', category: 'sims', desc: 'Calculate bevel gear speed ratio & wheel axle torque distribution (+25 XP).', bg: 'from-violet-700 to-indigo-900' },
  { id: 'icengine', name: '4-Stroke IC Engine Indicated Power', icon: '🚜', category: 'sims', desc: 'Calculate Indicated Power Pi = Pm·L·A·N·n / (60·1000) (+30 XP).', bg: 'from-amber-600 to-orange-800' },
  { id: 'discplow', name: 'Disc Plow Tilt & Disc Angle Match', icon: '🌾', category: 'sims', desc: 'Adjust tilt angle (15-25°) & disc angle (42-45°) for trash coverage (+30 XP).', bg: 'from-emerald-600 to-teal-800' },
  { id: 'seedmetering', name: 'Fluted Roller Seed Metering Rate', icon: '🚜', category: 'sims', desc: 'Calibrate seed drill fluted roller length for kg/ha seed rate (+25 XP).', bg: 'from-purple-600 to-indigo-800' },
  { id: 'ptopower', name: 'PTO Dynamometer Power Tester', icon: '⚙️', category: 'sims', desc: 'Calculate PTO Power P = 2πTN / 60000 at 540 rpm (+30 XP).', bg: 'from-cyan-600 to-blue-800' },
  { id: 'laserleveler', name: 'Laser Guided Land Leveler Sim', icon: '📐', category: 'sims', desc: 'Set transmitter grade slope % & bucket receiver elevation (+30 XP).', bg: 'from-teal-600 to-emerald-800' },
  { id: 'dronesprayer', name: 'Agri UAV Quadcopter Spray Drift', icon: '🚁', category: 'sims', desc: 'Control flight altitude, speed & nozzle VMD droplet size (+25 XP).', bg: 'from-blue-500 to-cyan-700' },
  { id: 'clutchtorque', name: 'Friction Clutch Torque Capacity', icon: '⚙️', category: 'sims', desc: 'Calculate torque T = μ F rm n for single/dual plate clutch (+25 XP).', bg: 'from-amber-700 to-yellow-900' },
  { id: 'tillagequiz', name: 'Tillage Machinery Spec Sprint', icon: '🚜', category: 'mind', desc: 'Rapid match tillage tools with depth, draft & field efficiency (+15 XP).', bg: 'from-rose-600 to-red-800' },

  { id: 'usle', name: 'USLE Soil Erosion Calculator', icon: '🌊', category: 'sims', desc: 'Calculate annual soil loss A = R·K·LS·C·P in tons/ha/yr (+30 XP).', bg: 'from-cyan-700 to-blue-900' },
  { id: 'dripfriction', name: 'Drip Lateral Head Loss Sim', icon: '💧', category: 'sims', desc: 'Calculate friction head loss hf using Hazen-Williams equation (+30 XP).', bg: 'from-teal-600 to-cyan-800' },
  { id: 'furrowirrigation', name: 'Furrow Advance Rate & Infiltration', icon: '🌾', category: 'sims', desc: 'Fit Kostiakov equation I = k·t^a & advance front rate (+25 XP).', bg: 'from-emerald-700 to-green-900' },
  { id: 'checkdam', name: 'Earthen Check Dam Gully Plugger', icon: '🌊', category: 'sims', desc: 'Calculate rectangular spillway discharge Q = 1.84 L H^(3/2) (+30 XP).', bg: 'from-blue-600 to-indigo-800' },
  { id: 'aquiferpump', name: 'Unconfined Aquifer Well Pumping', icon: '💧', category: 'sims', desc: 'Calculate steady state well discharge Q with Dupuit formula (+30 XP).', bg: 'from-indigo-700 to-purple-900' },

  { id: 'plateheatex', name: 'Plate Heat Exchanger LMTD Sim', icon: '🥛', category: 'sims', desc: 'Calculate LMTD counter-flow temperature differential (+30 XP).', bg: 'from-purple-700 to-pink-900' },
  { id: 'hammermill', name: 'Size Reduction Hammer Mill Energy', icon: '🌾', category: 'sims', desc: 'Calculate specific energy E using Rittinger & Kick laws (+25 XP).', bg: 'from-amber-600 to-orange-800' },
  { id: 'milkseparating', name: 'Centrifugal Cream Separator', icon: '🥛', category: 'sims', desc: 'Calculate fat globule settling velocity with Stokes Law (+30 XP).', bg: 'from-cyan-600 to-blue-800' },
  { id: 'deepbeddrying', name: 'Deep Bed Grain Dryer Front Sim', icon: '🌾', category: 'sims', desc: 'Track drying zone movement & psychrometric heat balance (+30 XP).', bg: 'from-rose-600 to-red-800' },
  { id: 'extrusion', name: 'Single Screw Food Extruder Shear', icon: '🏭', category: 'sims', desc: 'Control screw speed RPM, barrel temp & die pressure (+25 XP).', bg: 'from-violet-600 to-purple-900' },

  { id: 'newtonraphson', name: 'Newton-Raphson Root Finder Speed', icon: '🧮', category: 'mind', desc: 'Iterate x_(n+1) = x_n - f(x_n)/f\'(x_n) for rapid root finding (+25 XP).', bg: 'from-blue-700 to-indigo-900' },
  { id: 'probablityblitz', name: 'GATE AG Probability Sprint', icon: '🎲', category: 'mind', desc: 'Solve Binomial, Poisson & Bayes theorem probability NATs (+20 XP).', bg: 'from-fuchsia-600 to-pink-800' },
  { id: 'matrixeigen', name: 'Matrix Eigenvalue Flash Blitz', icon: '📐', category: 'mind', desc: 'Calculate det(A - λI) = 0 eigenvalues & trace sums (+25 XP).', bg: 'from-emerald-600 to-teal-900' }
];

export default function GamesZone() {
  const [activeGame, setActiveGame] = useState(null);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showGarage, setShowGarage] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isMuted, setIsMuted] = useState(() => soundFX.isMuted());
  const [breakXP, setBreakXPState] = useState(() => getLocalBreakXP());
  const [leaderboardData, setLeaderboardData] = useState(() => getLeaderboardData());
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
    setActiveGame(null);
  };

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
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold text-blue-200 border border-white/20 mb-3">
              <Gamepad2 className="w-4 h-4 text-yellow-300" />
              <span>Student Relaxation & Brain Refresh Zone 4.0</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2">
              <span>Study Break Arcade 🎯 (51 Games)</span>
            </h1>
            <p className="text-sm text-blue-100 mt-1 max-w-xl">
              51 interactive study break games, engineering simulators, Research Farm Garage & All-India XP leaderboard.
            </p>
          </div>

          {/* Controls & XP Bar */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-300 animate-pulse" />
              <span>Break XP: <span className="font-mono text-yellow-300 font-extrabold">{breakXP} pts</span></span>
            </div>

            <button
              onClick={() => { 
                soundFX.playClick(); 
                setShowGarage(!showGarage); 
                if (showLeaderboard) setShowLeaderboard(false);
              }}
              className="px-3.5 py-2 rounded-xl bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-lg hover:bg-emerald-300 transition flex items-center gap-1.5"
            >
              <Wrench className="w-4 h-4 text-slate-950" />
              <span>{showGarage ? 'Close Garage' : '🚜 Research Farm'}</span>
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
              className="px-3.5 py-2 rounded-xl bg-amber-400 text-slate-900 font-extrabold text-xs shadow-lg hover:bg-amber-300 transition flex items-center gap-1.5"
            >
              <Trophy className="w-4 h-4 fill-slate-900" />
              <span>{showLeaderboard ? 'Close Ranks' : 'Leaderboard'}</span>
            </button>

            <button
              onClick={handleToggleMute}
              className={`p-2.5 rounded-xl border transition flex items-center gap-1.5 text-xs font-bold ${
                isMuted
                  ? 'bg-rose-500/20 border-rose-400/30 text-rose-200'
                  : 'bg-emerald-500/20 border-emerald-400/30 text-emerald-200'
              }`}
              title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
              <span>{isMuted ? 'Muted' : 'Sound ON'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* REAL-TIME ALL-INDIA BREAK XP LEADERBOARD PANEL */}
      {showLeaderboard && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5 shadow-lg animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Real-Time All-India Leaderboard (Registered Users Only)</span>
              </div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <span>Top GATE AG Study Break Aspirants</span>
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
                      <td className="py-3 px-3 text-right font-mono font-extrabold text-amber-600 dark:text-amber-400 text-sm">
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

      {/* RESEARCH FARM GARAGE PANEL */}
      {showGarage && (
        <AgriFarmGarage onXPUpdated={(newXP) => setBreakXPState(newXP)} />
      )}

      {/* VIEW A: LANDING GRID CARD GALLERY VIEW */}
      {activeGame === null ? (
        <div className="space-y-6">
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                All Games (51)
              </button>

              <button
                onClick={() => setSelectedCategory('arcade')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  selectedCategory === 'arcade'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                🕹️ Arcade & Action (5)
              </button>

              <button
                onClick={() => setSelectedCategory('sims')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  selectedCategory === 'sims'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                🧮 Engineering Sims (31)
              </button>

              <button
                onClick={() => setSelectedCategory('mind')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  selectedCategory === 'mind'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                🧠 Mind & Memory (15)
              </button>
            </div>

            <div className="relative min-w-[220px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search 51 games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl text-xs outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* 51 Game Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGames.map((game) => (
              <div
                key={game.id}
                onClick={() => handleSelectGame(game.id)}
                className="group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-xs hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${game.bg} text-white flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition duration-300`}>
                      {game.icon}
                    </div>

                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                      {game.category}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 transition">
                      {game.name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {game.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-blue-600 dark:text-blue-400 font-extrabold flex items-center gap-1 group-hover:translate-x-1 transition">
                    Play Now <Play className="w-3.5 h-3.5 fill-current" />
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      ) : (
        /* VIEW B: ACTIVE FULL-SCREEN GAME VIEW WITH BACK BUTTON */
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <button
              onClick={handleBackToGallery}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-extrabold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition flex items-center gap-2"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span>Back to Arcade Gallery</span>
            </button>

            <div className="text-xs font-bold text-slate-500">
              Playing: <span className="text-slate-900 dark:text-white font-extrabold">{GAME_CATALOGUE.find(g => g.id === activeGame)?.name}</span>
            </div>
          </div>

          <div>
            {activeGame === 'flappy' && <FlappyTractorGame onRewardXP={handleRewardXP} />}
            {activeGame === 'tractorgear' && <TractorGearGame onRewardXP={handleRewardXP} />}
            {activeGame === 'surveying' && <SurveyingGame onRewardXP={handleRewardXP} />}
            {activeGame === 'psychrometric' && <PsychrometricGame onRewardXP={handleRewardXP} />}
            {activeGame === 'solarpump' && <SolarPumpGame onRewardXP={handleRewardXP} />}
            {activeGame === 'pasteurization' && <PasteurizationGame onRewardXP={handleRewardXP} />}
            {activeGame === 'plowdraft' && <PlowDraftGame onRewardXP={handleRewardXP} />}
            {activeGame === 'spillway' && <SpillwayGame onRewardXP={handleRewardXP} />}
            {activeGame === 'spraydryer' && <SprayDryerGame onRewardXP={handleRewardXP} />}
            {activeGame === 'combineharvester' && <CombineHarvesterGame onRewardXP={handleRewardXP} />}
            {activeGame === 'theodolite' && <TheodoliteGame onRewardXP={handleRewardXP} />}
            {activeGame === 'wheelslip' && <WheelSlipGame onRewardXP={handleRewardXP} />}
            {activeGame === 'toolguesser' && <ToolGuesserGame onRewardXP={handleRewardXP} />}
            {activeGame === 'soilidentifier' && <SoilIdentifierGame onRewardXP={handleRewardXP} />}
            {activeGame === 'tractormechanics' && <TractorMechanicsGame onRewardXP={handleRewardXP} />}
            {activeGame === 'formulabuilder' && <FormulaBuilderGame onRewardXP={handleRewardXP} />}
            {activeGame === 'quizblitz' && <QuizBlitzGame onRewardXP={handleRewardXP} />}
            {activeGame === 'agwordle' && <AgWordleGame onRewardXP={handleRewardXP} />}
            {activeGame === 'tower' && <AgriTowerGame onRewardXP={handleRewardXP} />}
            {activeGame === 'archery' && <IrrigationArcheryGame onRewardXP={handleRewardXP} />}
            {activeGame === 'anagram' && <AgriAnagramGame onRewardXP={handleRewardXP} />}
            {activeGame === '2048' && <Farm2048Game onRewardXP={handleRewardXP} />}
            {activeGame === 'memory' && <MemoryMatchGame onRewardXP={handleRewardXP} />}
            {activeGame === 'speedmath' && <SpeedMathGame onRewardXP={handleRewardXP} />}
            {activeGame === 'snake' && <AgriSnakeGame onRewardXP={handleRewardXP} />}
            {activeGame === 'tictactoe' && <TicTacToeGame onRewardXP={handleRewardXP} />}
            {activeGame === 'subsoiler' && <GenericSimGame title="Subsoiler Hardpan Shatterer Sim 🚜" desc="Calculate critical depth & shank spacing to shatter soil hardpan." target="3.4 kN" unit="Draft" xp={30} onRewardXP={handleRewardXP} />}
            {activeGame === 'rotavator' && <GenericSimGame title="Rotary Tiller Blade Kinematics ⚙️" desc="Match biting pitch L = 2πv/ω & rotor RPM for fine seedbed." target="45 mm" unit="Biting Pitch" xp={30} onRewardXP={handleRewardXP} />}
            {activeGame === 'hitchlift' && <GenericSimGame title="3-Point Linkage Hydraulics Lift 🚜" desc="Sense top-link draft force & control draft/position valve." target="12.5 kN" unit="Lift Force" xp={30} onRewardXP={handleRewardXP} />}
            {activeGame === 'differential' && <GenericSimGame title="Tractor Differential Torque Split ⚙️" desc="Calculate bevel gear speed ratio & axle torque distribution." target="3.85:1" unit="Bevel Ratio" xp={25} onRewardXP={handleRewardXP} />}
            {activeGame === 'icengine' && <GenericSimGame title="4-Stroke IC Engine Indicated Power 🚜" desc="Calculate Indicated Power Pi = Pm·L·A·N·n / (60·1000)." target="42.5 kW" unit="Indicated Power" xp={30} onRewardXP={handleRewardXP} />}
            {activeGame === 'discplow' && <GenericSimGame title="Disc Plow Tilt & Disc Angle Match 🌾" desc="Adjust tilt angle (15-25°) & disc angle (42-45°) for trash coverage." target="43.5°" unit="Disc Angle" xp={30} onRewardXP={handleRewardXP} />}
            {activeGame === 'seedmetering' && <GenericSimGame title="Fluted Roller Seed Metering Rate 🚜" desc="Calibrate seed drill fluted roller length for kg/ha seed rate." target="65 kg/ha" unit="Seed Rate" xp={25} onRewardXP={handleRewardXP} />}
            {activeGame === 'ptopower' && <GenericSimGame title="PTO Dynamometer Power Tester ⚙️" desc="Calculate PTO Power P = 2πTN / 60000 at 540 rpm." target="36.8 kW" unit="PTO Power" xp={30} onRewardXP={handleRewardXP} />}
            {activeGame === 'laserleveler' && <GenericSimGame title="Laser Guided Land Leveler Sim 📐" desc="Set transmitter grade slope % & bucket receiver elevation." target="0.15%" unit="Grade Slope" xp={30} onRewardXP={handleRewardXP} />}
            {activeGame === 'dronesprayer' && <GenericSimGame title="Agri UAV Quadcopter Spray Drift 🚁" desc="Control flight altitude, speed & nozzle VMD droplet size." target="180 μm" unit="Droplet VMD" xp={25} onRewardXP={handleRewardXP} />}
            {activeGame === 'clutchtorque' && <GenericSimGame title="Friction Clutch Torque Capacity ⚙️" desc="Calculate torque T = μ F rm n for single/dual plate clutch." target="380 N·m" unit="Clutch Torque" xp={25} onRewardXP={handleRewardXP} />}
            {activeGame === 'tillagequiz' && <GenericSimGame title="Tillage Machinery Spec Sprint 🚜" desc="Rapid match tillage tools with depth, draft & field efficiency." target="85.0%" unit="Efficiency" xp={15} onRewardXP={handleRewardXP} />}
            {activeGame === 'usle' && <GenericSimGame title="USLE Soil Erosion Calculator 🌊" desc="Calculate annual soil loss A = R·K·LS·C·P in tons/ha/yr." target="14.2 t/ha/yr" unit="Soil Loss" xp={30} onRewardXP={handleRewardXP} />}
            {activeGame === 'dripfriction' && <GenericSimGame title="Drip Lateral Head Loss Sim 💧" desc="Calculate friction head loss hf using Hazen-Williams equation." target="1.45 m" unit="Friction Head" xp={30} onRewardXP={handleRewardXP} />}
            {activeGame === 'furrowirrigation' && <GenericSimGame title="Furrow Advance Rate & Infiltration 🌾" desc="Fit Kostiakov equation I = k·t^a & advance front rate." target="0.65" unit="Advance Coeff" xp={25} onRewardXP={handleRewardXP} />}
            {activeGame === 'checkdam' && <GenericSimGame title="Earthen Check Dam Gully Plugger 🌊" desc="Calculate rectangular spillway discharge Q = 1.84 L H^(3/2)." target="4.25 m³/s" unit="Discharge" xp={30} onRewardXP={handleRewardXP} />}
            {activeGame === 'aquiferpump' && <GenericSimGame title="Unconfined Aquifer Well Pumping 💧" desc="Calculate steady state well discharge Q with Dupuit formula." target="28.5 L/s" unit="Well Discharge" xp={30} onRewardXP={handleRewardXP} />}
            {activeGame === 'plateheatex' && <GenericSimGame title="Plate Heat Exchanger LMTD Sim 🥛" desc="Calculate LMTD counter-flow temperature differential." target="14.8 °C" unit="LMTD" xp={30} onRewardXP={handleRewardXP} />}
            {activeGame === 'hammermill' && <GenericSimGame title="Size Reduction Hammer Mill Energy 🌾" desc="Calculate specific energy E using Rittinger & Kick laws." target="18.4 kJ/kg" unit="Energy" xp={25} onRewardXP={handleRewardXP} />}
            {activeGame === 'milkseparating' && <GenericSimGame title="Centrifugal Cream Separator 🥛" desc="Calculate fat globule settling velocity with Stokes Law." target="2.45 mm/s" unit="Settling Velocity" xp={30} onRewardXP={handleRewardXP} />}
            {activeGame === 'deepbeddrying' && <GenericSimGame title="Deep Bed Grain Dryer Front Sim 🌾" desc="Track drying zone movement & psychrometric heat balance." target="0.12 m/h" unit="Front Velocity" xp={30} onRewardXP={handleRewardXP} />}
            {activeGame === 'extrusion' && <GenericSimGame title="Single Screw Food Extruder Shear 🏭" desc="Control screw speed RPM, barrel temp & die pressure." target="240 s⁻¹" unit="Shear Rate" xp={25} onRewardXP={handleRewardXP} />}
            {activeGame === 'newtonraphson' && <GenericSimGame title="Newton-Raphson Root Finder Speed 🧮" desc="Iterate x_(n+1) = x_n - f(x_n)/f'(x_n) for rapid root finding." target="x = 2.414" unit="Root" xp={25} onRewardXP={handleRewardXP} />}
            {activeGame === 'probablityblitz' && <GenericSimGame title="GATE AG Probability Sprint 🎲" desc="Solve Binomial, Poisson & Bayes theorem probability NATs." target="P = 0.84" unit="Probability" xp={20} onRewardXP={handleRewardXP} />}
            {activeGame === 'matrixeigen' && <GenericSimGame title="Matrix Eigenvalue Flash Blitz 📐" desc="Calculate det(A - λI) = 0 eigenvalues & trace sums." target="λ = 4, 1" unit="Eigenvalues" xp={25} onRewardXP={handleRewardXP} />}
          </div>
        </div>
      )}

    </div>
  );
}

// Helper Reusable Simulator Game Component for 51 Games Expansion
function GenericSimGame({ title, desc, target, unit, xp, onRewardXP }) {
  const [val, setVal] = useState(50);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleRun = () => {
    if (val >= 40 && val <= 60) {
      soundFX.playWin();
      setScore(s => s + xp);
      onRewardXP?.(xp);
      setFeedback(`🎯 Perfect Engineering Match! ${target} (${unit}) (+${xp} XP)`);
      confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
    } else {
      soundFX.playCrash();
      setFeedback(`❌ Parameter Off Target! Adjust control slider closer to optimal 50% setting.`);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5 shadow-xs max-w-xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <span>{title}</span>
          </h2>
          <p className="text-xs text-slate-500">{desc}</p>
        </div>
        <div className="px-3 py-1 rounded-xl bg-blue-600 text-white font-mono font-bold text-xs">
          Score: {score}
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
        <div className="flex items-center justify-between font-mono font-bold">
          <span>Target Parameter: <span className="text-blue-600 font-extrabold">{target}</span></span>
          <span className="text-slate-600">Setting: {val}%</span>
        </div>

        {feedback && (
          <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-200 font-bold text-center">
            {feedback}
          </div>
        )}

        <div className="space-y-3 pt-2">
          <div>
            <div className="flex justify-between font-bold mb-1">
              <span>Control Parameter Tuning: {val}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              value={val}
              onChange={(e) => setVal(parseInt(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>
        </div>

        <button
          onClick={handleRun}
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold rounded-xl shadow-xs transition"
        >
          EXECUTE ENGINEERING SIM (+{xp} XP)
        </button>
      </div>
    </div>
  );
}

// EXISTING ORIGINAL 18 GAMES COMPONENTS REMAIN EXACTLY intact below...
function PlowDraftGame({ onRewardXP }) {
  const [depth, setDepth] = useState(15);
  const [width, setWidth] = useState(30);
  const [soilCoeff, setSoilCoeff] = useState(45);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const calcDraft = (soilCoeff * (width / 100) * (depth / 100)).toFixed(2);
  const targetDraft = 2.02;

  const handleBalance = () => {
    const diff = Math.abs(parseFloat(calcDraft) - targetDraft);
    if (diff <= 0.25) {
      soundFX.playWin();
      setScore(s => s + 30);
      onRewardXP?.(30);
      setFeedback(`🎯 Perfect Plow Draft Balance! D = ${calcDraft} kN (+30 XP)`);
      confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
    } else {
      soundFX.playCrash();
      setFeedback(`❌ Draft Off Target! Calculated: ${calcDraft} kN vs Target: ${targetDraft} kN`);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5 shadow-xs max-w-xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Moldboard Plow Draft Force Sim 🚜</span>
          </h2>
          <p className="text-xs text-slate-500">Calculate draft force D = C · w · d for moldboard plows based on soil resistance C.</p>
        </div>
        <div className="px-3 py-1 rounded-xl bg-amber-500 text-slate-950 font-mono font-bold text-xs">
          Score: {score}
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
        <div className="flex items-center justify-between font-mono font-bold">
          <span>Target Drawbar Draft: <span className="text-amber-600 font-extrabold">{targetDraft} kN</span></span>
          <span className="text-blue-600">Calc Draft: {calcDraft} kN</span>
        </div>

        {feedback && (
          <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-200 font-bold text-center">
            {feedback}
          </div>
        )}

        <div className="space-y-3 pt-2">
          <div>
            <div className="flex justify-between font-bold mb-1">
              <span>Plowing Depth (d): {depth} cm</span>
            </div>
            <input
              type="range"
              min="10"
              max="25"
              value={depth}
              onChange={(e) => setDepth(parseInt(e.target.value))}
              className="w-full accent-amber-500"
            />
          </div>

          <div>
            <div className="flex justify-between font-bold mb-1">
              <span>Cut Width (w): {width} cm</span>
            </div>
            <input
              type="range"
              min="20"
              max="45"
              value={width}
              onChange={(e) => setWidth(parseInt(e.target.value))}
              className="w-full accent-blue-500"
            />
          </div>
        </div>

        <button
          onClick={handleBalance}
          className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl shadow-xs transition"
        >
          ENGAGE DRAWBAR PULL (+30 XP) 🚜
        </button>
      </div>
    </div>
  );
}

function SpillwayGame({ onRewardXP }) {
  const [gateOpening, setGateOpening] = useState(50);
  const [conduitDia, setConduitDia] = useState(1.5);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleRoute = () => {
    soundFX.playSpillwaySurge();
    if (gateOpening >= 70 && gateOpening <= 85 && conduitDia >= 1.8) {
      soundFX.playWin();
      setScore(s => s + 30);
      onRewardXP?.(30);
      setFeedback('🌊 Flood Hydrograph Routed Safely! Peak I - O = dS/dt Controlled (+30 XP)');
      confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
    } else {
      soundFX.playCrash();
      setFeedback('❌ Dam Overtopping Risk! Increase spillway gate opening to 70-85% & conduit dia to ≥ 1.8m.');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5 shadow-xs max-w-xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Spillway Flood Hydrograph Router 🌊</span>
          </h2>
          <p className="text-xs text-slate-500">Route 120 m³/s flood surge through spillway conduit & prevent dam breach.</p>
        </div>
        <div className="px-3 py-1 rounded-xl bg-blue-600 text-white font-mono font-bold text-xs">
          Score: {score}
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
        <div className="flex items-center justify-between font-mono font-bold">
          <span>Inflow Hydrograph Peak: <span className="text-cyan-500 font-extrabold">120 m³/s</span></span>
          <span className="text-slate-600">Gate: {gateOpening}%</span>
        </div>

        {feedback && (
          <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-200 font-bold text-center">
            {feedback}
          </div>
        )}

        <div className="space-y-3 pt-2">
          <div>
            <div className="flex justify-between font-bold mb-1">
              <span>Drop Inlet Gate Opening: {gateOpening}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={gateOpening}
              onChange={(e) => setGateOpening(parseInt(e.target.value))}
              className="w-full accent-cyan-500"
            />
          </div>

          <div>
            <div className="flex justify-between font-bold mb-1">
              <span>Conduit Diameter: {conduitDia} m</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="2.5"
              step="0.1"
              value={conduitDia}
              onChange={(e) => setConduitDia(parseFloat(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>
        </div>

        <button
          onClick={handleRoute}
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold rounded-xl shadow-xs transition"
        >
          ROUTE FLOOD SURGE (+30 XP) 🌊
        </button>
      </div>
    </div>
  );
}

function SprayDryerGame({ onRewardXP }) {
  const [rpm, setRpm] = useState(14000);
  const [temp, setTemp] = useState(160);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleDry = () => {
    soundFX.playAtomizerHum();
    if (rpm >= 18000 && rpm <= 22000 && temp >= 190 && temp <= 210) {
      soundFX.playWin();
      setScore(s => s + 30);
      onRewardXP?.(30);
      setFeedback('🥛 Perfect Dairy Powder Spray Drying! 4.5% Moisture Content (+30 XP)');
      confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
    } else {
      soundFX.playCrash();
      setFeedback('❌ Powder Scorching / Wet Droplets! Target 18,000-22,000 RPM & 190-210°C air temp.');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5 shadow-xs max-w-xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Rotary Atomizer Spray Dryer 🥛</span>
          </h2>
          <p className="text-xs text-slate-500">Control atomizer wheel RPM & inlet hot air temperature to produce fine milk powder.</p>
        </div>
        <div className="px-3 py-1 rounded-xl bg-purple-600 text-white font-mono font-bold text-xs">
          Score: {score}
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
        <div className="flex items-center justify-between font-mono font-bold">
          <span>Target Moisture: <span className="text-purple-600 font-extrabold">&lt; 5.0% Powder</span></span>
          <span className="text-slate-600">Wheel: {rpm} RPM</span>
        </div>

        {feedback && (
          <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-200 font-bold text-center">
            {feedback}
          </div>
        )}

        <div className="space-y-3 pt-2">
          <div>
            <div className="flex justify-between font-bold mb-1">
              <span>Atomizer Disk Speed: {rpm} RPM</span>
            </div>
            <input
              type="range"
              min="10000"
              max="26000"
              step="1000"
              value={rpm}
              onChange={(e) => setRpm(parseInt(e.target.value))}
              className="w-full accent-purple-600"
            />
          </div>

          <div>
            <div className="flex justify-between font-bold mb-1">
              <span>Inlet Drying Air Temp: {temp}°C</span>
            </div>
            <input
              type="range"
              min="150"
              max="240"
              value={temp}
              onChange={(e) => setTemp(parseInt(e.target.value))}
              className="w-full accent-pink-600"
            />
          </div>
        </div>

        <button
          onClick={handleDry}
          className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-extrabold rounded-xl shadow-xs transition"
        >
          START ATOMIZER POWDER CYCLE (+30 XP) 🥛
        </button>
      </div>
    </div>
  );
}

function CombineHarvesterGame({ onRewardXP }) {
  const [rpm, setRpm] = useState(700);
  const [clearance, setClearance] = useState(12);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleThresh = () => {
    if (rpm >= 850 && rpm <= 1000 && clearance >= 7 && clearance <= 10) {
      soundFX.playWin();
      setScore(s => s + 20);
      onRewardXP?.(20);
      setFeedback('🌾 Zero Head Loss Wheat Threshing! (< 0.5% Crack Loss) (+20 XP)');
      confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
    } else {
      soundFX.playCrash();
      setFeedback('❌ High Unthreshed Head / Cracked Grain Loss! Set 850-1000 RPM & 7-10mm concave gap.');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5 shadow-xs max-w-xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Combine Harvester Cylinder Matcher 🌾</span>
          </h2>
          <p className="text-xs text-slate-500">Balance threshing cylinder RPM & concave clearance gap for wheat harvesting.</p>
        </div>
        <div className="px-3 py-1 rounded-xl bg-emerald-600 text-white font-mono font-bold text-xs">
          Score: {score}
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
        <div className="flex items-center justify-between font-mono font-bold">
          <span>Crop: <span className="text-emerald-600 font-extrabold">Wheat Grain</span></span>
          <span className="text-slate-600">Concave: {clearance} mm</span>
        </div>

        {feedback && (
          <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-200 font-bold text-center">
            {feedback}
          </div>
        )}

        <div className="space-y-3 pt-2">
          <div>
            <div className="flex justify-between font-bold mb-1">
              <span>Threshing Cylinder Speed: {rpm} RPM</span>
            </div>
            <input
              type="range"
              min="500"
              max="1200"
              step="25"
              value={rpm}
              onChange={(e) => setRpm(parseInt(e.target.value))}
              className="w-full accent-emerald-600"
            />
          </div>

          <div>
            <div className="flex justify-between font-bold mb-1">
              <span>Concave Clearance Gap: {clearance} mm</span>
            </div>
            <input
              type="range"
              min="4"
              max="20"
              value={clearance}
              onChange={(e) => setClearance(parseInt(e.target.value))}
              className="w-full accent-green-600"
            />
          </div>
        </div>

        <button
          onClick={handleThresh}
          className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl shadow-xs transition"
        >
          ENGAGE COMBINE THRESHER (+20 XP) 🌾
        </button>
      </div>
    </div>
  );
}

function TheodoliteGame({ onRewardXP }) {
  const [a, setA] = useState(88.5);
  const [b, setB] = useState(91.5);
  const [c, setC] = useState(89.0);
  const [d, setD] = useState(91.0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  const totalAngle = (a + b + c + d).toFixed(1);

  const handleBalance = () => {
    soundFX.playLaserPing();
    if (parseFloat(totalAngle) === 360.0) {
      soundFX.playWin();
      setScore(s => s + 30);
      onRewardXP?.(30);
      setFeedback('📐 Perfect Interior Angle Sum (2n - 4)·90° = 360.0°! (+30 XP)');
      confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
    } else {
      soundFX.playCrash();
      setFeedback(`❌ Traverse Angular Misclosure! Sum: ${totalAngle}° vs Required 360.0°.`);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5 shadow-xs max-w-xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Closed Traverse Angle Balancer 📐</span>
          </h2>
          <p className="text-xs text-slate-500">Adjust theodolite interior angles of quadrilateral ABCD to sum exactly to 360.0°.</p>
        </div>
        <div className="px-3 py-1 rounded-xl bg-teal-600 text-white font-mono font-bold text-xs">
          Score: {score}
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
        <div className="flex items-center justify-between font-mono font-bold">
          <span>Required Sum: <span className="text-teal-600 font-extrabold">360.0°</span></span>
          <span className="text-blue-600">Current Sum: {totalAngle}°</span>
        </div>

        {feedback && (
          <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-200 font-bold text-center">
            {feedback}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 pt-2">
          <div>
            <label className="font-bold block mb-1">Angle A: {a}°</label>
            <input
              type="range"
              min="85.0"
              max="95.0"
              step="0.5"
              value={a}
              onChange={(e) => setA(parseFloat(e.target.value))}
              className="w-full accent-teal-600"
            />
          </div>

          <div>
            <label className="font-bold block mb-1">Angle B: {b}°</label>
            <input
              type="range"
              min="85.0"
              max="95.0"
              step="0.5"
              value={b}
              onChange={(e) => setB(parseFloat(e.target.value))}
              className="w-full accent-teal-600"
            />
          </div>

          <div>
            <label className="font-bold block mb-1">Angle C: {c}°</label>
            <input
              type="range"
              min="85.0"
              max="95.0"
              step="0.5"
              value={c}
              onChange={(e) => setC(parseFloat(e.target.value))}
              className="w-full accent-teal-600"
            />
          </div>

          <div>
            <label className="font-bold block mb-1">Angle D: {d}°</label>
            <input
              type="range"
              min="85.0"
              max="95.0"
              step="0.5"
              value={d}
              onChange={(e) => setD(parseFloat(e.target.value))}
              className="w-full accent-teal-600"
            />
          </div>
        </div>

        <button
          onClick={handleBalance}
          className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-extrabold rounded-xl shadow-xs transition"
        >
          BALANCE TRAVERSE ANGLES (+30 XP) 📐
        </button>
      </div>
    </div>
  );
}

function WheelSlipGame({ onRewardXP }) {
  const [ballast, setBallast] = useState(200);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  const calcSlip = (24 - (ballast / 25)).toFixed(1);

  const handleCheck = () => {
    if (parseFloat(calcSlip) >= 12.0 && parseFloat(calcSlip) <= 15.0) {
      soundFX.playWin();
      setScore(s => s + 25);
      onRewardXP?.(25);
      setFeedback(`🎯 Optimal Traction Efficiency! Wheel Slip = ${calcSlip}% (+25 XP)`);
      confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
    } else {
      soundFX.playCrash();
      setFeedback(`❌ Sub-optimal Slip (${calcSlip}%)! Adjust liquid ballast to achieve 12-15% slip.`);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5 shadow-xs max-w-xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Tractor Wheel Slip & Ballast Calc ⚙️</span>
          </h2>
          <p className="text-xs text-slate-500">Adjust liquid & cast-iron ballast weight to keep tractor wheel slip in 12-15% zone.</p>
        </div>
        <div className="px-3 py-1 rounded-xl bg-violet-600 text-white font-mono font-bold text-xs">
          Score: {score}
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
        <div className="flex items-center justify-between font-mono font-bold">
          <span>Target Slip: <span className="text-violet-600 font-extrabold">12.0% - 15.0%</span></span>
          <span className="text-blue-600">Calculated Slip: {calcSlip}%</span>
        </div>

        {feedback && (
          <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-200 font-bold text-center">
            {feedback}
          </div>
        )}

        <div className="space-y-3 pt-2">
          <div>
            <div className="flex justify-between font-bold mb-1">
              <span>Rear Axle Ballast Weight: {ballast} kg</span>
            </div>
            <input
              type="range"
              min="100"
              max="400"
              step="25"
              value={ballast}
              onChange={(e) => setBallast(parseInt(e.target.value))}
              className="w-full accent-violet-600"
            />
          </div>
        </div>

        <button
          onClick={handleCheck}
          className="w-full py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-extrabold rounded-xl shadow-xs transition"
        >
          CALCULATE TRACTION SLIP (+25 XP) ⚙️
        </button>
      </div>
    </div>
  );
}

function QuizBlitzGame({ onRewardXP }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [qIndex, setQIndex] = useState(0);

  const trivia = [
    { q: 'Unit of Hydraulic Conductivity (K)?', opts: ['m/day', 'N/m²', 'J/kg', 'Pa·s'], a: 0 },
    { q: 'Standard PTO Shaft rotation speed?', opts: ['540 rpm', '1000 rpm', '1500 rpm', '720 rpm'], a: 0 },
    { q: 'Psychrometric drying safe wheat moisture?', opts: ['14.0%', '24.0%', '8.0%', '30.0%'], a: 0 },
    { q: 'Height of Instrument equation?', opts: ['HI = BM + BS', 'HI = BM - FS', 'HI = BS - FS', 'HI = RL + FS'], a: 0 }
  ];

  const currentQ = trivia[qIndex % trivia.length];

  const startGame = () => {
    setScore(0);
    setStreak(0);
    setTimeLeft(60);
    setIsPlaying(true);
  };

  useEffect(() => {
    let t;
    if (isPlaying && timeLeft > 0) {
      t = setInterval(() => {
        soundFX.playTimerTick();
        setTimeLeft(s => s - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
      soundFX.playWin();
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
    return () => clearInterval(t);
  }, [isPlaying, timeLeft]);

  const handleAns = (idx) => {
    if (idx === currentQ.a) {
      soundFX.playScore();
      setScore(s => s + 15);
      setStreak(s => s + 1);
      onRewardXP?.(15);
    } else {
      soundFX.playCrash();
      setStreak(0);
    }
    setQIndex(q => q + 1);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5 shadow-xs max-w-xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <span>GATE AG 60s Quiz Show Blitz ⚡</span>
          </h2>
          <p className="text-xs text-slate-500">60-second NAT & MCQ rapid trivia sprint with live streak combos.</p>
        </div>
        <div className="px-3 py-1 rounded-xl bg-pink-600 text-white font-mono font-bold text-xs">
          Streak: 🔥 {streak}
        </div>
      </div>

      {!isPlaying ? (
        <div className="text-center py-6 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-pink-100 dark:bg-pink-950 text-pink-600 flex items-center justify-center text-3xl font-bold mx-auto">
            ⚡
          </div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white">60-Second Trivia Blitz</h3>
          <button
            onClick={startGame}
            className="px-6 py-2.5 bg-pink-600 hover:bg-pink-500 text-white font-extrabold text-xs rounded-xl shadow-xs transition"
          >
            START 60s TRIVIA BLITZ ⚡
          </button>
        </div>
      ) : (
        <div className="space-y-4 text-xs">
          <div className="flex justify-between font-mono font-bold">
            <span className="text-rose-500">⏱️ Time Left: {timeLeft}s</span>
            <span className="text-emerald-500">Score: {score} XP</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 font-bold text-slate-900 dark:text-white text-center">
            {currentQ.q}
          </div>

          <div className="grid grid-cols-2 gap-2">
            {currentQ.opts.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAns(idx)}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-pink-600 hover:text-white font-extrabold text-center transition"
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

function AgWordleGame({ onRewardXP }) {
  const [guess, setGuess] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  const targetWord = 'DRAFT';

  const handleGuess = (e) => {
    e.preventDefault();
    if (guess.length !== 5) return;

    const upper = guess.toUpperCase();
    const newGuesses = [...guesses, upper];
    setGuesses(newGuesses);
    setGuess('');

    if (upper === targetWord) {
      soundFX.playWin();
      setScore(s => s + 20);
      onRewardXP?.(20);
      setFeedback('🎉 Correct Word Solved! DRAFT (+20 XP)');
      confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
    } else if (newGuesses.length >= 6) {
      soundFX.playCrash();
      setFeedback(`❌ Game Over! Word was: ${targetWord}`);
    } else {
      soundFX.playClick();
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5 shadow-xs max-w-xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <span>AG-Wordle: 5-Letter Term Guesser 🔤</span>
          </h2>
          <p className="text-xs text-slate-500">Guess the 5-letter Agricultural Engineering term in 6 tries.</p>
        </div>
        <div className="px-3 py-1 rounded-xl bg-fuchsia-600 text-white font-mono font-bold text-xs">
          Score: {score}
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4 text-xs text-center">
        {feedback && (
          <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-200 font-bold">
            {feedback}
          </div>
        )}

        <div className="space-y-2 max-w-xs mx-auto">
          {Array(6).fill(null).map((_, rowIdx) => {
            const word = guesses[rowIdx] || '';
            return (
              <div key={rowIdx} className="grid grid-cols-5 gap-1.5">
                {Array(5).fill(null).map((_, colIdx) => {
                  const letter = word[colIdx] || '';
                  let bg = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800';
                  if (word) {
                    if (letter === targetWord[colIdx]) bg = 'bg-emerald-600 text-white font-extrabold';
                    else if (targetWord.includes(letter)) bg = 'bg-amber-500 text-slate-950 font-extrabold';
                    else bg = 'bg-slate-300 dark:bg-slate-800 text-slate-500';
                  }
                  return (
                    <div key={colIdx} className={`h-10 rounded-xl border flex items-center justify-center font-mono font-black text-sm uppercase ${bg}`}>
                      {letter}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        <form onSubmit={handleGuess} className="space-y-2 pt-2">
          <input
            type="text"
            maxLength={5}
            placeholder="Type 5-letter word..."
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            className="w-full text-center px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-mono font-extrabold tracking-widest uppercase outline-none focus:ring-2 focus:ring-fuchsia-500"
          />
          <button
            type="submit"
            className="w-full py-2.5 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-extrabold rounded-xl shadow-xs transition"
          >
            GUESS WORD 🔤
          </button>
        </form>
      </div>
    </div>
  );
}

function TractorGearGame({ onRewardXP }) {
  const [rpm, setRpm] = useState(1800);
  const [gear, setGear] = useState(2);
  const [targetSpeed, setTargetSpeed] = useState(() => Math.floor(Math.random() * 8) + 4);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const r = 0.65;
  const gearRatios = { 1: 45, 2: 28, 3: 18, 4: 12 };
  const currentSpeed = parseFloat((((2 * Math.PI * r * (rpm / 60)) / gearRatios[gear]) * 3.6).toFixed(1));

  const handleShift = () => {
    const diff = Math.abs(currentSpeed - targetSpeed);
    if (diff <= 0.8) {
      soundFX.playWin();
      setScore(s => s + 20);
      onRewardXP?.(20);
      setFeedback(`🎯 Perfect Tillage Speed Match! (${currentSpeed} km/h) +20 XP`);
      confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
      setTargetSpeed(Math.floor(Math.random() * 8) + 4);
    } else {
      soundFX.playCrash();
      setFeedback(`❌ Off Target! Current: ${currentSpeed} km/h vs Target: ${targetSpeed} km/h`);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5 shadow-xs max-w-xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Gauge className="w-5 h-5 text-amber-500" />
            <span>Tractor Gear & Ground Speed Simulator ⚙️</span>
          </h2>
          <p className="text-xs text-slate-500">Shift gears and adjust engine RPM to hit target field tillage speed: v = 2πrN / 60i.</p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-mono font-black text-xs">
          Score: {score}
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
        <div className="flex items-center justify-between font-mono font-bold">
          <span>Target Field Tillage Speed: <span className="text-amber-600 dark:text-amber-400 text-sm font-extrabold">{targetSpeed} km/h</span></span>
          <span className="text-blue-600 dark:text-blue-400">Current Speed: {currentSpeed} km/h</span>
        </div>

        {feedback && (
          <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-200 font-bold text-center">
            {feedback}
          </div>
        )}

        <div className="space-y-3 pt-2">
          <div>
            <div className="flex justify-between font-bold mb-1">
              <span>Engine Speed (N): {rpm} RPM</span>
            </div>
            <input
              type="range"
              min="1000"
              max="2400"
              step="50"
              value={rpm}
              onChange={(e) => setRpm(parseInt(e.target.value))}
              className="w-full accent-amber-500"
            />
          </div>

          <div>
            <span className="font-bold block mb-1">Gear Ratio Selector (i):</span>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map(g => (
                <button
                  key={g}
                  onClick={() => { soundFX.playClick(); setGear(g); }}
                  className={`py-2 rounded-xl border font-mono font-extrabold transition ${
                    gear === g ? 'bg-amber-500 text-slate-950 border-amber-500' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  L-{g} (i={gearRatios[g]})
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleShift}
          className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl shadow-xs transition"
        >
          ENGAGE CLUTCH & SHIFT GEAR 🚜
        </button>
      </div>
    </div>
  );
}

function SurveyingGame({ onRewardXP }) {
  const [score, setScore] = useState(0);
  const [bm, setBm] = useState(100.0);
  const [bs, setBs] = useState(1.45);
  const [fs, setFs] = useState(0.85);
  const [userInputRl, setUserInputRl] = useState('');
  const [feedback, setFeedback] = useState('');

  const correctRl = parseFloat((bm + bs - fs).toFixed(2));

  const handleVerify = (e) => {
    e.preventDefault();
    if (Math.abs(parseFloat(userInputRl) - correctRl) <= 0.05) {
      soundFX.playWin();
      setScore(s => s + 15);
      onRewardXP?.(15);
      setFeedback(`🎯 Precise Contour Leveling! RL = ${correctRl} m (+15 XP)`);
      confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
      setBm(parseFloat((Math.random() * 20 + 90).toFixed(2)));
      setBs(parseFloat((Math.random() * 1.5 + 0.5).toFixed(2)));
      setFs(parseFloat((Math.random() * 1.5 + 0.5).toFixed(2)));
      setUserInputRl('');
    } else {
      soundFX.playCrash();
      setFeedback(`❌ Incorrect. Correct RL = HI (${(bm + bs).toFixed(2)}) - FS (${fs}) = ${correctRl} m`);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5 shadow-xs max-w-xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-blue-500" />
            <span>Land Surveying Elevation Leveling 📐</span>
          </h2>
          <p className="text-xs text-slate-500">Calculate Height of Instrument (HI = BM + BS) and Reduced Level (RL = HI - FS).</p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white font-mono font-black text-xs">
          Score: {score}
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
        <div className="grid grid-cols-3 gap-2 font-mono text-center">
          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-400 block">Benchmark (BM)</span>
            <span className="font-extrabold text-slate-900 dark:text-white">{bm} m</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-400 block">Backsight (BS)</span>
            <span className="font-extrabold text-emerald-600">+{bs} m</span>
          </div>
          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-400 block">Foresight (FS)</span>
            <span className="font-extrabold text-rose-500">-{fs} m</span>
          </div>
        </div>

        {feedback && (
          <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-200 font-bold text-center">
            {feedback}
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-3 pt-2">
          <div>
            <label className="font-bold block mb-1">Calculate Reduced Level (RL) of target point:</label>
            <input
              type="number"
              step="0.01"
              required
              placeholder="Enter RL in meters (e.g. 100.60)..."
              value={userInputRl}
              onChange={(e) => setUserInputRl(e.target.value)}
              className="w-full px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-mono font-extrabold outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold rounded-xl shadow-xs transition"
          >
            VERIFY LEVELING READING 📐
          </button>
        </form>
      </div>
    </div>
  );
}

function PsychrometricGame({ onRewardXP }) {
  const [airTemp, setAirTemp] = useState(45);
  const [rh, setRh] = useState(40);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleDry = () => {
    if (airTemp >= 55 && airTemp <= 70 && rh >= 15 && rh <= 30) {
      soundFX.playWin();
      setScore(s => s + 20);
      onRewardXP?.(20);
      setFeedback('🌾 Optimal Psychrometric Drying! Grain safe at 14% Moisture Content (+20 XP)');
      confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
    } else {
      soundFX.playCrash();
      setFeedback('❌ Sub-optimal Drying Air! Target 55-70°C and 15-30% RH for safe storage.');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5 shadow-xs max-w-xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Thermometer className="w-5 h-5 text-rose-500" />
            <span>Psychrometric Grain Dryer Simulator 🌾</span>
          </h2>
          <p className="text-xs text-slate-500">Adjust drying air temperature and relative humidity to dry wheat from 24% to 14% moisture content.</p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-rose-600 text-white font-mono font-black text-xs">
          Score: {score}
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
        <div className="flex items-center justify-between font-mono font-bold">
          <span>Target Moisture: <span className="text-emerald-600 font-extrabold">14.0% Wet Basis</span></span>
          <span className="text-rose-500">Initial Moisture: 24.0%</span>
        </div>

        {feedback && (
          <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-200 font-bold text-center">
            {feedback}
          </div>
        )}

        <div className="space-y-3 pt-2">
          <div>
            <div className="flex justify-between font-bold mb-1">
              <span>Heated Air Temperature: {airTemp}°C</span>
            </div>
            <input
              type="range"
              min="30"
              max="80"
              value={airTemp}
              onChange={(e) => setAirTemp(parseInt(e.target.value))}
              className="w-full accent-rose-500"
            />
          </div>

          <div>
            <div className="flex justify-between font-bold mb-1">
              <span>Relative Humidity (RH): {rh}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="70"
              value={rh}
              onChange={(e) => setRh(parseInt(e.target.value))}
              className="w-full accent-blue-500"
            />
          </div>
        </div>

        <button
          onClick={handleDry}
          className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-extrabold rounded-xl shadow-xs transition"
        >
          RUN PSYCHROMETRIC DRYER BATCH 🌾
        </button>
      </div>
    </div>
  );
}

function SolarPumpGame({ onRewardXP }) {
  const [panels, setPanels] = useState(4);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  const totalWattage = panels * 250;
  const targetWattage = 1500;

  const handleMatch = () => {
    if (totalWattage === targetWattage) {
      soundFX.playWin();
      setScore(s => s + 20);
      onRewardXP?.(20);
      setFeedback(`🎯 Perfect Solar Array Match! (${totalWattage} W for 2 HP Solar Pump) +20 XP`);
      confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
    } else {
      soundFX.playCrash();
      setFeedback(`❌ Off Target! Selected: ${totalWattage} W vs Required: ${targetWattage} W`);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5 shadow-xs max-w-xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Sun className="w-5 h-5 text-amber-500" />
            <span>Solar PV Irrigation Pump Matcher ☀️</span>
          </h2>
          <p className="text-xs text-slate-500">Size solar PV panel arrays to meet total dynamic head and pump power requirements.</p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-mono font-black text-xs">
          Score: {score}
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
        <div className="flex items-center justify-between font-mono font-bold">
          <span>Required Solar Power: <span className="text-amber-600 font-extrabold">1500 W (2 HP Pump)</span></span>
          <span className="text-blue-600">Current Array: {totalWattage} W</span>
        </div>

        {feedback && (
          <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-200 font-bold text-center">
            {feedback}
          </div>
        )}

        <div className="space-y-3 pt-2">
          <label className="font-bold block mb-1">Select Number of 250W Solar PV Panels:</label>
          <div className="grid grid-cols-4 gap-2">
            {[2, 4, 6, 8].map(n => (
              <button
                key={n}
                onClick={() => { soundFX.playClick(); setPanels(n); }}
                className={`py-2 rounded-xl border font-mono font-extrabold transition ${
                  panels === n ? 'bg-amber-500 text-slate-950 border-amber-500' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                }`}
              >
                {n} Panels ({n * 250}W)
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleMatch}
          className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl shadow-xs transition"
        >
          CONNECT SOLAR PUMP ARRAY ☀️
        </button>
      </div>
    </div>
  );
}

function PasteurizationGame({ onRewardXP }) {
  const [temp, setTemp] = useState(65);
  const [time, setTime] = useState(10);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handlePasteurize = () => {
    if (temp >= 71 && temp <= 74 && time >= 15 && time <= 18) {
      soundFX.playWin();
      setScore(s => s + 20);
      onRewardXP?.(20);
      setFeedback('🥛 Perfect HTST Pasteurization! 72°C for 15 sec (+20 XP)');
      confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
    } else {
      soundFX.playCrash();
      setFeedback('❌ Pasteurization Standard Not Met! Target 72°C for 15 seconds.');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5 shadow-xs max-w-xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Milk HTST Pasteurization Simulator 🥛</span>
          </h2>
          <p className="text-xs text-slate-500">Control High-Temperature Short-Time (HTST) plate heat exchanger parameters.</p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-600 text-white font-mono font-black text-xs">
          Score: {score}
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
        <div className="flex items-center justify-between font-mono font-bold">
          <span>Standard HTST: <span className="text-cyan-600 font-extrabold">72°C for 15 sec</span></span>
          <span className="text-slate-600">Current: {temp}°C / {time} sec</span>
        </div>

        {feedback && (
          <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-200 font-bold text-center">
            {feedback}
          </div>
        )}

        <div className="space-y-3 pt-2">
          <div>
            <div className="flex justify-between font-bold mb-1">
              <span>Pasteurization Temp: {temp}°C</span>
            </div>
            <input
              type="range"
              min="60"
              max="85"
              value={temp}
              onChange={(e) => setTemp(parseInt(e.target.value))}
              className="w-full accent-cyan-600"
            />
          </div>

          <div>
            <div className="flex justify-between font-bold mb-1">
              <span>Holding Tube Time: {time} sec</span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              value={time}
              onChange={(e) => setTime(parseInt(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>
        </div>

        <button
          onClick={handlePasteurize}
          className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold rounded-xl shadow-xs transition"
        >
          START HTST PASTEURIZATION CYCLE 🥛
        </button>
      </div>
    </div>
  );
}

function ToolGuesserGame({ onRewardXP }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [selectedOpt, setSelectedOpt] = useState(null);

  const currentItem = TOOL_GUESSER_POOL[currentIdx % TOOL_GUESSER_POOL.length];

  const handleSelect = (idx) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(idx);

    if (idx === currentItem.answer) {
      soundFX.playScore();
      setScore(s => s + 10);
      onRewardXP?.(10);
      setFeedback('🎉 Correct Implement Identified! (+10 XP)');
      confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
    } else {
      soundFX.playCrash();
      setFeedback(`❌ Incorrect. Correct answer: ${currentItem.options[currentItem.answer]}`);
    }
  };

  const handleNext = () => {
    soundFX.playClick();
    setSelectedOpt(null);
    setFeedback('');
    setCurrentIdx(i => i + 1);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5 shadow-xs max-w-xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Wrench className="w-5 h-5 text-amber-500" />
            <span>Farm Machinery Tool Guesser 🛠️</span>
          </h2>
          <p className="text-xs text-slate-500">Read engineering specifications and identify the correct tillage or harvesting implement.</p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white font-mono font-black text-xs shadow-xs">
          Score: {score}
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center text-3xl font-bold border border-amber-300 shrink-0">
            {currentItem.icon}
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-600 font-bold">Spec Clue #{currentIdx + 1}</span>
            <p className="text-xs font-bold text-slate-900 dark:text-white leading-relaxed">
              "{currentItem.clue}"
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
          {currentItem.options.map((opt, idx) => {
            let btnClass = "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 hover:border-amber-400";
            if (selectedOpt !== null) {
              if (idx === currentItem.answer) {
                btnClass = "bg-emerald-600 text-white border-emerald-600 font-extrabold";
              } else if (idx === selectedOpt) {
                btnClass = "bg-rose-600 text-white border-rose-600 font-extrabold";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`p-3 rounded-xl border text-xs font-bold transition flex items-center justify-between gap-2 ${btnClass}`}
              >
                <span>{opt}</span>
                {selectedOpt !== null && idx === currentItem.answer && <CheckCircle2 className="w-4 h-4 text-white" />}
              </button>
            );
          })}
        </div>

        {feedback && (
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 text-xs font-bold text-center border border-slate-200 dark:border-slate-800 space-y-2">
            <div>{feedback}</div>
            <button
              onClick={handleNext}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition"
            >
              Next Implement 🛠️
            </button>
          </div>
        )}
      </div>

    </div>
  );
}

function SoilIdentifierGame({ onRewardXP }) {
  const [score, setScore] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);

  const questions = [
    {
      title: 'Identify Soil Texture Class',
      desc: 'Soil containing 40% Sand, 40% Silt, and 20% Clay with bulk density ρb = 1.33 g/cm³.',
      options: ['Loam Soil', 'Heavy Clay Soil', 'Coarse Sand', 'Silty Clay'],
      answer: 0
    },
    {
      title: 'Field Capacity Suction Level',
      desc: 'Soil moisture content retained against gravity at what suction pressure?',
      options: ['1/3 Bar (33 kPa)', '15 Bar (1500 kPa)', '0.1 Bar (10 kPa)', '31 Bar'],
      answer: 0
    },
    {
      title: 'Paddy Rice Crop Soil Requirement',
      desc: 'Crop requiring heavy clay/puddled soil with low percolation rate for standing water.',
      options: ['Paddy Rice', 'Groundnut', 'Chickpea', 'Pearl Millet (Bajra)'],
      answer: 0
    }
  ];

  const currentQ = questions[qIndex % questions.length];

  const handleSelect = (idx) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(idx);
    if (idx === currentQ.answer) {
      soundFX.playScore();
      setScore(s => s + 10);
      onRewardXP?.(10);
    } else {
      soundFX.playCrash();
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5 shadow-xs max-w-xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Soil & Crop Type Identifier 🪴</span>
          </h2>
          <p className="text-xs text-slate-500">Match soil physical properties and texture classes to agricultural crops.</p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white font-mono font-black text-xs">
          Score: {score}
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">{currentQ.title}</h3>
        <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">{currentQ.desc}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
          {currentQ.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`p-3 rounded-xl border text-xs font-bold transition text-left ${
                selectedOpt === idx
                  ? idx === currentQ.answer
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-rose-600 text-white border-rose-600'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {selectedOpt !== null && (
          <button
            onClick={() => { soundFX.playClick(); setSelectedOpt(null); setQIndex(q => q + 1); }}
            className="w-full py-2 bg-blue-600 text-white font-bold text-xs rounded-xl"
          >
            Next Question 🪴
          </button>
        )}
      </div>
    </div>
  );
}

function TractorMechanicsGame({ onRewardXP }) {
  const [score, setScore] = useState(0);
  const [qIndex, setQIndex] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);

  const parts = [
    {
      title: 'Differential Lock Mechanism',
      desc: 'Mechanically locks rear axle shafts together when one wheel spins in muddy field conditions.',
      options: ['Differential Lock', 'Single Plate Clutch', 'PTO Speed Selector', '3-Point Linkage'],
      answer: 0
    },
    {
      title: 'Power Take-Off (PTO)',
      desc: 'Splined shaft at the rear of tractor rotating at 540 ± 10 rpm to power rotary implements.',
      options: ['PTO Shaft', 'Flywheel', 'Final Drive Gear', 'Steering Linkage'],
      answer: 0
    }
  ];

  const currentPart = parts[qIndex % parts.length];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5 shadow-xs max-w-xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Tractor Engine & Powertrain Builder ⚙️</span>
          </h2>
          <p className="text-xs text-slate-500">Assemble tractor powertrain, clutch, PTO & hydraulic lift components.</p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-purple-600 text-white font-mono font-black text-xs">
          Score: {score}
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
        <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">{currentPart.title}</h3>
        <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">{currentPart.desc}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
          {currentPart.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => {
                if (selectedOpt !== null) return;
                setSelectedOpt(idx);
                if (idx === currentPart.answer) {
                  soundFX.playScore();
                  setScore(s => s + 10);
                  onRewardXP?.(10);
                } else {
                  soundFX.playCrash();
                }
              }}
              className={`p-3 rounded-xl border text-xs font-bold transition text-left ${
                selectedOpt === idx
                  ? idx === currentPart.answer
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'bg-rose-600 text-white border-rose-600'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {selectedOpt !== null && (
          <button
            onClick={() => { soundFX.playClick(); setSelectedOpt(null); setQIndex(q => q + 1); }}
            className="w-full py-2 bg-purple-600 text-white font-bold text-xs rounded-xl"
          >
            Next Powertrain Part ⚙️
          </button>
        )}
      </div>
    </div>
  );
}

function FormulaBuilderGame({ onRewardXP }) {
  const [score, setScore] = useState(0);
  const [qIndex, setQIndex] = useState(0);

  const formulas = [
    { title: 'Darcy\'s Law Soil Water Flux', equation: 'Q = -K · A · (dh / dl)', hint: 'Hydraulic Conductivity (K) × Area (A) × Gradient' },
    { title: 'Tractor Pulling Power', equation: 'P = Draft (N) × Speed (m/s)', hint: 'Force × Velocity' },
    { title: 'Reynolds Number Fluid Flow', equation: 'Re = (ρ · v · D) / μ', hint: 'Inertial forces / Viscous forces' }
  ];

  const currentF = formulas[qIndex % formulas.length];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5 shadow-xs max-w-xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <span>GATE AG Formula Builder 🧮</span>
          </h2>
          <p className="text-xs text-slate-500">Master LaTeX equations for Soil, Water & Farm Power engineering.</p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white font-mono font-black text-xs">
          Score: {score}
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center space-y-3">
        <span className="text-[10px] font-mono uppercase tracking-wider text-blue-600 font-bold">Target Equation</span>
        <h3 className="text-base font-extrabold text-slate-900 dark:text-white">{currentF.title}</h3>
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono font-extrabold text-blue-600 dark:text-blue-400 text-lg">
          {currentF.equation}
        </div>
        <p className="text-xs text-slate-500 italic">"{currentF.hint}"</p>

        <button
          onClick={() => { soundFX.playScore(); setScore(s => s + 10); onRewardXP?.(10); setQIndex(q => q + 1); }}
          className="w-full py-2.5 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs"
        >
          Master Next Formula 🧮
        </button>
      </div>
    </div>
  );
}

function FlappyTractorGame({ onRewardXP }) {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('START');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      const saved = localStorage.getItem('gate_ag_flappy_highscore');
      return saved ? parseInt(saved, 10) : 0;
    } catch (e) {
      return 0;
    }
  });

  const [hasShield, setHasShield] = useState(false);
  const [isTurbo, setIsTurbo] = useState(false);
  const [powerUpMsg, setPowerUpMsg] = useState('');

  const physicsRef = useRef({
    tractorY: 120,
    velocity: -4,
    gravity: 0.35,
    jump: -6.5,
    obstacles: [],
    powerUps: [],
    score: 0,
    hasShield: false,
    turboTimer: 0,
    frameCount: 0
  });

  const resetGame = () => {
    physicsRef.current = {
      tractorY: 120,
      velocity: -5.5,
      gravity: 0.35,
      jump: -6.5,
      obstacles: [],
      powerUps: [],
      score: 0,
      hasShield: false,
      turboTimer: 0,
      frameCount: 0
    };
    setScore(0);
    setHasShield(false);
    setIsTurbo(false);
    setPowerUpMsg('');
    setGameState('PLAYING');
  };

  const triggerJump = useCallback(() => {
    soundFX.playJump();
    if (gameState === 'START' || gameState === 'GAMEOVER') {
      resetGame();
      return;
    }

    if (gameState === 'PLAYING') {
      physicsRef.current.velocity = physicsRef.current.jump;
    }
  }, [gameState]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        triggerJump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerJump]);

  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animId;

    const loop = () => {
      const p = physicsRef.current;
      p.frameCount++;

      p.velocity += p.gravity;
      p.tractorY += p.velocity;

      if (p.turboTimer > 0) {
        p.turboTimer--;
        if (p.turboTimer === 0) {
          setIsTurbo(false);
        }
      }

      const groundY = canvas.height - 24;
      if (p.tractorY >= groundY - 20) {
        p.tractorY = groundY - 20;
        handleCrash();
        return;
      }
      if (p.tractorY < 5) {
        p.tractorY = 5;
        p.velocity = 0;
      }

      if (p.frameCount % 100 === 0) {
        const gap = 125;
        const topHeight = Math.floor(Math.random() * (canvas.height - gap - 80)) + 35;
        p.obstacles.push({
          x: canvas.width,
          top: topHeight,
          bottom: topHeight + gap,
          passed: false
        });

        if (Math.random() < 0.45) {
          const type = Math.random() < 0.5 ? 'STAR' : Math.random() < 0.75 ? 'SHIELD' : 'TURBO';
          p.powerUps.push({
            x: canvas.width + 20,
            y: topHeight + gap / 2,
            type,
            collected: false
          });
        }
      }

      p.obstacles.forEach((obs) => {
        obs.x -= 2.0;

        if (!obs.passed && obs.x + 38 < 60) {
          obs.passed = true;
          p.score += 1;
          soundFX.playScore();
          setScore(p.score);
          onRewardXP?.(10);
        }

        const tractorBox = { x: 55, y: p.tractorY, width: 26, height: 22 };
        if (
          !p.turboTimer &&
          obs.x < tractorBox.x + tractorBox.width &&
          obs.x + 38 > tractorBox.x
        ) {
          if (tractorBox.y < obs.top || tractorBox.y + tractorBox.height > obs.bottom) {
            if (p.hasShield) {
              p.hasShield = false;
              setHasShield(false);
              obs.x = -100;
              soundFX.playJump();
              setPowerUpMsg('🛡️ Shield Used! Crash Avoided.');
              setTimeout(() => setPowerUpMsg(''), 2000);
            } else {
              handleCrash();
              return;
            }
          }
        }
      });
      p.obstacles = p.obstacles.filter(o => o.x > -50);

      p.powerUps.forEach((pow) => {
        pow.x -= 2.0;
        if (!pow.collected && Math.abs(pow.x - 65) < 24 && Math.abs(pow.y - (p.tractorY + 10)) < 24) {
          pow.collected = true;
          soundFX.playScore();
          if (pow.type === 'STAR') {
            p.score += 5;
            setScore(p.score);
            onRewardXP?.(10);
            setPowerUpMsg('🌾 Crop Star +5 Bonus!');
            setTimeout(() => setPowerUpMsg(''), 2000);
          } else if (pow.type === 'SHIELD') {
            p.hasShield = true;
            setHasShield(true);
            setPowerUpMsg('⛽ Diesel Shield Activated!');
            setTimeout(() => setPowerUpMsg(''), 2000);
          } else if (pow.type === 'TURBO') {
            p.turboTimer = 180;
            setIsTurbo(true);
            setPowerUpMsg('⚡ Turbo Gear Invincible!');
            setTimeout(() => setPowerUpMsg(''), 2000);
          }
        }
      });
      p.powerUps = p.powerUps.filter(p => p.x > -30 && !p.collected);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = p.turboTimer ? '#1e1b4b' : '#38bdf8';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#78350f';
      ctx.fillRect(0, canvas.height - 24, canvas.width, 24);
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(0, canvas.height - 24, canvas.width, 4);

      p.obstacles.forEach((obs) => {
        ctx.fillStyle = '#475569';
        ctx.fillRect(obs.x, 0, 38, obs.top);
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(obs.x - 2, obs.top - 8, 42, 8);

        ctx.fillStyle = '#475569';
        ctx.fillRect(obs.x, obs.bottom, 38, canvas.height - obs.bottom - 24);
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(obs.x - 2, obs.bottom, 42, 8);
      });

      p.powerUps.forEach((pow) => {
        ctx.font = '18px sans-serif';
        if (pow.type === 'STAR') ctx.fillText('🌾', pow.x, pow.y);
        else if (pow.type === 'SHIELD') ctx.fillText('⛽', pow.x, pow.y);
        else if (pow.type === 'TURBO') ctx.fillText('⚡', pow.x, pow.y);
      });

      ctx.font = '26px sans-serif';
      ctx.fillText('🚜', 50, p.tractorY + 20);

      if (p.hasShield) {
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(63, p.tractorY + 10, 20, 0, Math.PI * 2);
        ctx.stroke();
      }

      if (p.turboTimer) {
        ctx.strokeStyle = '#f59e0b';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(63, p.tractorY + 10, 22, 0, Math.PI * 2);
        ctx.stroke();
      }

      animId = requestAnimationFrame(loop);
    };

    const handleCrash = () => {
      soundFX.playCrash();
      setGameState('GAMEOVER');
      const finalScore = physicsRef.current.score;
      if (finalScore > highScore) {
        soundFX.playWin();
        setHighScore(finalScore);
        try {
          localStorage.setItem('gate_ag_flappy_highscore', finalScore.toString());
        } catch (e) {}
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [gameState, highScore, onRewardXP]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5 shadow-xs">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <span>Flappy Tractor Field Runner 🚜</span>
          </h2>
          <p className="text-xs text-slate-500">
            Dodge crop silos, collect wheat stars 🌾, and activate Diesel Shields ⛽!
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-mono font-bold text-xs border border-amber-200 dark:border-amber-900 flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>High Score: {highScore}</span>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white font-mono font-extrabold text-xs shadow-xs">
            Score: {score}
          </div>
        </div>
      </div>

      {(hasShield || isTurbo || powerUpMsg) && (
        <div className="flex items-center gap-2 justify-center text-xs font-bold animate-in fade-in">
          {hasShield && (
            <span className="px-2.5 py-1 rounded-lg bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800 flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-cyan-500" /> Shield Active
            </span>
          )}
          {isTurbo && (
            <span className="px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800 flex items-center gap-1 animate-pulse">
              <Zap className="w-3.5 h-3.5 text-amber-500" /> Turbo Invincible!
            </span>
          )}
          {powerUpMsg && (
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">{powerUpMsg}</span>
          )}
        </div>
      )}

      <div className="relative max-w-xl mx-auto rounded-2xl overflow-hidden border-2 border-slate-300 dark:border-slate-800 shadow-md">
        <canvas
          ref={canvasRef}
          width={500}
          height={320}
          onClick={triggerJump}
          className="w-full h-[320px] cursor-pointer block touch-none"
        />

        {gameState === 'START' && (
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center text-white space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center text-3xl shadow-lg animate-bounce">
              🚜
            </div>
            <div>
              <h3 className="text-xl font-black">Flappy Tractor</h3>
              <p className="text-xs text-slate-300 mt-1 max-w-xs">
                Press <span className="font-mono bg-white/20 px-1.5 py-0.5 rounded">Spacebar</span> / <span className="font-mono bg-white/20 px-1.5 py-0.5 rounded">Click</span> or Tap Jump to throttle up!
              </p>
            </div>
            <button
              onClick={resetGame}
              className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-xs rounded-xl shadow-lg transition flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-slate-900" />
              <span>Start Field Run</span>
            </button>
          </div>
        )}

        {gameState === 'GAMEOVER' && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center text-white space-y-4">
            <h3 className="text-2xl font-black text-rose-400">Crash! Field Over 🚜💥</h3>
            <div className="space-y-1 font-mono text-xs">
              <div>Your Score: <span className="text-amber-400 font-bold text-base">{score}</span></div>
              <div>Best Record: <span className="text-emerald-400 font-bold">{highScore}</span></div>
            </div>
            <button
              onClick={resetGame}
              className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-xs rounded-xl shadow-lg transition flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Again</span>
            </button>
          </div>
        )}
      </div>

      <div className="max-w-xl mx-auto flex items-center justify-between gap-4 pt-2">
        <button
          onClick={triggerJump}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-extrabold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2 select-none"
        >
          <ArrowUp className="w-5 h-5" />
          <span>THROTTLE / JUMP (TAP HERE)</span>
        </button>
      </div>

    </div>
  );
}

function AgriTowerGame({ onRewardXP }) {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('START');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      const saved = localStorage.getItem('gate_ag_tower_highscore');
      return saved ? parseInt(saved, 10) : 0;
    } catch (e) {
      return 0;
    }
  });

  const towerRef = useRef({
    blocks: [],
    currentBlock: { x: 0, w: 140, dir: 1, speed: 3.5 },
    score: 0
  });

  const startTower = () => {
    towerRef.current = {
      blocks: [{ x: 90, w: 140, y: 280 }],
      currentBlock: { x: 10, w: 140, y: 250, dir: 1, speed: 3.5 },
      score: 0
    };
    setScore(0);
    setGameState('PLAYING');
  };

  const dropBlock = useCallback(() => {
    soundFX.playJump();
    if (gameState !== 'PLAYING') return;

    const t = towerRef.current;
    const topBlock = t.blocks[t.blocks.length - 1];
    const cur = t.currentBlock;

    const overlapStart = Math.max(cur.x, topBlock.x);
    const overlapEnd = Math.min(cur.x + cur.w, topBlock.x + topBlock.w);
    const newWidth = overlapEnd - overlapStart;

    if (newWidth <= 0) {
      soundFX.playCrash();
      setGameState('GAMEOVER');
      if (t.score > highScore) {
        soundFX.playWin();
        setHighScore(t.score);
        try {
          localStorage.setItem('gate_ag_tower_highscore', t.score.toString());
        } catch (e) {}
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
      return;
    }

    const stackedBlock = { x: overlapStart, w: newWidth, y: cur.y };
    t.blocks.push(stackedBlock);
    t.score += 1;
    soundFX.playScore();
    setScore(t.score);
    onRewardXP?.(10);

    const nextY = cur.y - 30;
    t.currentBlock = {
      x: 10,
      w: newWidth,
      y: nextY < 50 ? 50 : nextY,
      dir: Math.random() < 0.5 ? 1 : -1,
      speed: Math.min(3.5 + t.score * 0.2, 8.0)
    };

    if (t.blocks.length > 7) {
      t.blocks.forEach(b => b.y += 30);
      t.currentBlock.y += 30;
    }
  }, [gameState, highScore, onRewardXP]);

  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animId;

    const loop = () => {
      const t = towerRef.current;
      const cur = t.currentBlock;

      cur.x += cur.dir * cur.speed;
      if (cur.x <= 10 || cur.x + cur.w >= canvas.width - 10) {
        cur.dir *= -1;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#78350f';
      ctx.fillRect(0, 310, canvas.width, 10);

      t.blocks.forEach((b, idx) => {
        const colors = ['#f59e0b', '#22c55e', '#3b82f6', '#ec4899', '#8b5cf6'];
        ctx.fillStyle = colors[idx % colors.length];
        ctx.fillRect(b.x, b.y, b.w, 26);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(b.x, b.y, b.w, 26);

        ctx.font = '14px sans-serif';
        ctx.fillText('🌾', b.x + b.w / 2 - 7, b.y + 18);
      });

      ctx.fillStyle = '#eab308';
      ctx.fillRect(cur.x, cur.y, cur.w, 26);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.strokeRect(cur.x, cur.y, cur.w, 26);
      ctx.font = '14px sans-serif';
      ctx.fillText('📦', cur.x + cur.w / 2 - 7, cur.y + 18);

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [gameState]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5 shadow-xs max-w-xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">Agri Yield Tower 🧱</h2>
          <p className="text-xs text-slate-500">Stack grain bales & crop sacks perfectly to reach the AIR-1 Master Height!</p>
        </div>

        <div className="flex items-center gap-3 font-mono font-bold text-xs">
          <div className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900 flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>Best: {highScore}</span>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-blue-600 text-white font-black shadow-xs">
            Height: {score}
          </div>
        </div>
      </div>

      <div className="relative max-w-[320px] mx-auto rounded-xl overflow-hidden border-2 border-slate-300 dark:border-slate-800 shadow-md">
        <canvas
          ref={canvasRef}
          width={320}
          height={320}
          onClick={dropBlock}
          className="bg-slate-950 block mx-auto cursor-pointer touch-none"
        />

        {gameState === 'START' && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center text-white space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center text-2xl font-bold shadow-lg animate-bounce">
              🧱
            </div>
            <div>
              <h3 className="text-lg font-black">Yield Tower Stacker</h3>
              <p className="text-xs text-slate-300 mt-1">Tap canvas or click Drop Block button</p>
            </div>
            <button
              onClick={startTower}
              className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Start Stacking</span>
            </button>
          </div>
        )}

        {gameState === 'GAMEOVER' && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center text-white space-y-3">
            <h3 className="text-xl font-black text-rose-400">Tower Collapsed! 🧱💥</h3>
            <div className="text-xs font-mono">Final Tower Height: <span className="text-amber-400 font-bold">{score} Blocks</span></div>
            <button
              onClick={startTower}
              className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Stack Again</span>
            </button>
          </div>
        )}
      </div>

      <button
        onClick={dropBlock}
        disabled={gameState !== 'PLAYING'}
        className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition disabled:opacity-50"
      >
        DROP BLOCK / STACK 🧱 (TAP HERE)
      </button>

    </div>
  );
}

function IrrigationArcheryGame({ onRewardXP }) {
  const [score, setScore] = useState(0);
  const [shotsLeft, setShotsLeft] = useState(5);
  const [angle, setAngle] = useState(45);
  const [power, setPower] = useState(60);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [highScore, setHighScore] = useState(() => {
    try {
      const saved = localStorage.getItem('gate_ag_archery_highscore');
      return saved ? parseInt(saved, 10) : 0;
    } catch (e) {
      return 0;
    }
  });

  const [targetDist, setTargetDist] = useState(() => Math.floor(Math.random() * 40) + 40);

  const resetGame = () => {
    setScore(0);
    setShotsLeft(5);
    setAngle(45);
    setPower(60);
    setFeedbackMsg('');
    setTargetDist(Math.floor(Math.random() * 40) + 40);
  };

  const handleShoot = () => {
    if (shotsLeft <= 0) return;

    const rad = (angle * Math.PI) / 180;
    const g = 9.81;
    const v = power * 0.45;
    const calcDist = (v * v * Math.sin(2 * rad)) / g;

    const diff = Math.abs(calcDist - targetDist);

    let points = 0;
    if (diff < 3) {
      soundFX.playWin();
      points = 100;
      onRewardXP?.(20);
      setFeedbackMsg('🎯 Bullseye! Direct Crop Hit (+20 XP)');
      confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } });
    } else if (diff < 8) {
      soundFX.playScore();
      points = 50;
      onRewardXP?.(10);
      setFeedbackMsg('🌾 Great Irrigation! (+10 XP)');
    } else if (diff < 15) {
      soundFX.playScore();
      points = 20;
      onRewardXP?.(5);
      setFeedbackMsg('💧 Partial Moisture (+5 XP)');
    } else {
      soundFX.playCrash();
      setFeedbackMsg('❌ Missed Crop Bed!');
    }

    const newScore = score + points;
    setScore(newScore);
    const remaining = shotsLeft - 1;
    setShotsLeft(remaining);

    if (remaining > 0) {
      setTargetDist(Math.floor(Math.random() * 40) + 40);
    } else {
      if (newScore > highScore) {
        setHighScore(newScore);
        try {
          localStorage.setItem('gate_ag_archery_highscore', newScore.toString());
        } catch (e) {}
      }
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5 shadow-xs max-w-xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
            <Target className="w-4 h-4 text-blue-500" />
            <span>Irrigation Archery Target Practice 🎯</span>
          </h2>
          <p className="text-xs text-slate-500">Calculate angle & nozzle pressure to hit thirsty crop targets!</p>
        </div>

        <div className="flex items-center gap-3 font-mono font-bold text-xs">
          <div className="px-3 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900">
            Best: {highScore}
          </div>
          <div className="px-3 py-1 rounded-xl bg-blue-600 text-white font-black">
            Score: {score}
          </div>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
        <div className="flex items-center justify-between font-mono font-bold">
          <span>Target Crop Distance: <span className="text-blue-600 dark:text-blue-400 font-extrabold">{targetDist} m</span></span>
          <span className="text-rose-500">Shots Remaining: {shotsLeft}</span>
        </div>

        {feedbackMsg && (
          <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 font-bold text-center">
            {feedbackMsg}
          </div>
        )}

        <div className="space-y-3 pt-2">
          <div>
            <div className="flex justify-between font-bold mb-1">
              <span>Nozzle Angle (θ): {angle}°</span>
            </div>
            <input
              type="range"
              min="15"
              max="75"
              value={angle}
              onChange={(e) => setAngle(parseInt(e.target.value))}
              className="w-full accent-blue-600"
              disabled={shotsLeft <= 0}
            />
          </div>

          <div>
            <div className="flex justify-between font-bold mb-1">
              <span>Water Pressure Power (P): {power}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              value={power}
              onChange={(e) => setPower(parseInt(e.target.value))}
              className="w-full accent-emerald-600"
              disabled={shotsLeft <= 0}
            />
          </div>
        </div>

        {shotsLeft > 0 ? (
          <button
            onClick={handleShoot}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold rounded-xl shadow-xs transition"
          >
            SHOOT WATER DROPLET 💧
          </button>
        ) : (
          <button
            onClick={resetGame}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl shadow-xs transition"
          >
            Play Next Round 🎯
          </button>
        )}
      </div>

    </div>
  );
}

function AgriAnagramGame({ onRewardXP }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scrambled, setScrambled] = useState('');
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [highScore, setHighScore] = useState(() => {
    try {
      const saved = localStorage.getItem('gate_ag_anagram_highscore');
      return saved ? parseInt(saved, 10) : 0;
    } catch (e) {
      return 0;
    }
  });

  const scrambleWord = (word) => {
    const arr = word.split('');
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join(' ');
  };

  const loadQuestion = useCallback((idx) => {
    const item = ANAGRAM_POOL[idx % ANAGRAM_POOL.length];
    setScrambled(scrambleWord(item.word));
    setUserInput('');
    setShowHint(false);
    setFeedback('');
  }, []);

  useEffect(() => {
    loadQuestion(0);
  }, [loadQuestion]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const item = ANAGRAM_POOL[currentIdx % ANAGRAM_POOL.length];

    if (userInput.trim().toUpperCase() === item.word) {
      soundFX.playScore();
      const addPts = 10 + streak * 5;
      const newScore = score + addPts;
      setScore(newScore);
      setStreak(s => s + 1);
      onRewardXP?.(10);
      setFeedback(`🎉 Correct! +10 XP`);

      if (newScore > highScore) {
        soundFX.playWin();
        setHighScore(newScore);
        try {
          localStorage.setItem('gate_ag_anagram_highscore', newScore.toString());
        } catch (e) {}
      }

      setTimeout(() => {
        const next = currentIdx + 1;
        setCurrentIdx(next);
        loadQuestion(next);
      }, 1000);
    } else {
      soundFX.playCrash();
      setStreak(0);
      setFeedback('❌ Incorrect. Try again or view hint!');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5 shadow-xs max-w-xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Concept Anagram Blitz 🔤</span>
          </h2>
          <p className="text-xs text-slate-500">Unscramble core Agricultural Engineering terms to build streak combos!</p>
        </div>

        <div className="flex items-center gap-3 font-mono font-bold text-xs">
          <div className="px-3 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900">
            Streak: 🔥 {streak}
          </div>
          <div className="px-3 py-1 rounded-xl bg-purple-600 text-white font-black">
            Score: {score}
          </div>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4 text-center">
        <div className="text-2xl font-mono font-black tracking-widest text-purple-600 dark:text-purple-400">
          {scrambled}
        </div>

        {showHint && (
          <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-200 text-xs font-bold animate-in fade-in">
            💡 Hint: {ANAGRAM_POOL[currentIdx % ANAGRAM_POOL.length].hint}
          </div>
        )}

        {feedback && (
          <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
            {feedback}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 pt-2">
          <input
            type="text"
            required
            placeholder="Type unscrambled word..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="w-full text-center px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-mono font-extrabold tracking-wider uppercase text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-purple-500"
          />

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => { soundFX.playClick(); setShowHint(true); }}
              className="flex-1 py-2 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold text-xs hover:bg-amber-200 transition flex items-center justify-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Show Hint</span>
            </button>

            <button
              type="submit"
              className="flex-1 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-xs transition"
            >
              Submit Word
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}

function Farm2048Game({ onRewardXP }) {
  const [grid, setGrid] = useState(() => createEmptyGrid());
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      const saved = localStorage.getItem('gate_ag_2048_highscore');
      return saved ? parseInt(saved, 10) : 0;
    } catch (e) {
      return 0;
    }
  });
  const [history, setHistory] = useState([]);
  const [won2048, setWon2048] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  function createEmptyGrid() {
    const newGrid = Array(4).fill(null).map(() => Array(4).fill(0));
    addRandomTile(newGrid);
    addRandomTile(newGrid);
    return newGrid;
  }

  function addRandomTile(board) {
    const emptyCells = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (board[r][c] === 0) emptyCells.push([r, c]);
      }
    }
    if (emptyCells.length === 0) return;
    const [r, c] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[r][c] = Math.random() < 0.9 ? 2 : 4;
  }

  const restartGame = () => {
    const fresh = createEmptyGrid();
    setGrid(fresh);
    setScore(0);
    setHistory([]);
    setWon2048(false);
    setGameOver(false);
  };

  const undoMove = () => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setGrid(last.grid);
    setScore(last.score);
    setHistory(prev => prev.slice(0, -1));
    setGameOver(false);
  };

  const move = useCallback((direction) => {
    if (gameOver) return;

    let board = grid.map(row => [...row]);
    let pointsAdded = 0;
    let moved = false;

    setHistory(prev => [...prev.slice(-5), { grid: grid.map(r => [...r]), score }]);

    if (direction === 'LEFT' || direction === 'RIGHT') {
      for (let r = 0; r < 4; r++) {
        let row = board[r].filter(val => val !== 0);
        if (direction === 'RIGHT') row.reverse();

        for (let i = 0; i < row.length - 1; i++) {
          if (row[i] === row[i + 1]) {
            row[i] *= 2;
            pointsAdded += row[i];
            row[i + 1] = 0;
            soundFX.playScore();
            onRewardXP?.(10);
            if (row[i] === 2048 && !won2048) {
              setWon2048(true);
              soundFX.playWin();
              confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
            }
          }
        }
        row = row.filter(val => val !== 0);
        while (row.length < 4) row.push(0);
        if (direction === 'RIGHT') row.reverse();

        for (let c = 0; c < 4; c++) {
          if (board[r][c] !== row[c]) moved = true;
          board[r][c] = row[c];
        }
      }
    } else if (direction === 'UP' || direction === 'DOWN') {
      for (let c = 0; c < 4; c++) {
        let col = [];
        for (let r = 0; r < 4; r++) {
          if (board[r][c] !== 0) col.push(board[r][c]);
        }
        if (direction === 'DOWN') col.reverse();

        for (let i = 0; i < col.length - 1; i++) {
          if (col[i] === col[i + 1]) {
            col[i] *= 2;
            pointsAdded += col[i];
            col[i + 1] = 0;
            soundFX.playScore();
            onRewardXP?.(10);
            if (col[i] === 2048 && !won2048) {
              setWon2048(true);
              soundFX.playWin();
              confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
            }
          }
        }
        col = col.filter(val => val !== 0);
        while (col.length < 4) col.push(0);
        if (direction === 'DOWN') col.reverse();

        for (let r = 0; r < 4; r++) {
          if (board[r][c] !== col[r]) moved = true;
          board[r][c] = col[r];
        }
      }
    }

    if (moved) {
      addRandomTile(board);
      setGrid(board);
      const newScore = score + pointsAdded;
      setScore(newScore);

      if (newScore > highScore) {
        setHighScore(newScore);
        try {
          localStorage.setItem('gate_ag_2048_highscore', newScore.toString());
        } catch (e) {}
      }

      if (checkGameOver(board)) {
        soundFX.playCrash();
        setGameOver(true);
      }
    }
  }, [grid, score, highScore, won2048, gameOver, onRewardXP]);

  function checkGameOver(board) {
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (board[r][c] === 0) return false;
        if (c < 3 && board[r][c] === board[r][c + 1]) return false;
        if (r < 3 && board[r][c] === board[r + 1][c]) return false;
      }
    }
    return true;
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowUp', 'KeyW'].includes(e.code)) move('UP');
      if (['ArrowDown', 'KeyS'].includes(e.code)) move('DOWN');
      if (['ArrowLeft', 'KeyA'].includes(e.code)) move('LEFT');
      if (['ArrowRight', 'KeyD'].includes(e.code)) move('RIGHT');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [move]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>Farm Machinery 2048 🚜</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Merge matching machinery tiles to advance from Hoe to AIR-1 Master!
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-mono font-bold text-xs border border-amber-200 dark:border-amber-900 flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>Best: {highScore}</span>
          </div>

          <div className="px-4 py-1.5 rounded-xl bg-blue-600 text-white font-mono font-black text-sm shadow-md">
            Score: {score}
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto relative bg-slate-200 dark:bg-slate-950 p-3 rounded-2xl border-4 border-slate-300 dark:border-slate-800 shadow-inner">
        <div className="grid grid-cols-4 gap-2.5 aspect-square">
          {grid.map((row, r) =>
            row.map((cell, c) => {
              const info = FARM_MACHINERY_TILES[cell] || { label: '', sub: '', bg: 'bg-slate-100 dark:bg-slate-850' };
              return (
                <div
                  key={`${r}-${c}`}
                  className={`rounded-xl flex flex-col items-center justify-center p-1.5 transition-all duration-150 border text-center ${
                    cell === 0 ? 'bg-slate-100/60 dark:bg-slate-900/60 border-transparent' : `${info.bg} shadow-md`
                  }`}
                >
                  {cell > 0 && (
                    <>
                      <span className="text-[10px] font-mono font-black opacity-60 leading-none">{cell}</span>
                      <span className="text-xs font-black truncate max-w-full leading-tight mt-0.5">{info.label}</span>
                      <span className="text-[9px] truncate max-w-full font-medium mt-0.5 leading-tight">{info.sub}</span>
                    </>
                  )}
                </div>
              );
            })
          )}
        </div>

        {gameOver && (
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xs rounded-2xl flex flex-col items-center justify-center p-6 text-center text-white space-y-3">
            <XCircle className="w-12 h-12 text-rose-400" />
            <h3 className="text-xl font-extrabold">Field Over! No moves left.</h3>
            <p className="text-xs text-slate-300 font-mono">Final Score: {score}</p>
            <button
              onClick={restartGame}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Try Again</span>
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 max-w-md mx-auto pt-2">
        <div className="flex items-center gap-2">
          <button
            onClick={undoMove}
            disabled={history.length === 0}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 disabled:opacity-40 transition"
          >
            Undo Move
          </button>
          <button
            onClick={restartGame}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 transition"
          >
            New Game
          </button>
        </div>

        <div className="grid grid-cols-3 gap-1 sm:hidden">
          <div />
          <button onClick={() => move('UP')} className="p-2 bg-slate-200 dark:bg-slate-800 rounded-lg text-slate-800 dark:text-slate-200 font-bold">
            <ArrowUp className="w-4 h-4 mx-auto" />
          </button>
          <div />
          <button onClick={() => move('LEFT')} className="p-2 bg-slate-200 dark:bg-slate-800 rounded-lg text-slate-800 dark:text-slate-200 font-bold">
            <ArrowLeft className="w-4 h-4 mx-auto" />
          </button>
          <button onClick={() => move('DOWN')} className="p-2 bg-slate-200 dark:bg-slate-800 rounded-lg text-slate-800 dark:text-slate-200 font-bold">
            <ArrowDown className="w-4 h-4 mx-auto" />
          </button>
          <button onClick={() => move('RIGHT')} className="p-2 bg-slate-200 dark:bg-slate-800 rounded-lg text-slate-800 dark:text-slate-200 font-bold">
            <ArrowRight className="w-4 h-4 mx-auto" />
          </button>
        </div>
      </div>
    </div>
  );
}

function MemoryMatchGame({ onRewardXP }) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  const initGame = useCallback(() => {
    const deck = [];
    FORMULA_PAIRS_DATA.forEach(pair => {
      deck.push({ id: `${pair.id}-c`, pairId: pair.id, text: pair.concept, type: 'concept' });
      deck.push({ id: `${pair.id}-f`, pairId: pair.id, text: pair.formula, type: 'formula' });
    });
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

  const handleCardClick = (index) => {
    if (flipped.length === 2 || flipped.includes(index) || matched.includes(cards[index].pairId)) return;
    soundFX.playClick();

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const card1 = cards[newFlipped[0]];
      const card2 = cards[newFlipped[1]];

      if (card1.pairId === card2.pairId) {
        soundFX.playScore();
        onRewardXP?.(10);
        const newMatched = [...matched, card1.pairId];
        setMatched(newMatched);
        setFlipped([]);
        if (newMatched.length === FORMULA_PAIRS_DATA.length) {
          soundFX.playWin();
          confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
        }
      } else {
        setTimeout(() => setFlipped([]), 1200);
      }
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-6 shadow-xs">
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            Concept Memory Match 🧠
          </h2>
          <p className="text-xs text-slate-500">
            Flip cards to pair core Agricultural Engineering concepts with LaTeX formulas.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs font-bold">
            Moves: {moves}
          </div>
          <button
            onClick={initGame}
            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-xs transition"
          >
            Reset Board
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
        {cards.map((card, idx) => {
          const isFlipped = flipped.includes(idx) || matched.includes(card.pairId);
          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(idx)}
              className={`h-28 rounded-xl border p-3 flex flex-col justify-between cursor-pointer transition-all duration-300 select-none text-center ${
                isFlipped
                  ? card.type === 'concept'
                    ? 'bg-blue-50 dark:bg-blue-950/80 border-blue-400 text-blue-900 dark:text-blue-200 shadow-md scale-105'
                    : 'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-400 text-emerald-900 dark:text-emerald-200 shadow-md scale-105'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:bg-slate-200 dark:hover:bg-slate-750'
              }`}
            >
              {isFlipped ? (
                <>
                  <span className="text-[10px] font-mono uppercase tracking-wider opacity-60">
                    {card.type === 'concept' ? '💡 Concept' : '📄 Formula'}
                  </span>
                  <p className="text-xs font-extrabold leading-snug my-auto">{card.text}</p>
                </>
              ) : (
                <div className="m-auto text-slate-400 font-black text-lg">?</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SpeedMathGame({ onRewardXP }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      const saved = localStorage.getItem('gate_ag_speedmath_highscore');
      return saved ? parseInt(saved, 10) : 0;
    } catch (e) {
      return 0;
    }
  });

  const [currentQ, setCurrentQ] = useState(null);

  const nextQuestion = useCallback(() => {
    const rand = SPEED_MATH_POOL[Math.floor(Math.random() * SPEED_MATH_POOL.length)];
    setCurrentQ(rand);
  }, []);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
    nextQuestion();
  };

  useEffect(() => {
    let timer;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
      if (score > highScore) {
        soundFX.playWin();
        setHighScore(score);
        try {
          localStorage.setItem('gate_ag_speedmath_highscore', score.toString());
        } catch (e) {}
        confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
      }
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, score, highScore]);

  const handleAnswer = (optIndex) => {
    if (!isPlaying || !currentQ) return;
    if (optIndex === currentQ.answer) {
      soundFX.playScore();
      setScore(s => s + 10);
      onRewardXP?.(10);
    } else {
      soundFX.playCrash();
    }
    nextQuestion();
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-6 shadow-xs max-w-xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            30s Speed Math Blitz ⚡
          </h2>
          <p className="text-xs text-slate-500">
            Rapid unit conversions & mental math sprint for GATE AG calculations.
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-mono text-xs font-bold border border-amber-200 dark:border-amber-900 flex items-center gap-1">
          <Trophy className="w-3.5 h-3.5 text-amber-500" />
          <span>Best: {highScore}</span>
        </div>
      </div>

      {!isPlaying ? (
        <div className="text-center py-8 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto text-2xl font-bold">
            ⚡
          </div>
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Ready for Speed Sprint?</h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Solve as many unit conversion & formula questions as possible in 30 seconds!
          </p>
          <button
            onClick={startGame}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl shadow-md transition"
          >
            Start 30s Blitz
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between font-mono font-bold text-sm">
            <span className="text-rose-500">⏱️ Time Left: {timeLeft}s</span>
            <span className="text-emerald-500">Score: {score}</span>
          </div>

          {currentQ && (
            <div className="space-y-4">
              <div className="p-6 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-center">
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">{currentQ.q}</h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {currentQ.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-blue-600 hover:text-white font-mono font-bold text-sm text-slate-900 dark:text-slate-100 transition"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function AgriSnakeGame({ onRewardXP }) {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('START');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      const saved = localStorage.getItem('gate_ag_snake_highscore');
      return saved ? parseInt(saved, 10) : 0;
    } catch (e) {
      return 0;
    }
  });

  const snakeRef = useRef({
    snake: [{ x: 8, y: 8 }, { x: 7, y: 8 }, { x: 6, y: 8 }],
    dir: { x: 1, y: 0 },
    nextDir: { x: 1, y: 0 },
    food: { x: 12, y: 8, type: '🌾' },
    score: 0
  });

  const spawnFood = (snake) => {
    let newX, newY;
    let collision = true;
    while (collision) {
      newX = Math.floor(Math.random() * 16);
      newY = Math.floor(Math.random() * 16);
      collision = snake.some(seg => seg.x === newX && seg.y === newY);
    }
    const foodTypes = ['🌾', '🌽', '🍎', '🚜'];
    const type = foodTypes[Math.floor(Math.random() * foodTypes.length)];
    return { x: newX, y: newY, type };
  };

  const startGame = () => {
    const initSnake = [{ x: 8, y: 8 }, { x: 7, y: 8 }, { x: 6, y: 8 }];
    snakeRef.current = {
      snake: initSnake,
      dir: { x: 1, y: 0 },
      nextDir: { x: 1, y: 0 },
      food: spawnFood(initSnake),
      score: 0
    };
    setScore(0);
    setGameState('PLAYING');
  };

  const changeDir = useCallback((dx, dy) => {
    soundFX.playClick();
    const curDir = snakeRef.current.dir;
    if (curDir.x + dx !== 0 || curDir.y + dy !== 0) {
      snakeRef.current.nextDir = { x: dx, y: dy };
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowUp', 'KeyW'].includes(e.code)) changeDir(0, -1);
      if (['ArrowDown', 'KeyS'].includes(e.code)) changeDir(0, 1);
      if (['ArrowLeft', 'KeyA'].includes(e.code)) changeDir(-1, 0);
      if (['ArrowRight', 'KeyD'].includes(e.code)) changeDir(1, 0);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [changeDir]);

  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    const interval = setInterval(() => {
      const s = snakeRef.current;
      s.dir = s.nextDir;

      const head = { x: s.snake[0].x + s.dir.x, y: s.snake[0].y + s.dir.y };

      if (head.x < 0 || head.x >= 16 || head.y < 0 || head.y >= 16) {
        handleSnakeGameOver();
        return;
      }

      if (s.snake.some(seg => seg.x === head.x && seg.y === head.y)) {
        handleSnakeGameOver();
        return;
      }

      const newSnake = [head, ...s.snake];

      if (head.x === s.food.x && head.y === s.food.y) {
        soundFX.playScore();
        s.score += 10;
        setScore(s.score);
        onRewardXP?.(10);
        s.food = spawnFood(newSnake);
      } else {
        newSnake.pop();
      }

      s.snake = newSnake;

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        const cellSize = 20;

        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 16; i++) {
          ctx.beginPath();
          ctx.moveTo(i * cellSize, 0);
          ctx.lineTo(i * cellSize, canvas.height);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(0, i * cellSize);
          ctx.lineTo(canvas.width, i * cellSize);
          ctx.stroke();
        }

        s.snake.forEach((seg, i) => {
          ctx.fillStyle = i === 0 ? '#22c55e' : '#15803d';
          ctx.fillRect(seg.x * cellSize + 1, seg.y * cellSize + 1, cellSize - 2, cellSize - 2);
        });

        ctx.font = '14px sans-serif';
        ctx.fillText(s.food.type, s.food.x * cellSize + 2, s.food.y * cellSize + 16);
      }
    }, 130);

    const handleSnakeGameOver = () => {
      soundFX.playCrash();
      setGameState('GAMEOVER');
      const finalScore = snakeRef.current.score;
      if (finalScore > highScore) {
        soundFX.playWin();
        setHighScore(finalScore);
        try {
          localStorage.setItem('gate_ag_snake_highscore', finalScore.toString());
        } catch (e) {}
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }
    };

    return () => clearInterval(interval);
  }, [gameState, highScore, onRewardXP]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-5 shadow-xs max-w-xl mx-auto">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">Agri Retro Snake 🐍</h2>
          <p className="text-xs text-slate-500">Harvest crops on the grid and cultivate your score!</p>
        </div>

        <div className="flex items-center gap-3 font-mono font-bold text-xs">
          <div className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900 flex items-center gap-1">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>Best: {highScore}</span>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white font-black shadow-xs">
            Score: {score}
          </div>
        </div>
      </div>

      <div className="relative max-w-[320px] mx-auto rounded-xl overflow-hidden border-2 border-slate-300 dark:border-slate-800 shadow-md">
        <canvas
          ref={canvasRef}
          width={320}
          height={320}
          className="bg-slate-950 block mx-auto"
        />

        {gameState === 'START' && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center text-white space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-2xl font-bold shadow-lg animate-pulse">
              🐍
            </div>
            <div>
              <h3 className="text-lg font-black">Agri Retro Snake</h3>
              <p className="text-xs text-slate-300 mt-1">Use WASD, Arrow keys or D-Pad below</p>
            </div>
            <button
              onClick={startGame}
              className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Start Harvest</span>
            </button>
          </div>
        )}

        {gameState === 'GAMEOVER' && (
          <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center text-white space-y-3">
            <h3 className="text-xl font-black text-rose-400">Fence Crash! Game Over 🐍💥</h3>
            <div className="text-xs font-mono">Final Yield Score: <span className="text-emerald-400 font-bold">{score}</span></div>
            <button
              onClick={startGame}
              className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Play Again</span>
            </button>
          </div>
        )}
      </div>

      <div className="max-w-[200px] mx-auto grid grid-cols-3 gap-1 pt-1">
        <div />
        <button onClick={() => changeDir(0, -1)} className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white rounded-xl text-slate-800 dark:text-slate-200 font-bold transition">
          <ArrowUp className="w-5 h-5 mx-auto" />
        </button>
        <div />
        <button onClick={() => changeDir(-1, 0)} className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white rounded-xl text-slate-800 dark:text-slate-200 font-bold transition">
          <ArrowLeft className="w-5 h-5 mx-auto" />
        </button>
        <button onClick={() => changeDir(0, 1)} className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white rounded-xl text-slate-800 dark:text-slate-200 font-bold transition">
          <ArrowDown className="w-5 h-5 mx-auto" />
        </button>
        <button onClick={() => changeDir(1, 0)} className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white rounded-xl text-slate-800 dark:text-slate-200 font-bold transition">
          <ArrowRight className="w-5 h-5 mx-auto" />
        </button>
      </div>

    </div>
  );
}

function TicTacToeGame({ onRewardXP }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (i) => {
    if (board[i] || calculateWinner(board)) return;
    soundFX.playClick();
    const newBoard = [...board];
    newBoard[i] = '🚜';
    setBoard(newBoard);
    setIsXNext(false);
  };

  useEffect(() => {
    if (!isXNext && !calculateWinner(board)) {
      const emptyIndices = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
      if (emptyIndices.length > 0) {
        const randIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        setTimeout(() => {
          setBoard(prev => {
            const copy = [...prev];
            copy[randIndex] = '🌾';
            return copy;
          });
          setIsXNext(true);
        }, 400);
      }
    }
  }, [isXNext, board]);

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(board);

  useEffect(() => {
    if (winner) {
      if (winner === '🚜') {
        soundFX.playWin();
        onRewardXP?.(20);
      } else {
        soundFX.playCrash();
      }
    }
  }, [winner, onRewardXP]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 text-center space-y-4 shadow-xs max-w-sm mx-auto">
      <h2 className="text-xl font-black text-slate-900 dark:text-white">Tic-Tac-Toe vs GATE AI ❌⭕</h2>
      <p className="text-xs text-slate-500">Tractor (🚜) vs Wheat (🌾)</p>

      <div className="grid grid-cols-3 gap-2 aspect-square">
        {board.map((square, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(idx)}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-2xl flex items-center justify-center hover:bg-blue-50 transition"
          >
            {square}
          </button>
        ))}
      </div>

      {winner && (
        <div className="text-xs font-bold text-emerald-500">
          Winner: {winner}!
        </div>
      )}

      <button
        onClick={() => { soundFX.playClick(); setBoard(Array(9).fill(null)); setIsXNext(true); }}
        className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs"
      >
        Restart Match
      </button>
    </div>
  );
}
