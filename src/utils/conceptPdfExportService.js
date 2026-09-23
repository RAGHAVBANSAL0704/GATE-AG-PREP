/**
 * Clean Print & Plain-Text Export Service for GATE AG Study Notes
 * 
 * Provides isolated, publication-grade academic print/PDF generation and
 * plain-text (.txt) downloads with zero UI chrome, banners, or interactive controls.
 */

import { renderMathToHtmlString, escapeHtml } from './mathFormatting.js';

/**
 * Strips markdown styling, HTML tags, and KaTeX markup to generate clean plain text.
 */
export function cleanTextForPlainExport(str) {
  if (typeof str !== 'string') return '';
  return str
    // Normalize display math delimiters
    .replace(/\$\$([\s\S]*?)\$\$/g, '$1')
    .replace(/\\\[([\s\S]*?)\\\]/g, '$1')
    // Normalize inline math delimiters
    .replace(/\$([^\$\n]+?)\$/g, '$1')
    .replace(/\\\(([^\)]+?)\\\)/g, '$1')
    // Remove markdown headers
    .replace(/^#+\s+/gm, '')
    // Remove bold/italics
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    // Remove inline code ticks
    .replace(/`([^`]+)`/g, '$1')
    // Normalize common LaTeX commands to plain text symbols
    .replace(/\\times/g, '×')
    .replace(/\\cdot/g, '·')
    .replace(/\\approx/g, '≈')
    .replace(/\\le\b|\\leq\b/g, '≤')
    .replace(/\\ge\b|\\geq\b/g, '≥')
    .replace(/\\ne\b|\\neq\b/g, '≠')
    .replace(/\\pm\b/g, '±')
    .replace(/\\pi\b/g, 'π')
    .replace(/\\eta\b/g, 'η')
    .replace(/\\lambda\b/g, 'λ')
    .replace(/\\theta\b/g, 'θ')
    .replace(/\\alpha\b/g, 'α')
    .replace(/\\beta\b/g, 'β')
    .replace(/\\gamma\b/g, 'γ')
    .replace(/\\sigma\b/g, 'σ')
    .replace(/\\tau\b/g, 'τ')
    .replace(/\\Delta\b/g, 'Δ')
    .replace(/\\sum\b/g, 'Σ')
    .replace(/\\int\b/g, '∫')
    .replace(/\\infty\b/g, '∞')
    .replace(/\\to\b|\\rightarrow\b/g, '→')
    .replace(/\\implies\b/g, '⇒')
    .replace(/\\not\\implies\b/g, '⇏')
    .replace(/\\iff\b/g, '⇔')
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1 / $2)')
    .replace(/\\sqrt\{([^}]+)\}/g, '√($1)')
    .replace(/\\text\{([^}]+)\}/g, '$1')
    .replace(/\\quad\b|\\qquad\b/g, '   ')
    // Remove any leftover HTML tags
    .replace(/<[^>]+>/g, '')
    // Normalize multiple consecutive blank lines
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Generates an ultra-clean, structured plain-text representation of a concept note.
 */
export function generateConceptPlainText(concept) {
  if (!concept) return '';

  const divider = '='.repeat(80);
  const thinDivider = '-'.repeat(80);

  const title = (concept.title || 'Untitled Concept').trim();
  const section = (concept.section || 'General').trim();
  const topic = (concept.topic || '').trim();
  const importance = (concept.importance || 'High').trim();

  let out = `${divider}\n`;
  out += `GATE AGRICULTURAL ENGINEERING (AG) — CORE STUDY NOTE\n`;
  out += `${divider}\n`;
  out += `Title:      ${title}\n`;
  out += `Section:    ${section}\n`;
  if (topic) out += `Topic:      ${topic}\n`;
  out += `Importance: ${importance}\n`;
  out += `${thinDivider}\n\n`;

  // Formulas Summary Section
  if (Array.isArray(concept.formulas) && concept.formulas.length > 0) {
    out += `[KEY FORMULAS & GOVERNING EQUATIONS]\n`;
    concept.formulas.forEach((f, idx) => {
      const cleanF = cleanTextForPlainExport(f);
      if (cleanF) {
        out += `  (${idx + 1}) ${cleanF}\n`;
      }
    });
    out += `\n${thinDivider}\n\n`;
  }

  // Key Takeaways Section
  if (Array.isArray(concept.takeaways) && concept.takeaways.length > 0) {
    out += `[CORE TAKEAWAYS & EXAM TIPS]\n`;
    concept.takeaways.forEach((t) => {
      const cleanT = cleanTextForPlainExport(t);
      if (cleanT) {
        out += `  • ${cleanT}\n`;
      }
    });
    out += `\n${thinDivider}\n\n`;
  }

  // Main Content Section
  if (concept.content) {
    out += `[COMPLETE STUDY NOTE & DERIVATIONS]\n\n`;
    out += cleanTextForPlainExport(concept.content);
    out += `\n\n`;
  }

  out += `${divider}\n`;
  out += `GATE AG PREP WEB PORTAL • Self-Sufficient Offline Study Notes\n`;
  out += `${divider}\n`;

  return out;
}

/**
 * Triggers a direct browser file download of the concept as a .txt plain-text file.
 */
export function downloadConceptAsPlainText(concept) {
  if (!concept) return;
  const text = generateConceptPlainText(concept);
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const safeFilename = (concept.title || 'Concept_Note')
    .replace(/[^a-zA-Z0-9_\-]/g, '_')
    .replace(/_+/g, '_')
    .slice(0, 60);

  const link = document.createElement('a');
  link.href = url;
  link.download = `${safeFilename}_GATE_AG_Notes.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Formats a clean, publication-grade academic printable HTML document.
 * Contains pure white background, crisp dark gray typography, clean KaTeX math,
 * and ZERO application chrome, buttons, toolbars, or overlays.
 */
export function generateConceptPrintHtml(concept) {
  if (!concept) return '';

  const title = escapeHtml(concept.title || 'GATE AG Concept Note');
  const section = escapeHtml(concept.section || 'GATE AG');
  const topic = escapeHtml(concept.topic || '');
  const importance = escapeHtml(concept.importance || 'High');

  // Render formulas
  let formulasHtml = '';
  if (Array.isArray(concept.formulas) && concept.formulas.length > 0) {
    const formulaItems = concept.formulas.map((f, idx) => {
      const mathRendered = renderMathToHtmlString(f.includes('$') ? f : `$$${f}$$`);
      return `
        <div class="formula-item">
          <span class="formula-num">(${idx + 1})</span>
          <div class="formula-math">${mathRendered}</div>
        </div>
      `;
    }).join('');

    formulasHtml = `
      <section class="section-block">
        <h2 class="section-title">Key Formulas & Mathematical Governing Equations</h2>
        <div class="formulas-container">
          ${formulaItems}
        </div>
      </section>
    `;
  }

  // Render takeaways
  let takeawaysHtml = '';
  if (Array.isArray(concept.takeaways) && concept.takeaways.length > 0) {
    const takeawayItems = concept.takeaways.map(t => {
      return `<li>${renderMathToHtmlString(t)}</li>`;
    }).join('');

    takeawaysHtml = `
      <section class="section-block">
        <h2 class="section-title">Essential Takeaways & Exam Tips</h2>
        <ul class="takeaways-list">
          ${takeawayItems}
        </ul>
      </section>
    `;
  }

  // Render main content with KaTeX math
  let contentHtml = '';
  if (concept.content) {
    // Process markdown headings and paragraphs
    const paragraphs = concept.content.split('\n\n');
    const renderedParagraphs = paragraphs.map(p => {
      const trimmed = p.trim();
      if (!trimmed) return '';
      if (trimmed.startsWith('# ')) {
        // Skip main title since it's already in the header
        return '';
      }
      if (trimmed.startsWith('## ')) {
        const hText = trimmed.replace(/^##\s+/, '');
        return `<h2 class="section-title">${renderMathToHtmlString(hText)}</h2>`;
      }
      if (trimmed.startsWith('### ')) {
        const hText = trimmed.replace(/^###\s+/, '');
        return `<h3 class="subsection-title">${renderMathToHtmlString(hText)}</h3>`;
      }
      if (trimmed.startsWith('- ') || trimmed.startsWith('• ') || /^\d+\.\s+/.test(trimmed)) {
        const lines = trimmed.split('\n');
        const listItems = lines.map(l => {
          const cleanLine = l.replace(/^[-•\d\.]+\s*/, '');
          return `<li>${renderMathToHtmlString(cleanLine)}</li>`;
        }).join('');
        return `<ul class="content-list">${listItems}</ul>`;
      }
      return `<p class="content-paragraph">${renderMathToHtmlString(trimmed)}</p>`;
    }).filter(Boolean).join('\n');

    contentHtml = `
      <section class="section-block">
        <h2 class="section-title">Detailed Concepts, Derivations & Solved Numericals</h2>
        <div class="main-content-body">
          ${renderedParagraphs}
        </div>
      </section>
    `;
  }

  const generatedDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title} — GATE AG Revision Notes</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
  <style>
    /* ==========================================================================
       CLEAN ACADEMIC PRINT & PDF STYLESHEET (ZERO UI CHROME)
       ========================================================================== */
    @page {
      margin: 14mm 15mm 14mm 15mm;
      size: A4 portrait;
    }

    *, *::before, *::after {
      box-sizing: border-box;
      background: transparent !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    body {
      background-color: #ffffff !important;
      color: #111827 !important;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      font-size: 10.5pt;
      line-height: 1.55;
      margin: 0;
      padding: 0;
      max-width: 100%;
    }

    .document-header {
      border-bottom: 2pt solid #111827;
      padding-bottom: 8pt;
      margin-bottom: 12pt;
    }

    .badge-bar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 6pt;
      margin-bottom: 4pt;
      font-size: 8.5pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #374151;
    }

    .section-badge {
      background-color: #f3f4f6 !important;
      border: 0.5pt solid #d1d5db;
      padding: 2pt 6pt;
      border-radius: 3pt;
      font-weight: 700;
    }

    .topic-text {
      color: #4b5563;
    }

    h1.document-title {
      font-size: 17pt;
      font-weight: 800;
      line-height: 1.25;
      margin: 4pt 0 2pt 0;
      color: #111827;
    }

    .portal-subtitle {
      font-size: 8.5pt;
      color: #6b7280;
      font-weight: 600;
      letter-spacing: 0.3px;
    }

    .section-block {
      margin-top: 12pt;
      margin-bottom: 12pt;
    }

    h2.section-title {
      font-size: 12pt;
      font-weight: 700;
      color: #111827;
      margin-top: 12pt;
      margin-bottom: 6pt;
      border-bottom: 0.75pt solid #d1d5db;
      padding-bottom: 2pt;
      page-break-after: avoid;
      break-after: avoid;
    }

    h3.subsection-title {
      font-size: 11pt;
      font-weight: 700;
      color: #1f2937;
      margin-top: 10pt;
      margin-bottom: 4pt;
      page-break-after: avoid;
      break-after: avoid;
    }

    .content-paragraph {
      margin: 5pt 0;
      text-align: justify;
      color: #1f2937;
    }

    .formulas-container {
      display: flex;
      flex-direction: column;
      gap: 6pt;
      margin: 6pt 0;
    }

    .formula-item {
      display: flex;
      align-items: baseline;
      gap: 8pt;
      background-color: #f9fafb !important;
      border: 0.5pt solid #e5e7eb;
      border-radius: 4pt;
      padding: 6pt 10pt;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .formula-num {
      font-size: 9pt;
      font-weight: 700;
      color: #6b7280;
      flex-shrink: 0;
    }

    .formula-math {
      flex: 1;
      overflow-x: auto;
      color: #111827;
    }

    .takeaways-list, .content-list {
      margin: 5pt 0 8pt 0;
      padding-left: 18pt;
    }

    .takeaways-list li, .content-list li {
      margin-bottom: 3pt;
      color: #1f2937;
    }

    /* Mathematical Formula Typography */
    .katex {
      font-size: 1.05em !important;
      color: #000000 !important;
    }

    .katex * {
      color: #000000 !important;
      fill: #000000 !important;
    }

    .katex-display {
      margin: 6pt 0 !important;
      overflow-x: visible !important;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .document-footer {
      border-top: 0.5pt solid #d1d5db;
      padding-top: 6pt;
      margin-top: 18pt;
      display: flex;
      justify-content: space-between;
      font-size: 8pt;
      color: #6b7280;
      font-weight: 500;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    /* Screen-only Print Bar */
    .screen-toolbar {
      position: sticky;
      top: 0;
      z-index: 1000;
      background: #0f172a;
      color: #ffffff;
      padding: 8px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
      border-radius: 6px;
      font-size: 12px;
    }

    .screen-toolbar button {
      padding: 5px 12px;
      background: #2563eb;
      color: #ffffff;
      border: none;
      border-radius: 4px;
      font-weight: 700;
      cursor: pointer;
    }

    @media print {
      .screen-toolbar {
        display: none !important;
      }
      body {
        padding: 0 !important;
      }
    }
  </style>
</head>
<body>
  <div class="screen-toolbar no-print">
    <div><strong>GATE AG Study Notes — Clean Print Preview</strong></div>
    <div>
      <button type="button" onclick="window.print()">Print / Save PDF</button>
      <button type="button" onclick="window.close()" style="background:#475569;margin-left:6px;">Close</button>
    </div>
  </div>

  <article class="document-container">
    <header class="document-header">
      <div class="badge-bar">
        <span class="section-badge">${section}</span>
        ${topic ? `<span class="topic-text">• Topic: ${topic}</span>` : ''}
        <span>• Importance: ${importance}</span>
      </div>
      <h1 class="document-title">${title}</h1>
      <div class="portal-subtitle">GATE Agricultural Engineering (AG) Comprehensive Preparation Vault</div>
    </header>

    ${formulasHtml}
    ${takeawaysHtml}
    ${contentHtml}

    <footer class="document-footer">
      <div>GATE AG Prep Web Portal • Revision Notes Archive</div>
      <div>Generated: ${generatedDate} • Clean Paper Edition</div>
    </footer>
  </article>
</body>
</html>`;
}

/**
 * Triggers a completely isolated, clean print dialog for the concept note.
 * Uses a hidden iframe so the parent React interface, navbars, sidebars,
 * and dialog backdrops NEVER bleed into the print output or PDF.
 */
export function printConceptDocument(concept) {
  if (!concept) return;

  const html = generateConceptPrintHtml(concept);

  // If in non-browser environment
  if (typeof document === 'undefined') return;

  // Create an invisible iframe
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = 'none';
  iframe.style.visibility = 'hidden';
  iframe.id = 'gate_ag_print_concept_iframe';

  document.body.appendChild(iframe);

  const doc = iframe.contentWindow.document;
  doc.open();
  doc.write(html);
  doc.close();

  // Wait for iframe resources to load before triggering print
  const triggerPrint = () => {
    setTimeout(() => {
      try {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      } catch (e) {
        console.error('Print iframe invocation error:', e);
      } finally {
        setTimeout(() => {
          if (iframe.parentNode) {
            document.body.removeChild(iframe);
          }
        }, 3000);
      }
    }, 400);
  };

  if (iframe.contentWindow.document.readyState === 'complete') {
    triggerPrint();
  } else {
    iframe.onload = triggerPrint;
  }
}
