import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  OFFICIAL_GATE_PAPERS_META,
  CENTRAL_GATE_PORTALS,
  getOfficialGatePaperMeta
} from '../src/data/officialGatePapersMeta.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDownloadsDir = path.resolve(__dirname, '../public/downloads');

test('Official Organizing Institutes & Copyright Compliance Test Suite', async (t) => {
  await t.test('OFFICIAL_GATE_PAPERS_META contains all 20 years from 2007 to 2026', () => {
    assert.strictEqual(OFFICIAL_GATE_PAPERS_META.length, 20, 'Must contain exactly 20 official GATE AG years');

    for (let y = 2007; y <= 2026; y++) {
      const yearStr = String(y);
      const meta = OFFICIAL_GATE_PAPERS_META.find(item => item.year === yearStr);
      assert.ok(meta, `Missing official metadata for GATE ${yearStr}`);
      assert.ok(meta.institute && meta.institute.length > 0, `Institute name missing for GATE ${yearStr}`);
      assert.ok(meta.instituteShort && meta.instituteShort.length > 0, `Short code missing for GATE ${yearStr}`);
      assert.ok(meta.officialUrl && meta.officialUrl.startsWith('https://'), `Official URL must be valid HTTPS for GATE ${yearStr}`);
      assert.ok(meta.description && meta.description.length > 0, `Description missing for GATE ${yearStr}`);
      assert.ok(meta.note && meta.note.length > 0, `Note missing for GATE ${yearStr}`);
    }
  });

  await t.test('validates historical organizing IITs and IISc matches', () => {
    const knownInstitutes = {
      '2026': 'IIT Guwahati',
      '2025': 'IIT Roorkee',
      '2024': 'IISc Bangalore',
      '2023': 'IIT Kanpur',
      '2022': 'IIT Kharagpur',
      '2021': 'IIT Bombay',
      '2020': 'IIT Delhi',
      '2019': 'IIT Madras',
      '2018': 'IIT Guwahati',
      '2017': 'IIT Roorkee',
      '2016': 'IISc Bangalore',
      '2015': 'IIT Kanpur',
      '2014': 'IIT Kharagpur',
      '2013': 'IIT Bombay',
      '2012': 'IIT Delhi',
      '2011': 'IIT Madras',
      '2010': 'IIT Guwahati',
      '2009': 'IIT Roorkee',
      '2008': 'IISc Bangalore',
      '2007': 'IIT Kanpur'
    };

    Object.entries(knownInstitutes).forEach(([year, expectedInstitute]) => {
      const meta = getOfficialGatePaperMeta(year);
      assert.strictEqual(meta.institute, expectedInstitute, `Mismatch for GATE ${year}`);
      assert.ok(meta.officialUrl.startsWith('https://'), `Official link missing for ${year}`);
    });
  });

  await t.test('getOfficialGatePaperMeta returns fallback for unknown years', () => {
    const fallback = getOfficialGatePaperMeta('1999');
    assert.strictEqual(fallback.year, '1999');
    assert.ok(fallback.officialUrl.includes('gate.iitkgp.ac.in'));
    assert.ok(fallback.institute.includes('Organizing IIT'));
  });

  await t.test('CENTRAL_GATE_PORTALS contains verified national archives', () => {
    assert.ok(CENTRAL_GATE_PORTALS.length >= 2, 'Must contain at least 2 national portals');
    const kgp = CENTRAL_GATE_PORTALS.find(p => p.url.includes('gate.iitkgp.ac.in'));
    const nptel = CENTRAL_GATE_PORTALS.find(p => p.url.includes('gate.nptel.ac.in'));
    assert.ok(kgp, 'Must include IIT Kharagpur GATE repository');
    assert.ok(nptel, 'Must include NPTEL GATE portal');
  });

  await t.test('verifies raw official and mock binary files are removed from public/downloads', () => {
    const disallowedFolders = ['question_papers', 'answer_keys', 'solved_docx', 'mock_tests'];
    disallowedFolders.forEach(folder => {
      const folderPath = path.join(publicDownloadsDir, folder);
      assert.strictEqual(
        fs.existsSync(folderPath),
        false,
        `Directory public/downloads/${folder} must not exist on the web server`
      );
    });
  });

  await t.test('verifies all 30 custom mock test papers exist as code/JSON in src/data and docx archives in QUESTIONS/MOCK TESTS', () => {
    const srcDataDir = path.resolve(__dirname, '../src/data');
    for (let i = 1; i <= 30; i++) {
      const num = String(i).padStart(2, '0');
      const jsonFile = path.join(srcDataDir, `custom_mock_2027_${num}.json`);
      assert.strictEqual(fs.existsSync(jsonFile), true, `JSON mock file custom_mock_2027_${num}.json must exist in src/data`);
    }

    const masterDocxDir = path.resolve(__dirname, '../QUESTIONS/MOCK TESTS');
    assert.strictEqual(fs.existsSync(masterDocxDir), true, 'QUESTIONS/MOCK TESTS master archive must exist');
    const docxFiles = fs.readdirSync(masterDocxDir).filter(f => f.endsWith('.docx'));
    assert.ok(docxFiles.length >= 30, `Must contain master custom mock docx files, found ${docxFiles.length}`);
  });
});
