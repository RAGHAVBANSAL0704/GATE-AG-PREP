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

    // Async sync to Supabase if authenticated
    if (isSupabaseConfigured && supabase && sid && sid !== 'default_student') {
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
    }

    return vault;
  } catch (err) {
    console.error('Failed to record question outcomes:', err);
    return getMistakeVault(studentId);
  }
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
