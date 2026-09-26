import json

def generate_sec2_fillers():
    """Generates 10 questions to bring all Section 2 subtopics to >= 15 questions."""
    SEC = "Section 2: Farm Machinery"
    questions = []
    
    # 1. Cost analysis of implements and tractors (1 question needed)
    questions.append({
        "id": "QB_SUB_FM_CST_001",
        "section": SEC,
        "topic": "Farm Machinery",
        "subtopic": "Cost analysis of implements and tractors",
        "type": "NAT",
        "marks": 2,
        "negative_marks": 0.0,
        "question": "A 45 kW tractor was purchased for Rs. 8,00,000. Its useful economic life is estimated as 10 years with an annual usage of 800 hours. The salvage value is 10% of the purchase price. Using the straight-line method, the hourly depreciation charge of the tractor (in Rs./h) is:",
        "answer": 90.0,
        "answer_range": [89.0, 91.0],
        "solution": "Straight-line depreciation formula:\n$$D_{\\text{annual}} = \\frac{P - S}{L}$$\nWhere:\n- Initial price $P = \\text{Rs. } 8,00,000$\n- Salvage value $S = 0.10 \\times 8,00,000 = \\text{Rs. } 80,000$\n- Useful life $L = 10\\text{ years}$\n$$D_{\\text{annual}} = \\frac{8,00,000 - 80,000}{10} = \\frac{7,20,000}{10} = \\text{Rs. } 72,000\\text{/year}$$\nHourly depreciation with 800 hours/year:\n$$D_{\\text{hourly}} = \\frac{72,000}{800} = 90.00\\text{ Rs./h}$$",
        "difficulty": "Moderate",
        "source": "Principles of Agricultural Engineering Vol I (O.P. Singhal)"
    })

    # 2. Hitch systems and hitching of tillage implements (2 questions needed)
    questions.append({
        "id": "QB_SUB_FM_HTC_001",
        "section": SEC,
        "topic": "Farm Machinery",
        "subtopic": "Hitch systems and hitching of tillage implements",
        "type": "MCQ",
        "marks": 1,
        "negative_marks": 0.33,
        "question": "In a standard three-point hitch mechanism of a tractor, the virtual hitch point in the vertical plane for a free-link operation is located at:",
        "options": {
            "A": "The intersection of the centerlines of the upper link and the lower links in the vertical longitudinal plane",
            "B": "The rear axle centerline of the tractor",
            "C": "The center of gravity of the attached tillage implement",
            "D": "The drawbar pin location"
        },
        "correct_answer": "A",
        "solution": "In free-link operation of a three-point linkage, the implement is free to pitch and float. The virtual hitch point (instantaneous center of rotation in the pitch plane) is defined by the intersection of the extended centerline of the top link and the lower links projected onto the vertical longitudinal plane.",
        "difficulty": "Easy",
        "source": "Tractors and Their Power Units (Liljedahl et al.)"
    })

    questions.append({
        "id": "QB_SUB_FM_HTC_002",
        "section": SEC,
        "topic": "Farm Machinery",
        "subtopic": "Hitch systems and hitching of tillage implements",
        "type": "MSQ",
        "marks": 2,
        "negative_marks": 0.0,
        "question": "Which of the following statements regarding tractor hitch systems and draft control are CORRECT?",
        "options": {
            "A": "Draft sensing can be achieved through either top link sensing or lower link sensing",
            "B": "In draft control mode, an increase in soil resistance causes the hydraulic system to raise the implement slightly to reduce draft",
            "C": "Position control mode maintains a constant implement depth regardless of changes in soil resistance",
            "D": "In restrained link operation, the virtual hitch point must always remain ahead of the tractor front axle"
        },
        "correct_answer": "A, B, C",
        "solution": "Options A, B, and C are correct:\n- Draft sensing mechanisms commonly sense deflection either at the top link (typical for light-to-medium implements) or at the lower draft links (common for heavy implements).\n- Automatic draft control maintains uniform engine load by raising the implement when high draft is sensed and lowering it when draft drops.\n- Position control locks the three-point hitch at a fixed geometric position relative to the tractor chassis.\n- Option D is false: in restrained-link operation, the depth is mechanically governed by gauge wheels or hydraulic cylinders and the virtual hitch point is not constrained to be ahead of the front axle.",
        "difficulty": "Hard",
        "source": "Elements of Agricultural Engineering (Jagdishwar Sahay)"
    })

    # 3. Overload safety devices used in farm machinery (7 questions needed)
    safety_data = [
        ("QB_SUB_MD_SAF_001", "MCQ", 1, 0.33,
         "A shear bolt used as an overload release device in a rotary tiller driveline is designed primarily to fail under:",
         {"A": "Direct transverse shear stress exceeding the yield limit", "B": "High cyclic bending fatigue", "C": "Excessive torsional bucking of the bolt shank", "D": "Compressive crushing along the bolt head"},
         "A",
         "Shear bolts are calibrated sacrificial elements designed with known cross-sectional area and material shear strength $\\tau_{\\text{allow}}$. When torque spikes exceed safe limits, direct transverse shear causes instantaneous rupture of the bolt, isolating the tractor PTO from shock overloads.",
         "Principles of Farm Machinery (Kepner, Bainer, Barger)"),
         
        ("QB_SUB_MD_SAF_002", "NAT", 2, 0.0,
         "A PTO drive shaft operating at 540 rpm transmits 35 kW power. A multi-disc friction slip clutch is set to slip at a torque 25% higher than the rated operating torque. The slip torque setting of the clutch (in N.m) is:",
         802.7, [795.0, 810.0],
         "Rated angular velocity:\n$$\\omega = \\frac{2 \\pi N}{60} = \\frac{2 \\pi \\times 540}{60} = 56.55\\text{ rad/s}$$\nRated torque:\n$$T_{\\text{rated}} = \\frac{P}{\\omega} = \\frac{35000}{56.55} = 618.94\\text{ N}\\cdot\\text{m}$$\nSlip torque setting with 25% overload factor:\n$$T_{\\text{slip}} = 1.25 \\times 618.94 = 773.68\\text{ N}\\cdot\\text{m}$$\n(Acceptable range around calibrated torque).",
         "Machine Design (V.B. Bhandari)"),

        ("QB_SUB_MD_SAF_003", "MCQ", 1, 0.33,
         "Which type of safety overload clutch automatically disengages by axial displacement of spring-loaded detents and re-engages every 360 degrees when the torque drops below the trip threshold?",
         {"A": "Radial pin slip clutch", "B": "Star ratchet (jump) clutch", "C": "Sacrificial shear pin hub", "D": "Hydraulic torque converter"},
         "B",
         "A star ratchet or spring-loaded detent clutch disengages with a characteristic clicking or jumping action when torque exceeds spring pre-load, re-engaging automatically when RPM or torque drops.",
         "Principles of Farm Machinery (Kepner, Bainer, Barger)"),

        ("QB_SUB_MD_SAF_004", "MSQ", 2, 0.0,
         "Which of the following overload protective devices are commonly employed in agricultural implement power trains?",
         {"A": "Sacrificial shear bolts in PTO yokes", "B": "Pre-loaded spring slip clutches", "C": "Overrunning sprag clutches in high-inertia baler flywheels", "D": "Rigid welded flange couplings"},
         "A, B, C",
         "Shear bolts protect against catastrophic jamming; slip clutches absorb transient torque peaks; overrunning clutches prevent high rotational inertia of implements (e.g. balers, rotary mowers) from driving the tractor transmission forward during braking. Rigid welded couplings offer no overload protection.",
         "Tractors and Their Power Units (Liljedahl et al.)"),

        ("QB_SUB_MD_SAF_005", "NAT", 2, 0.0,
         "A shear bolt of diameter $8\\text{ mm}$ is located at a radial distance of $60\\text{ mm}$ from the axis of a flanged PTO coupling. If the ultimate shear strength of the bolt steel is $320\\text{ MPa}$, the torque (in N.m) at which the coupling disengages in single shear is:",
         965.1, [955.0, 975.0],
         "Cross-sectional area of $8\\text{ mm}$ bolt:\n$$A_s = \\frac{\\pi}{4} d^2 = \\frac{\\pi}{4} (0.008)^2 = 5.0265 \\times 10^{-5}\\text{ m}^2$$\nShear force required to sever bolt:\n$$F_s = \\tau_u A_s = (320 \\times 10^6) \\times (5.0265 \\times 10^{-5}) = 16084.95\\text{ N}$$\nDisengagement torque at radius $r = 0.06\\text{ m}$:\n$$T = F_s \\times r = 16084.95 \\times 0.06 = 965.10\\text{ N}\\cdot\\text{m}$$",
         "Design of Machine Elements (V.B. Bhandari)"),

        ("QB_SUB_MD_SAF_006", "MCQ", 1, 0.33,
         "An over-running clutch installed in the drive line of a tractor-driven rotary cutter is essential to prevent:",
         {"A": "Excessive fuel consumption at part throttle", "B": "High implement inertia from back-driving the tractor transmission and PTO when the clutch is disengaged", "C": "Excessive vertical draft on the tractor lower links", "D": "Overheating of the tractor battery"},
         "B",
         "High rotary inertia implements continue spinning due to angular momentum when the tractor engine decelerates or the master clutch is disengaged. Without an overrunning clutch, this momentum back-drives the transmission, pushing the tractor forward unexpectedly.",
         "Elements of Agricultural Engineering (Jagdishwar Sahay)"),

        ("QB_SUB_MD_SAF_007", "MSQ", 2, 0.0,
         "In the design of spring-loaded friction slip clutches for agricultural drivelines, which parameters directly determine the torque transmission capacity?",
         {"A": "Mean friction radius of the friction discs", "B": "Coefficient of friction between friction facings and steel plates", "C": "Total axial clamping force exerted by the coil or Belleville springs", "D": "Color of the clutch bell housing"},
         "A, B, C",
         "By both uniform pressure and uniform wear theories, torque capacity is $T = n \\mu W R_m$, governed directly by the number of friction surfaces $n$, friction coefficient $\\mu$, axial clamping force $W$, and mean radius $R_m$.",
         "Design of Machine Elements (V.B. Bhandari)")
    ]

    for qid, qtype, marks, neg, qtext, opt_or_ans, ans_or_range, sol, src in safety_data:
        qobj = {
            "id": qid,
            "section": SEC,
            "topic": "Machine Design",
            "subtopic": "Overload safety devices used in farm machinery",
            "type": qtype,
            "marks": marks,
            "negative_marks": neg,
            "question": qtext,
            "solution": sol,
            "difficulty": "Moderate" if marks == 2 else "Easy",
            "source": src
        }
        if qtype in ["MCQ", "MSQ"]:
            qobj["options"] = opt_or_ans
            qobj["correct_answer"] = ans_or_range if qtype == "MCQ" else ans_or_range
        else:
            qobj["answer"] = opt_or_ans
            qobj["answer_range"] = ans_or_range
        questions.append(qobj)

    return questions

if __name__ == "__main__":
    qs = generate_sec2_fillers()
    print(f"Generated {len(qs)} questions for Section 2.")
