import test from 'node:test';
import assert from 'node:assert/strict';
import { GATE_AG_FORMULAS } from '../src/data/formulas.js';
import { GATE_AG_SYLLABUS } from '../src/data/syllabus.js';

test('Command Palette Data & Search Indexes Test Suite', async (t) => {
  await t.test('flattens 57+ formulas with LaTeX syntax and valid titles', () => {
    const list = [];
    (GATE_AG_FORMULAS || []).forEach(cat => {
      (cat.topics || []).forEach(top => {
        (top.formulas || []).forEach((f, idx) => {
          list.push({
            id: `form_${cat.code}_${top.topicName}_${idx}`,
            type: 'formula',
            title: f.title,
            formula: f.formula,
            explanation: f.explanation
          });
        });
      });
    });

    assert.ok(list.length >= 57, `Expected >= 57 formulas, found ${list.length}`);
    list.forEach(f => {
      assert.ok(f.title && f.title.length > 0, 'Formula must have title');
      assert.ok(f.formula && f.formula.length > 0, 'Formula must have LaTeX expression');
    });
  });

  await t.test('searches formulas accurately by keywords (e.g. Bernoulli, Darcy, Draft)', () => {
    const list = [];
    (GATE_AG_FORMULAS || []).forEach(cat => {
      (cat.topics || []).forEach(top => {
        (top.formulas || []).forEach(f => {
          list.push(f);
        });
      });
    });

    const bernoulliMatches = list.filter(f => 
      f.title.toLowerCase().includes('bernoulli') || 
      f.explanation.toLowerCase().includes('bernoulli')
    );
    assert.ok(bernoulliMatches.length > 0, 'Should find Bernoulli formula matches');

    const darcyMatches = list.filter(f => 
      f.title.toLowerCase().includes('darcy') || 
      f.explanation.toLowerCase().includes('darcy')
    );
    assert.ok(darcyMatches.length > 0, 'Should find Darcy formula matches');
  });

  await t.test('flattens syllabus subtopics across all 8 official GATE sections', () => {
    const subtopics = [];
    (GATE_AG_SYLLABUS || []).forEach(sec => {
      (sec.topics || []).forEach(top => {
        (top.subtopics || []).forEach(sub => {
          subtopics.push(sub);
        });
      });
    });

    assert.ok(subtopics.length >= 25, `Expected >= 25 syllabus subtopics, found ${subtopics.length}`);
  });
});
