import katex from 'katex';

// Helper: Escape raw HTML entities to prevent XSS
export function escapeHtml(unsafe) {
  if (typeof unsafe !== 'string') {
    return unsafe === null || unsafe === undefined ? '' : String(unsafe);
  }
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Process markdown bold (**text**), code (`text`), unit formatting, and KaTeX math safely
export function renderMathToHtmlString(text) {
  if (typeof text !== 'string') return '';

  const mathTokens = [];
  const pushToken = (mathStr, displayMode) => {
    const token = `___KATEX_MATH_TOKEN_${mathTokens.length}___`;
    let rendered = '';
    try {
      let cleanMath = mathStr.trim();
      // Normalize common physics / engineering symbols
      cleanMath = cleanMath.replace(/\\degree\b/g, '^\\circ');

      rendered = katex.renderToString(cleanMath, { 
        displayMode, 
        throwOnError: false,
        errorColor: 'currentColor'
      });

      // Strip any red error color inline styles from KaTeX output
      if (rendered.includes('katex-error')) {
        rendered = rendered.replace(/style="[^"]*color\s*:\s*#[a-fA-F0-9]+[^"]*"/gi, '');
      }
    } catch (e) {
      rendered = `<span class="text-inherit font-mono">${escapeHtml(mathStr)}</span>`;
    }
    mathTokens.push({ token, rendered });
    return token;
  };

  let str = text;

  // 1. Extract display math \[ ... \]
  str = str.replace(/\\\[([\s\S]*?)\\\]/g, (match, mathStr) => {
    return pushToken(mathStr, true);
  });

  // 2. Extract display math $$ ... $$
  str = str.replace(/\$\$([\s\S]*?)\$\$/g, (match, mathStr) => {
    return pushToken(mathStr, true);
  });

  // 3. Extract inline math \( ... \)
  str = str.replace(/\\\(([\s\S]*?)\\\)/g, (match, mathStr) => {
    return pushToken(mathStr, false);
  });

  // 4. Extract inline math $ ... $ (matching mathematical formulas only)
  str = str.replace(/\$([^$\n]+)\$/g, (match, mathStr) => {
    return pushToken(mathStr, false);
  });

  // 5. Targeted extraction of explicit LaTeX commands only (e.g. \frac{a}{b}, \sqrt{x}, \eta_{th}, \Delta P)
  // NEVER pass entire sentence to math mode
  str = str.replace(/(\\(?:frac\{[^{}]*\}\{[^{}]*\}|sqrt\{[^{}]*\}|sum(?:_\{[^{}]*\})?(?:\^\{[^{}]*\})?|int(?:_\{[^{}]*\})?(?:\^\{[^{}]*\})?|[a-zA-Z]+(?:_\{[^{}]*\}|_[a-zA-Z0-9]+|\^\{[^{}]*\}|\^[a-zA-Z0-9]+)*))/g, (match, mathStr) => {
    if (mathStr === '\\n' || mathStr === '\\t' || mathStr === '\\r' || mathStr.length < 2) return match;
    return pushToken(mathStr, false);
  });

  // 6. Escape raw HTML entities in text segments
  str = escapeHtml(str);

  // 7. Automatic Spacing Sanitization for Word & Math Boundaries
  str = str.replace(/([a-zA-Z0-9\)])(\$|\\\(|\\\[)/g, '$1 $2')
           .replace(/(\$|\\\)|\\\])([a-zA-Z0-9\(/])/g, '$1 $2')
           .replace(/\]([a-zA-Z])/g, '] $1');

  // 8. Pre-process common engineering units and sub/superscripts
  str = str.replace(/\bdeg C\b/gi, '°C')
           .replace(/\bo C\b/gi, '°C')
           .replace(/\boC\b/g, '°C')
           .replace(/m 3 \/ s/gi, 'm³/s')
           .replace(/m 3\/s/gi, 'm³/s')
           .replace(/m3\/s/gi, 'm³/s')
           .replace(/m 2\b/gi, 'm²')
           .replace(/m2\b/gi, 'm²')
           .replace(/cm 2\b/gi, 'cm²')
           .replace(/kg m -3/gi, 'kg/m³')
           .replace(/N m -2/gi, 'N/m²')
           .replace(/kN m -2/gi, 'kN/m²');

  // 9. Convert markdown bold **text** and inline code `code` (on escaped safe text)
  str = str.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-inherit">$1</strong>');
  str = str.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-mono text-xs border border-slate-200 dark:border-slate-700">$1</code>');

  // 10. Re-inject safe KaTeX rendered tokens
  for (const { token, rendered } of mathTokens) {
    str = str.replaceAll(token, () => rendered);
  }

  return str;
}
