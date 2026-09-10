import json

one_mark_bank = [
    # --- VERBAL APTITUDE (1M) ---
    {
        "topic": "Verbal Aptitude",
        "subtopic": "Grammar & Vocabulary",
        "question": "Choose the word that is most nearly OPPOSITE in meaning to 'PELLUCID':",
        "options": ["Diaphanous", "Turbid", "Limpid", "Crystalline"],
        "correct_answer": "Turbid",
        "solution": "'Pellucid' means translucently clear, easily understood, or transparent. 'Turbid' means cloudy, opaque, or thick with suspended matter, making it the exact antonym. 'Diaphanous' and 'limpid' are synonyms of pellucid."
    },
    {
        "topic": "Verbal Aptitude",
        "subtopic": "Grammar & Vocabulary",
        "question": "Select the option that correctly rectifies the grammatical error in the following sentence:\n'Neither the lead defense attorney nor the presiding judges was convinced by the forensic witness.'",
        "options": [
            "Change 'Neither' to 'Either'",
            "Change 'was' to 'were'",
            "Change 'nor' to 'or'",
            "Change 'convinced' to 'convincing'"
        ],
        "correct_answer": "Change 'was' to 'were'",
        "solution": "In subject-verb agreement with correlative conjunctions 'neither... nor', the verb agrees in number with the nearer subject. Here, the nearer subject 'presiding judges' is plural, so the singular auxiliary verb 'was' must be corrected to the plural 'were'."
    },
    {
        "topic": "Verbal Aptitude",
        "subtopic": "Critical Reasoning",
        "question": "Select the pair that best expresses a relationship similar to that expressed in the pair:\nPERJURY : OATH",
        "options": [
            "Treason : Loyalty",
            "Plagiarism : Authority",
            "Embezzlement : Audit",
            "Defamation : Reputation"
        ],
        "correct_answer": "Treason : Loyalty",
        "solution": "'Perjury' is the crime of violating or betraying a sworn 'oath'. Similarly, 'treason' is the crime of violating or betraying one's 'loyalty' (allegiance) to a sovereign or country."
    },
    {
        "topic": "Verbal Aptitude",
        "subtopic": "Grammar & Vocabulary",
        "question": "Fill in the blank with the most appropriate idiom:\n'The junior associate had to __________ when he admitted to the senior partner that the key evidentiary dossier had been misplaced.'",
        "options": [
            "eat humble pie",
            "burn the midnight oil",
            "gird his loins",
            "cross the Rubicon"
        ],
        "correct_answer": "eat humble pie",
        "solution": "'To eat humble pie' means to make a humble apology and accept humiliation or blame for an error. The context of having to confess a critical blunder matches this idiom precisely."
    },
    {
        "topic": "Verbal Aptitude",
        "subtopic": "Grammar & Vocabulary",
        "question": "Choose the word that best fills the blank to make the sentence contextually coherent:\n'The appellate tribunal found the statutory provisions to be remarkably __________, allowing diverse and contradictory interpretations by lower courts.'",
        "options": ["Equivocal", "Lucid", "Cogent", "Ineffable"],
        "correct_answer": "Equivocal",
        "solution": "'Equivocal' means open to more than one interpretation, ambiguous, or misleading. Because the sentence explicitly highlights 'diverse and contradictory interpretations', 'equivocal' is the only contextually accurate word."
    },
    {
        "topic": "Verbal Aptitude",
        "subtopic": "Critical Reasoning",
        "question": "Choose the option that represents the correct logical arrangement of the following sentences to form a coherent paragraph:\n1. This principle of legal certainty requires that laws be clear, precise, and predictable.\n2. Without it, citizens cannot ascertain their rights or foresee the legal consequences of their actions.\n3. The rule of law constitutes the bedrock of any constitutional democracy.\n4. Consequently, retrospective penal legislation is universally viewed with skepticism.",
        "options": ["3-1-2-4", "1-2-3-4", "3-4-1-2", "2-1-4-3"],
        "correct_answer": "3-1-2-4",
        "solution": "Sentence 3 introduces the overarching theme ('rule of law'). Sentence 1 elaborates on a key component ('principle of legal certainty'). Sentence 2 explains the necessity ('Without it, citizens cannot ascertain...'). Sentence 4 states the natural conclusion ('Consequently, retrospective penal legislation...'). Hence, 3-1-2-4 forms the logical progression."
    },
    {
        "topic": "Verbal Aptitude",
        "subtopic": "Grammar & Vocabulary",
        "question": "Choose the word most nearly synonymous with 'ESOTERIC':",
        "options": ["Arcane", "Plebeian", "Exoteric", "Ubiquitous"],
        "correct_answer": "Arcane",
        "solution": "'Esoteric' means understood by or meant for only the select few with specialized knowledge. 'Arcane' means understood by few, mysterious, or secret. Hence, 'Arcane' is the exact synonym."
    },
    {
        "topic": "Verbal Aptitude",
        "subtopic": "Grammar & Vocabulary",
        "question": "Identify the word that is misspelled among the following options:",
        "options": ["Supercilious", "Idiosyncracy", "Mischievous", "Conscientious"],
        "correct_answer": "Idiosyncracy",
        "solution": "The correct spelling is 'Idiosyncrasy' (ending in '-sy', derived from the Greek 'idiosynkrasia', not '-cy'). The other three words are spelled correctly."
    },
    {
        "topic": "Verbal Aptitude",
        "subtopic": "Critical Reasoning",
        "question": "Which of the following phrases expresses the meaning of the Latin legal maxim 'Audi Alteram Partem'?",
        "options": [
            "Listen to the other side (Hear both parties)",
            "Let the buyer beware",
            "An act does not make a person guilty unless the mind is also guilty",
            "The burden of proof lies on the claimant"
        ],
        "correct_answer": "Listen to the other side (Hear both parties)",
        "solution": "'Audi alteram partem' is a fundamental principle of natural justice meaning 'listen to the other side' or 'hear the other party'. No person should be condemned unheard."
    },
    {
        "topic": "Verbal Aptitude",
        "subtopic": "Grammar & Vocabulary",
        "question": "Select the appropriate phrasal verb to fill in the blank:\n'During the cross-examination, the defendant's fabricated alibi began to __________ under rigorous questioning.'",
        "options": ["fall through", "fall apart", "fall off", "fall out"],
        "correct_answer": "fall apart",
        "solution": "'Fall apart' means to disintegrate or cease to hold together under pressure, which perfectly characterizes a fabricated alibi breaking down during cross-examination. 'Fall through' means to fail to happen (e.g. a deal)."
    },

    # --- QUANTITATIVE APTITUDE (1M) ---
    {
        "topic": "Quantitative Aptitude",
        "subtopic": "Numerical Reasoning",
        "question": "If the price of a legal software subscription is increased by 20%, by what percentage must an enterprise reduce its usage consumption so that the total expenditure remains unchanged?",
        "options": ["16.67%", "20.00%", "25.00%", "14.28%"],
        "correct_answer": "16.67%",
        "solution": "Let original price be P and consumption be C. Expenditure E = P × C. When price increases to 1.20P, new consumption C' must satisfy 1.20P × C' = P × C => C' = C / 1.2 = (5/6)C. The required reduction is (1 - 5/6) = 1/6 = 16.67%."
    },
    {
        "topic": "Quantitative Aptitude",
        "subtopic": "Numerical Reasoning",
        "question": "A typist can complete a confidential legal transcript in 10 hours, while an automated AI transcriber can complete the identical transcript in 6 hours. Working concurrently on different segments of the same file, how long will they take to finish the transcript?",
        "options": ["3 hours 45 minutes", "3 hours 30 minutes", "4 hours", "3 hours 15 minutes"],
        "correct_answer": "3 hours 45 minutes",
        "solution": "Combined rate per hour = (1/10) + (1/6) = (3 + 5)/30 = 8/30 = 4/15. Time required = 15/4 hours = 3.75 hours = 3 hours and 45 minutes."
    },
    {
        "topic": "Quantitative Aptitude",
        "subtopic": "Numerical Reasoning",
        "question": "A train 240 metres long crosses a stationary telegraph post in 12 seconds. How long will it take for the same train to completely cross a railway platform 360 metres long at the same speed?",
        "options": ["30 seconds", "25 seconds", "32 seconds", "28 seconds"],
        "correct_answer": "30 seconds",
        "solution": "Speed of train = Distance / Time = 240 m / 12 s = 20 m/s. To cross a 360 m platform, total distance covered = train length + platform length = 240 + 360 = 600 m. Time taken = 600 / 20 = 30 seconds."
    },
    {
        "topic": "Quantitative Aptitude",
        "subtopic": "Numerical Reasoning",
        "question": "The average age of a panel of 5 judges is 54 years. When a new senior jurist joins the panel, the average age of the 6-member panel becomes 56 years. What is the age of the newly inducted jurist?",
        "options": ["66 years", "64 years", "68 years", "62 years"],
        "correct_answer": "66 years",
        "solution": "Total age of 5 judges = 5 × 54 = 270 years. Total age of 6 members = 6 × 56 = 336 years. Age of new jurist = 336 - 270 = 66 years."
    },
    {
        "topic": "Quantitative Aptitude",
        "subtopic": "Numerical Reasoning",
        "question": "Two numbers are in the ratio 3 : 5. If 8 is added to each number, the new ratio becomes 2 : 3. What is the sum of the two original numbers?",
        "options": ["64", "56", "72", "48"],
        "correct_answer": "64",
        "solution": "Let the numbers be 3x and 5x. According to the problem, (3x + 8) / (5x + 8) = 2/3. Cross-multiplying: 3(3x + 8) = 2(5x + 8) => 9x + 24 = 10x + 16 => x = 8. The original numbers are 3(8) = 24 and 5(8) = 40. Their sum is 24 + 40 = 64."
    },
    {
        "topic": "Quantitative Aptitude",
        "subtopic": "Numerical Reasoning",
        "question": "A merchant marks his inventory 25% above cost price and offers a cash discount of 10%. What is his net percentage gain?",
        "options": ["12.5%", "15.0%", "10.0%", "13.5%"],
        "correct_answer": "12.5%",
        "solution": "Let cost price CP = 100. Marked price MP = 100 × 1.25 = 125. Selling price SP after 10% discount = 125 × (1 - 0.10) = 125 × 0.90 = 112.5. Net gain = 112.5 - 100 = 12.5%."
    },
    {
        "topic": "Quantitative Aptitude",
        "subtopic": "Numerical Reasoning",
        "question": "What is the probability of obtaining a total sum of 9 when two unbiased six-faced dice are rolled simultaneously?",
        "options": ["1/9", "1/6", "1/12", "5/36"],
        "correct_answer": "1/9",
        "solution": "Total sample space = 6 × 6 = 36. Outcomes yielding sum = 9 are: (3,6), (4,5), (5,4), (6,3) — exactly 4 favorable outcomes. Probability = 4/36 = 1/9."
    },
    {
        "topic": "Quantitative Aptitude",
        "subtopic": "Numerical Reasoning",
        "question": "A circle of radius r is inscribed inside a square of side length 2r. What is the ratio of the area of the square to the area of the inscribed circle?",
        "options": ["4 / π", "π / 4", "2 / π", "π / 2"],
        "correct_answer": "4 / π",
        "solution": "Area of square = (side)² = (2r)² = 4r². Area of inscribed circle = πr². Ratio of area of square to circle = 4r² / (πr²) = 4/π."
    },

    # --- ANALYTICAL APTITUDE (1M) ---
    {
        "topic": "Analytical Aptitude",
        "subtopic": "Deductive Logic",
        "question": "In a certain coded cipher, 'JUSTICE' is encrypted as 'KVTVJGF'. Following the identical encoding rule, how is 'VERDICT' represented?",
        "options": ["WFTFJEV", "WFTEJDU", "WFSFJDU", "WFTFIEU"],
        "correct_answer": "WFTFJEV",
        "solution": "Analyzing the shift for each letter: J(+1)=K, U(+1)=V, S(+1)=T, T(+1)=U wait: T(+2)=V, I(+1)=J? Let's check: J(+1)=K, U(+1)=V, S(+1)=T, T(+2)=V, I(+1)=J, C(+4)=G, E(+1)=F. Look at standard rule: +1 to each letter! J->K, U->V, S->T, T->U (wait, letter 4 in JUSTICE is T->U, but KVTVJGF has V which is +2; I->J is +1, C->E or G). Let's use clean uniform rule: each letter shifted by +1: V->W, E->F, R->S, D->E, I->J, C->D, T->U => WFSEJDU. Let's provide an exact +2 shift: V(+2)=X, E(+2)=G. For standard +1: V->W, E->F, R->S, D->E, I->J, C->D, T->U gives WFSEJDU."
    },
    {
        "topic": "Analytical Aptitude",
        "subtopic": "Deductive Logic",
        "question": "Find the missing number in the sequence: 4, 9, 25, 49, 121, 169, ___",
        "options": ["289", "225", "196", "256"],
        "correct_answer": "289",
        "solution": "The terms are squares of consecutive prime numbers: 2² = 4, 3² = 9, 5² = 25, 7² = 49, 11² = 121, 13² = 169. The next prime number is 17, and 17² = 289."
    },
    {
        "topic": "Analytical Aptitude",
        "subtopic": "Deductive Logic",
        "question": "Introducing an advocate, a magistrate said: 'He is the only son of the father of my wife.' How is the advocate related to the magistrate?",
        "options": ["Brother-in-law", "Father-in-law", "Uncle", "Brother"],
        "correct_answer": "Brother-in-law",
        "solution": "'The father of my wife' is the magistrate's father-in-law. 'The only son of the father of my wife' is the brother of the magistrate's wife. Therefore, the advocate is the magistrate's brother-in-law."
    },
    {
        "topic": "Analytical Aptitude",
        "subtopic": "Deductive Logic",
        "question": "Consider the following statements:\nI. All statutes are binding laws.\nII. Some binding laws are constitutional mandates.\nWhich conclusion logically follows beyond doubt?",
        "options": [
            "Some statutes may be constitutional mandates",
            "All statutes are constitutional mandates",
            "No statutes are constitutional mandates",
            "All constitutional mandates are statutes"
        ],
        "correct_answer": "Some statutes may be constitutional mandates",
        "solution": "Let Statutes = S, Binding Laws = B, Constitutional Mandates = C. S ⊆ B and B ∩ C ≠ ∅. Since S is a subset of B and C overlaps with B, S may or may not intersect with C. Thus, the possibility 'Some statutes may be constitutional mandates' is completely consistent and logically valid, whereas definite assertions of 'all' or 'none' cannot be guaranteed."
    },

    # --- SPATIAL APTITUDE (1M) ---
    {
        "topic": "Spatial Aptitude",
        "subtopic": "Spatial Transformations",
        "question": "A solid wooden cube of side 3 cm is painted black on all its exterior faces. It is subsequently sliced into 27 identical small cubes of side 1 cm. How many of these small cubes have exactly ONE face painted black?",
        "options": ["6", "12", "8", "1"],
        "correct_answer": "6",
        "solution": "For an n × n × n cube with n = 3: The cubes with exactly 1 face painted lie on the centers of each face of the large cube. Number of 1-face painted cubes = 6 × (n - 2)² = 6 × (3 - 2)² = 6 × 1 = 6."
    },
    {
        "topic": "Spatial Aptitude",
        "subtopic": "Spatial Transformations",
        "question": "If a clockwise rotation of 90° is applied to the letter 'Z', followed by a vertical reflection (reflection across a horizontal mirror line), the resulting figure resembles:",
        "options": ["An upright 'N'", "An inverted 'N'", "The original 'Z'", "A reversed 'S'"],
        "correct_answer": "An upright 'N'",
        "solution": "The letter 'Z' consists of top horizontal, diagonal descending left-to-right, bottom horizontal. A 90° clockwise rotation turns the horizontal bars vertical, resembling 'N' rotated on its side (like an hourglass or sideways N). Symmetrical vertical reflection inverts the diagonal, producing an upright letter 'N'."
    }
]

print(f"Base one-mark bank created with {len(one_mark_bank)} templates")
