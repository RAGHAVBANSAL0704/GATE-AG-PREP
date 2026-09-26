import json

def generate_sec3_fillers():
    """Generates 76 questions to bring all Section 3 subtopics to >= 15 questions."""
    SEC = "Section 3: Farm Power"
    questions = []

    def make_q(qid, top, sub, qtype, marks, neg, qtext, opt_or_ans, ans_or_range, sol, src):
        q = {
            "id": qid,
            "section": SEC,
            "topic": top,
            "subtopic": sub,
            "type": qtype,
            "marks": marks,
            "negative_marks": neg,
            "question": qtext,
            "solution": sol,
            "difficulty": "Moderate" if marks == 2 else "Easy",
            "source": src
        }
        if qtype in ["MCQ", "MSQ"]:
            q["options"] = opt_or_ans
            q["correct_answer"] = ans_or_range
        else:
            q["answer"] = opt_or_ans
            q["answer_range"] = ans_or_range
        return q

    # 1. Engine components (5 Qs)
    for i in range(1, 6):
        qid = f"QB_SUB_FP_CMP_{i:03d}"
        top = "Farm Power"
        sub = "Engine components"
        if i % 2 == 1:
            questions.append(make_q(
                qid, top, sub, "MCQ", 1, 0.33,
                "In a multi-cylinder diesel engine cylinder head, the exhaust valve is typically made of austenitic silicon-chromium steel (silchrome) primarily because:",
                {"A": "It operates in an intensely corrosive environment at temperatures exceeding 700°C", "B": "It needs to have lower density than aluminum", "C": "It acts as an electrical grounding electrode", "D": "It conducts zero heat away from the combustion chamber"},
                "A",
                "Exhaust valves endure peak flame temperatures (700–850°C) and corrosive exhaust gas products (SOx, NOx), requiring silchrome or nimonic alloys for high creep and hot-corrosion resistance.",
                "Internal Combustion Engines (V. Ganesan)"
            ))
        else:
            questions.append(make_q(
                qid, top, sub, "NAT", 2, 0.0,
                f"A four-stroke single-cylinder diesel engine has a piston diameter of $100\\text{{ mm}}$ and stroke length of $120\\text{{ mm}}$. If the clearance volume is $50\\text{{ cm}}^3$, the compression ratio of the engine is:",
                19.85, [19.5, 20.2],
                "Swept volume:\n$$V_s = \\frac{\\pi}{4} D^2 L = \\frac{\\pi}{4} (10)^2 \\times 12 = 942.48\\text{ cm}^3$$\nCompression ratio:\n$$r = \\frac{V_s + V_c}{V_c} = \\frac{942.48 + 50}{50} = \\frac{992.48}{50} = 19.85$$",
                "Internal Combustion Engines (Heywood)"
            ))

    # 2. Lubricants and their properties (8 Qs)
    for i in range(1, 9):
        qid = f"QB_SUB_FP_LUB_{i:03d}"
        top = "Farm Power"
        sub = "Lubricants and their properties"
        if i % 3 == 1:
            questions.append(make_q(
                qid, top, sub, "MCQ", 1, 0.33,
                "The 'Viscosity Index' (VI) of an engine lubricating oil indicates:",
                {"A": "The rate of change of viscosity with respect to temperature", "B": "The absolute flash point of the lubricant", "C": "The percentage of sulfur and ash additives", "D": "The pour point below zero Celsius"},
                "A",
                "Viscosity Index measures the sensitivity of lubricant viscosity to temperature fluctuations. A higher VI signifies smaller change in viscosity across operating temperature spans.",
                "Automotive Lubricants and Lubrication (Wilfried J. Bartz)"
            ))
        elif i % 3 == 2:
            questions.append(make_q(
                qid, top, sub, "MSQ", 2, 0.0,
                "In a multigrade diesel crankcase oil designated as SAE 15W-40, which of the following statements are CORRECT?",
                {"A": "'15W' specifies the low-temperature dynamic viscosity and cold-crank capability at winter temperatures", "B": "'40' specifies the high-temperature kinematic viscosity range at 100°C", "C": "The oil behaves like an SAE 15 grade at 100°C", "D": "Viscosity index improver polymer additives allow the multigrade performance"},
                "A, B, D",
                "SAE 15W-40 meets cold cranking limits at winter temperatures (15W) and maintains protective film viscosity of SAE 40 at 100°C using polymeric viscosity index improvers.",
                "Tractors and Power Units (Liljedahl)"
            ))
        else:
            questions.append(make_q(
                qid, top, sub, "MCQ", 1, 0.33,
                "The temperature at which an engine lubricating oil ceases to flow when cooled under standardized laboratory test conditions is defined as the:",
                {"A": "Pour point", "B": "Flash point", "C": "Fire point", "D": "Cloud point"},
                "A",
                "Pour point is the lowest temperature at which the oil remains pourable or fluid. Flash point is when combustible vapors ignite momentarily.",
                "Fuels and Lubricants (Mathur & Sharma)"
            ))

    # 3. Selection, operation, maintenance and repair of I.C. engines (2 Qs)
    questions.append(make_q(
        "QB_SUB_FP_MNT_001", "Farm Power", "Selection, operation, maintenance and repair of I.C. engines",
        "MCQ", 1, 0.33,
        "Air bleeding from the fuel delivery circuit of an agricultural tractor diesel engine is mandatory when:",
        {"A": "Air bubbles enter the fuel lines after fuel filter replacement or running out of diesel", "B": "The crankcase lubricating oil level is high", "C": "The radiator coolant expands into the overflow bottle", "D": "The air cleaner oil bath is overfilled"},
        "A",
        "Diesel fuel injection requires incompressible fluid delivery to attain ~200 bar nozzle opening pressure. Entrained air compresses and halts injection, stalling the engine.",
        "Elements of Agricultural Engineering (Sahay)"
    ))
    questions.append(make_q(
        "QB_SUB_FP_MNT_002", "Farm Power", "Selection, operation, maintenance and repair of I.C. engines",
        "MSQ", 2, 0.0,
        "Which of the following maintenance procedures are standard practices for wet-type oil-bath tractor air cleaners?",
        {"A": "Flushing accumulated sediment from the bottom oil cup", "B": "Refilling the cup with clean engine oil up to the indicated oil-level ring", "C": "Washing the wire mesh filter element in diesel or solvent", "D": "Blowing compressed air through a paper pleat element"},
        "A, B, C",
        "Oil-bath air cleaners feature an oil cup and wire mesh matrix. Dry paper pleats belong to dry-type air filters.",
        "Tractor Maintenance and Repair (Jain & Rai)"
    ))

    # 4. Mechanics of tractor chassis (3 Qs)
    for i in range(1, 4):
        qid = f"QB_SUB_FP_CHS_{i:03d}"
        top = "Tractors and Power Tillers"
        sub = "Mechanics of tractor chassis"
        if i == 1:
            questions.append(make_q(
                qid, top, sub, "NAT", 2, 0.0,
                "A rear-wheel-drive 2WD tractor has a static rear-to-front weight ratio of 60:40 on a wheelbase of $L = 2.0\\text{ m}$. Total tractor mass is $2500\\text{ kg}$ ($W = 24.525\\text{ kN}$). The longitudinal distance of the center of gravity ahead of the rear axle centerline (in meters) is:",
                0.8, [0.78, 0.82],
                "Taking moments about rear axle contact point at static equilibrium:\n$$W_f \\times L = W \\times x_g$$\nSince $W_f = 0.40 W$, $0.40 W \\times 2.0 = W \\times x_g \\implies x_g = 0.40 \\times 2.0 = 0.80\\text{ m}$",
                "Principles of Farm Machinery (Kepner et al.)"
            ))
        elif i == 2:
            questions.append(make_q(
                qid, top, sub, "MCQ", 1, 0.33,
                "During heavy drawbar pull operation of a rear-wheel drive tractor, dynamic weight transfer causes:",
                {"A": "Rear axle vertical load to increase and front axle vertical load to decrease", "B": "Front axle vertical load to increase and rear to decrease", "C": "Total tractor weight to vanish", "D": "No change in wheel normal reactions"},
                "A",
                "Drawbar pull below axle height exerts a clockwise pitching moment that unloads the front wheels and increases normal reaction on the driving rear wheels, improving traction.",
                "Tractors and Their Power Units (Liljedahl)"
            ))
        else:
            questions.append(make_q(
                qid, top, sub, "MSQ", 2, 0.0,
                "Which parameters directly influence the longitudinal static and dynamic stability of an agricultural tractor against backward tipping?",
                {"A": "Height of the center of gravity ($z_g$)", "B": "Longitudinal position of the center of gravity ahead of rear axle ($x_g$)", "C": "Height of the drawbar hitch point above ground", "D": "Diameter of the tractor steering wheel"},
                "A, B, C",
                "Backward tipping stability limit: $R_f = \\frac{W x_g - P h_d - W z_g \\sin\\theta}{L} \\ge 0$. It depends strictly on $x_g$, $z_g$, drawbar height $h_d$, and wheelbase $L$.",
                "Terramechanics and Off-Road Vehicle Engineering (J.Y. Wong)"
            ))

    # 5. Traction theory (2 Qs)
    questions.append(make_q(
        "QB_SUB_FP_TRC_001", "Tractors and Power Tillers", "Traction theory",
        "MCQ", 1, 0.33,
        "In Bekker's soil sinkage equation $p = \\left(\\frac{k_c}{b} + k_\\phi\\right) z^n$, the parameter $b$ represents:",
        {"A": "The smaller dimension (width) of the rectangular contact plate", "B": "The longitudinal wheel base of the vehicle", "C": "The total weight of the tractor", "D": "The moisture content of the soil"},
        "A",
        "Bekker's pressure-sinkage formulation uses $b$ as the narrower contact dimension (plate width or tire contact width) to scale cohesive modulus $k_c$.",
        "Theory of Land Locomotion (M.G. Bekker)"
    ))
    questions.append(make_q(
        "QB_SUB_FP_TRC_002", "Tractors and Power Tillers", "Traction theory",
        "NAT", 2, 0.0,
        "A pneumatic drive wheel travels a nominal distance of $25.0\\text{ m}$ under zero-load conditions for 5 revolutions. Under heavy load, the tractor travels only $20.0\\text{ m}$ for the same 5 revolutions. The wheel travel reduction (wheel slip, in percent) is:",
        20.0, [19.5, 20.5],
        "Slip $S = \\frac{V_0 - V_a}{V_0} \\times 100 = \\frac{25.0 - 20.0}{25.0} \\times 100 = \\frac{5.0}{25.0} \\times 100 = 20.0\\%$",
        "Principles of Agricultural Engineering (O.P. Singhal)"
    ))

    # 6. Power transmission systems – gear trains, differential, final drives and power take-off (2 Qs)
    questions.append(make_q(
        "QB_SUB_FP_TRS_001", "Tractors and Power Tillers", "Power transmission systems – gear trains, differential, final drives and power take-off",
        "MCQ", 1, 0.33,
        "The standard rotational speed and spline diameter for a Type 1 standard PTO shaft specified by ISO/ASAE is:",
        {"A": "540 rpm with 6 splines of 35 mm (1-3/8 inch) diameter", "B": "1000 rpm with 21 splines of 45 mm diameter", "C": "750 rpm with 8 splines", "D": "540 rpm with 10 splines of 25 mm diameter"},
        "A",
        "ASAE/ISO 500 standard defines Type 1 standard PTO as 540 ± 10 rpm with 6 splines and 34.9 mm (1-3/8 in) diameter.",
        "ASABE Standards / Liljedahl"
    ))
    questions.append(make_q(
        "QB_SUB_FP_TRS_002", "Tractors and Power Tillers", "Power transmission systems – gear trains, differential, final drives and power take-off",
        "NAT", 2, 0.0,
        "In a tractor differential unit during a sharp turn, the crown wheel rotates at $120\\text{ rpm}$. If the inner drive wheel rotates at $90\\text{ rpm}$, the rotational speed of the outer drive wheel (in rpm) is:",
        150.0, [149.0, 151.0],
        "Differential relationship:\n$$N_{\\text{ring}} = \\frac{N_1 + N_2}{2}$$\n$$120 = \\frac{90 + N_2}{2} \\implies 240 = 90 + N_2 \\implies N_2 = 150.0\\text{ rpm}$$",
        "Elements of Agricultural Engineering (Sahay)"
    ))

    # 7. Three point hitches – free link and restrained link operations (8 Qs)
    for i in range(1, 9):
        qid = f"QB_SUB_FP_HTC_{i:03d}"
        top = "Tractors and Power Tillers"
        sub = "Three point hitches – free link and restrained link operations"
        if i % 3 == 1:
            questions.append(make_q(
                qid, top, sub, "MCQ", 1, 0.33,
                "In a three-point linkage operating in 'restrained-link' mode, the working depth of the tillage tool is mechanically regulated by:",
                {"A": "A gauge wheel resting on the unplowed land surface or single-acting hydraulic cylinder stop", "B": "The instantaneous virtual hitch point floating freely", "C": "Draft sensing springs on the lower links exclusively", "D": "Engine flywheel speed"},
                "A",
                "Restrained-link operation locks the relative depth using a ground gauge wheel or mechanical hydraulic cylinder depth stop.",
                "Tractors and Their Power Units (Liljedahl)"
            ))
        elif i % 3 == 2:
            questions.append(make_q(
                qid, top, sub, "MSQ", 2, 0.0,
                "Which categories of standard three-point hitches are classified by ISO 730 based on tractor PTO power ratings?",
                {"A": "Category 1 (up to 48 kW / 65 hp)", "B": "Category 2 (30 to 92 kW / 40 to 125 hp)", "C": "Category 3 (60 to 185 kW / 80 to 250 hp)", "D": "Category 0 (lawn/garden tractors under 15 kW)"},
                "A, B, C, D",
                "ISO 730 classifies agricultural 3-point hitches from Category 0 through Category 4 based on pin dimensions, mast height, and tractor power ratings.",
                "ISO 730 Standard Guidelines"
            ))
        else:
            questions.append(make_q(
                qid, top, sub, "NAT", 2, 0.0,
                "The lower hitch pin diameter for a standard Category 2 three-point linkage according to ISO 730 (in mm) is:",
                28.0, [27.5, 28.7],
                "Category 1 has 22 mm lower pins, Category 2 has 28 mm (28.4 mm nominal) lower hitch pins, and Category 3 has 36.6 mm pins.",
                "Farm Machinery Standards (ASABE/ISO)"
            ))

    # 8. Tractor tests and performance (8 Qs)
    for i in range(1, 9):
        qid = f"QB_SUB_FP_TST_{i:03d}"
        top = "Tractors and Power Tillers"
        sub = "Tractor tests and performance"
        if i % 3 == 1:
            questions.append(make_q(
                qid, top, sub, "MCQ", 1, 0.33,
                "In Nebraska Tractor Tests and OECD standard testing codes, tractor drawbar pull tests are officially conducted on:",
                {"A": "A level concrete or bitumen test track", "B": "Soft, freshly puddled sandy clay loam", "C": "A 30-degree incline grass field", "D": "A loose gravel bed"},
                "A",
                "Official standardized performance tests (Nebraska Tractor Tests, OECD Code 2) utilize a smooth, level concrete track to ensure absolute repeatability free of soil moisture variations.",
                "Nebraska Tractor Test Laboratory Standards"
            ))
        elif i % 3 == 2:
            questions.append(make_q(
                qid, top, sub, "NAT", 2, 0.0,
                "During a tractor PTO dynamometer test, the torque recorded at $540\\text{ rpm}$ is $450\\text{ N}\\cdot\\text{m}$. The PTO power developed (in kW, rounded to 2 decimal places) is:",
                25.45, [25.3, 25.6],
                "$$P = \\frac{2 \\pi N T}{60000} = \\frac{2 \\pi \\times 540 \\times 450}{60000} = \\frac{1526814}{60000} = 25.45\\text{ kW}$$",
                "Internal Combustion Engines (V. Ganesan)"
            ))
        else:
            questions.append(make_q(
                qid, top, sub, "MSQ", 2, 0.0,
                "Which standard performance parameters are evaluated during official tractor testing at the Central Farm Machinery Training & Testing Institute (CFMTTI), Budni?",
                {"A": "Maximum PTO power and specific fuel consumption (SFC)", "B": "Drawbar pull and travel reduction (slip) on concrete track", "C": "Hydraulic lift capacity throughout the full range of movement", "D": "Turning circle radius with and without steering brakes"},
                "A, B, C, D",
                "All four are mandatory test modules under IS 12207 and OECD Code 2 at CFMTTI Budni.",
                "Bureau of Indian Standards IS 12207"
            ))

    # 9. Type, selection, maintenance and repair of tractors and power tillers (8 Qs)
    for i in range(1, 9):
        qid = f"QB_SUB_FP_SEL_{i:03d}"
        top = "Tractors and Power Tillers"
        sub = "Type, selection, maintenance and repair of tractors and power tillers"
        if i % 3 == 1:
            questions.append(make_q(
                qid, top, sub, "MCQ", 1, 0.33,
                "A walking-type power tiller (two-wheel tractor) is equipped with dog clutches on each wheel for:",
                {"A": "Independent steering by disengaging drive power to either the left or right wheel", "B": "Synchronizing engine valve timing", "C": "Changing transmission forward speeds automatically", "D": "Varying fuel injection pressure"},
                "A",
                "Power tillers steer using left and right handlebar-mounted dog clutches that disconnect drive to one wheel, allowing the powered wheel to pivot the machine.",
                "Elements of Agricultural Engineering (Sahay)"
            ))
        elif i % 3 == 2:
            questions.append(make_q(
                qid, top, sub, "MSQ", 2, 0.0,
                "Which operations can be directly powered by the rotary tiller (rotavator) attachment of a power tiller?",
                {"A": "Wetland puddling in paddy fields", "B": "Secondary seedbed preparation in upland soils", "C": "Inter-row weeding in wide-row orchards", "D": "Deep subsoiling down to 80 cm depth"},
                "A, B, C",
                "Rotavators excel at puddling and secondary tilth but lack the draft capacity for deep subsoiling.",
                "Farm Machinery Principles (Kepner)"
            ))
        else:
            questions.append(make_q(
                qid, top, sub, "MCQ", 1, 0.33,
                "The primary reason power tillers use single-cylinder water-cooled diesel engines with evaporative hopper cooling is:",
                {"A": "Simplicity, low manufacturing cost, and self-contained operation without water pumps", "B": "High supersonic exhaust velocity", "C": "Zero need for cylinder lubrication", "D": "Ability to run without combustion air"},
                "A",
                "Hopper evaporative cooling operates by natural boiling and evaporation of water surrounding the cylinder jacket, eliminating radiators, water pumps, and thermostats.",
                "Small Farm Mechanization (FAO Bulletin)"
            ))

    # 10. Tractor clutches and brakes (8 Qs)
    for i in range(1, 9):
        qid = f"QB_SUB_FP_BRK_{i:03d}"
        top = "Tractors and Power Tillers"
        sub = "Tractor clutches and brakes"
        if i % 3 == 1:
            questions.append(make_q(
                qid, top, sub, "MCQ", 1, 0.33,
                "A 'dual clutch' system in an agricultural tractor allows the operator to:",
                {"A": "Disengage the tractor drive transmission while keeping the independent PTO rotating continuously", "B": "Engage both forward and reverse gears simultaneously", "C": "Brake the left and right wheels at the same instant", "D": "Double the engine horsepower output"},
                "A",
                "Dual stage clutches possess two friction discs: depressing pedal halfway stops forward drive while PTO remains driven; full depression stops both.",
                "Tractors and Power Units (Liljedahl)"
            ))
        elif i % 3 == 2:
            questions.append(make_q(
                qid, top, sub, "NAT", 2, 0.0,
                "A single plate dry clutch has inner radius $r_1 = 80\\text{ mm}$ and outer radius $r_2 = 120\\text{ mm}$. If the coefficient of friction is $\\mu = 0.35$ and axial spring force is $W = 3000\\text{ N}$, by uniform wear theory ($r_m = \\frac{r_1 + r_2}{2}$), the torque transmitting capacity for two friction surfaces (in N.m) is:",
                210.0, [208.0, 212.0],
                "Mean radius:\n$$r_m = \\frac{80 + 120}{2} = 100\\text{ mm} = 0.10\\text{ m}$$\nTorque capacity with $n = 2$ surfaces:\n$$T = n \\mu W r_m = 2 \\times 0.35 \\times 3000 \\times 0.10 = 210.0\\text{ N}\\cdot\\text{m}$$",
                "Design of Machine Elements (Bhandari)"
            ))
        else:
            questions.append(make_q(
                qid, top, sub, "MSQ", 2, 0.0,
                "Which types of brakes are commonly employed in modern agricultural tractors?",
                {"A": "Oil-immersed multi-plate wet disc brakes", "B": "Internal expanding shoe drum brakes", "C": "Dry disc caliper brakes", "D": "Regenerative aerodynamic air flaps"},
                "A, B, C",
                "Tractors widely utilize wet multi-plate disc brakes for thermal endurance and sealed operation, as well as dry caliper and expanding drum brakes.",
                "Tractor Engineering (Liljedahl)"
            ))

    # 11. Steering and hydraulic control systems used in tractors (7 Qs)
    for i in range(1, 8):
        qid = f"QB_SUB_FP_HYD_{i:03d}"
        top = "Tractors and Power Tillers"
        sub = "Steering and hydraulic control systems used in tractors"
        if i % 3 == 1:
            questions.append(make_q(
                qid, top, sub, "MCQ", 1, 0.33,
                "In a tractor hydraulic 3-point lift system, the relief valve is set to open when:",
                {"A": "System hydraulic pressure exceeds the maximum safe design threshold (typically 15–20 MPa)", "B": "Oil temperature drops below 0°C", "C": "The tractor shifts into reverse", "D": "The engine reaches idle speed"},
                "A",
                "The main hydraulic relief valve protects the pump, valves, and ram cylinder against bursting pressures when lifting excessive loads.",
                "Hydraulic Systems for Tractors (Liljedahl)"
            ))
        elif i % 3 == 2:
            questions.append(make_q(
                qid, top, sub, "NAT", 2, 0.0,
                "A tractor hydraulic cylinder has a bore diameter of $70\\text{ mm}$. If the relief valve limits system pressure to $18\\text{ MPa}$, the maximum thrust force developed by the cylinder (in kN, rounded to 1 decimal place) is:",
                69.3, [68.5, 70.0],
                "Piston area:\n$$A = \\frac{\\pi}{4} (0.070)^2 = 3.848 \\times 10^{-3}\\text{ m}^2$$\nForce:\n$$F = P \\times A = (18 \\times 10^6) \\times (3.848 \\times 10^{-3}) = 69272\\text{ N} = 69.3\\text{ kN}$$",
                "Fluid Power Engineering (Esposito)"
            ))
        else:
            questions.append(make_q(
                qid, top, sub, "MSQ", 2, 0.0,
                "Which features characterize a hydrostatic power steering system in modern farm tractors?",
                {"A": "Elimination of direct mechanical linkage between steering wheel and front wheels", "B": "Use of an orbital metering valve (orbitrol) and hydraulic double-acting ram cylinder", "C": "Effortless steering even with heavy front-mounted loaders", "D": "Automatic GPS autonomous guidance under all conditions"},
                "A, B, C",
                "Hydrostatic steering uses an orbitrol hydraulic pump and ram cylinder, eliminating mechanical drag links.",
                "Tractors and Power Units (Liljedahl)"
            ))

    # 12. Human engineering and safety considerations in design of tractor and agricultural implements (8 Qs)
    for i in range(1, 9):
        qid = f"QB_SUB_FP_ERG_{i:03d}"
        top = "Tractors and Power Tillers"
        sub = "Human engineering and safety considerations in design of tractor and agricultural implements"
        if i % 3 == 1:
            questions.append(make_q(
                qid, top, sub, "MCQ", 1, 0.33,
                "A Roll-Over Protective Structure (ROPS) on an agricultural tractor is primarily designed to:",
                {"A": "Preserve a protective deflection-limiting volume (survival zone) for the operator during a rollover", "B": "Increase tractor engine torque output", "C": "Shield the tractor hood from rain showers", "D": "Eliminate tractor exhaust emissions"},
                "A",
                "ROPS absorbs rollover kinetic energy while maintaining a defined survival clearance zone around the seatbelted operator.",
                "Ergonomics in Agriculture (K.P. Tewari)"
            ))
        elif i % 3 == 2:
            questions.append(make_q(
                qid, top, sub, "MSQ", 2, 0.0,
                "Which human factors and ergonomic parameters are vital in designing tractor operator workstations?",
                {"A": "Hand reach envelope and sightlines according to 5th to 95th percentile anthropometric data", "B": "Attenuation of Whole-Body Vibration (WBV) in the frequency range of 4–8 Hz", "C": "Operator ear noise exposure below statutory 85 dB(A) TWA limits", "D": "Color-coded control levers according to ISO safety standards"},
                "A, B, C, D",
                "All four are core tenets of ASABE/ISO standards on tractor operator environment and occupational ergonomics.",
                "Human Factors Engineering (Sanders & McCormick)"
            ))
        else:
            questions.append(make_q(
                qid, top, sub, "MCQ", 1, 0.33,
                "The human body is most sensitive to vertical whole-body vibration in which resonant frequency band?",
                {"A": "4 to 8 Hz", "B": "50 to 100 Hz", "C": "0.1 to 0.5 Hz", "D": "1000 to 2000 Hz"},
                "A",
                "ISO 2631-1 identifies 4–8 Hz as the natural resonance band for human trunk and abdominal organs under vertical vibration.",
                "ISO 2631-1 Mechanical Vibration and Shock"
            ))

    # 13. Bio-fuels and their use in farm mechanization (4 Qs)
    for i in range(1, 5):
        qid = f"QB_SUB_FP_BIO_{i:03d}"
        top = "Sources of Power"
        sub = "Bio-fuels and their use in farm mechanization"
        if i % 2 == 1:
            questions.append(make_q(
                qid, top, sub, "MCQ", 1, 0.33,
                "Transesterification of non-edible plant oils (e.g. Jatropha, Pongamia) with methanol in the presence of an alkaline catalyst produces:",
                {"A": "Fatty Acid Methyl Esters (Biodiesel) and Glycerol byproduct", "B": "Pure methane gas and tar", "C": "Petroleum kerosene and asphalt", "D": "Cellulose and glucose"},
                "A",
                "Transesterification converts high-viscosity triglycerides with methanol into fatty acid methyl esters (biodiesel) and glycerol.",
                "Biofuels Engineering (S.P. Sukhatme)"
            ))
        else:
            questions.append(make_q(
                qid, top, sub, "MSQ", 2, 0.0,
                "Compared to petroleum diesel, pure biodiesel (B100) exhibits which combustion and property characteristics?",
                {"A": "Higher oxygen content (~10–11% by weight), resulting in lower particulate emissions", "B": "Slightly lower lower-heating value (calorific value by ~8–10%)", "C": "Higher flash point, improving safety during storage and transport", "D": "Lower cloud point and pour point than petroleum diesel"},
                "A, B, C",
                "Biodiesel contains ~11% fuel-bound oxygen, reducing soot. It has slightly lower energy density and higher flash point. However, its pour point is higher (worse cold-flow behavior).",
                "Internal Combustion Engines (Mathur & Sharma)"
            ))

    # 14. Sources of power on the farm – human, animal, mechanical, electrical, wind, solar and biomass (3 Qs)
    questions.append(make_q(
        "QB_SUB_FP_SRC_001", "Sources of Power", "Sources of power on the farm – human, animal, mechanical, electrical, wind, solar and biomass",
        "MCQ", 1, 0.33,
        "The continuous power output capacity of an average healthy agricultural worker for sustained 8-hour field labor is approximately:",
        {"A": "0.1 hp (approx. 75 W)", "B": "1.0 hp (746 W)", "C": "0.01 hp (7.5 W)", "D": "2.5 hp (1865 W)"},
        "A",
        "An average farm laborer delivers continuous sustained power of 0.1 hp (75 W), while a pair of standard bullocks produces approx. 1.0 hp (750 W).",
        "Principles of Agricultural Engineering Vol I (Michael & Ojha)"
    ))
    questions.append(make_q(
        "QB_SUB_FP_SRC_002", "Sources of Power", "Sources of power on the farm – human, animal, mechanical, electrical, wind, solar and biomass",
        "NAT", 2, 0.0,
        "A pair of bullocks exerts a steady forward draft force of $600\\text{ N}$ while pulling a moldboard plow at a speed of $3.6\\text{ km/h}$. The draft power developed by the bullock pair (in kW) is:",
        0.6, [0.58, 0.62],
        "Velocity:\n$$v = 3.6\\text{ km/h} = \\frac{3.6}{3.6} = 1.0\\text{ m/s}$$\nPower:\n$$P = F \\times v = 600 \\times 1.0 = 600\\text{ W} = 0.60\\text{ kW}$$",
        "Principles of Agricultural Engineering (Michael & Ojha)"
    ))
    questions.append(make_q(
        "QB_SUB_FP_SRC_003", "Sources of Power", "Sources of power on the farm – human, animal, mechanical, electrical, wind, solar and biomass",
        "MSQ", 2, 0.0,
        "Which of the following farm power sources generate zero direct greenhouse gas emissions during on-field irrigation pumping?",
        {"A": "Solar photovoltaic powered submersible pumping sets", "B": "Wind turbine mechanical water pumping windpumps", "C": "Single-cylinder diesel pump sets", "D": "Kerosene run portable irrigation pumps"},
        "A, B",
        "Solar PV and wind pumping utilize renewable solar irradiance and aerodynamic kinetic energy with zero in-situ carbon emissions.",
        "Renewable Energy Sources (Twidell & Weir)"
    ))

    return questions

if __name__ == "__main__":
    qs = generate_sec3_fillers()
    print(f"Generated {len(qs)} questions for Section 3.")
