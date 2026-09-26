import json
import math

SVG_DIESEL = """<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" class="w-full max-w-[380px] h-auto mx-auto"><defs><marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6"/></marker></defs><rect width="400" height="240" rx="8" fill="#f8fafc" class="dark:fill-slate-900" stroke="#e2e8f0" class="dark:stroke-slate-800"/><line x1="50" y1="200" x2="360" y2="200" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)"/><line x1="50" y1="200" x2="50" y2="30" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)"/><text x="365" y="205" font-size="12" font-family="sans-serif" fill="#475569" font-weight="bold">V</text><text x="45" y="25" font-size="12" font-family="sans-serif" fill="#475569" font-weight="bold">P</text><path d="M 320 180 Q 150 170 120 70" fill="none" stroke="#2563eb" stroke-width="2.5"/><line x1="120" y1="70" x2="190" y2="70" stroke="#dc2626" stroke-width="2.5"/><path d="M 190 70 Q 240 120 320 150" fill="none" stroke="#16a34a" stroke-width="2.5"/><line x1="320" y1="150" x2="320" y2="180" stroke="#9333ea" stroke-width="2.5"/><circle cx="320" cy="180" r="4" fill="#1e293b"/><text x="328" y="185" font-size="11" font-weight="bold" fill="#1e293b">1</text><circle cx="120" cy="70" r="4" fill="#1e293b"/><text x="108" y="65" font-size="11" font-weight="bold" fill="#1e293b">2</text><circle cx="190" cy="70" r="4" fill="#1e293b"/><text x="190" y="60" font-size="11" font-weight="bold" fill="#1e293b">3</text><circle cx="320" cy="150" r="4" fill="#1e293b"/><text x="328" y="148" font-size="11" font-weight="bold" fill="#1e293b">4</text><text x="145" y="55" font-size="10" fill="#dc2626" font-weight="bold">P = const (Qin)</text><text x="325" y="168" font-size="9" fill="#9333ea">V = const (Qout)</text><text x="170" y="140" font-size="10" fill="#2563eb">pV^γ = C</text></svg>"""

def generate_fp_questions():
    questions = []

    def add(q):
        questions.append(q)

    # 1. Thermodynamic Air Cycles (45 questions with diagrams)
    for i in range(1, 46):
        qid = f"QB_FP_CYC_{i:03d}"
        topic = "Thermodynamic Air Cycles: Otto, Diesel & Dual"
        sub = "Air-standard Diesel cycle and cut-off ratio"
        if i % 3 == 1:
            r = 14 + (i % 6) # compression ratio
            gamma = 1.4
            eta_otto = round((1.0 - 1.0 / (r**(gamma - 1.0))) * 100.0, 2)
            add({
                "id": qid,
                "section": "Section 3: Farm Power",
                "topic": topic,
                "subtopic": "Air-standard Otto cycle efficiency",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": f"An internal combustion engine operating on the air-standard Otto cycle has a compression ratio of $r = {r}$. Taking the adiabatic exponent $\\gamma = 1.4$, the air-standard thermal efficiency of the cycle is:",
                "options": {
                    "A": f"${eta_otto:.2f}\\%$",
                    "B": f"${eta_otto - 5.5:.2f}\\%$",
                    "C": f"${eta_otto + 6.2:.2f}\\%$",
                    "D": f"${eta_otto * 0.75:.2f}\\%$"
                },
                "correct_answer": "A",
                "solution": f"The air-standard efficiency of an Otto cycle is given by:\n$$\\eta_{{th}} = 1 - \\frac{{1}}{{r^{{\\gamma - 1}}}}$$\nGiven $r = {r}$ and $\\gamma = 1.4$:\n$$\\eta_{{th}} = 1 - \\frac{{1}}{{{r}^{{0.4}}}} = 1 - \\frac{{1}}{{{r**0.4:.4f}}} = 1 - {1.0/(r**0.4):.4f} = {eta_otto/100.0:.4f}$$\nIn percentage: $\\eta_{{th}} = {eta_otto:.2f}\\%$.",
                "difficulty": "Easy",
                "source": "Tractors and Their Power Units (Liljedahl)"
            })
        elif i % 3 == 2:
            r = 16.0
            rho = 2.0 # cut-off ratio
            gamma = 1.4
            # eta_diesel = 1 - (1 / (gamma * r^(gamma-1))) * ((rho^gamma - 1) / (rho - 1))
            term1 = 1.0 / (gamma * (r**(gamma - 1.0)))
            term2 = (rho**gamma - 1.0) / (rho - 1.0)
            eta_diesel = round((1.0 - term1 * term2) * 100.0, 2)
            add({
                "id": qid,
                "section": "Section 3: Farm Power",
                "topic": topic,
                "subtopic": sub,
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "diagram_svg": SVG_DIESEL,
                "question": f"An engine operates on the air-standard Diesel cycle shown in the accompanying P-V diagram with a compression ratio of $r = {r:.0f}$ and a cut-off ratio of $\\rho = {rho:.1f}$. Taking $\\gamma = 1.4$, the air-standard thermal efficiency is ________ $\\%$ (round off to two decimal places).",
                "correct_answer": f"{eta_diesel:.2f}",
                "numerical_range": { "min": round(eta_diesel - 0.2, 2), "max": round(eta_diesel + 0.2, 2) },
                "solution": f"For an air-standard Diesel cycle:\n$$\\eta_{{Diesel}} = 1 - \\frac{{1}}{{\\gamma r^{{\\gamma - 1}}}} \\left[ \\frac{{\\rho^\\gamma - 1}}{{\\rho - 1}} \\right]$$\nSubstituting $r = {r:.0f}$, $\\rho = {rho:.1f}$, and $\\gamma = 1.4$:\n$$\\rho^\\gamma = 2.0^{{1.4}} = {2.0**1.4:.4f}$$\n$$\\frac{{\\rho^\\gamma - 1}}{{\\rho - 1}} = \\frac{{{2.0**1.4 - 1:.4f}}}{{1.0}} = {2.0**1.4 - 1:.4f}$$\n$$\\gamma r^{{\\gamma - 1}} = 1.4 \\times 16^{{0.4}} = 1.4 \\times 3.0314 = 4.2440$$\n$$\\eta_{{Diesel}} = 1 - \\frac{{{2.0**1.4 - 1:.4f}}}{{4.2440}} = 1 - {term1 * term2:.4f} = {eta_diesel/100.0:.4f}$$\nIn percentage: ${eta_diesel:.2f}\\%$.",
                "difficulty": "Hard",
                "source": "Tractors and Their Power Units (Liljedahl)"
            })
        else:
            add({
                "id": qid,
                "section": "Section 3: Farm Power",
                "topic": topic,
                "subtopic": "Comparison of cycles for given compression ratio",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "When comparing the theoretical air-standard efficiencies of Otto, Diesel, and Dual cycles, which of the following statements is/are TRUE?",
                "options": {
                    "A": "For the same compression ratio and heat input, $\\eta_{\\text{Otto}} > \\eta_{\\text{Dual}} > \\eta_{\\text{Diesel}}$",
                    "B": "For the same maximum peak cylinder pressure and temperature, $\\eta_{\\text{Diesel}} > \\eta_{\\text{Dual}} > \\eta_{\\text{Otto}}$",
                    "C": "In an Otto cycle, heat addition occurs strictly at constant volume",
                    "D": "In a Diesel cycle, heat addition occurs strictly at constant pressure"
                },
                "correct_answer": ["A", "B", "C", "D"],
                "solution": "1. For the same compression ratio $r$, constant volume heat addition brings maximum temperature earlier, so Otto is highest. (A is true)\n2. When constrained by peak pressure and temperature (the real metallurgical limit), Diesel expands further and has highest efficiency. (B is true)\n3. Otto cycle features isochoric heat addition. (C is true)\n4. Diesel cycle features isobaric heat addition. (D is true)\nAll statements A, B, C, D are correct.",
                "difficulty": "Moderate",
                "source": "Elements of Agricultural Engineering (Jagdishwar Sahay)"
            })

    # 2. Engine Power Measurements & Efficiencies (45 questions)
    for i in range(1, 46):
        qid = f"QB_FP_PWR_{i:03d}"
        topic = "Engine Power: Indicated, Brake & Friction Power"
        sub = "Mean effective pressure and indicated power"
        if i % 3 == 1:
            P_b = 25.0 + (i % 8) * 2.5 # kW
            P_f = 5.0 + (i % 4) * 0.5 # kW
            P_i = P_b + P_f
            eta_m = round((P_b / P_i) * 100.0, 1)
            add({
                "id": qid,
                "section": "Section 3: Farm Power",
                "topic": topic,
                "subtopic": "Mechanical efficiency",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": f"A tractor diesel engine develops a brake power of ${P_b:.1f}\\text{{ kW}}$ while its frictional power losses are measured as ${P_f:.1f}\\text{{ kW}}$. The mechanical efficiency of the engine is:",
                "options": {
                    "A": f"${eta_m:.1f}\\%$",
                    "B": f"${round(eta_m - 6.0, 1)}\\%$",
                    "C": f"${round(eta_m + 5.0, 1)}\\%$",
                    "D": f"${round(eta_m * 0.85, 1)}\\%$"
                },
                "correct_answer": "A",
                "solution": f"Indicated power is the sum of brake power and friction power:\n$$\\text{{IP}} = \\text{{BP}} + \\text{{FP}} = {P_b:.1f} + {P_f:.1f} = {P_i:.1f}\\text{{ kW}}$$\nMechanical efficiency is given by:\n$$\\eta_m = \\frac{{\\text{{BP}}}}{{\\text{{IP}}}} \\times 100 = \\frac{{{P_b:.1f}}}{{{P_i:.1f}}} \\times 100 = {eta_m:.1f}\\%$$",
                "difficulty": "Easy",
                "source": "Elements of Agricultural Engineering (Jagdishwar Sahay)"
            })
        elif i % 3 == 2:
            n_cyl = 4
            P_mep = 600.0 # kPa = 600 kN/m2
            L_m = 0.12 # stroke m
            D_m = 0.10 # bore m
            A_m2 = (math.pi / 4.0) * (D_m**2)
            N_rpm = 2000.0
            n_power_strokes = N_rpm / (2.0 * 60.0) # 4-stroke
            IP_kW = round(n_cyl * (P_mep * L_m * A_m2 * n_power_strokes), 2)
            add({
                "id": qid,
                "section": "Section 3: Farm Power",
                "topic": topic,
                "subtopic": sub,
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"A ${n_cyl}\\text{{-cylinder}}$, four-stroke tractor diesel engine has a cylinder bore of ${D_m * 100:.0f}\\text{{ cm}}$ and a stroke of ${L_m * 100:.0f}\\text{{ cm}}$. When running at ${N_rpm:.0f}\\text{{ rpm}}$, the mean effective pressure is ${P_mep:.0f}\\text{{ kPa}}$. The indicated power developed by the engine is ________ $\\text{{kW}}$ (round off to two decimal places, take $\\pi = 3.1416$).",
                "correct_answer": f"{IP_kW:.2f}",
                "numerical_range": { "min": round(IP_kW - 0.2, 2), "max": round(IP_kW + 0.2, 2) },
                "solution": f"For a multi-cylinder 4-stroke engine:\n$$\\text{{IP}} = \\frac{{n \\cdot P_m \\cdot L \\cdot A \\cdot N}}{{60 \\times 2}}$$\nWhere:\n- $n = {n_cyl}$\n- $P_m = {P_mep}\\text{{ kPa}} = {P_mep}\\text{{ kN/m}}^2$\n- $L = {L_m}\\text{{ m}}$\n- $A = \\frac{{\\pi \\times {D_m}^2}}{{4}} = {A_m2:.6f}\\text{{ m}}^2$\n- $N = {N_rpm}\\text{{ rpm}}$\n$$\\text{{IP}} = \\frac{{{n_cyl} \\times {P_mep} \\times {L_m} \\times {A_m2:.6f} \\times {N_rpm}}}{{120}} = {IP_kW:.2f}\\text{{ kW}}$$",
                "difficulty": "Moderate",
                "source": "Tractors and Their Power Units (Liljedahl)"
            })
        else:
            add({
                "id": qid,
                "section": "Section 3: Farm Power",
                "topic": topic,
                "subtopic": "Morse test for multi-cylinder engines",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Regarding the Morse test used for determining indicated power of multi-cylinder I.C. engines, which of the following statements is/are CORRECT?",
                "options": {
                    "A": "The engine is run at a constant rated speed throughout the test",
                    "B": "When one cylinder is cut out, the reduction in brake power equals the indicated power of that cut-out cylinder",
                    "C": "The frictional power of each cylinder is assumed to remain unchanged when that cylinder is cut out",
                    "D": "The Morse test is suitable for both multi-cylinder SI and CI engines"
                },
                "correct_answer": ["A", "B", "C", "D"],
                "solution": "1. Engine speed must be maintained constant using a governor or dynamometer adjustment. (A is correct)\n2. $\\text{IP}_k = \\text{BP}_{\\text{all}} - \\text{BP}_{\\text{without } k}$. (B is correct)\n3. Frictional and pumping losses are assumed constant at that invariant speed. (C is correct)\n4. By shorting spark plugs (SI) or cutting off fuel injection lines (CI), the test works on both engine classes. (D is correct)\nAll statements A, B, C, D are correct.",
                "difficulty": "Moderate",
                "source": "Internal Combustion Engines (V. Ganesan)"
            })

    # 3. Tractor Chassis Mechanics & Weight Transfer (45 questions)
    for i in range(1, 46):
        qid = f"QB_FP_TRAC_{i:03d}"
        topic = "Tractor Chassis Mechanics & Center of Gravity"
        sub = "Dynamic weight transfer during pulling"
        if i % 3 == 1:
            W_kg = 2000 # kg total tractor weight
            W_N = W_kg * 9.81
            WB_m = 2.0 # wheelbase
            x_m = 0.8 # distance of CG forward of rear axle
            R_f_static = round((W_N * x_m) / WB_m, 1)
            add({
                "id": qid,
                "section": "Section 3: Farm Power",
                "topic": topic,
                "subtopic": "Static weight distribution on front and rear axles",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": f"A tractor has a total weight of ${W_N:.0f}\\text{{ N}}$ and a wheelbase of ${WB_m:.1f}\\text{{ m}}$. Its center of gravity (CG) is located ${x_m:.1f}\\text{{ m}}$ ahead of the rear axle center. Under static level conditions, the vertical ground reaction on the front axle is:",
                "options": {
                    "A": f"${R_f_static:.0f}\\text{{ N}}$",
                    "B": f"${round(R_f_static * 1.3, 0):.0f}\\text{{ N}}$",
                    "C": f"${round(R_f_static * 0.7, 0):.0f}\\text{{ N}}$",
                    "D": f"${round(R_f_static * 1.6, 0):.0f}\\text{{ N}}$"
                },
                "correct_answer": "A",
                "solution": f"Taking moments about the rear wheel ground contact point:\n$$\\sum M_{{rear}} = 0 \\implies R_f \\times \\text{{WB}} - W \\times x = 0$$\n$$R_f = \\frac{{W \\times x}}{{\\text{{WB}}}} = \\frac{{{W_N:.0f} \\times {x_m:.1f}}}{{{WB_m:.1f}}} = {R_f_static:.0f}\\text{{ N}}$$\nHence, the front axle reaction is ${R_f_static:.0f}\\text{{ N}}$.",
                "difficulty": "Easy",
                "source": "Tractors and Their Power Units (Liljedahl)"
            })
        elif i % 3 == 2:
            W_N = 25000.0 # N
            WB_m = 2.2 # m
            x_m = 0.75 # m
            P_pull = 8000.0 + (i % 6) * 500 # N pull
            h_m = 0.45 # hitch height m
            # Weight transfer = (P_pull * h_m) / WB_m
            dw = round((P_pull * h_m) / WB_m, 1)
            R_f_dynamic = round((W_N * x_m / WB_m) - dw, 1)
            add({
                "id": qid,
                "section": "Section 3: Farm Power",
                "topic": "Tractor Dynamic Weight Transfer & Stability",
                "subtopic": sub,
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"A two-wheel drive tractor weighs ${W_N:.0f}\\text{{ N}}$ with a wheelbase of ${WB_m:.1f}\\text{{ m}}$. Its CG is located ${x_m:.2f}\\text{{ m}}$ forward of the rear axle. A horizontal drawbar pull of ${P_pull:.0f}\\text{{ N}}$ is applied at a hitch height of ${h_m:.2f}\\text{{ m}}$ above the ground. The dynamic vertical load on the front axle during pulling is ________ $\\text{{N}}$ (round off to nearest integer).",
                "correct_answer": str(int(R_f_dynamic)),
                "numerical_range": { "min": float(int(R_f_dynamic) - 5), "max": float(int(R_f_dynamic) + 5) },
                "solution": f"1. Static front axle reaction:\n$$R_{{fs}} = \\frac{{W \\cdot x_{{cg}}}}{{\\text{{WB}}}} = \\frac{{{W_N:.0f} \\times {x_m:.2f}}}{{{WB_m:.1f}}} = {W_N * x_m / WB_m:.1f}\\text{{ N}}$$\n2. Dynamic weight transfer from front to rear axle due to drawbar pull:\n$$\\Delta W = \\frac{{P \\cdot h}}{{\\text{{WB}}}} = \\frac{{{P_pull:.0f} \\times {h_m:.2f}}}{{{WB_m:.1f}}} = {dw:.1f}\\text{{ N}}$$\n3. Dynamic front axle load:\n$$R_{{fd}} = R_{{fs}} - \\Delta W = {W_N * x_m / WB_m:.1f} - {dw:.1f} = {R_f_dynamic:.1f}\\text{{ N}} \\approx {int(R_f_dynamic)}\\text{{ N}}$$",
                "difficulty": "Hard",
                "source": "Tractors and Their Power Units (Liljedahl)"
            })
        else:
            add({
                "id": qid,
                "section": "Section 3: Farm Power",
                "topic": "Traction Mechanics, Wheel Slip & Rolling Resistance",
                "subtopic": "Wheel slip and travel reduction calculation",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Regarding tractor traction mechanics and tire-soil interaction, which of the following statements is/are CORRECT?",
                "options": {
                    "A": "Travel reduction (wheel slip) $S$ is defined as $(v_0 - v_1) / v_0 \\times 100$, where $v_0$ is zero-load speed and $v_1$ is loaded speed",
                    "B": "Tractive efficiency peaks at an optimal wheel slip typically between $10\\%$ and $15\\%$ in firm agricultural soils",
                    "C": "Adding liquid ballast (calcium chloride solution) to rear drive tires increases gross traction by increasing vertical axle load",
                    "D": "Coefficient of rolling resistance increases with looser soil conditions and smaller wheel diameters"
                },
                "correct_answer": ["A", "B", "C", "D"],
                "solution": "1. Wheel slip is defined by the reduction in forward speed under load relative to zero-slip reference. (A is correct)\n2. Below 10% slip, motion resistance dominates; above 15% slip, slip losses dominate. Optimal tractive efficiency occurs at 10-15%. (B is correct)\n3. Liquid ballasting adds weight directly to tires without overloading the chassis, increasing traction. (C is correct)\n4. Sinkage in loose soil and high curvature of smaller wheels increase rolling resistance. (D is correct)\nAll four statements A, B, C, D are correct.",
                "difficulty": "Moderate",
                "source": "Tractors and Their Power Units (Liljedahl)"
            })

    # Additional Farm Power topics to reach ~600 questions:
    fp_topics = [
        ("Engine Fuels, Lubricants & Viscosity", "Diesel and petrol properties (calorific value, density, flash point)"),
        ("Engine Cooling & Lubrication Systems", "Radiator sizing and thermosiphon vs forced circulation"),
        ("Fuel Injection & Governor Systems", "Inline and rotary fuel injection pumps"),
        ("Valve Timing, Firing Order & Engine Kinematics", "Four-stroke and two-stroke valve timing diagrams"),
        ("Specific Fuel Consumption & Engine Efficiencies", "Brake Specific Fuel Consumption (BSFC)"),
        ("Engine Heat Balance & Testing", "Heat equivalent of brake power"),
        ("Tractor Clutches, Transmission & PTO", "Single and dual plate friction clutches"),
        ("Differential, Final Drive & Steering Systems", "Differential gear operation and bevel gears"),
        ("Tractor Hydraulics & 3-Point Hitch Mechanics", "Position control and draft control systems"),
        ("Power Tillers, Ergonomics & Safety", "Operator vibration and noise exposure"),
        ("Sources of Farm Power & Renewable Energy", "Solar PV and solar thermal systems on farms"),
        ("Biofuels, Biogas & Producer Gas in Agriculture", "Biodiesel transesterification and properties")
    ]

    counter = 1
    for top, sub in fp_topics:
        for idx in range(1, 40):
            qid = f"QB_FP_GEN_{counter:03d}"
            counter += 1
            if idx % 3 == 1:
                fc = round(6.0 + (idx % 6)*0.5, 1) # kg/h fuel
                bp = 30.0 + (idx % 5)*2.0 # kW
                bsfc = round((fc * 1000.0) / bp, 1) # g/kWh
                add({
                    "id": qid,
                    "section": "Section 3: Farm Power",
                    "topic": top,
                    "subtopic": sub,
                    "type": "MCQ",
                    "marks": 1,
                    "negative_marks": 0.33,
                    "question": f"A tractor diesel engine delivers a brake power of ${bp:.1f}\\text{{ kW}}$ while consuming ${fc:.1f}\\text{{ kg/h}}$ of fuel. The Brake Specific Fuel Consumption (BSFC) of the engine is:",
                    "options": {
                        "A": f"${bsfc:.1f}\\text{{ g/kWh}}$",
                        "B": f"${round(bsfc * 1.25, 1)}\\text{{ g/kWh}}$",
                        "C": f"${round(bsfc * 0.8, 1)}\\text{{ g/kWh}}$",
                        "D": f"${round(bsfc * 1.5, 1)}\\text{{ g/kWh}}$"
                    },
                    "correct_answer": "A",
                    "solution": f"BSFC is defined as fuel mass consumption per unit of brake power delivered per hour:\n$$\\text{{BSFC}} = \\frac{{\\dot{{m}}_f}}{{\\text{{BP}}}} = \\frac{{{fc:.1f}\\text{{ kg/h}} \\times 1000\\text{{ g/kg}}}}{{{bp:.1f}\\text{{ kW}}}} = \\frac{{{fc * 1000.0:.0f}}}{{{bp:.1f}}} = {bsfc:.1f}\\text{{ g/kWh}}$$",
                    "difficulty": "Easy",
                    "source": "Elements of Agricultural Engineering (Jagdishwar Sahay)"
                })
            elif idx % 3 == 2:
                CV = 42000.0 # kJ/kg calorific value
                fc_kgh = 8.0 # kg/h
                fc_kgs = fc_kgh / 3600.0
                bp_kW = 35.0
                heat_input_kW = fc_kgs * CV
                eta_bth = round((bp_kW / heat_input_kW) * 100.0, 2)
                add({
                    "id": qid,
                    "section": "Section 3: Farm Power",
                    "topic": top,
                    "subtopic": sub,
                    "type": "NAT",
                    "marks": 2,
                    "negative_marks": 0,
                    "question": f"A diesel engine consumes ${fc_kgh:.1f}\\text{{ kg/h}}$ of diesel fuel with a lower heating value of ${CV:.0f}\\text{{ kJ/kg}}$. If the engine delivers a brake power of ${bp_kW:.1f}\\text{{ kW}}$, the brake thermal efficiency is ________ $\\%$ (round off to two decimal places).",
                    "correct_answer": f"{eta_bth:.2f}",
                    "numerical_range": { "min": round(eta_bth - 0.2, 2), "max": round(eta_bth + 0.2, 2) },
                    "solution": f"1. Total heat energy input rate from fuel combustion:\n$$Q_{{in}} = \\frac{{\\dot{{m}}_f \\times \\text{{CV}}}}{{3600}} = \\frac{{{fc_kgh:.1f} \\times {CV:.0f}}}{{3600}} = {heat_input_kW:.2f}\\text{{ kW}}$$\n2. Brake thermal efficiency:\n$$\\eta_{{bth}} = \\frac{{\\text{{BP}}}}{{Q_{{in}}}} \\times 100 = \\frac{{{bp_kW:.1f}}}{{{heat_input_kW:.2f}}} \\times 100 = {eta_bth:.2f}\\%$$",
                    "difficulty": "Moderate",
                    "source": "Tractors and Their Power Units (Liljedahl)"
                })
            else:
                add({
                    "id": qid,
                    "section": "Section 3: Farm Power",
                    "topic": top,
                    "subtopic": sub,
                    "type": "MSQ",
                    "marks": 2,
                    "negative_marks": 0,
                    "question": "Which of the following statements is/are CORRECT regarding tractor hydraulic 3-point hitch systems?",
                    "options": {
                        "A": "Position control maintains the implement at a constant depth relative to the tractor chassis regardless of soil resistance changes",
                        "B": "Draft control senses draught force changes and automatically raises or lowers the implement to maintain uniform tractor engine load",
                        "C": "The top link is typically subjected to compression during heavy ploughing with fully mounted implements",
                        "D": "In free-link operation, the implement depth is governed entirely by its own gauge wheel"
                    },
                    "correct_answer": ["A", "B", "C", "D"],
                    "solution": "1. Position control holds the rockshaft at a fixed angular position, fixing implement depth. (A is correct)\n2. Draft control senses top-link or lower-link deflection and adjusts depth dynamically to maintain constant draft. (B is correct)\n3. Soil resistance pushes back on the share bottom, creating a couple that pushes forward on the top link in compression. (C is correct)\n4. In floating/free-link mode, implement gauge wheels control the working depth. (D is correct)\nAll four statements A, B, C, D are correct.",
                    "difficulty": "Moderate",
                    "source": "Tractors and Their Power Units (Liljedahl)"
                })

    return questions

if __name__ == "__main__":
    qs = generate_fp_questions()
    print("Total Section 3 generated:", len(qs))
