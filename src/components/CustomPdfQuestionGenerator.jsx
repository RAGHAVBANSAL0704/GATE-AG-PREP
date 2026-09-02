import React, { useState, useMemo } from 'react';
import { 
  FileDown, 
  Printer, 
  Sparkles, 
  Filter, 
  CheckSquare, 
  Square, 
  Sliders, 
  Check, 
  Layers, 
  Search, 
  BookOpen, 
  Calendar, 
  Eye, 
  Shuffle, 
  ListOrdered,
  HelpCircle,
  FileCheck2,
  FileText,
  X
} from 'lucide-react';
import MathRenderer from './MathRenderer';
import { exportQuestionsToPdf } from '../services/questionPdfExportService';
import { GATE_AG_SYLLABUS } from '../data/syllabus';

const SYLLABUS_SECTIONS = [
  "Section 1: Engineering Mathematics",
  "Section 2: Farm Power",
  "Section 3: Farm Machinery",
  "Section 4: Soil and Water Conservation Engineering",
  "Section 5: Irrigation and Drainage Engineering",
  "Section 6: Agricultural Processing Engineering",
  "Section 7: Dairy and Food Engineering",
  "Section 8: General Aptitude"
];

// Helper to normalize section names from questions
function normalizeSectionName(rawSec) {
  if (!rawSec) return 'Section 4: Soil and Water Conservation Engineering';
  const s = String(rawSec).toLowerCase();
  if (s.includes('math')) return 'Section 1: Engineering Mathematics';
  if (s.includes('power') || s.includes('tractor') || s.includes('engine')) return 'Section 2: Farm Power';
  if (s.includes('machinery') || s.includes('implement')) return 'Section 3: Farm Machinery';
  if (s.includes('soil') || s.includes('conservation') || s.includes('watershed') || s.includes('erosion')) return 'Section 4: Soil and Water Conservation Engineering';
  if (s.includes('irrigation') || s.includes('drainage') || s.includes('well') || s.includes('hydrology')) return 'Section 5: Irrigation and Drainage Engineering';
  if (s.includes('dairy') || s.includes('food')) return 'Section 7: Dairy and Food Engineering';
  if (s.includes('processing') || s.includes('storage') || s.includes('drying')) return 'Section 6: Agricultural Processing Engineering';
  if (s.includes('aptitude') || s.includes('english') || s.includes('reasoning')) return 'Section 8: General Aptitude';
  return rawSec;
}

export default function CustomPdfQuestionGenerator({ questions = [], mockPapers = [], customMockPapers = [] }) {
  // All pool questions combined across Official PYQs, Mock Tests, and Practice Pools
  const allPoolQuestions = useMemo(() => {
    const combined = [];
    const seenIds = new Set();
    const seenTexts = new Set();

    // 1. Add Official GATE PYQs from mockPapers (2007–2026)
    (mockPapers || []).forEach(p => {
      (p.questions || []).forEach((q, qIdx) => {
        const key = q.id || `GATE_${p.year}_Q${q.qnum || qIdx + 1}`;
        const textKey = (q.question || q.text || '').trim().toLowerCase().slice(0, 80);
        if (!seenIds.has(key) && (!textKey || !seenTexts.has(textKey))) {
          seenIds.add(key);
          if (textKey) seenTexts.add(textKey);
          combined.push({
            ...q,
            id: key,
            source_origin: 'Official PYQ',
            source_label: q.year ? `GATE ${q.year}` : (p.title || 'Official Paper')
          });
        }
      });
    });

    // 2. Add Full-Length Custom Mock Papers (Mock 01 to 18)
    (customMockPapers || []).forEach(p => {
      (p.questions || []).forEach((q, qIdx) => {
        const key = q.id || `${p.id || 'MOCK'}_Q${q.qnum || qIdx + 1}`;
        const textKey = (q.question || q.text || '').trim().toLowerCase().slice(0, 80);
        if (!seenIds.has(key) && (!textKey || !seenTexts.has(textKey))) {
          seenIds.add(key);
          if (textKey) seenTexts.add(textKey);
          combined.push({
            ...q,
            id: key,
            source_origin: 'Mock Test',
            source_label: p.title || `Custom Mock ${p.id || ''}`
          });
        }
      });
    });

    // 3. Add Practice Bank Questions
    (questions || []).forEach((q, qIdx) => {
      const key = q.id || `PRACTICE_Q${qIdx + 1}`;
      const textKey = (q.question || q.text || '').trim().toLowerCase().slice(0, 80);
      if (!seenIds.has(key) && (!textKey || !seenTexts.has(textKey))) {
        seenIds.add(key);
        if (textKey) seenTexts.add(textKey);
        combined.push({
          ...q,
          id: key,
          source_origin: q.year ? 'Official PYQ' : 'Practice Bank',
          source_label: q.year ? `GATE ${q.year}` : 'Practice Bank'
        });
      }
    });

    return combined;
  }, [questions, mockPapers, customMockPapers]);

  // Section Filter: Multi-select array
  const [selectedSections, setSelectedSections] = useState(SYLLABUS_SECTIONS);
  
  // Topic Filter: Multi-select array
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [topicSearchTerm, setTopicSearchTerm] = useState('');

  // Subtopic Filter: Multi-select array
  const [selectedSubtopics, setSelectedSubtopics] = useState([]);

  // Attributes & Source Filters
  const [sourceFilter, setSourceFilter] = useState('all'); // 'all' | 'pyq' | 'mock' | 'practice'
  const [questionType, setQuestionType] = useState('all'); // 'all' | 'MCQ' | 'MSQ' | 'NAT'
  const [marksFilter, setMarksFilter] = useState('all'); // 'all' | '1' | '2'
  const [eraFilter, setEraFilter] = useState('all'); // 'all' | 'recent' (2020-2026) | 'mid' (2015-2019) | 'classic' (2007-2014)

  // Quantity & Ordering
  const [questionCount, setQuestionCount] = useState(25);
  const [shuffleOrder, setShuffleOrder] = useState(true);

  // PDF Configuration
  const [customTitle, setCustomTitle] = useState('GATE AG Custom Practice Worksheet');
  const [studentName, setStudentName] = useState('');
  const [includeAnswerKey, setIncludeAnswerKey] = useState(true);
  const [includeSolutions, setIncludeSolutions] = useState(true);
  const [includeRoughWork, setIncludeRoughWork] = useState(false);

  // Preview Drawer State
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Available topics derived from selected sections
  const availableTopics = useMemo(() => {
    const topicsSet = new Set();
    allPoolQuestions.forEach(q => {
      const normSec = normalizeSectionName(q.section);
      if (selectedSections.includes(normSec) && q.topic) {
        topicsSet.add(q.topic);
      }
    });
    return Array.from(topicsSet).sort();
  }, [allPoolQuestions, selectedSections]);

  // Available subtopics derived from selected topics/sections
  const availableSubtopics = useMemo(() => {
    const subSet = new Set();
    allPoolQuestions.forEach(q => {
      const normSec = normalizeSectionName(q.section);
      if (selectedSections.includes(normSec)) {
        if (selectedTopics.length === 0 || selectedTopics.includes(q.topic)) {
          if (q.subtopic) subSet.add(q.subtopic);
        }
      }
    });
    return Array.from(subSet).sort();
  }, [allPoolQuestions, selectedSections, selectedTopics]);

  // Section Toggle Handlers
  const handleToggleSection = (sec) => {
    if (selectedSections.includes(sec)) {
      if (selectedSections.length === 1) return; // Keep at least one
      setSelectedSections(selectedSections.filter(s => s !== sec));
    } else {
      setSelectedSections([...selectedSections, sec]);
    }
  };

  const handleSelectAllSections = () => setSelectedSections(SYLLABUS_SECTIONS);
  const handleClearSections = () => setSelectedSections([SYLLABUS_SECTIONS[0]]);

  // Topic Toggle Handlers
  const handleToggleTopic = (top) => {
    if (selectedTopics.includes(top)) {
      setSelectedTopics(selectedTopics.filter(t => t !== top));
    } else {
      setSelectedTopics([...selectedTopics, top]);
    }
  };

  const handleSelectAllTopics = () => setSelectedTopics([...availableTopics]);
  const handleClearTopics = () => setSelectedTopics([]);

  // Filter Matching Questions
  const matchingQuestions = useMemo(() => {
    return allPoolQuestions.filter(q => {
      // 0. Source Filter (PYQs, Mock Tests, Practice Bank)
      if (sourceFilter === 'pyq' && q.source_origin !== 'Official PYQ') return false;
      if (sourceFilter === 'mock' && q.source_origin !== 'Mock Test') return false;
      if (sourceFilter === 'practice' && q.source_origin !== 'Practice Bank') return false;

      // 1. Section Filter
      const normSec = normalizeSectionName(q.section);
      if (!selectedSections.includes(normSec)) return false;

      // 2. Topic Filter
      if (selectedTopics.length > 0 && (!q.topic || !selectedTopics.includes(q.topic))) {
        return false;
      }

      // 3. Subtopic Filter
      if (selectedSubtopics.length > 0 && (!q.subtopic || !selectedSubtopics.includes(q.subtopic))) {
        return false;
      }

      // 4. Type Filter
      if (questionType !== 'all' && (q.type || 'MCQ').toUpperCase() !== questionType) {
        return false;
      }

      // 5. Marks Filter
      if (marksFilter !== 'all' && String(q.marks || 1) !== String(marksFilter)) {
        return false;
      }

      // 6. Era / Year Filter
      const yNum = parseInt(q.year) || 2024;
      if (eraFilter === 'recent' && yNum < 2020) return false;
      if (eraFilter === 'mid' && (yNum < 2015 || yNum > 2019)) return false;
      if (eraFilter === 'classic' && yNum > 2014) return false;

      return true;
    });
  }, [allPoolQuestions, sourceFilter, selectedSections, selectedTopics, selectedSubtopics, questionType, marksFilter, eraFilter]);

  // Slice and sort questions for final export
  const finalExportQuestions = useMemo(() => {
    let list = [...matchingQuestions];
    if (shuffleOrder) {
      // Deterministic shuffle
      for (let i = list.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [list[i], list[j]] = [list[j], list[i]];
      }
    } else {
      // Sort by Year desc then section
      list.sort((a, b) => (parseInt(b.year) || 0) - (parseInt(a.year) || 0));
    }
    const countToTake = Math.min(questionCount, list.length);
    return list.slice(0, countToTake);
  }, [matchingQuestions, questionCount, shuffleOrder]);

  const totalSelectedMarks = useMemo(() => {
    return finalExportQuestions.reduce((sum, q) => sum + (parseInt(q.marks) || 1), 0);
  }, [finalExportQuestions]);

  const handleTriggerExport = () => {
    if (finalExportQuestions.length === 0) {
      alert("No questions match your selected filter criteria. Please broaden your selection.");
      return;
    }

    setIsExporting(true);
    try {
      const activeSectionNames = selectedSections.map(s => s.replace(/^Section \d+:\s*/, ''));
      exportQuestionsToPdf(finalExportQuestions, {
        title: customTitle || 'GATE AG Practice Worksheet',
        subtitle: `${activeSectionNames.slice(0, 3).join(', ')}${activeSectionNames.length > 3 ? ` + ${activeSectionNames.length - 3} more` : ''}`,
        sections: activeSectionNames,
        studentName: studentName.trim(),
        includeAnswerKey,
        includeSolutions,
        includeRoughWork,
        paperCode: `AG-WS-${Date.now().toString().slice(-4)}`
      });
    } catch (err) {
      console.error("PDF Export Failed:", err);
      alert("Error preparing printable PDF: " + (err.message || "Unknown error"));
    } finally {
      setIsExporting(false);
    }
  };

  const filteredTopicsList = availableTopics.filter(t => 
    !topicSearchTerm || t.toLowerCase().includes(topicSearchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Hero Header Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-emerald-950 border border-indigo-500/20 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold">
              <FileDown className="w-3.5 h-3.5 text-indigo-300" />
              <span>Custom PDF & Worksheet Generator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Build & Download Custom Question Papers
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Export customized, print-ready question sheets with KaTeX mathematical formulas, question diagrams, answer key tables, and step-by-step derivations.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-5 text-center shrink-0 min-w-[200px]">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-300 block mb-1">
              Matching Questions
            </span>
            <div className="text-3xl sm:text-4xl font-black text-emerald-400">
              {matchingQuestions.length}
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">
              out of {allPoolQuestions.length} in database
            </span>
          </div>
        </div>
      </div>

      {/* Main Filter & Config Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Sections & Topics Selectors (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* 1. SECTIONS MULTI-SELECT */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                  1. Select Syllabus Sections (Mixed Combinations)
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSelectAllSections}
                  className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                >
                  Select All
                </button>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <button
                  type="button"
                  onClick={handleClearSections}
                  className="text-[11px] font-bold text-slate-500 hover:underline cursor-pointer"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {SYLLABUS_SECTIONS.map((sec, idx) => {
                const isChecked = selectedSections.includes(sec);
                const shortTitle = sec.replace(/^Section \d+:\s*/, '');
                
                // Count questions in this section
                const secCount = allPoolQuestions.filter(q => normalizeSectionName(q.section) === sec).length;

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleToggleSection(sec)}
                    className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between gap-2.5 cursor-pointer ${
                      isChecked
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-slate-900 dark:text-white ring-1 ring-emerald-500/30'
                        : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 border ${
                        isChecked 
                          ? 'bg-emerald-600 text-white border-emerald-600' 
                          : 'bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700 text-transparent'
                      }`}>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="text-xs font-bold truncate">
                        {shortTitle}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 shrink-0">
                      {secCount} Qs
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. TOPICS MULTI-SELECT */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                  2. Filter Specific Topics ({selectedTopics.length > 0 ? `${selectedTopics.length} selected` : 'All Topics Included'})
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSelectAllTopics}
                  className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  Select All Topics
                </button>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <button
                  type="button"
                  onClick={handleClearTopics}
                  className="text-[11px] font-bold text-slate-500 hover:underline cursor-pointer"
                >
                  Clear (Include All)
                </button>
              </div>
            </div>

            {/* Search topics */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
              <input
                type="text"
                placeholder="Search topics (e.g. Tractors, Bernoulli, Threshing, Runoff, Psychrometry)..."
                value={topicSearchTerm}
                onChange={(e) => setTopicSearchTerm(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-900 dark:text-slate-100 outline-none focus:ring-1 focus:ring-blue-500 font-medium"
              />
            </div>

            {/* Topic Chips Container */}
            <div className="max-h-56 overflow-y-auto pr-1 flex flex-wrap gap-1.5 pt-1">
              {filteredTopicsList.length === 0 ? (
                <div className="text-xs text-slate-400 py-4 text-center w-full">
                  No matching topics found in selected sections.
                </div>
              ) : (
                filteredTopicsList.map((top, idx) => {
                  const isSelected = selectedTopics.includes(top);
                  const count = allPoolQuestions.filter(q => q.topic === top).length;

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleToggleTopic(top)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition flex items-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-slate-50 dark:bg-slate-950/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <span>{top}</span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                        isSelected ? 'bg-blue-700 text-blue-100' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* 3. QUESTION SOURCE, TYPES, MARKS & YEAR FILTERS */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                3. Question Source, Attributes & Era
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              
              {/* Question Source Filter (PYQs + Full Mocks + Practice Pool) */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <span>Question Source</span>
                </label>
                <select
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-medium text-slate-900 dark:text-slate-100 outline-none focus:border-purple-500 font-semibold"
                >
                  <option value="all">All Sources (PYQs + Mocks + Bank)</option>
                  <option value="pyq">Official GATE PYQs (2007–2026)</option>
                  <option value="mock">Full Custom Mocks (Mock 01–18)</option>
                  <option value="practice">Curated Practice Bank</option>
                </select>
              </div>

              {/* Question Type */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Question Type
                </label>
                <select
                  value={questionType}
                  onChange={(e) => setQuestionType(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-medium text-slate-900 dark:text-slate-100 outline-none focus:border-purple-500"
                >
                  <option value="all">All Types (MCQ, MSQ, NAT)</option>
                  <option value="MCQ">MCQ (Multiple Choice Questions)</option>
                  <option value="MSQ">MSQ (Multiple Select Questions)</option>
                  <option value="NAT">NAT (Numerical Answer Type)</option>
                </select>
              </div>

              {/* Marks Filter */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Marks Value
                </label>
                <select
                  value={marksFilter}
                  onChange={(e) => setMarksFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-medium text-slate-900 dark:text-slate-100 outline-none focus:border-purple-500"
                >
                  <option value="all">All Marks (1 & 2 Mark Qs)</option>
                  <option value="1">1 Mark Questions Only</option>
                  <option value="2">2 Marks Questions Only</option>
                </select>
              </div>

              {/* Year Era Filter */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Year Era Archive
                </label>
                <select
                  value={eraFilter}
                  onChange={(e) => setEraFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-medium text-slate-900 dark:text-slate-100 outline-none focus:border-purple-500"
                >
                  <option value="all">All Years (2007–2026 Archive)</option>
                  <option value="recent">Recent Era (2020–2026)</option>
                  <option value="mid">Mid Era (2015–2019)</option>
                  <option value="classic">Classic Era (2007–2014)</option>
                </select>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: PDF Configurations & Download Action (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Quantity & Shuffle Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                  4. Number of Questions
                </h3>
              </div>
            </div>

            {/* Quick Count Preset Chips */}
            <div className="grid grid-cols-3 gap-2">
              {[10, 20, 30, 50, 65].map((cnt) => (
                <button
                  key={cnt}
                  type="button"
                  onClick={() => setQuestionCount(cnt)}
                  className={`py-2 px-2 rounded-xl text-xs font-bold transition border cursor-pointer ${
                    questionCount === cnt
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-950/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  {cnt} Qs
                </button>
              ))}
              <button
                type="button"
                onClick={() => setQuestionCount(matchingQuestions.length || 100)}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition border cursor-pointer ${
                  questionCount === matchingQuestions.length
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-950/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                All ({matchingQuestions.length})
              </button>
            </div>

            {/* Range Slider */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-600 dark:text-slate-400">Questions Count:</span>
                <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm font-mono">
                  {Math.min(questionCount, matchingQuestions.length)} Qs ({totalSelectedMarks} Marks)
                </span>
              </div>
              <input
                type="range"
                min="5"
                max={Math.max(10, matchingQuestions.length)}
                value={Math.min(questionCount, matchingQuestions.length)}
                onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            {/* Shuffle / Randomize Toggle */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setShuffleOrder(!shuffleOrder)}
                className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  {shuffleOrder ? <Shuffle className="w-4 h-4 text-emerald-500" /> : <ListOrdered className="w-4 h-4 text-slate-400" />}
                  <span>{shuffleOrder ? 'Shuffle / Randomize Order' : 'Chronological Year Order'}</span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  shuffleOrder ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                }`}>
                  {shuffleOrder ? 'ON' : 'OFF'}
                </span>
              </button>
            </div>
          </div>

          {/* PDF Layout & Customization Options */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                5. PDF Document Options
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Worksheet Title
                </label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="e.g. Soil & Water Conservation Speed Sheet"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 font-medium outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Student Name (Optional Header)
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g. Student Name / Roll No."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 font-medium outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={includeAnswerKey}
                    onChange={(e) => setIncludeAnswerKey(e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Include Answer Key Appendix at the end
                  </span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={includeSolutions}
                    onChange={(e) => setIncludeSolutions(e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Include Step-by-Step Derivations & Solutions
                  </span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={includeRoughWork}
                    onChange={(e) => setIncludeRoughWork(e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Include Space for Rough Work boxes
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3">
            <button
              type="button"
              disabled={isExporting || finalExportQuestions.length === 0}
              onClick={handleTriggerExport}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:from-emerald-700 active:to-teal-700 text-white font-extrabold text-sm shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Printer className="w-5 h-5" />
              <span>Download Printable PDF ({finalExportQuestions.length} Qs)</span>
            </button>

            <button
              type="button"
              onClick={() => setIsPreviewOpen(true)}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>Preview Questions List</span>
            </button>
          </div>

        </div>

      </div>

      {/* Preview Modal Drawer */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/60 dark:bg-slate-950/40">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    Preview Selected Questions ({finalExportQuestions.length})
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Total Marks: {totalSelectedMarks} • Ready for PDF Export
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 divide-y divide-slate-100 dark:divide-slate-800">
              {finalExportQuestions.map((q, idx) => (
                <div key={q.id || idx} className="pt-4 first:pt-0 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                      Q.{idx + 1}
                    </span>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-mono text-[10px] font-bold border border-emerald-200 dark:border-emerald-800">
                        {q.source_label || q.source_origin || (q.year ? `GATE ${q.year}` : 'Question')}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono text-[10px] font-bold">
                        {q.section || 'General'}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-mono text-[10px] font-bold">
                        {q.marks || 1}M
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-800 dark:text-slate-200 font-medium">
                    <MathRenderer content={q.question || q.text} />
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
              <span className="text-xs font-semibold text-slate-500">
                {finalExportQuestions.length} Questions Ready
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsPreviewOpen(false);
                  handleTriggerExport();
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition cursor-pointer flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Export PDF Now</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
