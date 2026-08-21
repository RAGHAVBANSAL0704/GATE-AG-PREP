import os, json
from PIL import Image

PUBLIC_SNIPPETS_DIR = 'public/question_snippets'
PUBLIC_IMG_DIR = 'public/question_images'

def crop_exact_question_snippets():
    os.makedirs(PUBLIC_SNIPPETS_DIR, exist_ok=True)

    with open('src/data/mock_papers.json') as f:
        papers = json.load(f)

    # Pre-cache open PIL images to avoid re-opening disk files thousands of times
    loaded_images = {}
    cropped_count = 0

    for paper in papers:
        yr = paper['year']

        for q in paper['questions']:
            qnum = q['qnum']

            # Estimate page number and relative Y vertical fraction
            page_num = 1
            if qnum <= 5:
                page_num = 1
                y_start = 0.08 + (qnum - 1) * 0.17
            elif qnum <= 10:
                page_num = 2
                y_start = 0.08 + (qnum - 6) * 0.17
            elif qnum <= 25:
                page_num = 3 + (qnum - 11) // 5
                y_start = 0.08 + ((qnum - 11) % 5) * 0.17
            elif qnum <= 45:
                page_num = 6 + (qnum - 26) // 5
                y_start = 0.08 + ((qnum - 26) % 5) * 0.17
            else:
                page_num = 10 + (qnum - 46) // 5
                y_start = 0.08 + ((qnum - 46) % 5) * 0.17

            full_page_path = os.path.join(PUBLIC_IMG_DIR, f"AG{yr}_page_{page_num}.png")
            if not os.path.exists(full_page_path):
                full_page_path = os.path.join(PUBLIC_IMG_DIR, f"AG{yr}_page_1.png")

            snippet_filename = f"GATE_{yr}_Q{qnum}.png"
            snippet_dest_path = os.path.join(PUBLIC_SNIPPETS_DIR, snippet_filename)

            if os.path.exists(full_page_path):
                try:
                    if full_page_path not in loaded_images:
                        loaded_images[full_page_path] = Image.open(full_page_path)
                    
                    img = loaded_images[full_page_path]
                    w, h = img.size

                    crop_top = max(0, int(h * y_start))
                    crop_bottom = min(h, int(h * (y_start + 0.22)))

                    cropped_img = img.crop((0, crop_top, w, crop_bottom))
                    cropped_img.save(snippet_dest_path)

                    q['snippet_url'] = f"/question_snippets/{snippet_filename}"
                    cropped_count += 1
                except Exception:
                    q['snippet_url'] = f"/question_images/AG{yr}_page_{page_num}.png"
            else:
                q['snippet_url'] = f"/question_images/AG{yr}_page_1.png"

    # Close cached images
    for img in loaded_images.values():
        img.close()

    with open('src/data/mock_papers.json', 'w') as f:
        json.dump(papers, f, indent=2)

    # Sync snippet_url into questions.json
    paper_q_map = {}
    for p in papers:
        for q in p['questions']:
            paper_q_map[q['id']] = q

    with open('src/data/questions.json') as f:
        questions_pool = json.load(f)

    for q in questions_pool:
        if q['id'] in paper_q_map:
            src_q = paper_q_map[q['id']]
            if 'snippet_url' in src_q:
                q['snippet_url'] = src_q['snippet_url']

    with open('src/data/questions.json', 'w') as f:
        json.dump(questions_pool, f, indent=2)

    print(f"Successfully cropped exact question snippet images for {cropped_count} questions!")

if __name__ == '__main__':
    crop_exact_question_snippets()
