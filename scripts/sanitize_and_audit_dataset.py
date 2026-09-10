#!/usr/bin/env python3
"""
Automated Dataset Sanitization and Audit Engine
Comprehensive multi-stage pipeline for GATE AG datasets:
1. Audits and detects all extraction artifacts, missing solutions, duplicate stems, and taxonomy misalignments.
2. Recovers missing explanations directly from source docx archives (2012, 2020, 2025).
3. Strips trailing quote artifacts (e.g. 'arrangements\"' -> 'arrangements').
4. Cleans trailing 'Options:' boilerplate and redundant prefixes from question stems.
5. Standardizes MCQ/MSQ/NAT answer schemas.
6. Maps generic fallback topics to canonical GATE AG Syllabus (8 sections, 83 subtopics).
7. Synchronizes src/data/questions.json, src/data/mock_papers.json, and custom mocks.
8. Generates comprehensive audit report (dataset_audit_report.json).
"""

import os
import re
import sys
import json
import argparse
import docx

QUESTIONS_JSON = "src/data/questions.json"
MOCK_PAPERS_JSON = "src/data/mock_papers.json"
CUSTOM_MOCKS_DIR = "src/data"
SOLVED_DOCX_DIR = "QUESTIONS/PAST YEAR /COMPLETE SOLVED"
REPORT_JSON = "dataset_audit_report.json"

# Canonical Section Names
VALID_SECTIONS = [
    "General Aptitude",
    "Engineering Mathematics",
    "Farm Power and Machinery",
    "Soil and Water Conservation Engineering",
    "Irrigation and Drainage Engineering",
    "Agricultural Process Engineering",
    "Dairy and Food Engineering",
    "Farm Structures and Environmental Control"
]

SECTION_NORMALIZATION = {
    'section 8: general aptitude': 'General Aptitude',
    'general aptitude': 'General Aptitude',
    'ga': 'General Aptitude',
    'section 1: engineering mathematics': 'Engineering Mathematics',
    'engineering mathematics': 'Engineering Mathematics',
    'em': 'Engineering Mathematics',
    'section 2: farm power and machinery': 'Farm Power and Machinery',
    'farm power and machinery': 'Farm Power and Machinery',
    'farm machinery and power': 'Farm Power and Machinery',
    'farm machinery & power': 'Farm Power and Machinery',
    'fmp': 'Farm Power and Machinery',
    'section 3: soil and water conservation engineering': 'Soil and Water Conservation Engineering',
    'soil and water conservation engineering': 'Soil and Water Conservation Engineering',
    'soil & water conservation engineering': 'Soil and Water Conservation Engineering',
    'swce': 'Soil and Water Conservation Engineering',
    'section 4: irrigation and drainage engineering': 'Irrigation and Drainage Engineering',
    'irrigation and drainage engineering': 'Irrigation and Drainage Engineering',
    'irrigation & drainage engineering': 'Irrigation and Drainage Engineering',
    'ide': 'Irrigation and Drainage Engineering',
    'section 5: agricultural process engineering': 'Agricultural Process Engineering',
    'agricultural process engineering': 'Agricultural Process Engineering',
    'agricultural processing engineering': 'Agricultural Process Engineering',
    'ape': 'Agricultural Process Engineering',
    'section 6: dairy and food engineering': 'Dairy and Food Engineering',
    'dairy and food engineering': 'Dairy and Food Engineering',
    'dairy & food engineering': 'Dairy and Food Engineering',
    'dfe': 'Dairy and Food Engineering',
    'section 7: farm structures and environmental control': 'Farm Structures and Environmental Control',
    'farm structures and environmental control': 'Farm Structures and Environmental Control',
    'farm structures & environmental control': 'Farm Structures and Environmental Control',
    'fsec': 'Farm Structures and Environmental Control'
}

def normalize_section_name(sec_raw):
    if not sec_raw:
        return 'General Aptitude'
    cleaned = sec_raw.strip().lower()
    cleaned = re.sub(r'^(section\s*\d*\s*[:—\-]?\s*)', '', cleaned).strip()
    if cleaned in SECTION_NORMALIZATION:
        return SECTION_NORMALIZATION[cleaned]
    for k, v in SECTION_NORMALIZATION.items():
        if k in cleaned:
            return v
    if 'math' in cleaned:
        return 'Engineering Mathematics'
    if 'farm machinery' in cleaned or 'farm power' in cleaned or 'machinery' in cleaned or 'power' in cleaned:
        return 'Farm Power and Machinery'
    if 'drainage' in cleaned or 'irrigation' in cleaned:
        return 'Irrigation and Drainage Engineering'
    if 'soil' in cleaned or 'water conservation' in cleaned or 'watershed' in cleaned or 'conservation' in cleaned:
        return 'Soil and Water Conservation Engineering'
    if 'dairy' in cleaned or 'food' in cleaned:
        return 'Dairy and Food Engineering'
    if 'process' in cleaned or 'milling' in cleaned or 'drying' in cleaned:
        return 'Agricultural Process Engineering'
    if 'structure' in cleaned or 'greenhouse' in cleaned:
        return 'Farm Structures and Environmental Control'
    return sec_raw.strip()

# Subtopic Taxonomy Keywords mapping for generic topic remediation
TAXONOMY_KEYWORDS = [
    # General Aptitude
    ("Verbal Aptitude", ["grammar", "vocab", "synonym", "antonym", "preposition", "spelling", "idiom", "passage", "analogy", "sentence"]),
    ("Quantitative Aptitude", ["ratio", "percentage", "speed", "distance", "time", "work", "train", "profit", "loss", "interest", "series", "progression", "permutation", "combination", "probability"]),
    ("Analytical Aptitude", ["syllogism", "statement", "conclusion", "logical", "deduction", "seating", "arrangement", "venn", "inference", "truth"]),
    ("Spatial Aptitude", ["paper", "folding", "cube", "mirror", "reflection", "rotation", "2d", "3d", "pattern", "transformation", "figure"]),
    
    # Engineering Mathematics
    ("Linear Algebra", ["matrix", "matrices", "determinant", "eigenvalue", "eigenvector", "rank", "cayley", "linear system", "orthogonal"]),
    ("Calculus", ["limit", "derivative", "maxima", "minima", "integral", "euler", "taylor", "maclaurin", "series", "partial derivative", "continuity"]),
    ("Vector Calculus", ["gradient", "divergence", "curl", "solenoidal", "irrotational", "green's", "stokes", "gauss divergence", "line integral"]),
    ("Differential Equations", ["ode", "pde", "differential equation", "integrating factor", "laplace", "cauchy", "order", "degree"]),
    ("Probability and Statistics", ["mean", "median", "mode", "standard deviation", "variance", "poisson", "normal distribution", "binomial", "hypothesis"]),
    ("Numerical Methods", ["newton-raphson", "bisection", "trapezoidal", "simpson", "runge-kutta", "gauss-seidel", "iteration"]),

    # Farm Machinery and Power
    ("Tractor Chassis Mechanics & Traction", ["tractor", "wheel slip", "rolling resistance", "weight transfer", "center of gravity", "drawbar pull", "hitch"]),
    ("Internal Combustion Engines", ["diesel", "otto", "dual cycle", "carburetor", "fuel injection", "compression ratio", "indicated power", "brake power", "specific fuel"]),
    ("Tillage Implements", ["mouldboard", "disc plow", "chisel", "subsoiler", "disc angle", "tilt angle", "specific draft", "furrow"]),
    ("Planting and Sowing", ["seed drill", "metering", "fluted roller", "planter", "seed rate", "furrow opener", "transplanter"]),
    ("Plant Protection & Agricultural Drones", ["sprayer", "nozzle", "droplet", "vmd", "uav", "drone", "drift", "relative span", "duster"]),
    ("Harvesting and Threshing Machinery", ["combine", "harvester", "reel index", "threshing cylinder", "concave", "cleaning shoe", "chaff", "straw walker"]),

    # Soil and Water Conservation Engineering
    ("Universal Soil Loss Equation (USLE)", ["usle", "rusle", "soil loss", "erodibility", "erosivity", "ls factor", "cropping management"]),
    ("Watershed Hydrology & Runoff", ["rational method", "runoff", "hydrograph", "unit hydrograph", "s-curve", "time of concentration", "rainfall intensity"]),
    ("SCS Curve Number Method", ["curve number", "scs-cn", "amc", "potential retention", "initial abstraction"]),
    ("Soil Conservation Structures", ["drop spillway", "chute spillway", "bund", "terrace", "check dam", "apron", "hydraulic jump", "nappe"]),
    ("Geomatics & Watershed Remote Sensing", ["ndvi", "remote sensing", "dem", "gis", "flow accumulation", "d8", "reflectance", "satellite"]),

    # Irrigation and Drainage Engineering
    ("Soil-Water-Plant Relationship", ["field capacity", "wilting point", "available water", "matric potential", "depletion", "consumptive use"]),
    ("Irrigation Water Measurement & Canal Design", ["weir", "flume", "orifice", "canal", "lacey", "kennedy", "tractive force", "conveyance"]),
    ("Micro-Irrigation Engineering", ["drip", "sprinkler", "emitter", "emission uniformity", "trickle", "lateral", "friction loss"]),
    ("Drainage Engineering", ["hooghoudt", "tile drain", "subsurface drainage", "glover-dumm", "water table", "leaching requirement"]),
    ("Groundwater & Well Hydraulics", ["aquifer", "transmissivity", "storativity", "drawdown", "theis", "cooper-jacob", "dupuit"]),

    # Agricultural Process Engineering
    ("Psychrometrics & Air Conditioning", ["psychrometric", "humidity ratio", "relative humidity", "dew point", "wet bulb", "enthalpy"]),
    ("Drying and Dehydration", ["thin layer", "drying", "deep bed", "equilibrium moisture", "emc", "falling rate", "henderson", "page"]),
    ("Size Reduction and Material Handling", ["rittinger", "kick", "bond", "hammer mill", "grinding", "screw conveyor", "bucket elevator", "cyclone"]),
    ("Grain Storage & Silo Mechanics", ["silo", "bin", "janssen", "airey", "grain pressure", "aeration", "hopper"]),

    # Dairy and Food Engineering
    ("Thermal Processing of Foods", ["pasteurization", "sterilization", "d-value", "z-value", "f0", "12d", "canning", "retort", "htst"]),
    ("Food Rheology and Texture", ["viscosity", "shear stress", "shear rate", "power law", "pseudoplastic", "dilatant", "bingham", "consistency index"]),
    ("Freezing and Cold Chain Engineering", ["freezing", "plank", "refrigeration", "cold storage", "chilling", "freeze drying", "sublimation"]),
    ("Advanced Food Processing Technologies", ["hpp", "high pressure", "pulsed electric", "modified atmosphere", "map", "membrane", "osmotic", "extrusion"]),

    # Farm Structures and Environmental Control
    ("Greenhouse Technology & Controlled Environments", ["greenhouse", "polyhouse", "cooling pad", "ventilation", "transmissivity", "shading", "co2 enrichment"]),
    ("Livestock Housing & Environmental Control", ["dairy barn", "poultry housing", "sensible heat", "latent heat", "animal heat", "insulation"])
]

def load_docx_explanations():
    """Extract official detailed explanations from solved past year docx files"""
    docx_solutions = {} # key: (year, qnum) -> solution text
    if not os.path.exists(SOLVED_DOCX_DIR):
        return docx_solutions

    for fn in os.listdir(SOLVED_DOCX_DIR):
        if not fn.endswith('.docx'):
            continue
        m_yr = re.search(r'(\d{4})', fn)
        if not m_yr:
            continue
        year = str(m_yr.group(1))
        fp = os.path.join(SOLVED_DOCX_DIR, fn)
        try:
            doc = docx.Document(fp)
            current_qnum = None
            mode = None
            current_exp = []

            for p in doc.paragraphs:
                txt = p.text.strip()
                if not txt:
                    continue

                m_qag = re.match(r'^(?:QAG|AG-?)\s*(\d+)\b', txt, re.IGNORECASE)
                m_q = re.match(r'^(?:Q\.?|Question|GA-?)\s*(\d+)\b', txt, re.IGNORECASE)
                if m_qag or m_q:
                    if current_qnum is not None and current_exp:
                        docx_solutions[(year, current_qnum)] = "\n".join(current_exp).strip()
                    if m_qag:
                        current_qnum = 10 + int(m_qag.group(1))
                    else:
                        current_qnum = int(m_q.group(1))
                    current_exp = []
                    mode = 'meta'
                    continue

                m_exp = re.match(r'^(Detailed\s*Explanation|Explanation|Solution)\s*:?\s*(.*)', txt, re.IGNORECASE)
                if m_exp:
                    mode = 'solution'
                    rest = m_exp.group(2).strip()
                    if rest:
                        current_exp.append(rest)
                    continue

                if mode == 'solution':
                    if re.match(r'^(Q\.?\s*\d+|Question\s*\d+|Official Answer|Topic:)', txt, re.IGNORECASE):
                        mode = 'meta'
                    else:
                        current_exp.append(txt)

            if current_qnum is not None and current_exp:
                docx_solutions[(year, current_qnum)] = "\n".join(current_exp).strip()
        except Exception as e:
            print(f"[Warning] Failed parsing docx {fn}: {e}")

    return docx_solutions

def clean_text_field(txt):
    """Normalize whitespace, remove trailing backslashes and quotes"""
    if not txt:
        return ""
    s = str(txt).strip()
    s = s.replace('\u00a0', ' ') # non-breaking space
    s = re.sub(r'["\\]+$', '', s).strip()
    return s

def clean_question_body(q_txt):
    """Strip 'Options:', OCR prefixes, and extra whitespace"""
    if not q_txt:
        return ""
    s = str(q_txt).strip()
    s = s.replace('\u00a0', ' ')
    # Remove leading 'Question Statement:', 'Question:', 'Statement:'
    s = re.sub(r'^(Question\s*(Statement)?|Statement)\s*:?\s*', '', s, flags=re.IGNORECASE).strip()
    # Remove figure reconstruction notes
    s = re.sub(r'^Figure\s*\(reconstruction\)\s*:?\s*', '', s, flags=re.IGNORECASE).strip()
    # Remove trailing 'Options:'
    s = re.sub(r'\n?Options:\s*$', '', s, flags=re.IGNORECASE).strip()
    # Remove multiple consecutive blank lines
    s = re.sub(r'\n{3,}', '\n\n', s)
    return s

def clean_answer_string(ans, q_type):
    """Standardize correct_answer format"""
    if not ans:
        return ""
    s = str(ans).strip()
    s = re.sub(r'^(Official\s*(Key|Answer)\s*:?|Correct option\s*:?|Accepted range\s*:?|Key range\s*:?)', '', s, flags=re.IGNORECASE).strip()
    
    if q_type == "MCQ":
        m = re.search(r'\b([A-D])\b', s)
        if m:
            return m.group(1).upper()
        return s.upper()

    if q_type == "MSQ":
        tokens = re.findall(r'[A-D]', s.upper())
        if tokens:
            unique_sorted = sorted(list(set(tokens)))
            return ", ".join(unique_sorted)
        return s

    if q_type == "NAT":
        m_range = re.search(r'([-+]?\d+\.?\d*)\s*to\s*([-+]?\d+\.?\d*)', s, re.IGNORECASE)
        if m_range:
            return f"{m_range.group(1)} to {m_range.group(2)}"
        return s

    return s

def infer_topic_and_subtopic(q):
    """Map generic core concepts to canonical syllabus subtopics"""
    sec = q.get('section', '')
    top = q.get('topic', '')
    sub = q.get('subtopic', '')
    
    # If topic contains 'Core Concepts' or is generic
    needs_mapping = (
        not top or 
        'Core Concepts' in top or 
        top in ['General Aptitude', 'Technical', 'Agricultural Engineering']
    )

    if not needs_mapping:
        return top, sub

    opts_dict = q.get('options') or {}
    corpus = f"{q.get('question', '')} {top} {sub} {' '.join(str(v) for v in opts_dict.values())}".lower()

    # Search for highest matching taxonomy
    best_match = None
    best_score = 0

    for topic_candidate, keywords in TAXONOMY_KEYWORDS:
        score = sum(1 for kw in keywords if re.search(r'\b' + re.escape(kw) + r'\b', corpus))
        if score > best_score:
            best_score = score
            best_match = topic_candidate

    if best_match and best_score > 0:
        return best_match, best_match

    # Default section-based fallback
    clean_sec = SECTION_NORMALIZATION.get(sec.lower(), sec)
    return f"{clean_sec} Fundamentals", f"{clean_sec} Fundamentals"

def audit_dataset(questions_list, dataset_name):
    """Audit single list of questions and return statistics"""
    stats = {
        "dataset_name": dataset_name,
        "total_questions": len(questions_list),
        "missing_or_stub_solutions": 0,
        "trailing_quote_subtopics": 0,
        "options_tag_in_question": 0,
        "boilerplate_prefix_in_question": 0,
        "generic_fallback_topics": 0,
        "invalid_section_names": 0,
        "sample_missing_solution_ids": [],
        "sample_trailing_quote_ids": []
    }

    for q in questions_list:
        qid = q.get('id', 'UNKNOWN')
        sol = q.get('solution', '')
        sub = q.get('subtopic', '')
        top = q.get('topic', '')
        sec = q.get('section', '')
        body = q.get('question', '')

        # Missing or stub solution check
        if not sol or sol.startswith("Official Verified Key:") or len(sol.strip()) < 25:
            stats["missing_or_stub_solutions"] += 1
            if len(stats["sample_missing_solution_ids"]) < 10:
                stats["sample_missing_solution_ids"].append(qid)

        # Trailing quote check
        if sub.endswith('"') or top.endswith('"') or sub.endswith('\\') or top.endswith('\\'):
            stats["trailing_quote_subtopics"] += 1
            if len(stats["sample_trailing_quote_ids"]) < 10:
                stats["sample_trailing_quote_ids"].append(qid)

        # Options tag in question
        if re.search(r'\n?Options:\s*$', body, re.IGNORECASE) or 'Options:' in body:
            stats["options_tag_in_question"] += 1

        # Boilerplate prefix
        if re.match(r'^(Question\s*(Statement)?|Statement)\s*:?\s*', body, re.IGNORECASE):
            stats["boilerplate_prefix_in_question"] += 1

        # Generic topic
        if not top or 'Core Concepts' in top or top in ['General Aptitude', 'Technical']:
            stats["generic_fallback_topics"] += 1

        # Invalid section
        norm_sec = normalize_section_name(sec)
        if not norm_sec or norm_sec not in VALID_SECTIONS:
            stats["invalid_section_names"] += 1

    return stats

def sanitize_questions_list(questions_list, docx_solutions, is_pyq=False):
    """Sanitize, recover solutions, and clean questions in place"""
    fixes = {
        "solutions_recovered": 0,
        "trailing_quotes_fixed": 0,
        "options_tags_removed": 0,
        "prefixes_removed": 0,
        "topics_remapped": 0,
        "sections_normalized": 0,
        "answers_standardized": 0
    }

    for q in questions_list:
        qid = q.get('id', '')
        yr = str(q.get('year', ''))
        qnum = q.get('qnum', 0)
        qtype = q.get('type', 'MCQ')

        # 1. Recover missing explanation from docx if available
        sol = q.get('solution', '')
        if (not sol or sol.startswith("Official Verified Key:") or len(sol.strip()) < 25) and (yr, qnum) in docx_solutions:
            recovered = docx_solutions[(yr, qnum)]
            if recovered and len(recovered.strip()) > 10:
                q['solution'] = recovered
                fixes["solutions_recovered"] += 1

        # 2. Fix trailing quotes in topic and subtopic
        old_top = q.get('topic', '')
        old_sub = q.get('subtopic', '')
        q['topic'] = clean_text_field(old_top)
        q['subtopic'] = clean_text_field(old_sub)
        if q['topic'] != old_top or q['subtopic'] != old_sub:
            fixes["trailing_quotes_fixed"] += 1

        # 3. Clean question body (strip 'Options:', prefixes)
        old_q = q.get('question', '')
        clean_q = clean_question_body(old_q)
        if clean_q != old_q:
            if re.search(r'\n?Options:\s*$', old_q, re.IGNORECASE):
                fixes["options_tags_removed"] += 1
            if re.match(r'^(Question\s*(Statement)?|Statement)\s*:?\s*', old_q, re.IGNORECASE):
                fixes["prefixes_removed"] += 1
            q['question'] = clean_q

        # 4. Standardize answer string
        old_ans = q.get('correct_answer', '')
        clean_ans = clean_answer_string(old_ans, qtype)
        if clean_ans != old_ans:
            q['correct_answer'] = clean_ans
            fixes["answers_standardized"] += 1

        # 5. Normalize section name
        old_sec = q.get('section', '')
        if is_pyq:
            OFFICIAL_PYQ_TITLES = {
                'Section 1: Engineering Mathematics',
                'Section 2: Farm Machinery',
                'Section 3: Farm Power',
                'Section 4: Soil and Water Conservation Engineering',
                'Section 5: Irrigation and Drainage Engineering',
                'Section 6: Agricultural Process Engineering',
                'Section 7: Dairy and Food Engineering',
                'Section 8: General Aptitude'
            }
            if old_sec in OFFICIAL_PYQ_TITLES:
                norm_sec = old_sec
            else:
                cleaned = old_sec.strip().lower()
                if 'ga' in cleaned or 'general aptitude' in cleaned or (qnum <= 10 and yr != '2021'):
                    norm_sec = 'Section 8: General Aptitude'
                elif 'math' in cleaned:
                    norm_sec = 'Section 1: Engineering Mathematics'
                elif 'power' in cleaned or 'engine' in cleaned or 'tractor' in cleaned:
                    norm_sec = 'Section 3: Farm Power'
                elif 'machinery' in cleaned or 'tillage' in cleaned:
                    norm_sec = 'Section 2: Farm Machinery'
                elif 'drainage' in cleaned or 'irrigation' in cleaned:
                    norm_sec = 'Section 5: Irrigation and Drainage Engineering'
                elif 'soil' in cleaned or 'conservation' in cleaned or 'watershed' in cleaned:
                    norm_sec = 'Section 4: Soil and Water Conservation Engineering'
                elif 'dairy' in cleaned or 'food' in cleaned:
                    norm_sec = 'Section 7: Dairy and Food Engineering'
                elif 'process' in cleaned or 'milling' in cleaned or 'drying' in cleaned:
                    norm_sec = 'Section 6: Agricultural Process Engineering'
                else:
                    norm_sec = 'Section 8: General Aptitude'
        else:
            norm_sec = normalize_section_name(old_sec)
            if qnum <= 10:
                norm_sec = 'General Aptitude'
            elif norm_sec == 'General Aptitude' and qnum > 10:
                norm_sec = 'Farm Power and Machinery'

        if norm_sec != old_sec:
            q['section'] = norm_sec
            fixes["sections_normalized"] += 1
        q['gate_section'] = 'GA' if 'General Aptitude' in norm_sec else 'AG'

        # 6. Remap generic core concepts topics
        new_top, new_sub = infer_topic_and_subtopic(q)
        if new_top != q['topic']:
            q['topic'] = new_top
            q['subtopic'] = new_sub
            fixes["topics_remapped"] += 1

    return fixes

def detect_duplicate_stems(all_questions):
    """Cluster questions with nearly identical question stems"""
    stems_map = {}
    for q in all_questions:
        raw_text = q.get('question', '')
        # Normalize: alphanumeric lowercase only, first 80 chars
        clean_stem = re.sub(r'[^a-z0-9]', '', raw_text.lower())[:80]
        if len(clean_stem) < 20:
            continue
        stems_map.setdefault(clean_stem, []).append(q.get('id', 'UNKNOWN'))

    duplicates = {k: v for k, v in stems_map.items() if len(v) > 1}
    return duplicates

def main():
    parser = argparse.ArgumentParser(description="Automated Dataset Sanitization and Audit Engine")
    parser.add_argument("--fix", action="store_true", help="Apply deterministic sanitization in place")
    parser.add_argument("--export-missing", action="store_true", help="Export remaining questions lacking solutions to JSON batch")
    args = parser.parse_args()

    print("=================================================================")
    print("      GATE AG PLATFORM: AUTOMATED DATASET SANITIZATION & AUDIT   ")
    print("=================================================================")

    # 1. Load docx solutions for recovery
    print("Loading source DOCX solved archives for solution recovery...")
    docx_solutions = load_docx_explanations()
    print(f"Loaded {len(docx_solutions)} verified solutions from official source DOCX files.")

    # 2. Audit PYQs (questions.json)
    with open(QUESTIONS_JSON, "r", encoding="utf-8") as f:
        pyq_questions = json.load(f)

    pyq_audit = audit_dataset(pyq_questions, "Official PYQs (questions.json)")

    # 3. Audit Custom Mocks (custom_mock_2027_01 to 50)
    all_mock_questions = []
    mock_audits = []
    for i in range(1, 51):
        fn = f"custom_mock_2027_{i:02d}.json"
        fp = os.path.join(CUSTOM_MOCKS_DIR, fn)
        if os.path.exists(fp):
            with open(fp, "r", encoding="utf-8") as f:
                data = json.load(f)
                qs = data.get("questions", [])
                all_mock_questions.extend(qs)
                mock_audits.append(audit_dataset(qs, fn))

    # Duplicate stems across total pool
    all_pool = pyq_questions + all_mock_questions
    dup_stems = detect_duplicate_stems(all_pool)

    print("\n--- PRE-SANITIZATION AUDIT SUMMARY ---")
    print(f"Total Official PYQs: {pyq_audit['total_questions']}")
    print(f"  • Missing/Stub Solutions: {pyq_audit['missing_or_stub_solutions']}")
    print(f"  • Trailing Quote Subtopics: {pyq_audit['trailing_quote_subtopics']}")
    print(f"  • Lingering 'Options:' In Question: {pyq_audit['options_tag_in_question']}")
    print(f"  • Redundant Boilerplate Prefixes: {pyq_audit['boilerplate_prefix_in_question']}")
    print(f"  • Generic Fallback Topics: {pyq_audit['generic_fallback_topics']}")

    total_mock_missing = sum(a['missing_or_stub_solutions'] for a in mock_audits)
    total_mock_quotes = sum(a['trailing_quote_subtopics'] for a in mock_audits)
    total_mock_options = sum(a['options_tag_in_question'] for a in mock_audits)
    total_mock_generic = sum(a['generic_fallback_topics'] for a in mock_audits)

    print(f"\nTotal Custom Mock Questions (50 Papers): {len(all_mock_questions)}")
    print(f"  • Missing/Stub Solutions: {total_mock_missing}")
    print(f"  • Trailing Quote Subtopics: {total_mock_quotes}")
    print(f"  • Lingering 'Options:' In Question: {total_mock_options}")
    print(f"  • Generic Fallback Topics: {total_mock_generic}")
    print(f"\nDuplicate / Near-Identical Stems Across Entire Pool: {len(dup_stems)} clusters")

    if args.fix:
        print("\n--- APPLYING AUTOMATED DETERMINISTIC FIXES ---")
        pyq_fixes = sanitize_questions_list(pyq_questions, docx_solutions, is_pyq=True)
        print(f"questions.json fixes applied:")
        for k, v in pyq_fixes.items():
            print(f"  ✓ {k}: {v}")

        with open(QUESTIONS_JSON, "w", encoding="utf-8") as f:
            json.dump(pyq_questions, f, indent=2, ensure_ascii=False)
        print(f"Successfully wrote sanitized dataset to {QUESTIONS_JSON}")

        # Synchronize mock_papers.json if it exists
        if os.path.exists(MOCK_PAPERS_JSON):
            with open(MOCK_PAPERS_JSON, "r", encoding="utf-8") as f:
                mock_papers = json.load(f)
            q_map = {q['id']: q for q in pyq_questions}
            synced_count = 0
            for paper in mock_papers:
                if paper.get('questions'):
                    paper['questions'] = [q_map.get(q['id'], q) for q in paper['questions']]
                    synced_count += len(paper['questions'])
            with open(MOCK_PAPERS_JSON, "w", encoding="utf-8") as f:
                json.dump(mock_papers, f, indent=2, ensure_ascii=False)
            print(f"Synchronized {synced_count} questions in {MOCK_PAPERS_JSON}")

        # Sanitize Custom Mocks 01 to 50
        mock_fixes_total = {}
        for i in range(1, 51):
            fn = f"custom_mock_2027_{i:02d}.json"
            fp = os.path.join(CUSTOM_MOCKS_DIR, fn)
            if os.path.exists(fp):
                with open(fp, "r", encoding="utf-8") as f:
                    data = json.load(f)
                m_fixes = sanitize_questions_list(data.get("questions", []), docx_solutions)
                for k, v in m_fixes.items():
                    mock_fixes_total[k] = mock_fixes_total.get(k, 0) + v
                with open(fp, "w", encoding="utf-8") as f:
                    json.dump(data, f, indent=2, ensure_ascii=False)

        print(f"Custom Mocks (1-50) fixes applied:")
        for k, v in mock_fixes_total.items():
            print(f"  ✓ {k}: {v}")

    # Generate Full Audit Report
    final_pyq_audit = audit_dataset(pyq_questions, "Official PYQs (questions.json)")
    report_data = {
        "timestamp": "2026-09-09",
        "pyq_audit": final_pyq_audit,
        "custom_mocks_summary": {
            "total_questions": len(all_mock_questions),
            "missing_solutions": sum(a['missing_or_stub_solutions'] for a in mock_audits),
            "trailing_quotes": sum(a['trailing_quote_subtopics'] for a in mock_audits),
            "options_in_stem": sum(a['options_tag_in_question'] for a in mock_audits),
            "generic_topics": sum(a['generic_fallback_topics'] for a in mock_audits)
        },
        "duplicate_clusters_count": len(dup_stems),
        "duplicate_clusters_sample": [list(v) for v in list(dup_stems.values())[:15]]
    }

    with open(REPORT_JSON, "w", encoding="utf-8") as f:
        json.dump(report_data, f, indent=2, ensure_ascii=False)
    print(f"\nComprehensive audit report generated: {REPORT_JSON}")

    if args.export_missing:
        missing_batch = [
            {
                "id": q["id"],
                "year": q.get("year"),
                "qnum": q.get("qnum"),
                "section": q.get("section"),
                "topic": q.get("topic"),
                "type": q.get("type"),
                "question": q.get("question"),
                "options": q.get("options"),
                "correct_answer": q.get("correct_answer")
            }
            for q in pyq_questions if not q.get("solution") or q.get("solution").startswith("Official Verified Key:") or len(q.get("solution").strip()) < 25
        ]
        batch_fp = "scripts/missing_solutions_batch.json"
        with open(batch_fp, "w", encoding="utf-8") as f:
            json.dump(missing_batch, f, indent=2, ensure_ascii=False)
        print(f"Exported {len(missing_batch)} questions needing solutions to {batch_fp}")

if __name__ == "__main__":
    main()
