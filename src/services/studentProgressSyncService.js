/**
 * Student Cloud Progress Synchronization Service
 * 
 * Provides automated two-way synchronization of student progress across devices:
 * 1. Fetches cloud test attempts and reconstructs userStats (attempted question IDs, correct IDs, test history).
 * 2. Fetches and merges remote mistake vault entries into local storage.
 * 3. Dispatches 'gate_ag_progress_synced' event to update UI states in real time.
 */

import { supabase, isSupabaseConfigured } from './supabaseClient.js';
import { getStudentTestAttempts } from './testAttemptService.js';
import { getMistakeVault, getVaultStorageKey, getEffectiveStudentId } from './mistakeVaultService.js';

export const LOCAL_STORAGE_USER_STATS_KEY = 'gate_ag_user_stats';

/**
 * Reconstruct userStats from all available test attempts (remote + local)
 * and merge with any existing local userStats.
 * 
 * @param {Object} student - The logged in student object
 * @param {Object} currentLocalStats - Optional current local stats { attempted, correct, testHistory }
 * @returns {Promise<{ attempted: string[], correct: string[], testHistory: Array }>}
 */
export async function fetchAndRebuildStudentStats(student, currentLocalStats = null) {
  if (!student) {
    return currentLocalStats || { attempted: [], correct: [], testHistory: [] };
  }

  const studentIdentifier = student.id || student.admission_no || student.email || student.username;
  if (!studentIdentifier) {
    return currentLocalStats || { attempted: [], correct: [], testHistory: [] };
  }

  // 1. Fetch all attempts (Supabase + IndexedDB + LocalStorage merged)
  let attempts = [];
  try {
    attempts = await getStudentTestAttempts(studentIdentifier);
  } catch (err) {
    console.warn('[ProgressSync] Failed to fetch test attempts:', err);
  }

  // 2. Read existing local stats
  let existingStats = currentLocalStats;
  if (!existingStats) {
    try {
      const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(LOCAL_STORAGE_USER_STATS_KEY) : null;
      existingStats = raw ? JSON.parse(raw) : { attempted: [], correct: [], testHistory: [] };
    } catch (e) {
      existingStats = { attempted: [], correct: [], testHistory: [] };
    }
  }

  const attemptedSet = new Set(Array.isArray(existingStats?.attempted) ? existingStats.attempted : []);
  const correctSet = new Set(Array.isArray(existingStats?.correct) ? existingStats.correct : []);
  const incorrectSet = new Set();

  // 3. Process test history from attempts
  const historyMap = new Map();
  
  // First seed with existing local test history
  if (Array.isArray(existingStats?.testHistory)) {
    existingStats.testHistory.forEach(item => {
      const key = `${item.year || item.paperTitle || 'CBT'}_${item.date || item.submitted_at || ''}`;
      historyMap.set(key, item);
    });
  }

  // Merge attempts into history & extract question level outcomes
  attempts.forEach(att => {
    const histItem = {
      year: att.paper_year || (att.paper_title && String(att.paper_title).replace(/\D/g, '')) || 'Mock',
      score: Number(att.score || 0),
      totalMarks: Number(att.total_marks || 100),
      correctCount: Number(att.correct_count || 0),
      incorrectCount: Number(att.incorrect_count || 0),
      unattemptedCount: Number(att.unattempted_count || 0),
      date: att.submitted_at || new Date().toISOString()
    };
    const key = `${histItem.year}_${histItem.date}`;
    if (!historyMap.has(key)) {
      historyMap.set(key, histItem);
    }

    // Process question responses if present
    if (Array.isArray(att.question_responses)) {
      att.question_responses.forEach(qr => {
        const qid = qr.question_id || qr.qid || qr.id || qr.qnum;
        if (!qid) return;

        const isAttempted = qr.is_attempted ?? (qr.user_answer !== undefined || qr.ans !== undefined || qr.status === 'CORRECT' || qr.status === 'INCORRECT');
        const isCorrect = qr.is_correct ?? qr.ok ?? (qr.status === 'CORRECT') ?? (qr.marks_awarded > 0 || qr.m > 0);

        if (isAttempted) {
          attemptedSet.add(String(qid));
          if (isCorrect) {
            correctSet.add(String(qid));
          } else {
            incorrectSet.add(String(qid));
          }
        }
      });
    }
  });

  // Remove questions that were answered incorrectly in latest attempts
  incorrectSet.forEach(id => {
    correctSet.delete(id);
  });

  const mergedTestHistory = Array.from(historyMap.values()).sort(
    (a, b) => new Date(b.date || 0) - new Date(a.date || 0)
  );

  const rebuiltStats = {
    attempted: Array.from(attemptedSet),
    correct: Array.from(correctSet),
    testHistory: mergedTestHistory
  };

  // Persist merged stats to localStorage
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_USER_STATS_KEY, JSON.stringify(rebuiltStats));
    }
  } catch (e) {}

  return rebuiltStats;
}

/**
 * Fetch remote mistake vault from Supabase and merge with local device vault
 * 
 * @param {Object} student - The logged in student object
 * @returns {Promise<Object>} The merged mistake vault
 */
export async function fetchAndMergeMistakeVault(student) {
  if (!student) return getMistakeVault();

  const sid = getEffectiveStudentId(student.id || student.admission_no || student.email || student.username);
  const localVault = getMistakeVault(sid);

  if (!isSupabaseConfigured || !supabase || !sid || sid === 'default_student') {
    return localVault;
  }

  try {
    const { data, error } = await supabase
      .from('student_mistake_vault')
      .select('vault_data, updated_at')
      .eq('student_identifier', sid)
      .maybeSingle();

    if (!error && data && data.vault_data && typeof data.vault_data === 'object') {
      const remoteVault = data.vault_data;
      const mergedVault = { ...localVault };

      // Merge remote mistakes
      Object.keys(remoteVault).forEach(qId => {
        const remoteItem = remoteVault[qId];
        const localItem = mergedVault[qId];

        if (!localItem) {
          mergedVault[qId] = remoteItem;
        } else {
          // Merge by taking highest mistake count and latest timestamps
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

      // Save merged vault locally
      const storageKey = getVaultStorageKey(sid);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(storageKey, JSON.stringify(mergedVault));
      }
      return mergedVault;
    }
  } catch (e) {
    console.warn('[ProgressSync] Failed to fetch remote mistake vault:', e);
  }

  return localVault;
}

/**
 * Perform a full multi-device progress sync for the logged-in student.
 * Reconstitutes stats, mistake vault, and notifies active UI components.
 * 
 * @param {Object} student - Current logged-in student
 * @param {Object} currentLocalStats - Current React state for userStats
 * @returns {Promise<{ userStats: Object, mistakeVault: Object, synced: boolean }>}
 */
export async function syncStudentCloudData(student, currentLocalStats = null) {
  if (!student) {
    return {
      userStats: currentLocalStats || { attempted: [], correct: [], testHistory: [] },
      mistakeVault: getMistakeVault(),
      synced: false
    };
  }

  try {
    const [rebuiltStats, mergedVault] = await Promise.all([
      fetchAndRebuildStudentStats(student, currentLocalStats),
      fetchAndMergeMistakeVault(student)
    ]);

    // Dispatch global custom event for reactive UI updates
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('gate_ag_progress_synced', {
        detail: {
          student,
          userStats: rebuiltStats,
          mistakeVault: mergedVault
        }
      }));
    }

    return {
      userStats: rebuiltStats,
      mistakeVault: mergedVault,
      synced: true
    };
  } catch (err) {
    console.warn('[ProgressSync] Cloud data sync error:', err);
    return {
      userStats: currentLocalStats || { attempted: [], correct: [], testHistory: [] },
      mistakeVault: getMistakeVault(),
      synced: false
    };
  }
}
