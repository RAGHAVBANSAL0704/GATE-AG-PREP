import React, { useState, useMemo } from 'react';
import { 
  X, 
  Sparkles, 
  BookOpen, 
  Layers, 
  AlertTriangle,
  Loader2,
  ChevronRight
} from 'lucide-react';
import allQuestions from '../data/questions.json';
import MathRenderer from './MathRenderer';
import { generateSimilarPracticeQuestion } from '../services/geminiService';

export default function SimilarQuestionsDrawer({
  isOpen,
  onClose,
  currentQuestion,
  onSelectQuestion
}) {
  const [aiPracticeQuestion, setAiPracticeQuestion] = useState(null);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [expandedSolutions, setExpandedSolutions] = useState({});

  // Compute similar official GATE questions
  const similarOfficialQuestions = useMemo(() => {
    if (!currentQuestion) return [];

    const currId = currentQuestion.id;
    const currSubtopic = (currentQuestion.subtopic || '').toLowerCase().trim();
    const currTopic = (currentQuestion.topic || '').toLowerCase().trim();
    const currSection = (currentQuestion.section || currentQuestion.subject || '').toLowerCase().trim();

    const scored = allQuestions
      .filter(q => q.id !== currId)
      .map(q => {
        let score = 0;
        const qSubtopic = (q.subtopic || '').toLowerCase().trim();
        const qTopic = (q.topic || '').toLowerCase().trim();
        const qSection = (q.section || q.subject || '').toLowerCase().trim();

        if (currSubtopic && qSubtopic && currSubtopic === qSubtopic) {
          score += 10;
        } else if (currSubtopic && qSubtopic && (currSubtopic.includes(qSubtopic) || qSubtopic.includes(currSubtopic))) {
          score += 6;
        }

        if (currTopic && qTopic && currTopic === qTopic) {
          score += 5;
        }

        if (currSection && qSection && currSection === qSection) {
          score += 2;
        }

        if (q.type === currentQuestion.type) {
          score += 1;
        }

        return { question: q, score };
      })
      .filter(item => item.score > 2)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map(item => item.question);

    return scored;
  }, [currentQuestion]);

  if (!isOpen || !currentQuestion) return null;

  const toggleSolution = (qId) => {
    setExpandedSolutions(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  const handleGenerateAiVariant = async () => {
    setIsGeneratingAi(true);
    try {
      const res = await generateSimilarPracticeQuestion(currentQuestion);
      setAiPracticeQuestion(res);
    } catch (e) {
      console.error('Failed to generate AI variant:', e);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const getDifficultyBadge = (difficulty) => {
    const diff = (difficulty || 'Moderate').toLowerCase();
    if (diff === 'easy') {
      return (
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50">
          Easy
        </span>
      );
    }
    if (diff === 'difficult' || diff === 'hard') {
      return (
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800/50">
          Difficult
        </span>
      );
    }
    return (
      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50">
        Moderate
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-[130] flex justify-end bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-sky-500 text-white flex items-center justify-center shadow-md">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                Similar Questions & Practice
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-xs">
                Related to: {currentQuestion.topic || currentQuestion.section || 'Current Question'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          
          {/* AI Variation Generator Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-sky-500/10 border border-purple-200 dark:border-purple-800/40 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-purple-900 dark:text-purple-300">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                  <span>Generate Conceptual AI Practice Variant</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Need more practice on this exact formula or model? Generate a fresh numerical variant.
                </p>
              </div>
              <button
                onClick={handleGenerateAiVariant}
                disabled={isGeneratingAi}
                className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                {isGeneratingAi ? (
                  <>
                    <Loader2 className="w-3 h-3 animate-spin" /> Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3 h-3" /> Generate
                  </>
                )}
              </button>
            </div>

            {/* AI Generated Question Result */}
            {aiPracticeQuestion && (
              <div className="mt-3 p-3.5 bg-white dark:bg-slate-900/90 rounded-xl border border-purple-300 dark:border-purple-800 space-y-2.5 animate-in fade-in">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-extrabold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-950/80 px-2 py-0.5 rounded-md border border-purple-200 dark:border-purple-800">
                    {aiPracticeQuestion.label}
                  </span>
                  <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Practice Only
                  </span>
                </div>

                <div className="text-[11px] text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 p-2 rounded-lg border border-amber-200 dark:border-amber-800/40">
                  {aiPracticeQuestion.disclaimer}
                </div>

                <div className="text-xs text-slate-800 dark:text-slate-200 font-medium">
                  <MathRenderer text={aiPracticeQuestion.question} />
                </div>

                {aiPracticeQuestion.options && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                    {Object.entries(aiPracticeQuestion.options).map(([optKey, optVal]) => (
                      <div key={optKey} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                        <span className="font-bold mr-1.5 text-slate-900 dark:text-white">({optKey})</span>
                        <MathRenderer text={optVal} className="inline" />
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <p className="font-bold text-slate-900 dark:text-white mb-1">
                    Answer: <span className="text-emerald-600 dark:text-emerald-400">{aiPracticeQuestion.answer}</span>
                  </p>
                  <MathRenderer text={aiPracticeQuestion.explanation} className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed" />
                </div>
              </div>
            )}
          </div>

          {/* Section: Official GATE PYQs */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-900 dark:text-white">
                  Official GATE AG PYQs ({similarOfficialQuestions.length})
                </h3>
              </div>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/40">
                100% Authoritative
              </span>
            </div>

            {similarOfficialQuestions.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-200 dark:border-slate-800">
                No closely matching questions found in this subtopic.
              </div>
            ) : (
              <div className="space-y-3">
                {similarOfficialQuestions.map((q) => {
                  const isExpanded = expandedSolutions[q.id];
                  const qYear = q.year || (q.id && q.id.includes('_') ? q.id.split('_')[1] : '');
                  const qText = q.question || q.questionText || '';
                  const qAns = q.correct_answer || q.answer || '';
                  const qExpl = q.solution || q.explanation || '';

                  return (
                    <div
                      key={q.id}
                      className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition"
                    >
                      {/* Meta Tags */}
                      <div className="flex flex-wrap items-center justify-between gap-1.5 text-xs">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60">
                            GATE {qYear || 'AG'}
                          </span>
                          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                            {q.marks || 1}M • {q.type}
                          </span>
                          {getDifficultyBadge(q.difficulty)}
                        </div>

                        {onSelectQuestion && (
                          <button
                            onClick={() => {
                              onSelectQuestion(q);
                              onClose();
                            }}
                            className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            Solve in View <ChevronRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>

                      {/* Topic & Subtopic */}
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{q.section}</span>
                        {q.topic ? ` • ${q.topic}` : ''}
                        {q.subtopic ? ` (${q.subtopic})` : ''}
                      </p>

                      {/* Question Text */}
                      <div className="text-xs text-slate-800 dark:text-slate-200 line-clamp-3">
                        <MathRenderer text={qText} />
                      </div>

                      {/* Options Preview */}
                      {q.options && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-slate-600 dark:text-slate-400">
                          {Array.isArray(q.options)
                            ? q.options.map((opt, i) => (
                                <div key={i} className="truncate">
                                  <span className="font-bold mr-1">({String.fromCharCode(65 + i)})</span>
                                  <span>{typeof opt === 'object' ? JSON.stringify(opt) : String(opt)}</span>
                                </div>
                              ))
                            : Object.entries(q.options).map(([k, v]) => (
                                <div key={k} className="truncate">
                                  <span className="font-bold mr-1">({k})</span>
                                  <span>{String(v)}</span>
                                </div>
                              ))}
                        </div>
                      )}

                      {/* Solution Toggle */}
                      <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                        <button
                          onClick={() => toggleSolution(q.id)}
                          className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
                        >
                          {isExpanded ? 'Hide Official Solution' : 'View Official Solution & Key'}
                        </button>
                      </div>

                      {isExpanded && (
                        <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-2 animate-in fade-in">
                          <p className="font-bold text-slate-900 dark:text-white">
                            Official Answer Key:{' '}
                            <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">
                              {Array.isArray(qAns) ? qAns.join(', ') : qAns}
                            </span>
                          </p>
                          {qExpl && (
                            <div className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-1.5">
                              <MathRenderer text={qExpl} />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
