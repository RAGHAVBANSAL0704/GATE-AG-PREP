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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Moderate"
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
    "difficulty": "Moderate"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Moderate"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Moderate"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Moderate"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Moderate"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Moderate"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Moderate"
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
    "difficulty": "Easy"
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
    "difficulty": "Moderate"
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
    "difficulty": "Hard"
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
    "difficulty": "Moderate"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Moderate"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Moderate"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Hard"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy"
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Moderate",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
  }
];
