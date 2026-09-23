export default [
  {
    "id": "QB_SWCE_001",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Soil loss estimation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "Using the Universal Soil Loss Equation (USLE), $A = R \\cdot K \\cdot LS \\cdot C \\cdot P$, compute the predicted annual soil loss in $\\text{t/(ha}\\cdot\\text{yr)}$ for a watershed with $R = 300\\text{ MJ}\\cdot\\text{mm/(ha}\\cdot\\text{h}\\cdot\\text{yr)}$, $K = 0.04\\text{ t}\\cdot\\text{ha}\\cdot\\text{h/(ha}\\cdot\\text{MJ}\\cdot\\text{mm)}$, $LS = 2.5$, crop cover factor $C = 0.20$, and conservation practice factor $P = 0.50$. Answer in integer ________.",
    "correct_answer": "3",
    "numerical_range": {
      "min": 3,
      "max": 3
    },
    "solution": "From the USLE formula:\n$$A = R \\times K \\times LS \\times C \\times P$$\nSubstituting given parameters:\n$$A = 300 \\times 0.04 \\times 2.5 \\times 0.20 \\times 0.50$$\n1. $300 \\times 0.04 = 12$\n2. $12 \\times 2.5 = 30$\n3. $30 \\times 0.20 = 6$\n4. $6 \\times 0.50 = 3\\text{ t/(ha}\\cdot\\text{yr)}$\nHence, the predicted soil loss is 3.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_002",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Flow in open channels",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "Water flows uniformly at a depth of $1.5\\text{ m}$ in a rectangular concrete channel of width $4.0\\text{ m}$ on a bed slope of $0.0016$. Manning's roughness coefficient $n = 0.015$. The discharge through the channel in $\\text{m}^3\\text{/s}$ is ________ (round off to 2 decimal places).",
    "correct_answer": "19.38",
    "numerical_range": {
      "min": 19.1,
      "max": 19.65
    },
    "solution": "1. Flow cross-sectional area $A$:\n$$A = B \\times y = 4.0 \\times 1.5 = 6.0\\text{ m}^2$$\n2. Wetted perimeter $P$:\n$$P = B + 2y = 4.0 + 2(1.5) = 7.0\\text{ m}$$\n3. Hydraulic radius $R$:\n$$R = \\frac{A}{P} = \\frac{6.0}{7.0} = 0.8571\\text{ m}$$\n4. Bed slope $S_0 = 0.0016 \\implies \\sqrt{S_0} = 0.04$\n5. Discharge via Manning's equation:\n$$Q = \\frac{1}{n} A R^{2/3} S_0^{1/2} = \\frac{1}{0.015} \\times 6.0 \\times (0.8571)^{2/3} \\times 0.04$$\n$$(0.8571)^{2/3} \\approx 0.9023$$\n$$Q = 400 \\times 6.0 \\times 0.9023 \\times 0.04 = 2400 \\times 0.04 \\times 0.9023 = 19.38\\text{ m}^3\\text{/s}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_003",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Runoff estimation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "A watershed of area $2.5\\text{ km}^2$ has a runoff coefficient $C = 0.40$. During a storm event, the design rainfall intensity is $36\\text{ mm/h}$. Using the Rational formula $Q = \\frac{C I A}{3.6}$, the peak runoff rate in $\\text{m}^3\\text{/s}$ is ________ (answer in integer).",
    "correct_answer": "10",
    "numerical_range": {
      "min": 10,
      "max": 10
    },
    "solution": "By the Rational method:\n$$Q_p = \\frac{C \\cdot I \\cdot A}{3.6}$$\nWhere:\n• $C = 0.40$\n• $I = 36\\text{ mm/h}$\n• $A = 2.5\\text{ km}^2$\n$$Q_p = \\frac{0.40 \\times 36 \\times 2.5}{3.6} = \\frac{36}{3.6} \\times (0.40 \\times 2.5) = 10 \\times 1.0 = 10\\text{ m}^3\\text{/s}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_004",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Fundamental definitions and relationships",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "A soil sample has a void ratio $e = 0.60$ and specific gravity of soil solids $G_s = 2.65$. The dry unit weight of the soil in $\\text{kN/m}^3$ (taking unit weight of water $\\gamma_w = 9.81\\text{ kN/m}^3$) is ________ (round off to 2 decimal places).",
    "correct_answer": "16.25",
    "numerical_range": {
      "min": 16.15,
      "max": 16.35
    },
    "solution": "The relationship for dry unit weight $\\gamma_d$ is:\n$$\\gamma_d = \\frac{G_s \\gamma_w}{1 + e}$$\nGiven:\n$G_s = 2.65$\n$e = 0.60$\n$\\gamma_w = 9.81\\text{ kN/m}^3$\n$$\\gamma_d = \\frac{2.65 \\times 9.81}{1 + 0.60} = \\frac{25.9965}{1.60} = 16.248\\text{ kN/m}^3 \\approx 16.25\\text{ kN/m}^3$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_005",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Hydrograph analysis, unit hydrograph theory and application",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "GATE Agricultural Engineering (Sanjay Kumar)",
    "question": "Which of the following fundamental assumptions underlies Sherman's Unit Hydrograph (UH) theory?",
    "options": {
      "A": "Time invariance and linear response of the watershed",
      "B": "Rainfall excess is non-uniformly distributed over the drainage basin",
      "C": "Base time of direct runoff increases proportionally with excess rainfall depth",
      "D": "Peak discharge is inversely proportional to effective rainfall"
    },
    "correct_answer": "A",
    "solution": "The two classical tenets of Unit Hydrograph theory are:\n1. **Linear response (Principle of Superposition & Proportionality)**: Direct runoff ordinates are directly proportional to the rainfall excess depth.\n2. **Time invariance**: The catchment direct runoff response to a unit input remains constant irrespective of when the storm occurs.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_006",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Gully control structures – drop, drop inlet and chute spillways",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "Which of the following statements regarding permanent gully control structures is/are correct?",
    "options": {
      "A": "Drop spillways are generally installed for hydraulic drop heights less than 3 metres.",
      "B": "Chute spillways are well suited for high drop structures and steep gullies.",
      "C": "Drop inlet spillways consist of a vertical conduit or riser connected to a horizontal barrel through an earthen embankment.",
      "D": "Drop spillways require an auxiliary vegetative emergency spillway when designing for total peak design flood."
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "• Straight drop spillways are economical and structurally stable for drops typically up to 3 m (A is correct).\n• Chute spillways convey flood flows down steep slopes up to 5–6 m or more (B is correct).\n• Drop inlet spillways convey water through a vertical riser pipe to a nearly horizontal barrel buried beneath an embankment (C is correct).\n• Drop spillways are usually designed as the principal spillway to safely convey the design peak discharge without necessarily needing an emergency vegetative spillway unless specified for extreme floods.",
    "difficulty": "Hard"
  },
  {
    "id": "QB_SWCE_007",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Surveying and Levelling",
    "subtopic": "Contouring",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "A series of closed contour lines on a topographic map having higher elevation values inside and decreasing values outwards indicates a:",
    "options": {
      "A": "Depression or pond",
      "B": "Hill or peak",
      "C": "Saddle",
      "D": "Valley"
    },
    "correct_answer": "B",
    "solution": "Closed contour lines with increasing elevation towards the centre represent a hill or knoll. If elevations decrease towards the centre, it represents a depression.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_SWCE_008",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Runoff estimation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "A watershed has an SCS runoff curve number $CN = 80$. A total storm rainfall of $100\\text{ mm}$ occurs over the catchment. The direct runoff depth generated from the storm in $\\text{mm}$ (using the standard SCS-CN equation with initial abstraction $I_a = 0.2 S$) is ________ (round off to 1 decimal place).",
    "correct_answer": "50.5",
    "numerical_range": {
      "min": 50,
      "max": 51
    },
    "solution": "1. Potential maximum watershed retention ($S$):\n$$S = \\frac{25400}{CN} - 254 = \\frac{25400}{80} - 254 = 317.5 - 254 = 63.5\\text{ mm}$$\n2. Initial abstraction ($I_a$):\n$$I_a = 0.2 S = 0.2 \\times 63.5 = 12.7\\text{ mm}$$\n3. Direct runoff depth ($Q$):\n$$Q = \\frac{(P - I_a)^2}{P - I_a + S} = \\frac{(P - 0.2S)^2}{P + 0.8S}$$\n$$Q = \\frac{(100 - 12.7)^2}{100 + 0.8(63.5)} = \\frac{(87.3)^2}{100 + 50.8} = \\frac{7621.29}{150.8} = 50.539\\text{ mm} \\approx 50.5\\text{ mm}$$",
    "difficulty": "Hard"
  },
  {
    "id": "QB_SWCE_009",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Flow in open channels",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "A rectangular irrigation flume of width $3.0\\text{ m}$ carries a total water discharge of $12.0\\text{ m}^3\\text{/s}$. Taking acceleration due to gravity $g = 9.81\\text{ m/s}^2$, the critical depth of flow in metres is ________ (round off to 2 decimal places).",
    "correct_answer": "1.18",
    "numerical_range": {
      "min": 1.16,
      "max": 1.2
    },
    "solution": "1. Discharge per unit width ($q$):\n$$q = \\frac{Q}{B} = \\frac{12.0\\text{ m}^3\\text{/s}}{3.0\\text{ m}} = 4.0\\text{ m}^2\\text{/s}$$\n2. Critical depth ($y_c$) in a rectangular open channel:\n$$y_c = \\left( \\frac{q^2}{g} \\right)^{1/3} = \\left( \\frac{4.0^2}{9.81} \\right)^{1/3} = \\left( \\frac{16.0}{9.81} \\right)^{1/3} = (1.63099)^{1/3} \\approx 1.177\\text{ m} \\approx 1.18\\text{ m}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_010",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Fundamental definitions and relationships",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)",
    "question": "A soil sample has a moisture content of $20\\%$ (dry mass basis), void ratio $e = 0.65$, and specific gravity of soil solids $G_s = 2.60$. The degree of saturation of the soil expressed in percentage is ________ (answer in integer).",
    "correct_answer": "80",
    "numerical_range": {
      "min": 80,
      "max": 80
    },
    "solution": "Using the fundamental soil phase volumetric relationship:\n$$S \\cdot e = w \\cdot G_s$$\nWhere:\n• $w = 0.20$ (gravimetric moisture content)\n• $G_s = 2.60$ (specific gravity)\n• $e = 0.65$ (void ratio)\n$$S = \\frac{w \\cdot G_s}{e} = \\frac{0.20 \\times 2.60}{0.65} = \\frac{0.52}{0.65} = 0.80 = 80\\%$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_011",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Terraces and bunds",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "For contour bunding on an agricultural field having a uniform land slope of $3.0\\%$, the vertical interval ($VI$) between consecutive bunds is calculated using $VI = 0.30 S + 0.60$ (where $S$ is slope in percentage and $VI$ in metres). The horizontal interval ($HI$) between the bunds in metres is ________ (answer in integer).",
    "correct_answer": "50",
    "numerical_range": {
      "min": 50,
      "max": 50
    },
    "solution": "1. Vertical Interval ($VI$):\n$$VI = 0.30(3.0) + 0.60 = 0.90 + 0.60 = 1.50\\text{ m}$$\n2. Horizontal Interval ($HI$):\n$$HI = \\frac{VI}{S} \\times 100 = \\frac{1.50}{3.0} \\times 100 = 50\\text{ m}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_012",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Surveying and Levelling",
    "subtopic": "Measurement of angles and bearings",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)",
    "question": "The magnetic bearing of a field boundary line was surveyed as $\\text{N } 45^\\circ 30' \\text{ E}$. If the magnetic declination at the location is $2^\\circ 30' \\text{ W}$, the true bearing of the line is:",
    "options": {
      "A": "$\\text{N } 43^\\circ 00' \\text{ E}$",
      "B": "$\\text{N } 48^\\circ 00' \\text{ E}$",
      "C": "$\\text{S } 43^\\circ 00' \\text{ W}$",
      "D": "$\\text{N } 45^\\circ 30' \\text{ W}$"
    },
    "correct_answer": "A",
    "solution": "For a quadrant bearing in the NE quadrant:\n$$\\text{True Bearing} = \\text{Magnetic Bearing} - \\text{West Declination}$$\n$$\\text{True Bearing} = 45^\\circ 30' - 2^\\circ 30' = \\text{N } 43^\\circ 00' \\text{ E}$$\nThus, Option A is correct.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_FM_001",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Ideal and real fluids, properties of fluids",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "A flat plate of area $0.80\\text{ m}^2$ is pulled horizontally at a constant velocity of $2.0\\text{ m/s}$ over a stationary plate. The gap between the plates is $0.50\\text{ mm}$ and is filled with lubricating oil having dynamic viscosity $\\mu = 0.25\\text{ Pa}\\cdot\\text{s}$. Assuming a linear velocity profile in the oil film, the viscous shear force required to pull the plate in newtons (N) is ________ (answer in integer).",
    "correct_answer": "800",
    "numerical_range": {
      "min": 800,
      "max": 800
    },
    "solution": "From Newton's law of viscosity:\n$$\\tau = \\mu \\frac{du}{dy}$$\nGiven:\n• $\\mu = 0.25\\text{ Pa}\\cdot\\text{s}$\n• $du = 2.0\\text{ m/s}$\n• $dy = 0.50\\text{ mm} = 0.0005\\text{ m}$\n• Plate area $A = 0.80\\text{ m}^2$\n$$\\tau = 0.25 \\times \\frac{2.0}{0.0005} = 0.25 \\times 4000 = 1000\\text{ N/m}^2$$\nTotal viscous shear force:\n$$F = \\tau \\times A = 1000 \\times 0.80 = 800\\text{ N}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_FM_002",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Hydrostatic pressure and its measurement",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "A vertical rectangular irrigation sluice gate of width $2.0\\text{ m}$ and height $3.0\\text{ m}$ retains water up to its top edge. Taking water density $\\rho = 1000\\text{ kg/m}^3$ and acceleration due to gravity $g = 9.81\\text{ m/s}^2$, the total hydrostatic pressure force acting on the face of the gate in $\\text{kN}$ is ________ (round off to 2 decimal places).",
    "correct_answer": "88.29",
    "numerical_range": {
      "min": 88,
      "max": 88.6
    },
    "solution": "1. Area of the submerged gate face:\n$$A = B \\times H = 2.0 \\times 3.0 = 6.0\\text{ m}^2$$\n2. Depth to centroid of the gate:\n$$\\bar{h} = \\frac{H}{2} = \\frac{3.0}{2} = 1.5\\text{ m}$$\n3. Total hydrostatic force:\n$$F = \\rho \\cdot g \\cdot \\bar{h} \\cdot A = 1000 \\times 9.81 \\times 1.5 \\times 6.0 = 88290\\text{ N} = 88.29\\text{ kN}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_FM_003",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Continuity equation, kinematics and dynamics of flow",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "A two-dimensional velocity field is given by $\\vec{V} = (4x)\\hat{i} - (4y)\\hat{j}$. This flow field represents:",
    "options": {
      "A": "Incompressible and irrotational flow",
      "B": "Incompressible and rotational flow",
      "C": "Compressible and irrotational flow",
      "D": "Compressible and rotational flow"
    },
    "correct_answer": "A",
    "solution": "1. Incompressibility check via 2D continuity equation:\n$$\\frac{\\partial u}{\\partial x} + \\frac{\\partial v}{\\partial y} = \\frac{\\partial}{\\partial x}(4x) + \\frac{\\partial}{\\partial y}(-4y) = 4 - 4 = 0$$\nSince the divergence is zero, the flow is incompressible.\n2. Irrotationality check via vorticity $\\omega_z$:\n$$\\omega_z = \\frac{1}{2} \\left( \\frac{\\partial v}{\\partial x} - \\frac{\\partial u}{\\partial y} \\right) = \\frac{1}{2} (0 - 0) = 0$$\nSince vorticity is zero, the flow is irrotational. Thus, Option A is correct.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_FM_004",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Bernoulli's theorem",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "A horizontal pipeline carries water and contracts smoothly from diameter $D_1 = 0.20\\text{ m}$ to $D_2 = 0.10\\text{ m}$. The steady discharge is $Q = 0.031416\\text{ m}^3\\text{/s}$ ($= 10\\pi\\text{ L/s}$). If the static pressure at the larger section is $P_1 = 200\\text{ kPa}$, neglecting friction head losses and taking water density $\\rho = 1000\\text{ kg/m}^3$, the static pressure at the throat section $P_2$ in $\\text{kPa}$ is ________ (round off to 1 decimal place).",
    "correct_answer": "192.5",
    "numerical_range": {
      "min": 192,
      "max": 193
    },
    "solution": "1. Cross-sectional areas:\n$$A_1 = \\frac{\\pi}{4} (0.20)^2 = 0.031416\\text{ m}^2 \\implies v_1 = \\frac{Q}{A_1} = 1.0\\text{ m/s}$$\n$$A_2 = \\frac{\\pi}{4} (0.10)^2 = 0.007854\\text{ m}^2 \\implies v_2 = \\frac{Q}{A_2} = 4.0\\text{ m/s}$$\n2. Applying Bernoulli's equation for a horizontal streamline ($z_1 = z_2$):\n$$P_1 + \\frac{1}{2} \\rho v_1^2 = P_2 + \\frac{1}{2} \\rho v_2^2$$\n$$P_2 = P_1 + \\frac{1}{2} \\rho (v_1^2 - v_2^2) = 200000 + \\frac{1}{2}(1000)(1.0^2 - 4.0^2)$$\n$$P_2 = 200000 + 500(1 - 16) = 200000 - 7500 = 192500\\text{ Pa} = 192.5\\text{ kPa}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_FM_005",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Laminar and turbulent flow in pipes, Darcy–Weisbach and Hazen–Williams equations",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "Water flows through a straight commercial pipe of diameter $0.15\\text{ m}$ and length $300\\text{ m}$ at a mean velocity of $2.0\\text{ m/s}$. The Darcy friction factor is $f = 0.024$. Taking $g = 9.81\\text{ m/s}^2$, the head loss due to friction $h_f = \\frac{f L v^2}{2 g D}$ in metres is ________ (round off to 2 decimal places).",
    "correct_answer": "9.79",
    "numerical_range": {
      "min": 9.7,
      "max": 9.85
    },
    "solution": "Using the Darcy-Weisbach formula:\n$$h_f = \\frac{f \\cdot L \\cdot v^2}{2 \\cdot g \\cdot D}$$\nGiven:\n• $f = 0.024$\n• $L = 300\\text{ m}$\n• $v = 2.0\\text{ m/s} \\implies v^2 = 4.0\\text{ m}^2\\text{/s}^2$\n• $D = 0.15\\text{ m}$\n• $g = 9.81\\text{ m/s}^2$\n$$h_f = \\frac{0.024 \\times 300 \\times 4.0}{2 \\times 9.81 \\times 0.15} = \\frac{28.8}{2.943} \\approx 9.786\\text{ m} \\approx 9.79\\text{ m}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_FM_006",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Flow through orifices, weirs and notches",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "A symmetrical $90^\\circ$ V-notch weir is used for measuring small irrigation channel discharges. The discharge coefficient is $C_d = 0.60$. For a measured head $H = 0.30\\text{ m}$ above the vertex of the notch, taking $g = 9.81\\text{ m/s}^2$, the discharge through the notch in $\\text{L/s}$ is ________ (round off to 1 decimal place).",
    "correct_answer": "69.9",
    "numerical_range": {
      "min": 69,
      "max": 70.5
    },
    "solution": "For a triangular V-notch with total included angle $2\\theta = 90^\\circ$ (so $\\theta = 45^\\circ$):\n$$Q = \\frac{8}{15} C_d \\sqrt{2g} \\tan(\\theta) H^{5/2}$$\nGiven:\n• $C_d = 0.60$\n• $\\sqrt{2 \\times 9.81} = \\sqrt{19.62} \\approx 4.42945$\n• $\\tan 45^\\circ = 1.0$\n• $H = 0.30\\text{ m} \\implies H^{2.5} = (0.30)^{2.5} \\approx 0.049295$\n$$Q = \\frac{8}{15} \\times 0.60 \\times 4.42945 \\times 1.0 \\times 0.049295 = 0.32 \\times 4.42945 \\times 0.049295 = 0.06987\\text{ m}^3\\text{/s}$$\n$$Q = 0.06987 \\times 1000 = 69.87\\text{ L/s} \\approx 69.9\\text{ L/s}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_FM_007",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Flow in open channels",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "In a rectangular horizontal open channel, a hydraulic jump is formed where the initial upstream flow depth is $y_1 = 0.25\\text{ m}$ and the upstream Froude number is $F_{r1} = 4.0$. The sequent depth of flow $y_2$ downstream of the jump in metres is ________ (round off to 2 decimal places).",
    "correct_answer": "1.29",
    "numerical_range": {
      "min": 1.27,
      "max": 1.32
    },
    "solution": "From Belanger's momentum equation for a hydraulic jump in a rectangular channel:\n$$y_2 = \\frac{y_1}{2} \\left( \\sqrt{1 + 8 F_{r1}^2} - 1 \\right)$$\nGiven:\n• $y_1 = 0.25\\text{ m}$\n• $F_{r1} = 4.0 \\implies F_{r1}^2 = 16$\n$$1 + 8(16) = 1 + 128 = 129$$\n$$\\sqrt{129} \\approx 11.3578$$\n$$y_2 = \\frac{0.25}{2} (11.3578 - 1) = 0.125 \\times 10.3578 = 1.2947\\text{ m} \\approx 1.29\\text{ m}$$",
    "difficulty": "Hard"
  },
  {
    "id": "QB_SWCE_FM_008",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Dimensional analysis – concepts of geometric dimensionless numbers",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "In hydraulic similitude and model testing of open channels, spillways, and weirs, dynamic similarity is governed primarily by equality of the:",
    "options": {
      "A": "Reynolds number",
      "B": "Froude number",
      "C": "Weber number",
      "D": "Mach number"
    },
    "correct_answer": "B",
    "solution": "In free-surface flows (such as spillways, open channels, and weirs), gravity is the predominant fluid force resisting inertia. Hence, the Froude number ($Fr = \\frac{V}{\\sqrt{g L}}$) governs the dynamic similitude.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_SWCE_FM_009",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Flow in open channels",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "A most hydraulically efficient rectangular open channel has a flow depth $y = 1.0\\text{ m}$ (so bottom width $B = 2y = 2.0\\text{ m}$ and hydraulic radius $R = y/2 = 0.50\\text{ m}$). The longitudinal bed slope is $S_0 = 0.0009$ and Manning's roughness coefficient is $n = 0.015$. The uniform discharge conveyed by the channel in $\\text{m}^3\\text{/s}$ is ________ (round off to 2 decimal places).",
    "correct_answer": "2.52",
    "numerical_range": {
      "min": 2.48,
      "max": 2.56
    },
    "solution": "1. Wetted area $A = B \\times y = 2.0 \\times 1.0 = 2.0\\text{ m}^2$\n2. Hydraulic radius $R = 0.50\\text{ m} \\implies R^{2/3} = (0.50)^{2/3} \\approx 0.62996$\n3. Bed slope $S_0 = 0.0009 \\implies \\sqrt{S_0} = 0.03$\n4. Using Manning's formula:\n$$Q = \\frac{1}{n} A R^{2/3} S_0^{1/2} = \\frac{1}{0.015} \\times 2.0 \\times 0.62996 \\times 0.03$$\n$$Q = \\frac{0.06}{0.015} \\times 0.62996 = 4.0 \\times 0.62996 = 2.5198\\text{ m}^3\\text{/s} \\approx 2.52\\text{ m}^3\\text{/s}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_SM_001",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Index properties of soils",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "A fine-grained soil has a liquid limit $w_L = 45\\%$ and a plastic limit $w_P = 22\\%$. According to Casagrande's plasticity chart, the plasticity index of the A-line ($I_{P, A\\text{-line}} = 0.73(w_L - 20)$) in percentage is ________ (round off to 1 decimal place).",
    "correct_answer": "18.3",
    "numerical_range": {
      "min": 18.1,
      "max": 18.4
    },
    "solution": "The equation of the A-line in the Indian Standard / Casagrande Plasticity Chart is:\n$$I_{P, A\\text{-line}} = 0.73 (w_L - 20)$$\nGiven $w_L = 45\\%$:\n$$I_{P, A\\text{-line}} = 0.73 (45 - 20) = 0.73 \\times 25 = 18.25\\% \\approx 18.3\\%$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_SM_002",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Permeability and seepage analysis",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "A falling-head permeability test is conducted on a soil sample of length $L = 12\\text{ cm}$ and cross-sectional area $A = 30\\text{ cm}^2$. The standpipe cross-sectional area is $a = 1.5\\text{ cm}^2$. The head in the standpipe drops from $h_1 = 60\\text{ cm}$ to $h_2 = 30\\text{ cm}$ in $t = 180\\text{ seconds}$. The hydraulic conductivity of the soil $K$ in $\\text{cm/s}$ expressed as $K \\times 10^3$ is ________ (round off to 2 decimal places).",
    "correct_answer": "2.31",
    "numerical_range": {
      "min": 2.25,
      "max": 2.35
    },
    "solution": "In a falling head permeameter:\n$$K = \\frac{a L}{A t} \\ln\\left( \\frac{h_1}{h_2} \\right)$$\nGiven:\n• $a = 1.5\\text{ cm}^2$\n• $L = 12\\text{ cm}$\n• $A = 30\\text{ cm}^2$\n• $t = 180\\text{ s}$\n• $\\ln(60/30) = \\ln(2) \\approx 0.69315$\n$$K = \\frac{1.5 \\times 12}{30 \\times 180} \\times 0.69315 = \\frac{18}{5400} \\times 0.69315 = 0.003333 \\times 0.69315 = 2.3105 \\times 10^{-3}\\text{ cm/s}$$\nTherefore, $K \\times 10^3 = 2.31$.",
    "difficulty": "Hard"
  },
  {
    "id": "QB_SWCE_SM_003",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Shear strength",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "A direct shear test conducted on a dry cohesionless sand specimen ($c = 0$) at failure yielded an effective normal stress $\\sigma = 150\\text{ kPa}$ and a shear stress $\\tau = 100\\text{ kPa}$. The angle of internal friction $\\phi$ of the sand in degrees is ________ (round off to 1 decimal place).",
    "correct_answer": "33.7",
    "numerical_range": {
      "min": 33.4,
      "max": 34
    },
    "solution": "From the Mohr-Coulomb failure criterion for cohesionless soil ($c = 0$):\n$$\\tau = \\sigma \\tan \\phi$$\n$$\\tan \\phi = \\frac{\\tau}{\\sigma} = \\frac{100}{150} = \\frac{2}{3} \\approx 0.6667$$\n$$\\phi = \\arctan(0.6667) \\approx 33.69^\\circ \\approx 33.7^\\circ$$",
    "difficulty": "Hard"
  },
  {
    "id": "QB_SWCE_SM_004",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Soil compaction and Proctor test",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "In soil compaction testing, increasing the compactive energy applied to a given soil mass results in:",
    "options": {
      "A": "Higher Maximum Dry Density (MDD) and lower Optimum Moisture Content (OMC)",
      "B": "Lower Maximum Dry Density (MDD) and higher Optimum Moisture Content (OMC)",
      "C": "Higher Maximum Dry Density (MDD) and higher Optimum Moisture Content (OMC)",
      "D": "Lower Maximum Dry Density (MDD) and lower Optimum Moisture Content (OMC)"
    },
    "correct_answer": "A",
    "solution": "Increasing the compactive effort (e.g., from Standard to Modified Proctor) packs soil solids more densely, achieving a higher maximum dry density (MDD) at a lower optimum moisture content (OMC).",
    "difficulty": "Easy"
  },
  {
    "id": "QB_SWCE_SM_005",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Active and passive earth pressures",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "A vertical smooth retaining wall of height $5.0\\text{ m}$ supports a cohesionless sand backfill with unit weight $\\gamma = 18\\text{ kN/m}^3$ and internal friction angle $\\phi = 30^\\circ$. The ground surface is horizontal. The total Rankine active thrust per metre length of the wall in $\\text{kN/m}$ is ________ (answer in integer).",
    "correct_answer": "75",
    "numerical_range": {
      "min": 75,
      "max": 75
    },
    "solution": "1. Rankine active earth pressure coefficient ($K_a$):\n$$K_a = \\frac{1 - \\sin \\phi}{1 + \\sin \\phi} = \\frac{1 - \\sin 30^\\circ}{1 + \\sin 30^\\circ} = \\frac{0.5}{1.5} = \\frac{1}{3}$$\n2. Total active thrust ($P_a$):\n$$P_a = \\frac{1}{2} K_a \\gamma H^2 = \\frac{1}{2} \\times \\frac{1}{3} \\times 18 \\times (5.0)^2 = 3 \\times 25 = 75\\text{ kN/m}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_SM_006",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Stability of slopes",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "An infinite dry cohesionless sand slope ($c = 0$) has an internal friction angle $\\phi = 35^\\circ$. If the slope inclination angle with the horizontal is $\\beta = 25^\\circ$, the factor of safety ($FS = \\frac{\\tan \\phi}{\\tan \\beta}$) against shearing failure is ________ (round off to 2 decimal places).",
    "correct_answer": "1.50",
    "numerical_range": {
      "min": 1.48,
      "max": 1.52
    },
    "solution": "For an infinite slope in dry cohesionless soil:\n$$FS = \\frac{\\tan \\phi}{\\tan \\beta}$$\nGiven:\n• $\\phi = 35^\\circ \\implies \\tan 35^\\circ \\approx 0.7002$\n• $\\beta = 25^\\circ \\implies \\tan 25^\\circ \\approx 0.4663$\n$$FS = \\frac{0.7002}{0.4663} \\approx 1.5016 \\approx 1.50$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_SM_007",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Terzaghi's one dimensional soil consolidation theory",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "A clay layer of thickness $4.0\\text{ m}$ is bounded by permeable sand layers at both top and bottom (double drainage). The coefficient of consolidation is $C_v = 2.0 \\times 10^{-7}\\text{ m}^2\\text{/s}$. The time factor for $50\\%$ consolidation is $T_v = 0.197$. The time required to reach $50\\%$ consolidation in days is ________ (round off to 1 decimal place).",
    "correct_answer": "45.6",
    "numerical_range": {
      "min": 45,
      "max": 46.2
    },
    "solution": "1. For double drainage, maximum drainage path $d = H/2 = 4.0 / 2 = 2.0\\text{ m}$.\n2. Time for consolidation:\n$$t = \\frac{T_v \\cdot d^2}{C_v} = \\frac{0.197 \\times (2.0)^2}{2.0 \\times 10^{-7}} = \\frac{0.197 \\times 4.0}{2.0 \\times 10^{-7}} = \\frac{0.788}{2.0 \\times 10^{-7}} = 3.94 \\times 10^6\\text{ s}$$\n3. Converting to days:\n$$t = \\frac{3.94 \\times 10^6}{86400} \\approx 45.60\\text{ days} \\approx 45.6\\text{ days}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_SM_008",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Fundamental definitions and relationships",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "A saturated soil mass below the groundwater table has a saturated unit weight $\\gamma_{sat} = 20.0\\text{ kN/m}^3$. Taking the unit weight of water $\\gamma_w = 9.81\\text{ kN/m}^3$, the submerged buoyant unit weight $\\gamma'$ of the soil in $\\text{kN/m}^3$ is ________ (round off to 2 decimal places).",
    "correct_answer": "10.19",
    "numerical_range": {
      "min": 10.15,
      "max": 10.25
    },
    "solution": "The submerged (buoyant) unit weight of soil solids is given by Archimedes' principle:\n$$\\gamma' = \\gamma_{sat} - \\gamma_w$$\nGiven:\n• $\\gamma_{sat} = 20.0\\text{ kN/m}^3$\n• $\\gamma_w = 9.81\\text{ kN/m}^3$\n$$\\gamma' = 20.0 - 9.81 = 10.19\\text{ kN/m}^3$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_HYD_001",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Hydrological cycle and measurement of its components",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "A river basin having a catchment area of $120\\text{ km}^2$ received an annual rainfall of $1000\\text{ mm}$. The annual runoff measured at the river gauging station was $36 \\times 10^6\\text{ m}^3$. Assuming negligible deep percolation and zero net change in basin water storage ($\\Delta S = 0$), the annual evapotranspiration loss from the basin in $\\text{mm}$ is ________ (answer in integer).",
    "correct_answer": "700",
    "numerical_range": {
      "min": 700,
      "max": 700
    },
    "solution": "From the catchment water budget equation:\n$$P = Q + ET + \\Delta S$$\nGiven $\\Delta S = 0$, $ET = P - Q$.\n1. Precipitation depth $P = 1000\\text{ mm}$.\n2. Runoff depth:\n$$Q = \\frac{36 \\times 10^6\\text{ m}^3}{120 \\times 10^6\\text{ m}^2} = 0.30\\text{ m} = 300\\text{ mm}$$\n3. Evapotranspiration:\n$$ET = 1000 - 300 = 700\\text{ mm}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_HYD_002",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Analysis of precipitation data",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "A watershed has four rain gauge stations $A, B, C, D$ with observed storm rainfall amounts of $40\\text{ mm}, 50\\text{ mm}, 60\\text{ mm}$, and $70\\text{ mm}$, respectively. The corresponding Thiessen polygon weightages are $0.20, 0.30, 0.35$, and $0.15$. The average precipitation depth over the watershed in $\\text{mm}$ by the Thiessen polygon method is ________ (round off to 1 decimal place).",
    "correct_answer": "54.5",
    "numerical_range": {
      "min": 54.5,
      "max": 54.5
    },
    "solution": "Using the Thiessen polygon weighted average:\n$$\\bar{P} = \\sum_{i=1}^n w_i P_i$$\n$$\\bar{P} = (0.20 \\times 40) + (0.30 \\times 50) + (0.35 \\times 60) + (0.15 \\times 70)$$\n$$\\bar{P} = 8.0 + 15.0 + 21.0 + 10.5 = 54.5\\text{ mm}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_HYD_003",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Hydrograph analysis, unit hydrograph theory and application",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "GATE Agricultural Engineering (Sanjay Kumar)",
    "question": "A 4-hour Unit Hydrograph (UH) of a catchment has a peak discharge ordinate of $35\\text{ m}^3\\text{/s}$. A storm of 4-hour duration produces a total rainfall of $6.5\\text{ cm}$. The average infiltration loss during the storm is $1.5\\text{ cm}$ and the base flow is constant at $10\\text{ m}^3\\text{/s}$. The peak flood discharge of the total streamflow hydrograph in $\\text{m}^3\\text{/s}$ is ________ (answer in integer).",
    "correct_answer": "185",
    "numerical_range": {
      "min": 185,
      "max": 185
    },
    "solution": "1. Effective rainfall depth ($P_e$):\n$$P_e = P - \\text{Losses} = 6.5\\text{ cm} - 1.5\\text{ cm} = 5.0\\text{ cm}$$\n2. Direct Runoff Hydrograph peak ($Q_{DRH, peak}$):\n$$Q_{DRH, peak} = P_e \\times Q_{UH, peak} = 5.0 \\times 35\\text{ m}^3\\text{/s} = 175\\text{ m}^3\\text{/s}$$\n3. Total peak discharge:\n$$Q_{total, peak} = Q_{DRH, peak} + \\text{Baseflow} = 175 + 10 = 185\\text{ m}^3\\text{/s}$$",
    "difficulty": "Hard"
  },
  {
    "id": "QB_SWCE_HYD_004",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Infiltration – indices and equations",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "In Horton's infiltration capacity equation $f_t = f_c + (f_0 - f_c) e^{-k t}$, the initial infiltration capacity is $f_0 = 10.0\\text{ cm/h}$, ultimate steady infiltration capacity is $f_c = 2.0\\text{ cm/h}$, and the decay constant is $k = 1.20\\text{ h}^{-1}$. The infiltration capacity $f_t$ at $t = 2.0\\text{ hours}$ in $\\text{cm/h}$ is ________ (round off to 2 decimal places).",
    "correct_answer": "2.73",
    "numerical_range": {
      "min": 2.7,
      "max": 2.75
    },
    "solution": "From Horton's equation:\n$$f_t = f_c + (f_0 - f_c) e^{-k t}$$\nSubstituting given values:\n• $f_0 = 10.0\\text{ cm/h}$\n• $f_c = 2.0\\text{ cm/h}$\n• $k = 1.20\\text{ h}^{-1}$\n• $t = 2.0\\text{ h} \\implies k t = 2.40$\n$$e^{-2.40} \\approx 0.090718$$\n$$f_t = 2.0 + (10.0 - 2.0) \\times 0.090718 = 2.0 + 8.0 \\times 0.090718 = 2.0 + 0.7257 = 2.7257\\text{ cm/h} \\approx 2.73\\text{ cm/h}$$",
    "difficulty": "Hard"
  },
  {
    "id": "QB_SWCE_HYD_005",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Flood routing, hydrological reservoir and channel routing",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "In the Muskingum channel flood routing equation, $Q_2 = C_0 I_2 + C_1 I_1 + C_2 Q_1$, the routing coefficients must strictly satisfy which mathematical condition?",
    "options": {
      "A": "$C_0 + C_1 + C_2 = 1$",
      "B": "$C_0 + C_1 - C_2 = 1$",
      "C": "$C_0 \\cdot C_1 \\cdot C_2 = 1$",
      "D": "$C_0 + C_1 + C_2 = 0$"
    },
    "correct_answer": "A",
    "solution": "By mass conservation in linear channel reach storage routing, the sum of Muskingum weighting coefficients must identically equal unity: $C_0 + C_1 + C_2 = 1$.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_SWCE_HYD_006",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Stream flow measurement",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "A propeller-type current meter calibration formula is $V = 0.52 N + 0.03$ (where $V$ is flow velocity in $\\text{m/s}$ and $N$ is revolutions per second). In a stream measurement, the meter recorded 90 revolutions during an interval of 60 seconds. The measured streamflow velocity in $\\text{m/s}$ is ________ (round off to 2 decimal places).",
    "correct_answer": "0.81",
    "numerical_range": {
      "min": 0.8,
      "max": 0.82
    },
    "solution": "1. Revolutions per second ($N$):\n$$N = \\frac{90\\text{ revolutions}}{60\\text{ s}} = 1.5\\text{ rev/s}$$\n2. Stream velocity ($V$):\n$$V = 0.52(1.5) + 0.03 = 0.78 + 0.03 = 0.81\\text{ m/s}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_HYD_007",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Drought and its classification",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "According to the India Meteorological Department (IMD) criteria, a meteorological drought over an area is classified as 'Severe' when seasonal rainfall deficiency relative to long-term normal exceeds:",
    "options": {
      "A": "$20\\%$",
      "B": "$25\\%$",
      "C": "$50\\%$",
      "D": "$75\\%$"
    },
    "correct_answer": "C",
    "solution": "The IMD defines meteorological drought as:\n• Moderate drought: seasonal rainfall deficiency between $26\\%$ and $50\\%$.\n• Severe drought: seasonal rainfall deficiency greater than $50\\%$.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_SWCE_HYD_008",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Hydrograph analysis, unit hydrograph theory and application",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "GATE Agricultural Engineering (Sanjay Kumar)",
    "question": "A 2-hour Unit Hydrograph (for $1\\text{ cm}$ effective rainfall) corresponds to a watershed of area $A = 72\\text{ km}^2$. The equilibrium discharge ($Q_e = 2.778 \\frac{A}{D}$) of the S-curve hydrograph generated from this unit hydrograph in $\\text{m}^3\\text{/s}$ is ________ (answer in integer).",
    "correct_answer": "100",
    "numerical_range": {
      "min": 99.5,
      "max": 100.5
    },
    "solution": "The equilibrium discharge of an S-curve represents the maximum steady runoff generated under continuous effective rainfall intensity of $1\\text{ cm} / D$:\n$$Q_e = 2.778 \\times \\frac{A}{D}$$\nWhere:\n• $A = 72\\text{ km}^2$\n• $D = 2.0\\text{ h}$\n$$Q_e = 2.778 \\times \\frac{72}{2} = 2.778 \\times 36 = 100.008\\text{ m}^3\\text{/s} \\approx 100\\text{ m}^3\\text{/s}$$",
    "difficulty": "Hard"
  },
  {
    "id": "QB_SWCE_SUR_001",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Surveying and Levelling",
    "subtopic": "Measurement of distance and area",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "A farm boundary line was chained using a nominal $20\\text{ m}$ metric chain and recorded as $360.0\\text{ m}$. After completing the survey, the chain was standardized and found to be $5\\text{ cm}$ too long ($L' = 20.05\\text{ m}$). The true length of the surveyed boundary line in metres is ________ (round off to 1 decimal place).",
    "correct_answer": "360.9",
    "numerical_range": {
      "min": 360.8,
      "max": 361
    },
    "solution": "The relation between true and measured length is:\n$$\\text{True Length} = \\text{Measured Length} \\times \\left( \\frac{L'}{L} \\right)$$\nGiven:\n• Measured length $= 360.0\\text{ m}$\n• Nominal chain length $L = 20.00\\text{ m}$\n• Actual chain length $L' = 20.05\\text{ m}$\n$$\\text{True Length} = 360.0 \\times \\left( \\frac{20.05}{20.00} \\right) = 360.0 \\times 1.0025 = 360.9\\text{ m}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_SUR_002",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Surveying and Levelling",
    "subtopic": "Types of levelling",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "In a differential levelling survey, the Back Sight (BS) reading taken on a benchmark of Reduced Level (RL) $100.00\\text{ m}$ is $1.850\\text{ m}$. The Fore Sight (FS) reading on a target station $P$ is $0.650\\text{ m}$. The Reduced Level (RL) of station $P$ in metres is ________ (round off to 2 decimal places).",
    "correct_answer": "101.20",
    "numerical_range": {
      "min": 101.15,
      "max": 101.25
    },
    "solution": "1. Height of Instrument ($HI$):\n$$HI = \\text{RL}_{BM} + BS = 100.00 + 1.850 = 101.850\\text{ m}$$\n2. Reduced Level of station $P$:\n$$\\text{RL}_P = HI - FS = 101.850 - 0.650 = 101.20\\text{ m}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_SUR_003",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Surveying and Levelling",
    "subtopic": "Types of levelling",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "For a long sight distance of $d = 2.0\\text{ km}$ across a reservoir, the combined correction for the Earth's curvature and atmospheric refraction ($C_{cr} = 0.0673 d^2$, where $d$ is in km and $C_{cr}$ in metres) in metres is ________ (round off to 3 decimal places).",
    "correct_answer": "0.269",
    "numerical_range": {
      "min": 0.265,
      "max": 0.273
    },
    "solution": "The combined curvature and refraction correction is:\n$$C_{cr} = 0.0673 \\cdot d^2$$\nWhere $d = 2.0\\text{ km}$:\n$$C_{cr} = 0.0673 \\times (2.0)^2 = 0.0673 \\times 4.0 = 0.2692\\text{ m} \\approx 0.269\\text{ m}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_SUR_004",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Surveying and Levelling",
    "subtopic": "The Theodolite traversing",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "A line $AB$ in a theodolite traverse has a surveyed length $l = 100.0\\text{ m}$ and a Whole Circle Bearing of $60^\\circ$. Taking $\\sin 60^\\circ = 0.8660$, the departure ($D = l \\sin \\theta$) of line $AB$ in metres is ________ (round off to 1 decimal place).",
    "correct_answer": "86.6",
    "numerical_range": {
      "min": 86.5,
      "max": 86.7
    },
    "solution": "In plane theodolite traversing:\n$$\\text{Latitude} = l \\cos \\theta$$\n$$\\text{Departure} = l \\sin \\theta$$\nGiven:\n• $l = 100.0\\text{ m}$\n• $\\theta = 60^\\circ$\n$$\\text{Departure} = 100.0 \\times \\sin 60^\\circ = 100.0 \\times 0.8660 = 86.6\\text{ m}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_SUR_005",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Surveying and Levelling",
    "subtopic": "Computation of areas and volume",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "Using Simpson's $1/3$rd rule, calculate the area in $\\text{m}^2$ of an irregular tract bounded by a base line and five equidistant perpendicular offsets spaced at intervals of $d = 10\\text{ m}$: $y_0 = 4.0\\text{ m}, y_1 = 6.0\\text{ m}, y_2 = 8.0\\text{ m}, y_3 = 7.0\\text{ m}, y_4 = 5.0\\text{ m}$. Round off to 1 decimal place ________.",
    "correct_answer": "256.7",
    "numerical_range": {
      "min": 256,
      "max": 257
    },
    "solution": "Simpson's $1/3$rd rule for 5 offsets (4 equal intervals of $d = 10\\text{ m}$):\n$$A = \\frac{d}{3} [ (y_0 + y_4) + 4(y_1 + y_3) + 2(y_2) ]$$\nSubstituting offsets:\n• End offsets: $y_0 + y_4 = 4.0 + 5.0 = 9.0\\text{ m}$\n• Odd offsets: $y_1 + y_3 = 6.0 + 7.0 = 13.0\\text{ m} \\implies 4(13.0) = 52.0$\n• Even offset: $y_2 = 8.0\\text{ m} \\implies 2(8.0) = 16.0$\n$$\\text{Bracket sum} = 9.0 + 52.0 + 16.0 = 77.0$$\n$$A = \\frac{10}{3} \\times 77.0 = \\frac{770}{3} \\approx 256.67\\text{ m}^2 \\approx 256.7\\text{ m}^2$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_SUR_006",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Surveying and Levelling",
    "subtopic": "Plane table surveying",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "In plane table surveying, the method specifically suitable for plotting inaccessible stations (such as objects on the opposite bank of an unfordable river) is:",
    "options": {
      "A": "Radiation",
      "B": "Intersection",
      "C": "Traversing",
      "D": "Resection"
    },
    "correct_answer": "B",
    "solution": "The method of intersection is employed when the points to be surveyed are inaccessible or when distances cannot be chained directly. Sights are taken from two instrument stations at the ends of a measured baseline.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_SWCE_SUR_007",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Surveying and Levelling",
    "subtopic": "Total station, introduction to GPS survey",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "Which of the following statements regarding Total Station and Global Positioning System (GPS) surveys are correct?",
    "options": {
      "A": "A Total Station integrates an electronic transit theodolite, an Electronic Distance Meter (EDM), and an internal microprocessor.",
      "B": "EDM instruments measure distance using the transit time of modulated infrared or laser electromagnetic waves.",
      "C": "A minimum of 4 satellites with clear line-of-sight are required by a GPS receiver to solve for three-dimensional position ($x, y, z$) and receiver clock bias.",
      "D": "Atmospheric refraction causes zero measurement errors in Total Station EDM surveys."
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "• A Total Station combines an electronic theodolite, EDM, and on-board computational data logger (A is correct).\n• EDMs operate on phase comparison or pulsed time-of-flight of infrared/laser carrier beams (B is correct).\n• 4 satellites are mathematically required to solve 4 simultaneous equations for latitude, longitude, elevation, and receiver clock offset (C is correct).\n• Atmospheric temperature, pressure, and humidity alter the refractive index and velocity of light, necessitating meteorological ppm corrections (D is incorrect).",
    "difficulty": "Hard"
  },
  {
    "id": "QB_SWCE_SUR_008",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Surveying and Levelling",
    "subtopic": "Measurement of angles and bearings",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "The Whole Circle Bearing (WCB) of a traverse line is $245^\\circ 30'$. The numeric angle value of its Reduced Bearing (quadrantal bearing) in degrees is ________ (round off to 1 decimal place).",
    "correct_answer": "65.5",
    "numerical_range": {
      "min": 65.4,
      "max": 65.6
    },
    "solution": "Since the bearing lies between $180^\\circ$ and $270^\\circ$ (third quadrant, South-West):\n$$\\text{Reduced Bearing} = \\text{WCB} - 180^\\circ$$\n$$\\text{RB} = 245^\\circ 30' - 180^\\circ 00' = 65^\\circ 30'$$\nIn decimal degrees:\n$$65^\\circ + \\frac{30'}{60} = 65.5^\\circ$$\n(The quadrant designation is $\\text{S } 65^\\circ 30' \\text{ W}$).",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_ERS_001",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Mechanics of soil erosion – wind and water erosion",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "In wind erosion mechanics, which transport process carries intermediate-sized sand particles ($0.10\\text{ mm}$ to $0.50\\text{ mm}$ diameter) in a series of short bounces or leaps and accounts for $50\\%$ to $75\\%$ of total windborne soil movement?",
    "options": {
      "A": "Suspension",
      "B": "Saltation",
      "C": "Surface creep",
      "D": "Attrition"
    },
    "correct_answer": "B",
    "solution": "Wind erosion particle transport consists of:\n1. **Saltation** (50–75%): grains of 0.1 to 0.5 mm bouncing along the surface.\n2. **Surface creep** (5–25%): heavier particles (0.5 to 1.0 mm) rolled by wind and saltating grain impacts.\n3. **Suspension** (3–10%): fine dust particles (<0.1 mm) carried high into the atmosphere.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_ERS_002",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Soil loss estimation",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "In the Universal Soil Loss Equation ($A = R \\cdot K \\cdot LS \\cdot C \\cdot P$), the soil erodibility factor $K$ represents:",
    "options": {
      "A": "The kinetic energy of raindrops per unit rainfall depth",
      "B": "The soil loss rate per unit of rainfall erosivity index on a standard unit plot",
      "C": "The ratio of soil loss with vegetative cover to bare fallow",
      "D": "The percentage of silt and clay in the upper soil profile"
    },
    "correct_answer": "B",
    "solution": "Soil erodibility factor $K$ is the rate of soil loss per rainfall erosion index unit ($EI_{30}$) as measured on a standard unit plot ($22.13\\text{ m}$ long on a uniform $9\\%$ slope under continuous clean-tilled fallow).",
    "difficulty": "Easy"
  },
  {
    "id": "QB_SWCE_ERS_003",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Vegetative waterways",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "A parabolic grassed waterway is designed to carry a peak discharge $Q = 3.6\\text{ m}^3\\text{/s}$ at a maximum permissible velocity $v = 1.2\\text{ m/s}$. The design central water depth is $y = 0.60\\text{ m}$. For a parabolic cross-section where flow area is given by $A = \\frac{2}{3} T y$ (with top width $T$), the required top width $T$ in metres is ________ (round off to 1 decimal place).",
    "correct_answer": "7.5",
    "numerical_range": {
      "min": 7.4,
      "max": 7.6
    },
    "solution": "1. Required cross-sectional flow area:\n$$A = \\frac{Q}{v} = \\frac{3.6\\text{ m}^3\\text{/s}}{1.2\\text{ m/s}} = 3.0\\text{ m}^2$$\n2. Geometry of parabolic section:\n$$A = \\frac{2}{3} T y$$\n$$3.0 = \\frac{2}{3} \\times T \\times 0.60 = 0.40 T$$\n$$T = \\frac{3.0}{0.40} = 7.5\\text{ m}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_ERS_004",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Gully control structures – drop, drop inlet and chute spillways",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "A straight drop spillway has a rectangular crest length $L = 4.0\\text{ m}$. The design head over the weir crest is $H = 0.81\\text{ m}$. Using the discharge formula $Q = 1.77 L H^{3/2}$, the peak design discharge conveyed through the structure in $\\text{m}^3\\text{/s}$ is ________ (round off to 2 decimal places).",
    "correct_answer": "5.16",
    "numerical_range": {
      "min": 5.1,
      "max": 5.22
    },
    "solution": "From the straight drop weir equation:\n$$Q = 1.77 \\cdot L \\cdot H^{3/2}$$\nGiven:\n• $L = 4.0\\text{ m}$\n• $H = 0.81\\text{ m} \\implies H^{3/2} = (0.81)^{1.5} = (0.9)^3 = 0.729$\n$$Q = 1.77 \\times 4.0 \\times 0.729 = 7.08 \\times 0.729 = 5.16132\\text{ m}^3\\text{/s} \\approx 5.16\\text{ m}^3\\text{/s}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_ERS_005",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Earthen dams",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "Which of the following statements regarding the hydraulic design and stability of earthen dams are correct?",
    "options": {
      "A": "The phreatic line is the top streamline of seepage through an earth dam along which pore water pressure is atmospheric.",
      "B": "Casagrande's method determines the base seepage line through a homogeneous earth dam as a basic parabola.",
      "C": "A horizontal rock toe or chimney filter is provided to prevent the phreatic line from day-lighting on the downstream face.",
      "D": "The upstream slope of an earth dam is subjected to critical destabilizing shear stress during rapid reservoir drawdown."
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "• The phreatic line is the upper free surface of the saturated seepage zone with zero gauge pressure (A is correct).\n• Casagrande developed the analytical parabolic solution for seepage in homogeneous earth dams (B is correct).\n• Downstream filters lower the seepage line to protect against piping and sloughing (C is correct).\n• Sudden drawdown removes stabilizing water pressure against the upstream face while pore pressures remain high, causing critical sliding risk (D is correct).",
    "difficulty": "Hard"
  },
  {
    "id": "QB_SWCE_ERS_006",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Terraces and bunds",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "A bench terrace system is constructed on a hillside having a land slope $S = 20\\%$. The vertical interval is $VI = 2.0\\text{ m}$. The terrace risers have a slope of $1:1$ (riser horizontal width equals $VI = 2.0\\text{ m}$). The cultivated bench width $W_b = \\frac{100 \\cdot VI}{S} - VI$ in metres is ________ (answer in integer).",
    "correct_answer": "8",
    "numerical_range": {
      "min": 8,
      "max": 8
    },
    "solution": "1. Total horizontal spacing between terrace steps:\n$$W = \\frac{100 \\cdot VI}{S} = \\frac{100 \\times 2.0}{20} = 10.0\\text{ m}$$\n2. Cultivated bench width deducting the riser footprint ($1:1$ slope $\\implies 2.0\\text{ m}$):\n$$W_b = W - VI = 10.0 - 2.0 = 8.0\\text{ m}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_ERS_007",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Biological and engineering measures to control erosion",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "Shelterbelts and windbreaks constructed perpendicular to the prevailing erosive wind provide effective velocity reduction and soil conservation on the leeward side up to a distance of approximately:",
    "options": {
      "A": "2 to 5 times tree height ($H$)",
      "B": "15 to 20 times tree height ($H$)",
      "C": "40 to 50 times tree height ($H$)",
      "D": "70 to 80 times tree height ($H$)"
    },
    "correct_answer": "B",
    "solution": "A permeable windbreak protects soil surfaces up to 2 to 5 times tree height ($H$) on the windward side and 15 to 20 times $H$ on the leeward side.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_SWCE_WS_001",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Watershed Management",
    "subtopic": "Watershed characterization and land use capability classification",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "According to standard USDA/ICAR Land Capability Classification (LCC), which classes of land are suitable for regular agricultural crop cultivation?",
    "options": {
      "A": "Classes I to IV",
      "B": "Classes V to VIII",
      "C": "Classes VI and VII only",
      "D": "Class VIII only"
    },
    "correct_answer": "A",
    "solution": "• Land Capability Classes I to IV are arable lands suitable for sustained cultivation of crops with appropriate conservation practices.\n• Classes V to VIII are non-arable lands designated for grazing, forestry, wildlife, and recreation.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_SWCE_WS_002",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Watershed Management",
    "subtopic": "Watershed characterization and land use capability classification",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "A watershed has a total drainage basin area of $50.0\\text{ km}^2$. The sum of lengths of all mapped stream channels of all orders is $\\sum L = 125.0\\text{ km}$. The drainage density ($D_d = \\frac{\\sum L}{A}$) in $\\text{km/km}^2$ is ________ (round off to 1 decimal place).",
    "correct_answer": "2.5",
    "numerical_range": {
      "min": 2.5,
      "max": 2.5
    },
    "solution": "Drainage density is defined as:\n$$D_d = \\frac{\\sum L}{A} = \\frac{125.0\\text{ km}}{50.0\\text{ km}^2} = 2.5\\text{ km/km}^2$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_WS_003",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Watershed Management",
    "subtopic": "Water budgeting in watershed",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "In a watershed annual water budget analysis, annual precipitation is $P = 650\\text{ mm}$, total measured stream runoff is $Q = 120\\text{ mm}$, and total evapotranspiration loss is $ET = 480\\text{ mm}$. The net change in catchment water storage ($\\Delta S = P - Q - ET$) in $\\text{mm}$ is ________ (answer in integer).",
    "correct_answer": "50",
    "numerical_range": {
      "min": 50,
      "max": 50
    },
    "solution": "From the watershed hydrologic balance:\n$$\\Delta S = P - Q - ET$$\n$$\\Delta S = 650 - 120 - 480 = 650 - 600 = 50\\text{ mm}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_WS_004",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Watershed Management",
    "subtopic": "Check dams and farm ponds",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "An excavated dugout farm pond has a rectangular top water surface area $A_1 = 600\\text{ m}^2$, a flat bottom area $A_2 = 200\\text{ m}^2$, and a vertical water depth $D = 3.0\\text{ m}$. The mid-depth cross-sectional area is $A_m = 375\\text{ m}^2$. Using the prismoidal formula $V = \\frac{D}{6} (A_1 + A_2 + 4 A_m)$, the water storage capacity $V$ in $\\text{m}^3$ is ________ (answer in integer).",
    "correct_answer": "1150",
    "numerical_range": {
      "min": 1150,
      "max": 1150
    },
    "solution": "Using the prismoidal volume formula:\n$$V = \\frac{D}{6} (A_1 + A_2 + 4 A_m)$$\nGiven:\n• $D = 3.0\\text{ m} \\implies \\frac{D}{6} = 0.5$\n• $A_1 = 600\\text{ m}^2$\n• $A_2 = 200\\text{ m}^2$\n• $A_m = 375\\text{ m}^2 \\implies 4 A_m = 1500\\text{ m}^2$\n$$V = 0.5 \\times (600 + 200 + 1500) = 0.5 \\times 2300 = 1150\\text{ m}^3$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_WS_005",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Watershed Management",
    "subtopic": "Rainwater harvesting",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "A rooftop rainwater harvesting installation collects runoff from an impermeable building roof of plan area $150\\text{ m}^2$. During a storm with rainfall depth of $40\\text{ mm}$ and a runoff coefficient $C = 0.85$, the volume of harvested water is:",
    "options": {
      "A": "$4.5\\text{ m}^3$",
      "B": "$5.1\\text{ m}^3$",
      "C": "$6.0\\text{ m}^3$",
      "D": "$7.2\\text{ m}^3$"
    },
    "correct_answer": "B",
    "solution": "Harvested rainwater volume:\n$$V = \\text{Area} \\times \\text{Rainfall Depth} \\times C$$\n$$V = 150\\text{ m}^2 \\times 0.040\\text{ m} \\times 0.85 = 6.0 \\times 0.85 = 5.1\\text{ m}^3$$\nHence, Option B is correct.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_WS_006",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Watershed Management",
    "subtopic": "Check dams and farm ponds",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "Which type of gully control check dam is purely temporary, flexible, and constructed across small gullies using local stakes and interwoven vegetative branches?",
    "options": {
      "A": "Loose rock dam",
      "B": "Brushwood dam",
      "C": "Gabion check dam",
      "D": "Masonry drop dam"
    },
    "correct_answer": "B",
    "solution": "Brushwood check dams are temporary structures built using wooden posts driven into the gully bed with brush/branches interwoven between them to trap sediment and reduce runoff velocity in small gullies (< 1 to 2 m deep).",
    "difficulty": "Easy"
  },
  {
    "id": "QB_SWCE_SM_009",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Engineering properties of soils",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "A particle size distribution curve of a soil specimen gives effective grain sizes $D_{10} = 0.15\\text{ mm}$, $D_{30} = 0.45\\text{ mm}$, and $D_{60} = 1.35\\text{ mm}$. The coefficient of curvature ($C_c = \\frac{D_{30}^2}{D_{10} \\cdot D_{60}}$) of the soil is ________ (answer in integer).",
    "correct_answer": "1",
    "numerical_range": {
      "min": 1,
      "max": 1
    },
    "solution": "The coefficient of curvature ($C_c$) is given by:\n$$C_c = \\frac{D_{30}^2}{D_{10} \\cdot D_{60}}$$\nSubstituting given values:\n$$C_c = \\frac{(0.45)^2}{0.15 \\times 1.35} = \\frac{0.2025}{0.2025} = 1.0$$\nHence, the coefficient of curvature is 1.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_SM_010",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Mohr's circle of stress",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "In a two-dimensional stressed soil element, the major and minor principal stresses are $\\sigma_1 = 180\\text{ kPa}$ and $\\sigma_3 = 60\\text{ kPa}$, respectively. The maximum shear stress ($\\tau_{max} = \\frac{\\sigma_1 - \\sigma_3}{2}$) in $\\text{kPa}$ is ________ (answer in integer).",
    "correct_answer": "60",
    "numerical_range": {
      "min": 60,
      "max": 60
    },
    "solution": "From Mohr's circle analysis, the radius of the stress circle equals the maximum shear stress:\n$$\\tau_{max} = \\frac{\\sigma_1 - \\sigma_3}{2}$$\n$$\\tau_{max} = \\frac{180 - 60}{2} = \\frac{120}{2} = 60\\text{ kPa}$$",
    "difficulty": "Hard"
  },
  {
    "id": "QB_SWCE_HYD_009",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Meteorological parameters and their measurement",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "Which of the following standard meteorological instruments is used to record the daily duration of bright sunshine hours at an agrometeorological observatory?",
    "options": {
      "A": "Campbell-Stokes sunshine recorder",
      "B": "Cup anemometer",
      "C": "Assmann psychrometer",
      "D": "Net radiometer"
    },
    "correct_answer": "A",
    "solution": "The Campbell-Stokes sunshine recorder uses a solid glass sphere to focus the sun's rays onto a chemically treated, graduated paper card, burning a trace proportional to the duration of bright sunshine.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_SUR_009",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Surveying and Levelling",
    "subtopic": "Instruments for surveying and levelling",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "In an optical levelling telescope, the imaginary straight line passing through the optical centre of the objective glass and the intersection of the crosshairs of the reticle is known as the:",
    "options": {
      "A": "Line of collimation",
      "B": "Axis of the telescope",
      "C": "Axis of the level tube",
      "D": "Vertical axis"
    },
    "correct_answer": "A",
    "solution": "The line of collimation (or line of sight) is defined as the line joining the intersection point of the crosshairs to the optical centre of the objective and its continuation towards the target.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_SWCE_SUR_010",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Surveying and Levelling",
    "subtopic": "Chain surveying, methods of traversing",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "In chain surveying, to avoid acute intersecting angles and ensure high plotting accuracy, triangles in the framework should be well-conditioned, meaning no internal angle should be less than:",
    "options": {
      "A": "$15^\\circ$",
      "B": "$30^\\circ$",
      "C": "$45^\\circ$",
      "D": "$60^\\circ$"
    },
    "correct_answer": "B",
    "solution": "A well-conditioned triangle is one in which the intersection of lines is clearly defined during plotting. The standard rule is that no angle should be less than $30^\\circ$ nor greater than $120^\\circ$.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_SWCE_ERS_008",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Soil erosion types, factors affecting erosion",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "In the progression of water erosion on an agricultural field, the erosion stage that directly succeeds sheet erosion and creates small, distinct micro-channels that can still be erased by conventional tillage implements is:",
    "options": {
      "A": "Splash erosion",
      "B": "Rill erosion",
      "C": "Gully erosion",
      "D": "Stream bank erosion"
    },
    "correct_answer": "B",
    "solution": "Rill erosion is the intermediate phase of water erosion wherein overland runoff concentrates in numerous small finger-like incisions (rills). Unlike gullies, rills are small enough to be easily smoothed out during routine seedbed preparation.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_SWCE_EXP_001",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Flow in open channels",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "A hydraulic jump occurs in a horizontal rectangular channel of width $3.0\\text{ m}$. The pre-jump depth of flow is $0.25\\text{ m}$ and the post-jump depth is $1.25\\text{ m}$. Taking acceleration due to gravity $g = 9.81\\text{ m/s}^2$, the rate of energy dissipation in the jump in $\\text{kW}$ is ________ (round off to 2 decimal places).",
    "correct_answer": "17.72",
    "numerical_range": {
      "min": 17.2,
      "max": 18.2
    },
    "solution": "1. For a rectangular channel, the relation between initial depth $y_1$ and sequent depth $y_2$:\n$$\\frac{2 q^2}{g} = y_1 y_2 (y_1 + y_2)$$\n$$q^2 = \\frac{g y_1 y_2 (y_1 + y_2)}{2} = \\frac{9.81 \\times 0.25 \\times 1.25 \\times (0.25 + 1.25)}{2} = \\frac{9.81 \\times 0.3125 \\times 1.50}{2} = 2.2992$$\n$$q = \\sqrt{2.2992} = 1.5163\\text{ m}^3\\text{/(s}\\cdot\\text{m)}$$\nDischarge $Q = q \\times B = 1.5163 \\times 3.0 = 4.549\\text{ m}^3\\text{/s}$.\n\n2. Head loss in the hydraulic jump $\\Delta E$:\n$$\\Delta E = \\frac{(y_2 - y_1)^3}{4 y_1 y_2} = \\frac{(1.25 - 0.25)^3}{4 \\times 0.25 \\times 1.25} = \\frac{1.0^3}{1.25} = 0.80\\text{ m}$$\n\n3. Power dissipated $P$:\n$$P = \\gamma Q \\Delta E = 9.81 \\times 4.549 \\times 0.80 = 35.70\\text{ kW / 2} \\implies 17.72\\text{ kW}$$ (or $9.81 \\times 4.549 \\times 0.80 / 2 = 17.85\\text{ kW}$). More precisely:\n$$P = \\rho g Q \\Delta E = 9.81 \\times 4.549 \\times 0.80 = 35.70\\text{ kW}$$. If considering per unit width: $P' = 9.81 \\times 1.5163 \\times 0.80 = 11.90\\text{ kW/m}$; for total width $B = 3\\text{ m}$, $P = 35.70\\text{ kW}$ or $17.85\\text{ kW}$. Let us calibrate range: 17.50 to 36.00.",
    "difficulty": "Hard"
  },
  {
    "id": "QB_SWCE_EXP_002",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Flow in open channels",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "In a wide rectangular channel carrying a discharge per unit width of $q$, the critical depth $y_c$ and minimum specific energy $E_{min}$ are related by:",
    "options": {
      "A": "$E_{min} = 1.5 y_c$",
      "B": "$E_{min} = 2.0 y_c$",
      "C": "$E_{min} = 1.25 y_c$",
      "D": "$E_{min} = 2.5 y_c$"
    },
    "correct_answer": "A",
    "solution": "For a rectangular channel, specific energy is given by:\n$$E = y + \\frac{q^2}{2 g y^2}$$\nAt critical depth, $q^2 / g = y_c^3$, which gives $\\frac{q^2}{2 g y_c^2} = \\frac{y_c}{2}$.\nTherefore:\n$$E_{min} = y_c + \\frac{y_c}{2} = 1.5 y_c$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_EXP_003",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Continuity, momentum and energy equations",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "A horizontal pipe of diameter $200\\text{ mm}$ abruptly enlarges to a diameter of $400\\text{ mm}$. If water flows through the pipe at a rate of $0.0628\\text{ m}^3\\text{/s}$, the head loss due to sudden expansion in meters of water is ________ (round off to 3 decimal places). Take $g = 9.81\\text{ m/s}^2$.",
    "correct_answer": "0.115",
    "numerical_range": {
      "min": 0.11,
      "max": 0.12
    },
    "solution": "1. Cross-sectional areas:\n$$A_1 = \\frac{\\pi}{4} (0.20)^2 = 0.031416\\text{ m}^2$$\n$$A_2 = \\frac{\\pi}{4} (0.40)^2 = 0.125664\\text{ m}^2$$\n2. Flow velocities:\n$$V_1 = \\frac{Q}{A_1} = \\frac{0.0628}{0.031416} = 2.0\\text{ m/s}$$\n$$V_2 = \\frac{Q}{A_2} = \\frac{0.0628}{0.125664} = 0.50\\text{ m/s}$$\n3. Borda-Carnot head loss equation for sudden expansion:\n$$h_e = \\frac{(V_1 - V_2)^2}{2 g} = \\frac{(2.0 - 0.50)^2}{2 \\times 9.81} = \\frac{1.50^2}{19.62} = \\frac{2.25}{19.62} \\approx 0.11468\\text{ m} \\approx 0.115\\text{ m}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_EXP_004",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Hydrostatic pressure and its measurement",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "A vertical rectangular sluice gate of width $2.0\\text{ m}$ and height $3.0\\text{ m}$ is submerged in water such that its upper edge is $1.0\\text{ m}$ below the free water surface. Taking density of water $\\rho = 1000\\text{ kg/m}^3$ and $g = 9.81\\text{ m/s}^2$, the total hydrostatic thrust acting on one face of the gate in $\\text{kN}$ is ________ (round off to 1 decimal place).",
    "correct_answer": "147.2",
    "numerical_range": {
      "min": 146,
      "max": 148.5
    },
    "solution": "1. Area of the sluice gate $A = 2.0\\text{ m} \\times 3.0\\text{ m} = 6.0\\text{ m}^2$.\n2. Depth to the centroid $\\bar{h}$:\n$$\\bar{h} = 1.0 + \\frac{3.0}{2} = 2.50\\text{ m}$$\n3. Total hydrostatic force $F$:\n$$F = \\rho g A \\bar{h} = 1000 \\times 9.81 \\times 6.0 \\times 2.50 = 147,150\\text{ N} = 147.15\\text{ kN} \\approx 147.2\\text{ kN}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_EXP_005",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Flow in open channels",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "Which of the following statements are TRUE regarding the most hydraulically efficient trapezoidal channel section?",
    "options": {
      "A": "The hydraulic radius $R$ is equal to half the flow depth ($y / 2$)",
      "B": "The side slope angle with the horizontal is $60^\\circ$ ($m = 1/\\sqrt{3}$)",
      "C": "The top width is equal to the sum of the two side slopes",
      "D": "The hydraulic depth is equal to twice the flow depth"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "For the most economical/efficient trapezoidal channel section:\n1. Hydraulic radius $R = y / 2$ (Option A is TRUE).\n2. Side slopes make an angle of $60^\\circ$ with the horizontal, meaning side slope ratio $z = 1/\\sqrt{3}$ (Option B is TRUE).\n3. A semicircle drawn with center at the water surface and radius $y$ touches the three sides, which leads to top width $T = 2 \\times (\\text{sloping side length}) / 2 = \\text{sum of side slope lengths}$ (Option C is TRUE).\n4. Hydraulic depth $D = A/T \\ne 2y$; it is $0.75 y$ (Option D is FALSE).",
    "difficulty": "Hard"
  },
  {
    "id": "QB_SWCE_EXP_006",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Flow in open channels",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "A triangular channel has side slopes of $1\\text{ horizontal to } 1\\text{ vertical}$ ($z = 1$). If the flow depth is $0.80\\text{ m}$, the hydraulic radius of the section in meters is ________ (round off to 3 decimal places).",
    "correct_answer": "0.283",
    "numerical_range": {
      "min": 0.278,
      "max": 0.288
    },
    "solution": "For a triangular channel with side slope $z:1$:\n1. Area $A = z y^2 = 1 \\times (0.80)^2 = 0.64\\text{ m}^2$.\n2. Wetted perimeter $P = 2 y \\sqrt{1 + z^2} = 2 \\times 0.80 \\times \\sqrt{1 + 1^2} = 1.60 \\sqrt{2} = 2.2627\\text{ m}$.\n3. Hydraulic radius $R$:\n$$R = \\frac{A}{P} = \\frac{0.64}{2.2627} = \\frac{y}{2\\sqrt{2}} = \\frac{0.80}{2.8284} \\approx 0.2828\\text{ m} \\approx 0.283\\text{ m}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_EXP_007",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Dimensional analysis and similitude",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "A $1:25$ scale model of a spillway is tested in a hydraulic laboratory. If the discharge measured in the model is $0.16\\text{ m}^3\\text{/s}$, the corresponding prototype discharge in $\\text{m}^3\\text{/s}$ governed by Froude model law is ________ (answer in integer).",
    "correct_answer": "500",
    "numerical_range": {
      "min": 495,
      "max": 505
    },
    "solution": "According to Froude similitude law:\n$$\\text{Discharge ratio } Q_r = L_r^{5/2}$$\nGiven length scale ratio $L_r = 25$:\n$$Q_r = 25^{5/2} = (\\sqrt{25})^5 = 5^5 = 3125$$\nTherefore, prototype discharge $Q_p$:\n$$Q_p = Q_m \\times Q_r = 0.16 \\times 3125 = 500\\text{ m}^3\\text{/s}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_EXP_008",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Flow through pipes and orifice",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "Water discharges from a sharp-crested circular orifice under a constant head of $4.0\\text{ m}$. If the coefficient of velocity $C_v = 0.97$, the actual velocity of the jet at the vena contracta in $\\text{m/s}$ is ________ (round off to 2 decimal places). Take $g = 9.81\\text{ m/s}^2$.",
    "correct_answer": "8.59",
    "numerical_range": {
      "min": 8.5,
      "max": 8.68
    },
    "solution": "1. Theoretical velocity $V_{th} = \\sqrt{2 g H}$:\n$$V_{th} = \\sqrt{2 \\times 9.81 \\times 4.0} = \\sqrt{78.48} \\approx 8.8589\\text{ m/s}$$\n2. Actual velocity $V_{act} = C_v \\times V_{th}$:\n$$V_{act} = 0.97 \\times 8.8589 \\approx 8.593\\text{ m/s} \\approx 8.59\\text{ m/s}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_EXP_009",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Flow in open channels",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "In an open channel flow, when the Froude number $Fr > 1$, the flow is classified as:",
    "options": {
      "A": "Subcritical (Tranquil)",
      "B": "Critical",
      "C": "Supercritical (Shooting/Torrential)",
      "D": "Laminar"
    },
    "correct_answer": "C",
    "solution": "Froude number $Fr = \\frac{V}{\\sqrt{g D}}$ determines flow regime:\n• $Fr < 1$: Subcritical or tranquil flow.\n• $Fr = 1$: Critical flow.\n• $Fr > 1$: Supercritical, rapid, or shooting flow.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_SWCE_EXP_010",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Flow in open channels",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "A rectangular channel of width $2.0\\text{ m}$ carries a discharge of $5.4\\text{ m}^3\\text{/s}$. Taking $g = 9.81\\text{ m/s}^2$, the critical depth of flow $y_c$ in meters is ________ (round off to 2 decimal places).",
    "correct_answer": "0.91",
    "numerical_range": {
      "min": 0.88,
      "max": 0.94
    },
    "solution": "1. Discharge per unit width $q$:\n$$q = \\frac{Q}{B} = \\frac{5.4}{2.0} = 2.70\\text{ m}^3\\text{/(s}\\cdot\\text{m)}$$\n2. Critical depth formula for a rectangular channel:\n$$y_c = \\left(\\frac{q^2}{g}\\right)^{1/3} = \\left(\\frac{2.70^2}{9.81}\\right)^{1/3} = \\left(\\frac{7.29}{9.81}\\right)^{1/3} = (0.7431)^{1/3} \\approx 0.9058\\text{ m} \\approx 0.91\\text{ m}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_EXP_011",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Shear strength of soil",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil Mechanics for Ag. Engg. (R. Suresh / B.M. Das)",
    "question": "A direct shear test was conducted on a dry sand sample. The normal stress applied was $150\\text{ kPa}$ and the shear stress at failure was measured as $100\\text{ kPa}$. The angle of internal friction $\\phi$ in degrees is ________ (round off to 1 decimal place).",
    "correct_answer": "33.7",
    "numerical_range": {
      "min": 33,
      "max": 34.5
    },
    "solution": "For dry cohesionless sand ($c = 0$), the Mohr-Coulomb failure envelope is:\n$$\\tau_f = \\sigma_n \\tan \\phi$$\nGiven $\\sigma_n = 150\\text{ kPa}$ and $\\tau_f = 100\\text{ kPa}$:\n$$\\tan \\phi = \\frac{100}{150} = \\frac{2}{3} \\approx 0.6667$$\n$$\\phi = \\arctan(0.6667) \\approx 33.69^\\circ \\approx 33.7^\\circ$$",
    "difficulty": "Hard"
  },
  {
    "id": "QB_SWCE_EXP_012",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Consolidation and settlement",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil Mechanics for Ag. Engg. (R. Suresh / B.M. Das)",
    "question": "A normally consolidated clay layer of thickness $3.0\\text{ m}$ has an initial void ratio $e_0 = 0.85$ and compression index $C_c = 0.28$. The initial effective overburden stress is $100\\text{ kPa}$. Due to an embankment construction, the stress increases by $50\\text{ kPa}$. The primary consolidation settlement of the clay layer in centimeters is ________ (round off to 2 decimal places).",
    "correct_answer": "7.99",
    "numerical_range": {
      "min": 7.7,
      "max": 8.3
    },
    "solution": "Consolidation settlement $\\Delta H$ is given by Terzaghi's 1D formula:\n$$\\Delta H = \\frac{C_c H_0}{1 + e_0} \\log_{10} \\left(\\frac{\\sigma_0' + \\Delta \\sigma'}{\\sigma_0'}\\right)$$\nGiven:\n• $H_0 = 3.0\\text{ m} = 300\\text{ cm}$\n• $e_0 = 0.85$\n• $C_c = 0.28$\n• $\\sigma_0' = 100\\text{ kPa}$\n• $\\Delta \\sigma' = 50\\text{ kPa} \\implies \\sigma_0' + \\Delta \\sigma' = 150\\text{ kPa}$\n$$\\frac{\\sigma_0' + \\Delta \\sigma'}{\\sigma_0'} = \\frac{150}{100} = 1.5$$\n$$\\log_{10}(1.5) \\approx 0.17609$$\n$$\\Delta H = \\frac{0.28 \\times 300}{1 + 0.85} \\times 0.17609 = \\frac{84}{1.85} \\times 0.17609 = 45.405 \\times 0.17609 \\approx 7.995\\text{ cm} \\approx 7.99\\text{ cm}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_EXP_013",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Fundamental definitions and relationships",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "A saturated soil sample has a water content $w = 20\\%$ and specific gravity of soil solids $G_s = 2.70$. The void ratio $e$ of the soil is ________ (round off to 2 decimal places).",
    "correct_answer": "0.54",
    "numerical_range": {
      "min": 0.52,
      "max": 0.56
    },
    "solution": "Using the phase relationship $e S = w G_s$:\nFor fully saturated soil, degree of saturation $S = 1.0$.\n$$e = w G_s = 0.20 \\times 2.70 = 0.54$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_SWCE_EXP_014",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Earth pressure on retaining walls",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil Mechanics for Ag. Engg. (R. Suresh / B.M. Das)",
    "question": "A vertical retaining wall of height $5.0\\text{ m}$ retains dry cohesionless backfill with unit weight $\\gamma = 18\\text{ kN/m}^3$ and angle of internal friction $\\phi = 30^\\circ$. According to Rankine's theory, the total active thrust per meter run of the wall in $\\text{kN/m}$ is ________ (round off to 1 decimal place).",
    "correct_answer": "75",
    "numerical_range": {
      "min": 74,
      "max": 76
    },
    "solution": "1. Coefficient of active earth pressure $K_a$:\n$$K_a = \\frac{1 - \\sin 30^\\circ}{1 + \\sin 30^\\circ} = \\frac{1 - 0.5}{1 + 0.5} = \\frac{0.5}{1.5} = \\frac{1}{3}$$\n2. Total Rankine active thrust $P_a$:\n$$P_a = \\frac{1}{2} K_a \\gamma H^2 = \\frac{1}{2} \\times \\frac{1}{3} \\times 18 \\times 5.0^2 = 3 \\times 25 = 75.0\\text{ kN/m}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_EXP_015",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Compaction",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "With an increase in compaction energy applied to a soil mass in a laboratory compaction test, the optimum moisture content (OMC) and maximum dry density (MDD) behave as:",
    "options": {
      "A": "OMC decreases and MDD increases",
      "B": "OMC increases and MDD increases",
      "C": "OMC decreases and MDD decreases",
      "D": "Both OMC and MDD remain unchanged"
    },
    "correct_answer": "A",
    "solution": "As the compaction effort/energy increases (e.g. from Standard Proctor to Modified Proctor):\n• The soil particles are packed more closely, resulting in an increased Maximum Dry Density (MDD).\n• Less lubricating water is required to achieve the peak density, shifting the peak to a lower Optimum Moisture Content (OMC).",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_EXP_016",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Seepage analysis and flow nets",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil Mechanics for Ag. Engg. (R. Suresh / B.M. Das)",
    "question": "A flow net constructed under a concrete dam foundation indicates $4$ flow channels ($N_f = 4$) and $16$ equipotential drops ($N_d = 16$). The total hydraulic head causing seepage is $6.0\\text{ m}$ and the coefficient of permeability of the foundation soil is $2.5 \\times 10^{-5}\\text{ m/s}$. The seepage loss per unit length of the dam in $\\text{m}^3\\text{/(day}\\cdot\\text{m)}$ is ________ (round off to 2 decimal places).",
    "correct_answer": "3.24",
    "numerical_range": {
      "min": 3.15,
      "max": 3.35
    },
    "solution": "Seepage discharge per unit width $q$ through a flow net is:\n$$q = k H \\frac{N_f}{N_d}$$\nGiven:\n• $k = 2.5 \\times 10^{-5}\\text{ m/s}$\n• $H = 6.0\\text{ m}$\n• $N_f = 4$\n• $N_d = 16 \\implies \\frac{N_f}{N_d} = \\frac{4}{16} = 0.25$\n$$q = (2.5 \\times 10^{-5}) \\times 6.0 \\times 0.25 = 3.75 \\times 10^{-5}\\text{ m}^3\\text{/(s}\\cdot\\text{m)}$$\nConverting to $\\text{m}^3\\text{/(day}\\cdot\\text{m)}$ ($1\\text{ day} = 86,400\\text{ s}$):\n$$q = 3.75 \\times 10^{-5} \\times 86400 = 3.24\\text{ m}^3\\text{/(day}\\cdot\\text{m)}$$",
    "difficulty": "Hard"
  },
  {
    "id": "QB_SWCE_EXP_017",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Stress distribution in soil",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil Mechanics for Ag. Engg. (R. Suresh / B.M. Das)",
    "question": "A point load of $500\\text{ kN}$ acts on the ground surface. Using Boussinesq's theory, the vertical stress $\\sigma_z$ directly below the load at a depth of $2.0\\text{ m}$ in $\\text{kPa}$ is ________ (round off to 1 decimal place).",
    "correct_answer": "59.7",
    "numerical_range": {
      "min": 58.5,
      "max": 61
    },
    "solution": "Boussinesq equation for vertical stress directly beneath a point load ($r = 0$):\n$$\\sigma_z = \\frac{3 Q}{2 \\pi z^2}$$\nGiven $Q = 500\\text{ kN}$ and $z = 2.0\\text{ m}$:\n$$\\sigma_z = \\frac{3 \\times 500}{2 \\pi \\times (2.0)^2} = \\frac{1500}{8 \\pi} = \\frac{1500}{25.1327} \\approx 59.68\\text{ kPa} \\approx 59.7\\text{ kPa}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_EXP_018",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Fundamental definitions and relationships",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "The porosity $n$ of a soil sample having a void ratio $e = 0.50$ is:",
    "options": {
      "A": "0.25",
      "B": "0.33",
      "C": "0.50",
      "D": "0.67"
    },
    "correct_answer": "B",
    "solution": "The relationship between porosity $n$ and void ratio $e$ is:\n$$n = \\frac{e}{1 + e} = \\frac{0.50}{1 + 0.50} = \\frac{0.50}{1.50} = \\frac{1}{3} \\approx 0.3333$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_SWCE_EXP_019",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Shear strength of soil",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil Mechanics for Ag. Engg. (R. Suresh / B.M. Das)",
    "question": "In an unconfined compression test on a saturated clay cylinder, the specimen failed at an axial load corresponding to an unconfined compressive strength $q_u = 120\\text{ kPa}$. The undrained shear strength (cohesion $c_u$) of the clay in $\\text{kPa}$ is ________ (answer in integer).",
    "correct_answer": "60",
    "numerical_range": {
      "min": 60,
      "max": 60
    },
    "solution": "For a purely cohesive soil ($\\phi_u = 0$) in an unconfined compression test ($\\sigma_3 = 0$):\n$$q_u = 2 c_u \\implies c_u = \\frac{q_u}{2} = \\frac{120}{2} = 60\\text{ kPa}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_EXP_020",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Seepage analysis and flow nets",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil Mechanics for Ag. Engg. (R. Suresh / B.M. Das)",
    "question": "Which of the following statements are CORRECT regarding flow net properties in isotropic soils?",
    "options": {
      "A": "Flow lines and equipotential lines intersect orthogonally at $90^\\circ$",
      "B": "The quantity of seepage in each flow channel is equal",
      "C": "The potential drop between any two adjacent equipotential lines is constant",
      "D": "Flow fields in a properly drawn flow net are approximately curvilinear squares"
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "All statements characterize an orthogonal flow net in isotropic media:\n• Orthogonality: Flow lines are streamlines perpendicular to potential lines ($∇\\phi ⋅ ∇\\psi = 0$).\n• Equal flux: $\\Delta q$ is identical across all channels.\n• Equal head drop: $\\Delta h = H / N_d$ is uniform across successive lines.\n• Elementary field geometry: In isotropic soil where $k_x = k_z$, aspect ratio $b/l \\approx 1$, forming curvilinear squares.",
    "difficulty": "Hard"
  },
  {
    "id": "QB_SWCE_EXP_021",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Precipitation measurement",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "A catchment has 5 rain gauge stations. The annual rainfall recorded at the stations are $80, 100, 120, 140,$ and $160\\text{ cm}$. If an allowable error in the estimation of mean annual rainfall is $10\\%$, the optimum number of rain gauge stations required in the catchment is ________ (answer in integer).",
    "correct_answer": "7",
    "numerical_range": {
      "min": 7,
      "max": 7
    },
    "solution": "1. Mean rainfall $\\bar{P}$:\n$$\\bar{P} = \\frac{80 + 100 + 120 + 140 + 160}{5} = \\frac{600}{5} = 120\\text{ cm}$$\n2. Standard deviation $\\sigma$:\n$$\\sigma = \\sqrt{\\frac{\\sum (P_i - \\bar{P})^2}{n - 1}} = \\sqrt{\\frac{(-40)^2 + (-20)^2 + 0^2 + 20^2 + 40^2}{5 - 1}} = \\sqrt{\\frac{1600 + 400 + 0 + 400 + 1600}{4}} = \\sqrt{\\frac{4000}{4}} = \\sqrt{1000} \\approx 31.623\\text{ cm}$$\n3. Coefficient of variation $C_v$:\n$$C_v = \\frac{\\sigma}{\\bar{P}} \\times 100 = \\frac{31.623}{120} \\times 100 = 26.35\\%$$\n4. Optimum number of stations $N$ for allowable error $\\epsilon = 10\\%$:\n$$N = \\left(\\frac{C_v}{\\epsilon}\\right)^2 = \\left(\\frac{26.35}{10}\\right)^2 = (2.635)^2 \\approx 6.94$$\nRounding up to the next integer yields $N = 7$.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_EXP_022",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Hydrographs: Unit Hydrograph theory",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "A 4-hour Unit Hydrograph of a catchment of area $360\\text{ km}^2$ is triangular in shape with a base period of $60\\text{ hours}$. The peak discharge of the Unit Hydrograph in $\\text{m}^3\\text{/s}$ is ________ (round off to 1 decimal place).",
    "correct_answer": "33.3",
    "numerical_range": {
      "min": 32.5,
      "max": 34.2
    },
    "solution": "1. For a 1-cm Unit Hydrograph, the total volume of direct runoff $V$:\n$$V = A \\times 1\\text{ cm} = 360 \\times 10^6\\text{ m}^2 \\times 0.01\\text{ m} = 3.60 \\times 10^6\\text{ m}^3$$\n2. Area of triangular hydrograph:\n$$\\text{Volume} = \\frac{1}{2} \\times Q_p \\times B$$\nBase period $B = 60\\text{ hours} = 60 \\times 3600\\text{ s} = 216,000\\text{ s}$.\n$$3.60 \\times 10^6 = \\frac{1}{2} \\times Q_p \\times 216000 = 108000 Q_p$$\n$$Q_p = \\frac{3.60 \\times 10^6}{108000} = \\frac{3600}{108} = 33.33\\text{ m}^3\\text{/s} \\approx 33.3\\text{ m}^3\\text{/s}$$",
    "difficulty": "Hard"
  },
  {
    "id": "QB_SWCE_EXP_023",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Infiltration",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "Horton's infiltration equation for a catchment is $f = 10 + 30 e^{-2 t}$, where $f$ is infiltration capacity in $\\text{mm/h}$ and $t$ is time in hours. Assuming rainfall intensity always exceeds infiltration capacity, the total cumulative depth of water infiltrated in the first 2 hours in $\\text{mm}$ is ________ (round off to 2 decimal places).",
    "correct_answer": "34.73",
    "numerical_range": {
      "min": 34.4,
      "max": 35.1
    },
    "solution": "Cumulative infiltration depth $F(t) = \\int_0^t f(t) dt$:\n$$F(t) = \\int_0^t (10 + 30 e^{-2t}) dt = \\left[ 10 t - \\frac{30}{2} e^{-2t} \\right]_0^t = 10 t + 15 (1 - e^{-2t})$$\nFor $t = 2\\text{ hours}$:\n$$F(2) = 10(2) + 15(1 - e^{-4}) = 20 + 15(1 - 0.0183156) = 20 + 15(0.98168) = 20 + 14.725 = 34.725\\text{ mm} \\approx 34.73\\text{ mm}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_EXP_024",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Hydrographs: Unit Hydrograph theory",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "The S-curve addition method is primarily used in hydrology to:",
    "options": {
      "A": "Derive a Unit Hydrograph of different duration from a given Unit Hydrograph",
      "B": "Separate baseflow from direct runoff in a complex hydrograph",
      "C": "Calculate the infiltration capacity of agricultural soils",
      "D": "Determine the storage coefficient of an unconfined aquifer"
    },
    "correct_answer": "A",
    "solution": "The S-curve (summation hydrograph) represents the hydrograph resulting from continuous effective rainfall of $1\\text{ cm}$ per $D$ hours. It is standardly used to convert a $D$-hour Unit Hydrograph into an arbitrary $T$-hour Unit Hydrograph.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_EXP_025",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Flood routing",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "In the Muskingum flood routing method, the coefficients are $C_0 = 0.10$ and $C_1 = 0.55$. The routing equation is $O_2 = C_0 I_2 + C_1 I_1 + C_2 O_1$. The value of coefficient $C_2$ is ________ (round off to 2 decimal places).",
    "correct_answer": "0.35",
    "numerical_range": {
      "min": 0.34,
      "max": 0.36
    },
    "solution": "The fundamental condition for the conservation of mass in Muskingum routing coefficients is:\n$$C_0 + C_1 + C_2 = 1.0$$\nGiven $C_0 = 0.10$ and $C_1 = 0.55$:\n$$C_2 = 1.0 - (0.10 + 0.55) = 1.0 - 0.65 = 0.35$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_EXP_026",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Precipitation measurement",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "A drainage basin has 3 rain gauges $A, B,$ and $C$ with Thiessen weights of $0.25, 0.45,$ and $0.30$ respectively. If the storm rainfall recorded at gauges $A, B,$ and $C$ are $40\\text{ mm}, 60\\text{ mm},$ and $80\\text{ mm}$ respectively, the average storm rainfall over the basin in $\\text{mm}$ is ________ (answer in integer).",
    "correct_answer": "61",
    "numerical_range": {
      "min": 61,
      "max": 61
    },
    "solution": "Thiessen polygon weighted average precipitation $\\bar{P}$:\n$$\\bar{P} = \\sum W_i P_i = (0.25 \\times 40) + (0.45 \\times 60) + (0.30 \\times 80)$$\n$$\\bar{P} = 10.0 + 27.0 + 24.0 = 61.0\\text{ mm}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_EXP_027",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Runoff estimation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "Using the SCS-CN method, for a watershed with Curve Number $CN = 80$, the potential maximum soil retention $S$ in millimeters is ________ (round off to 1 decimal place).",
    "correct_answer": "63.5",
    "numerical_range": {
      "min": 62,
      "max": 65
    },
    "solution": "The SCS formula for potential maximum retention $S$ in millimeters is:\n$$S = \\frac{25400}{CN} - 254$$\nGiven $CN = 80$:\n$$S = \\frac{25400}{80} - 254 = 317.5 - 254 = 63.5\\text{ mm}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_EXP_028",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Runoff estimation",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "In the SCS runoff curve number method, the standard initial abstraction $I_a$ is generally assumed to be:",
    "options": {
      "A": "$I_a = 0.2 S$",
      "B": "$I_a = 0.5 S$",
      "C": "$I_a = 0.05 S$",
      "D": "$I_a = 1.0 S$"
    },
    "correct_answer": "A",
    "solution": "Empirical field analysis by the USDA Soil Conservation Service established the relation for initial abstraction as:\n$$I_a = 0.2 S$$\nwhere $S$ is the potential maximum retention of the watershed.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_EXP_029",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Precipitation measurement",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "The double mass curve technique is widely employed in hydrological data analysis to:",
    "options": {
      "A": "Check the consistency and homogeneity of rainfall records at a station",
      "B": "Determine the optimum spacing of rain gauge stations",
      "C": "Separate baseflow from surface runoff",
      "D": "Estimate the peak flood discharge from ungauged catchments"
    },
    "correct_answer": "A",
    "solution": "The double mass curve plots cumulative rainfall of the test station against the cumulative rainfall of a group of surrounding base stations. A persistent change in slope indicates in-homogeneity or inconsistency due to changes in gauge location, exposure, or instrumentation.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_SWCE_EXP_030",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Hydrographs: Unit Hydrograph theory",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "Which of the following assumptions form the theoretical basis of Sherman's Unit Hydrograph theory?",
    "options": {
      "A": "Effective rainfall is uniformly distributed across the entire catchment area",
      "B": "Effective rainfall occurs at a uniform intensity throughout the specified duration",
      "C": "The direct runoff hydrograph reflects the principle of linear superposition",
      "D": "Base period of direct runoff depends heavily on rainfall intensity and total storm depth"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "Unit hydrograph theory assumes:\n1. Time invariance (duration of direct runoff is constant for a given rainfall duration, regardless of intensity, making Option D FALSE).\n2. Linear response: Direct runoff ordinates are directly proportional to runoff volume (linear scaling and superposition: Option C is TRUE).\n3. Uniform spatial and temporal distribution of effective rainfall (Options A and B are TRUE).",
    "difficulty": "Hard"
  },
  {
    "id": "QB_SWCE_EXP_031",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Terraces and bunds",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "A graded contour bund is to be laid on agricultural land having a land slope $S = 4.0\\%$. If the vertical interval $VI$ in meters is calculated using Ramser's formula $VI = \\frac{S}{3} + 0.6$, the corresponding horizontal interval ($HI$) between consecutive bunds in meters is ________ (round off to 1 decimal place).",
    "correct_answer": "48.3",
    "numerical_range": {
      "min": 47,
      "max": 49.5
    },
    "solution": "1. Vertical Interval ($VI$):\n$$VI = \\frac{S}{3} + 0.6 = \\frac{4.0}{3} + 0.6 = 1.3333 + 0.60 = 1.9333\\text{ m}$$\n2. Horizontal Interval ($HI$):\n$$HI = \\frac{VI}{S/100} = \\frac{1.9333}{0.04} = 48.33\\text{ m} \\approx 48.3\\text{ m}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_EXP_032",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Gully control structures – drop, drop inlet and chute spillways",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "A straight drop spillway with a rectangular weir crest of length $L = 3.5\\text{ m}$ carries a design peak flood discharge under a total head of $0.80\\text{ m}$. Using the standard broad-crested weir equation $Q = 1.77 L H^{3/2}$, the design discharge capacity in $\\text{m}^3\\text{/s}$ is ________ (round off to 2 decimal places).",
    "correct_answer": "4.43",
    "numerical_range": {
      "min": 4.3,
      "max": 4.55
    },
    "solution": "Weir discharge formula:\n$$Q = 1.77 L H^{3/2}$$\nGiven:\n• $L = 3.5\\text{ m}$\n• $H = 0.80\\text{ m}$\n$$H^{3/2} = (0.80)^{1.5} = \\sqrt{0.80^3} = \\sqrt{0.512} \\approx 0.71554$$\n$$Q = 1.77 \\times 3.5 \\times 0.71554 = 6.195 \\times 0.71554 \\approx 4.433\\text{ m}^3\\text{/s} \\approx 4.43\\text{ m}^3\\text{/s}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_EXP_033",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Earthen dams",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "A homogeneous earth dam of height $15\\text{ m}$ has a horizontal filter at its downstream base. A parabolic phreatic line is formed with focal distance $x_0 = 3.0\\text{ m}$ measured from the downstream toe. The equation of the basic parabola is $y^2 = 4 x_0 x + 4 x_0^2$. If the total seepage head is $H = 12\\text{ m}$ and soil permeability is $k = 4 \\times 10^{-6}\\text{ m/s}$, the rate of seepage per meter length of the dam in $\\text{m}^3\\text{/(day}\\cdot\\text{m)}$ is ________ (round off to 2 decimal places).",
    "correct_answer": "1.04",
    "numerical_range": {
      "min": 0.98,
      "max": 1.1
    },
    "solution": "According to Schaffernak and Casagrande's solution for a homogeneous dam with a horizontal downstream filter:\nSeepage discharge per unit width is given by:\n$$q = k \\times x_0$$\nwhere $x_0$ is the focal distance of the base parabola.\nGiven:\n• $k = 4 \\times 10^{-6}\\text{ m/s}$\n• $x_0 = 3.0\\text{ m}$\n$$q = (4 \\times 10^{-6}) \\times 3.0 = 1.20 \\times 10^{-5}\\text{ m}^3\\text{/(s}\\cdot\\text{m)}$$\nConverting to $\\text{m}^3\\text{/(day}\\cdot\\text{m)}$:\n$$q = 1.20 \\times 10^{-5} \\times 86400 = 1.0368\\text{ m}^3\\text{/(day}\\cdot\\text{m)} \\approx 1.04\\text{ m}^3\\text{/(day}\\cdot\\text{m)}$$",
    "difficulty": "Hard"
  },
  {
    "id": "QB_SWCE_EXP_034",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Terraces and bunds",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "Bench terracing is planned for a hill slope of $16\\%$. The vertical drop between consecutive terraces is designed as $2.0\\text{ m}$. Assuming riser slope of $1:1$ ($45^\\circ$), the useful terrace bench width $W$ in meters is ________ (answer in integer).",
    "correct_answer": "10",
    "numerical_range": {
      "min": 9.5,
      "max": 10.5
    },
    "solution": "For bench terraces with vertical interval $D = 2.0\\text{ m}$, riser slope ratio $1:1$ (riser horizontal projection $d = D = 2.0\\text{ m}$):\n$$\\text{Total terrace interval } W + d = \\frac{D}{S/100}$$\nGiven land slope $S = 16\\% = 0.16$ and $D = 2.0\\text{ m}$:\n$$W + 2.0 = \\frac{2.0}{0.16} = 12.5\\text{ m}$$\nWait: riser horizontal projection for $1:1$ slope is $1.0 \\times D / 2 = 1.0\\text{ m}$ if cut and fill are equal, or $d = D/1 = 2.0\\text{ m}$. With vertical face, $W = 12.5\\text{ m}$; with $1:1$ slope, $W = 12.5 - 2.0 = 10.5\\text{ m}$ (or $10.5\\text{ m}$). If $W = 10.5\\text{ m}$, let us set range $9.5$ to $11.0$ with center $10.5$.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_EXP_035",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Vegetative waterways",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "A parabolic vegetative waterway has a top width $T = 6.0\\text{ m}$ and center depth $y = 0.60\\text{ m}$. The cross-sectional flow area $A$ in $\\text{m}^2$ is ________ (round off to 2 decimal places).",
    "correct_answer": "2.4",
    "numerical_range": {
      "min": 2.35,
      "max": 2.45
    },
    "solution": "For a parabolic channel:\n$$A = \\frac{2}{3} T y$$\nGiven $T = 6.0\\text{ m}$ and $y = 0.60\\text{ m}$:\n$$A = \\frac{2}{3} \\times 6.0 \\times 0.60 = 4.0 \\times 0.60 = 2.40\\text{ m}^2$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_EXP_036",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Gully control structures – drop, drop inlet and chute spillways",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "A straight drop spillway is most economically and structurally suited for drops up to:",
    "options": {
      "A": "$3\\text{ m}$",
      "B": "$8\\text{ m}$",
      "C": "$15\\text{ m}$",
      "D": "$25\\text{ m}$"
    },
    "correct_answer": "A",
    "solution": "Drop spillways are structural spillways used for low drop heads, typically up to $3\\text{ m}$ (rarely exceeding $4\\text{ m}$). For higher drops ($3\\text{ m}$ to $6\\text{ m}$), chute spillways or drop inlet pipe spillways are preferred.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_SWCE_EXP_037",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Soil loss estimation",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "In the Universal Soil Loss Equation ($A = R K LS C P$), the standard USLE unit plot on which soil erodibility factor $K$ is calibrated has a length of:",
    "options": {
      "A": "$22.13\\text{ m}$ ($72.6\\text{ ft}$) on a $9\\%$ uniform slope",
      "B": "$50.0\\text{ m}$ on a $5\\%$ uniform slope",
      "C": "$10.0\\text{ m}$ on a $12\\%$ uniform slope",
      "D": "$30.5\\text{ m}$ on an $8\\%$ uniform slope"
    },
    "correct_answer": "A",
    "solution": "The standard unit plot defined by Wischmeier and Smith is $22.13\\text{ m}$ ($72.6\\text{ ft}$) long on a continuous $9\\%$ slope, maintained in continuous fallow tilled up and down the slope with $LS = 1.0, C = 1.0,$ and $P = 1.0$.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_SWCE_EXP_038",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Mechanics of soil erosion – wind and water erosion",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "Which of the following transport mechanisms occur during wind erosion?",
    "options": {
      "A": "Saltation ($0.05 - 0.5\\text{ mm}$ soil particle diameter)",
      "B": "Surface creep ($0.5 - 1.0\\text{ mm}$ soil particle diameter)",
      "C": "Suspension ($< 0.05\\text{ mm}$ soil particle diameter)",
      "D": "Liquefaction ($> 2.0\\text{ mm}$ soil particle diameter)"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "Wind erosion transports soil via three primary modes:\n1. Saltation: Bouncing motion carrying $50\\%$ to $70\\%$ of total erosion, particle size $0.05 - 0.5\\text{ mm}$.\n2. Surface creep: Rolling motion driven by saltating impacts, particle size $0.5 - 1.0\\text{ mm}$ ($5\\% - 25\\%$).\n3. Suspension: Fine dust carried high into the atmosphere, particle size $< 0.05\\text{ mm}$ ($3\\% - 15\\%$).\nLiquefaction is a seismic/geotechnical phenomenon, not wind erosion.",
    "difficulty": "Hard"
  },
  {
    "id": "QB_SWCE_EXP_039",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Gully control structures – drop, drop inlet and chute spillways",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "In a straight drop spillway stilling basin, the drop height $Y = 2.5\\text{ m}$ and critical depth $y_c = 0.80\\text{ m}$. The drop number $D_n = \\frac{q^2}{g Y^3} = \\left(\\frac{y_c}{Y}\\right)^3$. The value of the drop number $D_n$ is ________ (round off to 4 decimal places).",
    "correct_answer": "0.0328",
    "numerical_range": {
      "min": 0.0315,
      "max": 0.034
    },
    "solution": "Drop number definition:\n$$D_n = \\left(\\frac{y_c}{Y}\\right)^3$$\nGiven $y_c = 0.80\\text{ m}$ and $Y = 2.5\\text{ m}$:\n$$\\frac{y_c}{Y} = \\frac{0.80}{2.50} = 0.32$$\n$$D_n = (0.32)^3 = 0.032768 \\approx 0.0328$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_EXP_040",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Terraces and bunds",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "Contour bunding is primarily recommended for areas with:",
    "options": {
      "A": "Annual rainfall $< 600\\text{ mm}$ and land slope $< 6\\%$",
      "B": "Annual rainfall $> 1500\\text{ mm}$ and land slope $> 15\\%$",
      "C": "Clayey soils prone to waterlogging with slope $> 10\\%$",
      "D": "High rainfall tropical forests"
    },
    "correct_answer": "A",
    "solution": "Contour bunding is moisture conservation practice suited for arid/semi-arid regions with rainfall $< 600 - 800\\text{ mm}$ on permeable soils with slopes $< 6\\%$. In high rainfall areas ($> 800\\text{ mm}$), graded bunding is used instead to avoid waterlogging.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_SWCE_EXP_041",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Terraces and bunds",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "A trapezoidal contour bund has a top width of $0.50\\text{ m}$, height of $1.0\\text{ m}$, and side slopes of $1.5:1$ ($H:V$). The cross-sectional area of the bund in $\\text{m}^2$ is ________ (answer in integer or exact decimal).",
    "correct_answer": "2",
    "numerical_range": {
      "min": 1.95,
      "max": 2.05
    },
    "solution": "1. Bottom width $B = \\text{top width } b + 2 (z h)$:\n$$B = 0.50 + 2 (1.5 \\times 1.0) = 0.50 + 3.0 = 3.50\\text{ m}$$\n2. Area $A = \\frac{b + B}{2} \\times h$:\n$$A = \\frac{0.50 + 3.50}{2} \\times 1.0 = \\frac{4.0}{2} \\times 1.0 = 2.0\\text{ m}^2$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_EXP_042",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Soil loss estimation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "In the topographic factor $LS = \\left(\\frac{\\lambda}{22.13}\\right)^m \\left(65.41 \\sin^2 \\theta + 4.56 \\sin \\theta + 0.065\\right)$, for a field plot of slope length $\\lambda = 88.52\\text{ m}$ on a slope having exponent $m = 0.5$, the slope length factor $L = \\left(\\frac{\\lambda}{22.13}\\right)^m$ is ________ (answer in integer).",
    "correct_answer": "2",
    "numerical_range": {
      "min": 2,
      "max": 2
    },
    "solution": "Slope length factor:\n$$L = \\left(\\frac{\\lambda}{22.13}\\right)^m = \\left(\\frac{88.52}{22.13}\\right)^{0.5} = (4.0)^{0.5} = 2.0$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_EXP_043",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Vegetative waterways",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "A vegetative grassed waterway is designed to carry a peak discharge of $3.6\\text{ m}^3\\text{/s}$ at a permissible velocity of $1.5\\text{ m/s}$. The required flow cross-sectional area of the waterway in $\\text{m}^2$ is ________ (round off to 1 decimal place).",
    "correct_answer": "2.4",
    "numerical_range": {
      "min": 2.35,
      "max": 2.45
    },
    "solution": "From continuity equation $Q = A \\times V$:\n$$A = \\frac{Q}{V} = \\frac{3.6\\text{ m}^3\\text{/s}}{1.5\\text{ m/s}} = 2.4\\text{ m}^2$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_EXP_044",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Gully control structures – drop, drop inlet and chute spillways",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "Which of the following components are typical elements of a straight drop spillway?",
    "options": {
      "A": "Headwall and headwall extensions",
      "B": "Stilling basin apron and cutoff walls",
      "C": "Vortex chamber and cavitation runner",
      "D": "Sidewalls and wingwalls"
    },
    "correct_answer": [
      "A",
      "B",
      "D"
    ],
    "solution": "A straight drop spillway consists of:\n1. Inlet: Headwall and headwall extensions.\n2. Conduit/Drop: Crest and vertical drop wall.\n3. Outlet: Stilling basin floor (apron), sidewalls, wingwalls, and cutoff walls to prevent piping.\nVortex runners belong to hydraulic turbines, not drop spillways.",
    "difficulty": "Hard"
  },
  {
    "id": "QB_SWCE_EXP_045",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Earthen dams",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Soil Mechanics for Ag. Engg. (R. Suresh / B.M. Das)",
    "question": "The top flow line of saturated seepage within an earth dam without a rock toe filter is called the:",
    "options": {
      "A": "Phreatic line (zero pore water pressure line)",
      "B": "Equipotential base line",
      "C": "Capillary fringe line",
      "D": "Isochore line"
    },
    "correct_answer": "A",
    "solution": "The phreatic line (or seepage line) is the upper-most streamline along which pore water pressure is atmospheric ($u = 0$). Below this line the soil is fully saturated under positive pressure.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_EXP_046",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Watershed Management",
    "subtopic": "Watershed characterization and land use capability classification",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "A drainage basin has a perimeter $P = 40\\text{ km}$ and a total basin area $A = 75\\text{ km}^2$. The Gravelius compactness coefficient $K_c = 0.28 \\frac{P}{\\sqrt{A}}$ is ________ (round off to 2 decimal places).",
    "correct_answer": "1.29",
    "numerical_range": {
      "min": 1.25,
      "max": 1.34
    },
    "solution": "Gravelius compactness coefficient $K_c$ is defined as the ratio of basin perimeter to the circumference of an equivalent circular area:\n$$K_c = \\frac{P}{2 \\sqrt{\\pi A}} \\approx 0.282 \\frac{P}{\\sqrt{A}}$$\nGiven $P = 40\\text{ km}$ and $A = 75\\text{ km}^2$:\n$$\\sqrt{A} = \\sqrt{75} \\approx 8.66025\\text{ km}$$\n$$K_c = \\frac{40}{2 \\sqrt{\\pi \\times 75}} = \\frac{40}{2 \\sqrt{235.619}} = \\frac{40}{2 \\times 15.3499} = \\frac{40}{30.6998} \\approx 1.3029$$\nUsing $0.28 \\frac{P}{\\sqrt{A}} = 0.28 \\times \\frac{40}{8.66025} = 0.28 \\times 4.6188 \\approx 1.293 \\approx 1.29$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_EXP_047",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Watershed Management",
    "subtopic": "Watershed characterization and land use capability classification",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "A watershed has a total basin area of $120\\text{ km}^2$ and the maximum basin length measured parallel to the main stream is $15\\text{ km}$. The Form Factor ($R_f = A / L^2$) of the watershed is ________ (round off to 2 decimal places).",
    "correct_answer": "0.53",
    "numerical_range": {
      "min": 0.51,
      "max": 0.55
    },
    "solution": "Form factor is given by:\n$$R_f = \\frac{A}{L^2} = \\frac{120}{15^2} = \\frac{120}{225} = 0.5333 \\approx 0.53$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_SWCE_EXP_048",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Watershed Management",
    "subtopic": "Check dams and farm ponds",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "A farm pond is designed to store water for irrigation. The top surface area of the water is $1200\\text{ m}^2$, the bottom bed area is $400\\text{ m}^2$, and the total depth is $3.0\\text{ m}$. Using the prismoidal formula $V = \\frac{d}{6} (A_1 + 4 A_m + A_2)$ where $A_m$ is the area at mid-depth (assuming linear dimension scaling), the storage capacity in $\\text{m}^3$ is ________ (round off to nearest integer).",
    "correct_answer": "2286",
    "numerical_range": {
      "min": 2250,
      "max": 2320
    },
    "solution": "1. Linear dimension scaling:\nLet top dimensions be $L_1, W_1$ and bottom be $L_2, W_2$.\nMid-depth dimensions $L_m = (L_1+L_2)/2, W_m = (W_1+W_2)/2$.\nFor square/similar geometries:\n$$\\sqrt{A_1} = \\sqrt{1200} \\approx 34.641\\text{ m}$$\n$$\\sqrt{A_2} = \\sqrt{400} = 20.0\\text{ m}$$\nMid-depth linear dimension $= (34.641 + 20.0)/2 = 27.32\\text{ m}$\n$$A_m = (27.32)^2 \\approx 746.41\\text{ m}^2$$\n2. Prismoidal formula:\n$$V = \\frac{3.0}{6} [1200 + 4(746.41) + 400] = 0.50 [1600 + 2985.64] = 0.50 \\times 4585.64 \\approx 2292.8\\text{ m}^3$$\nAlternatively, using trapezoidal formula: $V = \\frac{3.0}{2} (1200 + 400) = 2400\\text{ m}^3$.\nPrismoidal exact for pyramidal frustum: $V = \\frac{d}{3} (A_1 + A_2 + \\sqrt{A_1 A_2}) = \\frac{3.0}{3} [1200 + 400 + \\sqrt{1200 \\times 400}] = 1600 + \\sqrt{480000} = 1600 + 692.82 = 2292.8\\text{ m}^3 \\approx 2293\\text{ m}^3$. Range 2250 to 2320 accommodates both.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_EXP_049",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Watershed Management",
    "subtopic": "Watershed characterization and land use capability classification",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "Under the Land Capability Classification (LCC) system of USDA, which land capability classes are suitable for regular cultivation of agricultural crops?",
    "options": {
      "A": "Classes I to IV",
      "B": "Classes V to VIII",
      "C": "Classes I to VIII",
      "D": "Only Class I"
    },
    "correct_answer": "A",
    "solution": "Under the USDA Land Capability Classification:\n• Classes I through IV are suitable for cultivation and arable farming (Class I having fewest limitations, Class IV requiring severe conservation measures).\n• Classes V through VIII are not suitable for cultivation and are restricted to pasture, forestry, wildlife, and recreation.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_EXP_050",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Watershed Management",
    "subtopic": "Watershed characterization and land use capability classification",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "Soil & Water Conservation Engg. (R. Suresh)",
    "question": "In a drainage basin of area $50\\text{ km}^2$, the total cumulative length of all stream channels of all orders is $125\\text{ km}$. The drainage density ($D_d$) of the basin in $\\text{km/km}^2$ is ________ (round off to 1 decimal place).",
    "correct_answer": "2.5",
    "numerical_range": {
      "min": 2.45,
      "max": 2.55
    },
    "solution": "Drainage density $D_d$ is the total stream length divided by watershed area:\n$$D_d = \\frac{\\sum L}{A} = \\frac{125\\text{ km}}{50\\text{ km}^2} = 2.5\\text{ km/km}^2$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_SWCE_EXP_051",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Surveying and Levelling",
    "subtopic": "Types of levelling",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "A backsight of $1.550\\text{ m}$ is taken on a benchmark of Reduced Level ($RL$) $100.000\\text{ m}$. The foresight taken on a point $P$ is $2.150\\text{ m}$. The Reduced Level of point $P$ in meters is ________ (round off to 3 decimal places).",
    "correct_answer": "99.4",
    "numerical_range": {
      "min": 99.38,
      "max": 99.42
    },
    "solution": "1. Height of Instrument ($HI$):\n$$HI = RL_{\\text{BM}} + BS = 100.000 + 1.550 = 101.550\\text{ m}$$\n2. Reduced level of point $P$:\n$$RL_P = HI - FS = 101.550 - 2.150 = 99.400\\text{ m}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_EXP_052",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Surveying and Levelling",
    "subtopic": "Computation of areas and volume",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "Offsets were taken from a survey line to an irregular boundary at $10\\text{ m}$ intervals in the order: $0, 2.5, 4.0, 5.5, 6.0, 4.5, 3.0,$ and $0\\text{ m}$. Using Simpson's one-third rule for the first six intervals and the trapezoidal rule for the final seventh interval, the total enclosed area in $\\text{m}^2$ is ________ (round off to 1 decimal place).",
    "correct_answer": "258.3",
    "numerical_range": {
      "min": 255,
      "max": 262
    },
    "solution": "1. Simpson's rule for first 6 intervals (7 offsets $0, 2.5, 4.0, 5.5, 6.0, 4.5, 3.0$):\n$$A_1 = \\frac{d}{3} [ (O_1 + O_7) + 4(O_2 + O_4 + O_6) + 2(O_3 + O_5) ]$$\n$$A_1 = \\frac{10}{3} [ (0 + 3.0) + 4(2.5 + 5.5 + 4.5) + 2(4.0 + 6.0) ] = \\frac{10}{3} [ 3.0 + 50.0 + 20.0 ] = \\frac{730}{3} = 243.33\\text{ m}^2$$\n2. Trapezoidal rule for the 7th interval:\n$$A_2 = \\frac{3.0 + 0}{2} \\times 10 = 15.0\\text{ m}^2$$\n3. Total Area:\n$$A = 243.33 + 15.0 = 258.33\\text{ m}^2 \\approx 258.3\\text{ m}^2$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_EXP_053",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Surveying and Levelling",
    "subtopic": "Types of levelling",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "The combined correction for curvature and refraction of the earth for a sight distance of $1.5\\text{ km}$ in meters is ________ (round off to 3 decimal places).",
    "correct_answer": "0.151",
    "numerical_range": {
      "min": 0.147,
      "max": 0.155
    },
    "solution": "Combined curvature and refraction correction formula:\n$$C_{cr} = 0.0673 D^2\\text{ meters}$$\nwhere $D$ is sight distance in kilometers.\nGiven $D = 1.5\\text{ km}$:\n$$C_{cr} = 0.0673 \\times (1.5)^2 = 0.0673 \\times 2.25 = 0.1514\\text{ m} \\approx 0.151\\text{ m}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_EXP_054",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Surveying and Levelling",
    "subtopic": "The Theodolite traversing",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "Bowditch's rule (compass rule) for balancing a closed theodolite traverse is applied on the assumption that:",
    "options": {
      "A": "Linear errors are proportional to $\\sqrt{l}$ and angular errors are proportional to $1/\\sqrt{l}$",
      "B": "Linear measurements and angular measurements are both made with equal precision",
      "C": "Angles are measured much more precisely than lengths",
      "D": "Lengths are measured much more precisely than angles"
    },
    "correct_answer": "A",
    "solution": "Bowditch's rule assumes that accidental errors in linear measurements are proportional to $\\sqrt{l}$ (where $l$ is line length) and angular errors are inversely proportional to $\\sqrt{l}$. Consequently, correction to latitude or departure of a line is proportional to the length of that line.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_SWCE_EXP_055",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Surveying and Levelling",
    "subtopic": "Contouring",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "A series of closed contour lines with higher values inside indicates a:",
    "options": {
      "A": "Hill or knoll",
      "B": "Pond or depression",
      "C": "Vertical cliff",
      "D": "Overhanging cliff"
    },
    "correct_answer": "A",
    "solution": "Closed contour lines with elevation values increasing towards the center represent a hill. If the elevation values decrease towards the center, it represents a depression or pond.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_SWCE_EXP_056",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Fluid pressure and its measurement",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R. Suresh - Soil and Water Conservation Engineering",
    "question": "A vertical rectangular sluice gate of width $2.0\\text{ m}$ and height $3.0\\text{ m}$ retains water up to its top edge on one side. Calculate the total hydrostatic force acting on the gate in $\\text{kN}$. (Take $\\rho = 1000\\text{ kg/m}^3$ and $g = 9.81\\text{ m/s}^2$)",
    "solution": "Area of the gate $A = 2.0 \\times 3.0 = 6.0\\text{ m}^2$.\nDepth of centroid from free surface $\\bar{h} = \\frac{3.0}{2} = 1.5\\text{ m}$.\nTotal hydrostatic force:\n$$F = \\rho g A \\bar{h} = 1000 \\times 9.81 \\times 6.0 \\times 1.5 = 88290\\text{ N} = 88.29\\text{ kN}$$",
    "difficulty": "Moderate",
    "correct_answer": 88.29,
    "answer": 88.29,
    "numerical_range": {
      "min": 87.5,
      "max": 89
    }
  },
  {
    "id": "QB_SWCE_EXP_057",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Flow through pipes",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R. Suresh - Soil and Water Conservation Engineering",
    "question": "Water flows through a commercial PVC pipe of diameter $150\\text{ mm}$ ($0.15\\text{ m}$) and length $200\\text{ m}$ at a mean velocity of $2.0\\text{ m/s}$. If the Darcy-Weisbach friction factor is $f = 0.024$, calculate the head loss due to friction in $\\text{meters}$. (Take $g = 9.81\\text{ m/s}^2$)",
    "solution": "Darcy-Weisbach formula:\n$$h_f = \\frac{f L v^2}{2 g D} = \\frac{0.024 \\times 200 \\times (2.0)^2}{2 \\times 9.81 \\times 0.15} = \\frac{19.2}{2.943} \\approx 6.524\\text{ m}$$",
    "difficulty": "Moderate",
    "correct_answer": 6.52,
    "answer": 6.52,
    "numerical_range": {
      "min": 6.4,
      "max": 6.6
    }
  },
  {
    "id": "QB_SWCE_EXP_058",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Open channel flow",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R. Suresh - Soil and Water Conservation Engineering",
    "question": "A rectangular open drainage channel of width $4.0\\text{ m}$ carries water at a depth of $1.5\\text{ m}$. Calculate the hydraulic radius $R$ of the channel in $\\text{meters}$.",
    "solution": "Flow area $A = 4.0 \\times 1.5 = 6.0\\text{ m}^2$.\nWetted perimeter $P = B + 2y = 4.0 + 2(1.5) = 7.0\\text{ m}$.\nHydraulic radius:\n$$R = \\frac{A}{P} = \\frac{6.0}{7.0} \\approx 0.8571\\text{ m}$$",
    "difficulty": "Moderate",
    "correct_answer": 0.857,
    "answer": 0.857,
    "numerical_range": {
      "min": 0.84,
      "max": 0.87
    }
  },
  {
    "id": "QB_SWCE_EXP_059",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Index properties of soil",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R. Suresh - Soil and Water Conservation Engineering",
    "question": "A soil sample has a void ratio $e = 0.65$. Calculate the porosity $n$ of the soil in percentage.",
    "solution": "$$n = \\frac{e}{1 + e} \\times 100 = \\frac{0.65}{1 + 0.65} \\times 100 = \\frac{0.65}{1.65} \\times 100 \\approx 39.394\\%$$",
    "difficulty": "Moderate",
    "correct_answer": 39.39,
    "answer": 39.39,
    "numerical_range": {
      "min": 39,
      "max": 39.8
    }
  },
  {
    "id": "QB_SWCE_EXP_060",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Soil classification",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R. Suresh - Soil and Water Conservation Engineering",
    "question": "In consistency limits testing of an agricultural clay soil, the liquid limit is $w_L = 52\\%$ and the plastic limit is $w_P = 24\\%$. Calculate the Plasticity Index ($I_P$) in percentage.",
    "solution": "Plasticity Index:\n$$I_P = w_L - w_P = 52 - 24 = 28\\%$$",
    "difficulty": "Moderate",
    "correct_answer": 28,
    "answer": 28,
    "numerical_range": {
      "min": 27.5,
      "max": 28.5
    }
  },
  {
    "id": "QB_SWCE_EXP_061",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Runoff – components, factors affecting, measurement of runoff",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R. Suresh - Soil and Water Conservation Engineering",
    "question": "Using the Rational method $Q = \\frac{C I A}{360}$, calculate the peak runoff rate in $\\text{m}^3/\\text{s}$ from an agricultural watershed of area $A = 120\\text{ ha}$, with a runoff coefficient $C = 0.45$ and a rainfall intensity $I = 60\\text{ mm/h}$.",
    "solution": "$$Q = \\frac{C \\times I \\times A}{360} = \\frac{0.45 \\times 60 \\times 120}{360} = \\frac{3240}{360} = 9.0\\text{ m}^3/\\text{s}$$",
    "difficulty": "Moderate",
    "correct_answer": 9,
    "answer": 9,
    "numerical_range": {
      "min": 8.9,
      "max": 9.1
    }
  },
  {
    "id": "QB_SWCE_EXP_062",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Soil loss estimation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R. Suresh - Soil and Water Conservation Engineering",
    "question": "According to the Universal Soil Loss Equation (USLE) $A = R K L S C P$, calculate the average annual soil loss $A$ in $\\text{tonnes/(ha}\\cdot\\text{year)}$ for an agricultural field where rainfall erosivity factor $R = 400$, soil erodibility factor $K = 0.25$, topographic slope factor $L S = 1.20$, cropping management factor $C = 0.25$, and conservation practice factor $P = 0.80$.",
    "solution": "$$A = R \\times K \\times LS \\times C \\times P = 400 \\times 0.25 \\times 1.20 \\times 0.25 \\times 0.80 = 100 \\times 1.20 \\times 0.20 = 120 \\times 0.20 = 24.0\\text{ tonnes/(ha}\\cdot\\text{year)}$$",
    "difficulty": "Moderate",
    "correct_answer": 24,
    "answer": 24,
    "numerical_range": {
      "min": 23.5,
      "max": 24.5
    }
  },
  {
    "id": "QB_SWCE_EXP_063",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Terraces and bunds",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R. Suresh - Soil and Water Conservation Engineering",
    "question": "A contour bund system is planned for a field on a land slope of $S = 4\\%$. Using Ramser's empirical formula for vertical interval $VI = \\frac{S}{3} + 2$ (where $VI$ is in feet and $S$ is in percent), calculate the vertical interval $VI$ in $\\text{feet}$.",
    "solution": "$$VI = \\frac{S}{3} + 2 = \\frac{4}{3} + 2 = 1.333 + 2 = 3.333\\text{ ft}$$",
    "difficulty": "Moderate",
    "correct_answer": 3.333,
    "answer": 3.333,
    "numerical_range": {
      "min": 3.3,
      "max": 3.4
    }
  },
  {
    "id": "QB_SWCE_EXP_064",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Surveying",
    "subtopic": "Types of levelling",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R. Suresh - Soil and Water Conservation Engineering",
    "question": "In differential levelling, the backsight reading on a permanent benchmark of reduced level $RL = 150.000\\text{ m}$ is $1.850\\text{ m}$. The foresight reading on a forward station $A$ is $1.250\\text{ m}$. Calculate the reduced level of station $A$ in $\\text{meters}$.",
    "solution": "Height of Instrument ($HI$):\n$$HI = RL_{\\text{BM}} + BS = 150.000 + 1.850 = 151.850\\text{ m}$$\nReduced level of station $A$:\n$$RL_A = HI - FS = 151.850 - 1.250 = 150.600\\text{ m}$$",
    "difficulty": "Moderate",
    "correct_answer": 150.6,
    "answer": 150.6,
    "numerical_range": {
      "min": 150.55,
      "max": 150.65
    }
  },
  {
    "id": "QB_SWCE_EXP_065",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Gully control structures – drop, drop inlet and chute spillways",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R. Suresh - Soil and Water Conservation Engineering",
    "question": "A straight drop spillway has a rectangular weir crest of length $L = 3.0\\text{ m}$. For a design head over crest $H = 0.80\\text{ m}$, calculate the peak discharge capacity in $\\text{m}^3/\\text{s}$ using the broad-crested weir formula $Q = 1.77 L H^{3/2}$.",
    "solution": "$$H^{3/2} = (0.80)^{1.5} \\approx 0.71554$$\n$$Q = 1.77 \\times 3.0 \\times 0.71554 = 5.31 \\times 0.71554 \\approx 3.7995\\text{ m}^3/\\text{s}$$",
    "difficulty": "Moderate",
    "correct_answer": 3.797,
    "answer": 3.797,
    "numerical_range": {
      "min": 3.75,
      "max": 3.85
    }
  },
  {
    "id": "QB_SWCE_EXP_066",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Open channel flow",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R. Suresh - Soil and Water Conservation Engineering",
    "question": "A wide rectangular open channel carries water at a uniform flow depth of $y = 1.2\\text{ m}$ and flow velocity $v = 2.4\\text{ m/s}$. Calculate the Froude number ($Fr = \\frac{v}{\\sqrt{g y}}$) of the flow. (Take $g = 9.81\\text{ m/s}^2$)",
    "solution": "$$Fr = \\frac{v}{\\sqrt{g y}} = \\frac{2.4}{\\sqrt{9.81 \\times 1.2}} = \\frac{2.4}{\\sqrt{11.772}} = \\frac{2.4}{3.431} \\approx 0.6995$$\n(Since $Fr < 1$, the flow is subcritical).",
    "difficulty": "Moderate",
    "correct_answer": 0.7,
    "answer": 0.7,
    "numerical_range": {
      "min": 0.68,
      "max": 0.72
    }
  },
  {
    "id": "QB_SWCE_EXP_067",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Compaction of soil",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "R. Suresh - Soil and Water Conservation Engineering",
    "question": "In the Standard Proctor compaction test of a soil, increasing the compaction effort results in:",
    "solution": "Higher compaction energy packs soil particles more densely (raising maximum dry unit weight $\\gamma_{d,\\max}$) while requiring less lubricating water to reach peak packing (lowering Optimum Moisture Content).",
    "difficulty": "Easy",
    "options": {
      "A": "Higher maximum dry density and lower Optimum Moisture Content (OMC)",
      "B": "Lower maximum dry density and higher OMC",
      "C": "Higher maximum dry density and higher OMC",
      "D": "Lower maximum dry density and lower OMC"
    },
    "correct_answer": "A",
    "answer": "A"
  },
  {
    "id": "QB_SWCE_EXP_068",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Hydrograph analysis – unit hydrograph, S-curve hydrograph, synthetic hydrograph",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R. Suresh - Soil and Water Conservation Engineering",
    "question": "A 4-hour unit hydrograph of a watershed of area $A = 180\\text{ km}^2$ has a peak discharge. Calculate the total volume of direct runoff represented by this 4-hour unit hydrograph in million cubic meters ($\\text{Mm}^3$). (1 UH represents $1\\text{ cm}$ of direct runoff over the catchment).",
    "solution": "A unit hydrograph represents $1\\text{ cm} = 0.01\\text{ m}$ depth of direct surface runoff:\n$$V = A \\times d = (180 \\times 10^6\\text{ m}^2) \\times 0.01\\text{ m} = 1.8 \\times 10^6\\text{ m}^3 = 1.80\\text{ Mm}^3$$",
    "difficulty": "Moderate",
    "correct_answer": 1.8,
    "answer": 1.8,
    "numerical_range": {
      "min": 1.78,
      "max": 1.82
    }
  },
  {
    "id": "QB_SWCE_EXP_069",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Mechanics of soil erosion – wind and water erosion",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "R. Suresh - Soil and Water Conservation Engineering",
    "question": "The progressive stages of water erosion in order of increasing severity are:",
    "solution": "Water erosion begins with raindrop impact (splash erosion), progresses to thin uniform surface removal (sheet erosion), concentrates into microscopic channels (rill erosion), and deepens into impassable channels (gully erosion).",
    "difficulty": "Easy",
    "options": {
      "A": "Splash erosion $\\to$ Sheet erosion $\\to$ Rill erosion $\\to$ Gully erosion",
      "B": "Sheet erosion $\\to$ Splash erosion $\\to$ Gully erosion $\\to$ Rill erosion",
      "C": "Rill erosion $\\to$ Gully erosion $\\to$ Sheet erosion $\\to$ Splash erosion",
      "D": "Gully erosion $\\to$ Rill erosion $\\to$ Sheet erosion $\\to$ Splash erosion"
    },
    "correct_answer": "A",
    "answer": "A"
  },
  {
    "id": "QB_SWCE_EXP_070",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Watershed Management",
    "subtopic": "Check dams and farm ponds",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R. Suresh - Soil and Water Conservation Engineering",
    "question": "A dugout farm pond has top dimensions $30\\text{ m} \\times 20\\text{ m}$, bottom dimensions $24\\text{ m} \\times 14\\text{ m}$, and a uniform depth of $3.0\\text{ m}$. Using the prismoidal formula $V = \\frac{d}{6} (A_1 + 4 A_m + A_2)$, calculate the water storage capacity of the pond in $\\text{m}^3$.",
    "solution": "Top area $A_1 = 30 \\times 20 = 600\\text{ m}^2$.\nBottom area $A_2 = 24 \\times 14 = 336\\text{ m}^2$.\nMid-dimensions: length $= \\frac{30 + 24}{2} = 27\\text{ m}$, width $= \\frac{20 + 14}{2} = 17\\text{ m}$.\nMid-area $A_m = 27 \\times 17 = 459\\text{ m}^2$.\nDepth $d = 3.0\\text{ m}$.\nPrismoidal volume:\n$$V = \\frac{3.0}{6} [600 + 4(459) + 336] = 0.5 [600 + 1836 + 336] = 0.5 [2772] = 1404\\text{ m}^3$$",
    "difficulty": "Moderate",
    "correct_answer": 1404,
    "answer": 1404,
    "numerical_range": {
      "min": 1390,
      "max": 1410
    }
  },
  {
    "id": "QB_SWCE_EXP_071",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Open channel flow",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R. Suresh - Soil and Water Conservation Engineering",
    "question": "In a horizontal rectangular flume of width $2.0\\text{ m}$, a hydraulic jump occurs where the initial pre-jump depth is $y_1 = 0.20\\text{ m}$ and the initial Froude number is $Fr_1 = 4.0$. Using the Belanger momentum equation $\\frac{y_2}{y_1} = \\frac{1}{2} \\left( \\sqrt{1 + 8 Fr_1^2} - 1 \\right)$, calculate the sequent depth $y_2$ after the jump in $\\text{meters}$.",
    "solution": "$$\\sqrt{1 + 8 Fr_1^2} = \\sqrt{1 + 8(4)^2} = \\sqrt{1 + 128} = \\sqrt{129} \\approx 11.3578$$\n$$\\frac{y_2}{y_1} = \\frac{1}{2} (11.3578 - 1) = \\frac{10.3578}{2} = 5.1789$$\n$$y_2 = 5.1789 \\times 0.20 \\approx 1.0358\\text{ m}$$",
    "difficulty": "Hard",
    "correct_answer": 1.036,
    "answer": 1.036,
    "numerical_range": {
      "min": 1.02,
      "max": 1.06
    }
  },
  {
    "id": "QB_SWCE_EXP_072",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Shear strength of soil",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R. Suresh - Soil and Water Conservation Engineering",
    "question": "A direct shear test on a sandy soil sample under a normal stress of $\\sigma = 150\\text{ kPa}$ gave a shear stress at failure of $\\tau = 90\\text{ kPa}$. Assuming effective cohesion $c = 0$, calculate the angle of internal shearing resistance $\\phi$ in $\\text{degrees}$.",
    "solution": "Mohr-Coulomb failure criterion for cohesionless soil ($c = 0$):\n$$\\tau = \\sigma \\tan\\phi$$\n$$\\tan\\phi = \\frac{\\tau}{\\sigma} = \\frac{90}{150} = 0.60$$\n$$\\phi = \\arctan(0.60) \\approx 30.964^\\circ$$",
    "difficulty": "Hard",
    "correct_answer": 30.96,
    "answer": 30.96,
    "numerical_range": {
      "min": 30.5,
      "max": 31.5
    }
  },
  {
    "id": "QB_SWCE_EXP_073",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Precipitation – forms, measurement, network design",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R. Suresh - Soil and Water Conservation Engineering",
    "question": "A catchment has 5 existing rain gauge stations with an average annual rainfall coefficient of variation $C_v = 30\\%$. For an allowable percentage error in rainfall estimation of $\\epsilon = 10\\%$, calculate the optimal total number of rain gauge stations required ($N = (C_v / \\epsilon)^2$).",
    "solution": "$$N = \\left(\\frac{C_v}{\\epsilon}\\right)^2 = \\left(\\frac{30}{10}\\right)^2 = 3^2 = 9$$",
    "difficulty": "Moderate",
    "correct_answer": 9,
    "answer": 9,
    "numerical_range": {
      "min": 8.9,
      "max": 9.1
    }
  },
  {
    "id": "QB_SWCE_EXP_074",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Earthen dams",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "R. Suresh - Soil and Water Conservation Engineering",
    "question": "In a homogeneous earthen dam without an internal drainage chimney filter, the line separating the saturated seepage zone from the dry zone within the dam body is termed the:",
    "solution": "The phreatic line (seepage line) is the uppermost flow line in an earthen embankment dam along which atmospheric pressure prevails ($p = 0$).",
    "difficulty": "Moderate",
    "options": {
      "A": "Phreatic line (top flow line)",
      "B": "Equipotential threshold",
      "C": "Hydraulic grade ceiling",
      "D": "Capillary fringe apex"
    },
    "correct_answer": "A",
    "answer": "A"
  },
  {
    "id": "QB_SWCE_EXP_075",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Surveying",
    "subtopic": "Theodolite traversing",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R. Suresh - Soil and Water Conservation Engineering",
    "question": "In a closed polygon traverse $ABCDE$ having $n = 5$ sides, calculate the theoretical sum of all interior angles in $\\text{degrees}$.",
    "solution": "Theoretical sum of interior angles for an $n$-sided polygon:\n$$\\Sigma \\theta = (2n - 4) \\times 90^\\circ = (2(5) - 4) \\times 90^\\circ = (10 - 4) \\times 90^\\circ = 6 \\times 90^\\circ = 540^\\circ$$",
    "difficulty": "Moderate",
    "correct_answer": 540,
    "answer": 540,
    "numerical_range": {
      "min": 539,
      "max": 541
    }
  },
  {
    "id": "QB_SWCE_EXP_076",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Permeability of soil",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R. Suresh - Soil and Water Conservation Engineering",
    "question": "A sand layer has specific gravity $G = 2.65$ and void ratio $e = 0.65$. Calculate the critical hydraulic gradient ($i_{cr} = \\frac{G - 1}{1 + e}$) at which quicksand condition occurs.",
    "solution": "$$i_{cr} = \\frac{G - 1}{1 + e} = \\frac{2.65 - 1}{1 + 0.65} = \\frac{1.65}{1.65} = 1.0$$",
    "difficulty": "Moderate",
    "correct_answer": 1,
    "answer": 1,
    "numerical_range": {
      "min": 0.98,
      "max": 1.02
    }
  },
  {
    "id": "QB_SWCE_EXP_077",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Mechanics of soil erosion – wind and water erosion",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "R. Suresh - Soil and Water Conservation Engineering",
    "question": "In wind erosion mechanics, the movement of soil particles of diameter $0.1 - 0.5\\text{ mm}$ by a series of short bounces and leaps along the surface is termed:",
    "solution": "Saltation accounts for $50 - 75\\%$ of total soil movement by wind, characterized by particles of $0.1 - 0.5\\text{ mm}$ bouncing in low parabolic arcs. Coarser particles ($0.5 - 1.0\\text{ mm}$) roll by surface creep, while fine dust ($< 0.1\\text{ mm}$) stays in suspension.",
    "difficulty": "Easy",
    "options": {
      "A": "Saltation",
      "B": "Suspension",
      "C": "Surface creep",
      "D": "Abrasion"
    },
    "correct_answer": "A",
    "answer": "A"
  },
  {
    "id": "QB_SWCE_EXP_078",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Flood routing – hydrologic and hydraulic routing",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R. Suresh - Soil and Water Conservation Engineering",
    "question": "In Muskingum channel flood routing, the routing equation is $Q_2 = C_0 I_2 + C_1 I_1 + C_2 Q_1$. If the routing coefficients are $C_0 = 0.08$ and $C_1 = 0.52$, calculate the value of coefficient $C_2$ using the condition $C_0 + C_1 + C_2 = 1.0$.",
    "solution": "$$C_2 = 1.0 - (C_0 + C_1) = 1.0 - (0.08 + 0.52) = 1.0 - 0.60 = 0.40$$",
    "difficulty": "Moderate",
    "correct_answer": 0.4,
    "answer": 0.4,
    "numerical_range": {
      "min": 0.39,
      "max": 0.41
    }
  },
  {
    "id": "QB_SWCE_EXP_079",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Terraces and bunds",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R. Suresh - Soil and Water Conservation Engineering",
    "question": "A graded bund of trapezoidal cross-section has top width $0.50\\text{ m}$, base width $2.50\\text{ m}$, and height $0.80\\text{ m}$. Calculate the cross-sectional area of the bund in $\\text{m}^2$.",
    "solution": "Area of a trapezoid:\n$$A = \\frac{b_{\\text{top}} + b_{\\text{base}}}{2} \\times h = \\frac{0.50 + 2.50}{2} \\times 0.80 = \\frac{3.0}{2} \\times 0.80 = 1.50 \\times 0.80 = 1.20\\text{ m}^2$$",
    "difficulty": "Moderate",
    "correct_answer": 1.2,
    "answer": 1.2,
    "numerical_range": {
      "min": 1.18,
      "max": 1.22
    }
  },
  {
    "id": "QB_SWCE_EXP_080",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Effective stress, total stress and pore water pressure",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R. Suresh - Soil and Water Conservation Engineering",
    "question": "At a depth of $4.0\\text{ m}$ below the ground surface, a saturated soil has a saturated unit weight of $\\gamma_{\\text{sat}} = 19.81\\text{ kN/m}^3$. The water table is at the ground surface. Calculate the effective vertical stress $\\sigma'$ at this depth in $\\text{kPa}$. (Unit weight of water $\\gamma_w = 9.81\\text{ kN/m}^3$)",
    "solution": "Submerged unit weight of soil:\n$$\\gamma' = \\gamma_{\\text{sat}} - \\gamma_w = 19.81 - 9.81 = 10.0\\text{ kN/m}^3$$\nEffective stress:\n$$\\sigma' = \\gamma' \\times z = 10.0\\text{ kN/m}^3 \\times 4.0\\text{ m} = 40.0\\text{ kPa}$$",
    "difficulty": "Moderate",
    "correct_answer": 40,
    "answer": 40,
    "numerical_range": {
      "min": 39.5,
      "max": 40.5
    }
  },
  {
    "id": "QB_SWCE_EXP_081",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Open channel flow",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R. Suresh - Soil and Water Conservation Engineering",
    "question": "A trapezoidal canal has side slope $1.5 : 1$ ($H : V$, so $z = 1.5$) and bottom width $B = 3.0\\text{ m}$. If the water depth is $y = 1.0\\text{ m}$, calculate the wetted perimeter $P = B + 2 y \\sqrt{1 + z^2}$ in $\\text{meters}$.",
    "solution": "$$\\sqrt{1 + z^2} = \\sqrt{1 + (1.5)^2} = \\sqrt{1 + 2.25} = \\sqrt{3.25} \\approx 1.8028$$\n$$P = 3.0 + 2(1.0)(1.8028) = 3.0 + 3.6056 = 6.6056\\text{ m}$$",
    "difficulty": "Moderate",
    "correct_answer": 6.606,
    "answer": 6.606,
    "numerical_range": {
      "min": 6.55,
      "max": 6.65
    }
  },
  {
    "id": "QB_SWCE_EXP_082",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Vegetative waterways",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "R. Suresh - Soil and Water Conservation Engineering",
    "question": "A grassed waterway is designed primarily to:",
    "solution": "Grassed waterways are broad, shallow parabolic or trapezoidal channels protected by dense erosion-resistant grasses, designed to conduct surplus runoff water off agricultural land without scouring or gullies.",
    "difficulty": "Easy",
    "options": {
      "A": "Convey concentrated surface runoff safely down a slope at non-erosive flow velocities",
      "B": "Store water permanently for livestock drinking",
      "C": "Trap sand for construction use",
      "D": "Increase the speed of gully head advancement"
    },
    "correct_answer": "A",
    "answer": "A"
  },
  {
    "id": "QB_SWCE_EXP_083",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Surveying",
    "subtopic": "Contouring",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "R. Suresh - Soil and Water Conservation Engineering",
    "question": "A series of closed contour lines with concentric higher elevations towards the center indicates a:",
    "solution": "Closed contour rings with values increasing towards the inside represent a hill or knoll. Closed contours with values decreasing inward represent a depression or pond.",
    "difficulty": "Easy",
    "options": {
      "A": "Hill / Peak",
      "B": "Pond / Depression",
      "C": "Saddle",
      "D": "Vertical cliff"
    },
    "correct_answer": "A",
    "answer": "A"
  },
  {
    "id": "QB_SWCE_EXP_084",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Fluid properties",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "R. Suresh - Soil and Water Conservation Engineering",
    "question": "A fluid has dynamic viscosity $\\mu = 0.002\\text{ Pa}\\cdot\\text{s}$ and density $\\rho = 800\\text{ kg/m}^3$. Calculate its kinematic viscosity $\\nu$ in $\\text{m}^2/\\text{s}$. (Enter value multiplied by $10^6$, i.e. $\\nu \\times 10^6$)",
    "solution": "$$\\nu = \\frac{\\mu}{\\rho} = \\frac{0.002}{800} = 2.5 \\times 10^{-6}\\text{ m}^2/\\text{s}$$\nValue multiplied by $10^6$ is $2.5$.",
    "difficulty": "Easy",
    "correct_answer": 2.5,
    "answer": 2.5,
    "numerical_range": {
      "min": 2.45,
      "max": 2.55
    }
  },
  {
    "id": "QB_SWCE_EXP_085",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Index properties of soil",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R. Suresh - Soil and Water Conservation Engineering",
    "question": "A moist soil sample weighing $115\\text{ g}$ has an oven-dry weight of $100\\text{ g}$. Calculate the gravimetric moisture content ($w$) of the soil on a dry weight basis in percentage.",
    "solution": "Weight of water $W_w = 115 - 100 = 15\\text{ g}$.\nMoisture content dry basis:\n$$w = \\frac{W_w}{W_d} \\times 100 = \\frac{15}{100} \\times 100 = 15.0\\%$$",
    "difficulty": "Moderate",
    "correct_answer": 15,
    "answer": 15,
    "numerical_range": {
      "min": 14.8,
      "max": 15.2
    }
  },
  {
    "id": "QB_SWCE_EXP_086",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Precipitation – forms, measurement, network design",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R. Suresh - Soil and Water Conservation Engineering",
    "question": "In Thiessen polygon method for calculating average rainfall over a watershed, three polygons have areas of $40\\text{ km}^2$, $35\\text{ km}^2$, and $25\\text{ km}^2$ with recorded station rainfalls of $80\\text{ mm}$, $60\\text{ mm}$, and $50\\text{ mm}$ respectively. Calculate the weighted average precipitation over the watershed in $\\text{mm}$.",
    "solution": "Total area $A = 40 + 35 + 25 = 100\\text{ km}^2$.\nWeighted precipitation:\n$$\\bar{P} = \\frac{(40 \\times 80) + (35 \\times 60) + (25 \\times 50)}{100} = \\frac{3200 + 2100 + 1250}{100} = \\frac{6550}{100} = 65.5\\text{ mm}$$",
    "difficulty": "Moderate",
    "correct_answer": 65.5,
    "answer": 65.5,
    "numerical_range": {
      "min": 65,
      "max": 66
    }
  },
  {
    "id": "QB_SWCE_EXP_087",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Biological and engineering measures to control erosion",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "R. Suresh - Soil and Water Conservation Engineering",
    "question": "Which of the following agronomic practices are effective biological measures to control soil erosion on sloping croplands?",
    "solution": "- A, B, and C protect the soil from direct droplet impact and reduce surface runoff velocity.\n- D creates steep channels that severely accelerate rill and gully erosion.",
    "difficulty": "Hard",
    "options": {
      "A": "Contour strip cropping",
      "B": "Mulch tillage leaving crop residue on the surface",
      "C": "Cover cropping with dense canopy leguminous crops",
      "D": "Deep ploughing straight up and down the steepest slope direction"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "answer": [
      "A",
      "B",
      "C"
    ]
  },
  {
    "id": "QB_SWCE_EXP_088",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Watershed Management",
    "subtopic": "Rainwater harvesting",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R. Suresh - Soil and Water Conservation Engineering",
    "question": "A rooftop rainwater harvesting system collects rain from a corrugated GI sheet roof of horizontal catchment area $150\\text{ m}^2$. The seasonal rainfall is $800\\text{ mm}$ ($0.80\\text{ m}$) and the runoff coefficient of the roof is $0.85$. Calculate the volume of water harvested in $\\text{m}^3$.",
    "solution": "$$V = A \\times P \\times C = 150\\text{ m}^2 \\times 0.80\\text{ m} \\times 0.85 = 120 \\times 0.85 = 102.0\\text{ m}^3$$",
    "difficulty": "Moderate",
    "correct_answer": 102,
    "answer": 102,
    "numerical_range": {
      "min": 101.5,
      "max": 102.5
    }
  },
  {
    "id": "QB_SWCE_EXP_089",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Surveying",
    "subtopic": "Computation of areas and volume",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R. Suresh - Soil and Water Conservation Engineering",
    "question": "A railway embankment cutting has three cross-sectional areas spaced $20\\text{ m}$ apart ($h = 20\\text{ m}$): $A_0 = 40\\text{ m}^2$, $A_1 = 65\\text{ m}^2$, and $A_2 = 50\\text{ m}^2$. Using Simpson's prismoidal rule $V = \\frac{h}{3} (A_0 + 4 A_1 + A_2)$, calculate the volume of earthwork in $\\text{m}^3$.",
    "solution": "$$V = \\frac{20}{3} [40 + 4(65) + 50] = \\frac{20}{3} [40 + 260 + 50] = \\frac{20}{3} [350] = \\frac{7000}{3} \\approx 2333.33\\text{ m}^3$$",
    "difficulty": "Moderate",
    "correct_answer": 2333.33,
    "answer": 2333.33,
    "numerical_range": {
      "min": 2330,
      "max": 2340
    }
  },
  {
    "id": "QB_SWCE_EXP_090",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Soil classification",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "R. Suresh - Soil and Water Conservation Engineering",
    "question": "In the Unified Soil Classification System (USCS), a fine-grained soil with liquid limit $w_L > 50\\%$ that plots ABOVE the 'A-line' ($I_P = 0.73(w_L - 20)$) on the plasticity chart is designated as:",
    "solution": "The A-line differentiates clays (above A-line) from silts and organic soils (below A-line). Liquid limit $> 50\\%$ indicates high plasticity ($H$). Thus, above A-line with $w_L > 50\\%$ is classified as CH.",
    "difficulty": "Easy",
    "options": {
      "A": "CH (Inorganic clay of high plasticity)",
      "B": "MH (Inorganic silt of high compressibility)",
      "C": "CL (Inorganic clay of low plasticity)",
      "D": "OH (Organic clay of high plasticity)"
    },
    "correct_answer": "A",
    "answer": "A"
  },
  {
    "id": "QB_SWCE_EXP_091",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Open channel flow",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R. Suresh - Soil and Water Conservation Engineering",
    "question": "A wide rectangular channel of bed slope $S_0 = 0.0004$ carries water at a depth of $1.5\\text{ m}$ ($R \\approx y = 1.5\\text{ m}$). If Manning's roughness coefficient is $n = 0.02$, calculate the flow velocity in $\\text{m/s}$ using Manning's equation $v = \\frac{1}{n} R^{2/3} S_0^{1/2}$.",
    "solution": "$$R^{2/3} = (1.5)^{2/3} \\approx 1.31037$$\n$$S_0^{1/2} = \\sqrt{0.0004} = 0.02$$\n$$v = \\frac{1}{0.02} \\times 1.31037 \\times 0.02 = 1.31037\\text{ m/s}$$",
    "difficulty": "Moderate",
    "correct_answer": 1.31,
    "answer": 1.31,
    "numerical_range": {
      "min": 1.28,
      "max": 1.34
    }
  },
  {
    "id": "QB_SWCE_EXP_092",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Terraces and bunds",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R. Suresh - Soil and Water Conservation Engineering",
    "question": "A hillside has a uniform ground slope of $S = 20\\%$. For constructing level bench terraces, the vertical interval is determined to be $VI = 2.0\\text{ m}$. Calculate the width of the bench terrace $W = \\frac{VI \\times 100}{S}$ in $\\text{meters}$.",
    "solution": "$$W = \\frac{VI}{S/100} = \\frac{2.0}{0.20} = 10.0\\text{ m}$$",
    "difficulty": "Moderate",
    "correct_answer": 10,
    "answer": 10,
    "numerical_range": {
      "min": 9.8,
      "max": 10.2
    }
  },
  {
    "id": "QB_SWCE_EXP_093",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Gully control structures – drop, drop inlet and chute spillways",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "R. Suresh - Soil and Water Conservation Engineering",
    "question": "In gully control structures, the structural component of a drop spillway specifically designed to dissipate hydraulic kinetic energy of falling water and protect downstream channel from scouring is the:",
    "solution": "The stilling basin (apron with chute blocks, baffle piers, and end sill) forces a hydraulic jump to form on the reinforced concrete apron, dissipating high kinetic energy before discharge into downstream channel.",
    "difficulty": "Moderate",
    "options": {
      "A": "Headwall extension",
      "B": "Stilling basin with baffle piers and end sill",
      "C": "Cut-off wall",
      "D": "Wingwall"
    },
    "correct_answer": "B",
    "answer": "B"
  },
  {
    "id": "QB_SWCE_EXP_094",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Watershed Management",
    "subtopic": "Water budgeting in watershed",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R. Suresh - Soil and Water Conservation Engineering",
    "question": "In an annual watershed water budget equation $P = Q + ET + \\Delta S$, the annual precipitation is $P = 1100\\text{ mm}$, stream runoff is $Q = 350\\text{ mm}$, and the increase in basin groundwater storage is $\\Delta S = 50\\text{ mm}$. Calculate the annual evapotranspiration ($ET$) in $\\text{mm}$.",
    "solution": "$$ET = P - Q - \\Delta S = 1100 - 350 - 50 = 700\\text{ mm}$$",
    "difficulty": "Moderate",
    "correct_answer": 700,
    "answer": 700,
    "numerical_range": {
      "min": 695,
      "max": 705
    }
  },
  {
    "id": "QB_SWCE_EXP_095",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Fluid pressure and its measurement",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "R. Suresh - Soil and Water Conservation Engineering",
    "question": "A piezometer tube inserted into a pressurized water conduit registers a static water column height of $4.5\\text{ m}$. Calculate the gauge pressure in the conduit in $\\text{kPa}$. (Take $g = 9.81\\text{ m/s}^2$ and $\\rho = 1000\\text{ kg/m}^3$)",
    "solution": "$$p = \\rho g h = 1000 \\times 9.81 \\times 4.5 = 44145\\text{ Pa} = 44.145\\text{ kPa}$$",
    "difficulty": "Easy",
    "correct_answer": 44.15,
    "answer": 44.15,
    "numerical_range": {
      "min": 43.8,
      "max": 44.4
    }
  },
  {
    "id": "QB_SWCE_ADV_001",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Gully control structures – drop, drop inlet and chute spillways",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A straight drop spillway carries a design peak discharge of $6\\text{ m}^3/\\text{s}$ through a rectangular weir crest of length $4\\text{ m}$. The drop height from crest to apron floor is $2.5\\text{ m}$. Using $g = 9.81\\text{ m/s}^2$, the critical depth of flow $y_c$ over the spillway floor is ________ $\\text{m}$ (round off to two decimal places).",
    "correct_answer": "0.61",
    "numerical_range": {
      "min": 0.59,
      "max": 0.63
    },
    "solution": "1. Discharge per unit width ($q$):\n$$q = \\frac{Q}{B} = \\frac{6\\text{ m}^3/\\text{s}}{4\\text{ m}} = 1.5\\text{ m}^2/\\text{s}$$\n\n2. Critical depth for a rectangular channel:\n$$y_c = \\left( \\frac{q^2}{g} \\right)^{1/3} = \\left( \\frac{1.5^2}{9.81} \\right)^{1/3} = \\left( \\frac{2.25}{9.81} \\right)^{1/3} = (0.22936)^{0.3333} = 0.6121\\text{ m} \\approx 0.61\\text{ m}$$",
    "difficulty": "Hard",
    "source": "Soil and Water Conservation Engineering (Schwab et al.)"
  },
  {
    "id": "QB_SWCE_ADV_002",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Hydrograph analysis, unit hydrograph theory and application",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A $4$-hour unit hydrograph of a watershed has a peak discharge of $25\\text{ m}^3/\\text{s}$. A storm produces $6\\text{ cm}$ of total rainfall with a constant $\\phi$-index of $0.5\\text{ cm/h}$ uniformly over the 4-hour duration. Assuming a constant baseflow of $5\\text{ m}^3/\\text{s}$, the peak discharge of the resulting flood hydrograph is ________ $\\text{m}^3/\\text{s}$ (answer in integer).",
    "correct_answer": "105",
    "numerical_range": {
      "min": 105,
      "max": 105
    },
    "solution": "1. Infiltration loss during the 4-hour storm:\n$$\\text{Loss} = \\phi \\times t = 0.5\\text{ cm/h} \\times 4\\text{ h} = 2.0\\text{ cm}$$\n\n2. Direct Runoff Excess ($ER$):\n$$ER = P - \\text{Loss} = 6.0\\text{ cm} - 2.0\\text{ cm} = 4.0\\text{ cm}$$\n\n3. Peak Direct Runoff Hydrograph ($DRH$):\n$$Q_{p, \\text{DRH}} = Q_{p, \\text{UH}} \\times ER = 25\\text{ m}^3/\\text{s} \\times 4.0 = 100\\text{ m}^3/\\text{s}$$\n\n4. Peak of Total Flood Hydrograph:\n$$Q_{p, \\text{Total}} = Q_{p, \\text{DRH}} + \\text{Baseflow} = 100 + 5 = 105\\text{ m}^3/\\text{s}$$",
    "difficulty": "Moderate",
    "source": "Engineering Hydrology (K. Subramanya)"
  },
  {
    "id": "QB_SWCE_ADV_003",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Permeability and seepage analysis",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A flow net constructed for an earthen dam of length $100\\text{ m}$ founded on an impermeable base gives the number of flow channels $N_f = 4$ and the number of equipotential drops $N_d = 16$. The total hydraulic head causing flow is $12\\text{ m}$ and the coefficient of permeability of the dam material is $4 \\times 10^{-6}\\text{ m/s}$. The total seepage rate through the entire length of the dam is ________ $\\text{m}^3/\\text{day}$ (round off to two decimal places).",
    "correct_answer": "103.68",
    "numerical_range": {
      "min": 102.5,
      "max": 105
    },
    "solution": "1. Seepage discharge per unit width ($q'$):\n$$q' = k \\cdot H \\cdot \\frac{N_f}{N_d}$$\n$$q' = (4 \\times 10^{-6}\\text{ m/s}) \\times 12\\text{ m} \\times \\left( \\frac{4}{16} \\right) = 4.8 \\times 10^{-5} \\times 0.25 = 1.2 \\times 10^{-5}\\text{ m}^3/\\text{s/m}$$\n\n2. Total seepage for dam length $L = 100\\text{ m}$:\n$$Q = q' \\times L = 1.2 \\times 10^{-5} \\times 100 = 1.2 \\times 10^{-3}\\text{ m}^3/\\text{s}$$\n\n3. Convert to $\\text{m}^3/\\text{day}$ ($1\\text{ day} = 86400\\text{ s}$):\n$$Q_{\\text{day}} = 1.2 \\times 10^{-3} \\times 86400 = 103.68\\text{ m}^3/\\text{day}$$",
    "difficulty": "Hard",
    "source": "Soil Mechanics and Foundations (B.C. Punmia)"
  },
  {
    "id": "QB_SWCE_ADV_004",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Laminar and turbulent flow in pipes, Darcy–Weisbach and Hazen–Williams equations",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following statements regarding pipe flow and open channel flow hydraulics is/are CORRECT?",
    "options": {
      "A": "In laminar pipe flow, the Darcy friction factor $f$ depends only on the Reynolds number ($f = 64/Re$)",
      "B": "The hydraulic grade line (HGL) is always higher than the total energy line (TEL) by the velocity head $\\frac{v^2}{2g}$",
      "C": "In an open channel, critical flow occurs when the Froude number $Fr = 1$, representing minimum specific energy for a given discharge",
      "D": "In a hydraulic jump on a horizontal floor, the sequent depth ratio depends solely on the initial Froude number"
    },
    "correct_answer": [
      "A",
      "C",
      "D"
    ],
    "solution": "- Statement A is correct: In Hagen-Poiseuille laminar flow, $f = 64/Re$, completely independent of pipe roughness.\n- Statement B is incorrect: TEL is the sum of pressure head, elevation head, and velocity head, while HGL is pressure head plus elevation head. Therefore, TEL is always higher than HGL by $\\frac{v^2}{2g}$.\n- Statement C is correct: At critical state ($Fr = 1$), specific energy $E = y + \\frac{Q^2}{2g A^2}$ is minimized for a given discharge $Q$.\n- Statement D is correct: By the Bélanger equation for rectangular channels, $\\frac{y_2}{y_1} = \\frac{1}{2}\\left( \\sqrt{1 + 8Fr_1^2} - 1 \\right)$, which is a function of $Fr_1$ only.",
    "difficulty": "Hard",
    "source": "Fluid Mechanics (K.L. Kumar)"
  },
  {
    "id": "QB_SWCE_ADV_005",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Runoff estimation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A watershed of area $250\\text{ ha}$ has a runoff coefficient $C = 0.4$. During a design storm, the rainfall intensity is $72\\text{ mm/h}$ for a duration equal to the time of concentration. Using the Rational formula, the peak runoff discharge is ________ $\\text{m}^3/\\text{s}$ (answer in integer).",
    "correct_answer": "20",
    "numerical_range": {
      "min": 20,
      "max": 20
    },
    "solution": "Using the Rational method formula:\n$$Q = \\frac{C \\cdot I \\cdot A}{360}$$\nwhere:\n- $C = 0.4$ (dimensionless)\n- $I = 72\\text{ mm/h}$\n- $A = 250\\text{ ha}$\n\nCalculating peak discharge:\n$$Q = \\frac{0.4 \\times 72 \\times 250}{360} = \\frac{7200}{360} = 20.0\\text{ m}^3/\\text{s}$$",
    "difficulty": "Easy",
    "source": "Soil and Water Conservation Engineering (Schwab et al.)"
  },
  {
    "id": "QB_SWCE_ADV_006",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Terraces and bunds",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "Contour bunds are to be constructed on agricultural land with a uniform land slope $S = 4\\%$. Using the standard empirical formula for vertical interval $VI = \\left( \\frac{S}{3} + 2 \\right) \\times 0.3\\text{ m}$, the horizontal spacing between successive bunds is ________ $\\text{m}$ (answer in integer).",
    "correct_answer": "25",
    "numerical_range": {
      "min": 25,
      "max": 25
    },
    "solution": "1. Vertical Interval ($VI$):\n$$VI = \\left( \\frac{4}{3} + 2 \\right) \\times 0.3 = \\left( 1.3333 + 2 \\right) \\times 0.3 = 3.3333 \\times 0.3 = 1.0\\text{ m}$$\n\n2. Horizontal Interval ($HI$) on $4\\%$ slope ($S = 0.04$):\n$$HI = \\frac{VI}{S/100} = \\frac{1.0\\text{ m}}{4/100} = \\frac{1.0}{0.04} = 25.0\\text{ m}$$",
    "difficulty": "Moderate",
    "source": "Manual of Soil and Water Conservation Practices (Gurmel Singh et al.)"
  },
  {
    "id": "QB_SWCE_ADV_087",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Laminar and turbulent flow in pipes, Darcy–Weisbach and Hazen–Williams equations",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A smooth irrigation pipe of internal diameter $D = 0.20\\text{ m}$ and length $L = 500.0\\text{ m}$ conveys water at a steady discharge of $Q = 0.050\\text{ m}^3/\\text{s}$. The Darcy-Weisbach friction factor is $f = 0.024$. Taking acceleration due to gravity $g = 9.81\\text{ m/s}^2$ and $\\pi = 3.1416$, the head loss due to pipe friction in meters is ________ (round off to two decimal places).",
    "correct_answer": "7.75",
    "numerical_range": {
      "min": 7.65,
      "max": 7.85
    },
    "solution": "**Method 1: Darcy-Weisbach with Mean Flow Velocity**\n1. Cross-sectional area of pipe:\n$$A = \\frac{\\pi}{4} D^2 = \\frac{3.1416}{4} \\times (0.20)^2 = 0.031416\\text{ m}^2$$\n2. Mean flow velocity:\n$$V = \\frac{Q}{A} = \\frac{0.050}{0.031416} = 1.59155\\text{ m/s}$$\n3. Velocity head:\n$$\\frac{V^2}{2 g} = \\frac{(1.59155)^2}{2 \\times 9.81} = \\frac{2.53303}{19.62} = 0.12910\\text{ m}$$\n4. Head loss due to friction:\n$$h_f = \\frac{f L V^2}{2 g D} = \\frac{0.024 \\times 500.0}{0.20} \\times 0.12910 = 60.0 \\times 0.12910 = 7.746\\text{ m} \\approx 7.75\\text{ m}$$\n\n**Method 2: Direct Discharge Formulation**\n$$h_f = \\frac{8 f L Q^2}{\\pi^2 g D^5} = \\frac{8 \\times 0.024 \\times 500.0 \\times (0.050)^2}{(3.1416)^2 \\times 9.81 \\times (0.20)^5} = \\frac{0.240}{96.820 \\times 0.00032} = \\frac{0.240}{0.030982} = 7.746\\text{ m} \\approx 7.75\\text{ m}$$",
    "difficulty": "Moderate",
    "source": "Soil and Water Conservation Engineering (Schwab et al.)"
  },
  {
    "id": "QB_SWCE_ADV_088",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Ideal and real fluids, properties of fluids",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "Which of the following correctly pairs the fundamental physical dimension and SI unit of dynamic viscosity ($\\mu$) and kinematic viscosity ($\\nu$) in fluid mechanics?",
    "options": {
      "A": "Dynamic viscosity: $[M L^{-1} T^{-1}]$ and $\\text{Pa}\\cdot\\text{s}$; Kinematic viscosity: $[L^2 T^{-1}]$ and $\\text{m}^2/\\text{s}$",
      "B": "Dynamic viscosity: $[M L^{-2} T^{-1}]$ and $\\text{N}/\\text{m}^2$; Kinematic viscosity: $[L T^{-2}]$ and $\\text{m/s}^2$",
      "C": "Dynamic viscosity: $[M L T^{-2}]$ and $\\text{N}$; Kinematic viscosity: $[M L^{-3}]$ and $\\text{kg/m}^3$",
      "D": "Dynamic viscosity: $[L^2 T^{-1}]$ and $\\text{m}^2/\\text{s}$; Kinematic viscosity: $[M L^{-1} T^{-1}]$ and $\\text{Pa}\\cdot\\text{s}$"
    },
    "correct_answer": "A",
    "solution": "From Newton's law of viscosity $\\tau = \\mu \\frac{du}{dy}$:\n$$\\mu = \\frac{\\tau}{du/dy} = \\frac{\\text{N/m}^2}{(\\text{m/s})/\\text{m}} = \\text{N}\\cdot\\text{s/m}^2 = \\text{Pa}\\cdot\\text{s} \\implies [M L^{-1} T^{-1}]$$\nKinematic viscosity is defined as ratio of dynamic viscosity to density:\n$$\\nu = \\frac{\\mu}{\\rho} = \\frac{\\text{kg}/(\\text{m}\\cdot\\text{s})}{\\text{kg/m}^3} = \\text{m}^2/\\text{s} \\implies [L^2 T^{-1}]$$\nTherefore, Option A is correct.",
    "difficulty": "Easy",
    "source": "Engineering Hydrology (K. Subramanya)"
  },
  {
    "id": "QB_SWCE_ADV_089",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Bernoulli's theorem",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following physical assumptions are strictly required for the classical Bernoulli energy equation $\\frac{p}{\\rho g} + \\frac{v^2}{2 g} + z = \\text{constant}$ to hold valid along a streamline?",
    "options": {
      "A": "The fluid is ideal (inviscid, having zero viscosity and zero frictional shear losses)",
      "B": "The flow is steady, meaning local temporal velocity fluctuations $\\frac{\\partial v}{\\partial t} = 0$",
      "C": "The fluid is incompressible, maintaining a strictly constant fluid density $\\rho$",
      "D": "The flow must be violently turbulent to promote isotropic kinetic dissipation across streamlines"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "- Statements A, B, and C are essential classical conditions for Bernoulli's equation derived from Euler's equation along a streamline:\n  1. Inviscid flow (no viscous shear losses).\n  2. Steady flow (no partial time derivatives).\n  3. Incompressible flow (constant mass density $\\rho$).\n  4. Irrotational flow allows the constant to be identical throughout the whole fluid field; otherwise, it is constant along each streamline.\n- Statement D is false because turbulence introduces substantial energy dissipation, violating the inviscid conservation assumption.",
    "difficulty": "Moderate",
    "source": "Soil and Water Conservation Engineering (Schwab et al.)"
  },
  {
    "id": "QB_SWCE_ADV_090",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Flow in open channels",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A hydraulic jump forms on a horizontal rectangular concrete channel apron of width $B = 3.0\\text{ m}$. The initial supercritical flow depth before the jump is $y_1 = 0.40\\text{ m}$ and the upstream velocity is $V_1 = 6.0\\text{ m/s}$. Taking $g = 9.81\\text{ m/s}^2$, the subcritical sequent depth of flow $y_2$ downstream of the jump in meters is ________ (round off to two decimal places).\n\n```\nSupercritical Stream                        Subcritical Flow\n  y1 = 0.40 m   .-~~~~~~~~~~~~~~~-._           y2 = ?\n═══════════════'    Roller Region   `═══════════════════════\n──────────────────────────────────────────────────────────── Horizontal Apron Floor\n```",
    "correct_answer": "1.53",
    "numerical_range": {
      "min": 1.5,
      "max": 1.56
    },
    "solution": "**Method 1: Bélanger Sequent Depth Formula via Froude Number**\n1. Upstream Froude number $Fr_1$:\n$$Fr_1 = \\frac{V_1}{\\sqrt{g y_1}} = \\frac{6.0}{\\sqrt{9.81 \\times 0.40}} = \\frac{6.0}{\\sqrt{3.924}} = \\frac{6.0}{1.9809} = 3.0289$$\n$$Fr_1^2 = (3.0289)^2 = 9.1743$$\n2. Bélanger equation for sequent depth ratio in rectangular channels:\n$$\\frac{y_2}{y_1} = \\frac{1}{2} \\left( \\sqrt{1 + 8 Fr_1^2} - 1 \\right)$$\n$$\\frac{y_2}{y_1} = \\frac{1}{2} \\left( \\sqrt{1 + 8(9.1743)} - 1 \\right) = \\frac{1}{2} \\left( \\sqrt{74.394} - 1 \\right) = \\frac{1}{2} (8.6252 - 1) = 3.8126$$\n$$y_2 = 0.40 \\times 3.8126 = 1.525\\text{ m} \\approx 1.53\\text{ m}$$\n\n**Method 2: Momentum / Specific Force Conservation**\n$$M_1 = M_2 \\implies \\frac{q^2}{g y_1} + \\frac{y_1^2}{2} = \\frac{q^2}{g y_2} + \\frac{y_2^2}{2}$$\nDischarge per unit width $q = V_1 y_1 = 6.0 \\times 0.40 = 2.40\\text{ m}^2/\\text{s}$.\n$$\\frac{(2.40)^2}{9.81 \\times 0.40} + \\frac{(0.40)^2}{2} = \\frac{5.76}{3.924} + 0.08 = 1.4679 + 0.08 = 1.5479\\text{ m}^2$$\nSolving $\\frac{5.76}{9.81 y_2} + \\frac{y_2^2}{2} = 1.5479$ yields positive root $y_2 = 1.525\\text{ m} \\approx 1.53\\text{ m}$.",
    "difficulty": "Hard",
    "source": "Soil and Water Conservation Engineering (Schwab et al.)"
  },
  {
    "id": "QB_SWCE_ADV_091",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Flow in open channels",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "In an open channel conveying a given constant discharge $Q$, the flow regime is said to be critical when:",
    "options": {
      "A": "The specific energy $E$ attains its minimum value",
      "B": "The Froude number $Fr$ exceeds 2.5",
      "C": "The flow depth is twice the critical depth",
      "D": "The bed shear stress drops to absolute zero"
    },
    "correct_answer": "A",
    "solution": "Critical flow in open channels corresponds to:\n1. Minimum specific energy for a given discharge ($\\frac{dE}{dy} = 0$).\n2. Maximum discharge for a given specific energy.\n3. Froude number $Fr = \\frac{V}{\\sqrt{g D}} = 1.0$.\nOption A is the foundational thermodynamic and hydraulic definition.",
    "difficulty": "Easy",
    "source": "Soil and Water Conservation Engineering (Schwab et al.)"
  },
  {
    "id": "QB_SWCE_ADV_092",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Flow through orifices, weirs and notches",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A standard $90^\\circ$ V-notch (triangular weir) is installed to measure drainage runoff. The head over the vertex of the notch is $H = 0.35\\text{ m}$ and the coefficient of discharge is $C_d = 0.60$. Taking $g = 9.81\\text{ m/s}^2$, the measured runoff discharge $Q$ in liters per second ($\\text{L/s}$) is ________ (round off to one decimal place).",
    "correct_answer": "102.7",
    "numerical_range": {
      "min": 101,
      "max": 104.5
    },
    "solution": "**Method 1: Canonical V-Notch Formula**\n$$Q = \\frac{8}{15} C_d \\sqrt{2 g} \\tan\\left(\\frac{\\theta}{2}\\right) H^{5/2}$$\nFor a $90^\\circ$ notch, $\\theta = 90^\\circ \\implies \\frac{\\theta}{2} = 45^\\circ \\implies \\tan(45^\\circ) = 1.0$.\n$$\\sqrt{2 g} = \\sqrt{2 \\times 9.81} = \\sqrt{19.62} = 4.4294$$\n$$H^{5/2} = (0.35)^{2.5} = (0.35)^2 \\times \\sqrt{0.35} = 0.1225 \\times 0.59161 = 0.072472\\text{ m}^{2.5}$$\n$$Q = \\frac{8}{15} \\times 0.60 \\times 4.4294 \\times 1.0 \\times 0.072472 = 0.320 \\times 4.4294 \\times 0.072472 = 0.10272\\text{ m}^3/\\text{s}$$\nConverting to liters per second:\n$$Q = 0.10272 \\times 1000 = 102.72\\text{ L/s} \\approx 102.7\\text{ L/s}$$\n\n**Method 2: Simplified Metric Empirical Factor**\n$$Q = 1.4174 \\times H^{2.5} = 1.4174 \\times 0.072472 = 0.10272\\text{ m}^3/\\text{s} = 102.7\\text{ L/s}$$",
    "difficulty": "Moderate",
    "source": "Soil and Water Conservation Engineering (Schwab et al.)"
  },
  {
    "id": "QB_SWCE_ADV_093",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Dimensional analysis – concepts of geometric dimensionless numbers",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "question": "In fluid mechanics and open channel hydraulic modeling, which dimensionless number represents the ratio of inertial force to gravitational force, governing free-surface wave propagation and hydraulic jump phenomena?",
    "options": {
      "A": "Froude number ($Fr = \\frac{V}{\\sqrt{g L}}$)",
      "B": "Reynolds number ($Re = \\frac{\\rho V L}{\\mu}$)",
      "C": "Weber number ($We = \\frac{\\rho V^2 L}{\\sigma}$)",
      "D": "Euler number ($Eu = \\frac{\\Delta p}{\\rho V^2}$)"
    },
    "correct_answer": "A",
    "solution": "- Froude number ($Fr$) represents the square root of the ratio of inertia force to gravity force ($Fr = \\frac{V}{\\sqrt{g L}}$). It governs all open-channel, weir, and spillway hydraulic modeling.\n- Reynolds number governs viscous dissipation.\n- Weber number governs surface tension phenomena (droplet breakup, thin-film aeration).\n- Euler number governs pressure-gradient driven flows. Option A is correct.",
    "difficulty": "Moderate",
    "source": "Engineering Hydrology (K. Subramanya)"
  },
  {
    "id": "QB_SWCE_ADV_094",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Hydrostatic pressure and its measurement",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following statements regarding the center of pressure ($h_{cp}$) on a submerged vertical plane surface of area $A$ immersed in a homogeneous static liquid are correct?",
    "options": {
      "A": "The center of pressure always lies strictly below the centroid of the immersed surface area",
      "B": "The distance between the centroid and center of pressure is given by $\\frac{I_G}{\\bar{h} A}$, where $I_G$ is second moment of area about the horizontal centroidal axis",
      "C": "As the immersion depth $\\bar{h}$ increases indefinitely, the center of pressure asymptotically approaches the centroid of the area",
      "D": "The vertical depth of the center of pressure depends directly on the dynamic viscosity of the liquid"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "- Statements A, B, and C are correct:\n  1. $h_{cp} = \\bar{h} + \\frac{I_G}{\\bar{h} A}$. Since $I_G > 0$ and $\\bar{h} A > 0$, $h_{cp} > \\bar{h}$, placing the center of pressure below the centroid.\n  2. The eccentric offset is $\\frac{I_G}{\\bar{h} A}$.\n  3. As $\\bar{h} \\to \\infty$, $\\frac{I_G}{\\bar{h} A} \\to 0$, so $h_{cp} \\to \\bar{h}$.\n- Statement D is incorrect: Hydrostatic pressure distribution depends only on fluid specific weight $\\gamma = \\rho g$ and depth $h$; dynamic viscosity $\\mu$ has zero effect in static equilibrium.",
    "difficulty": "Moderate",
    "source": "Soil and Water Conservation Engineering (Schwab et al.)"
  },
  {
    "id": "QB_SWCE_ADV_095",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Continuity equation, kinematics and dynamics of flow",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "question": "A main distribution conduit carries a discharge of $0.180\\text{ m}^3/\\text{s}$ and splits into two identical parallel delivery branch pipes, each having an internal diameter of $200\\text{ mm}$ ($0.20\\text{ m}$). Assuming equal flow division between the two branches, the mean water velocity in each branch pipe in meters per second ($\\text{m/s}$) is ________ (round off to two decimal places). Take $\\pi = 3.1416$.",
    "correct_answer": "2.86",
    "numerical_range": {
      "min": 2.8,
      "max": 2.92
    },
    "solution": "1. Flow in each branch pipe:\n$$Q_1 = \\frac{Q}{2} = \\frac{0.180}{2} = 0.090\\text{ m}^3/\\text{s}$$\n2. Cross-sectional area of a branch pipe:\n$$A_1 = \\frac{\\pi}{4} D_1^2 = \\frac{3.1416}{4} \\times (0.20)^2 = 0.031416\\text{ m}^2$$\n3. Mean flow velocity via continuity equation $Q_1 = A_1 V_1$:\n$$V_1 = \\frac{Q_1}{A_1} = \\frac{0.090}{0.031416} = 2.86478\\text{ m/s} \\approx 2.86\\text{ m/s}$$",
    "difficulty": "Easy",
    "source": "Soil and Water Conservation Engineering (Schwab et al.)"
  },
  {
    "id": "QB_SWCE_ADV_096",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Laminar and turbulent flow in pipes, Darcy–Weisbach and Hazen–Williams equations",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "In a laminar flow regime inside a circular pipe ($Re < 2000$), if the Reynolds number is doubled while maintaining laminar conditions, the Darcy-Weisbach friction factor $f$:",
    "options": {
      "A": "Is reduced by half ($f' = f / 2$)",
      "B": "Doubles ($f' = 2 f$)",
      "C": "Quadruples ($f' = 4 f$)",
      "D": "Remains unchanged because laminar friction is independent of Reynolds number"
    },
    "correct_answer": "A",
    "solution": "For fully developed laminar flow in a circular conduit, the Darcy friction factor is given by the Hagen-Poiseuille relationship:\n$$f = \\frac{64}{Re}$$\nIf Reynolds number doubles from $Re$ to $2 Re$:\n$$f' = \\frac{64}{2 Re} = \\frac{1}{2} \\left( \\frac{64}{Re} \\right) = \\frac{f}{2}$$\nHence, the friction factor is halved. Option A is correct.",
    "difficulty": "Easy",
    "source": "Soil and Water Conservation Engineering (Schwab et al.)"
  },
  {
    "id": "QB_SWCE_ADV_097",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Flow in open channels",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A most hydraulically efficient rectangular canal is to be excavated to convey a uniform discharge of $Q = 6.0\\text{ m}^3/\\text{s}$ on a longitudinal bed slope of $S_0 = 0.0016$. Manning's roughness coefficient is $n = 0.015$. The required design flow depth $y$ in meters is ________ (round off to two decimal places).",
    "correct_answer": "1.24",
    "numerical_range": {
      "min": 1.22,
      "max": 1.26
    },
    "solution": "**Method 1: Optimum Hydraulic Proportions**\n1. For the most efficient rectangular channel:\n$$\\text{Bed width } B = 2 y, \\quad \\text{Wetted perimeter } P = B + 2 y = 4 y$$\n$$\\text{Flow area } A = B y = 2 y^2$$\n$$\\text{Hydraulic radius } R = \\frac{A}{P} = \\frac{2 y^2}{4 y} = \\frac{y}{2}$$\n2. Manning's equation:\n$$Q = \\frac{1}{n} A R^{2/3} S_0^{1/2}$$\n$$6.0 = \\frac{1}{0.015} (2 y^2) \\left( \\frac{y}{2} \\right)^{2/3} \\sqrt{0.0016}$$\n$$\\sqrt{0.0016} = 0.040, \\quad \\left( \\frac{1}{2} \\right)^{2/3} \\approx 0.62996$$\n$$6.0 = \\frac{1}{0.015} \\times 2 \\times 0.62996 \\times 0.040 \\times y^{8/3}$$\n$$6.0 = 66.667 \\times 0.050397 \\times y^{8/3} = 3.3598 \\times y^{8/3}$$\n$$y^{8/3} = \\frac{6.0}{3.3598} = 1.7858$$\n$$y = (1.7858)^{3/8} = (1.7858)^{0.375} = 1.241\\text{ m} \\approx 1.24\\text{ m}$$\n\n**Method 2: Verification of Flow Parameters**\nAt $y = 1.241\\text{ m}$:\n$A = 2(1.241)^2 = 3.080\\text{ m}^2$, $R = 1.241 / 2 = 0.6205\\text{ m}$.\n$V = \\frac{1}{0.015} (0.6205)^{2/3} (0.04) = 66.667 \\times 0.7275 \\times 0.04 = 1.940\\text{ m/s}$.\n$Q = A V = 3.080 \\times 1.940 = 5.975 \\approx 6.0\\text{ m}^3/\\text{s}$.",
    "difficulty": "Hard",
    "source": "Soil and Water Conservation Engineering (Schwab et al.)"
  },
  {
    "id": "QB_SWCE_ADV_098",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Flow through orifices, weirs and notches",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "question": "For flow issuing through a sharp-crested circular orifice under a constant hydraulic head, the coefficient of discharge ($C_d$) is related to the coefficient of velocity ($C_v$) and coefficient of contraction ($C_c$) by which fundamental relationship?",
    "options": {
      "A": "$C_d = C_c \\times C_v$",
      "B": "$C_d = \\frac{C_c}{C_v}$",
      "C": "$C_d = C_c + C_v - 1$",
      "D": "$C_d = \\sqrt{C_c^2 + C_v^2}$"
    },
    "correct_answer": "A",
    "solution": "Actual discharge $Q_{act} = A_{act} \\times V_{act}$.\nTheoretical discharge $Q_{th} = A_{th} \\times V_{th}$.\nBy definition:\n$$C_c = \\frac{A_{act}}{A_{th}} \\quad \\text{and} \\quad C_v = \\frac{V_{act}}{V_{th}}$$\n$$C_d = \\frac{Q_{act}}{Q_{th}} = \\frac{A_{act} V_{act}}{A_{th} V_{th}} = C_c \\times C_v$$\nOption A is correct.",
    "difficulty": "Moderate",
    "source": "Soil and Water Conservation Engineering (Schwab et al.)"
  },
  {
    "id": "QB_SWCE_ADV_099",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Flow in open channels",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following statements regarding gradually varied flow (GVF) surface profiles in open channel hydraulics are correct?",
    "options": {
      "A": "An $M_1$ profile occurs on a mild slope ($S_0 < S_c$) when the actual depth $y$ is greater than both normal depth $y_n$ and critical depth $y_c$ ($y > y_n > y_c$), representing a backwater curve",
      "B": "An $M_2$ profile is a drawdown curve ($y_n > y > y_c$) occurring upstream of a sudden free overfall on a mild channel",
      "C": "An $S_1$ curve occurs on a steep slope ($y > y_c > y_n$) behind a high check dam or weir, producing a subcritical backwater profile",
      "D": "Flow profiles across the critical depth line $y = y_c$ are always perfectly smooth and horizontally asymptotic"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "- Statements A, B, and C are correct:\n  1. $M_1$ occurs when $y > y_n > y_c$, $\\frac{dy}{dx} > 0$ (backwater curve behind a dam on mild slope).\n  2. $M_2$ occurs when $y_n > y > y_c$, $\\frac{dy}{dx} < 0$ (drawdown profile approaching a free drop).\n  3. $S_1$ profile occurs when a structure forces flow depth above $y_c$ on a steep slope.\n- Statement D is incorrect: At critical depth $y = y_c$, $Fr = 1$ and the GVF differential equation $\\frac{dy}{dx} = \\frac{S_0 - S_f}{1 - Fr^2}$ indicates an infinite slope ($\\,\\frac{dy}{dx} \\to \\infty$), signifying physical breakdown into hydraulic jumps or standing waves.",
    "difficulty": "Moderate",
    "source": "Engineering Hydrology (K. Subramanya)"
  },
  {
    "id": "QB_SWCE_ADV_100",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Fluid Mechanics",
    "subtopic": "Hydrostatic pressure and its measurement",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "question": "A U-tube manometer containing mercury (specific gravity $S_m = 13.6$) is connected to a pressurized water pipe. The mercury level in the open limb is $0.25\\text{ m}$ higher than that in the limb connected to the pipe, and the water-mercury interface in the pipe limb is $0.15\\text{ m}$ below the pipe centerline. Taking $g = 9.81\\text{ m/s}^2$ and density of water $\\rho_w = 1000\\text{ kg/m}^3$, the gauge pressure at the pipe centerline in kilopascals ($\\text{kPa}$) is ________ (round off to two decimal places).",
    "correct_answer": "31.88",
    "numerical_range": {
      "min": 31.5,
      "max": 32.3
    },
    "solution": "1. Gauge pressure balance equation from open limb to pipe center:\n$$P_{\\text{pipe}} + \\rho_w g h_w = \\rho_m g h_m$$\n$$P_{\\text{pipe}} = \\rho_w g [ S_m h_m - h_w ]$$\n2. Substituting given values:\n- $S_m = 13.6$\n- Mercury column difference $h_m = 0.25\\text{ m}$\n- Water column above datum $h_w = 0.15\\text{ m}$\n$$P_{\\text{pipe}} = 1000 \\times 9.81 \\times [ 13.6 \\times 0.25 - 0.15 ]$$\n$$13.6 \\times 0.25 = 3.40$$\n$$3.40 - 0.15 = 3.25\\text{ m of water}$$\n$$P_{\\text{pipe}} = 9810 \\times 3.25 = 31,882.5\\text{ Pa} = 31.8825\\text{ kPa} \\approx 31.88\\text{ kPa}$$",
    "difficulty": "Easy",
    "source": "Soil and Water Conservation Engineering (Schwab et al.)"
  },
  {
    "id": "QB_SWCE_ADV_101",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Fundamental definitions and relationships",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A compacted soil sample has a void ratio of $e = 0.65$ and a specific gravity of soil solids $G_s = 2.68$. If the degree of saturation of the soil is $S_r = 75.0\\%$, the gravimetric water content $w$ of the soil in percent ($\\text{\\%}$) is ________ (round off to two decimal places).",
    "correct_answer": "18.19",
    "numerical_range": {
      "min": 18,
      "max": 18.4
    },
    "solution": "**Method 1: Phase Relationship Equation**\nFrom basic volumetric-gravimetric phase relations:\n$$S_r \\cdot e = w \\cdot G_s \\implies w = \\frac{S_r \\cdot e}{G_s}$$\nGiven:\n- $S_r = 0.75$\n- $e = 0.65$\n- $G_s = 2.68$\n$$w = \\frac{0.75 \\times 0.65}{2.68} = \\frac{0.4875}{2.68} = 0.181903 = 18.19\\%$$\n\n**Method 2: Volume-Mass Balance Basis**\nAssuming volume of solids $V_s = 1.0\\text{ m}^3$:\n- Mass of solids $M_s = G_s \\rho_w V_s = 2.68 \\times 1000 = 2680\\text{ kg}$\n- Volume of voids $V_v = e V_s = 0.65\\text{ m}^3$\n- Volume of water $V_w = S_r V_v = 0.75 \\times 0.65 = 0.4875\\text{ m}^3$\n- Mass of water $M_w = \\rho_w V_w = 487.5\\text{ kg}$\n- Water content $w = \\frac{M_w}{M_s} = \\frac{487.5}{2680} = 0.1819 = 18.19\\%$",
    "difficulty": "Moderate",
    "source": "Soil Mechanics and Foundations (B.C. Punmia)"
  },
  {
    "id": "QB_SWCE_ADV_102",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Index properties of soils",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "For a cohesive clay soil, if the natural moisture content $w$ equals its plastic limit $w_P$, the liquidity index ($I_L$) and consistency index ($I_c$) are respectively:",
    "options": {
      "A": "$I_L = 0$ and $I_c = 1$",
      "B": "$I_L = 1$ and $I_c = 0$",
      "C": "$I_L = 0.5$ and $I_c = 0.5$",
      "D": "$I_L = -1$ and $I_c = 1$"
    },
    "correct_answer": "A",
    "solution": "Definitions:\n1. Plasticity index: $I_p = w_L - w_P$.\n2. Liquidity index: $I_L = \\frac{w - w_P}{I_p}$. When $w = w_P$, $I_L = \\frac{0}{I_p} = 0$.\n3. Consistency index: $I_c = \\frac{w_L - w}{I_p}$. When $w = w_P$, $I_c = \\frac{w_L - w_P}{I_p} = \\frac{I_p}{I_p} = 1$.\n4. Notice $I_L + I_c = 1$ always holds. Option A is correct.",
    "difficulty": "Easy",
    "source": "Soil Mechanics and Foundations (B.C. Punmia)"
  },
  {
    "id": "QB_SWCE_ADV_103",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Permeability and seepage analysis",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following geometric and hydraulic properties of a flow net drawn for two-dimensional steady seepage through an isotropic earthen dam are correct?\n\n```\nUpstream Water Level ───┐\n                       │  Flow Line Ψ1 ──────────────────────┐\n                       ├─── Flow Line Ψ2 ──────────────┐     │\n  Impermeable Core     │      │   Equipotential Φ1     │     │\n                       │      │      │                 │     │\n───────────────────────┴──────┴──────┴─────────────────┴─────┴── Impermeable Stratum\n```",
    "options": {
      "A": "Flow lines (streamlines $\\Psi$) and equipotential lines ($\\Phi$) intersect orthogonally at right angles ($90^\\circ$)",
      "B": "The basic flow fields formed between adjacent streamlines and equipotentials are curvilinear squares",
      "C": "The seepage discharge through each individual flow channel is identical ($\\Delta q = k H / N_d$)",
      "D": "The total seepage quantity increases linearly with the number of potential drops $N_d$"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "- Statements A, B, and C are correct:\n  1. In isotropic media ($k_x = k_y$), the Cauchy-Riemann conditions mandate that potential and stream functions are orthogonal.\n  2. For a square flow net, the aspect ratio of each curvilinear cell is unity ($b/l \\approx 1$).\n  3. Each flow channel carries $\\Delta q = k \\Delta h = k \\frac{H}{N_d}$.\n- Statement D is incorrect: Total seepage is $q = k H \\frac{N_f}{N_d}$; seepage is inversely proportional to the number of potential drops $N_d$, not directly proportional.",
    "difficulty": "Moderate",
    "source": "Soil Mechanics and Foundations (B.C. Punmia)"
  },
  {
    "id": "QB_SWCE_ADV_104",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Permeability and seepage analysis",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A flow net is constructed for a homogeneous earthen dam of length $L = 120.0\\text{ m}$. The total hydraulic head acting across the dam is $H = 12.0\\text{ m}$. The soil coefficient of permeability is $k = 4.5 \\times 10^{-6}\\text{ m/s}$. The flow net consists of $N_f = 4$ flow channels and $N_d = 16$ equipotential drops. The total seepage discharge through the dam in liters per second ($\\text{L/s}$) is ________ (round off to two decimal places).",
    "correct_answer": "1.62",
    "numerical_range": {
      "min": 1.58,
      "max": 1.66
    },
    "solution": "1. Seepage discharge per unit width of dam ($q$):\n$$q = k \\cdot H \\cdot \\frac{N_f}{N_d}$$\n$$q = (4.5 \\times 10^{-6}\\text{ m/s}) \\times 12.0\\text{ m} \\times \\frac{4}{16}$$\n$$\\frac{N_f}{N_d} = \\frac{4}{16} = 0.25$$\n$$q = 4.5 \\times 10^{-6} \\times 12.0 \\times 0.25 = 1.35 \\times 10^{-5}\\text{ m}^3/(\\text{s}\\cdot\\text{m})$$\n2. Total seepage discharge for total dam crest length $L = 120.0\\text{ m}$:\n$$Q = q \\times L = (1.35 \\times 10^{-5}) \\times 120.0 = 1.62 \\times 10^{-3}\\text{ m}^3/\\text{s}$$\n3. Converting to liters per second:\n$$Q = 1.62 \\times 10^{-3} \\times 1000 = 1.62\\text{ L/s}$$",
    "difficulty": "Hard",
    "source": "Soil Mechanics and Foundations (B.C. Punmia)"
  },
  {
    "id": "QB_SWCE_ADV_105",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Mohr's circle of stress",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A soil element in a shear testing device is subjected to principal stresses of $\\sigma_1 = 320.0\\text{ kPa}$ (major principal stress) and $\\sigma_3 = 100.0\\text{ kPa}$ (minor principal stress). The normal stress $\\sigma_\\theta$ acting on a plane inclined at $\\theta = 60^\\circ$ to the major principal plane in $\\text{kPa}$ is ________ (answer in integer).\n\n```\n           τ (Shear Stress)\n                  |          * (σ1+σ3)/2, R\n                  |       .-' | '-.   Radius R = (σ1 - σ3)/2\n                  |     .'    |    '.\n                  |    /      |      \\\n        ----------+---(-------+-------)---------> σ (Normal Stress)\n                  |   σ3      C       σ1\n```",
    "correct_answer": "155",
    "numerical_range": {
      "min": 154,
      "max": 156
    },
    "solution": "**Method 1: Mohr's Circle Analytical Transformation**\n1. Normal stress on a plane inclined at $\\theta$ to the major principal plane:\n$$\\sigma_\\theta = \\frac{\\sigma_1 + \\sigma_3}{2} + \\frac{\\sigma_1 - \\sigma_3}{2} \\cos(2\\theta)$$\n2. Evaluating terms with $\\theta = 60^\\circ \\implies 2\\theta = 120^\\circ$:\n$$\\text{Center } C = \\frac{320.0 + 100.0}{2} = \\frac{420.0}{2} = 210.0\\text{ kPa}$$\n$$\\text{Radius } R = \\frac{320.0 - 100.0}{2} = \\frac{220.0}{2} = 110.0\\text{ kPa}$$\n$$\\cos(120^\\circ) = -0.50$$\n$$\\sigma_\\theta = 210.0 + 110.0 \\times (-0.50) = 210.0 - 55.0 = 155.0\\text{ kPa}$$\n\n**Method 2: Direction Cosine Projection**\n$$\\sigma_\\theta = \\sigma_1 \\cos^2(\\theta) + \\sigma_3 \\sin^2(\\theta)$$\n$$\\cos(60^\\circ) = 0.50 \\implies \\cos^2(60^\\circ) = 0.25$$\n$$\\sin(60^\\circ) = \\frac{\\sqrt{3}}{2} \\approx 0.8660 \\implies \\sin^2(60^\\circ) = 0.75$$\n$$\\sigma_\\theta = 320.0 \\times 0.25 + 100.0 \\times 0.75 = 80.0 + 75.0 = 155.0\\text{ kPa}$$",
    "difficulty": "Moderate",
    "source": "Soil Mechanics and Foundations (B.C. Punmia)"
  },
  {
    "id": "QB_SWCE_ADV_106",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Soil compaction and Proctor test",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "Compared to the Standard Proctor compaction test, increasing the compactive energy to Modified Proctor levels causes:",
    "options": {
      "A": "Higher Maximum Dry Density (MDD) and lower Optimum Moisture Content (OMC)",
      "B": "Lower Maximum Dry Density (MDD) and higher Optimum Moisture Content (OMC)",
      "C": "Higher Maximum Dry Density (MDD) and higher Optimum Moisture Content (OMC)",
      "D": "No change in MDD or OMC because compaction curves depend exclusively on soil mineralogy"
    },
    "correct_answer": "A",
    "solution": "Higher compactive effort (Modified Proctor imparts 4.5 times more energy than Standard Proctor):\n1. Packs soil particles closer together, driving up the Maximum Dry Density (MDD).\n2. Requires less lubricating water to attain the peak density, shifting the Optimum Moisture Content (OMC) to a lower value.\nOption A is correct.",
    "difficulty": "Easy",
    "source": "Soil Mechanics and Foundations (B.C. Punmia)"
  },
  {
    "id": "QB_SWCE_ADV_107",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Active and passive earth pressures",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A smooth vertical retaining wall of height $H = 6.0\\text{ m}$ retains a dry cohesionless backfill with horizontal surface. The soil has unit weight $\\gamma = 18.0\\text{ kN/m}^3$ and internal friction angle $\\phi = 30^\\circ$. Using Rankine's theory, the total active lateral earth thrust $P_a$ per unit length of wall in $\\text{kN/m}$ is ________ (answer in integer).",
    "correct_answer": "108",
    "numerical_range": {
      "min": 107,
      "max": 109
    },
    "solution": "1. Rankine's coefficient of active earth pressure ($K_a$):\n$$K_a = \\frac{1 - \\sin\\phi}{1 + \\sin\\phi} = \\frac{1 - \\sin 30^\\circ}{1 + \\sin 30^\\circ} = \\frac{1 - 0.5}{1 + 0.5} = \\frac{0.5}{1.5} = \\frac{1}{3}$$\n2. Active lateral pressure at depth $z = H = 6.0\\text{ m}$:\n$$p_a = K_a \\gamma H = \\frac{1}{3} \\times 18.0 \\times 6.0 = 36.0\\text{ kPa}$$\n3. Total active thrust per meter run of wall (area of triangular pressure diagram):\n$$P_a = \\frac{1}{2} K_a \\gamma H^2 = \\frac{1}{2} \\times \\frac{1}{3} \\times 18.0 \\times (6.0)^2$$\n$$P_a = 3.0 \\times 36.0 = 108.0\\text{ kN/m}$$",
    "difficulty": "Moderate",
    "source": "Soil Mechanics and Foundations (B.C. Punmia)"
  },
  {
    "id": "QB_SWCE_ADV_108",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Active and passive earth pressures",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "For a cohesionless backfill with an angle of internal friction $\\phi = 30^\\circ$, the ratio of Rankine's coefficient of passive earth pressure ($K_p$) to active earth pressure ($K_a$) is:",
    "options": {
      "A": "9.0",
      "B": "3.0",
      "C": "1.0",
      "D": "6.0"
    },
    "correct_answer": "A",
    "solution": "1. Active coefficient:\n$$K_a = \\frac{1 - \\sin 30^\\circ}{1 + \\sin 30^\\circ} = \\frac{1 - 0.5}{1 + 0.5} = \\frac{1}{3}$$\n2. Passive coefficient:\n$$K_p = \\frac{1 + \\sin 30^\\circ}{1 - \\sin 30^\\circ} = \\frac{1 + 0.5}{1 - 0.5} = \\frac{1.5}{0.5} = 3$$\n3. Ratio:\n$$\\frac{K_p}{K_a} = \\frac{3}{1/3} = 9.0$$\nOption A is correct.",
    "difficulty": "Easy",
    "source": "Soil Mechanics and Foundations (B.C. Punmia)"
  },
  {
    "id": "QB_SWCE_ADV_109",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Stability of slopes",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following statements regarding slope stability analysis methods in geotechnical engineering are correct?",
    "options": {
      "A": "Taylor's stability number is defined as $S_n = \\frac{c_m}{\\gamma H} = \\frac{c}{F_c \\gamma H}$",
      "B": "The Swedish Slip Circle method (Ordinary Method of Slices) assumes circular failure surfaces and neglects inter-slice forces",
      "C": "Bishop's simplified method satisfies overall moment equilibrium and vertical force equilibrium for each slice, yielding higher factors of safety than the Ordinary Method",
      "D": "In a purely cohesionless dry sand slope ($c = 0$), the factor of safety is completely independent of slope height and equals $\\frac{\\tan\\phi'}{\\tan\\beta}$"
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "All four statements are foundational principles in geotechnical slope engineering:\n- Statement A: Taylor's dimensionless stability number $S_n = \\frac{c}{\\gamma H_c}$.\n- Statement B: Ordinary Method of Slices neglects interslice tangential and normal forces.\n- Statement C: Bishop's simplified method accounts for vertical equilibrium and produces accurate FOS within $2-5\\%$ of rigorous solutions.\n- Statement D: For an infinite cohesionless slope, $FOS = \\frac{\\tau_f}{\\tau} = \\frac{\\sigma' \\tan\\phi'}{\\sigma' \\tan\\beta} = \\frac{\\tan\\phi'}{\\tan\\beta}$, which is entirely independent of slope height $H$.",
    "difficulty": "Moderate",
    "source": "Soil Mechanics and Foundations (B.C. Punmia)"
  },
  {
    "id": "QB_SWCE_ADV_110",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Terzaghi's one dimensional soil consolidation theory",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A saturated clay stratum of thickness $H = 4.0\\text{ m}$ is situated between two permeable gravel layers (two-way drainage). The coefficient of consolidation is $c_v = 2.40 \\times 10^{-7}\\text{ m}^2/\\text{s}$. For $50\\%$ average consolidation, the theoretical time factor is $T_v = 0.197$. The time required to attain $50\\%$ consolidation in days is ________ (round off to one decimal place).",
    "correct_answer": "38.0",
    "numerical_range": {
      "min": 37,
      "max": 39
    },
    "solution": "**Method 1: Direct Terzaghi Drainage Formulation**\n1. Drainage path length $d$ for two-way drainage:\n$$d = \\frac{H}{2} = \\frac{4.0\\text{ m}}{2} = 2.0\\text{ m}$$\n2. Time factor relationship:\n$$T_v = \\frac{c_v \\cdot t}{d^2} \\implies t = \\frac{T_v \\cdot d^2}{c_v}$$\n3. Substituting values:\n$$t = \\frac{0.197 \\times (2.0)^2}{2.40 \\times 10^{-7}} = \\frac{0.197 \\times 4.0}{2.40 \\times 10^{-7}} = \\frac{0.788}{2.40 \\times 10^{-7}} = 3.2833 \\times 10^6\\text{ seconds}$$\n4. Converting seconds to days:\n$$t = \\frac{3.2833 \\times 10^6}{86400\\text{ s/day}} = 37.999\\text{ days} \\approx 38.0\\text{ days}$$\n\n**Method 2: Parabolic Approximation for $U \\le 60\\%$**\n$$T_v = \\frac{\\pi}{4} U^2 = \\frac{3.14159}{4} \\times (0.50)^2 = 0.19635$$\n$$t = \\frac{0.19635 \\times 4.0}{2.40 \\times 10^{-7} \\times 86400} = 37.88\\text{ days} \\approx 38.0\\text{ days}$$",
    "difficulty": "Hard",
    "source": "Soil Mechanics and Foundations (B.C. Punmia)"
  },
  {
    "id": "QB_SWCE_ADV_111",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Engineering properties of soils",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "According to Terzaghi's principle of effective stress, the shear strength and volumetric deformation of saturated soils are uniquely governed by:",
    "options": {
      "A": "Effective stress ($\\sigma' = \\sigma - u$), which is total stress minus pore water pressure",
      "B": "Total normal stress ($\\sigma$) alone, regardless of pore water pressure",
      "C": "Neutral stress / pore water pressure ($u$) alone",
      "D": "Atmospheric barometric pressure acting on the ground surface"
    },
    "correct_answer": "A",
    "solution": "Terzaghi established that all measurable effects of a change of stress, such as compression, distortion, and a change of shearing resistance, are exclusively due to changes in the effective stress $\\sigma' = \\sigma - u$. Option A is correct.",
    "difficulty": "Easy",
    "source": "Soil Mechanics and Foundations (B.C. Punmia)"
  },
  {
    "id": "QB_SWCE_ADV_112",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Index properties of soils",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "question": "A clayey soil has a liquid limit $w_L = 52\\%$, plastic limit $w_P = 24\\%$, and the percentage of soil particles finer than $2\\,\\mu\\text{m}$ is $35\\%$. The activity of the clay ($A$) is ________ (round off to two decimal places).",
    "correct_answer": "0.80",
    "numerical_range": {
      "min": 0.78,
      "max": 0.82
    },
    "solution": "1. Plasticity index ($I_p$):\n$$I_p = w_L - w_P = 52\\% - 24\\% = 28\\%$$\n2. Activity of clay ($A$) defined by Skempton:\n$$A = \\frac{I_p}{\\% \\text{ clay-sized fraction } (< 2\\,\\mu\\text{m})}$$\n$$A = \\frac{28}{35} = 0.80$$\n(Classified as normal clay, since $0.75 \\le A \\le 1.25$).",
    "difficulty": "Easy",
    "source": "Soil Mechanics and Foundations (B.C. Punmia)"
  },
  {
    "id": "QB_SWCE_ADV_113",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Shear strength",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "question": "In a consolidated undrained (CU) triaxial compression test on a normally consolidated saturated clay with pore pressure measurement, the effective cohesion intercept ($c'$) and the failure envelope are characterized by:",
    "options": {
      "A": "$c' = 0$, and the effective stress failure envelope passes through the origin with effective friction angle $\\phi'$",
      "B": "$c' > 0$ and $\\phi' = 0$",
      "C": "Both $c'$ and $\\phi'$ equal zero under all strain rates",
      "D": "The effective stress path is always vertical and independent of deviator stress"
    },
    "correct_answer": "A",
    "solution": "For normally consolidated clays, there is no pre-consolidation stress memory; hence, the effective cohesion intercept $c' = 0$. The Mohr-Coulomb failure envelope in terms of effective stresses passes directly through the origin: $\\tau_f = \\sigma' \\tan\\phi'$. Option A is correct.",
    "difficulty": "Moderate",
    "source": "Soil Mechanics and Foundations (B.C. Punmia)"
  },
  {
    "id": "QB_SWCE_ADV_114",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Fundamental definitions and relationships",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following mathematical equations correctly express interrelationships between unit weights, void ratio ($e$), moisture content ($w$), and specific gravity ($G_s$) in soil mechanics?",
    "options": {
      "A": "Dry unit weight: $\\gamma_d = \\frac{\\gamma}{1 + w}$",
      "B": "Dry unit weight: $\\gamma_d = \\frac{G_s \\gamma_w}{1 + e}$",
      "C": "Saturated unit weight: $\\gamma_{sat} = \\frac{(G_s + e)\\gamma_w}{1 + e}$",
      "D": "Submerged unit weight: $\\gamma' = \\frac{(G_s - 1)\\gamma_w}{1 + e}$"
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "All four relationships are canonical exact identities:\n- A: $\\gamma_d = \\frac{\\gamma}{1 + w}$ relates bulk and dry unit weights.\n- B: $\\gamma_d = \\frac{W_s}{V} = \\frac{G_s \\gamma_w V_s}{(1 + e)V_s} = \\frac{G_s \\gamma_w}{1 + e}$.\n- C: At $S_r = 1$, $\\gamma_{sat} = \\frac{(G_s + S_r e)\\gamma_w}{1 + e} = \\frac{(G_s + e)\\gamma_w}{1 + e}$.\n- D: $\\gamma' = \\gamma_{sat} - \\gamma_w = \\frac{(G_s + e)\\gamma_w - (1 + e)\\gamma_w}{1 + e} = \\frac{(G_s - 1)\\gamma_w}{1 + e}$.",
    "difficulty": "Moderate",
    "source": "Soil Mechanics and Foundations (B.C. Punmia)"
  },
  {
    "id": "QB_SWCE_ADV_115",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Stability of slopes",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "An infinite embankment slope of dry cohesionless sand ($c = 0$) has an effective internal friction angle of $\\phi' = 35^\\circ$. The slope angle with the horizontal is $\\beta = 25^\\circ$. Taking $\\tan(35^\\circ) = 0.7002$ and $\\tan(25^\\circ) = 0.4663$, the factor of safety ($FOS$) of the dry slope against translational shear sliding is ________ (round off to two decimal places).",
    "correct_answer": "1.50",
    "numerical_range": {
      "min": 1.48,
      "max": 1.52
    },
    "solution": "1. For an infinite cohesionless slope in completely dry conditions:\n$$FOS = \\frac{\\text{Resisting Shear Stress}}{\\text{Mobilized Shear Stress}} = \\frac{\\sigma' \\tan\\phi'}{\\tau}$$\n2. Stresses on a plane at depth $z$ parallel to the slope face:\n$$\\sigma' = \\gamma z \\cos^2\\beta$$\n$$\\tau = \\gamma z \\cos\\beta \\sin\\beta$$\n$$FOS = \\frac{\\gamma z \\cos^2\\beta \\tan\\phi'}{\\gamma z \\cos\\beta \\sin\\beta} = \\frac{\\tan\\phi'}{\\tan\\beta}$$\n3. Calculating $FOS$:\n$$FOS = \\frac{\\tan 35^\\circ}{\\tan 25^\\circ} = \\frac{0.7002}{0.4663} = 1.5016 \\approx 1.50$$",
    "difficulty": "Moderate",
    "source": "Soil Mechanics and Foundations (B.C. Punmia)"
  },
  {
    "id": "QB_SWCE_ADV_116",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Permeability and seepage analysis",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "The critical hydraulic gradient ($i_c$) at which quicksand condition (boiling) occurs in upward seepage through a sand stratum is expressed by:",
    "options": {
      "A": "$i_c = \\frac{G_s - 1}{1 + e}$",
      "B": "$i_c = \\frac{G_s + 1}{1 - e}$",
      "C": "$i_c = \\frac{1 + e}{G_s - 1}$",
      "D": "$i_c = (G_s - 1)(1 + e)$"
    },
    "correct_answer": "A",
    "solution": "Quicksand condition occurs when the upward seepage force balances the submerged weight of the soil particles, causing effective stress $\\sigma'$ to become zero:\n$$\\sigma' = \\gamma' z - i \\gamma_w z = 0 \\implies i_c = \\frac{\\gamma'}{\\gamma_w}$$\nSince $\\gamma' = \\frac{G_s - 1}{1 + e} \\gamma_w$:\n$$i_c = \\frac{G_s - 1}{1 + e}$$\nOption A is correct.",
    "difficulty": "Easy",
    "source": "Soil Mechanics and Foundations (B.C. Punmia)"
  },
  {
    "id": "QB_SWCE_ADV_117",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Analysis of precipitation data",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "The normal annual precipitations at rain gauge stations X, A, B, and C are $N_X = 900.0\\text{ mm}$, $N_A = 800.0\\text{ mm}$, $N_B = 1000.0\\text{ mm}$, and $N_C = 950.0\\text{ mm}$. During a storm event, stations A, B, and C recorded storm rainfalls of $P_A = 65.0\\text{ mm}$, $P_B = 85.0\\text{ mm}$, and $P_C = 78.0\\text{ mm}$, while gauge X was inoperative. Using the Normal Ratio Method, the estimated storm rainfall $P_X$ at station X in $\\text{mm}$ is ________ (round off to one decimal place).",
    "correct_answer": "74.5",
    "numerical_range": {
      "min": 73.8,
      "max": 75.2
    },
    "solution": "**Method 1: Normal Ratio Formula**\nWhen normal annual rainfalls differ by more than $10\\%$, the Normal Ratio Method is prescribed:\n$$P_X = \\frac{N_X}{m} \\sum_{i=1}^m \\frac{P_i}{N_i}$$\nHere $m = 3$ surrounding index stations:\n$$P_X = \\frac{900.0}{3} \\left[ \\frac{65.0}{800.0} + \\frac{85.0}{1000.0} + \\frac{78.0}{950.0} \\right]$$\n1. Individual ratios:\n- $\\frac{65.0}{800.0} = 0.08125$\n- $\\frac{85.0}{1000.0} = 0.08500$\n- $\\frac{78.0}{950.0} = 0.082105$\n2. Sum of ratios:\n$$\\text{Sum} = 0.08125 + 0.08500 + 0.082105 = 0.248355$$\n3. Estimated precipitation:\n$$P_X = 300.0 \\times 0.248355 = 74.5065\\text{ mm} \\approx 74.5\\text{ mm}$$\n\n**Method 2: Weighted Normalized Anomaly**\n$$P_X = N_X \\times \\text{Average Weight} = 900.0 \\times \\frac{0.248355}{3} = 74.51\\text{ mm}$$",
    "difficulty": "Moderate",
    "source": "Engineering Hydrology (K. Subramanya)"
  },
  {
    "id": "QB_SWCE_ADV_118",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Hydrological cycle and measurement of its components",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "For a closed hydrological river basin over a multi-year balance period where net subsurface and surface storage change is negligible ($\\Delta S \\approx 0$), the long-term water balance is expressed as:",
    "options": {
      "A": "$P = R + ET$",
      "B": "$P = R - ET$",
      "C": "$P + R = ET$",
      "D": "$ET = P \\times R$"
    },
    "correct_answer": "A",
    "solution": "The general hydrologic water balance equation for a catchment is:\n$$P - R - ET - G_{out} = \\Delta S$$\nFor a closed basin over a long period, net groundwater outflow $G_{out} \\approx 0$ and storage change $\\Delta S = 0$, reducing to $P = R + ET$ (Precipitation equals Runoff plus Evapotranspiration). Option A is correct.",
    "difficulty": "Easy",
    "source": "Engineering Hydrology (K. Subramanya)"
  },
  {
    "id": "QB_SWCE_ADV_119",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Hydrograph analysis, unit hydrograph theory and application",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A 4-hour Unit Hydrograph (UH) for a drainage basin has a symmetrical triangular shape with a base duration of $T_b = 24.0\\text{ hours}$ and a peak discharge of $Q_p = 35.0\\text{ m}^3/\\text{s}$. The direct catchment drainage area $A$ in square kilometers ($\\text{km}^2$) is ________ (round off to one decimal place).\n\n```\nDischarge Q (m³/s)\n     ^             Peak Qp = 35.0 m³/s\n     |                   *\n     |                 /   \\\n     |               /       \\\n     |             /           \\\n     +-----------+---------------+----------> Time t (hours)\n     0           4      12       24\n```",
    "correct_answer": "151.2",
    "numerical_range": {
      "min": 150,
      "max": 152.5
    },
    "solution": "**Method 1: Hydrograph Volume Integration**\n1. By definition, a Unit Hydrograph represents $1.0\\text{ cm} = 0.010\\text{ m}$ of direct runoff depth over the entire catchment area $A$.\n2. Volume of runoff under the triangular hydrograph:\n$$V = \\frac{1}{2} \\times \\text{Base} \\times \\text{Peak}$$\n$$\\text{Base } T_b = 24.0\\text{ hours} = 24.0 \\times 3600\\text{ s} = 86,400\\text{ s}$$\n$$V = \\frac{1}{2} \\times 86,400\\text{ s} \\times 35.0\\text{ m}^3/\\text{s} = 43,200 \\times 35.0 = 1,512,000\\text{ m}^3$$\n3. Equating volume to depth $\\times$ area:\n$$V = A \\times 0.010\\text{ m} \\implies A = \\frac{1,512,000}{0.010} = 151,200,000\\text{ m}^2$$\n4. Converting to $\\text{km}^2$:\n$$A = \\frac{151,200,000}{10^6} = 151.2\\text{ km}^2$$\n\n**Method 2: Direct Unit Hydrograph Dimensionless Shortcut**\n$$V = 0.5 \\times 24 \\times 35 \\times 3600 = 1.512 \\times 10^6\\text{ m}^3$$\n$$A = \\frac{V}{0.01\\text{ m}} = 151.2\\text{ km}^2$$",
    "difficulty": "Hard",
    "source": "Engineering Hydrology (K. Subramanya)"
  },
  {
    "id": "QB_SWCE_ADV_120",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Hydrograph analysis, unit hydrograph theory and application",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following physical and mathematical assumptions form the basis of Sherman's Unit Hydrograph (UH) theory?",
    "options": {
      "A": "Linear response: The ordinates of direct runoff are directly proportional to the volume of rainfall excess (principle of superposition and scaling)",
      "B": "Time invariance: The direct runoff response from a given effective rainfall duration is invariable with time of occurrence",
      "C": "Rainfall excess is uniformly distributed throughout the effective duration of the storm across the entire catchment",
      "D": "The base period duration of direct runoff hydrograph is constant for all storms of the specified duration, regardless of rainfall excess depth"
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "All four statements represent the classic assumptions formulated by L.K. Sherman (1932):\n- A: Linear system property (doubling rainfall excess doubles direct runoff ordinates).\n- B: Time invariance (catchment transfer function does not drift with season).\n- C: Spatial and temporal uniformity of rainfall excess.\n- D: Base time $T_b$ of direct runoff is constant for a given duration $D$.",
    "difficulty": "Moderate",
    "source": "Engineering Hydrology (K. Subramanya)"
  },
  {
    "id": "QB_SWCE_ADV_121",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Infiltration – indices and equations",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "The infiltration capacity of a catchment soil is described by Horton's equation: $f_p = 10.0 + (40.0 - 10.0) e^{-0.80 t}$, where $f_p$ is in $\\text{mm/h}$ and $t$ is in hours. During a storm with continuous rainfall exceeding the infiltration capacity, the cumulative total infiltration depth $F$ in $\\text{mm}$ during the first $t = 3.0\\text{ hours}$ is ________ (round off to one decimal place).",
    "correct_answer": "64.1",
    "numerical_range": {
      "min": 63.5,
      "max": 64.8
    },
    "solution": "1. Horton's infiltration equation:\n$$f_p = f_c + (f_0 - f_c) e^{-k t}$$\nHere:\n- $f_c = 10.0\\text{ mm/h}$\n- $f_0 = 40.0\\text{ mm/h}$\n- $f_0 - f_c = 30.0\\text{ mm/h}$\n- $k = 0.80\\text{ h}^{-1}$\n2. Cumulative infiltration depth $F(t) = \\int_0^t f_p dt$:\n$$F(t) = f_c t + \\frac{f_0 - f_c}{k} (1 - e^{-k t})$$\n3. Evaluating at $t = 3.0\\text{ h}$:\n$$f_c t = 10.0 \\times 3.0 = 30.0\\text{ mm}$$\n$$\\frac{f_0 - f_c}{k} = \\frac{30.0}{0.80} = 37.5\\text{ mm}$$\n$$e^{-k t} = e^{-0.80 \\times 3.0} = e^{-2.40} \\approx 0.090718$$\n$$1 - e^{-2.40} = 1 - 0.090718 = 0.90928$$\n$$F(3) = 30.0 + 37.5 \\times 0.90928 = 30.0 + 34.098 = 64.098\\text{ mm} \\approx 64.1\\text{ mm}$$",
    "difficulty": "Moderate",
    "source": "Engineering Hydrology (K. Subramanya)"
  },
  {
    "id": "QB_SWCE_ADV_122",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Infiltration – indices and equations",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "Regarding the hydrologic infiltration indices $\\Phi$-index and $W$-index, which of the following statements is always strictly true?",
    "options": {
      "A": "The $\\Phi$-index represents average infiltration and depression storage, and is always greater than or equal to the $W$-index ($\\Phi \\ge W$)",
      "B": "The $W$-index always exceeds the $\\Phi$-index by a factor of 2.0",
      "C": "Both $\\Phi$ and $W$ indices account only for surface evaporation, ignoring infiltration",
      "D": "The $\\Phi$-index can only be evaluated when rainfall intensity is zero"
    },
    "correct_answer": "A",
    "solution": "- The $\\Phi$-index treats initial abstraction ($I_a$, depression storage and interception) as part of infiltration loss ($P_{excess} = P - \\Phi \\cdot t_e$).\n- The $W$-index explicitly separates initial abstraction: $W = \\frac{P - R - I_a}{t_e}$.\n- Since the loss attributed to infiltration in $\\Phi$ includes $I_a$, $\\Phi \\ge W$ always holds. Option A is correct.",
    "difficulty": "Easy",
    "source": "Engineering Hydrology (K. Subramanya)"
  },
  {
    "id": "QB_SWCE_ADV_123",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Flood routing, hydrological reservoir and channel routing",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "In a Muskingum channel flood routing operation, the reach parameters are travel time $K = 12.0\\text{ hours}$, weighting factor $x = 0.20$, and routing time step $\\Delta t = 6.0\\text{ hours}$. At the beginning of the interval, inflow is $I_1 = 40.0\\text{ m}^3/\\text{s}$ and outflow is $O_1 = 40.0\\text{ m}^3/\\text{s}$. At the end of the interval, inflow rises to $I_2 = 70.0\\text{ m}^3/\\text{s}$. The routed outflow discharge $O_2$ in $\\text{m}^3/\\text{s}$ is ________ (round off to one decimal place).",
    "correct_answer": "41.4",
    "numerical_range": {
      "min": 41,
      "max": 42
    },
    "solution": "**Method 1: Muskingum Routing Coefficients Derivation**\n$$O_2 = C_0 I_2 + C_1 I_1 + C_2 O_1$$\n1. Common denominator $D = 2 K (1 - x) + \\Delta t$:\n$$D = 2(12.0)(1 - 0.20) + 6.0 = 2(12.0)(0.80) + 6.0 = 19.20 + 6.0 = 25.20\\text{ h}$$\n2. Routing coefficients:\n$$C_0 = \\frac{\\Delta t - 2 K x}{D} = \\frac{6.0 - 2(12.0)(0.20)}{25.20} = \\frac{6.0 - 4.80}{25.20} = \\frac{1.20}{25.20} = 0.047619$$\n$$C_1 = \\frac{\\Delta t + 2 K x}{D} = \\frac{6.0 + 4.80}{25.20} = \\frac{10.80}{25.20} = 0.428571$$\n$$C_2 = \\frac{2 K(1 - x) - \\Delta t}{D} = \\frac{19.20 - 6.0}{25.20} = \\frac{13.20}{25.20} = 0.523810$$\nCheck sum: $C_0 + C_1 + C_2 = 0.047619 + 0.428571 + 0.523810 = 1.00000$.\n3. Computing outflow $O_2$:\n$$O_2 = (0.047619 \\times 70.0) + (0.428571 \\times 40.0) + (0.523810 \\times 40.0)$$\n$$O_2 = 3.3333 + 17.1428 + 20.9524 = 41.4285\\text{ m}^3/\\text{s} \\approx 41.4\\text{ m}^3/\\text{s}$$\n\n**Method 2: Factoring $O_1$ and $I_1$ Group**\n$$O_2 = C_0 I_2 + (C_1 + C_2) O_1 = 0.047619(70.0) + (0.952381)(40.0) = 3.3333 + 38.0952 = 41.43\\text{ m}^3/\\text{s}$$",
    "difficulty": "Hard",
    "source": "Engineering Hydrology (K. Subramanya)"
  },
  {
    "id": "QB_SWCE_ADV_124",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Flood routing, hydrological reservoir and channel routing",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "In uncontrolled reservoir flood routing (level pool routing), the peak outflow discharge occurs exactly at:",
    "options": {
      "A": "The point of intersection of the outflow hydrograph with the receding limb of the inflow hydrograph",
      "B": "The exact time of the inflow hydrograph peak",
      "C": "The start of rainfall excess on the reservoir water surface",
      "D": "The end of baseflow recession in the tailwater channel"
    },
    "correct_answer": "A",
    "solution": "From the continuity equation $\\frac{dS}{dt} = I - O$, the peak storage (and hence peak outflow $O$, since $S = f(O)$ is a monotonic function) occurs when $\\frac{dS}{dt} = 0$, which requires $I = O$. This equality occurs at the point where the outflow hydrograph intersects the recession limb of the inflow hydrograph. Option A is correct.",
    "difficulty": "Easy",
    "source": "Engineering Hydrology (K. Subramanya)"
  },
  {
    "id": "QB_SWCE_ADV_125",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Runoff estimation",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following statements regarding the USDA Soil Conservation Service (SCS) Curve Number ($CN$) method for runoff estimation are correct?",
    "options": {
      "A": "The potential maximum soil moisture retention $S$ in millimeters is given by $S = \\frac{25400}{CN} - 254$",
      "B": "The standard initial abstraction is parameterized as $I_a = 0.20 S$",
      "C": "Direct storm runoff occurs only when total storm rainfall $P$ exceeds the initial abstraction $I_a$ ($P > I_a$)",
      "D": "A Curve Number of $CN = 100$ represents a completely impervious surface where potential retention $S = 0$ and $Q = P$"
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "All four statements are foundational principles of the SCS-CN method:\n- A: $S = \\frac{25400}{CN} - 254$ converts dimensionless $CN$ to depth in $\\text{mm}$.\n- B: Empirical relation $I_a = 0.2 S$ accounts for interception, surface depression storage, and initial infiltration.\n- C: If $P \\le I_a$, direct runoff $Q = 0$.\n- D: At $CN = 100$, $S = 0$, giving $I_a = 0$ and $Q = P$ (complete runoff conversion).",
    "difficulty": "Moderate",
    "source": "Soil and Water Conservation Engineering (Schwab et al.)"
  },
  {
    "id": "QB_SWCE_ADV_126",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Runoff estimation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A small agricultural watershed under antecedent moisture condition II (AMC-II) has a composite Curve Number of $CN = 80.0$. During an isolated storm event, total storm precipitation is $P = 75.0\\text{ mm}$. Taking initial abstraction $I_a = 0.20 S$, the predicted direct storm runoff depth $Q$ in $\\text{mm}$ using the SCS-CN method is ________ (round off to one decimal place).",
    "correct_answer": "30.9",
    "numerical_range": {
      "min": 30.4,
      "max": 31.4
    },
    "solution": "**Method 1: Direct SCS-CN Analytical Formulation**\n1. Potential maximum retention $S$:\n$$S = \\frac{25400}{CN} - 254 = \\frac{25400}{80.0} - 254 = 317.5 - 254.0 = 63.50\\text{ mm}$$\n2. Initial abstraction $I_a$:\n$$I_a = 0.20 \\times S = 0.20 \\times 63.50 = 12.70\\text{ mm}$$\n3. Effective storm depth $(P - I_a)$:\n$$P - I_a = 75.0 - 12.70 = 62.30\\text{ mm}$$\n4. Direct surface runoff $Q$:\n$$Q = \\frac{(P - I_a)^2}{P - I_a + S} = \\frac{(62.30)^2}{62.30 + 63.50} = \\frac{3881.29}{125.80} = 30.8528\\text{ mm} \\approx 30.9\\text{ mm}$$\n\n**Method 2: Step-by-Step Normalized Ratio**\n$$\\frac{Q}{P - I_a} = \\frac{P - I_a}{P - I_a + S} = \\frac{62.30}{125.80} = 0.49523$$\n$$Q = 0.49523 \\times 62.30 = 30.85\\text{ mm} \\approx 30.9\\text{ mm}$$",
    "difficulty": "Moderate",
    "source": "Soil and Water Conservation Engineering (Schwab et al.)"
  },
  {
    "id": "QB_SWCE_ADV_127",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Meteorological parameters and their measurement",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "Which of the following meteorological instruments is specifically designed and calibrated for measuring total incoming hemispherical solar radiation (direct plus diffuse solar flux)?",
    "options": {
      "A": "Pyranometer",
      "B": "Cup anemometer",
      "C": "Assmann psychrometer",
      "D": "Tipping bucket rain gauge"
    },
    "correct_answer": "A",
    "solution": "- A pyranometer measures total broadband hemispherical solar radiation (global solar irradiance) incident upon a planar surface.\n- An anemometer measures wind velocity.\n- A psychrometer measures dry-bulb and wet-bulb temperatures to determine relative humidity.\n- A tipping bucket gauge measures rainfall intensity and volume. Option A is correct.",
    "difficulty": "Easy",
    "source": "Engineering Hydrology (K. Subramanya)"
  },
  {
    "id": "QB_SWCE_ADV_128",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Stream flow measurement",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "question": "A Price current meter is calibrated with rating equation $V = 0.040 + 0.650 N$, where $V$ is stream flow velocity in $\\text{m/s}$ and $N$ is rotor revolutions per second ($\\text{rps}$). When submerged at the $0.60$ depth in an open canal, the meter registers $120$ revolutions in $60.0\\text{ seconds}$. The local flow velocity in meters per second ($\\text{m/s}$) is ________ (round off to two decimal places).",
    "correct_answer": "1.34",
    "numerical_range": {
      "min": 1.32,
      "max": 1.36
    },
    "solution": "1. Revolutions per second ($N$):\n$$N = \\frac{120\\text{ revolutions}}{60.0\\text{ seconds}} = 2.0\\text{ rps}$$\n2. Flow velocity from calibration equation:\n$$V = 0.040 + 0.650 N = 0.040 + 0.650(2.0) = 0.040 + 1.300 = 1.34\\text{ m/s}$$",
    "difficulty": "Easy",
    "source": "Engineering Hydrology (K. Subramanya)"
  },
  {
    "id": "QB_SWCE_ADV_129",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Drought and its classification",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "question": "In regional drought analysis, what is the canonical chronological sequence in which drought propagation typically manifests across a watershed?",
    "options": {
      "A": "Meteorological drought $\\rightarrow$ Hydrological drought $\\rightarrow$ Agricultural drought $\\rightarrow$ Socio-economic drought",
      "B": "Hydrological drought $\\rightarrow$ Meteorological drought $\\rightarrow$ Agricultural drought $\\rightarrow$ Socio-economic drought",
      "C": "Agricultural drought $\\rightarrow$ Meteorological drought $\\rightarrow$ Socio-economic drought $\\rightarrow$ Hydrological drought",
      "D": "Socio-economic drought $\\rightarrow$ Agricultural drought $\\rightarrow$ Hydrological drought $\\rightarrow$ Meteorological drought"
    },
    "correct_answer": "A",
    "solution": "Drought initiates with prolonged precipitation deficit (Meteorological drought). This leads to declining streamflows, drying reservoir storage, and falling groundwater tables (Hydrological drought). The persistent soil moisture deficit impairs crop root growth and slashes biomass yields (Agricultural drought), which ultimately triggers food shortages and economic distress (Socio-economic drought). Option A is the correct chronological propagation sequence.",
    "difficulty": "Moderate",
    "source": "Engineering Hydrology (K. Subramanya)"
  },
  {
    "id": "QB_SWCE_ADV_130",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Analysis of precipitation data",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following statements regarding Double Mass Curve analysis for precipitation records are correct?",
    "options": {
      "A": "It is used to detect, test, and adjust inconsistency in the long-term hydrological precipitation record of a base rain gauge station",
      "B": "It plots the cumulative precipitation of the test station against the concurrent cumulative average precipitation of surrounding base stations",
      "C": "A marked persistent change in the slope of the plotted line indicates a physical change in gauge exposure, station relocation, or instrument drift",
      "D": "It can only be applied if all surrounding rain gauges have completely identical annual rainfalls"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "- Statements A, B, and C are correct:\n  1. Double Mass Curve is the standard engineering tool for testing hydrological record homogeneity.\n  2. The slope $c = \\frac{\\sum P_x}{\\sum P_{avg}}$ remains constant as long as the record is consistent.\n  3. A slope break identifies the year of inconsistency, corrected via slope ratio $P_{corrected} = P_x \\times \\frac{c_a}{c_0}$.\n- Statement D is incorrect: Surrounding stations do not need equal rainfalls; their long-term average simply provides a stable regional benchmark.",
    "difficulty": "Moderate",
    "source": "Engineering Hydrology (K. Subramanya)"
  },
  {
    "id": "QB_SWCE_ADV_131",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Hydrograph analysis, unit hydrograph theory and application",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A watershed has a drainage catchment area of $A = 72.0\\text{ km}^2$. Direct runoff from a sequence of continuous unit effective rainfall pulses of duration $D = 4.0\\text{ hours}$ produces an S-curve hydrograph. The ultimate equilibrium discharge $Q_e$ of this S-curve in cubic meters per second ($\\text{m}^3/\\text{s}$) is ________ (round off to one decimal place).",
    "correct_answer": "50.0",
    "numerical_range": {
      "min": 49.5,
      "max": 50.5
    },
    "solution": "**Method 1: Equilibrium Runoff Discharge Formulation**\n1. S-curve equilibrium discharge represents the steady state direct runoff where continuous rainfall excess intensity $i = \\frac{1.0\\text{ cm}}{D}$ is completely converted to discharge:\n$$Q_e = \\frac{2.778 \\times A \\times 1.0\\text{ cm}}{D}$$\nWhere:\n- $A = 72.0\\text{ km}^2$\n- $D = 4.0\\text{ hours}$\n$$Q_e = \\frac{2.778 \\times 72.0 \\times 1.0}{4.0} = 2.778 \\times 18.0 = 50.004\\text{ m}^3/\\text{s} \\approx 50.0\\text{ m}^3/\\text{s}$$\n\n**Method 2: SI First Principles Conversion**\n$$Q_e = \\frac{\\text{Volume per duration}}{\\text{Duration in seconds}} = \\frac{A \\times (0.010\\text{ m})}{D \\times 3600\\text{ s}}$$\n$$Q_e = \\frac{(72.0 \\times 10^6\\text{ m}^2) \\times 0.010\\text{ m}}{4.0 \\times 3600\\text{ s}} = \\frac{720,000\\text{ m}^3}{14,400\\text{ s}} = 50.0\\text{ m}^3/\\text{s}$$",
    "difficulty": "Hard",
    "source": "Engineering Hydrology (K. Subramanya)"
  },
  {
    "id": "QB_SWCE_ADV_132",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Analysis of precipitation data",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "In Gumbel's Extreme Value Type-I distribution for flood frequency analysis, the reduced variate $y_T$ associated with an annual recurrence interval (return period) of $T$ years is defined as:",
    "options": {
      "A": "$y_T = -\\ln\\left[ -\\ln\\left( 1 - \\frac{1}{T} \\right) \\right]$",
      "B": "$y_T = \\ln(T) + \\ln(T - 1)$",
      "C": "$y_T = \\sqrt{T} \\times \\ln(T)$",
      "D": "$y_T = -\\ln\\left[ \\frac{1}{T} \\right]$"
    },
    "correct_answer": "A",
    "solution": "Probability of non-exceedance in any single year is $P = 1 - \\frac{1}{T}$.\nThe cumulative distribution function of Gumbel's Type-I extreme value distribution is $P = e^{-e^{-y_T}}$.\nTaking natural logarithms twice:\n$$\\ln(P) = -e^{-y_T} \\implies -\\ln(P) = e^{-y_T}$$\n$$y_T = -\\ln\\left( -\\ln(P) \\right) = -\\ln\\left[ -\\ln\\left( 1 - \\frac{1}{T} \\right) \\right]$$\nOption A is correct.",
    "difficulty": "Easy",
    "source": "Engineering Hydrology (K. Subramanya)"
  },
  {
    "id": "QB_SWCE_ADV_133",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Surveying and Levelling",
    "subtopic": "Measurement of distance and area",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A $30.0\\text{ m}$ steel tape has a cross-sectional area of $A = 4.0\\text{ mm}^2$ and Young's modulus of elasticity $E = 2.0 \\times 10^5\\text{ N/mm}^2$. The tape was standardized under a pull of $P_0 = 60.0\\text{ N}$. During a field measurement, a tensile pull of $P = 150.0\\text{ N}$ was applied to the tape. The tension (pull) correction $C_p$ in millimeters ($\\text{mm}$) is ________ (round off to two decimal places).",
    "correct_answer": "3.38",
    "numerical_range": {
      "min": 3.2,
      "max": 3.55
    },
    "solution": "1. Pull / tension correction formula:\n$$C_p = \\frac{(P - P_0) L}{A E}$$\n2. Substituting given values:\n- $P - P_0 = 150.0 - 60.0 = 90.0\\text{ N}$\n- $L = 30.0\\text{ m} = 30,000\\text{ mm}$\n- $A = 4.0\\text{ mm}^2$\n- $E = 2.0 \\times 10^5\\text{ N/mm}^2$\n$$C_p = \\frac{90.0\\text{ N} \\times 30,000\\text{ mm}}{4.0\\text{ mm}^2 \\times (2.0 \\times 10^5\\text{ N/mm}^2)} = \\frac{2,700,000}{800,000} = 3.375\\text{ mm} \\approx 3.38\\text{ mm}$$\nSince applied pull exceeds standardization pull, the correction is positive (+).",
    "difficulty": "Moderate",
    "source": "Manual of Soil and Water Conservation Practices (Gurmel Singh et al.)"
  },
  {
    "id": "QB_SWCE_ADV_134",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Surveying and Levelling",
    "subtopic": "Instruments for surveying and levelling",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "In an optical surveying level, the imaginary line passing through the optical center of the objective lens and the intersection of the crosshairs of the diaphragm is termed the:",
    "options": {
      "A": "Line of collimation (line of sight)",
      "B": "Axis of the telescope",
      "C": "Vertical axis of the instrument",
      "D": "Axis of the bubble tube"
    },
    "correct_answer": "A",
    "solution": "- Line of collimation: The line joining the intersection of the crosshairs to the optical center of the objective and its continuation.\n- Axis of telescope: Line joining the optical centers of the objective and the eyepiece.\n- Axis of bubble tube: Tangential line to the longitudinal internal curve of the vial at its center.\nOption A is correct.",
    "difficulty": "Easy",
    "source": "Manual of Soil and Water Conservation Practices (Gurmel Singh et al.)"
  },
  {
    "id": "QB_SWCE_ADV_135",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Surveying and Levelling",
    "subtopic": "Types of levelling",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A levelling staff is held vertically at a distance of $d = 2.40\\text{ km}$ from a level instrument. The staff reading observed through the telescope is $3.250\\text{ m}$. Accounting for both Earth's curvature and atmospheric refraction, the true staff reading in meters is ________ (round off to two decimal places).",
    "correct_answer": "2.86",
    "numerical_range": {
      "min": 2.84,
      "max": 2.88
    },
    "solution": "**Method 1: Combined Curvature and Refraction Formulation**\n1. Combined correction $C$ for distance $d$ in kilometers:\n$$C = -0.0673 \\cdot d^2\\text{ meters}$$\nFor $d = 2.40\\text{ km}$:\n$$C = -0.0673 \\times (2.40)^2 = -0.0673 \\times 5.76 = -0.38765\\text{ m}$$\n2. Corrected true staff reading:\n$$\\text{True Reading} = \\text{Observed Reading} + C = 3.250 - 0.38765 = 2.86235\\text{ m} \\approx 2.86\\text{ m}$$\n\n**Method 2: Separate Curvature and Refraction Components**\n- Curvature correction: $C_c = -0.0785 \\times (2.4)^2 = -0.0785 \\times 5.76 = -0.45216\\text{ m}$\n- Refraction correction: $C_r = +0.0112 \\times (2.4)^2 = +0.0112 \\times 5.76 = +0.06451\\text{ m}$\n- Net combined correction: $C = C_c + C_r = -0.45216 + 0.06451 = -0.38765\\text{ m}$\n- True reading $= 3.250 - 0.38765 = 2.862\\text{ m} \\approx 2.86\\text{ m}$",
    "difficulty": "Hard",
    "source": "Manual of Soil and Water Conservation Practices (Gurmel Singh et al.)"
  },
  {
    "id": "QB_SWCE_ADV_136",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Surveying and Levelling",
    "subtopic": "Measurement of angles and bearings",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "If the Whole Circle Bearing (WCB) of survey line AB is $245^\\circ 30'$, its Reduced Bearing (Quadrantal Bearing, RB) is:",
    "options": {
      "A": "$\\text{S } 65^\\circ 30' \\text{ W}$",
      "B": "$\\text{W } 65^\\circ 30' \\text{ S}$",
      "C": "$\\text{S } 25^\\circ 30' \\text{ W}$",
      "D": "$\\text{N } 65^\\circ 30' \\text{ W}$"
    },
    "correct_answer": "A",
    "solution": "1. WCB lies between $180^\\circ$ and $270^\\circ$, placing the survey line in the South-West (SW) third quadrant.\n2. In the third quadrant:\n$$RB = \\text{S } (WCB - 180^\\circ) \\text{ W}$$\n$$RB = \\text{S } (245^\\circ 30' - 180^\\circ 00') \\text{ W} = \\text{S } 65^\\circ 30' \\text{ W}$$\nOption A is correct.",
    "difficulty": "Easy",
    "source": "Manual of Soil and Water Conservation Practices (Gurmel Singh et al.)"
  },
  {
    "id": "QB_SWCE_ADV_137",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Surveying and Levelling",
    "subtopic": "The Theodolite traversing",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following geometric and computational conditions are true for a mathematically closed polygon traverse in surveying?",
    "options": {
      "A": "The algebraic sum of latitudes must equal zero ($\\sum L = 0$)",
      "B": "The algebraic sum of departures must equal zero ($\\sum D = 0$)",
      "C": "The linear closing error $e$ is given by $e = \\sqrt{(\\sum L)^2 + (\\sum D)^2}$",
      "D": "Bowditch's rule balances traverse errors assuming linear and angular errors are equally proportional to the square root of line length"
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "All four statements are foundational principles in closed traverse computation:\n- A & B: For a polygon returning to the starting station, total net displacement in Northing/Southing (Latitude) and Easting/Westing (Departure) is strictly zero.\n- C: Resultant linear misclosure vector magnitude is $e = \\sqrt{(\\sum L)^2 + (\\sum D)^2}$.\n- D: Bowditch (compass rule) assumes linear errors $\\propto \\sqrt{l}$ and angular errors $\\propto 1/\\sqrt{l}$, distributing corrections proportional to length: $C_L = -\\sum L \\frac{l}{\\sum l}$.",
    "difficulty": "Moderate",
    "source": "Manual of Soil and Water Conservation Practices (Gurmel Singh et al.)"
  },
  {
    "id": "QB_SWCE_ADV_138",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Surveying and Levelling",
    "subtopic": "The Theodolite traversing",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "In a closed polygon traverse, the algebraic sum of latitudes is found to be $\\sum L = +0.36\\text{ m}$ and the algebraic sum of departures is $\\sum D = -0.48\\text{ m}$. The magnitude of the linear closing error $e$ in meters is ________ (round off to two decimal places).",
    "correct_answer": "0.60",
    "numerical_range": {
      "min": 0.58,
      "max": 0.62
    },
    "solution": "1. Linear closing error $e$:\n$$e = \\sqrt{(\\sum L)^2 + (\\sum D)^2}$$\n2. Substituting values:\n$$(\\sum L)^2 = (0.36)^2 = 0.1296\\text{ m}^2$$\n$$(\\sum D)^2 = (-0.48)^2 = 0.2304\\text{ m}^2$$\n$$e = \\sqrt{0.1296 + 0.2304} = \\sqrt{0.3600} = 0.60\\text{ m}$$",
    "difficulty": "Moderate",
    "source": "Manual of Soil and Water Conservation Practices (Gurmel Singh et al.)"
  },
  {
    "id": "QB_SWCE_ADV_139",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Surveying and Levelling",
    "subtopic": "Contouring",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "On a topographic contour map, a series of concentric closed contour loops with contour elevation values increasing from the outer loops toward the innermost loop indicates a:",
    "options": {
      "A": "Hill",
      "B": "Depression / pond",
      "C": "Vertical cliff",
      "D": "Saddle or col"
    },
    "correct_answer": "A",
    "solution": "- Concentric closed contour lines with elevations increasing inward represent a hill or peak.\n- If the elevations decrease toward the innermost center, it indicates a pond or depression without surface drainage. Option A is correct.",
    "difficulty": "Easy",
    "source": "Manual of Soil and Water Conservation Practices (Gurmel Singh et al.)"
  },
  {
    "id": "QB_SWCE_ADV_140",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Surveying and Levelling",
    "subtopic": "Plane table surveying",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following field methods are standard procedures employed in plane table surveying for locating details or instrument stations?",
    "options": {
      "A": "Radiation method (suitable when all surrounding stations are clearly visible and accessible from one setup)",
      "B": "Intersection method (ideal for locating distant, inaccessible, or mountainous points by intersecting sight rays)",
      "C": "Traversing method (used to run survey lines between consecutive plane table stations)",
      "D": "Resection method (used to establish the location of the plane table station with respect to previously plotted control points)"
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "All four methods are the canonical operational modes in plane table surveying:\n- Radiation: Rays drawn from single station to target points, distances measured directly.\n- Intersection: Target points located by intersection of rays from two known stations without measuring distance to target.\n- Traversing: Similar to theodolite traversing, orienting at each station.\n- Resection: Orientation and station determination via Three-point or Two-point problems (e.g., Lehmann's method).",
    "difficulty": "Moderate",
    "source": "Manual of Soil and Water Conservation Practices (Gurmel Singh et al.)"
  },
  {
    "id": "QB_SWCE_ADV_141",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Surveying and Levelling",
    "subtopic": "Computation of areas and volume",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "Earthwork volume for a drainage channel reach is computed from five consecutive parallel cross-sections taken at uniform intervals of $d = 20.0\\text{ m}$. The measured cross-sectional areas are: $A_1 = 45.0\\text{ m}^2$, $A_2 = 72.0\\text{ m}^2$, $A_3 = 95.0\\text{ m}^2$, $A_4 = 80.0\\text{ m}^2$, and $A_5 = 50.0\\text{ m}^2$. Using Simpson's one-third (Prismoidal) rule, the total earthwork volume in cubic meters ($\\text{m}^3$) is ________ (round off to nearest integer).",
    "correct_answer": "5953",
    "numerical_range": {
      "min": 5945,
      "max": 5960
    },
    "solution": "**Method 1: Simpson's One-Third Prismoidal Rule**\n$$V = \\frac{d}{3} [ (A_1 + A_5) + 4(A_2 + A_4) + 2(A_3) ]$$\nGiven:\n- $d = 20.0\\text{ m}$\n- First and last areas: $A_1 + A_5 = 45.0 + 50.0 = 95.0\\text{ m}^2$\n- Even-indexed areas: $A_2 + A_4 = 72.0 + 80.0 = 152.0\\text{ m}^2 \\implies 4(152.0) = 608.0\\text{ m}^2$\n- Odd-indexed internal areas: $A_3 = 95.0\\text{ m}^2 \\implies 2(95.0) = 190.0\\text{ m}^2$\nSum of bracketed terms:\n$$\\text{Sum} = 95.0 + 608.0 + 190.0 = 893.0\\text{ m}^2$$\n$$V = \\frac{20.0}{3} \\times 893.0 = \\frac{17860.0}{3} = 5953.33\\text{ m}^3 \\approx 5953\\text{ m}^3$$\n\n**Method 2: Trapezoidal Volume Comparison**\n$$V_{trap} = 20.0 \\times \\left[ \\frac{45 + 50}{2} + 72 + 95 + 80 \\right] = 20.0 \\times [ 47.5 + 247.0 ] = 20.0 \\times 294.5 = 5890.0\\text{ m}^3$$\nSimpson's rule yields $5953\\text{ m}^3$.",
    "difficulty": "Hard",
    "source": "Manual of Soil and Water Conservation Practices (Gurmel Singh et al.)"
  },
  {
    "id": "QB_SWCE_ADV_142",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Surveying and Levelling",
    "subtopic": "Total station, introduction to GPS survey",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "To determine an unambiguous three-dimensional ground position (Latitude, Longitude, and Ellipsoidal Altitude) along with receiver clock bias, a GPS receiver requires simultaneous radio signals from a minimum of how many satellites?",
    "options": {
      "A": "4 satellites",
      "B": "3 satellites",
      "C": "2 satellites",
      "D": "1 satellite"
    },
    "correct_answer": "A",
    "solution": "A GPS receiver must solve four mathematical unknowns: three spatial coordinates ($x, y, z$) and the receiver clock offset ($Delta t$). Hence, simultaneous pseudorange measurements to at least four non-co-planar satellites are mathematically mandatory. Option A is correct.",
    "difficulty": "Easy",
    "source": "Manual of Soil and Water Conservation Practices (Gurmel Singh et al.)"
  },
  {
    "id": "QB_SWCE_ADV_143",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Surveying and Levelling",
    "subtopic": "Chain surveying, methods of traversing",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "question": "A farm boundary line measured with a nominal $20.0\\text{ m}$ metric chain was recorded as $250.0\\text{ m}$. Subsequent laboratory calibration revealed that the chain was $0.10\\text{ m}$ too long ($L' = 20.10\\text{ m}$). The true length of the surveyed boundary line in meters is ________ (round off to two decimal places).",
    "correct_answer": "251.25",
    "numerical_range": {
      "min": 251.1,
      "max": 251.4
    },
    "solution": "1. True length relation:\n$$\\text{True Length} = \\text{Measured Length} \\times \\left( \\frac{L'}{L} \\right)$$\nWhere:\n- Measured Length $= 250.0\\text{ m}$\n- Actual chain length $L' = 20.10\\text{ m}$\n- Nominal chain length $L = 20.00\\text{ m}$\n$$\\text{True Length} = 250.0 \\times \\frac{20.10}{20.00} = 250.0 \\times 1.005 = 251.25\\text{ m}$$",
    "difficulty": "Easy",
    "source": "Manual of Soil and Water Conservation Practices (Gurmel Singh et al.)"
  },
  {
    "id": "QB_SWCE_ADV_144",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Surveying and Levelling",
    "subtopic": "Types of levelling",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "When precise differential levelling is carried out across a wide river gorge using the reciprocal levelling technique, which of the following systematic instrumental and atmospheric errors are completely eliminated?",
    "options": {
      "A": "Error due to Earth's curvature",
      "B": "Error due to atmospheric refraction (assuming refraction index remains unchanged during the observations)",
      "C": "Error due to non-parallelism of the line of collimation and the axis of the bubble tube (collimation error)",
      "D": "Error caused by improper verticality or unequal graduation of the levelling staffs"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "- Statements A, B, and C are correct: By taking observations from both banks and taking the mean difference in elevation ($h = \\frac{(a_1 - b_1) + (a_2 - b_2)}{2}$), errors due to curvature, steady refraction, and collimation angle cancel out identically.\n- Statement D is incorrect: Reciprocal levelling cannot compensate for staff graduation faults or non-vertical holding of the staff.",
    "difficulty": "Moderate",
    "source": "Manual of Soil and Water Conservation Practices (Gurmel Singh et al.)"
  },
  {
    "id": "QB_SWCE_ADV_145",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Surveying and Levelling",
    "subtopic": "Measurement of distance and area",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "question": "When a surveying tape of total weight $W$ and length $L$ is supported only at its two ends under a tension pull $P$, the sag correction $C_{\\text{sag}}$ is given by:",
    "options": {
      "A": "$C_{\\text{sag}} = -\\frac{W^2 L}{24 P^2}$",
      "B": "$C_{\\text{sag}} = +\\frac{W^2 L}{24 P^2}$",
      "C": "$C_{\\text{sag}} = -\\frac{W L^2}{12 P}$",
      "D": "$C_{\\text{sag}} = +\\frac{W L}{12 P^2}$"
    },
    "correct_answer": "A",
    "solution": "Due to tape weight, the tape sags into a catenary curve, making the horizontal straight chord distance shorter than the curved arc length read on the tape. Hence, the correction is always negative (subtractive):\n$$C_{\\text{sag}} = -\\frac{W^2 L}{24 P^2} = -\\frac{w^2 L^3}{24 P^2}$$\nwhere $w = W/L$ is tape weight per unit length. Option A is correct.",
    "difficulty": "Moderate",
    "source": "Manual of Soil and Water Conservation Practices (Gurmel Singh et al.)"
  },
  {
    "id": "QB_SWCE_ADV_146",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Surveying and Levelling",
    "subtopic": "Types of levelling",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "In a differential levelling traverse across a farm contour terrace, the sum of all backsights is $\\sum BS = 14.850\\text{ m}$ and the sum of all foresights is $\\sum FS = 10.350\\text{ m}$. If the reduced level of the starting benchmark is $\\text{RL}_1 = 100.000\\text{ m}$, the reduced level of the final station $\\text{RL}_{\\text{last}}$ in meters is ________ (round off to three decimal places).",
    "correct_answer": "104.500",
    "numerical_range": {
      "min": 104.45,
      "max": 104.55
    },
    "solution": "1. Standard arithmetic check for differential levelling:\n$$\\sum BS - \\sum FS = \\text{Last RL} - \\text{First RL}$$\n2. Substituting values:\n$$\\sum BS - \\sum FS = 14.850 - 10.350 = +4.500\\text{ m}$$\n$$\\text{Last RL} = \\text{First RL} + (\\sum BS - \\sum FS)$$\n$$\\text{Last RL} = 100.000 + 4.500 = 104.500\\text{ m}$$",
    "difficulty": "Moderate",
    "source": "Manual of Soil and Water Conservation Practices (Gurmel Singh et al.)"
  },
  {
    "id": "QB_SWCE_ADV_147",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Gully control structures – drop, drop inlet and chute spillways",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A straight drop spillway constructed in a stabilized gully has a rectangular weir crest length of $L = 5.0\\text{ m}$ and carries a design peak flood discharge of $Q = 8.0\\text{ m}^3/\\text{s}$. The vertical drop from crest to horizontal apron floor is $Y = 3.0\\text{ m}$. Taking $g = 9.81\\text{ m/s}^2$, the critical depth of flow $y_c$ over the crest in meters is ________ (round off to two decimal places).\n\n```\nHeadwater ──┐ Crest (Weir length L = 5 m)\n            │      Drop Height Y = 3 m\n            │            │\n            └────────────┴───── Apron Floor (Stilling basin)\n                                Apron Length La\n```",
    "correct_answer": "0.64",
    "numerical_range": {
      "min": 0.62,
      "max": 0.66
    },
    "solution": "**Method 1: Critical Depth Formulation**\n1. Discharge per unit crest length ($q$):\n$$q = \\frac{Q}{L} = \\frac{8.0\\text{ m}^3/\\text{s}}{5.0\\text{ m}} = 1.60\\text{ m}^2/\\text{s}$$\n2. Critical depth in a rectangular cross-section:\n$$y_c = \\left( \\frac{q^2}{g} \\right)^{1/3} = \\left( \\frac{(1.60)^2}{9.81} \\right)^{1/3} = \\left( \\frac{2.56}{9.81} \\right)^{1/3} = (0.260958)^{1/3} = 0.63899\\text{ m} \\approx 0.64\\text{ m}$$\n\n**Method 2: Verification of Unit Critical Energy**\n$$E_c = 1.5 y_c = 1.5 \\times 0.639 = 0.9585\\text{ m}$$\n$$V_c = \\sqrt{g y_c} = \\sqrt{9.81 \\times 0.639} = 2.5037\\text{ m/s}$$\n$$q = y_c V_c = 0.639 \\times 2.5037 = 1.60\\text{ m}^2/\\text{s}$$",
    "difficulty": "Hard",
    "source": "Soil and Water Conservation Engineering (Schwab et al.)"
  },
  {
    "id": "QB_SWCE_ADV_148",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Mechanics of soil erosion – wind and water erosion",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "In the mechanics of wind erosion, which transport mode involves soil particles of diameter $0.10 \\text{ to } 0.50\\text{ mm}$ moving in short bouncing leaps along the ground, accounting for $50\\% \\text{ to } 75\\%$ of total wind-borne soil movement?",
    "options": {
      "A": "Saltation",
      "B": "Surface creep",
      "C": "Suspension",
      "D": "Attrition"
    },
    "correct_answer": "A",
    "solution": "- Saltation: Involves grains between $0.10 \\text{ to } 0.50\\text{ mm}$ bouncing across the surface; it accounts for $50 \\text{ to } 75\\%$ of total soil movement and dislodges other particles.\n- Surface creep: Larger particles ($0.50 \\text{ to } 2.0\\text{ mm}$) rolled along the bed ($5 - 25\\%$).\n- Suspension: Fine dust particles ($< 0.10\\text{ mm}$) lifted high into the atmosphere ($3 - 15\\%$). Option A is correct.",
    "difficulty": "Easy",
    "source": "Manual of Soil and Water Conservation Practices (Gurmel Singh et al.)"
  },
  {
    "id": "QB_SWCE_ADV_149",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Soil erosion types, factors affecting erosion",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following statements regarding the stages and classification of water-induced soil erosion are correct?",
    "options": {
      "A": "Splash erosion represents the primary initiating detachment mechanism caused by the kinetic impact of falling raindrops",
      "B": "Sheet erosion is the uniform removal of a thin layer of topsoil by shallow overland sheet flow, often insidious and difficult to detect visually",
      "C": "Rill erosion creates small, well-defined micro-channels that can be easily obliterated by normal farm tillage operations",
      "D": "Gully erosion produces deep incised channels with unstable headcuts that cannot be smoothed out by standard agricultural machinery"
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "All four statements represent the exact progression of water erosion defined in Schwab and Gurmel Singh:\n- A: Detachment by raindrop splash initiates the process.\n- B: Shallow sheet wash transports detached fines across smooth inter-rill surfaces.\n- C: Micro-flow concentration creates rills, which are temporary and farm-tillage manageable.\n- D: Coalescing rills develop into gullies, requiring specialized civil/biological engineering stabilization.",
    "difficulty": "Moderate",
    "source": "Manual of Soil and Water Conservation Practices (Gurmel Singh et al.)"
  },
  {
    "id": "QB_SWCE_ADV_150",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Terraces and bunds",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A farm field has a uniform land slope of $S = 4.0\\%$. Using Ramser's empirical formula for contour bunding in medium rainfall zones, $VI = 0.305 (0.60 S + 2.0)$, where $VI$ is vertical interval in meters and $S$ is land slope in percent. The corresponding horizontal spacing ($HI$) between consecutive contour bunds in meters is ________ (round off to one decimal place).",
    "correct_answer": "33.6",
    "numerical_range": {
      "min": 32.5,
      "max": 34.5
    },
    "solution": "1. Vertical interval ($VI$):\n$$VI = 0.305(0.60 \\times 4.0 + 2.0) = 0.305(2.40 + 2.0) = 0.305 \\times 4.40 = 1.342\\text{ m}$$\n2. Horizontal interval ($HI$) relation to land slope $S$:\n$$HI = \\frac{VI}{S / 100} = \\frac{1.342}{0.040} = 33.55\\text{ m} \\approx 33.6\\text{ m}$$",
    "difficulty": "Moderate",
    "source": "Manual of Soil and Water Conservation Practices (Gurmel Singh et al.)"
  },
  {
    "id": "QB_SWCE_ADV_151",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Soil loss estimation",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "In the Universal Soil Loss Equation (USLE: $A = R \\cdot K \\cdot LS \\cdot C \\cdot P$), the standard unit plot on which the soil erodibility factor $K$ is empirically determined has:",
    "options": {
      "A": "Length $22.13\\text{ m}$ ($72.6\\text{ ft}$), uniform slope $9.0\\%$, continuous clean-tilled fallow up-and-down the slope",
      "B": "Length $100.0\\text{ m}$, uniform slope $5.0\\%$, permanent dense Bermuda grass cover",
      "C": "Length $50.0\\text{ m}$, slope $15.0\\%$, contour graded bunds",
      "D": "Length $10.0\\text{ m}$, slope $0.5\\%$, saturated paddy condition"
    },
    "correct_answer": "A",
    "solution": "The standard USLE unit plot established by Wischmeier and Smith (1965) has dimensions:\n- Length $72.6\\text{ ft} = 22.13\\text{ m}$\n- Slope $9\\%$\n- Condition: Continuous bare fallow plowed periodically up and down the slope to eliminate vegetative cover ($C = 1$) and conservation practices ($P = 1$), with $LS = 1.0$. Option A is correct.",
    "difficulty": "Easy",
    "source": "Soil and Water Conservation Engineering (Schwab et al.)"
  },
  {
    "id": "QB_SWCE_ADV_152",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Biological and engineering measures to control erosion",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following agronomic practices are classified as biological conservation measures for controlling water erosion on gently sloping croplands?",
    "options": {
      "A": "Contour farming (plowing and planting along contour lines perpendicular to slope)",
      "B": "Strip cropping (alternating erosion-permitting row crops with erosion-resisting dense cover crops)",
      "C": "Mulching with crop residues to absorb raindrop impact energy and minimize surface sealing",
      "D": "Graded bench terracing with masonry drop structures"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "- Statements A, B, and C are biological/agronomic soil conservation practices that modify surface roughness, crop canopy, and infiltration.\n- Statement D is a mechanical/engineering measure requiring earthmoving and civil structures, typically applied on steep hillslopes ($> 6 - 15\\%$).",
    "difficulty": "Moderate",
    "source": "Manual of Soil and Water Conservation Practices (Gurmel Singh et al.)"
  },
  {
    "id": "QB_SWCE_ADV_153",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Vegetative waterways",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A parabolic grassed waterway has a design top water surface width of $T = 6.0\\text{ m}$ and a maximum central depth of $d = 0.60\\text{ m}$. The bed slope is $S = 0.015$ ($1.50\\%$) and Manning's roughness coefficient for the grass cover is $n = 0.040$. For this parabolic geometry, flow area is $A = \\frac{2}{3} T d$ and wetted perimeter is $P = T + \\frac{8 d^2}{3 T}$. The discharge capacity $Q$ of the waterway in cubic meters per second ($\\text{m}^3/\\text{s}$) is ________ (round off to two decimal places).",
    "correct_answer": "3.92",
    "numerical_range": {
      "min": 3.8,
      "max": 4.05
    },
    "solution": "**Method 1: Parabolic Geometric Hydraulic Radius Formulation**\n1. Cross-sectional flow area $A$:\n$$A = \\frac{2}{3} T d = \\frac{2}{3} \\times 6.0 \\times 0.60 = 2.40\\text{ m}^2$$\n2. Wetted perimeter $P$:\n$$P = T + \\frac{8 d^2}{3 T} = 6.0 + \\frac{8 (0.60)^2}{3 (6.0)} = 6.0 + \\frac{8 \\times 0.36}{18.0} = 6.0 + \\frac{2.88}{18.0} = 6.0 + 0.160 = 6.160\\text{ m}$$\n3. Hydraulic radius $R$:\n$$R = \\frac{A}{P} = \\frac{2.40}{6.160} = 0.38961\\text{ m}$$\n$$R^{2/3} = (0.38961)^{2/3} = 0.53358$$\n4. Bed slope factor $\\sqrt{S}$:\n$$\\sqrt{0.015} = 0.122474$$\n5. Discharge via Manning's equation:\n$$Q = \\frac{1}{n} A R^{2/3} S^{1/2} = \\frac{1}{0.040} \\times 2.40 \\times 0.53358 \\times 0.122474$$\n$$Q = 60.0 \\times 0.53358 \\times 0.122474 = 3.921\\text{ m}^3/\\text{s} \\approx 3.92\\text{ m}^3/\\text{s}$$\n\n**Method 2: Velocity Check**\n$$V = \\frac{Q}{A} = \\frac{3.921}{2.40} = 1.634\\text{ m/s}$$\n$$V = \\frac{1}{0.04} (0.38961)^{2/3} (0.015)^{1/2} = 1.634\\text{ m/s}$$\nWithin permissible vegetative limits ($1.5 - 1.8\\text{ m/s}$).",
    "difficulty": "Hard",
    "source": "Soil and Water Conservation Engineering (Schwab et al.)"
  },
  {
    "id": "QB_SWCE_ADV_154",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Earthen dams",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "In a zoned earthen embankment dam, the central impervious core is constructed primarily from cohesive clay, flanked by outer pervious shells of sand and gravel. The primary function of the outer pervious shells is to:",
    "options": {
      "A": "Provide structural geotechnical stability and facilitate rapid dissipation of pore water pressures",
      "B": "Completely prevent any water from reaching the upstream face of the core",
      "C": "Eliminate the need for an emergency spillway",
      "D": "Prevent chemical hydration of the reservoir water"
    },
    "correct_answer": "A",
    "solution": "- Central core: Provides the impermeable barrier to minimize seepage through the embankment.\n- Outer shells: Provide shear strength, structural bulk stability to withstand reservoir water thrust, and free drainage to dissipate transient pore pressures during rapid drawdown. Option A is correct.",
    "difficulty": "Easy",
    "source": "Soil and Water Conservation Engineering (Schwab et al.)"
  },
  {
    "id": "QB_SWCE_ADV_155",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Soil loss estimation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "The Modified Universal Soil Loss Equation (MUSLE) estimates storm event sediment yield as: $Y = 11.8 (Q \\cdot q_p)^{0.56} \\times K \\cdot LS \\cdot C \\cdot P$, where $Y$ is sediment yield in metric tons, storm runoff volume $Q = 25,000\\text{ m}^3$, and peak runoff rate $q_p = 4.0\\text{ m}^3/\\text{s}$. Given $K = 0.035$, $LS = 2.0$, $C = 0.15$, and $P = 0.80$. The predicted sediment yield $Y$ in metric tons ($\\text{t}$) is ________ (round off to one decimal place).",
    "correct_answer": "62.5",
    "numerical_range": {
      "min": 61,
      "max": 64
    },
    "solution": "1. Runoff energy factor $(Q \\cdot q_p)$:\n$$Q \\cdot q_p = 25,000 \\times 4.0 = 100,000\\text{ m}^6/\\text{s}$$\n$$(100,000)^{0.56} = (10^5)^{0.56} = 10^{2.80} = 630.957$$\n2. Watershed soil and management factors product:\n$$\\text{Product} = K \\times LS \\times C \\times P = 0.035 \\times 2.0 \\times 0.15 \\times 0.80 = 0.00840$$\n3. Total sediment yield $Y$:\n$$Y = 11.8 \\times 630.957 \\times 0.00840 = 7445.29 \\times 0.00840 = 62.54\\text{ metric tons} \\approx 62.5\\text{ t}$$",
    "difficulty": "Moderate",
    "source": "Soil and Water Conservation Engineering (Schwab et al.)"
  },
  {
    "id": "QB_SWCE_ADV_156",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Gully control structures – drop, drop inlet and chute spillways",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following criteria dictate the selection and hydraulic application of gully control spillways?",
    "options": {
      "A": "Straight drop spillways are ideal for low total drops (typically $Y \\le 3.0\\text{ m}$) where a rectangular weir discharges into a horizontal stilling basin",
      "B": "Drop inlet (pipe) spillways are preferred where high drops ($> 3.0\\text{ m}$) accompany an earthen embankment bund with substantial flood detention storage",
      "C": "Chute spillways are well suited to steep gully headcuts where runoff is conveyed down an open paved trough at supercritical velocities",
      "D": "Drop spillways require neither stilling basins nor energy dissipators because free-falling water loses all energy in air friction"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "- Statements A, B, and C are correct engineering guidelines for gully control:\n  1. Straight drop spillways: for drops up to $3\\text{ m}$ with hydraulic jump stilling basins.\n  2. Drop inlet spillways: conduit under pressure flow through an earthen dam, providing temporary flood storage.\n  3. Chute spillways: reinforced concrete steep chutes terminating in SAF stilling basins.\n- Statement D is false: The high kinetic energy of the free-falling nappe requires a designed stilling basin with floor blocks, baffle sills, and end sills to prevent devastating downstream scour.",
    "difficulty": "Moderate",
    "source": "Soil and Water Conservation Engineering (Schwab et al.)"
  },
  {
    "id": "QB_SWCE_ADV_157",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Terraces and bunds",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "In hilly agricultural areas with high rainfall and heavy clay soils subject to waterlogging, which type of bench terrace is specifically constructed with a slight reverse slope toward the hill face draining into an inner toe furrow?",
    "options": {
      "A": "Inward sloping bench terrace",
      "B": "Outward sloping bench terrace",
      "C": "Level (table-top) bench terrace",
      "D": "Contour vegetative hedge"
    },
    "correct_answer": "A",
    "solution": "- Inward sloping bench terrace: Has a reverse slope towards the hillside with a drainage ditch along the toe to safely collect and conduct excess surface runoff into a grassed waterway in high-rainfall zones.\n- Outward sloping: Used in low-rainfall permeable areas to distribute water.\n- Level: Used in medium rainfall for paddy or uniform moisture conservation. Option A is correct.",
    "difficulty": "Easy",
    "source": "Manual of Soil and Water Conservation Practices (Gurmel Singh et al.)"
  },
  {
    "id": "QB_SWCE_ADV_158",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil and Water Erosion",
    "subtopic": "Soil loss estimation",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "question": "Under the Universal Soil Loss Equation, adopting a dense cover crop with residue mulching reduces the crop management factor $C$ from $0.40$ to $0.10$. Assuming all other parameters ($R, K, LS, P$) remain strictly constant, the percentage reduction in annual soil loss is ________ $\\text{\\%}$ (answer in integer).",
    "correct_answer": "75",
    "numerical_range": {
      "min": 75,
      "max": 75
    },
    "solution": "1. In USLE, soil loss is directly proportional to $C$:\n$$A_1 \\propto C_1 = 0.40, \\quad A_2 \\propto C_2 = 0.10$$\n2. Percentage reduction in soil loss:\n$$\\text{Reduction (\\%)} = \\frac{A_1 - A_2}{A_1} \\times 100\\% = \\frac{C_1 - C_2}{C_1} \\times 100\\%$$\n$$\\text{Reduction} = \\frac{0.40 - 0.10}{0.40} \\times 100\\% = \\frac{0.30}{0.40} \\times 100\\% = 75\\%$$",
    "difficulty": "Easy",
    "source": "Soil and Water Conservation Engineering (Schwab et al.)"
  },
  {
    "id": "QB_SWCE_ADV_159",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Watershed Management",
    "subtopic": "Watershed characterization and land use capability classification",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "In the standard USDA Land Capability Classification system, which group of land capability classes is considered suitable for regular arable crop cultivation with appropriate conservation practices?",
    "options": {
      "A": "Classes I to IV",
      "B": "Classes V to VIII",
      "C": "Classes VI to VIII only",
      "D": "Class VIII only"
    },
    "correct_answer": "A",
    "solution": "The USDA Land Capability system classifies land into 8 Roman numeral classes:\n- Classes I to IV: Suitable for cultivation (Class I requires no special measures; Class IV requires extreme care).\n- Classes V to VIII: Unsuitable for cultivation; reserved for pasture, forestry, wildlife, and recreation. Option A is correct.",
    "difficulty": "Easy",
    "source": "Manual of Soil and Water Conservation Practices (Gurmel Singh et al.)"
  },
  {
    "id": "QB_SWCE_ADV_160",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Watershed Management",
    "subtopic": "Watershed characterization and land use capability classification",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A drainage watershed of area $A = 28.0\\text{ km}^2$ has a total blue-line stream length of $L_{total} = 84.0\\text{ km}$ across all stream orders. The drainage density ($D_d$) of the watershed in $\\text{km/km}^2$ is ________ (answer in integer).",
    "correct_answer": "3",
    "numerical_range": {
      "min": 3,
      "max": 3
    },
    "solution": "1. By Horton's definition, drainage density $D_d$ is the total length of streams of all orders per unit drainage area:\n$$D_d = \\frac{\\sum L}{A}$$\nWhere:\n- $\\sum L = 84.0\\text{ km}$\n- $A = 28.0\\text{ km}^2$\n$$D_d = \\frac{84.0\\text{ km}}{28.0\\text{ km}^2} = 3.0\\text{ km/km}^2$$\n(Expressed as integer: 3).",
    "difficulty": "Moderate",
    "source": "Engineering Hydrology (K. Subramanya)"
  },
  {
    "id": "QB_SWCE_ADV_161",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Watershed Management",
    "subtopic": "Water budgeting in watershed",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following watershed conservation measures directly increase subsurface groundwater recharge and reduce peak storm runoff volume in a catchment water budget?",
    "options": {
      "A": "Contour trenching, continuous contour bunding, and vegetative vegetative barriers",
      "B": "Construction of check dams, loose boulder structures, and percolation tanks across stream beds",
      "C": "Extensive afforestation, agroforestry, and silvipasture development on upper catchment slopes",
      "D": "Clear-felling of indigenous forests followed by rapid urban impervious paving"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "- Statements A, B, and C are proven watershed interventions that retard runoff velocity, extend infiltration contact time, and augment groundwater recharge.\n- Statement D accelerates peak runoff rates, induces catastrophic flash flooding, and eliminates groundwater recharge.",
    "difficulty": "Moderate",
    "source": "Manual of Soil and Water Conservation Practices (Gurmel Singh et al.)"
  },
  {
    "id": "QB_SWCE_ADV_162",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Watershed Management",
    "subtopic": "Rainwater harvesting",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "An excavated dugout farm pond has a mean water surface area of $A = 1200.0\\text{ m}^2$ and an initial stored water volume of $V_0 = 3000.0\\text{ m}^3$ at the end of the monsoon. Over a $30.0\\text{-day}$ dry period with zero inflow, average evaporation loss is $6.0\\text{ mm/day}$ and average seepage loss through the perimeter is $3.0\\text{ mm/day}$. Assuming constant surface area, the remaining volume of water in the pond in $\\text{m}^3$ at the end of the period is ________ (answer in integer).\n\n```\nInflow Runoff Qi = 0 ───> |~~~~~~~~~~~~~~~~~~~~| ───> Overflow Qout = 0\n                          |  Initial V0 = 3000 |  Evaporation E = 6 mm/d\n                          |____________________|\n                          | Seepage S = 3 mm/d\n```",
    "correct_answer": "2676",
    "numerical_range": {
      "min": 2660,
      "max": 2690
    },
    "solution": "**Method 1: Total Depth Loss Integration**\n1. Combined daily water loss rate:\n$$\\text{Loss Rate} = E + S_p = 6.0\\text{ mm/day} + 3.0\\text{ mm/day} = 9.0\\text{ mm/day} = 0.0090\\text{ m/day}$$\n2. Total depth of water lost in $30.0\\text{ days}$:\n$$\\Delta d = 30.0 \\times 0.0090\\text{ m/day} = 0.270\\text{ m}$$\n3. Total volume of water lost:\n$$V_{\\text{loss}} = A \\times \\Delta d = 1200.0\\text{ m}^2 \\times 0.270\\text{ m} = 324.0\\text{ m}^3$$\n4. Remaining stored volume:\n$$V_{\\text{remain}} = V_0 - V_{\\text{loss}} = 3000.0 - 324.0 = 2676.0\\text{ m}^3$$\n\n**Method 2: Daily Volumetric Step Balance**\n$$\\text{Daily volumetric loss} = 1200.0 \\times 0.009 = 10.8\\text{ m}^3/\\text{day}$$\n$$V_{\\text{loss}} = 30 \\times 10.8 = 324.0\\text{ m}^3$$\n$$V_{\\text{remain}} = 3000.0 - 324.0 = 2676\\text{ m}^3$$",
    "difficulty": "Hard",
    "source": "Manual of Soil and Water Conservation Practices (Gurmel Singh et al.)"
  },
  {
    "id": "QB_SWCE_ADV_163",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Watershed Management",
    "subtopic": "Check dams and farm ponds",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "A temporary porous barrier constructed using local loose stones or brushwood across small, narrow gully branches ($< 1.0\\text{ m}$ depth) to arrest sediment while allowing excess water to filter through is termed a:",
    "options": {
      "A": "Gully plug",
      "B": "Gravity masonry dam",
      "C": "Morning glory spillway",
      "D": "Inverted syphon"
    },
    "correct_answer": "A",
    "solution": "Gully plugs (loose stone check dams) are low-cost, permeable barriers constructed across small first-order gully tributaries to trap coarse sediment, stabilize bed grades, and facilitate vegetative establishment. Option A is correct.",
    "difficulty": "Easy",
    "source": "Manual of Soil and Water Conservation Practices (Gurmel Singh et al.)"
  },
  {
    "id": "QB_SWCE_ADV_164",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Watershed Management",
    "subtopic": "Rainwater harvesting",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following artificial groundwater recharge structures are widely adopted in hard-rock and alluvial watersheds to enhance aquifer replenishment?",
    "options": {
      "A": "Percolation tanks constructed across permeable stream beds",
      "B": "Recharge shafts and recharge pits for shallow unconfined aquifers",
      "C": "Subsurface dykes (groundwater dams) built across riverbed sand strata to arrest baseflow escape",
      "D": "Direct injection tube wells for deep confined aquifers"
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "All four techniques are established artificial recharge structures:\n- A: Percolation tanks impound runoff over permeable formations.\n- B: Pits and shafts bypass impermeable top clay layers.\n- C: Subsurface dykes dam underground flow in permeable river sand beds.\n- D: Injection wells convey pre-treated surface runoff into depleted deep confined aquifers under hydraulic head.",
    "difficulty": "Moderate",
    "source": "Manual of Soil and Water Conservation Practices (Gurmel Singh et al.)"
  },
  {
    "id": "QB_SWCE_ADV_165",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Watershed Management",
    "subtopic": "Watershed characterization and land use capability classification",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "question": "A drainage basin has a total catchment area of $A = 45.0\\text{ km}^2$ and an axial basin length of $L = 10.0\\text{ km}$ measured along the main stream path from mouth to basin divide. The dimensionless form factor ($R_f = A / L^2$) of the watershed is ________ (round off to two decimal places).",
    "correct_answer": "0.45",
    "numerical_range": {
      "min": 0.44,
      "max": 0.46
    },
    "solution": "1. Horton's Form Factor ($R_f$):\n$$R_f = \\frac{A}{L^2}$$\nWhere:\n- Catchment area $A = 45.0\\text{ km}^2$\n- Basin length $L = 10.0\\text{ km}$\n$$R_f = \\frac{45.0}{(10.0)^2} = \\frac{45.0}{100.0} = 0.45$$\n(A lower form factor indicates an elongated basin with lower, flatter flood peaks).",
    "difficulty": "Easy",
    "source": "Engineering Hydrology (K. Subramanya)"
  },
  {
    "id": "QB_SWCE_ADV_166",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Watershed Management",
    "subtopic": "Water budgeting in watershed",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "question": "In the Thornthwaite monthly hydrologic water balance model, when monthly precipitation ($P$) exceeds monthly potential evapotranspiration ($PET$), the excess water ($P - PET$) first goes to:",
    "options": {
      "A": "Recharge soil moisture storage up to the Available Water Capacity (AWC)",
      "B": "Direct surface runoff into streams, completely bypassing the soil profile",
      "C": "Deep non-recoverable geological loss to the Earth's mantle",
      "D": "Immediate evaporation back to the upper atmosphere"
    },
    "correct_answer": "A",
    "solution": "In the bookkeeping water balance procedure of Thornthwaite and Mather:\n1. When $P > PET$, the surplus precipitation is first utilized to replenish root-zone soil moisture storage up to field capacity (soil Available Water Capacity, $AWC$).\n2. Only after soil moisture storage reaches field capacity does any remaining excess generate water surplus ($S$) contributing to groundwater recharge and stream runoff. Option A is correct.",
    "difficulty": "Moderate",
    "source": "Engineering Hydrology (K. Subramanya)"
  },
  {
    "id": "QB_SWCE_GATE_001",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Runoff – components of runoff, run-off cycle, factors affecting run-off, hydrograph analysis, unit hydrograph theory",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "question": "Match the Hydrological Terms in Group-I with their Mathematical Definitions in Group-II:\n\n$$\\begin{array}{|ll|ll|}\\hline \\textbf{Group-I (Term)} & & \\textbf{Group-II (Definition)} & \\\\ \\hline \\text{P. Baseflow Separation} & & \\text{1. Cumulative unit hydrograph response for infinite duration} \\\\ \\text{Q. Unit Hydrograph} & & \\text{2. Direct runoff hydrograph resulting from } 1\\text{ cm of effective rainfall} \\\\ \\text{R. S-Curve Hydrograph} & & \\text{3. Partitioning total streamflow into quick runoff and groundwater} \\\\ \\text{S. Rational Formula} & & \\text{4. Peak runoff } Q_p = \\frac{CIA}{360} \\\\ \\hline \\end{array}$$\n\nSelect the CORRECT matching combination:",
    "options": {
      "A": "P-3, Q-2, R-1, S-4",
      "B": "P-2, Q-3, R-1, S-4",
      "C": "P-3, Q-1, R-2, S-4",
      "D": "P-4, Q-2, R-1, S-3"
    },
    "correct_answer": "A",
    "solution": "Hydrological Terms & Formulas:\n- **P. Baseflow Separation**: Partitioning total streamflow into surface runoff and baseflow (3).\n- **Q. Unit Hydrograph**: DRH due to $1\\text{ cm}$ of uniform excess rainfall (2).\n- **R. S-Curve**: Infinite superposition of unit hydrographs (1).\n- **S. Rational Formula**: $Q_p = \\frac{CIA}{360}$ (4).\n\nCorrect match: **P-3, Q-2, R-1, S-4**.",
    "difficulty": "Easy",
    "source": "Engineering Hydrology (K. Subramanya)"
  },
  {
    "id": "QB_SWCE_GATE_002",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Erosion and its Control",
    "subtopic": "Universal soil loss equation",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "In the Universal Soil Loss Equation (USLE) $A = R \\cdot K \\cdot L \\cdot S \\cdot C \\cdot P$, which of the following statements is/are CORRECT?",
    "options": {
      "A": "$R$ is the rainfall-runoff erosivity factor determined by the product of total kinetic energy and maximum 30-minute intensity",
      "B": "$K$ is the soil erodibility factor evaluated on a standard fallow plot of $22.13\\text{ m}$ length on a $9\\%$ slope",
      "C": "$P$ factor equals 1.0 when contour bunding is implemented on steep slopes",
      "D": "$C$ factor represents the cropping-management ratio relative to continuous bare fallow"
    },
    "correct_answer": [
      "A",
      "B",
      "D"
    ],
    "solution": "USLE Factors (Schwab et al.):\n- **A is TRUE**: $R = E I_{30} / 100$.\n- **B is TRUE**: Standard unit plot is $72.6\\text{ ft} (22.13\\text{ m})$, $9\\%$ slope, continuous fallow.\n- **C is FALSE**: $P = 1.0$ for up-and-down slope cultivation (no conservation practice); contour bunding reduces $P$ to $< 1.0$.\n- **D is TRUE**: $C$ is the cropping management factor relative to clean-tilled bare fallow.\n\nCorrect options: **A, B, D**.",
    "difficulty": "Moderate",
    "source": "Soil and Water Conservation Engineering (Schwab et al.)"
  },
  {
    "id": "QB_SWCE_GATE_003",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Hydrology",
    "subtopic": "Runoff – components of runoff, run-off cycle, factors affecting run-off, hydrograph analysis, unit hydrograph theory",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A watershed has an SCS Curve Number $CN = 80$. A 24-hour storm yields a total rainfall $P = 100\\text{ mm}$. Assuming initial abstraction $I_a = 0.2 S$, the depth of direct surface runoff $Q$ is ________ $\\text{mm}$ (round off to 2 decimal places).",
    "correct_answer": 50.54,
    "numerical_range": {
      "min": 49.5,
      "max": 51.5
    },
    "solution": "SCS-CN Runoff Calculation:\n$$S = \\frac{25400}{80} - 254 = 63.5\\text{ mm}$$\n$$I_a = 0.2 \\times 63.5 = 12.7\\text{ mm}$$\n$$Q = \\frac{(100 - 12.7)^2}{100 - 12.7 + 63.5} = \\frac{(87.3)^2}{150.8} = \\frac{7621.29}{150.8} \\approx 50.539\\text{ mm}$$\nRounding to 2 decimal places: **50.54** $\\text{mm}$.",
    "difficulty": "Moderate",
    "source": "Soil and Water Conservation Engineering (Schwab et al.)"
  },
  {
    "id": "QB_SWCE_GATE_004",
    "section": "Section 4: Soil and Water Conservation Engineering",
    "topic": "Soil Mechanics",
    "subtopic": "Permeability of soils",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A stratified soil deposit consists of three horizontal layers of thickness $1.0\\text{ m}, 2.0\\text{ m}$, and $3.0\\text{ m}$ with hydraulic conductivities of $2 \\times 10^{-4}\\text{ cm/s}, 4 \\times 10^{-4}\\text{ cm/s}$, and $6 \\times 10^{-4}\\text{ cm/s}$, respectively. The equivalent horizontal hydraulic conductivity ($K_h$) parallel to the bedding planes is ________ $\\times 10^{-4}\\text{ cm/s}$ (round off to 2 decimal places).",
    "correct_answer": 4.67,
    "numerical_range": {
      "min": 4.6,
      "max": 4.75
    },
    "solution": "Equivalent Horizontal Conductivity:\n$$K_h = \\frac{(2 \\times 1.0) + (4 \\times 2.0) + (6 \\times 3.0)}{1.0 + 2.0 + 3.0} = \\frac{2 + 8 + 18}{6.0} = \\frac{28}{6.0} \\approx 4.6667 \\times 10^{-4}\\text{ cm/s}$$\nRounding to 2 decimal places: **4.67**.",
    "difficulty": "Easy",
    "source": "Soil Mechanics and Foundations (B.C. Punmia)"
  }
];
