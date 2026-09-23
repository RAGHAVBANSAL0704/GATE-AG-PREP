import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { 
  retrieveRelevantContext, 
  getProgressiveHint, 
  diagnoseStudentMistake, 
  explainQuestionWithGemini, 
  solveGeneralDoubt 
} from '../src/services/geminiService.js';

describe('AI Study Assistant - Local RAG & Pedagogical Engine Tests', () => {

  it('retrieves relevant high-yield formulas and concepts for Tractor Drawbar & Wheel Slip', () => {
    const res = retrieveRelevantContext({
      section: 'Farm Machinery and Power',
      topic: 'Tractors and Power Transmission Systems',
      queryText: 'calculate drawbar power and wheel slip of a 2WD tractor with pull 15 kN at 5 km/h'
    });

    assert.ok(res, 'RAG response should exist');
    assert.ok(Array.isArray(res.formulas), 'Formulas should be an array');
    assert.ok(res.formulas.length > 0, 'Should find at least 1 matching formula');
    assert.ok(typeof res.contextMarkdown === 'string', 'Should return formatted markdown context');
    assert.ok(res.contextMarkdown.includes('### Verified Official GATE AG Knowledge Base'));
    
    // Check that matched formulas contain tractor mechanics
    const titles = res.formulas.map(f => f.title.toLowerCase());
    const hasDrawbarOrSlip = titles.some(t => t.includes('drawbar') || t.includes('slip') || t.includes('tractive') || t.includes('power') || t.includes('tractor'));
    assert.ok(hasDrawbarOrSlip, 'Should retrieve tractor mechanics formulas');
  });

  it('retrieves relevant formulas for Groundwater Hydraulics (Darcy & Aquifers)', () => {
    const res = retrieveRelevantContext({
      section: 'Soil and Water Conservation Engineering',
      topic: 'Groundwater Hydrology, Well Hydraulics and Tubewells',
      queryText: 'discharge from a confined aquifer using Thiem formula with hydraulic conductivity'
    });

    assert.ok(res.formulas.length > 0, 'Should retrieve formulas for well hydraulics');
    assert.ok(res.contextMarkdown.length > 0, 'Markdown context should be non-empty');
  });

  it('retrieves relevant concepts and takeaways for Psychrometrics and Drying', () => {
    const res = retrieveRelevantContext({
      section: 'Agricultural Processing and Food Engineering',
      topic: 'Drying and Dehydration',
      queryText: 'moisture content wet basis and dry basis drying equilibrium psychrometric chart'
    });

    assert.ok(res.formulas.length > 0 || res.concepts.length > 0, 'Should retrieve formulas or concepts');
    assert.ok(res.contextMarkdown.includes('Official GATE AG Knowledge Base'));
  });

  it('generates offline 3-tier progressive hints', async () => {
    const sampleQuestion = {
      id: 'Q_TEST_01',
      question: 'A tractor developing 30 kW axle power travels at 5 km/h with a drawbar pull of 14 kN. Determine the tractive efficiency in percent.',
      section: 'Farm Machinery and Power',
      topic: 'Tractors and Power Transmission Systems',
      correct_answer: '64.81',
      explanation: 'Drawbar power P_db = (Pull * Speed) / 3.6 = (14 * 5) / 3.6 = 19.44 kW. Efficiency = 19.44 / 30 = 64.81%.'
    };

    const hint1 = await getProgressiveHint(sampleQuestion, 1);
    assert.ok(hint1.text, 'Hint 1 must return text');
    assert.ok(hint1.text.includes('Hint 1'), 'Must identify as Hint 1');
    assert.ok(hint1.text.includes('Concept'), 'Must be concept-level');

    const hint2 = await getProgressiveHint(sampleQuestion, 2);
    assert.ok(hint2.text, 'Hint 2 must return text');
    assert.ok(hint2.text.includes('Hint 2'), 'Must identify as Hint 2');
    assert.ok(hint2.text.includes('Formula'), 'Must provide governing formula');

    const hint3 = await getProgressiveHint(sampleQuestion, 3);
    assert.ok(hint3.text, 'Hint 3 must return text');
    assert.ok(hint3.text.includes('Hint 3'), 'Must identify as Hint 3');
    assert.ok(hint3.text.includes('64.81'), 'Hint 3 should point towards answer boundary');
  });

  it('performs heuristic forensic mistake diagnosis for unit traps (km/h vs m/s 3.6x factor)', async () => {
    const sampleQuestion = {
      id: 'Q_TEST_02',
      question: 'Calculate drawbar power in kW with pull 18 kN and forward velocity 6 km/h.',
      section: 'Farm Machinery and Power',
      topic: 'Tractors and Power Transmission Systems',
      correct_answer: '30.0', // (18 * 6) / 3.6 = 30 kW
      explanation: 'P_db = (Pull in kN * Speed in km/h) / 3.6 = 30 kW.'
    };

    // Student calculated 18 * 6 = 108 kW (forgot 3.6 conversion)
    const diagnosis = await diagnoseStudentMistake(sampleQuestion, '108.0', false);
    assert.ok(diagnosis.text, 'Must generate diagnosis');
    assert.ok(diagnosis.text.includes('Forensic Mistake Diagnostic'), 'Must have diagnostic header');
    assert.ok(diagnosis.text.includes('3.6') || diagnosis.text.includes('Speed Unit'), 'Must detect 3.6x speed conversion trap');
  });

  it('performs heuristic forensic mistake diagnosis for radius vs diameter trap (4x factor)', async () => {
    const sampleQuestion = {
      id: 'Q_TEST_03',
      question: 'Find the cross-sectional area of a circular conduit of diameter 2 m.',
      section: 'Soil and Water Conservation Engineering',
      topic: 'Open Channel Hydraulics and Surface Irrigation Systems',
      correct_answer: '3.14', // pi * 1^2 = 3.14 m^2
      explanation: 'A = pi * D^2 / 4 = 3.1416 m^2.'
    };

    // Student used pi * D^2 = 12.56 (differ by factor of 4)
    const diagnosis = await diagnoseStudentMistake(sampleQuestion, '12.56', false);
    assert.ok(diagnosis.text, 'Must generate diagnosis');
    assert.ok(diagnosis.text.includes('Diameter vs Radius') || diagnosis.text.includes('4'), 'Must detect 4x area factor trap');
  });

  it('generates offline question explanation grounded with RAG knowledge base', async () => {
    const question = {
      id: 'PYQ_TEST_2022',
      question: 'Water flows through a rectangular channel of width 2 m at depth 1 m. Manning roughness is 0.015 and bed slope is 0.001. Find flow rate.',
      section: 'Soil and Water Conservation Engineering',
      topic: 'Open Channel Hydraulics and Surface Irrigation Systems',
      correct_answer: '2.52',
      explanation: 'Q = (1/n) * A * R^(2/3) * S^(1/2). Area A = 2 m^2, Perimeter P = 4 m, R = 0.5 m.'
    };

    const explanation = await explainQuestionWithGemini(question);
    assert.ok(explanation.text, 'Must return offline explanation');
    assert.equal(explanation.isOffline, true);
    assert.ok(explanation.text.includes('Step-by-Step Solution Breakdown'));
    assert.ok(explanation.text.includes('2.52'));
  });

  it('runs solveGeneralDoubt in offline mode with grounded sources', async () => {
    const doubt = 'How do I calculate tractive efficiency and wheel slip of a 4WD tractor?';
    const result = await solveGeneralDoubt(doubt, { solverMode: 'rigorous' });
    
    assert.ok(result.text, 'Result text should exist');
    assert.equal(result.isOffline, true);
    assert.ok(result.text.includes('Tractor Mechanics & Drawbar Power Derivation'));
    assert.ok(Array.isArray(result.sources), 'Sources should be returned from local RAG');
  });

});
