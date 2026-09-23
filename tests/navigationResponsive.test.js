import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('Mobile Navigation & Responsive Layout Test Suite', () => {
  const sidebarPath = path.resolve('src/components/Sidebar.jsx');
  const appPath = path.resolve('src/App.jsx');

  it('Sidebar.jsx exists and contains valid responsive mobile drawer and bottom navigation', () => {
    assert.ok(fs.existsSync(sidebarPath), 'Sidebar.jsx must exist');
    const content = fs.readFileSync(sidebarPath, 'utf8');

    // Verify z-index hierarchy: aside is z-50 so it sits ABOVE the z-40 overlay and z-30 bottom nav
    assert.ok(
      content.includes('z-50 sm:z-30') || content.includes('z-50'),
      'Sidebar drawer aside must have z-50 to remain on top of backdrop overlay and bottom nav'
    );

    // Verify overlay has z-40
    assert.ok(
      content.includes('z-40') && content.includes('bg-black/'),
      'Mobile drawer overlay must be at z-40 backdrop'
    );

    // Verify mobile bottom nav bar has z-30 or lower than drawer z-50
    assert.ok(
      content.includes('fixed bottom-0') && (content.includes('z-30') || content.includes('z-40')),
      'Mobile bottom navigation bar must be anchored at fixed bottom-0'
    );

    // Verify bottom nav is hidden during active mocktest tab
    assert.ok(
      content.includes("activeTab !== 'mocktest'") || content.includes('activeTab !== "mocktest"'),
      'Mobile bottom nav must be suppressed during mocktest to maximize CBT exam viewport'
    );
  });

  it('Nav items cover all primary platform modules with robust match mappings', () => {
    const content = fs.readFileSync(sidebarPath, 'utf8');
    const expectedModules = [
      'dashboard',
      'livestats',
      'practicehub',
      'learninghub',
      'community',
      'mocktest',
      'analytics',
      'leaderboard',
      'games',
      'syllabus',
      'creator'
    ];

    expectedModules.forEach(mod => {
      assert.ok(
        content.includes(`id: '${mod}'`) || content.includes(`id: "${mod}"`),
        `Sidebar must contain module id '${mod}'`
      );
    });
  });

  it('App.jsx has proper mobile padding and responsive container bounds', () => {
    assert.ok(fs.existsSync(appPath), 'App.jsx must exist');
    const content = fs.readFileSync(appPath, 'utf8');

    // Verify mobile top bar offset and bottom nav padding
    assert.ok(
      content.includes('mt-14 sm:mt-0') || content.includes('pt-14 sm:pt-0'),
      'App top strip must account for mobile top bar height (mt-14 sm:mt-0)'
    );
    assert.ok(
      content.includes('pb-24 sm:pb-8') || content.includes('pb-20 sm:pb-8'),
      'App main container must have bottom padding on mobile to prevent bottom nav collision'
    );
  });

  it('CSS contains touch-action manipulation, safe-area insets and touch scrolling rules', () => {
    const cssPath = path.resolve('src/index.css');
    assert.ok(fs.existsSync(cssPath), 'index.css must exist');

    const cssContent = fs.readFileSync(cssPath, 'utf8');

    assert.ok(cssContent.includes('touch-action: manipulation'), 'CSS must include touch-action: manipulation for instant tap response');
    assert.ok(cssContent.includes('pb-safe'), 'CSS must define pb-safe for mobile home-indicator safety');
    assert.ok(cssContent.includes('-webkit-overflow-scrolling: touch'), 'CSS must enable momentum touch scrolling on dialogs and containers');
    assert.ok(cssContent.includes('user-select: none'), 'CSS must prevent accidental text selection on button tap');
  });

  it('Sidebar and Navbar mobile navigation buttons have touch targets', () => {
    const sidebarContent = fs.readFileSync(sidebarPath, 'utf8');
    assert.ok(sidebarContent.includes('min-h-[44px]'), 'Sidebar mobile bottom nav must have min-h-[44px] tap target');
    assert.ok(sidebarContent.includes('w-9 h-9'), 'Sidebar mobile top bar buttons must have 36px+ tap target');

    const navbarPath = path.resolve('src/components/Navbar.jsx');
    const navbarContent = fs.readFileSync(navbarPath, 'utf8');
    assert.ok(navbarContent.includes('min-h-[44px]'), 'Navbar mobile bar buttons must have min-h-[44px] tap target');
  });
});

