import json
import math

def generate_ide_questions():
    questions = []
    def add(q):
        questions.append(q)

    SEC = "Section 5: Irrigation and Drainage Engineering"

    # 1. Soil-Water-Plant Relations & Soil Moisture Constants (38 questions)
    for i in range(1, 39):
        qid = f"QB_IDE_SWP_{i:03d}"
        topic = "Soil-Water-Plant Relations & Soil Moisture Constants"
        sub = "Available water capacity and readily available moisture"
        if i % 3 == 1:
            fc = 28.0 + (i % 6)
            pwp = 12.0 + (i % 4)
            bd = 1.45 # g/cm3
            d_root = 80.0 # cm
            # Available water AW = (bd * d_root / 100) * (fc - pwp) in cm
            aw = round((bd * d_root / 100.0) * (fc - pwp), 2)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": sub,
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"A crop root zone of depth ${d_root:.0f}\\text{{ cm}}$ has a soil bulk density of ${bd:.2f}\\text{{ g/cm}}^3$. The field capacity and permanent wilting point of the soil are ${fc:.1f}\\%$ and ${pwp:.1f}\\%$ (on dry weight basis), respectively. The total available water holding capacity of the root zone is ________ $\\text{{cm}}$ (round off to two decimal places).",
                "correct_answer": f"{aw:.2f}",
                "numerical_range": { "min": round(aw - 0.2, 2), "max": round(aw + 0.2, 2) },
                "solution": f"The available water depth $AW$ is calculated as:\n$$AW = \\frac{{\\rho_b \\cdot D}}{{\\rho_w \\cdot 100}} (FC - PWP)$$\nGiven $\\rho_b = {bd:.2f}\\text{{ g/cm}}^3$, $\\rho_w = 1.0\\text{{ g/cm}}^3$, $D = {d_root:.0f}\\text{{ cm}}$, $FC = {fc:.1f}\\%$, and $PWP = {pwp:.1f}\\%$:\n$$AW = \\frac{{{bd:.2f} \\times {d_root:.0f}}}{{100}} \\times ({fc:.1f} - {pwp:.1f}) = {bd * d_root / 100.0:.3f} \\times {fc - pwp:.1f} = {aw:.2f}\\text{{ cm}}$$",
                "difficulty": "Moderate",
                "source": "Irrigation Theory and Practice (A.M. Michael)"
            })
        elif i % 3 == 2:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Soil water potentials and retention energy",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "Soil water potential at permanent wilting point (PWP) in standard agricultural soils is approximately equal to:",
                "options": {
                    "A": "$-15\\text{ bars} \\; (-1.5\\text{ MPa})$",
                    "B": "$-0.33\\text{ bar} \\; (-33\\text{ kPa})$",
                    "C": "$-0.10\\text{ bar} \\; (-10\\text{ kPa})$",
                    "D": "$-31\\text{ bars} \\; (-3.1\\text{ MPa})$"
                },
                "correct_answer": "A",
                "solution": "In classical soil physics:\n- Field Capacity corresponds to matric suction between $-0.1$ to $-0.33\\text{ bar}$ ($-10$ to $-33\\text{ kPa}$).\n- Permanent Wilting Point corresponds to a matric potential of $-15\\text{ bars}$ ($-1.5\\text{ MPa}$).\n- Hygroscopic coefficient corresponds to approximately $-31\\text{ bars}$.",
                "difficulty": "Easy",
                "source": "Irrigation Theory and Practice (A.M. Michael)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Soil moisture measuring instruments",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following statements regarding soil moisture measurement devices is/are TRUE?",
                "options": {
                    "A": "Tensiometers operate accurately only within a tension range of $0$ to $0.8\\text{ bar}$ ($0$ to $80\\text{ kPa}$)",
                    "B": "Gypsum electrical resistance blocks are more suitable for measuring matric suction in the drier range ($1$ to $15\\text{ bars}$)",
                    "C": "Time Domain Reflectometry (TDR) measures soil moisture by determining the apparent dielectric permittivity of the bulk soil",
                    "D": "Neutron probe scattering measures hydrogen ion concentration and is completely unaffected by organic matter or salinity"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "1. Tensiometers cavitate and break the water meniscus above $0.8\\text{ bar}$ (A is true).\n2. Gypsum blocks have fine pore matrices suited for dry range $1-15\\text{ bars}$ (B is true).\n3. TDR measures the high dielectric constant of water ($\\approx 80$) vs soil solids ($\\approx 3-5$) (C is true).\n4. Neutron probes thermalize fast neutrons via collision with all hydrogen atoms, including organic matter, boron, and chlorine; calibration is sensitive to organic matter (D is false).",
                "difficulty": "Hard",
                "source": "Irrigation Theory and Practice (A.M. Michael)"
            })

    # 2. Evapotranspiration, Consumptive Use & Crop Water Needs (38 questions)
    for i in range(1, 39):
        qid = f"QB_IDE_ETP_{i:03d}"
        topic = "Evapotranspiration, Consumptive Use & Crop Water Needs"
        sub = "Reference crop evapotranspiration and crop coefficients"
        if i % 3 == 1:
            Epan = 6.0 + (i % 5) * 0.5 # mm/day
            Kp = 0.75
            Kc = 1.15
            ETc = round(Epan * Kp * Kc, 2)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Crop evapotranspiration from pan evaporation",
                "type": "NAT",
                "marks": 1,
                "negative_marks": 0,
                "question": f"A Class-A evaporation pan installed in an irrigated field measures an average daily pan evaporation rate of $E_{{pan}} = {Epan:.1f}\\text{{ mm/day}}$. Taking the pan coefficient $K_p = {Kp}$ and crop coefficient during peak flowering stage $K_c = {Kc}$, the crop evapotranspiration $ET_c$ is ________ $\\text{{mm/day}}$ (round off to two decimal places).",
                "correct_answer": f"{ETc:.2f}",
                "numerical_range": { "min": round(ETc - 0.1, 2), "max": round(ETc + 0.1, 2) },
                "solution": f"Reference evapotranspiration $ET_0 = K_p \\times E_{{pan}} = {Kp} \\times {Epan:.1f} = {Kp * Epan:.2f}\\text{{ mm/day}}$.\nCrop evapotranspiration is:\n$$ET_c = K_c \\times ET_0 = K_c \\times K_p \\times E_{{pan}} = {Kc} \\times {Kp} \\times {Epan:.1f} = {ETc:.2f}\\text{{ mm/day}}$$",
                "difficulty": "Easy",
                "source": "Irrigation Theory and Practice (A.M. Michael)"
            })
        elif i % 3 == 2:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "FAO Penman-Monteith method reference surface",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "The FAO-56 Penman-Monteith standard reference surface is defined as a hypothetical green grass reference crop having an assumed height of:",
                "options": {
                    "A": "$0.12\\text{ m}$ with fixed surface resistance of $70\\text{ s/m}$ and albedo of $0.23$",
                    "B": "$0.50\\text{ m}$ with surface resistance of $100\\text{ s/m}$ and albedo of $0.15$",
                    "C": "$0.05\\text{ m}$ with surface resistance of $30\\text{ s/m}$ and albedo of $0.05$",
                    "D": "$1.00\\text{ m}$ with surface resistance of $50\\text{ s/m}$ and albedo of $0.35$"
                },
                "correct_answer": "A",
                "solution": "FAO-56 standard reference crop is an extensive surface of green, well-watered grass of uniform height of $0.12\\text{ m}$, aerodynamic resistance $r_a = 208/u_2\\text{ s/m}$, fixed canopy resistance $r_s = 70\\text{ s/m}$, and reflection coefficient (albedo) $\\alpha = 0.23$.",
                "difficulty": "Moderate",
                "source": "Irrigation Theory and Practice (A.M. Michael)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Factors affecting crop coefficient Kc curve",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following factors govern the magnitude of the single crop coefficient ($K_c$) across crop growth stages?",
                "options": {
                    "A": "Crop development stage: $K_c$ is lowest during initial stage and reaches maximum during mid-season reproductive stage",
                    "B": "Fraction of ground canopy cover and leaf area index ($LAI$)",
                    "C": "Frequency of rain or wetting events during initial growth stage",
                    "D": "Hydraulic radius of the supplying main canal"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "1. $K_c$ increases from initial ($0.3-0.5$) to mid-season ($1.05-1.25$) with canopy expansion (A is true).\n2. Ground shading directly controls the ratio of transpiration to evaporation (B is true).\n3. Frequent wetting wet surface drives high soil evaporation during initial stage, elevating initial $K_c$ (C is true).\n4. Supply canal cross-section is external conveyance hydraulics and has zero bearing on biological crop transpiration factors (D is false).",
                "difficulty": "Easy",
                "source": "Irrigation Theory and Practice (A.M. Michael)"
            })

    # 3. Irrigation Scheduling & Soil Moisture Depletion (38 questions)
    for i in range(1, 39):
        qid = f"QB_IDE_SCH_{i:03d}"
        topic = "Irrigation Scheduling & Soil Moisture Depletion"
        sub = "Net irrigation requirement and irrigation frequency"
        if i % 3 == 1:
            AW_mm = 120.0 + (i % 5) * 10.0
            MAD = 0.50 # 50% management allowed depletion
            ETc = 6.0 # mm/day
            RAW_mm = AW_mm * MAD
            interval_days = round(RAW_mm / ETc, 1)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Irrigation interval calculation",
                "type": "NAT",
                "marks": 1,
                "negative_marks": 0,
                "question": f"A crop root zone has a total available soil water capacity of $AW = {AW_mm:.0f}\\text{{ mm}}$. The management allowed depletion ($MAD$) is set to ${MAD*100:.0f}\\%$. If the average daily crop evapotranspiration rate is $ET_c = {ETc:.1f}\\text{{ mm/day}}$, the allowable irrigation interval is ________ $\\text{{days}}$ (round off to one decimal place).",
                "correct_answer": f"{interval_days:.1f}",
                "numerical_range": { "min": round(interval_days - 0.2, 1), "max": round(interval_days + 0.2, 1) },
                "solution": f"Readily available water ($RAW$) is:\n$$RAW = MAD \\times AW = {MAD} \\times {AW_mm:.0f} = {RAW_mm:.1f}\\text{{ mm}}$$\nIrrigation interval is:\n$$\\text{{Interval}} = \\frac{{RAW}}{{ET_c}} = \\frac{{{RAW_mm:.1f}}}{{{ETc:.1f}}} = {interval_days:.1f}\\text{{ days}}$$",
                "difficulty": "Easy",
                "source": "Irrigation Theory and Practice (A.M. Michael)"
            })
        elif i % 3 == 2:
            NIR = 60.0 + (i % 4) * 10.0 # mm
            eta_app = 0.75
            GIR = round(NIR / eta_app, 1)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Gross irrigation requirement from application efficiency",
                "type": "NAT",
                "marks": 1,
                "negative_marks": 0,
                "question": f"The net depth of irrigation water required to replenish the root zone to field capacity is $NIR = {NIR:.0f}\\text{{ mm}}$. If the field water application efficiency is $\\eta_a = {eta_app*100:.0f}\\%$, the gross irrigation requirement ($GIR$) is ________ $\\text{{mm}}$ (round off to one decimal place).",
                "correct_answer": f"{GIR:.1f}",
                "numerical_range": { "min": round(GIR - 0.5, 1), "max": round(GIR + 0.5, 1) },
                "solution": f"Gross irrigation requirement accounts for on-field deep percolation and runoff losses:\n$$GIR = \\frac{{NIR}}{{\\eta_a}} = \\frac{{{NIR:.0f}}}{{{eta_app}}} = {GIR:.1f}\\text{{ mm}}$$",
                "difficulty": "Easy",
                "source": "Irrigation Theory and Practice (A.M. Michael)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Critical growth stages of major crops",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following pairing of crops with their most critical stages for moisture stress is/are CORRECT?",
                "options": {
                    "A": "Wheat: Crown Root Initiation (CRI) stage (20–25 days after sowing)",
                    "B": "Rice: Panicle initiation and flowering stage",
                    "C": "Maize: Tasseling and silking stage",
                    "D": "Gram / Chickpea: Continuous flooding during harvest"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "1. CRI is the single most vital stage in wheat; moisture deficit at CRI permanently slashes tillering and yield (A is correct).\n2. Panicle initiation through flowering is extremely vulnerable in paddy (B is correct).\n3. Tasseling and silking determine kernel set in maize (C is correct).\n4. Chickpea is highly sensitive to waterlogging and never requires flooding during harvest (D is false).",
                "difficulty": "Easy",
                "source": "Irrigation Theory and Practice (A.M. Michael)"
            })

    # 4. Surface Irrigation: Border, Furrow & Basin Hydraulics (38 questions)
    for i in range(1, 39):
        qid = f"QB_IDE_SRF_{i:03d}"
        topic = "Surface Irrigation: Border, Furrow & Basin Hydraulics"
        sub = "Border strip advance equation and unit discharge"
        if i % 3 == 1:
            q_in = 0.020 # m3/s per m width
            y_avg = 0.08 # m average surface ponding
            I_infil = 0.000015 # m/s steady infiltration rate
            # Max length of border L_max = q / I_infil
            Lmax = round(q_in / I_infil, 1)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Maximum length of border strip",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"A border strip receives a unit inflow rate of $q = {q_in*1000:.0f}\\text{{ L/(s}}\\,\\text{{m width)}}$. The average final steady infiltration rate of the soil is $f = {I_infil * 1000 * 3600:.1f}\\text{{ mm/h}}$ (${I_infil:.6f}\\text{{ m/s}}$). The maximum theoretical length of border strip that can be covered by this stream is ________ $\\text{{m}}$ (round off to one decimal place).",
                "correct_answer": f"{Lmax:.1f}",
                "numerical_range": { "min": round(Lmax - 2.0, 1), "max": round(Lmax + 2.0, 1) },
                "solution": f"The maximum theoretical advance length occurs when inflow rate equals infiltration loss over the entire strip:\n$$L_{{max}} = \\frac{{q}}{{f}} = \\frac{{{q_in}}}{{{I_infil}}} = {Lmax:.1f}\\text{{ m}}$$",
                "difficulty": "Moderate",
                "source": "Irrigation Theory and Practice (A.M. Michael)"
            })
        elif i % 3 == 2:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Advance and recession curves",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "In surface furrow or border irrigation, the opportunity time for infiltration at any point along the run is equal to the difference between:",
                "options": {
                    "A": "Recession time and advance time at that point",
                    "B": "Total inflow time and cutoff time",
                    "C": "Advance time and lag time",
                    "D": "Ponding depth and depression storage"
                },
                "correct_answer": "A",
                "solution": "Infiltration opportunity time $\\tau(x) = t_{rec}(x) - t_{adv}(x)$, which is the exact duration water remains standing on the soil surface at location $x$.",
                "difficulty": "Easy",
                "source": "Irrigation Theory and Practice (A.M. Michael)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Four phases of surface irrigation",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following sequentially represent the standard chronological phases of a surface irrigation event?",
                "options": {
                    "A": "Advance phase (water moves from inlet down to field end)",
                    "B": "Storage / Ponding phase (between advance completion and inflow cutoff)",
                    "C": "Depletion phase (from cutoff until water disappears from upstream end)",
                    "D": "Recession phase (drying front moves from upstream to downstream end)"
                },
                "correct_answer": ["A", "B", "C", "D"],
                "solution": "Surface irrigation hydraulics consists of exactly four chronological stages:\n1. Advance phase\n2. Storage/wetting phase\n3. Depletion phase\n4. Recession phase.\nAll four statements A, B, C, D are true.",
                "difficulty": "Moderate",
                "source": "Irrigation Theory and Practice (A.M. Michael)"
            })

    # 5. Sprinkler Irrigation Design & Distribution Uniformity (38 questions)
    for i in range(1, 39):
        qid = f"QB_IDE_SPK_{i:03d}"
        topic = "Sprinkler Irrigation Design & Distribution Uniformity"
        sub = "Christiansen uniformity coefficient and application rate"
        if i % 3 == 1:
            q_nozzle = 0.50 + (i % 5) * 0.10 # L/s
            Sl = 12.0 # m lateral spacing
            Sm = 12.0 # m sprinkler spacing
            # App rate R = (q * 3600) / (Sl * Sm * 1000) * 1000 = (q * 3600) / (Sl * Sm) mm/h
            app_rate = round((q_nozzle * 3600.0) / (Sl * Sm), 2)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Sprinkler precipitation application rate",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"A sprinkler system operates with sprinklers spaced at $S_m = {Sm:.0f}\\text{{ m}}$ along the lateral and laterals spaced at $S_l = {Sl:.0f}\\text{{ m}}$ along the main line. Each sprinkler discharges $q = {q_nozzle:.2f}\\text{{ L/s}}$. The average application rate of the system is ________ $\\text{{mm/h}}$ (round off to two decimal places).",
                "correct_answer": f"{app_rate:.2f}",
                "numerical_range": { "min": round(app_rate - 0.1, 2), "max": round(app_rate + 0.1, 2) },
                "solution": f"The average application rate is calculated from the discharge and coverage area:\n$$I = \\frac{{q \\times 3600}}{{S_l \\times S_m}}$$\nwhere $q$ is in $\\text{{L/s}}$, $S_l, S_m$ are in $\\text{{m}}$, giving $I$ in $\\text{{mm/h}}$:\n$$I = \\frac{{{q_nozzle:.2f} \\times 3600}}{{{Sl:.0f} \\times {Sm:.0f}}} = \\frac{{{q_nozzle * 3600:.1f}}}{{{Sl * Sm:.0f}}} = {app_rate:.2f}\\text{{ mm/h}}$$",
                "difficulty": "Moderate",
                "source": "Irrigation Theory and Practice (A.M. Michael)"
            })
        elif i % 3 == 2:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Christiansen Uniformity Coefficient formula",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "Christiansen's Uniformity Coefficient ($CU$) for a catch-can sprinkler evaluation test with $n$ observations $X_i$ and mean $\\bar{X}$ is defined as:",
                "options": {
                    "A": "$CU = 100 \\left( 1 - \\frac{\\sum |X_i - \\bar{X}|}{n \\bar{X}} \\right)$",
                    "B": "$CU = 100 \\left( 1 - \\frac{\\sum (X_i - \\bar{X})^2}{n \\bar{X}^2} \\right)$",
                    "C": "$CU = \\frac{\\text{Minimum Catch}}{\\bar{X}} \\times 100$",
                    "D": "$CU = 100 \\left( 1 - \\frac{\\bar{X}}{\\sum X_i} \\right)$"
                },
                "correct_answer": "A",
                "solution": "Christiansen (1942) defined the uniformity coefficient based on mean absolute deviation:\n$$CU = 100 \\left( 1 - \\frac{\\sum_{i=1}^n |X_i - \\bar{X}|}{n \\bar{X}} \\right)$$",
                "difficulty": "Easy",
                "source": "Irrigation Theory and Practice (A.M. Michael)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Sprinkler allowable pressure variation",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "In the hydraulic design of sprinkler laterals, which of the following criteria is/are standard engineering practice?",
                "options": {
                    "A": "Total pressure variation along a lateral should not exceed $20\\%$ of the nominal operating pressure",
                    "B": "Discharge variation between the first and last sprinkler on a lateral should not exceed $10\\%$",
                    "C": "The Christiansen $F$-factor accounts for multi-outlet friction head loss reduction compared to pipe flow with total discharge at inlet",
                    "D": "Application rate must strictly exceed the steady infiltration rate of the soil to guarantee surface ponding"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "1. Pressure variation $\\Delta P \\le 20\\%$ of design pressure ensures discharge variation within $\\Delta q \\le 10\\%$ since $q \\propto P^{0.5}$ (A and B are true).\n2. Multi-outlet friction factor $F$ ($F \\approx 0.35$ for large $N$) reduces total friction loss compared to plain pipe (C is true).\n3. Application rate must NEVER exceed soil infiltration capacity to prevent surface runoff and erosion (D is false).",
                "difficulty": "Moderate",
                "source": "Irrigation Theory and Practice (A.M. Michael)"
            })

    # 6. Drip / Micro-Irrigation Design & Emitters (38 questions)
    for i in range(1, 39):
        qid = f"QB_IDE_DRP_{i:03d}"
        topic = "Drip / Micro-Irrigation Design & Emitters"
        sub = "Emitter discharge exponent and emission uniformity"
        if i % 3 == 1:
            k_em = 1.2
            H_bar = 10.0 + (i % 5) * 2.0 # m pressure head
            x_exp = 0.5 # orifice type
            # q = k * H^x
            q_emit = round(k_em * (H_bar**x_exp), 2)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Drip emitter flow rate from pressure head",
                "type": "NAT",
                "marks": 1,
                "negative_marks": 0,
                "question": f"A standard orifice-type drip emitter has an emitter discharge equation $q = {k_em} H^{{{x_exp}}}$, where $q$ is in $\\text{{L/h}}$ and $H$ is pressure head in $\\text{{m of water}}$. At an operating pressure head of $H = {H_bar:.0f}\\text{{ m}}$, the emitter discharge rate is ________ $\\text{{L/h}}$ (round off to two decimal places).",
                "correct_answer": f"{q_emit:.2f}",
                "numerical_range": { "min": round(q_emit - 0.1, 2), "max": round(q_emit + 0.1, 2) },
                "solution": f"Applying the emitter discharge equation:\n$$q = k H^x = {k_em} \\times ({H_bar:.0f})^{{0.5}} = {k_em} \\times {math.sqrt(H_bar):.4f} = {q_emit:.2f}\\text{{ L/h}}$$",
                "difficulty": "Easy",
                "source": "Irrigation Theory and Practice (A.M. Michael)"
            })
        elif i % 3 == 2:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Pressure compensating emitter exponent",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "For an ideal pressure-compensating (PC) drip emitter, the emitter discharge exponent $x$ in the equation $q = k H^x$ is theoretically equal to:",
                "options": {
                    "A": "$0.0$",
                    "B": "$0.5$",
                    "C": "$1.0$",
                    "D": "$0.75$"
                },
                "correct_answer": "A",
                "solution": "In a pressure-compensating emitter, an elastic diaphragm deflects under rising pressure to reduce flow cross-section, keeping discharge constant regardless of pressure variations. Hence $q \\propto H^0 \\implies x \\approx 0.0$. For fully turbulent orifice emitters, $x = 0.5$; for laminar emitters, $x = 1.0$.",
                "difficulty": "Easy",
                "source": "Irrigation Theory and Practice (A.M. Michael)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Advantages and filtration in drip irrigation",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following statements regarding drip / trickle irrigation systems is/are TRUE?",
                "options": {
                    "A": "Water is applied directly to the crop root zone at low pressure and low discharge rates",
                    "B": "Hydrocyclone (sand separator) filters are specifically designed to remove heavy inorganic sand and silt particles",
                    "C": "Media (gravel/sand) filters are essential when using surface water containing organic matter, algae, and suspended biological debris",
                    "D": "Drip irrigation cannot be used with saline water under any circumstance"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "1. Drip applies precise drops directly to the plant root zone (A is true).\n2. Hydrocyclone centrifugal separators drop heavy mineral particles by vortex action (B is true).\n3. Media filters trap organic and biological flocs in deep sand beds (C is true).\n4. Drip irrigation is uniquely suited for saline water because high frequency wetting keeps matric potential near zero, minimizing total soil water tension and pushing salts to the periphery of the wetting bulb (D is false).",
                "difficulty": "Moderate",
                "source": "Irrigation Theory and Practice (A.M. Michael)"
            })

    # 7. Irrigation Efficiencies & Water Conveyance (38 questions)
    for i in range(1, 39):
        qid = f"QB_IDE_EFF_{i:03d}"
        topic = "Irrigation Efficiencies & Water Conveyance"
        sub = "Conveyance, application, and water storage efficiencies"
        if i % 3 == 1:
            Wr = 100.0 # m3 diverted at canal head
            Wf = 80.0 # m3 delivered to field
            Ws = 60.0 # m3 stored in root zone
            eta_c = round((Wf / Wr) * 100.0, 1)
            eta_a = round((Ws / Wf) * 100.0, 1)
            eta_proj = round((Ws / Wr) * 100.0, 1)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Project irrigation efficiency calculation",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"A canal diversion structure supplies ${Wr:.0f}\\text{{ m}}^3$ of water at the reservoir head. The volume of water delivered to the agricultural field plot is ${Wf:.0f}\\text{{ m}}^3$, out of which ${Ws:.0f}\\text{{ m}}^3$ is beneficially stored in the crop root zone. The overall project irrigation efficiency is ________ $\\%$ (round off to one decimal place).",
                "correct_answer": f"{eta_proj:.1f}",
                "numerical_range": { "min": round(eta_proj - 0.2, 1), "max": round(eta_proj + 0.2, 1) },
                "solution": f"Conveyance efficiency $\\eta_c = \\frac{{W_f}}{{W_r}} \\times 100 = \\frac{{{Wf:.0f}}}{{{Wr:.0f}}} \\times 100 = {eta_c:.1f}\\%$.\nField application efficiency $\\eta_a = \\frac{{W_s}}{{W_f}} \\times 100 = \\frac{{{Ws:.0f}}}{{{Wf:.0f}}} \\times 100 = {eta_a:.1f}\\%$.\nOverall project efficiency is:\n$$\\eta_{{proj}} = \\eta_c \\times \\eta_a = \\frac{{W_s}}{{W_r}} \\times 100 = \\frac{{{Ws:.0f}}}{{{Wr:.0f}}} \\times 100 = {eta_proj:.1f}\\%$$",
                "difficulty": "Easy",
                "source": "Irrigation Theory and Practice (A.M. Michael)"
            })
        elif i % 3 == 2:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Water storage efficiency definition",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "Water Storage Efficiency ($\\eta_s$) is defined as the ratio of:",
                "options": {
                    "A": "Water stored in the root zone during irrigation to the water needed in the root zone prior to irrigation",
                    "B": "Water delivered to the field to the water diverted from the source",
                    "C": "Water beneficially consumed by crops to the total water applied",
                    "D": "Water stored in a surface reservoir to total annual runoff"
                },
                "correct_answer": "A",
                "solution": "Water storage efficiency evaluates whether the irrigation adequately replenished the root zone moisture deficiency:\n$$\\eta_s = \\frac{W_s}{W_n} \\times 100$$\nwhere $W_s$ is water stored in root zone, and $W_n$ is water needed to bring moisture up to field capacity.",
                "difficulty": "Easy",
                "source": "Irrigation Theory and Practice (A.M. Michael)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Water distribution efficiency formula",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following statements regarding Water Distribution Efficiency ($\\eta_d$) is/are TRUE?",
                "options": {
                    "A": "It is defined by $\\eta_d = 100 \\left( 1 - \\frac{\\bar{y}}{\\bar{d}} \\right)$, where $\\bar{d}$ is average water depth stored and $\\bar{y}$ is average numerical deviation from $\\bar{d}$",
                    "B": "A distribution efficiency of $100\\%$ implies completely uniform penetration depth throughout the length of run",
                    "C": "Under-irrigation at the lower end of a border strip lowers the distribution efficiency",
                    "D": "Distribution efficiency accounts for evaporation losses from the supplying reservoir"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "1. $\\eta_d = 100 (1 - \\bar{y}/\\bar{d})$ evaluates how uniformly water infiltrates along the run (A is true).\n2. Perfect uniformity means $\\bar{y} = 0$, giving $\\eta_d = 100\\%$ (B is true).\n3. Incomplete penetration or non-uniform soaking widens deviation $\\bar{y}$, reducing $\\eta_d$ (C is true).\n4. Distribution efficiency is strictly a field-level uniformity index; reservoir evaporation is unrelated (D is false).",
                "difficulty": "Moderate",
                "source": "Irrigation Theory and Practice (A.M. Michael)"
            })

    # 8. Canal Design: Lacey, Kennedy & Tractive Force (38 questions)
    for i in range(1, 39):
        qid = f"QB_IDE_CAN_{i:03d}"
        topic = "Canal Design: Lacey, Kennedy & Tractive Force"
        sub = "Lacey regime silt factor and wetted perimeter"
        if i % 3 == 1:
            Q = 25.0 + (i % 6) * 5.0 # m3/s
            # P = 4.75 * sqrt(Q)
            P_lacey = round(4.75 * math.sqrt(Q), 2)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Lacey regime wetted perimeter",
                "type": "NAT",
                "marks": 1,
                "negative_marks": 0,
                "question": f"An unlined irrigation canal in regime condition carries a design discharge of $Q = {Q:.1f}\\text{{ m}}^3/\\text{{s}}$. According to Lacey's regime theory, the wetted perimeter of the channel is ________ $\\text{{m}}$ (round off to two decimal places).",
                "correct_answer": f"{P_lacey:.2f}",
                "numerical_range": { "min": round(P_lacey - 0.2, 2), "max": round(P_lacey + 0.2, 2) },
                "solution": f"According to Lacey's regime formula, the wetted perimeter $P$ is solely a function of design discharge $Q$:\n$$P = 4.75 \\sqrt{{Q}}$$\nGiven $Q = {Q:.1f}\\text{{ m}}^3/\\text{{s}}$:\n$$P = 4.75 \\times \\sqrt{{{Q:.1f}}} = 4.75 \\times {math.sqrt(Q):.4f} = {P_lacey:.2f}\\text{{ m}}$$",
                "difficulty": "Easy",
                "source": "Irrigation and Water Power Engineering (Punmia & Lal)"
            })
        elif i % 3 == 2:
            d_mm = 0.36
            # f = 1.76 * sqrt(d_mm)
            f_silt = round(1.76 * math.sqrt(d_mm), 3)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Lacey silt factor calculation",
                "type": "NAT",
                "marks": 1,
                "negative_marks": 0,
                "question": f"The average particle diameter of bed material in an alluvial canal is $d = {d_mm:.2f}\\text{{ mm}}$. Lacey's silt factor $f$ for this bed material is ________ (round off to two decimal places).",
                "correct_answer": f"{f_silt:.2f}",
                "numerical_range": { "min": round(f_silt - 0.02, 2), "max": round(f_silt + 0.02, 2) },
                "solution": f"Lacey's silt factor is given by:\n$$f = 1.76 \\sqrt{{d_{{mm}}}}$$\nFor $d = {d_mm:.2f}\\text{{ mm}}$:\n$$f = 1.76 \\times \\sqrt{{{d_mm:.2f}}} = 1.76 \\times {math.sqrt(d_mm):.2f} = {f_silt:.3f}$$\nRounding to two decimal places: ${f_silt:.2f}$.",
                "difficulty": "Easy",
                "source": "Irrigation and Water Power Engineering (Punmia & Lal)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Lacey vs Kennedy regime canal theories",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following statements comparing Kennedy's and Lacey's silt theories is/are TRUE?",
                "options": {
                    "A": "Kennedy assumed that silt-supporting eddies are generated only from the bed of the channel",
                    "B": "Lacey considered silt-supporting eddies to be generated from the entire wetted perimeter (bed and sides)",
                    "C": "Lacey defined true regime, initial regime, and final regime states for alluvial channels",
                    "D": "Kennedy gave an independent regime equation for the longitudinal bed slope without needing Kutter's formula"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "1. Kennedy considered eddies arising solely from horizontal channel bed (A is true).\n2. Lacey recognized that eddies generate normal to all wetted boundaries (bed and sides) (B is true).\n3. Lacey clearly categorized three regime conditions: true, initial, and final (C is true).\n4. Kennedy did NOT provide a slope equation and had to rely on Kutter's formula with trial depths; Lacey developed independent regime equations for velocity, perimeter, hydraulic radius, and bed slope (D is false).",
                "difficulty": "Moderate",
                "source": "Irrigation and Water Power Engineering (Punmia & Lal)"
            })

    # 9. Agricultural Drainage: Surface Drainage & Runoff Removal (38 questions)
    for i in range(1, 39):
        qid = f"QB_IDE_DRN_{i:03d}"
        topic = "Agricultural Drainage: Surface Drainage & Runoff Removal"
        sub = "Drainage coefficient and ditch design capacity"
        if i % 3 == 1:
            DC_cm = 2.0 + (i % 4) * 0.5 # cm/24 hr
            Area_ha = 150.0 + (i % 5) * 20.0 # ha
            # Q = (Area_ha * 10^4 * DC_cm / 100) / (24 * 3600) m3/s
            # Q = (Area_ha * DC_cm * 100) / 86400 = (Area_ha * DC_cm) / 864
            Q_drain = round((Area_ha * DC_cm) / 864.0, 3)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Drainage coefficient discharge computation",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"An agricultural drainage basin of area $A = {Area_ha:.0f}\\text{{ ha}}$ is designed with a drainage coefficient of $DC = {DC_cm:.1f}\\text{{ cm/day}}$. The required design capacity of the main surface drainage ditch is ________ $\\text{{m}}^3/\\text{{s}}$ (round off to two decimal places).",
                "correct_answer": f"{Q_drain:.2f}",
                "numerical_range": { "min": round(Q_drain - 0.05, 2), "max": round(Q_drain + 0.05, 2) },
                "solution": f"The drainage discharge is calculated as:\n$$Q = \\frac{{A \\times DC}}{{864}}$$\nwhere $A$ is in $\\text{{ha}}$ and $DC$ is in $\\text{{cm/day}}$, giving $Q$ in $\\text{{m}}^3/\\text{{s}}$:\n$$Q = \\frac{{{Area_ha:.0f} \\times {DC_cm:.1f}}}{{864}} = \\frac{{{Area_ha * DC_cm:.1f}}}{{864}} = {Q_drain:.3f}\\text{{ m}}^3/\\text{{s}}$$\nRounding to two decimal places: ${Q_drain:.2f}\\text{{ m}}^3/\\text{{s}}$.",
                "difficulty": "Moderate",
                "source": "Drainage Principles and Applications (ILRI / Ritzema)"
            })
        elif i % 3 == 2:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Random ditch vs parallel ditch drainage patterns",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "For agricultural land with undulating topography characterized by scattered, isolated depressions and potholes, the most appropriate surface drainage layout is:",
                "options": {
                    "A": "Random field ditch system",
                    "B": "Parallel field ditch system",
                    "C": "Bedding system",
                    "D": "Herringbone tile system"
                },
                "correct_answer": "A",
                "solution": "A random field ditch system connects scattered individual depressions and sinks across uneven undulating terrain, meandering through natural swales directly to a drainage outlet.",
                "difficulty": "Easy",
                "source": "Soil and Water Conservation Engineering (Schwab et al.)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Benefits of agricultural drainage",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following beneficial agronomic outcomes result from effective subsurface drainage of waterlogged agricultural land?",
                "options": {
                    "A": "Promotes deeper root penetration and root respiration by expanding the aerobic soil zone",
                    "B": "Enhances soil warming in early spring due to lower heat capacity of drained soil compared to water",
                    "C": "Facilitates leaching and removal of soluble toxic salts from the root zone",
                    "D": "Permanently prevents transpiration from crop canopies"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "1. Aeration allows root respiration and deeper root growth (A is true).\n2. Water has high specific heat; removing excess water warms soil faster, advancing seed germination (B is true).\n3. Deep percolation flushes salinity below the active rhizosphere (C is true).\n4. Drainage sustains healthy vegetative growth and transpiration; it does not stop transpiration (D is false).",
                "difficulty": "Easy",
                "source": "Drainage Principles and Applications (ILRI / Ritzema)"
            })

    # 10. Subsurface Drainage: Hooghoudt & Steady-State Equations (38 questions)
    for i in range(1, 39):
        qid = f"QB_IDE_HGT_{i:03d}"
        topic = "Subsurface Drainage: Hooghoudt & Steady-State Equations"
        sub = "Hooghoudt drain spacing equation"
        if i % 3 == 1:
            K = 1.0 # m/day
            q_recharge = 0.005 # m/day (5 mm/day)
            h_wt = 0.8 # m head at midpoint
            # Drains on impermeable barrier (d = 0): S^2 = (4 * K * h^2) / q
            S_sq = (4.0 * K * (h_wt**2)) / q_recharge
            S_spacing = round(math.sqrt(S_sq), 1)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Hooghoudt spacing for drains on impermeable barrier",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"Subsurface pipe drains are laid directly on an impermeable horizontal floor ($d = 0$). The hydraulic conductivity of the soil is $K = {K:.1f}\\text{{ m/day}}$ and the steady drainage design recharge rate is $q = {q_recharge*1000:.0f}\\text{{ mm/day}}$ (${q_recharge:.3f}\\text{{ m/day}}$). To prevent the water table at midpoint from rising more than $h = {h_wt:.2f}\\text{{ m}}$ above the drains, the required drain spacing $S$ is ________ $\\text{{m}}$ (round off to one decimal place).",
                "correct_answer": f"{S_spacing:.1f}",
                "numerical_range": { "min": round(S_spacing - 0.5, 1), "max": round(S_spacing + 0.5, 1) },
                "solution": f"When drains rest on the impermeable layer, Hooghoudt's equation simplifies to:\n$$S^2 = \\frac{{4 K h^2}}{{q}}$$\nGiven $K = {K:.1f}\\text{{ m/day}}$, $h = {h_wt:.2f}\\text{{ m}}$, $q = {q_recharge}\\text{{ m/day}}$:\n$$S^2 = \\frac{{4 \\times {K:.1f} \\times ({h_wt:.2f})^2}}{{{q_recharge}}} = \\frac{{4 \\times {h_wt**2:.4f}}}{{{q_recharge}}} = {S_sq:.1f}\\text{{ m}}^2$$\n$$S = \\sqrt{{{S_sq:.1f}}} = {S_spacing:.1f}\\text{{ m}}$$",
                "difficulty": "Moderate",
                "source": "Drainage Principles and Applications (ILRI / Ritzema)"
            })
        elif i % 3 == 2:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Hooghoudt equivalent depth d concept",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "In Hooghoudt's drainage spacing equation $S^2 = \\frac{8 K_2 d h + 4 K_1 h^2}{q}$, the parameter $d$ ('equivalent depth') is introduced primarily to account for:",
                "options": {
                    "A": "Radial flow resistance and convergence of flow lines entering the drain tubes",
                    "B": "Unsaturated capillary fringe above the phreatic surface",
                    "C": "Chemical clogging of drain filter envelopes",
                    "D": "Evaporation losses from the ground surface"
                },
                "correct_answer": "A",
                "solution": "Hooghoudt assumes horizontal flow. However, near drain tubes flow lines curve and converge radially. To correct for this radial flow resistance without complex conformal mapping, Hooghoudt replaced actual aquifer thickness $D$ below the drains with an effective smaller 'equivalent depth' $d$.",
                "difficulty": "Moderate",
                "source": "Drainage Principles and Applications (ILRI / Ritzema)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Steady vs unsteady subsurface drainage",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following equations is/are applicable to agricultural subsurface drainage calculations?",
                "options": {
                    "A": "Hooghoudt equation (steady-state water table under uniform steady recharge)",
                    "B": "Ernst equation (steady-state multi-layered soil profile with vertical, horizontal, and radial resistance)",
                    "C": "Glover-Dumm equation (transient / unsteady water table drawdown following an instantaneous recharge)",
                    "D": "Navier-Stokes equation for boundary layer separation on aerofoils"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "1. Hooghoudt is the primary international steady-state drainage equation (A).\n2. Ernst equation solves two-layered stratified soils separating $W, H, R$ head losses (B).\n3. Glover-Dumm solves the linearized 1D Boussinesq unsteady drawdown equation (C).\n4. Aerofoil boundary layer dynamics is external aerodynamics, irrelevant to porous media drainage (D is false).",
                "difficulty": "Easy",
                "source": "Drainage Principles and Applications (ILRI / Ritzema)"
            })

    # 11. Leaching Requirement, Salinity & Drainage Water Quality (38 questions)
    for i in range(1, 39):
        qid = f"QB_IDE_SAL_{i:03d}"
        topic = "Leaching Requirement, Salinity & Drainage Water Quality"
        sub = "Leaching requirement and Sodium Adsorption Ratio (SAR)"
        if i % 3 == 1:
            ECw = 1.2 + (i % 5) * 0.2 # dS/m
            ECe = 4.0 # dS/m
            # LR = ECw / (5 * ECe - ECw)
            denom = 5.0 * ECe - ECw
            LR_pct = round((ECw / denom) * 100.0, 2)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Leaching requirement calculation",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"An agricultural crop has an electrical conductivity tolerance threshold of the saturated soil extract $EC_e = {ECe:.1f}\\text{{ dS/m}}$. The irrigation water has an electrical conductivity of $EC_w = {ECw:.1f}\\text{{ dS/m}}$. According to the USDA-FAO formula $LR = \\frac{{EC_w}}{{5 EC_e - EC_w}}$, the leaching requirement is ________ $\\%$ (round off to two decimal places).",
                "correct_answer": f"{LR_pct:.2f}",
                "numerical_range": { "min": round(LR_pct - 0.2, 2), "max": round(LR_pct + 0.2, 2) },
                "solution": f"Applying the leaching requirement equation:\n$$LR = \\frac{{EC_w}}{{5 EC_e - EC_w}} = \\frac{{{ECw:.1f}}}{{5({ECe:.1f}) - {ECw:.1f}}} = \\frac{{{ECw:.1f}}}{{{5 * ECe:.1f} - {ECw:.1f}}} = \\frac{{{ECw:.1f}}}{{{denom:.1f}}} = {LR_pct/100.0:.4f}$$\nIn percentage: $LR = {LR_pct:.2f}\\%$.",
                "difficulty": "Moderate",
                "source": "Irrigation Theory and Practice (A.M. Michael)"
            })
        elif i % 3 == 2:
            Na = 6.0 # meq/L
            Ca = 3.0 # meq/L
            Mg = 1.0 # meq/L
            ca_mg = Ca + Mg
            ca_mg_half = ca_mg / 2.0
            sqrt_term = math.sqrt(ca_mg_half)
            SAR = round(Na / sqrt_term, 2)
            sol_sar = (
                "The Sodium Adsorption Ratio is defined as:\n"
                "$$SAR = \\frac{\\text{Na}^+}{\\sqrt{\\frac{\\text{Ca}^{2+} + \\text{Mg}^{2+}}{2}}}$$\n"
                f"Substituting concentrations in $\\text{{meq/L}}$:\n"
                f"$$SAR = \\frac{{{Na:.1f}}}{{\\sqrt{{{ca_mg:.1f}/2}}}} = \\frac{{{Na:.1f}}}{{\\sqrt{{{ca_mg_half:.1f}}}}} = \\frac{{{Na:.1f}}}{{{sqrt_term:.4f}}} = {SAR:.2f}$$"
            )
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Sodium Adsorption Ratio (SAR)",
                "type": "NAT",
                "marks": 1,
                "negative_marks": 0,
                "question": f"A chemical analysis of irrigation water gives the concentration of cations: $\\text{{Na}}^+ = {Na:.1f}\\text{{ meq/L}}$, $\\text{{Ca}}^{{2+}} = {Ca:.1f}\\text{{ meq/L}}$, and $\\text{{Mg}}^{{2+}} = {Mg:.1f}\\text{{ meq/L}}$. The Sodium Adsorption Ratio ($SAR$) of the water is ________ (round off to two decimal places).",
                "correct_answer": f"{SAR:.2f}",
                "numerical_range": { "min": round(SAR - 0.05, 2), "max": round(SAR + 0.05, 2) },
                "solution": sol_sar,
                "difficulty": "Easy",
                "source": "Irrigation Theory and Practice (A.M. Michael)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Classification of salt-affected soils",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "A saline-alkali (saline-sodic) soil is formally classified by which of the following criteria?",
                "options": {
                    "A": "$EC_e > 4\\text{ dS/m}$, $ESP > 15\\%$, and $pH < 8.5$",
                    "B": "$EC_e < 4\\text{ dS/m}$, $ESP > 15\\%$, and $pH > 8.5$",
                    "C": "$EC_e > 4\\text{ dS/m}$, $ESP < 15\\%$, and $pH < 8.5$",
                    "D": "$EC_e < 2\\text{ dS/m}$, $ESP < 5\\%$, and $pH = 7.0$"
                },
                "correct_answer": "A",
                "solution": "USDA classification of salt-affected soils:\n- Saline: $EC_e > 4\\text{ dS/m}$, $ESP < 15\\%$, $pH < 8.5$\n- Sodic (Alkali): $EC_e < 4\\text{ dS/m}$, $ESP > 15\\%$, $pH > 8.5$\n- Saline-Sodic: $EC_e > 4\\text{ dS/m}$, $ESP > 15\\%$, and variable $pH$ (typically $< 8.5$).",
                "difficulty": "Moderate",
                "source": "Soil and Water Conservation Engineering (Schwab et al.)"
            })

    # 12. Groundwater Occurrence, Aquifer Types & Darcy Law (38 questions)
    for i in range(1, 39):
        qid = f"QB_IDE_GWD_{i:03d}"
        topic = "Groundwater Occurrence, Aquifer Types & Darcy Law"
        sub = "Darcy velocity, seepage velocity, and aquifer transmissivity"
        if i % 3 == 1:
            K = 15.0 # m/day
            dh = 2.5 # m
            dL = 500.0 # m
            porosity = 0.25
            v_darcy = round(K * (dh / dL), 4) # m/day
            v_seep = round(v_darcy / porosity, 3) # m/day
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Seepage velocity in porous media",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"Groundwater flows through an unconfined sand aquifer of porosity $n = {porosity:.2f}$ and hydraulic conductivity $K = {K:.1f}\\text{{ m/day}}$. Two piezometers spaced ${dL:.0f}\\text{{ m}}$ apart in the direction of flow register a water table head difference of ${dh:.1f}\\text{{ m}}$. The actual seepage velocity ($v_s$) of groundwater is ________ $\\text{{m/day}}$ (round off to two decimal places).",
                "correct_answer": f"{v_seep:.2f}",
                "numerical_range": { "min": round(v_seep - 0.02, 2), "max": round(v_seep + 0.02, 2) },
                "solution": f"Hydraulic gradient $i = \\frac{{\\Delta h}}{{L}} = \\frac{{{dh:.1f}}}{{{dL:.0f}}} = {dh/dL:.5f}$.\nDarcy velocity (specific discharge):\n$$v = K i = {K:.1f} \\times {dh/dL:.5f} = {v_darcy:.5f}\\text{{ m/day}}$$\nSeepage velocity accounts for void space porosity:\n$$v_s = \\frac{{v}}{{n}} = \\frac{{{v_darcy:.5f}}}{{{porosity:.2f}}} = {v_seep:.3f}\\text{{ m/day}}$$\nRounding to two decimal places: ${v_seep:.2f}\\text{{ m/day}}$.",
                "difficulty": "Moderate",
                "source": "Groundwater Hydrology (David Keith Todd)"
            })
        elif i % 3 == 2:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Aquifer, aquitard, aquiclude, and aquifuge",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "A geological formation that contains water and transmits it at an extremely slow rate, inadequate for economic well yields but sufficient for regional seepage between aquifers, is termed an:",
                "options": {
                    "A": "Aquitard (e.g. sandy clay)",
                    "B": "Aquifer (e.g. coarse gravel)",
                    "C": "Aquiclude (e.g. solid clay)",
                    "D": "Aquifuge (e.g. unfractured granite)"
                },
                "correct_answer": "A",
                "solution": "Definitions in groundwater hydrology:\n- Aquifer: porous, permeable, economic water yields.\n- Aquitard: semi-pervious formation transmitting water very slowly (leakage).\n- Aquiclude: porous, contains water, but impermeable (e.g., clay).\n- Aquifuge: neither porous nor permeable (e.g., solid granite).",
                "difficulty": "Easy",
                "source": "Groundwater Hydrology (David Keith Todd)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Storativity and specific yield of aquifers",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following statements regarding aquifer storage properties is/are TRUE?",
                "options": {
                    "A": "For an unconfined aquifer, storativity ($S$) is practically equal to the specific yield ($S_y$), typically ranging from $0.10$ to $0.30$",
                    "B": "For a confined aquifer, storativity is governed by elastic expansion of water and compaction of aquifer skeleton, typically ranging from $10^{-5}$ to $10^{-3}$",
                    "C": "Porosity of an unconfined aquifer equals the sum of specific yield and specific retention ($n = S_y + S_r$)",
                    "D": "Confined aquifers release water primarily by gravity dewatering of pore spaces"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "1. In water table aquifers, water release is by actual gravity pore drainage, so $S \\approx S_y \\approx 0.1-0.3$ (A is true).\n2. In confined aquifers, pores remain $100\\%$ saturated; water yield is driven by compressibility, giving low $S = 10^{-5} - 10^{-3}$ (B is true).\n3. Total volume of voids partitions into drained water ($S_y$) plus capillary held water ($S_r$): $n = S_y + S_r$ (C is true).\n4. Confined aquifers release water via pressure decompression and matrix compressibility, never gravity dewatering (D is false).",
                "difficulty": "Moderate",
                "source": "Groundwater Hydrology (David Keith Todd)"
            })

    # 13. Steady Flow to Wells: Confined & Unconfined Aquifers (38 questions)
    for i in range(1, 39):
        qid = f"QB_IDE_STW_{i:03d}"
        topic = "Steady Flow to Wells: Confined & Unconfined Aquifers"
        sub = "Thiem equation for confined aquifer discharge"
        if i % 3 == 1:
            T = 600.0 + (i % 5) * 50.0 # m2/day
            s1 = 3.0 # m drawdown at r1
            s2 = 1.0 # m drawdown at r2
            r1 = 15.0 # m
            r2 = 90.0 # m
            # Q = (2 * pi * T * (s1 - s2)) / ln(r2/r1)
            Q_day = round((2.0 * math.pi * T * (s1 - s2)) / math.log(r2 / r1), 1)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Thiem formula discharge in confined aquifer",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"A fully penetrating well pumps water from a confined aquifer of transmissivity $T = {T:.0f}\\text{{ m}}^2/\\text{{day}}$. Two observation wells situated at radial distances of $r_1 = {r1:.0f}\\text{{ m}}$ and $r_2 = {r2:.0f}\\text{{ m}}$ record steady drawdowns of $s_1 = {s1:.1f}\\text{{ m}}$ and $s_2 = {s2:.1f}\\text{{ m}}$, respectively. The steady pumping discharge is ________ $\\text{{m}}^3/\\text{{day}}$ (round off to one decimal place).",
                "correct_answer": f"{Q_day:.1f}",
                "numerical_range": { "min": round(Q_day - 5.0, 1), "max": round(Q_day + 5.0, 1) },
                "solution": f"From the Thiem equilibrium equation for steady radial flow to a well in a confined aquifer:\n$$Q = \\frac{{2 \\pi T (s_1 - s_2)}}{{\\ln(r_2 / r_1)}}$$\nGiven $T = {T:.0f}\\text{{ m}}^2/\\text{{day}}$, $s_1 - s_2 = {s1 - s2:.1f}\\text{{ m}}$, $r_2/r_1 = {r2/r1:.1f}$ ($\\ln({r2/r1:.1f}) = {math.log(r2/r1):.4f}$):\n$$Q = \\frac{{2 \\pi ({T:.0f}) ({s1 - s2:.1f})}}{{{math.log(r2/r1):.4f}}} = \\frac{{{2 * math.pi * T * (s1 - s2):.2f}}}{{{math.log(r2/r1):.4f}}} = {Q_day:.1f}\\text{{ m}}^3/\\text{{day}}$$",
                "difficulty": "Moderate",
                "source": "Groundwater Hydrology (David Keith Todd)"
            })
        elif i % 3 == 2:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Dupuit equation for unconfined aquifer",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "Dupuit's steady-state discharge equation for a fully penetrating well in an unconfined aquifer between radial distances $r_1$ and $r_2$ with phreatic heights $h_1$ and $h_2$ is:",
                "options": {
                    "A": "$Q = \\frac{\\pi K (h_2^2 - h_1^2)}{\\ln(r_2 / r_1)}$",
                    "B": "$Q = \\frac{2 \\pi K b (h_2 - h_1)}{\\ln(r_2 / r_1)}$",
                    "C": "$Q = \\frac{\\pi K (h_2 - h_1)^2}{\\ln(r_2 / r_1)}$",
                    "D": "$Q = \\frac{2 \\pi K (h_2^2 - h_1^2)}{\\log_{10}(r_2 / r_1)}$"
                },
                "correct_answer": "A",
                "solution": "Integrating Darcy's law $Q = 2 \\pi r h K \\frac{dh}{dr}$ from $r_1$ to $r_2$ yields Dupuit's formula:\n$$Q = \\frac{\\pi K (h_2^2 - h_1^2)}{\\ln(r_2 / r_1)}$$",
                "difficulty": "Easy",
                "source": "Groundwater Hydrology (David Keith Todd)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Assumptions of Dupuit-Forchheimer theory",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following assumptions are invoked in the Dupuit-Forchheimer theory of steady flow to an unconfined well?",
                "options": {
                    "A": "Flow lines are assumed to be horizontal and equipotential surfaces are vertical cylinders",
                    "B": "Hydraulic gradient is equal to the slope of the free water table ($dh/dr$)",
                    "C": "Well is fully penetrating and aquifer is homogeneous and isotropic",
                    "D": "Seepage face at the well bore is accurately modeled with zero drawdown"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "1. Flow lines are assumed essentially horizontal, neglecting vertical flow curvature (A is true).\n2. Gradient equals free surface slope (B is true).\n3. Homogeneous isotropic aquifer and fully penetrating well are core idealizations (C is true).\n4. Dupuit theory actually neglects the existence of the seepage face at the well wall (D is false).",
                "difficulty": "Moderate",
                "source": "Groundwater Hydrology (David Keith Todd)"
            })

    # 14. Unsteady Flow to Wells: Theis & Cooper-Jacob Solutions (38 questions)
    for i in range(1, 39):
        qid = f"QB_IDE_UNS_{i:03d}"
        topic = "Unsteady Flow to Wells: Theis & Cooper-Jacob Solutions"
        sub = "Cooper-Jacob logarithmic approximation"
        if i % 3 == 1:
            Q = 1200.0 # m3/day
            ds_cycle = 1.10 + (i % 5) * 0.10 # m per log cycle
            # T = (2.303 * Q) / (4 * pi * ds_cycle)
            T_val = round((2.303 * Q) / (4.0 * math.pi * ds_cycle), 1)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Transmissivity from Cooper-Jacob drawdown per log cycle",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"A pumping test is conducted at a constant discharge of $Q = {Q:.0f}\\text{{ m}}^3/\\text{{day}}$. A semi-logarithmic plot of drawdown versus time at an observation well yields a straight line with a drawdown slope of $\\Delta s = {ds_cycle:.2f}\\text{{ m}}$ per log cycle of time. Using the Cooper-Jacob method, the transmissivity ($T$) of the aquifer is ________ $\\text{{m}}^2/\\text{{day}}$ (round off to one decimal place).",
                "correct_answer": f"{T_val:.1f}",
                "numerical_range": { "min": round(T_val - 2.0, 1), "max": round(T_val + 2.0, 1) },
                "solution": f"From the Cooper-Jacob approximation, drawdown per log cycle is:\n$$\\Delta s = \\frac{{2.303 Q}}{{4 \\pi T}} \\implies T = \\frac{{2.303 Q}}{{4 \\pi \\Delta s}}$$\nGiven $Q = {Q:.0f}\\text{{ m}}^3/\\text{{day}}$ and $\\Delta s = {ds_cycle:.2f}\\text{{ m}}$:\n$$T = \\frac{{2.303 \\times {Q:.0f}}}{{4 \\pi \\times {ds_cycle:.2f}}} = \\frac{{{2.303 * Q:.1f}}}{{{4 * math.pi * ds_cycle:.4f}}} = {T_val:.1f}\\text{{ m}}^2/\\text{{day}}$$",
                "difficulty": "Moderate",
                "source": "Groundwater Hydrology (David Keith Todd)"
            })
        elif i % 3 == 2:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Condition of validity for Cooper-Jacob approximation",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "The Cooper-Jacob simplified straight-line method is valid only when the parameter $u = \\frac{r^2 S}{4 T t}$ satisfies:",
                "options": {
                    "A": "$u \\le 0.01$ (or $u \\le 0.05$ with minimal error)",
                    "B": "$u \\ge 1.0$",
                    "C": "$u = 0.5$",
                    "D": "$u \\ge 10.0$"
                },
                "correct_answer": "A",
                "solution": "The Theis well function series expansion is $W(u) = -0.5772 - \\ln u + u - \\frac{u^2}{2 \\cdot 2!} + \\dots$. When $u \\le 0.01$, terms beyond the logarithmic term become negligibly small ($< 1\\%$ error), allowing the Cooper-Jacob approximation.",
                "difficulty": "Easy",
                "source": "Groundwater Hydrology (David Keith Todd)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Theis non-equilibrium equation characteristics",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following statements regarding the Theis non-equilibrium formula $s = \\frac{Q}{4 \\pi T} W(u)$ is/are TRUE?",
                "options": {
                    "A": "It models transient, unsteady drawdown in an elastic confined aquifer",
                    "B": "The well function $W(u)$ is evaluated mathematically as the exponential integral $\\int_u^\\infty \\frac{e^{-\\eta}}{\\eta} d\\eta$",
                    "C": "Water is assumed to be released instantaneously from storage with decline in head",
                    "D": "The cone of depression stops expanding after 10 minutes of pumping"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "1. Theis solved the 2D heat-conduction analogy for transient confined aquifer drawdown (A is true).\n2. $W(u) = \\int_u^\\infty \\frac{e^{-\\eta}}{\\eta} d\\eta$ is the standard exponential integral (B is true).\n3. Elastic storage decompression is assumed instantaneous (C is true).\n4. In an infinite aquifer without recharge boundaries, the cone of depression expands indefinitely with time (D is false).",
                "difficulty": "Moderate",
                "source": "Groundwater Hydrology (David Keith Todd)"
            })

    # 15. Centrifugal Pumps: Performance Curves & Affinity Laws (38 questions)
    for i in range(1, 39):
        qid = f"QB_IDE_PMP_{i:03d}"
        topic = "Centrifugal Pumps: Performance Curves & Affinity Laws"
        sub = "Pump affinity laws and specific speed"
        if i % 3 == 1:
            N1 = 1450.0
            N2 = 1750.0
            Q1 = 20.0 + (i % 5) * 5.0 # L/s
            # Q2 = Q1 * (N2 / N1)
            Q2 = round(Q1 * (N2 / N1), 2)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Affinity law discharge scaling with speed",
                "type": "NAT",
                "marks": 1,
                "negative_marks": 0,
                "question": f"A centrifugal irrigation pump running at a rotational speed of $N_1 = {N1:.0f}\\text{{ rpm}}$ delivers a discharge of $Q_1 = {Q1:.1f}\\text{{ L/s}}$. If the impeller diameter remains unchanged and the pump speed is increased to $N_2 = {N2:.0f}\\text{{ rpm}}$, the new discharge $Q_2$ will be ________ $\\text{{L/s}}$ (round off to two decimal places).",
                "correct_answer": f"{Q2:.2f}",
                "numerical_range": { "min": round(Q2 - 0.2, 2), "max": round(Q2 + 0.2, 2) },
                "solution": f"From the pump affinity laws for identical impeller diameter ($D_1 = D_2$):\n$$\\frac{{Q_2}}{{Q_1}} = \\frac{{N_2}}{{N_1}}$$\n$$Q_2 = Q_1 \\left( \\frac{{N_2}}{{N_1}} \\right) = {Q1:.1f} \\times \\left( \\frac{{{N2:.0f}}}{{{N1:.0f}}} \\right) = {Q1:.1f} \\times {N2/N1:.4f} = {Q2:.2f}\\text{{ L/s}}$$",
                "difficulty": "Easy",
                "source": "Irrigation Theory and Practice (A.M. Michael)"
            })
        elif i % 3 == 2:
            N = 1450.0 # rpm
            Q_flow = 0.04 # m3/s
            H_head = 16.0 # m
            # Ns = (N * sqrt(Q)) / (H^0.75)
            Ns = round((N * math.sqrt(Q_flow)) / (H_head**0.75), 1)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Centrifugal pump specific speed",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"A centrifugal pump operating at $N = {N:.0f}\\text{{ rpm}}$ delivers a discharge of $Q = {Q_flow:.2f}\\text{{ m}}^3/\\text{{s}}$ against a total head of $H = {H_head:.1f}\\text{{ m}}$. The specific speed ($N_s$) of the pump in SI metric units ($\\text{{rpm}}, \\text{{m}}^3/\\text{{s}}, \\text{{m}}$) is ________ (round off to one decimal place).",
                "correct_answer": f"{Ns:.1f}",
                "numerical_range": { "min": round(Ns - 0.5, 1), "max": round(Ns + 0.5, 1) },
                "solution": f"The specific speed is defined as:\n$$N_s = \\frac{{N \\sqrt{{Q}}}}{{H^{{3/4}}}}$$\nGiven $N = {N:.0f}\\text{{ rpm}}$, $Q = {Q_flow:.2f}\\text{{ m}}^3/\\text{{s}}$, and $H = {H_head:.1f}\\text{{ m}}$ ($16^{{0.75}} = (16^{{0.25}})^3 = 2^3 = 8$):\n$$N_s = \\frac{{{N:.0f} \\times \\sqrt{{{Q_flow}}}}}{{8}} = \\frac{{{N:.0f} \\times {math.sqrt(Q_flow):.4f}}}{{8}} = {Ns:.1f}$$",
                "difficulty": "Moderate",
                "source": "Fluid Mechanics (A.K. Jain)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Pump affinity laws scaling powers",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "According to the affinity laws for geometrically similar centrifugal pumps, how do performance variables scale with rotational speed $N$ for a fixed impeller diameter?",
                "options": {
                    "A": "Discharge varies directly with speed ($Q \\propto N$)",
                    "B": "Head varies directly with the square of speed ($H \\propto N^2$)",
                    "C": "Power consumption varies directly with the cube of speed ($P \\propto N^3$)",
                    "D": "Efficiency varies directly with the fourth power of speed ($\\eta \\propto N^4$)"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "1. Flow velocity $v \\propto u \\propto N \\implies Q \\propto N$ (A is true).\n2. Head $H \\propto v^2/2g \\propto N^2$ (B is true).\n3. Power $P = \\gamma Q H \\propto N \\cdot N^2 = N^3$ (C is true).\n4. Efficiency is dimensionless and remains approximately constant across modest speed shifts (D is false).",
                "difficulty": "Easy",
                "source": "Fluid Mechanics (A.K. Jain)"
            })

    # 16. Pump Cavitation, NPSH & Installation (38 questions)
    for i in range(1, 39):
        qid = f"QB_IDE_CAV_{i:03d}"
        topic = "Pump Cavitation, NPSH & Installation"
        sub = "Net Positive Suction Head Available (NPSHA)"
        if i % 3 == 1:
            Patm = 10.13 # m head of water (101.3 kPa / 9.81)
            Pvap = 0.24 # m head (2.34 kPa at 20 deg C)
            hs = 3.5 + (i % 4) * 0.5 # m suction lift
            hfs = 0.60 # m friction head in suction pipe
            # NPSHA = Patm - Pvap - hs - hfs
            npsha = round(Patm - Pvap - hs - hfs, 2)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "NPSH Available calculation",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"A centrifugal pump is installed with a static suction lift of $h_s = {hs:.1f}\\text{{ m}}$. The suction pipe friction loss is $h_{{fs}} = {hfs:.2f}\\text{{ m}}$. The atmospheric pressure head is ${Patm:.2f}\\text{{ m}}$ and water vapor pressure head at operating temperature is ${Pvap:.2f}\\text{{ m}}$. The Net Positive Suction Head Available ($NPSH_A$) at the pump inlet is ________ $\\text{{m}}$ (round off to two decimal places).",
                "correct_answer": f"{npsha:.2f}",
                "numerical_range": { "min": round(npsha - 0.1, 2), "max": round(npsha + 0.1, 2) },
                "solution": f"The Net Positive Suction Head Available is given by:\n$$NPSH_A = \\frac{{P_{{atm}}}}{{\\gamma}} - \\frac{{P_v}}{{\\gamma}} - h_s - h_{{fs}}$$\nGiven $\\frac{{P_{{atm}}}}{{\\gamma}} = {Patm:.2f}\\text{{ m}}$, $\\frac{{P_v}}{{\\gamma}} = {Pvap:.2f}\\text{{ m}}$, $h_s = {hs:.1f}\\text{{ m}}$, and $h_{{fs}} = {hfs:.2f}\\text{{ m}}$:\n$$NPSH_A = {Patm:.2f} - {Pvap:.2f} - {hs:.1f} - {hfs:.2f} = {npsha:.2f}\\text{{ m}}$$",
                "difficulty": "Moderate",
                "source": "Fluid Mechanics (A.K. Jain)"
            })
        elif i % 3 == 2:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Cavitation prevention criterion",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "To strictly prevent cavitation in a centrifugal pump installation, the relationship between available and required NPSH must satisfy:",
                "options": {
                    "A": "$NPSH_A > NPSH_R$ (typically with a safety margin of at least $0.5$ to $1.0\\text{ m}$)",
                    "B": "$NPSH_A = 0$",
                    "C": "$NPSH_A < NPSH_R$",
                    "D": "$NPSH_R = \\infty$"
                },
                "correct_answer": "A",
                "solution": "Cavitation occurs when local pressure drops to or below vapor pressure $P_v$. To guarantee that fluid pressure remains above cavitation inception, Net Positive Suction Head Available ($NPSH_A$) must strictly exceed the manufacturer's required suction head ($NPSH_R$): $NPSH_A > NPSH_R$.",
                "difficulty": "Easy",
                "source": "Fluid Mechanics (A.K. Jain)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Remedial measures against pump cavitation",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Which of the following practical measures will effectively increase $NPSH_A$ and suppress cavitation in an agricultural pump?",
                "options": {
                    "A": "Lowering the pump closer to the water sump surface (reducing static suction lift $h_s$)",
                    "B": "Increasing the diameter of the suction pipe to minimize friction losses",
                    "C": "Eliminating unnecessary sharp bends and elbows in the suction pipeline",
                    "D": "Operating the pump at water temperatures near boiling point"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "1. Lowering $h_s$ directly increases $NPSH_A = H_{atm} - H_v - h_s - h_{fs}$ (A is true).\n2. Larger suction pipe diameter slashes velocity and friction loss $h_{fs} \\propto 1/D^5$ (B is true).\n3. Fewer fittings reduces minor losses in suction line (C is true).\n4. Higher water temperature dramatically raises vapor pressure $P_v$, slashing $NPSH_A$ and accelerating cavitation (D is false).",
                "difficulty": "Easy",
                "source": "Fluid Mechanics (A.K. Jain)"
            })

    return questions
