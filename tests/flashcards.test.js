import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { GATE_AG_FLASHCARDS } from '../src/data/flashcardsData.js';

describe('Spaced Repetition Flashcards Dataset Integrity Test Suite', () => {

  it('contains at least 150 curated active recall cards', () => {
    assert.ok(Array.isArray(GATE_AG_FLASHCARDS), 'GATE_AG_FLASHCARDS must be an array');
    assert.ok(GATE_AG_FLASHCARDS.length >= 150, `Expected at least 150 cards, got ${GATE_AG_FLASHCARDS.length}`);
  });

  it('contains cards across all 5 subject partitions (FMP, SWCE, APFE, Maths, GA)', () => {
    const topics = new Set(GATE_AG_FLASHCARDS.map(c => c.topic));
    ['FMP', 'SWCE', 'APFE', 'Maths', 'GA'].forEach(t => {
      assert.ok(topics.has(t), `Missing flashcard topic: ${t}`);
    });
  });

  it('validates schema integrity for every flashcard', () => {
    const idSet = new Set();
    GATE_AG_FLASHCARDS.forEach((c, idx) => {
      assert.ok(c.cardId && c.cardId.trim().length > 0, `Card #${idx} missing cardId`);
      assert.ok(!idSet.has(c.cardId), `Duplicate cardId: ${c.cardId}`);
      idSet.add(c.cardId);
      assert.ok(c.topic && c.topic.trim().length > 0, `Card ${c.cardId} missing topic`);
      assert.ok(c.question && c.question.trim().length > 0, `Card ${c.cardId} missing question`);
      assert.ok(c.answer && c.answer.trim().length > 0, `Card ${c.cardId} missing answer`);
    });
  });

});
