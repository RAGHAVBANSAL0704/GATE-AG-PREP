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

  await t.test('CSS validates high-contrast dark typography across all light themes', async () => {
    const fs = await import('node:fs');
    const css = fs.readFileSync(new URL('../src/index.css', import.meta.url), 'utf8');

    // 1. Universal light theme high-contrast rules exist
    assert.ok(css.includes('html:not(.dark)'), 'Must define universal html:not(.dark) typography rules');
    assert.ok(css.includes('html:not(.dark) .text-slate-100'), 'Must remap .text-slate-100 to dark ink in light theme');
    assert.ok(css.includes('html:not(.dark) .text-slate-200'), 'Must remap .text-slate-200 to dark ink in light theme');
    assert.ok(css.includes('html:not(.dark) .text-slate-300'), 'Must remap .text-slate-300 to dark ink in light theme');

    // 2. Form controls must have high-contrast background and text in light mode
    assert.ok(css.includes('html:not(.dark) input,'), 'Must define light mode input styles');
    assert.ok(css.includes('html:not(.dark) select,'), 'Must define light mode select dropdown styles');

    // 3. Each of the 4 specific light themes must have dedicated typography contrast rules
    const lightThemeIds = ['theme-oxford-sage', 'theme-cream-parchment', 'theme-porcelain-studio', 'theme-sunrise-amber'];
    lightThemeIds.forEach(themeId => {
      assert.ok(css.includes(`html.${themeId}`), `Must define base rules for ${themeId}`);
      assert.ok(css.includes(`html.${themeId} h1`), `Must define heading typography for ${themeId}`);
      assert.ok(css.includes(`html.${themeId} p`), `Must define body text typography for ${themeId}`);
      assert.ok(css.includes(`html.${themeId} .bg-white`), `Must define card styling for ${themeId}`);
      assert.ok(css.includes(`html.${themeId} .katex`), `Must define high-contrast KaTeX formula colors for ${themeId}`);
    });
  });
});
