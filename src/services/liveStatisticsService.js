import { supabase, isSupabaseConfigured } from './supabaseClient.js';
import { getLocalAcademicXP } from './leaderboardService.js';
import { LOCAL_STORAGE_TEST_ATTEMPTS_KEY } from './testAttemptService.js';

const LOCAL_STORAGE_LIVE_ACTIVITY_KEY = 'gate_ag_live_activity_logs';
const LOCAL_STORAGE_SESSION_KEY = 'gate_ag_prep_session_token';
const LOCAL_STORAGE_USERS_KEY = 'gate_ag_prep_mock_users';
const LOCAL_STORAGE_TOTAL_LOGINS_KEY = 'gate_ag_total_session_logins_count';

// Cross-Tab Broadcast Channel
let localTelemetryBroadcast = null;
try {
  if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    localTelemetryBroadcast = new BroadcastChannel('gate_ag_live_telemetry_broadcast');
  }
} catch (e) {}

// Supabase Realtime Channels
let supabaseStatsChannel = null;
let supabasePresenceChannel = null;
let activePresenceUsers = new Map();

/**
 * Get active student details from session storage
 */
export function getActiveSessionStudent() {
  try {
    if (typeof localStorage === 'undefined') return null;
    const raw = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return parsed?.student || null;
    }
  } catch (e) {}
  return null;
}

/**
 * Get locally stored live activity feed (purely authentic recorded events)
 */
export function getLocalLiveActivityFeed() {
  try {
    if (typeof localStorage === 'undefined') return [];
    const raw = localStorage.getItem(LOCAL_STORAGE_LIVE_ACTIVITY_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {}
  return [];
}

/**
 * Record a new live activity event and broadcast it across devices & tabs
 */
export function recordLiveAction({
  type = 'question_solved',
  studentName = 'GATE AG Aspirant',
  collegeName = 'COAET CCS HAU Hisar',
  details = '',
  count = 1,
  score = null,
  section = 'General'
}) {
  const currentFeed = getLocalLiveActivityFeed();
  const newEvent = {
    id: 'act_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    type,
    studentName: studentName || 'GATE AG Aspirant',
    collegeName: collegeName || 'COAET CCS HAU Hisar',
    details: details || `Active session activity recorded in ${section}`,
    count: Number(count) || 1,
    score: score !== null ? Number(score) : null,
    section,
    timestamp: Date.now()
  };

  // Prepend and limit to latest 50 activities
  const updatedFeed = [newEvent, ...currentFeed.filter(e => e.id !== newEvent.id)].slice(0, 50);

  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_LIVE_ACTIVITY_KEY, JSON.stringify(updatedFeed));
      
      // Increment local session login count if login event
      if (type === 'session_login') {
        const currentLogins = Number(localStorage.getItem(LOCAL_STORAGE_TOTAL_LOGINS_KEY) || 1);
        localStorage.setItem(LOCAL_STORAGE_TOTAL_LOGINS_KEY, String(currentLogins + 1));
      }
    }
  } catch (e) {}

  // 1. Cross-Tab Local Broadcast
  if (localTelemetryBroadcast) {
    try {
      localTelemetryBroadcast.postMessage({
        type: 'LIVE_ACTIVITY_EVENT',
        event: newEvent
      });
    } catch (e) {}
  }

  // 2. Multi-device Supabase Realtime Broadcast
  if (isSupabaseConfigured && supabase) {
    try {
      const channel = supabase.channel('gate_ag_telemetry_live');
      channel.send({
        type: 'broadcast',
        event: 'live_action_event',
        payload: newEvent
      });
    } catch (e) {}
  }

  return newEvent;
}

let cachedPlatformStats = null;
let lastPlatformStatsFetchTime = 0;
const STATS_CACHE_TTL_MS = 60 * 1000; // 1 minute in-memory cache
const isTestEnv = typeof process !== 'undefined' && (process.env?.NODE_ENV === 'test' || process.env?.NODE_TEST_CONTEXT);

/**
 * Fetch true comprehensive platform statistics from Supabase and Local Storage
 */
export async function fetchLivePlatformStats(forceRefresh = false) {
  const now = Date.now();
  if (!isTestEnv && !forceRefresh && cachedPlatformStats && (now - lastPlatformStatsFetchTime < STATS_CACHE_TTL_MS)) {
    return cachedPlatformStats;
  }

  let dbStudentsCount = 0;
  let dbAttemptsCount = 0;
  let dbQuestionsSolved = 0;
  let dbCorrectCount = 0;
  let dbTotalScore = 0;
  let dbTotalLogins = 0;
  let dbAttemptsList = [];

  const collegeMap = {};
  const sectionMap = {
    'Farm Machinery & Power (FMPE)': 0,
    'Soil & Water Conservation (SWCE)': 0,
    'Processing & Food Engg (PFE)': 0,
    'Irrigation & Drainage (IDE)': 0,
    'Renewable Energy (REE)': 0,
    'Engineering Mathematics': 0,
    'General Aptitude': 0
  };

  let isOnlineBackend = false;

  // 1. Try querying real backend if Supabase is connected
  if (supabase) {
    try {
      // Query profiles/students count
      try {
        const { count, error: countErr } = await supabase
          .from('profiles')
          .select('id', { count: 'exact', head: true });
        
        if (!countErr && count !== null) {
          dbStudentsCount = count;
        }
      } catch (e) {}

      // Query test attempts
      const { data: attempts, error: attErr } = await supabase
        .from('test_attempts')
        .select('id, score, correct_count, incorrect_count, total_questions, paper_title, test_type, submitted_at')
        .order('submitted_at', { ascending: false })
        .limit(100);

      if (!attErr && Array.isArray(attempts)) {
        dbAttemptsList = attempts;
        dbAttemptsCount = attempts.length;
        attempts.forEach(a => {
          const correct = Number(a.correct_count || 0);
          const incorrect = Number(a.incorrect_count || 0);
          const solved = correct + incorrect;
          dbQuestionsSolved += solved;
          dbCorrectCount += correct;
          dbTotalScore += Number(a.score || 0);

          // Attribute to section if title mentions it
          const title = (a.paper_title || '').toLowerCase();
          if (title.includes('farm machinery') || title.includes('power') || title.includes('fmpe')) {
            sectionMap['Farm Machinery & Power (FMPE)'] += (solved || 1);
          } else if (title.includes('soil') || title.includes('water') || title.includes('swce')) {
            sectionMap['Soil & Water Conservation (SWCE)'] += (solved || 1);
          } else if (title.includes('food') || title.includes('process') || title.includes('pfe')) {
            sectionMap['Processing & Food Engg (PFE)'] += (solved || 1);
          } else if (title.includes('irrigation') || title.includes('drainage') || title.includes('ide')) {
            sectionMap['Irrigation & Drainage (IDE)'] += (solved || 1);
          } else if (title.includes('renewable') || title.includes('ree')) {
            sectionMap['Renewable Energy (REE)'] += (solved || 1);
          } else if (title.includes('math')) {
            sectionMap['Engineering Mathematics'] += (solved || 1);
          } else if (title.includes('aptitude')) {
            sectionMap['General Aptitude'] += (solved || 1);
          } else {
            // General CBT mock distribution
            sectionMap['Farm Machinery & Power (FMPE)'] += Math.round(solved * 0.35);
            sectionMap['Soil & Water Conservation (SWCE)'] += Math.round(solved * 0.30);
            sectionMap['Processing & Food Engg (PFE)'] += Math.round(solved * 0.20);
            sectionMap['General Aptitude'] += Math.round(solved * 0.15);
          }
        });
      }

      // Query device sessions / logins
      try {
        const { count, error: sessErr } = await supabase
          .from('device_sessions')
          .select('id', { count: 'exact', head: true });

        if (!sessErr && count !== null) {
          dbTotalLogins = count;
        }
      } catch (e) {}

      isOnlineBackend = true;
    } catch (err) {
      console.warn('Supabase live telemetry fetch warning:', err);
    }
  }

  // 2. Fetch local storage counts
  let localUsersCount = 0;
  let localAttemptsCount = 0;
  let localQuestionsSolved = 0;
  let localCorrectCount = 0;
  let localLoginsCount = 1;

  try {
    if (typeof localStorage !== 'undefined') {
      const rawUsers = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
      if (rawUsers) {
        const users = JSON.parse(rawUsers);
        if (Array.isArray(users)) {
          localUsersCount = users.length;
          users.forEach(u => {
            const col = u.college_name || 'COAET CCS HAU Hisar';
            collegeMap[col] = (collegeMap[col] || 0) + 1;
          });
        }
      }

      const rawAttempts = localStorage.getItem(LOCAL_STORAGE_TEST_ATTEMPTS_KEY);
      if (rawAttempts) {
        const attempts = JSON.parse(rawAttempts);
        if (Array.isArray(attempts)) {
          localAttemptsCount = attempts.length;
          attempts.forEach(a => {
            const correct = Number(a.correct_count || 0);
            const incorrect = Number(a.incorrect_count || 0);
            localQuestionsSolved += (correct + incorrect);
            localCorrectCount += correct;
          });
        }
      }

      const rawUserStats = localStorage.getItem('gate_ag_user_stats');
      if (rawUserStats) {
        const parsedStats = JSON.parse(rawUserStats);
        const attemptedLen = Array.isArray(parsedStats?.attempted) ? parsedStats.attempted.length : 0;
        const correctLen = Array.isArray(parsedStats?.correct) ? parsedStats.correct.length : 0;
        localQuestionsSolved = Math.max(localQuestionsSolved, attemptedLen);
        localCorrectCount = Math.max(localCorrectCount, correctLen);
      }

      const rawLogins = localStorage.getItem(LOCAL_STORAGE_TOTAL_LOGINS_KEY);
      if (rawLogins) {
        localLoginsCount = parseInt(rawLogins, 10) || 1;
      }
    }
  } catch (e) {}

  // 3. Compute Real Integrated Totals & Deduplicated Attempt Metrics
  const activeStudent = getActiveSessionStudent();
  const currentPresenceCount = activePresenceUsers.size > 0 ? activePresenceUsers.size : (activeStudent ? 1 : 0);

  const totalRegisteredStudents = dbStudentsCount > 0 
    ? dbStudentsCount 
    : (localUsersCount > 0 ? localUsersCount : (activeStudent ? 1 : 0));

  // Collect all real attempt scores across cloud and local storage without duplication
  const allAttemptScores = [];
  const seenAttemptIds = new Set();
  let countMcq = 0, correctMcq = 0;
  let countNat = 0, correctNat = 0;
  let countMsq = 0, correctMsq = 0;
  let hourBuckets = [0, 0, 0, 0]; // [06-10, 10-14, 14-18, 18-23/06]
  let totalHourEvents = 0;
  let mobileCount = 0, desktopCount = 0, tabletCount = 0;

  const rawLocal = typeof localStorage !== 'undefined' ? localStorage.getItem(LOCAL_STORAGE_TEST_ATTEMPTS_KEY) : null;
  const parsedLocalAttempts = rawLocal ? JSON.parse(rawLocal) : [];
  const allMergedAttempts = [
    ...(Array.isArray(dbAttemptsList) ? dbAttemptsList : []),
    ...(Array.isArray(parsedLocalAttempts) ? parsedLocalAttempts : [])
  ];

  let tierTopCount = 0;   // >= 70 Marks (AIR < 10 Tier)
  let tierCompCount = 0;  // 50 to 69.99 Marks (AIR < 50 Tier)
  let tierDevCount = 0;   // 30 to 49.99 Marks (Developing / Cutoff Tier)
  let tierRevCount = 0;   // < 30 Marks (Needs Revision Tier)

  allMergedAttempts.forEach(a => {
    const aid = a.client_attempt_id || a.id || (a.submitted_at ? `${a.submitted_at}_${a.paper_title}` : null);
    if (aid && seenAttemptIds.has(aid)) return;
    if (aid) seenAttemptIds.add(aid);

    const score = Number(a.score);
    if (!isNaN(score)) {
      allAttemptScores.push(score);
      if (score >= 70) {
        tierTopCount++;
      } else if (score >= 50) {
        tierCompCount++;
      } else if (score >= 30) {
        tierDevCount++;
      } else {
        tierRevCount++;
      }
    }

    // Process question type telemetry if present
    if (Array.isArray(a.question_responses)) {
      a.question_responses.forEach(qr => {
        const type = (qr.type || qr.qtype || '').toUpperCase();
        const isCorrect = Boolean(qr.is_correct ?? qr.ok ?? (qr.status === 'CORRECT'));
        if (type.includes('MCQ')) {
          countMcq++;
          if (isCorrect) correctMcq++;
        } else if (type.includes('NAT')) {
          countNat++;
          if (isCorrect) correctNat++;
        } else if (type.includes('MSQ')) {
          countMsq++;
          if (isCorrect) correctMsq++;
        }
      });
    }

    // Hour distribution from timestamp
    if (a.submitted_at) {
      try {
        const h = new Date(a.submitted_at).getHours();
        totalHourEvents++;
        if (h >= 6 && h < 10) hourBuckets[0]++;
        else if (h >= 10 && h < 14) hourBuckets[1]++;
        else if (h >= 14 && h < 18) hourBuckets[2]++;
        else hourBuckets[3]++;
      } catch (e) {}
    }
  });

  const totalMockTestsCompleted = allAttemptScores.length;
  const totalQuestionsSolved = Math.max(dbQuestionsSolved, localQuestionsSolved);
  const totalCorrectSolved = Math.max(dbCorrectCount, localCorrectCount);
  
  const totalSessionLogins = dbTotalLogins > 0 
    ? dbTotalLogins 
    : (localLoginsCount > 0 ? localLoginsCount : (activeStudent ? 1 : 0));

  const overallAccuracy = totalQuestionsSolved > 0 
    ? Number(((totalCorrectSolved / totalQuestionsSolved) * 100).toFixed(1))
    : 0;

  const avgScore = totalMockTestsCompleted > 0
    ? Number((allAttemptScores.reduce((sum, val) => sum + val, 0) / totalMockTestsCompleted).toFixed(2))
    : 0;

  const highestScore = allAttemptScores.length > 0 
    ? Math.max(...allAttemptScores) 
    : 0;

  // 100% Authentic Score distribution metrics (zero if no attempts)
  const scoreDistribution = [
    { 
      label: 'Top Tier (70–100 Marks)', 
      percentage: totalMockTestsCompleted > 0 ? Number(((tierTopCount / totalMockTestsCompleted) * 100).toFixed(1)) : 0, 
      count: tierTopCount, 
      color: 'emerald' 
    },
    { 
      label: 'Competitive Zone (50–70 Marks)', 
      percentage: totalMockTestsCompleted > 0 ? Number(((tierCompCount / totalMockTestsCompleted) * 100).toFixed(1)) : 0, 
      count: tierCompCount, 
      color: 'teal' 
    },
    { 
      label: 'Developing Zone (30–50 Marks)', 
      percentage: totalMockTestsCompleted > 0 ? Number(((tierDevCount / totalMockTestsCompleted) * 100).toFixed(1)) : 0, 
      count: tierDevCount, 
      color: 'amber' 
    },
    { 
      label: 'Needs Revision (< 30 Marks)', 
      percentage: totalMockTestsCompleted > 0 ? Number(((tierRevCount / totalMockTestsCompleted) * 100).toFixed(1)) : 0, 
      count: tierRevCount, 
      color: 'rose' 
    }
  ];

  // Question type analytics calculated from actual responses or 0
  const totalTypedQuestions = countMcq + countNat + countMsq;
  const questionTypeStats = {
    mcq: { 
      label: 'Multiple Choice (MCQ)', 
      count: countMcq, 
      accuracy: countMcq > 0 ? Number(((correctMcq / countMcq) * 100).toFixed(1)) : 0, 
      negativeRisk: 'High (-0.33 / -0.66)' 
    },
    nat: { 
      label: 'Numerical Answer (NAT)', 
      count: countNat, 
      accuracy: countNat > 0 ? Number(((correctNat / countNat) * 100).toFixed(1)) : 0, 
      negativeRisk: 'None (0 Marks)' 
    },
    msq: { 
      label: 'Multiple Select (MSQ)', 
      count: countMsq, 
      accuracy: countMsq > 0 ? Number(((correctMsq / countMsq) * 100).toFixed(1)) : 0, 
      negativeRisk: 'None (Exact match)' 
    }
  };

  // Hourly traffic analytics
  const studyTrafficHourly = [
    { 
      time: '06:00 - 10:00', 
      label: 'Morning Revision', 
      activePercent: totalHourEvents > 0 ? Math.round((hourBuckets[0] / totalHourEvents) * 100) : 0, 
      icon: 'Sun' 
    },
    { 
      time: '10:00 - 14:00', 
      label: 'Campus Practice', 
      activePercent: totalHourEvents > 0 ? Math.round((hourBuckets[1] / totalHourEvents) * 100) : 0, 
      icon: 'Building2' 
    },
    { 
      time: '14:00 - 18:00', 
      label: 'Afternoon Speed Tests', 
      activePercent: totalHourEvents > 0 ? Math.round((hourBuckets[2] / totalHourEvents) * 100) : 0, 
      icon: 'Zap' 
    },
    { 
      time: '18:00 - 23:00', 
      label: 'Prime Night Mock Tests', 
      activePercent: totalHourEvents > 0 ? Math.round((hourBuckets[3] / totalHourEvents) * 100) : 0, 
      icon: 'Moon' 
    }
  ];

  // Device telemetry based on active device
  const isMobileClient = typeof navigator !== 'undefined' && /Mobi|Android|iPhone/i.test(navigator.userAgent);
  const isTabletClient = typeof navigator !== 'undefined' && /iPad|Tablet/i.test(navigator.userAgent);
  const deviceBreakdown = {
    mobile: isMobileClient ? 100 : 0,
    desktop: (!isMobileClient && !isTabletClient) ? 100 : 0,
    tablet: isTabletClient ? 100 : 0
  };

  const sortedColleges = Object.keys(collegeMap).length > 0
    ? Object.entries(collegeMap).map(([name, count]) => ({ name, students: count })).sort((a, b) => b.students - a.students)
    : (activeStudent?.college_name ? [{ name: activeStudent.college_name, students: 1 }] : []);

  const liveFeed = getLocalLiveActivityFeed();

  cachedPlatformStats = {
    timestamp: Date.now(),
    connectionStatus: isOnlineBackend ? 'connected' : 'local_fallback',
    activeOnlineStudents: currentPresenceCount,
    totalRegisteredStudents,
    totalQuestionsSolved,
    totalCorrectSolved,
    totalSessionLogins,
    totalMockTestsCompleted,
    overallAccuracy,
    avgScore,
    highestScore,
    scoreDistribution,
    questionTypeStats,
    studyTrafficHourly,
    deviceBreakdown,
    colleges: sortedColleges,
    sectionDistribution: sectionMap,
    liveActivityFeed: liveFeed,
    activeStudent
  };
  lastPlatformStatsFetchTime = Date.now();

  return cachedPlatformStats;
}

/**
 * Subscribe to Real-Time Live Statistics Updates & Presence Channel
 */
export function subscribeToLiveStats(onStatsUpdate) {
  if (typeof window === 'undefined') return () => {};

  let pollInterval = null;

  const refreshAndNotify = async (force = false) => {
    try {
      const stats = await fetchLivePlatformStats(force);
      if (typeof onStatsUpdate === 'function') {
        onStatsUpdate(stats);
      }
    } catch (e) {}
  };

  // Initial immediate fetch
  refreshAndNotify(false);

  // 1. Cross-Tab BroadcastChannel Listener
  const handleLocalTelemetryMessage = (event) => {
    if (event.data?.type === 'LIVE_ACTIVITY_EVENT' || event.data?.type === 'LIVE_STATS_REFRESH') {
      refreshAndNotify(true);
    }
  };

  if (localTelemetryBroadcast) {
    localTelemetryBroadcast.addEventListener('message', handleLocalTelemetryMessage);
  }

  // 2. Supabase Realtime Channels (Presence & Postgres Changes)
  if (isSupabaseConfigured && supabase) {
    try {
      // Realtime Activity Broadcast Channel
      supabaseStatsChannel = supabase
        .channel('gate_ag_telemetry_live')
        .on('broadcast', { event: 'live_action_event' }, () => {
          refreshAndNotify(true);
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'test_attempts' }, () => {
          refreshAndNotify(true);
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'students' }, () => {
          refreshAndNotify(true);
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'device_sessions' }, () => {
          refreshAndNotify(true);
        })
        .subscribe();

      // Realtime Presence Channel (Online Aspirants Tracking)
      const currentStudent = getActiveSessionStudent();
      const currentPresenceKey = currentStudent?.id || ('anon_' + Math.random().toString(36).substring(2, 9));

      supabasePresenceChannel = supabase.channel('gate_ag_presence_live', {
        config: {
          presence: { key: currentPresenceKey }
        }
      });

      supabasePresenceChannel
        .on('presence', { event: 'sync' }, () => {
          const state = supabasePresenceChannel.presenceState();
          activePresenceUsers.clear();
          Object.keys(state).forEach(key => {
            activePresenceUsers.set(key, state[key]);
          });
          refreshAndNotify(false);
        })
        .on('presence', { event: 'join' }, ({ key, newPresences }) => {
          activePresenceUsers.set(key, newPresences);
          refreshAndNotify(false);
        })
        .on('presence', { event: 'leave' }, ({ key }) => {
          activePresenceUsers.delete(key);
          refreshAndNotify(false);
        })
        .subscribe(async (status) => {
          if (status === 'SUBSCRIBED') {
            await supabasePresenceChannel.track({
              user_id: currentPresenceKey,
              name: currentStudent?.full_name || 'GATE AG Aspirant',
              college: currentStudent?.college_name || 'COAET CCS HAU Hisar',
              role: currentStudent?.role || 'student',
              online_at: new Date().toISOString()
            });
          }
        });

    } catch (err) {
      console.warn('Supabase realtime telemetry channel warning:', err);
    }
  }

  // 3. Heartbeat Polling Interval (every 5 minutes / 300,000ms as relaxed fallback)
  pollInterval = setInterval(() => refreshAndNotify(true), 300000);

  return () => {
    if (pollInterval) clearInterval(pollInterval);
    if (localTelemetryBroadcast) {
      localTelemetryBroadcast.removeEventListener('message', handleLocalTelemetryMessage);
    }
    if (supabaseStatsChannel && supabase) {
      supabase.removeChannel(supabaseStatsChannel);
    }
    if (supabasePresenceChannel && supabase) {
      supabasePresenceChannel.untrack().then(() => {
        supabase.removeChannel(supabasePresenceChannel);
      }).catch(() => {});
    }
  };
}

/**
 * Format relative time (e.g. "Just now", "2m ago", "1h ago")
 */
export function formatLiveRelativeTime(timestamp) {
  if (!timestamp) return 'Just now';
  const diffMs = Date.now() - new Date(timestamp).getTime();
  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 45) return 'Just now';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}
