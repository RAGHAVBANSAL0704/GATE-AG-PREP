import React, { useState } from 'react';
import { 
  Compass, 
  Clock, 
  Download,
  BookOpen, 
  Calculator, 
  User,
  Menu,
  X,
  ShieldCheck,
  UserCheck,
  LogOut,
  Moon,
  Sun,
  Heart,
  Gamepad2,
  Target,
  GraduationCap,
  BarChart3,
  Trophy,
  MessageSquare,
  Award,
  Search,
  Palette
} from 'lucide-react';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  currentTheme, 
  setCurrentTheme, 
  onOpenCalc,
  onOpenCommandPalette,
  onOpenThemeModal,
  currentStudent,
  onOpenProfile,
  onLogout
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: Compass, 
      matches: ['dashboard'] 
    },
    { 
      id: 'practicehub', 
      label: 'Practice Hub', 
      icon: Target, 
      matches: ['practicehub', 'practice', 'custompractice', 'customtest'] 
    },
    { 
      id: 'learninghub', 
      label: 'Learning Hub', 
      icon: GraduationCap, 
      matches: ['learninghub', 'concepts', 'revision', 'formulas', 'simulators', 'flashcards'] 
    },
    { 
      id: 'community', 
      label: 'Community & Chat', 
      icon: MessageSquare, 
      matches: ['community', 'chat', 'qa', 'discussions', 'ai_tutor', 'aisolver', 'aitutor'] 
    },
    { 
      id: 'mocktest', 
      label: 'PYQ & Mocks', 
      icon: Clock, 
      matches: ['mocktest'] 
    },
    { 
      id: 'analytics', 
      label: 'Performance', 
      icon: BarChart3, 
      matches: ['analytics'] 
    },
    { 
      id: 'leaderboard', 
      label: 'Leaderboard', 
      icon: Trophy, 
      matches: ['leaderboard'] 
    },
    { 
      id: 'games', 
      label: 'Break Zone', 
      icon: Gamepad2, 
      matches: ['games'] 
    },
    { 
      id: 'downloads', 
      label: 'PYQ Vault', 
      icon: Download, 
      matches: ['downloads'] 
    },
    { 
      id: 'syllabus', 
      label: 'Syllabus', 
      icon: BookOpen, 
      matches: ['syllabus'] 
    },
    { 
      id: 'creator', 
      label: 'Creator & HQ', 
      icon: Award, 
      badge: 'Admin/Support',
      matches: ['creator', 'support', 'admin', 'hq'] 
    },
  ];

  const visibleNavItems = navItems;

  const handleNavClick = (id) => {
    setActiveTab(id);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="sm:hidden fixed top-0 left-0 right-0 h-14 bg-white dark:bg-slate-900 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 z-40 px-4 flex items-center justify-between no-print">
        <div 
          onClick={() => handleNavClick('dashboard')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-extrabold flex items-center justify-center text-xs shadow-sm">
            AG
          </div>
          <span className="font-extrabold text-xs text-slate-900 dark:text-white">
            GATE AG Prep
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCalc}
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-bold"
            title="Calculator"
          >
            <Calculator className="w-4 h-4 text-emerald-500" />
          </button>

          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div 
          onClick={() => setIsMobileOpen(false)}
          className="sm:hidden fixed inset-0 bg-black/50 backdrop-blur-xs z-40"
        />
      )}

      {/* Minimalist Left Sidebar */}
      <aside className={`
        fixed sm:sticky top-0 left-0 h-screen shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800/80 overflow-y-auto z-50
        w-60 sm:w-16 md:w-60 transition-all duration-200
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}
      `}>
        <div className="flex flex-col h-full justify-between p-3.5 space-y-4">
          
          {/* Top: Logo & Minimalist Navigation */}
          <div className="space-y-4">
            
            {/* Header Brand */}
            <div className="flex items-center justify-between px-2 py-1">
              <div 
                onClick={() => handleNavClick('dashboard')}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center text-xs shadow-xs group-hover:scale-105 transition-transform">
                  AG
                </div>
                <div className="block sm:hidden md:block">
                  <h1 className="font-extrabold text-xs text-slate-900 dark:text-white tracking-tight leading-tight">
                    GATE AG Prep
                  </h1>
                  <p className="text-[10px] text-slate-400 font-medium">Portal 2026</p>
                </div>
              </div>

              <button
                onClick={() => setIsMobileOpen(false)}
                className="sm:hidden p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-1 pt-1">
              
              {/* Quick Spotlight Search Button */}
              <button
                onClick={onOpenCommandPalette}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-slate-700/60 transition cursor-pointer mb-2 group"
                title="Search (Cmd+K / Ctrl+K)"
              >
                <div className="flex items-center gap-2.5">
                  <Search className="w-4 h-4 text-emerald-500 group-hover:scale-110 transition" />
                  <span className="block sm:hidden md:block">Search...</span>
                </div>
                <kbd className="hidden md:inline-block px-1.5 py-0.2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-[9px] text-slate-400">
                  ⌘K
                </kbd>
              </button>

              {visibleNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.matches.includes(activeTab);

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    title={item.label}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-xs font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'scale-105' : ''}`} />
                    <span className="block sm:hidden md:block text-left truncate">{item.label}</span>
                  </button>
                );
              })}
            </nav>

          </div>

          {/* Bottom Controls: Minimal Student Profile & Quick Action Bar */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
            
            {/* Student Profile Strip or Guest Mode Pill */}
            {currentStudent ? (
              <div 
                onClick={onOpenProfile}
                className="block sm:hidden md:flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/80 transition group"
                title="View Profile"
              >
                <div className="w-7 h-7 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center overflow-hidden shrink-0">
                  {currentStudent.profile_photo_url ? (
                    <img src={currentStudent.profile_photo_url} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-bold text-slate-900 dark:text-white truncate group-hover:text-emerald-500 transition">
                    {currentStudent.full_name}
                  </div>
                  <div className="text-[9px] text-slate-400 font-mono truncate">
                    {currentStudent.student_type === 'hau' ? (currentStudent.admission_no || 'CCS HAU') : 'External'}
                  </div>
                </div>
              </div>
            ) : (
              <div 
                onClick={() => onOpenProfile?.()}
                className="block sm:hidden md:flex items-center justify-between gap-2 p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/25 cursor-pointer hover:bg-emerald-500/20 transition group"
                title="Sign In or Register"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 truncate">
                      Guest Visitor
                    </div>
                    <div className="text-[9px] text-slate-400 font-medium truncate">
                      Click to Sign In
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded-lg border border-emerald-500/20 shrink-0">
                  Sign In
                </span>
              </div>
            )}

            {/* Quick Icon Tools */}
            <div className="flex items-center justify-between gap-1 px-1">
              <button
                onClick={onOpenCalc}
                className="flex-1 py-1.5 px-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 hover:bg-emerald-50 dark:hover:bg-emerald-950 text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition text-[11px] font-bold flex items-center justify-center gap-1 cursor-pointer"
                title="GATE Calculator"
              >
                <Calculator className="w-3.5 h-3.5 text-emerald-500" />
                <span className="block sm:hidden md:block">Calc</span>
              </button>

              <button
                onClick={onOpenThemeModal || (() => setCurrentTheme(currentTheme === 'slate-light' ? 'obsidian-emerald' : 'slate-light'))}
                className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
                title="Appearance & Theme Studio"
              >
                <Palette className="w-3.5 h-3.5 text-emerald-500" />
              </button>

              {currentStudent && (
                <button
                  onClick={onLogout}
                  className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 transition"
                  title="Logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>

        </div>
      </aside>
    </>
  );
}
