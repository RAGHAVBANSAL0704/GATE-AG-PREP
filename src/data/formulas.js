/**
 * High-Yield GATE AG Formulas Dataset
 * Comprehensive compilation covering all 8 syllabus sections.
 * Includes interactive numeric solvers with step-by-step evaluations.
 */

export const GATE_AG_FORMULAS = [
  {
    "category": "Section 1: Engineering Mathematics",
    "code": "EM",
    "topics": [
      {
        "topicName": "Linear Algebra & Matrices",
        "formulas": [
          {
            "title": "Eigenvalues & Characteristic Equation",
            "formula": "|A - \\lambda I| = 0 \\implies \\lambda^n - (\\text{tr } A)\\lambda^{n-1} + \\dots + (-1)^n |A| = 0",
            "explanation": "Sum of eigenvalues = Trace of A (tr A). Product of eigenvalues = Determinant of A (|A|). Characteristic equation Cayley-Hamilton theorem: p(A) = 0.",
            "unit": "Unitless"
          },
          {
            "title": "Matrix Rank & System Compatibility",
            "formula": "\\text{Rank}(A) = \\text{Rank}([A|B]) \\implies \\text{System } AX=B \\text{ is Consistent}",
            "explanation": "If Rank = number of variables: Unique solution. If Rank < variables: Infinitely many solutions.",
            "unit": "Unitless"
          },
          {
            "title": "Orthogonal Matrix & Trace Invariance",
            "formula": "A^T A = A A^T = I \\implies \\det(A) = \\pm 1, \\quad A^{-1} = A^T",
            "explanation": "In an orthogonal matrix, column and row vectors are orthonormal. Trace of similar matrices is invariant: tr(P^{-1} A P) = tr(A).",
            "unit": "Unitless"
          },
          {
            "title": "Rank-Nullity Theorem",
            "formula": "\\text{Rank}(A) + \\text{Nullity}(A) = n",
            "explanation": "For an m x n linear transformation matrix, the sum of dimension of column space and null space equals the number of columns n.",
            "unit": "Unitless"
          },
          {
            "title": "Orthogonal Matrix & Trace Invariance",
            "formula": "A^T A = A A^T = I \\implies \\det(A) = \\pm 1, \\quad A^{-1} = A^T",
            "explanation": "In an orthogonal matrix, column and row vectors are orthonormal. Trace of similar matrices is invariant: tr(P^{-1} A P) = tr(A).",
            "unit": "Unitless"
          },
          {
            "title": "Rank-Nullity Theorem",
            "formula": "\\text{Rank}(A) + \\text{Nullity}(A) = n",
            "explanation": "For an m x n linear transformation matrix, the sum of dimension of column space and null space equals the number of columns n.",
            "unit": "Unitless"
          }
        ]
      },
      {
        "topicName": "Calculus & Vector Calculus",
        "formulas": [
          {
            "title": "Gradient, Divergence & Curl",
            "formula": "\\nabla \\phi = \\frac{\\partial \\phi}{\\partial x}\\hat{i} + \\frac{\\partial \\phi}{\\partial y}\\hat{j} + \\frac{\\partial \\phi}{\\partial z}\\hat{k}, \\quad \\nabla \\cdot \\vec{F} = \\text{div } \\vec{F}, \\quad \\nabla \\times \\vec{F} = \\text{curl } \\vec{F}",
            "explanation": "Solenoidal field if \\nabla \\cdot \\vec{F} = 0. Irrotational field if \\nabla \\times \\vec{F} = \\vec{0}.",
            "unit": "Unitless"
          },
          {
            "title": "Gauss Divergence & Stokes Theorems",
            "formula": "\\iint_S \\vec{F} \\cdot \\hat{n} \\, dS = \\iiint_V (\\nabla \\cdot \\vec{F}) \\, dV, \\quad \\oint_C \\vec{F} \\cdot d\\vec{r} = \\iint_S (\\nabla \\times \\vec{F}) \\cdot \\hat{n} \\, dS",
            "explanation": "Gauss converts surface flux integral over closed S to volume integral over V. Stokes converts line integral around C to surface curl integral over S.",
            "unit": "Flux / Circulation"
          },
          {
            "title": "Taylor & Maclaurin Series Expansion",
            "formula": "f(x) = f(a) + f'(a)(x-a) + \\frac{f''(a)}{2!}(x-a)^2 + \\dots + \\frac{f^{(n)}(a)}{n!}(x-a)^n + \\dots",
            "explanation": "Maclaurin series is Taylor expansion centered at a = 0. Used for polynomial approximations in numerical calculations.",
            "unit": "Unitless"
          }
        ]
      },
      {
        "topicName": "Differential Equations",
        "formulas": [
          {
            "title": "First Order Linear ODE (Integrating Factor)",
            "formula": "\\frac{dy}{dx} + P(x)y = Q(x) \\implies y \\cdot (IF) = \\int Q(x) \\cdot (IF) \\, dx + C, \\quad IF = e^{\\int P(x) dx}",
            "explanation": "Standard solution method using Integrating Factor (IF) for first order linear differential equations.",
            "unit": "Unitless"
          },
          {
            "title": "Euler-Cauchy Differential Equation",
            "formula": "x^2 \\frac{d^2y}{dx^2} + a x \\frac{dy}{dx} + b y = 0 \\implies D(D-1) + a D + b = 0 \\quad (x = e^z, D = d/dz)",
            "explanation": "Substitutes x = e^z to transform variable coefficient equation into constant coefficient ODE.",
            "unit": "Unitless"
          }
        ]
      },
      {
        "topicName": "Numerical Methods & Integration",
        "formulas": [
          {
            "title": "Newton-Raphson Root Finding",
            "formula": "x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}",
            "explanation": "Iterative formula with quadratic convergence order (2) for finding real roots of f(x) = 0. Fails if f'(x_n) = 0.",
            "unit": "Unitless"
          },
          {
            "title": "Simpson's 1/3rd & Trapezoidal Rules",
            "formula": "\\int_a^b f(x) dx \\approx \\frac{h}{3} \\left[ y_0 + y_n + 4(y_1 + y_3 + \\dots) + 2(y_2 + y_4 + \\dots) \\right], \\quad h = \\frac{b-a}{n}",
            "explanation": "Simpson's 1/3rd requires n to be an EVEN number of subintervals. Trapezoidal: (h/2)[y_0 + y_n + 2(y_1 + ... + y_{n-1})].",
            "unit": "Area"
          },
          {
            "title": "Runge-Kutta 4th Order (RK4) Method",
            "formula": "y_{n+1} = y_n + \\frac{1}{6}(k_1 + 2k_2 + 2k_3 + k_4), \\quad k_1 = h f(x_n, y_n)",
            "explanation": "Fourth order method for solving dy/dx = f(x, y). Global truncation error is O(h^4).",
            "unit": "Value"
          },
          {
            "title": "Simpson's 3/8th Rule",
            "formula": "\\int_a^b f(x) dx \\approx \\frac{3h}{8} \\left[ y_0 + y_n + 3(y_1 + y_2 + y_4 + \\dots) + 2(y_3 + y_6 + \\dots) \\right]",
            "explanation": "Requires number of intervals n to be a multiple of 3. Local error O(h^5).",
            "unit": "Area"
          },
          {
            "title": "Secant Method Iteration",
            "formula": "x_{n+1} = x_n - f(x_n) \\frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}",
            "explanation": "Does not require analytical evaluation of derivatives. Order of convergence is approx 1.618 (Golden ratio).",
            "unit": "Unitless"
          },
          {
            "title": "Runge-Kutta 4th Order (RK4) Method",
            "formula": "y_{n+1} = y_n + \\frac{1}{6}(k_1 + 2k_2 + 2k_3 + k_4), \\quad k_1 = h f(x_n, y_n)",
            "explanation": "Fourth order method for solving dy/dx = f(x, y). Global truncation error is O(h^4).",
            "unit": "Value"
          },
          {
            "title": "Simpson's 3/8th Rule",
            "formula": "\\int_a^b f(x) dx \\approx \\frac{3h}{8} \\left[ y_0 + y_n + 3(y_1 + y_2 + y_4 + \\dots) + 2(y_3 + y_6 + \\dots) \\right]",
            "explanation": "Requires number of intervals n to be a multiple of 3. Local error O(h^5).",
            "unit": "Area"
          },
          {
            "title": "Secant Method Iteration",
            "formula": "x_{n+1} = x_n - f(x_n) \\frac{x_n - x_{n-1}}{f(x_n) - f(x_{n-1})}",
            "explanation": "Does not require analytical evaluation of derivatives. Order of convergence is approx 1.618 (Golden ratio).",
            "unit": "Unitless"
          }
        ]
      },
      {
        "topicName": "Probability & Distributions",
        "formulas": [
          {
            "title": "Binomial & Poisson Distributions",
            "formula": "P(X=k) = \\binom{n}{k} p^k (1-p)^{n-k}, \\quad P(X=k)_{\\text{Poisson}} = \\frac{e^{-\\lambda} \\lambda^k}{k!}",
            "explanation": "Binomial: Mean = np, Variance = np(1-p). Poisson: Mean = Variance = \\lambda.",
            "unit": "Probability"
          },
          {
            "title": "Exponential Distribution (Memoryless)",
            "formula": "f(x) = \\lambda e^{-\\lambda x} \\quad (x \\ge 0), \\quad P(X > s + t \\mid X > s) = P(X > t)",
            "explanation": "Mean = 1/lambda, Variance = 1/lambda^2. Widely used for equipment failure and waiting times.",
            "unit": "Probability"
          },
          {
            "title": "Standard Normal Variable (Z-Score)",
            "formula": "Z = \\frac{X - \\mu}{\\sigma} \\sim N(0, 1)",
            "explanation": "Transforms normal random variable X into standard normal distribution with mean 0 and variance 1.",
            "unit": "Unitless"
          },
          {
            "title": "Exponential Distribution (Memoryless)",
            "formula": "f(x) = \\lambda e^{-\\lambda x} \\quad (x \\ge 0), \\quad P(X > s + t \\mid X > s) = P(X > t)",
            "explanation": "Mean = 1/lambda, Variance = 1/lambda^2. Widely used for equipment failure and waiting times.",
            "unit": "Probability"
          },
          {
            "title": "Standard Normal Variable (Z-Score)",
            "formula": "Z = \\frac{X - \\mu}{\\sigma} \\sim N(0, 1)",
            "explanation": "Transforms normal random variable X into standard normal distribution with mean 0 and variance 1.",
            "unit": "Unitless"
          }
        ]
      },
      {
        "topicName": "Vector Calculus & Theorems",
        "formulas": [
          {
            "title": "Green's Theorem in a Plane",
            "formula": "\\oint_C (L \\, dx + M \\, dy) = \\iint_D \\left( \\frac{\\partial M}{\\partial x} - \\frac{\\partial L}{\\partial y} \\right) dA",
            "explanation": "Converts line integral along positively oriented closed curve C into double integral over enclosed region D.",
            "unit": "Circulation"
          },
          {
            "title": "Directional Derivative",
            "formula": "D_{\\hat{u}} f = \\nabla f \\cdot \\hat{u} = |\\nabla f| \\cos(\\theta)",
            "explanation": "Maximum rate of increase occurs in direction of gradient vector nabla f, with magnitude |nabla f|.",
            "unit": "Rate"
          },
          {
            "title": "Green's Theorem in a Plane",
            "formula": "\\oint_C (L \\, dx + M \\, dy) = \\iint_D \\left( \\frac{\\partial M}{\\partial x} - \\frac{\\partial L}{\\partial y} \\right) dA",
            "explanation": "Converts line integral along positively oriented closed curve C into double integral over enclosed region D.",
            "unit": "Circulation"
          },
          {
            "title": "Directional Derivative",
            "formula": "D_{\\hat{u}} f = \\nabla f \\cdot \\hat{u} = |\\nabla f| \\cos(\\theta)",
            "explanation": "Maximum rate of increase occurs in direction of gradient vector nabla f, with magnitude |nabla f|.",
            "unit": "Rate"
          }
        ]
      }
    ]
  },
  {
    "category": "Section 2: Farm Machinery & Machine Design",
    "code": "FMP",
    "topics": [
      {
        "topicName": "Soil Tillage & Forces on Implements",
        "formulas": [
          {
            "title": "Plough Draft & Drawbar Power",
            "formula": "D = c \\cdot w \\cdot d \\cdot n \\text{ (N)}, \\quad P_{db} = \\frac{D \\cdot v}{3.6} \\text{ (kW)}",
            "explanation": "c = Specific soil resistance (N/cm²), w = Bottom width (cm), d = Depth of cut (cm), n = Number of bottoms, v = Travel speed (km/h).",
            "unit": "N & kW"
          },
          {
            "title": "Field Capacity & Efficiency",
            "formula": "TFC = \\frac{W \\cdot S}{10} \\text{ (ha/h)}, \\quad \\eta_f = \\frac{AFC}{TFC} \\times 100 \\%",
            "explanation": "W = Working width (m), S = Travel speed (km/h). AFC = Actual Field Capacity (ha/h).",
            "unit": "ha/h & %",
            "solver": {
              "id": "solver_field_cap",
              "name": "Theoretical & Effective Field Capacity Solver",
              "description": "Calculates Theoretical Field Capacity (TFC) and Effective Field Capacity (EFC).",
              "variables": [
                {
                  "key": "speedKmh",
                  "label": "Operating Speed",
                  "default": 6.5,
                  "unit": "km/h",
                  "min": 1,
                  "max": 25,
                  "step": 0.5
                },
                {
                  "key": "widthM",
                  "label": "Working Width",
                  "default": 2.2,
                  "unit": "m",
                  "min": 0.5,
                  "max": 12,
                  "step": 0.1
                },
                {
                  "key": "efficiency",
                  "label": "Field Efficiency (η)",
                  "default": 80,
                  "unit": "%",
                  "min": 30,
                  "max": 100,
                  "step": 1
                }
              ],
              "computeCode": "(vars) => {\n      const S = Number(vars.speedKmh);\n      const W = Number(vars.widthM);\n      const eta = Number(vars.efficiency) / 100;\n      const tfc = (S * W) / 10;\n      const efc = tfc * eta;\n      return {\n        value: Number(efc.toFixed(2)),\n        unit: 'ha/h',\n        steps: [\n          'Theoretical Field Capacity TFC = (S · W) / 10 = (' + S + ' × ' + W + ') / 10 = ' + tfc.toFixed(2) + ' ha/h',\n          'Effective Field Capacity EFC = TFC · η = ' + tfc.toFixed(2) + ' × ' + eta.toFixed(2) + ' = ' + efc.toFixed(2) + ' ha/h',\n          'Time required per hectare = ' + (1 / efc).toFixed(2) + ' h/ha'\n        ]\n      };\n    }"
            }
          },
          {
            "title": "Center of Resistance in Moldboard Plow",
            "formula": "x_{cr} = \\frac{3}{4} w, \\quad y_{cr} = \\frac{1}{2} d",
            "explanation": "Horizontal distance is measured from the furrow wall; vertical distance is from the bottom of cut.",
            "unit": "m"
          },
          {
            "title": "Disc Harrow Gang Width & Spacing",
            "formula": "W = (n - 1) S \\cos(\\beta) + 2 R \\sin(\\beta)",
            "explanation": "Overall cutting width of tandem disc harrow with n discs spaced at distance S at gang angle beta.",
            "unit": "m"
          },
          {
            "title": "Chisel Plow & Subsoiler Draft",
            "formula": "D = C_s \\cdot d^2 \\cdot \\sin(\\alpha + \\delta)",
            "explanation": "Draft in deep subsoiling increases approximately with the square of operating depth d.",
            "unit": "kN"
          },
          {
            "title": "Center of Resistance in Moldboard Plow",
            "formula": "x_{cr} = \\frac{3}{4} w, \\quad y_{cr} = \\frac{1}{2} d",
            "explanation": "Horizontal distance is measured from the furrow wall; vertical distance is from the bottom of cut.",
            "unit": "m"
          },
          {
            "title": "Disc Harrow Gang Width & Spacing",
            "formula": "W = (n - 1) S \\cos(\\beta) + 2 R \\sin(\\beta)",
            "explanation": "Overall cutting width of tandem disc harrow with n discs spaced at distance S at gang angle beta.",
            "unit": "m"
          },
          {
            "title": "Chisel Plow & Subsoiler Draft",
            "formula": "D = C_s \\cdot d^2 \\cdot \\sin(\\alpha + \\delta)",
            "explanation": "Draft in deep subsoiling increases approximately with the square of operating depth d.",
            "unit": "kN"
          }
        ]
      },
      {
        "topicName": "Machine Design Elements (Gears, Belts, Chains, Shafts)",
        "formulas": [
          {
            "title": "Spur Gear Module & Velocity Ratio",
            "formula": "m = \\frac{d}{T} \\text{ (mm)}, \\quad VR = \\frac{N_1}{N_2} = \\frac{T_2}{T_1} = \\frac{d_2}{d_1}, \\quad C = \\frac{m(T_1 + T_2)}{2}",
            "explanation": "m = Module (mm), d = Pitch diameter (mm), T = Number of teeth, VR = Velocity ratio, C = Center distance (mm).",
            "unit": "mm & Ratio"
          },
          {
            "title": "Flat & V-Belt Power & Tension Ratio",
            "formula": "\\frac{T_1}{T_2} = e^{\\mu \\theta} \\text{ (Flat)}, \\quad \\frac{T_1}{T_2} = e^{\\mu \\theta / \\sin(\\beta/2)} \\text{ (V-Belt)}, \\quad P = (T_1 - T_2)v",
            "explanation": "T_1 = Tight side tension (N), T_2 = Slack side tension (N), \\mu = Friction coefficient, \\theta = Angle of contact (rad), \\beta = Groove angle, v = Belt velocity (m/s).",
            "unit": "N & kW"
          },
          {
            "title": "Shaft Torsional Shear Stress & Equivalent Moments",
            "formula": "\\tau = \\frac{16 T}{\\pi d^3}, \\quad T_e = \\sqrt{M^2 + T^2}, \\quad M_e = \\frac{1}{2}\\left[ M + \\sqrt{M^2 + T^2} \\right]",
            "explanation": "T = Twisting moment (N·m), M = Bending moment (N·m), d = Shaft diameter (m), \\tau = Max shear stress (Pa).",
            "unit": "N·m & Pa"
          }
        ]
      },
      {
        "topicName": "Spraying & Sowing Equipment",
        "formulas": [
          {
            "title": "Sprayer Nozzle Discharge & Application Rate",
            "formula": "Q = C_d A \\sqrt{2gH}, \\quad Q_{ha} = \\frac{600 \\cdot q}{W \\cdot S} \\text{ (L/ha)}",
            "explanation": "q = Nozzle discharge rate (L/min), W = Nozzle spacing / boom width (m), S = Speed (km/h).",
            "unit": "L/min & L/ha"
          },
          {
            "title": "Seed Drill Calibration Rate",
            "formula": "R = \\frac{\\text{Mass of seed collected (kg)}}{\\pi \\cdot D \\cdot N \\cdot W} \\times 10000 \\text{ (kg/ha)}",
            "explanation": "D = Ground wheel diameter (m), N = Wheel revolutions, W = Width of seed drill (m).",
            "unit": "kg/ha",
            "solver": {
              "id": "solver_seed_rate",
              "name": "Seed Drill Calibration Rate Solver",
              "description": "Calculates seed rate in kg/ha from laboratory wheel test rotations and seed mass.",
              "variables": [
                {
                  "key": "seedGrams",
                  "label": "Total Seed Collected",
                  "default": 450,
                  "unit": "grams",
                  "min": 10,
                  "max": 5000,
                  "step": 10
                },
                {
                  "key": "revs",
                  "label": "Wheel Revolutions (N)",
                  "default": 50,
                  "unit": "revs",
                  "min": 5,
                  "max": 200,
                  "step": 5
                },
                {
                  "key": "wheelDia",
                  "label": "Ground Wheel Diameter (D)",
                  "default": 0.85,
                  "unit": "m",
                  "min": 0.4,
                  "max": 1.5,
                  "step": 0.05
                },
                {
                  "key": "openers",
                  "label": "Number of Furrow Openers",
                  "default": 9,
                  "unit": "rows",
                  "min": 1,
                  "max": 25,
                  "step": 1
                },
                {
                  "key": "rowSpacing",
                  "label": "Row Spacing (w)",
                  "default": 0.2,
                  "unit": "m",
                  "min": 0.1,
                  "max": 0.8,
                  "step": 0.02
                }
              ],
              "computeCode": "(vars) => {\n      const mKg = Number(vars.seedGrams) / 1000;\n      const N = Number(vars.revs);\n      const D = Number(vars.wheelDia);\n      const n = Number(vars.openers);\n      const w = Number(vars.rowSpacing);\n      const circumference = Math.PI * D;\n      const distance = N * circumference;\n      const width = n * w;\n      const areaM2 = distance * width;\n      const rateKgHa = (mKg / areaM2) * 10000;\n      return {\n        value: Number(rateKgHa.toFixed(2)),\n        unit: 'kg/ha',\n        steps: [\n          'Wheel Circumference C = π · ' + D + ' = ' + circumference.toFixed(3) + ' m',\n          'Travel Distance L = ' + N + ' × ' + circumference.toFixed(3) + ' = ' + distance.toFixed(2) + ' m',\n          'Working Width W = ' + n + ' × ' + w + ' = ' + width.toFixed(2) + ' m',\n          'Test Area A = L · W = ' + areaM2.toFixed(2) + ' m²',\n          'Seed Rate = (' + mKg.toFixed(3) + ' kg / ' + areaM2.toFixed(2) + ' m²) × 10000 = ' + rateKgHa.toFixed(2) + ' kg/ha'\n        ]\n      };\n    }"
            }
          }
        ]
      },
      {
        "topicName": "Tractor & Implement Cost Analysis",
        "formulas": [
          {
            "title": "Tractor Fixed & Variable Cost Analysis",
            "formula": "D = \\frac{P - S}{N \\cdot H}, \\quad I = \\frac{P + S}{2 \\cdot H} \\cdot r, \\quad \\text{Total Cost/h} = D + I + H + T + \\text{Fuel} + \\text{R\\&M} + \\text{Labor}",
            "explanation": "P = Purchase price, S = Salvage value (10%), N = Life in years, H = Annual working hours, r = Interest rate %.",
            "unit": "₹/hour"
          }
        ]
      },
      {
        "topicName": "Rotary Tillage & Sowing Mechanics",
        "formulas": [
          {
            "title": "Tillage Pitch (Rotavator)",
            "formula": "p = \\frac{60 v}{N \\cdot z} \\quad [\\text{m}]",
            "explanation": "Distance moved forward per revolution per blade flange. v is forward speed (m/s), N is rotor RPM, z is blades per side.",
            "unit": "m"
          },
          {
            "title": "Fluted Roller Seed Delivery Rate",
            "formula": "q_s = C_f \\cdot L_e \\cdot N_{roller} \\cdot \\rho_{seed}",
            "explanation": "Seed discharge is directly proportional to exposed active fluted roller length L_e and roller speed.",
            "unit": "kg/min",
            "solver": {
              "id": "solver_seed_rate",
              "name": "Seed Drill Calibration Rate Solver",
              "description": "Calculates seed rate in kg/ha from laboratory wheel test rotations and seed mass.",
              "variables": [
                {
                  "key": "seedGrams",
                  "label": "Total Seed Collected",
                  "default": 450,
                  "unit": "grams",
                  "min": 10,
                  "max": 5000,
                  "step": 10
                },
                {
                  "key": "revs",
                  "label": "Wheel Revolutions (N)",
                  "default": 50,
                  "unit": "revs",
                  "min": 5,
                  "max": 200,
                  "step": 5
                },
                {
                  "key": "wheelDia",
                  "label": "Ground Wheel Diameter (D)",
                  "default": 0.85,
                  "unit": "m",
                  "min": 0.4,
                  "max": 1.5,
                  "step": 0.05
                },
                {
                  "key": "openers",
                  "label": "Number of Furrow Openers",
                  "default": 9,
                  "unit": "rows",
                  "min": 1,
                  "max": 25,
                  "step": 1
                },
                {
                  "key": "rowSpacing",
                  "label": "Row Spacing (w)",
                  "default": 0.2,
                  "unit": "m",
                  "min": 0.1,
                  "max": 0.8,
                  "step": 0.02
                }
              ],
              "computeCode": "(vars) => {\n      const mKg = Number(vars.seedGrams) / 1000;\n      const N = Number(vars.revs);\n      const D = Number(vars.wheelDia);\n      const n = Number(vars.openers);\n      const w = Number(vars.rowSpacing);\n      const circumference = Math.PI * D;\n      const distance = N * circumference;\n      const width = n * w;\n      const areaM2 = distance * width;\n      const rateKgHa = (mKg / areaM2) * 10000;\n      return {\n        value: Number(rateKgHa.toFixed(2)),\n        unit: 'kg/ha',\n        steps: [\n          'Wheel Circumference C = π · ' + D + ' = ' + circumference.toFixed(3) + ' m',\n          'Travel Distance L = ' + N + ' × ' + circumference.toFixed(3) + ' = ' + distance.toFixed(2) + ' m',\n          'Working Width W = ' + n + ' × ' + w + ' = ' + width.toFixed(2) + ' m',\n          'Test Area A = L · W = ' + areaM2.toFixed(2) + ' m²',\n          'Seed Rate = (' + mKg.toFixed(3) + ' kg / ' + areaM2.toFixed(2) + ' m²) × 10000 = ' + rateKgHa.toFixed(2) + ' kg/ha'\n        ]\n      };\n    }"
            }
          },
          {
            "title": "Tillage Pitch (Rotavator)",
            "formula": "p = \\frac{60 v}{N \\cdot z} \\quad [\\text{m}]",
            "explanation": "Distance moved forward per revolution per blade flange. v is forward speed (m/s), N is rotor RPM, z is blades per side.",
            "unit": "m"
          },
          {
            "title": "Fluted Roller Seed Delivery Rate",
            "formula": "q_s = C_f \\cdot L_e \\cdot N_{roller} \\cdot \\rho_{seed}",
            "explanation": "Seed discharge is directly proportional to exposed active fluted roller length L_e and roller speed.",
            "unit": "kg/min",
            "solver": {
              "id": "solver_seed_rate",
              "name": "Seed Drill Calibration Rate Solver",
              "description": "Calculates seed rate in kg/ha from laboratory wheel test rotations and seed mass.",
              "variables": [
                {
                  "key": "seedGrams",
                  "label": "Total Seed Collected",
                  "default": 450,
                  "unit": "grams",
                  "min": 10,
                  "max": 5000,
                  "step": 10
                },
                {
                  "key": "revs",
                  "label": "Wheel Revolutions (N)",
                  "default": 50,
                  "unit": "revs",
                  "min": 5,
                  "max": 200,
                  "step": 5
                },
                {
                  "key": "wheelDia",
                  "label": "Ground Wheel Diameter (D)",
                  "default": 0.85,
                  "unit": "m",
                  "min": 0.4,
                  "max": 1.5,
                  "step": 0.05
                },
                {
                  "key": "openers",
                  "label": "Number of Furrow Openers",
                  "default": 9,
                  "unit": "rows",
                  "min": 1,
                  "max": 25,
                  "step": 1
                },
                {
                  "key": "rowSpacing",
                  "label": "Row Spacing (w)",
                  "default": 0.2,
                  "unit": "m",
                  "min": 0.1,
                  "max": 0.8,
                  "step": 0.02
                }
              ],
              "computeCode": "(vars) => {\n      const mKg = Number(vars.seedGrams) / 1000;\n      const N = Number(vars.revs);\n      const D = Number(vars.wheelDia);\n      const n = Number(vars.openers);\n      const w = Number(vars.rowSpacing);\n      const circumference = Math.PI * D;\n      const distance = N * circumference;\n      const width = n * w;\n      const areaM2 = distance * width;\n      const rateKgHa = (mKg / areaM2) * 10000;\n      return {\n        value: Number(rateKgHa.toFixed(2)),\n        unit: 'kg/ha',\n        steps: [\n          'Wheel Circumference C = π · ' + D + ' = ' + circumference.toFixed(3) + ' m',\n          'Travel Distance L = ' + N + ' × ' + circumference.toFixed(3) + ' = ' + distance.toFixed(2) + ' m',\n          'Working Width W = ' + n + ' × ' + w + ' = ' + width.toFixed(2) + ' m',\n          'Test Area A = L · W = ' + areaM2.toFixed(2) + ' m²',\n          'Seed Rate = (' + mKg.toFixed(3) + ' kg / ' + areaM2.toFixed(2) + ' m²) × 10000 = ' + rateKgHa.toFixed(2) + ' kg/ha'\n        ]\n      };\n    }"
            }
          }
        ]
      },
      {
        "topicName": "Plant Protection & Spraying",
        "formulas": [
          {
            "title": "Sprayer Swath Application Rate",
            "formula": "Q_{ha} = \\frac{600 \\cdot q}{w \\cdot v} \\quad [\\text{L/ha}]",
            "explanation": "q is total boom discharge (L/min), w is swath width (m), v is forward tractor speed (km/h).",
            "unit": "L/ha"
          },
          {
            "title": "Relative Span of Spray Droplets",
            "formula": "\\text{Span} = \\frac{D_{v0.9} - D_{v0.1}}{D_{v0.5}}",
            "explanation": "Span close to 0 indicates highly uniform droplet size distribution with low drift risk.",
            "unit": "Unitless"
          },
          {
            "title": "Sprayer Swath Application Rate",
            "formula": "Q_{ha} = \\frac{600 \\cdot q}{w \\cdot v} \\quad [\\text{L/ha}]",
            "explanation": "q is total boom discharge (L/min), w is swath width (m), v is forward tractor speed (km/h).",
            "unit": "L/ha"
          },
          {
            "title": "Relative Span of Spray Droplets",
            "formula": "\\text{Span} = \\frac{D_{v0.9} - D_{v0.1}}{D_{v0.5}}",
            "explanation": "Span close to 0 indicates highly uniform droplet size distribution with low drift risk.",
            "unit": "Unitless"
          }
        ]
      },
      {
        "topicName": "Harvesting & Threshing Machinery",
        "formulas": [
          {
            "title": "Combine Cylinder Peripheral Speed",
            "formula": "v_p = \\frac{\\pi D_c N}{60} \\quad [\\text{m/s}]",
            "explanation": "D_c is cylinder diameter (m), N is rotational speed (RPM). Optimum wheat: 28-32 m/s; Paddy: 20-24 m/s.",
            "unit": "m/s"
          },
          {
            "title": "Combine Straw Walker Separation Efficiency",
            "formula": "E_w = 1 - \\exp(-b \\cdot L_w)",
            "explanation": "Separation of loose grains from straw follows exponential decay along straw walker length L_w.",
            "unit": "Fraction"
          },
          {
            "title": "Mower Average Knife Speed",
            "formula": "\\bar{v}_k = \\frac{2 S N}{60} = \\frac{S N}{30} \\quad [\\text{m/s}]",
            "explanation": "S is stroke length (m) and N is crank RPM of pitman or wobble drive.",
            "unit": "m/s"
          },
          {
            "title": "Combine Cylinder Peripheral Speed",
            "formula": "v_p = \\frac{\\pi D_c N}{60} \\quad [\\text{m/s}]",
            "explanation": "D_c is cylinder diameter (m), N is rotational speed (RPM). Optimum wheat: 28-32 m/s; Paddy: 20-24 m/s.",
            "unit": "m/s"
          },
          {
            "title": "Combine Straw Walker Separation Efficiency",
            "formula": "E_w = 1 - \\exp(-b \\cdot L_w)",
            "explanation": "Separation of loose grains from straw follows exponential decay along straw walker length L_w.",
            "unit": "Fraction"
          },
          {
            "title": "Mower Average Knife Speed",
            "formula": "\\bar{v}_k = \\frac{2 S N}{60} = \\frac{S N}{30} \\quad [\\text{m/s}]",
            "explanation": "S is stroke length (m) and N is crank RPM of pitman or wobble drive.",
            "unit": "m/s"
          }
        ]
      }
    ]
  },
  {
    "category": "Section 3: Farm Power & Engine Systems",
    "code": "FP",
    "topics": [
      {
        "topicName": "Sources of Power & Renewable Energy",
        "formulas": [
          {
            "title": "Wind Energy Power & Betz Limit",
            "formula": "P = \\frac{1}{2} \\rho A v^3 \\text{ (W)}, \\quad P_{max} = C_p \\cdot P \\quad (C_p \\le 0.593)",
            "explanation": "\\rho = Air density (1.225 kg/m³), A = Rotor swept area \\pi R² (m²), v = Wind speed (m/s), C_p = Betz power coefficient.",
            "unit": "W or kW"
          },
          {
            "title": "Biogas Production & Solar Collector Efficiency",
            "formula": "\\eta_{solar} = \\frac{Q_u}{I_T \\cdot A_c} \\times 100 \\%",
            "explanation": "Q_u = Useful heat energy collected (W), I_T = Total solar radiation intensity (W/m²), A_c = Collector area (m²).",
            "unit": "%"
          }
        ]
      },
      {
        "topicName": "IC Engine Power & Efficiencies",
        "formulas": [
          {
            "title": "Indicated & Brake Power",
            "formula": "IP = \\frac{P_{m} \\cdot L \\cdot A \\cdot N \\cdot n}{60000} \\text{ (kW)}, \\quad BP = \\frac{2 \\pi N T}{60000} \\text{ (kW)}",
            "explanation": "P_m = Mean effective pressure (kPa), L = Stroke (m), A = Piston area (m²), N = Power strokes/min (RPM/2 for 4-stroke), n = Cylinders.",
            "unit": "kW",
            "solver": {
              "id": "solver_ind_power",
              "name": "Indicated Power (IP) Calculator",
              "description": "Computes Indicated Power of an IC engine from mean effective pressure and cylinder dimensions.",
              "variables": [
                {
                  "key": "pm",
                  "label": "Mean Effective Pressure (Pm)",
                  "default": 650,
                  "unit": "kPa",
                  "min": 50,
                  "max": 2500,
                  "step": 10
                },
                {
                  "key": "L",
                  "label": "Piston Stroke (L)",
                  "default": 0.12,
                  "unit": "m",
                  "min": 0.05,
                  "max": 0.3,
                  "step": 0.005
                },
                {
                  "key": "D",
                  "label": "Cylinder Bore (D)",
                  "default": 0.1,
                  "unit": "m",
                  "min": 0.05,
                  "max": 0.25,
                  "step": 0.005
                },
                {
                  "key": "N",
                  "label": "Engine Speed (RPM)",
                  "default": 2200,
                  "unit": "RPM",
                  "min": 500,
                  "max": 4000,
                  "step": 50
                },
                {
                  "key": "n",
                  "label": "Number of Cylinders",
                  "default": 4,
                  "unit": "cylinders",
                  "min": 1,
                  "max": 8,
                  "step": 1
                },
                {
                  "key": "isFourStroke",
                  "label": "4-Stroke Engine (N/2)?",
                  "type": "boolean",
                  "default": true
                }
              ],
              "computeCode": "(vars) => {\n      const pm = Number(vars.pm);\n      const L = Number(vars.L);\n      const D = Number(vars.D);\n      const N = Number(vars.N);\n      const n = Number(vars.n);\n      const A = (Math.PI / 4) * Math.pow(D, 2);\n      const strokeFactor = vars.isFourStroke ? 0.5 : 1.0;\n      const strokesPerMin = N * strokeFactor;\n      const ipKw = (pm * L * A * strokesPerMin * n) / 60;\n      return {\n        value: Number(ipKw.toFixed(2)),\n        unit: 'kW',\n        steps: [\n          'Piston Area A = (π/4) · D² = (π/4) · (' + D + ')² = ' + A.toFixed(5) + ' m²',\n          'Power strokes/min = ' + N + ' × ' + strokeFactor + ' = ' + strokesPerMin,\n          'IP = (P_m · L · A · n_strokes · n_cyl) / 60 = (' + pm + ' × ' + L + ' × ' + A.toFixed(5) + ' × ' + strokesPerMin + ' × ' + n + ') / 60',\n          'Resulting IP = ' + ipKw.toFixed(2) + ' kW (' + (ipKw * 1.34102).toFixed(2) + ' hp)'\n        ]\n      };\n    }"
            }
          },
          {
            "title": "Mechanical Efficiency & SFC",
            "formula": "\\eta_{mech} = \\frac{BP}{IP} \\times 100, \\quad SFC = \\frac{m_f \\text{ (kg/h)}}{BP \\text{ (kW)}} \\text{ (kg/kW·h)}",
            "explanation": "FP = Friction Power = IP - BP. SFC = Specific fuel consumption in kg per kW·h.",
            "unit": "% & kg/kW·h"
          }
        ]
      },
      {
        "topicName": "Thermodynamics & IC Engine Cycles",
        "formulas": [
          {
            "title": "Air-Standard Otto & Diesel Cycle Efficiencies",
            "formula": "\\eta_{Otto} = 1 - \\frac{1}{r^{\\gamma-1}}, \\quad \\eta_{Diesel} = 1 - \\frac{1}{r^{\\gamma-1}} \\left[ \\frac{r_c^\\gamma - 1}{\\gamma(r_c - 1)} \\right]",
            "explanation": "r = Compression ratio (V_s + V_c)/V_c, r_c = Cut-off ratio V_3/V_2, \\gamma = Ratio of specific heats (1.4 for air).",
            "unit": "%"
          }
        ]
      },
      {
        "topicName": "Tractor Mechanics & Chassis Kinematics",
        "formulas": [
          {
            "title": "Wheel Slip & Tractive Efficiency",
            "formula": "S = \\left(1 - \\frac{V_a}{V_t}\\right) \\times 100, \\quad \\eta_t = \\frac{P_{db}}{P_{axle}} = (1 - S) \\left(1 - \\frac{C_r}{C_t}\\right)",
            "explanation": "V_a = Actual travel speed, V_t = Theoretical speed. C_r = Rolling resistance coefficient, C_t = Gross tractive ratio.",
            "unit": "%"
          },
          {
            "title": "Dynamic Weight Transfer on Chassis",
            "formula": "\\Delta W = \\frac{P_d \\cdot y + P_v \\cdot x_a}{L}",
            "explanation": "P_d = Drawbar pull (N), y = Drawbar height (m), P_v = Vertical drawbar force, L = Wheelbase (m).",
            "unit": "N or kg"
          }
        ]
      },
      {
        "topicName": "Human Engineering & Ergonomics",
        "formulas": [
          {
            "title": "Human Energy Expenditure Rate",
            "formula": "E = 0.042 \\cdot HR - 2.4 \\text{ (kJ/min)}, \\quad \\%HRR = \\frac{HR_{work} - HR_{rest}}{HR_{max} - HR_{rest}} \\times 100 \\%",
            "explanation": "HR = Heart rate during work (beats/min). HR_{max} = 220 - Age. E = Energy expenditure rate in kJ/min.",
            "unit": "kJ/min & %"
          }
        ]
      },
      {
        "topicName": "Clutches & Transmission",
        "formulas": [
          {
            "title": "Single Plate Clutch Torque Capacity",
            "formula": "T = \\mu F R_m \\text{ (N·m)}, \\quad R_m = \\frac{R_1 + R_2}{2} \\text{ (Uniform Wear)}, \\quad R_m = \\frac{2}{3}\\frac{R_2^3 - R_1^3}{R_2^2 - R_1^2} \\text{ (Uniform Pressure)}",
            "explanation": "\\mu = Friction coefficient, F = Total axial clamping force (N), R_1 & R_2 = Inner and outer disc radii (m).",
            "unit": "N·m"
          }
        ]
      },
      {
        "topicName": "Internal Combustion Engine Thermodynamics",
        "formulas": [
          {
            "title": "Brake Mean Effective Pressure (BMEP)",
            "formula": "BMEP = \\frac{60 \\cdot BP \\times 10^3}{L \\cdot A \\cdot N \\cdot n} \\quad [\\text{kPa}]",
            "explanation": "Hypothetical average pressure that, if applied during power stroke, produces measured Brake Power.",
            "unit": "kPa"
          },
          {
            "title": "Diesel Engine Cut-off Ratio",
            "formula": "r_c = \\frac{V_3}{V_2} = \\frac{T_3}{T_2}",
            "explanation": "Ratio of cylinder volume after constant pressure heat addition to clearance volume.",
            "unit": "Unitless"
          },
          {
            "title": "Engine Volumetric Efficiency",
            "formula": "\\eta_v = \\frac{\\dot{m}_{air}}{\\rho_{air} \\cdot V_d \\cdot (N/2)} \\times 100\\%",
            "explanation": "Ratio of actual mass of air aspirated into cylinder to theoretical swept volume displacement capacity.",
            "unit": "%"
          },
          {
            "title": "Brake Mean Effective Pressure (BMEP)",
            "formula": "BMEP = \\frac{60 \\cdot BP \\times 10^3}{L \\cdot A \\cdot N \\cdot n} \\quad [\\text{kPa}]",
            "explanation": "Hypothetical average pressure that, if applied during power stroke, produces measured Brake Power.",
            "unit": "kPa"
          },
          {
            "title": "Brake Power & Dynamometer Torque",
            "formula": "BP = \\frac{2\\pi N T}{60000} \\quad [\\text{kW}]",
            "explanation": "N is engine crankshaft RPM and T is brake torque measured at dynamometer in N·m.",
            "unit": "kW",
            "solver": {
              "id": "solver_brake_power",
              "name": "Brake Power (BP) & Torque Calculator",
              "description": "Computes Brake Power from measured dynamometer torque and crankshaft RPM.",
              "variables": [
                {
                  "key": "torque",
                  "label": "Brake Torque (T)",
                  "default": 280,
                  "unit": "N·m",
                  "min": 10,
                  "max": 1500,
                  "step": 5
                },
                {
                  "key": "rpm",
                  "label": "Engine Speed (N)",
                  "default": 2000,
                  "unit": "RPM",
                  "min": 500,
                  "max": 4000,
                  "step": 50
                }
              ],
              "computeCode": "(vars) => {\n      const T = Number(vars.torque);\n      const N = Number(vars.rpm);\n      const bpKw = (2 * Math.PI * N * T) / 60000;\n      return {\n        value: Number(bpKw.toFixed(2)),\n        unit: 'kW',\n        steps: [\n          'BP = (2π · N · T) / 60000',\n          'BP = (2 · π · ' + N + ' · ' + T + ') / 60000',\n          'Resulting BP = ' + bpKw.toFixed(2) + ' kW (' + (bpKw * 1.34102).toFixed(2) + ' hp)'\n        ]\n      };\n    }"
            }
          },
          {
            "title": "Diesel Engine Cut-off Ratio",
            "formula": "r_c = \\frac{V_3}{V_2} = \\frac{T_3}{T_2}",
            "explanation": "Ratio of cylinder volume after constant pressure heat addition to clearance volume.",
            "unit": "Unitless"
          },
          {
            "title": "Engine Volumetric Efficiency",
            "formula": "\\eta_v = \\frac{\\dot{m}_{air}}{\\rho_{air} \\cdot V_d \\cdot (N/2)} \\times 100\\%",
            "explanation": "Ratio of actual mass of air aspirated into cylinder to theoretical swept volume displacement capacity.",
            "unit": "%"
          }
        ]
      },
      {
        "topicName": "Tractor Mechanics & Traction Dynamics",
        "formulas": [
          {
            "title": "Bekker Soil Thrust (Gross Traction)",
            "formula": "H = A \\cdot c + W \\tan(\\phi)",
            "explanation": "Coulomb-Bekker shear equation where c is soil cohesion, A is tire contact area, W is dynamic axle load, and phi is soil internal friction angle.",
            "unit": "kN"
          },
          {
            "title": "Rolling Resistance Coefficient",
            "formula": "C_{rr} = \\frac{R_R}{W_n} = \\frac{1.2}{C_n} + 0.04",
            "explanation": "Brixius-Wismer wheel mobility number Cn = (CI * b * d) / W_n.",
            "unit": "Unitless"
          },
          {
            "title": "Tractor Dynamic Turning Radius",
            "formula": "R = \\frac{L}{\\sin(\\theta)} + \\frac{b}{2}",
            "explanation": "L is wheelbase, theta is steer angle of inner front wheel, and b is wheel track width.",
            "unit": "m"
          },
          {
            "title": "Rear Axle Critical Overturn Slope",
            "formula": "\\alpha_{crit} = \\arctan\\left(\\frac{x_r}{H_{cg}}\\right)",
            "explanation": "Critical hill slope angle at which tractor will tip rearward backwards.",
            "unit": "Degrees"
          },
          {
            "title": "Bekker Soil Thrust (Gross Traction)",
            "formula": "H = A \\cdot c + W \\tan(\\phi)",
            "explanation": "Coulomb-Bekker shear equation where c is soil cohesion, A is tire contact area, W is dynamic axle load, and phi is soil internal friction angle.",
            "unit": "kN"
          },
          {
            "title": "Rolling Resistance Coefficient",
            "formula": "C_{rr} = \\frac{R_R}{W_n} = \\frac{1.2}{C_n} + 0.04",
            "explanation": "Brixius-Wismer wheel mobility number Cn = (CI * b * d) / W_n.",
            "unit": "Unitless"
          },
          {
            "title": "Tractor Dynamic Turning Radius",
            "formula": "R = \\frac{L}{\\sin(\\theta)} + \\frac{b}{2}",
            "explanation": "L is wheelbase, theta is steer angle of inner front wheel, and b is wheel track width.",
            "unit": "m"
          },
          {
            "title": "Rear Axle Critical Overturn Slope",
            "formula": "\\alpha_{crit} = \\arctan\\left(\\frac{x_r}{H_{cg}}\\right)",
            "explanation": "Critical hill slope angle at which tractor will tip rearward backwards.",
            "unit": "Degrees"
          }
        ]
      }
    ]
  },
  {
    "category": "Section 4: Soil & Water Conservation Engineering",
    "code": "SWCE",
    "topics": [
      {
        "topicName": "Fluid Mechanics & Hydraulics",
        "formulas": [
          {
            "title": "Bernoulli's Energy Equation & Darcy Head Loss",
            "formula": "\\frac{P_1}{\\gamma} + \\frac{v_1^2}{2g} + z_1 = \\frac{P_2}{\\gamma} + \\frac{v_2^2}{2g} + z_2 + h_f, \\quad h_f = \\frac{f L v^2}{2 g d} = \\frac{8 f L Q^2}{\\pi^2 g d^5}",
            "explanation": "P/\\gamma = Pressure head, v²/2g = Velocity head, z = Datum. f = Darcy friction factor, L = Pipe length, d = Diameter.",
            "unit": "m"
          },
          {
            "title": "Manning's Open Channel Flow",
            "formula": "V = \\frac{1}{n} R^{2/3} S^{1/2} \\text{ (m/s)}, \\quad Q = \\frac{1}{n} A R^{2/3} S^{1/2} \\text{ (m³/s)}",
            "explanation": "n = Manning roughness coefficient, R = Hydraulic radius A/P (m), S = Bed slope.",
            "unit": "m/s & m³/s"
          }
        ]
      },
      {
        "topicName": "Hydrology & Watershed Runoff",
        "formulas": [
          {
            "title": "Rational Method Peak Runoff Rate",
            "formula": "Q_p = \\frac{C \\cdot I \\cdot A}{360} \\text{ (m³/s)}",
            "explanation": "C = Runoff coefficient, I = Rainfall intensity (mm/h), A = Catchment area (ha).",
            "unit": "m³/s",
            "solver": {
              "id": "solver_runoff_rational",
              "name": "Rational Peak Runoff Discharge Solver",
              "description": "Calculates peak runoff Q from catchment area, rainfall intensity, and runoff coefficient.",
              "variables": [
                {
                  "key": "C",
                  "label": "Runoff Coefficient (C)",
                  "default": 0.45,
                  "unit": "ratio",
                  "min": 0.05,
                  "max": 1,
                  "step": 0.02
                },
                {
                  "key": "I",
                  "label": "Rainfall Intensity (I)",
                  "default": 60,
                  "unit": "mm/h",
                  "min": 5,
                  "max": 200,
                  "step": 2
                },
                {
                  "key": "A",
                  "label": "Catchment Area (A)",
                  "default": 85,
                  "unit": "ha",
                  "min": 1,
                  "max": 5000,
                  "step": 1
                }
              ],
              "computeCode": "(vars) => {\n      const C = Number(vars.C);\n      const I = Number(vars.I);\n      const A = Number(vars.A);\n      const Q = (C * I * A) / 360;\n      return {\n        value: Number(Q.toFixed(3)),\n        unit: 'm³/s',\n        steps: [\n          'Rational Formula Q = (C · I · A) / 360',\n          'Q = (' + C + ' × ' + I + ' × ' + A + ') / 360',\n          'Peak Discharge Q = ' + Q.toFixed(3) + ' m³/s (' + (Q * 1000).toFixed(1) + ' L/s)'\n        ]\n      };\n    }"
            }
          },
          {
            "title": "SCS-CN Direct Runoff Depth",
            "formula": "Q = \\frac{(P - 0.2S)^2}{P + 0.8S} \\text{ (mm)}, \\quad S = \\frac{25400}{CN} - 254 \\text{ (mm)}",
            "explanation": "P = Rainfall depth (mm), S = Max potential retention (mm), CN = Curve Number.",
            "unit": "mm",
            "solver": {
              "id": "solver_scs_cn",
              "name": "SCS-CN Direct Runoff Depth Solver",
              "description": "Computes potential retention S and surface runoff depth Q from Curve Number and storm rain.",
              "variables": [
                {
                  "key": "CN",
                  "label": "Curve Number (CN)",
                  "default": 78,
                  "unit": "0-100",
                  "min": 30,
                  "max": 98,
                  "step": 1
                },
                {
                  "key": "P",
                  "label": "Total Rainfall (P)",
                  "default": 95,
                  "unit": "mm",
                  "min": 5,
                  "max": 500,
                  "step": 5
                }
              ],
              "computeCode": "(vars) => {\n      const CN = Number(vars.CN);\n      const P = Number(vars.P);\n      const S = (25400 / CN) - 254;\n      const Ia = 0.2 * S;\n      let Q = 0;\n      if (P > Ia) {\n        Q = Math.pow(P - Ia, 2) / (P + 0.8 * S);\n      }\n      return {\n        value: Number(Q.toFixed(2)),\n        unit: 'mm',\n        steps: [\n          'Potential Retention S = (25400 / ' + CN + ') - 254 = ' + S.toFixed(2) + ' mm',\n          'Initial Abstraction Ia = 0.2 · S = ' + Ia.toFixed(2) + ' mm',\n          P > Ia ? 'Since P (' + P + ' mm) > Ia (' + Ia.toFixed(2) + ' mm), runoff occurs:' : 'Since P (' + P + ' mm) <= Ia (' + Ia.toFixed(2) + ' mm), no surface runoff occurs (Q = 0).',\n          'Q = (P - 0.2·S)² / (P + 0.8·S) = ' + Q.toFixed(2) + ' mm'\n        ]\n      };\n    }"
            }
          },
          {
            "title": "Kirpich Time of Concentration",
            "formula": "t_c = 0.01947 \\cdot L^{0.77} \\cdot S^{-0.385} \\quad [\\text{minutes}]",
            "explanation": "L is maximum travel distance in meters, S is average catchment slope in m/m.",
            "unit": "min"
          },
          {
            "title": "Equilibrium Discharge in S-Hydrograph",
            "formula": "Q_e = \\frac{2.778 \\cdot A}{D} \\quad [\\text{m}^3/\\text{s}]",
            "explanation": "A is watershed area in km², D is duration in hours of excess rainfall.",
            "unit": "m³/s"
          },
          {
            "title": "Snyder's Synthetic Unit Hydrograph Basin Lag",
            "formula": "t_p = C_t (L \\cdot L_{ca})^{0.3}",
            "explanation": "Basin lag time in hours where L is main stream length (km) and L_ca is distance to centroid (km).",
            "unit": "hours"
          },
          {
            "title": "Kirpich Time of Concentration",
            "formula": "t_c = 0.01947 \\cdot L^{0.77} \\cdot S^{-0.385} \\quad [\\text{minutes}]",
            "explanation": "L is maximum travel distance in meters, S is average catchment slope in m/m.",
            "unit": "min"
          },
          {
            "title": "Equilibrium Discharge in S-Hydrograph",
            "formula": "Q_e = \\frac{2.778 \\cdot A}{D} \\quad [\\text{m}^3/\\text{s}]",
            "explanation": "A is watershed area in km², D is duration in hours of excess rainfall.",
            "unit": "m³/s"
          },
          {
            "title": "Snyder's Synthetic Unit Hydrograph Basin Lag",
            "formula": "t_p = C_t (L \\cdot L_{ca})^{0.3}",
            "explanation": "Basin lag time in hours where L is main stream length (km) and L_ca is distance to centroid (km).",
            "unit": "hours"
          }
        ]
      },
      {
        "topicName": "Soil Erosion & Conservation Structures",
        "formulas": [
          {
            "title": "Universal Soil Loss Equation (USLE)",
            "formula": "A = R \\cdot K \\cdot L \\cdot S \\cdot C \\cdot P",
            "explanation": "A = Soil loss (t/ha/yr), R = Rainfall erosivity, K = Soil erodibility, LS = Topographic factor, C = Cover, P = Practice.",
            "unit": "t/ha/yr"
          },
          {
            "title": "Contour Bund Spacing (Vertical & Horizontal Interval)",
            "formula": "VI = \\left( \\frac{S}{a} + b \\right) \\times 0.3 \\text{ (m)}, \\quad HI = \\frac{VI}{S} \\times 100 \\text{ (m)}",
            "explanation": "S = Land slope %, a & b = Regional constants. VI = Vertical interval, HI = Horizontal interval.",
            "unit": "m"
          }
        ]
      },
      {
        "topicName": "Soil Mechanics",
        "formulas": [
          {
            "title": "Soil Phase Relationships",
            "formula": "e = \\frac{V_v}{V_s}, \\quad n = \\frac{e}{1+e}, \\quad e \\cdot S_r = w \\cdot G_s, \\quad \\rho = \\frac{G_s(1+w)}{1+e} \\rho_w",
            "explanation": "e = Void ratio, n = Porosity, S_r = Degree of saturation, w = Water content, G_s = Specific gravity of soil solids.",
            "unit": "Unitless & kg/m³"
          },
          {
            "title": "Mohr-Coulomb Shear Strength",
            "formula": "\\tau = c + \\sigma \\tan\\phi",
            "explanation": "\\tau = Shear strength (kPa), c = Cohesion (kPa), \\sigma = Normal stress (kPa), \\phi = Internal friction angle.",
            "unit": "kPa"
          }
        ]
      },
      {
        "topicName": "Surveying & Leveling",
        "formulas": [
          {
            "title": "Leveling Reduced Level & Curvature Correction",
            "formula": "HI = RL + BS, \\quad RL = HI - FS, \\quad C_{cr} = 0.0673 D^2 \\text{ (m)}",
            "explanation": "HI = Height of Instrument, RL = Reduced Level, BS = Backsight, FS = Foresight, D = Distance (km).",
            "unit": "m"
          }
        ]
      },
      {
        "topicName": "Erosion & Sediment Transport",
        "formulas": [
          {
            "title": "Rainfall Kinetic Energy (Wischmeier & Smith)",
            "formula": "KE = 210.3 + 89 \\log_{10}(I) \\quad [\\text{J}/(\\text{m}^2\\cdot\\text{cm})]",
            "explanation": "Kinetic energy per unit rainfall depth where I is rainfall intensity in cm/h.",
            "unit": "J/(m²·cm)"
          },
          {
            "title": "USLE Slope Length Factor (L)",
            "formula": "L = \\left(\\frac{\\lambda}{22.13}\\right)^m, \\quad m = 0.5 \\text{ for } S \\ge 5\\%",
            "explanation": "Ratio of soil loss from given field slope length lambda to standard unit plot length 22.13 m.",
            "unit": "Unitless"
          },
          {
            "title": "Shields Parameter for Incipient Sediment Motion",
            "formula": "\\tau^* = \\frac{\\tau_0}{(\\rho_s - \\rho) g d_s} = \\frac{\\gamma R S}{(\\gamma_s - \\gamma) d_s}",
            "explanation": "Dimensionless shear stress for initiating sediment particle movement in earthen channels.",
            "unit": "Unitless"
          },
          {
            "title": "Rainfall Kinetic Energy (Wischmeier & Smith)",
            "formula": "KE = 210.3 + 89 \\log_{10}(I) \\quad [\\text{J}/(\\text{m}^2\\cdot\\text{cm})]",
            "explanation": "Kinetic energy per unit rainfall depth where I is rainfall intensity in cm/h.",
            "unit": "J/(m²·cm)"
          },
          {
            "title": "USLE Slope Length Factor (L)",
            "formula": "L = \\left(\\frac{\\lambda}{22.13}\\right)^m, \\quad m = 0.5 \\text{ for } S \\ge 5\\%",
            "explanation": "Ratio of soil loss from given field slope length lambda to standard unit plot length 22.13 m.",
            "unit": "Unitless"
          },
          {
            "title": "Shields Parameter for Incipient Sediment Motion",
            "formula": "\\tau^* = \\frac{\\tau_0}{(\\rho_s - \\rho) g d_s} = \\frac{\\gamma R S}{(\\gamma_s - \\gamma) d_s}",
            "explanation": "Dimensionless shear stress for initiating sediment particle movement in earthen channels.",
            "unit": "Unitless"
          }
        ]
      },
      {
        "topicName": "Open Channel & Soil Conservation Structures",
        "formulas": [
          {
            "title": "Energy Loss in Hydraulic Jump",
            "formula": "\\Delta E = \\frac{(y_2 - y_1)^3}{4 y_1 y_2}",
            "explanation": "Head loss dissipated across hydraulic jump from sequent depth y_1 to y_2 in rectangular channel.",
            "unit": "m",
            "solver": {
              "id": "solver_hydraulic_jump",
              "name": "Hydraulic Jump Sequent Depth & Energy Loss",
              "description": "Computes subcritical sequent depth y2 and energy head loss from upstream depth and Froude number.",
              "variables": [
                {
                  "key": "y1",
                  "label": "Initial Depth (y1)",
                  "default": 0.4,
                  "unit": "m",
                  "min": 0.05,
                  "max": 5,
                  "step": 0.05
                },
                {
                  "key": "Fr1",
                  "label": "Inlet Froude Number (Fr1)",
                  "default": 4.5,
                  "unit": "ratio",
                  "min": 1.1,
                  "max": 15,
                  "step": 0.1
                }
              ],
              "computeCode": "(vars) => {\n      const y1 = Number(vars.y1);\n      const Fr1 = Number(vars.Fr1);\n      const ratio = 0.5 * (Math.sqrt(1 + 8 * Math.pow(Fr1, 2)) - 1);\n      const y2 = y1 * ratio;\n      const deltaE = Math.pow(y2 - y1, 3) / (4 * y1 * y2);\n      return {\n        value: Number(y2.toFixed(3)),\n        unit: 'm',\n        steps: [\n          'Belanger Ratio y2/y1 = 0.5 · [√(1 + 8 · Fr1²) - 1] = 0.5 · [√(1 + 8·' + Fr1 + '²) - 1] = ' + ratio.toFixed(3),\n          'Sequent Depth y2 = y1 · ratio = ' + y1 + ' × ' + ratio.toFixed(3) + ' = ' + y2.toFixed(3) + ' m',\n          'Energy Head Loss ΔE = (y2 - y1)³ / (4 · y1 · y2) = ' + deltaE.toFixed(3) + ' m'\n        ]\n      };\n    }"
            }
          },
          {
            "title": "Straight Drop Weir Spillway Discharge",
            "formula": "Q = 1.77 \\cdot L \\cdot H^{3/2} \\quad [\\text{m}^3/\\text{s}]",
            "explanation": "L is crest length (m) and H is total head on crest (m).",
            "unit": "m³/s"
          },
          {
            "title": "Vertical Interval of Contour Terraces",
            "formula": "VI = 0.3 \\left(\\frac{S}{3} + 2\\right) \\quad [\\text{m}]",
            "explanation": "S is land slope in percent. Empirical design for contour bunds.",
            "unit": "m"
          },
          {
            "title": "Energy Loss in Hydraulic Jump",
            "formula": "\\Delta E = \\frac{(y_2 - y_1)^3}{4 y_1 y_2}",
            "explanation": "Head loss dissipated across hydraulic jump from sequent depth y_1 to y_2 in rectangular channel.",
            "unit": "m",
            "solver": {
              "id": "solver_hydraulic_jump",
              "name": "Hydraulic Jump Sequent Depth & Energy Loss",
              "description": "Computes subcritical sequent depth y2 and energy head loss from upstream depth and Froude number.",
              "variables": [
                {
                  "key": "y1",
                  "label": "Initial Depth (y1)",
                  "default": 0.4,
                  "unit": "m",
                  "min": 0.05,
                  "max": 5,
                  "step": 0.05
                },
                {
                  "key": "Fr1",
                  "label": "Inlet Froude Number (Fr1)",
                  "default": 4.5,
                  "unit": "ratio",
                  "min": 1.1,
                  "max": 15,
                  "step": 0.1
                }
              ],
              "computeCode": "(vars) => {\n      const y1 = Number(vars.y1);\n      const Fr1 = Number(vars.Fr1);\n      const ratio = 0.5 * (Math.sqrt(1 + 8 * Math.pow(Fr1, 2)) - 1);\n      const y2 = y1 * ratio;\n      const deltaE = Math.pow(y2 - y1, 3) / (4 * y1 * y2);\n      return {\n        value: Number(y2.toFixed(3)),\n        unit: 'm',\n        steps: [\n          'Belanger Ratio y2/y1 = 0.5 · [√(1 + 8 · Fr1²) - 1] = 0.5 · [√(1 + 8·' + Fr1 + '²) - 1] = ' + ratio.toFixed(3),\n          'Sequent Depth y2 = y1 · ratio = ' + y1 + ' × ' + ratio.toFixed(3) + ' = ' + y2.toFixed(3) + ' m',\n          'Energy Head Loss ΔE = (y2 - y1)³ / (4 · y1 · y2) = ' + deltaE.toFixed(3) + ' m'\n        ]\n      };\n    }"
            }
          },
          {
            "title": "Straight Drop Weir Spillway Discharge",
            "formula": "Q = 1.77 \\cdot L \\cdot H^{3/2} \\quad [\\text{m}^3/\\text{s}]",
            "explanation": "L is crest length (m) and H is total head on crest (m).",
            "unit": "m³/s"
          },
          {
            "title": "Vertical Interval of Contour Terraces",
            "formula": "VI = 0.3 \\left(\\frac{S}{3} + 2\\right) \\quad [\\text{m}]",
            "explanation": "S is land slope in percent. Empirical design for contour bunds.",
            "unit": "m"
          }
        ]
      }
    ]
  },
  {
    "category": "Section 5: Irrigation & Drainage Engineering",
    "code": "IDE",
    "topics": [
      {
        "topicName": "Groundwater Hydrology & Well Hydraulics",
        "formulas": [
          {
            "title": "Unconfined Aquifer Dupuit Well Discharge",
            "formula": "Q = \\frac{\\pi K (h_2^2 - h_1^2)}{\\ln(r_2/r_1)} \\text{ (m³/s)}",
            "explanation": "K = Hydraulic conductivity (m/s), h_1 & h_2 = Water table heights at radii r_1 & r_2 from well center.",
            "unit": "m³/s"
          },
          {
            "title": "Confined Aquifer Thiem Well Discharge",
            "formula": "Q = \\frac{2 \\pi K b (h_2 - h_1)}{\\ln(r_2/r_1)} = \\frac{2 \\pi T (h_2 - h_1)}{\\ln(r_2/r_1)}",
            "explanation": "b = Aquifer thickness (m), T = Transmissivity K·b (m²/s), h_2 - h_1 = Drawdown difference.",
            "unit": "m³/s"
          }
        ]
      },
      {
        "topicName": "Soil-Water-Plant Relationship",
        "formulas": [
          {
            "title": "Net Irrigation Depth & Available Water",
            "formula": "d = \\frac{\\rho_d}{\\rho_w} \\cdot D_z \\cdot \\frac{(FC - PWP)}{100} \\times MAD",
            "explanation": "\\rho_d/\\rho_w = Bulk specific gravity, D_z = Root depth, FC = Field capacity %, PWP = Wilting point %, MAD = Allowable depletion %.",
            "unit": "cm or mm"
          }
        ]
      },
      {
        "topicName": "Irrigation Conveyance & Application",
        "formulas": [
          {
            "title": "Irrigation Efficiencies (Conveyance & Application)",
            "formula": "\\eta_c = \\frac{W_f}{W_d} \\times 100, \\quad \\eta_a = \\frac{W_s}{W_f} \\times 100, \\quad \\eta_d = \\left(1 - \\frac{\\bar{d}}{D}\\right) \\times 100",
            "explanation": "W_f = Water delivered to field, W_d = Water diverted from source, W_s = Water stored in root zone.",
            "unit": "%"
          },
          {
            "title": "Drip & Sprinkler Discharge Rates",
            "formula": "q = k H^x \\text{ (L/h)}, \\quad R_{sprinkler} = \\frac{3600 \\cdot q}{S_l \\cdot S_m} \\text{ (mm/h)}",
            "explanation": "q = Emitter flow rate, H = Operating pressure head (m), S_l = Sprinkler spacing on lateral, S_m = Mainline spacing.",
            "unit": "L/h & mm/h"
          }
        ]
      },
      {
        "topicName": "Wells & Pumps",
        "formulas": [
          {
            "title": "Centrifugal Pump Specific Speed & Water Power",
            "formula": "N_s = \\frac{N \\sqrt{Q}}{H^{3/4}}, \\quad WP = \\frac{\\rho g Q H}{1000} \\text{ (kW)}, \\quad BP = \\frac{WP}{\\eta_p}",
            "explanation": "N = Speed (RPM), Q = Discharge (m³/s), H = Total head (m), WP = Water power (kW), BP = Shaft power.",
            "unit": "RPM & kW"
          }
        ]
      },
      {
        "topicName": "Agricultural Drainage",
        "formulas": [
          {
            "title": "Hooghoudt's Drain Spacing Equation",
            "formula": "S^2 = \\frac{8 K_2 d_e m + 4 K_1 m^2}{q}",
            "explanation": "S = Drain spacing (m), K_1 & K_2 = Conductivities above/below drain, m = Mid-span water table height, q = Drainage rate (m/day).",
            "unit": "m",
            "solver": {
              "id": "solver_hooghoudt",
              "name": "Hooghoudt Subsurface Drain Spacing Solver",
              "description": "Calculates pipe drain spacing S under steady-state rainfall recharge.",
              "variables": [
                {
                  "key": "K",
                  "label": "Hydraulic Conductivity (K)",
                  "default": 1.2,
                  "unit": "m/day",
                  "min": 0.05,
                  "max": 10,
                  "step": 0.05
                },
                {
                  "key": "m",
                  "label": "Mid-Point Water Rise (m)",
                  "default": 0.65,
                  "unit": "m",
                  "min": 0.1,
                  "max": 2.5,
                  "step": 0.05
                },
                {
                  "key": "d",
                  "label": "Equivalent Barrier Depth (d)",
                  "default": 1.8,
                  "unit": "m",
                  "min": 0.2,
                  "max": 10,
                  "step": 0.1
                },
                {
                  "key": "qMm",
                  "label": "Recharge / Drainage Coeff",
                  "default": 6,
                  "unit": "mm/day",
                  "min": 1,
                  "max": 30,
                  "step": 0.5
                }
              ],
              "computeCode": "(vars) => {\n      const K = Number(vars.K);\n      const m = Number(vars.m);\n      const d = Number(vars.d);\n      const q = Number(vars.qMm) / 1000; // to m/day\n      const sSquared = (8 * K * d * m + 4 * K * Math.pow(m, 2)) / q;\n      const S = Math.sqrt(sSquared);\n      return {\n        value: Number(S.toFixed(1)),\n        unit: 'meters',\n        steps: [\n          'Drainage coefficient q = ' + vars.qMm + ' mm/day = ' + q.toFixed(4) + ' m/day',\n          'S² = (8·K·d·m + 4·K·m²) / q = (8·' + K + '·' + d + '·' + m + ' + 4·' + K + '·' + m + '²) / ' + q.toFixed(4),\n          'S² = ' + sSquared.toFixed(1) + ' m²',\n          'Recommended Drain Spacing S = √(' + sSquared.toFixed(1) + ') = ' + S.toFixed(1) + ' meters'\n        ]\n      };\n    }"
            }
          }
        ]
      },
      {
        "topicName": "Crop Water Requirements & ET",
        "formulas": [
          {
            "title": "Readily Available Soil Water (RAW)",
            "formula": "RAW = MAD \\cdot \\frac{\\rho_b}{\\rho_w} \\left(\\frac{FC - PWP}{100}\\right) D_{root}",
            "explanation": "MAD is Management Allowed Depletion fraction (usually 0.50), FC is Field Capacity, PWP is Wilting Point.",
            "unit": "m or mm"
          },
          {
            "title": "Reference ET via Pan Evaporation",
            "formula": "ET_0 = K_{pan} \\cdot E_{pan}",
            "explanation": "K_{pan} is Class A pan coefficient (0.65 - 0.85 depending on wind and RH upwind fetch).",
            "unit": "mm/day"
          },
          {
            "title": "Crop Water Requirement Depth",
            "formula": "WR = ET_c + \\text{Leaching} + \\text{Special Requirements} - \\text{Effective Rainfall}",
            "explanation": "Net depth of irrigation water that must be applied to root zone to maintain non-stressed yield.",
            "unit": "mm"
          },
          {
            "title": "Readily Available Soil Water (RAW)",
            "formula": "RAW = MAD \\cdot \\frac{\\rho_b}{\\rho_w} \\left(\\frac{FC - PWP}{100}\\right) D_{root}",
            "explanation": "MAD is Management Allowed Depletion fraction (usually 0.50), FC is Field Capacity, PWP is Wilting Point.",
            "unit": "m or mm"
          },
          {
            "title": "Reference ET via Pan Evaporation",
            "formula": "ET_0 = K_{pan} \\cdot E_{pan}",
            "explanation": "K_{pan} is Class A pan coefficient (0.65 - 0.85 depending on wind and RH upwind fetch).",
            "unit": "mm/day"
          },
          {
            "title": "Crop Water Requirement Depth",
            "formula": "WR = ET_c + \\text{Leaching} + \\text{Special Requirements} - \\text{Effective Rainfall}",
            "explanation": "Net depth of irrigation water that must be applied to root zone to maintain non-stressed yield.",
            "unit": "mm"
          }
        ]
      },
      {
        "topicName": "Pressurized Irrigation Systems",
        "formulas": [
          {
            "title": "Christiansen Uniformity Coefficient (Cu)",
            "formula": "C_u = 100 \\left( 1 - \\frac{\\sum |X_i - \\bar{X}|}{n \\cdot \\bar{X}} \\right)",
            "explanation": "Standard statistical measure of sprinkler spray distribution uniformity over catch cans.",
            "unit": "%"
          },
          {
            "title": "Emitter Discharge Flow Exponent",
            "formula": "q = K_d \\cdot H^x \\implies x = \\frac{\\ln(q_1 / q_2)}{\\ln(H_1 / H_2)}",
            "explanation": "x = 0 for fully pressure-compensating, x = 0.5 for turbulent orifice flow.",
            "unit": "Unitless"
          },
          {
            "title": "Hazen-Williams Pipe Friction Head Loss",
            "formula": "h_f = 10.67 \\cdot \\frac{L \\cdot Q^{1.852}}{C^{1.852} \\cdot D^{4.87}}",
            "explanation": "C is Hazen-Williams roughness coefficient (140-150 for PVC/PE drip lateral pipes).",
            "unit": "m"
          },
          {
            "title": "Christiansen Uniformity Coefficient (Cu)",
            "formula": "C_u = 100 \\left( 1 - \\frac{\\sum |X_i - \\bar{X}|}{n \\cdot \\bar{X}} \\right)",
            "explanation": "Standard statistical measure of sprinkler spray distribution uniformity over catch cans.",
            "unit": "%"
          },
          {
            "title": "Emitter Discharge Flow Exponent",
            "formula": "q = K_d \\cdot H^x \\implies x = \\frac{\\ln(q_1 / q_2)}{\\ln(H_1 / H_2)}",
            "explanation": "x = 0 for fully pressure-compensating, x = 0.5 for turbulent orifice flow.",
            "unit": "Unitless"
          },
          {
            "title": "Hazen-Williams Pipe Friction Head Loss",
            "formula": "h_f = 10.67 \\cdot \\frac{L \\cdot Q^{1.852}}{C^{1.852} \\cdot D^{4.87}}",
            "explanation": "C is Hazen-Williams roughness coefficient (140-150 for PVC/PE drip lateral pipes).",
            "unit": "m"
          }
        ]
      },
      {
        "topicName": "Agricultural Drainage & Salinity",
        "formulas": [
          {
            "title": "Hooghoudt Drain Spacing (Deep Barrier)",
            "formula": "S^2 = \\frac{8 K_2 d m + 4 K_1 m^2}{q}",
            "explanation": "m is water table rise at mid-drain plane, d is equivalent depth of flow below drain level, q is recharge rate.",
            "unit": "m²",
            "solver": {
              "id": "solver_hooghoudt",
              "name": "Hooghoudt Subsurface Drain Spacing Solver",
              "description": "Calculates pipe drain spacing S under steady-state rainfall recharge.",
              "variables": [
                {
                  "key": "K",
                  "label": "Hydraulic Conductivity (K)",
                  "default": 1.2,
                  "unit": "m/day",
                  "min": 0.05,
                  "max": 10,
                  "step": 0.05
                },
                {
                  "key": "m",
                  "label": "Mid-Point Water Rise (m)",
                  "default": 0.65,
                  "unit": "m",
                  "min": 0.1,
                  "max": 2.5,
                  "step": 0.05
                },
                {
                  "key": "d",
                  "label": "Equivalent Barrier Depth (d)",
                  "default": 1.8,
                  "unit": "m",
                  "min": 0.2,
                  "max": 10,
                  "step": 0.1
                },
                {
                  "key": "qMm",
                  "label": "Recharge / Drainage Coeff",
                  "default": 6,
                  "unit": "mm/day",
                  "min": 1,
                  "max": 30,
                  "step": 0.5
                }
              ],
              "computeCode": "(vars) => {\n      const K = Number(vars.K);\n      const m = Number(vars.m);\n      const d = Number(vars.d);\n      const q = Number(vars.qMm) / 1000; // to m/day\n      const sSquared = (8 * K * d * m + 4 * K * Math.pow(m, 2)) / q;\n      const S = Math.sqrt(sSquared);\n      return {\n        value: Number(S.toFixed(1)),\n        unit: 'meters',\n        steps: [\n          'Drainage coefficient q = ' + vars.qMm + ' mm/day = ' + q.toFixed(4) + ' m/day',\n          'S² = (8·K·d·m + 4·K·m²) / q = (8·' + K + '·' + d + '·' + m + ' + 4·' + K + '·' + m + '²) / ' + q.toFixed(4),\n          'S² = ' + sSquared.toFixed(1) + ' m²',\n          'Recommended Drain Spacing S = √(' + sSquared.toFixed(1) + ') = ' + S.toFixed(1) + ' meters'\n        ]\n      };\n    }"
            }
          },
          {
            "title": "Leaching Requirement (LR)",
            "formula": "LR = \\frac{EC_{iw}}{5 EC_e - EC_{iw}}",
            "explanation": "Minimum fraction of applied water needed to maintain soil extract electrical conductivity below crop tolerance EC_e.",
            "unit": "Fraction"
          },
          {
            "title": "Sodium Adsorption Ratio (SAR)",
            "formula": "SAR = \\frac{[\\text{Na}^+]}{\\sqrt{([\\text{Ca}^{2+}] + [\\text{Mg}^{2+}])/2}}",
            "explanation": "Ionic concentrations must strictly be expressed in meq/L (or mmol/L).",
            "unit": "(meq/L)^0.5"
          },
          {
            "title": "Hooghoudt Drain Spacing (Deep Barrier)",
            "formula": "S^2 = \\frac{8 K_2 d m + 4 K_1 m^2}{q}",
            "explanation": "m is water table rise at mid-drain plane, d is equivalent depth of flow below drain level, q is recharge rate.",
            "unit": "m²",
            "solver": {
              "id": "solver_hooghoudt",
              "name": "Hooghoudt Subsurface Drain Spacing Solver",
              "description": "Calculates pipe drain spacing S under steady-state rainfall recharge.",
              "variables": [
                {
                  "key": "K",
                  "label": "Hydraulic Conductivity (K)",
                  "default": 1.2,
                  "unit": "m/day",
                  "min": 0.05,
                  "max": 10,
                  "step": 0.05
                },
                {
                  "key": "m",
                  "label": "Mid-Point Water Rise (m)",
                  "default": 0.65,
                  "unit": "m",
                  "min": 0.1,
                  "max": 2.5,
                  "step": 0.05
                },
                {
                  "key": "d",
                  "label": "Equivalent Barrier Depth (d)",
                  "default": 1.8,
                  "unit": "m",
                  "min": 0.2,
                  "max": 10,
                  "step": 0.1
                },
                {
                  "key": "qMm",
                  "label": "Recharge / Drainage Coeff",
                  "default": 6,
                  "unit": "mm/day",
                  "min": 1,
                  "max": 30,
                  "step": 0.5
                }
              ],
              "computeCode": "(vars) => {\n      const K = Number(vars.K);\n      const m = Number(vars.m);\n      const d = Number(vars.d);\n      const q = Number(vars.qMm) / 1000; // to m/day\n      const sSquared = (8 * K * d * m + 4 * K * Math.pow(m, 2)) / q;\n      const S = Math.sqrt(sSquared);\n      return {\n        value: Number(S.toFixed(1)),\n        unit: 'meters',\n        steps: [\n          'Drainage coefficient q = ' + vars.qMm + ' mm/day = ' + q.toFixed(4) + ' m/day',\n          'S² = (8·K·d·m + 4·K·m²) / q = (8·' + K + '·' + d + '·' + m + ' + 4·' + K + '·' + m + '²) / ' + q.toFixed(4),\n          'S² = ' + sSquared.toFixed(1) + ' m²',\n          'Recommended Drain Spacing S = √(' + sSquared.toFixed(1) + ') = ' + S.toFixed(1) + ' meters'\n        ]\n      };\n    }"
            }
          },
          {
            "title": "Leaching Requirement (LR)",
            "formula": "LR = \\frac{EC_{iw}}{5 EC_e - EC_{iw}}",
            "explanation": "Minimum fraction of applied water needed to maintain soil extract electrical conductivity below crop tolerance EC_e.",
            "unit": "Fraction"
          },
          {
            "title": "Sodium Adsorption Ratio (SAR)",
            "formula": "SAR = \\frac{[\\text{Na}^+]}{\\sqrt{([\\text{Ca}^{2+}] + [\\text{Mg}^{2+}])/2}}",
            "explanation": "Ionic concentrations must strictly be expressed in meq/L (or mmol/L).",
            "unit": "(meq/L)^0.5"
          }
        ]
      }
    ]
  },
  {
    "category": "Section 6: Agricultural Process Engineering",
    "code": "APE",
    "topics": [
      {
        "topicName": "Evaporation & Grain Drying",
        "formulas": [
          {
            "title": "Moisture Content Interconversion & Weight Loss",
            "formula": "M_{db} = \\frac{M_{wb}}{100 - M_{wb}} \\times 100, \\quad W_1 (1 - M_{wb1}) = W_2 (1 - M_{wb2})",
            "explanation": "Dry matter mass remains constant during drying! W_1 = Initial grain weight, W_2 = Final weight.",
            "unit": "% & kg"
          },
          {
            "title": "Thin Layer Drying (Lewis Model)",
            "formula": "\\frac{M - M_e}{M_0 - M_e} = \\exp(-k \\cdot t)",
            "explanation": "M = Moisture at time t, M_0 = Initial moisture, M_e = Equilibrium moisture content (EMC), k = Drying constant (h⁻¹).",
            "unit": "Ratio"
          },
          {
            "title": "Evaporator Steam Economy",
            "formula": "E = \\frac{m_v}{m_s} = \\frac{\\text{Mass of vapor produced}}{\\text{Mass of steam consumed}}, \\quad Q = U A \\Delta T",
            "explanation": "Single-effect economy is typically 0.7 - 0.9. U = Overall heat transfer coefficient, A = Area, \\Delta T = Temp difference.",
            "unit": "Ratio & W"
          }
        ]
      },
      {
        "topicName": "Size Reduction & Material Handling",
        "formulas": [
          {
            "title": "Fineness Modulus & Average Particle Size",
            "formula": "D_p = 0.135 \\cdot (1.366)^{FM} \\text{ (mm)}",
            "explanation": "FM = Fineness Modulus obtained by cumulative sum of weight fraction retained / 100. D_p in mm.",
            "unit": "mm"
          },
          {
            "title": "Size Reduction Laws (Rittinger, Kick, Bond)",
            "formula": "E_R = c \\left( \\frac{1}{x_2} - \\frac{1}{x_1} \\right), \\quad E_K = c \\ln\\left(\\frac{x_1}{x_2}\\right), \\quad P/f = 0.3162 \\cdot w_i \\left( \\frac{1}{\\sqrt{D_p}} - \\frac{1}{\\sqrt{D_f}} \\right)",
            "explanation": "Rittinger (new surface area), Kick (reduction ratio), Bond (industrial grinding, w_i = Work Index).",
            "unit": "kWh/tonne"
          },
          {
            "title": "Ball Mill Critical Speed",
            "formula": "n_c = \\frac{1}{2\\pi} \\sqrt{\\frac{g}{R - r}} \\text{ (rev/s)}",
            "explanation": "Operating speed is kept at 65% to 80% of critical speed n_c. R = Mill radius, r = Ball radius.",
            "unit": "rev/s"
          }
        ]
      },
      {
        "topicName": "Engineering Properties of Produce",
        "formulas": [
          {
            "title": "Grain Sphericity & Bulk Porosity",
            "formula": "\\phi = \\frac{(a b c)^{1/3}}{a}, \\quad \\epsilon = \\left(1 - \\frac{\\rho_b}{\\rho_p}\\right) \\times 100 \\%",
            "explanation": "a, b, c = Major, intermediate, minor tri-axial dimensions of grain. \\rho_b = Bulk density, \\rho_p = Particle density.",
            "unit": "Ratio & %"
          }
        ]
      },
      {
        "topicName": "Storage Structure Hydraulics",
        "formulas": [
          {
            "title": "Janssen's Grain Bin Lateral Pressure",
            "formula": "P_h = \\frac{w R}{\\mu'} \\left( 1 - e^{-k \\mu' y / R} \\right), \\quad P_v = \\frac{P_h}{k}",
            "explanation": "P_h = Lateral pressure (kPa), w = Grain bulk density, R = Hydraulic radius (A/U), \\mu' = Wall friction, y = Depth.",
            "unit": "kPa"
          }
        ]
      },
      {
        "topicName": "Psychrometry & Grain Drying",
        "formulas": [
          {
            "title": "Specific Humidity / Humidity Ratio",
            "formula": "W = 0.622 \\frac{p_v}{101.325 - p_v} \\quad [\\text{kg water / kg dry air}]",
            "explanation": "p_v is partial water vapor pressure in kPa at 1 atm barometric pressure.",
            "unit": "kg/kg",
            "solver": {
              "id": "solver_psychro_humidity",
              "name": "Moist Air Humidity Ratio & Enthalpy Solver",
              "description": "Calculates specific humidity ratio W and enthalpy h from dry bulb temperature and vapor pressure.",
              "variables": [
                {
                  "key": "Tdb",
                  "label": "Dry Bulb Temperature",
                  "default": 35,
                  "unit": "°C",
                  "min": 0,
                  "max": 90,
                  "step": 1
                },
                {
                  "key": "RH",
                  "label": "Relative Humidity",
                  "default": 55,
                  "unit": "%",
                  "min": 5,
                  "max": 100,
                  "step": 1
                }
              ],
              "computeCode": "(vars) => {\n      const T = Number(vars.Tdb);\n      const rh = Number(vars.RH) / 100;\n      const pSat = 0.61078 * Math.exp((17.27 * T) / (T + 237.3)); // kPa\n      const pv = rh * pSat;\n      const W = 0.622 * (pv / (101.325 - pv));\n      const h = 1.006 * T + W * (2501 + 1.86 * T);\n      return {\n        value: Number((W * 1000).toFixed(2)),\n        unit: 'g water / kg dry air',\n        steps: [\n          'Saturation Vapor Pressure p_sat = ' + pSat.toFixed(3) + ' kPa',\n          'Partial Vapor Pressure p_v = RH · p_sat = ' + rh.toFixed(2) + ' × ' + pSat.toFixed(3) + ' = ' + pv.toFixed(3) + ' kPa',\n          'Humidity Ratio W = 0.622 · [pv / (101.325 - pv)] = ' + W.toFixed(5) + ' kg/kg dry air (' + (W * 1000).toFixed(2) + ' g/kg)',\n          'Air Enthalpy h = 1.006·T + W·(2501 + 1.86·T) = ' + h.toFixed(2) + ' kJ/kg dry air'\n        ]\n      };\n    }"
            }
          },
          {
            "title": "Page's Thin Layer Drying Model",
            "formula": "MR = \\frac{M - M_e}{M_0 - M_e} = \\exp(-k \\cdot t^n)",
            "explanation": "k is drying constant (1/h^n) and n is empirical time exponent for cereal grain thin-layer drying.",
            "unit": "Fraction"
          },
          {
            "title": "Henderson Sorption Isotherm (EMC)",
            "formula": "1 - RH = \\exp[-K (T + C) M_e^N]",
            "explanation": "RH is decimal equilibrium relative humidity, T is temperature in °C, M_e is decimal dry basis moisture.",
            "unit": "Fraction"
          },
          {
            "title": "Specific Humidity / Humidity Ratio",
            "formula": "W = 0.622 \\frac{p_v}{101.325 - p_v} \\quad [\\text{kg water / kg dry air}]",
            "explanation": "p_v is partial water vapor pressure in kPa at 1 atm barometric pressure.",
            "unit": "kg/kg",
            "solver": {
              "id": "solver_psychro_humidity",
              "name": "Moist Air Humidity Ratio & Enthalpy Solver",
              "description": "Calculates specific humidity ratio W and enthalpy h from dry bulb temperature and vapor pressure.",
              "variables": [
                {
                  "key": "Tdb",
                  "label": "Dry Bulb Temperature",
                  "default": 35,
                  "unit": "°C",
                  "min": 0,
                  "max": 90,
                  "step": 1
                },
                {
                  "key": "RH",
                  "label": "Relative Humidity",
                  "default": 55,
                  "unit": "%",
                  "min": 5,
                  "max": 100,
                  "step": 1
                }
              ],
              "computeCode": "(vars) => {\n      const T = Number(vars.Tdb);\n      const rh = Number(vars.RH) / 100;\n      const pSat = 0.61078 * Math.exp((17.27 * T) / (T + 237.3)); // kPa\n      const pv = rh * pSat;\n      const W = 0.622 * (pv / (101.325 - pv));\n      const h = 1.006 * T + W * (2501 + 1.86 * T);\n      return {\n        value: Number((W * 1000).toFixed(2)),\n        unit: 'g water / kg dry air',\n        steps: [\n          'Saturation Vapor Pressure p_sat = ' + pSat.toFixed(3) + ' kPa',\n          'Partial Vapor Pressure p_v = RH · p_sat = ' + rh.toFixed(2) + ' × ' + pSat.toFixed(3) + ' = ' + pv.toFixed(3) + ' kPa',\n          'Humidity Ratio W = 0.622 · [pv / (101.325 - pv)] = ' + W.toFixed(5) + ' kg/kg dry air (' + (W * 1000).toFixed(2) + ' g/kg)',\n          'Air Enthalpy h = 1.006·T + W·(2501 + 1.86·T) = ' + h.toFixed(2) + ' kJ/kg dry air'\n        ]\n      };\n    }"
            }
          },
          {
            "title": "Page's Thin Layer Drying Model",
            "formula": "MR = \\frac{M - M_e}{M_0 - M_e} = \\exp(-k \\cdot t^n)",
            "explanation": "k is drying constant (1/h^n) and n is empirical time exponent for cereal grain thin-layer drying.",
            "unit": "Fraction"
          },
          {
            "title": "Henderson Sorption Isotherm (EMC)",
            "formula": "1 - RH = \\exp[-K (T + C) M_e^N]",
            "explanation": "RH is decimal equilibrium relative humidity, T is temperature in °C, M_e is decimal dry basis moisture.",
            "unit": "Fraction"
          }
        ]
      },
      {
        "topicName": "Comminution & Mechanical Separation",
        "formulas": [
          {
            "title": "Bond's Comminution Law",
            "formula": "E = 100 W_i \\left( \\frac{1}{\\sqrt{D_2}} - \\frac{1}{\\sqrt{D_1}} \\right)",
            "explanation": "W_i is Bond Work Index in kWh/tonne; D_1 and D_2 are 80% passing diameters in microns.",
            "unit": "kWh/tonne"
          },
          {
            "title": "Lapple Cyclone Cut Diameter (d50)",
            "formula": "d_{50} = \\sqrt{\\frac{9 \\mu W}{2\\pi N_e v_i (\\rho_p - \\rho_g)}}",
            "explanation": "Aerodynamic diameter of dust particle separated with 50% efficiency in cyclone separator.",
            "unit": "m"
          },
          {
            "title": "Air-Screen Cleaner Terminal Velocity Drag",
            "formula": "v_t = \\sqrt{\\frac{2 m g}{\\rho_a A C_d}}",
            "explanation": "Terminal settling velocity where upward air drag balances grain weight.",
            "unit": "m/s"
          },
          {
            "title": "Bond's Comminution Law",
            "formula": "E = 100 W_i \\left( \\frac{1}{\\sqrt{D_2}} - \\frac{1}{\\sqrt{D_1}} \\right)",
            "explanation": "W_i is Bond Work Index in kWh/tonne; D_1 and D_2 are 80% passing diameters in microns.",
            "unit": "kWh/tonne"
          },
          {
            "title": "Lapple Cyclone Cut Diameter (d50)",
            "formula": "d_{50} = \\sqrt{\\frac{9 \\mu W}{2\\pi N_e v_i (\\rho_p - \\rho_g)}}",
            "explanation": "Aerodynamic diameter of dust particle separated with 50% efficiency in cyclone separator.",
            "unit": "m"
          },
          {
            "title": "Air-Screen Cleaner Terminal Velocity Drag",
            "formula": "v_t = \\sqrt{\\frac{2 m g}{\\rho_a A C_d}}",
            "explanation": "Terminal settling velocity where upward air drag balances grain weight.",
            "unit": "m/s"
          }
        ]
      },
      {
        "topicName": "Material Handling & Storage",
        "formulas": [
          {
            "title": "Janssen's Equation for Deep Grain Bin Pressure",
            "formula": "L(z) = \\frac{\\gamma R}{k' \\mu'} \\left[ 1 - \\exp\\left(-\\frac{k' \\mu' z}{R}\\right) \\right]",
            "explanation": "Lateral grain pressure on silo wall at depth z; R = hydraulic radius A/U, k' = ratio of lateral to vertical pressure.",
            "unit": "kPa"
          },
          {
            "title": "Bucket Elevator Head Pulley Critical Velocity",
            "formula": "v_{crit} = \\sqrt{g R}",
            "explanation": "Minimum peripheral velocity of head pulley to guarantee centrifugal throw discharge of grain.",
            "unit": "m/s"
          },
          {
            "title": "Screw Conveyor Volumetric Capacity",
            "formula": "Q_v = 60 \\cdot \\frac{\\pi}{4}(D^2 - d^2) \\cdot P \\cdot N \\cdot \\psi",
            "explanation": "D is flight diameter, d is shaft diameter, P is pitch, N is RPM, psi is loading fill factor (0.3-0.45).",
            "unit": "m³/h"
          },
          {
            "title": "Janssen's Equation for Deep Grain Bin Pressure",
            "formula": "L(z) = \\frac{\\gamma R}{k' \\mu'} \\left[ 1 - \\exp\\left(-\\frac{k' \\mu' z}{R}\\right) \\right]",
            "explanation": "Lateral grain pressure on silo wall at depth z; R = hydraulic radius A/U, k' = ratio of lateral to vertical pressure.",
            "unit": "kPa"
          },
          {
            "title": "Bucket Elevator Head Pulley Critical Velocity",
            "formula": "v_{crit} = \\sqrt{g R}",
            "explanation": "Minimum peripheral velocity of head pulley to guarantee centrifugal throw discharge of grain.",
            "unit": "m/s"
          },
          {
            "title": "Screw Conveyor Volumetric Capacity",
            "formula": "Q_v = 60 \\cdot \\frac{\\pi}{4}(D^2 - d^2) \\cdot P \\cdot N \\cdot \\psi",
            "explanation": "D is flight diameter, d is shaft diameter, P is pitch, N is RPM, psi is loading fill factor (0.3-0.45).",
            "unit": "m³/h"
          },
          {
            "title": "Reynolds Number & Pipe Flow Regimes",
            "formula": "Re = \\frac{\\rho v D}{\\mu} = \\frac{v D}{\\nu}",
            "explanation": "Dimensionless ratio of inertial to viscous forces. Re < 2100 laminar, Re > 4000 turbulent.",
            "unit": "Dimensionless",
            "solver": {
              "id": "solver_reynolds",
              "name": "Reynolds Number (Re) Flow Regime Solver",
              "description": "Computes pipe Reynolds number and identifies whether fluid flow is laminar, transitional, or turbulent.",
              "variables": [
                {
                  "key": "rho",
                  "label": "Fluid Density (ρ)",
                  "default": 1000,
                  "unit": "kg/m³",
                  "min": 0.5,
                  "max": 2500,
                  "step": 10
                },
                {
                  "key": "velocity",
                  "label": "Flow Velocity (v)",
                  "default": 1.5,
                  "unit": "m/s",
                  "min": 0.01,
                  "max": 30,
                  "step": 0.1
                },
                {
                  "key": "diameter",
                  "label": "Pipe Diameter (D)",
                  "default": 0.05,
                  "unit": "m",
                  "min": 0.002,
                  "max": 2,
                  "step": 0.005
                },
                {
                  "key": "viscosity",
                  "label": "Dynamic Viscosity (μ)",
                  "default": 0.001,
                  "unit": "Pa·s",
                  "min": 0.00001,
                  "max": 0.5,
                  "step": 0.0001
                }
              ],
              "computeCode": "(vars) => {\n      const rho = Number(vars.rho);\n      const v = Number(vars.velocity);\n      const D = Number(vars.diameter);\n      const mu = Number(vars.viscosity);\n      const Re = (rho * v * D) / mu;\n      let regime = 'Turbulent (Re > 4000)';\n      if (Re < 2100) regime = 'Laminar (Re < 2100)';\n      else if (Re <= 4000) regime = 'Transitional (2100 ≤ Re ≤ 4000)';\n      return {\n        value: Math.round(Re),\n        unit: 'Dimensionless',\n        steps: [\n          'Re = (ρ · v · D) / μ = (' + rho + ' × ' + v + ' × ' + D + ') / ' + mu,\n          'Re = ' + Math.round(Re).toLocaleString(),\n          'Flow Regime: ' + regime\n        ]\n      };\n    }"
            }
          }
        ]
      }
    ]
  },
  {
    "category": "Section 7: Dairy & Food Engineering",
    "code": "DFE",
    "topics": [
      {
        "topicName": "Heat & Mass Transfer in Food Processing",
        "formulas": [
          {
            "title": "Overall Heat Transfer Coefficient & LMTD",
            "formula": "\\frac{1}{U} = \\frac{1}{h_i} + \\frac{x}{k} + \\frac{1}{h_o}, \\quad \\Delta T_{lm} = \\frac{\\Delta T_1 - \\Delta T_2}{\\ln(\\Delta T_1 / \\Delta T_2)}",
            "explanation": "h_i & h_o = Convective heat transfer coefficients, x = Wall thickness, k = Thermal conductivity.",
            "unit": "W/m²K & °C",
            "solver": {
              "id": "solver_lmtd",
              "name": "Log Mean Temperature Difference (LMTD) Solver",
              "description": "Computes LMTD for counter-flow and parallel-flow heat exchangers.",
              "variables": [
                {
                  "key": "dt1",
                  "label": "Temperature Difference 1 (ΔT1)",
                  "default": 38,
                  "unit": "°C",
                  "min": 1,
                  "max": 150,
                  "step": 1
                },
                {
                  "key": "dt2",
                  "label": "Temperature Difference 2 (ΔT2)",
                  "default": 14,
                  "unit": "°C",
                  "min": 1,
                  "max": 150,
                  "step": 1
                }
              ],
              "computeCode": "(vars) => {\n      const dt1 = Number(vars.dt1);\n      const dt2 = Number(vars.dt2);\n      let lmtd;\n      if (Math.abs(dt1 - dt2) < 0.001) {\n        lmtd = dt1;\n      } else {\n        lmtd = (dt1 - dt2) / Math.log(dt1 / dt2);\n      }\n      return {\n        value: Number(lmtd.toFixed(2)),\n        unit: '°C',\n        steps: [\n          'LMTD Formula ΔT_lm = (ΔT1 - ΔT2) / ln(ΔT1 / ΔT2)',\n          'ΔT_lm = (' + dt1 + ' - ' + dt2 + ') / ln(' + dt1 + ' / ' + dt2 + ')',\n          'Log Mean Temp Diff = ' + lmtd.toFixed(2) + ' °C'\n        ]\n      };\n    }"
            }
          },
          {
            "title": "Biot Number & Fourier Number",
            "formula": "Bi = \\frac{h L}{k_s}, \\quad Fo = \\frac{\\alpha t}{L^2} = \\frac{k_s t}{\\rho c_p L^2}",
            "explanation": "Bi < 0.1: Lumped capacitance method applies. \\alpha = Thermal diffusivity (m²/s), L = Characteristic length.",
            "unit": "Dimensionless"
          },
          {
            "title": "Plate Heat Exchanger Regeneration Efficiency",
            "formula": "\\text{Regen (\\%)} = \\frac{T_{regen} - T_{in}}{T_{past} - T_{in}} \\times 100\\%",
            "explanation": "Percentage of heating load recovered by cross-exchanging hot pasteurized milk with cold raw incoming milk.",
            "unit": "%"
          },
          {
            "title": "Log Mean Temperature Difference (LMTD)",
            "formula": "\\Delta T_{lm} = \\frac{\\Delta T_1 - \\Delta T_2}{\\ln(\\Delta T_1 / \\Delta T_2)}",
            "explanation": "Delta T1 and Delta T2 are terminal temperature approaches at heat exchanger ends.",
            "unit": "°C or K",
            "solver": {
              "id": "solver_lmtd",
              "name": "Log Mean Temperature Difference (LMTD) Solver",
              "description": "Computes LMTD for counter-flow and parallel-flow heat exchangers.",
              "variables": [
                {
                  "key": "dt1",
                  "label": "Temperature Difference 1 (ΔT1)",
                  "default": 38,
                  "unit": "°C",
                  "min": 1,
                  "max": 150,
                  "step": 1
                },
                {
                  "key": "dt2",
                  "label": "Temperature Difference 2 (ΔT2)",
                  "default": 14,
                  "unit": "°C",
                  "min": 1,
                  "max": 150,
                  "step": 1
                }
              ],
              "computeCode": "(vars) => {\n      const dt1 = Number(vars.dt1);\n      const dt2 = Number(vars.dt2);\n      let lmtd;\n      if (Math.abs(dt1 - dt2) < 0.001) {\n        lmtd = dt1;\n      } else {\n        lmtd = (dt1 - dt2) / Math.log(dt1 / dt2);\n      }\n      return {\n        value: Number(lmtd.toFixed(2)),\n        unit: '°C',\n        steps: [\n          'LMTD Formula ΔT_lm = (ΔT1 - ΔT2) / ln(ΔT1 / ΔT2)',\n          'ΔT_lm = (' + dt1 + ' - ' + dt2 + ') / ln(' + dt1 + ' / ' + dt2 + ')',\n          'Log Mean Temp Diff = ' + lmtd.toFixed(2) + ' °C'\n        ]\n      };\n    }"
            }
          },
          {
            "title": "Planck's Freezing Time Equation",
            "formula": "t_F = \\frac{\\rho \\lambda}{T_F - T_\\infty} \\left( \\frac{P a}{h} + \\frac{R a^2}{k} \\right)",
            "explanation": "a is characteristic dimension, P and R are shape factors (1/2, 1/8 for slab; 1/6, 1/24 for sphere).",
            "unit": "seconds"
          },
          {
            "title": "Plate Heat Exchanger Regeneration Efficiency",
            "formula": "\\text{Regen (\\%)} = \\frac{T_{regen} - T_{in}}{T_{past} - T_{in}} \\times 100\\%",
            "explanation": "Percentage of heating load recovered by cross-exchanging hot pasteurized milk with cold raw incoming milk.",
            "unit": "%"
          },
          {
            "title": "Log Mean Temperature Difference (LMTD)",
            "formula": "\\Delta T_{lm} = \\frac{\\Delta T_1 - \\Delta T_2}{\\ln(\\Delta T_1 / \\Delta T_2)}",
            "explanation": "Delta T1 and Delta T2 are terminal temperature approaches at heat exchanger ends.",
            "unit": "°C or K",
            "solver": {
              "id": "solver_lmtd",
              "name": "Log Mean Temperature Difference (LMTD) Solver",
              "description": "Computes LMTD for counter-flow and parallel-flow heat exchangers.",
              "variables": [
                {
                  "key": "dt1",
                  "label": "Temperature Difference 1 (ΔT1)",
                  "default": 38,
                  "unit": "°C",
                  "min": 1,
                  "max": 150,
                  "step": 1
                },
                {
                  "key": "dt2",
                  "label": "Temperature Difference 2 (ΔT2)",
                  "default": 14,
                  "unit": "°C",
                  "min": 1,
                  "max": 150,
                  "step": 1
                }
              ],
              "computeCode": "(vars) => {\n      const dt1 = Number(vars.dt1);\n      const dt2 = Number(vars.dt2);\n      let lmtd;\n      if (Math.abs(dt1 - dt2) < 0.001) {\n        lmtd = dt1;\n      } else {\n        lmtd = (dt1 - dt2) / Math.log(dt1 / dt2);\n      }\n      return {\n        value: Number(lmtd.toFixed(2)),\n        unit: '°C',\n        steps: [\n          'LMTD Formula ΔT_lm = (ΔT1 - ΔT2) / ln(ΔT1 / ΔT2)',\n          'ΔT_lm = (' + dt1 + ' - ' + dt2 + ') / ln(' + dt1 + ' / ' + dt2 + ')',\n          'Log Mean Temp Diff = ' + lmtd.toFixed(2) + ' °C'\n        ]\n      };\n    }"
            }
          },
          {
            "title": "Planck's Freezing Time Equation",
            "formula": "t_F = \\frac{\\rho \\lambda}{T_F - T_\\infty} \\left( \\frac{P a}{h} + \\frac{R a^2}{k} \\right)",
            "explanation": "a is characteristic dimension, P and R are shape factors (1/2, 1/8 for slab; 1/6, 1/24 for sphere).",
            "unit": "seconds"
          }
        ]
      },
      {
        "topicName": "Food Preservation & Thermal Processing",
        "formulas": [
          {
            "title": "Thermal Death Kinetics (D-Value & Z-Value)",
            "formula": "\\log\\left(\\frac{N_0}{N_t}\\right) = \\frac{t}{D}, \\quad z = \\frac{T_2 - T_1}{\\log D_1 - \\log D_2}, \\quad F_0 = D_{121}(\\log N_0 - \\log N_t)",
            "explanation": "D-value = Time at temp T to reduce microbes by 90% (1 log cycle). Z-value = Temp change for 10-fold D-value change.",
            "unit": "min & °C",
            "solver": {
              "id": "solver_thermal_d_value",
              "name": "Thermal Processing D-Value & Lethality Solver",
              "description": "Computes D-value and process time for target log cycle microbial reduction.",
              "variables": [
                {
                  "key": "timeMin",
                  "label": "Heating Duration (t)",
                  "default": 12,
                  "unit": "min",
                  "min": 0.5,
                  "max": 120,
                  "step": 0.5
                },
                {
                  "key": "N0",
                  "label": "Initial Microbes (N0)",
                  "default": 100000,
                  "unit": "CFU/mL",
                  "min": 100,
                  "max": 1000000000,
                  "step": 1000
                },
                {
                  "key": "N",
                  "label": "Surviving Microbes (N)",
                  "default": 10,
                  "unit": "CFU/mL",
                  "min": 1,
                  "max": 100000,
                  "step": 1
                }
              ],
              "computeCode": "(vars) => {\n      const t = Number(vars.timeMin);\n      const N0 = Number(vars.N0);\n      const N = Number(vars.N);\n      const logRed = Math.log10(N0 / N);\n      const D = t / logRed;\n      const k = 2.303 / D;\n      return {\n        value: Number(D.toFixed(2)),\n        unit: 'minutes',\n        steps: [\n          'Log cycles reduced = log10(' + N0 + ' / ' + N + ') = ' + logRed.toFixed(2) + ' cycles',\n          'D-value = t / [log10(N0/N)] = ' + t + ' / ' + logRed.toFixed(2) + ' = ' + D.toFixed(2) + ' minutes',\n          'First-order reaction rate constant k = 2.303 / D = ' + k.toFixed(3) + ' min⁻¹'\n        ]\n      };\n    }"
            }
          },
          {
            "title": "Plank's Food Freezing Time Equation",
            "formula": "t_f = \\frac{\\rho_f L}{\\Delta T} \\left[ \\frac{P \\cdot a}{h} + \\frac{R \\cdot a^2}{k_f} \\right]",
            "explanation": "\\rho_f = Frozen food density, L = Latent heat of freezing, a = Slab thickness, P & R = Shape factors (1/2 & 1/8 for slab).",
            "unit": "Hours or Seconds"
          }
        ]
      },
      {
        "topicName": "Thermal Processing & Kinetics",
        "formulas": [
          {
            "title": "Thermal Death Time D-Value",
            "formula": "D = \\frac{t}{\\log_{10}(N_0 / N)} = \\frac{2.303}{k}",
            "explanation": "Decimal reduction time in minutes at constant temperature to achieve 90% microbial destruction.",
            "unit": "min",
            "solver": {
              "id": "solver_thermal_d_value",
              "name": "Thermal Processing D-Value & Lethality Solver",
              "description": "Computes D-value and process time for target log cycle microbial reduction.",
              "variables": [
                {
                  "key": "timeMin",
                  "label": "Heating Duration (t)",
                  "default": 12,
                  "unit": "min",
                  "min": 0.5,
                  "max": 120,
                  "step": 0.5
                },
                {
                  "key": "N0",
                  "label": "Initial Microbes (N0)",
                  "default": 100000,
                  "unit": "CFU/mL",
                  "min": 100,
                  "max": 1000000000,
                  "step": 1000
                },
                {
                  "key": "N",
                  "label": "Surviving Microbes (N)",
                  "default": 10,
                  "unit": "CFU/mL",
                  "min": 1,
                  "max": 100000,
                  "step": 1
                }
              ],
              "computeCode": "(vars) => {\n      const t = Number(vars.timeMin);\n      const N0 = Number(vars.N0);\n      const N = Number(vars.N);\n      const logRed = Math.log10(N0 / N);\n      const D = t / logRed;\n      const k = 2.303 / D;\n      return {\n        value: Number(D.toFixed(2)),\n        unit: 'minutes',\n        steps: [\n          'Log cycles reduced = log10(' + N0 + ' / ' + N + ') = ' + logRed.toFixed(2) + ' cycles',\n          'D-value = t / [log10(N0/N)] = ' + t + ' / ' + logRed.toFixed(2) + ' = ' + D.toFixed(2) + ' minutes',\n          'First-order reaction rate constant k = 2.303 / D = ' + k.toFixed(3) + ' min⁻¹'\n        ]\n      };\n    }"
            }
          },
          {
            "title": "Thermal Resistance z-Value",
            "formula": "z = \\frac{T_2 - T_1}{\\log_{10}(D_1 / D_2)}",
            "explanation": "Temperature rise required to reduce D-value by 1 log cycle (factor of 10).",
            "unit": "°C"
          },
          {
            "title": "Sterilization Value F0 (12D Process)",
            "formula": "F_0 = 12 \\cdot D_{121.1} = \\Delta t \\sum 10^{\\frac{T - 121.1}{z}}",
            "explanation": "Equivalent minutes at 121.1°C; standard C. botulinum cook requires F0 approx 2.52 minutes.",
            "unit": "min"
          },
          {
            "title": "Thermal Death Time D-Value",
            "formula": "D = \\frac{t}{\\log_{10}(N_0 / N)} = \\frac{2.303}{k}",
            "explanation": "Decimal reduction time in minutes at constant temperature to achieve 90% microbial destruction.",
            "unit": "min",
            "solver": {
              "id": "solver_thermal_d_value",
              "name": "Thermal Processing D-Value & Lethality Solver",
              "description": "Computes D-value and process time for target log cycle microbial reduction.",
              "variables": [
                {
                  "key": "timeMin",
                  "label": "Heating Duration (t)",
                  "default": 12,
                  "unit": "min",
                  "min": 0.5,
                  "max": 120,
                  "step": 0.5
                },
                {
                  "key": "N0",
                  "label": "Initial Microbes (N0)",
                  "default": 100000,
                  "unit": "CFU/mL",
                  "min": 100,
                  "max": 1000000000,
                  "step": 1000
                },
                {
                  "key": "N",
                  "label": "Surviving Microbes (N)",
                  "default": 10,
                  "unit": "CFU/mL",
                  "min": 1,
                  "max": 100000,
                  "step": 1
                }
              ],
              "computeCode": "(vars) => {\n      const t = Number(vars.timeMin);\n      const N0 = Number(vars.N0);\n      const N = Number(vars.N);\n      const logRed = Math.log10(N0 / N);\n      const D = t / logRed;\n      const k = 2.303 / D;\n      return {\n        value: Number(D.toFixed(2)),\n        unit: 'minutes',\n        steps: [\n          'Log cycles reduced = log10(' + N0 + ' / ' + N + ') = ' + logRed.toFixed(2) + ' cycles',\n          'D-value = t / [log10(N0/N)] = ' + t + ' / ' + logRed.toFixed(2) + ' = ' + D.toFixed(2) + ' minutes',\n          'First-order reaction rate constant k = 2.303 / D = ' + k.toFixed(3) + ' min⁻¹'\n        ]\n      };\n    }"
            }
          },
          {
            "title": "Thermal Resistance z-Value",
            "formula": "z = \\frac{T_2 - T_1}{\\log_{10}(D_1 / D_2)}",
            "explanation": "Temperature rise required to reduce D-value by 1 log cycle (factor of 10).",
            "unit": "°C"
          },
          {
            "title": "Sterilization Value F0 (12D Process)",
            "formula": "F_0 = 12 \\cdot D_{121.1} = \\Delta t \\sum 10^{\\frac{T - 121.1}{z}}",
            "explanation": "Equivalent minutes at 121.1°C; standard C. botulinum cook requires F0 approx 2.52 minutes.",
            "unit": "min"
          }
        ]
      },
      {
        "topicName": "Food Rheology & Homogenization",
        "formulas": [
          {
            "title": "Power Law (Ostwald-de Waele) Shear Stress",
            "formula": "\\tau = K \\cdot \\dot{\\gamma}^n",
            "explanation": "K is consistency index, n is flow behavior index (n < 1 pseudoplastic, n > 1 dilatant, n = 1 Newtonian).",
            "unit": "Pa"
          },
          {
            "title": "Stokes Law of Milk Fat Creaming",
            "formula": "v_{cream} = \\frac{g d^2 (\\rho_{serum} - \\rho_{fat})}{18 \\mu}",
            "explanation": "Homogenization reduces fat globule diameter d from 4 um to < 1 um, reducing creaming rate by over 20-fold.",
            "unit": "m/s"
          },
          {
            "title": "Multiple Effect Evaporator Steam Economy",
            "formula": "\\text{Economy} = \\frac{\\sum V_i}{S} \\approx 0.85 \\cdot N",
            "explanation": "Ratio of total mass of vapor boiled off across N effects to initial live boiler steam S consumed.",
            "unit": "kg vapor / kg steam"
          },
          {
            "title": "Power Law (Ostwald-de Waele) Shear Stress",
            "formula": "\\tau = K \\cdot \\dot{\\gamma}^n",
            "explanation": "K is consistency index, n is flow behavior index (n < 1 pseudoplastic, n > 1 dilatant, n = 1 Newtonian).",
            "unit": "Pa"
          },
          {
            "title": "Stokes Law of Milk Fat Creaming",
            "formula": "v_{cream} = \\frac{g d^2 (\\rho_{serum} - \\rho_{fat})}{18 \\mu}",
            "explanation": "Homogenization reduces fat globule diameter d from 4 um to < 1 um, reducing creaming rate by over 20-fold.",
            "unit": "m/s"
          },
          {
            "title": "Multiple Effect Evaporator Steam Economy",
            "formula": "\\text{Economy} = \\frac{\\sum V_i}{S} \\approx 0.85 \\cdot N",
            "explanation": "Ratio of total mass of vapor boiled off across N effects to initial live boiler steam S consumed.",
            "unit": "kg vapor / kg steam"
          }
        ]
      }
    ]
  },
  {
    "category": "Section 8: General Aptitude",
    "code": "GA",
    "topics": [
      {
        "topicName": "Quantitative & Numerical Ability",
        "formulas": [
          {
            "title": "Relative Speed & Work Combined Rate",
            "formula": "V_{rel} = V_1 \\pm V_2, \\quad T_{combined} = \\frac{T_A \\cdot T_B}{T_A + T_B}",
            "explanation": "Add speeds if moving in opposite directions; subtract if same direction. Combined work time formula for A and B.",
            "unit": "m/s & Days"
          },
          {
            "title": "Compound Interest & Growth",
            "formula": "A = P \\left( 1 + \\frac{r}{100} \\right)^n, \\quad CI = A - P",
            "explanation": "P = Principal sum, r = Interest rate per period %, n = Number of compounding periods.",
            "unit": "Currency"
          }
        ]
      },
      {
        "topicName": "Quantitative & Analytical Aptitude",
        "formulas": [
          {
            "title": "Permutations vs Combinations",
            "formula": "^n P_r = \\frac{n!}{(n-r)!}, \\quad ^n C_r = \\frac{n!}{r!(n-r)!}",
            "explanation": "Order matters in permutations; order does not matter in combinations.",
            "unit": "Count"
          },
          {
            "title": "Probability of Union & Complement",
            "formula": "P(A \\cup B) = P(A) + P(B) - P(A \\cap B), \\quad P(\\text{at least 1}) = 1 - P(\\text{none})",
            "explanation": "Fundamental axioms of probability for single and combined independent/dependent events.",
            "unit": "Probability"
          },
          {
            "title": "Work & Time Combined Rate",
            "formula": "\\frac{1}{T_{total}} = \\frac{1}{T_A} + \\frac{1}{T_B} \\implies T_{total} = \\frac{T_A \\cdot T_B}{T_A + T_B}",
            "explanation": "Combined time required by two agents A and B working concurrently to complete a unit job.",
            "unit": "hours/days"
          },
          {
            "title": "Speed, Distance & Relative Velocity",
            "formula": "v_{rel} = v_1 + v_2 \\text{ (opposite)}, \\quad v_{rel} = |v_1 - v_2| \\text{ (same direction)}",
            "explanation": "Used for trains, boats, rivers, and moving bodies meeting or overtaking.",
            "unit": "km/h or m/s"
          },
          {
            "title": "Permutations vs Combinations",
            "formula": "^n P_r = \\frac{n!}{(n-r)!}, \\quad ^n C_r = \\frac{n!}{r!(n-r)!}",
            "explanation": "Order matters in permutations; order does not matter in combinations.",
            "unit": "Count"
          },
          {
            "title": "Probability of Union & Complement",
            "formula": "P(A \\cup B) = P(A) + P(B) - P(A \\cap B), \\quad P(\\text{at least 1}) = 1 - P(\\text{none})",
            "explanation": "Fundamental axioms of probability for single and combined independent/dependent events.",
            "unit": "Probability"
          },
          {
            "title": "Work & Time Combined Rate",
            "formula": "\\frac{1}{T_{total}} = \\frac{1}{T_A} + \\frac{1}{T_B} \\implies T_{total} = \\frac{T_A \\cdot T_B}{T_A + T_B}",
            "explanation": "Combined time required by two agents A and B working concurrently to complete a unit job.",
            "unit": "hours/days"
          },
          {
            "title": "Speed, Distance & Relative Velocity",
            "formula": "v_{rel} = v_1 + v_2 \\text{ (opposite)}, \\quad v_{rel} = |v_1 - v_2| \\text{ (same direction)}",
            "explanation": "Used for trains, boats, rivers, and moving bodies meeting or overtaking.",
            "unit": "km/h or m/s"
          }
        ]
      }
    ]
  }
];

export function evaluateFormulaSolver(solverId, inputs) {
  for (const cat of GATE_AG_FORMULAS) {
    for (const topic of cat.topics) {
      for (const formula of topic.formulas) {
        if (formula.solver && formula.solver.id === solverId) {
          const fn = eval(formula.solver.computeCode);
          return fn(inputs);
        }
      }
    }
  }
  return null;
}

export default GATE_AG_FORMULAS;
