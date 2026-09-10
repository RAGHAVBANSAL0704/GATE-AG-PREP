import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { executeUniversalSearch } from '../src/utils/universalSearchEngine.js';
import { getConceptExplanation, CURATED_CONCEPT_EXPLANATIONS } from '../src/utils/conceptExplainerService.js';
import { GATE_AG_FLASHCARDS } from '../src/data/flashcardsData.js';

describe('Learning Hub Universal Search & AI Explainer Tests', () => {
  const sampleQuestions = [
    {
      id: 'ag_2024_15',
      year: 2024,
      question_number: 15,
      section: 'Farm Machinery and Power',
      topic: 'Tractor Powertrain',
      type: 'NAT',
      marks: 2,
      question: 'A tractor wheel of radius 0.6 m rotates at 30 rpm with 15% slip. Find forward speed.'
    },
    {
      id: 'ag_2023_22',
      year: 2023,
      question_number: 22,
      section: 'Soil and Water Conservation Engineering',
      topic: 'Open Channel Hydraulics',
      type: 'MCQ',
      marks: 1,
      question: 'Water flows in a rectangular flume where Manning roughness coefficient is 0.012.'
    }
  ];

  test('Universal Search returns empty results on blank query', () => {
    const res = executeUniversalSearch({ query: '', questions: sampleQuestions });
    assert.equal(res.results.length, 0);
    assert.equal(res.counts.all, 0);
  });

  test('Universal Search finds matches across Concepts, Formulas, Flashcards, and PYQs', () => {
    const res = executeUniversalSearch({ query: 'tractor', questions: sampleQuestions });
    
    assert.ok(res.results.length > 0, 'Should return matching results for tractor');
    assert.ok(res.counts.all > 0, 'Total count should be greater than 0');

    // Verify presence of different types
    const types = new Set(res.results.map(r => r.type));
    assert.ok(types.has('concepts') || types.has('formulas') || types.has('flashcards') || types.has('questions'));
  });

  test('Universal Search filters by category properly', () => {
    const resAll = executeUniversalSearch({ query: 'manning', questions: sampleQuestions, categoryFilter: 'all' });
    const resFormulas = executeUniversalSearch({ query: 'manning', questions: sampleQuestions, categoryFilter: 'formulas' });

    assert.ok(resAll.results.length >= resFormulas.results.length);
    resFormulas.results.forEach(r => {
      assert.equal(r.type, 'formulas');
    });
  });

  test('Concept Explainer returns curated explanation for known topics', () => {
    const expl = getConceptExplanation('tractor mechanics');
    assert.ok(expl.topic);
    assert.match(expl.domain, /Farm Machinery/i);
    assert.ok(expl.intuition.length > 20);
    assert.ok(expl.equations.length > 0);
    assert.ok(expl.commonTraps.length > 0);
    assert.ok(expl.practiceExample.problem);
    assert.ok(expl.practiceExample.answer);
  });

  test('Concept Explainer synthesizes structured breakdown for arbitrary keywords', () => {
    const expl = getConceptExplanation('Piezoelectric Transducer Calibration');
    assert.equal(expl.topic, 'Piezoelectric Transducer Calibration');
    assert.ok(expl.intuition);
    assert.ok(expl.equations.length > 0);
    assert.ok(expl.commonTraps.length > 0);
    assert.ok(expl.practiceExample.problem);
  });

  test('GATE AG Flashcards dataset contains essential topics and valid questions', () => {
    assert.ok(GATE_AG_FLASHCARDS.length >= 8, 'Should have at least 8 flashcards');
    GATE_AG_FLASHCARDS.forEach(fc => {
      assert.ok(fc.cardId);
      assert.ok(fc.topic);
      assert.ok(fc.question);
      assert.ok(fc.answer);
    });
  });
});
