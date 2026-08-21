import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Trash2, 
  Play, 
  Download, 
  FileCode, 
  Plus, 
  Copy, 
  Check, 
  Layers, 
  Clock, 
  HelpCircle,
  Sparkles,
  Info
} from 'lucide-react';

export default function UploadMockTest({ 
  customMockPapers = [], 
  onUploadMock, 
  onDeleteMock, 
  onStartMock 
}) {
  const [activeSubTab, setActiveSubTab] = useState('upload'); // 'upload' | 'inventory' | 'template'
  const [jsonInput, setJsonInput] = useState('');
  const [testTitle, setTestTitle] = useState('');
  const [validationError, setValidationError] = useState(null);
  const [validationSuccess, setValidationSuccess] = useState(null);
  const [copiedTemplate, setCopiedTemplate] = useState(false);

  const SAMPLE_TEMPLATE = {
    title: "GATE 2027 Custom Practice Mock 02",
    year: "2027 Custom",
    status: "AVAILABLE",
    instructions: {
      duration_mins: 180,
      max_marks: 100,
      total_qs: 5,
      instructions: [
        "1. Duration of exam is 180 minutes.",
        "2. General aptitude carries 15 marks. Technical section carries 85 marks.",
        "3. Standard GATE negative marking applies for MCQs."
      ]
    },
    questions: [
      {
        id: "CUSTOM_Q01",
        qnum: 1,
        section: "General Aptitude",
        type: "MCQ",
        marks: 1,
        question: "Select the word nearly similar in meaning to 'Resilient':",
        options: {
          A: "Fragile",
          B: "Tough",
          C: "Rigid",
          D: "Weak"
        },
        correct_answer: "B",
        solution: "Resilient means able to withstand or recover quickly from difficult conditions; tough."
      },
      {
        id: "CUSTOM_Q02",
        qnum: 2,
        section: "Farm Power and Machinery",
        type: "NAT",
        marks: 2,
        question: "A tractor engine develops 30 kW brake power at 2000 rpm. If the thermal efficiency is 32%, calculate fuel consumption in kg/h (Calorific value = 42 MJ/kg).",
        options: {},
        correct_answer: "8.0 to 8.1",
        solution: "Fuel power required = 30 kW / 0.32 = 93.75 kW = 93.75 kJ/s = 337.5 MJ/h. Fuel consumption = 337.5 / 42 = 8.035 kg/h."
      }
    ]
  };

  const validateAndParseMockJSON = (rawText) => {
    try {
      const parsed = JSON.parse(rawText);
      if (!parsed || typeof parsed !== 'object') {
        throw new Error("Invalid JSON root format. Expected a JSON object.");
      }

      if (!parsed.title && !testTitle.trim()) {
        throw new Error("Missing test 'title'. Please specify a title.");
      }

      const qs = Array.isArray(parsed.questions) ? parsed.questions : (Array.isArray(parsed) ? parsed : null);
      if (!qs || qs.length === 0) {
        throw new Error("No 'questions' array found in JSON or questions array is empty.");
      }

      const normalizedQs = qs.map((q, idx) => {
        const qId = q.id || `CUSTOM_UPLOAD_Q${idx + 1}`;
        const sec = q.section || 'Farm Power and Machinery';
        const qType = (q.type || 'MCQ').toUpperCase();
        const marks = Number(q.marks) || 1;
        const qText = q.question || q.text || `Question ${idx + 1}`;
        let opts = q.options || {};
        if (Array.isArray(opts)) {
          const optObj = {};
          opts.forEach((o, oIdx) => {
            const letter = String.fromCharCode(65 + oIdx);
            optObj[letter] = String(o).replace(/^\([A-D]\)\s*/, '');
          });
          opts = optObj;
        }

        const ans = q.correct_answer || q.answer || '';
        const sol = q.solution || q.explanation || `Answer Key: ${ans}`;

        return {
          id: qId,
          year: parsed.year || 'Custom Mock',
          qnum: q.qnum || idx + 1,
          section: sec,
          subtopic: q.subtopic || sec,
          type: qType,
          marks: marks,
          negative_marks: (qType === 'MCQ' && marks === 1) ? 0.3333333333333333 : ((qType === 'MCQ' && marks === 2) ? 0.6666666666666666 : 0),
          question: qText,
          options: opts,
          correct_answer: ans,
          solution: sol,
          isCustomUploaded: true
        };
      });

      const finalTitle = parsed.title || testTitle || `Custom Uploaded Mock Test (${normalizedQs.length} Qs)`;
      const totalMarks = normalizedQs.reduce((acc, q) => acc + q.marks, 0);

      const paperObj = {
        id: parsed.id || `CUSTOM_PAPER_${Date.now()}`,
        title: finalTitle,
        year: parsed.year || 'Custom Uploaded',
        status: 'AVAILABLE',
        isCustomUploaded: true,
        instructions: parsed.instructions || {
          year: parsed.year || 'Custom Uploaded',
          duration_mins: 180,
          max_marks: totalMarks,
          total_qs: normalizedQs.length,
          instructions: [
            `1. Custom uploaded mock test containing ${normalizedQs.length} questions.`,
            `2. Total maximum marks: ${totalMarks}.`,
            "3. Standard CBT navigation palette and calculator available."
          ]
        },
        questions: normalizedQs
      };

      return paperObj;
    } catch (err) {
      throw new Error(`Validation Error: ${err.message}`);
    }
  };

  const handleFileUpload = (e) => {
    setValidationError(null);
    setValidationSuccess(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target.result;
        const paper = validateAndParseMockJSON(text);
        onUploadMock(paper);
        setValidationSuccess(`Successfully uploaded "${paper.title}" with ${paper.questions.length} questions!`);
        setJsonInput('');
        setTestTitle('');
        setActiveSubTab('inventory');
      } catch (err) {
        setValidationError(err.message);
      }
    };
    reader.readAsText(file);
  };

  const handleManualSubmit = () => {
    setValidationError(null);
    setValidationSuccess(null);
    try {
      if (!jsonInput.trim()) {
        throw new Error("JSON text input is empty. Paste your test JSON or select a file.");
      }
      const paper = validateAndParseMockJSON(jsonInput);
      onUploadMock(paper);
      setValidationSuccess(`Successfully added "${paper.title}" with ${paper.questions.length} questions!`);
      setJsonInput('');
      setTestTitle('');
      setActiveSubTab('inventory');
    } catch (err) {
      setValidationError(err.message);
    }
  };

  const handleDownloadTemplate = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(SAMPLE_TEMPLATE, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "gate_ag_custom_mock_template.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(JSON.stringify(SAMPLE_TEMPLATE, null, 2));
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2000);
  };

  const totalCustomQs = customMockPapers.reduce((sum, p) => sum + (p.questions?.length || 0), 0);

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
      
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold">
              <Upload className="w-3.5 h-3.5" />
              <span>Custom Mock Test Upload & Management Hub</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Upload Your Own Custom Mock Tests
            </h1>
            <p className="text-xs text-slate-500 max-w-2xl">
              Upload JSON mock papers to practice full 180-minute CBT exams, view custom questions in Practice Mode, and organize your test repository.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-center">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Custom Papers</div>
              <div className="text-lg font-extrabold text-blue-600 dark:text-blue-400">{customMockPapers.length}</div>
            </div>
            <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-center">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Qs</div>
              <div className="text-lg font-extrabold text-purple-600 dark:text-purple-400">{totalCustomQs}</div>
            </div>
          </div>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setActiveSubTab('upload')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeSubTab === 'upload'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload New Test</span>
          </button>

          <button
            onClick={() => setActiveSubTab('inventory')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeSubTab === 'inventory'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Mock Test Inventory ({customMockPapers.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('template')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeSubTab === 'template'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span>JSON Template & Schema</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {validationError && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200 text-xs flex items-center gap-3 animate-in fade-in">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
          <div className="flex-1 font-semibold">{validationError}</div>
        </div>
      )}

      {validationSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div className="flex-1 font-semibold">{validationSuccess}</div>
        </div>
      )}

      {/* SubTab 1: Upload */}
      {activeSubTab === 'upload' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* File Upload Drag & Drop Box */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-3">
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-500" />
                <span>Upload JSON Mock Test File</span>
              </h2>
              <p className="text-xs text-slate-500">
                Select a valid custom test JSON file structured according to the portal schema.
              </p>

              <label className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition space-y-3 group">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">Click to select JSON file</span>
                  <span className="text-[10px] text-slate-400">Supports .json mock test files</span>
                </div>
                <input
                  type="file"
                  accept=".json,application/json"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Info className="w-3.5 h-3.5 text-blue-500" />
                <span>Quick Tip</span>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                You can download our reference JSON template in the <strong>JSON Template & Schema</strong> tab to see the exact structure with MCQs, MSQs, and NAT questions.
              </p>
            </div>
          </div>

          {/* Paste Raw JSON Text Editor */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <FileCode className="w-4 h-4 text-purple-500" />
              <span>Paste JSON Directly</span>
            </h2>

            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Mock Test Title (Optional Override)
              </label>
              <input
                type="text"
                placeholder="e.g. GATE AG 2027 Full Length Speed Test 02"
                value={testTitle}
                onChange={(e) => setTestTitle(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Raw JSON Text
              </label>
              <textarea
                rows={10}
                placeholder='Paste JSON containing {"title": "...", "questions": [...]}'
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                className="w-full bg-slate-900 text-slate-100 font-mono text-xs p-3.5 rounded-2xl border border-slate-700 outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              />
            </div>

            <button
              onClick={handleManualSubmit}
              disabled={!jsonInput.trim()}
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Validate & Save Custom Mock</span>
            </button>
          </div>

        </div>
      )}

      {/* SubTab 2: Inventory */}
      {activeSubTab === 'inventory' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-500" />
              <span>Uploaded Mock Papers Inventory</span>
            </h2>
            <span className="text-xs font-bold text-slate-400 font-mono">
              {customMockPapers.length} Paper(s) Loaded
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {customMockPapers.map((paper) => {
              const gaQs = paper.questions.filter(q => q.section === 'General Aptitude').length;
              const agQs = paper.questions.length - gaQs;
              const totalMarks = paper.questions.reduce((sum, q) => sum + (q.marks || 1), 0);

              return (
                <div 
                  key={paper.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-xs hover:border-blue-500/50 transition"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 text-[10px] font-extrabold uppercase">
                          Custom Mock
                        </span>
                        {paper.id === 'GATE_2027_MOCK_01' && (
                          <span className="px-2.5 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 text-[10px] font-extrabold uppercase">
                            Pre-Loaded GATE 2027
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                        {paper.title}
                      </h3>
                    </div>

                    <button
                      onClick={() => onDeleteMock(paper.id)}
                      disabled={paper.id === 'GATE_2027_MOCK_01'}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 disabled:opacity-30 transition"
                      title={paper.id === 'GATE_2027_MOCK_01' ? "Pre-loaded paper cannot be deleted" : "Delete custom paper"}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-center text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Questions</div>
                      <div className="font-bold text-slate-900 dark:text-white font-mono">{paper.questions.length} Qs</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Max Marks</div>
                      <div className="font-bold text-blue-600 dark:text-blue-400 font-mono">{totalMarks} Marks</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                      <div className="text-[10px] text-slate-400 font-bold uppercase">Duration</div>
                      <div className="font-bold text-purple-600 dark:text-purple-400 font-mono">{paper.instructions?.duration_mins || 180}m</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-2">
                    <div className="text-[11px] text-slate-400 font-medium">
                      GA: <span className="font-bold text-slate-700 dark:text-slate-300">{gaQs}</span> • Tech: <span className="font-bold text-slate-700 dark:text-slate-300">{agQs}</span>
                    </div>

                    <button
                      onClick={() => onStartMock(paper)}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition flex items-center gap-2 shadow-xs"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Practice in CBT Mode</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SubTab 3: Template */}
      {activeSubTab === 'template' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <FileCode className="w-4 h-4 text-emerald-500" />
                <span>Reference JSON Schema & Template</span>
              </h2>
              <p className="text-xs text-slate-500">
                Copy or download this standard schema to create compatible custom mock test files.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyTemplate}
                className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-200 transition flex items-center gap-1.5"
              >
                {copiedTemplate ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedTemplate ? 'Copied!' : 'Copy JSON'}</span>
              </button>

              <button
                onClick={handleDownloadTemplate}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Template JSON</span>
              </button>
            </div>
          </div>

          <pre className="bg-slate-950 text-emerald-400 font-mono text-xs p-4 rounded-2xl overflow-x-auto border border-slate-800 max-h-96">
            {JSON.stringify(SAMPLE_TEMPLATE, null, 2)}
          </pre>
        </div>
      )}

    </div>
  );
}
