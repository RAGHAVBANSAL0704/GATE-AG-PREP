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
  BookOpen
} from 'lucide-react';
import MathRenderer from './MathRenderer';
import { downloadBulkZip } from '../utils/zipDownloader';
import { exportFullDataJSON, importFullDataJSON } from '../utils/indexedDB';

export default function DownloadsHub({ customMockPapers = [], onStartMock, onDeleteMock }) {
  const [vaultTab, setVaultTab] = useState('official'); // 'official' | 'custom'
  const [searchTerm, setSearchTerm] = useState('');
  const [eraFilter, setEraFilter] = useState('all'); // 'all' | 'recent' | 'classic'
  const [isZipping, setIsZipping] = useState(false);
  const [previewPaper, setPreviewPaper] = useState(null);

  const yearsData = [
    { year: '2026', paperPdf: '/downloads/question_papers/AG2026.pdf', keyPdf: null, solvedDocx: '/downloads/solved_docx/2026-FULL-SOLVED.docx' },
    { year: '2025', paperPdf: '/downloads/question_papers/AG2025.pdf', keyPdf: '/downloads/answer_keys/AG25KEY.pdf', solvedDocx: '/downloads/solved_docx/2025-FULL-SOLVED.docx' },
    { year: '2024', paperPdf: '/downloads/question_papers/AG2024.pdf', keyPdf: '/downloads/answer_keys/AG24KEY.pdf', solvedDocx: '/downloads/solved_docx/2024-FULL-SOLVED.docx' },
    { year: '2023', paperPdf: '/downloads/question_papers/AG2023.pdf', keyPdf: '/downloads/answer_keys/AG23KEY.pdf', solvedDocx: '/downloads/solved_docx/2023-FULL-SOLVED.docx' },
    { year: '2022', paperPdf: '/downloads/question_papers/AG2022.pdf', keyPdf: '/downloads/answer_keys/AG22KEY.pdf', solvedDocx: '/downloads/solved_docx/2022-FULL-SOLVED.docx' },
    { year: '2021', paperPdf: '/downloads/question_papers/AG2021.pdf', keyPdf: '/downloads/answer_keys/AG21KEY.pdf', solvedDocx: '/downloads/solved_docx/2021-FULL-SOLVED.docx' },
    { year: '2020', paperPdf: '/downloads/question_papers/AG2020.pdf', keyPdf: null, solvedDocx: '/downloads/solved_docx/2020-FULL-SOLVED.docx' },
    { year: '2019', paperPdf: '/downloads/question_papers/AG2019.pdf', keyPdf: null, solvedDocx: '/downloads/solved_docx/2019-FULL-SOLVED.docx' },
    { year: '2018', paperPdf: '/downloads/question_papers/AG2018.pdf', keyPdf: null, solvedDocx: '/downloads/solved_docx/2018-FULL-SOLVED.docx' },
    { year: '2017', paperPdf: '/downloads/question_papers/AG2017.pdf', keyPdf: null, solvedDocx: '/downloads/solved_docx/2017-FULL-SOLVED.docx' },
    { year: '2016', paperPdf: '/downloads/question_papers/AG2016.pdf', keyPdf: null, solvedDocx: '/downloads/solved_docx/2016-FULL-SOLVED.docx' },
    { year: '2015', paperPdf: '/downloads/question_papers/AG2015.pdf', keyPdf: null, solvedDocx: '/downloads/solved_docx/2015-FULL-SOLVED.docx' },
    { year: '2014', paperPdf: '/downloads/question_papers/AG2014.pdf', keyPdf: null, solvedDocx: '/downloads/solved_docx/2014-FULL-SOLVED.docx' },
    { year: '2013', paperPdf: '/downloads/question_papers/AG2013.pdf', keyPdf: null, solvedDocx: '/downloads/solved_docx/2013-FULL-SOLVED.docx' },
    { year: '2012', paperPdf: '/downloads/question_papers/AG2012.pdf', keyPdf: null, solvedDocx: '/downloads/solved_docx/2012-FULL-SOLVED.docx' },
    { year: '2011', paperPdf: '/downloads/question_papers/AG2011.pdf', keyPdf: null, solvedDocx: '/downloads/solved_docx/2011-FULL-SOLVED.docx' },
    { year: '2010', paperPdf: '/downloads/question_papers/AG2010.pdf', keyPdf: null, solvedDocx: '/downloads/solved_docx/2010-FULL-SOLVED.docx' },
    { year: '2009', paperPdf: '/downloads/question_papers/AG2009.pdf', keyPdf: null, solvedDocx: '/downloads/solved_docx/2009-FULL-SOLVED.docx' },
    { year: '2008', paperPdf: '/downloads/question_papers/AG2008.pdf', keyPdf: null, solvedDocx: '/downloads/solved_docx/2008-FULL-SOLVED.docx' },
    { year: '2007', paperPdf: '/downloads/question_papers/AG2007.pdf', keyPdf: null, solvedDocx: '/downloads/solved_docx/2007-FULL-SOLVED.docx' },
  ];

  const filteredYears = yearsData.filter(item => {
    const yNum = parseInt(item.year);
    if (searchTerm && !item.year.includes(searchTerm)) return false;
    if (eraFilter === 'recent' && yNum < 2016) return false;
    if (eraFilter === 'classic' && yNum > 2015) return false;
    return true;
  });

  const getPaperDocxUrl = (paper, idx) => {
    if (paper.docxUrl) return paper.docxUrl;
    if (paper.file_url && paper.file_url.endsWith('.docx')) return paper.file_url;
    const match = (paper.id || paper.title || '').match(/(\d+)/);
    const num = match ? String(parseInt(match[1])).padStart(2, '0') : String(idx + 1).padStart(2, '0');
    return `/downloads/mock_tests/MOCK ${num} GATE AG.docx`;
  };

  // Bulk ZIP Handlers
  const handleDownloadAllSolvedDocx = async () => {
    setIsZipping(true);
    try {
      const filesToZip = yearsData
        .filter(item => item.solvedDocx)
        .map(item => ({
          name: `${item.year}-FULL-SOLVED.docx`,
          url: item.solvedDocx
        }));
      await downloadBulkZip(filesToZip, 'GATE_AG_All_Solved_Papers_2007_2026.zip');
    } catch (err) {
      console.error("Bulk zip failed", err);
      alert("Could not build ZIP file. Try downloading files individually.");
    } finally {
      setIsZipping(false);
    }
  };

  const handleDownloadAllPdfs = async () => {
    setIsZipping(true);
    try {
      const filesToZip = yearsData
        .filter(item => item.paperPdf)
        .map(item => ({
          name: `GATE_AG_${item.year}_Question_Paper.pdf`,
          url: item.paperPdf
        }));
      await downloadBulkZip(filesToZip, 'GATE_AG_Official_Question_Papers_2007_2026.zip');
    } catch (err) {
      console.error("Bulk zip failed", err);
      alert("Could not build ZIP file. Try downloading files individually.");
    } finally {
      setIsZipping(false);
    }
  };

  const handleExportBackup = async () => {
    try {
      const jsonStr = await exportFullDataJSON();
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `GATE_AG_Prep_Backup_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (e) {
      alert("Export failed: " + e.message);
    }
  };

  const handleImportBackup = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      const res = await importFullDataJSON(event.target.result);
      alert(res.message);
      if (res.success) {
        window.location.reload();
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      
      {/* Minimalist Top Header & Segment Control */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>PYQ Vault</span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
              Download official GATE AG papers, answer keys, solved DOCX papers & custom mock DOCX files.
            </p>
          </div>

          {/* Backup & Restore Data Bar */}
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <button
              onClick={handleExportBackup}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-xs"
              title="Export complete test attempts, bookmarks, & syllabus progress to JSON file"
            >
              <Archive className="w-3.5 h-3.5" />
              <span>Export Backup (.json)</span>
            </button>

            <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white transition cursor-pointer shadow-xs">
              <Download className="w-3.5 h-3.5" />
              <span>Restore Backup</span>
              <input type="file" accept=".json" onChange={handleImportBackup} className="hidden" />
            </label>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => setVaultTab('official')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                vaultTab === 'official'
                  ? 'bg-blue-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Official Papers ({filteredYears.length})</span>
            </button>

            <button
              onClick={() => setVaultTab('custom')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                vaultTab === 'custom'
                  ? 'bg-purple-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Custom Mocks ({customMockPapers.length})</span>
            </button>
          </div>
        </div>

        {/* Filter Toolbar for Official Papers & Bulk ZIP Downloads */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 mt-3 border-t border-slate-100 dark:border-slate-800">
          {vaultTab === 'official' ? (
            <>
              <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                <div className="relative flex-1">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search year (e.g. 2026, 2024)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 outline-none focus:ring-1 focus:ring-blue-500 font-medium"
                  />
                </div>

                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-bold shrink-0">
                  <button
                    onClick={() => setEraFilter('all')}
                    className={`px-2.5 py-1 rounded-md transition ${
                      eraFilter === 'all'
                        ? 'bg-blue-600 text-white shadow-xs font-bold'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setEraFilter('recent')}
                    className={`px-2.5 py-1 rounded-md transition ${
                      eraFilter === 'recent'
                        ? 'bg-blue-600 text-white shadow-xs font-bold'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    2016–2026
                  </button>
                  <button
                    onClick={() => setEraFilter('classic')}
                    className={`px-2.5 py-1 rounded-md transition ${
                      eraFilter === 'classic'
                        ? 'bg-blue-600 text-white shadow-xs font-bold'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    2007–2015
                  </button>
                </div>
              </div>

              {/* Category Bulk Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  disabled={isZipping}
                  onClick={handleDownloadAllSolvedDocx}
                  className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                  title="Package and download all solved DOCX papers in one ZIP"
                >
                  {isZipping ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Archive className="w-3.5 h-3.5" />}
                  <span>Download All Solved DOCX (ZIP)</span>
                </button>

                <button
                  disabled={isZipping}
                  onClick={handleDownloadAllPdfs}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                  title="Package and download all official question PDFs in one ZIP"
                >
                  {isZipping ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Archive className="w-3.5 h-3.5" />}
                  <span>Download All Official PDFs (ZIP)</span>
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-between w-full">
              <span className="text-xs text-slate-500 font-medium">
                Showing all {customMockPapers.length} custom mock test papers.
              </span>
              <button
                disabled={isZipping}
                onClick={handleDownloadAllCustomMocksZip}
                className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                title="Package and download all 18 custom mock DOCX papers in one ZIP"
              >
                {isZipping ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Archive className="w-3.5 h-3.5" />}
                <span>Download All 18 Custom Mocks (ZIP)</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Table / Grid */}
      {vaultTab === 'official' ? (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                  <th className="py-3 px-4 w-28">Year</th>
                  <th className="py-3 px-4">Official Question Paper (PDF)</th>
                  <th className="py-3 px-4">Official Answer Key (PDF)</th>
                  <th className="py-3 px-4">Full Solved Paper (DOCX)</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-900 dark:text-slate-100 font-medium">
                {filteredYears.map((item) => (
                  <tr key={item.year} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition">
                    
                    {/* Year */}
                    <td className="py-3 px-4 font-mono font-extrabold text-blue-600 dark:text-blue-400">
                      GATE {item.year}
                    </td>

                    {/* Question Paper PDF */}
                    <td className="py-3 px-4">
                      {item.paperPdf ? (
                        <a
                          href={item.paperPdf}
                          download={`GATE_AG_${item.year}_Question_Paper.pdf`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold transition"
                        >
                          <FileText className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                          <span>AG{item.year}.pdf</span>
                          <Download className="w-3 h-3 opacity-60 ml-0.5" />
                        </a>
                      ) : (
                        <span className="text-slate-400 text-[11px] font-mono">Pending</span>
                      )}
                    </td>

                    {/* Answer Key PDF */}
                    <td className="py-3 px-4">
                      {item.keyPdf ? (
                        <a
                          href={item.keyPdf}
                          download={`GATE_AG_${item.year}_Answer_Key.pdf`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold transition"
                        >
                          <Key className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>Answer Key</span>
                          <Download className="w-3 h-3 opacity-60 ml-0.5" />
                        </a>
                      ) : (
                        <span className="text-slate-400 text-[11px] font-mono">Pending</span>
                      )}
                    </td>

                    {/* Solved DOCX */}
                    <td className="py-3 px-4">
                      {item.solvedDocx ? (
                        <a
                          href={item.solvedDocx}
                          download={`${item.year}-FULL-SOLVED.docx`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-600 hover:text-white text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-900 text-xs font-bold transition"
                        >
                          <FileCode className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span>{item.year}-FULL-SOLVED.docx</span>
                          <Download className="w-3 h-3 opacity-60 ml-0.5" />
                        </a>
                      ) : (
                        <span className="text-slate-400 text-[11px] font-mono">Pending</span>
                      )}
                    </td>

                    {/* Preview Action */}
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setPreviewPaper({
                          title: `GATE ${item.year} Solved Paper`,
                          year: item.year,
                          docxUrl: item.solvedDocx,
                          pdfUrl: item.paperPdf,
                          summaryText: `Official GATE ${item.year} Agricultural Engineering Paper containing full questions, answer keys, and step-by-step solved derivations.`
                        })}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-purple-600 hover:text-white transition font-bold text-xs inline-flex items-center gap-1 border border-slate-200 dark:border-slate-700"
                        title="Preview Paper Summary & Derivations"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Custom Uploaded Mocks Download Vault Grid */
        <div className="space-y-3">
          {customMockPapers.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 text-center text-slate-400 text-xs">
              No custom mock papers found.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {customMockPapers.map((paper, idx) => (
                <div
                  key={paper.id || idx}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-3 shadow-xs hover:border-purple-500 transition"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-600 text-white">
                        {paper.year || '2027'}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {paper.questions?.length || 65} Qs • 100 M
                      </span>
                    </div>

                    <h3 className="text-xs font-extrabold text-slate-900 dark:text-white leading-snug">
                      {paper.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => setPreviewPaper({
                        title: paper.title,
                        year: paper.year || '2027',
                        docxUrl: getPaperDocxUrl(paper, idx),
                        questions: paper.questions || [],
                        summaryText: `Custom Full-Length Mock Paper containing 65 questions (10 GA + 55 AG) with detailed solutions.`
                      })}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-purple-600 hover:text-white transition font-bold text-xs inline-flex items-center gap-1 border border-slate-200 dark:border-slate-700"
                      title="Preview Mock Paper Questions"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </button>

                    <a
                      href={getPaperDocxUrl(paper, idx)}
                      download={`${(paper.title || 'MOCK_PAPER').replace(/\s+/g, '_')}.docx`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-600 hover:text-white text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-900 text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
                      title="Download Original Custom Mock Paper (.docx)"
                    >
                      <FileCode className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>Download (.docx)</span>
                      <Download className="w-3 h-3 opacity-60 ml-0.5" />
                    </a>

                    {onDeleteMock && !paper.id?.startsWith('GATE_2027_MOCK_') && (
                      <button
                        onClick={() => onDeleteMock(paper.id)}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 border border-rose-200 dark:border-rose-950 transition"
                        title="Delete Custom Paper"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* In-App Reader Preview Modal */}
      {previewPaper && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 no-print">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-150">
            
            {/* Modal Title Bar */}
            <div className="bg-slate-50 dark:bg-slate-800/90 px-5 py-3.5 flex items-center justify-between border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2.5">
                <Eye className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  {previewPaper.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {previewPaper.docxUrl && (
                  <a
                    href={previewPaper.docxUrl}
                    download
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Original (.docx)</span>
                  </a>
                )}

                <button
                  onClick={() => setPreviewPaper(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
              <div className="p-4 rounded-xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900 space-y-1 text-xs">
                <span className="font-bold text-purple-700 dark:text-purple-300 uppercase tracking-wider text-[10px]">
                  Document Preview
                </span>
                <p className="text-slate-700 dark:text-slate-300 font-medium">
                  {previewPaper.summaryText}
                </p>
              </div>

              {previewPaper.questions && previewPaper.questions.length > 0 ? (
                <div className="space-y-4 pt-2">
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                    Sample Paper Questions ({previewPaper.questions.length} Total)
                  </h4>

                  {previewPaper.questions.slice(0, 10).map((q, idx) => (
                    <div key={q.id || idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                      <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                        <span>Q{idx + 1} • {q.type || 'MCQ'} ({q.marks || 1} M)</span>
                        <span className="text-blue-600 dark:text-blue-400">{q.section}</span>
                      </div>
                      <div className="font-semibold text-slate-900 dark:text-slate-100 overflow-x-auto">
                        <MathRenderer content={q.question} inline={false} />
                      </div>
                    </div>
                  ))}

                  {previewPaper.questions.length > 10 && (
                    <p className="text-center text-xs text-slate-400 font-medium italic pt-2">
                      + {previewPaper.questions.length - 10} more questions in full document download.
                    </p>
                  )}
                </div>
              ) : (
                <div className="p-8 text-center text-slate-400 text-xs">
                  Download the file above to view complete solved derivations.
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
