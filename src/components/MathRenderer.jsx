import React from 'react';
import katex from 'katex';

export default function MathRenderer({ content, inline = false, className = "" }) {
  if (!content) return null;

  // Process markdown bold (**text**), code (`text`), unit formatting, and KaTeX math
  const processMath = (text) => {
    if (typeof text !== 'string') return text;

    let str = text;

    // 1. Pre-process common engineering units and sub/superscripts
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

    // 2. Convert markdown bold **text** and inline code `code`
    str = str.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    str = str.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-mono text-xs border border-slate-200 dark:border-slate-700">$1</code>');

    let hasRenderedMath = false;

    // 3. Render KaTeX display math \[ ... \] or $$ ... $$
    str = str.replace(/\\\[([\s\S]*?)\\\]/g, (match, mathStr) => {
      hasRenderedMath = true;
      try {
        return katex.renderToString(mathStr.trim(), { displayMode: true, throwOnError: false });
      } catch (e) {
        return `<span class="text-amber-500 font-mono">${mathStr}</span>`;
      }
    });

    str = str.replace(/\$\$([\s\S]*?)\$\$/g, (match, mathStr) => {
      hasRenderedMath = true;
      try {
        return katex.renderToString(mathStr.trim(), { displayMode: true, throwOnError: false });
      } catch (e) {
        return `<span class="text-amber-500 font-mono">${mathStr}</span>`;
      }
    });

    // 4. Render KaTeX inline math \( ... \) or $ ... $
    str = str.replace(/\\\(([\s\S]*?)\\\)/g, (match, mathStr) => {
      hasRenderedMath = true;
      try {
        return katex.renderToString(mathStr.trim(), { displayMode: false, throwOnError: false });
      } catch (e) {
        return `<span class="text-amber-500 font-mono">${mathStr}</span>`;
      }
    });

    str = str.replace(/\$([^$\n]+)\$/g, (match, mathStr) => {
      hasRenderedMath = true;
      try {
        return katex.renderToString(mathStr.trim(), { displayMode: false, throwOnError: false });
      } catch (e) {
        return `<span class="text-amber-500 font-mono">${mathStr}</span>`;
      }
    });

    // 5. Fallback: If no delimiter was found but string contains LaTeX commands (like \frac, \lambda, \partial, =, ^, _), render directly
    if (!hasRenderedMath && (str.includes('\\') || str.includes('^') || str.includes('_') || str.includes('='))) {
      try {
        return katex.renderToString(str.trim(), { displayMode: !inline, throwOnError: false });
      } catch (e) {
        return str;
      }
    }

    return str;
  };

  // Helper to parse Markdown tables if present
  const renderContent = (rawText) => {
    // If text contains Markdown table syntax
    if (rawText.includes('|') && rawText.includes('\n|')) {
      const lines = rawText.split('\n');
      const tableLines = [];
      const nonTableBefore = [];
      const nonTableAfter = [];

      let inTable = false;
      lines.forEach((line) => {
        if (line.trim().startsWith('|')) {
          inTable = true;
          tableLines.push(line.trim());
        } else if (inTable) {
          nonTableAfter.push(line);
        } else {
          nonTableBefore.push(line);
        }
      });

      if (tableLines.length >= 2) {
        const header = tableLines[0].split('|').filter(c => c.trim().length > 0);
        const rows = tableLines.slice(2).map(r => r.split('|').filter(c => c.trim().length > 0));

        return (
          <div className="space-y-4">
            {nonTableBefore.length > 0 && (
              <div className="space-y-2">
                {nonTableBefore.map((line, idx) => line.trim() && (
                  <div key={idx} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: processMath(line) }} />
                ))}
              </div>
            )}

            <div className="overflow-x-auto my-3 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xs">
              <table className="w-full text-xs sm:text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-700">
                    {header.map((col, idx) => (
                      <th key={idx} className="px-4 py-2.5 border-r last:border-0 border-slate-200 dark:border-slate-700">
                        <span dangerouslySetInnerHTML={{ __html: processMath(col.trim()) }} />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="px-4 py-2.5 border-r last:border-0 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-medium">
                          <span dangerouslySetInnerHTML={{ __html: processMath(cell.trim()) }} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {nonTableAfter.length > 0 && (
              <div className="space-y-2">
                {nonTableAfter.map((line, idx) => line.trim() && (
                  <div key={idx} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: processMath(line) }} />
                ))}
              </div>
            )}
          </div>
        );
      }
    }

    // Split multi-line solutions into distinct block divs for maximum readability
    const lines = rawText.split('\n');

    return (
      <div className={`space-y-2.5 ${className}`}>
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={idx} className="h-1" />;
          
          // Style key lines or step headers cleanly
          let blockStyle = "leading-relaxed";
          if (trimmed.startsWith('<b>Official GATE') || trimmed.startsWith('Official GATE')) {
            blockStyle = "p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200 font-medium text-xs sm:text-sm";
          } else if (trimmed.startsWith('<b>Section:') || trimmed.startsWith('Section:')) {
            blockStyle = "text-xs font-semibold text-slate-500 uppercase tracking-wider";
          } else if (trimmed.startsWith('1.') || trimmed.startsWith('2.') || trimmed.startsWith('3.')) {
            blockStyle = "pl-2 border-l-2 border-blue-500 text-slate-800 dark:text-slate-200 my-1 py-0.5";
          }

          return (
            <div 
              key={idx} 
              className={blockStyle}
              dangerouslySetInnerHTML={{ __html: processMath(trimmed) }}
            />
          );
        })}
      </div>
    );
  };

  return renderContent(content);
}
