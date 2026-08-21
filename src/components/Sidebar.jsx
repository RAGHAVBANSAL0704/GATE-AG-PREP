import React, { useState } from 'react';
import { 
  Compass, 
  Layers, 
  Clock, 
  Download,
  Upload,
  Sliders, 
  BookOpen, 
  FileText, 
  Calculator, 
  User,
  Sparkles,
  Palette,
  Check,
  Bookmark,
  Menu,
  X,
  Lightbulb,
  MessageSquare
} from 'lucide-react';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  currentTheme, 
  setCurrentTheme, 
  onOpenCalc 
}) {
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Compass },
    { id: 'practice', label: 'Practice Pool', icon: Layers },
    { id: 'custompractice', label: 'Custom Pool', icon: Sparkles, badge: '2027' },
    { id: 'mocktest', label: 'PYQ Mocks', icon: Clock, badge: '07-26' },
    { id: 'concepts', label: 'Important Concepts', icon: Lightbulb, badge: 'Core' },
    { id: 'revision', label: 'Revision Bank', icon: Bookmark, badge: 'Vault' },
    { id: 'formulas', label: 'Formula Sheet', icon: FileText, badge: 'Cheatsheet' },
    { id: 'downloads', label: 'PYQ Vault', icon: Download, badge: 'PDFs' },
    { id: 'customtest', label: 'Custom Test', icon: Sliders, badge: 'Speed' },
    { id: 'syllabus', label: 'Syllabus', icon: BookOpen },
    { id: 'creator', label: 'Creator', icon: User },
  ];

  const themes = [
    { id: 'cyber-dark', label: 'Cyber Dark (Default)', bg: 'bg-[#0B0F19]', border: 'border-blue-500' },
    { id: 'forest-emerald', label: 'Forest Emerald', bg: 'bg-[#061A14]', border: 'border-emerald-500' },
    { id: 'midnight-amethyst', label: 'Midnight Amethyst', bg: 'bg-[#0F0C1B]', border: 'border-purple-500' },
    { id: 'slate-light', label: 'Clean Slate Light', bg: 'bg-[#F8FAFC]', border: 'border-slate-400' },
  ];

  const activeThemeObj = themes.find(t => t.id === currentTheme) || themes[0];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Top App Bar (Visible on < sm screens) */}
      <div className="sm:hidden fixed top-0 left-0 right-0 h-14 bg-white/90 dark:bg-[#111827]/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 z-40 px-4 flex items-center justify-between no-print">
        <div 
          onClick={() => handleNavClick('dashboard')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-extrabold flex items-center justify-center text-xs shadow-md">
            AG
          </div>
          <span className="font-extrabold text-xs text-slate-900 dark:text-white flex items-center gap-1">
            GATE AG Prep
            <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500" />
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCalc}
            className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 text-xs font-bold"
            title="Calculator"
          >
            <Calculator className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
            aria-label="Toggle navigation menu"
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Backdrop Overlay */}
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)}
          className="sm:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-40 animate-in fade-in duration-150"
        />
      )}

      {/* Sidebar Container (Desktop sticky + Mobile slide-out drawer) */}
      <aside className={`
        fixed sm:sticky top-0 left-0 h-screen shrink-0 bg-white/95 dark:bg-[#111827]/95 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between py-6 px-3 sm:px-4 transition-transform duration-200 z-50 shadow-xl sm:shadow-md
        w-64 sm:w-16 md:w-64
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}
      `}>
        
        {/* Top Branding & Navigation */}
        <div className="space-y-6">
          
          {/* Sleek 3D Logo */}
          <div className="flex items-center justify-between px-1">
            <div 
              onClick={() => handleNavClick('dashboard')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-extrabold flex items-center justify-center text-sm shadow-md border border-white/20 transition-all duration-200 group-hover:scale-105 group-hover:shadow-blue-500/25">
                AG
              </div>
              <div className="block sm:hidden md:block">
                <h1 className="font-extrabold text-sm text-slate-900 dark:text-white tracking-tight leading-none flex items-center gap-1">
                  <span>GATE AG</span>
                  <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500" />
                </h1>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-1">
                  Prep Portal 2.0
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsMobileOpen(false)}
              className="sm:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Divider */}
          <div className="h-px bg-slate-200 dark:bg-slate-800/80 mx-1" />

          {/* Navigation Items */}
          <nav className="space-y-1.5 overflow-y-auto max-h-[60vh] sm:max-h-none">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  title={item.label}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition-all relative ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 translate-x-0.5 border border-blue-400/30'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 transition-transform ${isActive ? 'scale-110' : ''}`} />
                  <span className="block sm:hidden md:block flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className={`block sm:hidden md:block text-[9px] px-2 py-0.5 rounded-full font-mono font-bold ${
                      isActive 
                        ? 'bg-amber-400 text-slate-950 font-extrabold shadow-2xs' 
                        : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

        </div>

        {/* Bottom Utility Tools & Theme Selector */}
        <div className="space-y-2 pt-4 border-t border-slate-200 dark:border-slate-800/80 relative">
          
          {/* Scientific Calc Action */}
          <button
            onClick={() => {
              onOpenCalc();
              setIsMobileOpen(false);
            }}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-800 transition shadow-2xs"
            title="Open GATE Calculator"
          >
            <Calculator className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="block sm:hidden md:block">Scientific Calc</span>
          </button>

          {/* Multi-Theme Selector Trigger */}
          <div className="relative">
            <button
              onClick={() => setShowThemePicker(!showThemePicker)}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition border border-slate-200 dark:border-slate-800"
              title="Choose Theme"
            >
              <Palette className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="block sm:hidden md:block flex-1 text-left truncate">{activeThemeObj.label}</span>
            </button>

            {/* Theme Selector Popover Menu */}
            {showThemePicker && (
              <div className="absolute bottom-12 left-0 w-60 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 shadow-2xl space-y-2 animate-in fade-in zoom-in-95 duration-150 z-50">
                <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-2">
                  Select Portal Theme
                </div>
                <div className="space-y-1">
                  {themes.map((t) => {
                    const isSelected = currentTheme === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => {
                          setCurrentTheme(t.id);
                          setShowThemePicker(false);
                        }}
                        className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-semibold transition ${
                          isSelected 
                            ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold' 
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={`w-3.5 h-3.5 rounded-full ${t.bg} border ${t.border} shadow-2xs`}></span>
                          <span>{t.label}</span>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

        </div>

      </aside>
    </>
  );
}
