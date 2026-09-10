import json
import os
import glob
import re

# Comprehensive list of agricultural / technical engineering terms that must NEVER appear in General Aptitude
BANNED_GA_TERMS = [
    'tractor', 'tillage', 'plow', 'plough', 'seed drill', 'combine harvester', 'harvester',
    'paddy', 'thresher', 'implement', 'draft requirement', 'wheat production', 'crop yield',
    'bio-fertilizer', 'fertiliz', 'soil', 'watershed', 'runoff', 'irrigation', 'drainage',
    'sprayer', 'evapotranspiration', 'hydraulic pump', 'pasteuriz', 'darcy', 'viscosity index',
    'field capacity', 'wilting point', 'grain combine', 'planter', 'mower', 'rotavator',
    'subsoiler', 'bund', 'check basin', 'furrow', 'sprinkler nozzle', 'parshall flume',
    'psychrometric', 'rheology', 'milling efficiency', 'scooter'
]

def is_technical_or_irrelevant(q):
    text = (q.get('question', '') + ' ' + q.get('topic', '') + ' ' + q.get('solution', '')).lower()
    # Check if any banned keyword is present
    for term in BANNED_GA_TERMS:
        if re.search(r'\b' + re.escape(term) + r'\b', text):
            # Special exemption: English words like "implement" used as a verb in a verbal analogy
            if term == 'implement' and ('word meaning' in text or 'guidelines : implement' in text or 'action' in text):
                continue
            return True
    return False

print("Auditing General Aptitude across all 50 mocks...")
