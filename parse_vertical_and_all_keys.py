import os, sys, json, re, pypdf

def parse_vertical_ag_keys(pdf_path):
    reader = pypdf.PdfReader(pdf_path)
    text = '\n'.join([p.extract_text() for p in reader.pages])
    lines = [l.strip() for l in text.split('\n') if l.strip()]

    key_map = {}
    i = 0
    while i < len(lines) - 5:
        # Check if line is a question number 1..65
        if lines[i].isdigit() and 1 <= int(lines[i]) <= 65:
            qnum = int(lines[i])
            # Check if next tokens match Session (1/2/3/4/5/6), Q.Type (MCQ/MSQ/NAT), Section (GA/AG)
            if i + 4 < len(lines):
                sess = lines[i+1]
                qtype = lines[i+2]
                sec = lines[i+3]
                key = lines[i+4]
                if qtype in ['MCQ', 'MSQ', 'NAT'] and sec in ['GA', 'AG']:
                    key_map[qnum] = (key, qtype)
                    i += 5
                    continue
        i += 1

    return key_map

def apply_all_vertical_keys():
    k2024 = parse_vertical_ag_keys('QUESTIONS/PAST YEAR /ANSWER KEY/AG_Keys.pdf')
    print(f"Parsed {len(k2024)} official keys for GATE 2024 from AG_Keys.pdf!")

    with open('src/data/mock_papers.json') as f:
        papers = json.load(f)

    for p in papers:
        if p['year'] == '2024':
            for q in p['questions']:
                qnum = q['qnum']
                if qnum in k2024:
                    q['correct_answer'] = k2024[qnum][0]
                    q['type'] = k2024[qnum][1]

    with open('src/data/mock_papers.json', 'w') as f:
        json.dump(papers, f, indent=2)

    # Sync to questions.json
    paper_q_map = {}
    for p in papers:
        for q in p['questions']:
            paper_q_map[q['id']] = q

    with open('src/data/questions.json') as f:
        questions_pool = json.load(f)

    for q in questions_pool:
        if q['id'] in paper_q_map:
            src_q = paper_q_map[q['id']]
            q['correct_answer'] = src_q['correct_answer']
            q['type'] = src_q['type']

    with open('src/data/questions.json', 'w') as f:
        json.dump(questions_pool, f, indent=2)

    print("Successfully updated GATE 2024 answer keys directly from Official GATE 2024 Master Answer Key PDF!")

if __name__ == '__main__':
    apply_all_vertical_keys()
