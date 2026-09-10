export default [
  {
    "id": "QB_GA_001",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Ratios & Percentages",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "R.S. Aggarwal (Quantitative Aptitude) / GATE Official General Aptitude Archives",
    "question": "The price of a book is first increased by $20\\%$ and subsequently decreased by $20\\%$. The net percentage change in the price of the book is ________ % (answer in integer).",
    "correct_answer": "-4",
    "numerical_range": {
      "min": -4,
      "max": -4
    },
    "solution": "Let initial price be $100$.\n1. After $20\\%$ increase: $100 \\times 1.20 = 120$.\n2. After $20\\%$ decrease: $120 \\times (1 - 0.20) = 120 \\times 0.80 = 96$.\nNet change: $96 - 100 = -4\\%$.\nAlternatively, using the successive percentage formula $a + b + \\frac{ab}{100}$:\n$$20 - 20 + \\frac{20 \\times (-20)}{100} = -\\frac{400}{100} = -4\\%$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_GA_002",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Numerical Computation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R.S. Aggarwal (Quantitative Aptitude) / GATE Official General Aptitude Archives",
    "question": "Pipe A can fill a tank in $12\\text{ hours}$, while Pipe B can fill it in $15\\text{ hours}$. Pipe C can empty the full tank in $20\\text{ hours}$. If all three pipes are opened simultaneously, the time taken in hours to fill the empty tank completely is ________ (answer in integer).",
    "correct_answer": "10",
    "numerical_range": {
      "min": 10,
      "max": 10
    },
    "solution": "Let the capacity of the tank be the LCM of $(12, 15, 20) = 60\\text{ units}$.\n• Pipe A filling rate $= \\frac{60}{12} = +5\\text{ units/hour}$\n• Pipe B filling rate $= \\frac{60}{15} = +4\\text{ units/hour}$\n• Pipe C emptying rate $= \\frac{60}{20} = -3\\text{ units/hour}$\nNet rate of work $= 5 + 4 - 3 = 6\\text{ units/hour}$.\nTime required to fill tank $= \\frac{60\\text{ units}}{6\\text{ units/hour}} = 10\\text{ hours}$.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_GA_003",
    "section": "Section 8: General Aptitude",
    "topic": "Verbal Aptitude",
    "subtopic": "Basic English Grammar & Vocabulary",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Wren & Martin (High School English Grammar & Composition) / GATE Official General Aptitude Archives",
    "question": "Choose the most appropriate word to complete the sentence:\n\"Neither the project manager nor the field engineers ________ informed about the sudden postponement of the soil survey.\"",
    "options": {
      "A": "was",
      "B": "were",
      "C": "has",
      "D": "is"
    },
    "correct_answer": "B",
    "solution": "Subject-verb agreement rule with \"neither... nor\": when subjects of different numbers are joined by \"or\" or \"nor\", the verb agrees with the subject closest to it. Here, the closest subject is plural (\"field engineers\"), requiring the plural verb \"were\".",
    "difficulty": "Easy"
  },
  {
    "id": "QB_GA_004",
    "section": "Section 8: General Aptitude",
    "topic": "Verbal Aptitude",
    "subtopic": "Critical Reasoning",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "source": "R.S. Aggarwal (A Modern Approach to Verbal & Non-Verbal Reasoning) / GATE Official General Aptitude Archives",
    "question": "Statements:\nI. All agronomists are researchers.\nII. Some researchers are drone pilots.\nWhich of the following conclusions can be logically derived beyond doubt?",
    "options": {
      "A": "All drone pilots are agronomists",
      "B": "Some agronomists are drone pilots",
      "C": "At least some researchers are agronomists",
      "D": "No agronomist is a drone pilot"
    },
    "correct_answer": "C",
    "solution": "From Statement I (\"All agronomists are researchers\"), by immediate conversion (subalternation), \"Some researchers are agronomists\". Since Statement II only states that some researchers are drone pilots without specifying whether they overlap with the agronomist subset, neither A, B, nor D can be affirmed with certainty. Thus, only C is logically certain.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_GA_005",
    "section": "Section 8: General Aptitude",
    "topic": "Analytical & Spatial Aptitude",
    "subtopic": "Logic Deduction & Pattern Recognition",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R.S. Aggarwal (A Modern Approach to Verbal & Non-Verbal Reasoning) / GATE Official General Aptitude Archives",
    "question": "Find the next missing number in the sequence: $2, 6, 12, 20, 30, 42, \\underline{\\hspace{1.5cm}}$ (answer in integer).",
    "correct_answer": "56",
    "numerical_range": {
      "min": 56,
      "max": 56
    },
    "solution": "Look at the differences between consecutive terms:\n• $6 - 2 = 4$\n• $12 - 6 = 6$\n• $20 - 12 = 8$\n• $30 - 20 = 10$\n• $42 - 30 = 12$\nThe differences form an arithmetic progression increasing by 2: $4, 6, 8, 10, 12, 14$.\nNext term $= 42 + 14 = 56$.\n(Alternatively, the sequence is $n(n+1)$ for $n=1, 2, 3, 4, 5, 6, 7 \\implies 7 \\times 8 = 56$).",
    "difficulty": "Easy"
  },
  {
    "id": "QB_GA_006",
    "section": "Section 8: General Aptitude",
    "topic": "Analytical & Spatial Aptitude",
    "subtopic": "Spatial Reasoning & 3D Representations",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "R.S. Aggarwal (A Modern Approach to Verbal & Non-Verbal Reasoning) / GATE Official General Aptitude Archives",
    "question": "Which of the following geometric nets can be folded along their seams to form a regular closed cube without overlapping faces?",
    "options": {
      "A": "A cross-shaped net with 4 squares in a central vertical column and 1 square on each side of the second square",
      "B": "A T-shaped net with 4 squares in a vertical column and 2 squares on one side",
      "C": "A stair-step net with 3 adjacent rows of 2 squares each forming a zigzag 6-square shape",
      "D": "A row of 5 squares with 1 extra square attached"
    },
    "correct_answer": [
      "A",
      "C"
    ],
    "solution": "There are exactly 11 distinct valid nets for a cube. The Latin cross net (1-4-1 layout) and the zigzag stair net (3-3 or 2-2-2) fold into a 3D cube. A strip of 5 squares or nets with overlapping flaps cannot form a 6-faced cube.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_GA_007",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Numerical Computation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R.S. Aggarwal (Quantitative Aptitude) / GATE Official General Aptitude Archives",
    "question": "A train moving at a uniform speed of $72\\text{ km/h}$ completely crosses a stationary platform of length $250\\text{ m}$ in $20\\text{ seconds}$. The length of the train in metres is ________ (answer in integer).",
    "correct_answer": "150",
    "numerical_range": {
      "min": 150,
      "max": 150
    },
    "solution": "1. Speed in $\\text{m/s}$:\n$$v = 72 \\times \\frac{5}{18} = 20\\text{ m/s}$$\n2. Total distance travelled during crossing:\n$$D = v \\times t = 20\\text{ m/s} \\times 20\\text{ s} = 400\\text{ m}$$\n3. Total distance equals train length ($L_t$) plus platform length ($L_p$):\n$$L_t + 250 = 400 \\implies L_t = 400 - 250 = 150\\text{ m}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_GA_008",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Numerical Computation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R.S. Aggarwal (Quantitative Aptitude) / GATE Official General Aptitude Archives",
    "question": "A bag contains 5 red balls, 4 green balls, and 3 blue balls. If two balls are drawn at random simultaneously without replacement, the probability that both balls are red is expressed in simplest fraction form as $\\frac{p}{q}$. The value of $(p + q)$ is ________ (answer in integer).",
    "correct_answer": "38",
    "numerical_range": {
      "min": 38,
      "max": 38
    },
    "solution": "1. Total number of balls $= 5 + 4 + 3 = 12$.\n2. Total possible outcomes when drawing 2 balls:\n$$n(S) = \\binom{12}{2} = \\frac{12 \\times 11}{2} = 66$$\n3. Favourable outcomes of drawing 2 red balls from 5 red balls:\n$$n(E) = \\binom{5}{2} = \\frac{5 \\times 4}{2} = 10$$\n4. Probability $P = \\frac{10}{66} = \\frac{5}{33}$.\nHere $p = 5$ and $q = 33$, so $p + q = 5 + 33 = 38$.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_GA_009",
    "section": "Section 8: General Aptitude",
    "topic": "Verbal Aptitude",
    "subtopic": "Basic English Grammar & Vocabulary",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Wren & Martin (High School English Grammar & Composition) / GATE Official General Aptitude Archives",
    "question": "Choose the pair that best expresses a relationship similar to that expressed in the original pair:\n**TRACTOR : AGRICULTURE**",
    "options": {
      "A": "SCALPEL : SURGERY",
      "B": "PEN : NOVEL",
      "C": "CHISEL : WOOD",
      "D": "STETHOSCOPE : DISEASE"
    },
    "correct_answer": "A",
    "solution": "A tractor is the primary operational mechanical instrument used by a professional in agriculture, just as a scalpel is the primary surgical instrument used by a surgeon in surgery.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_GA_010",
    "section": "Section 8: General Aptitude",
    "topic": "Analytical & Spatial Aptitude",
    "subtopic": "Logic Deduction & Pattern Recognition",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "R.S. Aggarwal (A Modern Approach to Verbal & Non-Verbal Reasoning) / GATE Official General Aptitude Archives",
    "question": "Given the premise: \"Every agrarian economy depends critically on rainfall.\" If Province Z is an agrarian economy, which of the following conclusions must be logically valid?",
    "options": {
      "A": "Province Z depends critically on rainfall",
      "B": "Province Z receives heavy rainfall throughout the year",
      "C": "Every economy that depends on rainfall is agrarian",
      "D": "Province Z has no irrigation infrastructure"
    },
    "correct_answer": "A",
    "solution": "This is a direct application of categorical syllogism (Modus Ponens): All A are B. Z is an A. Therefore, Z is B. Hence Province Z depends critically on rainfall.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_GA_011",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Ratios & Percentages",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R.S. Aggarwal (Quantitative Aptitude) / GATE Official General Aptitude Archives",
    "question": "In an agricultural engineering college, the ratio of male students to female students was $5 : 3$. At the beginning of the semester, 50 male students graduated and left, while 50 female students newly enrolled, changing the ratio to $9 : 7$. The initial number of male students was ________ (answer in integer).",
    "correct_answer": "500",
    "numerical_range": {
      "min": 500,
      "max": 500
    },
    "solution": "Let the initial number of male students be $5x$ and female students be $3x$.\nAfter the change:\n$$\\frac{5x - 50}{3x + 50} = \\frac{9}{7}$$\n$$7(5x - 50) = 9(3x + 50)$$\n$$35x - 350 = 27x + 450$$\n$$35x - 27x = 450 + 350 \\implies 8x = 800 \\implies x = 100$$\nInitial number of male students $= 5x = 5(100) = 500$.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_GA_VA_001",
    "section": "Section 8: General Aptitude",
    "topic": "Verbal Aptitude",
    "subtopic": "Basic English Grammar & Vocabulary",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Wren & Martin (High School English Grammar & Composition) / GATE Official General Aptitude Archives",
    "question": "Choose the correct preposition to complete the sentence:\n\"The technical committee agreed ________ the proposed alterations to the watershed conservation plan after extensive field deliberation.\"",
    "options": {
      "A": "with",
      "B": "to",
      "C": "on",
      "D": "for"
    },
    "correct_answer": "B",
    "solution": "In standard English grammar, one agrees *with* a person or opinion, but agrees *to* a proposal, plan, or alteration. Therefore, \"agreed to the proposed alterations\" is grammatically correct.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_GA_VA_002",
    "section": "Section 8: General Aptitude",
    "topic": "Verbal Aptitude",
    "subtopic": "Basic English Grammar & Vocabulary",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Norman Lewis (Word Power Made Easy) / GATE Official General Aptitude Archives",
    "question": "Select the word that is most nearly OPPOSITE in meaning to the capitalized word:\n**EPHEMERAL**",
    "options": {
      "A": "Transient",
      "B": "Perpetual",
      "C": "Evanescent",
      "D": "Fleeting"
    },
    "correct_answer": "B",
    "solution": "\"Ephemeral\" means lasting for a very short time (transitory, fleeting, evanescent). The antonym is \"Perpetual\", which means continuing forever or indefinitely.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_GA_VA_003",
    "section": "Section 8: General Aptitude",
    "topic": "Verbal Aptitude",
    "subtopic": "Basic English Grammar & Vocabulary",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "source": "Wren & Martin (High School English Grammar & Composition) / GATE Official General Aptitude Archives",
    "question": "Identify the grammatically correct sentence illustrating proper negative inversion from the options below:",
    "options": {
      "A": "Not only did the harvest fail, but the granary was also destroyed by pests.",
      "B": "Not only the harvest failed, but the granary was also destroyed by pests.",
      "C": "Not only did the harvest failed, but the granary was also destroyed by pests.",
      "D": "The harvest failed not only, but also the granary was destroyed by pests."
    },
    "correct_answer": "A",
    "solution": "When a sentence begins with the negative coordinating correlative \"Not only\", it triggers subject-auxiliary inversion: \"Not only did [auxiliary] + the harvest [subject] + fail [base verb]...\". Option A correctly applies this inverted syntax, followed by a balanced independent clause.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_GA_VA_004",
    "section": "Section 8: General Aptitude",
    "topic": "Verbal Aptitude",
    "subtopic": "Basic English Grammar & Vocabulary",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Norman Lewis (Word Power Made Easy) / GATE Official General Aptitude Archives",
    "question": "Choose the word that best fills the blank:\n\"The lead agronomist was known for his ________ nature; he rarely spoke in team seminars unless asked directly about his experimental data.\"",
    "options": {
      "A": "garrulous",
      "B": "reticent",
      "C": "loquacious",
      "D": "effusive"
    },
    "correct_answer": "B",
    "solution": "\"Reticent\" means disposed to be silent or not to speak freely; reserved. Garrulous and loquacious mean excessively talkative, while effusive means expressing feelings of gratitude or pleasure in an unrestrained manner.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_GA_VA_005",
    "section": "Section 8: General Aptitude",
    "topic": "Verbal Aptitude",
    "subtopic": "Basic English Grammar & Vocabulary",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "Wren & Martin (High School English Grammar & Composition) / GATE Official General Aptitude Archives",
    "question": "Which of the following sentences contain(s) a dangling modifier or misplaced modifier defect?",
    "options": {
      "A": "Walking across the experimental crop field, the soil moisture sensor was found by the technician.",
      "B": "Having completed the tractor dynamometer test, the electronic data loggers were switched off.",
      "C": "To evaluate the grain harvesting loss, the combine harvester was inspected thoroughly by the research team.",
      "D": "Soaking in the nutrient solution for three hours, the seed germination rate increased significantly."
    },
    "correct_answer": [
      "A",
      "B",
      "D"
    ],
    "solution": "A dangling modifier occurs when the intended subject of an introductory participial phrase does not match the grammatical subject of the main clause:\n• In A, \"Walking...\" erroneously modifies \"the soil moisture sensor\" (the sensor was not walking).\n• In B, \"Having completed...\" modifies \"the electronic data loggers\" (the loggers did not complete the test).\n• In D, \"Soaking...\" modifies \"the germination rate\" (the rate itself was not soaking).\nSentence C correctly connects the infinitive clause of purpose with the passive action carried out by the research team.",
    "difficulty": "Hard"
  },
  {
    "id": "QB_GA_VA_006",
    "section": "Section 8: General Aptitude",
    "topic": "Verbal Aptitude",
    "subtopic": "Reading Comprehension",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "source": "GATE Official General Aptitude Archives",
    "question": "Read the passage and answer the question:\n\"Precision agriculture relies fundamentally on spatial variability mapping. By deploying global positioning systems and multispectral reflectance sensors, variable-rate fertilizer applicators adjust nutrient delivery in real time. Rather than treating an entire field as a homogenous expanse, inputs are localized to match soil fertility deficits, which curtail excess nitrate leaching into subterranean aquifers and enhances input-use efficiency.\"\nWhich of the following statements is most directly supported by the passage?",
    "options": {
      "A": "Precision agriculture eliminates the necessity of soil testing and laboratory analyses entirely.",
      "B": "Variable-rate fertilizer application treats farm fields as uniform zones to simplify tractor navigation.",
      "C": "Localizing nutrient application based on spatial variability mitigates groundwater contamination.",
      "D": "Multispectral sensors increase nitrate leaching by accelerating fertilizer chemical absorption."
    },
    "correct_answer": "C",
    "solution": "The passage explicitly states that inputs are localized to match soil deficits, \"which curtail excess nitrate leaching into subterranean aquifers and enhances input-use efficiency.\" Hence, mitigating groundwater (subterranean aquifer) contamination is directly supported.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_GA_VA_007",
    "section": "Section 8: General Aptitude",
    "topic": "Verbal Aptitude",
    "subtopic": "Reading Comprehension",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "source": "GATE Official General Aptitude Archives",
    "question": "Read the passage and answer the question:\n\"Renewable bioenergy systems often face an energy return on investment (EROI) paradox. While sugarcane bioethanol delivers an EROI exceeding $8:1$, corn-based ethanol exhibits an EROI marginally above unity ($1.2:1$ to $1.5:1$) when energy inputs from tractor diesel, nitrogen synthesis, distillation steam, and transport logistics are comprehensively accounted for. Thus, life-cycle carbon neutrality cannot be assumed merely by virtue of biological feedstock origin.\"\nThe author's primary argument in the passage is that:",
    "options": {
      "A": "All biological feedstocks provide equal thermodynamic advantages over fossil fuels.",
      "B": "Biofuel sustainability must be assessed through comprehensive life-cycle energy accounting rather than assumed origin.",
      "C": "Sugarcane bioethanol is thermodynamically unsustainable due to high distillation energy requirements.",
      "D": "Corn ethanol should replace sugarcane bioethanol due to superior agricultural productivity."
    },
    "correct_answer": "B",
    "solution": "The author contrasts the high EROI of sugarcane with the marginal EROI of corn ethanol when accounting for all upstream inputs, concluding that \"life-cycle carbon neutrality cannot be assumed merely by virtue of biological feedstock origin.\" This directly supports option B.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_GA_VA_008",
    "section": "Section 8: General Aptitude",
    "topic": "Verbal Aptitude",
    "subtopic": "Reading Comprehension",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "GATE Official General Aptitude Archives",
    "question": "Read the excerpt and select the valid deduction(s):\n\"Post-harvest cold chains in tropical developing nations suffer from fragmented last-mile infrastructure. Smallholders often lack access to on-farm precooling facilities, forcing produce to remain at ambient field temperatures ($30^\\circ\\text{C}$ to $38^\\circ\\text{C}$) during initial transport. This thermal exposure triggers rapid respiratory heat generation, enzymatic softening, and accelerated moisture transpiration, which collectively degrade commercial shelf life before the commodity ever enters refrigerated distribution hubs.\"",
    "options": {
      "A": "Produce deterioration is accelerated by elevated respiration and transpiration caused by lack of immediate on-farm precooling.",
      "B": "Refrigerated distribution hubs completely restore the physiological shelf-life lost during ambient transport.",
      "C": "In tropical conditions, ambient temperatures between $30^\\circ\\text{C}$ and $38^\\circ\\text{C}$ trigger biochemical degradation in freshly harvested produce.",
      "D": "A robust cold chain requires addressing infrastructure bottlenecks at the farm-gate level."
    },
    "correct_answer": [
      "A",
      "C",
      "D"
    ],
    "solution": "• A is directly stated: lack of precooling triggers rapid respiration and transpiration.\n• C is directly stated: field temperatures ($30^\\circ\\text{C}$ to $38^\\circ\\text{C}$) trigger enzymatic softening and decay.\n• D is a valid inference: since degradation occurs before entering hubs, last-mile/on-farm bottlenecks must be resolved.\n• B is incorrect: refrigerated hubs preserve remaining shelf-life but cannot reverse physiological senescence or moisture lost.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_GA_VA_009",
    "section": "Section 8: General Aptitude",
    "topic": "Verbal Aptitude",
    "subtopic": "Reading Comprehension",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "GATE Official General Aptitude Archives",
    "question": "Read the statement and identify the tone of the author:\n\"Despite exuberant commercial claims that autonomous weeding robots would eradicate chemical herbicide usage overnight, rigorous empirical farm trials demonstrate modest $15\\%$ reductions accompanied by prohibitive capital acquisition costs and frequent software disengagements in muddy soil terrain.\"",
    "options": {
      "A": "Enthusiastic and optimistic",
      "B": "Sceptical and pragmatic",
      "C": "Indifferent and dismissive",
      "D": "Belligerent and sarcastic"
    },
    "correct_answer": "B",
    "solution": "The author contrasts \"exuberant commercial claims\" with \"rigorous empirical farm trials\" demonstrating modest gains and high costs, exhibiting a critical, grounded, and evidence-based (sceptical and pragmatic) attitude.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_GA_VA_010",
    "section": "Section 8: General Aptitude",
    "topic": "Verbal Aptitude",
    "subtopic": "Critical Reasoning",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "source": "R.S. Aggarwal (A Modern Approach to Verbal & Non-Verbal Reasoning) / GATE Official General Aptitude Archives",
    "question": "Consider the argument:\n\"A regional agricultural cooperative introduced subsidized solar irrigation pumps across a drought-prone district. Two years later, the groundwater table dropped by an alarming $4\\text{ metres}$, even though annual rainfall was normal. The cooperative concluded that solar pumps directly caused the water table depletion by eliminating the marginal fuel cost of pumping, thereby incentivizing farmers to pump water continuously.\"\nWhich of the following, if true, most strongly WEAKENS the cooperative's conclusion?",
    "options": {
      "A": "Solar pumps require minimal routine mechanical maintenance compared to diesel engines.",
      "B": "Concurrently with the solar pump scheme, the regional government mandated a shift from low-water millets to water-intensive sugarcane cultivation across the entire district.",
      "C": "Farmers with solar pumps reported higher seasonal gross revenues than those operating diesel pumps.",
      "D": "The photovoltaic panels degraded in energy conversion efficiency by $2\\%$ per year due to dust deposition."
    },
    "correct_answer": "B",
    "solution": "To weaken a causal claim ($X \\implies Y$), demonstrating an alternative confounding cause that independently accounts for the observed effect is standard. Mandating water-intensive sugarcane across the district directly explains massive groundwater depletion, weakening the claim that solar pumps were the primary culprit.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_GA_VA_011",
    "section": "Section 8: General Aptitude",
    "topic": "Verbal Aptitude",
    "subtopic": "Critical Reasoning",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "source": "R.S. Aggarwal (A Modern Approach to Verbal & Non-Verbal Reasoning) / GATE Official General Aptitude Archives",
    "question": "Statements:\n1. Some drip irrigation systems are automated.\n2. All automated systems require electronic sensors.\n3. No sensor-operated device is completely maintenance-free.\nWhich of the following conclusions logically follows beyond doubt?",
    "options": {
      "A": "All drip irrigation systems require electronic sensors.",
      "B": "Some drip irrigation systems are not completely maintenance-free.",
      "C": "No drip irrigation system is automated.",
      "D": "All automated systems are drip irrigation systems."
    },
    "correct_answer": "B",
    "solution": "From Statement 1 (\"Some Drip are Automated\") and Statement 2 (\"All Automated require Sensors\"), it follows that \"Some Drip require Sensors\". Combining this with Statement 3 (\"No Sensor device is Maintenance-free\"), the subset of drip irrigation systems that use sensors cannot be maintenance-free. Therefore, \"Some drip irrigation systems are not completely maintenance-free.\"",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_GA_VA_012",
    "section": "Section 8: General Aptitude",
    "topic": "Verbal Aptitude",
    "subtopic": "Critical Reasoning",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "R.S. Aggarwal (A Modern Approach to Verbal & Non-Verbal Reasoning) / GATE Official General Aptitude Archives",
    "question": "If it is established as a true fact that \"No certified organic pesticide is chemically synthetic\", which of the following statements must be FALSE?",
    "options": {
      "A": "Some chemically synthetic substances are not certified organic pesticides.",
      "B": "All chemically synthetic substances are non-organic pesticides.",
      "C": "Some certified organic pesticides are chemically synthetic.",
      "D": "No chemically synthetic substance is a certified organic pesticide."
    },
    "correct_answer": "C",
    "solution": "In formal logic (Square of Opposition), the universal negative proposition \"No S is P\" (E-type) and the particular affirmative proposition \"Some S is P\" (I-type) are strict contradictories. If \"No S is P\" is true, then \"Some S is P\" must be false.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_GA_VA_013",
    "section": "Section 8: General Aptitude",
    "topic": "Verbal Aptitude",
    "subtopic": "Critical Reasoning",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "R.S. Aggarwal (A Modern Approach to Verbal & Non-Verbal Reasoning) / GATE Official General Aptitude Archives",
    "question": "\"Whenever the ambient temperature drops below $0^\\circ\\text{C}$ and relative humidity exceeds $90\\%$, frost forms on citrus orchards. Yesterday morning, frost formed on the citrus orchard.\"\nWhich of the following conclusions CANNOT be drawn with absolute logical certainty?",
    "options": {
      "A": "The ambient temperature yesterday morning was strictly below $0^\\circ\\text{C}$.",
      "B": "The relative humidity yesterday morning strictly exceeded $90\\%$.",
      "C": "If frost did not form, then either temperature was $\\ge 0^\\circ\\text{C}$ or relative humidity was $\\le 90\\%$.",
      "D": "Frost on citrus orchards can only form when relative humidity exceeds $90\\%$."
    },
    "correct_answer": [
      "A",
      "B",
      "D"
    ],
    "solution": "The conditional rule is $(P \\land Q) \\implies R$. Observing $R$ (frost formed) does not allow affirming the antecedent ($P \\land Q$) because other micro-climatic mechanisms or radiative cooling conditions might also cause frost (fallacy of affirming the consequent). The contrapositive $\\neg R \\implies \\neg(P \\land Q) = (\\neg P \\lor \\neg Q)$ is logically sound (statement C). Hence, A, B, and D cannot be drawn with certainty.",
    "difficulty": "Hard"
  },
  {
    "id": "QB_GA_VA_014",
    "section": "Section 8: General Aptitude",
    "topic": "Verbal Aptitude",
    "subtopic": "Basic English Grammar & Vocabulary",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Wren & Martin (High School English Grammar & Composition) / GATE Official General Aptitude Archives",
    "question": "Select the correct passive voice transformation of the sentence:\n\"The agricultural engineer inspected the grain storage silos yesterday.\"",
    "options": {
      "A": "The grain storage silos were inspected by the agricultural engineer yesterday.",
      "B": "The grain storage silos have been inspected by the agricultural engineer yesterday.",
      "C": "The grain storage silos had been inspected by the agricultural engineer yesterday.",
      "D": "The grain storage silos are inspected by the agricultural engineer yesterday."
    },
    "correct_answer": "A",
    "solution": "The active sentence uses simple past tense (\"inspected\"). In the passive voice, simple past takes \"was/were + past participle\". Since \"silos\" is plural, \"were inspected\" is correct.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_GA_VA_015",
    "section": "Section 8: General Aptitude",
    "topic": "Verbal Aptitude",
    "subtopic": "Basic English Grammar & Vocabulary",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Norman Lewis (Word Power Made Easy) / GATE Official General Aptitude Archives",
    "question": "Choose the word that best completes the analogy:\n**ENTOMOLOGY : INSECTS :: PEDOLOGY : ________**",
    "options": {
      "A": "Rocks",
      "B": "Soils",
      "C": "Fossils",
      "D": "Plant diseases"
    },
    "correct_answer": "B",
    "solution": "Entomology is the scientific branch of zoology that studies insects. Similarly, pedology is the branch of soil science that studies soils in their natural environment.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_GA_VA_016",
    "section": "Section 8: General Aptitude",
    "topic": "Verbal Aptitude",
    "subtopic": "Reading Comprehension",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "source": "GATE Official General Aptitude Archives",
    "question": "Read the passage and answer the question:\n\"Photosynthetic efficiency in $C_3$ crop plants such as wheat and rice is fundamentally constrained by the oxygenase activity of the enzyme Rubisco. Under elevated ambient temperatures, Rubisco increasingly binds molecular oxygen instead of carbon dioxide, initiating photorespiration which dissipates up to $30\\%$ of captured light energy without generating ATP. In contrast, $C_4$ plants like maize and sugarcane utilize an anatomical bundle-sheath carbon-concentrating mechanism that suppresses photorespiration almost entirely.\"\nAccording to the passage, the primary physiological reason $C_4$ plants exhibit superior photosynthetic efficiency under elevated temperatures is that:",
    "options": {
      "A": "They lack the enzyme Rubisco in all internal photosynthetic cells.",
      "B": "Their anatomical bundle-sheath carbon-concentrating mechanism suppresses photorespiration.",
      "C": "They do not require atmospheric carbon dioxide for carbon assimilation.",
      "D": "They produce high amounts of molecular oxygen during the light reactions."
    },
    "correct_answer": "B",
    "solution": "The passage clearly states that $C_4$ plants utilize an anatomical bundle-sheath carbon-concentrating mechanism that suppresses photorespiration almost entirely, preventing the wasteful dissipative reaction that hinders $C_3$ plants under high temperatures.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_GA_VA_017",
    "section": "Section 8: General Aptitude",
    "topic": "Verbal Aptitude",
    "subtopic": "Reading Comprehension",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "source": "GATE Official General Aptitude Archives",
    "question": "Read the passage:\n\"In micro-irrigation systems, emitter clogging remains the single greatest impediment to sustained hydraulic performance. Clogging is predominantly bio-chemical: iron-precipitating and sulfur-oxidizing bacteria secrete sticky mucilaginous slime sheaths that aggregate suspended colloidal clay particles into dense biofilms. Standard hydraulic flushing alone is insufficient to dislodge these adherent matrices; periodic chemical injection with chlorine is indispensable for oxidative degradation of the organic binder.\"\nWhich conclusion is most directly supported by the text?",
    "options": {
      "A": "Routine physical flushing with pressurized water completely prevents emitter clogging indefinitely.",
      "B": "Biological slime matrices bound by bacterial secretions necessitate periodic oxidative chemical remediation.",
      "C": "Drip irrigation emitters never clog if source water is passed through basic gravel filters.",
      "D": "Iron bacteria in irrigation pipes directly improve crop root nutrient uptake."
    },
    "correct_answer": "B",
    "solution": "The text states that standard hydraulic flushing is insufficient to dislodge adherent bacterial matrices and that periodic chemical injection with chlorine is indispensable for oxidative degradation of the organic binder. Hence, option B is directly supported.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_GA_VA_018",
    "section": "Section 8: General Aptitude",
    "topic": "Verbal Aptitude",
    "subtopic": "Critical Reasoning",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "source": "R.S. Aggarwal (A Modern Approach to Verbal & Non-Verbal Reasoning) / GATE Official General Aptitude Archives",
    "question": "\"Survey data reveals that agricultural districts with higher density of farm machinery repair workshops report significantly higher average crop yields per hectare. An agricultural policy analyst recommends constructing government-funded machinery repair centers across all low-yield districts to directly boost regional agricultural yields.\"\nWhich of the following identifies the most fundamental flaw in the analyst's reasoning?",
    "options": {
      "A": "It assumes that the presence of repair workshops causes higher crop yields rather than both being consequences of intensive capital investment and prosperous farming in those districts.",
      "B": "It fails to estimate the exact steel construction cost of establishing each regional workshop.",
      "C": "It overlooks the fact that some farmers prefer repairing their own implements at home.",
      "D": "It assumes that diesel fuel is readily accessible in all developing districts."
    },
    "correct_answer": "A",
    "solution": "The analyst confuses correlation with causation (cum hoc ergo propter hoc). Highly productive agricultural regions naturally attract and support more commercial machinery repair services due to higher tractor density and economic wealth. Simply building repair centers does not cause higher soil fertility or crop yields.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_GA_VA_019",
    "section": "Section 8: General Aptitude",
    "topic": "Verbal Aptitude",
    "subtopic": "Critical Reasoning",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "R.S. Aggarwal (A Modern Approach to Verbal & Non-Verbal Reasoning) / GATE Official General Aptitude Archives",
    "question": "Premises:\n1. All certified seed drills require calibration prior to field sowing.\n2. Machine X does not require calibration prior to field sowing.\nWhat can be logically concluded regarding Machine X?",
    "options": {
      "A": "Machine X is a defective certified seed drill.",
      "B": "Machine X is not a certified seed drill.",
      "C": "Machine X is an automatic precision planter.",
      "D": "Machine X operates without sowing seeds."
    },
    "correct_answer": "B",
    "solution": "This is a direct application of Modus Tollens (denying the consequent): If $P$ then $Q$. Not $Q$. Therefore, not $P$. Since Machine X does not require calibration, Machine X cannot be a certified seed drill.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_GA_QA_001",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Data Interpretation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R.S. Aggarwal (Quantitative Aptitude) / GATE Official General Aptitude Archives",
    "question": "The table below lists wheat production (in thousand metric tonnes, TMT) across five agricultural zones in 2024:\n• Zone A: $160\\text{ TMT}$\n• Zone B: $110\\text{ TMT}$\n• Zone C: $195\\text{ TMT}$\n• Zone D: $75\\text{ TMT}$\n• Zone E: $140\\text{ TMT}$\nThe percentage contribution of Zone C to the total wheat production of all five zones combined in 2024 was ________ % (round off to 1 decimal place).",
    "correct_answer": "28.7",
    "numerical_range": {
      "min": 28.5,
      "max": 28.9
    },
    "solution": "1. Compute total wheat production across all five zones in 2024:\n$$\\text{Total} = 160 + 110 + 195 + 75 + 140 = 680\\text{ TMT}$$\n2. Production of Zone C $= 195\\text{ TMT}$.\n3. Percentage contribution:\n$$\\text{Percentage} = \\frac{195}{680} \\times 100\\% = \\frac{19500}{680} \\approx 28.676\\% \\approx 28.7\\%$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_GA_QA_002",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Data Interpretation",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "source": "R.S. Aggarwal (Quantitative Aptitude) / GATE Official General Aptitude Archives",
    "question": "A pie chart represents the annual operating budget of a dairy plant with total allocation of $\\text{Rs. } 120\\text{ lakh}$. The sector central angles are: Raw Milk Procurement = $180^\\circ$, Energy & Utilities = $72^\\circ$, Packaging = $54^\\circ$, Labor = $36^\\circ$, and Maintenance = $18^\\circ$. The expenditure on Raw Milk Procurement exceeds the combined expenditure on Packaging and Labor by:",
    "options": {
      "A": "Rs. 25 lakh",
      "B": "Rs. 30 lakh",
      "C": "Rs. 35 lakh",
      "D": "Rs. 40 lakh"
    },
    "correct_answer": "B",
    "solution": "1. Angle for Raw Milk Procurement $= 180^\\circ$.\n2. Combined angle for Packaging and Labor $= 54^\\circ + 36^\\circ = 90^\\circ$.\n3. Difference in central angle $= 180^\\circ - 90^\\circ = 90^\\circ$.\n4. Monetary difference:\n$$\\text{Difference} = \\frac{90^\\circ}{360^\\circ} \\times 120\\text{ lakh} = \\frac{1}{4} \\times 120 = \\text{Rs. } 30\\text{ lakh}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_GA_QA_003",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Data Interpretation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R.S. Aggarwal (Quantitative Aptitude) / GATE Official General Aptitude Archives",
    "question": "The recorded monthly diesel consumption (in litres) of a farm tractor across six consecutive months was: Jan: 320, Feb: 280, Mar: 450, Apr: 500, May: 410, Jun: 340. The average diesel consumption per month in litres over this six-month period was ________ (round off to 1 decimal place).",
    "correct_answer": "383.3",
    "numerical_range": {
      "min": 382.5,
      "max": 384.5
    },
    "solution": "1. Sum of diesel consumption across 6 months:\n$$\\Sigma = 320 + 280 + 450 + 500 + 410 + 340 = 2300\\text{ litres}$$\n2. Average monthly consumption:\n$$\\text{Average} = \\frac{2300}{6} = 383.333\\dots \\approx 383.3\\text{ litres}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_GA_QA_004",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Numerical Computation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R.S. Aggarwal (Quantitative Aptitude) / GATE Official General Aptitude Archives",
    "question": "Two tractors $T_1$ and $T_2$ start at the same moment towards each other from two farm stations $P$ and $Q$ separated by $180\\text{ km}$. Tractor $T_1$ travels at $24\\text{ km/h}$ and $T_2$ travels at $36\\text{ km/h}$. The distance in kilometres from station $P$ where the two tractors meet is ________ (answer in integer).",
    "correct_answer": "72",
    "numerical_range": {
      "min": 72,
      "max": 72
    },
    "solution": "1. Relative speed of approaching tractors:\n$$v_{\\text{rel}} = v_1 + v_2 = 24 + 36 = 60\\text{ km/h}$$\n2. Time elapsed until meeting:\n$$t = \\frac{D}{v_{\\text{rel}}} = \\frac{180}{60} = 3\\text{ hours}$$\n3. Distance traversed by $T_1$ from station $P$:\n$$D_P = v_1 \\times t = 24 \\times 3 = 72\\text{ km}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_GA_QA_005",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Numerical Computation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R.S. Aggarwal (Quantitative Aptitude) / GATE Official General Aptitude Archives",
    "question": "A contractor undertakes to excavate a drainage channel of length $12\\text{ km}$ in $80\\text{ days}$ by employing 60 laborers. After 50 days, only $6\\text{ km}$ of the channel is completed. The number of additional laborers required to complete the remaining excavation on schedule is ________ (answer in integer).",
    "correct_answer": "40",
    "numerical_range": {
      "min": 40,
      "max": 40
    },
    "solution": "1. Labor expended on first $6\\text{ km}$:\n$$W_1 = 60\\text{ workers} \\times 50\\text{ days} = 3000\\text{ worker-days}$$\nRate $= \\frac{3000}{6} = 500\\text{ worker-days per km}$.\n2. Remaining work $= 12 - 6 = 6\\text{ km}$, requiring $6 \\times 500 = 3000\\text{ worker-days}$.\n3. Remaining time $= 80 - 50 = 30\\text{ days}$.\n4. Total workers required:\n$$N = \\frac{3000\\text{ worker-days}}{30\\text{ days}} = 100\\text{ workers}$$\n5. Additional laborers required $= 100 - 60 = 40$.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_GA_QA_006",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Numerical Computation",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "R.S. Aggarwal (Quantitative Aptitude) / GATE Official General Aptitude Archives",
    "question": "What is the remainder when $3^{100}$ is divided by 7?",
    "options": {
      "A": "1",
      "B": "2",
      "C": "4",
      "D": "6"
    },
    "correct_answer": "C",
    "solution": "By Fermat's Little Theorem, since 7 is prime and $\\gcd(3, 7) = 1$:\n$$3^{7-1} = 3^6 \\equiv 1 \\pmod 7$$\nExpress the exponent 100 in terms of multiples of 6:\n$$100 = 6 \\times 16 + 4$$\nTherefore:\n$$3^{100} = (3^6)^{16} \\times 3^4 \\equiv 1^{16} \\times 81 \\pmod 7$$\n$$81 = 7 \\times 11 + 4 \\equiv 4 \\pmod 7$$\nThe remainder is 4.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_GA_QA_007",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Numerical Computation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R.S. Aggarwal (Quantitative Aptitude) / GATE Official General Aptitude Archives",
    "question": "In how many distinct ways can 4 agricultural engineers and 3 agronomists sit in a single row such that no two agronomists sit adjacent to each other? Enter the total number of arrangements ________ (answer in integer).",
    "correct_answer": "1440",
    "numerical_range": {
      "min": 1440,
      "max": 1440
    },
    "solution": "Use the gap method:\n1. Arrange the 4 agricultural engineers in a row:\n$$N_{\\text{eng}} = 4! = 24\\text{ ways}$$\n2. This creates 5 available distinct slots (including ends):\n$$\\_ E_1 \\_ E_2 \\_ E_3 \\_ E_4 \\_$$\n3. Choose 3 slots out of 5 for the 3 agronomists and arrange them:\n$$P(5, 3) = \\frac{5!}{(5-3)!} = 5 \\times 4 \\times 3 = 60\\text{ ways}$$\n4. Total permutations:\n$$N = 24 \\times 60 = 1440\\text{ ways}$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_GA_QA_008",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Numerical Computation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R.S. Aggarwal (Quantitative Aptitude) / GATE Official General Aptitude Archives",
    "question": "A seed packet contains 4 white, 5 black, and 6 red seeds. If 3 seeds are drawn at random simultaneously without replacement, the probability that all three drawn seeds are of pairwise different colours is expressed in simplest fractional form as $\\frac{p}{q}$. The value of $(p + q)$ is ________ (answer in integer).",
    "correct_answer": "115",
    "numerical_range": {
      "min": 115,
      "max": 115
    },
    "solution": "1. Total seeds in packet $= 4 + 5 + 6 = 15$.\n2. Total possible ways to choose 3 seeds:\n$$n(S) = \\binom{15}{3} = \\frac{15 \\times 14 \\times 13}{3 \\times 2 \\times 1} = 455$$\n3. Ways to draw exactly 1 white, 1 black, and 1 red seed:\n$$n(E) = \\binom{4}{1} \\times \\binom{5}{1} \\times \\binom{6}{1} = 4 \\times 5 \\times 6 = 120$$\n4. Probability:\n$$P = \\frac{120}{455} = \\frac{24}{91}$$\nSince $\\gcd(24, 91) = 1$, $p = 24$ and $q = 91$.\n5. Value of $p + q = 24 + 91 = 115$.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_GA_QA_009",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Numerical Computation",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "R.S. Aggarwal (Quantitative Aptitude) / GATE Official General Aptitude Archives",
    "question": "If $\\log_{10}(x) + \\log_{10}(x - 3) = 1$, the value of $x$ is:",
    "options": {
      "A": "5",
      "B": "2",
      "C": "-2",
      "D": "10"
    },
    "correct_answer": "A",
    "solution": "Using the logarithmic property $\\log_{10}(a) + \\log_{10}(b) = \\log_{10}(ab)$:\n$$\\log_{10}[x(x - 3)] = 1 \\implies x(x - 3) = 10^1 = 10$$\n$$x^2 - 3x - 10 = 0 \\implies (x - 5)(x + 2) = 0$$\nRoots are $x = 5$ or $x = -2$.\nSince the argument of a real logarithm must be strictly positive ($x > 3$), $x = -2$ is extraneous. Hence, $x = 5$.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_GA_QA_010",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Ratios & Percentages",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R.S. Aggarwal (Quantitative Aptitude) / GATE Official General Aptitude Archives",
    "question": "Container $A$ contains a milk and water solution in the ratio $4 : 1$, while Container $B$ contains milk and water in the ratio $2 : 3$. To obtain a mixture containing $60\\%$ milk, the volumes from Container $A$ and Container $B$ must be mixed in the ratio $x : 1$. The value of $x$ is ________ (round off to 1 decimal place).",
    "correct_answer": "1.0",
    "numerical_range": {
      "min": 1,
      "max": 1
    },
    "solution": "1. Concentration of milk in Container A $= \\frac{4}{4+1} = \\frac{4}{5} = 0.80$ ($80\\%$).\n2. Concentration of milk in Container B $= \\frac{2}{2+3} = \\frac{2}{5} = 0.40$ ($40\\%$).\n3. Desired concentration $= 60\\% = 0.60$.\n4. Applying alligation rule:\n$$\\frac{V_A}{V_B} = \\frac{0.60 - 0.40}{0.80 - 0.60} = \\frac{0.20}{0.20} = 1$$\nTherefore, the volume ratio is $1 : 1$, giving $x = 1.0$.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_GA_QA_011",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Ratios & Percentages",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R.S. Aggarwal (Quantitative Aptitude) / GATE Official General Aptitude Archives",
    "question": "A grain merchant marks up the cost price of basmati rice by $40\\%$. He allows a trade discount of $15\\%$ on the marked price and a further cash discount of $5\\%$ on the discounted price. The net profit earned by the merchant is ________ % (round off to 2 decimal places).",
    "correct_answer": "13.05",
    "numerical_range": {
      "min": 13,
      "max": 13.1
    },
    "solution": "1. Let Cost Price ($CP$) be $100$.\n2. Marked Price ($MP$) after $40\\%$ markup:\n$$MP = 100 \\times 1.40 = 140$$\n3. Price after first discount of $15\\%$:\n$$P_1 = 140 \\times (1 - 0.15) = 140 \\times 0.85 = 119$$\n4. Selling Price ($SP$) after second discount of $5\\%$:\n$$SP = 119 \\times (1 - 0.05) = 119 \\times 0.95 = 113.05$$\n5. Net Profit Percentage:\n$$\\text{Profit}\\% = \\frac{113.05 - 100}{100} \\times 100\\% = 13.05\\%$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_GA_QA_012",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Ratios & Percentages",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "R.S. Aggarwal (Quantitative Aptitude) / GATE Official General Aptitude Archives",
    "question": "If quantity $A$ is $25\\%$ greater than quantity $B$, by what percentage is quantity $B$ less than quantity $A$?",
    "options": {
      "A": "20%",
      "B": "25%",
      "C": "16.67%",
      "D": "33.33%"
    },
    "correct_answer": "A",
    "solution": "Let $B = 100$.\nThen $A = 100 \\times 1.25 = 125$.\nThe difference between $A$ and $B$ is $125 - 100 = 25$.\nThe percentage by which $B$ is less than $A$ is:\n$$\\text{Percentage} = \\frac{25}{125} \\times 100\\% = \\frac{1}{5} \\times 100\\% = 20\\%$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_GA_QA_013",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Ratios & Percentages",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "R.S. Aggarwal (Quantitative Aptitude) / GATE Official General Aptitude Archives",
    "question": "An agricultural enterprise allocates its annual operating capital of $\\text{Rs. } 60\\text{ lakh}$ across three divisions: Soil Conservation ($S$), Crop Production ($C$), and Farm Machinery ($M$) in the ratio $S : C : M = 3 : 5 : 4$. Which of the following statements is/are correct?",
    "options": {
      "A": "The financial allocation for Crop Production is Rs. 25 lakh.",
      "B": "The allocation for Farm Machinery exceeds that of Soil Conservation by Rs. 5 lakh.",
      "C": "The combined allocation for Soil Conservation and Farm Machinery equals the allocation for Crop Production.",
      "D": "Crop Production receives more than 40% of the total operating capital."
    },
    "correct_answer": [
      "A",
      "B",
      "D"
    ],
    "solution": "1. Sum of ratio parts $= 3 + 5 + 4 = 12$ parts.\n2. Value per part $= \\frac{60\\text{ lakh}}{12} = \\text{Rs. } 5\\text{ lakh}$.\n• $S = 3 \\times 5 = \\text{Rs. } 15\\text{ lakh}$\n• $C = 5 \\times 5 = \\text{Rs. } 25\\text{ lakh}$\n• $M = 4 \\times 5 = \\text{Rs. } 20\\text{ lakh}$\n3. Evaluation of statements:\n• A: $C = 25\\text{ lakh}$ (Correct).\n• B: $M - S = 20 - 15 = 5\\text{ lakh}$ (Correct).\n• C: $S + M = 15 + 20 = 35\\text{ lakh} \\ne 25\\text{ lakh}$ (Incorrect).\n• D: Share of $C = \\frac{25}{60} \\times 100\\% \\approx 41.67\\% > 40\\%$ (Correct).",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_GA_QA_014",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Data Interpretation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R.S. Aggarwal (Quantitative Aptitude) / GATE Official General Aptitude Archives",
    "question": "The annual grain procurement of a regional warehouse over three consecutive years grew from $40\\text{ lakh tonnes}$ in 2021 to $75\\text{ lakh tonnes}$ in 2024. The compound annual growth rate (CAGR) in percentage over this 3-year period is ________ % (round off to 2 decimal places).",
    "correct_answer": "23.31",
    "numerical_range": {
      "min": 23.2,
      "max": 23.4
    },
    "solution": "1. Initial value $V_0 = 40$, final value $V_3 = 75$, time period $n = 3\\text{ years}$.\n2. CAGR formula:\n$$\\text{CAGR} = \\left(\\frac{V_n}{V_0}\\right)^{1/n} - 1 = \\left(\\frac{75}{40}\\right)^{1/3} - 1 = (1.875)^{1/3} - 1$$\n3. Calculation:\n$$(1.875)^{1/3} \\approx 1.233106$$\n$$\\text{CAGR} = 1.233106 - 1 = 0.233106 = 23.31\\%$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_GA_QA_015",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Data Interpretation",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "source": "R.S. Aggarwal (Quantitative Aptitude) / GATE Official General Aptitude Archives",
    "question": "A farm implement manufacturer records the following domestic and export tractor sales (in units) over three quarters:\n• Q1: Domestic = 1200, Export = 300\n• Q2: Domestic = 1500, Export = 500\n• Q3: Domestic = 1800, Export = 600\nThe ratio of total export sales to total domestic sales across the three quarters combined is:",
    "options": {
      "A": "7 : 22",
      "B": "7 : 25",
      "C": "14 : 45",
      "D": "2 : 5"
    },
    "correct_answer": "C",
    "solution": "1. Total export sales $= 300 + 500 + 600 = 1400\\text{ units}$.\n2. Total domestic sales $= 1200 + 1500 + 1800 = 4500\\text{ units}$.\n3. Ratio of export to domestic sales:\n$$\\text{Ratio} = \\frac{1400}{4500} = \\frac{14}{45} = 14 : 45$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_GA_QA_016",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Numerical Computation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R.S. Aggarwal (Quantitative Aptitude) / GATE Official General Aptitude Archives",
    "question": "A principal amount of $\\text{Rs. } 10,000$ is invested in an agricultural bond bearing an annual nominal interest rate of $12\\%$ compounded semi-annually. The total compound amount in Rupees accrued at the end of 1 year is ________ (answer in integer).",
    "correct_answer": "11236",
    "numerical_range": {
      "min": 11236,
      "max": 11236
    },
    "solution": "1. Principal $P = 10,000$.\n2. Semi-annual interest rate $r = \\frac{12\\%}{2} = 6\\% = 0.06$.\n3. Compounding periods in 1 year $n = 2$.\n4. Compound Amount:\n$$A = P (1 + r)^n = 10000 \\times (1 + 0.06)^2 = 10000 \\times (1.06)^2 = 10000 \\times 1.1236 = \\text{Rs. } 11,236$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_GA_QA_017",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Numerical Computation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R.S. Aggarwal (Quantitative Aptitude) / GATE Official General Aptitude Archives",
    "question": "An agricultural surveyor drives from station $A$ to research station $B$ at a uniform speed of $40\\text{ km/h}$ and returns along the identical road at $60\\text{ km/h}$. The average speed of the entire two-way journey in $\\text{km/h}$ is ________ (answer in integer).",
    "correct_answer": "48",
    "numerical_range": {
      "min": 48,
      "max": 48
    },
    "solution": "When equal distances are traversed at speeds $v_1$ and $v_2$, the overall average speed is given by the harmonic mean:\n$$v_{\\text{avg}} = \\frac{2 v_1 v_2}{v_1 + v_2} = \\frac{2 \\times 40 \\times 60}{40 + 60} = \\frac{4800}{100} = 48\\text{ km/h}$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_GA_QA_018",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Numerical Computation",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "R.S. Aggarwal (Quantitative Aptitude) / GATE Official General Aptitude Archives",
    "question": "Consider the quadratic equation $x^2 - 12x + 35 = 0$. Which of the following statements regarding its roots is/are correct?",
    "options": {
      "A": "Both roots are positive integers.",
      "B": "The sum of the roots is 12.",
      "C": "The product of the roots is 35.",
      "D": "The absolute difference between the roots is 3."
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "1. Factorize the quadratic polynomial:\n$$x^2 - 12x + 35 = (x - 7)(x - 5) = 0$$\nRoots are $x_1 = 7$ and $x_2 = 5$.\n2. Verification of statements:\n• A: 5 and 7 are both positive integers (Correct).\n• B: Sum of roots $= 7 + 5 = 12$ (Correct).\n• C: Product of roots $= 7 \\times 5 = 35$ (Correct).\n• D: Absolute difference $= |7 - 5| = 2 \\ne 3$ (Incorrect).",
    "difficulty": "Easy"
  },
  {
    "id": "QB_GA_QA_019",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Ratios & Percentages",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R.S. Aggarwal (Quantitative Aptitude) / GATE Official General Aptitude Archives",
    "question": "An anti-friction bronze alloy used in tractor gearbox bushings consists of copper and tin in the ratio $9 : 1$ by weight. If $2\\text{ kg}$ of pure tin is melted and homogeneously mixed with $18\\text{ kg}$ of this alloy, the percentage of tin by weight in the resulting new alloy is ________ % (answer in integer).",
    "correct_answer": "19",
    "numerical_range": {
      "min": 19,
      "max": 19
    },
    "solution": "1. In $18\\text{ kg}$ of original alloy:\n• Copper $= 18 \\times \\frac{9}{10} = 16.2\\text{ kg}$\n• Tin $= 18 \\times \\frac{1}{10} = 1.8\\text{ kg}$\n2. After adding $2\\text{ kg}$ of pure tin:\n• Total tin $= 1.8 + 2.0 = 3.8\\text{ kg}$\n• Total alloy weight $= 18 + 2 = 20\\text{ kg}$\n3. New tin percentage:\n$$\\text{Percentage} = \\frac{3.8}{20} \\times 100\\% = 19\\%$$",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_GA_ASA_001",
    "section": "Section 8: General Aptitude",
    "topic": "Analytical & Spatial Aptitude",
    "subtopic": "Logic Deduction & Pattern Recognition",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R.S. Aggarwal (A Modern Approach to Verbal & Non-Verbal Reasoning) / GATE Official General Aptitude Archives",
    "question": "Find the next missing number in the numerical series: $3, 8, 18, 38, 78, \\underline{\\hspace{1.5cm}}$ (answer in integer).",
    "correct_answer": "158",
    "numerical_range": {
      "min": 158,
      "max": 158
    },
    "solution": "1. Examine the difference pattern between consecutive terms:\n• $8 - 3 = 5$\n• $18 - 8 = 10$\n• $38 - 18 = 20$\n• $78 - 38 = 40$\n2. The successive differences double each time: $5, 10, 20, 40, 80$.\n3. Next term $= 78 + 80 = 158$.\n(Alternatively, each term follows the recurrence relation $T_{n} = 2 \\times T_{n-1} + 2$, giving $2 \\times 78 + 2 = 158$).",
    "difficulty": "Easy"
  },
  {
    "id": "QB_GA_ASA_002",
    "section": "Section 8: General Aptitude",
    "topic": "Analytical & Spatial Aptitude",
    "subtopic": "Logic Deduction & Pattern Recognition",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "source": "R.S. Aggarwal (A Modern Approach to Verbal & Non-Verbal Reasoning) / GATE Official General Aptitude Archives",
    "question": "In an artificial technical code language:\n• 'soil test is good' is coded as 'pe da ro ka'\n• 'good crop yield high' is coded as 'ka te no si'\n• 'is crop yield high' is coded as 'ro te no si'\n• 'soil fertility is high' is coded as 'pe zo ro si'\nWhat is the code for the word 'crop'?",
    "options": {
      "A": "te",
      "B": "no",
      "C": "Cannot be uniquely determined between 'te' and 'no'",
      "D": "ka"
    },
    "correct_answer": "C",
    "solution": "1. Comparing sentence 1 ('pe da ro ka') and sentence 2 ('ka te no si'), the common word is 'good', hence 'ka' = 'good'.\n2. In sentence 4 ('pe zo ro si') and sentence 1, common words are 'soil' and 'is', with codes 'pe' and 'ro'. Comparing with sentence 3 ('ro te no si'), common word is 'is', so 'ro' = 'is', which leaves 'pe' = 'soil'.\n3. From sentence 4, since 'ro' = 'is', 'si' = 'high'.\n4. Now examining sentence 2 and 3: both contain words 'crop' and 'yield' and codes 'te' and 'no'. No additional premise isolates 'crop' from 'yield'. Therefore, the exact code for 'crop' cannot be uniquely determined between 'te' and 'no'.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_GA_ASA_003",
    "section": "Section 8: General Aptitude",
    "topic": "Analytical & Spatial Aptitude",
    "subtopic": "Logic Deduction & Pattern Recognition",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "R.S. Aggarwal (A Modern Approach to Verbal & Non-Verbal Reasoning) / GATE Official General Aptitude Archives",
    "question": "Pointing to a portrait of a researcher, Ramesh stated: \"His father is the only son of my father.\" How is Ramesh related to the researcher in the portrait?",
    "options": {
      "A": "Brother",
      "B": "Father",
      "C": "Uncle",
      "D": "Son"
    },
    "correct_answer": "B",
    "solution": "1. \"My father\" refers to Ramesh's father.\n2. Since Ramesh is male, \"the only son of my father\" refers to Ramesh himself.\n3. The statement therefore simplifies to: \"His father is Ramesh.\"\n4. Thus, Ramesh is the father of the researcher in the portrait.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_GA_ASA_004",
    "section": "Section 8: General Aptitude",
    "topic": "Analytical & Spatial Aptitude",
    "subtopic": "Logic Deduction & Pattern Recognition",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "source": "R.S. Aggarwal (A Modern Approach to Verbal & Non-Verbal Reasoning) / GATE Official General Aptitude Archives",
    "question": "Six engineers $P, Q, R, S, T,$ and $U$ sit in a single horizontal row facing North:\n1. $P$ and $U$ sit at the extreme ends of the row.\n2. $Q$ sits second to the right of $P$.\n3. $R$ sits to the immediate left of $U$.\n4. $T$ sits to the immediate right of $Q$.\nWhich engineer sits at the second position from the left end?",
    "options": {
      "A": "S",
      "B": "T",
      "C": "R",
      "D": "Q"
    },
    "correct_answer": "A",
    "solution": "Let the 6 positions from left to right be 1, 2, 3, 4, 5, 6.\n• From clue 2, $Q$ is second to the right of $P$. Since $P$ and $U$ are at extreme ends, $P$ must be at position 1 (left end), placing $Q$ at position $1 + 2 = 3$.\n• Consequently, $U$ is at position 6 (right end).\n• Clue 3: $R$ sits to immediate left of $U$ (position 6), so $R$ is at position 5.\n• Clue 4: $T$ sits to immediate right of $Q$ (position 3), so $T$ is at position 4.\n• The remaining vacant slot is position 2, which must be occupied by $S$.\nThe full arrangement is: $P$ (1), $S$ (2), $Q$ (3), $T$ (4), $R$ (5), $U$ (6).\nTherefore, engineer $S$ sits at the second position from the left end.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_GA_ASA_005",
    "section": "Section 8: General Aptitude",
    "topic": "Analytical & Spatial Aptitude",
    "subtopic": "Logic Deduction & Pattern Recognition",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "R.S. Aggarwal (A Modern Approach to Verbal & Non-Verbal Reasoning) / GATE Official General Aptitude Archives",
    "question": "Given the following premises:\n1. All combine harvesters are diesel-powered machines.\n2. Some diesel-powered machines emit particulates.\n3. No particulate-emitting machine is zero-emission.\nWhich of the following statements MUST logically be true?",
    "options": {
      "A": "No combine harvester is zero-emission.",
      "B": "Some diesel-powered machines are not zero-emission.",
      "C": "At least some diesel-powered machines are combine harvesters.",
      "D": "All zero-emission machines are non-particulate-emitting."
    },
    "correct_answer": [
      "B",
      "C",
      "D"
    ],
    "solution": "1. From premise 1 (\"All combine harvesters are diesel-powered\"), conversion by limitation (subalternation) yields \"Some diesel-powered machines are combine harvesters\". Hence, statement C is true.\n2. From premise 2 (\"Some diesel machines emit particulates\") and premise 3 (\"No particulate-emitting machine is zero-emission\"), those diesel machines that emit particulates cannot be zero-emission. Thus, \"Some diesel-powered machines are not zero-emission\" (statement B is true).\n3. Statement 3 is \"No P is Z\". By contraposition/conversion, \"No Z is P\", meaning \"All zero-emission machines are non-particulate-emitting\" (statement D is true).\n4. Statement A cannot be deduced because we do not know whether the subset of combine harvesters overlaps with particulate emitters.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_GA_ASA_006",
    "section": "Section 8: General Aptitude",
    "topic": "Analytical & Spatial Aptitude",
    "subtopic": "Logic Deduction & Pattern Recognition",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "R.S. Aggarwal (A Modern Approach to Verbal & Non-Verbal Reasoning) / GATE Official General Aptitude Archives",
    "question": "At what time between 3 o'clock and 4 o'clock will the hour hand and minute hand of a clock coincide? Express the time in minutes past 3 as $\\frac{p}{q}$ in simplest fractional form. The value of $(p + q)$ is ________ (answer in integer).",
    "correct_answer": "191",
    "numerical_range": {
      "min": 191,
      "max": 191
    },
    "solution": "1. At 3:00, the minute hand is at 0 minutes while the hour hand is at the 15-minute mark (separation $= 15\\text{ minute spaces} = 90^\\circ$).\n2. The minute hand moves at $1\\text{ minute space/min}$, while the hour hand moves at $\\frac{1}{12}\\text{ minute space/min}$.\n3. Relative speed $= 1 - \\frac{1}{12} = \\frac{11}{12}\\text{ minute spaces/min}$.\n4. Time required to overtake $15\\text{ minute spaces}$:\n$$t = \\frac{15}{11/12} = \\frac{180}{11}\\text{ minutes past 3}$$\nSince 11 is prime and does not divide 180, $\\frac{180}{11}$ is in simplest form ($p = 180, q = 11$).\n5. Value of $p + q = 180 + 11 = 191$.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_GA_ASA_007",
    "section": "Section 8: General Aptitude",
    "topic": "Analytical & Spatial Aptitude",
    "subtopic": "Spatial Reasoning & 3D Representations",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "source": "R.S. Aggarwal (A Modern Approach to Verbal & Non-Verbal Reasoning) / GATE Official General Aptitude Archives",
    "question": "A solid wooden cube of edge length $4\\text{ cm}$ is painted green on all six exterior faces and then sliced into 64 smaller unit cubes of side $1\\text{ cm}$. How many of these smaller unit cubes have EXACTLY two faces painted green?",
    "options": {
      "A": "8",
      "B": "16",
      "C": "24",
      "D": "32"
    },
    "correct_answer": "C",
    "solution": "For an $n \\times n \\times n$ painted cube sliced into unit cubes ($n = 4$):\n• Cubes with 3 faces painted (corners) $= 8$\n• Cubes with 2 faces painted lie along the 12 edges, excluding the 2 corner vertices per edge:\n$$N_{\\text{2-face}} = 12 \\times (n - 2) = 12 \\times (4 - 2) = 12 \\times 2 = 24$$\n• Cubes with 1 face painted $= 6(n - 2)^2 = 6(4) = 24$\n• Cubes with 0 faces painted (interior) $= (n - 2)^3 = 2^3 = 8$\nTotal $= 8 + 24 + 24 + 8 = 64$. Therefore, exactly 24 unit cubes have 2 faces painted.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_GA_ASA_008",
    "section": "Section 8: General Aptitude",
    "topic": "Analytical & Spatial Aptitude",
    "subtopic": "Spatial Reasoning & 3D Representations",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R.S. Aggarwal (A Modern Approach to Verbal & Non-Verbal Reasoning) / GATE Official General Aptitude Archives",
    "question": "For the same $4\\text{ cm}$ solid cube painted green on all faces and cut into 64 unit cubes of $1\\text{ cm}$, the total number of smaller cubes having AT LEAST one face painted green is ________ (answer in integer).",
    "correct_answer": "56",
    "numerical_range": {
      "min": 56,
      "max": 56
    },
    "solution": "1. Total number of unit cubes $= 64$.\n2. The only cubes with zero painted faces are those located entirely within the inner core of dimension $(n - 2) \\times (n - 2) \\times (n - 2)$:\n$$N_{\\text{0-face}} = (4 - 2)^3 = 2^3 = 8$$\n3. Cubes with at least one face painted:\n$$N_{\\ge 1} = \\text{Total} - N_{\\text{0-face}} = 64 - 8 = 56$$",
    "difficulty": "Easy"
  },
  {
    "id": "QB_GA_ASA_009",
    "section": "Section 8: General Aptitude",
    "topic": "Analytical & Spatial Aptitude",
    "subtopic": "Spatial Reasoning & 3D Representations",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "GATE Official General Aptitude Archives",
    "question": "Which of the following geometric transformations on a 2D asymmetric polygon in Euclidean space preserves BOTH its handedness (chirality) and its boundary perimeter?",
    "options": {
      "A": "Planar translation along any direction vector",
      "B": "Planar rotation about an arbitrary center point",
      "C": "Planar reflection across an arbitrary straight line",
      "D": "Uniform isotropic scaling with scale factor k = 1.0"
    },
    "correct_answer": [
      "A",
      "B",
      "D"
    ],
    "solution": "1. Direct isometries (rigid motions) preserve distance (perimeter) and orientation/handedness (determinant of transformation matrix $= +1$). Planar translations (A), planar rotations (B), and identity scaling $k = 1.0$ (D) are direct isometries.\n2. Reflection (C) is an opposite (indirect) isometry (determinant $= -1$); it inverts the handedness (chirality) of asymmetric planar figures.\nTherefore, options A, B, and D satisfy both criteria.",
    "difficulty": "Moderate"
  },
  {
    "id": "QB_GA_ASA_010",
    "section": "Section 8: General Aptitude",
    "topic": "Analytical & Spatial Aptitude",
    "subtopic": "Spatial Reasoning & 3D Representations",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "R.S. Aggarwal (A Modern Approach to Verbal & Non-Verbal Reasoning) / GATE Official General Aptitude Archives",
    "question": "When viewed in a standard vertical plane mirror, which of the following capital English letters remains completely unchanged in visual appearance?",
    "options": {
      "A": "B",
      "B": "M",
      "C": "E",
      "D": "P"
    },
    "correct_answer": "B",
    "solution": "A vertical plane mirror produces lateral inversion (reversal along the horizontal axis). Only figures and letters possessing vertical bilateral symmetry remain invariant upon lateral inversion. Among the choices:\n• 'M' possesses a vertical line of symmetry, so its mirror image is identical to itself.\n• 'B', 'E', and 'P' lack vertical line symmetry and appear horizontally inverted.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_GA_ASA_011",
    "section": "Section 8: General Aptitude",
    "topic": "Analytical & Spatial Aptitude",
    "subtopic": "Spatial Reasoning & 3D Representations",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "source": "R.S. Aggarwal (A Modern Approach to Verbal & Non-Verbal Reasoning) / GATE Official General Aptitude Archives",
    "question": "A standard cubical die has opposite faces summing to 7 (i.e., $1 \\leftrightarrow 6$, $2 \\leftrightarrow 5$, $3 \\leftrightarrow 4$). The die is rolled twice: face 4 lands facing upwards on the first roll, and face 2 lands facing upwards on the second roll. The sum of the numbers on the bottom faces resting on the table for both rolls combined is:",
    "options": {
      "A": "6",
      "B": "7",
      "C": "8",
      "D": "9"
    },
    "correct_answer": "C",
    "solution": "1. In any standard die, $\\text{Top face} + \\text{Bottom face} = 7$.\n2. On Roll 1: Top $= 4 \\implies \\text{Bottom} = 7 - 4 = 3$.\n3. On Roll 2: Top $= 2 \\implies \\text{Bottom} = 7 - 2 = 5$.\n4. Combined sum of bottom faces $= 3 + 5 = 8$.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_GA_ASA_012",
    "section": "Section 8: General Aptitude",
    "topic": "Analytical & Spatial Aptitude",
    "subtopic": "Logic Deduction & Pattern Recognition",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R.S. Aggarwal (A Modern Approach to Verbal & Non-Verbal Reasoning) / GATE Official General Aptitude Archives",
    "question": "In a coding scheme, if 'TRACTOR' is coded as '14' and 'HARVESTER' is coded as '18', then 'COMBINE' is coded as ________ (answer in integer).",
    "correct_answer": "14",
    "numerical_range": {
      "min": 14,
      "max": 14
    },
    "solution": "1. Observe the relationship between the word length (number of letters) and the numerical code:\n• 'TRACTOR' has 7 letters: $7 \\times 2 = 14$.\n• 'HARVESTER' has 9 letters: $9 \\times 2 = 18$.\n2. 'COMBINE' has 7 letters: $7 \\times 2 = 14$.\nThe coded value is 14.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_GA_ASA_013",
    "section": "Section 8: General Aptitude",
    "topic": "Analytical & Spatial Aptitude",
    "subtopic": "Logic Deduction & Pattern Recognition",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "R.S. Aggarwal (A Modern Approach to Verbal & Non-Verbal Reasoning) / GATE Official General Aptitude Archives",
    "question": "Find the next missing letter in the alphabetical sequence:\nB, E, I, N, T, ________",
    "options": {
      "A": "Y",
      "B": "Z",
      "C": "A",
      "D": "X"
    },
    "correct_answer": "C",
    "solution": "Analyze the alphabetical position indices of the terms:\n• B is position 2\n• E is position $2 + 3 = 5$\n• I is position $5 + 4 = 9$\n• N is position $9 + 5 = 14$\n• T is position $14 + 6 = 20$\nThe step increments increase by 1 each time ($+3, +4, +5, +6, +7$).\nNext position $= 20 + 7 = 27$.\nWrapping cyclically through the 26-letter English alphabet: $27 - 26 = 1$, which corresponds to 'A'.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_GA_ASA_014",
    "section": "Section 8: General Aptitude",
    "topic": "Analytical & Spatial Aptitude",
    "subtopic": "Spatial Reasoning & 3D Representations",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R.S. Aggarwal (A Modern Approach to Verbal & Non-Verbal Reasoning) / GATE Official General Aptitude Archives",
    "question": "A right rectangular prism (storage container) has inner dimensions $5\\text{ m} \\times 4\\text{ m} \\times 3\\text{ m}$. The length of the longest straight pipe in metres that can fit completely inside the container is expressed as $\\sqrt{k}$. The value of integer $k$ is ________.",
    "correct_answer": "50",
    "numerical_range": {
      "min": 50,
      "max": 50
    },
    "solution": "1. The longest straight segment in a rectangular cuboid of length $L$, width $W$, and height $H$ is the 3D space diagonal:\n$$D = \\sqrt{L^2 + W^2 + H^2}$$\n2. Substituting the dimensions:\n$$D = \\sqrt{5^2 + 4^2 + 3^2} = \\sqrt{25 + 16 + 9} = \\sqrt{50}\\text{ m}$$\n3. Therefore, $k = 50$.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_GA_ASA_015",
    "section": "Section 8: General Aptitude",
    "topic": "Analytical & Spatial Aptitude",
    "subtopic": "Spatial Reasoning & 3D Representations",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "GATE Official General Aptitude Archives",
    "question": "Which of the following convex regular polyhedra (Platonic solids) has/have faces that are congruent equilateral triangles?",
    "options": {
      "A": "Regular Tetrahedron",
      "B": "Regular Octahedron",
      "C": "Regular Icosahedron",
      "D": "Regular Dodecahedron"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "Among the five Platonic solids in 3D Euclidean geometry:\n• Regular Tetrahedron: 4 equilateral triangular faces (Correct).\n• Regular Octahedron: 8 equilateral triangular faces (Correct).\n• Regular Icosahedron: 20 equilateral triangular faces (Correct).\n• Regular Dodecahedron: 12 regular pentagonal faces (Incorrect).\n• Regular Hexahedron (Cube): 6 square faces.\nTherefore, options A, B, and C are equilateral triangular.",
    "difficulty": "Easy"
  },
  {
    "id": "QB_GA_065",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Ratios & Percentages",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "R.S. Aggarwal - Quantitative Aptitude",
    "question": "If the price of diesel increases by $25\\%$, calculate the percentage by which a tractor operator must reduce diesel consumption so that total expenditure on diesel remains unchanged.",
    "solution": "Let initial price be $P$ and consumption be $C$. Total expenditure $E = P \\times C$.\nNew price $P' = 1.25 P$.\nFor expenditure to remain constant:\n$$P' \\times C' = P \\times C$$\n$$1.25 P \\times C' = P \\times C \\implies C' = \\frac{C}{1.25} = 0.80 C$$\nReduction in consumption:\n$$\\Delta C = \\frac{C - 0.80 C}{C} \\times 100 = 20\\%$$",
    "difficulty": "Easy",
    "correct_answer": 20,
    "answer": 20,
    "numerical_range": {
      "min": 19.8,
      "max": 20.2
    }
  },
  {
    "id": "QB_GA_066",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Numerical Computation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R.S. Aggarwal - Quantitative Aptitude",
    "question": "Two pipes $A$ and $B$ can fill a water irrigation tank in $12\\text{ hours}$ and $18\\text{ hours}$ respectively. A drain pipe $C$ can empty the full tank in $15\\text{ hours}$. If all three pipes are opened simultaneously, calculate the time in $\\text{hours}$ required to fill the empty tank completely.",
    "solution": "Net filling rate per hour:\n$$\\text{Rate} = \\frac{1}{12} + \\frac{1}{18} - \\frac{1}{15}$$\nTaking LCM of $12, 18, 15 = 180$:\n$$\\text{Rate} = \\frac{15 + 10 - 12}{180} = \\frac{13}{180}\\text{ tank/h}$$\nTime required to fill tank:\n$$T = \\frac{180}{13} \\approx 13.846\\text{ hours}$$",
    "difficulty": "Moderate",
    "correct_answer": 13.85,
    "answer": 13.85,
    "numerical_range": {
      "min": 13.5,
      "max": 14.1
    }
  },
  {
    "id": "QB_GA_067",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Numerical Computation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R.S. Aggarwal - Quantitative Aptitude",
    "question": "A train of length $240\\text{ m}$ traveling at a uniform speed of $72\\text{ km/h}$ completely crosses a railway bridge in $30\\text{ seconds}$. Calculate the length of the bridge in $\\text{meters}$.",
    "solution": "Speed of train:\n$$v = 72\\text{ km/h} = \\frac{72 \\times 5}{18} = 20\\text{ m/s}$$\nTotal distance covered in $30\\text{ s}$:\n$$D = v \\times t = 20 \\times 30 = 600\\text{ m}$$\nDistance is sum of train length and bridge length:\n$$L_{\\text{train}} + L_{\\text{bridge}} = 600$$\n$$240 + L_{\\text{bridge}} = 600 \\implies L_{\\text{bridge}} = 600 - 240 = 360\\text{ m}$$",
    "difficulty": "Easy",
    "correct_answer": 360,
    "answer": 360,
    "numerical_range": {
      "min": 355,
      "max": 365
    }
  },
  {
    "id": "QB_GA_068",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Ratios & Percentages",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R.S. Aggarwal - Quantitative Aptitude",
    "question": "A merchant blends two varieties of tea costing Rs. $180/\\text{kg}$ and Rs. $240/\\text{kg}$ in the ratio $3 : 2$ by weight. If he sells the blended tea at Rs. $245/\\text{kg}$, calculate his profit percentage.",
    "solution": "Cost price of $5\\text{ kg}$ of blend ($3\\text{ kg} + 2\\text{ kg}$):\n$$CP = (3 \\times 180) + (2 \\times 240) = 540 + 480 = 1020\\text{ Rs}$$\nAverage CP per kg:\n$$CP_{\\text{avg}} = \\frac{1020}{5} = 204\\text{ Rs/kg}$$\nSelling price $SP = 245\\text{ Rs/kg}$.\nProfit percentage:\n$$\\text{Profit}\\% = \\frac{SP - CP}{CP} \\times 100 = \\frac{245 - 204}{204} \\times 100 = \\frac{41}{204} \\times 100 \\approx 20.098\\%$$",
    "difficulty": "Moderate",
    "correct_answer": 20.1,
    "answer": 20.1,
    "numerical_range": {
      "min": 19.8,
      "max": 20.3
    }
  },
  {
    "id": "QB_GA_069",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Numerical Computation",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "R.S. Aggarwal - Quantitative Aptitude",
    "question": "Calculate the sum of all natural numbers between $1$ and $100$ (both inclusive) that are exactly divisible by $7$.",
    "solution": "The numbers are $7, 14, 21, \\dots, 98$.\nThis is an arithmetic progression with first term $a = 7$, common difference $d = 7$, last term $l = 98$.\nNumber of terms $n = \\frac{98 - 7}{7} + 1 = 14$.\nSum $S_n$:\n$$S_n = \\frac{n}{2} (a + l) = \\frac{14}{2} (7 + 98) = 7 \\times 105 = 735$$",
    "difficulty": "Easy",
    "correct_answer": 735,
    "answer": 735,
    "numerical_range": {
      "min": 730,
      "max": 740
    }
  },
  {
    "id": "QB_GA_070",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Numerical Computation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R.S. Aggarwal - Quantitative Aptitude",
    "question": "A sum of Rs. $10,000$ invested at compound interest compounded annually amounts to Rs. $12,100$ in $2\\text{ years}$. Calculate the annual rate of interest in percentage.",
    "solution": "$$A = P \\left(1 + \\frac{R}{100}\\right)^n$$\n$$12100 = 10000 \\left(1 + \\frac{R}{100}\\right)^2$$\n$$\\left(1 + \\frac{R}{100}\\right)^2 = \\frac{12100}{10000} = 1.21$$\n$$1 + \\frac{R}{100} = \\sqrt{1.21} = 1.10$$\n$$\\frac{R}{100} = 0.10 \\implies R = 10\\%$$",
    "difficulty": "Easy",
    "correct_answer": 10,
    "answer": 10,
    "numerical_range": {
      "min": 9.9,
      "max": 10.1
    }
  },
  {
    "id": "QB_GA_071",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Numerical Computation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R.S. Aggarwal - Quantitative Aptitude",
    "question": "In how many distinct ways can the letters of the word 'AGRICULTURE' be arranged?",
    "solution": "The word 'AGRICULTURE' contains 11 letters in total:\n- A: 1\n- G: 1\n- R: 2\n- I: 1\n- C: 1\n- U: 2\n- L: 1\n- T: 1\n- E: 1\nTotal arrangements:\n$$N = \\frac{11!}{2! \\times 2!} = \\frac{39916800}{4} = 4989600$$",
    "difficulty": "Moderate",
    "correct_answer": 4989600,
    "answer": 4989600,
    "numerical_range": {
      "min": 4989500,
      "max": 4989700
    }
  },
  {
    "id": "QB_GA_072",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Ratios & Percentages",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R.S. Aggarwal - Quantitative Aptitude",
    "question": "In an agricultural engineering college, $60\\%$ of students passed in Thermodynamics, $70\\%$ passed in Fluid Mechanics, and $50\\%$ passed in both subjects. Calculate the percentage of students who failed in both subjects.",
    "solution": "Let $T$ be the set of students passing Thermodynamics, and $F$ passing Fluid Mechanics.\n$$P(T \\cup F) = P(T) + P(F) - P(T \\cap F) = 60\\% + 70\\% - 50\\% = 80\\%$$\nPercentage of students failing in both subjects:\n$$\\text{Failed both} = 100\\% - P(T \\cup F) = 100\\% - 80\\% = 20\\%$$",
    "difficulty": "Easy",
    "correct_answer": 20,
    "answer": 20,
    "numerical_range": {
      "min": 19.5,
      "max": 20.5
    }
  },
  {
    "id": "QB_GA_073",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Numerical Computation",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "R.S. Aggarwal - Quantitative Aptitude",
    "question": "A bag contains 5 red balls, 4 green balls, and 3 blue balls. If two balls are drawn at random without replacement, the probability that both balls are red is:",
    "solution": "Total number of balls $= 5 + 4 + 3 = 12$.\nProbability of drawing two red balls:\n$$P(\\text{both red}) = \\frac{\\binom{5}{2}}{\\binom{12}{2}} = \\frac{\\frac{5 \\times 4}{2}}{\\frac{12 \\times 11}{2}} = \\frac{10}{66} = \\frac{5}{33}$$",
    "difficulty": "Easy",
    "options": {
      "A": "$\\frac{5}{33}$",
      "B": "$\\frac{5}{36}$",
      "C": "$\\frac{1}{6}$",
      "D": "$\\frac{10}{33}$"
    },
    "correct_answer": "A",
    "answer": "A"
  },
  {
    "id": "QB_GA_074",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Numerical Computation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R.S. Aggarwal - Quantitative Aptitude",
    "question": "A man can row upstream at $8\\text{ km/h}$ and downstream at $14\\text{ km/h}$. Calculate the speed of the water current in $\\text{km/h}$.",
    "solution": "Let boat speed in still water be $u$ and stream speed be $v$.\n$$u + v = 14$$\n$$u - v = 8$$\nSubtracting the two equations:\n$$2v = 14 - 8 = 6 \\implies v = 3.0\\text{ km/h}$$",
    "difficulty": "Easy",
    "correct_answer": 3,
    "answer": 3,
    "numerical_range": {
      "min": 2.95,
      "max": 3.05
    }
  },
  {
    "id": "QB_GA_075",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Ratios & Percentages",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "R.S. Aggarwal - Quantitative Aptitude",
    "question": "The ratio of present ages of two brothers $A$ and $B$ is $4 : 5$. Five years hence, the ratio of their ages will become $5 : 6$. Calculate the present age of brother $A$ in $\\text{years}$.",
    "solution": "Let present ages be $4x$ and $5x$.\nAfter 5 years:\n$$\\frac{4x + 5}{5x + 5} = \\frac{5}{6}$$\n$$6(4x + 5) = 5(5x + 5)$$\n$$24x + 30 = 25x + 25$$\n$$x = 5$$\nPresent age of $A = 4x = 4(5) = 20\\text{ years}$.",
    "difficulty": "Easy",
    "correct_answer": 20,
    "answer": 20,
    "numerical_range": {
      "min": 19.5,
      "max": 20.5
    }
  },
  {
    "id": "QB_GA_076",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Data Interpretation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R.S. Aggarwal - Quantitative Aptitude",
    "question": "In a pie chart representing annual farm production costs, the angle of the sector for 'Fertilizers and Chemicals' is $72^\\circ$. If the total annual expenditure is Rs. $5,00,000$, calculate the expenditure on fertilizers and chemicals in Rupees.",
    "solution": "A complete circle has $360^\\circ$.\nFraction of expenditure:\n$$f = \\frac{72^\\circ}{360^\\circ} = \\frac{1}{5} = 0.20$$\nExpenditure:\n$$E = 0.20 \\times 500000 = 1,00,000\\text{ Rs}$$",
    "difficulty": "Easy",
    "correct_answer": 100000,
    "answer": 100000,
    "numerical_range": {
      "min": 99000,
      "max": 101000
    }
  },
  {
    "id": "QB_GA_077",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Numerical Computation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R.S. Aggarwal - Quantitative Aptitude",
    "question": "A contractor estimates that 15 workers can complete an earthen bund construction in 24 days. If the project must be finished in 18 days, calculate the total number of additional workers required.",
    "solution": "Total work in worker-days:\n$$W = 15 \\times 24 = 360\\text{ worker-days}$$\nFor completion in 18 days:\n$$\\text{Required workers} = \\frac{360}{18} = 20\\text{ workers}$$\nAdditional workers needed:\n$$\\Delta W = 20 - 15 = 5$$",
    "difficulty": "Easy",
    "correct_answer": 5,
    "answer": 5,
    "numerical_range": {
      "min": 4.95,
      "max": 5.05
    }
  },
  {
    "id": "QB_GA_078",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Numerical Computation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R.S. Aggarwal - Quantitative Aptitude",
    "question": "Find the unit digit of the expression $7^{105}$.",
    "solution": "The unit digits of powers of 7 follow a cycle of period 4:\n$7^1 = 7$\n$7^2 = 9$\n$7^3 = 3$\n$7^4 = 1$\nDividing the exponent 105 by 4:\n$$105 = 4 \\times 26 + 1$$\nThe remainder is 1, so the unit digit is identical to $7^1 = 7$.",
    "difficulty": "Moderate",
    "correct_answer": 7,
    "answer": 7,
    "numerical_range": {
      "min": 6.95,
      "max": 7.05
    }
  },
  {
    "id": "QB_GA_079",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Ratios & Percentages",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "R.S. Aggarwal - Quantitative Aptitude",
    "question": "If $A$ is $20\\%$ more than $B$, by what percentage is $B$ less than $A$?",
    "solution": "Let $B = 100$. Then $A = 120$.\nPercentage by which $B$ is less than $A$:\n$$\\frac{A - B}{A} \\times 100 = \\frac{120 - 100}{120} \\times 100 = \\frac{20}{120} \\times 100 = \\frac{1}{6} \\times 100 = 16.67\\%$$",
    "difficulty": "Easy",
    "options": {
      "A": "$20\\%$",
      "B": "$16\\frac{2}{3}\\% \\approx 16.67\\%$",
      "C": "$25\\%$",
      "D": "$15\\%$"
    },
    "correct_answer": "B",
    "answer": "B"
  },
  {
    "id": "QB_GA_080",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Numerical Computation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R.S. Aggarwal - Quantitative Aptitude",
    "question": "A car travels the first half of a distance at a speed of $40\\text{ km/h}$ and the second half of the distance at $60\\text{ km/h}$. Calculate the average speed of the car for the entire journey in $\\text{km/h}$.",
    "solution": "For equal distances covered at speeds $v_1$ and $v_2$, the average speed is the harmonic mean:\n$$v_{\\text{avg}} = \\frac{2 v_1 v_2}{v_1 + v_2} = \\frac{2 \\times 40 \\times 60}{40 + 60} = \\frac{4800}{100} = 48.0\\text{ km/h}$$",
    "difficulty": "Easy",
    "correct_answer": 48,
    "answer": 48,
    "numerical_range": {
      "min": 47.5,
      "max": 48.5
    }
  },
  {
    "id": "QB_GA_081",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Numerical Computation",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "R.S. Aggarwal - Quantitative Aptitude",
    "question": "Calculate the greatest common divisor (GCD / HCF) of the numbers $144, 216,$ and $360$.",
    "solution": "Prime factorizations:\n$144 = 2^4 \\times 3^2$\n$216 = 2^3 \\times 3^3$\n$360 = 2^3 \\times 3^2 \\times 5$\n$$\\text{HCF} = 2^3 \\times 3^2 = 8 \\times 9 = 72$$",
    "difficulty": "Easy",
    "correct_answer": 72,
    "answer": 72,
    "numerical_range": {
      "min": 71.5,
      "max": 72.5
    }
  },
  {
    "id": "QB_GA_082",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Ratios & Percentages",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R.S. Aggarwal - Quantitative Aptitude",
    "question": "An article is sold at a discount of $20\\%$ on its marked price, still making a profit of $20\\%$. If the cost price of the article is Rs. $500$, calculate the marked price in Rupees.",
    "solution": "Cost Price $CP = 500$.\nSelling Price with $20\\%$ profit:\n$$SP = 500 \\times 1.20 = 600\\text{ Rs}$$\nLet marked price be $MP$. Since discount is $20\\%$:\n$$SP = MP \\times (1 - 0.20) = 0.80 MP$$\n$$0.80 MP = 600 \\implies MP = \\frac{600}{0.80} = 750\\text{ Rs}$$",
    "difficulty": "Moderate",
    "correct_answer": 750,
    "answer": 750,
    "numerical_range": {
      "min": 745,
      "max": 755
    }
  },
  {
    "id": "QB_GA_083",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Numerical Computation",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "R.S. Aggarwal - Quantitative Aptitude",
    "question": "Calculate the value of $x$ satisfying the equation $2^{2x - 1} = 128$.",
    "solution": "$$128 = 2^7$$\n$$2^{2x - 1} = 2^7$$\n$$2x - 1 = 7 \\implies 2x = 8 \\implies x = 4.0$$",
    "difficulty": "Easy",
    "correct_answer": 4,
    "answer": 4,
    "numerical_range": {
      "min": 3.95,
      "max": 4.05
    }
  },
  {
    "id": "QB_GA_084",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Numerical Computation",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "R.S. Aggarwal - Quantitative Aptitude",
    "question": "The perimeter of a rectangular agricultural test plot is $160\\text{ m}$. If the ratio of length to breadth is $5 : 3$, the area of the plot in $\\text{m}^2$ is:",
    "solution": "Perimeter $2(l + b) = 160 \\implies l + b = 80$.\nWith $l : b = 5 : 3$:\n$$8x = 80 \\implies x = 10$$\nLength $l = 50\\text{ m}$, breadth $b = 30\\text{ m}$.\nArea $A = l \\times b = 50 \\times 30 = 1500\\text{ m}^2$.",
    "difficulty": "Easy",
    "options": {
      "A": "$1500$",
      "B": "$1200$",
      "C": "$1600$",
      "D": "$1800$"
    },
    "correct_answer": "A",
    "answer": "A"
  },
  {
    "id": "QB_GA_085",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Numerical Computation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R.S. Aggarwal - Quantitative Aptitude",
    "question": "In how many ways can a committee of 4 persons be formed from a group of 6 men and 4 women such that the committee includes exactly 2 men and 2 women?",
    "solution": "Number of ways:\n$$N = \\binom{6}{2} \\times \\binom{4}{2} = \\frac{6 \\times 5}{2} \\times \\frac{4 \\times 3}{2} = 15 \\times 6 = 90$$",
    "difficulty": "Easy",
    "correct_answer": 90,
    "answer": 90,
    "numerical_range": {
      "min": 89,
      "max": 91
    }
  },
  {
    "id": "QB_GA_086",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Ratios & Percentages",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "R.S. Aggarwal - Quantitative Aptitude",
    "question": "If $a : b = 2 : 3$ and $b : c = 4 : 5$, calculate the value of $a : c$ expressed as a single fraction $a/c$.",
    "solution": "$$\\frac{a}{c} = \\frac{a}{b} \\times \\frac{b}{c} = \\frac{2}{3} \\times \\frac{4}{5} = \\frac{8}{15} \\approx 0.5333$$",
    "difficulty": "Easy",
    "correct_answer": 0.533,
    "answer": 0.533,
    "numerical_range": {
      "min": 0.52,
      "max": 0.55
    }
  },
  {
    "id": "QB_GA_087",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Data Interpretation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R.S. Aggarwal - Quantitative Aptitude",
    "question": "The average marks of 40 students in a class was calculated as 68. Later, it was discovered that one student's marks were wrongly entered as 85 instead of the correct value 45. Calculate the true corrected average of the class.",
    "solution": "Initial total sum of marks:\n$$S = 40 \\times 68 = 2720$$\nCorrected total:\n$$S_{\\text{correct}} = 2720 - 85 + 45 = 2720 - 40 = 2680$$\nCorrected average:\n$$\\text{Average} = \\frac{2680}{40} = 67.0$$",
    "difficulty": "Easy",
    "correct_answer": 67,
    "answer": 67,
    "numerical_range": {
      "min": 66.8,
      "max": 67.2
    }
  },
  {
    "id": "QB_GA_088",
    "section": "Section 8: General Aptitude",
    "topic": "Verbal Aptitude",
    "subtopic": "Basic English Grammar & Vocabulary",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "R.S. Aggarwal - Verbal Reasoning",
    "question": "Choose the word that is most nearly OPPOSITE in meaning to the word 'EPHEMERAL':",
    "solution": "'Ephemeral' means lasting for a very short time; transient. Its direct antonym is 'Permanent' (enduring, long-lasting).",
    "difficulty": "Easy",
    "options": {
      "A": "Transient",
      "B": "Permanent",
      "C": "Fleeting",
      "D": "Sporadic"
    },
    "correct_answer": "B",
    "answer": "B"
  },
  {
    "id": "QB_GA_089",
    "section": "Section 8: General Aptitude",
    "topic": "Verbal Aptitude",
    "subtopic": "Basic English Grammar & Vocabulary",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "R.S. Aggarwal - Verbal Reasoning",
    "question": "Select the grammatically correct sentence from the options below:",
    "solution": "In correlative conjunctions 'Neither... nor...', the verb agrees with the subject closer to it (rule of proximity). Here, 'students' is plural, requiring the plural verb 'were'.",
    "difficulty": "Easy",
    "options": {
      "A": "Neither the professor nor the students was present in the laboratory.",
      "B": "Neither the professor nor the students were present in the laboratory.",
      "C": "Neither the professor nor the students has been present in the laboratory.",
      "D": "Neither the professor nor the students is present in the laboratory."
    },
    "correct_answer": "B",
    "answer": "B"
  },
  {
    "id": "QB_GA_090",
    "section": "Section 8: General Aptitude",
    "topic": "Verbal Aptitude",
    "subtopic": "Critical Reasoning",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "source": "R.S. Aggarwal - Verbal Reasoning",
    "question": "Consider the statement: 'If the monsoon is delayed, agricultural crop yields drop significantly.' Which of the following is logically equivalent to this statement?",
    "solution": "A conditional statement $P \\implies Q$ is logically equivalent strictly to its contrapositive $\\neg Q \\implies \\neg P$. Here, $\\neg Q$ = 'crop yields do not drop significantly' and $\\neg P$ = 'monsoon was not delayed'.",
    "difficulty": "Moderate",
    "options": {
      "A": "If crop yields do not drop significantly, then the monsoon was not delayed.",
      "B": "If crop yields drop significantly, then the monsoon was delayed.",
      "C": "If the monsoon is not delayed, crop yields will definitely increase.",
      "D": "Delayed monsoon has no effect on agricultural productivity."
    },
    "correct_answer": "A",
    "answer": "A"
  },
  {
    "id": "QB_GA_091",
    "section": "Section 8: General Aptitude",
    "topic": "Verbal Aptitude",
    "subtopic": "Basic English Grammar & Vocabulary",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "R.S. Aggarwal - Verbal Reasoning",
    "question": "Fill in the blank with the most appropriate preposition:\n'The research team complied _____ all environmental safety standards during field testing.'",
    "solution": "The verb 'comply' takes the fixed preposition 'with' ('complied with standards').",
    "difficulty": "Easy",
    "options": {
      "A": "to",
      "B": "with",
      "C": "for",
      "D": "at"
    },
    "correct_answer": "B",
    "answer": "B"
  },
  {
    "id": "QB_GA_092",
    "section": "Section 8: General Aptitude",
    "topic": "Analytical & Spatial Aptitude",
    "subtopic": "Logic Deduction & Pattern Recognition",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "R.S. Aggarwal - Verbal Reasoning",
    "question": "Find the next number in the sequence: $2, 6, 12, 20, 30, 42, ?$ :",
    "solution": "The differences between consecutive terms are:\n$6 - 2 = 4$\n$12 - 6 = 6$\n$20 - 12 = 8$\n$30 - 20 = 10$\n$42 - 30 = 12$\nThe next difference must be $14$, giving $42 + 14 = 56$.\n(Alternatively, $n(n+1)$ for $n = 1, 2, 3, 4, 5, 6, 7 \\implies 7 \\times 8 = 56$).",
    "difficulty": "Easy",
    "options": {
      "A": "54",
      "B": "56",
      "C": "58",
      "D": "60"
    },
    "correct_answer": "B",
    "answer": "B"
  },
  {
    "id": "QB_GA_093",
    "section": "Section 8: General Aptitude",
    "topic": "Analytical & Spatial Aptitude",
    "subtopic": "Logic Deduction & Pattern Recognition",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "source": "R.S. Aggarwal - Verbal Reasoning",
    "question": "Statements:\n1. All tractors are machines.\n2. Some machines are electric.\nConclusions:\nI. Some tractors are electric.\nII. Some machines are tractors.\nWhich of the conclusions logically follow(s)?",
    "solution": "- From Statement 1 ('All tractors are machines'), by conversion, 'Some machines are tractors' is unconditionally true (Conclusion II follows).\n- However, Statement 2 only states that 'Some machines are electric', which does not necessarily overlap with the subset of machines that are tractors (Conclusion I does not necessarily follow).",
    "difficulty": "Moderate",
    "options": {
      "A": "Only conclusion I follows",
      "B": "Only conclusion II follows",
      "C": "Both conclusions I and II follow",
      "D": "Neither conclusion follows"
    },
    "correct_answer": "B",
    "answer": "B"
  },
  {
    "id": "QB_GA_094",
    "section": "Section 8: General Aptitude",
    "topic": "Analytical & Spatial Aptitude",
    "subtopic": "Spatial Reasoning & 3D Representations",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R.S. Aggarwal - Verbal Reasoning",
    "question": "A large solid wooden cube of side $6\\text{ cm}$ is painted red on all six exterior faces and then cut into smaller identical cubes of side $1\\text{ cm}$ each. Calculate the number of smaller cubes that have EXACTLY two faces painted red.",
    "solution": "For a cube of dimension $n = 6$ cut into unit cubes:\n- Cubes with exactly 2 faces painted lie along the 12 edges (excluding corners):\n$$N_2 = 12 \\times (n - 2) = 12 \\times (6 - 2) = 12 \\times 4 = 48$$",
    "difficulty": "Moderate",
    "correct_answer": 48,
    "answer": 48,
    "numerical_range": {
      "min": 47.5,
      "max": 48.5
    }
  },
  {
    "id": "QB_GA_095",
    "section": "Section 8: General Aptitude",
    "topic": "Analytical & Spatial Aptitude",
    "subtopic": "Spatial Reasoning & 3D Representations",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "R.S. Aggarwal - Verbal Reasoning",
    "question": "For the same $6\\text{ cm}$ solid painted cube cut into $1\\text{ cm}$ unit cubes, calculate the number of unit cubes that have NO face painted at all.",
    "solution": "Cubes with no face painted form an inner core cube of dimension $(n - 2) = (6 - 2) = 4$:\n$$N_0 = (n - 2)^3 = 4^3 = 64$$",
    "difficulty": "Easy",
    "correct_answer": 64,
    "answer": 64,
    "numerical_range": {
      "min": 63.5,
      "max": 64.5
    }
  },
  {
    "id": "QB_GA_096",
    "section": "Section 8: General Aptitude",
    "topic": "Verbal Aptitude",
    "subtopic": "Basic English Grammar & Vocabulary",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "R.S. Aggarwal - Verbal Reasoning",
    "question": "Choose the pair of words that exhibits the same relationship as 'SEED : PLANT':",
    "solution": "A seed develops into a plant; analogously, an egg develops into a bird.",
    "difficulty": "Easy",
    "options": {
      "A": "EGG : BIRD",
      "B": "FLOWER : FRUIT",
      "C": "ROOT : LEAF",
      "D": "SOIL : WATER"
    },
    "correct_answer": "A",
    "answer": "A"
  },
  {
    "id": "QB_GA_097",
    "section": "Section 8: General Aptitude",
    "topic": "Analytical & Spatial Aptitude",
    "subtopic": "Logic Deduction & Pattern Recognition",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "R.S. Aggarwal - Verbal Reasoning",
    "question": "Pointing to a photograph of a boy, Suresh said, 'He is the son of the only son of my mother.' How is Suresh related to that boy?",
    "solution": "'The only son of my mother' refers to Suresh himself. The boy is the son of Suresh, so Suresh is the father of the boy.",
    "difficulty": "Easy",
    "options": {
      "A": "Brother",
      "B": "Father",
      "C": "Uncle",
      "D": "Grandfather"
    },
    "correct_answer": "B",
    "answer": "B"
  },
  {
    "id": "QB_GA_098",
    "section": "Section 8: General Aptitude",
    "topic": "Analytical & Spatial Aptitude",
    "subtopic": "Logic Deduction & Pattern Recognition",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R.S. Aggarwal - Verbal Reasoning",
    "question": "Five colleagues $A, B, C, D,$ and $E$ are seated in a row facing North. $B$ is sitting to the immediate right of $E$. $C$ is between $A$ and $D$. If $D$ is at the extreme right end and $A$ is to the immediate right of $B$, who is seated at the exact middle position? (Enter 1 for A, 2 for B, 3 for C, 4 for D, 5 for E)",
    "solution": "Order from left to right:\n- $B$ is immediately right of $E$: $(E, B)$.\n- $A$ is immediately right of $B$: $(E, B, A)$.\n- $D$ is at extreme right and $C$ is between $A$ and $D$: $(E, B, A, C, D)$.\nSeating sequence: $E, B, A, C, D$.\nThe middle person is $A$ (corresponding to code 1).",
    "difficulty": "Moderate",
    "correct_answer": 1,
    "answer": 1,
    "numerical_range": {
      "min": 0.95,
      "max": 1.05
    }
  },
  {
    "id": "QB_GA_099",
    "section": "Section 8: General Aptitude",
    "topic": "Verbal Aptitude",
    "subtopic": "Reading Comprehension",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "source": "GATE General Aptitude Official Archive",
    "question": "Passage: 'Adoption of solar-powered micro-irrigation systems in arid regions has not only elevated water use efficiency but has also stabilized smallholder farmer incomes by reducing recurring fuel expenditures. However, high initial capital investment continues to constrain widespread grassroots adoption in the absence of government subsidies.'\nWhich of the following can be most reasonably inferred from the passage?",
    "solution": "The passage explicitly notes that despite operational advantages, high initial upfront cost restricts grassroots adoption unless government subsidies provide capital support.",
    "difficulty": "Moderate",
    "options": {
      "A": "Solar irrigation systems are economically viable for small farmers only with financial subsidy support",
      "B": "Conventional diesel pumps are cheaper in operating lifecycle cost than solar pumps",
      "C": "Arid regions are unsuitable for solar radiation harvesting",
      "D": "Smallholder farmers prefer diesel pumps due to higher reliability"
    },
    "correct_answer": "A",
    "answer": "A"
  },
  {
    "id": "QB_GA_100",
    "section": "Section 8: General Aptitude",
    "topic": "Analytical & Spatial Aptitude",
    "subtopic": "Spatial Reasoning & 3D Representations",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "R.S. Aggarwal - Verbal Reasoning",
    "question": "When a flat cross-shaped net consisting of 6 connected squares is folded into a 3D cube, how many pairs of mutually opposite faces are formed?",
    "solution": "A standard cube has 6 faces grouped into exactly 3 pairs of opposite faces (top-bottom, front-back, left-right).",
    "difficulty": "Easy",
    "options": {
      "A": "2 pairs",
      "B": "3 pairs",
      "C": "4 pairs",
      "D": "6 pairs"
    },
    "correct_answer": "B",
    "answer": "B"
  },
  {
    "id": "QB_GA_101",
    "section": "Section 8: General Aptitude",
    "topic": "Verbal Aptitude",
    "subtopic": "Basic English Grammar & Vocabulary",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "R.S. Aggarwal - Verbal Reasoning",
    "question": "Select the word that correctly completes the sentence:\n'The scientist provided a _____ explanation that left no ambiguity regarding the experimental outcome.'",
    "solution": "'Lucid' means expressed clearly; easy to understand. 'Vague', 'convoluted', and 'tenuous' imply lack of clarity or weakness.",
    "difficulty": "Easy",
    "options": {
      "A": "lucid",
      "B": "vague",
      "C": "convoluted",
      "D": "tenuous"
    },
    "correct_answer": "A",
    "answer": "A"
  },
  {
    "id": "QB_GA_102",
    "section": "Section 8: General Aptitude",
    "topic": "Analytical & Spatial Aptitude",
    "subtopic": "Logic Deduction & Pattern Recognition",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R.S. Aggarwal - Verbal Reasoning",
    "question": "In a certain code language, if 'TRACTOR' is coded as '20-18-1-3-20-15-18' using alphabetical positions ($A=1, B=2, \\dots$), calculate the numerical sum of the code for the word 'PLOW'.",
    "solution": "Alphabetical positions for P-L-O-W:\n- P = 16\n- L = 12\n- O = 15\n- W = 23\n$$\\text{Sum} = 16 + 12 + 15 + 23 = 66$$",
    "difficulty": "Easy",
    "correct_answer": 66,
    "answer": 66,
    "numerical_range": {
      "min": 65.5,
      "max": 66.5
    }
  },
  {
    "id": "QB_GA_103",
    "section": "Section 8: General Aptitude",
    "topic": "Analytical & Spatial Aptitude",
    "subtopic": "Spatial Reasoning & 3D Representations",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "R.S. Aggarwal - Verbal Reasoning",
    "question": "Which of the following capital English letters possesses BOTH horizontal and vertical axes of reflection symmetry?",
    "solution": "'H' has both vertical reflection symmetry and horizontal reflection symmetry. 'A' and 'M' have only vertical symmetry; 'E' has only horizontal symmetry.",
    "difficulty": "Easy",
    "options": {
      "A": "A",
      "B": "H",
      "C": "E",
      "D": "M"
    },
    "correct_answer": "B",
    "answer": "B"
  },
  {
    "id": "QB_GA_104",
    "section": "Section 8: General Aptitude",
    "topic": "Verbal Aptitude",
    "subtopic": "Critical Reasoning",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "source": "GATE General Aptitude Official Archive",
    "question": "Claim: 'Investing in zero-tillage seed drills will reduce tractor fuel consumption and soil erosion across the state.'\nWhich of the following, if true, most strongly WEAKENS the claim?",
    "solution": "Option B introduces a critical operational bottleneck: clogging forces farmers to conduct secondary tillage, eliminating the intended fuel and soil savings and thus weakening the argument.",
    "difficulty": "Moderate",
    "options": {
      "A": "Zero-tillage drills require fewer tractor passes over the field",
      "B": "Fields with heavy standing crop residue clog zero-tillage furrow openers, forcing farmers to operate secondary tillage implements repeatedly",
      "C": "Zero-tillage preserves residual soil moisture during early germination",
      "D": "State subsidies currently cover $30\\%$ of machine purchase cost"
    },
    "correct_answer": "B",
    "answer": "B"
  },
  {
    "id": "QB_GA_105",
    "section": "Section 8: General Aptitude",
    "topic": "Analytical & Spatial Aptitude",
    "subtopic": "Logic Deduction & Pattern Recognition",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "R.S. Aggarwal - Verbal Reasoning",
    "question": "In a class of 50 students, Rahul's rank is 18th from the top. Calculate his rank from the bottom.",
    "solution": "$$\\text{Rank from bottom} = \\text{Total students} - \\text{Rank from top} + 1 = 50 - 18 + 1 = 33$$",
    "difficulty": "Easy",
    "correct_answer": 33,
    "answer": 33,
    "numerical_range": {
      "min": 32.5,
      "max": 33.5
    }
  },
  {
    "id": "QB_GA_106",
    "section": "Section 8: General Aptitude",
    "topic": "Verbal Aptitude",
    "subtopic": "Basic English Grammar & Vocabulary",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "R.S. Aggarwal - Verbal Reasoning",
    "question": "Choose the correct idiom meaning 'to face a difficult situation with courage and fortitude':",
    "solution": "'Bite the bullet' means to confront a painful or grim situation with resilience and courage.",
    "difficulty": "Easy",
    "options": {
      "A": "Bite the bullet",
      "B": "Spill the beans",
      "C": "Beat around the bush",
      "D": "Burn the midnight oil"
    },
    "correct_answer": "A",
    "answer": "A"
  },
  {
    "id": "QB_GA_107",
    "section": "Section 8: General Aptitude",
    "topic": "Analytical & Spatial Aptitude",
    "subtopic": "Spatial Reasoning & 3D Representations",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "R.S. Aggarwal - Quantitative Aptitude",
    "question": "A clock shows 3:30. Calculate the angle between the hour hand and minute hand in $\\text{degrees}$.",
    "solution": "Angle formula:\n$$\\theta = |30 H - 5.5 M|$$\nFor $H = 3$ and $M = 30$:\n$$\\theta = |30(3) - 5.5(30)| = |90 - 165| = |-75| = 75^\\circ$$",
    "difficulty": "Easy",
    "correct_answer": 75,
    "answer": 75,
    "numerical_range": {
      "min": 74.5,
      "max": 75.5
    }
  },
  {
    "id": "QB_GA_108",
    "section": "Section 8: General Aptitude",
    "topic": "Analytical & Spatial Aptitude",
    "subtopic": "Logic Deduction & Pattern Recognition",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "source": "R.S. Aggarwal - Verbal Reasoning",
    "question": "If 'P + Q' means 'P is the brother of Q', 'P - Q' means 'P is the sister of Q', and 'P * Q' means 'P is the mother of Q', which of the following expressions indicates that 'M is the maternal uncle of N'?",
    "solution": "In $M + K * N$:\n$K * N$ means $K$ is the mother of $N$.\n$M + K$ means $M$ is the brother of $K$.\nTherefore, $M$ is the brother of $N$'s mother, which defines $M$ as the maternal uncle of $N$.",
    "difficulty": "Moderate",
    "options": {
      "A": "M + K * N",
      "B": "M - K * N",
      "C": "M * K + N",
      "D": "N + K * M"
    },
    "correct_answer": "A",
    "answer": "A"
  },
  {
    "id": "QB_GA_109",
    "section": "Section 8: General Aptitude",
    "topic": "Analytical & Spatial Aptitude",
    "subtopic": "Spatial Reasoning & 3D Representations",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "R.S. Aggarwal - Verbal Reasoning",
    "question": "Calculate the total number of line segments (edges) in a regular octahedron.",
    "solution": "A regular octahedron has 8 triangular faces and 6 vertices. By Euler's polyhedral formula ($V - E + F = 2$):\n$$6 - E + 8 = 2 \\implies 14 - E = 2 \\implies E = 12$$",
    "difficulty": "Easy",
    "correct_answer": 12,
    "answer": 12,
    "numerical_range": {
      "min": 11.5,
      "max": 12.5
    }
  },
  {
    "id": "QB_GA_110",
    "section": "Section 8: General Aptitude",
    "topic": "Verbal Aptitude",
    "subtopic": "Basic English Grammar & Vocabulary",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "Choose the correct preposition to fill in the blank:\n\n'The research team has been working on this agricultural robotics project ______ 2021.'",
    "options": {
      "A": "since",
      "B": "for",
      "C": "from",
      "D": "in"
    },
    "correct_answer": "A",
    "answer": "A",
    "difficulty": "Easy",
    "solution": "We use 'since' to denote a specific starting point in time with the present perfect continuous tense.",
    "source": "GATE Official General Aptitude Section"
  },
  {
    "id": "QB_GA_111",
    "section": "Section 8: General Aptitude",
    "topic": "Verbal Aptitude",
    "subtopic": "Basic English Grammar & Vocabulary",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "Select the word that is most nearly OPPOSITE in meaning to the word:\n\n**METICULOUS**",
    "options": {
      "A": "Careless",
      "B": "Painstaking",
      "C": "Thorough",
      "D": "Scrupulous"
    },
    "correct_answer": "A",
    "answer": "A",
    "difficulty": "Easy",
    "solution": "'Meticulous' means showing great attention to detail and being very careful and precise. The antonym is 'Careless'.",
    "source": "GATE Official General Aptitude Section"
  },
  {
    "id": "QB_GA_112",
    "section": "Section 8: General Aptitude",
    "topic": "Verbal Aptitude",
    "subtopic": "Basic English Grammar & Vocabulary",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "Identify the grammatically correct sentence:",
    "options": {
      "A": "Neither the professor nor the students were present in the laboratory.",
      "B": "Neither the professor nor the students was present in the laboratory.",
      "C": "Neither the professor nor the students is present in the laboratory.",
      "D": "Neither the professor nor the students has been present in the laboratory."
    },
    "correct_answer": "A",
    "answer": "A",
    "difficulty": "Easy",
    "solution": "With correlative conjunctions like 'neither... nor', the verb agrees with the closer subject. Here, 'the students' is plural, so the plural verb 'were' is grammatically correct.",
    "source": "GATE Official General Aptitude Section"
  },
  {
    "id": "QB_GA_113",
    "section": "Section 8: General Aptitude",
    "topic": "Verbal Aptitude",
    "subtopic": "Basic English Grammar & Vocabulary",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "Select the most appropriate meaning of the idiom:\n\n*'A blessing in disguise'*",
    "options": {
      "A": "An apparent misfortune that eventually has good results",
      "B": "A disguised enemy pretending to be a friend",
      "C": "A rare spiritual revelation",
      "D": "An unexpected gift from an unknown person"
    },
    "correct_answer": "A",
    "answer": "A",
    "difficulty": "Easy",
    "solution": "'A blessing in disguise' refers to something that seems bad or unlucky at first, but produces good results later.",
    "source": "GATE Official General Aptitude Section"
  },
  {
    "id": "QB_GA_114",
    "section": "Section 8: General Aptitude",
    "topic": "Verbal Aptitude",
    "subtopic": "Reading Comprehension",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "question": "Read the passage:\n\n'Precision agriculture combines sensor technologies, spatial modeling, and automated variable-rate delivery. By replacing blanket broadcast applications with targeted micro-dosing, farmers reduce chemical runoff while boosting net farm margins.'\n\nWhich of the following is the PRIMARY assertion of the passage?",
    "options": {
      "A": "Precision agriculture optimizes input efficiency to yield both environmental and economic gains.",
      "B": "Broadcast applications are completely illegal in commercial agriculture.",
      "C": "Sensor technologies cannot be integrated with mechanical tractors.",
      "D": "Chemical runoff can only be stopped by banning all chemical fertilizers."
    },
    "correct_answer": "A",
    "answer": "A",
    "difficulty": "Easy",
    "solution": "The passage asserts that precision agriculture combines technology to target delivery, reducing runoff (environmental gain) and boosting net margins (economic gain). Option A accurately reflects the primary assertion.",
    "source": "GATE Official General Aptitude Section"
  },
  {
    "id": "QB_GA_115",
    "section": "Section 8: General Aptitude",
    "topic": "Verbal Aptitude",
    "subtopic": "Reading Comprehension",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "question": "Read the following statement:\n\n'While drip irrigation reduces evaporation losses compared to sprinkler irrigation, its high capital cost and emitter clogging risks require careful filtration and chemical treatment.'\n\nWhat can be reasonably INFERRED from this statement?",
    "options": {
      "A": "Drip irrigation systems require ongoing operational maintenance to prevent hydraulic failures.",
      "B": "Sprinkler irrigation completely eliminates water evaporation.",
      "C": "Capital investment in drip irrigation is lower than that of furrow irrigation.",
      "D": "Clogging never occurs if water has suspended silt."
    },
    "correct_answer": "A",
    "answer": "A",
    "difficulty": "Moderate",
    "solution": "The statement explicitly states that emitter clogging risks require careful filtration and chemical treatment, which directly implies that ongoing operational maintenance is required.",
    "source": "GATE Official General Aptitude Section"
  },
  {
    "id": "QB_GA_116",
    "section": "Section 8: General Aptitude",
    "topic": "Verbal Aptitude",
    "subtopic": "Critical Reasoning",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "question": "Consider the argument:\n\n'Whenever tractor fuel prices increase, the average cost of tilling a hectare of land increases. Yesterday, diesel prices rose by $10\\%$. Therefore, custom hiring rates for plowing will definitely increase.'\n\nWhich of the following, if true, WEAKENS the argument most strongly?",
    "options": {
      "A": "The local government has introduced a $20\\%$ direct fuel subsidy for custom hiring center operators.",
      "B": "The price of tractor spare parts also increased last week.",
      "C": "Tractor engine horsepower has increased over the past decade.",
      "D": "Farmers prefer plowing after heavy monsoon showers."
    },
    "correct_answer": "A",
    "answer": "A",
    "difficulty": "Moderate",
    "solution": "If the government provides a 20% direct fuel subsidy, the net fuel cost paid by custom operators decreases despite the 10% market price increase, nullifying the premise that their plowing operational costs must rise.",
    "source": "GATE Official General Aptitude Section"
  },
  {
    "id": "QB_GA_117",
    "section": "Section 8: General Aptitude",
    "topic": "Verbal Aptitude",
    "subtopic": "Critical Reasoning",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "Select the word that best completes the analogy:\n\n**Seed : Germination :: Egg : ?**",
    "options": {
      "A": "Hatching",
      "B": "Incubation",
      "C": "Poultry",
      "D": "Nest"
    },
    "correct_answer": "A",
    "answer": "A",
    "difficulty": "Easy",
    "solution": "A seed begins active biological growth via germination, and an egg produces new biological life via hatching.",
    "source": "GATE Official General Aptitude Section"
  },
  {
    "id": "QB_GA_118",
    "section": "Section 8: General Aptitude",
    "topic": "Verbal Aptitude",
    "subtopic": "Critical Reasoning",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Statement: 'Should commercial farms be mandated to adopt solar-powered micro-irrigation systems?'\n\nArguments:\nI. Yes, it drastically reduces greenhouse gas emissions and fossil fuel consumption.\nII. Yes, it ensures uninterrupted daytime irrigation regardless of rural electrical grid outages.\nIII. No, the initial capital expenditure could prove economically unviable for smallholders without subsidies.\n\nWhich of the arguments are STRONG?",
    "options": {
      "A": "Argument I is strong.",
      "B": "Argument II is strong.",
      "C": "Argument III is strong.",
      "D": "None of the arguments are strong."
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "answer": [
      "A",
      "B",
      "C"
    ],
    "difficulty": "Moderate",
    "solution": "Arguments I and II provide valid, critical environmental and operational justifications for adopting solar irrigation. Argument III raises a legitimate financial barrier regarding capital expenditure feasibility. All three are strong arguments.",
    "source": "R.S. Aggarwal - Quantitative Aptitude"
  },
  {
    "id": "QB_GA_119",
    "section": "Section 8: General Aptitude",
    "topic": "Verbal Aptitude",
    "subtopic": "Basic English Grammar & Vocabulary",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "Choose the word with the correct spelling:",
    "options": {
      "A": "Accommodate",
      "B": "Acommodate",
      "C": "Accomodate",
      "D": "Acomodate"
    },
    "correct_answer": "A",
    "answer": "A",
    "difficulty": "Easy",
    "solution": "The correct spelling is 'Accommodate' with double 'c' and double 'm'.",
    "source": "GATE Official General Aptitude Section"
  },
  {
    "id": "QB_GA_120",
    "section": "Section 8: General Aptitude",
    "topic": "Verbal Aptitude",
    "subtopic": "Basic English Grammar & Vocabulary",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "In the sentence: 'The committee members discussed the proposal thoroughly,' the word **'thoroughly'** functions as which part of speech?",
    "options": {
      "A": "Adverb",
      "B": "Adjective",
      "C": "Noun",
      "D": "Preposition"
    },
    "correct_answer": "A",
    "answer": "A",
    "difficulty": "Easy",
    "solution": "'Thoroughly' modifies the verb 'discussed', answering how the action was performed. Hence, it is an adverb.",
    "source": "GATE Official General Aptitude Section"
  },
  {
    "id": "QB_GA_121",
    "section": "Section 8: General Aptitude",
    "topic": "Verbal Aptitude",
    "subtopic": "Reading Comprehension",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "Complete the sentence with the most logical option:\n\n'Despite several revisions to the design, the prototype ______ failed to pass the vibration test.'",
    "options": {
      "A": "still",
      "B": "never",
      "C": "seldom",
      "D": "always"
    },
    "correct_answer": "A",
    "answer": "A",
    "difficulty": "Easy",
    "solution": "'Despite' establishes a contrast between efforts (several revisions) and the persistent failure. The adverb 'still' expresses this continuation.",
    "source": "GATE Official General Aptitude Section"
  },
  {
    "id": "QB_GA_122",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Numerical Computation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "Pipe A can fill an irrigation water tank in $12\\text{ hours}$ and Pipe B can fill the same tank in $15\\text{ hours}$. If both pipes are opened simultaneously, calculate the time taken to fill the tank in hours (round off to 2 decimal places).",
    "numerical_range": {
      "min": 6.6,
      "max": 6.7
    },
    "answer": 6.67,
    "correct_answer": 6.67,
    "difficulty": "Easy",
    "solution": "Combined filling rate:\n$$\\frac{1}{T} = \\frac{1}{12} + \\frac{1}{15} = \\frac{5 + 4}{60} = \\frac{9}{60} = \\frac{3}{20}\\text{ tank/hour}$$\nTime taken:\n$$T = \\frac{20}{3} \\approx 6.667\\text{ hours} \\approx 6.67\\text{ hours}$$",
    "source": "R.S. Aggarwal - Quantitative Aptitude"
  },
  {
    "id": "QB_GA_123",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Numerical Computation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A train traveling at $72\\text{ km/h}$ crosses a stationary platform of length $180\\text{ m}$ in $15\\text{ seconds}$. Calculate the length of the train in meters.",
    "numerical_range": {
      "min": 119,
      "max": 121
    },
    "answer": 120,
    "correct_answer": 120,
    "difficulty": "Easy",
    "solution": "Speed of train:\n$$v = 72 \\times \\frac{5}{18} = 20\\text{ m/s}$$\nTotal distance covered in 15 seconds:\n$$D = v \\times t = 20 \\times 15 = 300\\text{ m}$$\nLet $L_t$ be train length:\n$$L_t + 180 = 300 \\implies L_t = 300 - 180 = 120\\text{ m}$$",
    "source": "R.S. Aggarwal - Quantitative Aptitude"
  },
  {
    "id": "QB_GA_124",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Ratios & Percentages",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "An agricultural trader marks an implement $25\\%$ above its cost price and then offers a trade discount of $12\\%$ on the marked price. Calculate the trader's net percentage profit.",
    "numerical_range": {
      "min": 9.9,
      "max": 10.1
    },
    "answer": 10,
    "correct_answer": 10,
    "difficulty": "Easy",
    "solution": "Let cost price $\\text{CP} = 100$.\nMarked price $\\text{MP} = 100 \\times 1.25 = 125$.\nDiscount $= 12\\%$ on $125 = 0.12 \\times 125 = 15$.\nSelling price $\\text{SP} = 125 - 15 = 110$.\nProfit percentage:\n$$\\text{Profit \\%} = \\frac{110 - 100}{100} \\times 100 = 10\\%$$",
    "source": "R.S. Aggarwal - Quantitative Aptitude"
  },
  {
    "id": "QB_GA_125",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Ratios & Percentages",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "Two grain varieties A and B costing $\\text{Rs. } 30/\\text{kg}$ and $\\text{Rs. } 45/\\text{kg}$ respectively are mixed together to produce a blend costing $\\text{Rs. } 35/\\text{kg}$. What is the ratio of the quantity of variety A to variety B in the blend?",
    "numerical_range": {
      "min": 1.95,
      "max": 2.05
    },
    "answer": 2,
    "correct_answer": 2,
    "difficulty": "Easy",
    "solution": "By the rule of alligation:\n$$\\frac{Q_A}{Q_B} = \\frac{45 - 35}{35 - 30} = \\frac{10}{5} = \\frac{2}{1} = 2.0$$",
    "source": "R.S. Aggarwal - Quantitative Aptitude"
  },
  {
    "id": "QB_GA_126",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Numerical Computation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A sum of money invested at compound interest compounded annually amounts to $\\text{Rs. } 7200$ after $1\\text{ year}$ and $\\text{Rs. } 8640$ after $2\\text{ years}$. Calculate the annual rate of interest as a percentage.",
    "numerical_range": {
      "min": 19.9,
      "max": 20.1
    },
    "answer": 20,
    "correct_answer": 20,
    "difficulty": "Easy",
    "solution": "Interest earned during the 2nd year on the first year amount:\n$$I_2 = 8640 - 7200 = \\text{Rs. } 1440$$\nRate of interest:\n$$r = \\frac{1440}{7200} \\times 100 = 20\\%$$",
    "source": "R.S. Aggarwal - Quantitative Aptitude"
  },
  {
    "id": "QB_GA_127",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Data Interpretation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A farm's wheat production over three consecutive years is $40\\text{ tonnes}$ in 2021, $50\\text{ tonnes}$ in 2022, and $65\\text{ tonnes}$ in 2023. Calculate the overall percentage increase in wheat production from 2021 to 2023.",
    "numerical_range": {
      "min": 62,
      "max": 63
    },
    "answer": 62.5,
    "correct_answer": 62.5,
    "difficulty": "Easy",
    "solution": "Total increase $= 65 - 40 = 25\\text{ tonnes}$.\nPercentage increase from base year 2021:\n$$\\% \\text{ Increase} = \\frac{25}{40} \\times 100 = 62.5\\%$$",
    "source": "R.S. Aggarwal - Quantitative Aptitude"
  },
  {
    "id": "QB_GA_128",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Numerical Computation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "Worker A can weed an acre of field in $8\\text{ days}$, while worker B can do it in $12\\text{ days}$. With the help of worker C, all three complete the task together in $4\\text{ days}$. In how many days could worker C alone weed the field?",
    "numerical_range": {
      "min": 23.5,
      "max": 24.5
    },
    "answer": 24,
    "correct_answer": 24,
    "difficulty": "Easy",
    "solution": "Rate of C:\n$$\\frac{1}{C} = \\frac{1}{4} - \\left(\\frac{1}{8} + \\frac{1}{12}\\right) = \\frac{1}{4} - \\frac{5}{24} = \\frac{6 - 5}{24} = \\frac{1}{24}$$\nThus worker C alone takes $24\\text{ days}$.",
    "source": "R.S. Aggarwal - Quantitative Aptitude"
  },
  {
    "id": "QB_GA_129",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Ratios & Percentages",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "If $a : b = 3 : 4$ and $b : c = 8 : 9$, what is $a : c$?",
    "options": {
      "A": "2 : 3",
      "B": "1 : 2",
      "C": "3 : 5",
      "D": "4 : 5"
    },
    "correct_answer": "A",
    "answer": "A",
    "difficulty": "Easy",
    "solution": "$$\\frac{a}{c} = \\frac{a}{b} \\times \\frac{b}{c} = \\frac{3}{4} \\times \\frac{8}{9} = \\frac{24}{36} = \\frac{2}{3} \\implies 2 : 3$$",
    "source": "R.S. Aggarwal - Quantitative Aptitude"
  },
  {
    "id": "QB_GA_130",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Data Interpretation",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "In a pie chart representing farm expenditure, if the labor cost accounts for an angle of $72^\\circ$, what percentage of the total farm expenditure is spent on labor?",
    "options": {
      "A": "20%",
      "B": "15%",
      "C": "25%",
      "D": "18%"
    },
    "correct_answer": "A",
    "answer": "A",
    "difficulty": "Easy",
    "solution": "Total angle in a pie chart is $360^\\circ$.\n$$\\text{Percentage} = \\frac{72^\\circ}{360^\\circ} \\times 100 = 20\\%$$",
    "source": "R.S. Aggarwal - Quantitative Aptitude"
  },
  {
    "id": "QB_GA_131",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Numerical Computation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "Find the least common multiple (LCM) of the numbers $24, 36,$ and $54$.",
    "numerical_range": {
      "min": 215,
      "max": 217
    },
    "answer": 216,
    "correct_answer": 216,
    "difficulty": "Easy",
    "solution": "Prime factorizations:\n$$24 = 2^3 \\times 3^1$$\n$$36 = 2^2 \\times 3^2$$\n$$54 = 2^1 \\times 3^3$$\n$$\\text{LCM} = 2^{\\max(3,2,1)} \\times 3^{\\max(1,2,3)} = 2^3 \\times 3^3 = 8 \\times 27 = 216$$",
    "source": "R.S. Aggarwal - Quantitative Aptitude"
  },
  {
    "id": "QB_GA_132",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Data Interpretation",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "A company's revenue ($R$) and costs ($C$) in lakhs of rupees for four quarters are:\nQ1: $R=50, C=40$\nQ2: $R=70, C=50$\nQ3: $R=60, C=55$\nQ4: $R=90, C=65$\n\nWhich of the following statements are CORRECT?",
    "options": {
      "A": "Quarter Q4 yielded the maximum absolute profit (revenue minus cost).",
      "B": "The total profit across all four quarters is 60 lakhs.",
      "C": "Profit margin (profit / revenue) was highest in Q2.",
      "D": "Quarter Q3 had higher profit than Quarter Q1."
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "answer": [
      "A",
      "B",
      "C"
    ],
    "difficulty": "Moderate",
    "solution": "Profits:\nQ1: $50 - 40 = 10$ lakhs (margin $10/50 = 20.0\\%$)\nQ2: $70 - 50 = 20$ lakhs (margin $20/70 = 28.57\\%$)\nQ3: $60 - 55 = 5$ lakhs (margin $5/60 = 8.33\\%$)\nQ4: $90 - 65 = 25$ lakhs (margin $25/90 = 27.78\\%$)\n- Total profit $= 10 + 20 + 5 + 25 = 60$ lakhs (B is true).\n- Q4 had the highest profit of 25 lakhs (A is true).\n- Q2 had the highest profit margin of $28.57\\%$ (C is true).\n- Q3 (5) had less profit than Q1 (10) (D is false).",
    "source": "R.S. Aggarwal - Quantitative Aptitude"
  },
  {
    "id": "QB_GA_133",
    "section": "Section 8: General Aptitude",
    "topic": "Quantitative Aptitude",
    "subtopic": "Ratios & Percentages",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A candidate scores $36\\%$ in an examination and fails by $24\\text{ marks}$. Another candidate scores $48\\%$ and passes by $36\\text{ marks}$. Calculate the total maximum marks of the examination.",
    "numerical_range": {
      "min": 495,
      "max": 505
    },
    "answer": 500,
    "correct_answer": 500,
    "difficulty": "Easy",
    "solution": "Difference in percentage $= 48\\% - 36\\% = 12\\%$.\nDifference in marks $= 36 - (-24) = 60\\text{ marks}$.\nTherefore:\n$$12\\% \\text{ of total marks} = 60 \\implies \\text{Total marks} = \\frac{60}{0.12} = 500$$",
    "source": "R.S. Aggarwal - Quantitative Aptitude"
  },
  {
    "id": "QB_GA_134",
    "section": "Section 8: General Aptitude",
    "topic": "Analytical & Spatial Aptitude",
    "subtopic": "Logic Deduction & Pattern Recognition",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "Find the missing number in the sequence:\n\n$$2,\\ 5,\\ 10,\\ 17,\\ 26,\\ ?$$",
    "numerical_range": {
      "min": 36.9,
      "max": 37.1
    },
    "answer": 37,
    "correct_answer": 37,
    "difficulty": "Easy",
    "solution": "The pattern is $n^2 + 1$ for $n = 1, 2, 3, 4, 5, 6$:\n$$1^2 + 1 = 2$$\n$$2^2 + 1 = 5$$\n$$3^2 + 1 = 10$$\n$$4^2 + 1 = 17$$\n$$5^2 + 1 = 26$$\n$$6^2 + 1 = 37$$",
    "source": "R.S. Aggarwal - Quantitative Aptitude"
  },
  {
    "id": "QB_GA_135",
    "section": "Section 8: General Aptitude",
    "topic": "Analytical & Spatial Aptitude",
    "subtopic": "Logic Deduction & Pattern Recognition",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "In a certain code language, if **'FARM'** is coded as **'GBSN'**, how will **'CROP'** be coded in that same language?",
    "options": {
      "A": "DSPQ",
      "B": "BSNO",
      "C": "DQRO",
      "D": "DSOP"
    },
    "correct_answer": "A",
    "answer": "A",
    "difficulty": "Easy",
    "solution": "Each letter is shifted forward by $+1$ in the alphabet:\n$C \\to D$\n$R \\to S$\n$O \\to P$\n$P \\to Q$\nThus, CROP becomes DSPQ.",
    "source": "R.S. Aggarwal - Quantitative Aptitude"
  },
  {
    "id": "QB_GA_136",
    "section": "Section 8: General Aptitude",
    "topic": "Analytical & Spatial Aptitude",
    "subtopic": "Logic Deduction & Pattern Recognition",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "Pointing to a photograph of a woman, a man says: 'She is the mother of my father's only son's wife.' How is the woman related to the man's wife?",
    "options": {
      "A": "Mother",
      "B": "Sister",
      "C": "Aunt",
      "D": "Daughter"
    },
    "correct_answer": "A",
    "answer": "A",
    "difficulty": "Easy",
    "solution": "The man's father's only son is the man himself. 'My father's only son's wife' is the man's wife. Therefore, the woman in the photograph is the mother of the man's wife.",
    "source": "R.S. Aggarwal - Quantitative Aptitude"
  },
  {
    "id": "QB_GA_137",
    "section": "Section 8: General Aptitude",
    "topic": "Analytical & Spatial Aptitude",
    "subtopic": "Logic Deduction & Pattern Recognition",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "Statements:\n1. All tractors are machines.\n2. Some machines are autonomous.\n\nConclusions:\nI. Some tractors are autonomous.\nII. Some machines are tractors.\n\nWhich of the conclusions logically follows?",
    "options": {
      "A": "Only conclusion II follows",
      "B": "Only conclusion I follows",
      "C": "Both conclusions I and II follow",
      "D": "Neither conclusion follows"
    },
    "correct_answer": "A",
    "answer": "A",
    "difficulty": "Easy",
    "solution": "From 'All tractors are machines', the converse 'Some machines are tractors' immediately follows (Conclusion II). Since the middle term 'machines' is undistributed, no definite link between tractors and autonomous can be deduced, so Conclusion I does not necessarily follow.",
    "source": "R.S. Aggarwal - Quantitative Aptitude"
  },
  {
    "id": "QB_GA_138",
    "section": "Section 8: General Aptitude",
    "topic": "Analytical & Spatial Aptitude",
    "subtopic": "Logic Deduction & Pattern Recognition",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "In a circular conference table, 6 researchers A, B, C, D, E, and F are seated facing the center. A sits opposite D. B sits immediately to the right of A. C is opposite B. E sits between C and D. Who sits between A and D on the remaining side? (If F sits between A and D, enter the ASCII value of character 'F', which is 70).",
    "numerical_range": {
      "min": 69.9,
      "max": 70.1
    },
    "answer": 70,
    "correct_answer": 70,
    "difficulty": "Easy",
    "solution": "Arranging around a 6-seat circle (positions 1 to 6 clockwise):\nLet A be at pos 1. D is opposite A, so D is at pos 4.\nB sits to the right of A, so B is at pos 6 (or pos 2 depending on orientation). Let B be at pos 2.\nC is opposite B, so C is at pos 5.\nE is between C (5) and D (4), so E is at pos 4.5, meaning positions are: 1=A, 2=B, 3=F, 4=D, 5=E, 6=C or similar.\nThe only remaining person is F, who occupies the remaining position between A and D. The ASCII code for F is 70.",
    "source": "R.S. Aggarwal - Quantitative Aptitude"
  },
  {
    "id": "QB_GA_139",
    "section": "Section 8: General Aptitude",
    "topic": "Analytical & Spatial Aptitude",
    "subtopic": "Spatial Reasoning & 3D Representations",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "A standard six-sided die has faces numbered 1 through 6 such that opposite faces always sum to 7. Which of the following pairs represents OPPOSITE faces?",
    "options": {
      "A": "2 and 5",
      "B": "1 and 4",
      "C": "3 and 5",
      "D": "2 and 6"
    },
    "correct_answer": "A",
    "answer": "A",
    "difficulty": "Easy",
    "solution": "In a standard die, opposite faces sum to 7: $(1, 6)$, $(2, 5)$, and $(3, 4)$. Thus $2 + 5 = 7$ is an opposite pair.",
    "source": "R.S. Aggarwal - Quantitative Aptitude"
  },
  {
    "id": "QB_GA_140",
    "section": "Section 8: General Aptitude",
    "topic": "Analytical & Spatial Aptitude",
    "subtopic": "Spatial Reasoning & 3D Representations",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "When a square piece of paper is folded in half diagonally to form an isosceles right triangle and then folded in half again along its altitude, the resulting shape has how many layers of paper?",
    "options": {
      "A": "4 layers",
      "B": "2 layers",
      "C": "8 layers",
      "D": "6 layers"
    },
    "correct_answer": "A",
    "answer": "A",
    "difficulty": "Easy",
    "solution": "Each fold doubles the number of paper layers: $1 \\times 2 = 2$ layers after 1st fold, and $2 \\times 2 = 4$ layers after 2nd fold.",
    "source": "GATE Official General Aptitude Section"
  },
  {
    "id": "QB_GA_141",
    "section": "Section 8: General Aptitude",
    "topic": "Analytical & Spatial Aptitude",
    "subtopic": "Spatial Reasoning & 3D Representations",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following geometric 3D shapes possess at least one rotational axis of 4-fold ($90^\\circ$) symmetry?",
    "options": {
      "A": "Regular Cube",
      "B": "Regular Octahedron",
      "C": "Regular Square Pyramid",
      "D": "Regular Tetrahedron"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "answer": [
      "A",
      "B",
      "C"
    ],
    "difficulty": "Moderate",
    "solution": "- A cube has 3 axes of 4-fold rotational symmetry passing through opposite face centers.\n- A regular octahedron has 3 axes of 4-fold rotational symmetry passing through opposite vertices.\n- A regular square pyramid has 1 axis of 4-fold rotational symmetry passing through apex and base center.\n- A regular tetrahedron has 3-fold and 2-fold symmetry, but NO 4-fold rotational axis.",
    "source": "GATE Official General Aptitude Section"
  },
  {
    "id": "QB_GA_142",
    "section": "Section 8: General Aptitude",
    "topic": "Analytical & Spatial Aptitude",
    "subtopic": "Spatial Reasoning & 3D Representations",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A solid cube of side $3\\text{ cm}$ is painted red on all six outer faces and then cut into 27 unit cubes of side $1\\text{ cm}$. How many of the small unit cubes have EXACTLY TWO painted faces?",
    "numerical_range": {
      "min": 11.9,
      "max": 12.1
    },
    "answer": 12,
    "correct_answer": 12,
    "difficulty": "Easy",
    "solution": "For an $n \\times n \\times n$ painted cube:\n- 3 faces painted: 8 corner cubes.\n- 2 faces painted: cubes along the edges excluding corners $= 12 \\times (n - 2) = 12 \\times (3 - 2) = 12$.\n- 1 face painted: $6 \\times (n - 2)^2 = 6 \\times 1 = 6$.\n- 0 faces painted: $(n - 2)^3 = 1^3 = 1$.\nTotal $= 8 + 12 + 6 + 1 = 27$. Thus exactly 12 cubes have 2 painted faces.",
    "source": "R.S. Aggarwal - Quantitative Aptitude"
  },
  {
    "id": "QB_GA_143",
    "section": "Section 8: General Aptitude",
    "topic": "Analytical & Spatial Aptitude",
    "subtopic": "Spatial Reasoning & 3D Representations",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "If an analog clock shows the time as $3:30$, what is the acute angle between the hour hand and the minute hand in degrees?",
    "options": {
      "A": "$75^\\circ$",
      "B": "$90^\\circ$",
      "C": "$60^\\circ$",
      "D": "$105^\\circ$"
    },
    "correct_answer": "A",
    "answer": "A",
    "difficulty": "Easy",
    "solution": "Angle between clock hands:\n$$\\theta = |30 H - 5.5 M| = |30(3) - 5.5(30)| = |90 - 165| = |-75| = 75^\\circ$$",
    "source": "R.S. Aggarwal - Quantitative Aptitude"
  },
  {
    "id": "QB_GA_144",
    "section": "Section 8: General Aptitude",
    "topic": "Analytical & Spatial Aptitude",
    "subtopic": "Spatial Reasoning & 3D Representations",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A person walks $10\\text{ m}$ North, then turns right and walks $24\\text{ m}$ East. Calculate the straight-line shortest distance in meters from the starting point to the final position.",
    "numerical_range": {
      "min": 25.9,
      "max": 26.1
    },
    "answer": 26,
    "correct_answer": 26,
    "difficulty": "Easy",
    "solution": "By Pythagoras' theorem:\n$$d = \\sqrt{(10)^2 + (24)^2} = \\sqrt{100 + 576} = \\sqrt{676} = 26.0\\text{ m}$$",
    "source": "R.S. Aggarwal - Quantitative Aptitude"
  }
];
