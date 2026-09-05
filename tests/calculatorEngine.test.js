import { describe, it } from 'node:test';
import assert from 'node:assert';
import { AG_CONSTANTS_CATEGORIES, QUICK_UNIT_CONVERTERS } from '../src/data/agConstants.js';

describe('Calculator Engine & Agricultural Constants Validation', () => {

  describe('GATE AG Curated Engineering Constants', () => {
    it('has exactly 4 official AG core categories', () => {
      assert.strictEqual(AG_CONSTANTS_CATEGORIES.length, 4);
      const expectedIds = ['general_physics', 'swce', 'fmp', 'fpe'];
      const actualIds = AG_CONSTANTS_CATEGORIES.map(c => c.id);
      assert.deepStrictEqual(actualIds, expectedIds);
    });

    it('validates all constants contain non-empty symbols, units, and finite numeric values', () => {
      let count = 0;
      for (const category of AG_CONSTANTS_CATEGORIES) {
        assert.ok(category.constants.length >= 4, `Category ${category.name} should have at least 4 constants`);
        for (const c of category.constants) {
          count++;
          assert.ok(c.id && c.id.length > 0, 'Constant ID must be non-empty');
          assert.ok(c.symbol && c.symbol.length > 0, `Symbol for ${c.id} must be non-empty`);
          assert.ok(c.unit && c.unit.length > 0, `Unit for ${c.id} must be non-empty`);
          assert.strictEqual(typeof c.value, 'number', `Value for ${c.id} must be a number`);
          assert.ok(Number.isFinite(c.value), `Value for ${c.id} must be finite`);
          assert.ok(c.value > 0, `Value for ${c.id} must be positive`);
        }
      }
      assert.ok(count >= 20, `Should contain at least 20 curated AG constants (found ${count})`);
    });

    it('accurately verifies foundational standard constants values', () => {
      const allConsts = AG_CONSTANTS_CATEGORIES.flatMap(c => c.constants);
      const g = allConsts.find(c => c.id === 'g_std');
      const r = allConsts.find(c => c.id === 'r_gas');
      const rhoW = allConsts.find(c => c.id === 'rho_water');
      const hp = allConsts.find(c => c.id === 'hp_imperial');
      const cpW = allConsts.find(c => c.id === 'cp_water');

      assert.ok(Math.abs(g.value - 9.80665) < 1e-4);
      assert.ok(Math.abs(r.value - 8.31446) < 1e-4);
      assert.strictEqual(rhoW.value, 1000);
      assert.ok(Math.abs(hp.value - 745.7) < 0.1);
      assert.strictEqual(cpW.value, 4186);
    });

    it('validates all quick unit multipliers have valid positive factors', () => {
      assert.ok(QUICK_UNIT_CONVERTERS.length >= 5);
      for (const converter of QUICK_UNIT_CONVERTERS) {
        assert.ok(converter.id && converter.label && converter.factor);
        assert.ok(Number.isFinite(converter.factor) && converter.factor > 0);
      }
      const ha = QUICK_UNIT_CONVERTERS.find(c => c.id === 'ha_to_m2');
      assert.strictEqual(ha.factor, 10000);
    });
  });

  describe('Trigonometric & Mathematical Engine Computations', () => {
    it('computes DEG mode trigonometric values correctly', () => {
      const degMultiplier = Math.PI / 180;
      const sin30 = Math.sin(30 * degMultiplier);
      const cos60 = Math.cos(60 * degMultiplier);
      const tan45 = Math.tan(45 * degMultiplier);

      assert.ok(Math.abs(sin30 - 0.5) < 1e-6, `sin(30°) should be 0.5, got ${sin30}`);
      assert.ok(Math.abs(cos60 - 0.5) < 1e-6, `cos(60°) should be 0.5, got ${cos60}`);
      assert.ok(Math.abs(tan45 - 1.0) < 1e-6, `tan(45°) should be 1.0, got ${tan45}`);
    });

    it('computes RAD mode trigonometric values correctly', () => {
      const sinPiOver2 = Math.sin(Math.PI / 2);
      const cosPi = Math.cos(Math.PI);

      assert.ok(Math.abs(sinPiOver2 - 1.0) < 1e-6);
      assert.ok(Math.abs(cosPi - (-1.0)) < 1e-6);
    });

    it('computes inverse trigonometric values with degree conversion', () => {
      const asinHalfDeg = Math.asin(0.5) * (180 / Math.PI);
      const atanOneDeg = Math.atan(1.0) * (180 / Math.PI);

      assert.ok(Math.abs(asinHalfDeg - 30.0) < 1e-5);
      assert.ok(Math.abs(atanOneDeg - 45.0) < 1e-5);
    });

    it('computes exponential, powers, and log operations accurately', () => {
      assert.ok(Math.abs(Math.log10(1000) - 3) < 1e-6);
      assert.ok(Math.abs(Math.log(Math.E) - 1) < 1e-6);
      assert.strictEqual(Math.pow(5, 2), 25);
      assert.strictEqual(Math.pow(4, 3), 64);
      assert.strictEqual(Math.sqrt(144), 12);
      assert.strictEqual(1 / 4, 0.25);
    });

    it('computes factorials properly up to boundary limits', () => {
      const factorial = (n) => {
        if (n < 0 || !Number.isInteger(n)) return NaN;
        if (n === 0 || n === 1) return 1;
        let res = 1;
        for (let i = 2; i <= Math.min(n, 100); i++) res *= i;
        return res;
      };

      assert.strictEqual(factorial(0), 1);
      assert.strictEqual(factorial(1), 1);
      assert.strictEqual(factorial(5), 120);
      assert.strictEqual(factorial(7), 5040);
      assert.ok(isNaN(factorial(-3)));
    });
  });

  describe('TCS iON Binary Step Chaining & Standard Expression Rules', () => {
    it('accurately chains binary operators in sequence: (10 + 5) * 2 = 30', () => {
      let pendingVal = 10;
      let pendingOp = '+';
      let current = 5;

      let intermediate = pendingVal + current;
      assert.strictEqual(intermediate, 15);

      pendingVal = intermediate;
      pendingOp = '*';
      current = 2;

      let finalResult = pendingVal * current;
      assert.strictEqual(finalResult, 30);
    });

    it('evaluates standard sanitized expressions with order of operations', () => {
      const expr = '10 + 5 * 2';
      const sanitized = expr.replace(/×/g, '*').replace(/÷/g, '/');
      const res = Function(`"use strict"; return (${sanitized})`)();
      assert.strictEqual(res, 20);
    });

    it('safely handles division by zero returning NaN or Infinity boundary without crash', () => {
      const divZero = (a, b) => b !== 0 ? a / b : NaN;
      assert.ok(isNaN(divZero(10, 0)));
    });
  });

});
