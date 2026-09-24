import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Users, 
  Target, 
  Clock, 
  Trophy, 
  Radio, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Database, 
  Server, 
  Smartphone, 
  Laptop, 
  HardDrive, 
  Search, 
  ExternalLink,
  ChevronRight,
  Flame,
  Award,
  Globe,
  Sparkles,
  Zap,
  Check,
  Building2,
  GraduationCap
} from 'lucide-react';
import { 
  fetchLivePlatformStats, 
  subscribeToLiveStats, 
  formatLiveRelativeTime 
} from '../services/liveStatisticsService.js';
import { supabase, isSupabaseConfigured } from '../services/supabaseClient.js';
import { getAllQuestionReports } from '../services/questionReportService.js';
import { LOCAL_STORAGE_TEST_ATTEMPTS_KEY } from '../services/testAttemptService.js';

export default function CreatorWebMonitor({ onOpenQuestionStudio, onOpenRoles }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  
  // Database ping & health state
  const [dbLatency, setDbLatency] = useState(null);
  const [dbStatus, setDbStatus] = useState('checking'); // 'live' | 'offline' | 'checking'
  
  // Storage & PWA Diagnostics
  const [storageUsageMB, setStorageUsageMB] = useState(null);
  const [pendingSyncCount, setPendingSyncCount] = useState(0);
  const [pendingReportsCount, setPendingReportsCount] = useState(0);

  // Student Account Lookup State
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchingStudent, setIsSearchingStudent] = useState(false);
  const [searchedStudent, setSearchedStudent] = useState(null);
  const [searchError, setSearchError] = useState('');

  // Check Database Latency & System Diagnostics
  const checkSystemHealth = async () => {
    // 1. Supabase Ping
    if (isSupabaseConfigured && supabase) {
      try {
        const start = performance.now();
        const { error } = await supabase.from('students').select('id').limit(1);
        const latency = Math.round(performance.now() - start);
        if (!error) {
          setDbLatency(latency);
          setDbStatus('live');
        } else {
          setDbStatus('degraded');
        }
      } catch (e) {
        setDbStatus('offline');
      }
    } else {
      setDbStatus('offline');
    }

    // 2. Storage estimate
    try {
      if (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.estimate) {
        const estimate = await navigator.storage.estimate();
        if (estimate.usage) {
          setStorageUsageMB((estimate.usage / (1024 * 1024)).toFixed(1));
        }
      }
    } catch (e) {}

    // 3. Offline Test Attempt Sync Queue
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_TEST_ATTEMPTS_KEY);
      if (raw) {
        const attempts = JSON.parse(raw);
        if (Array.isArray(attempts)) {
          setPendingSyncCount(attempts.filter(a => !a._syncedToBackend).length);
        }
      }
    } catch (e) {}

    // 4. Pending Question Reports
    try {
      const reports = await getAllQuestionReports();
      if (Array.isArray(reports)) {
        setPendingReportsCount(reports.filter(r => r.status === 'pending').length);
      }
    } catch (e) {}
  };

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

    checkSystemHealth();

    const healthInterval = setInterval(checkSystemHealth, 30000); // 30s heartbeat ping

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
      clearInterval(healthInterval);
    };
  }, [autoRefresh]);

  const handleManualRefresh = async () => {
    setRefreshing(true);
    try {
      const data = await fetchLivePlatformStats(true);
      setStats(data);
      await checkSystemHealth();
    } catch (e) {}
    setRefreshing(false);
  };

  // Instant Student Account Lookup
  const handleStudentSearch = async (e) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearchingStudent(true);
    setSearchError('');
    setSearchedStudent(null);

    const q = searchQuery.trim();

    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from('students')
          .select('id, full_name, username, admission_no, email, college_name, role, xp_points, break_xp, created_at, last_update_timestamp')
          .or(`admission_no.ilike.%${q}%,email.ilike.%${q}%,username.ilike.%${q}%,full_name.ilike.%${q}%`)
          .limit(1)
          .maybeSingle();

        if (!error && data) {
          setSearchedStudent(data);
          setIsSearchingStudent(false);
          return;
        }
      }

      // Local storage fallback
      const rawUsers = localStorage.getItem('gate_ag_prep_mock_users');
      if (rawUsers) {
        const users = JSON.parse(rawUsers);
        const match = users.find(u => 
          (u.admission_no && u.admission_no.toLowerCase().includes(q.toLowerCase())) ||
          (u.email && u.email.toLowerCase().includes(q.toLowerCase())) ||
          (u.full_name && u.full_name.toLowerCase().includes(q.toLowerCase())) ||
          (u.username && u.username.toLowerCase().includes(q.toLowerCase()))
        );
        if (match) {
          setSearchedStudent(match);
          setIsSearchingStudent(false);
          return;
        }
      }

      setSearchError(`No aspirant found matching "${q}". Verify admission number or email.`);
    } catch (err) {
      setSearchError('Search failed. Check network connection.');
    } finally {
      setIsSearchingStudent(false);
    }
  };

  const registeredCount = stats?.totalRegisteredStudents ?? 0;
  const onlineCount = stats?.activeOnlineStudents ?? 0;
  const onlineAspirants = stats?.onlineAspirants || [];
  const liveActivityFeed = stats?.liveActivityFeed || [];
  const questionsSolved = stats?.totalQuestionsSolved ?? 0;
  const correctCount = stats?.totalCorrectSolved ?? 0;
  const mockTestsCompleted = stats?.totalMockTestsCompleted ?? 0;
  const accuracyPct = questionsSolved > 0 ? ((correctCount / questionsSolved) * 100).toFixed(1) : '0.0';

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* 1. Header & Live System Status Ribbon */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 shadow-xs">
                <Activity className="w-6 h-6 animate-pulse" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  Live Web Command Center
                </h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  <Radio className="w-3 h-3 text-emerald-500 animate-pulse" />
                  Live Telemetry
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Real-time monitoring of active students, database latency, PWA cache, and question reports.
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 self-start lg:self-auto">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border ${
                autoRefresh 
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
              }`}
              title="Toggle Live WebSocket Stream"
            >
              <Zap className={`w-3.5 h-3.5 ${autoRefresh ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
              <span>{autoRefresh ? 'Auto-Live ON' : 'Paused'}</span>
            </button>

            <button
              onClick={handleManualRefresh}
              disabled={refreshing}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition flex items-center gap-1.5 cursor-pointer shadow-2xs disabled:opacity-50"
              title="Force Refresh Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-emerald-500' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>

        </div>

        {/* System Health Diagnostics Bar */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          
          {/* Database Ping */}
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-center gap-2.5">
            <Server className={`w-4 h-4 ${dbStatus === 'live' ? 'text-emerald-500' : 'text-amber-500'}`} />
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Database (Supabase)</div>
              <div className="font-extrabold text-slate-800 dark:text-slate-200">
                {dbStatus === 'live' ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono">{dbLatency}ms • Live</span>
                ) : dbStatus === 'checking' ? (
                  <span className="text-slate-400">Pinging...</span>
                ) : (
                  <span className="text-amber-600 dark:text-amber-400">Offline Fallback</span>
                )}
              </div>
            </div>
          </div>

          {/* Service Worker Version */}
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-blue-500" />
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">PWA Cache Version</div>
              <div className="font-extrabold text-slate-800 dark:text-slate-200 font-mono">
                v1.0.29 (Active)
              </div>
            </div>
          </div>

          {/* Local Storage Quota */}
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-center gap-2.5">
            <HardDrive className="w-4 h-4 text-purple-500" />
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Device Cache Used</div>
              <div className="font-extrabold text-slate-800 dark:text-slate-200 font-mono">
                {storageUsageMB ? `${storageUsageMB} MB` : '1.2 MB'}
              </div>
            </div>
          </div>

          {/* Pending Sync Queue */}
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-center gap-2.5">
            <Clock className={`w-4 h-4 ${pendingSyncCount === 0 ? 'text-emerald-500' : 'text-amber-500'}`} />
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Sync Queue Status</div>
              <div className="font-extrabold text-slate-800 dark:text-slate-200">
                {pendingSyncCount === 0 ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">100% Synced</span>
                ) : (
                  <span className="text-amber-600 dark:text-amber-400 font-bold">{pendingSyncCount} in queue</span>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Top Metric Pulse Cards (4 Core Numbers) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Registered Students */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Registered Aspirants
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              {loading ? '...' : registeredCount.toLocaleString()}
            </div>
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mt-0.5 inline-block">
              Across CCS HAU &amp; Pan-India
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Live Online Right Now */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Active Online Now
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-2">
              <span>{loading ? '...' : onlineCount}</span>
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
            </div>
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-0.5 inline-block">
              Live WebSocket sessions
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Radio className="w-6 h-6 animate-pulse" />
          </div>
        </div>

        {/* Card 3: Questions Solved Platform-wide */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Practice Questions Solved
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              {loading ? '...' : questionsSolved.toLocaleString()}
            </div>
            <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 mt-0.5 inline-block">
              {accuracyPct}% Accuracy Rate
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Target className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4: CBT Mocks Completed */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              180-min CBT Mocks Taken
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              {loading ? '...' : mockTestsCompleted.toLocaleString()}
            </div>
            <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 mt-0.5 inline-block">
              100-Mark Full Papers
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Trophy className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* 3. Action Quick-Jump Strip: Question Reports & Role Studio */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Quick-Jump Card 1: Question Issue Reports */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">
                  Student Question Reports
                </h3>
                {pendingReportsCount > 0 ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white animate-pulse">
                    {pendingReportsCount} Pending
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                    Clean (0 Pending)
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Students report typos, formula ambiguities, and answer key discrepancies.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenQuestionStudio}
            className="px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition shadow-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <span>Open Studio</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick-Jump Card 2: Roles & Contributor Elevation */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">
                Roles &amp; Contributor Manager
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Promote top aspirants to Solvers &amp; Faculty Mentors, manage badges.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenRoles}
            className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <span>Manage Roles</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* 4. Student Account Instant Lookup & Audit Tool */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base">
              Instant Student Account Inspector
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
            HAU Adm No • Email • Username
          </span>
        </div>

        <form onSubmit={handleStudentSearch} className="flex gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by HAU Admission No (e.g., 2022AE01BIV), Name, or Email..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500 font-medium"
          />
          <button
            type="submit"
            disabled={isSearchingStudent || !searchQuery.trim()}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSearchingStudent ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Search className="w-3.5 h-3.5" />
            )}
            <span>Inspect</span>
          </button>
        </form>

        {searchError && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300 font-semibold">
            {searchError}
          </div>
        )}

        {searchedStudent && (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 space-y-3 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center text-sm shadow-xs">
                  {(searchedStudent.full_name || searchedStudent.username || 'A').slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">
                    {searchedStudent.full_name || searchedStudent.username}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {searchedStudent.admission_no || 'Non-HAU External'} • {searchedStudent.email || 'No email provided'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 capitalize">
                  {searchedStudent.role || 'Student'}
                </span>
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-mono">
                  {searchedStudent.xp_points || 0} XP
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div>
                <span className="text-slate-500 dark:text-slate-400">College / Institute:</span>
                <div className="font-bold text-slate-800 dark:text-slate-200 truncate">
                  {searchedStudent.college_name || 'COAET CCS HAU Hisar'}
                </div>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">Break Zone XP:</span>
                <div className="font-bold text-slate-800 dark:text-slate-200 font-mono">
                  {searchedStudent.break_xp || 0} XP
                </div>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">Member Since:</span>
                <div className="font-bold text-slate-800 dark:text-slate-200">
                  {searchedStudent.created_at ? new Date(searchedStudent.created_at).toLocaleDateString() : 'Active Aspirant'}
                </div>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">Account ID:</span>
                <div className="font-mono text-slate-800 dark:text-slate-200 truncate text-[11px]">
                  {searchedStudent.id || 'Local'}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* 5. Live Activity Ticker & Online Aspirants Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Panel A: Live Activity Stream */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-rose-500 animate-pulse" />
                <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">
                  Live Activity Stream (Real-Time)
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                Last {liveActivityFeed.length} Events
              </span>
            </div>

            <div className="space-y-2.5 mt-3 max-h-[320px] overflow-y-auto pr-1">
              {liveActivityFeed.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Awaiting real-time practice and mock telemetry...
                </div>
              ) : (
                liveActivityFeed.map((event, idx) => (
                  <div 
                    key={event.id || idx}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="space-y-0.5">
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span>{event.studentName || 'GATE Aspirant'}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-normal">
                          {event.collegeName || 'CCS HAU'}
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300">
                        {event.details || 'Solved agricultural engineering question'}
                      </p>
                    </div>

                    <span className="text-[10px] font-mono text-slate-400 shrink-0">
                      {formatLiveRelativeTime(event.timestamp)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>Powered by Supabase Realtime Channels</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">Live Active</span>
          </div>
        </div>

        {/* Panel B: Active Online Aspirants Roster */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">
                  Active Online Aspirants ({onlineAspirants.length})
                </h3>
              </div>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                Connected Devices
              </span>
            </div>

            <div className="space-y-2.5 mt-3 max-h-[320px] overflow-y-auto pr-1">
              {onlineAspirants.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Connecting to global presence channel...
                </div>
              ) : (
                onlineAspirants.map((user, idx) => (
                  <div 
                    key={user.key || idx}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-extrabold flex items-center justify-center text-xs shrink-0">
                        {(user.name || 'A').slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">
                          {user.name || 'GATE Aspirant'}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">
                          {user.college || 'COAET CCS HAU Hisar'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-400">
                      {user.device === 'mobile' ? (
                        <Smartphone className="w-3.5 h-3.5" title="Mobile Device" />
                      ) : (
                        <Laptop className="w-3.5 h-3.5" title="Desktop Device" />
                      )}
                      <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                        Online
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>Presence Heartbeat: 20s Window</span>
            <span className="font-mono text-slate-400">{onlineCount} Total Connected</span>
          </div>
        </div>

      </div>

    </div>
  );
}
