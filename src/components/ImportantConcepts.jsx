import React, { useState, useMemo } from 'react';
import { 
  Lightbulb, 
  Search, 
  Download, 
  BookOpen, 
  CheckCircle2, 
  Sparkles, 
  Copy, 
  Check, 
  FileText, 
  Clock,
  ChevronRight,
  Eye,
  Maximize2,
  X,
  Printer,
  Type,
  Sun,
  Moon,
  BookMarked
} from 'lucide-react';
import MathRenderer from './MathRenderer';
import initialConcepts from '../data/concepts.json';

export default function ImportantConcepts() {
  const [concepts] = useState(initialConcepts);
  const [selectedSection, setSelectedSection] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [readerConcept, setReaderConcept] = useState(null); // Concept open in Reader Mode
  const [copiedId, setCopiedId] = useState(null);

  // Reader Mode Customizations
  const [fontSize, setFontSize] = useState('text-sm'); // 'text-xs', 'text-sm', 'text-base', 'text-lg'
  const [readerTheme, setReaderTheme] = useState('paper'); // 'paper', 'dark', 'sepia'

  const sections = [
    'All',
    'Farm Power and Machinery',
    'Soil and Water Conservation Engineering',
    'Agricultural Process Engineering',
    'Engineering Mathematics',
    'General Aptitude'
  ];

  const filteredConcepts = useMemo(() => {
    return concepts.filter(item => {
      if (selectedSection !== 'All') {
        const secLower = (item.section || '').toLowerCase();
        const selLower = selectedSection.toLowerCase();
        if (!secLower.includes(selLower) && !selLower.includes(secLower)) {
          if (selectedSection.includes('Farm') && !secLower.includes('farm')) return false;
          if (selectedSection.includes('Soil') && !secLower.includes('soil')) return false;
          if (selectedSection.includes('Process') && !secLower.includes('process')) return false;
          if (selectedSection.includes('Math') && !secLower.includes('math')) return false;
          if (selectedSection.includes('Aptitude') && !secLower.includes('aptitude')) return false;
        }
      }

      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const matchTitle = (item.title || '').toLowerCase().includes(term);
        const matchTopic = (item.topic || '').toLowerCase().includes(term);
        const matchContent = (item.content || '').toLowerCase().includes(term);
        if (!matchTitle && !matchTopic && !matchContent) return false;
      }

      return true;
    });
  }, [concepts, selectedSection, searchTerm]);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getReaderThemeStyles = () => {
    if (readerTheme === 'dark') {
      return 'bg-slate-950 text-slate-100 border-slate-800';
    } else if (readerTheme === 'sepia') {
      return 'bg-[#fbf0d9] text-[#433422] border-[#e8d7b8]';
    }
    // Default paper theme
    return 'bg-white text-slate-900 border-slate-200 dark:bg-slate-900 dark:text-white dark:border-slate-800';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Header Banner */}
      <div className="card-3d rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800 text-xs font-bold">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>GATE AG Authentic Concepts & DOCX Reader Vault</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Important Topic Concepts & Online DOCX Reader
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
            Read authentic <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-blue-600 dark:text-blue-400 font-mono text-[11px]">.docx</code> concept notes online in distraction-free <strong>Reader Mode</strong> or download original files.
          </p>
        </div>

        {/* Section Filters & Search */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {sections.map(sec => (
              <button
                key={sec}
                onClick={() => setSelectedSection(sec)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  selectedSection === sec
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {sec}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search concept notes by title, topic, or formula..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>
        </div>
      </div>

      {/* Concepts Grid */}
      {filteredConcepts.length === 0 ? (
        <div className="card-3d rounded-2xl p-10 text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center mx-auto border border-amber-200 dark:border-amber-800">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            No Concept Notes Match Your Current Filter
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            Try switching your section filter or clearing your search term above.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredConcepts.map((item) => {
            return (
              <div 
                key={item.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-4 shadow-xs hover:border-blue-400 dark:hover:border-blue-600 transition flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                      {item.section}
                    </span>
                    {item.has_docx ? (
                      <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900 flex items-center gap-1">
                        <FileText className="w-3 h-3 text-emerald-600" />
                        <span>Authentic DOCX Document</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                        {item.importance || 'High'} Importance
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-1">
                      Topic: {item.topic}
                    </p>
                  </div>

                  {/* Formulas Preview Box */}
                  {item.formulas && item.formulas.length > 0 && (
                    <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl space-y-1 font-mono text-xs">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Preview Formula / Key Note:</div>
                      <div className="overflow-x-auto text-slate-900 dark:text-slate-100">
                        <MathRenderer content={item.formulas[0].includes('$') ? item.formulas[0] : `$$${item.formulas[0]}$$`} />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                  {item.docx_url ? (
                    <a
                      href={item.docx_url}
                      download
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs transition border border-slate-200 dark:border-slate-700"
                    >
                      <Download className="w-3.5 h-3.5 text-blue-500" />
                      <span>Download DOCX</span>
                    </a>
                  ) : (
                    <button
                      onClick={() => handleCopy(item.id, item.content)}
                      className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 transition font-bold"
                    >
                      {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === item.id ? 'Copied Note' : 'Copy Note'}</span>
                    </button>
                  )}

                  <button
                    onClick={() => setReaderConcept(item)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs transition shadow-xs ml-auto"
                  >
                    <BookOpen className="w-3.5 h-3.5 fill-white" />
                    <span>Read Online (Reader Mode)</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Online Document Reader Mode Modal */}
      {readerConcept && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          
          <div className={`w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden transition-all ${getReaderThemeStyles()}`}>
            
            {/* Reader Controls Toolbar Header */}
            <div className="px-6 py-4 border-b border-slate-200/40 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0 bg-slate-500/5 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-blue-600 text-white font-bold">
                  <BookMarked className="w-4 h-4" />
                </span>
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-blue-500 flex items-center gap-1">
                    <span>Document Reader Mode</span>
                    {readerConcept.has_docx && <span className="bg-emerald-500 text-white px-1.5 py-0.2 rounded text-[9px]">DOCX</span>}
                  </div>
                  <h2 className="text-sm sm:text-base font-extrabold truncate max-w-xs sm:max-w-md">
                    {readerConcept.title}
                  </h2>
                </div>
              </div>

              {/* Reader Options: Font Size, Theme, Download, Close */}
              <div className="flex items-center gap-2">
                
                {/* Font Size Selector */}
                <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden text-xs font-bold">
                  <button
                    onClick={() => setFontSize('text-xs')}
                    className={`px-2.5 py-1.5 transition ${fontSize === 'text-xs' ? 'bg-blue-600 text-white' : 'hover:bg-slate-200 dark:hover:bg-slate-800'}`}
                    title="Small Font"
                  >
                    A-
                  </button>
                  <button
                    onClick={() => setFontSize('text-sm')}
                    className={`px-2.5 py-1.5 transition ${fontSize === 'text-sm' ? 'bg-blue-600 text-white' : 'hover:bg-slate-200 dark:hover:bg-slate-800'}`}
                    title="Medium Font"
                  >
                    A
                  </button>
                  <button
                    onClick={() => setFontSize('text-base')}
                    className={`px-2.5 py-1.5 transition ${fontSize === 'text-base' ? 'bg-blue-600 text-white' : 'hover:bg-slate-200 dark:hover:bg-slate-800'}`}
                    title="Large Font"
                  >
                    A+
                  </button>
                </div>

                {/* Theme Selector */}
                <div className="flex items-center border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden text-xs font-bold">
                  <button
                    onClick={() => setReaderTheme('paper')}
                    className={`px-2.5 py-1.5 transition ${readerTheme === 'paper' ? 'bg-blue-600 text-white' : 'hover:bg-slate-200 dark:hover:bg-slate-800'}`}
                    title="Clean Paper Theme"
                  >
                    <Sun className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setReaderTheme('sepia')}
                    className={`px-2.5 py-1.5 transition ${readerTheme === 'sepia' ? 'bg-amber-700 text-white' : 'hover:bg-slate-200 dark:hover:bg-slate-800'}`}
                    title="Warm Sepia Eye-Care Theme"
                  >
                    📖
                  </button>
                  <button
                    onClick={() => setReaderTheme('dark')}
                    className={`px-2.5 py-1.5 transition ${readerTheme === 'dark' ? 'bg-blue-600 text-white' : 'hover:bg-slate-200 dark:hover:bg-slate-800'}`}
                    title="OLED Dark Mode"
                  >
                    <Moon className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Download DOCX if available */}
                {readerConcept.docx_url && (
                  <a
                    href={readerConcept.docx_url}
                    download
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold transition shadow-xs"
                    title="Download original .docx file"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">DOCX</span>
                  </a>
                )}

                {/* Close Button */}
                <button
                  onClick={() => setReaderConcept(null)}
                  className="p-2 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition"
                  title="Close Reader Mode"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Document Content Workspace */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-6">
              
              <div className="max-w-3xl mx-auto space-y-6">
                
                {/* Header Information */}
                <div className="space-y-2 border-b border-slate-200/60 dark:border-slate-800 pb-5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3 py-1 rounded-md bg-blue-500/10 text-blue-500 font-extrabold text-xs">
                      {readerConcept.section}
                    </span>
                    <span className="text-xs opacity-70 font-mono">
                      Path: {readerConcept.file_path}
                    </span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {readerConcept.title}
                  </h1>

                  <p className="text-xs opacity-80 font-medium">
                    Topic: {readerConcept.topic} • Importance: {readerConcept.importance}
                  </p>
                </div>

                {/* Main Rendered Document Content with KaTeX */}
                <div className={`leading-relaxed space-y-4 font-sans ${fontSize}`}>
                  <MathRenderer content={readerConcept.content} inline={false} />
                </div>

              </div>

            </div>

            {/* Reader Footer Bar */}
            <div className="px-6 py-3 border-t border-slate-200/40 dark:border-slate-800 flex items-center justify-between text-xs opacity-80 shrink-0 bg-slate-500/5">
              <span>Reading mode active</span>
              <button
                onClick={() => setReaderConcept(null)}
                className="font-extrabold text-blue-500 hover:underline"
              >
                Exit Reader Mode
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
