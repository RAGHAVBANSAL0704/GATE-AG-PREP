import React, { useState } from 'react';
import { Edit3, X, Save, Eye, Sparkles, Check } from 'lucide-react';
import MathRenderer from './MathRenderer';

export default function QuestionEditorModal({ question, onSave, onClose }) {
  if (!question) return null;

  const [formData, setFormData] = useState({
    id: question.id,
    qnum: question.qnum || 1,
    year: question.year || '2027',
    section: question.section || 'Engineering Mathematics',
    topic: question.topic || '',
    subtopic: question.subtopic || '',
    type: question.type || 'MCQ',
    marks: question.marks || 1,
    negative_marks: question.negative_marks || (question.type === 'MCQ' ? (question.marks === 2 ? 0.67 : 0.33) : 0),
    question: question.question || '',
    options: question.options ? { ...question.options } : { A: '', B: '', C: '', D: '' },
    correct_answer: question.correct_answer || 'A',
    solution: question.solution || question.explanation || ''
  });

  const [showLivePreview, setShowLivePreview] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleTextChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleOptionChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      options: {
        ...prev.options,
        [key]: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = {
      ...question,
      ...formData,
      options: formData.type === 'NAT' ? null : formData.options
    };
    onSave(updated);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <span>Manual Question Editor</span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-mono">
                  {formData.id}
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Edit question statement, math formulas, option text, answer key, or step-by-step solution with live KaTeX preview.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowLivePreview(!showLivePreview)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                showLivePreview 
                  ? 'bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800' 
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
              }`}
            >
              <Eye className="w-4 h-4" />
              <span>{showLivePreview ? 'Hide Preview' : 'Show Preview'}</span>
            </button>

            <button 
              onClick={onClose} 
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Metadata Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs">
            <div>
              <label className="block font-bold text-slate-400 uppercase tracking-wider mb-1">Section</label>
              <select
                value={formData.section}
                onChange={(e) => handleTextChange('section', e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-100 font-semibold outline-none"
              >
                <option value="Engineering Mathematics">Engineering Mathematics</option>
                <option value="Farm Power and Machinery">Farm Power and Machinery</option>
                <option value="Soil and Water Conservation Engineering">Soil and Water Conservation Engineering</option>
                <option value="Agricultural Process Engineering">Agricultural Process Engineering</option>
                <option value="General Aptitude">General Aptitude</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-400 uppercase tracking-wider mb-1">Question Type</label>
              <select
                value={formData.type}
                onChange={(e) => handleTextChange('type', e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-100 font-semibold outline-none"
              >
                <option value="MCQ">MCQ (Multiple Choice)</option>
                <option value="MSQ">MSQ (Multiple Select)</option>
                <option value="NAT">NAT (Numerical Answer)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-400 uppercase tracking-wider mb-1">Marks</label>
              <select
                value={formData.marks}
                onChange={(e) => handleTextChange('marks', Number(e.target.value))}
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-100 font-semibold outline-none"
              >
                <option value={1}>1 Mark</option>
                <option value={2}>2 Marks</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-400 uppercase tracking-wider mb-1">Correct Answer</label>
              <input
                type="text"
                value={formData.correct_answer}
                onChange={(e) => handleTextChange('correct_answer', e.target.value)}
                placeholder="e.g. A, B, or 0.23 to 0.25"
                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-100 font-bold outline-none"
              />
            </div>
          </div>

          {/* Topic & Subtopic Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-400 uppercase tracking-wider mb-1">Topic Name</label>
              <input
                type="text"
                value={formData.topic}
                onChange={(e) => handleTextChange('topic', e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-slate-100 font-medium outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-400 uppercase tracking-wider mb-1">Sub-Topic / Keyword</label>
              <input
                type="text"
                value={formData.subtopic}
                onChange={(e) => handleTextChange('subtopic', e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-slate-100 font-medium outline-none"
              />
            </div>
          </div>

          {/* Question Text Editor */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Question Statement (Use $$ ... $$ for equations or $ ... $ for inline math)
              </label>
            </div>
            <textarea
              rows={4}
              value={formData.question}
              onChange={(e) => handleTextChange('question', e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 text-sm font-sans text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-purple-500 leading-relaxed"
            />

            {showLivePreview && formData.question && (
              <div className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/50 space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Live Rendered Question Statement Preview</span>
                </span>
                <div className="text-base font-semibold text-slate-900 dark:text-slate-100 leading-relaxed pt-1">
                  <MathRenderer content={formData.question} />
                </div>
              </div>
            )}
          </div>

          {/* MCQ / MSQ Options Editor */}
          {formData.type !== 'NAT' && (
            <div className="space-y-4 pt-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Options Statements (A, B, C, D)
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {['A', 'B', 'C', 'D'].map((key) => (
                  <div key={key} className="space-y-1.5 bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center">
                        {key}
                      </span>
                      <span className="text-xs font-bold text-slate-500">Option {key}</span>
                    </div>
                    <textarea
                      rows={2}
                      value={formData.options?.[key] || ''}
                      onChange={(e) => handleOptionChange(key, e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-slate-100 outline-none"
                    />
                    {showLivePreview && formData.options?.[key] && (
                      <div className="text-xs font-medium text-slate-800 dark:text-slate-200 pt-1 border-t border-slate-200 dark:border-slate-800">
                        <MathRenderer content={formData.options[key]} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Detailed Solution / Explanation Editor */}
          <div className="space-y-2 pt-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Detailed Step-by-Step Solution & Derivation
            </label>
            <textarea
              rows={5}
              value={formData.solution}
              onChange={(e) => handleTextChange('solution', e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 text-xs font-sans text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-purple-500 leading-relaxed"
            />

            {showLivePreview && formData.solution && (
              <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 space-y-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Live Rendered Solution Preview</span>
                </span>
                <div className="text-xs text-slate-800 dark:text-slate-200 leading-relaxed pt-1">
                  <MathRenderer content={formData.solution} />
                </div>
              </div>
            )}
          </div>

          {/* Submit Footer */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="text-xs text-slate-500">
              {saveSuccess ? (
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  <span>Saved to localStorage & active across all modes!</span>
                </span>
              ) : (
                <span>Changes persist in browser localStorage across session refreshes.</span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  const updated = {
                    ...question,
                    ...formData,
                    options: formData.type === 'NAT' ? null : formData.options
                  };
                  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(updated, null, 2));
                  const downloadAnchor = document.createElement('a');
                  downloadAnchor.setAttribute("href", dataStr);
                  downloadAnchor.setAttribute("download", `${formData.id}_permanent_backup.json`);
                  document.body.appendChild(downloadAnchor);
                  downloadAnchor.click();
                  downloadAnchor.remove();
                }}
                className="px-4 py-2.5 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold text-xs hover:bg-blue-600 hover:text-white transition"
                title="Download JSON backup to save permanently on disk"
              >
                Download JSON Backup
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-md transition"
              >
                <Save className="w-4 h-4" />
                <span>Save Question Edits</span>
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
