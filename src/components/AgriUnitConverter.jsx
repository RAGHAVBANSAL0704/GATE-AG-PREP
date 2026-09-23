import React, { useState } from 'react';
import { 
  Scale, 
  Binary, 
  ArrowRightLeft, 
  RotateCcw, 
  Sliders, 
  Sparkles, 
  Layers, 
  Info,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import MathRenderer from './MathRenderer';

// Unit conversion factors relative to base SI unit
const UNIT_CATEGORIES = {
  pressure: {
    name: 'Pressure & Soil Stress',
    base: 'kPa',
    units: [
      { id: 'kPa', name: 'Kilopascal (kPa)', toBase: 1 },
      { id: 'Pa', name: 'Pascal (Pa = N/m²)', toBase: 0.001 },
      { id: 'bar', name: 'Bar', toBase: 100 },
      { id: 'psi', name: 'Pounds/sq inch (psi)', toBase: 6.89476 },
      { id: 'mH2O', name: 'Meter of Water (m H₂O)', toBase: 9.80665 },
      { id: 'mmHg', name: 'Millimeter of Mercury (mmHg)', toBase: 0.133322 },
      { id: 'atm', name: 'Standard Atmosphere (atm)', toBase: 101.325 }
    ]
  },
  flow: {
    name: 'Discharge & Flow Rate',
    base: 'm3_s',
    units: [
      { id: 'm3_s', name: 'Cubic meter / second (cumec)', toBase: 1 },
      { id: 'ft3_s', name: 'Cubic foot / second (cusec)', toBase: 0.0283168 },
      { id: 'L_s', name: 'Liters / second (L/s)', toBase: 0.001 },
      { id: 'L_min', name: 'Liters / minute (L/min)', toBase: 0.001 / 60 },
      { id: 'm3_h', name: 'Cubic meter / hour (m³/h)', toBase: 1 / 3600 },
      { id: 'ha_cm_day', name: 'Hectare-cm / day', toBase: (10000 * 0.01) / 86400 }
    ]
  },
  power: {
    name: 'Power & Engine Energy Rate',
    base: 'kW',
    units: [
      { id: 'kW', name: 'Kilowatt (kW)', toBase: 1 },
      { id: 'hp_metric', name: 'Metric Horsepower (hp / PS)', toBase: 0.735499 },
      { id: 'hp_imperial', name: 'Imperial Horsepower (hp)', toBase: 0.745700 },
      { id: 'W', name: 'Watt (W = J/s)', toBase: 0.001 },
      { id: 'kJ_s', name: 'Kilojoule / second (kJ/s)', toBase: 1 },
      { id: 'kcal_h', name: 'Kilocalorie / hour (kcal/h)', toBase: 0.00116222 }
    ]
  },
  area: {
    name: 'Land Area & Farm Basin',
    base: 'ha',
    units: [
      { id: 'ha', name: 'Hectare (ha)', toBase: 1 },
      { id: 'acre', name: 'Acre (ac)', toBase: 0.404686 },
      { id: 'm2', name: 'Square meter (m²)', toBase: 0.0001 },
      { id: 'km2', name: 'Square kilometer (km²)', toBase: 100 },
      { id: 'ft2', name: 'Square foot (ft²)', toBase: 0.0001 * 0.092903 }
    ]
  },
  energy: {
    name: 'Thermal Energy & Work',
    base: 'kJ',
    units: [
      { id: 'kJ', name: 'Kilojoule (kJ)', toBase: 1 },
      { id: 'J', name: 'Joule (J)', toBase: 0.001 },
      { id: 'MJ', name: 'Megajoule (MJ)', toBase: 1000 },
      { id: 'kWh', name: 'Kilowatt-hour (kW·h)', toBase: 3600 },
      { id: 'kcal', name: 'Kilocalorie (kcal)', toBase: 4.1868 },
      { id: 'BTU', name: 'British Thermal Unit (BTU)', toBase: 1.05506 }
    ]
  }
};

export default function AgriUnitConverter() {
  const [activeTab, setActiveTab] = useState('converter'); // 'converter' | 'dimensionless'

  // Unit Converter State
  const [selectedCat, setSelectedCat] = useState('pressure');
  const [inputValue, setInputValue] = useState(1);
  const [fromUnit, setFromUnit] = useState('bar');
  const [toUnit, setToUnit] = useState('kPa');

  // Dimensionless Numbers Analyzer State
  const [selectedNum, setSelectedNum] = useState('reynolds'); // 'reynolds' | 'froude' | 'prandtl' | 'nusselt' | 'schmidt' | 'grashof'

  // Dimensionless Input Variables
  const [reVars, setReVars] = useState({ rho: 1000, v: 1.5, D: 0.05, mu: 0.001 });
  const [frVars, setFrVars] = useState({ v: 2.8, y: 0.4, g: 9.81 });
  const [prVars, setPrVars] = useState({ cp: 4184, mu: 0.0008, k: 0.62 });
  const [nuVars, setNuVars] = useState({ h: 450, D: 0.05, k: 0.62 });
  const [scVars, setScVars] = useState({ nu: 1.5e-5, D_AB: 2.2e-5 });
  const [grVars, setGrVars] = useState({ g: 9.81, beta: 0.0034, deltaT: 40, L: 0.25, nu: 1.5e-5 });

  // Handle category change
  const handleCatChange = (catKey) => {
    setSelectedCat(catKey);
    const cat = UNIT_CATEGORIES[catKey];
    setFromUnit(cat.units[0].id);
    setToUnit(cat.units[1].id);
  };

  // Unit Conversion Math
  const currentCatData = UNIT_CATEGORIES[selectedCat];
  const fromUnitObj = currentCatData.units.find(u => u.id === fromUnit) || currentCatData.units[0];
  const toUnitObj = currentCatData.units.find(u => u.id === toUnit) || currentCatData.units[1];

  const baseVal = (Number(inputValue) || 0) * fromUnitObj.toBase;
  const convertedVal = baseVal / toUnitObj.toBase;

  // Swap Units
  const handleSwapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  // Dimensionless Number Calculations
  const reResult = (reVars.rho * reVars.v * reVars.D) / reVars.mu;
  const frResult = frVars.v / Math.sqrt(frVars.g * frVars.y);
  const prResult = (prVars.cp * prVars.mu) / prVars.k;
  const nuResult = (nuVars.h * nuVars.D) / nuVars.k;
  const scResult = scVars.nu / scVars.D_AB;
  const grResult = (grVars.g * grVars.beta * grVars.deltaT * Math.pow(grVars.L, 3)) / Math.pow(grVars.nu, 2);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Header Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 text-xs font-bold border border-cyan-200 dark:border-cyan-800/60">
              <Scale className="w-3.5 h-3.5" />
              <span>GATE AG Precision Engineering Toolbox</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Unit Converter &amp; Dimensionless Numbers Analyzer
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl">
              Rapidly convert agricultural engineering units (cusec/cumec, bar/psi/kPa, ha-cm/day) and inspect dimensionless flow regimes.
            </p>
          </div>

          {/* Sub-Tool Selector */}
          <div className="flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('converter')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                activeTab === 'converter'
                  ? 'bg-cyan-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Unit Converter</span>
            </button>
            <button
              onClick={() => setActiveTab('dimensionless')}
              className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                activeTab === 'dimensionless'
                  ? 'bg-cyan-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Binary className="w-3.5 h-3.5" />
              <span>Dimensionless Numbers</span>
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1: AG UNIT CONVERTER */}
      {activeTab === 'converter' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Category Selector Side Menu */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 space-y-3 shadow-xs">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Engineering Disciplines
            </h3>
            <div className="space-y-1.5">
              {Object.entries(UNIT_CATEGORIES).map(([key, data]) => (
                <button
                  key={key}
                  onClick={() => handleCatChange(key)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-bold transition flex items-center justify-between ${
                    selectedCat === key
                      ? 'bg-cyan-50 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800/80'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <span>{data.name}</span>
                  <span className="text-[10px] font-mono opacity-60 font-semibold">{data.units.length} units</span>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Converter Box */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h2 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <span>{currentCatData.name} Converter</span>
              </h2>
              <span className="text-xs font-mono font-bold text-slate-400">SI Base: {currentCatData.base}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-7 gap-4 items-center">
              
              {/* FROM Card */}
              <div className="sm:col-span-3 space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">From</label>
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 text-xs font-bold text-slate-900 dark:text-white cursor-pointer"
                >
                  {currentCatData.units.map(u => (
                    <option key={u.id} value={u.id} className="bg-white dark:bg-slate-900">{u.name}</option>
                  ))}
                </select>
                <input
                  type="number"
                  step="any"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 text-lg font-mono font-black text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-cyan-500"
                  placeholder="Enter value"
                />
              </div>

              {/* SWAP Button */}
              <div className="sm:col-span-1 flex justify-center pt-5">
                <button
                  onClick={handleSwapUnits}
                  className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-950 transition shadow-2xs"
                  title="Swap Units"
                >
                  <ArrowRightLeft className="w-5 h-5" />
                </button>
              </div>

              {/* TO Card */}
              <div className="sm:col-span-3 space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">To</label>
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/80 text-xs font-bold text-slate-900 dark:text-white cursor-pointer"
                >
                  {currentCatData.units.map(u => (
                    <option key={u.id} value={u.id} className="bg-white dark:bg-slate-900">{u.name}</option>
                  ))}
                </select>
                <div className="w-full px-4 py-3 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 text-lg font-mono font-black text-cyan-600 dark:text-cyan-400 overflow-x-auto min-h-[52px] flex items-center">
                  {Number.isFinite(convertedVal) ? (
                    convertedVal > 1e6 || (convertedVal < 1e-4 && convertedVal !== 0) 
                      ? convertedVal.toExponential(5) 
                      : Number(convertedVal.toFixed(6))
                  ) : '0'}
                </div>
              </div>

            </div>

            {/* Comprehensive All-Unit Conversion Matrix */}
            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Full Equivalent Conversion Table
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {currentCatData.units.map(u => {
                  const val = baseVal / u.toBase;
                  const display = Number.isFinite(val) ? (
                    val > 1e6 || (val < 1e-4 && val !== 0) ? val.toExponential(4) : Number(val.toFixed(4))
                  ) : '0';
                  return (
                    <div key={u.id} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 space-y-0.5">
                      <div className="text-[10px] text-slate-400 font-bold truncate">{u.name}</div>
                      <div className="text-sm font-mono font-extrabold text-slate-900 dark:text-white">
                        {display} <span className="text-xs font-normal text-cyan-500">{u.id}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* VIEW 2: DIMENSIONLESS NUMBERS ANALYZER */}
      {activeTab === 'dimensionless' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Numbers Selector Menu */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 space-y-3 shadow-xs">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Dimensionless Groups
            </h3>
            <div className="space-y-1.5">
              {[
                { id: 'reynolds', name: 'Reynolds Number (Re)', sub: 'Inertia / Viscous' },
                { id: 'froude', name: 'Froude Number (Fr)', sub: 'Inertia / Gravity' },
                { id: 'prandtl', name: 'Prandtl Number (Pr)', sub: 'Momentum / Thermal Diffusivity' },
                { id: 'nusselt', name: 'Nusselt Number (Nu)', sub: 'Convective / Conductive Heat' },
                { id: 'schmidt', name: 'Schmidt Number (Sc)', sub: 'Momentum / Mass Diffusivity' },
                { id: 'grashof', name: 'Grashof Number (Gr)', sub: 'Buoyancy / Viscous Forces' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setSelectedNum(item.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-bold transition flex items-center justify-between ${
                    selectedNum === item.id
                      ? 'bg-cyan-50 dark:bg-cyan-950/80 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800/80'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div>
                    <div>{item.name}</div>
                    <div className="text-[10px] font-normal text-slate-400">{item.sub}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Calculator Panel */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            
            {/* 1. REYNOLDS NUMBER */}
            {selectedNum === 'reynolds' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">Reynolds Number (Re)</h3>
                    <p className="text-xs text-slate-500">Governs pipe, nozzle, and conduit flow regimes.</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <MathRenderer content="\\[ Re = \\frac{\\rho v D}{\\mu} = \\frac{v D}{\\nu} \\]" inline={false} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500">Fluid Density ρ (kg/m³)</label>
                    <input type="number" value={reVars.rho} onChange={e => setReVars({ ...reVars, rho: Number(e.target.value) })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500">Flow Velocity v (m/s)</label>
                    <input type="number" step="0.1" value={reVars.v} onChange={e => setReVars({ ...reVars, v: Number(e.target.value) })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500">Hydraulic Pipe Dia D (m)</label>
                    <input type="number" step="0.005" value={reVars.D} onChange={e => setReVars({ ...reVars, D: Number(e.target.value) })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500">Dynamic Viscosity μ (Pa·s)</label>
                    <input type="number" step="0.0001" value={reVars.mu} onChange={e => setReVars({ ...reVars, mu: Number(e.target.value) })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono text-sm" />
                  </div>
                </div>

                {/* Result Card */}
                <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">Calculated Re</span>
                    <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                      {Math.round(reResult).toLocaleString()}
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-xl text-xs font-extrabold border ${
                    reResult < 2100 
                      ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-300' 
                      : reResult <= 4000 
                      ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-300' 
                      : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border-rose-300'
                  }`}>
                    {reResult < 2100 ? 'Laminar Flow (Re < 2100)' : reResult <= 4000 ? 'Transitional (2100 ≤ Re ≤ 4000)' : 'Turbulent Flow (Re > 4000)'}
                  </div>
                </div>
              </div>
            )}

            {/* 2. FROUDE NUMBER */}
            {selectedNum === 'froude' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">Froude Number (Fr)</h3>
                    <p className="text-xs text-slate-500">Governs open channel irrigation canals and hydraulic jumps.</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <MathRenderer content="\\[ Fr = \\frac{v}{\\sqrt{g \\cdot y}} \\]" inline={false} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500">Flow Velocity v (m/s)</label>
                    <input type="number" step="0.1" value={frVars.v} onChange={e => setFrVars({ ...frVars, v: Number(e.target.value) })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500">Hydraulic Depth y (m)</label>
                    <input type="number" step="0.05" value={frVars.y} onChange={e => setFrVars({ ...frVars, y: Number(e.target.value) })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500">Gravity g (m/s²)</label>
                    <input type="number" step="0.01" value={frVars.g} onChange={e => setFrVars({ ...frVars, g: Number(e.target.value) })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono text-sm" />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">Calculated Fr</span>
                    <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                      {frResult.toFixed(3)}
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-xl text-xs font-extrabold border ${
                    Math.abs(frResult - 1.0) < 0.05 
                      ? 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border-purple-300' 
                      : frResult < 1.0 
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-300' 
                      : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border-rose-300'
                  }`}>
                    {Math.abs(frResult - 1.0) < 0.05 ? 'Critical Flow (Fr ≈ 1.0)' : frResult < 1.0 ? 'Subcritical Tranquil Flow (Fr < 1)' : 'Supercritical Shooting Flow (Fr > 1)'}
                  </div>
                </div>
              </div>
            )}

            {/* 3. PRANDTL NUMBER */}
            {selectedNum === 'prandtl' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">Prandtl Number (Pr)</h3>
                    <p className="text-xs text-slate-500">Ratio of momentum diffusivity to thermal diffusivity.</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <MathRenderer content="\\[ Pr = \\frac{C_p \\mu}{k} = \\frac{\\nu}{\\alpha} \\]" inline={false} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500">Specific Heat Cp (J/kg·K)</label>
                    <input type="number" value={prVars.cp} onChange={e => setPrVars({ ...prVars, cp: Number(e.target.value) })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500">Viscosity μ (Pa·s)</label>
                    <input type="number" step="0.0001" value={prVars.mu} onChange={e => setPrVars({ ...prVars, mu: Number(e.target.value) })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500">Thermal Conductivity k (W/m·K)</label>
                    <input type="number" step="0.01" value={prVars.k} onChange={e => setPrVars({ ...prVars, k: Number(e.target.value) })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono text-sm" />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">Calculated Pr</span>
                    <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                      {prResult.toFixed(2)}
                    </div>
                  </div>
                  <span className="text-xs text-slate-500">Air: ~0.71 | Water: ~5-7 | Oils: ~50-1000+</span>
                </div>
              </div>
            )}

            {/* 4. NUSSELT NUMBER */}
            {selectedNum === 'nusselt' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">Nusselt Number (Nu)</h3>
                    <p className="text-xs text-slate-500">Ratio of convective to conductive heat transfer across boundary.</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <MathRenderer content="\\[ Nu = \\frac{h D}{k} \\]" inline={false} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500">Convective Coeff h (W/m²·K)</label>
                    <input type="number" value={nuVars.h} onChange={e => setNuVars({ ...nuVars, h: Number(e.target.value) })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500">Dimension D (m)</label>
                    <input type="number" step="0.01" value={nuVars.D} onChange={e => setNuVars({ ...nuVars, D: Number(e.target.value) })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500">Conductivity k (W/m·K)</label>
                    <input type="number" step="0.01" value={nuVars.k} onChange={e => setNuVars({ ...nuVars, k: Number(e.target.value) })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono text-sm" />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">Calculated Nu</span>
                    <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                      {nuResult.toFixed(2)}
                    </div>
                  </div>
                  <span className="text-xs text-slate-500">Pure Conduction limit: Nu = 1</span>
                </div>
              </div>
            )}

            {/* 5. SCHMIDT NUMBER */}
            {selectedNum === 'schmidt' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">Schmidt Number (Sc)</h3>
                    <p className="text-xs text-slate-500">Ratio of momentum diffusivity (kinematic viscosity) to mass diffusivity.</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <MathRenderer content="\\[ Sc = \\frac{\\nu}{D_{AB}} = \\frac{\\mu}{\\rho D_{AB}} \\]" inline={false} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500">Kinematic Viscosity ν (m²/s)</label>
                    <input type="number" step="1e-6" value={scVars.nu} onChange={e => setScVars({ ...scVars, nu: Number(e.target.value) })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500">Mass Diffusivity DAB (m²/s)</label>
                    <input type="number" step="1e-6" value={scVars.D_AB} onChange={e => setScVars({ ...scVars, D_AB: Number(e.target.value) })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono text-sm" />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">Calculated Sc</span>
                    <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                      {scResult.toFixed(3)}
                    </div>
                  </div>
                  <span className="text-xs text-slate-500">Governs grain drying and aeration mass transfer rates.</span>
                </div>
              </div>
            )}

            {/* 6. GRASHOF NUMBER */}
            {selectedNum === 'grashof' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">Grashof Number (Gr)</h3>
                    <p className="text-xs text-slate-500">Ratio of buoyancy to viscous forces in natural convection.</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <MathRenderer content="\\[ Gr = \\frac{g \\beta (T_s - T_\\infty) L^3}{\\nu^2} \\]" inline={false} />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500">Thermal Exp β (1/K)</label>
                    <input type="number" step="0.0001" value={grVars.beta} onChange={e => setGrVars({ ...grVars, beta: Number(e.target.value) })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono text-xs" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500">ΔT = Ts - T∞ (°C)</label>
                    <input type="number" value={grVars.deltaT} onChange={e => setGrVars({ ...grVars, deltaT: Number(e.target.value) })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono text-xs" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500">Length L (m)</label>
                    <input type="number" step="0.05" value={grVars.L} onChange={e => setGrVars({ ...grVars, L: Number(e.target.value) })} className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 font-mono text-xs" />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">Calculated Gr</span>
                    <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">
                      {grResult > 1e6 ? grResult.toExponential(4) : Math.round(grResult).toLocaleString()}
                    </div>
                  </div>
                  <span className="text-xs text-slate-500">Rayleigh Ra = Gr · Pr governs laminar/turbulent natural convection.</span>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
