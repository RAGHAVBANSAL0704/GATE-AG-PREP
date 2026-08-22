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
  Package
} from 'lucide-react';

export default function DownloadsHub({ customMockPapers = [], onStartMock, onDeleteMock }) {
  const [vaultTab, setVaultTab] = useState('official'); // 'official' | 'custom'
  const [searchTerm, setSearchTerm] = useState('');
  const [eraFilter, setEraFilter] = useState('all'); // 'all' | 'recent' | 'classic'

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
    { year: '2014', paperPdf: '/downloads/question_papers/AG2014.pdf', keyPdf: null, solvedDocx: null },
    { year: '2013', paperPdf: '/downloads/question_papers/AG2013.pdf', keyPdf: null, solvedDocx: null },
    { year: '2012', paperPdf: '/downloads/question_papers/AG2012.pdf', keyPdf: null, solvedDocx: '/downloads/solved_docx/2012-FULL-SOLVED.docx' },
    { year: '2011', paperPdf: '/downloads/question_papers/AG2011.pdf', keyPdf: null, solvedDocx: '/downloads/solved_docx/2011-FULL-SOLVED.docx' },
    { year: '2010', paperPdf: '/downloads/question_papers/AG2010.pdf', keyPdf: null, solvedDocx: null },
    { year: '2009', paperPdf: '/downloads/question_papers/AG2009.pdf', keyPdf: null, solvedDocx: null },
    { year: '2008', paperPdf: '/downloads/question_papers/AG2008.pdf', keyPdf: null, solvedDocx: null },
    { year: '2007', paperPdf: '/downloads/question_papers/AG2007.pdf', keyPdf: null, solvedDocx: null },
  ];

  const filteredYears = yearsData.filter(item => {
    const yNum = parseInt(item.year);
    if (searchTerm && !item.year.includes(searchTerm)) return false;
    if (eraFilter === 'recent' && yNum < 2016) return false;
    if (eraFilter === 'classic' && yNum > 2015) return false;
    return true;
  });

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
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Download official GATE AG question PDFs, answer keys & solved papers (2007–2026).
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 shrink-0">
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

        {/* Filter Toolbar for Official Papers */}
        {vaultTab === 'official' && (
          <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-3 mt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="relative flex-1 w-full">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search year (e.g. 2026, 2024)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-900 dark:text-slate-100 outline-none focus:ring-1 focus:ring-blue-500 font-medium"
              />
            </div>

            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-bold w-full sm:w-auto">
              <button
                onClick={() => setEraFilter('all')}
                className={`px-3 py-1 rounded-md transition ${
                  eraFilter === 'all'
                    ? 'bg-blue-600 text-white shadow-xs font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setEraFilter('recent')}
                className={`px-3 py-1 rounded-md transition ${
                  eraFilter === 'recent'
                    ? 'bg-blue-600 text-white shadow-xs font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                2016–2026
              </button>
              <button
                onClick={() => setEraFilter('classic')}
                className={`px-3 py-1 rounded-md transition ${
                  eraFilter === 'classic'
                    ? 'bg-blue-600 text-white shadow-xs font-bold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                2007–2015
              </button>
            </div>
          </div>
        )}
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

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Custom Uploaded Mocks Vault Grid */
        <div className="space-y-3">
          {customMockPapers.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 text-center text-slate-400 text-xs">
              No custom uploaded papers found.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {customMockPapers.map((paper) => (
                <div
                  key={paper.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-3 shadow-xs hover:border-purple-500 transition"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-600 text-white">
                        {paper.year}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {paper.questions?.length} Qs • {paper.instructions?.duration_mins || 180}m
                      </span>
                    </div>

                    <h3 className="text-xs font-extrabold text-slate-900 dark:text-white leading-snug">
                      {paper.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => onStartMock && onStartMock(paper.year)}
                      className="flex-1 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition flex items-center justify-center gap-1 shadow-xs"
                    >
                      <Play className="w-3 h-3 fill-white" />
                      <span>Start CBT</span>
                    </button>

                    {onDeleteMock && (
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

    </div>
  );
}
