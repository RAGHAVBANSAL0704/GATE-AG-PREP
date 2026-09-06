import { supabase, isSupabaseConfigured } from './supabaseClient.js';

export const LOCAL_STORAGE_REPORTS_KEY = 'gate_ag_question_reports';

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
 * Submit a question issue report
 */
export async function submitQuestionReport(reportData) {
  const reportPayload = {
    id: 'rep_' + Date.now() + '_' + Math.random().toString(36).substring(2, 8),
    question_id: reportData.questionId || 'UNKNOWN',
    paper_title: reportData.paperTitle || 'Practice Session',
    question_text: (reportData.questionText || '').slice(0, 300),
    issue_type: reportData.issueType || 'Typographical Error',
    description: reportData.description || '',
    student_name: reportData.studentName || 'Anonymous Aspirant',
    student_email: reportData.studentEmail || null,
    status: 'pending', // 'pending' | 'reviewed' | 'resolved' | 'rejected'
    created_at: new Date().toISOString()
  };

  // 1. Save locally to localStorage queue
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_REPORTS_KEY);
    const reports = raw ? JSON.parse(raw) : [];
    reports.unshift(reportPayload);
    localStorage.setItem(LOCAL_STORAGE_REPORTS_KEY, JSON.stringify(reports.slice(0, 200)));
  } catch (err) {
    console.warn('Failed to save question report locally:', err);
  }

  // 2. Push to Supabase if online and configured
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase
        .from('question_reports')
        .insert([reportPayload]);

      if (!error) {
        return { success: true, report: reportPayload, synced: true };
      }
    } catch (e) {
      console.warn('Could not sync report to Supabase:', e);
    }
  }

  return { success: true, report: reportPayload, synced: false };
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
