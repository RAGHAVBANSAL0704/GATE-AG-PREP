import katex from 'katex';
import { renderMathToHtmlString } from '../../src/utils/mathFormatting.js';

export const CANONICAL_KEYWORDS = /(Grewal|Sanjay Kumar|Ojha|Michael|Sahay|Suresh|Sukumar De|Earle|GATE|NPTEL|ICAR|Kreyszig|Todd|Ritzema|Ganesan|Aggarwal|Liljedahl|Geankoplis|Das|Kepner|Schwab|Punmia|Toledo|McCabe|Kumar|Subramanya|Brennan|Jain|Henderson|Perry|Singh|Bhandari|Gill|Vanden Berg|Wren|Martin|Rajput|Nag|Incropera|Srivastava|Goering|Bainer|Barger|Frevert|Murty|Hall|Chakverty|Heldman|Chow)/i;

export function validateQuestion(q) {
  const idPattern = /^QB_[A-Z0-9]+(_[A-Z0-9]+)*_\d+$/;
  if (!q.id || !idPattern.test(q.id)) {
    throw new Error(`Invalid ID format: ${q.id}`);
  }
  if (!q.section || typeof q.section !== 'string') {
    throw new Error(`${q.id} missing valid section`);
  }
  if (!q.topic || typeof q.topic !== 'string' || q.topic.trim().length === 0) {
    throw new Error(`${q.id} missing valid topic`);
  }
  if (!q.subtopic || typeof q.subtopic !== 'string' || q.subtopic.trim().length === 0) {
    throw new Error(`${q.id} missing valid subtopic`);
  }
  if (!['MCQ', 'MSQ', 'NAT'].includes(q.type)) {
    throw new Error(`${q.id} invalid type: ${q.type}`);
  }
  if (![1, 2].includes(q.marks)) {
    throw new Error(`${q.id} marks must be 1 or 2, got ${q.marks}`);
  }
  if (q.type === 'MCQ') {
    const expNeg = q.marks === 1 ? 0.33 : 0.67;
    if (Math.abs(q.negative_marks - expNeg) > 0.05) {
      throw new Error(`${q.id} invalid MCQ negative marks: ${q.negative_marks}`);
    }
    if (!['A', 'B', 'C', 'D'].includes(q.correct_answer)) {
      throw new Error(`${q.id} invalid MCQ correct answer: ${q.correct_answer}`);
    }
    if (!q.options || typeof q.options !== 'object') {
      throw new Error(`${q.id} missing options object`);
    }
    for (const k of ['A', 'B', 'C', 'D']) {
      if (!q.options[k] || String(q.options[k]).trim().length === 0) {
        throw new Error(`${q.id} missing option ${k}`);
      }
    }
  } else if (q.type === 'MSQ') {
    if (q.negative_marks !== 0) {
      throw new Error(`${q.id} MSQ negative marks must be 0`);
    }
    if (!Array.isArray(q.correct_answer) || q.correct_answer.length < 1 || q.correct_answer.length > 4) {
      throw new Error(`${q.id} MSQ correct answer must be array of 1-4 keys`);
    }
    const sorted = [...q.correct_answer].sort();
    if (JSON.stringify(q.correct_answer) !== JSON.stringify(sorted)) {
      throw new Error(`${q.id} MSQ correct answer must be sorted array`);
    }
    for (const k of ['A', 'B', 'C', 'D']) {
      if (!q.options[k] || String(q.options[k]).trim().length === 0) {
        throw new Error(`${q.id} missing option ${k}`);
      }
    }
  } else if (q.type === 'NAT') {
    if (q.negative_marks !== 0) {
      throw new Error(`${q.id} NAT negative marks must be 0`);
    }
    const num = parseFloat(String(q.correct_answer));
    if (!Number.isFinite(num)) {
      throw new Error(`${q.id} NAT correct answer is not finite number: ${q.correct_answer}`);
    }
    if (!q.numerical_range || typeof q.numerical_range.min !== 'number' || typeof q.numerical_range.max !== 'number') {
      throw new Error(`${q.id} NAT missing numerical_range with min and max`);
    }
    if (q.numerical_range.min > q.numerical_range.max) {
      throw new Error(`${q.id} NAT min > max`);
    }
    const eps = 1e-4;
    if (num < q.numerical_range.min - eps || num > q.numerical_range.max + eps) {
      throw new Error(`${q.id} NAT answer ${num} outside range [${q.numerical_range.min}, ${q.numerical_range.max}]`);
    }
  }

  if (typeof q.question !== 'string' || q.question.trim().length < 15) {
    throw new Error(`${q.id} question text too short (<15 chars)`);
  }
  if (typeof q.solution !== 'string' || q.solution.trim().length < 25) {
    throw new Error(`${q.id} solution text too short (<25 chars)`);
  }
  if (!['Easy', 'Moderate', 'Hard'].includes(q.difficulty)) {
    throw new Error(`${q.id} invalid difficulty: ${q.difficulty}`);
  }
  if (!q.source || typeof q.source !== 'string' || !CANONICAL_KEYWORDS.test(q.source)) {
    throw new Error(`${q.id} invalid source: ${q.source}`);
  }

  // KaTeX checks
  const checkTexts = [{ label: 'question', text: q.question }, { label: 'solution', text: q.solution }];
  if (q.options) {
    Object.entries(q.options).forEach(([k, v]) => checkTexts.push({ label: `option ${k}`, text: String(v) }));
  }

  checkTexts.forEach(({ label, text }) => {
    const dollars = (text.match(/(?<!\\)\$/g) || []).length;
    if (dollars % 2 !== 0) {
      throw new Error(`${q.id} unbalanced $ in ${label}: "${text}"`);
    }

    const mathBlocks = [];
    text.replace(/\$\$([\s\S]*?)\$\$/g, (_, m) => { mathBlocks.push(m); return ''; });
    text.replace(/\$([^$\n]+)\$/g, (_, m) => { mathBlocks.push(m); return ''; });
    text.replace(/\\\[([\s\S]*?)\\\]/g, (_, m) => { mathBlocks.push(m); return ''; });
    text.replace(/\\\(([\s\S]*?)\\\)/g, (_, m) => { mathBlocks.push(m); return ''; });

    mathBlocks.forEach(mathStr => {
      const openBraces = (mathStr.match(/\{/g) || []).length;
      const closeBraces = (mathStr.match(/\}/g) || []).length;
      if (openBraces !== closeBraces) {
        throw new Error(`${q.id} unbalanced braces in math "${mathStr}" in ${label}`);
      }
      let cleanMath = mathStr.replace(/\\degree\b/g, '^\\circ');
      try {
        katex.renderToString(cleanMath, { throwOnError: true });
      } catch (e) {
        throw new Error(`${q.id} KaTeX compilation failed in ${label} for "${mathStr}": ${e.message}`);
      }
    });

    renderMathToHtmlString(text);
  });

  return true;
}
