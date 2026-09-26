import json
import os
import sys

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, CURRENT_DIR)

import gen_sec1_em
import gen_sec2_fm
import gen_sec3_fp
import gen_sec4_swce
import gen_sec5_ide
import gen_sec6_ape
import gen_sec7_dfe
import gen_sec8_ga

PROJECT_ROOT = os.path.abspath(os.path.join(CURRENT_DIR, '..', '..'))
QB_DIR = os.path.join(PROJECT_ROOT, 'src', 'data', 'question_bank')

SECTIONS_CONFIG = [
    {
        "file": "section_1_engineering_mathematics.js",
        "gen": gen_sec1_em.generate_em_questions,
        "name": "Section 1: Engineering Mathematics"
    },
    {
        "file": "section_2_farm_machinery.js",
        "gen": gen_sec2_fm.generate_fm_questions,
        "name": "Section 2: Farm Machinery"
    },
    {
        "file": "section_3_farm_power.js",
        "gen": gen_sec3_fp.generate_fp_questions,
        "name": "Section 3: Farm Power"
    },
    {
        "file": "section_4_soil_water_conservation.js",
        "gen": gen_sec4_swce.generate_swce_questions,
        "name": "Section 4: Soil and Water Conservation Engineering"
    },
    {
        "file": "section_5_irrigation_drainage.js",
        "gen": gen_sec5_ide.generate_ide_questions,
        "name": "Section 5: Irrigation and Drainage Engineering"
    },
    {
        "file": "section_6_agri_process_engineering.js",
        "gen": gen_sec6_ape.generate_ape_questions,
        "name": "Section 6: Agricultural Process Engineering"
    },
    {
        "file": "section_7_dairy_food_engineering.js",
        "gen": gen_sec7_dfe.generate_dfe_questions,
        "name": "Section 7: Dairy and Food Engineering"
    },
    {
        "file": "section_8_general_aptitude.js",
        "gen": gen_sec8_ga.generate_ga_questions,
        "name": "Section 8: General Aptitude"
    },
]

def load_existing_questions(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read().strip()
    if text.startswith('export default'):
        text = text[len('export default'):].strip()
    if text.endswith(';'):
        text = text[:-1].strip()
    return json.loads(text)

def main():
    print("=== Master Question Bank Expansion & Build ===")
    total_existing = 0
    total_generated = 0
    all_seen_ids = set()

    for cfg in SECTIONS_CONFIG:
        filepath = os.path.join(QB_DIR, cfg["file"])
        existing = load_existing_questions(filepath)
        raw_generated = cfg["gen"]()

        # Prefix generated question IDs with QB_EXP_ to guarantee global uniqueness
        generated = []
        for q in raw_generated:
            q_copy = dict(q)
            if not q_copy["id"].startswith("QB_EXP_"):
                q_copy["id"] = q_copy["id"].replace("QB_", "QB_EXP_")
            generated.append(q_copy)

        print(f"\nProcessing {cfg['name']}:")
        print(f"  Existing:  {len(existing)} questions")
        print(f"  Generated: {len(generated)} questions")

        combined = []
        for q in existing:
            if q["id"] in all_seen_ids:
                raise ValueError(f"Duplicate ID in existing dataset: {q['id']}")
            all_seen_ids.add(q["id"])
            combined.append(q)

        for q in generated:
            if q["id"] in all_seen_ids:
                raise ValueError(f"Duplicate ID in generated dataset: {q['id']}")
            all_seen_ids.add(q["id"])
            combined.append(q)

        total_existing += len(existing)
        total_generated += len(generated)

        # Write out
        js_content = "export default " + json.dumps(combined, indent=2, ensure_ascii=False) + ";\n"
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(js_content)

        print(f"  Merged Total: {len(combined)} questions -> Written to {cfg['file']}")

    print("\n==============================================")
    print(f"Successfully merged all 8 sections!")
    print(f"Baseline Existing Questions:  {total_existing}")
    print(f"Newly Generated Questions:    {total_generated}")
    print(f"Total Master Question Bank:   {total_existing + total_generated} questions")
    print(f"Expansion Ratio:              {(total_existing + total_generated) / total_existing:.2f}x")
    print("==============================================")

if __name__ == "__main__":
    main()
