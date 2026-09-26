import json
import math

SVG_PSYCHRO = """<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" class="w-full max-w-[380px] h-auto mx-auto"><rect width="400" height="240" rx="8" fill="#f8fafc" class="dark:fill-slate-900" stroke="#e2e8f0" class="dark:stroke-slate-800"/><line x1="60" y1="200" x2="360" y2="200" stroke="#64748b" stroke-width="2"/><line x1="360" y1="200" x2="360" y2="30" stroke="#64748b" stroke-width="2"/><text x="140" y="222" font-size="11" font-family="sans-serif" fill="#475569" font-weight="bold">Dry Bulb Temperature T_db (°C)</text><text x="240" y="25" font-size="11" font-family="sans-serif" fill="#475569" font-weight="bold">Humidity Ratio w (kg/kg d.a.)</text><path d="M 60 200 Q 150 190 220 130 Q 290 70 360 40" fill="none" stroke="#0284c7" stroke-width="2.5"/><text x="110" y="150" font-size="9" fill="#0284c7" font-weight="bold">φ = 100% (Saturation)</text><path d="M 120 200 Q 210 190 270 145 Q 320 100 360 85" fill="none" stroke="#38bdf8" stroke-dasharray="3,2" stroke-width="1.5"/><text x="230" y="170" font-size="9" fill="#0284c7">φ = 50%</text><line x1="160" y1="160" x2="280" y2="160" stroke="#dc2626" stroke-width="2"/><circle cx="160" cy="160" r="3.5" fill="#dc2626"/><text x="150" y="155" font-size="10" font-weight="bold" fill="#dc2626">A</text><circle cx="280" cy="160" r="3.5" fill="#dc2626"/><text x="285" y="155" font-size="10" font-weight="bold" fill="#dc2626">B</text><text x="175" y="150" font-size="9" fill="#dc2626" font-weight="bold">Sensible Heating (w = const)</text></svg>"""

def generate_ape_questions():
    questions = []
    def add(q):
        questions.append(q)

    SEC = "Section 6: Agricultural Process Engineering"

    # 1. Physical & Geometric Properties of Agro-Produce (40 questions)
    for i in range(1, 41):
        qid = f"QB_APE_PHY_{i:03d}"
        topic = "Physical & Geometric Properties of Agro-Produce"
        sub = "Sphericity and bulk porosity of grains"
        if i % 3 == 1:
            a = 6.5 # mm major
            b = 3.2 # mm intermediate
            c = 2.4 # mm minor
            # sphericity = (a * b * c)^(1/3) / a
            gmean = (a * b * c)**(1.0 / 3.0)
            sph = round(gmean / a, 3)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Grain sphericity calculation",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"The triaxial dimensions of a paddy grain are: major axis $a = {a:.1f}\\text{{ mm}}$, intermediate axis $b = {b:.1f}\\text{{ mm}}$, and minor axis $c = {c:.1f}\\text{{ mm}}$. The sphericity ($\\phi$) of the grain defined by $\\phi = \\frac{{(a b c)^{{1/3}}}}{{a}}$ is ________ (round off to two decimal places).",
                "correct_answer": f"{sph:.2f}",
                "numerical_range": { "min": round(sph - 0.02, 2), "max": round(sph + 0.02, 2) },
                "solution": f"Geometric mean diameter is:\n$$D_g = (a b c)^{{1/3}} = ({a:.1f} \\times {b:.1f} \\times {c:.1f})^{{1/3}} = ({a * b * c:.2f})^{{1/3}} = {gmean:.3f}\\text{{ mm}}$$\nSphericity is:\n$$\\phi = \\frac{{D_g}}{{a}} = \\frac{{{gmean:.3f}}}{{{a:.1f}}} = {sph:.3f}$$\nRounding to two decimal places: ${sph:.2f}$.",
                "difficulty": "Moderate",
                "source": "Unit Operations of Agricultural Processing (K.M. Sahay and K.K. Singh)"
            })
        elif i % 3 == 2:
            rho_t = 1350.0 # kg/m3 true density
            rho_b = 780.0 + (i % 6) * 10.0 # kg/m3 bulk density
            porosity_pct = round(((rho_t - rho_b) / rho_t) * 100.0, 2)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Grain bulk porosity from true and bulk density",
                "type": "NAT",
                "marks": 1,
                "negative_marks": 0,
                "question": f"A bulk grain bed has a true density of $\\rho_t = {rho_t:.0f}\\text{{ kg/m}}^3$ and a bulk density of $\\rho_b = {rho_b:.0f}\\text{{ kg/m}}^3$. The porosity of the bulk grain bed is ________ $\\%$ (round off to two decimal places).",
                "correct_answer": f"{porosity_pct:.2f}",
                "numerical_range": { "min": round(porosity_pct - 0.2, 2), "max": round(porosity_pct + 0.2, 2) },
                "solution": f"The porosity $\\epsilon$ of a granular bed is given by:\n$$\\epsilon = \\frac{{\\rho_t - \\rho_b}}{{\\rho_t}} \\times 100$$\nGiven $\\rho_t = {rho_t:.0f}\\text{{ kg/m}}^3$ and $\\rho_b = {rho_b:.0f}\\text{{ kg/m}}^3$:\n$$\\epsilon = \\frac{{{rho_t:.0f} - {rho_b:.0f}}}{{{rho_t:.0f}}} \\times 100 = \\frac{{{rho_t - rho_b:.0f}}}{{{rho_t:.0f}}} \\times 100 = {porosity_pct:.2f}\\%$$",
                "difficulty": "Easy",
                "source": "Unit Operations of Agricultural Processing (K.M. Sahay and K.K. Singh)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Angle of repose and frictional flowability",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following statements regarding the physical and frictional properties of agricultural grains is/are TRUE?",
                "options": {
                    "A": "As moisture content of grains increases, the angle of repose generally increases due to higher surface cohesion",
                    "B": "Dynamic coefficient of friction is always lower than or equal to static coefficient of friction against a given surface",
                    "C": "True density is determined by air/gas pycnometer or toluene displacement, excluding inter-particle void volume",
                    "D": "Bulk density of grains is always strictly greater than true density"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "1. Moisture increases capillary surface cohesion, steepening the pile angle of repose (A is true).\n2. Kinetic friction is lower than static friction $\\mu_k \\le \\mu_s$ (B is true).\n3. Pycnometry excludes inter-seed voids to measure solid grain kernel density (C is true).\n4. Bulk density includes air voids, so bulk density is always substantially LESS than true density ($\\rho_b < \\rho_t$) (D is false).",
                "difficulty": "Moderate",
                "source": "Unit Operations of Agricultural Processing (K.M. Sahay and K.K. Singh)"
            })

    # 2. Thermal, Optical & Electrical Properties of Grains (40 questions)
    for i in range(1, 41):
        qid = f"QB_APE_TRM_{i:03d}"
        topic = "Thermal, Optical & Electrical Properties of Grains"
        sub = "Specific heat and thermal conductivity empirical models"
        if i % 3 == 1:
            M = 14.0 + (i % 6) * 1.5 # % w.b.
            # Siebel formula: c = 0.837 + 0.0335 * M (kJ/kg K)
            c_p = round(0.837 + 0.0335 * M, 3)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Siebel equation for specific heat",
                "type": "NAT",
                "marks": 1,
                "negative_marks": 0,
                "question": f"Using Siebel's equation $c_p = 0.837 + 0.0335 M$, where $M$ is moisture content in percent wet basis and $c_p$ is specific heat in $\\text{{kJ/(kg}}\\,\\text{{K)}}$, the specific heat of wheat grain at $M = {M:.1f}\\%$ wet basis is ________ $\\text{{kJ/(kg}}\\,\\text{{K)}}$ (round off to two decimal places).",
                "correct_answer": f"{c_p:.2f}",
                "numerical_range": { "min": round(c_p - 0.03, 2), "max": round(c_p + 0.03, 2) },
                "solution": f"Substituting $M = {M:.1f}\\%$ into Siebel's equation:\n$$c_p = 0.837 + 0.0335 ({M:.1f}) = 0.837 + {0.0335 * M:.4f} = {c_p:.3f}\\text{{ kJ/(kg}}\\,\\text{{K)}}$$\nRounding to two decimal places: ${c_p:.2f}\\text{{ kJ/(kg}}\\,\\text{{K)}}$.",
                "difficulty": "Easy",
                "source": "Unit Operations of Agricultural Processing (K.M. Sahay and K.K. Singh)"
            })
        elif i % 3 == 2:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Dielectric properties of grains in microwave drying",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "In microwave and dielectric heating of agricultural produce, the dielectric loss factor ($\\epsilon''$) is a measure of the material's ability to:",
                "options": {
                    "A": "Dissipate absorbed electromagnetic field energy into thermal heat",
                    "B": "Store electrical electrostatic energy without heating",
                    "C": "Reflect incident radio-frequency radiation like a mirror",
                    "D": "Conduct electric DC direct current without resistance"
                },
                "correct_answer": "A",
                "solution": "In complex relative permittivity $\\epsilon^* = \\epsilon' - j \\epsilon''$:\n- The dielectric constant $\\epsilon'$ measures the ability to store electric energy.\n- The dielectric loss factor $\\epsilon''$ quantifies the rate of dissipation of electromagnetic field energy into internal kinetic thermal heat via dipole oscillation and ionic conduction.",
                "difficulty": "Moderate",
                "source": "Unit Operations of Agricultural Processing (K.M. Sahay and K.K. Singh)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Thermal conductivity and diffusivity definitions",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following statements concerning thermal properties of food grains is/are TRUE?",
                "options": {
                    "A": "Thermal conductivity of grains increases linearly with increase in moisture content because water has much higher conductivity ($0.6\\text{ W/m K}$) than dry grain matter",
                    "B": "Thermal diffusivity is defined as $\\alpha = \\frac{k}{\\rho c_p}$, representing the rate of temperature equalization in unsteady heat transfer",
                    "C": "Bulk grain thermal conductivity is lower than individual single kernel conductivity due to insulating air voids",
                    "D": "Specific heat of dry starch is higher than the specific heat of liquid water"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "1. Water is a better thermal conductor than dry carbohydrates and air, so $k$ rises with moisture (A is true).\n2. By definition, $\\alpha = k / (\\rho c_p)$ (B is true).\n3. Stagnant air has very low $k \\approx 0.026\\text{ W/m K}$, lowering effective bulk bed conductivity (C is true).\n4. Water has exceptionally high specific heat ($4.184\\text{ kJ/kg K}$), while dry starch is only $\\approx 1.2-1.5\\text{ kJ/kg K}$ (D is false).",
                "difficulty": "Moderate",
                "source": "Unit Operations in Food Processing (R.L. Earle)"
            })

    # 3. Frictional & Rheological Properties of Biological Materials (40 questions)
    for i in range(1, 41):
        qid = f"QB_APE_RHE_{i:03d}"
        topic = "Frictional & Rheological Properties of Biological Materials"
        sub = "Viscoelastic models: Maxwell and Kelvin-Voigt"
        if i % 3 == 1:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Maxwell model of viscoelasticity",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "The Maxwell mechanical rheological model consists of:",
                "options": {
                    "A": "A linear Hookean spring and a Newtonian dashpot connected in series",
                    "B": "A linear Hookean spring and a Newtonian dashpot connected in parallel",
                    "C": "Two springs connected in series with no dashpot",
                    "D": "Two dashpots connected in parallel"
                },
                "correct_answer": "A",
                "solution": "The Maxwell model represents viscoelastic stress relaxation by connecting an elastic spring (Hooke) and a viscous dashpot (Newton) in series. In contrast, the Kelvin-Voigt model connects them in parallel to model retarded elastic creep.",
                "difficulty": "Easy",
                "source": "Unit Operations of Agricultural Processing (K.M. Sahay and K.K. Singh)"
            })
        elif i % 3 == 2:
            mu_s = 0.35 + (i % 6) * 0.05
            phi_deg = round(math.degrees(math.atan(mu_s)), 2)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Angle of static friction calculation",
                "type": "NAT",
                "marks": 1,
                "negative_marks": 0,
                "question": f"Grains placed on a galvanized iron sheet begin to slide when the coefficient of static friction is $\\mu_s = {mu_s:.2f}$. The corresponding angle of friction $\\theta$ is ________ degrees (round off to two decimal places).",
                "correct_answer": f"{phi_deg:.2f}",
                "numerical_range": { "min": round(phi_deg - 0.2, 2), "max": round(phi_deg + 0.2, 2) },
                "solution": f"The angle of friction $\\theta$ is related to coefficient of static friction by:\n$$\\tan \\theta = \\mu_s \\implies \\theta = \\tan^{{-1}}(\\mu_s)$$\nGiven $\\mu_s = {mu_s:.2f}$:\n$$\\theta = \\tan^{{-1}}({mu_s:.2f}) = {phi_deg:.2f}^\\circ$$",
                "difficulty": "Easy",
                "source": "Unit Operations of Agricultural Processing (K.M. Sahay and K.K. Singh)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Creep and stress relaxation in food materials",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following statements regarding viscoelastic behavior of biological products is/are TRUE?",
                "options": {
                    "A": "In a stress relaxation test, a constant strain is applied and the decay of stress is recorded over time",
                    "B": "In a creep compliance test, a constant stress is applied and deformation (strain) is recorded as a function of time",
                    "C": "The Maxwell model exhibits instantaneous elastic response followed by unbounded viscous flow under constant stress",
                    "D": "The Kelvin-Voigt model is capable of predicting instantaneous stress relaxation to zero"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "1. Stress relaxation holds strain $\\epsilon = \\epsilon_0$ and measures relaxing stress $\\sigma(t)$ (A is true).\n2. Creep holds stress $\\sigma = \\sigma_0$ and measures accumulating strain $\\epsilon(t)$ (B is true).\n3. In Maxwell model, series dashpot continuously flows under constant stress (C is true).\n4. Kelvin-Voigt dashpot prevents instantaneous deformation, making it incapable of modeling stress relaxation (D is false).",
                "difficulty": "Moderate",
                "source": "Unit Operations of Agricultural Processing (K.M. Sahay and K.K. Singh)"
            })

    # 4. Psychrometry & Moist Air Thermodynamics (40 questions with SVG diagram)
    for i in range(1, 41):
        qid = f"QB_APE_PSY_{i:03d}"
        topic = "Psychrometry & Moist Air Thermodynamics"
        sub = "Humidity ratio, enthalpy, and sensible heating"
        if i % 3 == 1:
            pv = 2.5 # kPa
            Pt = 101.325 # kPa
            # w = 0.622 * pv / (Pt - pv)
            w = round(0.622 * pv / (Pt - pv), 4)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Humidity ratio from vapor pressure",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "diagram_svg": SVG_PSYCHRO,
                "question": f"Moist air at standard atmospheric pressure of $P_t = 101.325\\text{{ kPa}}$ has a partial water vapor pressure of $p_v = {pv:.1f}\\text{{ kPa}}$. The humidity ratio ($w$) of the air is ________ $\\text{{kg water / kg dry air}}$ (round off to four decimal places).",
                "correct_answer": f"{w:.4f}",
                "numerical_range": { "min": round(w - 0.0005, 4), "max": round(w + 0.0005, 4) },
                "solution": f"From the thermodynamic definition of humidity ratio:\n$$w = 0.622 \\frac{{p_v}}{{P_t - p_v}}$$\nGiven $p_v = {pv:.1f}\\text{{ kPa}}$ and $P_t = 101.325\\text{{ kPa}}$:\n$$w = 0.622 \\times \\frac{{{pv:.1f}}}{{101.325 - {pv:.1f}}} = 0.622 \\times \\frac{{{pv:.1f}}}{{{Pt - pv:.3f}}} = {w:.4f}\\text{{ kg/kg d.a.}}$$",
                "difficulty": "Moderate",
                "source": "Agricultural Process Engineering (Henderson and Perry)"
            })
        elif i % 3 == 2:
            Tdb = 25.0
            w_val = 0.012 # kg/kg d.a.
            # h = 1.006 * Tdb + w * (2501 + 1.88 * Tdb)
            h_air = round(1.006 * Tdb + w_val * (2501.0 + 1.88 * Tdb), 2)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Moist air specific enthalpy calculation",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "diagram_svg": SVG_PSYCHRO,
                "question": f"Moist air has a dry bulb temperature of $T_{{db}} = {Tdb:.0f}^\\circ\\text{{C}}$ and a humidity ratio of $w = {w_val:.3f}\\text{{ kg water/kg dry air}}$. Taking specific heat of dry air $c_{{pa}} = 1.006\\text{{ kJ/(kg}}\\,\\text{{K)}}$, latent heat of vaporization at $0^\\circ\\text{{C}}$ $h_{{fg0}} = 2501\\text{{ kJ/kg}}$, and vapor specific heat $c_{{pv}} = 1.88\\text{{ kJ/(kg}}\\,\\text{{K)}}$, the specific enthalpy ($h$) of moist air is ________ $\\text{{kJ/kg dry air}}$ (round off to two decimal places).",
                "correct_answer": f"{h_air:.2f}",
                "numerical_range": { "min": round(h_air - 0.2, 2), "max": round(h_air + 0.2, 2) },
                "solution": f"The enthalpy of moist air is given by:\n$$h = c_{{pa}} T_{{db}} + w (h_{{fg0}} + c_{{pv}} T_{{db}})$$\n$$h = 1.006({Tdb:.0f}) + {w_val:.3f} \\times (2501 + 1.88 \\times {Tdb:.0f})$$\n$$h = {1.006 * Tdb:.3f} + {w_val:.3f} \\times ({2501 + 1.88 * Tdb:.2f}) = {1.006 * Tdb:.3f} + {w_val * (2501 + 1.88 * Tdb):.3f} = {h_air:.2f}\\text{{ kJ/kg d.a.}}$$",
                "difficulty": "Moderate",
                "source": "Agricultural Process Engineering (Henderson and Perry)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Sensible heating process on psychrometric chart",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "diagram_svg": SVG_PSYCHRO,
                "question": "During a pure sensible heating process of moist air from State A to State B across a grain dryer heating coil (as depicted in the psychrometric chart), which of the following psychrometric changes occur?",
                "options": {
                    "A": "Dry bulb temperature increases ($T_{db,B} > T_{db,A}$)",
                    "B": "Humidity ratio (specific humidity) remains strictly constant ($w_B = w_A$)",
                    "C": "Relative humidity decreases ($\\phi_B < \\phi_A$)",
                    "D": "Dew point temperature increases significantly"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "1. Sensible heating adds thermal energy without moisture exchange: $T_{db}$ increases (A is true).\n2. No moisture is added or removed, so humidity ratio $w$ is constant (horizontal line on chart) (B is true).\n3. Saturation vapor pressure rises steeply with temperature, driving relative humidity $\\phi = p_v / p_{vs}$ down (C is true).\n4. Since $p_v$ is constant, dew point temperature $T_{dp}$ remains strictly unchanged (D is false).",
                "difficulty": "Easy",
                "source": "Agricultural Process Engineering (Henderson and Perry)"
            })

    # 5. Grain Drying Principles & Thin Layer Models (40 questions)
    for i in range(1, 41):
        qid = f"QB_APE_DRY_{i:03d}"
        topic = "Grain Drying Principles & Thin Layer Models"
        sub = "Water removed calculation and Page thin-layer equation"
        if i % 3 == 1:
            W1 = 1000.0 # kg initial
            m1 = 0.24 # 24% w.b.
            m2 = 0.14 # 14% w.b.
            # Bone dry matter W_s = W1 * (1 - m1)
            # Final total weight W2 = W_s / (1 - m2)
            # Water removed = W1 - W2
            Ws = W1 * (1.0 - m1)
            W2 = Ws / (1.0 - m2)
            W_removed = round(W1 - W2, 2)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Mass of water removed during batch grain drying",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"A batch of paddy weighing ${W1:.0f}\\text{{ kg}}$ is dried from an initial moisture content of ${m1*100:.0f}\\%$ wet basis to a safe storage moisture content of ${m2*100:.0f}\\%$ wet basis. The total mass of water evaporated during drying is ________ $\\text{{kg}}$ (round off to two decimal places).",
                "correct_answer": f"{W_removed:.2f}",
                "numerical_range": { "min": round(W_removed - 0.5, 2), "max": round(W_removed + 0.5, 2) },
                "solution": f"The bone dry solid mass ($W_s$) remains constant throughout drying:\n$$W_s = W_1 (1 - M_{{w1}}) = {W1:.0f} \\times (1 - {m1}) = {Ws:.1f}\\text{{ kg}}$$\nThe final total weight of grain $W_2$ at $M_{{w2}} = {m2}$ is:\n$$W_2 = \\frac{{W_s}}{{1 - M_{{w2}}}} = \\frac{{{Ws:.1f}}}{{1 - {m2}}} = \\frac{{{Ws:.1f}}}{{{1 - m2:.2f}}} = {W2:.2f}\\text{{ kg}}$$\nWater removed:\n$$\\Delta W = W_1 - W_2 = {W1:.0f} - {W2:.2f} = {W_removed:.2f}\\text{{ kg}}$$",
                "difficulty": "Moderate",
                "source": "Unit Operations of Agricultural Processing (K.M. Sahay and K.K. Singh)"
            })
        elif i % 3 == 2:
            mw = 0.20 + (i % 5) * 0.02
            # md = mw / (1 - mw)
            md_pct = round((mw / (1.0 - mw)) * 100.0, 2)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Conversion of wet basis to dry basis moisture content",
                "type": "NAT",
                "marks": 1,
                "negative_marks": 0,
                "question": f"A sample of harvested maize has a moisture content of ${mw*100:.1f}\\%$ on wet basis. The moisture content of the maize on dry basis is ________ $\\%$ (round off to two decimal places).",
                "correct_answer": f"{md_pct:.2f}",
                "numerical_range": { "min": round(md_pct - 0.2, 2), "max": round(md_pct + 0.2, 2) },
                "solution": f"The relationship between dry basis moisture content ($M_d$) and wet basis ($M_w$) is:\n$$M_d = \\frac{{M_w}}{{1 - M_w}}$$\nGiven $M_w = {mw:.3f}$:\n$$M_d = \\frac{{{mw:.3f}}}{{1 - {mw:.3f}}} = \\frac{{{mw:.3f}}}{{{1 - mw:.3f}}} = {md_pct/100.0:.4f}$$\nIn percentage: $M_d = {md_pct:.2f}\\%$.",
                "difficulty": "Easy",
                "source": "Unit Operations of Agricultural Processing (K.M. Sahay and K.K. Singh)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Thin layer drying models and falling rate period",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following statements regarding the physics of grain drying is/are TRUE?",
                "options": {
                    "A": "Agricultural food grains dry almost entirely in the falling rate drying period, with internal liquid/vapor diffusion controlling the rate",
                    "B": "Page's thin-layer equation modifies Newton's cooling law analogy as $MR = \\exp(-k t^n)$",
                    "C": "The critical moisture content marks the boundary between constant rate and falling rate drying periods",
                    "D": "In the constant rate drying period, the grain surface temperature stays at the dry bulb temperature of the drying air"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "1. Grain internal structure restricts water mobility, rendering constant rate period negligible or non-existent in biological seeds (A is true).\n2. Page's empirical model introduces exponent $n$ to overcome Henderson & Pabis overprediction at long times (B is true).\n3. Critical moisture content $M_c$ is where free surface moisture is exhausted (C is true).\n4. During constant rate drying, surface moisture evaporates freely, cooling the surface down to the wet bulb temperature, not dry bulb (D is false).",
                "difficulty": "Moderate",
                "source": "Agricultural Process Engineering (Henderson and Perry)"
            })

    # 6. Commercial Dryers & Deep Bed Drying Systems (40 questions)
    for i in range(1, 41):
        qid = f"QB_APE_COM_{i:03d}"
        topic = "Commercial Dryers & Deep Bed Drying Systems"
        sub = "LSU continuous flow dryer characteristics"
        if i % 3 == 1:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "LSU dryer inverted V-ducts",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "In the continuous flow Louisiana State University (LSU) grain dryer, hot air and exhaust air are distributed across the grain column via:",
                "options": {
                    "A": "Inverted V-shaped metal channels (baffles) arranged in staggered horizontal rows",
                    "B": "A single perforated vertical central cylinder",
                    "C": "Rotating horizontal cylindrical drums with flights",
                    "D": "Ultrasonic vibrating fluidized trays"
                },
                "correct_answer": "A",
                "solution": "The LSU dryer consists of a tall rectangular column equipped with horizontal rows of inverted V-shaped troughs (air ducts). Alternate rows act as hot air inlets and exhaust air outlets, providing uniform cross-flow air distribution through descending grain without screens.",
                "difficulty": "Easy",
                "source": "Unit Operations of Agricultural Processing (K.M. Sahay and K.K. Singh)"
            })
        elif i % 3 == 2:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Deep bed drying zones",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "In a deep bed grain dryer where hot dry air enters through a perforated floor at the bottom and moves upward, which distinct moisture zones develop chronologically?",
                "options": {
                    "A": "Dried zone at the bottom adjacent to the plenum chamber",
                    "B": "Drying front (drying zone) where active moisture transfer occurs",
                    "C": "Un-dried zone at the top remaining near initial moisture content and temperature",
                    "D": "Superheated steam zone at the topmost surface"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "Deep bed drying develops three characteristic zones progressing upward:\n1. Dried zone at inlet (bottom)\n2. Active drying zone (drying front)\n3. Undried/wet zone ahead of the front.\nSuperheated steam does not occur in atmospheric convective grain drying (D is false).",
                "difficulty": "Easy",
                "source": "Agricultural Process Engineering (Henderson and Perry)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Paddy tempering process in commercial drying",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "The primary operational purpose of the 'tempering' stage in multi-pass continuous paddy drying is to:",
                "options": {
                    "A": "Allow internal moisture to diffuse outward to the surface, relieving internal moisture and thermal stress gradients to minimize grain cracking",
                    "B": "Cool the grain down to sub-zero temperatures for frozen storage",
                    "C": "Sterilize fungal spores by boiling the husk",
                    "D": "Increase the moisture content of the paddy by re-wetting"
                },
                "correct_answer": "A",
                "solution": "Tempering provides a rest period without airflow where moisture diffuses from the core to the dry surface. This equalizes moisture gradients, relaxes steep mechanical stresses, and prevents checking/fissuring, drastically improving Head Rice Yield.",
                "difficulty": "Easy",
                "source": "Unit Operations of Agricultural Processing (K.M. Sahay and K.K. Singh)"
            })

    # 7. Equilibrium Moisture Content & Sorption Isotherms (40 questions)
    for i in range(1, 41):
        qid = f"QB_APE_EMC_{i:03d}"
        topic = "Equilibrium Moisture Content & Sorption Isotherms"
        sub = "BET isotherm and hysteresis phenomenon"
        if i % 3 == 1:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Moisture sorption hysteresis definition",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "The hysteresis loop observed in food and grain sorption isotherms means that at any given relative humidity (water activity):",
                "options": {
                    "A": "The equilibrium moisture content reached via desorption (drying) is strictly higher than that reached via adsorption (wetting)",
                    "B": "The equilibrium moisture content reached via adsorption is strictly higher than via desorption",
                    "C": "Desorption and adsorption isotherms coincide identically with zero difference",
                    "D": "Water activity is completely independent of temperature"
                },
                "correct_answer": "A",
                "solution": "In moisture sorption isotherms of biological materials, desorption curves consistently lie above adsorption curves ($M_{e,\\text{desorp}} > M_{e,\\text{adsorp}}$) due to capillary ink-bottle neck trapping, contact angle hysteresis, and structural micro-pore collapse.",
                "difficulty": "Easy",
                "source": "Agricultural Process Engineering (Henderson and Perry)"
            })
        elif i % 3 == 2:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "BET classification of sorption isotherms",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "Most agricultural food grains and biological seed materials exhibit which Brunauer-Emmett-Teller (BET) classification of sorption isotherm?",
                "options": {
                    "A": "Type II (sigmoidal S-shaped curve)",
                    "B": "Type I (Langmuir monolayer plateau)",
                    "C": "Type III (purely convex Flory-Huggins)",
                    "D": "Type IV (flat stepwise capillary)"
                },
                "correct_answer": "A",
                "solution": "Food grains and biological materials exhibit Type II sigmoidal isotherms: a concave monolayer sorption region at low $a_w$, an approximately linear multilayer region at intermediate $a_w$, and a steep convex capillary condensation region at high $a_w$ ($a_w > 0.7$).",
                "difficulty": "Easy",
                "source": "Agricultural Process Engineering (Henderson and Perry)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Henderson and Chung-Pfost isotherm models",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following mathematical equations are standard ASAE-recognized models for grain Equilibrium Moisture Content (EMC)?",
                "options": {
                    "A": "Modified Henderson equation: $1 - RH = \\exp\\left[-K (T + C) M_e^N\\right]$",
                    "B": "Modified Chung-Pfost equation: $\\ln(RH) = -\\frac{A}{T + B} \\exp(-C M_e)$",
                    "C": "Guggenheim-Anderson-de Boer (GAB) three-parameter isotherm model",
                    "D": "Navier-Stokes equation for incompressible fluid flow"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "1. Modified Henderson and Modified Chung-Pfost are the premier standard ASAE D245 equations for grains (A and B).\n2. GAB model is the international food standard across the full range of water activity $0 < a_w < 0.95$ (C).\n3. Navier-Stokes models momentum conservation in fluids, completely unrelated to thermodynamic sorption isotherms (D is false).",
                "difficulty": "Moderate",
                "source": "Agricultural Process Engineering (Henderson and Perry)"
            })

    # 8. Evaporation & Liquid Food Concentration (40 questions)
    for i in range(1, 41):
        qid = f"QB_APE_EVP_{i:03d}"
        topic = "Evaporation & Liquid Food Concentration"
        sub = "Multiple effect evaporator and steam economy"
        if i % 3 == 1:
            F = 2000.0 # kg/h feed
            xF = 0.10 # 10% solids
            xP = 0.50 # 50% solids concentrated
            # P = F * xF / xP = 2000 * 0.1 / 0.5 = 400 kg/h
            # V = F - P = 1600 kg/h
            P_prod = round((F * xF) / xP, 1)
            V_evap = round(F - P_prod, 1)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Product rate and vapor evaporated in single effect evaporator",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"A single-effect evaporator concentrates tomato juice from $10\\%$ solids to $50\\%$ solids at a feed rate of $F = {F:.0f}\\text{{ kg/h}}$. Neglecting entrainment losses, the rate of water vapor evaporated is ________ $\\text{{kg/h}}$ (round off to one decimal place).",
                "correct_answer": f"{V_evap:.1f}",
                "numerical_range": { "min": round(V_evap - 1.0, 1), "max": round(V_evap + 1.0, 1) },
                "solution": f"From overall solids balance:\n$$F \\cdot x_F = P \\cdot x_P$$\n$$P = \\frac{{F \\cdot x_F}}{{x_P}} = \\frac{{{F:.0f} \\times {xF}}}{{{xP}}} = {P_prod:.1f}\\text{{ kg/h}}$$\nTotal water vapor evaporated:\n$$V = F - P = {F:.0f} - {P_prod:.1f} = {V_evap:.1f}\\text{{ kg/h}}$$",
                "difficulty": "Moderate",
                "source": "Unit Operations in Food Processing (R.L. Earle)"
            })
        elif i % 3 == 2:
            V_vap = 2400.0 # kg/h
            S_steam = 800.0 + (i % 5) * 50.0 # kg/h
            economy = round(V_vap / S_steam, 2)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Steam economy of multiple effect evaporator",
                "type": "NAT",
                "marks": 1,
                "negative_marks": 0,
                "question": f"A triple-effect evaporator evaporates $V = {V_vap:.0f}\\text{{ kg/h}}$ of water from fruit juice using a boiler steam supply rate of $S = {S_steam:.0f}\\text{{ kg/h}}$ to the first effect. The steam economy of the evaporator system is ________ (round off to two decimal places).",
                "correct_answer": f"{economy:.2f}",
                "numerical_range": { "min": round(economy - 0.05, 2), "max": round(economy + 0.05, 2) },
                "solution": f"Steam economy is defined as:\n$$\\text{{Steam Economy}} = \\frac{{\\text{{Total Water Evaporated (kg/h)}}}}{{\\text{{Steam Supplied (kg/h)}}}} = \\frac{{{V_vap:.0f}}}{{{S_steam:.0f}}} = {economy:.2f}$$\n(For a triple-effect evaporator, theoretical steam economy typically approaches $2.5 - 2.8$).",
                "difficulty": "Easy",
                "source": "Unit Operations in Food Processing (R.L. Earle)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Boiling point elevation and Duhring rule",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following statements regarding evaporator thermal design is/are TRUE?",
                "options": {
                    "A": "Boiling Point Elevation (BPE) reduces the effective temperature driving force ($\\Delta T$) available for heat transfer in an evaporator",
                    "B": "Dühring's rule states that the boiling point of a solution is a linear function of the boiling point of pure water at the same pressure",
                    "C": "In forward feed multiple-effect evaporators, liquid moves without pumps because pressures decrease in successive effects",
                    "D": "Steam economy of a single-effect evaporator can exceed $3.0$ without vapor recompression"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "1. BPE increases boiling temperature, shrinking $\\Delta T = T_{steam} - (T_{boil} + BPE)$ (A is true).\n2. Dühring lines are straight lines plotting solution boiling point against pure water boiling point (B is true).\n3. Successive effects operate at deeper vacuum, driving forward liquid flow by pressure gradient (C is true).\n4. In a single effect without mechanical/thermal vapor recompression, $1\\text{ kg}$ steam can evaporate at most $\\approx 0.85-0.95\\text{ kg}$ vapor (economy $< 1.0$) due to heat losses and sensible heating (D is false).",
                "difficulty": "Moderate",
                "source": "Transport Processes and Separation Process Principles (Geankoplis)"
            })

    # 9. Size Reduction Mechanics & Energy Laws (40 questions)
    for i in range(1, 41):
        qid = f"QB_APE_SZR_{i:03d}"
        topic = "Size Reduction Mechanics & Energy Laws"
        sub = "Rittinger, Kick, and Bond energy laws"
        if i % 3 == 1:
            P1 = 10.0 # kW for feed D1 to D2
            # Rittinger: P = K_R * (1/d2 - 1/d1)
            # Let feed d1 = 10 mm, product d2 = 2 mm
            # New product d3 = 1 mm
            # P_new = P1 * (1/d3 - 1/d1) / (1/d2 - 1/d1)
            d1 = 10.0
            d2 = 2.0
            d3 = 1.0
            term1 = (1.0 / d2 - 1.0 / d1) # 0.5 - 0.1 = 0.4
            term2 = (1.0 / d3 - 1.0 / d1) # 1.0 - 0.1 = 0.9
            P_new = round(P1 * (term2 / term1), 2) # 10 * 0.9 / 0.4 = 22.5 kW
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Rittinger law power scaling",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"A hammer mill requires ${P1:.1f}\\text{{ kW}}$ of power to crush agricultural feed from an initial size of ${d1:.0f}\\text{{ mm}}$ to ${d2:.0f}\\text{{ mm}}$. According to Rittinger's law ($E = K_R [1/d_2 - 1/d_1]$), the power required to grind the same feed from ${d1:.0f}\\text{{ mm}}$ to ${d3:.0f}\\text{{ mm}}$ at the same throughput capacity is ________ $\\text{{kW}}$ (round off to two decimal places).",
                "correct_answer": f"{P_new:.2f}",
                "numerical_range": { "min": round(P_new - 0.2, 2), "max": round(P_new + 0.2, 2) },
                "solution": f"From Rittinger's law:\n$$\\frac{{P_2}}{{P_1}} = \\frac{{\\frac{{1}}{{d_3}} - \\frac{{1}}{{d_1}}}}{{\\frac{{1}}{{d_2}} - \\frac{{1}}{{d_1}}}}$$\n$$\\frac{{1}}{{d_3}} - \\frac{{1}}{{d_1}} = \\frac{{1}}{{1.0}} - \\frac{{1}}{{10}} = 1.0 - 0.1 = 0.9$$\n$$\\frac{{1}}{{d_2}} - \\frac{{1}}{{d_1}} = \\frac{{1}}{{2.0}} - \\frac{{1}}{{10}} = 0.5 - 0.1 = 0.4$$\n$$P_2 = {P1:.1f} \\times \\left( \\frac{{0.9}}{{0.4}} \\right) = {P1:.1f} \\times 2.25 = {P_new:.2f}\\text{{ kW}}$$",
                "difficulty": "Moderate",
                "source": "Unit Operations of Agricultural Processing (K.M. Sahay and K.K. Singh)"
            })
        elif i % 3 == 2:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Comparison of comminution laws applicability",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "Among the classical size reduction laws, Kick's law applies best for:",
                "options": {
                    "A": "Coarse crushing where energy is primarily consumed in elastic deformation within the volume of large particles",
                    "B": "Ultra-fine grinding into sub-micron powder",
                    "C": "Intermediate range milling where Bond's work index is zero",
                    "D": "Fluid atomization in spray drying"
                },
                "correct_answer": "A",
                "solution": "Applicability ranges:\n- Kick's law ($E \\propto \\ln(d_1/d_2)$): coarse crushing ($d > 50\\text{ mm}$), energy proportional to particle volume.\n- Bond's law ($E \\propto 1/\\sqrt{d}$): intermediate grinding ($0.1 < d < 50\\text{ mm}$).\n- Rittinger's law ($E \\propto 1/d$): fine grinding ($d < 0.1\\text{ mm}$), energy proportional to new surface area created.",
                "difficulty": "Easy",
                "source": "Unit Operations of Agricultural Processing (K.M. Sahay and K.K. Singh)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Bond work index and differential equation of size reduction",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following statements regarding size reduction principles is/are TRUE?",
                "options": {
                    "A": "The general differential equation of comminution is $\\frac{dE}{dx} = -\\frac{K}{x^n}$, where $n = 1$ gives Kick's law, $n = 1.5$ gives Bond's law, and $n = 2$ gives Rittinger's law",
                    "B": "Bond's Work Index ($W_i$) is the gross energy (in $\\text{kWh/ton}$) required to reduce material from infinite feed size to $80\\%$ passing $100\\;\\mu\\text{m}$",
                    "C": "Energy efficiency of commercial grinding mills is typically under $1-5\\%$, with the vast remainder dissipating as heat",
                    "D": "Fine grinding consumes significantly less specific energy than coarse crushing"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "1. Walker-Lewis generalized differential law yields Kick ($n=1$), Bond ($n=1.5$), Rittinger ($n=2$) (A is true).\n2. Bond's exact definition of work index $W_i$ (B is true).\n3. Most mechanical comminution energy is lost to friction, sound, and thermal heat dissipation (C is true).\n4. Fine grinding creates enormous surface area and consumes exponentially more specific energy than coarse crushing (D is false).",
                "difficulty": "Moderate",
                "source": "Unit Operations of Agricultural Processing (K.M. Sahay and K.K. Singh)"
            })

    # 10. Particle Size Analysis & Fineness Modulus (40 questions)
    for i in range(1, 41):
        qid = f"QB_APE_FNM_{i:03d}"
        topic = "Particle Size Analysis & Fineness Modulus"
        sub = "Fineness modulus calculation and average particle diameter"
        if i % 3 == 1:
            # Fineness modulus FM = sum(cumulative % retained) / 100
            sum_cum = 285.0 + (i % 6) * 10.0
            FM = round(sum_cum / 100.0, 2)
            # D_avg = 0.0041 * (2^FM) in inches or D_avg = 0.10414 * (2^FM) mm
            D_avg = round(0.10414 * (2.0**FM), 2)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Fineness modulus from sieve analysis",
                "type": "NAT",
                "marks": 1,
                "negative_marks": 0,
                "question": f"A sieve analysis test of ground cattle feed using a nest of Tyler standard sieves gives a sum of cumulative percentages of feed retained on all sieves equal to $\\sum (\\%\\text{{ retained}}) = {sum_cum:.0f}$. The fineness modulus ($FM$) of the ground feed is ________ (round off to two decimal places).",
                "correct_answer": f"{FM:.2f}",
                "numerical_range": { "min": round(FM - 0.05, 2), "max": round(FM + 0.05, 2) },
                "solution": f"The Fineness Modulus ($FM$) is defined as:\n$$FM = \\frac{{\\sum (\\text{{Cumulative percentage of material retained on standard sieves}})}}{{100}}$$\nGiven $\\sum (\\%\\text{{ retained}}) = {sum_cum:.0f}$:\n$$FM = \\frac{{{sum_cum:.0f}}}{{100}} = {FM:.2f}$$",
                "difficulty": "Easy",
                "source": "Unit Operations of Agricultural Processing (K.M. Sahay and K.K. Singh)"
            })
        elif i % 3 == 2:
            FM_val = 3.0
            # D_avg = 0.0041 * 2^FM (inches) = 0.0041 * 8 = 0.0328 in * 25.4 = 0.833 mm
            D_mm = round(0.0041 * (2.0**FM_val) * 25.4, 3)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Average particle diameter from fineness modulus",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"A ground grain sample has a fineness modulus of $FM = {FM_val:.1f}$. Using Henderson's empirical equation $D = 0.0041 \\times 2^{{FM}}$ where $D$ is average particle diameter in inches ($1\\text{{ inch}} = 25.4\\text{{ mm}}$), the average particle diameter in millimeters is ________ $\\text{{mm}}$ (round off to two decimal places).",
                "correct_answer": f"{D_mm:.2f}",
                "numerical_range": { "min": round(D_mm - 0.03, 2), "max": round(D_mm + 0.03, 2) },
                "solution": f"Using Henderson's formula:\n$$D = 0.0041 \\times 2^{{FM}} = 0.0041 \\times 2^{{3.0}} = 0.0041 \\times 8 = 0.0328\\text{{ inches}}$$\nConverting to millimeters:\n$$D = 0.0328 \\times 25.4 = {D_mm:.3f}\\text{{ mm}}$$\nRounding to two decimal places: ${D_mm:.2f}\\text{{ mm}}$.",
                "difficulty": "Moderate",
                "source": "Agricultural Process Engineering (Henderson and Perry)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Tyler standard sieve series progression",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "In the standard Tyler sieve series, the ratio of clear opening of any sieve to that of the next smaller sieve is:",
                "options": {
                    "A": "$\\sqrt{2} \\approx 1.414$",
                    "B": "$2.000$",
                    "C": "$\\sqrt{3} \\approx 1.732$",
                    "D": "$1.259$"
                },
                "correct_answer": "A",
                "solution": "The Tyler standard screen scale is based on a 200-mesh sieve (wire diameter $0.0021\\text{ in}$, clear opening $0.0029\\text{ in} = 0.074\\text{ mm}$). The linear aperture dimensions vary in the geometric ratio of $\\sqrt{2} = 1.414$ between successive sieves (area ratio of $2:1$).",
                "difficulty": "Easy",
                "source": "Unit Operations of Agricultural Processing (K.M. Sahay and K.K. Singh)"
            })

    # 11. Screening, Cleaning & Grading (Screen Effectiveness) (40 questions)
    for i in range(1, 41):
        qid = f"QB_APE_SCR_{i:03d}"
        topic = "Screening, Cleaning & Grading (Screen Effectiveness)"
        sub = "Screen overall effectiveness formula"
        if i % 3 == 1:
            # Overall effectiveness E = (x_D * D / (x_F * F)) * ((1 - x_B) * B / ((1 - x_F) * F))
            # Or simplified: E = (D * x_D) / (F * x_F) * (1 - (D*(1-x_D) / (F*(1-x_F))))
            # Let F = 100, xF = 0.40. D = 38, xD = 0.90. B = 62, xB = 0.0935.
            F = 100.0
            xF = 0.40
            D = 38.0
            xD = 0.90
            B = 62.0
            xB = 0.0935
            E_rec_ov = (xD * D) / (xF * F) # 0.9 * 38 / 40 = 0.855
            E_rec_un = ((1.0 - xB) * B) / ((1.0 - xF) * F) # (1 - 0.0935)*62 / 60 = 0.9367
            E_tot_pct = round(E_rec_ov * E_rec_un * 100.0, 1) # 80.1%
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Overall screen effectiveness calculation",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"A vibrating cleaner screen is fed with grain feed containing $40\\%$ desired oversized fractions ($x_F = {xF:.2f}$). The overflow stream $D$ contains $90\\%$ oversized fraction ($x_D = {xD:.2f}$) with an overflow recovery ratio $\\frac{{D}}{{F}} = {D/F:.2f}$. The underflow contains $x_B = {xB:.4f}$ oversized fraction with $\\frac{{B}}{{F}} = {B/F:.2f}$. The overall effectiveness of the screen is ________ $\\%$ (round off to one decimal place).",
                "correct_answer": f"{E_tot_pct:.1f}",
                "numerical_range": { "min": round(E_tot_pct - 0.5, 1), "max": round(E_tot_pct + 0.5, 1) },
                "solution": f"Screen effectiveness is the product of recovery of desired oversize material in overflow and recovery of undersize material in underflow:\n$$E = E_D \\times E_B = \\left[ \\frac{{x_D D}}{{x_F F}} \\right] \\times \\left[ \\frac{{(1 - x_B) B}}{{(1 - x_F) F}} \\right]$$\n$$E_D = \\frac{{{xD} \\times {D:.0f}}}{{{xF} \\times {F:.0f}}} = \\frac{{{xD * D:.2f}}}{{{xF * F:.2f}}} = {E_rec_ov:.3f}$$\n$$E_B = \\frac{{(1 - {xB:.4f}) \\times {B:.0f}}}{{(1 - {xF}) \\times {F:.0f}}} = \\frac{{{1 - xB:.4f} \\times {B:.0f}}}{{{1 - xF:.2f} \\times {F:.0f}}} = {E_rec_un:.3f}$$\n$$E = {E_rec_ov:.3f} \\times {E_rec_un:.3f} = {E_tot_pct/100.0:.3f} = {E_tot_pct:.1f}\\%$$",
                "difficulty": "Hard",
                "source": "Unit Operations of Agricultural Processing (K.M. Sahay and K.K. Singh)"
            })
        elif i % 3 == 2:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Terminal velocity separation in pneumatic aspirator",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "In a vertical pneumatic aspirator used for grain cleaning, separation between sound grain and chaff/straw is achieved when the upward air velocity $V_{air}$ satisfies:",
                "options": {
                    "A": "$V_{t,\\text{chaff}} < V_{air} < V_{t,\\text{grain}}$",
                    "B": "$V_{air} > V_{t,\\text{grain}}$",
                    "C": "$V_{air} < V_{t,\\text{chaff}}$",
                    "D": "$V_{air} = 0$"
                },
                "correct_answer": "A",
                "solution": "For aerodynamic separation, the upward air velocity must exceed the terminal falling velocity of the light impurities (chaff/dust) so they are entrained upward, while remaining strictly lower than the terminal velocity of heavy sound grains so grains settle downward: $V_{t,\\text{chaff}} < V_{air} < V_{t,\\text{grain}}$.",
                "difficulty": "Easy",
                "source": "Unit Operations of Agricultural Processing (K.M. Sahay and K.K. Singh)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Specific gravity separator operating principles",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following operational parameters can be adjusted on a specific gravity separator to optimize separation of damaged/immature grains?",
                "options": {
                    "A": "Airflow rate through the porous deck (stratification fluidization)",
                    "B": "End-slope and side-slope tilt angles of the deck",
                    "C": "Oscillation speed (strokes per minute) and stroke length of the deck",
                    "D": "Color wavelength spectrum of the illumination lamps"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "1. Upward air stratifies heavy grains down to the deck cloth while light grains float (A).\n2. Longitudinal and transverse slope dictate discharge paths (B).\n3. Eccentric drive oscillation conveys dense bottom layers up-slope towards high discharge (C).\n4. A specific gravity separator is purely mechanical-pneumatic and does not use optical color sensors (D is false).",
                "difficulty": "Easy",
                "source": "Unit Operations of Agricultural Processing (K.M. Sahay and K.K. Singh)"
            })

    # 12. Material Handling: Belt, Screw & Bucket Conveyors (40 questions)
    for i in range(1, 41):
        qid = f"QB_APE_CVY_{i:03d}"
        topic = "Material Handling: Belt, Screw & Bucket Conveyors"
        sub = "Belt conveyor and screw conveyor capacity calculations"
        if i % 3 == 1:
            v_belt = 1.5 + (i % 5) * 0.2 # m/s
            A_cross = 0.035 # m2 cross-sectional load area
            rho = 750.0 # kg/m3 grain density
            # Capacity C = 3600 * A * v * rho (kg/h) -> tonnes/h
            C_tph = round(3.6 * A_cross * v_belt * rho, 1)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Belt conveyor volumetric and gravimetric capacity",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"A troughed belt conveyor carries grain of bulk density $\\rho = {rho:.0f}\\text{{ kg/m}}^3$. The cross-sectional area of the grain stream on the belt is $A = {A_cross:.3f}\\text{{ m}}^2$ and the belt runs at a linear speed of $v = {v_belt:.1f}\\text{{ m/s}}$. The conveying capacity is ________ $\\text{{tonnes/h}}$ (round off to one decimal place).",
                "correct_answer": f"{C_tph:.1f}",
                "numerical_range": { "min": round(C_tph - 0.5, 1), "max": round(C_tph + 0.5, 1) },
                "solution": f"The gravimetric capacity of a belt conveyor is:\n$$C = 3600 \\times A \\times v \\times \\rho \\; (\\text{{kg/h}}) = 3.6 \\times A \\times v \\times \\rho \\; (\\text{{t/h}})$$\nGiven $A = {A_cross:.3f}\\text{{ m}}^2$, $v = {v_belt:.1f}\\text{{ m/s}}$, and $\\rho = {rho:.0f}\\text{{ kg/m}}^3$:\n$$C = 3.6 \\times {A_cross:.3f} \\times {v_belt:.1f} \\times {rho:.0f} = {C_tph:.1f}\\text{{ tonnes/h}}$$",
                "difficulty": "Moderate",
                "source": "Unit Operations of Agricultural Processing (K.M. Sahay and K.K. Singh)"
            })
        elif i % 3 == 2:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Centrifugal vs gravity discharge in bucket elevator",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "In a vertical centrifugal-discharge bucket elevator, the critical head pulley speed occurs when centrifugal force equals the gravitational weight of the grain in the bucket, corresponding to:",
                "options": {
                    "A": "$\\frac{v^2}{r} = g \\implies v = \\sqrt{g r}$",
                    "B": "$v = g r$",
                    "C": "$\\frac{v}{r} = 2 g$",
                    "D": "$v = \\sqrt{2 g r}$"
                },
                "correct_answer": "A",
                "solution": "At the top of the head pulley of radius $r$, the condition where centrifugal force matches gravity is $m \\frac{v^2}{r} = m g \\implies v = \\sqrt{g r}$. Speeds slightly above this critical speed project grain cleanly into the discharge chute by centrifugal force.",
                "difficulty": "Easy",
                "source": "Agricultural Process Engineering (Henderson and Perry)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Screw conveyor volumetric capacity factors",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "The volumetric conveying capacity of a horizontal screw (auger) conveyor is directly proportional to which of the following variables?",
                "options": {
                    "A": "Rotational speed of the screw shaft ($N$ in rpm)",
                    "B": "Pitch distance ($p$) between consecutive screw flights",
                    "C": "Trough loading percentage filling factor ($\\phi$)",
                    "D": "Color pigment of the auger flight paint"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "1. Screw capacity $Q = 60 \\frac{\\pi}{4} (D^2 - d^2) p N \\phi$: directly linear with speed $N$ (A).\n2. Pitch $p$ is advance distance per revolution (B).\n3. Trough filling factor $\\phi$ ($30-45\\%$ for grains) directly multiplies effective volume (C).\n4. Paint color is purely aesthetic and has zero effect on displacement hydraulics (D is false).",
                "difficulty": "Easy",
                "source": "Unit Operations of Agricultural Processing (K.M. Sahay and K.K. Singh)"
            })

    # 13. Pneumatic Conveying & Fluidization of Solids (40 questions)
    for i in range(1, 41):
        qid = f"QB_APE_PNC_{i:03d}"
        topic = "Pneumatic Conveying & Fluidization of Solids"
        sub = "Dilute phase vs dense phase and saltation velocity"
        if i % 3 == 1:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Saltation velocity definition",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "In dilute-phase horizontal pneumatic conveying, the 'saltation velocity' represents the minimum gas velocity below which:",
                "options": {
                    "A": "Suspended solid particles begin to drop out of suspension and deposit along the bottom of the horizontal pipe",
                    "B": "The pipe immediately explodes due to extreme static pressure",
                    "C": "All solid particles undergo instantaneous thermal pyrolysis",
                    "D": "Airflow becomes completely supersonic"
                },
                "correct_answer": "A",
                "solution": "Saltation velocity is the boundary threshold in horizontal pneumatic conveying below which aerodynamic lift forces fail to keep particles airborne, causing them to drop out of suspension and form rolling dunes along the pipe bottom.",
                "difficulty": "Easy",
                "source": "Unit Operations of Agricultural Processing (K.M. Sahay and K.K. Singh)"
            })
        elif i % 3 == 2:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Dilute phase vs dense phase comparison",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following characteristics distinguish dense-phase pneumatic conveying from dilute-phase conveying?",
                "options": {
                    "A": "Dense-phase operates at much higher solid-to-air mass loading ratios ($m_s/m_g > 20-50$)",
                    "B": "Dense-phase operates at lower air velocities ($3-10\\text{ m/s}$) compared to dilute-phase ($18-30\\text{ m/s}$)",
                    "C": "Dense-phase significantly reduces grain impact damage, breakage, and pipeline erosive wear",
                    "D": "Dense-phase requires zero pressure difference across the pipeline"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "1. High solids loading is the hallmark of dense-phase plug/slug conveying (A is true).\n2. Lower gas velocities prevent attrition (B is true).\n3. Slower velocities drastically reduce grain fissuring and pipe abrasive wear (C is true).\n4. Dense-phase requires substantially higher pressure differentials ($2-6\\text{ bar}$) to push compact solid plugs (D is false).",
                "difficulty": "Moderate",
                "source": "Transport Processes and Separation Process Principles (Geankoplis)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Minimum fluidization velocity Ergun equation",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "At the onset of minimum fluidization in a granular bed, the pressure drop across the bed ($\\Delta P$) equals:",
                "options": {
                    "A": "The buoyant weight of the bed particles per unit cross-sectional area: $\\Delta P = L (1 - \\epsilon_m) (\\rho_s - \\rho_g) g$",
                    "B": "Zero",
                    "C": "Atmospheric pressure multiplied by void ratio",
                    "D": "The dynamic pressure $\\frac{1}{2} \\rho_g v^2$"
                },
                "correct_answer": "A",
                "solution": "Fluidization begins when upward drag force balances the net submerged weight of all bed particles: $\\Delta P \\cdot A = W_{submerged} \\implies \\Delta P = L (1 - \\epsilon_{mf}) (\\rho_p - \\rho_f) g$.",
                "difficulty": "Moderate",
                "source": "Transport Processes and Separation Process Principles (Geankoplis)"
            })

    # 14. Grain Storage: Silos, Bins & Pressure Distribution (40 questions)
    for i in range(1, 41):
        qid = f"QB_APE_SIL_{i:03d}"
        topic = "Grain Storage: Silos, Bins & Pressure Distribution"
        sub = "Janssen silo theory for lateral and vertical pressure"
        if i % 3 == 1:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Janssen silo pressure asymptote",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "According to Janssen's theory for deep grain storage silos, as the depth of grain $h$ becomes very large ($h \\to \\infty$), the vertical pressure $P_v$ at the bottom:",
                "options": {
                    "A": "Approaches a constant asymptotic maximum limit: $P_{v,\\max} = \\frac{\\gamma R}{\\mu' k}$",
                    "B": "Increases infinitely and linearly with depth ($P_v = \\gamma h$)",
                    "C": "Drops to zero due to internal arching",
                    "D": "Fluctuates sinusoidally with depth"
                },
                "correct_answer": "A",
                "solution": "In Janssen's equation: $P_v = \\frac{\\gamma R}{\\mu' k} \\left[1 - \\exp\\left(-\\frac{\\mu' k h}{R}\\right)\\right]$. As $h \\to \\infty$, the exponential term vanishes, and $P_v$ asymptotes to $\\frac{\\gamma R}{\\mu' k}$, where grain weight is fully supported by wall friction.",
                "difficulty": "Easy",
                "source": "Agricultural Process Engineering (Henderson and Perry)"
            })
        elif i % 3 == 2:
            gamma = 7.5 # kN/m3
            R = 1.5 # m (D/4 = 6/4)
            mu_prime = 0.40 # wall friction coefficient
            k = 0.50 # pressure ratio
            # Asymptotic Pv = (gamma * R) / (mu_prime * k)
            Pv_max = round((gamma * R) / (mu_prime * k), 2)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Maximum asymptotic vertical pressure in deep silo",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"A circular deep grain silo of internal diameter $D = 6.0\\text{{ m}}$ (hydraulic radius $R = D/4 = {R:.2f}\\text{{ m}}$) is filled with wheat of unit weight $\\gamma = {gamma:.1f}\\text{{ kN/m}}^3$. The coefficient of friction between grain and silo wall is $\\mu' = {mu_prime:.2f}$ and the ratio of lateral to vertical pressure is $k = {k:.2f}$. According to Janssen's theory, the theoretical maximum asymptotic vertical pressure that can ever develop at great depths is ________ $\\text{{kPa}}$ (round off to two decimal places).",
                "correct_answer": f"{Pv_max:.2f}",
                "numerical_range": { "min": round(Pv_max - 0.2, 2), "max": round(Pv_max + 0.2, 2) },
                "solution": f"The asymptotic vertical pressure in Janssen's silo theory is given by:\n$$P_{{v,\\max}} = \\frac{{\\gamma R}}{{\\mu' k}}$$\nSubstituting $\\gamma = {gamma:.1f}\\text{{ kN/m}}^3$, $R = {R:.2f}\\text{{ m}}$, $\\mu' = {mu_prime:.2f}$, and $k = {k:.2f}$:\n$$P_{{v,\\max}} = \\frac{{{gamma:.1f} \\times {R:.2f}}}{{{mu_prime:.2f} \\times {k:.2f}}} = \\frac{{{gamma * R:.2f}}}{{{mu_prime * k:.2f}}} = {Pv_max:.2f}\\text{{ kPa}}$$",
                "difficulty": "Moderate",
                "source": "Agricultural Process Engineering (Henderson and Perry)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Shallow bin vs deep silo criteria",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following criteria distinguish a deep silo from a shallow bin in agricultural grain storage engineering?",
                "options": {
                    "A": "In a deep bin, the rupture plane of the stored grain intersects the opposite vertical wall before reaching the free grain surface",
                    "B": "In a shallow bin, Airy's or Coulomb's formula applies where the rupture plane emerges at the free grain surface",
                    "C": "Wall friction supports a major fraction of the grain weight in deep silos, preventing hydrostatic pressure buildup",
                    "D": "In a deep silo, the bottom floor carries $100\\%$ of the total grain mass regardless of silo height"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "1. Deep bin definition: plane of rupture intersects the opposite side wall (A is true).\n2. Shallow bin: plane of rupture breaks out at top free surface (B is true).\n3. Janssen wall friction takes up majority of grain mass, causing pressure saturation (C is true).\n4. In deep silos, wall friction supports over $70-90\\%$ of total grain mass at depth; floor carries only a minor fraction (D is false).",
                "difficulty": "Moderate",
                "source": "Agricultural Process Engineering (Henderson and Perry)"
            })

    # 15. Rice Milling, Parboiling & Pulse Processing (40 questions)
    for i in range(1, 41):
        qid = f"QB_APE_RIC_{i:03d}"
        topic = "Rice Milling, Parboiling & Pulse Processing"
        sub = "Parboiling starch gelatinization and rubber roll sheller"
        if i % 3 == 1:
            paddy_in = 1000.0 # kg
            husk_pct = 22.0 # %
            bran_pct = 8.0 # %
            broken_pct = 15.0 # % of milled rice
            # Brown rice = 780 kg
            # Milled rice = 780 * (1 - 0.08) = 717.6 kg
            # Head rice = 717.6 * (1 - 0.15) = 609.96 kg
            head_rice = round(paddy_in * (1.0 - husk_pct/100.0) * (1.0 - bran_pct/100.0) * (1.0 - broken_pct/100.0), 1)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Head rice yield calculation",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"A sample of ${paddy_in:.0f}\\text{{ kg}}$ paddy is processed in a modern rice mill. The husk fraction is ${husk_pct:.0f}\\%$ of rough paddy. Bran removal during polishing is ${bran_pct:.0f}\\%$ of brown rice. Brokens constitute ${broken_pct:.0f}\\%$ of the total milled white rice. The mass of whole head rice recovered is ________ $\\text{{kg}}$ (round off to one decimal place).",
                "correct_answer": f"{head_rice:.1f}",
                "numerical_range": { "min": round(head_rice - 0.5, 1), "max": round(head_rice + 0.5, 1) },
                "solution": f"Step 1: Mass of brown rice after dehusking:\n$$W_{{brown}} = {paddy_in:.0f} \\times (1 - {husk_pct/100.0:.2f}) = {paddy_in * (1 - husk_pct/100.0):.1f}\\text{{ kg}}$$\nStep 2: Total milled rice after bran polishing:\n$$W_{{milled}} = {paddy_in * (1 - husk_pct/100.0):.1f} \\times (1 - {bran_pct/100.0:.2f}) = {paddy_in * (1 - husk_pct/100.0) * (1 - bran_pct/100.0):.2f}\\text{{ kg}}$$\nStep 3: Head rice (unbroken whole kernels):\n$$W_{{head}} = W_{{milled}} \\times (1 - {broken_pct/100.0:.2f}) = {head_rice:.1f}\\text{{ kg}}$$",
                "difficulty": "Moderate",
                "source": "Unit Operations of Agricultural Processing (K.M. Sahay and K.K. Singh)"
            })
        elif i % 3 == 2:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Biochemical changes during paddy parboiling",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following nutritional and physicochemical changes occur when paddy is parboiled (soaking, steaming, and drying)?",
                "options": {
                    "A": "Complete gelatinization of starch granules and healing of internal kernel micro-cracks",
                    "B": "Inward migration of water-soluble B-complex vitamins (thiamine, riboflavin, niacin) from the aleurone layer into the starchy endosperm",
                    "C": "Substantial increase in Head Rice Yield (HRY) and enhanced resistance to insect attack during storage",
                    "D": "Cooking time of parboiled rice is significantly shorter than raw milled rice"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "1. Steaming gelatinizes starch, cementing fissures and cracks (A is true).\n2. Hydrothermal soaking diffuses water-soluble B vitamins into the endosperm, preventing polishing losses (B is true).\n3. Gelatinized kernels become tough and glassy, resisting breakage (higher HRY) and insect penetration (C is true).\n4. Parboiled rice has a retrograded crystalline starch matrix that requires LONGER cooking time than raw rice (D is false).",
                "difficulty": "Easy",
                "source": "Unit Operations of Agricultural Processing (K.M. Sahay and K.K. Singh)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Rubber roll sheller differential speed",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "In a modern rubber-roll paddy dehusker, dehusking is accomplished primarily by shearing action created because:",
                "options": {
                    "A": "The two rubber rolls rotate inward in opposite directions at different peripheral surface speeds (speed ratio $\\approx 1:1.2$ to $1:1.25$)",
                    "B": "The two rolls rotate at identical rotational speeds in the same direction",
                    "C": "Paddy kernels are pulverized against stationary steel impact pins",
                    "D": "Centrifugal forces throw grains against a carborundum stone lining"
                },
                "correct_answer": "A",
                "solution": "In a rubber roll sheller, two resilient rubber-coated rolls rotate toward each other at differential speeds (fast roll typically $1000-1100\\text{ rpm}$, slow roll $800-900\\text{ rpm}$, speed ratio $1:1.20-1.25$). The peripheral speed difference exerts a strong, gentle shearing force that peels off the loose husk with minimal kernel breakage.",
                "difficulty": "Easy",
                "source": "Unit Operations of Agricultural Processing (K.M. Sahay and K.K. Singh)"
            })

    return questions
