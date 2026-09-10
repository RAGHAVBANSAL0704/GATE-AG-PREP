import React from 'react';
import { 
  Sparkles, 
  Flame, 
  BookOpen, 
  ArrowRight, 
  X, 
  Trophy, 
  CheckCircle2, 
  Compass,
  GraduationCap
} from 'lucide-react';
import { ASPIRANT_CREED } from '../utils/welcomeTemplates.js';

export default function WelcomeModal({ 
  user, 
  onClose, 
  onStartPractice, 
  onStartMock 
}) {
  if (!user) return null;

  const displayName = user.full_name || user.fullName || user.display_name || user.username || 'Aspirant';
  const collegeName = user.college_name || user.collegeName || user.institute || 'Premier Agricultural Institute';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-modal-title"
      >
        {/* Top Decorative Banner */}
        <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 dark:from-emerald-700 dark:via-teal-800 dark:to-emerald-900 px-6 py-8 text-white text-center overflow-hidden">
          {/* Subtle background glow effect */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close welcome modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 shadow-inner mb-3 text-amber-300">
            <Trophy className="w-8 h-8 drop-shadow" />
          </div>

          <h2 id="welcome-modal-title" className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome to GATE AG Prep, {displayName}!
          </h2>
          <p className="text-emerald-100 text-sm sm:text-base mt-1.5 max-w-md mx-auto flex items-center justify-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-amber-300 shrink-0" />
            <span className="truncate">{collegeName}</span>
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {/* Bilingual Golden Aspirant Creed Card */}
          <div className="rounded-xl border border-amber-300/70 bg-gradient-to-b from-amber-50 to-amber-100/50 dark:from-amber-950/30 dark:to-amber-900/20 dark:border-amber-700/50 p-5 sm:p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-400">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                Aspirant Creed • प्रेरणा संदेश
              </span>
            </div>

            {/* Hindi Translation (Leading) */}
            <p className="text-sm sm:text-base leading-relaxed font-semibold text-amber-950 dark:text-amber-100 mb-4">
              « {ASPIRANT_CREED.hindi} »
            </p>

            <div className="h-px bg-amber-300/60 dark:bg-amber-700/40 my-3"></div>

            {/* English Version */}
            <p className="text-xs sm:text-sm leading-relaxed italic text-amber-900/90 dark:text-amber-200/90">
              "{ASPIRANT_CREED.english}"
            </p>
          </div>

          {/* Sincere Hard Work & Success Wish */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
            <Flame className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
            <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <p className="font-semibold text-slate-900 dark:text-white mb-1">
                Our Wish For Your Preparation:
              </p>
              May your discipline be unshakable, your analytical thinking grow sharper with every problem solved, and your hard work lead you directly to an <strong>All-India Rank under 50</strong> in GATE Agricultural Engineering!
            </div>
          </div>

          {/* Quick Access Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-center">
              <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">1,320+</div>
              <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">Official PYQs (2007–2026)</div>
            </div>
            <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-center">
              <div className="text-lg font-bold text-teal-600 dark:text-teal-400">50 Full Mocks</div>
              <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">Real GATE CBT Interface</div>
            </div>
            <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-center">
              <div className="text-lg font-bold text-amber-600 dark:text-amber-400">AI Tutor</div>
              <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">Step-by-Step NAT Solvers</div>
            </div>
          </div>

        </div>

        {/* Action Buttons Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 dark:bg-slate-950/90 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            onClick={onStartPractice || onClose}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <BookOpen className="w-4 h-4" />
            <span>Start Practice (PYQs)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onStartMock || onClose}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium text-sm transition-all focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Explore Full Mocks</span>
          </button>
        </div>

      </div>
    </div>
  );
}
