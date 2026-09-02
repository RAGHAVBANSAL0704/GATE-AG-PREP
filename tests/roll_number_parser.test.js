import test from 'node:test';
import assert from 'node:assert/strict';
import { parseAdmissionRollNumber } from '../src/utils/rollNumberParser.js';

test('Smart Roll Number & Admission Number Auto-Parser Test Suite', async (t) => {

  await t.test('correctly parses standard 4-year CCS HAU B.Tech format (2022AE01BIV)', () => {
    const res = parseAdmissionRollNumber('2022AE01BIV');
    assert.equal(res.isValid, true);
    assert.equal(res.admissionYear, 2022);
    assert.equal(res.graduationYear, 2026);
    assert.equal(res.durationYears, 4);
    assert.equal(res.isLateral, false);
    assert.ok(res.degree.includes('B.Tech'));
    assert.ok(res.summaryBadge.includes('2022–2026'));
  });

  await t.test('correctly detects CCS HAU Lateral Entry diploma format (2023AE05BLII)', () => {
    const res = parseAdmissionRollNumber('2023AE05BLII');
    assert.equal(res.isValid, true);
    assert.equal(res.admissionYear, 2023);
    assert.equal(res.graduationYear, 2026);
    assert.equal(res.durationYears, 3);
    assert.equal(res.isLateral, true);
    assert.ok(res.degree.includes('Lateral Entry'));
  });

  await t.test('correctly parses IIT Kharagpur Agricultural Engg format (22AG10015)', () => {
    const res = parseAdmissionRollNumber('22AG10015');
    assert.equal(res.isValid, true);
    assert.equal(res.admissionYear, 2022);
    assert.equal(res.graduationYear, 2026);
    assert.ok(res.degree.includes('Agricultural & Food Engineering'));
  });

  await t.test('correctly parses IIT M.Tech format (22AG60R04)', () => {
    const res = parseAdmissionRollNumber('22AG60R04');
    assert.equal(res.isValid, true);
    assert.equal(res.admissionYear, 2022);
    assert.equal(res.graduationYear, 2024);
    assert.equal(res.programLevel, 'PG');
    assert.ok(res.degree.includes('M.Tech'));
  });

  await t.test('correctly parses generic SAU formatted roll numbers (CTAE-2023-019)', () => {
    const res = parseAdmissionRollNumber('CTAE-2023-019');
    assert.equal(res.isValid, true);
    assert.equal(res.admissionYear, 2023);
    assert.equal(res.graduationYear, 2027);
  });

  await t.test('handles invalid / too short inputs safely without crashing', () => {
    assert.equal(parseAdmissionRollNumber('').isValid, false);
    assert.equal(parseAdmissionRollNumber('AB').isValid, false);
    assert.equal(parseAdmissionRollNumber(null).isValid, false);
  });
});
