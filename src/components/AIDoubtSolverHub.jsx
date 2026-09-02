import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Sparkles, 
  Send, 
  BookOpen, 
  Key, 
  Loader2, 
  Lightbulb, 
  CheckCircle2, 
  HelpCircle, 
  Copy, 
  Check, 
  Trash2,
  Cpu,
  Calculator,
  User,
  Bot,
  Layers,
  ArrowRight,
  RefreshCw,
  Search,
  Image as ImageIcon,
  X,
  Upload,
  Bookmark,
  Zap,
  ShieldAlert,
  GraduationCap,
  FileText,
  Clock,
  Printer,
  ChevronDown
} from 'lucide-react';
import MathRenderer from './MathRenderer';
import { solveGeneralDoubt, getStoredApiKey, setStoredApiKey, hasApiKey } from '../services/geminiService';

const SOLVER_MODES = [
  {
    id: 'rigorous',
    name: 'Step-by-Step Rigorous Derivation',
    shortName: 'Rigorous Solver',
    icon: Sparkles,
    badge: 'Standard NAT & MCQ',
    color: 'bg-indigo-600 text-white',
    desc: 'Given data, SI unit conversions, mathematical proof, intermediate values & final answer.'
  },
  {
    id: 'formula_shortcut',
    name: 'Formula & Shortcut Sheet',
    shortName: 'Formula & Shortcuts',
    icon: Zap,
    badge: 'Rapid Revision',
    color: 'bg-amber-600 text-white',
    desc: 'Core equations, exact SI variable units, and 14-year GATE AG exam tricks.'
  },
  {
    id: 'mistake_checker',
    name: 'Where Did I Go Wrong? (Diagnostic)',
    shortName: 'Mistake Checker',
    icon: ShieldAlert,
    badge: 'Forensic Audit',
    color: 'bg-rose-600 text-white',
    desc: 'Paste your wrong answer or steps to pinpoint exact unit slips, sign errors, or traps.'
  },
  {
    id: 'socratic',
    name: 'Socratic Concept Mentor',
    shortName: 'Concept Mentor',
    icon: GraduationCap,
    badge: 'Interactive Clues',
    color: 'bg-emerald-600 text-white',
    desc: 'Guided inquiry & progressive conceptual clues without spoon-feeding the final answer.'
  }
];

const MATH_KEYPAD_GROUPS = [
  {
    title: 'Operations',
    items: [
      { label: 'Fraction', latex: '\\frac{a}{b}' },
      { label: 'Square Root', latex: '\\sqrt{x}' },
      { label: 'Subscript/Power', latex: 'x^{2}_{1}' },
      { label: 'Integral', latex: '\\int_{0}^{T}' },
      { label: 'Natural Log', latex: '\\ln(x)' },
      { label: 'Log10', latex: '\\log_{10}(x)' }
    ]
  },
  {
    title: 'Greek Constants',
    items: [
      { label: 'Efficiency η', latex: '\\eta_{th}' },
      { label: 'Tractive η', latex: '\\eta_{tr}' },
      { label: 'Density ρ', latex: '\\rho' },
      { label: 'Viscosity μ', latex: '\\mu' },
      { label: 'Delta ΔP', latex: '\\Delta P' },
      { label: 'Angle θ', latex: '\\theta' },
      { label: 'Stress σ', latex: '\\sigma' },
      { label: 'Shear τ', latex: '\\tau' }
    ]
  },
  {
    title: 'GATE AG Units',
    items: [
      { label: 'kW', latex: '\\text{ kW}' },
      { label: 'kPa', latex: '\\text{ kPa}' },
      { label: 'm³/s', latex: '\\text{ m}^3/\\text{s}' },
      { label: 't/ha/yr', latex: '\\text{ t/(ha}\\cdot\\text{yr)}' },
      { label: 'kg/cm²', latex: '\\text{ kg/cm}^2' },
      { label: 'MJ/(ha·h)', latex: '\\text{ MJ/(ha}\\cdot\\text{h)}' },
      { label: 'rpm', latex: '\\text{ rpm}' },
      { label: 'kJ/kg', latex: '\\text{ kJ/kg}' }
    ]
  }
];

const PRESET_TOPICS = [
  {
    category: 'Farm Machinery',
    title: 'Tractor Drawbar Power & Wheel Slip',
    prompt: 'Explain the mathematical relationship between Tractor Drawbar Power ($P_{db}$), Axle Power ($P_{axle}$), Wheel Slip ($S$), and Tractive Efficiency with standard numerical formulas for GATE AG.'
  },
  {
    category: 'Soil & Water',
    title: 'Darcy\'s Law & Well Hydraulics',
    prompt: 'Derive the Thiem and Dupuit formulas for steady-state radial flow to a well in confined vs unconfined aquifers with assumptions and boundary conditions.'
  },
  {
    category: 'Processing & Food',
    title: 'Psychrometric Drying Balance',
    prompt: 'Explain how to compute heat and mass balance for grain dryers using the Psychrometric chart. Provide formulas for enthalpy, humidity ratio, and moisture removal rate.'
  },
  {
    category: 'Irrigation & Drainage',
    title: 'Manning\'s Open Channel Flow',
    prompt: 'How to calculate the most hydraulically efficient trapezoidal channel section using Manning\'s equation $Q = \\frac{1}{n} A R^{2/3} S^{1/2}$?'
  },
  {
    category: 'Soil Dynamics',
    title: 'Plow Draft & Specific Soil Resistance',
    prompt: 'Explain how specific soil resistance ($C_s$), width of cut ($w$), and depth of cut ($d$) determine total moldboard plow draft $D = C_s \\cdot w \\cdot d$ and power requirement in kW.'
  },
  {
    category: 'Soil Erosion',
    title: 'USLE Equation Calculation',
    prompt: 'Explain the Universal Soil Loss Equation $A = R \\cdot K \\cdot LS \\cdot C \\cdot P$ with definitions and standard units of each factor for GATE AG.'
  }
];

export default function AIDoubtSolverHub({ 
  currentStudent,
  questions = [],
  mockPapers = [],
  onOpenCalc,
  onToggleBookmark,
  onRequireAuth
}) {
  const [solverMode, setSolverMode] = useState('rigorous');
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      text: `### 🚀 Welcome to the Advanced GATE AG AI Academic Suite!

I am your dedicated **Agricultural Engineering Academic Co-Pilot**, equipped with:
* **4 Specialized Solver Modes** (Rigorous Proofs, Formula Sheets, Mistake Forensic Auditor, Socratic Mentor)
* **Visual Math & Unit Keypad** for quick KaTeX symbol insertion
* **Multi-Modal Vision OCR** (paste or upload any question diagram)
* **Instant Link to 20+ Years of GATE AG PYQs (2007–2026)**

Choose your solver mode and ask any numerical problem or doubt below!`
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [bookmarkedId, setBookmarkedId] = useState(null);
  const [apiKey, setApiKey] = useState(getStoredApiKey());
  const [isEditingKey, setIsEditingKey] = useState(false);
  const [hasKey, setHasKey] = useState(hasApiKey());
  
  // Image / Diagram Upload State
  const [imagePreview, setImagePreview] = useState(null);
  const [imageMimeType, setImageMimeType] = useState('image/jpeg');
  const fileInputRef = useRef(null);

  // PYQ Search & Quick Selector State
  const [pyqSearchQuery, setPyqSearchQuery] = useState('');
  const [showPyqPicker, setShowPyqPicker] = useState(false);
  const [showMathKeypad, setShowMathKeypad] = useState(false);

  const messagesContainerRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Global & Textarea Clipboard Image Paste Listener
  useEffect(() => {
    const handlePaste = (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            processImageFile(file);
          }
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, []);

  const processImageFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setImageMimeType(file.type);
    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleClearImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Filtered PYQ Database results
  const filteredPyqResults = useMemo(() => {
    const qTrim = pyqSearchQuery.trim().toLowerCase();
    if (!qTrim || qTrim.length < 2) return [];

    const results = [];
    const pool = questions.length > 0 ? questions : [];

    for (const q of pool) {
      const matchYear = String(q.year || '').includes(qTrim);
      const matchId = String(q.id || '').toLowerCase().includes(qTrim);
      const matchText = String(q.question || '').toLowerCase().includes(qTrim);
      const matchTopic = String(q.topic || '').toLowerCase().includes(qTrim);

      if (matchYear || matchId || matchText || matchTopic) {
        results.push(q);
        if (results.length >= 10) break;
      }
    }
    return results;
  }, [pyqSearchQuery, questions]);

  const handleSelectPyqQuestion = (q) => {
    const statement = `[${q.paperTitle || `GATE ${q.year || 2026}`}] ${q.question}\n\nType: ${q.type || 'MCQ'} | Marks: ${q.marks || 1}M\n${q.options ? Object.entries(q.options).map(([k, v]) => `${k}) ${v}`).join('\n') : ''}\nOfficial Answer Key: ${q.correct_answer || q.answer || 'Not specified'}`;
    setQuery(statement);
    setShowPyqPicker(false);
    setPyqSearchQuery('');
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const insertLatexSnippet = (latex) => {
    setQuery(prev => `${prev} $${latex}$ `);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleSolve = async (promptToUse = null) => {
    if (!currentStudent && onRequireAuth) {
      onRequireAuth("Sign In or Register free to ask questions and generate AI mathematical derivations!");
      return;
    }
    const textToQuery = (promptToUse || query).trim();
    if ((!textToQuery && !imagePreview) || isLoading) return;

    const userMessageId = `user_${Date.now()}`;
    const newUserMessage = {
      id: userMessageId,
      sender: 'user',
      text: textToQuery || 'Solve and analyze the problem in the attached question image.',
      image: imagePreview,
      solverMode: solverMode,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMessage]);
    setQuery('');
    const activeImage = imagePreview;
    const activeMime = imageMimeType;
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setIsLoading(true);

    try {
      let contextualPrompt = textToQuery;
      if (messages.length > 1) {
        const lastFewTurns = messages.slice(-4).map(m => `${m.sender === 'user' ? 'Student' : 'Assistant'}: ${m.text}`).join('\n\n');
        contextualPrompt = `Previous Conversation Context:\n${lastFewTurns}\n\nStudent's New Query:\n${textToQuery}`;
      }

      const res = await solveGeneralDoubt(contextualPrompt, {
        solverMode,
        imageBase64: activeImage,
        imageMimeType: activeMime
      });
      
      const aiMessageId = `ai_${Date.now()}`;
      const newAiMessage = {
        id: aiMessageId,
        sender: 'ai',
        text: res.text || 'Unable to derive solution. Please retry or rephrase your question.',
        isOffline: Boolean(res.isOffline),
        sources: res.sources || [],
        solverMode: res.solverMode || solverMode,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, newAiMessage]);
    } catch (e) {
      setMessages(prev => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          sender: 'ai',
          text: `⚠️ **Error generating response**: ${e.message || 'Please check your connection and API key.'}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveKey = () => {
    setStoredApiKey(apiKey);
    setHasKey(hasApiKey());
    setIsEditingKey(false);
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleBookmarkSolution = (id, text) => {
    if (!currentStudent && onRequireAuth) {
      onRequireAuth("Sign In or Register free to bookmark AI derivations!");
      return;
    }
    if (onToggleBookmark) {
      onToggleBookmark({
        id: `ai_doubt_${Date.now()}`,
        question: text.slice(0, 150) + '...',
        explanation: text,
        section: 'AI Derived Solutions',
        topic: 'Doubt Solver'
      });
    }
    setBookmarkedId(id);
    setTimeout(() => setBookmarkedId(null), 2500);
  };

  const handleClearHistory = () => {
    if (window.confirm("Clear study chat history?")) {
      setMessages([
        {
          id: 'welcome',
          sender: 'ai',
          text: `### 🧹 Workspace Reset!\nAsk any new GATE Agricultural Engineering question or numerical problem below.`
        }
      ]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-5 animate-in fade-in duration-200">
      
      {/* Top Banner & Key / Calculator Actions */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-indigo-500/30 rounded-3xl p-5 sm:p-6 shadow-xl text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 via-indigo-500 to-emerald-400 p-0.5 shadow-lg shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-purple-300">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">
                  GATE AG AI Academic Derivation Suite
                </h2>
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                  Vision + KaTeX
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Multi-mode mathematical solver, 20-year official PYQ indexer, and screenshot OCR assistant.
              </p>
            </div>
          </div>

          {/* Quick Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            {onOpenCalc && (
              <button
                onClick={onOpenCalc}
                className="px-3 py-1.5 rounded-xl text-xs font-bold border border-blue-400/40 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                title="Launch Scientific Calculator"
              >
                <Calculator className="w-3.5 h-3.5 text-blue-400" />
                <span>Scientific Calc</span>
              </button>
            )}

            <button
              onClick={handleClearHistory}
              className="px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition flex items-center gap-1.5 cursor-pointer"
              title="Reset Chat History"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            {isEditingKey ? (
              <div className="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-xl border border-purple-500/30">
                <input
                  type="password"
                  placeholder="Paste Gemini API Key..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="px-2.5 py-1 text-xs bg-transparent text-white border-none focus:outline-none w-40 font-mono"
                />
                <button
                  onClick={handleSaveKey}
                  className="px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-bold cursor-pointer"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditingKey(false)}
                  className="px-2 py-1 text-slate-400 hover:text-slate-200 text-xs cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditingKey(true)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 cursor-pointer ${
                  hasKey
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                    : 'bg-purple-500/10 border-purple-500/30 text-purple-300 hover:bg-purple-500/20'
                }`}
              >
                <Key className="w-3.5 h-3.5" />
                <span>{hasKey ? 'Gemini AI Active' : 'Configure API Key'}</span>
              </button>
            )}
          </div>
        </div>

        {/* 4 Specialized Academic Solver Mode Segmented Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-4 border-t border-indigo-500/20 mt-4">
          {SOLVER_MODES.map((m) => {
            const Icon = m.icon;
            const isSelected = solverMode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setSolverMode(m.id)}
                className={`p-3 rounded-2xl text-left transition border cursor-pointer flex flex-col justify-between space-y-1.5 ${
                  isSelected
                    ? `${m.color} border-transparent shadow-lg transform scale-[1.02]`
                    : 'bg-slate-950/40 border-slate-800/80 text-slate-300 hover:bg-slate-800/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-extrabold text-xs">
                    <Icon className="w-4 h-4" />
                    <span>{m.shortName}</span>
                  </div>
                  <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${isSelected ? 'bg-black/30 text-white' : 'bg-slate-800 text-slate-400'}`}>
                    {m.badge}
                  </span>
                </div>
                <p className={`text-[10px] leading-tight ${isSelected ? 'text-white/90' : 'text-slate-400'}`}>
                  {m.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Official PYQ Database Quick Search & 1-Click Picker */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Instant Official PYQ Loader (2007–2026 Archive)
            </h3>
          </div>

          <div className="relative flex-1 max-w-md">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by year (e.g. 2024), question ID, or topic (draft, USLE)..."
              value={pyqSearchQuery}
              onChange={(e) => setPyqSearchQuery(e.target.value)}
              onFocus={() => setShowPyqPicker(true)}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs font-medium text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Live Search Results Dropdown */}
        {filteredPyqResults.length > 0 && (
          <div className="space-y-1.5 max-h-48 overflow-y-auto p-2 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
            <div className="text-[10px] font-bold text-slate-400 uppercase px-2 py-1 flex items-center justify-between">
              <span>Matching Questions in GATE AG Archive ({filteredPyqResults.length}):</span>
              <span>Click to load into solver</span>
            </div>
            {filteredPyqResults.map((q) => (
              <button
                key={q.id}
                onClick={() => handleSelectPyqQuestion(q)}
                className="w-full p-2 rounded-xl text-left bg-white dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 transition flex items-center justify-between gap-3 group cursor-pointer"
              >
                <div className="space-y-0.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                      {q.paperTitle || `GATE ${q.year || 2026}`} #{q.id}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 truncate">
                      {q.topic || q.section}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 truncate font-mono">
                    {q.question}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 shrink-0" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Visual Engineering Math & Unit Keypad (Collapsible) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setShowMathKeypad(!showMathKeypad)}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white cursor-pointer hover:text-indigo-600 transition"
          >
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Visual Engineering Math & Units Toolbar</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showMathKeypad ? 'rotate-180' : ''}`} />
          </button>

          <span className="text-[10px] text-slate-400">
            Click chip to insert LaTeX into question prompt
          </span>
        </div>

        {showMathKeypad && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 animate-in fade-in">
            {MATH_KEYPAD_GROUPS.map((grp, gIdx) => (
              <div key={gIdx} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  {grp.title}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {grp.items.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => insertLatexSnippet(item.latex)}
                      className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 hover:text-indigo-600 text-xs font-mono font-bold transition shadow-2xs cursor-pointer"
                      title={`Insert ${item.latex}`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Interactive Chat Stream */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xs space-y-5">
        <div ref={messagesContainerRef} className="space-y-4 max-h-[550px] overflow-y-auto pr-1">
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            return (
              <div 
                key={m.id} 
                className={`flex gap-3 animate-in fade-in duration-150 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
                    <Bot className="w-5 h-5" />
                  </div>
                )}

                <div 
                  className={`max-w-3xl rounded-3xl p-5 sm:p-6 space-y-3 shadow-xs ${
                    isUser
                      ? 'bg-indigo-600 text-white rounded-br-xs'
                      : 'bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 border-b border-black/10 dark:border-white/10 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold">
                        {isUser ? (currentStudent?.name || 'Student') : 'GATE AG Academic Assistant'}
                      </span>
                      {!isUser && m.id !== 'welcome' && (
                        <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                          m.isOffline 
                            ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                            : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                        }`}>
                          {m.isOffline ? 'Offline Knowledge Engine' : 'Live Gemini AI'}
                        </span>
                      )}
                    </div>

                    {!isUser && m.id !== 'welcome' && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleBookmarkSolution(m.id, m.text)}
                          className="text-[10px] text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 flex items-center gap-1 transition cursor-pointer"
                          title="Save to Revision Bank"
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${bookmarkedId === m.id ? 'fill-indigo-600 text-indigo-600' : ''}`} />
                          <span>{bookmarkedId === m.id ? 'Saved!' : 'Save'}</span>
                        </button>

                        <button
                          onClick={() => handleCopy(m.id, m.text)}
                          className="text-[10px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1 transition cursor-pointer"
                          title="Copy Full Derivation"
                        >
                          {copiedId === m.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedId === m.id ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Attached Diagram Thumbnail if user uploaded */}
                  {isUser && m.image && (
                    <div className="p-1 rounded-2xl bg-black/20 max-w-xs">
                      <img src={m.image} alt="Question Diagram" className="rounded-xl max-h-48 object-contain" />
                    </div>
                  )}

                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <MathRenderer text={m.text} className={`text-xs sm:text-sm leading-relaxed ${isUser ? 'text-white' : 'text-slate-800 dark:text-slate-200'}`} />
                  </div>
                </div>

                {isUser && (
                  <div className="w-10 h-10 rounded-2xl bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
                    <User className="w-5 h-5 text-indigo-300" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 justify-start animate-in fade-in">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-1">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl rounded-bl-xs p-5 flex items-center gap-3">
                <Loader2 className="w-4 h-4 animate-spin text-indigo-500" />
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  Deriving comprehensive mathematical solution with GATE AG formulas and unit verification...
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Image Attachment Preview */}
        {imagePreview && (
          <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex items-center justify-between gap-3 animate-in fade-in">
            <div className="flex items-center gap-3">
              <img src={imagePreview} alt="Upload Thumbnail" className="w-12 h-12 object-cover rounded-xl border border-indigo-300 dark:border-indigo-700" />
              <div>
                <span className="text-xs font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Question Screenshot Attached</span>
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Gemini Vision will parse diagrams, tables, and handwritten math.
                </p>
              </div>
            </div>
            <button
              onClick={handleClearImage}
              className="p-1.5 rounded-lg bg-white dark:bg-slate-900 hover:bg-rose-50 hover:text-rose-600 text-slate-400 transition cursor-pointer"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Input Prompt Box with Drag/Drop & Paste */}
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSolve(); }} 
          className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3"
        >
          <div className="relative">
            <textarea
              ref={textareaRef}
              rows={3}
              placeholder="Type your question, paste text, or press Ctrl+V / Cmd+V to paste a screenshot/diagram... (e.g. In a moldboard plow, calculate draft given width 30cm, depth 15cm, unit draft 0.6 kg/cm²...)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSolve();
                }
              }}
              className="w-full p-4 pr-36 text-xs bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition leading-relaxed font-sans resize-none"
            />

            {/* Input Action Buttons */}
            <div className="absolute right-3 bottom-3 flex items-center gap-1.5">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                title="Upload or Attach Question Diagram"
              >
                <Upload className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Image</span>
              </button>

              <button
                type="submit"
                disabled={(!query.trim() && !imagePreview) || isLoading}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-extrabold rounded-xl shadow-md transition flex items-center gap-1.5 disabled:opacity-40 cursor-pointer"
              >
                {isLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                <span>Derive</span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
            <div className="flex items-center gap-1">
              <Calculator className="w-3.5 h-3.5" />
              <span>Full KaTeX LaTeX math support with multi-turn memory.</span>
            </div>
            <span>Press <strong>Enter ↵</strong> to send | <strong>Shift+Enter</strong> for newline</span>
          </div>
        </form>
      </div>

    </div>
  );
}
