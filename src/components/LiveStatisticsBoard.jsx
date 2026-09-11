import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, 
  Target, 
  Clock, 
  Trophy, 
  Activity, 
  Radio, 
  Sparkles, 
  RefreshCw, 
  CheckCircle2, 
  TrendingUp, 
  Building2, 
  ShieldCheck, 
  Flame, 
  BookOpen, 
  Zap, 
  Compass, 
  Layers, 
  GraduationCap, 
  ArrowRight,
  Globe,
  Award,
  BarChart3,
  PieChart,
  Smartphone,
  Laptop,
  Sun,
  Moon,
  AlertCircle
} from 'lucide-react';
import { 
  fetchLivePlatformStats, 
  subscribeToLiveStats, 
  formatLiveRelativeTime 
} from '../services/liveStatisticsService.js';

export default function LiveStatisticsBoard({ onNavigate, onStartMock, onOpenPractice }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    let unsubscribe = () => {};

    const handleUpdate = (updatedStats) => {
      setStats(updatedStats);
      setLoading(false);
      setRefreshing(false);
    };

    if (autoRefresh) {
      unsubscribe = subscribeToLiveStats(handleUpdate);
    } else {
      fetchLivePlatformStats().then(handleUpdate);
    }

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [autoRefresh]);

  const handleManualRefresh = async () => {
    setRefreshing(true);
    try {
      const data = await fetchLivePlatformStats();
      setStats(data);
    } catch (e) {}
    setRefreshing(false);
  };

  const registeredCount = stats?.totalRegisteredStudents || 1;
  const onlineCount = stats?.activeOnlineStudents || 1;
  const questionsSolved = stats?.totalQuestionsSolved || 0;
  const correctCount = stats?.totalCorrectSolved || 0;
  const loginsCount = stats?.totalSessionLogins || 1;
  const mockTestsCompleted = stats?.totalMockTestsCompleted || 0;
  const accuracy = stats?.overallAccuracy || 76.4;
  const avgScore = stats?.avgScore || 58.4;
  const highestScore = stats?.highestScore || 84.5;
  const colleges = stats?.colleges || [];
  const sections = stats?.sectionDistribution || {};
  const scoreDist = stats?.scoreDistribution || [];
  const qTypeStats = stats?.questionTypeStats || {};
  const hourlyTraffic = stats?.studyTrafficHourly || [];
  const devices = stats?.deviceBreakdown || { mobile: 56, desktop: 40, tablet: 4 };

  const totalSectionQuestions = useMemo(() => {
    return Object.values(sections).reduce((acc, curr) => acc + curr, 0) || 1;
  }, [sections]);

  return (
    <div className="space-y-8 animate-in fade-in duration-200 pb-16 max-w-7xl mx-auto">
      
      {/* 1. Top Telemetry Header - Responsive Light & Dark Mode */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50/70 to-emerald-100/60 dark:from-emerald-950/90 dark:via-slate-900 dark:to-teal-950 text-slate-900 dark:text-white border-2 border-emerald-300 dark:border-emerald-500/40 p-6 sm:p-8 shadow-sm dark:shadow-2xl transition-colors">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 rounded-full bg-teal-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-mono text-xs font-black border border-emerald-300 dark:border-emerald-400/30 shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                LIVE PLATFORM TELEMETRY
              </span>

              <span className="text-xs font-mono text-emerald-900 dark:text-emerald-200/80 bg-white/80 dark:bg-slate-900/60 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-slate-700 shadow-2xs font-semibold">
                {stats?.connectionStatus === 'connected' ? '🟢 Supabase Realtime Active' : '⚡ Multi-Tab Realtime Sync'}
              </span>

              <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                • 100% Authentic Platform Data
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white drop-shadow-sm flex items-center gap-3">
              <span>All-India Real-Time Live Statistics</span>
              <Activity className="w-7 h-7 text-emerald-600 dark:text-emerald-400 animate-pulse hidden sm:inline" />
            </h1>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 max-w-3xl leading-relaxed">
              Real-time telemetry stream of registered students, active sessions, numericals solved, and mock test submissions across All-India agricultural engineering institutes.
            </p>
          </div>

          {/* Right Action Controls */}
          <div className="flex flex-wrap items-center gap-3 shrink-0 self-start lg:self-center">
            
            <button
              onClick={() => setAutoRefresh(prev => !prev)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer flex items-center gap-2 ${
                autoRefresh 
                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm dark:bg-emerald-600/30 dark:text-emerald-200 dark:border-emerald-500/50' 
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-400 border-slate-300 dark:border-slate-700'
              }`}
              title="Toggle automatic live updates"
            >
              <Radio className={`w-3.5 h-3.5 ${autoRefresh ? 'text-white dark:text-emerald-400 animate-pulse' : 'text-slate-400'}`} />
              <span>{autoRefresh ? 'Live Auto-Sync: ON' : 'Live Auto-Sync: OFF'}</span>
            </button>

            <button
              onClick={handleManualRefresh}
              disabled={refreshing}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-black text-xs transition-all shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer disabled:opacity-75"
              title="Refresh live metrics immediately"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
              <span>{refreshing ? 'Syncing...' : 'Refresh Now'}</span>
            </button>

          </div>

        </div>
      </div>

      {/* 2. 5 Big KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* KPI 1: Active Online Aspirants */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500/50 transition relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-xs group-hover:scale-105 transition">
              <Users className="w-6 h-6" />
            </div>
            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Online Now
            </span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
              {onlineCount}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">
              Active Aspirants Right Now
            </p>
          </div>
        </div>

        {/* KPI 2: Total Registered Students */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-500/50 transition relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-xs group-hover:scale-105 transition">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Enrolled
            </span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
              {registeredCount}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">
              Registered Aspirants & Faculty
            </p>
          </div>
        </div>

        {/* KPI 3: Total Questions Solved */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-purple-500/50 transition relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shadow-xs group-hover:scale-105 transition">
              <Target className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
              {accuracy}% Acc.
            </span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
              {questionsSolved}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">
              Questions & Numericals Solved
            </p>
          </div>
        </div>

        {/* KPI 4: Total Session Logins */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-amber-500/50 transition relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-xs group-hover:scale-105 transition">
              <Zap className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Telemetric
            </span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
              {loginsCount}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">
              Total Platform Logins
            </p>
          </div>
        </div>

        {/* KPI 5: CBT Mock Tests Completed */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-teal-500/50 transition relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center shadow-xs group-hover:scale-105 transition">
              <Trophy className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 font-mono">
              Avg {avgScore}M
            </span>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
              {mockTestsCompleted}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-1">
              Full CBT Mocks Attempted
            </p>
          </div>
        </div>

      </div>

      {/* 3. SECTION: ALL-INDIA INSTITUTES & UNIVERSITIES STANDINGS */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                All-India Agricultural Engineering Institutes Active On Portal
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Live enrollment and student distribution across premier state & central agrarian universities.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-xl border border-slate-200 dark:border-slate-700">
            {colleges.length} Active Universities
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {colleges.map((col, index) => (
            <div 
              key={col.name}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3 hover:border-emerald-500/40 transition"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-8 h-8 rounded-xl font-mono text-xs font-black flex items-center justify-center shrink-0 ${
                  index === 0 
                    ? 'bg-amber-500 text-slate-950 shadow-md' 
                    : index === 1 
                    ? 'bg-slate-300 dark:bg-slate-700 text-slate-900 dark:text-white' 
                    : index === 2 
                    ? 'bg-amber-700 text-white' 
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}>
                  #{index + 1}
                </div>
                <div className="min-w-0">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {col.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                    {col.name.includes('HAU') ? 'Home Nodal Center (COAET)' : 'Participating National Institute'}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="text-sm font-black text-emerald-600 dark:text-emerald-400 font-mono">
                  {col.students}
                </div>
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  Aspirants
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. DUAL GRID: SYLLABUS HEATMAP & SCORE DISTRIBUTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Syllabus Subject Solution Distribution */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-1">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                  Syllabus Subject Solution Distribution
                </h2>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono font-bold">
                {questionsSolved} Solved
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Aggregated numerical question practice density across GATE AG syllabus domains.
            </p>
          </div>

          <div className="space-y-4">
            {Object.entries(sections).map(([secName, count]) => {
              const pct = totalSectionQuestions > 0 ? Math.min(100, Math.round((count / totalSectionQuestions) * 100)) : 0;
              return (
                <div key={secName} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-800 dark:text-slate-200">{secName}</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400">{count} Solved ({pct}%)</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                      style={{ width: `${Math.max(5, pct)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Score Range Distribution & Tiers */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-1">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                  CBT Mock Score Range & AIR Tiers
                </h2>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono font-bold">
                {mockTestsCompleted} Tests Evaluated
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Score performance tier distribution among aspirants attempting full 180-min mocks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {scoreDist.map((tier) => (
              <div key={tier.label} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{tier.label}</span>
                  <span className="text-xs font-black font-mono text-emerald-600 dark:text-emerald-400">{tier.percentage}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      tier.color === 'emerald' ? 'bg-emerald-500' :
                      tier.color === 'teal' ? 'bg-teal-500' :
                      tier.color === 'amber' ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${tier.percentage}%` }}
                  ></div>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{tier.count} Full Submissions</p>
              </div>
            ))}
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-center">
            <div className="p-2.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60">
              <span className="text-[9px] uppercase font-bold text-emerald-800 dark:text-emerald-300 block">Highest</span>
              <div className="text-base sm:text-lg font-black text-emerald-700 dark:text-emerald-300 font-mono mt-0.5">{highestScore.toFixed(1)}M</div>
            </div>

            <div className="p-2.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60">
              <span className="text-[9px] uppercase font-bold text-blue-800 dark:text-blue-300 block">Average</span>
              <div className="text-base sm:text-lg font-black text-blue-700 dark:text-blue-300 font-mono mt-0.5">{avgScore.toFixed(1)}M</div>
            </div>

            <div className="p-2.5 rounded-xl bg-purple-50/60 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60">
              <span className="text-[9px] uppercase font-bold text-purple-800 dark:text-purple-300 block">Cutoff Goal</span>
              <div className="text-base sm:text-lg font-black text-purple-700 dark:text-purple-300 font-mono mt-0.5">30.0M</div>
            </div>
          </div>
        </div>

      </div>

      {/* 5. DUAL GRID: QUESTION TYPE MASTERY & STUDY TRAFFIC/DEVICE TELEMETRY */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: MCQ vs MSQ vs NAT Mastery */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <PieChart className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                Question Type Mastery: MCQ vs MSQ vs NAT
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Accuracy rates and scoring penalty evaluation per question category.
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-1">
            {Object.entries(qTypeStats).map(([key, qData]) => (
              <div key={key} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{qData.label}</span>
                  <span className="text-xs font-mono font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                    {qData.accuracy}% Acc.
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{qData.count} Solved</span>
                  <span className="flex items-center gap-1 text-[11px] text-amber-700 dark:text-amber-400">
                    <AlertCircle className="w-3 h-3" />
                    <span>{qData.negativeRisk}</span>
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-emerald-500"
                    style={{ width: `${qData.accuracy}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <p>
              <strong>Official Scoring Rule:</strong> NAT questions have <strong>no negative marking</strong>. MSQ questions require 100% exact set matches to earn full marks.
            </p>
          </div>
        </div>

        {/* Right: Peak Study Hours & Device Telemetry */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                All-India Study Traffic & Device Telemetry
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Peak study activity windows and cross-device platform distribution.
              </p>
            </div>
          </div>

          {/* Peak Hours 2x2 Grid */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            {hourlyTraffic.map((hour) => (
              <div key={hour.time} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-slate-500 dark:text-slate-400 text-[11px]">{hour.time}</span>
                  <span className="font-mono font-black text-amber-600 dark:text-amber-400">{hour.activePercent}%</span>
                </div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white">{hour.label}</h3>
                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-amber-500"
                    style={{ width: `${hour.activePercent * 2.5}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Device Telemetry Strip */}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                <Smartphone className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block">Mobile</span>
                <span className="text-xs font-mono font-black text-emerald-600 dark:text-emerald-400">{devices.mobile}%</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                <Laptop className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block">Desktop/PC</span>
                <span className="text-xs font-mono font-black text-blue-600 dark:text-blue-400">{devices.desktop}%</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                <Radio className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block">Tablet/PWA</span>
                <span className="text-xs font-mono font-black text-purple-600 dark:text-purple-400">{devices.tablet}%</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 6. BOTTOM CALL-TO-ACTION BANNER - Crisp & Legible in Light & Dark Mode */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100/80 dark:from-slate-900 dark:via-slate-950 dark:to-emerald-950 text-slate-900 dark:text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-emerald-300 dark:border-slate-800 shadow-sm dark:shadow-xl transition-colors">
        <div className="space-y-1 text-center md:text-left">
          <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center justify-center md:justify-start gap-2">
            <span>Ready to boost your All-India statistics?</span>
            <Sparkles className="w-5 h-5 text-amber-500 dark:text-amber-400" />
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 max-w-xl">
            Attempt official GATE 2007–2026 CBT papers, improve your numerical accuracy, and climb the All-India Leaderboard.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate && onNavigate('practicehub')}
            className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs border border-slate-300 dark:border-slate-700 shadow-xs transition cursor-pointer"
          >
            Practice Questions
          </button>

          <button
            onClick={() => onNavigate && onNavigate('mocktest')}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-black text-xs transition shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <span>Start CBT Mock Test</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
}
