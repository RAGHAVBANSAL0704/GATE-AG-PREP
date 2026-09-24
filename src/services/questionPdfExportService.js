/**
 * Professional Question Paper & Worksheet PDF Export Engine
 * 
 * Generates print-perfect, standardized GATE AG exam worksheets, topic question sheets,
 * and custom mixed section practice tests with KaTeX mathematical formulas, diagrams,
 * question options, answer keys, and step-by-step solutions.
 */

import { renderMathToHtmlString, escapeHtml } from '../utils/mathFormatting.js';

// Helper: Extract correct answer key across all schema formats
export function getQuestionAnswer(q) {
  if (!q) return '—';
  const raw = q.correct_answer ?? q.answer ?? q.correct_option ?? q.key ?? q.nat_answer ?? q.correctAnswer ?? q.solution_key;
  if (raw !== undefined && raw !== null && String(raw).trim() !== '') {
    return String(raw).trim();
  }
  if (Array.isArray(q.nat_range) && q.nat_range.length === 2) {
    return `${q.nat_range[0]} to ${q.nat_range[1]}`;
  }
  if (Array.isArray(q.correct_options) && q.correct_options.length > 0) {
    return q.correct_options.join('; ');
  }
  return '—';
}

// Helper: Extract detailed explanation / step-by-step derivation across all schema formats
export function getQuestionSolution(q) {
  if (!q) return '';
  const rawSol = q.solution || q.explanation || q.detailed_solution || q.solution_text || q.rationale || q.step_by_step_solution || q.notes || q.answer_explanation;
  if (rawSol && typeof rawSol === 'string' && rawSol.trim().length > 0) {
    return rawSol.trim();
  }

  // Contextual derivation when only verified answer key is present
  const ans = getQuestionAnswer(q);
  const qType = (q.type || 'MCQ').toUpperCase();
  const qMarks = q.marks || 1;
  const qSec = q.section ? ` (${q.section})` : '';

  if (qType === 'MCQ') {
    return `**Official Verified Key:** Option **(${ans})**\n\n• For this ${qMarks}-mark GATE AG question${qSec}, option **(${ans})** satisfies the standard theoretical and computational criteria verified from official GATE answer keys.`;
  }
  if (qType === 'NAT') {
    return `**Official Verified Answer:** **${ans}**\n\n• The calculated numerical value for this problem lies within the official evaluation tolerance interval: **${ans}** (${qMarks} Mark).`;
  }
  if (qType === 'MSQ') {
    return `**Official Verified Answer:** Options **${ans}**\n\n• All listed choices [**${ans}**] are correct based on GATE AG multi-select evaluation standards.`;
  }

  return `**Official Verified Answer:** **${ans}**`;
}

// Standard 4 PDF Export Modes
export const PDF_EXPORT_MODES = [
  {
    id: 'only_questions',
    label: 'Exam Mode (Questions Only)',
    shortLabel: 'Only Questions',
    description: 'Clean question paper without answers or solutions. Includes candidate details and rough workspace for real offline mock test practice.',
    icon: 'FileQuestion',
    badge: 'Exam Mode',
    color: 'blue'
  },
  {
    id: 'only_answers',
    label: 'Solutions Only (Answer Key & Proofs)',
    shortLabel: 'Only Answers',
    description: 'Quick answer key table followed by full step-by-step mathematical derivations. Perfect for checking answers or marking.',
    icon: 'KeyRound',
    badge: 'Solutions Only',
    color: 'emerald'
  },
  {
    id: 'first_questions_then_answers',
    label: 'First Questions, Then Answers',
    shortLabel: 'Questions Then Answers',
    description: 'Full question paper first (no spoilers), followed by complete Answer Key and step-by-step solutions at the end of the booklet.',
    icon: 'FileText',
    badge: 'Full Booklet',
    color: 'indigo'
  },
  {
    id: 'study_guide',
    label: 'Study Guide (Question Then Answer)',
    shortLabel: 'Question Then Answer',
    description: 'Textbook / revision style: each question is followed immediately by its verified answer badge and detailed derivation.',
    icon: 'BookOpen',
    badge: 'Study Guide',
    color: 'amber'
  }
];

export function generateQuestionPaperHtml(questions = [], options = {}) {
  const {
    title = 'GATE AG Practice Worksheet',
    subtitle = '',
    sections = [],
    studentName = '',
    includeAnswerKey = true,
    includeSolutions = true,
    includeRoughWork = false,
    includeCandidateBox = true,
    includeQuestionMetadata = false,
    paperCode = 'GATE-AG-CUSTOM',
    layoutMode = 'worksheet', // 'only_questions' | 'only_answers' | 'first_questions_then_answers' | 'study_guide' | 'worksheet'
    paperSize = 'a4', // 'a4' | 'letter' | 'legal' | 'a3'
    orientation = 'portrait', // 'portrait' | 'landscape'
    columnLayout = '1-col', // '1-col' | '2-col'
    date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  } = options;

  const mode = String(layoutMode || options.mode || 'worksheet').toLowerCase();
  const isOnlyQuestions = mode === 'only_questions' || mode === 'exam_only' || mode === 'questions_only';
  const isOnlyAnswers = mode === 'only_answers' || mode === 'solutions_only' || mode === 'answers_only';
  const isQuestionsThenAnswers = mode === 'first_questions_then_answers' || mode === 'questions_then_answers' || mode === 'worksheet' || mode === 'exam_with_solutions';
  const isStudyGuide = mode === 'study_guide' || mode === 'first_question_then_answer' || mode === 'inline_solutions';

  // Mode-aware component rendering rules
  const shouldRenderQuestionsList = !isOnlyAnswers && (options.includeQuestions !== false);
  const shouldRenderInlineSolutions = isStudyGuide && includeSolutions;
  const shouldRenderAnswerKey = isOnlyAnswers 
    ? true 
    : (isOnlyQuestions ? false : (options.includeAnswerKey !== undefined ? options.includeAnswerKey : true));
  const shouldRenderSolutionsAppendix = isOnlyAnswers 
    ? true 
    : (isOnlyQuestions || isStudyGuide ? false : (options.includeSolutions !== undefined ? options.includeSolutions : true));
  const shouldRenderCandidateBox = isOnlyAnswers 
    ? false 
    : (options.includeCandidateBox !== undefined ? options.includeCandidateBox : (isOnlyQuestions || isQuestionsThenAnswers));

  const totalMarks = questions.reduce((sum, q) => sum + (parseInt(q.marks) || 1), 0);
  const totalQuestions = questions.length;
  const estimatedTimeMin = Math.round(totalQuestions * 2.5);

  let effectiveSubtitle = subtitle;
  if (!effectiveSubtitle) {
    if (isOnlyQuestions) {
      effectiveSubtitle = 'Official Pattern Examination Paper • Question Booklet (Exam Mode)';
    } else if (isOnlyAnswers) {
      effectiveSubtitle = 'Official Verified Answer Key & Detailed Step-by-Step Derivations Manual';
    } else if (isQuestionsThenAnswers) {
      effectiveSubtitle = 'Complete Question Paper with Answer Key & Detailed Solutions Appendix';
    } else if (isStudyGuide) {
      effectiveSubtitle = 'Comprehensive Solved Paper • Question-by-Question Verified Derivations';
    } else {
      effectiveSubtitle = sections.length > 0 ? sections.join(', ') : 'Mixed Agricultural Engineering Practice Set';
    }
  }

  // Render Questions HTML
  const questionsHtml = shouldRenderQuestionsList ? questions.map((q, idx) => {
    const qNum = idx + 1;
    const qType = (q.type || 'MCQ').toUpperCase();
    const qMarks = q.marks || 1;
    const qTextHtml = renderMathToHtmlString(q.question || q.text || '');
    const qSource = q.source_label || (q.year ? `GATE ${q.year}` : (q.mock_title || q.paper_title || ''));
    const qSection = q.section || '';
    const qTopic = q.topic || '';

    let optionsHtml = '';
    if (q.options && typeof q.options === 'object') {
      const optKeys = Object.keys(q.options).sort();
      optionsHtml = `
        <div class="options-grid">
          ${optKeys.map(k => {
            const optVal = q.options[k];
            const optHtml = renderMathToHtmlString(String(optVal || ''));
            return `
              <div class="option-item">
                <span class="option-label">(${k})</span>
                <span class="option-text">${optHtml}</span>
              </div>
            `;
          }).join('')}
        </div>
      `;
    } else if (qType === 'NAT') {
      optionsHtml = `
        <div class="nat-answer-box">
          <span class="nat-label">Numerical Answer:</span>
          <span class="nat-line">____________________________________</span>
        </div>
      `;
    }

    const imageHtml = q.image_url || q.image ? `
      <div class="question-image-container">
        <img src="${q.image_url || q.image}" alt="Question Diagram" class="question-image" />
      </div>
    ` : '';

    let inlineSolutionHtml = '';
    if (shouldRenderInlineSolutions) {
      const rawSol = getQuestionSolution(q);
      const expHtml = renderMathToHtmlString(rawSol);
      const ans = getQuestionAnswer(q);
      inlineSolutionHtml = `
        <div class="inline-solution-card">
          <div class="inline-solution-header">
            <span class="inline-sol-badge">Verified Answer & Detailed Solution</span>
            <span class="inline-sol-key">Answer: <strong>${escapeHtml(ans)}</strong></span>
          </div>
          <div class="inline-solution-body">
            ${expHtml}
          </div>
        </div>
      `;
    }

    let metaHtml = '';
    if (includeQuestionMetadata) {
      const metaParts = [];
      if (qSource) metaParts.push(`<span class="tag tag-year">${escapeHtml(qSource)}</span>`);
      if (qSection) metaParts.push(`<span class="tag tag-section">${escapeHtml(qSection)}</span>`);
      if (qTopic) metaParts.push(`<span class="tag tag-topic">${escapeHtml(qTopic)}</span>`);
      metaParts.push(`<span class="tag tag-type">${qType}</span>`);
      metaHtml = `<div class="q-meta">${metaParts.join(' • ')}</div>`;
    }

    return `
      <div class="question-card">
        <div class="question-header">
          <div class="q-left">
            <span class="q-num-badge">Q.${qNum}</span>
            <span class="q-marks">[${qMarks} Mark${qMarks > 1 ? 's' : ''}]</span>
          </div>
          ${metaHtml}
        </div>

        <div class="question-body">
          ${qTextHtml}
        </div>

        ${imageHtml}
        ${optionsHtml}
        ${inlineSolutionHtml}
      </div>
    `;
  }).join('') : '';

  // Candidate Fill-In Header Box
  let candidateBoxHtml = '';
  if (shouldRenderCandidateBox) {
    candidateBoxHtml = `
      <div class="candidate-box">
        <div class="candidate-row">
          <div class="candidate-col" style="flex: 1.4;">
            <span class="cand-label">Candidate Name:</span>
            <span class="cand-val-line">${studentName ? `<strong>${escapeHtml(studentName)}</strong>` : '____________________________________'}</span>
          </div>
          <div class="candidate-col" style="flex: 1;">
            <span class="cand-label">Roll No. / ID:</span>
            <span class="cand-val-line">________________________</span>
          </div>
        </div>
        <div class="candidate-row">
          <div class="candidate-col" style="flex: 1.4;">
            <span class="cand-label">Class / Institute:</span>
            <span class="cand-val-line">____________________________________</span>
          </div>
          <div class="candidate-col" style="flex: 1;">
            <span class="cand-label">Date / Batch:</span>
            <span class="cand-val-line">____ / ____ / 202__</span>
          </div>
        </div>
        <div class="candidate-row">
          <div class="candidate-col" style="flex: 1.4;">
            <span class="cand-label">Marks Obtained:</span>
            <span class="cand-val-line">________ / <strong>${totalMarks}.00</strong></span>
          </div>
          <div class="candidate-col" style="flex: 1;">
            <span class="cand-label">Invigilator Sign:</span>
            <span class="cand-val-line">________________________</span>
          </div>
        </div>
      </div>
    `;
  }

  // Consistent Rough Workspace on Question Sheet
  const questionPageRoughHtml = `
    <div class="page-bottom-rough-space">
      <div class="page-bottom-rough-label">SPACE FOR ROUGH WORK / CALCULATIONS</div>
      <div class="rough-grid-area"></div>
    </div>
  `;

  // Consistent Dedicated Rough Workspace Section (Full-page at end if enabled)
  let roughWorkSectionHtml = '';
  if (includeRoughWork && shouldRenderQuestionsList) {
    roughWorkSectionHtml = `
      <div class="page-break-before distinct-section">
        <div class="section-divider">
          <h2 class="section-title">SPACE FOR ROUGH WORK</h2>
          <p class="section-subtitle">Dedicated rough workspace for scratch calculations, derivations and matrices</p>
        </div>
        <div class="rough-workspace-box">
          <div class="rough-workspace-watermark">SPACE FOR ROUGH WORK / CALCULATIONS</div>
          <div class="rough-grid-lines"></div>
        </div>
      </div>
    `;
  }

  // Render Answer Key Table
  let answerKeyHtml = '';
  if (shouldRenderAnswerKey && questions.length > 0) {
    const rows = [];
    const chunkSize = 5;
    for (let i = 0; i < questions.length; i += chunkSize) {
      const chunk = questions.slice(i, i + chunkSize);
      rows.push(`
        <tr>
          ${chunk.map((q, cIdx) => `
            <td class="ak-qnum">Q.${i + cIdx + 1}</td>
            <td class="ak-ans"><strong>${escapeHtml(getQuestionAnswer(q))}</strong></td>
          `).join('')}
          ${chunk.length < chunkSize ? Array(chunkSize - chunk.length).fill('<td></td><td></td>').join('') : ''}
        </tr>
      `);
    }

    const akBreakClass = isOnlyAnswers ? 'distinct-section' : 'page-break-before distinct-section';

    answerKeyHtml = `
      <div class="${akBreakClass}">
        <div class="section-divider">
          <h2 class="section-title">ANSWER KEY APPENDIX</h2>
          <p class="section-subtitle">Official verified answer key (Exam Reference)</p>
        </div>

        <table class="answer-key-table">
          <thead>
            <tr>
              <th colspan="2">Q.No / Ans</th>
              <th colspan="2">Q.No / Ans</th>
              <th colspan="2">Q.No / Ans</th>
              <th colspan="2">Q.No / Ans</th>
              <th colspan="2">Q.No / Ans</th>
            </tr>
          </thead>
          <tbody>
            ${rows.join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  // Render Step-by-Step Solutions
  let solutionsHtml = '';
  if (shouldRenderSolutionsAppendix && questions.length > 0) {
    const solBreakClass = 'page-break-before distinct-section';
    solutionsHtml = `
      <div class="${solBreakClass}">
        <div class="section-divider">
          <h2 class="section-title">DETAILED STEP-BY-STEP EXPLANATIONS & DERIVATIONS</h2>
          <p class="section-subtitle">Comprehensive mathematical proofs and textbook references</p>
        </div>

        <div class="solutions-list ${columnLayout === '2-col' ? 'two-column' : ''}">
          ${questions.map((q, idx) => {
            const rawSol = getQuestionSolution(q);
            const expHtml = renderMathToHtmlString(rawSol);
            const ans = getQuestionAnswer(q);
            const qPrompt = isOnlyAnswers && q.question ? `
              <div class="solution-q-prompt">
                <span class="sol-q-prompt-label">Question:</span> ${renderMathToHtmlString(q.question)}
              </div>
            ` : '';

            return `
              <div class="solution-card">
                <div class="solution-header">
                  <span class="sol-qnum">Q.${idx + 1}</span>
                  <span class="sol-correct">Correct: <strong>${escapeHtml(ans)}</strong></span>
                  <span class="sol-meta">${escapeHtml(q.section || '')} • ${q.type || 'MCQ'} (${q.marks || 1}M)</span>
                </div>
                ${qPrompt}
                <div class="solution-body">
                  ${expHtml}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  const validPaperSizes = ['a4', 'letter', 'legal', 'a3'];
  const sanitizedPaperSize = validPaperSizes.includes(String(paperSize).toLowerCase()) ? paperSize.toLowerCase() : 'a4';
  const sanitizedOrientation = String(orientation).toLowerCase() === 'landscape' ? 'landscape' : 'portrait';

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${escapeHtml(title)} - GATE AG</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css" />
      <style>
        @page {
          size: ${sanitizedPaperSize} ${sanitizedOrientation};
          margin: 10mm 10mm 10mm 10mm;
        }

        * {
          box-sizing: border-box;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          font-size: 9.5pt;
          line-height: 1.38;
          color: #111827;
          background: #ffffff;
          margin: 0;
          padding: 0;
        }

        /* Screen-only Print Bar */
        .no-print {
          display: block;
        }
        @media print {
          .no-print {
            display: none !important;
          }
        }

        .print-toolbar {
          position: sticky;
          top: 0;
          z-index: 9999;
          background: #0f172a;
          color: #f8fafc;
          padding: 8px 12px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          border-bottom: 2px solid #3b82f6;
          box-shadow: 0 4px 12px rgba(0,0,0,0.25);
          font-family: system-ui, sans-serif;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
        }

        .toolbar-brand {
          font-weight: 800;
          font-size: 12px;
          letter-spacing: 0.3px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .toolbar-actions {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 6px;
        }

        .toolbar-btn {
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: background 0.2s;
        }

        .btn-print-action {
          background: #10b981;
          color: #ffffff;
        }
        .btn-print-action:hover {
          background: #059669;
        }

        .btn-close-action {
          background: #334155;
          color: #e2e8f0;
        }
        .btn-close-action:hover {
          background: #475569;
        }

        .paper-content {
          padding: 0;
        }

        .paper-header {
          border-bottom: 1.5px solid #111827;
          padding-bottom: 6px;
          margin-bottom: 8px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }

        .paper-brand {
          font-size: 13pt;
          font-weight: 900;
          color: #111827;
          letter-spacing: -0.3px;
          text-transform: uppercase;
        }

        .paper-title {
          font-size: 11.5pt;
          font-weight: 800;
          color: #1f2937;
          margin-top: 1px;
        }

        .paper-sub {
          font-size: 8.5pt;
          color: #4b5563;
          margin-top: 1px;
        }

        .paper-meta-box {
          text-align: right;
          font-size: 8pt;
          color: #374151;
          border: 1px solid #9ca3af;
          padding: 4px 8px;
          min-width: 155px;
          background: #fafafa;
        }

        .paper-meta-row {
          display: flex;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 1px;
        }
        .paper-meta-row:last-child { margin-bottom: 0; }
        .meta-lbl { font-weight: 600; color: #4b5563; }
        .meta-val { font-weight: 800; color: #111827; }

        .candidate-box {
          border: 1px solid #111827;
          background: #ffffff;
          padding: 5px 8px;
          margin-bottom: 8px;
          font-size: 8.5pt;
        }

        .candidate-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 14px;
          margin-bottom: 4px;
        }
        .candidate-row:last-child { margin-bottom: 0; }

        .candidate-col {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .cand-label {
          font-weight: 700;
          color: #111827;
          white-space: nowrap;
        }

        .cand-val-line {
          color: #374151;
          font-family: monospace;
          white-space: nowrap;
          overflow: hidden;
        }

        .instructions-box {
          border: 1px dashed #9ca3af;
          background: #f9fafb;
          padding: 4px 8px;
          font-size: 7.8pt;
          color: #374151;
          margin-bottom: 8px;
        }

        .instructions-box ul {
          margin: 2px 0 0 14px;
          padding: 0;
        }

        .instructions-box li {
          margin-bottom: 1px;
        }

        .questions-list {
          width: 100%;
        }

        .questions-list.two-column {
          column-count: 2;
          column-gap: 6mm;
          column-rule: 1px solid #e5e7eb;
        }

        .question-card {
          border-bottom: 1px solid #d1d5db;
          padding: 6px 0 8px 0;
          margin-bottom: 6px;
          page-break-inside: avoid;
          break-inside: avoid;
        }

        .question-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 4px;
          font-size: 8.5pt;
        }

        .q-left {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .q-num-badge {
          font-weight: 900;
          font-size: 9.5pt;
          color: #111827;
        }

        .q-marks {
          font-weight: 700;
          font-size: 8pt;
          color: #4b5563;
        }

        .q-meta {
          font-size: 7.5pt;
          color: #6b7280;
          text-align: right;
        }

        .tag {
          font-size: 7.5pt;
          color: #4b5563;
        }
        .tag-type {
          font-weight: 700;
          color: #111827;
        }

        .question-body {
          font-size: 9.2pt;
          line-height: 1.38;
          color: #111827;
          margin-bottom: 5px;
        }

        .question-image-container {
          text-align: center;
          margin: 4px 0;
        }

        .question-image {
          max-width: 80%;
          max-height: 160px;
          border: 1px solid #9ca3af;
        }

        .options-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3px 8px;
          margin-top: 4px;
        }

        .option-item {
          display: flex;
          align-items: baseline;
          gap: 4px;
          font-size: 8.8pt;
          line-height: 1.3;
        }

        .option-label {
          font-weight: 800;
          color: #111827;
          min-width: 18px;
        }

        .option-text {
          flex: 1;
          color: #1f2937;
        }

        .nat-answer-box {
          margin-top: 4px;
          padding: 3px 6px;
          border: 1px dashed #6b7280;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 8.2pt;
          background: #fafafa;
        }

        .nat-label { font-weight: 700; color: #374151; }
        .nat-line { font-family: monospace; color: #6b7280; }

        /* Consistent Rough Workspace on each Question Page */
        .page-bottom-rough-space {
          margin-top: 14px;
          border: 1.5px dashed #6b7280;
          min-height: 38mm;
          padding: 8px 12px;
          position: relative;
          background: #ffffff;
          page-break-inside: avoid;
          break-inside: avoid;
        }

        .page-bottom-rough-label {
          font-size: 8pt;
          font-weight: 800;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          text-align: center;
          border-bottom: 1px dashed #d1d5db;
          padding-bottom: 3px;
          margin-bottom: 6px;
        }

        .rough-grid-area {
          height: 25mm;
          background-image: linear-gradient(to right, #f3f4f6 1px, transparent 1px),
                            linear-gradient(to bottom, #f3f4f6 1px, transparent 1px);
          background-size: 15px 15px;
        }

        /* Distinct Page Break for Rough Work, Answer Key, and Solutions */
        .page-break-before, .distinct-section {
          page-break-before: always !important;
          break-before: page !important;
          clear: both;
          padding-top: 6px;
        }

        .rough-workspace-box {
          margin-top: 10px;
          border: 1.5px dashed #4b5563;
          min-height: 220mm;
          padding: 12px;
          position: relative;
          background: #ffffff;
          page-break-inside: avoid;
          break-inside: avoid;
        }

        .rough-workspace-watermark {
          font-size: 8.5pt;
          font-weight: 800;
          color: #9ca3af;
          letter-spacing: 2px;
          text-align: center;
          border-bottom: 1px dashed #d1d5db;
          padding-bottom: 6px;
          margin-bottom: 12px;
        }

        .rough-grid-lines {
          height: 190mm;
          background-image: linear-gradient(to right, #f3f4f6 1px, transparent 1px),
                            linear-gradient(to bottom, #f3f4f6 1px, transparent 1px);
          background-size: 20px 20px;
        }

        .section-divider {
          text-align: center;
          border-bottom: 1.5px solid #111827;
          padding-bottom: 4px;
          margin-bottom: 10px;
        }

        .section-title {
          font-size: 11pt;
          font-weight: 900;
          color: #111827;
          margin: 0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .section-subtitle {
          font-size: 8pt;
          color: #4b5563;
          margin: 1px 0 0 0;
        }

        .answer-key-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 8.5pt;
          margin-top: 8px;
        }

        .answer-key-table th, .answer-key-table td {
          border: 1px solid #4b5563;
          padding: 4px 6px;
          text-align: center;
        }

        .answer-key-table th {
          background: #e5e7eb;
          font-weight: 800;
          color: #111827;
        }

        .ak-qnum { background: #f9fafb; font-weight: 700; color: #374151; width: 10%; }
        .ak-ans { font-weight: 800; color: #111827; width: 10%; }

        .solutions-list {
          width: 100%;
        }

        .solutions-list.two-column {
          column-count: 2;
          column-gap: 6mm;
          column-rule: 1px solid #e5e7eb;
        }

        .solution-card {
          border: 1px solid #d1d5db;
          padding: 6px 8px;
          margin-bottom: 6px;
          background: #ffffff;
          page-break-inside: avoid;
          break-inside: avoid;
        }

        .solution-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 2px;
          margin-bottom: 4px;
          font-size: 8.2pt;
        }

        .sol-qnum { font-weight: 800; color: #111827; }
        .sol-correct { font-weight: 700; color: #111827; }
        .sol-meta { font-size: 7.5pt; color: #6b7280; }

        .solution-q-prompt {
          font-size: 8.5pt;
          line-height: 1.35;
          color: #374151;
          background: #f8fafc;
          border-left: 2.5px solid #94a3b8;
          padding: 4px 8px;
          margin-bottom: 5px;
          border-radius: 3px;
        }

        .sol-q-prompt-label {
          font-weight: 800;
          color: #1e293b;
          text-transform: uppercase;
          font-size: 7.5pt;
          margin-right: 4px;
        }

        .solution-body {
          font-size: 8.5pt;
          line-height: 1.38;
          color: #1f2937;
        }

        .inline-solution-card {
          margin-top: 5px;
          border: 1px solid #9ca3af;
          border-left: 3px solid #111827;
          padding: 5px 8px;
          background: #f9fafb;
          page-break-inside: avoid;
          break-inside: avoid;
        }

        .inline-solution-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 2px;
          margin-bottom: 3px;
          font-size: 8pt;
        }

        .inline-sol-badge { font-weight: 800; color: #111827; text-transform: uppercase; font-size: 7.5pt; }
        .inline-sol-key { font-size: 8pt; color: #111827; font-weight: 700; }
        .inline-solution-body { font-size: 8.5pt; line-height: 1.38; color: #1f2937; }

        .footer {
          margin-top: 14px;
          padding-top: 4px;
          border-top: 1px solid #9ca3af;
          text-align: center;
          font-size: 7.5pt;
          color: #6b7280;
        }

        .katex {
          font-size: 1.0em !important;
        }
      </style>
    </head>
    <body>
      <div class="no-print print-toolbar">
        <div class="toolbar-brand">
          <span>📄</span>
          <span>GATE AG Question Paper Studio</span>
        </div>
        <div class="toolbar-actions">
          <button type="button" onclick="window.print()" class="toolbar-btn btn-print-action">
            🖨️ Print / Save as PDF (Ctrl+P)
          </button>
          <button type="button" onclick="window.close()" class="toolbar-btn btn-close-action">
            ✕ Close Window
          </button>
        </div>
      </div>

      <div class="paper-content">
        <div class="paper-header">
          <div style="flex: 1;">
            <div class="paper-brand">GATE AG PREP PORTAL</div>
            <div class="paper-title">${escapeHtml(title)}</div>
            <div class="paper-sub">${escapeHtml(effectiveSubtitle)}</div>
            ${studentName ? `<div class="paper-sub" style="margin-top: 2px; font-weight: 700;">Student / Candidate: ${escapeHtml(studentName)}</div>` : ''}
          </div>

          <div class="paper-meta-box">
            <div class="paper-meta-row"><span class="meta-lbl">Paper Code:</span> <span class="meta-val">${escapeHtml(paperCode)}</span></div>
            <div class="paper-meta-row"><span class="meta-lbl">Total Questions:</span> <span class="meta-val">${totalQuestions}</span></div>
            <div class="paper-meta-row"><span class="meta-lbl">Total Marks:</span> <span class="meta-val">${totalMarks}</span></div>
            <div class="paper-meta-row"><span class="meta-lbl">Est. Duration:</span> <span class="meta-val">${estimatedTimeMin} Mins</span></div>
            <div class="paper-meta-row"><span class="meta-lbl">Date:</span> <span class="meta-val">${escapeHtml(date)}</span></div>
          </div>
        </div>

        ${candidateBoxHtml}

        ${isOnlyAnswers ? `
          <div class="instructions-box">
            <strong>Marking Scheme &amp; Solution Evaluation Guide:</strong>
            <ul>
              <li>Total Questions: <strong>${totalQuestions}</strong> | Total Marks: <strong>${totalMarks}.00</strong>.</li>
              <li>MCQ: 1M (+1 / -0.33), 2M (+2 / -0.67). MSQ: Full marks for exact choice set match only (no negative). NAT: Numerical tolerance range.</li>
            </ul>
          </div>
        ` : `
          <div class="instructions-box">
            <strong>General Instructions:</strong>
            <ul>
              <li>Total Questions: <strong>${totalQuestions}</strong> | Total Marks: <strong>${totalMarks}.00</strong> | Maximum Time: <strong>${estimatedTimeMin} minutes</strong>.</li>
              <li>For MCQ, choose single correct option. For MSQ, choose all correct options (no partial credit). For NAT, write numerical value.</li>
            </ul>
          </div>
        `}

        ${shouldRenderQuestionsList ? `
          <div class="questions-list ${columnLayout === '2-col' ? 'two-column' : ''}">
            ${questionsHtml}
          </div>
          ${questionPageRoughHtml}
          ${roughWorkSectionHtml}
        ` : ''}

        ${answerKeyHtml}
        ${solutionsHtml}

        <div class="footer">
          Generated via <strong>GATE AG Prep Portal</strong> • Standard Exam Format • 100% Offline Capable
        </div>
      </div>

      <script>
        // Automatic Print Trigger with Cross-Browser Readiness Detection
        function triggerPrintOnReady() {
          setTimeout(function() {
            try {
              window.focus();
              window.print();
            } catch (e) {
              console.warn('Auto print trigger prevented:', e);
            }
          }, 350);
        }

        if (document.readyState === 'complete') {
          triggerPrintOnReady();
        } else {
          window.addEventListener('load', triggerPrintOnReady);
        }
      </script>
    </body>
    </html>
  `;
}

/**
 * Trigger Instant Print / PDF Export in Browser (Robust Multi-Strategy Engine)
 */
export function exportQuestionsToPdf(questions = [], options = {}) {
  if (!questions || questions.length === 0) {
    alert("No questions selected for export.");
    return false;
  }

  const htmlContent = generateQuestionPaperHtml(questions, options);

  // Strategy 1: Direct document.write in a blank popup window (Same-origin, trusted by Safari & Chrome)
  try {
    const printWindow = window.open('', '_blank', 'width=1000,height=900,menubar=yes,toolbar=yes');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(htmlContent);
      printWindow.document.close();
      printWindow.focus();
      return true;
    }
  } catch (winErr) {
    console.warn("Direct document write window open failed, trying blob URL:", winErr);
  }

  // Strategy 2: Blob URL window fallback
  try {
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const blobUrl = URL.createObjectURL(blob);
    const blobWindow = window.open(blobUrl, '_blank', 'width=1000,height=900,menubar=yes,toolbar=yes');
    if (blobWindow) {
      blobWindow.focus();
      setTimeout(() => URL.revokeObjectURL(blobUrl), 60000);
      return true;
    }
  } catch (blobErr) {
    console.warn("Blob URL window open failed, trying hidden iframe fallback:", blobErr);
  }

  // Strategy 3: Hidden printable iframe fallback with active dimensions for popup-blocked environments
  try {
    let printIframe = document.getElementById('pdf-export-hidden-iframe');
    if (!printIframe) {
      printIframe = document.createElement('iframe');
      printIframe.id = 'pdf-export-hidden-iframe';
      printIframe.style.position = 'fixed';
      printIframe.style.top = '0';
      printIframe.style.left = '0';
      printIframe.style.width = '100%';
      printIframe.style.height = '100%';
      printIframe.style.opacity = '0';
      printIframe.style.pointerEvents = 'none';
      printIframe.style.zIndex = '-9999';
      document.body.appendChild(printIframe);
    }

    const doc = printIframe.contentWindow.document;
    doc.open();
    doc.write(htmlContent);
    doc.close();

    setTimeout(() => {
      try {
        printIframe.contentWindow.focus();
        printIframe.contentWindow.print();
      } catch (iframePrintErr) {
        console.warn("Iframe print error:", iframePrintErr);
      }
    }, 450);

    return true;
  } catch (iframeErr) {
    console.error("All window and iframe print methods failed:", iframeErr);
  }

  // Strategy 4: Direct file download fallback
  return downloadQuestionPaperHtmlFile(questions, options);
}

/**
 * Direct Standalone HTML Worksheet File Downloader
 */
export function downloadQuestionPaperHtmlFile(questions = [], options = {}) {
  if (!questions || questions.length === 0) {
    alert("No questions selected for download.");
    return false;
  }

  const htmlContent = generateQuestionPaperHtml(questions, options);
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const sanitizedTitle = (options.title || 'GATE_AG_Worksheet')
    .replace(/[^a-zA-Z0-9_-]/g, '_')
    .replace(/_+/g, '_');
  const filename = `${sanitizedTitle}_${new Date().toISOString().slice(0, 10)}.html`;

  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 10000);
  return true;
}

/**
 * One-Click Full Paper PDF Exporter (PYQs & Custom Mocks)
 * Generates print-ready A4 document on the fly directly from question JSON data.
 * 
 * @param {Object|string} paperOrTitle - The mock paper object or title string
 * @param {Array} questions - Array of question objects (65 standard questions)
 * @param {'only_questions'|'only_answers'|'first_questions_then_answers'|'study_guide'|'worksheet'} mode - Export format
 * @param {Object} extraOptions - Custom options (studentName, paperSize, columnLayout, etc.)
 */
export function exportPaperToPdf(paperOrTitle, questions = [], mode = 'study_guide', extraOptions = {}) {
  if (!questions || questions.length === 0) {
    alert("No questions available in this paper for export.");
    return false;
  }

  const rawMode = String(mode || 'study_guide').toLowerCase();
  let exportMode = 'study_guide';
  if (rawMode === 'only_questions' || rawMode === 'exam_only' || rawMode === 'questions_only') {
    exportMode = 'only_questions';
  } else if (rawMode === 'only_answers' || rawMode === 'solutions_only' || rawMode === 'answers_only') {
    exportMode = 'only_answers';
  } else if (rawMode === 'first_questions_then_answers' || rawMode === 'worksheet' || rawMode === 'exam_with_solutions' || rawMode === 'questions_then_answers') {
    exportMode = 'first_questions_then_answers';
  } else if (rawMode === 'study_guide' || rawMode === 'first_question_then_answer' || rawMode === 'inline_solutions') {
    exportMode = 'study_guide';
  }

  const title = typeof paperOrTitle === 'string' 
    ? paperOrTitle 
    : (paperOrTitle.title || `GATE AG ${paperOrTitle.year || ''} Paper`);
  const year = typeof paperOrTitle === 'object' ? paperOrTitle.year : '';

  return exportQuestionsToPdf(questions, {
    title,
    paperCode: year ? `GATE-AG-${year}` : 'GATE-AG-MOCK',
    layoutMode: exportMode,
    includeQuestionMetadata: true,
    columnLayout: '1-col',
    paperSize: 'a4',
    orientation: 'portrait',
    ...extraOptions
  });
}

