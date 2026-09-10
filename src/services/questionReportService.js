import { supabase, isSupabaseConfigured } from './supabaseClient.js';

export const LOCAL_STORAGE_REPORTS_KEY = 'gate_ag_question_reports';

export const WHATSAPP_SUPPORT_NUMBER = '917206283166';
export const WHATSAPP_SECONDARY_NUMBER = '919812203728';

export const ISSUE_TYPES = [
  'Wrong Answer Key',
  'Wrong Solution / Explanation',
  'Typographical Error',
  'Ambiguous Question Statement',
  'Broken or Missing Image / Diagram',
  'Incorrect Topic or Subject Classification',
  'Incorrect Year or Question Type',
  'Other Error'
];

/**
 * Generate a pre-filled WhatsApp direct reporting URL
 */
export function generateWhatsAppReportUrl({
  questionId = 'UNKNOWN',
  paperTitle = 'GATE AG Practice',
  section = '',
  issueType = 'Typographical Error',
  description = '',
  studentName = ''
}) {
  const lines = [
    '🚨 *GATE AG PREP — Question Issue Report*',
    '',
    `📌 *Question ID:* ${questionId}`,
    `📄 *Paper / Context:* ${paperTitle}`,
    section ? `📂 *Section:* ${section}` : null,
    `⚠️ *Issue Category:* ${issueType}`,
    studentName ? `👤 *Reported By:* ${studentName}` : '👤 *Reported By:* GATE Aspirant',
    '',
    '📝 *Problem Description / Details:*',
    description.trim() || '(Please specify the correction needed)',
    '',
    '🌐 _Submitted via GATE AG Prep Web Platform_'
  ].filter(Boolean);

  const text = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${WHATSAPP_SUPPORT_NUMBER}?text=${text}`;
}

/**
 * Submit a question issue report (Instant Local + Fast Non-Blocking Remote Sync)
 */
export async function submitQuestionReport(reportData) {
  const channel = reportData.channel || reportData.source || 'portal';
  const reportPayload = {
    id: 'rep_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8),
    question_id: reportData.questionId || reportData.question_id || 'UNKNOWN',
    paper_title: reportData.paperTitle || reportData.paper_title || 'Practice Session',
    question_text: (reportData.questionText || reportData.question_text || '').slice(0, 300),
    issue_type: reportData.issueType || reportData.issue_type || 'Typographical Error',
    description: reportData.description || '',
    student_name: reportData.studentName || reportData.student_name || 'Anonymous Aspirant',
    student_email: reportData.studentEmail || reportData.student_email || null,
    channel: channel, // 'portal' | 'whatsapp'
    source: channel,
    status: 'pending', // 'pending' | 'reviewed' | 'resolved' | 'rejected'
    created_at: new Date().toISOString()
  };

  // 1. Instant local persistence (< 2ms)
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_REPORTS_KEY);
    const reports = raw ? JSON.parse(raw) : [];
    reports.unshift(reportPayload);
    localStorage.setItem(LOCAL_STORAGE_REPORTS_KEY, JSON.stringify(reports.slice(0, 200)));
  } catch (err) {
    console.warn('Failed to save question report locally:', err);
  }

  // 2. Non-blocking asynchronous remote sync with 350ms ceiling so the UI is never delayed
  if (isSupabaseConfigured && supabase) {
    const remotePromise = supabase
      .from('question_reports')
      .insert([reportPayload])
      .then(() => true)
      .catch(err => {
        console.warn('Could not sync report to Supabase:', err);
        return false;
      });

    try {
      await Promise.race([
        remotePromise,
        new Promise(res => setTimeout(res, 350))
      ]);
    } catch (e) {
      // Ignored
    }
  }

  return { success: true, report: reportPayload };
}

/**
 * Get all submitted reports (from local storage + remote Supabase if admin)
 */
export async function getAllQuestionReports() {
  let localReports = [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_REPORTS_KEY);
    localReports = raw ? JSON.parse(raw) : [];
  } catch (e) {}

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('question_reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data)) {
        // Merge deduplicating by id
        const map = new Map();
        localReports.forEach(r => map.set(r.id, r));
        data.forEach(r => map.set(r.id, r));
        return Array.from(map.values()).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      }
    } catch (e) {}
  }

  return localReports;
}

/**
 * Update report status (admin triage)
 */
export async function updateReportStatus(reportId, newStatus) {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_REPORTS_KEY);
    let reports = raw ? JSON.parse(raw) : [];
    reports = reports.map(r => r.id === reportId ? { ...r, status: newStatus, updated_at: new Date().toISOString() } : r);
    localStorage.setItem(LOCAL_STORAGE_REPORTS_KEY, JSON.stringify(reports));
  } catch (e) {}

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase
        .from('question_reports')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', reportId);
    } catch (e) {}
  }

  return true;
}
