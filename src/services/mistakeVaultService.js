/**
 * Mistake Vault Service
 * Tracks and persists questions that the user answered incorrectly across CBT Mocks and Practice Sessions.
 * Enables targeted revision drills, mistake frequency counters, and isolated user-specific vaults.
 */

import { supabase, isSupabaseConfigured } from './supabaseClient.js';

const MISTAKE_VAULT_PREFIX = 'gate_ag_mistake_vault';
const LEGACY_MISTAKE_KEY = 'gate_ag_mistake_vault';

export function getEffectiveStudentId(explicitId = null) {
  if (explicitId && typeof explicitId === 'string' && explicitId.trim().length > 0) {
    return explicitId.trim();
  }
  try {
    const rawSession = localStorage.getItem('gate_ag_prep_session_token');
    if (rawSession) {
      const session = JSON.parse(rawSession);
      const sid = session?.student?.id || session?.student?.admission_no || session?.student?.email;
      if (sid) return String(sid).trim();
    }
  } catch (e) {}
  return 'default_student';
}

export function getVaultStorageKey(studentId = null) {
  const sid = getEffectiveStudentId(studentId);
  return `${MISTAKE_VAULT_PREFIX}_${sid}`;
}

export function getMistakeVault(studentId = null) {
  try {
    const sid = getEffectiveStudentId(studentId);
    const key = getVaultStorageKey(sid);
    let raw = localStorage.getItem(key);

    // Backward compatibility fallback to legacy un-scoped key only for default_student
    if (!raw && sid === 'default_student') {
      const legacyRaw = localStorage.getItem(LEGACY_MISTAKE_KEY);
      if (legacyRaw) {
        raw = legacyRaw;
        // Migrate to scoped key
        localStorage.setItem(key, raw);
      }
    }

    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === 'object' && parsed !== null ? parsed : {};
  } catch (err) {
    console.error('Failed to parse mistake vault:', err);
    return {};
  }
}

export function recordQuestionOutcomes({
  attempted = [],
  correct = [],
  incorrect = [],
  source = 'practice',
  studentId = null
}) {
  try {
    const sid = getEffectiveStudentId(studentId);
    const vault = getMistakeVault(sid);
    const now = new Date().toISOString();

    // Record incorrect questions
    incorrect.forEach(qId => {
      if (!qId) return;
      if (!vault[qId]) {
        vault[qId] = {
          qId,
          mistakeCount: 1,
          mastered: false,
          firstMistakeAt: now,
          lastMistakeAt: now,
          source
        };
      } else {
        vault[qId].mistakeCount = (vault[qId].mistakeCount || 0) + 1;
        vault[qId].lastMistakeAt = now;
        vault[qId].mastered = false; // Reset mastered if failed again
      }
    });

    // Mark questions solved correctly as mastered
    correct.forEach(qId => {
      if (vault[qId]) {
        vault[qId].mastered = true;
        vault[qId].lastCorrectAt = now;
      }
    });

    const key = getVaultStorageKey(sid);
    localStorage.setItem(key, JSON.stringify(vault));
    // Also update legacy key for backward compatibility only for default_student
    if (sid === 'default_student') {
      localStorage.setItem(LEGACY_MISTAKE_KEY, JSON.stringify(vault));
    }

    // Also update legacy user stats for backward compatibility
    try {
      const statsRaw = localStorage.getItem('gate_ag_user_stats');
      let stats = statsRaw ? JSON.parse(statsRaw) : { attempted: [], correct: [], testHistory: [] };
      if (!Array.isArray(stats.attempted)) stats.attempted = [];
      if (!Array.isArray(stats.correct)) stats.correct = [];

      attempted.forEach(id => {
        if (!stats.attempted.includes(id)) stats.attempted.push(id);
      });
      correct.forEach(id => {
        if (!stats.correct.includes(id)) stats.correct.push(id);
      });
      stats.correct = stats.correct.filter(id => !incorrect.includes(id));

      localStorage.setItem('gate_ag_user_stats', JSON.stringify(stats));
    } catch (e) {}

    // Debounced async sync to Supabase if authenticated to prevent excessive database writes
    if (isSupabaseConfigured && supabase && sid && sid !== 'default_student') {
      scheduleDebouncedVaultSync(sid, vault, now);
    }

    return vault;
  } catch (err) {
    console.error('Failed to record question outcomes:', err);
    return getMistakeVault(studentId);
  }
}

let vaultSyncTimers = new Map();

function scheduleDebouncedVaultSync(sid, vault, now) {
  if (vaultSyncTimers.has(sid)) {
    clearTimeout(vaultSyncTimers.get(sid));
  }

  const timer = setTimeout(() => {
    vaultSyncTimers.delete(sid);
    try {
      supabase
        .from('student_mistake_vault')
        .upsert([{
          student_identifier: sid,
          vault_data: vault,
          updated_at: now
        }], { onConflict: 'student_identifier' })
        .then(({ error }) => {
          if (error) console.warn('Mistake vault backend sync notice:', error.message);
        })
        .catch(() => {});
    } catch (e) {}
  }, 5000); // 5-second debounce window

  vaultSyncTimers.set(sid, timer);
}

export function getActiveMistakeIds(studentId = null) {
  const vault = getMistakeVault(studentId);
  return Object.values(vault)
    .filter(item => !item.mastered)
    .map(item => item.qId);
}

export function getAllMistakeItems(studentId = null) {
  const vault = getMistakeVault(studentId);
  return Object.values(vault);
}

export function removeMistake(qId, studentId = null) {
  const sid = getEffectiveStudentId(studentId);
  const vault = getMistakeVault(sid);
  if (vault[qId]) {
    delete vault[qId];
    const key = getVaultStorageKey(sid);
    localStorage.setItem(key, JSON.stringify(vault));
    if (sid === 'default_student') {
      localStorage.setItem(LEGACY_MISTAKE_KEY, JSON.stringify(vault));
    }
  }
}

export function clearMistakeVault(studentId = null) {
  const sid = getEffectiveStudentId(studentId);
  const key = getVaultStorageKey(sid);
  localStorage.removeItem(key);
  if (sid === 'default_student') {
    localStorage.removeItem(LEGACY_MISTAKE_KEY);
  }
}

/**
 * Pull and merge remote mistake vault from Supabase for this student
 */
export async function fetchAndMergeRemoteMistakeVault(studentId = null) {
  const sid = getEffectiveStudentId(studentId);
  if (!isSupabaseConfigured || !supabase || !sid || sid === 'default_student') {
    return getMistakeVault(sid);
  }

  try {
    const { data, error } = await supabase
      .from('student_mistake_vault')
      .select('vault_data, updated_at')
      .eq('student_identifier', sid)
      .maybeSingle();

    if (!error && data && data.vault_data && typeof data.vault_data === 'object') {
      const remoteVault = data.vault_data;
      const localVault = getMistakeVault(sid);
      const mergedVault = { ...localVault };

      Object.keys(remoteVault).forEach(qId => {
        const remoteItem = remoteVault[qId];
        const localItem = mergedVault[qId];

        if (!localItem) {
          mergedVault[qId] = remoteItem;
        } else {
          mergedVault[qId] = {
            ...localItem,
            mistakeCount: Math.max(localItem.mistakeCount || 1, remoteItem.mistakeCount || 1),
            mastered: localItem.mastered || remoteItem.mastered,
            firstMistakeAt: localItem.firstMistakeAt || remoteItem.firstMistakeAt,
            lastMistakeAt: (new Date(localItem.lastMistakeAt || 0) > new Date(remoteItem.lastMistakeAt || 0))
              ? localItem.lastMistakeAt
              : remoteItem.lastMistakeAt
          };
        }
      });

      const key = getVaultStorageKey(sid);
      localStorage.setItem(key, JSON.stringify(mergedVault));
      return mergedVault;
    }
  } catch (e) {
    console.warn('Mistake vault remote fetch exception:', e);
  }

  return getMistakeVault(sid);
}

