/**
 * GATE Agricultural Engineering (AG) Constants & Unit Conversions Reference
 * Values curated according to official GATE AG syllabus benchmarks
 */

export const AG_CONSTANTS_CATEGORIES = [
  {
    id: 'general_physics',
    name: 'General Physics & Thermodynamics',
    description: 'Fundamental physical constants and standard atmospheric benchmarks',
    constants: [
      {
        id: 'g_std',
        symbol: 'g',
        name: 'Standard Acceleration due to Gravity',
        value: 9.80665,
        displayValue: '9.80665',
        unit: 'm/s²',
        approx: '≈ 9.81 m/s²',
        note: 'Default standard acceleration in GATE numericals'
      },
      {
        id: 'r_gas',
        symbol: 'R',
        name: 'Universal Gas Constant',
        value: 8.31446,
        displayValue: '8.314',
        unit: 'J/(mol·K)',
        approx: '8.314 kJ/(kmol·K)',
        note: 'Ideal gas law constant'
      },
      {
        id: 'r_air',
        symbol: 'R_{air}',
        name: 'Specific Gas Constant of Dry Air',
        value: 287.058,
        displayValue: '287.06',
        unit: 'J/(kg·K)',
        approx: '0.287 kJ/(kg·K)',
        note: 'R / M_air where M_air = 28.966 kg/kmol'
      },
      {
        id: 'p_atm',
        symbol: 'P_{atm}',
        name: 'Standard Atmospheric Pressure (1 atm)',
        value: 101325,
        displayValue: '101325',
        unit: 'Pa',
        approx: '101.325 kPa (760 mm Hg)',
        note: 'Mean sea-level atmospheric benchmark'
      },
      {
        id: 'stefan_boltzmann',
        symbol: 'σ',
        name: 'Stefan-Boltzmann Constant',
        value: 0.00000005670374,
        displayValue: '5.67e-8',
        unit: 'W/(m²·K⁴)',
        approx: '5.67037 × 10⁻⁸ W/(m²·K⁴)',
        note: 'Radiative heat transfer constant'
      },
      {
        id: 'rho_air_stp',
        symbol: 'ρ_{air}',
        name: 'Density of Dry Air at STP (0°C, 1 atm)',
        value: 1.292,
        displayValue: '1.292',
        unit: 'kg/m³',
        approx: '≈ 1.205 kg/m³ at 20°C',
        note: 'Standard air density benchmark'
      }
    ]
  },
  {
    id: 'swce',
    name: 'Soil & Water Conservation (SWCE)',
    description: 'Hydraulic constants, water properties, fluid mechanics values',
    constants: [
      {
        id: 'rho_water',
        symbol: 'ρ_w',
        name: 'Density of Pure Water (at 4°C)',
        value: 1000,
        displayValue: '1000',
        unit: 'kg/m³',
        approx: '1.0 g/cm³',
        note: 'Standard reference density for fluids'
      },
      {
        id: 'gamma_water',
        symbol: 'γ_w',
        name: 'Unit Weight / Specific Weight of Water',
        value: 9810,
        displayValue: '9810',
        unit: 'N/m³',
        approx: '9.81 kN/m³',
        note: 'Used in hydrostatic pressure and soil seepage calculations'
      },
      {
        id: 'mu_water_20',
        symbol: 'μ_w',
        name: 'Dynamic Viscosity of Water at 20°C',
        value: 0.001002,
        displayValue: '1.002e-3',
        unit: 'Pa·s',
        approx: '≈ 1.002 cP (10⁻³ N·s/m²)',
        note: 'Reynolds number and Darcy law calculations'
      },
      {
        id: 'nu_water_20',
        symbol: 'ν_w',
        name: 'Kinematic Viscosity of Water at 20°C',
        value: 0.000001004,
        displayValue: '1.004e-6',
        unit: 'm²/s',
        approx: '≈ 1.004 × 10⁻⁶ m²/s (1.004 cSt)',
        note: 'ν = μ / ρ'
      },
      {
        id: 'lv_water',
        symbol: 'L_v',
        name: 'Latent Heat of Vaporization of Water (at 20°C)',
        value: 2453000,
        displayValue: '2.453e6',
        unit: 'J/kg',
        approx: '≈ 2.453 MJ/kg (586 kcal/kg)',
        note: 'Evapotranspiration and drying energy equations'
      },
      {
        id: 'psychrometric_const',
        symbol: 'γ',
        name: 'Psychrometric Constant (Sea Level)',
        value: 0.067,
        displayValue: '0.067',
        unit: 'kPa/°C',
        approx: '≈ 0.067 kPa/°C at 101.3 kPa',
        note: 'Penman-Monteith reference evapotranspiration formula'
      }
    ]
  },
  {
    id: 'fmp',
    name: 'Farm Machinery & Power (FMP)',
    description: 'Engine, tractor mechanics, field capacity benchmarks, and power conversions',
    constants: [
      {
        id: 'hp_imperial',
        symbol: '1\\text{ hp (Imp)}',
        name: '1 Imperial Horsepower to Watts',
        value: 745.7,
        displayValue: '745.7',
        unit: 'W',
        approx: '0.7457 kW (550 ft·lbf/s)',
        note: 'Standard tractor drawbar & engine power conversion'
      },
      {
        id: 'hp_metric',
        symbol: '1\\text{ hp (Metric)}',
        name: '1 Metric Horsepower (PS) to Watts',
        value: 735.49875,
        displayValue: '735.5',
        unit: 'W',
        approx: '0.7355 kW (75 kgf·m/s)',
        note: 'Common in Continental engine specifications'
      },
      {
        id: 'pto_speed_540',
        symbol: 'N_{pto}',
        name: 'Standard PTO Shaft Speed (Type 1)',
        value: 540,
        displayValue: '540',
        unit: 'rpm',
        approx: '540 ± 10 rpm at rated engine speed',
        note: 'ASABE standard for tractor implement drive'
      },
      {
        id: 'pto_speed_1000',
        symbol: 'N_{pto,2}',
        name: 'High-Capacity PTO Shaft Speed (Type 2)',
        value: 1000,
        displayValue: '1000',
        unit: 'rpm',
        approx: '1000 ± 25 rpm',
        note: 'ASABE standard 21-spline/large equipment drive'
      },
      {
        id: 'diesel_heating_val',
        symbol: 'CV_{diesel}',
        name: 'Net Calorific Value of Commercial Diesel',
        value: 42500000,
        displayValue: '4.25e7',
        unit: 'J/kg',
        approx: '≈ 42.5 MJ/kg (10,150 kcal/kg)',
        note: 'Brake thermal efficiency & specific fuel consumption problems'
      },
      {
        id: 'diesel_density',
        symbol: 'ρ_{diesel}',
        name: 'Average Density of Automotive Diesel Fuel',
        value: 840,
        displayValue: '840',
        unit: 'kg/m³',
        approx: '0.84 g/cm³ (820 - 860 kg/m³)',
        note: 'Fuel volume to mass conversion'
      }
    ]
  },
  {
    id: 'fpe',
    name: 'Food & Process Engineering (FPE)',
    description: 'Thermal processing, psychrometry, psychrometrics, and bioprocess values',
    constants: [
      {
        id: 'cp_water',
        symbol: 'C_{p,w}',
        name: 'Specific Heat Capacity of Liquid Water',
        value: 4186,
        displayValue: '4186',
        unit: 'J/(kg·K)',
        approx: '4.186 kJ/(kg·°C) or 1.0 kcal/(kg·°C)',
        note: 'Thermal food processing energy balances'
      },
      {
        id: 'cp_ice',
        symbol: 'C_{p,ice}',
        name: 'Specific Heat Capacity of Ice (at 0°C)',
        value: 2093,
        displayValue: '2093',
        unit: 'J/(kg·K)',
        approx: '2.093 kJ/(kg·°C) ≈ 0.5 kcal/(kg·°C)',
        note: 'Freezing and refrigeration load calculations'
      },
      {
        id: 'lf_ice',
        symbol: 'L_f',
        name: 'Latent Heat of Fusion of Ice (at 0°C)',
        value: 333550,
        displayValue: '333550',
        unit: 'J/kg',
        approx: '333.55 kJ/kg ≈ 79.7 kcal/kg',
        note: 'Plank formula and refrigeration cooling load'
      },
      {
        id: 'cp_air_dry',
        symbol: 'C_{p,air}',
        name: 'Specific Heat Capacity of Dry Air (constant pressure)',
        value: 1005,
        displayValue: '1005',
        unit: 'J/(kg·K)',
        approx: '1.005 kJ/(kg·°C)',
        note: 'Psychrometric and convective crop drying models'
      },
      {
        id: 'planck_const',
        symbol: 'h',
        name: 'Planck Constant',
        value: 0.000000000000000000000000000000000662607015,
        displayValue: '6.626e-34',
        unit: 'J·s',
        approx: '6.62607 × 10⁻³⁴ J·s',
        note: 'Photon energy & spectrophotometry in food analysis'
      }
    ]
  }
];

export const QUICK_UNIT_CONVERTERS = [
  { id: 'ha_to_m2', label: '1 ha → m²', factor: 10000, display: '10,000' },
  { id: 'kw_to_hp', label: '1 kW → hp (Imp)', factor: 1.34102, display: '1.341' },
  { id: 'bar_to_kpa', label: '1 bar → kPa', factor: 100, display: '100' },
  { id: 'psi_to_kpa', label: '1 psi → kPa', factor: 6.89476, display: '6.895' },
  { id: 'poise_to_pas', label: '1 Poise → Pa·s', factor: 0.1, display: '0.1' },
  { id: 'm3s_to_lps', label: '1 m³/s → L/s', factor: 1000, display: '1,000' }
];
