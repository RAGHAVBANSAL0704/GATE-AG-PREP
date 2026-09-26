/**
 * Clean, responsive, dual-theme compatible SVG schematics for GATE AG engineering problems.
 */

export const SVG_DIESEL_CYCLE = `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" class="w-full max-w-[380px] h-auto mx-auto">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6"/>
    </marker>
  </defs>
  <!-- Background -->
  <rect width="400" height="240" rx="8" fill="#f8fafc" class="dark:fill-slate-900" stroke="#e2e8f0" class="dark:stroke-slate-800"/>
  <!-- Axes -->
  <line x1="50" y1="200" x2="360" y2="200" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)"/>
  <line x1="50" y1="200" x2="50" y2="30" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)"/>
  <text x="365" y="205" font-size="12" font-family="sans-serif" fill="#475569" font-weight="bold">V</text>
  <text x="45" y="25" font-size="12" font-family="sans-serif" fill="#475569" font-weight="bold">P</text>
  <!-- P-V Cycle Paths -->
  <!-- 1 -> 2 Isentropic Compression -->
  <path d="M 320 180 Q 150 170 120 70" fill="none" stroke="#2563eb" stroke-width="2.5"/>
  <!-- 2 -> 3 Constant Pressure Heat Addition -->
  <line x1="120" y1="70" x2="190" y2="70" stroke="#dc2626" stroke-width="2.5"/>
  <!-- 3 -> 4 Isentropic Expansion -->
  <path d="M 190 70 Q 240 120 320 150" fill="none" stroke="#16a34a" stroke-width="2.5"/>
  <!-- 4 -> 1 Constant Volume Heat Rejection -->
  <line x1="320" y1="150" x2="320" y2="180" stroke="#9333ea" stroke-width="2.5"/>
  <!-- State Points -->
  <circle cx="320" cy="180" r="4" fill="#1e293b"/>
  <text x="328" y="185" font-size="11" font-weight="bold" fill="#1e293b">1</text>
  <circle cx="120" cy="70" r="4" fill="#1e293b"/>
  <text x="108" y="65" font-size="11" font-weight="bold" fill="#1e293b">2</text>
  <circle cx="190" cy="70" r="4" fill="#1e293b"/>
  <text x="190" y="60" font-size="11" font-weight="bold" fill="#1e293b">3</text>
  <circle cx="320" cy="150" r="4" fill="#1e293b"/>
  <text x="328" y="148" font-size="11" font-weight="bold" fill="#1e293b">4</text>
  <!-- Labels -->
  <text x="145" y="55" font-size="10" fill="#dc2626" font-weight="bold">P = const (Qin)</text>
  <text x="325" y="168" font-size="9" fill="#9333ea">V = const (Qout)</text>
  <text x="170" y="140" font-size="10" fill="#2563eb">pV^\u03b3 = C</text>
</svg>`;

export const SVG_MOHR_CIRCLE = `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" class="w-full max-w-[380px] h-auto mx-auto">
  <rect width="400" height="240" rx="8" fill="#f8fafc" class="dark:fill-slate-900" stroke="#e2e8f0" class="dark:stroke-slate-800"/>
  <!-- Axes -->
  <line x1="40" y1="170" x2="370" y2="170" stroke="#64748b" stroke-width="1.5"/>
  <line x1="70" y1="210" x2="70" y2="30" stroke="#64748b" stroke-width="1.5"/>
  <text x="365" y="185" font-size="12" font-family="sans-serif" fill="#475569" font-weight="bold">\u03c3 (Normal Stress)</text>
  <text x="25" y="45" font-size="12" font-family="sans-serif" fill="#475569" font-weight="bold">\u03c4 (Shear)</text>
  <!-- Mohr Circle -->
  <circle cx="210" cy="170" r="80" fill="none" stroke="#2563eb" stroke-width="2"/>
  <!-- Center & Radius -->
  <circle cx="210" cy="170" r="3" fill="#dc2626"/>
  <text x="205" y="188" font-size="10" font-weight="bold" fill="#dc2626">C</text>
  <!-- Principal stresses -->
  <circle cx="130" cy="170" r="3" fill="#16a34a"/>
  <text x="122" y="188" font-size="10" font-weight="bold" fill="#16a34a">\u03c3_3</text>
  <circle cx="290" cy="170" r="3" fill="#16a34a"/>
  <text x="285" y="188" font-size="10" font-weight="bold" fill="#16a34a">\u03c3_1</text>
  <!-- Max shear point -->
  <circle cx="210" cy="90" r="3" fill="#9333ea"/>
  <line x1="210" y1="170" x2="210" y2="90" stroke="#9333ea" stroke-dasharray="3,3"/>
  <text x="215" y="95" font-size="10" font-weight="bold" fill="#9333ea">\u03c4_max = R</text>
  <!-- Failure Envelope Line -->
  <line x1="70" y1="140" x2="350" y2="50" stroke="#e11d48" stroke-width="2" stroke-dasharray="4,2"/>
  <text x="270" y="65" font-size="10" font-weight="bold" fill="#e11d48">\u03c4 = c + \u03c3 tan \u03d5</text>
</svg>`;

export const SVG_SPECIFIC_ENERGY = `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" class="w-full max-w-[380px] h-auto mx-auto">
  <rect width="400" height="240" rx="8" fill="#f8fafc" class="dark:fill-slate-900" stroke="#e2e8f0" class="dark:stroke-slate-800"/>
  <line x1="50" y1="200" x2="360" y2="200" stroke="#64748b" stroke-width="2"/>
  <line x1="50" y1="200" x2="50" y2="30" stroke="#64748b" stroke-width="2"/>
  <text x="320" y="220" font-size="12" font-family="sans-serif" fill="#475569" font-weight="bold">Specific Energy (E)</text>
  <text x="20" y="45" font-size="12" font-family="sans-serif" fill="#475569" font-weight="bold">Depth (y)</text>
  <!-- 45 degree line E = y -->
  <line x1="50" y1="200" x2="210" y2="40" stroke="#cbd5e1" stroke-dasharray="4,4" stroke-width="1.5"/>
  <text x="215" y="50" font-size="9" fill="#94a3b8">E = y (PE)</text>
  <!-- Specific Energy Curve -->
  <path d="M 330 50 Q 150 110 150 135 Q 150 160 330 185" fill="none" stroke="#2563eb" stroke-width="2.5"/>
  <!-- Critical Point -->
  <circle cx="150" cy="135" r="4" fill="#dc2626"/>
  <line x1="150" y1="200" x2="150" y2="135" stroke="#dc2626" stroke-dasharray="3,3"/>
  <line x1="50" y1="135" x2="150" y2="135" stroke="#dc2626" stroke-dasharray="3,3"/>
  <text x="135" y="215" font-size="10" font-weight="bold" fill="#dc2626">E_min</text>
  <text x="25" y="138" font-size="10" font-weight="bold" fill="#dc2626">y_c</text>
  <!-- Branches -->
  <text x="240" y="80" font-size="10" fill="#16a34a" font-weight="bold">Subcritical (Fr &lt; 1)</text>
  <text x="240" y="175" font-size="10" fill="#d97706" font-weight="bold">Supercritical (Fr &gt; 1)</text>
</svg>`;

export const SVG_PSYCHROMETRIC_CHART = `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" class="w-full max-w-[380px] h-auto mx-auto">
  <rect width="400" height="240" rx="8" fill="#f8fafc" class="dark:fill-slate-900" stroke="#e2e8f0" class="dark:stroke-slate-800"/>
  <line x1="60" y1="200" x2="360" y2="200" stroke="#64748b" stroke-width="2"/>
  <line x1="360" y1="200" x2="360" y2="30" stroke="#64748b" stroke-width="2"/>
  <text x="160" y="222" font-size="11" font-family="sans-serif" fill="#475569" font-weight="bold">Dry Bulb Temperature T_db (\u00b0C)</text>
  <text x="250" y="25" font-size="11" font-family="sans-serif" fill="#475569" font-weight="bold">Humidity Ratio w (kg/kg d.a.)</text>
  <!-- Saturation Curve (100% RH) -->
  <path d="M 60 200 Q 150 190 220 130 Q 290 70 360 40" fill="none" stroke="#0284c7" stroke-width="2.5"/>
  <text x="120" y="150" font-size="9" fill="#0284c7" font-weight="bold">\u03c6 = 100% (Saturation)</text>
  <!-- 50% RH Curve -->
  <path d="M 120 200 Q 210 190 270 145 Q 320 100 360 85" fill="none" stroke="#38bdf8" stroke-dasharray="3,2" stroke-width="1.5"/>
  <text x="230" y="170" font-size="9" fill="#0284c7">\u03c6 = 50%</text>
  <!-- Sensible Heating Path A -> B -->
  <line x1="160" y1="160" x2="280" y2="160" stroke="#dc2626" stroke-width="2"/>
  <circle cx="160" cy="160" r="3.5" fill="#dc2626"/>
  <text x="150" y="155" font-size="10" font-weight="bold" fill="#dc2626">A</text>
  <circle cx="280" cy="160" r="3.5" fill="#dc2626"/>
  <text x="285" y="155" font-size="10" font-weight="bold" fill="#dc2626">B</text>
  <text x="180" y="150" font-size="9" fill="#dc2626" font-weight="bold">Sensible Heating (w = const)</text>
</svg>`;

export const SVG_HEAT_EXCHANGER_COUNTERFLOW = `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" class="w-full max-w-[380px] h-auto mx-auto">
  <rect width="400" height="240" rx="8" fill="#f8fafc" class="dark:fill-slate-900" stroke="#e2e8f0" class="dark:stroke-slate-800"/>
  <line x1="60" y1="200" x2="360" y2="200" stroke="#64748b" stroke-width="1.5"/>
  <line x1="60" y1="200" x2="60" y2="30" stroke="#64748b" stroke-width="1.5"/>
  <text x="180" y="220" font-size="11" font-family="sans-serif" fill="#475569" font-weight="bold">Length / Area of Heat Exchanger (x)</text>
  <text x="25" y="25" font-size="11" font-family="sans-serif" fill="#475569" font-weight="bold">Temperature T (\u00b0C)</text>
  <!-- Hot fluid profile (left to right) -->
  <path d="M 80 60 L 340 120" stroke="#ef4444" stroke-width="2.5" fill="none"/>
  <text x="75" y="50" font-size="10" fill="#ef4444" font-weight="bold">T_h,in</text>
  <text x="345" y="125" font-size="10" fill="#ef4444" font-weight="bold">T_h,out</text>
  <!-- Cold fluid profile (right to left - counterflow) -->
  <path d="M 340 180 L 80 110" stroke="#3b82f6" stroke-width="2.5" fill="none"/>
  <text x="345" y="190" font-size="10" fill="#3b82f6" font-weight="bold">T_c,in</text>
  <text x="65" y="115" font-size="10" fill="#3b82f6" font-weight="bold">T_c,out</text>
  <!-- Temperature difference indicators -->
  <line x1="80" y1="65" x2="80" y2="105" stroke="#64748b" stroke-dasharray="2,2"/>
  <text x="85" y="88" font-size="9" fill="#64748b">\u0394T_1</text>
  <line x1="340" y1="125" x2="340" y2="175" stroke="#64748b" stroke-dasharray="2,2"/>
  <text x="315" y="155" font-size="9" fill="#64748b">\u0394T_2</text>
  <text x="140" y="145" font-size="10" font-weight="bold" fill="#0f172a" class="dark:fill-white">LMTD = (\u0394T_1 - \u0394T_2) / ln(\u0394T_1 / \u0394T_2)</text>
</svg>`;
