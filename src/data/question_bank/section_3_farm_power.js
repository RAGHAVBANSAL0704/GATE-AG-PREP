export default 
[
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
  }
];
