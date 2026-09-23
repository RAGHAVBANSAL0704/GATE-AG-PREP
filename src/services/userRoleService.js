import { supabase, isSupabaseConfigured } from './supabaseClient.js';
import { hashPassword, sanitizeMobileNumber } from './authService.js';

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

// Local Cross-Tab Broadcast Channel
let localRolesBroadcast = null;
try {
  if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    localRolesBroadcast = new BroadcastChannel('gate_ag_roles_channel');
  }
} catch (e) {}

// Supabase Realtime Channel
let supabaseRolesChannel = null;

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

  // Update in Supabase if configured & broadcast live
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase
        .from('students')
        .update({ 
          role: newRole,
          contributor_badge: contributorBadge
        })
        .eq('id', userId);

      // Broadcast over Supabase Realtime channel
      const channel = supabase.channel('gate_ag_roles_live');
      channel.send({
        type: 'broadcast',
        event: 'role_updated',
        payload: { userId, role: newRole, contributor_badge: contributorBadge }
      });
    } catch (e) {
      console.warn("Supabase role update sync note:", e.message);
    }
  }

  // Cross-Tab BroadcastChannel dispatch
  if (localRolesBroadcast) {
    try {
      localRolesBroadcast.postMessage({
        type: 'ROLE_UPDATED',
        userId,
        role: newRole,
        contributor_badge: contributorBadge,
        timestamp: Date.now()
      });
    } catch (e) {}
  }

  return { success: true, role: newRole, contributor_badge: contributorBadge };
}

/**
 * Update full user information directly from Admin Panel with instant live sync
 */
export async function adminUpdateUserInfo(targetUserId, updatedFields, adminActor = { name: 'Admin', role: 'admin' }) {
  if (!targetUserId) return { success: false, message: 'Target User ID is required' };
  if (!updatedFields || typeof updatedFields !== 'object') {
    return { success: false, message: 'Updated fields object is required' };
  }

  const cleanFullName = updatedFields.full_name?.trim();
  const cleanEmail = updatedFields.email?.trim()?.toLowerCase();
  const cleanMobile = updatedFields.mobile_number ? String(updatedFields.mobile_number).replace(/\D/g, '') : undefined;
  const cleanCollege = updatedFields.college_name?.trim();
  const cleanDepartment = updatedFields.department?.trim();
  const cleanTargetYear = updatedFields.gate_target_year?.trim();
  const cleanRole = updatedFields.role ? updatedFields.role.toLowerCase() : undefined;
  const cleanBadge = updatedFields.contributor_badge !== undefined ? (updatedFields.contributor_badge === 'None' ? null : updatedFields.contributor_badge) : undefined;
  const cleanXP = updatedFields.xp_points !== undefined ? Math.max(0, Number(updatedFields.xp_points) || 0) : undefined;
  const cleanBreakXP = updatedFields.break_xp !== undefined ? Math.max(0, Number(updatedFields.break_xp) || 0) : undefined;
  const isFac = cleanRole === 'faculty' || cleanRole === 'mentor' || Boolean(updatedFields.is_faculty);

  // 1. Role Overrides Map Update (if role or badge provided)
  if (cleanRole !== undefined || cleanBadge !== undefined) {
    const roleOverrides = getRoleOverridesMap();
    const currentOverride = roleOverrides[targetUserId] || {};
    roleOverrides[targetUserId] = {
      ...currentOverride,
      role: cleanRole !== undefined ? cleanRole : currentOverride.role,
      contributor_badge: cleanBadge !== undefined ? cleanBadge : currentOverride.contributor_badge,
      updated_at: new Date().toISOString()
    };
    localStorage.setItem(LOCAL_STORAGE_USER_ROLES_KEY, JSON.stringify(roleOverrides));
  }

  // 2. Ban / Unban Sync if provided
  if (updatedFields.is_banned !== undefined) {
    if (updatedFields.is_banned) {
      banUser({ id: targetUserId, email: cleanEmail, full_name: cleanFullName }, updatedFields.ban_reason || 'Administrative restriction by Admin');
    } else {
      unbanUser(targetUserId);
      if (cleanEmail) unbanUser(cleanEmail);
    }
  }

  // 3. Local Mock Users Array Update
  let matchedUser = null;
  try {
    const rawLocal = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
    if (rawLocal) {
      const parsed = JSON.parse(rawLocal);
      const idx = parsed.findIndex(u => u.id === targetUserId || u.email === targetUserId || u.username === targetUserId || (cleanEmail && u.email === cleanEmail));
      if (idx !== -1) {
        parsed[idx] = {
          ...parsed[idx],
          ...(cleanFullName ? { full_name: cleanFullName, display_name: cleanFullName } : {}),
          ...(cleanEmail ? { email: cleanEmail } : {}),
          ...(cleanMobile !== undefined ? { mobile_number: cleanMobile } : {}),
          ...(cleanCollege !== undefined ? { college_name: cleanCollege, institute: cleanCollege } : {}),
          ...(cleanDepartment !== undefined ? { department: cleanDepartment } : {}),
          ...(cleanTargetYear !== undefined ? { gate_target_year: cleanTargetYear } : {}),
          ...(cleanXP !== undefined ? { xp_points: cleanXP } : {}),
          ...(cleanBreakXP !== undefined ? { break_xp: cleanBreakXP } : {}),
          ...(cleanRole ? { 
            role: cleanRole, 
            is_solver: cleanRole === 'solver', 
            is_mentor: cleanRole === 'mentor', 
            is_faculty: isFac 
          } : {}),
          ...(cleanBadge !== undefined ? { contributor_badge: cleanBadge } : {}),
          ...(updatedFields.is_banned !== undefined ? { is_banned: updatedFields.is_banned } : {}),
          ...(updatedFields.designation !== undefined ? { designation: updatedFields.designation } : {}),
          ...(updatedFields.bio !== undefined ? { bio: updatedFields.bio } : {}),
          ...(updatedFields.title_prefix !== undefined ? { title_prefix: updatedFields.title_prefix } : {})
        };
        matchedUser = parsed[idx];
        localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(parsed));
      }
    }
  } catch (e) {
    console.warn("Local storage user update error:", e);
  }

  // 4. Active Session Update (if the currently logged in student is the target)
  try {
    const rawSession = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY);
    if (rawSession) {
      const session = JSON.parse(rawSession);
      const s = session?.student;
      if (s?.id === targetUserId || s?.email === targetUserId || s?.username === targetUserId || (cleanEmail && s?.email === cleanEmail)) {
        session.student = {
          ...session.student,
          ...(cleanFullName ? { full_name: cleanFullName, display_name: cleanFullName } : {}),
          ...(cleanEmail ? { email: cleanEmail } : {}),
          ...(cleanMobile !== undefined ? { mobile_number: cleanMobile } : {}),
          ...(cleanCollege !== undefined ? { college_name: cleanCollege, institute: cleanCollege } : {}),
          ...(cleanDepartment !== undefined ? { department: cleanDepartment } : {}),
          ...(cleanTargetYear !== undefined ? { gate_target_year: cleanTargetYear } : {}),
          ...(cleanXP !== undefined ? { xp_points: cleanXP } : {}),
          ...(cleanBreakXP !== undefined ? { break_xp: cleanBreakXP } : {}),
          ...(cleanRole ? { 
            role: cleanRole, 
            is_solver: cleanRole === 'solver', 
            is_mentor: cleanRole === 'mentor', 
            is_faculty: isFac 
          } : {}),
          ...(cleanBadge !== undefined ? { contributor_badge: cleanBadge } : {}),
          ...(updatedFields.designation !== undefined ? { designation: updatedFields.designation } : {}),
          ...(updatedFields.bio !== undefined ? { bio: updatedFields.bio } : {}),
          ...(updatedFields.title_prefix !== undefined ? { title_prefix: updatedFields.title_prefix } : {})
        };
        localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(session));

        // Sync local XP counter if modified
        if (cleanXP !== undefined) {
          localStorage.setItem('gate_ag_student_xp_data', String(cleanXP));
        }
        if (cleanBreakXP !== undefined) {
          localStorage.setItem('gate_ag_break_xp', String(cleanBreakXP));
        }
      }
    }
  } catch (e) {}

  // 5. Supabase Backend Sync
  if (isSupabaseConfigured && supabase) {
    try {
      const dbPayload = {};
      if (cleanFullName) dbPayload.full_name = cleanFullName;
      if (cleanEmail) dbPayload.email = cleanEmail;
      if (cleanMobile !== undefined) dbPayload.mobile_number = cleanMobile;
      if (cleanCollege !== undefined) {
        dbPayload.college_name = cleanCollege;
        dbPayload.institute = cleanCollege;
      }
      if (cleanDepartment !== undefined) dbPayload.department = cleanDepartment;
      if (cleanTargetYear !== undefined) dbPayload.gate_target_year = cleanTargetYear;
      if (cleanXP !== undefined) dbPayload.xp_points = cleanXP;
      if (cleanBreakXP !== undefined) dbPayload.break_xp = cleanBreakXP;
      if (cleanRole) {
        dbPayload.role = cleanRole;
        dbPayload.is_faculty = isFac;
        dbPayload.is_solver = cleanRole === 'solver';
        dbPayload.is_mentor = cleanRole === 'mentor';
      }
      if (cleanBadge !== undefined) dbPayload.contributor_badge = cleanBadge;
      if (updatedFields.designation !== undefined) dbPayload.designation = updatedFields.designation;
      if (updatedFields.bio !== undefined) dbPayload.bio = updatedFields.bio;
      if (updatedFields.title_prefix !== undefined) dbPayload.title_prefix = updatedFields.title_prefix;

      if (Object.keys(dbPayload).length > 0) {
        await supabase
          .from('students')
          .update(dbPayload)
          .or(`id.eq.${targetUserId},email.eq.${cleanEmail || targetUserId}`);
      }

      // Supabase Realtime Broadcast to notify all active student devices
      const channel = supabase.channel('gate_ag_roles_live');
      channel.send({
        type: 'broadcast',
        event: 'user_updated',
        payload: {
          userId: targetUserId,
          targetEmail: cleanEmail,
          updatedFields: {
            ...updatedFields,
            role: cleanRole,
            contributor_badge: cleanBadge,
            xp_points: cleanXP,
            break_xp: cleanBreakXP
          },
          updatedAt: new Date().toISOString()
        }
      });
    } catch (err) {
      console.warn("Supabase user info update sync error:", err.message);
    }
  }

  // 6. Moderation Audit Trail Logging
  logModerationAction({
    actorName: adminActor?.name || 'Admin Lead',
    actorRole: adminActor?.role || 'admin',
    action: 'UPDATE_USER_PROFILE',
    targetUser: cleanFullName || cleanEmail || targetUserId,
    targetMessage: `Updated fields: ${Object.keys(updatedFields).join(', ')}`,
    reason: updatedFields.admin_notes || 'Administrative profile modification'
  });

  // 7. Cross-Tab BroadcastChannel Dispatch
  const broadcastPayload = {
    type: 'USER_UPDATED',
    userId: targetUserId,
    targetEmail: cleanEmail,
    role: cleanRole,
    contributor_badge: cleanBadge,
    updatedFields: {
      ...updatedFields,
      role: cleanRole,
      contributor_badge: cleanBadge,
      xp_points: cleanXP,
      break_xp: cleanBreakXP
    },
    timestamp: Date.now()
  };

  if (localRolesBroadcast) {
    try {
      localRolesBroadcast.postMessage(broadcastPayload);
    } catch (e) {}
  }

  return {
    success: true,
    user: matchedUser,
    message: 'User information updated and synced live across sessions.'
  };
}

/**
 * Admin Password Reset for a user
 */
export async function adminResetUserPassword(targetUserId, newPassword, adminActor = { name: 'Admin', role: 'admin' }) {
  if (!targetUserId || !newPassword || newPassword.trim().length < 6) {
    return { success: false, message: 'Password must be at least 6 characters long.' };
  }

  const cleanPwd = newPassword.trim();
  let secureHash = null;
  try {
    secureHash = await hashPassword(cleanPwd);
  } catch (e) {}

  // 1. Update in local mock users array
  try {
    const rawLocal = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
    if (rawLocal) {
      const parsed = JSON.parse(rawLocal);
      const idx = parsed.findIndex(u => u.id === targetUserId || u.email === targetUserId || u.username === targetUserId);
      if (idx !== -1) {
        parsed[idx].password_plain = cleanPwd;
        if (secureHash) parsed[idx].password_hash = secureHash;
        parsed[idx].has_custom_password = true;
        localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(parsed));
      }
    }
  } catch (e) {}

  // 2. Update active session if target is active
  try {
    const rawSession = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY);
    if (rawSession) {
      const session = JSON.parse(rawSession);
      const s = session?.student;
      if (s?.id === targetUserId || s?.email === targetUserId || s?.username === targetUserId) {
        session.student.has_custom_password = true;
        if (secureHash) session.student.password_hash = secureHash;
        delete session.student.password_plain;
        localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(session));
      }
    }
  } catch (e) {}

  // 3. Supabase Database Update
  if (isSupabaseConfigured && supabase) {
    try {
      const dbPayload = {
        password_plain: cleanPwd,
        has_custom_password: true
      };
      if (secureHash) {
        dbPayload.password_hash = secureHash;
      }
      await supabase
        .from('students')
        .update(dbPayload)
        .or(`id.eq.${targetUserId},email.eq.${targetUserId}`);
    } catch (e) {
      console.warn("Supabase admin password reset sync note:", e.message);
    }
  }

  // 4. Log Moderation Action
  logModerationAction({
    actorName: adminActor?.name || 'Admin Lead',
    actorRole: adminActor?.role || 'admin',
    action: 'ADMIN_RESET_PASSWORD',
    targetUser: targetUserId,
    targetMessage: 'Admin initiated password reset',
    reason: 'Administrative password reset'
  });

  return { success: true, message: 'Password reset successfully.' };
}

/**
 * Subscribe to live role and full user updates across tabs and devices
 */
export function subscribeToLiveRoleSync(onRoleUpdated) {
  if (typeof window === 'undefined') return () => {};

  // 1. Cross-Tab Broadcast Listener
  const handleLocalMessage = (event) => {
    if ((event.data?.type === 'ROLE_UPDATED' || event.data?.type === 'USER_UPDATED') && typeof onRoleUpdated === 'function') {
      onRoleUpdated(event.data);
    }
  };

  if (localRolesBroadcast) {
    localRolesBroadcast.addEventListener('message', handleLocalMessage);
  }

  // 2. Supabase Realtime Multi-Device Listener
  if (isSupabaseConfigured && supabase) {
    try {
      supabaseRolesChannel = supabase
        .channel('gate_ag_roles_live')
        .on('broadcast', { event: 'role_updated' }, (payload) => {
          if (payload.payload && typeof onRoleUpdated === 'function') {
            onRoleUpdated(payload.payload);
          }
        })
        .on('broadcast', { event: 'user_updated' }, (payload) => {
          if (payload.payload && typeof onRoleUpdated === 'function') {
            onRoleUpdated(payload.payload);
          }
        })
        .subscribe();
    } catch (e) {}
  }

  // Return unsubscribe cleanup function
  return () => {
    if (localRolesBroadcast) {
      localRolesBroadcast.removeEventListener('message', handleLocalMessage);
    }
    if (supabaseRolesChannel && supabase) {
      supabase.removeChannel(supabaseRolesChannel);
    }
  };
}

export const subscribeToLiveUserSync = subscribeToLiveRoleSync;

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

// ==========================================================================
// 1. MODERATION AUDIT TRAIL
// ==========================================================================
const LOCAL_STORAGE_AUDIT_LOG_KEY = 'gate_ag_moderation_audit_log';

export function logModerationAction({ actorName, actorRole, action, targetUser, targetMessage, reason }) {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_AUDIT_LOG_KEY);
    const logs = raw ? JSON.parse(raw) : [];
    logs.unshift({
      id: 'mod_log_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      actorName: actorName || 'Moderator',
      actorRole: actorRole || 'Solver',
      action: action || 'DELETE_MESSAGE', // 'DELETE_MESSAGE' | 'MUTE_USER' | 'BAN_USER' | 'UNBAN_USER' | 'UNMUTE_USER' | 'DISMISS_FLAG'
      targetUser: targetUser || 'Anonymous Student',
      targetMessage: targetMessage || '',
      reason: reason || 'Violation of community guidelines',
      timestamp: new Date().toISOString()
    });
    // Keep last 100 log entries
    localStorage.setItem(LOCAL_STORAGE_AUDIT_LOG_KEY, JSON.stringify(logs.slice(0, 100)));
    return true;
  } catch (e) {
    return false;
  }
}

export function getModerationAuditLog() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_AUDIT_LOG_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

// ==========================================================================
// 2. TIMED MUTES (SOFT MODERATION: 1 Hour, 24 Hours, 7 Days)
// ==========================================================================
const LOCAL_STORAGE_MUTED_USERS_KEY = 'gate_ag_muted_users_list';

export function muteUser(user, durationHours = 24, reason = 'Temporary timeout for spam/inappropriate message') {
  if (!user) return { success: false };
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_MUTED_USERS_KEY);
    let mutedList = raw ? JSON.parse(raw) : [];
    
    const identifier = typeof user === 'string' ? user : (user.id || user.username || user.email);
    const userName = typeof user === 'string' ? user : (user.full_name || user.username || identifier);
    const expiresAt = Date.now() + (durationHours * 60 * 60 * 1000);

    mutedList = mutedList.filter(m => m.identifier !== identifier && m.username !== user?.username && m.id !== user?.id);
    mutedList.push({
      identifier,
      id: user.id || null,
      username: user.username || null,
      email: user.email || null,
      name: userName,
      reason,
      muted_at: new Date().toISOString(),
      expires_at: expiresAt,
      duration_hours: durationHours
    });

    localStorage.setItem(LOCAL_STORAGE_MUTED_USERS_KEY, JSON.stringify(mutedList));
    return { success: true, expiresAt };
  } catch (e) {
    return { success: false };
  }
}

export function unmuteUser(identifierOrId) {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_MUTED_USERS_KEY);
    let mutedList = raw ? JSON.parse(raw) : [];
    mutedList = mutedList.filter(m => 
      m.identifier !== identifierOrId && 
      m.id !== identifierOrId && 
      m.username !== identifierOrId && 
      m.email !== identifierOrId
    );
    localStorage.setItem(LOCAL_STORAGE_MUTED_USERS_KEY, JSON.stringify(mutedList));
    return { success: true };
  } catch (e) {
    return { success: false };
  }
}

export function getMutedUsers() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_MUTED_USERS_KEY);
    const list = raw ? JSON.parse(raw) : [];
    // Auto-clean expired mutes
    const now = Date.now();
    return list.filter(m => m.expires_at > now);
  } catch (e) {
    return [];
  }
}

export function isUserMuted(student) {
  if (!student) return { isMuted: false, remainingMinutes: 0, reason: '' };
  const mutedList = getMutedUsers();
  const now = Date.now();

  const match = mutedList.find(m => 
    (student.id && m.id === student.id) ||
    (student.username && m.username && m.username.toLowerCase() === student.username.toLowerCase()) ||
    (student.email && m.email && m.email.toLowerCase() === student.email.toLowerCase()) ||
    (student.full_name && m.name && m.name.toLowerCase() === student.full_name.toLowerCase())
  );

  if (match && match.expires_at > now) {
    const remainingMinutes = Math.max(1, Math.ceil((match.expires_at - now) / 60000));
    return { isMuted: true, remainingMinutes, reason: match.reason };
  }

  return { isMuted: false, remainingMinutes: 0, reason: '' };
}

// ==========================================================================
// 3. STUDENT MESSAGE FLAGGING & REPORTING QUEUE
// ==========================================================================
const LOCAL_STORAGE_FLAGGED_MSGS_KEY = 'gate_ag_flagged_messages_queue';

export function flagMessage({ messageId, messageText, authorName, flaggedBy, reason }) {
  if (!messageId) return { success: false };
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_FLAGGED_MSGS_KEY);
    const queue = raw ? JSON.parse(raw) : [];

    const existingIdx = queue.findIndex(f => f.messageId === messageId);
    if (existingIdx !== -1) {
      queue[existingIdx].flagCount = (queue[existingIdx].flagCount || 1) + 1;
      queue[existingIdx].reasons.push(reason || 'Inappropriate / Spam');
    } else {
      queue.unshift({
        id: 'flag_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
        messageId,
        messageText: messageText || '',
        authorName: authorName || 'Anonymous',
        flaggedBy: flaggedBy || 'Student',
        flagCount: 1,
        reasons: [reason || 'Inappropriate / Spam'],
        timestamp: new Date().toISOString(),
        status: 'PENDING' // 'PENDING' | 'RESOLVED_DELETED' | 'DISMISSED'
      });
    }

    localStorage.setItem(LOCAL_STORAGE_FLAGGED_MSGS_KEY, JSON.stringify(queue));
    return { success: true };
  } catch (e) {
    return { success: false };
  }
}

export function getFlaggedMessages() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_FLAGGED_MSGS_KEY);
    const queue = raw ? JSON.parse(raw) : [];
    return queue.filter(q => q.status === 'PENDING');
  } catch (e) {
    return [];
  }
}

export function resolveFlaggedMessage(messageId, resolution = 'DISMISSED') {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_FLAGGED_MSGS_KEY);
    let queue = raw ? JSON.parse(raw) : [];
    queue = queue.map(q => q.messageId === messageId ? { ...q, status: resolution } : q);
    localStorage.setItem(LOCAL_STORAGE_FLAGGED_MSGS_KEY, JSON.stringify(queue));
    return { success: true };
  } catch (e) {
    return { success: false };
  }
}

// ==========================================================================
// 4. VERIFIED SOLUTION & TOP SOLVERS LEADERBOARD
// ==========================================================================
const LOCAL_STORAGE_SOLVER_STATS_KEY = 'gate_ag_solver_contributions_stats';

export function markVerifiedSolution(solverIdentifier, solverName, solverRole = 'solver') {
  if (!solverIdentifier) return { success: false };
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_SOLVER_STATS_KEY);
    const statsMap = raw ? JSON.parse(raw) : {};

    const current = statsMap[solverIdentifier] || {
      name: solverName || solverIdentifier,
      role: solverRole,
      solvedCount: 0,
      contributorXP: 0,
      lastSolvedAt: null
    };

    current.solvedCount += 1;
    current.contributorXP += 25; // +25 Contributor XP per verified solution
    current.lastSolvedAt = new Date().toISOString();
    statsMap[solverIdentifier] = current;

    localStorage.setItem(LOCAL_STORAGE_SOLVER_STATS_KEY, JSON.stringify(statsMap));
    return { success: true, newSolvedCount: current.solvedCount, bonusXP: 25 };
  } catch (e) {
    return { success: false };
  }
}

export function getTopSolversLeaderboard() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_SOLVER_STATS_KEY);
    const statsMap = raw ? JSON.parse(raw) : {};
    
    // Convert to sorted array
    const list = Object.entries(statsMap).map(([id, data]) => ({
      id,
      ...data
    })).sort((a, b) => b.solvedCount - a.solvedCount);

    return list;
  } catch (e) {
    return [];
  }
}

