import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { containsAbusiveContent, sanitizeText, validateCleanInput } from '../src/utils/profanityFilter.js';

describe('Profanity & Abusive Language Moderation Subsystem', () => {

  test('correctly identifies clean text as safe', () => {
    assert.equal(containsAbusiveContent('Hello, my name is Raghav and I am preparing for GATE AG 2027'), false);
    assert.equal(containsAbusiveContent('Tractor hydraulics and soil mechanics equations'), false);
  });

  test('detects abusive terms in English', () => {
    assert.equal(containsAbusiveContent('This question is complete bullshit'), true);
    assert.equal(containsAbusiveContent('fuck this test'), true);
  });

  test('detects transliterated Hinglish abusive terms', () => {
    assert.equal(containsAbusiveContent('tu chutiya hai kya'), true);
    assert.equal(containsAbusiveContent('bhenchod answer galat hai'), true);
    assert.equal(containsAbusiveContent('madarchod system'), true);
  });

  test('sanitizes abusive words with asterisks', () => {
    assert.equal(sanitizeText('This is bullshit'), 'This is ***');
    assert.equal(sanitizeText('tu chutiya hai'), 'tu *** hai');
  });

  test('validateCleanInput returns proper validation object', () => {
    const cleanResult = validateCleanInput('Ankit Bansal', 'Full Name');
    assert.equal(cleanResult.isValid, true);
    assert.equal(cleanResult.message, null);

    const dirtyResult = validateCleanInput('bastard_user', 'Username');
    assert.equal(dirtyResult.isValid, false);
    assert.match(dirtyResult.message, /Inappropriate or abusive language/);
  });

});
