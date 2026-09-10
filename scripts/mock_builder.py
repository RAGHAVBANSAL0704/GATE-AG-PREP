"""
Core Mock Builder Module: Mocks 30 to 50
Calibrated to 1 notch above actual GATE AG difficulty.
Includes high-probability emerging topics: Agricultural Drones (UAVs),
Solar PV Pumping, Precision Farming, Non-thermal Processing, GIS/RS Hydrology.
"""

import math

def get_ga_questions(mock_num):
    m = mock_num
    idx = m - 30 # 0 to 20
    qs = []

    # Q1 (1M MCQ - Verbal Aptitude)
    vocab_bank = [
        ("INCHOATE", "Rudimentary and not fully formed", "Sophisticated and well-developed", "Nascent", "Formless", "Amorphous", "B"),
        ("PROCLIVITY", "A natural inclination or tendency", "Aversion or antipathy", "Predilection", "Propensity", "Affinity", "B"),
        ("EPHEMERAL", "Lasting for a very short time", "Eternal and permanent", "Transient", "Fleeting", "Evanescent", "B"),
        ("SAGACIOUS", "Having or showing keen discernment", "Foolish and ill-advised", "Judicious", "Shrewd", "Astute", "B"),
        ("OBDURATE", "Stubbornly refusing to change one's opinion", "Pliant and yielding", "Intractable", "Unyielding", "Adamant", "B"),
        ("EQUIVOCAL", "Open to more than one interpretation", "Unambiguous and explicit", "Ambiguous", "Cryptic", "Enigmatic", "B"),
        ("TACITURN", "Reserved or uncommunicative in speech", "Loquacious and talkative", "Reticent", "Laconic", "Reserved", "B"),
        ("PELLUCID", "Translucently clear or easily understood", "Murky and obscure", "Limpid", "Transparent", "Lucid", "B"),
        ("ZEALOUS", "Having or showing passionate fervor", "Apathetic and indifferent", "Ardent", "Fervent", "Passionate", "B"),
        ("PARSIMONIOUS", "Unwilling to spend money or resources", "Generous and lavish", "Frugal", "Miserly", "Penurious", "B"),
        ("CAPRICIOUS", "Given to sudden and unaccountable changes", "Steady and predictable", "Mercurial", "Whimsical", "Fickle", "B"),
        ("ABSTRUSE", "Difficult to comprehend or obscure", "Clear and obvious", "Recondite", "Arcane", "Esoteric", "B"),
        ("LACONIC", "Using very few words in speech or writing", "Verbose and garrulous", "Terse", "Succinct", "Concise", "B"),
        ("FASTIDIOUS", "Very attentive to accuracy and detail", "Careless and negligent", "Meticulous", "Punctilious", "Scrupulous", "B"),
        ("ALACRITY", "Brisk and cheerful readiness", "Reluctance and hesitation", "Eagerness", "Promptness", "Willingness", "B"),
        ("INGENUOUS", "Innocent, unsuspected, and naive", "Disingenuous and deceitful", "Candid", "Artless", "Frank", "B"),
        ("INVIDIOUS", "Likely to arouse resentment or anger in others", "Pleasant and fair", "Calumnious", "Detractive", "Unfair", "B"),
        ("LUCID", "Expressed clearly and easy to comprehend", "Confusing and muddy", "Coherent", "Articulate", "Intelligible", "B"),
        ("NEBULOUS", "In the form of a cloud or hazy and ill-defined", "Distinct and concrete", "Vague", "Indistinct", "Hazy", "B"),
        ("TENACIOUS", "Tending to keep a firm hold of something", "Slack and surrendering", "Persistent", "Determined", "Steadfast", "B"),
        ("SALUBRIOUS", "Health-giving and pleasant", "Harmful and unhealthy", "Beneficial", "Wholesome", "Hygienic", "B")
    ]
    word, meaning, ant, syn1, syn2, syn3, ans = vocab_bank[idx % len(vocab_bank)]
    qs.append({
        "qnum": 1,
        "section": "General Aptitude",
        "topic": "Verbal Aptitude",
        "subtopic": "Vocabulary (Antonyms & Context)",
        "type": "MCQ",
        "marks": 1,
        "difficulty": "Moderate",
        "question": f"Choose the word that is most nearly OPPOSITE in meaning to '{word}'.",
        "options": {
            "A": syn1,
            "B": ant,
            "C": syn2,
            "D": syn3
        },
        "correct_answer": ans,
        "solution": f"'{word}' means {meaning.lower()}. Its most appropriate opposite is '{ant}'. The other options ({syn1}, {syn2}, {syn3}) represent synonyms or related meanings."
    })

    # Q2 (1M MCQ - Analytical Aptitude / Syllogisms & Logic)
    num_p = 12 + (idx % 8) * 3
    qs.append({
        "qnum": 2,
        "section": "General Aptitude",
        "topic": "Analytical Aptitude",
        "subtopic": "Logical Deduction & Syllogisms",
        "type": "MCQ",
        "marks": 1,
        "difficulty": "Moderate",
        "question": f"Consider the following statements:\nI. All automated spray drones are battery-powered aerial robots.\nII. Some battery-powered aerial robots are equipped with multispectral NDVI sensors.\nIII. No multispectral NDVI sensor is uncalibrated.\nWhich of the following conclusions logically follows?",
        "options": {
            "A": "All automated spray drones are equipped with multispectral NDVI sensors.",
            "B": "Some battery-powered aerial robots are calibrated.",
            "C": "All calibrated sensors are mounted on spray drones.",
            "D": "No automated spray drone is battery-powered."
        },
        "correct_answer": "B",
        "solution": "From Statement II, some battery-powered aerial robots have multispectral NDVI sensors. From Statement III, all multispectral NDVI sensors are calibrated (no sensor is uncalibrated). Combining these two statements directly implies that the aerial robots that possess these sensors are equipped with calibrated devices. Therefore, 'Some battery-powered aerial robots are calibrated' is logically valid. Statements A, C, and D are invalid overextensions."
    })

    # Q3 (1M MCQ - Quantitative Aptitude)
    days_a = 12 + (idx % 6)
    days_b = 18 + (idx % 6)
    # Work done together: 1/days_a + 1/days_b
    together_rate = (days_a + days_b) / (days_a * days_b)
    work_together = round((days_a * days_b) / (days_a + days_b), 2)
    qs.append({
        "qnum": 3,
        "section": "General Aptitude",
        "topic": "Quantitative Aptitude",
        "subtopic": "Work and Time",
        "type": "MCQ",
        "marks": 1,
        "difficulty": "Moderate",
        "question": f"Automated Seed Drill A can plant a standardized 50-hectare research farm in {days_a} hours, while Automated Seed Drill B takes {days_b} hours for the same field. If both drills operate simultaneously without interference, the total time required to plant the field (in hours) is closest to:",
        "options": {
            "A": f"{round(work_together * 0.85, 2)}",
            "B": f"{work_together}",
            "C": f"{round(work_together * 1.25, 2)}",
            "D": f"{round(work_together + 2.5, 2)}"
        },
        "correct_answer": "B",
        "solution": f"Let total work be 1 unit.\nRate of drill A: $R_A = 1/{days_a}$ farm/hour.\nRate of drill B: $R_B = 1/{days_b}$ farm/hour.\nCombined rate $R_{{total}} = \\frac{{1}}{{{days_a}}} + \\frac{{1}}{{{days_b}}} = \\frac{{{days_a + days_b}}}{{{days_a * days_b}}}$ farm/hour.\nTotal time $T = \\frac{{{days_a * days_b}}}{{{days_a + days_b}}} = \\frac{{{days_a * days_b}}}{{{days_a + days_b}}} \\approx {work_together}$ hours."
    })

    # Q4 (1M MCQ - Spatial Aptitude)
    cubes_n = 3 + (idx % 3)
    painted_sides = (cubes_n - 2) ** 3
    qs.append({
        "qnum": 4,
        "section": "General Aptitude",
        "topic": "Spatial Aptitude",
        "subtopic": "3D Spatial Visualization & Cubes",
        "type": "MCQ",
        "marks": 1,
        "difficulty": "Moderate",
        "question": f"A solid wooden cube of side length {cubes_n} cm is painted green on all six faces and subsequently cut into individual smaller cubes of side length 1 cm each. How many of the resulting unit cubes will have exactly ZERO painted faces?",
        "options": {
            "A": f"{painted_sides}",
            "B": f"{6 * (cubes_n - 2)**2}",
            "C": f"{12 * (cubes_n - 2)}",
            "D": "8"
        },
        "correct_answer": "A",
        "solution": f"For an $n \\times n \\times n$ painted cube cut into unit cubes ($n = {cubes_n}$):\n1. Zero painted faces lie completely in the inner core: $(n-2)^3 = ({cubes_n}-2)^3 = {painted_sides}$.\n2. Exactly one painted face: $6(n-2)^2$.\n3. Exactly two painted faces: $12(n-2)$.\n4. Exactly three painted faces (corners): 8.\nHence, the number of unit cubes with 0 painted faces is {painted_sides}."
    })

    # Q5 (1M NAT - Quantitative Aptitude)
    base_n = 5 + idx
    sum_first_n = (base_n * (base_n + 1)) // 2
    qs.append({
        "qnum": 5,
        "section": "General Aptitude",
        "topic": "Quantitative Aptitude",
        "subtopic": "Progressions and Series",
        "type": "NAT",
        "marks": 1,
        "difficulty": "Moderate",
        "question": f"The sum of the first {base_n} terms of an arithmetic progression whose first term is 1 and common difference is 1 is equal to ______ (answer in integer).",
        "options": {},
        "correct_answer": f"{sum_first_n}",
        "solution": f"The sum of the first $n$ natural numbers is given by:\n$$S_n = \\frac{{n(n+1)}}{{2}}$$\nSubstituting $n = {base_n}$:\n$$S_{{{base_n}}} = \\frac{{{base_n} \\times {base_n + 1}}}{{2}} = {sum_first_n}$$\nThus, the integer answer is {sum_first_n}."
    })

    # Q6 (2M MCQ - Critical Reasoning)
    qs.append({
        "qnum": 6,
        "section": "General Aptitude",
        "topic": "Verbal Aptitude",
        "subtopic": "Critical Reasoning & Argument Analysis",
        "type": "MCQ",
        "marks": 2,
        "difficulty": "Hard",
        "question": "Read the following passage carefully:\n'Adopting variable-rate nitrogen fertilization via multispectral drone reflectance sensors has reduced total chemical fertilizer run-off by 28% across the pilot watershed. However, overall net farm profitability in the region did not rise proportionally because high capital expenditure and sensor calibration software subscriptions offset the savings gained from lower bulk fertilizer procurement.'\nWhich of the following, if true, would most strongly WEAKEN the argument that precision drone technology fails to enhance farm profitability?",
        "options": {
            "A": "Drone batteries degrade after 300 recharge cycles and require replacement.",
            "B": "Over consecutive seasons, precision nitrogen dosing prevents nitrate-induced crop lodging and elevates premium harvest yield value by 35% beyond initial savings.",
            "C": "Government subsidies for conventional bulk synthetic fertilizers will remain unchanged for the next five years.",
            "D": "Manual soil testing laboratories require 10 business days to return nitrate concentration reports."
        },
        "correct_answer": "B",
        "solution": "The passage argues that drone-assisted variable-rate fertilization does not meaningfully lift farm profitability because sensor and subscription costs offset fertilizer savings. Option B directly weakens this conclusion by introducing a substantial subsequent financial gain: prevented crop lodging and a 35% premium harvest yield value that overcomes subscription costs over time. Options A and C either strengthen the author's reservation or are neutral, while D is unrelated to net financial profitability."
    })

    # Q7 (2M MCQ - Quantitative Aptitude - Relative Speed & Kinematics)
    spd1 = 45 + (idx % 5) * 5 # km/h
    spd2 = 60 + (idx % 5) * 5 # km/h
    dist_total = 210 + (idx % 5) * 20 # km
    rel_spd = spd1 + spd2
    time_meet = round(dist_total / rel_spd, 2)
    dist_covered_1 = round(spd1 * time_meet, 2)
    qs.append({
        "qnum": 7,
        "section": "General Aptitude",
        "topic": "Quantitative Aptitude",
        "subtopic": "Time, Speed and Distance",
        "type": "MCQ",
        "marks": 2,
        "difficulty": "Hard",
        "question": f"Two autonomous grain transport haulers, H1 and H2, start simultaneously towards each other from two agricultural logistics hubs located {dist_total} km apart. H1 travels at a constant speed of {spd1} km/h, while H2 travels at {spd2} km/h. At what distance from the starting hub of H1 will the two vehicles cross each other (in km)?",
        "options": {
            "A": f"{dist_covered_1}",
            "B": f"{round(dist_covered_1 * 1.15, 2)}",
            "C": f"{round(dist_covered_1 * 0.88, 2)}",
            "D": f"{round(dist_total - dist_covered_1, 2)}"
        },
        "correct_answer": "A",
        "solution": f"Since the haulers travel towards each other, their relative speed is:\n$$V_{{rel}} = V_1 + V_2 = {spd1} + {spd2} = {rel_spd}\\text{{ km/h}}$$\nTime taken to meet:\n$$t = \\frac{{\\text{{Distance}}}}{{V_{{rel}}}} = \\frac{{{dist_total}}}{{{rel_spd}}} = {time_meet}\\text{{ hours}}$$\nDistance traveled by H1 from its hub:\n$$D_1 = V_1 \\times t = {spd1} \\times {time_meet} = {dist_covered_1}\\text{{ km}}$$\nThus, Option A is correct."
    })

    # Q8 (2M MCQ - Data Interpretation)
    base_val = 150 + (idx % 5) * 20
    growth1 = 12 # %
    growth2 = 18 # %
    val_y1 = round(base_val * 1.12, 2)
    val_y2 = round(val_y1 * 1.18, 2)
    pct_total = round(((val_y2 - base_val) / base_val) * 100, 2)
    qs.append({
        "qnum": 8,
        "section": "General Aptitude",
        "topic": "Quantitative Aptitude",
        "subtopic": "Data Interpretation & Compound Growth",
        "type": "MCQ",
        "marks": 2,
        "difficulty": "Hard",
        "question": f"The commercial production of bio-fertilizer at an agro-industrial facility was {base_val} metric tonnes in Year 0. The output expanded by {growth1}% in Year 1 and subsequently grew by an additional {growth2}% in Year 2 over Year 1. The net effective percentage increase in production from Year 0 to Year 2 is:",
        "options": {
            "A": f"{growth1 + growth2}%",
            "B": f"{pct_total}%",
            "C": f"{round(pct_total * 1.10, 2)}%",
            "D": f"{round(pct_total - 4.5, 2)}%"
        },
        "correct_answer": "B",
        "solution": f"Let initial production be $P_0 = {base_val}$ tonnes.\nProduction in Year 1: $P_1 = P_0 \\times (1 + 0.{growth1}) = {val_y1}$ tonnes.\nProduction in Year 2: $P_2 = P_1 \\times (1 + 0.{growth2}) = {val_y2}$ tonnes.\nNet compound percentage increase:\n$$\\text{{Effective Increase}} = \\left(1 + \\frac{{{growth1}}}{{100}}\\right)\\left(1 + \\frac{{{growth2}}}{{100}}\\right) - 1$$\n$$= 1.{growth1} \\times 1.{growth2} - 1 = {round((1 + growth1/100)*(1 + growth2/100) - 1, 4)} = {pct_total}\\%$$\nHence, Option B is correct."
    })

    # Q9 (2M MSQ - Set Theory & Logic)
    qs.append({
        "qnum": 9,
        "section": "General Aptitude",
        "topic": "Analytical Aptitude",
        "subtopic": "Set Theory and Logical Properties",
        "type": "MSQ",
        "marks": 2,
        "difficulty": "Hard",
        "question": "Let sets A, B, and C represent sets of agricultural sensors: A = {Sensors with LoRaWAN wireless telemetry}, B = {Sensors with battery life > 3 years}, C = {Sensors with ingress protection IP67 or higher}. Which of the following identity/identities is/are ALWAYS mathematically true for any universal set of sensors?",
        "options": {
            "A": "(A \\cup B)' = A' \\cap B'",
            "B": "A \\cap (B \\cup C) = (A \\cap B) \\cup (A \\cap C)",
            "C": "A \\setminus (B \\cap C) = (A \\setminus B) \\cap (A \\setminus C)",
            "D": "n(A \\cup B) = n(A) + n(B) - n(A \\cap B)"
        },
        "correct_answer": "A, B, D",
        "solution": "1. Statement A: $(A \\cup B)' = A' \\cap B'$ is De Morgan's Law (Always TRUE).\n2. Statement B: $A \\cap (B \\cup C) = (A \\cap B) \\cup (A \\cap C)$ is the distributive law of intersection over union (Always TRUE).\n3. Statement C: By set difference laws, $A \\setminus (B \\cap C) = (A \\setminus B) \\cup (A \\setminus C)$, NOT intersection. So C is FALSE.\n4. Statement D: $n(A \\cup B) = n(A) + n(B) - n(A \\cap B)$ is the fundamental principle of inclusion-exclusion (Always TRUE).\nTherefore, the correct choices are A, B, and D."
    })

    # Q10 (2M NAT - Combinatorics & Probability)
    # Number of ways to select 3 sensors out of (5+k) where at least 1 is multispectral
    total_s = 7 + (idx % 4)
    multi_s = 3
    non_multi = total_s - multi_s
    all_ways = math.comb(total_s, 3)
    no_multi_ways = math.comb(non_multi, 3)
    at_least_one = all_ways - no_multi_ways
    qs.append({
        "qnum": 10,
        "section": "General Aptitude",
        "topic": "Quantitative Aptitude",
        "subtopic": "Permutations and Combinations",
        "type": "NAT",
        "marks": 2,
        "difficulty": "Hard",
        "question": f"A smart agricultural testbed has {total_s} modular plug-and-play field sensors, out of which exactly {multi_s} are multispectral cameras and the remaining {non_multi} are thermal sensors. If 3 sensors are chosen simultaneously at random to equip an autonomous UAV, the number of distinct ways to choose the sensors such that AT LEAST ONE multispectral camera is selected is ______ (answer in integer).",
        "options": {},
        "correct_answer": f"{at_least_one}",
        "solution": f"Total ways to choose 3 sensors from {total_s} without restriction:\n$$N_{{total}} = \\binom{{{total_s}}}{{3}} = \\frac{{{total_s} \\times {total_s - 1} \\times {total_s - 2}}}{{3 \\times 2 \\times 1}} = {all_ways}$$\nWays to choose 3 sensors containing NO multispectral cameras (i.e. all chosen from the {non_multi} thermal sensors):\n$$N_{{none}} = \\binom{{{non_multi}}}{{3}} = \\frac{{{non_multi} \\times {non_multi - 1} \\times {non_multi - 2}}}{{6}} = {no_multi_ways}$$\nWays containing at least one multispectral camera:\n$$N_{{at least one}} = N_{{total}} - N_{{none}} = {all_ways} - {no_multi_ways} = {at_least_one}$$\nHence, the correct integer answer is {at_least_one}."
    })

    return qs

def get_tech_1m_questions(mock_num):
    m = mock_num
    idx = m - 30
    qs = []

    # Q11: Engg Math 1M (Linear Algebra - Eigenvalues / Trace / Determinant)
    a11 = 2 + (idx % 4)
    a22 = 5 + (idx % 3)
    trace_val = a11 + a22
    det_val = a11 * a22 - 6
    qs.append({
        "qnum": 11,
        "section": "Engineering Mathematics",
        "topic": "Linear Algebra",
        "subtopic": "Eigenvalues and Trace Properties",
        "type": "MCQ",
        "marks": 1,
        "difficulty": "Moderate",
        "question": f"Consider the $2 \\times 2$ matrix $M = \\begin{{pmatrix}} {a11} & 2 \\\\ 3 & {a22} \\end{{pmatrix}}$. The sum of the eigenvalues of $M$ is:",
        "options": {
            "A": f"{trace_val}",
            "B": f"{det_val}",
            "C": f"{trace_val + 2}",
            "D": f"{det_val - trace_val}"
        },
        "correct_answer": "A",
        "solution": f"By the fundamental property of matrices, the sum of the eigenvalues $\\lambda_1 + \\lambda_2$ is equal to the trace of the matrix (sum of diagonal elements):\n$$\\text{{Trace}}(M) = {a11} + {a22} = {trace_val}$$\nFurthermore, the product of the eigenvalues equals $\\det(M) = ({a11})({a22}) - (2)(3) = {det_val}$.\nThus, the sum is {trace_val} (Option A)."
    })

    # Q12: Engg Math 1M (Calculus - Limits / L'Hopital)
    k_val = 3 + (idx % 5)
    lim_ans = 2 * k_val
    qs.append({
        "qnum": 12,
        "section": "Engineering Mathematics",
        "topic": "Calculus",
        "subtopic": "Limits and Continuity",
        "type": "NAT",
        "marks": 1,
        "difficulty": "Moderate",
        "question": f"The value of $\\lim_{{x \\to 0}} \\frac{{\\sin({2 * k_val} x)}}{{x}}$ is ______ (answer in integer).",
        "options": {},
        "correct_answer": f"{lim_ans}",
        "solution": f"Using the standard trigonometric limit $\\lim_{{u \\to 0}} \\frac{{\\sin u}}{{u}} = 1$:\n$$\\lim_{{x \\to 0}} \\frac{{\\sin({2 * k_val} x)}}{{x}} = {2 * k_val} \\lim_{{x \\to 0}} \\frac{{\\sin({2 * k_val} x)}}{{{2 * k_val} x}} = {2 * k_val} \\times 1 = {lim_ans}$$\nOr by L'Hopital's rule:\n$$\\lim_{{x \\to 0}} \\frac{{{2 * k_val} \\cos({2 * k_val} x)}}{{1}} = {lim_ans}$$\nThus, the integer answer is {lim_ans}."
    })

    # Q13: Engg Math 1M (Vector Calculus - Solenoidal / Irrotational)
    c_factor = 2 + (idx % 4)
    qs.append({
        "qnum": 13,
        "section": "Engineering Mathematics",
        "topic": "Vector Calculus",
        "subtopic": "Divergence and Curl of Vector Fields",
        "type": "MCQ",
        "marks": 1,
        "difficulty": "Moderate",
        "question": f"A vector velocity field representing agricultural drainage fluid is given by $\\vec{{V}} = ({c_factor} x) \\hat{{i}} + (a y) \\hat{{j}} + (4 z) \\hat{{k}}$. If the fluid flow is strictly INCOMPRESSIBLE (solenoidal, $\\nabla \\cdot \\vec{{V}} = 0$), then the constant $a$ must equal:",
        "options": {
            "A": f"{- (c_factor + 4)}",
            "B": f"{c_factor + 4}",
            "C": f"{c_factor}",
            "D": f"{-4}"
        },
        "correct_answer": "A",
        "solution": f"For an incompressible field, the divergence must vanish:\n$$\\nabla \\cdot \\vec{{V}} = \\frac{{\\partial V_x}}{{\\partial x}} + \\frac{{\\partial V_y}}{{\\partial y}} + \\frac{{\\partial V_z}}{{\\partial z}} = 0$$\n$$\\frac{{\\partial}}{{\\partial x}}({c_factor} x) + \\frac{{\\partial}}{{\\partial y}}(a y) + \\frac{{\\partial}}{{\\partial z}}(4 z) = 0$$\n$${c_factor} + a + 4 = 0 \\implies a = -({c_factor} + 4) = {- (c_factor + 4)}$$\nHence, Option A is correct."
    })

    # Q14: Engg Math 1M (Differential Equations - Integrating Factor)
    n_p = 2 + (idx % 3)
    qs.append({
        "qnum": 14,
        "section": "Engineering Mathematics",
        "topic": "Differential Equations",
        "subtopic": "First Order Linear ODEs",
        "type": "MCQ",
        "marks": 1,
        "difficulty": "Moderate",
        "question": f"The integrating factor (IF) for the linear first-order differential equation $\\frac{{dy}}{{dx}} + \\frac{{{n_p}}}{{x}} y = x^3$ (for $x > 0$) is:",
        "options": {
            "A": f"x^{{{n_p}}}",
            "B": f"e^{{{n_p} x}}",
            "C": f"\\ln(x^{{{n_p}}})",
            "D": f"\\frac{{1}}{{x^{{{n_p}}}}}"
        },
        "correct_answer": "A",
        "solution": f"For the standard linear differential equation $\\frac{{dy}}{{dx}} + P(x) y = Q(x)$:\nHere $P(x) = \\frac{{{n_p}}}{{x}}$.\nThe integrating factor is:\n$$IF = e^{{\\int P(x) dx}} = e^{{\\int \\frac{{{n_p}}}{{x}} dx}} = e^{{{n_p} \\ln x}} = e^{{\\ln(x^{{{n_p}}})}} = x^{{{n_p}}}$$\nHence, Option A is correct."
    })

    # Q15: Engg Math 1M (Probability & Statistics)
    prob_p = round(0.15 + (idx % 5) * 0.05, 2)
    var_bern = round(prob_p * (1 - prob_p), 4)
    qs.append({
        "qnum": 15,
        "section": "Engineering Mathematics",
        "topic": "Probability and Statistics",
        "subtopic": "Bernoulli & Binomial Distributions",
        "type": "NAT",
        "marks": 1,
        "difficulty": "Moderate",
        "question": f"In quality assurance inspection of precision seeding nozzles, each manufactured nozzle has an independent defect probability of $p = {prob_p}$. The variance of this single Bernoulli trial is ______ (round off to 3 decimal places).",
        "options": {},
        "correct_answer": f"{round(var_bern, 3)} to {round(var_bern, 3)}",
        "solution": f"For a Bernoulli random variable $X$ with success parameter $p = {prob_p}$:\n$$\\text{{Var}}(X) = p(1 - p) = {prob_p} \\times (1 - {prob_p}) = {prob_p} \\times {round(1 - prob_p, 2)} = {var_bern}$$\nRounding off to 3 decimal places gives {round(var_bern, 3)}."
    })

    # Q16: FMP 1M (IC Engines - Compression Ratio & Air-Standard Efficiency)
    cr = 16 + (idx % 6)
    gamma = 1.4
    eta_otto = round((1 - (1 / (cr ** (gamma - 1)))) * 100, 2)
    qs.append({
        "qnum": 16,
        "section": "Farm Power and Machinery",
        "topic": "Farm Power",
        "subtopic": "Internal Combustion Engines (Thermodynamic Cycles)",
        "type": "MCQ",
        "marks": 1,
        "difficulty": "Moderate",
        "question": f"An air-standard Otto cycle operating on a modern high-compression biofuel research engine has a volumetric compression ratio of $r = {cr}:1$. Taking the adiabatic index $\\gamma = 1.4$, the theoretical thermal efficiency of this cycle is closest to:",
        "options": {
            "A": f"{round(eta_otto - 5.5, 1)}%",
            "B": f"{eta_otto}%",
            "C": f"{round(eta_otto + 6.2, 1)}%",
            "D": f"{round(eta_otto * 1.18, 1)}%"
        },
        "correct_answer": "B",
        "solution": f"The air-standard thermal efficiency of the Otto cycle is given by:\n$$\\eta_{{th}} = 1 - \\frac{{1}}{{r^{{\\gamma - 1}}}}$$\nGiven $r = {cr}$ and $\\gamma = 1.4$:\n$$\\eta_{{th}} = 1 - \\frac{{1}}{{{cr}^{{0.4}}}} = 1 - \\frac{{1}}{{{round(cr**0.4, 4)}}} = 1 - {round(1/(cr**0.4), 4)} = {round(eta_otto/100, 4)} = {eta_otto}\\%$$\nHence, Option B is correct."
    })

    # Q17: FMP 1M (Tractor Chassis - Wheel Slip)
    v_theo = 5.0 # km/h
    v_act = round(4.0 - (idx % 5) * 0.15, 2)
    slip_pct = round(((v_theo - v_act) / v_theo) * 100, 1)
    qs.append({
        "qnum": 17,
        "section": "Farm Power and Machinery",
        "topic": "Farm Power",
        "subtopic": "Traction Mechanics and Wheel Slip",
        "type": "NAT",
        "marks": 1,
        "difficulty": "Moderate",
        "question": f"During field tillage operation, a 4WD agricultural tractor travels at a theoretical (zero-slip) speed of {v_theo:.2f} km/h based on drive wheel rotation. Due to soil deformation, the actual measured forward speed is {v_act:.2f} km/h. The wheel slip of the tractor is ______ % (round off to 1 decimal place).",
        "options": {},
        "correct_answer": f"{slip_pct - 0.2:.1f} to {slip_pct + 0.2:.1f}",
        "solution": f"Wheel slip $s$ is defined by:\n$$s = \\left(1 - \\frac{{V_{{actual}}}}{{V_{{theoretical}}}}\\right) \\times 100$$\n$$s = \\left(1 - \\frac{{{v_act}}}{{{v_theo}}}\\right) \\times 100 = \\left(\\frac{{{v_theo} - {v_act}}}{{{v_theo}}}\\right) \\times 100 = \\frac{{{round(v_theo - v_act, 2)}}}{{{v_theo}}} \\times 100 = {slip_pct}\\%$$\nThus, the wheel slip is {slip_pct}%."
    })

    # Q18: FMP 1M (Tillage Implements - Disc Plow Angles)
    qs.append({
        "qnum": 18,
        "section": "Farm Power and Machinery",
        "topic": "Farm Machinery",
        "subtopic": "Tillage Implements (Disc Plow Geometry)",
        "type": "MCQ",
        "marks": 1,
        "difficulty": "Moderate",
        "question": "In a standard tractor-drawn agricultural disc plow, which of the following statements regarding the 'disc angle' and 'tilt angle' is correct?",
        "options": {
            "A": "Disc angle is the angle the plane of the disc makes with the direction of travel (typically 42° to 45°).",
            "B": "Tilt angle is the angle the plane of the disc makes with the direction of travel (typically 15° to 25°).",
            "C": "Both disc angle and tilt angle are measured in the horizontal plane.",
            "D": "Increasing the tilt angle reduces soil penetration in hard dry soils."
        },
        "correct_answer": "A",
        "solution": "In standard disc plow terminology:\n1. Disc Angle: The angle that the plane of the cutting edge makes with the line of travel, usually ranging between 42° and 45°. It controls the furrow cut width.\n2. Tilt Angle: The angle that the plane of the cutting edge makes with the vertical line, usually ranging between 15° and 25°. It aids vertical soil penetration.\nHence, Option A is strictly correct."
    })

    # Q19: FMP 1M (Planting & Sowing - Fluted Roller & Seed Calibration)
    w_drill = 2.0 + (idx % 4) * 0.2 # m width
    l_run = 100.0 # m
    area_calib = w_drill * l_run # m^2
    seed_col = round(1.8 + (idx % 5) * 0.2, 2) # kg
    seed_rate_ha = round((seed_col / area_calib) * 10000, 1)
    qs.append({
        "qnum": 19,
        "section": "Farm Power and Machinery",
        "topic": "Farm Machinery",
        "subtopic": "Sowing and Planting Equipment (Calibration)",
        "type": "NAT",
        "marks": 1,
        "difficulty": "Moderate",
        "question": f"During stationary calibration of a tractor-mounted seed drill of working width {w_drill:.2f} m, the drive wheels are turned for an equivalent forward travel distance of {l_run:.0f} m. The total collected seed from all furrow openers is {seed_col:.2f} kg. The seed delivery rate is ______ kg/ha (round off to 1 decimal place).",
        "options": {},
        "correct_answer": f"{seed_rate_ha - 0.5:.1f} to {seed_rate_ha + 0.5:.1f}",
        "solution": f"Working area covered in calibration run:\n$$A = \\text{{Width}} \\times \\text{{Distance}} = {w_drill} \\times {l_run} = {area_calib}\\text{{ m}}^2$$\nSince $1\\text{{ ha}} = 10,000\\text{{ m}}^2$, the seed rate per hectare is:\n$$\\text{{Seed Rate}} = \\frac{{\\text{{Seed Collected (kg)}}}}{{A (\\text{{m}}^2)}} \\times 10,000 = \\frac{{{seed_col}}}{{{area_calib}}} \\times 10,000 = {seed_rate_ha}\\text{{ kg/ha}}$$\nThus, the answer is {seed_rate_ha} kg/ha."
    })

    # Q20: FMP 1M (NEW SYLLABUS: Agricultural Drones / UAV Droplet Sizing & Relative Span)
    d10 = 110 + (idx % 6) * 5
    d50 = 220 + (idx % 6) * 10
    d90 = 380 + (idx % 6) * 15
    rel_span = round((d90 - d10) / d50, 2)
    qs.append({
        "qnum": 20,
        "section": "Farm Power and Machinery",
        "topic": "Farm Machinery",
        "subtopic": "Plant Protection Equipment & Agricultural Drones (UAV Spraying)",
        "type": "NAT",
        "marks": 1,
        "difficulty": "Moderate",
        "question": f"An agricultural spraying octocopter drone equipped with centrifugal rotary atomizers produces a spray droplet distribution with $D_{{v0.1}} = {d10}\\;\\mu\\text{{m}}$, $D_{{v0.5}} (\\text{{VMD}}) = {d50}\\;\\mu\\text{{m}}$, and $D_{{v0.9}} = {d90}\\;\\mu\\text{{m}}$. The Relative Span (RS) of the droplet spectrum is ______ (round off to 2 decimal places).",
        "options": {},
        "correct_answer": f"{rel_span - 0.02:.2f} to {rel_span + 0.02:.2f}",
        "solution": f"The Relative Span (RS) of a droplet distribution is a dimensionless indicator of droplet spectrum uniformity, defined as:\n$$\\text{{RS}} = \\frac{{D_{{v0.9}} - D_{{v0.1}}}}{{D_{{v0.5}}}}$$\nSubstituting the given values:\n$$\\text{{RS}} = \\frac{{{d90} - {d10}}}{{{d50}}} = \\frac{{{d90 - d10}}}{{{d50}}} \\approx {rel_span}$$\nA lower RS indicates a narrower, more uniform droplet spectrum with reduced drift potential. The answer is {rel_span}."
    })

    # Q21: FMP 1M (Harvesting & Threshing - Combine Reel Index)
    v_forw = 4.0 # km/h = 1.111 m/s
    v_f_ms = round(v_forw / 3.6, 3)
    reel_idx = round(1.25 + (idx % 4) * 0.1, 2)
    v_reel_ms = round(v_f_ms * reel_idx, 2)
    qs.append({
        "qnum": 21,
        "section": "Farm Power and Machinery",
        "topic": "Farm Machinery",
        "subtopic": "Harvesting and Threshing Machinery",
        "type": "MCQ",
        "marks": 1,
        "difficulty": "Moderate",
        "question": f"A combine harvester operates at a forward speed of {v_forw} km/h ({v_f_ms} m/s). To maintain gentle crop deflection onto the cutter bar without shattering grain heads, the reel index is maintained at $\\lambda = {reel_idx}$. The peripheral tangential velocity of the reel bat (in m/s) is closest to:",
        "options": {
            "A": f"{v_reel_ms}",
            "B": f"{round(v_reel_ms * 0.8, 2)}",
            "C": f"{round(v_reel_ms * 1.35, 2)}",
            "D": f"{round(v_f_ms, 2)}"
        },
        "correct_answer": "A",
        "solution": f"The reel index $\\lambda$ is defined as the ratio of the peripheral speed of the reel ($V_r$) to the forward speed of the machine ($V_f$):\n$$\\lambda = \\frac{{V_r}}{{V_f}} \\implies V_r = \\lambda \\times V_f$$\nGiven $V_f = {v_f_ms}\\text{{ m/s}}$ and $\\lambda = {reel_idx}$:\n$$V_r = {reel_idx} \\times {v_f_ms} \\approx {v_reel_ms}\\text{{ m/s}}$$\nHence, Option A is correct."
    })

    # Q22: SWCE 1M (Soil Erosion - USLE)
    r_fac = 350 + (idx % 5) * 50
    k_fac = 0.32
    ls_fac = 1.85
    c_fac = 0.20
    p_fac = 0.60
    a_loss = round(r_fac * k_fac * ls_fac * c_fac * p_fac, 2)
    qs.append({
        "qnum": 22,
        "section": "Soil and Water Conservation Engineering",
        "topic": "Soil Erosion and Conservation",
        "subtopic": "Universal Soil Loss Equation (USLE)",
        "type": "NAT",
        "marks": 1,
        "difficulty": "Moderate",
        "question": f"In a watershed, the USLE factors are: Rainfall erosivity $R = {r_fac}\\;\\text{{MJ}}\\cdot\\text{{mm}}/(\\text{{ha}}\\cdot\\text{{h}}\\cdot\\text{{yr}})$, Soil erodibility $K = {k_fac}\\;\\text{{t}}\\cdot\\text{{ha}}\\cdot\\text{{h}}/(\\text{{ha}}\\cdot\\text{{MJ}}\\cdot\\text{{mm}})$, Topographic factor $LS = {ls_fac}$, Cover management $C = {c_fac}$, and Conservation practice $P = {p_fac}$. The predicted annual soil loss $A$ is ______ t/(ha·yr) (round off to 2 decimal places).",
        "options": {},
        "correct_answer": f"{a_loss - 0.2:.2f} to {a_loss + 0.2:.2f}",
        "solution": f"The Universal Soil Loss Equation is:\n$$A = R \\cdot K \\cdot LS \\cdot C \\cdot P$$\n$$A = ({r_fac}) \\times ({k_fac}) \\times ({ls_fac}) \\times ({c_fac}) \\times ({p_fac}) = {a_loss}\\text{{ t/(ha}}\\cdot\\text{{yr)}}$$\nThus, the estimated soil loss is {a_loss} t/(ha·yr)."
    })

    # Q23: SWCE 1M (Watershed Hydrology - Rational Method)
    c_runoff = round(0.35 + (idx % 4) * 0.05, 2)
    i_rain = 60.0 # mm/h
    a_ha = 80.0 + (idx % 5) * 10
    q_peak = round((c_runoff * i_rain * a_ha) / 360, 2)
    qs.append({
        "qnum": 23,
        "section": "Soil and Water Conservation Engineering",
        "topic": "Watershed Hydrology",
        "subtopic": "Rational Method for Peak Runoff Rate",
        "type": "NAT",
        "marks": 1,
        "difficulty": "Moderate",
        "question": f"A small agricultural watershed of area $A = {a_ha:.0f}\\text{{ ha}}$ has a composite runoff coefficient of $C = {c_runoff:.2f}$. During a design storm equal to the time of concentration, the average rainfall intensity is $I = {i_rain:.0f}\\text{{ mm/h}}$. Using the Rational Formula ($Q = \\frac{{C I A}}{{360}}$), the peak runoff rate is ______ $\\text{{m}}^3/\\text{{s}}$ (round off to 2 decimal places).",
        "options": {},
        "correct_answer": f"{q_peak - 0.1:.2f} to {q_peak + 0.1:.2f}",
        "solution": f"The Rational method formula in metric units is:\n$$Q_p = \\frac{{C \\cdot I \\cdot A}}{{360}}$$\nwhere $I$ is in mm/h, $A$ is in hectares, and $Q_p$ is in $\\text{{m}}^3/\\text{{s}}$.\n$$Q_p = \\frac{{{c_runoff} \\times {i_rain} \\times {a_ha}}}{{360}} = \\frac{{{round(c_runoff * i_rain * a_ha, 2)}}}{{360}} = {q_peak}\\text{{ m}}^3/\\text{{s}}$$\nThus, the peak runoff rate is {q_peak} $\\text{{m}}^3/\\text{{s}}$."
    })

    # Q24: SWCE 1M (Gully Control & Drop Spillway Hydraulics)
    qs.append({
        "qnum": 24,
        "section": "Soil and Water Conservation Engineering",
        "topic": "Soil Conservation Structures",
        "subtopic": "Drop Spillway Hydraulics and Aeration",
        "type": "MCQ",
        "marks": 1,
        "difficulty": "Moderate",
        "question": "In a straight drop spillway constructed for gully stabilization, adequate aeration underneath the falling nappe is provided primarily to:",
        "options": {
            "A": "Prevent the formation of sub-atmospheric pressure that would pull the nappe and cause structural vibration and cavitation.",
            "B": "Increase the discharge coefficient of the weir crest beyond theoretical limits.",
            "C": "Prevent sediment deposition in the upstream approach channel.",
            "D": "Eliminate the requirement of an apron stilling basin downstream."
        },
        "correct_answer": "A",
        "solution": "Aeration vents are installed on both sidewalls under the falling nappe of a drop spillway. If unventilated, air beneath the falling jet is entrained and carried away by water flow, creating a partial vacuum (negative pressure). This suction pulls the nappe toward the wall, inducing severe cyclical vibrations, erratic discharge rating, and cavitation damage to the weir crest. Option A is the correct engineering rationale."
    })

    # Q25: SWCE 1M (Open Channel Flow - Manning's Equation & Rectangular Section)
    b_ch = 2.0 # m
    y_ch = 1.0 # m
    r_hyd = (b_ch * y_ch) / (b_ch + 2 * y_ch)
    qs.append({
        "qnum": 25,
        "section": "Soil and Water Conservation Engineering",
        "topic": "Open Channel Hydraulics",
        "subtopic": "Manning's Equation & Geometric Properties",
        "type": "MCQ",
        "marks": 1,
        "difficulty": "Moderate",
        "question": f"A rectangular drainage channel of bed width $B = {b_ch}\\text{{ m}}$ carries water at a depth of $y = {y_ch}\\text{{ m}}$. The hydraulic radius $R$ of the channel section is:",
        "options": {
            "A": f"{r_hyd:.2f} m",
            "B": f"{2 * r_hyd:.2f} m",
            "C": f"{round(b_ch / y_ch, 2)} m",
            "D": f"{round(r_hyd * 1.5, 2)} m"
        },
        "correct_answer": "A",
        "solution": f"Cross-sectional flow area: $A = B \\times y = {b_ch} \\times {y_ch} = {b_ch * y_ch}\\text{{ m}}^2$.\nWetted perimeter: $P = B + 2y = {b_ch} + 2({y_ch}) = {b_ch + 2 * y_ch}\\text{{ m}}$.\nHydraulic radius:\n$$R = \\frac{{A}}{{P}} = \\frac{{{b_ch * y_ch}}}{{{b_ch + 2 * y_ch}}} = {r_hyd:.2f}\\text{{ m}}$$\nNotice that when $B = 2y$, the rectangular section is hydraulically the most efficient, and $R = y/2 = 0.50\\text{{ m}}$. Option A is correct."
    })

    # Q26: SWCE 1M (NEW SYLLABUS: Geomatics & Remote Sensing - NDVI)
    nir_val = round(0.55 + (idx % 5) * 0.04, 2)
    red_val = round(0.15 - (idx % 5) * 0.01, 2)
    ndvi_val = round((nir_val - red_val) / (nir_val + red_val), 3)
    qs.append({
        "qnum": 26,
        "section": "Soil and Water Conservation Engineering",
        "topic": "Geomatics & Watershed Remote Sensing",
        "subtopic": "Multispectral Vegetation Indices (NDVI)",
        "type": "NAT",
        "marks": 1,
        "difficulty": "Moderate",
        "question": f"A multispectral sensor mounted on a satellite over an irrigated agricultural watershed records a surface reflectance of $\\rho_{{NIR}} = {nir_val}$ in the Near-Infrared band and $\\rho_{{Red}} = {red_val}$ in the Red band. The Normalized Difference Vegetation Index (NDVI) of the crop canopy is ______ (round off to 3 decimal places).",
        "options": {},
        "correct_answer": f"{ndvi_val - 0.005:.3f} to {ndvi_val + 0.005:.3f}",
        "solution": f"The Normalized Difference Vegetation Index (NDVI) is computed as:\n$$\\text{{NDVI}} = \\frac{{\\rho_{{NIR}} - \\rho_{{Red}}}}{{\\rho_{{NIR}} + \\rho_{{Red}}}}$$\nSubstituting the reflectance values:\n$$\\text{{NDVI}} = \\frac{{{nir_val} - {red_val}}}{{{nir_val} + {red_val}}} = \\frac{{{round(nir_val - red_val, 3)}}}{{{round(nir_val + red_val, 3)}}} \\approx {ndvi_val}$$\nThus, the crop NDVI is {ndvi_val}."
    })

    # Q27: IDE 1M (Soil-Water-Plant Relationship - Available Water)
    fc = 28.0 # %
    pwp = 13.0 # %
    bd = 1.45 # g/cm3
    root_d = 80.0 # cm
    awc_cm = round((bd / 1.0) * ((fc - pwp) / 100) * root_d, 2)
    qs.append({
        "qnum": 27,
        "section": "Irrigation and Drainage Engineering",
        "topic": "Soil-Water-Plant Relationship",
        "subtopic": "Available Water Capacity & Root Zone Storage",
        "type": "NAT",
        "marks": 1,
        "difficulty": "Moderate",
        "question": f"A loam soil has a field capacity of {fc:.1f}% and a permanent wilting point of {pwp:.1f}% on a dry weight basis. The dry bulk density of the soil is {bd:.2f} g/cm³ and density of water is 1.0 g/cm³. For a crop root zone depth of {root_d:.0f} cm, the total Available Water Capacity (AWC) in the root zone is ______ cm (round off to 2 decimal places).",
        "options": {},
        "correct_answer": f"{awc_cm - 0.1:.2f} to {awc_cm + 0.1:.2f}",
        "solution": f"The available water capacity depth $d$ is given by:\n$$d = \\frac{{\\rho_b}}{{\\rho_w}} \\times \\left(\\frac{{\\text{{FC}} - \\text{{PWP}}}}{{100}}\\right) \\times D$$\n$$d = \\frac{{{bd}}}{{1.0}} \\times \\left(\\frac{{{fc} - {pwp}}}{{100}}\\right) \\times {root_d} = {bd} \\times {round((fc - pwp)/100, 3)} \\times {root_d} = {awc_cm}\\text{{ cm}}$$\nThus, the available water capacity is {awc_cm} cm."
    })

    # Q28: IDE 1M (Irrigation Efficiencies)
    w_div = 100.0 # m3
    w_del = 80.0 # m3
    w_stor = round(64.0 + (idx % 4) * 2, 1) # m3
    eta_app = round((w_stor / w_del) * 100, 1)
    qs.append({
        "qnum": 28,
        "section": "Irrigation and Drainage Engineering",
        "topic": "Irrigation System Design",
        "subtopic": "Irrigation Water Application Efficiency",
        "type": "NAT",
        "marks": 1,
        "difficulty": "Moderate",
        "question": f"In a border irrigation check, {w_del:.1f} m³ of water is delivered to the field from the canal turnout. The quantity of water stored in the crop root zone during the irrigation event is measured as {w_stor:.1f} m³. The water application efficiency ($\\eta_a$) is ______ % (round off to 1 decimal place).",
        "options": {},
        "correct_answer": f"{eta_app - 0.2:.1f} to {eta_app + 0.2:.1f}",
        "solution": f"Water application efficiency is defined as the ratio of the volume of water stored in the root zone of crops to the volume of water delivered to the plot:\n$$\\eta_a = \\left(\\frac{{W_s}}{{W_f}}\\right) \\times 100 = \\left(\\frac{{{w_stor}}}{{{w_del}}}\\right) \\times 100 = {eta_app}\\%$$\nThus, the application efficiency is {eta_app}%."
    })

    # Q29: IDE 1M (Subsurface Drainage - Hooghoudt's Equation Concept)
    qs.append({
        "qnum": 29,
        "section": "Irrigation and Drainage Engineering",
        "topic": "Drainage Engineering",
        "subtopic": "Subsurface Tile Drainage Theory (Hooghoudt's Equation)",
        "type": "MCQ",
        "marks": 1,
        "difficulty": "Moderate",
        "question": "In steady-state subsurface drainage design using Hooghoudt's equation, if the design steady-state drainage coefficient (recharge rate $q$) is QUADRUPLED while all soil hydraulic conductivities and hydraulic head values remain constant, the required tile drain spacing $S$ will:",
        "options": {
            "A": "Be reduced to half of its original value ($S/2$).",
            "B": "Be doubled ($2S$).",
            "C": "Be reduced to one-fourth ($S/4$).",
            "D": "Remain unchanged because spacing depends only on soil texture."
        },
        "correct_answer": "A",
        "solution": "Hooghoudt's steady-state drainage equation is:\n$$S^2 = \\frac{{8 K_2 d h + 4 K_1 h^2}}{{q}}$$\nTaking the square root gives:\n$$S \\propto \\frac{{1}}{{\\sqrt{{q}}}}$$\nIf the drainage coefficient is quadrupled ($q' = 4q$):\n$$S' \\propto \\frac{{1}}{{\\sqrt{{4q}}}} = \\frac{{1}}{{2\\sqrt{{q}}}} = \\frac{{S}}{{2}}$$\nTherefore, the required spacing is halved ($S/2$). Option A is correct."
    })

    # Q30: APE 1M (Psychrometrics - Humidity Ratio)
    p_atm = 101.325 # kPa
    p_v = round(2.34 + (idx % 5) * 0.2, 2) # kPa
    hum_ratio = round(0.622 * (p_v / (p_atm - p_v)), 4)
    qs.append({
        "qnum": 30,
        "section": "Agricultural Process Engineering",
        "topic": "Psychrometrics",
        "subtopic": "Thermodynamic Properties of Moist Air",
        "type": "NAT",
        "marks": 1,
        "difficulty": "Moderate",
        "question": f"At standard atmospheric pressure of 101.325 kPa, moist air in a paddy grain aeration duct has a partial water vapor pressure of {p_v:.2f} kPa. The humidity ratio ($W$) of this air is ______ kg water / kg dry air (round off to 4 decimal places).",
        "options": {},
        "correct_answer": f"{hum_ratio - 0.0005:.4f} to {hum_ratio + 0.0005:.4f}",
        "solution": f"The humidity ratio (specific humidity) is given by:\n$$W = \\frac{{M_w}}{{M_a}} \\frac{{P_v}}{{P_{{atm}} - P_v}} = 0.622 \\frac{{P_v}}{{P_{{atm}} - P_v}}$$\n$$W = 0.622 \\times \\frac{{{p_v}}}{{101.325 - {p_v}}} = 0.622 \\times \\frac{{{p_v}}}{{{round(p_atm - p_v, 3)}}} \\approx {hum_ratio}\\text{{ kg/kg dry air}}$$\nThus, the humidity ratio is {hum_ratio} kg water/kg dry air."
    })

    # Q31: APE 1M (Drying Kinetics - Page's Equation)
    k_dry = 0.045
    t_min = 30.0
    n_page = 1.15
    mr_page = round(math.exp(- k_dry * (t_min ** n_page)), 3)
    qs.append({
        "qnum": 31,
        "section": "Agricultural Process Engineering",
        "topic": "Drying and Dehydration",
        "subtopic": "Thin Layer Drying Models (Page's Model)",
        "type": "MCQ",
        "marks": 1,
        "difficulty": "Moderate",
        "question": f"During thin-layer drying of parboiled paddy, the moisture ratio is described by Page's equation: $MR = \\exp(-k t^n)$. Given empirical constants $k = {k_dry}\\;\\text{{min}}^{{-n}}$ and $n = {n_page}$, the dimensionless moisture ratio after $t = {t_min:.0f}$ minutes of drying is closest to:",
        "options": {
            "A": f"{mr_page}",
            "B": f"{round(mr_page * 1.35, 3)}",
            "C": f"{round(mr_page * 0.72, 3)}",
            "D": f"{round(1 - mr_page, 3)}"
        },
        "correct_answer": "A",
        "solution": f"Page's equation is:\n$$MR = \\frac{{M - M_e}}{{M_0 - M_e}} = \\exp(-k t^n)$$\nSubstituting $k = {k_dry}$, $n = {n_page}$, and $t = {t_min}$:\n$$t^n = {t_min}^{{{n_page}}} \\approx {round(t_min**n_page, 2)}$$\n$$-k t^n = -{k_dry} \\times {round(t_min**n_page, 2)} \\approx -{round(k_dry * (t_min**n_page), 3)}$$\n$$MR = \\exp(-{round(k_dry * (t_min**n_page), 3)}) \\approx {mr_page}$$\nHence, Option A is correct."
    })

    # Q32: APE 1M (Size Reduction - Rittinger's Law)
    qs.append({
        "qnum": 32,
        "section": "Agricultural Process Engineering",
        "topic": "Size Reduction and Material Handling",
        "subtopic": "Energy Laws in Size Reduction",
        "type": "MCQ",
        "marks": 1,
        "difficulty": "Moderate",
        "question": "Which size reduction law postulates that the energy required for comminution is directly proportional to the NEW SURFACE AREA created during the grinding process?",
        "options": {
            "A": "Rittinger's Law",
            "B": "Kick's Law",
            "C": "Bond's Law",
            "D": "Fick's Law"
        },
        "correct_answer": "A",
        "solution": "1. Rittinger's Law: $E = K_R (1/d_2 - 1/d_1)$ assumes energy is proportional to the new surface area created.\n2. Kick's Law: $E = K_K \\ln(d_1/d_2)$ assumes energy is proportional to the reduction ratio (volume/mass strain energy).\n3. Bond's Law: $E = K_B (1/\\sqrt{d_2} - 1/\\sqrt{d_1})$ assumes energy is proportional to crack tip length.\nTherefore, Option A is strictly correct."
    })

    # Q33: DFE 1M (Dairy Processing - HTST Pasteurization)
    flow_rate_lph = 5000 # L/h = 5000 / 3600 L/s = 1.3889 L/s = 0.001389 m3/s
    q_m3s = 5000.0 / 3600000.0
    dia_tube_cm = 5.0 # cm = 0.05 m
    a_tube = (math.pi / 4) * (0.05 ** 2)
    v_flow = q_m3s / a_tube # m/s
    hold_time_s = 15.0 # s
    l_holding = round(v_flow * hold_time_s, 2)
    qs.append({
        "qnum": 33,
        "section": "Dairy and Food Engineering",
        "topic": "Thermal Processing of Foods",
        "subtopic": "HTST Pasteurization and Holding Tube Hydraulics",
        "type": "NAT",
        "marks": 1,
        "difficulty": "Moderate",
        "question": f"A continuous HTST milk pasteurizer processes market whole milk at a flow rate of 5000 L/h through a sanitary holding tube of internal diameter 5.0 cm. To ensure legal compliance with the mandatory holding time of 15.0 s (assuming plug flow), the minimum required length of the holding tube is ______ m (round off to 2 decimal places).",
        "options": {},
        "correct_answer": f"{l_holding - 0.2:.2f} to {l_holding + 0.2:.2f}",
        "solution": f"Volumetric flow rate:\n$$Q = \\frac{{5000 \\times 10^{{-3}}}}{{3600}} = {q_m3s:.6f}\\text{{ m}}^3/\\text{{s}}$$\nTube cross-sectional area ($D = 0.05\\text{{ m}}$):\n$$A = \\frac{{\\pi}}{{4}} (0.05)^2 = {a_tube:.6f}\\text{{ m}}^2$$\nMean flow velocity:\n$$v = \\frac{{Q}}{{A}} = \\frac{{{q_m3s:.6f}}}{{{a_tube:.6f}}} \\approx {v_flow:.3f}\\text{{ m/s}}$$\nRequired holding tube length for $t = 15.0\\text{{ s}}$:\n$$L = v \\times t = {v_flow:.3f} \\times 15.0 \\approx {l_holding}\\text{{ m}}$$\nThus, the minimum length is {l_holding} m."
    })

    # Q34: DFE 1M (Food Rheology - Power Law Model)
    qs.append({
        "qnum": 34,
        "section": "Dairy and Food Engineering",
        "topic": "Food Rheology and Texture",
        "subtopic": "Non-Newtonian Fluid Flow Behavior",
        "type": "MCQ",
        "marks": 1,
        "difficulty": "Moderate",
        "question": "A liquid food product follows the Ostwald-de Waele Power Law relationship $\\tau = K \\dot{\\gamma}^n$. If the flow behavior index is $n = 0.42$ ($n < 1$), the fluid exhibits:",
        "options": {
            "A": "Pseudoplastic (shear-thinning) behavior, where apparent viscosity decreases with increasing shear rate.",
            "B": "Dilatant (shear-thickening) behavior, where apparent viscosity increases with increasing shear rate.",
            "C": "Newtonian fluid behavior with constant dynamic viscosity.",
            "D": "Bingham plastic behavior with a finite yield stress."
        },
        "correct_answer": "A",
        "solution": "Apparent viscosity for a power law fluid is $\\eta_a = \\frac{\\tau}{\\dot{\\gamma}} = K \\dot{\\gamma}^{n-1}$.\nWhen $n < 1$ (here $n = 0.42$), the exponent $n-1 = -0.58 < 0$, which means apparent viscosity decreases monotonically as the shear rate increases. This is the hallmark of pseudoplastic or shear-thinning liquids (e.g., fruit purees, yogurt, tomato paste). Hence, Option A is correct."
    })

    # Q35: FSEC 1M (Farm Structures - Greenhouse Solar Transmissivity)
    tau_gh = round(0.72 + (idx % 4) * 0.03, 2)
    i_solar = 800.0 # W/m2
    i_trans = round(tau_gh * i_solar, 1)
    qs.append({
        "qnum": 35,
        "section": "Farm Structures and Environmental Control",
        "topic": "Greenhouse Technology",
        "subtopic": "Solar Radiation Transmission in Controlled Environments",
        "type": "NAT",
        "marks": 1,
        "difficulty": "Moderate",
        "question": f"A single-span polyhouse covered with UV-stabilized low-density polyethylene (LDPE) sheet has a solar transmissivity of $\\tau = {tau_gh:.2f}$. If the total horizontal solar irradiance outside the greenhouse is {i_solar:.0f} W/m², the solar radiation transmitted into the canopy space is ______ W/m² (round off to 1 decimal place).",
        "options": {},
        "correct_answer": f"{i_trans - 1.0:.1f} to {i_trans + 1.0:.1f}",
        "solution": f"Transmitted solar radiation flux is:\n$$I_{{inside}} = \\tau \\times I_{{outside}} = {tau_gh} \\times {i_solar} = {i_trans}\\text{{ W/m}}^2$$\nThus, the transmitted solar radiation is {i_trans} W/m²."
    })

    return qs

def get_tech_2m_questions(mock_num):
    m = mock_num
    idx = m - 30
    qs = []

    # Q36: Engg Math 2M (Eigenvalues & Cayley-Hamilton Theorem)
    a = 2 + (idx % 3)
    b = 1
    c = 0
    d = 3 + (idx % 3)
    # Characteristic equation for [[a, 1], [0, d]]: (lambda - a)(lambda - d) = lambda^2 - (a+d)lambda + ad = 0
    trace_2m = a + d
    det_2m = a * d
    qs.append({
        "qnum": 36,
        "section": "Engineering Mathematics",
        "topic": "Linear Algebra",
        "subtopic": "Cayley-Hamilton Theorem and Matrix Powers",
        "type": "NAT",
        "marks": 2,
        "difficulty": "Hard",
        "question": f"Consider the matrix $A = \\begin{{pmatrix}} {a} & {b} \\\\ {c} & {d} \\end{{pmatrix}}$. By the Cayley-Hamilton theorem, $A^2 - \\alpha A + \\beta I = 0$, where $I$ is the $2 \\times 2$ identity matrix. The value of $(\\alpha + \\beta)$ is ______ (answer in integer).",
        "options": {},
        "correct_answer": f"{trace_2m + det_2m}",
        "solution": f"The characteristic equation of matrix $A$ is given by:\n$$\\det(A - \\lambda I) = 0$$\n$$\\det \\begin{{pmatrix}} {a} - \\lambda & {b} \\\\ {c} & {d} - \\lambda \\end{{pmatrix}} = ({a} - \\lambda)({d} - \\lambda) - 0 = \\lambda^2 - ({a} + {d})\\lambda + ({a} \\times {d}) = 0$$\n$$\\lambda^2 - {trace_2m}\\lambda + {det_2m} = 0$$\nBy the Cayley-Hamilton theorem, every square matrix satisfies its own characteristic equation:\n$$A^2 - {trace_2m}A + {det_2m}I = 0$$\nComparing with $A^2 - \\alpha A + \\beta I = 0$:\n$$\\alpha = {trace_2m},\\quad \\beta = {det_2m}$$\n$$\\alpha + \\beta = {trace_2m} + {det_2m} = {trace_2m + det_2m}$$\nThus, the integer answer is {trace_2m + det_2m}."
    })

    # Q37: Engg Math 2M (Vector Calculus - Green's Theorem)
    # Integral of (y^2 dx + x^2 dy) over boundary of triangle (0,0), (a,0), (0,a)
    side_tri = 2 + (idx % 4)
    # curl = (2x - 2y). Integral over triangle: int_0^a dx int_0^{a-x} (2x - 2y) dy
    # int_0^{a-x} (2x - 2y) dy = [2xy - y^2]_0^{a-x} = 2x(a-x) - (a-x)^2 = 2ax - 2x^2 - (a^2 - 2ax + x^2) = 4ax - 3x^2 - a^2
    # int_0^a (4ax - 3x^2 - a^2) dx = 2a^3 - a^3 - a^3 = 0.
    # Let's use F = (0 dx + x^2 dy) or F = (-y dx + x dy) so integral is 2 * Area
    area_tri = 0.5 * side_tri * side_tri
    greens_ans = round(2.0 * area_tri, 2)
    qs.append({
        "qnum": 37,
        "section": "Engineering Mathematics",
        "topic": "Vector Calculus",
        "subtopic": "Green's Theorem in the Plane",
        "type": "NAT",
        "marks": 2,
        "difficulty": "Hard",
        "question": f"Using Green's Theorem, evaluate the line integral $\\oint_C (-y\\,dx + x\\,dy)$ counterclockwise around the boundary $C$ of the right-angled triangular region with vertices at $(0,0)$, $({side_tri}, 0)$, and $(0, {side_tri})$. The value of the integral is ______ (answer in integer).",
        "options": {},
        "correct_answer": f"{int(greens_ans)}",
        "solution": f"By Green's Theorem in the plane:\n$$\\oint_C (P\\,dx + Q\\,dy) = \\iint_R \\left(\\frac{{\\partial Q}}{{\\partial x}} - \\frac{{\\partial P}}{{\\partial y}}\\right) dA$$\nHere $P = -y$ and $Q = x$:\n$$\\frac{{\\partial Q}}{{\\partial x}} - \\frac{{\\partial P}}{{\\partial y}} = 1 - (-1) = 2$$\nTherefore, the line integral becomes:\n$$\\oint_C (-y\\,dx + x\\,dy) = 2 \\iint_R dA = 2 \\times \\text{{Area}}(R)$$\nThe region $R$ is a right triangle with base $b = {side_tri}$ and height $h = {side_tri}$:\n$$\\text{{Area}}(R) = \\frac{{1}}{{2}} \\times {side_tri} \\times {side_tri} = {area_tri}$$\n$$\\oint_C (-y\\,dx + x\\,dy) = 2 \\times {area_tri} = {int(greens_ans)}$$\nThus, the integer answer is {int(greens_ans)}."
    })

    # Q38: Engg Math 2M (Differential Equations - Second Order ODE)
    w0 = 2 + (idx % 4)
    # y'' + w0^2 y = 0, y(0)=1, y'(0)=w0
    # y(t) = cos(w0 t) + sin(w0 t). Amplitude = sqrt(1^2 + 1^2) = sqrt(2) = 1.414
    amp_ans = 1.414
    qs.append({
        "qnum": 38,
        "section": "Engineering Mathematics",
        "topic": "Differential Equations",
        "subtopic": "Higher Order Linear Differential Equations",
        "type": "NAT",
        "marks": 2,
        "difficulty": "Hard",
        "question": f"The response of an agricultural machine vibration isolator satisfies the differential equation $\\frac{{d^2 y}}{{dt^2}} + {w0**2} y = 0$, subject to the initial conditions $y(0) = 1$ and $y'(0) = {w0}$. The peak amplitude of oscillation of $y(t)$ is ______ (round off to 2 decimal places).",
        "options": {},
        "correct_answer": "1.38 to 1.45",
        "solution": f"The general solution of $\\frac{{d^2 y}}{{dt^2}} + {w0**2} y = 0$ is:\n$$y(t) = C_1 \\cos({w0} t) + C_2 \\sin({w0} t)$$\nApplying initial conditions:\n$$y(0) = C_1 = 1$$\n$$y'(t) = -{w0} C_1 \\sin({w0} t) + {w0} C_2 \\cos({w0} t) \\implies y'(0) = {w0} C_2 = {w0} \\implies C_2 = 1$$\nSo, $y(t) = \\cos({w0} t) + \\sin({w0} t)$.\nThe amplitude $A$ of the combination $A_1 \\cos(\\omega t) + A_2 \\sin(\\omega t)$ is:\n$$A = \\sqrt{{C_1^2 + C_2^2}} = \\sqrt{{1^2 + 1^2}} = \\sqrt{{2}} \\approx 1.414$$\nRounding off to 2 decimal places gives 1.41."
    })

    # Q39: Engg Math 2M (Numerical Methods - Simpson's 1/3 Rule)
    h_step = 0.5
    # Integrate f(x) = x^3 from 0 to 1, h=0.5. x0=0, x1=0.5, x2=1.0
    # y0=0, y1=0.125, y2=1.0
    # I = (h/3) * (y0 + 4y1 + y2) = (0.5/3) * (0 + 4(0.125) + 1.0) = (0.5/3) * (0.5 + 1.0) = 0.5 * 1.5 / 3 = 0.25
    qs.append({
        "qnum": 39,
        "section": "Engineering Mathematics",
        "topic": "Numerical Methods",
        "subtopic": "Numerical Integration (Simpson's 1/3 Rule)",
        "type": "NAT",
        "marks": 2,
        "difficulty": "Hard",
        "question": f"Evaluating $\\int_0^1 x^3\\,dx$ numerically using Simpson's 1/3 rule with a step size of $h = 0.5$ yields a value of ______ (round off to 2 decimal places).",
        "options": {},
        "correct_answer": "0.24 to 0.26",
        "solution": "For $\\int_0^1 x^3 dx$ with step size $h = 0.5$:\nThe grid points and function values are:\n$x_0 = 0.0 \\implies y_0 = 0^3 = 0.0$\n$x_1 = 0.5 \\implies y_1 = (0.5)^3 = 0.125$\n$x_2 = 1.0 \\implies y_2 = (1.0)^3 = 1.0$\nBy Simpson's 1/3 rule:\n$$I = \\frac{h}{3} \\left[y_0 + 4 y_1 + y_2\\right] = \\frac{0.5}{3} \\left[0.0 + 4(0.125) + 1.0\\right] = \\frac{0.5}{3} [1.5] = 0.25$$\n(Notice: Simpson's 1/3 rule gives the exact result for polynomials up to degree 3, since the exact integral is $[x^4/4]_0^1 = 0.25$).\nThus, the answer is 0.25."
    })

    # Q40: Engg Math 2M (Probability - Poisson Distribution)
    lambda_p = 2.0 + (idx % 3) * 0.5
    # P(X = 2) = e^(-lambda) * lambda^2 / 2!
    p_two = round((math.exp(-lambda_p) * (lambda_p ** 2)) / 2.0, 4)
    qs.append({
        "qnum": 40,
        "section": "Engineering Mathematics",
        "topic": "Probability and Statistics",
        "subtopic": "Poisson Process and Applications",
        "type": "NAT",
        "marks": 2,
        "difficulty": "Hard",
        "question": f"The breakdown of micro-sprinkler emitters in a large precision orchard follows a Poisson distribution with an average failure rate of $\\lambda = {lambda_p:.1f}$ emitters per hectare per season. The probability that EXACTLY 2 emitters will fail in a given hectare is ______ (round off to 3 decimal places).",
        "options": {},
        "correct_answer": f"{p_two - 0.005:.3f} to {p_two + 0.005:.3f}",
        "solution": "The Poisson probability mass function is given by:\n$$P(X = k) = \\frac{e^{-\\lambda} \\lambda^k}{k!}$$\nFor $k = 2$ and $\\lambda = " + f"{lambda_p:.1f}" + ":\n$$P(X = 2) = \\frac{e^{-" + f"{lambda_p}" + "} (" + f"{lambda_p}" + ")^2}{2!} = " + f"{p_two:.3f}" + "$$\nRounding off to 3 decimal places gives " + f"{p_two:.3f}."
    })

    # Q41: FMP 2M (Tractor Mechanics - Dynamic Weight Transfer on Rear Axle)
    w_tractor = 24000.0 # N (~24 kN)
    wb = 2.2 # m (wheelbase)
    x_cg = 0.8 # m (ahead of rear axle)
    p_pull = 12000.0 # N (drawbar pull)
    h_draw = 0.45 # m (drawbar height)
    # Static rear weight: W_r_static = W * (wb - x_cg) / wb
    # Dynamic rear weight: W_r_dyn = W * (wb - x_cg)/wb + P_pull * h_draw / wb
    w_r_static = w_tractor * (wb - x_cg) / wb
    dwt = (p_pull * h_draw) / wb
    w_r_dyn = round(w_r_static + dwt, 1)
    qs.append({
        "qnum": 41,
        "section": "Farm Power and Machinery",
        "topic": "Farm Power",
        "subtopic": "Tractor Chassis Mechanics & Dynamic Weight Transfer",
        "type": "NAT",
        "marks": 2,
        "difficulty": "Hard",
        "question": f"A 2WD agricultural tractor of total weight $W = {w_tractor/1000:.1f}\\text{{ kN}}$ ({w_tractor:.0f} N) has a wheelbase of $L = {wb:.1f}\\text{{ m}}$. Its center of gravity (CG) is located at a horizontal distance of {x_cg:.1f} m ahead of the rear axle. During a heavy tillage pass, the tractor develops a horizontal drawbar pull of $P = {p_pull/1000:.1f}\\text{{ kN}}$ ({p_pull:.0f} N) at a drawbar hitch height of $H = {h_draw:.2f}\\text{{ m}}$ above the ground. Neglecting rolling resistance, the dynamic vertical load on the rear drive axle is ______ kN (round off to 2 decimal places).",
        "options": {},
        "correct_answer": f"{(w_r_dyn/1000) - 0.2:.2f} to {(w_r_dyn/1000) + 0.2:.2f}",
        "solution": f"Taking moments about the front tire contact point on level ground:\n$$R_r \\cdot L = W \\cdot (L - x_{{cg}}) + P \\cdot H$$\n$$R_r = W \\left(\\frac{{L - x_{{cg}}}}{{L}}\\right) + P \\left(\\frac{{H}}{{L}}\\right)$$\nStatic weight on rear axle:\n$$R_{{r,static}} = {w_tractor} \\times \\left(\\frac{{{wb} - {x_cg}}}{{{wb}}}\\right) = {w_tractor} \\times \\frac{{{round(wb - x_cg, 2)}}}{{{wb}}}\\approx {w_r_static:.1f}\\text{{ N}}$$\nDynamic weight transfer from front to rear:\n$$\\Delta W = \\frac{{P \\cdot H}}{{L}} = \\frac{{{p_pull} \\times {h_draw}}}{{{wb}}} = \\frac{{{round(p_pull * h_draw, 1)}}}{{{wb}}} \\approx {dwt:.1f}\\text{{ N}}$$\nTotal dynamic vertical rear load:\n$$R_r = {w_r_static:.1f} + {dwt:.1f} = {w_r_dyn:.1f}\\text{{ N}} = {w_r_dyn/1000:.2f}\\text{{ kN}}$$\nThus, the dynamic rear axle load is {w_r_dyn/1000:.2f} kN."
    })

    # Q42: FMP 2M (Tillage Mechanics - Draft & Power)
    n_bottom = 3
    w_bot = 35.0 # cm
    d_cut = 18.0 # cm
    v_kmh = 4.5 + (idx % 4) * 0.5 # km/h
    v_ms = v_kmh / 3.6
    spec_draft = 0.55 # kg/cm2 = 0.55 * 9.81 N/cm2 = 5.3955 N/cm2
    tot_area = n_bottom * w_bot * d_cut # cm2
    draft_n = tot_area * spec_draft * 9.81 # N
    drawbar_kw = round((draft_n * v_ms) / 1000, 2)
    qs.append({
        "qnum": 42,
        "section": "Farm Power and Machinery",
        "topic": "Farm Machinery",
        "subtopic": "Mechanics of Tillage Tools (Draft and Power)",
        "type": "NAT",
        "marks": 2,
        "difficulty": "Hard",
        "question": f"A 3-bottom mouldboard plow has a bottom width of {w_bot:.0f} cm and operates at a depth of cut of {d_cut:.0f} cm. The specific draft of the soil is 0.55 kg/cm² ($g = 9.81\\text{{ m/s}}^2$). If the forward speed of plowing is {v_kmh:.1f} km/h, the drawbar power required to pull the plow is ______ kW (round off to 2 decimal places).",
        "options": {},
        "correct_answer": f"{drawbar_kw - 0.3:.2f} to {drawbar_kw + 0.3:.2f}",
        "solution": f"Total furrow cross-sectional area:\n$$A = n \\times W \\times D = 3 \\times {w_bot} \\times {d_cut} = {tot_area}\\text{{ cm}}^2$$\nTotal draft force $D_p$:\n$$D_p = A \\times \\text{{Specific Draft}} = {tot_area}\\text{{ cm}}^2 \\times (0.55 \\times 9.81\\text{{ N/cm}}^2) = {tot_area} \\times 5.3955 \\approx {draft_n:.1f}\\text{{ N}}$$\nForward velocity $v$ in m/s:\n$$v = \\frac{{{v_kmh}}}{{3.6}} = {v_ms:.3f}\\text{{ m/s}}$$\nDrawbar power:\n$$P_{{db}} = \\frac{{D_p \\times v}}{{1000}} = \\frac{{{draft_n:.1f} \\times {v_ms:.3f}}}{{1000}} \\approx {drawbar_kw}\\text{{ kW}}$$\nThus, the drawbar power is {drawbar_kw} kW."
    })

    # Q43: FMP 2M (Planetary Gear Trains in Tractors)
    teeth_sun = 18
    teeth_ring = 72
    # Planet carrier arm is driven, ring is fixed. Ratio = 1 + Teeth_ring / Teeth_sun = 1 + 72/18 = 1 + 4 = 5
    ratio_epi = 1 + (teeth_ring // teeth_sun)
    qs.append({
        "qnum": 43,
        "section": "Farm Power and Machinery",
        "topic": "Farm Power",
        "subtopic": "Epicyclic Gear Trains in Tractor Final Drives",
        "type": "NAT",
        "marks": 2,
        "difficulty": "Hard",
        "question": f"A tractor final drive utilizes a planetary reduction gear set where the annular ring gear (72 teeth) is held stationary and the central sun gear (18 teeth) is driven by the differential shaft. The planet carrier arm drives the final drive axle. The speed reduction ratio (input speed / output speed) of this planetary unit is ______ (answer in integer).",
        "options": {},
        "correct_answer": f"{ratio_epi}",
        "solution": f"In an epicyclic gear train with fixed ring gear $R$ and input at sun gear $S$, output at planet carrier $C$:\nLet $\\omega_R = 0$.\nRelative angular velocity relation:\n$$\\frac{{\\omega_S - \\omega_C}}{{\\omega_R - \\omega_C}} = -\\frac{{T_R}}{{T_S}}$$\nSince $\\omega_R = 0$:\n$$\\frac{{\\omega_S - \\omega_C}}{{-\\omega_C}} = -\\frac{{T_R}}{{T_S}} \\implies \\frac{{\\omega_S}}{{\\omega_C}} - 1 = \\frac{{T_R}}{{T_S}}$$\n$$\\text{{Speed Ratio}} = \\frac{{\\omega_S}}{{\\omega_C}} = 1 + \\frac{{T_R}}{{T_S}} = 1 + \\frac{{72}}{{18}} = 1 + 4 = {ratio_epi}$$\nThus, the speed reduction ratio is {ratio_epi}."
    })

    # Q44: FMP 2M (NEW SYLLABUS: Agricultural Drones / UAV Battery & Mission Flight Endurance)
    bat_mah = 22000 # mAh = 22 Ah
    bat_v = 44.4 # V (12S LiPo)
    discharge_depth = 0.80 # 80% DOD (safe discharge)
    total_power_w = 2800.0 + (idx % 5) * 100 # W
    # Usable energy Wh = 22 Ah * 44.4 V * 0.80 = 781.44 Wh
    # Time in hours = Wh / W. Time in minutes = (Wh / W) * 60
    usable_wh = (bat_mah / 1000.0) * bat_v * discharge_depth
    t_flight_min = round((usable_wh / total_power_w) * 60, 2)
    qs.append({
        "qnum": 44,
        "section": "Farm Power and Machinery",
        "topic": "Farm Machinery",
        "subtopic": "Agricultural Drones (UAV Mission & Energy Dynamics)",
        "type": "NAT",
        "marks": 2,
        "difficulty": "Hard",
        "question": f"A hexacopter agricultural spraying drone carries a 16 kg gross all-up weight during crop protection flight. It is powered by a 12S LiPo smart battery pack rated at 22,000 mAh and a nominal voltage of 44.4 V. During autonomous spraying flight, all six brushless DC motors draw a continuous combined electrical power of {total_power_w:.0f} W. To preserve battery cycle life, the maximum depth of discharge (DOD) is constrained to 80% (20% reserve remaining). The maximum safe mission flight endurance is ______ minutes (round off to 2 decimal places).",
        "options": {},
        "correct_answer": f"{t_flight_min - 0.3:.2f} to {t_flight_min + 0.3:.2f}",
        "solution": f"Battery total energy capacity:\n$$E_{{total}} = \\text{{Capacity (Ah)}} \\times \\text{{Voltage (V)}} = 22.0\\text{{ Ah}} \\times 44.4\\text{{ V}} = {round(22 * 44.4, 2)}\\text{{ Wh}}$$\nUsable energy at 80% Depth of Discharge (DOD):\n$$E_{{usable}} = E_{{total}} \\times 0.80 = {usable_wh:.2f}\\text{{ Wh}}$$\nAverage electrical power consumption $P = {total_power_w:.0f}\\text{{ W}}$.\nFlight endurance $t$ in hours:\n$$t = \\frac{{E_{{usable}}}}{{P}} = \\frac{{{usable_wh:.2f}}}{{{total_power_w:.0f}}} = {usable_wh / total_power_w:.4f}\\text{{ hours}}$$\nConverting to minutes:\n$$t_{{minutes}} = {usable_wh / total_power_w:.4f} \\times 60 \\approx {t_flight_min}\\text{{ minutes}}$$\nThus, the safe flight endurance is {t_flight_min} minutes."
    })

    # Q45: FMP 2M (NEW SYLLABUS: Solar PV Agricultural Water Pumping System)
    q_pump_lps = 6.0 # L/s = 0.006 m3/s
    h_dyn = 35.0 # m total dynamic head
    rho_w = 1000.0 # kg/m3
    g_acc = 9.81
    # Hydraulic power = rho * g * Q * H
    p_hyd_w = rho_w * g_acc * (q_pump_lps / 1000.0) * h_dyn
    eta_mp = 0.65 # Motor-pump subsystem efficiency
    eta_pv = 0.85 # BOS and temperature derating
    p_pv_array_kw = round((p_hyd_w / (eta_mp * eta_pv)) / 1000.0, 2)
    qs.append({
        "qnum": 45,
        "section": "Farm Power and Machinery",
        "topic": "Farm Power",
        "subtopic": "Solar PV Water Pumping System Design",
        "type": "NAT",
        "marks": 2,
        "difficulty": "Hard",
        "question": f"A standalone solar photovoltaic (SPV) drip irrigation pumping system is designed to deliver a continuous water flow rate of {q_pump_lps:.1f} L/s against a total dynamic head of {h_dyn:.1f} m ($g = 9.81\\text{{ m/s}}^2$, $\\rho = 1000\\text{{ kg/m}}^3$). The combined wire-to-water efficiency of the submersible inverter-motor-pump set is 65%, and the overall solar array derating factor (due to temperature and wiring losses) is 0.85. The minimum required peak solar PV array rating is ______ kWp (round off to 2 decimal places).",
        "options": {},
        "correct_answer": f"{p_pv_array_kw - 0.15:.2f} to {p_pv_array_kw + 0.15:.2f}",
        "solution": f"Hydraulic power required to lift water:\n$$P_{{hyd}} = \\rho g Q H = 1000 \\times 9.81 \\times \\left(\\frac{{{q_pump_lps}}}{{1000}}\\right) \\times {h_dyn} = 9.81 \\times {q_pump_lps} \\times {h_dyn} = {p_hyd_w:.2f}\\text{{ W}}$$\nPower required at motor-pump input:\n$$P_{{elec}} = \\frac{{P_{{hyd}}}}{{\\eta_{{mp}}}} = \\frac{{{p_hyd_w:.2f}}}{{0.65}} \\approx {p_hyd_w / 0.65:.2f}\\text{{ W}}$$\nFactoring in balance-of-system (BOS) and temperature derating factor (0.85):\n$$P_{{PV,peak}} = \\frac{{P_{{elec}}}}{{0.85}} = \\frac{{{p_hyd_w / 0.65:.2f}}}{{0.85}} = {p_hyd_w / (0.65 * 0.85):.2f}\\text{{ W}} \\approx {p_pv_array_kw}\\text{{ kWp}}$$\nThus, the peak array rating is {p_pv_array_kw} kWp."
    })

    # Q46: FMP 2M (Harvesting & Threshing - Aerodynamic Grain Cleaning MSQ)
    qs.append({
        "qnum": 46,
        "section": "Farm Power and Machinery",
        "topic": "Farm Machinery",
        "subtopic": "Grain Threshing and Aerodynamic Separation",
        "type": "MSQ",
        "marks": 2,
        "difficulty": "Hard",
        "question": "In the cleaning shoe of a combine harvester, aerodynamic separation is utilized to segregate cleaned paddy grain from chaff and straw bits. Which of the following statements is/are CORRECT?",
        "options": {
            "A": "The air blast velocity through the sieves must be maintained strictly greater than the terminal velocity of the chaff but less than the terminal velocity of the grain.",
            "B": "If the fan air blast velocity exceeds the terminal velocity of the grain, heavy grain loss occurs over the shoe into the field.",
            "C": "Terminal velocity of a seed increases when its sphericity and moisture content increase, holding density constant.",
            "D": "Chaff has a higher aerodynamic drag coefficient and a significantly lower terminal velocity than sound cereal grain."
        },
        "correct_answer": "A, B, D",
        "solution": "1. Statement A is the governing principle of pneumatic grain-chaff winnowing: $V_{t,chaff} < V_{air} < V_{t,grain}$. (CORRECT)\n2. Statement B: If $V_{air} > V_{t,grain}$, aerodynamic drag overcomes gravity, blowing sound grain out with the chaff, causing severe walker/shoe loss. (CORRECT)\n3. Statement C: Increasing sphericity reduces the drag coefficient, but increasing moisture content can alter weight and projected area complexly; furthermore, aerodynamic drag increases with projected area. However, C is false in general context of aerodynamic sorting where shape and frontal area dominate.\n4. Statement D: Chaff has a large flat surface area with high drag coefficient ($C_d$) and low density, giving it a much lower terminal velocity (1.5 - 3.5 m/s) compared to sound cereal grain (8 - 12 m/s). (CORRECT)\nThus, A, B, and D are correct."
    })

    # Q47: FMP 2M (Tractor Ergonomics - Decibel Addition NAT)
    # L1 = 85 dB, L2 = 85 dB => 85 + 10 log10(2) = 88.01 dB
    # With L3 = 82 dB: 10 * log10(10^8.5 + 10^8.5 + 10^8.2) = 10 * log10(2 * 10^8.5 + 10^8.2) = 10 * log10(632455532 + 158489319) = 88.98 dB
    spl_total = 89.0
    qs.append({
        "qnum": 47,
        "section": "Farm Power and Machinery",
        "topic": "Farm Power",
        "subtopic": "Tractor Ergonomics & Operator Noise Exposure",
        "type": "NAT",
        "marks": 2,
        "difficulty": "Hard",
        "question": "At the operator's ear level in a non-cab agricultural tractor cabin, three distinct acoustic sources contribute sound pressure levels: the diesel engine exhaust produces $L_1 = 85.0\\text{{ dBA}}$, the hydraulic high-pressure gear pump produces $L_2 = 85.0\\text{{ dBA}}$, and the mechanical transmission produces $L_3 = 82.0\\text{{ dBA}}$. The composite sound pressure level at the operator station is ______ dBA (round off to 1 decimal place).",
        "options": {},
        "correct_answer": "88.8 to 89.2",
        "solution": "Sound pressure levels (decibels) add logarithmically based on acoustic energy:\n$$L_{{total}} = 10 \\log_{{10}} \\left( \\sum_{{i=1}}^n 10^{{L_i / 10}} \\right)$$\n$$L_{{total}} = 10 \\log_{{10}} \\left( 10^{{8.5}} + 10^{{8.5}} + 10^{{8.2}} \\right)$$\n$$10^{{8.5}} \\approx 316,227,766$$\n$$10^{{8.5}} + 10^{{8.5}} = 632,455,532$$\n$$10^{{8.2}} \\approx 158,489,319$$\n$$\\text{{Sum}} = 790,944,851$$\n$$L_{{total}} = 10 \\log_{{10}}(790,944,851) = 10 \\times 8.8981 \\approx 89.0\\text{{ dBA}}$$\nThus, the total sound pressure level is 89.0 dBA."
    })

    # Q48: SWCE 2M (Unit Hydrograph - S-Curve Conversion)
    qs.append({
        "qnum": 48,
        "section": "Soil and Water Conservation Engineering",
        "topic": "Watershed Hydrology",
        "subtopic": "Unit Hydrograph & S-Curve Technique",
        "type": "NAT",
        "marks": 2,
        "difficulty": "Hard",
        "question": "A 4-hour unit hydrograph (UH) for an agricultural watershed has a peak discharge of $Q_{p4} = 60\\text{{ m}}^3/\\text{{s}}$. The catchment area is $A = 216\\text{{ km}}^2$. If an S-curve is synthesized by continuously staggering this 4-hour UH, the steady equilibrium discharge ($S_\\infty$) reached by the S-curve is ______ $\\text{{m}}^3/\\text{{s}}$ (answer in integer).",
        "options": {},
        "correct_answer": "150",
        "solution": "The equilibrium discharge of an S-curve represents constant runoff from continuous effective rainfall of 1 cm per $D$ hours:\n$$S_\\infty = \\frac{{A \\times (1\\text{{ cm}})}}{{D\\text{{ hours}}}}$$\nConverting units ($A = 216\\text{{ km}}^2 = 216 \\times 10^6\\text{{ m}}^2$, $1\\text{{ cm}} = 0.01\\text{{ m}}$, $D = 4\\text{{ hours}} = 4 \\times 3600 = 14400\\text{{ s}}$):\n$$S_\\infty = \\frac{{216 \\times 10^6 \\times 0.01}}{{14400}} = \\frac{{2,160,000}}{{14400}} = 150\\text{{ m}}^3/\\text{{s}}$$\nAlternatively, using the standard formula $S_\\infty = 2.778 \\frac{A}{D}$:\n$$S_\\infty = 2.778 \\times \\frac{216}{4} = 2.778 \\times 54 = 150.012 \\approx 150\\text{{ m}}^3/\\text{{s}}$$\nThus, the equilibrium discharge is 150 $\\text{{m}}^3/\\text{{s}}$."
    })

    # Q49: SWCE 2M (SCS-CN Method with AMC Variations)
    cn_ii = 75
    # Potential retention S = (25400 / CN) - 254
    s_ret = (25400.0 / cn_ii) - 254.0 # mm
    # P_rain = 120 mm
    p_rain = 120.0
    ia = 0.2 * s_ret
    # Runoff Q = (P - Ia)^2 / (P - Ia + S)
    q_scs = round(((p_rain - ia) ** 2) / (p_rain - ia + s_ret), 2)
    qs.append({
        "qnum": 49,
        "section": "Soil and Water Conservation Engineering",
        "topic": "Watershed Hydrology",
        "subtopic": "SCS Curve Number Method & Runoff Estimation",
        "type": "NAT",
        "marks": 2,
        "difficulty": "Hard",
        "question": f"An agricultural watershed has an SCS Curve Number of $CN_{{II}} = {cn_ii}$ under average Antecedent Moisture Conditions (AMC II). Taking the initial abstraction ratio as $\\lambda = 0.2$ ($I_a = 0.2 S$), calculate the direct surface runoff depth generated by a 24-hour storm of total rainfall $P = {p_rain:.0f}\\text{{ mm}}$. The runoff depth is ______ mm (round off to 2 decimal places).",
        "options": {},
        "correct_answer": f"{q_scs - 0.5:.2f} to {q_scs + 0.5:.2f}",
        "solution": f"Potential maximum retention $S$ in mm:\n$$S = \\frac{{25400}}{{CN}} - 254 = \\frac{{25400}}{{{cn_ii}}} - 254 = {25400/cn_ii:.2f} - 254 = {s_ret:.2f}\\text{{ mm}}$$\nInitial abstraction:\n$$I_a = 0.2 S = 0.2 \\times {s_ret:.2f} = {ia:.2f}\\text{{ mm}}$$\nSince $P = {p_rain} > I_a$, direct surface runoff occurs:\n$$Q = \\frac{{(P - I_a)^2}}{{P - I_a + S}} = \\frac{{({p_rain} - {ia:.2f})^2}}{{{p_rain} - {ia:.2f} + {s_ret:.2f}}}$$\n$$(P - I_a) = {p_rain - ia:.2f}\\text{{ mm}}$$\n$$(P - I_a)^2 = {round((p_rain - ia)**2, 2)}$$\n$$(P - I_a + S) = {round(p_rain - ia + s_ret, 2)}$$\n$$Q = \\frac{{{round((p_rain - ia)**2, 2)}}}{{{round(p_rain - ia + s_ret, 2)}}} = {q_scs}\\text{{ mm}}$$\nThus, the direct runoff depth is {q_scs} mm."
    })

    # Q50: SWCE 2M (Hydraulic Jump & Energy Dissipation)
    y1 = 0.30 # m
    v1 = 6.0 # m/s
    fr1 = round(v1 / math.sqrt(9.81 * y1), 2)
    # y2 = (y1/2) * (sqrt(1 + 8 Fr1^2) - 1)
    y2 = round((y1 / 2.0) * (math.sqrt(1 + 8 * (fr1 ** 2)) - 1), 2)
    qs.append({
        "qnum": 50,
        "section": "Soil and Water Conservation Engineering",
        "topic": "Soil Conservation Structures",
        "subtopic": "Hydraulic Jump Stilling Basin Hydraulics",
        "type": "NAT",
        "marks": 2,
        "difficulty": "Hard",
        "question": f"Water shoots over the apron of a concrete chute spillway at an initial supercritical flow depth of $y_1 = {y1:.2f}\\text{{ m}}$ with a velocity of $V_1 = {v1:.2f}\\text{{ m/s}}$ ($g = 9.81\\text{{ m/s}}^2$). The sequent (subcritical) depth $y_2$ after the formation of the hydraulic jump is ______ m (round off to 2 decimal places).",
        "options": {},
        "correct_answer": f"{y2 - 0.08:.2f} to {y2 + 0.08:.2f}",
        "solution": f"Initial Froude number before jump:\n$$Fr_1 = \\frac{{V_1}}{{\\sqrt{{g y_1}}}} = \\frac{{{v1}}}{{\\sqrt{{9.81 \\times {y1}}}}} = \\frac{{{v1}}}{{\\sqrt{{{round(9.81*y1, 4)}}}}} = \\frac{{{v1}}}{{{round(math.sqrt(9.81*y1), 3)}}} \\approx {fr1}$$\nBy the Belanger equation for hydraulic jump in a rectangular horizontal channel:\n$$\\frac{{y_2}}{{y_1}} = \\frac{{1}}{{2}} \\left( \\sqrt{{1 + 8 Fr_1^2}} - 1 \\right)$$\n$$y_2 = \\frac{{{y1}}}{{2}} \\left( \\sqrt{{1 + 8 ({fr1})^2}} - 1 \\right) = 0.15 \\times \\left( \\sqrt{{1 + 8 \\times {round(fr1**2, 2)}}} - 1 \\right)$$\n$$y_2 \\approx {y2}\\text{{ m}}$$\nThus, the sequent depth is {y2} m."
    })

    # Q51: SWCE 2M (Sediment Yield & Reservoir Trapping Efficiency)
    cap_inflow = round(0.20 + (idx % 5) * 0.05, 2)
    # Using Brune's empirical curve equation for median sediment trap efficiency:
    # E = C_inflow / (0.012 + 1.02 * C_inflow) or simplified approximation
    trap_eff = round((cap_inflow / (0.012 + 1.02 * cap_inflow)) * 100, 1)
    qs.append({
        "qnum": 51,
        "section": "Soil and Water Conservation Engineering",
        "topic": "Soil Erosion and Conservation",
        "subtopic": "Reservoir Sedimentation and Trap Efficiency",
        "type": "NAT",
        "marks": 2,
        "difficulty": "Hard",
        "question": f"A water harvesting reservoir has a storage capacity-to-mean annual inflow ratio ($C/I$) of {cap_inflow:.2f}. Using Brune's median curve equation for reservoir trap efficiency $\\eta_t = \\left( \\frac{{C/I}}{{0.012 + 1.02 (C/I)}} \\right) \\times 100$, the percentage of incoming sediment trapped in the reservoir is ______ % (round off to 1 decimal place).",
        "options": {},
        "correct_answer": f"{trap_eff - 0.5:.1f} to {trap_eff + 0.5:.1f}",
        "solution": f"Brune's empirical relationship for median trapping efficiency:\n$$\\eta_t = \\frac{{C/I}}{{0.012 + 1.02 (C/I)}} \\times 100$$\nGiven $C/I = {cap_inflow}$:\n$$\\text{{Denominator}} = 0.012 + 1.02 ({cap_inflow}) = 0.012 + {round(1.02 * cap_inflow, 4)} = {round(0.012 + 1.02*cap_inflow, 4)}$$\n$$\\eta_t = \\frac{{{cap_inflow}}}{{{round(0.012 + 1.02*cap_inflow, 4)}}} \\times 100 = {trap_eff}\\%$$\nThus, the sediment trap efficiency is {trap_eff}%."
    })

    # Q52: SWCE 2M (Terracing & Bunding - Earthwork Volume)
    slope_s = 4.0 # %
    vi_m = round(1.2 + (idx % 4) * 0.1, 2)
    hi_m = round((vi_m / slope_s) * 100, 1) # Horizontal interval
    # Length of bund per ha = 10,000 / HI
    l_bund = 10000.0 / hi_m
    # Bund cross section area = 0.5 * (top + bottom) * height
    # top = 0.5m, bot = 1.5m, h = 0.6m => A = 0.5 * (0.5 + 1.5) * 0.6 = 0.6 m2
    a_x = 0.60
    vol_ha = round(l_bund * a_x, 1)
    qs.append({
        "qnum": 52,
        "section": "Soil and Water Conservation Engineering",
        "topic": "Soil Conservation Structures",
        "subtopic": "Terracing & Contour Bunding Design (Earthwork Volume)",
        "type": "NAT",
        "marks": 2,
        "difficulty": "Hard",
        "question": f"Contour bunds are constructed on agricultural land having a land slope of {slope_s:.1f}%. The vertical interval (VI) between successive contour bunds is {vi_m:.2f} m. The trapezoidal cross-sectional area of each bund is {a_x:.2f} m². The total volume of earthwork required per hectare of land is ______ m³/ha (round off to 1 decimal place).",
        "options": {},
        "correct_answer": f"{vol_ha - 1.0:.1f} to {vol_ha + 1.0:.1f}",
        "solution": f"Horizontal interval (HI) between bunds:\n$$HI = \\frac{{VI}}{{S}} \\times 100 = \\frac{{{vi_m}}}{{{slope_s}}} \\times 100 = {hi_m}\\text{{ m}}$$\nTotal length of bunds per hectare ($1\\text{{ ha}} = 10,000\\text{{ m}}^2$):\n$$L = \\frac{{10,000}}{{HI}} = \\frac{{10,000}}{{{hi_m}}} \\approx {l_bund:.2f}\\text{{ m/ha}}$$\nVolume of earthwork per hectare:\n$$V = L \\times A = {l_bund:.2f} \\times {a_x} = {vol_ha}\\text{{ m}}^3/\\text{{ha}}$$\nThus, the required volume of earthwork is {vol_ha} m³/ha."
    })

    # Q53: SWCE 2M (NEW SYLLABUS: GIS, DEM & Advanced Hydrology MSQ)
    qs.append({
        "qnum": 53,
        "section": "Soil and Water Conservation Engineering",
        "topic": "Geomatics & Watershed Remote Sensing",
        "subtopic": "Digital Elevation Models (DEM) & Hydrological Flow Routing",
        "type": "MSQ",
        "marks": 2,
        "difficulty": "Hard",
        "question": "In digital watershed delineation using high-resolution Digital Elevation Models (DEMs) and Geographic Information Systems (GIS), which of the following statements is/are CORRECT?",
        "options": {
            "A": "The single-direction D8 algorithm assigns water flow from each grid cell to exactly ONE of its eight nearest neighbors along the steepest downward slope.",
            "B": "Pit (sink) filling is a prerequisite preprocessing step to prevent discontinuous stream network terminations caused by spurious local elevation depressions.",
            "C": "Flow accumulation counts the number of upstream cells draining into each respective target cell, where stream initiation thresholds define channel heads.",
            "D": "Bilinear interpolation of raster elevation data always preserves absolute ridge elevations and peak heights better than cubic convolution."
        },
        "correct_answer": "A, B, C",
        "solution": "1. Statement A: The classic D8 algorithm evaluates 8 adjacent neighbors and directs 100% of the flow to the steepest descent neighbor ($\Delta E / \text{distance}$). (CORRECT)\n2. Statement B: Real-world radar and lidar DEMs contain spurious digital depression pits; without filling them, simulated flow would get trapped and disrupt topological watershed connectivity. (CORRECT)\n3. Statement C: Flow accumulation computes upslope contributing area; when accumulation exceeds a user-defined threshold $A_c$, a perennial/ephemeral stream channel is initiated. (CORRECT)\n4. Statement D: Bilinear interpolation smooths and dampens sharp extreme peaks; it does not preserve peaks better than spline or higher-order polynomials. (INCORRECT)\nTherefore, A, B, and C are correct."
    })

    # Q54: IDE 2M (Well Hydraulics - Unsteady Confined Aquifer Cooper-Jacob)
    # T = 600 m2/day, S = 0.0004, Q = 1440 m3/day = 60 m3/h. Drawdown s = (2.3 Q / 4 pi T) * log10(2.25 T t / r^2 S)
    # Let's parameterize nicely:
    t_trans = 500.0 # m2/day
    s_stor = 0.0005
    q_well = 1200.0 # m3/day
    r_obs = 50.0 # m
    t_days = 2.0 # days
    # u = r^2 S / (4 T t) = (2500 * 0.0005) / (4 * 500 * 2) = 1.25 / 4000 = 0.0003125 (u < 0.01, so Cooper-Jacob valid!)
    # s = (Q / 4 pi T) * ln(2.25 T t / r^2 S)
    u_val = (r_obs ** 2 * s_stor) / (4 * t_trans * t_days)
    arg_log = 2.25 * t_trans * t_days / (r_obs ** 2 * s_stor)
    drawdown_m = round((q_well / (4 * math.pi * t_trans)) * math.log(arg_log), 2)
    qs.append({
        "qnum": 54,
        "section": "Irrigation and Drainage Engineering",
        "topic": "Groundwater Hydrology and Well Hydraulics",
        "subtopic": "Unsteady Flow to a Well in a Confined Aquifer (Theis/Cooper-Jacob)",
        "type": "NAT",
        "marks": 2,
        "difficulty": "Hard",
        "question": f"A fully penetrating agricultural production well pumps continuously at a constant discharge of $Q = {q_well:.0f}\\text{{ m}}^3/\\text{{day}}$ from a confined aquifer of transmissivity $T = {t_trans:.0f}\\text{{ m}}^2/\\text{{day}}$ and storativity $S = {s_stor}$. Using the Cooper-Jacob approximation, the drawdown observed at an observation well located at a radial distance of $r = {r_obs:.0f}\\text{{ m}}$ after $t = {t_days:.0f}\\text{{ days}}$ of continuous pumping is ______ m (round off to 2 decimal places).",
        "options": {},
        "correct_answer": f"{drawdown_m - 0.1:.2f} to {drawdown_m + 0.1:.2f}",
        "solution": f"Check validity of the Cooper-Jacob approximation:\n$$u = \\frac{{r^2 S}}{{4 T t}} = \\frac{{({r_obs})^2 \\times {s_stor}}}{{4 \\times {t_trans} \\times {t_days}}} = \\frac{{{r_obs**2 * s_stor}}}{{4000}} = {u_val:.6f} < 0.01\\quad\\text{{(Valid)}}$$\nCooper-Jacob drawdown formula:\n$$s = \\frac{{Q}}{{4 \\pi T}} \\ln\\left( \\frac{{2.25 T t}}{{r^2 S}} \\right)$$\n$$\\text{{Argument}} = \\frac{{2.25 \\times {t_trans} \\times {t_days}}}{{({r_obs})^2 \\times {s_stor}}} = \\frac{{{2.25 * t_trans * t_days}}}{{{r_obs**2 * s_stor}}} = {arg_log:.2f}$$\n$$\\ln({arg_log:.2f}) \\approx {math.log(arg_log):.4f}$$\n$$s = \\frac{{{q_well}}}{{4 \\times \\pi \\times {t_trans}}} \\times {math.log(arg_log):.4f} = \\frac{{{q_well}}}{{{round(4 * math.pi * t_trans, 2)}}} \\times {math.log(arg_log):.4f} = {drawdown_m}\\text{{ m}}$$\nThus, the drawdown is {drawdown_m} m."
    })

    # Q55: IDE 2M (Micro-irrigation - Emission Uniformity EU)
    cv_manuf = 0.06
    q_min_lph = 3.6 # L/h
    q_avg_lph = 4.0 # L/h
    # EU = 100 * [1 - 1.27 * CV] * (q_min / q_avg)
    eu_val = round(100.0 * (1.0 - 1.27 * cv_manuf) * (q_min_lph / q_avg_lph), 1)
    qs.append({
        "qnum": 55,
        "section": "Irrigation and Drainage Engineering",
        "topic": "Micro-Irrigation Engineering",
        "subtopic": "Drip Irrigation Emission Uniformity (EU)",
        "type": "NAT",
        "marks": 2,
        "difficulty": "Hard",
        "question": f"A field evaluation of a drip irrigation subunit shows that the minimum emitter flow rate observed in the lowest 25% quadrant is $q_{{min}} = {q_min_lph:.2f}\\text{{ L/h}}$, and the average emitter discharge across the subunit is $q_{{avg}} = {q_avg_lph:.2f}\\text{{ L/h}}$. The manufacturer's coefficient of discharge variation is $CV = {cv_manuf:.2f}$. Using Keller and Karmeli's design equation $EU = 100 \\left(1 - 1.27 CV\\right) \\frac{{q_{{min}}}}{{q_{{avg}}}}$, the emission uniformity of the subunit is ______ % (round off to 1 decimal place).",
        "options": {},
        "correct_answer": f"{eu_val - 0.5:.1f} to {eu_val + 0.5:.1f}",
        "solution": f"Keller and Karmeli emission uniformity equation:\n$$EU = 100 \\left(1 - 1.27 CV\\right) \\frac{{q_{{min}}}}{{q_{{avg}}}}$$\nGiven $CV = {cv_manuf}$, $q_{{min}} = {q_min_lph}\\text{{ L/h}}$, $q_{{avg}} = {q_avg_lph}\\text{{ L/h}}$:\n$$1 - 1.27 \\times {cv_manuf} = 1 - {1.27 * cv_manuf:.4f} = {1 - 1.27*cv_manuf:.4f}$$\n$$\\frac{{q_{{min}}}}{{q_{{avg}}}} = \\frac{{{q_min_lph}}}{{{q_avg_lph}}} = {q_min_lph / q_avg_lph:.3f}$$\n$$EU = 100 \\times {1 - 1.27*cv_manuf:.4f} \\times {q_min_lph / q_avg_lph:.3f} = {eu_val}\\%$$\nThus, the emission uniformity is {eu_val}%."
    })

    # Q56: IDE 2M (Subsurface Drainage - Glover-Dumm Transient Analysis)
    # Drain spacing L = 40m, K = 1.0 m/day, mu = 0.05 (drainable porosity), de = 2.0 m
    # Reaction factor alpha = pi^2 * K * de / (mu * L^2)
    l_sp = 40.0
    k_hyd = 1.2
    mu_por = 0.06
    d_eq = 2.5
    alpha_d = round((math.pi ** 2 * k_hyd * d_eq) / (mu_por * (l_sp ** 2)), 4)
    qs.append({
        "qnum": 56,
        "section": "Irrigation and Drainage Engineering",
        "topic": "Drainage Engineering",
        "subtopic": "Transient Subsurface Drainage (Glover-Dumm Equation)",
        "type": "NAT",
        "marks": 2,
        "difficulty": "Hard",
        "question": f"In Glover-Dumm unsteady drainage design, parallel tile drains are installed at a spacing of $L = {l_sp:.0f}\\text{{ m}}$. The soil hydraulic conductivity is $K = {k_hyd:.1f}\\text{{ m/day}}$, drainable porosity is $\\mu = {mu_por:.2f}$, and the equivalent depth to the impermeable layer is $d_e = {d_eq:.1f}\\text{{ m}}$. The drainage reaction factor $\\alpha$ (in $\\text{{day}}^{{-1}}$) defined by $\\alpha = \\frac{{\\pi^2 K d_e}}{{\\mu L^2}}$ is ______ $\\text{{day}}^{{-1}}$ (round off to 4 decimal places).",
        "options": {},
        "correct_answer": f"{alpha_d - 0.002:.4f} to {alpha_d + 0.002:.4f}",
        "solution": f"The Glover-Dumm drainage reaction factor $\\alpha$ governs the exponential rate of water table recession midway between drains:\n$$\\alpha = \\frac{{\\pi^2 K d_e}}{{\\mu L^2}}$$\nSubstituting the parameters:\n$$\\pi^2 \\approx 9.8696$$\n$$\\text{{Numerator}} = 9.8696 \\times {k_hyd} \\times {d_eq} = {round(9.8696 * k_hyd * d_eq, 4)}$$\n$$\\text{{Denominator}} = {mu_por} \\times ({l_sp})^2 = {mu_por} \\times {l_sp**2} = {round(mu_por * (l_sp**2), 2)}$$\n$$\\alpha = \\frac{{{round(9.8696 * k_hyd * d_eq, 4)}}}{{{round(mu_por * (l_sp**2), 2)}}} = {alpha_d}\\text{{ day}}^{{-1}}$$\nThus, the reaction factor is {alpha_d} day⁻¹."
    })

    # Q57: IDE 2M (Canal Design - Lacey's Regime Theory)
    q_canal = 25.0 + (idx % 4) * 5.0 # m3/s
    f_lacey = 1.0 # silt factor
    # Regime perimeter P = 4.75 * sqrt(Q)
    p_regime = round(4.75 * math.sqrt(q_canal), 2)
    # Regime slope S = f^(5/3) / (3340 * Q^(1/6))
    s_inv = round((3340.0 * (q_canal ** (1.0 / 6.0))) / (f_lacey ** (5.0 / 3.0)), 0)
    qs.append({
        "qnum": 57,
        "section": "Irrigation and Drainage Engineering",
        "topic": "Canal Design and Water Conveyance",
        "subtopic": "Lacey's Regime Theory for Alluvial Canals",
        "type": "NAT",
        "marks": 2,
        "difficulty": "Hard",
        "question": f"An unlined alluvial irrigation canal carrying a design discharge of $Q = {q_canal:.0f}\\text{{ m}}^3/\\text{{s}}$ is designed in true regime according to Lacey's theory for a silt factor of $f = {f_lacey:.1f}$. The wetted perimeter ($P$) of the regime channel section is ______ m (round off to 2 decimal places).",
        "options": {},
        "correct_answer": f"{p_regime - 0.3:.2f} to {p_regime + 0.3:.2f}",
        "solution": f"According to Lacey's regime theory, the wetted perimeter $P$ is solely a function of design discharge $Q$:\n$$P = 4.75 \\sqrt{{Q}}$$\nFor $Q = {q_canal}\\text{{ m}}^3/\\text{{s}}$:\n$$P = 4.75 \\times \\sqrt{{{q_canal}}} = 4.75 \\times {round(math.sqrt(q_canal), 3)} \\approx {p_regime}\\text{{ m}}$$\nThus, the wetted perimeter is {p_regime} m."
    })

    # Q58: APE 2M (Deep Bed Drying & Aeration Energy Balance)
    m_grain_kg = 2000.0 # kg
    w1_pct = 22.0 # % wb
    w2_pct = 14.0 # % wb
    # Initial dry matter = m * (1 - 0.22) = 1560 kg
    # Final total mass = 1560 / (1 - 0.14) = 1813.95 kg
    # Water removed = 2000 - 1813.95 = 186.05 kg
    dry_matter = m_grain_kg * (1.0 - (w1_pct / 100.0))
    m_final = dry_matter / (1.0 - (w2_pct / 100.0))
    water_rem = round(m_grain_kg - m_final, 2)
    qs.append({
        "qnum": 58,
        "section": "Agricultural Process Engineering",
        "topic": "Drying and Dehydration",
        "subtopic": "Grain Drying Material Balance & Water Removal",
        "type": "NAT",
        "marks": 2,
        "difficulty": "Hard",
        "question": f"A batch of freshly harvested paddy weighing {m_grain_kg:.0f} kg is dried from an initial moisture content of {w1_pct:.0f}% (wet basis) down to {w2_pct:.0f}% (wet basis) for safe warehouse storage. The total mass of water evaporated during the drying process is ______ kg (round off to 2 decimal places).",
        "options": {},
        "correct_answer": f"{water_rem - 0.5:.2f} to {water_rem + 0.5:.2f}",
        "solution": f"Bone-dry matter in wet grain:\n$$\\text{{Dry Matter (DM)}} = M_1 \\times (1 - m_1) = {m_grain_kg} \\times (1 - 0.{int(w1_pct)}) = {m_grain_kg} \\times {1 - w1_pct/100:.2f} = {dry_matter:.1f}\\text{{ kg}}$$\nSince dry matter remains strictly constant during drying:\n$$M_2 \\times (1 - m_2) = \\text{{DM}} \\implies M_2 = \\frac{{\\text{{DM}}}}{{1 - m_2}} = \\frac{{{dry_matter:.1f}}}{{1 - 0.{int(w2_pct)}}} = \\frac{{{dry_matter:.1f}}}{{{1 - w2_pct/100:.2f}}} = {m_final:.2f}\\text{{ kg}}$$\nMass of water evaporated:\n$$\\Delta W = M_1 - M_2 = {m_grain_kg} - {m_final:.2f} = {water_rem}\\text{{ kg}}$$\nThus, the mass of water removed is {water_rem} kg."
    })

    # Q59: APE 2M (Multi-Effect Evaporator - Steam Economy)
    # Feed = 5000 kg/h at 10% solids to 50% solids.
    # Water evaporated = 5000 * (1 - 10/50) = 4000 kg/h
    # Steam supplied = 1800 kg/h
    # Economy = 4000 / 1800 = 2.22
    evap_water = 4000.0
    steam_in = 1750.0 + (idx % 5) * 50
    economy_val = round(evap_water / steam_in, 2)
    qs.append({
        "qnum": 59,
        "section": "Agricultural Process Engineering",
        "topic": "Thermal Processing and Evaporation",
        "subtopic": "Multi-Effect Evaporators (Steam Economy)",
        "type": "NAT",
        "marks": 2,
        "difficulty": "Hard",
        "question": f"A triple-effect forward-feed evaporator concentrates sugarcane juice from 10% total solids to 50% total solids at a feed rate of 5,000 kg/h. If the live saturated steam consumed in the first effect is {steam_in:.0f} kg/h, the steam economy of the triple-effect system is ______ (round off to 2 decimal places).",
        "options": {},
        "correct_answer": f"{economy_val - 0.05:.2f} to {economy_val + 0.05:.2f}",
        "solution": f"Solids balance:\n$$F \\times x_f = P \\times x_p \\implies 5000 \\times 0.10 = P \\times 0.50 \\implies P = 1000\\text{{ kg/h}}$$\nTotal water evaporated:\n$$V = F - P = 5000 - 1000 = 4000\\text{{ kg/h}}$$\nSteam Economy is defined as the total kilograms of water evaporated per kilogram of fresh steam supplied:\n$$\\text{{Steam Economy}} = \\frac{{V}}{{S}} = \\frac{{4000}}{{{steam_in}}} \\approx {economy_val}$$\nThus, the steam economy is {economy_val}."
    })

    # Q60: APE 2M (Cyclone Separator Cut Size - Lapple's Formula)
    qs.append({
        "qnum": 60,
        "section": "Agricultural Process Engineering",
        "topic": "Size Reduction and Material Handling",
        "subtopic": "Cyclone Separator Aerodynamics & Cut Diameter",
        "type": "MCQ",
        "marks": 2,
        "difficulty": "Hard",
        "question": "According to Lapple's standard cyclone separator formulation, the cut diameter ($d_{pc}$, diameter of particle collected with 50% efficiency) is proportional to:",
        "options": {
            "A": "\\sqrt{\\frac{\\mu W}{N_e v_i (\\rho_p - \\rho_g)}}",
            "B": "\\frac{\\mu W}{N_e v_i (\\rho_p - \\rho_g)}",
            "C": "\\sqrt{\\frac{N_e v_i (\\rho_p - \\rho_g)}{\\mu W}}",
            "D": "\\frac{N_e v_i (\\rho_p - \\rho_g)}{\\mu W}"
        },
        "correct_answer": "A",
        "solution": "Lapple's semi-empirical formula for the cut diameter $d_{pc}$ of a cyclone separator is:\n$$d_{pc} = \\sqrt{\\frac{9 \\mu W}{2 \\pi N_e v_i (\\rho_p - \\rho_g)}}$$\nwhere $\\mu$ is gas viscosity, $W$ is inlet width, $N_e$ is effective number of vortex turns, $v_i$ is gas inlet velocity, and $(\\rho_p - \\rho_g)$ is particle-gas density differential.\nThus, $d_{pc} \\propto \\sqrt{\\frac{\\mu W}{N_e v_i (\\rho_p - \\rho_g)}}$. Option A is correct."
    })

    # Q61: APE 2M (Grain Silo Pressure - Janssen's Equation)
    # p_v = (rho * g * R) / (k * mu') * [1 - exp(-k mu' h / R)]
    # As h -> infinity, p_v_max = (rho * g * R) / (k * mu')
    rho_g = 750.0 # kg/m3
    g_silo = 9.81
    r_hyd_silo = 1.5 # m (hydraulic radius = D/4 = 6m / 4 = 1.5m)
    k_ratio = 0.40 # lateral to vertical ratio
    mu_prime = 0.35 # coefficient of wall friction
    # p_v_max = (750 * 9.81 * 1.5) / (0.40 * 0.35) = 11036.25 / 0.14 = 78830 Pa = 78.83 kPa
    pv_max_kpa = round((rho_g * g_silo * r_hyd_silo) / (k_ratio * mu_prime * 1000.0), 2)
    qs.append({
        "qnum": 61,
        "section": "Agricultural Process Engineering",
        "topic": "Grain Storage Engineering",
        "subtopic": "Janssen's Theory for Deep Bin Storage Stresses",
        "type": "NAT",
        "marks": 2,
        "difficulty": "Hard",
        "question": f"A deep cylindrical grain storage silo of internal diameter 6.0 m (hydraulic radius $R = D/4 = {r_hyd_silo:.1f}\\text{{ m}}$) is filled with wheat grain of bulk density $\\rho = {rho_g:.0f}\\text{{ kg/m}}^3$ ($g = 9.81\\text{{ m/s}}^2$). The lateral-to-vertical pressure ratio is $k = {k_ratio:.2f}$, and the coefficient of friction between wheat and the concrete wall is $\\mu' = {mu_prime:.2f}$. According to Janssen's equation, the asymptotic MAXIMUM vertical pressure ($p_{{v,\\infty}}$) reached at infinite depth is ______ kPa (round off to 2 decimal places).",
        "options": {},
        "correct_answer": f"{pv_max_kpa - 0.5:.2f} to {pv_max_kpa + 0.5:.2f}",
        "solution": f"Janssen's equation for vertical pressure in a deep grain bin at depth $y$ is:\n$$p_v(y) = \\frac{{\\rho g R}}{{k \\mu'}} \\left[ 1 - \\exp\\left(-\\frac{{k \\mu' y}}{{R}}\\right) \\right]$$\nAs $y \\to \\infty$, the exponential term vanishes, and the vertical pressure approaches the asymptotic limit:\n$$p_{{v,\\infty}} = \\frac{{\\rho g R}}{{k \\mu'}}$$\nSubstituting $\\rho = {rho_g}$, $g = 9.81$, $R = {r_hyd_silo}$, $k = {k_ratio}$, $\\mu' = {mu_prime}$:\n$$\\text{{Numerator}} = {rho_g} \\times 9.81 \\times {r_hyd_silo} = {rho_g * g_silo * r_hyd_silo:.2f}\\text{{ N/m}}^2$$\n$$\\text{{Denominator}} = {k_ratio} \\times {mu_prime} = {k_ratio * mu_prime:.4f}$$\n$$p_{{v,\\infty}} = \\frac{{{rho_g * g_silo * r_hyd_silo:.2f}}}{{{k_ratio * mu_prime:.4f}}} = {round((rho_g * g_silo * r_hyd_silo)/(k_ratio * mu_prime), 1)}\\text{{ Pa}} \\approx {pv_max_kpa}\\text{{ kPa}}$$\nThus, the maximum vertical pressure is {pv_max_kpa} kPa."
    })

    # Q62: DFE 2M (Thermal Process Calculations - D, z, and F0 values)
    # Initial count N0 = 10^11, Target = 1 (11 log cycles) or 12D process: F0 = 12 * D_121.1
    d_121 = round(0.21 + (idx % 4) * 0.02, 2) # min at 121.1 C
    f0_target = round(12.0 * d_121, 2)
    qs.append({
        "qnum": 62,
        "section": "Dairy and Food Engineering",
        "topic": "Thermal Processing of Foods",
        "subtopic": "Thermal Death Kinetics and 12D Inactivation Concept",
        "type": "NAT",
        "marks": 2,
        "difficulty": "Hard",
        "question": f"In commercial canning of low-acid canned vegetables, the decimal reduction time of *Clostridium botulinum* spores at 121.1°C is $D_{{121.1}} = {d_121:.2f}\\text{{ min}}$. To guarantee public health safety under the mandatory 12D botulinum cook concept, the required minimum process lethality ($F_0$) at 121.1°C is ______ minutes (round off to 2 decimal places).",
        "options": {},
        "correct_answer": f"{f0_target - 0.05:.2f} to {f0_target + 0.05:.2f}",
        "solution": f"The 12D concept requires reducing the microbial population by 12 decimal logarithmic cycles:\n$$\\log_{{10}}\\left(\\frac{{N_0}}{{N}}\\right) = 12$$\nSince each log cycle reduction takes time equal to $1 D$-value:\n$$F_0 = 12 \\times D_{{121.1}}$$\nGiven $D_{{121.1}} = {d_121}\\text{{ min}}$:\n$$F_0 = 12 \\times {d_121} = {f0_target}\\text{{ min}}$$\nThus, the minimum required $F_0$ value is {f0_target} minutes."
    })

    # Q63: DFE 2M (Food Freezing - Plank's Equation)
    thick_a = 0.04 # m (40 mm slab)
    rho_food = 1050.0 # kg/m3
    latent_hf = 280000.0 # J/kg (280 kJ/kg)
    k_frozen = 1.6 # W/(m K)
    h_conv = 25.0 # W/(m2 K)
    delta_t = 20.0 # K (e.g. freezing at -20 C, freezing point 0 C)
    # Plank's equation for slab: P = 1/2, R = 1/8
    # t_F = (rho * L_f / delta_T) * [ (1/2 * a / h) + (1/8 * a^2 / k) ]
    term_h = (0.5 * thick_a) / h_conv # (0.5 * 0.04) / 25 = 0.02 / 25 = 0.0008
    term_k = (0.125 * (thick_a ** 2)) / k_frozen # (0.125 * 0.0016) / 1.6 = 0.0002 / 1.6 = 0.000125
    t_freeze_s = (rho_food * latent_hf / delta_t) * (term_h + term_k)
    t_freeze_hr = round(t_freeze_s / 3600.0, 2)
    qs.append({
        "qnum": 63,
        "section": "Dairy and Food Engineering",
        "topic": "Freezing and Cold Chain Engineering",
        "subtopic": "Plank's Equation for Food Freezing Time",
        "type": "NAT",
        "marks": 2,
        "difficulty": "Hard",
        "question": f"A slab of food product of thickness $a = {thick_a * 1000:.0f}\\text{{ mm}}$ (0.04 m) is frozen from both sides in an air-blast freezer maintained at a temperature difference of $\\Delta T = {delta_t:.0f}\\text{{ K}}$ below the initial freezing point. The food has density $\\rho = {rho_food:.0f}\\text{{ kg/m}}^3$, latent heat of freezing $\\lambda = {latent_hf/1000:.0f}\\text{{ kJ/kg}}$ ($2.8 \\times 10^5\\text{{ J/kg}}$), thermal conductivity of frozen food $k = {k_frozen:.1f}\\text{{ W/(m K)}}$, and convective surface heat transfer coefficient $h = {h_conv:.0f}\\text{{ W/(m}}^2\\text{{ K)}}$. Using Plank's equation for an infinite slab ($P = 1/2$, $R = 1/8$), the freezing time is ______ hours (round off to 2 decimal places).",
        "options": {},
        "correct_answer": f"{t_freeze_hr - 0.1:.2f} to {t_freeze_hr + 0.1:.2f}",
        "solution": f"Plank's formula for freezing time of an infinite slab frozen from both sides:\n$$t_F = \\frac{{\\rho \\lambda}}{{\\Delta T}} \\left[ \\frac{{1}}{{2}} \\frac{{a}}{{h}} + \\frac{{1}}{{8}} \\frac{{a^2}}{{k}} \\right]$$\nSubstituting the given physical values ($a = 0.04\\text{{ m}}$):\n$$\\frac{{1}}{{2}} \\frac{{a}}{{h}} = \\frac{{0.5 \\times 0.04}}{{25}} = \\frac{{0.02}}{{25}} = 0.0008\\text{{ m}}^2\\text{{K/W}}$$\n$$\\frac{{1}}{{8}} \\frac{{a^2}}{{k}} = \\frac{{0.125 \\times (0.04)^2}}{{1.6}} = \\frac{{0.0002}}{{1.6}} = 0.000125\\text{{ m}}^2\\text{{K/W}}$$\n$$\\text{{Sum}} = 0.0008 + 0.000125 = 0.000925\\text{{ m}}^2\\text{{K/W}}$$\n$$t_F = \\frac{{1050 \\times 280000}}{{20}} \\times 0.000925 = 14,700,000 \\times 0.000925 = {t_freeze_s:.1f}\\text{{ seconds}}$$\nConverting to hours:\n$$t_{{freeze}} = \\frac{{{t_freeze_s:.1f}}}{{3600}} \\approx {t_freeze_hr}\\text{{ hours}}$$\nThus, the freezing time is {t_freeze_hr} hours."
    })

    # Q64: DFE 2M (NEW SYLLABUS: Non-Thermal Food Processing & Modified Atmosphere Packaging MSQ)
    qs.append({
        "qnum": 64,
        "section": "Dairy and Food Engineering",
        "topic": "Advanced Food Processing Technologies",
        "subtopic": "Non-Thermal Processing (HPP) & Modified Atmosphere Packaging (MAP)",
        "type": "MSQ",
        "marks": 2,
        "difficulty": "Hard",
        "question": "Which of the following statements is/are CORRECT regarding High Pressure Processing (HPP) and Modified Atmosphere Packaging (MAP) of perishable agricultural produce?",
        "options": {
            "A": "High hydrostatic pressure (300–600 MPa) inactivates vegetative microorganisms predominantly by disrupting non-covalent hydrogen and hydrophobic bonds, while preserving small flavor molecules and vitamins.",
            "B": "According to the isostatic principle, pressure is transmitted instantly and uniformly throughout the entire food package regardless of geometry or size.",
            "C": "In equilibrium modified atmosphere packaging (EMAP) of fresh fruits, steady state is reached when crop respiration rate of O₂ equals the permeation rate of O₂ across the barrier film.",
            "D": "High pressure processing completely eliminates bacterial bacterial endospores (e.g. Clostridium botulinum) at ambient temperature (20°C) without requiring elevated thermal intervention."
        },
        "correct_answer": "A, B, C",
        "solution": "1. Statement A: Pascalization (HPP) destabilizes tertiary/quaternary protein conformations, cell membranes, and enzymes via hydrogen and hydrophobic bond rupture without cleaving covalent bonds; thus, micronutrients, pigments, and fresh flavor volatiles are preserved. (CORRECT)\n2. Statement B: Pascal's isostatic rule guarantees instantaneous and equal pressure transmission across every point of the product, preventing structural shear gradient damage. (CORRECT)\n3. Statement C: In EMAP, dynamic equilibrium is achieved when the rate of O2 consumption by crop respiration equals the O2 diffusion ingress rate through the polymeric film: $R_{O2} \\cdot W = \\frac{P_{O2} \\cdot A}{L} (p_{out} - p_{in})$. (CORRECT)\n4. Statement D: Bacterial endospores possess highly protective dipicolinic acid and core mineral complexes that resist hydrostatic pressures up to 1000 MPa at room temperature; spore inactivation requires pressure-assisted thermal sterilization (PATS) at 90–120°C. (INCORRECT)\nThus, A, B, and C are correct."
    })

    # Q65: FSEC 2M (Farm Structures & Environmental Control - Greenhouse Ventilation & Heat Balance)
    # Q_vent = q_sensible / (rho * Cp * delta_T)
    # Sensible heat load q_s = 45 kW = 45000 W
    # rho = 1.2 kg/m3, Cp = 1005 J/(kg K), delta_T = 4 K
    # Q_vent = 45000 / (1.2 * 1005 * 4) = 45000 / 4824 = 9.328 m3/s
    q_heat_kw = 45.0 + (idx % 4) * 5.0
    q_heat_w = q_heat_kw * 1000.0
    delta_t_gh = 4.0
    q_vent_m3s = round(q_heat_w / (1.2 * 1005.0 * delta_t_gh), 2)
    qs.append({
        "qnum": 65,
        "section": "Farm Structures and Environmental Control",
        "topic": "Controlled Environment Agriculture",
        "subtopic": "Greenhouse Ventilation and Sensible Heat Balance",
        "type": "NAT",
        "marks": 2,
        "difficulty": "Hard",
        "question": f"A commercial greenhouse requires active mechanical fan ventilation to dissipate a peak midday net sensible solar heat load of $q_s = {q_heat_kw:.0f}\\text{{ kW}}$ ({q_heat_w:.0f} W). The ambient air density is $\\rho = 1.20\\text{{ kg/m}}^3$ and specific heat of air is $C_p = 1005\\text{{ J/(kg K)}}$. If the permissible temperature rise between the inlet pad and exhaust fan is constrained to $\\Delta T = {delta_t_gh:.1f}\\text{{ K}}$, the required ventilation airflow rate is ______ $\\text{{m}}^3/\\text{{s}}$ (round off to 2 decimal places).",
        "options": {},
        "correct_answer": f"{q_vent_m3s - 0.2:.2f} to {q_vent_m3s + 0.2:.2f}",
        "solution": f"The sensible heat balance for greenhouse ventilation is given by:\n$$q_s = \\dot{{m}} C_p \\Delta T = \\rho Q C_p \\Delta T$$\nRearranging for volumetric air flow rate $Q$:\n$$Q = \\frac{{q_s}}{{\\rho C_p \\Delta T}}$$\nSubstituting $q_s = {q_heat_w:.0f}\\text{{ W}}$, $\\rho = 1.20\\text{{ kg/m}}^3$, $C_p = 1005\\text{{ J/(kg K)}}$, $\\Delta T = {delta_t_gh:.1f}\\text{{ K}}$:\n$$\\text{{Denominator}} = 1.20 \\times 1005 \\times {delta_t_gh} = {1.2 * 1005 * delta_t_gh:.1f}\\text{{ J/(m}}^3\\text{{ K)}}$$\n$$Q = \\frac{{{q_heat_w}}}{{{1.2 * 1005 * delta_t_gh:.1f}}} \\approx {q_vent_m3s}\\text{{ m}}^3/\\text{{s}}$$\nThus, the required ventilation rate is {q_vent_m3s} m³/s."
    })

    return qs
