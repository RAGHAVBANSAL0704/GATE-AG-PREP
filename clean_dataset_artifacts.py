import json, re, os

def clean_text(text):
    if not text:
        return ''
    # Remove page markers
    text = re.sub(r'--- Page \d+ ---', '', text)
    # Remove Question Type : MCQ/MSQ/NAT banners
    text = re.sub(r'Question Type\s*:\s*(MCQ|MSQ|NAT)', '', text, flags=re.IGNORECASE)
    text = re.sub(r'Options shown in green color.*?\n', '', text, flags=re.IGNORECASE)
    text = re.sub(r'Options\s*:\s*', '', text, flags=re.IGNORECASE)
    text = re.sub(r'END OF THE QUESTION PAPER.*', '', text, flags=re.IGNORECASE)
    text = re.sub(r'Paper Question\s+no\..*', '', text, flags=re.IGNORECASE)
    text = re.sub(r'Graduate Aptitude Test in Engineering.*?\n', '', text, flags=re.IGNORECASE)
    text = re.sub(r'Organizing Institute:.*?\n', '', text, flags=re.IGNORECASE)
    text = re.sub(r'Agricultural Engineering \(AG\)', '', text, flags=re.IGNORECASE)
    text = re.sub(r'General Aptitude\s*\(GA\)', '', text, flags=re.IGNORECASE)
    text = re.sub(r'General Aptitude', '', text, flags=re.IGNORECASE)
    text = re.sub(r'Q\.\d+\s*[\–\-–]\s*Q\.\d+\s+Carry\s+.*?\s+Each', '', text, flags=re.IGNORECASE)
    text = re.sub(r'Q\.\d+\s*[\–\-–]\s*Q\.\d+\s+Carry\s+.*?\s+each\.', '', text, flags=re.IGNORECASE)
    text = re.sub(r'More than one answer bubbled.*?\n', '', text, flags=re.IGNORECASE)
    text = re.sub(r'Unattempted questions will not.*?\n', '', text, flags=re.IGNORECASE)

    # Word spacing fixes for OCR concatenated strings
    text = re.sub(r'Matchthefollowing', 'Match the following: ', text)
    text = re.sub(r'Wastevalve', 'Waste valve', text)
    text = re.sub(r'Centrifugalpump', 'Centrifugal pump', text)
    text = re.sub(r'Reciprocatingpump', 'Reciprocating pump', text)
    text = re.sub(r'Hydraulicram', 'Hydraulic ram', text)
    text = re.sub(r'Nozzleandventuri', 'Nozzle and venturi', text)
    text = re.sub(r'Footvalve', 'Foot valve', text)
    text = re.sub(r'Jetpump', 'Jet pump', text)
    text = re.sub(r'thefollowing', 'the following', text)

    # Clean multiple blank lines
    text = re.sub(r'\n\s*\n+', '\n', text)
    return text.strip()

def process_questions_list(q_list):
    for q in q_list:
        q['question'] = clean_text(q['question'])
        if q.get('options'):
            cleaned_opts = {}
            for k, v in q['options'].items():
                cv = clean_text(v)
                if cv:
                    cleaned_opts[k] = cv
            q['options'] = cleaned_opts

if __name__ == '__main__':
    with open('src/data/mock_papers.json') as f:
        papers = json.load(f)

    for p in papers:
        process_questions_list(p['questions'])

    with open('src/data/mock_papers.json', 'w') as f:
        json.dump(papers, f, indent=2)

    with open('src/data/questions.json') as f:
        questions = json.load(f)

    process_questions_list(questions)

    with open('src/data/questions.json', 'w') as f:
        json.dump(questions, f, indent=2)

    print('Successfully cleaned datasets!')
