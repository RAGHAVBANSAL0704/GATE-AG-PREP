import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Calculator, 
  Sparkles, 
  Filter, 
  Layers, 
  BookOpen,
  LayoutGrid,
  Table,
  CheckCircle2,
  Printer
} from 'lucide-react';
import { GATE_AG_FORMULAS } from '../data/formulas';
import MathRenderer from './MathRenderer';

export default function FormulaSheet({ onOpenCalc }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'table'

  const categories = ['All', ...GATE_AG_FORMULAS.map(f => f.category)];

  const filteredCategories = GATE_AG_FORMULAS.map(cat => {
    if (selectedCat !== 'All' && cat.category !== selectedCat) return null;

    const matchedTopics = cat.topics.map(top => {
      const matchedFormulas = top.formulas.filter(f => 
        f.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.explanation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        top.topicName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (matchedFormulas.length === 0) return null;
      return { ...top, formulas: matchedFormulas };
    }).filter(Boolean);

    if (matchedTopics.length === 0) return null;
    return { ...cat, topics: matchedTopics };
  }).filter(Boolean);

  // Flatten all matching formulas for compact table view
  const allFilteredFormulas = filteredCategories.flatMap(cat => 
    cat.topics.flatMap(top => 
      top.formulas.map(f => ({
        ...f,
        sectionCode: cat.code,
        category: cat.category,
        topicName: top.topicName
      }))
    )
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Search & Filter Bar */}
      <div className="card-3d rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold">
              <FileText className="w-3.5 h-3.5" />
              <span>GATE Agricultural Engineering Formula Cheat Sheet</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              Section & Topic-Wise Formula Reference
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setViewMode('cards')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  viewMode === 'cards'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Detailed Cards View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Detailed Cards</span>
              </button>

              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  viewMode === 'table'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Compact Single-Line Table View"
              >
                <Table className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Compact Table</span>
              </button>
            </div>

            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 text-xs font-bold shadow-xs hover:bg-blue-100 transition no-print"
              title="Print or Save as PDF"
            >
              <Printer className="w-4 h-4" />
              <span>Export PDF / Print</span>
            </button>

            <button
              onClick={onOpenCalc}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-bold shadow-md hover:bg-slate-800 transition"
            >
              <Calculator className="w-4 h-4 text-blue-400 dark:text-blue-600" />
              <span>Scientific Calc</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search formulas, variables, equations, laws..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0">Section:</span>
            <select
              value={selectedCat}
              onChange={(e) => setSelectedCat(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            >
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* VIEW MODE 1: DETAILED 3D CARDS */}
      {viewMode === 'cards' && (
        <div className="space-y-8">
          {filteredCategories.map((cat, idx) => (
            <div key={idx} className="space-y-5">
              
              {/* Section Header Banner */}
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                  <span>{cat.category}</span>
                </h3>
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                  {cat.code}
                </span>
              </div>

              {/* Topics Loop */}
              <div className="space-y-6">
                {cat.topics.map((topic, tIdx) => (
                  <div key={tIdx} className="space-y-3">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{topic.topicName}</span>
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {topic.formulas.map((item, fIdx) => (
                        <div 
                          key={fIdx}
                          className="card-3d rounded-2xl p-5 space-y-3"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                              {item.title}
                            </h5>
                            {item.unit && (
                              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 shrink-0">
                                Unit: {item.unit}
                              </span>
                            )}
                          </div>

                          {/* KaTeX Math Formula Box */}
                          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center text-emerald-400 font-semibold overflow-x-auto shadow-inner min-h-[60px] flex items-center justify-center">
                            <MathRenderer content={`\\[ ${item.formula} \\]`} inline={false} />
                          </div>

                          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                            {item.explanation}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      )}

      {/* VIEW MODE 2: COMPACT QUICK-GRID TABLE */}
      {viewMode === 'table' && (
        <div className="card-3d rounded-2xl overflow-hidden shadow-md">
          <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <h3 className="font-extrabold text-sm flex items-center gap-2">
              <Table className="w-4 h-4 text-blue-400" />
              <span>Compact Single-Line Formula Reference Sheet</span>
            </h3>
            <span className="text-xs font-mono text-slate-400">Total Formulas: {allFilteredFormulas.length}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 uppercase font-extrabold text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-700">
                  <th className="py-3 px-4 w-16">Sec</th>
                  <th className="py-3 px-4 w-48">Topic / Title</th>
                  <th className="py-3 px-6 text-center">Formula Equation</th>
                  <th className="py-3 px-4 min-w-[240px]">Variables & Explanation</th>
                  <th className="py-3 px-3 w-20 text-right">Unit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-900 dark:text-slate-100 font-medium">
                {allFilteredFormulas.map((item, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/50 dark:hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                      {item.sectionCode}
                    </td>
                    <td className="py-3.5 px-4 space-y-0.5">
                      <div className="font-bold text-slate-900 dark:text-white">{item.title}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{item.topicName}</div>
                    </td>
                    <td className="py-3.5 px-6 text-center bg-slate-950 text-emerald-400 font-semibold rounded-lg my-1">
                      <MathRenderer content={`$${item.formula}$`} inline={true} />
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 leading-normal">
                      {item.explanation}
                    </td>
                    <td className="py-3.5 px-3 font-mono font-bold text-slate-500 text-right">
                      {item.unit || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
