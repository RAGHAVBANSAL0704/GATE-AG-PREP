import React, { useState } from 'react';
import { 
  FileText, 
  FileQuestion, 
  KeyRound, 
  BookOpen, 
  Printer, 
  Download, 
  X, 
  Check, 
  Sliders, 
  Sparkles,
  Info
} from 'lucide-react';
import { exportPaperToPdf, downloadQuestionPaperHtmlFile, PDF_EXPORT_MODES } from '../services/questionPdfExportService';

export default function PdfExportOptionsModal({ 
  isOpen, 
  onClose, 
  paper = null, 
  questions = [], 
  defaultMode = 'study_guide' 
}) {
  if (!isOpen || !paper) return null;

  const [selectedMode, setSelectedMode] = useState(defaultMode || 'study_guide');
  const [studentName, setStudentName] = useState('');
  const [paperSize, setPaperSize] = useState('a4');
  const [columnLayout, setColumnLayout] = useState('1-col');
  const [includeRoughWork, setIncludeRoughWork] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const paperTitle = typeof paper === 'string' 
    ? paper 
    : (paper.title || `GATE AG ${paper.year || ''} Paper`);
  
  const questionCount = (questions && questions.length > 0) 
    ? questions.length 
    : (paper.questions?.length || 65);

  const handleExport = (type = 'print') => {
    const extraOptions = {
      studentName: studentName.trim() || undefined,
      paperSize,
      columnLayout,
      includeRoughWork
    };

    if (type === 'html') {
      const modeKey = selectedMode;
      const isSolved = modeKey === 'study_guide';
      const isOnlyAns = modeKey === 'only_answers';
      const isOnlyQs = modeKey === 'only_questions';

      downloadQuestionPaperHtmlFile(questions.length > 0 ? questions : paper.questions || [], {
        title: paperTitle,
        layoutMode: modeKey,
        paperCode: paper.year ? `GATE-AG-${paper.year}` : 'GATE-AG-MOCK',
        includeAnswerKey: !isOnlyQs,
        includeSolutions: !isOnlyQs,
        includeCandidateBox: !isSolved && !isOnlyAns,
        ...extraOptions
      });
    } else {
      exportPaperToPdf(paper, questions.length > 0 ? questions : paper.questions || [], selectedMode, extraOptions);
    }

    onClose();
  };

  const getModeIcon = (id) => {
    switch (id) {
      case 'only_questions':
        return <FileQuestion className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
      case 'only_answers':
        return <KeyRound className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'first_questions_then_answers':
        return <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
      case 'study_guide':
      default:
        return <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 no-print animate-in fade-in duration-150">
      <div 
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-50 dark:bg-slate-800/80 px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white leading-tight">
                Export Paper to PDF
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                {paperTitle} • {questionCount} Questions (100 Marks)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Format Selection Header */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
              Choose Document Layout &amp; Solution Format
            </label>

            {/* 4 Format Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PDF_EXPORT_MODES.map((mode) => {
                const isSelected = selectedMode === mode.id;
                return (
                  <div
                    key={mode.id}
                    onClick={() => setSelectedMode(mode.id)}
                    className={`relative p-4 rounded-2xl border-2 transition cursor-pointer flex flex-col justify-between text-left ${
                      isSelected
                        ? 'border-purple-600 bg-purple-50/60 dark:bg-purple-950/30 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-950/40'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          {getModeIcon(mode.id)}
                          <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                            {mode.label}
                          </span>
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pr-2">
                        {mode.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-200/50 dark:border-slate-800/60 flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {mode.badge}
                      </span>
                      <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400">
                        {isSelected ? 'Active Selection' : 'Click to Select'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Customization Options */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-purple-500" />
                <span>Page &amp; Print Customization</span>
              </span>
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline cursor-pointer"
              >
                {showAdvanced ? 'Hide Options' : 'Customize Options'}
              </button>
            </div>

            {showAdvanced ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Student / Candidate Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-white outline-none focus:ring-1 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Paper Size
                  </label>
                  <select
                    value={paperSize}
                    onChange={(e) => setPaperSize(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-white outline-none cursor-pointer"
                  >
                    <option value="a4">A4 (Standard 210 × 297 mm)</option>
                    <option value="letter">US Letter (8.5 × 11 in)</option>
                    <option value="legal">Legal (8.5 × 14 in)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Column Layout
                  </label>
                  <select
                    value={columnLayout}
                    onChange={(e) => setColumnLayout(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-900 dark:text-white outline-none cursor-pointer"
                  >
                    <option value="1-col">1 Column (Spacious &amp; Clear)</option>
                    <option value="2-col">2 Columns (Compact &amp; Ink-Saving)</option>
                  </select>
                </div>

                <div className="sm:col-span-3 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
                    <input
                      type="checkbox"
                      checked={includeRoughWork}
                      onChange={(e) => setIncludeRoughWork(e.target.checked)}
                      className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 border-slate-300 dark:border-slate-700"
                    />
                    <span className="text-xs">Include dedicated full-page scratch &amp; rough workspace section at the end</span>
                  </label>
                </div>
              </div>
            ) : (
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Default: <strong>A4 Portrait</strong>, <strong>1-Column</strong>. High-contrast typography with instant printer trigger.
              </p>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 dark:bg-slate-800/80 px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
            <span>Opens standard print preview. Select "Save as PDF" to save file.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleExport('html')}
              className="px-3 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              title="Download standalone offline HTML file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Save HTML</span>
            </button>

            <button
              type="button"
              onClick={() => handleExport('print')}
              className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-extrabold transition flex items-center gap-2 shadow-md cursor-pointer active:scale-95"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
