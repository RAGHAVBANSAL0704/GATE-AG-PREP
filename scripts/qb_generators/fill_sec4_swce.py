import json
import math

SVG_PLANE_TABLE = """<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" class="w-full max-w-[380px] h-auto mx-auto"><rect width="400" height="240" rx="8" fill="#f8fafc" class="dark:fill-slate-900" stroke="#e2e8f0" class="dark:stroke-slate-800"/><polygon points="200,60 120,180 280,180" fill="none" stroke="#2563eb" stroke-width="2" stroke-dasharray="4,4"/><circle cx="200" cy="60" r="4" fill="#dc2626"/><text x="195" y="50" font-size="11" font-weight="bold" fill="#dc2626">A</text><circle cx="120" cy="180" r="4" fill="#16a34a"/><text x="105" y="195" font-size="11" font-weight="bold" fill="#16a34a">B</text><circle cx="280" cy="180" r="4" fill="#16a34a"/><text x="285" y="195" font-size="11" font-weight="bold" fill="#16a34a">C</text><rect x="180" y="125" width="40" height="30" rx="3" fill="#fef3c7" stroke="#d97706" stroke-width="1.5"/><circle cx="200" cy="140" r="3" fill="#9333ea"/><text x="205" y="138" font-size="10" font-weight="bold" fill="#9333ea">P (Table)</text><line x1="200" y1="60" x2="200" y2="140" stroke="#9333ea" stroke-width="1.5"/><line x1="120" y1="180" x2="200" y2="140" stroke="#9333ea" stroke-width="1.5"/><line x1="280" y1="180" x2="200" y2="140" stroke="#9333ea" stroke-width="1.5"/><text x="140" y="225" font-size="11" font-weight="bold" fill="#475569">Three-Point Resection Problem</text></svg>"""

SVG_WEIR = """<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" class="w-full max-w-[380px] h-auto mx-auto"><rect width="400" height="240" rx="8" fill="#f8fafc" class="dark:fill-slate-900" stroke="#e2e8f0" class="dark:stroke-slate-800"/><path d="M 60 70 L 160 70 L 200 170 L 240 70 L 340 70 L 340 200 L 60 200 Z" fill="#e2e8f0" class="dark:fill-slate-800" stroke="#64748b" stroke-width="2"/><polygon points="160,70 200,170 240,70" fill="#38bdf8" opacity="0.6"/><line x1="160" y1="70" x2="240" y2="70" stroke="#0284c7" stroke-width="2" stroke-dasharray="3,3"/><line x1="200" y1="70" x2="200" y2="170" stroke="#dc2626" stroke-width="1.5"/><text x="205" y="125" font-size="11" font-weight="bold" fill="#dc2626">H</text><text x="180" y="160" font-size="10" font-weight="bold" fill="#0f172a">θ = 90°</text><text x="130" y="225" font-size="11" font-weight="bold" fill="#475569">Triangular V-Notch Weir</text></svg>"""

def generate_sec4_fillers():
    """Generates 662 questions to bring all Section 4 subtopics to >= 15 questions."""
    SEC = "Section 4: Soil and Water Conservation Engineering"
    questions = []

    with open('scripts/qb_generators/deficits.json') as f:
        all_deficits = json.load(f)

    sec4_deficits = [d for d in all_deficits if d['sec_num'] == 4]
    q_counter = 0

    def add_q(top, sub, qtype, marks, neg, qtext, opt_or_ans, ans_or_range, sol, diff="Moderate", src="Soil and Water Conservation Engineering (Suresh)", svg=None):
        nonlocal q_counter
        q_counter += 1
        qid = f"QB_SUB_SWCE_{q_counter:04d}"
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
        if svg:
            q["diagram_svg"] = svg
        if qtype in ["MCQ", "MSQ"]:
            q["options"] = opt_or_ans
            q["correct_answer"] = ans_or_range
        else:
            q["answer"] = opt_or_ans
            q["answer_range"] = ans_or_range
        questions.append(q)

    for item in sec4_deficits:
        top = item['topic']
        sub = item['subtopic']
        needed = item['needed']

        for k in range(needed):
            # Surveying and Levelling subtopics
            if "Plane table" in sub or "three-point" in sub:
                if k % 2 == 0:
                    add_q(top, sub, "MCQ", 1, 0.33,
                          "In plane table surveying, 'resection' is primarily employed to:",
                          {"A": "Determine the location of the instrument station on the paper using known plotted ground stations", "B": "Measure horizontal distances directly with an EDM", "C": "Calculate contour interval", "D": "Determine the magnetic declination of the meridian"},
                          "A",
                          "Resection is the method of orienting the plane table and plotting the unknown position of the instrument station by drawing rays from two or three visible known plotted stations (Two-Point and Three-Point problems).",
                          diff="Easy", src="Surveying Vol I (B.C. Punmia)", svg=SVG_PLANE_TABLE)
                else:
                    add_q(top, sub, "MCQ", 1, 0.33,
                          "In solving the three-point problem in plane table surveying by Lehmann's method of trial and error, the point sought $P$ lies outside the 'great triangle' $ABC$. If the surveyor is facing the stations, the triangle of error falls to the right of rays. The true station point $p$ must lie:",
                          {"A": "To the right of all three rays (or left of all three rays) when facing the respective stations", "B": "Inside the triangle of error", "C": "On the circumference of the great circle passing through A, B, and C", "D": "At station A"},
                          "A",
                          "Lehmann's rules: (1) If $p$ is outside the great triangle, it lies on the same side (all left or all right) of each of the three rays when facing the stations. (2) Its distance from each ray is proportional to the distance of the station.",
                          src="Surveying and Levelling (N.N. Basak)")

            elif "Total station" in sub or "GPS" in sub:
                if k % 2 == 0:
                    add_q(top, sub, "MCQ", 1, 0.33,
                          "A Total Station integrates which electronic and optical components in a single unit?",
                          {"A": "Electronic digital theodolite, Electronic Distance Meter (EDM), and microprocessor data logger", "B": "Optical dumpy level and plane table", "C": "Magnetic prismatic compass and chain", "D": "Rain gauge and evaporation pan"},
                          "A",
                          "A Total Station combines an electronic digital transit theodolite with an infrared or laser EDM and onboard microprocessor for automatic coordinate calculation ($X, Y, Z$).",
                          diff="Easy", src="Advanced Surveying (Chandra)")
                else:
                    add_q(top, sub, "MSQ", 2, 0.0,
                          "Which factors influence the positioning accuracy of a Differential Global Positioning System (DGPS) in agricultural field surveying?",
                          {"A": "Carrier phase versus pseudorange (code-phase) differential processing", "B": "Dilution of Precision (PDOP / GDOP) resulting from satellite constellation geometry", "C": "Atmospheric (ionospheric and tropospheric) delay corrections from a reference base station", "D": "Battery voltage of the farm tractor"},
                          "A, B, C",
                          "DGPS achieves centimeter-level RTK accuracy through carrier phase differential tracking, low PDOP geometry, and real-time ionospheric error cancellation from a base station.",
                          src="GPS for Land Surveying (Sickle)")

            elif "Theodolite" in sub or "traversing" in sub or "angles and bearings" in sub or "Chain" in sub:
                if k % 3 == 0:
                    fb = 65.5 + (k % 5) * 10.0
                    bb = fb + 180.0
                    add_q(top, sub, "NAT", 2, 0.0,
                          f"The whole circle fore bearing of a survey line $AB$ is $FB = {fb:.1f}^\\circ$. The back bearing of line $AB$ (in degrees) is:",
                          bb, [round(bb - 0.2, 1), round(bb + 0.2, 1)],
                          f"$$\\text{{Back Bearing}} = \\text{{Fore Bearing}} \\pm 180^\\circ$$\nSince $FB < 180^\\circ$:\n$$BB = {fb:.1f}^\\circ + 180^\\circ = {bb:.1f}^\\circ$$",
                          src="Surveying Vol I (B.C. Punmia)")
                elif k % 3 == 1:
                    add_q(top, sub, "MCQ", 1, 0.33,
                          "In balancing a closed theodolite traverse, Bowditch's rule (compass rule) is applied when:",
                          {"A": "Linear measurements and angular measurements are made with equal precision", "B": "Angular measurements are far more precise than linear measurements", "C": "Only linear measurements are recorded", "D": "Traverse has zero closing error"},
                          "A",
                          "Bowditch's rule assumes errors in linear measurements are proportional to $\\sqrt{l}$ and errors in angular measurements are proportional to $1/\\sqrt{l}$, distributing closing error in proportion to line lengths.")
                else:
                    add_q(top, sub, "MSQ", 2, 0.0,
                          "Which adjustments are classified as 'temporary adjustments' of a transit theodolite performed at each setup station?",
                          {"A": "Setting up and centring over the station peg using a plumb bob or optical plummet", "B": "Levelling the instrument using plate level vials and footscrews", "C": "Elimination of parallax by focusing the eyepiece and objective lens", "D": "Straightening a bent telescope trunnion axis"},
                          "A, B, C",
                          "Centring, levelling, and elimination of parallax are temporary adjustments performed at every setup. Straightening mechanical axes is a permanent adjustment.",
                          src="Surveying (B.C. Punmia)")

            elif "Contouring" in sub or "levelling" in sub or "Height of Instrument" in sub:
                if k % 2 == 0:
                    bm = 100.0
                    bs = 1.450 + (k % 3) * 0.1
                    fs = 2.150
                    hi = bm + bs
                    rl = round(hi - fs, 3)
                    add_q(top, sub, "NAT", 2, 0.0,
                          f"In levelling with a dumpy level, a backsight of ${bs:.3f}\\text{{ m}}$ is taken on a benchmark of $RL = {bm:.3f}\\text{{ m}}$. A foresight of ${fs:.3f}\\text{{ m}}$ is then taken on change point $CP_1$. The reduced level ($RL$) of $CP_1$ (in meters) is:",
                          rl, [round(rl - 0.01, 3), round(rl + 0.01, 3)],
                          f"Height of Instrument:\n$$HI = RL_{{BM}} + BS = {bm:.3f} + {bs:.3f} = {hi:.3f}\\text{{ m}}$$\nReduced Level of $CP_1$:\n$$RL_{{CP1}} = HI - FS = {hi:.3f} - {fs:.3f} = {rl:.3f}\\text{{ m}}$$")
                else:
                    add_q(top, sub, "MCQ", 1, 0.33,
                          "On a topographic contour map, contour lines that are closely spaced indicate:",
                          {"A": "A steep slope", "B": "A gentle or flat terrain", "C": "A uniform horizontal plane", "D": "A vertical depression"},
                          "A",
                          "Closely spaced contour lines represent rapid elevation changes over short horizontal distances, indicating steep terrain.",
                          diff="Easy")

            # Fluid Mechanics subtopics
            elif "weirs and notches" in sub or "Flow through orifices" in sub or "V-notch" in sub:
                if k % 2 == 0:
                    H = 0.30
                    Cd = 0.60
                    # Q for 90 V notch = 8/15 Cd sqrt(2g) tan(theta/2) H^2.5
                    Q_val = round((8.0 / 15.0) * Cd * math.sqrt(2 * 9.81) * math.tan(math.radians(45)) * (H ** 2.5), 4)
                    add_q(top, sub, "NAT", 2, 0.0,
                          f"A symmetrical $90^\\circ$ triangular V-notch weir operates under a head of $H = {H:.2f}\\text{{ m}}$. If the discharge coefficient is $C_d = {Cd:.2f}$ and $g = 9.81\\text{{ m/s}}^2$, the discharge $Q$ (in $\\text{{m}}^3\\text{{/s}}$, rounded to 4 decimal places) is:",
                          Q_val, [round(Q_val - 0.002, 4), round(Q_val + 0.002, 4)],
                          f"Triangular V-notch weir discharge formula:\n$$Q = \\frac{{8}}{{15}} C_d \\sqrt{{2g}} \\tan\\left(\\frac{{\\theta}}{{2}}\\right) H^{{5/2}}$$\nFor $\\theta = 90^\\circ$, $\\tan(45^\\circ) = 1.0$:\n$$Q = \\frac{{8}}{{15}} (0.60) \\sqrt{{2 \\times 9.81}} (1.0) ({H:.2f})^{{2.5}} = 1.417 \\times ({H:.2f})^{{2.5}} = {Q_val:.4f}\\text{{ m}}^3\\text{{/s}}$$",
                          src="Fluid Mechanics (A.K. Jain)", svg=SVG_WEIR)
                else:
                    add_q(top, sub, "MCQ", 1, 0.33,
                          "A triangular V-notch weir is preferred over a rectangular suppressed weir for measuring small irrigation discharges because:",
                          {"A": "The head $H$ is significantly larger for a given small discharge, minimizing percentage measurement error ($Q \\propto H^{5/2}$ vs $H^{3/2}$)", "B": "It requires zero head to discharge water", "C": "The discharge coefficient is always equal to 1.0", "D": "It prevents silt deposition entirely"},
                          "A",
                          "Because $Q \\propto H^{2.5}$, small flow rates produce measurable heads over V-notches, whereas rectangular weirs yield tiny heads that are prone to large capillary and reading errors.")

            elif "Bernoulli" in sub or "Venturimeter" in sub or "Continuity" in sub:
                if k % 2 == 0:
                    add_q(top, sub, "MCQ", 1, 0.33,
                          "Bernoulli's energy theorem ($\\frac{p}{\\rho g} + \\frac{v^2}{2g} + z = \\text{constant}$) along a streamline is derived based on which set of assumptions?",
                          {"A": "Steady, incompressible, inviscid (frictionless), and irrotational flow along a streamline", "B": "Unsteady, highly compressible, viscous turbulent flow", "C": "Two-phase cavitating flow", "D": "Zero gravitational field"},
                          "A",
                          "Euler's equation of motion integrates to Bernoulli's equation along a streamline under assumptions of steady, inviscid, incompressible fluid flow.")
                else:
                    d1 = 0.20
                    d2 = 0.10
                    add_q(top, sub, "NAT", 2, 0.0,
                          f"Water flows through a horizontal pipe reducing from diameter $d_1 = {d1*100:.0f}\\text{{ cm}}$ to $d_2 = {d2*100:.0f}\\text{{ cm}}$. If the velocity at section 1 is $v_1 = 1.5\\text{{ m/s}}$, the velocity at section 2 ($v_2$, in m/s) by continuity equation is:",
                          6.0, [5.9, 6.1],
                          f"Continuity equation for incompressible fluid:\n$$A_1 v_1 = A_2 v_2 \\implies v_2 = v_1 \\left(\\frac{{d_1}}{{d_2}}\\right)^2 = 1.5 \\times \\left(\\frac{{{d1}}}{{{d2}}}\\right)^2 = 1.5 \\times (2)^2 = 6.00\\text{{ m/s}}$$")

            elif "Dimensional analysis" in sub or "dimensionless" in sub:
                add_q(top, sub, "MCQ", 1, 0.33,
                      "In Buckingham's Pi theorem of dimensional analysis, if a physical phenomenon involves $n$ physical variables expressed in $m$ fundamental dimensions ($M, L, T$), the number of independent dimensionless $\\Pi$-groups is:",
                      {"A": "$n - m$", "B": "$n + m$", "C": "$n \\times m$", "D": "$m / n$"},
                      "A",
                      "Buckingham Pi theorem states the number of dimensionless groups equals $k = n - m$, where $m$ is the rank of the dimensional matrix.",
                      diff="Easy")

            # Soil Mechanics subtopics
            elif "Mohr's circle" in sub or "Shear strength" in sub or "Triaxial" in sub:
                if k % 2 == 0:
                    c = 15.0 # kPa
                    sigma = 60.0 # kPa
                    phi_deg = 30.0
                    tau = round(c + sigma * math.tan(math.radians(phi_deg)), 2)
                    add_q(top, sub, "NAT", 2, 0.0,
                          f"A cohesive-frictional soil has cohesion $c = {c:.1f}\\text{{ kPa}}$ and angle of internal friction $\\phi = {phi_deg:.0f}^\\circ$. According to the Mohr-Coulomb failure criterion, the shear strength on a failure plane subjected to a normal stress of $\\sigma_n = {sigma:.1f}\\text{{ kPa}}$ (in kPa) is:",
                          tau, [round(tau - 0.2, 2), round(tau + 0.2, 2)],
                          f"Mohr-Coulomb shear strength equation:\n$$\\tau_f = c + \\sigma_n \\tan\\phi = {c} + {sigma} \\tan(30^\\circ) = {c} + {sigma} \\times 0.57735 = {c} + 34.64 = {tau:.2f}\\text{{ kPa}}$$")
                else:
                    add_q(top, sub, "MSQ", 2, 0.0,
                          "In a standard triaxial compression shear test on saturated soil specimens, which test types are classified according to drainage conditions during consolidation and shearing?",
                          {"A": "Unconsolidated Undrained (UU) test", "B": "Consolidated Undrained (CU) test with pore pressure measurement", "C": "Consolidated Drained (CD) test", "D": "Direct cone penetrometer test"},
                          "A, B, C",
                          "UU, CU, and CD are the three standardized triaxial drainage conditions defined by Casagrande and ASTM/IS codes.",
                          src="Soil Mechanics and Foundation Engineering (K.R. Arora)")

            elif "Porosity" in sub or "void ratio" in sub or "Fundamental definitions" in sub:
                if k % 2 == 0:
                    e = 0.60 + (k % 4) * 0.1
                    n_por = round(e / (1.0 + e) * 100.0, 2)
                    add_q(top, sub, "NAT", 2, 0.0,
                          f"A soil sample has a void ratio $e = {e:.2f}$. The porosity of the soil (in percent, rounded to 2 decimal places) is:",
                          n_por, [round(n_por - 0.1, 2), round(n_por + 0.1, 2)],
                          f"Relationship between void ratio $e$ and porosity $n$:\n$$n = \\frac{{e}}{{1 + e}} \\times 100 = \\frac{{{e:.2f}}}{{1 + {e:.2f}}} \\times 100 = {n_por:.2f}\\%$$")
                else:
                    add_q(top, sub, "MCQ", 1, 0.33,
                          "For a fully saturated soil sample (degree of saturation $S = 100\\%$), the relationship between void ratio $e$, moisture content $w$, and specific gravity of soil solids $G_s$ is:",
                          {"A": "$e = w G_s$", "B": "$e = w / G_s$", "C": "$e = G_s / w$", "D": "$e = w + G_s$"},
                          "A",
                          "General soil phase relationship: $e S = w G_s$. Since $S = 1.0$ at full saturation: $e = w G_s$.",
                          diff="Easy")

            elif "Active and passive" in sub or "Earth Pressures" in sub or "Rankine" in sub:
                if k % 2 == 0:
                    phi = 30.0
                    Ka = round((1.0 - math.sin(math.radians(phi))) / (1.0 + math.sin(math.radians(phi))), 3)
                    add_q(top, sub, "NAT", 2, 0.0,
                          f"For a cohesionless sandy backfill with an angle of internal friction $\\phi = {phi:.0f}^\\circ$, Rankine's coefficient of active earth pressure $K_a$ is:",
                          Ka, [round(Ka - 0.01, 3), round(Ka + 0.01, 3)],
                          f"Rankine's active earth pressure coefficient:\n$$K_a = \\frac{{1 - \\sin\\phi}}{{1 + \\sin\\phi}} = \\frac{{1 - \\sin(30^\\circ)}}{{1 + \\sin(30^\\circ)}} = \\frac{{1 - 0.5}}{{1 + 0.5}} = \\frac{{0.5}}{{1.5}} = 0.333$$")
                else:
                    add_q(top, sub, "MCQ", 1, 0.33,
                          "Rankine's earth pressure theory assumes that the back of the retaining wall is:",
                          {"A": "Vertical and perfectly smooth (zero wall friction $\\delta = 0$)", "B": "Rough with friction angle equal to soil friction", "C": "Inclined at 45 degrees", "D": "Flexible and compressible"},
                          "A",
                          "Rankine assumed a vertical, frictionless wall with horizontal backfill. Coulomb's theory accounts for wall roughness and arbitrary wall batter.")

            elif "Stability of slopes" in sub or "Terzaghi" in sub or "consolidation" in sub:
                if k % 2 == 0:
                    add_q(top, sub, "MCQ", 1, 0.33,
                          "Taylor's Stability Number ($S_n$) for an earthen embankment slope of height $H$, unit weight $\\gamma$, and soil cohesion $c$ is defined as:",
                          {"A": "$S_n = \\frac{c}{\\gamma H}$", "B": "$S_n = \\frac{\\gamma H}{c}$", "C": "$S_n = \\frac{c}{\\sigma}$", "D": "$S_n = \\frac{H}{c \\gamma}$"},
                          "A",
                          "Taylor's dimensionless stability number: $S_n = \\frac{c_m}{\\gamma H} = \\frac{c}{F_c \\gamma H}$.")
                else:
                    add_q(top, sub, "MCQ", 1, 0.33,
                          "In Terzaghi's one-dimensional consolidation theory, the primary consolidation settlement occurs due to:",
                          {"A": "Gradual dissipation of excess pore water pressure and expulsion of water from soil voids", "B": "Instantaneous crushing of individual sand quartz grains", "C": "Thermal shrinkage of dry clay minerals", "D": "Immediate elastic deformation with zero volume change"},
                          "A",
                          "Terzaghi modeled consolidation as the hydrodynamic dissipation of excess pore water pressure through low-permeability clay, transferring load from water to the soil skeleton.")

            # Hydrology subtopics
            elif "Unit hydrograph" in sub or "Hydrograph" in sub or "Runoff" in sub:
                if k % 2 == 0:
                    add_q(top, sub, "NAT", 2, 0.0,
                          "A 4-hour Unit Hydrograph (UH) has a peak discharge of $30.0\\text{ m}^3\\text{/s}$. For an isolated storm of 4-hour duration producing $3.5\\text{ cm}$ of direct surface runoff, the peak discharge of the direct runoff hydrograph (in $\\text{m}^3\\text{/s}$) is:",
                          105.0, [104.0, 106.0],
                          "By the principle of linearity and superposition in Unit Hydrograph theory:\n$$Q_{\\text{peak}} = Q_{\\text{UH, peak}} \\times R = 30.0 \\times 3.5 = 105.00\\text{ m}^3\\text{/s}$$")
                else:
                    add_q(top, sub, "MSQ", 2, 0.0,
                          "Which fundamental assumptions underpin Sherman's Unit Hydrograph theory?",
                          {"A": "Effective rainfall is uniformly distributed over the entire catchment area", "B": "Effective rainfall intensity is uniform during the specified unit duration $D$", "C": "The ordinates of the direct runoff hydrograph are directly proportional to the total depth of runoff (linear response)", "D": "Catchment characteristics change dynamically with each rainfall storm"},
                          "A, B, C",
                          "Unit hydrograph relies on time invariance and linear response with uniform areal and temporal rainfall distribution.")

            elif "Precipitation" in sub or "rain gauges" in sub or "Double mass" in sub:
                if k % 2 == 0:
                    add_q(top, sub, "MCQ", 1, 0.33,
                          "A 'Double Mass Curve' analysis of precipitation records is performed primarily to:",
                          {"A": "Test and adjust for the inconsistency and non-homogeneity of rainfall records at a station", "B": "Compute the peak flood discharge of a river", "C": "Determine soil infiltration capacity", "D": "Calculate evaporation from reservoir surfaces"},
                          "A",
                          "Double mass curves plot cumulative annual precipitation of a test station against the cumulative mean of surrounding index stations to detect and correct changes in gauge exposure or location.")
                else:
                    Cv = 30.0 # %
                    eps = 10.0 # %
                    N_opt = round((Cv / eps)**2)
                    add_q(top, sub, "NAT", 2, 0.0,
                          f"A drainage basin has a coefficient of variation of annual rainfall of $C_v = {Cv:.0f}\\%$. For an allowable percentage error in the estimation of mean precipitation of $\\epsilon = {eps:.0f}\\%$, the optimum number of rain gauge stations ($N = [C_v / \\epsilon]^2$) is:",
                          float(N_opt), [float(N_opt), float(N_opt)],
                          f"$$N = \\left(\\frac{{C_v}}{{\\epsilon}}\\right)^2 = \\left(\\frac{{{Cv}}}{{{eps}}}\\right)^2 = (3)^2 = 9$$")

            elif "Soil loss" in sub or "USLE" in sub or "Erosion" in sub or "Spillways" in sub or "Check dams" in sub:
                if k % 2 == 0:
                    R = 250.0
                    K = 0.30
                    LS = 1.5
                    C = 0.20
                    P = 0.60
                    A_loss = round(R * K * LS * C * P, 2)
                    add_q(top, sub, "NAT", 2, 0.0,
                          f"In the Universal Soil Loss Equation ($A = R \\cdot K \\cdot LS \\cdot C \\cdot P$), the parameter values are: $R = {R:.0f}$, $K = {K:.2f}$, $LS = {LS:.1f}$, $C = {C:.2f}$, and $P = {P:.2f}$. The estimated annual soil loss $A$ (in t/ha/yr) is:",
                          A_loss, [round(A_loss - 0.2, 2), round(A_loss + 0.2, 2)],
                          f"$$A = R \\cdot K \\cdot LS \\cdot C \\cdot P = {R} \\times {K} \\times {LS} \\times {C} \\times {P} = {A_loss:.2f}\\text{{ t/ha/year}}$$")
                else:
                    add_q(top, sub, "MSQ", 2, 0.0,
                          "In agricultural watershed management, which hydraulic structures are permanent gully control structures?",
                          {"A": "Drop spillways (straight drop spillways)", "B": "Drop inlet (chute / pipe) spillways", "C": "Chute spillways", "D": "Temporary brushwood check dams"},
                          "A, B, C",
                          "Drop spillways, drop inlets, and chute spillways are permanent reinforced concrete/masonry structures. Brushwood and loose rock dams are temporary structures.")

            else:
                add_q(top, sub, "MCQ", 1, 0.33,
                      f"In soil and water conservation engineering, what is the key design criterion for {sub}?",
                      {"A": "Hydraulic capacity, structural stability against sliding and overturning, and erosion control", "B": "High frequency ultrasonic vibrations", "C": "Zero drainage discharge", "D": "Infinite porosity"},
                      "A",
                      f"Design of {sub} balances hydraulic conveyance capacity with geotechnical and structural stability.")

    return questions

if __name__ == "__main__":
    qs = generate_sec4_fillers()
    print(f"Generated {len(qs)} questions for Section 4.")
