import json
import math

SVG_HEX = """<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" class="w-full max-w-[380px] h-auto mx-auto"><rect width="400" height="240" rx="8" fill="#f8fafc" class="dark:fill-slate-900" stroke="#e2e8f0" class="dark:stroke-slate-800"/><line x1="60" y1="200" x2="360" y2="200" stroke="#64748b" stroke-width="1.5"/><line x1="60" y1="200" x2="60" y2="30" stroke="#64748b" stroke-width="1.5"/><text x="180" y="220" font-size="11" font-family="sans-serif" fill="#475569" font-weight="bold">Length / Area of Heat Exchanger (x)</text><text x="25" y="25" font-size="11" font-family="sans-serif" fill="#475569" font-weight="bold">Temperature T (°C)</text><path d="M 80 60 L 340 120" stroke="#ef4444" stroke-width="2.5" fill="none"/><text x="75" y="50" font-size="10" fill="#ef4444" font-weight="bold">T_h,in</text><text x="345" y="125" font-size="10" fill="#ef4444" font-weight="bold">T_h,out</text><path d="M 340 180 L 80 110" stroke="#3b82f6" stroke-width="2.5" fill="none"/><text x="345" y="190" font-size="10" fill="#3b82f6" font-weight="bold">T_c,in</text><text x="65" y="115" font-size="10" fill="#3b82f6" font-weight="bold">T_c,out</text><line x1="80" y1="65" x2="80" y2="105" stroke="#64748b" stroke-dasharray="2,2"/><text x="85" y="88" font-size="9" fill="#64748b">ΔT_1</text><line x1="340" y1="125" x2="340" y2="175" stroke="#64748b" stroke-dasharray="2,2"/><text x="315" y="155" font-size="9" fill="#64748b">ΔT_2</text><text x="120" y="145" font-size="10" font-weight="bold" fill="#0f172a" class="dark:fill-white">LMTD = (ΔT_1 - ΔT_2) / ln(ΔT_1 / ΔT_2)</text></svg>"""

def generate_dfe_questions():
    questions = []
    def add(q):
        questions.append(q)

    SEC = "Section 7: Dairy and Food Engineering"

    # 1. Steady-State Conduction & Shape Factors (43 questions)
    for i in range(1, 44):
        qid = f"QB_DFE_CND_{i:03d}"
        topic = "Steady-State Conduction & Shape Factors"
        sub = "Composite cold storage wall and critical insulation radius"
        if i % 3 == 1:
            k_ins = 0.04 # W/m K
            L_ins = 0.10 + (i % 5) * 0.02 # m
            A_wall = 25.0 # m2
            T_out = 35.0 # C
            T_in = 4.0 # C
            # q = k * A * (T_out - T_in) / L
            q_flow = round((k_ins * A_wall * (T_out - T_in)) / L_ins, 2)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Conduction heat gain through cold room insulation",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"A cold storage wall of surface area $A = {A_wall:.0f}\\text{{ m}}^2$ is insulated with polyurethane foam of thickness $L = {L_ins*100:.0f}\\text{{ cm}}$ and thermal conductivity $k = {k_ins:.2f}\\text{{ W/(m}}\\,\\text{{K)}}$. If the outer surface temperature is maintained at ${T_out:.0f}^\\circ\\text{{C}}$ and the inner surface at ${T_in:.0f}^\\circ\\text{{C}}$, the steady-state heat ingress through the wall is ________ $\\text{{W}}$ (round off to two decimal places).",
                "correct_answer": f"{q_flow:.2f}",
                "numerical_range": { "min": round(q_flow - 0.5, 2), "max": round(q_flow + 0.5, 2) },
                "solution": f"From Fourier's 1D steady conduction law:\n$$q = \\frac{{k A (T_{{out}} - T_{{in}})}}{{L}}$$\nGiven $k = {k_ins}\\text{{ W/(m K)}}$, $A = {A_wall:.0f}\\text{{ m}}^2$, $\\Delta T = {T_out:.0f} - {T_in:.0f} = {T_out - T_in:.0f}^\\circ\\text{{C}}$, and $L = {L_ins:.2f}\\text{{ m}}$:\n$$q = \\frac{{{k_ins} \\times {A_wall:.0f} \\times {T_out - T_in:.0f}}}{{{L_ins:.2f}}} = \\frac{{{k_ins * A_wall * (T_out - T_in):.2f}}}{{{L_ins:.2f}}} = {q_flow:.2f}\\text{{ W}}$$",
                "difficulty": "Moderate",
                "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
            })
        elif i % 3 == 2:
            k_pipe_ins = 0.05 # W/m K
            h_conv = 10.0 # W/m2 K
            # rc = k / h = 0.05 / 10 = 0.005 m = 5 mm
            rc_mm = round((k_pipe_ins / h_conv) * 1000.0, 1)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Critical radius of insulation for cylindrical pipe",
                "type": "NAT",
                "marks": 1,
                "negative_marks": 0,
                "question": f"A steam pipe in a dairy plant is to be covered with insulation having thermal conductivity $k = {k_pipe_ins:.2f}\\text{{ W/(m}}\\,\\text{{K)}}$. The outer convective heat transfer coefficient with ambient air is $h = {h_conv:.1f}\\text{{ W/(m}}^2\\,\\text{{K)}}$. The critical radius of insulation is ________ $\\text{{mm}}$ (round off to one decimal place).",
                "correct_answer": f"{rc_mm:.1f}",
                "numerical_range": { "min": round(rc_mm - 0.2, 1), "max": round(rc_mm + 0.2, 1) },
                "solution": f"The critical radius of insulation for a circular cylinder is:\n$$r_c = \\frac{{k}}{{h}}$$\nGiven $k = {k_pipe_ins:.2f}\\text{{ W/(m K)}}$ and $h = {h_conv:.1f}\\text{{ W/(m}}^2\\text{{ K)}}$:\n$$r_c = \\frac{{{k_pipe_ins}}}{{{h_conv}}} = {k_pipe_ins / h_conv:.4f}\\text{{ m}} = {rc_mm:.1f}\\text{{ mm}}$$",
                "difficulty": "Easy",
                "source": "Unit Operations in Food Processing (R.L. Earle)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Critical radius of insulation concept",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following statements regarding the critical radius of insulation ($r_c$) is/are TRUE?",
                "options": {
                    "A": "For a circular cylinder, $r_c = k / h$, whereas for a sphere, $r_c = 2k / h$",
                    "B": "Adding insulation to a bare cylinder having outer radius $r_o < r_c$ initially increases the rate of heat loss until $r = r_c$",
                    "C": "For a plane flat wall, the concept of critical radius does not exist because surface area remains constant regardless of thickness",
                    "D": "Adding any insulation to a steam pipe always strictly decreases heat loss regardless of pipe diameter"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "1. Cylindrical $r_c = k/h$; spherical $r_c = 2k/h$ (A is true).\n2. For $r_o < r_c$, the decrease in outer convective resistance ($1/hA$) outweighs added conductive resistance, peaking heat loss at $r = r_c$ (B is true).\n3. In plane walls, area is invariant with thickness, so adding insulation always monotonically increases thermal resistance (C is true).\n4. When $r_o < r_c$, insulation increases heat transfer; statement D is false.",
                "difficulty": "Moderate",
                "source": "Transport Processes and Separation Process Principles (Geankoplis)"
            })

    # 2. Transient Heat Conduction & Lumped Capacity Analysis (43 questions)
    for i in range(1, 44):
        qid = f"QB_DFE_TRS_{i:03d}"
        topic = "Transient Heat Conduction & Lumped Capacity Analysis"
        sub = "Biot number and lumped system transient cooling"
        if i % 3 == 1:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Biot number validity for lumped capacity",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "The lumped capacity (lumped thermal capacitance) assumption of spatially uniform temperature inside a solid body during transient cooling/heating is strictly valid when the Biot number satisfies:",
                "options": {
                    "A": "$Bi = \\frac{h L_c}{k} < 0.1$",
                    "B": "$Bi > 10.0$",
                    "C": "$Bi = 1.0$",
                    "D": "$Bi \\to \\infty$"
                },
                "correct_answer": "A",
                "solution": "The Biot number $Bi = \\frac{h L_c}{k_{solid}}$ compares internal conductive thermal resistance to external convective boundary resistance. When $Bi < 0.1$, internal thermal gradients are under $5\\%$, validating the lumped isothermal assumption.",
                "difficulty": "Easy",
                "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
            })
        elif i % 3 == 2:
            # Sphere radius R, characteristic length Lc = V / A = (4/3 pi R^3) / (4 pi R^2) = R / 3
            R_sphere = 0.03 # m (30 mm)
            Lc = R_sphere / 3.0 # 0.01 m
            k_solid = 0.5 # W/m K
            h_air = 20.0 # W/m2 K
            # Bi = h * Lc / k_solid = 20 * 0.01 / 0.5 = 0.4
            Bi_val = round((h_air * Lc) / k_solid, 3)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Biot number calculation for spherical fruit",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"A spherical fruit of radius $R = {R_sphere*1000:.0f}\\text{{ mm}}$ has a thermal conductivity $k = {k_solid:.1f}\\text{{ W/(m}}\\,\\text{{K)}}$. It is blast-chilled in air where the convective surface heat transfer coefficient is $h = {h_air:.1f}\\text{{ W/(m}}^2\\,\\text{{K)}}$. Taking characteristic dimension $L_c = R/3$, the Biot number ($Bi$) for the fruit is ________ (round off to two decimal places).",
                "correct_answer": f"{Bi_val:.2f}",
                "numerical_range": { "min": round(Bi_val - 0.02, 2), "max": round(Bi_val + 0.02, 2) },
                "solution": f"Characteristic length of a solid sphere:\n$$L_c = \\frac{{V}}{{A}} = \\frac{{\\frac{{4}}{{3}} \\pi R^3}}{{4 \\pi R^2}} = \\frac{{R}}{{3}} = \\frac{{{R_sphere:.3f}}}{{3}} = {Lc:.4f}\\text{{ m}}$$\nThe Biot number is:\n$$Bi = \\frac{{h L_c}}{{k}} = \\frac{{{h_air:.1f} \\times {Lc:.4f}}}{{{k_solid:.1f}}} = {Bi_val:.3f}$$\nRounding to two decimal places: ${Bi_val:.2f}$.",
                "difficulty": "Moderate",
                "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Fourier number definition and Heisler charts",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following statements regarding transient heat conduction in foods is/are TRUE?",
                "options": {
                    "A": "Fourier number is dimensionless time defined as $Fo = \\frac{\\alpha t}{L_c^2}$, where $\\alpha = \\frac{k}{\\rho c_p}$",
                    "B": "Heisler charts are analytical graphical solutions used when $Bi > 0.1$ and $Fo > 0.2$",
                    "C": "In lumped capacity analysis, the thermal time constant is $\\tau = \\frac{\\rho V c_p}{h A}$",
                    "D": "When $Bi \\to \\infty$, the surface of the body immediately reaches the ambient fluid temperature"
                },
                "correct_answer": ["A", "B", "C", "D"],
                "solution": "All four statements are foundational principles of transient food engineering:\n1. $Fo = \\alpha t / L_c^2$ scales diffusion time (A).\n2. Heisler charts neglect higher Fourier terms when $Fo > 0.2$ (B).\n3. Temperature decay follows $\\exp(-t / \\tau)$ with time constant $\\tau = \\frac{\\rho V c_p}{h A}$ (C).\n4. $Bi \\to \\infty$ represents negligible surface convective resistance ($h \\to \\infty$), pinning surface to fluid temperature instantaneously (D).\nAll options A, B, C, D are correct.",
                "difficulty": "Hard",
                "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
            })

    # 3. Convective Heat Transfer & Dimensionless Numbers (43 questions)
    for i in range(1, 44):
        qid = f"QB_DFE_CNV_{i:03d}"
        topic = "Convective Heat Transfer & Dimensionless Numbers"
        sub = "Nusselt, Reynolds, and Prandtl number correlations"
        if i % 3 == 1:
            Nu = 120.0 + (i % 6) * 10.0
            k_fluid = 0.60 # W/m K (water/milk)
            D_pipe = 0.05 # m (50 mm)
            # h = Nu * k / D
            h_calc = round((Nu * k_fluid) / D_pipe, 1)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Convective heat transfer coefficient from Nusselt number",
                "type": "NAT",
                "marks": 1,
                "negative_marks": 0,
                "question": f"Liquid milk flows inside a tubular pasteurizer tube of internal diameter $D = {D_pipe*1000:.0f}\\text{{ mm}}$. The thermal conductivity of milk is $k = {k_fluid:.2f}\\text{{ W/(m}}\\,\\text{{K)}}$. If the flow conditions give a Nusselt number $Nu = {Nu:.0f}$, the convective heat transfer coefficient $h$ is ________ $\\text{{W/(m}}^2\\,\\text{{K)}}$ (round off to one decimal place).",
                "correct_answer": f"{h_calc:.1f}",
                "numerical_range": { "min": round(h_calc - 1.0, 1), "max": round(h_calc + 1.0, 1) },
                "solution": f"From the definition of Nusselt number:\n$$Nu = \\frac{{h D}}{{k}} \\implies h = \\frac{{Nu \\cdot k}}{{D}}$$\nGiven $Nu = {Nu:.0f}$, $k = {k_fluid:.2f}\\text{{ W/(m K)}}$, and $D = {D_pipe:.2f}\\text{{ m}}$:\n$$h = \\frac{{{Nu:.0f} \\times {k_fluid:.2f}}}{{{D_pipe:.2f}}} = {h_calc:.1f}\\text{{ W/(m}}^2\\text{{ K)}}$$",
                "difficulty": "Easy",
                "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
            })
        elif i % 3 == 2:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Prandtl number physical significance",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "The Prandtl number ($Pr = \\frac{\\nu}{\\alpha} = \\frac{\\mu c_p}{k}$) represents the ratio of:",
                "options": {
                    "A": "Momentum diffusivity (kinematic viscosity) to thermal diffusivity",
                    "B": "Inertial forces to viscous forces",
                    "C": "Convective heat transfer to pure conductive heat transfer",
                    "D": "Buoyancy forces to viscous forces"
                },
                "correct_answer": "A",
                "solution": "The Prandtl number is a pure fluid property defined as $Pr = \\frac{\\nu}{\\alpha} = \\frac{\\mu / \\rho}{k / (\\rho c_p)} = \\frac{\\mu c_p}{k}$, representing the relative growth rates of velocity and thermal boundary layers.",
                "difficulty": "Easy",
                "source": "Transport Processes and Separation Process Principles (Geankoplis)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Dittus-Boelter correlation exponents",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following conditions and parameters are valid for the Dittus-Boelter turbulent pipe flow correlation $Nu = 0.023 Re^{0.8} Pr^n$?",
                "options": {
                    "A": "Fully developed turbulent flow with $Re > 10000$ and $0.6 \\le Pr \\le 160$",
                    "B": "The exponent is $n = 0.4$ when the fluid is being heated",
                    "C": "The exponent is $n = 0.3$ when the fluid is being cooled",
                    "D": "The correlation is applicable to creeping laminar flow ($Re < 100$)"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "1. Valid for turbulent flow $Re > 10^4$ and moderate Prandtl range (A is true).\n2. Heating fluid: $n = 0.4$ (wall hotter than bulk fluid) (B is true).\n3. Cooling fluid: $n = 0.3$ (wall colder than bulk fluid) (C is true).\n4. For laminar flow ($Re < 2100$), $Nu = 3.66$ (constant wall temp) or $4.36$ (constant heat flux); Dittus-Boelter is completely invalid for laminar flow (D is false).",
                "difficulty": "Moderate",
                "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
            })

    # 4. Radiation Heat Transfer & Emissivity (43 questions)
    for i in range(1, 44):
        qid = f"QB_DFE_RAD_{i:03d}"
        topic = "Radiation Heat Transfer & Emissivity"
        sub = "Stefan-Boltzmann radiation law and gray body emission"
        if i % 3 == 1:
            T_C = 200.0 + (i % 5) * 50.0 # C
            T_K = T_C + 273.15 # K
            eps = 0.85
            sigma = 5.67e-8
            # E = eps * sigma * T^4
            E_rad = round(eps * sigma * (T_K**4), 1)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Emissive power of food baking surface",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"A baking oven radiant heating panel operates at a surface temperature of $T = {T_C:.0f}^\\circ\\text{{C}}$ (${T_K:.2f}\\text{{ K}}$) with a surface emissivity of $\\epsilon = {eps:.2f}$. Taking the Stefan-Boltzmann constant $\\sigma = 5.67 \\times 10^{{-8}}\\text{{ W/(m}}^2\\,\\text{{K}}^4\\text{{)}}$, the total emissive power of the panel is ________ $\\text{{W/m}}^2$ (round off to one decimal place).",
                "correct_answer": f"{E_rad:.1f}",
                "numerical_range": { "min": round(E_rad - 5.0, 1), "max": round(E_rad + 5.0, 1) },
                "solution": f"From the Stefan-Boltzmann law for a gray surface:\n$$E = \\epsilon \\sigma T^4$$\nGiven $\\epsilon = {eps:.2f}$, $\\sigma = 5.67 \\times 10^{{-8}}\\text{{ W/(m}}^2\\text{{ K}}^4\\text{{)}}$, and $T = {T_K:.2f}\\text{{ K}}$:\n$$E = {eps:.2f} \\times (5.67 \\times 10^{{-8}}) \\times ({T_K:.2f})^4 = {E_rad:.1f}\\text{{ W/m}}^2$$",
                "difficulty": "Moderate",
                "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
            })
        elif i % 3 == 2:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Wien displacement law and blackbody radiation",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "According to Wien's Displacement Law, the wavelength $\\lambda_{\\max}$ at which maximum spectral emissive power occurs is related to absolute temperature $T$ by:",
                "options": {
                    "A": "$\\lambda_{\\max} T = 2898\\;\\mu\\text{m}\\cdot\\text{K} = \\text{constant}$",
                    "B": "$\\lambda_{\\max} / T = \\text{constant}$",
                    "C": "$\\lambda_{\\max} T^4 = \\text{constant}$",
                    "D": "$\\lambda_{\\max} = \\sigma T^2$"
                },
                "correct_answer": "A",
                "solution": "Wien's displacement law states that the peak emission wavelength shifts inversely with absolute temperature: $\\lambda_{\\max} T = C \\approx 2.898 \\times 10^{-3}\\text{ m}\\cdot\\text{K} = 2898\\;\\mu\\text{m}\\cdot\\text{K}$.",
                "difficulty": "Easy",
                "source": "Transport Processes and Separation Process Principles (Geankoplis)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Reciprocity and summation rules of view factors",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following view factor (shape factor) relationships is/are mathematically TRUE for diffuse-gray radiation exchange?",
                "options": {
                    "A": "Reciprocity theorem: $A_i F_{ij} = A_j F_{ji}$",
                    "B": "Summation rule for an $N$-surface enclosure: $\\sum_{j=1}^N F_{ij} = 1$",
                    "C": "For a strictly flat or convex surface $i$, the self-view factor is zero ($F_{ii} = 0$)",
                    "D": "View factor depends strongly on surface temperature and emissivity"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "1. Reciprocity $A_i F_{ij} = A_j F_{ji}$ balances radiation geometry (A is true).\n2. Enclosure summation conserves radiant energy: $\\sum F_{ij} = 1$ (B is true).\n3. Flat/convex planes cannot 'see' themselves, so $F_{ii} = 0$ (C is true).\n4. View factor $F_{ij}$ is purely geometric, depending only on orientation and distance, completely independent of temperature and emissivity (D is false).",
                "difficulty": "Moderate",
                "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
            })

    # 5. Heat Exchangers: LMTD & NTU-Effectiveness Methods (43 questions with SVG diagram)
    for i in range(1, 44):
        qid = f"QB_DFE_HEX_{i:03d}"
        topic = "Heat Exchangers: LMTD & NTU-Effectiveness Methods"
        sub = "Counterflow heat exchanger LMTD and NTU effectiveness"
        if i % 3 == 1:
            Th_in = 85.0
            Th_out = 45.0
            Tc_in = 20.0
            Tc_out = 40.0 + (i % 4) * 2.0
            dT1 = Th_in - Tc_out
            dT2 = Th_out - Tc_in
            # LMTD = (dT1 - dT2) / ln(dT1 / dT2)
            lmtd = round((dT1 - dT2) / math.log(dT1 / dT2), 2)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Counterflow heat exchanger LMTD calculation",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "diagram_svg": SVG_HEX,
                "question": f"In a counterflow milk chiller shown in the temperature profile diagram, hot milk is cooled from ${Th_in:.0f}^\\circ\\text{{C}}$ to ${Th_out:.0f}^\\circ\\text{{C}}$ by chilled water entering at ${Tc_in:.0f}^\\circ\\text{{C}}$ and leaving at ${Tc_out:.0f}^\\circ\\text{{C}}$. The Logarithmic Mean Temperature Difference ($LMTD$) is ________ $^\\circ\\text{{C}}$ (round off to two decimal places).",
                "correct_answer": f"{lmtd:.2f}",
                "numerical_range": { "min": round(lmtd - 0.2, 2), "max": round(lmtd + 0.2, 2) },
                "solution": f"In a counterflow heat exchanger:\n$$\\Delta T_1 = T_{{h,in}} - T_{{c,out}} = {Th_in:.0f} - {Tc_out:.0f} = {dT1:.0f}^\\circ\\text{{C}}$$\n$$\\Delta T_2 = T_{{h,out}} - T_{{c,in}} = {Th_out:.0f} - {Tc_in:.0f} = {dT2:.0f}^\\circ\\text{{C}}$$\nLogarithmic Mean Temperature Difference:\n$$LMTD = \\frac{{\\Delta T_1 - \\Delta T_2}}{{\\ln(\\Delta T_1 / \\Delta T_2)}} = \\frac{{{dT1:.0f} - {dT2:.0f}}}{{\\ln({dT1:.0f} / {dT2:.0f})}} = \\frac{{{dT1 - dT2:.0f}}}{{{math.log(dT1/dT2):.4f}}} = {lmtd:.2f}^\\circ\\text{{C}}$$",
                "difficulty": "Moderate",
                "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
            })
        elif i % 3 == 2:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Counterflow vs parallel flow thermal comparison",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "For the same hot and cold fluid inlet/outlet temperatures, a counterflow heat exchanger compared to a parallel flow heat exchanger:",
                "options": {
                    "A": "Has a strictly higher LMTD, requiring less surface area for the same thermal duty",
                    "B": "Has a lower LMTD, requiring greater surface area",
                    "C": "Has identical LMTD with zero difference",
                    "D": "Cannot allow the exit cold fluid temperature to exceed exit hot fluid temperature"
                },
                "correct_answer": "A",
                "solution": "Counterflow configuration maximizes the temperature difference along the entire length, yielding $LMTD_{\\text{counter}} > LMTD_{\\text{parallel}}$. Consequently, counterflow requires less surface area ($A = q / (U \\cdot LMTD)$) and allows cold fluid outlet temperature to exceed hot fluid outlet temperature.",
                "difficulty": "Easy",
                "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "NTU-Effectiveness method definitions",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "diagram_svg": SVG_HEX,
                "question": "Which of the following statements regarding the Number of Transfer Units ($NTU$) method is/are TRUE?",
                "options": {
                    "A": "The Number of Transfer Units is defined as $NTU = \\frac{U A}{C_{\\min}}$, where $C_{\\min} = (\\dot{m} c_p)_{\\min}$",
                    "B": "Heat exchanger effectiveness $\\epsilon = \\frac{q}{q_{\\max}} = \\frac{C_h (T_{h,in} - T_{h,out})}{C_{\\min} (T_{h,in} - T_{c,in})}$",
                    "C": "When one fluid undergoes phase change (boiling or condensation), $C_{\\max} \\to \\infty$ and capacity ratio $C_r = \\frac{C_{\\min}}{C_{\\max}} = 0$",
                    "D": "Effectiveness $\\epsilon$ can exceed $1.0$ in plate pasteurizers"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "1. $NTU = U A / C_{\\min}$ measures heat exchanger physical size relative to heat capacity rate (A is true).\n2. Effectiveness $\\epsilon = q_{\\text{actual}} / q_{\\text{max}}$ (B is true).\n3. Evaporating/condensing fluid has infinite heat capacity rate, so $C_r = 0$ and $\\epsilon = 1 - e^{-NTU}$ for all flow configurations (C is true).\n4. By second law of thermodynamics, $\\epsilon \\le 1.0$ strictly; it can never exceed $1.0$ (D is false).",
                "difficulty": "Moderate",
                "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
            })

    # 6. Mass Transfer, Fick's Law & Convective Diffusion (43 questions)
    for i in range(1, 44):
        qid = f"QB_DFE_MSS_{i:03d}"
        topic = "Mass Transfer, Fick's Law & Convective Diffusion"
        sub = "Fick first law and Sherwood-Schmidt numbers"
        if i % 3 == 1:
            D_AB = 1.6e-9 # m2/s
            dC = 80.0 # mol/m3
            dz = 0.002 # m (2 mm film)
            # J = D_AB * dC / dz
            flux = round(D_AB * dC / dz, 6) # mol/m2 s
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Steady molecular diffusion flux calculation",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"A solute diffuses through a stagnant edible packaging film of thickness $\\Delta z = {dz*1000:.0f}\\text{{ mm}}$. The diffusion coefficient is $D_{{AB}} = 1.6 \\times 10^{{-9}}\\text{{ m}}^2/\\text{{s}}$. The concentration drop across the film is $\\Delta C = {dC:.1f}\\text{{ mol/m}}^3$. Under steady-state equimolar counter-diffusion, the mass diffusion flux is ________ $\\text{{mol/(m}}^2\\,\\text{{s)}}$ (round off to four decimal places).",
                "correct_answer": f"{flux:.4f}",
                "numerical_range": { "min": round(flux - 0.0001, 4), "max": round(flux + 0.0001, 4) },
                "solution": f"From Fick's first law of diffusion:\n$$J_A = D_{{AB}} \\frac{{\\Delta C}}{{\\Delta z}}$$\nGiven $D_{{AB}} = 1.6 \\times 10^{{-9}}\\text{{ m}}^2/\\text{{s}}$, $\\Delta C = {dC:.1f}\\text{{ mol/m}}^3$, and $\\Delta z = {dz:.3f}\\text{{ m}}$:\n$$J_A = (1.6 \\times 10^{{-9}}) \\times \\frac{{{dC:.1f}}}{{{dz:.3f}}} = {flux:.6f}\\text{{ mol/(m}}^2\\text{{ s)}}$$\nRounding to four decimal places: ${flux:.4f}$.",
                "difficulty": "Moderate",
                "source": "Transport Processes and Separation Process Principles (Geankoplis)"
            })
        elif i % 3 == 2:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Sherwood and Schmidt numbers physical meaning",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "In mass transfer operations, the Schmidt number ($Sc = \\frac{\\nu}{D_{AB}}$) is the mass transfer analogue of the heat transfer:",
                "options": {
                    "A": "Prandtl number ($Pr$)",
                    "B": "Nusselt number ($Nu$)",
                    "C": "Reynolds number ($Re$)",
                    "D": "Grashof number ($Gr$)"
                },
                "correct_answer": "A",
                "solution": "By transport analogies:\n- Sherwood number ($Sh = k_c L / D_{AB}$) is the mass analogue of Nusselt number ($Nu = h L / k$).\n- Schmidt number ($Sc = \\nu / D_{AB}$) is the mass analogue of Prandtl number ($Pr = \\nu / \\alpha$).\n- Lewis number ($Le = Sc / Pr = \\alpha / D_{AB}$) compares thermal to mass diffusivity.",
                "difficulty": "Easy",
                "source": "Transport Processes and Separation Process Principles (Geankoplis)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Chilton-Colburn j-factor mass-heat analogy",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following dimensionless numbers govern convective mass transfer from food surfaces to air?",
                "options": {
                    "A": "Sherwood number $Sh = \\frac{k_c L}{D_{AB}}$ (ratio of convective mass transfer to molecular diffusion)",
                    "B": "Schmidt number $Sc = \\frac{\\mu}{\\rho D_{AB}}$ (ratio of momentum diffusivity to mass diffusivity)",
                    "C": "Peclet number for mass transfer $Pe_m = Re \\cdot Sc$",
                    "D": "Mach number representing sonic shock wave boundaries"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "1. Sherwood number scales convective mass transfer (A).\n2. Schmidt number governs boundary layer thickness ratios (B).\n3. $Pe_m = Re \\cdot Sc$ characterizes advective vs diffusive mass transport (C).\n4. Food processing convective mass transfer occurs at low subsonic Mach numbers where compressibility shocks are irrelevant (D is false).",
                "difficulty": "Easy",
                "source": "Transport Processes and Separation Process Principles (Geankoplis)"
            })

    # 7. Food Rheology & Non-Newtonian Flow (43 questions)
    for i in range(1, 44):
        qid = f"QB_DFE_RHL_{i:03d}"
        topic = "Food Rheology & Non-Newtonian Flow"
        sub = "Ostwald-de Waele Power Law and Herschel-Bulkley models"
        if i % 3 == 1:
            K = 2.5 # Pa s^n consistency index
            n = 0.40 # flow behavior index (shear thinning)
            gamma_dot = 100.0 # 1/s shear rate
            # tau = K * gamma_dot^n
            tau = round(K * (gamma_dot**n), 2)
            # eta_app = tau / gamma_dot = K * gamma_dot^(n-1)
            eta_app = round(tau / gamma_dot, 4)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Power law apparent viscosity calculation",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"A fruit puree follows the Ostwald-de Waele power law model: $\\tau = K \\dot{{\\gamma}}^n$. The consistency index is $K = {K:.1f}\\text{{ Pa}}\\,\\text{{s}}^{{{n}}}$ and the flow behavior index is $n = {n:.2f}$. At a shear rate of $\\dot{{\\gamma}} = {gamma_dot:.0f}\\text{{ s}}^{{-1}}$, the apparent viscosity $\\eta_{{app}}$ is ________ $\\text{{Pa}}\\,\\text{{s}}$ (round off to three decimal places).",
                "correct_answer": f"{eta_app:.3f}",
                "numerical_range": { "min": round(eta_app - 0.01, 3), "max": round(eta_app + 0.01, 3) },
                "solution": f"The shear stress is:\n$$\\tau = K \\dot{{\\gamma}}^n = {K:.1f} \\times ({gamma_dot:.0f})^{{{n:.2f}}} = {K:.1f} \\times {gamma_dot**n:.4f} = {tau:.2f}\\text{{ Pa}}$$\nThe apparent viscosity is defined as:\n$$\\eta_{{app}} = \\frac{{\\tau}}{{\\dot{{\\gamma}}}} = \\frac{{{tau:.2f}}}{{{gamma_dot:.0f}}} = {eta_app:.4f}\\text{{ Pa}}\\,\\text{{s}}$$\nRounding to three decimal places: ${eta_app:.3f}\\text{{ Pa}}\\,\\text{{s}}$.",
                "difficulty": "Moderate",
                "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
            })
        elif i % 3 == 2:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Non-Newtonian food fluid classification",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "A liquid food that exhibits a finite yield stress $\\tau_0$ and a flow behavior index $n < 1$ (shear thinning behavior once flow commences) is classified as a:",
                "options": {
                    "A": "Herschel-Bulkley fluid (e.g. tomato ketchup, minced meat paste)",
                    "B": "Bingham plastic (e.g. toothpaste with linear $n = 1$)",
                    "C": "Dilatant fluid ($n > 1$)",
                    "D": "Newtonian fluid"
                },
                "correct_answer": "A",
                "solution": "The Herschel-Bulkley model is $\\tau = \\tau_0 + K \\dot{\\gamma}^n$. When $\\tau_0 > 0$ and $n < 1$, the fluid is yield-pseudoplastic (Herschel-Bulkley), characteristic of ketchup, mayonnaise, and purees.",
                "difficulty": "Easy",
                "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Time-dependent rheology: Thixotropy vs Rheopexy",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following statements regarding rheological behavior of food products is/are TRUE?",
                "options": {
                    "A": "Thixotropic food materials show a reversible decrease in apparent viscosity over time under constant shear rate (e.g. yogurt, condensed milk)",
                    "B": "Rheopectic materials show an increase in viscosity over time under constant shear",
                    "C": "Pseudoplastic fluids ($n < 1$) display shear thinning where apparent viscosity decreases as shear rate increases",
                    "D": "In a Newtonian fluid, viscosity is dependent on the applied shear rate"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "1. Thixotropy: time-dependent breakdown of structural networks under shear (A is true).\n2. Rheopexy: time-dependent shear thickening (B is true).\n3. Pseudoplastic: shear thinning with $n < 1$ (C is true).\n4. In Newtonian fluids, dynamic viscosity is strictly constant and independent of shear rate (D is false).",
                "difficulty": "Easy",
                "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
            })

    # 8. Microbial Inactivation Kinetics: D-Value, z-Value & F-Value (43 questions)
    for i in range(1, 44):
        qid = f"QB_DFE_MIC_{i:03d}"
        topic = "Microbial Inactivation Kinetics: D-Value, z-Value & F-Value"
        sub = "Decimal reduction time and 12D thermal sterilization"
        if i % 3 == 1:
            D121 = 0.20 + (i % 4) * 0.05 # min for C. botulinum
            # 12D process time F0 = 12 * D121
            F0 = round(12.0 * D121, 2)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "12D process F0 calculation for Clostridium botulinum",
                "type": "NAT",
                "marks": 1,
                "negative_marks": 0,
                "question": f"In thermal sterilization of low-acid canned food, the decimal reduction time of *Clostridium botulinum* spores at $121.1^\\circ\\text{{C}}$ is $D_{{121.1}} = {D121:.2f}\\text{{ min}}$. The minimum thermal lethality time ($F_0$) required to achieve a commercial $12D$ sterility reduction is ________ $\\text{{min}}$ (round off to two decimal places).",
                "correct_answer": f"{F0:.2f}",
                "numerical_range": { "min": round(F0 - 0.1, 2), "max": round(F0 + 0.1, 2) },
                "solution": f"The $12D$ concept requires reducing the microbial spore population by $12$ decimal cycles ($12$ log reductions):\n$$F_0 = 12 \\times D_{{121.1}}$$\nGiven $D_{{121.1}} = {D121:.2f}\\text{{ min}}$:\n$$F_0 = 12 \\times {D121:.2f} = {F0:.2f}\\text{{ min}}$$",
                "difficulty": "Easy",
                "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
            })
        elif i % 3 == 2:
            z = 10.0 # C
            D1 = 15.0 # min at 111.1 C
            # D2 at 121.1 C: D2 = D1 * 10^(-(T2 - T1) / z) = 15 * 10^(-10/10) = 1.5 min
            D2 = round(D1 * (10.0**(-10.0 / z)), 2)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "D-value change with temperature from z-value",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"A bacterial spore has a decimal reduction time of $D_1 = {D1:.1f}\\text{{ min}}$ at $T_1 = 111.1^\\circ\\text{{C}}$ and a thermal resistance constant $z = {z:.1f}^\\circ\\text{{C}}$. The decimal reduction time $D_2$ at $T_2 = 121.1^\\circ\\text{{C}}$ is ________ $\\text{{min}}$ (round off to two decimal places).",
                "correct_answer": f"{D2:.2f}",
                "numerical_range": { "min": round(D2 - 0.05, 2), "max": round(D2 + 0.05, 2) },
                "solution": f"The relationship between $D$-value and temperature governed by $z$-value is:\n$$\\log_{{10}}\\left( \\frac{{D_1}}{{D_2}} \\right) = \\frac{{T_2 - T_1}}{{z}}$$\n$$\\frac{{D_1}}{{D_2}} = 10^{{\\frac{{T_2 - T_1}}{{z}}}} = 10^{{\\frac{{121.1 - 111.1}}{{10.0}}}} = 10^1 = 10$$\n$$D_2 = \\frac{{D_1}}{{10}} = \\frac{{{D1:.1f}}}{{10}} = {D2:.2f}\\text{{ min}}$$",
                "difficulty": "Moderate",
                "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Definitions of D, z, and F values",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following statements regarding thermal death kinetics of microorganisms is/are TRUE?",
                "options": {
                    "A": "The $D$-value is the heating time required at a given temperature to destroy $90\\%$ of the microbial population (one log reduction)",
                    "B": "The $z$-value is the temperature increase required to reduce the $D$-value by a factor of 10",
                    "C": "Thermal death of vegetative cells and bacterial spores follows first-order reaction kinetics: $\\ln(N/N_0) = -k t$",
                    "D": "Higher $z$-value indicates greater temperature sensitivity of the microorganism"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "1. $D$-value = time for 1 log ($90\\%$) reduction: $D = t / \\log_{10}(N_0/N)$ (A is true).\n2. $z$-value = $\\Delta T$ for 1 log change in $D$: $z = (T_2 - T_1) / \\log_{10}(D_1/D_2)$ (B is true).\n3. Semi-log linear survival curves confirm first-order inactivation kinetics (C is true).\n4. A LOWER $z$-value means a smaller temperature rise causes a ten-fold drop in $D$, indicating HIGHER temperature sensitivity (D is false).",
                "difficulty": "Moderate",
                "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
            })

    # 9. Milk Pasteurization: HTST & Batch Systems (43 questions)
    for i in range(1, 44):
        qid = f"QB_DFE_PST_{i:03d}"
        topic = "Milk Pasteurization: HTST & Batch Systems"
        sub = "HTST pasteurization standards and regeneration efficiency"
        if i % 3 == 1:
            T_raw = 5.0 # C
            T_past = 72.0 # C
            T_regen = 58.0 + (i % 5) * 1.0 # C
            # eta_reg = (T_regen - T_raw) / (T_past - T_raw) * 100
            eta_reg = round(((T_regen - T_raw) / (T_past - T_raw)) * 100.0, 1)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Regeneration efficiency in HTST pasteurizer",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"In a continuous HTST plate pasteurizer, incoming raw cold milk at ${T_raw:.1f}^\\circ\\text{{C}}$ is pre-heated in the regenerator section to ${T_regen:.1f}^\\circ\\text{{C}}$ by outgoing pasteurized hot milk leaving the holding tube at ${T_past:.1f}^\\circ\\text{{C}}$. The regeneration efficiency of the pasteurizer is ________ $\\%$ (round off to one decimal place).",
                "correct_answer": f"{eta_reg:.1f}",
                "numerical_range": { "min": round(eta_reg - 0.2, 1), "max": round(eta_reg + 0.2, 1) },
                "solution": f"The regeneration efficiency $\\eta_{{reg}}$ is defined as:\n$$\\eta_{{reg}} = \\frac{{T_{{regen}} - T_{{raw}}}}{{T_{{past}} - T_{{raw}}}} \\times 100$$\nGiven $T_{{raw}} = {T_raw:.1f}^\\circ\\text{{C}}$, $T_{{regen}} = {T_regen:.1f}^\\circ\\text{{C}}$, and $T_{{past}} = {T_past:.1f}^\\circ\\text{{C}}$:\n$$\\eta_{{reg}} = \\frac{{{T_regen:.1f} - {T_raw:.1f}}}{{{T_past:.1f} - {T_raw:.1f}}} \\times 100 = \\frac{{{T_regen - T_raw:.1f}}}{{{T_past - T_raw:.1f}}} \\times 100 = {eta_reg:.1f}\\%$$",
                "difficulty": "Moderate",
                "source": "Outlines of Dairy Technology (Sukumar De)"
            })
        elif i % 3 == 2:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Index organisms for milk pasteurization",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "The official standard index microorganism used as the benchmark for establishing thermal time-temperature combinations in commercial milk pasteurization is:",
                "options": {
                    "A": "*Coxiella burnetii* (rickettsia causing Q-fever)",
                    "B": "*Escherichia coli*",
                    "C": "*Saccharomyces cerevisiae*",
                    "D": "*Lactobacillus bulgaricus*"
                },
                "correct_answer": "A",
                "solution": "*Coxiella burnetii* is the most heat-resistant non-spore-forming pathogenic organism found in raw milk. Thermal destruction of *Coxiella burnetii* (and inactivation of the alkaline phosphatase enzyme) guarantees complete destruction of *Mycobacterium tuberculosis* and all other milk-borne pathogens.",
                "difficulty": "Easy",
                "source": "Outlines of Dairy Technology (Sukumar De)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Components of HTST pasteurizer",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following sanitary and safety features are mandatory in a commercial continuous HTST milk pasteurization plant?",
                "options": {
                    "A": "Flow Diversion Valve (FDV) that automatically diverts sub-pasteurized milk back to the balance tank if temperature drops below the legal limit ($71.7^\\circ\\text{C}$)",
                    "B": "Booster pump installed to ensure pasteurized milk is maintained at higher hydraulic pressure than raw milk in the regenerator section to prevent cross-contamination",
                    "C": "Holding tube sloped continuously upward toward the FDV at a minimum gradient of $2\\%$ ($1/50$) to prevent air entrapment",
                    "D": "Open wooden cooling towers directly exposing pasteurized milk to atmosphere"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "1. FDV diverts any under-temperature milk instantly (A is mandatory).\n2. Positive differential pressure prevents leakage from raw to pasteurized side across plates (B is mandatory).\n3. Sloped holding tube eliminates air pockets that could alter holding residence time (C is mandatory).\n4. Milk must flow strictly within hermetically sealed, sanitary stainless steel heat exchanger plates without ambient exposure (D is false).",
                "difficulty": "Moderate",
                "source": "Outlines of Dairy Technology (Sukumar De)"
            })

    # 10. Thermal Sterilization, Retort Processing & 12D Concept (43 questions)
    for i in range(1, 44):
        qid = f"QB_DFE_STR_{i:03d}"
        topic = "Thermal Sterilization, Retort Processing & 12D Concept"
        sub = "General method of thermal process evaluation"
        if i % 3 == 1:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Reference temperature for F0 lethality value",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "In thermal process engineering of canned foods, the standard reference sterilization lethality value $F_0$ is defined for an equivalent exposure at:",
                "options": {
                    "A": "$121.1^\\circ\\text{C} \\;(250^\\circ\\text{F})$ with $z = 10^\\circ\\text{C} \\;(18^\\circ\\text{F})$",
                    "B": "$100.0^\\circ\\text{C}$ with $z = 5^\\circ\\text{C}$",
                    "C": "$72.0^\\circ\\text{C}$ with $z = 8^\\circ\\text{C}$",
                    "D": "$140.0^\\circ\\text{C}$ with $z = 20^\\circ\\text{C}$"
                },
                "correct_answer": "A",
                "solution": "The standard unit of thermal lethality $F_0$ is normalized to saturated steam at $121.11^\\circ\\text{C}$ ($250^\\circ\\text{F}$) for an organism with temperature sensitivity $z = 10^\\circ\\text{C}$ ($18^\\circ\\text{F}$): $F_0 = \\int_0^t 10^{\\frac{T(t) - 121.1}{10}} dt$.",
                "difficulty": "Easy",
                "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
            })
        elif i % 3 == 2:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Cold point location in conduction vs convection heated cans",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following statements regarding the 'slowest heating point' (cold point) in canned food sterilization is/are TRUE?",
                "options": {
                    "A": "In solid conduction-heating foods (e.g. corned beef, pumpkin puree), the cold point is located at the geometric center of the can",
                    "B": "In liquid convection-heating foods (e.g. clear broth, thin juices), the cold point is located on the central vertical axis, approximately one-third to one-fifth of the height from the can bottom",
                    "C": "Thermal process lethality calculations must be based strictly on the time-temperature history of the cold point",
                    "D": "In broken-heating foods, convection persists uniformly until the end of the cooling cycle"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "1. Conduction heating is symmetrical, locating cold point at geometric center (A is true).\n2. Convective boundary layers rise along warm side walls and plunge down the center, depressing cold point to near the bottom ($1/3$ to $1/5$ height) (B is true).\n3. Ensuring commercial sterility at the coldest point guarantees adequate sterility throughout the remainder of the container (C is true).\n4. In broken heating, starch gelatinizes or pectin dissolves mid-cycle, transitioning flow from rapid convection to slow conduction (D is false).",
                "difficulty": "Moderate",
                "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Lethal rate calculation Bigelow method",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": "A can of food held at $116.1^\\circ\\text{C}$ has a lethal rate $L = 10^{\\frac{T - 121.1}{z}}$. Taking $z = 10.0^\\circ\\text{C}$, the lethal rate $L$ at this temperature is ________ (round off to three decimal places).",
                "correct_answer": "0.316",
                "numerical_range": { "min": 0.310, "max": 0.322 },
                "solution": "Lethal rate is:\n$$L = 10^{\\frac{T - 121.1}{z}} = 10^{\\frac{116.1 - 121.1}{10.0}} = 10^{\\frac{-5.0}{10.0}} = 10^{-0.5} = \\frac{1}{\\sqrt{10}} \\approx 0.3162$$\nRounding to three decimal places: $0.316$.",
                "difficulty": "Moderate",
                "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
            })

    # 11. Dairy Processing Equipment: Homogenizers & Cream Separators (43 questions)
    for i in range(1, 44):
        qid = f"QB_DFE_EQP_{i:03d}"
        topic = "Dairy Processing Equipment: Homogenizers & Cream Separators"
        sub = "Cream separation centrifugal velocity and Stokes law"
        if i % 3 == 1:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Stokes law for fat globule creaming",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "According to Stokes' law for the upward creaming velocity of milk fat globules ($v = \\frac{d^2 (\\rho_s - \\rho_f) g}{18 \\mu}$), reducing fat globule diameter $d$ by half through homogenization reduces the creaming velocity by a factor of:",
                "options": {
                    "A": "$4$ (creaming velocity is proportional to $d^2$)",
                    "B": "$2$",
                    "C": "$8$",
                    "D": "$16$"
                },
                "correct_answer": "A",
                "solution": "In Stokes' law, creaming velocity varies directly with the square of the globule diameter ($v \\propto d^2$). Halving the diameter reduces the creaming rate by $(1/2)^2 = 1/4$, preventing gravity separation and milk fat rising.",
                "difficulty": "Easy",
                "source": "Outlines of Dairy Technology (Sukumar De)"
            })
        elif i % 3 == 2:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Two-stage homogenization mechanism",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "In a two-stage high-pressure milk homogenizer, which of the following operational functions are performed by the respective stages?",
                "options": {
                    "A": "First stage operates at high pressure ($15-20\\text{ MPa}$ / $150-200\\text{ bar}$) to shatter fat globules into sub-micron sizes via intense shear, cavitation, and turbulence",
                    "B": "Second stage operates at lower pressure ($3-5\\text{ MPa}$ / $30-50\\text{ bar}$) to break up fat globule clusters and clumps, ensuring uniform dispersion",
                    "C": "Homogenization increases milk viscosity and creates a richer, whiter appearance due to increased light scattering from smaller fat globules",
                    "D": "Homogenization completely eliminates the need for pasteurization"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "1. First stage shatters globules down from $4\\;\\mu\\text{m}$ to $< 1\\;\\mu\\text{m}$ (A is true).\n2. Second stage de-clusters aggregated globules (B is true).\n3. Greater number of micro-droplets scatters light efficiently, whitening the milk and increasing body (C is true).\n4. Homogenization is purely mechanical; milk must still be pasteurized to destroy pathogens and inactivate native lipases (D is false).",
                "difficulty": "Moderate",
                "source": "Outlines of Dairy Technology (Sukumar De)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Disc bowl cream separator separation zone",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "In a continuous disc-bowl centrifugal cream separator rotating at $5000-8000\\text{ rpm}$:",
                "options": {
                    "A": "Dense skim milk is forced outward to the bowl periphery, while lighter fat globules travel inward along the conical disc surfaces toward the central cream outlet",
                    "B": "Fat globules are forced outward to the bowl periphery while skim milk remains in the center",
                    "C": "Sediment and sludge accumulate in the central shaft",
                    "D": "Separation occurs without centrifugal force"
                },
                "correct_answer": "A",
                "solution": "Under intense centrifugal acceleration ($5000-7000\\text{ g}$), the denser aqueous phase (skim milk, $\\rho \\approx 1035\\text{ kg/m}^3$) is thrown outward to the periphery, while the lighter fat globules ($\\rho \\approx 930\\text{ kg/m}^3$) migrate inward along the conical disc stack toward the central cream core.",
                "difficulty": "Easy",
                "source": "Outlines of Dairy Technology (Sukumar De)"
            })

    # 12. Food Freezing, Plank's Equation & Freezing Time (43 questions)
    for i in range(1, 44):
        qid = f"QB_DFE_FRZ_{i:03d}"
        topic = "Food Freezing, Plank's Equation & Freezing Time"
        sub = "Plank equation for freezing time of slab"
        if i % 3 == 1:
            a = 0.05 # m (5 cm slab)
            rho_f = 950.0 # kg/m3
            L_f = 250000.0 # J/kg latent heat of freezing
            k_f = 1.2 # W/m K frozen thermal conductivity
            h_air = 25.0 # W/m2 K
            dT = 18.0 # C (T_f - T_a = -1 - (-19) = 18)
            # Plank for slab: P = 1/2, R = 1/8
            # tf = (rho_f * L_f / dT) * ( (P * a / h) + (R * a^2 / k_f) )
            term_conv = (0.5 * a) / h_air # 0.025 / 25 = 0.001
            term_cond = (0.125 * a**2) / k_f # 0.125 * 0.0025 / 1.2 = 0.0002604
            tf_sec = (rho_f * L_f / dT) * (term_conv + term_cond)
            tf_h = round(tf_sec / 3600.0, 2)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Plank equation freezing time calculation",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"A slab of meat of thickness $a = {a*100:.0f}\\text{{ cm}}$ is frozen in an air-blast freezer where ambient air is at $-19^\\circ\\text{{C}}$ and the initial freezing point of meat is $-1^\\circ\\text{{C}}$ ($\\Delta T = {dT:.0f}^\\circ\\text{{C}}$). The density of frozen meat is $\\rho_f = {rho_f:.0f}\\text{{ kg/m}}^3$, latent heat of freezing is $\\lambda = {L_f/1000:.0f}\\text{{ kJ/kg}}$, frozen thermal conductivity is $k_f = {k_f:.1f}\\text{{ W/(m}}\\,\\text{{K)}}$, and surface convective coefficient is $h = {h_air:.0f}\\text{{ W/(m}}^2\\,\\text{{K)}}$. Using Plank's equation for an infinite slab ($P = 1/2$, $R = 1/8$), the freezing time is ________ $\\text{{hours}}$ (round off to two decimal places).",
                "correct_answer": f"{tf_h:.2f}",
                "numerical_range": { "min": round(tf_h - 0.1, 2), "max": round(tf_h + 0.1, 2) },
                "solution": f"Plank's equation for freezing time of an infinite slab is:\n$$t_f = \\frac{{\\rho_f \\lambda}}{{\\Delta T}} \\left[ \\frac{{a}}{{2 h}} + \\frac{{a^2}}{{8 k_f}} \\right]$$\n$$\\frac{{a}}{{2 h}} = \\frac{{{a}}}{{2 \\times {h_air}}} = {term_conv:.6f}$$\n$$\\frac{{a^2}}{{8 k_f}} = \\frac{{{a**2}}}{{8 \\times {k_f}}} = {term_cond:.6f}$$\n$$t_f = \\frac{{{rho_f:.0f} \\times {L_f:.0f}}}{{{dT:.0f}}} \\times ({term_conv:.6f} + {term_cond:.6f}) = {tf_sec:.1f}\\text{{ seconds}}$$\nConverting to hours:\n$$t_f = \\frac{{{tf_sec:.1f}}}{{3600}} = {tf_h:.2f}\\text{{ hours}}$$",
                "difficulty": "Hard",
                "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
            })
        elif i % 3 == 2:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Plank geometric shape factors P and R",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "In Plank's equation for food freezing time $t_f = \\frac{\\rho_f \\lambda}{\\Delta T} \\left[ \\frac{P a}{h} + \\frac{R a^2}{k_f} \\right]$, the shape factors $(P, R)$ for a sphere of diameter $a$ are:",
                "options": {
                    "A": "$P = 1/6, \\; R = 1/24$",
                    "B": "$P = 1/2, \\; R = 1/8$",
                    "C": "$P = 1/4, \\; R = 1/16$",
                    "D": "$P = 1, \\; R = 1/4$"
                },
                "correct_answer": "A",
                "solution": "Plank's geometric coefficients:\n- Infinite slab of thickness $a$: $P = 1/2, R = 1/8$\n- Infinite cylinder of diameter $a$: $P = 1/4, R = 1/16$\n- Sphere of diameter $a$: $P = 1/6, R = 1/24$.",
                "difficulty": "Easy",
                "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Freezing curves and ice crystal morphology",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following statements regarding food freezing physics is/are TRUE?",
                "options": {
                    "A": "Rapid freezing produces numerous small intracellular ice crystals, preserving cellular membrane integrity and minimizing drip loss upon thawing",
                    "B": "Slow freezing forms large extracellular ice crystals that rupture cell walls and cause extensive texture degradation",
                    "C": "Freezing point of foods is lower than $0^\\circ\\text{C}$ due to freezing point depression caused by dissolved solutes (sugars, salts)",
                    "D": "Thermal conductivity of ice is approximately 4 times higher than that of liquid water ($2.2\\text{ W/m K}$ vs $0.6\\text{ W/m K}$)"
                },
                "correct_answer": ["A", "B", "C", "D"],
                "solution": "All four statements are core principles of food freezing science:\n1. Fast freezing yields tiny intracellular crystals (A).\n2. Slow freezing yields large intercellular crystals causing cell puncture (B).\n3. Solutes depress initial freezing points to $-0.5$ to $-3^\\circ\\text{C}$ (C).\n4. Ice has four-fold higher thermal conductivity than water ($2.22$ vs $0.59\\text{ W/m K}$), which is why frozen layers conduct heat faster (D).\nAll options A, B, C, D are true.",
                "difficulty": "Moderate",
                "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
            })

    # 13. Refrigeration Cycles, Refrigerants & Cold Storage Design (43 questions)
    for i in range(1, 44):
        qid = f"QB_DFE_REF_{i:03d}"
        topic = "Refrigeration Cycles, Refrigerants & Cold Storage Design"
        sub = "Vapor compression cycle and Coefficient of Performance (COP)"
        if i % 3 == 1:
            h1 = 390.0 # kJ/kg evaporator exit
            h2 = 425.0 # kJ/kg compressor exit
            h4 = 240.0 # kJ/kg expansion valve exit
            # RE = h1 - h4 = 150 kJ/kg
            # W_comp = h2 - h1 = 35 kJ/kg
            # COP = RE / W_comp = 150 / 35 = 4.29
            cop = round((h1 - h4) / (h2 - h1), 2)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Refrigeration COP from enthalpy states",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"A cold storage vapor compression refrigeration system operates with refrigerant R-134a. The specific enthalpies at key cycle states are: evaporator outlet $h_1 = {h1:.1f}\\text{{ kJ/kg}}$, compressor outlet $h_2 = {h2:.1f}\\text{{ kJ/kg}}$, and condenser outlet (before throttling) $h_3 = h_4 = {h4:.1f}\\text{{ kJ/kg}}$. The Coefficient of Performance ($COP$) of the cycle is ________ (round off to two decimal places).",
                "correct_answer": f"{cop:.2f}",
                "numerical_range": { "min": round(cop - 0.05, 2), "max": round(cop + 0.05, 2) },
                "solution": f"The refrigerating effect ($RE$) is:\n$$RE = h_1 - h_4 = {h1:.1f} - {h4:.1f} = {h1 - h4:.1f}\\text{{ kJ/kg}}$$\nThe work of compression ($W$) is:\n$$W = h_2 - h_1 = {h2:.1f} - {h1:.1f} = {h2 - h1:.1f}\\text{{ kJ/kg}}$$\nThe Coefficient of Performance is:\n$$COP = \\frac{{RE}}{{W}} = \\frac{{{h1 - h4:.1f}}}{{{h2 - h1:.1f}}} = {cop:.2f}$$",
                "difficulty": "Moderate",
                "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
            })
        elif i % 3 == 2:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Carnot COP upper bound",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "The theoretical maximum COP of a Carnot refrigeration cycle operating between an evaporator temperature $T_L$ and a condenser temperature $T_H$ (in Kelvin) is given by:",
                "options": {
                    "A": "$COP_{\\text{Carnot}} = \\frac{T_L}{T_H - T_L}$",
                    "B": "$COP_{\\text{Carnot}} = \\frac{T_H - T_L}{T_L}$",
                    "C": "$COP_{\\text{Carnot}} = \\frac{T_H}{T_H - T_L}$",
                    "D": "$COP_{\\text{Carnot}} = \\frac{T_L}{T_H}$"
                },
                "correct_answer": "A",
                "solution": "For an ideal reversed Carnot cycle, $COP = \\frac{Q_L}{W_{in}} = \\frac{T_L}{T_H - T_L}$.",
                "difficulty": "Easy",
                "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Cooling load components in agricultural cold storage",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following heat sources contribute directly to the total refrigeration cooling load of an apple cold storage warehouse?",
                "options": {
                    "A": "Transmission heat gain through walls, ceiling, and floor",
                    "B": "Respiration heat generated metabolically by living apple fruits",
                    "C": "Air infiltration load due to door openings during loading/unloading",
                    "D": "Sensible heat released by warehouse lighting, forklift motors, and operating personnel"
                },
                "correct_answer": ["A", "B", "C", "D"],
                "solution": "All four components comprise the standard ASHRAE cold storage cooling load:\n1. Transmission load (building envelope conduction)\n2. Product respiration load (vital metabolic heat)\n3. Infiltration load (ambient air ingress)\n4. Internal equipment/occupancy loads (lights, motors, people).\nAll options A, B, C, D are true.",
                "difficulty": "Easy",
                "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
            })

    # 14. Water Activity & Food Packaging (43 questions)
    for i in range(1, 44):
        qid = f"QB_DFE_PKG_{i:03d}"
        topic = "Water Activity & Food Packaging"
        sub = "Water activity limits for microbial proliferation"
        if i % 3 == 1:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Absolute minimum water activity for microbial growth",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "The absolute lower threshold of water activity ($a_w$) below which no known pathogenic or spoilage microorganism (including halophilic bacteria and xerophilic molds) can proliferate is approximately:",
                "options": {
                    "A": "$0.60$",
                    "B": "$0.85$",
                    "C": "$0.75$",
                    "D": "$0.91$"
                },
                "correct_answer": "A",
                "solution": "Microbial growth boundaries:\n- Normal bacteria: $a_w > 0.91$\n- Yeasts: $a_w > 0.88$\n- Ordinary molds: $a_w > 0.80$\n- Halophilic bacteria: $a_w > 0.75$\n- Xerophilic molds / osmophilic yeasts: $a_w > 0.61$.\nBelow $a_w = 0.60$, all microbial proliferation ceases completely.",
                "difficulty": "Easy",
                "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
            })
        elif i % 3 == 2:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Modified Atmosphere Packaging gas functions",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "In Modified Atmosphere Packaging (MAP) of fresh fruits and vegetables, what are the primary functional roles of the gas mixture components?",
                "options": {
                    "A": "Reduced $\\text{O}_2$ ($2-5\\%$) depresses respiration rate and delays senescence without triggering anaerobic fermentation",
                    "B": "Elevated $\\text{CO}_2$ ($3-8\\%$) exerts fungistatic action and retards ethylene biosynthesis",
                    "C": "$\\text{N}_2$ acts as an inert balance gas to prevent package collapse and pillow the package",
                    "D": "Pure $100\\% \\text{CO}$ is routinely pumped to prevent oxidation"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "1. Controlled low oxygen slows respiration while preventing anaerobic off-flavors (A is true).\n2. Carbon dioxide inhibits mold growth and slows ripening (B is true).\n3. Nitrogen is inert filler preventing vacuum package cave-in (C is true).\n4. Carbon monoxide is toxic and never used in fresh horticultural produce packaging (D is false).",
                "difficulty": "Moderate",
                "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Glass transition temperature Tg and caking",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "In dehydrated powdered food products (such as spray-dried milk powder and fruit juices), stickiness, caking, and collapse occur when storage temperature rises above:",
                "options": {
                    "A": "Glass transition temperature ($T_g$)",
                    "B": "Boiling point of water",
                    "C": "Sublimation point of dry ice",
                    "D": "Critical point of carbon dioxide"
                },
                "correct_answer": "A",
                "solution": "Amorphous food powders exist in a rigid, stable 'glassy' state below their glass transition temperature ($T_g$). When ambient temperature rises above $T_g$ (or when moisture absorption plasticizes and lowers $T_g$ below room temperature), the powder transforms into a mobile 'rubbery' state, leading to stickiness, inter-particle bridging, and caking.",
                "difficulty": "Easy",
                "source": "Fundamentals of Food Process Engineering (R.T. Toledo)"
            })

    return questions
