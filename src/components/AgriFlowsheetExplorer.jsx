import React, { useState } from 'react';
import { 
  GitCommit, 
  Workflow, 
  Layers, 
  Sliders, 
  Info, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  RotateCcw,
  Sparkles,
  Flame,
  Droplets,
  Gauge,
  Wheat,
  Activity
} from 'lucide-react';
import MathRenderer from './MathRenderer';

// 4 Interactive Flowsheets
const FLOWSHEETS = [
  {
    id: 'dryer',
    name: 'Continuous Cross-Flow & Counter-Flow Grain Dryer',
    category: 'Agricultural Processing Engineering',
    tag: 'APFE',
    badge: 'Thermodynamics & Mass Balance',
    description: 'Grain flows downward through a perforated column while heated air is forced perpendicular (cross-flow) or counter-currently through the bed. Key parameters: moisture gradient, thermal efficiency, drying rate constant (k), and moisture ratio (MR).',
    diagramType: 'dryer',
    hotspots: [
      {
        id: 'grain_inlet',
        title: 'Wet Grain Hopper & Elevator',
        pos: { x: 50, y: 12 },
        content: 'Wet paddy or grain enters at high moisture content (typically 22-26% w.b.). Pre-cleaners remove coarse trash and chaff to prevent localized airflow choking.'
      },
      {
        id: 'drying_zone',
        title: 'Heated Air Plenum (Drying Zone)',
        pos: { x: 30, y: 45 },
        content: 'Hot air at 50-65°C is blown through grain columns. Cross-flow dryers develop a steep moisture gradient between the air plenum side and exhaust side.'
      },
      {
        id: 'moisture_ratio',
        title: 'Thin-Layer Moisture Fall (MR = exp(-kt))',
        pos: { x: 50, y: 55 },
        content: 'Moisture Ratio MR = (M - Me)/(Mo - Me). In Page model: MR = exp(-k*t^n). Constant rate drying is absent in grains; entire drying is in the falling rate regime.'
      },
      {
        id: 'cooling_zone',
        title: 'Ambient Air Cooling Zone',
        pos: { x: 50, y: 78 },
        content: 'Cool ambient air lowers grain temperature before discharge to prevent thermal stress cracking and checking, which severely damages head rice recovery.'
      },
      {
        id: 'discharge',
        title: 'Fluted Roller Metering Discharge',
        pos: { x: 50, y: 92 },
        content: 'Discharge rolls rotate to meter dry grain into bottom auger conveyor at 13-14% w.b. safe storage moisture content.'
      }
    ],
    gatePoints: [
      'Moisture Content Basis: M_wb = M_db / (1 + M_db) and M_db = M_wb / (1 - M_wb)',
      'Water removed: W_w = W_dry * (M_db_initial - M_db_final)',
      'Latent heat of vaporization of moisture in grain is higher than free water due to bound hygroscopic moisture.',
      'Thin layer drying models: Lewis/Newton (MR = e^-kt), Page (MR = e^(-k*t^n)), Henderson & Pabis.'
    ]
  },
  {
    id: 'tractor_power',
    name: 'Tractor Powertrain & Transmission Kinematics',
    category: 'Farm Machinery and Power',
    tag: 'FMP',
    badge: 'Power Flow & Speed Reduction',
    description: 'Traces mechanical power from diesel engine crankshaft through friction clutch, transmission gearbox, bevel pinion, differential, final reduction gears, and drive wheels or PTO shaft.',
    diagramType: 'tractor_power',
    hotspots: [
      {
        id: 'engine',
        title: 'Diesel Engine Crankshaft',
        pos: { x: 12, y: 50 },
        content: 'Generates brake power (BHP = 2*pi*N*T / 60000). High torque low speed diesel power plant operating at 1800-2400 rpm.'
      },
      {
        id: 'clutch',
        title: 'Main Friction Clutch (Single / Dual Stage)',
        pos: { x: 28, y: 50 },
        content: 'Transmits torque via dry friction plates. Torque capacity T = mu * W * R_mean * n. Dual stage allows PTO operation uninterrupted by wheel clutching.'
      },
      {
        id: 'gearbox',
        title: 'Multi-Speed Gearbox (Synchromesh / Collar Shift)',
        pos: { x: 45, y: 50 },
        content: 'Provides speed steps (e.g. 8 Forward + 2 Reverse). Speed reduction ratio G = N_in / N_out. Torque multiplies inversely with speed ratio: T_out = T_in * G * eta_trans.'
      },
      {
        id: 'differential',
        title: 'Bevel Crown Wheel & Differential Unit',
        pos: { x: 68, y: 50 },
        content: 'Transfers drive through 90 degrees. Crown wheel and pinion ratio typically 3.5:1 to 5:1. Permits inner and outer rear wheels to rotate at different speeds on turns while equalizing torque.'
      },
      {
        id: 'final_drive',
        title: 'Bull Gear Final Reduction & Rear Axle',
        pos: { x: 88, y: 50 },
        content: 'Spur gear or planetary epicyclic hub reduction (ratio ~4:1 to 6:1) mounted close to drive wheels for final high torque multiplication and low axle speed (15-60 rpm).'
      }
    ],
    gatePoints: [
      'Overall Transmission Ratio: G_total = G_gearbox * G_diff * G_final',
      'Forward Speed: V = (pi * D_rear * N_engine) / (60 * G_total) in m/s',
      'Differential relation on turns: N_left + N_right = 2 * N_crown',
      'Axle Torque: T_axle = T_engine * G_total * eta_mechanical',
      'Drawbar Power: DHP = Draft (kN) * Speed (m/s) <= PTO Power * Tractive Efficiency'
    ]
  },
  {
    id: 'hydraulic_lift',
    name: 'Tractor 3-Point Hitch Hydraulic Control System',
    category: 'Farm Machinery and Power',
    tag: 'FMP',
    badge: 'Draft & Position Control Fluid Circuit',
    description: 'Closed-center or open-center hydraulic system with gear/piston pump, spool valve, ram cylinder, lift arms, and sensing spring on top/lower links for automatic draft and position regulation.',
    diagramType: 'hydraulic_lift',
    hotspots: [
      {
        id: 'pump',
        title: 'Positive Displacement Hydraulic Pump',
        pos: { x: 18, y: 70 },
        content: 'Driven directly from engine timing gear or transmission PTO. Generates high pressure oil (140-210 bar / 14-21 MPa) at flow rates of 25-45 L/min.'
      },
      {
        id: 'spool_valve',
        title: 'Spool Control Valve with Unloader & Relief',
        pos: { x: 42, y: 50 },
        content: 'Directed by operator hand lever and automatic feedback linkages. Directs fluid to ram cylinder for lifting, locks fluid for holding, or dumps fluid to sump for lowering.'
      },
      {
        id: 'draft_sensing',
        title: 'Top Link / Lower Link Draft Sensing Spring',
        pos: { x: 30, y: 25 },
        content: 'When soil resistance increases, compressive load on top link deflects the heavy calibrated sensing spring, displacing control valve spool to raise implement and restore set draft.'
      },
      {
        id: 'ram_cylinder',
        title: 'Single-Acting Ram Cylinder & Cross-Shaft',
        pos: { x: 65, y: 50 },
        content: 'Hydraulic pressure acts on ram piston area: Force F = P * A. Piston pushes cross-shaft crank arm to rotate rockshaft and swing lift arms upward.'
      },
      {
        id: 'three_point',
        title: 'Standard Category I/II Three-Point Linkage',
        pos: { x: 88, y: 35 },
        content: 'Comprises 1 top link (tension or compression depending on draft) and 2 lower draft links with lift rods and check chains/stabilizers to attach mounted and semi-mounted implements.'
      }
    ],
    gatePoints: [
      'Position Control: Maintains constant implement height relative to tractor chassis regardless of soil load changes (ideal for sprayers, seed drills, mowers).',
      'Draft Control: Automatically maintains constant drawbar pull in varying soil textures (ideal for moldboard plows, subsoilers, disc harrows).',
      'Lift Capacity: Theoretical Lift Force = Hydraulic Pressure * Ram Area * Mechanical Arm Ratio.',
      'ASAE Hitch Categories: Cat I (20-45 hp, hitch pin dia 19mm/22.4mm), Cat II (40-100 hp, pin dia 25.4mm/28.6mm).'
    ]
  },
  {
    id: 'paddy_milling',
    name: 'Paddy Parboiling & Modern Rice Milling Flowsheet',
    category: 'Agricultural Processing Engineering',
    tag: 'APFE',
    badge: 'Hydrothermal Treatment & Dehusking',
    description: 'Step-by-step unit operations from raw rough rice (paddy) cleaning, soaking, steaming, drying (CFTRI/CFTRI pressure process), dehusking (rubber roll), separator, polishing/whitening, to grading.',
    diagramType: 'paddy_milling',
    hotspots: [
      {
        id: 'cleaning',
        title: 'Vibratory Screen Pre-Cleaner & Destoner',
        pos: { x: 10, y: 50 },
        content: 'Removes stones, sand, clay lumps, metallic particles, straw, and unfilled chaff using size differences and specific gravity pneumatic separation.'
      },
      {
        id: 'parboiling',
        title: 'Hydrothermal Parboiling (Soak + Steam)',
        pos: { x: 28, y: 50 },
        content: 'Paddy is soaked in hot water (60-70°C) to saturation (~30% d.b.) and steamed at 1-2 kg/cm² for 10-15 min. Gelatinizes starch, seals microscopic fissures, and migrates B-vitamins into endosperm.'
      },
      {
        id: 'dehusking',
        title: 'Rubber Roll Sheller (Dehusker)',
        pos: { x: 50, y: 50 },
        content: 'Two resilient rubber rolls rotating at differential speeds (~1:1.25 ratio) exert shear and compressive forces. Dehusking efficiency 85-90% with minimal broken grain compared to abrasive under-runner discs.'
      },
      {
        id: 'paddy_separator',
        title: 'Compartment / Tray Paddy Separator',
        pos: { x: 70, y: 50 },
        content: 'Separates unhusked paddy from brown rice based on differences in density, surface friction, and buoyancy on an inclined reciprocating table.'
      },
      {
        id: 'polisher',
        title: 'Abrasive Emery Cone & Friction Polisher',
        pos: { x: 88, y: 50 },
        content: 'Removes aleurone and bran layers (5-7% degree of polish). Friction whitening with mist water injection yields high-gloss translucent white rice ready for grading.'
      }
    ],
    gatePoints: [
      'Gelatinization Temperature of Rice Starch: 65°C to 75°C. Parboiling eliminates chalkiness and increases head rice yield (HRY).',
      'Husk separation: Aspirator removes light husk (specific gravity ~0.15) from heavier brown rice and unhusked paddy.',
      'Head Rice Recovery (HRR): Weight of whole grains (>= 75% intact) divided by total milled rice.',
      'Bran by-product contains 15-22% edible rice bran oil (high in oryzanol antioxidant).'
    ]
  }
];

export default function AgriFlowsheetExplorer() {
  const [activeSheetId, setActiveSheetId] = useState('dryer');
  const [selectedHotspot, setSelectedHotspot] = useState(null);

  const activeSheet = FLOWSHEETS.find(f => f.id === activeSheetId) || FLOWSHEETS[0];

  const handleSelectHotspot = (hs) => {
    setSelectedHotspot(hs.id === selectedHotspot?.id ? null : hs);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-200 dark:border-emerald-800/60">
              <Workflow className="w-3.5 h-3.5" />
              <span>Interactive Engineering Flowsheets & Schematics</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              GATE AG System Process Explorer
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl">
              Inspect complex agricultural engineering schematics, power transmission paths, and unit operations with interactive callouts and GATE key points.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">4 Core Systems</span>
          </div>
        </div>

        {/* Flowsheet Switcher Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mt-5">
          {FLOWSHEETS.map((fs) => {
            const isSelected = fs.id === activeSheetId;
            return (
              <button
                key={fs.id}
                onClick={() => {
                  setActiveSheetId(fs.id);
                  setSelectedHotspot(null);
                }}
                className={`flex flex-col text-left p-3.5 rounded-2xl border transition cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                    {fs.tag}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 truncate max-w-[120px]">
                    {fs.badge}
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                  {fs.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Flowsheet Canvas & Deep Dive Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Interactive Schematic Diagram (2 cols on large screen) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                {activeSheet.name}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Click any numbered hotspot pin to inspect physical mechanisms & equations.
              </p>
            </div>
            {selectedHotspot && (
              <button
                onClick={() => setSelectedHotspot(null)}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Pin</span>
              </button>
            )}
          </div>

          {/* SVG Diagram Canvas */}
          <div className="relative w-full aspect-[16/9] min-h-[300px] bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex items-center justify-center p-4">
            
            {/* Background Engineering Grid */}
            <div 
              className="absolute inset-0 opacity-15 pointer-events-none" 
              style={{
                backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)',
                backgroundSize: '24px 24px'
              }}
            />

            {/* Schematic Flow Rendering based on diagramType */}
            {activeSheet.diagramType === 'dryer' && (
              <svg className="w-full h-full" viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Wet Grain Top Hopper */}
                <polygon points="350,30 450,30 430,90 370,90" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
                <text x="400" y="55" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">WET GRAIN INLET</text>
                
                {/* Column Body */}
                <rect x="370" y="90" width="60" height="280" fill="#1e293b" stroke="#64748b" strokeWidth="2" rx="4" />
                
                {/* Perforated drying column baffles */}
                {[120, 150, 180, 210, 240, 270, 300, 330].map((y, i) => (
                  <line key={i} x1="375" y1={y} x2="425" y2={y} stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
                ))}

                {/* Hot Air Plenum (Left) */}
                <polygon points="180,140 330,170 330,250 180,280" fill="#ef4444" fillOpacity="0.25" stroke="#ef4444" strokeWidth="2" />
                <text x="240" y="215" fill="#fca5a5" fontSize="13" fontWeight="bold" textAnchor="middle">HOT AIR PLENUM (55-65°C)</text>
                
                {/* Air Flow Arrows Left to Right */}
                {[180, 210, 240].map((y, i) => (
                  <path key={i} d={`M 280 ${y} L 360 ${y}`} stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow-red)" />
                ))}

                {/* Exhaust Air (Right) */}
                <polygon points="470,170 620,140 620,280 470,250" fill="#3b82f6" fillOpacity="0.2" stroke="#3b82f6" strokeWidth="2" />
                <text x="560" y="215" fill="#93c5fd" fontSize="13" fontWeight="bold" textAnchor="middle">EXHAUST AIR (High RH)</text>

                {/* Cooling Fan Zone Bottom */}
                <polygon points="180,310 330,325 330,355 180,370" fill="#10b981" fillOpacity="0.25" stroke="#10b981" strokeWidth="2" />
                <text x="245" y="345" fill="#6ee7b7" fontSize="12" fontWeight="bold" textAnchor="middle">COOL AMBIENT AIR</text>

                {/* Discharge Hopper */}
                <polygon points="370,370 430,370 410,410 390,410" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
                <text x="400" y="435" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">DRY DISCHARGE (13% w.b.)</text>
              </svg>
            )}

            {activeSheet.diagramType === 'tractor_power' && (
              <svg className="w-full h-full" viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Engine block */}
                <rect x="50" y="160" width="120" height="130" fill="#1e293b" stroke="#3b82f6" strokeWidth="2.5" rx="8" />
                <text x="110" y="215" fill="#93c5fd" fontSize="13" fontWeight="bold" textAnchor="middle">DIESEL ENGINE</text>
                <text x="110" y="235" fill="#64748b" fontSize="11" textAnchor="middle">2200 RPM</text>

                {/* Crankshaft */}
                <line x1="170" y1="225" x2="220" y2="225" stroke="#94a3b8" strokeWidth="8" />

                {/* Clutch */}
                <rect x="220" y="180" width="30" height="90" fill="#dc2626" fillOpacity="0.4" stroke="#ef4444" strokeWidth="2" rx="4" />
                <text x="235" y="295" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">CLUTCH</text>

                {/* Gearbox */}
                <rect x="280" y="165" width="140" height="120" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2.5" rx="8" />
                <text x="350" y="215" fill="#c4b5fd" fontSize="13" fontWeight="bold" textAnchor="middle">TRANSMISSION</text>
                <text x="350" y="235" fill="#64748b" fontSize="11" textAnchor="middle">8F + 2R GEARS</text>

                {/* Main drive shaft */}
                <line x1="420" y1="225" x2="490" y2="225" stroke="#94a3b8" strokeWidth="8" />

                {/* Differential unit */}
                <circle cx="530" cy="225" r="45" fill="#1e293b" stroke="#10b981" strokeWidth="2.5" />
                <circle cx="530" cy="225" r="25" fill="#047857" fillOpacity="0.4" stroke="#34d399" strokeWidth="1.5" />
                <text x="530" y="222" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">CROWN</text>
                <text x="530" y="237" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">& DIFF</text>

                {/* Left/Right Axles */}
                <line x1="530" y1="180" x2="530" y2="100" stroke="#94a3b8" strokeWidth="8" />
                <line x1="530" y1="270" x2="530" y2="350" stroke="#94a3b8" strokeWidth="8" />

                {/* Final drive reductions */}
                <rect x="640" y="80" width="70" height="60" fill="#334155" stroke="#f59e0b" strokeWidth="2" rx="6" />
                <text x="675" y="115" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">FINAL GEAR</text>

                <rect x="640" y="310" width="70" height="60" fill="#334155" stroke="#f59e0b" strokeWidth="2" rx="6" />
                <text x="675" y="345" fill="#fde68a" fontSize="11" fontWeight="bold" textAnchor="middle">FINAL GEAR</text>

                {/* Rear drive wheels */}
                <rect x="715" y="60" width="35" height="100" fill="#0f172a" stroke="#cbd5e1" strokeWidth="3" rx="8" />
                <rect x="715" y="290" width="35" height="100" fill="#0f172a" stroke="#cbd5e1" strokeWidth="3" rx="8" />
              </svg>
            )}

            {activeSheet.diagramType === 'hydraulic_lift' && (
              <svg className="w-full h-full" viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Sump & Pump */}
                <rect x="80" y="270" width="100" height="90" fill="#1e293b" stroke="#0ea5e9" strokeWidth="2" rx="6" />
                <text x="130" y="310" fill="#7dd3fc" fontSize="12" fontWeight="bold" textAnchor="middle">HYDRAULIC</text>
                <text x="130" y="328" fill="#7dd3fc" fontSize="12" fontWeight="bold" textAnchor="middle">PUMP</text>

                {/* High pressure pipe */}
                <path d="M 180 315 L 290 315 L 290 220" stroke="#0284c7" strokeWidth="6" fill="none" />

                {/* Control Spool Valve */}
                <rect x="250" y="150" width="120" height="80" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2.5" rx="6" />
                <text x="310" y="185" fill="#c4b5fd" fontSize="12" fontWeight="bold" textAnchor="middle">SPOOL VALVE</text>
                <text x="310" y="205" fill="#64748b" fontSize="10" textAnchor="middle">(Draft/Position)</text>

                {/* Ram Cylinder */}
                <rect x="440" y="160" width="130" height="60" fill="#1e293b" stroke="#f59e0b" strokeWidth="2.5" rx="4" />
                <rect x="520" y="170" width="90" height="40" fill="#d97706" fillOpacity="0.4" stroke="#fbbf24" strokeWidth="1.5" />
                <text x="490" y="195" fill="#fde68a" fontSize="12" fontWeight="bold" textAnchor="middle">RAM CYLINDER</text>

                {/* Connect pipe valve to ram */}
                <path d="M 370 190 L 440 190" stroke="#f59e0b" strokeWidth="5" fill="none" />

                {/* Rockshaft and Lift Arm */}
                <circle cx="630" cy="190" r="16" fill="#475569" stroke="#94a3b8" strokeWidth="3" />
                <line x1="630" y1="190" x2="710" y2="120" stroke="#e2e8f0" strokeWidth="8" strokeLinecap="round" />
                <text x="680" y="110" fill="#f8fafc" fontSize="11" fontWeight="bold">LIFT ARM</text>

                {/* Lift Rod & Lower Links */}
                <line x1="710" y1="120" x2="710" y2="280" stroke="#94a3b8" strokeWidth="5" strokeDasharray="4 2" />
                <line x1="580" y1="310" x2="740" y2="310" stroke="#e2e8f0" strokeWidth="8" strokeLinecap="round" />
                <text x="660" y="335" fill="#cbd5e1" fontSize="11" fontWeight="bold" textAnchor="middle">LOWER DRAFT LINK</text>

                {/* Top Link with Spring */}
                <rect x="210" y="80" width="70" height="30" fill="#334155" stroke="#ec4899" strokeWidth="2" rx="4" />
                <text x="245" y="100" fill="#f472b6" fontSize="10" fontWeight="bold" textAnchor="middle">SPRING</text>
                <line x1="280" y1="95" x2="680" y2="95" stroke="#ec4899" strokeWidth="4" />
                <text x="450" y="85" fill="#f472b6" fontSize="11" fontWeight="bold" textAnchor="middle">TOP LINK (Draft Sensing)</text>
              </svg>
            )}

            {activeSheet.diagramType === 'paddy_milling' && (
              <svg className="w-full h-full" viewBox="0 0 800 450" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* 5 Stages in series */}
                {/* 1. Cleaner */}
                <rect x="40" y="180" width="100" height="90" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" rx="8" />
                <text x="90" y="220" fill="#93c5fd" fontSize="12" fontWeight="bold" textAnchor="middle">1. PRE-CLEANER</text>
                <text x="90" y="238" fill="#64748b" fontSize="10" textAnchor="middle">& Destoner</text>

                <path d="M 140 225 L 180 225" stroke="#64748b" strokeWidth="4" />

                {/* 2. Parboiling */}
                <rect x="180" y="170" width="115" height="110" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" rx="8" />
                <text x="237" y="215" fill="#fde68a" fontSize="12" fontWeight="bold" textAnchor="middle">2. PARBOILING</text>
                <text x="237" y="235" fill="#64748b" fontSize="10" textAnchor="middle">Soak + Steam</text>
                <text x="237" y="252" fill="#64748b" fontSize="10" textAnchor="middle">(Gelatinization)</text>

                <path d="M 295 225 L 335 225" stroke="#64748b" strokeWidth="4" />

                {/* 3. Rubber Sheller */}
                <rect x="335" y="170" width="115" height="110" fill="#1e293b" stroke="#ec4899" strokeWidth="2" rx="8" />
                <text x="392" y="215" fill="#f472b6" fontSize="12" fontWeight="bold" textAnchor="middle">3. RUBBER ROLL</text>
                <text x="392" y="235" fill="#64748b" fontSize="10" textAnchor="middle">Sheller (1:1.25)</text>
                <text x="392" y="252" fill="#f472b6" fontSize="10" textAnchor="middle">85-90% Dehusk</text>

                <path d="M 450 225 L 490 225" stroke="#64748b" strokeWidth="4" />

                {/* 4. Paddy Separator */}
                <rect x="490" y="175" width="115" height="100" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" rx="8" />
                <text x="547" y="220" fill="#c4b5fd" fontSize="12" fontWeight="bold" textAnchor="middle">4. SEPARATOR</text>
                <text x="547" y="238" fill="#64748b" fontSize="10" textAnchor="middle">Paddy / Brown</text>

                <path d="M 605 225 L 645 225" stroke="#64748b" strokeWidth="4" />

                {/* 5. Polisher */}
                <rect x="645" y="175" width="115" height="100" fill="#1e293b" stroke="#10b981" strokeWidth="2" rx="8" />
                <text x="702" y="220" fill="#a7f3d0" fontSize="12" fontWeight="bold" textAnchor="middle">5. POLISHER</text>
                <text x="702" y="238" fill="#64748b" fontSize="10" textAnchor="middle">Bran Removal</text>
                <text x="702" y="254" fill="#34d399" fontSize="10" textAnchor="middle">Head Rice Yield</text>
              </svg>
            )}

            {/* Hotspot Interactive Pins */}
            {activeSheet.hotspots.map((hs, index) => {
              const isSelected = selectedHotspot?.id === hs.id;
              return (
                <button
                  key={hs.id}
                  onClick={() => handleSelectHotspot(hs)}
                  style={{ left: `${hs.pos.x}%`, top: `${hs.pos.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full font-black text-xs transition transform hover:scale-125 cursor-pointer shadow-lg z-20 ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/50 scale-125'
                      : 'bg-emerald-500 text-white hover:bg-emerald-400'
                  }`}
                  title={hs.title}
                >
                  {index + 1}
                </button>
              );
            })}

          </div>

          {/* Hotspots Quick Badges Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
              Hotspots:
            </span>
            {activeSheet.hotspots.map((hs, idx) => (
              <button
                key={hs.id}
                onClick={() => handleSelectHotspot(hs)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer border ${
                  selectedHotspot?.id === hs.id
                    ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                }`}
              >
                {idx + 1}. {hs.title.split('(')[0]}
              </button>
            ))}
          </div>

        </div>

        {/* Deep Dive & GATE High-Yield Notes (1 col on right) */}
        <div className="space-y-4">
          
          {/* Selected Hotspot Detailed Breakdown Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <Info className="w-4 h-4" />
              <span>Hotspot Diagnostic</span>
            </div>

            {selectedHotspot ? (
              <div className="space-y-3 animate-fadeIn">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {selectedHotspot.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-950 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800">
                  {selectedHotspot.content}
                </p>
              </div>
            ) : (
              <div className="p-6 text-center text-slate-400 text-xs bg-slate-50 dark:bg-slate-950 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
                Click any numbered pin on the diagram to see mechanical physics, flow kinetics, and operational constraints.
              </div>
            )}
          </div>

          {/* GATE Exam High-Yield Formulae & Principles Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              <Sparkles className="w-4 h-4" />
              <span>GATE High-Yield Takeaways</span>
            </div>

            <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              {activeSheet.gatePoints.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-slate-50 dark:bg-slate-950/60 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span className="leading-relaxed font-medium">{pt}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
