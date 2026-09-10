import json
import glob
import os
import re
from collections import defaultdict, Counter

with open('src/data/official_syllabus.json') as f:
    syllabus = json.load(f)

OFFICIAL_SECTIONS = [s['full_title'] for s in syllabus]
OFFICIAL_TOPICS = {s['full_title']: [t['topic_name'] for t in s['topics']] for s in syllabus}

def sanitize_text(s):
    if not isinstance(s, str):
        return s
    return ''.join(c for c in s if ord(c) >= 32 or c in [chr(10), chr(9), chr(13)])

def classify_math_topic(text):
    tl = text.lower()
    if any(k in tl for k in ['eigen', 'matrix', 'determinant', 'rank', 'system of linear', 'vector space', 'cayley']):
        return 'Linear Algebra'
    if any(k in tl for k in ['differential equation', 'ode', 'pde', 'complementary function', 'particular integral', 'cauchy-euler', 'exact differential', 'integrating factor']):
        return 'Differential Equations'
    if any(k in tl for k in ['probability', 'poisson', 'binomial', 'normal distribution', 'bayes', 'variance', 'expectation', 'standard deviation']):
        return 'Probability and Statistics'
    if any(k in tl for k in ['newton-raphson', 'trapezoidal', 'simpson', 'runge-kutta', 'secant', 'bisection', 'numerical integration', 'numerical solution', 'iteration']):
        return 'Numerical Methods'
    if any(k in tl for k in ['gradient', 'divergence', 'curl', 'line integral', 'surface integral', 'stokes', 'gauss divergence', 'green theorem', 'directional derivative']):
        return 'Vector Calculus'
    return 'Calculus'

def classify_machinery_topic(text):
    tl = text.lower()
    if any(k in tl for k in ['gear', 'spur gear', 'helical', 'bevel', 'v-belt', 'flat belt', 'roller chain', 'sprocket', 'bearing', 'journal bearing', 'ball bearing', 'shaft design', 'power screw', 'clutch plate design', 'goodman', 'soderberg']):
        return 'Machine Design'
    return 'Farm Machinery'

def classify_power_topic(text):
    tl = text.lower()
    if any(k in tl for k in ['solar', 'photovoltaic', 'collector', 'wind energy', 'wind mill', 'wind turbine', 'betz', 'biomass', 'gasifier', 'biogas', 'anaerobic digester', 'producer gas']):
        return 'Sources of Power'
    if any(k in tl for k in ['tractor', 'power tiller', 'chassis', 'weight transfer', 'tractive efficiency', 'wheel slip', 'travel reduction', 'rolling resistance', 'rim pull', 'drawbar pull', 'drawbar power', 'pto', 'steering', 'ackermann', 'brake', 'stopping distance', 'differential lock', 'final drive']):
        return 'Tractors and Power Tillers'
    return 'Farm Power'

def classify_swce_topic(text):
    tl = text.lower()
    if any(k in tl for k in ['runoff', 'scs-cn', 'curve number', 'rational formula', 'hydrograph', 'unit hydrograph', 'flood routing', 'muskingum', 'hyetograph', 'rainfall', 'precipitation', 'thiessen', 'isohyetal', 'water yield']):
        return 'Hydrology'
    if any(k in tl for k in ['usle', 'soil loss', 'soil erosion', 'contour bund', 'graded bund', 'terrace', 'bench terrace', 'drop spillway', 'chute spillway', 'drop inlet', 'waterway', 'wind erosion', 'saltation']):
        return 'Soil and Water Erosion'
    if any(k in tl for k in ['hydrostatic', 'bernoulli', 'manometer', 'pipe flow', 'reynolds', 'darcy-weisbach', 'head loss', 'manning', 'chezy', 'open channel', 'hydraulic jump', 'froude', 'specific energy', 'critical depth']):
        return 'Fluid Mechanics'
    if any(k in tl for k in ['void ratio', 'porosity', 'permeability', 'darcy law', 'effective stress', 'compaction', 'shear strength', 'mohr-coulomb', 'direct shear', 'triaxial', 'atterberg', 'plasticity index']):
        return 'Soil Mechanics'
    if any(k in tl for k in ['chain surveying', 'compass', 'bearing', 'theodolite', 'levelling', 'leveling', 'contour', 'rise and fall', 'height of instrument', 'tacheometry', 'gps', 'remote sensing', 'gis']):
        return 'Surveying and Levelling'
    return 'Watershed Management'

def classify_ide_topic(text):
    tl = text.lower()
    # Check Wells and Pumps first
    if any(k in tl for k in ['centrifugal pump', 'pump characteristic', 'impeller', 'npsh', 'cavitation', 'specific speed', 'affinity laws', 'system head curve', 'pump efficiency', 'well loss', 'specific capacity']):
        return 'Wells and Pumps'
    if any(k in tl for k in ['aquifer', 'confined aquifer', 'unconfined aquifer', 'transmissivity', 'storage coefficient', 'storativity', 'theis', 'thiem', 'dupuit', 'cooper-jacob', 'drawdown', 'radius of influence', 'cone of depression']):
        return 'Groundwater Hydrology'
    if any(k in tl for k in ['drainage', 'subsurface drain', 'tile drain', 'drain spacing', 'hooghoudt', 'ernst', 'glover-dummit', 'drainable porosity', 'water table depth', 'surface drainage']):
        return 'Agricultural Drainage'
    if any(k in tl for k in ['field capacity', 'wilting point', 'available water', 'readily available', 'consumptive use', 'evapotranspiration', 'blaney', 'penman', 'pan evap', 'crop coefficient', 'soil moisture tension', 'tensiometer']):
        return 'Soil-Water-Plant Relationship'
    return 'Irrigation Water Conveyance and Application Methods'

def classify_ape_topic(text):
    tl = text.lower()
    if any(k in tl for k in ['rittinger', 'kick', 'bond', 'work index', 'crushing', 'grinding', 'hammer mill', 'screen analysis', 'fineness modulus', 'screen effectiveness', 'conveyor', 'belt conveyor', 'screw conveyor', 'bucket elevator', 'pneumatic conveying']):
        return 'Size Reduction and Material Handling'
    if any(k in tl for k in ['psychrometric', 'humidity ratio', 'dry bulb', 'wet bulb', 'enthalpy of moist air', 'thin-layer drying', 'page equation', 'equilibrium moisture', 'emc', 'henderson', 'chung-pfost', 'falling rate', 'drying constant']):
        return 'Evaporation and Drying'
    if any(k in tl for k in ['storage', 'janssen', 'rankine', 'silo', 'bin design', 'aeration', 'modified atmosphere', 'controlled atmosphere', 'greenhouse', 'controlled environment']):
        return 'Storage Systems'
    if any(k in tl for k in ['bulk density', 'true density', 'sphericity', 'roundness', 'angle of repose', 'terminal velocity of grain', 'dielectric', 'thermal properties']):
        return 'Engineering Properties of Agriculture Produce'
    return 'Processing of Agriculture Produce'

def classify_dfe_topic(text):
    tl = text.lower()
    if any(k in tl for k in ['lmtd', 'heat exchanger', 'log mean', 'overall heat transfer', 'counter-flow', 'parallel flow', 'fourier', 'thermal conductivity', 'fouling factor', 'conduction', 'convection', 'radiation']):
        return 'Heat and Mass Transfer'
    if any(k in tl for k in ['pasteuriz', 'steriliz', 'thermal death', 'd-value', 'z-value', 'f-value', '12d', 'clostridium', 'refrigerat', 'carnot', 'cop', 'freezing', 'plank', 'water activity']):
        return 'Preservation of Food'
    return 'Unit Operations in Dairy and Food Engineering'

def classify_ga_topic(text):
    tl = text.lower()
    if any(k in tl for k in ['reading comprehension', 'passage', 'author', 'vocabulary', 'antonym', 'synonym', 'analogy', 'grammat', 'sentence completion', 'idiom', 'preposition']):
        return 'Verbal Aptitude'
    if any(k in tl for k in ['cube', 'paint', 'reflection', 'rotation', 'mirror', 'paper folding', 'symmetry', 'spatial', 'seating', 'knight', 'knave', 'syllogism', 'truth-teller', 'schedule']):
        return 'Analytical & Spatial Aptitude'
    return 'Quantitative Aptitude'

def classify_section_and_topic(q):
    qn = q.get('qnum', 0)
    current_sec = str(q.get('section', '')).strip()
    current_top = str(q.get('topic', '')).strip()
    current_subtop = str(q.get('subtopic', '')).strip()
    q_text = str(q.get('question', ''))
    options_text = ' '.join(q.get('options', {}).values()) if isinstance(q.get('options'), dict) else ''
    
    # Text for topic classification ONLY (omit section string so it doesn't cross-contaminate)
    content_text = f'{q_text} {options_text} {current_top} {current_subtop}'

    # General Aptitude (Q1 to Q10)
    if 1 <= qn <= 10:
        sec = 'Section 8: General Aptitude'
        top = classify_ga_topic(content_text)
        return sec, top

    # Section 1: Engineering Mathematics
    if 'math' in current_sec.lower() or any(k in current_top.lower() for k in ['calculus', 'linear algebra', 'probability', 'differential equation', 'numerical methods', 'vector calculus']):
        sec = 'Section 1: Engineering Mathematics'
        top = classify_math_topic(content_text)
        return sec, top

    # Section 7: Dairy and Food Engineering
    if 'dairy' in current_sec.lower() or 'food' in current_sec.lower() or any(k in current_top.lower() for k in ['dairy', 'preservation', 'pasteur', 'heat and mass transfer', 'homogeniz']):
        sec = 'Section 7: Dairy and Food Engineering'
        top = classify_dfe_topic(content_text)
        return sec, top

    # Section 5: Irrigation and Drainage Engineering
    if 'irrigation' in current_sec.lower() or 'drainage' in current_sec.lower() or any(k in current_top.lower() for k in ['wells and pumps', 'groundwater', 'drainage', 'irrigation water', 'soil-water-plant']):
        sec = 'Section 5: Irrigation and Drainage Engineering'
        top = classify_ide_topic(content_text)
        return sec, top

    # Section 4: Soil and Water Conservation Engineering
    if 'soil' in current_sec.lower() or 'water conservation' in current_sec.lower() or any(k in current_top.lower() for k in ['hydrology', 'soil mechanics', 'fluid mechanics', 'surveying', 'erosion', 'watershed']):
        sec = 'Section 4: Soil and Water Conservation Engineering'
        top = classify_swce_topic(content_text)
        return sec, top

    # Section 6: Agricultural Process Engineering (including Greenhouse / Structures)
    if 'process' in current_sec.lower() or 'farm structures' in current_sec.lower() or any(k in current_top.lower() for k in ['size reduction', 'drying', 'storage', 'engineering properties', 'greenhouse', 'controlled environment']):
        sec = 'Section 6: Agricultural Process Engineering'
        top = classify_ape_topic(content_text)
        return sec, top

    # Disambiguate Farm Power vs Farm Machinery
    machinery_terms = [
        'tillage', 'mouldboard', 'disc plough', 'disc plow', 'chisel', 'subsoiler', 'rotavator', 'cultivator',
        'seed drill', 'planter', 'fluted roller', 'cup feed', 'metering', 'furrow opener',
        'sprayer', 'nozzle', 'vmd', 'plant protection', 'duster', 'combine harvester',
        'cutter bar', 'reel', 'cylinder-concave', 'straw walker', 'threshing', 'winnowing',
        'field capacity', 'field efficiency', 'implement draft', 'specific draft', 'implement hitch',
        'machine design', 'gear', 'belt', 'chain', 'sprocket', 'bearing', 'shaft', 'plow', 'plough',
        'draft of implement', 'draft requirement', 'mowing', 'chaff cutter', 'cost of farm machine',
        'economic life of a farm machine', 'salvage value', 'depreciation'
    ]
    power_terms = [
        'engine', 'cylinder', 'stroke', 'four-stroke', 'two-stroke', 'indicated power',
        'brake power', 'mep', 'mean effective pressure', 'bsfc', 'fuel consumption',
        'otto', 'diesel', 'dual cycle', 'compression ratio', 'governor', 'carburetor',
        'cooling system', 'lubrication', 'clutch', 'gearbox', 'differential', 'transmission',
        'power tiller', 'weight transfer', 'tractive efficiency', 'wheel slip',
        'rolling resistance', 'rim pull', 'drawbar power', 'pto power',
        'ergonomics', 'sources of power', 'biomass', 'solar', 'wind'
    ]
    
    tl = content_text.lower()
    m_score = sum(1 for w in machinery_terms if w in tl)
    p_score = sum(1 for w in power_terms if w in tl)

    if m_score > p_score:
        sec = 'Section 2: Farm Machinery'
        top = classify_machinery_topic(content_text)
    else:
        sec = 'Section 3: Farm Power'
        top = classify_power_topic(content_text)
    
    return sec, top

def process_all_mocks():
    mock_files = sorted(glob.glob('src/data/custom_mock_2027_*.json'))
    print(f'Processing {len(mock_files)} mock files...')

    sec_stats = defaultdict(lambda: {'marks': 0, 'count': 0})
    topic_stats = defaultdict(lambda: defaultdict(lambda: {'marks': 0, 'count': 0}))

    for mf in mock_files:
        with open(mf, 'r', encoding='utf-8') as f:
            data = json.load(f)

        questions = data.get('questions', [])
        for q in questions:
            sec, top = classify_section_and_topic(q)
            q['section'] = sec
            q['topic'] = top
            q['difficulty'] = 'Hard'
            
            st = str(q.get('subtopic', '')).strip()
            if not st or st in ['Quantitative Aptitude', 'Spatial Aptitude', 'Analytical Aptitude', 'General']:
                q['subtopic'] = f'{top} Problem Analysis'

            q['solution'] = sanitize_text(q.get('solution', ''))
            q['question'] = sanitize_text(q.get('question', ''))

            m = q.get('marks', 1)
            sec_stats[sec]['marks'] += m
            sec_stats[sec]['count'] += 1
            topic_stats[sec][top]['marks'] += m
            topic_stats[sec][top]['count'] += 1

        with open(mf, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

    n_mocks = len(mock_files)
    print("\n" + "="*80)
    print("ALL 50 MOCKS HARMONIZED WITH OFFICIAL GATE AG TAXONOMY")
    print("="*80)
    print(f'{"Section":<52} | {"Avg Marks":<10} | {"Avg Qs":<10}')
    print('-'*80)
    for sec in sorted(sec_stats.keys()):
        avg_m = sec_stats[sec]['marks'] / n_mocks
        avg_q = sec_stats[sec]['count'] / n_mocks
        print(f'{sec:<52} | {avg_m:6.2f}M   | {avg_q:5.1f} Qs')

    print("\n" + "="*80)
    print("TOPIC BREAKDOWN ACROSS 50 MOCKS (AVERAGE MARKS PER PAPER)")
    print("="*80)
    for sec in sorted(topic_stats.keys()):
        print(f'\n>>> {sec}:')
        tops = topic_stats[sec]
        for t, d in sorted(tops.items(), key=lambda x: x[1]['marks'], reverse=True):
            tm = d['marks'] / n_mocks
            tq = d['count'] / n_mocks
            print(f'    - {t:<42}: {tm:5.2f}M ({tq:4.1f} Qs/paper)')

if __name__ == '__main__':
    process_all_mocks()
