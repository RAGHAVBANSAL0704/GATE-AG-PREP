import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Cpu, 
  Cog, 
  GraduationCap, 
  Calendar, 
  Flame, 
  Award, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

import { ENGINEERS_DAY_METADATA, isEngineersDayActive } from '../utils/engineersDay.js';

export default function EngineersDayModal({ isOpen, onClose, onExplore }) {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    if (dontShowAgain) {
      try {
        localStorage.setItem('engineers_day_2026_dismissed', 'true');
      } catch (e) {}
    } else {
      try {
        sessionStorage.setItem('engineers_day_2026_session_dismissed', 'true');
      } catch (e) {}
    }
    onClose();
  };

  const handleExploreAction = () => {
    handleClose();
    if (typeof onExplore === 'function') {
      onExplore();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="engineers-day-title"
    >
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[94vh] flex flex-col transition-all">
        
        {/* Top Header Banner */}
        <div className="relative bg-gradient-to-br from-emerald-700 via-teal-700 to-amber-700 px-6 py-7 sm:py-8 text-white text-center overflow-hidden">
          {/* Subtle background tech grid */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:20px_20px]"></div>
          
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close Engineers Day popup"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-2">
            <div className="relative shrink-0">
              <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-2xl bg-slate-900">
                <img 
                  src="/icons/visvesvaraya_portrait.jpg" 
                  alt="Bharat Ratna Sir M. Visvesvaraya" 
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                />
              </div>
              <div className="absolute -bottom-1.5 -right-1.5 px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 font-black text-[9px] uppercase tracking-wider shadow">
                1861–1962
              </div>
            </div>

            <div className="text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/25 text-amber-200 text-xs font-semibold uppercase tracking-wider mb-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-300" />
                <span>National Engineers' Day • 15 Sept 2026</span>
              </div>

              <h2 id="engineers-day-title" className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
                Celebrating Engineers' Day 2026
              </h2>
              
              <p className="text-emerald-100 text-xs sm:text-sm font-medium mt-1 flex items-center justify-center sm:justify-start gap-1.5">
                <GraduationCap className="w-4 h-4 text-amber-300 shrink-0" />
                <span>COAET — CCS Haryana Agricultural University, Hisar</span>
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-5 text-slate-800 dark:text-slate-200">
          
          {/* Theme Highlight Card */}
          <div className="relative rounded-2xl border border-amber-300/80 bg-gradient-to-br from-amber-50 via-orange-50/50 to-amber-100/60 dark:from-amber-950/40 dark:via-orange-950/30 dark:to-amber-900/30 dark:border-amber-700/60 p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="inline-flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-400">
                  <Cog className="w-4 h-4 animate-spin-slow" />
                </span>
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                  Official Symposium Theme
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-200/70 dark:bg-amber-800/60 text-amber-900 dark:text-amber-100 border border-amber-300 dark:border-amber-700">
                COAET Hisar
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-amber-900 dark:text-amber-100 tracking-tight mt-1 mb-2">
              🌾 क्षेत्रवेद यंत्रधारा • Ksetraveda Yantradhara ⚙️
            </h3>

            {/* Hindi Invocation (Leading) */}
            <p className="text-sm sm:text-base leading-relaxed font-semibold text-amber-950 dark:text-amber-100 mb-3">
              « क्षेत्रवेद यंत्रधारा: कृषि ज्ञान की पावन धरोहर और आधुनिक अभियांत्रिकी के अविरल प्रवाह का गौरवमयी संगम। सी.ओ.ए.ई.टी., सी.सी.एस. एच.ए.यू. हिसार की ओर से समस्त भावी व कार्यरत अभियंताओं को राष्ट्रीय अभियंता दिवस की हार्दिक शुभकामनाएं! »
            </p>

            <div className="h-px bg-amber-300/70 dark:bg-amber-700/50 my-2.5"></div>

            {/* English Invocation */}
            <p className="text-xs sm:text-sm leading-relaxed italic text-amber-900/90 dark:text-amber-200/90">
              “Confluence of the sacred science of the fields (Ksetraveda) with the unstoppable torrent of engineering innovation (Yantradhara). Empowering agriculture through mechanization, precision hydrology, and sustainable agro-processing.”
            </p>
          </div>

          {/* Three Core Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>क्षेत्र • Ksetra</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
                Smart soil-water conservation, precision drip hydraulics & watershed resilience.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-teal-700 dark:text-teal-400 mb-1">
                <Cog className="w-3.5 h-3.5" />
                <span>यंत्र • Yantra</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
                Advanced tractor dynamics, robotic implements & intelligent harvest automation.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/70">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-1">
                <Cpu className="w-3.5 h-3.5" />
                <span>धारा • Dhara</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-snug">
                Continuous post-harvest flow, thermo-drying kinetics & renewable energy systems.
              </p>
            </div>
          </div>

          {/* Sir M. Visvesvaraya Tribute */}
          <div className="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/70 text-xs sm:text-sm text-emerald-950 dark:text-emerald-100 shadow-xs">
            <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-amber-400/90 shrink-0 shadow bg-slate-900">
              <img 
                src="/icons/visvesvaraya_portrait.jpg" 
                alt="Bharat Ratna Sir M. Visvesvaraya" 
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300">
                <Award className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Tribute to Bharat Ratna Sir M. Visvesvaraya (1861–1962)</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
                Honoring the legendary father of Indian engineering. His vision of automated floodgates, block system irrigation, and industrial self-reliance inspires our quest to engineer agrarian prosperity across India.
              </p>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-950/90 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="rounded border-slate-300 dark:border-slate-700 text-emerald-600 focus:ring-emerald-500 dark:bg-slate-900 w-4 h-4"
            />
            <span>Do not show this popup again</span>
          </label>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={handleClose}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleExploreAction}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all"
            >
              <span>Explore GATE AG Prep</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
