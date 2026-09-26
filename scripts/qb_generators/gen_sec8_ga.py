import json
import math

SVG_CUBE_NET = """<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" class="w-full max-w-[380px] h-auto mx-auto"><rect width="400" height="240" rx="8" fill="#f8fafc" class="dark:fill-slate-900" stroke="#e2e8f0" class="dark:stroke-slate-800"/><g fill="#ffffff" class="dark:fill-slate-800" stroke="#2563eb" stroke-width="2"><rect x="70" y="80" width="50" height="50"/><rect x="120" y="80" width="50" height="50"/><rect x="170" y="80" width="50" height="50"/><rect x="220" y="80" width="50" height="50"/><rect x="120" y="30" width="50" height="50"/><rect x="170" y="130" width="50" height="50"/></g><g font-size="16" font-family="sans-serif" font-weight="bold" fill="#1e293b" class="dark:fill-white" text-anchor="middle" dominant-baseline="central"><text x="95" y="105">1</text><text x="145" y="105">2</text><text x="195" y="105">3</text><text x="245" y="105">4</text><text x="145" y="55">5</text><text x="195" y="155">6</text></g><text x="200" y="210" font-size="12" font-family="sans-serif" fill="#64748b" text-anchor="middle">Unfolded Net of a Standard Cube</text></svg>"""

def generate_ga_questions():
    questions = []
    def add(q):
        questions.append(q)

    SEC = "Section 8: General Aptitude"

    # 1. Quantitative: Percentages, Profit-Loss, Ratios & Averages (50 questions)
    for i in range(1, 51):
        qid = f"QB_GA_PRC_{i:03d}"
        topic = "Quantitative: Percentages, Profit-Loss, Ratios & Averages"
        sub = "Successive percentage discounts and markup"
        if i % 3 == 1:
            d1 = 20.0
            d2 = 10.0 + (i % 4) * 5.0
            # d_eff = d1 + d2 - (d1 * d2) / 100
            d_eff = round(d1 + d2 - (d1 * d2) / 100.0, 2)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Equivalent single discount of successive discounts",
                "type": "NAT",
                "marks": 1,
                "negative_marks": 0,
                "question": f"A retail store offers two successive discounts of ${d1:.0f}\\%$ and ${d2:.0f}\\%$ on the marked price of an agricultural implement. The equivalent single discount percentage is ________ $\\%$ (round off to two decimal places).",
                "correct_answer": f"{d_eff:.2f}",
                "numerical_range": { "min": round(d_eff - 0.1, 2), "max": round(d_eff + 0.1, 2) },
                "solution": f"The equivalent single discount for two successive discounts $d_1$ and $d_2$ is:\n$$d_{{eff}} = d_1 + d_2 - \\frac{{d_1 \\times d_2}}{{100}}$$\nGiven $d_1 = {d1:.0f}\\%$ and $d_2 = {d2:.0f}\\%$:\n$$d_{{eff}} = {d1:.0f} + {d2:.0f} - \\frac{{{d1:.0f} \\times {d2:.0f}}}{{100}} = {d1 + d2:.0f} - {d1 * d2 / 100.0:.2f} = {d_eff:.2f}\\%$$",
                "difficulty": "Easy",
                "source": "Quantitative Aptitude for Competitive Examinations (R.S. Aggarwal)"
            })
        elif i % 3 == 2:
            cp = 500.0 + (i % 5) * 50.0
            profit_pct = 20.0
            discount_pct = 10.0
            # sp = cp * 1.2
            # mp = sp / 0.9 = cp * 1.2 / 0.9
            mp = round((cp * (1.0 + profit_pct / 100.0)) / (1.0 - discount_pct / 100.0), 2)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Marked price for target profit after discount",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"An equipment dealer purchases an irrigation sprinkler at a cost price of $\\text{{Rs. }}{cp:.0f}$. To allow a discount of ${discount_pct:.0f}\\%$ on the marked price while still earning a net profit of ${profit_pct:.0f}\\%$, the dealer must mark the price at $\\text{{Rs. }}$ ________ (round off to two decimal places).",
                "correct_answer": f"{mp:.2f}",
                "numerical_range": { "min": round(mp - 0.5, 2), "max": round(mp + 0.5, 2) },
                "solution": f"Selling price required for ${profit_pct:.0f}\\%$ profit:\n$$SP = CP \\times \\left(1 + \\frac{{20}}{{100}}\\right) = {cp:.0f} \\times 1.20 = {cp * 1.20:.2f}$$\nSince marked price after ${discount_pct:.0f}\\%$ discount equals $SP$:\n$$SP = MP \\times (1 - 0.10) \\implies MP = \\frac{{SP}}{{0.90}} = \\frac{{{cp * 1.20:.2f}}}{{0.90}} = {mp:.2f}$$",
                "difficulty": "Moderate",
                "source": "Quantitative Aptitude for Competitive Examinations (R.S. Aggarwal)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Rule of alligation in mixtures",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "In what ratio must two grain varieties costing $\\text{Rs. } 25/\\text{kg}$ and $\\text{Rs. } 40/\\text{kg}$ be blended together to produce a mixture worth $\\text{Rs. } 30/\\text{kg}$?",
                "options": {
                    "A": "$2 : 1$",
                    "B": "$1 : 2$",
                    "C": "$3 : 2$",
                    "D": "$5 : 3$"
                },
                "correct_answer": "A",
                "solution": "Applying the rule of alligation:\n$$\\frac{Q_{\\text{cheaper}}}{Q_{\\text{dearer}}} = \\frac{C_{\\text{dearer}} - M}{M - C_{\\text{cheaper}}} = \\frac{40 - 30}{30 - 25} = \\frac{10}{5} = \\frac{2}{1}$$\nHence, the required ratio is $2 : 1$.",
                "difficulty": "Easy",
                "source": "Quantitative Aptitude for Competitive Examinations (R.S. Aggarwal)"
            })

    # 2. Quantitative: Time, Work, Speed, Distance & Pipes (50 questions)
    for i in range(1, 51):
        qid = f"QB_GA_TWS_{i:03d}"
        topic = "Quantitative: Time, Work, Speed, Distance & Pipes"
        sub = "Pipes and cisterns and combined work rate"
        if i % 3 == 1:
            ta = 6.0
            tb = 12.0
            # 1/t = 1/6 + 1/12 = 3/12 = 1/4 -> t = 4 h
            t_net = round(1.0 / (1.0 / ta + 1.0 / tb), 2)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Pipes and cisterns combined fill time",
                "type": "NAT",
                "marks": 1,
                "negative_marks": 0,
                "question": f"Inlet pipe A can fill a water storage sump in ${ta:.0f}\\text{{ hours}}$, while inlet pipe B can fill it in ${tb:.0f}\\text{{ hours}}$. If both pipes are opened simultaneously into an empty sump, the time required to completely fill the sump is ________ $\\text{{hours}}$ (round off to two decimal places).",
                "correct_answer": f"{t_net:.2f}",
                "numerical_range": { "min": round(t_net - 0.05, 2), "max": round(t_net + 0.05, 2) },
                "solution": f"Combined filling rate of both pipes:\n$$\\text{{Rate}} = \\frac{{1}}{{T_A}} + \\frac{{1}}{{T_B}} = \\frac{{1}}{{{ta:.0f}}} + \\frac{{1}}{{{tb:.0f}}} = \\frac{{2 + 1}}{{12}} = \\frac{{3}}{{12}} = \\frac{{1}}{{4}}\\text{{ per hour}}$$\nTotal time to fill:\n$$T = 4.00\\text{{ hours}}$$",
                "difficulty": "Easy",
                "source": "Quantitative Aptitude for Competitive Examinations (R.S. Aggarwal)"
            })
        elif i % 3 == 2:
            v1 = 60.0 # km/h
            v2 = 90.0 # km/h
            d_init = 50.0 # km head start
            # t = d_init / (v2 - v1) = 50 / 30 = 1.67 h
            t_catch = round(d_init / (v2 - v1), 2)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Relative speed and overtaking time",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": f"A tractor moves at a uniform speed of ${v1:.0f}\\text{{ km/h}}$. A maintenance pickup truck starts from the same origin $1\\text{{ hour}}$ later (giving the tractor a ${d_init:.0f}\\text{{ km}}$ initial lead) and travels along the same straight road at ${v2:.0f}\\text{{ km/h}}$. The time taken by the pickup truck to overtake the tractor is ________ $\\text{{hours}}$ (round off to two decimal places).",
                "correct_answer": f"{t_catch:.2f}",
                "numerical_range": { "min": round(t_catch - 0.05, 2), "max": round(t_catch + 0.05, 2) },
                "solution": f"The relative speed between the two vehicles moving in the same direction is:\n$$v_{{rel}} = v_2 - v_1 = {v2:.0f} - {v1:.0f} = {v2 - v1:.0f}\\text{{ km/h}}$$\nTime to close the initial distance gap $d = {d_init:.0f}\\text{{ km}}$:\n$$t = \\frac{{d}}{{v_{{rel}}}} = \\frac{{{d_init:.0f}}}{{{v2 - v1:.0f}}} = {t_catch:.2f}\\text{{ hours}}$$",
                "difficulty": "Moderate",
                "source": "Quantitative Aptitude for Competitive Examinations (R.S. Aggarwal)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Average speed for round trip",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "A vehicle travels from town A to town B at speed $u$, and returns back from town B to town A along the same route at speed $v$. The average speed for the entire round trip is:",
                "options": {
                    "A": "$\\frac{2 u v}{u + v}$",
                    "B": "$\\frac{u + v}{2}$",
                    "C": "$\\sqrt{u v}$",
                    "D": "$\\frac{u v}{u + v}$"
                },
                "correct_answer": "A",
                "solution": "Average speed is total distance divided by total time: $v_{\\text{avg}} = \\frac{2 D}{\\frac{D}{u} + \\frac{D}{v}} = \\frac{2 D}{D \\left( \\frac{u + v}{u v} \\right)} = \\frac{2 u v}{u + v}$ (the harmonic mean of speeds).",
                "difficulty": "Easy",
                "source": "Quantitative Aptitude for Competitive Examinations (R.S. Aggarwal)"
            })

    # 3. Quantitative: Algebra, Functions & Progressions (50 questions)
    for i in range(1, 51):
        qid = f"QB_GA_ALG_{i:03d}"
        topic = "Quantitative: Algebra, Functions & Progressions"
        sub = "Arithmetic and geometric progression series sums"
        if i % 3 == 1:
            a = 3
            d = 4
            n = 20
            # S_n = n/2 * (2a + (n-1)d)
            Sn = round((n / 2.0) * (2 * a + (n - 1) * d))
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Sum of arithmetic progression series",
                "type": "NAT",
                "marks": 1,
                "negative_marks": 0,
                "question": f"The first term of an arithmetic progression is $a = {a}$ and the common difference is $d = {d}$. The sum of the first ${n}$ terms ($S_{{{n}}}$) of this series is ________.",
                "correct_answer": f"{Sn}",
                "numerical_range": { "min": Sn - 0.1, "max": Sn + 0.1 },
                "solution": f"The sum of an arithmetic progression is:\n$$S_n = \\frac{{n}}{{2}} [2a + (n - 1)d]$$\nGiven $a = {a}$, $d = {d}$, and $n = {n}$:\n$$S_{{20}} = \\frac{{20}}{{2}} [2({a}) + (20 - 1)({d})] = 10 [6 + 19({d})] = 10 [6 + {19*d}] = 10 [{6 + 19*d}] = {Sn}$$",
                "difficulty": "Easy",
                "source": "Quantitative Aptitude for Competitive Examinations (R.S. Aggarwal)"
            })
        elif i % 3 == 2:
            a_gp = 2
            r_gp = 3
            n_gp = 5
            # S_n = a * (r^n - 1) / (r - 1)
            Sn_gp = round(a_gp * (r_gp**n_gp - 1) / (r_gp - 1))
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Sum of geometric progression series",
                "type": "NAT",
                "marks": 1,
                "negative_marks": 0,
                "question": f"For a geometric progression with first term $a = {a_gp}$ and common ratio $r = {r_gp}$, the sum of the first ${n_gp}$ terms is ________.",
                "correct_answer": f"{Sn_gp}",
                "numerical_range": { "min": Sn_gp - 0.1, "max": Sn_gp + 0.1 },
                "solution": f"The sum of a geometric series is:\n$$S_n = \\frac{{a (r^n - 1)}}{{r - 1}}$$\nFor $a = {a_gp}$, $r = {r_gp}$, $n = {n_gp}$ ($3^5 = 243$):\n$$S_5 = \\frac{{{a_gp} (243 - 1)}}{{{r_gp} - 1}} = \\frac{{{a_gp} \\times 242}}{{2}} = {Sn_gp}$$",
                "difficulty": "Easy",
                "source": "Quantitative Aptitude for Competitive Examinations (R.S. Aggarwal)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Logarithm base change identity",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "If $\\log_2 (x) + \\log_4 (x) = 6$, the value of $x$ is:",
                "options": {
                    "A": "$16$",
                    "B": "$64$",
                    "C": "$8$",
                    "D": "$32$"
                },
                "correct_answer": "A",
                "solution": "Using base change formula $\\log_4 (x) = \\frac{\\log_2 (x)}{\\log_2 (4)} = \\frac{1}{2} \\log_2 (x)$:\n$$\\log_2 (x) + \\frac{1}{2} \\log_2 (x) = \\frac{3}{2} \\log_2 (x) = 6$$\n$$\\log_2 (x) = 6 \\times \\frac{2}{3} = 4 \\implies x = 2^4 = 16$$.",
                "difficulty": "Easy",
                "source": "Quantitative Aptitude for Competitive Examinations (R.S. Aggarwal)"
            })

    # 4. Quantitative: Geometry, Mensuration & Coordinate Geometry (50 questions)
    for i in range(1, 51):
        qid = f"QB_GA_GEO_{i:03d}"
        topic = "Quantitative: Geometry, Mensuration & Coordinate Geometry"
        sub = "Mensuration of cylinders and coordinate geometry"
        if i % 3 == 1:
            r_cyl = 7.0 # cm
            h_cyl = 15.0 # cm
            # Vol = pi * r^2 * h
            vol = round(math.pi * (r_cyl**2) * h_cyl, 2)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Right circular cylinder volume",
                "type": "NAT",
                "marks": 1,
                "negative_marks": 0,
                "question": f"A cylindrical storage silo model has an internal radius of $r = {r_cyl:.0f}\\text{{ cm}}$ and a height of $h = {h_cyl:.0f}\\text{{ cm}}$. Taking $\\pi \\approx 3.14159$, the volume of the cylinder is ________ $\\text{{cm}}^3$ (round off to two decimal places).",
                "correct_answer": f"{vol:.2f}",
                "numerical_range": { "min": round(vol - 0.5, 2), "max": round(vol + 0.5, 2) },
                "solution": f"Volume of a right circular cylinder is:\n$$V = \\pi r^2 h = \\pi \\times ({r_cyl:.0f})^2 \\times {h_cyl:.0f} = 49 \\times 15 \\times \\pi = 735 \\pi \\approx {vol:.2f}\\text{{ cm}}^3$$",
                "difficulty": "Easy",
                "source": "Quantitative Aptitude for Competitive Examinations (R.S. Aggarwal)"
            })
        elif i % 3 == 2:
            x1, y1 = 2, 3
            x2, y2 = 8, 11
            # dist = sqrt((8-2)^2 + (11-3)^2) = sqrt(36 + 64) = 10
            dist = round(math.sqrt((x2 - x1)**2 + (y2 - y1)**2), 2)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Euclidean distance between coordinate points",
                "type": "NAT",
                "marks": 1,
                "negative_marks": 0,
                "question": f"In a 2D Cartesian coordinate plane, the Euclidean distance between points $P({x1}, {y1})$ and $Q({x2}, {y2})$ is ________ (round off to two decimal places).",
                "correct_answer": f"{dist:.2f}",
                "numerical_range": { "min": round(dist - 0.05, 2), "max": round(dist + 0.05, 2) },
                "solution": f"Distance formula:\n$$d = \\sqrt{{(x_2 - x_1)^2 + (y_2 - y_1)^2}} = \\sqrt{{({x2} - {x1})^2 + ({y2} - {y1})^2}} = \\sqrt{{6^2 + 8^2}} = \\sqrt{{36 + 64}} = \\sqrt{{100}} = {dist:.2f}$$",
                "difficulty": "Easy",
                "source": "Quantitative Aptitude for Competitive Examinations (R.S. Aggarwal)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Inscribed circle in right-angled triangle",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "For a right-angled triangle with perpendicular sides $a$ and $b$ and hypotenuse $c$, the inradius $r$ of the inscribed circle is given by:",
                "options": {
                    "A": "$r = \\frac{a + b - c}{2}$",
                    "B": "$r = \\frac{a + b + c}{2}$",
                    "C": "$r = \\frac{a b}{c}$",
                    "D": "$r = \\sqrt{a b}$"
                },
                "correct_answer": "A",
                "solution": "In any triangle, inradius $r = \\frac{\\text{Area}}{s}$, where semi-perimeter $s = \\frac{a + b + c}{2}$. For a right triangle, $\\text{Area} = \\frac{a b}{2}$. Since $c^2 = a^2 + b^2$, $(a + b)^2 - c^2 = 2 a b = 4 \\text{Area}$. Thus:\n$$r = \\frac{a b}{a + b + c} = \\frac{a + b - c}{2}$$.",
                "difficulty": "Easy",
                "source": "Quantitative Aptitude for Competitive Examinations (R.S. Aggarwal)"
            })

    # 5. Quantitative: Permutations, Combinations & Probability (50 questions)
    for i in range(1, 51):
        qid = f"QB_GA_PRB_{i:03d}"
        topic = "Quantitative: Permutations, Combinations & Probability"
        sub = "Combinations and basic probability laws"
        if i % 3 == 1:
            n_tot = 8
            r_sel = 3
            # nCr = 8 * 7 * 6 / 6 = 56
            comb = round(math.comb(n_tot, r_sel))
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Combinations selection calculation",
                "type": "NAT",
                "marks": 1,
                "negative_marks": 0,
                "question": f"A quality control panel must choose a committee of ${r_sel}$ agronomists out of ${n_tot}$ qualified candidates. The total number of distinct ways this committee can be formed is ________.",
                "correct_answer": f"{comb}",
                "numerical_range": { "min": comb - 0.1, "max": comb + 0.1 },
                "solution": f"The number of ways to choose $r$ items from $n$ items without regard to order is:\n$$C(n, r) = \\frac{{n!}}{{r! (n - r)!}} = \\frac{{8!}}{{3! 5!}} = \\frac{{8 \\times 7 \\times 6}}{{3 \\times 2 \\times 1}} = {comb}$$",
                "difficulty": "Easy",
                "source": "Quantitative Aptitude for Competitive Examinations (R.S. Aggarwal)"
            })
        elif i % 3 == 2:
            # Two fair dice rolled: sum = 7
            # Favorable outcomes: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6/36 = 1/6 = 0.1667
            prob = round(6.0 / 36.0, 4)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Probability of dice roll sum",
                "type": "NAT",
                "marks": 1,
                "negative_marks": 0,
                "question": "Two unbiased six-faced dice are rolled simultaneously. The probability that the sum of the numbers appearing on the two dice equals $7$ is ________ (round off to four decimal places).",
                "correct_answer": f"{prob:.4f}",
                "numerical_range": { "min": round(prob - 0.0005, 4), "max": round(prob + 0.0005, 4) },
                "solution": f"Total possible outcomes $N = 6 \\times 6 = 36$.\nFavorable outcomes giving sum $7$ are: $(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)$, total $n = 6$.\n$$P(\\text{{sum}} = 7) = \\frac{{6}}{{36}} = \\frac{{1}}{{6}} \\approx {prob:.4f}$$",
                "difficulty": "Easy",
                "source": "Quantitative Aptitude for Competitive Examinations (R.S. Aggarwal)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Circular permutation of distinct objects",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "The number of distinct ways in which $n$ people can be arranged around a circular conference table is:",
                "options": {
                    "A": "$(n - 1)!$",
                    "B": "$n!$",
                    "C": "$\\frac{n!}{2}$",
                    "D": "$(n + 1)!$"
                },
                "correct_answer": "A",
                "solution": "In circular arrangements, rotational shifts are indistinguishable. Fixing one person's position eliminates the $n$-fold rotational degeneracy, giving $(n - 1)!$ distinct arrangements.",
                "difficulty": "Easy",
                "source": "Quantitative Aptitude for Competitive Examinations (R.S. Aggarwal)"
            })

    # 6. Quantitative: Data Interpretation (Tables, Bar & Pie Charts) (50 questions)
    for i in range(1, 51):
        qid = f"QB_GA_DTI_{i:03d}"
        topic = "Quantitative: Data Interpretation (Tables, Bar & Pie Charts)"
        sub = "Percentage growth and sectoral pie chart distribution"
        if i % 3 == 1:
            y1 = 120.0 # thousand tonnes
            y2 = 168.0 # thousand tonnes
            growth_pct = round(((y2 - y1) / y1) * 100.0, 1) # 40.0%
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Year over year production percentage growth",
                "type": "NAT",
                "marks": 1,
                "negative_marks": 0,
                "question": f"According to annual agricultural census data, grain production in a district grew from ${y1:.0f}\\text{{ thousand tonnes}}$ in Year 1 to ${y2:.0f}\\text{{ thousand tonnes}}$ in Year 2. The percentage growth in grain production is ________ $\\%$ (round off to one decimal place).",
                "correct_answer": f"{growth_pct:.1f}",
                "numerical_range": { "min": round(growth_pct - 0.2, 1), "max": round(growth_pct + 0.2, 1) },
                "solution": f"Percentage growth is calculated as:\n$$\\text{{Growth}} = \\frac{{Y_2 - Y_1}}{{Y_1}} \\times 100 = \\frac{{{y2:.0f} - {y1:.0f}}}{{{y1:.0f}}} \\times 100 = \\frac{{{y2 - y1:.0f}}}{{{y1:.0f}}} \\times 100 = {growth_pct:.1f}\\%$$",
                "difficulty": "Easy",
                "source": "Quantitative Aptitude for Competitive Examinations (R.S. Aggarwal)"
            })
        elif i % 3 == 2:
            pct_sector = 25.0
            angle_deg = round((pct_sector / 100.0) * 360.0, 1)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Central angle for pie chart sector",
                "type": "NAT",
                "marks": 1,
                "negative_marks": 0,
                "question": f"In a pie chart representing total agricultural expenditure across various operations, irrigation accounts for ${pct_sector:.0f}\\%$ of the total budget. The central angle subtended by this irrigation sector at the center of the pie chart is ________ degrees.",
                "correct_answer": f"{angle_deg:.1f}",
                "numerical_range": { "min": round(angle_deg - 0.1, 1), "max": round(angle_deg + 0.1, 1) },
                "solution": f"The total central angle in a complete circular pie chart is $360^\\circ$.\n$$\\text{{Sector Angle}} = \\frac{{\\text{{Percentage}}}}{{100}} \\times 360^\\circ = \\frac{{{pct_sector:.0f}}}{{100}} \\times 360^\\circ = {angle_deg:.1f}^\\circ$$",
                "difficulty": "Easy",
                "source": "Quantitative Aptitude for Competitive Examinations (R.S. Aggarwal)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Interpreting histograms and cumulative frequency",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "In a cumulative frequency ogive curve, the horizontal coordinate corresponding to the point where the 'less than' and 'more than' ogive curves intersect gives the:",
                "options": {
                    "A": "Median of the distribution",
                    "B": "Mean of the distribution",
                    "C": "Mode of the distribution",
                    "D": "Standard deviation"
                },
                "correct_answer": "A",
                "solution": "The intersection of the 'less than' ogive (cumulative from lower bound) and 'more than' ogive (cumulative from upper bound) occurs precisely at the $50\\%$ cumulative frequency point, giving the median value on the abscissa.",
                "difficulty": "Easy",
                "source": "Quantitative Aptitude for Competitive Examinations (R.S. Aggarwal)"
            })

    # 7. Analytical: Number Series, Letter Patterns & Codes (50 questions)
    for i in range(1, 51):
        qid = f"QB_GA_SER_{i:03d}"
        topic = "Analytical: Number Series, Letter Patterns & Codes"
        sub = "Number pattern and alphanumeric sequence prediction"
        if i % 3 == 1:
            # Series: 2, 5, 10, 17, 26, ? (n^2 + 1)
            # Next is 37
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Polynomial quadratic sequence prediction",
                "type": "NAT",
                "marks": 1,
                "negative_marks": 0,
                "question": "Find the missing number in the following sequence: $2, \\; 5, \\; 10, \\; 17, \\; 26$, ________.",
                "correct_answer": "37",
                "numerical_range": { "min": 36.9, "max": 37.1 },
                "solution": "The sequence follows the pattern $T_n = n^2 + 1$:\n- $1^2 + 1 = 2$\n- $2^2 + 1 = 5$\n- $3^2 + 1 = 10$\n- $4^2 + 1 = 17$\n- $5^2 + 1 = 26$\n- For $n = 6$: $6^2 + 1 = 36 + 1 = 37$.",
                "difficulty": "Easy",
                "source": "A Modern Approach to Verbal and Non-Verbal Reasoning (R.S. Aggarwal)"
            })
        elif i % 3 == 2:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Letter shifting cipher code",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "In a certain code language, if 'PLANT' is coded as 'QMBOU' (each letter shifted by $+1$), how will 'GRAIN' be coded in that same system?",
                "options": {
                    "A": "HSBJO",
                    "B": "FQZHM",
                    "C": "ITCKP",
                    "D": "HRBJO"
                },
                "correct_answer": "A",
                "solution": "Each letter is shifted by $+1$ position forward in the English alphabet:\n- $\\text{G} \\to \\text{H}$\n- $\\text{R} \\to \\text{S}$\n- $\\text{A} \\to \\text{B}$\n- $\\text{I} \\to \\text{J}$\n- $\\text{N} \\to \\text{O}$\nThus, 'GRAIN' is coded as 'HSBJO'.",
                "difficulty": "Easy",
                "source": "A Modern Approach to Verbal and Non-Verbal Reasoning (R.S. Aggarwal)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Difference of differences series pattern",
                "type": "NAT",
                "marks": 2,
                "negative_marks": 0,
                "question": "Identify the next number in the arithmetic series: $3, \\; 7, \\; 15, \\; 31, \\; 63$, ________.",
                "correct_answer": "127",
                "numerical_range": { "min": 126.9, "max": 127.1 },
                "solution": "Pattern: each term is $T_{n+1} = 2 T_n + 1$ (or $T_n = 2^{n+1} - 1$):\n- $2(3) + 1 = 7$\n- $2(7) + 1 = 15$\n- $2(15) + 1 = 31$\n- $2(31) + 1 = 63$\n- Next term $= 2(63) + 1 = 126 + 1 = 127$.",
                "difficulty": "Moderate",
                "source": "A Modern Approach to Verbal and Non-Verbal Reasoning (R.S. Aggarwal)"
            })

    # 8. Analytical: Syllogisms, Deduction & Venn Diagrams (50 questions)
    for i in range(1, 51):
        qid = f"QB_GA_SYL_{i:03d}"
        topic = "Analytical: Syllogisms, Deduction & Venn Diagrams"
        sub = "Categorical syllogism and deductive inference"
        if i % 3 == 1:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Universal affirmative syllogism deduction",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "Given the premises:\n1. All tractors are agricultural machines.\n2. All agricultural machines are powered equipment.\nWhich of the following conclusions logically follows?",
                "options": {
                    "A": "All tractors are powered equipment",
                    "B": "All powered equipment are tractors",
                    "C": "No tractors are powered equipment",
                    "D": "Some tractors are not machines"
                },
                "correct_answer": "A",
                "solution": "By standard Barbara (AAA) syllogism:\n- Minor premise: All $A$ are $B$.\n- Major premise: All $B$ are $C$.\n- Valid conclusion: All $A$ are $C$ ('All tractors are powered equipment').",
                "difficulty": "Easy",
                "source": "A Modern Approach to Verbal and Non-Verbal Reasoning (R.S. Aggarwal)"
            })
        elif i % 3 == 2:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Euler-Venn sets intersection analysis",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "In a survey of $100$ agricultural students:\n- $60$ study Farm Power ($P$)\n- $50$ study Soil Mechanics ($S$)\n- $30$ study both Farm Power and Soil Mechanics ($P \\cap S$)\nWhich of the following statements is/are TRUE?",
                "options": {
                    "A": "The number of students studying only Farm Power is $30$",
                    "B": "The number of students studying only Soil Mechanics is $20$",
                    "C": "The total number of students studying at least one of the two subjects is $80$",
                    "D": "The number of students studying neither subject is $20$"
                },
                "correct_answer": ["A", "B", "C", "D"],
                "solution": "1. Only $P = n(P) - n(P \\cap S) = 60 - 30 = 30$ (A is true).\n2. Only $S = n(S) - n(P \\cap S) = 50 - 30 = 20$ (B is true).\n3. $n(P \\cup S) = n(P) + n(S) - n(P \\cap S) = 60 + 50 - 30 = 80$ (C is true).\n4. Neither $= 100 - n(P \\cup S) = 100 - 80 = 20$ (D is true).\nAll statements A, B, C, D are correct.",
                "difficulty": "Easy",
                "source": "Quantitative Aptitude for Competitive Examinations (R.S. Aggarwal)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Particular negative and universal negative premises",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "Given the premises:\n1. Some seeds are hybrid.\n2. No hybrid is sterile.\nWhich of the following conclusions is definitively VALID?",
                "options": {
                    "A": "Some seeds are not sterile",
                    "B": "All seeds are sterile",
                    "C": "No seed is fertile",
                    "D": "All hybrids are seeds"
                },
                "correct_answer": "A",
                "solution": "From 'Some seeds are hybrid' and 'No hybrid is sterile', the subset of seeds that are hybrid cannot be sterile. Therefore, 'Some seeds are not sterile' is definitively true.",
                "difficulty": "Moderate",
                "source": "A Modern Approach to Verbal and Non-Verbal Reasoning (R.S. Aggarwal)"
            })

    # 9. Analytical: Blood Relations, Direction Sense & Seating Arrangements (50 questions)
    for i in range(1, 51):
        qid = f"QB_GA_DIR_{i:03d}"
        topic = "Analytical: Blood Relations, Direction Sense & Seating Arrangements"
        sub = "Direction sense displacement and family tree logic"
        if i % 3 == 1:
            # Person walks 12 m North, turns right (East) 5 m
            # Distance from origin = sqrt(12^2 + 5^2) = 13 m
            d_origin = round(math.sqrt(12**2 + 5**2), 1)
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Direction sense Pythagoras displacement",
                "type": "NAT",
                "marks": 1,
                "negative_marks": 0,
                "question": "A surveyor starts from point O and walks $12\\text{ m}$ North. He then turns right (facing East) and walks $5\\text{ m}$. The shortest straight-line distance from his current position back to starting point O is ________ $\\text{m}$.",
                "correct_answer": f"{d_origin:.1f}",
                "numerical_range": { "min": round(d_origin - 0.1, 1), "max": round(d_origin + 0.1, 1) },
                "solution": f"By Pythagoras theorem on the right-angled triangle formed by North ($12\\text{{ m}}$) and East ($5\\text{{ m}}$) legs:\n$$d = \\sqrt{{12^2 + 5^2}} = \\sqrt{{144 + 25}} = \\sqrt{{169}} = {d_origin:.1f}\\text{{ m}}$$",
                "difficulty": "Easy",
                "source": "A Modern Approach to Verbal and Non-Verbal Reasoning (R.S. Aggarwal)"
            })
        elif i % 3 == 2:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Family blood relation deduction",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "Pointing to a photograph, a woman says: 'He is the son of the only daughter of my father.' How is the man in the photograph related to the woman?",
                "options": {
                    "A": "Son",
                    "B": "Brother",
                    "C": "Father",
                    "D": "Uncle"
                },
                "correct_answer": "A",
                "solution": "'The only daughter of my father' is the woman herself. Therefore, 'the son of the only daughter of my father' is her own son.",
                "difficulty": "Easy",
                "source": "A Modern Approach to Verbal and Non-Verbal Reasoning (R.S. Aggarwal)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Linear seating arrangement constraints",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "Five researchers (A, B, C, D, E) sit in a row facing North. B is sitting immediately between A and C. E is to the immediate right of C. D is at the extreme left end. Who is sitting in the exact middle of the row?",
                "options": {
                    "A": "B",
                    "B": "A",
                    "C": "C",
                    "D": "E"
                },
                "correct_answer": "A",
                "solution": "Arranging from left to right:\n- D is at extreme left: [D, _, _, _, _]\n- A, B, C sit consecutively with B between A and C, and E is immediately right of C: [D, A, B, C, E].\nThe exact middle position (3rd of 5) is occupied by B.",
                "difficulty": "Easy",
                "source": "A Modern Approach to Verbal and Non-Verbal Reasoning (R.S. Aggarwal)"
            })

    # 10. Spatial: 2D/3D Paper Folding, Assembly & Projections (50 questions with SVG diagram)
    for i in range(1, 51):
        qid = f"QB_GA_SPT_{i:03d}"
        topic = "Spatial: 2D/3D Paper Folding, Assembly & Projections"
        sub = "Cube net folding and opposite faces identification"
        if i % 3 == 1:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Opposite face in unfolded cube net",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "diagram_svg": SVG_CUBE_NET,
                "question": "The accompanying diagram shows the unfolded net of a six-faced cube with faces numbered 1 to 6. When this net is folded into a 3D cube, which face will be strictly OPPOSITE to face 2?",
                "options": {
                    "A": "Face 4",
                    "B": "Face 3",
                    "C": "Face 1",
                    "D": "Face 5"
                },
                "correct_answer": "A",
                "solution": "In a continuous 4-in-a-line row of an unfolded cube net, alternating faces are opposite to each other:\n- Face 1 is opposite to Face 3\n- Face 2 is opposite to Face 4\n- The two projecting lateral tabs (Face 5 and Face 6) fold to become top and bottom opposite faces.\nHence, Face 2 is opposite to Face 4.",
                "difficulty": "Easy",
                "source": "GATE General Aptitude (Official Standard)"
            })
        elif i % 3 == 2:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Orthographic first-angle projection rules",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "In first-angle orthographic engineering projection, which of the following standard view relationships is/are TRUE?",
                "options": {
                    "A": "The top view (plan) is projected vertically below the front view (elevation)",
                    "B": "The left-side view is projected to the right of the front view",
                    "C": "The object is conceived as lying between the observer and the projection planes",
                    "D": "The bottom view is placed directly below the plan view"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "1. In first-angle projection, top view is placed below front view (A is true).\n2. View from left is projected onto right plane (to the right of front view) (B is true).\n3. Object is placed between observer and projection plane (C is true).\n4. Bottom view is drawn ABOVE the front view, not below the plan view (D is false).",
                "difficulty": "Moderate",
                "source": "GATE General Aptitude (Official Standard)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Opposite face pair in cube net tabs",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "diagram_svg": SVG_CUBE_NET,
                "question": "Referring to the standard cube net shown in the diagram, which face is strictly opposite to Face 5?",
                "options": {
                    "A": "Face 6",
                    "B": "Face 2",
                    "C": "Face 3",
                    "D": "Face 4"
                },
                "correct_answer": "A",
                "solution": "In the standard Latin cross or T-shaped net of a cube, the two opposite tab extensions (numbered 5 and 6) fold perpendicular to the central strip to form the top and bottom lids of the cube, making Face 5 and Face 6 mutually opposite.",
                "difficulty": "Easy",
                "source": "GATE General Aptitude (Official Standard)"
            })

    # 11. Verbal: English Grammar, Syntax & Vocabulary (50 questions)
    for i in range(1, 51):
        qid = f"QB_GA_ENG_{i:03d}"
        topic = "Verbal: English Grammar, Syntax & Vocabulary"
        sub = "Subject-verb agreement and conditional clauses"
        if i % 3 == 1:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Subject-verb agreement with collective and conjunction phrases",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "Choose the grammatically correct option to complete the sentence:\n\"The professor, along with her research scholars, ________ attending the international agricultural symposium today.\"",
                "options": {
                    "A": "is",
                    "B": "are",
                    "C": "were",
                    "D": "have been"
                },
                "correct_answer": "A",
                "solution": "When a singular subject ('The professor') is accompanied by parenthetical prepositional phrases such as 'along with', 'as well as', or 'in addition to', the grammatical number of the subject remains singular. Therefore, the singular verb 'is' is correct.",
                "difficulty": "Easy",
                "source": "High School English Grammar and Composition (Wren and Martin)"
            })
        elif i % 3 == 2:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Third conditional counterfactual construction",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "Choose the correct phrase to complete the conditional sentence:\n\"If the monsoon rains ________ on schedule, the Kharif harvest would have been significantly higher.\"",
                "options": {
                    "A": "had arrived",
                    "B": "would arrive",
                    "C": "have arrived",
                    "D": "would have arrived"
                },
                "correct_answer": "A",
                "solution": "In the third conditional (counterfactual past), the 'if'-clause requires the past perfect tense ('had arrived') to pair with the main clause 'would have + past participle' ('would have been').",
                "difficulty": "Easy",
                "source": "High School English Grammar and Composition (Wren and Martin)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Vocabulary: Antonym of ubiquitous",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "Which of the following words is the most direct ANTONYM of the word 'UBIQUITOUS'?",
                "options": {
                    "A": "Rare / Scarce",
                    "B": "Omnipresent",
                    "C": "Pervasive",
                    "D": "Abundant"
                },
                "correct_answer": "A",
                "solution": "'Ubiquitous' means present, appearing, or found everywhere (synonyms: omnipresent, pervasive). Its direct antonym is 'rare', 'scarce', or 'infrequent'.",
                "difficulty": "Easy",
                "source": "High School English Grammar and Composition (Wren and Martin)"
            })

    # 12. Verbal: Critical Reasoning & Reading Comprehension (50 questions)
    for i in range(1, 51):
        qid = f"QB_GA_CRG_{i:03d}"
        topic = "Verbal: Critical Reasoning & Reading Comprehension"
        sub = "Identifying hidden assumption and logical fallacy"
        if i % 3 == 1:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Critical reasoning: underlying assumption",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "Read the argument and determine the unstated assumption:\n\"Adopting precision drip irrigation across the river basin will eliminate the regional groundwater crisis, because drip irrigation reduces field-level water application by $40\\%$.\"\nWhich of the following is an underlying assumption required for this conclusion to hold?",
                "options": {
                    "A": "Farmers will not expand the total irrigated crop acreage or switch to more water-intensive cash crops after adopting drip irrigation (Jevons paradox will not occur)",
                    "B": "Drip irrigation systems never experience emitter clogging",
                    "C": "Groundwater is the only source of water available in the entire country",
                    "D": "Rainfall will cease completely over the river basin"
                },
                "correct_answer": "A",
                "solution": "The argument assumes that water saved per hectare translates to absolute regional aquifer conservation. If farmers expand acreage or switch to thirsty crops with the saved water (rebound effect / Jevons paradox), total aquifer extraction may actually increase. Thus, Assumption A is strictly essential for the argument to hold.",
                "difficulty": "Moderate",
                "source": "GATE General Aptitude (Official Standard)"
            })
        elif i % 3 == 2:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Strengthening vs weakening an argument",
                "type": "MCQ",
                "marks": 1,
                "negative_marks": 0.33,
                "question": "Which of the following statements, if true, would most seriously WEAKEN the claim that 'introducing autonomous electric tractors will immediately reduce the total carbon footprint of national agriculture'?",
                "options": {
                    "A": "Over $80\\%$ of the national electricity grid powering the charging stations is generated from coal-fired thermal power plants",
                    "B": "Electric tractors operate with zero direct tailpipe exhaust emissions",
                    "C": "Electric motors have higher mechanical torque efficiency than diesel engines",
                    "D": "Autonomous guidance systems reduce operational field overlapping"
                },
                "correct_answer": "A",
                "solution": "If the electric grid relies heavily on coal combustion, emissions from electricity generation and transmission may equal or exceed diesel emissions on a lifecycle basis, directly undermining the claim of an immediate net carbon footprint reduction.",
                "difficulty": "Easy",
                "source": "GATE General Aptitude (Official Standard)"
            })
        else:
            add({
                "id": qid,
                "section": SEC,
                "topic": topic,
                "subtopic": "Inferring logical conclusions from short passage",
                "type": "MSQ",
                "marks": 2,
                "negative_marks": 0,
                "question": "Read the passage: \"Post-harvest storage losses in pulse grains in developing tropical nations often exceed $25\\%$, driven predominantly by bruchid beetle (*Callosobruchus maculatus*) infestation and high ambient humidity. Hermetic storage bags with multi-layered impermeable polymer liners suppress beetle proliferation by naturally suffocating them through grain and insect respiration without requiring synthetic chemical fumigants.\"\nWhich of the following statements can be LOGICALLY INFERRED from the passage?",
                "options": {
                    "A": "Hermetic bags create a modified low-oxygen, high-carbon-dioxide micro-atmosphere through metabolic respiration",
                    "B": "Bruchid beetles are an important biological factor contributing to tropical pulse storage losses",
                    "C": "Hermetic storage bags offer an eco-friendly pest control alternative that eliminates synthetic chemical fumigants",
                    "D": "Hermetic bags completely eliminate the need for proper grain drying prior to packaging"
                },
                "correct_answer": ["A", "B", "C"],
                "solution": "1. Respiration consumes $\\text{O}_2$ and generates $\\text{CO}_2$ in a sealed bag, causing asphyxiation (A is directly inferable).\n2. Passage states bruchids are a major driver of $25\\%$ losses (B is directly stated).\n3. Passage explicitly notes bags control pests without synthetic fumigants (C is directly stated).\n4. Packaging wet grains in airtight hermetic bags causes fungal molding and souring; drying is still required (D is false).",
                "difficulty": "Moderate",
                "source": "GATE General Aptitude (Official Standard)"
            })

    return questions
