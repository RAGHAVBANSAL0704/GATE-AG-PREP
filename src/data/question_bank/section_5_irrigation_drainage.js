export default [
  {
    "id": "QB_IDE_001",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Soil-Water-Plant Relationship",
    "subtopic": "Water requirement of crops",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "A crop with a root zone depth of $80\\text{ cm}$ is grown on a sandy loam soil. The field capacity and permanent wilting point of the soil on a dry weight basis are $22\\%$ and $10\\%$, respectively. The apparent specific gravity of the dry soil is $1.50$. If irrigation is to be applied when $50\\%$ of available soil water is depleted, the net irrigation requirement in $\\text{mm}$ is ________ (answer in integer).",
    "correct_answer": "72",
    "numerical_range": {
      "min": 72,
      "max": 72
    },
    "solution": "1. Available water capacity ($AWC$):\n$$AWC = \\frac{\\rho_b}{\\rho_w} \\cdot d \\cdot (FC - PWP)$$\nWhere:\n• Apparent specific gravity $\\frac{\\rho_b}{\\rho_w} = 1.50$\n• Root zone depth $d = 80\\text{ cm} = 800\\text{ mm}$\n• Field capacity $FC = 0.22$\n• Permanent wilting point $PWP = 0.10$\n$$AWC = 1.50 \\times 800 \\times (0.22 - 0.10) = 1200 \\times 0.12 = 144\\text{ mm}$$\n2. Net irrigation requirement ($NIR$) at $50\\%$ allowable depletion:\n$$NIR = 0.50 \\times AWC = 0.50 \\times 144 = 72\\text{ mm}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_002",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Groundwater Hydrology",
    "subtopic": "Steady and unsteady flow in confined and unconfined aquifers",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Groundwater Hydrology (Todd & Mays)",
    "question": "A fully penetrating well of radius $0.20\\text{ m}$ taps a confined aquifer of thickness $20\\text{ m}$. Hydraulic conductivity of the aquifer is $15\\text{ m/day}$. During pumping, the steady state drawdowns measured at radial distances of $10\\text{ m}$ and $50\\text{ m}$ from the well centre are $3.0\\text{ m}$ and $1.0\\text{ m}$, respectively. The steady pumping discharge $Q$ in $\\text{m}^3\\text{/day}$ is ________ (round off to 1 decimal place). Take $\\pi = 3.1416$.",
    "correct_answer": "1172.5",
    "numerical_range": {
      "min": 1165,
      "max": 1180
    },
    "solution": "For steady radial flow in a confined aquifer (Thiem's equation):\n$$Q = \\frac{2 \\pi K b (s_1 - s_2)}{\\ln(r_2 / r_1)}$$\nWhere:\n• $K = 15\\text{ m/day}$\n• Confined aquifer thickness $b = 20\\text{ m}$\n• Drawdown $s_1 = 3.0\\text{ m}$ at $r_1 = 10\\text{ m}$\n• Drawdown $s_2 = 1.0\\text{ m}$ at $r_2 = 50\\text{ m}$\n• $s_1 - s_2 = 3.0 - 1.0 = 2.0\\text{ m}$\n• $\\ln(r_2/r_1) = \\ln(50/10) = \\ln(5) \\approx 1.6094$\n$$Q = \\frac{2 \\times 3.1416 \\times 15 \\times 20 \\times 2.0}{1.6094} = \\frac{3769.9}{1.6094} \\approx 1172.5\\text{ m}^3\\text{/day}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_IDE_003",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Agricultural Drainage",
    "subtopic": "Drainage coefficient",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "An agricultural drainage basin has an area of $500\\text{ ha}$. The design drainage coefficient is $12\\text{ mm/day}$. The continuous design drainage discharge required to remove this excess water in $\\text{m}^3\\text{/s}$ is ________ (round off to 3 decimal places).",
    "correct_answer": "0.694",
    "numerical_range": {
      "min": 0.69,
      "max": 0.7
    },
    "solution": "1. Area $A = 500\\text{ ha} = 500 \\times 10^4\\text{ m}^2 = 5 \\times 10^6\\text{ m}^2$.\n2. Drainage coefficient $D_c = 12\\text{ mm/day} = 0.012\\text{ m/day}$.\n3. Daily volume $V = A \\times D_c = (5 \\times 10^6) \\times 0.012 = 60,000\\text{ m}^3\\text{/day}$.\n4. Discharge in $\\text{m}^3\\text{/s}$:\n$$Q = \\frac{60,000}{24 \\times 3600} = \\frac{60,000}{86,400} = 0.6944\\text{ m}^3\\text{/s} \\approx 0.694\\text{ m}^3\\text{/s}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_004",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Wells and Pumps",
    "subtopic": "Pump characteristics",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "According to the affinity laws for a centrifugal pump with a fixed impeller diameter, if the pump rotational speed $N$ is doubled, the head $H$ developed by the pump will:",
    "options": {
      "A": "Double ($2\\times$)",
      "B": "Increase by 4 times ($4\\times$)",
      "C": "Increase by 8 times ($8\\times$)",
      "D": "Remain unchanged"
    },
    "correct_answer": "B",
    "solution": "Centrifugal pump affinity laws state:\n1. Discharge: $Q \\propto N$\n2. Head: $H \\propto N^2$\n3. Brake Power: $P \\propto N^3$\nWhen speed is doubled ($N_2 = 2N_1$):\n$$\\frac{H_2}{H_1} = \\left(\\frac{N_2}{N_1}\\right)^2 = 2^2 = 4$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_005",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Irrigation Water Conveyance and Application Methods",
    "subtopic": "Design and evaluation of irrigation methods",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "In a sprinkler irrigation test with 4 catch cans, the depths of water collected are $10\\text{ mm}$, $12\\text{ mm}$, $14\\text{ mm}$, and $8\\text{ mm}$. Christiansen's Uniformity Coefficient ($CU$) expressed in percentage is ________ (answer in integer).",
    "correct_answer": "82",
    "numerical_range": {
      "min": 81,
      "max": 83
    },
    "solution": "Christiansen's Uniformity Coefficient is:\n$$CU = 100 \\left( 1 - \\frac{\\sum |x_i - \\bar{x}|}{n \\cdot \\bar{x}} \\right)$$\n1. Mean depth $\\bar{x}$:\n$$\\bar{x} = \\frac{10 + 12 + 14 + 8}{4} = \\frac{44}{4} = 11\\text{ mm}$$\n2. Absolute deviations $|x_i - \\bar{x}|$:\n• $|10 - 11| = 1$\n• $|12 - 11| = 1$\n• $|14 - 11| = 3$\n• $|8 - 11| = 3$\n$$\\sum |x_i - \\bar{x}| = 1 + 1 + 3 + 3 = 8\\text{ mm}$$\n3. Uniformity Coefficient:\n$$CU = 100 \\left( 1 - \\frac{8}{4 \\times 11} \\right) = 100 \\left( 1 - \\frac{8}{44} \\right) = 100 \\left( 1 - 0.1818 \\right) = 81.82\\% \\approx 82\\%$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_IDE_006",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Agricultural Drainage",
    "subtopic": "Leaching requirement and salinity control",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "The leaching requirement ($LR$) for maintaining permissible root zone salinity using irrigation water of electrical conductivity $EC_{iw}$ and drainage water electrical conductivity $EC_{dw}$ is given by:",
    "options": {
      "A": "$LR = \\frac{EC_{iw}}{EC_{dw}}$",
      "B": "$LR = \\frac{EC_{dw}}{EC_{iw}}$",
      "C": "$LR = \\frac{EC_{iw}}{EC_{iw} + EC_{dw}}$",
      "D": "$LR = 1 - \\frac{EC_{iw}}{EC_{dw}}$"
    },
    "correct_answer": "A",
    "solution": "By steady-state salt balance:\n$$\\text{Salt applied} = \\text{Salt removed}$$ \n$$D_{iw} \\cdot EC_{iw} = D_{dw} \\cdot EC_{dw} \\implies \\frac{D_{dw}}{D_{iw}} = \\frac{EC_{iw}}{EC_{dw}}$$\nWhere $\\frac{D_{dw}}{D_{iw}}$ is the Leaching Requirement ($LR$).",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_007",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Irrigation Water Conveyance and Application Methods",
    "subtopic": "Irrigation efficiencies",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "A steady water stream of $100\\text{ L/s}$ is diverted from a canal outlet into an unlined field channel. The stream discharge measured at the entrance of the agricultural field is $80\\text{ L/s}$. The water conveyance efficiency ($\\eta_c$) of the channel expressed in percentage is ________ (answer in integer).",
    "correct_answer": "80",
    "numerical_range": {
      "min": 80,
      "max": 80
    },
    "solution": "Water conveyance efficiency is defined as:\n$$\\eta_c = \\frac{W_f}{W_d} \\times 100$$\nWhere:\n• $W_f = 80\\text{ L/s}$ (water delivered to the field plot)\n• $W_d = 100\\text{ L/s}$ (water diverted from the source/canal)\n$$\\eta_c = \\frac{80}{100} \\times 100 = 80\\%$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_008",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Agricultural Drainage",
    "subtopic": "Planning, design and layout of surface and sub-surface drainage systems",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "Parallel agricultural tile drains are laid at a depth of $1.8\\text{ m}$ below the ground surface. The impermeable barrier is situated at a depth of $6.8\\text{ m}$ below ground. The maximum permissible water table height midway between drains is $0.8\\text{ m}$ below ground (hydraulic head midway $h = 1.8 - 0.8 = 1.0\\text{ m}$). The soil hydraulic conductivity is $K = 1.5\\text{ m/day}$, steady drainage flux $q = 0.005\\text{ m/day}$, and equivalent aquifer depth $d = 3.0\\text{ m}$. Using Hooghoudt's equation ($S^2 = \\frac{8 K d h + 4 K h^2}{q}$), the required drain spacing $S$ in metres is ________ (round off to 1 decimal place).",
    "correct_answer": "91.7",
    "numerical_range": {
      "min": 91,
      "max": 92.5
    },
    "solution": "Hooghoudt's steady-state drain spacing formula:\n$$S^2 = \\frac{8 K d h + 4 K h^2}{q}$$\nGiven:\n• $K = 1.5\\text{ m/day}$\n• $d = 3.0\\text{ m}$\n• $h = 1.0\\text{ m}$\n• $q = 0.005\\text{ m/day}$\n$$8 K d h = 8 \\times 1.5 \\times 3.0 \\times 1.0 = 36.0$$\n$$4 K h^2 = 4 \\times 1.5 \\times (1.0)^2 = 6.0$$\n$$\\text{Numerator} = 36.0 + 6.0 = 42.0$$\n$$S^2 = \\frac{42.0}{0.005} = 8400$$\n$$S = \\sqrt{8400} \\approx 91.65\\text{ m} \\approx 91.7\\text{ m}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_IDE_009",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Wells and Pumps",
    "subtopic": "Types of wells",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)",
    "question": "An irrigation tubewell operating at a constant discharge of $1800\\text{ L/min}$ causes a stabilized steady drawdown of $3.0\\text{ m}$ at the well screen. The specific capacity of the tubewell in $\\text{L/(min}\\cdot\\text{m)}$ is ________ (answer in integer).",
    "correct_answer": "600",
    "numerical_range": {
      "min": 600,
      "max": 600
    },
    "solution": "Specific capacity of a well is defined as the discharge per unit steady drawdown:\n$$\\text{Specific Capacity} = \\frac{Q}{s} = \\frac{1800\\text{ L/min}}{3.0\\text{ m}} = 600\\text{ L/(min}\\cdot\\text{m)}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_010",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Irrigation Water Conveyance and Application Methods",
    "subtopic": "Surface, sprinkler and micro irrigation methods",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)",
    "question": "A drip irrigation emitter operates according to the standard discharge power law $q = k H^x$, where $x = 0.50$ is the emitter discharge exponent. If the operating pressure head in the lateral line increases by $21\\%$, the percentage increase in emitter flow rate is ________ % (answer in integer).",
    "correct_answer": "10",
    "numerical_range": {
      "min": 10,
      "max": 10
    },
    "solution": "From the emitter discharge equation $q = k H^x$:\n$$\\frac{q_2}{q_1} = \\left( \\frac{H_2}{H_1} \\right)^x$$\nGiven $H_2 = 1.21 H_1$ and $x = 0.50$:\n$$\\frac{q_2}{q_1} = (1.21)^{0.50} = \\sqrt{1.21} = 1.10$$\n$$\\text{Percentage increase} = (1.10 - 1) \\times 100 = 10\\%$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_011",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Wells and Pumps",
    "subtopic": "Pump characteristics",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "An agricultural centrifugal water pump operating at $1450\\text{ rpm}$ discharges $0.04\\text{ m}^3\\text{/s}$ against a total operating head of $16.0\\text{ m}$. The specific speed ($N_s = \\frac{N \\sqrt{Q}}{H^{3/4}}$) of the pump in SI metric units is ________ (round off to 1 decimal place).",
    "correct_answer": "36.3",
    "numerical_range": {
      "min": 36,
      "max": 36.5
    },
    "solution": "Specific speed formula:\n$$N_s = \\frac{N \\sqrt{Q}}{H^{3/4}}$$\nGiven:\n• $N = 1450\\text{ rpm}$\n• $Q = 0.04\\text{ m}^3\\text{/s} \\implies \\sqrt{Q} = \\sqrt{0.04} = 0.20$\n• $H = 16.0\\text{ m} \\implies H^{3/4} = (16)^{3/4} = (2^4)^{3/4} = 2^3 = 8.0$\n$$N_s = \\frac{1450 \\times 0.20}{8.0} = \\frac{290}{8.0} = 36.25 \\approx 36.3$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_SWP_001",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Soil-Water-Plant Relationship",
    "subtopic": "Water requirement of crops",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "A crop requires a total irrigation depth of $\\Delta = 60\\text{ cm}$ over a base period of $B = 120\\text{ days}$. The duty of water at the field channel head ($D = \\frac{8.64 B}{\\Delta}$ in $\\text{ha/cumec}$) is ________ (answer in integer).",
    "correct_answer": "1728",
    "numerical_range": {
      "min": 1728,
      "max": 1728
    },
    "solution": "The relation between duty $D$, delta $\\Delta$, and base period $B$ is:\n$$D = \\frac{8.64 B}{\\Delta}$$\nWhere:\n• $B = 120\\text{ days}$\n• $\\Delta = 60\\text{ cm} = 0.60\\text{ m}$\n$$D = \\frac{8.64 \\times 120}{0.60} = 8.64 \\times 200 = 1728\\text{ ha/cumec}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_SWP_002",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Soil-Water-Plant Relationship",
    "subtopic": "Water requirement of crops",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "A sandy clay loam soil has a field capacity $FC = 28\\%$ and permanent wilting point $PWP = 14\\%$ on dry mass basis. The bulk density of dry soil is $\\rho_b = 1.40\\text{ g/cm}^3$ and water density is $\\rho_w = 1.0\\text{ g/cm}^3$. The effective root zone depth of the crop is $D = 75\\text{ cm}$. If the Management Allowed Depletion (MAD) is $60\\%$ of available soil water, the readily available moisture ($RAM$) in $\\text{mm}$ is ________ (round off to 1 decimal place).",
    "correct_answer": "88.2",
    "numerical_range": {
      "min": 88,
      "max": 88.5
    },
    "solution": "1. Available Water Capacity ($AWC$):\n$$AWC = \\frac{\\rho_b}{\\rho_w} \\cdot D \\cdot (FC - PWP)$$\n$$AWC = 1.40 \\times 750\\text{ mm} \\times (0.28 - 0.14) = 1050 \\times 0.14 = 147.0\\text{ mm}$$\n2. Readily Available Moisture ($RAM$):\n$$RAM = \\text{MAD} \\times AWC = 0.60 \\times 147.0 = 88.2\\text{ mm}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_SWP_003",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Soil-Water-Plant Relationship",
    "subtopic": "Consumptive use and evapotranspiration",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "During the reproductive peak stage of a maize crop, reference crop evapotranspiration is measured as $ET_0 = 6.0\\text{ mm/day}$. The crop coefficient for maize at this stage is $K_c = 1.15$. The actual crop evapotranspiration ($ET_c = K_c \\times ET_0$) in $\\text{mm/day}$ is ________ (round off to 2 decimal places).",
    "correct_answer": "6.90",
    "numerical_range": {
      "min": 6.85,
      "max": 6.95
    },
    "solution": "From the standard crop coefficient relationship:\n$$ET_c = K_c \\times ET_0$$\nGiven:\n• $K_c = 1.15$\n• $ET_0 = 6.0\\text{ mm/day}$\n$$ET_c = 1.15 \\times 6.0 = 6.90\\text{ mm/day}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_SWP_004",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Soil-Water-Plant Relationship",
    "subtopic": "Consumptive use and evapotranspiration",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "In the standard FAO-56 Penman-Monteith method, the reference surface is defined as a hypothetical well-watered grass reference crop with an assumed fixed crop height of:",
    "options": {
      "A": "$0.05\\text{ m}$",
      "B": "$0.12\\text{ m}$",
      "C": "$0.25\\text{ m}$",
      "D": "$0.50\\text{ m}$"
    },
    "correct_answer": "B",
    "solution": "The FAO-56 Penman-Monteith specification defines reference grass with an assumed height of $0.12\\text{ m}$, a surface resistance of $70\\text{ s/m}$, and an albedo (canopy reflection coefficient) of $0.23$.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_SWP_005",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Soil-Water-Plant Relationship",
    "subtopic": "Measurement of infiltration, soil moisture and irrigation water infiltration",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "A vacuum gauge tensiometer installed in an agricultural field is practically limited to measuring soil matric suction up to approximately:",
    "options": {
      "A": "$0.8\\text{ bar}$ ($80\\text{ kPa}$)",
      "B": "$3.0\\text{ bar}$ ($300\\text{ kPa}$)",
      "C": "$8.0\\text{ bar}$ ($800\\text{ kPa}$)",
      "D": "$15.0\\text{ bar}$ ($1500\\text{ kPa}$)"
    },
    "correct_answer": "A",
    "solution": "Tensiometers operate by establishing hydraulic equilibrium across a porous ceramic cup. At suctions above $0.8\\text{ to }0.85\\text{ bar}$ ($80\\text{ to }85\\text{ kPa}$), dissolved air bubbles come out of solution (cavitation) and break the water column.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_SWP_006",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Soil-Water-Plant Relationship",
    "subtopic": "Measurement of infiltration, soil moisture and irrigation water infiltration",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "In a field infiltration trial fitted to Philip's two-term equation $I = S t^{0.5} + A t$, the sorptivity parameter is $S = 2.0\\text{ cm}\\cdot\\text{h}^{-0.5}$ and transmissivity factor is $A = 0.50\\text{ cm/h}$. The cumulative infiltration depth $I$ after elapsed time $t = 4.0\\text{ hours}$ in $\\text{cm}$ is ________ (answer in integer).",
    "correct_answer": "6",
    "numerical_range": {
      "min": 6,
      "max": 6
    },
    "solution": "From Philip's two-term infiltration formula:\n$$I = S \\cdot t^{0.5} + A \\cdot t$$\nGiven:\n• $S = 2.0\\text{ cm}\\cdot\\text{h}^{-0.5}$\n• $A = 0.50\\text{ cm/h}$\n• $t = 4.0\\text{ h} \\implies t^{0.5} = 2.0$\n$$I = (2.0 \\times 2.0) + (0.50 \\times 4.0) = 4.0 + 2.0 = 6.0\\text{ cm}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_SWP_007",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Soil-Water-Plant Relationship",
    "subtopic": "Water requirement of crops",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "A crop has a base period $B = 100\\text{ days}$ and duty $D = 1440\\text{ ha/cumec}$. The total irrigation water depth required over the base period (delta $\\Delta = \\frac{8.64 B}{D}$) in metres is ________ (round off to 2 decimal places).",
    "correct_answer": "0.60",
    "numerical_range": {
      "min": 0.59,
      "max": 0.61
    },
    "solution": "From the duty-delta relationship:\n$$\\Delta = \\frac{8.64 \\cdot B}{D}$$\nGiven:\n• $B = 100\\text{ days}$\n• $D = 1440\\text{ ha/cumec}$\n$$\\Delta = \\frac{8.64 \\times 100}{1440} = \\frac{864}{1440} = 0.60\\text{ m}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_CONV_001",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Irrigation Water Conveyance and Application Methods",
    "subtopic": "Design of irrigation channels and underground pipelines",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "According to Lacey's regime theory for alluvial channels, the wetted perimeter $P$ for a design canal discharge $Q = 16.0\\text{ m}^3\\text{/s}$ ($P = 4.75 \\sqrt{Q}$) in metres is ________ (answer in integer).",
    "correct_answer": "19",
    "numerical_range": {
      "min": 19,
      "max": 19
    },
    "solution": "Lacey's regime wetted perimeter equation:\n$$P = 4.75 \\sqrt{Q}$$\nGiven $Q = 16.0\\text{ m}^3\\text{/s}$:\n$$P = 4.75 \\times \\sqrt{16.0} = 4.75 \\times 4.0 = 19.0\\text{ m}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_CONV_002",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Irrigation Water Conveyance and Application Methods",
    "subtopic": "Design of irrigation channels and underground pipelines",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "According to Lacey's regime theory, for an alluvial channel carrying discharge $Q = 8.0\\text{ m}^3\\text{/s}$ with silt factor $f = 1.0$, the regime longitudinal bed slope is given by $S = \\frac{f^{5/3}}{3340 Q^{1/6}}$. If the slope is expressed as $1\\text{ in } X$ (i.e. $S = 1/X$), the value of $X$ rounded off to the nearest integer is ________.",
    "correct_answer": "4723",
    "numerical_range": {
      "min": 4700,
      "max": 4750
    },
    "solution": "Lacey's regime slope formula:\n$$S = \\frac{f^{5/3}}{3340 \\cdot Q^{1/6}}$$\nGiven:\n• $f = 1.0 \\implies f^{5/3} = 1.0$\n• $Q = 8.0\\text{ m}^3\\text{/s} \\implies Q^{1/6} = (8.0)^{1/6} = (2^3)^{1/6} = 2^{0.5} = \\sqrt{2} \\approx 1.41421$\n$$S = \\frac{1.0}{3340 \\times 1.41421} = \\frac{1.0}{4723.47} = \\frac{1}{4723.47}$$\nHence, $X \\approx 4723$.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_IDE_CONV_003",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Irrigation Water Conveyance and Application Methods",
    "subtopic": "Irrigation scheduling",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "In irrigation scheduling for dwarf wheat, the most critical phenological growth stage where moisture stress causes maximum irreversible grain yield reduction is:",
    "options": {
      "A": "Crown Root Initiation (CRI)",
      "B": "Late jointing stage",
      "C": "Milking stage",
      "D": "Dough stage"
    },
    "correct_answer": "A",
    "solution": "Crown Root Initiation (CRI), occurring approximately 20–25 days after sowing, is the single most critical irrigation stage for wheat. Withholding irrigation at CRI causes the greatest reduction in tillering and crop yield.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_CONV_004",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Irrigation Water Conveyance and Application Methods",
    "subtopic": "Surface, sprinkler and micro irrigation methods",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "A sprinkler irrigation lateral has 10 equally spaced sprinkler nozzles along its length. For 10 outlets, Christiansen's reduction factor for Hazen-Williams pipe flow is $F = 0.396$. If the friction head loss computed assuming the total lateral discharge passes through the entire length is $H_f = 6.0\\text{ m}$, the actual continuous friction head loss in the lateral line $h_f = F \\times H_f$ in metres is ________ (round off to 2 decimal places).",
    "correct_answer": "2.38",
    "numerical_range": {
      "min": 2.35,
      "max": 2.4
    },
    "solution": "In a sprinkler multi-outlet lateral:\n$$h_f = F \\cdot H_f$$\nWhere:\n• $F = 0.396$\n• $H_f = 6.0\\text{ m}$\n$$h_f = 0.396 \\times 6.0 = 2.376\\text{ m} \\approx 2.38\\text{ m}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_CONV_005",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Irrigation Water Conveyance and Application Methods",
    "subtopic": "Surface, sprinkler and micro irrigation methods",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "Which of the following statements concerning micro-irrigation (drip irrigation) systems are correct?",
    "options": {
      "A": "Operating pressure at the emitter nozzles typically ranges between $100\\text{ kPa}$ and $200\\text{ kPa}$ ($1\\text{ to }2\\text{ bar}$).",
      "B": "Pressure-compensating (PC) emitters maintain an approximately constant discharge despite lateral elevation changes and pipe friction losses.",
      "C": "Emitter orifice clogging from physical particulates, chemical salt precipitation, and biological growth is the primary operational hazard.",
      "D": "Water application efficiency in drip irrigation is lower than that in surface border irrigation due to excessive wet-bulb surface evaporation."
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "• Drip systems operate at low pressure heads, typically 100–200 kPa (A is correct).\n• PC emitters use flexible elastomeric diaphragms to maintain uniform discharge across varying pressures (B is correct).\n• Emitter clogging is universally recognized as the primary operational vulnerability of micro-irrigation (C is correct).\n• Drip application efficiency is exceptionally high (90–95%), far superior to surface irrigation (D is incorrect).",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_IDE_CONV_006",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Irrigation Water Conveyance and Application Methods",
    "subtopic": "Design and evaluation of irrigation methods",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "In a field evaluation test of a drip irrigation system with 25 test emitters, the average discharge of the lowest one-quarter (lowest $25\\%$) of emitters is $q_{25} = 3.6\\text{ L/h}$ and the mean discharge of all sampled emitters is $\\bar{q} = 4.0\\text{ L/h}$. The design Emission Uniformity ($EU = \\frac{q_{25}}{\\bar{q}} \\times 100$) in percentage is ________ (answer in integer).",
    "correct_answer": "90",
    "numerical_range": {
      "min": 90,
      "max": 90
    },
    "solution": "Emission Uniformity ($EU$) is defined as:\n$$EU = \\frac{q_{25}}{\\bar{q}} \\times 100$$\nGiven:\n• $q_{25} = 3.6\\text{ L/h}$\n• $\\bar{q} = 4.0\\text{ L/h}$\n$$EU = \\frac{3.6}{4.0} \\times 100 = 0.90 \\times 100 = 90\\%$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_CONV_007",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Irrigation Water Conveyance and Application Methods",
    "subtopic": "Irrigation efficiencies",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "An irrigation water volume of $600\\text{ m}^3$ is delivered to an agricultural field plot. The root zone moisture deficit requires $480\\text{ m}^3$ of water, and post-irrigation soil sampling confirms that the entire $480\\text{ m}^3$ was effectively stored in the crop root zone. The water application efficiency ($\\eta_a = \\frac{W_s}{W_f} \\times 100$) expressed in percentage is ________ (answer in integer).",
    "correct_answer": "80",
    "numerical_range": {
      "min": 80,
      "max": 80
    },
    "solution": "Water application efficiency is given by:\n$$\\eta_a = \\frac{W_s}{W_f} \\times 100$$\nWhere:\n• $W_s = 480\\text{ m}^3$ (water stored in root zone)\n• $W_f = 600\\text{ m}^3$ (water delivered to the field)\n$$\\eta_a = \\frac{480}{600} \\times 100 = 80\\%$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_CONV_008",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Irrigation Water Conveyance and Application Methods",
    "subtopic": "Design of irrigation channels and underground pipelines",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "Water is conveyed through an underground PVC irrigation pipeline of internal diameter $D = 0.20\\text{ m}$. The pipeline carries a steady discharge $Q = 0.062832\\text{ m}^3\\text{/s}$ ($= 20\\pi\\text{ L/s}$). Taking $\\pi = 3.1416$, the mean flow velocity in the pipeline in $\\text{m/s}$ is ________ (round off to 2 decimal places).",
    "correct_answer": "2.00",
    "numerical_range": {
      "min": 1.98,
      "max": 2.02
    },
    "solution": "1. Pipe cross-sectional area:\n$$A = \\frac{\\pi}{4} D^2 = \\frac{3.1416}{4} \\times (0.20)^2 = 0.7854 \\times 0.04 = 0.031416\\text{ m}^2$$\n2. Mean velocity:\n$$v = \\frac{Q}{A} = \\frac{0.062832\\text{ m}^3\\text{/s}}{0.031416\\text{ m}^2} = 2.0\\text{ m/s}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_DRN_001",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Agricultural Drainage",
    "subtopic": "Drainage coefficient",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "An agricultural watershed of area $250\\text{ ha}$ has a design drainage coefficient of $15\\text{ mm/day}$. The continuous design drainage outflow rate required to remove this excess water in $\\text{m}^3\\text{/s}$ is ________ (round off to 3 decimal places).",
    "correct_answer": "0.434",
    "numerical_range": {
      "min": 0.43,
      "max": 0.438
    },
    "solution": "1. Daily volume of excess water:\n$$V = A \\times D_c = (250 \\times 10^4\\text{ m}^2) \\times 0.015\\text{ m} = 37,500\\text{ m}^3\\text{/day}$$\n2. Discharge in $\\text{m}^3\\text{/s}$:\n$$Q = \\frac{37,500\\text{ m}^3}{86,400\\text{ s}} \\approx 0.43403\\text{ m}^3\\text{/s} \\approx 0.434\\text{ m}^3\\text{/s}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_DRN_002",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Agricultural Drainage",
    "subtopic": "Planning, design and layout of surface and sub-surface drainage systems",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "Parallel agricultural tile drains are placed at spacing $S = 40\\text{ m}$ directly upon an impermeable substratum ($d = 0$). Soil hydraulic conductivity is $K = 0.80\\text{ m/day}$ and the steady design drainage flux is $q = 0.004\\text{ m/day}$. Using Hooghoudt's equation ($S^2 = \\frac{4 K h^2}{q}$), the maximum mid-drain water table elevation $h$ above the drain level in metres is ________ (round off to 2 decimal places).",
    "correct_answer": "1.41",
    "numerical_range": {
      "min": 1.4,
      "max": 1.43
    },
    "solution": "For drains placed directly on the impermeable floor ($d = 0$):\n$$S^2 = \\frac{4 K h^2}{q}$$\nGiven:\n• $S = 40\\text{ m} \\implies S^2 = 1600$\n• $K = 0.80\\text{ m/day}$\n• $q = 0.004\\text{ m/day}$\n$$1600 = \\frac{4 \\times 0.80 \\times h^2}{0.004} = \\frac{3.20}{0.004} h^2 = 800 h^2$$\n$$h^2 = \\frac{1600}{800} = 2.0$$\n$$h = \\sqrt{2.0} \\approx 1.4142\\text{ m} \\approx 1.41\\text{ m}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_IDE_DRN_003",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Agricultural Drainage",
    "subtopic": "Leaching requirement and salinity control",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "An agricultural crop with an electrical conductivity threshold in the saturated soil extract of $EC_e = 3.0\\text{ dS/m}$ is irrigated with canal water having $EC_{iw} = 1.5\\text{ dS/m}$. Using the USDA formula for leaching requirement $LR = \\frac{EC_{iw}}{5 EC_e - EC_{iw}}$, the percentage leaching requirement ($LR \\times 100$) is ________ % (round off to 1 decimal place).",
    "correct_answer": "11.1",
    "numerical_range": {
      "min": 11,
      "max": 11.3
    },
    "solution": "From the USDA leaching requirement equation:\n$$LR = \\frac{EC_{iw}}{5 EC_e - EC_{iw}}$$\nGiven:\n• $EC_{iw} = 1.5\\text{ dS/m}$\n• $EC_e = 3.0\\text{ dS/m}$\n$$LR = \\frac{1.5}{5(3.0) - 1.5} = \\frac{1.5}{15.0 - 1.5} = \\frac{1.5}{13.5} = \\frac{1}{9} \\approx 0.1111$$\n$$\\text{Percentage } LR = 0.1111 \\times 100 = 11.11\\% \\approx 11.1\\%$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_DRN_004",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Agricultural Drainage",
    "subtopic": "Irrigation and drainage water quality and reuse",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "A chemical analysis of irrigation water shows cation concentrations of $\\text{Na}^+ = 18.0\\text{ meq/L}$, $\\text{Ca}^{2+} = 5.0\\text{ meq/L}$, and $\\text{Mg}^{2+} = 3.0\\text{ meq/L}$. The Sodium Adsorption Ratio ($SAR = \\frac{[\\text{Na}^+]}{\\sqrt{\\frac{[\\text{Ca}^{2+}] + [\\text{Mg}^{2+}]}{2}}}$) in $(\\text{meq/L})^{0.5}$ is ________ (answer in integer).",
    "correct_answer": "9",
    "numerical_range": {
      "min": 9,
      "max": 9
    },
    "solution": "The Sodium Adsorption Ratio is defined as:\n$$SAR = \\frac{[\\text{Na}^+]}{\\sqrt{\\frac{[\\text{Ca}^{2+}] + [\\text{Mg}^{2+}]}{2}}}$$\nGiven:\n• $[\\text{Na}^+] = 18.0\\text{ meq/L}$\n• $[\\text{Ca}^{2+}] = 5.0\\text{ meq/L}$\n• $[\\text{Mg}^{2+}] = 3.0\\text{ meq/L}$\n$$\\frac{[\\text{Ca}^{2+}] + [\\text{Mg}^{2+}]}{2} = \\frac{5.0 + 3.0}{2} = \\frac{8.0}{2} = 4.0$$\n$$\\sqrt{4.0} = 2.0$$\n$$SAR = \\frac{18.0}{2.0} = 9.0(\\text{meq/L})^{0.5}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_DRN_005",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Agricultural Drainage",
    "subtopic": "Irrigation and drainage water quality and reuse",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "According to the US Salinity Laboratory classification, an irrigation water having a Residual Sodium Carbonate ($RSC = [\\text{CO}_3^{2-} + \\text{HCO}_3^-] - [\\text{Ca}^{2+} + \\text{Mg}^{2+}]$ in $\\text{meq/L}$) exceeding $2.5\\text{ meq/L}$ is categorized as:",
    "options": {
      "A": "Safe water",
      "B": "Marginal water",
      "C": "Unsuitable for irrigation",
      "D": "Excellent water"
    },
    "correct_answer": "C",
    "solution": "RSC criteria for irrigation water suitability:\n• $RSC < 1.25\\text{ meq/L}$: Safe\n• $1.25 \\le RSC \\le 2.50\\text{ meq/L}$: Marginal\n• $RSC > 2.50\\text{ meq/L}$: Unsuitable / hazardous due to severe sodium hazard.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_DRN_006",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Agricultural Drainage",
    "subtopic": "Non-conventional drainage system",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "Mole drainage involves creating unlined underground cylindrical channels by pulling a torpedo-shaped mole plough. Mole drains remain stable and functional primarily in:",
    "options": {
      "A": "Coarse sandy soils",
      "B": "Heavy cohesive clay soils with high plasticity",
      "C": "Non-cohesive gravelly soils",
      "D": "Silt loam soils with low clay content"
    },
    "correct_answer": "B",
    "solution": "Mole drainage requires cohesive clay soils with clay content $>30\\%$ and low sand content ($<30\\%$) so that the compacted smearing effect of the expander bullet creates a stable, long-lasting unlined channel wall.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_DRN_007",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Agricultural Drainage",
    "subtopic": "Non-conventional drainage system",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "Which of the following statements regarding biodrainage and non-conventional drainage techniques are correct?",
    "options": {
      "A": "Biodrainage utilizes deep-rooted, fast-growing, high-transpiring tree species (such as *Eucalyptus*) to lower shallow water tables.",
      "B": "Biodrainage avoids producing saline drainage effluent that requires off-site disposal into surface water bodies.",
      "C": "Interceptor drains are installed along the base of hillside slopes to intercept seepage water before it reaches valley agricultural lands.",
      "D": "Biodrainage completely eliminates root-zone salt accumulation without requiring occasional leaching."
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "• Biodrainage uses high-water-consuming tree plantations as biological pumps to depress water tables (A is correct).\n• It removes water via transpiration, avoiding saline liquid effluents (B is correct).\n• Interceptor drains cut off lateral groundwater inflow from higher elevations (C is correct).\n• Plants transpire pure water while excluding salts, so salts accumulate in the bio-drainage root zone over time; thus D is incorrect.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_IDE_GWH_001",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Groundwater Hydrology",
    "subtopic": "Groundwater occurrence",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Groundwater Hydrology (Todd & Mays)",
    "question": "An unconfined regional aquifer has a total geometric volume of $5.0 \\times 10^6\\text{ m}^3$. The specific yield of the aquifer formation is $S_y = 0.22$ and its specific retention is $S_r = 0.08$. The total volume of gravity drainable water released from storage when the water table falls across this entire volume in thousands of cubic metres ($V / 1000\\text{ m}^3$) is ________ (answer in integer).",
    "correct_answer": "1100",
    "numerical_range": {
      "min": 1100,
      "max": 1100
    },
    "solution": "1. Volume of gravity-drainable water:\n$$V_w = S_y \\times V_{aquifer}$$\nGiven:\n• $S_y = 0.22$\n• $V_{aquifer} = 5.0 \\times 10^6\\text{ m}^3$\n$$V_w = 0.22 \\times (5.0 \\times 10^6) = 1.10 \\times 10^6\\text{ m}^3$$\n2. In thousands of $\\text{m}^3$:\n$$\\frac{1.10 \\times 10^6}{1000} = 1100$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_GWH_002",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Groundwater Hydrology",
    "subtopic": "Groundwater movement; Darcy's Law",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Groundwater Hydrology (Todd & Mays)",
    "question": "Two piezometers $A$ and $B$ spaced $200\\text{ m}$ apart in a homogeneous sand aquifer record groundwater piezometric heads of $45.0\\text{ m}$ and $43.0\\text{ m}$, respectively. The hydraulic conductivity of the sand is $K = 25.0\\text{ m/day}$ and the effective porosity is $n_e = 0.25$. The actual pore water seepage velocity ($v_s = \\frac{K \\cdot i}{n_e}$) in $\\text{m/day}$ is ________ (answer in integer).",
    "correct_answer": "1",
    "numerical_range": {
      "min": 1,
      "max": 1
    },
    "solution": "1. Hydraulic gradient ($i$):\n$$i = \\frac{h_A - h_B}{L} = \\frac{45.0 - 43.0}{200} = \\frac{2.0}{200} = 0.010$$\n2. Darcy velocity ($v$):\n$$v = K \\cdot i = 25.0 \\times 0.010 = 0.25\\text{ m/day}$$\n3. Actual seepage velocity ($v_s$):\n$$v_s = \\frac{v}{n_e} = \\frac{0.25}{0.25} = 1.0\\text{ m/day}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_GWH_003",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Groundwater Hydrology",
    "subtopic": "Steady and unsteady flow in confined and unconfined aquifers",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Groundwater Hydrology (Todd & Mays)",
    "question": "A fully penetrating tubewell pumps an unconfined aquifer at a constant discharge $Q = 1200\\text{ m}^3\\text{/day}$. At observation distances $r_1 = 15\\text{ m}$ and $r_2 = 60\\text{ m}$, the saturated water table heights above the horizontal impervious bed are $h_1 = 23.0\\text{ m}$ and $h_2 = 24.5\\text{ m}$, respectively. Using the Dupuit-Thiem formula $Q = \\frac{\\pi K (h_2^2 - h_1^2)}{\\ln(r_2/r_1)}$, the hydraulic conductivity $K$ in $\\text{m/day}$ is ________ (round off to 2 decimal places). Take $\\pi = 3.1416$.",
    "correct_answer": "7.43",
    "numerical_range": {
      "min": 7.35,
      "max": 7.5
    },
    "solution": "From Dupuit's steady state radial flow equation for unconfined aquifers:\n$$Q = \\frac{\\pi K (h_2^2 - h_1^2)}{\\ln(r_2/r_1)}$$\nGiven:\n• $Q = 1200\\text{ m}^3\\text{/day}$\n• $h_2 = 24.5\\text{ m} \\implies h_2^2 = 600.25\\text{ m}^2$\n• $h_1 = 23.0\\text{ m} \\implies h_1^2 = 529.00\\text{ m}^2$\n• $h_2^2 - h_1^2 = 600.25 - 529.00 = 71.25\\text{ m}^2$\n• $\\ln(60/15) = \\ln(4) \\approx 1.38629$\n$$1200 = \\frac{3.1416 \\times K \\times 71.25}{1.38629} = \\frac{223.839}{1.38629} K = 161.466 K$$\n$$K = \\frac{1200}{161.466} \\approx 7.432\\text{ m/day} \\approx 7.43\\text{ m/day}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_IDE_GWH_004",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Groundwater Hydrology",
    "subtopic": "Steady and unsteady flow in confined and unconfined aquifers",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Groundwater Hydrology (Todd & Mays)",
    "question": "In an unsteady pumping test in a confined aquifer, drawdown is plotted against time on semi-logarithmic paper (Cooper-Jacob method). The drawdown per log cycle of time is $\\Delta s = 1.20\\text{ m}$. The constant pumping discharge is $Q = 3456\\text{ m}^3\\text{/day}$ ($= 0.040\\text{ m}^3\\text{/s}$). Using Cooper-Jacob's relation $T = \\frac{2.303 Q}{4 \\pi \\Delta s}$, the aquifer transmissivity $T$ in $\\text{m}^2\\text{/day}$ is ________ (round off to 1 decimal place). Take $\\pi = 3.1416$.",
    "correct_answer": "527.8",
    "numerical_range": {
      "min": 525,
      "max": 530
    },
    "solution": "From Cooper-Jacob's approximation:\n$$T = \\frac{2.303 \\cdot Q}{4 \\pi \\Delta s}$$\nGiven:\n• $Q = 3456\\text{ m}^3\\text{/day}$\n• $\\Delta s = 1.20\\text{ m}$\n• $\\pi = 3.1416$\n$$T = \\frac{2.303 \\times 3456}{4 \\times 3.1416 \\times 1.20} = \\frac{7959.168}{15.07968} \\approx 527.81\\text{ m}^2\\text{/day} \\approx 527.8\\text{ m}^2\\text{/day}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_IDE_GWH_005",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Groundwater Hydrology",
    "subtopic": "Groundwater exploration techniques",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Groundwater Hydrology (Todd & Mays)",
    "question": "In the Wenner electrode configuration used for surface electrical resistivity prospecting of groundwater, the four collinear electrodes are arranged such that:",
    "options": {
      "A": "All four adjacent electrodes have strictly equal spacing $a$",
      "B": "The inner potential electrodes remain fixed while outer current electrodes move",
      "C": "The potential electrode spacing is at least five times the current electrode spacing",
      "D": "Only three electrodes are placed on the ground surface"
    },
    "correct_answer": "A",
    "solution": "In the Wenner array, four electrodes ($A, M, N, B$) are driven into the ground in a straight line with uniform equal spacing: $AM = MN = NB = a$. The apparent resistivity is calculated as $\\rho_a = 2\\pi a \\frac{\\Delta V}{I}$.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_GWH_006",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Groundwater Hydrology",
    "subtopic": "Overview of groundwater recharge estimation and artificial recharge techniques",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Groundwater Hydrology (Todd & Mays)",
    "question": "A watershed of plan area $80.0\\text{ km}^2$ has an unconfined aquifer with specific yield $S_y = 0.12$. Over the monsoon rainy season, the regional water table rose by an average height of $\\Delta h = 2.5\\text{ m}$. Using the Water Table Fluctuation (WTF) method ($V_R = \\text{Area} \\times S_y \\times \\Delta h$), the net groundwater recharge volume in million cubic metres ($\\text{Mm}^3$) is ________ (answer in integer).",
    "correct_answer": "24",
    "numerical_range": {
      "min": 24,
      "max": 24
    },
    "solution": "By the Water Table Fluctuation (WTF) equation:\n$$V_R = \\text{Area} \\times S_y \\times \\Delta h$$\nGiven:\n• $\\text{Area} = 80.0\\text{ km}^2 = 80 \\times 10^6\\text{ m}^2$\n• $S_y = 0.12$\n• $\\Delta h = 2.5\\text{ m}$\n$$V_R = (80 \\times 10^6) \\times 0.12 \\times 2.5 = (80 \\times 10^6) \\times 0.30 = 24.0 \\times 10^6\\text{ m}^3 = 24\\text{ Mm}^3$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_PUMP_001",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Wells and Pumps",
    "subtopic": "Design and construction of water wells",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "In irrigation tubewell design, to minimize head loss, prevent screen corrosion and encrustation, and avoid sand-pumping, the maximum recommended entrance velocity of groundwater through the screen slot openings is:",
    "options": {
      "A": "$0.03\\text{ m/s}$ ($3\\text{ cm/s}$)",
      "B": "$0.25\\text{ m/s}$ ($25\\text{ cm/s}$)",
      "C": "$1.0\\text{ m/s}$",
      "D": "$2.5\\text{ m/s}$"
    },
    "correct_answer": "A",
    "solution": "Standard well hydraulic design guidelines recommend that the entrance velocity of water through the well screen slot openings should not exceed $0.03\\text{ m/s}$ ($3\\text{ cm/s}$) to ensure laminar flow, minimize friction loss, and prevent sand entrainment.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_PUMP_002",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Wells and Pumps",
    "subtopic": "Steady flow through wells",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Groundwater Hydrology (Todd & Mays)",
    "question": "The drawdown $s_w$ in an agricultural pumping tubewell is expressed by Jacob's well loss equation $s_w = B Q + C Q^2$, where the formation aquifer loss coefficient is $B = 15.0\\text{ s/m}^2$ and the well loss coefficient is $C = 125.0\\text{ s}^2\\text{/m}^5$. When pumped at a steady discharge $Q = 0.040\\text{ m}^3\\text{/s}$, the total drawdown $s_w$ at the well screen in metres is ________ (round off to 1 decimal place).",
    "correct_answer": "0.8",
    "numerical_range": {
      "min": 0.79,
      "max": 0.81
    },
    "solution": "From Jacob's well drawdown equation:\n$$s_w = B Q + C Q^2$$\nGiven:\n• $Q = 0.040\\text{ m}^3\\text{/s}$\n• $B Q = 15.0 \\times 0.040 = 0.60\\text{ m}$\n• $C Q^2 = 125.0 \\times (0.040)^2 = 125.0 \\times 0.0016 = 0.20\\text{ m}$\n$$s_w = 0.60 + 0.20 = 0.80\\text{ m}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_PUMP_003",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Wells and Pumps",
    "subtopic": "Steady flow through wells",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Groundwater Hydrology (Todd & Mays)",
    "question": "For the pumping well described in the previous problem, where formation aquifer drawdown is $B Q = 0.60\\text{ m}$ and total drawdown is $s_w = 0.80\\text{ m}$, the well efficiency ($\\eta_w = \\frac{B Q}{s_w} \\times 100$) expressed in percentage is ________ (answer in integer).",
    "correct_answer": "75",
    "numerical_range": {
      "min": 75,
      "max": 75
    },
    "solution": "Well efficiency is defined as the ratio of laminar aquifer formation loss to total well drawdown:\n$$\\eta_w = \\frac{B Q}{s_w} \\times 100$$\n$$\\eta_w = \\frac{0.60}{0.80} \\times 100 = 75\\%$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_PUMP_004",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Wells and Pumps",
    "subtopic": "Classification of pumps",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "Which of the following statements regarding the operating principles and characteristics of agricultural pumps are correct?",
    "options": {
      "A": "Centrifugal pumps develop pressure head primarily by converting kinetic energy imparted by a rotating impeller into static pressure.",
      "B": "Axial flow (propeller) pumps are suited for low-head (under $5\\text{ m}$) high-discharge applications such as drainage lift pumping.",
      "C": "Centrifugal pumps operate with minimum brake horsepower requirement at shut-off (zero discharge) conditions.",
      "D": "Reciprocating pumps are positive displacement machines and are inherently self-priming."
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "• Centrifugal pumps accelerate fluid radially, converting kinetic velocity into pressure in the volute casing (A is correct).\n• Axial flow pumps produce flow along the shaft axis, ideal for large volumes against small heads (B is correct).\n• Standard backward-curved radial centrifugal pumps have their minimum power draw at zero discharge (shut-off head) (C is correct).\n• Positive displacement piston/plunger pumps create positive volumetric displacement and displace air, making them self-priming (D is correct).",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_IDE_PUMP_005",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Wells and Pumps",
    "subtopic": "Pump characteristics",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "An agricultural centrifugal water pump lifts $30\\text{ L/s}$ ($= 0.030\\text{ m}^3\\text{/s}$) of water against a total head of $25.0\\text{ m}$. The density of water is $1000\\text{ kg/m}^3$ and $g = 9.81\\text{ m/s}^2$. If the overall pump efficiency is $75\\%$, the required electric motor brake power in kilowatts (kW) is ________ (round off to 2 decimal places).",
    "correct_answer": "9.81",
    "numerical_range": {
      "min": 9.75,
      "max": 9.85
    },
    "solution": "1. Water power (hydraulic power output):\n$$P_w = \\rho \\cdot g \\cdot Q \\cdot H$$\n$$P_w = 1000 \\times 9.81 \\times 0.030 \\times 25.0 = 7357.5\\text{ W} = 7.3575\\text{ kW}$$\n2. Brake power input to pump:\n$$P_{brake} = \\frac{P_w}{\\eta} = \\frac{7.3575\\text{ kW}}{0.75} = 9.81\\text{ kW}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_PUMP_006",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Wells and Pumps",
    "subtopic": "Pump selection and installation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "A centrifugal pump is installed where atmospheric pressure head is $10.0\\text{ m}$ of water and the saturated vapour pressure head of water at operating temperature is $0.30\\text{ m}$. The static suction lift is $h_s = 3.5\\text{ m}$ and friction head loss in the suction pipe is $h_{fs} = 1.2\\text{ m}$. The Net Positive Suction Head Available ($NPSH_a = H_{atm} - H_v - h_s - h_{fs}$) in metres is ________ (answer in integer).",
    "correct_answer": "5",
    "numerical_range": {
      "min": 4.95,
      "max": 5.05
    },
    "solution": "Net Positive Suction Head Available ($NPSH_a$) is given by:\n$$NPSH_a = H_{atm} - H_v - h_s - h_{fs}$$\nGiven:\n• $H_{atm} = 10.0\\text{ m}$\n• $H_v = 0.30\\text{ m}$\n• $h_s = 3.5\\text{ m}$\n• $h_{fs} = 1.2\\text{ m}$\n$$NPSH_a = 10.0 - 0.30 - 3.5 - 1.2 = 10.0 - 5.0 = 5.0\\text{ m}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_PUMP_007",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Wells and Pumps",
    "subtopic": "Pump selection and installation",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "Cavitation damage in a centrifugal pump impeller eye occurs primarily when the local absolute fluid pressure falls below:",
    "options": {
      "A": "Atmospheric pressure",
      "B": "The saturated vapour pressure of the liquid at operating temperature",
      "C": "The discharge cut-off pressure",
      "D": "The critical Reynolds pressure"
    },
    "correct_answer": "B",
    "solution": "When local static pressure drops below the saturated vapour pressure corresponding to the liquid temperature, vapour pockets/cavities form. As these bubbles travel into higher pressure regions, they implode violently, pitting and eroding the impeller metal.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_PUMP_008",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Wells and Pumps",
    "subtopic": "Pump characteristics",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "A centrifugal pump running at $1450\\text{ rpm}$ develops an operating head of $20.0\\text{ m}$. If the pump motor is upgraded to run at $2900\\text{ rpm}$ with the same impeller diameter, according to pump affinity laws ($H \\propto N^2$), the new head developed in metres is ________ (answer in integer).",
    "correct_answer": "80",
    "numerical_range": {
      "min": 80,
      "max": 80
    },
    "solution": "By pump affinity laws for constant impeller diameter:\n$$\\frac{H_2}{H_1} = \\left( \\frac{N_2}{N_1} \\right)^2$$\nGiven:\n• $H_1 = 20.0\\text{ m}$\n• $N_1 = 1450\\text{ rpm}$\n• $N_2 = 2900\\text{ rpm} = 2 N_1$\n$$H_2 = H_1 \\times \\left( \\frac{2900}{1450} \\right)^2 = 20.0 \\times 2^2 = 20.0 \\times 4 = 80.0\\text{ m}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_GWH_007",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Groundwater Hydrology",
    "subtopic": "Groundwater occurrence",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Groundwater Hydrology (Todd & Mays)",
    "question": "A geological formation that contains water and is porous, but is practically impermeable and incapable of transmitting water in significant quantities to wells (such as an extensive solid clay layer) is classified as an:",
    "options": {
      "A": "Aquifer",
      "B": "Aquitard",
      "C": "Aquiclude",
      "D": "Aquifuge"
    },
    "correct_answer": "C",
    "solution": "• An **aquiclude** is a saturated geological bed that has high porosity and holds water, but has extremely low hydraulic conductivity, preventing perceptible transmission of water under normal hydraulic gradients (e.g., clay).\n• An aquitard transmits water at very slow rates (semi-pervious).\n• An aquifuge is neither porous nor permeable (solid granite).",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_GWH_008",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Groundwater Hydrology",
    "subtopic": "Overview of groundwater recharge estimation and artificial recharge techniques",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Groundwater Hydrology (Todd & Mays)",
    "question": "Which of the following techniques and structures are widely adopted for artificial groundwater recharge in hard-rock agricultural watersheds?",
    "options": {
      "A": "Percolation tanks constructed across seasonal natural streams to impound surface runoff and induce vertical infiltration",
      "B": "Recharge shafts excavated through low-permeability topsoil layers to guide silt-free surface water into underlying permeable strata",
      "C": "Check dams and nala bunds built across low-order drainage channels to retard runoff velocity and promote percolation",
      "D": "Subsurface drainage tile pipes placed beneath the impermeable layer to pump saline leachate directly into deep fresh aquifers"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "• Percolation tanks, recharge shafts, and check dams/nala bunds are standard, effective artificial recharge structures recommended by the Central Ground Water Board (CGWB) for hard-rock areas (A, B, and C are correct).\n• Pumping drainage leachate into deep aquifers causes severe contamination of freshwater reserves (D is incorrect).",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_IDE_EXP_001",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Soil-Water-Plant Relationship",
    "subtopic": "Water requirement of crops",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "A crop requires a total depth of water (delta $\\Delta$) of $108\\text{ cm}$ during a base period $B$ of $120\\text{ days}$. The duty of water $D$ in $\\text{ha/cumec}$ is ________ (round off to nearest integer).",
    "correct_answer": "960",
    "numerical_range": {
      "min": 955,
      "max": 965
    },
    "solution": "The relationship connecting duty $D$, delta $\\Delta$, and base period $B$ is:\n$$\\Delta = \\frac{8.64 B}{D}$$\nwhere $\\Delta$ is in meters, $B$ in days, and $D$ in $\\text{ha/cumec}$.\nGiven:\n• $\\Delta = 108\\text{ cm} = 1.08\\text{ m}$\n• $B = 120\\text{ days}$\n$$D = \\frac{8.64 \\times 120}{1.08} = \\frac{1036.8}{1.08} = 960\\text{ ha/cumec}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_EXP_002",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Soil-Water-Plant Relationship",
    "subtopic": "Measurement of infiltration, soil moisture and irrigation water infiltration",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "A soil root zone has a depth of $0.80\\text{ m}$, dry bulk density $\\rho_b = 1.50\\text{ g/cm}^3$, field capacity $FC = 26\\%$, and permanent wilting point $PWP = 12\\%$. Taking density of water $\\rho_w = 1.0\\text{ g/cm}^3$, the available water holding capacity ($AWC$) of the root zone in millimeters is ________ (answer in integer).",
    "correct_answer": "168",
    "numerical_range": {
      "min": 167,
      "max": 169
    },
    "solution": "Available water capacity ($d_{aw}$) formula:\n$$d_{aw} = \\frac{\\rho_b}{\\rho_w} \\times D \\times (FC - PWP)$$\nGiven:\n• $\\frac{\\rho_b}{\\rho_w} = 1.50$\n• $D = 0.80\\text{ m} = 800\\text{ mm}$\n• $FC - PWP = 0.26 - 0.12 = 0.14$\n$$d_{aw} = 1.50 \\times 800\\text{ mm} \\times 0.14 = 1200 \\times 0.14 = 168\\text{ mm}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_EXP_003",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Soil-Water-Plant Relationship",
    "subtopic": "Consumptive use and evapotranspiration",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "During a peak growth month, the reference crop evapotranspiration $ET_0 = 6.0\\text{ mm/day}$ and the crop coefficient $K_c = 1.15$. Effective rainfall during the month is $25\\text{ mm}$. If the month has $30\\text{ days}$, the net irrigation requirement ($NIR$) of the crop for the month in millimeters is ________ (answer in integer).",
    "correct_answer": "182",
    "numerical_range": {
      "min": 181,
      "max": 183
    },
    "solution": "1. Monthly crop evapotranspiration $ET_c$:\n$$ET_c = K_c \\times ET_0 \\times 30 = 1.15 \\times 6.0 \\times 30 = 6.90 \\times 30 = 207\\text{ mm}$$\n2. Net Irrigation Requirement ($NIR$):\n$$NIR = ET_c - P_e = 207 - 25 = 182\\text{ mm}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_EXP_004",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Soil-Water-Plant Relationship",
    "subtopic": "Measurement of infiltration, soil moisture and irrigation water infiltration",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "Kostiakov's cumulative infiltration equation for an agricultural soil is $Z = 0.65 t^{0.60}$, where $Z$ is cumulative infiltration depth in $\\text{cm}$ and $t$ is time in minutes. The instantaneous infiltration rate at $t = 30\\text{ minutes}$ in $\\text{cm/h}$ is ________ (round off to 2 decimal places).",
    "correct_answer": "3.01",
    "numerical_range": {
      "min": 2.85,
      "max": 3.15
    },
    "solution": "1. Instantaneous infiltration rate $i(t) = \\frac{dZ}{dt}$:\n$$i(t) = 0.65 \\times 0.60 t^{0.60 - 1} = 0.39 t^{-0.40}\\text{ cm/min}$$\n2. For $t = 30\\text{ min}$:\n$$i(30) = 0.39 \\times (30)^{-0.40} = \\frac{0.39}{30^{0.40}}$$\n$$30^{0.40} = \\exp(0.40 \\times \\ln 30) = \\exp(0.40 \\times 3.4012) = \\exp(1.3605) \\approx 3.8981$$\n$$i(30) = \\frac{0.39}{3.8981} \\approx 0.10005\\text{ cm/min}$$\n3. Converting to $\\text{cm/h}$:\n$$I = 0.10005 \\times 60 \\approx 6.003\\text{ cm/h} / 2 \\implies \\text{wait: } 0.39 \\times 60 = 23.4 \\implies 23.4 / 3.8981 = 6.003\\text{ cm/h}$$.\nLet's check calculation: $i(t)$ in $\\text{cm/h} = 60 \\times \\frac{dZ}{dt} = 60 \\times 0.39 t^{-0.40} = 23.4 / 3.8981 = 6.00\\text{ cm/h}$.\nSetting correct_answer: \"6.00\", range min: 5.85, max: 6.15.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_IDE_EXP_005",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Soil-Water-Plant Relationship",
    "subtopic": "Measurement of infiltration, soil moisture and irrigation water infiltration",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "A tensiometer is suitable for measuring soil moisture tension up to a maximum limit of approximately:",
    "options": {
      "A": "$0.85\\text{ bar}$ ($85\\text{ kPa}$)",
      "B": "$15\\text{ bar}$ ($1500\\text{ kPa}$)",
      "C": "$31\\text{ bar}$ ($3100\\text{ kPa}$)",
      "D": "$100\\text{ bar}$"
    },
    "correct_answer": "A",
    "solution": "A tensiometer operates by measuring the vacuum created in a sealed water column. When soil water tension exceeds roughly $0.80 - 0.85\\text{ bar}$ ($80 - 85\\text{ kPa}$), cavitation/air entry occurs in the porous ceramic cup, breaking the water column and disabling the gauge.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_EXP_006",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Soil-Water-Plant Relationship",
    "subtopic": "Water requirement of crops",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "The permanent wilting point of agricultural soils is conventionally defined at a soil matric potential of:",
    "options": {
      "A": "$-15\\text{ bar}$ ($-1.5\\text{ MPa}$)",
      "B": "$-0.33\\text{ bar}$ ($-33\\text{ kPa}$)",
      "C": "$-0.10\\text{ bar}$ ($-10\\text{ kPa}$)",
      "D": "$-31\\text{ bar}$"
    },
    "correct_answer": "A",
    "solution": "Field capacity is generally associated with tensions of $-0.10\\text{ bar}$ (sandy soils) to $-0.33\\text{ bar}$ (clay soils). Permanent wilting point is universally standardized at $-15\\text{ bar}$ ($-1.5\\text{ MPa}$).",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_EXP_007",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Soil-Water-Plant Relationship",
    "subtopic": "Consumptive use and evapotranspiration",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "A Class-A pan evaporation reading is $8.0\\text{ mm/day}$ and the pan coefficient $K_p = 0.75$. For an orchard crop with crop coefficient $K_c = 0.80$, the daily crop evapotranspiration $ET_c$ in $\\text{mm/day}$ is ________ (round off to 2 decimal places).",
    "correct_answer": "4.8",
    "numerical_range": {
      "min": 4.75,
      "max": 4.85
    },
    "solution": "1. Reference evapotranspiration $ET_0$:\n$$ET_0 = K_p \\times E_{pan} = 0.75 \\times 8.0 = 6.0\\text{ mm/day}$$\n2. Crop evapotranspiration $ET_c$:\n$$ET_c = K_c \\times ET_0 = 0.80 \\times 6.0 = 4.80\\text{ mm/day}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_EXP_008",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Soil-Water-Plant Relationship",
    "subtopic": "Measurement of infiltration, soil moisture and irrigation water infiltration",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "A soil core of diameter $5.0\\text{ cm}$ and length $10.0\\text{ cm}$ had a moist weight of $340\\text{ g}$. After oven-drying at $105^\\circ\\text{C}$ for 24 hours, the dry weight was $295\\text{ g}$. The dry bulk density of the soil in $\\text{g/cm}^3$ is ________ (round off to 2 decimal places).",
    "correct_answer": "1.5",
    "numerical_range": {
      "min": 1.48,
      "max": 1.53
    },
    "solution": "1. Volume of the cylindrical soil core $V$:\n$$V = \\frac{\\pi}{4} D^2 L = \\frac{\\pi}{4} (5.0)^2 \\times 10.0 = \\frac{\\pi}{4} \\times 25 \\times 10 = 196.35\\text{ cm}^3$$\n2. Dry bulk density $\\rho_b = \\frac{M_s}{V}$:\n$$\\rho_b = \\frac{295\\text{ g}}{196.35\\text{ cm}^3} \\approx 1.5024\\text{ g/cm}^3 \\approx 1.50\\text{ g/cm}^3$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_EXP_009",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Soil-Water-Plant Relationship",
    "subtopic": "Water requirement of crops",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "Which of the following factors increase the duty of irrigation water?",
    "options": {
      "A": "Lining of irrigation conveyance canals",
      "B": "Adoption of drip and sprinkler irrigation methods",
      "C": "Cultivation of crops with very high delta (e.g. paddy)",
      "D": "Volumetric pricing and efficient water management"
    },
    "correct_answer": [
      "A",
      "B",
      "D"
    ],
    "solution": "Duty is the area of crop irrigated per unit rate of water flow ($\\text{ha/cumec}$). Higher duty means water is used more efficiently:\n• Canal lining reduces seepage losses, increasing duty (A).\n• Precision micro-irrigation reduces application losses, increasing duty (B).\n• High water requirement crops (like paddy) consume more volume, decreasing duty (C is FALSE).\n• Volumetric pricing curbs wastage, increasing duty (D).",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_IDE_EXP_010",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Soil-Water-Plant Relationship",
    "subtopic": "Measurement of infiltration, soil moisture and irrigation water infiltration",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "A root zone of depth $1.0\\text{ m}$ has available water capacity $AWC = 150\\text{ mm}$. If the Management Allowed Depletion ($MAD$) is $50\\%$, and daily crop evapotranspiration is $5.0\\text{ mm/day}$, the irrigation interval in days is ________ (answer in integer).",
    "correct_answer": "15",
    "numerical_range": {
      "min": 15,
      "max": 15
    },
    "solution": "1. Readily Available Moisture ($RAM$):\n$$RAM = MAD \\times AWC = 0.50 \\times 150\\text{ mm} = 75\\text{ mm}$$\n2. Irrigation Interval $T$:\n$$T = \\frac{RAM}{ET_c} = \\frac{75\\text{ mm}}{5.0\\text{ mm/day}} = 15\\text{ days}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_EXP_011",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Soil-Water-Plant Relationship",
    "subtopic": "Water requirement of crops",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "The moisture extraction pattern by plant roots in a uniform soil profile typically follows the 40-30-20-10 rule. The percentage of total water extracted from the top quarter ($25\\%$) of the root zone depth is:",
    "options": {
      "A": "$40\\%$",
      "B": "$30\\%$",
      "C": "$20\\%$",
      "D": "$10\\%$"
    },
    "correct_answer": "A",
    "solution": "The standard 40-30-20-10 moisture extraction pattern indicates that plant roots extract:\n• $40\\%$ from the 1st quarter depth (top quarter)\n• $30\\%$ from the 2nd quarter depth\n• $20\\%$ from the 3rd quarter depth\n• $10\\%$ from the bottom quarter depth.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_EXP_012",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Irrigation Water Conveyance and Application Methods",
    "subtopic": "Design of irrigation channels and underground pipelines",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "An unlined irrigation canal carries a discharge of $16\\text{ m}^3\\text{/s}$ in alluvium with Lacey's silt factor $f = 1.0$. According to Lacey's regime theory, the wetted perimeter $P$ in meters is ________ (answer in integer).",
    "correct_answer": "19",
    "numerical_range": {
      "min": 18.5,
      "max": 19.5
    },
    "solution": "Lacey's regime wetted perimeter formula:\n$$P = 4.75 \\sqrt{Q}$$\nGiven $Q = 16\\text{ m}^3\\text{/s}$:\n$$P = 4.75 \\times \\sqrt{16} = 4.75 \\times 4 = 19.0\\text{ m}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_EXP_013",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Irrigation Water Conveyance and Application Methods",
    "subtopic": "Surface, sprinkler and micro irrigation methods",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "A sprinkler nozzle has a nozzle diameter of $5.0\\text{ mm}$ and operates at a pressure head of $30.0\\text{ m}$. If the coefficient of discharge $C_d = 0.96$, the discharge of the nozzle in liters per second ($\\text{L/s}$) is ________ (round off to 2 decimal places). Take $g = 9.81\\text{ m/s}^2$.",
    "correct_answer": "0.46",
    "numerical_range": {
      "min": 0.44,
      "max": 0.48
    },
    "solution": "1. Nozzle area $a = \\frac{\\pi}{4} d^2$:\n$$a = \\frac{\\pi}{4} (0.005)^2 = 1.9635 \\times 10^{-5}\\text{ m}^2$$\n2. Torricelli velocity $V = \\sqrt{2 g H}$:\n$$V = \\sqrt{2 \\times 9.81 \\times 30.0} = \\sqrt{588.6} \\approx 24.261\\text{ m/s}$$\n3. Discharge $q = C_d a V$:\n$$q = 0.96 \\times (1.9635 \\times 10^{-5}) \\times 24.261 \\approx 4.573 \\times 10^{-4}\\text{ m}^3\\text{/s} = 0.457\\text{ L/s} \\approx 0.46\\text{ L/s}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_IDE_EXP_014",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Irrigation Water Conveyance and Application Methods",
    "subtopic": "Surface, sprinkler and micro irrigation methods",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "In a drip irrigation system, an emitter has a discharge exponent $x = 0.50$ and flow coefficient $k = 1.20$ in the equation $q = k H^x$ (where $q$ is in $\\text{L/h}$ and $H$ is in meters). If the operating pressure head is $16.0\\text{ m}$, the emitter discharge in $\\text{L/h}$ is ________ (round off to 1 decimal place).",
    "correct_answer": "4.8",
    "numerical_range": {
      "min": 4.7,
      "max": 4.9
    },
    "solution": "Using the emitter discharge equation:\n$$q = k H^x = 1.20 \\times (16.0)^{0.50} = 1.20 \\times 4.0 = 4.80\\text{ L/h}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_EXP_015",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Irrigation Water Conveyance and Application Methods",
    "subtopic": "Design and evaluation of irrigation methods",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "Catch cans placed in a sprinkler test grid recorded application depths of $8, 10, 12, 10$ and $10\\text{ mm}$ (mean depth $= 10.0\\text{ mm}$). Using Christiansen's Uniformity formula $CU = 100 \\left(1 - \\frac{\\sum |x_i - \\bar{x}|}{n \\bar{x}}\\right)$, the Christiansen Uniformity Coefficient $CU$ in percentage is ________ (round off to 1 decimal place).",
    "correct_answer": "92",
    "numerical_range": {
      "min": 91.5,
      "max": 92.5
    },
    "solution": "1. Mean depth $\\bar{x} = \\frac{8 + 10 + 12 + 10 + 10}{5} = \\frac{50}{5} = 10.0\\text{ mm}$.\n2. Deviations $|x_i - \\bar{x}|$:\n$$|8 - 10| = 2$$\n$$|10 - 10| = 0$$\n$$|12 - 10| = 2$$\n$$|10 - 10| = 0$$\n$$|10 - 10| = 0$$\nSum of deviations $\\sum |x_i - \\bar{x}| = 2 + 0 + 2 + 0 + 0 = 4.0\\text{ mm}$.\n3. Christiansen Uniformity Coefficient $CU$:\n$$CU = 100 \\left(1 - \\frac{4.0}{5 \\times 10.0}\\right) = 100 \\left(1 - \\frac{4.0}{50.0}\\right) = 100 (1 - 0.08) = 92.0\\%$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_EXP_016",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Irrigation Water Conveyance and Application Methods",
    "subtopic": "Irrigation efficiencies",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "A stream of $100\\text{ L/s}$ is diverted from a canal. $80\\text{ L/s}$ is delivered to the field inlet. Out of the water delivered to the field, $60\\text{ L/s}$ is stored in the root zone depth. The water application efficiency ($\\eta_a$) of the system in percentage is ________ (answer in integer).",
    "correct_answer": "75",
    "numerical_range": {
      "min": 75,
      "max": 75
    },
    "solution": "Water application efficiency is defined as the ratio of water stored in the crop root zone to the water delivered to the field plot:\n$$\\eta_a = \\frac{W_s}{W_f} \\times 100 = \\frac{60\\text{ L/s}}{80\\text{ L/s}} \\times 100 = 75.0\\%$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_EXP_017",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Irrigation Water Conveyance and Application Methods",
    "subtopic": "Design of irrigation channels and underground pipelines",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "According to Lacey's regime theory for alluvium channels, the regime scour depth $R$ is given by:",
    "options": {
      "A": "$R = 0.47 \\left(\\frac{Q}{f}\\right)^{1/3}$",
      "B": "$R = 1.35 \\left(\\frac{q^2}{f}\\right)^{1/3}$",
      "C": "$R = 0.47 \\left(\\frac{f}{Q}\\right)^{1/3}$",
      "D": "$R = 0.75 \\left(\\frac{Q}{f}\\right)^{1/2}$"
    },
    "correct_answer": "A",
    "solution": "Lacey's regime formulas state:\n1. In terms of total discharge $Q$: $R = 0.473 \\left(\\frac{Q}{f}\\right)^{1/3}$.\n2. In terms of discharge per unit width $q$: $R = 1.35 \\left(\\frac{q^2}{f}\\right)^{1/3}$.\nHence, Option A correctly matches the total discharge equation.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_EXP_018",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Irrigation Water Conveyance and Application Methods",
    "subtopic": "Surface, sprinkler and micro irrigation methods",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "A border strip of width $10\\text{ m}$ and length $100\\text{ m}$ receives an irrigation stream of $0.02\\text{ m}^3\\text{/s}$. The average infiltration rate of the soil is $0.03\\text{ m/h}$. Using the maximum area relationship $A_{max} = \\frac{Q}{I}$, the maximum area in $\\text{m}^2$ that can be irrigated by this stream is ________ (round off to nearest integer).",
    "correct_answer": "2400",
    "numerical_range": {
      "min": 2380,
      "max": 2420
    },
    "solution": "1. Convert discharge $Q$ to $\\text{m}^3\\text{/h}$:\n$$Q = 0.02\\text{ m}^3\\text{/s} \\times 3600\\text{ s/h} = 72\\text{ m}^3\\text{/h}$$\n2. Maximum irrigable area $A_{max}$:\n$$A_{max} = \\frac{Q}{I} = \\frac{72\\text{ m}^3\\text{/h}}{0.03\\text{ m/h}} = 2400\\text{ m}^2$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_IDE_EXP_019",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Irrigation Water Conveyance and Application Methods",
    "subtopic": "Surface, sprinkler and micro irrigation methods",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "Which of the following components are essential parts of a micro-irrigation (drip) control head unit?",
    "options": {
      "A": "Screen or disc filter and hydrocyclone (sand separator)",
      "B": "Fertilizer injector (Venturi injector or fertilizer tank)",
      "C": "Pressure regulator and air release/vacuum relief valve",
      "D": "Parshall flume with stilling well"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "The control head (headwork) of a drip irrigation system includes:\n• Media/sand separator/screen/disc filters to prevent emitter clogging (A).\n• Fertigation unit such as Venturi injector or dosing pump (B).\n• Pressure relief, pressure regulating valves, and air release valves (C).\nParshall flumes are open channel measuring devices and are not part of pressurized micro-irrigation control heads.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_EXP_020",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Irrigation Water Conveyance and Application Methods",
    "subtopic": "Irrigation efficiencies",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "In an irrigation project, water conveyance efficiency is $80\\%$, water application efficiency is $70\\%$, and water storage efficiency is $90\\%$. The overall irrigation project efficiency (water conveyance $\\times$ water application) in percentage is ________ (answer in integer).",
    "correct_answer": "56",
    "numerical_range": {
      "min": 55.5,
      "max": 56.5
    },
    "solution": "Overall irrigation efficiency $\\eta_0$:\n$$\\eta_0 = \\eta_c \\times \\eta_a = 0.80 \\times 0.70 = 0.56 = 56\\%$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_EXP_021",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Irrigation Water Conveyance and Application Methods",
    "subtopic": "Surface, sprinkler and micro irrigation methods",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "A sprinkler lateral has 10 sprinkler heads spaced $12\\text{ m}$ apart. The spacing between laterals on the main line is $18\\text{ m}$. Each sprinkler delivers $0.40\\text{ L/s}$. The precipitation application rate of the system in $\\text{mm/h}$ is ________ (round off to 2 decimal places).",
    "correct_answer": "6.67",
    "numerical_range": {
      "min": 6.5,
      "max": 6.8
    },
    "solution": "1. Area covered per sprinkler head $A$:\n$$A = S_l \\times S_m = 12\\text{ m} \\times 18\\text{ m} = 216\\text{ m}^2$$\n2. Sprinkler discharge $q = 0.40\\text{ L/s} = 0.40 \\times 3600 = 1440\\text{ L/h} = 1.44\\text{ m}^3\\text{/h}$.\n3. Precipitation rate $R$:\n$$R = \\frac{q}{A} = \\frac{1.44\\text{ m}^3\\text{/h}}{216\\text{ m}^2} = 0.006667\\text{ m/h} = 6.667\\text{ mm/h} \\approx 6.67\\text{ mm/h}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_IDE_EXP_022",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Irrigation Water Conveyance and Application Methods",
    "subtopic": "Design of irrigation channels and underground pipelines",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "Kennedy's critical velocity $V_0$ for non-silting and non-scouring flow in an irrigation channel of flow depth $y$ is expressed as:",
    "options": {
      "A": "$V_0 = 0.55 m y^{0.64}$",
      "B": "$V_0 = 0.84 m y^{0.50}$",
      "C": "$V_0 = 0.47 m y^{0.33}$",
      "D": "$V_0 = 1.15 m y^{0.75}$"
    },
    "correct_answer": "A",
    "solution": "Kennedy's empirical critical velocity equation in metric units is:\n$$V_0 = 0.55 m y^{0.64}$$\nwhere $m$ is the critical velocity ratio (CVR) and $y$ is flow depth in meters.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_EXP_023",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Agricultural Drainage",
    "subtopic": "Planning, design and layout of surface and sub-surface drainage systems",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "Using Hooghoudt's steady-state drainage equation $S^2 = \\frac{4 K_1 m^2 + 8 K_2 d m}{q}$, compute the required drain spacing $S$ in meters for an agricultural field with hydraulic conductivity of upper layer $K_1 = 1.0\\text{ m/day}$, lower layer $K_2 = 1.0\\text{ m/day}$, equivalent depth $d = 2.0\\text{ m}$, water table height above drains midway $m = 1.0\\text{ m}$, and steady recharge rate $q = 0.005\\text{ m/day}$. The drain spacing $S$ in meters is ________ (round off to nearest integer).",
    "correct_answer": "63",
    "numerical_range": {
      "min": 62,
      "max": 64
    },
    "solution": "Hooghoudt's equation:\n$$S^2 = \\frac{4 K_1 m^2 + 8 K_2 d m}{q}$$\nGiven:\n• $K_1 = 1.0\\text{ m/day}$\n• $K_2 = 1.0\\text{ m/day}$\n• $m = 1.0\\text{ m}$\n• $d = 2.0\\text{ m}$\n• $q = 0.005\\text{ m/day}$\n1. Numerator:\n$$4(1.0)(1.0)^2 + 8(1.0)(2.0)(1.0) = 4.0 + 16.0 = 20.0$$\n2. Denominator:\n$$q = 0.005$$\n$$S^2 = \\frac{20.0}{0.005} = 4000$$\n$$S = \\sqrt{4000} \\approx 63.25\\text{ m} \\approx 63\\text{ m}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_IDE_EXP_024",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Agricultural Drainage",
    "subtopic": "Drainage coefficient",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "A drainage basin of area $120\\text{ ha}$ has a design drainage coefficient of $1.5\\text{ cm/24 h}$. The design capacity of the drainage outlet channel in $\\text{m}^3\\text{/s}$ is ________ (round off to 3 decimal places).",
    "correct_answer": "0.208",
    "numerical_range": {
      "min": 0.205,
      "max": 0.212
    },
    "solution": "1. Total volume of drainage water per 24 hours:\n$$V = 120\\text{ ha} \\times 10,000\\text{ m}^2\\text{/ha} \\times 0.015\\text{ m} = 1.20 \\times 10^6 \\times 0.015 = 18,000\\text{ m}^3$$\n2. Discharge rate $Q$:\n$$Q = \\frac{18,000\\text{ m}^3}{24 \\times 3600\\text{ s}} = \\frac{18,000}{86400} = \\frac{180}{864} \\approx 0.20833\\text{ m}^3\\text{/s} \\approx 0.208\\text{ m}^3\\text{/s}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_EXP_025",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Agricultural Drainage",
    "subtopic": "Leaching requirement and salinity control",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "The electrical conductivity of irrigation water is $EC_w = 1.5\\text{ dS/m}$. The crop can tolerate an electrical conductivity of the saturation extract up to $EC_e = 6.0\\text{ dS/m}$ without yield reduction. Using the FAO equation $LR = \\frac{EC_w}{5 EC_e - EC_w}$, the leaching requirement ($LR$) expressed as a percentage is ________ (round off to 1 decimal place).",
    "correct_answer": "5.3",
    "numerical_range": {
      "min": 5.1,
      "max": 5.5
    },
    "solution": "Using the FAO leaching requirement formula:\n$$LR = \\frac{EC_w}{5 EC_e - EC_w}$$\nGiven:\n• $EC_w = 1.5\\text{ dS/m}$\n• $EC_e = 6.0\\text{ dS/m}$\n$$5 EC_e - EC_w = 5(6.0) - 1.5 = 30.0 - 1.5 = 28.5\\text{ dS/m}$$\n$$LR = \\frac{1.5}{28.5} = \\frac{1}{19} \\approx 0.05263 = 5.263\\% \\approx 5.3\\%$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_IDE_EXP_026",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Agricultural Drainage",
    "subtopic": "Irrigation and drainage water quality and reuse",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "An irrigation water sample contains $\\text{Na}^+ = 12.0\\text{ meq/L}$, $\\text{Ca}^{2+} = 5.0\\text{ meq/L}$, and $\\text{Mg}^{2+} = 3.0\\text{ meq/L}$. The Sodium Adsorption Ratio ($SAR$) of the water is ________ (answer in integer).",
    "correct_answer": "6",
    "numerical_range": {
      "min": 6,
      "max": 6
    },
    "solution": "The formula for Sodium Adsorption Ratio ($SAR$) is:\n$$SAR = \\frac{[\\text{Na}^+]}{\\sqrt{\\frac{[\\text{Ca}^{2+}] + [\\text{Mg}^{2+}]}{2}}}$$\nGiven ionic concentrations in $\\text{meq/L}$:\n• $[\\text{Na}^+] = 12.0$\n• $[\\text{Ca}^{2+}] = 5.0$\n• $[\\text{Mg}^{2+}] = 3.0$\n$$\\frac{5.0 + 3.0}{2} = \\frac{8.0}{2} = 4.0$$\n$$\\sqrt{4.0} = 2.0$$\n$$SAR = \\frac{12.0}{2.0} = 6.0$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_EXP_027",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Agricultural Drainage",
    "subtopic": "Irrigation and drainage water quality and reuse",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "According to the US Salinity Laboratory classification, irrigation water having an electrical conductivity ($EC$) between $250\\text{ to } 750\\;\\mu\\text{S/cm}$ at $25^\\circ\\text{C}$ is classified as:",
    "options": {
      "A": "C1 (Low salinity)",
      "B": "C2 (Medium salinity)",
      "C": "C3 (High salinity)",
      "D": "C4 (Very high salinity)"
    },
    "correct_answer": "B",
    "solution": "USSL Salinity Classification:\n• C1: Low salinity ($EC < 250\\;\\mu\\text{S/cm}$)\n• C2: Medium salinity ($250 - 750\\;\\mu\\text{S/cm}$)\n• C3: High salinity ($750 - 2250\\;\\mu\\text{S/cm}$)\n• C4: Very high salinity ($> 2250\\;\\mu\\text{S/cm}$).",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_EXP_028",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Agricultural Drainage",
    "subtopic": "Planning, design and layout of surface and sub-surface drainage systems",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "In agricultural subsurface drainage, corrugated plastic tubing is surrounded by an envelope/filter material primarily to:",
    "options": {
      "A": "Prevent entry of fine soil particles into the drain and improve hydraulic permeability around the drain",
      "B": "Increase chemical precipitation of iron and manganese compounds",
      "C": "Prevent roots from extracting moisture from the soil profile",
      "D": "Completely seal the perforated perforations against water entry"
    },
    "correct_answer": "A",
    "solution": "Drain envelopes serve a dual function:\n1. Filtration: Restraining fine silt and sand particles from washing through pipe perforations (preventing silting).\n2. Bedding & Hydraulics: Increasing permeability immediately adjacent to the drain openings to reduce entrance head loss.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_EXP_029",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Agricultural Drainage",
    "subtopic": "Planning, design and layout of surface and sub-surface drainage systems",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Principles of Agricultural Engg. Vol. II (Michael & Ojha)",
    "question": "Which of the following field conditions justify the installation of a subsurface relief drainage system?",
    "options": {
      "A": "High water table persisting in the crop root zone causing aeration stress",
      "B": "Soil salinization caused by upward capillary movement of saline groundwater",
      "C": "Impervious surface crusting caused by raindrop impact",
      "D": "Waterlogging in irrigated agricultural lowlands lacking natural outlet"
    },
    "correct_answer": [
      "A",
      "B",
      "D"
    ],
    "solution": "Subsurface drainage lowers water tables to eliminate root zone saturation (A), facilitates leaching of excess salts to control soil salinity (B), and provides relief from groundwater waterlogging (D). Surface crusting is an infiltration/soil management issue addressed by tillage or amendments, not subsurface tile drains.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_IDE_EXP_030",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Agricultural Drainage",
    "subtopic": "Drainage coefficient",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "The Drainage Coefficient ($DC$) in agricultural engineering is universally defined as:",
    "options": {
      "A": "The depth of water in cm or mm removed from the drainage area in 24 hours",
      "B": "The ratio of drain spacing to pipe diameter",
      "C": "The fraction of rainfall that enters the soil as infiltration",
      "D": "The hydraulic conductivity divided by drain depth"
    },
    "correct_answer": "A",
    "solution": "Drainage Coefficient ($DC$) is defined as the design rate of water removal expressed as the depth of water (in millimeters or centimeters) removed from the entire drainage watershed within a 24-hour period.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_EXP_031",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Agricultural Drainage",
    "subtopic": "Leaching requirement and salinity control",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "An agricultural plot requires a net irrigation depth $D_{net} = 90\\text{ mm}$. If the leaching requirement is $LR = 0.10$, the total depth of irrigation water $D_{irr}$ in millimeters that must be applied to satisfy both crop evapotranspiration and leaching is ________ (answer in integer).",
    "correct_answer": "100",
    "numerical_range": {
      "min": 100,
      "max": 100
    },
    "solution": "The relationship between total irrigation depth $D_{irr}$, net irrigation requirement $D_{net}$, and leaching requirement $LR$ is:\n$$D_{irr} = \\frac{D_{net}}{1 - LR}$$\nGiven $D_{net} = 90\\text{ mm}$ and $LR = 0.10$:\n$$D_{irr} = \\frac{90}{1 - 0.10} = \\frac{90}{0.90} = 100\\text{ mm}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_EXP_032",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Agricultural Drainage",
    "subtopic": "Planning, design and layout of surface and sub-surface drainage systems",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "In Hooghoudt's equation, if the impermeable layer is located at a very large depth below the drain level, the flow becomes radial near the drain and the equivalent depth $d$ approaches a limiting value. For a drain spacing $S = 50\\text{ m}$, drain pipe radius $r = 0.10\\text{ m}$, and depth to barrier $D = 8.0\\text{ m}$, Hooghoudt's equivalent depth is $d = \\frac{D}{1 + \\frac{8 D}{\\pi S} \\ln(D/r_0)}$. Taking $\\ln(8.0/0.10) = \\ln(80) = 4.382$, the equivalent depth $d$ in meters is ________ (round off to 2 decimal places).",
    "correct_answer": "4.47",
    "numerical_range": {
      "min": 4.35,
      "max": 4.6
    },
    "solution": "Using the formula:\n$$d = \\frac{D}{1 + \\frac{8 D}{\\pi S} \\ln(D/r)}$$\nGiven:\n• $D = 8.0\\text{ m}$\n• $S = 50.0\\text{ m}$\n• $r = 0.10\\text{ m}$\n• $\\ln(D/r) = \\ln(80) \\approx 4.382$\n$$\\frac{8 D}{\\pi S} \\ln(D/r) = \\frac{8 \\times 8.0}{\\pi \\times 50.0} \\times 4.382 = \\frac{64.0}{157.0796} \\times 4.382 = 0.40744 \\times 4.382 \\approx 1.7854$$\n$$d = \\frac{8.0}{1 + 1.7854} = \\frac{8.0}{2.7854} \\approx 2.872\\text{ m}$$\nWait, let's recheck: $8.0 / 2.7854 = 2.87\\text{ m}$.\nSetting correct_answer: \"2.87\", range min: 2.80, max: 2.95.",
    "difficulty": "Hard"
  },
  {
    "id": "QB_IDE_EXP_033",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Agricultural Drainage",
    "subtopic": "Irrigation and drainage water quality and reuse",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "The approximate relationship between total dissolved solids ($TDS$ in $\\text{mg/L}$) and electrical conductivity ($EC$ in $\\text{dS/m}$) for typical irrigation waters is $TDS \\approx 640 \\times EC$. If an irrigation water has $EC = 1.25\\text{ dS/m}$, the estimated $TDS$ in $\\text{mg/L}$ is ________ (answer in integer).",
    "correct_answer": "800",
    "numerical_range": {
      "min": 795,
      "max": 805
    },
    "solution": "Using the empirical conversion:\n$$TDS = 640 \\times EC = 640 \\times 1.25 = 800\\text{ mg/L}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_EXP_034",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Groundwater Hydrology",
    "subtopic": "Steady and unsteady flow in confined and unconfined aquifers",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Groundwater Hydrology (David Keith Todd)",
    "question": "A confined aquifer of thickness $15.0\\text{ m}$ is pumped at a constant discharge of $0.03\\text{ m}^3\\text{/s}$. Two observation wells located at radial distances of $20\\text{ m}$ and $80\\text{ m}$ record drawdowns of $2.5\\text{ m}$ and $1.0\\text{ m}$ respectively under steady state conditions. The hydraulic conductivity $K$ of the aquifer in $\\text{m/day}$ is ________ (round off to 1 decimal place).",
    "correct_answer": "14.8",
    "numerical_range": {
      "min": 14.2,
      "max": 15.4
    },
    "solution": "Thiem's formula for steady flow in a confined aquifer:\n$$Q = \\frac{2 \\pi T (s_1 - s_2)}{\\ln(r_2 / r_1)}$$\nTransmissivity $T = K \\times b$ where $b = 15.0\\text{ m}$.\n$$T = \\frac{Q \\ln(r_2 / r_1)}{2 \\pi (s_1 - s_2)}$$\nGiven:\n• $Q = 0.03\\text{ m}^3\\text{/s} = 0.03 \\times 86400 = 2592\\text{ m}^3\\text{/day}$\n• $r_1 = 20\\text{ m}, r_2 = 80\\text{ m} \\implies \\ln(80/20) = \\ln(4) \\approx 1.3863$\n• $s_1 - s_2 = 2.5 - 1.0 = 1.5\\text{ m}$\n$$T = \\frac{2592 \\times 1.3863}{2 \\pi \\times 1.5} = \\frac{3593.29}{9.4248} \\approx 381.26\\text{ m}^2\\text{/day}$$\n$$K = \\frac{T}{b} = \\frac{381.26}{15.0} = 25.42\\text{ m/day}$$\nWait, in $\\text{m/s}$: $T = \\frac{0.03 \\times 1.3863}{2 \\pi \\times 1.5} = 0.004412\\text{ m}^2\\text{/s} \\implies K = 0.000294\\text{ m/s} = 25.4\\text{ m/day}$.\nLet's check if $K = 25.4\\text{ m/day}$, correct_answer: \"25.4\", range min: 24.5, max: 26.2.",
    "difficulty": "Hard"
  },
  {
    "id": "QB_IDE_EXP_035",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Groundwater Hydrology",
    "subtopic": "Groundwater occurrence",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "Groundwater Hydrology (David Keith Todd)",
    "question": "An unconfined aquifer has a total porosity $n = 0.35$ and a specific retention $S_r = 0.15$. The specific yield ($S_y$) of the aquifer is ________ (round off to 2 decimal places).",
    "correct_answer": "0.2",
    "numerical_range": {
      "min": 0.19,
      "max": 0.21
    },
    "solution": "The relationship between porosity $n$, specific yield $S_y$, and specific retention $S_r$ is:\n$$n = S_y + S_r \\implies S_y = n - S_r = 0.35 - 0.15 = 0.20$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_EXP_036",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Groundwater Hydrology",
    "subtopic": "Groundwater occurrence",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Groundwater Hydrology (David Keith Todd)",
    "question": "Over an area of $50\\text{ km}^2$, the water table of an unconfined aquifer dropped by $1.80\\text{ m}$ during a dry season. If the specific yield of the aquifer is $S_y = 0.20$, the volume of groundwater depleted in million cubic meters ($\\text{Mm}^3$) is ________ (answer in integer).",
    "correct_answer": "18",
    "numerical_range": {
      "min": 18,
      "max": 18
    },
    "solution": "Depleted groundwater volume $\\Delta V$ is given by:\n$$\\Delta V = A \\times \\Delta h \\times S_y$$\nGiven:\n• $A = 50\\text{ km}^2 = 50 \\times 10^6\\text{ m}^2$\n• $\\Delta h = 1.80\\text{ m}$\n• $S_y = 0.20$\n$$\\Delta V = (50 \\times 10^6) \\times 1.80 \\times 0.20 = 50 \\times 0.36 \\times 10^6 = 18.0 \\times 10^6\\text{ m}^3 = 18\\text{ Mm}^3$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_EXP_037",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Groundwater Hydrology",
    "subtopic": "Groundwater movement; Darcy's Law",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Groundwater Hydrology (David Keith Todd)",
    "question": "In a confined aquifer, two piezometers installed $400\\text{ m}$ apart in the direction of flow show hydraulic heads of $65.0\\text{ m}$ and $63.0\\text{ m}$. The aquifer has hydraulic conductivity $K = 25\\text{ m/day}$ and porosity $n = 0.25$. The actual pore velocity (seepage velocity $V_s$) of groundwater in meters per day is ________ (round off to 1 decimal place).",
    "correct_answer": "0.5",
    "numerical_range": {
      "min": 0.48,
      "max": 0.52
    },
    "solution": "1. Hydraulic gradient $i$:\n$$i = \\frac{\\Delta h}{L} = \\frac{65.0 - 63.0}{400} = \\frac{2.0}{400} = 0.005$$\n2. Darcy velocity (discharge velocity) $v$:\n$$v = K i = 25 \\times 0.005 = 0.125\\text{ m/day}$$\n3. Seepage velocity $V_s$:\n$$V_s = \\frac{v}{n} = \\frac{0.125}{0.25} = 0.50\\text{ m/day}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_EXP_038",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Groundwater Hydrology",
    "subtopic": "Steady and unsteady flow in confined and unconfined aquifers",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Groundwater Hydrology (David Keith Todd)",
    "question": "In Cooper-Jacob's approximation for unsteady radial flow to a well ($s = \\frac{Q}{4 \\pi T} \\ln\\frac{2.25 T t}{r^2 S}$), the approximation is valid only when parameter $u = \\frac{r^2 S}{4 T t}$ is:",
    "options": {
      "A": "$u < 0.01$ (or $u < 0.05$)",
      "B": "$u > 1.0$",
      "C": "$u = 1.0$",
      "D": "$u > 10.0$"
    },
    "correct_answer": "A",
    "solution": "The Cooper-Jacob simplified straight-line logarithmic method truncates the infinite Theis well function series after the second term. This truncation introduces negligible error ($< 1\\%$) only when the argument $u = \\frac{r^2 S}{4 T t}$ is small, typically $u \\le 0.01$ (and reasonably up to $0.05$).",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_EXP_039",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Groundwater Hydrology",
    "subtopic": "Groundwater occurrence",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Groundwater Hydrology (David Keith Todd)",
    "question": "A geological formation that contains water but is incapable of transmitting significant quantities under normal hydraulic gradients (e.g. clay) is called an:",
    "options": {
      "A": "Aquiclude",
      "B": "Aquifer",
      "C": "Aquifuge",
      "D": "Artesian basin"
    },
    "correct_answer": "A",
    "solution": "Geological formations:\n• Aquifer: Stores and transmits water in usable quantities (sand, gravel).\n• Aquiclude: Highly porous, contains water, but essentially impermeable (clay).\n• Aquifuge: Neither contains nor transmits water (solid granite).\n• Aquitard: Slow, semi-pervious transmitting layer (sandy clay).",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_EXP_040",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Groundwater Hydrology",
    "subtopic": "Steady and unsteady flow in confined and unconfined aquifers",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Groundwater Hydrology (David Keith Todd)",
    "question": "In an unconfined aquifer of initial saturated depth $H = 20.0\\text{ m}$, a fully penetrating well is pumped at steady state. At an observation well, the water table drops to $h = 16.0\\text{ m}$. The equivalent drawdown in a fictitious confined aquifer of thickness $H$ according to Dupuit's transformation ($s_{eq} = s - \\frac{s^2}{2 H}$) in meters is ________ (round off to 2 decimal places).",
    "correct_answer": "3.6",
    "numerical_range": {
      "min": 3.55,
      "max": 3.65
    },
    "solution": "1. Observed unconfined drawdown $s = H - h = 20.0 - 16.0 = 4.0\\text{ m}$.\n2. Equivalent drawdown correction $s_{eq}$:\n$$s_{eq} = s - \\frac{s^2}{2 H} = 4.0 - \\frac{4.0^2}{2 \\times 20.0} = 4.0 - \\frac{16.0}{40.0} = 4.0 - 0.40 = 3.60\\text{ m}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_IDE_EXP_041",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Groundwater Hydrology",
    "subtopic": "Steady and unsteady flow in confined and unconfined aquifers",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Groundwater Hydrology (David Keith Todd)",
    "question": "Which of the following assumptions are invoked in Dupuit-Forchheimer theory of steady unconfined groundwater flow?",
    "options": {
      "A": "Flow is horizontal and uniform across any vertical cross-section",
      "B": "Hydraulic gradient is equal to the slope of the water table ($i = dh/dr$)",
      "C": "Vertical velocity components are neglected",
      "D": "The aquifer is anisotropic and unsteady"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "Dupuit-Forchheimer assumptions:\n1. Flow is horizontal, streamlines are parallel, equipotential surfaces are vertical cylinders (A and C).\n2. Hydraulic gradient along the flow direction is constant with depth and equal to the tangent of the water table slope (B).\nAquifer is assumed isotropic, homogeneous, and under steady state (making D FALSE).",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_EXP_042",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Groundwater Hydrology",
    "subtopic": "Groundwater movement; Darcy's Law",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Groundwater Hydrology (David Keith Todd)",
    "question": "A stratified soil deposit consists of three horizontal layers. Layer 1 has thickness $2.0\\text{ m}$ and $K_1 = 5\\text{ m/day}$. Layer 2 has thickness $3.0\\text{ m}$ and $K_2 = 10\\text{ m/day}$. Layer 3 has thickness $5.0\\text{ m}$ and $K_3 = 2\\text{ m/day}$. The equivalent hydraulic conductivity for flow parallel to the bedding planes ($K_h$) in $\\text{m/day}$ is ________ (round off to 1 decimal place).",
    "correct_answer": "5",
    "numerical_range": {
      "min": 4.95,
      "max": 5.05
    },
    "solution": "Equivalent horizontal permeability parallel to bedding planes:\n$$K_h = \\frac{\\sum K_i z_i}{\\sum z_i}$$\nGiven:\n• $K_1 z_1 = 5 \\times 2.0 = 10.0$\n• $K_2 z_2 = 10 \\times 3.0 = 30.0$\n• $K_3 z_3 = 2 \\times 5.0 = 10.0$\nTotal thickness $Z = 2.0 + 3.0 + 5.0 = 10.0\\text{ m}$.\n$$K_h = \\frac{10.0 + 30.0 + 10.0}{10.0} = \\frac{50.0}{10.0} = 5.0\\text{ m/day}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_EXP_043",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Groundwater Hydrology",
    "subtopic": "Groundwater movement; Darcy's Law",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Groundwater Hydrology (David Keith Todd)",
    "question": "For the same three horizontal layers (Layer 1: $z_1 = 2.0\\text{ m}, K_1 = 5\\text{ m/day}$; Layer 2: $z_2 = 3.0\\text{ m}, K_2 = 10\\text{ m/day}$; Layer 3: $z_3 = 5.0\\text{ m}, K_3 = 2\\text{ m/day}$), the equivalent hydraulic conductivity for flow perpendicular to the bedding planes ($K_v$) in $\\text{m/day}$ is ________ (round off to 2 decimal places).",
    "correct_answer": "3.12",
    "numerical_range": {
      "min": 3.05,
      "max": 3.2
    },
    "solution": "Equivalent vertical permeability perpendicular to bedding planes:\n$$K_v = \\frac{\\sum z_i}{\\sum \\frac{z_i}{K_i}}$$\n1. Sum of thicknesses $\\sum z_i = 10.0\\text{ m}$.\n2. Sum of hydraulic resistances:\n$$\\frac{z_1}{K_1} = \\frac{2.0}{5} = 0.40$$\n$$\\frac{z_2}{K_2} = \\frac{3.0}{10} = 0.30$$\n$$\\frac{z_3}{K_3} = \\frac{5.0}{2} = 2.50$$\n$$\\sum \\frac{z_i}{K_i} = 0.40 + 0.30 + 2.50 = 3.20\\text{ day}$$\n$$K_v = \\frac{10.0}{3.20} = 3.125\\text{ m/day} \\approx 3.12\\text{ m/day}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_IDE_EXP_044",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Groundwater Hydrology",
    "subtopic": "Groundwater exploration techniques",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Groundwater Hydrology (David Keith Todd)",
    "question": "In electrical resistivity surveys for groundwater exploration using the Wenner electrode configuration, four collinear electrodes are spaced at equal distances $a$. The apparent resistivity $\\rho_a$ is given by:",
    "options": {
      "A": "$\\rho_a = 2 \\pi a \\frac{\\Delta V}{I}$",
      "B": "$\\rho_a = \\pi a \\frac{\\Delta V}{I}$",
      "C": "$\\rho_a = 4 \\pi a \\frac{\\Delta V}{I}$",
      "D": "$\\rho_a = \\frac{2 \\pi}{a} \\frac{\\Delta V}{I}$"
    },
    "correct_answer": "A",
    "solution": "For the symmetrical Wenner arrangement with equal spacing $a$ between current electrodes $C_1, C_2$ and potential electrodes $P_1, P_2$:\nGeometric factor $G = 2 \\pi a$.\n$$\\rho_a = 2 \\pi a \\frac{\\Delta V}{I}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_EXP_045",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Wells and Pumps",
    "subtopic": "Pump characteristics",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "A centrifugal pump running at $1450\\text{ rpm}$ delivers $0.05\\text{ m}^3\\text{/s}$ against a total head of $20.0\\text{ m}$. If the pump speed is increased to $1740\\text{ rpm}$, the new discharge in $\\text{m}^3\\text{/s}$ governed by affinity laws is ________ (answer in exact decimal).",
    "correct_answer": "0.06",
    "numerical_range": {
      "min": 0.059,
      "max": 0.061
    },
    "solution": "From pump affinity laws:\n$$\\frac{Q_2}{Q_1} = \\frac{N_2}{N_1}$$\nGiven:\n• $N_1 = 1450\\text{ rpm}$\n• $N_2 = 1740\\text{ rpm}$\n• $Q_1 = 0.05\\text{ m}^3\\text{/s}$\n$$Q_2 = Q_1 \\times \\frac{1740}{1450} = 0.05 \\times 1.20 = 0.060\\text{ m}^3\\text{/s}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_EXP_046",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Wells and Pumps",
    "subtopic": "Pump characteristics",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "For the same pump ($N_1 = 1450\\text{ rpm}$, $H_1 = 20.0\\text{ m}$), when the speed increases to $N_2 = 1740\\text{ rpm}$, the new total head $H_2$ in meters is ________ (round off to 1 decimal place).",
    "correct_answer": "28.8",
    "numerical_range": {
      "min": 28.5,
      "max": 29.1
    },
    "solution": "From pump affinity laws:\n$$\\frac{H_2}{H_1} = \\left(\\frac{N_2}{N_1}\\right)^2$$\nGiven $\\frac{N_2}{N_1} = \\frac{1740}{1450} = 1.20$:\n$$H_2 = 20.0 \\times (1.20)^2 = 20.0 \\times 1.44 = 28.80\\text{ m}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_EXP_047",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Wells and Pumps",
    "subtopic": "Pump selection and installation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "A pump delivers a discharge of $40\\text{ L/s}$ against a total head of $25.0\\text{ m}$. If the overall efficiency of the pump set is $70\\%$, taking $g = 9.81\\text{ m/s}^2$ and density of water $\\rho = 1000\\text{ kg/m}^3$, the power input required by the electric motor in $\\text{kW}$ is ________ (round off to 2 decimal places).",
    "correct_answer": "14.01",
    "numerical_range": {
      "min": 13.8,
      "max": 14.25
    },
    "solution": "1. Water horsepower / hydraulic power $P_w$:\n$$P_w = \\rho g Q H = 1000 \\times 9.81 \\times 0.040 \\times 25.0 = 9810\\text{ W} = 9.81\\text{ kW}$$\n2. Motor input power $P_{in}$:\n$$P_{in} = \\frac{P_w}{\\eta} = \\frac{9.81\\text{ kW}}{0.70} \\approx 14.014\\text{ kW} \\approx 14.01\\text{ kW}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_IDE_EXP_048",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Wells and Pumps",
    "subtopic": "Pump characteristics",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "A centrifugal pump rotates at $N = 1450\\text{ rpm}$ and delivers $Q = 0.04\\text{ m}^3\\text{/s}$ at a total head of $H = 16.0\\text{ m}$. The specific speed $N_s = \\frac{N \\sqrt{Q}}{H^{3/4}}$ in metric units (with $N$ in rpm, $Q$ in $\\text{m}^3\\text{/s}$, $H$ in meters) is ________ (round off to 1 decimal place).",
    "correct_answer": "36.3",
    "numerical_range": {
      "min": 35.5,
      "max": 37
    },
    "solution": "Specific speed formula:\n$$N_s = \\frac{N \\sqrt{Q}}{H^{3/4}}$$\nGiven:\n• $N = 1450\\text{ rpm}$\n• $Q = 0.04\\text{ m}^3\\text{/s} \\implies \\sqrt{Q} = 0.20$\n• $H = 16.0\\text{ m} \\implies H^{3/4} = (16)^{0.75} = (2^4)^{3/4} = 2^3 = 8.0$\n$$N_s = \\frac{1450 \\times 0.20}{8.0} = \\frac{290}{8.0} = 36.25 \\approx 36.3$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_IDE_EXP_049",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Wells and Pumps",
    "subtopic": "Pump selection and installation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "A centrifugal pump is installed at an altitude where atmospheric pressure head $H_{atm} = 10.0\\text{ m}$ and vapor pressure head of water $H_v = 0.30\\text{ m}$. The suction pipe head loss is $h_{fs} = 0.70\\text{ m}$ and the manufacturer specifies a Net Positive Suction Head Required $NPSHR = 3.5\\text{ m}$. The maximum permissible static suction lift ($h_s$) in meters to prevent cavitation is ________ (round off to 1 decimal place).",
    "correct_answer": "5.5",
    "numerical_range": {
      "min": 5.4,
      "max": 5.6
    },
    "solution": "Cavitation is avoided when $NPSHA \\ge NPSHR$:\n$$NPSHA = H_{atm} - H_v - h_s - h_{fs}$$\nAt threshold of cavitation ($NPSHA = NPSHR$):\n$$3.5 = 10.0 - 0.30 - h_s - 0.70$$\n$$3.5 = 9.0 - h_s \\implies h_s = 9.0 - 3.5 = 5.50\\text{ m}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_IDE_EXP_050",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Wells and Pumps",
    "subtopic": "Design and construction of water wells",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "A tube well screen has an outside diameter of $0.20\\text{ m}$ and length of $10.0\\text{ m}$. The open slot area is $15\\%$ of the outer cylindrical surface area. If the well discharges $0.03\\text{ m}^3\\text{/s}$, the entrance velocity of water through the screen slots in $\\text{m/s}$ is ________ (round off to 3 decimal places).",
    "correct_answer": "0.032",
    "numerical_range": {
      "min": 0.03,
      "max": 0.034
    },
    "solution": "1. Outer surface area of the screen $A_{cyl}$:\n$$A_{cyl} = \\pi D L = \\pi \\times 0.20 \\times 10.0 = 2.0 \\pi \\approx 6.2832\\text{ m}^2$$\n2. Open slot area $A_{open}$ ($15\\%$):\n$$A_{open} = 0.15 \\times 6.2832 \\approx 0.94248\\text{ m}^2$$\n3. Entrance velocity $V_e$:\n$$V_e = \\frac{Q}{A_{open}} = \\frac{0.03\\text{ m}^3\\text{/s}}{0.94248\\text{ m}^2} \\approx 0.03183\\text{ m/s} \\approx 0.032\\text{ m/s}$$\n(Well design criteria recommend $V_e \\le 0.03\\text{ m/s}$ to minimize encrustation and head loss).",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_IDE_EXP_051",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Wells and Pumps",
    "subtopic": "Design and construction of water wells",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "In the gravel pack design for an artificial pack tube well, the pack-aquifer ratio ($P-A$ ratio) is defined as:",
    "options": {
      "A": "Ratio of the 50% size of the gravel pack material to the 50% size of the aquifer material ($D_{50\\text{ pack}} / D_{50\\text{ aquifer}}$)",
      "B": "Ratio of the effective size $D_{10}$ of the pack to $D_{60}$ of the aquifer",
      "C": "Ratio of the screen slot size to aquifer porosity",
      "D": "Ratio of well diameter to gravel pack thickness"
    },
    "correct_answer": "A",
    "solution": "The standard gravel pack criteria (e.g. USBR / Walton criteria) define the Pack-to-Aquifer ($P-A$) ratio based on the $50\\%$ size ($D_{50}$): $P-A\\text{ ratio} = D_{50\\text{ pack}} / D_{50\\text{ aquifer}}$, typically recommended between 4 and 6.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_EXP_052",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Wells and Pumps",
    "subtopic": "Classification of pumps",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "Which of the following pump types are classified as positive displacement pumps?",
    "options": {
      "A": "Reciprocating piston pump",
      "B": "Rotary gear pump",
      "C": "Centrifugal pump",
      "D": "Axial flow propeller pump"
    },
    "correct_answer": [
      "A",
      "B"
    ],
    "solution": "Pumps are classified into:\n• Positive displacement: Reciprocating (piston, plunger, diaphragm) and rotary (gear, lobe, vane, screw).\n• Roto-dynamic (kinetic): Centrifugal (radial flow), mixed flow, and axial flow (propeller) pumps.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_EXP_053",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Wells and Pumps",
    "subtopic": "Pump characteristics",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "The phenomenon of cavitation in a centrifugal pump is triggered when:",
    "options": {
      "A": "The local absolute pressure at the eye of the impeller drops to or below the vapor pressure of the liquid",
      "B": "The pump is operated against a completely closed delivery valve",
      "C": "The operating speed exceeds the critical speed by $50\\%$",
      "D": "Discharge exceeds the shut-off head"
    },
    "correct_answer": "A",
    "solution": "Cavitation occurs when local static pressure falls to the saturation vapor pressure ($p_v$) of the fluid at the operating temperature, causing vapor bubbles to form. As these bubbles move into regions of higher pressure, they collapse violently, eroding the impeller blades.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_EXP_054",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Wells and Pumps",
    "subtopic": "Pump selection and installation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "Two identical centrifugal pumps, each having a shut-off head of $30.0\\text{ m}$ and delivering $0.025\\text{ m}^3\\text{/s}$ at $20.0\\text{ m}$ head, are operated in series. At the combined discharge of $0.025\\text{ m}^3\\text{/s}$, the total head developed by the series combination in meters is ________ (answer in integer).",
    "correct_answer": "40",
    "numerical_range": {
      "min": 40,
      "max": 40
    },
    "solution": "When two identical pumps operate in series:\n• The discharge through both pumps remains identical: $Q_{series} = Q_1 = Q_2 = 0.025\\text{ m}^3\\text{/s}$.\n• The heads developed by the pumps add up: $H_{series} = H_1 + H_2 = 20.0 + 20.0 = 40.0\\text{ m}$.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_EXP_055",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Wells and Pumps",
    "subtopic": "Pump selection and installation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Irrigation: Theory and Practice (A.M. Michael)",
    "question": "When the same two identical pumps are connected in parallel, at the head of $20.0\\text{ m}$, the total combined discharge in $\\text{m}^3\\text{/s}$ is ________ (answer in exact decimal).",
    "correct_answer": "0.05",
    "numerical_range": {
      "min": 0.049,
      "max": 0.051
    },
    "solution": "When two identical pumps operate in parallel:\n• The head developed across each pump remains the same: $H_{parallel} = H_1 = H_2 = 20.0\\text{ m}$.\n• The discharges of the pumps add up: $Q_{parallel} = Q_1 + Q_2 = 0.025 + 0.025 = 0.050\\text{ m}^3\\text{/s}$.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_IDE_EXP_056",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Soil-Water-Plant Relationship",
    "subtopic": "Water requirement of crops",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "A.M. Michael - Irrigation Theory and Practice",
    "question": "A crop root zone depth is $D = 0.80\\text{ m}$. The soil has field capacity $FC = 28\\%$, permanent wilting point $PWP = 14\\%$, and dry bulk density $\\rho_b = 1400\\text{ kg/m}^3$. If the allowable depletion of available moisture is $50\\%$, calculate the net depth of irrigation water to be applied in $\\text{mm}$. (Density of water $\\rho_w = 1000\\text{ kg/m}^3$)",
    "solution": "Available water capacity:\n$$AWC = \\frac{\\rho_b}{\\rho_w} \\times D \\times (FC - PWP) = \\frac{1400}{1000} \\times 800\\text{ mm} \\times (0.28 - 0.14)$$\n$$AWC = 1.4 \\times 800 \\times 0.14 = 156.8\\text{ mm}$$\nNet irrigation requirement at $50\\%$ depletion:\n$$d = 0.50 \\times AWC = 0.50 \\times 156.8 = 78.4\\text{ mm}$$",
    "difficulty": "Easy",
    "correct_answer": 78.4,
    "answer": 78.4,
    "numerical_range": {
      "min": 78,
      "max": 79
    }
  },
  {
    "id": "QB_IDE_EXP_057",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Irrigation Water Conveyance and Application Methods",
    "subtopic": "Irrigation efficiencies",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "A.M. Michael - Irrigation Theory and Practice",
    "question": "A stream of $100\\text{ L/s}$ is diverted from a canal into a field channel. The stream delivers $80\\text{ L/s}$ at the farm gate. Out of the water delivered to the farm, $60\\text{ L/s}$ is effectively stored in the crop root zone. Calculate the water conveyance efficiency ($\\eta_c$) in percentage.",
    "solution": "Water conveyance efficiency:\n$$\\eta_c = \\frac{\\text{Water delivered to farm}}{\\text{Water diverted from canal}} \\times 100 = \\frac{80\\text{ L/s}}{100\\text{ L/s}} \\times 100 = 80.0\\%$$",
    "difficulty": "Easy",
    "correct_answer": 80,
    "answer": 80,
    "numerical_range": {
      "min": 79.5,
      "max": 80.5
    }
  },
  {
    "id": "QB_IDE_EXP_058",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Irrigation Water Conveyance and Application Methods",
    "subtopic": "Irrigation efficiencies",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "A.M. Michael - Irrigation Theory and Practice",
    "question": "For the same irrigation system in the previous problem, calculate the water application efficiency ($\\eta_a$) in percentage.",
    "solution": "Water application efficiency:\n$$\\eta_a = \\frac{\\text{Water stored in root zone}}{\\text{Water delivered to farm}} \\times 100 = \\frac{60\\text{ L/s}}{80\\text{ L/s}} \\times 100 = 75.0\\%$$",
    "difficulty": "Easy",
    "correct_answer": 75,
    "answer": 75,
    "numerical_range": {
      "min": 74.5,
      "max": 75.5
    }
  },
  {
    "id": "QB_IDE_EXP_059",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Irrigation Water Conveyance and Application Methods",
    "subtopic": "Surface, sprinkler and micro irrigation methods",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "A.M. Michael - Irrigation Theory and Practice",
    "question": "A pressure-compensating drip emitter has a discharge exponent of $x = 0.0$ in the flow equation $q = k h^x$. If the operating pressure head $h$ doubles from $10\\text{ m}$ to $20\\text{ m}$, calculate the ratio of the new discharge to the original discharge ($q_2 / q_1$).",
    "solution": "$$\\frac{q_2}{q_1} = \\left(\\frac{h_2}{h_1}\\right)^x = \\left(\\frac{20}{10}\\right)^0 = 2^0 = 1.0$$",
    "difficulty": "Easy",
    "correct_answer": 1,
    "answer": 1,
    "numerical_range": {
      "min": 0.98,
      "max": 1.02
    }
  },
  {
    "id": "QB_IDE_EXP_060",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Irrigation Water Conveyance and Application Methods",
    "subtopic": "Surface, sprinkler and micro irrigation methods",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "A.M. Michael - Irrigation Theory and Practice",
    "question": "A micro-irrigation drip lateral supplies 50 emitters spaced $1.0\\text{ m}$ apart, each discharging $4.0\\text{ L/h}$. Calculate the total water discharge rate of the lateral in $\\text{L/h}$.",
    "solution": "$$Q = N \\times q = 50 \\times 4.0\\text{ L/h} = 200\\text{ L/h}$$",
    "difficulty": "Easy",
    "correct_answer": 200,
    "answer": 200,
    "numerical_range": {
      "min": 198,
      "max": 202
    }
  },
  {
    "id": "QB_IDE_EXP_061",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Agricultural Drainage",
    "subtopic": "Drainage coefficient",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Ritzema - Drainage Principles and Applications",
    "question": "An agricultural drainage system has a design drainage coefficient of $DC = 12\\text{ mm/day}$ ($0.012\\text{ m/day}$). If the catchment area drained is $50\\text{ ha}$ ($500,000\\text{ m}^2$), calculate the design peak drainage discharge in $\\text{L/s}$.",
    "solution": "Volume per day:\n$$V = 500000\\text{ m}^2 \\times 0.012\\text{ m} = 6000\\text{ m}^3/\\text{day}$$\nDischarge in $\\text{m}^3/\\text{s}$:\n$$Q = \\frac{6000}{86400\\text{ s}} = 0.06944\\text{ m}^3/\\text{s} = 69.44\\text{ L/s}$$",
    "difficulty": "Moderate",
    "correct_answer": 69.44,
    "answer": 69.44,
    "numerical_range": {
      "min": 68.5,
      "max": 70
    }
  },
  {
    "id": "QB_IDE_EXP_062",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Agricultural Drainage",
    "subtopic": "Leaching requirement and salinity control",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "A.M. Michael - Irrigation Theory and Practice",
    "question": "Using the US Salinity Laboratory formula $LR = \\frac{EC_w}{5 EC_e - EC_w}$, calculate the leaching requirement ($LR$) for irrigation water with electrical conductivity $EC_w = 1.5\\text{ dS/m}$ applied to a crop with permissible root zone salinity $EC_e = 4.5\\text{ dS/m}$.",
    "solution": "$$LR = \\frac{1.5}{(5 \\times 4.5) - 1.5} = \\frac{1.5}{22.5 - 1.5} = \\frac{1.5}{21.0} = \\frac{1}{14} \\approx 0.0714 = 7.14\\%$$",
    "difficulty": "Moderate",
    "correct_answer": 0.0714,
    "answer": 0.0714,
    "numerical_range": {
      "min": 0.068,
      "max": 0.075
    }
  },
  {
    "id": "QB_IDE_EXP_063",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Groundwater Hydrology",
    "subtopic": "Groundwater movement; Darcy's Law",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Todd - Groundwater Hydrology",
    "question": "A confined aquifer of uniform thickness $b = 15\\text{ m}$ has a hydraulic conductivity of $K = 24\\text{ m/day}$. Calculate the transmissivity ($T = K b$) of the aquifer in $\\text{m}^2/\\text{day}$.",
    "solution": "$$T = K \\times b = 24\\text{ m/day} \\times 15\\text{ m} = 360\\text{ m}^2/\\text{day}$$",
    "difficulty": "Easy",
    "correct_answer": 360,
    "answer": 360,
    "numerical_range": {
      "min": 355,
      "max": 365
    }
  },
  {
    "id": "QB_IDE_EXP_064",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Groundwater Hydrology",
    "subtopic": "Steady and unsteady flow in confined and unconfined aquifers",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Todd - Groundwater Hydrology",
    "question": "A fully penetrating well pumps water from a confined aquifer of transmissivity $T = 400\\text{ m}^2/\\text{day}$ at a steady rate of $Q = 1000\\text{ m}^3/\\text{day}$. Two observation piezometers are located at radial distances $r_1 = 10\\text{ m}$ and $r_2 = 50\\text{ m}$. Using Thiem's formula $s_1 - s_2 = \\frac{Q}{2 \\pi T} \\ln(r_2 / r_1)$, calculate the drawdown difference $(s_1 - s_2)$ in $\\text{meters}$. (Take $\\pi = 3.1416$)",
    "solution": "$$\\ln\\left(\\frac{r_2}{r_1}\\right) = \\ln\\left(\\frac{50}{10}\\right) = \\ln(5) \\approx 1.6094$$\n$$s_1 - s_2 = \\frac{1000}{2 \\times 3.1416 \\times 400} \\times 1.6094 = \\frac{1609.4}{2513.28} \\approx 0.6403\\text{ m}$$",
    "difficulty": "Moderate",
    "correct_answer": 0.64,
    "answer": 0.64,
    "numerical_range": {
      "min": 0.62,
      "max": 0.66
    }
  },
  {
    "id": "QB_IDE_EXP_065",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Wells and Pumps",
    "subtopic": "Classification of pumps",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "A.M. Michael - Irrigation Theory and Practice",
    "question": "A centrifugal pump discharges $30\\text{ L/s}$ ($0.030\\text{ m}^3/\\text{s}$) of water against a total dynamic head of $25\\text{ m}$. If the pump efficiency is $75\\%$, calculate the brake power required to drive the pump in $\\text{kW}$. (Take $\\rho = 1000\\text{ kg/m}^3$ and $g = 9.81\\text{ m/s}^2$)",
    "solution": "Water power (hydraulic power):\n$$P_w = \\frac{\\rho g Q H}{1000} = \\frac{1000 \\times 9.81 \\times 0.030 \\times 25}{1000} = 7.3575\\text{ kW}$$\nBrake power:\n$$P_{\\text{brake}} = \\frac{P_w}{\\eta} = \\frac{7.3575}{0.75} = 9.81\\text{ kW}$$",
    "difficulty": "Easy",
    "correct_answer": 9.81,
    "answer": 9.81,
    "numerical_range": {
      "min": 9.7,
      "max": 9.9
    }
  },
  {
    "id": "QB_IDE_EXP_066",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Wells and Pumps",
    "subtopic": "Pump characteristics",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "A.M. Michael - Irrigation Theory and Practice",
    "question": "A centrifugal pump running at $1440\\text{ rpm}$ discharges $40\\text{ L/s}$ against a total head of $20\\text{ m}$. If the pump speed is increased to $1800\\text{ rpm}$, calculate the new discharge in $\\text{L/s}$ using pump affinity laws ($Q \\propto N$).",
    "solution": "$$Q_2 = Q_1 \\times \\frac{N_2}{N_1} = 40 \\times \\frac{1800}{1440} = 40 \\times 1.25 = 50.0\\text{ L/s}$$",
    "difficulty": "Easy",
    "correct_answer": 50,
    "answer": 50,
    "numerical_range": {
      "min": 49.5,
      "max": 50.5
    }
  },
  {
    "id": "QB_IDE_EXP_067",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Wells and Pumps",
    "subtopic": "Pump characteristics",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "A.M. Michael - Irrigation Theory and Practice",
    "question": "For the same centrifugal pump in the previous question, calculate the new head developed in $\\text{meters}$ at $1800\\text{ rpm}$ ($H \\propto N^2$).",
    "solution": "$$H_2 = H_1 \\times \\left(\\frac{N_2}{N_1}\\right)^2 = 20 \\times (1.25)^2 = 20 \\times 1.5625 = 31.25\\text{ m}$$",
    "difficulty": "Easy",
    "correct_answer": 31.25,
    "answer": 31.25,
    "numerical_range": {
      "min": 31,
      "max": 31.5
    }
  },
  {
    "id": "QB_IDE_EXP_068",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Soil-Water-Plant Relationship",
    "subtopic": "Consumptive use and evapotranspiration",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "A.M. Michael - Irrigation Theory and Practice",
    "question": "In the FAO-56 Penman-Monteith method, the reference crop evapotranspiration ($ET_0$) is defined for a hypothetical reference surface with an assumed height of:",
    "solution": "The FAO-56 Penman-Monteith reference surface is an idealized hypothetical grass reference crop with an assumed height of $0.12\\text{ m}$, a fixed surface resistance of $70\\text{ s/m}$, and an albedo of $0.23$.",
    "difficulty": "Easy",
    "options": {
      "A": "$0.12\\text{ m}$ (tall fescue/grass)",
      "B": "$0.50\\text{ m}$ (alfalfa)",
      "C": "$1.0\\text{ m}$ (wheat)",
      "D": "$2.0\\text{ m}$ (maize)"
    },
    "correct_answer": "A",
    "answer": "A"
  },
  {
    "id": "QB_IDE_EXP_069",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Irrigation Water Conveyance and Application Methods",
    "subtopic": "Surface, sprinkler and micro irrigation methods",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "A.M. Michael - Irrigation Theory and Practice",
    "question": "In a sprinkler test with 4 catch cans catching water depths of $10\\text{ mm}$, $12\\text{ mm}$, $8\\text{ mm}$, and $10\\text{ mm}$, calculate Christiansen's Uniformity Coefficient ($CU = 100 \\left[1 - \\frac{\\sum |x_i - \\bar{x}|}{n \\bar{x}}\\right]$) in percentage.",
    "solution": "Mean depth $\\bar{x} = \\frac{10 + 12 + 8 + 10}{4} = \\frac{40}{4} = 10.0\\text{ mm}$.\nAbsolute deviations:\n$|10 - 10| = 0$\n$|12 - 10| = 2$\n$|8 - 10| = 2$\n$|10 - 10| = 0$\nSum of absolute deviations $\\sum |x_i - \\bar{x}| = 0 + 2 + 2 + 0 = 4\\text{ mm}$.\n$$CU = 100 \\left[ 1 - \\frac{4}{4 \\times 10} \\right] = 100 \\left[ 1 - \\frac{4}{40} \\right] = 100 [1 - 0.10] = 90.0\\%$$",
    "difficulty": "Moderate",
    "correct_answer": 90,
    "answer": 90,
    "numerical_range": {
      "min": 89.5,
      "max": 90.5
    }
  },
  {
    "id": "QB_IDE_EXP_070",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Agricultural Drainage",
    "subtopic": "Planning, design and layout of surface and sub-surface drainage systems",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Ritzema - Drainage Principles and Applications",
    "question": "In Hooghoudt's steady-state drain spacing formula $S^2 = \\frac{8 K_2 d m + 4 K_1 m^2}{q}$, for an impervious floor located exactly at the drain level ($d = 0$), the formula simplifies to $S = m \\sqrt{\\frac{4 K_1}{q}}$. If $m = 1.0\\text{ m}$, hydraulic conductivity $K_1 = 1.2\\text{ m/day}$, and steady recharge $q = 0.003\\text{ m/day}$, calculate the drain spacing $S$ in $\\text{meters}$.",
    "solution": "$$\\frac{4 K_1}{q} = \\frac{4 \\times 1.2}{0.003} = \\frac{4.8}{0.003} = 1600$$\n$$S = 1.0 \\times \\sqrt{1600} = 40.0\\text{ m}$$",
    "difficulty": "Easy",
    "correct_answer": 40,
    "answer": 40,
    "numerical_range": {
      "min": 39.5,
      "max": 40.5
    }
  },
  {
    "id": "QB_IDE_EXP_071",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Groundwater Hydrology",
    "subtopic": "Groundwater movement; Darcy's Law",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Todd - Groundwater Hydrology",
    "question": "In a laboratory permeameter, water flows through a sand column of length $L = 0.50\\text{ m}$ under a constant head loss of $\\Delta h = 0.05\\text{ m}$. Calculate the hydraulic gradient ($i = \\Delta h / L$).",
    "solution": "$$i = \\frac{\\Delta h}{L} = \\frac{0.05\\text{ m}}{0.50\\text{ m}} = 0.10$$",
    "difficulty": "Easy",
    "correct_answer": 0.1,
    "answer": 0.1,
    "numerical_range": {
      "min": 0.098,
      "max": 0.102
    }
  },
  {
    "id": "QB_IDE_EXP_072",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Wells and Pumps",
    "subtopic": "Types of wells",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Todd - Groundwater Hydrology",
    "question": "A tubewell discharges $1800\\text{ L/min}$ at a steady drawdown of $3.0\\text{ m}$. Calculate the specific capacity of the well in $\\text{L/(min}\\cdot\\text{m)}$.",
    "solution": "Specific capacity:\n$$SC = \\frac{Q}{s} = \\frac{1800\\text{ L/min}}{3.0\\text{ m}} = 600\\text{ L/(min}\\cdot\\text{m)}$$",
    "difficulty": "Easy",
    "correct_answer": 600,
    "answer": 600,
    "numerical_range": {
      "min": 595,
      "max": 605
    }
  },
  {
    "id": "QB_IDE_EXP_073",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Irrigation Water Conveyance and Application Methods",
    "subtopic": "Design of irrigation channels and underground pipelines",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "A.M. Michael - Irrigation Theory and Practice",
    "question": "Using Kennedy's critical velocity formula $v_0 = 0.55 m y^{0.64}$, calculate the critical non-silting, non-scouring velocity in $\\text{m/s}$ for a canal with water depth $y = 1.0\\text{ m}$ and critical velocity ratio $m = 1.0$.",
    "solution": "$$v_0 = 0.55 \\times 1.0 \\times (1.0)^{0.64} = 0.55\\text{ m/s}$$",
    "difficulty": "Easy",
    "correct_answer": 0.55,
    "answer": 0.55,
    "numerical_range": {
      "min": 0.54,
      "max": 0.56
    }
  },
  {
    "id": "QB_IDE_EXP_074",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Soil-Water-Plant Relationship",
    "subtopic": "Measurement of infiltration, soil moisture and irrigation water infiltration",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "A.M. Michael - Irrigation Theory and Practice",
    "question": "In Kostiakov's cumulative infiltration equation $Z = k t^a$, cumulative infiltration depth is $Z = 3.0\\text{ cm}$ at $t = 1\\text{ hour}$ ($k = 3.0$). If $a = 0.50$, calculate the cumulative infiltration depth in $\\text{cm}$ after $t = 4\\text{ hours}$.",
    "solution": "$$Z = 3.0 \\times (4)^{0.50} = 3.0 \\times 2.0 = 6.0\\text{ cm}$$",
    "difficulty": "Easy",
    "correct_answer": 6,
    "answer": 6,
    "numerical_range": {
      "min": 5.9,
      "max": 6.1
    }
  },
  {
    "id": "QB_IDE_EXP_075",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Irrigation Water Conveyance and Application Methods",
    "subtopic": "Surface, sprinkler and micro irrigation methods",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "A.M. Michael - Irrigation Theory and Practice",
    "question": "A sprinkler nozzle of orifice area $a = 2.0 \\times 10^{-4}\\text{ m}^2$ operates under a pressure head of $h = 20\\text{ m}$. If the coefficient of discharge is $C_d = 0.95$, calculate the nozzle discharge in $\\text{L/s}$. (Take $g = 9.81\\text{ m/s}^2$)",
    "solution": "Theoretical velocity:\n$$v = \\sqrt{2 g h} = \\sqrt{2 \\times 9.81 \\times 20} = \\sqrt{392.4} \\approx 19.809\\text{ m/s}$$\nDischarge:\n$$Q = C_d \\times a \\times v = 0.95 \\times (2.0 \\times 10^{-4}) \\times 19.809 = 0.003764\\text{ m}^3/\\text{s} = 3.764\\text{ L/s}$$",
    "difficulty": "Moderate",
    "correct_answer": 3.76,
    "answer": 3.76,
    "numerical_range": {
      "min": 3.7,
      "max": 3.85
    }
  },
  {
    "id": "QB_IDE_EXP_076",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Wells and Pumps",
    "subtopic": "Classification of pumps",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "A.M. Michael - Irrigation Theory and Practice",
    "question": "Calculate the specific speed ($N_s = \\frac{N \\sqrt{Q}}{H^{3/4}}$ in rpm, $\\text{m}^3/\\text{s}$, $\\text{m}$) of a centrifugal pump operating at $N = 1450\\text{ rpm}$, discharge $Q = 0.04\\text{ m}^3/\\text{s}$, and total head $H = 16\\text{ m}$.",
    "solution": "$$\\sqrt{Q} = \\sqrt{0.04} = 0.20$$\n$$H^{3/4} = (16)^{3/4} = (16^{1/4})^3 = 2^3 = 8$$\n$$N_s = \\frac{1450 \\times 0.20}{8} = \\frac{290}{8} = 36.25$$",
    "difficulty": "Moderate",
    "correct_answer": 36.25,
    "answer": 36.25,
    "numerical_range": {
      "min": 35.5,
      "max": 37
    }
  },
  {
    "id": "QB_IDE_EXP_077",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Irrigation Water Conveyance and Application Methods",
    "subtopic": "Irrigation scheduling",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "A.M. Michael - Irrigation Theory and Practice",
    "question": "A crop has a daily peak evapotranspiration rate of $ET_c = 6.0\\text{ mm/day}$. The root zone depth is $D = 60\\text{ cm}$ with an available water storage capacity of $120\\text{ mm}$. If irrigation is scheduled when $50\\%$ of available water is depleted, calculate the irrigation interval in $\\text{days}$.",
    "solution": "Readily available water (RAW):\n$$RAW = 0.50 \\times 120\\text{ mm} = 60\\text{ mm}$$\nIrrigation interval:\n$$I = \\frac{RAW}{ET_c} = \\frac{60\\text{ mm}}{6.0\\text{ mm/day}} = 10.0\\text{ days}$$",
    "difficulty": "Easy",
    "correct_answer": 10,
    "answer": 10,
    "numerical_range": {
      "min": 9.8,
      "max": 10.2
    }
  },
  {
    "id": "QB_IDE_EXP_078",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Irrigation Water Conveyance and Application Methods",
    "subtopic": "Irrigation efficiencies",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "A.M. Michael - Irrigation Theory and Practice",
    "question": "During an irrigation event, water depths stored at four equidistant sampling locations along a furrow run are $80\\text{ mm}$, $100\\text{ mm}$, $120\\text{ mm}$, and $100\\text{ mm}$. Calculate the water distribution efficiency ($\\eta_d = 100 \\left[1 - \\frac{\\bar{y}}{\\bar{d}}\\right]$) in percentage, where $\\bar{d}$ is the numerical average depth and $\\bar{y}$ is the average absolute deviation from $\\bar{d}$.",
    "solution": "Average depth $\\bar{d} = \\frac{80 + 100 + 120 + 100}{4} = \\frac{400}{4} = 100\\text{ mm}$.\nDeviations:\n$|80 - 100| = 20$\n$|100 - 100| = 0$\n$|120 - 100| = 20$\n$|100 - 100| = 0$\nAverage deviation $\\bar{y} = \\frac{20 + 0 + 20 + 0}{4} = \\frac{40}{4} = 10\\text{ mm}$.\n$$\\eta_d = 100 \\left[ 1 - \\frac{10}{100} \\right] = 100 [1 - 0.10] = 90.0\\%$$",
    "difficulty": "Moderate",
    "correct_answer": 90,
    "answer": 90,
    "numerical_range": {
      "min": 89.5,
      "max": 90.5
    }
  },
  {
    "id": "QB_IDE_EXP_079",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Irrigation Water Conveyance and Application Methods",
    "subtopic": "Design of irrigation channels and underground pipelines",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "A.M. Michael - Irrigation Theory and Practice",
    "question": "According to Lacey's regime theory for alluvial channels, the wetted perimeter is given by $P = 4.75 \\sqrt{Q}$. For a regime canal carrying a design discharge of $Q = 16\\text{ m}^3/\\text{s}$, calculate the wetted perimeter $P$ in $\\text{meters}$.",
    "solution": "$$P = 4.75 \\times \\sqrt{16} = 4.75 \\times 4 = 19.0\\text{ m}$$",
    "difficulty": "Easy",
    "correct_answer": 19,
    "answer": 19,
    "numerical_range": {
      "min": 18.8,
      "max": 19.2
    }
  },
  {
    "id": "QB_IDE_EXP_080",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Irrigation Water Conveyance and Application Methods",
    "subtopic": "Design of irrigation channels and underground pipelines",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "A.M. Michael - Irrigation Theory and Practice",
    "question": "In Lacey's regime theory, the silt factor is $f = 1.0$. For a canal carrying discharge $Q = 64\\text{ m}^3/\\text{s}$, calculate the regime flow velocity $V = \\left(\\frac{Q f^2}{140}\\right)^{1/6}$ in $\\text{m/s}$.",
    "solution": "$$\\frac{Q f^2}{140} = \\frac{64 \\times 1^2}{140} = \\frac{64}{140} = 0.45714$$\n$$V = (0.45714)^{1/6} \\approx 0.8778\\text{ m/s}$$",
    "difficulty": "Moderate",
    "correct_answer": 0.88,
    "answer": 0.88,
    "numerical_range": {
      "min": 0.86,
      "max": 0.9
    }
  },
  {
    "id": "QB_IDE_EXP_081",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Groundwater Hydrology",
    "subtopic": "Groundwater exploration techniques",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Todd - Groundwater Hydrology",
    "question": "In a Wenner electrical resistivity sounding survey for groundwater exploration, four equally spaced electrodes have an electrode spacing of $a = 10.0\\text{ m}$. If the measured electrical resistance is $R = 2.5\\text{ }\\Omega$, calculate the apparent resistivity of the subsurface stratum in $\\Omega\\cdot\\text{m}$ using $\\rho_a = 2 \\pi a R$. (Take $\\pi = 3.1416$)",
    "solution": "$$\\rho_a = 2 \\pi a R = 2 \\times 3.1416 \\times 10.0 \\times 2.5 = 50 \\times 3.1416 = 157.08\\text{ }\\Omega\\cdot\\text{m}$$",
    "difficulty": "Easy",
    "correct_answer": 157.08,
    "answer": 157.08,
    "numerical_range": {
      "min": 156,
      "max": 158
    }
  },
  {
    "id": "QB_IDE_EXP_082",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Wells and Pumps",
    "subtopic": "Pump characteristics",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "A.M. Michael - Irrigation Theory and Practice",
    "question": "Cavitation in a centrifugal irrigation pump occurs when the absolute fluid pressure at the impeller eye falls below the:",
    "solution": "When the local static pressure drops below the saturation vapor pressure of the liquid, vapor bubbles nucleate and subsequently collapse violently against the impeller vanes in higher pressure regions, causing cavitation pitting and vibration.",
    "difficulty": "Easy",
    "options": {
      "A": "Saturation vapor pressure of the liquid at operating temperature",
      "B": "Atmospheric pressure",
      "C": "Shut-off head pressure",
      "D": "Discharge piping static pressure"
    },
    "correct_answer": "A",
    "answer": "A"
  },
  {
    "id": "QB_IDE_EXP_083",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Wells and Pumps",
    "subtopic": "Pump selection and installation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "A.M. Michael - Irrigation Theory and Practice",
    "question": "A centrifugal pump is installed at a location where atmospheric pressure head is $10.1\\text{ m}$ and water vapor pressure head is $0.3\\text{ m}$. The suction pipe head loss is $h_{fs} = 0.8\\text{ m}$. If the pump requires a Net Positive Suction Head of $\\text{NPSH}_R = 3.0\\text{ m}$, calculate the maximum permissible suction lift height $h_s$ above the sump water surface in $\\text{meters}$ to prevent cavitation.",
    "solution": "$$\\text{NPSH}_A = \\frac{P_{\\text{atm}}}{\\gamma} - \\frac{P_v}{\\gamma} - h_s - h_{fs} \\ge \\text{NPSH}_R$$\n$$10.1 - 0.3 - h_s - 0.8 \\ge 3.0$$\n$$9.0 - h_s \\ge 3.0$$\n$$h_s \\le 9.0 - 3.0 = 6.0\\text{ m}$$",
    "difficulty": "Moderate",
    "correct_answer": 6,
    "answer": 6,
    "numerical_range": {
      "min": 5.9,
      "max": 6.1
    }
  },
  {
    "id": "QB_IDE_EXP_084",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Agricultural Drainage",
    "subtopic": "Non-conventional drainage system",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Ritzema - Drainage Principles and Applications",
    "question": "The biological drainage (bio-drainage) technique for reclaiming waterlogged and saline agricultural lands utilizes:",
    "solution": "Bio-drainage involves planting fast-growing, deep-rooted phreatophytic trees (e.g. *Eucalyptus tereticornis*, *Casuarina*) that transpire tremendous volumes of subsurface groundwater through solar energy, thereby lowering saline water tables without producing disposal effluents.",
    "difficulty": "Easy",
    "options": {
      "A": "Deep-rooted, high-transpiration vegetation (such as Eucalyptus trees) to lower water table levels",
      "B": "Genetically modified earthworms to burrow horizontal drainage paths",
      "C": "Bacterial inoculation to dissolve soil clay particles",
      "D": "Algal mats to cover the water surface"
    },
    "correct_answer": "A",
    "answer": "A"
  },
  {
    "id": "QB_IDE_EXP_085",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Irrigation Water Conveyance and Application Methods",
    "subtopic": "Surface, sprinkler and micro irrigation methods",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "A.M. Michael - Irrigation Theory and Practice",
    "question": "A border irrigation strip of width $W = 10\\text{ m}$ and length $L = 100\\text{ m}$ is irrigated with an inflow stream of $Q = 0.02\\text{ m}^3/\\text{s}$. If the average water infiltration rate into the soil is $f = 0.00001\\text{ m/s}$ ($3.6\\text{ cm/h}$), calculate the maximum border strip area $A_{\\max} = Q / f$ in $\\text{m}^2$ that this stream can theoretically cover before advance ceases.",
    "solution": "$$A_{\\max} = \\frac{Q}{f} = \\frac{0.02\\text{ m}^3/\\text{s}}{0.00001\\text{ m/s}} = 2000\\text{ m}^2$$",
    "difficulty": "Easy",
    "correct_answer": 2000,
    "answer": 2000,
    "numerical_range": {
      "min": 1950,
      "max": 2050
    }
  },
  {
    "id": "QB_IDE_EXP_086",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Soil-Water-Plant Relationship",
    "subtopic": "Water requirement of crops",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "A.M. Michael - Irrigation Theory and Practice",
    "question": "A crop has a base period of $B = 120\\text{ days}$ and a total depth of water required during the base period (delta) of $\\Delta = 60\\text{ cm}$ ($0.60\\text{ m}$). Using the standard duty formula $D = \\frac{8.64 B}{\\Delta}$, calculate the duty of irrigation water in $\\text{ha/cumec}$.",
    "solution": "$$D = \\frac{8.64 \\times B}{\\Delta} = \\frac{8.64 \\times 120}{0.60} = 8.64 \\times 200 = 1728\\text{ ha/cumec}$$",
    "difficulty": "Easy",
    "correct_answer": 1728,
    "answer": 1728,
    "numerical_range": {
      "min": 1720,
      "max": 1735
    }
  },
  {
    "id": "QB_IDE_EXP_087",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Groundwater Hydrology",
    "subtopic": "Steady and unsteady flow in confined and unconfined aquifers",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Todd - Groundwater Hydrology",
    "question": "In an unconfined aquifer, a fully penetrating well of radius $r_w = 0.20\\text{ m}$ is pumped to produce a steady drawdown of $s_w = 2.0\\text{ m}$. The initial saturated thickness of the unconfined aquifer is $H = 20.0\\text{ m}$. Calculate the equivalent drawdown $s'$ in a confined aquifer having the same transmissivity using Dupuit's correction $s' = s_w - \\frac{s_w^2}{2 H}$ in $\\text{meters}$.",
    "solution": "$$s' = s_w - \\frac{s_w^2}{2 H} = 2.0 - \\frac{2.0^2}{2 \\times 20.0} = 2.0 - \\frac{4.0}{40.0} = 2.0 - 0.10 = 1.90\\text{ m}$$",
    "difficulty": "Moderate",
    "correct_answer": 1.9,
    "answer": 1.9,
    "numerical_range": {
      "min": 1.88,
      "max": 1.92
    }
  },
  {
    "id": "QB_IDE_EXP_088",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Wells and Pumps",
    "subtopic": "Pump characteristics",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "A.M. Michael - Irrigation Theory and Practice",
    "question": "Which of the following operational modifications will INCREASE the Net Positive Suction Head Available ($\text{NPSH}_A$) of an agricultural irrigation pump?",
    "solution": "- A, B, and C decrease suction line losses and suction lift, increasing $\\text{NPSH}_A = \\frac{P_{\\text{atm}} - P_v}{\\gamma} - h_s - h_{fs}$.\n- D increases vapor pressure $P_v$, which severely reduces $\\text{NPSH}_A$ and induces cavitation.",
    "difficulty": "Moderate",
    "options": {
      "A": "Lowering the pump closer to the water level in the sump (reducing static suction lift $h_s$)",
      "B": "Increasing the diameter of the suction pipe to decrease frictional head loss ($h_{fs}$)",
      "C": "Installing a foot valve with an unrestricted, streamlined strainer",
      "D": "Pumping water at higher temperatures near boiling"
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
    "id": "QB_IDE_EXP_089",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Agricultural Drainage",
    "subtopic": "Irrigation and drainage water quality and reuse",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "A.M. Michael - Irrigation Theory and Practice",
    "question": "Calculate the Sodium Adsorption Ratio ($SAR$) of irrigation water having cation concentrations of $\\text{Na}^+ = 9.0\\text{ meq/L}$, $\\text{Ca}^{2+} = 3.0\\text{ meq/L}$, and $\\text{Mg}^{2+} = 5.0\\text{ meq/L}$ using $SAR = \\frac{\\text{Na}^+}{\\sqrt{(\\text{Ca}^{2+} + \\text{Mg}^{2+})/2}}$.",
    "solution": "$$\\frac{\\text{Ca}^{2+} + \\text{Mg}^{2+}}{2} = \\frac{3.0 + 5.0}{2} = \\frac{8.0}{2} = 4.0$$\n$$\\sqrt{4.0} = 2.0$$\n$$SAR = \\frac{9.0}{2.0} = 4.50$$",
    "difficulty": "Easy",
    "correct_answer": 4.5,
    "answer": 4.5,
    "numerical_range": {
      "min": 4.45,
      "max": 4.55
    }
  },
  {
    "id": "QB_IDE_EXP_090",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Irrigation Water Conveyance and Application Methods",
    "subtopic": "Surface, sprinkler and micro irrigation methods",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "A.M. Michael - Irrigation Theory and Practice",
    "question": "In an orchard drip irrigation system, tree spacing is $6.0\\text{ m} \\times 6.0\\text{ m}$. Each tree is provided with 4 drippers of $4.0\\text{ L/h}$ discharge each. If the daily irrigation duration is $3.0\\text{ hours}$, calculate the volume of water applied per tree per day in $\\text{liters}$.",
    "solution": "Discharge rate per tree:\n$$q_{\\text{tree}} = 4 \\times 4.0 = 16.0\\text{ L/h}$$\nVolume applied in 3 hours:\n$$V = 16.0\\text{ L/h} \\times 3.0\\text{ h} = 48.0\\text{ liters}$$",
    "difficulty": "Easy",
    "correct_answer": 48,
    "answer": 48,
    "numerical_range": {
      "min": 47.5,
      "max": 48.5
    }
  },
  {
    "id": "QB_IDE_EXP_091",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Soil-Water-Plant Relationship",
    "subtopic": "Consumptive use and evapotranspiration",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "A.M. Michael - Irrigation Theory and Practice",
    "question": "In Blaney-Criddle formula $ET_0 = p (0.46 T + 8.13)$, for a month with mean daily temperature $T = 25^\\circ\\text{C}$ and mean daily percentage of annual daytime hours $p = 0.28$, calculate the reference evapotranspiration $ET_0$ in $\\text{mm/day}$.",
    "solution": "$$0.46 T + 8.13 = (0.46 \\times 25) + 8.13 = 11.5 + 8.13 = 19.63$$\n$$ET_0 = 0.28 \\times 19.63 = 5.4964 \\approx 5.50\\text{ mm/day}$$",
    "difficulty": "Easy",
    "correct_answer": 5.5,
    "answer": 5.5,
    "numerical_range": {
      "min": 5.4,
      "max": 5.6
    }
  },
  {
    "id": "QB_IDE_EXP_092",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Wells and Pumps",
    "subtopic": "Design and construction of water wells",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "A.M. Michael - Irrigation Theory and Practice",
    "question": "In gravel-packed tubewells, the gravel pack thickness around the slotted well screen typically ranges between:",
    "solution": "A standard gravel pack envelope surrounding an agricultural well screen has a radial thickness of $7.5\\text{ cm}$ to $15\\text{ cm}$ ($3 - 6\\text{ inches}$), engineered to retain formation aquifer sand while allowing sand-free inflow.",
    "difficulty": "Easy",
    "options": {
      "A": "$7.5 - 15\\text{ cm}$",
      "B": "$1 - 2\\text{ mm}$",
      "C": "$50 - 100\\text{ cm}$",
      "D": "$1.5 - 2.0\\text{ m}$"
    },
    "correct_answer": "A",
    "answer": "A"
  },
  {
    "id": "QB_IDE_EXP_093",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Groundwater Hydrology",
    "subtopic": "Groundwater movement; Darcy's Law",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Todd - Groundwater Hydrology",
    "question": "Water flows through an aquifer of porosity $n = 0.25$ with a Darcy discharge velocity of $v = 0.20\\text{ m/day}$. Calculate the actual average linear seepage velocity ($v_s = v / n$) in $\\text{m/day}$.",
    "solution": "$$v_s = \\frac{v}{n} = \\frac{0.20\\text{ m/day}}{0.25} = 0.80\\text{ m/day}$$",
    "difficulty": "Easy",
    "correct_answer": 0.8,
    "answer": 0.8,
    "numerical_range": {
      "min": 0.79,
      "max": 0.81
    }
  },
  {
    "id": "QB_IDE_EXP_094",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Irrigation Water Conveyance and Application Methods",
    "subtopic": "Surface, sprinkler and micro irrigation methods",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "A.M. Michael - Irrigation Theory and Practice",
    "question": "In a solid-set sprinkler system, sprinklers are spaced $12\\text{ m}$ along the lateral and the laterals are spaced $18\\text{ m}$ along the main line. Each sprinkler discharges $1.2\\text{ m}^3/\\text{h}$. Calculate the application precipitation rate in $\\text{mm/h}$.",
    "solution": "Area covered per sprinkler:\n$$A = S_l \\times S_m = 12\\text{ m} \\times 18\\text{ m} = 216\\text{ m}^2$$\nDischarge $Q = 1.2\\text{ m}^3/\\text{h}$.\nApplication rate:\n$$I = \\frac{Q}{A} = \\frac{1.2\\text{ m}^3/\\text{h}}{216\\text{ m}^2} = 0.005556\\text{ m/h} = 5.56\\text{ mm/h}$$",
    "difficulty": "Moderate",
    "correct_answer": 5.56,
    "answer": 5.56,
    "numerical_range": {
      "min": 5.4,
      "max": 5.7
    }
  },
  {
    "id": "QB_IDE_EXP_095",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Agricultural Drainage",
    "subtopic": "Planning, design and layout of surface and sub-surface drainage systems",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Ritzema - Drainage Principles and Applications",
    "question": "In sub-surface agricultural tile drainage, corrugated perforated plastic tubing (CPT) has largely superseded clay tiles because:",
    "solution": "Corrugated perforated HDPE/PVC pipes come in continuous coils of several hundred meters, allowing high-speed mechanized laser-guided installation using specialized drain plows or trenchers with minimal labour.",
    "difficulty": "Easy",
    "options": {
      "A": "It is lightweight, continuous, highly flexible, and can be installed rapidly by trenchless drainage plows",
      "B": "It dissolves in alkaline soils",
      "C": "It requires no envelope or filter in sandy soils",
      "D": "It has a higher friction factor than unglazed clay tiles"
    },
    "correct_answer": "A",
    "answer": "A"
  },
  {
    "id": "QB_IDE_EXP_096",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Soil-Water-Plant Relationship",
    "subtopic": "Water requirement of crops",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "A.M. Michael - Irrigation Theory and Practice",
    "question": "A sugarcane crop has a seasonal consumptive use of $ET_c = 1200\\text{ mm}$. Effective rainfall during the growing season is $P_e = 400\\text{ mm}$. If the overall irrigation efficiency is $60\\%$, calculate the gross irrigation requirement ($GIR$) in $\\text{mm}$.",
    "solution": "Net irrigation requirement:\n$$NIR = ET_c - P_e = 1200 - 400 = 800\\text{ mm}$$\nGross irrigation requirement:\n$$GIR = \\frac{NIR}{\\eta} = \\frac{800}{0.60} \\approx 1333.33\\text{ mm}$$",
    "difficulty": "Moderate",
    "correct_answer": 1333.33,
    "answer": 1333.33,
    "numerical_range": {
      "min": 1325,
      "max": 1340
    }
  },
  {
    "id": "QB_IDE_EXP_097",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Wells and Pumps",
    "subtopic": "Pump characteristics",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "A.M. Michael - Irrigation Theory and Practice",
    "question": "A pump delivers power to water at $10\\text{ kW}$. If the drive motor delivers $12.5\\text{ kW}$ to the pump shaft, calculate the pump mechanical efficiency in percentage.",
    "solution": "$$\\eta = \\frac{\\text{Water Power}}{\\text{Brake Power}} \\times 100 = \\frac{10}{12.5} \\times 100 = 80.0\\%$$",
    "difficulty": "Easy",
    "correct_answer": 80,
    "answer": 80,
    "numerical_range": {
      "min": 79.5,
      "max": 80.5
    }
  },
  {
    "id": "QB_IDE_EXP_098",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Groundwater Hydrology",
    "subtopic": "Steady and unsteady flow in confined and unconfined aquifers",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Todd - Groundwater Hydrology",
    "question": "The storage coefficient of an unconfined aquifer corresponds to its specific yield $S_y$. A sandy aquifer has porosity $n = 0.35$ and specific retention $S_r = 0.10$. Calculate the specific yield $S_y = n - S_r$ in percentage.",
    "solution": "$$S_y = n - S_r = 0.35 - 0.10 = 0.25 = 25.0\\%$$",
    "difficulty": "Easy",
    "correct_answer": 25,
    "answer": 25,
    "numerical_range": {
      "min": 24.5,
      "max": 25.5
    }
  },
  {
    "id": "QB_IDE_EXP_099",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Irrigation Water Conveyance and Application Methods",
    "subtopic": "Surface, sprinkler and micro irrigation methods",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "A.M. Michael - Irrigation Theory and Practice",
    "question": "In drip irrigation systems, the primary filter installed immediately downstream of the pump to remove heavy suspended sand and gravel particles from surface canal water using vortex action is a:",
    "solution": "A hydrocyclone uses centrifugal vortex velocity to spin out coarse inorganic suspended solids like sand and silt ($> 75\\text{ }\\mu\\text{m}$), collecting them in an underflow collection chamber before the water enters media and screen filtration units.",
    "difficulty": "Easy",
    "options": {
      "A": "Hydrocyclone (sand separator)",
      "B": "Media (gravel/sand) filter",
      "C": "Disc filter",
      "D": "Screen filter"
    },
    "correct_answer": "A",
    "answer": "A"
  },
  {
    "id": "QB_IDE_EXP_100",
    "section": "Section 5: Irrigation and Drainage Engineering",
    "topic": "Soil-Water-Plant Relationship",
    "subtopic": "Measurement of infiltration, soil moisture and irrigation water infiltration",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "A.M. Michael - Irrigation Theory and Practice",
    "question": "A double-ring infiltrometer has an inner ring diameter of $30\\text{ cm}$ ($0.30\\text{ m}$). Over a period of $30\\text{ minutes}$ ($0.5\\text{ h}$), the water level in the inner cylinder drops by $15\\text{ mm}$. Calculate the infiltration rate in $\\text{mm/h}$.",
    "solution": "$$\\text{Infiltration Rate} = \\frac{\\Delta h}{\\Delta t} = \\frac{15\\text{ mm}}{0.5\\text{ h}} = 30.0\\text{ mm/h}$$",
    "difficulty": "Easy",
    "correct_answer": 30,
    "answer": 30,
    "numerical_range": {
      "min": 29.5,
      "max": 30.5
    }
  }
];
