import React, { useState } from 'react';
import { 
  Download, 
  FileText, 
  Key, 
  FileCode, 
  Search, 
  Sparkles, 
  Play, 
  Trash2, 
  Package, 
  Eye, 
  Archive, 
  X, 
  Loader2, 
  BookOpen, 
  CheckCircle2, 
  Check, 
  FileDown, 
  ShieldCheck, 
  Scale,
  ExternalLink,
  Building2,
  Globe,
  Info,
  Printer
} from 'lucide-react';
import MathRenderer from './MathRenderer';
import CustomPdfQuestionGenerator from './CustomPdfQuestionGenerator';
import PdfExportOptionsModal from './PdfExportOptionsModal';
import { exportPaperToPdf } from '../services/questionPdfExportService';
import { 
  OFFICIAL_GATE_PAPERS_META, 
  CENTRAL_GATE_PORTALS, 
  getOfficialGatePaperMeta 
} from '../data/officialGatePapersMeta';

export default function DownloadsHub({ questions = [], mockPapers = [], customMockPapers = [], onStartMock, onDeleteMock }) {
  const [vaultTab, setVaultTab] = useState('generator'); // 'generator' | 'official' | 'custom'
  const [searchTerm, setSearchTerm] = useState('');
  const [eraFilter, setEraFilter] = useState('all'); // 'all' | 'recent' | 'classic'
  const [previewPaper, setPreviewPaper] = useState(null);
  const [previewSearch, setPreviewSearch] = useState('');
  const [pdfModalPaper, setPdfModalPaper] = useState(null);

  const yearsData = OFFICIAL_GATE_PAPERS_META;

  const filteredYears = yearsData.filter(item => {
    const yNum = parseInt(item.year);
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const yearMatch = item.year.includes(term);
      const instituteMatch = (item.institute || '').toLowerCase().includes(term);
      const shortMatch = (item.instituteShort || '').toLowerCase().includes(term);
      if (!yearMatch && !instituteMatch && !shortMatch) return false;
    }
    if (eraFilter === 'recent' && yNum < 2016) return false;
    if (eraFilter === 'classic' && yNum > 2015) return false;
    return true;
  });

  const filteredCustomMocks = customMockPapers.filter(paper => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    const titleMatch = (paper.title || '').toLowerCase().includes(term);
    const idMatch = (paper.id || '').toLowerCase().includes(term);
    return titleMatch || idMatch;
  });

  const getOfficialPaperQuestions = (year) => {
    const yStr = String(year);
    const foundPaper = mockPapers.find(p => String(p.year) === yStr || (p.title && p.title.includes(yStr)));
    if (foundPaper && foundPaper.questions && foundPaper.questions.length > 0) {
      return foundPaper.questions;
    }
    const filtered = questions.filter(q => String(q.year) === yStr || (q.id && q.id.startsWith(`GATE_${yStr}_`)));
    if (filtered.length > 0) return filtered;
    return [];
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Minimalist Top Header & Segment Control */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-xs">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                PYQ Vault &amp; PDF Generator
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                Official organizing IIT/IISc repository links, on-demand clean A4 PDF export &amp; 50 custom full mocks.
              </p>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-950 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-none shrink-0 w-full sm:w-auto">
            <button
              onClick={() => setVaultTab('generator')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 cursor-pointer ${
                vaultTab === 'generator'
                  ? 'bg-emerald-600 text-white shadow-xs font-extrabold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FileDown className="w-4 h-4" />
              <span>Custom PDF Generator</span>
            </button>

            <button
              onClick={() => setVaultTab('official')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 cursor-pointer ${
                vaultTab === 'official'
                  ? 'bg-blue-600 text-white shadow-xs font-extrabold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Official IIT Papers ({filteredYears.length})</span>
            </button>

            <button
              onClick={() => setVaultTab('custom')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 cursor-pointer ${
                vaultTab === 'custom'
                  ? 'bg-purple-600 text-white shadow-xs font-extrabold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Custom Full Mocks ({customMockPapers.length})</span>
            </button>
          </div>
        </div>

        {/* Filter Toolbar for Official Papers / Custom Mocks */}
        {vaultTab !== 'generator' && (
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
            {vaultTab === 'official' ? (
              <>
                <div className="flex items-center gap-2.5 flex-1 min-w-[220px]">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search year or IIT (e.g. 2026, Roorkee, IISc)..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-3.5 py-2 text-xs text-slate-900 dark:text-slate-100 outline-none focus:ring-1 focus:ring-blue-500 font-medium"
                    />
                  </div>

                  <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold shrink-0">
                    <button
                      onClick={() => setEraFilter('all')}
                      className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                        eraFilter === 'all'
                          ? 'bg-blue-600 text-white shadow-xs font-extrabold'
                          : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setEraFilter('recent')}
                      className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                        eraFilter === 'recent'
                          ? 'bg-blue-600 text-white shadow-xs font-extrabold'
                          : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      2016–2026
                    </button>
                    <button
                      onClick={() => setEraFilter('classic')}
                      className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                        eraFilter === 'classic'
                          ? 'bg-blue-600 text-white shadow-xs font-extrabold'
                          : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      2007–2015
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <a
                    href="https://gate.iitkgp.ac.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
                    title="Visit official GATE National Repository at IIT Kharagpur"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>NCB Central Archive</span>
                    <ExternalLink className="w-3 h-3 opacity-80" />
                  </a>

                  <a
                    href="https://gate.nptel.ac.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
                    title="Visit official Ministry of Education / NPTEL GATE Portal"
                  >
                    <Building2 className="w-3.5 h-3.5 text-amber-500" />
                    <span>NPTEL Portal</span>
                    <ExternalLink className="w-3 h-3 opacity-80" />
                  </a>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-between w-full">
                <span className="text-xs text-slate-500 font-medium">
                  Showing all {filteredCustomMocks.length} custom mock papers (Full 65 Qs • 100 Marks). Instant clean PDF export available.
                </span>
                <span className="text-[11px] font-mono text-purple-600 dark:text-purple-400 font-bold bg-purple-50 dark:bg-purple-950/60 px-2.5 py-1 rounded-xl border border-purple-200 dark:border-purple-900">
                  Direct Code-Generated PDFs
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Content Render */}
      {vaultTab === 'generator' && (
        <CustomPdfQuestionGenerator 
          questions={questions} 
          mockPapers={mockPapers} 
          customMockPapers={customMockPapers} 
        />
      )}

      {vaultTab === 'official' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm space-y-0">
          
          {/* Copyright Compliance & Organizing Body Notice Banner */}
          <div className="p-4 bg-blue-50/70 dark:bg-blue-950/30 border-b border-blue-200/80 dark:border-blue-900/60 flex items-start gap-3 text-xs text-slate-700 dark:text-slate-300">
            <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-xs font-extrabold text-slate-900 dark:text-white">
                Official Organizing Institutes &amp; Transformative Educational PDFs
              </p>
              <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
                Official GATE examination papers and keys are published by the respective <strong>Organizing Institutes (IITs &amp; IISc)</strong> on behalf of the National Coordination Board (NCB) – GATE. In adherence to copyright principles, raw question paper files are not hosted directly; verified links to official organizing portals are provided below. For self-study and preparation, click <strong>Solved PDF</strong> or <strong>Practice PDF</strong> to dynamically generate a clean, ink-efficient A4 document containing our verified solutions and derivations.
              </p>
            </div>
          </div>

          {/* Central Repositories Quick Cards */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 grid grid-cols-1 md:grid-cols-2 gap-3">
            {CENTRAL_GATE_PORTALS.map((portal) => (
              <div 
                key={portal.name} 
                className="flex items-center justify-between p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-blue-400 dark:hover:border-blue-600 transition"
              >
                <div className="space-y-1 pr-3">
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span className="font-extrabold text-xs text-slate-900 dark:text-white">{portal.name}</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold">{portal.badge}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">{portal.description}</p>
                </div>
                <a
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center gap-1.5 shrink-0 shadow-2xs cursor-pointer active:scale-95"
                >
                  <span>Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>

          {/* Year-by-Year Organizing Institute Directory Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                  <th className="py-3.5 px-4 w-28">Year</th>
                  <th className="py-3.5 px-4">Organizing Institute</th>
                  <th className="py-3.5 px-4">Official Portal</th>
                  <th className="py-3.5 px-4">Instant PDF Downloads (From Code)</th>
                  <th className="py-3.5 px-4 text-right">Interactive Review</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-900 dark:text-slate-100 font-medium">
                {filteredYears.map((item) => {
                  const qs = getOfficialPaperQuestions(item.year);
                  return (
                    <tr key={item.year} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition">
                      
                      {/* Year */}
                      <td className="py-3.5 px-4 font-mono font-extrabold text-blue-600 dark:text-blue-400 text-sm">
                        GATE {item.year}
                      </td>

                      {/* Organizing Institute */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center font-mono text-[10px] font-black shrink-0">
                            {item.instituteShort}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white text-xs">
                              {item.institute}
                            </div>
                            <span className="text-[10px] text-slate-500 dark:text-slate-400">
                              NCB-GATE Organizing Body
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Official Portal Direct Link */}
                      <td className="py-3.5 px-4">
                        <a
                          href={item.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold transition shadow-2xs group cursor-pointer"
                          title={`Visit official ${item.institute} portal for GATE ${item.year}`}
                        >
                          <Globe className="w-3.5 h-3.5 text-blue-500 group-hover:text-white shrink-0" />
                          <span>Visit {item.instituteShort}</span>
                          <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100 ml-0.5" />
                        </a>
                      </td>

                      {/* Dynamic PDF Export Actions */}
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => {
                            setPdfModalPaper({
                              paper: { year: item.year, title: `GATE ${item.year} Agricultural Engineering Paper` },
                              questions: qs,
                              defaultMode: 'study_guide'
                            });
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-600 hover:text-white dark:bg-purple-950/40 text-purple-900 dark:text-purple-300 border border-purple-200 dark:border-purple-900 text-xs font-bold transition shadow-2xs group cursor-pointer"
                          title="Export PDF: Choose only questions, only answers, questions then answers, or study guide"
                        >
                          <Printer className="w-3.5 h-3.5 text-purple-500 group-hover:text-white shrink-0" />
                          <span>Export PDF</span>
                        </button>
                      </td>

                      {/* In-App Interactive Review Action */}
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => {
                            setPreviewSearch('');
                            setPreviewPaper({
                              title: `GATE ${item.year} (${item.institute}) Derivations & Solutions`,
                              year: item.year,
                              isOfficial: true,
                              institute: item.institute,
                              instituteShort: item.instituteShort,
                              officialUrl: item.officialUrl,
                              questions: qs,
                              summaryText: `Official GATE ${item.year} Agricultural Engineering Paper organized by ${item.institute}. Original PDFs & keys are officially hosted on the organizing institute portal. Step-by-step verified derivations and calculations are provided here for interactive self-study.`
                            });
                          }}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-purple-600 hover:text-white transition font-bold text-xs inline-flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 shadow-2xs cursor-pointer"
                          title="Preview Paper Questions & Step-by-Step Derivations"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Review</span>
                        </button>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {vaultTab === 'custom' && (
        /* Custom Uploaded Mocks Download Vault Grid */
        <div className="space-y-4">
          {filteredCustomMocks.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 text-center text-slate-400 text-xs">
              {searchTerm ? `No custom mock papers matching "${searchTerm}".` : 'No custom mock papers found.'}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCustomMocks.map((paper, idx) => (
                <div
                  key={paper.id || idx}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 flex flex-col justify-between space-y-4 shadow-sm hover:border-purple-500 transition group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                          <Sparkles className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-600 text-white">
                          {paper.year || '2027'}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-slate-400">
                        {paper.questions?.length || 65} Qs • 100 M
                      </span>
                    </div>

                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white leading-snug">
                      {paper.title}
                    </h3>
                  </div>

                  <div className="flex flex-col gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setPdfModalPaper({
                            paper,
                            questions: paper.questions || [],
                            defaultMode: 'study_guide'
                          });
                        }}
                        className="flex-1 py-2 px-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-600 hover:text-white text-purple-900 dark:text-purple-300 border border-purple-200 dark:border-purple-900 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                        title="Export Mock Paper: Choose Exam Mode, Solutions Only, Questions then Answers, or Study Guide"
                      >
                        <Printer className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                        <span>Export PDF</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setPreviewSearch('');
                          setPreviewPaper({
                            title: paper.title,
                            year: paper.year || '2027',
                            isOfficial: false,
                            questions: paper.questions || [],
                            summaryText: `Custom Full-Length Mock Paper containing ${paper.questions?.length || 65} questions with detailed step-by-step solutions.`
                          });
                        }}
                        className="flex-1 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-purple-600 hover:text-white transition font-bold text-xs inline-flex items-center justify-center gap-1.5 border border-slate-200 dark:border-slate-700 cursor-pointer"
                        title="Preview Mock Paper Questions & Solutions in-app"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Interactive Preview</span>
                      </button>

                      {onDeleteMock && !paper.id?.startsWith('GATE_2027_MOCK_') && (
                        <button
                          onClick={() => onDeleteMock(paper.id)}
                          className="p-1.5 rounded-xl text-rose-500 hover:bg-rose-500/10 border border-rose-200 dark:border-rose-950 transition cursor-pointer"
                          title="Delete Custom Paper"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* In-App Reader Preview Modal */}
      {previewPaper && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 no-print font-sans">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-150">
            
            {/* Modal Title Bar */}
            <div className="bg-slate-50 dark:bg-slate-800/90 px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-700 shrink-0">
              <div className="flex items-center gap-2.5">
                <Eye className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {previewPaper.title}
                  </h3>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                    {previewPaper.questions?.length || 0} Questions • Full Solved Step-by-Step Derivations
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {previewPaper.isOfficial ? (
                  <a
                    href={previewPaper.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-xs cursor-pointer"
                    title={`Visit official ${previewPaper.institute} portal`}
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Official {previewPaper.instituteShort || previewPaper.institute} Portal</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                ) : null}

                <button
                  onClick={() => {
                    setPdfModalPaper({
                      paper: previewPaper,
                      questions: previewPaper.questions || [],
                      defaultMode: 'study_guide'
                    });
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition shadow-xs cursor-pointer"
                  title="Choose PDF format: Only Questions, Only Answers, Questions then Answers, or Study Guide"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Export PDF</span>
                </button>

                <button
                  onClick={() => setPreviewPaper(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white transition hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
              
              {/* Summary and Search Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900">
                <div className="space-y-0.5 text-xs flex-1">
                  <span className="font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider text-[10px]">
                    Document In-App Reader &amp; Solutions
                  </span>
                  <p className="text-slate-700 dark:text-slate-300 font-medium">
                    {previewPaper.summaryText}
                  </p>
                  {previewPaper.isOfficial && (
                    <p className="text-[11px] text-blue-600 dark:text-blue-400 pt-1 font-semibold flex items-center gap-1">
                      <Info className="w-3.5 h-3.5 shrink-0" />
                      <span>Original papers are hosted on the organizing institute's website. Direct downloads are generated from code for copyright compliance.</span>
                    </p>
                  )}
                </div>

                {previewPaper.questions && previewPaper.questions.length > 0 && (
                  <div className="relative w-full sm:w-64 shrink-0">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search question / topic..."
                      value={previewSearch}
                      onChange={(e) => setPreviewSearch(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 outline-none focus:ring-1 focus:ring-purple-500 font-medium"
                    />
                  </div>
                )}
              </div>

              {previewPaper.questions && previewPaper.questions.length > 0 ? (
                <div className="space-y-4 pt-1">
                  {(() => {
                    const filtered = previewPaper.questions.filter(q => {
                      if (!previewSearch) return true;
                      const s = previewSearch.toLowerCase();
                      return (
                        (q.question && q.question.toLowerCase().includes(s)) ||
                        (q.section && q.section.toLowerCase().includes(s)) ||
                        (q.topic && q.topic.toLowerCase().includes(s)) ||
                        (q.solution && q.solution.toLowerCase().includes(s))
                      );
                    });

                    if (filtered.length === 0) {
                      return (
                        <div className="p-8 text-center text-slate-400 text-xs bg-slate-50 dark:bg-slate-950 rounded-xl">
                          No questions matching "{previewSearch}".
                        </div>
                      );
                    }

                    return filtered.map((q, idx) => (
                      <div key={q.id || idx} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3.5 text-xs shadow-xs">
                        
                        {/* Question Badge & Metadata */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-xs text-blue-600 dark:text-blue-400 font-mono px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900">
                              Q.{q.qnum || idx + 1}
                            </span>
                            <span className="font-semibold text-slate-700 dark:text-slate-300">
                              {q.section} {q.topic ? `• ${q.topic}` : ''}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-500">
                            <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-bold">{q.type || 'MCQ'}</span>
                            <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-bold">{q.marks || 1} Mark{(q.marks || 1) > 1 ? 's' : ''}</span>
                          </div>
                        </div>

                        {/* Question Content */}
                        <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-relaxed overflow-x-auto">
                          <MathRenderer content={q.question} inline={false} />
                        </div>

                        {/* Options if MCQ / MSQ */}
                        {q.options && Object.keys(q.options).length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                            {Object.entries(q.options).map(([key, val]) => {
                              const isCorrect = (q.correct_answer || '').toUpperCase().includes(key.toUpperCase());
                              return (
                                <div
                                  key={key}
                                  className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 transition ${
                                    isCorrect
                                      ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-100 font-semibold'
                                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200'
                                  }`}
                                >
                                  <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 ${
                                    isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                                  }`}>
                                    {key}
                                  </span>
                                  <div className="pt-0.5 flex-1 overflow-x-auto">
                                    <MathRenderer content={val} inline={true} />
                                  </div>
                                  {isCorrect && <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />}
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* Correct Answer Key & Step-by-Step Solution Breakdown */}
                        <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 space-y-2 text-xs">
                          <div className="flex items-center justify-between font-bold text-emerald-800 dark:text-emerald-300">
                            <span className="flex items-center gap-1.5 font-extrabold uppercase tracking-wider text-[11px]">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                              <span>Official Step-by-Step Derivation</span>
                            </span>
                            <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200">
                              Correct Key: {q.correct_answer || 'Verified'}
                            </span>
                          </div>

                          <div className="text-slate-800 dark:text-slate-200 leading-relaxed overflow-x-auto pt-1">
                            <MathRenderer 
                              content={q.solution || q.solutionText || q.explanation || 'Detailed mathematical derivation and calculation steps verified.'} 
                              inline={false}
                            />
                          </div>
                        </div>

                      </div>
                    ));
                  })()}
                </div>
              ) : (
                <div className="p-8 text-center text-slate-400 text-xs bg-slate-50 dark:bg-slate-950 rounded-xl space-y-2">
                  <p className="font-semibold text-slate-700 dark:text-slate-300">
                    Question derivations for this paper are loading.
                  </p>
                  <p>
                    Please visit the official organizing institute portal linked above for the original paper.
                  </p>
                </div>
              )}

            </div>

          </div>
        </div>
      )}

      {/* PDF Export Options Modal */}
      {pdfModalPaper && (
        <PdfExportOptionsModal
          isOpen={Boolean(pdfModalPaper)}
          onClose={() => setPdfModalPaper(null)}
          paper={pdfModalPaper.paper}
          questions={pdfModalPaper.questions}
          defaultMode={pdfModalPaper.defaultMode}
        />
      )}

    </div>
  );
}
