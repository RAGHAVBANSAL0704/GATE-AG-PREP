export default 
[
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
  }
];
