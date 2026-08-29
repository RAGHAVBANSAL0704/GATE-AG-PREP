import React, { useState } from 'react';
import { Wrench, Shield, Zap, Sparkles, Trophy, CheckCircle2, Lock, Flame } from 'lucide-react';
import { playCyberSound } from '../utils/cyberBreakSound';

const VEHICLES = [
  { id: 'tractor', name: 'Cyber Tractor Mk-IV', icon: '🚜', speed: 6, hp: 100, cost: 0, desc: 'Balanced flagship research vehicle.' },
  { id: 'drone', name: 'Quantum Drone Quadcopter', icon: '🚁', speed: 9, hp: 80, cost: 200, desc: 'Ultra agile drone with high mobility.' },
  { id: 'subsoiler', name: 'Cyber Subsoiler 3000', icon: '🚜', speed: 5, hp: 150, cost: 400, desc: 'Heavy armor shatterer vehicle.' },
  { id: 'titan', name: 'Titan Combine Harvester', icon: '🌾', speed: 4, hp: 200, cost: 800, desc: 'Massive fortress machinery with quad laser capacity.' }
];

const SKILL_TREE = [
  { id: 'hp', name: 'Shield Matrix', icon: Shield, level: 1, maxLevel: 5, cost: 100, bonus: '+20 HP per level' },
  { id: 'laser', name: 'Laser Capacitor', icon: Zap, level: 1, maxLevel: 5, cost: 150, bonus: '+15% Laser Damage per level' },
  { id: 'speed', name: 'Nitro Thrusters', icon: Flame, level: 1, maxLevel: 5, cost: 120, bonus: '+10% Movement Speed per level' }
];

const CRAFTING_PARTS = [
  { id: 'plasma', name: 'Plasma Cutter Nozzle', cost: 250, icon: '🔥', desc: 'Adds burning laser damage over time to bosses.' },
  { id: 'drip', name: 'Drip Irrigation Shield Core', cost: 300, icon: '💧', desc: 'Generates periodic bullet-absorbing forcefields.' },
  { id: 'solar', name: 'Solar PV Beam Cannon', cost: 500, icon: '☀️', desc: 'Fires intense continuous solar beam barrages.' }
];

const MUTATORS = [
  { id: 'quad', name: 'Quad-Laser Barrage', desc: 'Fires 3 spread laser beams simultaneously.', icon: '⚡' },
  { id: 'shield', name: 'Heavy Armor Shield', desc: 'Increases vehicle max HP by 50%.', icon: '🛡️' },
  { id: 'speed', name: 'Overdrive Speed Boost', desc: 'Increases thruster movement speed by 30%.', icon: '🚀' }
];

export default function CyberGarageCrafting({
  breakXP,
  onAddXP,
  activeVehicle,
  onSelectVehicle,
  unlockedVehicles = ['tractor'],
  onUnlockVehicle,
  activeMutators = [],
  onToggleMutator
}) {
  const [activeTab, setActiveTab] = useState('vehicles'); // vehicles, skills, crafting, mutators
  const [skills, setSkills] = useState(SKILL_TREE);
  const [craftedParts, setCraftedParts] = useState([]);

  const handleUpgradeSkill = (skillId) => {
    const s = skills.find(item => item.id === skillId);
    if (!s || s.level >= s.maxLevel) return;
    if (breakXP < s.cost) return;

    onAddXP(-s.cost);
    setSkills(prev => prev.map(item => item.id === skillId ? { ...item, level: item.level + 1, cost: Math.round(item.cost * 1.5) } : item));
    playCyberSound('powerup');
  };

  const handleCraftPart = (part) => {
    if (breakXP < part.cost || craftedParts.includes(part.id)) return;
    onAddXP(-part.cost);
    setCraftedParts(prev => [...prev, part.id]);
    playCyberSound('shield');
  };

  return (
    <div className="w-full bg-slate-950 border border-purple-500/30 rounded-2xl p-6 shadow-2xl text-white">

      {/* HEADER & XP BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-slate-900/80 p-4 rounded-xl border border-purple-500/20">
        <div>
          <h2 className="text-xl font-extrabold text-purple-400 flex items-center gap-2">
            <Wrench className="w-6 h-6" /> CYBER-GARAGE & CRAFTING LAB
          </h2>
          <p className="text-xs text-slate-400 font-mono">Upgrade hyper-vehicles, craft modular weapons, & set rogue-lite mutators.</p>
        </div>
        <div className="px-4 py-2 bg-purple-950/80 border border-purple-400/40 rounded-xl">
          <span className="text-xs text-slate-400 uppercase font-mono block">Available Break XP</span>
          <span className="text-lg font-mono font-extrabold text-yellow-300">{breakXP} XP</span>
        </div>
      </div>

      {/* SUB-TAB NAVIGATION */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-800 pb-3">
        {[
          { id: 'vehicles', label: '🚜 Hyper-Vehicles' },
          { id: 'skills', label: '⚡ Skill Tree' },
          { id: 'crafting', label: '🛠️ Crafting Workshop' },
          { id: 'mutators', label: '🧬 Rogue-Lite Mutators' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. VEHICLE BAY */}
      {activeTab === 'vehicles' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {VEHICLES.map(v => {
            const isUnlocked = unlockedVehicles.includes(v.id);
            const isSelected = activeVehicle === v.name;
            const canAfford = breakXP >= v.cost;

            return (
              <div
                key={v.id}
                className={`p-4 rounded-xl border transition-all ${
                  isSelected
                    ? 'border-purple-400 bg-purple-950/60 shadow-lg shadow-purple-500/20'
                    : isUnlocked
                    ? 'border-slate-800 bg-slate-900'
                    : 'border-slate-800 bg-slate-950 opacity-75'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{v.icon}</span>
                  <div>
                    <h4 className="font-bold text-sm text-white">{v.name}</h4>
                    <p className="text-xs text-slate-400">{v.desc}</p>
                  </div>
                </div>

                <div className="flex gap-4 text-xs font-mono text-slate-300 mb-4 bg-slate-950 p-2 rounded-lg">
                  <span>⚡ Speed: {v.speed}</span>
                  <span>🛡️ Max HP: {v.hp}</span>
                </div>

                {isUnlocked ? (
                  <button
                    onClick={() => onSelectVehicle(v.name)}
                    disabled={isSelected}
                    className={`w-full py-2 rounded-lg text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-emerald-600 text-white cursor-default'
                        : 'bg-purple-600 hover:bg-purple-500 text-white'
                    }`}
                  >
                    {isSelected ? '✓ ACTIVE VEHICLE' : 'EQUIP VEHICLE'}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (canAfford) {
                        onAddXP(-v.cost);
                        onUnlockVehicle(v.id);
                        playCyberSound('powerup');
                      }
                    }}
                    disabled={!canAfford}
                    className={`w-full py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                      canAfford
                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <Lock className="w-3.5 h-3.5" /> UNLOCK ({v.cost} XP)
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* 2. SKILL TREE */}
      {activeTab === 'skills' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {skills.map(s => {
            const Icon = s.icon;
            const canAfford = breakXP >= s.cost;
            const isMax = s.level >= s.maxLevel;

            return (
              <div key={s.id} className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
                <div className="flex items-center gap-2 mb-2 text-purple-400">
                  <Icon className="w-5 h-5" />
                  <h4 className="font-bold text-sm text-white">{s.name}</h4>
                </div>
                <p className="text-xs text-slate-400 mb-3">{s.bonus}</p>
                <div className="text-xs font-mono text-purple-300 font-bold mb-4">Level {s.level} / {s.maxLevel}</div>

                <button
                  onClick={() => handleUpgradeSkill(s.id)}
                  disabled={isMax || !canAfford}
                  className={`w-full py-2 rounded-lg text-xs font-bold transition-all ${
                    isMax
                      ? 'bg-slate-800 text-slate-500'
                      : canAfford
                      ? 'bg-purple-600 hover:bg-purple-500 text-white'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {isMax ? 'MAX LEVEL' : `UPGRADE (${s.cost} XP)`}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* 3. CRAFTING WORKSHOP */}
      {activeTab === 'crafting' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {CRAFTING_PARTS.map(p => {
            const isCrafted = craftedParts.includes(p.id);
            const canAfford = breakXP >= p.cost;

            return (
              <div key={p.id} className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{p.icon}</span>
                  <h4 className="font-bold text-sm text-white">{p.name}</h4>
                </div>
                <p className="text-xs text-slate-400 mb-4">{p.desc}</p>

                <button
                  onClick={() => handleCraftPart(p)}
                  disabled={isCrafted || !canAfford}
                  className={`w-full py-2 rounded-lg text-xs font-bold transition-all ${
                    isCrafted
                      ? 'bg-emerald-600 text-white'
                      : canAfford
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {isCrafted ? '✓ CRAFTED & EQUIPPED' : `CRAFT PART (${p.cost} XP)`}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* 4. ROGUE-LITE MUTATORS */}
      {activeTab === 'mutators' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {MUTATORS.map(m => {
            const isActive = activeMutators.includes(m.id);

            return (
              <div
                key={m.id}
                onClick={() => onToggleMutator(m.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isActive
                    ? 'border-emerald-400 bg-emerald-950/40 shadow-lg shadow-emerald-500/20'
                    : 'border-slate-800 bg-slate-900 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{m.icon}</span>
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${isActive ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                    {isActive ? 'ACTIVE' : 'OFF'}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white mb-1">{m.name}</h4>
                <p className="text-xs text-slate-400">{m.desc}</p>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
