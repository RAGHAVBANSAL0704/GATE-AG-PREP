import React, { useState, useMemo } from 'react';
import { 
  Sliders, 
  Clock, 
  HelpCircle, 
  Play, 
  CheckSquare, 
  Square, 
  Sparkles,
  Zap,
  Layers,
  Calculator,
  ShieldCheck,
  ShieldAlert,
  BarChart2,
  Infinity,
  Database,
  Flame,
  Filter,
  CheckCircle2,
  RotateCcw,
  Tag,
  Trash2
} from 'lucide-react';
import { normalizeSectionTitle } from '../utils/syllabusTaxonomy.js';
import { ALL_QUESTION_BANK_QUESTIONS } from '../data/question_bank/index.js';

const allSections = [
  'Section 1: Engineering Mathematics',
  'Section 2: Farm Machinery',
  'Section 3: Farm Power',
  'Section 4: Soil and Water Conservation Engineering',
  'Section 5: Irrigation and Drainage Engineering',
  'Section 6: Agricultural Process Engineering',
  'Section 7: Dairy and Food Engineering',
  'Section 8: General Aptitude'
];

const normSec = (sec) => normalizeSectionTitle(sec);

const getQuestionDifficulty = (q) => {
  if (q.difficulty) {
    const s = String(q.difficulty).trim().toLowerCase();
    if (s === 'hard' || s === 'difficult' || s === 'advanced') return 'Hard';
    if (s === 'moderate' || s === 'medium' || s === 'intermediate') return 'Moderate';
    if (s === 'easy' || s === 'basic') return 'Easy';
  }
  return Number(q.marks) === 2 ? 'Moderate' : 'Easy';
};

export default function CustomTestCreator({ 
  questions = [], 
  mockPapers = [], 
  customMockPapers = [],
  allCustomQuestions = [],
  onStartCustomTest, 
  onOpenCalc,
  currentStudent,
  onRequireAuth
}) {
  // Pool Source Selection (multi-select: 'qbank', 'pyq', 'mocks')
  const [selectedPools, setSelectedPools] = useState(['qbank', 'pyq', 'mocks']);
  const [pyqRange, setPyqRange] = useState('all'); // 'all' (2007-2026) or 'recent' (2016-2026)
  
  // Section Selection (multi-select)
  const [selectedSections, setSelectedSections] = useState(allSections);

  // Difficulty Selection (multi-select: 'Easy', 'Moderate', 'Hard')
  const [selectedDifficulties, setSelectedDifficulties] = useState(['Easy', 'Moderate', 'Hard']);

  // Question Type Selection (multi-select: 'MCQ', 'MSQ', 'NAT')
  const [selectedTypes, setSelectedTypes] = useState(['MCQ', 'MSQ', 'NAT']);

  // Marks Selection (multi-select: 1, 2)
  const [selectedMarks, setSelectedMarks] = useState([1, 2]);

  // Test parameters
  const [questionCount, setQuestionCount] = useState(25);
  const [timerMinutes, setTimerMinutes] = useState(45);
  const [isUntimed, setIsUntimed] = useState(false);
  const [enableNegativeMarking, setEnableNegativeMarking] = useState(true);
  const [weightingMode, setWeightingMode] = useState('proportional'); // 'proportional' or 'random'

  // Toggle Pool Source (allows deselecting down to 0)
  const togglePool = (poolKey) => {
    setSelectedPools(prev => 
      prev.includes(poolKey) ? prev.filter(p => p !== poolKey) : [...prev, poolKey]
    );
  };

  // Toggle Section (allows deselecting down to 0)
  const toggleSection = (sec) => {
    setSelectedSections(prev => 
      prev.includes(sec) ? prev.filter(s => s !== sec) : [...prev, sec]
    );
  };

  // Toggle Difficulty (allows deselecting down to 0)
  const toggleDifficulty = (diff) => {
    setSelectedDifficulties(prev => 
      prev.includes(diff) ? prev.filter(d => d !== diff) : [...prev, diff]
    );
  };

  // Toggle Question Type (allows deselecting down to 0)
  const toggleType = (typeKey) => {
    setSelectedTypes(prev => 
      prev.includes(typeKey) ? prev.filter(t => t !== typeKey) : [...prev, typeKey]
    );
  };

  // Toggle Marks (allows deselecting down to 0)
  const toggleMarks = (m) => {
    setSelectedMarks(prev => 
      prev.includes(m) ? prev.filter(item => item !== m) : [...prev, m]
    );
  };

  // Section Presets
  const selectAllSections = () => setSelectedSections([...allSections]);
  const clearAllSections = () => setSelectedSections([]);
  const selectCoreAgri = () => setSelectedSections([
    'Section 2: Farm Machinery',
    'Section 3: Farm Power',
    'Section 4: Soil and Water Conservation Engineering',
    'Section 5: Irrigation and Drainage Engineering',
    'Section 6: Agricultural Process Engineering',
    'Section 7: Dairy and Food Engineering'
  ]);
  const selectGaAndEm = () => setSelectedSections([
    'Section 1: Engineering Mathematics',
    'Section 8: General Aptitude'
  ]);

  // Combined Master Pool according to selected pools
  const aggregatedSourcePool = useMemo(() => {
    let combined = [];

    // 1. Question Bank Pool
    if (selectedPools.includes('qbank')) {
      const qbList = (ALL_QUESTION_BANK_QUESTIONS || []).map(q => ({
        ...q,
        poolSource: 'qbank',
        sourceTitle: q.source || 'Autonomous Question Bank'
      }));
      combined = combined.concat(qbList);
    }

    // 2. Official GATE PYQ Pool
    if (selectedPools.includes('pyq')) {
      let pyqList = questions || [];
      if (pyqRange === 'recent') {
        pyqList = pyqList.filter(q => {
          const yr = Number(q.year || q.paper_year);
          return yr >= 2016;
        });
      }
      pyqList = pyqList.map(q => ({
        ...q,
        poolSource: 'pyq',
        sourceTitle: q.paper_name || `GATE AG ${q.year || q.paper_year || 'Official'}`
      }));
      combined = combined.concat(pyqList);
    }

    // 3. Curated Custom Mock Papers Pool
    if (selectedPools.includes('mocks')) {
      let mockList = [];
      if (allCustomQuestions && allCustomQuestions.length > 0) {
        mockList = allCustomQuestions;
      } else {
        mockList = (customMockPapers || []).flatMap((p, pIdx) =>
          (p.questions || []).map(q => ({
            ...q,
            paperTitle: p.title || `Mock Test ${pIdx + 1}`,
            sourceTitle: p.title || `Mock Test ${pIdx + 1}`,
            isCustomUploaded: true
          }))
        );
      }
      mockList = mockList.map(q => ({
        ...q,
        poolSource: 'mocks',
        sourceTitle: q.paperTitle || q.sourceTitle || 'Curated Mock Test'
      }));
      combined = combined.concat(mockList);
    }

    return combined;
  }, [selectedPools, pyqRange, questions, allCustomQuestions, customMockPapers]);

  const normSelectedSections = useMemo(() => {
    return selectedSections.map(s => normSec(s));
  }, [selectedSections]);

  // Filter candidate pool by all active combinations
  const candidatePool = useMemo(() => {
    if (selectedPools.length === 0 || selectedSections.length === 0 || selectedTypes.length === 0 || selectedDifficulties.length === 0 || selectedMarks.length === 0) {
      return [];
    }

    return aggregatedSourcePool.filter(q => {
      // Section check
      const qSec = normSec(q.section);
      if (!normSelectedSections.includes(qSec)) return false;

      // Question Type check
      const qType = (q.type || 'MCQ').toUpperCase();
      if (!selectedTypes.includes(qType)) return false;

      // Difficulty check
      const qDiff = getQuestionDifficulty(q);
      if (!selectedDifficulties.includes(qDiff)) return false;

      // Marks check
      const qMarks = Number(q.marks) || 1;
      if (!selectedMarks.includes(qMarks)) return false;

      return true;
    });
  }, [aggregatedSourcePool, selectedPools, selectedSections, normSelectedSections, selectedTypes, selectedDifficulties, selectedMarks]);

  // Breakdown statistics of matching questions
  const poolStats = useMemo(() => {
    const stats = {
      qbank: 0,
      pyq: 0,
      mocks: 0,
      mcq: 0,
      msq: 0,
      nat: 0,
      easy: 0,
      moderate: 0,
      hard: 0,
      marks1: 0,
      marks2: 0
    };

    candidatePool.forEach(q => {
      // Source
      if (q.poolSource === 'qbank') stats.qbank++;
      else if (q.poolSource === 'pyq') stats.pyq++;
      else if (q.poolSource === 'mocks') stats.mocks++;

      // Type
      const t = (q.type || 'MCQ').toUpperCase();
      if (t === 'MCQ') stats.mcq++;
      else if (t === 'MSQ') stats.msq++;
      else if (t === 'NAT') stats.nat++;

      // Difficulty
      const d = getQuestionDifficulty(q);
      if (d === 'Easy') stats.easy++;
      else if (d === 'Moderate') stats.moderate++;
      else if (d === 'Hard') stats.hard++;

      // Marks
      const m = Number(q.marks) || 1;
      if (m === 2) stats.marks2++;
      else stats.marks1++;
    });

    return stats;
  }, [candidatePool]);

  // One-Click Presets & Scratch Reset
  const applyPreset = (presetName) => {
    switch (presetName) {
      case 'clear_all':
        // Deselect all predetermined combos so user builds custom combination from scratch
        setSelectedPools([]);
        setSelectedDifficulties([]);
        setSelectedTypes([]);
        setSelectedMarks([]);
        setSelectedSections([]);
        break;
      case 'qbank_hard_nat_mcq':
        // User specific example: Question Bank Pool + Hard + NAT & MCQ
        setSelectedPools(['qbank']);
        setSelectedDifficulties(['Hard']);
        setSelectedTypes(['MCQ', 'NAT']);
        setSelectedMarks([1, 2]);
        setSelectedSections(allSections);
        setQuestionCount(20);
        setTimerMinutes(40);
        break;
      case 'all_hard_drill':
        // All pools + Hard questions + all types
        setSelectedPools(['qbank', 'pyq', 'mocks']);
        setSelectedDifficulties(['Hard']);
        setSelectedTypes(['MCQ', 'MSQ', 'NAT']);
        setSelectedMarks([1, 2]);
        setSelectedSections(allSections);
        setQuestionCount(25);
        setTimerMinutes(50);
        break;
      case 'nat_mastery':
        // NAT only across all pools & all difficulties
        setSelectedPools(['qbank', 'pyq', 'mocks']);
        setSelectedDifficulties(['Easy', 'Moderate', 'Hard']);
        setSelectedTypes(['NAT']);
        setSelectedMarks([1, 2]);
        setSelectedSections(allSections);
        setQuestionCount(20);
        setTimerMinutes(45);
        break;
      case 'pyq_speedrun':
        // Official PYQs only + 15 Qs speedrun
        setSelectedPools(['pyq']);
        setPyqRange('all');
        setSelectedDifficulties(['Easy', 'Moderate', 'Hard']);
        setSelectedTypes(['MCQ', 'MSQ', 'NAT']);
        setSelectedMarks([1, 2]);
        setSelectedSections(allSections);
        setQuestionCount(15);
        setTimerMinutes(20);
        break;
      case 'core_agri_numericals':
        // Core Agri + NAT + 2 Marks
        setSelectedPools(['qbank', 'pyq', 'mocks']);
        setSelectedDifficulties(['Moderate', 'Hard']);
        setSelectedTypes(['NAT']);
        setSelectedMarks([2]);
        selectCoreAgri();
        setQuestionCount(15);
        setTimerMinutes(35);
        break;
      case 'reset_all':
      default:
        setSelectedPools(['qbank', 'pyq', 'mocks']);
        setPyqRange('all');
        setSelectedDifficulties(['Easy', 'Moderate', 'Hard']);
        setSelectedTypes(['MCQ', 'MSQ', 'NAT']);
        setSelectedMarks([1, 2]);
        setSelectedSections(allSections);
        setQuestionCount(25);
        setTimerMinutes(45);
        break;
    }
  };

  const handleLaunch = () => {
    if (candidatePool.length === 0) return;

    if (!currentStudent && onRequireAuth) {
      onRequireAuth("Sign In or Register free to create custom speed tests, submit answers, and save performance records!");
      return;
    }

    let sampled = [];
    const targetTotal = Math.min(questionCount, candidatePool.length);

    if (weightingMode === 'proportional' && normSelectedSections.length > 1) {
      // Group candidate pool by section
      const secGroups = {};
      normSelectedSections.forEach(s => { secGroups[s] = []; });
      candidatePool.forEach(q => {
        const sNorm = normSec(q.section);
        if (secGroups[sNorm]) secGroups[sNorm].push(q);
      });

      // Target proportions matching official GATE weightage
      const weights = {
        'Section 8: General Aptitude': 0.15,
        'Section 1: Engineering Mathematics': 0.13,
        'Section 2: Farm Machinery': 0.12,
        'Section 3: Farm Power': 0.12,
        'Section 4: Soil and Water Conservation Engineering': 0.24,
        'Section 5: Irrigation and Drainage Engineering': 0.12,
        'Section 6: Agricultural Process Engineering': 0.12,
        'Section 7: Dairy and Food Engineering': 0.12
      };

      let activeWeightsTotal = 0;
      normSelectedSections.forEach(s => { activeWeightsTotal += (weights[s] || 0.125); });

      const selectedMap = new Set();

      normSelectedSections.forEach(s => {
        const w = (weights[s] || 0.125) / (activeWeightsTotal || 1);
        const countForSec = Math.max(1, Math.round(targetTotal * w));
        const poolForSec = [...(secGroups[s] || [])].sort(() => 0.5 - Math.random());
        const taken = poolForSec.slice(0, countForSec);
        taken.forEach(q => {
          if (!selectedMap.has(q.id || q)) {
            selectedMap.add(q.id || q);
            sampled.push(q);
          }
        });
      });

      // Fill remaining if needed
      if (sampled.length < targetTotal) {
        const remaining = candidatePool.filter(q => !selectedMap.has(q.id || q)).sort(() => 0.5 - Math.random());
        sampled = [...sampled, ...remaining.slice(0, targetTotal - sampled.length)];
      } else if (sampled.length > targetTotal) {
        sampled = sampled.slice(0, targetTotal);
      }
    } else {
      const shuffled = [...candidatePool].sort(() => 0.5 - Math.random());
      sampled = shuffled.slice(0, targetTotal);
    }

    let totalMarks = 0;
    sampled.forEach(q => { totalMarks += (Number(q.marks) || 1); });

    const titlePrefix = isUntimed ? 'Untimed Custom Test' : `Custom Speed Test (${timerMinutes}m)`;
    
    // Construct descriptive tag summary for the test banner
    const poolDesc = selectedPools.length === 3 ? 'All Pools' : selectedPools.map(p => p === 'qbank' ? 'Q-Bank' : p === 'pyq' ? 'PYQ' : 'Mock').join('+') || 'Custom';
    const typeDesc = selectedTypes.length === 3 ? 'All Formats' : selectedTypes.join('+') || 'Custom';
    const diffDesc = selectedDifficulties.length === 3 ? 'All Levels' : selectedDifficulties.join('+') || 'Custom';

    if (onStartCustomTest) {
      onStartCustomTest({
        title: `${titlePrefix} [${poolDesc} • ${typeDesc} • ${diffDesc}] — ${sampled.length} Qs`,
        year: 'Custom',
        instructions: {
          title: titlePrefix,
          duration_mins: isUntimed ? 0 : timerMinutes,
          max_marks: totalMarks,
          total_qs: sampled.length,
          ga_qs: sampled.filter(q => normSec(q.section) === 'Section 8: General Aptitude').length,
          enable_negative_marking: enableNegativeMarking,
          is_untimed: isUntimed,
          instructions: [
            isUntimed 
              ? "1. Untimed Test Mode: Complete questions at your own pace without a countdown timer."
              : `1. Total duration of this Custom Test is ${timerMinutes} minutes.`,
            `2. The test contains ${sampled.length} questions carrying a total of ${totalMarks} marks.`,
            `3. Configuration: Source [${poolDesc}] | Question Types [${typeDesc}] | Difficulty [${diffDesc}].`,
            enableNegativeMarking 
              ? "4. Standard GATE Negative Marking applies (1/3 mark for 1-mark Qs, 2/3 mark for 2-mark Qs on MCQs)."
              : "4. Negative Marking Disabled: No penalty deduction for wrong answers.",
            "5. Numerical Answer Type (NAT) and Multiple Select Questions (MSQ) carry NO negative marking.",
            "6. You may use the built-in GATE Scientific Calculator during the test."
          ]
        },
        questions: sampled.map((q, idx) => ({
          ...q,
          qnum: idx + 1
        }))
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-200/60 dark:border-blue-800/60">
              <Sliders className="w-3.5 h-3.5" />
              <span>Full-Spectrum Custom Test Generator</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Create Any Question Combination
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              Mix and match freely from <strong>Autonomous Question Bank</strong> (1,915 Qs), <strong>Official GATE PYQs</strong> (1,324 Qs), and <strong>Curated Mock Tests</strong> (3,250 Qs). Customize or deselect all presets to craft your personal drill.
            </p>
          </div>

          <button
            onClick={onOpenCalc}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition shadow-2xs"
          >
            <Calculator className="w-4 h-4 text-blue-500" />
            <span>Scientific Calc</span>
          </button>
        </div>

        {/* Quick Combination Presets & Clear Buttons */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mr-1">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Presets:</span>
          </span>
          <button
            type="button"
            onClick={() => applyPreset('qbank_hard_nat_mcq')}
            className="px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 text-xs font-bold hover:bg-amber-100 dark:hover:bg-amber-900/60 transition flex items-center gap-1.5 shadow-2xs"
          >
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Q-Bank + Hard + NAT & MCQ</span>
          </button>
          <button
            type="button"
            onClick={() => applyPreset('all_hard_drill')}
            className="px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60 text-xs font-bold hover:bg-rose-100 dark:hover:bg-rose-900/60 transition flex items-center gap-1.5 shadow-2xs"
          >
            <Zap className="w-3.5 h-3.5 text-rose-500" />
            <span>All Pools Hard Drill</span>
          </button>
          <button
            type="button"
            onClick={() => applyPreset('nat_mastery')}
            className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 text-xs font-bold hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition flex items-center gap-1.5 shadow-2xs"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>NAT Numerical Mastery</span>
          </button>
          <button
            type="button"
            onClick={() => applyPreset('core_agri_numericals')}
            className="px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60 text-xs font-bold hover:bg-blue-100 dark:hover:bg-blue-900/60 transition flex items-center gap-1.5 shadow-2xs"
          >
            <Layers className="w-3.5 h-3.5 text-blue-500" />
            <span>Core Agri 2M Numericals</span>
          </button>

          {/* Action to deselect all filters to build from scratch */}
          <button
            type="button"
            onClick={() => applyPreset('clear_all')}
            className="px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/30 dark:hover:bg-rose-900/40 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 text-xs font-bold transition flex items-center gap-1 ml-auto"
            title="Deselect all predetermined combinations to build your custom test from scratch"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Deselect All</span>
          </button>
          <button
            type="button"
            onClick={() => applyPreset('reset_all')}
            className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition flex items-center gap-1"
            title="Reset to All Pools & Filters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All</span>
          </button>
        </div>
      </div>

      {/* Main Configuration Matrix */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* STEP 1: Question Pool Source(s) Selection */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-500" />
              <span>1. Choose Question Pool Sources ({selectedPools.length} Selected)</span>
            </label>
            <div className="flex items-center gap-2 text-xs">
              <button
                type="button"
                onClick={() => setSelectedPools(['qbank', 'pyq', 'mocks'])}
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                Select All
              </button>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <button
                type="button"
                onClick={() => setSelectedPools([])}
                className="text-rose-600 dark:text-rose-400 font-semibold hover:underline"
              >
                Deselect All
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Pool: Question Bank */}
            <button
              type="button"
              onClick={() => togglePool('qbank')}
              className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between gap-2 cursor-pointer ${
                selectedPools.includes('qbank')
                  ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 font-medium shadow-2xs'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-900 dark:text-white">
                  <Database className="w-4 h-4 text-emerald-500" />
                  <span>Autonomous Question Bank</span>
                </div>
                {selectedPools.includes('qbank') ? (
                  <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                1,915 curated textbook & exam pattern questions across all 181 subtopics.
              </div>
            </button>

            {/* Pool: Official GATE PYQs */}
            <div
              className={`p-4 rounded-2xl border transition flex flex-col justify-between gap-2 ${
                selectedPools.includes('pyq')
                  ? 'border-blue-500 bg-blue-50/70 dark:bg-blue-950/40 text-blue-950 dark:text-blue-100 font-medium shadow-2xs'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => togglePool('pyq')}
              >
                <div className="flex items-center gap-2 font-bold text-xs text-slate-900 dark:text-white">
                  <Layers className="w-4 h-4 text-blue-500" />
                  <span>Official GATE PYQs</span>
                </div>
                {selectedPools.includes('pyq') ? (
                  <CheckSquare className="w-4 h-4 text-blue-600 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                <span>1,324 Official Past Papers</span>
                <select
                  value={pyqRange}
                  onChange={(e) => {
                    e.stopPropagation();
                    setPyqRange(e.target.value);
                  }}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-1.5 py-0.5 text-[10px] font-bold text-slate-700 dark:text-slate-200"
                >
                  <option value="all">2007–2026</option>
                  <option value="recent">2016–2026</option>
                </select>
              </div>
            </div>

            {/* Pool: Curated Mock Tests */}
            <button
              type="button"
              onClick={() => togglePool('mocks')}
              className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between gap-2 cursor-pointer ${
                selectedPools.includes('mocks')
                  ? 'border-purple-500 bg-purple-50/70 dark:bg-purple-950/40 text-purple-950 dark:text-purple-100 font-medium shadow-2xs'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-900 dark:text-white">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <span>Curated Full Mocks</span>
                </div>
                {selectedPools.includes('mocks') ? (
                  <CheckSquare className="w-4 h-4 text-purple-600 shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                3,250 questions across 50 full-length GATE AG mock examination papers.
              </div>
            </button>
          </div>
        </div>

        {/* STEP 2: Difficulty & Question Types Multi-Select Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          
          {/* Difficulty Multi-Select */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-500" />
                <span>2. Difficulty Level ({selectedDifficulties.length} Selected)</span>
              </label>
              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedDifficulties(['Easy', 'Moderate', 'Hard'])}
                  className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                >
                  All
                </button>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <button
                  type="button"
                  onClick={() => setSelectedDifficulties(['Hard'])}
                  className="text-rose-600 dark:text-rose-400 font-semibold hover:underline"
                >
                  Hard Only
                </button>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <button
                  type="button"
                  onClick={() => setSelectedDifficulties([])}
                  className="text-rose-600 dark:text-rose-400 font-semibold hover:underline"
                >
                  Deselect
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'Easy', label: 'Easy', color: 'emerald', sub: 'Fundamental' },
                { id: 'Moderate', label: 'Moderate', color: 'amber', sub: 'Standard' },
                { id: 'Hard', label: 'Hard', color: 'rose', sub: 'Advanced / Multi-Step' }
              ].map(d => {
                const isSel = selectedDifficulties.includes(d.id);
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => toggleDifficulty(d.id)}
                    className={`p-3 rounded-2xl border text-left transition flex items-center gap-2.5 cursor-pointer ${
                      isSel
                        ? d.id === 'Hard'
                          ? 'border-rose-500 bg-rose-50/70 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100 font-bold shadow-2xs'
                          : d.id === 'Moderate'
                          ? 'border-amber-500 bg-amber-50/70 dark:bg-amber-950/40 text-amber-950 dark:text-amber-100 font-bold shadow-2xs'
                          : 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-100 font-bold shadow-2xs'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    {isSel ? (
                      <CheckSquare className="w-4 h-4 text-blue-600 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">{d.label}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">{d.sub}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question Format Multi-Select */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <Tag className="w-4 h-4 text-indigo-500" />
                <span>3. Question Formats ({selectedTypes.length} Selected)</span>
              </label>
              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedTypes(['MCQ', 'MSQ', 'NAT'])}
                  className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                >
                  All
                </button>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <button
                  type="button"
                  onClick={() => setSelectedTypes(['MCQ', 'NAT'])}
                  className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                >
                  NAT+MCQ
                </button>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <button
                  type="button"
                  onClick={() => setSelectedTypes([])}
                  className="text-rose-600 dark:text-rose-400 font-semibold hover:underline"
                >
                  Deselect
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'MCQ', label: 'MCQ', desc: 'Single Choice' },
                { id: 'MSQ', label: 'MSQ', desc: 'Multiple Select' },
                { id: 'NAT', label: 'NAT', desc: 'Numerical Range' }
              ].map(t => {
                const isSel = selectedTypes.includes(t.id);
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => toggleType(t.id)}
                    className={`p-3 rounded-2xl border text-left transition flex items-center gap-2.5 cursor-pointer ${
                      isSel
                        ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 text-blue-950 dark:text-blue-100 font-bold shadow-2xs'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    {isSel ? (
                      <CheckSquare className="w-4 h-4 text-blue-600 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">{t.label}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">{t.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* STEP 3: Marks & Section Selection */}
        <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-500" />
              <span>4. Target Syllabus Sections ({selectedSections.length} of {allSections.length})</span>
            </label>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <button
                type="button"
                onClick={selectAllSections}
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                All 8 Sections
              </button>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <button
                type="button"
                onClick={selectCoreAgri}
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                Core Agri
              </button>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <button
                type="button"
                onClick={selectGaAndEm}
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                GA & Math
              </button>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <button
                type="button"
                onClick={clearAllSections}
                className="text-rose-600 dark:text-rose-400 font-semibold hover:underline"
              >
                Deselect All
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {allSections.map((sec) => {
              const isChecked = selectedSections.includes(sec);
              return (
                <button
                  key={sec}
                  type="button"
                  onClick={() => toggleSection(sec)}
                  className={`p-3 rounded-2xl border text-left text-xs transition flex items-center gap-2.5 cursor-pointer ${
                    isChecked
                      ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 text-blue-950 dark:text-blue-100 font-bold shadow-2xs'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 text-blue-600 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                  <span className="truncate">{sec.replace('Section ', 'S')}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP 4: Weighting, Negative Marking & Marks Filter */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
          
          {/* Marks Filter */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-500" />
                <span>Marks Valuation</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px]">
                <button
                  type="button"
                  onClick={() => setSelectedMarks([1, 2])}
                  className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                >
                  Both
                </button>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <button
                  type="button"
                  onClick={() => setSelectedMarks([])}
                  className="text-rose-600 dark:text-rose-400 font-semibold hover:underline"
                >
                  Clear
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => toggleMarks(1)}
                className={`p-2 rounded-xl border text-xs font-semibold text-center transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  selectedMarks.includes(1)
                    ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-xs'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>1 Mark Qs</span>
              </button>
              <button
                type="button"
                onClick={() => toggleMarks(2)}
                className={`p-2 rounded-xl border text-xs font-semibold text-center transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  selectedMarks.includes(2)
                    ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-xs'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span>2 Marks Qs</span>
              </button>
            </div>
          </div>

          {/* Section Weighting */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
              <BarChart2 className="w-4 h-4 text-blue-500" />
              <span>Section Weighting</span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => setWeightingMode('proportional')}
                className={`p-2 rounded-xl border text-[11px] font-semibold text-center transition cursor-pointer ${
                  weightingMode === 'proportional'
                    ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-xs'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                GATE Proportions
              </button>
              <button
                type="button"
                onClick={() => setWeightingMode('random')}
                className={`p-2 rounded-xl border text-[11px] font-semibold text-center transition cursor-pointer ${
                  weightingMode === 'random'
                    ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-xs'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Random Shuffled
              </button>
            </div>
          </div>

          {/* Negative Marking Toggle */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
              {enableNegativeMarking ? (
                <ShieldAlert className="w-4 h-4 text-rose-500" />
              ) : (
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
              )}
              <span>Negative Marking</span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => setEnableNegativeMarking(true)}
                className={`p-2 rounded-xl border text-[11px] font-semibold text-center transition cursor-pointer ${
                  enableNegativeMarking
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-slate-900 dark:border-white font-bold shadow-xs'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Standard (-1/3, -2/3)
              </button>
              <button
                type="button"
                onClick={() => setEnableNegativeMarking(false)}
                className={`p-2 rounded-xl border text-[11px] font-semibold text-center transition cursor-pointer ${
                  !enableNegativeMarking
                    ? 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-xs'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                No Penalty (0 Risk)
              </button>
            </div>
          </div>

        </div>

        {/* STEP 5: Live Matching Questions Dashboard - High contrast light/dark 2-theme design */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-slate-200">
                Live Combination Matches:
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-black border ${
                candidatePool.length > 0
                  ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-800'
                  : 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800'
              }`}>
                {candidatePool.length.toLocaleString()} Questions Eligible
              </span>
            </div>
            {candidatePool.length === 0 && (
              <span className="text-xs text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1">
                ⚠️ Select at least 1 Pool, 1 Difficulty, 1 Format, and 1 Section!
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px] font-mono">
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex justify-between items-center">
              <span className="text-slate-500 dark:text-slate-400 font-semibold">Sources:</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">QB:{poolStats.qbank} | PYQ:{poolStats.pyq} | Mock:{poolStats.mocks}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex justify-between items-center">
              <span className="text-slate-500 dark:text-slate-400 font-semibold">Types:</span>
              <span className="text-indigo-700 dark:text-indigo-400 font-bold">MCQ:{poolStats.mcq} | MSQ:{poolStats.msq} | NAT:{poolStats.nat}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex justify-between items-center">
              <span className="text-slate-500 dark:text-slate-400 font-semibold">Difficulty:</span>
              <span className="text-amber-700 dark:text-amber-400 font-bold">E:{poolStats.easy} | M:{poolStats.moderate} | H:{poolStats.hard}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex justify-between items-center">
              <span className="text-slate-500 dark:text-slate-400 font-semibold">Valuation:</span>
              <span className="text-blue-700 dark:text-blue-400 font-bold">1M:{poolStats.marks1} | 2M:{poolStats.marks2}</span>
            </div>
          </div>
        </div>

        {/* STEP 6: Question Count & Timer Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-900 dark:text-white uppercase tracking-wider">Number of Questions to Sample:</span>
              <span className="text-blue-600 dark:text-blue-400 font-mono text-sm font-extrabold">
                {candidatePool.length === 0 ? '0 Questions' : `${Math.min(questionCount, candidatePool.length)} Questions`}
              </span>
            </div>
            <input
              type="range"
              min="5"
              max={Math.max(5, Math.min(65, candidatePool.length || 5))}
              step="5"
              value={Math.min(questionCount, Math.max(5, candidatePool.length || 5))}
              onChange={(e) => setQuestionCount(parseInt(e.target.value, 10))}
              disabled={candidatePool.length === 0}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>5 Qs</span>
              <span>25 Qs</span>
              <span>50 Qs</span>
              <span>65 Qs (Full CBT)</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold items-center">
              <span className="text-slate-900 dark:text-white uppercase tracking-wider">Test Duration:</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsUntimed(!isUntimed)}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition flex items-center gap-1 cursor-pointer ${
                    isUntimed 
                      ? 'bg-purple-600 text-white shadow-2xs' 
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <Infinity className="w-3 h-3" />
                  <span>Untimed Practice</span>
                </button>
                <span className="text-blue-600 dark:text-blue-400 font-mono text-sm font-extrabold">
                  {isUntimed ? 'No Limit' : `${timerMinutes} Mins`}
                </span>
              </div>
            </div>

            {!isUntimed ? (
              <>
                <input
                  type="range"
                  min="5"
                  max="180"
                  step="5"
                  value={timerMinutes}
                  onChange={(e) => setTimerMinutes(parseInt(e.target.value, 10))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono pt-1">
                  {[15, 30, 45, 60, 90, 180].map(m => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setTimerMinutes(m)}
                      className={`px-2 py-0.5 rounded font-bold transition cursor-pointer ${
                        timerMinutes === m
                          ? 'bg-blue-600 text-white shadow-2xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {m}m
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900 text-xs text-purple-900 dark:text-purple-200 font-medium">
                Untimed Mode enabled: Solve custom-selected questions at your own pace without timer pressure.
              </div>
            )}
          </div>

        </div>

        {/* Launch Button & Summary */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-600 dark:text-slate-400 font-mono">
            {candidatePool.length > 0 ? (
              <>Selected: <span className="font-bold text-slate-900 dark:text-white">{Math.min(questionCount, candidatePool.length)} Qs</span> from <span className="font-bold text-slate-900 dark:text-white">{candidatePool.length.toLocaleString()} matches</span> • <span className="font-bold text-slate-900 dark:text-white">{isUntimed ? 'Untimed' : `${timerMinutes} Mins`}</span> • <span className="font-bold text-slate-900 dark:text-white">{enableNegativeMarking ? 'Standard GATE Penalties' : 'Zero Penalty'}</span></>
            ) : (
              <span className="text-rose-600 dark:text-rose-400 font-bold">No active selections. Please select at least one pool, format, and section.</span>
            )}
          </div>

          <button
            type="button"
            onClick={handleLaunch}
            disabled={candidatePool.length === 0}
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 active:scale-98 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-xs sm:text-sm transition shadow-lg shadow-blue-500/25 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white shrink-0" />
            <span>Start Custom Test</span>
          </button>
        </div>

      </div>

    </div>
  );
}
