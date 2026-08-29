import React, { useState } from 'react';
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
  Infinity
} from 'lucide-react';
import { getOfficialSections, normalizeSectionTitle } from '../utils/syllabusTaxonomy.js';

const allSections = [
  'Section 1: Engineering Mathematics',
  'Section 2: Farm Machinery',
  'Section 3: Farm Power',
  'Section 4: Soil and Water Conservation Engineering',
  'Section 5: Irrigation and Drainage Engineering',
  'Section 6: Agricultural Process Engineering',
  'Section 7: Dairy and Food Engineering',
  'General Aptitude'
];

export default function CustomTestCreator({ questions, mockPapers, onStartCustomTest, onOpenCalc }) {
  const [selectedSections, setSelectedSections] = useState(allSections);
  const [selectedType, setSelectedType] = useState('All');
  const [questionCount, setQuestionCount] = useState(15);
  const [timerMinutes, setTimerMinutes] = useState(30);
  const [isUntimed, setIsUntimed] = useState(false);
  const [enableNegativeMarking, setEnableNegativeMarking] = useState(true);
  const [weightingMode, setWeightingMode] = useState('proportional'); // 'proportional' or 'random'
  const [yearFilter, setYearFilter] = useState('2016-2026'); // '2016-2026' or '2007-2026'

  const toggleSection = (sec) => {
    if (selectedSections.includes(sec)) {
      if (selectedSections.length > 1) {
        setSelectedSections(selectedSections.filter(s => s !== sec));
      }
    } else {
      setSelectedSections([...selectedSections, sec]);
    }
  };

  const selectAllSections = () => setSelectedSections([...allSections]);

  const rawPool = yearFilter === '2016-2026' ? questions : mockPapers.flatMap(p => p.questions);
  
  const normSelectedSections = selectedSections.map(s => normalizeSectionTitle(s));

  const candidatePool = rawPool.filter(q => {
    const qSec = normalizeSectionTitle(q.section);
    if (normSelectedSections.length > 0 && !normSelectedSections.includes(qSec)) return false;
    if (selectedType !== 'All' && q.type !== selectedType) return false;
    return true;
  });

  const handleLaunch = () => {
    if (candidatePool.length === 0) return;

    let sampled = [];
    const targetTotal = Math.min(questionCount, candidatePool.length);

    if (weightingMode === 'proportional' && normSelectedSections.length > 1) {
      // Group candidate pool by section
      const secGroups = {};
      normSelectedSections.forEach(s => secGroups[s] = []);
      candidatePool.forEach(q => {
        const sNorm = normSec(q.section);
        if (secGroups[sNorm]) secGroups[sNorm].push(q);
      });

      // Target proportions matching official GATE weightage
      const weights = {
        'General Aptitude': 0.15,
        'Engineering Mathematics': 0.13,
        'Farm Power and Machinery': 0.24,
        'Soil and Water Conservation Engineering': 0.24,
        'Agricultural Process Engineering': 0.24
      };

      let activeWeightsTotal = 0;
      normSelectedSections.forEach(s => activeWeightsTotal += (weights[s] || 0.20));

      const selectedMap = new Set();

      normSelectedSections.forEach(s => {
        const w = (weights[s] || 0.20) / activeWeightsTotal;
        const countForSec = Math.max(1, Math.round(targetTotal * w));
        const poolForSec = [...(secGroups[s] || [])].sort(() => 0.5 - Math.random());
        const taken = poolForSec.slice(0, countForSec);
        taken.forEach(q => {
          selectedMap.add(q);
          sampled.push(q);
        });
      });

      // Fill remaining if needed
      if (sampled.length < targetTotal) {
        const remaining = candidatePool.filter(q => !selectedMap.has(q)).sort(() => 0.5 - Math.random());
        sampled = [...sampled, ...remaining.slice(0, targetTotal - sampled.length)];
      } else if (sampled.length > targetTotal) {
        sampled = sampled.slice(0, targetTotal);
      }
    } else {
      const shuffled = [...candidatePool].sort(() => 0.5 - Math.random());
      sampled = shuffled.slice(0, targetTotal);
    }

    let totalMarks = 0;
    sampled.forEach(q => totalMarks += q.marks);

    const titlePrefix = isUntimed ? 'Untimed Custom Test' : `Custom Speed Test (${timerMinutes}m)`;

    onStartCustomTest({
      title: `${titlePrefix} — ${sampled.length} Qs`,
      year: 'Custom',
      instructions: {
        title: titlePrefix,
        duration_mins: isUntimed ? 0 : timerMinutes,
        max_marks: totalMarks,
        total_qs: sampled.length,
        ga_qs: sampled.filter(q => normSec(q.section) === 'General Aptitude').length,
        enable_negative_marking: enableNegativeMarking,
        is_untimed: isUntimed,
        instructions: [
          isUntimed 
            ? "1. Untimed Test Mode: Complete questions at your own pace without a countdown timer."
            : `1. Total duration of this Custom Test is ${timerMinutes} minutes.`,
          `2. The test contains ${sampled.length} questions carrying a total of ${totalMarks} marks.`,
          enableNegativeMarking 
            ? "3. Standard GATE Negative Marking applies (1/3 mark for 1-mark Qs, 2/3 mark for 2-mark Qs on MCQs)."
            : "3. Negative Marking Disabled: No penalty deduction for wrong answers.",
          "4. Numerical Answer Type (NAT) and Multiple Select Questions (MSQ) carry NO negative marking.",
          "5. You may use the built-in GATE Scientific Calculator during the test."
        ]
      },
      questions: sampled
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold">
              <Sliders className="w-3.5 h-3.5" />
              <span>Custom Speed-Run & Test Generator</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Configure Your Custom CBT Test
            </h1>
            <p className="text-xs text-slate-500 max-w-xl">
              Select target sections, question count, duration, negative marking, and section weighting to generate a personalized exam session.
            </p>
          </div>

          <button
            onClick={onOpenCalc}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-200 transition"
          >
            <Calculator className="w-4 h-4 text-blue-500" />
            <span>Scientific Calc</span>
          </button>
        </div>
      </div>

      {/* Main Configuration Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        
        {/* Section Selection */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-500" />
              <span>Select Syllabus Sections</span>
            </label>
            <button
              onClick={selectAllSections}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Select All Sections
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {allSections.map((sec) => {
              const isChecked = selectedSections.includes(sec);
              return (
                <button
                  key={sec}
                  onClick={() => toggleSection(sec)}
                  className={`p-3.5 rounded-xl border text-left text-xs transition flex items-center gap-3 ${
                    isChecked
                      ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100 font-bold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 text-blue-600 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                  <span>{sec}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section Weighting & Negative Marking Toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
          
          {/* Section Weighting */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
              <BarChart2 className="w-4 h-4 text-blue-500" />
              <span>Section Question Weighting</span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => setWeightingMode('proportional')}
                className={`p-2.5 rounded-lg border text-xs font-semibold text-center transition ${
                  weightingMode === 'proportional'
                    ? 'bg-blue-600 text-white border-blue-600 font-bold'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                Official GATE Weightage (15/13/72%)
              </button>
              <button
                onClick={() => setWeightingMode('random')}
                className={`p-2.5 rounded-lg border text-xs font-semibold text-center transition ${
                  weightingMode === 'random'
                    ? 'bg-blue-600 text-white border-blue-600 font-bold'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                Random Sampling
              </button>
            </div>
          </div>

          {/* Negative Marking Toggle */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
              {enableNegativeMarking ? (
                <ShieldAlert className="w-4 h-4 text-rose-500" />
              ) : (
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
              )}
              <span>Negative Marking Setting</span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => setEnableNegativeMarking(true)}
                className={`p-2.5 rounded-lg border text-xs font-semibold text-center transition ${
                  enableNegativeMarking
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 border-slate-900 font-bold'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                GATE Standard (-1/3 & -2/3)
              </button>
              <button
                onClick={() => setEnableNegativeMarking(false)}
                className={`p-2.5 rounded-lg border text-xs font-semibold text-center transition ${
                  !enableNegativeMarking
                    ? 'bg-emerald-600 text-white border-emerald-600 font-bold'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                Disable Penalty (0 Risk)
              </button>
            </div>
          </div>

        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
          
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Question Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-slate-100 font-medium focus:ring-1 focus:ring-blue-500 outline-none"
            >
              <option value="All">All Types (MCQ / MSQ / NAT)</option>
              <option value="MCQ">MCQ Only</option>
              <option value="MSQ">MSQ Only</option>
              <option value="NAT">NAT Only</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Question Pool Range</label>
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-slate-100 font-medium focus:ring-1 focus:ring-blue-500 outline-none"
            >
              <option value="2016-2026">Practice Dataset (Solved DOCX)</option>
              <option value="2007-2026">Full 20-Year Question Bank (2007–2026)</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Pool Status</label>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-bold text-slate-900 dark:text-white flex items-center justify-between">
              <span>Matching Qs:</span>
              <span className="text-blue-600 dark:text-blue-400">{candidatePool.length}</span>
            </div>
          </div>

        </div>

        {/* Question Count & Timer Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-900 dark:text-white uppercase tracking-wider">Number of Questions:</span>
              <span className="text-blue-600 font-mono text-sm">{questionCount} Questions</span>
            </div>
            <input
              type="range"
              min="5"
              max={Math.min(65, candidatePool.length || 65)}
              step="5"
              value={questionCount}
              onChange={(e) => setQuestionCount(parseInt(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>5 Qs</span>
              <span>30 Qs</span>
              <span>65 Qs</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold items-center">
              <span className="text-slate-900 dark:text-white uppercase tracking-wider">Timer Duration:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsUntimed(!isUntimed)}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition flex items-center gap-1 ${
                    isUntimed 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <Infinity className="w-3 h-3" />
                  <span>Untimed Mode</span>
                </button>
                <span className="text-blue-600 font-mono text-sm">
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
                  onChange={(e) => setTimerMinutes(parseInt(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono pt-1">
                  {[15, 30, 60, 90, 180].map(m => (
                    <button
                      key={m}
                      onClick={() => setTimerMinutes(m)}
                      className={`px-2 py-0.5 rounded font-bold transition ${
                        timerMinutes === m
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                      }`}
                    >
                      {m}m
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900 text-xs text-purple-900 dark:text-purple-200 font-medium">
                Untimed Practice Mode enabled. You can solve questions without any time constraint.
              </div>
            )}
          </div>

        </div>

        {/* Launch Button */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-500 font-mono">
            Target: <span className="font-bold text-slate-900 dark:text-white">{Math.min(questionCount, candidatePool.length)} Qs</span> • <span className="font-bold text-slate-900 dark:text-white">{isUntimed ? 'Untimed' : `${timerMinutes} Mins`}</span> • <span className="font-bold text-slate-900 dark:text-white">{enableNegativeMarking ? 'GATE Negative Marking' : 'No Negative Marking'}</span>
          </div>

          <button
            onClick={handleLaunch}
            disabled={candidatePool.length === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs sm:text-sm transition shadow-md"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Launch Custom Test</span>
          </button>
        </div>

      </div>

    </div>
  );
}
