import React, { useState } from 'react';
import { 
  BookOpen, 
  X, 
  Calculator, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  AlertTriangle,
  Lightbulb,
  Copy,
  Check
} from 'lucide-react';
import { GATE_AG_FORMULAS } from '../data/formulas';
import MathRenderer from './MathRenderer';

export default function ConceptStudyModal({ question, onClose, onOpenCalc }) {
  const [activeTab, setActiveTab] = useState('formulas'); // 'formulas' | 'explanation' | 'tips'
  const [copied, setCopied] = useState(false);

  if (!question) return null;

  const sectionName = question.section || 'General Aptitude';
  const topicName = question.topic || 'General Topic';
  const subtopicName = question.subtopic || '';
  const solutionText = question.solution || question.explanation;

  const handleCopyExplanation = () => {
    if (solutionText) {
      navigator.clipboard.writeText(solutionText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  let matchedFormulas = [];
  let matchedSection = GATE_AG_FORMULAS.find(c => 
    c.category.toLowerCase().includes(sectionName.toLowerCase()) ||
    sectionName.toLowerCase().includes(c.category.toLowerCase()) ||
    (c.code && c.code.toLowerCase() === sectionName.toLowerCase())
  );

  if (matchedSection && matchedSection.topics) {
    // 1. Try matching by exact topic name
    const exactTopicObj = matchedSection.topics.find(t => 
      t.topicName.toLowerCase().includes(topicName.toLowerCase()) ||
      topicName.toLowerCase().includes(t.topicName.toLowerCase())
    );

    if (exactTopicObj) {
      matchedFormulas = exactTopicObj.formulas;
    } else {
      // 2. Fallback: Flatten all formulas in parent section
      matchedFormulas = matchedSection.topics.flatMap(t => t.formulas);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl w-full max-w-3xl max-h-[88vh] flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                Concept & Study Guide
              </h2>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-bold">
                {sectionName} • {topicName} {subtopicName ? `— ${subtopicName}` : ''}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenCalc}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <Calculator className="w-4 h-4 text-blue-500" />
              <span>Scientific Calc</span>
            </button>

            <button 
              onClick={onClose} 
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3 Tab Navigation Bar */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-900 px-6 pt-2 gap-2 text-xs font-bold">
          <button
            onClick={() => setActiveTab('formulas')}
            className={`px-4 py-2.5 rounded-t-xl border-b-2 transition flex items-center gap-2 ${
              activeTab === 'formulas'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-800 shadow-2xs font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Core Formulas ({matchedFormulas.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('explanation')}
            className={`px-4 py-2.5 rounded-t-xl border-b-2 transition flex items-center gap-2 ${
              activeTab === 'explanation'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-800 shadow-2xs font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Step-by-Step Explanation</span>
          </button>

          <button
            onClick={() => setActiveTab('tips')}
            className={`px-4 py-2.5 rounded-t-xl border-b-2 transition flex items-center gap-2 ${
              activeTab === 'tips'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-800 shadow-2xs font-extrabold'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Lightbulb className="w-4 h-4 text-emerald-500" />
            <span>GATE Exam Tips</span>
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm leading-relaxed flex-1">
          
          {/* Active Question Summary Header Box */}
          <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/60 space-y-2">
            <div className="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              <span>Target Question (GATE {question.year})</span>
              <span>{question.type} • {question.marks} {question.marks === 1 ? 'Mark' : 'Marks'}</span>
            </div>
            <div className="font-medium text-slate-900 dark:text-slate-100">
              <MathRenderer content={question.question} />
            </div>
          </div>

          {/* TAB 1: CORE FORMULAS */}
          {activeTab === 'formulas' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Governing Formulas for {topicName}</span>
                </h3>
                <span className="text-[10px] font-mono text-slate-400">Section: {sectionName}</span>
              </div>

              {matchedFormulas.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {matchedFormulas.map((item, idx) => (
                    <div key={idx} className="card-3d rounded-2xl p-4 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-bold text-xs text-slate-900 dark:text-white">{item.title}</h4>
                        {item.unit && (
                          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 shrink-0">
                            {item.unit}
                          </span>
                        )}
                      </div>

                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-center overflow-x-auto text-emerald-400 text-xs shadow-inner">
                        <MathRenderer content={item.formula} inline={false} />
                      </div>

                      <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                        {item.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 text-slate-500 text-xs text-center space-y-2 border border-slate-200 dark:border-slate-800">
                  <p className="font-bold text-slate-700 dark:text-slate-300">Standard Formula Reference</p>
                  <p>Apply standard GATE Agricultural Engineering equations for {topicName}.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: STEP-BY-STEP EXPLANATION */}
          {activeTab === 'explanation' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Step-by-Step Solution & Method</span>
                </h3>
                {solutionText && (
                  <button
                    onClick={handleCopyExplanation}
                    className="flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy Solution'}</span>
                  </button>
                )}
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-4">
                <div className="flex items-center justify-between text-xs font-bold border-b border-slate-200 dark:border-slate-700 pb-2">
                  <span className="text-slate-500">Official Correct Answer:</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400 font-extrabold text-sm">{question.correct_answer}</span>
                </div>

                <div className="text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200 font-medium">
                  {solutionText ? (
                    <MathRenderer content={solutionText} inline={false} />
                  ) : (
                    <p className="italic text-slate-400">Official verified answer key is {question.correct_answer}.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: GATE EXAM TIPS */}
          {activeTab === 'tips' && (
            <div className="space-y-4">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-emerald-500" />
                <span>GATE Exam Methodology & Common Traps</span>
              </h3>

              <div className="grid grid-cols-1 gap-3">
                <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/60 space-y-2">
                  <h4 className="font-bold text-xs text-amber-900 dark:text-amber-300 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span>Unit Conversions & Dimensional Consistency</span>
                  </h4>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    Always convert velocity to m/s (multiply km/h by 5/18), pressure to Pascals (Pa or N/m²), and discharge to m³/s before plugging values into equations.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-900/60 space-y-2">
                  <h4 className="font-bold text-xs text-emerald-900 dark:text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>NAT (Numerical Answer Type) Precision Rules</span>
                  </h4>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    Do not round off intermediate steps. Keep full precision in the GATE Scientific Calculator memory and round off only the final answer to the requested decimal places (usually 2 decimal places).
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/60 space-y-2">
                  <h4 className="font-bold text-xs text-blue-900 dark:text-blue-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-500" />
                    <span>Process & Drying Moisture Basis Caution</span>
                  </h4>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                    Check whether moisture is specified on Wet Basis (\(M_{wb}\)) or Dry Basis (\(M_{db}\)). Bone-dry solid mass remains constant during drying operations!
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
          <span className="text-[11px] font-mono text-slate-400">GATE AG Prep Study Guide</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs transition shadow-md"
          >
            Close Study Guide
          </button>
        </div>

      </div>
    </div>
  );
}
