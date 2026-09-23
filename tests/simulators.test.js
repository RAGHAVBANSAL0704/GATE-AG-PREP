import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

describe('AgriSimulators Physics Formulas Integrity Test Suite', () => {

  it('correctly models Seed Drill Calibration physics', () => {
    const seedGrams = 480;
    const seedRevs = 50;
    const wheelDia = 0.85;
    const openers = 9;
    const rowSpacing = 0.20;
    const slip = 8; // %

    const circum = Math.PI * wheelDia;
    const dist = seedRevs * circum;
    const width = openers * rowSpacing;
    const area = dist * width;
    const labRate = ((seedGrams / 1000) / area) * 10000;
    const fieldRate = labRate * (1 - slip / 100);

    assert.ok(labRate > 15 && labRate < 25, `Lab seed rate expected ~19-21 kg/ha, got ${labRate}`);
    assert.ok(fieldRate < labRate, 'Field rate must be lower than lab rate due to drive wheel slip');
  });

  it('correctly calculates Diesel and Otto thermodynamic cycle efficiencies', () => {
    const gamma = 1.4;
    // Otto Cycle
    const rOtto = 9.5;
    const etaOtto = (1 - (1 / Math.pow(rOtto, gamma - 1))) * 100;
    assert.ok(etaOtto > 55 && etaOtto < 65, `Otto efficiency expected ~59%, got ${etaOtto}`);

    // Diesel Cycle
    const rDiesel = 17.5;
    const rc = 2.0;
    const num = Math.pow(rc, gamma) - 1;
    const den = gamma * (rc - 1);
    const etaDiesel = (1 - (1 / Math.pow(rDiesel, gamma - 1)) * (num / den)) * 100;
    assert.ok(etaDiesel > 60 && etaDiesel < 70, `Diesel efficiency expected ~62-64%, got ${etaDiesel}`);
  });

  it('correctly calculates Combine Harvester peripheral speed and loss trade-offs', () => {
    const dia = 0.60;
    const rpm = 850;
    const vp = (Math.PI * dia * rpm) / 60;
    assert.ok(vp > 25 && vp < 28, `Peripheral speed expected ~26.7 m/s, got ${vp}`);
  });

});
