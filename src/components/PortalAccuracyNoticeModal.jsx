import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  MessageSquare, 
  ArrowRight, 
  X, 
  Sparkles,
  HeartHandshake,
  ExternalLink
} from 'lucide-react';
import { WHATSAPP_SUPPORT_NUMBER } from '../services/questionReportService.js';

export default function PortalAccuracyNoticeModal({ 
  isOpen, 
  onClose, 
  onContactAdmin 
}) {
  const [dontShowAgain, setDontShowAgain] = useState(true);

  if (!isOpen) return null;

  const handleConfirmClose = () => {
    if (dontShowAgain) {
      try {
        localStorage.setItem('gate_ag_accuracy_notice_dismissed', 'true');
      } catch (e) {}
    }
    onClose();
  };

  const handleReportAdminClick = () => {
    if (dontShowAgain) {
      try {
        localStorage.setItem('gate_ag_accuracy_notice_dismissed', 'true');
      } catch (e) {}
    }
    if (onContactAdmin) {
      onContactAdmin();
    } else {
      const msg = encodeURIComponent(
        'Hi Admin! I am using the GATE AG Prep Portal and would like to report an issue/correction:'
      );
      window.open(`https://wa.me/${WHATSAPP_SUPPORT_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer');
    }
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="accuracy-notice-title"
    >
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 border-2 border-emerald-300 dark:border-emerald-700/60 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Top Header Banner */}
        <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 px-6 py-6 text-white overflow-hidden">
          <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-6 -ml-6 w-32 h-32 bg-teal-400/20 rounded-full blur-2xl pointer-events-none" />

          <button
            onClick={handleConfirmClose}
            className="absolute top-4 right-4 p-2 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition cursor-pointer"
            aria-label="Close accuracy notice"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative z-10 flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner border border-white/30 shrink-0 text-amber-300">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-emerald-100 text-[11px] font-black uppercase tracking-wider border border-white/20">
                <Sparkles className="w-3 h-3 text-amber-300" />
                Quality &amp; Accuracy Advisory
              </span>
              <h2 id="accuracy-notice-title" className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
                Welcome to GATE AG Prep Portal
              </h2>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 overflow-y-auto space-y-5 text-slate-800 dark:text-slate-200">
          
          {/* 100% Care Callout Card */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="space-y-1 text-xs sm:text-sm">
              <p className="font-extrabold text-emerald-950 dark:text-emerald-200">
                Crafted With 100% Care &amp; Dedication
              </p>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                This portal is created with <strong>100% care</strong> to be rigorous, authentic, and highly accurate for all GATE Agricultural Engineering aspirants.
              </p>
            </div>
          </div>

          {/* Advisory & Possibility of Errors */}
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="space-y-1 text-xs sm:text-sm">
              <p className="font-extrabold text-amber-950 dark:text-amber-200">
                Notice: Occasional Errors May Exist
              </p>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                Across 20+ years of official question archives (2007–2026), 50 full-length mocks (3,250+ numericals), and extensive technical syllabus modules, <strong>some questions or parts of the portal you may find incorrect or with typographical discrepancies</strong>.
              </p>
            </div>
          </div>

          {/* Advised to Report the Admin */}
          <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/80 flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 flex items-center justify-center shrink-0 mt-0.5">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div className="space-y-1 text-xs sm:text-sm">
              <p className="font-extrabold text-blue-950 dark:text-blue-200">
                Please Report to Admin to Help Tackle Issues
              </p>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                <strong>You are strongly advised to report any discrepancy to the Admin.</strong> Your active feedback helps us correct formula derivations, numerical intervals, and question keys immediately for the entire community.
              </p>
            </div>
          </div>

          {/* Checkbox: Don't show again */}
          <label className="flex items-center gap-2.5 pt-1 text-xs text-slate-600 dark:text-slate-400 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
            />
            <span className="font-semibold">Understood. Do not show this advisory again on this device.</span>
          </label>

        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          <button
            onClick={handleReportAdminClick}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/80 font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Report Issue to Admin</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button
            onClick={handleConfirmClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-black text-xs transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>I Understand &amp; Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>

      </div>
    </div>
  );
}
