import React, { useState } from 'react';
import { Trash2, Copy, Check, CornerDownLeft, Clock } from 'lucide-react';

export default function CalculatorHistoryTape({ historyItems = [], onSelectResult, onClearHistory }) {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (id, text) => {
    try {
      navigator.clipboard.writeText(String(text));
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch (e) {}
  };

  if (!historyItems || historyItems.length === 0) {
    return (
      <div className="p-8 text-center space-y-2 flex flex-col items-center justify-center min-h-[260px]">
        <Clock className="w-8 h-8 text-slate-300 dark:text-slate-600" />
        <p className="text-xs font-bold text-slate-700 dark:text-slate-300">No Calculation History Yet</p>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-xs">
          Perform calculations using the virtual keypad. Your evaluated steps will be logged here for 1-click recall during complex problems.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Top Header & Clear Action */}
      <div className="px-3.5 py-2.5 bg-slate-100/80 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          Calculation Tape ({historyItems.length})
        </span>
        <button
          onClick={onClearHistory}
          className="flex items-center gap-1 text-[11px] font-bold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 px-2 py-0.5 rounded-md hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer"
        >
          <Trash2 className="w-3 h-3" />
          <span>Clear Tape</span>
        </button>
      </div>

      {/* History Items List */}
      <div className="p-2.5 sm:p-3 space-y-2 overflow-y-auto max-h-[58vh]">
        {historyItems.map((item) => (
          <div
            key={item.id}
            className="p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-2xs hover:border-blue-400/50 dark:hover:border-blue-500/40 transition group"
          >
            <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono mb-1">
              <span className="truncate max-w-[220px]" title={item.expression}>{item.expression}</span>
              <span>{item.timestamp || ''}</span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="text-base font-mono font-bold text-emerald-600 dark:text-emerald-400 truncate">
                = {item.result}
              </span>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => handleCopy(item.id, item.result)}
                  title="Copy result to clipboard"
                  className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer"
                >
                  {copiedId === item.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>

                <button
                  onClick={() => onSelectResult(item.result)}
                  title="Insert result into active calculator display"
                  className="flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900 border border-blue-200 dark:border-blue-800 font-bold text-[10px] transition cursor-pointer"
                >
                  <CornerDownLeft className="w-3 h-3" />
                  <span>Insert</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
