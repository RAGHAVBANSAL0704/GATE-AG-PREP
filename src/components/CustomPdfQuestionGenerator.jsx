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
  RotateCcw,
  Tag,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';
import MathRenderer from './MathRenderer';
import { exportQuestionsToPdf, downloadQuestionPaperHtmlFile } from '../services/questionPdfExportService';
import { getOfficialSections, normalizeSectionTitle } from '../utils/syllabusTaxonomy.js';
import { ALL_QUESTION_BANK_QUESTIONS } from '../data/question_bank/index.js';

const SYLLABUS_SECTIONS = getOfficialSections().map(s => s.fullTitle);

const normalizeSectionName = (sec) => {
  return normalizeSectionTitle(sec);
};

const getQuestionDifficulty = (q) => {
  if (q.difficulty) {
    const s = String(q.difficulty).trim().toLowerCase();
    if (s === 'hard' || s === 'difficult' || s === 'advanced') return 'Hard';
    if (s === 'moderate' || s === 'medium' || s === 'intermediate') return 'Moderate';
    if (s === 'easy' || s === 'basic') return 'Easy';
  }
  return Number(q.marks) === 2 ? 'Moderate' : 'Easy';
};

export default function CustomPdfQuestionGenerator({ questions = [], mockPapers = [], customMockPapers = [] }) {
  // Synchronized complete universe pool: Official PYQs + Custom Mocks 01-50 + Question Bank = 6,489 Qs
  const allPoolQuestions = useMemo(() => {
    const list = [];

    // 1. Official PYQs (1,324 questions)
    (questions || []).forEach(q => {
      list.push({
        ...q,
        source_origin: 'Official PYQ',
        source_label: q.year ? `GATE ${q.year}` : 'Official PYQ'
      });
    });

    // 2. Full-Length Custom Mock Papers (Mock 01 to 50 = 3,250 questions)
    (customMockPapers || []).forEach((p, pIdx) => {
      (p.questions || []).forEach((q, qIdx) => {
        list.push({
          ...q,
          id: q.id || `${p.id || `MOCK_${pIdx + 1}`}_Q${q.qnum || qIdx + 1}`,
          source_origin: 'Mock Test',
          source_label: p.title || `Custom Mock ${pIdx + 1}`
        });
      });
    });

    // 3. Question Bank Pool (1,915 questions)
    (ALL_QUESTION_BANK_QUESTIONS || []).forEach(q => {
      list.push({
        ...q,
        source_origin: 'Question Bank',
        source_label: q.source_label || q.source || 'Question Bank'
      });
    });

    return list;
  }, [questions, customMockPapers]);

  // Universe Pool Multi-Select: ['pyq', 'mock', 'qb']
  const [selectedSources, setSelectedSources] = useState(['pyq', 'mock', 'qb']);

  // Section Filter: Multi-select array
  const [selectedSections, setSelectedSections] = useState(SYLLABUS_SECTIONS);
  
  // Topic Filter: Multi-select array
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [topicSearchTerm, setTopicSearchTerm] = useState('');
  const [activeSectionTopicTab, setActiveSectionTopicTab] = useState('all');

  // Attributes Multi-Select Filters (Every combo possible)
  const [selectedTypes, setSelectedTypes] = useState(['MCQ', 'MSQ', 'NAT']);
  const [selectedMarks, setSelectedMarks] = useState(['1', '2']);
  const [selectedDifficulties, setSelectedDifficulties] = useState(['Easy', 'Moderate', 'Hard']);
  const [eraFilter, setEraFilter] = useState('all'); // 'all' | 'recent' (2020-2026) | 'mid' (2015-2019) | 'classic' (2007-2014)

  // Quantity & Allocation Mode: 'bulk' | 'section' | 'topic'
  const [allocationMode, setAllocationMode] = useState('bulk');
  const [questionCount, setQuestionCount] = useState(25);
  const [shuffleOrder, setShuffleOrder] = useState(true);

  // Section-wise individual question count quotas
  const [sectionQuotas, setSectionQuotas] = useState(() => {
    const initial = {};
    SYLLABUS_SECTIONS.forEach(sec => {
      initial[sec] = 5;
    });
    return initial;
  });

  // Topic-wise individual question count quotas
  const [topicQuotas, setTopicQuotas] = useState({});

  // Individual question manual exclusion toggle
  const [excludedQuestionIds, setExcludedQuestionIds] = useState(new Set());

  // PDF Configuration
  const [customTitle, setCustomTitle] = useState('GATE AG Custom Practice Worksheet');
  const [studentName, setStudentName] = useState('');
  const [paperSize, setPaperSize] = useState('a4'); // 'a4' | 'letter' | 'legal' | 'a3'
  const [orientation, setOrientation] = useState('portrait'); // 'portrait' | 'landscape'
  const [columnLayout, setColumnLayout] = useState('1-col'); // '1-col' | '2-col'
  const [includeCandidateBox, setIncludeCandidateBox] = useState(true);
  const [includeQuestionMetadata, setIncludeQuestionMetadata] = useState(false);
  const [includeAnswerKey, setIncludeAnswerKey] = useState(true);
  const [includeSolutions, setIncludeSolutions] = useState(true);
  const [includeRoughWork, setIncludeRoughWork] = useState(false);
  const [layoutMode, setLayoutMode] = useState('worksheet'); // 'worksheet' | 'study_guide'

  // Preview Drawer State
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Derivation of topics organized by section
  const sectionWiseTopics = useMemo(() => {
    const map = {};
    SYLLABUS_SECTIONS.forEach(sec => {
      map[sec] = new Set();
    });

    allPoolQuestions.forEach(q => {
      const normSec = normalizeSectionName(q.section);
      if (map[normSec] && q.topic) {
        map[normSec].add(q.topic);
      }
    });

    const result = {};
    Object.keys(map).forEach(sec => {
      result[sec] = Array.from(map[sec]).sort();
    });

    return result;
  }, [allPoolQuestions]);

  // Available topics derived from currently selected sections
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

  // Source Toggle Handlers
  const handleToggleSource = (sourceKey) => {
    if (selectedSources.includes(sourceKey)) {
      if (selectedSources.length === 1) return; // Keep at least one source
      setSelectedSources(selectedSources.filter(s => s !== sourceKey));
    } else {
      setSelectedSources([...selectedSources, sourceKey]);
    }
  };

  // Section Toggle Handlers
  const handleToggleSection = (sec) => {
    if (selectedSections.includes(sec)) {
      if (selectedSections.length === 1) {
        setSelectedSections([]);
      } else {
        setSelectedSections(selectedSections.filter(s => s !== sec));
      }
    } else {
      setSelectedSections([...selectedSections, sec]);
    }
  };

  const handleSelectAllSections = () => setSelectedSections([...SYLLABUS_SECTIONS]);
  const handleDeselectAllSections = () => setSelectedSections([]);

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

  const handleSelectTopicsInSection = (sec) => {
    const secTopics = sectionWiseTopics[sec] || [];
    const newTopics = new Set([...selectedTopics, ...secTopics]);
    setSelectedTopics(Array.from(newTopics));
  };

  const handleClearTopicsInSection = (sec) => {
    const secTopics = new Set(sectionWiseTopics[sec] || []);
    setSelectedTopics(selectedTopics.filter(t => !secTopics.has(t)));
  };

  // Type Toggle Handlers
  const handleToggleType = (typeKey) => {
    if (selectedTypes.includes(typeKey)) {
      if (selectedTypes.length === 1) return;
      setSelectedTypes(selectedTypes.filter(t => t !== typeKey));
    } else {
      setSelectedTypes([...selectedTypes, typeKey]);
    }
  };

  // Marks Toggle Handlers
  const handleToggleMarks = (marksVal) => {
    if (selectedMarks.includes(marksVal)) {
      if (selectedMarks.length === 1) return;
      setSelectedMarks(selectedMarks.filter(m => m !== marksVal));
    } else {
      setSelectedMarks([...selectedMarks, marksVal]);
    }
  };

  // Difficulty Toggle Handlers
  const handleToggleDifficulty = (diffVal) => {
    if (selectedDifficulties.includes(diffVal)) {
      if (selectedDifficulties.length === 1) return;
      setSelectedDifficulties(selectedDifficulties.filter(d => d !== diffVal));
    } else {
      setSelectedDifficulties([...selectedDifficulties, diffVal]);
    }
  };

  // Section Quota Management Handlers
  const handleSetSectionQuota = (sec, count) => {
    const safeCount = Math.max(0, parseInt(count) || 0);
    setSectionQuotas(prev => ({
      ...prev,
      [sec]: safeCount
    }));
  };

  const handleSetAllSectionQuotas = (count) => {
    const safeCount = Math.max(0, parseInt(count) || 0);
    const updated = {};
    SYLLABUS_SECTIONS.forEach(sec => {
      updated[sec] = safeCount;
    });
    setSectionQuotas(updated);
  };

  const handleDistributeSectionsEvenly = (totalTarget) => {
    const activeSecs = selectedSections.length > 0 ? selectedSections : SYLLABUS_SECTIONS;
    if (activeSecs.length === 0) return;
    const base = Math.floor(totalTarget / activeSecs.length);
    let remainder = totalTarget % activeSecs.length;
    const updated = { ...sectionQuotas };
    activeSecs.forEach(sec => {
      updated[sec] = base + (remainder > 0 ? 1 : 0);
      if (remainder > 0) remainder--;
    });
    setSectionQuotas(updated);
  };

  // Topic Quota Management Handlers
  const handleSetTopicQuota = (top, count) => {
    const safeCount = Math.max(0, parseInt(count) || 0);
    setTopicQuotas(prev => ({
      ...prev,
      [top]: safeCount
    }));
  };

  const handleSetAllTopicQuotas = (count) => {
    const safeCount = Math.max(0, parseInt(count) || 0);
    const activeTops = selectedTopics.length > 0 ? selectedTopics : availableTopics;
    const updated = { ...topicQuotas };
    activeTops.forEach(top => {
      updated[top] = safeCount;
    });
    setTopicQuotas(updated);
  };

  const handleDistributeTopicsEvenly = (totalTarget) => {
    const activeTops = selectedTopics.length > 0 ? selectedTopics : availableTopics;
    if (activeTops.length === 0) return;
    const base = Math.floor(totalTarget / activeTops.length);
    let remainder = totalTarget % activeTops.length;
    const updated = { ...topicQuotas };
    activeTops.forEach(top => {
      updated[top] = base + (remainder > 0 ? 1 : 0);
      if (remainder > 0) remainder--;
    });
    setTopicQuotas(updated);
  };

  // Individual Question Manual Toggle
  const handleToggleQuestionExclusion = (qId) => {
    setExcludedQuestionIds(prev => {
      const next = new Set(prev);
      if (next.has(qId)) {
        next.delete(qId);
      } else {
        next.add(qId);
      }
      return next;
    });
  };

  const handleResetQuestionExclusions = () => {
    setExcludedQuestionIds(new Set());
  };

  // Reset all filters to default
  const handleResetAllFilters = () => {
    setSelectedSources(['pyq', 'mock', 'qb']);
    setSelectedSections([...SYLLABUS_SECTIONS]);
    setSelectedTopics([]);
    setSelectedTypes(['MCQ', 'MSQ', 'NAT']);
    setSelectedMarks(['1', '2']);
    setSelectedDifficulties(['Easy', 'Moderate', 'Hard']);
    setEraFilter('all');
    setTopicSearchTerm('');
    setAllocationMode('bulk');
    setQuestionCount(25);
    setExcludedQuestionIds(new Set());
    const initSec = {};
    SYLLABUS_SECTIONS.forEach(s => { initSec[s] = 5; });
    setSectionQuotas(initSec);
    setTopicQuotas({});
  };

  // Filter Matching Questions across ALL criteria
  const matchingQuestions = useMemo(() => {
    return allPoolQuestions.filter(q => {
      // 1. Source Origin Filter
      const isPyq = q.source_origin === 'Official PYQ';
      const isMock = q.source_origin === 'Mock Test';
      const isQb = q.source_origin === 'Question Bank' || q.source_origin === 'Practice Bank';

      let sourceMatch = false;
      if (selectedSources.includes('pyq') && isPyq) sourceMatch = true;
      if (selectedSources.includes('mock') && isMock) sourceMatch = true;
      if (selectedSources.includes('qb') && isQb) sourceMatch = true;
      if (!sourceMatch) return false;

      // 2. Section Filter
      const normSec = normalizeSectionName(q.section);
      if (selectedSections.length > 0 && !selectedSections.includes(normSec)) {
        return false;
      }

      // 3. Topic Filter (if any selected)
      if (selectedTopics.length > 0 && (!q.topic || !selectedTopics.includes(q.topic))) {
        return false;
      }

      // 4. Question Type Filter
      const qType = (q.type || 'MCQ').toUpperCase();
      if (!selectedTypes.includes(qType)) {
        return false;
      }

      // 5. Marks Filter
      const qMarks = String(q.marks || 1);
      if (!selectedMarks.includes(qMarks)) {
        return false;
      }

      // 6. Difficulty Filter
      const diff = getQuestionDifficulty(q);
      if (!selectedDifficulties.includes(diff)) {
        return false;
      }

      // 7. Era / Year Filter (for PYQs & Mocks)
      const yNum = parseInt(q.year) || 2024;
      if (eraFilter === 'recent' && yNum < 2020) return false;
      if (eraFilter === 'mid' && (yNum < 2015 || yNum > 2019)) return false;
      if (eraFilter === 'classic' && yNum > 2014) return false;

      return true;
    });
  }, [allPoolQuestions, selectedSources, selectedSections, selectedTopics, selectedTypes, selectedMarks, selectedDifficulties, eraFilter]);

  // Group matching questions by section
  const matchingBySection = useMemo(() => {
    const map = {};
    SYLLABUS_SECTIONS.forEach(sec => {
      map[sec] = [];
    });
    matchingQuestions.forEach(q => {
      const normSec = normalizeSectionName(q.section);
      if (map[normSec]) {
        map[normSec].push(q);
      }
    });
    return map;
  }, [matchingQuestions]);

  // Group matching questions by topic
  const matchingByTopic = useMemo(() => {
    const map = {};
    matchingQuestions.forEach(q => {
      if (q.topic) {
        if (!map[q.topic]) map[q.topic] = [];
        map[q.topic].push(q);
      }
    });
    return map;
  }, [matchingQuestions]);

  // Slice, quota-allocate and sort questions for final export
  const finalExportQuestions = useMemo(() => {
    let list = [];

    if (allocationMode === 'section') {
      // Allocate individually per section
      const activeSecs = selectedSections.length > 0 ? selectedSections : SYLLABUS_SECTIONS;
      activeSecs.forEach(sec => {
        let secPool = [...(matchingBySection[sec] || [])];
        if (shuffleOrder) {
          secPool.sort(() => 0.5 - Math.random());
        } else {
          secPool.sort((a, b) => (parseInt(b.year) || 0) - (parseInt(a.year) || 0));
        }
        const quota = sectionQuotas[sec] ?? 5;
        const taken = secPool.slice(0, quota);
        list.push(...taken);
      });
    } else if (allocationMode === 'topic') {
      // Allocate individually per topic
      const activeTops = selectedTopics.length > 0 ? selectedTopics : availableTopics;
      activeTops.forEach(top => {
        let topPool = [...(matchingByTopic[top] || [])];
        if (shuffleOrder) {
          topPool.sort(() => 0.5 - Math.random());
        } else {
          topPool.sort((a, b) => (parseInt(b.year) || 0) - (parseInt(a.year) || 0));
        }
        const quota = topicQuotas[top] ?? 2;
        const taken = topPool.slice(0, quota);
        list.push(...taken);
      });
    } else {
      // Bulk pool allocation
      list = [...matchingQuestions];
      if (shuffleOrder) {
        for (let i = list.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [list[i], list[j]] = [list[j], list[i]];
        }
      } else {
        list.sort((a, b) => (parseInt(b.year) || 0) - (parseInt(a.year) || 0));
      }
      const countToTake = Math.min(questionCount, list.length);
      list = list.slice(0, countToTake);
    }

    // Filter out manually excluded questions
    if (excludedQuestionIds.size > 0) {
      list = list.filter(q => !excludedQuestionIds.has(q.id || `${q.section}_${q.qnum || q.year}`));
    }

    return list;
  }, [matchingQuestions, matchingBySection, matchingByTopic, allocationMode, sectionQuotas, topicQuotas, questionCount, selectedSections, selectedTopics, availableTopics, shuffleOrder, excludedQuestionIds]);

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
        layoutMode,
        paperSize,
        orientation,
        columnLayout,
        includeCandidateBox,
        includeQuestionMetadata,
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

  const handleTriggerDownloadFile = () => {
    if (finalExportQuestions.length === 0) {
      alert("No questions match your selected filter criteria. Please broaden your selection.");
      return;
    }

    try {
      const activeSectionNames = selectedSections.map(s => s.replace(/^Section \d+:\s*/, ''));
      downloadQuestionPaperHtmlFile(finalExportQuestions, {
        title: customTitle || 'GATE AG Practice Worksheet',
        subtitle: `${activeSectionNames.slice(0, 3).join(', ')}${activeSectionNames.length > 3 ? ` + ${activeSectionNames.length - 3} more` : ''}`,
        sections: activeSectionNames,
        studentName: studentName.trim(),
        layoutMode,
        paperSize,
        orientation,
        columnLayout,
        includeCandidateBox,
        includeQuestionMetadata,
        includeAnswerKey,
        includeSolutions,
        includeRoughWork,
        paperCode: `AG-WS-${Date.now().toString().slice(-4)}`
      });
    } catch (err) {
      console.error("HTML File Download Failed:", err);
      alert("Error generating file: " + (err.message || "Unknown error"));
    }
  };

  const filteredTopicsList = availableTopics.filter(t => 
    !topicSearchTerm || t.toLowerCase().includes(topicSearchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full min-w-0">
      
      {/* 1. Header & Live Status Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl min-w-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
              <FileDown className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>PDF Paper Studio</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Printable Question Paper Generator
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Generate standardized, space-efficient exam worksheets or solved study guides across official PYQs, 50 full mocks, and the 1,915 question bank.
            </p>
          </div>

          {/* Quick Metrics & Top CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full xl:w-auto min-w-0">
            <div className="grid grid-cols-3 gap-2 p-2 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 w-full sm:w-auto min-w-0">
              <div className="text-center px-2 min-w-0">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Matched</span>
                <span className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400 block">{matchingQuestions.length}</span>
              </div>
              <div className="text-center px-2 min-w-0 border-x border-slate-200 dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Selected</span>
                <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white block">{finalExportQuestions.length} Qs</span>
              </div>
              <div className="text-center px-2 min-w-0">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Marks</span>
                <span className="text-base sm:text-lg font-black text-indigo-600 dark:text-indigo-400 block">{totalSelectedMarks}M</span>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setIsPreviewOpen(true)}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <Eye className="w-4 h-4 shrink-0" />
                <span>Preview</span>
              </button>

              <button
                type="button"
                disabled={isExporting || finalExportQuestions.length === 0}
                onClick={handleTriggerExport}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-500/20 transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 whitespace-nowrap"
              >
                <Printer className="w-4 h-4 shrink-0" />
                <span>Print PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Summary Bar */}
        <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2.5 text-xs">
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <span className="font-bold text-slate-500 flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5 text-emerald-500" />
              Active Combo:
            </span>
            <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300">
              {selectedSources.map(s => s === 'pyq' ? 'PYQs' : s === 'mock' ? 'Mocks' : 'Question Bank').join(' + ')}
            </span>
            <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300">
              {selectedSections.length === SYLLABUS_SECTIONS.length ? 'All 8 Sections' : `${selectedSections.length} Sections`}
            </span>
            {selectedTopics.length > 0 && (
              <span className="px-2.5 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-800">
                {selectedTopics.length} Topics
              </span>
            )}
            <span className="px-2.5 py-0.5 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-semibold border border-purple-200 dark:border-purple-800">
              {selectedTypes.join(', ')}
            </span>
            <span className="px-2.5 py-0.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-semibold border border-amber-200 dark:border-amber-800">
              {selectedMarks.map(m => `${m}M`).join(', ')}
            </span>
          </div>

          <button
            type="button"
            onClick={handleResetAllFilters}
            className="text-slate-500 hover:text-slate-900 dark:hover:text-white font-bold transition flex items-center gap-1 cursor-pointer text-xs shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>
      </div>

      {/* 2. Main Studio Work Area (2-Column Clean Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Scope & Questions Selector (7 cols) */}
        <div className="lg:col-span-7 space-y-6 min-w-0">
          
          {/* Section A: Question Pool Sources */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center">1</span>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                  Pool Sources
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSources(['pyq', 'mock', 'qb'])}
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
              >
                Select All (6,489 Qs)
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { key: 'pyq', title: 'Official PYQs', sub: '2007–2026', count: questions.length || 1324 },
                { key: 'mock', title: 'Mock Papers', sub: 'Mock 01 to 50', count: (customMockPapers || []).reduce((acc, p) => acc + (p.questions?.length || 65), 0) || 3250 },
                { key: 'qb', title: 'Question Bank', sub: '181 Subtopics', count: ALL_QUESTION_BANK_QUESTIONS.length || 1915 }
              ].map(p => {
                const isChecked = selectedSources.includes(p.key);
                return (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => handleToggleSource(p.key)}
                    className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between gap-2 cursor-pointer ${
                      isChecked
                        ? 'bg-emerald-50/60 dark:bg-emerald-950/40 border-emerald-500/50 text-slate-900 dark:text-white ring-1 ring-emerald-500/20'
                        : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="font-extrabold text-xs truncate">{p.title}</div>
                      <div className="text-[10px] text-slate-400 truncate">{p.sub}</div>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 shrink-0">
                      {p.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section B: Syllabus Sections */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center">2</span>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                  Syllabus Sections ({selectedSections.length}/8)
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={handleSelectAllSections}
                  className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                >
                  Select All
                </button>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <button
                  type="button"
                  onClick={handleDeselectAllSections}
                  className="font-bold text-slate-500 hover:underline cursor-pointer"
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SYLLABUS_SECTIONS.map((sec, idx) => {
                const isChecked = selectedSections.includes(sec);
                const shortTitle = sec.replace(/^Section \d+:\s*/, '');
                const secCount = (matchingBySection[sec] || []).length;
                const currentQuota = sectionQuotas[sec] ?? 5;

                return (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-xl border transition flex flex-col gap-2 ${
                      isChecked
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-500/40 text-slate-900 dark:text-white'
                        : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => handleToggleSection(sec)}
                        className="flex items-center gap-2 min-w-0 cursor-pointer text-left flex-1"
                      >
                        <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                          isChecked ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-300 dark:border-slate-700 text-transparent'
                        }`}>
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="text-xs font-semibold truncate">{shortTitle}</span>
                      </button>
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 text-slate-500 shrink-0">
                        {secCount} match
                      </span>
                    </div>

                    {/* Section Quota Stepper (visible when in section mode or checked) */}
                    {allocationMode === 'section' && isChecked && (
                      <div className="flex items-center justify-between gap-1.5 pt-1.5 border-t border-slate-200/60 dark:border-slate-800/60 text-xs">
                        <span className="text-[11px] font-medium text-slate-500">Pick Qs:</span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleSetSectionQuota(sec, Math.max(0, currentQuota - 1))}
                            className="w-6 h-6 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 cursor-pointer"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="0"
                            max={secCount}
                            value={currentQuota}
                            onChange={(e) => handleSetSectionQuota(sec, e.target.value)}
                            className="w-10 text-center py-0.5 px-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md font-mono font-bold text-xs text-emerald-600 dark:text-emerald-400 outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => handleSetSectionQuota(sec, Math.min(secCount, currentQuota + 1))}
                            className="w-6 h-6 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 cursor-pointer"
                          >
                            +
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSetSectionQuota(sec, secCount)}
                            className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 hover:underline cursor-pointer"
                          >
                            Max
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section C: Section & Topic Wise Drilldown */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center">3</span>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                  Topic Filter ({selectedTopics.length > 0 ? `${selectedTopics.length} selected` : 'All Topics Included'})
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={handleSelectAllTopics}
                  className="font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  Select All
                </button>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <button
                  type="button"
                  onClick={handleClearTopics}
                  className="font-bold text-slate-500 hover:underline cursor-pointer"
                >
                  Reset (All)
                </button>
              </div>
            </div>

            {/* Section tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
              <button
                type="button"
                onClick={() => setActiveSectionTopicTab('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer shrink-0 ${
                  activeSectionTopicTab === 'all'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                All Sections ({availableTopics.length})
              </button>
              {selectedSections.map((sec, idx) => {
                const short = sec.replace(/^Section \d+:\s*/, '');
                const count = (sectionWiseTopics[sec] || []).length;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveSectionTopicTab(sec)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer shrink-0 ${
                      activeSectionTopicTab === sec
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {short} ({count})
                  </button>
                );
              })}
            </div>

            {/* Topic Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-2.5" />
              <input
                type="text"
                placeholder="Search topics (e.g. Tractors, Bernoulli, Hydraulic Jump, Infiltration)..."
                value={topicSearchTerm}
                onChange={(e) => setTopicSearchTerm(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-3.5 py-1.5 text-xs text-slate-900 dark:text-slate-100 outline-none focus:border-blue-500 font-medium"
              />
            </div>

            {/* Topic Chips / List */}
            <div className="max-h-60 overflow-y-auto flex flex-wrap gap-1.5 pr-1">
              {filteredTopicsList.length === 0 ? (
                <div className="text-xs text-slate-400 py-3 text-center w-full">
                  No matching topics in selected sections.
                </div>
              ) : (
                filteredTopicsList
                  .filter(top => {
                    if (activeSectionTopicTab === 'all') return true;
                    return (sectionWiseTopics[activeSectionTopicTab] || []).includes(top);
                  })
                  .map((top, idx) => {
                    const isSelected = selectedTopics.includes(top);
                    const count = (matchingByTopic[top] || []).length;
                    const topQuota = topicQuotas[top] ?? 2;

                    return (
                      <div
                        key={idx}
                        className={`p-1.5 rounded-xl text-xs font-medium border transition flex items-center gap-2 ${
                          isSelected
                            ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500/50 text-slate-900 dark:text-white'
                            : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => handleToggleTopic(top)}
                          className="flex items-center gap-1.5 cursor-pointer text-left truncate max-w-[180px]"
                        >
                          <div className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 border ${
                            isSelected ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-300 dark:border-slate-700 text-transparent'
                          }`}>
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                          <span className="truncate">{top}</span>
                        </button>
                        
                        <span className="text-[10px] font-mono px-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-500 shrink-0">
                          {count}
                        </span>

                        {allocationMode === 'topic' && (
                          <div className="flex items-center gap-1 pl-1 border-l border-slate-200 dark:border-slate-800">
                            <input
                              type="number"
                              min="0"
                              max={count}
                              value={topQuota}
                              onChange={(e) => handleSetTopicQuota(top, e.target.value)}
                              className="w-9 text-center py-0.5 px-0.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded font-mono font-bold text-[11px] text-blue-600 dark:text-blue-400 outline-none"
                            />
                          </div>
                        )}
                      </div>
                    );
                  })
              )}
            </div>
          </div>

          {/* Section D: Question Criteria (Types, Marks, Difficulty, Era) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center">4</span>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                Question Criteria
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-3.5 text-xs">
              {/* Type */}
              <div className="space-y-1.5 min-w-0">
                <span className="font-bold text-slate-700 dark:text-slate-300 block">Question Types</span>
                <div className="flex gap-1.5">
                  {['MCQ', 'MSQ', 'NAT'].map(t => {
                    const isChecked = selectedTypes.includes(t);
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => handleToggleType(t)}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold border transition cursor-pointer text-center ${
                          isChecked
                            ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                            : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Marks */}
              <div className="space-y-1.5 min-w-0">
                <span className="font-bold text-slate-700 dark:text-slate-300 block">Marks</span>
                <div className="flex gap-1.5">
                  {['1', '2'].map(m => {
                    const isChecked = selectedMarks.includes(m);
                    return (
                      <button
                        key={m}
                        type="button"
                        onClick={() => handleToggleMarks(m)}
                        className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold border transition cursor-pointer text-center ${
                          isChecked
                            ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                            : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                        }`}
                      >
                        {m}M
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Difficulty */}
              <div className="space-y-1.5 min-w-0">
                <span className="font-bold text-slate-700 dark:text-slate-300 block">Difficulty</span>
                <div className="flex gap-1.5">
                  {['Easy', 'Moderate', 'Hard'].map(d => {
                    const isChecked = selectedDifficulties.includes(d);
                    const label = d === 'Moderate' ? 'Med' : d;
                    return (
                      <button
                        key={d}
                        type="button"
                        onClick={() => handleToggleDifficulty(d)}
                        className={`flex-1 py-1.5 px-1.5 rounded-lg text-xs font-bold border transition cursor-pointer text-center ${
                          isChecked
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                            : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Era */}
              <div className="space-y-1.5 min-w-0">
                <span className="font-bold text-slate-700 dark:text-slate-300 block">Exam Era</span>
                <select
                  value={eraFilter}
                  onChange={(e) => setEraFilter(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-semibold text-slate-900 dark:text-slate-100 outline-none cursor-pointer"
                >
                  <option value="all">All (2007–2026)</option>
                  <option value="recent">Recent (2020–2026)</option>
                  <option value="mid">Mid (2015–2019)</option>
                  <option value="classic">Classic (2007–2014)</option>
                </select>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: PDF Print & Layout Configuration (5 cols) */}
        <div className="lg:col-span-5 space-y-6 min-w-0">
          
          {/* Question Count & Presets */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center">5</span>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                  Question Allocation
                </h3>
              </div>
            </div>

            {/* Allocation Mode Selector Tabs */}
            <div className="grid grid-cols-3 p-1 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 gap-1 text-xs">
              <button
                type="button"
                onClick={() => setAllocationMode('bulk')}
                className={`py-1.5 px-2 rounded-xl font-bold transition flex items-center justify-center gap-1 cursor-pointer truncate ${
                  allocationMode === 'bulk'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>Bulk Pool</span>
              </button>

              <button
                type="button"
                onClick={() => setAllocationMode('section')}
                className={`py-1.5 px-2 rounded-xl font-bold transition flex items-center justify-center gap-1 cursor-pointer truncate ${
                  allocationMode === 'section'
                    ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>Section-Wise</span>
              </button>

              <button
                type="button"
                onClick={() => setAllocationMode('topic')}
                className={`py-1.5 px-2 rounded-xl font-bold transition flex items-center justify-center gap-1 cursor-pointer truncate ${
                  allocationMode === 'topic'
                    ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>Topic-Wise</span>
              </button>
            </div>

            {/* Mode 1: Bulk Total */}
            {allocationMode === 'bulk' && (
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                  {[10, 20, 30, 50, 65].map(cnt => (
                    <button
                      key={cnt}
                      type="button"
                      onClick={() => setQuestionCount(cnt)}
                      className={`py-1.5 rounded-xl font-bold border transition cursor-pointer text-center ${
                        questionCount === cnt
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                      }`}
                    >
                      {cnt}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setQuestionCount(matchingQuestions.length || 100)}
                    className={`py-1.5 rounded-xl font-bold border transition cursor-pointer text-center ${
                      questionCount === matchingQuestions.length
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    All
                  </button>
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-slate-500">Bulk Quantity:</span>
                    <span className="font-extrabold text-emerald-600 dark:text-emerald-400 font-mono text-sm">
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
              </div>
            )}

            {/* Mode 2: Section-Wise Quotas */}
            {allocationMode === 'section' && (
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between flex-wrap gap-1.5">
                  <span className="font-bold text-slate-700 dark:text-slate-300">Quick Section Presets:</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleSetAllSectionQuotas(5)}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-[11px] cursor-pointer"
                    >
                      5 each
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSetAllSectionQuotas(10)}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-[11px] cursor-pointer"
                    >
                      10 each
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDistributeSectionsEvenly(65)}
                      className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-bold text-[11px] cursor-pointer"
                    >
                      Distribute 65
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSetAllSectionQuotas(0)}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold text-[11px] cursor-pointer"
                    >
                      Reset (0)
                    </button>
                  </div>
                </div>

                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {selectedSections.map((sec, idx) => {
                    const shortTitle = sec.replace(/^Section \d+:\s*/, '');
                    const count = (matchingBySection[sec] || []).length;
                    const quota = sectionQuotas[sec] ?? 5;

                    return (
                      <div key={idx} className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <div className="font-bold text-slate-800 dark:text-slate-200 truncate">{shortTitle}</div>
                          <div className="text-[10px] text-slate-400">{count} questions available</div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleSetSectionQuota(sec, Math.max(0, quota - 1))}
                            className="w-6 h-6 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-black text-slate-700 dark:text-slate-200 hover:bg-slate-100 cursor-pointer"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="0"
                            max={count}
                            value={quota}
                            onChange={(e) => handleSetSectionQuota(sec, e.target.value)}
                            className="w-10 text-center py-0.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded font-mono font-black text-xs text-emerald-600 dark:text-emerald-400 outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => handleSetSectionQuota(sec, Math.min(count, quota + 1))}
                            className="w-6 h-6 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-black text-slate-700 dark:text-slate-200 hover:bg-slate-100 cursor-pointer"
                          >
                            +
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSetSectionQuota(sec, count)}
                            className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 hover:underline cursor-pointer"
                          >
                            All
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Mode 3: Topic-Wise Quotas */}
            {allocationMode === 'topic' && (
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between flex-wrap gap-1.5">
                  <span className="font-bold text-slate-700 dark:text-slate-300">Quick Topic Presets:</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleSetAllTopicQuotas(2)}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-[11px] cursor-pointer"
                    >
                      2 each
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSetAllTopicQuotas(5)}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-[11px] cursor-pointer"
                    >
                      5 each
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDistributeTopicsEvenly(30)}
                      className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-bold text-[11px] cursor-pointer"
                    >
                      Distribute 30
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSetAllTopicQuotas(0)}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold text-[11px] cursor-pointer"
                    >
                      Reset (0)
                    </button>
                  </div>
                </div>

                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {(selectedTopics.length > 0 ? selectedTopics : availableTopics).map((top, idx) => {
                    const count = (matchingByTopic[top] || []).length;
                    const quota = topicQuotas[top] ?? 2;

                    return (
                      <div key={idx} className="p-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <div className="font-bold text-slate-800 dark:text-slate-200 truncate">{top}</div>
                          <div className="text-[10px] text-slate-400">{count} questions available</div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleSetTopicQuota(top, Math.max(0, quota - 1))}
                            className="w-6 h-6 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-black text-slate-700 dark:text-slate-200 hover:bg-slate-100 cursor-pointer"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="0"
                            max={count}
                            value={quota}
                            onChange={(e) => handleSetTopicQuota(top, e.target.value)}
                            className="w-10 text-center py-0.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded font-mono font-black text-xs text-blue-600 dark:text-blue-400 outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => handleSetTopicQuota(top, Math.min(count, quota + 1))}
                            className="w-6 h-6 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-black text-slate-700 dark:text-slate-200 hover:bg-slate-100 cursor-pointer"
                          >
                            +
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSetTopicQuota(top, count)}
                            className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 hover:underline cursor-pointer"
                          >
                            All
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Ordering & Summary Footer */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Question Order:</span>
              <button
                type="button"
                onClick={() => setShuffleOrder(!shuffleOrder)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                  shuffleOrder
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {shuffleOrder ? 'Randomized' : 'Chronological'}
              </button>
            </div>
          </div>

          {/* Paper Format & Styling */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center">6</span>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                Print Format & Options
              </h3>
            </div>

            <div className="space-y-3.5 text-xs">
              {/* Worksheet vs Study Guide */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Document Type
                </label>
                <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 gap-1">
                  <button
                    type="button"
                    onClick={() => setLayoutMode('worksheet')}
                    className={`py-1.5 rounded-lg font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      layoutMode === 'worksheet'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5 shrink-0" />
                    <span>Exam Worksheet</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setLayoutMode('study_guide')}
                    className={`py-1.5 rounded-lg font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      layoutMode === 'study_guide'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 shrink-0" />
                    <span>Study Guide</span>
                  </button>
                </div>
              </div>

              {/* Paper Size & Orientation & Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Size</label>
                  <select
                    value={paperSize}
                    onChange={(e) => setPaperSize(e.target.value)}
                    className="w-full px-2 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-semibold outline-none cursor-pointer"
                  >
                    <option value="a4">A4</option>
                    <option value="letter">Letter</option>
                    <option value="legal">Legal</option>
                    <option value="a3">A3</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Orientation</label>
                  <select
                    value={orientation}
                    onChange={(e) => setOrientation(e.target.value)}
                    className="w-full px-2 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-semibold outline-none cursor-pointer"
                  >
                    <option value="portrait">Portrait</option>
                    <option value="landscape">Landscape</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Layout</label>
                  <select
                    value={columnLayout}
                    onChange={(e) => setColumnLayout(e.target.value)}
                    className="w-full px-2 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-semibold outline-none cursor-pointer"
                  >
                    <option value="1-col">1 Column</option>
                    <option value="2-col">2 Columns</option>
                  </select>
                </div>
              </div>

              {/* Title & Student Name */}
              <div className="space-y-2">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Worksheet Title</label>
                  <input
                    type="text"
                    value={customTitle}
                    onChange={(e) => setCustomTitle(e.target.value)}
                    placeholder="e.g. Soil & Water Conservation Speed Sheet"
                    className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-medium outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Student Name (Optional Pre-fill)</label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="e.g. Student Name / Roll No."
                    className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl font-medium outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Checkbox Inclusions */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={includeCandidateBox}
                    onChange={(e) => setIncludeCandidateBox(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Candidate fill-in table on top
                  </span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={includeQuestionMetadata}
                    onChange={(e) => setIncludeQuestionMetadata(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Show Question Source & Category tags (e.g. GATE 2024, NAT, 2M)
                  </span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={includeRoughWork}
                    onChange={(e) => setIncludeRoughWork(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Dedicated full-page rough workspace at end
                  </span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={includeAnswerKey}
                    onChange={(e) => setIncludeAnswerKey(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Answer Key on distinct page
                  </span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={includeSolutions}
                    onChange={(e) => setIncludeSolutions(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    Detailed Solutions on distinct page
                  </span>
                </label>
              </div>

            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5 pt-2 min-w-0">
            <button
              type="button"
              disabled={isExporting || finalExportQuestions.length === 0}
              onClick={handleTriggerExport}
              className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-extrabold text-sm shadow-lg shadow-emerald-500/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Printer className="w-4 h-4 shrink-0" />
              <span>Print PDF ({finalExportQuestions.length} Qs)</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleTriggerDownloadFile}
                disabled={isExporting || finalExportQuestions.length === 0}
                className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <FileDown className="w-3.5 h-3.5 shrink-0" />
                <span>Download HTML</span>
              </button>

              <button
                type="button"
                onClick={() => setIsPreviewOpen(true)}
                className="py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 shrink-0" />
                <span>Preview List</span>
              </button>
            </div>
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
                    Preview & Pick Questions ({finalExportQuestions.length} Selected)
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Total Marks: {totalSelectedMarks}M {excludedQuestionIds.size > 0 && `• (${excludedQuestionIds.size} excluded manually)`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {excludedQuestionIds.size > 0 && (
                  <button
                    type="button"
                    onClick={handleResetQuestionExclusions}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold hover:underline cursor-pointer"
                  >
                    Include All
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(false)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 divide-y divide-slate-100 dark:divide-slate-800">
              {finalExportQuestions.map((q, idx) => {
                const qKey = q.id || `${q.section}_${q.qnum || q.year}`;
                return (
                  <div key={qKey} className="pt-4 first:pt-0 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleToggleQuestionExclusion(qKey)}
                          className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-bold hover:text-rose-500 cursor-pointer"
                          title="Click to exclude this question"
                        >
                          <div className="w-4 h-4 rounded border border-emerald-600 bg-emerald-600 text-white flex items-center justify-center">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                          <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                            Q.{idx + 1}
                          </span>
                        </button>
                      </div>

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

                    <div className="text-xs text-slate-800 dark:text-slate-200 font-medium pl-6">
                      <MathRenderer content={q.question || q.text} />
                    </div>
                  </div>
                );
              })}
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
