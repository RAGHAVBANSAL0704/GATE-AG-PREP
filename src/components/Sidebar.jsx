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
  Trophy
} from 'lucide-react';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  currentTheme, 
  setCurrentTheme, 
  onOpenCalc,
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
      matches: ['learninghub', 'concepts', 'revision', 'formulas', 'simulators', 'flashcards', 'chat', 'qa'] 
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
      id: 'admin', 
      label: 'Question Admin', 
      icon: ShieldCheck, 
      matches: ['admin'] 
    },
    { 
      id: 'support', 
      label: 'Support', 
      icon: Heart, 
      matches: ['support'] 
    },
    { 
      id: 'creator', 
      label: 'Creator', 
      icon: User, 
      matches: ['creator'] 
    },
  ];

  const isAdmin = Boolean(
    currentStudent?.student_type === 'admin' ||
    currentStudent?.is_admin ||
    (typeof import.meta !== 'undefined' && import.meta.env?.DEV)
  );

  const visibleNavItems = navItems.filter(item => {
    if (item.id === 'admin') return isAdmin;
    return true;
  });

  const handleNavClick = (id) => {
    setActiveTab(id);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="sm:hidden fixed top-0 left-0 right-0 h-14 bg-white/90 dark:bg-[#111827]/90 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 z-40 px-4 flex items-center justify-between no-print">
        <div 
          onClick={() => handleNavClick('dashboard')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-extrabold flex items-center justify-center text-xs shadow-sm">
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
            <Calculator className="w-4 h-4" />
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
        fixed sm:sticky top-0 left-0 h-screen shrink-0 bg-white dark:bg-[#0f172a] border-r border-slate-200/80 dark:border-slate-800/80 overflow-y-auto z-50
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
                <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-xs shadow-xs group-hover:scale-105 transition-transform">
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
              {visibleNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.matches.includes(activeTab);

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    title={item.label}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-xs font-bold'
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
            
            {/* Student Profile Strip */}
            {currentStudent && (
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
                  <div className="text-[11px] font-bold text-slate-900 dark:text-white truncate group-hover:text-blue-500 transition">
                    {currentStudent.full_name}
                  </div>
                  <div className="text-[9px] text-slate-400 font-mono truncate">
                    {currentStudent.student_type === 'hau' ? (currentStudent.admission_no || 'CCS HAU') : 'External'}
                  </div>
                </div>
              </div>
            )}

            {/* Quick Icon Tools */}
            <div className="flex items-center justify-between gap-1 px-1">
              <button
                onClick={onOpenCalc}
                className="flex-1 py-1.5 px-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-blue-950 text-slate-600 dark:text-slate-300 hover:text-blue-600 transition text-[11px] font-bold flex items-center justify-center gap-1"
                title="GATE Calculator"
              >
                <Calculator className="w-3.5 h-3.5 text-blue-500" />
                <span className="block sm:hidden md:block">Calc</span>
              </button>

              <button
                onClick={() => setCurrentTheme(currentTheme === 'cyber-dark' ? 'slate-light' : 'cyber-dark')}
                className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                title="Toggle Theme"
              >
                {currentTheme === 'cyber-dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-600" />}
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
