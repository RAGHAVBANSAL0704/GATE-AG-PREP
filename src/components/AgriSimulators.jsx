import React, { useState } from 'react';
import { 
  Sliders, 
  Activity, 
  Compass, 
  Wind, 
  Droplets, 
  Gauge, 
  Cpu, 
  RefreshCcw, 
  Layers, 
  Flame, 
  Target, 
  Disc, 
  Cog, 
  ChevronRight, 
  AlertCircle, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import MathRenderer from './MathRenderer';

export default function AgriSimulators() {
  const [activeSim, setActiveSim] = useState('psychrometric'); 
  // 'psychrometric' | 'tractor' | 'hydrograph' | 'xray' | 'seedmetering' | 'enginecycle' | 'combineharvester'

  // --- 1. Psychrometric Simulator State ---
  const [dbTemp, setDbTemp] = useState(35); // Dry bulb °C
  const [relHum, setRelHum] = useState(60); // RH %

  // Psychrometric calculations approximation
  const pSat = 0.61078 * Math.exp((17.27 * dbTemp) / (dbTemp + 237.3)); // kPa
  const pWater = (relHum / 100) * pSat;
  const humidityRatio = 0.622 * (pWater / (101.325 - pWater)); // kg water / kg dry air
  const enthalpy = 1.006 * dbTemp + humidityRatio * (2501 + 1.86 * dbTemp); // kJ/kg
  const dewPoint = (237.3 * Math.log(pWater / 0.61078)) / (17.27 - Math.log(pWater / 0.61078));
  const wetBulb = dbTemp * Math.atan(0.151977 * Math.pow(relHum + 8.313659, 0.5)) + Math.atan(dbTemp + relHum) - Math.atan(relHum - 1.676331) + 0.00391838 * Math.pow(relHum, 1.5) * Math.atan(0.023101 * relHum) - 4.686035;

  // --- 2. Tractor 3-Point Hitch State ---
  const [draftForce, setDraftForce] = useState(12); // kN
  const [implementWeight, setImplementWeight] = useState(5); // kN
  const [linkAngle, setLinkAngle] = useState(15); // degrees
  const [speedKmh, setSpeedKmh] = useState(6); // km/h

  const radAngle = (linkAngle * Math.PI) / 180;
  const topLinkForce = draftForce * Math.tan(radAngle) - implementWeight * 0.4;
  const lowerLinkForce = Math.sqrt(Math.pow(draftForce, 2) + Math.pow(implementWeight, 2));
  const hitchDrawbarPowerKw = (draftForce * speedKmh) / 3.6;

  // --- 3. Hydrograph Simulator State ---
  const [rainfallIntensity, setRainfallIntensity] = useState(45); // mm/h
  const [watershedArea, setWatershedArea] = useState(120); // ha
  const [runoffCoeff, setRunoffCoeff] = useState(0.55); // C factor

  const peakDischargeQ = (runoffCoeff * rainfallIntensity * watershedArea) / 360; // m3/s

  // --- 4. Tractor X-Ray Power Kinetics State ---
  const [engineRpm, setEngineRpm] = useState(2200); // RPM
  const [engineTorque, setEngineTorque] = useState(320); // N·m
  const [fieldSpeed, setFieldSpeed] = useState(7.5); // km/h
  const [wheelSlip, setWheelSlip] = useState(12); // %
  const [implWidth, setImplWidth] = useState(2.4); // meters

  const brakePowerKw = (2 * Math.PI * engineRpm * engineTorque) / 60000;
  const ptoPowerKw = brakePowerKw * 0.88;
  const theoreticalSpeedKmh = fieldSpeed / Math.max(0.01, (1 - wheelSlip / 100));
  const drawbarPowerKw = brakePowerKw * 0.72;
  const effFieldCapHaHr = (implWidth * fieldSpeed * 0.82) / 10;

  // --- 5. Seed Drill / Planter Calibration State ---
  const [seedGrams, setSeedGrams] = useState(480); // grams collected
  const [seedRevs, setSeedRevs] = useState(50); // ground wheel revolutions
  const [wheelDia, setWheelDia] = useState(0.85); // meters
  const [openersCount, setOpenersCount] = useState(9); // number of openers
  const [rowSpacingM, setRowSpacingM] = useState(0.20); // row spacing (m)
  const [seedSlipPct, setSeedSlipPct] = useState(8); // % slip in field

  const groundWheelCircum = Math.PI * wheelDia;
  const testDistanceM = seedRevs * groundWheelCircum;
  const machineWidthM = openersCount * rowSpacingM;
  const testAreaM2 = testDistanceM * machineWidthM;
  const labSeedRateKgHa = ((seedGrams / 1000) / testAreaM2) * 10000;
  const effectiveFieldSeedRateKgHa = labSeedRateKgHa * (1 - seedSlipPct / 100);
  const seedSpacingCm = (testDistanceM * 100) / Math.max(1, (seedGrams / 0.04));

  // --- 6. Engine Thermodynamic Cycles (Diesel & Otto) State ---
  const [cycleType, setCycleType] = useState('diesel'); // 'diesel' | 'otto'
  const [boreMm, setBoreMm] = useState(105); // mm
  const [strokeMm, setStrokeMm] = useState(125); // mm
  const [compRatio, setCompRatio] = useState(17.5); // r
  const [cutoffRatio, setCutoffRatio] = useState(2.0); // rc (for diesel)
  const [p1Bar, setP1Bar] = useState(1.0); // intake bar
  const [t1K, setT1K] = useState(300); // intake K
  const gamma = 1.4;

  const boreM = boreMm / 1000;
  const strokeM = strokeMm / 1000;
  const sweptVolM3 = (Math.PI / 4) * Math.pow(boreM, 2) * strokeM;
  const sweptVolCm3 = sweptVolM3 * 1e6;
  const clearVolCm3 = sweptVolCm3 / (compRatio - 1);
  const totalVolCm3 = sweptVolCm3 + clearVolCm3;

  const p2Bar = p1Bar * Math.pow(compRatio, gamma);
  const t2K = t1K * Math.pow(compRatio, gamma - 1);

  let p3Bar = p2Bar;
  let t3K = t2K * cutoffRatio;
  let thermalEffPct = 0;

  if (cycleType === 'diesel') {
    p3Bar = p2Bar; // constant pressure
    t3K = t2K * cutoffRatio;
    const num = Math.pow(cutoffRatio, gamma) - 1;
    const den = gamma * (cutoffRatio - 1);
    thermalEffPct = (1 - (1 / Math.pow(compRatio, gamma - 1)) * (num / den)) * 100;
  } else {
    // Otto cycle
    const heatRatio = 2.4;
    p3Bar = p2Bar * heatRatio;
    t3K = t2K * heatRatio;
    thermalEffPct = (1 - (1 / Math.pow(compRatio, gamma - 1))) * 100;
  }

  // --- 7. Combine Harvester Cylinder Threshing State ---
  const [cylDiaM, setCylDiaM] = useState(0.60); // m
  const [cylRpm, setCylRpm] = useState(850); // rpm
  const [concaveGapMm, setConcaveGapMm] = useState(14); // mm
  const [cropFeedRateKgS, setCropFeedRateKgS] = useState(4.5); // kg/s
  const [grainMoisturePct, setGrainMoisturePct] = useState(16); // % w.b.

  const peripheralSpeedMs = (Math.PI * cylDiaM * cylRpm) / 60;
  const threshingEffPct = Math.min(99.8, Math.max(80, 
    92 + (peripheralSpeedMs - 25) * 0.45 - (concaveGapMm - 12) * 0.5 - (cropFeedRateKgS - 4) * 0.8 - (grainMoisturePct - 14) * 0.35
  ));
  const unthreshedLossPct = Math.max(0.2, 100 - threshingEffPct);
  const grainCrackagePct = Math.max(0.3, Math.min(18, 
    1.2 + Math.pow(Math.max(0, peripheralSpeedMs - 22), 1.8) * 0.12 + Math.max(0, 16 - concaveGapMm) * 0.35
  ));
  const walkerSeparationEff = Math.min(99.5, Math.max(88, 97 - (cropFeedRateKgS - 3.5) * 1.2));

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold border border-blue-200 dark:border-blue-800/60">
              <Cpu className="w-3.5 h-3.5" />
              <span>Interactive Engineering Physics Simulators</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Agri-Engineering Physics Interactive Simulators
            </h1>
            <p className="text-xs text-slate-500 max-w-2xl">
              Real-time numerical modeling of farm machinery kinematics, internal combustion thermodynamic cycles, psychrometrics, and hydrologic runoff.
            </p>
          </div>

          {/* Simulator Segmented Control */}
          <div className="flex flex-wrap gap-1.5 bg-slate-100 dark:bg-slate-950 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActiveSim('psychrometric')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeSim === 'psychrometric'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Wind className="w-3.5 h-3.5" />
              <span>Psychrometric</span>
            </button>

            <button
              onClick={() => setActiveSim('tractor')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeSim === 'tractor'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Gauge className="w-3.5 h-3.5" />
              <span>Tractor Hitch</span>
            </button>

            <button
              onClick={() => setActiveSim('hydrograph')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeSim === 'hydrograph'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Droplets className="w-3.5 h-3.5" />
              <span>Hydrograph</span>
            </button>

            <button
              onClick={() => setActiveSim('xray')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeSim === 'xray'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Tractor X-Ray</span>
            </button>

            <button
              onClick={() => setActiveSim('seedmetering')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeSim === 'seedmetering'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>Seed Drill</span>
            </button>

            <button
              onClick={() => setActiveSim('enginecycle')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeSim === 'enginecycle'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Otto / Diesel PV</span>
            </button>

            <button
              onClick={() => setActiveSim('combineharvester')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeSim === 'combineharvester'
                  ? 'bg-cyan-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Disc className="w-3.5 h-3.5" />
              <span>Combine Losses</span>
            </button>
          </div>
        </div>
      </div>

      {/* Simulator 1: Psychrometric Chart Explorer */}
      {activeSim === 'psychrometric' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-5 shadow-xs">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-500" />
              <span>Air Parameters</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Dry-Bulb Temp ({dbTemp}°C)</span>
                  <span className="text-blue-500 font-mono">{dbTemp}°C</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="60"
                  value={dbTemp}
                  onChange={(e) => setDbTemp(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Relative Humidity ({relHum}%)</span>
                  <span className="text-blue-500 font-mono">{relHum}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="95"
                  value={relHum}
                  onChange={(e) => setRelHum(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Calculated Values */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2 text-xs">
              <div className="font-bold text-slate-400 uppercase text-[10px]">Calculated Properties</div>
              <div className="grid grid-cols-2 gap-2 font-mono">
                <div>Humidity Ratio (w): <strong className="text-blue-500">{(humidityRatio * 1000).toFixed(2)} g/kg</strong></div>
                <div>Enthalpy (h): <strong className="text-purple-500">{enthalpy.toFixed(1)} kJ/kg</strong></div>
                <div>Wet-Bulb (Twb): <strong className="text-emerald-500">{wetBulb.toFixed(1)} °C</strong></div>
                <div>Dew Point (Tdp): <strong className="text-amber-500">{dewPoint.toFixed(1)} °C</strong></div>
              </div>
            </div>
          </div>

          {/* SVG Canvas Visualizer */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col items-center justify-center space-y-4 shadow-xs">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Interactive Psychrometric State Canvas</div>
            
            <svg viewBox="0 0 500 300" className="w-full max-w-lg bg-slate-950 rounded-2xl border border-slate-800 p-2">
              {/* Grid Lines */}
              <line x1="50" y1="250" x2="450" y2="250" stroke="#334155" strokeWidth="2" />
              <line x1="50" y1="50" x2="50" y2="250" stroke="#334155" strokeWidth="2" />
              <line x1="450" y1="50" x2="450" y2="250" stroke="#334155" strokeWidth="2" />

              {/* Saturation Curve */}
              <path d="M 50 250 Q 200 200 450 50" fill="none" stroke="#38bdf8" strokeWidth="3" strokeDasharray="4,4" />

              {/* State Point */}
              {(() => {
                const cx = 50 + ((dbTemp - 10) / 50) * 400;
                const cy = 250 - (humidityRatio * 1000 / 30) * 200;
                return (
                  <g>
                    <line x1={cx} y1="250" x2={cx} y2={cy} stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" />
                    <line x1="50" y1={cy} x2={cx} y2={cy} stroke="#ef4444" strokeWidth="1" strokeDasharray="2,2" />
                    <circle cx={cx} cy={cy} r="7" fill="#ef4444" className="animate-pulse" />
                    <text x={cx + 10} y={cy - 10} fill="#f8fafc" fontSize="12" fontWeight="bold">
                      State ({dbTemp}°C, {(humidityRatio * 1000).toFixed(1)}g/kg)
                    </text>
                  </g>
                );
              })()}

              <text x="220" y="280" fill="#94a3b8" fontSize="11" fontWeight="bold">Dry-Bulb Temperature (°C)</text>
              <text x="10" y="150" fill="#94a3b8" fontSize="11" fontWeight="bold" transform="rotate(-90 20,150)">Humidity Ratio w (g/kg)</text>
            </svg>

            <p className="text-[11px] text-slate-500 text-center max-w-md">
              Drag the temperature and relative humidity sliders to see how state point moves along moisture lines.
            </p>
          </div>
        </div>
      )}

      {/* Simulator 2: Tractor 3-Point Hitch Mechanics */}
      {activeSim === 'tractor' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-5 shadow-xs">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-purple-500" />
              <span>Implement & Force Controls</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Soil Draft Force ({draftForce} kN)</span>
                  <span className="text-purple-500 font-mono">{draftForce} kN</span>
                </div>
                <input type="range" min="2" max="30" value={draftForce} onChange={(e) => setDraftForce(Number(e.target.value))} className="w-full accent-purple-500 cursor-pointer" />
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Implement Weight ({implementWeight} kN)</span>
                  <span className="text-purple-500 font-mono">{implementWeight} kN</span>
                </div>
                <input type="range" min="1" max="15" value={implementWeight} onChange={(e) => setImplementWeight(Number(e.target.value))} className="w-full accent-purple-500 cursor-pointer" />
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Operating Speed ({speedKmh} km/h)</span>
                  <span className="text-purple-500 font-mono">{speedKmh} km/h</span>
                </div>
                <input type="range" min="2" max="12" value={speedKmh} onChange={(e) => setSpeedKmh(Number(e.target.value))} className="w-full accent-purple-500 cursor-pointer" />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2 text-xs font-mono">
              <div className="font-bold text-slate-400 uppercase text-[10px]">Hitch Mechanics Output</div>
              <div>Top Link Force: <strong className={topLinkForce > 0 ? 'text-rose-500' : 'text-emerald-500'}>{Math.abs(topLinkForce).toFixed(2)} kN ({topLinkForce > 0 ? 'Compression' : 'Tension'})</strong></div>
              <div>Lower Link Force: <strong className="text-purple-500">{lowerLinkForce.toFixed(2)} kN</strong></div>
              <div>Drawbar Power: <strong className="text-amber-500">{hitchDrawbarPowerKw.toFixed(2)} kW</strong></div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col items-center justify-center space-y-4 shadow-xs">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">2D Vector Diagram: Tractor Hitch Forces</div>

            <svg viewBox="0 0 500 260" className="w-full max-w-lg bg-slate-950 rounded-2xl border border-slate-800 p-2">
              {/* Tractor Body Representation */}
              <rect x="50" y="100" width="180" height="90" rx="10" fill="#1e293b" stroke="#475569" strokeWidth="2" />
              <circle cx="90" cy="190" r="35" fill="#334155" stroke="#64748b" strokeWidth="4" />
              <circle cx="190" cy="190" r="45" fill="#334155" stroke="#64748b" strokeWidth="4" />

              {/* Implement Box */}
              <rect x="340" y="130" width="100" height="70" rx="6" fill="#78350f" stroke="#b45309" strokeWidth="2" />

              {/* Top Link Vector */}
              <line x1="230" y1="120" x2="340" y2="135" stroke="#ec4899" strokeWidth="4" />
              {/* Lower Link Vector */}
              <line x1="230" y1="160" x2="340" y2="175" stroke="#3b82f6" strokeWidth="4" />

              {/* Draft Force Arrow */}
              <line x1="390" y1="200" x2="300" y2="200" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow)" />
              <text x="310" y="220" fill="#ef4444" fontSize="12" fontWeight="bold">Draft D = {draftForce} kN</text>

              <text x="240" y="110" fill="#ec4899" fontSize="11" fontWeight="bold">Top Link</text>
              <text x="240" y="185" fill="#3b82f6" fontSize="11" fontWeight="bold">Lower Link</text>
            </svg>
          </div>
        </div>
      )}

      {/* Simulator 3: Watershed Runoff Hydrograph */}
      {activeSim === 'hydrograph' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-5 shadow-xs">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-500" />
              <span>Hydrologic Controls</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Rainfall Intensity ({rainfallIntensity} mm/h)</span>
                  <span className="text-emerald-500 font-mono">{rainfallIntensity} mm/h</span>
                </div>
                <input type="range" min="10" max="120" value={rainfallIntensity} onChange={(e) => setRainfallIntensity(Number(e.target.value))} className="w-full accent-emerald-500 cursor-pointer" />
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Watershed Area ({watershedArea} ha)</span>
                  <span className="text-emerald-500 font-mono">{watershedArea} ha</span>
                </div>
                <input type="range" min="10" max="500" value={watershedArea} onChange={(e) => setWatershedArea(Number(e.target.value))} className="w-full accent-emerald-500 cursor-pointer" />
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Runoff Coeff C ({runoffCoeff})</span>
                  <span className="text-emerald-500 font-mono">{runoffCoeff}</span>
                </div>
                <input type="range" min="0.1" max="0.9" step="0.05" value={runoffCoeff} onChange={(e) => setRunoffCoeff(Number(e.target.value))} className="w-full accent-emerald-500 cursor-pointer" />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2 text-xs font-mono">
              <div className="font-bold text-slate-400 uppercase text-[10px]">Peak Hydrograph Output</div>
              <div>Rational Formula: <strong>Q = (C·I·A)/360</strong></div>
              <div>Peak Discharge Q: <strong className="text-emerald-500 text-sm">{peakDischargeQ.toFixed(2)} m³/s</strong></div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col items-center justify-center space-y-4 shadow-xs">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hydrograph Discharge Curve (Q vs Time)</div>

            <svg viewBox="0 0 500 240" className="w-full max-w-lg bg-slate-950 rounded-2xl border border-slate-800 p-2">
              <line x1="50" y1="200" x2="450" y2="200" stroke="#334155" strokeWidth="2" />
              <line x1="50" y1="40" x2="50" y2="200" stroke="#334155" strokeWidth="2" />

              {/* Hydrograph Curve */}
              {(() => {
                const peakY = 200 - Math.min(150, (peakDischargeQ / 20) * 150);
                return (
                  <g>
                    <path d={`M 50 200 C 150 200, 200 ${peakY}, 230 ${peakY} C 280 ${peakY}, 350 180, 450 200`} fill="none" stroke="#10b981" strokeWidth="4" />
                    <circle cx="230" cy={peakY} r="6" fill="#10b981" className="animate-ping" />
                    <text x="240" y={peakY - 10} fill="#10b981" fontSize="12" fontWeight="bold">Peak Q = {peakDischargeQ.toFixed(2)} m³/s</text>
                  </g>
                );
              })()}

              <text x="210" y="230" fill="#94a3b8" fontSize="11" fontWeight="bold">Time (Hours)</text>
              <text x="15" y="120" fill="#94a3b8" fontSize="11" fontWeight="bold" transform="rotate(-90 20,120)">Discharge Q (m³/s)</text>
            </svg>
          </div>
        </div>
      )}

      {/* Simulator 4: Tractor X-Ray Anatomy & Power Kinetics */}
      {activeSim === 'xray' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-5 shadow-xs">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-500" />
              <span>Engine & Power Train Controls</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Engine Speed N ({engineRpm} RPM)</span>
                  <span className="text-amber-500 font-mono">{engineRpm} RPM</span>
                </div>
                <input type="range" min="1000" max="3000" step="50" value={engineRpm} onChange={(e) => setEngineRpm(Number(e.target.value))} className="w-full accent-amber-500 cursor-pointer" />
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Engine Torque T ({engineTorque} N·m)</span>
                  <span className="text-amber-500 font-mono">{engineTorque} N·m</span>
                </div>
                <input type="range" min="150" max="600" step="10" value={engineTorque} onChange={(e) => setEngineTorque(Number(e.target.value))} className="w-full accent-amber-500 cursor-pointer" />
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Field Travel Speed V ({fieldSpeed} km/h)</span>
                  <span className="text-amber-500 font-mono">{fieldSpeed} km/h</span>
                </div>
                <input type="range" min="2" max="15" step="0.5" value={fieldSpeed} onChange={(e) => setFieldSpeed(Number(e.target.value))} className="w-full accent-amber-500 cursor-pointer" />
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Drive Wheel Slip S ({wheelSlip}%)</span>
                  <span className="text-amber-500 font-mono">{wheelSlip}%</span>
                </div>
                <input type="range" min="2" max="35" step="1" value={wheelSlip} onChange={(e) => setWheelSlip(Number(e.target.value))} className="w-full accent-amber-500 cursor-pointer" />
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Implement Width W ({implWidth} m)</span>
                  <span className="text-amber-500 font-mono">{implWidth} m</span>
                </div>
                <input type="range" min="1.0" max="5.0" step="0.1" value={implWidth} onChange={(e) => setImplWidth(Number(e.target.value))} className="w-full accent-amber-500 cursor-pointer" />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2 text-xs font-mono">
              <div className="font-bold text-slate-400 uppercase text-[10px]">Tractor Power Output Derivation</div>
              <div>Brake Power BP: <strong className="text-amber-500">{brakePowerKw.toFixed(2)} kW</strong></div>
              <div>PTO Shaft Power: <strong className="text-cyan-400">{ptoPowerKw.toFixed(2)} kW</strong></div>
              <div>Theoretical Speed V₀: <strong className="text-blue-400">{theoreticalSpeedKmh.toFixed(2)} km/h</strong></div>
              <div>Drawbar Power DBP: <strong className="text-purple-400">{drawbarPowerKw.toFixed(2)} kW</strong></div>
              <div>Field Capacity EFC: <strong className="text-emerald-400">{effFieldCapHaHr.toFixed(2)} ha/hr</strong></div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col items-center justify-center space-y-4 shadow-xs">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tractor X-Ray Interactive System Anatomy</div>

            <svg viewBox="0 0 550 280" className="w-full max-w-xl bg-slate-950 rounded-2xl border border-slate-800 p-3">
              {/* Chassis Outline */}
              <path d="M 80 180 L 160 180 L 190 120 L 320 120 L 350 160 L 460 160 L 460 210 L 80 210 Z" fill="#0f172a" stroke="#334155" strokeWidth="2" strokeDasharray="4,4" />

              {/* Front Wheel */}
              <circle cx="140" cy="210" r="35" fill="#1e293b" stroke="#38bdf8" strokeWidth="3" />
              <circle cx="140" cy="210" r="15" fill="#0284c7" />

              {/* Rear Wheel (Drive Wheel) */}
              <circle cx="400" cy="200" r="60" fill="#1e293b" stroke="#f59e0b" strokeWidth="4" />
              <circle cx="400" cy="200" r="25" fill="#d97706" />

              {/* Engine Block Glowing X-Ray Component */}
              <rect x="180" y="130" width="80" height="50" rx="6" fill="#7f1d1d" stroke="#ef4444" strokeWidth="2" />
              <text x="190" y="160" fill="#fca5a5" fontSize="11" fontWeight="bold">ENGINE</text>
              <text x="188" y="172" fill="#f87171" fontSize="9" fontFamily="monospace">{engineRpm} RPM</text>

              {/* Transmission & Gearbox */}
              <rect x="270" y="140" width="60" height="40" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
              <text x="275" y="165" fill="#c7d2fe" fontSize="10" fontWeight="bold">GEARBOX</text>

              {/* PTO Shaft Vector */}
              <line x1="330" y1="175" x2="470" y2="175" stroke="#22d3ee" strokeWidth="4" strokeDasharray="6,3" />
              <text x="475" y="178" fill="#22d3ee" fontSize="10" fontWeight="bold">PTO</text>

              {/* Hydraulic Linkage Lines */}
              <line x1="400" y1="140" x2="480" y2="120" stroke="#ec4899" strokeWidth="3" />
              <line x1="400" y1="160" x2="480" y2="150" stroke="#ec4899" strokeWidth="3" />
              <text x="485" y="135" fill="#f472b6" fontSize="10" fontWeight="bold">3P HITCH</text>

              {/* Floating Real-time Labels */}
              <g transform="translate(20, 20)">
                <rect width="160" height="45" rx="8" fill="#1e293b" opacity="0.9" stroke="#f59e0b" strokeWidth="1" />
                <text x="10" y="18" fill="#fbbf24" fontSize="10" fontWeight="bold">Brake Power BP</text>
                <text x="10" y="35" fill="#ffffff" fontSize="13" fontWeight="bold" fontFamily="monospace">{brakePowerKw.toFixed(2)} kW</text>
              </g>

              <g transform="translate(370, 20)">
                <rect width="160" height="45" rx="8" fill="#1e293b" opacity="0.9" stroke="#34d399" strokeWidth="1" />
                <text x="10" y="18" fill="#34d399" fontSize="10" fontWeight="bold">Field Capacity EFC</text>
                <text x="10" y="35" fill="#ffffff" fontSize="13" fontWeight="bold" fontFamily="monospace">{effFieldCapHaHr.toFixed(2)} ha/hr</text>
              </g>
            </svg>

            <div className="text-center text-xs text-slate-400 max-w-md">
              Adjust sliders on the left to see live X-Ray power transmission kinetics and field capacity equations derived in real-time.
            </div>
          </div>
        </div>
      )}

      {/* Simulator 5: Seed Drill & Planter Calibration */}
      {activeSim === 'seedmetering' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-5 shadow-xs">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-500" />
              <span>Calibration Parameters</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Collected Seed Mass ({seedGrams} g)</span>
                  <span className="text-indigo-500 font-mono">{(seedGrams / 1000).toFixed(3)} kg</span>
                </div>
                <input 
                  type="range" min="50" max="2500" step="10" 
                  value={seedGrams} onChange={(e) => setSeedGrams(Number(e.target.value))} 
                  className="w-full accent-indigo-600 cursor-pointer" 
                />
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Wheel Revolutions ({seedRevs} revs)</span>
                  <span className="text-indigo-500 font-mono">{seedRevs} N</span>
                </div>
                <input 
                  type="range" min="10" max="150" step="5" 
                  value={seedRevs} onChange={(e) => setSeedRevs(Number(e.target.value))} 
                  className="w-full accent-indigo-600 cursor-pointer" 
                />
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Drive Wheel Diameter ({wheelDia} m)</span>
                  <span className="text-indigo-500 font-mono">{wheelDia} m</span>
                </div>
                <input 
                  type="range" min="0.5" max="1.4" step="0.05" 
                  value={wheelDia} onChange={(e) => setWheelDia(Number(e.target.value))} 
                  className="w-full accent-indigo-600 cursor-pointer" 
                />
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Number of Furrow Openers ({openersCount})</span>
                  <span className="text-indigo-500 font-mono">{openersCount} boots</span>
                </div>
                <input 
                  type="range" min="3" max="21" step="1" 
                  value={openersCount} onChange={(e) => setOpenersCount(Number(e.target.value))} 
                  className="w-full accent-indigo-600 cursor-pointer" 
                />
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Row Spacing ({Math.round(rowSpacingM * 100)} cm)</span>
                  <span className="text-indigo-500 font-mono">{rowSpacingM} m</span>
                </div>
                <input 
                  type="range" min="0.10" max="0.75" step="0.02" 
                  value={rowSpacingM} onChange={(e) => setRowSpacingM(Number(e.target.value))} 
                  className="w-full accent-indigo-600 cursor-pointer" 
                />
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Field Drive Wheel Slip ({seedSlipPct}%)</span>
                  <span className="text-indigo-500 font-mono">{seedSlipPct}%</span>
                </div>
                <input 
                  type="range" min="0" max="25" step="1" 
                  value={seedSlipPct} onChange={(e) => setSeedSlipPct(Number(e.target.value))} 
                  className="w-full accent-indigo-600 cursor-pointer" 
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-2 text-xs font-mono">
              <div className="font-bold text-indigo-600 dark:text-indigo-400 uppercase text-[10px]">Calibration Derivation</div>
              <div>Wheel Circumference: <strong className="text-slate-900 dark:text-white">{groundWheelCircum.toFixed(3)} m</strong></div>
              <div>Test Distance (L): <strong className="text-slate-900 dark:text-white">{testDistanceM.toFixed(1)} m</strong></div>
              <div>Working Width (W): <strong className="text-slate-900 dark:text-white">{machineWidthM.toFixed(2)} m</strong></div>
              <div>Laboratory Seed Rate: <strong className="text-indigo-600 dark:text-indigo-400">{labSeedRateKgHa.toFixed(2)} kg/ha</strong></div>
              <div>Field Rate (with slip): <strong className="text-emerald-600 dark:text-emerald-400">{effectiveFieldSeedRateKgHa.toFixed(2)} kg/ha</strong></div>
            </div>
          </div>

          {/* Interactive SVG Seed Drill Schema */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col items-center justify-center space-y-4 shadow-xs">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Seed Metering Fluted Roller & Ground Wheel Mechanism
            </div>

            <svg viewBox="0 0 550 300" className="w-full max-w-xl bg-slate-950 rounded-2xl border border-slate-800 p-3">
              {/* Ground & Soil Furrow */}
              <rect x="0" y="220" width="550" height="80" fill="#292524" />
              <line x1="0" y1="220" x2="550" y2="220" stroke="#78716c" strokeWidth="2" strokeDasharray="6,4" />

              {/* Seed Drill Hopper */}
              <polygon points="180,60 380,60 340,140 220,140" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
              <text x="245" y="95" fill="#a5b4fc" fontSize="12" fontWeight="bold">SEED HOPPER</text>
              <text x="248" y="115" fill="#818cf8" fontSize="10" fontFamily="monospace">Wheat / Cereal Seed</text>

              {/* Fluted Roller Mechanism Box */}
              <rect x="235" y="140" width="90" height="35" rx="6" fill="#312e81" stroke="#818cf8" strokeWidth="2" />
              <circle cx="280" cy="157" r="10" fill="#f59e0b" />
              <text x="245" y="161" fill="#fef08a" fontSize="9" fontWeight="bold">METERING</text>

              {/* Seed Tubes */}
              <path d="M 255 175 L 180 230" stroke="#94a3b8" strokeWidth="3" fill="none" />
              <path d="M 280 175 L 280 230" stroke="#94a3b8" strokeWidth="3" fill="none" />
              <path d="M 305 175 L 380 230" stroke="#94a3b8" strokeWidth="3" fill="none" />

              {/* Dropped Seeds in Furrow */}
              <circle cx="180" cy="235" r="3.5" fill="#f59e0b" />
              <circle cx="215" cy="235" r="3.5" fill="#f59e0b" />
              <circle cx="250" cy="235" r="3.5" fill="#f59e0b" />
              <circle cx="280" cy="235" r="3.5" fill="#f59e0b" />
              <circle cx="315" cy="235" r="3.5" fill="#f59e0b" />
              <circle cx="350" cy="235" r="3.5" fill="#f59e0b" />
              <circle cx="380" cy="235" r="3.5" fill="#f59e0b" />

              {/* Ground Wheel */}
              <circle cx="90" cy="190" r="50" fill="none" stroke="#64748b" strokeWidth="6" strokeDasharray="12,6" />
              <circle cx="90" cy="190" r="12" fill="#475569" stroke="#94a3b8" strokeWidth="2" />
              <text x="50" y="194" fill="#cbd5e1" fontSize="9" fontWeight="bold">WHEEL (D={wheelDia}m)</text>

              {/* Chain Drive Transmission from Ground Wheel to Metering */}
              <line x1="90" y1="190" x2="235" y2="157" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4,2" />

              {/* Dynamic Labels */}
              <g transform="translate(370, 20)">
                <rect width="165" height="52" rx="8" fill="#1e293b" opacity="0.9" stroke="#6366f1" strokeWidth="1" />
                <text x="12" y="20" fill="#a5b4fc" fontSize="10" fontWeight="bold">Field Seed Rate</text>
                <text x="12" y="40" fill="#38bdf8" fontSize="14" fontWeight="bold" fontFamily="monospace">
                  {effectiveFieldSeedRateKgHa.toFixed(1)} kg/ha
                </text>
              </g>

              <g transform="translate(20, 20)">
                <rect width="150" height="52" rx="8" fill="#1e293b" opacity="0.9" stroke="#10b981" strokeWidth="1" />
                <text x="12" y="20" fill="#6ee7b7" fontSize="10" fontWeight="bold">Theoretical In-Row Spacing</text>
                <text x="12" y="40" fill="#ffffff" fontSize="14" fontWeight="bold" fontFamily="monospace">
                  {seedSpacingCm.toFixed(1)} cm
                </text>
              </g>
            </svg>

            <div className="text-center text-xs text-slate-400 max-w-md">
              In laboratory calibration, effective field seed rate is lower by (1 - s/100) due to drive ground wheel slip on loose seedbeds.
            </div>
          </div>
        </div>
      )}

      {/* Simulator 6: Thermodynamic Cycles (Otto & Diesel PV Explorer) */}
      {activeSim === 'enginecycle' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-5 shadow-xs">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-rose-500" />
                <span>Cycle Parameters</span>
              </span>
              <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-0.5 border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => { setCycleType('diesel'); setCompRatio(17.5); }}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition ${
                    cycleType === 'diesel' ? 'bg-rose-600 text-white' : 'text-slate-500'
                  }`}
                >
                  Diesel
                </button>
                <button
                  onClick={() => { setCycleType('otto'); setCompRatio(9.5); }}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition ${
                    cycleType === 'otto' ? 'bg-rose-600 text-white' : 'text-slate-500'
                  }`}
                >
                  Otto
                </button>
              </div>
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Compression Ratio r ({compRatio}:1)</span>
                  <span className="text-rose-500 font-mono">{compRatio}</span>
                </div>
                <input 
                  type="range" min={cycleType === 'diesel' ? 14 : 6} max={cycleType === 'diesel' ? 24 : 13} step="0.5" 
                  value={compRatio} onChange={(e) => setCompRatio(Number(e.target.value))} 
                  className="w-full accent-rose-600 cursor-pointer" 
                />
              </div>

              {cycleType === 'diesel' && (
                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Cut-off Ratio rc ({cutoffRatio})</span>
                    <span className="text-rose-500 font-mono">{cutoffRatio}</span>
                  </div>
                  <input 
                    type="range" min="1.2" max="3.5" step="0.1" 
                    value={cutoffRatio} onChange={(e) => setCutoffRatio(Number(e.target.value))} 
                    className="w-full accent-rose-600 cursor-pointer" 
                  />
                </div>
              )}

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Cylinder Bore B ({boreMm} mm)</span>
                  <span className="text-rose-500 font-mono">{boreMm} mm</span>
                </div>
                <input 
                  type="range" min="70" max="150" step="5" 
                  value={boreMm} onChange={(e) => setBoreMm(Number(e.target.value))} 
                  className="w-full accent-rose-600 cursor-pointer" 
                />
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Stroke Length L ({strokeMm} mm)</span>
                  <span className="text-rose-500 font-mono">{strokeMm} mm</span>
                </div>
                <input 
                  type="range" min="80" max="180" step="5" 
                  value={strokeMm} onChange={(e) => setStrokeMm(Number(e.target.value))} 
                  className="w-full accent-rose-600 cursor-pointer" 
                />
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Intake Manifold Pressure P1 ({p1Bar} bar)</span>
                  <span className="text-rose-500 font-mono">{p1Bar} bar</span>
                </div>
                <input 
                  type="range" min="0.8" max="2.5" step="0.1" 
                  value={p1Bar} onChange={(e) => setP1Bar(Number(e.target.value))} 
                  className="w-full accent-rose-600 cursor-pointer" 
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-2 text-xs font-mono">
              <div className="font-bold text-rose-600 dark:text-rose-400 uppercase text-[10px]">Thermodynamic Outputs</div>
              <div>Swept Volume (Vs): <strong className="text-slate-900 dark:text-white">{sweptVolCm3.toFixed(1)} cm³</strong></div>
              <div>Clearance Volume (Vc): <strong className="text-slate-900 dark:text-white">{clearVolCm3.toFixed(1)} cm³</strong></div>
              <div>Compression Pressure P2: <strong className="text-slate-900 dark:text-white">{p2Bar.toFixed(1)} bar</strong></div>
              <div>Peak Pressure P3: <strong className="text-rose-600 dark:text-rose-400">{p3Bar.toFixed(1)} bar</strong></div>
              <div>Thermal Efficiency η_th: <strong className="text-emerald-600 dark:text-emerald-400">{thermalEffPct.toFixed(2)}%</strong></div>
            </div>
          </div>

          {/* Interactive PV Diagram */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col items-center justify-center space-y-4 shadow-xs">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {cycleType.toUpperCase()} Air Standard Indicator P-V Diagram
            </div>

            <svg viewBox="0 0 500 300" className="w-full max-w-lg bg-slate-950 rounded-2xl border border-slate-800 p-4">
              {/* Axes */}
              <line x1="60" y1="250" x2="460" y2="250" stroke="#64748b" strokeWidth="2" />
              <line x1="60" y1="250" x2="60" y2="30" stroke="#64748b" strokeWidth="2" />
              <text x="440" y="270" fill="#94a3b8" fontSize="10" fontWeight="bold">Volume V</text>
              <text x="25" y="45" fill="#94a3b8" fontSize="10" fontWeight="bold">P</text>

              {/* Coordinates:
                  State 1 (BDC intake): high V, low P (e.g., 400, 230)
                  State 2 (TDC end of comp): low V, high P (e.g., 140, 100)
                  State 3 (Peak combustion):
                    Diesel: isobaric (same P, higher V): (180, 100)
                    Otto: isochoric (same V, higher P): (140, 50)
                  State 4 (Blowdown): high V, medium P (e.g., 400, 170)
              */}
              {cycleType === 'diesel' ? (
                <>
                  {/* Shaded Work Area */}
                  <polygon 
                    points="400,230 140,100 200,100 400,180" 
                    fill="#ef4444" fillOpacity="0.2" stroke="none" 
                  />
                  {/* Process Lines */}
                  {/* 1 -> 2 Compression */}
                  <path d="M 400 230 Q 220 220 140 100" stroke="#38bdf8" strokeWidth="3" fill="none" />
                  {/* 2 -> 3 Constant Pressure Heat Addition */}
                  <line x1="140" y1="100" x2="200" y2="100" stroke="#f43f5e" strokeWidth="4" />
                  {/* 3 -> 4 Expansion */}
                  <path d="M 200 100 Q 280 140 400 180" stroke="#34d399" strokeWidth="3" fill="none" />
                  {/* 4 -> 1 Constant Volume Heat Rejection */}
                  <line x1="400" y1="180" x2="400" y2="230" stroke="#fbbf24" strokeWidth="3" strokeDasharray="4,2" />

                  {/* State Node Circles */}
                  <circle cx="400" cy="230" r="5" fill="#38bdf8" />
                  <text x="412" y="235" fill="#38bdf8" fontSize="11" fontWeight="bold">1 (BDC)</text>

                  <circle cx="140" cy="100" r="5" fill="#f43f5e" />
                  <text x="85" y="98" fill="#f43f5e" fontSize="11" fontWeight="bold">2 (TDC)</text>

                  <circle cx="200" cy="100" r="5" fill="#f43f5e" />
                  <text x="195" y="85" fill="#f43f5e" fontSize="11" fontWeight="bold">3 (Cut-off)</text>

                  <circle cx="400" cy="180" r="5" fill="#34d399" />
                  <text x="412" y="180" fill="#34d399" fontSize="11" fontWeight="bold">4 (EVO)</text>
                </>
              ) : (
                <>
                  {/* Otto Cycle */}
                  <polygon 
                    points="400,230 140,110 140,50 400,170" 
                    fill="#ef4444" fillOpacity="0.2" stroke="none" 
                  />
                  {/* 1 -> 2 Compression */}
                  <path d="M 400 230 Q 220 220 140 110" stroke="#38bdf8" strokeWidth="3" fill="none" />
                  {/* 2 -> 3 Constant Volume Spark */}
                  <line x1="140" y1="110" x2="140" y2="50" stroke="#f43f5e" strokeWidth="4" />
                  {/* 3 -> 4 Expansion */}
                  <path d="M 140 50 Q 240 110 400 170" stroke="#34d399" strokeWidth="3" fill="none" />
                  {/* 4 -> 1 Constant Volume Heat Rejection */}
                  <line x1="400" y1="170" x2="400" y2="230" stroke="#fbbf24" strokeWidth="3" strokeDasharray="4,2" />

                  <circle cx="400" cy="230" r="5" fill="#38bdf8" />
                  <text x="412" y="235" fill="#38bdf8" fontSize="11" fontWeight="bold">1 (BDC)</text>

                  <circle cx="140" cy="110" r="5" fill="#f43f5e" />
                  <text x="80" y="115" fill="#f43f5e" fontSize="11" fontWeight="bold">2 (TDC)</text>

                  <circle cx="140" cy="50" r="5" fill="#f43f5e" />
                  <text x="80" y="55" fill="#f43f5e" fontSize="11" fontWeight="bold">3 (Peak)</text>

                  <circle cx="400" cy="170" r="5" fill="#34d399" />
                  <text x="412" y="170" fill="#34d399" fontSize="11" fontWeight="bold">4 (EVO)</text>
                </>
              )}

              {/* Floating Stat Badges */}
              <g transform="translate(180, 240)">
                <text x="0" y="0" fill="#a1a1aa" fontSize="10" fontFamily="monospace">
                  Enclosed Area = Net Indicated Work
                </text>
              </g>
            </svg>

            <div className="text-center text-xs text-slate-400 max-w-md">
              In Diesel engines, heat addition (2→3) is constant pressure; increasing cut-off ratio r_c decreases air standard thermal efficiency for a fixed compression ratio.
            </div>
          </div>
        </div>
      )}

      {/* Simulator 7: Combine Harvester Cylinder-Concave Loss Dynamics */}
      {activeSim === 'combineharvester' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-5 shadow-xs">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-500" />
              <span>Harvester Settings</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Cylinder RPM ({cylRpm} RPM)</span>
                  <span className="text-cyan-500 font-mono">{cylRpm}</span>
                </div>
                <input 
                  type="range" min="450" max="1300" step="25" 
                  value={cylRpm} onChange={(e) => setCylRpm(Number(e.target.value))} 
                  className="w-full accent-cyan-600 cursor-pointer" 
                />
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Cylinder Diameter ({cylDiaM} m)</span>
                  <span className="text-cyan-500 font-mono">{cylDiaM} m</span>
                </div>
                <input 
                  type="range" min="0.45" max="0.80" step="0.05" 
                  value={cylDiaM} onChange={(e) => setCylDiaM(Number(e.target.value))} 
                  className="w-full accent-cyan-600 cursor-pointer" 
                />
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Concave Clearance ({concaveGapMm} mm)</span>
                  <span className="text-cyan-500 font-mono">{concaveGapMm} mm</span>
                </div>
                <input 
                  type="range" min="6" max="25" step="1" 
                  value={concaveGapMm} onChange={(e) => setConcaveGapMm(Number(e.target.value))} 
                  className="w-full accent-cyan-600 cursor-pointer" 
                />
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Crop Feed Rate ({cropFeedRateKgS} kg/s)</span>
                  <span className="text-cyan-500 font-mono">{cropFeedRateKgS} kg/s</span>
                </div>
                <input 
                  type="range" min="1.5" max="8.0" step="0.5" 
                  value={cropFeedRateKgS} onChange={(e) => setCropFeedRateKgS(Number(e.target.value))} 
                  className="w-full accent-cyan-600 cursor-pointer" 
                />
              </div>

              <div>
                <div className="flex justify-between font-bold mb-1">
                  <span>Grain Moisture ({grainMoisturePct}% w.b.)</span>
                  <span className="text-cyan-500 font-mono">{grainMoisturePct}%</span>
                </div>
                <input 
                  type="range" min="11" max="26" step="1" 
                  value={grainMoisturePct} onChange={(e) => setGrainMoisturePct(Number(e.target.value))} 
                  className="w-full accent-cyan-600 cursor-pointer" 
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 space-y-2 text-xs font-mono">
              <div className="font-bold text-cyan-600 dark:text-cyan-400 uppercase text-[10px]">Harvesting Performance</div>
              <div>Peripheral Speed (vp): <strong className="text-cyan-600 dark:text-cyan-400">{peripheralSpeedMs.toFixed(1)} m/s</strong></div>
              <div>Threshing Efficiency: <strong className="text-emerald-600 dark:text-emerald-400">{threshingEffPct.toFixed(1)}%</strong></div>
              <div>Unthreshed Grain Loss: <strong className="text-amber-500">{unthreshedLossPct.toFixed(2)}%</strong></div>
              <div>Grain Crackage / Damage: <strong className="text-rose-500">{grainCrackagePct.toFixed(2)}%</strong></div>
              <div>Walker Separation: <strong className="text-slate-900 dark:text-white">{walkerSeparationEff.toFixed(1)}%</strong></div>
            </div>
          </div>

          {/* Interactive Trade-Off Curve SVG */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col items-center justify-center space-y-4 shadow-xs">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Cylinder Speed vs. Threshing Loss &amp; Grain Damage Trade-Off
            </div>

            <svg viewBox="0 0 520 280" className="w-full max-w-lg bg-slate-950 rounded-2xl border border-slate-800 p-4">
              {/* Axes */}
              <line x1="60" y1="220" x2="480" y2="220" stroke="#64748b" strokeWidth="2" />
              <line x1="60" y1="220" x2="60" y2="30" stroke="#64748b" strokeWidth="2" />
              <text x="360" y="240" fill="#94a3b8" fontSize="10" fontWeight="bold">Peripheral Speed (m/s) →</text>
              <text x="15" y="45" fill="#94a3b8" fontSize="10" fontWeight="bold">Loss %</text>

              {/* Optimal Operating Band (25 - 32 m/s for wheat) */}
              <rect x="200" y="30" width="120" height="190" fill="#10b981" fillOpacity="0.12" stroke="#10b981" strokeDasharray="4,4" strokeWidth="1" />
              <text x="210" y="50" fill="#34d399" fontSize="10" fontWeight="bold">OPTIMAL WINDOW</text>

              {/* Curve 1: Unthreshed Loss (drops as speed increases) */}
              <path d="M 80 190 Q 180 180 260 90 T 460 40" stroke="#3b82f6" strokeWidth="3" fill="none" />
              <text x="360" y="70" fill="#60a5fa" fontSize="10" fontWeight="bold">Threshing Efficiency ↑</text>

              {/* Curve 2: Grain Damage (shoots up at high speeds) */}
              <path d="M 80 215 Q 260 210 340 160 T 460 45" stroke="#f43f5e" strokeWidth="3" fill="none" />
              <text x="360" y="130" fill="#f87171" fontSize="10" fontWeight="bold">Grain Crackage ↑</text>

              {/* Current Speed Marker Line */}
              {(() => {
                const markerX = Math.max(70, Math.min(470, 60 + ((peripheralSpeedMs - 15) / 25) * 400));
                return (
                  <g>
                    <line x1={markerX} y1="30" x2={markerX} y2="220" stroke="#fbbf24" strokeWidth="2" strokeDasharray="5,3" />
                    <circle cx={markerX} cy="140" r="6" fill="#f59e0b" />
                    <text x={markerX - 35} y="25" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="monospace">
                      vp = {peripheralSpeedMs.toFixed(1)} m/s
                    </text>
                  </g>
                );
              })()}
            </svg>

            {/* Performance Diagnosis Card */}
            <div className={`w-full max-w-lg p-3 rounded-2xl border flex items-center gap-3 text-xs font-medium ${
              peripheralSpeedMs >= 26 && peripheralSpeedMs <= 32
                ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                : peripheralSpeedMs > 32
                ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300'
                : 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300'
            }`}>
              {peripheralSpeedMs >= 26 && peripheralSpeedMs <= 32 ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>Optimal Cylinder Speed: High threshing recovery with minimal seed coat crackage.</span>
                </>
              ) : peripheralSpeedMs > 32 ? (
                <>
                  <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />
                  <span>High Speed Warning: Severe grain breakage and embryo damage risk (&gt; 32 m/s).</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                  <span>Low Speed Warning: Incomplete threshing; high unthreshed seed heads discharged in straw.</span>
                </>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
