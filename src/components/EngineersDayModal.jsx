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
  ShieldCheck,
  ZoomIn
} from 'lucide-react';

import { ENGINEERS_DAY_METADATA, isEngineersDayActive } from '../utils/engineersDay.js';

export default function EngineersDayModal({ isOpen, onClose, onExplore }) {
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [showEnlargedPhoto, setShowEnlargedPhoto] = useState(false);

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
        
        {/* Top Header Banner - Merged Portrait & Tribute to Sir M. Visvesvaraya */}
        <div className="relative bg-gradient-to-br from-emerald-800 via-teal-800 to-amber-900 px-6 py-6 sm:py-7 text-white overflow-hidden">
          {/* Subtle background tech grid */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:20px_20px]"></div>
          
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-full text-white/80 hover:text-white hover:bg-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-white z-10 cursor-pointer"
            aria-label="Close Engineers Day popup"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5">
            {/* Clickable Compact Portrait of Sir M. Visvesvaraya */}
            <button
              type="button"
              onClick={() => setShowEnlargedPhoto(true)}
              className="relative group shrink-0 rounded-2xl p-0.5 border-2 border-amber-300 hover:border-amber-200 bg-slate-900 shadow-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all hover:scale-105"
              title="Click to view full portrait of Sir M. Visvesvaraya"
              aria-label="View enlarged portrait of Sir M. Visvesvaraya"
            >
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex items-center justify-center bg-slate-950">
                <img 
                  src="/icons/visvesvaraya_portrait.jpg" 
                  alt="Bharat Ratna Sir M. Visvesvaraya" 
                  className="w-full h-full object-contain p-0.5"
                  loading="eager"
                />
              </div>
              <div className="absolute inset-0 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <ZoomIn className="w-4 h-4 text-amber-200 drop-shadow-md" />
              </div>
              <div className="absolute -bottom-1.5 -right-1.5 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[9px] uppercase tracking-wider shadow">
                1861–1962
              </div>
            </button>

            {/* Merged Header & Tribute Content */}
            <div className="text-center sm:text-left space-y-1.5 flex-1">
              <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/25 text-amber-200 text-xs font-semibold uppercase tracking-wider">
                  <Calendar className="w-3.5 h-3.5 text-amber-300" />
                  <span>National Engineers' Day • 15 Sept 2026</span>
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-200">
                  <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
                  <span>COAET, CCS HAU Hisar</span>
                </span>
              </div>

              <h2 id="engineers-day-title" className="text-lg sm:text-2xl font-black tracking-tight text-white flex items-center justify-center sm:justify-start gap-2">
                <Award className="w-5 h-5 text-amber-300 shrink-0 hidden sm:inline" />
                <span>Tribute to Bharat Ratna Sir M. Visvesvaraya</span>
              </h2>

              <p className="text-xs sm:text-[13px] leading-relaxed text-emerald-100/90 font-medium max-w-xl">
                Honoring the legendary father of Indian engineering (1861–1962). His vision of automated floodgates, block system irrigation, and industrial self-reliance inspires our quest to engineer agrarian prosperity across India.
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

            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-amber-950 dark:text-amber-100 tracking-tight mt-1 mb-2">
              🌾 KṣetraVeda Yantradhārā • क्षेत्रवेद यन्त्रधारा ⚙️
            </h3>

            {/* Sanskrit Meaning Intro */}
            <p className="text-xs sm:text-sm font-semibold text-amber-900 dark:text-amber-200 mb-3 leading-relaxed">
              A Sanskrit-inspired theme bringing together the wisdom of agriculture and the spirit of engineering:
              <span className="block text-sm sm:text-base font-bold text-emerald-800 dark:text-emerald-300 mt-1 italic">
                “A continuous stream of knowledge and technology flowing through the fields of agriculture.”
              </span>
            </p>

            {/* 4 Sanskrit Components */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-3.5">
              <div className="p-2.5 rounded-xl bg-white/70 dark:bg-slate-900/80 border border-amber-200 dark:border-amber-800/60 text-center shadow-2xs">
                <span className="block text-xs font-extrabold text-emerald-700 dark:text-emerald-400">Kṣetra (क्षेत्र)</span>
                <span className="text-[11px] text-slate-600 dark:text-slate-400">Field & Cultivated Earth</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/70 dark:bg-slate-900/80 border border-amber-200 dark:border-amber-800/60 text-center shadow-2xs">
                <span className="block text-xs font-extrabold text-blue-700 dark:text-blue-400">Veda (वेद)</span>
                <span className="text-[11px] text-slate-600 dark:text-slate-400">Knowledge & Wisdom</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/70 dark:bg-slate-900/80 border border-amber-200 dark:border-amber-800/60 text-center shadow-2xs">
                <span className="block text-xs font-extrabold text-purple-700 dark:text-purple-400">Yantra (यन्त्र)</span>
                <span className="text-[11px] text-slate-600 dark:text-slate-400">Machine & Technology</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/70 dark:bg-slate-900/80 border border-amber-200 dark:border-amber-800/60 text-center shadow-2xs">
                <span className="block text-xs font-extrabold text-amber-700 dark:text-amber-400">Dhārā (धारा)</span>
                <span className="text-[11px] text-slate-600 dark:text-slate-400">Continuous Flow</span>
              </div>
            </div>

            <div className="h-px bg-amber-300/70 dark:bg-amber-700/50 my-3"></div>

            {/* Full Narrative Breakdown */}
            <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-2.5">
              The theme reflects how agricultural engineering transforms traditional knowledge into innovative solutions. From irrigation and farm machinery to renewable energy, precision agriculture and smart farming, engineering acts as the bridge between the wisdom of the soil and the possibilities of technology.
            </p>

            <p className="text-xs sm:text-sm leading-relaxed font-semibold text-emerald-900 dark:text-emerald-200 mb-3">
              For Engineers’ Day, KṣetraVeda Yantradhārā celebrates not merely machines and technology, but the ideas, innovation and human ingenuity that make agriculture more efficient, sustainable and future-ready. 🌱⚙️
            </p>

            {/* Stage Version Callout */}
            <div className="p-3 rounded-xl bg-amber-100/60 dark:bg-amber-950/60 border border-amber-300/80 dark:border-amber-800 text-xs leading-relaxed text-amber-950 dark:text-amber-100">
              <span className="font-bold text-[10px] uppercase tracking-wider block text-amber-800 dark:text-amber-300 mb-1">
                🎙️ Stage & Symposium Creed:
              </span>
              “KṣetraVeda Yantradhārā represents the seamless flow of knowledge, innovation and technology through the fields of agriculture. ‘Kṣetra’ signifies our land, ‘Veda’ its wisdom, ‘Yantra’ the power of engineering, and ‘Dhārā’ the continuous flow of progress. Together, the theme celebrates the beautiful union of agriculture and engineering, where traditional wisdom meets modern innovation to cultivate a smarter and more sustainable future.”
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

        {/* Enlarged Photo Lightbox Modal */}
        {showEnlargedPhoto && (
          <div 
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn"
            onClick={() => setShowEnlargedPhoto(false)}
          >
            <div 
              className="relative max-w-sm w-full bg-slate-900 border border-amber-400/80 rounded-3xl p-5 shadow-2xl flex flex-col items-center text-center text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowEnlargedPhoto(false)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close photo preview"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="w-60 h-60 sm:w-68 sm:h-68 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-xl bg-slate-950 flex items-center justify-center mb-3.5 p-1">
                <img 
                  src="/icons/visvesvaraya_portrait.jpg" 
                  alt="Bharat Ratna Sir M. Visvesvaraya" 
                  className="w-full h-full object-contain"
                />
              </div>

              <h4 className="text-sm font-black text-amber-300">
                Bharat Ratna Sir M. Visvesvaraya
              </h4>
              <p className="text-xs text-slate-300 font-medium mt-0.5">
                Father of Indian Engineering (1861–1962)
              </p>
              <p className="text-[11px] text-emerald-300/90 font-mono mt-1">
                COAET, CCS HAU Hisar
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

