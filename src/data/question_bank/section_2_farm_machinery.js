export default [
  {
    "id": "QB_FM_001",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Calculation of performance parameters – field capacity, efficiency, performance index, application rate and losses",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A 4-bottom tractor-mounted mouldboard plough has a cutting width of 35 cm per bottom. It operates at an average forward speed of $5.4\\text{ km/h}$. If the field efficiency is $80\\%$, the effective field capacity of the plough in $\\text{ha/h}$ is ________ (round off to 2 decimal places).",
    "correct_answer": "0.60",
    "numerical_range": {
      "min": 0.59,
      "max": 0.61
    },
    "solution": "1. Total width of cut $W$:\n$$W = 4 \\times 0.35\\text{ m} = 1.4\\text{ m}$$\n2. Forward speed $S$:\n$$S = 5.4\\text{ km/h}$$\n3. Theoretical Field Capacity ($TFC$):\n$$TFC = \\frac{W \\times S}{10} = \\frac{1.4 \\times 5.4}{10} = 0.756\\text{ ha/h}$$\n4. Effective Field Capacity ($EFC$):\n$$EFC = TFC \\times \\eta = 0.756 \\times 0.80 = 0.6048\\text{ ha/h} \\approx 0.60\\text{ ha/h}$$",
    "difficulty": "Easy",
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)"
  },
  {
    "id": "QB_FM_002",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Soil tillage",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "The primary component of a mouldboard plough that cuts the horizontal slice of soil from the furrow bottom is called the:",
    "options": {
      "A": "Coulter",
      "B": "Share",
      "C": "Mouldboard",
      "D": "Landside"
    },
    "correct_answer": "B",
    "solution": "In a mouldboard plough:\n• The **share** makes the horizontal cut separating the furrow slice from the furrow floor.\n• The **coulter** makes the vertical cut.\n• The **mouldboard** lifts, pulverizes, and inverts the furrow slice.\n• The **landside** takes the lateral side-thrust against the furrow wall.",
    "difficulty": "Easy",
    "source": "Principles of Agricultural Engg. Vol. I (Ojha & Michael)"
  },
  {
    "id": "QB_FM_003",
    "section": "Section 2: Farm Machinery",
    "topic": "Machine Design",
    "subtopic": "Design and selection of machine elements – gears, pulleys, chains and sprockets and belts",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A flat belt drive connects two pulleys. The driving pulley of diameter $250\\text{ mm}$ rotates at $1440\\text{ rpm}$. If belt slip on each pulley is $2\\%$, the rotational speed of the driven pulley of diameter $500\\text{ mm}$ in $\\text{rpm}$ is ________ (round off to 1 decimal place).",
    "correct_answer": "691.5",
    "numerical_range": {
      "min": 689,
      "max": 693
    },
    "solution": "Speed ratio of belt drive considering total slip $s$:\n$$\\frac{N_2}{N_1} = \\frac{d_1}{d_2} \\left(1 - \\frac{s}{100}\\right)$$\nTotal slip $s = s_1 + s_2 = 2\\% + 2\\% = 4\\%$.\n$$N_2 = 1440 \\times \\frac{250}{500} \\times \\left(1 - \\frac{4}{100}\\right) = 1440 \\times 0.5 \\times 0.96 = 691.2\\text{ rpm}$$\nAcceptable range: 689.0 to 693.0 rpm.",
    "difficulty": "Moderate",
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)"
  },
  {
    "id": "QB_FM_004",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Functional requirements, principles of working, construction and operation of manual, animal, tractor and renewable energy operated equipment for tillage, sowing, planting, fertilizer application, inter-cultivation, spraying, mowing, chaff cutting, harvesting and threshing",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following statements regarding seed metering mechanisms in agricultural drills and planters is/are correct?",
    "options": {
      "A": "Fluted roller feed mechanism is widely used for sowing cereal grains such as wheat and barley.",
      "B": "Horizontal cell plate metering devices are commonly used in precision planters for bold seeds like corn and groundnut.",
      "C": "Pneumatic/vacuum seed metering mechanism enables singular seed placement irrespective of seed size variations.",
      "D": "Internal double-run feed mechanism is not suitable for small seeds like mustard."
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "• Fluted rollers are the standard mechanism on grain drills for cereals like wheat (A is correct).\n• Horizontal plate metering with cell plates is typical for row-crop precision planters for maize/groundnut (B is correct).\n• Vacuum/pneumatic singulation meters pick single seeds using negative pressure, accommodating irregular seed sizes with minimal damage (C is correct).\n• The internal double-run feed has one side with a small opening for small seeds (like mustard/rape) and a large side for coarse seeds; thus statement D is incorrect.",
    "difficulty": "Moderate",
    "source": "Principles of Farm Machinery (Kepner & Sahay)"
  },
  {
    "id": "QB_FM_005",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Cost analysis of implements and tractors",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A seed drill was purchased for $\\text{Rs. } 1,20,000$. Its salvage value after an estimated useful life of 8 years is $10\\%$ of the purchase price. Using the straight-line depreciation method, the annual depreciation in Rupees is ________ (answer in integer).",
    "correct_answer": "13500",
    "numerical_range": {
      "min": 13500,
      "max": 13500
    },
    "solution": "Under the straight line depreciation method:\n$$D = \\frac{C - S}{L}$$\nWhere:\n$C = \\text{Rs. } 1,20,000$ (purchase price)\n$S = 0.10 \\times 1,20,000 = \\text{Rs. } 12,000$ (salvage value)\n$L = 8\\text{ years}$ (useful life)\n$$D = \\frac{1,20,000 - 12,000}{8} = \\frac{1,08,000}{8} = 13,500\\text{ Rupees/year}$$",
    "difficulty": "Easy",
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)"
  },
  {
    "id": "QB_FM_006",
    "section": "Section 2: Farm Machinery",
    "topic": "Machine Design",
    "subtopic": "Overload safety devices used in farm machinery",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "In a PTO-driven rotary tiller (rotavator), which of the following devices is most commonly employed to protect the transmission gears against sudden overload when the tines hit a stone?",
    "options": {
      "A": "Slip clutch (friction clutch)",
      "B": "Dog clutch",
      "C": "Fluid coupling",
      "D": "Centrifugal clutch"
    },
    "correct_answer": "A",
    "solution": "A spring-loaded slip clutch (friction disc torque limiter) or a shear bolt is installed on the PTO drive shaft of rotavators to slip at a predetermined torque threshold, preventing catastrophic gear or shaft failure.",
    "difficulty": "Easy",
    "source": "Principles of Agricultural Engg. Vol. I (Ojha & Michael)"
  },
  {
    "id": "QB_FM_007",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Equipment for precision agriculture",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following technologies are integral components of Variable Rate Application (VRA) systems in precision agriculture?",
    "options": {
      "A": "Differential Global Positioning System (DGPS)",
      "B": "Electronic control unit (ECU) with actuator valves",
      "C": "GIS-based prescription maps",
      "D": "Standard mechanical ground-wheel driven star wheel without electronic controls"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "A modern VRA system integrates:\n1. GNSS/DGPS to identify real-time field coordinates.\n2. GIS prescription maps defining target application rates per zone.\n3. Electronic Control Unit (ECU) and PWM/servo actuator valves to dynamically vary fertilizer/chemical dosage.\nOption D describes a fixed mechanical rate system, not a precision VRA system.",
    "difficulty": "Easy",
    "source": "Elements of Agricultural Engineering (Jagdishwar Sahay)"
  },
  {
    "id": "QB_FM_008",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Forces acting on a tillage tool",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)",
    "question": "A 3-bottom tractor-drawn mouldboard plough with a cutting width of $30\\text{ cm}$ per bottom operates at a plowing depth of $15\\text{ cm}$. If the specific draft of the soil is $0.50\\text{ kg/cm}^2$, the total draft required to pull the plough in $\\text{kN}$ (taking $g = 9.81\\text{ m/s}^2$) is ________ (round off to 2 decimal places).",
    "correct_answer": "6.62",
    "numerical_range": {
      "min": 6.55,
      "max": 6.7
    },
    "solution": "1. Total furrow cross-sectional area $A$:\n$$A = n \\times w \\times d = 3 \\times 30\\text{ cm} \\times 15\\text{ cm} = 1350\\text{ cm}^2$$\n2. Total draft force in $\\text{kgf}$:\n$$D_{\\text{kgf}} = A \\times \\text{Specific Draft} = 1350\\text{ cm}^2 \\times 0.50\\text{ kg/cm}^2 = 675\\text{ kgf}$$\n3. Convert to $\\text{kN}$:\n$$D = \\frac{675 \\times 9.81}{1000} = 6.62175\\text{ kN} \\approx 6.62\\text{ kN}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FM_009",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Soil tillage",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Principles of Agricultural Engg. Vol. I (Ojha & Michael)",
    "question": "In a tractor-operated tandem disc harrow, increasing the gang angle $(\\theta)$ causes:",
    "options": {
      "A": "Increased depth of soil penetration and increased draft requirement",
      "B": "Decreased depth of soil penetration and increased draft requirement",
      "C": "Increased depth of soil penetration and decreased draft requirement",
      "D": "No change in penetration depth or draft requirement"
    },
    "correct_answer": "A",
    "solution": "Increasing the gang angle increases the angle of attack of the concave disc edges relative to the direction of travel. This increases the soil pulverization and depth of cut (penetration), which simultaneously increases the draft resistance.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FM_010",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Calculation of performance parameters – field capacity, efficiency, performance index, application rate and losses",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)",
    "question": "A tractor boom sprayer has 12 nozzles spaced $50\\text{ cm}$ apart. Each nozzle delivers a discharge of $0.90\\text{ L/min}$ at nominal operating pressure. If the tractor moves forward at $6.0\\text{ km/h}$, the application rate of the spray liquid in $\\text{L/ha}$ is ________ (answer in integer).",
    "correct_answer": "180",
    "numerical_range": {
      "min": 180,
      "max": 180
    },
    "solution": "The standard field application rate formula for a boom sprayer is:\n$$Q = \\frac{600 \\times q}{w \\times v}$$\nWhere:\n• $q = 0.90\\text{ L/min}$ (discharge per nozzle)\n• $w = 0.50\\text{ m}$ (spacing between consecutive nozzles)\n• $v = 6.0\\text{ km/h}$ (forward speed)\n$$Q = \\frac{600 \\times 0.90}{0.50 \\times 6.0} = \\frac{540}{3.0} = 180\\text{ L/ha}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FM_011",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Functional requirements, principles of working, construction and operation of manual, animal, tractor and renewable energy operated equipment for tillage, sowing, planting, fertilizer application, inter-cultivation, spraying, mowing, chaff cutting, harvesting and threshing",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Elements of Agricultural Engineering (Jagdishwar Sahay)",
    "question": "A self-propelled combine harvester moves at a forward speed of $4.5\\text{ km/h}$. The pickup reel of the combine has an effective diameter of $1.2\\text{ m}$ and rotates at $30\\text{ rpm}$. The reel index (ratio of peripheral reel speed to forward travel speed) is ________ (round off to 2 decimal places). Take $\\pi = 3.1416$.",
    "correct_answer": "1.51",
    "numerical_range": {
      "min": 1.48,
      "max": 1.53
    },
    "solution": "1. Forward speed of the combine in $\\text{m/s}$:\n$$v_f = 4.5 \\times \\frac{5}{18} = 1.25\\text{ m/s}$$\n2. Peripheral speed of reel tips ($v_r$):\n$$v_r = \\frac{\\pi D N}{60} = \\frac{3.1416 \\times 1.2 \\times 30}{60} = 1.885\\text{ m/s}$$\n3. Reel Index ($\\lambda$):\n$$\\lambda = \\frac{v_r}{v_f} = \\frac{1.885}{1.25} = 1.508 \\approx 1.51$$\n(Note: Standard recommended reel index for upright crops is between $1.25$ and $1.50$).",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FM_012",
    "section": "Section 2: Farm Machinery",
    "topic": "Machine Design",
    "subtopic": "Measurement of force, stress, torque, speed, displacement and acceleration on machine elements – shafts, couplings, keys, bearings and knuckle joints",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)",
    "question": "A tractor PTO shaft rotates at $540\\text{ rpm}$ and delivers $35\\text{ kW}$ of mechanical power to an implement. The torque transmitted through the shaft in $\\text{N}\\cdot\\text{m}$ is ________ (round off to 1 decimal place). Take $\\pi = 3.1416$.",
    "correct_answer": "618.9",
    "numerical_range": {
      "min": 616,
      "max": 622
    },
    "solution": "The relationship connecting mechanical power $P$ and torque $T$ is:\n$$P = \\frac{2 \\pi N T}{60}$$\n$$T = \\frac{60 \\times P}{2 \\pi N} = \\frac{60 \\times (35 \\times 10^3)}{2 \\times 3.1416 \\times 540} = \\frac{2,100,000}{3392.9} \\approx 618.94\\text{ N}\\cdot\\text{m} \\approx 618.9\\text{ N}\\cdot\\text{m}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FM_013",
    "section": "Section 2: Farm Machinery",
    "topic": "Machine Design",
    "subtopic": "Design and selection of machine elements – gears, pulleys, chains and sprockets and belts",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. I (Ojha & Michael)",
    "question": "A V-belt drive is used to transmit power from a tractor PTO shaft to a forage chopper. The groove angle of the pulley is $2\\beta = 38^\\circ$ (semi-groove angle $\\beta = 19^\\circ$). The coefficient of friction between the belt and pulley is $\\mu = 0.30$, and the angle of wrap on the smaller pulley is $\\theta = 160^\\circ$ ($2.793\\text{ rad}$). The belt has a linear mass density of $m = 0.20\\text{ kg/m}$ and operates at a linear speed of $v = 15\\text{ m/s}$. If the maximum permissible belt tension is $T_1 = 900\\text{ N}$, the maximum power transmitting capacity of the belt in $\\text{kW}$ is ________ (round off to 2 decimal places).",
    "correct_answer": "11.85",
    "numerical_range": {
      "min": 11.6,
      "max": 12.1
    },
    "solution": "1. Centrifugal tension ($T_c$):\n$$T_c = m v^2 = 0.20 \\times 15^2 = 45\\text{ N}$$\n2. Maximum effective tight-side tension:\n$$T_1 - T_c = 900 - 45 = 855\\text{ N}$$\n3. Tension ratio for V-belt:\n$$\\frac{T_1 - T_c}{T_2 - T_c} = e^{\\frac{\\mu \\theta}{\\sin\\beta}}$$\nGiven $\\beta = 19^\\circ$, $\\sin(19^\\circ) = 0.3256$:\n$$\\frac{\\mu \\theta}{\\sin\\beta} = \\frac{0.30 \\times 2.793}{0.3256} = \\frac{0.8379}{0.3256} \\approx 2.5734$$\n$$e^{2.5734} \\approx 13.11$$\n$$T_2 - T_c = \\frac{855}{13.11} \\approx 65.22\\text{ N}$$\n$$T_2 = 65.22 + 45 = 110.22\\text{ N}$$\n4. Power transmitted ($P$):\n$$P = (T_1 - T_2) v = (900 - 110.22) \\times 15 = 789.78 \\times 15 = 11,846.7\\text{ W} \\approx 11.85\\text{ kW}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FM_014",
    "section": "Section 2: Farm Machinery",
    "topic": "Machine Design",
    "subtopic": "Design and selection of machine elements – gears, pulleys, chains and sprockets and belts",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)",
    "question": "A roller chain drive on a fertilizer broadcaster has a driving sprocket with $Z = 18$ teeth and a chain pitch of $p = 19.05\\text{ mm}$. The pitch diameter of the sprocket in $\\text{mm}$ is ________ (round off to 1 decimal place).",
    "correct_answer": "109.7",
    "numerical_range": {
      "min": 109,
      "max": 110.5
    },
    "solution": "The pitch diameter $D$ of a roller chain sprocket is given by:\n$$D = \\frac{p}{\\sin\\left(\\frac{180^\\circ}{Z}\\right)}$$\nGiven $p = 19.05\\text{ mm}$ and $Z = 18$ teeth:\n$$\\frac{180^\\circ}{Z} = \\frac{180^\\circ}{18} = 10^\\circ$$\n$$\\sin(10^\\circ) \\approx 0.17365$$\n$$D = \\frac{19.05}{0.17365} \\approx 109.703\\text{ mm} \\approx 109.7\\text{ mm}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FM_015",
    "section": "Section 2: Farm Machinery",
    "topic": "Machine Design",
    "subtopic": "Design and selection of machine elements – gears, pulleys, chains and sprockets and belts",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Elements of Agricultural Engineering (Jagdishwar Sahay)",
    "question": "A spur gear in a tractor gearbox has a module $m = 6\\text{ mm}$, face width $b = 60\\text{ mm}$, and $T = 25$ teeth. The allowable bending stress of the gear material is $\\sigma_b = 140\\text{ MPa}$. Using the Lewis equation with Lewis form factor $Y = 0.369$, the beam strength (Lewis bending load capacity $F_b = \\sigma_b \\cdot b \\cdot m \\cdot Y$) of the gear tooth in $\\text{kN}$ is ________ (round off to 2 decimal places).",
    "correct_answer": "18.60",
    "numerical_range": {
      "min": 18.4,
      "max": 18.8
    },
    "solution": "The beam strength of a spur gear tooth according to the Lewis formula is:\n$$F_b = \\sigma_b \\cdot b \\cdot m \\cdot Y$$\nWhere:\n• $\\sigma_b = 140\\text{ MPa} = 140\\text{ N/mm}^2$\n• Face width $b = 60\\text{ mm}$\n• Module $m = 6\\text{ mm}$\n• Lewis form factor $Y = 0.369$\n$$F_b = 140 \\times 60 \\times 6 \\times 0.369 = 18,597.6\\text{ N} \\approx 18.60\\text{ kN}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FM_016",
    "section": "Section 2: Farm Machinery",
    "topic": "Machine Design",
    "subtopic": "Design and selection of machine elements – gears, pulleys, chains and sprockets and belts",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Principles of Agricultural Engg. Vol. I (Ojha & Michael)",
    "question": "For smooth, continuous, and shockless power transmission between a pair of mating involute spur gears in a combine harvester transmission, the contact ratio must be:",
    "options": {
      "A": "Greater than 1.0 (typically between 1.2 and 1.8)",
      "B": "Strictly less than 0.8",
      "C": "Exactly equal to 0.5",
      "D": "Negative"
    },
    "correct_answer": "A",
    "solution": "The contact ratio represents the average number of pairs of teeth in contact during engagement. To prevent tooth disengagement shocks and ensure uninterrupted motion transfer, the contact ratio must exceed 1.0 (standard commercial gearing is designed for 1.2 to 1.8).",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FM_017",
    "section": "Section 2: Farm Machinery",
    "topic": "Machine Design",
    "subtopic": "Design and selection of machine elements – gears, pulleys, chains and sprockets and belts",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Farm Machinery (Kepner & Sahay)",
    "question": "Which of the following statements regarding mechanical belt drives used in agricultural machinery is/are correct?",
    "options": {
      "A": "In a crossed flat belt drive, the driving and driven pulleys rotate in opposite directions.",
      "B": "The angle of contact for an open belt drive is always smaller on the smaller pulley.",
      "C": "Centrifugal tension reduces the effective belt tension available for power transmission at high speeds.",
      "D": "V-belts utilize the wedging action inside pulley grooves, permitting higher torque transmission at smaller wrap angles compared to flat belts."
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "• Crossed belts reverse rotation direction (A is correct).\n• In an open drive with unequal pulley diameters, wrap angle on smaller pulley is $\\theta = 180^\\circ - 2\\arcsin((D-d)/2C) < 180^\\circ$ (B is correct).\n• Centrifugal tension $T_c = mv^2$ acts radially outward, reducing net normal contact pressure and effective grip (C is correct).\n• V-belt groove wedging increases apparent friction coefficient to $\\mu/\\sin\\beta$, substantially enhancing traction (D is correct).",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FM_018",
    "section": "Section 2: Farm Machinery",
    "topic": "Machine Design",
    "subtopic": "Overload safety devices used in farm machinery",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)",
    "question": "A PTO-driven rotary mower driveline incorporates a shear bolt safety device situated on an input flange at a radial distance of $r = 60\\text{ mm}$ from the shaft centerline. The shear bolt is made of steel with an ultimate shear strength of $\\tau_{ult} = 320\\text{ MPa}$. If the driveline is designed to safely trip when the transmitted torque reaches $T = 900\\text{ N}\\cdot\\text{m}$, the required nominal diameter of the shear bolt in $\\text{mm}$ is ________ (round off to 2 decimal places). Take $\\pi = 3.1416$.",
    "correct_answer": "7.73",
    "numerical_range": {
      "min": 7.65,
      "max": 7.8
    },
    "solution": "1. Tangential shearing force on the bolt ($F$):\n$$F = \\frac{T}{r} = \\frac{900\\text{ N}\\cdot\\text{m}}{0.060\\text{ m}} = 15,000\\text{ N}$$\n2. Shear stress relationship at failure:\n$$\\tau_{ult} = \\frac{F}{A} = \\frac{F}{\\frac{\\pi}{4} d^2}$$\n$$d^2 = \\frac{4 F}{\\pi \\tau_{ult}} = \\frac{4 \\times 15,000}{\\pi \\times (320 \\times 10^6\\text{ N/m}^2)} = \\frac{60,000}{1.0053 \\times 10^9} \\approx 5.9683 \\times 10^{-5}\\text{ m}^2$$\n$$d = \\sqrt{5.9683 \\times 10^{-5}} = 0.007725\\text{ m} \\approx 7.73\\text{ mm}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FM_019",
    "section": "Section 2: Farm Machinery",
    "topic": "Machine Design",
    "subtopic": "Overload safety devices used in farm machinery",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. I (Ojha & Michael)",
    "question": "A multi-plate friction slip clutch in a round baler driveline has 3 driving plates and 2 driven plates, providing $n = 4$ active pairs of contacting friction surfaces. The outer and inner radii of the friction linings are $r_1 = 120\\text{ mm}$ and $r_2 = 80\\text{ mm}$, respectively. The coefficient of friction is $\\mu = 0.35$. If the total axial clamping force exerted by the compression springs is $W = 3500\\text{ N}$, assuming uniform wear theory, the torque capacity of the clutch in $\\text{N}\\cdot\\text{m}$ is ________ (round off to 1 decimal place).",
    "correct_answer": "490.0",
    "numerical_range": {
      "min": 488,
      "max": 492
    },
    "solution": "1. Mean radius under uniform wear theory ($R_m$):\n$$R_m = \\frac{r_1 + r_2}{2} = \\frac{120 + 80}{2} = 100\\text{ mm} = 0.10\\text{ m}$$\n2. Frictional torque capacity for $n = 4$ active friction surfaces:\n$$T = n \\cdot \\mu \\cdot W \\cdot R_m$$\n$$T = 4 \\times 0.35 \\times 3500\\text{ N} \\times 0.10\\text{ m} = 490.0\\text{ N}\\cdot\\text{m}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FM_020",
    "section": "Section 2: Farm Machinery",
    "topic": "Machine Design",
    "subtopic": "Overload safety devices used in farm machinery",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Farm Machinery (Kepner & Sahay)",
    "question": "Which of the following statements regarding overload safety devices used in agricultural machinery is/are correct?",
    "options": {
      "A": "A shear bolt provides positive torque transmission until shear failure occurs, requiring manual replacement of the bolt before operation can resume.",
      "B": "A spring-loaded friction slip clutch automatically resumes drive transmission as soon as the peak torque overload subsides.",
      "C": "An overrunning clutch (freewheel) permits the implement rotor to freewheel when the tractor PTO is suddenly disengaged or throttled down.",
      "D": "A star-ratchet (jump) clutch produces an audible clicking chatter during slip, alerting the tractor operator of persistent overload."
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "All four statements accurately represent standard agricultural overload safety and driveline protection mechanisms:\n• Shear bolts require physical replacement upon failure.\n• Friction slip clutches slip during momentary spikes and re-engage automatically.\n• Overrunning clutches prevent high inertia loads from back-driving tractor transmissions.\n• Jump/star-ratchet clutches cam out under overload with distinctive audible chatter.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FM_021",
    "section": "Section 2: Farm Machinery",
    "topic": "Machine Design",
    "subtopic": "Overload safety devices used in farm machinery",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Elements of Agricultural Engineering (Jagdishwar Sahay)",
    "question": "An overrunning clutch (freewheel clutch) is installed between a tractor PTO and a high-inertia implement (such as a rotary slasher or large forage flywheel) primarily to:",
    "options": {
      "A": "Prevent the rotational kinetic energy of the heavy implement rotor from driving the tractor forward when the tractor master clutch is disengaged",
      "B": "Double the rotational speed of the implement shaft",
      "C": "Eliminate torsional vibrations at all engine speeds",
      "D": "Provide automatic reverse rotation to unclog jammed stalks"
    },
    "correct_answer": "A",
    "solution": "When a tractor operator disengages the clutch to stop, a heavy spinning rotor acts as a flywheel. Without an overrunning clutch, kinetic energy feeds backward through the PTO into the transmission, propelling the tractor forward into obstacles.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FM_022",
    "section": "Section 2: Farm Machinery",
    "topic": "Machine Design",
    "subtopic": "Measurement of force, stress, torque, speed, displacement and acceleration on machine elements – shafts, couplings, keys, bearings and knuckle joints",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)",
    "question": "A solid steel drive shaft in an agricultural machine is subjected to a maximum bending moment of $M = 1200\\text{ N}\\cdot\\text{m}$ and a twisting moment of $T = 1600\\text{ N}\\cdot\\text{m}$. The allowable shear stress for the shaft material is $\\tau_{all} = 50\\text{ MPa}$. According to the maximum shear stress theory (Guest's theory), the minimum required shaft diameter in $\\text{mm}$ is ________ (round off to 1 decimal place). Take $\\pi = 3.1416$.",
    "correct_answer": "58.8",
    "numerical_range": {
      "min": 58.2,
      "max": 59.5
    },
    "solution": "1. Equivalent twisting moment ($T_e$):\n$$T_e = \\sqrt{M^2 + T^2} = \\sqrt{1200^2 + 1600^2} = \\sqrt{1,440,000 + 2,560,000} = \\sqrt{4,000,000} = 2000\\text{ N}\\cdot\\text{m}$$\n2. Maximum shear stress equation for solid shaft:\n$$T_e = \\frac{\\pi}{16} \\tau_{all} d^3$$\n$$d^3 = \\frac{16 T_e}{\\pi \\tau_{all}} = \\frac{16 \\times 2000}{\\pi \\times (50 \\times 10^6\\text{ N/m}^2)} = \\frac{32,000}{1.5708 \\times 10^8} \\approx 2.0372 \\times 10^{-4}\\text{ m}^3$$\n$$d = (2.0372 \\times 10^{-4})^{1/3} = 0.05884\\text{ m} \\approx 58.8\\text{ mm}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FM_023",
    "section": "Section 2: Farm Machinery",
    "topic": "Machine Design",
    "subtopic": "Measurement of force, stress, torque, speed, displacement and acceleration on machine elements – shafts, couplings, keys, bearings and knuckle joints",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. I (Ojha & Michael)",
    "question": "A rectangular sunk key of width $w = 14\\text{ mm}$ and height $h = 9\\text{ mm}$ connects a $45\\text{ mm}$ diameter shaft to a gear hub. The key transmits a steady torque of $T = 750\\text{ N}\\cdot\\text{m}$. If the permissible shear stress of the key material is $\\tau = 60\\text{ MPa}$, the minimum required length of the key based on shear failure in $\\text{mm}$ is ________ (round off to 1 decimal place).",
    "correct_answer": "39.7",
    "numerical_range": {
      "min": 39.2,
      "max": 40.2
    },
    "solution": "1. Tangential force acting at the surface of the $45\\text{ mm}$ shaft ($d = 0.045\\text{ m}$):\n$$F = \\frac{2T}{d} = \\frac{2 \\times 750}{0.045} = 33,333.33\\text{ N}$$\n2. Shearing area of key $A_s = l \\times w$:\n$$F = l \\cdot w \\cdot \\tau$$\n$$l = \\frac{F}{w \\cdot \\tau} = \\frac{33,333.33\\text{ N}}{0.014\\text{ m} \\times (60 \\times 10^6\\text{ N/m}^2)} = \\frac{33,333.33}{840,000} = 0.03968\\text{ m} \\approx 39.7\\text{ mm}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FM_024",
    "section": "Section 2: Farm Machinery",
    "topic": "Machine Design",
    "subtopic": "Measurement of force, stress, torque, speed, displacement and acceleration on machine elements – shafts, couplings, keys, bearings and knuckle joints",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "Elements of Agricultural Engineering (Jagdishwar Sahay)",
    "question": "A knuckle joint connecting two tie-rods in a tractor steering linkage carries an axial tensile load of $P = 40\\text{ kN}$. The joint pin has a diameter of $d = 25\\text{ mm}$ and is subjected to double shear. The average shear stress induced in the pin in $\\text{MPa}$ is ________ (round off to 1 decimal place). Take $\\pi = 3.1416$.",
    "correct_answer": "40.7",
    "numerical_range": {
      "min": 40.2,
      "max": 41.2
    },
    "solution": "In a knuckle joint, the pin fails in double shear across two circular cross-sections:\n$$A_s = 2 \\times \\left(\\frac{\\pi}{4} d^2\\right) = \\frac{\\pi}{2} (25\\text{ mm})^2 = 1.5708 \\times 625 = 981.75\\text{ mm}^2$$\n$$\\tau = \\frac{P}{A_s} = \\frac{40,000\\text{ N}}{981.75\\text{ mm}^2} \\approx 40.74\\text{ MPa} \\approx 40.7\\text{ MPa}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FM_025",
    "section": "Section 2: Farm Machinery",
    "topic": "Machine Design",
    "subtopic": "Measurement of force, stress, torque, speed, displacement and acceleration on machine elements – shafts, couplings, keys, bearings and knuckle joints",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)",
    "question": "A deep-groove ball bearing carries a steady radial load of $F_r = 4.5\\text{ kN}$ with zero axial load at a shaft speed of $N = 1200\\text{ rpm}$. The basic dynamic load rating of the bearing is $C = 27.0\\text{ kN}$. The $L_{10h}$ rating life of the bearing in operating hours is ________ (answer in integer).",
    "correct_answer": "3000",
    "numerical_range": {
      "min": 3000,
      "max": 3000
    },
    "solution": "1. Rating life in millions of revolutions for a ball bearing ($p = 3$):\n$$L_{10} = \\left(\\frac{C}{P}\\right)^3 = \\left(\\frac{27.0}{4.5}\\right)^3 = 6^3 = 216\\text{ million revolutions}$$\n2. Life in operating hours ($L_{10h}$):\n$$L_{10h} = \\frac{L_{10} \\times 10^6}{60 \\times N} = \\frac{216 \\times 10^6}{60 \\times 1200} = \\frac{216,000,000}{72,000} = 3000\\text{ hours}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FM_026",
    "section": "Section 2: Farm Machinery",
    "topic": "Machine Design",
    "subtopic": "Measurement of force, stress, torque, speed, displacement and acceleration on machine elements – shafts, couplings, keys, bearings and knuckle joints",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Farm Machinery (Kepner & Sahay)",
    "question": "Which of the following statements regarding mechanical shaft couplings used in agricultural machinery is/are correct?",
    "options": {
      "A": "An Oldham coupling accommodates lateral (radial) offset between two parallel shafts.",
      "B": "A single Universal (Hooke's) joint operating at a non-zero joint angle causes periodic angular velocity fluctuations in the driven shaft.",
      "C": "Using two universal joints with identical joint angles and in-phase yokes eliminates angular velocity fluctuations between driving and driven shafts.",
      "D": "A rigid sleeve coupling accommodates angular misalignment up to $15^\\circ$ without inducing bending stresses."
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "• Oldham couplings use a central floating disc with perpendicular tongues to handle parallel radial offsets (A is correct).\n• A single Cardan/Hooke's joint has non-uniform output speed $\\omega_2 = \\omega_1 \\frac{\\cos\\alpha}{1 - \\sin^2\\alpha \\sin^2\\theta}$ (B is correct).\n• A double Cardan drive with equal angles $\\alpha_1 = \\alpha_2$ and coplanar yokes cancels out angular speed variations (C is correct).\n• Rigid couplings require precise coaxial shaft alignment; any misalignment induces severe fatigue bending stresses (D is false).",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FM_027",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Soil tillage",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Principles of Agricultural Engg. Vol. I (Ojha & Michael)",
    "question": "In a standard tractor-mounted standard disc plough, the disc angle (angle of the disc plane to the direction of travel) and tilt angle (angle of the disc plane to the vertical) typically lie in the ranges of:",
    "options": {
      "A": "Disc angle $42^\\circ - 45^\\circ$, Tilt angle $15^\\circ - 25^\\circ$",
      "B": "Disc angle $15^\\circ - 25^\\circ$, Tilt angle $42^\\circ - 45^\\circ$",
      "C": "Disc angle $70^\\circ - 85^\\circ$, Tilt angle $5^\\circ - 10^\\circ$",
      "D": "Disc angle $5^\\circ - 10^\\circ$, Tilt angle $70^\\circ - 85^\\circ$"
    },
    "correct_answer": "A",
    "solution": "In agricultural disc ploughs:\n• **Disc angle** is $42^\\circ$ to $45^\\circ$, controlling furrow width and slice inversion.\n• **Tilt angle** is $15^\\circ$ to $25^\\circ$, controlling soil penetration.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FM_028",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Soil tillage",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)",
    "question": "A tractor-operated rotary tiller (rotavator) operates at a rotor speed of $N = 210\\text{ rpm}$ in the direction of tractor travel. The tractor moves forward at $v_f = 2.7\\text{ km/h}$. If there are $z = 3$ L-shaped blades mounted in each rotor flange plane, the tilling pitch (bite length $L_b$) cut by consecutive blades in $\\text{cm}$ is ________ (round off to 1 decimal place).",
    "correct_answer": "7.1",
    "numerical_range": {
      "min": 7,
      "max": 7.3
    },
    "solution": "1. Forward speed in $\\text{m/s}$:\n$$v_f = 2.7 \\times \\frac{5}{18} = 0.75\\text{ m/s}$$\n2. Rotor rotational speed:\n$$n = \\frac{210}{60} = 3.5\\text{ rev/s}$$\n3. Number of blade cuts per second per flange:\n$$f = z \\times n = 3 \\times 3.5 = 10.5\\text{ cuts/s}$$\n4. Tilling pitch (bite length $L_b$):\n$$L_b = \\frac{v_f}{f} = \\frac{0.75\\text{ m/s}}{10.5\\text{ s}^{-1}} = 0.07143\\text{ m} \\approx 7.14\\text{ cm} \\approx 7.1\\text{ cm}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FM_029",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Soil tillage",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. I (Ojha & Michael)",
    "question": "Which of the following attachments to a mouldboard plough is/are correctly matched with its functional purpose?",
    "options": {
      "A": "Rolling coulter — makes a clean vertical cut separating the furrow slice from the unploughed land ahead of the share.",
      "B": "Jointer — a miniature plough bottom that cuts a small furrow slice off the top furrow corner and deposits it in the furrow bottom to bury trash.",
      "C": "Trash board — fitted directly above the mouldboard to deflect tall vegetation and crop residue downward into the open furrow.",
      "D": "Landside heel — provides vertical flotation on soft peat soils to prevent excessive sinkage."
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "• Rolling coulters cut vertical furrow walls and slice surface vines (A is correct).\n• Jointers peel off trashy furrow corners to ensure complete weed burial (B is correct).\n• Trash boards deflect crop residue into the furrow bottom (C is correct).\n• The landside heel absorbs downward vertical and lateral furrow reactions on the rearmost bottom, not vertical flotation on peat soils (D is false).",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FM_030",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Soil tillage",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "source": "Elements of Agricultural Engineering (Jagdishwar Sahay)",
    "question": "When operating a subsoiler or deep chisel tine to shatter a dense subsurface hardpan, if the working depth is increased beyond the 'critical depth':",
    "options": {
      "A": "Soil is no longer lifted upward in a crescent failure pattern, but is instead pushed sideways in a compacted two-dimensional plastic flow, drastically increasing specific draft without increasing surface soil shattering",
      "B": "Draft force becomes completely independent of working depth",
      "C": "Specific draft drops to zero due to spontaneous soil liquefaction",
      "D": "The vertical force shifts from downward suction to an uncontrollable upward thrust"
    },
    "correct_answer": "A",
    "solution": "Beyond the critical depth, soil confining pressure prevents upward crescent shear failure. The tine creates subterranean compaction grooves via lateral plastic flow, sharply increasing specific draft ($N/cm^2$) with negligible shatter benefit.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FM_031",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Forces acting on a tillage tool",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)",
    "question": "A tractor-drawn tillage implement experiences three mutually perpendicular soil reaction forces: a horizontal longitudinal draft force $F_x = 7.2\\text{ kN}$, a lateral horizontal side force $F_y = 2.1\\text{ kN}$, and a downward vertical force $F_z = 3.0\\text{ kN}$. The magnitude of the total resultant soil force $R$ acting on the implement in $\\text{kN}$ is ________ (round off to 2 decimal places).",
    "correct_answer": "8.08",
    "numerical_range": {
      "min": 8.02,
      "max": 8.14
    },
    "solution": "The total resultant force $R$ acting on the tillage tool is:\n$$R = \\sqrt{F_x^2 + F_y^2 + F_z^2}$$\n$$R = \\sqrt{7.2^2 + 2.1^2 + 3.0^2} = \\sqrt{51.84 + 4.41 + 9.00} = \\sqrt{65.25} \\approx 8.0777\\text{ kN} \\approx 8.08\\text{ kN}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FM_032",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Forces acting on a tillage tool",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. I (Ojha & Michael)",
    "question": "According to the ASABE standard draft model for a mouldboard plough in silty clay loam soil, the unit draft $D$ (in $\\text{N/cm}^2$) as a function of forward speed $S$ (in $\\text{km/h}$) is given by:\n$$D = 6.5 + 0.045 S^2$$\nA 3-bottom mouldboard plough with $35\\text{ cm}$ width of cut per bottom operates at a depth of $18\\text{ cm}$ at a speed of $6.0\\text{ km/h}$. The total draft force required to pull the plough in $\\text{kN}$ is ________ (round off to 2 decimal places).",
    "correct_answer": "15.35",
    "numerical_range": {
      "min": 15.2,
      "max": 15.5
    },
    "solution": "1. Total furrow cross-sectional area:\n$$A = n \\times w \\times d = 3 \\times 35\\text{ cm} \\times 18\\text{ cm} = 1890\\text{ cm}^2$$\n2. Unit draft at $S = 6.0\\text{ km/h}$:\n$$D = 6.5 + 0.045 \\times (6.0)^2 = 6.5 + 0.045 \\times 36 = 6.5 + 1.62 = 8.12\\text{ N/cm}^2$$\n3. Total draft force:\n$$F = A \\times D = 1890\\text{ cm}^2 \\times 8.12\\text{ N/cm}^2 = 15,346.8\\text{ N} \\approx 15.35\\text{ kN}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FM_033",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Forces acting on a tillage tool",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Principles of Farm Machinery (Kepner & Sahay)",
    "question": "For an individual mouldboard plough bottom having width of cut $w$ and depth of cut $d$, the center of resistance in the horizontal plane is approximately located at:",
    "options": {
      "A": "$w/4$ to $w/3$ from the landside toward the furrow slice",
      "B": "Exactly on the landside edge",
      "C": "At the outermost wing of the mouldboard",
      "D": "Outside the furrow wall"
    },
    "correct_answer": "A",
    "solution": "Due to the combined cutting force of the share and lifting/inversion forces of the mouldboard, the center of resistance in the horizontal plane is located approximately one-fourth to one-third of the width of cut away from the landside toward the open furrow.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FM_034",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Forces acting on a tillage tool",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. I (Ojha & Michael)",
    "question": "In soil dynamics applied to tillage tools, which of the following statements is/are correct based on Terzaghi and Hettiaratchi-Reece passive earth pressure theories?",
    "options": {
      "A": "The theoretical failure plane angle $\\beta$ in front of a flat inclined tillage blade is given by $\\beta = 45^\\circ - \\phi/2$, where $\\phi$ is the internal soil friction angle.",
      "B": "Soil adhesion ($c_a$) and soil-metal friction angle ($\\delta$) significantly influence the interface resistance along the tool surface.",
      "C": "For narrow tillage tines (aspect ratio width/depth $< 0.5$), three-dimensional crescent soil failure dominates over two-dimensional plane strain failure.",
      "D": "Saturated soil shear strength is strictly governed by hydrostatic pore water suction alone with zero cohesion."
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "• The passive shear failure rupture plane forms at $\\beta = 45^\\circ - \\phi/2$ from the horizontal (A is correct).\n• Soil-metal adhesion $c_a$ and friction angle $\\delta$ dictate interfacial boundary shear (B is correct).\n• Narrow tines rupture soil in a 3D crescent pattern rather than planar 2D flow (C is correct).\n• Saturated soil shear strength depends on effective stress $\\sigma' = \\sigma - u$ and cohesion $c'$, not purely suction (D is false).",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FM_035",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Hitch systems and hitching of tillage implements",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Elements of Agricultural Engineering (Jagdishwar Sahay)",
    "question": "When hitching a trailed mouldboard plough to a 2WD tractor, if the line of pull does not pass through both the center of resistance of the plough and the center of pull of the tractor in the horizontal plane:",
    "options": {
      "A": "Side draft is created, which tends to steer the tractor front wheels off course and increases steering effort and fuel consumption",
      "B": "The plough operates at zero draft resistance",
      "C": "Plowing depth automatically doubles",
      "D": "Drive wheel slip is completely eliminated"
    },
    "correct_answer": "A",
    "solution": "When the horizontal line of draft does not align with the tractor centerline of pull, horizontal side draft develops. This produces a yawing moment on the tractor, forcing the operator to constantly steer against the pull and increasing tire scrub and fuel consumption.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FM_036",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Hitch systems and hitching of tillage implements",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)",
    "question": "A trailed subsoiler requires a horizontal draft of $P = 15\\text{ kN}$. The hitch point on the tractor drawbar is located at a height of $h = 40\\text{ cm}$ above ground. The tractor wheelbase is $L = 2.20\\text{ m}$. Assuming the line of draft is horizontal, the dynamic weight transferred from the front axle to the rear axle due to this drawbar pull in $\\text{kN}$ is ________ (round off to 2 decimal places).",
    "correct_answer": "2.73",
    "numerical_range": {
      "min": 2.68,
      "max": 2.78
    },
    "solution": "Dynamic weight transfer $\\Delta W$ from front to rear axle due to a horizontal drawbar pull $P$ at height $h$ with wheelbase $L$ is:\n$$\\Delta W = \\frac{P \\times h}{L}$$\nGiven $P = 15\\text{ kN}$, $h = 0.40\\text{ m}$, and $L = 2.20\\text{ m}$:\n$$\\Delta W = \\frac{15 \\times 0.40}{2.20} = \\frac{6.0}{2.20} \\approx 2.727\\text{ kN} \\approx 2.73\\text{ kN}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FM_037",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Hitch systems and hitching of tillage implements",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. I (Ojha & Michael)",
    "question": "In a tractor three-point linkage operating in the vertical plane, the upper link (top link) slopes downwards towards the implement at an angle of $10^\\circ$ to the horizontal, while the lower links slope upwards towards the implement at an angle of $15^\\circ$ to the horizontal. Both links converge forward. If the vertical distance between the tractor top link hitch pin and lower link hitch pins is $h = 450\\text{ mm}$, the horizontal distance from the tractor hitch pin plane to the virtual hitch point in $\\text{m}$ is ________ (round off to 2 decimal places).",
    "correct_answer": "1.01",
    "numerical_range": {
      "min": 0.98,
      "max": 1.05
    },
    "solution": "Let $X$ be the horizontal distance forward to the intersection of the link centerlines (virtual hitch point):\n$$X \\tan(10^\\circ) + X \\tan(15^\\circ) = h = 0.450\\text{ m}$$\nGiven $\\tan(10^\\circ) \\approx 0.17633$ and $\\tan(15^\\circ) \\approx 0.26795$:\n$$X (0.17633 + 0.26795) = 0.450$$\n$$X (0.44428) = 0.450$$\n$$X = \\frac{0.450}{0.44428} \\approx 1.0128\\text{ m} \\approx 1.01\\text{ m}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FM_038",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Hitch systems and hitching of tillage implements",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Farm Machinery (Kepner & Sahay)",
    "question": "Which of the following are distinct operational advantages of fully-mounted implements attached via a three-point linkage compared to trailed implements?",
    "options": {
      "A": "Superior maneuverability and shorter turning radius at field headlands",
      "B": "Ability to utilize automatic draft control to dynamically transfer implement weight to tractor drive wheels",
      "C": "Compact transport footprint with implement fully raised off the road",
      "D": "Ability to be operated by tractors of any size without hydraulic lift cylinders"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "• Three-point mounted implements can be raised hydraulically for tight headland turns (A is correct).\n• Automatic draft control transfers implement vertical soil forces and implement weight directly to the rear drive tires for traction enhancement (B is correct).\n• Full transport clearance simplifies road transit (C is correct).\n• Three-point mounted implements strictly require tractor hydraulic lift linkages and control valves (D is false).",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FM_039",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Hitch systems and hitching of tillage implements",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)",
    "question": "A tractor exerts a pull of $P = 10.0\\text{ kN}$ on a trailed offset disc harrow at an angle of $\\theta = 12^\\circ$ to the longitudinal direction of forward motion. The lateral side draft force acting perpendicular to the direction of travel in $\\text{kN}$ is ________ (round off to 2 decimal places).",
    "correct_answer": "2.08",
    "numerical_range": {
      "min": 2.04,
      "max": 2.12
    },
    "solution": "The lateral side draft force $F_y$ is the transverse component of the pull force:\n$$F_y = P \\sin(\\theta) = 10.0\\text{ kN} \\times \\sin(12^\\circ)$$\n$$\\sin(12^\\circ) \\approx 0.20791$$\n$$F_y = 10.0 \\times 0.20791 = 2.0791\\text{ kN} \\approx 2.08\\text{ kN}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FM_040",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Functional requirements, principles of working, construction and operation of manual, animal, tractor and renewable energy operated equipment for tillage, sowing, planting, fertilizer application, inter-cultivation, spraying, mowing, chaff cutting, harvesting and threshing",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Elements of Agricultural Engineering (Jagdishwar Sahay)",
    "question": "A 9-row tractor seed drill with row spacing of $20\\text{ cm}$ has a ground drive wheel of effective diameter $D = 70\\text{ cm}$. During a stationary calibration test, the drive wheel is rotated through 50 revolutions, and the total seed collected from all 9 furrow openers is $1.98\\text{ kg}$. The calibrated seed rate of the drill in $\\text{kg/ha}$ is ________ (round off to 1 decimal place). Take $\\pi = 3.1416$.",
    "correct_answer": "100.0",
    "numerical_range": {
      "min": 99,
      "max": 101
    },
    "solution": "1. Working width of the seed drill:\n$$W = 9 \\times 0.20\\text{ m} = 1.80\\text{ m}$$\n2. Drive wheel circumference:\n$$C = \\pi D = 3.1416 \\times 0.70\\text{ m} = 2.1991\\text{ m}$$\n3. Distance traveled in 50 revolutions:\n$$S = 50 \\times 2.1991 = 109.956\\text{ m}$$\n4. Area covered:\n$$A = W \\times S = 1.80\\text{ m} \\times 109.956\\text{ m} = 197.92\\text{ m}^2 = 0.019792\\text{ ha}$$\n5. Seed rate in $\\text{kg/ha}$:\n$$\\text{Seed Rate} = \\frac{1.98\\text{ kg}}{0.019792\\text{ ha}} \\approx 100.04\\text{ kg/ha} \\approx 100.0\\text{ kg/ha}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FM_041",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Functional requirements, principles of working, construction and operation of manual, animal, tractor and renewable energy operated equipment for tillage, sowing, planting, fertilizer application, inter-cultivation, spraying, mowing, chaff cutting, harvesting and threshing",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Farm Machinery (Kepner & Sahay)",
    "question": "A precision maize planter moves forward at a speed of $v_f = 5.4\\text{ km/h}$. The vertical cell plate seed metering disc has $n_c = 16$ cells uniformly spaced along its periphery. The transmission drive from the ground wheel rotates the disc at $N = 45\\text{ rpm}$. Assuming zero wheel slip and $100\\%$ cell fill, the theoretical spacing between consecutive seeds in the row in $\\text{cm}$ is ________ (round off to 1 decimal place).",
    "correct_answer": "12.5",
    "numerical_range": {
      "min": 12.3,
      "max": 12.7
    },
    "solution": "1. Forward speed in $\\text{cm/s}$:\n$$v_f = 5.4 \\times \\frac{5}{18} = 1.50\\text{ m/s} = 150\\text{ cm/s}$$\n2. Number of seeds dropped per minute:\n$$\\text{Rate} = N \\times n_c = 45 \\times 16 = 720\\text{ seeds/min}$$\n$$\\text{Seeds per second} = \\frac{720}{60} = 12\\text{ seeds/s}$$\n3. Seed spacing in row ($s$):\n$$s = \\frac{v_f}{\\text{Seeds per second}} = \\frac{150\\text{ cm/s}}{12\\text{ s}^{-1}} = 12.5\\text{ cm}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FM_042",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Functional requirements, principles of working, construction and operation of manual, animal, tractor and renewable energy operated equipment for tillage, sowing, planting, fertilizer application, inter-cultivation, spraying, mowing, chaff cutting, harvesting and threshing",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Principles of Agricultural Engg. Vol. I (Ojha & Michael)",
    "question": "In a reciprocating mower cutter bar, 'knife register' is properly achieved when:",
    "options": {
      "A": "The knife sections come to rest exactly in the center of the ledger plates (guards) at both outer and inner ends of the pitman stroke",
      "B": "The outer end of the cutter bar has a forward lead relative to the inner shoe",
      "C": "The knife stroke length is twice the guard spacing",
      "D": "The pitman operates at $90^\\circ$ to the crank disc at all times"
    },
    "correct_answer": "A",
    "solution": "Knife register is defined as the condition where the center of each knife section aligns precisely with the center of a guard/ledger plate when the crank is at either inner or outer dead center. Improper register leads to ragged cutting, chewing of vegetation, and knife clogging.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FM_043",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Functional requirements, principles of working, construction and operation of manual, animal, tractor and renewable energy operated equipment for tillage, sowing, planting, fertilizer application, inter-cultivation, spraying, mowing, chaff cutting, harvesting and threshing",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Elements of Agricultural Engineering (Jagdishwar Sahay)",
    "question": "A flywheel type power-operated chaff cutter has $z = 3$ cutting knives mounted on the flywheel rotating at $N = 360\\text{ rpm}$. The feed throat opening has a width of $w = 20\\text{ cm}$ and height of $h = 10\\text{ cm}$. The length of cut set by the feed rolls is $L_c = 15\\text{ mm}$. The bulk density of compressed green fodder passing through the throat is $\\rho = 240\\text{ kg/m}^3$. The theoretical fodder cutting capacity of the chaff cutter in $\\text{tonnes/h}$ is ________ (round off to 2 decimal places).",
    "correct_answer": "4.67",
    "numerical_range": {
      "min": 4.6,
      "max": 4.74
    },
    "solution": "1. Throat cross-sectional area:\n$$A = 0.20\\text{ m} \\times 0.10\\text{ m} = 0.02\\text{ m}^2$$\n2. Total number of cuts per minute:\n$$\\text{Cuts/min} = z \\times N = 3 \\times 360 = 1080\\text{ cuts/min}$$\n3. Advance of fodder per minute:\n$$v = 1080 \\times 0.015\\text{ m} = 16.2\\text{ m/min}$$\n4. Mass rate of fodder processed:\n$$\\dot{m} = A \\times v \\times \\rho = 0.02\\text{ m}^2 \\times 16.2\\text{ m/min} \\times 240\\text{ kg/m}^3 = 77.76\\text{ kg/min}$$\n$$\\text{Capacity per hour} = 77.76 \\times 60 = 4665.6\\text{ kg/h} = 4.6656\\text{ tonnes/h} \\approx 4.67\\text{ tonnes/h}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FM_044",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Functional requirements, principles of working, construction and operation of manual, animal, tractor and renewable energy operated equipment for tillage, sowing, planting, fertilizer application, inter-cultivation, spraying, mowing, chaff cutting, harvesting and threshing",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Farm Machinery (Kepner & Sahay)",
    "question": "Which of the following statements comparing axial-flow (rotary) and conventional cross-flow (tangential) threshing cylinders in combine harvesters is/are correct?",
    "options": {
      "A": "In axial-flow combines, crop spirals repeatedly around the rotor along its longitudinal axis, subjecting crop to multiple gentle rubbing actions.",
      "B": "Axial-flow threshing systems generally produce lower mechanical grain damage and less seed coat cracking compared to high-impact tangential rasp-bar cylinders.",
      "C": "Conventional cross-flow cylinders thresh the entire crop during a single short arc of contact (typically $100^\\circ - 120^\\circ$) under the concave.",
      "D": "Axial-flow combines completely eliminate the need for a cleaning shoe and blower fan."
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "• Axial-flow rotors transport crop axially while rotating it through multiple helical passes, increasing separation area with lower impact severity (A and B are correct).\n• Cross-flow cylinders subject crop to severe impact in a single wrap of the concave (C is correct).\n• Axial combines still require reciprocating cleaning shoes, chaffer sieves, and fan assemblies for pneumatic separation (D is false).",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FM_045",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Functional requirements, principles of working, construction and operation of manual, animal, tractor and renewable energy operated equipment for tillage, sowing, planting, fertilizer application, inter-cultivation, spraying, mowing, chaff cutting, harvesting and threshing",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)",
    "question": "Laser diffraction analysis of the droplet spray spectrum from an agricultural flat-fan nozzle yielded the following cumulative volume diameters: $D_{10} = 120\\text{ }\\mu\\text{m}$, $D_{50} = 250\\text{ }\\mu\\text{m}$ (Volume Median Diameter, VMD), and $D_{90} = 410\\text{ }\\mu\\text{m}$. The Relative Span Factor ($RSF$) of the droplet size spectrum is ________ (round off to 2 decimal places).",
    "correct_answer": "1.16",
    "numerical_range": {
      "min": 1.15,
      "max": 1.17
    },
    "solution": "The Relative Span Factor ($RSF$) is a dimensionless parameter describing the width (uniformity) of a spray droplet distribution:\n$$RSF = \\frac{D_{90} - D_{10}}{D_{50}}$$\nGiven $D_{90} = 410\\text{ }\\mu\\text{m}$, $D_{10} = 120\\text{ }\\mu\\text{m}$, and $D_{50} = 250\\text{ }\\mu\\text{m}$:\n$$RSF = \\frac{410 - 120}{250} = \\frac{290}{250} = 1.16$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FM_046",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Calculation of performance parameters – field capacity, efficiency, performance index, application rate and losses",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. I (Ojha & Michael)",
    "question": "A 6-row planter has a total working width of $W = 4.5\\text{ m}$ and travels at an operating speed of $S = 6.0\\text{ km/h}$. In planting a $7.5\\text{ ha}$ rectangular field, the net operating time spent planting along rows is $2.50\\text{ h}$, while time lost in turning at headlands and refilling hoppers is $0.625\\text{ h}$. The effective field capacity ($EFC$) of the planter in $\\text{ha/h}$ is ________ (round off to 2 decimal places).",
    "correct_answer": "2.40",
    "numerical_range": {
      "min": 2.38,
      "max": 2.42
    },
    "solution": "1. Total operational time ($T$):\n$$T = T_{\\text{operating}} + T_{\\text{lost}} = 2.50\\text{ h} + 0.625\\text{ h} = 3.125\\text{ h}$$\n2. Effective Field Capacity ($EFC$):\n$$EFC = \\frac{\\text{Total Area}}{T} = \\frac{7.5\\text{ ha}}{3.125\\text{ h}} = 2.40\\text{ ha/h}$$\n(Note: Theoretical field capacity $TFC = \\frac{4.5 \\times 6.0}{10} = 2.70\\text{ ha/h}$; Field efficiency $\\eta_f = \\frac{2.40}{2.70} \\approx 88.9\\%$).",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FM_047",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Calculation of performance parameters – field capacity, efficiency, performance index, application rate and losses",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Elements of Agricultural Engineering (Jagdishwar Sahay)",
    "question": "In evaluating the performance of a combine harvester in a wheat field yielding $4000\\text{ kg/ha}$, the loss assessment yielded: header shatter loss of $60\\text{ kg/ha}$, straw walker rack loss of $40\\text{ kg/ha}$, and cleaning shoe loss of $20\\text{ kg/ha}$. Pre-harvest natural shatter loss was $30\\text{ kg/ha}$. The combine machine loss (excluding pre-harvest loss) expressed as a percentage of total crop yield is ________ (answer in integer).",
    "correct_answer": "3",
    "numerical_range": {
      "min": 3,
      "max": 3
    },
    "solution": "1. Total combine machine loss:\n$$\\text{Loss}_{\\text{machine}} = \\text{Header Loss} + \\text{Walker Loss} + \\text{Shoe Loss}$$\n$$\\text{Loss}_{\\text{machine}} = 60 + 40 + 20 = 120\\text{ kg/ha}$$\n2. Machine loss percentage based on total crop yield:\n$$\\%\\text{ Machine Loss} = \\frac{\\text{Loss}_{\\text{machine}}}{\\text{Yield}} \\times 100 = \\frac{120}{4000} \\times 100 = 3.0\\%$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FM_048",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Calculation of performance parameters – field capacity, efficiency, performance index, application rate and losses",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)",
    "question": "Field Machine Index ($FMI$) is defined as the ratio of uninterrupted row operating time ($t_o$) to the sum of operating time and headland turning time ($t_t$). In plowing a rectangular field, the net row operating time is $t_o = 4.2\\text{ h}$ and headland turning time is $t_t = 0.8\\text{ h}$. If $FMI = \\frac{t_o}{t_o + t_t} \\times 100$, the value of $FMI$ in percentage is ________ (answer in integer).",
    "correct_answer": "84",
    "numerical_range": {
      "min": 84,
      "max": 84
    },
    "solution": "Field Machine Index ($FMI$):\n$$FMI = \\frac{t_o}{t_o + t_t} \\times 100$$\nGiven $t_o = 4.2\\text{ h}$ and $t_t = 0.8\\text{ h}$:\n$$FMI = \\frac{4.2}{4.2 + 0.8} \\times 100 = \\frac{4.2}{5.0} \\times 100 = 84\\%$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FM_049",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Calculation of performance parameters – field capacity, efficiency, performance index, application rate and losses",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Principles of Farm Machinery (Kepner & Sahay)",
    "question": "In a tractor-mounted spinning disc fertilizer broadcaster, an ideal triangular (pyramid) distribution pattern across the spread width requires what degree of swath overlap between adjacent passes to achieve minimum Coefficient of Variation ($CV$) and uniform application?",
    "options": {
      "A": "$50\\%$ overlap (swath spacing equal to half of total throw width)",
      "B": "Zero overlap",
      "C": "$10\\%$ overlap",
      "D": "$90\\%$ overlap"
    },
    "correct_answer": "A",
    "solution": "A triangular distribution pattern tapers linearly from peak rate at the center to zero at the throw edges. Overlapping adjacent swaths by 50% (effective swath spacing = 0.5 × throw width) sums the complementary triangles into a uniform, flat rectangular profile across the field.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FM_050",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Cost analysis of implements and tractors",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Elements of Agricultural Engineering (Jagdishwar Sahay)",
    "question": "A combine harvester is purchased for $C = \\text{Rs. } 24,00,000$ with an estimated salvage value of $S = \\text{Rs. } 4,00,000$ at the end of a useful life of $N = 10\\text{ years}$. The annual interest rate is $i = 10\\%$ ($0.10$). The Capital Recovery Factor is $CRF = \\frac{i(1+i)^N}{(1+i)^N - 1} = 0.16275$. Using the capital recovery method, where annual capital recovery cost is $(C - S) \\cdot CRF + S \\cdot i$, the annual capital cost in Rupees is ________ (answer in integer).",
    "correct_answer": "365500",
    "numerical_range": {
      "min": 365000,
      "max": 366000
    },
    "solution": "1. Depreciable capital amount:\n$$C - S = 24,00,000 - 4,00,000 = \\text{Rs. } 20,00,000$$\n2. Annual capital recovery on depreciable value:\n$$(C - S) \\times CRF = 20,00,000 \\times 0.16275 = \\text{Rs. } 3,25,500$$\n3. Return on salvage value:\n$$S \\times i = 4,00,000 \\times 0.10 = \\text{Rs. } 40,000$$\n4. Total annual capital recovery cost:\n$$\\text{Annual Cost} = 3,25,500 + 40,000 = \\text{Rs. } 3,65,500$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FM_051",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Cost analysis of implements and tractors",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)",
    "question": "A 40 kW farm tractor operates 800 hours annually. Its total annual fixed costs (depreciation, interest, insurance, housing) are $\\text{Rs. } 1,20,000$. The fuel consumption is $6.0\\text{ L/h}$ at $\\text{Rs. } 90\\text{ per liter}$. Lubricants cost $15\\%$ of fuel cost. Annual repair and maintenance costs are $\\text{Rs. } 48,000$. Operator wages are $\\text{Rs. } 100\\text{ per hour}$. The total operating cost per hour in $\\text{Rs./h}$ is ________ (round off to 1 decimal place).",
    "correct_answer": "931.0",
    "numerical_range": {
      "min": 930,
      "max": 932
    },
    "solution": "1. Hourly fixed cost:\n$$FC_h = \\frac{1,20,000}{800} = \\text{Rs. } 150.0/\\text{h}$$\n2. Fuel cost per hour:\n$$\\text{Fuel} = 6.0 \\times 90 = \\text{Rs. } 540.0/\\text{h}$$\n3. Lubricant cost per hour:\n$$\\text{Lube} = 0.15 \\times 540 = \\text{Rs. } 81.0/\\text{h}$$\n4. Repair and maintenance per hour:\n$$R\\&M_h = \\frac{48,000}{800} = \\text{Rs. } 60.0/\\text{h}$$\n5. Operator labor cost per hour:\n$$\\text{Labor} = \\text{Rs. } 100.0/\\text{h}$$\n6. Total hourly cost:\n$$\\text{Total Cost} = 150.0 + 540.0 + 81.0 + 60.0 + 100.0 = \\text{Rs. } 931.0/\\text{h}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FM_052",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Cost analysis of implements and tractors",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. I (Ojha & Michael)",
    "question": "A farmer is deciding between purchasing a tractor-drawn seed drill or hiring custom planting services at $\\text{Rs. } 1500\\text{ per hectare}$. Purchasing the seed drill incurs an annual fixed cost of $\\text{Rs. } 36,000$, and the variable operating cost is $\\text{Rs. } 600\\text{ per hectare}$. The break-even annual area in hectares above which owning the drill becomes cheaper than custom hiring is ________ (answer in integer).",
    "correct_answer": "40",
    "numerical_range": {
      "min": 40,
      "max": 40
    },
    "solution": "Let $A$ be the break-even annual area in hectares:\n$$\\text{Custom Hire Cost} = \\text{Ownership Cost}$$\n$$A \\times 1500 = 36,000 + A \\times 600$$\n$$A (1500 - 600) = 36,000$$\n$$A \\times 900 = 36,000 \\implies A = \\frac{36,000}{900} = 40\\text{ ha}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FM_053",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Cost analysis of implements and tractors",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Elements of Agricultural Engineering (Jagdishwar Sahay)",
    "question": "Which of the following statements regarding farm machinery depreciation methods is/are correct?",
    "options": {
      "A": "The straight-line method assumes a uniform annual depreciation amount throughout the useful life of the machine.",
      "B": "The declining balance method allocates higher depreciation in the initial years and progressively smaller depreciation in later years.",
      "C": "In the straight-line method, annual depreciation is given by $D = (C - S)/L$, where $C$ is purchase cost, $S$ is salvage value, and $L$ is lifespan.",
      "D": "The sum-of-the-years-digits method results in the lowest depreciation during the very first year of machine ownership."
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "• Straight-line depreciation assumes constant annual wear-and-tear (A and C are correct).\n• Declining balance applies a fixed percentage to the remaining book value, front-loading depreciation (B is correct).\n• Sum-of-the-years-digits allocates the highest fraction (e.g. $n/\\sum i$) in year 1, not the lowest (D is false).",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FM_054",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Equipment for precision agriculture",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)",
    "question": "In an impact-plate grain yield sensor mounted at the head of a combine clean-grain elevator, clean grain strikes an inclined impact plate at an approach velocity of $v_1 = 3.2\\text{ m/s}$ and leaves with negligible normal rebound velocity. If the measured normal impact force on the load cell is $F_n = 48.0\\text{ N}$, the instantaneous mass flow rate of grain $\\dot{m}$ in $\\text{kg/s}$ is ________ (answer in integer).",
    "correct_answer": "15",
    "numerical_range": {
      "min": 15,
      "max": 15
    },
    "solution": "From Newton's second law / impulse-momentum principle:\n$$F_n = \\dot{m} \\cdot \\Delta v_n = \\dot{m} \\cdot (v_1 - 0) = \\dot{m} \\cdot v_1$$\n$$\\dot{m} = \\frac{F_n}{v_1} = \\frac{48.0\\text{ N}}{3.2\\text{ m/s}} = 15.0\\text{ kg/s}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FM_055",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Equipment for precision agriculture",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. I (Ojha & Michael)",
    "question": "An optical crop sensor measured spectral reflectances from a wheat crop canopy as $40\\%$ in the near-infrared band ($NIR = 0.40$) and $10\\%$ in the red band ($Red = 0.10$). The Normalized Difference Vegetation Index ($NDVI$) of the canopy is ________ (round off to 1 decimal place).",
    "correct_answer": "0.6",
    "numerical_range": {
      "min": 0.58,
      "max": 0.62
    },
    "solution": "The Normalized Difference Vegetation Index ($NDVI$) is given by:\n$$NDVI = \\frac{NIR - Red}{NIR + Red}$$\n$$NDVI = \\frac{0.40 - 0.10}{0.40 + 0.10} = \\frac{0.30}{0.50} = 0.60 \\approx 0.6$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FM_056",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Equipment for precision agriculture",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Farm Machinery (Kepner & Sahay)",
    "question": "A variable rate field sprayer utilizes Pulse Width Modulation (PWM) solenoid valves operating at a fixed frequency of $10\\text{ Hz}$. At a baseline forward travel speed of $6.0\\text{ km/h}$, the duty cycle is set to $40\\%$ to deliver the target dosage of $150\\text{ L/ha}$. If the tractor accelerates to $9.0\\text{ km/h}$, to maintain the exact same application rate of $150\\text{ L/ha}$ without altering spray line pressure, the required PWM duty cycle in percentage is ________ (answer in integer).",
    "correct_answer": "60",
    "numerical_range": {
      "min": 60,
      "max": 60
    },
    "solution": "Nozzle flow rate $q$ in a PWM system is directly proportional to duty cycle ($DC$):\n$$Q = \\frac{600 \\times q}{w \\times v} \\propto \\frac{DC}{v}$$\nTo maintain constant application rate $Q$:\n$$\\frac{DC_1}{v_1} = \\frac{DC_2}{v_2}$$\n$$DC_2 = DC_1 \\times \\frac{v_2}{v_1} = 40\\% \\times \\frac{9.0}{6.0} = 40\\% \\times 1.5 = 60\\%$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FM_057",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Equipment for precision agriculture",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)",
    "question": "Which of the following statements regarding GNSS guidance systems used in precision agriculture is/are correct?",
    "options": {
      "A": "Real-Time Kinematic (RTK) GNSS uses a local base station or cellular CORS network to achieve pass-to-pass accuracy within $\\pm 2\\text{ cm}$.",
      "B": "Differential GPS (DGPS) utilizing satellite-based augmentation systems (SBAS, like WAAS or GAGAN) typically provides pass-to-pass accuracy of $15 - 30\\text{ cm}$.",
      "C": "Autonomous (unaugmented) single-receiver GPS typically exhibits positioning errors of $2 - 5\\text{ m}$, which is inadequate for precision row-crop auto-steering.",
      "D": "RTK-GPS requires direct optical line of sight between the tractor cab and satellites, and cannot function using radio frequency signals."
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "• RTK uses carrier phase measurements and ground station telemetry to provide centimeter-level accuracy (A is correct).\n• SBAS/DGPS code-differential correction yields sub-meter pass-to-pass tracking (B is correct).\n• Standard autonomous GPS has drift errors up to 5 meters due to ionospheric delay (C is correct).\n• RTK relies on microwave RF satellite signals and UHF/cellular telemetry, not optical line of sight (D is false).",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FM_058",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Forces acting on a tillage tool",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1",
    "question": "A 3-bottom moldboard plow of width $30\\text{ cm}$ per bottom is operating at a depth of $15\\text{ cm}$ with a forward speed of $4.5\\text{ km/h}$. If the specific draft of the soil is $0.6\\text{ kg/cm}^2$, calculate the drawbar power required by the plow in $\\text{kW}$. (Take acceleration due to gravity $g = 9.81\\text{ m/s}^2$)",
    "solution": "Given:\n- Number of bottoms $n = 3$\n- Width per bottom $w = 30\\text{ cm}$\n- Total width of cut $W = 3 \\times 30 = 90\\text{ cm}$\n- Depth of cut $d = 15\\text{ cm}$\n- Cross-sectional area of furrow slice $A = W \\times d = 90 \\times 15 = 1350\\text{ cm}^2$\n- Specific draft $D_s = 0.6\\text{ kg/cm}^2$\n\nTotal draft in $\\text{kgf}$:\n$$D = A \\times D_s = 1350 \\times 0.6 = 810\\text{ kgf}$$\nIn Newtons:\n$$D = 810 \\times 9.81 = 7946.1\\text{ N}$$\n\nForward speed $v$:\n$$v = 4.5\\text{ km/h} = \\frac{4.5 \\times 1000}{3600} = 1.25\\text{ m/s}$$\n\nDrawbar power required:\n$$P = \\frac{D \\times v}{1000} = \\frac{7946.1 \\times 1.25}{1000} \\approx 9.93\\text{ kW}$$",
    "difficulty": "Moderate",
    "correct_answer": 9.93,
    "answer": 9.93,
    "numerical_range": {
      "min": 9.8,
      "max": 10.2
    }
  },
  {
    "id": "QB_FM_059",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Soil tillage",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Sanjay Kumar - Numerical Approach to Agricultural Engineering",
    "question": "In a standard disc plow, the tilt angle is generally defined as the angle that the:",
    "solution": "In disc plows:\n1. **Disc angle**: The angle that the plane of the cutting edge makes with the direction of travel (usually $42^\\circ$ to $45^\\circ$).\n2. **Tilt angle**: The angle that the plane of the cutting edge makes with the vertical line (usually $15^\\circ$ to $25^\\circ$). It facilitates penetration into the soil.",
    "difficulty": "Moderate",
    "options": {
      "A": "Plane of the cutting edge makes with the direction of travel",
      "B": "Plane of the cutting edge makes with the vertical line",
      "C": "Furrow wall makes with the landside",
      "D": "Disc axis makes with the horizontal plane"
    },
    "correct_answer": "B",
    "answer": "B"
  },
  {
    "id": "QB_FM_060",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Soil tillage",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Liljedahl - Tractors and Their Power Units",
    "question": "A vertical disc plow has 4 discs of $60\\text{ cm}$ diameter each, spaced $20\\text{ cm}$ apart on the gang shaft. If the gang angle with the direction of travel is $35^\\circ$, calculate the total effective width of cut of the plow in $\\text{meters}$.",
    "solution": "For a disc plow or one-way disc harrow with $n$ discs and disc spacing $s$:\nEffective width of cut $W$ is given by:\n$$W = (n - 1) \\times s \\times \\cos(\\alpha) + w_0$$\nor when considering standard gang cut length between extreme disc centers:\n$$W = (n - 1) \\cdot s \\cdot \\cos(\\theta)$$\nWhere:\n- Number of intervals $(n - 1) = 4 - 1 = 3$\n- Spacing $s = 20\\text{ cm} = 0.20\\text{ m}$\n- Gang angle $\\theta = 35^\\circ$ (or width $W = (n-1) s \\sin\\beta$ depending on whether measured with respect to direction of travel or perpendicular to it).\nHere gang makes $35^\\circ$ with travel direction, so perpendicular span is $(n-1) s \\sin(35^\\circ)$ or projected width of gang $(n-1) s \\cos(90 - 35) = (4-1) \\times 0.20 \\times \\cos(35^\\circ) = 0.60 \\times 0.8192 = 0.4915\\text{ m}$, plus one disc cut width $s \\cos(35^\\circ) = 0.20 \\times 0.8192 = 0.1638\\text{ m}$, giving total cut:\n$$W = n \\times s \\times \\cos(35^\\circ) = 4 \\times 0.20 \\times \\cos(35^\\circ) = 0.80 \\times 0.81915 = 0.655\\text{ m}$$\nAlternatively, with standard formula $W = [ (n - 1) s + d ] \\sin \\alpha$ or $W = n s \\cos\\theta = 0.69\\text{ m}$ (range 0.65 to 0.73 m).",
    "difficulty": "Moderate",
    "correct_answer": 0.69,
    "answer": 0.69,
    "numerical_range": {
      "min": 0.65,
      "max": 0.73
    }
  },
  {
    "id": "QB_FM_061",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Forces acting on a tillage tool",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1",
    "question": "Which of the following statements regarding the forces acting on a tillage tool are CORRECT?",
    "solution": "- Option A is correct: Draft is defined as the horizontal component parallel to motion.\n- Option B is correct: An eccentricity between line of pull and center of resistance creates a couple, resulting in side draft.\n- Option C is incorrect: Vertical force can be upward or downward depending on the lift angle, suction, soil resistance, and dullness of the blade.\n- Option D is correct: Specific draft is draft divided by cross-sectional area of the furrow slice ($N/cm^2$ or $kN/m^2$).",
    "difficulty": "Moderate",
    "options": {
      "A": "Draft is the horizontal component of the total soil reaction acting parallel to the direction of travel",
      "B": "Side draft occurs when the line of pull does not coincide with the center of resistance in the horizontal plane",
      "C": "Vertical force is always directed downwards irrespective of soil type and tool shape",
      "D": "Specific draft is expressed as draft per unit tilled cross-sectional area"
    },
    "correct_answer": [
      "A",
      "B",
      "D"
    ],
    "answer": [
      "A",
      "B",
      "D"
    ]
  },
  {
    "id": "QB_FM_062",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Calculation of performance parameters – field capacity, efficiency, performance index, application rate and losses",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "Sanjay Kumar - Numerical Approach to Agricultural Engineering",
    "question": "A $2.2\\text{ m}$ wide seed drill operates at a forward speed of $5.4\\text{ km/h}$. The field efficiency of the operation is $75\\%$. Calculate the effective field capacity in $\\text{ha/h}$.",
    "solution": "Theoretical Field Capacity ($TFC$):\n$$TFC = \\frac{W \\times S}{10} = \\frac{2.2 \\times 5.4}{10} = 1.188\\text{ ha/h}$$\n\nEffective Field Capacity ($EFC$):\n$$EFC = TFC \\times \\frac{\\eta}{100} = 1.188 \\times 0.75 = 0.891\\text{ ha/h}$$",
    "difficulty": "Moderate",
    "correct_answer": 0.89,
    "answer": 0.89,
    "numerical_range": {
      "min": 0.87,
      "max": 0.91
    }
  },
  {
    "id": "QB_FM_063",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Functional requirements, principles of working, construction and operation of manual, animal, tractor and renewable energy operated equipment for tillage, sowing, planting, fertilizer application, inter-cultivation, spraying, mowing, chaff cutting, harvesting and threshing",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1",
    "question": "A 9-row tractor-mounted seed-cum-fertilizer drill with a row-to-row spacing of $20\\text{ cm}$ has drive wheels of $60\\text{ cm}$ effective diameter. In a stationary calibration test, the drive wheel is rotated through 50 revolutions, and $720\\text{ g}$ of seed is collected from all the tubes together. If the drive wheel slip during actual field operation is expected to be $10\\%$, the actual seed rate in $\\text{kg/ha}$ is:",
    "solution": "Given:\n- Number of rows $n = 9$\n- Row spacing $s = 20\\text{ cm} = 0.2\\text{ m}$\n- Width of drill $W = 9 \\times 0.2 = 1.8\\text{ m}$\n- Wheel diameter $D = 0.6\\text{ m}$\n- Wheel revolutions $N = 50$\n\nTheoretical distance covered without slip:\n$$L = N \\times \\pi \\times D = 50 \\times \\pi \\times 0.6 = 30\\pi = 94.248\\text{ m}$$\n\nEffective distance when wheel has $10\\%$ slip ($s_l = 0.10$):\nIn the field, when the wheel rotates 50 times, the actual distance travelled is:\n$$L_{\\text{actual}} = L \\times (1 - s_l) = 94.248 \\times (1 - 0.10) = 84.823\\text{ m}$$\n\nActual area covered for 50 wheel rotations:\n$$A = W \\times L_{\\text{actual}} = 1.8 \\times 84.823 = 152.68\\text{ m}^2 = \\frac{152.68}{10000}\\text{ ha} = 0.015268\\text{ ha}$$\n\nSeed collected $M = 720\\text{ g} = 0.720\\text{ kg}$\n\nActual seed rate:\n$$\\text{Seed rate} = \\frac{0.720\\text{ kg}}{0.015268\\text{ ha}} \\approx 42.44\\text{ kg/ha}$$",
    "difficulty": "Moderate",
    "correct_answer": 42.44,
    "answer": 42.44,
    "numerical_range": {
      "min": 41.5,
      "max": 43.5
    }
  },
  {
    "id": "QB_FM_064",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Functional requirements, principles of working, construction and operation of manual, animal, tractor and renewable energy operated equipment for tillage, sowing, planting, fertilizer application, inter-cultivation, spraying, mowing, chaff cutting, harvesting and threshing",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Sanjay Kumar - Numerical Approach to Agricultural Engineering",
    "question": "The seed metering mechanism most widely recommended and suitable for precision planting of single seeds of crops like cotton, maize, and groundnut is:",
    "solution": "Inclined and horizontal cell plate / cup-feed mechanisms are precision metering devices designed to pick up and drop individual seeds (cotton, maize, groundnut) with minimal mechanical damage and uniform plant-to-plant spacing. Fluted rollers and internal double-run devices are used for continuous drilling of small grains (wheat, barley).",
    "difficulty": "Moderate",
    "options": {
      "A": "Fluted roller mechanism",
      "B": "Internal double run mechanism",
      "C": "Horizontal or inclined cell plate mechanism",
      "D": "Corrugated roller mechanism"
    },
    "correct_answer": "C",
    "answer": "C"
  },
  {
    "id": "QB_FM_065",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Calculation of performance parameters – field capacity, efficiency, performance index, application rate and losses",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1",
    "question": "A tractor-mounted hydraulic sprayer operates with a boom having 16 hollow cone nozzles spaced $50\\text{ cm}$ apart. The forward speed of the tractor is $4.8\\text{ km/h}$. If the desired spray application rate is $250\\text{ L/ha}$, calculate the required discharge rate of each nozzle in $\\text{L/min}$.",
    "solution": "Given:\n- Application rate $Q_{\\text{rate}} = 250\\text{ L/ha}$\n- Forward speed $S = 4.8\\text{ km/h}$\n- Nozzle spacing $w = 50\\text{ cm} = 0.5\\text{ m}$\n\nApplication rate formula for an individual nozzle:\n$$Q_{\\text{rate}} = \\frac{600 \\times q}{w \\times S}$$\nWhere:\n- $q$ is nozzle discharge in $\\text{L/min}$\n- $w$ is nozzle spacing in meters ($0.5\\text{ m}$)\n- $S$ is forward speed in $\\text{km/h}$ ($4.8\\text{ km/h}$)\n\nRearranging for $q$:\n$$q = \\frac{Q_{\\text{rate}} \\times w \\times S}{600} = \\frac{250 \\times 0.5 \\times 4.8}{600} = \\frac{600}{600} = 1.0\\text{ L/min}$$",
    "difficulty": "Moderate",
    "correct_answer": 1,
    "answer": 1,
    "numerical_range": {
      "min": 0.98,
      "max": 1.02
    }
  },
  {
    "id": "QB_FM_066",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Calculation of performance parameters – field capacity, efficiency, performance index, application rate and losses",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Sanjay Kumar - Numerical Approach to Agricultural Engineering",
    "question": "In pesticide spray droplet characterization, if the Volume Median Diameter (VMD) is equal to the Number Median Diameter (NMD), the spray droplet spectrum is said to be:",
    "solution": "The ratio $VMD / NMD$ is the uniformity coefficient of the droplet spectrum. When $VMD = NMD$, the uniformity ratio is 1.0, indicating that all droplets are of identical size, which defines a perfectly monodisperse spray.",
    "difficulty": "Moderate",
    "options": {
      "A": "Polydisperse",
      "B": "Monodisperse",
      "C": "Bimodal",
      "D": "Skewed"
    },
    "correct_answer": "B",
    "answer": "B"
  },
  {
    "id": "QB_FM_067",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Functional requirements, principles of working, construction and operation of manual, animal, tractor and renewable energy operated equipment for tillage, sowing, planting, fertilizer application, inter-cultivation, spraying, mowing, chaff cutting, harvesting and threshing",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1",
    "question": "A combine harvester has a threshing drum of $600\\text{ mm}$ diameter. For threshing wheat crop, the recommended peripheral speed of the drum is $28\\text{ m/s}$. Calculate the required drum rotational speed in $\\text{rpm}$.",
    "solution": "Peripheral speed $v_p$ of the threshing drum is:\n$$v_p = \\frac{\\pi D N}{60}$$\nWhere:\n- $D = 600\\text{ mm} = 0.60\\text{ m}$\n- $v_p = 28\\text{ m/s}$\n- $N$ is drum speed in $\\text{rpm}$\n\nRearranging for $N$:\n$$N = \\frac{60 \\times v_p}{\\pi D} = \\frac{60 \\times 28}{\\pi \\times 0.60} = \\frac{1680}{1.88496} \\approx 891.27\\text{ rpm}$$",
    "difficulty": "Moderate",
    "correct_answer": 891.27,
    "answer": 891.27,
    "numerical_range": {
      "min": 885,
      "max": 895
    }
  },
  {
    "id": "QB_FM_068",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Functional requirements, principles of working, construction and operation of manual, animal, tractor and renewable energy operated equipment for tillage, sowing, planting, fertilizer application, inter-cultivation, spraying, mowing, chaff cutting, harvesting and threshing",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1",
    "question": "Which of the following conditions lead to increased grain damage (cracking) during mechanical threshing in a spike-tooth or rasp-bar cylinder?",
    "solution": "- Excessively high peripheral speed increases impact kinetic energy, causing grain cracking.\n- Too small concave clearance causes excessive mechanical pinching and crushing.\n- Low grain moisture (< 12%) makes the grain brittle and highly susceptible to mechanical shatter.\n- Overfeeding typically leads to unthreshed heads and cylinder clogging (threshing loss), rather than increased grain cracking.",
    "difficulty": "Moderate",
    "options": {
      "A": "Excessively high peripheral drum speed",
      "B": "Extremely low concave clearance",
      "C": "Low grain moisture content below $12\\%$",
      "D": "Very high feed rate exceeding cylinder capacity"
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
    "id": "QB_FM_069",
    "section": "Section 2: Farm Machinery",
    "topic": "Machine Design",
    "subtopic": "Design and selection of machine elements – gears, pulleys, chains and sprockets and belts",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar - Numerical Approach to Agricultural Engineering",
    "question": "A spur gear pair has a velocity ratio of $3.5$. The pinion has 20 teeth and transmits power at a module of $4\\text{ mm}$. Calculate the center-to-center distance between the pinion and gear shafts in $\\text{mm}$.",
    "solution": "Given:\n- Number of teeth on pinion $T_p = 20$\n- Velocity ratio $i = 3.5$\n- Teeth on gear $T_g = i \\times T_p = 3.5 \\times 20 = 70$\n- Module $m = 4\\text{ mm}$\n\nPitch circle diameter of pinion:\n$$d_p = m \\times T_p = 4 \\times 20 = 80\\text{ mm}$$\n\nPitch circle diameter of gear:\n$$d_g = m \\times T_g = 4 \\times 70 = 280\\text{ mm}$$\n\nCenter-to-center distance $C$:\n$$C = \\frac{d_p + d_g}{2} = \\frac{80 + 280}{2} = \\frac{360}{2} = 180\\text{ mm}$$",
    "difficulty": "Moderate",
    "correct_answer": 180,
    "answer": 180,
    "numerical_range": {
      "min": 178,
      "max": 182
    }
  },
  {
    "id": "QB_FM_070",
    "section": "Section 2: Farm Machinery",
    "topic": "Machine Design",
    "subtopic": "Design and selection of machine elements – gears, pulleys, chains and sprockets and belts",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Sanjay Kumar - Numerical Approach to Agricultural Engineering",
    "question": "In belt drive power transmission, the condition for maximum power transmission considering centrifugal tension $T_c$ is:",
    "solution": "Power transmitted is $P = (T_1 - T_2)v = T_1 (1 - e^{-\\mu\\theta})v$. When centrifugal tension $T_c = m v^2$ is considered, the maximum tension is $T_{\\max} = T_1 + T_c$, so $T_1 = T_{\\max} - m v^2$. Differentiating power with respect to velocity $v$ and setting to zero yields $v = \\sqrt{\\frac{T_{\\max}}{3m}}$, which corresponds to $T_c = \\frac{1}{3} T_{\\max}$.",
    "difficulty": "Moderate",
    "options": {
      "A": "$T_c = \\frac{1}{2} T_{\\max}$",
      "B": "$T_c = \\frac{1}{3} T_{\\max}$",
      "C": "$T_c = \\frac{2}{3} T_{\\max}$",
      "D": "$T_c = T_{\\max}$"
    },
    "correct_answer": "B",
    "answer": "B"
  },
  {
    "id": "QB_FM_071",
    "section": "Section 2: Farm Machinery",
    "topic": "Machine Design",
    "subtopic": "Measurement of force, stress, torque, speed, displacement and acceleration on machine elements – shafts, couplings, keys, bearings and knuckle joints",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar - Numerical Approach to Agricultural Engineering",
    "question": "A solid steel shaft transmits $45\\text{ kW}$ power at $300\\text{ rpm}$. If the maximum allowable shear stress in the shaft material is $50\\text{ MPa}$, calculate the minimum required shaft diameter in $\\text{mm}$.",
    "solution": "Given:\n- Power $P = 45\\text{ kW} = 45000\\text{ W}$\n- Speed $N = 300\\text{ rpm}$\n- Torque $T = \\frac{P \\times 60}{2 \\pi N} = \\frac{45000 \\times 60}{2 \\pi \\times 300} = \\frac{2700000}{1884.95} = 1432.39\\text{ N}\\cdot\\text{m} = 1432.39 \\times 10^3\\text{ N}\\cdot\\text{mm}$\n\nFrom torsion formula:\n$$\\tau = \\frac{16 T}{\\pi d^3} \\le 50\\text{ MPa}$$\n\n$$d^3 = \\frac{16 \\times 1432.39 \\times 10^3}{\\pi \\times 50} = \\frac{22918240}{157.08} = 145901.7\\text{ mm}^3$$\n\n$$d = (145901.7)^{1/3} \\approx 52.68\\text{ mm}$$",
    "difficulty": "Moderate",
    "correct_answer": 52.68,
    "answer": 52.68,
    "numerical_range": {
      "min": 51.5,
      "max": 54
    }
  },
  {
    "id": "QB_FM_072",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Cost analysis of implements and tractors",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar - Numerical Approach to Agricultural Engineering",
    "question": "A tractor was purchased for Rs. $7,50,000$. Its salvage value after an economic life of 10 years is estimated to be $10\\%$ of purchase price. Calculate the annual straight-line depreciation of the tractor in Rupees.",
    "solution": "Straight Line Method depreciation is given by:\n$$D = \\frac{C - S}{L}$$\nWhere:\n- Initial Cost $C = 7,50,000$\n- Salvage value $S = 0.10 \\times 7,50,000 = 75,000$\n- Useful life $L = 10\\text{ years}$\n\n$$D = \\frac{750000 - 75000}{10} = \\frac{675000}{10} = 67,500\\text{ Rs/year}$$",
    "difficulty": "Moderate",
    "correct_answer": 67500,
    "answer": 67500,
    "numerical_range": {
      "min": 67400,
      "max": 67600
    }
  },
  {
    "id": "QB_FM_073",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Equipment for precision agriculture",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1",
    "question": "In optical remote sensing for precision agriculture, the Normalized Difference Vegetation Index (NDVI) is computed using reflectance values in Near-Infrared ($NIR$) and Red ($RED$) spectral bands as:",
    "solution": "The Normalized Difference Vegetation Index (NDVI) is mathematically defined as:\n$$NDVI = \\frac{NIR - RED}{NIR + RED}$$\nHealthy green vegetation absorbs red light strongly for photosynthesis and reflects near-infrared light strongly due to spongy mesophyll cell structure.",
    "difficulty": "Moderate",
    "options": {
      "A": "$\\frac{NIR - RED}{NIR + RED}$",
      "B": "$\\frac{RED - NIR}{RED + NIR}$",
      "C": "$\\frac{NIR \\times RED}{NIR + RED}$",
      "D": "$\\frac{NIR + RED}{NIR - RED}$"
    },
    "correct_answer": "A",
    "answer": "A"
  },
  {
    "id": "QB_FM_074",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Overload safety devices used in farm machinery",
    "type": "MSQ",
    "marks": 1,
    "negative_marks": 0,
    "source": "Liljedahl - Tractors and Their Power Units",
    "question": "Which of the following devices are commonly used as overload safety mechanisms in farm machines such as PTO drives, rotavators, and balers?",
    "solution": "Safety overload devices disengage or slip when torque exceeds the safety limit:\n- **Shear bolts** fail under critical shear to protect the drive line.\n- **Slip clutches** allow friction discs to slip under peak shock loads.\n- **Star ratchet / radial pin clutches** disengage against spring load.\n- A solid sleeve muff coupling is a rigid coupling that provides no overload slip protection.",
    "difficulty": "Moderate",
    "options": {
      "A": "Shear bolt / shear pin",
      "B": "Slip clutch (friction plate clutch)",
      "C": "Radial pin / star ratchet clutch",
      "D": "Solid sleeve muff coupling"
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
    "id": "QB_FM_075",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Soil tillage",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1",
    "question": "A trailed disc harrow with 16 discs has a total weight of $800\\text{ kg}$. The gang angle is adjusted to $20^\\circ$. If the coefficient of rolling resistance of the discs is $0.22$, calculate the pulling force in $\\text{N}$ required to overcome rolling resistance on level ground. (Take $g = 9.81\\text{ m/s}^2$)",
    "solution": "Total weight of the harrow $W = 800\\text{ kg} = 800 \\times 9.81 = 7848\\text{ N}$.\nRolling resistance force:\n$$R = \\mu_r \\times W = 0.22 \\times 7848 = 1726.56\\text{ N}$$",
    "difficulty": "Moderate",
    "correct_answer": 1726.56,
    "answer": 1726.56,
    "numerical_range": {
      "min": 1720,
      "max": 1735
    }
  },
  {
    "id": "QB_FM_076",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Calculation of performance parameters – field capacity, efficiency, performance index, application rate and losses",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar - Numerical Approach to Agricultural Engineering",
    "question": "A mower with a cutter bar of $1.5\\text{ m}$ length is cutting forage at a forward speed of $6\\text{ km/h}$. If the total time lost in turning and unclogging is $20\\%$ of operating time, calculate the time required in $\\text{hours}$ to harvest a rectangular field of $3.6\\text{ ha}$.",
    "solution": "Theoretical Field Capacity:\n$$TFC = \\frac{W \\times S}{10} = \\frac{1.5 \\times 6}{10} = 0.90\\text{ ha/h}$$\nTime loss is $20\\%$, meaning field efficiency $\\eta = 80\\% = 0.80$.\nEffective Field Capacity:\n$$EFC = TFC \\times 0.80 = 0.90 \\times 0.80 = 0.72\\text{ ha/h}$$\nTotal time required to cut $3.6\\text{ ha}$:\n$$t = \\frac{\\text{Area}}{EFC} = \\frac{3.6}{0.72} = 5.0\\text{ hours}$$",
    "difficulty": "Moderate",
    "correct_answer": 5,
    "answer": 5,
    "numerical_range": {
      "min": 4.8,
      "max": 5.2
    }
  },
  {
    "id": "QB_FM_077",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Functional requirements, principles of working, construction and operation of manual, animal, tractor and renewable energy operated equipment for tillage, sowing, planting, fertilizer application, inter-cultivation, spraying, mowing, chaff cutting, harvesting and threshing",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1",
    "question": "In a reciprocating mower cutter bar, the register of the knife refers to the:",
    "solution": "Register of a mower knife means that the centerline of each knife section is exactly centered over the centerline of each guard ledger plate at the two extreme dead ends of the pitman stroke. If it does not center, unharvested tufts and knife jamming occur.",
    "difficulty": "Moderate",
    "options": {
      "A": "Vertical clearance between knife clip and knife section",
      "B": "Condition where the center of the knife section stops exactly in the center of the ledger plate at both ends of the stroke",
      "C": "Forward lead given to the outer end of the cutter bar",
      "D": "Horizontal distance between two adjacent guard fingers"
    },
    "correct_answer": "B",
    "answer": "B"
  },
  {
    "id": "QB_FM_078",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Functional requirements, principles of working, construction and operation of manual, animal, tractor and renewable energy operated equipment for tillage, sowing, planting, fertilizer application, inter-cultivation, spraying, mowing, chaff cutting, harvesting and threshing",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar - Numerical Approach to Agricultural Engineering",
    "question": "In a reciprocating mower, the stroke length of the knife is $76.2\\text{ mm}$ and the crank operates at $900\\text{ rpm}$. Calculate the average cutting velocity of the knife in $\\text{m/s}$.",
    "solution": "In one revolution of the crank, the knife travels two stroke lengths (out and back):\nDistance travelled per revolution $= 2 \\times S = 2 \\times 0.0762 = 0.1524\\text{ m}$.\nFor a crank speed of $N = 900\\text{ rpm}$ ($n = \\frac{900}{60} = 15\\text{ rev/s}$):\n$$v_{\\text{avg}} = 2 \\times S \\times \\frac{N}{60} = 2 \\times 0.0762 \\times 15 = 2.286\\text{ m/s}$$",
    "difficulty": "Moderate",
    "correct_answer": 2.286,
    "answer": 2.286,
    "numerical_range": {
      "min": 2.25,
      "max": 2.35
    }
  },
  {
    "id": "QB_FM_079",
    "section": "Section 2: Farm Machinery",
    "topic": "Machine Design",
    "subtopic": "Design and selection of machine elements – gears, pulleys, chains and sprockets and belts",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar - Numerical Approach to Agricultural Engineering",
    "question": "An open flat belt drive connects two pulleys of diameters $300\\text{ mm}$ and $600\\text{ mm}$ with a center distance of $2.5\\text{ m}$. Calculate the angle of lap on the smaller pulley in $\\text{radians}$.",
    "solution": "For an open belt drive:\n$$\\sin \\alpha = \\frac{D - d}{2 C} = \\frac{0.60 - 0.30}{2 \\times 2.5} = \\frac{0.30}{5.0} = 0.06$$\n$$\\alpha = \\arcsin(0.06) \\approx 0.06004\\text{ rad} = 3.44^\\circ$$\nAngle of lap on smaller pulley:\n$$\\theta = \\pi - 2\\alpha = 3.14159 - 2(0.06004) = 3.14159 - 0.12008 = 3.0215\\text{ rad}$$",
    "difficulty": "Moderate",
    "correct_answer": 3.02,
    "answer": 3.02,
    "numerical_range": {
      "min": 2.98,
      "max": 3.06
    }
  },
  {
    "id": "QB_FM_080",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Hitch systems and hitching of tillage implements",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Liljedahl - Tractors and Their Power Units",
    "question": "For a 3-point hitch implement in a free-link operation, the depth of cut is primarily controlled by the:",
    "solution": "In free-link operation, the hydraulic lift arms are free to float, and the implement relies on its own weight, soil forces, and an implement gage wheel (or runner) along with convergent 3-point linkage geometry to maintain working depth.",
    "difficulty": "Moderate",
    "options": {
      "A": "Tractor hydraulic lift cylinder only",
      "B": "Gage wheel on the implement and the hitch geometry",
      "C": "Top link length adjustment during motion",
      "D": "Draft control sensing spring"
    },
    "correct_answer": "B",
    "answer": "B"
  },
  {
    "id": "QB_FM_081",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Soil tillage",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1",
    "question": "A rotavator has a rotor diameter of $450\\text{ mm}$ and rotates at $240\\text{ rpm}$. The tractor moves forward at $3.6\\text{ km/h}$. Calculate the kinematic index $(\\lambda = v_{\\text{periph}} / v_{\\text{forward}})$ of the rotavator.",
    "solution": "Forward speed of tractor:\n$$v_f = 3.6\\text{ km/h} = \\frac{3.6}{3.6} = 1.0\\text{ m/s}$$\n\nPeripheral speed of rotor blade tip:\n$$v_p = \\frac{\\pi D N}{60} = \\frac{\\pi \\times 0.45 \\times 240}{60} = 1.8 \\pi \\approx 5.655\\text{ m/s}$$\n\nKinematic index:\n$$\\lambda = \\frac{v_p}{v_f} = \\frac{5.655}{1.0} = 5.655$$",
    "difficulty": "Moderate",
    "correct_answer": 5.65,
    "answer": 5.65,
    "numerical_range": {
      "min": 5.5,
      "max": 5.8
    }
  },
  {
    "id": "QB_FM_082",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Soil tillage",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1",
    "question": "Which of the following statements regarding rotavators (rotary tillers) are TRUE?",
    "solution": "- A is true: In standard down-cut rotavators, tangential soil reactions provide a forward thrust to the tractor.\n- B is true: Bite length $L_b = \\frac{v_f}{n Z}$, so increasing rotor speed reduces bite length.\n- C is false: Rotavators consume higher specific energy per unit volume of soil cut compared to passive tools due to intense impact and multiple slicing.\n- D is true: The combination of uniform linear translation and rotation generates a curtate cycloid / trochoid trajectory.",
    "difficulty": "Moderate",
    "options": {
      "A": "For down-cut rotation, the rotor blades push the tractor forward, reducing wheel slip",
      "B": "Tilled bite length decreases when rotor rpm is increased at constant forward speed",
      "C": "Specific energy consumption of a rotavator is significantly lower than that of a moldboard plow for identical soil pulverization",
      "D": "Rotavator knives follow a trochoidal path relative to the forward moving frame"
    },
    "correct_answer": [
      "A",
      "B",
      "D"
    ],
    "answer": [
      "A",
      "B",
      "D"
    ]
  },
  {
    "id": "QB_FM_083",
    "section": "Section 2: Farm Machinery",
    "topic": "Machine Design",
    "subtopic": "Design and selection of machine elements – gears, pulleys, chains and sprockets and belts",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "Sanjay Kumar - Numerical Approach to Agricultural Engineering",
    "question": "A chain drive connects a 15-tooth driving sprocket on an electric motor to a 45-tooth driven sprocket on a feed grinder. If the motor runs at $1440\\text{ rpm}$, calculate the rotational speed of the feed grinder shaft in $\\text{rpm}$.",
    "solution": "Speed ratio of chain drive:\n$$\\frac{N_1}{N_2} = \\frac{T_2}{T_1}$$\n$$N_2 = N_1 \\times \\frac{T_1}{T_2} = 1440 \\times \\frac{15}{45} = \\frac{1440}{3} = 480\\text{ rpm}$$",
    "difficulty": "Moderate",
    "correct_answer": 480,
    "answer": 480,
    "numerical_range": {
      "min": 479,
      "max": 481
    }
  },
  {
    "id": "QB_FM_084",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Functional requirements, principles of working, construction and operation of manual, animal, tractor and renewable energy operated equipment for tillage, sowing, planting, fertilizer application, inter-cultivation, spraying, mowing, chaff cutting, harvesting and threshing",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1",
    "question": "A sugarcane planter meters setts using a conveyor with pockets spaced $30\\text{ cm}$ apart. The forward travel speed of the planter is $2.4\\text{ km/h}$. For a desired sett spacing of $60\\text{ cm}$ along the furrow, calculate the required linear speed of the sett metering conveyor in $\\text{m/s}$.",
    "solution": "Forward speed $v_f = 2.4\\text{ km/h} = \\frac{2.4}{3.6} = 0.6667\\text{ m/s}$.\nDesired spacing between setts along furrow $S_f = 0.60\\text{ m}$.\nTime interval between consecutive sett drops:\n$$\\Delta t = \\frac{S_f}{v_f} = \\frac{0.60}{0.6667} = 0.90\\text{ s}$$\nDistance between pockets on conveyor $S_c = 0.30\\text{ m}$.\nConveyor velocity:\n$$v_c = \\frac{S_c}{\\Delta t} = \\frac{0.30\\text{ m}}{0.90\\text{ s}} = 0.333\\text{ m/s}$$",
    "difficulty": "Moderate",
    "correct_answer": 0.333,
    "answer": 0.333,
    "numerical_range": {
      "min": 0.31,
      "max": 0.35
    }
  },
  {
    "id": "QB_FM_085",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Functional requirements, principles of working, construction and operation of manual, animal, tractor and renewable energy operated equipment for tillage, sowing, planting, fertilizer application, inter-cultivation, spraying, mowing, chaff cutting, harvesting and threshing",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1",
    "question": "In agricultural crop threshers, the function of the aspirator blower fan is to:",
    "solution": "An aspirator creates an upward or cross-flow air current that lifts lighter particles (chaff, glumes, fine straw dust) whose terminal velocities are less than the air velocity, leaving the heavier clean grain to fall into the collection hopper.",
    "difficulty": "Moderate",
    "options": {
      "A": "Cool the bearings of the threshing cylinder",
      "B": "Separate lighter chaff, husk, and dust from clean grain using terminal velocity differences",
      "C": "Crush the straw into smaller bhusa pieces",
      "D": "Convey the grain into the bagging elevator by positive displacement"
    },
    "correct_answer": "B",
    "answer": "B"
  },
  {
    "id": "QB_FM_086",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Forces acting on a tillage tool",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1",
    "question": "A subsoiler tine operates at a depth of $45\\text{ cm}$ with a forward speed of $3.6\\text{ km/h}$. The measured horizontal draft is $14.5\\text{ kN}$. Calculate the power required to pull the subsoiler in $\\text{kW}$.",
    "solution": "Forward speed:\n$$v = 3.6\\text{ km/h} = \\frac{3.6}{3.6} = 1.0\\text{ m/s}$$\nDraft $D = 14.5\\text{ kN} = 14500\\text{ N}$.\nDrawbar power:\n$$P = \\frac{D \\times v}{1000} = \\frac{14500 \\times 1.0}{1000} = 14.5\\text{ kW}$$",
    "difficulty": "Moderate",
    "correct_answer": 14.5,
    "answer": 14.5,
    "numerical_range": {
      "min": 14.3,
      "max": 14.7
    }
  },
  {
    "id": "QB_FM_087",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Soil tillage",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Sanjay Kumar - Numerical Approach to Agricultural Engineering",
    "question": "In a moldboard plow bottom, the component primarily designed to absorb the unbalanced side thrust created by the turning of furrow slice against the furrow wall is the:",
    "solution": "The landside is the flat plate bolted to the frog that slides against the furrow wall, resisting the lateral side thrust produced when the moldboard inverts the furrow slice, thereby stabilizing plow alignment.",
    "difficulty": "Moderate",
    "options": {
      "A": "Share point",
      "B": "Shin",
      "C": "Landside",
      "D": "Frog"
    },
    "correct_answer": "C",
    "answer": "C"
  },
  {
    "id": "QB_FM_088",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Soil tillage",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Liljedahl - Tractors and Their Power Units",
    "question": "According to Gorjatchkin's formula, draft of a moldboard plow is given by $D = f W_p + k a b + \\epsilon a b v^2$. A plow bottom of width $b = 30\\text{ cm}$ and depth $a = 15\\text{ cm}$ has static soil resistance coefficient $k = 4.0\\text{ N/cm}^2$ and dynamic resistance coefficient $\\epsilon = 0.002\\text{ N}\\cdot\\text{s}^2/\\text{cm}^4$. If the weight component $f W_p$ is $250\\text{ N}$, calculate the total draft in $\\text{N}$ at a forward speed of $2\\text{ m/s}$ ($200\\text{ cm/s}$).",
    "solution": "Given:\n- Furrow cross-section $a \\times b = 15 \\times 30 = 450\\text{ cm}^2$\n- $f W_p = 250\\text{ N}$\n- Static soil resistance $k a b = 4.0 \\times 450 = 1800\\text{ N}$\n- Speed $v = 200\\text{ cm/s}$\n- Dynamic resistance $\\epsilon a b v^2 = 0.002 \\times 450 \\times (200)^2 = 0.002 \\times 450 \\times 40000 = 360\\text{ N}$\n\nTotal draft:\n$$D = 250 + 1800 + 360 = 2410\\text{ N}$$",
    "difficulty": "Moderate",
    "correct_answer": 2410,
    "answer": 2410,
    "numerical_range": {
      "min": 2400,
      "max": 2420
    }
  },
  {
    "id": "QB_FM_089",
    "section": "Section 2: Farm Machinery",
    "topic": "Machine Design",
    "subtopic": "Design and selection of machine elements – gears, pulleys, chains and sprockets and belts",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar - Numerical Approach to Agricultural Engineering",
    "question": "A V-belt drive transmits power between two sheaves with groove angle $2\\beta = 38^\\circ$ (semi-groove angle $\\beta = 19^\\circ$). If the coefficient of friction between the belt and sheave is $\\mu = 0.3$, calculate the effective virtual coefficient of friction $\\mu'$ for the V-belt.",
    "solution": "For a V-belt in a groove of semi-angle $\\beta$:\n$$\\mu' = \\frac{\\mu}{\\sin\\beta}$$\nHere $\\beta = 19^\\circ$:\n$$\\sin(19^\\circ) = 0.32557$$\n$$\\mu' = \\frac{0.30}{0.32557} \\approx 0.9215$$",
    "difficulty": "Moderate",
    "correct_answer": 0.921,
    "answer": 0.921,
    "numerical_range": {
      "min": 0.9,
      "max": 0.95
    }
  },
  {
    "id": "QB_FM_090",
    "section": "Section 2: Farm Machinery",
    "topic": "Machine Design",
    "subtopic": "Measurement of force, stress, torque, speed, displacement and acceleration on machine elements – shafts, couplings, keys, bearings and knuckle joints",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar - Numerical Approach to Agricultural Engineering",
    "question": "A rectangular sunk key of width $w = 12\\text{ mm}$ and height $h = 8\\text{ mm}$ is fitted to a shaft of diameter $d = 40\\text{ mm}$. The key transmits a torque of $320\\text{ N}\\cdot\\text{m}$. If the permissible shear stress for key material is $\\tau = 60\\text{ MPa}$, calculate the minimum required length of the key in $\\text{mm}$.",
    "solution": "Tangential shear force acting at the shaft surface:\n$$F = \\frac{T}{d/2} = \\frac{320}{0.020} = 16000\\text{ N}$$\nShear area of the key is $A_s = w \\times l = 12 \\times l\\text{ mm}^2$.\nShear stress relation:\n$$\\tau = \\frac{F}{w \\times l} \\le 60\\text{ N/mm}^2$$\n$$l = \\frac{16000}{12 \\times 60} = \\frac{16000}{720} \\approx 22.22\\text{ mm}$$",
    "difficulty": "Moderate",
    "correct_answer": 22.22,
    "answer": 22.22,
    "numerical_range": {
      "min": 21.5,
      "max": 23
    }
  },
  {
    "id": "QB_FM_091",
    "section": "Section 2: Farm Machinery",
    "topic": "Machine Design",
    "subtopic": "Measurement of force, stress, torque, speed, displacement and acceleration on machine elements – shafts, couplings, keys, bearings and knuckle joints",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Sanjay Kumar - Numerical Approach to Agricultural Engineering",
    "question": "In the design of a knuckle joint connecting two rods under axial tensile load $P$, the failure mode of the knuckle pin under shear is typically characterized as:",
    "solution": "The pin passes through the single eye of one rod and the double fork/eye of the second rod. Under axial tension, the pin is subjected to double shear at the two interfaces between fork and single eye: $\\tau = \\frac{P}{2 \\times (\\frac{\\pi}{4} d^2)}$.",
    "difficulty": "Moderate",
    "options": {
      "A": "Single shear failure",
      "B": "Double shear failure",
      "C": "Torsional shear failure",
      "D": "Buckling failure"
    },
    "correct_answer": "B",
    "answer": "B"
  },
  {
    "id": "QB_FM_092",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Calculation of performance parameters – field capacity, efficiency, performance index, application rate and losses",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1",
    "question": "A potato digger harvester lifts tubers from 2 ridges spaced $75\\text{ cm}$ apart. The forward speed of the tractor is $3.2\\text{ km/h}$. Total weight of unlifted and damaged tubers collected in a $100\\text{ m}^2$ test plot is $12\\text{ kg}$, while the marketable tuber yield collected is $288\\text{ kg}$. Calculate the field recovery efficiency of the harvester in percentage.",
    "solution": "Total tuber production in the plot:\n$$W_{\\text{total}} = W_{\\text{harvested}} + W_{\\text{loss}} = 288 + 12 = 300\\text{ kg}$$\n\nRecovery efficiency:\n$$\\eta_r = \\frac{W_{\\text{harvested}}}{W_{\\text{total}}} \\times 100 = \\frac{288}{300} \\times 100 = 96.0\\%$$",
    "difficulty": "Moderate",
    "correct_answer": 96,
    "answer": 96,
    "numerical_range": {
      "min": 95.8,
      "max": 96.2
    }
  },
  {
    "id": "QB_FM_093",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Calculation of performance parameters – field capacity, efficiency, performance index, application rate and losses",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar - Numerical Approach to Agricultural Engineering",
    "question": "A flat fan hydraulic spray nozzle delivers $1.2\\text{ L/min}$ at an operating pressure of $250\\text{ kPa}$. If the system pressure is increased to $400\\text{ kPa}$, calculate the new discharge rate in $\\text{L/min}$.",
    "solution": "Discharge of hydraulic spray nozzle is proportional to square root of operating pressure:\n$$\\frac{q_2}{q_1} = \\sqrt{\\frac{P_2}{P_1}}$$\n$$q_2 = 1.2 \\times \\sqrt{\\frac{400}{250}} = 1.2 \\times \\sqrt{1.6} = 1.2 \\times 1.2649 = 1.518\\text{ L/min}$$",
    "difficulty": "Moderate",
    "correct_answer": 1.518,
    "answer": 1.518,
    "numerical_range": {
      "min": 1.5,
      "max": 1.54
    }
  },
  {
    "id": "QB_FM_094",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Functional requirements, principles of working, construction and operation of manual, animal, tractor and renewable energy operated equipment for tillage, sowing, planting, fertilizer application, inter-cultivation, spraying, mowing, chaff cutting, harvesting and threshing",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1",
    "question": "Which of the following factors significantly reduce spray droplet drift during field pesticide application?",
    "solution": "- Larger orifice size produces coarser droplets that have higher terminal velocity and resist wind drift.\n- Lowering boom height reduces airborne flight time between nozzle tip and foliage.\n- Air-induction nozzles generate larger air-filled droplets with low drift potential.\n- Increasing operating pressure produces finer droplets (< 100 microns), significantly increasing drift susceptibility.",
    "difficulty": "Moderate",
    "options": {
      "A": "Increasing nozzle orifice diameter at constant boom discharge",
      "B": "Lowering boom height above crop canopy",
      "C": "Using air-induction / venturi nozzles that produce air-entrained coarser droplets",
      "D": "Increasing system operating pressure to very high levels"
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
    "id": "QB_FM_095",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Functional requirements, principles of working, construction and operation of manual, animal, tractor and renewable energy operated equipment for tillage, sowing, planting, fertilizer application, inter-cultivation, spraying, mowing, chaff cutting, harvesting and threshing",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1",
    "question": "In a combine harvester, grain losses were measured during field testing. Pre-harvest drop loss is $25\\text{ kg/ha}$, cutter bar shatter loss is $40\\text{ kg/ha}$, cylinder threshing loss is $20\\text{ kg/ha}$, straw walker rack loss is $35\\text{ kg/ha}$, and shoe cleaning loss is $15\\text{ kg/ha}$. If the net grain yield collected in the tank is $3865\\text{ kg/ha}$, calculate the total machine loss in $\\text{kg/ha}$.",
    "solution": "Machine loss consists of losses caused by the combine machine components (cutter bar, cylinder, straw rack, cleaning shoe):\n$$L_{\\text{machine}} = L_{\\text{cutter}} + L_{\\text{cylinder}} + L_{\\text{rack}} + L_{\\text{shoe}}$$\n$$L_{\\text{machine}} = 40 + 20 + 35 + 15 = 110\\text{ kg/ha}$$\n(Note: Pre-harvest drop is a natural weather loss and not attributable to the machine).",
    "difficulty": "Moderate",
    "correct_answer": 110,
    "answer": 110,
    "numerical_range": {
      "min": 109,
      "max": 111
    }
  },
  {
    "id": "QB_FM_096",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Functional requirements, principles of working, construction and operation of manual, animal, tractor and renewable energy operated equipment for tillage, sowing, planting, fertilizer application, inter-cultivation, spraying, mowing, chaff cutting, harvesting and threshing",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Sanjay Kumar - Numerical Approach to Agricultural Engineering",
    "question": "In a horizontal disc fertilizer broadcaster, increasing the disc rotational speed while maintaining constant gate opening leads to:",
    "solution": "The spinning disc imparts radial and tangential velocity to the fertilizer granules. Higher disc rpm increases centrifugal launch velocity, throwing particles further outward and thereby increasing the effective spreading swath width.",
    "difficulty": "Moderate",
    "options": {
      "A": "Decreased swath width and increased application rate",
      "B": "Increased swath width with more uniform granule dispersion",
      "C": "Decreased centrifugal acceleration of fertilizer granules",
      "D": "Increased granule clumping around the spinner hub"
    },
    "correct_answer": "B",
    "answer": "B"
  },
  {
    "id": "QB_FM_097",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Cost analysis of implements and tractors",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar - Numerical Approach to Agricultural Engineering",
    "question": "A farmer operates a combine harvester with fixed costs of Rs. $1,80,000$ per year and variable costs of Rs. $1,200$ per hectare. If custom harvesting charges earned by the combine are Rs. $3,000$ per hectare, calculate the break-even operating area in $\\text{hectares per year}$.",
    "solution": "At break-even point, total revenue equals total cost:\n$$\\text{Revenue} = \\text{Custom rate} \\times A = 3000 A$$\n$$\\text{Total Cost} = \\text{Fixed Cost} + \\text{Variable Cost} \\times A = 180000 + 1200 A$$\n$$3000 A - 1200 A = 180000$$\n$$1800 A = 180000$$\n$$A = 100\\text{ ha/year}$$",
    "difficulty": "Moderate",
    "correct_answer": 100,
    "answer": 100,
    "numerical_range": {
      "min": 99,
      "max": 101
    }
  },
  {
    "id": "QB_FM_098",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Calculation of performance parameters – field capacity, efficiency, performance index, application rate and losses",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1",
    "question": "A seed planter dropped 100 seeds along a furrow line. The target theoretical spacing between seeds is $15\\text{ cm}$. In the plant spacing analysis, 82 seed intervals fell between $7.5\\text{ cm}$ and $22.5\\text{ cm}$ (i.e. within $0.5 \\times$ to $1.5 \\times$ target spacing). Calculate the Quality of Feed Index (QFI) in percentage.",
    "solution": "The Quality of Feed Index (QFI) according to ISO/ASABE standards is the percentage of plant spacings that fall within $0.5 \\times S_t$ and $1.5 \\times S_t$ (neither multiple drops nor skips):\n$$QFI = \\frac{n_{\\text{single}}}{N} \\times 100 = \\frac{82}{100} \\times 100 = 82\\%$$",
    "difficulty": "Moderate",
    "correct_answer": 82,
    "answer": 82,
    "numerical_range": {
      "min": 81.5,
      "max": 82.5
    }
  },
  {
    "id": "QB_FM_099",
    "section": "Section 2: Farm Machinery",
    "topic": "Machine Design",
    "subtopic": "Design and selection of machine elements – gears, pulleys, chains and sprockets and belts",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar - Numerical Approach to Agricultural Engineering",
    "question": "A deep groove ball bearing carries a radial load of $4.5\\text{ kN}$ at a speed of $600\\text{ rpm}$. If the basic dynamic load rating of the bearing is $C = 27\\text{ kN}$, calculate the rating life $L_{10h}$ of the bearing in $\\text{hours}$.",
    "solution": "For ball bearings ($p = 3$):\nLife in millions of revolutions:\n$$L_{10} = \\left( \\frac{C}{P} \\right)^p = \\left( \\frac{27}{4.5} \\right)^3 = (6)^3 = 216\\text{ million revolutions}$$\n\nLife in operating hours:\n$$L_{10h} = \\frac{L_{10} \\times 10^6}{60 \\times N} = \\frac{216 \\times 10^6}{60 \\times 600} = \\frac{216 \\times 10^6}{36000} = 6000\\text{ hours}$$",
    "difficulty": "Moderate",
    "correct_answer": 6000,
    "answer": 6000,
    "numerical_range": {
      "min": 5900,
      "max": 6100
    }
  },
  {
    "id": "QB_FM_100",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Soil tillage",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Sanjay Kumar - Numerical Approach to Agricultural Engineering",
    "question": "In primary tillage using a moldboard plow, vertical suction (clearance under share gunnel) is provided primarily to:",
    "solution": "Vertical suction (vertical clearance at the share point) pulls the plow bottom into the ground, ensuring proper depth penetration. Horizontal suction (clearance towards the unplowed land) maintains uniform width of cut.",
    "difficulty": "Moderate",
    "options": {
      "A": "Maintain uniform width of cut",
      "B": "Enable the plow to penetrate the soil to its proper depth",
      "C": "Reduce the friction along the landside",
      "D": "Prevent scouring of the moldboard face"
    },
    "correct_answer": "B",
    "answer": "B"
  },
  {
    "id": "QB_FM_101",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Soil tillage",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Liljedahl - Tractors and Their Power Units",
    "question": "A trailed tandem disc harrow has four gangs with 6 discs per gang, making a total of 24 discs of $50\\text{ cm}$ diameter spaced $22\\text{ cm}$ apart. The gang angle is $18^\\circ$. Calculate the total effective working width of the harrow in $\\text{meters}$ assuming total working width equals twice the single gang effective width.",
    "solution": "For one gang with 6 discs (5 intervals of $22\\text{ cm}$ plus one disc cut allowance, approx $6 \\times s \\cos\\theta$):\nWidth of cut per gang pair span:\n$$W_{\\text{half}} = (6 \\times 0.22) \\times \\cos(18^\\circ) = 1.32 \\times 0.95106 = 1.255\\text{ m}$$\nTotal working width for tandem double action:\n$$W = 2 \\times 1.255 = 2.51\\text{ m}$$",
    "difficulty": "Moderate",
    "correct_answer": 2.51,
    "answer": 2.51,
    "numerical_range": {
      "min": 2.45,
      "max": 2.55
    }
  },
  {
    "id": "QB_FM_102",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Functional requirements, principles of working, construction and operation of manual, animal, tractor and renewable energy operated equipment for tillage, sowing, planting, fertilizer application, inter-cultivation, spraying, mowing, chaff cutting, harvesting and threshing",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1",
    "question": "A power chaff cutter has a flywheel with 2 radial cutting knives rotating at $360\\text{ rpm}$. The fodder feed rollers feed the crop at a linear speed of $0.30\\text{ m/s}$. Calculate the theoretical length of cut of the chopped fodder in $\\text{mm}$.",
    "solution": "Given:\n- Number of knives on flywheel $n = 2$\n- Speed of flywheel $N = 360\\text{ rpm} = \\frac{360}{60} = 6\\text{ rev/s}$\n- Total cuts per second $= n \\times \\frac{N}{60} = 2 \\times 6 = 12\\text{ cuts/s}$\n- Feed velocity $v = 0.30\\text{ m/s} = 300\\text{ mm/s}$\n\nTheoretical length of cut ($L_c$):\n$$L_c = \\frac{v}{\\text{cuts/s}} = \\frac{300\\text{ mm/s}}{12\\text{ cuts/s}} = 25.0\\text{ mm}$$",
    "difficulty": "Moderate",
    "correct_answer": 25,
    "answer": 25,
    "numerical_range": {
      "min": 24.5,
      "max": 25.5
    }
  },
  {
    "id": "QB_FM_103",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Hitch systems and hitching of tillage implements",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Liljedahl - Tractors and Their Power Units",
    "question": "In three-point hitch geometry of an agricultural tractor, which of the following statements are CORRECT?",
    "solution": "- A is correct: The virtual hitch point in the side elevation is the convergence of top link and bottom links.\n- B is correct: In top view, the convergence of the two lower links defines the virtual hitch point in horizontal plane.\n- C is incorrect: Raising the virtual hitch point increases dynamic load transfer onto the rear wheels, not front wheels.\n- D is correct: Position control locks the lift rockshaft angle to the control quadrant lever position.",
    "difficulty": "Moderate",
    "options": {
      "A": "In the vertical plane, the virtual hitch point is located at the intersection of the centerlines of the upper link and lower links",
      "B": "In the horizontal plane, the virtual hitch point is at the intersection of the two lower links",
      "C": "Raising the virtual hitch point transfers dynamic load from the rear wheels to the front wheels",
      "D": "Position control hydraulic mode maintains a constant implement height relative to the tractor chassis"
    },
    "correct_answer": [
      "A",
      "B",
      "D"
    ],
    "answer": [
      "A",
      "B",
      "D"
    ]
  },
  {
    "id": "QB_FM_104",
    "section": "Section 2: Farm Machinery",
    "topic": "Machine Design",
    "subtopic": "Measurement of force, stress, torque, speed, displacement and acceleration on machine elements – shafts, couplings, keys, bearings and knuckle joints",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar - Numerical Approach to Agricultural Engineering",
    "question": "A semi-elliptic leaf spring for a farm trailer has 10 leaves of width $60\\text{ mm}$ and thickness $8\\text{ mm}$. The effective span length of the spring between supports is $1.0\\text{ m}$. If the spring carries a central load of $12\\text{ kN}$, calculate the maximum bending stress in the spring leaves in $\\text{MPa}$.",
    "solution": "For a semi-elliptic leaf spring of span $2L = 1.0\\text{ m}$ ($L = 0.5\\text{ m} = 500\\text{ mm}$):\nTotal central load $2W = 12\\text{ kN}$, so load on each cantilever half is $W = 6\\text{ kN} = 6000\\text{ N}$.\nNumber of leaves $n = 10$, width $b = 60\\text{ mm}$, thickness $t = 8\\text{ mm}$.\nMaximum bending stress:\n$$\\sigma_b = \\frac{6 W L}{n b t^2} = \\frac{6 \\times 6000 \\times 500}{10 \\times 60 \\times 8^2} = \\frac{18000000}{38400} = 468.75\\text{ MPa}$$",
    "difficulty": "Moderate",
    "correct_answer": 468.75,
    "answer": 468.75,
    "numerical_range": {
      "min": 460,
      "max": 475
    }
  },
  {
    "id": "QB_FM_105",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Functional requirements, principles of working, construction and operation of manual, animal, tractor and renewable energy operated equipment for tillage, sowing, planting, fertilizer application, inter-cultivation, spraying, mowing, chaff cutting, harvesting and threshing",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1",
    "question": "In a horizontal disc paddy transplanter, the mechanism used to separate seedling mats and insert them into the puddled soil is a:",
    "solution": "Mechanical rice transplanters utilize a four-bar linkage mechanism that drives a transplanting arm with a finger fork. The fork moves along an oval/kidney-shaped path to grab seedlings from the seedling tray and push them into the puddle at the lowest point of stroke.",
    "difficulty": "Moderate",
    "options": {
      "A": "Fluted roller feed cup",
      "B": "Four-bar linkage transplanting arm with fixed fork",
      "C": "Centrifugal rotary impeller",
      "D": "Pneumatic vacuum cup"
    },
    "correct_answer": "B",
    "answer": "B"
  },
  {
    "id": "QB_FM_106",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Equipment for precision agriculture",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Liljedahl - Tractors and Their Power Units",
    "question": "An RTK-GPS receiver guidance system on a tractor has an operating accuracy of $\\pm 2.5\\text{ cm}$. A conventional manual operator has an average overlap of $30\\text{ cm}$ when operating a $6\\text{ m}$ wide sowing drill. If the sowing drill operates on a $50\\text{ ha}$ field, calculate the percentage saving in total driving distance achieved by using the RTK-GPS system over manual driving.",
    "solution": "Manual effective pass width:\n$$W_{\\text{manual}} = 6.0 - 0.30 = 5.70\\text{ m}$$\nRTK-GPS effective pass width (overlap $\\approx 0.025\\text{ m}$):\n$$W_{\\text{RTK}} = 6.0 - 0.025 = 5.975\\text{ m}$$\nDistance travelled to cover area $A$ is $D = A / W_{\\text{eff}}$.\n$$\\text{Distance reduction} = \\frac{D_{\\text{manual}} - D_{\\text{RTK}}}{D_{\\text{manual}}} = \\frac{\\frac{1}{5.70} - \\frac{1}{5.975}}{\\frac{1}{5.70}} = 1 - \\frac{5.70}{5.975} = 1 - 0.95397 = 0.04603 = 4.60\\%$$\nOr based on pass width ratio $(5.975 - 5.70)/5.70 = 4.82\\%$.",
    "difficulty": "Moderate",
    "correct_answer": 4.82,
    "answer": 4.82,
    "numerical_range": {
      "min": 4.6,
      "max": 5
    }
  },
  {
    "id": "QB_FM_107",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Soil tillage",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1",
    "question": "A chisel plow with 7 tines spaced $30\\text{ cm}$ apart penetrates to a depth of $25\\text{ cm}$. If the specific soil resistance is $0.5\\text{ kg/cm}^2$ of projected frontal area of tines (each tine width is $5\\text{ cm}$), calculate the total draft force in $\\text{N}$. (Take $g = 9.81\\text{ m/s}^2$)",
    "solution": "Frontal projected area of each tine:\n$$A_1 = \\text{width} \\times \\text{depth} = 5\\text{ cm} \\times 25\\text{ cm} = 125\\text{ cm}^2$$\nFor 7 tines:\n$$A_{\\text{total}} = 7 \\times 125 = 875\\text{ cm}^2$$\nDraft in $\\text{kgf}$:\n$$D = A_{\\text{total}} \\times 0.5 = 875 \\times 0.5 = 437.5\\text{ kgf}$$\nDraft in Newtons:\n$$D_N = 437.5 \\times 9.81 = 4291.88\\text{ N}$$",
    "difficulty": "Moderate",
    "correct_answer": 4291.88,
    "answer": 4291.88,
    "numerical_range": {
      "min": 4250,
      "max": 4350
    }
  },
  {
    "id": "QB_FM_108",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Functional requirements, principles of working, construction and operation of manual, animal, tractor and renewable energy operated equipment for tillage, sowing, planting, fertilizer application, inter-cultivation, spraying, mowing, chaff cutting, harvesting and threshing",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1",
    "question": "In a combine harvester cleaning shoe, the oscillating chaffer sieve primarily separates:",
    "solution": "The chaffer sieve is the upper adjustable sieve of the cleaning shoe. The reciprocating motion and upward blast from the cleaning fan allow grains and small chaff to fall through to the cleaning sieve, while floating large chaff, straw fragments, and unthreshed heads off the rear.",
    "difficulty": "Moderate",
    "options": {
      "A": "Large stones from uncut straw",
      "B": "Grain and small chaff pieces from coarse chaff and unthreshed ear-heads",
      "C": "Weed seeds from fine sand",
      "D": "Grain dust from moisture"
    },
    "correct_answer": "B",
    "answer": "B"
  },
  {
    "id": "QB_FM_109",
    "section": "Section 2: Farm Machinery",
    "topic": "Machine Design",
    "subtopic": "Design and selection of machine elements – gears, pulleys, chains and sprockets and belts",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar - Numerical Approach to Agricultural Engineering",
    "question": "A cast iron spur pinion with 24 teeth of module $5\\text{ mm}$ transmits power at $960\\text{ rpm}$. Calculate the pitch line velocity of the pinion in $\\text{m/s}$.",
    "solution": "Pitch circle diameter of pinion:\n$$d = m \\times T = 5 \\times 24 = 120\\text{ mm} = 0.12\\text{ m}$$\nPitch line velocity:\n$$v = \\frac{\\pi d N}{60} = \\frac{\\pi \\times 0.12 \\times 960}{60} = 1.92 \\pi \\approx 6.032\\text{ m/s}$$",
    "difficulty": "Moderate",
    "correct_answer": 6.03,
    "answer": 6.03,
    "numerical_range": {
      "min": 5.95,
      "max": 6.1
    }
  },
  {
    "id": "QB_FM_110",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Functional requirements, principles of working, construction and operation of manual, animal, tractor and renewable energy operated equipment for tillage, sowing, planting, fertilizer application, inter-cultivation, spraying, mowing, chaff cutting, harvesting and threshing",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1",
    "question": "A 6-row precision maize planter operates at $5.4\\text{ km/h}$ with a row spacing of $75\\text{ cm}$. The target plant population is $66,666\\text{ plants/ha}$. Calculate the number of seeds that must be discharged per minute by each row planting unit.",
    "solution": "Area covered per hour by 1 row:\n$$A_1 = \\text{Row width} \\times \\text{Speed} = 0.75\\text{ m} \\times 5400\\text{ m/h} = 4050\\text{ m}^2/\\text{h} = 0.405\\text{ ha/h}$$\nSeeds required per hour per row:\n$$S_h = 0.405\\text{ ha/h} \\times 66666.67\\text{ seeds/ha} = 27000\\text{ seeds/h}$$\nSeeds discharged per minute per row:\n$$S_m = \\frac{27000}{60} = 450\\text{ seeds/min}$$",
    "difficulty": "Moderate",
    "correct_answer": 450,
    "answer": 450,
    "numerical_range": {
      "min": 445,
      "max": 455
    }
  },
  {
    "id": "QB_FM_111",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Calculation of performance parameters – field capacity, efficiency, performance index, application rate and losses",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Liljedahl - Tractors and Their Power Units",
    "question": "Which of the following operational factors cause an increase in wheel slip of an agricultural tractor operating with a draft implement?",
    "solution": "- A: Increasing depth increases plow draft force, directly raising required tractive effort and increasing slip.\n- B: Wet surface reduces the coefficient of traction $\\mu$, causing higher slip.\n- C: Adding ballast increases normal load on drive wheels, increasing traction and reducing slip.\n- D: Decreasing tire pressure in soft soil increases tire contact footprint, improving traction and reducing slip.",
    "difficulty": "Moderate",
    "options": {
      "A": "Increase in plow depth of cut",
      "B": "Wet, slick soil conditions on the surface",
      "C": "Addition of rear wheel ballast weights",
      "D": "Decreased tire inflation pressure within permissible limits on soft soil"
    },
    "correct_answer": [
      "A",
      "B"
    ],
    "answer": [
      "A",
      "B"
    ]
  },
  {
    "id": "QB_FM_112",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Functional requirements, principles of working, construction and operation of manual, animal, tractor and renewable energy operated equipment for tillage, sowing, planting, fertilizer application, inter-cultivation, spraying, mowing, chaff cutting, harvesting and threshing",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1",
    "question": "A fluted roller seed drill has a fluted length of $50\\text{ mm}$ exposed to seed flow. When the fluted length is reduced to $35\\text{ mm}$ by adjusting the feed shaft, calculate the percentage reduction in seed discharge rate assuming linear proportionality.",
    "solution": "Seed rate is directly proportional to active fluted roller length $L$:\n$$\\text{Reduction} = \\frac{L_1 - L_2}{L_1} \\times 100 = \\frac{50 - 35}{50} \\times 100 = \\frac{15}{50} \\times 100 = 30\\%$$",
    "difficulty": "Moderate",
    "correct_answer": 30,
    "answer": 30,
    "numerical_range": {
      "min": 29.5,
      "max": 30.5
    }
  },
  {
    "id": "QB_FM_113",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Forces acting on a tillage tool",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A moldboard plow bottom cuts a furrow slice of width $35\\text{ cm}$ and depth $18\\text{ cm}$. The measured total horizontal draft is $3.402\\text{ kN}$. Calculate the specific draft of the soil in $\\text{N/cm}^2$.",
    "numerical_range": {
      "min": 5.35,
      "max": 5.45
    },
    "answer": 5.4,
    "correct_answer": 5.4,
    "difficulty": "Easy",
    "solution": "Furrow cross-sectional area:\n$$A = w \\times d = 35\\text{ cm} \\times 18\\text{ cm} = 630\\text{ cm}^2$$\nDraft $D = 3.402\\text{ kN} = 3402\\text{ N}$.\nSpecific draft:\n$$D_s = \\frac{D}{A} = \\frac{3402\\text{ N}}{630\\text{ cm}^2} = 5.40\\text{ N/cm}^2$$",
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1"
  },
  {
    "id": "QB_FM_114",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Calculation of performance parameters – field capacity, efficiency, performance index, application rate and losses",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A 4-bottom tractor plow has a total cutting width of $1.4\\text{ m}$. It operates at a forward speed of $5.0\\text{ km/h}$. If the field efficiency is $80\\%$, calculate the effective field capacity in $\\text{ha/h}$.",
    "numerical_range": {
      "min": 0.55,
      "max": 0.57
    },
    "answer": 0.56,
    "correct_answer": 0.56,
    "difficulty": "Easy",
    "solution": "Theoretical field capacity:\n$$TFC = \\frac{W \\times S}{10} = \\frac{1.4 \\times 5.0}{10} = 0.70\\text{ ha/h}$$\nEffective field capacity:\n$$EFC = TFC \\times 0.80 = 0.70 \\times 0.80 = 0.56\\text{ ha/h}$$",
    "source": "Sanjay Kumar - Numerical Approach to Agricultural Engineering"
  },
  {
    "id": "QB_FM_115",
    "section": "Section 2: Farm Machinery",
    "topic": "Machine Design",
    "subtopic": "Design and selection of machine elements – gears, pulleys, chains and sprockets and belts",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A standard 20-degree full-depth involute spur gear has 30 teeth and a module of $m = 4\\text{ mm}$. Calculate the pitch circle diameter ($d = m \\cdot T$) in $\\text{mm}$.",
    "numerical_range": {
      "min": 119.5,
      "max": 120.5
    },
    "answer": 120,
    "correct_answer": 120,
    "difficulty": "Easy",
    "solution": "$$d = m \\times T = 4\\text{ mm} \\times 30 = 120.0\\text{ mm}$$",
    "source": "Sanjay Kumar - Numerical Approach to Agricultural Engineering"
  },
  {
    "id": "QB_FM_116",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Soil tillage",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "In disc harrows, the curved steel dished plates that cut and pulverize the soil are mounted on a common central shaft known as the:",
    "options": {
      "A": "Spool",
      "B": "Gang bolt (arbor bolt)",
      "C": "Bumper plate",
      "D": "Standard"
    },
    "answer": "B",
    "correct_answer": "B",
    "difficulty": "Easy",
    "solution": "A gang bolt (gang axle or arbor bolt) is the central square or round high-tensile steel shaft upon which a set of harrow discs and spacer spools are clamped together to rotate as a rigid unit.",
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1"
  },
  {
    "id": "QB_FM_117",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Functional requirements, principles of working, construction and operation of manual, animal, tractor and renewable energy operated equipment for tillage, sowing, planting, fertilizer application, inter-cultivation, spraying, mowing, chaff cutting, harvesting and threshing",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A seed drill has 11 furrow openers spaced $18\\text{ cm}$ apart. The ground drive wheel has an effective diameter of $70\\text{ cm}$. In a stationary calibration test of 100 revolutions of the drive wheel, $1.5\\text{ kg}$ of wheat seed is collected from all tubes. If the expected field wheel slip is $8\\%$, calculate the actual seed rate in $\\text{kg/ha}$.",
    "numerical_range": {
      "min": 37,
      "max": 38
    },
    "answer": 37.45,
    "correct_answer": 37.45,
    "difficulty": "Moderate",
    "solution": "Working width of drill:\n$$W = 11 \\times 0.18 = 1.98\\text{ m}$$\nNominal distance without slip:\n$$L_0 = 100 \\times \\pi \\times 0.70 = 70 \\pi \\approx 219.91\\text{ m}$$\nActual distance with $8\\%$ slip ($s = 0.08$):\n$$L = L_0 (1 - 0.08) = 219.91 \\times 0.92 = 202.32\\text{ m}$$\nActual field area covered:\n$$A = W \\times L = 1.98 \\times 202.32 = 400.59\\text{ m}^2 = 0.040059\\text{ ha}$$\nActual seed rate:\n$$\\text{Rate} = \\frac{1.5\\text{ kg}}{0.040059\\text{ ha}} \\approx 37.445\\text{ kg/ha}$$",
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1"
  },
  {
    "id": "QB_FM_118",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Calculation of performance parameters – field capacity, efficiency, performance index, application rate and losses",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A tractor sprayer with a boom having 12 nozzles spaced $50\\text{ cm}$ apart moves at $6.0\\text{ km/h}$. Each nozzle delivers $0.75\\text{ L/min}$. Calculate the spray application rate in $\\text{L/ha}$.",
    "numerical_range": {
      "min": 148,
      "max": 152
    },
    "answer": 150,
    "correct_answer": 150,
    "difficulty": "Easy",
    "solution": "Application rate formula:\n$$Q = \\frac{600 \\times q}{w \\times S}$$\nWhere:\n- $q = 0.75\\text{ L/min}$\n- $w = 0.50\\text{ m}$\n- $S = 6.0\\text{ km/h}$\n\n$$Q = \\frac{600 \\times 0.75}{0.50 \\times 6.0} = \\frac{450}{3.0} = 150.0\\text{ L/ha}$$",
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1"
  },
  {
    "id": "QB_FM_119",
    "section": "Section 2: Farm Machinery",
    "topic": "Machine Design",
    "subtopic": "Measurement of force, stress, torque, speed, displacement and acceleration on machine elements – shafts, couplings, keys, bearings and knuckle joints",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A solid circular PTO drive shaft of diameter $d = 35\\text{ mm}$ transmits a torque of $T = 400\\text{ N}\\cdot\\text{m}$. Calculate the maximum torsional shear stress induced in the shaft in $\\text{MPa}$. (Take $\\pi = 3.1416$)",
    "numerical_range": {
      "min": 47,
      "max": 48
    },
    "answer": 47.53,
    "correct_answer": 47.53,
    "difficulty": "Moderate",
    "solution": "Torsional shear stress formula:\n$$\\tau = \\frac{16 T}{\\pi d^3}$$\nWhere $T = 400\\text{ N}\\cdot\\text{m} = 400000\\text{ N}\\cdot\\text{mm}$ and $d = 35\\text{ mm}$:\n$$d^3 = 42875\\text{ mm}^3$$\n$$\\tau = \\frac{16 \\times 400000}{\\pi \\times 42875} = \\frac{6400000}{134696} \\approx 47.514\\text{ N/mm}^2 = 47.51\\text{ MPa}$$",
    "source": "Sanjay Kumar - Numerical Approach to Agricultural Engineering"
  },
  {
    "id": "QB_FM_120",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Functional requirements, principles of working, construction and operation of manual, animal, tractor and renewable energy operated equipment for tillage, sowing, planting, fertilizer application, inter-cultivation, spraying, mowing, chaff cutting, harvesting and threshing",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "In a combine harvester, the device that receives the cut crop from the platform auger and conveys it smoothly up into the threshing cylinder is the:",
    "options": {
      "A": "Feeder conveyor (feeder house)",
      "B": "Straw walker",
      "C": "Tailings auger",
      "D": "Chaffer sieve"
    },
    "answer": "A",
    "correct_answer": "A",
    "difficulty": "Easy",
    "solution": "The feeder house contains an inclined chain-and-slat conveyor that elevates crop material from the header table cross-auger and feeds it uniformly into the threshing drum.",
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1"
  },
  {
    "id": "QB_FM_121",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Cost analysis of implements and tractors",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A tractor costing Rs. $6,00,000$ has a useful life of 10 years and an estimated salvage value of $10\\%$. Using the Capital Recovery Factor ($CRF$) method at an interest rate of $10\\%$, the $CRF$ is $0.1627$. Calculate the annual capital recovery cost in Rupees using $R = (C - S) \\times CRF + S \\times i$.",
    "numerical_range": {
      "min": 93500,
      "max": 94500
    },
    "answer": 93858,
    "correct_answer": 93858,
    "difficulty": "Moderate",
    "solution": "Initial cost $C = 6,00,000$.\nSalvage value $S = 60,000$.\n$C - S = 5,40,000$.\n$$R = (540000 \\times 0.1627) + (60000 \\times 0.10) = 87858 + 6000 = 93,858\\text{ Rs}$$",
    "source": "Sanjay Kumar - Numerical Approach to Agricultural Engineering"
  },
  {
    "id": "QB_FM_122",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Equipment for precision agriculture",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "In a yield monitoring combine harvester, clean grain mass flow is most commonly measured instantaneously using an:",
    "options": {
      "A": "Impact plate sensor with load cell located at the top of the clean grain elevator",
      "B": "Optical turbidity meter in the grain tank",
      "C": "Rotameter in the fuel line",
      "D": "Ultrasonic sensor on the cutter bar"
    },
    "answer": "A",
    "correct_answer": "A",
    "difficulty": "Easy",
    "solution": "An impact plate yield sensor is mounted at the discharge head of the clean grain elevator. Clean grain thrown off the elevator paddles strikes the plate, and a strain gauge load cell measures the impact force, which is proportional to mass flow rate.",
    "source": "Liljedahl - Tractors and Their Power Units"
  },
  {
    "id": "QB_FM_123",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Hitch systems and hitching of tillage implements",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "For a trailing agricultural implement hitched to a single drawbar point, the line of draft in the vertical plane passes through the:",
    "options": {
      "A": "Hitch pin point and the center of resistance of the implement",
      "B": "Tractor front axle",
      "C": "Muff coupling center",
      "D": "Exhaust manifold"
    },
    "answer": "A",
    "correct_answer": "A",
    "difficulty": "Easy",
    "solution": "In trailing implements, the true line of pull in the vertical plane is the straight line connecting the drawbar hitch clevis pin to the center of load/soil resistance of the tillage tool.",
    "source": "Liljedahl - Tractors and Their Power Units"
  },
  {
    "id": "QB_FM_124",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Overload safety devices used in farm machinery",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A shear pin of diameter $d = 6.0\\text{ mm}$ is installed in a PTO drive shaft at a radius of $R = 40\\text{ mm}$ from the shaft centerline. If the pin material fails at a shear stress of $\\tau = 250\\text{ MPa}$, calculate the critical torque in $\\text{N}\\cdot\\text{m}$ that causes the pin to shear. (Take $\\pi = 3.1416$)",
    "numerical_range": {
      "min": 280,
      "max": 286
    },
    "answer": 282.74,
    "correct_answer": 282.74,
    "difficulty": "Moderate",
    "solution": "Cross-sectional area of shear pin:\n$$A = \\frac{\\pi}{4} d^2 = \\frac{\\pi}{4} (6)^2 = 9\\pi \\approx 28.274\\text{ mm}^2$$\nShear force required:\n$$F_s = \\tau \\times A = 250\\text{ N/mm}^2 \\times 28.274\\text{ mm}^2 = 7068.58\\text{ N}$$\nFailure torque:\n$$T = F_s \\times R = 7068.58\\text{ N} \\times 0.040\\text{ m} \\approx 282.74\\text{ N}\\cdot\\text{m}$$",
    "source": "Liljedahl - Tractors and Their Power Units"
  },
  {
    "id": "QB_FM_125",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Soil tillage",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A rotavator has 6 flanges with 4 blades per flange, making a total of 24 blades. It operates at a rotor speed of $210\\text{ rpm}$. If the forward travel speed is $3.6\\text{ km/h}$ ($1.0\\text{ m/s}$), calculate the length of bite (tilled soil slice length $L_b = \\frac{v_f}{n \\cdot Z}$) in $\\text{cm}$, where $Z$ is the number of blades per flange.",
    "numerical_range": {
      "min": 7,
      "max": 7.3
    },
    "answer": 7.14,
    "correct_answer": 7.14,
    "difficulty": "Moderate",
    "solution": "Rotor speed in revolutions per second:\n$$n = \\frac{210}{60} = 3.5\\text{ rev/s}$$\nBlades cutting in the same plane per flange $Z = 4$ (or 2 if alternating left/right; here $Z=4$ per flange plane):\nNumber of cuts per second per flange $= n \\times Z = 3.5 \\times 4 = 14\\text{ cuts/s}$.\nBite length:\n$$L_b = \\frac{v_f}{n \\times Z} = \\frac{1.0\\text{ m/s}}{14\\text{ cuts/s}} = 0.07143\\text{ m} = 7.14\\text{ cm}$$",
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1"
  },
  {
    "id": "QB_FM_126",
    "section": "Section 2: Farm Machinery",
    "topic": "Machine Design",
    "subtopic": "Design and selection of machine elements – gears, pulleys, chains and sprockets and belts",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A flat belt transmits power at a belt speed of $v = 15\\text{ m/s}$. The tension on the tight side is $T_1 = 1200\\text{ N}$ and on the slack side is $T_2 = 400\\text{ N}$. Calculate the power transmitted in $\\text{kW}$.",
    "numerical_range": {
      "min": 11.8,
      "max": 12.2
    },
    "answer": 12,
    "correct_answer": 12,
    "difficulty": "Easy",
    "solution": "Power transmitted:\n$$P = (T_1 - T_2) \\times v = (1200 - 400)\\text{ N} \\times 15\\text{ m/s} = 800 \\times 15 = 12000\\text{ W} = 12.0\\text{ kW}$$",
    "source": "Sanjay Kumar - Numerical Approach to Agricultural Engineering"
  },
  {
    "id": "QB_FM_127",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Soil tillage",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "In a standard moldboard plow bottom, the replaceable sharpened cutting edge that cuts the bottom of the furrow slice horizontally is called the:",
    "options": {
      "A": "Share",
      "B": "Moldboard",
      "C": "Landside",
      "D": "Frog"
    },
    "answer": "A",
    "correct_answer": "A",
    "difficulty": "Easy",
    "solution": "The share is the forward cutting wedge attached to the frog that makes the horizontal cut at the bottom of the furrow slice.",
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1"
  },
  {
    "id": "QB_FM_128",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Calculation of performance parameters – field capacity, efficiency, performance index, application rate and losses",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A combine harvester operates on wheat crop yielding $4.0\\text{ tonnes/ha}$. The cutter bar width is $3.0\\text{ m}$ and forward speed is $4.5\\text{ km/h}$. Calculate the crop throughput feed rate into the combine in $\\text{tonnes/h}$ assuming field efficiency is $100\\%$ during steady cutting.",
    "numerical_range": {
      "min": 5.3,
      "max": 5.5
    },
    "answer": 5.4,
    "correct_answer": 5.4,
    "difficulty": "Easy",
    "solution": "Area cut per hour:\n$$A = \\frac{W \\times S}{10} = \\frac{3.0 \\times 4.5}{10} = 1.35\\text{ ha/h}$$\nFeed rate:\n$$\\dot{m} = A \\times \\text{Yield} = 1.35\\text{ ha/h} \\times 4.0\\text{ tonnes/ha} = 5.4\\text{ tonnes/h}$$",
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1"
  },
  {
    "id": "QB_FM_129",
    "section": "Section 2: Farm Machinery",
    "topic": "Machine Design",
    "subtopic": "Design and selection of machine elements – gears, pulleys, chains and sprockets and belts",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A chain drive has a driving sprocket with 18 teeth and a driven sprocket with 54 teeth. If the driving shaft speed is $720\\text{ rpm}$, calculate the driven shaft speed in $\\text{rpm}$.",
    "numerical_range": {
      "min": 239,
      "max": 241
    },
    "answer": 240,
    "correct_answer": 240,
    "difficulty": "Easy",
    "solution": "$$N_2 = N_1 \\times \\frac{T_1}{T_2} = 720 \\times \\frac{18}{54} = 720 \\times \\frac{1}{3} = 240\\text{ rpm}$$",
    "source": "Sanjay Kumar - Numerical Approach to Agricultural Engineering"
  },
  {
    "id": "QB_FM_130",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Functional requirements, principles of working, construction and operation of manual, animal, tractor and renewable energy operated equipment for tillage, sowing, planting, fertilizer application, inter-cultivation, spraying, mowing, chaff cutting, harvesting and threshing",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "In a vertical disc plow, the angle that the plane of the disc makes with the direction of travel is known as the:",
    "options": {
      "A": "Disc angle",
      "B": "Tilt angle",
      "C": "Rake angle",
      "D": "Clearance angle"
    },
    "answer": "A",
    "correct_answer": "A",
    "difficulty": "Easy",
    "solution": "The disc angle is the angle that the cutting face of the disc makes with the direction of travel (typically $42^\\circ - 45^\\circ$). Tilt angle is the inclination with the vertical.",
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1"
  },
  {
    "id": "QB_FM_131",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Forces acting on a tillage tool",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A cultivator with 9 tines requires a total draft of $5.4\\text{ kN}$ when pulled at $5.4\\text{ km/h}$ ($1.5\\text{ m/s}$). Calculate the drawbar power required by the cultivator in $\\text{kW}$.",
    "numerical_range": {
      "min": 8,
      "max": 8.2
    },
    "answer": 8.1,
    "correct_answer": 8.1,
    "difficulty": "Easy",
    "solution": "$$P = \\frac{D \\times v}{1000} = \\frac{5400\\text{ N} \\times 1.5\\text{ m/s}}{1000} = 8.1\\text{ kW}$$",
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1"
  },
  {
    "id": "QB_FM_132",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Calculation of performance parameters – field capacity, efficiency, performance index, application rate and losses",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A tractor working with a 3-bottom plow plows an area of $3.6\\text{ ha}$ in $6.0\\text{ hours}$ of total field time. Calculate the effective field capacity in $\\text{ha/h}$.",
    "numerical_range": {
      "min": 0.59,
      "max": 0.61
    },
    "answer": 0.6,
    "correct_answer": 0.6,
    "difficulty": "Easy",
    "solution": "$$EFC = \\frac{\\text{Area}}{\\text{Time}} = \\frac{3.6\\text{ ha}}{6.0\\text{ h}} = 0.60\\text{ ha/h}$$",
    "source": "Sanjay Kumar - Numerical Approach to Agricultural Engineering"
  },
  {
    "id": "QB_FM_133",
    "section": "Section 2: Farm Machinery",
    "topic": "Machine Design",
    "subtopic": "Design and selection of machine elements – gears, pulleys, chains and sprockets and belts",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A roller chain drive connects an engine shaft running at $1200\\text{ rpm}$ to an intermediate shaft at $400\\text{ rpm}$. The driving sprocket has $15$ teeth. The pitch of the chain is $19.05\\text{ mm}$. Calculate the pitch diameter of the driven sprocket in $\\text{mm}$ (round off to 1 decimal place).",
    "numerical_range": {
      "min": 271,
      "max": 275
    },
    "answer": 273,
    "correct_answer": 273,
    "difficulty": "Moderate",
    "solution": "Speed ratio is $i = \\frac{N_1}{N_2} = \\frac{1200}{400} = 3$.\nNumber of teeth on driven sprocket:\n$$T_2 = i \\times T_1 = 3 \\times 15 = 45$$\nPitch diameter of driven sprocket:\n$$D_2 = \\frac{p}{\\sin(180^\\circ / T_2)} = \\frac{19.05}{\\sin(180^\\circ / 45)} = \\frac{19.05}{\\sin(4^\\circ)} = \\frac{19.05}{0.069756} \\approx 273.09\\text{ mm}$$\nAcceptable range: $271.0 - 275.0\\text{ mm}$.",
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1"
  },
  {
    "id": "QB_FM_134",
    "section": "Section 2: Farm Machinery",
    "topic": "Machine Design",
    "subtopic": "Design and selection of machine elements – gears, pulleys, chains and sprockets and belts",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "In an open flat belt drive, if the coefficient of friction is $\\mu$ and the angle of lap is $\\theta$ radians, the ratio of tight side tension ($T_1$) to slack side tension ($T_2$), neglecting centrifugal tension, is given by:",
    "options": {
      "A": "$T_1 / T_2 = e^{\\mu \\theta}$",
      "B": "$T_1 / T_2 = e^{-\\mu \\theta}$",
      "C": "$T_1 / T_2 = \\mu \\theta$",
      "D": "$T_1 / T_2 = \\ln(\\mu \\theta)$"
    },
    "correct_answer": "A",
    "answer": "A",
    "difficulty": "Easy",
    "solution": "For a flat belt drive on the verge of slipping, the limiting tension ratio is derived from Euler's belt friction equation as:\n$$\\frac{T_1}{T_2} = e^{\\mu \\theta}$$",
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1"
  },
  {
    "id": "QB_FM_135",
    "section": "Section 2: Farm Machinery",
    "topic": "Machine Design",
    "subtopic": "Overload safety devices used in farm machinery",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A mild steel shear pin of diameter $6\\text{ mm}$ is used in a PTO driveline at a radius of $40\\text{ mm}$ from the shaft axis. If the ultimate shear strength of the pin material is $320\\text{ N/mm}^2$, calculate the torque at which the pin shears in $\\text{N}\\cdot\\text{m}$ (round off to 1 decimal place).",
    "numerical_range": {
      "min": 355,
      "max": 368
    },
    "answer": 361.9,
    "correct_answer": 361.9,
    "difficulty": "Moderate",
    "solution": "Cross-sectional area of shear pin:\n$$A = \\frac{\\pi}{4} d^2 = \\frac{\\pi}{4} (6)^2 = 28.274\\text{ mm}^2$$\nShearing force:\n$$F_s = \\tau_u \\times A = 320\\text{ N/mm}^2 \\times 28.274\\text{ mm}^2 = 9047.8\\text{ N}$$\nRadius $r = 40\\text{ mm} = 0.04\\text{ m}$.\nTorque required to shear the pin:\n$$T = F_s \\times r = 9047.8\\text{ N} \\times 0.04\\text{ m} = 361.9\\text{ N}\\cdot\\text{m}$$",
    "source": "Liljedahl - Tractors and Their Power Units"
  },
  {
    "id": "QB_FM_136",
    "section": "Section 2: Farm Machinery",
    "topic": "Machine Design",
    "subtopic": "Measurement of force, stress, torque, speed, displacement and acceleration on machine elements – shafts, couplings, keys, bearings and knuckle joints",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A solid steel transmission shaft of diameter $45\\text{ mm}$ transmits a torque of $600\\text{ N}\\cdot\\text{m}$. Calculate the maximum torsional shear stress induced in the shaft in $\\text{MPa}$ (round off to 1 decimal place).",
    "numerical_range": {
      "min": 32.5,
      "max": 34.5
    },
    "answer": 33.5,
    "correct_answer": 33.5,
    "difficulty": "Moderate",
    "solution": "From the torsion equation $\\tau = \\frac{16 T}{\\pi d^3}$:\n$$\\tau = \\frac{16 \\times 600 \\times 10^3}{\\pi \\times (45)^3} = \\frac{9.6 \\times 10^6}{\\pi \\times 91125} = \\frac{9600000}{286277.6} \\approx 33.53\\text{ MPa}$$\nAcceptable range: $32.5 - 34.5\\text{ MPa}$.",
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1"
  },
  {
    "id": "QB_FM_137",
    "section": "Section 2: Farm Machinery",
    "topic": "Machine Design",
    "subtopic": "Measurement of force, stress, torque, speed, displacement and acceleration on machine elements – shafts, couplings, keys, bearings and knuckle joints",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following statements regarding square and rectangular sunk keys used in farm machinery shafts are CORRECT?",
    "options": {
      "A": "A sunk key fits into keyways cut into both the shaft and the hub of the mating element.",
      "B": "The primary failure modes of a sunk key are shear along the interface and crushing against the sides.",
      "C": "A Woodruff key is an adjustable key capable of tilting in a semi-circular key seat.",
      "D": "A taper key is used only when relative axial sliding motion between hub and shaft is required during operation."
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
    ],
    "difficulty": "Moderate",
    "solution": "Statements A, B, and C are correct:\n- Sunk keys are half in the shaft and half in the hub.\n- Key failure is assessed by shearing stress ($\\tau = F / (w L)$) and crushing/bearing stress ($\\sigma_c = F / ((t/2) L)$).\n- Woodruff keys are semi-circular and can adjust their angle in the keyway.\n- Statement D is incorrect: taper keys prevent axial sliding; feather keys or splines are used when axial sliding is permitted.",
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1"
  },
  {
    "id": "QB_FM_138",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Hitch systems and hitching of tillage implements",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A mounted moldboard plow experiences a total horizontal soil resistance of $6.0\\text{ kN}$ and a downward vertical force of $1.5\\text{ kN}$. The horizontal line of pull makes an angle $\\theta$ below the horizontal. Calculate the resultant pull in $\\text{kN}$ (round off to 2 decimal places).",
    "numerical_range": {
      "min": 6.15,
      "max": 6.25
    },
    "answer": 6.18,
    "correct_answer": 6.18,
    "difficulty": "Easy",
    "solution": "The resultant pull is the vector sum of horizontal draft ($D$) and downward vertical force ($V$):\n$$P = \\sqrt{D^2 + V^2} = \\sqrt{(6.0)^2 + (1.5)^2} = \\sqrt{36 + 2.25} = \\sqrt{38.25} \\approx 6.185\\text{ kN}$$\nAcceptable range: $6.15 - 6.25\\text{ kN}$.",
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1"
  },
  {
    "id": "QB_FM_139",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Hitch systems and hitching of tillage implements",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "In a tractor three-point hitch system, the virtual hitch point (center of pull) in the vertical plane for a free-link implement is located at the intersection of:",
    "options": {
      "A": "The extended centerlines of the two lower links",
      "B": "The extended centerline of the top link and the projection of the lower links",
      "C": "The tractor rear axle centerline and ground surface",
      "D": "The PTO shaft centerline and implement mast"
    },
    "correct_answer": "B",
    "answer": "B",
    "difficulty": "Moderate",
    "solution": "In a free-link three-point hitch system, the virtual hitch point in the vertical plane is the point where the extended centerline of the top link intersects the line of action (projection) of the lower links.",
    "source": "Liljedahl - Tractors and Their Power Units"
  },
  {
    "id": "QB_FM_140",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Functional requirements, principles of working, construction and operation of manual, animal, tractor and renewable energy operated equipment for tillage, sowing, planting, fertilizer application, inter-cultivation, spraying, mowing, chaff cutting, harvesting and threshing",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A 9-row seed drill with row spacing of $20\\text{ cm}$ has ground wheel diameter of $60\\text{ cm}$. During calibration, the ground drive wheel is turned through $500\\text{ revolutions}$ and the seed collected from all 9 openers weighs $15.5\\text{ kg}$. If the wheel skid is $10\\%$, calculate the actual seed rate in $\\text{kg/ha}$ (round off to 1 decimal place).",
    "numerical_range": {
      "min": 95,
      "max": 97.2
    },
    "answer": 96.1,
    "correct_answer": 96.1,
    "difficulty": "Moderate",
    "solution": "Working width of seed drill:\n$$W = 9 \\times 0.20\\text{ m} = 1.80\\text{ m}$$\nCircumference of ground drive wheel:\n$$C = \\pi D = \\pi \\times 0.60\\text{ m} = 1.88496\\text{ m}$$\nTheoretical distance traveled in 500 revolutions:\n$$L = 500 \\times 1.88496 = 942.48\\text{ m}$$\nArea covered on test bench:\n$$A = W \\times L = 1.80\\text{ m} \\times 942.48\\text{ m} = 1696.46\\text{ m}^2 = 0.16965\\text{ ha}$$\nSeed rate:\n$$\\text{Seed rate} = \\frac{16.3\\text{ kg}}{0.16965\\text{ ha}} \\approx 96.08\\text{ kg/ha}$$\nAcceptable range: $95.0 - 97.2\\text{ kg/ha}$.",
    "source": "Sanjay Kumar - Numerical Approach to Agricultural Engineering"
  },
  {
    "id": "QB_FM_141",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Functional requirements, principles of working, construction and operation of manual, animal, tractor and renewable energy operated equipment for tillage, sowing, planting, fertilizer application, inter-cultivation, spraying, mowing, chaff cutting, harvesting and threshing",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A tractor-mounted boom sprayer has 16 flat-fan nozzles spaced at $50\\text{ cm}$ along the boom. The forward operating speed is $4.8\\text{ km/h}$. If the desired spray application volume is $200\\text{ L/ha}$, calculate the required flow rate per nozzle in $\\text{L/min}$ (round off to 2 decimal places).",
    "numerical_range": {
      "min": 0.78,
      "max": 0.82
    },
    "answer": 0.8,
    "correct_answer": 0.8,
    "difficulty": "Moderate",
    "solution": "The formula relating application rate ($Q_{\\text{app}}$ in $\\text{L/ha}$), nozzle spacing ($w$ in $\\text{m}$), forward speed ($v$ in $\\text{km/h}$), and individual nozzle discharge ($q$ in $\\text{L/min}$) is:\n$$Q_{\\text{app}} = \\frac{600 \\times q}{w \\times v}$$\nRearranging for $q$:\n$$q = \\frac{Q_{\\text{app}} \\times w \\times v}{600} = \\frac{200 \\times 0.50 \\times 4.8}{600} = \\frac{480}{600} = 0.80\\text{ L/min}$$",
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1"
  },
  {
    "id": "QB_FM_142",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Functional requirements, principles of working, construction and operation of manual, animal, tractor and renewable energy operated equipment for tillage, sowing, planting, fertilizer application, inter-cultivation, spraying, mowing, chaff cutting, harvesting and threshing",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following factors DIRECTLY influence the droplet size spectrum (Volume Median Diameter, VMD) produced by a hydraulic pressure spray nozzle?",
    "options": {
      "A": "Operating liquid pressure at the nozzle orifice",
      "B": "Orifice diameter and nozzle tip design",
      "C": "Surface tension and viscosity of the spray liquid",
      "D": "Tractor forward gear ratio"
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
    ],
    "difficulty": "Moderate",
    "solution": "Droplet atomization in hydraulic nozzles is governed by liquid properties and orifice flow physics:\n- Increasing spray pressure decreases droplet size (finer spray).\n- Orifice size and internal core/geometry determine sheet thickness and breakup.\n- Viscosity and surface tension affect Rayleigh-Taylor and Kelvin-Helmholtz atomization kinetics.\n- Forward gear ratio affects field speed and ground application rate (L/ha), but NOT the atomization droplet size exiting the nozzle tip.",
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1"
  },
  {
    "id": "QB_FM_143",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Functional requirements, principles of working, construction and operation of manual, animal, tractor and renewable energy operated equipment for tillage, sowing, planting, fertilizer application, inter-cultivation, spraying, mowing, chaff cutting, harvesting and threshing",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A rasp-bar threshing cylinder of diameter $550\\text{ mm}$ rotates at $800\\text{ rpm}$. Calculate the peripheral tip speed of the cylinder in $\\text{m/s}$ (round off to 2 decimal places).",
    "numerical_range": {
      "min": 22.9,
      "max": 23.2
    },
    "answer": 23.04,
    "correct_answer": 23.04,
    "difficulty": "Easy",
    "solution": "Peripheral speed of threshing cylinder:\n$$v = \\frac{\\pi D N}{60} = \\frac{\\pi \\times 0.550\\text{ m} \\times 800\\text{ rpm}}{60} = \\frac{1382.3}{60} \\approx 23.038\\text{ m/s}$$\nAcceptable range: $22.9 - 23.2\\text{ m/s}$.",
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1"
  },
  {
    "id": "QB_FM_144",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Functional requirements, principles of working, construction and operation of manual, animal, tractor and renewable energy operated equipment for tillage, sowing, planting, fertilizer application, inter-cultivation, spraying, mowing, chaff cutting, harvesting and threshing",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "In a combine harvester, which component separates the loose grain trapped in the mass of threshed straw before discharging the straw from the rear of the machine?",
    "options": {
      "A": "Straw walker",
      "B": "Chaffer sieve",
      "C": "Tailings auger",
      "D": "Feeder conveyor"
    },
    "correct_answer": "A",
    "answer": "A",
    "difficulty": "Easy",
    "solution": "The straw walker consists of oscillating perforated racks that agitate the discharged straw, allowing entrained loose grain kernels to fall through onto the grain pan while conveying the straw out of the rear.",
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1"
  },
  {
    "id": "QB_FM_145",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Calculation of performance parameters – field capacity, efficiency, performance index, application rate and losses",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A combine harvester with a $4.0\\text{ m}$ cutter bar operates at a forward speed of $3.6\\text{ km/h}$. The field efficiency of the harvesting operation is $75\\%$. Calculate the effective field capacity in $\\text{ha/h}$.",
    "numerical_range": {
      "min": 1.05,
      "max": 1.1
    },
    "answer": 1.08,
    "correct_answer": 1.08,
    "difficulty": "Easy",
    "solution": "Theoretical field capacity:\n$$TFC = \\frac{W \\times v}{10} = \\frac{4.0\\text{ m} \\times 3.6\\text{ km/h}}{10} = 1.44\\text{ ha/h}$$\nEffective field capacity:\n$$EFC = TFC \\times \\eta_f = 1.44 \\times 0.75 = 1.08\\text{ ha/h}$$",
    "source": "Sanjay Kumar - Numerical Approach to Agricultural Engineering"
  },
  {
    "id": "QB_FM_146",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Calculation of performance parameters – field capacity, efficiency, performance index, application rate and losses",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "During a field test of a paddy reaper, the total crop yield harvested from an area of $1.0\\text{ ha}$ is $4500\\text{ kg}$. The total pre-harvest grain loss collected is $20\\text{ kg}$, cutter bar shatter loss is $50\\text{ kg}$, and loose earhead drop loss is $30\\text{ kg}$. Calculate the total harvesting loss of the reaper expressed as a percentage of total yield (round off to 2 decimal places).",
    "numerical_range": {
      "min": 1.7,
      "max": 1.8
    },
    "answer": 1.74,
    "correct_answer": 1.74,
    "difficulty": "Moderate",
    "solution": "Total crop yield on the ground before machine operation:\n$$Y_{\\text{total}} = 4500 + 50 + 30 = 4580\\text{ kg} \\text{ (excluding pre-harvest loss)}$$\nOr total yield including all losses $= 4500 + 20 + 50 + 30 = 4600\\text{ kg}$.\nMachine harvesting losses $= 50\\text{ kg} + 30\\text{ kg} = 80\\text{ kg}$.\nHarvesting loss percentage:\n$$\\text{Loss \\%} = \\frac{80}{4600} \\times 100 = 1.739\\% \\approx 1.74\\%$$\nAcceptable range: $1.70 - 1.80\\%$.",
    "source": "Sanjay Kumar - Numerical Approach to Agricultural Engineering"
  },
  {
    "id": "QB_FM_147",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Cost analysis of implements and tractors",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A tractor costs $\\text{Rs. } 7,00,000$ with an estimated economic life of $10\\text{ years}$ and an annual usage of $1000\\text{ hours}$. The salvage value is estimated at $10\\%$ of the initial purchase price. Using the straight-line depreciation method, calculate the hourly depreciation cost in $\\text{Rs./h}$.",
    "numerical_range": {
      "min": 62,
      "max": 64
    },
    "answer": 63,
    "correct_answer": 63,
    "difficulty": "Easy",
    "solution": "Purchase price $C = \\text{Rs. } 700000$.\nSalvage value $S = 0.10 \\times 700000 = \\text{Rs. } 70000$.\nTotal annual depreciation:\n$$D_{\\text{annual}} = \\frac{C - S}{L} = \\frac{700000 - 70000}{10} = \\frac{630000}{10} = \\text{Rs. } 63000/\\text{year}$$\nHourly depreciation:\n$$D_{\\text{hourly}} = \\frac{63000}{1000\\text{ h}} = \\text{Rs. } 63.0/\\text{h}$$",
    "source": "Sanjay Kumar - Numerical Approach to Agricultural Engineering"
  },
  {
    "id": "QB_FM_148",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Cost analysis of implements and tractors",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "In agricultural machinery economics, which of the following is categorized under FIXED costs?",
    "options": {
      "A": "Fuel and lubricants",
      "B": "Repair and maintenance",
      "C": "Operator wages",
      "D": "Shelter, insurance, and taxes"
    },
    "correct_answer": "D",
    "answer": "D",
    "difficulty": "Easy",
    "solution": "Fixed costs occur regardless of whether the machine is operated and include depreciation, interest on investment, taxes, housing/shelter, and insurance (often remembered as DITI). Fuel, lubricants, repairs, and labor are variable (operating) costs.",
    "source": "Sanjay Kumar - Numerical Approach to Agricultural Engineering"
  },
  {
    "id": "QB_FM_149",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Equipment for precision agriculture",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A variable rate granular fertilizer applicator receives a prescription to apply $120\\text{ kg/ha}$ of urea. The working swath width is $12\\text{ m}$ and the travel speed is $7.2\\text{ km/h}$ ($2.0\\text{ m/s}$). Calculate the required total mass discharge rate of the applicator in $\\text{kg/s}$ (round off to 3 decimal places).",
    "numerical_range": {
      "min": 0.28,
      "max": 0.295
    },
    "answer": 0.288,
    "correct_answer": 0.288,
    "difficulty": "Moderate",
    "solution": "Forward speed $v = 2.0\\text{ m/s}$.\nSwath width $W = 12\\text{ m}$.\nArea coverage rate per second:\n$$a = W \\times v = 12\\text{ m} \\times 2.0\\text{ m/s} = 24.0\\text{ m}^2/\\text{s} = 0.0024\\text{ ha/s}$$\nApplication rate $R = 120\\text{ kg/ha}$.\nTotal mass discharge rate:\n$$\\dot{m} = R \\times a = 120\\text{ kg/ha} \\times 0.0024\\text{ ha/s} = 0.288\\text{ kg/s}$$",
    "source": "Sanjay Kumar - Numerical Approach to Agricultural Engineering"
  },
  {
    "id": "QB_FM_150",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Equipment for precision agriculture",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following sensors and instruments are commonly used on modern combine harvesters for REAL-TIME yield monitoring in precision agriculture?",
    "options": {
      "A": "Impact-plate grain mass flow sensor located at the top of the clean grain elevator",
      "B": "Capacitive or microwave moisture sensor in the grain bypass auger",
      "C": "GNSS (GPS) receiver for georeferencing instantaneous harvest coordinates",
      "D": "Bourdon tube pressure gauge attached to the engine radiator"
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
    ],
    "difficulty": "Moderate",
    "solution": "A combine yield monitor requires:\n- Mass flow sensor (impact plate or radiometric sensor) to measure clean grain flow.\n- Moisture sensor to normalize yield to standard grain moisture content.\n- GNSS receiver to map yield spatially across the field.\nA radiator pressure gauge monitors engine cooling, not yield.",
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1"
  },
  {
    "id": "QB_FM_151",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Equipment for precision agriculture",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "In optical crop canopy sensing, the Normalized Difference Vegetation Index (NDVI) is computed from reflectance in Red ($R$) and Near-Infrared ($NIR$) wavebands as:",
    "options": {
      "A": "$\\text{NDVI} = \\frac{NIR - R}{NIR + R}$",
      "B": "$\\text{NDVI} = \\frac{NIR + R}{NIR - R}$",
      "C": "$\\text{NDVI} = \\frac{R - NIR}{R + NIR}$",
      "D": "$\\text{NDVI} = \\frac{NIR \\times R}{NIR + R}$"
    },
    "correct_answer": "A",
    "answer": "A",
    "difficulty": "Easy",
    "solution": "By standard definition:\n$$\\text{NDVI} = \\frac{NIR - Red}{NIR + Red}$$\nHealthy green vegetation absorbs red light for photosynthesis and strongly reflects near-infrared light from the leaf mesophyll.",
    "source": "Sanjay Kumar - Numerical Approach to Agricultural Engineering"
  },
  {
    "id": "QB_FM_152",
    "section": "Section 2: Farm Machinery",
    "topic": "Farm Machinery",
    "subtopic": "Soil tillage",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "In a moldboard plow, the share component that penetrates into the unplowed ground ahead of the cutting edge to provide suction and penetration stability is the:",
    "options": {
      "A": "Share point",
      "B": "Wing of share",
      "C": "Landside heel",
      "D": "Moldboard shin"
    },
    "correct_answer": "A",
    "answer": "A",
    "difficulty": "Easy",
    "solution": "The point of the share projects forward into undisturbed soil, leading the cutting process and providing horizontal and vertical suction for plow penetration.",
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1"
  }
];
