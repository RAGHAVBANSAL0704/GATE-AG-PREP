export const GATE_AG_FORMULAS = [
  {
    category: "Section 1: Engineering Mathematics",
    code: "EM",
    topics: [
      {
        topicName: "Linear Algebra & Matrices",
        formulas: [
          {
            title: "Eigenvalues & Characteristic Equation",
            formula: "|A - \\lambda I| = 0 \\implies \\lambda^n - (\\text{tr } A)\\lambda^{n-1} + \\dots + (-1)^n |A| = 0",
            explanation: "Sum of eigenvalues = Trace of A (tr A). Product of eigenvalues = Determinant of A (|A|). Characteristic equation Cayley-Hamilton theorem: p(A) = 0.",
            unit: "Unitless"
          },
          {
            title: "Matrix Rank & System Compatibility",
            formula: "\\text{Rank}(A) = \\text{Rank}([A|B]) \\implies \\text{System } AX=B \\text{ is Consistent}",
            explanation: "If Rank = number of variables: Unique solution. If Rank < variables: Infinitely many solutions.",
            unit: "Unitless"
          }
        ]
      },
      {
        topicName: "Calculus & Vector Calculus",
        formulas: [
          {
            title: "Gradient, Divergence & Curl",
            formula: "\\nabla \\phi = \\frac{\\partial \\phi}{\\partial x}\\hat{i} + \\frac{\\partial \\phi}{\\partial y}\\hat{j} + \\frac{\\partial \\phi}{\\partial z}\\hat{k}, \\quad \\nabla \\cdot \\vec{F} = \\text{div } \\vec{F}, \\quad \\nabla \\times \\vec{F} = \\text{curl } \\vec{F}",
            explanation: "Solenoidal field if \\nabla \\cdot \\vec{F} = 0. Irrotational field if \\nabla \\times \\vec{F} = \\vec{0}.",
            unit: "Unitless"
          },
          {
            title: "Gauss Divergence & Stokes Theorems",
            formula: "\\iint_S \\vec{F} \\cdot \\hat{n} \\, dS = \\iiint_V (\\nabla \\cdot \\vec{F}) \\, dV, \\quad \\oint_C \\vec{F} \\cdot d\\vec{r} = \\iint_S (\\nabla \\times \\vec{F}) \\cdot \\hat{n} \\, dS",
            explanation: "Gauss converts surface flux integral over closed S to volume integral over V. Stokes converts line integral around C to surface curl integral over S.",
            unit: "Flux / Circulation"
          },
          {
            title: "Taylor & Maclaurin Series Expansion",
            formula: "f(x) = f(a) + f'(a)(x-a) + \\frac{f''(a)}{2!}(x-a)^2 + \\dots + \\frac{f^{(n)}(a)}{n!}(x-a)^n + \\dots",
            explanation: "Maclaurin series is Taylor expansion centered at a = 0. Used for polynomial approximations in numerical calculations.",
            unit: "Unitless"
          }
        ]
      },
      {
        topicName: "Differential Equations",
        formulas: [
          {
            title: "First Order Linear ODE (Integrating Factor)",
            formula: "\\frac{dy}{dx} + P(x)y = Q(x) \\implies y \\cdot (IF) = \\int Q(x) \\cdot (IF) \\, dx + C, \\quad IF = e^{\\int P(x) dx}",
            explanation: "Standard solution method using Integrating Factor (IF) for first order linear differential equations.",
            unit: "Unitless"
          },
          {
            title: "Euler-Cauchy Differential Equation",
            formula: "x^2 \\frac{d^2y}{dx^2} + a x \\frac{dy}{dx} + b y = 0 \\implies D(D-1) + a D + b = 0 \\quad (x = e^z, D = d/dz)",
            explanation: "Substitutes x = e^z to transform variable coefficient equation into constant coefficient ODE.",
            unit: "Unitless"
          }
        ]
      },
      {
        topicName: "Numerical Methods & Integration",
        formulas: [
          {
            title: "Newton-Raphson Root Finding",
            formula: "x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}",
            explanation: "Iterative formula with quadratic convergence order (2) for finding real roots of f(x) = 0. Fails if f'(x_n) = 0.",
            unit: "Unitless"
          },
          {
            title: "Simpson's 1/3rd & Trapezoidal Rules",
            formula: "\\int_a^b f(x) dx \\approx \\frac{h}{3} \\left[ y_0 + y_n + 4(y_1 + y_3 + \\dots) + 2(y_2 + y_4 + \\dots) \\right], \\quad h = \\frac{b-a}{n}",
            explanation: "Simpson's 1/3rd requires n to be an EVEN number of subintervals. Trapezoidal: (h/2)[y_0 + y_n + 2(y_1 + ... + y_{n-1})].",
            unit: "Area"
          }
        ]
      },
      {
        topicName: "Probability & Distributions",
        formulas: [
          {
            title: "Binomial & Poisson Distributions",
            formula: "P(X=k) = \\binom{n}{k} p^k (1-p)^{n-k}, \\quad P(X=k)_{\\text{Poisson}} = \\frac{e^{-\\lambda} \\lambda^k}{k!}",
            explanation: "Binomial: Mean = np, Variance = np(1-p). Poisson: Mean = Variance = \\lambda.",
            unit: "Probability"
          }
        ]
      }
    ]
  },
  {
    category: "Section 2: Farm Machinery & Machine Design",
    code: "FMP",
    topics: [
      {
        topicName: "Soil Tillage & Forces on Implements",
        formulas: [
          {
            title: "Plough Draft & Drawbar Power",
            formula: "D = c \\cdot w \\cdot d \\cdot n \\text{ (N)}, \\quad P_{db} = \\frac{D \\cdot v}{3.6} \\text{ (kW)}",
            explanation: "c = Specific soil resistance (N/cm²), w = Bottom width (cm), d = Depth of cut (cm), n = Number of bottoms, v = Travel speed (km/h).",
            unit: "N & kW"
          },
          {
            title: "Field Capacity & Efficiency",
            formula: "TFC = \\frac{W \\cdot S}{10} \\text{ (ha/h)}, \\quad \\eta_f = \\frac{AFC}{TFC} \\times 100 \\%",
            explanation: "W = Working width (m), S = Travel speed (km/h). AFC = Actual Field Capacity (ha/h).",
            unit: "ha/h & %"
          }
        ]
      },
      {
        topicName: "Machine Design Elements (Gears, Belts, Chains, Shafts)",
        formulas: [
          {
            title: "Spur Gear Module & Velocity Ratio",
            formula: "m = \\frac{d}{T} \\text{ (mm)}, \\quad VR = \\frac{N_1}{N_2} = \\frac{T_2}{T_1} = \\frac{d_2}{d_1}, \\quad C = \\frac{m(T_1 + T_2)}{2}",
            explanation: "m = Module (mm), d = Pitch diameter (mm), T = Number of teeth, VR = Velocity ratio, C = Center distance (mm).",
            unit: "mm & Ratio"
          },
          {
            title: "Flat & V-Belt Power & Tension Ratio",
            formula: "\\frac{T_1}{T_2} = e^{\\mu \\theta} \\text{ (Flat)}, \\quad \\frac{T_1}{T_2} = e^{\\mu \\theta / \\sin(\\beta/2)} \\text{ (V-Belt)}, \\quad P = (T_1 - T_2)v",
            explanation: "T_1 = Tight side tension (N), T_2 = Slack side tension (N), \\mu = Friction coefficient, \\theta = Angle of contact (rad), \\beta = Groove angle, v = Belt velocity (m/s).",
            unit: "N & kW"
          },
          {
            title: "Shaft Torsional Shear Stress & Equivalent Moments",
            formula: "\\tau = \\frac{16 T}{\\pi d^3}, \\quad T_e = \\sqrt{M^2 + T^2}, \\quad M_e = \\frac{1}{2}\\left[ M + \\sqrt{M^2 + T^2} \\right]",
            explanation: "T = Twisting moment (N·m), M = Bending moment (N·m), d = Shaft diameter (m), \\tau = Max shear stress (Pa).",
            unit: "N·m & Pa"
          }
        ]
      },
      {
        topicName: "Spraying & Sowing Equipment",
        formulas: [
          {
            title: "Sprayer Nozzle Discharge & Application Rate",
            formula: "Q = C_d A \\sqrt{2gH}, \\quad Q_{ha} = \\frac{600 \\cdot q}{W \\cdot S} \\text{ (L/ha)}",
            explanation: "q = Nozzle discharge rate (L/min), W = Nozzle spacing / boom width (m), S = Speed (km/h).",
            unit: "L/min & L/ha"
          },
          {
            title: "Seed Drill Calibration Rate",
            formula: "R = \\frac{\\text{Mass of seed collected (kg)}}{\\pi \\cdot D \\cdot N \\cdot W} \\times 10000 \\text{ (kg/ha)}",
            explanation: "D = Ground wheel diameter (m), N = Wheel revolutions, W = Width of seed drill (m).",
            unit: "kg/ha"
          }
        ]
      },
      {
        topicName: "Tractor & Implement Cost Analysis",
        formulas: [
          {
            title: "Tractor Fixed & Variable Cost Analysis",
            formula: "D = \\frac{P - S}{N \\cdot H}, \\quad I = \\frac{P + S}{2 \\cdot H} \\cdot r, \\quad \\text{Total Cost/h} = D + I + H + T + \\text{Fuel} + \\text{R\\&M} + \\text{Labor}",
            explanation: "P = Purchase price, S = Salvage value (10%), N = Life in years, H = Annual working hours, r = Interest rate %.",
            unit: "₹/hour"
          }
        ]
      }
    ]
  },
  {
    category: "Section 3: Farm Power & Engine Systems",
    code: "FP",
    topics: [
      {
        topicName: "Sources of Power & Renewable Energy",
        formulas: [
          {
            title: "Wind Energy Power & Betz Limit",
            formula: "P = \\frac{1}{2} \\rho A v^3 \\text{ (W)}, \\quad P_{max} = C_p \\cdot P \\quad (C_p \\le 0.593)",
            explanation: "\\rho = Air density (1.225 kg/m³), A = Rotor swept area \\pi R² (m²), v = Wind speed (m/s), C_p = Betz power coefficient.",
            unit: "W or kW"
          },
          {
            title: "Biogas Production & Solar Collector Efficiency",
            formula: "\\eta_{solar} = \\frac{Q_u}{I_T \\cdot A_c} \\times 100 \\%",
            explanation: "Q_u = Useful heat energy collected (W), I_T = Total solar radiation intensity (W/m²), A_c = Collector area (m²).",
            unit: "%"
          }
        ]
      },
      {
        topicName: "IC Engine Power & Efficiencies",
        formulas: [
          {
            title: "Indicated & Brake Power",
            formula: "IP = \\frac{P_{m} \\cdot L \\cdot A \\cdot N \\cdot n}{60000} \\text{ (kW)}, \\quad BP = \\frac{2 \\pi N T}{60000} \\text{ (kW)}",
            explanation: "P_m = Mean effective pressure (kPa), L = Stroke (m), A = Piston area (m²), N = Power strokes/min (RPM/2 for 4-stroke), n = Cylinders.",
            unit: "kW"
          },
          {
            title: "Mechanical Efficiency & SFC",
            formula: "\\eta_{mech} = \\frac{BP}{IP} \\times 100, \\quad SFC = \\frac{m_f \\text{ (kg/h)}}{BP \\text{ (kW)}} \\text{ (kg/kW·h)}",
            explanation: "FP = Friction Power = IP - BP. SFC = Specific fuel consumption in kg per kW·h.",
            unit: "% & kg/kW·h"
          }
        ]
      },
      {
        topicName: "Thermodynamics & IC Engine Cycles",
        formulas: [
          {
            title: "Air-Standard Otto & Diesel Cycle Efficiencies",
            formula: "\\eta_{Otto} = 1 - \\frac{1}{r^{\\gamma-1}}, \\quad \\eta_{Diesel} = 1 - \\frac{1}{r^{\\gamma-1}} \\left[ \\frac{r_c^\\gamma - 1}{\\gamma(r_c - 1)} \\right]",
            explanation: "r = Compression ratio (V_s + V_c)/V_c, r_c = Cut-off ratio V_3/V_2, \\gamma = Ratio of specific heats (1.4 for air).",
            unit: "%"
          }
        ]
      },
      {
        topicName: "Tractor Mechanics & Chassis Kinematics",
        formulas: [
          {
            title: "Wheel Slip & Tractive Efficiency",
            formula: "S = \\left(1 - \\frac{V_a}{V_t}\\right) \\times 100, \\quad \\eta_t = \\frac{P_{db}}{P_{axle}} = (1 - S) \\left(1 - \\frac{C_r}{C_t}\\right)",
            explanation: "V_a = Actual travel speed, V_t = Theoretical speed. C_r = Rolling resistance coefficient, C_t = Gross tractive ratio.",
            unit: "%"
          },
          {
            title: "Dynamic Weight Transfer on Chassis",
            formula: "\\Delta W = \\frac{P_d \\cdot y + P_v \\cdot x_a}{L}",
            explanation: "P_d = Drawbar pull (N), y = Drawbar height (m), P_v = Vertical drawbar force, L = Wheelbase (m).",
            unit: "N or kg"
          }
        ]
      },
      {
        topicName: "Human Engineering & Ergonomics",
        formulas: [
          {
            title: "Human Energy Expenditure Rate",
            formula: "E = 0.042 \\cdot HR - 2.4 \\text{ (kJ/min)}, \\quad \\%HRR = \\frac{HR_{work} - HR_{rest}}{HR_{max} - HR_{rest}} \\times 100 \\%",
            explanation: "HR = Heart rate during work (beats/min). HR_{max} = 220 - Age. E = Energy expenditure rate in kJ/min.",
            unit: "kJ/min & %"
          }
        ]
      },
      {
        topicName: "Clutches & Transmission",
        formulas: [
          {
            title: "Single Plate Clutch Torque Capacity",
            formula: "T = \\mu F R_m \\text{ (N·m)}, \\quad R_m = \\frac{R_1 + R_2}{2} \\text{ (Uniform Wear)}, \\quad R_m = \\frac{2}{3}\\frac{R_2^3 - R_1^3}{R_2^2 - R_1^2} \\text{ (Uniform Pressure)}",
            explanation: "\\mu = Friction coefficient, F = Total axial clamping force (N), R_1 & R_2 = Inner and outer disc radii (m).",
            unit: "N·m"
          }
        ]
      }
    ]
  },
  {
    category: "Section 4: Soil & Water Conservation Engineering",
    code: "SWCE",
    topics: [
      {
        topicName: "Fluid Mechanics & Hydraulics",
        formulas: [
          {
            title: "Bernoulli's Energy Equation & Darcy Head Loss",
            formula: "\\frac{P_1}{\\gamma} + \\frac{v_1^2}{2g} + z_1 = \\frac{P_2}{\\gamma} + \\frac{v_2^2}{2g} + z_2 + h_f, \\quad h_f = \\frac{f L v^2}{2 g d} = \\frac{8 f L Q^2}{\\pi^2 g d^5}",
            explanation: "P/\\gamma = Pressure head, v²/2g = Velocity head, z = Datum. f = Darcy friction factor, L = Pipe length, d = Diameter.",
            unit: "m"
          },
          {
            title: "Manning's Open Channel Flow",
            formula: "V = \\frac{1}{n} R^{2/3} S^{1/2} \\text{ (m/s)}, \\quad Q = \\frac{1}{n} A R^{2/3} S^{1/2} \\text{ (m³/s)}",
            explanation: "n = Manning roughness coefficient, R = Hydraulic radius A/P (m), S = Bed slope.",
            unit: "m/s & m³/s"
          }
        ]
      },
      {
        topicName: "Hydrology & Watershed Runoff",
        formulas: [
          {
            title: "Rational Method Peak Runoff Rate",
            formula: "Q_p = \\frac{C \\cdot I \\cdot A}{360} \\text{ (m³/s)}",
            explanation: "C = Runoff coefficient, I = Rainfall intensity (mm/h), A = Catchment area (ha).",
            unit: "m³/s"
          },
          {
            title: "SCS-CN Direct Runoff Depth",
            formula: "Q = \\frac{(P - 0.2S)^2}{P + 0.8S} \\text{ (mm)}, \\quad S = \\frac{25400}{CN} - 254 \\text{ (mm)}",
            explanation: "P = Rainfall depth (mm), S = Max potential retention (mm), CN = Curve Number.",
            unit: "mm"
          }
        ]
      },
      {
        topicName: "Soil Erosion & Conservation Structures",
        formulas: [
          {
            title: "Universal Soil Loss Equation (USLE)",
            formula: "A = R \\cdot K \\cdot L \\cdot S \\cdot C \\cdot P",
            explanation: "A = Soil loss (t/ha/yr), R = Rainfall erosivity, K = Soil erodibility, LS = Topographic factor, C = Cover, P = Practice.",
            unit: "t/ha/yr"
          },
          {
            title: "Contour Bund Spacing (Vertical & Horizontal Interval)",
            formula: "VI = \\left( \\frac{S}{a} + b \\right) \\times 0.3 \\text{ (m)}, \\quad HI = \\frac{VI}{S} \\times 100 \\text{ (m)}",
            explanation: "S = Land slope %, a & b = Regional constants. VI = Vertical interval, HI = Horizontal interval.",
            unit: "m"
          }
        ]
      },
      {
        topicName: "Soil Mechanics",
        formulas: [
          {
            title: "Soil Phase Relationships",
            formula: "e = \\frac{V_v}{V_s}, \\quad n = \\frac{e}{1+e}, \\quad e \\cdot S_r = w \\cdot G_s, \\quad \\rho = \\frac{G_s(1+w)}{1+e} \\rho_w",
            explanation: "e = Void ratio, n = Porosity, S_r = Degree of saturation, w = Water content, G_s = Specific gravity of soil solids.",
            unit: "Unitless & kg/m³"
          },
          {
            title: "Mohr-Coulomb Shear Strength",
            formula: "\\tau = c + \\sigma \\tan\\phi",
            explanation: "\\tau = Shear strength (kPa), c = Cohesion (kPa), \\sigma = Normal stress (kPa), \\phi = Internal friction angle.",
            unit: "kPa"
          }
        ]
      },
      {
        topicName: "Surveying & Leveling",
        formulas: [
          {
            title: "Leveling Reduced Level & Curvature Correction",
            formula: "HI = RL + BS, \\quad RL = HI - FS, \\quad C_{cr} = 0.0673 D^2 \\text{ (m)}",
            explanation: "HI = Height of Instrument, RL = Reduced Level, BS = Backsight, FS = Foresight, D = Distance (km).",
            unit: "m"
          }
        ]
      }
    ]
  },
  {
    category: "Section 5: Irrigation & Drainage Engineering",
    code: "IDE",
    topics: [
      {
        topicName: "Groundwater Hydrology & Well Hydraulics",
        formulas: [
          {
            title: "Unconfined Aquifer Dupuit Well Discharge",
            formula: "Q = \\frac{\\pi K (h_2^2 - h_1^2)}{\\ln(r_2/r_1)} \\text{ (m³/s)}",
            explanation: "K = Hydraulic conductivity (m/s), h_1 & h_2 = Water table heights at radii r_1 & r_2 from well center.",
            unit: "m³/s"
          },
          {
            title: "Confined Aquifer Thiem Well Discharge",
            formula: "Q = \\frac{2 \\pi K b (h_2 - h_1)}{\\ln(r_2/r_1)} = \\frac{2 \\pi T (h_2 - h_1)}{\\ln(r_2/r_1)}",
            explanation: "b = Aquifer thickness (m), T = Transmissivity K·b (m²/s), h_2 - h_1 = Drawdown difference.",
            unit: "m³/s"
          }
        ]
      },
      {
        topicName: "Soil-Water-Plant Relationship",
        formulas: [
          {
            title: "Net Irrigation Depth & Available Water",
            formula: "d = \\frac{\\rho_d}{\\rho_w} \\cdot D_z \\cdot \\frac{(FC - PWP)}{100} \\times MAD",
            explanation: "\\rho_d/\\rho_w = Bulk specific gravity, D_z = Root depth, FC = Field capacity %, PWP = Wilting point %, MAD = Allowable depletion %.",
            unit: "cm or mm"
          }
        ]
      },
      {
        topicName: "Irrigation Conveyance & Application",
        formulas: [
          {
            title: "Irrigation Efficiencies (Conveyance & Application)",
            formula: "\\eta_c = \\frac{W_f}{W_d} \\times 100, \\quad \\eta_a = \\frac{W_s}{W_f} \\times 100, \\quad \\eta_d = \\left(1 - \\frac{\\bar{d}}{D}\\right) \\times 100",
            explanation: "W_f = Water delivered to field, W_d = Water diverted from source, W_s = Water stored in root zone.",
            unit: "%"
          },
          {
            title: "Drip & Sprinkler Discharge Rates",
            formula: "q = k H^x \\text{ (L/h)}, \\quad R_{sprinkler} = \\frac{3600 \\cdot q}{S_l \\cdot S_m} \\text{ (mm/h)}",
            explanation: "q = Emitter flow rate, H = Operating pressure head (m), S_l = Sprinkler spacing on lateral, S_m = Mainline spacing.",
            unit: "L/h & mm/h"
          }
        ]
      },
      {
        topicName: "Wells & Pumps",
        formulas: [
          {
            title: "Centrifugal Pump Specific Speed & Water Power",
            formula: "N_s = \\frac{N \\sqrt{Q}}{H^{3/4}}, \\quad WP = \\frac{\\rho g Q H}{1000} \\text{ (kW)}, \\quad BP = \\frac{WP}{\\eta_p}",
            explanation: "N = Speed (RPM), Q = Discharge (m³/s), H = Total head (m), WP = Water power (kW), BP = Shaft power.",
            unit: "RPM & kW"
          }
        ]
      },
      {
        topicName: "Agricultural Drainage",
        formulas: [
          {
            title: "Hooghoudt's Drain Spacing Equation",
            formula: "S^2 = \\frac{8 K_2 d_e m + 4 K_1 m^2}{q}",
            explanation: "S = Drain spacing (m), K_1 & K_2 = Conductivities above/below drain, m = Mid-span water table height, q = Drainage rate (m/day).",
            unit: "m"
          }
        ]
      }
    ]
  },
  {
    category: "Section 6: Agricultural Process Engineering",
    code: "APE",
    topics: [
      {
        topicName: "Evaporation & Grain Drying",
        formulas: [
          {
            title: "Moisture Content Interconversion & Weight Loss",
            formula: "M_{db} = \\frac{M_{wb}}{100 - M_{wb}} \\times 100, \\quad W_1 (1 - M_{wb1}) = W_2 (1 - M_{wb2})",
            explanation: "Dry matter mass remains constant during drying! W_1 = Initial grain weight, W_2 = Final weight.",
            unit: "% & kg"
          },
          {
            title: "Thin Layer Drying (Lewis Model)",
            formula: "\\frac{M - M_e}{M_0 - M_e} = \\exp(-k \\cdot t)",
            explanation: "M = Moisture at time t, M_0 = Initial moisture, M_e = Equilibrium moisture content (EMC), k = Drying constant (h⁻¹).",
            unit: "Ratio"
          },
          {
            title: "Evaporator Steam Economy",
            formula: "E = \\frac{m_v}{m_s} = \\frac{\\text{Mass of vapor produced}}{\\text{Mass of steam consumed}}, \\quad Q = U A \\Delta T",
            explanation: "Single-effect economy is typically 0.7 - 0.9. U = Overall heat transfer coefficient, A = Area, \\Delta T = Temp difference.",
            unit: "Ratio & W"
          }
        ]
      },
      {
        topicName: "Size Reduction & Material Handling",
        formulas: [
          {
            title: "Fineness Modulus & Average Particle Size",
            formula: "D_p = 0.135 \\cdot (1.366)^{FM} \\text{ (mm)}",
            explanation: "FM = Fineness Modulus obtained by cumulative sum of weight fraction retained / 100. D_p in mm.",
            unit: "mm"
          },
          {
            title: "Size Reduction Laws (Rittinger, Kick, Bond)",
            formula: "E_R = c \\left( \\frac{1}{x_2} - \\frac{1}{x_1} \\right), \\quad E_K = c \\ln\\left(\\frac{x_1}{x_2}\\right), \\quad P/f = 0.3162 \\cdot w_i \\left( \\frac{1}{\\sqrt{D_p}} - \\frac{1}{\\sqrt{D_f}} \\right)",
            explanation: "Rittinger (new surface area), Kick (reduction ratio), Bond (industrial grinding, w_i = Work Index).",
            unit: "kWh/tonne"
          },
          {
            title: "Ball Mill Critical Speed",
            formula: "n_c = \\frac{1}{2\\pi} \\sqrt{\\frac{g}{R - r}} \\text{ (rev/s)}",
            explanation: "Operating speed is kept at 65% to 80% of critical speed n_c. R = Mill radius, r = Ball radius.",
            unit: "rev/s"
          }
        ]
      },
      {
        topicName: "Engineering Properties of Produce",
        formulas: [
          {
            title: "Grain Sphericity & Bulk Porosity",
            formula: "\\phi = \\frac{(a b c)^{1/3}}{a}, \\quad \\epsilon = \\left(1 - \\frac{\\rho_b}{\\rho_p}\\right) \\times 100 \\%",
            explanation: "a, b, c = Major, intermediate, minor tri-axial dimensions of grain. \\rho_b = Bulk density, \\rho_p = Particle density.",
            unit: "Ratio & %"
          }
        ]
      },
      {
        topicName: "Storage Structure Hydraulics",
        formulas: [
          {
            title: "Janssen's Grain Bin Lateral Pressure",
            formula: "P_h = \\frac{w R}{\\mu'} \\left( 1 - e^{-k \\mu' y / R} \\right), \\quad P_v = \\frac{P_h}{k}",
            explanation: "P_h = Lateral pressure (kPa), w = Grain bulk density, R = Hydraulic radius (A/U), \\mu' = Wall friction, y = Depth.",
            unit: "kPa"
          }
        ]
      }
    ]
  },
  {
    category: "Section 7: Dairy & Food Engineering",
    code: "DFE",
    topics: [
      {
        topicName: "Heat & Mass Transfer in Food Processing",
        formulas: [
          {
            title: "Overall Heat Transfer Coefficient & LMTD",
            formula: "\\frac{1}{U} = \\frac{1}{h_i} + \\frac{x}{k} + \\frac{1}{h_o}, \\quad \\Delta T_{lm} = \\frac{\\Delta T_1 - \\Delta T_2}{\\ln(\\Delta T_1 / \\Delta T_2)}",
            explanation: "h_i & h_o = Convective heat transfer coefficients, x = Wall thickness, k = Thermal conductivity.",
            unit: "W/m²K & °C"
          },
          {
            title: "Biot Number & Fourier Number",
            formula: "Bi = \\frac{h L}{k_s}, \\quad Fo = \\frac{\\alpha t}{L^2} = \\frac{k_s t}{\\rho c_p L^2}",
            explanation: "Bi < 0.1: Lumped capacitance method applies. \\alpha = Thermal diffusivity (m²/s), L = Characteristic length.",
            unit: "Dimensionless"
          }
        ]
      },
      {
        topicName: "Food Preservation & Thermal Processing",
        formulas: [
          {
            title: "Thermal Death Kinetics (D-Value & Z-Value)",
            formula: "\\log\\left(\\frac{N_0}{N_t}\\right) = \\frac{t}{D}, \\quad z = \\frac{T_2 - T_1}{\\log D_1 - \\log D_2}, \\quad F_0 = D_{121}(\\log N_0 - \\log N_t)",
            explanation: "D-value = Time at temp T to reduce microbes by 90% (1 log cycle). Z-value = Temp change for 10-fold D-value change.",
            unit: "min & °C"
          },
          {
            title: "Plank's Food Freezing Time Equation",
            formula: "t_f = \\frac{\\rho_f L}{\\Delta T} \\left[ \\frac{P \\cdot a}{h} + \\frac{R \\cdot a^2}{k_f} \\right]",
            explanation: "\\rho_f = Frozen food density, L = Latent heat of freezing, a = Slab thickness, P & R = Shape factors (1/2 & 1/8 for slab).",
            unit: "Hours or Seconds"
          }
        ]
      }
    ]
  },
  {
    category: "Section 8: General Aptitude",
    code: "GA",
    topics: [
      {
        topicName: "Quantitative & Numerical Ability",
        formulas: [
          {
            title: "Relative Speed & Work Combined Rate",
            formula: "V_{rel} = V_1 \\pm V_2, \\quad T_{combined} = \\frac{T_A \\cdot T_B}{T_A + T_B}",
            explanation: "Add speeds if moving in opposite directions; subtract if same direction. Combined work time formula for A and B.",
            unit: "m/s & Days"
          },
          {
            title: "Compound Interest & Growth",
            formula: "A = P \\left( 1 + \\frac{r}{100} \\right)^n, \\quad CI = A - P",
            explanation: "P = Principal sum, r = Interest rate per period %, n = Number of compounding periods.",
            unit: "Currency"
          }
        ]
      }
    ]
  }
];
