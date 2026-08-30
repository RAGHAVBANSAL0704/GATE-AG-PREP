import React, { useState, useEffect } from 'react';
import { MessageSquare, Sparkles, Users, MessageCircle, Info, Bot } from 'lucide-react';
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
  onToggleBookmark
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
      label: 'Live Study Lounge (Chat)', 
      icon: MessageSquare, 
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      description: 'Real-time subject channels & peer doubt clearing'
    },
    { 
      id: 'qa', 
      label: 'Discussions & Q&A', 
      icon: Sparkles, 
      color: 'text-pink-500 bg-pink-500/10 border-pink-500/20',
      description: 'Topic-wise threads, shortcuts & formula breakdowns'
    },
    {
      id: 'ai_tutor',
      label: 'AI Study Assistant',
      icon: Bot,
      color: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20',
      description: 'Step-by-step numerical derivations & instant doubt solver'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200 min-w-0 max-w-full overflow-hidden">
      
      {/* Header & Sub-Tab Navigation */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
              <Users className="w-3.5 h-3.5" />
              <span>GATE AG Peer Community & AI Tutor</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Community & AI Study Assistant
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Connect with fellow GATE Agricultural Engineering aspirants, chat in subject lounges, and get step-by-step mathematical derivations with AI.
            </p>
          </div>
        </div>

        {/* Sub-Tab Switcher */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {subTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentSubTab === tab.id || 
              (tab.id === 'qa' && currentSubTab === 'discussions') ||
              (tab.id === 'ai_tutor' && (currentSubTab === 'aisolver' || currentSubTab === 'aitutor'));
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex-1 min-w-[160px] flex items-center justify-center sm:justify-start gap-2.5 px-4 py-3 rounded-2xl text-xs font-bold transition border cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md transform scale-[1.01]'
                    : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : tab.color.split(' ')[0]}`} />
                <div className="text-left">
                  <span className="block leading-tight">{tab.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* View Content */}
      <div className="w-full min-w-0">
        {currentSubTab === 'chat' && (
          <CommunityChatHub currentStudent={currentStudent} />
        )}

        {(currentSubTab === 'qa' || currentSubTab === 'discussions') && (
          <CommunityDiscussions currentStudent={currentStudent} />
        )}

        {(currentSubTab === 'ai_tutor' || currentSubTab === 'aisolver' || currentSubTab === 'aitutor') && (
          <AIDoubtSolverHub 
            currentStudent={currentStudent}
            questions={questions}
            mockPapers={mockPapers}
            onOpenCalc={onOpenCalc}
            onToggleBookmark={onToggleBookmark}
          />
        )}
      </div>

    </div>
  );
}
