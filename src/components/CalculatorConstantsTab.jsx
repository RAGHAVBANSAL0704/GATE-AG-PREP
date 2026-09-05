import React, { useState } from 'react';
import { Search, CornerDownLeft, BookOpen, Layers } from 'lucide-react';
import { AG_CONSTANTS_CATEGORIES, QUICK_UNIT_CONVERTERS } from '../data/agConstants.js';
import MathRenderer from './MathRenderer';

export default function CalculatorConstantsTab({ onInsertValue }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const allConstants = AG_CONSTANTS_CATEGORIES.flatMap(cat => 
    cat.constants.map(c => ({ ...c, categoryName: cat.name, categoryId: cat.id }))
  );

  const filteredConstants = allConstants.filter(c => {
    const matchesCat = selectedCategory === 'all' || c.categoryId === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCat;
    const matchesQuery = 
      c.name.toLowerCase().includes(query) ||
      c.symbol.toLowerCase().includes(query) ||
      (c.note && c.note.toLowerCase().includes(query)) ||
      (c.unit && c.unit.toLowerCase().includes(query));
    return matchesCat && matchesQuery;
  });

  return (
    <div className="flex flex-col h-full space-y-2.5 p-2.5 sm:p-3 overflow-y-auto max-h-[62vh]">
      {/* Search & Filter Bar */}
      <div className="relative">
        <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search constants (e.g. g, viscosity, hp, Stefan)..."
          className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Quick Unit Converters Strip */}
      <div className="space-y-1">
        <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          Quick Unit Multipliers (Click to Insert):
        </span>
        <div className="flex flex-wrap gap-1.5">
          {QUICK_UNIT_CONVERTERS.map((uc) => (
            <button
              key={uc.id}
              onClick={() => onInsertValue(uc.factor)}
              className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/70 hover:bg-indigo-100 dark:hover:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 transition cursor-pointer shadow-2xs"
              title={`Insert factor ${uc.factor}`}
            >
              {uc.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-1 pt-1">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          All ({allConstants.length})
        </button>
        {AG_CONSTANTS_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {cat.name.split(' ')[0]}
          </button>
        ))}
      </div>

      {/* Constants Cards List */}
      <div className="space-y-1.5 pt-1">
        {filteredConstants.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-500 dark:text-slate-400">
            No matching engineering constants found.
          </div>
        ) : (
          filteredConstants.map((c) => (
            <div
              key={c.id}
              className="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-2xs flex items-center justify-between gap-3 hover:border-blue-400/60 dark:hover:border-blue-500/40 transition"
            >
              <div className="space-y-0.5 min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-slate-900 dark:text-white truncate">
                    {c.name}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-600 dark:text-slate-300 font-mono">
                  <span className="font-extrabold text-blue-600 dark:text-blue-400">
                    <MathRenderer math={c.symbol} />
                  </span>
                  <span>=</span>
                  <span className="font-bold text-slate-900 dark:text-white font-mono">
                    {c.displayValue} {c.unit}
                  </span>
                  {c.approx && (
                    <span className="text-[10px] text-slate-400 font-sans">
                      ({c.approx})
                    </span>
                  )}
                </div>
                {c.note && (
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                    {c.note}
                  </p>
                )}
              </div>

              <button
                onClick={() => onInsertValue(c.value)}
                className="shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/80 dark:hover:bg-blue-900 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-[11px] font-bold transition cursor-pointer shadow-2xs"
                title={`Insert ${c.value} into calculator`}
              >
                <CornerDownLeft className="w-3 h-3" />
                <span>Insert</span>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
