import { supabase, isSupabaseConfigured } from './supabaseClient.js';

const LOCAL_STORAGE_USERS_KEY = 'gate_ag_prep_mock_users';
const LOCAL_STORAGE_SESSION_KEY = 'gate_ag_prep_session_token';
const LOCAL_STORAGE_USER_ROLES_KEY = 'gate_ag_user_roles_map';
const LOCAL_STORAGE_BANNED_USERS_KEY = 'gate_ag_banned_users_list';

export const USER_ROLES = [
  { id: 'student', label: 'Student', badge: '🎓 Student', color: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800' },
  { id: 'solver', label: 'Solver (Moderator)', badge: '⚡ Solver', color: 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800' },
  { id: 'mentor', label: 'Faculty Mentor', badge: '🏛️ Faculty Mentor', color: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800' },
  { id: 'faculty', label: 'Verified Faculty', badge: '🏛️ Faculty', color: 'bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800' },
  { id: 'admin', label: 'Admin / Lead', badge: '🛡️ Admin', color: 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800' }
];

export const CONTRIBUTOR_BADGES = [
  'None',
  'Verified Solver',
  'Academic Mentor',
  'Faculty Contributor',
  'AIR Top Ranker',
  'Core UI/UX Designer',
  'Lead Question Auditor',
  'Distinguished Educator'
];

/**
 * Check if the user has moderation privileges (Solver, Mentor, or Admin)
 */
export function canModerate(user) {
  if (!user) return false;
  const role = (user.role || (user.is_faculty ? 'faculty' : 'student')).toLowerCase();
  return role === 'solver' || role === 'mentor' || role === 'admin' || Boolean(user.is_solver) || Boolean(user.is_admin);
}

/**
 * Retrieve all registered users across LocalStorage & Supabase
 */
export async function getAllRegisteredUsers() {
  const usersMap = new Map();

  // 1. Load from localStorage mock users
  try {
    const rawLocal = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
    if (rawLocal) {
      const parsed = JSON.parse(rawLocal);
      if (Array.isArray(parsed)) {
        parsed.forEach(u => {
          if (u.id || u.email || u.username) {
            const key = u.id || u.email || u.username;
            usersMap.set(key, { ...u });
          }
        });
      }
    }
  } catch (e) {
    console.warn("Local users parse error:", e);
  }

  // 2. Load active session user if present
  try {
    const rawSession = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY);
    if (rawSession) {
      const session = JSON.parse(rawSession);
      const student = session?.student;
      if (student?.id) {
        usersMap.set(student.id, { ...student });
      }
    }
  } catch (e) {}

  // 3. Load from Supabase if configured
  if (isSupabaseConfigured && supabase) {
    try {
      const { data: dbUsers, error } = await supabase
        .from('students')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(150);

      if (!error && Array.isArray(dbUsers)) {
        dbUsers.forEach(u => {
          delete u.password_plain;
          const key = u.id;
          const existing = usersMap.get(key) || {};
          usersMap.set(key, { ...existing, ...u });
        });
      }
    } catch (e) {
      console.warn("Supabase fetch users error:", e);
    }
  }

  // 4. Merge manual custom role overrides
  const roleOverrides = getRoleOverridesMap();
  const bannedList = getBannedUsers();

  const userList = Array.from(usersMap.values()).map(u => {
    const identifier = u.id || u.username || u.email;
    const override = roleOverrides[identifier] || roleOverrides[u.email] || roleOverrides[u.username];
    
    let effectiveRole = override?.role || u.role || (u.is_faculty ? 'faculty' : (u.student_type === 'faculty' ? 'faculty' : 'student'));
    let effectiveBadge = override?.contributor_badge || u.contributor_badge || (effectiveRole === 'faculty' ? 'Faculty Contributor' : (effectiveRole === 'solver' ? 'Verified Solver' : null));
    let isBanned = bannedList.some(b => b.id === u.id || b.username === u.username || b.email === u.email);

    return {
      ...u,
      role: effectiveRole,
      is_solver: effectiveRole === 'solver' || Boolean(u.is_solver),
      is_faculty: effectiveRole === 'faculty' || effectiveRole === 'mentor' || Boolean(u.is_faculty),
      is_mentor: effectiveRole === 'mentor' || Boolean(u.is_mentor),
      contributor_badge: effectiveBadge,
      is_banned: isBanned
    };
  });

  return userList;
}

/**
 * Get map of role overrides
 */
export function getRoleOverridesMap() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_USER_ROLES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

/**
 * Update a user's role and contributor badge
 */
export async function updateUserRole(userId, newRole, contributorBadge = null) {
  if (!userId) return { success: false, message: 'User ID is required' };

  const roleOverrides = getRoleOverridesMap();
  roleOverrides[userId] = {
    role: newRole,
    contributor_badge: contributorBadge,
    updated_at: new Date().toISOString()
  };
  localStorage.setItem(LOCAL_STORAGE_USER_ROLES_KEY, JSON.stringify(roleOverrides));

  // Also update local mock users array
  try {
    const rawLocal = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
    if (rawLocal) {
      const parsed = JSON.parse(rawLocal);
      const idx = parsed.findIndex(u => u.id === userId || u.email === userId || u.username === userId);
      if (idx !== -1) {
        parsed[idx].role = newRole;
        parsed[idx].is_solver = newRole === 'solver';
        parsed[idx].is_mentor = newRole === 'mentor';
        parsed[idx].is_faculty = newRole === 'faculty' || newRole === 'mentor';
        parsed[idx].contributor_badge = contributorBadge;
        localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(parsed));
      }
    }
  } catch (e) {}

  // Also update active session if this is the currently logged in user
  try {
    const rawSession = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY);
    if (rawSession) {
      const session = JSON.parse(rawSession);
      if (session?.student?.id === userId || session?.student?.email === userId || session?.student?.username === userId) {
        session.student.role = newRole;
        session.student.is_solver = newRole === 'solver';
        session.student.is_mentor = newRole === 'mentor';
        session.student.is_faculty = newRole === 'faculty' || newRole === 'mentor';
        session.student.contributor_badge = contributorBadge;
        localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(session));
      }
    }
  } catch (e) {}

  // Update in Supabase if configured
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase
        .from('students')
        .update({ 
          role: newRole,
          contributor_badge: contributorBadge
        })
        .eq('id', userId);
    } catch (e) {
      console.warn("Supabase role update sync note:", e.message);
    }
  }

  return { success: true, role: newRole, contributor_badge: contributorBadge };
}

/**
 * Get banned users list
 */
export function getBannedUsers() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_BANNED_USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

/**
 * Ban a user from chat and community discussions
 */
export function banUser(user, reason = 'Inappropriate conduct / Abusive content') {
  if (!user) return { success: false };
  const banned = getBannedUsers();
  
  const identifier = typeof user === 'string' ? user : (user.id || user.username || user.email);
  const userName = typeof user === 'string' ? user : (user.full_name || user.username || identifier);

  if (!banned.some(b => b.identifier === identifier || b.id === user.id || b.username === user.username)) {
    banned.push({
      identifier,
      id: user.id || null,
      username: user.username || null,
      email: user.email || null,
      name: userName,
      reason,
      banned_at: new Date().toISOString()
    });
    localStorage.setItem(LOCAL_STORAGE_BANNED_USERS_KEY, JSON.stringify(banned));
  }
  return { success: true };
}

/**
 * Unban a user
 */
export function unbanUser(identifierOrId) {
  let banned = getBannedUsers();
  banned = banned.filter(b => 
    b.identifier !== identifierOrId && 
    b.id !== identifierOrId && 
    b.username !== identifierOrId && 
    b.email !== identifierOrId &&
    b.name !== identifierOrId
  );
  localStorage.setItem(LOCAL_STORAGE_BANNED_USERS_KEY, JSON.stringify(banned));
  return { success: true };
}

/**
 * Check if a student is banned
 */
export function isUserBanned(student) {
  if (!student) return false;
  const banned = getBannedUsers();
  return banned.some(b => 
    (student.id && b.id === student.id) ||
    (student.username && b.username && b.username.toLowerCase() === student.username.toLowerCase()) ||
    (student.email && b.email && b.email.toLowerCase() === student.email.toLowerCase()) ||
    (student.full_name && b.name && b.name.toLowerCase() === student.full_name.toLowerCase())
  );
}
