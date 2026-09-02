import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Search, 
  Sparkles, 
  Clock, 
  Target, 
  BookOpen, 
  Calculator, 
  GraduationCap, 
  Gamepad2, 
  MessageSquare, 
  Award, 
  Copy, 
  Check, 
  ArrowRight, 
  X, 
  Play, 
  Sun, 
  Moon, 
  Download,
  BarChart3,
  Layers,
  FileText,
  Palette,
  Zap,
  Shield,
  Eye,
  Leaf,
  Sliders
} from 'lucide-react';
import { GATE_AG_FORMULAS } from '../data/formulas';
import { GATE_AG_SYLLABUS } from '../data/syllabus';
import MathRenderer from './MathRenderer';

export default function CommandPaletteModal({ 
  isOpen, 
  onClose, 
  onNavigate, 
  onStartMock, 
  onOpenCalc,
  darkMode,
  setDarkMode,
  onSelectTheme,
  onOpenThemeModal,
  mockPapers = [],
  customMockPapers = []
}) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedId, setCopiedId] = useState(null);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Flatten Formulas
  const flatFormulas = useMemo(() => {
    const list = [];
    (GATE_AG_FORMULAS || []).forEach(cat => {
      (cat.topics || []).forEach(top => {
        (top.formulas || []).forEach((f, idx) => {
          list.push({
            id: `form_${cat.code}_${top.topicName}_${idx}`,
            type: 'formula',
            title: f.title,
            category: cat.category,
            topicName: top.topicName,
            formula: f.formula,
            explanation: f.explanation,
            unit: f.unit
          });
        });
      });
    });
    return list;
  }, []);

  // Flatten Syllabus
  const flatSyllabus = useMemo(() => {
    const list = [];
    (GATE_AG_SYLLABUS || []).forEach(sec => {
      (sec.topics || []).forEach(top => {
        (top.subtopics || []).forEach((sub, sIdx) => {
          list.push({
            id: `syl_${sec.id}_${top.topic_id}_${sIdx}`,
            type: 'syllabus',
            title: sub,
            section: sec.title,
            topic: top.topic_name
          });
        });
      });
    });
    return list;
  }, []);

  // Navigation & Actions
  const navShortcuts = useMemo(() => [
    { id: 'nav_dash', type: 'action', title: 'Go to Dashboard', icon: Target, action: () => onNavigate('dashboard') },
    { id: 'nav_practice', type: 'action', title: 'Open Practice Hub & Question Pools', icon: Target, action: () => onNavigate('practicehub') },
    { id: 'nav_formulas', type: 'action', title: 'Open GATE AG Formula Sheet', icon: BookOpen, action: () => onNavigate('formulas') },
    { id: 'nav_learning', type: 'action', title: 'Open Learning Hub & Concept Vault', icon: GraduationCap, action: () => onNavigate('learninghub') },
    { id: 'nav_community', type: 'action', title: 'Open Community & Doubt Solver Lounge', icon: MessageSquare, action: () => onNavigate('community') },
    { id: 'nav_calc', type: 'action', title: 'Launch GATE Virtual Calculator', icon: Calculator, action: () => onOpenCalc && onOpenCalc() },
    { id: 'nav_mocks', type: 'action', title: 'View All 20 PYQ CBT Mock Tests (2007–2026)', icon: Clock, action: () => onNavigate('mocktest') },
    { id: 'nav_analytics', type: 'action', title: 'View Performance Analytics & Score Radar', icon: BarChart3, action: () => onNavigate('analytics') },
    { id: 'nav_games', type: 'action', title: 'Open Break Zone & 2048 Mini Games', icon: Gamepad2, action: () => onNavigate('games') },
    { id: 'nav_downloads', type: 'action', title: 'Open Downloads & PYQ Archive', icon: Download, action: () => onNavigate('downloads') },
    { id: 'nav_theme_studio', type: 'action', title: 'Open Appearance & Theme Studio (8 Themes: 4 Dark + 4 Light)', icon: Palette, action: () => onOpenThemeModal && onOpenThemeModal() },
    // 4 Dark Themes
    { id: 'nav_theme_obsidian', type: 'action', title: 'Switch Theme: 🌌 Obsidian Emerald (Luminous Dark)', icon: Sparkles, action: () => onSelectTheme && onSelectTheme('obsidian-emerald') },
    { id: 'nav_theme_titanium', type: 'action', title: 'Switch Theme: ⚡ Matte Titanium (Linear / Raycast Dark)', icon: Zap, action: () => onSelectTheme && onSelectTheme('matte-titanium') },
    { id: 'nav_theme_aurora', type: 'action', title: 'Switch Theme: ✨ Midnight Aurora (Nordic Academic Navy)', icon: Shield, action: () => onSelectTheme && onSelectTheme('midnight-aurora') },
    { id: 'nav_theme_monocle', type: 'action', title: 'Switch Theme: ✒️ Pure Monocle Dark (Ultra-Minimalist Ink)', icon: Eye, action: () => onSelectTheme && onSelectTheme('pure-monocle') },
    // 4 Light Themes
    { id: 'nav_theme_sage', type: 'action', title: 'Switch Theme: 🌿 Oxford Sage & Ivory (Nordic Botanical Light)', icon: Leaf, action: () => onSelectTheme && onSelectTheme('oxford-sage') },
    { id: 'nav_theme_parchment', type: 'action', title: 'Switch Theme: ☕ Cream Parchment & Coffee (Kindle Book Mode)', icon: BookOpen, action: () => onSelectTheme && onSelectTheme('cream-parchment') },
    { id: 'nav_theme_porcelain', type: 'action', title: 'Switch Theme: ⚡ Porcelain Studio (Linear Swiss Slate Light)', icon: Sliders, action: () => onSelectTheme && onSelectTheme('porcelain-studio') },
    { id: 'nav_theme_sunrise', type: 'action', title: 'Switch Theme: 🌅 Sunrise Sand & Amber (Morning Energy Light)', icon: Sun, action: () => onSelectTheme && onSelectTheme('sunrise-amber') },
    { id: 'nav_creator', type: 'action', title: 'Open Creator & Admin HQ', icon: Award, action: () => onNavigate('creator') }
  ], [onNavigate, onOpenCalc, onSelectTheme, onOpenThemeModal]);

  // Filtered Results
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      // Default top suggestions
      return [
        ...navShortcuts.slice(0, 6),
        ...flatFormulas.slice(0, 4)
      ];
    }

    const filtered = [];

    // Search Actions
    navShortcuts.forEach(item => {
      if (item.title.toLowerCase().includes(q)) {
        filtered.push(item);
      }
    });

    // Search Mock Papers (2007–2026)
    const allYears = ['2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007'];
    allYears.forEach(year => {
      if (year.includes(q) || `gate ${year}`.includes(q) || `pyq ${year}`.includes(q) || `mock ${year}`.includes(q)) {
        filtered.push({
          id: `mock_pyq_${year}`,
          type: 'mock',
          title: `GATE ${year} Official CBT Mock Test`,
          year: year,
          subtitle: `${parseInt(year) >= 2016 ? '65 Qs • 100 Marks' : '85 Qs • 150 Marks'} (Official CBT Paper)`
        });
      }
    });

    // Search Formulas
    flatFormulas.forEach(f => {
      if (
        f.title.toLowerCase().includes(q) || 
        f.explanation.toLowerCase().includes(q) || 
        f.topicName.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q) ||
        f.formula.toLowerCase().includes(q)
      ) {
        filtered.push(f);
      }
    });

    // Search Syllabus Subtopics
    flatSyllabus.forEach(s => {
      if (
        s.title.toLowerCase().includes(q) || 
        s.topic.toLowerCase().includes(q) ||
        s.section.toLowerCase().includes(q)
      ) {
        filtered.push(s);
      }
    });

    return filtered.slice(0, 20);
  }, [query, navShortcuts, flatFormulas, flatSyllabus]);

  // Handle Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % (results.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + (results.length || 1)) % (results.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results[selectedIndex]) {
          executeItem(results[selectedIndex]);
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  const executeItem = (item) => {
    if (item.type === 'action') {
      item.action();
      onClose();
    } else if (item.type === 'mock') {
      onStartMock(item.year);
      onClose();
    } else if (item.type === 'formula') {
      onNavigate('formulas');
      onClose();
    } else if (item.type === 'syllabus') {
      onNavigate('syllabus');
      onClose();
    }
  };

  const copyFormula = (e, formulaText, id) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`$${formulaText}$`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[150] flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      
      {/* Search Palette Container */}
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3 bg-slate-50/60 dark:bg-slate-950/40">
          <Search className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search formulas, PYQ mocks (2007–2026), syllabus, shortcuts... (↑↓ to navigate, ↵ to select)"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder-slate-400 text-sm sm:text-base font-medium"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              title="Clear Search Query"
            >
              <X className="w-4 h-4" />
            </button>
          ) : null}

          {/* Dedicated Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition cursor-pointer flex items-center gap-1.5 shrink-0"
            title="Close Search (ESC)"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline-block font-mono text-[10px] font-bold text-slate-400 dark:text-slate-400">ESC</span>
          </button>
        </div>

        {/* Results List */}
        <div ref={listRef} className="flex-1 overflow-y-auto p-2 sm:p-3 divide-y divide-slate-100 dark:divide-slate-800/60 space-y-1">
          {results.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs space-y-2">
              <Search className="w-8 h-8 mx-auto opacity-30" />
              <div>No results found for "{query}".</div>
              <p className="text-[11px] text-slate-500">Try searching "Bernoulli", "Tractor Draft", "2024", or "Calculus".</p>
            </div>
          ) : (
            results.map((item, idx) => {
              const isSelected = idx === selectedIndex;

              return (
                <div
                  key={item.id}
                  onClick={() => executeItem(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 rounded-2xl transition flex items-start justify-between gap-3 cursor-pointer select-none ${
                    isSelected 
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-slate-900 dark:text-white ring-1 ring-emerald-500/30' 
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    {/* Item Icon */}
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                      item.type === 'formula' 
                        ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400' 
                        : (item.type === 'mock' 
                            ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400' 
                            : (item.type === 'syllabus' ? 'bg-purple-500/15 text-purple-600 dark:text-purple-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200'))
                    }`}>
                      {item.type === 'formula' && <BookOpen className="w-4 h-4" />}
                      {item.type === 'mock' && <Play className="w-4 h-4 fill-current" />}
                      {item.type === 'syllabus' && <Layers className="w-4 h-4" />}
                      {item.type === 'action' && <item.icon className="w-4 h-4" />}
                    </div>

                    <div className="flex-1 min-w-0 space-y-0.5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-extrabold text-xs sm:text-sm truncate text-slate-900 dark:text-white">
                          {item.title}
                        </span>
                        
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded uppercase bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                          {item.type}
                        </span>

                        {item.year && (
                          <span className="text-[9px] font-mono font-extrabold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400">
                            {item.year}
                          </span>
                        )}
                      </div>

                      {/* Subtitle / Details */}
                      {item.type === 'formula' && (
                        <div className="space-y-1 pt-1">
                          <div className="text-xs text-slate-800 dark:text-slate-200 font-medium">
                            <MathRenderer content={`$${item.formula}$`} />
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                            {item.explanation}
                          </p>
                        </div>
                      )}

                      {item.type === 'mock' && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                          {item.subtitle}
                        </p>
                      )}

                      {item.type === 'syllabus' && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                          {item.section} • {item.topic}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {item.type === 'formula' && (
                      <button
                        onClick={(e) => copyFormula(e, item.formula, item.id)}
                        className="p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:text-emerald-500 text-slate-500 text-xs flex items-center gap-1 transition"
                        title="Copy LaTeX formula"
                      >
                        {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span className="text-[10px] hidden sm:inline">{copiedId === item.id ? 'Copied' : 'LaTeX'}</span>
                      </button>
                    )}

                    <ArrowRight className={`w-4 h-4 text-slate-400 transition ${isSelected ? 'translate-x-1 text-emerald-500' : ''}`} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Hints */}
        <div className="p-3 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-slate-400">
          <div className="flex items-center gap-3">
            <span><kbd className="px-1 rounded bg-slate-200 dark:bg-slate-800">↑↓</kbd> Navigate</span>
            <span><kbd className="px-1 rounded bg-slate-200 dark:bg-slate-800">↵</kbd> Select</span>
            <span><kbd className="px-1 rounded bg-slate-200 dark:bg-slate-800">ESC</kbd> Close</span>
          </div>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">57 Formulas • 20 PYQ Mocks • Syllabus</span>
        </div>

      </div>

    </div>
  );
}
