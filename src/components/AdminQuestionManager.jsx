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
  CheckSquare,
  Flag,
  Image as ImageIcon
} from 'lucide-react';
import MathRenderer from './MathRenderer';
import QuestionImageUploader from './QuestionImageUploader';
import QuestionLivePreview from './QuestionLivePreview';
import { GATE_AG_SYLLABUS } from '../data/syllabus';
import { getOfficialSections, getOfficialTopicsForSection, getOfficialSubtopicsForTopic, normalizeSectionTitle } from '../utils/syllabusTaxonomy.js';
import { getQuestionNumber, sortQuestionsByNumber } from '../utils/questionUtils.js';
import { getAllQuestionReports, updateReportStatus } from '../services/questionReportService.js';
import { subscribeToLiveQuestionSync } from '../services/questionSyncService.js';

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

  // Reported Issues Triage State
  const [reportedIssuesList, setReportedIssuesList] = useState([]);
  const [reportStatusFilter, setReportStatusFilter] = useState('all');
  const [isLoadingReports, setIsLoadingReports] = useState(false);

  const refreshReports = async () => {
    setIsLoadingReports(true);
    try {
      const reps = await getAllQuestionReports();
      setReportedIssuesList(reps || []);
    } catch (e) {
      console.error('Failed to load reports', e);
    } finally {
      setIsLoadingReports(false);
    }
  };

  useEffect(() => {
    refreshReports();
  }, []);

  const handleUpdateReport = async (reportId, newStatus) => {
    await updateReportStatus(reportId, newStatus);
    await refreshReports();
    setSyncStatusMsg(`Report ${reportId} marked as ${newStatus}`);
    setTimeout(() => setSyncStatusMsg(''), 3000);
  };

  // Currently selected question index
  const [paperQIndex, setPaperQIndex] = useState(0);
  const [syncStatusMsg, setSyncStatusMsg] = useState('');
  const [editorViewMode, setEditorViewMode] = useState('split'); // 'split' | 'editor' | 'preview'

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
    difficulty: 'Moderate',
    question: '',
    image_url: '',
    options: { A: '', B: '', C: '', D: '' },
    correct_answer: 'A',
    solution: '',
    disable_hints: false,
    hint_level_1: '',
    hint_level_2: '',
    hint_level_3: '',
    hints: []
  });

  // Multi-Device & Cross-Tab Live Sync Listener
  useEffect(() => {
    const handleRemoteQuestionSync = (updatedQ) => {
      if (!updatedQ || !updatedQ.id) return;
      if (updatedQ.id === formData.id) {
        setFormData(prev => ({
          ...prev,
          ...updatedQ,
          options: updatedQ.options || prev.options,
          difficulty: updatedQ.difficulty || prev.difficulty,
          hints: updatedQ.hints || prev.hints
        }));
        setSyncStatusMsg(`⚡ Live update synced for question ${updatedQ.id}!`);
        setTimeout(() => setSyncStatusMsg(''), 3500);
      }
    };

    const unsubscribe = subscribeToLiveQuestionSync(handleRemoteQuestionSync);

    const handleLocalCustomEvent = (e) => {
      const q = e.detail;
      if (q && q.id === formData.id) {
        setFormData(prev => ({
          ...prev,
          ...q,
          options: q.options || prev.options,
          difficulty: q.difficulty || prev.difficulty,
          hints: q.hints || prev.hints
        }));
      }
    };

    window.addEventListener('gate_ag_question_updated', handleLocalCustomEvent);

    return () => {
      unsubscribe();
      window.removeEventListener('gate_ag_question_updated', handleLocalCustomEvent);
    };
  }, [formData.id]);

  const customPapersList = customMockPapers || [];
  const officialPYQYears = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007];

  const handleEditReportedQuestion = (rep) => {
    if (!rep || !rep.question_id) return;
    const targetId = rep.question_id;

    // 1. Check custom mock papers
    for (const paper of customPapersList) {
      const qList = [...(paper.questions || [])].sort((a, b) => getQuestionNumber(a, 0) - getQuestionNumber(b, 0));
      const idx = qList.findIndex(q => q.id === targetId);
      if (idx !== -1) {
        setSelectedPaperTitle(paper.title);
        setStudioMode('custom-mocks');
        setPaperQIndex(idx);
        setSyncStatusMsg(`Switched to ${paper.title} — Q.${getQuestionNumber(qList[idx], idx)}`);
        setTimeout(() => setSyncStatusMsg(''), 3000);
        return;
      }
    }

    // 2. Check official PYQ years
    for (const yr of officialPYQYears) {
      const yrStr = String(yr);
      if (targetId.includes(yrStr) || (rep.year && parseInt(rep.year, 10) === yr)) {
        const officialPaper = (mockPapers || []).find(p => parseInt(p.year, 10) === yr || (p.title && p.title.includes(yrStr)));
        const qList = (officialPaper && officialPaper.questions && officialPaper.questions.length > 0)
          ? officialPaper.questions
          : questions.filter(q => parseInt(q.year, 10) === yr || (q.id && q.id.includes(`GATE_${yr}`)));
        const sortedList = [...qList].sort((a, b) => getQuestionNumber(a, 0) - getQuestionNumber(b, 0));
        const idx = sortedList.findIndex(q => q.id === targetId);
        if (idx !== -1) {
          setSelectedPaperTitle(`GATE ${yr}`);
          setStudioMode('official-pyqs');
          setPaperQIndex(idx);
          setSyncStatusMsg(`Switched to GATE ${yr} — Q.${getQuestionNumber(sortedList[idx], idx)}`);
          setTimeout(() => setSyncStatusMsg(''), 3000);
          return;
        }
      }
    }

    // 3. Fallback: Search all questions
    setStudioMode('all-questions');
    setSelectedSectionFilter('All');
    setSearchQuery(targetId);
    setPaperQIndex(0);
    setSyncStatusMsg(`Searching for question: ${targetId}`);
    setTimeout(() => setSyncStatusMsg(''), 3000);
  };

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

        const initialDiff = q.difficulty || (q.marks === 2 ? 'Moderate' : 'Easy');
        const initialHints = Array.isArray(q.hints) ? q.hints : [];

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
          difficulty: initialDiff,
          question: q.question || '',
          image_url: q.image_url || q.image || '',
          options: q.options || { A: '', B: '', C: '', D: '' },
          correct_answer: q.correct_answer || 'A',
          solution: q.solution || '',
          disable_hints: Boolean(q.disable_hints),
          hint_level_1: initialHints[0] || q.hint_level_1 || '',
          hint_level_2: initialHints[1] || q.hint_level_2 || '',
          hint_level_3: initialHints[2] || q.hint_level_3 || '',
          hints: initialHints
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

    const hintsArr = [formData.hint_level_1, formData.hint_level_2, formData.hint_level_3]
      .map(h => String(h || '').trim())
      .filter(Boolean);

    const payload = {
      ...formData,
      image_url: formData.image_url ? formData.image_url.trim() : null,
      section: normalizeSectionTitle(formData.section),
      paperTitle: selectedPaperTitle,
      difficulty: formData.difficulty || 'Moderate',
      disable_hints: Boolean(formData.disable_hints),
      hints: hintsArr.length > 0 ? hintsArr : null,
      options: formData.type === 'NAT' ? null : formData.options
    };

    onSaveEditedQuestion(payload);

    setSyncStatusMsg(`⚡ Saved & Synced live to all tabs & devices: #${formData.id} in ${selectedPaperTitle}!`);
    setTimeout(() => setSyncStatusMsg(''), 3500);
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

          <button
            onClick={() => { setStudioMode('reported-issues'); refreshReports(); }}
            className={`px-4 py-2.5 rounded-t-xl transition flex items-center gap-2 ${
              studioMode === 'reported-issues'
                ? 'bg-white text-blue-950 font-extrabold shadow-md'
                : 'text-blue-200 hover:bg-white/10'
            }`}
          >
            <Flag className="w-4 h-4 text-amber-400" />
            <span>Reported Issues ({reportedIssuesList.length})</span>
          </button>
        </div>
      </div>

      {/* Paper Selector & Palette Bar */}
      {studioMode !== 'all-questions' && studioMode !== 'reported-issues' ? (
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
                onClick={handleAddNewQuestion}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-md transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Question</span>
              </button>
            </div>
          </div>

          {/* Collapsible Question Palette Grid */}
          {showQuestionPalette && (
            <div className="card-3d rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400">
                <span>{selectedPaperTitle} — Question Jump Palette:</span>
                <span className="text-[11px] font-medium text-slate-400">
                  Green = verified solution • Blue = active
                </span>
              </div>
              <div className="grid grid-cols-8 sm:grid-cols-13 gap-1.5 max-h-56 overflow-y-auto pr-1">
                {activeQuestionsList.map((q, idx) => {
                  const isSelected = idx === paperQIndex;
                  const hasSolution = Boolean(q.solution && q.solution.trim().length > 10);
                  const qNum = q.qnum || (idx + 1);

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
      ) : studioMode === 'all-questions' ? (
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
      ) : null}

      {/* Triage Panel or Question Editor */}
      {studioMode === 'reported-issues' ? (
        <div className="card-3d rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <Flag className="w-5 h-5 text-amber-500" />
              <div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  Student Question Issue Reports ({reportedIssuesList.length})
                </h3>
                <p className="text-xs text-slate-500">
                  Triage reported errors, wrong answer keys, typos, and ambiguities submitted by students.
                </p>
              </div>
            </div>

            <button
              onClick={refreshReports}
              disabled={isLoadingReports}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingReports ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>

          {/* Status Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {['all', 'pending', 'reviewed', 'resolved', 'rejected'].map(st => (
              <button
                key={st}
                onClick={() => setReportStatusFilter(st)}
                className={`px-3 py-1 rounded-full font-bold capitalize transition border ${
                  reportStatusFilter === st
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {st} ({reportedIssuesList.filter(r => st === 'all' ? true : (r.status || 'pending').toLowerCase() === st).length})
              </button>
            ))}
          </div>

          {/* Reports List */}
          {reportedIssuesList
            .filter(r => reportStatusFilter === 'all' ? true : (r.status || 'pending').toLowerCase() === reportStatusFilter)
            .length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
              <p className="font-bold text-slate-700 dark:text-slate-300">No reported issues found in this category.</p>
              <p>Everything is currently clear!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {reportedIssuesList
                .filter(r => reportStatusFilter === 'all' ? true : (r.status || 'pending').toLowerCase() === reportStatusFilter)
                .map(rep => (
                  <div
                    key={rep.id}
                    className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                          {rep.question_id || 'Q_UNKNOWN'}
                        </span>
                        <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                          {rep.issue_type}
                        </span>
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                          rep.status === 'resolved' 
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' 
                            : rep.status === 'rejected'
                            ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                            : rep.status === 'reviewed'
                            ? 'bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300'
                            : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                        }`}>
                          Status: {rep.status || 'pending'}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 ${
                          rep.source === 'whatsapp'
                            ? 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                            : 'bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-800'
                        }`}>
                          {rep.source === 'whatsapp' ? '📱 WhatsApp' : '🌐 Portal'}
                        </span>
                      </div>

                      <span className="text-[11px] text-slate-500 font-mono">
                        {new Date(rep.created_at).toLocaleString()}
                      </span>
                    </div>

                    {/* Question Statement Preview */}
                    {rep.question_text && (
                      <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 line-clamp-2">
                        <MathRenderer content={rep.question_text} />
                      </div>
                    )}

                    {/* Student Description / Comment */}
                    {rep.description && (
                      <div className="text-xs text-slate-900 dark:text-slate-100 bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl">
                        <span className="font-bold block text-amber-800 dark:text-amber-300 text-[10px] uppercase tracking-wider mb-0.5">
                          Student Feedback / Description:
                        </span>
                        <span>{rep.description}</span>
                      </div>
                    )}

                    {/* Footer & Triage Controls */}
                    <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <span className="text-slate-500 text-[11px]">
                        Reported by: <strong className="text-slate-700 dark:text-slate-300">{rep.student_name || 'Student'}</strong>
                        {rep.student_email ? ` (${rep.student_email})` : ''}
                      </span>

                      <div className="flex items-center gap-1.5 flex-wrap">
                        <button
                          onClick={() => handleEditReportedQuestion(rep)}
                          className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] transition cursor-pointer flex items-center gap-1 shadow-xs"
                          title="Jump straight to this question in Question Studio to correct it"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit in Studio</span>
                        </button>
                        <button
                          onClick={() => handleUpdateReport(rep.id, 'reviewed')}
                          className="px-2.5 py-1 rounded-lg bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 font-bold text-[11px] hover:bg-sky-100 transition cursor-pointer"
                        >
                          Mark Investigating
                        </button>
                        <button
                          onClick={() => handleUpdateReport(rep.id, 'resolved')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-bold text-[11px] hover:bg-emerald-100 transition cursor-pointer"
                        >
                          Mark Resolved
                        </button>
                        <button
                          onClick={() => handleUpdateReport(rep.id, 'rejected')}
                          className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 font-bold text-[11px] hover:bg-rose-100 transition cursor-pointer"
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      ) : activeQuestionsList.length === 0 ? (
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
        <div className="w-full space-y-6">
          
          {/* Header & View Mode Switcher */}
          <div className="card-3d rounded-2xl p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4 border border-slate-200 dark:border-slate-800">
            <div className="space-y-1">
              <span className="text-sm font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center gap-2">
                <Edit3 className="w-4 h-4" />
                <span>Editing {selectedPaperTitle} — Q.{getQuestionNumber(formData, paperQIndex)} ({formData.id})</span>
              </span>
              <p className="text-xs text-slate-500">
                Live synchronization active across all tabs & devices. Upload diagrams from local storage and preview student CBT rendering live.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* View Mode Switcher */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setEditorViewMode('split')}
                  className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
                    editorViewMode === 'split'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="Side-by-side Editor & Live Student Preview"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Split View</span>
                </button>
                <button
                  type="button"
                  onClick={() => setEditorViewMode('editor')}
                  className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
                    editorViewMode === 'editor'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="Focus on editing fields only"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Editor Only</span>
                </button>
                <button
                  type="button"
                  onClick={() => setEditorViewMode('preview')}
                  className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 cursor-pointer ${
                    editorViewMode === 'preview'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title="Full Student Experience Preview"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview Only</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleDuplicateQuestion}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                title="Duplicate question"
              >
                <Copy className="w-3.5 h-3.5 text-blue-500" />
                <span>Duplicate</span>
              </button>

              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                {formData.type} ({formData.marks}M)
              </span>
            </div>
          </div>

          {/* Sync status toast / notice */}
          {syncStatusMsg && (
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>{syncStatusMsg}</span>
            </div>
          )}

          {/* Main Workspace (Split Grid or Single Column) */}
          <div className={`grid gap-6 ${editorViewMode === 'split' ? 'grid-cols-1 lg:grid-cols-2 items-start' : 'grid-cols-1'}`}>
            
            {/* LEFT / FORM COLUMN */}
            {(editorViewMode === 'split' || editorViewMode === 'editor') && (
              <div className="card-3d rounded-2xl p-6 sm:p-7 space-y-6">
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

                  {/* Type, Marks & Difficulty Level */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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

                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Difficulty Level</label>
                      <div className="flex items-center gap-1.5 pt-0.5">
                        {['Easy', 'Moderate', 'Difficult'].map((diff) => {
                          const isSel = formData.difficulty === diff;
                          return (
                            <button
                              key={diff}
                              type="button"
                              onClick={() => setFormData({ ...formData, difficulty: diff })}
                              className={`flex-1 py-2 px-1.5 rounded-xl text-xs font-bold transition border cursor-pointer ${
                                isSel
                                  ? diff === 'Easy'
                                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                                    : diff === 'Moderate'
                                    ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                                    : 'bg-rose-600 text-white border-rose-600 shadow-xs'
                                  : 'bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                              }`}
                            >
                              {diff}
                            </button>
                          );
                        })}
                      </div>
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
                          className="px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-mono text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white transition font-bold cursor-pointer"
                          title={`Insert ${helper.latex} into Question`}
                        >
                          {helper.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Question Textarea */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block font-semibold text-slate-700 dark:text-slate-300">
                        Question Content (Supports LaTeX Math e.g. \( E = mc^2 \) or $$ \int_0^1 f(x)dx $$)
                      </label>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Live Preview Active</span>
                      </span>
                    </div>
                    
                    <textarea
                      rows={6}
                      required
                      value={formData.question}
                      onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                      placeholder="Enter complete question text here... Supports LaTeX equations (e.g. \( E = mc^2 \) or $$ \int_0^1 f(x)dx $$)."
                      className="w-full min-h-[140px] bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-slate-900 dark:text-slate-100 font-mono text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 placeholder:text-slate-400 placeholder:text-xs sm:placeholder:text-sm resize-y"
                    />
                  </div>

                  {/* Direct Local Storage Image Uploader */}
                  <QuestionImageUploader
                    imageUrl={formData.image_url}
                    onChange={(newUrl) => setFormData(prev => ({ ...prev, image_url: newUrl }))}
                    onClear={() => setFormData(prev => ({ ...prev, image_url: '' }))}
                    label="Question Diagram / Figure Upload (Device Storage)"
                  />

                  {/* MCQ/MSQ Options */}
                  {(formData.type === 'MCQ' || formData.type === 'MSQ') && formData.options && (
                    <div className="space-y-2.5 pt-1">
                      <label className="block font-semibold text-slate-700 dark:text-slate-300">Options (A, B, C, D)</label>
                      {['A', 'B', 'C', 'D'].map((key) => (
                        <div key={key} className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleToggleAnswerKeyPill(key)}
                            className={`w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 transition cursor-pointer ${
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
                              className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs font-mono transition flex items-center justify-center gap-1.5 cursor-pointer ${
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

                  {/* Progressive Hints Configuration */}
                  <div className="p-4 rounded-xl bg-amber-500/5 dark:bg-amber-950/20 border border-amber-500/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-800 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <span>Admin Progressive Hints Configuration</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300">
                        <input
                          type="checkbox"
                          checked={formData.disable_hints}
                          onChange={(e) => setFormData(prev => ({ ...prev, disable_hints: e.target.checked }))}
                          className="accent-rose-500 w-4 h-4 rounded cursor-pointer"
                        />
                        <span className={formData.disable_hints ? 'text-rose-500 font-extrabold' : ''}>
                          {formData.disable_hints ? '🚫 Hints Disabled' : 'Enable Hints'}
                        </span>
                      </label>
                    </div>

                    {!formData.disable_hints && (
                      <div className="space-y-2.5 pt-1">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-500 mb-1">Level 1 Hint (Core Formula / Concept)</label>
                          <input
                            type="text"
                            value={formData.hint_level_1}
                            onChange={(e) => setFormData({ ...formData, hint_level_1: e.target.value })}
                            placeholder="e.g. Power (kW) = (Draft Force × Speed) / 3.6"
                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100 outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-500 mb-1">Level 2 Hint (Unit Conversions / SI Guide)</label>
                          <input
                            type="text"
                            value={formData.hint_level_2}
                            onChange={(e) => setFormData({ ...formData, hint_level_2: e.target.value })}
                            placeholder="e.g. 1 ha = 10,000 m², 1 m/s = 3.6 km/h"
                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100 outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-500 mb-1">Level 3 Hint (Calculation Lead-in / Target Substitution)</label>
                          <input
                            type="text"
                            value={formData.hint_level_3}
                            onChange={(e) => setFormData({ ...formData, hint_level_3: e.target.value })}
                            placeholder="e.g. Substitute Q = 45 m³/s into Q = (C*I*A)/360 to isolate C"
                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100 outline-none"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Step-by-Step Solution / Derivation Textarea */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block font-semibold text-slate-700 dark:text-slate-300">
                        {"Step-by-Step Solution / Derivation (Supports LaTeX e.g. \\( \\eta = \\frac{W}{Q_H} \\))"}
                      </label>
                      <div className="flex items-center gap-1">
                        {QUICK_LATEX_HELPERS.slice(0, 3).map((helper, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => insertLatexToField('solution', helper.latex)}
                            className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline font-mono font-semibold cursor-pointer"
                          >
                            +{helper.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <textarea
                      rows={8}
                      value={formData.solution}
                      onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                      placeholder="Enter comprehensive step-by-step mathematical derivation, governing formulas, numerical substitution, intermediate values, and final units..."
                      className="w-full min-h-[180px] bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-slate-900 dark:text-slate-100 font-mono text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 placeholder:text-slate-400 placeholder:text-xs sm:placeholder:text-sm resize-y"
                    />
                  </div>

                  {/* Form Footer Buttons */}
                  <div className="pt-3 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={onOpenCalc}
                      className="px-4 py-2.5 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold text-xs hover:bg-blue-600 hover:text-white transition cursor-pointer"
                    >
                      Scientific Calc
                    </button>

                    <button
                      type="submit"
                      className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-md transition cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Answer Key & Question (Live Sync)</span>
                    </button>
                  </div>

                </form>
              </div>
            )}

            {/* RIGHT / STUDENT LIVE PREVIEW COLUMN */}
            {(editorViewMode === 'split' || editorViewMode === 'preview') && (
              <div className={`${editorViewMode === 'split' ? 'lg:sticky lg:top-6' : 'w-full'}`}>
                <QuestionLivePreview
                  formData={formData}
                  paperTitle={selectedPaperTitle}
                />
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}
