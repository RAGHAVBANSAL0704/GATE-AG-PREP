import test from 'node:test';
import assert from 'node:assert/strict';
import { APP_THEMES } from '../src/constants/themeConstants.js';

test('Appearance & Theme Engine Test Suite', async (t) => {
  await t.test('defines 2 streamlined theme definitions (1 Dark + 1 Light Mode)', () => {
    assert.equal(APP_THEMES.length, 2, 'Must contain exactly 2 core themes');

    const expectedIds = [
      'obsidian-emerald', 
      'oxford-sage'
    ];
    
    expectedIds.forEach(id => {
      const theme = APP_THEMES.find(t => t.id === id);
      assert.ok(theme, `Theme with id ${id} must exist`);
      assert.ok(theme.name && theme.name.length > 0, `Theme ${id} must have a valid name`);
      assert.ok(Array.isArray(theme.swatches) && theme.swatches.length >= 3, `Theme ${id} must have swatches`);
      assert.ok(theme.type === 'dark' || theme.type === 'light', `Theme ${id} type must be dark or light`);
    });
  });

  await t.test('contains exactly 1 dark mode and 1 light mode', () => {
    const darkThemes = APP_THEMES.filter(t => t.type === 'dark');
    const lightThemes = APP_THEMES.filter(t => t.type === 'light');

    assert.equal(darkThemes.length, 1, 'Must have exactly 1 dark theme');
    assert.equal(lightThemes.length, 1, 'Must have exactly 1 light theme');
  });

  await t.test('all theme IDs map to valid CSS classes without invalid characters', () => {
    APP_THEMES.forEach(t => {
      assert.match(t.id, /^[a-z0-9-]+$/, `Theme id ${t.id} must be kebab-case`);
      assert.match(t.accent, /^#[0-9A-Fa-f]{6}$/, `Theme accent ${t.accent} must be valid hex`);
    });
  });

  await t.test('CSS validates high-contrast dark typography across light mode and dark mode', async () => {
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

    // 3. Oxford Sage (Light Mode) typography and card rules
    assert.ok(css.includes('html.theme-oxford-sage'), 'Must define base rules for theme-oxford-sage');
    assert.ok(css.includes('html.theme-oxford-sage h1'), 'Must define heading typography for theme-oxford-sage');
    assert.ok(css.includes('html.theme-oxford-sage p'), 'Must define body text typography for theme-oxford-sage');
    assert.ok(css.includes('html.theme-oxford-sage .bg-white'), 'Must define card styling for theme-oxford-sage');
    assert.ok(css.includes('html.theme-oxford-sage .katex'), 'Must define high-contrast KaTeX formula colors for theme-oxford-sage');

    // 4. Dark Theme Architecture & Obsidian Emerald (Dark Mode)
    assert.ok(css.includes('html.dark h1'), 'Must define dark heading typography');
    assert.ok(css.includes('html.theme-obsidian-emerald'), 'Must define base rules for theme-obsidian-emerald');
  });
});
