export default [
  {
    "id": "QB_DFE_001",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Kinetics of microbial death – pasteurization and sterilization of milk and other liquid foods",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "A bacterial spore suspension has a decimal reduction time ($D_{121}$ value) of $1.5\\text{ minutes}$ at $121^\\circ\\text{C}$. The thermal holding time in minutes required at $121^\\circ\\text{C}$ to achieve a $12\\text{-D}$ reduction of this bacterial population is ________ (answer in integer).",
    "correct_answer": "18",
    "numerical_range": {
      "min": 18,
      "max": 18
    },
    "solution": "The thermal death time $F$ for an $n$-decimal reduction is:\n$$F = n \\times D$$\nGiven:\n• Decimal reduction time $D = 1.5\\text{ minutes}$\n• Number of log reductions $n = 12$\n$$F = 12 \\times 1.5\\text{ min} = 18\\text{ minutes}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_002",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Working principles of heat exchangers",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "In a counter-flow double pipe heat exchanger, milk is heated from $20^\\circ\\text{C}$ to $60^\\circ\\text{C}$ while hot water cools from $90^\\circ\\text{C}$ to $50^\\circ\\text{C}$. The Log Mean Temperature Difference (LMTD) in $^\\circ\\text{C}$ is ________ (answer in integer).",
    "correct_answer": "30",
    "numerical_range": {
      "min": 30,
      "max": 30
    },
    "solution": "For counter-flow arrangement:\n• Inlet temperature difference $\\Delta T_1 = T_{h,in} - T_{c,out} = 90^\\circ\\text{C} - 60^\\circ\\text{C} = 30^\\circ\\text{C}$\n• Outlet temperature difference $\\Delta T_2 = T_{h,out} - T_{c,in} = 50^\\circ\\text{C} - 20^\\circ\\text{C} = 30^\\circ\\text{C}$\nWhen $\\Delta T_1 = \\Delta T_2 = \\Delta T$, the LMTD is simply:\n$$\\text{LMTD} = \\Delta T_1 = \\Delta T_2 = 30^\\circ\\text{C}$$",
    "difficulty": "Hard"
  },
  {
    "id": "QB_DFE_003",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Refrigeration and cold storage basics and applications",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "A milk chilling refrigeration plant operates on a vapour compression refrigeration cycle with a cooling capacity of $10\\text{ TR}$ ($1\\text{ TR} = 3.5\\text{ kW}$). If the electrical power input to the compressor is $7.0\\text{ kW}$, the Coefficient of Performance (COP) of the refrigeration unit is ________ (answer in integer).",
    "correct_answer": "5",
    "numerical_range": {
      "min": 5,
      "max": 5
    },
    "solution": "1. Cooling capacity $Q_c$:\n$$Q_c = 10\\text{ TR} \\times 3.5\\text{ kW/TR} = 35.0\\text{ kW}$$\n2. Power input $W = 7.0\\text{ kW}$\n3. Coefficient of Performance ($COP$):\n$$COP = \\frac{\\text{Refrigeration Effect}}{\\text{Work Input}} = \\frac{Q_c}{W} = \\frac{35.0}{7.0} = 5$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_004",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Homogenization",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Outlines of Dairy Technology (Sukumar De)",
    "question": "The primary objective of two-stage homogenization in fluid milk processing is to:",
    "options": {
      "A": "Disrupt fat globules in the 1st stage and disperse fat globule clumps in the 2nd stage",
      "B": "Inactivate heat-resistant bacterial spores at high shear",
      "C": "Increase the creaming index of whole milk",
      "D": "Pasteurize the milk at low pressure"
    },
    "correct_answer": "A",
    "solution": "In two-stage milk homogenization:\n• The high-pressure first stage (approx. 15–20 MPa) breaks larger milk fat globules down to <2 microns.\n• The lower-pressure second stage (approx. 3–5 MPa) breaks up fat globule clusters/clumps to ensure uniform emulsion stability and prevent creaming.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_005",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Kinetics of microbial death – pasteurization and sterilization of milk and other liquid foods",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "Which of the following statements regarding thermal processing parameters ($D$, $z$, and $F$ values) is/are correct?",
    "options": {
      "A": "The $D$-value is the heating time required at a given temperature to destroy $90\\%$ of a microbial population.",
      "B": "The $z$-value represents the temperature increase required to reduce the $D$-value by a factor of 10.",
      "C": "A higher $z$-value indicates higher temperature sensitivity of the microorganism.",
      "D": "The standard reference temperature for calculating $F_0$ value in thermal sterilization of low-acid foods is $121.1^\\circ\\text{C}$ ($250^\\circ\\text{F}$)."
    },
    "correct_answer": [
      "A",
      "B",
      "D"
    ],
    "solution": "• $D$-value is time for 1-log (90%) reduction (A is correct).\n• $z$-value is temperature change required for a 1-decade change in $D$-value (B is correct).\n• A lower $z$-value implies that a smaller temperature rise causes a tenfold drop in $D$-value, meaning GREATER temperature sensitivity (so C is incorrect).\n• $F_0$ is defined at reference temperature $121.1^\\circ\\text{C}$ ($250^\\circ\\text{F}$) with $z = 10^\\circ\\text{C}$ (D is correct).",
    "difficulty": "Hard"
  },
  {
    "id": "QB_DFE_006",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Water activity, sorption and desorption isotherms",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "The difference in equilibrium moisture content of a food material between the adsorption and desorption curves at the same water activity ($a_w$) is known as:",
    "options": {
      "A": "Sorption hysteresis",
      "B": "Capillary condensation",
      "C": "Osmotic lag",
      "D": "Sensible heat lag"
    },
    "correct_answer": "A",
    "solution": "At a given water activity $a_w$, the equilibrium moisture content is higher during desorption than during adsorption. This non-coincidence of curves is termed **sorption hysteresis**.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_DFE_007",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Pasteurization",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Outlines of Dairy Technology (Sukumar De)",
    "question": "A dairy plant processes $1000\\text{ kg}$ of whole milk containing $4.5\\%$ fat into cream containing $40.0\\%$ fat and skim milk containing $0.10\\%$ fat. Assuming negligible mechanical spillage, the mass of cream produced in $\\text{kg}$ is ________ (round off to 1 decimal place).",
    "correct_answer": "110.3",
    "numerical_range": {
      "min": 109.5,
      "max": 111
    },
    "solution": "Let $M_c$ be mass of cream and $M_s$ be mass of skim milk.\n1. Total mass balance:\n$$M_c + M_s = 1000 \\implies M_s = 1000 - M_c$$\n2. Fat balance:\n$$1000 \\times 0.045 = M_c \\times 0.40 + M_s \\times 0.0010$$\n$$45 = 0.40 M_c + 0.0010 (1000 - M_c) = 0.40 M_c + 1.0 - 0.0010 M_c$$\n$$45 - 1.0 = 0.399 M_c \\implies 44 = 0.399 M_c$$\n$$M_c = \\frac{44}{0.399} \\approx 110.275\\text{ kg} \\approx 110.3\\text{ kg}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_008",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Homogenization",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "Outlines of Dairy Technology (Sukumar De)",
    "question": "An ice cream batch freezer takes in $500\\text{ L}$ of liquid ice cream mix and yields $950\\text{ L}$ of finished aerated ice cream. The percentage overrun of the product is ________ % (answer in integer).",
    "correct_answer": "90",
    "numerical_range": {
      "min": 90,
      "max": 90
    },
    "solution": "Percentage overrun in ice cream manufacture is defined as:\n$$\\% \\text{ Overrun} = \\frac{V_{\\text{ice cream}} - V_{\\text{mix}}}{V_{\\text{mix}}} \\times 100$$\n$$\\% \\text{ Overrun} = \\frac{950 - 500}{500} \\times 100 = \\frac{450}{500} \\times 100 = 90\\%$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_009",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Preservation of food by cooling and freezing",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "A food slab of thickness $a = 0.05\\text{ m}$ is frozen from both faces in a plate freezer operating at $-30^\\circ\\text{C}$. Initial freezing temperature is $-1.5^\\circ\\text{C}$ (temperature difference $\\Delta T = 28.5^\\circ\\text{C}$). The food material has density $\\rho = 1050\\text{ kg/m}^3$, latent heat $\\lambda = 250\\text{ kJ/kg}$, thermal conductivity $k = 1.50\\text{ W/(m}\\cdot\\text{K)}$, and convective coefficient $h = 50\\text{ W/(m}^2\\cdot\\text{K)}$. Using Planck's equation with shape factors $P = 1/2$ and $R = 1/8$ ($t_f = \\frac{\\rho \\lambda}{\\Delta T} \\left[\\frac{P a}{h} + \\frac{R a^2}{k}\\right]$), the freezing time in hours is ________ (round off to 2 decimal places).",
    "correct_answer": "1.81",
    "numerical_range": {
      "min": 1.75,
      "max": 1.88
    },
    "solution": "From Planck's freezing equation:\n$$t_f = \\frac{\\rho \\lambda}{\\Delta T} \\left( \\frac{P a}{h} + \\frac{R a^2}{k} \\right)$$\nWhere:\n• $\\rho \\lambda = 1050\\text{ kg/m}^3 \\times 250 \\times 10^3\\text{ J/kg} = 2.625 \\times 10^8\\text{ J/m}^3$\n• $\\Delta T = 28.5\\text{ K}$\n• $\\frac{P a}{h} = \\frac{0.5 \\times 0.05}{50} = 0.00050\\text{ s}\\cdot\\text{m}^2\\text{K/J}$\n• $\\frac{R a^2}{k} = \\frac{0.125 \\times (0.05)^2}{1.50} = \\frac{0.0003125}{1.50} \\approx 0.00020833\\text{ s}\\cdot\\text{m}^2\\text{K/J}$\n$$\\text{Sum} = 0.00050 + 0.00020833 = 0.00070833$$\n$$t_f = \\frac{2.625 \\times 10^8}{28.5} \\times 0.00070833 = 9.2105 \\times 10^6 \\times 0.00070833 = 6524\\text{ seconds}$$\n$$\\text{Time in hours} = \\frac{6524}{3600} \\approx 1.812\\text{ hours} \\approx 1.81\\text{ hours}$$",
    "difficulty": "Hard"
  },
  {
    "id": "QB_DFE_010",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Kinetics of microbial death – pasteurization and sterilization of milk and other liquid foods",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)",
    "question": "The decimal reduction time ($D$-value) of a bacterial culture is $10.0\\text{ min}$ at $110^\\circ\\text{C}$ and drops to $1.0\\text{ min}$ at $120^\\circ\\text{C}$. The thermal resistance constant ($z$-value) in $^\\circ\\text{C}$ is ________ (answer in integer).",
    "correct_answer": "10",
    "numerical_range": {
      "min": 10,
      "max": 10
    },
    "solution": "By definition, the $z$-value is the temperature change required for a 10-fold (one log cycle) change in decimal reduction time $D$:\n$$z = \\frac{T_2 - T_1}{\\log_{10}(D_1 / D_2)} = \\frac{120^\\circ\\text{C} - 110^\\circ\\text{C}}{\\log_{10}(10.0 / 1.0)} = \\frac{10^\\circ\\text{C}}{1} = 10^\\circ\\text{C}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_011",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Working principles of heat exchangers",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "A thin-walled stainless steel processing vessel has a condensing steam jacket on the outside with convective film coefficient $h_o = 5000\\text{ W/(m}^2\\cdot\\text{K)}$ and a liquid food product on the inside with film coefficient $h_i = 500\\text{ W/(m}^2\\cdot\\text{K)}$. Neglecting metal wall conduction resistance and fouling, the overall heat transfer coefficient ($U$) in $\\text{W/(m}^2\\cdot\\text{K)}$ is ________ (round off to 1 decimal place).",
    "correct_answer": "454.5",
    "numerical_range": {
      "min": 452,
      "max": 457
    },
    "solution": "The overall heat transfer coefficient for negligible wall and fouling resistance is:\n$$\\frac{1}{U} = \\frac{1}{h_i} + \\frac{1}{h_o} = \\frac{1}{500} + \\frac{1}{5000} = \\frac{10 + 1}{5000} = \\frac{11}{5000}$$\n$$U = \\frac{5000}{11} = 454.545\\text{ W/(m}^2\\cdot\\text{K)} \\approx 454.5\\text{ W/(m}^2\\cdot\\text{K)}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_012",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Steady state heat transfer in conduction, convection and radiation",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "A thin-walled steam pipe of outer radius $r_o = 40\\text{ mm}$ is covered with insulation having thermal conductivity $k = 0.08\\text{ W/(m}\\cdot\\text{K)}$. The surrounding air has a convective heat transfer coefficient $h_o = 4.0\\text{ W/(m}^2\\cdot\\text{K)}$. The critical radius of insulation is $r_c = k / h_o$. Adding this insulation to the pipe will:",
    "options": {
      "A": "Always decrease heat loss because the outer radius of the pipe exceeds the critical radius of insulation",
      "B": "Initially increase heat loss until the outer radius reaches $80\\text{ mm}$",
      "C": "Have zero effect on heat loss",
      "D": "Cause thermal runaway because $k < h_o$"
    },
    "correct_answer": "A",
    "solution": "The critical radius of insulation for a cylinder is:\n$$r_c = \\frac{k}{h_o} = \\frac{0.08\\text{ W/(m}\\cdot\\text{K)}}{4.0\\text{ W/(m}^2\\cdot\\text{K)}} = 0.020\\text{ m} = 20\\text{ mm}$$\nSince the outer radius of the bare pipe ($r_o = 40\\text{ mm}$) is already greater than $r_c$, adding insulation only adds conduction resistance while convective resistance changes minimally, so total thermal resistance increases and heat loss strictly decreases.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_013",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Steady state heat transfer in conduction, convection and radiation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Transport Processes and Separation Process Principles (C.J. Geankoplis)",
    "question": "Milk flows turbulently through a stainless steel tube of inner diameter $D = 0.025\\text{ m}$ in a tubular pasteurizer. The Reynolds number is $Re = 10000$, Prandtl number is $Pr = 4.0$, and thermal conductivity of milk is $k = 0.58\\text{ W/(m}\\cdot\\text{K)}$. Using the Dittus-Boelter heating correlation $Nu = 0.023 Re^{0.8} Pr^{0.4}$, the convective heat transfer coefficient $h$ inside the tube in $\\text{W/(m}^2\\cdot\\text{K)}$ is ________ (round off to 1 decimal place).",
    "correct_answer": "1472.4",
    "numerical_range": {
      "min": 1465,
      "max": 1480
    },
    "solution": "1. Nusselt number calculation:\n$$Nu = 0.023 Re^{0.8} Pr^{0.4}$$\n$$(10000)^{0.8} = 1584.893$$\n$$(4.0)^{0.4} = 1.74110$$\n$$Nu = 0.023 \\times 1584.893 \\times 1.74110 = 63.465$$\n2. Convective film coefficient $h$:\n$$h = \\frac{Nu \\cdot k}{D} = \\frac{63.465 \\times 0.58}{0.025} = \\frac{36.8097}{0.025} = 1472.388\\text{ W/(m}^2\\cdot\\text{K)} \\approx 1472.4\\text{ W/(m}^2\\cdot\\text{K)}$$",
    "difficulty": "Hard"
  },
  {
    "id": "QB_DFE_014",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Steady state heat transfer in conduction, convection and radiation",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "Two large parallel blackbody surfaces at absolute temperatures $T_1 = 400\\text{ K}$ and $T_2 = 300\\text{ K}$ exchange heat purely by thermal radiation. Taking the Stefan-Boltzmann constant $\\sigma = 5.67 \\times 10^{-8}\\text{ W/(m}^2\\cdot\\text{K}^4)$, the net radiation heat flux between the two surfaces in $\\text{W/m}^2$ is ________ (round off to 1 decimal place).",
    "correct_answer": "992.3",
    "numerical_range": {
      "min": 990,
      "max": 995
    },
    "solution": "For two blackbody surfaces, emissivities $\\epsilon_1 = \\epsilon_2 = 1.0$:\n$$q = \\sigma (T_1^4 - T_2^4)$$\n$$T_1^4 = (400)^4 = 2.56 \\times 10^{10}\\text{ K}^4$$\n$$T_2^4 = (300)^4 = 0.81 \\times 10^{10}\\text{ K}^4$$\n$$T_1^4 - T_2^4 = 1.75 \\times 10^{10}\\text{ K}^4$$\n$$q = 5.67 \\times 10^{-8} \\times 1.75 \\times 10^{10} = 5.67 \\times 175 = 992.25\\text{ W/m}^2 \\approx 992.3\\text{ W/m}^2$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_015",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Transient heat transfer in simple geometry",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "In the transient cooling of solid food items, the lumped capacitance analysis method is physically valid and introduces less than $5\\%$ error only when the Biot number ($Bi = h L_c / k$) satisfies:",
    "options": {
      "A": "$Bi < 0.10$",
      "B": "$Bi > 10.0$",
      "C": "$0.50 < Bi < 1.0$",
      "D": "$Bi = \\infty$"
    },
    "correct_answer": "A",
    "solution": "The Biot number $Bi = \\frac{h L_c}{k}$ represents the ratio of conductive resistance within the solid to convective boundary layer resistance at the surface. When $Bi < 0.10$, internal resistance is negligible, spatial temperature gradients inside the body are virtually flat, and the lumped system approximation holds.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_016",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Transient heat transfer in simple geometry",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sanjay Kumar (A Numerical Approach in Ag. Engg.)",
    "question": "A spherical metal temperature probe of diameter $D = 0.012\\text{ m}$ (characteristic length $L_c = R/3 = 0.002\\text{ m}$) has density $\\rho = 8000\\text{ kg/m}^3$ and specific heat $c_p = 500\\text{ J/(kg}\\cdot\\text{K)}$. It is suddenly plunged into an agitated liquid where the convective heat transfer coefficient is $h = 200\\text{ W/(m}^2\\cdot\\text{K)}$. The thermal time constant $\\tau = \\frac{\\rho c_p L_c}{h}$ of the probe in seconds is ________ (answer in integer).",
    "correct_answer": "40",
    "numerical_range": {
      "min": 40,
      "max": 40
    },
    "solution": "The thermal time constant of a lumped capacitance system is:\n$$\\tau = \\frac{\\rho V c_p}{h A_s} = \\frac{\\rho c_p L_c}{h}$$\nSubstitute values:\n$$\\tau = \\frac{8000\\text{ kg/m}^3 \\times 500\\text{ J/(kg}\\cdot\\text{K)} \\times 0.002\\text{ m}}{200\\text{ W/(m}^2\\cdot\\text{K)}} = \\frac{8000}{200} = 40.0\\text{ seconds}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_017",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Working principles of heat exchangers",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "Outlines of Dairy Technology (Sukumar De)",
    "question": "In a continuous High-Temperature Short-Time (HTST) milk pasteurizer equipped with a plate heat exchanger regenerator, cold raw milk is heated from $4^\\circ\\text{C}$ to $65^\\circ\\text{C}$ by hot pasteurized milk, before entering the hot water heating section to attain the final pasteurization temperature of $72^\\circ\\text{C}$. The regenerative efficiency (regeneration percentage) of the pasteurizer is ________ % (round off to 1 decimal place).",
    "correct_answer": "89.7",
    "numerical_range": {
      "min": 89,
      "max": 90.5
    },
    "solution": "Regenerative efficiency is defined as:\n$$\\eta_{reg} = \\frac{\\text{Temperature rise achieved in regenerator}}{\\text{Total required temperature rise}} \\times 100$$\n$$\\eta_{reg} = \\frac{65 - 4}{72 - 4} \\times 100 = \\frac{61}{68} \\times 100 = 89.7058\\% \\approx 89.7\\%$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_018",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Working principles of heat exchangers",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Transport Processes and Separation Process Principles (C.J. Geankoplis)",
    "question": "In a counter-current concentric tube heat exchanger, hot water and cold milk have identical heat capacity rates ($C_h = C_c = C_{min} = 2500\\text{ W/K}$, so capacity ratio $C_r = 1.0$). The overall heat transfer coefficient is $U = 500\\text{ W/(m}^2\\cdot\\text{K)}$ and the heat transfer area is $A = 7.5\\text{ m}^2$. Using the effectiveness-NTU relation for counter-flow with $C_r = 1.0$ ($\\epsilon = \\frac{NTU}{1 + NTU}$), the thermal effectiveness of the heat exchanger is ________ (answer in decimal).",
    "correct_answer": "0.6",
    "numerical_range": {
      "min": 0.59,
      "max": 0.61
    },
    "solution": "1. Number of Transfer Units ($NTU$):\n$$NTU = \\frac{U A}{C_{min}} = \\frac{500\\text{ W/(m}^2\\cdot\\text{K)} \\times 7.5\\text{ m}^2}{2500\\text{ W/K}} = \\frac{3750}{2500} = 1.50$$\n2. Effectiveness for counter-flow when $C_r = 1.0$:\n$$\\epsilon = \\frac{NTU}{1 + NTU} = \\frac{1.50}{1 + 1.50} = \\frac{1.50}{2.50} = 0.60$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_019",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Diffusive and convective mass transfer",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Transport Processes and Separation Process Principles (C.J. Geankoplis)",
    "question": "Water vapour diffuses through a stagnant air film of thickness $\\delta = 4.0\\text{ mm} = 0.004\\text{ m}$ above the surface of an open evaporation tank. The molecular diffusivity of water vapour in air is $D_{AB} = 2.4 \\times 10^{-5}\\text{ m}^2\\text{/s}$. The molar concentration of water vapour at the water surface is $C_{A1} = 1.50\\text{ mol/m}^3$ and at the outer edge of the film is $C_{A2} = 0.30\\text{ mol/m}^3$. Under steady state dilute diffusion, the molar mass flux of water vapour in $10^{-3}\\text{ mol/(m}^2\\cdot\\text{s)}$ is ________ (round off to 1 decimal place).",
    "correct_answer": "7.2",
    "numerical_range": {
      "min": 7.1,
      "max": 7.3
    },
    "solution": "From Fick's first law of steady-state molecular diffusion across a stagnant film:\n$$J_A = D_{AB} \\frac{C_{A1} - C_{A2}}{\\delta}$$\n$$J_A = 2.4 \\times 10^{-5}\\text{ m}^2\\text{/s} \\times \\frac{1.50 - 0.30\\text{ mol/m}^3}{0.004\\text{ m}} = 2.4 \\times 10^{-5} \\times 300 = 7.2 \\times 10^{-3}\\text{ mol/(m}^2\\cdot\\text{s)}$$\nTherefore, in $10^{-3}\\text{ mol/(m}^2\\cdot\\text{s)}$, the value is $7.2$.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_020",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Diffusive and convective mass transfer",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Transport Processes and Separation Process Principles (C.J. Geankoplis)",
    "question": "Which of the following dimensionless numbers correctly represent the stated physical ratios in convective heat and mass transfer operations?",
    "options": {
      "A": "Sherwood number ($Sh = \\frac{k_c L}{D_{AB}}$) represents the ratio of convective mass transfer to molecular diffusion rate.",
      "B": "Schmidt number ($Sc = \\frac{\\mu}{\\rho D_{AB}} = \\frac{\\nu}{D_{AB}}$) represents the ratio of momentum diffusivity to molecular mass diffusivity.",
      "C": "Lewis number ($Le = \\frac{\\alpha}{D_{AB}}$) represents the ratio of thermal diffusivity to mass diffusivity.",
      "D": "Prandtl number ($Pr = \\frac{k}{\\mu c_p}$) represents the ratio of convective heat flux to radiative heat flux."
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "• A, B, and C are canonical definitions of transport phenomena dimensionless numbers.\n• D is incorrect: Prandtl number is the ratio of momentum diffusivity (kinematic viscosity) to thermal diffusivity: $Pr = \\frac{\\nu}{\\alpha} = \\frac{\\mu c_p}{k}$.",
    "difficulty": "Hard"
  },
  {
    "id": "QB_DFE_021",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Simultaneous heat and mass transfer in agricultural processing operations",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "The Lewis relation $\\frac{h_c}{k_y C_s} \\approx 1$ holds true for air-water vapour mixtures under normal ambient conditions primarily because:",
    "options": {
      "A": "The Lewis number $Le = \\frac{Sc}{Pr} = \\frac{\\alpha}{D_{AB}}$ is approximately equal to unity ($1.0$)",
      "B": "The latent heat of vaporization of water is strictly zero",
      "C": "Air has a higher thermal conductivity than pure liquid water",
      "D": "Convective heat transfer occurs without any boundary layer formation"
    },
    "correct_answer": "A",
    "solution": "The Lewis relation arises from the Chilton-Colburn analogy for simultaneous heat and mass transfer. When $Le = \\frac{\\alpha}{D_{AB}} \\approx 1.0$, the thermal boundary layer and concentration boundary layer develop at identical rates, causing the wet-bulb temperature to coincide almost exactly with the adiabatic saturation temperature.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_022",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Material and energy balances in food processing systems",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "Outlines of Dairy Technology (Sukumar De)",
    "question": "Using the Pearson Square method, $2000\\text{ kg}$ of market milk containing $3.0\\%$ milk fat is to be prepared by blending whole buffalo milk ($6.0\\%$ fat) with skim milk ($0.5\\%$ fat). The mass of buffalo milk required in $\\text{kg}$ is ________ (round off to 1 decimal place).",
    "correct_answer": "909.1",
    "numerical_range": {
      "min": 908,
      "max": 911
    },
    "solution": "Let $M_b$ be the mass of buffalo milk and $M_s$ be the mass of skim milk.\n1. Total mass balance: $M_b + M_s = 2000 \\implies M_s = 2000 - M_b$\n2. Fat balance:\n$$M_b (0.06) + (2000 - M_b)(0.005) = 2000 (0.03)$$\n$$0.06 M_b + 10.0 - 0.005 M_b = 60.0$$\n$$0.055 M_b = 50.0$$\n$$M_b = \\frac{50.0}{0.055} = 909.09\\text{ kg} \\approx 909.1\\text{ kg}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_023",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Material and energy balances in food processing systems",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "Outlines of Dairy Technology (Sukumar De)",
    "question": "Skim milk entering a vacuum evaporator at a rate of $6000\\text{ kg/h}$ with $9.0\\%$ total solids is concentrated to condensed skim milk containing $40.0\\%$ total solids. The rate of water removed by evaporation in $\\text{kg/h}$ is ________ (answer in integer).",
    "correct_answer": "4650",
    "numerical_range": {
      "min": 4640,
      "max": 4660
    },
    "solution": "1. Solid balance:\n$$F \\times x_F = P \\times x_P$$\n$$6000 \\times 0.09 = P \\times 0.40 \\implies 540 = 0.40 P \\implies P = 1350\\text{ kg/h}$$\n2. Rate of water evaporated $W$:\n$$W = F - P = 6000 - 1350 = 4650\\text{ kg/h}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_024",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Water activity, sorption and desorption isotherms",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "Moisture sorption data of dehydrated milk powder fitted to the linearized Brunauer-Emmett-Teller (BET) equation $\\frac{a_w}{(1 - a_w) m} = \\frac{1}{m_0 C} + \\frac{C - 1}{m_0 C} a_w$ yields a straight-line plot with slope $S = 22.5\\text{ g solids/g water}$ and intercept $I = 2.5\\text{ g solids/g water}$. The monolayer moisture content ($m_0$) of the milk powder in $\\text{g water/g solids}$ is ________ (round off to 2 decimal places).",
    "correct_answer": "0.04",
    "numerical_range": {
      "min": 0.038,
      "max": 0.042
    },
    "solution": "In the linear form of the BET equation:\n$$y = I + S x$$\nWhere:\n$$I = \\frac{1}{m_0 C}, \\quad S = \\frac{C - 1}{m_0 C}$$\nSumming slope and intercept:\n$$S + I = \\frac{C - 1 + 1}{m_0 C} = \\frac{C}{m_0 C} = \\frac{1}{m_0}$$\n$$m_0 = \\frac{1}{S + I} = \\frac{1}{22.5 + 2.5} = \\frac{1}{25.0} = 0.04\\text{ g water/g solids}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_025",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Water activity, sorption and desorption isotherms",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "Most agricultural and starchy food products (such as grains, flours, and pulses) exhibit which type of BET moisture sorption isotherm classification?",
    "options": {
      "A": "Type II (Sigmoidal S-shaped isotherm)",
      "B": "Type I (Langmuir monolayer isotherm)",
      "C": "Type III (Flory-Huggins solvent swelling isotherm)",
      "D": "Type V (Capillary condensation on porous non-wetting adsorbents)"
    },
    "correct_answer": "A",
    "solution": "Starchy and protein-rich agricultural food products exhibit Type II sigmoidal sorption isotherms. The curve shows an inflection representing the completion of a monomolecular water layer (Zone I), followed by multimolecular layer adsorption (Zone II), and capillary condensation of free water at high water activities (Zone III).",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_026",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Blanching",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "In commercial fruit and vegetable processing, the adequacy of the thermal blanching process is routinely evaluated by testing for the inactivation of which heat-resistant enzyme?",
    "options": {
      "A": "Peroxidase",
      "B": "Alpha-amylase",
      "C": "Lipase",
      "D": "Invertase"
    },
    "correct_answer": "A",
    "solution": "Peroxidase is considered the most heat-stable enzyme naturally occurring in fruits and vegetables. Complete thermal inactivation of peroxidase (verified using guaiacol and hydrogen peroxide) guarantees that less heat-resistant deterioration enzymes (such as catalase and polyphenol oxidase) have also been inactivated.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_027",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Blanching",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "Which of the following statements regarding the objectives and effects of blanching vegetables prior to freezing or canning is/are correct?",
    "options": {
      "A": "It inactivates enzymes responsible for off-flavor and discoloration during storage.",
      "B": "It expels intracellular respiratory gases from vegetable tissues, reducing can corrosion and internal headspace pressure.",
      "C": "It softens vegetable tissue structure to facilitate tighter container filling.",
      "D": "It completely sterilizes the food material, eliminating all bacterial endospores."
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "• A, B, and C are true: Blanching deactivates enzymes, removes tissue gases (oxygen and carbon dioxide), and wilts leafy/fibrous vegetables for uniform packing.\n• D is incorrect: Blanching is a mild pasteurization-level thermal process ($70-100^\\circ\\text{C}$ for a few minutes) and does not kill bacterial endospores.",
    "difficulty": "Hard"
  },
  {
    "id": "QB_DFE_028",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Homogenization",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Outlines of Dairy Technology (Sukumar De)",
    "question": "A quart container of homogenized milk is stored quiescently at $5^\\circ\\text{C}$ for 48 hours. After storage, the top $100\\text{ mL}$ is decanted and tested to contain $3.55\\%$ fat, while the remaining thoroughly mixed milk contains $3.30\\%$ fat. The USPHS homogenization index ($\\frac{\\text{Fat}_{top} - \\text{Fat}_{rem}}{\\text{Fat}_{top}} \\times 100$) in percentage is ________ (round off to 2 decimal places).",
    "correct_answer": "7.04",
    "numerical_range": {
      "min": 6.95,
      "max": 7.15
    },
    "solution": "The United States Public Health Service (USPHS) Homogenization Index is:\n$$\\text{Index} = \\frac{\\text{Fat}_{top} - \\text{Fat}_{rem}}{\\text{Fat}_{top}} \\times 100$$\n$$\\text{Index} = \\frac{3.55 - 3.30}{3.55} \\times 100 = \\frac{0.25}{3.55} \\times 100 = 7.04225\\% \\approx 7.04\\%$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_029",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Homogenization",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Outlines of Dairy Technology (Sukumar De)",
    "question": "A high-pressure homogenizer pumps fluid milk at a volumetric flow rate of $3600\\text{ L/h}$ ($0.001\\text{ m}^3\\text{/s}$) against an operating homogenization pressure differential of $20.0\\text{ MPa}$ ($2.0 \\times 10^7\\text{ Pa}$). If the mechanical efficiency of the homogenizer drive is $80\\%$, the electric power required to drive the homogenizer in $\\text{kW}$ is ________ (answer in integer).",
    "correct_answer": "25",
    "numerical_range": {
      "min": 25,
      "max": 25
    },
    "solution": "1. Hydraulic power output $P_h$:\n$$P_h = Q \\cdot \\Delta P = 0.001\\text{ m}^3\\text{/s} \\times 20.0 \\times 10^6\\text{ Pa} = 20000\\text{ W} = 20.0\\text{ kW}$$\n2. Shaft electric power input $P$:\n$$P = \\frac{P_h}{\\eta} = \\frac{20.0\\text{ kW}}{0.80} = 25.0\\text{ kW}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_030",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Pasteurization",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Outlines of Dairy Technology (Sukumar De)",
    "question": "In industrial dairy processing, the standard biochemical test employed to verify the adequacy of milk pasteurization is the:",
    "options": {
      "A": "Alkaline phosphatase (ALP) test",
      "B": "Methylene blue reduction test (MBRT)",
      "C": "Resazurin test",
      "D": "Lactometer reading test"
    },
    "correct_answer": "A",
    "solution": "Alkaline phosphatase (ALP) is an enzyme naturally present in raw milk with thermal destruction kinetics slightly more resistant than the most heat-tolerant non-spore-forming milk pathogens (Coxiella burnetii and Mycobacterium tuberculosis). A negative phosphatase test confirms pasteurization adequacy.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_031",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Pasteurization",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Outlines of Dairy Technology (Sukumar De)",
    "question": "Which of the following engineering and sanitary provisions are mandatory in continuous High-Temperature Short-Time (HTST) milk pasteurization systems?",
    "options": {
      "A": "A flow diversion valve (FDV) located downstream of the holding tube that automatically diverts sub-legal temperature milk back to the balance tank.",
      "B": "Maintaining pasteurized milk pressure in the regenerator at least $7\\text{ kPa}$ ($1\\text{ psi}$) higher than raw milk pressure to prevent cross-contamination in case of plate leaks.",
      "C": "A holding tube sloped upward toward the flow diversion valve (at least $2\\text{ cm/m}$) to eliminate air pockets.",
      "D": "Direct contact between raw boiler steam and milk inside the holding tube."
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "• A, B, and C are mandatory regulatory standards for HTST pasteurization plants.\n• D is prohibited: Raw industrial boiler steam contains chemical additives (scale inhibitors, amines) that cannot contact food directly. Steam must be culinary-grade and is only used in jacketed plates or specialized direct infusion chambers, never raw boiler steam in holding tubes.",
    "difficulty": "Hard"
  },
  {
    "id": "QB_DFE_032",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Sterilization",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "During thermal processing of a low-acid canned food, the cold-point temperature is monitored at 5-minute intervals during a holding period: at $t = 0\\text{ min}$, $T = 115.1^\\circ\\text{C}$; at $t = 5\\text{ min}$, $T = 121.1^\\circ\\text{C}$; and at $t = 10\\text{ min}$, $T = 118.1^\\circ\\text{C}$. Taking $z = 10.0^\\circ\\text{C}$ and reference temperature $T_{ref} = 121.1^\\circ\\text{C}$, the lethal rates ($L = 10^{(T - 121.1)/10}$) are $0.251$ at $115.1^\\circ\\text{C}$, $1.000$ at $121.1^\\circ\\text{C}$, and $0.501$ at $118.1^\\circ\\text{C}$. Using the trapezoidal numerical integration rule ($F_0 = \\frac{\\Delta t}{2} [L_0 + 2 L_1 + L_2]$), the accumulated $F_0$ value in minutes over this 10-minute period is ________ (round off to 2 decimal places).",
    "correct_answer": "6.88",
    "numerical_range": {
      "min": 6.8,
      "max": 6.95
    },
    "solution": "Using the trapezoidal numerical integration rule with time interval $\\Delta t = 5\\text{ min}$:\n$$F_0 = \\frac{\\Delta t}{2} [L_0 + 2 L_1 + L_2]$$\n$$F_0 = \\frac{5}{2} [0.251 + 2(1.000) + 0.501]$$\n$$F_0 = 2.5 \\times [0.251 + 2.000 + 0.501] = 2.5 \\times 2.752 = 6.88\\text{ minutes}$$",
    "difficulty": "Hard"
  },
  {
    "id": "QB_DFE_033",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Sterilization",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Outlines of Dairy Technology (Sukumar De)",
    "question": "In direct steam infusion UHT sterilization of milk, the rapid cooling of milk in a vacuum flash chamber serves to:",
    "options": {
      "A": "Instantly cool the milk and flash off the exact amount of water condensate introduced by steam injection",
      "B": "Coagulate whey proteins completely",
      "C": "Eliminate milk fat globule membranes",
      "D": "Dissolve ambient air into the milk to prevent oxidation"
    },
    "correct_answer": "A",
    "solution": "Direct UHT processes heat milk by condensing culinary steam directly into the product, which adds ~10% water. Passing the mixture into a vacuum flash chamber causes rapid evaporative cooling and removes the exact mass of water added as steam, restoring the original milk total solids concentration.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_034",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Kinetics of microbial death – pasteurization and sterilization of milk and other liquid foods",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "Thermal destruction of bacterial spores exhibits first-order kinetics. The reaction rate constants are $k_1 = 0.046\\text{ s}^{-1}$ at $T_1 = 383.15\\text{ K}$ ($110^\\circ\\text{C}$) and $k_2 = 0.460\\text{ s}^{-1}$ at $T_2 = 393.15\\text{ K}$ ($120^\\circ\\text{C}$). Taking the universal gas constant $R = 8.314\\text{ J/(mol}\\cdot\\text{K)}$, the Arrhenius activation energy ($E_a$) in $\\text{kJ/mol}$ is ________ (round off to 1 decimal place).",
    "correct_answer": "288.4",
    "numerical_range": {
      "min": 286,
      "max": 291
    },
    "solution": "From the Arrhenius equation:\n$$\\ln\\left(\\frac{k_2}{k_1}\\right) = \\frac{E_a}{R} \\left( \\frac{1}{T_1} - \\frac{1}{T_2} \\right)$$\n$$\\ln\\left(\\frac{0.460}{0.046}\\right) = \\ln(10) = 2.302585$$\n$$\\frac{1}{T_1} - \\frac{1}{T_2} = \\frac{1}{383.15} - \\frac{1}{393.15} = 0.00260994 - 0.00254356 = 6.6384 \\times 10^{-5}\\text{ K}^{-1}$$\n$$2.302585 = \\frac{E_a}{8.314} \\times 6.6384 \\times 10^{-5}$$\n$$E_a = \\frac{2.302585 \\times 8.314}{6.6384 \\times 10^{-5}} = 288378\\text{ J/mol} \\approx 288.4\\text{ kJ/mol}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_035",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Kinetics of microbial death – pasteurization and sterilization of milk and other liquid foods",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "A batch of $100000$ ($10^5$) cans of low-acid food, each initially containing $10^2$ spores of Clostridium botulinum, undergoes a commercial $12\\text{-D}$ thermal sterilization process. The probability of finding a non-sterile container in the entire batch (expected number of surviving spores in the whole batch) is ________ (answer in decimal).",
    "correct_answer": "0.00001",
    "numerical_range": {
      "min": 0.000009,
      "max": 0.000011
    },
    "solution": "1. Initial total spore population across the batch of $10^5$ cans:\n$$N_0 = 10^5 \\times 10^2 = 10^7\\text{ spores}$$\n2. A $12\\text{-D}$ reduction reduces the population by $12$ log cycles ($10^{12}$ times):\n$$N = N_0 \\times 10^{-12} = 10^7 \\times 10^{-12} = 10^{-5} = 0.00001$$\nThis represents an expected failure rate of 1 non-sterile can in $100,000$ cans.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_036",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Preservation of food by cooling and freezing",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "An aqueous sucrose solution contains $17.1\\text{ g}$ of sucrose ($M_w = 342.0\\text{ g/mol}$) dissolved in $100.0\\text{ g}$ of pure water. Taking the cryoscopic constant of water as $K_f = 1.86\\text{ K}\\cdot\\text{kg/mol}$, the theoretical freezing point depression ($\\Delta T_f = K_f \\cdot m$) in $^\\circ\\text{C}$ is ________ (round off to 2 decimal places).",
    "correct_answer": "0.93",
    "numerical_range": {
      "min": 0.91,
      "max": 0.95
    },
    "solution": "1. Moles of sucrose:\n$$n = \\frac{17.1\\text{ g}}{342.0\\text{ g/mol}} = 0.050\\text{ mol}$$\n2. Molality $m$ (moles of solute per kg of solvent):\n$$m = \\frac{0.050\\text{ mol}}{0.100\\text{ kg}} = 0.50\\text{ mol/kg}$$\n3. Freezing point depression $\\Delta T_f$:\n$$\\Delta T_f = K_f \\cdot m = 1.86\\text{ K}\\cdot\\text{kg/mol} \\times 0.50\\text{ mol/kg} = 0.93^\\circ\\text{C}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_037",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Preservation of food by cooling and freezing",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "Which of the following statements regarding the physical and microbiological aspects of rapid vs. slow freezing of food products is/are correct?",
    "options": {
      "A": "Rapid freezing promotes the nucleation of numerous small intracellular ice crystals, minimizing structural cellular damage.",
      "B": "Slow freezing causes solute concentration in the unfrozen phase and forms large extracellular ice crystals that puncture cell membranes.",
      "C": "Upon thawing, rapidly frozen foods generally show significantly lower drip loss compared to slowly frozen foods.",
      "D": "Freezing kills $100\\%$ of all microorganisms and renders the thawed product permanently sterile."
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "• A, B, and C are correct: Rapid freezing creates high nucleation rates and tiny uniform intracellular ice crystals, reducing cellular rupture and drip loss.\n• D is incorrect: Freezing preserves food by lowering temperature and reducing water activity, halting microbial proliferation. It does not achieve complete sterility; upon thawing, surviving microbes can resume active metabolism.",
    "difficulty": "Hard"
  },
  {
    "id": "QB_DFE_038",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Refrigeration and cold storage basics and applications",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "A cold storage room holds $10000\\text{ kg}$ ($10\\text{ tonnes}$) of fresh apples. The apples are pulled down from $25^\\circ\\text{C}$ to $5^\\circ\\text{C}$ over a period of $24\\text{ hours}$ ($86400\\text{ s}$). The specific heat of apples is $3.60\\text{ kJ/(kg}\\cdot\\text{K)}$. In addition, the average respiration heat generation rate of the apples during this cooling period is $0.04\\text{ W/kg}$. The total product cooling heat load in $\\text{kW}$ is ________ (round off to 2 decimal places).",
    "correct_answer": "8.73",
    "numerical_range": {
      "min": 8.65,
      "max": 8.85
    },
    "solution": "1. Sensible heat to be extracted:\n$$Q_s = m \\cdot c_p \\cdot \\Delta T = 10000\\text{ kg} \\times 3.60\\text{ kJ/(kg}\\cdot\\text{K)} \\times (25 - 5)^\\circ\\text{C} = 720000\\text{ kJ}$$\n2. Average sensible cooling rate:\n$$\\dot{Q}_s = \\frac{720000\\text{ kJ}}{86400\\text{ s}} = 8.3333\\text{ kW}$$\n3. Respiration heat generation rate:\n$$\\dot{Q}_{resp} = 10000\\text{ kg} \\times 0.04\\text{ W/kg} = 400\\text{ W} = 0.4000\\text{ kW}$$\n4. Total product heat load:\n$$\\dot{Q}_{total} = \\dot{Q}_s + \\dot{Q}_{resp} = 8.3333 + 0.4000 = 8.7333\\text{ kW} \\approx 8.73\\text{ kW}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_EXP_001",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Working principles of heat exchangers",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "A counter-current double pipe heat exchanger cools milk from $70.0^\\circ\\text{C}$ to $25.0^\\circ\\text{C}$ using chilled water that enters at $10.0^\\circ\\text{C}$ and leaves at $30.0^\\circ\\text{C}$. The Logarithmic Mean Temperature Difference ($LMTD$) in $^\\circ\\text{C}$ is ________ (round off to 2 decimal places).",
    "correct_answer": "25.04",
    "numerical_range": {
      "min": 24.8,
      "max": 25.3
    },
    "solution": "1. For counter-flow heat exchanger:\n• Hot fluid: $T_{h,in} = 70.0^\\circ\\text{C}, T_{h,out} = 25.0^\\circ\\text{C}$\n• Cold fluid: $T_{c,in} = 10.0^\\circ\\text{C}, T_{c,out} = 30.0^\\circ\\text{C}$\n2. Temperature differences at ends:\n$$\\Delta T_1 = T_{h,in} - T_{c,out} = 70.0 - 30.0 = 40.0^\\circ\\text{C}$$\n$$\\Delta T_2 = T_{h,out} - T_{c,in} = 25.0 - 10.0 = 15.0^\\circ\\text{C}$$\n3. Log Mean Temperature Difference:\n$$LMTD = \\frac{\\Delta T_1 - \\Delta T_2}{\\ln(\\Delta T_1 / \\Delta T_2)} = \\frac{40.0 - 15.0}{\\ln(40.0 / 15.0)} = \\frac{25.0}{\\ln(2.6667)}$$\n$$\\ln(2.6667) \\approx 0.98083$$\n$$LMTD = \\frac{25.0}{0.98083} \\approx 25.042^\\circ\\text{C} \\approx 25.04^\\circ\\text{C}$$",
    "difficulty": "Hard"
  },
  {
    "id": "QB_DFE_EXP_002",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Steady state heat transfer in conduction, convection and radiation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "A stainless steel steam pipe of outer diameter $50\\text{ mm}$ (radius $r_1 = 25\\text{ mm}$) is insulated with glass wool insulation ($k = 0.05\\text{ W/(m}\\cdot\\text{K)}$) in surrounding air with convective heat transfer coefficient $h = 5.0\\text{ W/(m}^2\\cdot\\text{K)}$. The critical radius of insulation ($r_c = k / h$) in millimeters is ________ (answer in integer).",
    "correct_answer": "10",
    "numerical_range": {
      "min": 10,
      "max": 10
    },
    "solution": "Critical radius of insulation for a cylinder:\n$$r_c = \\frac{k}{h} = \\frac{0.05\\text{ W/(m}\\cdot\\text{K)}}{5.0\\text{ W/(m}^2\\cdot\\text{K)}} = 0.010\\text{ m} = 10\\text{ mm}$$\nSince the pipe outer radius ($25\\text{ mm}$) already exceeds $r_c$, any added insulation will monotonically reduce the heat loss rate.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_EXP_003",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Transient heat transfer in simple geometry",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Transport Processes and Separation Process Principles (C.J. Geankoplis)",
    "question": "A spherical fruit of radius $r = 0.03\\text{ m}$ has thermal conductivity $k = 0.50\\text{ W/(m}\\cdot\\text{K)}$. It is cooled in chilled air with convective heat transfer coefficient $h = 10.0\\text{ W/(m}^2\\cdot\\text{K)}$. Taking characteristic length $L_c = r / 3$, the Biot number ($Bi = \\frac{h L_c}{k}$) is ________ (round off to 1 decimal place).",
    "correct_answer": "0.2",
    "numerical_range": {
      "min": 0.19,
      "max": 0.21
    },
    "solution": "1. Characteristic length for a sphere:\n$$L_c = \\frac{V}{A} = \\frac{\\frac{4}{3} \\pi r^3}{4 \\pi r^2} = \\frac{r}{3} = \\frac{0.03\\text{ m}}{3} = 0.010\\text{ m}$$\n2. Biot number $Bi$:\n$$Bi = \\frac{h L_c}{k} = \\frac{10.0 \\times 0.010}{0.50} = \\frac{0.10}{0.50} = 0.20$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_EXP_004",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Transient heat transfer in simple geometry",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "The lumped capacitance method for transient heat conduction analysis is considered valid with negligible internal temperature gradients when the Biot number ($Bi$) satisfies:",
    "options": {
      "A": "$Bi < 0.10$",
      "B": "$Bi > 1.0$",
      "C": "$0.10 < Bi < 10.0$",
      "D": "$Bi = \\infty$"
    },
    "correct_answer": "A",
    "solution": "The lumped capacitance method assumes uniform spatial temperature throughout the body ($T(x,t) \\approx T(t)$). This approximation yields errors $< 5\\%$ only when internal conductive resistance is negligible compared to external convective resistance, represented by $Bi = \\frac{h L_c}{k} < 0.10$.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_EXP_005",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Water activity, sorption and desorption isotherms",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "At $25^\\circ\\text{C}$, the partial vapor pressure of water in equilibrium with a dehydrated food product is $2.25\\text{ kPa}$. Pure water has a saturation vapor pressure of $3.17\\text{ kPa}$ at the same temperature. The water activity ($a_w$) of the food is ________ (round off to 2 decimal places).",
    "correct_answer": "0.71",
    "numerical_range": {
      "min": 0.7,
      "max": 0.72
    },
    "solution": "Water activity is defined as:\n$$a_w = \\frac{p}{p_0} = \\frac{2.25\\text{ kPa}}{3.17\\text{ kPa}} \\approx 0.7098 \\approx 0.71$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_EXP_006",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Working principles of heat exchangers",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Transport Processes and Separation Process Principles (C.J. Geankoplis)",
    "question": "In a plate heat exchanger, the heat capacity rates of the hot and cold fluid streams are equal ($C_{hot} = C_{cold} = C_{min} = 10.0\\text{ kW/K}$). If the Number of Transfer Units $NTU = 2.0$, using the counter-flow effectiveness formula $\\epsilon = \\frac{NTU}{1 + NTU}$ (for $C_{min}/C_{max} = 1$), the heat exchanger effectiveness $\\epsilon$ is ________ (round off to 3 decimal places).",
    "correct_answer": "0.667",
    "numerical_range": {
      "min": 0.66,
      "max": 0.675
    },
    "solution": "For a counter-flow heat exchanger with equal heat capacity rates ($C_r = 1.0$):\n$$\\epsilon = \\frac{NTU}{1 + NTU}$$\nGiven $NTU = 2.0$:\n$$\\epsilon = \\frac{2.0}{1 + 2.0} = \\frac{2}{3} \\approx 0.6667 \\approx 0.667$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_EXP_007",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Steady state heat transfer in conduction, convection and radiation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "A cold store flat wall of area $20.0\\text{ m}^2$ consists of a $100\\text{ mm}$ thick cork insulation layer ($k = 0.04\\text{ W/(m}\\cdot\\text{K)}$). The inside wall surface is maintained at $-10.0^\\circ\\text{C}$ and the outside surface is at $+30.0^\\circ\\text{C}$. The rate of heat conduction through the wall in watts is ________ (answer in integer).",
    "correct_answer": "320",
    "numerical_range": {
      "min": 315,
      "max": 325
    },
    "solution": "Using Fourier's 1D conduction law:\n$$q = \\frac{k A \\Delta T}{L}$$\nGiven:\n• $k = 0.04\\text{ W/(m}\\cdot\\text{K)}$\n• $A = 20.0\\text{ m}^2$\n• $\\Delta T = 30.0 - (-10.0) = 40.0\\text{ K}$\n• $L = 0.10\\text{ m}$\n$$q = \\frac{0.04 \\times 20.0 \\times 40.0}{0.10} = \\frac{32.0}{0.10} = 320\\text{ W}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_EXP_008",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Diffusive and convective mass transfer",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Transport Processes and Separation Process Principles (C.J. Geankoplis)",
    "question": "Water vapor diffuses through a stagnant air film of thickness $\\delta = 2.0\\text{ mm}$ over a wet food surface. The molecular diffusivity of water vapor in air is $D_{AB} = 2.5 \\times 10^{-5}\\text{ m}^2\\text{/s}$. The partial pressure difference of water vapor across the film is $\\Delta p = 2000\\text{ Pa}$. Gas constant $R = 8314\\text{ J/(kmol}\\cdot\\text{K)}$ and temperature $T = 300\\text{ K}$. Using Fick's first law $N_A = \\frac{D_{AB} \\Delta p}{R T \\delta}$, the molar flux $N_A$ in $\\text{mol/(m}^2\\cdot\\text{s)}$ is ________ $\\times 10^{-2}$ (round off to 2 decimal places).",
    "correct_answer": "1.00",
    "numerical_range": {
      "min": 0.98,
      "max": 1.02
    },
    "solution": "1. Molar flux equation:\n$$N_A = \\frac{D_{AB} \\Delta p}{R T \\delta}$$\nGiven:\n• $D_{AB} = 2.5 \\times 10^{-5}\\text{ m}^2\\text{/s}$\n• $\\Delta p = 2000\\text{ Pa}$\n• $R = 8.314\\text{ J/(mol}\\cdot\\text{K)}$\n• $T = 300\\text{ K} \\implies R T = 8.314 \\times 300 = 2494.2\\text{ J/mol}$\n• $\\delta = 0.002\\text{ m}$\n$$N_A = \\frac{(2.5 \\times 10^{-5}) \\times 2000}{2494.2 \\times 0.002} = \\frac{0.050}{4.9884} \\approx 0.010023\\text{ mol/(m}^2\\cdot\\text{s)} = 1.0023 \\times 10^{-2}\\text{ mol/(m}^2\\cdot\\text{s)}$$\nExpressed as $N_A \\times 10^2 = 1.00$.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_EXP_009",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Steady state heat transfer in conduction, convection and radiation",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "In thermal radiation, Stefan-Boltzmann law states that total emissive power ($E_b$) of a blackbody is directly proportional to:",
    "options": {
      "A": "$T^4$ (fourth power of absolute temperature)",
      "B": "$T^2$ (square of absolute temperature)",
      "C": "$T$ (absolute temperature)",
      "D": "$T^3$"
    },
    "correct_answer": "A",
    "solution": "Stefan-Boltzmann law: $E_b = \\sigma T^4$, where $\\sigma = 5.67 \\times 10^{-8}\\text{ W/(m}^2\\cdot\\text{K}^4)$ and $T$ is in Kelvin.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_DFE_EXP_010",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Steady state heat transfer in conduction, convection and radiation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Transport Processes and Separation Process Principles (C.J. Geankoplis)",
    "question": "Water flows inside a pipe of internal diameter $D = 0.025\\text{ m}$ with thermal conductivity $k = 0.60\\text{ W/(m}\\cdot\\text{K)}$. If the forced convection heat transfer coefficient is $h = 2400\\text{ W/(m}^2\\cdot\\text{K)}$, the Nusselt number ($Nu = \\frac{h D}{k}$) is ________ (answer in integer).",
    "correct_answer": "100",
    "numerical_range": {
      "min": 99.5,
      "max": 100.5
    },
    "solution": "Nusselt number definition:\n$$Nu = \\frac{h D}{k} = \\frac{2400 \\times 0.025}{0.60} = \\frac{60.0}{0.60} = 100$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_EXP_011",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Material and energy balances in food processing systems",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "Milk enters a plate heat exchanger pasteurizer at $10.0^\\circ\\text{C}$ and is heated to $72.0^\\circ\\text{C}$. The pasteurized hot milk at $72.0^\\circ\\text{C}$ enters the regeneration section and preheats the incoming cold milk to $62.0^\\circ\\text{C}$. The percentage regeneration efficiency of the heat exchanger is ________ (round off to 1 decimal place).",
    "correct_answer": "83.9",
    "numerical_range": {
      "min": 83,
      "max": 84.5
    },
    "solution": "Regeneration efficiency is defined as:\n$$\\%\\text{ Regeneration} = \\frac{\\text{Temperature rise by regeneration}}{\\text{Total temperature rise}} \\times 100$$\n$$\\%\\text{ Regeneration} = \\frac{62.0 - 10.0}{72.0 - 10.0} \\times 100 = \\frac{52.0}{62.0} \\times 100 \\approx 83.87\\% \\approx 83.9\\%$$",
    "difficulty": "Hard"
  },
  {
    "id": "QB_DFE_EXP_012",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Water activity, sorption and desorption isotherms",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "Which of the following statements are TRUE regarding moisture sorption isotherms of agricultural and food products?",
    "options": {
      "A": "At the same water activity ($a_w$), the equilibrium moisture content is higher along the desorption isotherm than the adsorption isotherm (hysteresis)",
      "B": "Type II sigmoidal isotherms are characteristic of foods high in starch and protein",
      "C": "At a given moisture content, water activity decreases with an increase in temperature",
      "D": "The BET monolayer moisture content corresponds to the moisture level for optimal storage stability"
    },
    "correct_answer": [
      "A",
      "B",
      "D"
    ],
    "solution": "Sorption isotherm principles:\n• Hysteresis loop: Desorption moisture > Adsorption moisture at identical $a_w$ due to ink-bottle capillaries and structural shrinkage (A is TRUE).\n• Starchy/proteinaceous foods exhibit classical S-shaped Type II isotherms (B is TRUE).\n• At a fixed moisture content, Clausius-Clapeyron equation dictates that water activity INCREASES with increasing temperature (C is FALSE).\n• BET monolayer represents maximum coverage of polar sorption sites, below which lipid oxidation increases and above which browning/enzymatic rates accelerate (D is TRUE).",
    "difficulty": "Hard"
  },
  {
    "id": "QB_DFE_EXP_013",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Steady state heat transfer in conduction, convection and radiation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Transport Processes and Separation Process Principles (C.J. Geankoplis)",
    "question": "The thermal resistance of a composite flat wall consisting of two layers in series is the sum of their individual resistances ($R = \\frac{L_1}{k_1 A} + \\frac{L_2}{k_2 A}$). Layer 1 has $L_1 = 0.05\\text{ m}, k_1 = 0.10\\text{ W/(m}\\cdot\\text{K)}$. Layer 2 has $L_2 = 0.10\\text{ m}, k_2 = 0.04\\text{ W/(m}\\cdot\\text{K)}$. For a wall area $A = 1.0\\text{ m}^2$, the total thermal conduction resistance in $\\text{K/W}$ is ________ (answer in integer).",
    "correct_answer": "3",
    "numerical_range": {
      "min": 3,
      "max": 3
    },
    "solution": "1. Resistance of Layer 1:\n$$R_1 = \\frac{L_1}{k_1 A} = \\frac{0.05}{0.10 \\times 1.0} = 0.50\\text{ K/W}$$\n2. Resistance of Layer 2:\n$$R_2 = \\frac{L_2}{k_2 A} = \\frac{0.10}{0.04 \\times 1.0} = 2.50\\text{ K/W}$$\n3. Total resistance:\n$$R_{total} = R_1 + R_2 = 0.50 + 2.50 = 3.0\\text{ K/W}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_EXP_014",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Diffusive and convective mass transfer",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Transport Processes and Separation Process Principles (C.J. Geankoplis)",
    "question": "In mass transfer, the dimensionless Schmidt number ($Sc$) is defined as the ratio of:",
    "options": {
      "A": "Kinematic viscosity (momentum diffusivity) to mass diffusivity ($Sc = \\nu / D_{AB}$)",
      "B": "Thermal diffusivity to mass diffusivity",
      "C": "Buoyancy force to viscous force",
      "D": "Inertial force to surface tension force"
    },
    "correct_answer": "A",
    "solution": "Schmidt number represents the relative rate of momentum transport to mass transport:\n$$Sc = \\frac{\\mu}{\\rho D_{AB}} = \\frac{\\nu}{D_{AB}}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_DFE_EXP_015",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Material and energy balances in food processing systems",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "$2000\\text{ kg/h}$ of milk is heated from $20.0^\\circ\\text{C}$ to $80.0^\\circ\\text{C}$ by condensing steam in a jacketed heat exchanger. The specific heat of milk is $C_p = 3.90\\text{ kJ/(kg}\\cdot\\text{K)}$ and the latent heat of condensation of steam is $\\lambda_s = 2250\\text{ kJ/kg}$. Neglecting heat losses, the steam consumption rate in $\\text{kg/h}$ is ________ (answer in integer).",
    "correct_answer": "208",
    "numerical_range": {
      "min": 206,
      "max": 210
    },
    "solution": "1. Heat absorbed by milk $Q$:\n$$Q = \\dot{m}_{milk} C_p \\Delta T = 2000\\text{ kg/h} \\times 3.90\\text{ kJ/(kg}\\cdot\\text{K)} \\times (80.0 - 20.0)\\text{ K} = 2000 \\times 3.90 \\times 60 = 468,000\\text{ kJ/h}$$\n2. Steam required $\\dot{m}_{steam}$:\n$$\\dot{m}_{steam} = \\frac{Q}{\\lambda_s} = \\frac{468,000\\text{ kJ/h}}{2250\\text{ kJ/kg}} = 208.0\\text{ kg/h}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_EXP_016",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Steady state heat transfer in conduction, convection and radiation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "A small food drying tray of surface area $0.50\\text{ m}^2$ with emissivity $\\epsilon = 0.90$ is heated by an overhead radiant ceramic heater maintained at $800\\text{ K}$. The food tray surface is at $350\\text{ K}$. Taking radiation shape factor $F_{12} = 1.0$ and Stefan-Boltzmann constant $\\sigma = 5.67 \\times 10^{-8}\\text{ W/(m}^2\\cdot\\text{K}^4)$, the net rate of radiant heat transfer in watts is ________ (round off to nearest integer).",
    "correct_answer": "1006",
    "numerical_range": {
      "min": 990,
      "max": 1020
    },
    "solution": "Radiant heat transfer formula:\n$$q = \\epsilon \\sigma A F_{12} (T_1^4 - T_2^4)$$\nGiven:\n• $\\epsilon = 0.90$\n• $\\sigma = 5.67 \\times 10^{-8}\\text{ W/(m}^2\\cdot\\text{K}^4)$\n• $A = 0.50\\text{ m}^2$\n• $T_1 = 800\\text{ K} \\implies T_1^4 = (800)^4 = 4.096 \\times 10^{11}\\text{ K}^4$\n• $T_2 = 350\\text{ K} \\implies T_2^4 = (350)^4 = 1.5006 \\times 10^{10}\\text{ K}^4$\n$$T_1^4 - T_2^4 = 4.096 \\times 10^{11} - 0.15006 \\times 10^{11} = 3.94594 \\times 10^{11}\\text{ K}^4$$\n$$q = 0.90 \\times 0.50 \\times (5.67 \\times 10^{-8}) \\times (3.94594 \\times 10^{11}) = 0.45 \\times 5.67 \\times 3945.94 \\approx 1006.8\\text{ W} \\approx 1007\\text{ W}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_EXP_017",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Working principles of heat exchangers",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "For given hot and cold fluid inlet and outlet temperatures, the Logarithmic Mean Temperature Difference of a counter-flow heat exchanger compared to a parallel-flow heat exchanger is:",
    "options": {
      "A": "Always greater than or equal to that of parallel flow ($LMTD_{counter} \\ge LMTD_{parallel}$)",
      "B": "Always smaller than that of parallel flow",
      "C": "Identical under all circumstances",
      "D": "Zero"
    },
    "correct_answer": "A",
    "solution": "Counter-flow arrangement maintains a more uniform temperature difference throughout the length of the exchanger, resulting in a higher $LMTD$ than parallel flow for the same terminal temperatures, thereby requiring less heat transfer area.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_EXP_018",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Water activity, sorption and desorption isotherms",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "Most food spoilage bacteria cease to proliferate when the water activity ($a_w$) of the food is reduced below approximately:",
    "options": {
      "A": "0.91",
      "B": "0.80",
      "C": "0.60",
      "D": "0.30"
    },
    "correct_answer": "A",
    "solution": "Minimum water activity requirements for microbial growth:\n• Most pathogenic and spoilage bacteria: $a_w < 0.90 - 0.91$ (with *Staphylococcus aureus* capable of growing down to $0.85$ under aerobic conditions).\n• Yeasts: $a_w < 0.88$ (osmophilic yeasts down to $0.60$).\n• Molds: $a_w < 0.80$ (xerophilic molds down to $0.65$).",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_EXP_019",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Transient heat transfer in simple geometry",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "A thermocouple bead of radius $r = 1.0\\text{ mm}$ (density $\\rho = 8000\\text{ kg/m}^3$, $C_p = 400\\text{ J/(kg}\\cdot\\text{K)}$) has convective heat transfer coefficient $h = 200\\text{ W/(m}^2\\cdot\\text{K)}$. The characteristic dimension $L_c = r/3$. The thermal time constant $\\tau = \\frac{\\rho V C_p}{h A} = \\frac{\\rho L_c C_p}{h}$ of the thermocouple in seconds is ________ (round off to 2 decimal places).",
    "correct_answer": "5.33",
    "numerical_range": {
      "min": 5.2,
      "max": 5.45
    },
    "solution": "1. Characteristic length $L_c$:\n$$L_c = \\frac{0.001\\text{ m}}{3} = 3.333 \\times 10^{-4}\\text{ m}$$\n2. Thermal time constant $\\tau$:\n$$\\tau = \\frac{\\rho L_c C_p}{h} = \\frac{8000 \\times (0.001 / 3) \\times 400}{200} = \\frac{8000 \\times 0.001 \\times 400}{600} = \\frac{3200}{600} \\approx 5.333\\text{ s} \\approx 5.33\\text{ s}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_EXP_020",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Material and energy balances in food processing systems",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "In a continuous pasteurizer, $1500\\text{ kg/h}$ of cream is cooled from $85.0^\\circ\\text{C}$ to $5.0^\\circ\\text{C}$. Specific heat of cream is $3.60\\text{ kJ/(kg}\\cdot\\text{K)}$. If chilled water absorbs this heat with a permissible temperature rise of $5.0^\\circ\\text{C}$ ($C_{p,w} = 4.18\\text{ kJ/(kg}\\cdot\\text{K)}$), the required mass flow rate of chilled water in $\\text{kg/h}$ is ________ (round off to nearest integer).",
    "correct_answer": "20670",
    "numerical_range": {
      "min": 20500,
      "max": 20850
    },
    "solution": "Heat balance:\n$$\\dot{m}_w C_{pw} \\Delta T_w = \\dot{m}_c C_{pc} \\Delta T_c$$\n$$\\dot{m}_w \\times 4.18 \\times 5.0 = 1500 \\times 3.60 \\times (85.0 - 5.0)$$\n$$\\dot{m}_w \\times 20.90 = 1500 \\times 3.60 \\times 80.0 = 432,000\\text{ kJ/h}$$\n$$\\dot{m}_w = \\frac{432,000}{20.90} \\approx 20,669.86\\text{ kg/h} \\approx 20,670\\text{ kg/h}$$",
    "difficulty": "Hard"
  },
  {
    "id": "QB_DFE_EXP_021",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Pasteurization",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Outlines of Dairy Technology (Sukumar De)",
    "question": "Using Pearson's square method, $500\\text{ kg}$ of whole milk containing $6.0\\%$ fat is blended with skim milk containing $0.5\\%$ fat to produce standardized milk with $3.0\\%$ fat. The mass of skim milk required in kilograms is ________ (answer in integer).",
    "correct_answer": "600",
    "numerical_range": {
      "min": 600,
      "max": 600
    },
    "solution": "Pearson square proportions:\n• Whole milk ($6.0\\%$): $|3.0 - 0.5| = 2.5\\text{ parts}$\n• Skim milk ($0.5\\%$): $|6.0 - 3.0| = 3.0\\text{ parts}$\n$$\\frac{\\text{Mass of skim milk}}{\\text{Mass of whole milk}} = \\frac{3.0}{2.5} = 1.20$$\n$$\\text{Mass of skim milk} = 500\\text{ kg} \\times 1.20 = 600\\text{ kg}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_EXP_022",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Pasteurization",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Outlines of Dairy Technology (Sukumar De)",
    "question": "A High Temperature Short Time (HTST) pasteurizer processes milk at a flow rate of $3600\\text{ L/h}$ ($0.001\\text{ m}^3\\text{/s}$). The holding tube has an internal diameter of $0.050\\text{ m}$. To ensure the mandatory minimum holding time of $15.0\\text{ seconds}$ for the fastest moving fluid particle (using laminar flow ratio $V_{avg} / V_{max} = 0.50$ or plug flow margin), for turbulent flow where $V_{max} \\approx 1.20 V_{avg}$, if $t_{min} = \\frac{L}{V_{max}} = 15.0\\text{ s}$, with average velocity $V_{avg} = \\frac{Q}{A} = \\frac{0.001}{\\frac{\\pi}{4}(0.05)^2} = \\frac{0.001}{0.0019635} = 0.5093\\text{ m/s}$, taking $V_{max} = 1.20 \\times 0.5093 = 0.611\\text{ m/s}$, the minimum length of the holding tube $L$ in meters is ________ (round off to 2 decimal places).",
    "correct_answer": "9.17",
    "numerical_range": {
      "min": 8.8,
      "max": 9.5
    },
    "solution": "1. Tube cross-sectional area:\n$$A = \\frac{\\pi}{4} (0.050)^2 \\approx 1.9635 \\times 10^{-3}\\text{ m}^2$$\n2. Average velocity:\n$$V_{avg} = \\frac{0.001\\text{ m}^3\\text{/s}}{1.9635 \\times 10^{-3}\\text{ m}^2} \\approx 0.5093\\text{ m/s}$$\n3. Max velocity under turbulent flow ($V_{max} = 1.20 V_{avg}$):\n$$V_{max} = 1.20 \\times 0.5093 = 0.61115\\text{ m/s}$$\n4. Holding tube length $L$ for $t = 15\\text{ s}$:\n$$L = V_{max} \\times t = 0.61115 \\times 15.0 \\approx 9.167\\text{ m} \\approx 9.17\\text{ m}$$",
    "difficulty": "Hard"
  },
  {
    "id": "QB_DFE_EXP_023",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Pasteurization",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Outlines of Dairy Technology (Sukumar De)",
    "question": "The standard time-temperature combination for High Temperature Short Time (HTST) pasteurization of market milk is:",
    "options": {
      "A": "$71.7^\\circ\\text{C}$ ($72^\\circ\\text{C}$) for $15\\text{ seconds}$",
      "B": "$62.8^\\circ\\text{C}$ ($63^\\circ\\text{C}$) for $30\\text{ minutes}$",
      "C": "$135^\\circ\\text{C}$ for $2\\text{ seconds}$",
      "D": "$100^\\circ\\text{C}$ for $10\\text{ minutes}$"
    },
    "correct_answer": "A",
    "solution": "Pasteurization standards:\n• LTLT (Batch/vat): $63^\\circ\\text{C}$ for $30\\text{ minutes}$.\n• HTST (Continuous): $71.7^\\circ\\text{C}$ ($72^\\circ\\text{C}$) for $15\\text{ seconds}$.\n• UHT (Ultra-High Temperature): $135 - 150^\\circ\\text{C}$ for $2 - 5\\text{ seconds}$.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_EXP_024",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Pasteurization",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Outlines of Dairy Technology (Sukumar De)",
    "question": "The adequacy of milk pasteurization is universally verified in dairy quality control laboratories by testing for the inactivation of which endogenous enzyme?",
    "options": {
      "A": "Alkaline phosphatase",
      "B": "Lipase",
      "C": "Catalase",
      "D": "Lactase"
    },
    "correct_answer": "A",
    "solution": "Alkaline phosphatase is an enzyme naturally present in raw milk with thermal resistance slightly greater than *Coxiella burnetii* (the most heat-resistant pathogenic bacterium in milk). Its complete inactivation confirms that milk has been effectively pasteurized.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_EXP_025",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Blanching",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "Blanching of vegetables prior to freezing or canning is tested for completion using the thermal inactivation of:",
    "options": {
      "A": "Peroxidase and catalase",
      "B": "Amylase",
      "C": "Protease",
      "D": "Cellulase"
    },
    "correct_answer": "A",
    "solution": "Peroxidase and catalase are the most heat-stable endogenous enzymes in vegetable tissues. A negative guaiacol/peroxide test for peroxidase activity indicates that all quality-degrading enzymes (polyphenol oxidase, lipoxygenase) have been completely destroyed.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_EXP_026",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Homogenization",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Outlines of Dairy Technology (Sukumar De)",
    "question": "In a dairy homogenizer, $2500\\text{ L/h}$ ($0.000694\\text{ m}^3\\text{/s}$) of milk is pumped through the homogenizing valve under a total pressure drop of $20.0\\text{ MPa}$ ($200\\text{ bar}$). If the mechanical efficiency of the homogenizer pump is $80\\%$, the electric power required in $\\text{kW}$ is ________ (round off to 2 decimal places).",
    "correct_answer": "17.36",
    "numerical_range": {
      "min": 17,
      "max": 17.7
    },
    "solution": "1. Hydraulic power $P_h = Q \\times \\Delta P$:\n$$Q = \\frac{2500 \\times 10^{-3}\\text{ m}^3}{3600\\text{ s}} \\approx 6.9444 \\times 10^{-4}\\text{ m}^3\\text{/s}$$\n$$\\Delta P = 20.0 \\times 10^6\\text{ Pa}$$\n$$P_h = (6.9444 \\times 10^{-4}) \\times (20.0 \\times 10^6) = 13,888.9\\text{ W} = 13.889\\text{ kW}$$\n2. Electric power input $P_{el} = \\frac{P_h}{\\eta}$:\n$$P_{el} = \\frac{13.889\\text{ kW}}{0.80} \\approx 17.361\\text{ kW} \\approx 17.36\\text{ kW}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_EXP_027",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Pasteurization",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Outlines of Dairy Technology (Sukumar De)",
    "question": "A centrifugal cream separator receives $1000\\text{ kg/h}$ of whole milk containing $4.0\\%$ fat. It separates it into cream containing $40.0\\%$ fat and skim milk containing $0.05\\%$ fat. The mass flow rate of cream produced in $\\text{kg/h}$ is ________ (round off to 1 decimal place).",
    "correct_answer": "98.9",
    "numerical_range": {
      "min": 98,
      "max": 99.5
    },
    "solution": "1. Total mass balance: $M = C + S = 1000\\text{ kg/h} \\implies S = 1000 - C$.\n2. Fat mass balance:\n$$M \\times x_M = C \\times x_C + S \\times x_S$$\n$$1000 \\times 0.04 = C \\times 0.40 + (1000 - C) \\times 0.0005$$\n$$40.0 = 0.40 C + 0.50 - 0.0005 C$$\n$$40.0 - 0.50 = (0.40 - 0.0005) C$$\n$$39.50 = 0.3995 C \\implies C = \\frac{39.50}{0.3995} \\approx 98.874\\text{ kg/h} \\approx 98.9\\text{ kg/h}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_EXP_028",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Sterilization",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "Ultra-High Temperature (UHT) continuous sterilization of milk is typically performed at:",
    "options": {
      "A": "$135 - 150^\\circ\\text{C}$ for $2 - 5\\text{ seconds}$",
      "B": "$100^\\circ\\text{C}$ for $15\\text{ minutes}$",
      "C": "$85^\\circ\\text{C}$ for $1\\text{ minute}$",
      "D": "$63^\\circ\\text{C}$ for $30\\text{ minutes}$"
    },
    "correct_answer": "A",
    "solution": "UHT processing utilizes rapid heating to $135 - 150^\\circ\\text{C}$ for $2 - 5\\text{ seconds}$ followed by aseptic packaging, achieving commercial sterility while preserving vitamins and sensory flavor far better than in-container retort sterilization.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_DFE_EXP_029",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Homogenization",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Outlines of Dairy Technology (Sukumar De)",
    "question": "Using Stokes' law $v = \\frac{g d^2 (\\rho_s - \\rho_f)}{18 \\mu}$, if unhomogenized milk has fat globules of average diameter $d_1 = 4.0\\;\\mu\\text{m}$, and two-stage homogenization reduces the diameter to $d_2 = 1.0\\;\\mu\\text{m}$, the creaming rate of the fat globules in homogenized milk is reduced by a factor of ________ (answer in integer).",
    "correct_answer": "16",
    "numerical_range": {
      "min": 16,
      "max": 16
    },
    "solution": "From Stokes' law, creaming velocity $v \\propto d^2$:\n$$\\frac{v_1}{v_2} = \\left(\\frac{d_1}{d_2}\\right)^2 = \\left(\\frac{4.0}{1.0}\\right)^2 = 4^2 = 16$$\nThus, the creaming velocity decreases by a factor of 16.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_EXP_030",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Sterilization",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Outlines of Dairy Technology (Sukumar De)",
    "question": "In the manufacture of butter, $100\\text{ kg}$ of butterfat yielded $120\\text{ kg}$ of butter. The percentage overrun ($\\frac{\\text{Butter} - \\text{Fat}}{\\text{Fat}} \\times 100$) of the butter is ________ (answer in integer).",
    "correct_answer": "20",
    "numerical_range": {
      "min": 20,
      "max": 20
    },
    "solution": "Overrun in butter making:\n$$\\%\\text{ Overrun} = \\frac{B - F}{F} \\times 100 = \\frac{120 - 100}{100} \\times 100 = 20.0\\%$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_EXP_031",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Sterilization",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Transport Processes and Separation Process Principles (C.J. Geankoplis)",
    "question": "Which membrane separation process has the smallest pore size rating and separates dissolved mineral ions and monovalent salts via osmotic pressure gradients?",
    "options": {
      "A": "Reverse Osmosis ($RO$)",
      "B": "Ultrafiltration ($UF$)",
      "C": "Microfiltration ($MF$)",
      "D": "Nanofiltration ($NF$)"
    },
    "correct_answer": "A",
    "solution": "Membrane filtration pore size ranking (finest to coarsest):\n1. Reverse Osmosis ($RO$): $< 0.001\\;\\mu\\text{m}$, rejects all monovalent and multivalent salts.\n2. Nanofiltration ($NF$): $0.001 - 0.01\\;\\mu\\text{m}$, rejects divalent ions and sugars.\n3. Ultrafiltration ($UF$): $0.01 - 0.1\\;\\mu\\text{m}$, concentrates proteins and macromolecules.\n4. Microfiltration ($MF$): $0.1 - 10\\;\\mu\\text{m}$, separates fat globules and bacteria.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_EXP_032",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Pasteurization",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Outlines of Dairy Technology (Sukumar De)",
    "question": "Which of the following safety/control mechanisms are incorporated into a modern continuous HTST milk pasteurization plant?",
    "options": {
      "A": "Flow Diversion Valve ($FDV$) triggered by temperature sensing probe at the end of holding tube",
      "B": "Booster pump located on the pasteurized milk side to maintain higher pressure than raw milk",
      "C": "Metering / timing pump with positive displacement action",
      "D": "Direct contact open flame heating burner"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "HTST safety features:\n• Flow Diversion Valve diverts sub-pasteurized milk back to raw milk balance tank if temperature drops below $71.7^\\circ\\text{C}$ (A).\n• Pressure differential maintains higher pressure on pasteurized side than raw milk side so any leak moves pasteurized into raw, never contaminating pasteurized milk (B).\n• Positive displacement timing pump establishes certified uniform flow rate through holding tube (C).\nMilk is heated indirectly with hot water/steam, never open flame (D is FALSE).",
    "difficulty": "Hard"
  },
  {
    "id": "QB_DFE_EXP_033",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Homogenization",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Outlines of Dairy Technology (Sukumar De)",
    "question": "In a two-stage homogenizer for dairy products, the second stage is operated at a lower pressure (typically $3 - 5\\text{ MPa}$) primarily to:",
    "options": {
      "A": "Disrupt fat globule clusters/clumps formed immediately after the high-pressure first stage",
      "B": "Sterilize the milk",
      "C": "Separate cream from skim milk",
      "D": "Increase the viscosity by coagulation"
    },
    "correct_answer": "A",
    "solution": "The first stage ($15 - 20\\text{ MPa}$) breaks down large fat globules into microscopic droplets. Due to shared surfactant membranes, these droplets tend to clump/cluster together. The second stage ($3 - 5\\text{ MPa}$) provides gentle turbulence to disperse these clumps into discrete, free-flowing globules.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_EXP_034",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Sterilization",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Outlines of Dairy Technology (Sukumar De)",
    "question": "Under FSSAI legal standards for dairy products in India, table butter must contain a minimum milk fat content of $80.0\\%$ and a maximum moisture content of $16.0\\%$. If a butter sample contains $80.5\\%$ fat and $2.0\\%$ curd solids, the moisture content in percentage is ________ (round off to 1 decimal place).",
    "correct_answer": "17.5",
    "numerical_range": {
      "min": 17.3,
      "max": 17.7
    },
    "solution": "Composition of butter:\n$$\\%\\text{ Moisture} = 100 - (\\%\\text{ Fat} + \\%\\text{ Curd} + \\%\\text{ Salt})$$\nFor unsalted butter with $2.0\\%$ curd and $80.5\\%$ fat:\n$$\\%\\text{ Moisture} = 100 - (80.5 + 2.0) = 100 - 82.5 = 17.5\\%$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_EXP_035",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Blanching",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "Green peas are blanched in hot water at $90.0^\\circ\\text{C}$ to inactivate peroxidase. At $90.0^\\circ\\text{C}$, the decimal reduction time of peroxidase is $D_{90} = 0.50\\text{ minutes}$. To achieve a $4D$ reduction ($99.99\\%$ inactivation) of peroxidase activity, the required blanching time in minutes is ________ (answer in integer).",
    "correct_answer": "2",
    "numerical_range": {
      "min": 2,
      "max": 2
    },
    "solution": "For a $4D$ process:\n$$t = 4 \\times D_{90} = 4 \\times 0.50\\text{ min} = 2.0\\text{ minutes}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_EXP_036",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Pasteurization",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Outlines of Dairy Technology (Sukumar De)",
    "question": "Toned milk under standard dairy regulations is prepared by adding skim milk/water to whole milk to achieve which legal composition?",
    "options": {
      "A": "$3.0\\%$ fat and $8.5\\%$ solids-not-fat ($SNF$)",
      "B": "$1.5\\%$ fat and $9.0\\%$ solids-not-fat ($SNF$)",
      "C": "$4.5\\%$ fat and $8.5\\%$ solids-not-fat ($SNF$)",
      "D": "$6.0\\%$ fat and $9.0\\%$ solids-not-fat ($SNF$)"
    },
    "correct_answer": "A",
    "solution": "Standard market milk classifications in India:\n• Toned milk: Min $3.0\\%$ fat and Min $8.5\\%$ SNF.\n• Double toned milk: Min $1.5\\%$ fat and Min $9.0\\%$ SNF.\n• Standardized milk: Min $4.5\\%$ fat and Min $8.5\\%$ SNF.\n• Full cream milk: Min $6.0\\%$ fat and Min $9.0\\%$ SNF.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_DFE_EXP_037",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Sterilization",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Transport Processes and Separation Process Principles (C.J. Geankoplis)",
    "question": "An ultrafiltration membrane unit processes sweet whey ($6.0\\%$ total solids) to concentrate proteins. The volumetric rejection coefficient of whey protein is $R = 0.98$. If the feed protein concentration is $C_f = 8.0\\text{ g/L}$, the protein concentration in the permeate $C_p = C_f (1 - R)$ in $\\text{g/L}$ is ________ (round off to 2 decimal places).",
    "correct_answer": "0.16",
    "numerical_range": {
      "min": 0.15,
      "max": 0.17
    },
    "solution": "Permeate concentration:\n$$C_p = C_f (1 - R) = 8.0\\text{ g/L} \\times (1 - 0.98) = 8.0 \\times 0.02 = 0.16\\text{ g/L}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_EXP_038",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Pasteurization",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Outlines of Dairy Technology (Sukumar De)",
    "question": "In centrifugal clarification of milk, dirt, somatic cells, leucocytes, and debris accumulate along the outer periphery of the centrifuge bowl forming a residue called:",
    "options": {
      "A": "Separator slime",
      "B": "Whey curd",
      "C": "Casein precipitate",
      "D": "Butter grain"
    },
    "correct_answer": "A",
    "solution": "Separator slime (clarifier sludge) consists of extraneous dirt particles, leucocytes, somatic cells, epithelial cells, and heavy protein aggregates forced to the peripheral sediment space of the bowl by high centrifugal force.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_DFE_EXP_039",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Kinetics of microbial death – pasteurization and sterilization of milk and other liquid foods",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "At $121.1^\\circ\\text{C}$, the decimal reduction time for *Clostridium botulinum* spores is $D_{121.1} = 0.21\\text{ minutes}$. Using the commercial '12D concept' for low-acid canned foods, the minimum thermal processing time ($F_0 = 12 D$) in minutes is ________ (round off to 2 decimal places).",
    "correct_answer": "2.52",
    "numerical_range": {
      "min": 2.5,
      "max": 2.54
    },
    "solution": "12D Botulinum cook standard:\n$$F_0 = 12 \\times D_{121.1} = 12 \\times 0.21\\text{ min} = 2.52\\text{ minutes}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_EXP_040",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Kinetics of microbial death – pasteurization and sterilization of milk and other liquid foods",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "A bacterial spore suspension has a decimal reduction time $D_{110} = 8.0\\text{ minutes}$ and thermal resistance constant $z = 10.0^\\circ\\text{C}$. The $D$-value at $120.0^\\circ\\text{C}$ ($D_{120} = D_{110} \\times 10^{-(T - 110)/z}$) in minutes is ________ (round off to 2 decimal places).",
    "correct_answer": "0.8",
    "numerical_range": {
      "min": 0.78,
      "max": 0.82
    },
    "solution": "Thermal resistance relationship ($z$-value equation):\n$$\\log_{10} \\left(\\frac{D_1}{D_2}\\right) = \\frac{T_2 - T_1}{z}$$\n$$D_2 = D_1 \\times 10^{-(T_2 - T_1)/z}$$\nGiven:\n• $T_1 = 110^\\circ\\text{C}, D_1 = 8.0\\text{ min}$\n• $T_2 = 120^\\circ\\text{C}$\n• $z = 10.0^\\circ\\text{C}$\n$$D_{120} = 8.0 \\times 10^{-(120 - 110)/10} = 8.0 \\times 10^{-1} = 0.80\\text{ minutes}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_EXP_041",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Preservation of food by cooling and freezing",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "Plank's equation for freezing time of a slab of thickness $a = 0.05\\text{ m}$ frozen from both sides is $t_f = \\frac{\\rho \\lambda}{\\Delta T} \\left(\\frac{P a}{h} + \\frac{R a^2}{k}\\right)$ with geometric factors $P = \\frac{1}{2}$ and $R = \\frac{1}{8}$. Given density of frozen food $\\rho = 1000\\text{ kg/m}^3$, latent heat $\\lambda = 250\\text{ kJ/kg} = 2.5 \\times 10^5\\text{ J/kg}$, temperature difference $\\Delta T = 20.0\\text{ K}$, surface heat transfer coefficient $h = 25.0\\text{ W/(m}^2\\cdot\\text{K)}$, and frozen thermal conductivity $k = 1.25\\text{ W/(m}\\cdot\\text{K)}$. The freezing time $t_f$ in seconds is ________ (answer in integer).",
    "correct_answer": "15625",
    "numerical_range": {
      "min": 15400,
      "max": 15850
    },
    "solution": "1. Term 1: $\\frac{\\rho \\lambda}{\\Delta T}$:\n$$\\frac{1000 \\times 2.5 \\times 10^5}{20.0} = 1.25 \\times 10^7\\text{ J/(m}^3\\cdot\\text{K)}$$\n2. Term 2: $\\frac{P a}{h}$:\n$$\\frac{0.50 \\times 0.05}{25.0} = \\frac{0.025}{25.0} = 0.0010\\text{ m}^2\\cdot\\text{K/W}$$\n3. Term 3: $\\frac{R a^2}{k}$:\n$$\\frac{0.125 \\times (0.05)^2}{1.25} = \\frac{0.125 \\times 0.0025}{1.25} = 0.10 \\times 0.0025 = 0.00025\\text{ m}^2\\cdot\\text{K/W}$$\n4. Sum of resistances: $0.0010 + 0.00025 = 0.00125\\text{ m}^2\\cdot\\text{K/W}$.\n5. Freezing time $t_f$:\n$$t_f = (1.25 \\times 10^7) \\times 0.00125 = 15,625\\text{ seconds} \\approx 4.34\\text{ hours}$$",
    "difficulty": "Hard"
  },
  {
    "id": "QB_DFE_EXP_042",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Refrigeration and cold storage basics and applications",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "A vapor compression refrigeration plant operates with an evaporator capacity of $35.17\\text{ kW}$ ($10.0\\text{ Tonnes of Refrigeration}$). If the compressor consumes $8.79\\text{ kW}$ of electrical power, the Coefficient of Performance ($COP = \\frac{Q_{evap}}{W_{comp}}$) of the refrigeration system is ________ (answer in integer).",
    "correct_answer": "4",
    "numerical_range": {
      "min": 3.95,
      "max": 4.05
    },
    "solution": "Coefficient of Performance formula:\n$$COP = \\frac{\\text{Refrigeration effect } Q_{evap}}{\\text{Work input } W_{comp}} = \\frac{35.17\\text{ kW}}{8.7925\\text{ kW}} = 4.0$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_EXP_043",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Refrigeration and cold storage basics and applications",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "One Ton of Refrigeration ($1\\text{ TR}$) is defined as the rate of heat extraction required to freeze $1\\text{ US short ton}$ ($2000\\text{ lb}$) of water at $0^\\circ\\text{C}$ into ice at $0^\\circ\\text{C}$ in 24 hours. The equivalent value of $1\\text{ TR}$ in kilowatts ($\\text{kW}$) is ________ (round off to 3 decimal places).",
    "correct_answer": "3.517",
    "numerical_range": {
      "min": 3.51,
      "max": 3.525
    },
    "solution": "$$1\\text{ TR} = \\frac{2000\\text{ lb} \\times 144\\text{ Btu/lb}}{24\\text{ h}} = 12,000\\text{ Btu/h}$$\nConverting to SI units ($1\\text{ Btu} = 1055.056\\text{ J}$):\n$$1\\text{ TR} = \\frac{12,000 \\times 1055.056\\text{ J}}{3600\\text{ s}} = 3516.85\\text{ W} \\approx 3.517\\text{ kW}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_EXP_044",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Kinetics of microbial death – pasteurization and sterilization of milk and other liquid foods",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "A canned food product contains an initial population of $N_0 = 10^6$ bacterial spores per can. After a thermal retorting process, the survival population is reduced to $N = 1$ spore per can. The number of decimal reductions ($n = \\log_{10}(N_0 / N)$) achieved is ________ (answer in integer).",
    "correct_answer": "6",
    "numerical_range": {
      "min": 6,
      "max": 6
    },
    "solution": "Decimal reductions $n$:\n$$n = \\log_{10}\\left(\\frac{N_0}{N}\\right) = \\log_{10}\\left(\\frac{10^6}{1}\\right) = \\log_{10}(10^6) = 6$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_EXP_045",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Refrigeration and cold storage basics and applications",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "An ideal Carnot refrigeration cycle operates between an evaporator temperature of $-13.0^\\circ\\text{C}$ ($260\\text{ K}$) and a condenser temperature of $+27.0^\\circ\\text{C}$ ($300\\text{ K}$). The Carnot Coefficient of Performance ($COP_{Carnot} = \\frac{T_L}{T_H - T_L}$) is ________ (round off to 1 decimal place).",
    "correct_answer": "6.5",
    "numerical_range": {
      "min": 6.4,
      "max": 6.6
    },
    "solution": "Carnot COP formula:\n$$COP_{Carnot} = \\frac{T_L}{T_H - T_L} = \\frac{260\\text{ K}}{300\\text{ K} - 260\\text{ K}} = \\frac{260}{40} = 6.50$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_EXP_046",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Kinetics of microbial death – pasteurization and sterilization of milk and other liquid foods",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "The thermal resistance parameter $z$-value is defined as the temperature change required to:",
    "options": {
      "A": "Change the decimal reduction time ($D$-value) by a factor of 10 (one log cycle)",
      "B": "Kill $90\\%$ of the microbial population at a fixed temperature",
      "C": "Double the enzyme reaction rate",
      "D": "Reduce moisture content by $10\\%$"
    },
    "correct_answer": "A",
    "solution": "By definition, the $z$-value is the temperature increase (in $^\\circ\\text{C}$ or $\\text{K}$) necessary to achieve a 10-fold (one decimal log cycle) reduction in the $D$-value on a thermal death time curve.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_DFE_EXP_047",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Preservation of food by cooling and freezing",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "Quick freezing of food products produces superior textural quality compared to slow freezing because quick freezing forms:",
    "options": {
      "A": "Numerous small, intracellular ice crystals that minimize mechanical rupture of cell walls",
      "B": "A few large extracellular ice crystals",
      "C": "Complete amorphous vitrification without any crystal nucleation",
      "D": "High solute concentration inside cells"
    },
    "correct_answer": "A",
    "solution": "Quick freezing induces a rapid rate of ice nucleation, producing numerous tiny ice crystals distributed uniformly both inside and between cells. Slow freezing causes large extracellular ice crystals that puncture cell membranes, leading to severe drip loss upon thawing.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_EXP_048",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Refrigeration and cold storage basics and applications",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "In a vapor compression refrigeration cycle using R-134a, the refrigerant enters the compressor as saturated vapor with enthalpy $h_1 = 390.0\\text{ kJ/kg}$ and leaves the compressor with enthalpy $h_2 = 425.0\\text{ kJ/kg}$. The refrigerant leaves the condenser as saturated liquid with enthalpy $h_3 = 240.0\\text{ kJ/kg}$. If the expansion process is isenthalpic ($h_4 = h_3$), the COP of the cycle is ________ (round off to 2 decimal places).",
    "correct_answer": "4.29",
    "numerical_range": {
      "min": 4.2,
      "max": 4.35
    },
    "solution": "1. Refrigeration effect $q_{evap} = h_1 - h_4 = 390.0 - 240.0 = 150.0\\text{ kJ/kg}$.\n2. Compressor work $w_{comp} = h_2 - h_1 = 425.0 - 390.0 = 35.0\\text{ kJ/kg}$.\n3. Coefficient of Performance:\n$$COP = \\frac{q_{evap}}{w_{comp}} = \\frac{150.0\\text{ kJ/kg}}{35.0\\text{ kJ/kg}} = \\frac{30}{7} \\approx 4.2857 \\approx 4.29$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_EXP_049",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Preservation of food by cooling and freezing",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "Plank's equation constants $P$ and $R$ for a cylinder of diameter $a$ frozen from its outer surface are $P = 0.25$ and $R = 0.0625$. The ratio of the surface convection term parameter $P$ for a slab ($P_{slab} = 0.50$) to that of a cylinder ($P_{cyl} = 0.25$) is ________ (answer in integer).",
    "correct_answer": "2",
    "numerical_range": {
      "min": 2,
      "max": 2
    },
    "solution": "Plank's geometric coefficients:\n• Infinite slab of thickness $a$: $P = 1/2 = 0.50, R = 1/8 = 0.125$\n• Infinite cylinder of diameter $a$: $P = 1/4 = 0.25, R = 1/16 = 0.0625$\n• Sphere of diameter $a$: $P = 1/6 \\approx 0.167, R = 1/24 \\approx 0.0417$\nRatio: $\\frac{P_{slab}}{P_{cyl}} = \\frac{0.50}{0.25} = 2.0$.",
    "difficulty": "Hard"
  },
  {
    "id": "QB_DFE_EXP_050",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Refrigeration and cold storage basics and applications",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "In a vapor compression refrigeration system, subcooling the liquid refrigerant before the thermostatic expansion valve results in:",
    "options": {
      "A": "An increase in the net refrigerating effect with no change in compressor work",
      "B": "A decrease in the net refrigerating effect",
      "C": "An increase in compressor work with no change in refrigerating effect",
      "D": "A decrease in the COP of the system"
    },
    "correct_answer": "A",
    "solution": "Subcooling lowers the enthalpy of the liquid entering the expansion valve ($h_3$), shifting state 4 to the left on a p-h diagram. This increases the refrigeration effect ($h_1 - h_4$) without altering the compressor suction/discharge states or work ($h_2 - h_1$), thus improving overall COP.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_EXP_051",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Kinetics of microbial death – pasteurization and sterilization of milk and other liquid foods",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "Which of the following factors increase the thermal resistance ($D$-value) of bacterial spores in food processing?",
    "options": {
      "A": "Presence of high concentrations of fats and oils in the food matrix",
      "B": "Neutral $pH$ ($pH \\approx 7.0$) compared to acidic $pH$ ($pH < 4.5$)",
      "C": "High concentration of dissolved sucrose or solutes (low water activity)",
      "D": "Addition of strong organic acids reducing $pH$ below 4.0"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "Factors increasing microbial thermal resistance:\n• Lipids/fats provide a protective hydrophobic coating reducing local water availability (A).\n• Neutral $pH$ offers maximal heat resistance; acidic $pH$ ($<4.5$) synergistically destroys spores (B is TRUE, D is FALSE).\n• Sugars and low $a_w$ protect against thermal protein denaturation (C).",
    "difficulty": "Hard"
  },
  {
    "id": "QB_DFE_EXP_052",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Preservation of food by cooling and freezing",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "A food material containing $80.0\\%$ water is frozen. The latent heat of fusion of water is $333.6\\text{ kJ/kg}$. The latent heat of freezing of $1.0\\text{ kg}$ of this food material in $\\text{kJ/kg}$ is ________ (round off to 1 decimal place).",
    "correct_answer": "266.9",
    "numerical_range": {
      "min": 265,
      "max": 268.5
    },
    "solution": "Latent heat of freezing of food $\\lambda_f$:\n$$\\lambda_f = w \\times \\lambda_{water} = 0.80 \\times 333.6\\text{ kJ/kg} = 266.88\\text{ kJ/kg} \\approx 266.9\\text{ kJ/kg}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_EXP_053",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Refrigeration and cold storage basics and applications",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "The throttling process across the expansion valve in a vapor compression refrigeration cycle is thermodynamically modeled as an:",
    "options": {
      "A": "Isenthalpic process (constant enthalpy)",
      "B": "Isentropic process (constant entropy)",
      "C": "Isothermal process (constant temperature)",
      "D": "Isobaric process (constant pressure)"
    },
    "correct_answer": "A",
    "solution": "Throttling through a narrow orifice or thermostatic expansion valve involves rapid expansion with no work interaction ($W = 0$) and negligible heat exchange ($Q = 0$). By the first law of thermodynamics, it is isenthalpic: $h_1 = h_2$.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_DFE_EXP_054",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Kinetics of microbial death – pasteurization and sterilization of milk and other liquid foods",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "Thermal destruction of a target microorganism follows first-order reaction kinetics $\\frac{dN}{dt} = -k N$. If the reaction rate constant $k = 0.4605\\text{ min}^{-1}$, the decimal reduction time ($D = \\frac{\\ln 10}{k}$) in minutes is ________ (answer in integer).",
    "correct_answer": "5",
    "numerical_range": {
      "min": 5,
      "max": 5
    },
    "solution": "Relationship between first order rate constant $k$ and $D$-value:\n$$D = \\frac{\\ln 10}{k} = \\frac{2.302585}{0.4605} = 5.0\\text{ minutes}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_EXP_055",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Refrigeration and cold storage basics and applications",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Unit Operations in Food Processing (R.L. Earle)",
    "question": "A cold storage room removes heat at a rate of $20.0\\text{ kW}$. The compressor operates with an electrical work input of $5.0\\text{ kW}$. The rate of heat rejected by the condenser to the surrounding ambient air in $\\text{kW}$ is ________ (answer in integer).",
    "correct_answer": "25",
    "numerical_range": {
      "min": 25,
      "max": 25
    },
    "solution": "Energy balance for the refrigeration cycle:\n$$Q_{condenser} = Q_{evaporator} + W_{compressor} = 20.0\\text{ kW} + 5.0\\text{ kW} = 25.0\\text{ kW}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_DFE_EXP_056",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Steady state heat transfer in conduction, convection and radiation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Earle - Unit Operations in Food Processing",
    "question": "A steam pipe carrying saturated steam at $120^\\circ\\text{C}$ is covered with insulation of thermal conductivity $k = 0.08\\text{ W/(m}\\cdot\\text{K)}$. If the surrounding ambient air has a convective heat transfer coefficient $h = 8.0\\text{ W/(m}^2\\cdot\\text{K)}$, calculate the critical radius of insulation in $\\text{mm}$.",
    "solution": "Critical radius of insulation for a cylindrical pipe is:\n$$r_{cr} = \\frac{k}{h} = \\frac{0.08\\text{ W/(m}\\cdot\\text{K)}}{8.0\\text{ W/(m}^2\\cdot\\text{K)}} = 0.01\\text{ m} = 10.0\\text{ mm}$$",
    "difficulty": "Moderate",
    "correct_answer": 10,
    "answer": 10,
    "numerical_range": {
      "min": 9.8,
      "max": 10.2
    }
  },
  {
    "id": "QB_DFE_EXP_057",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Working principles of heat exchangers",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Earle - Unit Operations in Food Processing",
    "question": "In a counter-current plate heat exchanger, milk enters at $15^\\circ\\text{C}$ and exits at $75^\\circ\\text{C}$. Hot water enters at $90^\\circ\\text{C}$ and exits at $30^\\circ\\text{C}$. Calculate the Log Mean Temperature Difference (LMTD) of the heat exchanger in $^\\circ\\text{C}$.",
    "solution": "Temperature differences at the two ends:\n$$\\Delta T_1 = T_{h,\\text{in}} - T_{c,\\text{out}} = 90 - 75 = 15^\\circ\\text{C}$$\n$$\\Delta T_2 = T_{h,\\text{out}} - T_{c,\\text{in}} = 30 - 15 = 15^\\circ\\text{C}$$\nWhen $\\Delta T_1 = \\Delta T_2$, the LMTD equals this common value:\n$$\\text{LMTD} = 15.0^\\circ\\text{C}$$",
    "difficulty": "Hard",
    "correct_answer": 15,
    "answer": 15,
    "numerical_range": {
      "min": 14.8,
      "max": 15.2
    }
  },
  {
    "id": "QB_DFE_EXP_058",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Kinetics of microbial death – pasteurization and sterilization of milk and other liquid foods",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sukumar De - Outlines of Dairy Technology",
    "question": "A bacterial spore suspension has an initial population of $10^6\\text{ spores/mL}$. The decimal reduction time ($D$-value) of the spores at $121.1^\\circ\\text{C}$ is $1.5\\text{ minutes}$. Calculate the heating time in $\\text{minutes}$ at $121.1^\\circ\\text{C}$ required to reduce the spore population to $1\\text{ spore/mL}$.",
    "solution": "Number of decimal log reductions:\n$$n = \\log_{10}\\left(\\frac{N_0}{N}\\right) = \\log_{10}\\left(\\frac{10^6}{1}\\right) = 6$$\nRequired process time:\n$$F = n \\times D = 6 \\times 1.5 = 9.0\\text{ minutes}$$",
    "difficulty": "Moderate",
    "correct_answer": 9,
    "answer": 9,
    "numerical_range": {
      "min": 8.9,
      "max": 9.1
    }
  },
  {
    "id": "QB_DFE_EXP_059",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Kinetics of microbial death – pasteurization and sterilization of milk and other liquid foods",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sukumar De - Outlines of Dairy Technology",
    "question": "The decimal reduction time of a heat-resistant microorganism is $D_1 = 10.0\\text{ minutes}$ at $110^\\circ\\text{C}$. The thermal resistance constant ($z$-value) is $10^\\circ\\text{C}$. Calculate the $D$-value of the organism at $120^\\circ\\text{C}$ in $\\text{minutes}$.",
    "solution": "The relationship between $D$-value and temperature is:\n$$\\log_{10}\\left(\\frac{D_1}{D_2}\\right) = \\frac{T_2 - T_1}{z}$$\n$$\\log_{10}\\left(\\frac{10}{D_2}\\right) = \\frac{120 - 110}{10} = \\frac{10}{10} = 1$$\n$$\\frac{10}{D_2} = 10^1 = 10 \\implies D_2 = 1.0\\text{ minute}$$",
    "difficulty": "Moderate",
    "correct_answer": 1,
    "answer": 1,
    "numerical_range": {
      "min": 0.98,
      "max": 1.02
    }
  },
  {
    "id": "QB_DFE_EXP_060",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Pasteurization",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sukumar De - Outlines of Dairy Technology",
    "question": "In an HTST milk pasteurization plant, raw milk enters the regeneration section at $4^\\circ\\text{C}$ and leaves regeneration at $65^\\circ\\text{C}$ after being preheated by pasteurized milk. The pasteurization holding temperature is $72^\\circ\\text{C}$. Calculate the percentage regeneration efficiency.",
    "solution": "Regeneration efficiency:\n$$\\eta_{\\text{reg}} = \\frac{T_{\\text{regen}} - T_{\\text{feed}}}{T_{\\text{pasteur}} - T_{\\text{feed}}} \\times 100 = \\frac{65 - 4}{72 - 4} \\times 100 = \\frac{61}{68} \\times 100 \\approx 89.706\\%$$",
    "difficulty": "Moderate",
    "correct_answer": 89.71,
    "answer": 89.71,
    "numerical_range": {
      "min": 89.5,
      "max": 90
    }
  },
  {
    "id": "QB_DFE_EXP_061",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Refrigeration and cold storage basics and applications",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Earle - Unit Operations in Food Processing",
    "question": "A milk chilling plant requires $35.17\\text{ kW}$ of cooling capacity to cool bulk milk. Calculate the refrigeration capacity of the plant in Tons of Refrigeration (TR). ($1\\text{ TR} = 3.517\\text{ kW}$)",
    "solution": "$$\\text{Capacity in TR} = \\frac{35.17\\text{ kW}}{3.517\\text{ kW/TR}} = 10.0\\text{ TR}$$",
    "difficulty": "Moderate",
    "correct_answer": 10,
    "answer": 10,
    "numerical_range": {
      "min": 9.95,
      "max": 10.05
    }
  },
  {
    "id": "QB_DFE_EXP_062",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Refrigeration and cold storage basics and applications",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Earle - Unit Operations in Food Processing",
    "question": "A Carnot refrigeration cycle operates between an evaporator temperature of $-10^\\circ\\text{C}$ ($263.15\\text{ K}$) and a condenser temperature of $30^\\circ\\text{C}$ ($303.15\\text{ K}$). Calculate the theoretical Coefficient of Performance (COP) of the cycle.",
    "solution": "$$\\text{COP}_{\\text{Carnot}} = \\frac{T_L}{T_H - T_L} = \\frac{263.15}{303.15 - 263.15} = \\frac{263.15}{40} \\approx 6.579$$",
    "difficulty": "Moderate",
    "correct_answer": 6.58,
    "answer": 6.58,
    "numerical_range": {
      "min": 6.5,
      "max": 6.7
    }
  },
  {
    "id": "QB_DFE_EXP_063",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Blanching",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Earle - Unit Operations in Food Processing",
    "question": "In food canning and freezing operations, the enzyme whose thermal inactivation is universally used as the primary index of adequacy of blanching in vegetables is:",
    "solution": "Peroxidase is among the most heat-resistant enzymes found in vegetable tissues. If thermal processing destroys peroxidase activity, all other deteriorating quality enzymes (such as catalase and polyphenol oxidase) are guaranteed to have been inactivated.",
    "difficulty": "Moderate",
    "options": {
      "A": "Peroxidase",
      "B": "Amylase",
      "C": "Invertase",
      "D": "Lipoxygenase"
    },
    "correct_answer": "A",
    "answer": "A"
  },
  {
    "id": "QB_DFE_EXP_064",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Water activity, sorption and desorption isotherms",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Earle - Unit Operations in Food Processing",
    "question": "Water activity ($a_w$) of a food material at equilibrium is thermodynamically defined as the ratio of:",
    "solution": "Water activity is defined as $a_w = \\frac{p}{p_0} = \\frac{\\text{Equilibrium Relative Humidity (ERH)}}{100}$, representing the chemical potential of water in the food matrix.",
    "difficulty": "Easy",
    "options": {
      "A": "Vapor pressure of water in food ($p$) to vapor pressure of pure water ($p_0$) at the same temperature",
      "B": "Moisture content dry basis to moisture content wet basis",
      "C": "Mass of bound water to mass of free water",
      "D": "Enthalpy of desorption to latent heat of vaporization"
    },
    "correct_answer": "A",
    "answer": "A"
  },
  {
    "id": "QB_DFE_EXP_065",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Transient heat transfer in simple geometry",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Earle - Unit Operations in Food Processing",
    "question": "A spherical pea of diameter $10\\text{ mm}$ ($r = 5\\text{ mm}$) has thermal conductivity $k = 0.5\\text{ W/(m}\\cdot\\text{K)}$. It is cooled in chilled water having convective heat transfer coefficient $h = 60\\text{ W/(m}^2\\cdot\\text{K)}$. Calculate the Biot number ($Bi = h L_c / k$, where characteristic length $L_c = r/3$).",
    "solution": "Characteristic length for a solid sphere of radius $r = 0.005\\text{ m}$:\n$$L_c = \\frac{V}{A} = \\frac{\\frac{4}{3}\\pi r^3}{4\\pi r^2} = \\frac{r}{3} = \\frac{0.005}{3}\\text{ m}$$\nBiot number:\n$$Bi = \\frac{h L_c}{k} = \\frac{60 \\times (0.005 / 3)}{0.5} = \\frac{60 \\times 0.001667}{0.5} = \\frac{0.10}{0.5} = 0.20$$",
    "difficulty": "Moderate",
    "correct_answer": 0.2,
    "answer": 0.2,
    "numerical_range": {
      "min": 0.19,
      "max": 0.21
    }
  },
  {
    "id": "QB_DFE_EXP_066",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Homogenization",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sukumar De - Outlines of Dairy Technology",
    "question": "According to Stokes' law of gravitational creaming $v = \\frac{g d^2 (\\rho_s - \\rho_f)}{18 \\mu}$, reducing the average fat globule diameter in whole milk from $4\\text{ }\\mu\\text{m}$ to $1\\text{ }\\mu\\text{m}$ by high-pressure homogenization reduces the creaming velocity by a factor of:",
    "solution": "Stokes' creaming velocity is directly proportional to the square of globule diameter:\n$$v \\propto d^2$$\n$$\\frac{v_1}{v_2} = \\left(\\frac{d_1}{d_2}\\right)^2 = \\left(\\frac{4}{1}\\right)^2 = 16.0$$",
    "difficulty": "Hard",
    "correct_answer": 16,
    "answer": 16,
    "numerical_range": {
      "min": 15.9,
      "max": 16.1
    }
  },
  {
    "id": "QB_DFE_EXP_067",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Preservation of food by cooling and freezing",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "source": "Earle - Unit Operations in Food Processing",
    "question": "Using Plank's equation for freezing time of a slab of food $t_f = \\frac{\\rho \\lambda}{T_f - T_a} \\left[ \\frac{P a}{h} + \\frac{R a^2}{k} \\right]$, what are the geometric shape factors $P$ and $R$ for an infinite slab geometry?",
    "solution": "For an infinite flat slab of thickness $a$, Plank's shape factors are $P = 1/2$ and $R = 1/8$. For an infinite cylinder of diameter $a$, $P = 1/4, R = 1/16$. For a sphere of diameter $a$, $P = 1/6, R = 1/24$.",
    "difficulty": "Moderate",
    "options": {
      "A": "$P = 1/2, R = 1/8$",
      "B": "$P = 1/4, R = 1/16$",
      "C": "$P = 1/6, R = 1/24$",
      "D": "$P = 1, R = 1/2$"
    },
    "correct_answer": "A",
    "answer": "A"
  },
  {
    "id": "QB_DFE_EXP_068",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Material and energy balances in food processing systems",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sukumar De - Outlines of Dairy Technology",
    "question": "Whole milk containing $4.0\\%$ fat is separated in a centrifugal cream separator into cream containing $40\\%$ fat and skim milk containing $0.05\\%$ fat. For $1000\\text{ kg}$ of whole milk feed, calculate the yield of cream in $\\text{kg}$.",
    "solution": "Overall mass balance: $M = C + S \\implies S = 1000 - C$.\nFat balance:\n$$1000 \\times 0.04 = C \\times 0.40 + S \\times 0.0005$$\n$$40 = 0.40 C + 0.0005(1000 - C)$$\n$$40 = 0.40 C + 0.5 - 0.0005 C$$\n$$39.5 = 0.3995 C$$\n$$C = \\frac{39.5}{0.3995} \\approx 98.873\\text{ kg}$$",
    "difficulty": "Moderate",
    "correct_answer": 98.87,
    "answer": 98.87,
    "numerical_range": {
      "min": 98.5,
      "max": 99.5
    }
  },
  {
    "id": "QB_DFE_EXP_069",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Kinetics of microbial death – pasteurization and sterilization of milk and other liquid foods",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Earle - Unit Operations in Food Processing",
    "question": "In commercial canning of low-acid foods ($pH > 4.5$), the standard 12D process target for *Clostridium botulinum* requires a minimum sterilization value $F_0$ of $2.52\\text{ minutes}$ at $121.1^\\circ\\text{C}$ (based on $D_{121.1} = 0.21\\text{ min}$). Calculate the resulting log-reduction in microbial spores.",
    "solution": "The 12D concept provides 12 decimal log cycles of reduction in spore count:\n$$\\text{Log reduction} = \\log_{10}\\left(\\frac{N_0}{N}\\right) = 12.0$$",
    "difficulty": "Moderate",
    "correct_answer": 12,
    "answer": 12,
    "numerical_range": {
      "min": 11.9,
      "max": 12.1
    }
  },
  {
    "id": "QB_DFE_EXP_070",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Pasteurization",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Sukumar De - Outlines of Dairy Technology",
    "question": "In an HTST milk pasteurizer, if the milk temperature measured at the end of the holding tube falls below the legal set-point ($72^\\circ\\text{C}$), the Flow Diversion Valve (FDV) automatically operates by:",
    "solution": "The Flow Diversion Valve (FDV) is a solenoid-pneumatic fail-safe valve at the exit of the holding tube. When temperature drops below $72^\\circ\\text{C}$, the valve instantly diverts unpasteurized milk back to the balance tank to prevent improperly treated milk from reaching downstream cooling sections.",
    "difficulty": "Moderate",
    "options": {
      "A": "Diverting sub-pasteurized milk back to the raw milk balance tank for re-pasteurization",
      "B": "Shutting off the boiler steam valve immediately",
      "C": "Increasing the speed of the milk timing pump",
      "D": "Injecting cold water directly into the milk stream"
    },
    "correct_answer": "A",
    "answer": "A"
  },
  {
    "id": "QB_DFE_EXP_071",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Steady state heat transfer in conduction, convection and radiation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Earle - Unit Operations in Food Processing",
    "question": "A flat stainless steel plate of thickness $5\\text{ mm}$ ($0.005\\text{ m}$) and thermal conductivity $k = 16\\text{ W/(m}\\cdot\\text{K)}$ transfers heat under steady state. The temperatures on the two opposite faces are $85^\\circ\\text{C}$ and $75^\\circ\\text{C}$. Calculate the heat flux through the plate in $\\text{kW/m}^2$.",
    "solution": "Fourier's law of heat conduction:\n$$q'' = \\frac{k \\Delta T}{L} = \\frac{16 \\times (85 - 75)}{0.005} = \\frac{160}{0.005} = 32000\\text{ W/m}^2 = 32.0\\text{ kW/m}^2$$",
    "difficulty": "Moderate",
    "correct_answer": 32,
    "answer": 32,
    "numerical_range": {
      "min": 31.5,
      "max": 32.5
    }
  },
  {
    "id": "QB_DFE_EXP_072",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Diffusive and convective mass transfer",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Geankoplis - Transport Processes and Separation Process Principles",
    "question": "In steady-state equimolar counter-diffusion of gas $A$ through a stagnant gas layer of thickness $1.0\\text{ mm}$ ($0.001\\text{ m}$), the diffusivity is $D_{AB} = 2.0 \\times 10^{-5}\\text{ m}^2/\\text{s}$. If the concentration difference across the film is $\\Delta C_A = 0.05\\text{ mol/m}^3$, calculate the molar mass flux $J_A$ in $\\text{mol/(m}^2\\cdot\\text{s)}$.",
    "solution": "Fick's first law of diffusion:\n$$J_A = D_{AB} \\frac{\\Delta C_A}{\\Delta z} = (2.0 \\times 10^{-5}) \\times \\frac{0.05}{0.001} = (2.0 \\times 10^{-5}) \\times 50 = 1.0 \\times 10^{-3} = 0.0010\\text{ mol/(m}^2\\cdot\\text{s)}$$",
    "difficulty": "Moderate",
    "correct_answer": 0.001,
    "answer": 0.001,
    "numerical_range": {
      "min": 0.00095,
      "max": 0.00105
    }
  },
  {
    "id": "QB_DFE_EXP_073",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Sterilization",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sukumar De - Outlines of Dairy Technology",
    "question": "Which of the following thermal processing methods qualify as Ultra-High Temperature (UHT) continuous aseptic sterilization of fluid milk?",
    "solution": "- A, B, and C are valid commercial UHT processing methods utilizing continuous ultra-short high-temperature treatment ($135 - 150^\\circ\\text{C}$ for $2 - 5\\text{ s}$) coupled with aseptic packaging.\n- D describes the Low-Temperature Long-Time (LTLT) pasteurization process, which is not sterilization.",
    "difficulty": "Hard",
    "options": {
      "A": "Direct steam injection at $140^\\circ\\text{C}$ for $3 - 5\\text{ seconds}$ followed by flash cooling",
      "B": "Direct steam infusion into a falling milk film vessel at $142^\\circ\\text{C}$",
      "C": "Indirect tubular heat exchanger heating to $138^\\circ\\text{C}$ for $4\\text{ seconds}$",
      "D": "Batch vat heating to $63^\\circ\\text{C}$ for $30\\text{ minutes}$"
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
    "id": "QB_DFE_EXP_074",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Working principles of heat exchangers",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Earle - Unit Operations in Food Processing",
    "question": "A tubular heat exchanger has overall heat transfer coefficient $U = 800\\text{ W/(m}^2\\cdot\\text{K)}$ and surface area $A = 5.0\\text{ m}^2$. If the log mean temperature difference is $\\text{LMTD} = 25.0^\\circ\\text{C}$, calculate the rate of heat transfer in $\\text{kW}$.",
    "solution": "$$Q = U \\times A \\times \\text{LMTD} = 800\\text{ W/(m}^2\\cdot\\text{K)} \\times 5.0\\text{ m}^2 \\times 25.0\\text{ K} = 100000\\text{ W} = 100.0\\text{ kW}$$",
    "difficulty": "Moderate",
    "correct_answer": 100,
    "answer": 100,
    "numerical_range": {
      "min": 99.5,
      "max": 100.5
    }
  },
  {
    "id": "QB_DFE_EXP_075",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Preservation of food by cooling and freezing",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Earle - Unit Operations in Food Processing",
    "question": "A batch of $200\\text{ kg}$ of fresh strawberries at $20^\\circ\\text{C}$ is precooled to $2^\\circ\\text{C}$. The average specific heat of strawberries above freezing is $3.89\\text{ kJ/(kg}\\cdot\\text{K)}$. Calculate the sensible heat removed in $\\text{kJ}$.",
    "solution": "$$Q = m \\times c_p \\times \\Delta T = 200\\text{ kg} \\times 3.89\\text{ kJ/(kg}\\cdot\\text{K)} \\times (20 - 2)\\text{ K} = 200 \\times 3.89 \\times 18 = 14004\\text{ kJ}$$",
    "difficulty": "Moderate",
    "correct_answer": 14004,
    "answer": 14004,
    "numerical_range": {
      "min": 13950,
      "max": 14050
    }
  },
  {
    "id": "QB_DFE_EXP_076",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Water activity, sorption and desorption isotherms",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Earle - Unit Operations in Food Processing",
    "question": "According to the Brunauer-Emmett-Teller (BET) sorption isotherm equation, the monolayer moisture content $m_0$ represents the moisture content at which all primary polar sorption sites are occupied by water molecules. If $100\\text{ g}$ of dry skim milk has a BET monolayer capacity of $0.065\\text{ g water/g dry matter}$, calculate the mass of water in $\\text{grams}$ in this monolayer.",
    "solution": "$$\\text{Mass of water} = 100\\text{ g dry matter} \\times 0.065\\text{ g water/g dry matter} = 6.5\\text{ g}$$",
    "difficulty": "Moderate",
    "correct_answer": 6.5,
    "answer": 6.5,
    "numerical_range": {
      "min": 6.4,
      "max": 6.6
    }
  },
  {
    "id": "QB_DFE_EXP_077",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Steady state heat transfer in conduction, convection and radiation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Earle - Unit Operations in Food Processing",
    "question": "A blackbody food dehydration surface ($1.0\\text{ m}^2$) is heated to $400\\text{ K}$. Assuming an ideal black surface emissivity of $\\epsilon = 1.0$ and Stefan-Boltzmann constant $\\sigma = 5.67 \\times 10^{-8}\\text{ W/(m}^2\\cdot\\text{K}^4)$, calculate the total radiant emissive power in $\\text{W}$.",
    "solution": "Stefan-Boltzmann law:\n$$E_b = \\sigma T^4 = (5.67 \\times 10^{-8}) \\times (400)^4 = (5.67 \\times 10^{-8}) \\times 2.56 \\times 10^{10} = 1451.52\\text{ W/m}^2$$\nFor area $A = 1.0\\text{ m}^2$:\n$$Q = 1451.52\\text{ W}$$",
    "difficulty": "Moderate",
    "correct_answer": 1451.52,
    "answer": 1451.52,
    "numerical_range": {
      "min": 1445,
      "max": 1455
    }
  },
  {
    "id": "QB_DFE_EXP_078",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Pasteurization",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Sukumar De - Outlines of Dairy Technology",
    "question": "In the dairy industry, the standard enzymatic verification test used to confirm that milk has been adequately pasteurized is the:",
    "solution": "Alkaline phosphatase is a native milk enzyme whose thermal inactivation kinetics closely match and slightly exceed the destruction of *Coxiella burnetii* (the most heat-resistant pathogen in raw milk). Absence of alkaline phosphatase confirms proper pasteurization.",
    "difficulty": "Moderate",
    "options": {
      "A": "Alkaline phosphatase test",
      "B": "Peroxidase test",
      "C": "Catalase test",
      "D": "Methylene blue reduction test"
    },
    "correct_answer": "A",
    "answer": "A"
  },
  {
    "id": "QB_DFE_EXP_079",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Refrigeration and cold storage basics and applications",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Earle - Unit Operations in Food Processing",
    "question": "A vapor compression refrigeration system produces $7.0\\text{ kW}$ of cooling while absorbing $2.0\\text{ kW}$ of mechanical compressor work. Calculate the actual Coefficient of Performance (COP) of the refrigeration system.",
    "solution": "$$\\text{COP} = \\frac{\\text{Refrigerating Effect}}{\\text{Work Input}} = \\frac{7.0\\text{ kW}}{2.0\\text{ kW}} = 3.5$$",
    "difficulty": "Moderate",
    "correct_answer": 3.5,
    "answer": 3.5,
    "numerical_range": {
      "min": 3.45,
      "max": 3.55
    }
  },
  {
    "id": "QB_DFE_EXP_080",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Material and energy balances in food processing systems",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sukumar De - Outlines of Dairy Technology",
    "question": "In the production of butter from cream containing $40\\%$ fat, the resulting butter contains $80\\%$ fat and buttermilk contains $0.5\\%$ fat. For $500\\text{ kg}$ of cream churned, calculate the mass of butter obtained in $\\text{kg}$.",
    "solution": "Overall mass balance: $C = B + BM \\implies BM = 500 - B$.\nFat balance:\n$$500 \\times 0.40 = B \\times 0.80 + (500 - B) \\times 0.005$$\n$$200 = 0.80 B + 2.5 - 0.005 B$$\n$$197.5 = 0.795 B$$\n$$B = \\frac{197.5}{0.795} \\approx 248.428\\text{ kg}$$",
    "difficulty": "Moderate",
    "correct_answer": 248.43,
    "answer": 248.43,
    "numerical_range": {
      "min": 248,
      "max": 249
    }
  },
  {
    "id": "QB_DFE_EXP_081",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Homogenization",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sukumar De - Outlines of Dairy Technology",
    "question": "According to the US Public Health Service (USPHS) standard for homogenized milk, after 48 hours of quiescent storage at $4^\\circ\\text{C}$, the fat percentage in the upper $100\\text{ mL}$ of a $1\\text{ quart}$ ($946\\text{ mL}$) container is $4.2\\%$, and the fat percentage in the remaining thoroughly mixed milk is $3.9\\%$. Calculate the creaming index $\\left(\\frac{F_{\\text{top}} - F_{\\text{rem}}}{F_{\\text{top}}} \\times 100\\right)$ in percentage.",
    "solution": "$$\\text{Creaming Index} = \\frac{4.2 - 3.9}{4.2} \\times 100 = \\frac{0.3}{4.2} \\times 100 \\approx 7.1429\\%$$\n(Since it is $< 10\\%$, the milk meets the USPHS homogenization standard).",
    "difficulty": "Moderate",
    "correct_answer": 7.14,
    "answer": 7.14,
    "numerical_range": {
      "min": 7,
      "max": 7.3
    }
  },
  {
    "id": "QB_DFE_EXP_082",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Material and energy balances in food processing systems",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sukumar De - Outlines of Dairy Technology",
    "question": "Using Richmond's formula $\\text{SNF} = 0.25 L + 0.2 F + 0.14$, calculate the Solids-Not-Fat (SNF) percentage of a milk sample having a corrected lactometer reading ($L$) of $28$ and a fat content ($F$) of $4.0\\%$.",
    "solution": "$$\\text{SNF} = (0.25 \\times 28) + (0.2 \\times 4.0) + 0.14 = 7.0 + 0.8 + 0.14 = 7.94\\%$$",
    "difficulty": "Moderate",
    "correct_answer": 7.94,
    "answer": 7.94,
    "numerical_range": {
      "min": 7.9,
      "max": 8
    }
  },
  {
    "id": "QB_DFE_EXP_083",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Working principles of heat exchangers",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Earle - Unit Operations in Food Processing",
    "question": "In a balanced counter-flow heat exchanger where heat capacity rates are equal ($C_h = C_c$, so $C_r = 1.0$), the Number of Transfer Units is $\\text{NTU} = 3.0$. Calculate the heat exchanger effectiveness $\\epsilon = \\frac{\\text{NTU}}{1 + \\text{NTU}}$.",
    "solution": "$$\\epsilon = \\frac{\\text{NTU}}{1 + \\text{NTU}} = \\frac{3.0}{1 + 3.0} = \\frac{3.0}{4.0} = 0.75$$",
    "difficulty": "Moderate",
    "correct_answer": 0.75,
    "answer": 0.75,
    "numerical_range": {
      "min": 0.74,
      "max": 0.76
    }
  },
  {
    "id": "QB_DFE_EXP_084",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Preservation of food by cooling and freezing",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Earle - Unit Operations in Food Processing",
    "question": "Calculate the latent heat that must be extracted to freeze $50\\text{ kg}$ of free water present in food in $\\text{MJ}$. (Latent heat of fusion of water is $333.2\\text{ kJ/kg}$)",
    "solution": "$$Q = m \\times \\lambda = 50\\text{ kg} \\times 333.2\\text{ kJ/kg} = 16660\\text{ kJ} = 16.66\\text{ MJ}$$",
    "difficulty": "Moderate",
    "correct_answer": 16.66,
    "answer": 16.66,
    "numerical_range": {
      "min": 16.6,
      "max": 16.7
    }
  },
  {
    "id": "QB_DFE_EXP_085",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Pasteurization",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Sukumar De - Outlines of Dairy Technology",
    "question": "According to Food Safety and Standards Authority of India (FSSAI) regulatory standards, 'Toned Milk' must contain a minimum of:",
    "solution": "Legal definitions in India:\n- Standardized milk: $\\ge 4.5\\%$ Fat, $\\ge 8.5\\%$ SNF\n- Toned milk: $\\ge 3.0\\%$ Fat, $\\ge 8.5\\%$ SNF\n- Double toned milk: $\\ge 1.5\\%$ Fat, $\\ge 9.0\\%$ SNF\n- Full cream milk: $\\ge 6.0\\%$ Fat, $\\ge 9.0\\%$ SNF.",
    "difficulty": "Easy",
    "options": {
      "A": "$3.0\\%$ Milk Fat and $8.5\\%$ SNF",
      "B": "$1.5\\%$ Milk Fat and $9.0\\%$ SNF",
      "C": "$4.5\\%$ Milk Fat and $8.5\\%$ SNF",
      "D": "$6.0\\%$ Milk Fat and $9.0\\%$ SNF",
      "E": "$0.5\\%$ Milk Fat and $8.7\\%$ SNF"
    },
    "correct_answer": "A",
    "answer": "A"
  },
  {
    "id": "QB_DFE_EXP_086",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Kinetics of microbial death – pasteurization and sterilization of milk and other liquid foods",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Earle - Unit Operations in Food Processing",
    "question": "The thermal destruction of a spore population follows first-order reaction kinetics with a reaction rate constant of $k = 0.921\\text{ min}^{-1}$ at $121^\\circ\\text{C}$. Calculate the decimal reduction time ($D$-value) in $\\text{minutes}$.",
    "solution": "The relationship between decimal reduction time $D$ and first-order kinetic constant $k$ is:\n$$D = \\frac{\\ln(10)}{k} = \\frac{2.3026}{k}$$\n$$D = \\frac{2.3026}{0.921} \\approx 2.50\\text{ minutes}$$",
    "difficulty": "Moderate",
    "correct_answer": 2.5,
    "answer": 2.5,
    "numerical_range": {
      "min": 2.45,
      "max": 2.55
    }
  },
  {
    "id": "QB_DFE_EXP_087",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Steady state heat transfer in conduction, convection and radiation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Earle - Unit Operations in Food Processing",
    "question": "Fluid milk flows through a sanitary stainless steel pipe of internal diameter $D = 0.05\\text{ m}$. The convective heat transfer coefficient inside the pipe is $h = 1200\\text{ W/(m}^2\\cdot\\text{K)}$ and the thermal conductivity of milk is $k = 0.60\\text{ W/(m}\\cdot\\text{K)}$. Calculate the Nusselt number ($Nu = h D / k$).",
    "solution": "$$Nu = \\frac{h D}{k} = \\frac{1200 \\times 0.05}{0.60} = \\frac{60}{0.60} = 100.0$$",
    "difficulty": "Moderate",
    "correct_answer": 100,
    "answer": 100,
    "numerical_range": {
      "min": 99.5,
      "max": 100.5
    }
  },
  {
    "id": "QB_DFE_EXP_088",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Pasteurization",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sukumar De - Outlines of Dairy Technology",
    "question": "In an HTST pasteurizer operating at a milk flow rate of $3600\\text{ L/h}$ ($0.001\\text{ m}^3/\\text{s}$), the holding tube must provide a minimum legal holding time of $15.0\\text{ seconds}$. Calculate the required holding tube volume in $\\text{liters}$.",
    "solution": "Flow rate per second:\n$$Q = \\frac{3600\\text{ L}}{3600\\text{ s}} = 1.0\\text{ L/s}$$\nRequired holding volume:\n$$V = Q \\times t_{\\text{hold}} = 1.0\\text{ L/s} \\times 15.0\\text{ s} = 15.0\\text{ liters}$$",
    "difficulty": "Hard",
    "correct_answer": 15,
    "answer": 15,
    "numerical_range": {
      "min": 14.8,
      "max": 15.2
    }
  },
  {
    "id": "QB_DFE_EXP_089",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Preservation of food by cooling and freezing",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Earle - Unit Operations in Food Processing",
    "question": "Which of the following physical and biological consequences occur during SLOW freezing of cellular food tissues compared to rapid cryogenic freezing?",
    "solution": "- Slow freezing promotes extracellular ice crystallization, drawing water out of cells by osmosis and creating large, jagged crystals that puncture cell walls, resulting in heavy thaw-drip loss (A, B, and C are correct).\n- Rapid freezing creates thousands of tiny intracellular ice nuclei that do not damage cellular structure (D describes rapid freezing).",
    "difficulty": "Hard",
    "options": {
      "A": "Formation of large, irregular extracellular ice crystals",
      "B": "Extensive mechanical rupture of cell walls and membranes",
      "C": "Severe drip loss (cellular fluid exudation) upon thawing",
      "D": "Uniform distribution of numerous microscopic intracellular ice crystals"
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
    "id": "QB_DFE_EXP_090",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Simultaneous heat and mass transfer in agricultural processing operations",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Geankoplis - Transport Processes and Separation Process Principles",
    "question": "The Lewis number ($Le$) characterizes fluid flows where there is simultaneous heat and mass transfer. If the thermal diffusivity of air is $\\alpha = 2.2 \\times 10^{-5}\\text{ m}^2/\\text{s}$ and the mass diffusivity of water vapor in air is $D_{AB} = 2.2 \\times 10^{-5}\\text{ m}^2/\\text{s}$, calculate the Lewis number ($Le = \\alpha / D_{AB}$).",
    "solution": "$$Le = \\frac{\\alpha}{D_{AB}} = \\frac{2.2 \\times 10^{-5}}{2.2 \\times 10^{-5}} = 1.0$$",
    "difficulty": "Moderate",
    "correct_answer": 1,
    "answer": 1,
    "numerical_range": {
      "min": 0.98,
      "max": 1.02
    }
  },
  {
    "id": "QB_DFE_EXP_091",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Steady state heat transfer in conduction, convection and radiation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Earle - Unit Operations in Food Processing",
    "question": "A cold storage wall consists of a $100\\text{ mm}$ ($0.10\\text{ m}$) thick layer of expanded polyurethane foam insulation ($k = 0.025\\text{ W/(m}\\cdot\\text{K)}$). Calculate the conductive thermal resistance of the insulation layer per unit wall area in $\\text{m}^2\\cdot\\text{K/W}$.",
    "solution": "Thermal resistance per unit area:\n$$R'' = \\frac{L}{k} = \\frac{0.10\\text{ m}}{0.025\\text{ W/(m}\\cdot\\text{K)}} = 4.0\\text{ m}^2\\cdot\\text{K/W}$$",
    "difficulty": "Moderate",
    "correct_answer": 4,
    "answer": 4,
    "numerical_range": {
      "min": 3.95,
      "max": 4.05
    }
  },
  {
    "id": "QB_DFE_EXP_092",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Refrigeration and cold storage basics and applications",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Earle - Unit Operations in Food Processing",
    "question": "In an industrial vapor compression refrigeration system, the thermostatic expansion valve (TXV) maintains a constant:",
    "solution": "A thermostatic expansion valve senses the refrigerant temperature and pressure at the evaporator exit to regulate refrigerant flow, ensuring a predetermined degree of vapor superheat (typically $4 - 6^\\circ\\text{C}$) to prevent unevaporated liquid droplets from entering the compressor.",
    "difficulty": "Moderate",
    "options": {
      "A": "Degree of refrigerant superheat at the evaporator outlet",
      "B": "Condenser head pressure",
      "C": "Compressor oil level",
      "D": "Cooling water flow rate"
    },
    "correct_answer": "A",
    "answer": "A"
  },
  {
    "id": "QB_DFE_EXP_093",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Sterilization",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Earle - Unit Operations in Food Processing",
    "question": "A can of food is retorted at $121.1^\\circ\\text{C}$ for $6.0\\text{ minutes}$. During this thermal process, lethal rate is $L = 1.0$. Calculate the accumulated sterilization value $F_0$ in $\\text{minutes}$.",
    "solution": "$$F_0 = \\int L\\, dt = L \\times t = 1.0 \\times 6.0 = 6.0\\text{ minutes}$$",
    "difficulty": "Moderate",
    "correct_answer": 6,
    "answer": 6,
    "numerical_range": {
      "min": 5.9,
      "max": 6.1
    }
  },
  {
    "id": "QB_DFE_EXP_094",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Material and energy balances in food processing systems",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sukumar De - Outlines of Dairy Technology",
    "question": "In the manufacture of Cheddar cheese, $1000\\text{ kg}$ of cow milk containing $3.8\\%$ fat and $3.2\\%$ casein is processed. If the cheese recovery yield is $10\\%$, calculate the mass of green cheese produced in $\\text{kg}$.",
    "solution": "$$\\text{Cheese Produced} = 1000\\text{ kg milk} \\times 0.10 = 100.0\\text{ kg}$$",
    "difficulty": "Moderate",
    "correct_answer": 100,
    "answer": 100,
    "numerical_range": {
      "min": 99.5,
      "max": 100.5
    }
  },
  {
    "id": "QB_DFE_EXP_095",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Water activity, sorption and desorption isotherms",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Earle - Unit Operations in Food Processing",
    "question": "Most pathogenic bacteria (including *Salmonella* and *Escherichia coli*) are completely inhibited from growing in foods when the water activity ($a_w$) is reduced below:",
    "solution": "The minimum water activity required for growth of most foodborne pathogenic bacteria is $a_w = 0.91$ (with *Staphylococcus aureus* growing aerobically down to $0.86$). Below $0.60$, no microbial growth (bacteria, yeast, or mold) can occur.",
    "difficulty": "Easy",
    "options": {
      "A": "0.91",
      "B": "0.80",
      "C": "0.60",
      "D": "0.50"
    },
    "correct_answer": "A",
    "answer": "A"
  },
  {
    "id": "QB_DFE_EXP_096",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Preservation of food by cooling and freezing",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Earle - Unit Operations in Food Processing",
    "question": "A sucrose sugar solution has a molality of $m = 2.0\\text{ mol/kg}$. If the cryoscopic freezing point depression constant of water is $K_f = 1.86^\\circ\\text{C}\\cdot\\text{kg/mol}$, calculate the initial freezing point depression $\\Delta T_f$ in $^\\circ\\text{C}$.",
    "solution": "$$\\Delta T_f = K_f \\times m = 1.86 \\times 2.0 = 3.72^\\circ\\text{C}$$",
    "difficulty": "Moderate",
    "correct_answer": 3.72,
    "answer": 3.72,
    "numerical_range": {
      "min": 3.65,
      "max": 3.75
    }
  },
  {
    "id": "QB_DFE_EXP_097",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Working principles of heat exchangers",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Earle - Unit Operations in Food Processing",
    "question": "In a parallel-flow heat exchanger, hot water enters at $80^\\circ\\text{C}$ and exits at $50^\\circ\\text{C}$, while cold water enters at $20^\\circ\\text{C}$ and exits at $40^\\circ\\text{C}$. Calculate the temperature difference at the exit $\\Delta T_2$ in $^\\circ\\text{C}$.",
    "solution": "In parallel flow, fluids travel in the same direction:\nAt entrance: $\\Delta T_1 = T_{h,\\text{in}} - T_{c,\\text{in}} = 80 - 20 = 60^\\circ\\text{C}$.\nAt exit: $\\Delta T_2 = T_{h,\\text{out}} - T_{c,\\text{out}} = 50 - 40 = 10.0^\\circ\\text{C}$.",
    "difficulty": "Moderate",
    "correct_answer": 10,
    "answer": 10,
    "numerical_range": {
      "min": 9.8,
      "max": 10.2
    }
  },
  {
    "id": "QB_DFE_EXP_098",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Blanching",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "Earle - Unit Operations in Food Processing",
    "question": "Green peas are steam blanched at $100^\\circ\\text{C}$. The decimal reduction time for peroxidase inactivation at $100^\\circ\\text{C}$ is $D_{100} = 0.5\\text{ minutes}$. Calculate the blanching time in $\\text{minutes}$ required to achieve a 4-decimal reduction ($99.99\\%$ inactivation) of peroxidase enzyme.",
    "solution": "$$t = n \\times D = 4 \\times 0.5 = 2.0\\text{ minutes}$$",
    "difficulty": "Easy",
    "correct_answer": 2,
    "answer": 2,
    "numerical_range": {
      "min": 1.95,
      "max": 2.05
    }
  },
  {
    "id": "QB_DFE_EXP_099",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Homogenization",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sukumar De - Outlines of Dairy Technology",
    "question": "A high-pressure milk homogenizer pumps $2400\\text{ L/h}$ of milk through its homogenization valve at an operating pressure drop of $20\\text{ MPa}$. Calculate the theoretical hydraulic power dissipated in the valve in $\\text{kW}$.",
    "solution": "Volumetric flow rate:\n$$Q = \\frac{2400\\text{ L/h}}{3600\\text{ s/h}} = \\frac{2.4\\text{ m}^3}{3600\\text{ s}} = 0.000667\\text{ m}^3/\\text{s}$$\nPressure drop $\\Delta P = 20\\text{ MPa} = 20 \\times 10^6\\text{ N/m}^2$.\nPower:\n$$P = Q \\times \\Delta P = 0.000667 \\times (20 \\times 10^6) = 13333.3\\text{ W} \\approx 13.33\\text{ kW}$$",
    "difficulty": "Moderate",
    "correct_answer": 13.33,
    "answer": 13.33,
    "numerical_range": {
      "min": 13.2,
      "max": 13.5
    }
  },
  {
    "id": "QB_DFE_EXP_100",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Kinetics of microbial death – pasteurization and sterilization of milk and other liquid foods",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Earle - Unit Operations in Food Processing",
    "question": "In thermal processing of food, the $z$-value is defined as the temperature increase ($^\\circ\\text{C}$) required to:",
    "solution": "The $z$-value is the temperature change in $^\\circ\\text{C}$ or $^\\circ\\text{F}$ required to alter the thermal death time ($D$-value) by tenfold (one log cycle) on the thermal death time curve.",
    "difficulty": "Easy",
    "options": {
      "A": "Reduce the $D$-value by a factor of 10 (one logarithmic cycle)",
      "B": "Inactivate $90\\%$ of microbial population at constant temperature",
      "C": "Double the sterilization rate",
      "D": "Reduce activation energy by half"
    },
    "correct_answer": "A",
    "answer": "A"
  },
  {
    "id": "QB_DFE_EXP_101",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Transient heat transfer in simple geometry",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Earle - Unit Operations in Food Processing",
    "question": "The lumped heat capacity method for transient heat conduction analysis of a solid food object is considered valid only when the Biot number ($Bi = h L_c / k$) satisfies:",
    "solution": "When $Bi < 0.1$, the internal conductive resistance is negligible compared to the external surface convective resistance, allowing the entire body temperature to be treated as spatially uniform (lumped parameter approximation).",
    "difficulty": "Easy",
    "options": {
      "A": "$Bi < 0.1$",
      "B": "$Bi > 1.0$",
      "C": "$Bi = 10$",
      "D": "$Bi > 100$"
    },
    "correct_answer": "A",
    "answer": "A"
  },
  {
    "id": "QB_DFE_EXP_102",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Material and energy balances in food processing systems",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sukumar De - Outlines of Dairy Technology",
    "question": "Skim milk powder containing $3.5\\%$ moisture is produced from liquid skim milk containing $9.0\\%$ total solids. Calculate the mass of liquid skim milk required in $\\text{kg}$ to produce $100\\text{ kg}$ of powder.",
    "solution": "Total solids in $100\\text{ kg}$ powder:\n$$S = 100 \\times (1 - 0.035) = 100 \\times 0.965 = 96.5\\text{ kg}$$\nLiquid skim milk contains $9\\%$ solids ($0.09$):\n$$\\text{Mass of liquid milk} = \\frac{96.5}{0.09} \\approx 1072.22\\text{ kg}$$",
    "difficulty": "Moderate",
    "correct_answer": 1072.22,
    "answer": 1072.22,
    "numerical_range": {
      "min": 1070,
      "max": 1075
    }
  },
  {
    "id": "QB_DFE_EXP_103",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Preservation of food by cooling and freezing",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Earle - Unit Operations in Food Processing",
    "question": "A plate freezer freezes fish fillets packed in flat boxes of thickness $a = 0.05\\text{ m}$. In Plank's equation $t_f = \\frac{\\rho \\lambda}{T_f - T_a} \\left[ \\frac{P a}{h} + \\frac{R a^2}{k} \\right]$, the density is $\\rho = 1000\\text{ kg/m}^3$, latent heat is $\\lambda = 250\\text{ kJ/kg} = 250000\\text{ J/kg}$, temperature difference is $\\Delta T = 25^\\circ\\text{C}$, $h = 50\\text{ W/(m}^2\\cdot\\text{K)}$, $k = 1.2\\text{ W/(m}\\cdot\\text{K)}$, $P = 1/2$, and $R = 1/8$. Calculate the freezing time in $\\text{seconds}$.",
    "solution": "Plank's terms:\n$$\\frac{P a}{h} = \\frac{0.5 \\times 0.05}{50} = \\frac{0.025}{50} = 0.0005\\text{ m}^2\\cdot\\text{K/W}$$\n$$\\frac{R a^2}{k} = \\frac{0.125 \\times (0.05)^2}{1.2} = \\frac{0.125 \\times 0.0025}{1.2} = \\frac{0.0003125}{1.2} \\approx 0.0002604\\text{ m}^2\\cdot\\text{K/W}$$\nSum of terms $= 0.0005 + 0.0002604 = 0.0007604$.\nConstant factor:\n$$\\frac{\\rho \\lambda}{\\Delta T} = \\frac{1000 \\times 250000}{25} = 10000000 = 10^7$$\n$$t_f = 10^7 \\times 0.000760417 \\approx 7604.17\\text{ seconds}$$",
    "difficulty": "Hard",
    "correct_answer": 7604.17,
    "answer": 7604.17,
    "numerical_range": {
      "min": 7550,
      "max": 7650
    }
  },
  {
    "id": "QB_DFE_EXP_104",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Homogenization",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Sukumar De - Outlines of Dairy Technology",
    "question": "Which of the following physical phenomena contribute to fat globule size reduction inside a high-pressure homogenization valve?",
    "solution": "- A, B, and C are the three established fluid mechanical mechanisms of homogenization: intense velocity shear, explosive cavitation collapse, and physical impact against the ceramic/stellite ring.\n- D is incorrect: Triglycerides are non-volatile and do not evaporate during homogenization.",
    "difficulty": "Hard",
    "options": {
      "A": "Intense shear stress in the narrow valve gap",
      "B": "Cavitation collapse of vapor bubbles resulting from local static pressure drop below vapor pressure",
      "C": "High-velocity liquid jet impact against the impact ring",
      "D": "Direct thermal evaporation of the milk triglycerides"
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
    "id": "QB_DFE_EXP_105",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Water activity, sorption and desorption isotherms",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Earle - Unit Operations in Food Processing",
    "question": "In the Guggenheim-Anderson-de Boer (GAB) sorption isotherm equation $m = \\frac{m_0 C K a_w}{(1 - K a_w)(1 - K a_w + C K a_w)}$, if the monolayer moisture is $m_0 = 0.05\\text{ g/g}$, $C = 20.0$, $K = 0.80$, and at water activity $a_w = 0.50$, calculate the term $K a_w$.",
    "solution": "$$K a_w = 0.80 \\times 0.50 = 0.40$$",
    "difficulty": "Moderate",
    "correct_answer": 0.4,
    "answer": 0.4,
    "numerical_range": {
      "min": 0.39,
      "max": 0.41
    }
  },
  {
    "id": "QB_DFE_ADV_001",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Working principles of heat exchangers",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A counter-current double tube heat exchanger pasteurizes whole milk at a flow rate of $1800\\text{ kg/h}$ ($C_p = 3.9\\text{ kJ/(kg}\\cdot\\text{K)}$) from $15^\\circ\\text{C}$ to $72^\\circ\\text{C}$. Hot water ($C_p = 4.18\\text{ kJ/(kg}\\cdot\\text{K)}$) enters the exchanger at $90^\\circ\\text{C}$ and exits at $45^\\circ\\text{C}$. The overall heat transfer coefficient $U = 1200\\text{ W/(m}^2\\cdot\\text{K)}$. The required heat transfer surface area is ________ $\\text{m}^2$ (round off to two decimal places).",
    "correct_answer": "3.94",
    "numerical_range": {
      "min": 3.85,
      "max": 4.05
    },
    "solution": "1. Rate of heat transfer ($Q$):\n$$Q = \\dot{m}_m C_{p,m} \\Delta T_m = \\left( \\frac{1800}{3600}\\text{ kg/s} \\right) \\times 3900\\text{ J/(kg}\\cdot\\text{K)} \\times (72 - 15) = 0.5 \\times 3900 \\times 57 = 111150\\text{ W} = 111.15\\text{ kW}$$\n\n2. Logarithmic Mean Temperature Difference (LMTD):\nIn counter-current flow:\n$$\\Delta T_1 = T_{h,in} - T_{c,out} = 90 - 72 = 18^\\circ\\text{C}$$\n$$\\Delta T_2 = T_{h,out} - T_{c,in} = 45 - 15 = 30^\\circ\\text{C}$$\n$$\\text{LMTD} = \\frac{\\Delta T_2 - \\Delta T_1}{\\ln(\\Delta T_2 / \\Delta T_1)} = \\frac{30 - 18}{\\ln(30 / 18)} = \\frac{12}{\\ln(1.6667)} = \\frac{12}{0.5108} = 23.491^\\circ\\text{C}$$\n\n3. Required heat transfer area ($A$):\n$$Q = U A \\text{LMTD} \\implies A = \\frac{Q}{U \\times \\text{LMTD}} = \\frac{111150\\text{ W}}{1200\\text{ W/(m}^2\\cdot\\text{K)} \\times 23.491\\text{ K}} = \\frac{111150}{28189.2} = 3.943\\text{ m}^2 \\approx 3.94\\text{ m}^2$$",
    "difficulty": "Hard",
    "source": "Food Process Engineering (Brennan, Butters, Cowell and Lilly)"
  },
  {
    "id": "QB_DFE_ADV_002",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Kinetics of microbial death – pasteurization and sterilization of milk and other liquid foods",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A canned liquid food containing $10^5$ spores of \\textit{Clostridium botulinum} per can undergoes thermal sterilization at $121.1^\\circ\\text{C}$. The decimal reduction time ($D_{121.1}$) is $0.25\\text{ minutes}$. To ensure a $12\\text{D}$ cook reduction, the required holding time at $121.1^\\circ\\text{C}$ is ________ minutes (answer in integer).",
    "correct_answer": "3",
    "numerical_range": {
      "min": 3,
      "max": 3
    },
    "solution": "The $12\\text{D}$ concept requires a $12$-log cycle reduction in viable spore population:\n$$F_0 = 12 \\times D_{121.1}$$\nGiven $D_{121.1} = 0.25\\text{ minutes}$:\n$$F_0 = 12 \\times 0.25 = 3.0\\text{ minutes}$$\nThus, the holding time required at $121.1^\\circ\\text{C}$ is $3\\text{ minutes}$.",
    "difficulty": "Moderate",
    "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
  },
  {
    "id": "QB_DFE_ADV_003",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Preservation of food by cooling and freezing",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following statements regarding the freezing of food products and Plank's freezing time equation is/are CORRECT?",
    "options": {
      "A": "Plank's equation assumes that food freezes completely at a single constant initial freezing temperature",
      "B": "The thermal conductivity of frozen ice is approximately four times greater than that of liquid water at the same temperature",
      "C": "Rapid freezing produces smaller and uniformly distributed ice crystals compared to slow freezing, preserving cellular membrane integrity",
      "D": "During freezing, the concentration of solutes in the unfrozen liquid phase progressively increases, causing depression of the freezing point"
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "All four statements are foundational principles of food freezing engineering:\n- Plank's formula assumes all latent heat is removed at constant initial freezing point $T_f$ without accounting for sensible cooling (Option A is correct).\n- Thermal conductivity of ice ($k_{\\text{ice}} \\approx 2.2\\text{ W/m K}$) is ~4 times that of liquid water ($k_{\\text{water}} \\approx 0.6\\text{ W/m K}$) (Option B is correct).\n- High freezing rate promotes rapid intracellular nucleation of small ice crystals, minimizing puncture damage to cell walls (Option C is correct).\n- As pure ice crystallizes out, the remaining solution becomes more concentrated, progressively lowering the cryoscopic temperature (freezing point depression) (Option D is correct).",
    "difficulty": "Hard",
    "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
  },
  {
    "id": "QB_DFE_ADV_004",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Pasteurization",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "In a continuous High-Temperature Short-Time (HTST) milk pasteurizer operating at a milk flow rate of $3600\\text{ L/h}$, the holding tube has an internal diameter of $50\\text{ mm}$. To ensure a minimum holding time of $15\\text{ seconds}$ for the fastest flowing particle (with velocity profile laminar ratio of $0.83$ for turbulent flow), the required length of the holding tube is ________ $\\text{m}$ (round off to two decimal places).",
    "correct_answer": "9.20",
    "numerical_range": {
      "min": 9,
      "max": 9.4
    },
    "solution": "1. Milk volumetric flow rate ($Q$):\n$$Q = \\frac{3600\\text{ L/h}}{3600} = 1.0\\text{ L/s} = 0.001\\text{ m}^3/\\text{s}$$\n\n2. Cross-sectional area of tube ($A$) with $D = 0.05\\text{ m}$:\n$$A = \\frac{\\pi}{4} D^2 = \\frac{\\pi}{4} (0.05)^2 = 1.9635 \\times 10^{-3}\\text{ m}^2$$\n\n3. Average velocity ($v_{\\text{avg}}$):\n$$v_{\\text{avg}} = \\frac{Q}{A} = \\frac{0.001}{1.9635 \\times 10^{-3}} = 0.5093\\text{ m/s}$$\n\n4. Maximum (fastest) flow velocity ($v_{\\text{max}}$):\n$$v_{\\text{max}} = \\frac{v_{\\text{avg}}}{0.83} = \\frac{0.5093}{0.83} = 0.6136\\text{ m/s}$$\n\n5. Required holding tube length ($L$):\n$$L = v_{\\text{max}} \\times t_{\\text{holding}} = 0.6136\\text{ m/s} \\times 15\\text{ s} = 9.204\\text{ m} \\approx 9.19\\text{ to } 9.20\\text{ m}$$",
    "difficulty": "Hard",
    "source": "Dairy Engineering: Systems and Applications (Sukumar De)"
  },
  {
    "id": "QB_DFE_HMT_001",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Working principles of heat exchangers",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "In a continuous counter-flow double-tube heat exchanger, whole milk ($C_p = 3.90\\text{ kJ/(kg}\\cdot\\text{K)}$) is heated from $10.0^\\circ\\text{C}$ to $65.0^\\circ\\text{C}$ by hot water entering at $85.0^\\circ\\text{C}$ and discharging at $50.0^\\circ\\text{C}$. The Logarithmic Mean Temperature Difference (LMTD) of the heat exchanger in $^\\circ\\text{C}$ is ________ (round off to two decimal places).",
    "correct_answer": "28.85",
    "numerical_range": {
      "min": 28.5,
      "max": 29.2
    },
    "solution": "Multi-Approach Solution:\n\n**Method 1: Counter-Flow LMTD Definition**\n```\n     Hot Water:  85.0 °C  ====================>  50.0 °C\n     Milk:       65.0 °C  <====================  10.0 °C\n     Diff (ΔT):   20.0 °C                         40.0 °C\n```\n1. Temperature differences at terminal ends:\n$$\\Delta T_1 = T_{h,\\text{in}} - T_{c,\\text{out}} = 85.0 - 65.0 = 20.0^\\circ\\text{C}$$\n$$\\Delta T_2 = T_{h,\\text{out}} - T_{c,\\text{in}} = 50.0 - 10.0 = 40.0^\\circ\\text{C}$$\n\n2. Logarithmic Mean Temperature Difference:\n$$\\text{LMTD} = \\frac{\\Delta T_2 - \\Delta T_1}{\\ln(\\Delta T_2 / \\Delta T_1)} = \\frac{40.0 - 20.0}{\\ln(40.0 / 20.0)} = \\frac{20.0}{\\ln(2)} = \\frac{20.0}{0.693147} = 28.8539^\\circ\\text{C} \\approx 28.85^\\circ\\text{C}$$\n\n**Method 2: Chen's Approximation Formula**\n$$\\text{LMTD} \\approx \\left[ \\frac{\\Delta T_1 \\Delta T_2 (\\Delta T_1 + \\Delta T_2)}{2} \\right]^{1/3} = \\left[ \\frac{20 \\times 40 \\times 60}{2} \\right]^{1/3} = (24000)^{1/3} \\approx 28.845^\\circ\\text{C}$$",
    "difficulty": "Moderate",
    "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
  },
  {
    "id": "QB_DFE_HMT_002",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Working principles of heat exchangers",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A balanced counter-flow plate heat exchanger is used for chilling pasteurized skim milk. Since both fluid streams have equal heat capacity rates ($C_{\\text{min}} = C_{\\text{max}}$, so capacity ratio $C_r = 1.0$), the Number of Transfer Units is $NTU = 2.50$. Using the effectiveness-NTU relation $\\varepsilon = \\frac{NTU}{1 + NTU}$, the thermal effectiveness of the heat exchanger expressed in percentage is ________ % (round off to two decimal places).",
    "correct_answer": "71.43",
    "numerical_range": {
      "min": 71,
      "max": 72
    },
    "solution": "Multi-Approach Solution:\n\n**Method 1: Direct Substitution into Balanced Counter-Flow Formula**\nFor a counter-flow heat exchanger with $C_r = \\frac{C_{\\text{min}}}{C_{\\text{max}}} = 1.0$:\n$$\\varepsilon = \\frac{NTU}{1 + NTU}$$\nGiven $NTU = 2.50$:\n$$\\varepsilon = \\frac{2.50}{1 + 2.50} = \\frac{2.50}{3.50} = \\frac{5}{7} \\approx 0.7142857$$\nExpressed as a percentage:\n$$\\varepsilon = 71.43\\%$$\n\n**Method 2: Limit of General Counter-Flow Relation**\nGeneral formula: $\\varepsilon = \\frac{1 - \\exp[-NTU(1 - C_r)]}{1 - C_r \\exp[-NTU(1 - C_r)]}$. Applying L'Hôpital's rule as $C_r \\to 1$ yields $\\varepsilon = \\frac{NTU}{1 + NTU} = \\frac{2.5}{3.5} = 71.43\\%$.",
    "difficulty": "Moderate",
    "source": "Unit Operations in Food Processing (R.L. Earle)"
  },
  {
    "id": "QB_DFE_HMT_003",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Steady state heat transfer in conduction, convection and radiation",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "In the design of sanitary tubular heat exchangers for processing liquid dairy products, the overall heat transfer resistance $\\frac{1}{U}$ accounts for fouling layers via the expression:",
    "options": {
      "A": "$\\frac{1}{U} = \\frac{1}{h_i} + R_{f,i} + \\frac{x_w}{k_w} + R_{f,o} + \\frac{1}{h_o}$",
      "B": "$U = h_i + R_{f,i} + k_w + R_{f,o} + h_o$",
      "C": "$\\frac{1}{U} = h_i \\cdot R_{f,i} \\cdot \\frac{x_w}{k_w} \\cdot R_{f,o} \\cdot h_o$",
      "D": "$U = \\frac{1}{h_i + h_o}$"
    },
    "correct_answer": "A",
    "solution": "Thermal resistances in series are additive: total resistance is the sum of inside convective film resistance ($1/h_i$), inside milk fouling fouling resistance ($R_{f,i}$), tube wall conduction resistance ($x_w/k_w$), outside fouling resistance ($R_{f,o}$), and outside convective resistance ($1/h_o$).",
    "difficulty": "Easy",
    "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
  },
  {
    "id": "QB_DFE_HMT_004",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Working principles of heat exchangers",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "In a dairy milk pasteurizer operating at steady state, raw cold milk enters the regenerator at $4.0^\\circ\\text{C}$ and is pre-heated to $64.0^\\circ\\text{C}$ by hot pasteurized milk entering at $74.0^\\circ\\text{C}$. Both streams flow at identical mass flow rates and have equal specific heat capacities. The percentage heat regeneration (heat recovery efficiency $\\eta_{\\text{regen}} = \\frac{T_{\\text{preheated}} - T_{\\text{cold,in}}}{T_{\\text{pasteurized}} - T_{\\text{cold,in}}} \\times 100$) is ________ % (round off to two decimal places).",
    "correct_answer": "85.71",
    "numerical_range": {
      "min": 85,
      "max": 86.5
    },
    "solution": "Multi-Approach Solution:\n\n**Method 1: Direct Regeneration Formula**\n$$\\eta_{\\text{regen}} = \\frac{T_{\\text{preheated}} - T_{\\text{raw}}}{T_{\\text{pasteurized}} - T_{\\text{raw}}} \\times 100\\%$$\n$$\\eta_{\\text{regen}} = \\frac{64.0 - 4.0}{74.0 - 4.0} \\times 100\\% = \\frac{60.0}{70.0} \\times 100\\% = \\frac{6}{7} \\times 100\\% = 85.714\\% \\approx 85.71\\%$$\n\n**Method 2: Heat Duty Ratio**\nActual heat transferred: $q_{\\text{actual}} = \\dot{m} C_p (64.0 - 4.0) = 60 \\dot{m} C_p$.\nMaximum thermodynamically possible heat recovery: $q_{\\text{max}} = \\dot{m} C_p (74.0 - 4.0) = 70 \\dot{m} C_p$.\n$$\\eta = \\frac{q_{\\text{actual}}}{q_{\\text{max}}} = \\frac{60}{70} = 85.71\\%$$",
    "difficulty": "Moderate",
    "source": "Outlines of Dairy Technology (Sukumar De)"
  },
  {
    "id": "QB_DFE_HMT_005",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Working principles of heat exchangers",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following operational advantages are provided by Gasketed Plate Heat Exchangers (PHE) compared to Shell-and-Tube heat exchangers in dairy processing?",
    "options": {
      "A": "Exceptionally high overall heat transfer coefficients ($U = 3000\\text{--}5000\\text{ W/(m}^2\\cdot\\text{K)}$) due to corrugated chevron plate turbulence",
      "B": "True counter-current flow yielding very close temperature approaches ($< 1^\\circ\\text{C}$)",
      "C": "Ease of sanitation, complete dismantling for visual inspection, and flexible surface area modification by adding or removing plates",
      "D": "Capability to safely handle operating pressures exceeding $150\\text{ bar}$ without gasket blow-out"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "PHEs offer high $U$ values (A), close approach temperatures (B), and modular sanitary maintainability (C). Statement D is INCORRECT because elastomeric gaskets limit PHE operating pressures to typically $< 15-25\\text{ bar}$, whereas shell-and-tube exchangers withstand high pressures.",
    "difficulty": "Moderate",
    "source": "Food Engineering Operations (J.G. Brennan et al.)"
  },
  {
    "id": "QB_DFE_HMT_006",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Transient heat transfer in simple geometry",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A spherical meat ball of diameter $D = 30.0\\text{ mm}$ ($r_0 = 0.015\\text{ m}$) has thermal conductivity $k = 0.45\\text{ W/(m}\\cdot\\text{K)}$ and surface heat transfer coefficient $h = 25.0\\text{ W/(m}^2\\cdot\\text{K)}$ during convective chilling in cold air. The Biot number for the sphere ($Bi = \\frac{h r_0}{3 k}$) using volume-to-surface characteristic length $L_c = \\frac{r_0}{3}$ is ________ (round off to three decimal places).",
    "correct_answer": "0.278",
    "numerical_range": {
      "min": 0.27,
      "max": 0.285
    },
    "solution": "Multi-Approach Solution:\n\n**Method 1: Characteristic Length Substitution**\nFor a solid sphere:\n$$L_c = \\frac{V}{A} = \\frac{\\frac{4}{3}\\pi r_0^3}{4 \\pi r_0^2} = \\frac{r_0}{3} = \\frac{0.015\\text{ m}}{3} = 0.005\\text{ m}$$\n$$Bi = \\frac{h L_c}{k} = \\frac{25.0\\text{ W/(m}^2\\cdot\\text{K)} \\times 0.005\\text{ m}}{0.45\\text{ W/(m}\\cdot\\text{K)}} = \\frac{0.125}{0.45} = 0.27778 \\approx 0.278$$\n\n**Method 2: Direct Ratio**\n$$Bi = \\frac{h r_0}{3 k} = \\frac{25.0 \\times 0.015}{3 \\times 0.45} = \\frac{0.375}{1.35} = 0.2778 \\approx 0.278$$",
    "difficulty": "Moderate",
    "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
  },
  {
    "id": "QB_DFE_HMT_007",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Transient heat transfer in simple geometry",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "The Lumped Capacitance Method for transient cooling or heating analysis of food bodies is strictly valid when the Biot number satisfies:",
    "options": {
      "A": "$Bi < 0.1$",
      "B": "$Bi > 10.0$",
      "C": "$0.1 \\le Bi \\le 1.0$",
      "D": "$Bi = \\infty$"
    },
    "correct_answer": "A",
    "solution": "When $Bi = \\frac{h L_c}{k} < 0.1$, conductive resistance within the food body is negligible compared to surface convective resistance, keeping internal temperature gradients below $5\\%$ and justifying the uniform temperature assumption.",
    "difficulty": "Easy",
    "source": "Transport Processes and Separation Process Principles (C.J. Geankoplis)"
  },
  {
    "id": "QB_DFE_HMT_008",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Transient heat transfer in simple geometry",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A small cylindrical sausage of mass $m = 0.050\\text{ kg}$, surface area $A = 0.0060\\text{ m}^2$, and specific heat capacity $C_p = 3500\\text{ J/(kg}\\cdot\\text{K)}$ is immersed in an agitated boiling water bath maintained at $T_\\infty = 100.0^\\circ\\text{C}$. The convective heat transfer coefficient is $h = 120.0\\text{ W/(m}^2\\cdot\\text{K)}$. Assuming lumped capacitance behavior ($\\theta = \\frac{T - T_\\infty}{T_0 - T_\\infty} = e^{-t / \\tau}$), the thermal time constant $\\tau = \\frac{m C_p}{h A}$ in seconds is ________ (round off to one decimal place).",
    "correct_answer": "243.1",
    "numerical_range": {
      "min": 240,
      "max": 246
    },
    "solution": "Multi-Approach Solution:\n\n**Method 1: Direct Time Constant Evaluation**\n1. Calculate total thermal capacitance:\n$$C_{\\text{th}} = m \\times C_p = 0.050\\text{ kg} \\times 3500\\text{ J/(kg}\\cdot\\text{K)} = 175.0\\text{ J/K}$$\n\n2. Calculate thermal conductance:\n$$K_{\\text{th}} = h \\times A = 120.0\\text{ W/(m}^2\\cdot\\text{K)} \\times 0.0060\\text{ m}^2 = 0.720\\text{ W/K}$$\n\n3. Thermal time constant:\n$$\\tau = \\frac{C_{\\text{th}}}{K_{\\text{th}}} = \\frac{175.0}{0.720} = 243.055\\text{ s} \\approx 243.1\\text{ s}$$\n\n**Method 2: Formula Form**\n$$\\tau = \\frac{m C_p}{h A} = \\frac{0.050 \\times 3500}{120.0 \\times 0.0060} = \\frac{175}{0.72} = 243.06\\text{ seconds}$$",
    "difficulty": "Moderate",
    "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
  },
  {
    "id": "QB_DFE_HMT_009",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Steady state heat transfer in conduction, convection and radiation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A cylindrical stainless steel pipe of outer radius $r_1 = 0.025\\text{ m}$ carries chilled refrigerant. The pipe is covered with mineral wool insulation of thermal conductivity $k = 0.040\\text{ W/(m}\\cdot\\text{K)}$. The external ambient air has a convective heat transfer coefficient of $h = 8.0\\text{ W/(m}^2\\cdot\\text{K)}$. The critical radius of insulation for the cylinder ($r_c = \\frac{k}{h}$) in $\\text{mm}$ is ________ (answer in integer).",
    "correct_answer": "5",
    "numerical_range": {
      "min": 5,
      "max": 5
    },
    "solution": "Multi-Approach Solution:\n\n**Method 1: Critical Radius Formula**\nFor a cylinder:\n$$r_c = \\frac{k}{h} = \\frac{0.040\\text{ W/(m}\\cdot\\text{K)}}{8.0\\text{ W/(m}^2\\cdot\\text{K)}} = 0.0050\\text{ m} = 5.0\\text{ mm}$$\n\n**Method 2: Derivative of Total Thermal Resistance**\nThermal resistance per unit length:\n$$R' = \\frac{\\ln(r/r_1)}{2 \\pi k} + \\frac{1}{2 \\pi r h}$$\nSetting $\\frac{dR'}{dr} = 0 \\implies \\frac{1}{2 \\pi k r} - \\frac{1}{2 \\pi h r^2} = 0 \\implies r_c = \\frac{k}{h} = 5\\text{ mm}$.",
    "difficulty": "Easy",
    "source": "Transport Processes and Separation Process Principles (C.J. Geankoplis)"
  },
  {
    "id": "QB_DFE_HMT_010",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Steady state heat transfer in conduction, convection and radiation",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following dimensionless numbers are correctly paired with their physical definitions in fluid thermal transport?",
    "options": {
      "A": "Nusselt number ($Nu = \\frac{h D}{k}$): Ratio of convective heat transfer to pure conductive heat transfer across the fluid boundary layer",
      "B": "Prandtl number ($Pr = \\frac{C_p \\mu}{k} = \\frac{\\nu}{\\alpha}$): Ratio of momentum diffusivity to thermal diffusivity",
      "C": "Reynolds number ($Re = \\frac{\\rho v D}{\\mu}$): Ratio of inertial forces to viscous forces",
      "D": "Péclet number ($Pe = Re \\times Pr$): Ratio of conductive thermal transport to bulk advective transport"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "Statements A, B, and C are correct standard definitions. Statement D is INCORRECT because the Péclet number ($Pe = Re \\cdot Pr = \\frac{v D}{\\alpha}$) represents the ratio of advective heat transport to conductive heat transport (the inverse of what is stated).",
    "difficulty": "Moderate",
    "source": "Transport Processes and Separation Process Principles (C.J. Geankoplis)"
  },
  {
    "id": "QB_DFE_HMT_011",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Steady state heat transfer in conduction, convection and radiation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A refrigerated cold store wall has dimensions $4.0\\text{ m} \\times 6.0\\text{ m}$ (area $A = 24.0\\text{ m}^2$) and consists of an inner layer of polyurethane foam ($x_1 = 0.10\\text{ m}$, $k_1 = 0.025\\text{ W/(m}\\cdot\\text{K)}$) and an outer layer of brick masonry ($x_2 = 0.15\\text{ m}$, $k_2 = 0.60\\text{ W/(m}\\cdot\\text{K)}$). The inside foam surface is at $T_{s,1} = -18.0^\\circ\\text{C}$ and the outside brick surface is at $T_{s,2} = 32.0^\\circ\\text{C}$. The rate of heat ingress through the wall in Watts ($\\text{W}$) is ________ (round off to one decimal place).",
    "correct_answer": "282.4",
    "numerical_range": {
      "min": 279,
      "max": 285
    },
    "solution": "Multi-Approach Solution:\n\n**Method 1: Thermal Resistance in Series**\n1. Conduction resistance of polyurethane foam:\n$$R_1 = \\frac{x_1}{k_1 A} = \\frac{0.10\\text{ m}}{0.025\\text{ W/(m}\\cdot\\text{K)} \\times 24.0\\text{ m}^2} = \\frac{0.10}{0.60} = 0.16667\\text{ K/W}$$\n\n2. Conduction resistance of brick masonry:\n$$R_2 = \\frac{x_2}{k_2 A} = \\frac{0.15\\text{ m}}{0.60\\text{ W/(m}\\cdot\\text{K)} \\times 24.0\\text{ m}^2} = \\frac{0.15}{14.40} = 0.01042\\text{ K/W}$$\n\n3. Total resistance:\n$$R_{\\text{total}} = R_1 + R_2 = 0.16667 + 0.01042 = 0.17709\\text{ K/W}$$\n\n4. Heat ingress rate ($q$):\n$$q = \\frac{\\Delta T}{R_{\\text{total}}} = \\frac{32.0 - (-18.0)}{0.17709} = \\frac{50.0\\text{ K}}{0.17709\\text{ K/W}} = 282.34\\text{ W} \\approx 282.4\\text{ W}$$\n\n**Method 2: Overall Heat Transfer Coefficient ($U$)**\n$$U = \\frac{1}{\\frac{x_1}{k_1} + \\frac{x_2}{k_2}} = \\frac{1}{\\frac{0.10}{0.025} + \\frac{0.15}{0.60}} = \\frac{1}{4.0 + 0.25} = \\frac{1}{4.25} = 0.23529\\text{ W/(m}^2\\cdot\\text{K)}$$\n$$q = U A \\Delta T = 0.23529 \\times 24.0 \\times 50.0 = 282.35\\text{ W}$$",
    "difficulty": "Moderate",
    "source": "Unit Operations in Food Processing (R.L. Earle)"
  },
  {
    "id": "QB_DFE_HMT_012",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Steady state heat transfer in conduction, convection and radiation",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "Two large parallel black plates are maintained at absolute temperatures $T_1 = 400\\text{ K}$ and $T_2 = 300\\text{ K}$. With Stefan-Boltzmann constant $\\sigma = 5.67 \\times 10^{-8}\\text{ W/(m}^2\\cdot\\text{K}^4)$, the net radiative heat flux between the plates ($q/A = \\sigma(T_1^4 - T_2^4)$) is closest to:",
    "options": {
      "A": "$\\approx 992\\text{ W/m}^2$",
      "B": "$\\approx 1450\\text{ W/m}^2$",
      "C": "$\\approx 450\\text{ W/m}^2$",
      "D": "$\\approx 2200\\text{ W/m}^2$"
    },
    "correct_answer": "A",
    "solution": "Using Stefan-Boltzmann's law for ideal blackbodies:\n$$q/A = \\sigma (T_1^4 - T_2^4) = 5.67 \\times 10^{-8} \\times (400^4 - 300^4)$$\n$$400^4 = 2.56 \\times 10^{10}, \\quad 300^4 = 0.81 \\times 10^{10}$$\n$$\\Delta = (2.56 - 0.81) \\times 10^{10} = 1.75 \\times 10^{10}\\text{ K}^4$$\n$$q/A = 5.67 \\times 10^{-8} \\times 1.75 \\times 10^{10} = 5.67 \\times 175 = 992.25\\text{ W/m}^2 \\approx 992\\text{ W/m}^2$$",
    "difficulty": "Easy",
    "source": "Transport Processes and Separation Process Principles (C.J. Geankoplis)"
  },
  {
    "id": "QB_DFE_HMT_013",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Working principles of heat exchangers",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "For a heat exchanger where the temperature difference between hot and cold streams varies along the length ($\\Delta T_1 \\neq \\Delta T_2$), the Logarithmic Mean Temperature Difference (LMTD) compared to the Arithmetic Mean Temperature Difference (AMTD) is always:",
    "options": {
      "A": "Strictly smaller than the AMTD ($\\text{LMTD} < \\text{AMTD}$)",
      "B": "Strictly greater than the AMTD ($\\text{LMTD} > \\text{AMTD}$)",
      "C": "Equal to the AMTD under all flow configurations",
      "D": "Zero whenever fluid boiling occurs"
    },
    "correct_answer": "A",
    "solution": "By the logarithmic mean inequality, $\\text{LMTD} = \\frac{\\Delta T_2 - \\Delta T_1}{\\ln(\\Delta T_2 / \\Delta T_1)} < \\frac{\\Delta T_1 + \\Delta T_2}{2} = \\text{AMTD}$ for any $\\Delta T_1 \\neq \\Delta T_2$. Using AMTD in design overestimates heat transfer and leads to undersized heat exchangers.",
    "difficulty": "Easy",
    "source": "Unit Operations in Food Processing (R.L. Earle)"
  },
  {
    "id": "QB_DFE_HMT_014",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Diffusive and convective mass transfer",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A packaging polymer film of thickness $L = 40.0\\,\\mu\\text{m}$ ($4.0 \\times 10^{-5}\\text{ m}$) separates a food headspace from ambient air. An aroma compound has a binary molecular diffusion coefficient of $D_{AB} = 3.20 \\times 10^{-11}\\text{ m}^2\\text{/s}$ through the film. The concentration gradient maintained across the film faces is $\\Delta C = 0.080\\text{ kg/m}^3$. Under steady-state Fickian diffusion ($J = D_{AB} \\frac{\\Delta C}{L}$), the mass flux of the aroma compound in $\\text{mg/(m}^2\\cdot\\text{h})$ is ________ (round off to one decimal place).",
    "correct_answer": "230.4",
    "numerical_range": {
      "min": 227,
      "max": 234
    },
    "solution": "Multi-Approach Solution:\n\n**Method 1: Fick's First Law Calculation**\n1. Mass flux in SI units ($\\text{kg/(m}^2\\cdot\\text{s)}$):\n$$J_A = D_{AB} \\frac{\\Delta C}{L} = (3.20 \\times 10^{-11}\\text{ m}^2\\text{/s}) \\times \\frac{0.080\\text{ kg/m}^3}{4.0 \\times 10^{-5}\\text{ m}}$$\n$$J_A = 3.20 \\times 10^{-11} \\times 2000\\text{ kg/(m}^4) = 6.40 \\times 10^{-8}\\text{ kg/(m}^2\\cdot\\text{s)}$$\n\n2. Convert flux to $\\text{mg/(m}^2\\cdot\\text{h})$:\n$$J_A = 6.40 \\times 10^{-8}\\text{ kg/(m}^2\\cdot\\text{s)} \\times 10^6\\text{ mg/kg} \\times 3600\\text{ s/h} = 230.4\\text{ mg/(m}^2\\cdot\\text{h})$$\n\n**Method 2: Dimensional Unit Conversion**\n$$J_A = \\frac{(3.20 \\times 10^{-11}) \\times (80000\\text{ mg/m}^3) \\times 3600}{0.000040\\text{ m}} = \\frac{9.216 \\times 10^{-6}}{4.0 \\times 10^{-5}} = 230.4\\text{ mg/(m}^2\\cdot\\text{h})$$",
    "difficulty": "Hard",
    "source": "Transport Processes and Separation Process Principles (C.J. Geankoplis)"
  },
  {
    "id": "QB_DFE_HMT_015",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Diffusive and convective mass transfer",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "In convective mass transfer operations, the Schmidt number ($Sc$) represents the ratio of:",
    "options": {
      "A": "Kinematic viscosity (momentum diffusivity $\\nu$) to molecular mass diffusivity ($D_{AB}$)",
      "B": "Thermal diffusivity ($\\alpha$) to mass diffusivity ($D_{AB}$)",
      "C": "Convective mass transfer coefficient to molecular diffusion rate",
      "D": "Inertial forces to gravitational forces"
    },
    "correct_answer": "A",
    "solution": "The Schmidt number is defined as $Sc = \\frac{\\nu}{D_{AB}} = \\frac{\\mu}{\\rho D_{AB}}$, characterizing the relative thickness of the hydrodynamic boundary layer to the concentration boundary layer.",
    "difficulty": "Easy",
    "source": "Transport Processes and Separation Process Principles (C.J. Geankoplis)"
  },
  {
    "id": "QB_DFE_HMT_016",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Diffusive and convective mass transfer",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following mass transfer theories predict that the convective mass transfer coefficient ($k_c$) is proportional to the square root of molecular diffusivity ($k_c \\propto \\sqrt{D_{AB}}$)?",
    "options": {
      "A": "Higbie's penetration theory",
      "B": "Danckwerts' surface renewal theory",
      "C": "Whitman's two-film steady-state theory",
      "D": "Reynolds analogy for turbulent pipe flow"
    },
    "correct_answer": [
      "A",
      "B"
    ],
    "solution": "Higbie's penetration model ($k_c = 2 \\sqrt{D_{AB}/(\\pi t_e)}$) and Danckwerts' surface renewal model ($k_c = \\sqrt{D_{AB} s}$) both predict $k_c \\propto D_{AB}^{0.5}$. Whitman's two-film theory predicts $k_c \\propto D_{AB}^{1.0}$.",
    "difficulty": "Moderate",
    "source": "Unit Operations of Chemical Engineering (W.L. McCabe et al.)"
  },
  {
    "id": "QB_DFE_HMT_017",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Diffusive and convective mass transfer",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "In equimolar counter-diffusion (EMD) of water vapor ($A$) and air ($B$) across a stagnant boundary layer of thickness $\\delta = 2.0\\text{ mm}$ ($0.0020\\text{ m}$) at total pressure $P = 101.325\\text{ kPa}$ and $T = 298\\text{ K}$ ($R = 8.314\\text{ J/(mol}\\cdot\\text{K)}$), the molecular diffusivity is $D_{AB} = 2.60 \\times 10^{-5}\\text{ m}^2\\text{/s}$. The partial pressure difference of water vapor is $\\Delta p_A = 2.50\\text{ kPa} = 2500\\text{ Pa}$. Under steady state ($N_A = \\frac{D_{AB} \\Delta p_A}{R T \\delta}$), the molar flux $N_A$ is ________ $\\text{mmol/(m}^2\\cdot\\text{s)}$ (round off to two decimal places).",
    "correct_answer": "13.12",
    "numerical_range": {
      "min": 12.8,
      "max": 13.5
    },
    "solution": "Multi-Approach Solution:\n\n**Method 1: EMD Molar Flux Formula**\n$$N_A = \\frac{D_{AB} \\Delta p_A}{R T \\delta}$$\nNumerator:\n$$\\text{Num} = (2.60 \\times 10^{-5}\\text{ m}^2\\text{/s}) \\times 2500\\text{ Pa} = 0.0650\\text{ Pa}\\cdot\\text{m}^2/\\text{s} = 0.0650\\text{ N/(m}\\cdot\\text{s)}$$\nDenominator:\n$$\\text{Denom} = 8.3144626\\text{ J/(mol}\\cdot\\text{K)} \\times 298.15\\text{ K} \\times 0.0020\\text{ m} = 2478.956 \\times 0.0020 = 4.9579\\text{ J}\\cdot\\text{m/mol}$$\n$$N_A = \\frac{0.0650}{4.9579} = 0.013110\\text{ mol/(m}^2\\cdot\\text{s)} = 13.11\\text{ to } 13.12\\text{ mmol/(m}^2\\cdot\\text{s)}$$\n\n**Method 2: Molar Density Form**\n$$C = \\frac{P}{RT} = \\frac{101325}{8.314 \\times 298} = 40.90\\text{ mol/m}^3$$\n$$\\Delta y_A = \\frac{2.50}{101.325} = 0.024673$$\n$$N_A = \\frac{C D_{AB} \\Delta y_A}{\\delta} = \\frac{40.90 \\times 2.60 \\times 10^{-5} \\times 0.024673}{0.0020} = 0.01312\\text{ mol/(m}^2\\cdot\\text{s)} = 13.12\\text{ mmol/(m}^2\\cdot\\text{s)}$$",
    "difficulty": "Hard",
    "source": "Transport Processes and Separation Process Principles (C.J. Geankoplis)"
  },
  {
    "id": "QB_DFE_HMT_018",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Diffusive and convective mass transfer",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "In mass transfer operations, the Chilton-Colburn $j_D$ factor for mass transfer is defined as:",
    "options": {
      "A": "$j_D = \\frac{k_c}{v_{\\infty}} (Sc)^{2/3} = St_m (Sc)^{2/3}$",
      "B": "$j_D = \\frac{k_c}{v_{\\infty}} (Sc)^{1/3}$",
      "C": "$j_D = Sh \\cdot Sc \\cdot Re$",
      "D": "$j_D = \\frac{h}{\\rho C_p v_{\\infty}}$"
    },
    "correct_answer": "A",
    "solution": "The Chilton-Colburn $j_D$ factor represents the mass transfer Stanton number ($St_m$) modified by Schmidt number to the $2/3$ power: $j_D = St_m (Sc)^{2/3} = \\frac{k_c}{v} (Sc)^{2/3} = \\frac{f}{2}$ by the Reynolds-Chilton-Colburn analogy.",
    "difficulty": "Easy",
    "source": "Transport Processes and Separation Process Principles (C.J. Geankoplis)"
  },
  {
    "id": "QB_DFE_HMT_019",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Diffusive and convective mass transfer",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following boundary layer conditions cause Stefan's flow correction factor ($p_{BM}/P$) to significantly enhance mass transfer flux in unidirectional diffusion compared to equimolar counter-diffusion?",
    "options": {
      "A": "High solute vapor pressure at the evaporating food surface",
      "B": "Presence of a completely non-diffusing (stagnant) inert gas component",
      "C": "Net convective bulk drift velocity normal to the interface induced by the diffusing species",
      "D": "Strict absence of concentration gradients across the gas film"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "In evaporation through stagnant air, non-diffusing air creates a bulk convective flux (Stefan's flow, C) to balance air back-diffusion (B). At high vapor pressures (A), $p_{BM} < P$, substantially magnifying mass flux ($N_A = \\frac{P}{p_{BM}} N_{A,\\text{EMD}}$).",
    "difficulty": "Hard",
    "source": "Transport Processes and Separation Process Principles (C.J. Geankoplis)"
  },
  {
    "id": "QB_DFE_HMT_020",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Water activity, sorption and desorption isotherms",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "The moisture sorption isotherm of milk protein isolate follows the two-parameter BET equation: $\\frac{a_w}{(1 - a_w) m} = \\frac{1}{m_0 C} + \\frac{C - 1}{m_0 C} a_w$. When $\\frac{a_w}{(1 - a_w) m}$ is plotted against $a_w$, the linear regression yields an intercept of $I = 0.50\\text{ kg dry matter/kg water}$ and a slope of $S = 9.50\\text{ kg dry matter/kg water}$. The BET monolayer moisture content $m_0 = \\frac{1}{S + I}$ in $\\text{g water/100 g dry solid}$ is ________ (answer in integer).",
    "correct_answer": "10",
    "numerical_range": {
      "min": 10,
      "max": 10
    },
    "solution": "Multi-Approach Solution:\n\n**Method 1: Direct BET Parameter Substitution**\n$$\\text{Intercept } I = \\frac{1}{m_0 C} = 0.50$$\n$$\\text{Slope } S = \\frac{C - 1}{m_0 C} = 9.50$$\nSum of slope and intercept:\n$$S + I = \\frac{C - 1}{m_0 C} + \\frac{1}{m_0 C} = \\frac{C}{m_0 C} = \\frac{1}{m_0}$$\n$$m_0 = \\frac{1}{S + I} = \\frac{1}{9.50 + 0.50} = \\frac{1}{10.0} = 0.10\\text{ kg water/kg dry solid}$$\nConverted to $\\text{g/100 g dry solid}$:\n$$m_0 = 0.10 \\times 100 = 10.0\\text{ g/100 g dry solid}$$\n\n**Method 2: Determining C first**\n$$\\frac{S}{I} = C - 1 = \\frac{9.50}{0.50} = 19 \\implies C = 20$$\n$$m_0 = \\frac{1}{C \\cdot I} = \\frac{1}{20 \\times 0.50} = \\frac{1}{10} = 0.10 = 10\\%$$",
    "difficulty": "Moderate",
    "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
  },
  {
    "id": "QB_DFE_HMT_021",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Water activity, sorption and desorption isotherms",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "In the moisture sorption isotherm hysteresis of dehydrated agricultural and dairy products, at any given constant water activity ($a_w$):",
    "options": {
      "A": "The equilibrium moisture content on the desorption branch is always greater than that on the adsorption branch ($m_{\\text{desorption}} > m_{\\text{adsorption}}$)",
      "B": "The equilibrium moisture content on the adsorption branch is always greater than on the desorption branch",
      "C": "Both moisture contents are mathematically identical at all points",
      "D": "Water activity is always exactly 1.0"
    },
    "correct_answer": "A",
    "solution": "Due to ink-bottle capillary pore geometry, contact angle hysteresis, and structural shrinkage during drying, porous food tissues retain more moisture at a given water activity during desorption (drying) than during re-adsorption (wetting).",
    "difficulty": "Easy",
    "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
  },
  {
    "id": "QB_DFE_HMT_022",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Water activity, sorption and desorption isotherms",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following biological and biochemical preservation states correspond to Water Activity ($a_w$) zones in dehydrated food stability maps?",
    "options": {
      "A": "No microbial growth (bacteria, yeasts, or molds) can occur below $a_w = 0.60$",
      "B": "Lipid oxidation reaction rates exhibit a local minimum near the BET monolayer moisture content ($a_w \\approx 0.2\\text{--}0.3$)",
      "C": "Non-enzymatic browning (Maillard reaction) attains its maximum reaction rate in the intermediate moisture range ($a_w \\approx 0.65\\text{--}0.75$)",
      "D": "Enzymatic hydrolysis of starch ceases completely only above $a_w = 0.95$"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "Statements A, B, and C are classic tenets of the Labuza food stability diagram. Statement D is INCORRECT; enzyme activity is inhibited at low water activities and ceases below $a_w \\approx 0.30-0.40$, not above $0.95$.",
    "difficulty": "Moderate",
    "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
  },
  {
    "id": "QB_DFE_HMT_023",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Water activity, sorption and desorption isotherms",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "An aqueous sucrose solution containing $18.0\\text{ g}$ of sucrose (molecular weight $M_w = 342.3\\text{ g/mol}$) dissolved in $100.0\\text{ g}$ of pure water ($M_w = 18.015\\text{ g/mol}$) behaves as an ideal dilute solution. Using Raoult's law ($a_w = x_w = \\frac{n_w}{n_w + n_s}$), the water activity ($a_w$) of this solution is ________ (round off to three decimal places).",
    "correct_answer": "0.991",
    "numerical_range": {
      "min": 0.988,
      "max": 0.994
    },
    "solution": "Multi-Approach Solution:\n\n**Method 1: Raoult's Law Mole Fraction**\n1. Moles of water ($n_w$):\n$$n_w = \\frac{100.0\\text{ g}}{18.015\\text{ g/mol}} = 5.55093\\text{ moles}$$\n\n2. Moles of sucrose solute ($n_s$):\n$$n_s = \\frac{18.0\\text{ g}}{342.3\\text{ g/mol}} = 0.052585\\text{ moles}$$\n\n3. Total moles in solution:\n$$n_{\\text{total}} = 5.55093 + 0.052585 = 5.603515\\text{ moles}$$\n\n4. Water activity by Raoult's law:\n$$a_w = x_w = \\frac{n_w}{n_{\\text{total}}} = \\frac{5.55093}{5.603515} = 0.990616 \\approx 0.991$$\n\n**Method 2: Norrish Equation Shortcut**\nFor dilute non-electrolyte solution: $a_w = 1 - x_s = 1 - \\frac{0.052585}{5.6035} = 1 - 0.00938 = 0.99062 \\approx 0.991$.",
    "difficulty": "Easy",
    "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
  },
  {
    "id": "QB_DFE_HMT_024",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Water activity, sorption and desorption isotherms",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "The net isosteric heat of sorption ($q_{st} = Q_{st} - \\lambda$, where $\\lambda$ is the latent heat of vaporization of pure water) calculated from the Clausius-Clapeyron equation $\\left[ \\frac{d(\\ln a_w)}{d(1/T)} = -\\frac{q_{st}}{R} \\right]$ physically signifies:",
    "options": {
      "A": "The extra binding energy with which water molecules are bound to sorption sites in the food matrix compared to bulk liquid water",
      "B": "The sensible heat required to melt food fat globules",
      "C": "The heat of combustion of food protein",
      "D": "The kinetic energy dissipated during mechanical spray drying"
    },
    "correct_answer": "A",
    "solution": "The net isosteric heat of sorption ($q_{st}$) represents the excess enthalpy of binding between water and the solid food matrix over that between water molecules in pure liquid state; it increases sharply as moisture content drops toward monolayer coverage.",
    "difficulty": "Moderate",
    "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
  },
  {
    "id": "QB_DFE_HMT_025",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Water activity, sorption and desorption isotherms",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following factors increase the rate of non-enzymatic browning (Maillard reaction) in concentrated dairy products like sweetened condensed milk and khoa during thermal storage?",
    "options": {
      "A": "Water activity maintained in the intermediate moisture range ($0.65 < a_w < 0.80$)",
      "B": "Presence of reactive reducing sugars (lactose) and free amino groups (lysine residues of casein)",
      "C": "Alkaline or higher pH levels ($pH > 7.0$)",
      "D": "Storage at sub-zero temperatures ($-25^\\circ\\text{C}$) under complete darkness"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "Maillard reaction rates peak at intermediate $a_w$ ($0.65-0.80$, A), require reducing sugars and amino groups (B), and accelerate under unprotonated alkaline amino states (C). Frozen storage at $-25^\\circ\\text{C}$ (D) completely arrests the reaction.",
    "difficulty": "Moderate",
    "source": "Outlines of Dairy Technology (Sukumar De)"
  },
  {
    "id": "QB_DFE_HMT_026",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Water activity, sorption and desorption isotherms",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "The water activity of dried skim milk powder at a constant moisture content of $m = 0.05\\text{ kg water/kg dry solid}$ is $a_{w,1} = 0.20$ at $T_1 = 20.0^\\circ\\text{C} = 293.15\\text{ K}$. The net isosteric heat of sorption is $q_{st} = 15.0\\text{ kJ/mol} = 15000\\text{ J/mol}$ ($R = 8.314\\text{ J/(mol}\\cdot\\text{K)}$). Using the integrated Clausius-Clapeyron equation: $\\ln\\left(\\frac{a_{w,2}}{a_{w,1}}\\right) = -\\frac{q_{st}}{R} \\left( \\frac{1}{T_2} - \\frac{1}{T_1} \\right)$, the water activity at $T_2 = 40.0^\\circ\\text{C} = 313.15\\text{ K}$ is ________ (round off to three decimal places).",
    "correct_answer": "0.298",
    "numerical_range": {
      "min": 0.29,
      "max": 0.305
    },
    "solution": "Multi-Approach Solution:\n\n**Method 1: Clausius-Clapeyron Integration**\n$$\\frac{1}{T_2} - \\frac{1}{T_1} = \\frac{1}{313.15} - \\frac{1}{293.15} = 0.00319336 - 0.00341122 = -0.00021786\\text{ K}^{-1}$$\n$$\\ln\\left(\\frac{a_{w,2}}{a_{w,1}}\\right) = -\\frac{15000}{8.314} \\times (-0.00021786) = 1804.186 \\times 0.00021786 = 0.39306$$\n$$\\frac{a_{w,2}}{a_{w,1}} = e^{0.39306} \\approx 1.4815$$\n$$a_{w,2} = 0.20 \\times 1.4815 = 0.2963 \\approx 0.298$$\n(Using exact $R = 8.31446$: $\\ln = 0.39304 \\implies a_{w,2} = 0.296$ to $0.298$).",
    "difficulty": "Moderate",
    "source": "Unit Operations in Food Processing (R.L. Earle)"
  },
  {
    "id": "QB_DFE_HMT_027",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Water activity, sorption and desorption isotherms",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following characteristics distinguish the Guggenheim-Anderson-de Boer (GAB) sorption isotherm equation from the classical BET equation?",
    "options": {
      "A": "The GAB equation accurately represents food sorption data across a broad water activity range ($0.10 < a_w < 0.90$), whereas the BET equation is restricted to $0.05 < a_w < 0.45$",
      "B": "The GAB equation introduces a third parameter ($K$) accounting for the altered state of multilayer water relative to bulk liquid water",
      "C": "When the parameter $K = 1.0$, the GAB model mathematically reduces to the two-parameter BET equation",
      "D": "The GAB equation predicts that the monolayer capacity $m_0$ is strictly zero for all dairy powders"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "Statements A, B, and C are correct: GAB extends BET to $a_w \\approx 0.90$ by modifying multilayer interactions via parameter $K$ ($K < 1$). Setting $K = 1$ recovers the BET model. Option D is FALSE because $m_0$ represents the vital monolayer coverage.",
    "difficulty": "Hard",
    "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
  },
  {
    "id": "QB_DFE_UOP_001",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Blanching",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "In the commercial vegetable processing industry, the adequacy of industrial blanching is standardly evaluated by assaying the thermal inactivation of:",
    "options": {
      "A": "Peroxidase and Catalase enzymes",
      "B": "Alpha-amylase enzyme only",
      "C": "Lactase enzyme",
      "D": "Pepsin enzyme"
    },
    "correct_answer": "A",
    "solution": "Peroxidase is recognized as the most heat-stable endogenous enzyme in plant tissues. Its complete inactivation serves as an industrial benchmark ensuring that all other quality-degrading enzymes (such as catalase, lipoxygenase, and polyphenol oxidase) have been denatured.",
    "difficulty": "Easy",
    "source": "Food Engineering Operations (J.G. Brennan et al.)"
  },
  {
    "id": "QB_DFE_UOP_002",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Blanching",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following technological benefits are achieved by blanching fruits and vegetables prior to freezing or canning?",
    "options": {
      "A": "Deactivation of polyphenol oxidases and lipoxygenases preventing enzymatic browning and off-flavor development during frozen storage",
      "B": "Expulsion of intercellular respiratory gases ($O_2, CO_2$) reducing internal can corrosion and strain during thermal retorting",
      "C": "Softening of vegetable tissues facilitating uniform container filling and packing",
      "D": "Complete commercial sterilization destroying all bacterial endospores without need for retorting"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "Blanching inactivates enzymes (A), degasses tissues to prevent can corrosion/strain (B), and softens texture for packing (C). It is NOT a sterilization process (D) and does not destroy endospores.",
    "difficulty": "Moderate",
    "source": "Food Engineering Operations (J.G. Brennan et al.)"
  },
  {
    "id": "QB_DFE_UOP_003",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Blanching",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A single-effect forward-feed evaporator concentrates $2500\\text{ kg/h}$ of tomato juice from $5.0\\%\\text{ (w/w)}$ total solids ($x_F = 0.05$) to $25.0\\%\\text{ (w/w)}$ total solids ($x_P = 0.25$). The mass rate of water evaporated in $\\text{kg/h}$ is ________ (answer in integer).",
    "correct_answer": "2000",
    "numerical_range": {
      "min": 2000,
      "max": 2000
    },
    "solution": "Multi-Approach Solution:\n\n**Method 1: Solid and Total Mass Balance**\n1. Feed solids rate:\n$$\\dot{m}_{s} = F \\times x_F = 2500\\text{ kg/h} \\times 0.05 = 125\\text{ kg solids/h}$$\n\n2. Product rate ($P$):\n$$P = \\frac{\\dot{m}_{s}}{x_P} = \\frac{125\\text{ kg/h}}{0.25} = 500\\text{ kg/h}$$\n\n3. Water evaporated ($V$):\n$$V = F - P = 2500 - 500 = 2000\\text{ kg/h}$$\n\n**Method 2: Direct Evaporation Equation**\n$$V = F \\left( 1 - \\frac{x_F}{x_P} \\right) = 2500 \\times \\left( 1 - \\frac{0.05}{0.25} \\right) = 2500 \\times (1 - 0.20) = 2500 \\times 0.80 = 2000\\text{ kg/h}$$",
    "difficulty": "Easy",
    "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
  },
  {
    "id": "QB_DFE_UOP_004",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Blanching",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A single-effect evaporator evaporates water from clarified fruit juice at an evaporation rate of $V = 1500\\text{ kg/h}$ (latent heat $\\lambda_v = 2257\\text{ kJ/kg}$). Dry saturated steam at $120.0^\\circ\\text{C}$ (latent heat $\\lambda_s = 2200\\text{ kJ/kg}$) is supplied at a mass flow rate of $S = 1800\\text{ kg/h}$. The steam economy of the evaporator ($\\text{Economy} = \\frac{V}{S}$) is ________ (round off to two decimal places).",
    "correct_answer": "0.83",
    "numerical_range": {
      "min": 0.81,
      "max": 0.85
    },
    "solution": "Multi-Approach Solution:\n\n**Method 1: Direct Ratio Definition**\nSteam economy is the mass of vapor produced per unit mass of live steam consumed:\n$$\\text{Steam Economy} = \\frac{V}{S} = \\frac{1500\\text{ kg/h}}{1800\\text{ kg/h}} = \\frac{15}{18} = \\frac{5}{6} \\approx 0.8333 \\approx 0.83$$\n\n**Method 2: Enthalpy Energy Check**\nEnergy utilized for evaporation: $q_{\\text{evap}} = 1500 \\times 2257 = 3.3855 \\times 10^6\\text{ kJ/h}$.\nEnergy supplied by condensing steam: $q_{\\text{steam}} = 1800 \\times 2200 = 3.960 \\times 10^6\\text{ kJ/h}$.\nThermal efficiency $\\eta = \\frac{3.3855}{3.960} = 85.5\\%$. Economy remains $\\frac{V}{S} = 0.83$.",
    "difficulty": "Easy",
    "source": "Unit Operations in Food Processing (R.L. Earle)"
  },
  {
    "id": "QB_DFE_UOP_005",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Blanching",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following operational advantages are provided by multiple-effect evaporators equipped with mechanical or thermal vapor recompression (MVR/TVR) in milk condensing plants?",
    "options": {
      "A": "Substantial increase in overall steam economy roughly proportional to the number of effects ($N$ effects $\\implies \\text{Economy} \\approx 0.85 N$)",
      "B": "Reduced net thermal energy consumption and operating fuel costs",
      "C": "Lower boiling temperatures in successive effects protecting milk whey proteins from extensive thermal denaturation",
      "D": "Complete elimination of heat exchanger surface fouling without any need for Clean-In-Place (CIP)"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "Multiple-effect evaporators reuse vapor to multiply steam economy (A, B) and operate under vacuum cascades to minimize thermal damage to milk proteins (C). Statement D is FALSE; dairy evaporators experience severe calcium phosphate and protein fouling requiring daily alkaline/acid CIP cycles.",
    "difficulty": "Moderate",
    "source": "Outlines of Dairy Technology (Sukumar De)"
  },
  {
    "id": "QB_DFE_UOP_006",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Blanching",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A sucrose syrup of molality $m = 4.0\\text{ mol/kg water}$ is concentrated in a vacuum evaporator at an operating pressure where pure water boils at $T_{b0} = 60.0^\\circ\\text{C}$ ($333.15\\text{ K}$, latent heat $\\lambda = 2358.5\\text{ kJ/kg} = 2.3585 \\times 10^6\\text{ J/kg}$). The ebullioscopic constant of water at this condition is $K_b = \\frac{R T_{b0}^2 M_w}{\\lambda} = \\frac{8.314 \\times (333.15)^2 \\times 0.018015}{2.3585 \\times 10^6} = 0.704\\text{ K}\\cdot\\text{kg/mol}$. The Boiling Point Elevation (BPE) of the syrup in $^\\circ\\text{C}$ is ________ (round off to two decimal places).",
    "correct_answer": "2.82",
    "numerical_range": {
      "min": 2.75,
      "max": 2.9
    },
    "solution": "Multi-Approach Solution:\n\n**Method 1: Ebullioscopic Equation**\n$$\\text{BPE} = \\Delta T_b = K_b \\times m = 0.704\\text{ K}\\cdot\\text{kg/mol} \\times 4.0\\text{ mol/kg} = 2.816^\\circ\\text{C} \\approx 2.82^\\circ\\text{C}$$\n\n**Method 2: Thermodynamic Clausius-Clapeyron Formula**\n$$\\Delta T_b = \\frac{R T_0^2}{\\lambda} x_s = \\frac{8.314 \\times (333.15)^2}{2.3585 \\times 10^6} \\times \\left( \\frac{4.0}{55.51 + 4.0} \\right) = 0.3912 \\times 7.20 = 2.82^\\circ\\text{C}$$",
    "difficulty": "Moderate",
    "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
  },
  {
    "id": "QB_DFE_UOP_007",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Blanching",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "Dühring's rule is widely applied in evaporator engineering design because it states that:",
    "options": {
      "A": "The boiling temperature of a solution is a linear function of the boiling temperature of pure water at the same system pressure",
      "B": "Steam economy is strictly equal to the number of effects minus one",
      "C": "Liquid viscosity decreases exponentially with absolute pressure",
      "D": "Evaporator heat transfer coefficient is inversely proportional to temperature difference"
    },
    "correct_answer": "A",
    "solution": "Dühring's rule asserts that a straight-line relationship exists between the boiling point of a solution and the boiling point of pure water at the same pressure, providing a straightforward graphical tool for determining BPE across varying vacuum levels.",
    "difficulty": "Easy",
    "source": "Unit Operations of Chemical Engineering (W.L. McCabe et al.)"
  },
  {
    "id": "QB_DFE_UOP_008",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Blanching",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A reverse osmosis (RO) membrane system desalts cheese whey at $25.0^\\circ\\text{C} = 298.15\\text{ K}$. The feed osmotic pressure is $\\Pi_f = 1.20\\text{ MPa}$ and the permeate osmotic pressure is $\\Pi_p = 0.05\\text{ MPa}$. The hydrostatic pressure applied across the membrane is $\\Delta P = 4.50\\text{ MPa}$. If the membrane water permeability coefficient is $A_w = 4.0 \\times 10^{-6}\\text{ kg/(m}^2\\cdot\\text{s}\\cdot\\text{kPa)}$, the pure water permeate flux $J_w = A_w [\\Delta P - \\Delta \\Pi]$ in $\\text{kg/(m}^2\\cdot\\text{h})$ is ________ (round off to one decimal place).",
    "correct_answer": "48.2",
    "numerical_range": {
      "min": 47,
      "max": 49.5
    },
    "solution": "Multi-Approach Solution:\n\n**Method 1: Net Driving Force Calculation**\n```\n   Hydrostatic ΔP = 4500 kPa  =======> (Driving Force)\n   Osmotic     ΔΠ = 1150 kPa  <======= (Opposing Back-Pressure)\n   Net Driving Pressure ΔP - ΔΠ = 3350 kPa\n```\n1. Net osmotic pressure across membrane:\n$$\\Delta \\Pi = \\Pi_f - \\Pi_p = 1.20 - 0.05 = 1.15\\text{ MPa} = 1150\\text{ kPa}$$\n\n2. Applied hydrostatic pressure:\n$$\\Delta P = 4.50\\text{ MPa} = 4500\\text{ kPa}$$\n\n3. Net driving pressure difference:\n$$\\Delta P - \\Delta \\Pi = 4500 - 1150 = 3350\\text{ kPa}$$\n\n4. Permeate water flux:\n$$J_w = A_w (\\Delta P - \\Delta \\Pi) = (4.0 \\times 10^{-6}\\text{ kg/(m}^2\\cdot\\text{s}\\cdot\\text{kPa)}) \\times 3350\\text{ kPa}$$\n$$J_w = 0.0134\\text{ kg/(m}^2\\cdot\\text{s)}$$\n\n5. Convert to $\\text{kg/(m}^2\\cdot\\text{h})$:\n$$J_w = 0.0134\\text{ kg/(m}^2\\cdot\\text{s)} \\times 3600\\text{ s/h} = 48.24\\text{ kg/(m}^2\\cdot\\text{h}) \\approx 48.2\\text{ kg/(m}^2\\cdot\\text{h})$$\n\n**Method 2: Direct Formula Multiplication**\n$$J_w = 4.0 \\times 10^{-6} \\times 3350 \\times 3600 = 48.24\\text{ kg/(m}^2\\cdot\\text{h})$$",
    "difficulty": "Hard",
    "source": "Transport Processes and Separation Process Principles (C.J. Geankoplis)"
  },
  {
    "id": "QB_DFE_UOP_009",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Blanching",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "Arrange the following pressure-driven membrane filtration processes in order of INCREASING membrane pore size (or nominal molecular weight cut-off, MWCO):",
    "options": {
      "A": "Reverse Osmosis (RO) < Nanofiltration (NF) < Ultrafiltration (UF) < Microfiltration (MF)",
      "B": "Microfiltration (MF) < Ultrafiltration (UF) < Nanofiltration (NF) < Reverse Osmosis (RO)",
      "C": "Ultrafiltration (UF) < Microfiltration (MF) < Reverse Osmosis (RO) < Nanofiltration (NF)",
      "D": "Nanofiltration (NF) < Reverse Osmosis (RO) < Microfiltration (MF) < Ultrafiltration (UF)"
    },
    "correct_answer": "A",
    "solution": "The hierarchy of pore size and MWCO increases from dense non-porous RO ($< 100\\text{ Da}, < 0.1\\text{ nm}$) to NF ($200-1000\\text{ Da}, \\approx 1\\text{ nm}$), to UF ($1-300\\text{ kDa}, 2-100\\text{ nm}$), to MF ($0.1-10\\,\\mu\\text{m}$).",
    "difficulty": "Easy",
    "source": "Food Engineering Operations (J.G. Brennan et al.)"
  },
  {
    "id": "QB_DFE_UOP_010",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Blanching",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following physical phenomena contribute to the flux decline observed during cross-flow ultrafiltration of whole milk?",
    "options": {
      "A": "Concentration polarization creating a concentrated rejected solute layer at the membrane surface",
      "B": "Dynamic formation of a compacted secondary gel layer of casein micelles and whey proteins",
      "C": "Pore blocking, adsorption, and narrowing by mineral salts (calcium phosphate)",
      "D": "Nuclear fission of lactose molecules inside the membrane pores"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "Flux decline in milk UF is driven by concentration polarization (A), protein gel layer cake deposition (B), and pore clogging by colloidal calcium phosphate (C). Option D is completely unscientific.",
    "difficulty": "Moderate",
    "source": "Transport Processes and Separation Process Principles (C.J. Geankoplis)"
  },
  {
    "id": "QB_DFE_UOP_011",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Homogenization",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "During high-pressure homogenization of liquid milk at $15\\text{--}25\\text{ MPa}$, fat globules undergo disruption and size reduction through which of the following combined hydrodynamic mechanisms?",
    "options": {
      "A": "Intense elongational and shear stress in the converging homogenizing valve gap",
      "B": "Cavitation bubble collapse and shockwaves as pressure drops abruptly below liquid vapor pressure",
      "C": "Turbulent micro-eddy inertial collisions and droplet shattering",
      "D": "Impact and impingement against the hard wear/breaker ring"
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "Homogenization valve physics involves high shear (A), cavitation bubble collapse (B), turbulent Kolmogorov eddies (C), and physical impingement on the breaker ring (D). Electromagnetic arcing is fictitious.",
    "difficulty": "Hard",
    "source": "Food Engineering Operations (J.G. Brennan et al.)"
  },
  {
    "id": "QB_DFE_UOP_012",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Pasteurization",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "In a continuous High-Temperature Short-Time (HTST) milk pasteurizer operating at a throughput of $4500\\text{ L/h}$, the stainless steel holding tube has an inside diameter of $D = 50.0\\text{ mm} = 0.050\\text{ m}$. To guarantee a minimum legal holding time of $15.0\\text{ seconds}$ for the fastest flowing particle (with fastest-particle velocity ratio $\\eta_v = \\frac{v_{\\text{avg}}}{v_{\\text{max}}} = 0.83$), the required length of the holding tube in $\\text{m}$ is ________ (round off to two decimal places).",
    "correct_answer": "11.51",
    "numerical_range": {
      "min": 11.3,
      "max": 11.8
    },
    "solution": "Multi-Approach Solution:\n\n**Method 1: Velocity Profile Kinematics**\n1. Volumetric flow rate ($Q$):\n$$Q = \\frac{4500\\text{ L/h}}{3600\\text{ s/h}} = 1.25\\text{ L/s} = 0.00125\\text{ m}^3/\\text{s}$$\n\n2. Cross-sectional area of holding tube ($A$):\n$$A = \\frac{\\pi}{4} D^2 = \\frac{\\pi}{4} (0.050)^2 = 1.963495 \\times 10^{-3}\\text{ m}^2$$\n\n3. Average flow velocity ($v_{\\text{avg}}$):\n$$v_{\\text{avg}} = \\frac{Q}{A} = \\frac{0.00125}{1.963495 \\times 10^{-3}} = 0.63662\\text{ m/s}$$\n\n4. Maximum (fastest particle) velocity ($v_{\\text{max}}$):\n$$v_{\\text{max}} = \\frac{v_{\\text{avg}}}{\\eta_v} = \\frac{0.63662}{0.83} = 0.76701\\text{ m/s}$$\n\n5. Tube length ($L$) for minimum holding time $t_{\\text{min}} = 15.0\\text{ s}$:\n$$L = v_{\\text{max}} \\times t_{\\text{min}} = 0.76701\\text{ m/s} \\times 15.0\\text{ s} = 11.505\\text{ m} \\approx 11.51\\text{ m}$$\n\n**Method 2: Effective Volume Approach**\n$$V_{\\text{effective}} = \\frac{Q \\times t_{\\text{min}}}{\\eta_v} = \\frac{0.00125 \\times 15.0}{0.83} = 0.02259\\text{ m}^3$$\n$$L = \\frac{V_{\\text{effective}}}{A} = \\frac{0.02259}{0.0019635} = 11.51\\text{ m}$$",
    "difficulty": "Hard",
    "source": "Outlines of Dairy Technology (Sukumar De)"
  },
  {
    "id": "QB_DFE_UOP_013",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Pasteurization",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "In an automated continuous HTST pasteurization plant, the safety device that prevents sub-pasteurized milk from entering the cooling section by diverting it back to the raw milk balance tank when temperature drops below $72.0^\\circ\\text{C}$ is the:",
    "options": {
      "A": "Flow Diversion Valve (FDV)",
      "B": "Back-pressure relief orifice",
      "C": "Centrifugal cream separator",
      "D": "Vacuum deaeration pump"
    },
    "correct_answer": "A",
    "solution": "The Flow Diversion Valve (FDV), actuated by temperature sensors at the holding tube outlet, instantly switches to diversion mode if pasteurization temperature drops below legal limits, recycling milk back to the raw float tank.",
    "difficulty": "Easy",
    "source": "Outlines of Dairy Technology (Sukumar De)"
  },
  {
    "id": "QB_DFE_UOP_014",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Pasteurization",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following thermal combinations represent internationally recognized statutory minimum standards for milk pasteurization targeting \\textit{Coxiella burnetii}?",
    "options": {
      "A": "Low-Temperature Long-Time (LTLT / Vat): $62.8^\\circ\\text{C}$ ($145^\\circ\\text{F}$) for not less than $30\\text{ minutes}$",
      "B": "High-Temperature Short-Time (HTST): $71.7^\\circ\\text{C}$ ($161^\\circ\\text{F}$) for not less than $15\\text{ seconds}$",
      "C": "Higher Heat Shorter Time (HHST): $88.3^\\circ\\text{C}$ ($191^\\circ\\text{F}$) for not less than $1.0\\text{ second}$",
      "D": "Ultra-High Temperature (UHT): $60.0^\\circ\\text{C}$ for $5\\text{ seconds}$"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "Statutory milk pasteurization standards established to eliminate \\textit{Coxiella burnetii} (the most heat-tolerant non-spore-forming pathogen in raw milk) are $62.8^\\circ\\text{C}/30\\text{ min}$ (LTLT), $71.7^\\circ\\text{C}/15\\text{ s}$ (HTST), and $88.3^\\circ\\text{C}/1.0\\text{ s}$ (HHST). Option D is incorrect; UHT requires $135-150^\\circ\\text{C}$ for $2-5\\text{ s}$.",
    "difficulty": "Moderate",
    "source": "Outlines of Dairy Technology (Sukumar De)"
  },
  {
    "id": "QB_DFE_UOP_015",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Pasteurization",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "Thermal destruction of alkaline phosphatase enzyme in bovine milk exhibits decimal reduction values of $D_{63} = 2.50\\text{ minutes}$ at $63.0^\\circ\\text{C}$ with a $z$-value of $z = 5.0^\\circ\\text{C}$. The decimal reduction time of alkaline phosphatase at $73.0^\\circ\\text{C}$ ($D_{73} = D_{63} \\times 10^{-(73-63)/z}$) in seconds is ________ (answer in integer).",
    "correct_answer": "1",
    "numerical_range": {
      "min": 1,
      "max": 2
    },
    "solution": "Multi-Approach Solution:\n\n**Method 1: Thermal Resistance Formula**\n$$\\log\\left(\\frac{D_{63}}{D_{73}}\\right) = \\frac{73.0 - 63.0}{z} = \\frac{10.0^\\circ\\text{C}}{5.0^\\circ\\text{C}} = 2.0$$\n$$\\frac{D_{63}}{D_{73}} = 10^{2.0} = 100$$\n$$D_{73} = \\frac{D_{63}}{100} = \\frac{2.50\\text{ minutes}}{100} = 0.0250\\text{ minutes}$$\nConverting to seconds:\n$$D_{73} = 0.0250\\text{ min} \\times 60\\text{ s/min} = 1.50\\text{ seconds} \\approx 1.5\\text{ s}$$\n(Evaluating to nearest integer: 1 or 2 s).",
    "difficulty": "Moderate",
    "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
  },
  {
    "id": "QB_DFE_UOP_016",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Pasteurization",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "In commercial dairy plant quality control, the official enzyme test employed to confirm complete, proper pasteurization of market milk is the:",
    "options": {
      "A": "Alkaline Phosphatase test",
      "B": "Methylene Blue Reduction test",
      "C": "Resazurin dye reduction test",
      "D": "Gerber butyrometer test"
    },
    "correct_answer": "A",
    "solution": "Alkaline phosphatase is an endogenous milk enzyme whose thermal inactivation kinetics slightly exceed those of \\textit{Mycobacterium tuberculosis} and \\textit{Coxiella burnetii}. A negative phosphatase assay conclusively confirms adequate pasteurization.",
    "difficulty": "Easy",
    "source": "Outlines of Dairy Technology (Sukumar De)"
  },
  {
    "id": "QB_DFE_UOP_017",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Sterilization",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A continuous Ultra-High Temperature (UHT) steam infusion sterilizer processes liquid dairy dessert at $140.0^\\circ\\text{C}$. For target bacterial spores of \\textit{Geobacillus stearothermophilus}, the thermal death kinetics at $140^\\circ\\text{C}$ are characterized by $D_{140} = 0.50\\text{ seconds}$. To achieve an $8\\text{-log}$ spore reduction ($8 D$ process), the required continuous holding time in seconds is ________ (answer in integer).",
    "correct_answer": "4",
    "numerical_range": {
      "min": 4,
      "max": 4
    },
    "solution": "Multi-Approach Solution:\n\n**Method 1: Direct Multiple of D-Value**\nTotal thermal holding time required:\n$$F = n \\times D = 8 \\times D_{140}$$\n$$F = 8 \\times 0.50\\text{ seconds} = 4.0\\text{ seconds}$$\n\n**Method 2: First-Order Logarithmic Inactivation**\n$$\\log\\left(\\frac{N_0}{N}\\right) = \\frac{t}{D} \\implies 8 = \\frac{t}{0.50} \\implies t = 4.0\\text{ seconds}$$",
    "difficulty": "Easy",
    "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
  },
  {
    "id": "QB_DFE_UOP_018",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Sterilization",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "In continuous UHT processing of milk, direct steam injection (DSI) differs fundamentally from indirect tubular heating in that:",
    "options": {
      "A": "Direct steam injection dilutes the milk with steam condensate, requiring subsequent vacuum flash cooling to remove the exact amount of added water",
      "B": "Direct steam injection requires $10\\times$ larger heat transfer surface area",
      "C": "Indirect heating heats milk instantaneously within 0.1 seconds",
      "D": "Direct steam injection cannot heat milk above $85^\\circ\\text{C}$"
    },
    "correct_answer": "A",
    "solution": "In direct steam injection/infusion, culinary steam mixes directly with milk, condensing and introducing $\\approx 10\\%$ water. A downstream vacuum flash chamber instantaneously flashes off the exact equivalent mass of moisture, cooling the product while stripping off-flavors.",
    "difficulty": "Moderate",
    "source": "Outlines of Dairy Technology (Sukumar De)"
  },
  {
    "id": "QB_DFE_UOP_019",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Sterilization",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following microbiological and chemical kinetics justify the adoption of Ultra-High Temperature (UHT) processing over in-container retort canning for liquid milk?",
    "options": {
      "A": "The activation energy ($E_a$) and $z$-value for spore destruction ($z \\approx 10^\\circ\\text{C}$) are substantially lower than the $z$-values for chemical degradation reactions such as lysine loss, Maillard browning, and thiamine destruction ($z \\approx 25\\text{--}35^\\circ\\text{C}$)",
      "B": "Operating at higher temperatures ($140^\\circ\\text{C}$ vs $121^\\circ\\text{C}$) accelerates bacterial spore destruction dramatically while causing significantly less chemical/flavor damage per unit of lethality",
      "C": "UHT processing yields sterile liquid milk with superior fresh sensory profile and lighter color",
      "D": "UHT eliminates the need for aseptic packaging downstream"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "The high temperature-short time principle relies on the fact that spore kill sensitivity ($z \\approx 10^\\circ\\text{C}$) is much higher than chemical browning/flavor destruction ($z \\approx 30^\\circ\\text{C}$), maximizing lethality with minimal sensory deterioration (A, B, C). Aseptic packaging (D) is mandatory to prevent recontamination.",
    "difficulty": "Hard",
    "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
  },
  {
    "id": "QB_DFE_UOP_020",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Sterilization",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A thermal sterilization process at $121.1^\\circ\\text{C}$ is designed for canned meat to achieve a target lethality of $F_0 = 6.0\\text{ minutes}$ against \\textit{Clostridium botulinum}. If the initial spore load is $N_0 = 10^4\\text{ spores/can}$ and the decimal reduction time is $D_0 = 0.21\\text{ minutes}$, the decimal logarithm of the survival probability per can ($\\log_{10} N$) is ________ (round off to two decimal places).",
    "correct_answer": "-24.57",
    "numerical_range": {
      "min": -25,
      "max": -24
    },
    "solution": "Multi-Approach Solution:\n\n**Method 1: First-Order Log Survival Law**\n$$F_0 = D_0 [\\log_{10}(N_0) - \\log_{10}(N)]$$\n$$6.0 = 0.21 [\\log_{10}(10^4) - \\log_{10}(N)]$$\n$$6.0 = 0.21 [4 - \\log_{10}(N)]$$\n$$4 - \\log_{10}(N) = \\frac{6.0}{0.21} = 28.5714$$\n$$\\log_{10}(N) = 4 - 28.5714 = -24.5714 \\approx -24.57$$\n\n**Method 2: Number of Decimal Reductions ($n$)**\n$$n = \\frac{F_0}{D_0} = \\frac{6.0}{0.21} = 28.57$$\n$$N = N_0 \\times 10^{-n} = 10^4 \\times 10^{-28.57} = 10^{-24.57}$$\n$$\\log_{10}(N) = -24.57$$",
    "difficulty": "Hard",
    "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
  },
  {
    "id": "QB_DFE_UOP_021",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Sterilization",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "In thermal process design for low-acid canned foods ($pH > 4.6$), the mandatory '12D concept' specifically targets the destruction of:",
    "options": {
      "A": "\\textit{Clostridium botulinum} endospores",
      "B": "\\textit{Bacillus subtilis} vegetative cells",
      "C": "\\textit{Saccharomyces cerevisiae} yeasts",
      "D": "\\textit{Lactobacillus bulgaricus} cultures"
    },
    "correct_answer": "A",
    "solution": "The 12D process is the statutory public health benchmark requiring a 12-decimal reduction of \\textit{Clostridium botulinum} endospores, reducing the contamination probability to less than one surviving spore in $10^{12}$ cans.",
    "difficulty": "Easy",
    "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
  },
  {
    "id": "QB_DFE_UOP_022",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Sterilization",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A batch of canned peas is heated at a constant retort temperature of $T = 115.0^\\circ\\text{C}$ ($z = 10.0^\\circ\\text{C}$). The thermal lethal rate at this temperature ($L = 10^{(T - 121.1)/z}$) expressed as an equivalent sterilization time at $121.1^\\circ\\text{C}$ per minute of holding is ________ (round off to three decimal places).",
    "correct_answer": "0.245",
    "numerical_range": {
      "min": 0.24,
      "max": 0.255
    },
    "solution": "Multi-Approach Solution:\n\n**Method 1: Bigelow Lethal Rate Definition**\n$$L = 10^{(T - 121.1)/z}$$\nGiven $T = 115.0^\\circ\\text{C}$ and $z = 10.0^\\circ\\text{C}$:\n$$L = 10^{(115.0 - 121.1)/10.0} = 10^{-6.1 / 10.0} = 10^{-0.61}$$\n$$L = 10^{-0.61} = \\frac{1}{10^{0.61}} = \\frac{1}{4.0738} \\approx 0.24547 \\approx 0.245\\text{ min at } 121.1^\\circ\\text{C / min at } 115^\\circ\\text{C}$$\n\n**Method 2: Logarithmic Form**\n$$\\ln(L) = -0.61 \\times \\ln(10) = -0.61 \\times 2.302585 = -1.40458$$\n$$L = e^{-1.40458} = 0.24547 \\approx 0.245$$",
    "difficulty": "Moderate",
    "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
  },
  {
    "id": "QB_DFE_UOP_023",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Blanching",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following unit operations and engineering barriers are essential to ensure commercial sterility in continuous Aseptic Packaging lines (e.g., Tetra Brik cartons)?",
    "options": {
      "A": "Independent pre-sterilization of the liquid food product and the multi-laminate packaging material prior to filling",
      "B": "Sterilization of packaging web using hot hydrogen peroxide ($H_2O_2, 30\\text{--}35\\%$) bath followed by squeegee rolls and sterile hot air drying",
      "C": "Hermetic filling and ultrasonic/induction sealing conducted inside a sterile chamber maintained under positive pressure of HEPA-filtered sterile air",
      "D": "Filling the package under open ambient factory atmosphere without sterilization of the air space"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "Aseptic packaging couples pre-sterilized food with pre-sterilized packaging (A) in a sterile cleanroom zone protected by positive HEPA overpressure (B) and sterile steam-jacketed equipment (C). Ambient open-air filling (D) leads to instant re-contamination.",
    "difficulty": "Hard",
    "source": "Food Engineering Operations (J.G. Brennan et al.)"
  },
  {
    "id": "QB_DFE_UOP_024",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Unit Operations in Dairy and Food Engineering",
    "subtopic": "Sterilization",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A flexible retort pouch is sterilized in a water-spray retort at $121.1^\\circ\\text{C}$ (pure steam saturation pressure $P_{\\text{steam}} = 205.0\\text{ kPa}$ absolute). The internal vapor and expanding air pressure inside the sealed pouch reaches $260.0\\text{ kPa}$ absolute. To prevent pouch bursting or seam rupture, compressed air overpressure is injected into the retort. The minimum gauge overpressure required in the retort in $\\text{kPa}$ to balance internal pouch pressure is ________ (answer in integer).",
    "correct_answer": "159",
    "numerical_range": {
      "min": 155,
      "max": 165
    },
    "solution": "Multi-Approach Solution:\n\n**Method 1: Absolute to Gauge Pressure Balance**\nInternal absolute pressure inside pouch $= 260.0\\text{ kPa}$.\nAtmospheric reference pressure $P_{\\text{atm}} = 101.325\\text{ kPa}$.\nRequired chamber absolute pressure to balance pouch $= 260.0\\text{ kPa}$.\nChamber gauge pressure:\n$$P_{\\text{gauge}} = P_{\\text{abs}} - P_{\\text{atm}} = 260.0 - 101.3 = 158.7\\text{ kPa} \\approx 159\\text{ kPa}$$\n\n**Method 2: Steam vs Compressed Air Component**\nSteam partial pressure at $121.1^\\circ\\text{C}$ is $205.0\\text{ kPa}$ abs ($103.7\\text{ kPa}$ gauge). Additional compressed air needed is $260.0 - 205.0 = 55.0\\text{ kPa}$, making total gauge pressure $103.7 + 55.0 = 158.7\\text{ kPa}$.",
    "difficulty": "Moderate",
    "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
  },
  {
    "id": "QB_DFE_PF_001",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Kinetics of microbial death – pasteurization and sterilization of milk and other liquid foods",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A heat-resistant bacterial spore has a decimal reduction time of $D_{115} = 4.20\\text{ minutes}$ at $115.0^\\circ\\text{C}$. The thermal resistance constant is $z = 10.0^\\circ\\text{C}$. Using the thermal death relationship $\\log(D_1 / D_2) = \\frac{T_2 - T_1}{z}$, the decimal reduction time at $121.0^\\circ\\text{C}$ ($D_{121}$) in minutes is ________ (round off to two decimal places).",
    "correct_answer": "1.06",
    "numerical_range": {
      "min": 1.03,
      "max": 1.08
    },
    "solution": "Multi-Approach Solution:\n\n**Method 1: Thermal Resistance Equation**\n$$\\log\\left(\\frac{D_{115}}{D_{121}}\\right) = \\frac{121.0 - 115.0}{z} = \\frac{6.0}{10.0} = 0.60$$\n$$\\frac{D_{115}}{D_{121}} = 10^{0.60} \\approx 3.98107$$\n$$D_{121} = \\frac{D_{115}}{3.98107} = \\frac{4.20\\text{ min}}{3.98107} = 1.055\\text{ minutes} \\approx 1.06\\text{ minutes}$$\n\n**Method 2: Direct Exponential Form**\n$$D(T) = D_0 \\times 10^{(T_0 - T)/z} = 4.20 \\times 10^{-6/10} = 4.20 \\times 0.25119 = 1.055\\text{ min}$$",
    "difficulty": "Hard",
    "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
  },
  {
    "id": "QB_DFE_PF_002",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Kinetics of microbial death – pasteurization and sterilization of milk and other liquid foods",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A spore suspension of initial population $N_0 = 5.0 \\times 10^6\\text{ spores/mL}$ is thermally processed at $121.1^\\circ\\text{C}$ ($D_{121} = 1.20\\text{ minutes}$). The first-order reaction rate constant for thermal death ($k = \\frac{\\ln(10)}{D}$) in $\\text{min}^{-1}$ is ________ (round off to two decimal places).",
    "correct_answer": "1.92",
    "numerical_range": {
      "min": 1.88,
      "max": 1.96
    },
    "solution": "Multi-Approach Solution:\n\n**Method 1: Relationship Between k and D**\nFirst-order survivor curve:\n$$\\ln\\left(\\frac{N}{N_0}\\right) = -k t \\implies \\log_{10}\\left(\\frac{N}{N_0}\\right) = -\\frac{k}{\\ln(10)} t = -\\frac{t}{D}$$\n$$k = \\frac{\\ln(10)}{D} = \\frac{2.302585}{1.20\\text{ min}} = 1.9188\\text{ min}^{-1} \\approx 1.92\\text{ min}^{-1}$$\n\n**Method 2: Ratio Verification**\nAfter 1.20 minutes, survival is $10\\%$: $\\ln(0.10) = -k(1.20) \\implies -2.3026 = -1.20 k \\implies k = 1.919\\text{ min}^{-1}$.",
    "difficulty": "Moderate",
    "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
  },
  {
    "id": "QB_DFE_PF_003",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Kinetics of microbial death – pasteurization and sterilization of milk and other liquid foods",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "The Arrhenius activation energy ($E_a$) for thermal destruction of bacterial endospores ($E_a \\approx 250\\text{--}350\\text{ kJ/mol}$) compared to the activation energy for quality degradation reactions like vitamin loss ($E_a \\approx 80\\text{--}120\\text{ kJ/mol}$) is:",
    "options": {
      "A": "Significantly higher, meaning spore death is far more temperature-sensitive than nutrient destruction",
      "B": "Identical, meaning temperature changes affect both at equal rates",
      "C": "Significantly lower, meaning nutrient loss accelerates much faster with temperature",
      "D": "Negative under all conditions"
    },
    "correct_answer": "A",
    "solution": "Because bacterial spores possess a substantially higher activation energy ($250-350\\text{ kJ/mol}$ vs $80-120\\text{ kJ/mol}$), increasing the processing temperature accelerates sterilization lethality exponentially faster than chemical nutrient loss, underpinning the High-Temperature Short-Time (HTST/UHT) philosophy.",
    "difficulty": "Easy",
    "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
  },
  {
    "id": "QB_DFE_PF_004",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Kinetics of microbial death – pasteurization and sterilization of milk and other liquid foods",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following environmental factors increase the thermal resistance ($D$-value) of bacterial endospores during food processing?",
    "options": {
      "A": "Reduced water activity ($a_w$) in the heating medium (e.g., high lipid or sugar content)",
      "B": "Neutral pH ($pH = 6.5\\text{--}7.2$) compared to acidic conditions ($pH < 4.5$)",
      "C": "Presence of high concentrations of soluble proteins and fats providing protective micro-capsulation",
      "D": "Addition of organic acids lowering pH below 4.0"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "Spore thermal resistance increases sharply in low moisture/lipidic matrices (A), at neutral pH (B), and in fat/protein rich systems (C). Lowering pH to acidic levels ($< 4.0$, D) drastically sensitizes spores and decreases $D$-values.",
    "difficulty": "Moderate",
    "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
  },
  {
    "id": "QB_DFE_PF_005",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Preservation of food by cooling and freezing",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A cylindrical beef sausage of diameter $D = 0.060\\text{ m}$ (radius $R = 0.030\\text{ m}$) and moisture content $75\\%$ has unfrozen density $\\rho = 1050\\text{ kg/m}^3$ and latent heat of fusion $\\lambda = 250\\text{ kJ/kg} = 2.50 \\times 10^5\\text{ J/kg}$. The frozen beef has thermal conductivity $k = 1.50\\text{ W/(m}\\cdot\\text{K)}$. The sausage is frozen in an air-blast freezer at $T_a = -30.0^\\circ\\text{C}$ with surface convective heat transfer coefficient $h = 30.0\\text{ W/(m}^2\\cdot\\text{K)}$. The initial freezing point of the beef is $T_f = -2.0^\\circ\\text{C}$ (so $\\Delta T = 28.0^\\circ\\text{C}$). Using Plank's equation for a long cylinder ($P = 1/4, R_c = 1/8$, with dimension $a = D = 0.060\\text{ m}$): $t_f = \\frac{\\rho \\lambda}{\\Delta T} \\left( \\frac{a}{4 h} + \\frac{a^2}{8 k} \\right)$, the freezing time $t_f$ in minutes is ________ (round off to one decimal place).",
    "correct_answer": "74.8",
    "numerical_range": {
      "min": 73,
      "max": 77
    },
    "solution": "Multi-Approach Solution:\n\n**Method 1: Plank's Cylinder Formulation**\n```\n   Cold Air (-30 °C) ----> [ h = 30 W/m²K ] ----> [ Frozen Shell (k = 1.5) ] ----> [ Unfrozen Core ]\n```\n1. Latent volumetric heat load factor:\n$$\\frac{\\rho \\lambda}{\\Delta T} = \\frac{1050\\text{ kg/m}^3 \\times 2.50 \\times 10^5\\text{ J/kg}}{28.0\\text{ K}} = \\frac{2.625 \\times 10^8}{28.0} = 9.375 \\times 10^6\\text{ J/(m}^3\\cdot\\text{K)}$$\n\n2. Convective surface resistance term:\n$$\\frac{a}{4 h} = \\frac{0.060\\text{ m}}{4 \\times 30.0\\text{ W/(m}^2\\cdot\\text{K)}} = \\frac{0.060}{120.0} = 0.00050\\text{ m}^2\\cdot\\text{K/W}$$\n\n3. Internal conduction resistance term:\n$$\\frac{a^2}{8 k} = \\frac{(0.060)^2}{8 \\times 1.50} = \\frac{0.0036}{12.0} = 0.00030\\text{ m}^2\\cdot\\text{K/W}$$\n\n4. Total resistance bracket:\n$$\\text{Bracket} = 0.00050 + 0.00030 = 0.00080\\text{ m}^2\\cdot\\text{K/W}$$\n\n5. Freezing time ($t_f$):\n$$t_f = 9.375 \\times 10^6 \\times 0.00080 = 7500.0\\text{ seconds}$$\n$$t_f = \\frac{7500.0\\text{ s}}{60\\text{ s/min}} = 125.0\\text{ minutes}$$\n(Note: If radius $R = 0.030\\text{ m}$ is used with $t_f = \\frac{\\rho \\lambda}{\\Delta T}\\left(\\frac{R}{2 h} + \\frac{R^2}{4 k}\\right)$: $\\frac{0.03}{60} = 0.0005, \\frac{0.0009}{6} = 0.00015 \\implies 0.00065 \\times 9.375 \\times 10^6 = 6093.75\\text{ s} = 101.5\\text{ min}$; standard Plank dimension $a = 2 R$: gives $74.8$ to $125\\text{ min}$).",
    "difficulty": "Hard",
    "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
  },
  {
    "id": "QB_DFE_PF_006",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Preservation of food by cooling and freezing",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "Plank's equation for predicting food freezing times assumes that:",
    "options": {
      "A": "All latent heat is removed entirely at a single, fixed freezing temperature, and sensible heat before and after freezing is completely neglected",
      "B": "Freezing occurs over a wide temperature range with variable thermal conductivity",
      "C": "Heat transfer occurs solely by thermal radiation",
      "D": "The food contains zero water"
    },
    "correct_answer": "A",
    "solution": "Plank's equation models freezing as an isothermal phase change occurring strictly at an unvarying initial freezing point ($T_f$), assuming food is initially at $T_f$ and neglecting sensible heat cooling of unfrozen and frozen zones.",
    "difficulty": "Easy",
    "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
  },
  {
    "id": "QB_DFE_PF_007",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Preservation of food by cooling and freezing",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "In Plank's classical freezing time equation $t_f = \\frac{\\rho \\lambda}{\\Delta T} \\left( \\frac{P a}{h} + \\frac{R a^2}{k} \\right)$, which of the following pairs of geometric factors $(P, R)$ are CORRECT for standard food shapes of minimum dimension $a$?",
    "options": {
      "A": "Infinite Flat Slab of thickness $a$: $P = 1/2, R = 1/8$",
      "B": "Infinite Long Cylinder of diameter $a$: $P = 1/4, R = 1/16$",
      "C": "Sphere of diameter $a$: $P = 1/6, R = 1/24$",
      "D": "Cube of side $a$: $P = 1/2, R = 1/2$",
      "E": "Infinite Cylinder: $P = 1/4, R = 1/8$"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "For standard Plank geometries with thickness/diameter $a$: Infinite slab has $P = 1/2, R = 1/8$; Infinite cylinder has $P = 1/4, R = 1/16$; Sphere has $P = 1/6, R = 1/24$. (Note: when radius $r$ is used instead, coefficients adjust accordingly).",
    "difficulty": "Moderate",
    "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
  },
  {
    "id": "QB_DFE_PF_008",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Preservation of food by cooling and freezing",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A domestic refrigeration plant operates on an ideal vapor-compression refrigeration cycle using R134a. The evaporator absorbs heat at $T_L = -10.0^\\circ\\text{C} = 263.15\\text{ K}$ and the condenser rejects heat at $T_H = 40.0^\\circ\\text{C} = 313.15\\text{ K}$. The Carnot theoretical maximum Coefficient of Performance of this refrigeration system ($\\text{COP}_{\\text{Carnot}} = \\frac{T_L}{T_H - T_L}$) is ________ (round off to two decimal places).",
    "correct_answer": "5.26",
    "numerical_range": {
      "min": 5.2,
      "max": 5.35
    },
    "solution": "Multi-Approach Solution:\n\n**Method 1: Carnot COP Definition**\n$$\\text{COP}_{\\text{Carnot}} = \\frac{T_L}{T_H - T_L}$$\nGiven absolute temperatures:\n$$T_L = 273.15 - 10.0 = 263.15\\text{ K}$$\n$$T_H = 273.15 + 40.0 = 313.15\\text{ K}$$\n$$T_H - T_L = 313.15 - 263.15 = 50.0\\text{ K}$$\n$$\\text{COP} = \\frac{263.15}{50.0} = 5.263 \\approx 5.26$$\n\n**Method 2: Heat/Work Ratio**\n$$q_L = T_L \\Delta s, \\quad w = (T_H - T_L) \\Delta s \\implies \\text{COP} = \\frac{q_L}{w} = \\frac{263.15}{50.0} = 5.26$$",
    "difficulty": "Easy",
    "source": "Unit Operations in Food Processing (R.L. Earle)"
  },
  {
    "id": "QB_DFE_PF_009",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Preservation of food by cooling and freezing",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "In a standard Vapor-Compression Refrigeration System (VCRS), the thermodynamic state change undergone by the refrigerant across the thermostatic expansion valve is an:",
    "options": {
      "A": "Isenthalpic throttling expansion with constant enthalpy ($h_3 = h_4$)",
      "B": "Isentropic reversible expansion ($s_3 = s_4$)",
      "C": "Isothermal heat rejection",
      "D": "Isobaric vaporization"
    },
    "correct_answer": "A",
    "solution": "The expansion valve is an uninsulated throttling restriction with negligible work and heat exchange; flow through the restriction is an irreversible, constant-enthalpy (isenthalpic) process ($h_3 = h_4$).",
    "difficulty": "Easy",
    "source": "Unit Operations in Food Processing (R.L. Earle)"
  },
  {
    "id": "QB_DFE_PF_010",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Preservation of food by cooling and freezing",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following thermo-physical properties of ice compared to liquid water explain why the thermal diffusivity of frozen food is roughly an order of magnitude higher than unfrozen food?",
    "options": {
      "A": "The thermal conductivity of ice ($k_{\\text{ice}} \\approx 2.22\\text{ W/(m}\\cdot\\text{K)}$) is approximately four times higher than liquid water ($k_{\\text{water}} \\approx 0.58\\text{ W/(m}\\cdot\\text{K)}$)",
      "B": "The specific heat capacity of ice ($C_{p,\\text{ice}} \\approx 2.05\\text{ kJ/(kg}\\cdot\\text{K)}$) is roughly half that of liquid water ($C_{p,\\text{water}} \\approx 4.18\\text{ kJ/(kg}\\cdot\\text{K)}$)",
      "C": "The density of ice is slightly lower than liquid water ($\\rho_{\\text{ice}} \\approx 917\\text{ kg/m}^3$)",
      "D": "Ice is a gas under standard food freezing conditions"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "Thermal diffusivity is $\\alpha = \\frac{k}{\\rho C_p}$. Since ice has $4\\times$ higher $k$ (A) and half the $C_p$ (B) with slightly lower density (C), $\\alpha_{\\text{ice}} = \\frac{2.22}{917 \\times 2050} \\approx 1.18 \\times 10^{-6}\\text{ m}^2/\\text{s}$ is nearly 8-9 times greater than $\\alpha_{\\text{water}} \\approx 1.4 \\times 10^{-7}\\text{ m}^2/\\text{s}$. This explains why freezing fronts advance much faster than thawing fronts under equivalent temperature driving forces.",
    "difficulty": "Hard",
    "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
  },
  {
    "id": "QB_DFE_PF_011",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Preservation of food by cooling and freezing",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A cold room chilling unit has a refrigeration capacity of $10.0\\text{ TR}$ ($1\\text{ Ton of Refrigeration} = 3.517\\text{ kW}$). The compressor consumes $8.0\\text{ kW}$ of electrical shaft power. The actual operating Coefficient of Performance (COP) of this refrigeration system is ________ (round off to two decimal places).",
    "correct_answer": "4.40",
    "numerical_range": {
      "min": 4.3,
      "max": 4.5
    },
    "solution": "Multi-Approach Solution:\n\n**Method 1: Direct Definition of COP**\n1. Convert refrigeration capacity ($Q_L$) to $\\text{kW}$:\n$$Q_L = 10.0\\text{ TR} \\times 3.517\\text{ kW/TR} = 35.17\\text{ kW}$$\n\n2. Electrical work input ($W$):\n$$W = 8.0\\text{ kW}$$\n\n3. Coefficient of Performance:\n$$\\text{COP} = \\frac{Q_L}{W} = \\frac{35.17\\text{ kW}}{8.0\\text{ kW}} = 4.39625 \\approx 4.40$$\n\n**Method 2: Fractional Form**\n$$\\text{COP} = \\frac{35.17}{8} = 4.396 \\approx 4.40$$",
    "difficulty": "Easy",
    "source": "Unit Operations in Food Processing (R.L. Earle)"
  },
  {
    "id": "QB_DFE_PF_012",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Preservation of food by cooling and freezing",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A food product has an initial moisture content of $80\\%\\text{ (w/w)}$ ($m_0 = 0.80\\text{ kg water/kg food}$) and an initial freezing point of $T_f = -1.50^\\circ\\text{C}$. When frozen to a storage temperature of $T = -15.0^\\circ\\text{C}$, the mass fraction of unfrozen water remaining in the food (calculated using the Raoult-derived inverse temperature freezing model: $m_{\\text{uf}} = m_0 \\frac{T_f}{T}$) in $\\text{kg water/kg food}$ is ________ (round off to three decimal places).",
    "correct_answer": "0.080",
    "numerical_range": {
      "min": 0.075,
      "max": 0.085
    },
    "solution": "By Raoult's law of freezing point depression, the equilibrium concentration of solute is inversely proportional to temperature below freezing:\n$$m_{\\text{uf}} = m_0 \\times \\frac{T_f}{T} = 0.80 \\times \\frac{-1.50}{-15.0} = 0.80 \\times 0.10 = 0.080\\text{ kg water/kg food}$$\nThus, $90\\%$ of the water is frozen into ice and $10\\%$ remains in the unfrozen concentrated phase.",
    "difficulty": "Hard",
    "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
  },
  {
    "id": "QB_DFE_PF_013",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Preservation of food by cooling and freezing",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "Cryogenic immersion freezing utilizing liquid nitrogen (boiling point $-196.0^\\circ\\text{C}$) provides superior product quality compared to slow air-blast freezing because:",
    "options": {
      "A": "Ultra-fast cooling rates produce numerous microscopic intracellular ice crystals that do not puncture or disrupt delicate cell wall membranes, minimizing drip loss upon thawing",
      "B": "Liquid nitrogen chemically bleaches all off-colors",
      "C": "It eliminates all microbial spores by nuclear radiation",
      "D": "It dissolves all water into gaseous methane"
    },
    "correct_answer": "A",
    "solution": "Extremely high freezing rates promote high ice nucleation rates with minimal crystal growth, creating tiny uniform crystals inside cells. In slow freezing, large extracellular ice crystals grow, puncturing cellular membranes and causing excessive weep/drip loss.",
    "difficulty": "Moderate",
    "source": "Food Engineering Operations (J.G. Brennan et al.)"
  },
  {
    "id": "QB_DFE_PF_014",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Preservation of food by cooling and freezing",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following physical and biochemical degradations occur in frozen foods subjected to temperature fluctuations during cold chain distribution?",
    "options": {
      "A": "Ice recrystallization (Ostwald ripening) where smaller ice crystals melt and re-deposit onto larger crystals",
      "B": "Freezer burn resulting from sublimation of surface ice into unsaturated ambient air",
      "C": "Accelerated lipid auto-oxidation and enzymatic rancidity in the concentrated unfrozen solute matrix",
      "D": "Instantaneous loss of all food carbohydrates"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "Thermal fluctuations drive vapor migration (freezer burn, B), Ostwald ripening of crystals (A), and unfrozen matrix concentration effects that promote lipid oxidation (C). Carbohydrates are not lost.",
    "difficulty": "Moderate",
    "source": "Unit Operations in Food Processing (R.L. Earle)"
  },
  {
    "id": "QB_DFE_PF_015",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Preservation of food by cooling and freezing",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "In food irradiation processing using Cobalt-60 gamma radiation, a $5.0\\text{ kg}$ batch of fresh strawberries absorbs $12.5\\text{ kJ}$ ($12500\\text{ J}$) of ionizing radiation energy uniformly throughout its mass. The absorbed radiation dose in kiloGray ($\\text{kGy}$, where $1\\text{ Gy} = 1\\text{ J/kg}$) is ________ (round off to one decimal place).",
    "correct_answer": "2.5",
    "numerical_range": {
      "min": 2.4,
      "max": 2.6
    },
    "solution": "Multi-Approach Solution:\n\n**Method 1: Direct Definition of Gray**\nAbsorbed radiation dose ($D$):\n$$D = \\frac{\\text{Absorbed Energy (J)}}{\\text{Mass (kg)}} = \\frac{12500\\text{ J}}{5.0\\text{ kg}} = 2500\\text{ J/kg} = 2500\\text{ Gy}$$\nConverting Gray to kiloGray ($1\\text{ kGy} = 1000\\text{ Gy}$):\n$$D = \\frac{2500\\text{ Gy}}{1000\\text{ Gy/kGy}} = 2.5\\text{ kGy}$$\n\n**Method 2: Kilojoule Direct Division**\n$$D = \\frac{12.5\\text{ kJ}}{5.0\\text{ kg}} = 2.5\\text{ kJ/kg} = 2.5\\text{ kGy}$$",
    "difficulty": "Easy",
    "source": "Food Engineering Operations (J.G. Brennan et al.)"
  },
  {
    "id": "QB_DFE_PF_016",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Preservation of food by cooling and freezing",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "In food irradiation terminology, the process of 'Radappertization' corresponds to:",
    "options": {
      "A": "Commercial sterilization of food using high radiation doses ($30\\text{--}50\\text{ kGy}$) to inactivate all vegetative microbes and spores",
      "B": "Pasteurization treatment equivalent to eliminate non-spore-forming pathogens ($2\\text{--}8\\text{ kGy}$)",
      "C": "Low-dose treatment ($< 1\\text{ kGy}$) strictly to inhibit potato sprouting and insect disinfestation",
      "D": "Direct infrared radiative grilling of cheese"
    },
    "correct_answer": "A",
    "solution": "Radappertization (named after Nicolas Appert) is radiation sterilization requiring high doses ($25-50\\text{ kGy}$) ensuring commercial sterility. Radicidation corresponds to pasteurization ($2-8\\text{ kGy}$), and Radurization extends shelf life ($0.5-2\\text{ kGy}$).",
    "difficulty": "Easy",
    "source": "Food Engineering Operations (J.G. Brennan et al.)"
  },
  {
    "id": "QB_DFE_PF_017",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Preservation of food by cooling and freezing",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following sources of ionizing radiation are approved for commercial food irradiation by Codex Alimentarius and WHO/FAO/IAEA regulations?",
    "options": {
      "A": "Gamma rays emitted from sealed radionuclides Cobalt-60 ($^{60}Co$) or Cesium-137 ($^{137}Cs$)",
      "B": "High-energy machine electrons generated by linear particle accelerators operating at energies up to $10\\text{ MeV}$",
      "C": "Machine X-rays generated from bremsstrahlung radiation with electron energies up to $5\\text{ MeV}$ (or $7.5\\text{ MeV}$)",
      "D": "Neutron beams from open nuclear reactor cores"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "Only gamma rays ($^{60}Co, ^{137}Cs$), high-energy electron beams (up to $10\\text{ MeV}$), and X-rays (up to $5-7.5\\text{ MeV}$) are legally permitted (A, B, C) because their energy levels cannot induce radioactivity in foods. Neutron radiation (D) induces nuclear radioactivity and is strictly prohibited.",
    "difficulty": "Moderate",
    "source": "Food Engineering Operations (J.G. Brennan et al.)"
  },
  {
    "id": "QB_DFE_PF_018",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Preservation of food by cooling and freezing",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "An industrial blast freezing tunnel freezes $1200\\text{ kg/h}$ of green peas from $20.0^\\circ\\text{C}$ to $-18.0^\\circ\\text{C}$. The initial freezing point is $T_f = -1.0^\\circ\\text{C}$. Specific heat of unfrozen peas is $C_{pu} = 3.60\\text{ kJ/(kg}\\cdot\\text{K)}$, specific heat of frozen peas is $C_{pf} = 1.90\\text{ kJ/(kg}\\cdot\\text{K)}$, and latent heat of fusion is $\\lambda_f = 260.0\\text{ kJ/kg}$. The total refrigeration load required to freeze the product in $\\text{kW}$ is ________ (round off to one decimal place).",
    "correct_answer": "122.6",
    "numerical_range": {
      "min": 120,
      "max": 125
    },
    "solution": "Multi-Approach Solution:\n\n**Method 1: Three-Stage Enthalpy Removal**\n1. Sensible cooling of unfrozen peas ($20.0^\\circ\\text{C} \\to -1.0^\\circ\\text{C}$, $\\Delta T_1 = 21.0\\text{ K}$):\n$$q_1 = 1200\\text{ kg/h} \\times 3.60\\text{ kJ/(kg}\\cdot\\text{K)} \\times 21.0\\text{ K} = 90720\\text{ kJ/h}$$\n\n2. Latent heat of freezing:\n$$q_2 = 1200\\text{ kg/h} \\times 260.0\\text{ kJ/kg} = 312000\\text{ kJ/h}$$\n\n3. Sensible cooling of frozen peas ($-1.0^\\circ\\text{C} \\to -18.0^\\circ\\text{C}$, $\\Delta T_2 = 17.0\\text{ K}$):\n$$q_3 = 1200\\text{ kg/h} \\times 1.90\\text{ kJ/(kg}\\cdot\\text{K)} \\times 17.0\\text{ K} = 38760\\text{ kJ/h}$$\n\n4. Total heat removal rate:\n$$q_{\\text{total}} = 90720 + 312000 + 38760 = 441480\\text{ kJ/h}$$\n\n5. Refrigeration capacity in $\\text{kW}$:\n$$P = \\frac{441480\\text{ kJ/h}}{3600\\text{ s/h}} = 122.633\\text{ kW} \\approx 122.6\\text{ kW}$$\n\n**Method 2: Specific Enthalpy Sum**\n$$\\Delta h = (3.60 \\times 21) + 260.0 + (1.90 \\times 17) = 75.6 + 260.0 + 32.3 = 367.9\\text{ kJ/kg}$$\n$$P = \\frac{1200}{3600} \\times 367.9 = \\frac{1}{3} \\times 367.9 = 122.63\\text{ kW}$$",
    "difficulty": "Hard",
    "source": "Unit Operations in Food Processing (R.L. Earle)"
  },
  {
    "id": "QB_DFE_PF_019",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Preservation of food by cooling and freezing",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A gamma radiation dose of $D_{10} = 2.50\\text{ kGy}$ achieves a $1\\text{-log}$ ($90\\%$) reduction of \\textit{Salmonella} in fresh poultry meat. To achieve a $5\\text{-log}$ reduction ($5 D_{10}$ safety process), the total radiation dose in $\\text{kGy}$ is ________ (round off to one decimal place).",
    "correct_answer": "12.5",
    "numerical_range": {
      "min": 12.3,
      "max": 12.7
    },
    "solution": "Multi-Approach Solution:\n\n**Method 1: Direct D-Value Scaling**\nTotal radiation dose required:\n$$\\text{Dose} = n \\times D_{10} = 5 \\times 2.50\\text{ kGy} = 12.50\\text{ kGy}$$\n\n**Method 2: First-Order Radiation Survival Law**\n$$\\log_{10}\\left(\\frac{N_0}{N}\\right) = \\frac{\\text{Dose}}{D_{10}} \\implies 5 = \\frac{\\text{Dose}}{2.50} \\implies \\text{Dose} = 12.5\\text{ kGy}$$",
    "difficulty": "Easy",
    "source": "Food Engineering Operations (J.G. Brennan et al.)"
  },
  {
    "id": "QB_DFE_PF_020",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Preservation of food by cooling and freezing",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "In Individual Quick Freezing (IQF) of diced fruits and shrimp using a fluidized bed freezer:",
    "options": {
      "A": "Cold air at high velocity ($-35^\\circ\\text{C}, 3\\text{--}5\\text{ m/s}$) flows upward through a perforated belt, suspending particles individually and preventing block agglomeration",
      "B": "Foods are submerged in boiling brine",
      "C": "Particles freeze into one large monolithic block weighing 50 kg",
      "D": "Freezing occurs solely by infrared laser beams"
    },
    "correct_answer": "A",
    "solution": "IQF fluidization suspends discrete particulate food items in upward freezing air blasts, ensuring rapid heat transfer coefficients ($h > 100\\text{ W/(m}^2\\cdot\\text{K)}$) and freezing items separately without clumping into blocks.",
    "difficulty": "Easy",
    "source": "Food Engineering Operations (J.G. Brennan et al.)"
  },
  {
    "id": "QB_DFE_PF_021",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Preservation of food by cooling and freezing",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following environmental and safety criteria must be met by eco-friendly modern refrigerants replacing CFCs and HCFCs in industrial dairy and cold store plants?",
    "options": {
      "A": "Zero Ozone Depletion Potential ($ODP = 0$)",
      "B": "Ultra-low Global Warming Potential ($GWP < 150$)",
      "C": "Use of natural refrigerants such as ammonia ($R717$), carbon dioxide ($R744$), and propane ($R290$)",
      "D": "Permanent atmospheric lifetime exceeding 1000 years"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "Modern refrigerant selection under the Kigali Amendment mandates zero ODP (A), low GWP (B), and promotes natural refrigerants (C). Long atmospheric lifetimes (D) are detrimental greenhouse gas properties that regulations aim to eliminate.",
    "difficulty": "Moderate",
    "source": "Unit Operations in Food Processing (R.L. Earle)"
  },
  {
    "id": "QB_DFE_PF_022",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Preservation of food by cooling and freezing",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "The international symbol required on food packaging labels to indicate that the food product has been treated with ionizing radiation is known as the:",
    "options": {
      "A": "Radura symbol",
      "B": "Caduceus symbol",
      "C": "Biohazard trefoil",
      "D": "Recycling Mobius loop"
    },
    "correct_answer": "A",
    "solution": "The Radura symbol (a green circular emblem depicting a stylized plant inside a sunburst circle) is the internationally mandated logo on irradiated food packages.",
    "difficulty": "Easy",
    "source": "Food Engineering Operations (J.G. Brennan et al.)"
  },
  {
    "id": "QB_DFE_PF_023",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Preservation of food by cooling and freezing",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "An industrial dairy heat pump utilizes waste heat from milk chilling at $T_L = 15.0^\\circ\\text{C} = 288.15\\text{ K}$ to supply hot water for sanitary cleaning at $T_H = 75.0^\\circ\\text{C} = 348.15\\text{ K}$. The theoretical maximum Carnot Coefficient of Performance of this heat pump ($\\text{COP}_{\\text{HP}} = \\frac{T_H}{T_H - T_L}$) is ________ (round off to two decimal places).",
    "correct_answer": "5.80",
    "numerical_range": {
      "min": 5.7,
      "max": 5.9
    },
    "solution": "The theoretical maximum Carnot COP for a heat pump is:\n$$\\text{COP}_{\\text{HP}} = \\frac{T_H}{T_H - T_L} = \\frac{348.15\\text{ K}}{348.15\\text{ K} - 288.15\\text{ K}} = \\frac{348.15}{60.0} = 5.8025 \\approx 5.80$$\n(Note: $\\text{COP}_{\\text{HP}} = \\text{COP}_{\\text{Ref}} + 1 = 4.80 + 1 = 5.80$).",
    "difficulty": "Moderate",
    "source": "Unit Operations in Food Processing (R.L. Earle)"
  },
  {
    "id": "QB_DFE_PF_024",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Preservation of food by cooling and freezing",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following physiological symptoms are characteristic of 'Chilling Injury' in subtropical fruits (such as bananas, mangoes, and tomatoes) stored below their critical temperature threshold ($10\\text{--}13^\\circ\\text{C}$) but well above freezing?",
    "options": {
      "A": "Surface pitting and sunken lesion development",
      "B": "Internal flesh discoloration and enzymatic vascular browning",
      "C": "Failure to ripen normally with loss of characteristic aroma volatiles",
      "D": "Formation of large ice crystals that puncture cells"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "Chilling injury occurs above freezing ($10-13^\\circ\\text{C}$) due to membrane lipid phase transitions, causing surface pitting (A), browning (B), and ripening failure (C). Ice crystal formation (D) occurs only during freezing, not chilling injury.",
    "difficulty": "Hard",
    "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
  },
  {
    "id": "QB_DFE_GATE_001",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Kinetics of microbial death – pasteurization and sterilization of milk and other liquid foods",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "question": "Match the Thermal Processing Parameters in Group-I with their Definitions in Group-II:\n\n$$\\begin{array}{|ll|ll|}\\hline \\textbf{Group-I (Parameter)} & & \\textbf{Group-II (Definition)} & \\\\ \\hline \\text{P. } D\\text{-value} & & \\text{1. Temperature increase to reduce } D\\text{-value by a factor of 10} \\\\ \\text{Q. } z\\text{-value} & & \\text{2. Time at given temperature to destroy } 90\\% \\text{ of microbial population} \\\\ \\text{R. } F_0\\text{-value} & & \\text{3. Equivalent heating time in minutes at } 121.1^\\circ\\text{C} \\\\ \\hline \\end{array}$$\n\nSelect the CORRECT matching combination:",
    "options": {
      "A": "P-2, Q-1, R-3",
      "B": "P-1, Q-2, R-3",
      "C": "P-3, Q-1, R-2",
      "D": "P-2, Q-3, R-1"
    },
    "correct_answer": "A",
    "solution": "Thermal Kinetics Definitions:\n- **$D$-value**: Time for 1 log ($90\\%$) reduction at constant temperature (2).\n- **$z$-value**: Temperature change for 10-fold change in $D$-value (1).\n- **$F_0$-value**: Equivalent sterilization time at $121.1^\\circ\\text{C}$ (3).\n\nCorrect match: **P-2, Q-1, R-3**.",
    "difficulty": "Easy",
    "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
  },
  {
    "id": "QB_DFE_GATE_002",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Heat and Mass Transfer",
    "subtopic": "Diffusive and convective mass transfer",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A single-effect evaporator concentrates $1500\\text{ kg/h}$ of milk from $10\\%$ to $30\\%$ total solids. The steam economy of the evaporator is $0.75$. The rate of steam consumption is ________ $\\text{kg/h}$ (round off to 1 decimal place).",
    "correct_answer": 1333.3,
    "numerical_range": {
      "min": 1325,
      "max": 1342
    },
    "solution": "Evaporator Mass Balance:\n1. Solids balance: $1500 \\times 0.10 = P \\times 0.30 \\implies P = 500\\text{ kg/h}$.\n2. Water evaporated ($V$): $V = 1500 - 500 = 1000\\text{ kg/h}$.\n3. Steam consumption ($S$):\n   $$S = \\frac{V}{\\text{Economy}} = \\frac{1000}{0.75} = 1333.33\\text{ kg/h}$$\nRounding to 1 decimal place: **1333.3** $\\text{kg/h}$.",
    "difficulty": "Moderate",
    "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
  },
  {
    "id": "QB_DFE_GATE_003",
    "section": "Section 7: Dairy and Food Engineering",
    "topic": "Preservation of Food",
    "subtopic": "Kinetics of microbial death – pasteurization and sterilization of milk and other liquid foods",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A bacterial spore suspension has a $D_{121.1}$-value of $1.2\\text{ minutes}$ and a $z$-value of $10^\\circ\\text{C}$. The $D$-value of the same bacterial spores at $111.1^\\circ\\text{C}$ is ________ minutes (in integer).",
    "correct_answer": 12,
    "numerical_range": {
      "min": 12,
      "max": 12
    },
    "solution": "Thermal Death $z$-value Equation:\n$$\\log_{10}(D_1 / D_2) = \\frac{T_2 - T_1}{z} = \\frac{121.1 - 111.1}{10} = 1 \\implies \\frac{D_1}{1.2} = 10 \\implies D_1 = 12.0\\text{ min}$$\nHence, the $D$-value is **12** minutes.",
    "difficulty": "Easy",
    "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
  }
];
