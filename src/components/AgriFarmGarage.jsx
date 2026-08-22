import React, { useState } from 'react';
import { 
  Wrench, 
  Droplets, 
  Sun, 
  Building2, 
  Zap, 
  ArrowUp, 
  CheckCircle2, 
  Lock, 
  Sparkles,
  Trophy,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFX } from '../utils/soundFX';
import { getFarmState, upgradeFarmItem } from '../services/agriFarmService';
import { getLocalBreakXP, addBreakXP } from '../services/breakLeaderboardService';

export default function AgriFarmGarage({ onXPUpdated }) {
  const [farmState, setFarmState] = useState(() => getFarmState());
  const [breakXP, setBreakXP] = useState(() => getLocalBreakXP());
  const [activeTab, setActiveTab] = useState('machinery'); // 'machinery' | 'irrigation' | 'processing'
  const [feedback, setFeedback] = useState('');

  const handleUpgrade = (itemId) => {
    soundFX.playClick();
    const result = upgradeFarmItem(activeTab, itemId, breakXP);

    if (result.success) {
      soundFX.playWin();
      const newXP = addBreakXP(-result.deductedXP);
      setBreakXP(newXP);
      setFarmState(result.farm);
      onXPUpdated?.(newXP);
      setFeedback(result.message);
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    } else {
      soundFX.playCrash();
      setFeedback(`❌ ${result.message}`);
    }
  };

  const currentList = farmState[activeTab] || [];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-6 shadow-xl">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Virtual GATE AG Engineering Farm & Garage</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>Research Farm & Machinery Garage 🚜</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Spend earned <span className="text-amber-500 font-extrabold">Break XP</span> to unlock & upgrade tractors, drip irrigation hubs, and processing towers!
          </p>
        </div>

        <div className="px-4 py-2.5 rounded-2xl bg-amber-500 text-slate-950 font-mono font-extrabold text-sm shadow-md flex items-center gap-2 shrink-0">
          <Zap className="w-5 h-5 fill-slate-950 animate-pulse" />
          <span>Break XP: {breakXP} pts</span>
        </div>
      </div>

      {feedback && (
        <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200 text-xs font-bold text-center">
          {feedback}
        </div>
      )}

      {/* Farm Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => { soundFX.playClick(); setActiveTab('machinery'); setFeedback(''); }}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${
            activeTab === 'machinery'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>Tractor & Machinery Bay (6)</span>
        </button>

        <button
          onClick={() => { soundFX.playClick(); setActiveTab('irrigation'); setFeedback(''); }}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${
            activeTab === 'irrigation'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          <Droplets className="w-4 h-4" />
          <span>Irrigation & Drip Park (6)</span>
        </button>

        <button
          onClick={() => { soundFX.playClick(); setActiveTab('processing'); setFeedback(''); }}
          className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-2 ${
            activeTab === 'processing'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Post-Harvest Processing Mill (6)</span>
        </button>
      </div>

      {/* Equipment Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {currentList.map((item) => {
          const nextCost = item.cost * (item.level + 1);
          const isMax = item.level >= item.maxLevel;
          const canAfford = breakXP >= nextCost;

          return (
            <div
              key={item.id}
              className={`rounded-2xl border p-5 transition-all duration-200 flex flex-col justify-between space-y-4 ${
                item.unlocked
                  ? 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800'
                  : 'bg-slate-100/60 dark:bg-slate-900/40 border-dashed border-slate-300 dark:border-slate-800 opacity-80'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-600 dark:text-amber-400 flex items-center justify-center text-2xl border border-amber-300/30">
                    {item.icon}
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-xs">
                    <span className="px-2.5 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-extrabold">
                      Lvl {item.level}/{item.maxLevel}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span>{item.name}</span>
                    {item.unlocked && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 italic">
                    "{item.spec}"
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                <div>
                  {!isMax ? (
                    <span className="font-mono font-extrabold text-amber-600 dark:text-amber-400">
                      Upgrade: {nextCost} XP
                    </span>
                  ) : (
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <Award className="w-4 h-4" /> MAX LEVEL
                    </span>
                  )}
                </div>

                {!isMax && (
                  <button
                    onClick={() => handleUpgrade(item.id)}
                    disabled={!canAfford}
                    className={`px-4 py-2 rounded-xl font-extrabold text-xs transition flex items-center gap-1.5 shadow-xs ${
                      canAfford
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                    <span>{item.unlocked ? 'Upgrade Lvl' : 'Unlock Item'}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
