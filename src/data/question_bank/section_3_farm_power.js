export default [
  {
    "id": "QB_FP_001",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Calculation of power, torque, fuel consumption, heat load and power losses",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A four-cylinder, four-stroke diesel engine with bore of $100\\text{ mm}$ and stroke of $100\\text{ mm}$ runs at $2000\\text{ rpm}$. The engine develops an indicated mean effective pressure of $650\\text{ kPa}$. The indicated power developed by the engine in $\\text{kW}$ is ________ (round off to 2 decimal places).",
    "correct_answer": "34.03",
    "numerical_range": {
      "min": 33.8,
      "max": 34.3
    },
    "solution": "Indicated Power formula for a multi-cylinder four-stroke engine:\n$$IP = \\frac{p_{imep} \\cdot L \\cdot A \\cdot n \\cdot k}{60 \\times 1000}$$\nWhere:\n• $p_{imep} = 650\\text{ kPa} = 650 \\times 10^3\\text{ N/m}^2$\n• Stroke $L = 100\\text{ mm} = 0.10\\text{ m}$\n• Bore $D = 100\\text{ mm} = 0.10\\text{ m} \\implies A = \\frac{\\pi}{4}(0.10)^2 = 0.007854\\text{ m}^2$\n• For 4-stroke engine, power strokes per minute $n = \\frac{N}{2} = \\frac{2000}{2} = 1000\\text{ rpm}$\n• Number of cylinders $k = 4$\n$$IP = \\frac{(650 \\times 10^3) \\times 0.10 \\times 0.007854 \\times 1000 \\times 4}{60 \\times 1000} = \\frac{2042.04}{60} = 34.03\\text{ kW}$$",
    "difficulty": "Moderate",
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)"
  },
  {
    "id": "QB_FP_002",
    "section": "Section 3: Farm Power",
    "topic": "Tractors and Power Tillers",
    "subtopic": "Mechanics of tractor chassis",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A 2WD tractor has a total static weight of $24\\text{ kN}$ with $65\\%$ of the weight resting on the rear axle on level ground. The wheelbase is $2.0\\text{ m}$. A horizontal pull of $8\\text{ kN}$ is applied at a drawbar height of $0.45\\text{ m}$ above ground. Assuming no rolling resistance on front wheels, the dynamic weight on the front wheels during pulling in $\\text{kN}$ is ________ (round off to 2 decimal places).",
    "correct_answer": "6.60",
    "numerical_range": {
      "min": 6.55,
      "max": 6.65
    },
    "solution": "1. Static front wheel weight $W_{fs}$:\n$$W_{fs} = (1 - 0.65) \\times 24\\text{ kN} = 0.35 \\times 24 = 8.40\\text{ kN}$$\n2. Dynamic weight transfer from front to rear axle due to horizontal drawbar pull $P$:\n$$\\Delta W = \\frac{P \\times h}{x_b}$$\nWhere $P = 8\\text{ kN}$, drawbar hitch height $h = 0.45\\text{ m}$, wheelbase $x_b = 2.0\\text{ m}$.\n$$\\Delta W = \\frac{8 \\times 0.45}{2.0} = \\frac{3.60}{2.0} = 1.80\\text{ kN}$$\n3. Dynamic load on front wheels $W_{fd}$:\n$$W_{fd} = W_{fs} - \\Delta W = 8.40 - 1.80 = 6.60\\text{ kN}$$",
    "difficulty": "Moderate",
    "source": "Tractors and Their Power Units (Liljedahl et al.)"
  },
  {
    "id": "QB_FP_003",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "I.C. engine cycles",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "For the same compression ratio $r$ and heat input, the theoretical thermal efficiencies of air-standard cycles follow the order:",
    "options": {
      "A": "$\\eta_{\\text{Otto}} > \\eta_{\\text{Dual}} > \\eta_{\\text{Diesel}}$",
      "B": "$\\eta_{\\text{Diesel}} > \\eta_{\\text{Dual}} > \\eta_{\\text{Otto}}$",
      "C": "$\\eta_{\\text{Dual}} > \\eta_{\\text{Otto}} > \\eta_{\\text{Diesel}}$",
      "D": "$\\eta_{\\text{Otto}} = \\eta_{\\text{Diesel}} = \\eta_{\\text{Dual}}$"
    },
    "correct_answer": "A",
    "solution": "For identical compression ratio and identical heat addition:\n$$\\eta_{\\text{Otto}} > \\eta_{\\text{Dual}} > \\eta_{\\text{Diesel}}$$\nBecause heat is added entirely at constant volume in the Otto cycle (at peak temperature), whereas in the Diesel cycle heat is added at constant pressure (as the cylinder expands, lowering expansion ratio during heat release).",
    "difficulty": "Easy",
    "source": "Principles of Agricultural Engg. Vol. I (Ojha & Michael)"
  },
  {
    "id": "QB_FP_004",
    "section": "Section 3: Farm Power",
    "topic": "Tractors and Power Tillers",
    "subtopic": "Traction theory",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A tractor drive wheel of rolling radius $0.75\\text{ m}$ completes 100 revolutions while travelling a horizontal distance of $424\\text{ m}$ in tilled soil. The wheel slip expressed in percentage is ________ (round off to 1 decimal place).",
    "correct_answer": "10.0",
    "numerical_range": {
      "min": 9.8,
      "max": 10.3
    },
    "solution": "1. Theoretical distance without slip $S_{th}$:\n$$S_{th} = 2 \\pi r \\cdot N = 2 \\times 3.14159 \\times 0.75 \\times 100 = 471.24\\text{ m}$$\n2. Actual distance travelled $S_a = 424\\text{ m}$.\n3. Wheel slip $s$:\n$$s = \\frac{S_{th} - S_a}{S_{th}} \\times 100 = \\frac{471.24 - 424}{471.24} \\times 100 = \\frac{47.24}{471.24} \\times 100 = 10.02\\% \\approx 10.0\\%$$",
    "difficulty": "Easy",
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)"
  },
  {
    "id": "QB_FP_005",
    "section": "Section 3: Farm Power",
    "topic": "Tractors and Power Tillers",
    "subtopic": "Power transmission systems – gear trains, differential, final drives and power take-off",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "The primary function of the differential lock mechanism in an agricultural tractor is to:",
    "options": {
      "A": "Increase the turning radius of the tractor during tight headland turns",
      "B": "Equalize the rotational speeds of both drive wheels when one wheel loses traction and spins",
      "C": "Disengage the PTO shaft under overload",
      "D": "Allow the outer wheel to rotate faster than the inner wheel during cornering"
    },
    "correct_answer": "B",
    "solution": "When one driving wheel encounters slippery mud, an open differential transfers no torque to the other wheel (it spins freely). Engaging the differential lock couples both axle shafts together so both drive wheels rotate at identical speeds with full traction.",
    "difficulty": "Easy",
    "source": "Elements of Agricultural Engineering (Jagdishwar Sahay)"
  },
  {
    "id": "QB_FP_006",
    "section": "Section 3: Farm Power",
    "topic": "Sources of Power",
    "subtopic": "Bio-fuels and their use in farm mechanization",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following statements regarding biodiesel produced via transesterification of vegetable oils (such as Jatropha/Karanja) is/are correct?",
    "options": {
      "A": "Transesterification converts triglycerides into fatty acid methyl esters (FAME) and glycerol by-product.",
      "B": "Biodiesel has a higher cetane number than petroleum diesel.",
      "C": "Biodiesel possesses higher calorific value (energy density) than petroleum diesel.",
      "D": "Biodiesel contains virtually zero aromatic hydrocarbons and sulfur, reducing particulate matter emissions."
    },
    "correct_answer": [
      "A",
      "B",
      "D"
    ],
    "solution": "• Transesterification reacts vegetable oils with methanol in the presence of an alkaline catalyst, yielding FAME (biodiesel) and glycerol (A is correct).\n• Biodiesel generally has a cetane rating between 50–60, higher than standard petrodiesel (~45–50) (B is correct).\n• Biodiesel's calorific value (~37–39 MJ/kg) is roughly 10% lower than that of conventional petrodiesel (~42–44 MJ/kg); thus statement C is false.\n• Biodiesel is naturally oxygenated and contains negligible sulfur, drastically cutting emissions of unburned HC and PM (D is correct).",
    "difficulty": "Moderate",
    "source": "Principles of Agricultural Engg. Vol. I (Ojha & Michael)"
  },
  {
    "id": "QB_FP_007",
    "section": "Section 3: Farm Power",
    "topic": "Tractors and Power Tillers",
    "subtopic": "Three point hitches – free link and restrained link operations",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "question": "In a tractor 3-point hitch hydraulic system operating in 'Draft Control' mode, the hydraulic lift cylinders automatically adjust implement depth in response to:",
    "options": {
      "A": "Tractor wheel speed variations",
      "B": "Sensing force (compression or tension) on the top link or lower draft links",
      "C": "The angle of inclination of the front wheels",
      "D": "Engine oil pressure fluctuation"
    },
    "correct_answer": "B",
    "solution": "Draft control senses changes in soil resistance through load-sensing springs/transducers on the top link or lower draft links. When soil gets harder and draft exceeds the set threshold, the hydraulic system slightly raises the implement to reduce load, and vice versa.",
    "difficulty": "Easy",
    "source": "Tractors and Their Power Units (Liljedahl et al.)"
  },
  {
    "id": "QB_FP_008",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Power efficiencies and measurement, engine performance curves",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)",
    "question": "A tractor diesel engine develops $30\\text{ kW}$ brake power while consuming $7.5\\text{ kg}$ of diesel fuel per hour. The lower calorific value of the fuel is $42\\text{ MJ/kg}$. The brake thermal efficiency of the engine expressed in percentage is ________ (round off to 1 decimal place).",
    "correct_answer": "34.3",
    "numerical_range": {
      "min": 34,
      "max": 34.6
    },
    "solution": "1. Total heat energy supplied by fuel per second ($Q_{\\text{in}}$):\n$$Q_{\\text{in}} = \\frac{\\dot{m}_f \\times CV}{3600} = \\frac{7.5\\text{ kg/h} \\times 42,000\\text{ kJ/kg}}{3600\\text{ s}} = \\frac{315,000}{3600} = 87.5\\text{ kW}$$\n2. Brake power output $BP = 30\\text{ kW}$.\n3. Brake thermal efficiency ($\\eta_{\\text{bth}}$):\n$$\\eta_{\\text{bth}} = \\frac{BP}{Q_{\\text{in}}} \\times 100 = \\frac{30}{87.5} \\times 100 = 34.285\\% \\approx 34.3\\%$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_009",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "I.C. engine cycles",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. I (Ojha & Michael)",
    "question": "An ideal air-standard Otto cycle operates with a volumetric compression ratio $r = 8.0$. Assuming the adiabatic index $\\gamma = 1.40$, the theoretical thermal efficiency of the cycle expressed in percentage is ________ (round off to 1 decimal place).",
    "correct_answer": "56.5",
    "numerical_range": {
      "min": 56.2,
      "max": 56.8
    },
    "solution": "Thermal efficiency of an air-standard Otto cycle is given by:\n$$\\eta_{\\text{Otto}} = 1 - \\frac{1}{r^{\\gamma - 1}}$$\nGiven $r = 8.0$ and $\\gamma = 1.40$:\n$$\\gamma - 1 = 0.40$$\n$$r^{0.40} = 8^{0.40} \\approx 2.2974$$\n$$\\eta_{\\text{Otto}} = 1 - \\frac{1}{2.2974} = 1 - 0.43527 = 0.56473 = 56.47\\% \\approx 56.5\\%$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_010",
    "section": "Section 3: Farm Power",
    "topic": "Tractors and Power Tillers",
    "subtopic": "Tractor tests and performance",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)",
    "question": "A 2WD tractor exerts a drawbar pull of $12\\text{ kN}$ while moving at a steady forward speed of $5.4\\text{ km/h}$. If the mechanical power delivered by the engine to the rear axle is $24\\text{ kW}$, the tractive efficiency of the tractor expressed in percentage is ________ (answer in integer).",
    "correct_answer": "75",
    "numerical_range": {
      "min": 75,
      "max": 75
    },
    "solution": "1. Convert forward velocity to $\\text{m/s}$:\n$$v = 5.4 \\times \\frac{5}{18} = 1.5\\text{ m/s}$$\n2. Calculate Drawbar Power ($P_{\\text{db}}$):\n$$P_{\\text{db}} = \\text{Pull} \\times v = 12\\text{ kN} \\times 1.5\\text{ m/s} = 18\\text{ kW}$$\n3. Tractive efficiency ($\\eta_{\\text{tr}}$):\n$$\\eta_{\\text{tr}} = \\frac{P_{\\text{db}}}{P_{\\text{axle}}} \\times 100 = \\frac{18\\text{ kW}}{24\\text{ kW}} \\times 100 = 75\\%$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_011",
    "section": "Section 3: Farm Power",
    "topic": "Tractors and Power Tillers",
    "subtopic": "Mechanics of tractor chassis",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Elements of Agricultural Engineering (Jagdishwar Sahay)",
    "question": "A farm tractor has a rear wheel tread width of $1.50\\text{ m}$. Its center of gravity is located on the longitudinal centerline at a height of $0.75\\text{ m}$ above ground level. The maximum transverse slope angle (in degrees) on which the tractor can stand sideways without overturning laterally is ________ (answer in integer).",
    "correct_answer": "45",
    "numerical_range": {
      "min": 45,
      "max": 45
    },
    "solution": "For lateral stability of a 4-wheel vehicle on a side slope, the tipping limit occurs when the line of action of gravity through the center of gravity passes through the lower wheel contact point:\n$$\\tan(\\theta_{\\text{crit}}) = \\frac{\\text{Half Tread Width}}{h_{cg}} = \\frac{1.50 / 2}{0.75} = \\frac{0.75}{0.75} = 1.0$$\n$$\\theta_{\\text{crit}} = \\arctan(1.0) = 45^\\circ$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FP_012",
    "section": "Section 3: Farm Power",
    "topic": "Tractors and Power Tillers",
    "subtopic": "Power transmission systems – gear trains, differential, final drives and power take-off",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. I (Ojha & Michael)",
    "question": "In a tractor differential gear unit, the ring gear (crown wheel) rotates at $50\\text{ rpm}$. While taking a turn, the inner drive wheel slows down to $30\\text{ rpm}$. The rotational speed of the outer drive wheel in $\\text{rpm}$ is ________ (answer in integer).",
    "correct_answer": "70",
    "numerical_range": {
      "min": 70,
      "max": 70
    },
    "solution": "In a standard bevel gear differential mechanism, the crown wheel speed is the arithmetic mean of the two axle shaft speeds:\n$$N_{\\text{crown}} = \\frac{N_1 + N_2}{2}$$\nGiven $N_{\\text{crown}} = 50\\text{ rpm}$ and $N_1 = 30\\text{ rpm}$:\n$$50 = \\frac{30 + N_2}{2} \\implies 100 = 30 + N_2 \\implies N_2 = 70\\text{ rpm}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_013",
    "section": "Section 3: Farm Power",
    "topic": "Sources of Power",
    "subtopic": "Sources of power on the farm – human, animal, mechanical, electrical, wind, solar and biomass",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. I (Ojha & Michael)",
    "question": "An agricultural worker operating a rotary pedal thresher works at a metabolic energy expenditure rate of $24.0\\text{ kJ/min}$. If the human mechanical work efficiency is $20\\%$ ($0.20$), the sustained mechanical power output delivered by the worker in Watts is ________ (answer in integer).",
    "correct_answer": "80",
    "numerical_range": {
      "min": 80,
      "max": 80
    },
    "solution": "1. Metabolic power expenditure ($P_{met}$):\n$$P_{met} = \\frac{24.0\\text{ kJ/min} \\times 1000\\text{ J/kJ}}{60\\text{ s}} = 400\\text{ W}$$\n2. Mechanical power output ($P_{mech}$):\n$$P_{mech} = P_{met} \\times \\eta_{mech} = 400\\text{ W} \\times 0.20 = 80\\text{ W}$$\n(Note: An average adult agricultural laborer can sustain approximately $0.1\\text{ hp} \\approx 75\\text{ W}$ of continuous mechanical power).",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_014",
    "section": "Section 3: Farm Power",
    "topic": "Sources of Power",
    "subtopic": "Sources of power on the farm – human, animal, mechanical, electrical, wind, solar and biomass",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Elements of Agricultural Engineering (Jagdishwar Sahay)",
    "question": "A pair of Haryana bullocks each having a body mass of $450\\text{ kg}$ exerts a continuous draft equal to $10\\%$ of their combined body weight while pulling an indigenous plough at an average speed of $3.6\\text{ km/h}$. Taking $g = 9.81\\text{ m/s}^2$, the tractive power developed by the pair of bullocks in $\\text{kW}$ is ________ (round off to 2 decimal places).",
    "correct_answer": "0.88",
    "numerical_range": {
      "min": 0.86,
      "max": 0.9
    },
    "solution": "1. Combined weight of the pair of bullocks ($W$):\n$$W = 2 \\times 450\\text{ kg} \\times 9.81\\text{ m/s}^2 = 8829\\text{ N}$$\n2. Draft force ($P$):\n$$P = 0.10 \\times 8829\\text{ N} = 882.9\\text{ N}$$\n3. Forward speed in $\\text{m/s}$:\n$$v = 3.6 \\times \\frac{5}{18} = 1.0\\text{ m/s}$$\n4. Power output ($P_{out}$):\n$$P_{out} = P \\times v = 882.9\\text{ N} \\times 1.0\\text{ m/s} = 882.9\\text{ W} \\approx 0.88\\text{ kW}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_015",
    "section": "Section 3: Farm Power",
    "topic": "Sources of Power",
    "subtopic": "Sources of power on the farm – human, animal, mechanical, electrical, wind, solar and biomass",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)",
    "question": "A solar photovoltaic pumping system delivers a discharge of $Q = 18\\text{ m}^3/\\text{h}$ of irrigation water against a total dynamic head of $H = 40\\text{ m}$. Water density is $\\rho = 1000\\text{ kg/m}^3$ and $g = 9.81\\text{ m/s}^2$. The combined efficiency of the motor-pump unit and controller/inverter is $\\eta_{sys} = 60\\%$ ($0.60$). The minimum electrical power rating ($W_p$) of the solar PV array required to operate this pump in $\\text{kW}$ is ________ (round off to 2 decimal places).",
    "correct_answer": "3.27",
    "numerical_range": {
      "min": 3.22,
      "max": 3.32
    },
    "solution": "1. Water discharge rate in $\\text{m}^3/\\text{s}$:\n$$Q = \\frac{18}{3600} = 0.005\\text{ m}^3/\\text{s}$$\n2. Hydraulic power ($P_{hyd}$):\n$$P_{hyd} = \\rho g Q H = 1000 \\times 9.81 \\times 0.005 \\times 40 = 1962\\text{ W} = 1.962\\text{ kW}$$\n3. Solar PV array peak power required ($P_{PV}$):\n$$P_{PV} = \\frac{P_{hyd}}{\\eta_{sys}} = \\frac{1.962\\text{ kW}}{0.60} = 3.27\\text{ kW}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FP_016",
    "section": "Section 3: Farm Power",
    "topic": "Sources of Power",
    "subtopic": "Sources of power on the farm – human, animal, mechanical, electrical, wind, solar and biomass",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. I (Ojha & Michael)",
    "question": "A farm wind turbine has a rotor blade diameter of $D = 8.0\\text{ m}$. It operates in wind blowing at a steady velocity of $v = 7.5\\text{ m/s}$. The ambient air density is $\\rho = 1.20\\text{ kg/m}^3$. According to the Betz limit (maximum theoretical aerodynamic power coefficient $C_{p,\\max} = 16/27$), the maximum mechanical power that can be extracted from the wind by this turbine in $\\text{kW}$ is ________ (round off to 2 decimal places). Take $\\pi = 3.1416$.",
    "correct_answer": "7.54",
    "numerical_range": {
      "min": 7.48,
      "max": 7.6
    },
    "solution": "1. Rotor swept area ($A$):\n$$A = \\frac{\\pi}{4} D^2 = \\frac{3.1416}{4} (8.0)^2 = 50.2656\\text{ m}^2$$\n2. Total wind power flux ($P_{wind}$):\n$$P_{wind} = \\frac{1}{2} \\rho A v^3 = 0.5 \\times 1.20 \\times 50.2656 \\times (7.5)^3$$\n$$(7.5)^3 = 421.875$$\n$$P_{wind} = 0.60 \\times 50.2656 \\times 421.875 = 12,723.6\\text{ W} = 12.7236\\text{ kW}$$\n3. Maximum extractable power by Betz limit:\n$$P_{\\max} = \\frac{16}{27} \\times P_{wind} = \\frac{16}{27} \\times 12.7236 \\approx 7.5399\\text{ kW} \\approx 7.54\\text{ kW}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FP_017",
    "section": "Section 3: Farm Power",
    "topic": "Sources of Power",
    "subtopic": "Sources of power on the farm – human, animal, mechanical, electrical, wind, solar and biomass",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Elements of Agricultural Engineering (Jagdishwar Sahay)",
    "question": "A dairy farm housing 30 mature cows produces $10\\text{ kg}$ of collectible fresh wet dung per cow per day. The specific biogas yield of the fresh dung is $0.036\\text{ m}^3/\\text{kg}$. If the produced biogas has a lower heating value of $20\\text{ MJ/m}^3$, the total daily thermal energy potential available from the biogas in $\\text{MJ}$ is ________ (answer in integer).",
    "correct_answer": "216",
    "numerical_range": {
      "min": 216,
      "max": 216
    },
    "solution": "1. Total fresh dung collected per day:\n$$\\text{Dung} = 30 \\text{ cows} \\times 10\\text{ kg/cow/day} = 300\\text{ kg/day}$$\n2. Daily biogas production:\n$$V_{\\text{gas}} = 300\\text{ kg/day} \\times 0.036\\text{ m}^3/\\text{kg} = 10.8\\text{ m}^3/\\text{day}$$\n3. Daily thermal energy yield:\n$$E = 10.8\\text{ m}^3/\\text{day} \\times 20\\text{ MJ/m}^3 = 216\\text{ MJ/day}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_018",
    "section": "Section 3: Farm Power",
    "topic": "Sources of Power",
    "subtopic": "Sources of power on the farm – human, animal, mechanical, electrical, wind, solar and biomass",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. I (Ojha & Michael)",
    "question": "Which of the following statements regarding farm power sources and their utilization characteristics is/are correct?",
    "options": {
      "A": "A healthy human laborer can continuously deliver approximately 0.1 hp (75 W) of mechanical power over an 8-hour shift.",
      "B": "A pair of medium-sized working bullocks can develop roughly 0.75 to 1.0 hp (550 to 750 W) of continuous drawbar power.",
      "C": "Stationary electric three-phase induction motors achieve operational efficiencies between 80% and 90% with low maintenance requirements.",
      "D": "Solar PV pump controllers utilize Maximum Power Point Tracking (MPPT) algorithms to dynamically optimize electrical power delivery to the pump across varying solar irradiance."
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "All four statements represent established benchmarks for agricultural energy sources:\n• Adult human sustained output is ~75 W (A is correct).\n• A pair of working bullocks yields ~0.75–1.0 hp at normal walking pace (B is correct).\n• Electric induction motors operate at 80–90% efficiency (C is correct).\n• MPPT maximizes power harvesting under changing solar insolation (D is correct).",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_019",
    "section": "Section 3: Farm Power",
    "topic": "Sources of Power",
    "subtopic": "Bio-fuels and their use in farm mechanization",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)",
    "question": "A dual-fuel agricultural diesel engine runs on a combination of diesel fuel and biomass gasifier producer gas. Under full load on pure diesel fuel, the baseline diesel consumption is $4.0\\text{ kg/h}$. When switched to dual-fuel operation at the same load and speed, the engine consumes $1.0\\text{ kg/h}$ of diesel along with producer gas. The diesel replacement percentage achieved by the biomass gasifier is ________ (answer in integer).",
    "correct_answer": "75",
    "numerical_range": {
      "min": 75,
      "max": 75
    },
    "solution": "The diesel replacement percentage is given by:\n$$\\%\\text{ Replacement} = \\frac{\\dot{m}_{d,\\text{pure}} - \\dot{m}_{d,\\text{dual}}}{\\dot{m}_{d,\\text{pure}}} \\times 100$$\nGiven $\\dot{m}_{d,\\text{pure}} = 4.0\\text{ kg/h}$ and $\\dot{m}_{d,\\text{dual}} = 1.0\\text{ kg/h}$:\n$$\\%\\text{ Replacement} = \\frac{4.0 - 1.0}{4.0} \\times 100 = \\frac{3.0}{4.0} \\times 100 = 75\\%$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_020",
    "section": "Section 3: Farm Power",
    "topic": "Sources of Power",
    "subtopic": "Bio-fuels and their use in farm mechanization",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Elements of Agricultural Engineering (Jagdishwar Sahay)",
    "question": "An E20 fuel blend contains $20\\%$ anhydrous ethanol ($C_2H_5OH$) and $80\\%$ gasoline by mass. The stoichiometric air-fuel ratio for pure ethanol is $(A/F)_{st,eth} = 9.00$, while for pure gasoline it is $(A/F)_{st,gas} = 14.70$. The stoichiometric air-fuel ratio of the E20 fuel blend on a mass basis is ________ (round off to 2 decimal places).",
    "correct_answer": "13.56",
    "numerical_range": {
      "min": 13.5,
      "max": 13.62
    },
    "solution": "The stoichiometric air requirement of a fuel blend is the mass-weighted sum of individual fuel air requirements:\n$$(A/F)_{st,blend} = w_{eth} \\cdot (A/F)_{st,eth} + w_{gas} \\cdot (A/F)_{st,gas}$$\nGiven $w_{eth} = 0.20$ and $w_{gas} = 0.80$:\n$$(A/F)_{st,blend} = (0.20 \\times 9.00) + (0.80 \\times 14.70) = 1.80 + 11.76 = 13.56$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FP_021",
    "section": "Section 3: Farm Power",
    "topic": "Sources of Power",
    "subtopic": "Bio-fuels and their use in farm mechanization",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Principles of Agricultural Engg. Vol. I (Ojha & Michael)",
    "question": "In the chemical transesterification of non-edible vegetable oil (triglycerides) with methanol to produce fatty acid methyl esters (biodiesel), the theoretical stoichiometric molar ratio of methanol to triglyceride is:",
    "options": {
      "A": "3:1",
      "B": "1:1",
      "C": "1:3",
      "D": "6:1"
    },
    "correct_answer": "A",
    "solution": "One molecule of triglyceride contains three fatty acid ester chains attached to a glycerol backbone. Complete transesterification requires 3 moles of alcohol (methanol) per mole of triglyceride to produce 3 moles of fatty acid methyl ester (biodiesel) and 1 mole of glycerol by-product (in commercial practice, an excess of 6:1 is used to drive the reversible reaction forward).",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_022",
    "section": "Section 3: Farm Power",
    "topic": "Sources of Power",
    "subtopic": "Bio-fuels and their use in farm mechanization",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Farm Machinery (Kepner & Sahay)",
    "question": "Which of the following statements comparing commercial B100 biodiesel with conventional petroleum diesel is/are correct?",
    "options": {
      "A": "Biodiesel has higher kinematic viscosity than petrodiesel, which can affect fuel spray droplet atomization at cold ambient temperatures.",
      "B": "Biodiesel has a significantly higher flash point (>130°C) than petrodiesel (~55–65°C), making it safer to handle and store.",
      "C": "Biodiesel possesses inherent lubricity that protects fuel injection pumps from premature wear compared to ultra-low sulfur diesel (ULSD).",
      "D": "Biodiesel contains significantly higher sulfur content than petroleum diesel, leading to higher sulfur oxide ($SO_2$) emissions."
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "• Biodiesel has higher kinematic viscosity ($4.0 - 6.0\\text{ cSt}$ vs $2.0 - 4.5\\text{ cSt}$ for diesel) (A is correct).\n• Flash point of B100 exceeds 130°C, classified as non-hazardous for storage (B is correct).\n• Oxygenated esters in biodiesel provide natural boundary lubrication for high-pressure injection equipment (C is correct).\n• Biodiesel contains virtually zero sulfur, greatly reducing $SO_2$ emissions (D is false).",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FP_023",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Thermodynamic principles of I.C. engines",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)",
    "question": "A single-cylinder 4-stroke diesel engine has an indicator diagram of area $8.5\\text{ cm}^2$ and base length $6.8\\text{ cm}$. The indicator spring calibration factor is $80\\text{ kPa/mm}$. The indicated mean effective pressure ($p_{imep}$) of the engine in $\\text{kPa}$ is ________ (answer in integer).",
    "correct_answer": "1000",
    "numerical_range": {
      "min": 1000,
      "max": 1000
    },
    "solution": "1. Mean diagram height ($h$):\n$$h = \\frac{\\text{Diagram Area}}{\\text{Base Length}} = \\frac{8.5\\text{ cm}^2}{6.8\\text{ cm}} = 1.25\\text{ cm} = 12.5\\text{ mm}$$\n2. Indicated mean effective pressure ($p_{imep}$):\n$$p_{imep} = h \\times \\text{Spring Scale} = 12.5\\text{ mm} \\times 80\\text{ kPa/mm} = 1000\\text{ kPa}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_024",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Thermodynamic principles of I.C. engines",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Principles of Agricultural Engg. Vol. I (Ojha & Michael)",
    "question": "In the second-law availability (exergy) analysis of an internal combustion engine, the single largest cause of exergy destruction (irreversibility) inside the engine is:",
    "options": {
      "A": "Uncontrolled chemical reaction during combustion across extreme temperature gradients",
      "B": "Viscous mechanical friction between piston rings and the cylinder liner",
      "C": "Thermal conduction through the exhaust valve stem",
      "D": "Pressure throttling across the intake air cleaner"
    },
    "correct_answer": "A",
    "solution": "Second-law exergy analysis demonstrates that uncontrolled chemical combustion across steep temperature and concentration gradients accounts for 20% to 25% of total fuel exergy destruction, far surpassing mechanical friction or fluid throttling losses.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FP_025",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Thermodynamic principles of I.C. engines",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Elements of Agricultural Engineering (Jagdishwar Sahay)",
    "question": "Which of the following idealizations are incorporated into the classical air-standard analysis of internal combustion engine power cycles?",
    "options": {
      "A": "The working fluid is air behaving throughout as an ideal gas with constant specific heats.",
      "B": "The combustion process is modeled as an external heat addition from a high-temperature reservoir.",
      "C": "The exhaust blowdown and scavenging processes are replaced by a constant-volume heat rejection to an external cold sink.",
      "D": "Compression and expansion strokes are assumed to be internally reversible and adiabatic (isentropic)."
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "All four assumptions define the ideal air-standard cycle:\n• Fixed composition ideal gas with constant $c_p$ and $c_v$.\n• Closed cycle where external heat transfers replace combustion and gas exchange.\n• Isentropic (reversible adiabatic) compression and expansion processes.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_026",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "I.C. engine cycles",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)",
    "question": "An ideal air-standard Diesel cycle operates with a compression ratio of $r = 16.0$ and a cut-off ratio of $r_c = 2.0$. Taking the adiabatic index $\\gamma = 1.40$, the theoretical thermal efficiency of the cycle expressed in percentage is ________ (round off to 1 decimal place).",
    "correct_answer": "61.4",
    "numerical_range": {
      "min": 61,
      "max": 61.8
    },
    "solution": "Thermal efficiency of an air-standard Diesel cycle is given by:\n$$\\eta_{\\text{Diesel}} = 1 - \\frac{1}{r^{\\gamma - 1}} \\left[ \\frac{r_c^\\gamma - 1}{\\gamma(r_c - 1)} \\right]$$\n1. $r^{\\gamma - 1} = 16^{0.40} \\approx 3.0314$\n$$\\frac{1}{r^{\\gamma - 1}} = \\frac{1}{3.0314} \\approx 0.3299$$\n2. For $r_c = 2.0$ and $\\gamma = 1.40$:\n$$r_c^\\gamma = 2^{1.40} \\approx 2.6390$$\n$$r_c^\\gamma - 1 = 1.6390$$\n$$\\gamma (r_c - 1) = 1.40 \\times (2.0 - 1.0) = 1.40$$\n$$\\left[ \\frac{r_c^\\gamma - 1}{\\gamma(r_c - 1)} \\right] = \\frac{1.6390}{1.40} \\approx 1.1707$$\n3. Thermal efficiency:\n$$\\eta = 1 - (0.3299 \\times 1.1707) = 1 - 0.3862 = 0.6138 = 61.38\\% \\approx 61.4\\%$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FP_027",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "I.C. engine cycles",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. I (Ojha & Michael)",
    "question": "An ideal Dual combustion (limited pressure) cycle has a compression ratio $r = 14.0$, pressure ratio during constant volume heat addition $\\alpha = P_3/P_2 = 1.50$, and cut-off ratio during constant pressure heat addition $r_c = V_4/V_3 = 1.40$. With $\\gamma = 1.40$, the bracketed cut-off factor $K = \\frac{\\alpha r_c^\\gamma - 1}{(\\alpha - 1) + \\gamma \\alpha (r_c - 1)}$ in the thermal efficiency formula is equal to ________ (round off to 2 decimal places).",
    "correct_answer": "1.05",
    "numerical_range": {
      "min": 1.03,
      "max": 1.07
    },
    "solution": "Calculate numerator and denominator:\n1. Numerator: $\\alpha r_c^\\gamma - 1$\n$$r_c^\\gamma = 1.4^{1.40} \\approx 1.6020$$\n$$\\alpha r_c^\\gamma = 1.50 \\times 1.6020 = 2.4030$$\n$$\\text{Numerator} = 2.4030 - 1 = 1.4030$$\n2. Denominator: $(\\alpha - 1) + \\gamma \\alpha (r_c - 1)$\n$$(\\alpha - 1) = 1.50 - 1 = 0.50$$\n$$\\gamma \\alpha (r_c - 1) = 1.40 \\times 1.50 \\times (1.40 - 1) = 2.10 \\times 0.40 = 0.84$$\n$$\\text{Denominator} = 0.50 + 0.84 = 1.34$$\n3. Value of factor $K$:\n$$K = \\frac{1.4030}{1.34} \\approx 1.047 \\approx 1.05$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FP_028",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "I.C. engine cycles",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Elements of Agricultural Engineering (Jagdishwar Sahay)",
    "question": "In an Atkinson or Miller cycle engine, the expansion ratio is designed to be greater than the compression ratio primarily to:",
    "options": {
      "A": "Extract additional mechanical work from expanding combustion gases down to lower pressure, thereby improving thermal efficiency",
      "B": "Eliminate the need for engine oil lubrication",
      "C": "Increase the maximum cylinder firing pressure above 250 bar",
      "D": "Convert the engine into an external combustion steam engine"
    },
    "correct_answer": "A",
    "solution": "By delaying intake valve closing (Miller/Atkinson cycle), the effective compression ratio is lowered while the expansion ratio remains large. This allows more work to be extracted from the high-temperature expansion gases, reducing exhaust blowdown energy losses and raising cycle thermal efficiency.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_029",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "I.C. engine cycles",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "source": "Principles of Agricultural Engg. Vol. I (Ojha & Michael)",
    "question": "For the same maximum cylinder peak pressure ($P_{\\max}$) and same maximum cylinder peak temperature ($T_{\\max}$), the thermal efficiencies of ideal air-standard cycles compare as follows:",
    "options": {
      "A": "$\\eta_{\\text{Diesel}} > \\eta_{\\text{Dual}} > \\eta_{\\text{Otto}}$",
      "B": "$\\eta_{\\text{Otto}} > \\eta_{\\text{Dual}} > \\eta_{\\text{Diesel}}$",
      "C": "$\\eta_{\\text{Otto}} = \\eta_{\\text{Diesel}} = \\eta_{\\text{Dual}}$",
      "D": "$\\eta_{\\text{Dual}} > \\eta_{\\text{Otto}} > \\eta_{\\text{Diesel}}$"
    },
    "correct_answer": "A",
    "solution": "When constrained to the same peak pressure and peak temperature, heat rejection in the Otto cycle is larger than that in the Diesel cycle because the Otto cycle must operate at a much lower compression ratio to avoid exceeding the peak pressure. Thus: $\\eta_{\\text{Diesel}} > \\eta_{\\text{Dual}} > \\eta_{\\text{Otto}}$.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FP_030",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Engine components",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)",
    "question": "A single-cylinder 4-stroke agricultural diesel engine operates at a mean speed of $N = 1500\\text{ rpm}$ (mean angular speed $\\omega = 157.08\\text{ rad/s}$). The maximum fluctuation of energy per cycle is $\\Delta E = 1250\\text{ J}$. If the permissible coefficient of fluctuation of speed is $C_s = 0.02$, the required mass moment of inertia ($I$) of the flywheel in $\\text{kg}\\cdot\\text{m}^2$ is ________ (round off to 2 decimal places).",
    "correct_answer": "2.53",
    "numerical_range": {
      "min": 2.48,
      "max": 2.58
    },
    "solution": "The relationship for flywheel energy fluctuation is:\n$$\\Delta E = I \\omega^2 C_s$$\nWhere:\n• $\\Delta E = 1250\\text{ J}$\n• $\\omega = 157.08\\text{ rad/s}$\n• $C_s = 0.02$\n$$I = \\frac{\\Delta E}{\\omega^2 C_s} = \\frac{1250}{(157.08)^2 \\times 0.02} = \\frac{1250}{24,674.1 \\times 0.02} = \\frac{1250}{493.48} \\approx 2.533\\text{ kg}\\cdot\\text{m}^2 \\approx 2.53\\text{ kg}\\cdot\\text{m}^2$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FP_031",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Engine components",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Elements of Agricultural Engineering (Jagdishwar Sahay)",
    "question": "A 4-cylinder tractor diesel engine has a piston stroke length of $L = 120\\text{ mm}$ and operates at rated speed of $N = 2200\\text{ rpm}$. The mean piston speed of the engine in $\\text{m/s}$ is ________ (round off to 1 decimal place).",
    "correct_answer": "8.8",
    "numerical_range": {
      "min": 8.7,
      "max": 8.9
    },
    "solution": "Mean piston speed ($v_m$) is given by:\n$$v_m = \\frac{2 L N}{60}$$\nGiven $L = 120\\text{ mm} = 0.120\\text{ m}$ and $N = 2200\\text{ rpm}$:\n$$v_m = \\frac{2 \\times 0.120 \\times 2200}{60} = \\frac{528}{60} = 8.8\\text{ m/s}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_032",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Engine components",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Principles of Agricultural Engg. Vol. I (Ojha & Michael)",
    "question": "In a four-stroke tractor diesel engine, the 'valve overlap' period refers to the crank rotation angle during which:",
    "options": {
      "A": "Both the inlet valve and exhaust valve remain open simultaneously around Top Dead Center (TDC)",
      "B": "Both valves remain closed throughout the compression stroke",
      "C": "Fuel injection occurs while the exhaust valve is fully open",
      "D": "Both valves remain open simultaneously around Bottom Dead Center (BDC)"
    },
    "correct_answer": "A",
    "solution": "Valve overlap occurs when the intake valve opens before TDC (inlet lead) while the exhaust valve is still closing after TDC (exhaust lag). This utilizes the momentum of the outgoing exhaust gas column to scavenge clearance volume and draw in fresh air.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_033",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Engine components",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)",
    "question": "In a tractor diesel engine, the piston has a diameter of $D = 100\\text{ mm}$. When the piston is at TDC on the power stroke, the peak combustion gas pressure is $P_{\\max} = 7.0\\text{ MPa}$. The peak axial gas force transmitted to the top of the connecting rod in $\\text{kN}$ is ________ (round off to 1 decimal place). Take $\\pi = 3.1416$.",
    "correct_answer": "55.0",
    "numerical_range": {
      "min": 54.5,
      "max": 55.5
    },
    "solution": "1. Piston crown surface area ($A$):\n$$A = \\frac{\\pi}{4} D^2 = \\frac{3.1416}{4} (0.10\\text{ m})^2 = 0.007854\\text{ m}^2$$\n2. Peak gas force ($F_g$):\n$$F_g = P_{\\max} \\times A = (7.0 \\times 10^6\\text{ N/m}^2) \\times 0.007854\\text{ m}^2 = 54,978\\text{ N} \\approx 55.0\\text{ kN}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_034",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Engine components",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Tractors and Their Power Units (Liljedahl et al.)",
    "question": "Which of the following statements regarding IC engine pistons, rings, and cylinder liners is/are correct?",
    "options": {
      "A": "Compression rings seal high-pressure combustion gas against blow-by into the crankcase.",
      "B": "Oil control rings scrape excess lubricant off the cylinder bore on downstrokes and return it to the oil sump.",
      "C": "Wet cylinder liners make direct contact with circulating liquid engine coolant in the block jacket.",
      "D": "Dry cylinder liners are thin pressed sleeves that do not make direct contact with engine coolant."
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "All four statements describe standard engine cylinder architecture:\n• Compression rings seal combustion pressure.\n• Oil scraper rings regulate cylinder oil film thickness.\n• Wet liners contact coolant directly and require O-ring sealing collars.\n• Dry liners are thin sleeves fitted into bored engine block castings without direct coolant contact.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_035",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Fuels and combustion",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)",
    "question": "A diesel engine burns dodecane ($C_{12}H_{26}$) as a reference fuel. The atomic weights are: $C = 12\\text{ g/mol}$, $H = 1\\text{ g/mol}$, and $O = 16\\text{ g/mol}$. Assuming atmospheric air contains $23.2\\%$ oxygen by mass, the stoichiometric air-fuel ratio on a mass basis for complete combustion of dodecane is ________ (round off to 2 decimal places).",
    "correct_answer": "15.01",
    "numerical_range": {
      "min": 14.85,
      "max": 15.15
    },
    "solution": "1. Stoichiometric combustion equation:\n$$C_{12}H_{26} + \\left(12 + \\frac{26}{4}\\right) O_2 \\to 12 CO_2 + 13 H_2O$$\n$$12 + 6.5 = 18.5\\text{ moles of } O_2$$\n2. Molar mass of fuel ($C_{12}H_{26}$):\n$$M_{\\text{fuel}} = (12 \\times 12) + (26 \\times 1) = 144 + 26 = 170\\text{ g/mol}$$\n3. Mass of oxygen required per mole of fuel:\n$$m_{O2} = 18.5 \\times 32\\text{ g} = 592\\text{ g}$$\n4. Mass of air containing this oxygen:\n$$m_{\\text{air}} = \\frac{592\\text{ g}}{0.232} \\approx 2551.72\\text{ g}$$\n5. Stoichiometric Air-Fuel Ratio:\n$$(A/F)_{st} = \\frac{2551.72\\text{ g air}}{170\\text{ g fuel}} \\approx 15.01$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FP_036",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Fuels and combustion",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "Elements of Agricultural Engineering (Jagdishwar Sahay)",
    "question": "A tractor diesel engine operates under part-load with an actual operating air-fuel ratio of $(A/F)_{act} = 22.5$. If the stoichiometric air-fuel ratio is $(A/F)_{st} = 15.0$, the fuel-air equivalence ratio ($\\phi = \\frac{(A/F)_{st}}{(A/F)_{act}}$) of the mixture is ________ (round off to 2 decimal places).",
    "correct_answer": "0.67",
    "numerical_range": {
      "min": 0.65,
      "max": 0.69
    },
    "solution": "The fuel-air equivalence ratio $\\phi$ is defined as:\n$$\\phi = \\frac{(F/A)_{act}}{(F/A)_{st}} = \\frac{(A/F)_{st}}{(A/F)_{act}}$$\nGiven $(A/F)_{st} = 15.0$ and $(A/F)_{act} = 22.5$:\n$$\\phi = \\frac{15.0}{22.5} = \\frac{2}{3} \\approx 0.6667 \\approx 0.67$$\n(Note: $\\phi < 1.0$ indicates a lean combustion mixture, typical for diesel engines).",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_037",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Fuels and combustion",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Principles of Agricultural Engg. Vol. I (Ojha & Michael)",
    "question": "In a compression-ignition (diesel) engine, diesel knock is primarily caused by:",
    "options": {
      "A": "An excessively long ignition delay period leading to excessive accumulation of injected fuel that burns explosively upon ignition",
      "B": "An excessively high cetane number of the fuel",
      "C": "Hot-spot pre-ignition from a fouled spark plug",
      "D": "Extremely advanced fuel atomization with very short delay period"
    },
    "correct_answer": "A",
    "solution": "If the ignition delay period is too long, a large quantity of fuel is injected and vaporized before ignition begins. When auto-ignition occurs, this entire accumulated fuel mass burns almost instantaneously, causing an extremely high rate of pressure rise ($dp/d\\theta > 8 - 10\\text{ bar/deg}$) and audible diesel knocking.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_038",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Fuels and combustion",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Elements of Agricultural Engineering (Jagdishwar Sahay)",
    "question": "Which of the following statements regarding fuel auto-ignition and anti-knock ratings is/are correct?",
    "options": {
      "A": "Cetane number measures the self-ignition quality and shortness of ignition delay for diesel fuels.",
      "B": "Pure n-hexadecane (cetane) is assigned a cetane rating of 100, while alpha-methylnaphthalene is assigned 0 (or heptamethylnonane is assigned 15).",
      "C": "Iso-octane (2,2,4-trimethylpentane) has high resistance to auto-ignition and is assigned an octane rating of 100.",
      "D": "Fuels that have high octane numbers naturally possess high cetane numbers."
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "• Cetane rating measures ignition ease in CI engines (A is correct).\n• Standard reference fuels for cetane are n-hexadecane (100) and isocetane/alpha-methylnaphthalene (B is correct).\n• Iso-octane resists knock in SI engines and defines 100 octane (C is correct).\n• Octane and cetane scales are inverse: fuels with high resistance to auto-ignition (high octane) have very long ignition delay (low cetane) (D is false).",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FP_039",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Lubricants and their properties",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Principles of Agricultural Engg. Vol. I (Ojha & Michael)",
    "question": "In the SAE viscosity designation 'SAE 15W-40' for multi-grade agricultural tractor engine oil, the prefix '15W' designates:",
    "options": {
      "A": "Low-temperature winter ('W') viscosity rating for cold-cranking and pumpability",
      "B": "The oil contains 15% water-based additive emulsion",
      "C": "Kinematic viscosity measured at 150°C",
      "D": "A maximum allowable operational life of 15 weeks"
    },
    "correct_answer": "A",
    "solution": "The 'W' stands for 'Winter'. SAE 15W designates the low-temperature viscosity limit for engine cold-cranking and oil pumpability down to -20°C, whereas '40' indicates the high-temperature kinematic viscosity rating at 100°C.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_040",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Lubricants and their properties",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Tractors and Their Power Units (Liljedahl et al.)",
    "question": "Which of the following properties are essential requirements for heavy-duty tractor engine crankcase lubricating oils?",
    "options": {
      "A": "High Viscosity Index (VI) to minimize viscosity change across wide operating temperatures",
      "B": "Adequate Total Base Number (TBN) to neutralize acidic combustion by-products from fuel sulfur",
      "C": "Low pour point to ensure oil flow and pumpability during cold morning starts",
      "D": "High flash point to prevent oil vaporization and crankcase fire hazards"
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "All four properties are crucial for tractor crankcase lubricants:\n• High VI maintains hydrodynamic lubrication film across temperature swings.\n• TBN counteracts sulfuric acid corrosion from diesel combustion.\n• Low pour point prevents oil gelling in cold weather.\n• High flash point ensures thermal stability and safety against ignition.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_041",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Lubricants and their properties",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)",
    "question": "A tractor crankshaft journal bearing has a journal diameter of $d = 60\\text{ mm}$ ($R = 30\\text{ mm}$), bearing length $L = 40\\text{ mm}$, and radial clearance $c = 0.03\\text{ mm}$. The journal rotates at $N = 1800\\text{ rpm}$ ($\\omega = 188.5\\text{ rad/s}$) in lubricating oil of dynamic viscosity $\\mu = 0.025\\text{ Pa}\\cdot\\text{s}$. Using Petroff's equation for a concentric journal ($P_f = \\frac{2 \\pi \\mu \\omega^2 L R^3}{c}$), the viscous friction power lost in the bearing in Watts is ________ (round off to 1 decimal place). Take $\\pi = 3.1416$.",
    "correct_answer": "200.9",
    "numerical_range": {
      "min": 198,
      "max": 204
    },
    "solution": "Petroff's equation for viscous friction power loss in a concentric journal bearing:\n$$P_f = \\frac{2 \\pi \\mu \\omega^2 L R^3}{c}$$\nWhere:\n• $\\mu = 0.025\\text{ Pa}\\cdot\\text{s}$\n• $\\omega = \\frac{2 \\pi \\times 1800}{60} = 60\\pi \\approx 188.496\\text{ rad/s} \\implies \\omega^2 \\approx 35,530.6\\text{ rad}^2/\\text{s}^2$\n• $L = 0.040\\text{ m}$\n• $R = 0.030\\text{ m} \\implies R^3 = 2.7 \\times 10^{-5}\\text{ m}^3$\n• $c = 3.0 \\times 10^{-5}\\text{ m}$\n$$P_f = \\frac{2 \\times 3.1416 \\times 0.025 \\times 35,530.6 \\times 0.040 \\times (2.7 \\times 10^{-5})}{3.0 \\times 10^{-5}}$$\n$$P_f = \\frac{2 \\times 3.1416 \\times 0.025 \\times 35,530.6 \\times 0.040 \\times 0.90}{1} \\approx 200.93\\text{ W} \\approx 200.9\\text{ W}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FP_042",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "I.C. engine systems – fuel, cooling, lubrication, ignition, electrical, intake and exhaust",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)",
    "question": "In a Common Rail Direct Injection (CRDI) tractor diesel engine, fuel is injected at a rail pressure of $P_{\\text{rail}} = 160\\text{ MPa}$ into a combustion chamber where the compressed air pressure is $P_{\\text{cyl}} = 6\\text{ MPa}$. The density of diesel fuel is $\\rho_f = 840\\text{ kg/m}^3$. The theoretical fuel exit velocity through the injector nozzle orifice in $\\text{m/s}$ is ________ (round off to 1 decimal place).",
    "correct_answer": "605.5",
    "numerical_range": {
      "min": 603,
      "max": 608
    },
    "solution": "1. Effective pressure drop across nozzle orifice ($\\Delta P$):\n$$\\Delta P = P_{\\text{rail}} - P_{\\text{cyl}} = 160 - 6 = 154\\text{ MPa} = 154 \\times 10^6\\text{ N/m}^2$$\n2. Theoretical jet exit velocity by Torricelli's Bernoulli equation:\n$$v_{th} = \\sqrt{\\frac{2 \\Delta P}{\\rho_f}} = \\sqrt{\\frac{2 \\times 154 \\times 10^6}{840}} = \\sqrt{\\frac{308 \\times 10^6}{840}} = \\sqrt{366,666.7} \\approx 605.53\\text{ m/s} \\approx 605.5\\text{ m/s}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FP_043",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "I.C. engine systems – fuel, cooling, lubrication, ignition, electrical, intake and exhaust",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. I (Ojha & Michael)",
    "question": "A tractor diesel engine rejects $Q = 28.0\\text{ kW}$ of heat to its liquid cooling system. Coolant enters the radiator at $T_{\\text{in}} = 88^\\circ\\text{C}$ and exits at $T_{\\text{out}} = 80^\\circ\\text{C}$. The specific heat capacity of the coolant is $c_p = 4.184\\text{ kJ/(kg}\\cdot\\text{K)}$. The required mass circulation rate of coolant through the radiator in $\\text{kg/min}$ is ________ (round off to 1 decimal place).",
    "correct_answer": "50.2",
    "numerical_range": {
      "min": 49.5,
      "max": 50.8
    },
    "solution": "1. Heat transfer rate equation:\n$$Q = \\dot{m} c_p \\Delta T$$\nWhere:\n• $Q = 28.0\\text{ kW} = 28.0\\text{ kJ/s}$\n• $c_p = 4.184\\text{ kJ/(kg}\\cdot\\text{K)}$\n• $\\Delta T = 88 - 80 = 8\\text{ K}$\n$$\\dot{m} = \\frac{Q}{c_p \\Delta T} = \\frac{28.0}{4.184 \\times 8} = \\frac{28.0}{33.472} \\approx 0.8365\\text{ kg/s}$$\n2. Mass flow rate in $\\text{kg/min}$:\n$$\\dot{m}_{min} = 0.8365 \\times 60 \\approx 50.19\\text{ kg/min} \\approx 50.2\\text{ kg/min}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_044",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "I.C. engine systems – fuel, cooling, lubrication, ignition, electrical, intake and exhaust",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Elements of Agricultural Engineering (Jagdishwar Sahay)",
    "question": "Ambient air at $P_1 = 100\\text{ kPa}$ and $T_1 = 300\\text{ K}$ enters a tractor turbocharger compressor having a pressure ratio of $r_p = 1.80$. The isentropic efficiency of the compressor is $\\eta_c = 75\\%$ ($0.75$). Taking $\\gamma = 1.40$, the isentropic discharge temperature is $T_{2s} = T_1 (r_p)^{(\\gamma-1)/\\gamma} = 300 \\times (1.80)^{0.2857} \\approx 355.0\\text{ K}$. The actual air temperature leaving the compressor ($T_2 = T_1 + \\frac{T_{2s}-T_1}{\\eta_c}$) in Kelvin is ________ (round off to 1 decimal place).",
    "correct_answer": "373.3",
    "numerical_range": {
      "min": 371,
      "max": 376
    },
    "solution": "The actual compressor exit temperature $T_2$ accounting for isentropic efficiency $\\eta_c$ is:\n$$T_2 = T_1 + \\frac{T_{2s} - T_1}{\\eta_c}$$\nGiven $T_1 = 300\\text{ K}$, $T_{2s} = 355.0\\text{ K}$, and $\\eta_c = 0.75$:\n$$T_2 = 300 + \\frac{355.0 - 300}{0.75} = 300 + \\frac{55.0}{0.75} = 300 + 73.33 = 373.33\\text{ K} \\approx 373.3\\text{ K}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FP_045",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "I.C. engine systems – fuel, cooling, lubrication, ignition, electrical, intake and exhaust",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Principles of Agricultural Engg. Vol. I (Ojha & Michael)",
    "question": "In a conventional distributor-type battery ignition system, the 'dwell angle' is defined as:",
    "options": {
      "A": "The angle of distributor shaft rotation during which the breaker contact points remain closed to allow primary coil current to saturate",
      "B": "The angle of spark advance before top dead center",
      "C": "The duration of the high-voltage spark discharge across the spark plug gap",
      "D": "The crank angle between intake valve opening and closing"
    },
    "correct_answer": "A",
    "solution": "Dwell angle (or cam dwell) is the number of degrees through which the distributor cam rotates while the breaker points are in closed contact. This closed period allows magnetic energy to build up in the ignition coil primary winding before the points open to trigger the spark.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_046",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "I.C. engine systems – fuel, cooling, lubrication, ignition, electrical, intake and exhaust",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Tractors and Their Power Units (Liljedahl et al.)",
    "question": "Which of the following statements regarding the forced-feed (full pressure) lubrication circuit in farm tractors is/are correct?",
    "options": {
      "A": "A positive displacement gear pump delivers oil under pressure through a full-flow filter to the main gallery.",
      "B": "A spring-loaded pressure relief valve prevents excessive system oil pressure by bypassing surplus oil back to the sump at high RPM.",
      "C": "An oil filter bypass valve opens automatically if the filter element becomes clogged, ensuring critical bearings are not starved of oil.",
      "D": "Under-piston oil spray nozzles help extract heat from the piston crowns in heavy-duty turbocharged engines."
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "All four statements represent standard tractor engine lubrication features:\n• Gear pump delivers pressurized flow to engine galleries (A is correct).\n• Relief valve controls maximum line pressure (B is correct).\n• Filter bypass valve prevents catastrophic lubrication starvation if the paper element plugs (C is correct).\n• Piston cooling jets spray oil directly onto piston undercrowns (D is correct).",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_047",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Selection, operation, maintenance and repair of I.C. engines",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Elements of Agricultural Engineering (Jagdishwar Sahay)",
    "question": "For an in-line 4-cylinder four-stroke tractor diesel engine, which of the following represents the most widely used standard firing order to ensure dynamic balance and uniform torque pulses?",
    "options": {
      "A": "1-3-4-2",
      "B": "1-2-3-4",
      "C": "1-4-3-2",
      "D": "4-3-2-1"
    },
    "correct_answer": "A",
    "solution": "In standard in-line 4-stroke 4-cylinder engines with a flat-plane ($180^\\circ$) crankshaft (cylinders 1 and 4 moving together, and 2 and 3 moving together), the firing order 1-3-4-2 provides symmetrical torque impulses every $180^\\circ$ of crank rotation with optimal dynamic balancing.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_048",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Selection, operation, maintenance and repair of I.C. engines",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Principles of Agricultural Engg. Vol. I (Ojha & Michael)",
    "question": "During engine maintenance and overhaul, cylinder bore 'ovality' (out-of-roundness) is evaluated by measuring bore diameters with a dial bore gauge:",
    "options": {
      "A": "Across the major thrust axis (perpendicular to crankshaft) and along the longitudinal axis (parallel to crankshaft) at the same depth",
      "B": "At the very top of the liner and the very bottom only",
      "C": "Before and after washing the cylinder block with solvent",
      "D": "With the piston rings installed inside the bore"
    },
    "correct_answer": "A",
    "solution": "Cylinder ovality is the difference between transverse (thrust side) and longitudinal (parallel to crankshaft) bore diameters at identical depths, caused primarily by side-thrust forces of the piston during expansion and compression strokes.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_049",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Selection, operation, maintenance and repair of I.C. engines",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Tractors and Their Power Units (Liljedahl et al.)",
    "question": "Which of the following technologies are deployed in modern agricultural tractors to comply with Bharat Stage TREM IV / Stage V emission standards?",
    "options": {
      "A": "Cooled Exhaust Gas Recirculation (EGR) to suppress peak combustion temperatures and minimize $NO_x$ formation.",
      "B": "Selective Catalytic Reduction (SCR) dosing aqueous urea (DEF / AdBlue) to reduce $NO_x$ to harmless nitrogen and water vapor.",
      "C": "Diesel Particulate Filter (DPF) to capture and periodically burn off fine soot particles.",
      "D": "Mechanical carburetors with float chambers for fine air-fuel metering."
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "• Cooled EGR reduces $NO_x$ by thermal dilution (A is correct).\n• SCR treats downstream exhaust with urea to convert $NO_x$ into $N_2$ and $H_2O$ (B is correct).\n• DPF traps solid carbonaceous particulates (C is correct).\n• Diesel engines use high-pressure fuel injection (CRDI), not carburetors (D is false).",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_050",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Power efficiencies and measurement, engine performance curves",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)",
    "question": "A Morse test was conducted on a 4-cylinder 4-stroke tractor diesel engine running at $1800\\text{ rpm}$. The total brake power with all cylinders firing was $BP_{\\text{all}} = 32.0\\text{ kW}$. The brake powers measured when each cylinder was successively cut out were: Cyl 1 cut out = $23.2\\text{ kW}$, Cyl 2 cut out = $23.5\\text{ kW}$, Cyl 3 cut out = $23.0\\text{ kW}$, and Cyl 4 cut out = $23.3\\text{ kW}$. The mechanical efficiency of the engine in percentage is ________ (round off to 1 decimal place).",
    "correct_answer": "91.4",
    "numerical_range": {
      "min": 91,
      "max": 91.8
    },
    "solution": "1. Indicated power of each individual cylinder ($IP_i = BP_{\\text{all}} - BP_{-i}$):\n$$IP_1 = 32.0 - 23.2 = 8.8\\text{ kW}$$\n$$IP_2 = 32.0 - 23.5 = 8.5\\text{ kW}$$\n$$IP_3 = 32.0 - 23.0 = 9.0\\text{ kW}$$\n$$IP_4 = 32.0 - 23.3 = 8.7\\text{ kW}$$\n2. Total indicated power ($IP_{\\text{total}}$):\n$$IP_{\\text{total}} = 8.8 + 8.5 + 9.0 + 8.7 = 35.0\\text{ kW}$$\n3. Mechanical efficiency ($\\eta_m$):\n$$\\eta_m = \\frac{BP_{\\text{all}}}{IP_{\\text{total}}} \\times 100 = \\frac{32.0}{35.0} \\times 100 = 91.428\\% \\approx 91.4\\%$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FP_051",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Power efficiencies and measurement, engine performance curves",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)",
    "question": "A Prony brake dynamometer is used to measure the brake power of an agricultural diesel engine running at $N = 1500\\text{ rpm}$. The effective moment arm from the shaft centerline to the balance knife-edge is $L = 0.75\\text{ m}$. The net load registered on the balance scale is $W = 280\\text{ N}$. Taking $\\pi = 3.1416$, the brake power of the engine in $\\text{kW}$ is ________ (round off to 2 decimal places).",
    "correct_answer": "32.99",
    "numerical_range": {
      "min": 32.8,
      "max": 33.2
    },
    "solution": "1. Braking torque ($T$):\n$$T = W \\times L = 280\\text{ N} \\times 0.75\\text{ m} = 210.0\\text{ N}\\cdot\\text{m}$$\n2. Brake power ($BP$):\n$$BP = \\frac{2 \\pi N T}{60 \\times 1000} = \\frac{2 \\times 3.1416 \\times 1500 \\times 210.0}{60,000} = \\frac{1,979,208}{60,000} \\approx 32.9868\\text{ kW} \\approx 32.99\\text{ kW}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_052",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Power efficiencies and measurement, engine performance curves",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Tractors and Their Power Units (Liljedahl et al.)",
    "question": "A tractor diesel engine develops a rated torque of $T_{\\text{rated}} = 195.3\\text{ N}\\cdot\\text{m}$ at rated engine speed of $2200\\text{ rpm}$. When pulled down under heavy drawbar load, the engine develops its peak maximum torque of $T_{\\max} = 238.5\\text{ N}\\cdot\\text{m}$ at $1400\\text{ rpm}$. The torque reserve percentage ($TR = \\frac{T_{\\max} - T_{\\text{rated}}}{T_{\\text{rated}}} \\times 100$) of the engine is ________ (round off to 1 decimal place).",
    "correct_answer": "22.1",
    "numerical_range": {
      "min": 21.8,
      "max": 22.4
    },
    "solution": "Torque reserve ($TR$) represents the engine lugging ability:\n$$TR = \\frac{T_{\\max} - T_{\\text{rated}}}{T_{\\text{rated}}} \\times 100$$\nGiven $T_{\\max} = 238.5\\text{ N}\\cdot\\text{m}$ and $T_{\\text{rated}} = 195.3\\text{ N}\\cdot\\text{m}$:\n$$TR = \\frac{238.5 - 195.3}{195.3} \\times 100 = \\frac{43.2}{195.3} \\times 100 \\approx 22.1198\\% \\approx 22.1\\%$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_053",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Power efficiencies and measurement, engine performance curves",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. I (Ojha & Michael)",
    "question": "Which of the following statements regarding full-load agricultural tractor diesel engine performance curves is/are correct?",
    "options": {
      "A": "As engine speed decreases from rated RPM down to the peak torque speed (engine lugging), engine torque increases.",
      "B": "The Brake Specific Fuel Consumption (BSFC) curve typically exhibits a minimum (optimum fuel economy) near the peak torque to intermediate speed range.",
      "C": "Brake power peaks at rated engine speed and drops off at overspeed due to declining volumetric efficiency and escalating friction losses.",
      "D": "Adequate torque reserve permits the tractor to pull through temporary high-draft soil patches without requiring downshifting."
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "All four statements accurately describe tractor engine governor and torque rise characteristics:\n• Lugging allows torque rise as RPM drops.\n• BSFC sweet spot occurs between peak torque and rated RPM.\n• Friction horsepower scales with $N^2$, causing power droop at overspeed.\n• High torque backup prevents gear-shifting under momentary draft spikes.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_054",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Calculation of power, torque, fuel consumption, heat load and power losses",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)",
    "question": "During a heat balance test on a tractor diesel engine, the fuel consumption rate was $9.0\\text{ kg/h}$ with a lower heating value of $42,000\\text{ kJ/kg}$. The brake power developed was $35.0\\text{ kW}$. The heat carried away by radiator cooling water was $36.0\\text{ kW}$, and the heat carried away by the exhaust gas was $24.0\\text{ kW}$. The remaining heat energy lost via radiation, convection, and unaccounted losses in $\\text{kW}$ is ________ (answer in integer).",
    "correct_answer": "10",
    "numerical_range": {
      "min": 10,
      "max": 10
    },
    "solution": "1. Total heat energy supplied by fuel per second ($Q_{\\text{in}}$):\n$$Q_{\\text{in}} = \\frac{\\dot{m}_f \\times CV}{3600} = \\frac{9.0\\text{ kg/h} \\times 42,000\\text{ kJ/kg}}{3600\\text{ s}} = 105.0\\text{ kW}$$\n2. Sum of accounted energy outputs:\n$$\\Sigma Q_{\\text{out}} = BP + Q_{\\text{cool}} + Q_{\\text{exh}} = 35.0 + 36.0 + 24.0 = 95.0\\text{ kW}$$\n3. Unaccounted and radiation losses:\n$$Q_{\\text{rad}} = Q_{\\text{in}} - \\Sigma Q_{\\text{out}} = 105.0 - 95.0 = 10\\text{ kW}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_055",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Calculation of power, torque, fuel consumption, heat load and power losses",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Elements of Agricultural Engineering (Jagdishwar Sahay)",
    "question": "A 4-stroke 4-cylinder agricultural diesel engine with total displacement volume $V_d = 3.0\\text{ L}$ ($0.003\\text{ m}^3$) runs at $N = 2000\\text{ rpm}$. The measured mass flow rate of intake air inducted into the engine is $\\dot{m}_a = 183.6\\text{ kg/h}$. Ambient air density is $\\rho_a = 1.20\\text{ kg/m}^3$. The volumetric efficiency of the engine in percentage is ________ (answer in integer).",
    "correct_answer": "85",
    "numerical_range": {
      "min": 85,
      "max": 85
    },
    "solution": "1. In a 4-stroke engine, number of intake cycles per minute is $N/2 = 1000\\text{ cycles/min}$:\n$$\\text{Intake cycles per second} = \\frac{2000}{120} = \\frac{50}{3}\\text{ s}^{-1}$$\n2. Theoretical volume rate of air inducted:\n$$\\dot{V}_{th} = V_d \\times \\frac{N}{120} = 0.003\\text{ m}^3 \\times \\frac{50}{3} = 0.050\\text{ m}^3/\\text{s}$$\n3. Theoretical mass rate of air inducted:\n$$\\dot{m}_{th} = \\dot{V}_{th} \\times \\rho_a = 0.050\\text{ m}^3/\\text{s} \\times 1.20\\text{ kg/m}^3 = 0.060\\text{ kg/s} = 216.0\\text{ kg/h}$$\n4. Volumetric efficiency ($\\eta_v$):\n$$\\eta_v = \\frac{\\dot{m}_{a,\\text{actual}}}{\\dot{m}_{th}} \\times 100 = \\frac{183.6\\text{ kg/h}}{216.0\\text{ kg/h}} \\times 100 = 85\\%$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FP_056",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Calculation of power, torque, fuel consumption, heat load and power losses",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. I (Ojha & Michael)",
    "question": "A four-stroke 3-cylinder tractor diesel engine has a total displacement volume of $V_d = 2.4\\text{ L}$ ($2.4 \\times 10^{-3}\\text{ m}^3$). At an engine speed of $N = 2100\\text{ rpm}$, the engine develops a brake power of $BP = 35.0\\text{ kW}$. The brake mean effective pressure ($bmep$) of the engine in $\\text{kPa}$ is ________ (round off to 1 decimal place).",
    "correct_answer": "833.3",
    "numerical_range": {
      "min": 830,
      "max": 836
    },
    "solution": "For a four-stroke multi-cylinder engine, brake power is given by:\n$$BP = \\frac{bmep \\cdot V_d \\cdot N}{120 \\times 1000}$$\nWhere $bmep$ is in $\\text{kPa}$, $V_d$ is total displacement in $\\text{m}^3$, and $N$ is engine $\\text{rpm}$:\n$$bmep = \\frac{BP \\times 120 \\times 1000}{V_d \\times N}$$\n$$bmep = \\frac{35.0 \\times 120,000}{(2.4 \\times 10^{-3}) \\times 2100} = \\frac{4,200,000}{5.04} \\approx 833.33\\text{ kPa} \\approx 833.3\\text{ kPa}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FP_057",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Calculation of power, torque, fuel consumption, heat load and power losses",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Elements of Agricultural Engineering (Jagdishwar Sahay)",
    "question": "In the Willans line method for estimating the mechanical friction power of a compression-ignition engine operating at constant speed:",
    "options": {
      "A": "A plot of gross fuel consumption rate versus brake power output is linearly extrapolated backward to zero fuel consumption; the negative power intercept represents engine friction power",
      "B": "Fuel injection timing is retarded until the engine stalls",
      "C": "Cylinders are cut off one by one using a shorting bar",
      "D": "The engine is driven with an external electric dynamometer with the cylinder head removed"
    },
    "correct_answer": "A",
    "solution": "In a compression ignition engine running at governed constant speed, gross fuel consumption plotted against brake power yields an approximately straight line (Willans line). Extrapolating this line backward to the zero fuel consumption axis gives a negative power intercept that represents the total engine friction and pumping losses ($FP$).",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_058",
    "section": "Section 3: Farm Power",
    "topic": "Tractors and Power Tillers",
    "subtopic": "Type, selection, maintenance and repair of tractors and power tillers",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. I (Ojha & Michael)",
    "question": "A walk-behind two-wheel power tiller equipped with a rotary tiller attachment moves forward at a speed of $v = 1.8\\text{ km/h}$. The tilling rotor rotates at $N = 250\\text{ rpm}$. The rotor flanges carry $z = 2$ opposing tines per flange plane. The tilling pitch (forward advance per cut) in $\\text{cm}$ is ________ (answer in integer).",
    "correct_answer": "6",
    "numerical_range": {
      "min": 6,
      "max": 6
    },
    "solution": "1. Forward speed in $\\text{cm/s}$:\n$$v = 1.8 \\times \\frac{5}{18} = 0.50\\text{ m/s} = 50\\text{ cm/s}$$\n2. Rotor cuts per second per flange:\n$$f = z \\times \\frac{N}{60} = 2 \\times \\frac{250}{60} = \\frac{500}{60} = \\frac{25}{3}\\text{ cuts/s}$$\n3. Tilling pitch ($p$):\n$$p = \\frac{v}{f} = \\frac{50}{25/3} = 50 \\times \\frac{3}{25} = 6.0\\text{ cm}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_059",
    "section": "Section 3: Farm Power",
    "topic": "Tractors and Power Tillers",
    "subtopic": "Type, selection, maintenance and repair of tractors and power tillers",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Tractors and Their Power Units (Liljedahl et al.)",
    "question": "Which of the following statements regarding tractor drivetrain configurations (2WD vs 4WD/MFWD vs Track-type) is/are correct?",
    "options": {
      "A": "4WD (MFWD) tractors utilize front wheel assist to convert a portion of front axle weight into tractive pull, increasing drawbar pull by 15% to 30% over comparable 2WD tractors.",
      "B": "Track-type (crawler) tractors exert substantially lower ground contact pressure ($30-50\\text{ kPa}$), minimizing subsoil compaction in wet paddy fields.",
      "C": "2WD tractors typically carry approximately 65% to 70% of static weight on the rear axle on level ground.",
      "D": "Rubber-track tractors experience higher wheel slip than wheeled tractors under all soil moisture conditions."
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "• MFWD engages front axle load for extra drawbar pull (A is correct).\n• Crawler tracks spread weight over large contact areas, dramatically reducing mean ground pressure (B is correct).\n• 2WD static weight distribution typically allocates ~2/3 of weight to rear driving wheels (C is correct).\n• Rubber tracks provide vastly superior contact patch area and traction grip, resulting in lower slip, not higher (D is false).",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_060",
    "section": "Section 3: Farm Power",
    "topic": "Tractors and Power Tillers",
    "subtopic": "Type, selection, maintenance and repair of tractors and power tillers",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Elements of Agricultural Engineering (Jagdishwar Sahay)",
    "question": "In standard agricultural tractor maintenance schedules, engine crankcase lubricating oil and oil filter elements are typically replaced every:",
    "options": {
      "A": "250 to 300 operating hours (or annually)",
      "B": "10 operating hours",
      "C": "5,000 operating hours",
      "D": "Only when the engine stalls during field work"
    },
    "correct_answer": "A",
    "solution": "Manufacturer service manuals and IS 12207 recommend draining and replacing engine crankcase oil and spin-on oil filter elements every 250 to 300 operating hours (or at the end of each working season) to prevent additive depletion and soot accumulation.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_061",
    "section": "Section 3: Farm Power",
    "topic": "Tractors and Power Tillers",
    "subtopic": "Tractor clutches and brakes",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)",
    "question": "A tractor multi-plate wet master clutch has 4 driving plates and 3 driven plates ($n = 6$ pairs of active friction contact surfaces). The friction surfaces have an outer radius of $r_1 = 150\\text{ mm}$ and inner radius of $r_2 = 100\\text{ mm}$. The coefficient of friction is $\\mu = 0.12$. If the total axial clamping spring force is $W = 5000\\text{ N}$, using uniform wear theory, the maximum torque transmitting capacity of the clutch in $\\text{N}\\cdot\\text{m}$ is ________ (answer in integer).",
    "correct_answer": "450",
    "numerical_range": {
      "min": 450,
      "max": 450
    },
    "solution": "1. Mean friction radius under uniform wear theory ($R_m$):\n$$R_m = \\frac{r_1 + r_2}{2} = \\frac{150 + 100}{2} = 125\\text{ mm} = 0.125\\text{ m}$$\n2. Number of active contact pairs $n = 6$.\n3. Maximum clutch torque capacity ($T$):\n$$T = n \\cdot \\mu \\cdot W \\cdot R_m = 6 \\times 0.12 \\times 5000\\text{ N} \\times 0.125\\text{ m} = 450\\text{ N}\\cdot\\text{m}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_062",
    "section": "Section 3: Farm Power",
    "topic": "Tractors and Power Tillers",
    "subtopic": "Tractor clutches and brakes",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. I (Ojha & Michael)",
    "question": "A differential band brake installed on a tractor final drive has a brake drum diameter of $D = 350\\text{ mm}$ ($R = 0.175\\text{ m}$). The angle of contact of the friction band is $\\theta = 240^\\circ$ ($4.189\\text{ rad}$), and the friction coefficient between lining and drum is $\\mu = 0.35$. If the tension on the slack side of the band is $T_2 = 800\\text{ N}$, the braking torque exerted on the brake drum in $\\text{N}\\cdot\\text{m}$ is ________ (round off to 1 decimal place).",
    "correct_answer": "466.5",
    "numerical_range": {
      "min": 463,
      "max": 470
    },
    "solution": "1. Tension ratio across band brake:\n$$\\frac{T_1}{T_2} = e^{\\mu \\theta} = e^{0.35 \\times 4.189} = e^{1.46615} \\approx 4.3325$$\n$$T_1 = 800 \\times 4.3325 \\approx 3466.0\\text{ N}$$\n2. Braking torque ($T_b$):\n$$T_b = (T_1 - T_2) \\times R = (3466.0 - 800) \\times 0.175 = 2666.0 \\times 0.175 \\approx 466.55\\text{ N}\\cdot\\text{m} \\approx 466.5\\text{ N}\\cdot\\text{m}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FP_063",
    "section": "Section 3: Farm Power",
    "topic": "Tractors and Power Tillers",
    "subtopic": "Tractor clutches and brakes",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Elements of Agricultural Engineering (Jagdishwar Sahay)",
    "question": "In a modern agricultural tractor equipped with a dual clutch mechanism:",
    "options": {
      "A": "Depressing the clutch pedal halfway disengages transmission drive while keeping the PTO shaft powered; depressing it fully disengages both transmission and PTO drives",
      "B": "One clutch steers the left wheel while the other steers the right wheel",
      "C": "Both clutch discs are permanently locked together without disengagement",
      "D": "The PTO can only be engaged while the tractor is travelling at top speed"
    },
    "correct_answer": "A",
    "solution": "A dual clutch features two separate concentric clutch discs. Depressing the foot pedal halfway releases the transmission friction disc, halting forward ground motion while the independent PTO disc remains engaged (essential for clearing balers or rotavators). Full pedal travel disengages both drives.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_064",
    "section": "Section 3: Farm Power",
    "topic": "Tractors and Power Tillers",
    "subtopic": "Power transmission systems – gear trains, differential, final drives and power take-off",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)",
    "question": "A tractor engine operates at $N_{\\text{eng}} = 2000\\text{ rpm}$. The transmission drivetrain has a selected gearbox reduction ratio of $3.5:1$, a differential crown wheel-to-pinion reduction ratio of $4.0:1$, and a planetary final drive reduction ratio of $3.0:1$. The rear drive tires have an effective rolling radius of $r = 0.70\\text{ m}$. Assuming zero wheel slip, the theoretical forward travel speed of the tractor in $\\text{km/h}$ is ________ (round off to 2 decimal places). Take $\\pi = 3.1416$.",
    "correct_answer": "12.57",
    "numerical_range": {
      "min": 12.45,
      "max": 12.7
    },
    "solution": "1. Overall drivetrain reduction ratio ($i$):\n$$i = 3.5 \\times 4.0 \\times 3.0 = 42.0$$\n2. Rotational speed of rear axle wheels ($N_{\\text{wheel}}$):\n$$N_{\\text{wheel}} = \\frac{2000}{42.0} \\approx 47.619\\text{ rpm}$$\n3. Forward travel speed ($v$):\n$$v = \\frac{2 \\pi r N_{\\text{wheel}} \\times 60}{1000} = \\frac{2 \\times 3.1416 \\times 0.70 \\times 47.619 \\times 60}{1000} = \\frac{12,566.4}{1000} \\approx 12.57\\text{ km/h}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FP_065",
    "section": "Section 3: Farm Power",
    "topic": "Tractors and Power Tillers",
    "subtopic": "Power transmission systems – gear trains, differential, final drives and power take-off",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. I (Ojha & Michael)",
    "question": "A tractor epicyclic planetary final drive unit has a stationary ring gear (annulus) with $Z_{\\text{ring}} = 64$ teeth, a rotating sun gear input with $Z_{\\text{sun}} = 16$ teeth, and planet gears supported on a planet carrier output connected to the wheel axle shaft. The speed reduction ratio ($N_{\\text{sun}}/N_{\\text{carrier}}$) of this planetary unit is ________ (answer in integer).",
    "correct_answer": "5",
    "numerical_range": {
      "min": 5,
      "max": 5
    },
    "solution": "For an epicyclic planetary gear set with fixed ring gear, the velocity ratio is given by:\n$$\\frac{N_{\\text{sun}}}{N_{\\text{carrier}}} = 1 + \\frac{Z_{\\text{ring}}}{Z_{\\text{sun}}}$$\nGiven $Z_{\\text{ring}} = 64$ and $Z_{\\text{sun}} = 16$:\n$$\\frac{N_{\\text{sun}}}{N_{\\text{carrier}}} = 1 + \\frac{64}{16} = 1 + 4 = 5$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_066",
    "section": "Section 3: Farm Power",
    "topic": "Tractors and Power Tillers",
    "subtopic": "Power transmission systems – gear trains, differential, final drives and power take-off",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Tractors and Their Power Units (Liljedahl et al.)",
    "question": "Which of the following statements regarding standard agricultural tractor Power Take-Off (PTO) shafts (ISO 500) is/are correct?",
    "options": {
      "A": "Type 1 standard PTO operates at $540 \\pm 10\\text{ rpm}$ with a $35\\text{ mm}$ (1-3/8 inch) nominal diameter shaft featuring 6 straight splines.",
      "B": "Type 2 standard PTO operates at $1000 \\pm 25\\text{ rpm}$ with a $35\\text{ mm}$ nominal diameter shaft featuring 21 involute splines.",
      "C": "Ground-speed PTO rotates at a speed strictly proportional to ground distance travelled, enabling synchronized operation for planting and sowing equipment.",
      "D": "A standard 540 rpm PTO shaft must always rotate counter-clockwise when viewed looking from behind the tractor."
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "• Standard 540 rpm PTO uses 6 splines and 35 mm diameter (A is correct).\n• 1000 rpm Type 2 PTO uses 21 involute splines and 35 mm diameter (B is correct).\n• Ground speed PTO locks revolutions to tire rotation (C is correct).\n• ISO 500 specifies clockwise rotation when viewed facing the rear of the tractor (D is false).",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_067",
    "section": "Section 3: Farm Power",
    "topic": "Tractors and Power Tillers",
    "subtopic": "Power transmission systems – gear trains, differential, final drives and power take-off",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Elements of Agricultural Engineering (Jagdishwar Sahay)",
    "question": "In tractor transmissions, a synchromesh gearbox differs fundamentally from a simple constant-mesh gearbox in that:",
    "options": {
      "A": "Synchromesh units incorporate conical brass friction synchronizer rings that equalize the rotational speeds of mating gears before engaging dog teeth, avoiding gear clash",
      "B": "Synchromesh gearboxes do not require any clutch pedal operation at all",
      "C": "Gears physically slide into and out of mesh on splined shafts",
      "D": "Synchromesh gearboxes eliminate the differential unit completely"
    },
    "correct_answer": "A",
    "solution": "Synchromesh transmissions use brass synchronizer cone clutches to bring mating components to identical rotational speeds before the mechanical sliding dog teeth lock into mesh, eliminating double-declutching and preventing gear tooth grinding.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_068",
    "section": "Section 3: Farm Power",
    "topic": "Tractors and Power Tillers",
    "subtopic": "Mechanics of tractor chassis",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Tractors and Their Power Units (Liljedahl et al.)",
    "question": "A 2WD tractor has a total static weight of $W = 29.43\\text{ kN}$ ($3000\\text{ kg}$). Its center of gravity is located at a horizontal distance of $x_1 = 1.30\\text{ m}$ forward of the rear axle centerline, and the wheelbase is $L = 2.10\\text{ m}$. A horizontal drawbar pull $P$ is applied at a hitch height of $h = 0.50\\text{ m}$ above ground. Assuming level ground and taking moments about the rear tire-ground contact point, the critical drawbar pull $P_{\\text{crit}}$ in $\\text{kN}$ that causes front wheel lift-off (tipping limit) is ________ (round off to 2 decimal places).",
    "correct_answer": "76.52",
    "numerical_range": {
      "min": 75.5,
      "max": 77.5
    },
    "solution": "1. For front wheel lift-off, the dynamic normal reaction on the front wheels drops to zero ($R_f = 0$).\n2. Taking moments about the rear wheel ground contact point:\n$$\\Sigma M_{\\text{rear}} = 0$$\n$$P_{\\text{crit}} \\times h = W \\times x_1$$\n$$P_{\\text{crit}} = \\frac{W \\times x_1}{h} = \\frac{29.43\\text{ kN} \\times 1.30\\text{ m}}{0.50\\text{ m}} = \\frac{38.259}{0.50} = 76.518\\text{ kN} \\approx 76.52\\text{ kN}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FP_069",
    "section": "Section 3: Farm Power",
    "topic": "Tractors and Power Tillers",
    "subtopic": "Mechanics of tractor chassis",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. I (Ojha & Michael)",
    "question": "A tractor has a total static weight of $W = 25.0\\text{ kN}$ and a wheelbase of $L = 2.00\\text{ m}$. When weighed on a level platform scale, the static reaction on the front axle is $W_{f0} = 8.75\\text{ kN}$. The horizontal distance from the rear axle centerline to the tractor center of gravity ($x_{cg}$) in $\\text{m}$ is ________ (round off to 2 decimal places).",
    "correct_answer": "0.70",
    "numerical_range": {
      "min": 0.69,
      "max": 0.71
    },
    "solution": "Taking moments about the rear axle centerline:\n$$W \\cdot x_{cg} = W_{f0} \\cdot L$$\n$$x_{cg} = \\frac{W_{f0} \\cdot L}{W} = \\frac{8.75\\text{ kN} \\times 2.00\\text{ m}}{25.0\\text{ kN}} = \\frac{17.50}{25.0} = 0.70\\text{ m}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_070",
    "section": "Section 3: Farm Power",
    "topic": "Tractors and Power Tillers",
    "subtopic": "Mechanics of tractor chassis",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)",
    "question": "A farm tractor has a rear wheel tread width of $b = 1.60\\text{ m}$ and its center of gravity is located on the vehicle centerline at a height of $h = 0.80\\text{ m}$ above ground. The tractor stands statically across a side hill slope of angle $\\alpha = 30^\\circ$. The proportion of total tractor weight carried by the downhill wheels ($R_{\\text{down}}/W$) is ________ (round off to 2 decimal places).",
    "correct_answer": "0.68",
    "numerical_range": {
      "min": 0.66,
      "max": 0.7
    },
    "solution": "1. Taking moments about the downhill wheel ground contact line:\n$$R_{\\text{up}} \\cdot b = W \\left( \\frac{b}{2} \\cos\\alpha - h \\sin\\alpha \\right)$$\n$$\\frac{R_{\\text{up}}}{W} = 0.5 \\cos(30^\\circ) - \\frac{h}{b} \\sin(30^\\circ) = (0.5 \\times 0.8660) - \\left(\\frac{0.80}{1.60} \\times 0.50\\right) = 0.4330 - 0.2500 = 0.1830$$\n2. Normal force on downhill wheels:\n$$\\frac{R_{\\text{down}}}{W} = \\cos(30^\\circ) - \\frac{R_{\\text{up}}}{W} = 0.8660 - 0.1830 = 0.6830 \\approx 0.68$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FP_071",
    "section": "Section 3: Farm Power",
    "topic": "Tractors and Power Tillers",
    "subtopic": "Mechanics of tractor chassis",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Tractors and Their Power Units (Liljedahl et al.)",
    "question": "When an agricultural tractor climbs an uphill slope while exerting a heavy drawbar pull, which of the following mechanical effects occur?",
    "options": {
      "A": "Dynamic normal load on the rear drive axle increases due to both the gravity slope component and drawbar pull weight transfer.",
      "B": "Dynamic load on the front steering axle decreases, reducing steering response and increasing the hazard of rearward tipping.",
      "C": "Rolling resistance of the front tires decreases due to the reduced front vertical ground reaction.",
      "D": "The center of gravity coordinates shift physically relative to the tractor chassis casting."
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "• Uphill slope angle and drawbar moment combine to unload front axle and load rear axle (A and B are correct).\n• Reduced front vertical reaction directly reduces front wheel rolling resistance ($R_r = \\mu W_f$) (C is correct).\n• The center of gravity is an intrinsic physical property fixed relative to the tractor metal chassis (D is false).",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_072",
    "section": "Section 3: Farm Power",
    "topic": "Tractors and Power Tillers",
    "subtopic": "Traction theory",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)",
    "question": "A tractor drive tire of overall unloaded diameter $d = 1.40\\text{ m}$ and section width $b = 0.45\\text{ m}$ carries a dynamic vertical wheel load of $W = 12.0\\text{ kN}$. The tilled soil has a cone index of $CI = 800\\text{ kPa}$ ($800\\text{ kN/m}^2$). According to the Wismer & Luth traction model, the dimensionless wheel numeric (mobility number $C_n = \\frac{CI \\cdot b \\cdot d}{W}$) is ________ (answer in integer).",
    "correct_answer": "42",
    "numerical_range": {
      "min": 42,
      "max": 42
    },
    "solution": "The dimensionless wheel numeric $C_n$ in the Wismer & Luth model is:\n$$C_n = \\frac{CI \\cdot b \\cdot d}{W}$$\nGiven $CI = 800\\text{ kN/m}^2$, $b = 0.45\\text{ m}$, $d = 1.40\\text{ m}$, and $W = 12.0\\text{ kN}$:\n$$C_n = \\frac{800 \\times 0.45 \\times 1.40}{12.0} = \\frac{504}{12.0} = 42$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_073",
    "section": "Section 3: Farm Power",
    "topic": "Tractors and Power Tillers",
    "subtopic": "Traction theory",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Tractors and Their Power Units (Liljedahl et al.)",
    "question": "Using the Wismer & Luth empirical equation for motion resistance ratio $\\rho$ of a wheeled agricultural drive tire in cohesive soil:\n$$\\rho = \\frac{R}{W} = \\frac{1.2}{C_n} + 0.04$$\nIf the wheel numeric is $C_n = 20.0$ and the dynamic wheel load is $W = 15.0\\text{ kN}$, the motion resistance force $R$ in $\\text{kN}$ is ________ (answer in integer).",
    "correct_answer": "1.5",
    "numerical_range": {
      "min": 1.48,
      "max": 1.52
    },
    "solution": "1. Motion resistance ratio ($\\rho$):\n$$\\rho = \\frac{1.2}{20.0} + 0.04 = 0.06 + 0.04 = 0.10$$\n2. Motion resistance force ($R$):\n$$R = \\rho \\times W = 0.10 \\times 15.0\\text{ kN} = 1.5\\text{ kN}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_074",
    "section": "Section 3: Farm Power",
    "topic": "Tractors and Power Tillers",
    "subtopic": "Traction theory",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Principles of Agricultural Engg. Vol. I (Ojha & Michael)",
    "question": "For maximum tractive efficiency and optimal fuel economy on tilled agricultural soils, the recommended operational wheel slip range is:",
    "options": {
      "A": "$10\\% - 15\\%$ for 2WD tractors, and $8\\% - 12\\%$ for 4WD tractors",
      "B": "$0\\% - 2\\%$ for all tractors",
      "C": "$35\\% - 50\\%$",
      "D": "Greater than $60\\%$"
    },
    "correct_answer": "A",
    "solution": "Tractive efficiency curves show that at very low slip (<5%), rolling resistance dominates, while at high slip (>20%), energy wasted in soil churning escalates. The peak of tractive efficiency occurs at 10–15% slip for 2WD tractors and 8–12% for 4WD tractors on firm-to-tilled agricultural fields.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_075",
    "section": "Section 3: Farm Power",
    "topic": "Tractors and Power Tillers",
    "subtopic": "Traction theory",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Elements of Agricultural Engineering (Jagdishwar Sahay)",
    "question": "Which of the following statements regarding the ASABE standard soil cone penetrometer (ASABE S313) is/are correct?",
    "options": {
      "A": "The standard stainless steel cone has an apex angle of $30^\\circ$.",
      "B": "The Cone Index (CI) is the penetration force divided by the projected circular base area of the cone, expressed in kPa.",
      "C": "The Remolded Cone Index (RCI) measures the capacity of soil to maintain tractive strength under repetitive wheel passes.",
      "D": "Cone Index is completely unaffected by soil moisture content and dry bulk density."
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "• Standard penetrometer cone has a $30^\\circ$ apex angle (A is correct).\n• CI is defined as penetration force per unit base area ($N/m^2 = Pa$) (B is correct).\n• RCI assesses soil strength deterioration under cyclical compaction (C is correct).\n• CI is highly sensitive to soil moisture and bulk density (D is false).",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_076",
    "section": "Section 3: Farm Power",
    "topic": "Tractors and Power Tillers",
    "subtopic": "Three point hitches – free link and restrained link operations",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Tractors and Their Power Units (Liljedahl et al.)",
    "question": "In a tractor three-point linkage operating in 'restrained-link' mode (such as a mounted mouldboard plough supported by hydraulic draft control):",
    "options": {
      "A": "Implement vertical soil forces and weight are dynamically resisted by the tractor hydraulic lift cylinder, enabling continuous weight transfer to the tractor drive wheels",
      "B": "The implement floats entirely on its own wheels without hydraulic support",
      "C": "The lower links are disconnected from the tractor rockshaft",
      "D": "Zero weight transfer occurs between implement and tractor"
    },
    "correct_answer": "A",
    "solution": "In restrained-link operation, the tractor hydraulic system continuously supports vertical forces acting on the implement. This force balance allows dynamic transfer of implement mass and downward soil forces to the tractor rear axle, increasing traction and cutting wheel slip.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_077",
    "section": "Section 3: Farm Power",
    "topic": "Tractors and Power Tillers",
    "subtopic": "Three point hitches – free link and restrained link operations",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. I (Ojha & Michael)",
    "question": "In the standard classification of agricultural three-point linkages (ISO 730 / IS 4468), which of the following statements is/are correct?",
    "options": {
      "A": "Category 1 (Cat I) is rated for tractors up to $35\\text{ kW}$ (approx. $48\\text{ hp}$) with lower hitch pin diameter of $22.4\\text{ mm}$.",
      "B": "Category 2 (Cat II) is rated for tractors from $30\\text{ to } 92\\text{ kW}$ (approx. $40\\text{ to } 125\\text{ hp}$) with lower hitch pin diameter of $28.7\\text{ mm}$.",
      "C": "The top link hitch pin diameter is smaller than the lower link hitch pin diameter across all standard ISO categories.",
      "D": "Category 4 hitches are designed specifically for two-wheel walk-behind power tillers."
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "• Cat 1: up to 35 kW, lower pin 22.4 mm, upper pin 19.0 mm (A is correct).\n• Cat 2: 30–92 kW, lower pin 28.7 mm, upper pin 25.4 mm (B is correct).\n• Upper link pin is always smaller than lower link pins across Cat 1, 2, 3, 4 (C is correct).\n• Category 4 is for massive 4WD tractors exceeding 135 kW, not power tillers (D is false).",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FP_078",
    "section": "Section 3: Farm Power",
    "topic": "Tractors and Power Tillers",
    "subtopic": "Three point hitches – free link and restrained link operations",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Elements of Agricultural Engineering (Jagdishwar Sahay)",
    "question": "For which of the following field operations is 'Position Control' of the tractor hydraulic lift system exclusively recommended over 'Draft Control'?",
    "options": {
      "A": "Operating a rear-mounted rotary tiller (rotavator) or broadcast fertilizer spreader at a fixed height above the ground",
      "B": "Deep plowing with a mouldboard plough in undulating terrain",
      "C": "Subsoiling hard clay soil hardpan",
      "D": "Chisel plowing to break hardpan at maximum soil resistance"
    },
    "correct_answer": "A",
    "solution": "Position control locks the implement at a fixed vertical height relative to the tractor chassis. It is strictly required for above-ground implements (fertilizer broadcasters, spray booms, mowers) and rotary tillers, where draft fluctuations must not alter cutting depth.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_079",
    "section": "Section 3: Farm Power",
    "topic": "Tractors and Power Tillers",
    "subtopic": "Three point hitches – free link and restrained link operations",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Tractors and Their Power Units (Liljedahl et al.)",
    "question": "A fully-mounted mouldboard plough has a weight of $W_i = 6.0\\text{ kN}$ with its center of gravity located $1.20\\text{ m}$ behind the tractor rear axle. During plowing, the horizontal soil draft is $D = 12.0\\text{ kN}$ acting at a depth of $0.20\\text{ m}$ below ground level. The tractor wheelbase is $L = 2.00\\text{ m}$. Under draft control operation, the total dynamic weight added to the rear drive axle ($R_{r,\\text{add}} = W_i \\frac{L + 1.20}{L} + D \\frac{h_d}{L}$ with $h_d = 0.20\\text{ m}$) in $\\text{kN}$ is ________ (round off to 2 decimal places).",
    "correct_answer": "10.80",
    "numerical_range": {
      "min": 10.6,
      "max": 11
    },
    "solution": "1. Weight transfer due to implement overhang:\n$$\\Delta W_{\\text{overhang}} = W_i \\times \\frac{L + 1.20}{L} = 6.0 \\times \\frac{2.00 + 1.20}{2.00} = 6.0 \\times 1.60 = 9.60\\text{ kN}$$\n2. Weight transfer due to horizontal draft moment:\n$$\\Delta W_{\\text{draft}} = D \\times \\frac{h_d}{L} = 12.0 \\times \\frac{0.20}{2.00} = 1.20\\text{ kN}$$\n3. Total dynamic weight added to rear axle:\n$$R_{r,\\text{add}} = 9.60 + 1.20 = 10.80\\text{ kN}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FP_080",
    "section": "Section 3: Farm Power",
    "topic": "Tractors and Power Tillers",
    "subtopic": "Steering and hydraulic control systems used in tractors",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)",
    "question": "An agricultural tractor has a wheelbase of $l = 2.10\\text{ m}$ and a front wheel track width of $w = 1.30\\text{ m}$. When making a tight headland turn, the inner front steering wheel turns through an angle of $\\theta_i = 35^\\circ$. According to the ideal Ackermann steering condition ($\\cot\\theta_o - \\cot\\theta_i = \\frac{w}{l}$), the ideal steering angle of the outer front wheel $\\theta_o$ in degrees is ________ (round off to 1 decimal place).",
    "correct_answer": "26.0",
    "numerical_range": {
      "min": 25.7,
      "max": 26.3
    },
    "solution": "1. Ackermann steering equation:\n$$\\cot\\theta_o - \\cot\\theta_i = \\frac{w}{l}$$\n2. Calculate terms:\n$$\\cot(35^\\circ) = \\frac{1}{\\tan(35^\\circ)} = \\frac{1}{0.700208} \\approx 1.42815$$\n$$\\frac{w}{l} = \\frac{1.30}{2.10} \\approx 0.61905$$\n$$\\cot\\theta_o = 1.42815 + 0.61905 = 2.04720$$\n$$\\tan\\theta_o = \\frac{1}{2.04720} \\approx 0.48847$$\n$$\\theta_o = \\arctan(0.48847) \\approx 26.03^\\circ \\approx 26.0^\\circ$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FP_081",
    "section": "Section 3: Farm Power",
    "topic": "Tractors and Power Tillers",
    "subtopic": "Steering and hydraulic control systems used in tractors",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. I (Ojha & Michael)",
    "question": "An agricultural tractor has a wheelbase of $L = 2.20\\text{ m}$ and a rear wheel track width of $B = 1.50\\text{ m}$. When turning with the inner rear wheel completely locked by its independent steering brake, assuming pivot rotation about the center of the inner rear tire, the turning radius from the pivot point to the outer front wheel ($R = \\sqrt{L^2 + B^2}$) in $\\text{m}$ is ________ (round off to 2 decimal places).",
    "correct_answer": "2.66",
    "numerical_range": {
      "min": 2.62,
      "max": 2.7
    },
    "solution": "With the inner rear wheel locked, the center of turn coincides with the inner wheel ground contact point:\n$$R = \\sqrt{L^2 + B^2} = \\sqrt{2.20^2 + 1.50^2} = \\sqrt{4.84 + 2.25} = \\sqrt{7.09} \\approx 2.6627\\text{ m} \\approx 2.66\\text{ m}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_082",
    "section": "Section 3: Farm Power",
    "topic": "Tractors and Power Tillers",
    "subtopic": "Steering and hydraulic control systems used in tractors",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Tractors and Their Power Units (Liljedahl et al.)",
    "question": "Which of the following statements comparing open-center and closed-center load-sensing (CCLS) hydraulic systems in farm tractors is/are correct?",
    "options": {
      "A": "In an open-center system, a fixed displacement pump continuously circulates hydraulic fluid at low pressure through neutral open spool valves back to the reservoir when no actuators are operating.",
      "B": "In a closed-center load-sensing system, a variable displacement pump delivers near-zero flow at high standby pressure when control valves are in neutral, saving substantial engine power.",
      "C": "Closed-center systems can supply multiple hydraulic actuators simultaneously with load-independent flow sharing.",
      "D": "Open-center hydraulic systems strictly require expensive variable axial piston pumps."
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "• Open-center circuits pump fluid continuously through open valves at low pressure (A is correct).\n• CCLS systems use variable displacement swashplate pumps to eliminate neutral throttling heat (B and C are correct).\n• Open-center circuits use simple fixed gear pumps, not expensive variable piston pumps (D is false).",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_FP_083",
    "section": "Section 3: Farm Power",
    "topic": "Tractors and Power Tillers",
    "subtopic": "Steering and hydraulic control systems used in tractors",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Elements of Agricultural Engineering (Jagdishwar Sahay)",
    "question": "In tractor hydrostatic power steering systems incorporating an 'Orbitrol' steering control unit:",
    "options": {
      "A": "The steering unit functions as a rotary metering valve during powered operation and automatically operates as a manual hand pump to provide emergency steering if the engine dies",
      "B": "Mechanical drag links physically connect the steering column to the front kingpins with zero hydraulic assist",
      "C": "The steering wheel is mechanically locked to the engine camshaft",
      "D": "Turning is executed exclusively by pulsing the rear axle brakes"
    },
    "correct_answer": "A",
    "solution": "The Orbitrol hydrostatic steering unit eliminates mechanical linkages between steering wheel and axle. It metered hydraulic fluid to steering cylinders, and contains check valves enabling the gerotor unit to act as a manual hand pump for emergency manual control if hydraulic pressure fails.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_084",
    "section": "Section 3: Farm Power",
    "topic": "Tractors and Power Tillers",
    "subtopic": "Tractor tests and performance",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. I (Ojha & Michael)",
    "question": "Which of the following performance tests are mandatory standard procedures under official tractor testing codes (such as BIS 12207, OECD Code 2, or Nebraska Tractor Tests)?",
    "options": {
      "A": "PTO performance test across full engine speed range to determine maximum power, rated power, torque, and specific fuel consumption.",
      "B": "Drawbar pull and drawbar power test on a standardized concrete test track to measure tractive efficiency and maximum pull.",
      "C": "Hydraulic lift capacity test throughout the full travel range of the three-point linkage.",
      "D": "Continuous sound level measurement at the operator's ear with cab and open roll-bar."
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "All four tests represent official core mandates of BIS 12207, OECD Standard Codes, and Nebraska tractor test protocols to verify power delivery, drawbar pull, hydraulic capacity, and operator acoustic safety.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_085",
    "section": "Section 3: Farm Power",
    "topic": "Tractors and Power Tillers",
    "subtopic": "Tractor tests and performance",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Elements of Agricultural Engineering (Jagdishwar Sahay)",
    "question": "When liquid ballasting tractor rear drive tires to enhance tractive effort and reduce wheel slip in heavy plowing:",
    "options": {
      "A": "Tires are filled to approximately 75% of volume (level with valve stem in 12 o'clock position) with a solution of water and calcium chloride ($CaCl_2$) to prevent freezing and add density",
      "B": "Tires are filled to 100% volume with pure engine oil",
      "C": "Liquid ballast is applied exclusively to front steering tires",
      "D": "Liquid ballast increases tire slip on firm agricultural soils"
    },
    "correct_answer": "A",
    "solution": "Agricultural tires are liquid ballasted up to 75% of volume (covering the rim for rust prevention while leaving a 25% air cushion for tire compliance). Calcium chloride ($CaCl_2$) adds ~25% more weight per unit volume than water and prevents freezing down to sub-zero temperatures.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_086",
    "section": "Section 3: Farm Power",
    "topic": "Tractors and Power Tillers",
    "subtopic": "Tractor tests and performance",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)",
    "question": "In a tractor official test, the engine delivers $P_{\\text{pto}} = 50.0\\text{ kW}$ at rated speed through the PTO shaft. When tested on a standardized concrete track in the drawbar pull test, the maximum drawbar power measured is $P_{\\text{db}} = 42.5\\text{ kW}$. The drawbar-to-PTO power delivery ratio expressed in percentage is ________ (answer in integer).",
    "correct_answer": "85",
    "numerical_range": {
      "min": 85,
      "max": 85
    },
    "solution": "The drawbar-to-PTO power ratio is:\n$$\\text{Ratio} = \\frac{P_{\\text{db}}}{P_{\\text{pto}}} \\times 100 = \\frac{42.5\\text{ kW}}{50.0\\text{ kW}} \\times 100 = 85\\%$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_087",
    "section": "Section 3: Farm Power",
    "topic": "Tractors and Power Tillers",
    "subtopic": "Human engineering and safety considerations in design of tractor and agricultural implements",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Tractors and Their Power Units (Liljedahl et al.)",
    "question": "According to the OECD Standard Code 4 for official testing of tractor Roll-Over Protective Structures (ROPS), the minimum energy requirement ($E$) to be absorbed during the lateral side loading test for a tractor of reference mass $M = 3000\\text{ kg}$ is given by:\n$$E = 1.4 \\times M\\text{ Joules}$$\nThe required lateral energy absorption capacity of the ROPS in $\\text{kJ}$ is ________ (round off to 1 decimal place).",
    "correct_answer": "4.2",
    "numerical_range": {
      "min": 4.1,
      "max": 4.3
    },
    "solution": "1. Energy formula from OECD Code 4:\n$$E = 1.4 \\times M = 1.4 \\times 3000 = 4200\\text{ J}$$\n2. Convert to $\\text{kJ}$:\n$$E = \\frac{4200\\text{ J}}{1000} = 4.2\\text{ kJ}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_088",
    "section": "Section 3: Farm Power",
    "topic": "Tractors and Power Tillers",
    "subtopic": "Human engineering and safety considerations in design of tractor and agricultural implements",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Principles of Agricultural Engg. Vol. I (Ojha & Michael)",
    "question": "In tractor ergonomics and human whole-body vibration studies (ISO 2631-1), the seated human body exhibits maximum biological resonance and fatigue sensitivity to vertical vibrations in the frequency range of:",
    "options": {
      "A": "$4 - 8\\text{ Hz}$ (due to resonance of internal visceral organs and spinal column)",
      "B": "$50 - 100\\text{ Hz}$",
      "C": "$500 - 1000\\text{ Hz}$",
      "D": "$0.01 - 0.05\\text{ Hz}$"
    },
    "correct_answer": "A",
    "solution": "Under ISO 2631-1, vertical z-axis vibrations in the 4 to 8 Hz frequency band coincide with natural resonance of the human spine and thorax-abdomen system, leading to spinal disc compression, operator fatigue, and musculoskeletal disorders.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_089",
    "section": "Section 3: Farm Power",
    "topic": "Tractors and Power Tillers",
    "subtopic": "Human engineering and safety considerations in design of tractor and agricultural implements",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Elements of Agricultural Engineering (Jagdishwar Sahay)",
    "question": "According to international occupational safety standards (OSHA / ISO), the permissible continuous acoustic noise exposure limit at the tractor operator station for an un-protected 8-hour workday is:",
    "options": {
      "A": "$85 - 90\\text{ dB(A)}$",
      "B": "$115 - 120\\text{ dB(A)}$",
      "C": "$40 - 45\\text{ dB(A)}$",
      "D": "$140\\text{ dB(A)}$"
    },
    "correct_answer": "A",
    "solution": "OSHA Standard 1910.95 and ISO occupational safety directives set the action level for an 8-hour Time-Weighted Average (TWA) noise exposure at 85 dB(A) and the maximum permissible exposure limit at 90 dB(A) before mandatory hearing protection is enforced.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_090",
    "section": "Section 3: Farm Power",
    "topic": "Tractors and Power Tillers",
    "subtopic": "Human engineering and safety considerations in design of tractor and agricultural implements",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Tractors and Their Power Units (Liljedahl et al.)",
    "question": "Which of the following ergonomic design principles are specified for agricultural tractor operator workstations (BIS 10702 / ISO 4253)?",
    "options": {
      "A": "The Seat Index Point (SIP) serves as the primary dimensional reference coordinate for locating steering, pedals, and hand controls within standard human reach envelopes.",
      "B": "Pedal operating forces for clutch and service brakes should remain within comfortable physiological limits (typically $< 300 - 450\\text{ N}$).",
      "C": "Critical emergency controls (such as the engine emergency shut-down and PTO disengagement) must be visually distinct and readily accessible.",
      "D": "The operator enclosure must provide adequate line-of-sight visibility to front wheels and rear-attached implements."
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "All four guidelines are standard ergonomic criteria in BIS 10702 and ISO 4253:\n• SIP defines control spatial envelopes.\n• Pedal effort limits prevent muscular strain.\n• Emergency controls must be prominent and instantly reachable.\n• Line-of-sight visibility is mandatory for operational safety and implement tracking.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_FP_091",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "I.C. engine cycles",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Jagdishwar Sahay - Elements of Agricultural Engineering",
    "question": "An air-standard Diesel cycle has a compression ratio of $16$ and a cut-off ratio of $2.0$. Taking the adiabatic index $\\gamma = 1.4$, calculate the air-standard thermal efficiency of the cycle in percentage.",
    "solution": "Air-standard efficiency of Diesel cycle:\n$$\\eta_{\\text{th}} = 1 - \\frac{1}{r^{\\gamma - 1}} \\left[ \\frac{r_c^\\gamma - 1}{\\gamma(r_c - 1)} \\right]$$\nWhere:\n- Compression ratio $r = 16$\n- Cut-off ratio $r_c = 2.0$\n- $\\gamma = 1.4$\n\nCalculating terms:\n$$r^{\\gamma - 1} = 16^{0.4} = 3.0314$$\n$$r_c^\\gamma = 2^{1.4} = 2.6390$$\n$$\\frac{r_c^\\gamma - 1}{\\gamma(r_c - 1)} = \\frac{2.6390 - 1}{1.4(2 - 1)} = \\frac{1.6390}{1.4} = 1.1707$$\n$$\\eta_{\\text{th}} = 1 - \\frac{1}{3.0314} \\times 1.1707 = 1 - 0.3862 = 0.6138 = 61.38\\%$$",
    "difficulty": "Moderate",
    "correct_answer": 61.38,
    "answer": 61.38,
    "numerical_range": {
      "min": 61,
      "max": 62
    }
  },
  {
    "id": "QB_FP_092",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Calculation of power, torque, fuel consumption, heat load and power losses",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Jagdishwar Sahay - Elements of Agricultural Engineering",
    "question": "A 4-cylinder, 4-stroke diesel engine with bore $100\\text{ mm}$ and stroke $120\\text{ mm}$ runs at $2000\\text{ rpm}$. The mean effective pressure during test is $750\\text{ kPa}$. Calculate the indicated power of the engine in $\\text{kW}$.",
    "solution": "Given:\n- Bore $D = 0.10\\text{ m}$\n- Piston area $A = \\frac{\\pi}{4} D^2 = \\frac{\\pi}{4} (0.1)^2 = 0.007854\\text{ m}^2$\n- Stroke $L = 0.12\\text{ m}$\n- Mean effective pressure $P_m = 750\\text{ kPa} = 750 \\times 10^3\\text{ N/m}^2$\n- Speed $N = 2000\\text{ rpm}$\n- Power strokes per min $n = N/2 = 1000\\text{ strokes/min} = \\frac{1000}{60}\\text{ strokes/s}$\n- Number of cylinders $k = 4$\n\nIndicated Power ($IP$):\n$$IP = \\frac{P_m \\times L \\times A \\times n \\times k}{1000} = \\frac{750 \\times 0.12 \\times 0.007854 \\times (1000/60) \\times 4}{1} \\approx 47.124\\text{ kW}$$",
    "difficulty": "Moderate",
    "correct_answer": 47.12,
    "answer": 47.12,
    "numerical_range": {
      "min": 46.5,
      "max": 47.5
    }
  },
  {
    "id": "QB_FP_093",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Calculation of power, torque, fuel consumption, heat load and power losses",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar - Numerical Approach to Agricultural Engineering",
    "question": "During a brake test on a diesel engine, the brake torque is $180\\text{ N}\\cdot\\text{m}$ at an engine speed of $1800\\text{ rpm}$. The engine consumes diesel of density $840\\text{ kg/m}^3$ at the rate of $7.5\\text{ L/h}$. If the lower calorific value of diesel is $42.5\\text{ MJ/kg}$, calculate the brake thermal efficiency of the engine in percentage.",
    "solution": "Brake power ($BP$):\n$$BP = \\frac{2 \\pi N T}{60000} = \\frac{2 \\pi \\times 1800 \\times 180}{60000} = \\frac{2035752}{60000} = 33.93\\text{ kW}$$\n\nMass flow rate of fuel ($m_f$):\n$$m_f = \\frac{7.5\\text{ L/h} \\times 0.84\\text{ kg/L}}{3600\\text{ s/h}} = \\frac{6.30\\text{ kg/h}}{3600} = 0.00175\\text{ kg/s}$$\n\nHeat supplied ($Q_{\\text{in}}$):\n$$Q_{\\text{in}} = m_f \\times LCV = 0.00175\\text{ kg/s} \\times 42500\\text{ kJ/kg} = 74.375\\text{ kW}$$\n\nBrake thermal efficiency:\n$$\\eta_{\\text{bth}} = \\frac{BP}{Q_{\\text{in}}} \\times 100 = \\frac{33.93}{74.375} \\times 100 = 45.62\\%$$\n(With precise constants: $45.45\\%$ to $45.65\\%$).",
    "difficulty": "Moderate",
    "correct_answer": 45.45,
    "answer": 45.45,
    "numerical_range": {
      "min": 45,
      "max": 46
    }
  },
  {
    "id": "QB_FP_094",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Mechanics of tractor chassis",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Liljedahl - Tractors and Their Power Units",
    "question": "A two-wheel drive tractor has a total weight of $24\\text{ kN}$ with a wheelbase of $2.0\\text{ m}$. In static condition on level ground, the center of gravity is located $0.7\\text{ m}$ ahead of the rear axle centerline and $0.8\\text{ m}$ above ground. If the tractor develops a horizontal drawbar pull of $8.0\\text{ kN}$ at a hitch height of $0.4\\text{ m}$, calculate the dynamic reaction on the rear axle in $\\text{kN}$.",
    "solution": "Taking moments about the front wheel ground contact point to find dynamic rear reaction $R_r$:\n$$R_r \\times x_w = W \\times (x_w - x_r) + P \\times y_h$$\nWhere:\n- Total weight $W = 24\\text{ kN}$\n- Wheelbase $x_w = 2.0\\text{ m}$\n- Distance of CG from rear axle $x_r = 0.7\\text{ m}$, so distance from front axle is $(2.0 - 0.7) = 1.3\\text{ m}$\n- Drawbar pull $P = 8.0\\text{ kN}$\n- Hitch height $y_h = 0.4\\text{ m}$\n\nStatic rear reaction:\n$$R_{rs} = W \\times \\frac{x_w - x_r}{x_w} = 24 \\times \\frac{1.3}{2.0} = 15.6\\text{ kN}$$\nDynamic weight transfer to rear:\n$$\\Delta W = \\frac{P \\times y_h}{x_w} = \\frac{8.0 \\times 0.4}{2.0} = 1.6\\text{ kN}$$\nDynamic rear axle reaction:\n$$R_r = R_{rs} + \\Delta W = 15.6 + 1.6 = 17.2\\text{ kN}$$",
    "difficulty": "Moderate",
    "correct_answer": 17.2,
    "answer": 17.2,
    "numerical_range": {
      "min": 17,
      "max": 17.4
    }
  },
  {
    "id": "QB_FP_095",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Mechanics of tractor chassis",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Liljedahl - Tractors and Their Power Units",
    "question": "During heavy drawbar pulling on level ground, backward overturning of a 2WD agricultural tractor will occur when the dynamic normal reaction on the front wheels becomes:",
    "solution": "Backward overturning or front-wheel rearing occurs when the dynamic weight transfer from front to rear equals the static front axle weight, causing the front normal reaction $R_f$ to drop to zero.",
    "difficulty": "Moderate",
    "options": {
      "A": "Equal to total tractor weight",
      "B": "Zero",
      "C": "Half of the static rear axle load",
      "D": "Equal to the drawbar pull"
    },
    "correct_answer": "B",
    "answer": "B"
  },
  {
    "id": "QB_FP_096",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Traction theory",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Liljedahl - Tractors and Their Power Units",
    "question": "A tractor drive tire rotates at $30\\text{ rpm}$ with a rolling radius of $0.75\\text{ m}$. The actual forward travel speed of the tractor measured over a $50\\text{ m}$ run is $2.0\\text{ m/s}$. Calculate the travel reduction (wheel slip) in percentage.",
    "solution": "Theoretical forward velocity without slip:\n$$v_t = \\omega \\times r = \\frac{2 \\pi N}{60} \\times r = \\frac{2 \\pi \\times 30}{60} \\times 0.75 = \\pi \\times 0.75 = 2.3562\\text{ m/s}$$\nActual velocity:\n$$v_a = 2.0\\text{ m/s}$$\nWheel slip ($s$):\n$$s = \\frac{v_t - v_a}{v_t} \\times 100 = \\frac{2.3562 - 2.0}{2.3562} \\times 100 = \\frac{0.3562}{2.3562} \\times 100 = 15.12\\%$$",
    "difficulty": "Moderate",
    "correct_answer": 15.12,
    "answer": 15.12,
    "numerical_range": {
      "min": 14.8,
      "max": 15.4
    }
  },
  {
    "id": "QB_FP_097",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Power transmission systems – gear trains, differential, final drives and power take-off",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Jagdishwar Sahay - Elements of Agricultural Engineering",
    "question": "A tractor transmission has an engine speed of $1800\\text{ rpm}$. The gear ratios are: primary gearbox reduction $3.2 : 1$, bevel differential pinion-crown reduction $4.0 : 1$, and planetary final drive reduction $3.5 : 1$. If the drive wheel rolling radius is $0.70\\text{ m}$, calculate the forward speed of the tractor in $\\text{km/h}$.",
    "solution": "Total overall reduction ratio:\n$$G = 3.2 \\times 4.0 \\times 3.5 = 44.8$$\nDrive axle rotational speed:\n$$N_{\\text{axle}} = \\frac{N_{\\text{engine}}}{G} = \\frac{1800}{44.8} = 40.1786\\text{ rpm}$$\nForward speed $v$:\n$$v = \\frac{2 \\pi N_{\\text{axle}} r}{60} = \\frac{2 \\pi \\times 40.1786 \\times 0.70}{60} = 2.945\\text{ m/s}$$\nIn $\\text{km/h}$:\n$$S = 2.945 \\times 3.6 = 10.60\\text{ km/h}$$",
    "difficulty": "Moderate",
    "correct_answer": 10.55,
    "answer": 10.55,
    "numerical_range": {
      "min": 10.3,
      "max": 10.7
    }
  },
  {
    "id": "QB_FP_098",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Power transmission systems – gear trains, differential, final drives and power take-off",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Jagdishwar Sahay - Elements of Agricultural Engineering",
    "question": "The standard power take-off (PTO) shaft Type-1 according to ASAE/BIS standards has 6 splines and operates at a standard rated speed of:",
    "solution": "The standard Type 1 PTO shaft has 6 splines with $35\\text{ mm}$ ($1\\frac{3}{8}\"$) diameter and rotates at $540 \\pm 10\\text{ rpm}$. Type 2 PTO has 21 splines and operates at $1000\\text{ rpm}$.",
    "difficulty": "Moderate",
    "options": {
      "A": "$1000 \\pm 25\\text{ rpm}$",
      "B": "$540 \\pm 10\\text{ rpm}$",
      "C": "$720 \\pm 15\\text{ rpm}$",
      "D": "$1440 \\pm 20\\text{ rpm}$"
    },
    "correct_answer": "B",
    "answer": "B"
  },
  {
    "id": "QB_FP_099",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Tractor clutches and brakes",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Jagdishwar Sahay - Elements of Agricultural Engineering",
    "question": "A single plate dry friction clutch has two active friction surfaces with inner radius $100\\text{ mm}$ and outer radius $150\\text{ mm}$. The clamping spring provides an axial thrust of $2.5\\text{ kN}$. If the coefficient of friction is $0.35$ and uniform wear theory is assumed, calculate the torque transmitting capacity of the clutch in $\\text{N}\\cdot\\text{m}$.",
    "solution": "Under uniform wear theory, the mean friction radius is:\n$$R_m = \\frac{r_1 + r_2}{2} = \\frac{0.15 + 0.10}{2} = 0.125\\text{ m}$$\nFriction surfaces $n = 2$.\nTotal torque capacity:\n$$T = n \\times \\mu \\times W \\times R_m = 2 \\times 0.35 \\times 2500\\text{ N} \\times 0.125\\text{ m} = 218.75\\text{ N}\\cdot\\text{m}$$",
    "difficulty": "Moderate",
    "correct_answer": 218.75,
    "answer": 218.75,
    "numerical_range": {
      "min": 216,
      "max": 220
    }
  },
  {
    "id": "QB_FP_100",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Fuels and combustion",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Ganesan - Internal Combustion Engines",
    "question": "A diesel fuel has a chemical mass composition of $86\\%$ Carbon ($C$) and $14\\%$ Hydrogen ($H$). Calculate the stoichiometric (theoretical) mass of air required in $\\text{kg}$ for complete combustion of $1\\text{ kg}$ of this fuel. (Air contains $23\\%$ Oxygen by mass)",
    "solution": "Theoretical oxygen required per kg fuel:\n$$O_2 = \\left( \\frac{32}{12} \\times C \\right) + (8 \\times H) = \\left( \\frac{8}{3} \\times 0.86 \\right) + (8 \\times 0.14)$$\n$$O_2 = 2.2933 + 1.120 = 3.4133\\text{ kg of } O_2$$\nSince air contains $23\\%$ oxygen by mass:\n$$\\text{Air required} = \\frac{3.4133}{0.23} \\approx 14.84\\text{ kg}$$\n(Using standard 23.2% gives 14.71 kg; range 14.5 to 14.9 kg).",
    "difficulty": "Moderate",
    "correct_answer": 14.78,
    "answer": 14.78,
    "numerical_range": {
      "min": 14.5,
      "max": 14.9
    }
  },
  {
    "id": "QB_FP_101",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Thermodynamic principles of I.C. engines",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Ganesan - Internal Combustion Engines",
    "question": "Which of the following factors increase the tendency of abnormal knocking / detonation in a Compression Ignition (CI / Diesel) engine?",
    "solution": "- In CI engines, knocking occurs due to rapid pressure rise from fuel accumulating during a long ignition delay period.\n- Low cetane fuel has longer ignition delay, worsening knock.\n- Low compression ratio reduces end-of-compression temperature and pressure, increasing ignition delay and knock.\n- High intake air temperature and swirl promote rapid auto-ignition, reducing delay and knock.",
    "difficulty": "Moderate",
    "options": {
      "A": "Long ignition delay period",
      "B": "Low cetane number of the diesel fuel",
      "C": "Low compression ratio",
      "D": "High inlet air temperature and intake swirl"
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
    "id": "QB_FP_102",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Calculation of power, torque, fuel consumption, heat load and power losses",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Ganesan - Internal Combustion Engines",
    "question": "In a Morse test on a 4-cylinder four-stroke petrol engine running at $1500\\text{ rpm}$, the brake power with all cylinders firing was $32.0\\text{ kW}$. When cylinders 1, 2, 3, and 4 were cut out successively, the measured brake powers were $22.5\\text{ kW}$, $22.2\\text{ kW}$, $22.6\\text{ kW}$, and $22.3\\text{ kW}$ respectively. Calculate the mechanical efficiency of the engine in percentage.",
    "solution": "Total Brake Power $BP = 32.0\\text{ kW}$.\nIndicated power of individual cylinders:\n$$IP_1 = BP - BP_1 = 32.0 - 22.5 = 9.5\\text{ kW}$$\n$$IP_2 = BP - BP_2 = 32.0 - 22.2 = 9.8\\text{ kW}$$\n$$IP_3 = BP - BP_3 = 32.0 - 22.6 = 9.4\\text{ kW}$$\n$$IP_4 = BP - BP_4 = 32.0 - 22.3 = 9.7\\text{ kW}$$\n\nTotal Indicated Power ($IP$):\n$$IP = IP_1 + IP_2 + IP_3 + IP_4 = 9.5 + 9.8 + 9.4 + 9.7 = 38.4\\text{ kW}$$\n\nMechanical efficiency:\n$$\\eta_m = \\frac{BP}{IP} \\times 100 = \\frac{32.0}{38.4} \\times 100 = 83.33\\%$$",
    "difficulty": "Moderate",
    "correct_answer": 83.33,
    "answer": 83.33,
    "numerical_range": {
      "min": 82.5,
      "max": 83.5
    }
  },
  {
    "id": "QB_FP_103",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Traction theory",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Liljedahl - Tractors and Their Power Units",
    "question": "A tractor tire has an unloaded overall diameter of $1.50\\text{ m}$. Under a dynamic wheel load of $15\\text{ kN}$, the loaded axle height above a flat concrete surface is $0.69\\text{ m}$. Calculate the radial tire deflection in $\\text{mm}$.",
    "solution": "Unloaded tire radius:\n$$r_0 = \\frac{D}{2} = \\frac{1.50}{2} = 0.75\\text{ m} = 750\\text{ mm}$$\nLoaded static axle radius $r_s = 0.69\\text{ m} = 690\\text{ mm}$.\nTire radial deflection $\\delta$:\n$$\\delta = r_0 - r_s = 750 - 690 = 60\\text{ mm}$$",
    "difficulty": "Moderate",
    "correct_answer": 60,
    "answer": 60,
    "numerical_range": {
      "min": 59,
      "max": 61
    }
  },
  {
    "id": "QB_FP_104",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "I.C. engine systems – fuel, cooling, lubrication, ignition, electrical, intake and exhaust",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Jagdishwar Sahay - Elements of Agricultural Engineering",
    "question": "The centrifugal governor of a tractor diesel engine is primarily provided to:",
    "solution": "The governor controls fuel delivery by adjusting the fuel injection pump control rack to maintain engine speed within a narrow operating range when agricultural field load fluctuates.",
    "difficulty": "Moderate",
    "options": {
      "A": "Vary the injection timing with load changes",
      "B": "Automatically regulate fuel supply to maintain nearly constant engine speed under varying load conditions",
      "C": "Shut down the engine when oil pressure drops below safe level",
      "D": "Prevent the cooling water from boiling"
    },
    "correct_answer": "B",
    "answer": "B"
  },
  {
    "id": "QB_FP_105",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "I.C. engine systems – fuel, cooling, lubrication, ignition, electrical, intake and exhaust",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Jagdishwar Sahay - Elements of Agricultural Engineering",
    "question": "A centrifugal governor on an agricultural engine operates at $1800\\text{ rpm}$ at full load and rises to $1900\\text{ rpm}$ at no load. Calculate the governor speed regulation (droop) in percentage.",
    "solution": "Governor speed regulation (droop):\n$$R = \\frac{N_1 - N_2}{N_{\\text{mean}}} \\times 100$$\nWhere:\n- No load speed $N_1 = 1900\\text{ rpm}$\n- Full load speed $N_2 = 1800\\text{ rpm}$\n- Mean speed $N_{\\text{mean}} = \\frac{1900 + 1800}{2} = 1850\\text{ rpm}$\n\n$$R = \\frac{1900 - 1800}{1850} \\times 100 = \\frac{100}{1850} \\times 100 \\approx 5.405\\%$$\n(Or based on rated speed $100/1800 = 5.56\\%$).",
    "difficulty": "Moderate",
    "correct_answer": 5.41,
    "answer": 5.41,
    "numerical_range": {
      "min": 5.3,
      "max": 5.7
    }
  },
  {
    "id": "QB_FP_106",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Power efficiencies and measurement, engine performance curves",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Liljedahl - Tractors and Their Power Units",
    "question": "A tractor engine delivers $36\\text{ kW}$ brake power. The mechanical efficiency of the transmission between engine and PTO shaft is $92\\%$. If the drawbar power developed during field tillage is $24\\text{ kW}$, calculate the tractive efficiency in percentage.",
    "solution": "Power available at drive wheels (approx engine brake power minus transmission losses):\n$$P_{\\text{axle}} = BP \\times \\eta_{\\text{trans}} = 36 \\times 0.92 = 33.12\\text{ kW}$$\nDrawbar power $P_{\\text{db}} = 24\\text{ kW}$.\nTractive efficiency:\n$$\\eta_{\\text{tr}} = \\frac{P_{\\text{db}}}{P_{\\text{axle}}} \\times 100 = \\frac{24}{33.12} \\times 100 \\approx 72.46\\%$$",
    "difficulty": "Moderate",
    "correct_answer": 72.46,
    "answer": 72.46,
    "numerical_range": {
      "min": 72,
      "max": 73
    }
  },
  {
    "id": "QB_FP_107",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Bio-fuels and their use in farm mechanization",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Ganesan - Internal Combustion Engines",
    "question": "Which of the following statements comparing pure biodiesel (B100) with petroleum diesel fuel are CORRECT?",
    "solution": "- A is correct: Methyl/ethyl esters have higher cetane ratings (often > 50).\n- B is correct: LCV of biodiesel is ~38-40 MJ/kg compared to 42.5-43 MJ/kg for petro-diesel.\n- C is correct: Biodiesel contains ~10-11% oxygen by mass (oxygenated fuel).\n- D is incorrect: Due to intrinsic oxygen, combustion is more complete, resulting in lower CO and unburnt hydrocarbon emissions.",
    "difficulty": "Moderate",
    "options": {
      "A": "Biodiesel has a higher cetane number than standard fossil diesel",
      "B": "Biodiesel has approximately $8\\%$ to $10\\%$ lower lower calorific value (energy density) per unit mass",
      "C": "Biodiesel contains oxygen molecules in its ester chemical structure",
      "D": "Biodiesel produces higher carbon monoxide ($CO$) emissions in engine exhaust"
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
    "id": "QB_FP_108",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Tractor tests and performance",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Liljedahl - Tractors and Their Power Units",
    "question": "According to OECD / BIS standard test codes for agricultural tractors, the high ambient temperature cooling test evaluates the maximum ambient temperature at which the cooling system can operate before coolant boils. This temperature is commonly termed:",
    "solution": "The Limiting Ambient Temperature (LAT) is the highest calculated ambient air temperature at which the engine can run at rated maximum load without the cooling coolant exceeding the manufacturer's maximum specified boiling/blow-off limit.",
    "difficulty": "Moderate",
    "options": {
      "A": "Limiting Ambient Temperature (LAT)",
      "B": "Critical Flash Temperature",
      "C": "Thermal Degradation Limit",
      "D": "Saturation Boiling Threshold"
    },
    "correct_answer": "A",
    "answer": "A"
  },
  {
    "id": "QB_FP_109",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Mechanics of tractor chassis",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Liljedahl - Tractors and Their Power Units",
    "question": "A tractor of wheelbase $1.8\\text{ m}$ has static wheel reactions of $8\\text{ kN}$ on front wheels and $16\\text{ kN}$ on rear wheels. Calculate the horizontal distance of the tractor center of gravity from the rear axle centerline in $\\text{meters}$.",
    "solution": "Total weight $W = R_f + R_r = 8 + 16 = 24\\text{ kN}$.\nTaking moments about the rear axle:\n$$R_f \\times L = W \\times x_r$$\n$$8 \\times 1.8 = 24 \\times x_r$$\n$$x_r = \\frac{8 \\times 1.8}{24} = \\frac{14.4}{24} = 0.60\\text{ m}$$",
    "difficulty": "Moderate",
    "correct_answer": 0.6,
    "answer": 0.6,
    "numerical_range": {
      "min": 0.58,
      "max": 0.62
    }
  },
  {
    "id": "QB_FP_110",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Steering and hydraulic control systems used in tractors",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Liljedahl - Tractors and Their Power Units",
    "question": "In the hydraulic three-point hitch system of an agricultural tractor, the 'Draft Control' mode is designed to automatically adjust implement depth to:",
    "solution": "Draft control senses draft load via the top link or lower link sensing springs. When soil draft exceeds the set value, the hydraulic valve automatically raises the plow slightly to relieve draft, preventing engine stalling or excessive wheel slip.",
    "difficulty": "Moderate",
    "options": {
      "A": "Keep forward speed constant regardless of soil resistance",
      "B": "Maintain a constant pulling draft force, raising the implement in hard soil and lowering it in light soil",
      "C": "Keep the bottom link parallel to the ground surface",
      "D": "Prevent tractor engine oil temperature from rising"
    },
    "correct_answer": "B",
    "answer": "B"
  },
  {
    "id": "QB_FP_111",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Steering and hydraulic control systems used in tractors",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Liljedahl - Tractors and Their Power Units",
    "question": "A tractor hydraulic system has a gear pump delivering $36\\text{ L/min}$ at a working relief pressure of $17.5\\text{ MPa}$. Calculate the hydraulic power delivered by the pump in $\\text{kW}$.",
    "solution": "Hydraulic power $P_h$:\n$$P_h = \\frac{p \\times Q}{60}$$\nWhere:\n- $p$ is in $\\text{MPa}$ ($17.5\\text{ MPa}$)\n- $Q$ is in $\\text{L/min}$ ($36\\text{ L/min}$)\n\n$$P_h = \\frac{17.5 \\times 36}{60} = \\frac{630}{60} = 10.5\\text{ kW}$$",
    "difficulty": "Moderate",
    "correct_answer": 10.5,
    "answer": 10.5,
    "numerical_range": {
      "min": 10.3,
      "max": 10.7
    }
  },
  {
    "id": "QB_FP_112",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Power transmission systems – gear trains, differential, final drives and power take-off",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Jagdishwar Sahay - Elements of Agricultural Engineering",
    "question": "When a tractor negotiates a sharp right turn in the field, the differential gear assembly ensures that:",
    "solution": "The standard open differential delivers equal torque to both axle shafts while allowing the outer wheel to spin faster over a longer radius arc and the inner wheel to slow down.",
    "difficulty": "Moderate",
    "options": {
      "A": "Both drive wheels rotate at identical rotational speeds",
      "B": "The outer left drive wheel rotates faster than the inner right drive wheel while delivering equal torque",
      "C": "The inner drive wheel receives all the engine torque",
      "D": "The differential bevel pinions stop rotating on their cross-shaft"
    },
    "correct_answer": "B",
    "answer": "B"
  },
  {
    "id": "QB_FP_113",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Fuels and combustion",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "Ganesan - Internal Combustion Engines",
    "question": "A reference fuel blend for diesel knock rating contains $48\\text{ mL}$ of Cetane (Hexadecane) and $12\\text{ mL}$ of Heptamethylnonane ($HMN$). Since HMN has a cetane rating of 15, calculate the Cetane Number ($CN$) of the fuel blend according to standard ASTM formulation ($CN = \\% \\text{Cetane} + 0.15 \\times \\% HMN$).",
    "solution": "Total volume $= 48 + 12 = 60\\text{ mL}$.\nPercentage of Cetane $= \\frac{48}{60} \\times 100 = 80\\%$.\nPercentage of HMN $= \\frac{12}{60} \\times 100 = 20\\%$.\n$$CN = 80 + (0.15 \\times 20) = 80 + 3.0 = 83.0$$",
    "difficulty": "Moderate",
    "correct_answer": 83,
    "answer": 83,
    "numerical_range": {
      "min": 82.5,
      "max": 83.5
    }
  },
  {
    "id": "QB_FP_114",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Human engineering and safety considerations in design of tractor and agricultural implements",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Liljedahl - Tractors and Their Power Units",
    "question": "Which of the following statements regarding the Roll-Over Protective Structure (ROPS) on modern agricultural tractors are CORRECT?",
    "solution": "- A is correct: ROPS deforms plastically to absorb impact kinetic energy.\n- B is correct: A seat belt keeps the driver inside the protective envelope (zone of clearance).\n- C is incorrect: Drilling or welding creates stress concentrations and thermal softening that void safety certifications.\n- D is correct: Standard test codes (OECD/OSHA/BIS) specify rigorous crush and impact energy criteria.",
    "difficulty": "Moderate",
    "options": {
      "A": "ROPS is engineered to absorb structural deformation energy during tipping to maintain a defined operator survival zone",
      "B": "ROPS must always be used in combination with a seat belt for effective operator safety",
      "C": "Drilling holes or welding accessories onto the ROPS frame does not compromise its certified structural rating",
      "D": "Standard static/dynamic ROPS crush tests verify energy absorption without intrusion into clearance zone"
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
    "id": "QB_FP_115",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Calculation of power, torque, fuel consumption, heat load and power losses",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Jagdishwar Sahay - Elements of Agricultural Engineering",
    "question": "A diesel engine running at $2200\\text{ rpm}$ develops a brake torque of $150\\text{ N}\\cdot\\text{m}$. If the brake specific fuel consumption ($bsfc$) is $240\\text{ g/(kW}\\cdot\\text{h)}$, calculate the fuel consumption rate of the engine in $\\text{kg/h}$.",
    "solution": "Brake power ($BP$):\n$$BP = \\frac{2 \\pi N T}{60000} = \\frac{2 \\pi \\times 2200 \\times 150}{60000} = \\frac{2073451}{60000} = 34.557\\text{ kW}$$\nFuel consumption rate $m_f$:\n$$m_f = \\frac{BP \\times bsfc}{1000} = \\frac{34.557 \\times 240}{1000} = 8.294\\text{ kg/h}$$",
    "difficulty": "Moderate",
    "correct_answer": 8.29,
    "answer": 8.29,
    "numerical_range": {
      "min": 8.2,
      "max": 8.4
    }
  },
  {
    "id": "QB_FP_116",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Mechanics of tractor chassis",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Liljedahl - Tractors and Their Power Units",
    "question": "A farm tractor has a rear wheel tread width (track width) of $1.5\\text{ m}$ and its center of gravity is $0.75\\text{ m}$ above ground level on flat ground. Calculate the maximum side-slope angle in $\\text{degrees}$ that the tractor can negotiate statically before lateral overturn occurs.",
    "solution": "Static lateral overturning occurs when the line of action of gravity falls outside the downhill wheel contact line.\nMaximum side slope angle $\\theta$ is given by:\n$$\\tan \\theta = \\frac{T/2}{h_{cg}}$$\nWhere:\n- Tread width $T = 1.5\\text{ m}$, so $T/2 = 0.75\\text{ m}$\n- CG height $h_{cg} = 0.75\\text{ m}$\n\n$$\\tan \\theta = \\frac{0.75}{0.75} = 1.0$$\n$$\\theta = \\arctan(1.0) = 45.0^\\circ$$",
    "difficulty": "Moderate",
    "correct_answer": 45,
    "answer": 45,
    "numerical_range": {
      "min": 44.5,
      "max": 45.5
    }
  },
  {
    "id": "QB_FP_117",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Traction theory",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Liljedahl - Tractors and Their Power Units",
    "question": "A tractor operates on firm tilled soil where the coefficient of rolling resistance is $0.08$. If the total weight of the tractor is $22\\text{ kN}$, calculate the power required in $\\text{kW}$ solely to overcome rolling resistance at a forward travel speed of $7.2\\text{ km/h}$.",
    "solution": "Rolling resistance force:\n$$R = \\mu_r \\times W = 0.08 \\times 22000\\text{ N} = 1760\\text{ N}$$\nForward speed:\n$$v = 7.2\\text{ km/h} = \\frac{7.2}{3.6} = 2.0\\text{ m/s}$$\nPower required:\n$$P = \\frac{R \\times v}{1000} = \\frac{1760 \\times 2.0}{1000} = 3.52\\text{ kW}$$",
    "difficulty": "Moderate",
    "correct_answer": 3.52,
    "answer": 3.52,
    "numerical_range": {
      "min": 3.4,
      "max": 3.6
    }
  },
  {
    "id": "QB_FP_118",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Power efficiencies and measurement, engine performance curves",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Jagdishwar Sahay - Elements of Agricultural Engineering",
    "question": "During a rope brake dynamometer test on an engine running at $1200\\text{ rpm}$, the dead weight on the tight side is $450\\text{ N}$ and the spring balance reading on the slack side is $50\\text{ N}$. The effective brake drum diameter (including rope diameter) is $0.80\\text{ m}$. Calculate the brake power developed in $\\text{kW}$.",
    "solution": "Net brake load $W - S = 450 - 50 = 400\\text{ N}$.\nBrake drum radius $R = \\frac{0.80}{2} = 0.40\\text{ m}$.\nBrake torque:\n$$T = (W - S) \\times R = 400 \\times 0.40 = 160\\text{ N}\\cdot\\text{m}$$\nBrake power:\n$$BP = \\frac{2 \\pi N T}{60000} = \\frac{2 \\pi \\times 1200 \\times 160}{60000} = \\frac{1206371}{60000} \\approx 20.106\\text{ kW}$$",
    "difficulty": "Moderate",
    "correct_answer": 20.11,
    "answer": 20.11,
    "numerical_range": {
      "min": 19.8,
      "max": 20.3
    }
  },
  {
    "id": "QB_FP_119",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Engine components",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Ganesan - Internal Combustion Engines",
    "question": "In a standard four-cylinder four-stroke in-line diesel engine, the most commonly adopted firing order to maintain optimal dynamic rotational balance is:",
    "solution": "A firing order of 1-3-4-2 (or 1-2-4-3) provides symmetrical power impulse distribution along the crankshaft throws, balancing secondary rocking couples and minimizing torsional vibration.",
    "difficulty": "Moderate",
    "options": {
      "A": "1 - 2 - 3 - 4",
      "B": "1 - 3 - 4 - 2",
      "C": "1 - 4 - 2 - 3",
      "D": "1 - 3 - 2 - 4"
    },
    "correct_answer": "B",
    "answer": "B"
  },
  {
    "id": "QB_FP_120",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Calculation of power, torque, fuel consumption, heat load and power losses",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Ganesan - Internal Combustion Engines",
    "question": "A four-stroke single cylinder diesel engine with $120\\text{ mm}$ bore and $150\\text{ mm}$ stroke operates at $1500\\text{ rpm}$. The engine takes in $0.012\\text{ kg/s}$ of air. If ambient air density is $1.18\\text{ kg/m}^3$, calculate the volumetric efficiency of the engine in percentage.",
    "solution": "Swept volume of cylinder:\n$$V_s = \\frac{\\pi}{4} D^2 L = \\frac{\\pi}{4} (0.12)^2 (0.15) = 0.0016965\\text{ m}^3$$\nTheoretical volume displaced per second for four-stroke ($N/2$ cycles/min):\n$$V_{\\text{theoretical}} = V_s \\times \\frac{N}{2 \\times 60} = 0.0016965 \\times \\frac{1500}{120} = 0.0016965 \\times 12.5 = 0.021206\\text{ m}^3/\\text{s}$$\nActual volume of air ingested per second:\n$$V_{\\text{actual}} = \\frac{\\text{Mass rate}}{\\text{density}} = \\frac{0.012\\text{ kg/s}}{1.18\\text{ kg/m}^3} = 0.0101695\\text{ m}^3/\\text{s}$$\nVolumetric efficiency:\n$$\\eta_v = \\frac{V_{\\text{actual}}}{V_{\\text{theoretical}}} \\times 100 = \\frac{0.0101695}{0.021206} \\times 100 \\approx 80.3\\%$$",
    "difficulty": "Moderate",
    "correct_answer": 80.3,
    "answer": 80.3,
    "numerical_range": {
      "min": 79.5,
      "max": 81.5
    }
  },
  {
    "id": "QB_FP_121",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Bio-fuels and their use in farm mechanization",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Jagdishwar Sahay - Elements of Agricultural Engineering",
    "question": "In a downdraft biomass gasifier producing producer gas for agricultural diesel dual-fuel operation, the primary combustible gas components are:",
    "solution": "Producer gas generated from woody biomass in a downdraft gasifier contains ~18-22% $CO$, ~15-18% $H_2$, ~2-4% $CH_4$, with the remainder being inert $N_2$ (~50%) and $CO_2$ (~10%).",
    "difficulty": "Moderate",
    "options": {
      "A": "Carbon monoxide ($CO$), Hydrogen ($H_2$), and trace Methane ($CH_4$)",
      "B": "Carbon dioxide ($CO_2$) and Water vapor ($H_2O$)",
      "C": "Oxygen ($O_2$) and Nitrogen ($N_2$)",
      "D": "Sulfur dioxide ($SO_2$) and Nitrous oxide ($N_2O$)"
    },
    "correct_answer": "A",
    "answer": "A"
  },
  {
    "id": "QB_FP_122",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Bio-fuels and their use in farm mechanization",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Jagdishwar Sahay - Elements of Agricultural Engineering",
    "question": "A biomass gasifier consumes $15\\text{ kg/h}$ of biomass having a higher calorific value of $16.5\\text{ MJ/kg}$. It produces $36\\text{ m}^3/\\text{h}$ of producer gas having a calorific value of $5.0\\text{ MJ/m}^3$. Calculate the cold gas efficiency of the gasifier in percentage.",
    "solution": "Energy input rate from biomass:\n$$E_{\\text{in}} = 15\\text{ kg/h} \\times 16.5\\text{ MJ/kg} = 247.5\\text{ MJ/h}$$\nEnergy output rate in clean producer gas:\n$$E_{\\text{out}} = 36\\text{ m}^3/\\text{h} \\times 5.0\\text{ MJ/m}^3 = 180.0\\text{ MJ/h}$$\nCold gas efficiency:\n$$\\eta_{\\text{cg}} = \\frac{E_{\\text{out}}}{E_{\\text{in}}} \\times 100 = \\frac{180.0}{247.5} \\times 100 \\approx 72.73\\%$$",
    "difficulty": "Moderate",
    "correct_answer": 72.73,
    "answer": 72.73,
    "numerical_range": {
      "min": 72,
      "max": 73.5
    }
  },
  {
    "id": "QB_FP_123",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Tractor clutches and brakes",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Jagdishwar Sahay - Elements of Agricultural Engineering",
    "question": "A tractor is equipped with twin internal expanding shoe drum brakes of $300\\text{ mm}$ internal drum diameter. If the total tangential braking force developed at the drum circumference is $4.5\\text{ kN}$ on each wheel, calculate the total braking torque developed by both rear wheels combined in $\\text{N}\\cdot\\text{m}$.",
    "solution": "Drum radius $R = \\frac{0.30}{2} = 0.15\\text{ m}$.\nBraking torque per wheel:\n$$T_1 = F_t \\times R = 4500\\text{ N} \\times 0.15\\text{ m} = 675\\text{ N}\\cdot\\text{m}$$\nFor both wheels:\n$$T_{\\text{total}} = 2 \\times 675 = 1350\\text{ N}\\cdot\\text{m}$$",
    "difficulty": "Moderate",
    "correct_answer": 1350,
    "answer": 1350,
    "numerical_range": {
      "min": 1340,
      "max": 1360
    }
  },
  {
    "id": "QB_FP_124",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "I.C. engine systems – fuel, cooling, lubrication, ignition, electrical, intake and exhaust",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Ganesan - Internal Combustion Engines",
    "question": "Which of the following functions are performed by the engine lubrication system in a farm tractor?",
    "solution": "- A: Lubricating oil separates moving surfaces with an oil hydrodynamic film.\n- B: Oil circulates through the oil cooler and sump, removing heat from pistons and bearings.\n- C: Viscous oil seals minute microscopic clearances between rings and cylinder liners, preventing blow-by.\n- D: Lubricating oil has no role in increasing fuel octane rating.",
    "difficulty": "Moderate",
    "options": {
      "A": "Reducing frictional wear between sliding metallic surfaces",
      "B": "Acting as a cooling medium to carry away heat from piston crowns and bearings",
      "C": "Acting as a hydraulic sealing agent between piston rings and cylinder walls",
      "D": "Increasing the octane rating of the fuel"
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
    "id": "QB_FP_125",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "I.C. engine systems – fuel, cooling, lubrication, ignition, electrical, intake and exhaust",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Ganesan - Internal Combustion Engines",
    "question": "A pressurized tractor cooling system operates with a radiator cap rated at a gauge pressure of $70\\text{ kPa}$. If pure water normally boils at $100^\\circ\\text{C}$ at atmospheric pressure, and the boiling point increases by approximately $0.28^\\circ\\text{C}$ per $\\text{kPa}$ of pressure increase, calculate the elevated boiling point of coolant in $^\\circ\\text{C}$.",
    "solution": "Pressure elevation $\\Delta P = 70\\text{ kPa}$.\nBoiling point elevation:\n$$\\Delta T = 70 \\times 0.28 = 19.6^\\circ\\text{C}$$\nElevated boiling point:\n$$T_b = 100 + 19.6 = 119.6^\\circ\\text{C}$$",
    "difficulty": "Moderate",
    "correct_answer": 119.6,
    "answer": 119.6,
    "numerical_range": {
      "min": 119,
      "max": 120.5
    }
  },
  {
    "id": "QB_FP_126",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Type, selection, maintenance and repair of tractors and power tillers",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Jagdishwar Sahay - Elements of Agricultural Engineering",
    "question": "In a walking-type power tiller (two-wheel tractor), steering while operating a rotary cultivator is achieved by:",
    "solution": "Power tillers utilize independent left and right steering dog clutches on the handle grips. Disengaging one clutch disconnects drive power from that wheel, allowing the opposite wheel to pivot the machine.",
    "difficulty": "Moderate",
    "options": {
      "A": "A steering wheel connected to a recirculating ball box",
      "B": "Independent left and right dog clutches (steering clutches) on the drive axle",
      "C": "Hydraulic power steering rams",
      "D": "Tilting the rotavator rotor assembly"
    },
    "correct_answer": "B",
    "answer": "B"
  },
  {
    "id": "QB_FP_127",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Type, selection, maintenance and repair of tractors and power tillers",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1",
    "question": "A power tiller rotavator has an effective working width of $60\\text{ cm}$. It operates at a forward speed of $2.4\\text{ km/h}$. If the rotary tiller shaft absorbs $6.0\\text{ kW}$ from the engine, calculate the specific work per unit tilled field area in $\\text{kJ/m}^2$.",
    "solution": "Forward velocity $v = 2.4\\text{ km/h} = \\frac{2.4}{3.6} = 0.6667\\text{ m/s}$.\nArea tilled per second:\n$$a_s = \\text{Width} \\times v = 0.60\\text{ m} \\times 0.6667\\text{ m/s} = 0.40\\text{ m}^2/\\text{s}$$\nPower absorbed $P = 6.0\\text{ kW} = 6.0\\text{ kJ/s}$.\nSpecific work:\n$$w_s = \\frac{P}{a_s} = \\frac{6.0\\text{ kJ/s}}{0.40\\text{ m}^2/\\text{s}} = 15.0\\text{ kJ/m}^2$$",
    "difficulty": "Moderate",
    "correct_answer": 15,
    "answer": 15,
    "numerical_range": {
      "min": 14.8,
      "max": 15.2
    }
  },
  {
    "id": "QB_FP_128",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Power transmission systems – gear trains, differential, final drives and power take-off",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Jagdishwar Sahay - Elements of Agricultural Engineering",
    "question": "A tractor differential unit has a crown wheel with 44 teeth driven by a bevel pinion with 11 teeth. If the pinion rotates at $1200\\text{ rpm}$, calculate the speed of the crown wheel in $\\text{rpm}$.",
    "solution": "Reduction ratio:\n$$i = \\frac{T_{\\text{crown}}}{T_{\\text{pinion}}} = \\frac{44}{11} = 4$$\nCrown wheel speed:\n$$N_{\\text{crown}} = \\frac{N_{\\text{pinion}}}{i} = \\frac{1200}{4} = 300\\text{ rpm}$$",
    "difficulty": "Moderate",
    "correct_answer": 300,
    "answer": 300,
    "numerical_range": {
      "min": 299,
      "max": 301
    }
  },
  {
    "id": "QB_FP_129",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Traction theory",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Liljedahl - Tractors and Their Power Units",
    "question": "According to Bekker's soil sinkage equation $p = \\left(\\frac{k_c}{b} + k_\\phi\\right) z^n$, a plate of width $b = 10\\text{ cm}$ sinks $z = 4\\text{ cm}$ under a vertical contact pressure. If $n = 1.0$, $k_c = 15\\text{ N/cm}$, and $k_\\phi = 2.5\\text{ N/cm}^2$, calculate the contact pressure $p$ in $\\text{N/cm}^2$.",
    "solution": "Given:\n- $b = 10\\text{ cm}$\n- $z = 4\\text{ cm}$\n- $n = 1.0$\n- $k_c = 15\\text{ N/cm}$\n- $k_\\phi = 2.5\\text{ N/cm}^2$\n\n$$p = \\left( \\frac{15}{10} + 2.5 \\right) \\times 4^1 = (1.5 + 2.5) \\times 4 = 4.0 \\times 4 = 16.0\\text{ N/cm}^2$$",
    "difficulty": "Moderate",
    "correct_answer": 16,
    "answer": 16,
    "numerical_range": {
      "min": 15.5,
      "max": 16.5
    }
  },
  {
    "id": "QB_FP_130",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Lubricants and their properties",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Ganesan - Internal Combustion Engines",
    "question": "In the SAE viscosity designation 'SAE 15W-40' for multi-grade engine crankcase oils, the letter 'W' stands for:",
    "solution": "In multi-grade lubricants (e.g. 15W-40), 'W' stands for Winter, indicating low-temperature cold-start pumping viscosity rating evaluated at $-20^\\circ\\text{C}$ to $-15^\\circ\\text{C}$.",
    "difficulty": "Moderate",
    "options": {
      "A": "Weight",
      "B": "Winter",
      "C": "Viscosity Index",
      "D": "Wattage"
    },
    "correct_answer": "B",
    "answer": "B"
  },
  {
    "id": "QB_FP_131",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Calculation of power, torque, fuel consumption, heat load and power losses",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Ganesan - Internal Combustion Engines",
    "question": "In an engine heat balance sheet, total heat supplied by fuel is $120\\text{ kW}$. Heat equivalent of brake power is $42\\text{ kW}$, heat carried away by cooling water is $36\\text{ kW}$, and heat carried away by exhaust gases is $30\\text{ kW}$. Calculate the unaccounted heat loss (radiation, convection, unaccounted) in percentage of total heat input.",
    "solution": "Total heat input $Q_{\\text{total}} = 120\\text{ kW}$.\nAccounted heat:\n$$Q_{\\text{accounted}} = 42 + 36 + 30 = 108\\text{ kW}$$\nUnaccounted losses:\n$$Q_{\\text{unaccounted}} = 120 - 108 = 12\\text{ kW}$$\nPercentage unaccounted:\n$$\\% = \\frac{12}{120} \\times 100 = 10.0\\%$$",
    "difficulty": "Moderate",
    "correct_answer": 10,
    "answer": 10,
    "numerical_range": {
      "min": 9.8,
      "max": 10.2
    }
  },
  {
    "id": "QB_FP_132",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Three point hitches – free link and restrained link operations",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Liljedahl - Tractors and Their Power Units",
    "question": "In three-point hitch terminology, the 'Sway Blocks' (or check chains) are provided on the lower links primarily to:",
    "solution": "Check chains or sway blocks restrict the horizontal sway of the lower links to prevent the implement from swinging into the rear tires during transport or erratic field operation.",
    "difficulty": "Moderate",
    "options": {
      "A": "Adjust the pitch of the moldboard plow bottom",
      "B": "Limit excessive lateral swinging of the implement during transport and work",
      "C": "Regulate hydraulic oil pressure to the lift cylinder",
      "D": "Prevent the tractor front wheels from lifting off the ground"
    },
    "correct_answer": "B",
    "answer": "B"
  },
  {
    "id": "QB_FP_133",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Mechanics of tractor chassis",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Liljedahl - Tractors and Their Power Units",
    "question": "A tractor is parked heading directly uphill on a slope of angle $\\theta = 20^\\circ$. The tractor weight is $20\\text{ kN}$, wheelbase is $1.8\\text{ m}$, and its CG is located midway along the wheelbase ($0.9\\text{ m}$ from both axles) and $0.7\\text{ m}$ above ground. Calculate the normal reaction on the front wheels in $\\text{kN}$.",
    "solution": "Taking moments about the rear wheel contact point on the inclined slope:\n$$R_f \\times L = W \\cos\\theta \\times x_{cg} - W \\sin\\theta \\times h_{cg}$$\nWhere:\n- $W = 20\\text{ kN}$\n- $\\theta = 20^\\circ$ ($\\cos 20^\\circ = 0.93969$, $\\sin 20^\\circ = 0.34202$)\n- $L = 1.8\\text{ m}$\n- $x_{cg} = 0.9\\text{ m}$\n- $h_{cg} = 0.7\\text{ m}$\n\n$$R_f \\times 1.8 = [20 \\times 0.93969 \\times 0.9] - [20 \\times 0.34202 \\times 0.7]$$\n$$R_f \\times 1.8 = 16.9145 - 4.7883 = 12.1262$$\n$$R_f = \\frac{12.1262}{1.8} \\approx 6.74\\text{ kN}$$",
    "difficulty": "Moderate",
    "correct_answer": 6.74,
    "answer": 6.74,
    "numerical_range": {
      "min": 6.6,
      "max": 6.9
    }
  },
  {
    "id": "QB_FP_134",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Calculation of power, torque, fuel consumption, heat load and power losses",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Jagdishwar Sahay - Elements of Agricultural Engineering",
    "question": "A tractor engine produces $40\\text{ kW}$ brake power while consuming diesel at $10\\text{ kg/h}$. Calculate the brake specific fuel consumption ($bsfc$) in $\\text{g/(kW}\\cdot\\text{h)}$.",
    "solution": "Brake specific fuel consumption:\n$$bsfc = \\frac{\\text{Fuel consumption (kg/h)} \\times 1000}{\\text{Brake power (kW)}} = \\frac{10 \\times 1000}{40} = 250\\text{ g/(kW}\\cdot\\text{h)}$$",
    "difficulty": "Moderate",
    "correct_answer": 250,
    "answer": 250,
    "numerical_range": {
      "min": 248,
      "max": 252
    }
  },
  {
    "id": "QB_FP_135",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Sources of power on the farm – human, animal, mechanical, electrical, wind, solar and biomass",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "Jagdishwar Sahay - Elements of Agricultural Engineering",
    "question": "A pair of bullocks exerts an average draft of $80\\text{ kgf}$ while pulling a plow at a walking speed of $3.6\\text{ km/h}$. Calculate the power developed by the bullock pair in $\\text{hp}$ (metric horsepower, $1\\text{ hp} = 75\\text{ kgf}\\cdot\\text{m/s}$).",
    "solution": "Draft $D = 80\\text{ kgf}$.\nSpeed $v = 3.6\\text{ km/h} = 1.0\\text{ m/s}$.\nPower in $\\text{kgf}\\cdot\\text{m/s}$:\n$$P = 80 \\times 1.0 = 80\\text{ kgf}\\cdot\\text{m/s}$$\nIn metric hp:\n$$P = \\frac{80}{75} = 1.067\\text{ hp}$$",
    "difficulty": "Moderate",
    "correct_answer": 1.067,
    "answer": 1.067,
    "numerical_range": {
      "min": 1.04,
      "max": 1.08
    }
  },
  {
    "id": "QB_FP_136",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Sources of power on the farm – human, animal, mechanical, electrical, wind, solar and biomass",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Jagdishwar Sahay - Elements of Agricultural Engineering",
    "question": "According to Betz's law, the theoretical maximum aerodynamic power coefficient ($C_p$) that can be extracted from wind by an ideal wind turbine rotor is:",
    "solution": "Betz's limit proves from momentum and continuity principles that the maximum kinetic energy fraction extractable by an open-flow wind rotor is $C_{p,\\max} = \\frac{16}{27} \\approx 59.3\\%$.",
    "difficulty": "Moderate",
    "options": {
      "A": "$\\frac{16}{27} \\approx 0.593$",
      "B": "$\\frac{1}{2} = 0.500$",
      "C": "$\\frac{2}{3} \\approx 0.667$",
      "D": "$\\frac{8}{27} \\approx 0.296$"
    },
    "correct_answer": "A",
    "answer": "A"
  },
  {
    "id": "QB_FP_137",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Fuels and combustion",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Ganesan - Internal Combustion Engines",
    "question": "The lowest temperature at which a petroleum fuel gives off sufficient vapor to ignite momentarily (flash) when an open flame is brought near its surface is defined as its:",
    "solution": "The flash point is the lowest temperature of the liquid fuel at which it forms a flammable vapor mixture with air near its surface that momentarily catches fire (flashes) on ignition. The fire point is slightly higher (at which combustion continues for $\\ge 5\\text{ s}$).",
    "difficulty": "Moderate",
    "options": {
      "A": "Fire point",
      "B": "Flash point",
      "C": "Pour point",
      "D": "Cloud point"
    },
    "correct_answer": "B",
    "answer": "B"
  },
  {
    "id": "QB_FP_138",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Fuels and combustion",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "Ganesan - Internal Combustion Engines",
    "question": "A diesel engine fuel has a density of $850\\text{ kg/m}^3$ at $15^\\circ\\text{C}$. Calculate the specific gravity of the diesel fuel relative to pure water (density $1000\\text{ kg/m}^3$).",
    "solution": "Specific gravity:\n$$SG = \\frac{\\rho_{\\text{fuel}}}{\\rho_{\\text{water}}} = \\frac{850}{1000} = 0.85$$",
    "difficulty": "Moderate",
    "correct_answer": 0.85,
    "answer": 0.85,
    "numerical_range": {
      "min": 0.84,
      "max": 0.86
    }
  },
  {
    "id": "QB_FP_139",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Human engineering and safety considerations in design of tractor and agricultural implements",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Liljedahl - Tractors and Their Power Units",
    "question": "According to workplace noise safety standards (OSHA / ISO), an operator exposed to continuous machinery sound level of $90\\text{ dBA}$ has a permissible maximum daily exposure duration of:",
    "solution": "The OSHA permissible noise exposure threshold establishes $90\\text{ dBA}$ for a standard 8-hour workday, with a 5-dB exchange rate (e.g., 95 dBA for 4 hours, 100 dBA for 2 hours).",
    "difficulty": "Moderate",
    "options": {
      "A": "8 hours",
      "B": "4 hours",
      "C": "2 hours",
      "D": "1 hour"
    },
    "correct_answer": "A",
    "answer": "A"
  },
  {
    "id": "QB_FP_140",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Power transmission systems – gear trains, differential, final drives and power take-off",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Jagdishwar Sahay - Elements of Agricultural Engineering",
    "question": "Which of the following operational precautions are recommended when using the differential lock on an agricultural tractor?",
    "solution": "- A is correct: Engaging differential lock locks the differential mechanism so both wheels spin at equal speed, extracting the tractor from slippery spots.\n- B is correct: Differential lock must be disengaged prior to steering turns to prevent severe driveline windup or tire scuffing/loss of steering control.\n- C is incorrect: Never engage differential lock at high transport speeds due to steering hazard.\n- D is correct: The dog clutch physically locks one axle shaft to the differential cage.",
    "difficulty": "Moderate",
    "options": {
      "A": "Engage the differential lock when one drive wheel starts slipping severely in mud",
      "B": "Disengage the differential lock before attempting to make a sharp headland turn",
      "C": "Keep the differential lock engaged at high road transport travel speeds",
      "D": "The differential lock rigidizes both rear axle shafts to turn at identical speeds"
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
    "id": "QB_FP_141",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Sources of power on the farm – human, animal, mechanical, electrical, wind, solar and biomass",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A solar photovoltaic pumping system has a solar panel array with total area of $10\\text{ m}^2$ operating at an electrical conversion efficiency of $15\\%$. The average global solar irradiance incident on the array is $800\\text{ W/m}^2$. If the motor-pump overall efficiency is $60\\%$, calculate the hydraulic power output in $\\text{W}$.",
    "numerical_range": {
      "min": 715,
      "max": 725
    },
    "answer": 720,
    "correct_answer": 720,
    "difficulty": "Moderate",
    "solution": "Total solar power incident on array:\n$$P_{\\text{in}} = I \\times A = 800\\text{ W/m}^2 \\times 10\\text{ m}^2 = 8000\\text{ W}$$\nElectrical power generated by PV array:\n$$P_{\\text{elec}} = P_{\\text{in}} \\times \\eta_{\\text{pv}} = 8000 \\times 0.15 = 1200\\text{ W}$$\nHydraulic power delivered by motor-pump set:\n$$P_{\\text{hyd}} = P_{\\text{elec}} \\times \\eta_{\\text{mp}} = 1200 \\times 0.60 = 720\\text{ W}$$",
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1"
  },
  {
    "id": "QB_FP_142",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Sources of power on the farm – human, animal, mechanical, electrical, wind, solar and biomass",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A pair of bullocks each weighing $450\\text{ kg}$ develops an average pull equal to $10\\%$ of their combined body weight while plowing at a walking speed of $3.6\\text{ km/h}$ ($1.0\\text{ m/s}$). Calculate the total power developed by the bullocks in $\\text{kW}$ (take $g = 9.81\\text{ m/s}^2$).",
    "numerical_range": {
      "min": 0.86,
      "max": 0.9
    },
    "answer": 0.88,
    "correct_answer": 0.88,
    "difficulty": "Easy",
    "solution": "Total weight of bullocks:\n$$W = 2 \\times 450 = 900\\text{ kg}$$\nPull exerted:\n$$P = 0.10 \\times 900\\text{ kg} \\times 9.81\\text{ m/s}^2 = 882.9\\text{ N}$$\nForward speed $v = 1.0\\text{ m/s}$.\nPower developed:\n$$\\text{Power} = \\frac{P \\times v}{1000} = \\frac{882.9 \\times 1.0}{1000} \\approx 0.883\\text{ kW}$$\nAcceptable range: $0.86 - 0.90\\text{ kW}$.",
    "source": "Sanjay Kumar - Numerical Approach to Agricultural Engineering"
  },
  {
    "id": "QB_FP_143",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Sources of power on the farm – human, animal, mechanical, electrical, wind, solar and biomass",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "According to Betz's law, the theoretical maximum power coefficient ($C_p$) that an ideal wind turbine rotor can extract from the kinetic energy of wind is:",
    "options": {
      "A": "$16/27$ ($59.3\\%$)",
      "B": "$8/15$ ($53.3\\%$)",
      "C": "$1/2$ ($50.0\\%$)",
      "D": "$2/3$ ($66.7\\%$)"
    },
    "correct_answer": "A",
    "answer": "A",
    "difficulty": "Easy",
    "solution": "Betz's limit establishes that the theoretical maximum aerodynamic power coefficient of any wind rotor is $C_{p,\\max} = \\frac{16}{27} \\approx 0.5926$ ($59.3\\%$).",
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1"
  },
  {
    "id": "QB_FP_144",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Bio-fuels and their use in farm mechanization",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "In the base-catalyzed transesterification process to convert vegetable oil (triglycerides) into biodiesel (fatty acid methyl esters), the primary byproduct formed is:",
    "options": {
      "A": "Glycerol",
      "B": "Methanol",
      "C": "Ethanol",
      "D": "Acetic acid"
    },
    "correct_answer": "A",
    "answer": "A",
    "difficulty": "Easy",
    "solution": "During transesterification, 1 mole of triglyceride reacts with 3 moles of alcohol (methanol) in the presence of a catalyst to produce 3 moles of fatty acid methyl ester (biodiesel) and 1 mole of glycerol as byproduct.",
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1"
  },
  {
    "id": "QB_FP_145",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Bio-fuels and their use in farm mechanization",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A diesel-biodiesel blend (B20) contains $20\\%$ biodiesel and $80\\%$ petroleum diesel by mass. The lower heating value (LHV) of pure biodiesel is $38.5\\text{ MJ/kg}$ and that of pure diesel is $42.5\\text{ MJ/kg}$. Calculate the LHV of the B20 fuel blend in $\\text{MJ/kg}$.",
    "numerical_range": {
      "min": 41.5,
      "max": 41.9
    },
    "answer": 41.7,
    "correct_answer": 41.7,
    "difficulty": "Easy",
    "solution": "By mass-weighted mixture rule:\n$$\\text{LHV}_{\\text{blend}} = (0.20 \\times 38.5) + (0.80 \\times 42.5) = 7.70 + 34.00 = 41.70\\text{ MJ/kg}$$",
    "source": "V. Ganesan - Internal Combustion Engines"
  },
  {
    "id": "QB_FP_146",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Thermodynamic principles of I.C. engines",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "An air-standard Otto cycle operates with a compression ratio $r = 8$. Taking the ratio of specific heats $\\gamma = 1.40$, calculate the air-standard thermal efficiency as a percentage (round off to 2 decimal places).",
    "numerical_range": {
      "min": 56.3,
      "max": 56.7
    },
    "answer": 56.47,
    "correct_answer": 56.47,
    "difficulty": "Easy",
    "solution": "Air-standard efficiency of Otto cycle:\n$$\\eta = 1 - \\frac{1}{r^{\\gamma - 1}} = 1 - \\frac{1}{8^{1.4 - 1}} = 1 - \\frac{1}{8^{0.4}}$$\n$$8^{0.4} = 2.2974$$\n$$\\eta = 1 - \\frac{1}{2.2974} = 1 - 0.43528 = 0.56472 \\implies 56.47\\%$$\nAcceptable range: $56.3 - 56.7\\%$.",
    "source": "V. Ganesan - Internal Combustion Engines"
  },
  {
    "id": "QB_FP_147",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "I.C. engine cycles",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "An air-standard Diesel cycle has a compression ratio $r = 16$ and a cut-off ratio $r_c = 2.0$. For air, $\\gamma = 1.4$. Calculate the thermal efficiency of the cycle as a percentage (round off to 1 decimal place).",
    "numerical_range": {
      "min": 61,
      "max": 62
    },
    "answer": 61.4,
    "correct_answer": 61.4,
    "difficulty": "Moderate",
    "solution": "Diesel cycle thermal efficiency formula:\n$$\\eta_{\\text{Diesel}} = 1 - \\frac{1}{r^{\\gamma - 1}} \\left[ \\frac{r_c^\\gamma - 1}{\\gamma(r_c - 1)} \\right]$$\nHere $r = 16$, $r_c = 2.0$, $\\gamma = 1.4$.\n$$r^{\\gamma - 1} = 16^{0.4} = (2^4)^{0.4} = 2^{1.6} \\approx 3.0314$$\n$$\\frac{r_c^\\gamma - 1}{\\gamma(r_c - 1)} = \\frac{2.0^{1.4} - 1}{1.4(2.0 - 1)} = \\frac{2.639 - 1}{1.4 \\times 1} = \\frac{1.639}{1.4} \\approx 1.1707$$\n$$\\eta = 1 - \\frac{1.1707}{3.0314} = 1 - 0.3862 = 0.6138 \\implies 61.38\\% \\approx 61.4\\%$$\nAcceptable range: $61.0 - 62.0\\%$.",
    "source": "V. Ganesan - Internal Combustion Engines"
  },
  {
    "id": "QB_FP_148",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Engine components",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following functions are performed by the piston rings in a multi-cylinder tractor diesel engine?",
    "options": {
      "A": "Sealing the combustion chamber to prevent blow-by of high-pressure gases into the crankcase",
      "B": "Transferring heat from the hot piston crown to the cylinder liner walls",
      "C": "Scraping excess lubricating oil from the cylinder wall back to the oil sump",
      "D": "Supporting the entire lateral thrust force directly at the crankshaft main journal"
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
    "solution": "Piston rings have three primary functions:\n- Gas sealing (compression rings prevent combustion gas leakage).\n- Heat transfer (conveying up to $70\\%$ of piston crown heat to the cooled cylinder liner).\n- Oil control (oil scraper ring regulates oil film thickness and scrapes excess oil back to sump).\nLateral thrust force is supported by the piston skirt against the cylinder wall, not by piston rings at the main journal.",
    "source": "V. Ganesan - Internal Combustion Engines"
  },
  {
    "id": "QB_FP_149",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Fuels and combustion",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "Calculate the stoichiometric (theoretical) mass of air required for the complete combustion of $1.0\\text{ kg}$ of diesel fuel assumed to have chemical formula $\\text{C}_{12}\\text{H}_{26}$ (atomic weights: $\\text{C}=12$, $\\text{H}=1$, $\\text{O}=16$; air contains $23.2\\%$ oxygen by mass; round off to 2 decimal places).",
    "numerical_range": {
      "min": 14.8,
      "max": 15.2
    },
    "answer": 14.97,
    "correct_answer": 14.97,
    "difficulty": "Moderate",
    "solution": "Combustion reaction:\n$$\\text{C}_{12}\\text{H}_{26} + \\left(12 + \\frac{26}{4}\\right)\\text{O}_2 \\rightarrow 12\\text{CO}_2 + 13\\text{H}_2\\text{O}$$\nMoles of $\\text{O}_2 = 12 + 6.5 = 18.5\\text{ moles}$.\nMolecular weight of $\\text{C}_{12}\\text{H}_{26} = (12 \\times 12) + (26 \\times 1) = 144 + 26 = 170\\text{ g/mol}$.\nMass of $\\text{O}_2$ required per mole of fuel $= 18.5 \\times 32 = 592\\text{ g}$.\nMass of $\\text{O}_2$ per kg of fuel:\n$$m_{\\text{O}_2} = \\frac{592}{170} \\approx 3.48235\\text{ kg }\\text{O}_2$$\nStoichiometric air required (air has $23.2\\%$ $\\text{O}_2$ by mass):\n$$m_{\\text{air}} = \\frac{3.48235}{0.232} \\approx 14.97\\text{ kg air/kg fuel}$$\nAcceptable range: $14.8 - 15.2$.",
    "source": "V. Ganesan - Internal Combustion Engines"
  },
  {
    "id": "QB_FP_150",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Lubricants and their properties",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "In engine lubricating oils, a high Viscosity Index (VI) indicates that:",
    "options": {
      "A": "The viscosity of the oil changes relatively little with changes in temperature",
      "B": "The viscosity of the oil increases rapidly as temperature rises",
      "C": "The oil has very high volatility and low flash point",
      "D": "The oil contains no anti-wear or detergent additives"
    },
    "correct_answer": "A",
    "answer": "A",
    "difficulty": "Easy",
    "solution": "Viscosity Index (VI) measures the rate of change of viscosity with temperature. A higher VI indicates smaller viscosity changes over wide operating temperature ranges, which is essential for multi-grade engine oils.",
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1"
  },
  {
    "id": "QB_FP_151",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "I.C. engine systems – fuel, cooling, lubrication, ignition, electrical, intake and exhaust",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A single-cylinder four-stroke diesel engine running at $1500\\text{ rpm}$ consumes fuel at a rate of $2.7\\text{ kg/h}$. The fuel density is $850\\text{ kg/m}^3$. Calculate the volume of fuel injected per power stroke in $\\text{mm}^3$ (round off to 1 decimal place).",
    "numerical_range": {
      "min": 69,
      "max": 72
    },
    "answer": 70.6,
    "correct_answer": 70.6,
    "difficulty": "Moderate",
    "solution": "Number of power strokes per minute for a 4-stroke engine:\n$$n = \\frac{N}{2} = \\frac{1500}{2} = 750\\text{ strokes/min} = 45000\\text{ strokes/h}$$\nFuel mass injected per stroke:\n$$m_s = \\frac{2.7\\text{ kg/h}}{45000\\text{ strokes/h}} = 6.0 \\times 10^{-5}\\text{ kg} = 0.060\\text{ g}$$\nVolume of fuel per stroke:\n$$V_s = \\frac{m_s}{\\rho} = \\frac{6.0 \\times 10^{-5}\\text{ kg}}{850\\text{ kg/m}^3} = 7.0588 \\times 10^{-8}\\text{ m}^3 = 70.59\\text{ mm}^3$$\nAcceptable range: $69.0 - 72.0\\text{ mm}^3$.",
    "source": "Sanjay Kumar - Numerical Approach to Agricultural Engineering"
  },
  {
    "id": "QB_FP_152",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Power efficiencies and measurement, engine performance curves",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "During a brake test of a tractor engine using a rope brake dynamometer, the dead load on the brake is $450\\text{ N}$, the spring balance reading is $50\\text{ N}$, and the engine speed is $1800\\text{ rpm}$. The effective brake drum radius is $0.40\\text{ m}$. Calculate the brake power developed in $\\text{kW}$ (round off to 2 decimal places).",
    "numerical_range": {
      "min": 29.8,
      "max": 30.5
    },
    "answer": 30.16,
    "correct_answer": 30.16,
    "difficulty": "Moderate",
    "solution": "Net braking load:\n$$W_{\\text{net}} = W - S = 450 - 50 = 400\\text{ N}$$\nBraking torque:\n$$T = W_{\\text{net}} \\times R = 400\\text{ N} \\times 0.40\\text{ m} = 160\\text{ N}\\cdot\\text{m}$$\nBrake power:\n$$BP = \\frac{2\\pi N T}{60000} = \\frac{2\\pi \\times 1800 \\times 160}{60000} = \\frac{1809557}{60000} \\approx 30.16\\text{ kW}$$\nAcceptable range: $29.8 - 30.5\\text{ kW}$.",
    "source": "V. Ganesan - Internal Combustion Engines"
  },
  {
    "id": "QB_FP_153",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Power efficiencies and measurement, engine performance curves",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A four-cylinder four-stroke diesel engine develops a brake power of $36.0\\text{ kW}$ at full load. During a Morse test, the brake power outputs obtained by cutting off cylinders 1, 2, 3, and 4 in turn are $25.5\\text{ kW}$, $25.0\\text{ kW}$, $25.2\\text{ kW}$, and $25.3\\text{ kW}$ respectively. Calculate the mechanical efficiency of the engine as a percentage (round off to 1 decimal place).",
    "numerical_range": {
      "min": 83,
      "max": 84.5
    },
    "answer": 83.7,
    "correct_answer": 83.7,
    "difficulty": "Moderate",
    "solution": "Indicated power of individual cylinders:\n$$IP_1 = 36.0 - 25.5 = 10.5\\text{ kW}$$\n$$IP_2 = 36.0 - 25.0 = 11.0\\text{ kW}$$\n$$IP_3 = 36.0 - 25.2 = 10.8\\text{ kW}$$\n$$IP_4 = 36.0 - 25.3 = 10.7\\text{ kW}$$\nTotal IP:\n$$IP = 10.5 + 11.0 + 10.8 + 10.7 = 43.0\\text{ kW}$$\nMechanical efficiency:\n$$\\eta_m = \\frac{36.0}{43.0} \\times 100 = 83.72\\% \\approx 83.7\\%$$\nAcceptable range: $83.0 - 84.5\\%$.",
    "source": "V. Ganesan - Internal Combustion Engines"
  },
  {
    "id": "QB_FP_154",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Calculation of power, torque, fuel consumption, heat load and power losses",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A tractor diesel engine develops $30\\text{ kW}$ brake power with a brake specific fuel consumption (BSFC) of $240\\text{ g/(kW}\\cdot\\text{h)}$. If the calorific value of diesel is $42\\text{ MJ/kg}$, calculate the brake thermal efficiency of the engine as a percentage (round off to 1 decimal place).",
    "numerical_range": {
      "min": 35,
      "max": 36.5
    },
    "answer": 35.7,
    "correct_answer": 35.7,
    "difficulty": "Easy",
    "solution": "Brake thermal efficiency:\n$$\\eta_{\\text{bth}} = \\frac{3600}{\\text{BSFC (in kg/kW}\\cdot\\text{h)} \\times \\text{CV (in MJ/kg)}}$$\n$$\\text{BSFC} = 240\\text{ g/kW}\\cdot\\text{h} = 0.240\\text{ kg/kW}\\cdot\\text{h}$$\n$$\\eta_{\\text{bth}} = \\frac{3600}{0.240 \\times 42000} = \\frac{3600}{10080} = 0.3571 \\implies 35.71\\% \\approx 35.7\\%$$\nAcceptable range: $35.0 - 36.5\\%$.",
    "source": "Sanjay Kumar - Numerical Approach to Agricultural Engineering"
  },
  {
    "id": "QB_FP_155",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Selection, operation, maintenance and repair of I.C. engines",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "In a four-stroke diesel engine, the inlet valve opens $12^\\circ$ before top dead center (BTDC) and closes $36^\\circ$ after bottom dead center (ABDC). Calculate the total duration of the inlet valve opening in crank angle degrees.",
    "numerical_range": {
      "min": 227,
      "max": 229
    },
    "answer": 228,
    "correct_answer": 228,
    "difficulty": "Easy",
    "solution": "Total inlet valve opening period:\n$$\\theta = 12^\\circ (\\text{BTDC}) + 180^\\circ (\\text{suction stroke}) + 36^\\circ (\\text{ABDC}) = 228^\\circ$$",
    "source": "V. Ganesan - Internal Combustion Engines"
  },
  {
    "id": "QB_FP_156",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Tractor clutches and brakes",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A single dry plate clutch has two active friction surfaces with outer radius $140\\text{ mm}$ and inner radius $90\\text{ mm}$. The total axial clamping force is $2500\\text{ N}$ and the coefficient of friction is $0.35$. Assuming uniform wear theory, calculate the maximum torque that can be transmitted in $\\text{N}\\cdot\\text{m}$ (round off to 1 decimal place).",
    "numerical_range": {
      "min": 199,
      "max": 203.5
    },
    "answer": 201.3,
    "correct_answer": 201.3,
    "difficulty": "Moderate",
    "solution": "For uniform wear theory, the effective friction radius is:\n$$R_m = \\frac{R_o + R_i}{2} = \\frac{140 + 90}{2} = 115\\text{ mm} = 0.115\\text{ m}$$\nWith $n = 2$ friction surfaces, axial force $W = 2500\\text{ N}$, and $\\mu = 0.35$:\n$$T = n \\mu W R_m = 2 \\times 0.35 \\times 2500 \\times 0.115 = 201.25\\text{ N}\\cdot\\text{m} \\approx 201.3\\text{ N}\\cdot\\text{m}$$\nAcceptable range: $199.0 - 203.5\\text{ N}\\cdot\\text{m}$.",
    "source": "Liljedahl - Tractors and Their Power Units"
  },
  {
    "id": "QB_FP_157",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Tractor clutches and brakes",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "In agricultural tractors, differential brakes can be operated independently primarily to:",
    "options": {
      "A": "Assist in making sharp turns at field headlands",
      "B": "Increase the maximum road transport speed",
      "C": "Prevent engine stalling when disengaging PTO",
      "D": "Equalize front and rear axle dynamic loading"
    },
    "correct_answer": "A",
    "answer": "A",
    "difficulty": "Easy",
    "solution": "Independent left and right brake pedals allow braking the inside drive wheel during headland turns, enabling a very tight turning radius without scuffing unplowed soil.",
    "source": "Liljedahl - Tractors and Their Power Units"
  },
  {
    "id": "QB_FP_158",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Power transmission systems – gear trains, differential, final drives and power take-off",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A 2WD tractor engine operates at $2000\\text{ rpm}$. The total transmission reduction ratio between engine and rear drive wheels in 2nd low gear is $48 : 1$. The rolling radius of the rear drive tires is $0.65\\text{ m}$. Assuming zero tire slip, calculate the theoretical forward travel speed in $\\text{km/h}$ (round off to 2 decimal places).",
    "numerical_range": {
      "min": 9.9,
      "max": 10.5
    },
    "answer": 10.21,
    "correct_answer": 10.21,
    "difficulty": "Moderate",
    "solution": "Rear axle rotational speed:\n$$N_{\\text{axle}} = \\frac{N_{\\text{engine}}}{i} = \\frac{2000}{48} = 41.667\\text{ rpm}$$\nLinear forward speed:\n$$v = 2\\pi r N_{\\text{axle}} = 2\\pi \\times 0.65\\text{ m} \\times \\frac{41.667}{60}\\text{ rev/s} = 2.836\\text{ m/s}$$\nConverting to $\\text{km/h}$:\n$$v = 2.836 \\times 3.6 = 10.21\\text{ km/h}$$\nAcceptable range: $9.9 - 10.5\\text{ km/h}$.",
    "source": "Liljedahl - Tractors and Their Power Units"
  },
  {
    "id": "QB_FP_159",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Power transmission systems – gear trains, differential, final drives and power take-off",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "When a tractor operates with an unlocked conventional bevel-gear differential on slippery ground and one drive wheel completely loses traction (zero grip), the torque delivered to the other drive wheel with good traction is:",
    "options": {
      "A": "Equal to zero (or virtually zero, limited only by the spinning wheel's negligible resistance)",
      "B": "Equal to the total engine maximum torque capacity",
      "C": "Double the torque of the slipping wheel",
      "D": "Half of the input pinion torque regardless of wheel traction"
    },
    "correct_answer": "A",
    "answer": "A",
    "difficulty": "Easy",
    "solution": "A standard differential splits torque equally ($T_L = T_R$). If one wheel has virtually zero traction, it can support almost zero reaction torque, limiting torque to the opposite wheel to that same near-zero value until the differential lock is engaged.",
    "source": "Liljedahl - Tractors and Their Power Units"
  },
  {
    "id": "QB_FP_160",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Power transmission systems – gear trains, differential, final drives and power take-off",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "According to standard agricultural engineering specifications (ASABE / ISO), a standard 540 rpm PTO shaft has a nominal outside diameter of $35\\text{ mm}$ ($1\\frac{3}{8}\\text{ in}$) and possesses how many splines?",
    "options": {
      "A": "6 splines",
      "B": "21 splines",
      "C": "10 splines",
      "D": "18 splines"
    },
    "correct_answer": "A",
    "answer": "A",
    "difficulty": "Easy",
    "solution": "Standard Type 1 PTO ($540\\text{ rpm}$) has 6 splines with $35\\text{ mm}$ ($1\\frac{3}{8}\\text{ in}$) diameter. Standard Type 2 PTO ($1000\\text{ rpm}$) has 21 involute splines with $35\\text{ mm}$ diameter.",
    "source": "Liljedahl - Tractors and Their Power Units"
  },
  {
    "id": "QB_FP_161",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Mechanics of tractor chassis",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A rear-wheel drive tractor has a wheelbase of $2.1\\text{ m}$. The static weight on the front axle is $8.0\\text{ kN}$ and on the rear axle is $14.0\\text{ kN}$. A horizontal drawbar pull of $7.0\\text{ kN}$ is applied at a hitch height of $0.45\\text{ m}$ above the ground. Calculate the dynamic weight on the rear axle in $\\text{kN}$ (round off to 2 decimal places).",
    "numerical_range": {
      "min": 15.3,
      "max": 15.7
    },
    "answer": 15.5,
    "correct_answer": 15.5,
    "difficulty": "Moderate",
    "solution": "Weight transfer from front to rear axle due to drawbar pull $P$ at hitch height $h_d$ on wheelbase $L$:\n$$\\Delta W = \\frac{P \\times h_d}{L} = \\frac{7.0\\text{ kN} \\times 0.45\\text{ m}}{2.1\\text{ m}} = \\frac{3.15}{2.1} = 1.50\\text{ kN}$$\nDynamic weight on rear axle:\n$$R_{dr} = R_{sr} + \\Delta W = 14.0 + 1.50 = 15.50\\text{ kN}$$\nAcceptable range: $15.3 - 15.7\\text{ kN}$.",
    "source": "Liljedahl - Tractors and Their Power Units"
  },
  {
    "id": "QB_FP_162",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Mechanics of tractor chassis",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "For the tractor in the previous problem with wheelbase $2.1\\text{ m}$, static front axle weight $8.0\\text{ kN}$, and hitch height $0.45\\text{ m}$, calculate the critical horizontal drawbar pull in $\\text{kN}$ that will cause impending front-wheel liftoff (rearward overturning).",
    "numerical_range": {
      "min": 36.5,
      "max": 38
    },
    "answer": 37.33,
    "correct_answer": 37.33,
    "difficulty": "Moderate",
    "solution": "Front-wheel liftoff occurs when the dynamic load on the front axle drops to zero ($R_{df} = 0$).\n$$R_{df} = R_{sf} - \\frac{P \\times h_d}{L} = 0$$\n$$P_{\\text{crit}} = \\frac{R_{sf} \\times L}{h_d} = \\frac{8.0\\text{ kN} \\times 2.1\\text{ m}}{0.45\\text{ m}} = \\frac{16.8}{0.45} \\approx 37.33\\text{ kN}$$\nAcceptable range: $36.5 - 38.0\\text{ kN}$.",
    "source": "Liljedahl - Tractors and Their Power Units"
  },
  {
    "id": "QB_FP_163",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Traction theory",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A tractor travels a distance of $45.0\\text{ m}$ in $10\\text{ revolutions}$ of its rear drive wheels under zero-slip (no-load) condition on concrete. When pulling a heavy subsoiler in a tilled field, the tractor advances only $36.0\\text{ m}$ in the same $10\\text{ revolutions}$ of the drive wheels. Calculate the wheel slip as a percentage.",
    "numerical_range": {
      "min": 19.5,
      "max": 20.5
    },
    "answer": 20,
    "correct_answer": 20,
    "difficulty": "Easy",
    "solution": "Wheel slip is defined as:\n$$S = \\frac{s_0 - s_1}{s_0} \\times 100 = \\frac{45.0 - 36.0}{45.0} \\times 100 = \\frac{9.0}{45.0} \\times 100 = 20.0\\%$$\nAcceptable range: $19.5 - 20.5\\%$.",
    "source": "Liljedahl - Tractors and Their Power Units"
  },
  {
    "id": "QB_FP_164",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Traction theory",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following statements regarding tractive efficiency and traction mechanics of agricultural tractors are CORRECT?",
    "options": {
      "A": "Tractive efficiency is defined as the ratio of drawbar power to axle power delivered to the drive wheels.",
      "B": "Tractive efficiency reaches zero at both $0\\%$ slip (zero net pull) and $100\\%$ slip (zero forward velocity).",
      "C": "On firm cohesive soils, optimum tractive efficiency for 2WD tractors typically occurs in the slip range of $8\\%$ to $15\\%$.",
      "D": "Ballasting drive wheels always increases rolling resistance without any effect on dynamic traction coefficient."
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
    "solution": "Statements A, B, and C are correct:\n- Tractive efficiency $\\eta_t = P_{db} / P_{axle} = (P \\cdot v) / (T \\cdot \\omega)$.\n- At zero slip, net pull is zero; at 100% slip, forward speed is zero, so $\\eta_t = 0$ at both extremes.\n- Optimum tractive efficiency occurs between 8% and 15% slip on firm soil (10-18% on tilled soil).\n- Statement D is false: proper ballast increases dynamic weight and available tractive pull, significantly improving traction coefficient on firm soil.",
    "source": "Liljedahl - Tractors and Their Power Units"
  },
  {
    "id": "QB_FP_165",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Traction theory",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A 4-wheel tractor weighing $28\\text{ kN}$ travels over soft tilled soil with a coefficient of rolling resistance $C_{rr} = 0.12$. Calculate the total rolling (motion) resistance force experienced by the tractor in $\\text{kN}$ (round off to 2 decimal places).",
    "numerical_range": {
      "min": 3.3,
      "max": 3.45
    },
    "answer": 3.36,
    "correct_answer": 3.36,
    "difficulty": "Easy",
    "solution": "Total rolling resistance force:\n$$R_r = C_{rr} \\times W = 0.12 \\times 28\\text{ kN} = 3.36\\text{ kN}$$",
    "source": "Liljedahl - Tractors and Their Power Units"
  },
  {
    "id": "QB_FP_166",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Three point hitches – free link and restrained link operations",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following statements regarding tractor three-point hitch operation modes are CORRECT?",
    "options": {
      "A": "In position control mode, the hydraulic lift arms hold the implement at a constant depth relative to the tractor chassis.",
      "B": "In draft control mode, the hydraulic system senses implement draft and raises or lowers the implement to maintain a pre-set draft force.",
      "C": "Draft control is especially advantageous when plowing through undulating ground with varying soil textures.",
      "D": "Restrained link operation relies entirely on implement gauge wheels to determine depth with no hydraulic pressure in the rockshaft cylinder."
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
    "solution": "Statements A, B, and C are correct definitions and applications of position and draft control modes in three-point hitches. Statement D is incorrect: in restrained-link operation, depth and weight transfer are controlled through hydraulic oil held in the tractor rockshaft ram cylinder.",
    "source": "Liljedahl - Tractors and Their Power Units"
  },
  {
    "id": "QB_FP_167",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Three point hitches – free link and restrained link operations",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "In mechanical draft sensing systems of modern agricultural tractors, the draft force is most commonly sensed through deflection of springs or torsion bars located at:",
    "options": {
      "A": "The top link connection or lower draft links",
      "B": "The front axle pivot pin",
      "C": "The engine flywheel ring gear",
      "D": "The steering tie rods"
    },
    "correct_answer": "A",
    "answer": "A",
    "difficulty": "Easy",
    "solution": "Draft sensing is achieved by measuring the compressive/tensile forces transmitted either through the top link hitch bracket or through the cross-shaft/flexing bar of the two lower draft links.",
    "source": "Liljedahl - Tractors and Their Power Units"
  },
  {
    "id": "QB_FP_168",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Steering and hydraulic control systems used in tractors",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "In an open-center tractor hydraulic system, when all control valves are in neutral (no actuator being operated), the hydraulic fluid pumped by the pump:",
    "options": {
      "A": "Passes freely through the open center of the valves back to the reservoir at low pressure",
      "B": "Is blocked, causing system pressure to build up to the relief valve setting",
      "C": "Is trapped inside the hydraulic cylinder to maintain lock",
      "D": "Is diverted directly to the engine cooling circuit"
    },
    "correct_answer": "A",
    "answer": "A",
    "difficulty": "Easy",
    "solution": "In an open-center circuit, the fixed-displacement pump delivers constant flow that circulates back to the sump at negligible pressure through the open center passage of the valve bank when all spools are centered.",
    "source": "Liljedahl - Tractors and Their Power Units"
  },
  {
    "id": "QB_FP_169",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Steering and hydraulic control systems used in tractors",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A tractor hydraulic lift cylinder has a bore diameter of $80\\text{ mm}$. The hydraulic system relief valve is set at $16\\text{ MPa}$. Neglecting friction and seal drag, calculate the maximum lifting force exerted by the piston in $\\text{kN}$ (round off to 2 decimal places).",
    "numerical_range": {
      "min": 80,
      "max": 81
    },
    "answer": 80.42,
    "correct_answer": 80.42,
    "difficulty": "Moderate",
    "solution": "Piston cross-sectional area:\n$$A = \\frac{\\pi}{4} d^2 = \\frac{\\pi}{4} (0.080\\text{ m})^2 = 5.0265 \\times 10^{-3}\\text{ m}^2$$\nMaximum thrust force:\n$$F = P \\times A = 16 \\times 10^6\\text{ Pa} \\times 5.0265 \\times 10^{-3}\\text{ m}^2 = 80424.8\\text{ N} \\approx 80.42\\text{ kN}$$\nAcceptable range: $80.0 - 81.0\\text{ kN}$.",
    "source": "Liljedahl - Tractors and Their Power Units"
  },
  {
    "id": "QB_FP_170",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Tractor tests and performance",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Under standard OECD and BIS Tractor Test Codes, which of the following performance tests are MANDATORY for official tractor type approval?",
    "options": {
      "A": "Main PTO power and fuel consumption test",
      "B": "Drawbar power and wheel slip test on concrete test track",
      "C": "Hydraulic lift capacity and relief valve pressure test",
      "D": "High-speed desert endurance run exceeding $100\\text{ km/h}$"
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
    "solution": "OECD / BIS standard test codes mandate tests for PTO power and fuel consumption, drawbar power and slip on a standardized concrete track, hydraulic lift capacity at hitch points, braking, and noise levels. High-speed racing tests are not part of tractor test codes.",
    "source": "Liljedahl - Tractors and Their Power Units"
  },
  {
    "id": "QB_FP_171",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Tractor tests and performance",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "During an OECD drawbar test on concrete track, a tractor delivers a steady drawbar pull of $18.0\\text{ kN}$ at a travel speed of $5.4\\text{ km/h}$ ($1.5\\text{ m/s}$). During a 1-hour test run, the tractor consumes $7.2\\text{ kg}$ of diesel fuel. Calculate the specific drawbar fuel consumption in $\\text{g/(kW}\\cdot\\text{h)}$ (round off to 1 decimal place).",
    "numerical_range": {
      "min": 264,
      "max": 270
    },
    "answer": 266.7,
    "correct_answer": 266.7,
    "difficulty": "Moderate",
    "solution": "Drawbar power developed:\n$$P_{db} = P \\times v = 18.0\\text{ kN} \\times 1.5\\text{ m/s} = 27.0\\text{ kW}$$\nFuel consumption rate $\\dot{m}_f = 7.2\\text{ kg/h} = 7200\\text{ g/h}$.\nSpecific drawbar fuel consumption:\n$$\\text{SDFC} = \\frac{7200\\text{ g/h}}{27.0\\text{ kW}} \\approx 266.67\\text{ g/(kW}\\cdot\\text{h)}$$\nAcceptable range: $264.0 - 270.0\\text{ g/(kW}\\cdot\\text{h)}$.",
    "source": "Liljedahl - Tractors and Their Power Units"
  },
  {
    "id": "QB_FP_172",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Human engineering and safety considerations in design of tractor and agricultural implements",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "The Roll-Over Protective Structure (ROPS) fitted on modern agricultural tractors is primarily engineered to:",
    "options": {
      "A": "Provide a safe operator survival zone (deflection-limiting volume) during tractor rollover",
      "B": "Increase the aerodynamic drag coefficient during road transport",
      "C": "Act as an exhaust silencer and spark arrester for the engine",
      "D": "Support the battery and hydraulic steering pump"
    },
    "correct_answer": "A",
    "answer": "A",
    "difficulty": "Easy",
    "solution": "ROPS is an engineered structural frame designed to absorb energy during tractor overturn, preserving a clearance zone (operator deflection-limiting volume) to protect the seat-belted driver from being crushed.",
    "source": "Liljedahl - Tractors and Their Power Units"
  },
  {
    "id": "QB_FP_173",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Human engineering and safety considerations in design of tractor and agricultural implements",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "According to ISO 2631 human vibration guidelines, the human body is most sensitive to whole-body vertical ($z$-axis) vibration in the frequency range of:",
    "options": {
      "A": "$4\\text{ to } 8\\text{ Hz}$",
      "B": "$20\\text{ to } 35\\text{ Hz}$",
      "C": "$50\\text{ to } 75\\text{ Hz}$",
      "D": "$100\\text{ to } 150\\text{ Hz}$"
    },
    "correct_answer": "A",
    "answer": "A",
    "difficulty": "Easy",
    "solution": "The human spinal column and viscera exhibit primary mechanical resonance to vertical ($z$-axis) vibrations in the frequency band of $4 - 8\\text{ Hz}$, which matches the typical ride vibrations of un-suspended tractors.",
    "source": "Liljedahl - Tractors and Their Power Units"
  },
  {
    "id": "QB_FP_174",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Type, selection, maintenance and repair of tractors and power tillers",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A power tiller rotary unit has a rotor width of $60\\text{ cm}$ and operates at a forward speed of $1.8\\text{ km/h}$ ($0.5\\text{ m/s}$) to a depth of $10\\text{ cm}$. If the rotary tiller requires a specific work of $120\\text{ kJ/m}^3$ of soil cut, calculate the net rotary shaft power required in $\\text{kW}$ (round off to 2 decimal places).",
    "numerical_range": {
      "min": 3.5,
      "max": 3.7
    },
    "answer": 3.6,
    "correct_answer": 3.6,
    "difficulty": "Moderate",
    "solution": "Volume rate of soil cut:\n$$\\dot{V} = w \\times d \\times v = 0.60\\text{ m} \\times 0.10\\text{ m} \\times 0.5\\text{ m/s} = 0.030\\text{ m}^3/\\text{s}$$\nNet power required:\n$$P = \\text{Specific work} \\times \\dot{V} = 120\\text{ kJ/m}^3 \\times 0.030\\text{ m}^3/\\text{s} = 3.60\\text{ kW}$$",
    "source": "Ojha & Michael - Principles of Agricultural Engineering Vol 1"
  },
  {
    "id": "QB_FP_175",
    "section": "Section 3: Farm Power",
    "topic": "Farm Power",
    "subtopic": "Mechanics of tractor chassis",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A tractor has a wheel tread width (center-to-center distance between rear wheels) of $1.50\\text{ m}$. The height of the center of gravity (CG) above ground level is $0.75\\text{ m}$. Assuming symmetric lateral weight distribution, calculate the critical static sideways slope angle in degrees at which lateral overturn will occur.",
    "numerical_range": {
      "min": 44.5,
      "max": 45.5
    },
    "answer": 45,
    "correct_answer": 45,
    "difficulty": "Easy",
    "solution": "Lateral overturning occurs when the line of action of gravity through the CG passes outside the downhill tire contact point.\n$$\\tan(\\theta_{\\text{crit}}) = \\frac{T/2}{h_{cg}} = \\frac{1.50 / 2}{0.75} = \\frac{0.75}{0.75} = 1.0$$\n$$\\theta_{\\text{crit}} = \\arctan(1.0) = 45.0^\\circ$$",
    "source": "Liljedahl - Tractors and Their Power Units"
  }
];
