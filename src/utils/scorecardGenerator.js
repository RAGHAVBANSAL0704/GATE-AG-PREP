/**
 * Scorecard Image Generator
 * Generates an ultra-crisp 1200x630 HD social share image card using HTML5 Canvas.
 * Ready for WhatsApp Status, LinkedIn, Telegram, and Instagram sharing.
 */

export async function generateScorecardBlob({
  title = 'GATE AG CBT Mock Test',
  studentName = 'Candidate',
  score = 0,
  totalMarks = 100,
  accuracy = 0,
  airTier = 'AIR Benchmark Tier',
  correctCount = 0,
  incorrectCount = 0,
  unattemptedCount = 0,
  date = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}) {
  const width = 1200;
  const height = 630;

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // 1. Deep Gradient Background
  const bgGrad = ctx.createLinearGradient(0, 0, width, height);
  bgGrad.addColorStop(0, '#020617'); // slate-950
  bgGrad.addColorStop(0.5, '#0f172a'); // slate-900
  bgGrad.addColorStop(1, '#064e3b'); // emerald-950
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // Background glow circles
  const glowGrad1 = ctx.createRadialGradient(150, 150, 0, 150, 150, 300);
  glowGrad1.addColorStop(0, 'rgba(16, 185, 129, 0.15)');
  glowGrad1.addColorStop(1, 'transparent');
  ctx.fillStyle = glowGrad1;
  ctx.beginPath();
  ctx.arc(150, 150, 300, 0, Math.PI * 2);
  ctx.fill();

  const glowGrad2 = ctx.createRadialGradient(1050, 480, 0, 1050, 480, 350);
  glowGrad2.addColorStop(0, 'rgba(99, 102, 241, 0.15)');
  glowGrad2.addColorStop(1, 'transparent');
  ctx.fillStyle = glowGrad2;
  ctx.beginPath();
  ctx.arc(1050, 480, 350, 0, Math.PI * 2);
  ctx.fill();

  // 2. Card Outer Border & Shadow Container
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
  ctx.lineWidth = 2;
  ctx.strokeRect(40, 40, width - 80, height - 80);

  // Inner Accent Line Top
  const topAccent = ctx.createLinearGradient(40, 40, width - 40, 40);
  topAccent.addColorStop(0, '#10b981');
  topAccent.addColorStop(0.5, '#06b6d4');
  topAccent.addColorStop(1, '#6366f1');
  ctx.fillStyle = topAccent;
  ctx.fillRect(40, 40, width - 80, 6);

  // 3. Header Pill: GATE AG PREP PORTAL
  ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
  ctx.beginPath();
  ctx.roundRect(70, 75, 290, 36, 18);
  ctx.fill();
  ctx.strokeStyle = 'rgba(52, 211, 153, 0.4)';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = '#34d399';
  ctx.font = 'bold 14px system-ui, -apple-system, sans-serif';
  ctx.fillText('🎓  GATE AG PREP PORTAL', 95, 98);

  // Date Tag (Top Right)
  ctx.fillStyle = '#94a3b8';
  ctx.font = 'medium 15px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText(`📅  ${date}`, width - 75, 98);
  ctx.textAlign = 'left';

  // 4. Main Paper Title & Candidate Name
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 36px system-ui, -apple-system, sans-serif';
  const cleanTitle = title.length > 38 ? `${title.slice(0, 35)}...` : title;
  ctx.fillText(cleanTitle, 70, 160);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '500 18px system-ui, -apple-system, sans-serif';
  ctx.fillText(`Candidate: ${studentName}`, 70, 195);

  // 5. Hero Score Display Card
  const scoreCardX = 70;
  const scoreCardY = 230;
  const scoreCardW = 460;
  const scoreCardH = 240;

  // Score container box
  ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
  ctx.beginPath();
  ctx.roundRect(scoreCardX, scoreCardY, scoreCardW, scoreCardH, 24);
  ctx.fill();
  ctx.strokeStyle = 'rgba(52, 211, 153, 0.3)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#94a3b8';
  ctx.font = 'bold 15px system-ui, -apple-system, sans-serif';
  ctx.fillText('FINAL SCORE OBTAINED', scoreCardX + 30, scoreCardY + 45);

  // Big Marks Text
  ctx.fillStyle = '#10b981';
  ctx.font = '900 76px system-ui, -apple-system, sans-serif';
  ctx.fillText(`${Number(score).toFixed(2)}`, scoreCardX + 30, scoreCardY + 125);

  ctx.fillStyle = '#64748b';
  ctx.font = 'bold 24px system-ui, -apple-system, sans-serif';
  ctx.fillText(`/ ${totalMarks} Marks`, scoreCardX + 300, scoreCardY + 115);

  // Tier Badge inside score card
  ctx.fillStyle = 'rgba(16, 185, 129, 0.2)';
  ctx.beginPath();
  ctx.roundRect(scoreCardX + 30, scoreCardY + 160, scoreCardW - 60, 48, 12);
  ctx.fill();
  ctx.strokeStyle = 'rgba(52, 211, 153, 0.5)';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = '#6ee7b7';
  ctx.font = 'bold 18px system-ui, -apple-system, sans-serif';
  ctx.fillText(`🏆  Estimated: ${airTier}`, scoreCardX + 50, scoreCardY + 192);

  // 6. Right Column Stats (Accuracy, Correct, Incorrect, Unattempted)
  const statsX = 570;
  const statsY = 230;
  const statBoxW = 265;
  const statBoxH = 110;

  // Box 1: Accuracy
  drawStatBox(ctx, statsX, statsY, statBoxW, statBoxH, 'ACCURACY RATE', `${Number(accuracy).toFixed(1)}%`, '#38bdf8', '🎯');

  // Box 2: Correct
  drawStatBox(ctx, statsX + 285, statsY, statBoxW, statBoxH, 'CORRECT ANSWERS', `${correctCount} Qs`, '#4ade80', '✅');

  // Box 3: Incorrect
  drawStatBox(ctx, statsX, statsY + 130, statBoxW, statBoxH, 'INCORRECT', `${incorrectCount} Qs`, '#f87171', '❌');

  // Box 4: Unattempted
  drawStatBox(ctx, statsX + 285, statsY + 130, statBoxW, statBoxH, 'UNATTEMPTED', `${unattemptedCount} Qs`, '#94a3b8', '⚪');

  // 7. Footer Attribution & Signature
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.fillRect(40, height - 90, width - 80, 50);

  ctx.fillStyle = '#cbd5e1';
  ctx.font = 'bold 15px system-ui, -apple-system, sans-serif';
  ctx.fillText('Crafted with ❤️ by Raghav Bansal  •  COAET CCS HAU Hisar', 70, height - 58);

  ctx.fillStyle = '#34d399';
  ctx.font = 'bold 14px monospace, system-ui, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('gate-ag-prep.vercel.app', width - 75, height - 58);
  ctx.textAlign = 'left';

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), 'image/png');
  });
}

function drawStatBox(ctx, x, y, w, h, label, value, color, icon) {
  ctx.fillStyle = 'rgba(15, 23, 42, 0.6)';
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 16);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = '#94a3b8';
  ctx.font = 'bold 12px system-ui, -apple-system, sans-serif';
  ctx.fillText(`${icon}  ${label}`, x + 20, y + 34);

  ctx.fillStyle = color;
  ctx.font = '900 38px system-ui, -apple-system, sans-serif';
  ctx.fillText(value, x + 20, y + 84);
}

export async function downloadScorecardImage(payload, filename = 'GATE_AG_Scorecard.png') {
  const blob = await generateScorecardBlob(payload);
  if (!blob) return;
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function copyScorecardImage(payload) {
  const blob = await generateScorecardBlob(payload);
  if (!blob) return false;
  try {
    if (navigator.clipboard && window.ClipboardItem) {
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      return true;
    }
    return false;
  } catch (err) {
    console.warn('Clipboard copy error:', err);
    return false;
  }
}
