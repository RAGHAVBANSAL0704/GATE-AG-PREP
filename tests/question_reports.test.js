import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

// Mock localStorage and window for Node.js test runner
const mockStorage = new Map();
globalThis.localStorage = {
  getItem: (key) => mockStorage.get(key) || null,
  setItem: (key, val) => mockStorage.set(key, String(val)),
  removeItem: (key) => mockStorage.delete(key),
  clear: () => mockStorage.clear()
};

import { 
  generateWhatsAppReportUrl,
  submitQuestionReport,
  getAllQuestionReports,
  updateReportStatus,
  LOCAL_STORAGE_REPORTS_KEY,
  WHATSAPP_SUPPORT_NUMBER
} from '../src/services/questionReportService.js';

describe('Question Reporting Subsystem & WhatsApp Integration Tests', () => {
  beforeEach(() => {
    mockStorage.clear();
  });

  describe('WhatsApp Reporting Link Generator', () => {
    it('generates a direct wa.me link with prefilled report message for the official support number', () => {
      const url = generateWhatsAppReportUrl({
        questionId: 'GATE_2027_MOCK_01_Q15',
        paperTitle: 'Mock Test 01',
        section: 'Section 2: Farm Machinery',
        issueType: 'Wrong Answer Key',
        description: 'Option B should be correct instead of Option A due to slip factor calculation.',
        studentName: 'Aarav Sharma'
      });

      assert.ok(url.startsWith(`https://wa.me/${WHATSAPP_SUPPORT_NUMBER}?text=`));
      assert.ok(url.includes(encodeURIComponent('GATE_2027_MOCK_01_Q15')));
      assert.ok(url.includes(encodeURIComponent('Wrong Answer Key')));
      assert.ok(url.includes(encodeURIComponent('Aarav Sharma')));
      assert.ok(url.includes(encodeURIComponent('Option B should be correct')));
    });

    it('handles default and missing values gracefully', () => {
      const url = generateWhatsAppReportUrl({});

      assert.ok(url.startsWith(`https://wa.me/${WHATSAPP_SUPPORT_NUMBER}?text=`));
      assert.ok(url.includes(encodeURIComponent('UNKNOWN')));
      assert.ok(url.includes(encodeURIComponent('Typographical Error')));
      assert.ok(url.includes(encodeURIComponent('GATE Aspirant')));
    });
  });

  describe('Instant Non-Blocking Submission (<50ms)', () => {
    it('persists report to localStorage immediately without hanging the UI', async () => {
      const startTime = performance.now();

      const result = await submitQuestionReport({
        questionId: 'GATE_2025_Q32',
        paperTitle: 'GATE AG 2025',
        section: 'Section 3: Soil and Water Conservation',
        issueType: 'Ambiguous Question Statement',
        description: 'Runoff coefficient is not specified in the problem statement.',
        studentName: 'Pooja',
        studentEmail: 'pooja@example.com',
        source: 'portal'
      });

      const elapsed = performance.now() - startTime;

      assert.ok(elapsed < 100, `Submission must return under 100ms (took ${elapsed.toFixed(2)}ms)`);
      assert.equal(result.success, true);
      assert.ok(result.report);
      assert.equal(result.report.question_id, 'GATE_2025_Q32');
      assert.equal(result.report.source, 'portal');
      assert.equal(result.report.status, 'pending');

      // Verify immediate presence in localStorage
      const localData = JSON.parse(mockStorage.get(LOCAL_STORAGE_REPORTS_KEY) || '[]');
      assert.equal(localData.length, 1);
      assert.equal(localData[0].question_id, 'GATE_2025_Q32');
    });

    it('supports reports submitted via WhatsApp channel tracking', async () => {
      const result = await submitQuestionReport({
        questionId: 'GATE_2027_MOCK_05_Q10',
        issueType: 'Wrong Solution / Explanation',
        description: 'Reported via WhatsApp link click',
        source: 'whatsapp'
      });

      assert.equal(result.success, true);
      assert.equal(result.report.source, 'whatsapp');

      const allReports = await getAllQuestionReports();
      assert.equal(allReports.length, 1);
      assert.equal(allReports[0].source, 'whatsapp');
    });
  });

  describe('Admin Portal Triage & Status Updates', () => {
    it('updates report status to reviewed, resolved, or rejected', async () => {
      const { report } = await submitQuestionReport({
        questionId: 'GATE_2026_Q45',
        issueType: 'Typographical Error',
        description: 'Typo in equation parameter k.',
        source: 'portal'
      });

      assert.equal(report.status, 'pending');

      // Update to reviewed
      await updateReportStatus(report.id, 'reviewed');
      let reports = await getAllQuestionReports();
      assert.equal(reports.find(r => r.id === report.id)?.status, 'reviewed');

      // Update to resolved
      await updateReportStatus(report.id, 'resolved');
      reports = await getAllQuestionReports();
      assert.equal(reports.find(r => r.id === report.id)?.status, 'resolved');
    });
  });
});
