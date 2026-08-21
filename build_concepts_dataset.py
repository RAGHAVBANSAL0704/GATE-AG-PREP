import os
import re
import json
import shutil
import docx

CONCEPTS_DIR = 'CONCEPTS'
PUBLIC_DOWNLOADS_CONCEPTS = 'public/downloads/concepts'
OUT_JSON = 'src/data/concepts.json'

SECTION_MAP = {
    '1_engineering_mathematics': 'Engineering Mathematics',
    '2_farm_machinery_and_power': 'Farm Power and Machinery',
    '3_soil_and_water_conservation': 'Soil and Water Conservation Engineering',
    '4_agricultural_process_engineering': 'Agricultural Process Engineering',
    '5_general_aptitude': 'General Aptitude'
}

def parse_docx_concept(file_path, default_section, relative_path):
    doc = docx.Document(file_path)

    paragraphs = [p.text.strip() for p in doc.paragraphs if p.text.strip()]
    
    title = ""
    section = default_section
    topic = "General Concepts"
    importance = "High"

    if paragraphs:
        title = paragraphs[0].replace('#', '').strip()

    if not title:
        title = os.path.basename(file_path).replace('.docx', '').replace('_', ' ').title()

    full_text = "\n\n".join(paragraphs)

    for p in paragraphs:
        if p.startswith('Section:'):
            section = p.split('Section:', 1)[1].strip()
        elif p.startswith('Topic:'):
            topic = p.split('Topic:', 1)[1].strip()
        elif p.startswith('Importance:'):
            importance = p.split('Importance:', 1)[1].strip()

    # Extract formulas
    formulas = re.findall(r'\$\$(.*?)\$\$', full_text, re.DOTALL)
    if not formulas:
        # Fallback extract equation lines containing '='
        for p in paragraphs:
            if '=' in p and len(p) < 100 and not p.startswith('Section') and not p.startswith('Topic'):
                formulas.append(p)

    formulas = [f.strip() for f in formulas if f.strip()]

    # Extract key takeaways
    takeaways = []
    for p in paragraphs:
        if p.startswith('- ') or p.startswith('• ') or re.match(r'^\d+\.', p):
            cleaned_p = re.sub(r'^[•\-\d\.]+\s*', '', p).strip()
            if cleaned_p and len(cleaned_p) > 10:
                takeaways.append(cleaned_p)

    concept_id = f"CONCEPT_DOCX_{os.path.basename(file_path).replace('.docx', '').upper()}"

    # Sync file to public/downloads/concepts/
    dest_dir = os.path.join(PUBLIC_DOWNLOADS_CONCEPTS, os.path.dirname(relative_path))
    os.makedirs(dest_dir, exist_ok=True)
    dest_file = os.path.join(PUBLIC_DOWNLOADS_CONCEPTS, relative_path)
    shutil.copy2(file_path, dest_file)

    docx_url = f"/downloads/concepts/{relative_path}"

    return {
        "id": concept_id,
        "title": title,
        "section": section,
        "topic": topic,
        "importance": importance,
        "content": full_text,
        "formulas": formulas,
        "takeaways": takeaways[:3],
        "file_path": file_path,
        "docx_url": docx_url,
        "has_docx": True
    }

def parse_md_concept(file_path, default_section):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    lines = content.split('\n')
    title = ""
    section = default_section
    topic = "General Concepts"
    importance = "High"

    for line in lines:
        if line.startswith('# '):
            title = line.replace('# ', '').strip()
            break

    if not title:
        title = os.path.basename(file_path).replace('.md', '').replace('_', ' ').title()

    for line in lines:
        if line.startswith('Section:'):
            section = line.split('Section:', 1)[1].strip()
        elif line.startswith('Topic:'):
            topic = line.split('Topic:', 1)[1].strip()
        elif line.startswith('Importance:'):
            importance = line.split('Importance:', 1)[1].strip()

    formulas = re.findall(r'\$\$(.*?)\$\$', content, re.DOTALL)
    formulas = [f.strip() for f in formulas if f.strip()]

    takeaways = []
    m_takeaways = re.search(r'## Key Takeaways.*?\n(.*?)(?=\n## |$)', content, re.DOTALL)
    if m_takeaways:
        raw_t = m_takeaways.group(1).strip()
        for t_line in raw_t.split('\n'):
            t_line_s = re.sub(r'^\d+\.\s*|^-\s*|^\*\s*', '', t_line.strip()).strip()
            if t_line_s:
                takeaways.append(t_line_s)

    concept_id = f"CONCEPT_{os.path.basename(file_path).replace('.md', '').upper()}"

    return {
        "id": concept_id,
        "title": title,
        "section": section,
        "topic": topic,
        "importance": importance,
        "content": content,
        "formulas": formulas,
        "takeaways": takeaways,
        "file_path": file_path,
        "docx_url": None,
        "has_docx": False
    }

def main():
    os.makedirs(PUBLIC_DOWNLOADS_CONCEPTS, exist_ok=True)
    concepts = []

    if os.path.exists(CONCEPTS_DIR):
        for root, dirs, files in os.walk(CONCEPTS_DIR):
            folder_name = os.path.basename(root).lower()
            def_sec = SECTION_MAP.get(folder_name, "General Aptitude")

            for fn in sorted(files):
                if fn.startswith('.'):
                    continue
                fp = os.path.join(root, fn)
                rel_p = os.path.relpath(fp, CONCEPTS_DIR)

                if fn.endswith('.docx'):
                    try:
                        c_obj = parse_docx_concept(fp, def_sec, rel_p)
                        concepts.append(c_obj)
                        print(f"Parsed DOCX concept: {c_obj['title']} ({c_obj['section']})")
                    except Exception as e:
                        print(f"Error parsing DOCX {fp}: {e}")
                elif fn.endswith('.md') or fn.endswith('.txt'):
                    try:
                        c_obj = parse_md_concept(fp, def_sec)
                        concepts.append(c_obj)
                        print(f"Parsed MD concept: {c_obj['title']} ({c_obj['section']})")
                    except Exception as e:
                        print(f"Error parsing MD {fp}: {e}")

    os.makedirs(os.path.dirname(OUT_JSON), exist_ok=True)
    with open(OUT_JSON, 'w', encoding='utf-8') as f:
        json.dump(concepts, f, indent=2, ensure_ascii=False)

    print(f"Successfully compiled {len(concepts)} concepts into {OUT_JSON}")

if __name__ == '__main__':
    main()
