import React, { useState, useEffect } from 'react';
import { MessageSquare, Sparkles, Users, MessageCircle, Info, Bot, AlertTriangle } from 'lucide-react';
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
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Connect with fellow GATE Agricultural Engineering aspirants, chat in subject lounges, and get step-by-step mathematical derivations with AI.
            </p>
          </div>
        </div>

        {/* Notice: Under Active Testing & Review */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-indigo-500/10 border border-amber-300 dark:border-amber-700/60 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 font-bold border border-amber-400/30">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-black uppercase tracking-wider text-amber-900 dark:text-amber-300">
                  Notice: Under Active Testing & Review
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-200/70 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-700">
                  Preview Stage
                </span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                The Community Live Chat and AI Study Assistant features are currently under active testing and review. Responses and peer discussions are being monitored for mathematical accuracy, syllabus alignment, and moderation standards.
              </p>
            </div>
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
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md transform scale-[1.01]'
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
