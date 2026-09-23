import { supabase, isSupabaseConfigured } from './supabaseClient.js';
import { saveToIDB, getAllFromIDB } from '../utils/indexedDB.js';
import { recordLiveAction } from './liveStatisticsService.js';

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
 * Save a test attempt to Supabase, IndexedDB and LocalStorage with robust offline resilience
 */
export async function saveTestAttempt(attemptData) {
  const clientAttemptId = attemptData.client_attempt_id || generateUUID();

  const rawScore = Number(attemptData.score || 0);
  const totalMarks = Math.max(1, Number(attemptData.total_marks || 100));
  // In official GATE AG: Max score is totalMarks (100), lowest possible on full incorrect 1M/2M is -33.33
  const validatedScore = Math.min(totalMarks, Math.max(-totalMarks, rawScore));

  const totalQuestions = Math.max(1, Math.min(100, Number(attemptData.total_questions || 65)));
  const correctCount = Math.max(0, Math.min(totalQuestions, Number(attemptData.correct_count || 0)));
  const incorrectCount = Math.max(0, Math.min(totalQuestions - correctCount, Number(attemptData.incorrect_count || 0)));
  const unattemptedCount = Math.max(0, totalQuestions - (correctCount + incorrectCount));

  const rawPct = attemptData.percentage !== undefined ? Number(attemptData.percentage) : (validatedScore / totalMarks) * 100;
  const validatedPercentage = Math.max(-100, Math.min(100, rawPct));

  const totalAttempted = correctCount + incorrectCount;
  const rawAccuracy = attemptData.accuracy_percentage !== undefined ? Number(attemptData.accuracy_percentage) : (totalAttempted > 0 ? (correctCount / totalAttempted) * 100 : 0);
  const validatedAccuracy = Math.max(0, Math.min(100, rawAccuracy));

  const attemptPayload = {
    client_attempt_id: clientAttemptId,
    student_id: attemptData.student_id || null,
    student_name: (attemptData.student_name || 'Guest Student').slice(0, 100),
    admission_no: attemptData.admission_no || null,
    email: attemptData.email || null,
    mobile_number: attemptData.mobile_number || null,
    paper_title: (attemptData.paper_title || 'CBT Practice Paper').slice(0, 150),
    paper_year: attemptData.paper_year ? String(attemptData.paper_year).slice(0, 10) : null,
    test_type: attemptData.test_type || 'cbt_mock',
    score: Number(validatedScore.toFixed(2)),
    total_marks: Number(totalMarks.toFixed(2)),
    percentage: Number(validatedPercentage.toFixed(2)),
    accuracy_percentage: Number(validatedAccuracy.toFixed(2)),
    correct_count: correctCount,
    incorrect_count: incorrectCount,
    unattempted_count: unattemptedCount,
    total_questions: totalQuestions,
    time_spent_seconds: Math.max(0, Math.min(86400, Number(attemptData.time_spent_seconds || 0))),
    question_responses: Array.isArray(attemptData.question_responses) ? attemptData.question_responses : [],
    submitted_at: attemptData.submitted_at || new Date().toISOString(),
    _syncedToBackend: false
  };

  // 1. Asynchronously save complete record with all individual question responses to IndexedDB
  try {
    saveToIDB('test_attempts', { id: clientAttemptId, ...attemptPayload });
  } catch (idbErr) {
    console.warn("IndexedDB attempt save warning:", idbErr);
  }

  // Record live telemetry activity
  try {
    recordLiveAction({
      type: 'mock_completed',
      studentName: attemptPayload.student_name,
      collegeName: attemptData.college_name || 'COAET CCS HAU Hisar',
      score: attemptPayload.score,
      count: attemptPayload.correct_count + attemptPayload.incorrect_count,
      section: attemptPayload.paper_title || 'CBT Mock Test',
      details: `Completed ${attemptPayload.paper_title} (Score: ${attemptPayload.score.toFixed(2)} / ${attemptPayload.total_marks.toFixed(2)})`
    });
  } catch (e) {}

  // 2. Save to Local Storage fallback array immediately
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

      // Compact question responses to minimize PostgreSQL row storage footprint
      if (Array.isArray(dbPayload.question_responses)) {
        dbPayload.question_responses = dbPayload.question_responses.map(qr => ({
          qid: qr.question_id || qr.id || qr.qid,
          qnum: qr.qnum,
          sec: qr.section,
          ans: qr.user_answer ?? qr.ans,
          key: qr.correct_answer ?? qr.key,
          ok: qr.is_correct ?? qr.ok,
          m: qr.marks_awarded ?? qr.m ?? 0,
          t: qr.time_spent_seconds ?? qr.t ?? 0
        }));
      }

      const { data, error } = await supabase
        .from('test_attempts')
        .upsert([dbPayload], { onConflict: 'client_attempt_id' });

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
 * Re-attribute any unassigned or guest test attempts to newly registered or logged-in student
 */
export async function associateGuestAttemptsWithStudent(student) {
  if (!student) return 0;
  let updatedCount = 0;

  const targetStudentId = student.id || null;
  const targetName = student.full_name || student.username || 'Candidate';
  const targetAdmNo = student.admission_no || null;
  const targetEmail = student.email || null;
  const targetMobile = student.mobile_number || null;

  // 1. Update localStorage attempts
  try {
    const rawLocal = localStorage.getItem(LOCAL_STORAGE_TEST_ATTEMPTS_KEY);
    if (rawLocal) {
      const localAttempts = JSON.parse(rawLocal);
      if (Array.isArray(localAttempts)) {
        localAttempts.forEach(att => {
          if (!att.student_id || att.student_name === 'Guest Student' || att.student_name === 'Candidate') {
            att.student_id = targetStudentId || att.student_id;
            att.student_name = targetName;
            if (targetAdmNo) att.admission_no = targetAdmNo;
            if (targetEmail) att.email = targetEmail;
            if (targetMobile) att.mobile_number = targetMobile;
            att._syncedToBackend = false;
            updatedCount++;
          }
        });
        localStorage.setItem(LOCAL_STORAGE_TEST_ATTEMPTS_KEY, JSON.stringify(localAttempts));
      }
    }
  } catch (e) {
    console.warn('Error associating localStorage guest attempts:', e);
  }

  // 2. Update IndexedDB attempts
  try {
    const idbAttempts = await getAllFromIDB('test_attempts');
    if (Array.isArray(idbAttempts)) {
      for (const att of idbAttempts) {
        if (!att.student_id || att.student_name === 'Guest Student' || att.student_name === 'Candidate') {
          att.student_id = targetStudentId || att.student_id;
          att.student_name = targetName;
          if (targetAdmNo) att.admission_no = targetAdmNo;
          if (targetEmail) att.email = targetEmail;
          if (targetMobile) att.mobile_number = targetMobile;
          att._syncedToBackend = false;
          await saveToIDB('test_attempts', att);
        }
      }
    }
  } catch (e) {
    console.warn('Error associating IndexedDB guest attempts:', e);
  }

  // 3. Immediately trigger background synchronization to Supabase
  if (updatedCount > 0) {
    syncPendingTestAttempts();
  }

  return updatedCount;
}

/**
 * Fetch past test attempts for a student, seamlessly merging Supabase, IndexedDB, and local attempts
 */
export async function getStudentTestAttempts(studentIdentifier) {
  if (!studentIdentifier) return [];

  let cleanId = '';
  const searchIds = new Set();

  if (typeof studentIdentifier === 'object' && studentIdentifier !== null) {
    if (studentIdentifier.id) searchIds.add(String(studentIdentifier.id).trim());
    if (studentIdentifier.admission_no) searchIds.add(String(studentIdentifier.admission_no).trim());
    if (studentIdentifier.email) searchIds.add(String(studentIdentifier.email).trim());
    if (studentIdentifier.username) searchIds.add(String(studentIdentifier.username).trim());
    if (studentIdentifier.full_name) searchIds.add(String(studentIdentifier.full_name).trim());
    cleanId = studentIdentifier.id || studentIdentifier.admission_no || studentIdentifier.email || studentIdentifier.username || studentIdentifier.full_name || '';
  } else {
    cleanId = String(studentIdentifier || '').trim();
    if (cleanId) searchIds.add(cleanId);
  }

  if (!cleanId && searchIds.size === 0) return [];

  let cloudAttempts = [];

  if (isSupabaseConfigured && supabase) {
    try {
      const orConditions = [];
      searchIds.forEach(id => {
        if (!id) return;
        orConditions.push(`student_id.eq.${id}`);
        orConditions.push(`admission_no.eq.${id}`);
        orConditions.push(`email.eq.${id}`);
        orConditions.push(`student_name.ilike.%${id}%`);
      });

      if (orConditions.length > 0) {
        const { data, error } = await supabase
          .from('test_attempts')
          .select('*')
          .or(orConditions.join(','))
          .order('submitted_at', { ascending: false });

        if (!error && Array.isArray(data)) {
          cloudAttempts = data;
        }
      }
    } catch (e) {
      console.warn("Error fetching Supabase test attempts:", e);
    }
  }

  // Load IndexedDB deep attempts
  let idbAttempts = [];
  try {
    idbAttempts = await getAllFromIDB('test_attempts');
    if (!Array.isArray(idbAttempts)) idbAttempts = [];
  } catch (e) {
    idbAttempts = [];
  }

  // Load Local Storage attempts
  let localAttempts = [];
  try {
    const rawLocal = localStorage.getItem(LOCAL_STORAGE_TEST_ATTEMPTS_KEY);
    if (rawLocal) {
      const parsed = JSON.parse(rawLocal);
      if (Array.isArray(parsed)) {
        localAttempts = parsed;
      }
    }
  } catch (e) {}

  const lowerCleanId = cleanId.toLowerCase();
  const searchIdArray = Array.from(searchIds).map(s => s.toLowerCase());

  const filterByStudent = (a) => {
    if (lowerCleanId === 'guest' || lowerCleanId === 'all') {
      return true;
    }
    const adm = (a.admission_no || '').trim().toLowerCase();
    const em = (a.email || '').trim().toLowerCase();
    const sid = (a.student_id || '').trim().toLowerCase();
    const name = (a.student_name || '').trim().toLowerCase();

    for (const target of searchIdArray) {
      if ((adm && adm === target) || (em && em === target) || (sid && sid === target) || (name && (name === target || name.includes(target)))) {
        return true;
      }
    }
    return false;
  };

  // Merge & Deduplicate by client_attempt_id or (submitted_at + paper_title)
  const mergedMap = new Map();
  cloudAttempts.forEach(ca => {
    const key = ca.client_attempt_id || (ca.submitted_at + '_' + (ca.paper_title || ''));
    mergedMap.set(key, { ...ca, _syncedToBackend: true });
  });

  // Merge IndexedDB attempts
  idbAttempts.filter(filterByStudent).forEach(ia => {
    const key = ia.client_attempt_id || (ia.submitted_at + '_' + (ia.paper_title || ''));
    if (!mergedMap.has(key)) {
      mergedMap.set(key, ia);
    }
  });

  // Merge LocalStorage attempts
  localAttempts.filter(filterByStudent).forEach(la => {
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
