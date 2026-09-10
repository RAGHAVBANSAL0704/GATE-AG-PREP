import React, { useState, useEffect } from 'react';
import { MessageSquare, Sparkles, Users, Bot } from 'lucide-react';
import CommunityChatHub from './CommunityChatHub';
import CommunityDiscussions from './CommunityDiscussions';
import AIDoubtSolverHub from './AIDoubtSolverHub';

export default function CommunityHub({
  activeSubTab = 'chat',
  onSubTabChange,
  currentStudent,
  questions = [],
  mockPapers = [],
  onOpenCalc,
  onToggleBookmark,
  onRequireAuth
}) {
  const [currentSubTab, setCurrentSubTab] = useState(activeSubTab);

  useEffect(() => {
    if (activeSubTab) {
      setCurrentSubTab(activeSubTab);
    }
  }, [activeSubTab]);

  const handleTabClick = (tabId) => {
    setCurrentSubTab(tabId);
    if (onSubTabChange) {
      onSubTabChange(tabId);
    }
  };

  const subTabs = [
    { 
      id: 'chat', 
      label: 'Live Study Lounge', 
      badge: 'Active',
      icon: MessageSquare,
      description: 'Real-time subject channels'
    },
    { 
      id: 'qa', 
      label: 'Q&A Discussions', 
      badge: 'Solvers',
      icon: Sparkles,
      description: 'Numerical doubts & verified tricks'
    },
    {
      id: 'ai_tutor',
      label: 'AI Study Assistant',
      badge: '24/7',
      icon: Bot,
      description: 'Instant step-by-step derivations'
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-200 min-w-0 max-w-full overflow-hidden">
      
      {/* Interactive Top Command Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Title & Live Status */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 text-[11px] font-bold border border-emerald-200 dark:border-emerald-900/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Peer Network
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span>40+ Aspirants Studying Now</span>
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Community Hub & Study Lounge
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Collaborate on GATE AG numerical doubts, share formula derivation shortcuts, and learn with faculty mentors.
            </p>
          </div>

          {/* Segmented Sub-Tab Switcher */}
          <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-950/80 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shrink-0 self-start lg:self-auto overflow-x-auto max-w-full">
            {subTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentSubTab === tab.id || 
                (tab.id === 'qa' && currentSubTab === 'discussions') ||
                (tab.id === 'ai_tutor' && (currentSubTab === 'aisolver' || currentSubTab === 'aitutor'));
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/40 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      isActive 
                        ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-extrabold'
                        : 'bg-slate-200/60 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sub-Tab View Container */}
      <div className="w-full min-w-0">
        {currentSubTab === 'chat' && (
          <CommunityChatHub 
            currentStudent={currentStudent} 
            onRequireAuth={onRequireAuth} 
          />
        )}

        {(currentSubTab === 'qa' || currentSubTab === 'discussions') && (
          <CommunityDiscussions 
            currentStudent={currentStudent} 
            onRequireAuth={onRequireAuth} 
          />
        )}

        {(currentSubTab === 'ai_tutor' || currentSubTab === 'aisolver' || currentSubTab === 'aitutor') && (
          <AIDoubtSolverHub 
            currentStudent={currentStudent}
            questions={questions}
            mockPapers={mockPapers}
            onOpenCalc={onOpenCalc}
            onToggleBookmark={onToggleBookmark}
            onRequireAuth={onRequireAuth}
          />
        )}
      </div>

    </div>
  );
}

