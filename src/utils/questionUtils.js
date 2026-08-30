/**
 * Extracts normalized integer question number from a question object or ID.
 * Supports q.qnum (number or string), q.id (e.g. GATE_2022_Q65, GATE_2027_MOCK_01_Q45, custom_mock_99),
 * and falls back to fallbackIndex + 1.
 */
export function getQuestionNumber(q, fallbackIndex = 0) {
  if (q && typeof q.qnum === 'number' && !isNaN(q.qnum)) return q.qnum;
  if (q && typeof q.qnum === 'string') {
    const parsed = parseInt(q.qnum, 10);
    if (!isNaN(parsed)) return parsed;
  }
  if (q && q.id) {
    const match = q.id.match(/_Q(\d+)/i) || q.id.match(/_(\d+)$/);
    if (match) {
      const parsed = parseInt(match[1], 10);
      if (!isNaN(parsed)) return parsed;
    }
  }
  return fallbackIndex + 1;
}

/**
 * Sorts questions deterministically in ascending numerical order of Question Number (Q1 to Q65).
 */
export function sortQuestionsByNumber(questions = []) {
  return [...questions].sort((a, b) => {
    return getQuestionNumber(a, 0) - getQuestionNumber(b, 0);
  });
}
