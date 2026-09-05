import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  Edit3, 
  Save, 
  Check, 
  FileText, 
  Sparkles, 
  Layers, 
  BookOpen, 
  Plus, 
  Trash2, 
  Copy,
  Download,
  Upload,
  RefreshCw, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  ChevronLeft,
  ChevronRight,
  Code,
  Zap,
  HelpCircle,
  Grid,
  ListFilter,
  CheckSquare
} from 'lucide-react';
import MathRenderer from './MathRenderer';
import { GATE_AG_SYLLABUS } from '../data/syllabus';
import { getOfficialSections, getOfficialTopicsForSection, getOfficialSubtopicsForTopic, normalizeSectionTitle } from '../utils/syllabusTaxonomy.js';
import { getQuestionNumber, sortQuestionsByNumber } from '../utils/questionUtils.js';

const QUICK_LATEX_HELPERS = [
  { label: 'Fraction', latex: '\\frac{a}{b}' },
  { label: 'Square Root', latex: '\\sqrt{x}' },
  { label: 'Subscript/Power', latex: 'x^{2}_{1}' },
  { label: 'Efficiency (η)', latex: '\\eta_{th}' },
  { label: 'Integral', latex: '\\int_{0}^{T}' },
  { label: 'Degree C', latex: '\\degree C' },
  { label: 'Fluid Head', latex: '\\rho g h' },
  { label: 'BHP Power', latex: 'P = \\frac{2\\pi N T}{60000}' },
  { label: 'Delta (Δ)', latex: '\\Delta P' }
];

export default function AdminQuestionManager({ 
  questions = [], 
  mockPapers = [],
  customMockPapers = [], 
  onSaveEditedQuestion,
  onOpenCalc 
}) {
  const [studioMode, setStudioMode] = useState('custom-mocks');
  const [selectedPaperTitle, setSelectedPaperTitle] = useState('');
  const [selectedSectionFilter, setSelectedSectionFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showQuestionPalette, setShowQuestionPalette] = useState(true);

  // Currently selected question index
  const [paperQIndex, setPaperQIndex] = useState(0);
  const [syncStatusMsg, setSyncStatusMsg] = useState('');

  // Active question edit form state
  const [formData, setFormData] = useState({
    id: '',
    qnum: 1,
    year: 2026,
    paperTitle: '',
    section: 'Section 2: Farm Machinery',
    topic: 'Farm Machinery',
    subtopic: 'Soil tillage',
    type: 'MCQ',
    marks: 1,
    question: '',
    options: { A: '', B: '', C: '', D: '' },
    correct_answer: 'A',
    solution: ''
  });

  const customPapersList = customMockPapers || [];
  const officialPYQYears = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007];

  // Helper: Available topics for selected section
  const availableTopics = useMemo(() => {
    return getOfficialTopicsForSection(formData.section);
  }, [formData.section]);

  // Helper: Available subtopics for selected section & topic
  const availableSubtopics = useMemo(() => {
    return getOfficialSubtopicsForTopic(formData.section, formData.topic);
  }, [formData.section, formData.topic]);

  useEffect(() => {
    if (studioMode === 'custom-mocks' && customPapersList.length > 0) {
      if (!selectedPaperTitle || !customPapersList.some(p => p.title === selectedPaperTitle)) {
        setSelectedPaperTitle(customPapersList[0].title);
      }
    } else if (studioMode === 'official-pyqs') {
      if (!selectedPaperTitle || !selectedPaperTitle.startsWith('GATE ')) {
        setSelectedPaperTitle('GATE 2026');
      }
    }
  }, [studioMode, customPapersList]);

  // Gather active questions list and sort deterministically by Question Number (Q1 to Q65)
  const activeQuestionsList = useMemo(() => {
    let list = [];
    if (studioMode === 'custom-mocks') {
      const paper = customPapersList.find(p => p.title === selectedPaperTitle);
      list = paper ? (paper.questions || []) : [];
    } else if (studioMode === 'official-pyqs') {
      const yearNum = parseInt(selectedPaperTitle.replace(/\D/g, ''), 10);

      // Check official mockPapers array first
      const officialPaper = (mockPapers || []).find(p => {
        const pYear = parseInt(p.year, 10);
        return pYear === yearNum || (p.title && p.title.includes(String(yearNum)));
      });

      if (officialPaper && officialPaper.questions && officialPaper.questions.length > 0) {
        list = officialPaper.questions;
      } else {
        list = questions.filter(q => {
          const qYear = parseInt(q.year, 10);
          return qYear === yearNum || (q.paperTitle && q.paperTitle.includes(String(yearNum))) || (q.id && q.id.includes(`GATE_${yearNum}`));
        });
      }
    } else {
      list = questions.filter(q => {
        if (selectedSectionFilter !== 'All' && normalizeSectionTitle(q.section) !== normalizeSectionTitle(selectedSectionFilter)) return false;
        if (searchQuery.trim() && !q.question.toLowerCase().includes(searchQuery.toLowerCase()) && !q.id.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
      });
    }

    // Sort questions strictly by ascending Question Number so Palette Q65 opens actual Q65
    return [...list].sort((a, b) => {
      const numA = getQuestionNumber(a, 0);
      const numB = getQuestionNumber(b, 0);
      return numA - numB;
    });
  }, [studioMode, selectedPaperTitle, selectedSectionFilter, searchQuery, customPapersList, mockPapers, questions]);

  // Load selected question into form
  useEffect(() => {
    if (activeQuestionsList.length > 0) {
      const safeIndex = Math.min(paperQIndex, activeQuestionsList.length - 1);
      const q = activeQuestionsList[safeIndex];
      if (q) {
        const canonSec = normalizeSectionTitle(q.section);
        const canonTopics = getOfficialTopicsForSection(canonSec);
        let canonTopic = 'None';
        if (q.topic && q.topic !== 'None') {
          canonTopic = canonTopics.find(t => t.topic_name.toLowerCase() === q.topic.toLowerCase())?.topic_name || q.topic;
        }
        const canonSubs = getOfficialSubtopicsForTopic(canonSec, canonTopic);
        let canonSub = 'None';
        if (q.subtopic && q.subtopic !== 'None') {
          canonSub = canonSubs.find(s => s.toLowerCase() === q.subtopic.toLowerCase()) || q.subtopic;
        }

        setFormData({
          id: q.id || '',
          qnum: getQuestionNumber(q, safeIndex),
          year: q.year || 2026,
          paperTitle: q.paperTitle || selectedPaperTitle,
          section: canonSec,
          topic: canonTopic,
          subtopic: canonSub,
          type: q.type || 'MCQ',
          marks: q.marks || 1,
          question: q.question || '',
          options: q.options || { A: '', B: '', C: '', D: '' },
          correct_answer: q.correct_answer || 'A',
          solution: q.solution || ''
        });
      }
    }
  }, [paperQIndex, activeQuestionsList, selectedPaperTitle]);

  const handleSectionChange = (newSectionTitle) => {
    const topics = getOfficialTopicsForSection(newSectionTitle);
    const firstTopic = topics[0]?.topic_name || 'None';
    const firstSubtopic = getOfficialSubtopicsForTopic(newSectionTitle, firstTopic)[0] || 'None';

    setFormData(prev => ({
      ...prev,
      section: newSectionTitle,
      topic: firstTopic,
      subtopic: firstSubtopic
    }));
  };

  const handleTopicChange = (newTopicName) => {
    if (!newTopicName || newTopicName === 'None') {
      setFormData(prev => ({
        ...prev,
        topic: 'None',
        subtopic: 'None'
      }));
      return;
    }
    const subs = getOfficialSubtopicsForTopic(formData.section, newTopicName);
    const firstSub = subs[0] || 'None';
    setFormData(prev => ({
      ...prev,
      topic: newTopicName,
      subtopic: firstSub
    }));
  };

  const handleFormOptionChange = (key, val) => {
    setFormData(prev => ({
      ...prev,
      options: {
        ...prev.options,
        [key]: val
      }
    }));
  };

  // 1-Click Interactive Answer Key Picker handler
  const handleToggleAnswerKeyPill = (optionKey) => {
    if (formData.type === 'MCQ') {
      // Single choice key
      setFormData(prev => ({ ...prev, correct_answer: optionKey }));
    } else if (formData.type === 'MSQ') {
      // Multiple choice keys e.g. "A,B"
      const currentKeys = (formData.correct_answer || '').split(',').map(s => s.trim()).filter(Boolean);
      let updatedKeys;
      if (currentKeys.includes(optionKey)) {
        updatedKeys = currentKeys.filter(k => k !== optionKey);
      } else {
        updatedKeys = [...currentKeys, optionKey].sort();
      }
      setFormData(prev => ({ ...prev, correct_answer: updatedKeys.join(',') || optionKey }));
    }
  };

  const insertLatexToField = (targetField, latexSnippet) => {
    setFormData(prev => ({
      ...prev,
      [targetField]: (prev[targetField] || '') + ` \\(${latexSnippet}\\) `
    }));
  };

  const handleSaveCurrentQuestion = (e) => {
    if (e) e.preventDefault();
    if (!formData.question.trim()) {
      alert("Question text cannot be empty.");
      return;
    }

    const payload = {
      ...formData,
      section: normalizeSectionTitle(formData.section),
      paperTitle: selectedPaperTitle
    };

    onSaveEditedQuestion(payload);

    setSyncStatusMsg(`✅ Saved answer & question #${formData.id} in ${selectedPaperTitle}!`);
    setTimeout(() => setSyncStatusMsg(''), 3000);
  };

  const handleDuplicateQuestion = () => {
    const newId = `${formData.id}_copy_${Date.now().toString().slice(-4)}`;
    const copyPayload = {
      ...formData,
      id: newId,
      question: `[Copy] ${formData.question}`
    };

    onSaveEditedQuestion(copyPayload);
    setSyncStatusMsg(`📋 Duplicate question created with ID: ${newId}`);
    setTimeout(() => setSyncStatusMsg(''), 3500);
  };

  const handleAddNewQuestion = () => {
    let yearNum = 2026;
    if (studioMode === 'official-pyqs') {
      const parsed = parseInt(selectedPaperTitle.replace(/\D/g, ''), 10);
      if (!isNaN(parsed)) yearNum = parsed;
    }

    const newId = `q_${studioMode === 'official-pyqs' ? 'pyq_' + yearNum : 'custom'}_${Date.now().toString().slice(-5)}`;
    const newQ = {
      id: newId,
      year: yearNum,
      paperTitle: selectedPaperTitle || `GATE ${yearNum}`,
      section: formData.section || 'Section 2: Farm Machinery & Power',
      topic: formData.topic || 'Farm Machinery & Implements',
      subtopic: formData.subtopic || 'Primary & Secondary Tillage Implements',
      type: 'MCQ',
      marks: 1,
      question: `[${selectedPaperTitle || 'Official PYQ'}] Enter question text or LaTeX formula here...`,
      options: { A: 'Option A', B: 'Option B', C: 'Option C', D: 'Option D' },
      correct_answer: 'A',
      solution: 'Step 1: Given parameters...\nStep 2: Formula derivation...'
    };

    onSaveEditedQuestion(newQ);
    setSyncStatusMsg(`✨ Added new question #${newId} to ${selectedPaperTitle}!`);
    setTimeout(() => setSyncStatusMsg(''), 3500);
  };

  const handleExportPaperJson = () => {
    const jsonStr = JSON.stringify(activeQuestionsList, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedPaperTitle.replace(/[\s/]/g, '_')}_questions.json`;
    a.click();
    URL.revokeObjectURL(url);

    setSyncStatusMsg(`📥 Downloaded ${activeQuestionsList.length} questions as JSON!`);
    setTimeout(() => setSyncStatusMsg(''), 3500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-200">
      
      {/* Studio Header Banner */}
      <div className="card-3d rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-blue-50/70 via-slate-50 to-indigo-50/50 dark:from-slate-900 dark:via-blue-950 dark:to-slate-950 text-slate-900 dark:text-white space-y-4 shadow-sm dark:shadow-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-500/20 border border-blue-200 dark:border-blue-400/40 flex items-center justify-center text-blue-600 dark:text-blue-300 shadow-xs">
              <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white flex items-center gap-2">
                <span>Question Refinement Studio</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-500/30 text-blue-700 dark:text-blue-200 border border-blue-200 dark:border-blue-400/30 font-mono">
                  Answer Key & PYQ Editor
                </span>
              </h1>
              <p className="text-xs text-slate-600 dark:text-blue-200/80">
                1-Click Answer Key picker for Official PYQs & Custom Mocks with instant KaTeX live preview.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleAddNewQuestion}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add Question to {selectedPaperTitle || 'Paper'}</span>
            </button>

            <button
              onClick={handleExportPaperJson}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white font-bold text-xs shadow-xs transition"
            >
              <Download className="w-4 h-4" />
              <span>Export JSON</span>
            </button>
          </div>
        </div>

        {/* Status Alert */}
        {syncStatusMsg && (
          <div className="p-3 rounded-xl bg-blue-950/90 border border-blue-400/40 text-xs font-bold text-blue-200 flex items-center gap-2 animate-in fade-in">
            <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
            <span>{syncStatusMsg}</span>
          </div>
        )}

        {/* View Modes */}
        <div className="flex border-b border-blue-500/30 pt-2 gap-2 text-xs font-bold">
          <button
            onClick={() => { setStudioMode('custom-mocks'); setPaperQIndex(0); }}
            className={`px-4 py-2.5 rounded-t-xl transition flex items-center gap-2 ${
              studioMode === 'custom-mocks'
                ? 'bg-white text-blue-950 font-extrabold shadow-md'
                : 'text-blue-200 hover:bg-white/10'
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Custom Mock Papers ({customPapersList.length})</span>
          </button>

          <button
            onClick={() => { setStudioMode('official-pyqs'); setPaperQIndex(0); }}
            className={`px-4 py-2.5 rounded-t-xl transition flex items-center gap-2 ${
              studioMode === 'official-pyqs'
                ? 'bg-white text-blue-950 font-extrabold shadow-md'
                : 'text-blue-200 hover:bg-white/10'
            }`}
          >
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>Official PYQ Papers (2007–2026)</span>
          </button>

          <button
            onClick={() => { setStudioMode('all-questions'); setPaperQIndex(0); }}
            className={`px-4 py-2.5 rounded-t-xl transition flex items-center gap-2 ${
              studioMode === 'all-questions'
                ? 'bg-white text-blue-950 font-extrabold shadow-md'
                : 'text-blue-200 hover:bg-white/10'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>Search & Filter All ({questions.length})</span>
          </button>
        </div>
      </div>

      {/* Paper Selector & Palette Bar */}
      {studioMode !== 'all-questions' ? (
        <div className="space-y-3">
          <div className="card-3d rounded-2xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Select Active Paper:
              </span>
              <select
                value={selectedPaperTitle}
                onChange={(e) => { setSelectedPaperTitle(e.target.value); setPaperQIndex(0); }}
                className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 dark:text-slate-100 outline-none focus:ring-1 focus:ring-blue-500"
              >
                {studioMode === 'custom-mocks' ? (
                  customPapersList.map(p => (
                    <option key={p.id || p.title} value={p.title}>{p.title} ({p.questions?.length || 0} Qs)</option>
                  ))
                ) : (
                  officialPYQYears.map(yr => {
                    const count = (mockPapers.find(p => parseInt(p.year, 10) === yr)?.questions?.length) || 
                                  (questions.filter(q => parseInt(q.year, 10) === yr).length);
                    return (
                      <option key={yr} value={`GATE ${yr}`}>GATE {yr} Official Paper ({count} Qs)</option>
                    );
                  })
                )}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowQuestionPalette(!showQuestionPalette)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-bold hover:bg-slate-200 transition"
              >
                <Grid className="w-3.5 h-3.5 text-blue-500" />
                <span>{showQuestionPalette ? 'Hide Palette' : 'Show Palette'}</span>
              </button>

              <button
                onClick={() => setPaperQIndex(Math.max(0, paperQIndex - 1))}
                disabled={paperQIndex === 0}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-30 hover:bg-slate-200 transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100 px-1">
                Q.{activeQuestionsList[paperQIndex] ? getQuestionNumber(activeQuestionsList[paperQIndex], paperQIndex) : (paperQIndex + 1)} ({paperQIndex + 1} of {activeQuestionsList.length})
              </span>
              <button
                onClick={() => setPaperQIndex(Math.min(activeQuestionsList.length - 1, paperQIndex + 1))}
                disabled={paperQIndex >= activeQuestionsList.length - 1}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-30 hover:bg-slate-200 transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Question Grid Palette */}
          {showQuestionPalette && activeQuestionsList.length > 0 && (
            <div className="card-3d rounded-2xl p-4 space-y-2 bg-slate-50/50 dark:bg-slate-950/40">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <span>Interactive Question Map for {selectedPaperTitle}</span>
                <span>Click tile to jump directly to question number</span>
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pt-1">
                {activeQuestionsList.map((q, idx) => {
                  const qNum = getQuestionNumber(q, idx);
                  const isSelected = idx === paperQIndex;
                  const hasSolution = Boolean(q.solution && q.solution.trim());
                  return (
                    <button
                      key={q.id || idx}
                      onClick={() => setPaperQIndex(idx)}
                      className={`w-8 h-8 rounded-lg text-xs font-mono font-bold transition flex items-center justify-center border ${
                        isSelected 
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-400' 
                          : hasSolution 
                            ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                      }`}
                      title={`Q${qNum} (${q.id || 'Custom'}): Key: ${q.correct_answer || 'N/A'} | ${q.type || 'MCQ'} (${q.marks || 1}M)`}
                    >
                      {qNum}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Global Search Bar */
        <div className="card-3d rounded-2xl p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search question text or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs font-sans text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <select
              value={selectedSectionFilter}
              onChange={(e) => setSelectedSectionFilter(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Syllabus Sections</option>
              {GATE_AG_SYLLABUS.map(sec => <option key={sec.id} value={sec.title}>{sec.title}</option>)}
            </select>
          </div>
        </div>
      )}

      {/* Editor & Live KaTeX Preview Grid */}
      {activeQuestionsList.length === 0 ? (
        <div className="card-3d rounded-2xl p-12 text-center space-y-4">
          <BookOpen className="w-10 h-10 text-blue-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            No questions currently in {selectedPaperTitle}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            You can add the first question to {selectedPaperTitle} or refine existing questions.
          </p>
          <button
            onClick={handleAddNewQuestion}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-md transition inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Question to {selectedPaperTitle}</span>
          </button>
        </div>
      ) : (
        <div className="w-full card-3d rounded-2xl p-6 sm:p-8 space-y-6">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <span className="text-sm font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center gap-2">
              <Edit3 className="w-4 h-4" />
              <span>Editing {selectedPaperTitle} — Q.{getQuestionNumber(formData, paperQIndex)} ({formData.id})</span>
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleDuplicateQuestion}
                className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition flex items-center gap-1.5"
                title="Duplicate question"
              >
                <Copy className="w-3.5 h-3.5 text-blue-500" />
                <span>Duplicate</span>
              </button>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                {formData.type} ({formData.marks}M)
              </span>
            </div>
          </div>

          <form onSubmit={handleSaveCurrentQuestion} className="space-y-5 text-xs">
            
            {/* Syllabus Categorization */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                <ListFilter className="w-4 h-4" />
                <span>Syllabus Categorization</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Section</label>
                  <select
                    value={formData.section}
                    onChange={(e) => handleSectionChange(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-2.5 py-2 text-slate-900 dark:text-slate-100 font-medium"
                  >
                    {GATE_AG_SYLLABUS.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Topic</label>
                  <select
                    value={formData.topic || 'None'}
                    onChange={(e) => handleTopicChange(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-2.5 py-2 text-slate-900 dark:text-slate-100 font-medium"
                  >
                    <option value="None">None / Miscellaneous</option>
                    {availableTopics.map((t, idx) => (
                      <option key={idx} value={t.topic_name}>{t.topic_name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Subtopic</label>
                  <select
                    value={formData.subtopic || 'None'}
                    onChange={(e) => setFormData({ ...formData, subtopic: e.target.value })}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-2.5 py-2 text-slate-900 dark:text-slate-100 font-medium"
                  >
                    <option value="None">None / General</option>
                    {availableSubtopics.map((sub, idx) => (
                      <option key={idx} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Type & Marks */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Question Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-100 font-medium"
                >
                  <option value="MCQ">MCQ (Multiple Choice)</option>
                  <option value="MSQ">MSQ (Multiple Select)</option>
                  <option value="NAT">NAT (Numerical Answer)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Marks Weightage</label>
                <select
                  value={formData.marks}
                  onChange={(e) => setFormData({ ...formData, marks: parseInt(e.target.value, 10) })}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-100 font-medium"
                >
                  <option value={1}>1 Mark Question</option>
                  <option value={2}>2 Marks Question</option>
                </select>
              </div>
            </div>

            {/* Quick Agricultural Engineering LaTeX Toolbar */}
            <div className="space-y-1.5 p-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-500" /> Quick LaTeX Math Toolbar:
              </span>
              <div className="flex flex-wrap gap-1">
                {QUICK_LATEX_HELPERS.map((helper, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => insertLatexToField('question', helper.latex)}
                    className="px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white transition font-bold"
                    title={`Insert ${helper.latex} into Question`}
                  >
                    {helper.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Text & Real-Time Live Preview Along Editing */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block font-semibold text-slate-700 dark:text-slate-300">
                  Question Content (Supports LaTeX Math e.g. \( E = mc^2 \))
                </label>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Live Question Preview</span>
                </span>
              </div>
              
              <textarea
                rows={7}
                required
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                placeholder="Enter complete question text here... Supports LaTeX equations (e.g. \( E = mc^2 \) or $$ \int_0^1 f(x)dx $$)."
                className="w-full min-h-[160px] bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-slate-900 dark:text-slate-100 font-mono text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 placeholder:text-slate-400 placeholder:text-xs sm:placeholder:text-sm resize-y"
              />

              {/* Inline Live Question KaTeX Preview */}
              <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-2 shadow-xs">
                <div className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                    <span>Live Question Preview (KaTeX Math)</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Updates live as you type</span>
                </div>
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-relaxed bg-white dark:bg-slate-900 p-3.5 rounded-lg border border-blue-100 dark:border-blue-950 min-h-[52px]">
                  <MathRenderer content={formData.question || 'Type question text above to see live KaTeX preview...'} />
                </div>
              </div>
            </div>

            {/* MCQ/MSQ Options */}
            {(formData.type === 'MCQ' || formData.type === 'MSQ') && formData.options && (
              <div className="space-y-2.5 pt-1">
                <label className="block font-semibold text-slate-700 dark:text-slate-300">Options (A, B, C, D)</label>
                {['A', 'B', 'C', 'D'].map((key) => (
                  <div key={key} className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleToggleAnswerKeyPill(key)}
                      className={`w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 transition ${
                        (formData.correct_answer || '').includes(key)
                          ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400'
                          : 'bg-blue-600 text-white opacity-60 hover:opacity-100'
                      }`}
                      title={`Click to set ${key} as Correct Answer Key`}
                    >
                      {key}
                    </button>
                    <input
                      type="text"
                      value={formData.options[key] || ''}
                      onChange={(e) => handleFormOptionChange(key, e.target.value)}
                      placeholder={`Option ${key} text`}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* 1-Click Interactive Answer Key Picker Section */}
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-3">
              <div className="flex items-center justify-between">
                <label className="font-extrabold text-xs text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
                  <CheckSquare className="w-4 h-4 text-emerald-500" />
                  <span>1-Click Answer Key Picker ({formData.type})</span>
                </label>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                  Active Key: {formData.correct_answer || 'None'}
                </span>
              </div>

              {(formData.type === 'MCQ' || formData.type === 'MSQ') ? (
                <div className="flex items-center gap-2 pt-1">
                  {['A', 'B', 'C', 'D'].map((key) => {
                    const isSelected = (formData.correct_answer || '').includes(key);
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleToggleAnswerKeyPill(key)}
                        className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs font-mono transition flex items-center justify-center gap-1.5 ${
                          isSelected
                            ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-400 font-extrabold'
                            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-emerald-500'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                        <span>Option {key}</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                /* NAT Numerical freeform input */
                <div className="space-y-2">
                  <input
                    type="text"
                    required
                    value={formData.correct_answer}
                    onChange={(e) => setFormData({ ...formData, correct_answer: e.target.value })}
                    placeholder="Numerical answer (e.g. 12.5 or 0.12 to 0.15)"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-slate-100 font-mono text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
              )}
            </div>

            {/* Solution & Real-Time Live Preview Along Editing */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block font-semibold text-slate-700 dark:text-slate-300">
                  Step-by-Step Solution / Derivation
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Live Answer Preview</span>
                  </span>
                  <div className="flex items-center gap-1 pl-2 border-l border-slate-200 dark:border-slate-800">
                    {QUICK_LATEX_HELPERS.slice(0, 3).map((helper, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => insertLatexToField('solution', helper.latex)}
                        className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline font-mono font-semibold"
                      >
                        +{helper.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <textarea
                rows={10}
                value={formData.solution}
                onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                placeholder="Enter comprehensive step-by-step mathematical derivation, governing formulas, numerical substitution, intermediate values, and final units (e.g. \( \eta = \frac{W}{Q_H} \))..."
                className="w-full min-h-[220px] bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-slate-900 dark:text-slate-100 font-mono text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 placeholder:text-slate-400 placeholder:text-xs sm:placeholder:text-sm resize-y"
              />

              {/* Inline Live Step-by-Step Solution KaTeX Preview */}
              <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 space-y-2 shadow-xs">
                <div className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Live Step-by-Step Solution Preview (KaTeX Math)</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Updates live as you type</span>
                </div>
                <div className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed bg-white dark:bg-slate-900 p-3.5 rounded-lg border border-emerald-100 dark:border-emerald-950 min-h-[52px]">
                  <MathRenderer content={formData.solution || 'Type step-by-step solution derivation above to see live KaTeX preview...'} />
                </div>
              </div>
            </div>

            <div className="pt-3 flex items-center justify-between">
              <button
                type="button"
                onClick={onOpenCalc}
                className="px-4 py-2.5 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold text-xs hover:bg-blue-600 hover:text-white transition"
              >
                Scientific Calc
              </button>

              <button
                type="submit"
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-md transition"
              >
                <Save className="w-4 h-4" />
                <span>Save Answer Key & Question</span>
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
}
