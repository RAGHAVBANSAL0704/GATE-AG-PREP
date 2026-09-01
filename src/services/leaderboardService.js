import { supabase, isSupabaseConfigured } from './supabaseClient.js';

const LOCAL_STORAGE_XP_KEY = 'gate_ag_student_xp_data';
const LOCAL_STORAGE_USERS_KEY = 'gate_ag_prep_mock_users';

// Local Cross-Tab Broadcast Channel
let localXPBroadcast = null;
try {
  if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    localXPBroadcast = new BroadcastChannel('gate_ag_xp_channel');
  }
} catch (e) {}

// Supabase Realtime Channel
let supabaseXPChannel = null;

/**
 * Get active student info from session
 */
function getActiveStudentSession() {
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

/**
 * Get local Academic Test XP (Question attempts, mock tests, accuracy bonuses)
 * Ensures points are cumulative and never reset
 */
export function getLocalAcademicXP() {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_XP_KEY);
    const sessionStudent = getActiveStudentSession();
    const sessionXP = Number(sessionStudent?.xp_points || 0);
    const localVal = saved ? parseFloat(saved) : 0;
    
    // Always preserve highest non-reset accumulated value
    const bestXP = Math.max(localVal, sessionXP);
    return isNaN(bestXP) ? 0 : Number(bestXP.toFixed(1));
  } catch (e) {
    return 0;
  }
}

/**
 * Calculate XP Points based on real performance rules:
 * - +1 XP per Correct Answer
 * - +0.5 XP per Incorrect Attempt
 * - 0 XP for Skipped
 * - +15 XP Bonus for Completing Full Mock
 * - +5 XP Bonus for every 15 questions completed
 */
export function calculateAttemptXP({ correctCount = 0, incorrectCount = 0, totalQuestions = 65, isFullMock = false }) {
  const correctXP = correctCount * 1;
  const incorrectXP = incorrectCount * 0.5;
  
  const totalCompletedQs = correctCount + incorrectCount;
  const milestoneBonus15Qs = Math.floor(totalCompletedQs / 15) * 5;
  const fullMockBonus = isFullMock ? 15 : 0;

  const totalEarnedXP = correctXP + incorrectXP + milestoneBonus15Qs + fullMockBonus;

  return {
    totalEarnedXP: Number(totalEarnedXP.toFixed(1)),
    correctXP,
    incorrectXP,
    milestoneBonus15Qs,
    fullMockBonus
  };
}

/**
 * Award Academic Test XP to a student and update Supabase / LocalStorage
 */
export async function awardStudentXP(studentId, xpEarned) {
  if (!xpEarned || xpEarned <= 0) return;

  let newTotalXP = 0;

  // Local storage update for Academic Test XP
  try {
    const currentLocalXP = getLocalAcademicXP();
    newTotalXP = Number((currentLocalXP + xpEarned).toFixed(1));
    localStorage.setItem(LOCAL_STORAGE_XP_KEY, String(newTotalXP));

    // Update active session student object
    const rawSession = localStorage.getItem('gate_ag_prep_session_token');
    if (rawSession) {
      const session = JSON.parse(rawSession);
      if (session?.student) {
        session.student.xp_points = newTotalXP;
        localStorage.setItem('gate_ag_prep_session_token', JSON.stringify(session));
      }
    }
  } catch (e) {
    console.warn("Could not save local Academic XP:", e);
  }

  // Cross-Tab BroadcastChannel dispatch
  if (localXPBroadcast) {
    try {
      localXPBroadcast.postMessage({
        type: 'ACADEMIC_XP_AWARDED',
        studentId,
        xpEarned,
        newTotalXP,
        timestamp: Date.now()
      });
    } catch (e) {}
  }

  // Supabase update for Academic Test XP & Live Broadcast
  if (isSupabaseConfigured && supabase && studentId) {
    try {
      const { data: student } = await supabase
        .from('students')
        .select('xp_points')
        .eq('id', studentId)
        .single();

      const currentXP = Number(student?.xp_points || 0);
      const updatedDBXP = Number((Math.max(currentXP, newTotalXP)).toFixed(1));

      await supabase
        .from('students')
        .update({ xp_points: updatedDBXP })
        .eq('id', studentId);

      // Broadcast over Supabase Realtime channel across devices
      const channel = supabase.channel('gate_ag_xp_live');
      channel.send({
        type: 'broadcast',
        event: 'xp_updated',
        payload: { studentId, type: 'academic', xp_points: updatedDBXP }
      });
    } catch (err) {
      console.warn("Supabase Academic XP update warning:", err);
    }
  }
}

/**
 * Subscribe to live Academic XP updates across tabs and devices
 */
export function subscribeToLiveAcademicXP(onXPUpdate) {
  if (typeof window === 'undefined') return () => {};

  // 1. Cross-Tab Listener
  const handleLocalMessage = (event) => {
    if (event.data?.type === 'ACADEMIC_XP_AWARDED' && typeof onXPUpdate === 'function') {
      onXPUpdate(event.data);
    }
  };

  if (localXPBroadcast) {
    localXPBroadcast.addEventListener('message', handleLocalMessage);
  }

  // 2. Supabase Realtime Multi-Device Listener
  if (isSupabaseConfigured && supabase) {
    try {
      supabaseXPChannel = supabase
        .channel('gate_ag_xp_live')
        .on('broadcast', { event: 'xp_updated' }, (payload) => {
          if (payload.payload && typeof onXPUpdate === 'function') {
            onXPUpdate(payload.payload);
          }
        })
        .subscribe();
    } catch (e) {}
  }

  return () => {
    if (localXPBroadcast) {
      localXPBroadcast.removeEventListener('message', handleLocalMessage);
    }
    if (supabaseXPChannel && supabase) {
      supabase.removeChannel(supabaseXPChannel);
    }
  };
}

/**
 * Fetch REAL Academic Leaderboard Rankings (Mock test & question attempt XP)
 */
export async function fetchLeaderboardRankings() {
  const student = getActiveStudentSession();
  const currentAcademicXP = getLocalAcademicXP();

  if (isSupabaseConfigured && supabase) {
    try {
      // 1. Fetch real registered students
      const { data: students, error: studentErr } = await supabase
        .from('students')
        .select('id, full_name, admission_no, college_name, email, mobile_number, xp_points, created_at');

      if (!studentErr && students && students.length > 0) {
        // 2. Fetch real test attempts if available
        let attemptsMap = {};
        try {
          const { data: attempts } = await supabase.from('test_attempts').select('*');
          if (attempts && attempts.length > 0) {
            attempts.forEach(att => {
              const key = att.student_id || att.admission_no || att.email || att.student_name;
              if (!key) return;
              if (!attemptsMap[key]) {
                attemptsMap[key] = { count: 0, correct: 0, totalAttemptedQs: 0, totalScore: 0 };
              }
              attemptsMap[key].count += 1;
              attemptsMap[key].correct += Number(att.correct_count || 0);
              attemptsMap[key].totalAttemptedQs += (Number(att.correct_count || 0) + Number(att.incorrect_count || 0));
              attemptsMap[key].totalScore += Number(att.score || 0);
            });
          }
        } catch (e) {}

        // 3. Compute real metrics for each registered student
        const realRankings = students.map(s => {
          const key = s.id || s.admission_no || s.email || s.full_name;
          const attStats = attemptsMap[key] || attemptsMap[s.full_name] || attemptsMap[s.admission_no] || attemptsMap[s.email] || { count: 0, correct: 0, totalAttemptedQs: 0, totalScore: 0 };

          const realXP = Number(s.xp_points || 0);
          const accuracy = attStats.totalAttemptedQs > 0 
            ? ((attStats.correct / attStats.totalAttemptedQs) * 100).toFixed(1) 
            : '0.0';

          return {
            id: s.id,
            name: s.full_name || 'Aspirant',
            admissionNo: s.admission_no || 'External',
            college: s.college_name || 'COAET CCS HAU Hisar',
            xp: realXP,
            accuracy: accuracy,
            testsTaken: attStats.count
          };
        });

        realRankings.sort((a, b) => b.xp - a.xp);
        return realRankings.map((r, i) => ({ rank: i + 1, ...r }));
      }
    } catch (err) {
      console.warn("Falling back to local Academic XP rankings:", err);
    }
  }

  // Fallback local Academic XP rankings
  const localList = [];
  try {
    const savedUsersRaw = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
    if (savedUsersRaw) {
      const users = JSON.parse(savedUsersRaw);
      if (Array.isArray(users)) {
        users.forEach(u => {
          localList.push({
            id: u.id || u.email,
            name: u.full_name || 'Registered Aspirant',
            admissionNo: u.admission_no || '2024AE',
            college: u.college_name || 'Agricultural Engineering College',
            xp: Number(u.xp_points || 0),
            accuracy: '75.0',
            testsTaken: 2
          });
        });
      }
    }
  } catch (e) {}

  const meIdx = localList.findIndex(item => item.name.toLowerCase() === student.full_name?.toLowerCase());
  if (meIdx !== -1) {
    localList[meIdx].xp = Math.max(localList[meIdx].xp, currentAcademicXP);
  } else {
    localList.push({
      id: student.id || 'usr_current',
      name: student.full_name || 'GATE AG Aspirant',
      admissionNo: student.admission_no || 'COAET-2024',
      college: student.college_name || 'COAET CCS HAU Hisar',
      xp: currentAcademicXP,
      accuracy: '0.0',
      testsTaken: 0
    });
  }

  localList.sort((a, b) => b.xp - a.xp);
  return localList.map((r, i) => ({ rank: i + 1, ...r }));
}
