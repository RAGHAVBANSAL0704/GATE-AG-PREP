import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Lightbulb, 
  AlertTriangle, 
  Target, 
  ChevronUp, 
  ChevronDown, 
  BookOpen, 
  Copy, 
  Check,
  Cpu
} from 'lucide-react';
import MathRenderer from './MathRenderer';
import { getConceptExplanation } from '../utils/conceptExplainerService.js';

export default function InlineAIConceptExplainer({ 
  topic = '', 
  defaultExpanded = true,
  onClose
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [copied, setCopied] = useState(false);

  const explanation = useMemo(() => {
    return getConceptExplanation(topic);
  }, [topic]);

  const handleCopy = () => {
    const textToCopy = `Topic: ${explanation.topic} (${explanation.domain})\n\nIntuition:\n${explanation.intuition}\n\nCommon Traps:\n${explanation.commonTraps.join('\n')}\n\nPractice Example:\n${explanation.practiceExample.problem}\nAnswer: ${explanation.practiceExample.answer}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-purple-200 dark:border-purple-900/60 bg-gradient-to-br from-purple-50/70 via-indigo-50/40 to-purple-50/50 dark:from-purple-950/30 dark:via-indigo-950/20 dark:to-purple-950/30 overflow-hidden shadow-sm my-3 transition-all">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-purple-100/60 dark:bg-purple-900/40 border-b border-purple-200/80 dark:border-purple-800/60">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded bg-purple-200 dark:bg-purple-800 text-purple-900 dark:text-purple-100 font-mono">
                AI Deep Explainer
              </span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {explanation.topic}
              </span>
            </div>
            <span className="text-[11px] text-purple-700 dark:text-purple-300 font-medium">
              {explanation.domain}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg text-purple-700 dark:text-purple-300 hover:bg-purple-200/50 dark:hover:bg-purple-800/50 transition-colors text-xs flex items-center gap-1 cursor-pointer"
            title="Copy explanation"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg text-purple-700 dark:text-purple-300 hover:bg-purple-200/50 dark:hover:bg-purple-800/50 transition-colors cursor-pointer"
            title={isExpanded ? "Collapse" : "Expand"}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Accordion Body */}
      {isExpanded && (
        <div className="p-4 sm:p-5 space-y-4 text-slate-800 dark:text-slate-200 text-xs sm:text-sm">
          
          {/* 1. Core Intuition */}
          <div className="flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-md bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 flex items-center justify-center shrink-0 mt-0.5">
              <Lightbulb className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm mb-1">
                Core Physical Intuition
              </h4>
              <p className="leading-relaxed text-slate-700 dark:text-slate-300 text-xs">
                {explanation.intuition}
              </p>
            </div>
          </div>

          {/* 2. Key Equations */}
          {explanation.equations && explanation.equations.length > 0 && (
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-purple-100 dark:border-purple-900/40 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-xs text-purple-900 dark:text-purple-200">
                <Cpu className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>Governing Equations & SI Units</span>
              </div>
              <div className="space-y-2 pt-1">
                {explanation.equations.map((eq, idx) => (
                  <div key={idx} className="overflow-x-auto p-2 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
                    <div className="text-center py-1">
                      <MathRenderer content={`$$${eq.latex}$$`} />
                    </div>
                    {eq.description && (
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 font-sans">
                        {eq.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Common GATE AG Traps */}
          {explanation.commonTraps && explanation.commonTraps.length > 0 && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-950 dark:text-amber-100">
              <div className="w-6 h-6 rounded-md bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                <AlertTriangle className="w-3.5 h-3.5" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-xs text-amber-900 dark:text-amber-200">
                  Common GATE AG Traps & Pitfalls:
                </h4>
                <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-amber-900 dark:text-amber-100 leading-relaxed">
                  {explanation.commonTraps.map((trap, idx) => (
                    <li key={idx}>{trap}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* 4. Practice Example */}
          {explanation.practiceExample && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60">
              <div className="w-6 h-6 rounded-md bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                <Target className="w-3.5 h-3.5" />
              </div>
              <div className="space-y-1.5 w-full">
                <h4 className="font-bold text-xs text-emerald-900 dark:text-emerald-200">
                  Solved Numerical Walkthrough:
                </h4>
                <p className="text-xs text-slate-800 dark:text-slate-200 font-medium">
                  {explanation.practiceExample.problem}
                </p>
                <div className="space-y-1 pt-1 font-mono text-[11px] text-slate-700 dark:text-slate-300 bg-white/70 dark:bg-slate-900/70 p-2.5 rounded-lg border border-emerald-100 dark:border-emerald-900/40">
                  {explanation.practiceExample.steps.map((step, sIdx) => (
                    <div key={sIdx} className="leading-snug">
                      • {step}
                    </div>
                  ))}
                  <div className="font-bold text-emerald-700 dark:text-emerald-400 pt-1">
                    🎯 Final Answer: {explanation.practiceExample.answer}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
