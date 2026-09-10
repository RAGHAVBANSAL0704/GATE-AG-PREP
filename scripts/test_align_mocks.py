import json, glob, re
from collections import defaultdict, Counter

with open('src/data/official_syllabus.json') as f:
    syllabus = json.load(f)

# Build map of section -> valid topics
official_section_topics = {}
for sec in syllabus:
    official_section_topics[sec['full_title']] = [t['topic_name'] for t in sec['topics']]

print("Official Sections and Topics loaded.")
