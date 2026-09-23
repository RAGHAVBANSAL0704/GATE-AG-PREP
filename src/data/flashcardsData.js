/**
 * High-Yield Spaced Repetition Flashcards Data for GATE AG
 * 150+ high-yield cards partitioned across FMP, SWCE, APFE, Maths, and GA.
 */
export const GATE_AG_FLASHCARDS = [
  {
    "cardId": "fc_fmp_1",
    "topic": "FMP",
    "question": "What is the standard PTO speed for tractors specified by BIS?",
    "answer": "540 ± 10 rpm (Standard I) and 1000 ± 25 rpm (Standard II)."
  },
  {
    "cardId": "fc_fmp_2",
    "topic": "FMP",
    "question": "Formula for Theoretical Field Capacity (TFC)?",
    "answer": "TFC (ha/h) = \\frac{S \\times W}{10} where S = Speed (km/h) and W = Working Width (m)."
  },
  {
    "cardId": "fc_fmp_3",
    "topic": "FMP",
    "question": "Formula for Tractor Wheel Slip (S)?",
    "answer": "S = \\left( 1 - \\frac{V_a}{V_t} \\right) \\times 100\\% where V_a = actual travel speed and V_t = theoretical zero-load wheel speed."
  },
  {
    "cardId": "fc_fmp_4",
    "topic": "FMP",
    "question": "Definition and units of Specific Fuel Consumption (SFC)?",
    "answer": "SFC = \\frac{\\text{Fuel Mass Flow Rate (kg/h)}}{\\text{Brake Power (kW)}}. Unit: kg/(kW·h) or g/(kW·h)."
  },
  {
    "cardId": "fc_fmp_5",
    "topic": "FMP",
    "question": "Standard Disc Angle and Tilt Angle for a regular Disc Plow?",
    "answer": "Disc Angle (\\alpha) = 42^\\circ \\text{ to } 45^\\circ; Tilt Angle (\\beta) = 15^\\circ \\text{ to } 25^\\circ."
  },
  {
    "cardId": "fc_fmp_6",
    "topic": "FMP",
    "question": "Tilt Angle for a standard Disc Harrow?",
    "answer": "0^\\circ (Standard disc harrows have gang angle, but strictly ZERO tilt angle)."
  },
  {
    "cardId": "fc_fmp_7",
    "topic": "FMP",
    "question": "Where is the Center of Resistance located on a Moldboard Plow bottom?",
    "answer": "3/4 of the width of cut from the furrow wall and 1/2 the depth of cut on the plow body."
  },
  {
    "cardId": "fc_fmp_8",
    "topic": "FMP",
    "question": "Formula for Tillage Pitch (p) of a Rotavator?",
    "answer": "p = \\frac{60 v}{N \\cdot z} \\quad [\\text{m}] where v = travel speed (m/s), N = rotor RPM, z = blades per flange."
  },
  {
    "cardId": "fc_fmp_9",
    "topic": "FMP",
    "question": "Kinematic speed ratio (\\lambda) of a rotary tiller?",
    "answer": "\\lambda = \\frac{u}{v} = \\frac{\\pi D N}{60 v}. For cutting soil, \\lambda must be strictly > 1 (usually 2.5 to 8)."
  },
  {
    "cardId": "fc_fmp_10",
    "topic": "FMP",
    "question": "Formula for Seed Drill Calibration Seed Rate (kg/ha)?",
    "answer": "S_r = \\frac{m \\times 10000}{n \\cdot w \\cdot N \\cdot \\pi D} where m = seed collected (kg), n = openers, w = spacing (m), N = revs, D = wheel dia (m)."
  },
  {
    "cardId": "fc_fmp_11",
    "topic": "FMP",
    "question": "How is Plant Spacing in a row related to Plant Population and Row Spacing?",
    "answer": "s_p (\\text{m}) = \\frac{10000}{\\text{Plant Population (plants/ha)} \\times w (\\text{m})}."
  },
  {
    "cardId": "fc_fmp_12",
    "topic": "FMP",
    "question": "Formula for Sprayer Field Application Rate (Q in L/ha)?",
    "answer": "Q = \\frac{600 \\times q}{w \\times v} where q = total nozzle flow (L/min), w = swath width (m), v = speed (km/h)."
  },
  {
    "cardId": "fc_fmp_13",
    "topic": "FMP",
    "question": "Define Volume Median Diameter (VMD or D_v0.5)?",
    "answer": "Droplet diameter such that 50% of the total spray liquid volume is contained in droplets of smaller diameter."
  },
  {
    "cardId": "fc_fmp_14",
    "topic": "FMP",
    "question": "Relative Span formula for spray droplet spectrum?",
    "answer": "\\text{Span} = \\frac{D_{v0.9} - D_{v0.1}}{D_{v0.5}}. Values close to 0 denote narrow, uniform droplets."
  },
  {
    "cardId": "fc_fmp_15",
    "topic": "FMP",
    "question": "Pressure-discharge relationship for hydraulic spray nozzles?",
    "answer": "\\frac{q_2}{q_1} = \\sqrt{\\frac{P_2}{P_1}}. Quadrupling pressure doubles the flow rate."
  },
  {
    "cardId": "fc_fmp_16",
    "topic": "FMP",
    "question": "Peripheral speed range for combine rasp bar cylinder threshing wheat?",
    "answer": "28 to 32 m/s (typically 900 to 1150 RPM for a 0.6 m diameter cylinder)."
  },
  {
    "cardId": "fc_fmp_17",
    "topic": "FMP",
    "question": "Why is peripheral threshing cylinder speed kept lower (20-24 m/s) for paddy?",
    "answer": "To minimize grain cracking, dehusking, and kernel breakage of fragile rice grains."
  },
  {
    "cardId": "fc_fmp_18",
    "topic": "FMP",
    "question": "Standard cutter bar knife section stroke length in mowers?",
    "answer": "76.2 mm (3 inches), which equals the distance between two adjacent ledger plates."
  },
  {
    "cardId": "fc_fmp_19",
    "topic": "FMP",
    "question": "What is Knife Registration in a reciprocating mower?",
    "answer": "When the center of the knife section stops exactly over the center of the guard at the end of each stroke."
  },
  {
    "cardId": "fc_fmp_20",
    "topic": "FMP",
    "question": "What is Cutter Bar Lead and why is it provided?",
    "answer": "Setting outer shoe ~20 mm forward per meter of bar length to counteract rearward drag deflection during cutting."
  },
  {
    "cardId": "fc_fmp_21",
    "topic": "FMP",
    "question": "Formula for Indicated Power (IP) of an IC Engine in kW?",
    "answer": "IP = \\frac{P_m \\cdot L \\cdot A \\cdot N \\cdot n}{60000} where P_m in kPa, L in m, A in m², N = power strokes/min (RPM/2 for 4-stroke), n = cylinders."
  },
  {
    "cardId": "fc_fmp_22",
    "topic": "FMP",
    "question": "Formula for Brake Power (BP) in kW from torque?",
    "answer": "BP = \\frac{2\\pi N T}{60000} where N is RPM and T is torque in N·m."
  },
  {
    "cardId": "fc_fmp_23",
    "topic": "FMP",
    "question": "What is the Morse Test used for?",
    "answer": "Determining the Indicated Power (IP) and Mechanical Efficiency of individual cylinders in a multi-cylinder engine."
  },
  {
    "cardId": "fc_fmp_24",
    "topic": "FMP",
    "question": "Air standard thermal efficiency formula for the Otto Cycle?",
    "answer": "\\eta_{\\text{Otto}} = 1 - \\frac{1}{r^{\\gamma - 1}} where r is compression ratio and \\gamma = 1.4."
  },
  {
    "cardId": "fc_fmp_25",
    "topic": "FMP",
    "question": "Diesel cycle thermal efficiency formula?",
    "answer": "\\eta_{\\text{Diesel}} = 1 - \\frac{1}{r^{\\gamma - 1}} \\left[ \\frac{r_c^\\gamma - 1}{\\gamma (r_c - 1)} \\right] where r_c is cut-off ratio."
  },
  {
    "cardId": "fc_fmp_26",
    "topic": "FMP",
    "question": "For the SAME compression ratio and heat input, order the cycle efficiencies:",
    "answer": "\\eta_{\\text{Otto}} > \\eta_{\\text{Dual}} > \\eta_{\\text{Diesel}}."
  },
  {
    "cardId": "fc_fmp_27",
    "topic": "FMP",
    "question": "Why do diesel engines achieve higher practical thermal efficiency than petrol?",
    "answer": "Because diesel engines operate at much higher compression ratios (16:1 to 22:1 vs 8:1 to 10:1 in petrol)."
  },
  {
    "cardId": "fc_fmp_28",
    "topic": "FMP",
    "question": "What is Valve Overlap in an IC engine?",
    "answer": "The angle of crank rotation during which both inlet and exhaust valves are open simultaneously near TDC."
  },
  {
    "cardId": "fc_fmp_29",
    "topic": "FMP",
    "question": "Speed ratio of camshaft to crankshaft in a 4-stroke engine?",
    "answer": "1 : 2 (Camshaft rotates at half the engine crankshaft speed)."
  },
  {
    "cardId": "fc_fmp_30",
    "topic": "FMP",
    "question": "Formula for Dynamic Weight Transfer (\\Delta W) on tractor chassis?",
    "answer": "\\Delta W = \\frac{P \\cdot h}{L} where P = drawbar pull, h = hitch height, L = tractor wheelbase."
  },
  {
    "cardId": "fc_fmp_31",
    "topic": "FMP",
    "question": "What is the static weight distribution of a standard 2WD tractor?",
    "answer": "Approximately 30% to 35% on the front axle and 65% to 70% on the rear drive axle."
  },
  {
    "cardId": "fc_fmp_32",
    "topic": "FMP",
    "question": "Critical condition for rearward tractor overturning (rearing)?",
    "answer": "When dynamic front reaction R_f \\le 0, meaning P \\cdot h / L \\ge W \\cdot (x_r / L)."
  },
  {
    "cardId": "fc_fmp_33",
    "topic": "FMP",
    "question": "Ackermann steering geometry condition?",
    "answer": "\\cot(\\theta_o) - \\cot(\\theta_i) = \\frac{b}{L} where \\theta_o = outer angle, \\theta_i = inner angle, b = track, L = wheelbase."
  },
  {
    "cardId": "fc_fmp_34",
    "topic": "FMP",
    "question": "Optimal drive wheel slip range for 2WD tractors in tilled soil?",
    "answer": "10% to 15% (provides peak tractive efficiency while avoiding excessive rolling resistance)."
  },
  {
    "cardId": "fc_fmp_35",
    "topic": "FMP",
    "question": "Formula for Tractive Efficiency (\\eta_t)?",
    "answer": "\\eta_t = \\frac{P \\cdot V_a}{P_{\\text{axle}}} = (1 - s)\\left(1 - \\frac{R_R}{H}\\right) where s = slip, R_R = rolling resistance, H = gross thrust."
  },
  {
    "cardId": "fc_fmp_36",
    "topic": "FMP",
    "question": "In a 3-point hitch, is the top link in tension or compression during plowing?",
    "answer": "Compression (implement draft pushes the top link forward toward the tractor)."
  },
  {
    "cardId": "fc_fmp_37",
    "topic": "FMP",
    "question": "Difference between Draft Control and Position Control on 3-point hitch?",
    "answer": "Position control keeps depth constant; Draft control automatically adjusts depth to keep engine draft load constant."
  },
  {
    "cardId": "fc_fmp_38",
    "topic": "FMP",
    "question": "What is the purpose of the Differential Lock on a tractor?",
    "answer": "Locks both rear axle half-shafts together to prevent one wheel from spinning freely on slick ground."
  },
  {
    "cardId": "fc_fmp_39",
    "topic": "FMP",
    "question": "What is the function of the Draft Sensing spring in hydraulic lift systems?",
    "answer": "Measures compressive force on top link or deflection on lower draft pins to actuate the hydraulic spool valve."
  },
  {
    "cardId": "fc_fmp_40",
    "topic": "FMP",
    "question": "Definition of Cetane Number for diesel fuel?",
    "answer": "Percentage of cetane (hexadecane) in a blend with alpha-methylnaphthalene that matches the ignition delay of the test fuel."
  },
  {
    "cardId": "fc_fmp_41",
    "topic": "FMP",
    "question": "What causes diesel engine knocking?",
    "answer": "Excessive ignition delay leading to sudden explosive detonation of accumulated fuel vapor in cylinder."
  },
  {
    "cardId": "fc_fmp_42",
    "topic": "FMP",
    "question": "Formula for Drawbar Power (kW)?",
    "answer": "P_{db} = \\frac{D \\times v}{3.6} where D is draft pull in kN and v is actual speed in km/h."
  },
  {
    "cardId": "fc_swce_1",
    "topic": "SWCE",
    "question": "Rational Method Formula for Peak Runoff Discharge?",
    "answer": "Q = \\frac{C \\cdot I \\cdot A}{360} where Q in m³/s, C = runoff coeff, I in mm/h, A in hectares."
  },
  {
    "cardId": "fc_swce_2",
    "topic": "SWCE",
    "question": "What is the Critical Hydraulic Gradient (i_c) in Soil Mechanics?",
    "answer": "i_c = \\frac{G - 1}{1 + e} = (G - 1)(1 - n) where G = specific gravity, e = void ratio."
  },
  {
    "cardId": "fc_swce_3",
    "topic": "SWCE",
    "question": "Manning's Equation for Velocity in Open Channel?",
    "answer": "V = \\frac{1}{n} R^{2/3} S^{1/2} where R = A/P and S = hydraulic bed slope."
  },
  {
    "cardId": "fc_swce_4",
    "topic": "SWCE",
    "question": "Darcy's Law for Flow through Porous Media?",
    "answer": "Q = -K \\cdot A \\cdot \\frac{dh}{dL} where K is hydraulic conductivity and dh/dL is hydraulic gradient."
  },
  {
    "cardId": "fc_swce_5",
    "topic": "SWCE",
    "question": "Universal Soil Loss Equation (USLE)?",
    "answer": "A = R \\cdot K \\cdot LS \\cdot C \\cdot P (tonnes/ha/year)."
  },
  {
    "cardId": "fc_swce_6",
    "topic": "SWCE",
    "question": "Dimensions of the USLE standard Unit Plot?",
    "answer": "Length = 22.13 m (72.6 ft), Slope = 9% uniform, continuous tilled bare fallow."
  },
  {
    "cardId": "fc_swce_7",
    "topic": "SWCE",
    "question": "SCS-CN Runoff Equation for P > 0.2S?",
    "answer": "Q = \\frac{(P - 0.2 S)^2}{P + 0.8 S} where S = \\frac{25400}{CN} - 254 (all in mm)."
  },
  {
    "cardId": "fc_swce_8",
    "topic": "SWCE",
    "question": "Initial Abstraction (I_a) in SCS-CN method is assumed to be what fraction of S?",
    "answer": "I_a = 0.2 \\cdot S."
  },
  {
    "cardId": "fc_swce_9",
    "topic": "SWCE",
    "question": "Froude Number formula for Open Channel Flow?",
    "answer": "Fr = \\frac{V}{\\sqrt{g D_h}} where D_h = A / T (hydraulic depth)."
  },
  {
    "cardId": "fc_swce_10",
    "topic": "SWCE",
    "question": "Flow regimes based on Froude Number?",
    "answer": "Fr < 1: Subcritical (tranquil); Fr = 1: Critical; Fr > 1: Supercritical (shooting)."
  },
  {
    "cardId": "fc_swce_11",
    "topic": "SWCE",
    "question": "Critical depth y_c in a rectangular channel of discharge per unit width q?",
    "answer": "y_c = \\left( \\frac{q^2}{g} \\right)^{1/3}. Minimum specific energy E_{min} = 1.5 y_c."
  },
  {
    "cardId": "fc_swce_12",
    "topic": "SWCE",
    "question": "Belanger Equation for Sequent Depth Ratio in Hydraulic Jump?",
    "answer": "\\frac{y_2}{y_1} = \\frac{1}{2} \\left( \\sqrt{1 + 8 Fr_1^2} - 1 \\right)."
  },
  {
    "cardId": "fc_swce_13",
    "topic": "SWCE",
    "question": "Energy Loss (\\Delta E) formula for hydraulic jump in rectangular channel?",
    "answer": "\\Delta E = \\frac{(y_2 - y_1)^3}{4 y_1 y_2}."
  },
  {
    "cardId": "fc_swce_14",
    "topic": "SWCE",
    "question": "Kirpich Formula for Time of Concentration (t_c) in minutes?",
    "answer": "t_c = 0.01947 \\cdot L^{0.77} \\cdot S^{-0.385} where L is travel length in m and S is slope in m/m."
  },
  {
    "cardId": "fc_swce_15",
    "topic": "SWCE",
    "question": "Equilibrium Discharge (Q_s) of an S-curve derived from D-hour Unit Hydrograph?",
    "answer": "Q_s = \\frac{2.778 \\cdot A}{D} \\quad [\\text{m}^3/\\text{s}] where A in km² and D in hours."
  },
  {
    "cardId": "fc_swce_16",
    "topic": "SWCE",
    "question": "Area under a 1-cm Unit Hydrograph represents what physical quantity?",
    "answer": "A volume equal to exactly 1 cm depth of direct runoff spread over the catchment area: V = 10^4 \\cdot A \\text{ m}³."
  },
  {
    "cardId": "fc_swce_17",
    "topic": "SWCE",
    "question": "Straight drop spillway weir discharge formula?",
    "answer": "Q = 1.77 \\cdot L \\cdot H^{3/2} \\quad [\\text{m}^3/\\text{s}]."
  },
  {
    "cardId": "fc_swce_18",
    "topic": "SWCE",
    "question": "What is the permissible maximum drop for a Drop Spillway?",
    "answer": "Up to 3 meters (10 ft); for higher drops, a Chute Spillway is used."
  },
  {
    "cardId": "fc_swce_19",
    "topic": "SWCE",
    "question": "Contour Bunds are recommended for what annual rainfall and slope conditions?",
    "answer": "Rainfall < 600-800 mm and land slope < 6%."
  },
  {
    "cardId": "fc_swce_20",
    "topic": "SWCE",
    "question": "Why are contour bunds NOT recommended in deep black cotton soils?",
    "answer": "Cracking and swelling cause water stagnation, piping failure, and structural breaches."
  },
  {
    "cardId": "fc_swce_21",
    "topic": "SWCE",
    "question": "Vertical Interval (VI) formula for contour bunds in India?",
    "answer": "VI = 0.3 \\left( \\frac{S}{3} + 2 \\right) \\quad [\\text{m}] where S is slope percentage."
  },
  {
    "cardId": "fc_swce_22",
    "topic": "SWCE",
    "question": "Bench Terracing is recommended for which slope range?",
    "answer": "16% to 33% (steep hilly terrain)."
  },
  {
    "cardId": "fc_swce_23",
    "topic": "SWCE",
    "question": "Three stages of wind erosion particle movement?",
    "answer": "1. Saltation (50-75%, 0.1-0.5 mm); 2. Surface Creep (5-25%, 0.5-1 mm); 3. Suspension (3-40%, < 0.1 mm)."
  },
  {
    "cardId": "fc_swce_24",
    "topic": "SWCE",
    "question": "Thiem Equation for unconfined aquifer steady-state well discharge?",
    "answer": "Q = \\frac{\\pi K (h_2^2 - h_1^2)}{\\ln(r_2 / r_1)}."
  },
  {
    "cardId": "fc_swce_25",
    "topic": "SWCE",
    "question": "Thiem Equation for confined aquifer steady-state discharge?",
    "answer": "Q = \\frac{2\\pi K b (h_2 - h_1)}{\\ln(r_2 / r_1)} where b is aquifer thickness."
  },
  {
    "cardId": "fc_swce_26",
    "topic": "SWCE",
    "question": "Definition of Transmissivity (T) of an aquifer?",
    "answer": "T = K \\cdot b (discharge through unit width of aquifer under unit hydraulic gradient, m²/day)."
  },
  {
    "cardId": "fc_swce_27",
    "topic": "SWCE",
    "question": "Definition of Storage Coefficient (S) in confined aquifers?",
    "answer": "Volume of water released from storage per unit surface area per unit decline in piezometric head (10⁻⁵ to 10⁻³)."
  },
  {
    "cardId": "fc_swce_28",
    "topic": "SWCE",
    "question": "Specific Yield (S_y) vs Specific Retention (S_r) relation in unconfined aquifer?",
    "answer": "S_y + S_r = n (Total Porosity)."
  },
  {
    "cardId": "fc_swce_29",
    "topic": "SWCE",
    "question": "Reynolds Number for porous media flow in Darcy's regime?",
    "answer": "Re = \\frac{\\rho v d}{\\mu} < 1 to 10 (flow is strictly laminar)."
  },
  {
    "cardId": "fc_swce_30",
    "topic": "SWCE",
    "question": "Hydraulic Radius (R) for wide rectangular channel of depth y?",
    "answer": "R = \\frac{A}{P} = \\frac{b y}{b + 2y} \\approx y \\quad (\\text{when } b \\gg y)."
  },
  {
    "cardId": "fc_swce_31",
    "topic": "SWCE",
    "question": "Hydraulic depth (D_h) for a triangular channel with side slopes 1:z (V:H)?",
    "answer": "D_h = \\frac{A}{T} = \\frac{z y^2}{2 z y} = \\frac{y}{2}."
  },
  {
    "cardId": "fc_swce_32",
    "topic": "SWCE",
    "question": "Most hydraulically efficient trapezoidal channel section criteria?",
    "answer": "Half-hexagon: Side slope 60° (z = 1/\\sqrt{3}), Hydraulic radius R = y/2, Top width T = 2 * side slope length."
  },
  {
    "cardId": "fc_swce_33",
    "topic": "SWCE",
    "question": "Kennedy Critical Velocity equation for non-silting, non-scouring regime?",
    "answer": "V_0 = 0.55 m y^{0.64} where m = critical velocity ratio (CVR) and y = depth in meters."
  },
  {
    "cardId": "fc_swce_34",
    "topic": "SWCE",
    "question": "Lacey Silt Factor (f) formula?",
    "answer": "f = 1.76 \\sqrt{d_{mm}} where d_{mm} is average sediment particle diameter in millimeters."
  },
  {
    "cardId": "fc_swce_35",
    "topic": "SWCE",
    "question": "Lacey Regime Perimeter equation?",
    "answer": "P = 4.75 \\sqrt{Q} where Q is discharge in m³/s."
  },
  {
    "cardId": "fc_swce_36",
    "topic": "SWCE",
    "question": "Lacey Regime Velocity equation?",
    "answer": "V = \\left( \\frac{Q f^2}{140} \\right)^{1/6} \\quad [\\text{m/s}]."
  },
  {
    "cardId": "fc_swce_37",
    "topic": "SWCE",
    "question": "Shields parameter (\\tau^*) represents the ratio of what forces?",
    "answer": "Fluid shear drag force to submerged submerged gravity buoyant resistance force on sediment particle."
  },
  {
    "cardId": "fc_swce_38",
    "topic": "SWCE",
    "question": "Horton's Infiltration Capacity Equation?",
    "answer": "f_p = f_c + (f_0 - f_c) e^{-k t} where f_0 = initial capacity, f_c = ultimate capacity."
  },
  {
    "cardId": "fc_swce_39",
    "topic": "SWCE",
    "question": "Philip's Two-Term Infiltration Model?",
    "answer": "I = S \\cdot t^{1/2} + A \\cdot t where S is sorptivity and A is gravity transmittance factor."
  },
  {
    "cardId": "fc_swce_40",
    "topic": "SWCE",
    "question": "Strahler Stream Ordering rule when two streams of order u join?",
    "answer": "If order u joins order u, stream order becomes u + 1. If u joins order v (u < v), order remains v."
  },
  {
    "cardId": "fc_swce_41",
    "topic": "SWCE",
    "question": "What is a Hyetograph vs a Hydrograph?",
    "answer": "Hyetograph: Plot of rainfall intensity vs time. Hydrograph: Plot of stream discharge vs time."
  },
  {
    "cardId": "fc_swce_42",
    "topic": "SWCE",
    "question": "Phi-Index (\\phi) in watershed hydrology?",
    "answer": "Constant average infiltration rate above which total rainfall volume equals total direct runoff volume."
  },
  {
    "cardId": "fc_apfe_1",
    "topic": "APFE",
    "question": "Relationship between Moisture Content Wet Basis (M_w) and Dry Basis (M_d)?",
    "answer": "M_d = \\frac{M_w}{1 - M_w} \\quad \\text{and} \\quad M_w = \\frac{M_d}{1 + M_d}."
  },
  {
    "cardId": "fc_apfe_2",
    "topic": "APFE",
    "question": "Kick's Law of Size Reduction?",
    "answer": "E = K_K \\ln \\left(\\frac{D_1}{D_2}\\right). Energy is proportional to reduction ratio (coarse crushing)."
  },
  {
    "cardId": "fc_apfe_3",
    "topic": "APFE",
    "question": "Rittinger's Law of Comminution?",
    "answer": "E = K_R \\left( \\frac{1}{D_2} - \\frac{1}{D_1} \\right). Energy is proportional to new surface area (fine grinding)."
  },
  {
    "cardId": "fc_apfe_4",
    "topic": "APFE",
    "question": "Bond's Law of Size Reduction?",
    "answer": "E = 100 W_i \\left( \\frac{1}{\\sqrt{D_2}} - \\frac{1}{\\sqrt{D_1}} \\right) where W_i is Bond Work Index (kWh/tonne)."
  },
  {
    "cardId": "fc_apfe_5",
    "topic": "APFE",
    "question": "Formula for Specific Humidity (W) in moist air?",
    "answer": "W = 0.622 \\frac{p_v}{101.325 - p_v} \\quad [\\text{kg water / kg dry air}]."
  },
  {
    "cardId": "fc_apfe_6",
    "topic": "APFE",
    "question": "Enthalpy equation for moist air (kJ/kg dry air)?",
    "answer": "h = 1.006 T + W (2501 + 1.86 T) where T is dry bulb temperature in °C."
  },
  {
    "cardId": "fc_apfe_7",
    "topic": "APFE",
    "question": "What happens to RH and W during Sensible Heating of air?",
    "answer": "Dry bulb temperature increases, Humidity Ratio W remains CONSTANT, Relative Humidity (RH) DECREASES."
  },
  {
    "cardId": "fc_apfe_8",
    "topic": "APFE",
    "question": "Lewis Thin-Layer Drying equation?",
    "answer": "MR = \\frac{M - M_e}{M_0 - M_e} = \\exp(-k t) where k is drying constant."
  },
  {
    "cardId": "fc_apfe_9",
    "topic": "APFE",
    "question": "Page's Thin-Layer Drying model?",
    "answer": "MR = \\exp(-k t^n) where n is Page's empirical exponent."
  },
  {
    "cardId": "fc_apfe_10",
    "topic": "APFE",
    "question": "In grain drying, what is Equilibrium Moisture Content (EMC)?",
    "answer": "Moisture content of grain in dynamic equilibrium with the temperature and relative humidity of surrounding air."
  },
  {
    "cardId": "fc_apfe_11",
    "topic": "APFE",
    "question": "What is Sorption Hysteresis in agricultural grains?",
    "answer": "At identical temperature and RH, EMC during desorption (drying) is strictly HIGHER than during adsorption (wetting)."
  },
  {
    "cardId": "fc_apfe_12",
    "topic": "APFE",
    "question": "Cut Diameter (d_50) of a cyclone separator?",
    "answer": "Particle diameter collected with exactly 50% collection efficiency: d_{50} = \\sqrt{\\frac{9 \\mu W}{2\\pi N_e v_i (\\rho_p - \\rho_g)}}."
  },
  {
    "cardId": "fc_apfe_13",
    "topic": "APFE",
    "question": "Stokes' Law Terminal Settling Velocity for Re_p < 0.2?",
    "answer": "v_t = \\frac{g d_p^2 (\\rho_p - \\rho_f)}{18 \\mu}."
  },
  {
    "cardId": "fc_apfe_14",
    "topic": "APFE",
    "question": "Critical speed of head pulley in a centrifugal discharge bucket elevator?",
    "answer": "v = \\sqrt{g R} where R is radius of pulley plus half bucket projection."
  },
  {
    "cardId": "fc_apfe_15",
    "topic": "APFE",
    "question": "Recommended trough loading factor (\\psi) for grain screw conveyors?",
    "answer": "0.30 to 0.45 (30% to 45% fill to avoid kernel crushing and excessive bearing torque)."
  },
  {
    "cardId": "fc_apfe_16",
    "topic": "APFE",
    "question": "Janssen's Equation computes what in grain silos?",
    "answer": "Lateral and vertical pressure distribution in deep storage bins accounting for wall friction."
  },
  {
    "cardId": "fc_apfe_17",
    "topic": "APFE",
    "question": "What is the distinction between a Shallow Bin and a Deep Bin?",
    "answer": "In a deep bin, plane of rupture strikes the opposite wall before piercing the top grain surface (depth > 1.5 * diameter)."
  },
  {
    "cardId": "fc_apfe_18",
    "topic": "APFE",
    "question": "Definition of D-Value in food thermal processing?",
    "answer": "Time in minutes at constant temperature to reduce microbial population by 90% (1 log cycle)."
  },
  {
    "cardId": "fc_apfe_19",
    "topic": "APFE",
    "question": "Relation between D-value and first-order reaction rate constant k?",
    "answer": "D = \\frac{2.303}{k}."
  },
  {
    "cardId": "fc_apfe_20",
    "topic": "APFE",
    "question": "Definition of z-Value in food thermal sterilization?",
    "answer": "Temperature increase (°C or °F) required to reduce the D-value by a factor of 10 (1 log cycle)."
  },
  {
    "cardId": "fc_apfe_21",
    "topic": "APFE",
    "question": "Standard reference temperature for F_0 value calculations?",
    "answer": "121.1°C (250°F) with reference z-value of 10°C (18°F) for Clostridium botulinum."
  },
  {
    "cardId": "fc_apfe_22",
    "topic": "APFE",
    "question": "What is the 12D concept in commercial canning?",
    "answer": "Thermal process providing 12 log-cycle reductions of Clostridium botulinum spores (F_0 = 12 * 0.21 = 2.52 minutes)."
  },
  {
    "cardId": "fc_apfe_23",
    "topic": "APFE",
    "question": "HTST Pasteurization standard time-temperature combination for milk?",
    "answer": "72°C for 15 seconds (High Temperature Short Time)."
  },
  {
    "cardId": "fc_apfe_24",
    "topic": "APFE",
    "question": "Which index enzyme is used to verify proper milk pasteurization?",
    "answer": "Alkaline Phosphatase (its thermal destruction slightly exceeds pathogenic Coxiella burnetii)."
  },
  {
    "cardId": "fc_apfe_25",
    "topic": "APFE",
    "question": "Milk Plate Heat Exchanger Regeneration Efficiency formula?",
    "answer": "\\text{Regen (\\%)} = \\frac{T_{\\text{regen}} - T_{\\text{inlet}}}{T_{\\text{pasteurized}} - T_{\\text{inlet}}} \\times 100\\% (typically 85% to 92%)."
  },
  {
    "cardId": "fc_apfe_26",
    "topic": "APFE",
    "question": "Ostwald-de Waele Power Law rheology model equation?",
    "answer": "\\tau = K \\cdot \\dot{\\gamma}^n where K = consistency index, n = flow behavior index."
  },
  {
    "cardId": "fc_apfe_27",
    "topic": "APFE",
    "question": "Classification of fluids based on Flow Behavior Index (n)?",
    "answer": "n = 1: Newtonian; n < 1: Pseudoplastic (shear thinning); n > 1: Dilatant (shear thickening)."
  },
  {
    "cardId": "fc_apfe_28",
    "topic": "APFE",
    "question": "Herschel-Bulkley model fluid equation?",
    "answer": "\\tau = \\tau_0 + K \\cdot \\dot{\\gamma}^n (fluid has yield stress \\tau_0 before flow begins)."
  },
  {
    "cardId": "fc_apfe_29",
    "topic": "APFE",
    "question": "Stokes creaming velocity shows that halving fat globule diameter reduces creaming by what factor?",
    "answer": "By a factor of 4 (creaming velocity is proportional to d²)."
  },
  {
    "cardId": "fc_apfe_30",
    "topic": "APFE",
    "question": "Planck's equation shape factors (P, R) for an infinite slab?",
    "answer": "P = 1/2, R = 1/8."
  },
  {
    "cardId": "fc_apfe_31",
    "topic": "APFE",
    "question": "Planck's equation shape factors (P, R) for a sphere?",
    "answer": "P = 1/6, R = 1/24."
  },
  {
    "cardId": "fc_apfe_32",
    "topic": "APFE",
    "question": "Why does food freeze faster than it thaws under identical temperature differences?",
    "answer": "Thermal conductivity of ice (~2.2 W/m·K) is ~4 times greater than liquid water (~0.6 W/m·K)."
  },
  {
    "cardId": "fc_apfe_33",
    "topic": "APFE",
    "question": "Log Mean Temperature Difference (LMTD) formula?",
    "answer": "\\Delta T_{lm} = \\frac{\\Delta T_1 - \\Delta T_2}{\\ln(\\Delta T_1 / \\Delta T_2)}."
  },
  {
    "cardId": "fc_apfe_34",
    "topic": "APFE",
    "question": "Which has higher LMTD: Counter-flow or Parallel-flow heat exchanger?",
    "answer": "Counter-flow heat exchanger always has higher LMTD and higher thermal effectiveness for given inlet/outlet temperatures."
  },
  {
    "cardId": "fc_apfe_35",
    "topic": "APFE",
    "question": "Steam Economy of a Multiple Effect Evaporator?",
    "answer": "\\text{Steam Economy} = \\frac{\\text{Total Vapor Evaporated (kg)}}{\\text{Live Fresh Steam Supplied (kg)}} \\approx 0.85 \\times N (effects)."
  },
  {
    "cardId": "fc_apfe_36",
    "topic": "APFE",
    "question": "Dühring's Rule in evaporator design relates what?",
    "answer": "Boiling point of a food solution varies linearly with the boiling point of pure water at the same pressure."
  },
  {
    "cardId": "fc_apfe_37",
    "topic": "APFE",
    "question": "What is 1 Tonne of Refrigeration (TR) in kW and kJ/min?",
    "answer": "1 TR = 3.517 kW = 211 kJ/min (rate to freeze 1000 kg water at 0°C to ice in 24 hours)."
  },
  {
    "cardId": "fc_apfe_38",
    "topic": "APFE",
    "question": "Coefficient of Performance (COP) of a vapor compression refrigerator?",
    "answer": "COP = \\frac{\\text{Refrigerating Effect (h_1 - h_4)}}{\\text{Compressor Work (h_2 - h_1)}}."
  },
  {
    "cardId": "fc_apfe_39",
    "topic": "APFE",
    "question": "Parboiling of paddy causes which key nutritional change?",
    "answer": "Water-soluble B-complex vitamins (thiamine, riboflavin) diffuse inward from the aleurone layer into the rice starchy endosperm."
  },
  {
    "cardId": "fc_apfe_40",
    "topic": "APFE",
    "question": "Parboiling effect on head rice recovery percentage in milling?",
    "answer": "Significantly increases head rice yield (reduces broken grains from ~35% down to < 5-10%)."
  },
  {
    "cardId": "fc_apfe_41",
    "topic": "APFE",
    "question": "Rubber roll sheller in rice milling operates on what differential principle?",
    "answer": "Two rubber rolls rotate in opposite directions at differential peripheral speeds (speed ratio ~1 : 1.25)."
  },
  {
    "cardId": "fc_apfe_42",
    "topic": "APFE",
    "question": "Critical Moisture Content (CMC) in grain drying marks the transition between:",
    "answer": "The Constant Rate drying period and the Falling Rate drying period."
  },
  {
    "cardId": "fc_math_1",
    "topic": "Maths",
    "question": "Euler-Cauchy Differential Equation Form and substitution?",
    "answer": "x^2 y'' + a x y' + b y = 0. Substitution: x = e^z or z = \\ln x."
  },
  {
    "cardId": "fc_math_2",
    "topic": "Maths",
    "question": "Cayley-Hamilton Theorem statement?",
    "answer": "Every square matrix satisfies its own characteristic equation: P(A) = 0."
  },
  {
    "cardId": "fc_math_3",
    "topic": "Maths",
    "question": "Eigenvalues of a Real Symmetric Matrix are always:",
    "answer": "Purely Real. Eigenvectors corresponding to distinct eigenvalues are mutually orthogonal."
  },
  {
    "cardId": "fc_math_4",
    "topic": "Maths",
    "question": "Trace and Determinant relationship with eigenvalues \\lambda_i?",
    "answer": "\\sum \\lambda_i = \\text{Trace}(A) \\quad \\text{and} \\quad \\prod \\lambda_i = \\det(A)."
  },
  {
    "cardId": "fc_math_5",
    "topic": "Maths",
    "question": "Order of convergence for Newton-Raphson method for a simple root?",
    "answer": "Quadratic (Order 2): \\epsilon_{n+1} \\approx C \\cdot \\epsilon_n^2."
  },
  {
    "cardId": "fc_math_6",
    "topic": "Maths",
    "question": "When does the Newton-Raphson root finding iteration fail?",
    "answer": "When the derivative f'(x_n) = 0 (horizontal tangent leads to division by zero)."
  },
  {
    "cardId": "fc_math_7",
    "topic": "Maths",
    "question": "Simpson's 1/3rd rule requires the number of intervals n to be:",
    "answer": "An EVEN number (n is a multiple of 2)."
  },
  {
    "cardId": "fc_math_8",
    "topic": "Maths",
    "question": "Simpson's 3/8th rule requires the number of intervals n to be:",
    "answer": "A multiple of 3."
  },
  {
    "cardId": "fc_math_9",
    "topic": "Maths",
    "question": "Integrating factor for first-order linear ODE: dy/dx + P(x) y = Q(x)?",
    "answer": "IF = \\exp\\left( \\int P(x) \\, dx \\right)."
  },
  {
    "cardId": "fc_math_10",
    "topic": "Maths",
    "question": "Condition for exact differential equation M dx + N dy = 0?",
    "answer": "\\frac{\\partial M}{\\partial y} = \\frac{\\partial N}{\\partial x}."
  },
  {
    "cardId": "fc_math_11",
    "topic": "Maths",
    "question": "Gauss Divergence Theorem converts what integrals?",
    "answer": "Converts a surface flux integral \\iint_S \\vec{F} \\cdot \\hat{n} \\, dS into a volume divergence integral \\iiint_V (\\nabla \\cdot \\vec{F}) \\, dV."
  },
  {
    "cardId": "fc_math_12",
    "topic": "Maths",
    "question": "Stokes' Theorem relates what integrals?",
    "answer": "Relates closed line integral \\oint_C \\vec{F} \\cdot d\\vec{r} to surface curl integral \\iint_S (\\nabla \\times \\vec{F}) \\cdot \\hat{n} \\, dS."
  },
  {
    "cardId": "fc_math_13",
    "topic": "Maths",
    "question": "Vector field \\vec{F} is Solenoidal if and only if:",
    "answer": "\\nabla \\cdot \\vec{F} = \\text{div } \\vec{F} = 0."
  },
  {
    "cardId": "fc_math_14",
    "topic": "Maths",
    "question": "Vector field \\vec{F} is Irrotational (Conservative) if and only if:",
    "answer": "\\nabla \\times \\vec{F} = \\text{curl } \\vec{F} = \\vec{0}."
  },
  {
    "cardId": "fc_math_15",
    "topic": "Maths",
    "question": "Poisson distribution mean and variance property?",
    "answer": "Mean = Variance = \\lambda."
  },
  {
    "cardId": "fc_math_16",
    "topic": "Maths",
    "question": "Rank-Nullity theorem for an m x n matrix?",
    "answer": "\\text{Rank}(A) + \\text{Nullity}(A) = n (number of columns)."
  },
  {
    "cardId": "fc_ga_1",
    "topic": "GA",
    "question": "Permutations ^n P_r vs Combinations ^n C_r formula?",
    "answer": "^n P_r = \\frac{n!}{(n-r)!} \\quad \\text{and} \\quad ^n C_r = \\frac{n!}{r! (n-r)!}."
  },
  {
    "cardId": "fc_ga_2",
    "topic": "GA",
    "question": "Number of ways to seat n people around a circular table?",
    "answer": "(n - 1)!."
  },
  {
    "cardId": "fc_ga_3",
    "topic": "GA",
    "question": "Formula for combined work time of two workers with individual times A and B?",
    "answer": "T_{total} = \\frac{A \\cdot B}{A + B}."
  },
  {
    "cardId": "fc_ga_4",
    "topic": "GA",
    "question": "Relative speed of two bodies moving in opposite directions at v1 and v2?",
    "answer": "v_{rel} = v_1 + v_2."
  },
  {
    "cardId": "fc_ga_5",
    "topic": "GA",
    "question": "Relative speed of two bodies moving in the same direction?",
    "answer": "v_{rel} = |v_1 - v_2|."
  },
  {
    "cardId": "fc_ga_6",
    "topic": "GA",
    "question": "In a pie chart, 1% corresponds to what angle at the center?",
    "answer": "3.6 degrees (100% = 360°)."
  },
  {
    "cardId": "fc_ga_7",
    "topic": "GA",
    "question": "Probability of at least one success in n independent trials?",
    "answer": "P(\\text{at least 1}) = 1 - P(\\text{none}) = 1 - (1 - p)^n."
  },
  {
    "cardId": "fc_ga_8",
    "topic": "GA",
    "question": "Syllogism: Can a definite conclusion be drawn from two negative premises (No + No)?",
    "answer": "No definite conclusion can ever be drawn from two negative premises."
  },
  {
    "cardId": "fc_ga_9",
    "topic": "GA",
    "question": "In an unfolded net of 6 squares of a cube, which faces are opposite?",
    "answer": "Alternate faces in a straight row or column are strictly opposite faces in the 3D cube."
  },
  {
    "cardId": "fc_ga_10",
    "topic": "GA",
    "question": "Formula for percentage change from initial value V_i to final V_f?",
    "answer": "\\% \\Delta = \\frac{V_f - V_i}{V_i} \\times 100\\%."
  },
  {
    "cardId": "fc_ga_11",
    "topic": "GA",
    "question": "If a paper is folded 3 times and 2 holes are punched, how many holes appear when unfolded?",
    "answer": "2 \\times 2^3 = 2 \\times 8 = 16 holes."
  },
  {
    "cardId": "fc_ga_12",
    "topic": "GA",
    "question": "Compounded Annual Growth Rate (CAGR) formula?",
    "answer": "\\text{CAGR} = \\left( \\frac{V_f}{V_i} \\right)^{1/n} - 1."
  }
];

export default GATE_AG_FLASHCARDS;
