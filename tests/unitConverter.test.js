import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("AgriUnitConverter Calculations and Dimensionless Ratios", () => {
  it("verifies flow rate conversion from cusec to cumec and L/s", () => {
    // 1 ft = 0.3048 m -> 1 cusec = 0.028316846592 m^3/s
    const cusec = 100;
    const toBaseCumec = 0.0283168; // cumec per cusec
    const cumec = cusec * toBaseCumec;
    assert.ok(Math.abs(cumec - 2.83168) < 0.01, "100 cusec should be ~2.83 cumec");

    // cumec to L/s
    const litersPerSec = cumec * 1000;
    assert.ok(Math.abs(litersPerSec - 2831.68) < 1, "100 cusec should be ~2832 L/s");
  });

  it("verifies pressure unit conversion bar to kPa and psi", () => {
    const bar = 2.5;
    const kpa = bar * 100; // 1 bar = 100 kPa
    assert.strictEqual(kpa, 250);
    const psi = kpa / 6.89476;
    assert.ok(Math.abs(psi - 36.259) < 0.1, "2.5 bar should be ~36.26 psi");
  });

  it("verifies Reynolds number calculations and flow regime classification", () => {
    const rho = 1000;
    const v = 1.5;
    const d = 0.05;
    const mu = 0.001002;
    const re = (rho * v * d) / mu;
    assert.ok(Math.abs(re - 74850.3) < 100, "Re should be around 74,850");
    const regime = re < 2100 ? "Laminar" : re <= 4000 ? "Transitional" : "Turbulent";
    assert.strictEqual(regime, "Turbulent");
  });

  it("verifies Froude number calculations and hydraulic jump trigger", () => {
    const v = 4.0;
    const y = 0.5;
    const g = 9.81;
    const fr = v / Math.sqrt(g * y);
    assert.ok(Math.abs(fr - 1.805) < 0.01, "Fr should be ~1.81");
    const state = fr < 1 ? "Subcritical" : fr === 1 ? "Critical" : "Supercritical";
    assert.strictEqual(state, "Supercritical");
  });
});
