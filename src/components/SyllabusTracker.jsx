import React, { useState } from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  Layers, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Trophy
} from 'lucide-react';
import { GATE_AG_SYLLABUS } from '../data/syllabus';

export default function SyllabusTracker({ userProgress, onUpdateProgress, onStartSectionPractice }) {
  const [expandedSec, setExpandedSec] = useState(GATE_AG_SYLLABUS[0].id);

  // Status map: { "topicName_subtopicName": "NOT_STARTED" | "STUDIED" | "MASTERED" }
  const getStatus = (key) => userProgress?.[key] || 'NOT_STARTED';

  const handleCycleStatus = (key) => {
    const current = getStatus(key);
    let next = 'STUDIED';
    if (current === 'STUDIED') next = 'MASTERED';
    else if (current === 'MASTERED') next = 'NOT_STARTED';
    onUpdateProgress(key, next);
  };

  // Calculate overall syllabus stats
  let totalSubtopics = 0;
  let masteredCount = 0;
  let studiedCount = 0;

  GATE_AG_SYLLABUS.forEach(sec => {
    sec.topics.forEach(t => {
      const topTitle = t.topic_name || t.name;
      t.subtopics.forEach(st => {
        totalSubtopics++;
        const status = getStatus(`${topTitle}_${st}`);
        if (status === 'MASTERED') masteredCount++;
        else if (status === 'STUDIED') studiedCount++;
      });
    });
  });

  const completionPct = totalSubtopics > 0 ? Math.round(((masteredCount + studiedCount * 0.5) / totalSubtopics) * 100) : 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-2xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Official GATE Agricultural Engineering (AG) Syllabus</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Syllabus Coverage & Mastery Tracker
            </h2>
            <p className="text-xs text-slate-500 max-w-xl">
              Track your preparation across all 8 sections (7 official + General Aptitude). Click subtopics to cycle status: <span className="font-semibold text-slate-700 dark:text-slate-300">Not Started → Studied → Mastered</span>.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 min-w-[200px] text-center space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Overall Syllabus Mastery</span>
            <div className="text-2xl font-bold text-slate-900 dark:text-white font-mono">{completionPct}%</div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden mt-2">
              <div className="bg-blue-600 h-full transition-all duration-300" style={{ width: `${completionPct}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Sections Accordion List */}
      <div className="space-y-4">
        {GATE_AG_SYLLABUS.map((sec) => {
          const isExpanded = expandedSec === sec.id;

          // Count section progress
          let secTotal = 0;
          let secMastered = 0;
          sec.topics.forEach(t => {
            const topTitle = t.topic_name || t.name;
            t.subtopics.forEach(st => {
              secTotal++;
              if (getStatus(`${topTitle}_${st}`) === 'MASTERED') secMastered++;
            });
          });
          const secPct = secTotal > 0 ? Math.round((secMastered / secTotal) * 100) : 0;

          return (
            <div 
              key={sec.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-2xs transition"
            >
              {/* Section Header */}
              <div 
                onClick={() => setExpandedSec(isExpanded ? null : sec.id)}
                className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition border-b border-transparent data-[expanded=true]:border-slate-200 dark:data-[expanded=true]:border-slate-800"
                data-expanded={isExpanded}
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold text-xs flex items-center justify-center border border-blue-200 dark:border-blue-900">
                    {sec.code}
                  </span>
                  <div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">{sec.title}</h3>
                    <p className="text-xs text-slate-500 font-mono">Weightage: {sec.weightage}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex items-center gap-2 text-xs font-mono">
                    <span className="text-slate-500">{secMastered}/{secTotal} Mastered</span>
                    <div className="w-20 bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full" style={{ width: `${secPct}%` }}></div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onStartSectionPractice(sec.title.replace(/^Section \d+: /, ''));
                    }}
                    className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 text-xs font-bold hover:bg-blue-600 hover:text-white transition flex items-center gap-1"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Practice</span>
                  </button>

                  {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                </div>
              </div>

              {/* Section Sub-topics Body */}
              {isExpanded && (
                <div className="p-6 bg-slate-50/50 dark:bg-slate-950/40 border-t border-slate-200 dark:border-slate-800 space-y-6">
                  {sec.topics.map((top, tIdx) => (
                    <div key={tIdx} className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        {top.topic_name || top.name}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                        {top.subtopics.map((sub, sIdx) => {
                          const statusKey = `${top.name}_${sub}`;
                          const status = getStatus(statusKey);

                          let badgeClass = "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300";
                          let icon = <Circle className="w-4 h-4 text-slate-400 shrink-0" />;

                          if (status === 'STUDIED') {
                            badgeClass = "bg-blue-50 dark:bg-blue-950/60 border-blue-300 dark:border-blue-800 text-blue-900 dark:text-blue-200 font-semibold";
                            icon = <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />;
                          } else if (status === 'MASTERED') {
                            badgeClass = "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 font-bold";
                            icon = <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />;
                          }

                          return (
                            <button
                              key={sIdx}
                              onClick={() => handleCycleStatus(statusKey)}
                              className={`p-3 rounded-xl border text-left transition flex items-center justify-between gap-3 ${badgeClass} hover:border-slate-400 dark:hover:border-slate-700`}
                            >
                              <div className="flex items-center gap-2.5">
                                {icon}
                                <span>{sub}</span>
                              </div>
                              <span className="text-[10px] uppercase font-mono font-bold opacity-75">
                                {status.replace('_', ' ')}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
}
