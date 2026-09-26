import json
import math

SVG_MOHR = """<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" class="w-full max-w-[380px] h-auto mx-auto"><rect width="400" height="240" rx="8" fill="#f8fafc" class="dark:fill-slate-900" stroke="#e2e8f0" class="dark:stroke-slate-800"/><line x1="40" y1="170" x2="370" y2="170" stroke="#64748b" stroke-width="1.5"/><line x1="70" y1="210" x2="70" y2="30" stroke="#64748b" stroke-width="1.5"/><text x="345" y="185" font-size="12" font-family="sans-serif" fill="#475569" font-weight="bold">σ (kPa)</text><text x="25" y="45" font-size="12" font-family="sans-serif" fill="#475569" font-weight="bold">τ (kPa)</text><circle cx="210" cy="170" r="80" fill="none" stroke="#2563eb" stroke-width="2"/><circle cx="210" cy="170" r="3" fill="#dc2626"/><text x="205" y="188" font-size="10" font-weight="bold" fill="#dc2626">C</text><circle cx="130" cy="170" r="3" fill="#16a34a"/><text x="120" y="188" font-size="10" font-weight="bold" fill="#16a34a">σ₃</text><circle cx="290" cy="170" r="3" fill="#16a34a"/><text x="285" y="188" font-size="10" font-weight="bold" fill="#16a34a">σ₁</text><circle cx="210" cy="90" r="3" fill="#9333ea"/><line x1="210" y1="170" x2="210" y2="90" stroke="#9333ea" stroke-dasharray="3,3"/><text x="215" y="95" font-size="10" font-weight="bold" fill="#9333ea">τ_max = R</text><line x1="70" y1="140" x2="350" y2="50" stroke="#e11d48" stroke-width="2" stroke-dasharray="4,2"/><text x="270" y="65" font-size="10" font-weight="bold" fill="#e11d48">τ = c + σ tan φ</text></svg>"""

SVG_ENERGY = """<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" class="w-full max-w-[380px] h-auto mx-auto"><rect width="400" height="240" rx="8" fill="#f8fafc" class="dark:fill-slate-900" stroke="#e2e8f0" class="dark:stroke-slate-800"/><line x1="50" y1="200" x2="360" y2="200" stroke="#64748b" stroke-width="2"/><line x1="50" y1="200" x2="50" y2="30" stroke="#64748b" stroke-width="2"/><text x="310" y="220" font-size="12" font-family="sans-serif" fill="#475569" font-weight="bold">Specific Energy (E)</text><text x="20" y="45" font-size="12" font-family="sans-serif" fill="#475569" font-weight="bold">Depth (y)</text><line x1="50" y1="200" x2="210" y2="40" stroke="#cbd5e1" stroke-dasharray="4,4" stroke-width="1.5"/><text x="215" y="50" font-size="9" fill="#94a3b8">E = y (PE)</text><path d="M 330 50 Q 150 110 150 135 Q 150 160 330 185" fill="none" stroke="#2563eb" stroke-width="2.5"/><circle cx="150" cy="135" r="4" fill="#dc2626"/><line x1="150" y1="200" x2="150" y2="135" stroke="#dc2626" stroke-dasharray="3,3"/><line x1="50" y1="135" x2="150" y2="135" stroke="#dc2626" stroke-dasharray="3,3"/><text x="135" y="215" font-size="10" font-weight="bold" fill="#dc2626">E_min</text><text x="25" y="138" font-size="10" font-weight="bold" fill="#dc2626">y_c</text><text x="240" y="80" font-size="10" fill="#16a34a" font-weight="bold">Subcritical (Fr &lt; 1)</text><text x="240" y="175" font-size="10" fill="#d97706" font-weight="bold">Supercritical (Fr &gt; 1)</text></svg>"""

def generate_swce_questions():
    questions = []
    def add(q):
        questions.append(q)

    SEC = "Section 4: Soil and Water Conservation Engineering"

    # 1. Fluid Statics, Pressure & Manometry (30 questions)
    for i in range(1, 31):
        qid = f"QB_SWCE_STA_{i:03d}"
        topic = "Fluid Statics, Pressure & Manometry"
        sub = "Hydrostatic pressure and center of pressure"
        if i % 3 == 1:
            h = 2.0 + (i % 5) * 0.5
            w = 1.5
            d = h
            # Vertical rectangular gate width w, depth d
            # Force F = rho * g * (d/2) * (w * d)
            F = round(9810 * (d / 2.0) * (w * d) / 1000.0, 2) # kN
            h_cp = round((2.0 / 3.0) * d, 3)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": sub,
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": f"A vertical rectangular sluice gate of width ${w}\\text{{ m}}$ and height ${d}\\text{{ m}}$ is placed in a water reservoir with its top edge coinciding with the free water surface. Taking the unit weight of water $\\gamma_w = 9.81\\text{{ kN/m}}^3$, the total hydrostatic pressure force on the gate is:",
                "options": {
                    "A": f"${F:.2f}\\text{{ kN}}$",
                    "B": f"${F * 1.5:.2f}\\text{{ kN}}$",
                    "C": f"${F * 0.67:.2f}\\text{{ kN}}$",
                    "D": f"${F * 2.0:.2f}\\text{{ kN}}$"
                },
                "correct_answer": "A",
                "solution": f"The total hydrostatic force on a submerged vertical plane area is:\n$$F = \\rho g \\bar{{h}} A = \\gamma_w \\bar{{h}} A$$\nHere $\\bar{{h}} = \\frac{{d}}{{2}} = \\frac{{{d}}}{{2}} = {d/2:.2f}\\text{{ m}}$, and area $A = {w} \\times {d} = {w*d:.2f}\\text{{ m}}^2$.\n$$F = 9.81 \\times {d/2:.2f} \\times {w*d:.2f} = {F:.2f}\\text{{ kN}}$$",
                "difficulty": "Easy",
                "source": "Fluid Mechanics (A.K. Jain)"
            })
        elif i % 3 == 2:
            rho_m = 13600.0
            rho_w = 1000.0
            dh = 0.15 + (i % 6) * 0.05 # m of Hg
            # pressure head difference in m of water
            h_diff = round(dh * (rho_m / rho_w - 1.0), 3)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Differential manometer deflection",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"A differential mercury-water U-tube manometer connected across a pipeline carrying water registers a mercury column deflection of ${dh*100:.1f}\\text{{ cm}}$. Taking density of mercury as $13600\\text{{ kg/m}}^3$ and water as $1000\\text{{ kg/m}}^3$, the pressure head difference between the two points is ________ $\\text{{m of water}}$ (round off to two decimal places).",
                "correct_answer": f"{h_diff:.2f}",
                "numerical_range": { "min": round(h_diff - 0.05, 2), "max": round(h_diff + 0.05, 2) },
                "solution": f"The pressure head difference $h$ across a differential manometer carrying a heavier manometric liquid is:\n$$h = y \\left( \\frac{{S_m}}{{S}} - 1 \\right)$$\nwhere $y = {dh:.2f}\\text{{ m}}$, $S_m = 13.6$, and $S = 1.0$.\n$$h = {dh:.2f} \\times (13.6 - 1) = {dh:.2f} \\times 12.6 = {h_diff:.3f}\\text{{ m of water}}$$\nRounding to two decimal places: ${h_diff:.2f}\\text{{ m}}$.",
                "difficulty": "Moderate",
                "source": "Fluid Mechanics (A.K. Jain)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Properties of fluid statics and buoyancy",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following statements regarding fluid statics and buoyancy is/are TRUE?",
                "options": {
                    "A": "The center of pressure on an inclined or vertical submerged surface always lies below its centroid",
                    "B": "For a floating body to be in stable equilibrium, its metacentric height ($GM$) must be positive ($GM > 0$)",
                    "C": "The buoyant force on a completely submerged body acts through the center of gravity of the displaced fluid",
                    "D": "In a static fluid, shear stress is non-zero along planes with maximum pressure gradients"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "1. Center of pressure depth $h_{cp} = \\bar{h} + \\frac{I_{xx}}{\\bar{h} A \\sin^2 \\theta} > \\bar{h}$, so it lies strictly below the centroid for submerged non-horizontal surfaces (A is true).\n2. A floating body is stable if the metacenter $M$ is above the center of gravity $G$, i.e., $GM > 0$ (B is true).\n3. By Archimedes' principle, buoyancy acts through the centroid of displaced volume (center of buoyancy), which is the center of gravity of displaced fluid (C is true).\n4. In a static fluid, shear stresses are identically zero everywhere regardless of pressure gradient; fluids cannot sustain static shear (D is false).",
                "difficulty": "Moderate",
                "source": "Fluid Mechanics (A.K. Jain)"
            })

    # 2. Dynamics of Flow & Bernoulli Equation (30 questions)
    for i in range(1, 31):
        qid = f"QB_SWCE_DYN_{i:03d}"
        topic = "Dynamics of Flow & Bernoulli Equation"
        sub = "Bernoulli equation and energy head"
        if i % 3 == 1:
            d1 = 0.20
            d2 = 0.10
            q_flow = 0.05 + (i % 5) * 0.01 # m3/s
            v1 = round(q_flow / (math.pi * d1**2 / 4.0), 3)
            v2 = round(q_flow / (math.pi * d2**2 / 4.0), 3)
            # dp = rho/2 * (v2^2 - v1^2)
            dp = round(1000.0 / 2.0 * (v2**2 - v1**2) / 1000.0, 2) # kPa
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Venturimeter pressure differential",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"Water flows through a horizontal pipe of diameter $20\\text{{ cm}}$ tapering to $10\\text{{ cm}}$ at a rate of ${q_flow:.3f}\\text{{ m}}^3/\\text{{s}}$. Neglecting frictional losses, the pressure drop between the inlet and throat is ________ $\\text{{kPa}}$ (round off to two decimal places).",
                "correct_answer": f"{dp:.2f}",
                "numerical_range": { "min": round(dp - 0.2, 2), "max": round(dp + 0.2, 2) },
                "solution": f"From continuity:\n$$A_1 = \\frac{{\\pi}}{{4}} (0.20)^2 = {math.pi*0.04/4:.5f}\\text{{ m}}^2 \\implies v_1 = \\frac{{{q_flow}}}{{A_1}} = {v1:.3f}\\text{{ m/s}}$$\n$$A_2 = \\frac{{\\pi}}{{4}} (0.10)^2 = {math.pi*0.01/4:.5f}\\text{{ m}}^2 \\implies v_2 = \\frac{{{q_flow}}}{{A_2}} = {v2:.3f}\\text{{ m/s}}$$\nApplying Bernoulli's equation for horizontal pipe ($z_1 = z_2$):\n$$P_1 - P_2 = \\frac{{1}}{{2}} \\rho (v_2^2 - v_1^2) = \\frac{{1000}}{{2}} ({v2:.3f}^2 - {v1:.3f}^2) = {dp*1000:.1f}\\text{{ Pa}} = {dp:.2f}\\text{{ kPa}}$$",
                "difficulty": "Moderate",
                "source": "Fluid Mechanics (A.K. Jain)"
            })
        elif i % 3 == 2:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Assumptions of Bernoulli equation",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "Bernoulli's energy equation along a streamline $\\frac{P}{\\rho g} + \\frac{v^2}{2g} + z = \\text{constant}$ is derived under which set of fundamental assumptions?",
                "options": {
                    "A": "Steady, incompressible, frictionless (inviscid), and along a streamline",
                    "B": "Unsteady, compressible, irrotational, and viscous",
                    "C": "Steady, compressible, turbulent, and along a streamline",
                    "D": "Incompressible, unsteady, rotational, and boundary-layer flow"
                },
                "correct_answer": "A",
                "solution": "Bernoulli's equation is derived by integrating Euler's equation of motion along a streamline under the four core assumptions:\n1. Steady flow ($\\partial/\\partial t = 0$)\n2. Incompressible fluid ($\\rho = \\text{constant}$)\n3. Frictionless / inviscid fluid (shear stress $\\tau = 0$)\n4. Flow along a streamline.",
                "difficulty": "Easy",
                "source": "Fluid Mechanics (A.K. Jain)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Energy and momentum correction factors",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following statements concerning kinetic energy correction factor ($\\alpha$) and momentum correction factor ($\\beta$) is/are TRUE?",
                "options": {
                    "A": "For fully developed laminar flow in a circular pipe, $\\alpha = 2.0$ and $\\beta = 4/3$",
                    "B": "For uniform velocity distribution across the entire cross-section, $\\alpha = 1.0$ and $\\beta = 1.0$",
                    "C": "In open channel flow, $\\alpha$ is always less than or equal to $\\beta$",
                    "D": "For turbulent flow in commercial pipes, $\\alpha$ typically ranges between $1.02$ and $1.08$"
                },
                "correct_answer": ["A", "B", "D"],
                "solution": "1. For parabolic laminar velocity profile in pipes: $\\alpha = \\frac{1}{A}\\int (u/V)^3 dA = 2.0$, and $\\beta = \\frac{1}{A}\\int (u/V)^2 dA = 4/3 \\approx 1.33$ (A is true).\n2. For ideal uniform flow: $\\alpha = \\beta = 1.0$ (B is true).\n3. By Jensen's inequality / Schwarz inequality, $\\alpha \\ge \\beta \\ge 1.0$ always, never $\\alpha \\le \\beta$ (C is false).\n4. In turbulent pipe flow, velocity profiles are blunt, so $\\alpha \\approx 1.02 - 1.08$ (D is true).",
                "difficulty": "Hard",
                "source": "Open Channel Hydraulics (Ven Te Chow)"
            })

    # 3. Pipe Flow, Darcy-Weisbach & Minor Losses (28 questions)
    for i in range(1, 29):
        qid = f"QB_SWCE_PIP_{i:03d}"
        topic = "Pipe Flow, Darcy-Weisbach & Minor Losses"
        sub = "Friction head loss and Darcy-Weisbach equation"
        if i % 2 == 1:
            L = 200.0 + (i % 6) * 50.0
            D = 0.15
            f = 0.02
            v = 1.2 + (i % 4) * 0.2
            hf = round((f * L * (v**2)) / (2.0 * 9.81 * D), 2)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": sub,
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"Water flows through a commercial pipe of length ${L:.0f}\\text{{ m}}$ and internal diameter ${D*100:.0f}\\text{{ cm}}$ at an average velocity of ${v:.1f}\\text{{ m/s}}$. Taking the Darcy friction factor $f = {f}$ and acceleration due to gravity $g = 9.81\\text{{ m/s}}^2$, the head loss due to friction is ________ $\\text{{m}}$ (round off to two decimal places).",
                "correct_answer": f"{hf:.2f}",
                "numerical_range": { "min": round(hf - 0.1, 2), "max": round(hf + 0.1, 2) },
                "solution": f"Using Darcy-Weisbach equation:\n$$h_f = \\frac{{f L v^2}}{{2 g D}}$$\nGiven $f = {f}$, $L = {L:.0f}\\text{{ m}}$, $v = {v:.1f}\\text{{ m/s}}$, $D = {D}\\text{{ m}}$:\n$$h_f = \\frac{{{f} \\times {L:.0f} \\times ({v:.1f})^2}}{{2 \\times 9.81 \\times {D}}} = \\frac{{{f * L * v**2:.4f}}}{{{2 * 9.81 * D:.4f}}} = {hf:.2f}\\text{{ m}}$$",
                "difficulty": "Moderate",
                "source": "Fluid Mechanics (A.K. Jain)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Laminar flow friction factor vs Reynolds number",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "For fully developed laminar flow of a Newtonian fluid through a smooth circular pipe of diameter $D$ at Reynolds number $Re$, the Darcy friction factor $f$ is given by:",
                "options": {
                    "A": "$f = \\frac{64}{Re}$",
                    "B": "$f = \\frac{16}{Re}$",
                    "C": "$f = \\frac{0.316}{Re^{0.25}}$",
                    "D": "$f = \\frac{0.079}{Re^{0.25}}$"
                },
                "correct_answer": "A",
                "solution": "In Hagen-Poiseuille laminar pipe flow, the pressure drop is $\\Delta P = \\frac{32 \\mu v L}{D^2}$. Equating this with the Darcy-Weisbach form $\\Delta P = f \\frac{L}{D} \\frac{\\rho v^2}{2}$ yields:\n$$f = \\frac{64 \\mu}{\\rho v D} = \\frac{64}{Re}$$\nNote: Fanning friction factor $f' = 16/Re$, but the standard engineering Darcy friction factor is $64/Re$.",
                "difficulty": "Easy",
                "source": "Fluid Mechanics (A.K. Jain)"
            })

    # 4. Open Channel Hydraulics & Manning Equation (30 questions)
    for i in range(1, 31):
        qid = f"QB_SWCE_OCH_{i:03d}"
        topic = "Open Channel Hydraulics & Manning Equation"
        sub = "Most economical trapezoidal channel section"
        if i % 3 == 1:
            y = 1.0 + (i % 5) * 0.2
            # For most economical trapezoidal section with side slope 1:1 / sqrt(3) (m = 1/sqrt(3) or 60 deg)
            # Hydraulic radius R = y / 2
            R = round(y / 2.0, 3)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Most efficient hydraulic cross section",
                "type": "NAT",
                "marks": 1,
                "negative_marks": 0,
                "question": f"A trapezoidal channel is designed for maximum hydraulic efficiency with a normal flow depth of $y = {y:.2f}\\text{{ m}}$. The hydraulic radius of this most economical section is ________ $\\text{{m}}$ (round off to two decimal places).",
                "correct_answer": f"{R:.2f}",
                "numerical_range": { "min": round(R - 0.02, 2), "max": round(R + 0.02, 2) },
                "solution": f"For any most economical / hydraulically efficient trapezoidal channel section, the hydraulic radius $R$ is half of the depth of flow:\n$$R = \\frac{{y}}{{2}}$$\nGiven $y = {y:.2f}\\text{{ m}}$:\n$$R = \\frac{{{y:.2f}}}{{2}} = {R:.2f}\\text{{ m}}$$",
                "difficulty": "Easy",
                "source": "Open Channel Hydraulics (Ven Te Chow)"
            })
        elif i % 3 == 2:
            n = 0.02
            S = 0.001
            b = 2.0 + (i % 4) * 0.5
            y = 1.0
            A = b * y
            P = b + 2 * y
            R = A / P
            V = (1.0 / n) * (R**(2.0/3.0)) * (S**0.5)
            Q = round(A * V, 2)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Manning discharge in rectangular channel",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"A rectangular lined open channel has a bed width of ${b:.1f}\\text{{ m}}$, flow depth of ${y:.1f}\\text{{ m}}$, bed slope $S_0 = 1/1000$, and Manning's roughness coefficient $n = {n}$. The discharge capacity of the channel is ________ $\\text{{m}}^3/\\text{{s}}$ (round off to two decimal places).",
                "correct_answer": f"{Q:.2f}",
                "numerical_range": { "min": round(Q - 0.1, 2), "max": round(Q + 0.1, 2) },
                "solution": f"Flow area $A = b \\times y = {b:.1f} \\times {y:.1f} = {A:.2f}\\text{{ m}}^2$.\nWetted perimeter $P = b + 2y = {b:.1f} + 2({y:.1f}) = {P:.1f}\\text{{ m}}$.\nHydraulic radius $R = \\frac{{A}}{{P}} = \\frac{{{A:.2f}}}{{{P:.1f}}} = {R:.4f}\\text{{ m}}$.\nUsing Manning's equation:\n$$Q = \\frac{{1}}{{n}} A R^{{2/3}} S_0^{{1/2}} = \\frac{{1}}{{{n}}} \\times {A:.2f} \\times ({R:.4f})^{{2/3}} \\times \\sqrt{{0.001}} = {Q:.2f}\\text{{ m}}^3/\\text{{s}}$$",
                "difficulty": "Moderate",
                "source": "Open Channel Hydraulics (Ven Te Chow)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Conditions for most economical sections",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following conditions is/are satisfied for the most economical (most efficient) open channel cross-sections?",
                "options": {
                    "A": "For a rectangular channel of depth $y$ and width $b$, the most economical condition is $b = 2y$",
                    "B": "For a triangular channel, the most efficient vertex angle is $90^\\circ$ (side slopes $1:1$)",
                    "C": "For a trapezoidal channel, the hydraulic radius $R = y/2$",
                    "D": "The wetted perimeter is minimized for a given cross-sectional area and bed slope"
                },
                "correct_answer": ["A", "B", "C", "D"],
                "solution": "All four conditions are canonical theorems of open channel design:\n1. Rectangular: $b = 2y$, $R = y/2$.\n2. Triangular: central angle $\\theta = 90^\\circ$ (side slope $z = 1$).\n3. Trapezoidal: semi-hexagon with $R = y/2$ and side slope $60^\\circ$ to horizontal.\n4. Maximum discharge for given area corresponds mathematically to minimum wetted perimeter $P$.\nHence, A, B, C, D are all true.",
                "difficulty": "Moderate",
                "source": "Open Channel Hydraulics (Ven Te Chow)"
            })

    # 5. Specific Energy, Critical Flow & Hydraulic Jump (30 questions with SVG diagram)
    for i in range(1, 31):
        qid = f"QB_SWCE_ENR_{i:03d}"
        topic = "Specific Energy, Critical Flow & Hydraulic Jump"
        sub = "Critical depth and hydraulic jump conjugate depths"
        if i % 3 == 1:
            q_unit = 1.5 + (i % 6) * 0.5 # m3/s per m
            yc = round(((q_unit**2) / 9.81)**(1.0/3.0), 3)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Critical depth in rectangular channel",
                "type": "NAT",
                "marks": 1,
                "negative_marks": 0,
                "diagram_svg": SVG_ENERGY,
                "question": f"In a rectangular open channel illustrated in the specific energy diagram, the unit discharge is $q = {q_unit:.2f}\\text{{ m}}^3/\\text{{s per m width}}$. Taking $g = 9.81\\text{{ m/s}}^2$, the critical depth of flow $y_c$ is ________ $\\text{{m}}$ (round off to two decimal places).",
                "correct_answer": f"{yc:.2f}",
                "numerical_range": { "min": round(yc - 0.03, 2), "max": round(yc + 0.03, 2) },
                "solution": f"In a rectangular channel, critical depth $y_c$ occurs at minimum specific energy:\n$$y_c = \\left( \\frac{{q^2}}{{g}} \\right)^{{1/3}}$$\nGiven $q = {q_unit:.2f}\\text{{ m}}^3/\\text{{s/m}}$ and $g = 9.81\\text{{ m/s}}^2$:\n$$y_c = \\left( \\frac{{{q_unit**2:.4f}}}{{9.81}} \\right)^{{1/3}} = ({q_unit**2/9.81:.5f})^{{1/3}} = {yc:.3f}\\text{{ m}}$$\nRounding to two decimal places: ${yc:.2f}\\text{{ m}}$.",
                "difficulty": "Moderate",
                "source": "Flow in Open Channels (K. Subramanya)"
            })
        elif i % 3 == 2:
            y1 = 0.30 + (i % 4) * 0.05
            Fr1 = 4.0 + (i % 3) * 0.5
            y2 = round((y1 / 2.0) * (math.sqrt(1.0 + 8.0 * (Fr1**2)) - 1.0), 2)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Hydraulic jump Belanger equation",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "diagram_svg": SVG_ENERGY,
                "question": f"A hydraulic jump forms in a horizontal rectangular channel. The initial supercritical depth before the jump is $y_1 = {y1:.2f}\\text{{ m}}$ and the upstream Froude number is $Fr_1 = {Fr1:.1f}$. The sequent (subcritical) depth $y_2$ after the jump is ________ $\\text{{m}}$ (round off to two decimal places).",
                "correct_answer": f"{y2:.2f}",
                "numerical_range": { "min": round(y2 - 0.05, 2), "max": round(y2 + 0.05, 2) },
                "solution": f"According to the Belanger equation for conjugate depths across a hydraulic jump in a rectangular channel:\n$$\\frac{{y_2}}{{y_1}} = \\frac{{1}}{{2}} \\left( \\sqrt{{1 + 8 Fr_1^2}} - 1 \\right)$$\nSubstituting $y_1 = {y1:.2f}\\text{{ m}}$ and $Fr_1 = {Fr1:.1f}$:\n$$\\sqrt{{1 + 8({Fr1:.1f})^2}} = \\sqrt{{1 + {8 * Fr1**2:.1f}}} = {math.sqrt(1 + 8 * Fr1**2):.4f}$$\n$$y_2 = \\frac{{{y1:.2f}}}{{2}} \\times ({math.sqrt(1 + 8 * Fr1**2):.4f} - 1) = {y2:.2f}\\text{{ m}}$$",
                "difficulty": "Hard",
                "source": "Flow in Open Channels (K. Subramanya)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Characteristics of critical flow and hydraulic jump",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following statements regarding critical flow and hydraulic jumps is/are TRUE?",
                "options": {
                    "A": "At critical flow depth, the specific energy is minimum for a given discharge",
                    "B": "A hydraulic jump can only occur when the incoming upstream flow is supercritical ($Fr_1 > 1$)",
                    "C": "The energy loss $\\Delta E$ in a rectangular channel jump is given by $\\Delta E = \\frac{(y_2 - y_1)^3}{4 y_1 y_2}$",
                    "D": "In a rectangular channel, the minimum specific energy is $E_{\\min} = 2.5 y_c$"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "1. At critical flow, $\\frac{dE}{dy} = 0$, giving absolute minimum specific energy (A is true).\n2. Jumps convert high-velocity supercritical flow ($Fr_1 > 1$) to subcritical flow ($Fr_2 < 1$) with significant turbulence dissipation (B is true).\n3. By momentum and energy balance, head loss across jump is $\\Delta E = \\frac{(y_2 - y_1)^3}{4 y_1 y_2}$ (C is true).\n4. In rectangular channels, $E_{\\min} = y_c + \\frac{v_c^2}{2g} = y_c + 0.5 y_c = 1.5 y_c$, not $2.5 y_c$ (D is false).",
                "difficulty": "Moderate",
                "source": "Flow in Open Channels (K. Subramanya)"
            })

    # 6. Flow Measurement: Weirs, Flumes & Orifices (28 questions)
    for i in range(1, 29):
        qid = f"QB_SWCE_MEA_{i:03d}"
        topic = "Flow Measurement: Weirs, Flumes & Orifices"
        sub = "Triangular and rectangular weir discharge formulas"
        if i % 2 == 1:
            H = 0.25 + (i % 5) * 0.05
            Cd = 0.60
            # 90 deg V-notch Q = 8/15 * Cd * sqrt(2g) * tan(45) * H^2.5
            Q_notch = round((8.0 / 15.0) * Cd * math.sqrt(2.0 * 9.81) * (H**2.5) * 1000.0, 1) # L/s
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "90 degree V-notch weir discharge",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"A $90^\\circ$ triangular V-notch weir is used to measure flow in an irrigation field channel. If the head over the crest is $H = {H*100:.0f}\\text{{ cm}}$ and coefficient of discharge $C_d = {Cd:.2f}$, the discharge is ________ $\\text{{L/s}}$ (round off to one decimal place).",
                "correct_answer": f"{Q_notch:.1f}",
                "numerical_range": { "min": round(Q_notch - 1.0, 1), "max": round(Q_notch + 1.0, 1) },
                "solution": f"For a symmetrical triangular weir with vertex angle $\\theta = 90^\\circ$:\n$$Q = \\frac{{8}}{{15}} C_d \\sqrt{{2g}} \\tan\\left(\\frac{{\\theta}}{{2}}\\right) H^{{5/2}}$$\nHere $\\theta/2 = 45^\\circ$, $\\tan(45^\\circ) = 1$, $H = {H:.2f}\\text{{ m}}$:\n$$Q = \\frac{{8}}{{15}} \\times {Cd:.2f} \\times \\sqrt{{19.62}} \\times 1 \\times ({H:.2f})^{{2.5}} = 1.4174 \\times ({H:.2f})^{{2.5}}\\text{{ m}}^3/\\text{{s}}$$\n$$Q = {Q_notch/1000.0:.4f}\\text{{ m}}^3/\\text{{s}} = {Q_notch:.1f}\\text{{ L/s}}$$",
                "difficulty": "Moderate",
                "source": "Irrigation Theory and Practice (A.M. Michael)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Suppressed vs contracted weirs",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "According to Francis formula for a sharp-crested rectangular weir with $n$ end contractions, the effective crest length $L'$ is related to nominal length $L$ and head $H$ by:",
                "options": {
                    "A": "$L' = L - 0.1 n H$",
                    "B": "$L' = L + 0.1 n H$",
                    "C": "$L' = L - 0.2 n H^2$",
                    "D": "$L' = L \\sqrt{1 - 0.1 n H}$"
                },
                "correct_answer": "A",
                "solution": "Francis' empirical weir formula accounts for end contraction by reducing the effective crest length by $0.1 H$ for each end contraction:\n$$L' = L - 0.1 n H$$\nFor a weir with 2 end contractions ($n = 2$), $L' = L - 0.2 H$.",
                "difficulty": "Easy",
                "source": "Fluid Mechanics (A.K. Jain)"
            })

    # 7. Soil Physical Properties & Phase Relationships (30 questions)
    for i in range(1, 31):
        qid = f"QB_SWCE_SOIL_{i:03d}"
        topic = "Soil Physical Properties & Phase Relationships"
        sub = "Void ratio, porosity, and dry density"
        if i % 3 == 1:
            e = 0.60 + (i % 6) * 0.05
            n_pct = round((e / (1.0 + e)) * 100.0, 2)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Porosity from void ratio",
                "type": "NAT",
                "marks": 1,
                "negative_marks": 0,
                "question": f"A sample of agricultural soil has a void ratio of $e = {e:.2f}$. The porosity of the soil sample is ________ $\\%$ (round off to two decimal places).",
                "correct_answer": f"{n_pct:.2f}",
                "numerical_range": { "min": round(n_pct - 0.2, 2), "max": round(n_pct + 0.2, 2) },
                "solution": f"The relationship between porosity $n$ and void ratio $e$ is:\n$$n = \\frac{{e}}{{1 + e}}$$\nGiven $e = {e:.2f}$:\n$$n = \\frac{{{e:.2f}}}{{1 + {e:.2f}}} = \\frac{{{e:.2f}}}{{{1 + e:.2f}}} = {n_pct/100.0:.4f}$$\nIn percentage: $n = {n_pct:.2f}\\%$.",
                "difficulty": "Easy",
                "source": "Soil Mechanics and Foundations (B.C. Punmia)"
            })
        elif i % 3 == 2:
            Gs = 2.65
            w = 0.15 + (i % 5) * 0.02
            Sr = 0.80
            e = round((w * Gs) / Sr, 3)
            gamma_d = round((Gs * 9.81) / (1.0 + e), 2)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Dry unit weight from moisture content and degree of saturation",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"A soil specimen has a specific gravity of soil solids $G_s = {Gs}$, gravimetric water content $w = {w*100:.1f}\\%$, and degree of saturation $S_r = {Sr*100:.0f}\\%$. Taking unit weight of water $\\gamma_w = 9.81\\text{{ kN/m}}^3$, the dry unit weight of the soil $\\gamma_d$ is ________ $\\text{{kN/m}}^3$ (round off to two decimal places).",
                "correct_answer": f"{gamma_d:.2f}",
                "numerical_range": { "min": round(gamma_d - 0.1, 2), "max": round(gamma_d + 0.1, 2) },
                "solution": f"From the fundamental phase identity $e \\cdot S_r = w \\cdot G_s$:\n$$e = \\frac{{w G_s}}{{S_r}} = \\frac{{{w:.3f} \\times {Gs}}}{{{Sr}}} = {e:.4f}$$\nThen, dry unit weight is:\n$$\\gamma_d = \\frac{{G_s \\gamma_w}}{{1 + e}} = \\frac{{{Gs} \\times 9.81}}{{1 + {e:.4f}}} = \\frac{{{Gs * 9.81:.3f}}}{{{1 + e:.4f}}} = {gamma_d:.2f}\\text{{ kN/m}}^3$$.",
                "difficulty": "Moderate",
                "source": "Soil Mechanics and Foundations (B.C. Punmia)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Phase relations in soil mechanics",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following statements regarding soil phase relationships is/are TRUE?",
                "options": {
                    "A": "Porosity $n$ is strictly bounded between $0$ and $1$ ($0 < n < 1$), whereas void ratio $e$ can exceed $1$",
                    "B": "For fully saturated soil, degree of saturation $S_r = 100\\%$ and air content $a_c = 0$",
                    "C": "Submerged unit weight $\\gamma'$ is related to saturated unit weight $\\gamma_{sat}$ by $\\gamma' = \\gamma_{sat} - \\gamma_w$",
                    "D": "Water content $w$ defined on dry weight basis cannot exceed $100\\%$ under any geological condition"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "1. Porosity $n = V_v / V < 1$ because void volume cannot exceed total volume. Void ratio $e = V_v / V_s$ can exceed $1.0$ (e.g. highly organic soils, bentonite clays have $e > 2$) (A is true).\n2. Degree of saturation $S_r = V_w/V_v$; at full saturation $V_w = V_v$, so $S_r = 1$ and air content $a_c = 1 - S_r = 0$ (B is true).\n3. Buoyant unit weight $\\gamma' = \\gamma_{sat} - \\gamma_w$ by Archimedes principle (C is true).\n4. Water content $w = W_w / W_s$; highly organic soils, peats, or sensitive clays frequently have water contents exceeding $100\\%$ to $500\\%$ (D is false).",
                "difficulty": "Moderate",
                "source": "Soil Mechanics and Foundations (B.C. Punmia)"
            })

    # 8. Soil Permeability, Seepage & Flow Nets (30 questions)
    for i in range(1, 31):
        qid = f"QB_SWCE_SEP_{i:03d}"
        topic = "Soil Permeability, Seepage & Flow Nets"
        sub = "Flow net seepage rate and critical hydraulic gradient"
        if i % 3 == 1:
            k = 2.5e-5 # m/s
            H = 4.0 + (i % 4) * 1.0 # m head
            Nf = 4
            Nd = 10 + (i % 3) * 2
            q_seep = round(k * H * (Nf / float(Nd)) * 3600.0 * 24.0, 3) # m3/day per m length
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Seepage discharge under weir from flow net",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"A flow net constructed under a diversion weir consists of ${Nf}$ flow channels and ${Nd}$ equipotential drops. The total hydraulic head across the weir is $H = {H:.1f}\\text{{ m}}$ and the hydraulic conductivity of the foundation soil is $k = 2.5 \\times 10^{{-5}}\\text{{ m/s}}$. The seepage discharge per unit length of the weir is ________ $\\text{{m}}^3/\\text{{day per m}}$ (round off to two decimal places).",
                "correct_answer": f"{q_seep:.2f}",
                "numerical_range": { "min": round(q_seep - 0.05, 2), "max": round(q_seep + 0.05, 2) },
                "solution": f"From flow net theory, the seepage discharge per unit width is:\n$$q = k H \\frac{{N_f}}{{N_d}}$$\nGiven $k = 2.5 \\times 10^{{-5}}\\text{{ m/s}}$, $H = {H:.1f}\\text{{ m}}$, $N_f = {Nf}$, $N_d = {Nd}$:\n$$q = (2.5 \\times 10^{{-5}}) \\times {H:.1f} \\times \\frac{{{Nf}}}{{{Nd}}} = {k * H * Nf / Nd:.6e}\\text{{ m}}^3/\\text{{s per m}}$$\nConverting to $\\text{{m}}^3/\\text{{day}}$ ($1\\text{{ day}} = 86400\\text{{ s}}$):\n$$q = {k * H * Nf / Nd:.6e} \\times 86400 = {q_seep:.3f}\\text{{ m}}^3/\\text{{day per m}}$$\nRounding to two decimal places: ${q_seep:.2f}\\text{{ m}}^3/\\text{{day per m}}$.",
                "difficulty": "Moderate",
                "source": "Soil Mechanics and Foundations (B.C. Punmia)"
            })
        elif i % 3 == 2:
            Gs = 2.65
            e = 0.65 + (i % 5) * 0.05
            ic = round((Gs - 1.0) / (1.0 + e), 3)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Critical hydraulic gradient and quicksand condition",
                "type": "NAT",
                "marks": 1,
                "negative_marks": 0,
                "question": f"A sandy foundation layer has a solid specific gravity $G_s = {Gs}$ and void ratio $e = {e:.2f}$. The critical hydraulic gradient $i_c$ at which quicksand condition (boiling) occurs is ________ (round off to two decimal places).",
                "correct_answer": f"{ic:.2f}",
                "numerical_range": { "min": round(ic - 0.03, 2), "max": round(ic + 0.03, 2) },
                "solution": f"Critical hydraulic gradient occurs when upward seepage pressure balances submerged weight of soil:\n$$i_c = \\frac{{\\gamma'}}{{\\gamma_w}} = \\frac{{G_s - 1}}{{1 + e}}$$\nGiven $G_s = {Gs}$ and $e = {e:.2f}$:\n$$i_c = \\frac{{{Gs} - 1}}{{1 + {e:.2f}}} = \\frac{{{Gs - 1:.2f}}}{{{1 + e:.2f}}} = {ic:.3f}$$\nRounding to two decimal places: ${ic:.2f}$.",
                "difficulty": "Easy",
                "source": "Soil Mechanics and Foundations (B.C. Punmia)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Properties of flow net",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following statements regarding orthogonal flow nets is/are TRUE?",
                "options": {
                    "A": "Flow lines (streamlines) and equipotential lines intersect orthogonally at $90^\\circ$ everywhere in an isotropic soil",
                    "B": "The rate of seepage through each flow channel between adjacent streamlines is equal",
                    "C": "The drop in total head between any two adjacent equipotential lines is constant ($\u0394h = H / N_d$)",
                    "D": "In anisotropic soil where $k_x \\ne k_z$, flow nets can only be drawn after transforming coordinates by $x' = x \\sqrt{k_z/k_x}$"
                },
                "correct_answer": ["A", "B", "C", "D"],
                "solution": "All four properties define classical flow net theory for Laplace's equation $\\nabla^2 h = 0$:\n1. Orthogonality holds strictly for isotropic media ($k_x = k_z$).\n2. By definition of flow channel, $\\Delta q = k \\Delta h (b/a)$; for square elements ($b/a = 1$), $\\Delta q$ is identical in every channel.\n3. Head loss per field is $\\Delta h = H / N_d$.\n4. For anisotropic permeability, coordinate transformation $x' = x \\sqrt{k_z/k_x}$ restores Laplace form $\\frac{\\partial^2 h}{\\partial x'^2} + \\frac{\\partial^2 h}{\\partial z^2} = 0$.\nAll options A, B, C, D are correct.",
                "difficulty": "Moderate",
                "source": "Soil Mechanics and Foundations (B.C. Punmia)"
            })

    # 9. Soil Shear Strength & Mohr-Coulomb Theory (30 questions with SVG Mohr circle)
    for i in range(1, 31):
        qid = f"QB_SWCE_SHR_{i:03d}"
        topic = "Soil Shear Strength & Mohr-Coulomb Theory"
        sub = "Mohr-Coulomb failure criteria and triaxial test"
        if i % 3 == 1:
            c = 15.0 + (i % 5) * 5.0 # kPa
            phi_deg = 30
            sigma_n = 100.0 + (i % 4) * 20.0 # kPa
            phi_rad = math.radians(phi_deg)
            tau_f = round(c + sigma_n * math.tan(phi_rad), 2)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Shear strength on failure plane",
                "type": "NAT",
                "marks": 1,
                "negative_marks": 0,
                "diagram_svg": SVG_MOHR,
                "question": f"A cohesive-frictional soil sample has an effective cohesion of $c' = {c:.1f}\\text{{ kPa}}$ and effective internal friction angle $\\phi' = {phi_deg}^\\circ$. As illustrated in the Mohr-Coulomb failure envelope, the shear strength on a plane subjected to an effective normal stress $\\sigma_n' = {sigma_n:.1f}\\text{{ kPa}}$ is ________ $\\text{{kPa}}$ (round off to two decimal places).",
                "correct_answer": f"{tau_f:.2f}",
                "numerical_range": { "min": round(tau_f - 0.2, 2), "max": round(tau_f + 0.2, 2) },
                "solution": f"From the Mohr-Coulomb failure criterion:\n$$\\tau_f = c' + \\sigma_n' \\tan \\phi'$$\nGiven $c' = {c:.1f}\\text{{ kPa}}$, $\\phi' = {phi_deg}^\\circ$ ($\\tan 30^\\circ = \\frac{{1}}{{\\sqrt{3}}} \\approx 0.57735$), and $\\sigma_n' = {sigma_n:.1f}\\text{{ kPa}}$:\n$$\\tau_f = {c:.1f} + {sigma_n:.1f} \\times 0.57735 = {c:.1f} + {sigma_n * 0.57735:.2f} = {tau_f:.2f}\\text{{ kPa}}$$",
                "difficulty": "Moderate",
                "source": "Soil Mechanics and Foundations (B.C. Punmia)"
            })
        elif i % 3 == 2:
            sigma3 = 100.0 + (i % 5) * 20.0
            phi_deg = 30
            # sigma1 = sigma3 * tan^2(45 + phi/2)
            # For phi=30, 45+15=60, tan(60) = sqrt(3), tan^2 = 3
            sigma1 = round(sigma3 * 3.0, 1)
            deviator = round(sigma1 - sigma3, 1)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Triaxial compression of cohesionless sand",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "diagram_svg": SVG_MOHR,
                "question": f"A cohesionless sand specimen ($c = 0$, $\\phi = 30^\\circ$) is tested in a consolidated-drained triaxial test under a confining cell pressure of $\\sigma_3 = {sigma3:.0f}\\text{{ kPa}}$. The deviator stress $(\\sigma_1 - \\sigma_3)$ at failure is ________ $\\text{{kPa}}$ (round off to one decimal place).",
                "correct_answer": f"{deviator:.1f}",
                "numerical_range": { "min": round(deviator - 0.5, 1), "max": round(deviator + 0.5, 1) },
                "solution": f"For a cohesionless soil ($c = 0$), the principal stresses at failure are related by:\n$$\\sigma_1 = \\sigma_3 \\tan^2\\left(45^\\circ + \\frac{{\\phi}}{{2}}\\right)$$\nFor $\\phi = 30^\\circ$, $45^\\circ + \\phi/2 = 60^\\circ$, and $\\tan^2(60^\\circ) = (\\sqrt{3})^2 = 3$.\n$$\\sigma_1 = 3 \\sigma_3 = 3 \\times {sigma3:.0f} = {sigma1:.1f}\\text{{ kPa}}$$\nThe deviator stress at failure is:\n$$\\sigma_d = \\sigma_1 - \\sigma_3 = {sigma1:.1f} - {sigma3:.0f} = {deviator:.1f}\\text{{ kPa}}$$",
                "difficulty": "Moderate",
                "source": "Soil Mechanics and Foundations (B.C. Punmia)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Direct shear vs triaxial test comparison",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following statements regarding laboratory shear strength testing of soils is/are TRUE?",
                "options": {
                    "A": "In a direct shear test, the failure plane is pre-determined horizontally and is not necessarily the weakest plane",
                    "B": "In an unconfined compression test, the cell pressure is zero ($\\sigma_3 = 0$), so the unconfined compressive strength $q_u = 2 c_u$ for saturated clay under undrained condition ($\\phi_u = 0$)",
                    "C": "In a triaxial test, pore water pressure can be measured during undrained shearing",
                    "D": "In a standard Proctor compaction test, zero-air-voids line represents $100\\%$ saturation"
                },
                "correct_answer": ["A", "B", "C", "D"],
                "solution": "1. Direct shear forces shear along the split-box interface horizontally (A is true).\n2. For $\\phi_u = 0$ undrained clay, $\\sigma_1 = \\sigma_3 + 2c_u = 0 + 2c_u \\implies q_u = 2 c_u$ (B is true).\n3. Triaxial apparatus permits controlled drainage and pore pressure transducer measurement (C is true).\n4. Theoretical compaction maximum occurs at zero air voids ($S_r = 100\\%$) (D is true).\nAll statements A, B, C, D are correct.",
                "difficulty": "Moderate",
                "source": "Soil Mechanics and Foundations (B.C. Punmia)"
            })

    # 10. Soil Compaction, Consolidation & Earth Pressures (28 questions)
    for i in range(1, 29):
        qid = f"QB_SWCE_COM_{i:03d}"
        topic = "Soil Compaction, Consolidation & Earth Pressures"
        sub = "Rankine active and passive earth pressure coefficients"
        if i % 2 == 1:
            phi = 30
            # Ka = (1 - sin 30) / (1 + sin 30) = 0.5 / 1.5 = 1/3
            # Kp = 3
            Ka = round((1.0 - math.sin(math.radians(phi))) / (1.0 + math.sin(math.radians(phi))), 3)
            H = 4.0 + (i % 4) * 0.5
            gamma = 18.0
            Pa = round(0.5 * Ka * gamma * (H**2), 2)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Rankine active thrust on retaining wall",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"A smooth vertical retaining wall of height $H = {H:.1f}\\text{{ m}}$ retains cohesionless sand with unit weight $\\gamma = {gamma:.1f}\\text{{ kN/m}}^3$ and angle of internal friction $\\phi = {phi}^\\circ$. Assuming a horizontal backfill surface, the total Rankine active thrust per meter run of the wall is ________ $\\text{{kN/m}}$ (round off to two decimal places).",
                "correct_answer": f"{Pa:.2f}",
                "numerical_range": { "min": round(Pa - 0.2, 2), "max": round(Pa + 0.2, 2) },
                "solution": f"Rankine active earth pressure coefficient:\n$$K_a = \\frac{{1 - \\sin {phi}^\\circ}}{{1 + \\sin {phi}^\\circ}} = \\frac{{1 - 0.5}}{{1 + 0.5}} = \\frac{{1}}{{3}} \\approx {Ka:.4f}$$\nTotal active thrust per unit length of wall:\n$$P_a = \\frac{{1}}{{2}} K_a \\gamma H^2 = \\frac{{1}}{{2}} \\times \\frac{{1}}{{3}} \\times {gamma:.1f} \\times ({H:.1f})^2 = {Pa:.2f}\\text{{ kN/m}}$$",
                "difficulty": "Moderate",
                "source": "Soil Mechanics and Foundations (B.C. Punmia)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Consolidation settlement formula",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "The ultimate primary consolidation settlement $S_c$ of a normally consolidated clay layer of initial thickness $H_0$ and initial void ratio $e_0$ subjected to an effective stress increment $\\Delta \\sigma'$ is given by:",
                "options": {
                    "A": "$S_c = \\frac{C_c H_0}{1 + e_0} \\log_{10} \\left( \\frac{\\sigma_0' + \\Delta \\sigma'}{\\sigma_0'} \\right)$",
                    "B": "$S_c = \\frac{C_c H_0}{1 - e_0} \\ln \\left( \\frac{\\sigma_0' + \\Delta \\sigma'}{\\sigma_0'} \\right)$",
                    "C": "$S_c = C_c H_0 (1 + e_0) \\log_{10} \\left( \\frac{\\sigma_0'}{\\Delta \\sigma'} \\right)$",
                    "D": "$S_c = \\frac{H_0}{C_c (1 + e_0)} \\left( \\frac{\\Delta \\sigma'}{\\sigma_0'} \\right)$"
                },
                "correct_answer": "A",
                "solution": "From Terzaghi's 1D consolidation theory, change in void ratio is $\\Delta e = C_c \\log_{10}\\left(\\frac{\\sigma_0' + \\Delta \\sigma'}{\\sigma_0'}\\right)$.\nSince settlement $S_c = \\frac{\\Delta e}{1 + e_0} H_0$, substituting yields:\n$$S_c = \\frac{C_c H_0}{1 + e_0} \\log_{10} \\left( \\frac{\\sigma_0' + \\Delta \\sigma'}{\\sigma_0'} \\right)$$.",
                "difficulty": "Easy",
                "source": "Soil Mechanics and Foundations (B.C. Punmia)"
            })

    # 11. Precipitation Analysis & Rain Gauges (28 questions)
    for i in range(1, 29):
        qid = f"QB_SWCE_PRE_{i:03d}"
        topic = "Precipitation Analysis & Rain Gauges"
        sub = "Thiessen polygon method and optimum number of rain gauges"
        if i % 2 == 1:
            Cv = 25.0 + (i % 5) * 5.0 # %
            eps = 10.0 # allowable error %
            N_opt = round((Cv / eps)**2)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Optimum number of rain gauges",
                "type": "NAT",
                "marks": 1,
                "negative_marks": 0,
                "question": f"A catchment has a coefficient of variation of annual precipitation of $C_v = {Cv:.0f}\\%$. For an allowable percentage error in the estimation of mean precipitation of $\\epsilon = {eps:.0f}\\%$, the optimum number of rain gauge stations required in the catchment is ________.",
                "correct_answer": f"{N_opt}",
                "numerical_range": { "min": N_opt - 0.1, "max": N_opt + 0.1 },
                "solution": f"The optimum number of rain gauge stations $N$ is given by:\n$$N = \\left( \\frac{{C_v}}{{\\epsilon}} \\right)^2$$\nGiven $C_v = {Cv:.0f}\\%$ and allowable error $\\epsilon = {eps:.0f}\\%$:\n$$N = \\left( \\frac{{{Cv:.0f}}}{{{eps:.0f}}} \\right)^2 = ({Cv/eps:.2f})^2 = {N_opt}$$.",
                "difficulty": "Easy",
                "source": "Engineering Hydrology (K. Subramanya)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Double mass curve analysis",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "In hydrologic precipitation data analysis, the Double Mass Curve technique is primarily utilized to:",
                "options": {
                    "A": "Check and adjust the consistency of a rain gauge record",
                    "B": "Determine the optimum number of rain gauges in a catchment",
                    "C": "Estimate the areal mean precipitation over mountainous terrain",
                    "D": "Compute the probable maximum precipitation (PMP)"
                },
                "correct_answer": "A",
                "solution": "The double mass curve plots cumulative annual precipitation of a test station against the cumulative annual average of a group of base stations. A change in slope indicates inconsistency due to station relocation, change in gauge height, or environmental changes.",
                "difficulty": "Easy",
                "source": "Engineering Hydrology (K. Subramanya)"
            })

    # 12. Infiltration, Evaporation & Hydrologic Losses (28 questions)
    for i in range(1, 29):
        qid = f"QB_SWCE_INF_{i:03d}"
        topic = "Infiltration, Evaporation & Hydrologic Losses"
        sub = "Horton infiltration equation and phi-index"
        if i % 2 == 1:
            f0 = 40.0 # mm/h
            fc = 10.0 # mm/h
            k_dec = 0.5 # 1/h
            t = 2.0 # h
            # f_t = fc + (f0 - fc)*e^(-k*t)
            ft = round(fc + (f0 - fc) * math.exp(-k_dec * t), 2)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Horton infiltration rate",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"The infiltration capacity of a watershed follows Horton's equation: $f_t = f_c + (f_0 - f_c) e^{{-k t}}$. Given initial infiltration capacity $f_0 = {f0:.0f}\\text{{ mm/h}}$, final steady capacity $f_c = {fc:.0f}\\text{{ mm/h}}$, and decay constant $k = {k_dec}\\text{{ h}}^{{-1}}$, the infiltration capacity at time $t = {t:.0f}\\text{{ h}}$ is ________ $\\text{{mm/h}}$ (round off to two decimal places).",
                "correct_answer": f"{ft:.2f}",
                "numerical_range": { "min": round(ft - 0.2, 2), "max": round(ft + 0.2, 2) },
                "solution": f"Substituting into Horton's equation:\n$$f_t = {fc:.0f} + ({f0:.0f} - {fc:.0f}) e^{{-{k_dec} \\times {t:.0f}}} = 10 + 30 e^{{-1.0}} = 10 + 30(0.36788) = 10 + 11.036 = {ft:.2f}\\text{{ mm/h}}$$.",
                "difficulty": "Moderate",
                "source": "Engineering Hydrology (K. Subramanya)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Phi-index and W-index definitions",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following statements regarding infiltration indices ($\\phi$-index and $W$-index) is/are TRUE?",
                "options": {
                    "A": "The $\\phi$-index represents the average rainfall intensity above which the rainfall volume equals the surface runoff volume",
                    "B": "The $W$-index explicitly subtracts initial abstraction ($I_a$) and depression storage from total losses",
                    "C": "The $\\phi$-index is always strictly greater than or equal to the $W$-index ($\\phi \\ge W$)",
                    "D": "During a rainstorm where rainfall intensity is everywhere greater than infiltration capacity, $\\phi = W$"
                },
                "correct_answer": ["A", "B", "C", "D"],
                "solution": "1. By definition, $\\phi = (P - R) / t_e$ where $t_e$ is rainfall excess duration (A is true).\n2. $W = (P - R - I_a) / t_r$, where $I_a$ is initial abstraction (B is true).\n3. Since $\\phi$ bundles initial abstraction into the loss rate during excess time ($t_e \\le t_r$), $\\phi \\ge W$ always holds (C is true).\n4. When $I_a \\approx 0$ and $t_e = t_r$, $\\phi$ converges to $W$ (D is true).\nAll statements A, B, C, D are correct.",
                "difficulty": "Moderate",
                "source": "Engineering Hydrology (K. Subramanya)"
            })

    # 13. Runoff Estimation: Rational & SCS-CN Methods (30 questions)
    for i in range(1, 31):
        qid = f"QB_SWCE_RNF_{i:03d}"
        topic = "Runoff Estimation: Rational & SCS-CN Methods"
        sub = "SCS Curve Number and Rational method peak runoff"
        if i % 3 == 1:
            C = 0.35 + (i % 4) * 0.05
            I = 50.0 + (i % 5) * 10.0 # mm/h
            A_ha = 120.0 + (i % 4) * 20.0 # ha
            # Q = C * I * A / 360  (m3/s)
            Qp = round((C * I * A_ha) / 360.0, 2)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Rational formula peak discharge",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"A small agricultural watershed of area $A = {A_ha:.0f}\\text{{ ha}}$ has a runoff coefficient $C = {C:.2f}$. The design rainfall intensity for a duration equal to the time of concentration is $I = {I:.0f}\\text{{ mm/h}}$. Using the Rational method, the peak runoff rate is ________ $\\text{{m}}^3/\\text{{s}}$ (round off to two decimal places).",
                "correct_answer": f"{Qp:.2f}",
                "numerical_range": { "min": round(Qp - 0.1, 2), "max": round(Qp + 0.1, 2) },
                "solution": f"Using the Rational formula in metric units:\n$$Q_p = \\frac{{C I A}}{{360}}$$\nwhere $I$ is in $\\text{{mm/h}}$, $A$ is in $\\text{{ha}}$, and $Q_p$ is in $\\text{{m}}^3/\\text{{s}}$:\n$$Q_p = \\frac{{{C:.2f} \\times {I:.0f} \\times {A_ha:.0f}}}{{360}} = {Qp:.2f}\\text{{ m}}^3/\\text{{s}}$$",
                "difficulty": "Moderate",
                "source": "Soil and Water Conservation Engineering (Schwab et al.)"
            })
        elif i % 3 == 2:
            CN = 75 + (i % 5) * 2
            # S = 25400 / CN - 254
            S = round(25400.0 / CN - 254.0, 1)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "SCS-CN potential maximum retention",
                "type": "NAT",
                "marks": 1,
                "negative_marks": 0,
                "question": f"In the USDA-SCS runoff curve number method, an agricultural watershed has a composite curve number $CN = {CN}$. The potential maximum soil water retention $S$ is ________ $\\text{{mm}}$ (round off to one decimal place).",
                "correct_answer": f"{S:.1f}",
                "numerical_range": { "min": round(S - 0.5, 1), "max": round(S + 0.5, 1) },
                "solution": f"The relationship between potential maximum retention $S$ (in $\\text{{mm}}$) and curve number $CN$ is:\n$$S = \\frac{{25400}}{{CN}} - 254$$\nGiven $CN = {CN}$:\n$$S = \\frac{{25400}}{{{CN}}} - 254 = {25400.0/CN:.2f} - 254 = {S:.1f}\\text{{ mm}}$$",
                "difficulty": "Easy",
                "source": "Hydrology and Soil Conservation Engineering (G. Das)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Antecedent moisture condition (AMC) classes",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "In the SCS-CN method, Antecedent Moisture Condition (AMC) is categorized into three levels (AMC-I, AMC-II, AMC-III). Which AMC corresponds to dry soil condition with lowest runoff potential?",
                "options": {
                    "A": "AMC-I (lowest runoff potential, dry soils)",
                    "B": "AMC-II (average condition)",
                    "C": "AMC-III (heavy rainfall, near saturation)",
                    "D": "AMC-IV (flooded watershed)"
                },
                "correct_answer": "A",
                "solution": "In SCS hydrology:\n- AMC-I represents dry conditions (lowest runoff, lowest CN).\n- AMC-II represents average catchment condition (standard reference CN).\n- AMC-III represents wet condition following high 5-day antecedent rainfall.",
                "difficulty": "Easy",
                "source": "Hydrology and Soil Conservation Engineering (G. Das)"
            })

    # 14. Hydrograph Analysis & Unit Hydrograph Theory (30 questions)
    for i in range(1, 31):
        qid = f"QB_SWCE_HYD_{i:03d}"
        topic = "Hydrograph Analysis & Unit Hydrograph Theory"
        sub = "1-hour unit hydrograph properties and S-curve method"
        if i % 3 == 1:
            A_km2 = 25.0 + (i % 6) * 5.0 # km2
            # 1 cm runoff over A km2 volume
            # V = 0.01 m * A * 10^6 m2 = 10^4 * A m3
            Vol = round(10000.0 * A_km2)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Unit hydrograph runoff volume",
                "type": "NAT",
                "marks": 1,
                "negative_marks": 0,
                "question": f"A $4\\text{{-hour}}$ unit hydrograph of a catchment of area ${A_km2:.0f}\\text{{ km}}^2$ has a direct runoff depth of exactly $1\\text{{ cm}}$. The total volume of direct surface runoff represented by the area under this unit hydrograph is ________ $\\text{{m}}^3$.",
                "correct_answer": f"{Vol}",
                "numerical_range": { "min": Vol - 10, "max": Vol + 10 },
                "solution": f"By definition, a unit hydrograph represents $1\\text{{ cm}}$ ($0.01\\text{{ m}}$) of direct runoff volume uniformly over the entire catchment area:\n$$V = \\text{{Depth}} \\times \\text{{Catchment Area}} = 0.01\\text{{ m}} \\times ({A_km2:.0f} \\times 10^6\\text{{ m}}^2) = {Vol}\\text{{ m}}^3$$.",
                "difficulty": "Easy",
                "source": "Engineering Hydrology (K. Subramanya)"
            })
        elif i % 3 == 2:
            qp = 12.0 + (i % 5) * 2.0 # m3/s for 1 cm
            R_excess = 3.5 # cm
            baseflow = 15.0 # m3/s
            Q_total = round(qp * R_excess + baseflow, 1)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Flood peak from unit hydrograph",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"The peak ordinate of a $6\\text{{-hour}}$ unit hydrograph of a basin is ${qp:.1f}\\text{{ m}}^3/\\text{{s}}$. A storm of $6\\text{{-hour}}$ duration produces an effective rainfall excess of ${R_excess:.1f}\\text{{ cm}}$. If the constant baseflow is ${baseflow:.1f}\\text{{ m}}^3/\\text{{s}}$, the resulting total peak flood discharge is ________ $\\text{{m}}^3/\\text{{s}}$ (round off to one decimal place).",
                "correct_answer": f"{Q_total:.1f}",
                "numerical_range": { "min": round(Q_total - 0.5, 1), "max": round(Q_total + 0.5, 1) },
                "solution": f"From the linear theory of unit hydrographs (principle of proportionality):\n$$\\text{{Direct Runoff Peak}} = Q_{{p,UH}} \\times R = {qp:.1f} \\times {R_excess:.1f} = {qp * R_excess:.1f}\\text{{ m}}^3/\\text{{s}}$$\nAdding baseflow:\n$$Q_{{peak,total}} = {qp * R_excess:.1f} + {baseflow:.1f} = {Q_total:.1f}\\text{{ m}}^3/\\text{{s}}$$",
                "difficulty": "Moderate",
                "source": "Engineering Hydrology (K. Subramanya)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Assumptions of unit hydrograph theory",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following assumptions are fundamental to Sherman's Unit Hydrograph Theory?",
                "options": {
                    "A": "Linear response: ordinates of direct runoff hydrograph are directly proportional to rainfall excess depth",
                    "B": "Time invariance: the direct runoff response to a given rainfall excess is identical regardless of when it occurs",
                    "C": "Rainfall excess is uniformly distributed throughout the specified storm duration",
                    "D": "Catchment area changes dynamically during intense monsoon floods"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "Sherman's unit hydrograph theory relies on:\n1. Principle of linear response (superposition and proportionality) (A).\n2. Time invariance of basin physical characteristics (B).\n3. Spatial and temporal uniformity of rainfall excess over the duration (C).\nCatchment boundary and drainage area are strictly constant physical properties (D is false).",
                "difficulty": "Easy",
                "source": "Engineering Hydrology (K. Subramanya)"
            })

    # 15. Flood Routing & Drought Analysis (28 questions)
    for i in range(1, 29):
        qid = f"QB_SWCE_FLR_{i:03d}"
        topic = "Flood Routing & Drought Analysis"
        sub = "Muskingum routing parameters C0, C1, C2"
        if i % 2 == 1:
            K = 12.0 # h
            x = 0.2
            dt = 6.0 # h
            denom = 2.0 * K * (1.0 - x) + dt
            C0 = round((-2.0 * K * x + dt) / denom, 3)
            C1 = round((2.0 * K * x + dt) / denom, 3)
            C2 = round((2.0 * K * (1.0 - x) - dt) / denom, 3)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Muskingum flood routing coefficient C0",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"In a river reach, flood routing is performed using the Muskingum method with parameters $K = {K:.0f}\\text{{ h}}$, $x = {x:.1f}$, and routing time interval $\\Delta t = {dt:.0f}\\text{{ h}}$. The routing coefficient $C_0$ in $Q_2 = C_0 I_2 + C_1 I_1 + C_2 Q_1$ is ________ (round off to three decimal places).",
                "correct_answer": f"{C0:.3f}",
                "numerical_range": { "min": round(C0 - 0.01, 3), "max": round(C0 + 0.01, 3) },
                "solution": f"Muskingum coefficients are:\n$$C_0 = \\frac{{\\Delta t - 2 K x}}{{2 K (1 - x) + \\Delta t}}$$\nGiven $K = {K}\\text{{ h}}$, $x = {x}$, $\\Delta t = {dt}\\text{{ h}}$:\n$$\\text{{Denominator}} = 2(12)(1 - 0.2) + 6 = 24(0.8) + 6 = 19.2 + 6 = 25.2$$\n$$\\text{{Numerator}} = 6 - 2(12)(0.2) = 6 - 4.8 = 1.2$$\n$$C_0 = \\frac{{1.2}}{{25.2}} = {C0:.3f}$$\nCheck: $C_0 + C_1 + C_2 = 1.0$.",
                "difficulty": "Hard",
                "source": "Engineering Hydrology (K. Subramanya)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Sum of Muskingum routing coefficients",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "In the Muskingum channel routing equation $Q_{j+1} = C_0 I_{j+1} + C_1 I_j + C_2 Q_j$, the sum of coefficients $(C_0 + C_1 + C_2)$ must strictly equal:",
                "options": {
                    "A": "$1.0$",
                    "B": "$0.0$",
                    "C": "$2.0$",
                    "D": "$K / \\Delta t$"
                },
                "correct_answer": "A",
                "solution": "From the continuity equation for steady state where inflow equals outflow ($I_j = I_{j+1} = Q_j = Q_{j+1} = Q$), $Q = (C_0 + C_1 + C_2) Q$, which requires:\n$$C_0 + C_1 + C_2 = 1.0$$.",
                "difficulty": "Easy",
                "source": "Engineering Hydrology (K. Subramanya)"
            })

    # 16. Water Erosion Mechanics & USLE (30 questions)
    for i in range(1, 31):
        qid = f"QB_SWCE_USL_{i:03d}"
        topic = "Water Erosion Mechanics & USLE"
        sub = "Universal Soil Loss Equation computation"
        if i % 3 == 1:
            R = 300.0 + (i % 5) * 50.0
            K = 0.25
            LS = 1.5
            C = 0.20
            P = 0.60
            A_loss = round(R * K * LS * C * P, 2)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "USLE annual soil loss estimation",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"Using the Universal Soil Loss Equation (USLE) $A = R \\cdot K \\cdot LS \\cdot C \\cdot P$, estimate the annual soil loss for a field where rainfall erosivity factor $R = {R:.0f}\\text{{ MJ}}\\,\\text{{mm/(ha}}\\,\\text{{h}}\\,\\text{{yr)}}$, soil erodibility factor $K = {K:.2f}\\text{{ t}}\\,\\text{{ha}}\\,\\text{{h/(ha}}\\,\\text{{MJ}}\\,\\text{{mm)}}$, topographic factor $LS = {LS:.1f}$, cropping management factor $C = {C:.2f}$, and conservation practice factor $P = {P:.2f}$. The estimated annual soil loss $A$ is ________ $\\text{{t/(ha}}\\,\\text{{yr)}}$ (round off to two decimal places).",
                "correct_answer": f"{A_loss:.2f}",
                "numerical_range": { "min": round(A_loss - 0.2, 2), "max": round(A_loss + 0.2, 2) },
                "solution": f"Applying USLE directly:\n$$A = R \\cdot K \\cdot LS \\cdot C \\cdot P$$\n$$A = {R:.0f} \\times {K:.2f} \\times {LS:.1f} \\times {C:.2f} \\times {P:.2f} = {A_loss:.2f}\\text{{ tonnes/(ha}}\\,\\text{{yr)}}$$.",
                "difficulty": "Moderate",
                "source": "Soil and Water Conservation Engineering (Schwab et al.)"
            })
        elif i % 3 == 2:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Kinetic energy of falling raindrops",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "In water erosion mechanics, the detachment of soil particles is predominantly driven by:",
                "options": {
                    "A": "Kinetic energy of falling raindrops (splash erosion)",
                    "B": "Viscous drag force of laminar sheet flow",
                    "C": "Subsurface capillary tension",
                    "D": "Chemical leaching of silica"
                },
                "correct_answer": "A",
                "solution": "Raindrop splash is the primary agent of detachment in inter-rill and sheet erosion, pulverizing soil clods with immense impact kinetic energy ($KE = \\frac{1}{2} m v^2$), while overland flow acts primarily as a transporting agent.",
                "difficulty": "Easy",
                "source": "Soil and Water Conservation Engineering (Schwab et al.)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "USLE parameters and units",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following statements regarding the Universal Soil Loss Equation (USLE) parameters is/are TRUE?",
                "options": {
                    "A": "The topographic factor $LS$ is dimensionless, representing the ratio of soil loss to that from a unit plot of length $22.13\\text{ m}$ on a $9\\%$ slope",
                    "B": "The cropping management factor $C$ ranges from near $0$ for dense virgin forest to $1.0$ for clean-tilled continuous fallow",
                    "C": "The support practice factor $P$ for up-and-down slope tillage without conservation measures equals $1.0$",
                    "D": "USLE predicts both sheet/rill erosion and deep gully channel erosion"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "1. $LS$ is normalized relative to the standard unit plot ($22.13\\text{ m}$ length, $9\\%$ gradient) (A is true).\n2. $C = 1.0$ for bare fallow and approaches $0.001$ for undisturbed mulch/canopy (B is true).\n3. $P = 1.0$ for straight up-and-down slope cultivation (C is true).\n4. USLE only predicts sheet and rill erosion; it does NOT account for gully erosion, stream bank erosion, or mass wasting (D is false).",
                "difficulty": "Moderate",
                "source": "Soil and Water Conservation Engineering (Schwab et al.)"
            })

    # 17. Gully Control Structures & Drop Spillways (28 questions)
    for i in range(1, 29):
        qid = f"QB_SWCE_GUL_{i:03d}"
        topic = "Gully Control Structures & Drop Spillways"
        sub = "Hydraulic design of drop spillways"
        if i % 2 == 1:
            L_crest = 2.0 + (i % 4) * 0.5 # m
            h_crest = 0.60 # m
            # Q = 1.77 * L * h^1.5
            Q_spill = round(1.77 * L_crest * (h_crest**1.5), 2)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Straight drop spillway inlet capacity",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"A straight drop spillway has a horizontal rectangular weir crest of length $L = {L_crest:.1f}\\text{{ m}}$. For a design total head over the crest of $h = {h_crest:.2f}\\text{{ m}}$, using the broad-crested weir equation $Q = 1.77 L h^{{3/2}}$, the discharge capacity is ________ $\\text{{m}}^3/\\text{{s}}$ (round off to two decimal places).",
                "correct_answer": f"{Q_spill:.2f}",
                "numerical_range": { "min": round(Q_spill - 0.1, 2), "max": round(Q_spill + 0.1, 2) },
                "solution": f"Applying the drop spillway inlet equation:\n$$Q = 1.77 L h^{{3/2}}$$\nSubstituting $L = {L_crest:.1f}\\text{{ m}}$ and $h = {h_crest:.2f}\\text{{ m}}$:\n$$Q = 1.77 \\times {L_crest:.1f} \\times ({h_crest:.2f})^{{1.5}} = 1.77 \\times {L_crest:.1f} \\times {h_crest**1.5:.4f} = {Q_spill:.2f}\\text{{ m}}^3/\\text{{s}}$$",
                "difficulty": "Moderate",
                "source": "Hydrology and Soil Conservation Engineering (G. Das)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Temporary vs permanent gully control structures",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "Which of the following is classified as a permanent soil conservation structure for gully stabilization?",
                "options": {
                    "A": "Drop inlet / pipe spillway",
                    "B": "Woven wire check dam",
                    "C": "Loose rock check dam",
                    "D": "Brushwood check dam"
                },
                "correct_answer": "A",
                "solution": "Drop inlet (pipe spillway), drop spillway, and chute spillways constructed with reinforced masonry or concrete are permanent structures designed for 25-50 year recurrence floods. Woven wire, loose rock, and brushwood dams are temporary/semi-permanent stabilizing structures.",
                "difficulty": "Easy",
                "source": "Soil and Water Conservation Engineering (Schwab et al.)"
            })

    # 18. Terraces, Bunds & Vegetative Waterways (28 questions)
    for i in range(1, 29):
        qid = f"QB_SWCE_BND_{i:03d}"
        topic = "Terraces, Bunds & Vegetative Waterways"
        sub = "Vertical interval and spacing of contour bunds"
        if i % 2 == 1:
            S_pct = 2.0 + (i % 5) * 1.0 # % slope
            # VI = (S / 3) + 2 in feet or metric: VI = (S / a) + b
            # Ramser's formula (metric): VI = 0.305 * (S/3 + 2) = 0.1017 S + 0.61
            # Or standard Indian formula: VI = (S / 2) + 0.6  (meters)
            VI = round((S_pct / 2.0) + 0.6, 2)
            HI = round((VI / (S_pct / 100.0)), 1)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Horizontal spacing of contour bunds",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"Contour bunds are to be constructed on agricultural land having a uniform land slope of $S = {S_pct:.0f}\\%$. If the vertical interval is given by $VI = \\left(\\frac{{S}}{{2}} + 0.6\\right)\\text{{ m}}$, the horizontal spacing (interval) between two consecutive contour bunds is ________ $\\text{{m}}$ (round off to one decimal place).",
                "correct_answer": f"{HI:.1f}",
                "numerical_range": { "min": round(HI - 0.5, 1), "max": round(HI + 0.5, 1) },
                "solution": f"Vertical Interval:\n$$VI = \\frac{{{S_pct:.0f}}}{{2}} + 0.6 = {S_pct/2.0 + 0.6:.2f}\\text{{ m}}$$\nHorizontal Interval $HI$ is:\n$$HI = \\frac{{VI}}{{S / 100}} = \\frac{{{VI:.2f}}}{{{S_pct / 100.0:.3f}}} = {HI:.1f}\\text{{ m}}$$",
                "difficulty": "Moderate",
                "source": "Soil and Water Conservation Engineering (Schwab et al.)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Broad-base vs narrow-base terrace",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "A major operational advantage of broad-base terraces over narrow-base terraces on gently sloping farmland is:",
                "options": {
                    "A": "Farming operations and tractors can cross and cultivate the entire ridge and channel area",
                    "B": "They can be constructed on slopes steeper than $30\\%$",
                    "C": "They eliminate the requirement for any vegetative waterways",
                    "D": "They require zero maintenance after construction"
                },
                "correct_answer": "A",
                "solution": "Broad-base terraces have very gentle side slopes (usually $4:1$ or flatter) with widths of $8-15\\text{ m}$, allowing farm equipment, tractors, and combine harvesters to cross and cultivate the entire ridge without taking land out of production.",
                "difficulty": "Easy",
                "source": "Soil and Water Conservation Engineering (Schwab et al.)"
            })

    # 19. Watershed Management & Rainwater Harvesting (28 questions)
    for i in range(1, 29):
        qid = f"QB_SWCE_WSH_{i:03d}"
        topic = "Watershed Management & Rainwater Harvesting"
        sub = "Morphometric parameters: drainage density and bifurcation ratio"
        if i % 2 == 1:
            L_tot = 45.0 + (i % 6) * 5.0 # km
            A_w = 30.0 # km2
            Dd = round(L_tot / A_w, 2)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Drainage density calculation",
                "type": "NAT",
                "marks": 1,
                "negative_marks": 0,
                "question": f"A watershed having a total drainage basin area of $A = {A_w:.0f}\\text{{ km}}^2$ has a cumulative stream channel length of all orders equal to $\\sum L = {L_tot:.0f}\\text{{ km}}$. The drainage density $D_d$ of the watershed is ________ $\\text{{km}}^{{-1}}$ (round off to two decimal places).",
                "correct_answer": f"{Dd:.2f}",
                "numerical_range": { "min": round(Dd - 0.05, 2), "max": round(Dd + 0.05, 2) },
                "solution": f"Drainage density $D_d$ is the total length of streams of all orders per unit basin area:\n$$D_d = \\frac{{\\sum L}}{{A}} = \\frac{{{L_tot:.0f}\\text{{ km}}}}{{{A_w:.0f}\\text{{ km}}^2}} = {Dd:.2f}\\text{{ km}}^{{-1}}$$",
                "difficulty": "Easy",
                "source": "Engineering Hydrology (K. Subramanya)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Horton stream order and bifurcation ratio",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "According to Horton-Strahler stream ordering, when two 2nd-order stream channels join, the resulting downstream channel order is:",
                "options": {
                    "A": "3rd order",
                    "B": "4th order",
                    "C": "2nd order",
                    "D": "1st order"
                },
                "correct_answer": "A",
                "solution": "In Strahler stream ordering:\n- Two streams of order $u$ joining form a downstream channel of order $u + 1$.\n- Hence, two 2nd-order streams joining form a 3rd-order stream.\n(Note: if a stream of order $u$ joins a stream of order $v$ with $u < v$, the downstream order remains $v$).",
                "difficulty": "Easy",
                "source": "Engineering Hydrology (K. Subramanya)"
            })

    # 20. Surveying: Distance, Angles & Traversing (28 questions)
    for i in range(1, 29):
        qid = f"QB_SWCE_SRV_{i:03d}"
        topic = "Surveying: Distance, Angles & Traversing"
        sub = "Traverse closing error and Bowditch rule"
        if i % 2 == 1:
            eL = 0.30 + (i % 4) * 0.10 # m
            eD = 0.40 # m
            # Closing error e = sqrt(eL^2 + eD^2)
            e_tot = round(math.sqrt(eL**2 + eD**2), 3)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Traverse closing error magnitude",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"In a closed traverse survey, the sum of latitudes is $\\sum L = {eL:.2f}\\text{{ m}}$ and the sum of departures is $\\sum D = -{eD:.2f}\\text{{ m}}$. The total linear closing error is ________ $\\text{{m}}$ (round off to two decimal places).",
                "correct_answer": f"{e_tot:.2f}",
                "numerical_range": { "min": round(e_tot - 0.03, 2), "max": round(e_tot + 0.03, 2) },
                "solution": f"The linear closing error $e$ is given by:\n$$e = \\sqrt{{(\\sum L)^2 + (\\sum D)^2}}$$\nSubstituting $\\sum L = {eL:.2f}\\text{{ m}}$ and $\\sum D = -{eD:.2f}\\text{{ m}}$:\n$$e = \\sqrt{{{eL:.2f}^2 + (-{eD:.2f})^2}} = \\sqrt{{{eL**2:.4f} + {eD**2:.4f}}} = \\sqrt{{{eL**2 + eD**2:.4f}}} = {e_tot:.3f}\\text{{ m}}$$\nRounding to two decimal places: ${e_tot:.2f}\\text{{ m}}$.",
                "difficulty": "Moderate",
                "source": "Surveying (Vol I & II, B.C. Punmia)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Bowditch rule vs Transit rule",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "The Bowditch (Compass) rule for balancing a closed traverse assumes that:",
                "options": {
                    "A": "Errors in linear measurements are proportional to $\\sqrt{l}$ and angular errors are inversely proportional to $\\sqrt{l}$",
                    "B": "Angular measurements are far more precise than linear measurements",
                    "C": "Errors in latitudes and departures are proportional to the coordinates",
                    "D": "Only linear measurements contain systematic tape errors"
                },
                "correct_answer": "A",
                "solution": "Bowditch's rule is based on the assumption that random linear errors are proportional to $\\sqrt{l}$ (where $l$ is line length) and angular errors are proportional to $1/\\sqrt{l}$. Consequently, correction to latitude/departure of a line is directly proportional to the length of that line.",
                "difficulty": "Easy",
                "source": "Surveying (Vol I & II, B.C. Punmia)"
            })

    # 21. Levelling, Contouring & Earthwork Volume (28 questions)
    for i in range(1, 29):
        qid = f"QB_SWCE_LEV_{i:03d}"
        topic = "Levelling, Contouring & Earthwork Volume"
        sub = "Height of instrument method and earthwork volume"
        if i % 2 == 1:
            RL_BM = 100.00
            BS = 1.650 + (i % 4) * 0.100
            FS = 2.150
            HI = round(RL_BM + BS, 3)
            RL_station = round(HI - FS, 3)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Reduced level using Height of Instrument",
                "type": "NAT",
                "marks": 1,
                "negative_marks": 0,
                "question": f"A levelling survey is conducted starting from a benchmark (BM) having reduced level $RL = {RL_BM:.2f}\\text{{ m}}$. The backsight reading on the BM is ${BS:.3f}\\text{{ m}}$ and foresight reading on station A is ${FS:.3f}\\text{{ m}}$. The reduced level of station A is ________ $\\text{{m}}$ (round off to two decimal places).",
                "correct_answer": f"{RL_station:.2f}",
                "numerical_range": { "min": round(RL_station - 0.02, 2), "max": round(RL_station + 0.02, 2) },
                "solution": f"Using Height of Instrument ($HI$) method:\n$$HI = RL_{{BM}} + BS = {RL_BM:.2f} + {BS:.3f} = {HI:.3f}\\text{{ m}}$$\nReduced Level of station A:\n$$RL_A = HI - FS = {HI:.3f} - {FS:.3f} = {RL_station:.3f}\\text{{ m}}$$\nRounding to two decimal places: ${RL_station:.2f}\\text{{ m}}$.",
                "difficulty": "Easy",
                "source": "Surveying (Vol I & II, B.C. Punmia)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Prismoidal formula for earthwork volume",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "For calculating earthwork volume between end cross-sectional areas $A_1$ and $A_2$ spaced distance $L$ apart with mid-section area $A_m$, the Prismoidal formula is:",
                "options": {
                    "A": "$V = \\frac{L}{6} (A_1 + 4 A_m + A_2)$",
                    "B": "$V = \\frac{L}{2} (A_1 + A_2)$",
                    "C": "$V = \\frac{L}{3} (A_1 + 2 A_m + A_2)$",
                    "D": "$V = \\frac{L}{4} (A_1 + A_m + A_2)$"
                },
                "correct_answer": "A",
                "solution": "The Prismoidal formula (Simpson's rule for volume) gives the exact volume of a prismoid:\n$$V = \\frac{L}{6} (A_1 + 4 A_m + A_2)$$\n(Note: Trapezoidal formula $V = \\frac{L}{2}(A_1 + A_2)$ always overestimates prismoidal volume for concave ground shapes).",
                "difficulty": "Easy",
                "source": "Surveying (Vol I & II, B.C. Punmia)"
            })

    return questions
