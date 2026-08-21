import os, sys, json, re, pypdf

def extract_pdf_keys(pdf_path):
    reader = pypdf.PdfReader(pdf_path)
    text = '\n'.join([p.extract_text() for p in reader.pages])
    
    key_map = {}
    # Matches patterns like: "1 4 MCQ GA C 1" or "11 5 MCQ AG 73.70 to 73.85 1" or "21 5 MSQ AG B;D 1"
    # or "1 1 MCQ GA A 1"
    lines = text.split('\n')
    for l in lines:
        l_strip = l.strip()
        # Regex to capture Q.No, Question Type, Section, Key/Range
        m = re.search(r'^\b(\d+)\b.*?\b(MCQ|MSQ|NAT)\b.*?\b(GA|AG)\b\s+(.*?)\s+\d+$', l_strip)
        if m:
            qnum = int(m.group(1))
            qtype = m.group(2)
            sec = m.group(3)
            key = m.group(4).strip()
            key_map[qnum] = (key, qtype)
        else:
            # Fallback regex for lines where session/qnum is split
            m2 = re.search(r'^(\d+)\s+.*?\s+(MCQ|MSQ|NAT)\s+(GA|AG)\s+(.*?)\s+(\d+|\d+\.\d+)$', l_strip)
            if m2:
                qnum = int(m2.group(1))
                key = m2.group(4).strip()
                qtype = m2.group(2)
                key_map[qnum] = (key, qtype)

    return key_map

def apply_all_official_keys():
    ak_dir = 'QUESTIONS/PAST YEAR /ANSWER KEY'
    
    pdf_key_data = {}
    for f in os.listdir(ak_dir):
        if f.endswith('.pdf'):
            yr = None
            if '2023' in f or '2023' in f.lower():
                yr = '2023'
            elif '2022' in f or '2022' in f.lower():
                yr = '2022'
            elif '2021' in f or '2021' in f.lower():
                yr = '2021'
            elif '2024' in f or 'keys' in f.lower():
                yr = '2024'
            elif 'final' in f.lower() or '2025' in f.lower():
                yr = '2025'

            if yr:
                path = os.path.join(ak_dir, f)
                kmap = extract_pdf_keys(path)
                if kmap:
                    pdf_key_data[yr] = kmap
                    print(f"Extracted {len(kmap)} official keys for GATE {yr} from {f}!")

    with open('src/data/mock_papers.json') as f:
        papers = json.load(f)

    updated_count = 0
    for p in papers:
        yr = p['year']
        if yr in pdf_key_data:
            kmap = pdf_key_data[yr]
            for q in p['questions']:
                qnum = q['qnum']
                if qnum in kmap:
                    official_key, official_type = kmap[qnum]
                    q['correct_answer'] = official_key
                    if official_type in ['MCQ', 'MSQ', 'NAT']:
                        q['type'] = official_type
                    updated_count += 1

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

    print(f"Successfully updated {updated_count} question answer keys directly from Official GATE Master Answer Key PDFs!")

if __name__ == '__main__':
    apply_all_official_keys()
