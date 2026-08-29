/**
 * AI "AG-Forensic" Progressive Hint & Unit Error Detector Engine
 * Provides multi-tier hint steps for Agricultural Engineering practice questions
 * and detects numerical unit scale mismatches (e.g., kW vs W, m/s vs km/h, ha vs m2).
 */

export function getProgressiveHints(question) {
  if (!question) return [];

  // Check if admin disabled hints for this question
  if (question.disable_hints) {
    return [];
  }

  // Check if admin provided custom hints for this question
  if (Array.isArray(question.hints) && question.hints.length > 0) {
    return question.hints.map((hText, idx) => ({
      level: idx + 1,
      title: `Custom Hint Level ${idx + 1}/3`,
      content: hText
    }));
  }

  const topic = question.topic || '';
  const subtopic = question.subtopic || '';
  const qText = question.question || '';
  const solText = question.solution || '';

  const hints = [];

  // Level 1: Core Formula & Engineering Principles
  if (topic.includes('Farm Machinery') || topic.includes('FMP')) {
    hints.push({
      level: 1,
      title: 'Core Concept & Key Formula',
      content: 'Identify the governing draft / power equation: Power (kW) = [Draft Force (kN) × Speed (km/h)] / 3.6, or Field Capacity (ha/h) = [S × W × E] / 10.'
    });
  } else if (topic.includes('Soil') || topic.includes('Water') || topic.includes('SWCE')) {
    hints.push({
      level: 1,
      title: 'Core Concept & Key Formula',
      content: 'Use Rational Peak Discharge Q = (C · I · A) / 360 where Q is in m³/s, I in mm/h, and A in hectares.'
    });
  } else if (topic.includes('Processing') || topic.includes('Food') || topic.includes('APFE')) {
    hints.push({
      level: 1,
      title: 'Core Concept & Key Formula',
      content: 'Apply Moisture Content Relationship: MC(db) = MC(wb) / [1 - MC(wb)] or Energy Balance Q = m · C_p · ΔT.'
    });
  } else {
    hints.push({
      level: 1,
      title: 'Core Concept & Key Formula',
      content: 'Review standard engineering definitions and unit balance equations for this topic.'
    });
  }

  // Level 2: Unit Conversions & Given Parameters Guide
  hints.push({
    level: 2,
    title: 'Unit Conversion Checklist',
    content: 'Check your SI units: 1 ha = 10,000 m², 1 m/s = 3.6 km/h, 1 bar = 100 kPa = 10⁵ Pa, 1 kW = 1000 W.'
  });

  // Level 3: Algebraic Step / Solution Lead-in
  if (solText.length > 20) {
    const preview = solText.split('\n')[0].replace(/\\\[|\\\]/g, '');
    hints.push({
      level: 3,
      title: 'Final Solution Step Lead-in',
      content: `Hint from solution derivation: "${preview.slice(0, 140)}..."`
    });
  } else {
    hints.push({
      level: 3,
      title: 'Algebraic Calculation',
      content: 'Substitute given values directly into the formula and solve step-by-step.'
    });
  }

  return hints;
}

export function detectNATUnitMismatch(userInput, question) {
  if (!question || question.type !== 'NAT') return null;

  const uVal = parseFloat(String(userInput).trim());
  const cVal = parseFloat(String(question.correct_answer || question.answer || '').trim());

  if (isNaN(uVal) || isNaN(cVal) || cVal === 0) return null;

  const ratio = uVal / cVal;

  if (Math.abs(ratio - 1000) < 5) {
    return '⚠️ Unit scale alert! Your answer is 1000× larger than expected (e.g. Watts instead of kW, or meters instead of km).';
  }
  if (Math.abs(ratio - 0.001) < 0.0005) {
    return '⚠️ Unit scale alert! Your answer is 1000× smaller than expected (e.g. kW instead of W, or km instead of m).';
  }
  if (Math.abs(ratio - 3.6) < 0.1) {
    return '⚠️ Velocity conversion alert! Your answer matches a km/h to m/s factor of 3.6.';
  }
  if (Math.abs(ratio - (1 / 3.6)) < 0.02) {
    return '⚠️ Velocity conversion alert! Check if you multiplied or divided by 3.6.';
  }
  if (ratio === -1) {
    return '⚠️ Sign reversal alert! Check coordinate axes or direction of force/flow vector.';
  }

  return null;
}
