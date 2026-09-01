import { supabase, isSupabaseConfigured } from './supabaseClient.js';

const LOCAL_STORAGE_BREAK_XP_KEY = 'gate_ag_break_xp';
const LOCAL_STORAGE_USERS_KEY = 'gate_ag_prep_mock_users';
const LOCAL_STORAGE_LEADERBOARD_KEY = 'gate_ag_break_leaderboard';

// Local Cross-Tab Broadcast Channel
let localBreakXPBroadcast = null;
try {
  if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    localBreakXPBroadcast = new BroadcastChannel('gate_ag_break_xp_channel');
  }
} catch (e) {}

// Supabase Realtime Channel
let supabaseBreakXPChannel = null;

// Helper: Get active student info from session
export function getActiveStudentSession() {
  try {
    const raw = localStorage.getItem('gate_ag_prep_session_token');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.student) return parsed.student;
    }
  } catch (e) {}
  return {
    id: 'usr_guest',
    full_name: 'GATE AG Aspirant',
    college_name: 'COAET CCS HAU Hisar'
  };
}

// Helper: Get user's current Break XP (cumulative, never resets)
export function getLocalBreakXP() {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_BREAK_XP_KEY);
    const sessionStudent = getActiveStudentSession();
    const sessionXP = Number(sessionStudent?.break_xp || 0);
    const localVal = saved ? parseInt(saved, 10) : 0;
    const bestXP = Math.max(localVal, sessionXP);
    return isNaN(bestXP) ? 0 : bestXP;
  } catch (e) {
    return 0;
  }
}

// Add XP with even weightage (+10 XP per objective/point)
export function addBreakXP(amount = 10) {
  const currentXP = getLocalBreakXP();
  const newXP = currentXP + amount;
  try {
    localStorage.setItem(LOCAL_STORAGE_BREAK_XP_KEY, newXP.toString());
    const rawSession = localStorage.getItem('gate_ag_prep_session_token');
    if (rawSession) {
      const session = JSON.parse(rawSession);
      if (session?.student) {
        session.student.break_xp = newXP;
        localStorage.setItem('gate_ag_prep_session_token', JSON.stringify(session));
      }
    }
  } catch (e) {}

  // Cross-Tab BroadcastChannel dispatch
  if (localBreakXPBroadcast) {
    try {
      localBreakXPBroadcast.postMessage({
        type: 'BREAK_XP_AWARDED',
        newXP,
        amount,
        timestamp: Date.now()
      });
    } catch (e) {}
  }

  // Sync with Supabase & Live Multi-Device Broadcast
  syncUserXPToBackend(newXP);

  return newXP;
}

// Sync user XP to Supabase / Local Storage Leaderboard
async function syncUserXPToBackend(newXP) {
  const student = getActiveStudentSession();

  if (isSupabaseConfigured && supabase && student?.id) {
    try {
      await supabase
        .from('students')
        .update({ break_xp: newXP })
        .eq('id', student.id);

      // Broadcast over Supabase Realtime channel across devices
      const channel = supabase.channel('gate_ag_break_xp_live');
      channel.send({
        type: 'broadcast',
        event: 'break_xp_updated',
        payload: { studentId: student.id, break_xp: newXP }
      });
    } catch (e) {}
  }

  // Update local registered user dataset
  try {
    const savedUsersRaw = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
    if (savedUsersRaw) {
      const users = JSON.parse(savedUsersRaw);
      const userIdx = users.findIndex(u => u.id === student.id || u.email === student.email || u.admission_no === student.admission_no);
      if (userIdx !== -1) {
        users[userIdx].break_xp = newXP;
        localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(users));
      }
    }
  } catch (e) {}
}

/**
 * Subscribe to live Break Zone XP updates across tabs and devices
 */
export function subscribeToLiveBreakXP(onXPUpdate) {
  if (typeof window === 'undefined') return () => {};

  // 1. Cross-Tab Listener
  const handleLocalMessage = (event) => {
    if (event.data?.type === 'BREAK_XP_AWARDED' && typeof onXPUpdate === 'function') {
      onXPUpdate(event.data);
    }
  };

  if (localBreakXPBroadcast) {
    localBreakXPBroadcast.addEventListener('message', handleLocalMessage);
  }

  // 2. Supabase Realtime Multi-Device Listener
  if (isSupabaseConfigured && supabase) {
    try {
      supabaseBreakXPChannel = supabase
        .channel('gate_ag_break_xp_live')
        .on('broadcast', { event: 'break_xp_updated' }, (payload) => {
          if (payload.payload && typeof onXPUpdate === 'function') {
            onXPUpdate(payload.payload);
          }
        })
        .subscribe();
    } catch (e) {}
  }

  return () => {
    if (localBreakXPBroadcast) {
      localBreakXPBroadcast.removeEventListener('message', handleLocalMessage);
    }
    if (supabaseBreakXPChannel && supabase) {
      supabase.removeChannel(supabaseBreakXPChannel);
    }
  };
}

// Get full leaderboard data (REAL USERS ONLY - NO FAKE ENTRIES)
export function getLeaderboardData() {
  const student = getActiveStudentSession();
  const currentXP = getLocalBreakXP();

  let realUsersList = [];

  // 1. Load real registered users from local storage if available
  try {
    const savedUsersRaw = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
    if (savedUsersRaw) {
      const users = JSON.parse(savedUsersRaw);
      if (Array.isArray(users)) {
        users.forEach(u => {
          realUsersList.push({
            id: u.id || u.email || u.admission_no,
            full_name: u.full_name || 'Registered Aspirant',
            college_name: u.college_name || 'Agricultural Engineering College',
            break_xp: u.break_xp || 0,
            isCurrentUser: u.id === student.id || u.email === student.email
          });
        });
      }
    }
  } catch (e) {}

  // 2. Ensure current logged-in user exists in leaderboard
  const userEntryIdx = realUsersList.findIndex(item => item.id === student.id || item.isCurrentUser);
  if (userEntryIdx !== -1) {
    realUsersList[userEntryIdx].break_xp = Math.max(realUsersList[userEntryIdx].break_xp || 0, currentXP);
    realUsersList[userEntryIdx].full_name = student.full_name || 'GATE AG Aspirant';
    realUsersList[userEntryIdx].college_name = student.college_name || 'COAET CCS HAU Hisar';
    realUsersList[userEntryIdx].isCurrentUser = true;
  } else {
    realUsersList.push({
      id: student.id || 'usr_current',
      full_name: student.full_name || 'GATE AG Aspirant',
      college_name: student.college_name || 'COAET CCS HAU Hisar',
      break_xp: currentXP,
      isCurrentUser: true
    });
  }

  // Sort descending by XP
  realUsersList.sort((a, b) => b.break_xp - a.break_xp);
  return realUsersList.map((item, idx) => ({ ...item, rank: idx + 1 }));
}
