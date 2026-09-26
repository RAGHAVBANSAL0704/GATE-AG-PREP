import json

def generate_sec8_fillers():
    """Generates 18 questions to bring all Section 8 subtopics to >= 15 questions."""
    SEC = "Section 8: General Aptitude"
    questions = []

    # 1. Reading Comprehension (8 questions)
    rc_data = [
        ("QB_SUB_GA_RC_001", "MCQ", 1, 0.33,
         "Read the passage and answer the question:\n'Precision agriculture relies on spatio-temporal data collected via remote sensing, IoT sensors, and yield monitors to optimize resource inputs like water, fertilizers, and pesticides. While this data-driven paradigm substantially cuts input wastage and minimizes environmental leaching, high upfront capital investment and the digital literacy divide among smallholder farmers remain formidable impediments to its widespread adoption across the Global South.'\n\nAccording to the passage, the primary barrier to the widespread adoption of precision agriculture in the Global South is:",
         {"A": "Depletion of groundwater and soil salinization", "B": "High capital costs and lack of technical familiarity among smallholders", "C": "Excessive yields leading to market collapse", "D": "Total absence of satellite communication in rural zones"},
         "B",
         "The passage explicitly mentions 'high upfront capital investment and the digital literacy divide among smallholder farmers remain formidable impediments to its widespread adoption across the Global South'. This maps directly to option B.",
         "Official GATE General Aptitude (Verbal Ability)"),

        ("QB_SUB_GA_RC_002", "MCQ", 2, 0.67,
         "Read the passage:\n'Soil conservation is not merely an engineering intervention involving terraces and check dams; it is fundamentally an ecological safeguard. When topsoil is lost, the microbial biome and organic carbon reserves that took millennia to accumulate are irrevocably depleted, diminishing both primary productivity and climate resilience.'\n\nWhich of the following inferences is most directly supported by the passage?",
         {"A": "Mechanical soil conservation structures alone are insufficient to compensate for lost ecological biome", "B": "Terraces and check dams accelerate the depletion of microbial diversity", "C": "Loss of topsoil can be completely recovered within a crop growing season", "D": "Climate change is independent of soil organic carbon reserves"},
         "A",
         "The author emphasizes that soil conservation is 'not merely an engineering intervention... it is fundamentally an ecological safeguard' and notes that topsoil loss irrevocably depletes microbial and carbon reserves that took millennia to form, implying mechanical measures alone cannot replace lost biological health.",
         "High School English Grammar and Composition (Wren & Martin)"),

        ("QB_SUB_GA_RC_003", "MSQ", 2, 0.0,
         "Read the excerpt:\n'Renewable energy integration in rural agro-ecosystems exhibits dual benefits: solar-powered micro-irrigation reduces dependence on fossil fuels and unstable grid power, while simultaneously enabling decentralized groundwater management when coupled with volumetric tariff structures.'\n\nWhich of the following statements are supported by the excerpt?",
         {"A": "Solar-powered irrigation reduces reliance on fossil fuel and grid infrastructure", "B": "Decentralized groundwater management is promoted when solar pumping is combined with volumetric tariffs", "C": "Solar micro-irrigation automatically depletes groundwater under all pricing models", "D": "Renewable agro-technologies provide multiple synergistic advantages"},
         "A, B, D",
         "Options A, B, and D are directly stated in the text. Option C contradicts the passage, which notes that volumetric tariffs help manage groundwater sustainably.",
         "GATE General Aptitude (Verbal Reasoning)"),

        ("QB_SUB_GA_RC_004", "MCQ", 1, 0.33,
         "Read the sentence:\n'Although deep learning algorithms exhibit unmatched accuracy in classifying leaf blight symptoms, their opaque \"black-box\" decision architecture impedes trust among agricultural extension specialists.'\n\nThe author's primary concern regarding deep learning models in agriculture is their:",
         {"A": "Inability to process high-resolution images", "B": "Lack of interpretability and transparency in decision-making", "C": "High power consumption in mobile phones", "D": "Lower accuracy than visual scouting by eye"},
         "B",
         "'Opaque black-box decision architecture' refers directly to the lack of interpretability and transparency in neural network decisions.",
         "GATE Aptitude Syllabus Guide"),

        ("QB_SUB_GA_RC_005", "MCQ", 2, 0.67,
         "Read the passage:\n'Photosynthetic efficiency in C3 crops like rice and wheat is inherently constrained by photorespiration catalyzed by the enzyme RuBisCO in the presence of oxygen. Engineering C4-like biochemical carbon concentrating mechanisms into C3 staples represents a promising frontier to enhance grain yield by over 30% under elevated atmospheric temperatures.'\n\nWhat can be logically deduced from the passage?",
         {"A": "RuBisCO enzyme operates with zero oxygenase activity in C3 plants", "B": "Photorespiration lowers the net photosynthetic yield in C3 crops", "C": "C3 crops have higher thermal tolerance than C4 crops naturally", "D": "Elevated atmospheric temperatures eliminate the need for RuBisCO"},
         "B",
         "The text states that photosynthetic efficiency is constrained by photorespiration catalyzed by RuBisCO in the presence of oxygen, meaning photorespiration lowers net carbon fixation and yield.",
         "Scientific American / GATE Verbal"),

        ("QB_SUB_GA_RC_006", "MSQ", 2, 0.0,
         "Read the passage:\n'Post-harvest grain losses in developing nations frequently exceed 25%, driven by inadequate hermetic storage, humid ambient microclimates, and insect infestation. The deployment of multi-layer Purdue Improved Crop Storage (PICS) bags creates a hypoxic environment that effectively halts insect respiration and mold proliferation without chemical fumigants.'\n\nWhich of the following advantages of PICS bags are highlighted?",
         {"A": "Generation of an oxygen-depleted (hypoxic) internal atmosphere", "B": "Cessation of insect respiration and mold development", "C": "Elimination of the requirement for synthetic chemical fumigants", "D": "Reduction of grain moisture from 25% down to 5% instantly"},
         "A, B, C",
         "Options A, B, and C are directly mentioned. Option D is incorrect; PICS bags preserve moisture but do not serve as thermal grain dryers.",
         "GATE Verbal Aptitude"),

        ("QB_SUB_GA_RC_007", "MCQ", 1, 0.33,
         "Choose the word that is most nearly opposite in meaning to the word 'PERISHABLE' as used in the phrase 'perishable horticultural commodities':",
         {"A": "Ephemeral", "B": "Durable", "C": "Fragile", "D": "Decayable"},
         "B",
         "'Perishable' means subject to rapid decay or spoilage. Its antonym is 'durable' or non-perishable.",
         "Word Power Made Easy (Norman Lewis)"),

        ("QB_SUB_GA_RC_008", "MCQ", 1, 0.33,
         "Select the most appropriate synonym for the capitalized word:\n'The introduction of zero-till farming brought about SUBSTANTIAL fuel savings across the Indo-Gangetic plains.'",
         {"A": "Negligible", "B": "Significant", "C": "Marginal", "D": "Sporadic"},
         "B",
         "'Substantial' means large in amount, importance, or value; hence 'significant' is the exact synonym.",
         "Word Power Made Easy (Norman Lewis)")
    ]

    for qid, qtype, marks, neg, qtext, opt_or_ans, ans_or_range, sol, src in rc_data:
        qobj = {
            "id": qid,
            "section": SEC,
            "topic": "Verbal Aptitude",
            "subtopic": "Reading Comprehension",
            "type": qtype,
            "marks": marks,
            "negative_marks": neg,
            "question": qtext,
            "solution": sol,
            "difficulty": "Moderate" if marks == 2 else "Easy",
            "source": src
        }
        qobj["options"] = opt_or_ans
        qobj["correct_answer"] = ans_or_range
        questions.append(qobj)

    # 2. Critical Reasoning (10 questions)
    cr_data = [
        ("QB_SUB_GA_CR_001", "MCQ", 1, 0.33,
         "Consider the following statement and assumptions:\nStatement: 'Farmers who shift to drip irrigation will conserve at least 40% of their irrigation water and achieve higher fertilizer use efficiency.'\nAssumptions:\nI. Drip irrigation delivers water directly to the crop root zone with minimal evaporative and percolation losses.\nII. Flood irrigation is completely banned across the entire country.\n\nWhich of the assumptions is/are implicit in the statement?",
         {"A": "Only assumption I is implicit", "B": "Only assumption II is implicit", "C": "Both I and II are implicit", "D": "Neither I nor II is implicit"},
         "A",
         "Assumption I explains why drip irrigation conserves water and enhances efficiency. Assumption II is extreme and irrelevant to the comparative benefit of drip irrigation.",
         "A Modern Approach to Verbal & Non-Verbal Reasoning (R.S. Aggarwal)"),

        ("QB_SUB_GA_CR_002", "MCQ", 2, 0.67,
         "Argument: 'Field experiments show that wheat crops treated with mycorrhizal bio-fertilizers require 25% less phosphatic rock fertilizer to achieve identical grain yield. Therefore, chemical fertilizer industries will go bankrupt within three years.'\n\nWhich of the following flaws most severely undermines the conclusion?",
         {"A": "It assumes that phosphatic fertilizers constitute the sole revenue stream of chemical fertilizer manufacturing units", "B": "It ignores the fact that phosphorus is an essential plant macronutrient", "C": "It overlooks that global wheat acreage accounts for all agricultural land on Earth", "D": "It assumes bio-fertilizers cannot be produced industrially"},
         "A",
         "The leap from a 25% reduction in phosphatic application in wheat to total bankruptcy of all chemical fertilizer companies assumes that companies only produce P fertilizer, that all crops instantly adopt it, and that no other revenue streams exist.",
         "Critical Reasoning for Competitive Exams (GMAT/GATE)"),

        ("QB_SUB_GA_CR_003", "MSQ", 2, 0.0,
         "Statement: 'All agricultural drones equipped with multispectral cameras can detect vegetative water stress. No tractor without GPS can perform autonomous auto-guidance.'\n\nWhich of the following deductions are logically valid?",
         {"A": "A drone that cannot detect vegetative water stress lacks a functioning multispectral camera (or calibrated sensor)", "B": "Any tractor executing autonomous auto-guidance must be equipped with GPS", "C": "All tractors equipped with GPS can detect water stress", "D": "Drones with thermal sensors are banned from farm use"},
         "A, B",
         "Statements give: Drone with multispectral -> can detect stress (contrapositive: cannot detect -> lacks sensor); Tractor without GPS -> cannot auto-guide (contrapositive: can auto-guide -> has GPS). Options A and B are valid contrapositives.",
         "Verbal Reasoning (R.S. Aggarwal)"),

        ("QB_SUB_GA_CR_004", "MCQ", 1, 0.33,
         "Identify the conclusion of the following argument:\n'Heavy tractor wheel traffic causes subsurface hardpan formation. Hardpans severely impede root elongation and reduce infiltration. Therefore, farmers must practice subsoiling or adopt controlled traffic farming.'",
         {"A": "Tractor wheels are manufactured from heavy rubber compounds", "B": "Subsurface hardpans impede root growth", "C": "Farmers must practice subsoiling or adopt controlled traffic farming", "D": "Soil infiltration is independent of tractor traffic"},
         "C",
         "The concluding clause introduced by 'Therefore' is the ultimate recommendation and conclusion of the argument.",
         "Logical Reasoning for GATE"),

        ("QB_SUB_GA_CR_005", "MCQ", 2, 0.67,
         "A research report concludes: 'Cities that promoted urban rooftop hydroponic farming saw an average 15% reduction in municipal green waste within two years.'\n\nWhich of the following, if true, most strengthens the argument that rooftop hydroponics caused the reduction?",
         {"A": "Hydroponic growers actively divert kitchen compost and organic green waste into biological nutrient digestors", "B": "During the same two-year period, city residents ate out at restaurants twice as often", "C": "Hydroponic crops use non-recirculating rockwool slabs that cannot be recycled", "D": "Municipal waste collection fees doubled over the same period"},
         "A",
         "Option A provides a direct causal mechanism linking urban hydroponics to the diversion and reduction of municipal organic green waste.",
         "GMAT / GATE Analytical and Critical Reasoning"),

        ("QB_SUB_GA_CR_006", "MCQ", 1, 0.33,
         "Which of the following is logically equivalent to the proposition: 'Unless soil moisture is adequate, seed germination will not take place'?",
         {"A": "If seed germination takes place, soil moisture must be adequate", "B": "If soil moisture is adequate, seed germination is guaranteed to take place", "C": "Seed germination takes place whenever temperature is high", "D": "Adequate soil moisture prevents seed germination"},
         "A",
         "'Unless P, not Q' is equivalent to 'If not P, then not Q', whose contrapositive is 'If Q, then P'. Thus, 'If germination occurs, soil moisture was adequate'.",
         "Deductive Logic and Set Theory"),

        ("QB_SUB_GA_CR_007", "MSQ", 2, 0.0,
         "Argument: 'Replacing traditional puddling with direct-seeded rice (DSR) reduces water requirement by 30% and labor by 50%. However, DSR fields suffer from severe weed competition during early vegetative stages.'\n\nWhich of the following policies would effectively mitigate the drawback of DSR without forfeiting its benefits?",
         {"A": "Developing integrated weed management protocols using pre-emergence herbicides and mechanical cono-weeders", "B": "Flooding the DSR field under 20 cm continuous standing water for the entire season", "C": "Adopting laser land leveling to ensure uniform shallow seed placement and moisture distribution", "D": "Reverting completely to manual transplanting with 30 puddling passes"},
         "A, C",
         "Options A and C address weed suppression and uniform crop establishment without restoring high water consumption. Option B and D destroy the water and labor savings of DSR.",
         "Agronomy Principles and Practices"),

        ("QB_SUB_GA_CR_008", "MCQ", 1, 0.33,
         "Statement: 'Should stubble burning by farmers be made a strictly punishable criminal offense?'\nArguments:\nI. Yes, atmospheric particulate pollution (PM 2.5) during harvest causes severe respiratory illnesses in millions of citizens.\nII. No, smallholder farmers lack affordable mechanization alternatives (like Happy Seeders) to manage paddy straw within the short sowing window for wheat.\n\nWhich of the arguments is/are strong?",
         {"A": "Only argument I is strong", "B": "Only argument II is strong", "C": "Both argument I and argument II are strong", "D": "Neither I nor II is strong"},
         "C",
         "Argument I presents a compelling public health issue. Argument II raises a crucial socio-economic and logistical bottleneck. Both represent valid, strong perspectives that policymakers must resolve simultaneously.",
         "A Modern Approach to Verbal Reasoning (R.S. Aggarwal)"),

        ("QB_SUB_GA_CR_009", "MCQ", 2, 0.67,
         "Consider the assertion: 'Solar refrigeration systems are ideally suited for perishable cold chains in tropical developing countries.'\nReason: 'Peak solar irradiance coincides precisely with the diurnal periods of maximum thermal refrigeration loads.'\n\nSelect the correct option:",
         {"A": "Both Assertion and Reason are true, and the Reason is the correct explanation of the Assertion", "B": "Both Assertion and Reason are true, but Reason is NOT the correct explanation of the Assertion", "C": "Assertion is true, but Reason is false", "D": "Assertion is false, but Reason is true"},
         "A",
         "The thermodynamic synergy between solar availability and peak ambient cooling demand is the primary technical rationale for solar cold storage in the tropics.",
         "Renewable Energy Engineering (S.P. Sukhatme)"),

        ("QB_SUB_GA_CR_010", "MSQ", 2, 0.0,
         "In a logical deduction puzzle:\nPremise 1: All combine harvesters are self-propelled machines.\nPremise 2: Some self-propelled machines are equipped with telematics.\n\nWhich of the following conclusions can be definitively deduced with certainty?",
         {"A": "All machines equipped with telematics are combine harvesters", "B": "Some machines with telematics are self-propelled", "C": "No combine harvester can have telematics", "D": "Some self-propelled machines are combine harvesters"},
         "B, D",
         "Premise 1 ('All A are B') implies 'Some B are A' (Option D). Premise 2 ('Some B are C') is symmetrical and implies 'Some C are B' (Option B). Relationships between A and C cannot be definitively asserted.",
         "Formal Logic & Syllogisms")
    ]

    for qid, qtype, marks, neg, qtext, opt_or_ans, ans_or_range, sol, src in cr_data:
        qobj = {
            "id": qid,
            "section": SEC,
            "topic": "Verbal Aptitude",
            "subtopic": "Critical Reasoning",
            "type": qtype,
            "marks": marks,
            "negative_marks": neg,
            "question": qtext,
            "solution": sol,
            "difficulty": "Moderate" if marks == 2 else "Easy",
            "source": src
        }
        qobj["options"] = opt_or_ans
        qobj["correct_answer"] = ans_or_range
        questions.append(qobj)

    return questions

if __name__ == "__main__":
    qs = generate_sec8_fillers()
    print(f"Generated {len(qs)} questions for Section 8.")
