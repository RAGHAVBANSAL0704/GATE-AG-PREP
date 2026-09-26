import json
import os
import re
from collections import Counter, defaultdict

# Import all generators
from fill_sec1_em import generate_sec1_fillers
from fill_sec2_fm import generate_sec2_fillers
from fill_sec3_fp import generate_sec3_fillers
from fill_sec4_swce import generate_sec4_fillers
from fill_sec5_ide import generate_sec5_fillers
from fill_sec6_ape import generate_sec6_fillers
from fill_sec7_dfe import generate_sec7_fillers
from fill_sec8_ga import generate_sec8_fillers

SEC_FILES = {
    1: "src/data/question_bank/section_1_engineering_mathematics.js",
    2: "src/data/question_bank/section_2_farm_machinery.js",
    3: "src/data/question_bank/section_3_farm_power.js",
    4: "src/data/question_bank/section_4_soil_water_conservation.js",
    5: "src/data/question_bank/section_5_irrigation_drainage.js",
    6: "src/data/question_bank/section_6_agri_process_engineering.js",
    7: "src/data/question_bank/section_7_dairy_food_engineering.js",
    8: "src/data/question_bank/section_8_general_aptitude.js"
}

def load_section_file(fpath):
    with open(fpath, "r", encoding="utf-8") as f:
        text = f.read().strip()
    if text.startswith("export default"):
        text = text[len("export default"):].strip()
        if text.endswith(";"):
            text = text[:-1].strip()
    return json.loads(text)

def save_section_file(fpath, data):
    content = "export default " + json.dumps(data, indent=2, ensure_ascii=False) + ";\n"
    with open(fpath, "w", encoding="utf-8") as f:
        f.write(content)

def validate_question(q, existing_ids):
    assert "id" in q and q["id"], f"Missing id: {q}"
    assert q["id"] not in existing_ids, f"Duplicate ID: {q['id']}"
    assert re.match(r"^QB_[A-Z0-9]+(_[A-Z0-9]+)*_\d+$", q["id"]), f"Invalid ID format: {q['id']}"
    
    assert "section" in q and q["section"]
    assert "topic" in q and q["topic"]
    assert "subtopic" in q and q["subtopic"]
    assert q["type"] in ["MCQ", "MSQ", "NAT"], f"Invalid type: {q['type']}"
    assert q["marks"] in [1, 2]
    assert "question" in q and len(q["question"]) > 5
    assert "solution" in q and len(q["solution"]) > 5
    assert "difficulty" in q and q["difficulty"] in ["Easy", "Moderate", "Hard"]
    assert "source" in q and len(q["source"]) > 3

    # KaTeX check: balanced $ delimiters
    qtext = q["question"] + " " + q["solution"]
    dollar_count = qtext.count("$")
    assert dollar_count % 2 == 0, f"Unbalanced $ in question {q['id']}: count={dollar_count}"

    if q["type"] == "MCQ":
        assert "options" in q and isinstance(q["options"], dict)
        assert set(q["options"].keys()) == {"A", "B", "C", "D"}, f"Invalid MCQ options: {q['id']}"
        assert q.get("correct_answer") in ["A", "B", "C", "D"], f"Invalid MCQ answer: {q['id']}"
        assert q["negative_marks"] in [0.33, 0.67], f"Invalid MCQ negative marks: {q['negative_marks']}"
    elif q["type"] == "MSQ":
        assert "options" in q and isinstance(q["options"], dict)
        assert "A" in q["options"] and "B" in q["options"]
        assert q["negative_marks"] == 0.0
        ans = q.get("correct_answer", "")
        opts = [x.strip() for x in ans.split(",")]
        for opt in opts:
            assert opt in q["options"], f"Invalid MSQ option '{opt}' in {q['id']}"
    elif q["type"] == "NAT":
        assert q["negative_marks"] == 0.0
        assert "answer" in q and (isinstance(q["answer"], (int, float))), f"Invalid NAT answer: {q['id']}"
        assert "answer_range" in q and isinstance(q["answer_range"], list) and len(q["answer_range"]) == 2
        mn, mx = q["answer_range"]
        assert mn <= q["answer"] <= mx or mn <= round(q["answer"], 2) <= mx, f"Answer not in range for {q['id']}: {q['answer']} not in [{mn}, {mx}]"

def main():
    print("=== STARTING MASTER INGESTION & SUBTOPIC DEPTH BALANCING ===")
    
    generators = {
        1: generate_sec1_fillers,
        2: generate_sec2_fillers,
        3: generate_sec3_fillers,
        4: generate_sec4_fillers,
        5: generate_sec5_fillers,
        6: generate_sec6_fillers,
        7: generate_sec7_fillers,
        8: generate_sec8_fillers
    }

    all_existing_ids = set()
    existing_by_sec = {}
    for sec_num, fpath in SEC_FILES.items():
        data = load_section_file(fpath)
        existing_by_sec[sec_num] = data
        for q in data:
            all_existing_ids.add(q["id"])

    print(f"Loaded {len(all_existing_ids)} existing questions across 8 sections.")

    total_added = 0
    new_by_sec = {}

    for sec_num in range(1, 9):
        gen_fn = generators[sec_num]
        new_qs = gen_fn()
        print(f"Section {sec_num}: generated {len(new_qs)} questions.")

        for q in new_qs:
            validate_question(q, all_existing_ids)
            all_existing_ids.add(q["id"])

        new_by_sec[sec_num] = new_qs
        total_added += len(new_qs)

    print(f"\nTotal new questions validated: {total_added}")
    assert total_added == 1552, f"Expected 1552 questions, got {total_added}"

    # Merge and save
    grand_total_qs = []
    print("\nMerging and writing to disk...")
    for sec_num, fpath in SEC_FILES.items():
        merged = existing_by_sec[sec_num] + new_by_sec[sec_num]
        save_section_file(fpath, merged)
        print(f"  Sec {sec_num}: {len(existing_by_sec[sec_num])} -> {len(merged)} questions ({fpath})")
        grand_total_qs.extend(merged)

    print(f"\nTotal questions in merged question bank: {len(grand_total_qs)}")
    assert len(grand_total_qs) == 8297, f"Expected 8297 total questions, got {len(grand_total_qs)}"

    # Audit all subtopics
    subtopic_counts = Counter()
    for q in grand_total_qs:
        subtopic_counts[(q["section"], q["topic"], q["subtopic"])] += 1

    low_subs = [(k, v) for k, v in subtopic_counts.items() if v < 15]
    print(f"\nFinal Audit: Subtopics with < 15 questions: {len(low_subs)}")
    if low_subs:
        for k, v in low_subs[:10]:
            print(f"  FAILED: {k}: {v} Qs")
        raise RuntimeError("Subtopics under 15 questions still remain!")

    print(f"SUCCESS: ALL {len(subtopic_counts)} subtopics have at least 15 questions!")
    min_c = min(subtopic_counts.values())
    max_c = max(subtopic_counts.values())
    avg_c = sum(subtopic_counts.values()) / len(subtopic_counts)
    print(f"Subtopic counts summary: Min = {min_c}, Max = {max_c}, Avg = {avg_c:.1f}")

if __name__ == "__main__":
    main()
