import React, { useState, useEffect } from 'react';
import { Palette, Check, Sparkles, Sun, Zap, Shield, Eye, Leaf, BookOpen, Sliders, X } from 'lucide-react';
import { APP_THEMES } from '../constants/themeConstants.js';

const THEME_ICONS = {
  'obsidian-emerald': Sparkles,
  'matte-titanium': Zap,
  'midnight-aurora': Shield,
  'pure-monocle': Eye,
  'oxford-sage': Leaf,
  'cream-parchment': BookOpen,
  'porcelain-studio': Sliders,
  'sunrise-amber': Sun,
  'slate-light': Sun
};

export default function ThemeSelectorModal({ isOpen, onClose, currentTheme, onSelectTheme }) {
  const [filterType, setFilterType] = useState('all'); // 'all' | 'dark' | 'light'

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredThemes = APP_THEMES.filter(t => {
    if (filterType === 'dark') return t.type === 'dark';
    if (filterType === 'light') return t.type === 'light';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden p-6 space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-white">
                Appearance & Theme Studio
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Select your preferred modern dark or light workspace</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-950 rounded-2xl border border-slate-200/80 dark:border-slate-800">
          <button
            onClick={() => setFilterType('all')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              filterType === 'all'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            All Themes (8)
          </button>
          <button
            onClick={() => setFilterType('dark')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
              filterType === 'dark'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <span>🌙 Dark</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700">4</span>
          </button>
          <button
            onClick={() => setFilterType('light')}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
              filterType === 'light'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <span>☀️ Light</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700">4</span>
          </button>
        </div>

        {/* Theme List */}
        <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-1">
          {filteredThemes.map((t) => {
            const isSelected = currentTheme === t.id || (t.id === 'obsidian-emerald' && currentTheme === 'cyber-dark');
            const Icon = THEME_ICONS[t.id] || Sparkles;

            return (
              <button
                key={t.id}
                onClick={() => {
                  onSelectTheme(t.id);
                  onClose();
                }}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-4 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-500/10 border-emerald-500 shadow-md'
                    : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${t.badgeColor}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-xs text-slate-900 dark:text-slate-100">
                        {t.name}
                      </span>
                      {t.type === 'dark' ? (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">Dark</span>
                      ) : (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">Light</span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                      {t.tagline}
                    </p>
                  </div>
                </div>

                {/* Swatches & Active Check */}
                <div className="flex items-center gap-2.5 shrink-0">
                  <div className="flex items-center -space-x-1.5 bg-black/10 dark:bg-white/5 p-1 rounded-full border border-black/5 dark:border-white/10">
                    {t.swatches.map((color, i) => (
                      <span
                        key={i}
                        className="w-3.5 h-3.5 rounded-full border border-black/20 dark:border-white/20 shadow-xs"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>

                  {isSelected ? (
                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border border-slate-300 dark:border-slate-700" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-3">
          <span>Tip: You can also switch themes via <strong className="font-mono text-emerald-600 dark:text-emerald-400">Cmd+K</strong></span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
