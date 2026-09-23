import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { GATE_AG_FORMULAS, evaluateFormulaSolver } from '../src/data/formulas.js';

describe('GATE AG Formula Sheet & Interactive Solvers Test Suite', () => {

  it('contains at least 120 formulas across the curriculum', () => {
    let count = 0;
    GATE_AG_FORMULAS.forEach(c => {
      c.topics.forEach(t => {
        count += t.formulas.length;
      });
    });
    assert.ok(count >= 120, `Expected at least 120 formulas, got ${count}`);
  });

  it('covers all 8 official GATE AG syllabus sections', () => {
    const sectionCodes = new Set(GATE_AG_FORMULAS.map(c => c.code));
    const expected = ['EM', 'FMP', 'FP', 'SWCE', 'IDE', 'APE', 'DFE', 'GA'];
    expected.forEach(code => {
      assert.ok(sectionCodes.has(code), `Missing section code: ${code}`);
    });
  });

  it('validates schema requirements for every formula', () => {
    GATE_AG_FORMULAS.forEach(cat => {
      assert.ok(cat.category, 'Category must have name');
      assert.ok(cat.code, 'Category must have code');
      assert.ok(Array.isArray(cat.topics) && cat.topics.length > 0, `Category ${cat.code} must have topics`);

      cat.topics.forEach(top => {
        assert.ok(top.topicName, 'Topic must have name');
        assert.ok(Array.isArray(top.formulas) && top.formulas.length > 0, `Topic ${top.topicName} must have formulas`);

        top.formulas.forEach((f, idx) => {
          assert.ok(f.title && f.title.trim().length > 0, `Formula #${idx} in ${top.topicName} missing title`);
          assert.ok(f.formula && f.formula.trim().length > 0, `Formula ${f.title} missing equation`);
          assert.ok(f.explanation && f.explanation.trim().length > 0, `Formula ${f.title} missing explanation`);
        });
      });
    });
  });

  it('correctly executes interactive numerical solvers', () => {
    const ipRes = evaluateFormulaSolver('solver_ind_power', {
      pm: 600, L: 0.12, D: 0.10, N: 2200, n: 4, isFourStroke: true
    });
    assert.ok(ipRes && typeof ipRes.value === 'number' && ipRes.value > 0);
    assert.strictEqual(ipRes.unit, 'kW');
    assert.ok(ipRes.steps.length >= 3);

    const bpRes = evaluateFormulaSolver('solver_brake_power', {
      torque: 300, rpm: 2000
    });
    assert.ok(bpRes && bpRes.value > 0);
    assert.strictEqual(bpRes.unit, 'kW');

    const qRes = evaluateFormulaSolver('solver_runoff_rational', {
      C: 0.5, I: 72, A: 100
    });
    assert.ok(qRes && qRes.value === 10);
    assert.strictEqual(qRes.unit, 'm³/s');

    const hjRes = evaluateFormulaSolver('solver_hydraulic_jump', {
      y1: 0.5, Fr1: 4.0
    });
    assert.ok(hjRes && hjRes.value > 0.5);

    const reRes = evaluateFormulaSolver('solver_reynolds', {
      rho: 1000, velocity: 2, diameter: 0.05, viscosity: 0.001
    });
    assert.ok(reRes && reRes.value === 100000);
  });

});
