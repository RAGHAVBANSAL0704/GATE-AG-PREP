import { supabase, isSupabaseConfigured } from './supabaseClient';

const LOCAL_STORAGE_BREAK_XP_KEY = 'gate_ag_break_xp';
const LOCAL_STORAGE_USERS_KEY = 'gate_ag_prep_mock_users';
const LOCAL_STORAGE_LEADERBOARD_KEY = 'gate_ag_break_leaderboard';

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

// Helper: Get user's current Break XP
export function getLocalBreakXP() {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_BREAK_XP_KEY);
    return saved ? parseInt(saved, 10) : 0;
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
  } catch (e) {}

  // Sync with Supabase if configured
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
