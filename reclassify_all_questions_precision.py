import json, re

def classify_question(qtext):
    t = qtext.lower()

    # 1. General Aptitude (Verbal, Quant, Spatial)
    if any(w in t for w in ['choose the most appropriate word', 'meaning to the sentence', 'phrasal verb', 'grammatically correct', 'opposite in meaning', 'synonym', 'antonym', 'spelling', 'sentence completion']):
        return 'General Aptitude', 'Verbal Aptitude', 'Grammar & Vocabulary'
    
    if any(w in t for w in ['seating around a circular table', 'pattern of tiles', 'walkways in the diagram', 'coin with heads facing', 'paper folding', 'spatial reasoning', 'descending order of their volume', 'cutout', 'venn diagram', 'family relation', 'brother of q']):
        return 'General Aptitude', 'Analytical & Spatial Aptitude', 'Logic Deduction & Spatial Reasoning'

    if any(w in t for w in ['population of a new city', 'percentage of', 'coins of ₹1', 'ratio of', 'in 2022, june huh was awarded', 'line of symmetry', 'bar chart', 'pie chart', 'histogram shows']):
        return 'General Aptitude', 'Quantitative Aptitude', 'Data Interpretation & Numerical Computation'

    # 2. Engineering Mathematics
    if any(w in t for w in ['eigen', 'matrix', 'matrices', 'determinant', 'rank of matrix', 'cayley-hamilton']):
        return 'Engineering Mathematics', 'Linear Algebra', 'Matrices & Eigenvalues'

    if any(w in t for w in ['differential equation', 'homogeneous differential equation', 'laplace transform', 'cauchy', 'euler', 'second order linear']):
        return 'Engineering Mathematics', 'Differential Equations', 'Linear & Non-Linear ODEs'

    if any(w in t for w in ['simpson', 'trapezoidal', 'newton-raphson', 'secant method', 'numerical integration']):
        return 'Engineering Mathematics', 'Numerical Methods', 'Iterative & Integration Methods'

    if any(w in t for w in ['poisson distribution', 'normal distribution', 'binomial distribution', 'null hypothesis', 'standard deviation and mean']):
        return 'Engineering Mathematics', 'Probability & Statistics', 'Probability Distributions & Testing'

    if any(w in t for w in ['\frac{dy}{dx}', '\frac{\partial', 'partial derivative', 'maxima and minima', 'fourier series', 'divergence', 'curl', 'gradient', 'gauss theorem', 'stokes theorem', 'integral of', '∫']):
        return 'Engineering Mathematics', 'Calculus', 'Differential & Integral Calculus'

    # 3. Farm Machinery & Power
    if any(w in t for w in ['effective temperature', 'human model', 'ergonomics', 'heart rate', 'metabolic rate', 'tractor-implement', 'human factors']):
        return 'Farm Machinery & Power', 'Tractor Chassis & Systems', 'Human Factors in Tractor-Implement System & Ergonomics'

    if any(w in t for w in ['brake power', 'four-cylinder engine', 'engine', 'ic engine', 'two-stroke', 'four-stroke', 'torque', 'crankshaft', 'pto', 'power take-off', 'fuel consumption', 'air cleaner', 'lubrication', 'governing']):
        return 'Farm Machinery & Power', 'Sources of Farm Power', 'IC Engines & Power Parameters'

    if any(w in t for w in ['tractor', 'clutch', 'gearbox', 'differential', 'final drive', 'ackerman steering', 'weight transfer', 'tractive efficiency', 'rolling resistance', 'wheel slip', 'center of gravity']):
        return 'Farm Machinery & Power', 'Tractor Chassis & Systems', 'Chassis Mechanics & Traction'

    if any(w in t for w in ['mouldboard', 'disc plough', 'disc harrow', 'rotavator', 'tillage', 'seed drill', 'planter', 'calibration of seed drill', 'sprayer', 'nozzle', 'combine harvester', 'thresher', 'mower', 'reaper', 'draft']):
        return 'Farm Machinery & Power', 'Farm Machinery & Implements', 'Tillage, Sowing & Harvesting Implements'

    # 4. Soil & Water Conservation Engineering
    if any(w in t for w in ['watershed', 'runoff', 'rainfall', 'usle', 'soil loss', 'rain guage', 'contour bund', 'graded bund', 'terrace', 'drop spillway', 'chute spillway', 'earthen dam', 'phreatic']):
        return 'Soil & Water Conservation Engineering', 'Soil Erosion & Conservation Engineering', 'Erosion Control & Structures'

    if any(w in t for w in ['manning', 'chezy', 'open channel', 'hydraulic jump', 'orifice', 'venturimeter', 'weir', 'flume', 'bernoulli', 'continuity equation']):
        return 'Soil & Water Conservation Engineering', 'Fluid Mechanics & Open Channel Flow', 'Hydraulics & Open Channel Flow'

    if any(w in t for w in ['unit hydrograph', 'synthetic hydrograph', 'evapotranspiration', 'horton', 'green-ampt', 'aquifer', 'darcy', 'dupuit', 'well hydraulics']):
        return 'Soil & Water Conservation Engineering', 'Hydrology & Water Harvesting', 'Hydrology & Groundwater'

    if any(w in t for w in ['field capacity', 'wilting point', 'irrigation', 'duty', 'delta', 'kennedy', 'lacey', 'drip', 'sprinkler', 'hooghoudt', 'subsurface drainage', 'leaching requirement']):
        return 'Soil & Water Conservation Engineering', 'Irrigation & Drainage Engineering', 'Irrigation System & Drainage Design'

    # 5. Agricultural Process Engineering
    if any(w in t for w in ['moisture content', 'dry basis', 'wet basis', 'psychrometric', 'thin layer drying', 'emc', 'equilibrium moisture', 'sphericity', 'porosity', 'angle of repose', 'viscoelastic']):
        return 'Agricultural Process Engineering', 'Engineering Properties of Biological Materials', 'Physical & Psychrometric Properties'

    if any(w in t for w in ['bond', 'rittinger', 'kick', 'size reduction', 'cyclone', 'pasteurization', 'sterilization', 'lmtd', 'heat exchanger', 'evaporator', 'boiling point elevation', 'd-value', 'z-value', 'f0-value']):
        return 'Agricultural Process Engineering', 'Processing Operations & Heat/Mass Transfer', 'Unit Operations & Heat Transfer'

    if any(w in t for w in ['silo', 'godown', 'janssen', 'airy', 'belt conveyor', 'bucket elevator', 'screw conveyor', 'pneumatic conveyor', 'refrigeration', 'cold storage', 'cop']):
        return 'Agricultural Process Engineering', 'Storage & Material Handling', 'Storage Structures & Handling Equipment'

    # Fallback by keyword search
    if any(w in t for w in ['soil', 'water', 'flow', 'discharge', 'pipe', 'channel']):
        return 'Soil & Water Conservation Engineering', 'Fluid Mechanics & Open Channel Flow', 'General Hydraulics'
    
    if any(w in t for w in ['grain', 'food', 'drying', 'heat', 'mass']):
        return 'Agricultural Process Engineering', 'Processing Operations & Heat/Mass Transfer', 'Food & Grain Processing'

    if any(w in t for w in ['speed', 'rpm', 'force', 'power', 'machine']):
        return 'Farm Machinery & Power', 'Sources of Farm Power', 'Farm Machinery Mechanics'

    return 'General Aptitude', 'Quantitative Aptitude', 'General Problem Solving'


def reclassify_everything():
    with open('src/data/questions.json') as f:
        questions = json.load(f)

    reclassified_count = 0
    for q in questions:
        old_sec = q['section']
        new_sec, new_top, new_subtop = classify_question(q['question'])

        q['section'] = new_sec
        q['topic'] = new_top
        q['subtopic'] = new_subtop
        reclassified_count += 1

    with open('src/data/questions.json', 'w') as f:
        json.dump(questions, f, indent=2)

    # Sync back to mock_papers.json
    q_map = {q['id']: q for q in questions}

    with open('src/data/mock_papers.json') as f:
        papers = json.load(f)

    for p in papers:
        for q in p['questions']:
            if q['id'] in q_map:
                sq = q_map[q['id']]
                q['section'] = sq['section']
                q['topic'] = sq['topic']
                q['subtopic'] = sq['subtopic']

    with open('src/data/mock_papers.json', 'w') as f:
        json.dump(papers, f, indent=2)

    print(f"Successfully reclassified all {reclassified_count} questions into precise Section, Topic, and Sub-Topic taxonomy!")

if __name__ == '__main__':
    reclassify_everything()
