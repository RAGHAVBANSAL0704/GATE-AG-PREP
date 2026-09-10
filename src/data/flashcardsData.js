/**
 * High-Yield Spaced Repetition Flashcards Data for GATE AG
 */
export const GATE_AG_FLASHCARDS = [
  { cardId: 'fc_1', topic: 'FMP', question: 'What is the standard PTO speed for tractors specified by BIS?', answer: '540 ± 10 rpm (Standard I) and 1000 ± 25 rpm (Standard II).' },
  { cardId: 'fc_2', topic: 'FMP', question: 'Formula for Theoretical Field Capacity (TFC)?', answer: 'TFC (ha/h) = \\frac{S \\times W}{10} where S = Speed (km/h) and W = Working Width (m).' },
  { cardId: 'fc_3', topic: 'SWCE', question: 'Rational Method Formula for Peak Runoff Discharge?', answer: 'Q = \\frac{C \\cdot I \\cdot A}{360} where Q in m³/s, C = runoff coeff, I in mm/h, A in hectares.' },
  { cardId: 'fc_4', topic: 'SWCE', question: 'What is the Critical Hydraulic Gradient (i_c) in Soil Mechanics?', answer: 'i_c = \\frac{G - 1}{1 + e} = (G - 1)(1 - n) where G = specific gravity, e = void ratio.' },
  { cardId: 'fc_5', topic: 'APFE', question: 'Relationship between Moisture Content Wet Basis (M_w) and Dry Basis (M_d)?', answer: 'M_d = \\frac{M_w}{1 - M_w} \\quad \\text{or} \\quad M_w = \\frac{M_d}{1 + M_d}.' },
  { cardId: 'fc_6', topic: 'APFE', question: 'Kick\'s Law of Size Reduction?', answer: 'E = C \\ln \\left(\\frac{D_1}{D_2}\\right). Energy is proportional to ratio of initial to final size.' },
  { cardId: 'fc_7', topic: 'Maths', question: 'Euler-Cauchy Differential Equation Form?', answer: 'x^2 \\frac{d^2y}{dx^2} + a x \\frac{dy}{dx} + b y = 0. Substitution: x = e^z.' },
  { cardId: 'fc_8', topic: 'FMP', question: 'Tractor Wheel Slip Formula?', answer: 'S = \\left( 1 - \\frac{V_a}{V_t} \\right) \\times 100\\% where V_a = actual speed, V_t = theoretical speed.' },
  { cardId: 'fc_9', topic: 'SWCE', question: 'Manning\'s Equation for Velocity in Open Channel?', answer: 'V = \\frac{1}{n} R^{2/3} S^{1/2} where R = A/P and S = hydraulic bed slope.' },
  { cardId: 'fc_10', topic: 'APFE', question: 'Rittinger\'s Law of Comminution?', answer: 'E = C \\left( \\frac{1}{D_2} - \\frac{1}{D_1} \\right). Energy consumed is proportional to new surface area created.' },
  { cardId: 'fc_11', topic: 'FMP', question: 'Specific Fuel Consumption (SFC) definition?', answer: 'SFC = \\frac{\\text{Fuel Consumption Rate (kg/h)}}{\\text{Brake Power (kW)}}. Unit is kg/(kW·h).' },
  { cardId: 'fc_12', topic: 'SWCE', question: 'Darcy\'s Law for Flow through Porous Media?', answer: 'Q = -K \\cdot A \\cdot \\frac{dh}{dL} where K is hydraulic conductivity and dh/dL is hydraulic gradient.' }
];
