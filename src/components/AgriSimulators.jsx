import React, { useState } from 'react';
import { Sliders, Activity, Compass, Wind, Droplets, Gauge, Cpu, RefreshCcw } from 'lucide-react';
import MathRenderer from './MathRenderer';

export default function AgriSimulators() {
  const [activeSim, setActiveSim] = useState('psychrometric'); // 'psychrometric' | 'tractor' | 'hydrograph'

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

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold">
              <Cpu className="w-3.5 h-3.5" />
              <span>Interactive Engineering Simulators</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Agri-Engineering Physics Interactive Simulators
            </h1>
            <p className="text-xs text-slate-500 max-w-2xl">
              Visualize psychrometric grain drying charts, tractor hitch force vectors, and watershed runoff hydrographs in real-time.
            </p>
          </div>

          {/* Simulator Segmented Control */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-slate-100 dark:bg-slate-950 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 w-full sm:w-auto">
            <button
              onClick={() => setActiveSim('psychrometric')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
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
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
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
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
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
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                activeSim === 'xray'
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Tractor X-Ray 3D</span>
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

    </div>
  );
}
