import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import katex from 'katex';
import conceptsData from '../src/data/conceptsData.js';
import { executeUniversalSearch } from '../src/utils/universalSearchEngine.js';
import { renderMathToHtmlString } from '../src/utils/mathFormatting.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const conceptsJsonPath = path.resolve(projectRoot, 'src/data/concepts.json');
const rawConceptsJson = JSON.parse(fs.readFileSync(conceptsJsonPath, 'utf8'));

const questionsJsonPath = path.resolve(projectRoot, 'src/data/questions.json');
const questionsData = JSON.parse(fs.readFileSync(questionsJsonPath, 'utf8'));

describe('Challenger 2: Core Concepts Expansion Stress & Rigor Test Suite', () => {

  describe('1. Section Distribution & Schema Balance', () => {
    it('contains at least 80 total concepts with all 8 official sections having >= 10 concepts each', () => {
      assert.ok(conceptsData.length >= 80, `Expected >= 80 concepts, found ${conceptsData.length}`);
      
      const expectedSections = [
        'Section 1: Engineering Mathematics',
        'Section 2: Farm Machinery',
        'Section 3: Farm Power',
        'Section 4: Soil and Water Conservation Engineering',
        'Section 5: Irrigation and Drainage Engineering',
        'Section 6: Agricultural Process Engineering',
        'Section 7: Dairy and Food Engineering',
        'Section 8: General Aptitude'
      ];

      const counts = {};
      expectedSections.forEach(sec => { counts[sec] = 0; });

      conceptsData.forEach(c => {
        assert.ok(counts[c.section] !== undefined, `Unrecognized section title: "${c.section}" in concept ${c.id}`);
        counts[c.section]++;
      });

      expectedSections.forEach(sec => {
        assert.ok(
          counts[sec] >= 10,
          `Section "${sec}" must have at least 10 concepts, found ${counts[sec]}`
        );
      });
    });

    it('exhibits 100% parity between concepts.json and conceptsData.js', () => {
      assert.strictEqual(conceptsData.length, rawConceptsJson.length, 'Length mismatch between JS and JSON');
      for (let i = 0; i < conceptsData.length; i++) {
        const js = conceptsData[i];
        const json = rawConceptsJson[i];
        assert.strictEqual(js.id, json.id, `ID mismatch at index ${i}`);
        assert.strictEqual(js.title, json.title, `Title mismatch at index ${i}`);
        assert.strictEqual(js.section, json.section, `Section mismatch at index ${i}`);
        assert.strictEqual(js.content, json.content, `Content mismatch at index ${i}`);
      }
    });
  });

  describe('2. Search Stress Testing across universalSearchEngine.js', () => {
    const sectionTerms = [
      { section: 'Section 1', term: 'Newton-Raphson' },
      { section: 'Section 2', term: 'fluted roller' },
      { section: 'Section 3', term: 'weight transfer' },
      { section: 'Section 4', term: 'USLE' },
      { section: 'Section 5', term: 'Hooghoudt' },
      { section: 'Section 6', term: 'Janssen' },
      { section: 'Section 7', term: 'D-value' },
      { section: 'Section 8', term: 'syllogism' }
    ];

    sectionTerms.forEach(({ section, term }) => {
      it(`finds high-relevance concept notes for canonical query "${term}" (${section})`, () => {
        const res = executeUniversalSearch({
          query: term,
          questions: questionsData.slice(0, 50),
          categoryFilter: 'all',
          maxResults: 20
        });

        assert.ok(res.results.length > 0, `Search for "${term}" returned 0 results`);
        const matchedConcepts = res.results.filter(r => r.type === 'concepts');
        assert.ok(matchedConcepts.length > 0, `Search for "${term}" must include concept results`);

        const topConcept = matchedConcepts[0];
        assert.ok(topConcept.id, 'Matched concept missing id');
        assert.ok(topConcept.title, 'Matched concept missing title');
        assert.ok(topConcept.subtitle, 'Matched concept missing subtitle');
        assert.ok(topConcept.snippet, 'Matched concept missing snippet');
        assert.strictEqual(topConcept.type, 'concepts');

        // Check category filtering
        const filteredRes = executeUniversalSearch({
          query: term,
          questions: questionsData.slice(0, 50),
          categoryFilter: 'concepts',
          maxResults: 20
        });
        assert.ok(filteredRes.results.length > 0);
        assert.ok(filteredRes.results.every(r => r.type === 'concepts'));
      });
    });
  });

  describe('3. Numerical Problem & Physical Rigor Audit', () => {
    const newConcepts = conceptsData.slice(52); // Newly added 48 high-yield concepts

    it('verifies all 48 newly added concepts contain genuine step-by-step solved numericals', () => {
      assert.strictEqual(newConcepts.length, 48, 'Expected 48 newly added concepts');

      newConcepts.forEach((c, idx) => {
        const content = c.content || '';
        const marker = '## Solved Representative GATE AG Numerical';
        assert.ok(
          content.includes(marker),
          `Concept #${idx + 52} (${c.id}: ${c.title}) missing "${marker}"`
        );

        const numericalPart = content.slice(content.indexOf(marker));
        assert.ok(
          numericalPart.toLowerCase().includes('*problem'),
          `Concept #${idx + 52} (${c.id}) missing *Problem statement`
        );
        assert.ok(
          numericalPart.toLowerCase().includes('*solution*'),
          `Concept #${idx + 52} (${c.id}) missing *Solution* block`
        );

        // Verify multi-step derivation
        const stepMatches = numericalPart.match(/\d+\.\s+/g) || [];
        assert.ok(
          stepMatches.length >= 2,
          `Concept #${idx + 52} (${c.id}) has only ${stepMatches.length} numbered steps, expected >= 2`
        );

        // Verify numerical substitutions (numbers and equals sign)
        assert.ok(
          numericalPart.includes('='),
          `Concept #${idx + 52} (${c.id}) solution lacks equality derivations`
        );
        const numbers = numericalPart.match(/\d+(\.\d+)?/g) || [];
        assert.ok(
          numbers.length >= 5,
          `Concept #${idx + 52} (${c.id}) lacks sufficient numeric values (${numbers.length})`
        );

        // Verify zero placeholder tokens
        const placeholders = ['TODO', 'TBD', 'exercise for the reader', 'left to the student'];
        placeholders.forEach(p => {
          assert.ok(
            !numericalPart.toLowerCase().includes(p),
            `Concept #${idx + 52} (${c.id}) contains placeholder token: "${p}"`
          );
        });
      });
    });

    it('verifies physical realism in Farm Machinery & Farm Power numericals', () => {
      const fm01 = conceptsData.find(c => c.id === 'CONCEPT_FM_01_MOLDBOARD_PLOW_DRAFT');
      assert.ok(fm01, 'CONCEPT_FM_01_MOLDBOARD_PLOW_DRAFT missing');
      assert.ok(fm01.content.includes('9.270') || fm01.content.includes('9270'), 'Draft force must be positive 9.270 kN');
      assert.ok(fm01.content.includes('0.378'), 'Field capacity must be positive 0.378 ha/h');

      const fp03 = conceptsData.find(c => c.id === 'CONCEPT_FP_03_DYNAMIC_WEIGHT_TRANSFER_CG');
      assert.ok(fp03, 'CONCEPT_FP_03 missing');
      assert.ok(fp03.content.includes('17.93') || fp03.content.includes('17.9286'), 'Dynamic rear axle reaction must be positive');
      assert.ok(fp03.content.includes('6.07'), 'Front axle reaction must be positive 6.07 kN (safe from rearward flip)');
    });

    it('verifies physical realism in Soil & Water Conservation Engineering numericals', () => {
      const swce01 = conceptsData.find(c => c.id === 'CONCEPT_SWCE_01_DARCY_WEISBACH_ORIFICE_FLOW');
      assert.ok(swce01, 'CONCEPT_SWCE_01 missing');
      assert.ok(swce01.content.includes('2.0 \\times 10^5') || swce01.content.includes('200000'), 'Reynolds number must be positive 2.0x10^5 (turbulent)');
      assert.ok(swce01.content.includes('14.68'), 'Friction head loss must be positive 14.68 m');

      const swce06 = conceptsData.find(c => c.id === 'CONCEPT_SWCE_06_DROP_SPILLWAY_HYDRAULIC_JUMP');
      assert.ok(swce06, 'CONCEPT_SWCE_06 missing');
      assert.ok(swce06.content.includes('1.418'), 'Conjugate depth y2 must be positive 1.418 m > y1');
    });

    it('verifies physical realism in Irrigation and Drainage Engineering numericals', () => {
      const ide04 = conceptsData.find(c => c.id === 'CONCEPT_IDE_04_HOOGHOUDT_STEADY_DRAINAGE');
      assert.ok(ide04, 'CONCEPT_IDE_04 missing');
      assert.ok(ide04.content.includes('72.0'), 'Hooghoudt drain spacing must be positive 72.0 m');

      const ide05 = conceptsData.find(c => c.id === 'CONCEPT_IDE_05_GLOVER_DUMM_LEACHING_REQUIREMENT');
      assert.ok(ide05, 'CONCEPT_IDE_05 missing');
      assert.ok(ide05.content.includes('31.45'), 'Glover-Dumm drain spacing must be positive 31.45 m');
    });

    it('verifies physical realism in Dairy and Food Engineering numericals', () => {
      const dfe02 = conceptsData.find(c => c.id === 'CONCEPT_DFE_02_THERMAL_DEATH_KINETICS_D_Z_F');
      assert.ok(dfe02, 'CONCEPT_DFE_02 missing');
      assert.ok(dfe02.content.includes('0.20'), 'D121.1 value must be positive 0.20 min');
      assert.ok(dfe02.content.includes('1.80'), 'Holding time must be positive 1.80 min');

      const dfe04 = conceptsData.find(c => c.id === 'CONCEPT_DFE_04_PLANK_EQUATION_FOOD_FREEZING');
      assert.ok(dfe04, 'CONCEPT_DFE_04 missing');
      assert.ok(dfe04.content.includes('3.11'), 'Freezing time must be positive 3.11 hours');
    });
  });

  describe('4. Official PYQ & Custom Mock Invariant Isolation', () => {
    it('confirms questions.json has exactly 1,324 official PYQs spanning 2007-2026', () => {
      assert.strictEqual(questionsData.length, 1324, 'questions.json must contain strictly 1,324 questions');
      const years = [...new Set(questionsData.map(q => Number(q.year)))].sort((a, b) => a - b);
      assert.strictEqual(years[0], 2007, 'First PYQ year must be 2007');
      assert.strictEqual(years[years.length - 1], 2026, 'Latest PYQ year must be 2026');

      // Confirm no mock papers injected into questions.json
      questionsData.forEach(q => {
        assert.ok(
          !String(q.id).toLowerCase().includes('mock') && !String(q.paper_id || '').toLowerCase().includes('mock'),
          `Mock test contamination detected in questions.json: ${q.id}`
        );
      });
    });

    it('confirms all 50 custom mock test papers exist intact', () => {
      const mockFiles = fs.readdirSync(path.resolve(projectRoot, 'src/data'))
        .filter(f => f.startsWith('custom_mock_2027_') && f.endsWith('.json'));
      assert.strictEqual(mockFiles.length, 50, 'Must have exactly 50 custom mock papers');
    });
  });

  describe('5. Render Resilience & HTML Formatting Security', () => {
    it('safely transforms all 100 concepts through renderMathToHtmlString without thrown exceptions', () => {
      conceptsData.forEach((c, idx) => {
        let html = '';
        assert.doesNotThrow(() => {
          html = renderMathToHtmlString(c.content);
        }, `renderMathToHtmlString threw exception on concept #${idx} (${c.id})`);
        assert.ok(typeof html === 'string' && html.length > 50, `Rendered HTML too short for ${c.id}`);
      });
    });
  });

});
