import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

// Mock localStorage for Node environment
const mockStorage = new Map();
globalThis.localStorage = {
  getItem: (key) => mockStorage.get(key) || null,
  setItem: (key, val) => mockStorage.set(key, String(val)),
  removeItem: (key) => mockStorage.delete(key),
  clear: () => mockStorage.clear()
};

import { 
  getStoredApiKey, 
  setStoredApiKey, 
  clearStoredApiKey, 
  hasApiKey,
  explainQuestionWithGemini,
  getProgressiveHint,
  askDoubtChat,
  solveGeneralDoubt
} from '../src/services/geminiService.js';

describe('Gemini AI Study Assistant & Solution Engine Tests', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  test('manages custom Gemini API key storage correctly', () => {
    assert.equal(hasApiKey(), false);
    assert.equal(getStoredApiKey(), '');

    setStoredApiKey('AIzaSyTestKey123456');
    assert.equal(hasApiKey(), true);
    assert.equal(getStoredApiKey(), 'AIzaSyTestKey123456');

    clearStoredApiKey();
    assert.equal(hasApiKey(), false);
    assert.equal(getStoredApiKey(), '');
  });

  test('generates structured offline fallback explanation when API key is missing', async () => {
    const mockQuestion = {
      id: 'Q_TEST_01',
      section: 'Farm Power and Machinery',
      topic: 'Tractors and Tillage',
      type: 'NAT',
      marks: 2,
      question: 'Calculate draft force in kN for a 3-bottom plow with total width 90 cm at 15 cm depth and specific resistance 0.5 kg/cm².',
      answer: '6.62 to 6.64',
      explanation: 'Draft D = Cs * w * d. Convert kg to N by multiplying 9.81.'
    };

    const res = await explainQuestionWithGemini(mockQuestion, '6.63', true);
    assert.equal(res.success, false);
    assert.equal(res.isOffline, true);
    assert.match(res.text, /Step-by-Step Solution Breakdown/i);
    assert.match(res.text, /Farm Power and Machinery/i);
    assert.match(res.text, /6.62 to 6.64/i);
  });

  test('generates 3 levels of progressive hints in offline mode', async () => {
    const mockQuestion = {
      id: 'Q_TEST_02',
      section: 'Soil and Water Conservation',
      topic: 'Hydrology & Aquifers',
      question: 'Determine steady state discharge from a fully penetrating well in an unconfined aquifer.',
      answer: '12.5',
      explanation: 'Use Dupuit formula for unconfined aquifer: Q = pi*K*(h2^2 - h1^2)/ln(r2/r1).'
    };

    const hint1 = await getProgressiveHint(mockQuestion, 1);
    assert.match(hint1.text, /Hint 1 \(Concept\)/i);
    assert.match(hint1.text, /Hydrology & Aquifers/i);

    const hint2 = await getProgressiveHint(mockQuestion, 2);
    assert.match(hint2.text, /Hint 2 \(Formula\)/i);
    assert.match(hint2.text, /Dupuit formula/i);

    const hint3 = await getProgressiveHint(mockQuestion, 3);
    assert.match(hint3.text, /Hint 3 \(Calculation\)/i);
    assert.match(hint3.text, /12.5/i);
  });

  test('provides graceful fallback for doubt chat without crashing', async () => {
    const mockQuestion = {
      question: 'What is the tractive efficiency of a 4WD tractor at 15% wheel slip?',
      answer: '0.72',
      topic: 'Tractor Mechanics',
      explanation: 'eta = (1 - S) * (Drawbar Pull / Tractive Force)'
    };

    const res = await askDoubtChat([], mockQuestion, 'Why do we multiply by (1 - S)?');
    assert.equal(res.success, false);
    assert.match(res.text, /Offline Assistant/i);
    assert.match(res.text, /Tractor Mechanics/i);
  });

  test('solves general doubt with offline knowledge derivation when offline', async () => {
    const resTractor = await solveGeneralDoubt('How to calculate Tractor Drawbar Power and Tractive Efficiency?');
    assert.equal(resTractor.success, true);
    assert.match(resTractor.text, /Tractor Mechanics & Drawbar Power Derivation/i);
    assert.match(resTractor.text, /Wheel Slip/i);

    const resDarcy = await solveGeneralDoubt("Explain Darcy's Law and Dupuit equation for wells");
    assert.equal(resDarcy.success, true);
    assert.match(resDarcy.text, /Darcy's Law/i);
    assert.match(resDarcy.text, /Dupuit's Equation/i);
  });

});
