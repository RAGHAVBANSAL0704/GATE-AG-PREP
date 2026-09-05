import { supabase, isSupabaseConfigured } from './supabaseClient.js';

export const LOCAL_STORAGE_TEST_ATTEMPTS_KEY = 'gate_ag_prep_test_attempts';

/**
 * Generate standard UUID v4 or random fallback
 */
export function generateUUID() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'att_' + Date.now() + '_' + Math.random().toString(36).substring(2, 11);
}

/**
 * Save a test attempt to Supabase and LocalStorage with robust offline resilience
 */
export async function saveTestAttempt(attemptData) {
  const clientAttemptId = attemptData.client_attempt_id || generateUUID();

  const attemptPayload = {
    client_attempt_id: clientAttemptId,
    student_id: attemptData.student_id || null,
    student_name: attemptData.student_name || 'Guest Student',
    admission_no: attemptData.admission_no || null,
    email: attemptData.email || null,
    mobile_number: attemptData.mobile_number || null,
    paper_title: attemptData.paper_title || 'CBT Practice Paper',
    paper_year: attemptData.paper_year ? String(attemptData.paper_year) : null,
    test_type: attemptData.test_type || 'cbt_mock',
    score: Number(attemptData.score || 0),
    total_marks: Number(attemptData.total_marks || 100),
    percentage: Number(attemptData.percentage || 0),
    accuracy_percentage: Number(attemptData.accuracy_percentage || 0),
    correct_count: Number(attemptData.correct_count || 0),
    incorrect_count: Number(attemptData.incorrect_count || 0),
    unattempted_count: Number(attemptData.unattempted_count || 0),
    total_questions: Number(attemptData.total_questions || 65),
    time_spent_seconds: Number(attemptData.time_spent_seconds || 0),
    question_responses: attemptData.question_responses || [],
    submitted_at: attemptData.submitted_at || new Date().toISOString(),
    _syncedToBackend: false
  };

  // 1. Save to Local Storage fallback array immediately
  let localAttempts = [];
  try {
    const rawLocal = localStorage.getItem(LOCAL_STORAGE_TEST_ATTEMPTS_KEY);
    localAttempts = rawLocal ? JSON.parse(rawLocal) : [];
    if (!Array.isArray(localAttempts)) localAttempts = [];
    
    // Deduplicate if already present by client_attempt_id
    const existingIdx = localAttempts.findIndex(a => a.client_attempt_id === clientAttemptId);
    if (existingIdx !== -1) {
      localAttempts[existingIdx] = attemptPayload;
    } else {
      localAttempts.unshift(attemptPayload);
    }
    localStorage.setItem(LOCAL_STORAGE_TEST_ATTEMPTS_KEY, JSON.stringify(localAttempts.slice(0, 100)));
  } catch (err) {
    console.warn("Could not save test attempt to localStorage:", err);
  }

  // 2. Insert into Supabase test_attempts table if online
  if (isSupabaseConfigured && supabase) {
    try {
      const dbPayload = { ...attemptPayload };
      delete dbPayload._syncedToBackend;
      delete dbPayload._syncError;

      const { data, error } = await supabase
        .from('test_attempts')
        .upsert([dbPayload], { onConflict: 'client_attempt_id' })
        .select();

      if (error) {
        console.warn("Supabase test_attempts upsert warning:", error.message);
        return { success: true, savedLocally: true, synced: false, client_attempt_id: clientAttemptId, error: error.message };
      }

      // Mark locally as synced
      attemptPayload._syncedToBackend = true;
      try {
        const rawLocal = localStorage.getItem(LOCAL_STORAGE_TEST_ATTEMPTS_KEY);
        if (rawLocal) {
          const list = JSON.parse(rawLocal);
          if (Array.isArray(list)) {
            const idx = list.findIndex(a => a.client_attempt_id === clientAttemptId);
            if (idx !== -1) {
              list[idx]._syncedToBackend = true;
              delete list[idx]._syncError;
              localStorage.setItem(LOCAL_STORAGE_TEST_ATTEMPTS_KEY, JSON.stringify(list));
            }
          }
        }
      } catch (e) {}

      return { success: true, savedLocally: true, synced: true, client_attempt_id: clientAttemptId, data };
    } catch (e) {
      console.warn("Supabase test_attempts exception:", e);
      return { success: true, savedLocally: true, synced: false, client_attempt_id: clientAttemptId };
    }
  }

  return { success: true, savedLocally: true, synced: false, client_attempt_id: clientAttemptId };
}

/**
 * Synchronize all pending offline test attempts to Supabase
 */
export async function syncPendingTestAttempts() {
  if (!isSupabaseConfigured || !supabase) return { syncedCount: 0, failedCount: 0 };

  try {
    const rawLocal = localStorage.getItem(LOCAL_STORAGE_TEST_ATTEMPTS_KEY);
    if (!rawLocal) return { syncedCount: 0, failedCount: 0 };

    const localAttempts = JSON.parse(rawLocal);
    if (!Array.isArray(localAttempts) || localAttempts.length === 0) return { syncedCount: 0, failedCount: 0 };

    let syncedCount = 0;
    let failedCount = 0;

    for (let i = 0; i < localAttempts.length; i++) {
      const att = localAttempts[i];
      if (!att._syncedToBackend) {
        if (!att.client_attempt_id) {
          att.client_attempt_id = generateUUID();
        }
        const dbPayload = { ...att };
        delete dbPayload._syncedToBackend;
        delete dbPayload._syncError;

        try {
          const { error } = await supabase
            .from('test_attempts')
            .upsert([dbPayload], { onConflict: 'client_attempt_id' });

          if (!error) {
            att._syncedToBackend = true;
            delete att._syncError;
            syncedCount++;
          } else {
            att._syncError = error.message;
            failedCount++;
          }
        } catch (err) {
          att._syncError = err?.message || 'Sync error';
          failedCount++;
        }
      }
    }

    localStorage.setItem(LOCAL_STORAGE_TEST_ATTEMPTS_KEY, JSON.stringify(localAttempts));
    return { syncedCount, failedCount };
  } catch (e) {
    console.warn("Error syncing pending test attempts:", e);
    return { syncedCount: 0, failedCount: 0 };
  }
}

/**
 * Fetch past test attempts for a student, seamlessly merging Supabase and unsynced local attempts
 */
export async function getStudentTestAttempts(studentIdentifier) {
  if (!studentIdentifier) return [];

  const cleanId = String(studentIdentifier).trim();
  if (!cleanId) return [];

  let cloudAttempts = [];

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('test_attempts')
        .select('*')
        .or(`admission_no.eq.${cleanId},email.eq.${cleanId},student_name.ilike.%${cleanId}%`)
        .order('submitted_at', { ascending: false });

      if (!error && Array.isArray(data)) {
        cloudAttempts = data;
      }
    } catch (e) {
      console.warn("Error fetching Supabase test attempts:", e);
    }
  }

  // Load Local Storage attempts
  let localAttempts = [];
  try {
    const rawLocal = localStorage.getItem(LOCAL_STORAGE_TEST_ATTEMPTS_KEY);
    if (rawLocal) {
      const parsed = JSON.parse(rawLocal);
      if (Array.isArray(parsed)) {
        const lowerId = cleanId.toLowerCase();
        localAttempts = parsed.filter(a => {
          if (lowerId === 'guest' || lowerId === 'all') {
            return true;
          }
          const adm = (a.admission_no || '').trim().toLowerCase();
          const em = (a.email || '').trim().toLowerCase();
          const name = (a.student_name || '').trim().toLowerCase();
          const sid = (a.student_id || '').trim().toLowerCase();
          return (adm && adm === lowerId) || 
                 (em && em === lowerId) || 
                 (sid && sid === lowerId) ||
                 (name && (name === lowerId || name.includes(lowerId)));
        });
      }
    }
  } catch (e) {}

  // Merge & Deduplicate by client_attempt_id or (submitted_at + paper_title)
  const mergedMap = new Map();
  cloudAttempts.forEach(ca => {
    const key = ca.client_attempt_id || (ca.submitted_at + '_' + (ca.paper_title || ''));
    mergedMap.set(key, { ...ca, _syncedToBackend: true });
  });

  localAttempts.forEach(la => {
    const key = la.client_attempt_id || (la.submitted_at + '_' + (la.paper_title || ''));
    if (!mergedMap.has(key)) {
      mergedMap.set(key, la);
    }
  });

  const mergedList = Array.from(mergedMap.values());
  mergedList.sort((a, b) => new Date(b.submitted_at || 0) - new Date(a.submitted_at || 0));
  return mergedList;
}

/**
 * Initialize automatic background sync on network reconnect
 */
export function initAutoSyncOnReconnect() {
  if (typeof window === 'undefined') return;

  const handleOnline = () => {
    console.info('[SyncService] Network restored. Synchronizing pending test attempts...');
    syncPendingTestAttempts();
  };

  window.addEventListener('online', handleOnline);
  window.addEventListener('app-online', handleOnline);

  return () => {
    window.removeEventListener('online', handleOnline);
    window.removeEventListener('app-online', handleOnline);
  };
}
