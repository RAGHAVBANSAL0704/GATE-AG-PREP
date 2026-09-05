import React, { useState } from 'react';
import { Wrench, Shield, Zap, Sparkles, Trophy, CheckCircle2, Lock, Flame, Crosshair, Cpu, Rocket, Swords } from 'lucide-react';
import { playCyberSound } from '../utils/cyberBreakSound';

// ====================================================================
// EXPANDED CYBER VEHICLES & WAR MACHINES CATALOGUE
// ====================================================================
const VEHICLES = [
  // 1. Core Agro-Mechs
  { id: 'tractor', name: 'Cyber Tractor Mk-IV', category: 'agri', icon: '🚜', role: 'Balanced Flagship', speed: 6, hp: 100, cost: 0, desc: 'Heavy-duty cyber tillage vehicle with balanced propulsion & shields.' },
  { id: 'drone', name: 'Quantum Drone Quadcopter', category: 'cosmic', icon: '🚁', role: 'Agile Skirmisher', speed: 9, hp: 80, cost: 200, desc: 'Ultra-lightweight reconnaissance drone equipped with rapid twin pulse blasters.' },
  { id: 'subsoiler', name: 'Cyber Subsoiler 3000', category: 'agri', icon: '🚜', role: 'Armor Shatterer', speed: 5, hp: 160, cost: 400, desc: 'Reinforced seismic shank plating designed to shatter hardened armor & planetary soil.' },
  { id: 'titan', name: 'Titan Combine Harvester', category: 'agri', icon: '🌾', role: 'Harvest Fortress', speed: 4, hp: 220, cost: 750, desc: 'Massive fortress harvester with quad-plasma threshing blasters.' },

  // 2. Heavy War Machines & Combat Walkers
  { id: 'walker', name: 'Goliath Siege Walker', category: 'war', icon: '🦾', role: 'Bipedal Artillery', speed: 5, hp: 260, cost: 1100, desc: 'Twin heavy auto-cannon walker with reinforced knee stabilizers and shock shielding.' },
  { id: 'hovertank', name: 'Plasma Hover Tank Dreadnought', category: 'war', icon: '🛸', role: 'Anti-Grav Tank', speed: 6, hp: 320, cost: 1500, desc: 'Floating heavy combat vehicle with high-density magnetic particle shielding.' },
  { id: 'railgun', name: 'Hyperion Railgun Cruiser', category: 'war', icon: '⚡', role: 'Long-Range Sniper', speed: 7, hp: 250, cost: 1900, desc: 'High-velocity kinetic accelerator cannon capable of piercing multiple enemy targets.' },
  { id: 'behemoth', name: 'Armored Siege Behemoth Mk-VII', category: 'war', icon: '🛡️', role: 'Juggernaut', speed: 4, hp: 400, cost: 2400, desc: 'Impervious rolling fortress with automated point-defense micro-turrets.' },

  // 3. Cosmic & Deep Space Interceptors
  { id: 'interceptor', name: 'Cosmos Interceptor X-1', category: 'cosmic', icon: '🚀', role: 'Space Superiority', speed: 10, hp: 140, cost: 1300, desc: 'Deep-space vector-thrust fighter with dual tachyon laser blasters & afterburner.' },
  { id: 'stealth', name: 'Void Dragon Stealth Gunship', category: 'cosmic', icon: '🐉', role: 'Ghost Infiltrator', speed: 11, hp: 130, cost: 2800, desc: 'Equipped with cloaking matrix, hyper-maneuverability thrusters & critical strike lasers.' },
  { id: 'colossus', name: 'Omega Leviathan Flagship', category: 'cosmic', icon: '👑', role: 'Supreme Dreadnought', speed: 5, hp: 500, cost: 3500, desc: 'Supreme command dreadnought with maximum hull integrity and orbital broadside beams.' }
];

const SKILL_TREE = [
  { id: 'hp', name: 'Shield Matrix Core', icon: Shield, level: 1, maxLevel: 5, cost: 100, bonus: '+25 HP per upgrade level' },
  { id: 'laser', name: 'Laser Capacitor Overclock', icon: Zap, level: 1, maxLevel: 5, cost: 150, bonus: '+15% Laser Damage per level' },
  { id: 'speed', name: 'Nitro Thruster Boosters', icon: Flame, level: 1, maxLevel: 5, cost: 120, bonus: '+12% Movement Velocity per level' },
  { id: 'magnet', name: 'Graviton Magnetic Field', icon: Crosshair, level: 1, maxLevel: 5, cost: 180, bonus: '+30px Data Canister pull radius per level' },
  { id: 'regen', name: 'Nanite Hull Auto-Repair', icon: Cpu, level: 0, maxLevel: 5, cost: 250, bonus: '+1.5 HP/sec passive health recovery' }
];

const CRAFTING_PARTS = [
  { id: 'plasma', name: 'Plasma Cutter Nozzle', cost: 250, icon: '🔥', desc: 'Adds persistent burning thermal damage to enemy warship hulls.' },
  { id: 'drip', name: 'Resonance Shield Matrix', cost: 300, icon: '💧', desc: 'Generates periodic bullet-absorbing electromagnetic forcefields.' },
  { id: 'solar', name: 'Solar Beam Hyper-Cannon', cost: 500, icon: '☀️', desc: 'Fires intense continuous solar beam lasers during overdrive.' },
  { id: 'emp', name: 'Singularity EMP Pulse Generator', cost: 650, icon: '⚡', desc: 'Disables incoming enemy projectile salvos when resonance pulse fires.' },
  { id: 'chrono', name: 'Tachyon Hyper-Drive Core', cost: 900, icon: '🚀', desc: 'Increases afterburner duration by 50% and reduces boost energy drain.' },
  { id: 'nanite', name: 'Vibranium Armor Plating', cost: 1200, icon: '💎', desc: 'Reduces collision impact damage by 40% across all vehicles.' }
];

const MUTATORS = [
  { id: 'quad', name: 'Quad-Laser Barrage', desc: 'Fires 3 spread laser beams simultaneously for massive screen clearance.', icon: '⚡' },
  { id: 'shield', name: 'Heavy Armor Reinforced Shield', desc: 'Increases vehicle maximum HP by 50%.', icon: '🛡️' },
  { id: 'speed', name: 'Overdrive Thruster Speed Boost', desc: 'Increases thruster movement speed by 30%.', icon: '🚀' },
  { id: 'leech', name: 'Nanite Energy Vampirism', desc: 'Shattering asteroids & enemy warships restores 5 HP to your hull.', icon: '🩸' },
  { id: 'critical', name: 'Hyper Velocity Piercing Bolts', desc: 'Lasers penetrate through multiple small asteroids without losing speed.', icon: '🎯' }
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
  const [activeTab, setActiveTab] = useState('vehicles'); // 'vehicles', 'skills', 'crafting', 'mutators'
  const [vehicleCategoryFilter, setVehicleCategoryFilter] = useState('all'); // 'all', 'agri', 'war', 'cosmic'
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

  const filteredVehicles = VEHICLES.filter(v => {
    return vehicleCategoryFilter === 'all' || v.category === vehicleCategoryFilter;
  });

  return (
    <div className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-purple-500/30 rounded-2xl p-6 shadow-xl text-slate-900 dark:text-white">

      {/* HEADER & XP BAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-purple-50/70 dark:bg-slate-900/80 p-4 rounded-xl border border-purple-200 dark:border-purple-500/20">
        <div>
          <h2 className="text-xl font-extrabold text-purple-700 dark:text-purple-400 flex items-center gap-2">
            <Wrench className="w-6 h-6" /> CYBER-GARAGE & WAR MACHINE HANGAR
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">Unlock 11 heavy battle mechs & starships, upgrade skill matrix, craft weapons & activate mutators.</p>
        </div>
        <div className="px-4 py-2 bg-purple-100/70 dark:bg-purple-950/80 border border-purple-200 dark:border-purple-400/40 rounded-xl">
          <span className="text-xs text-slate-600 dark:text-slate-400 uppercase font-mono block">Available Break XP</span>
          <span className="text-lg font-mono font-extrabold text-amber-600 dark:text-yellow-300">{breakXP} XP</span>
        </div>
      </div>

      {/* SUB-TAB NAVIGATION */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-200 dark:border-slate-800 pb-3">
        {[
          { id: 'vehicles', label: '🚜 Hyper Vehicles & War Machines (11)' },
          { id: 'skills', label: '⚡ Skill Matrix Tree' },
          { id: 'crafting', label: '🛠️ Weapon Crafting Workshop' },
          { id: 'mutators', label: '🧬 Rogue-Lite Mutators' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. EXPANDED VEHICLES & WAR MACHINES HANGAR */}
      {activeTab === 'vehicles' && (
        <div className="space-y-4">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-2">
            {[
              { id: 'all', label: 'All Machines (11)' },
              { id: 'agri', label: '🚜 Agro-Mechs (4)' },
              { id: 'war', label: '⚔️ Heavy War Machines (4)' },
              { id: 'cosmic', label: '🚀 Cosmic Starships (3)' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setVehicleCategoryFilter(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  vehicleCategoryFilter === cat.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVehicles.map(v => {
              const isUnlocked = unlockedVehicles.includes(v.id);
              const isSelected = activeVehicle === v.name;
              const canAfford = breakXP >= v.cost;

              return (
                <div
                  key={v.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'border-purple-400 bg-purple-50/80 dark:bg-purple-950/60 shadow-lg shadow-purple-500/20'
                      : isUnlocked
                      ? 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-950 opacity-80'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{v.icon}</span>
                        <div>
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white">{v.name}</h4>
                          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-purple-100 dark:bg-slate-800 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30">
                            {v.role}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 mb-3 leading-relaxed">{v.desc}</p>

                    <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-700 dark:text-slate-300 mb-4 bg-white dark:bg-slate-950 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800">
                      <span className="flex items-center gap-1"><Rocket className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" /> Speed: {v.speed}</span>
                      <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Max HP: {v.hp}</span>
                    </div>
                  </div>

                  {isUnlocked ? (
                    <button
                      onClick={() => {
                        onSelectVehicle(v.name);
                        playCyberSound('powerup');
                      }}
                      disabled={isSelected}
                      className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-emerald-600 text-white cursor-default shadow-md'
                          : 'bg-purple-600 hover:bg-purple-500 text-white shadow-md'
                      }`}
                    >
                      {isSelected ? '✓ ACTIVE COMBAT VEHICLE' : 'EQUIP VEHICLE'}
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
                      className={`w-full py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                        canAfford
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-md'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      <Lock className="w-3.5 h-3.5" /> UNLOCK MACHINE ({v.cost} XP)
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. SKILL MATRIX TREE */}
      {activeTab === 'skills' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map(s => {
            const Icon = s.icon;
            const canAfford = breakXP >= s.cost;
            const isMax = s.level >= s.maxLevel;

            return (
              <div key={s.id} className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-purple-600 dark:text-purple-400">
                    <Icon className="w-5 h-5" />
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{s.name}</h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">{s.bonus}</p>
                  <div className="text-xs font-mono text-purple-700 dark:text-purple-300 font-bold mb-4">Level {s.level} / {s.maxLevel}</div>
                </div>

                <button
                  onClick={() => handleUpgradeSkill(s.id)}
                  disabled={isMax || !canAfford}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isMax
                      ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                      : canAfford
                      ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-md'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {isMax ? 'MAX LEVEL REACHED' : `UPGRADE MATRIX (${s.cost} XP)`}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* 3. CRAFTING WORKSHOP */}
      {activeTab === 'crafting' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CRAFTING_PARTS.map(p => {
            const isCrafted = craftedParts.includes(p.id);
            const canAfford = breakXP >= p.cost;

            return (
              <div key={p.id} className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{p.icon}</span>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{p.name}</h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">{p.desc}</p>
                </div>

                <button
                  onClick={() => handleCraftPart(p)}
                  disabled={isCrafted || !canAfford}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isCrafted
                      ? 'bg-emerald-600 text-white'
                      : canAfford
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {isCrafted ? '✓ CRAFTED & EQUIPPED' : `CRAFT WEAPON (${p.cost} XP)`}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* 4. ROGUE-LITE MUTATORS */}
      {activeTab === 'mutators' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MUTATORS.map(m => {
            const isActive = activeMutators.includes(m.id);

            return (
              <div
                key={m.id}
                onClick={() => onToggleMutator(m.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isActive
                    ? 'border-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/40 shadow-lg shadow-emerald-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{m.icon}</span>
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${isActive ? 'bg-emerald-500 text-slate-950' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                    {isActive ? 'ACTIVE' : 'OFF'}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">{m.name}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{m.desc}</p>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
