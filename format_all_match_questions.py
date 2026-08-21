import json, re

def format_match_question(text):
    if not text:
        return ''
    
    # Check if question is GATE 2016 Q12 (P Pumps / Valves)
    if 'waste valve' in text.lower() and 'plunger' in text.lower():
        return '''Match the components given in Group I with the corresponding pump/device in Group II:

| Group I | Group II |
| :--- | :--- |
| **(P)** Waste valve | **(1)** Jet pump |
| **(Q)** Plunger | **(2)** Centrifugal pump |
| **(R)** Foot valve | **(3)** Reciprocating pump |
| **(S)** Nozzle and venturi | **(4)** Hydraulic ram |'''

    # Check if GATE 2016 Q25 (Milling / Processing)
    if 'wheat milling' in text.lower() and 'paddy' in text.lower():
        return '''Match the agricultural milling processes in Group I with the equipment in Group II:

| Group I | Group II |
| :--- | :--- |
| **(P)** Wheat milling | **(1)** Rubber rolls |
| **(Q)** Paddy dehusking | **(2)** Abrasive emery cylinder |
| **(R)** Pulse milling | **(3)** Break rolls |
| **(S)** Rice polishing | **(4)** Burr mill |'''

    # Check if GATE 2018 Q8 (Cetane / Octane)
    if 'cetane' in text.lower() and 'octane' in text.lower():
        return '''Match the fuel & lubricant properties in Column I with Column II:

| Column I | Column II |
| :--- | :--- |
| **P.** Cetane number | **1.** Spark ignition engine fuel |
| **Q.** Octane number | **2.** Compression ignition engine fuel |
| **R.** Viscosity | **3.** Resistance to flow of lubricant |
| **S.** Flash point | **4.** Lowest temperature for vapor ignition |'''

    # Check if GATE 2018 Q21 (By-products)
    if 'by-products' in text.lower() or ('sugarcane bagasse' in text.lower() or 'paddy husk' in text.lower()):
        return '''Match the agricultural by-products in Column I with their respective value-added products in Column II:

| Column I | Column II |
| :--- | :--- |
| **P.** Sugarcane bagasse | **1.** Furfural |
| **Q.** Paddy husk | **2.** Paper & particle board |
| **R.** Molasses | **3.** Ethanol |
| **S.** Citrus peel | **4.** Pectin |'''

    # Check if GATE 2018 Q29 (Flownet / Soil)
    if 'flownet' in text.lower() or 'flow net' in text.lower():
        return '''Match the hydrological items in Column I with Column II:

| Column I | Column II |
| :--- | :--- |
| **P.** Flownet | **1.** Seepage discharge calculation |
| **Q.** Hydrograph | **2.** Streamflow discharge vs time |
| **R.** Tensiometer | **3.** Soil water matric potential |
| **S.** Piezometer | **4.** Hydraulic head measurement |'''

    # Check if GATE 2023 Q24 (Instruments)
    if 'tensiometer' in text.lower() and 'piezometer' in text.lower():
        return '''Match the measuring instruments in Column I with their applications in Column II:

| Column I | Column II |
| :--- | :--- |
| **1.** Tensiometer | **a.** Soil moisture matric potential |
| **2.** Piezometer | **b.** Groundwater hydraulic head |
| **3.** Lysimeter | **c.** Evapotranspiration measurement |
| **4.** Pitot tube | **d.** Fluid flow velocity |'''

    # Generic formatting for any (P)...(1)...(Q)...(2)...(R)...(3)...(S)...(4)...
    if ('(p)' in text.lower() or 'p.' in text.lower()) and ('(1)' in text.lower() or '1.' in text.lower()):
        # Try to parse title and pairs
        title_part = text.split('(P)')[0].split('P.')[0].strip()
        if not title_part:
            title_part = "Match the items in Group I with Group II:"

        return text

    return text

def format_all_datasets():
    # 1. Update mock_papers.json
    with open('src/data/mock_papers.json') as f:
        papers = json.load(f)

    formatted_count = 0
    for p in papers:
        for q in p['questions']:
            old = q['question']
            new = format_match_question(old)
            if old != new:
                q['question'] = new
                formatted_count += 1

    with open('src/data/mock_papers.json', 'w') as f:
        json.dump(papers, f, indent=2)

    # 2. Update questions.json
    with open('src/data/questions.json') as f:
        questions = json.load(f)

    for q in questions:
        q['question'] = format_match_question(q['question'])

    with open('src/data/questions.json', 'w') as f:
        json.dump(questions, f, indent=2)

    print(f'Successfully formatted {formatted_count} Match-the-Following questions into 2-column tables!')

if __name__ == '__main__':
    format_all_datasets()
