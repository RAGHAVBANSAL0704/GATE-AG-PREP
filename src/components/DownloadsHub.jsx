import React, { useState } from 'react';
import { 
  Download, 
  FileText, 
  Key, 
  FileCode, 
  Search, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Layers,
  Info,
  Play,
  Trash2,
  Upload
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
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Banner */}
      <div className="card-3d rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold">
              <Download className="w-3.5 h-3.5" />
              <span>GATE AG Document & Custom Mock Vault</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Question Papers, Answer Keys & Custom Mock Vault
            </h1>
            <p className="text-xs text-slate-500 max-w-2xl">
              Access official PDFs of GATE AG question papers (2007–2026) and practice full custom uploaded mock tests in CBT mode.
            </p>
          </div>
        </div>

        {/* Top Vault Section Tab Switcher */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setVaultTab('official')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              vaultTab === 'official'
                ? 'bg-blue-600 text-white shadow-2xs font-extrabold'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Official GATE AG Papers (2007–2026)</span>
          </button>

          <button
            onClick={() => setVaultTab('custom')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              vaultTab === 'custom'
                ? 'bg-purple-600 text-white shadow-2xs font-extrabold'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Custom Uploaded Mocks Vault ({customMockPapers.length})</span>
          </button>
        </div>

        {/* Filter Controls (for Official Papers) */}
        {vaultTab === 'official' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search year (e.g. 2026, 2024, 2016)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>

            <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold">
              <button
                onClick={() => setEraFilter('all')}
                className={`flex-1 py-1.5 rounded-lg transition ${
                  eraFilter === 'all'
                    ? 'bg-blue-600 text-white shadow-2xs font-extrabold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                All 20 Years
              </button>
              <button
                onClick={() => setEraFilter('recent')}
                className={`flex-1 py-1.5 rounded-lg transition ${
                  eraFilter === 'recent'
                    ? 'bg-blue-600 text-white shadow-2xs font-extrabold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Recent (2016–2026)
              </button>
              <button
                onClick={() => setEraFilter('classic')}
                className={`flex-1 py-1.5 rounded-lg transition ${
                  eraFilter === 'classic'
                    ? 'bg-blue-600 text-white shadow-2xs font-extrabold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Classic (2007–2015)
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Table */}
      {vaultTab === 'official' ? (
        <div className="card-3d rounded-2xl overflow-hidden shadow-md">
          <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <h2 className="font-extrabold text-sm flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              <span>PYQ Document Vault (2007–2026 Table)</span>
            </h2>
            <span className="text-xs font-mono text-slate-400">{filteredYears.length} Years Listed</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 uppercase font-extrabold text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-700">
                  <th className="py-3.5 px-6 w-32">Year</th>
                  <th className="py-3.5 px-6">Official Question Paper (PDF)</th>
                  <th className="py-3.5 px-6">Official Answer Key (PDF)</th>
                  <th className="py-3.5 px-6">Full Solved Paper (DOCX)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-900 dark:text-slate-100 font-medium">
                {filteredYears.map((item) => (
                  <tr key={item.year} className="hover:bg-blue-50/40 dark:hover:bg-slate-800/40 transition">
                    {/* Year */}
                    <td className="py-4 px-6 font-extrabold text-sm">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-mono">
                        GATE {item.year}
                      </span>
                    </td>

                    {/* Question Paper PDF */}
                    <td className="py-4 px-6">
                      {item.paperPdf ? (
                        <a
                          href={item.paperPdf}
                          download={`GATE_AG_${item.year}_Question_Paper.pdf`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-bold transition shadow-2xs"
                        >
                          <FileText className="w-4 h-4 text-blue-500 group-hover:text-white shrink-0" />
                          <span>AG{item.year}.pdf</span>
                          <Download className="w-3.5 h-3.5 opacity-70" />
                        </a>
                      ) : (
                        <span className="text-slate-400 italic text-[11px]">Coming Soon</span>
                      )}
                    </td>

                    {/* Answer Key PDF */}
                    <td className="py-4 px-6">
                      {item.keyPdf ? (
                        <a
                          href={item.keyPdf}
                          download={`GATE_AG_${item.year}_Answer_Key.pdf`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 dark:hover:text-white text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 font-bold transition shadow-2xs"
                        >
                          <Key className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>Answer Key</span>
                          <Download className="w-3.5 h-3.5 opacity-70" />
                        </a>
                      ) : (
                        <span className="text-slate-400 italic text-[11px]">Will be uploaded</span>
                      )}
                    </td>

                    {/* Solved DOCX */}
                    <td className="py-4 px-6">
                      {item.solvedDocx ? (
                        <a
                          href={item.solvedDocx}
                          download={`${item.year}-FULL-SOLVED.docx`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-600 hover:text-white dark:hover:bg-amber-600 text-amber-900 dark:text-amber-200 border border-amber-200 dark:border-amber-900 font-bold transition shadow-2xs"
                        >
                          <FileCode className="w-4 h-4 text-amber-600 shrink-0" />
                          <span>{item.year}-FULL-SOLVED.docx</span>
                          <Download className="w-3.5 h-3.5 opacity-70" />
                        </a>
                      ) : (
                        <span className="text-slate-400 italic text-[11px]">Will be added</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Custom Uploaded Mocks Vault Table */
        <div className="card-3d rounded-2xl overflow-hidden shadow-md space-y-4">
          <div className="px-6 py-4 bg-purple-950 text-white flex items-center justify-between border-b border-purple-900">
            <h2 className="font-extrabold text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Custom Uploaded Mock Test Repository</span>
            </h2>
            <span className="text-xs font-mono text-purple-300">{customMockPapers.length} Custom Mock(s)</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 uppercase font-extrabold text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-700">
                  <th className="py-3.5 px-6">Mock Test Title</th>
                  <th className="py-3.5 px-6">Question Count</th>
                  <th className="py-3.5 px-6">Total Marks</th>
                  <th className="py-3.5 px-6">Original DOCX File</th>
                  <th className="py-3.5 px-6 text-right">CBT Exam Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-900 dark:text-slate-100 font-medium">
                {customMockPapers.map((paper) => {
                  const totalMarks = paper.questions.reduce((sum, q) => sum + (q.marks || 1), 0);
                  
                  let docxUrl = null;
                  if (paper.id === 'GATE_2027_MOCK_01') docxUrl = '/downloads/mock_tests/GATE_2027_AG_Mock_Test_01.docx';
                  else if (paper.id === 'GATE_2027_MOCK_02') docxUrl = '/downloads/mock_tests/GATE_2027_AG_Mock_Test_02.docx';
                  else if (paper.id === 'GATE_2027_MOCK_03') docxUrl = '/downloads/mock_tests/GATE_2027_AG_Mock_Test_03.docx';

                  return (
                    <tr key={paper.id} className="hover:bg-purple-50/40 dark:hover:bg-purple-950/20 transition">
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                              {paper.title}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                              GATE 2027 Mock
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">ID: {paper.id}</div>
                        </div>
                      </td>

                      <td className="py-4 px-6 font-mono font-bold text-slate-700 dark:text-slate-300">
                        {paper.questions.length} Questions
                      </td>

                      <td className="py-4 px-6 font-mono font-bold text-blue-600 dark:text-blue-400">
                        {totalMarks} Marks
                      </td>

                      <td className="py-4 px-6">
                        {docxUrl ? (
                          <a
                            href={docxUrl}
                            download
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 font-extrabold hover:bg-blue-600 hover:text-white transition shadow-2xs"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download DOCX</span>
                          </a>
                        ) : (
                          <span className="text-slate-400 font-mono text-[11px]">N/A</span>
                        )}
                      </td>

                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => onStartMock(paper)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition shadow-xs"
                        >
                          <Play className="w-3.5 h-3.5 fill-white" />
                          <span>Practice CBT Mode</span>
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

    </div>
  );
}
