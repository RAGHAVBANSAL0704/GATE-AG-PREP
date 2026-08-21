import os, sys, json, re, subprocess

RENDER_BIN = '/Users/raghav/.gemini/antigravity/brain/009cf6c0-346f-4051-a897-36f8561e0181/scratch/render_pdf_bin'
OCR_BIN = '/Users/raghav/.gemini/antigravity/brain/009cf6c0-346f-4051-a897-36f8561e0181/scratch/ocr_bin'

PUBLIC_IMG_DIR = 'public/question_images'

def extract_and_attach_images():
    os.makedirs(PUBLIC_IMG_DIR, exist_ok=True)
    qp_dir = 'QUESTIONS/PAST YEAR /QUESTION PAPERS'
    
    with open('src/data/mock_papers.json') as f:
        papers = json.load(f)

    with open('src/data/questions.json') as f:
        questions_pool = json.load(f)

    # 1. Render all 20 PDF papers to PNG pages
    for yr_num in range(2007, 2027):
        yr = str(yr_num)
        pdf_path = None
        for f in os.listdir(qp_dir):
            if yr in f and f.endswith('.pdf'):
                pdf_path = os.path.join(qp_dir, f)
                break

        if not pdf_path or not os.path.exists(pdf_path):
            continue

        pdf_name = f"AG{yr}"
        sample_img = os.path.join(PUBLIC_IMG_DIR, f"{pdf_name}_page_1.png")
        if not os.path.exists(sample_img):
            print(f"Rendering PDF pages for GATE {yr}...", flush=True)
            res = subprocess.run([RENDER_BIN, pdf_path, PUBLIC_IMG_DIR], capture_output=True, text=True)
            print(f"  -> {res.stdout.strip()}", flush=True)

    # 2. Attach images and fix missing texts in mock_papers.json
    diagram_words = ['figure', 'diagram', 'chart', 'graph', 'shown in', 'refer to', 'circuit', 'flowchart', 'plot', 'spatial', 'shaded region', 'triangle', 'circle', 'square', 'table', 'pie', 'histogram']

    fixed_img_count = 0

    for paper in papers:
        yr = paper['year']
        pdf_name = f"AG{yr}"

        for q in paper['questions']:
            qnum = q['qnum']
            qtext = q['question']
            qtext_lower = qtext.lower()

            # If fallback text or diagram keyword present
            needs_img = False
            if 'refer to question text' in qtext_lower or any(w in qtext_lower for w in diagram_words):
                needs_img = True

            if needs_img:
                # Estimate page number: Q1-Q10 ~ Page 1-3, Q11-Q35 ~ Page 4-7, Q36-Q65 ~ Page 8-14
                page_num = 1
                if qnum <= 5:
                    page_num = 1
                elif qnum <= 10:
                    page_num = 2
                elif qnum <= 20:
                    page_num = 3 + (qnum - 10) // 5
                elif qnum <= 35:
                    page_num = 5 + (qnum - 20) // 5
                elif qnum <= 50:
                    page_num = 8 + (qnum - 35) // 4
                else:
                    page_num = 12 + (qnum - 50) // 4

                img_rel = f"/question_images/{pdf_name}_page_{page_num}.png"
                img_full = os.path.join('public', 'question_images', f"{pdf_name}_page_{page_num}.png")

                if os.path.exists(img_full):
                    q['image_url'] = img_rel
                    fixed_img_count += 1

                # If text was generic fallback, run OCR on the rendered page image to get actual question text
                if 'refer to question text' in qtext_lower and os.path.exists(img_full):
                    ocr_res = subprocess.run([OCR_BIN, img_full], capture_output=True, text=True)
                    ocr_text = ocr_res.stdout.strip()
                    if len(ocr_text) > 30:
                        q['question'] = f"GATE {yr} Question {qnum} (Refer to page diagram below):\n{ocr_text[:600]}"

    with open('src/data/mock_papers.json', 'w') as f:
        json.dump(papers, f, indent=2)

    # 3. Update questions.json pool with image URLs
    paper_q_map = {}
    for p in papers:
        for q in p['questions']:
            paper_q_map[q['id']] = q

    for q in questions_pool:
        if q['id'] in paper_q_map:
            src_q = paper_q_map[q['id']]
            q['question'] = src_q['question']
            if 'image_url' in src_q:
                q['image_url'] = src_q['image_url']

    with open('src/data/questions.json', 'w') as f:
        json.dump(questions_pool, f, indent=2)

    print(f"Successfully attached diagram/chart page images to {fixed_img_count} questions in mock_papers.json and questions.json!", flush=True)

if __name__ == '__main__':
    extract_and_attach_images()
