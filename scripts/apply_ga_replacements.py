import json
import re

BANNED_GA_TERMS = [
    'tractor', 'tillage', 'plow', 'plough', 'seed drill', 'combine harvester', 'harvester',
    'paddy', 'thresher', 'implement', 'wheat', 'crop', 'bio-fertilizer', 'fertiliz', 'soil',
    'watershed', 'runoff', 'irrigation', 'drainage', 'sprayer', 'evapotranspiration',
    'hydraulic pump', 'pasteuriz', 'darcy', 'viscosity index', 'field capacity', 'wilting point',
    'grain combine', 'planter', 'mower', 'rotavator', 'subsoiler', 'bund', 'check basin',
    'furrow', 'sprinkler nozzle', 'parshall flume', 'psychrometric', 'rheology', 'milling'
]

def is_flagged(q):
    text = (q.get('question', '') + ' ' + q.get('topic', '') + ' ' + q.get('solution', '')).lower()
    for term in BANNED_GA_TERMS:
        if re.search(r'\b' + re.escape(term) + r'\b', text):
            if term == 'implement' and ('word meaning' in text or 'guidelines : implement' in text or 'action' in text):
                continue
            return True
    return False

with open('src/data/curated_ga_replacement_bank.json') as f:
    bank = json.load(f)

one_mark_pool = bank['one_mark']
two_mark_pool = bank['two_mark']

one_idx = 0
two_idx = 0
replaced_total = 0

for i in range(1, 51):
    fname = f'src/data/custom_mock_2027_{i:02d}.json'
    with open(fname) as f:
        data = json.load(f)
    
    mock_replaced = 0
    for q in data['questions'][:10]:
        if is_flagged(q):
            marks = q.get('marks', 1)
            orig_id = q.get('id')
            orig_qnum = q.get('qnum')

            if marks == 1:
                rep = one_mark_pool[one_idx]
                one_idx += 1
            else:
                rep = two_mark_pool[two_idx]
                two_idx += 1

            # Update question in place while preserving ID and qnum
            q['question'] = rep['question']
            q['options'] = rep['options']
            q['correct_answer'] = rep['correct_answer']
            q['solution'] = rep['solution']
            q['section'] = 'General Aptitude'
            q['topic'] = rep['topic']
            q['subtopic'] = rep['subtopic']
            q['type'] = 'MCQ'
            q['marks'] = marks
            q['qnum'] = orig_qnum
            q['id'] = orig_id

            mock_replaced += 1
            replaced_total += 1

    with open(fname, 'w') as f:
        json.dump(data, f, indent=2)

    if mock_replaced > 0:
        print(f"Mock {i:02d}: Replaced {mock_replaced} technical GA questions")

print(f"\nCompleted! Replaced a total of {replaced_total} questions across 50 mocks.")
print(f"Pool consumption: 1M={one_idx}/{len(one_mark_pool)}, 2M={two_idx}/{len(two_mark_pool)}")
