/**
 * Student Cloud Progress Synchronization Service
 * 
 * Provides automated two-way synchronization of student progress across devices:
 * 1. Fetches cloud test attempts and mistake vault to reconstruct isolated userStats.
 * 2. Fetches and merges remote mistake vault entries into account-scoped local storage.
 * 3. Syncs student Academic and Break XP across devices.
 * 4. Dispatches 'gate_ag_progress_synced' event to update UI states in real time.
 */

import { supabase, isSupabaseConfigured } from './supabaseClient.js';
import { getStudentTestAttempts } from './testAttemptService.js';
import { getMistakeVault, getVaultStorageKey, getEffectiveStudentId } from './mistakeVaultService.js';

export const LOCAL_STORAGE_USER_STATS_KEY = 'gate_ag_user_stats';
export const LOCAL_STORAGE_BOOKMARKS_PREFIX = 'gate_ag_bookmarks';
export const LOCAL_STORAGE_PRACTICE_PREFIX = 'gate_ag_practice_progress';

/**
 * Get account-scoped userStats key in localStorage
 */
export function getStudentUserStatsKey(student = null) {
  if (!student) return LOCAL_STORAGE_USER_STATS_KEY;
  const sid = getEffectiveStudentId(student.id || student.admission_no || student.email || student.username);
  return (sid && sid !== 'default_student') ? `gate_ag_user_stats_${sid}` : LOCAL_STORAGE_USER_STATS_KEY;
}

/**
 * Get account-scoped bookmarks key in localStorage
 */
export function getStudentBookmarksKey(student = null) {
  const sid = getEffectiveStudentId(student?.id || student?.admission_no || student?.email || student?.username);
  return (sid && sid !== 'default_student') ? `${LOCAL_STORAGE_BOOKMARKS_PREFIX}_${sid}` : LOCAL_STORAGE_BOOKMARKS_PREFIX;
}

/**
 * Get account-scoped practice progress key in localStorage
 */
export function getStudentPracticeKey(student = null, poolKey = 'gate_ag_pyq_progress') {
  const sid = getEffectiveStudentId(student?.id || student?.admission_no || student?.email || student?.username);
  return (sid && sid !== 'default_student') ? `${poolKey}_${sid}` : poolKey;
}

/**
 * Retrieve local account-scoped practice progress
 */
export function getLocalPracticeProgress(sid = null) {
  const effectiveSid = getEffectiveStudentId(sid);
  try {
    const key = effectiveSid && effectiveSid !== 'default_student' ? `${LOCAL_STORAGE_PRACTICE_PREFIX}_${effectiveSid}` : LOCAL_STORAGE_PRACTICE_PREFIX;
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null;
    const fromPrefixed = raw ? JSON.parse(raw) : null;

    // Also merge with pyq and qbank progress keys if present
    const pyqKey = effectiveSid && effectiveSid !== 'default_student' ? `gate_ag_pyq_progress_${effectiveSid}` : 'gate_ag_pyq_progress';
    const pyqRaw = typeof localStorage !== 'undefined' ? localStorage.getItem(pyqKey) : null;
    const fromPyq = pyqRaw ? JSON.parse(pyqRaw) : null;

    const qbankKey = effectiveSid && effectiveSid !== 'default_student' ? `gate_ag_qbank_progress_${effectiveSid}` : 'gate_ag_qbank_progress';
    const qbankRaw = typeof localStorage !== 'undefined' ? localStorage.getItem(qbankKey) : null;
    const fromQbank = qbankRaw ? JSON.parse(qbankRaw) : null;

    return {
      ...(typeof fromPrefixed === 'object' && fromPrefixed !== null ? fromPrefixed : {}),
      ...(typeof fromPyq === 'object' && fromPyq !== null ? fromPyq : {}),
      ...(typeof fromQbank === 'object' && fromQbank !== null ? fromQbank : {})
    };
  } catch (e) {
    return {};
  }
}

/**
 * Retrieve local account-scoped bookmarks
 */
export function getLocalBookmarks(sid = null) {
  const effectiveSid = getEffectiveStudentId(sid);
  try {
    const key = effectiveSid && effectiveSid !== 'default_student' ? `${LOCAL_STORAGE_BOOKMARKS_PREFIX}_${effectiveSid}` : LOCAL_STORAGE_BOOKMARKS_PREFIX;
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(key) || localStorage.getItem(LOCAL_STORAGE_BOOKMARKS_PREFIX) : null;
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

/**
 * Reconstruct userStats from all available test attempts, mistake vault, & practice progress
 * isolated specifically to the logged-in student account.
 */
export async function fetchAndRebuildStudentStats(student, currentLocalStats = null) {
  if (!student) {
    return currentLocalStats || { attempted: [], correct: [], testHistory: [] };
  }

  const studentIdentifier = student.id || student.admission_no || student.email || student.username;
  if (!studentIdentifier) {
    return currentLocalStats || { attempted: [], correct: [], testHistory: [] };
  }

  const sid = getEffectiveStudentId(studentIdentifier);

  // 1. Fetch all attempts (Supabase + IndexedDB + LocalStorage merged) for this student
  let attempts = [];
  try {
    attempts = await getStudentTestAttempts(student);
  } catch (err) {
    console.warn('[ProgressSync] Failed to fetch test attempts:', err);
  }

  // 2. Fetch mistake vault, bookmarks & practice questions for this student
  let mistakeVault = {};
  let cloudData = null;
  try {
    cloudData = await fetchAndMergeMistakeVault(student);
    mistakeVault = cloudData?.mistakes || cloudData || {};
  } catch (err) {
    console.warn('[ProgressSync] Failed to fetch mistake vault:', err);
  }

  // 3. Read existing account-scoped local stats
  const userStatsKey = getStudentUserStatsKey(student);
  let existingStats = currentLocalStats;
  if (!existingStats) {
    try {
      const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(userStatsKey) : null;
      existingStats = raw ? JSON.parse(raw) : { attempted: [], correct: [], testHistory: [] };
    } catch (e) {
      existingStats = { attempted: [], correct: [], testHistory: [] };
    }
  }

  const attemptedSet = new Set(Array.isArray(existingStats?.attempted) ? existingStats.attempted : []);
  const correctSet = new Set(Array.isArray(existingStats?.correct) ? existingStats.correct : []);
  const incorrectSet = new Set();

  // 4. Ingest practiced questions & outcomes from Mistake Vault
  if (mistakeVault && typeof mistakeVault === 'object') {
    Object.keys(mistakeVault).forEach(qid => {
      if (!qid) return;
      const entry = mistakeVault[qid];
      attemptedSet.add(String(qid));
      if (entry && (entry.mastered || entry.lastCorrectAt)) {
        correctSet.add(String(qid));
      } else if (entry && entry.mistakeCount > 0 && !entry.mastered) {
        incorrectSet.add(String(qid));
      }
    });
  }

  // 5. Ingest Practice Hub progress (PYQ Pool & Question Bank questions solved individually)
  const localPractice = getLocalPracticeProgress(sid);
  const cloudPractice = cloudData?.practiceProgress || {};
  const mergedPractice = { ...localPractice, ...cloudPractice };

  Object.keys(mergedPractice).forEach(qid => {
    if (!qid) return;
    const entry = mergedPractice[qid];
    if (entry && (entry.attempted || entry.lastAttemptedAt)) {
      attemptedSet.add(String(qid));
      if (entry.isCorrect) {
        correctSet.add(String(qid));
        incorrectSet.delete(String(qid)); // Correct answer clears incorrect state
      } else if (!entry.isCorrect && !entry.mastered) {
        incorrectSet.add(String(qid));
      }
    }
  });

  // 6. Process test history from attempts
  const historyMap = new Map();
  
  if (Array.isArray(existingStats?.testHistory)) {
    existingStats.testHistory.forEach(item => {
      const key = `${item.year || item.paperTitle || 'CBT'}_${item.date || item.submitted_at || ''}`;
      historyMap.set(key, item);
    });
  }

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

  // Persist to account-scoped storage and active session key
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(userStatsKey, JSON.stringify(rebuiltStats));
      localStorage.setItem(LOCAL_STORAGE_USER_STATS_KEY, JSON.stringify(rebuiltStats));
    }
  } catch (e) {}

  return rebuiltStats;
}

/**
 * Fetch remote mistake vault, bookmarks, and practice progress from Supabase
 * and bidirectionally merge with local device vault.
 * 
 * Supports both legacy vault_data format ({ [qid]: item }) and enhanced format:
 * { mistakes: {}, bookmarks: [], practiceProgress: {}, updated_at: '...' }
 */
export async function fetchAndMergeMistakeVault(student) {
  if (!student) return getMistakeVault();

  const sid = getEffectiveStudentId(student.id || student.admission_no || student.email || student.username);
  const localVault = getMistakeVault(sid);
  const localBookmarks = getLocalBookmarks(sid);
  const localPractice = getLocalPracticeProgress(sid);

  if (!isSupabaseConfigured || !supabase || !sid || sid === 'default_student') {
    return {
      mistakes: localVault,
      bookmarks: localBookmarks,
      practiceProgress: localPractice
    };
  }

  try {
    const { data, error } = await supabase
      .from('student_mistake_vault')
      .select('vault_data, updated_at')
      .eq('student_identifier', sid)
      .maybeSingle();

    if (!error && data && data.vault_data && typeof data.vault_data === 'object') {
      const remoteData = data.vault_data;
      
      // Determine if remote data is enhanced format or legacy format
      const isEnhanced = remoteData.mistakes !== undefined || remoteData.practiceProgress !== undefined || remoteData.bookmarks !== undefined;
      const remoteMistakes = isEnhanced ? (remoteData.mistakes || {}) : remoteData;
      const remoteBookmarks = isEnhanced && Array.isArray(remoteData.bookmarks) ? remoteData.bookmarks : [];
      const remotePractice = isEnhanced && remoteData.practiceProgress && typeof remoteData.practiceProgress === 'object' ? remoteData.practiceProgress : {};

      // 1. Merge mistakes
      const mergedVault = { ...localVault };
      Object.keys(remoteMistakes).forEach(qId => {
        const remoteItem = remoteMistakes[qId];
        const localItem = mergedVault[qId];

        if (!localItem) {
          mergedVault[qId] = remoteItem;
        } else {
          mergedVault[qId] = {
            ...localItem,
            mistakeCount: Math.max(localItem.mistakeCount || 1, remoteItem.mistakeCount || 1),
            mastered: localItem.mastered || remoteItem.mastered,
            firstMistakeAt: localItem.firstMistakeAt || remoteItem.firstMistakeAt,
            lastCorrectAt: remoteItem.lastCorrectAt || localItem.lastCorrectAt,
            lastMistakeAt: (new Date(localItem.lastMistakeAt || 0) > new Date(remoteItem.lastMistakeAt || 0))
              ? localItem.lastMistakeAt
              : remoteItem.lastMistakeAt
          };
        }
      });

      // 2. Merge bookmarks
      const mergedBookmarks = Array.from(new Set([...localBookmarks, ...remoteBookmarks]));

      // 3. Merge practice progress
      const mergedPractice = { ...localPractice };
      Object.keys(remotePractice).forEach(qid => {
        const r = remotePractice[qid];
        const l = mergedPractice[qid];
        if (!l) {
          mergedPractice[qid] = r;
        } else {
          mergedPractice[qid] = {
            attempted: true,
            isCorrect: Boolean(l.isCorrect || r.isCorrect),
            marksAwarded: Math.max(Number(l.marksAwarded || 0), Number(r.marksAwarded || 0)),
            peeked: Boolean(l.peeked || r.peeked),
            xpAwarded: Math.max(Number(l.xpAwarded || 0), Number(r.xpAwarded || 0)),
            lastAttemptedAt: (new Date(l.lastAttemptedAt || 0) > new Date(r.lastAttemptedAt || 0))
              ? l.lastAttemptedAt
              : r.lastAttemptedAt
          };
        }
      });

      // Save merged datasets locally
      if (typeof localStorage !== 'undefined') {
        const vaultStorageKey = getVaultStorageKey(sid);
        localStorage.setItem(vaultStorageKey, JSON.stringify(mergedVault));

        const bmKey = getStudentBookmarksKey(student);
        localStorage.setItem(bmKey, JSON.stringify(mergedBookmarks));
        localStorage.setItem(LOCAL_STORAGE_BOOKMARKS_PREFIX, JSON.stringify(mergedBookmarks));

        const practiceKey = `${LOCAL_STORAGE_PRACTICE_PREFIX}_${sid}`;
        localStorage.setItem(practiceKey, JSON.stringify(mergedPractice));
        localStorage.setItem(`gate_ag_pyq_progress_${sid}`, JSON.stringify(mergedPractice));
        localStorage.setItem(`gate_ag_qbank_progress_${sid}`, JSON.stringify(mergedPractice));
      }

      // If local device had items not present in remote, sync merged payload back to cloud
      const hasLocalAdditions = 
        Object.keys(localVault).some(k => !remoteMistakes[k]) ||
        localBookmarks.some(k => !remoteBookmarks.includes(k)) ||
        Object.keys(localPractice).some(k => !remotePractice[k]);

      if (hasLocalAdditions) {
        scheduleUnifiedVaultSync(sid, mergedVault, mergedBookmarks, mergedPractice);
      }

      return {
        mistakes: mergedVault,
        bookmarks: mergedBookmarks,
        practiceProgress: mergedPractice
      };
    }
  } catch (e) {
    console.warn('[ProgressSync] Failed to fetch remote mistake vault:', e);
  }

  return {
    mistakes: localVault,
    bookmarks: localBookmarks,
    practiceProgress: localPractice
  };
}

let syncTimer = null;
let pendingSid = null;
let pendingPayload = null;

function scheduleUnifiedVaultSync(sid, mistakes, bookmarks, practiceProgress) {
  pendingSid = sid;
  pendingPayload = {
    student_identifier: sid,
    vault_data: {
      mistakes,
      bookmarks,
      practiceProgress,
      updated_at: new Date().toISOString()
    },
    updated_at: new Date().toISOString()
  };

  if (syncTimer) clearTimeout(syncTimer);

  syncTimer = setTimeout(() => {
    flushPendingProgressSync();
  }, 1000); // Fast 1-second debounce for responsiveness
}

/**
 * Flush any pending progress sync immediately (e.g. before page unload or visibility change)
 */
export function flushPendingProgressSync() {
  if (syncTimer) {
    clearTimeout(syncTimer);
    syncTimer = null;
  }
  if (!isSupabaseConfigured || !supabase || !pendingSid || !pendingPayload) return;

  const sid = pendingSid;
  const payload = pendingPayload;
  pendingSid = null;
  pendingPayload = null;

  supabase
    .from('student_mistake_vault')
    .upsert([payload], { onConflict: 'student_identifier' })
    .then(({ error }) => {
      if (error) {
        console.warn('[ProgressSync] Cloud upsert notice:', error.message);
      } else {
        broadcastProgressSync(sid);
      }
    })
    .catch(() => {});
}

// Mobile lifecycle safety: immediately flush pending syncs when user switches tabs or locks screen
if (typeof window !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      flushPendingProgressSync();
    }
  });
  window.addEventListener('beforeunload', () => {
    flushPendingProgressSync();
  });
}

/**
 * Push an individual question outcome from Practice Hub to cloud sync
 */
export function pushPracticeProgressUpdate(student, qid, progressEntry) {
  if (!student || !qid || !progressEntry) return;
  const sid = getEffectiveStudentId(student.id || student.admission_no || student.email || student.username);
  if (!sid || sid === 'default_student') return;

  const localPractice = getLocalPracticeProgress(sid);
  const existing = localPractice[qid] || {};

  localPractice[qid] = {
    ...existing,
    ...progressEntry,
    attempted: true,
    lastAttemptedAt: progressEntry.lastAttemptedAt || new Date().toISOString()
  };

  // Persist locally
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(`${LOCAL_STORAGE_PRACTICE_PREFIX}_${sid}`, JSON.stringify(localPractice));
      localStorage.setItem(`gate_ag_pyq_progress_${sid}`, JSON.stringify(localPractice));
      localStorage.setItem(`gate_ag_qbank_progress_${sid}`, JSON.stringify(localPractice));
    }
  } catch (e) {}

  const localVault = getMistakeVault(sid);
  const localBookmarks = getLocalBookmarks(sid);
  scheduleUnifiedVaultSync(sid, localVault, localBookmarks, localPractice);
}

/**
 * Push updated bookmarks list to cloud sync
 */
export function pushBookmarksUpdate(student, bookmarks) {
  if (!student || !Array.isArray(bookmarks)) return;
  const sid = getEffectiveStudentId(student.id || student.admission_no || student.email || student.username);
  if (!sid || sid === 'default_student') return;

  try {
    if (typeof localStorage !== 'undefined') {
      const bmKey = getStudentBookmarksKey(student);
      localStorage.setItem(bmKey, JSON.stringify(bookmarks));
      localStorage.setItem(LOCAL_STORAGE_BOOKMARKS_PREFIX, JSON.stringify(bookmarks));
    }
  } catch (e) {}

  const localVault = getMistakeVault(sid);
  const localPractice = getLocalPracticeProgress(sid);
  scheduleUnifiedVaultSync(sid, localVault, bookmarks, localPractice);
}

/**
 * Broadcast progress update event over Supabase Realtime channel
 */
export function broadcastProgressSync(sid) {
  if (!isSupabaseConfigured || !supabase || !sid) return;
  try {
    const channel = supabase.channel('gate_ag_progress_live');
    channel.send({
      type: 'broadcast',
      event: 'progress_updated',
      payload: { studentId: sid, timestamp: Date.now() }
    });
  } catch (e) {}
}

let supabaseProgressChannel = null;

/**
 * Subscribe to realtime progress sync broadcasts across all active devices
 */
export function subscribeToCloudProgressSync(student, onSync) {
  if (typeof window === 'undefined' || !student) return () => {};
  const sid = getEffectiveStudentId(student.id || student.admission_no || student.email || student.username);
  if (!sid || sid === 'default_student') return () => {};

  if (isSupabaseConfigured && supabase) {
    try {
      supabaseProgressChannel = supabase
        .channel('gate_ag_progress_live')
        .on('broadcast', { event: 'progress_updated' }, (payload) => {
          if (payload?.payload?.studentId === sid && typeof onSync === 'function') {
            onSync(payload.payload);
          }
        })
        .subscribe();
    } catch (e) {}
  }

  return () => {
    if (supabaseProgressChannel && supabase) {
      supabase.removeChannel(supabaseProgressChannel);
    }
  };
}

/**
 * Perform a full multi-device progress sync for the logged-in student.
 * Reconstitutes stats, mistake vault, bookmarks, practice progress, XP, and notifies active UI components.
 * 
 * @param {Object} student - Current logged-in student
 * @param {Object} currentLocalStats - Current React state for userStats
 * @returns {Promise<{ userStats: Object, mistakeVault: Object, bookmarks: Array, practiceProgress: Object, xpPoints: number|null, synced: boolean }>}
 */
export async function syncStudentCloudData(student, currentLocalStats = null) {
  if (!student) {
    return {
      userStats: currentLocalStats || { attempted: [], correct: [], testHistory: [] },
      mistakeVault: getMistakeVault(),
      bookmarks: getLocalBookmarks(),
      practiceProgress: getLocalPracticeProgress(),
      xpPoints: null,
      synced: false
    };
  }

  const sid = getEffectiveStudentId(student.id || student.admission_no || student.email || student.username);

  try {
    // 1. Fetch fresh XP directly from Supabase students table
    let freshXP = typeof student.xp_points === 'number' ? student.xp_points : null;
    let freshBreakXP = typeof student.break_xp === 'number' ? student.break_xp : null;

    if (isSupabaseConfigured && supabase && sid && sid !== 'default_student') {
      try {
        const { data: dbStudent } = await supabase
          .from('students')
          .select('xp_points, break_xp')
          .eq('id', sid)
          .maybeSingle();

        if (dbStudent) {
          if (typeof dbStudent.xp_points === 'number') {
            freshXP = Number(dbStudent.xp_points);
          }
          if (typeof dbStudent.break_xp === 'number') {
            freshBreakXP = Number(dbStudent.break_xp);
          }
        }
      } catch (e) {}
    }

    // Persist latest XP to local storage and active session
    if (typeof localStorage !== 'undefined') {
      if (typeof freshXP === 'number') {
        localStorage.setItem('gate_ag_student_xp_data', String(freshXP));
      }
      if (typeof freshBreakXP === 'number') {
        localStorage.setItem('gate_ag_break_xp', String(freshBreakXP));
      }
      try {
        const rawSession = localStorage.getItem('gate_ag_prep_session_token');
        if (rawSession) {
          const session = JSON.parse(rawSession);
          if (session?.student) {
            if (typeof freshXP === 'number') session.student.xp_points = freshXP;
            if (typeof freshBreakXP === 'number') session.student.break_xp = freshBreakXP;
            localStorage.setItem('gate_ag_prep_session_token', JSON.stringify(session));
          }
        }
      } catch (e) {}
    }

    // 2. Fetch and rebuild question stats, mistake vault, bookmarks & practice progress
    const [rebuiltStats, cloudVaultData] = await Promise.all([
      fetchAndRebuildStudentStats(student, currentLocalStats),
      fetchAndMergeMistakeVault(student)
    ]);

    const mistakes = cloudVaultData?.mistakes || cloudVaultData || {};
    const bookmarks = Array.isArray(cloudVaultData?.bookmarks) ? cloudVaultData.bookmarks : getLocalBookmarks(sid);
    const practiceProgress = cloudVaultData?.practiceProgress || getLocalPracticeProgress(sid);

    // 3. Dispatch global custom event for reactive UI updates across all components
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('gate_ag_progress_synced', {
        detail: {
          student: {
            ...student,
            ...(typeof freshXP === 'number' ? { xp_points: freshXP } : {}),
            ...(typeof freshBreakXP === 'number' ? { break_xp: freshBreakXP } : {})
          },
          userStats: rebuiltStats,
          mistakeVault: mistakes,
          bookmarks,
          practiceProgress,
          xpPoints: freshXP
        }
      }));
    }

    return {
      userStats: rebuiltStats,
      mistakeVault: mistakes,
      bookmarks,
      practiceProgress,
      xpPoints: freshXP,
      synced: true
    };
  } catch (err) {
    console.warn('[ProgressSync] Cloud data sync error:', err);
    return {
      userStats: currentLocalStats || { attempted: [], correct: [], testHistory: [] },
      mistakeVault: getMistakeVault(),
      bookmarks: getLocalBookmarks(),
      practiceProgress: getLocalPracticeProgress(),
      xpPoints: null,
      synced: false
    };
  }
}

