import React, { useState } from 'react';
import { Search, X, Check, Globe, Sparkles, Plus } from 'lucide-react';
import { ALL_INDIAN_EXAM_DOMAINS } from '../data/indianExams';

export default function ExamSelectorModal({ currentTargetExam, onSelectTargetExam, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomainFilter, setSelectedDomainFilter] = useState('All');
  const [customExamInput, setCustomExamInput] = useState('');

  const filteredDomains = ALL_INDIAN_EXAM_DOMAINS.map(domainGroup => {
    if (selectedDomainFilter !== 'All' && domainGroup.domain !== selectedDomainFilter) {
      return null;
    }
    const matchingExams = domainGroup.exams.filter(e => 
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      domainGroup.domain.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (matchingExams.length === 0) return null;
    return {
      ...domainGroup,
      exams: matchingExams
    };
  }).filter(Boolean);

  const handleSelectExam = (examObj) => {
    onSelectTargetExam(examObj);
    onClose();
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customExamInput.trim()) return;
    const customObj = {
      id: 'custom_' + Date.now(),
      name: customExamInput.trim(),
      domain: 'Custom Choice',
      badge: 'User Selected'
    };
    onSelectTargetExam(customObj);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold border border-blue-400/20 mb-1">
              <Globe className="w-3 h-3 text-blue-400" />
              <span>All India Exam Registry</span>
            </div>
            <h2 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
              Select Your Target Exam 🎯
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Domain Filter Toolbar */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 space-y-3 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search any exam in India (e.g. GATE AG, ICAR JRF, UPSC, NABARD, CAT, NEET)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>

          {/* Domain Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
            <button
              onClick={() => setSelectedDomainFilter('All')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                selectedDomainFilter === 'All'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 border border-slate-200 dark:border-slate-800'
              }`}
            >
              All Domains
            </button>
            {ALL_INDIAN_EXAM_DOMAINS.map(d => (
              <button
                key={d.domain}
                onClick={() => setSelectedDomainFilter(d.domain)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition whitespace-nowrap flex items-center gap-1 ${
                  selectedDomainFilter === d.domain
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 border border-slate-200 dark:border-slate-800'
                }`}
              >
                <span>{d.icon}</span>
                <span>{d.domain}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Exams List Scroll View */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-6 flex-1">
          
          {filteredDomains.length === 0 ? (
            <div className="text-center py-8 space-y-3">
              <Sparkles className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-xs text-slate-500">No matching exam found for "{searchTerm}".</p>
            </div>
          ) : (
            filteredDomains.map(group => (
              <div key={group.domain} className="space-y-2.5">
                <div className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800/80 pb-1">
                  <span>{group.icon}</span>
                  <span>{group.domain}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {group.exams.map(exam => {
                    const isSelected = currentTargetExam?.name === exam.name || (currentTargetExam?.id === exam.id);

                    return (
                      <div
                        key={exam.id}
                        onClick={() => handleSelectExam(exam)}
                        className={`p-3 rounded-xl border text-xs cursor-pointer transition flex items-center justify-between gap-2 ${
                          isSelected
                            ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 text-blue-900 dark:text-blue-200 font-bold shadow-xs'
                            : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-blue-400 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <div className="space-y-0.5 min-w-0">
                          <div className="font-extrabold truncate">{exam.name}</div>
                        </div>

                        {isSelected ? (
                          <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3" />
                          </div>
                        ) : exam.badge ? (
                          <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shrink-0">
                            {exam.badge}
                          </span>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}

          {/* Custom Write-in Exam Option */}
          <form onSubmit={handleCustomSubmit} className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-blue-500" />
              <span>Can't find your exam? Write-in Any Custom Exam in India:</span>
            </span>

            <div className="flex gap-2">
              <input
                type="text"
                required
                placeholder="Enter exact exam name (e.g. State Agri PSC / ICAR NET / GATE BT)..."
                value={customExamInput}
                onChange={(e) => setCustomExamInput(e.target.value)}
                className="flex-1 px-3.5 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-slate-100 outline-none focus:ring-1 focus:ring-blue-500 font-medium"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition shrink-0"
              >
                Set as Target
              </button>
            </div>
          </form>

        </div>

      </div>
    </div>
  );
}
