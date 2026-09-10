import React, { useState } from 'react';
import { Flag, X, CheckCircle2, AlertTriangle, Send, MessageCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import { 
  ISSUE_TYPES, 
  submitQuestionReport, 
  generateWhatsAppReportUrl, 
  WHATSAPP_SUPPORT_NUMBER 
} from '../services/questionReportService';

export default function QuestionReportModal({
  isOpen,
  onClose,
  question,
  paperTitle = 'GATE AG Practice',
  currentStudent = null
}) {
  const [issueType, setIssueType] = useState(ISSUE_TYPES[0]);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedChannel, setSubmittedChannel] = useState('portal'); // 'portal' | 'whatsapp'

  if (!isOpen || !question) return null;

  // 1. Submit report to in-portal Admin Panel queue (instant, non-blocking)
  const handlePortalSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);
    setSubmittedChannel('portal');

    try {
      await submitQuestionReport({
        questionId: question.id,
        paperTitle,
        section: question.section || '',
        questionText: question.question || question.questionText || '',
        issueType,
        description: description.trim(),
        studentName: currentStudent?.full_name || currentStudent?.username || 'Student Aspirant',
        studentEmail: currentStudent?.email || null,
        channel: 'portal'
      });

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setDescription('');
        onClose();
      }, 1400);
    } catch (err) {
      console.error('Error submitting report:', err);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setDescription('');
        onClose();
      }, 1000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 2. Report directly via WhatsApp
  const handleWhatsAppSubmit = async () => {
    setIsSubmitting(true);
    setSubmittedChannel('whatsapp');

    // Also record in portal queue so it shows in Admin HQ
    try {
      submitQuestionReport({
        questionId: question.id,
        paperTitle,
        section: question.section || '',
        questionText: question.question || question.questionText || '',
        issueType,
        description: description.trim(),
        studentName: currentStudent?.full_name || currentStudent?.username || 'Student Aspirant',
        studentEmail: currentStudent?.email || null,
        channel: 'whatsapp'
      });
    } catch (err) {
      // Background logging only
    }

    const waUrl = generateWhatsAppReportUrl({
      questionId: question.id,
      paperTitle,
      section: question.section || '',
      issueType,
      description: description.trim(),
      studentName: currentStudent?.full_name || currentStudent?.username || ''
    });

    // Open WhatsApp in new tab
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setDescription('');
      onClose();
    }, 1400);
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-950/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center border border-rose-500/20">
              <Flag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                Report Issue with Question
              </h3>
              <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                {question.id} • {question.year || 'PYQ'} {question.section ? `• ${question.section}` : ''}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              {submittedChannel === 'whatsapp' ? 'WhatsApp Opened' : 'Report Logged in Portal'}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xs mx-auto">
              {submittedChannel === 'whatsapp'
                ? 'Your report message has been generated for WhatsApp. Our team will review it promptly!'
                : 'Thank you! The report is queued in the Admin Studio for review against the official GATE key.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handlePortalSubmit} className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Issue Category:
              </label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-rose-500 font-medium"
              >
                {ISSUE_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Explain the problem in detail:
              </label>
              <textarea
                rows={3}
                placeholder="E.g., In step 2 the formula should use hydraulic radius R = A/P instead of diameter, or option C is correct per revised key..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-rose-500 resize-none leading-relaxed"
              />
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 rounded-xl p-3 flex items-start gap-2.5 text-[11px] text-amber-800 dark:text-amber-300">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
              <span>
                You can report directly into our <strong>Admin Portal queue</strong> (reviewed and edited in-portal) or chat directly with the maintainer via <strong>WhatsApp (+91 {WHATSAPP_SUPPORT_NUMBER.slice(2)})</strong>.
              </span>
            </div>

            {/* Dual Action Buttons */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                Cancel
              </button>

              <div className="w-full sm:w-auto flex items-center gap-2">
                {/* WhatsApp Direct Action */}
                <button
                  type="button"
                  onClick={handleWhatsAppSubmit}
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition cursor-pointer"
                  title="Direct report to Maintainer via WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Report via WhatsApp</span>
                </button>

                {/* Portal Submission */}
                <button
                  type="submit"
                  disabled={isSubmitting || !description.trim()}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white text-xs font-bold shadow-xs transition cursor-pointer"
                  title="Submit report into Admin Panel queue for in-portal triage"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Logging...' : 'Submit to Portal'}</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
