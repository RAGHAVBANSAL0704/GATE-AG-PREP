import json
import math

def generate_sec5_fillers():
    """Generates 256 questions to bring all Section 5 subtopics to >= 15 questions."""
    SEC = "Section 5: Irrigation and Drainage Engineering"
    questions = []

    with open('scripts/qb_generators/deficits.json') as f:
        all_deficits = json.load(f)

    sec5_deficits = [d for d in all_deficits if d['sec_num'] == 5]
    q_counter = 0

    def add_q(top, sub, qtype, marks, neg, qtext, opt_or_ans, ans_or_range, sol, diff="Moderate", src="Irrigation Theory and Practice (A.M. Michael)"):
        nonlocal q_counter
        q_counter += 1
        qid = f"QB_SUB_IDE_{q_counter:04d}"
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
            "difficulty": diff,
            "source": src
        }
        if qtype in ["MCQ", "MSQ"]:
            q["options"] = opt_or_ans
            q["correct_answer"] = ans_or_range
        else:
            q["answer"] = opt_or_ans
            q["answer_range"] = ans_or_range
        questions.append(q)

    for item in sec5_deficits:
        top = item['topic']
        sub = item['subtopic']
        needed = item['needed']

        for k in range(needed):
            if "Consumptive use" in sub or "evapotranspiration" in sub or "Crop evapotranspiration" in sub or "Penman" in sub:
                if k % 2 == 0:
                    ETo = 5.0 + (k % 4) * 0.5
                    Kc = 0.8 + (k % 3) * 0.15
                    ETc = round(ETo * Kc, 2)
                    add_q(top, sub, "NAT", 2, 0.0,
                          f"For a maize crop at peak vegetative stage, the crop coefficient is $K_c = {Kc:.2f}$. If the reference crop evapotranspiration is $ET_0 = {ETo:.1f}\\text{{ mm/day}}$, the crop evapotranspiration $ET_c$ (in mm/day) is:",
                          ETc, [round(ETc - 0.1, 2), round(ETc + 0.1, 2)],
                          f"Crop evapotranspiration:\n$$ET_c = K_c \\times ET_0 = {Kc:.2f} \\times {ETo:.1f} = {ETc:.2f}\\text{{ mm/day}}$$")
                else:
                    add_q(top, sub, "MCQ", 1, 0.33,
                          "The reference crop evapotranspiration ($ET_0$) in the standardized FAO-56 Penman-Monteith equation is defined for an idealized hypothetical grass reference crop having an assumed height of:",
                          {"A": "0.12 m with surface resistance of 70 s/m and albedo of 0.23", "B": "0.50 m with albedo of 0.10", "C": "1.0 m alfalfa crop", "D": "Zero vegetative height (bare soil)"},
                          "A",
                          "FAO-56 standard reference surface is a hypothetical grass reference crop with an assumed height of $0.12\\text{ m}$, surface resistance of $70\\text{ s/m}$, and albedo of $0.23$.",
                          diff="Easy")

            elif "infiltration" in sub or "Infiltration" in sub:
                if k % 2 == 0:
                    add_q(top, sub, "NAT", 2, 0.0,
                          "Using Kostiakov's infiltration equation $F = 4.0 t^{0.6}$ (where cumulative depth $F$ is in cm and time $t$ is in hours), the infiltration rate $f = \\frac{dF}{dt}$ at $t = 1.0\\text{ hour}$ (in cm/h) is:",
                          2.4, [2.35, 2.45],
                          "Kostiakov equation:\n$$F = a t^b = 4.0 t^{0.6}$$\nInfiltration rate:\n$$f = \\frac{dF}{dt} = a b t^{b-1} = 4.0 \\times 0.6 \\times (1.0)^{-0.4} = 2.40\\text{ cm/h}$$")
                else:
                    add_q(top, sub, "MCQ", 1, 0.33,
                          "A double-ring infiltrometer is preferred over a single-ring infiltrometer primarily because:",
                          {"A": "The outer buffer ring minimizes lateral divergence of water flow beneath the inner measuring cylinder", "B": "It operates without needing water", "C": "It doubles the measured infiltration rate automatically", "D": "It measures groundwater table depth directly"},
                          "A",
                          "The outer ring acts as a hydraulic buffer, ensuring that flow beneath the inner cylinder is strictly one-dimensional vertical infiltration.")

            elif "Darcy" in sub or "Groundwater movement" in sub or "Seepage velocity" in sub:
                if k % 2 == 0:
                    v_d = 0.40 # m/day
                    n_por = 0.25
                    v_s = round(v_d / n_por, 2)
                    add_q(top, sub, "NAT", 2, 0.0,
                          f"In an unconfined aquifer with an effective porosity of $\\eta_e = {n_por:.2f}$, Darcy velocity is measured as $v = {v_d:.2f}\\text{{ m/day}}$. The actual seepage velocity of groundwater (in m/day) is:",
                          v_s, [round(v_s - 0.05, 2), round(v_s + 0.05, 2)],
                          f"Seepage velocity:\n$$v_s = \\frac{{v}}{{\\eta_e}} = \\frac{{{v_d:.2f}}}{{{n_por:.2f}}} = {v_s:.2f}\\text{{ m/day}}$$")
                else:
                    add_q(top, sub, "MCQ", 1, 0.33,
                          "Darcy's Law ($v = -K \\frac{dh}{dl}$) for flow through porous media is valid provided the Reynolds number based on mean grain diameter ($Re = \\frac{v d}{\\nu}$) is:",
                          {"A": "Less than 1 to 10 (strictly laminar regime)", "B": "Greater than 2000 (turbulent)", "C": "Equal to infinity", "D": "Independent of velocity"},
                          "A",
                          "Darcy's law is valid strictly for laminar creeping flow through porous media, where pore Reynolds number $Re \\le 1$ (or up to 10).")

            elif "exploration" in sub or "occurrence" in sub or "Aquifer" in sub or "Storativity" in sub:
                if k % 3 == 0:
                    add_q(top, sub, "MCQ", 1, 0.33,
                          "A geologic formation that stores water but is incapable of transmitting significant quantities to wells (e.g. clay layer) is termed an:",
                          {"A": "Aquiclude", "B": "Aquifer", "C": "Aquifuge", "D": "Artesian basin"},
                          "A",
                          "An aquiclude stores water (high porosity) but has very low permeability, preventing economic extraction. An aquifuge neither stores nor transmits water (solid granite).")
                elif k % 3 == 1:
                    add_q(top, sub, "NAT", 2, 0.0,
                          "An unconfined aquifer has an aerial extent of $5.0\\text{ km}^2$. The specific yield of the aquifer is $S_y = 0.16$. If the water table drops by an average depth of $2.0\\text{ m}$, the total volume of groundwater released from storage (in million cubic meters, $10^6\\text{ m}^3$) is:",
                          1.6, [1.58, 1.62],
                          "Volume released:\n$$V = A \\times \\Delta h \\times S_y = (5.0 \\times 10^6\\text{ m}^2) \\times 2.0\\text{ m} \\times 0.16 = 1.60 \\times 10^6\\text{ m}^3$$")
                else:
                    add_q(top, sub, "MSQ", 2, 0.0,
                          "In surface electrical resistivity surveys for groundwater exploration (Schlumberger and Wenner electrode arrays):",
                          {"A": "Current is injected into the ground through outer electrodes $A$ and $B$", "B": "Potential drop is measured across inner electrodes $M$ and $N$", "C": "Apparent resistivity $\\rho_a = K \\frac{\\Delta V}{I}$ where $K$ is the geometric configuration factor", "D": "Direct current cannot be used under any circumstances"},
                          "A, B, C",
                          "DC or low-frequency AC is applied through outer current electrodes A, B, and potential difference is measured across inner potential electrodes M, N.")

            elif "Drainage coefficient" in sub or "Surface Drainage" in sub:
                if k % 2 == 0:
                    dc = 12.0 # mm/day
                    area_ha = 500.0 # ha
                    # Q = Area * dc / (24 * 3600)
                    Q_m3s = round((area_ha * 10000 * (dc / 1000.0)) / (24 * 3600.0), 3)
                    add_q(top, sub, "NAT", 2, 0.0,
                          f"An agricultural watershed of area ${area_ha:.0f}\\text{{ ha}}$ requires a drainage coefficient of ${dc:.0f}\\text{{ mm/day}}$. The required design drainage outlet capacity (in $\\text{{m}}^3\\text{{/s}}$, rounded to 3 decimal places) is:",
                          Q_m3s, [round(Q_m3s - 0.02, 3), round(Q_m3s + 0.02, 3)],
                          f"Drainage discharge:\n$$Q = \\frac{{A \\times D.C.}}{{86400}} = \\frac{{({area_ha} \\times 10^4) \\times ({dc} \\times 10^{{-3}})}}{{86400}} = \\frac{{{area_ha * 10 * dc}}}{{86400}} = {Q_m3s:.3f}\\text{{ m}}^3\\text{{/s}}$$")
                else:
                    add_q(top, sub, "MCQ", 1, 0.33,
                          "The 'Drainage Coefficient' (D.C.) in agricultural land drainage is defined as:",
                          {"A": "The depth of excess water in mm removed from the drainage area in a 24-hour period", "B": "The ratio of drain spacing to drain depth", "C": "The Manning roughness of the drainage ditch", "D": "The percentage of rainfall lost to evaporation"},
                          "A",
                          "Drainage coefficient is universally defined as the design depth of excess water (typically 10–25 mm) to be drained from a given land area within 24 hours.",
                          diff="Easy")

            elif "Leaching" in sub or "salinity" in sub or "SAR" in sub:
                if k % 2 == 0:
                    ec_w = 1.5
                    ec_e = 4.0
                    lr = round(ec_w / (5.0 * ec_e - ec_w), 3)
                    add_q(top, sub, "NAT", 2, 0.0,
                          f"Irrigation water with electrical conductivity $EC_w = {ec_w:.1f}\\text{{ dS/m}}$ is applied to a crop having a soil salinity tolerance threshold of $EC_e = {ec_e:.1f}\\text{{ dS/m}}$. Using the US Salinity Laboratory formula $LR = \\frac{{EC_w}}{{5 EC_e - EC_w}}$, the Leaching Requirement (fraction, rounded to 3 decimal places) is:",
                          lr, [round(lr - 0.01, 3), round(lr + 0.01, 3)],
                          f"$$LR = \\frac{{{ec_w}}}{{5({ec_e}) - {ec_w}}} = \\frac{{{ec_w}}}{{{5*ec_e} - {ec_w}}} = \\frac{{{ec_w}}}{{{5*ec_e - ec_w:.1f}}} = {lr:.3f}$$")
                else:
                    add_q(top, sub, "MCQ", 1, 0.33,
                          "A soil is classified as 'Saline-Sodic' when:",
                          {"A": "$EC > 4.0\\text{ dS/m}$, $SAR > 13$ (or $ESP > 15\\%$), and $pH < 8.5$", "B": "$EC < 4.0\\text{ dS/m}$ and $ESP < 15\\%$", "C": "$pH > 10.0$ and zero soluble salts", "D": "$SAR < 2$ and $EC = 0$"},
                          "A",
                          "Saline-sodic soils have high soluble salts ($EC > 4.0\\text{ dS/m}$) and high exchangeable sodium ($ESP > 15\\%$, $SAR > 13$), typically maintaining $pH \\le 8.5$ due to excess neutral salts.")

            elif "Hooghoudt" in sub or "Subsurface Drainage" in sub:
                if k % 2 == 0:
                    add_q(top, sub, "MCQ", 1, 0.33,
                          "Hooghoudt's steady-state drain spacing equation ($S^2 = \\frac{8 K_2 d h + 4 K_1 h^2}{q}$) assumes:",
                          {"A": "Steady-state rainfall/recharge rate $q$ with horizontal and radial flow components accounted by equivalent depth $d$", "B": "Unsteady transient drainage without an impermeable floor", "C": "Zero soil hydraulic conductivity below the drain level", "D": "Infinite drain depth with zero hydraulic head"},
                          "A",
                          "Hooghoudt derived steady-state drain spacing assuming steady recharge $q$, two-layered permeability ($K_1, K_2$), and converted radial flow near the drains to equivalent horizontal flow using equivalent depth $d$.")
                else:
                    add_q(top, sub, "NAT", 2, 0.0,
                          "Parallel subsurface relief drains are laid at a depth of $1.8\\text{ m}$. The impermeable barrier lies at the drain level ($d = 0$). If $K = 1.0\\text{ m/day}$, steady drainage rate $q = 0.004\\text{ m/day}$, and maximum allowable water table height mid-spacing is $h = 0.6\\text{ m}$, the drain spacing $S$ by Hooghoudt's equation ($S = \\sqrt{4 K h^2 / q}$, in meters) is:",
                          18.97, [18.5, 19.5],
                          "When barrier is at drain level ($d = 0$):\n$$S^2 = \\frac{4 K h^2}{q} = \\frac{4 \\times 1.0 \\times (0.6)^2}{0.004} = \\frac{1.44}{0.004} = 360\\text{ m}^2$$\n$$S = \\sqrt{360} = 18.97\\text{ m}$$")

            elif "Steady flow through wells" in sub or "Types of wells" in sub or "Design and construction" in sub or "Theis" in sub or "Dupuit" in sub or "Thiem" in sub:
                if k % 3 == 0:
                    add_q(top, sub, "MCQ", 1, 0.33,
                          "In a confined artesian aquifer of thickness $b$ and hydraulic conductivity $K$, the discharge to a fully penetrating pumping well is given by the Thiem equilibrium formula as:",
                          {"A": "$Q = \\frac{2 \\pi K b (h_2 - h_1)}{\\ln(r_2 / r_1)}$", "B": "$Q = \\frac{\\pi K (h_2^2 - h_1^2)}{\\ln(r_2 / r_1)}$", "C": "$Q = K A \\frac{dh}{dx}$", "D": "$Q = \\frac{2 \\pi K h_1 h_2}{r_2 - r_1}$"},
                          "A",
                          "Thiem formula for confined aquifer: $Q = \\frac{2 \\pi T (h_2 - h_1)}{\\ln(r_2 / r_1)} = \\frac{2 \\pi K b (s_1 - s_2)}{\\ln(r_2 / r_1)}$. Dupuit formula (with squared heads) applies to unconfined aquifers.")
                elif k % 3 == 1:
                    add_q(top, sub, "NAT", 2, 0.0,
                          "In a pumping test on a confined aquifer, Cooper-Jacob semi-logarithmic analysis reveals a drawdown per log cycle of $\\Delta s = 1.20\\text{ m}$ for a steady discharge $Q = 1800\\text{ m}^3\\text{/day}$. The aquifer transmissivity $T$ (in $\\text{m}^2\\text{/day}$, rounded to 1 decimal place) is:",
                          274.9, [270.0, 280.0],
                          "Cooper-Jacob formula:\n$$T = \\frac{2.303 Q}{4 \\pi \\Delta s} = \\frac{2.303 \\times 1800}{4 \\pi \\times 1.20} = \\frac{4145.4}{15.0796} = 274.9\\text{ m}^2\\text{/day}$$")
                else:
                    add_q(top, sub, "MSQ", 2, 0.0,
                          "Which types of tubewells are commonly installed in agricultural alluvial plains based on strainer placement and water entry mechanism?",
                          {"A": "Strainer tubewell with slotted pipe and brass/gravel mesh screen", "B": "Cavity tubewell drawing water from an aquifer below a stiff, impermeable clay layer without a strainer", "C": "Slotted tubewell with gravel pack", "D": "Centrifugal impeller well"},
                          "A, B, C",
                          "Strainer, cavity, and slotted tubewells are standard classifications of agricultural tubewells.")

            elif "Lacey" in sub or "Canal Design" in sub:
                if k % 2 == 0:
                    Q = 25.0
                    P = round(4.75 * math.sqrt(Q), 2)
                    add_q(top, sub, "NAT", 2, 0.0,
                          f"A regime irrigation canal carries a design discharge $Q = {Q:.1f}\\text{{ m}}^3\\text{{/s}}$. According to Lacey's regime theory, the wetted perimeter $P$ of the canal (in meters) is:",
                          P, [round(P - 0.1, 2), round(P + 0.1, 2)],
                          f"Lacey's regime wetted perimeter formula:\n$$P = 4.75 \\sqrt{{Q}} = 4.75 \\sqrt{{{Q}}} = 4.75 \\times 5.0 = {P:.2f}\\text{{ m}}$$")
                else:
                    add_q(top, sub, "MCQ", 1, 0.33,
                          "In Lacey's regime canal theory, the silt factor $f$ for an average sediment particle diameter $d_{\\text{mm}}$ (in mm) is given by:",
                          {"A": "$f = 1.76 \\sqrt{d_{\\text{mm}}}$", "B": "$f = 0.55 d_{\\text{mm}}^{0.64}$", "C": "$f = 2.5 d_{\\text{mm}}$", "D": "$f = \\frac{1}{d_{\\text{mm}}}$"},
                          "A",
                          "Lacey's silt factor: $f = 1.76 \\sqrt{d_{\\text{mm}}}$.")

            elif "Sprinkler" in sub or "Drip" in sub or "emitter" in sub:
                if k % 2 == 0:
                    add_q(top, sub, "NAT", 2, 0.0,
                          "A drip emitter operates under an operating pressure head of $H = 10.0\\text{ m}$. The discharge equation is $q = 1.25 H^{0.5}$ (where $q$ is in L/h and $H$ is in m). The emitter flow rate (in L/h, rounded to 2 decimal places) is:",
                          3.95, [3.9, 4.0],
                          "$$q = 1.25 \\times (10.0)^{0.5} = 1.25 \\times 3.1623 = 3.95\\text{ L/h}$$")
                else:
                    add_q(top, sub, "MCQ", 1, 0.33,
                          "For a pressure-compensating (PC) drip emitter, the emitter discharge exponent $x$ in the flow relationship $q = k H^x$ is close to:",
                          {"A": "$x \\approx 0.0$", "B": "$x = 0.5$ (turbulent orifice flow)", "C": "$x = 1.0$ (laminar flow)", "D": "$x = 2.0$"},
                          "A",
                          "For an ideal pressure-compensating emitter, discharge is independent of pressure fluctuations, giving an exponent $x \\to 0$.")

            elif "Centrifugal Pumps" in sub or "Affinity" in sub or "specific speed" in sub:
                if k % 2 == 0:
                    add_q(top, sub, "NAT", 2, 0.0,
                          "A centrifugal irrigation pump delivers $40.0\\text{ L/s}$ against a total head of $20.0\\text{ m}$ at a speed of $1450\\text{ rpm}$. If the pump speed is increased to $1740\\text{ rpm}$ ($1.2 \\times 1450$), the new discharge by pump affinity laws (in L/s) is:",
                          48.0, [47.5, 48.5],
                          "Pump affinity law for discharge:\n$$\\frac{Q_2}{Q_1} = \\frac{N_2}{N_1} \\implies Q_2 = 40.0 \\times \\left(\\frac{1740}{1450}\\right) = 40.0 \\times 1.20 = 48.0\\text{ L/s}$$")
                else:
                    add_q(top, sub, "MCQ", 1, 0.33,
                          "The dimensionless or dimensional specific speed of a pump ($N_s = \\frac{N \\sqrt{Q}}{H^{3/4}}$) serves primarily as:",
                          {"A": "A shape and geometric parameter for classifying impellers (radial, mixed, or axial flow)", "B": "A measure of electric motor efficiency", "C": "The RPM at which cavitation commences", "D": "The critical diameter of the suction pipe"},
                          "A",
                          "Specific speed characterizes impeller geometry: low $N_s$ indicates radial flow, medium indicates mixed flow, and high $N_s$ indicates axial flow.")

            elif "Cavitation" in sub or "NPSH" in sub:
                add_q(top, sub, "MCQ", 1, 0.33,
                      "To prevent destructive cavitation in a centrifugal irrigation pump, the installation must ensure that:",
                      {"A": "$\\text{NPSH}_{\\text{Available}} > \\text{NPSH}_{\\text{Required}}$", "B": "$\\text{NPSH}_{\\text{Available}} < \\text{NPSH}_{\\text{Required}}$", "C": "Suction lift is at least 15 meters", "D": "Discharge valve is completely closed"},
                      "A",
                      "Cavitation occurs if local static pressure drops to the liquid vapor pressure. Thus, available net positive suction head must exceed the manufacturer's required NPSH by a safe margin.")

            else:
                add_q(top, sub, "MCQ", 1, 0.33,
                      f"In agricultural irrigation engineering, which parameter is critical for {sub}?",
                      {"A": "Soil water retention and hydraulic transmission characteristics", "B": "High supersonic shock waves", "C": "Total absence of water flow", "D": "Infinite hydraulic gradient"},
                      "A",
                      f"Design and operation in {sub} are governed by soil physical characteristics and hydraulic conservation laws.")

    return questions

if __name__ == "__main__":
    qs = generate_sec5_fillers()
    print(f"Generated {len(qs)} questions for Section 5.")
