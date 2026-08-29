import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Crown, 
  Award, 
  Zap, 
  Sparkles, 
  CheckCircle2, 
  Flame, 
  ShieldCheck, 
  TrendingUp, 
  User, 
  Medal,
  HelpCircle,
  Clock,
  Gamepad2,
  Swords,
  Wrench,
  Building2,
  Crosshair
} from 'lucide-react';
import { fetchLeaderboardRankings } from '../services/leaderboardService';
import { getLeaderboardData, getLocalBreakXP } from '../services/breakLeaderboardService';

export default function Leaderboard({ currentStudent }) {
  const [activeLeaderboardTab, setActiveLeaderboardTab] = useState('academic'); // 'academic' or 'breakzone'
  const [rankings, setRankings] = useState([]);
  const [breakRankings, setBreakRankings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      // 1. Fetch Academic Leaderboard data
      const data = await fetchLeaderboardRankings();
      setRankings(data || []);

      // 2. Fetch Break Zone Leaderboard data
      const breakData = getLeaderboardData();
      setBreakRankings(breakData || []);

      setLoading(false);
    }
    loadData();
  }, []);

  const studentName = currentStudent?.full_name || currentStudent?.name || 'Aspirant';
  
  // Academic Rank Spotlight
  const myAcademicRankObj = rankings.find(r => r.name.toLowerCase() === studentName.toLowerCase()) || {
    rank: rankings.length > 0 ? rankings.length + 1 : 1,
    name: studentName,
    xp: 0,
    accuracy: '0.0',
    testsTaken: 0
  };

  // Break Zone Rank Spotlight
  const userBreakXP = getLocalBreakXP();
  const myBreakRankObj = breakRankings.find(r => r.isCurrentUser || r.full_name.toLowerCase() === studentName.toLowerCase()) || {
    rank: '1',
    full_name: studentName,
    college_name: currentStudent?.college_name || 'COAET CCS HAU Hisar',
    break_xp: userBreakXP
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200 pb-12">
      
      {/* Top Banner */}
      <div className="card-3d rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500">
                <Trophy className="w-4 h-4" />
              </div>
              <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">
                All-India GATE AG Aspirant Leaderboards
              </h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Compare academic test series standings alongside Break Zone arcade & simulator rankings across All-India institutes.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs font-bold px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900 shrink-0">
            <Flame className="w-4 h-4 text-amber-500 animate-bounce" />
            <span>Live Real-Time Rankings</span>
          </div>
        </div>
      </div>

      {/* DUAL LEADERBOARD TAB SWITCHER */}
      <div className="flex flex-wrap gap-3 bg-slate-100 dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveLeaderboardTab('academic')}
          className={`flex-1 min-w-[220px] py-3 px-4 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 border ${
            activeLeaderboardTab === 'academic'
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-500 shadow-md'
              : 'bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850'
          }`}
        >
          <Trophy className="w-4 h-4 text-yellow-300" />
          <span>🎯 GATE AG ACADEMIC LEADERBOARD</span>
        </button>

        <button
          onClick={() => setActiveLeaderboardTab('breakzone')}
          className={`flex-1 min-w-[220px] py-3 px-4 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 border ${
            activeLeaderboardTab === 'breakzone'
              ? 'bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 text-white border-cyan-400 shadow-md'
              : 'bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850'
          }`}
        >
          <Gamepad2 className="w-4 h-4 text-cyan-300" />
          <span>🕹️ BREAK ZONE ARCADE LEADERBOARD</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB A: GATE AG ACADEMIC TEST LEADERBOARD */}
      {/* ======================================================== */}
      {activeLeaderboardTab === 'academic' && (
        <div className="space-y-6">

          {/* Gamified Academic XP Rules */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>+1.0 XP / Correct</span>
              </div>
              <p className="text-[10px] text-slate-400">Rewarded for every correct answer in test or practice.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-blue-600 dark:text-blue-400">
                <Zap className="w-3.5 h-3.5" />
                <span>+0.5 XP / Attempt</span>
              </div>
              <p className="text-[10px] text-slate-400">Active effort bonus even if answer is incorrect.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-600 dark:text-amber-400">
                <Award className="w-3.5 h-3.5" />
                <span>+15 XP Full Mock</span>
              </div>
              <p className="text-[10px] text-slate-400">Completion bonus for finishing a full 65-Q CBT paper.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-purple-600 dark:text-purple-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>+5 XP / 15 Qs</span>
              </div>
              <p className="text-[10px] text-slate-400">Milestone bonus for every 15 questions solved.</p>
            </div>
          </div>

          {/* Logged-In Student Spotlight Rank Card */}
          <div className="card-3d rounded-2xl bg-gradient-to-r from-blue-900 via-slate-900 to-blue-950 p-5 text-white shadow-md relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 font-black text-lg shadow-inner">
                  #{myAcademicRankObj.rank}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-extrabold text-white">{studentName}</h2>
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[10px] font-extrabold">
                      ACADEMIC RANK #{myAcademicRankObj.rank}
                    </span>
                  </div>
                  <p className="text-xs text-blue-200/80 mt-0.5">
                    {currentStudent?.college_name || 'COAET CCS HAU Hisar'} &bull; {currentStudent?.admission_no || '2024AE32BIV'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0 font-mono text-center">
                <div>
                  <div className="text-xl font-black text-amber-400">{myAcademicRankObj.xp}</div>
                  <div className="text-[10px] text-slate-400 font-sans">Academic XP Points</div>
                </div>
                <div>
                  <div className="text-xl font-black text-emerald-400">{myAcademicRankObj.accuracy}%</div>
                  <div className="text-[10px] text-slate-400 font-sans">Accuracy</div>
                </div>
                <div>
                  <div className="text-xl font-black text-blue-400">{myAcademicRankObj.testsTaken}</div>
                  <div className="text-[10px] text-slate-400 font-sans">Tests Solved</div>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Leaderboard Table */}
          <div className="card-3d rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Academic Test Standings
                </h2>
              </div>
              <span className="text-[11px] font-mono text-slate-400">{rankings.length} Ranked Aspirants</span>
            </div>

            {loading ? (
              <div className="py-8 text-center text-xs text-slate-400">Loading standings...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
                      <th className="py-3 px-3">Rank</th>
                      <th className="py-3 px-3">Aspirant Name</th>
                      <th className="py-3 px-3">College / Institute</th>
                      <th className="py-3 px-3 text-right">Total XP</th>
                      <th className="py-3 px-3 text-right">Accuracy</th>
                      <th className="py-3 px-3 text-right">Tests Solved</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                    {rankings.map((r) => {
                      const isMe = r.name.toLowerCase() === studentName.toLowerCase();
                      
                      return (
                        <tr 
                          key={r.rank} 
                          className={`transition ${
                            isMe 
                              ? 'bg-blue-50/80 dark:bg-blue-950/50 font-bold border-l-4 border-l-blue-600' 
                              : 'hover:bg-slate-50 dark:hover:bg-slate-950/60'
                          }`}
                        >
                          <td className="py-3 px-3 font-mono font-black text-xs whitespace-nowrap">
                            {r.rank === 1 ? (
                              <span className="flex items-center gap-1 text-amber-500 font-black text-sm">
                                <Crown className="w-4 h-4 fill-amber-500" /> #1
                              </span>
                            ) : r.rank === 2 ? (
                              <span className="flex items-center gap-1 text-slate-400 font-black text-sm">
                                <Medal className="w-4 h-4 fill-slate-400" /> #2
                              </span>
                            ) : r.rank === 3 ? (
                              <span className="flex items-center gap-1 text-amber-700 font-black text-sm">
                                <Medal className="w-4 h-4 fill-amber-700" /> #3
                              </span>
                            ) : (
                              <span className="text-slate-500">#{r.rank}</span>
                            )}
                          </td>
                          
                          <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">
                            <div className="flex items-center gap-2">
                              <span>{r.name}</span>
                              {isMe && (
                                <span className="px-1.5 py-0.5 rounded bg-blue-600 text-white text-[9px] font-extrabold uppercase">
                                  YOU
                                </span>
                              )}
                            </div>
                          </td>

                          <td className="py-3 px-3 text-slate-500 text-[11px] truncate max-w-[200px]">
                            {r.college} ({r.admissionNo})
                          </td>

                          <td className="py-3 px-3 text-right font-mono font-black text-amber-600 dark:text-amber-400 text-xs">
                            {r.xp} XP
                          </td>

                          <td className="py-3 px-3 text-right font-mono font-extrabold text-emerald-600 dark:text-emerald-400">
                            {r.accuracy}%
                          </td>

                          <td className="py-3 px-3 text-right font-mono text-slate-500">
                            {r.testsTaken} Tests
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* TAB B: BREAK ZONE ARCADE LEADERBOARD */}
      {/* ======================================================== */}
      {activeLeaderboardTab === 'breakzone' && (
        <div className="space-y-6">

          {/* Gamified Break XP Reward Rules */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-cyan-600 dark:text-cyan-400">
                <Crosshair className="w-3.5 h-3.5" />
                <span>+300 XP / Boss Defeat</span>
              </div>
              <p className="text-[10px] text-slate-400">Awarded for shattering GATE concept bosses in bullet-hell arena.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-indigo-600 dark:text-indigo-400">
                <Swords className="w-3.5 h-3.5" />
                <span>+200 XP / 1v1 Duel</span>
              </div>
              <p className="text-[10px] text-slate-400">Awarded for defeating rivals in real-time speed math duels.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-600 dark:text-amber-400">
                <Zap className="w-3.5 h-3.5" />
                <span>+100 XP / NAT Overdrive</span>
              </div>
              <p className="text-[10px] text-slate-400">Critical hit bonus for correct rapid formula calculations.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                <Gamepad2 className="w-3.5 h-3.5" />
                <span>+30 XP / Arcade Sim</span>
              </div>
              <p className="text-[10px] text-slate-400">Rewarded for solving engineering simulators & mini-games.</p>
            </div>
          </div>

          {/* Logged-In Student Spotlight Rank Card (Break Zone) */}
          <div className="card-3d rounded-2xl bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 p-5 text-white shadow-md relative overflow-hidden border border-cyan-500/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 font-black text-lg shadow-inner">
                  #{myBreakRankObj.rank}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-extrabold text-white">{studentName}</h2>
                    <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 text-[10px] font-extrabold">
                      ARCADE RANK #{myBreakRankObj.rank}
                    </span>
                  </div>
                  <p className="text-xs text-cyan-200/80 mt-0.5">
                    {currentStudent?.college_name || 'COAET CCS HAU Hisar'} &bull; Break Zone Arcade
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0 font-mono text-center">
                <div>
                  <div className="text-xl font-black text-yellow-300">{userBreakXP} XP</div>
                  <div className="text-[10px] text-slate-400 font-sans">Total Break XP</div>
                </div>
                <div>
                  <div className="text-xl font-black text-cyan-400">Active</div>
                  <div className="text-[10px] text-slate-400 font-sans">Cyber Garage Status</div>
                </div>
              </div>
            </div>
          </div>

          {/* Break Zone Leaderboard Table */}
          <div className="card-3d rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-4 h-4 text-cyan-500" />
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Break Zone Arcade & Simulator Standings
                </h2>
              </div>
              <span className="text-[11px] font-mono text-slate-400">{breakRankings.length} Ranked Arcade Aspirants</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">
                    <th className="py-3 px-3">Rank</th>
                    <th className="py-3 px-3">Aspirant Name</th>
                    <th className="py-3 px-3">College / Institute</th>
                    <th className="py-3 px-3 text-right">Break XP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {breakRankings.map((r) => {
                    const isMe = r.isCurrentUser || r.full_name.toLowerCase() === studentName.toLowerCase();
                    
                    return (
                      <tr 
                        key={r.id || r.rank} 
                        className={`transition ${
                          isMe 
                            ? 'bg-cyan-50/80 dark:bg-cyan-950/50 font-bold border-l-4 border-l-cyan-500' 
                            : 'hover:bg-slate-50 dark:hover:bg-slate-950/60'
                        }`}
                      >
                        <td className="py-3 px-3 font-mono font-black text-xs whitespace-nowrap">
                          {r.rank === 1 || r.rank === '1' ? (
                            <span className="flex items-center gap-1 text-amber-500 font-black text-sm">
                              <Crown className="w-4 h-4 fill-amber-500" /> #1
                            </span>
                          ) : r.rank === 2 || r.rank === '2' ? (
                            <span className="flex items-center gap-1 text-slate-400 font-black text-sm">
                              <Medal className="w-4 h-4 fill-slate-400" /> #2
                            </span>
                          ) : r.rank === 3 || r.rank === '3' ? (
                            <span className="flex items-center gap-1 text-amber-700 font-black text-sm">
                              <Medal className="w-4 h-4 fill-amber-700" /> #3
                            </span>
                          ) : (
                            <span className="text-slate-500">#{r.rank}</span>
                          )}
                        </td>
                        
                        <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">
                          <div className="flex items-center gap-2">
                            <span>{r.full_name}</span>
                            {isMe && (
                              <span className="px-1.5 py-0.5 rounded bg-cyan-600 text-white text-[9px] font-extrabold uppercase">
                                YOU
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="py-3 px-3 text-slate-500 text-[11px] truncate max-w-[220px]">
                          <div className="flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5 text-slate-400" />
                            <span>{r.college_name}</span>
                          </div>
                        </td>

                        <td className="py-3 px-3 text-right font-mono font-black text-amber-600 dark:text-amber-400 text-xs">
                          {r.break_xp} XP
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
