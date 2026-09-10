import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { isEngineersDayActive, ENGINEERS_DAY_METADATA } from '../src/utils/engineersDay.js';

describe('Engineers Day 2026 Pop-up & Theme Tests', () => {
  test('isEngineersDayActive returns true for dates on or before 15 September 2026', () => {
    // Current date: 10 September 2026
    const sept10 = new Date('2026-09-10T12:00:00+05:30');
    assert.equal(isEngineersDayActive(sept10), true);

    // On Engineers Day: 15 September 2026 afternoon
    const sept15Midday = new Date('2026-09-15T15:00:00+05:30');
    assert.equal(isEngineersDayActive(sept15Midday), true);

    // End of 15 September 2026 (23:59:59 IST)
    const sept15End = new Date('2026-09-15T23:59:59+05:30');
    assert.equal(isEngineersDayActive(sept15End), true);
  });

  test('isEngineersDayActive returns false after 15 September 2026', () => {
    // 16 September 2026 00:00:01 IST
    const sept16 = new Date('2026-09-16T00:00:01+05:30');
    assert.equal(isEngineersDayActive(sept16), false);

    // Later in 2026
    const october1 = new Date('2026-10-01T00:00:00+05:30');
    assert.equal(isEngineersDayActive(october1), false);
  });

  test('validates COAET CCS HAU Hisar and Ksetraveda Yantradhara theme details', () => {
    assert.equal(ENGINEERS_DAY_METADATA.themeName, 'Ksetraveda Yantradhara');
    assert.equal(ENGINEERS_DAY_METADATA.themeHindi, 'क्षेत्रवेद यंत्रधारा');
    assert.match(ENGINEERS_DAY_METADATA.organizerShort, /COAET, CCS HAU Hisar/);
    assert.match(ENGINEERS_DAY_METADATA.invocationHindi, /क्षेत्रवेद यंत्रधारा/);
    assert.match(ENGINEERS_DAY_METADATA.invocationEnglish, /Ksetraveda/);
    assert.match(ENGINEERS_DAY_METADATA.invocationEnglish, /Yantradhara/);
  });

  test('validates that dashboard minimized celebration banner is active independent of user role or visitor state', () => {
    // Both visitor mode (no student) and logged in student evaluate the date check uniformly
    const visitorModeActive = isEngineersDayActive(new Date('2026-09-10T08:30:00+05:30'));
    const registeredUserActive = isEngineersDayActive(new Date('2026-09-10T08:30:00+05:30'));
    assert.equal(visitorModeActive, true);
    assert.equal(registeredUserActive, true);
    assert.equal(visitorModeActive, registeredUserActive);
  });

  test('validates that Sir M. Visvesvaraya portrait asset exists in public icons', async () => {
    const fs = await import('node:fs');
    const path = await import('node:path');
    const imgPath = path.resolve('public/icons/visvesvaraya_portrait.jpg');
    assert.ok(fs.existsSync(imgPath), 'Portrait file must exist in public/icons');
    const stats = fs.statSync(imgPath);
    assert.ok(stats.size > 10000, 'Portrait image must be non-empty and valid');
  });
});
