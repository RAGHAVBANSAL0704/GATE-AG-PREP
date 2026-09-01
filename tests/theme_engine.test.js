import test from 'node:test';
import assert from 'node:assert/strict';
import { APP_THEMES } from '../src/constants/themeConstants.js';

test('Appearance & Theme Engine Test Suite', async (t) => {
  await t.test('defines 8 unique and complete theme definitions (4 Dark + 4 Light)', () => {
    assert.equal(APP_THEMES.length, 8, 'Must contain exactly 8 themes');

    const expectedIds = [
      'obsidian-emerald', 
      'matte-titanium', 
      'midnight-aurora', 
      'pure-monocle', 
      'oxford-sage', 
      'cream-parchment', 
      'porcelain-studio', 
      'sunrise-amber'
    ];
    
    expectedIds.forEach(id => {
      const theme = APP_THEMES.find(t => t.id === id);
      assert.ok(theme, `Theme with id ${id} must exist`);
      assert.ok(theme.name && theme.name.length > 0, `Theme ${id} must have a valid name`);
      assert.ok(Array.isArray(theme.swatches) && theme.swatches.length >= 3, `Theme ${id} must have swatches`);
      assert.ok(theme.type === 'dark' || theme.type === 'light', `Theme ${id} type must be dark or light`);
    });
  });

  await t.test('contains exactly 4 dark themes and 4 light themes', () => {
    const darkThemes = APP_THEMES.filter(t => t.type === 'dark');
    const lightThemes = APP_THEMES.filter(t => t.type === 'light');

    assert.equal(darkThemes.length, 4, 'Must have exactly 4 dark themes');
    assert.equal(lightThemes.length, 4, 'Must have exactly 4 light themes');
  });

  await t.test('all theme IDs map to valid CSS classes without invalid characters', () => {
    APP_THEMES.forEach(t => {
      assert.match(t.id, /^[a-z0-9-]+$/, `Theme id ${t.id} must be kebab-case`);
      assert.match(t.accent, /^#[0-9A-Fa-f]{6}$/, `Theme accent ${t.accent} must be valid hex`);
    });
  });
});
