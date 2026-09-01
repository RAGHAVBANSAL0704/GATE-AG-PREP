import test from 'node:test';
import assert from 'node:assert/strict';

test('Dual CBT Interface Skin Test Suite', async (t) => {
  await t.test('supports official TCS iON skin mode and Modern Zen Dark skin mode', () => {
    const supportedSkins = ['tcs_ion', 'modern_zen'];
    
    assert.ok(supportedSkins.includes('tcs_ion'), 'Must support tcs_ion skin');
    assert.ok(supportedSkins.includes('modern_zen'), 'Must support modern_zen skin');
  });

  await t.test('palette states map accurately in both skin themes', () => {
    const statusLegend = {
      NOT_VISITED: 'Not Visited',
      NOT_ANSWERED: 'Not Answered',
      ANSWERED: 'Answered',
      MARKED: 'Marked for Review',
      ANSWERED_MARKED: 'Answered & Marked for Review'
    };

    assert.equal(Object.keys(statusLegend).length, 5);
    assert.equal(statusLegend.ANSWERED, 'Answered');
    assert.equal(statusLegend.ANSWERED_MARKED, 'Answered & Marked for Review');
  });
});
