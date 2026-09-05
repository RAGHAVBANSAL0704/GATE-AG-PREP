import React from 'react';
import { 
  BookOpen, 
  Clock, 
  Layers, 
  FileText, 
  Calculator, 
  Sun, 
  Moon, 
  Compass, 
  Sliders,
  UserCheck,
  LogOut,
  Gamepad2,
  Target,
  GraduationCap,
  MessageSquare,
  Award,
  ShieldCheck,
  Search,
  Palette,
  Globe,
  Shield,
  ExternalLink,
  Download
} from 'lucide-react';
import NotificationDropdown from './NotificationDropdown';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  darkMode, 
  setDarkMode, 
  onOpenCalc,
  onOpenCommandPalette,
  onOpenThemeModal,
  currentStudent,
  onLogout,
  onOpenProfile,
  onInstallPwa,
  canInstallPwa
}) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Compass },
    { id: 'practicehub', label: 'Practice Hub', icon: Target, badge: '3-in-1', matches: ['practicehub', 'practice', 'custompractice', 'customtest'] },
    { id: 'learninghub', label: 'Learning Hub', icon: GraduationCap, badge: '5-in-1', matches: ['learninghub', 'concepts', 'revision', 'formulas', 'simulators', 'flashcards'] },
    { id: 'community', label: 'Community', icon: MessageSquare, badge: 'Live', matches: ['community', 'chat', 'qa', 'discussions', 'ai_tutor', 'aisolver', 'aitutor'] },
    { id: 'mocktest', label: 'PYQ & Mocks', icon: Clock, badge: '07-26' },
    { id: 'games', label: 'Break Zone', icon: Gamepad2, badge: 'Games' },
    { id: 'syllabus', label: 'Syllabus', icon: BookOpen },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Raghav Bansal Educational Network Top Strip */}
      <div className="bg-slate-50/90 dark:bg-slate-950/90 border-b border-slate-200/80 dark:border-slate-800/80 px-4 py-1 sm:px-6 lg:px-8 text-[11px] font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="font-bold text-slate-800 dark:text-slate-200">Raghav Bansal Network:</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.2 rounded border border-emerald-200 dark:border-emerald-800">
              GATE AG Prep (Active)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://main-portal-ncc-01.vercel.app/#/home"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 font-bold transition group"
              title="NCC Prep Portal by Raghav Bansal"
            >
              <Shield className="w-3 h-3 text-amber-500" />
              <span>NCC Prep</span>
              <ExternalLink className="w-2.5 h-2.5 text-slate-400 opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>

            <span className="text-slate-300 dark:text-slate-700">•</span>

            <a
              href="https://coaet-students-corner.vercel.app/homepage"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 font-bold transition group"
              title="COAET Student's Corner by Raghav Bansal"
            >
              <GraduationCap className="w-3 h-3 text-blue-500" />
              <span>COAET Student's Corner</span>
              <ExternalLink className="w-2.5 h-2.5 text-slate-400 opacity-60 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-9 h-9 rounded-lg bg-slate-900 dark:bg-slate-100 flex items-center justify-center text-white dark:text-slate-900 font-bold tracking-tighter text-base shadow-sm">
              AG
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white">GATE AG</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                  Portal
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Agricultural Engineering</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.matches ? item.matches.includes(activeTab) : activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-bold ${
                      isActive 
                        ? 'bg-blue-500 text-white dark:bg-blue-600' 
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            
            <button
              onClick={onOpenCommandPalette}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
              title="Global Spotlight Search (Cmd+K / Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-emerald-500" />
              <span className="hidden md:inline text-[11px] text-slate-500">Search...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.2 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono text-[10px] text-slate-400">
                ⌘K
              </kbd>
            </button>

            {canInstallPwa && onInstallPwa && (
              <button
                onClick={onInstallPwa}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900 transition cursor-pointer shadow-2xs"
                title="Install GATE AG App on your device for fast offline access"
              >
                <Download className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="hidden sm:inline">Install App</span>
              </button>
            )}

            <button
              onClick={onOpenCalc}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
              title="Open GATE Virtual Scientific Calculator"
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-500" />
              <span className="hidden sm:inline">Calc</span>
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-1.5 p-1.5 px-2.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span className="hidden lg:inline text-[11px]">Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
                  <span className="hidden lg:inline text-[11px]">Dark</span>
                </>
              )}
            </button>

            {currentStudent && (
              <NotificationDropdown 
                currentStudent={currentStudent} 
                onNavigateTab={setActiveTab} 
              />
            )}

            {currentStudent && (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
                <button
                  onClick={onOpenProfile}
                  className="flex items-center gap-2 text-left p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                  title="Open My Profile"
                >
                  <div className={`w-7 h-7 rounded-full border flex items-center justify-center overflow-hidden ${
                    currentStudent.role === 'faculty' || currentStudent.is_faculty
                      ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-400 ring-2 ring-indigo-500/20'
                      : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-500'
                  }`}>
                    {currentStudent.profile_photo_url ? (
                      <img src={currentStudent.profile_photo_url} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      currentStudent.role === 'faculty' || currentStudent.is_faculty ? (
                        <Award className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                      ) : (
                        <UserCheck className="w-4 h-4 text-emerald-500" />
                      )
                    )}
                  </div>
                  <div className="hidden md:flex flex-col text-right">
                    <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight flex items-center gap-1 justify-end">
                      {currentStudent.display_name || currentStudent.full_name}
                      {(currentStudent.role === 'faculty' || currentStudent.is_faculty) && (
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                      )}
                    </span>
                    <span className={`text-[10px] font-mono font-medium ${
                      currentStudent.role === 'faculty' || currentStudent.is_faculty
                        ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                        : 'text-emerald-600 dark:text-emerald-400'
                    }`}>
                      {currentStudent.role === 'faculty' || currentStudent.is_faculty
                        ? `Faculty • ${currentStudent.department ? currentStudent.department.replace(/ \(.+\)/, '').substring(0, 18) : 'Academic'}`
                        : (currentStudent.student_type === 'hau' ? (currentStudent.admission_no || 'COAET HAU') : 'External')}
                    </span>
                  </div>
                </button>

                <button
                  onClick={onLogout}
                  className="p-2 rounded-lg text-rose-500 hover:bg-rose-500/10 transition flex items-center gap-1 text-xs font-semibold"
                  title="Log Out of Portal"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            )}

          </div>

        </div>

        {/* Mobile Navigation Bar */}
        <div className="lg:hidden flex items-center justify-around py-2 border-t border-slate-200 dark:border-slate-800 text-xs overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap ${
                  isActive
                    ? 'text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}
