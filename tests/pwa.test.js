import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

import { 
  registerServiceWorker, 
  unregisterServiceWorker, 
  getNetworkStatus 
} from '../src/serviceWorkerRegistration.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.resolve(__dirname, '../public');
const manifestWebmanifestPath = path.join(publicDir, 'manifest.webmanifest');
const manifestJsonPath = path.join(publicDir, 'manifest.json');
const swScriptPath = path.join(publicDir, 'sw.js');
const indexHtmlPath = path.resolve(__dirname, '../index.html');
const iconsDir = path.join(publicDir, 'icons');

function readPngDimensions(filePath) {
  const buf = fs.readFileSync(filePath);
  // PNG Magic Number: 0x89 0x50 0x4E 0x47 0x0D 0x0A 0x1A 0x0A
  const isPng = buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4E && buf[3] === 0x47;
  if (!isPng) throw new Error(`File ${filePath} is not a valid PNG`);
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  return { width, height };
}

describe('PWA & Service Worker Subsystem Test Suite', () => {

  describe('Web App Manifest Verification', () => {
    it('ensures both manifest.webmanifest and manifest.json exist and are identical valid JSON', () => {
      assert.ok(fs.existsSync(manifestWebmanifestPath), 'manifest.webmanifest must exist');
      assert.ok(fs.existsSync(manifestJsonPath), 'manifest.json alias must exist');

      const manifestContent = fs.readFileSync(manifestWebmanifestPath, 'utf8');
      const jsonContent = fs.readFileSync(manifestJsonPath, 'utf8');

      const manifest = JSON.parse(manifestContent);
      const manifestJson = JSON.parse(jsonContent);

      assert.deepStrictEqual(manifest, manifestJson, 'manifest.webmanifest and manifest.json should match');
    });

    it('validates required PWA manifest schema properties', () => {
      const manifest = JSON.parse(fs.readFileSync(manifestWebmanifestPath, 'utf8'));

      assert.ok(manifest.name && manifest.name.includes('GATE AG'), 'name must be descriptive');
      assert.strictEqual(manifest.short_name, 'GATE AG Prep');
      assert.strictEqual(manifest.theme_color, '#2563EB');
      assert.strictEqual(manifest.background_color, '#0B0F19');
      assert.strictEqual(manifest.display, 'standalone');
      assert.strictEqual(manifest.start_url, './');
      assert.strictEqual(manifest.scope, './');
      assert.strictEqual(manifest.lang, 'en');
      assert.ok(Array.isArray(manifest.categories), 'categories must be an array');
      assert.ok(manifest.categories.includes('education'));
    });

    it('validates manifest icon entries and metadata', () => {
      const manifest = JSON.parse(fs.readFileSync(manifestWebmanifestPath, 'utf8'));
      assert.ok(Array.isArray(manifest.icons), 'icons must be an array');
      assert.strictEqual(manifest.icons.length, 5, 'manifest must define exactly 5 icons');

      const icon192 = manifest.icons.find(i => i.sizes === '192x192' && i.purpose === 'any');
      assert.ok(icon192, '192x192 icon entry required');
      assert.strictEqual(icon192.src, 'icons/icon-192.png');
      assert.strictEqual(icon192.type, 'image/png');

      const icon512 = manifest.icons.find(i => i.sizes === '512x512' && i.purpose === 'any');
      assert.ok(icon512, '512x512 icon entry required');
      assert.strictEqual(icon512.src, 'icons/icon-512.png');

      const iconMaskable = manifest.icons.find(i => i.purpose === 'maskable');
      assert.ok(iconMaskable, 'maskable icon entry required');
      assert.strictEqual(iconMaskable.src, 'icons/icon-512-maskable.png');

      const iconSvg = manifest.icons.find(i => i.type === 'image/svg+xml');
      assert.ok(iconSvg, 'svg icon entry required');
      assert.strictEqual(iconSvg.src, 'icons/icon.svg');

      const iconApple = manifest.icons.find(i => i.sizes === '180x180');
      assert.ok(iconApple, '180x180 apple touch icon required');
      assert.strictEqual(iconApple.src, 'icons/apple-touch-icon.png');
    });

    it('validates manifest shortcut items', () => {
      const manifest = JSON.parse(fs.readFileSync(manifestWebmanifestPath, 'utf8'));
      assert.ok(Array.isArray(manifest.shortcuts), 'shortcuts must be an array');
      assert.strictEqual(manifest.shortcuts.length, 3, 'manifest must define 3 app shortcuts');

      const shortcutNames = manifest.shortcuts.map(s => s.name);
      assert.ok(shortcutNames.includes('Practice Pool'));
      assert.ok(shortcutNames.includes('PYQ Mock Tests'));
      assert.ok(shortcutNames.includes('Formula Revision Sheet'));

      manifest.shortcuts.forEach(shortcut => {
        assert.ok(shortcut.name && shortcut.name.length > 0);
        assert.ok(shortcut.url && shortcut.url.startsWith('./#'));
        assert.ok(Array.isArray(shortcut.icons) && shortcut.icons.length > 0);
      });
    });
  });

  describe('PWA Icon Files & Binary Dimensions', () => {
    it('verifies all 5 icon files exist on disk with non-zero size', () => {
      const expectedFiles = [
        'icon-192.png',
        'icon-512.png',
        'icon-512-maskable.png',
        'icon.svg',
        'apple-touch-icon.png'
      ];

      expectedFiles.forEach(file => {
        const fullPath = path.join(iconsDir, file);
        assert.ok(fs.existsSync(fullPath), `Icon file ${file} must exist`);
        const stat = fs.statSync(fullPath);
        assert.ok(stat.size > 0, `Icon file ${file} must not be empty`);
      });
    });

    it('verifies exact pixel dimensions of PNG icons', () => {
      const dim192 = readPngDimensions(path.join(iconsDir, 'icon-192.png'));
      assert.strictEqual(dim192.width, 192);
      assert.strictEqual(dim192.height, 192);

      const dim512 = readPngDimensions(path.join(iconsDir, 'icon-512.png'));
      assert.strictEqual(dim512.width, 512);
      assert.strictEqual(dim512.height, 512);

      const dimMaskable = readPngDimensions(path.join(iconsDir, 'icon-512-maskable.png'));
      assert.strictEqual(dimMaskable.width, 512);
      assert.strictEqual(dimMaskable.height, 512);

      const dimApple = readPngDimensions(path.join(iconsDir, 'apple-touch-icon.png'));
      assert.strictEqual(dimApple.width, 180);
      assert.strictEqual(dimApple.height, 180);
    });

    it('verifies SVG icon contains valid XML structure', () => {
      const svgContent = fs.readFileSync(path.join(iconsDir, 'icon.svg'), 'utf8');
      assert.ok(svgContent.includes('<svg'), 'SVG must have opening <svg> tag');
      assert.ok(svgContent.includes('</svg>'), 'SVG must have closing </svg> tag');
      assert.ok(svgContent.includes('viewBox='), 'SVG must define viewBox');
    });
  });

  describe('Service Worker (sw.js) Architecture', () => {
    it('verifies sw.js exists and compiles with valid JavaScript syntax', () => {
      assert.ok(fs.existsSync(swScriptPath), 'sw.js must exist in public directory');
      const swCode = fs.readFileSync(swScriptPath, 'utf8');
      assert.ok(swCode.length > 500, 'sw.js must contain substantial implementation');

      // Validate syntax using Node vm
      assert.doesNotThrow(() => {
        new vm.Script(swCode, { filename: 'sw.js' });
      }, 'sw.js must contain valid JavaScript syntax');
    });

    it('defines multi-tier versioned cache namespaces', () => {
      const swCode = fs.readFileSync(swScriptPath, 'utf8');
      assert.ok(swCode.includes("STATIC_CACHE = 'gate-ag-static-"), 'sw.js must define STATIC_CACHE');
      assert.ok(swCode.includes("RUNTIME_CACHE = 'gate-ag-runtime-"), 'sw.js must define RUNTIME_CACHE');
      assert.ok(swCode.includes("IMAGES_CACHE = 'gate-ag-images-"), 'sw.js must define IMAGES_CACHE');
      assert.ok(swCode.includes("FONTS_CACHE = 'gate-ag-fonts-"), 'sw.js must define FONTS_CACHE');
      assert.ok(swCode.includes("CACHE_PREFIX = 'gate-ag-'"), 'sw.js must define CACHE_PREFIX');
    });

    it('defines precache assets covering core shell, manifest, and icons', () => {
      const swCode = fs.readFileSync(swScriptPath, 'utf8');
      assert.ok(swCode.includes("'./'"), 'PRECACHE_ASSETS must include root ./');
      assert.ok(swCode.includes("'./index.html'"), 'PRECACHE_ASSETS must include ./index.html');
      assert.ok(swCode.includes("'./manifest.webmanifest'"), 'PRECACHE_ASSETS must include ./manifest.webmanifest');
      assert.ok(swCode.includes("'./manifest.json'"), 'PRECACHE_ASSETS must include ./manifest.json');
      assert.ok(swCode.includes("'./icons/icon.svg'"), 'PRECACHE_ASSETS must include icon.svg');
      assert.ok(swCode.includes("'./icons/icon-192.png'"), 'PRECACHE_ASSETS must include icon-192.png');
      assert.ok(swCode.includes("'./icons/icon-512.png'"), 'PRECACHE_ASSETS must include icon-512.png');
    });

    it('registers essential service worker event listeners', () => {
      const swCode = fs.readFileSync(swScriptPath, 'utf8');
      assert.ok(swCode.includes("addEventListener('install'"), 'sw.js must handle install event');
      assert.ok(swCode.includes("addEventListener('activate'"), 'sw.js must handle activate event');
      assert.ok(swCode.includes("addEventListener('fetch'"), 'sw.js must handle fetch event');
      assert.ok(swCode.includes("addEventListener('message'"), 'sw.js must handle message event');
      assert.ok(swCode.includes("skipWaiting()"), 'sw.js should support skipWaiting');
      assert.ok(swCode.includes("clients.claim()"), 'sw.js should claim clients on activate');
    });

    it('implements smart routing and offline navigation fallback', () => {
      const swCode = fs.readFileSync(swScriptPath, 'utf8');
      // Navigation requests fallback
      assert.ok(swCode.includes("request.mode === 'navigate'"), 'sw.js must check for navigate requests');
      assert.ok(swCode.includes('cachedIndex'), 'sw.js must check for cachedIndex fallback');

      // Hashed assets
      assert.ok(swCode.includes("pathname.includes('/assets/')"), 'sw.js must route /assets/ to cache-first');

      // Image assets
      assert.ok(swCode.includes("pathname.includes('/question_images/')"), 'sw.js must route question_images');
      assert.ok(swCode.includes("pathname.includes('/docx_images/')"), 'sw.js must route docx_images');
    });
  });

  describe('Service Worker Client Registration (serviceWorkerRegistration.js)', () => {
    it('exports registerServiceWorker, unregisterServiceWorker, and getNetworkStatus', () => {
      assert.strictEqual(typeof registerServiceWorker, 'function');
      assert.strictEqual(typeof unregisterServiceWorker, 'function');
      assert.strictEqual(typeof getNetworkStatus, 'function');
    });

    it('safely runs in SSR/Node environment without throwing errors', () => {
      assert.doesNotThrow(() => {
        registerServiceWorker();
        unregisterServiceWorker();
        const status = getNetworkStatus();
        assert.ok(typeof status === 'object');
        assert.ok('isOnline' in status);
      });
    });
  });

  describe('HTML Entrypoint (index.html) PWA Integration', () => {
    it('verifies index.html links to manifest and contains PWA meta tags', () => {
      assert.ok(fs.existsSync(indexHtmlPath), 'index.html must exist');
      const html = fs.readFileSync(indexHtmlPath, 'utf8');

      // Manifest link
      assert.ok(html.includes('<link rel="manifest" href="./manifest.webmanifest" />') || html.includes('rel="manifest"'), 'index.html must link to manifest');

      // Theme colors
      assert.ok(html.includes('name="theme-color" content="#2563EB"'), 'index.html must specify theme-color');

      // Mobile capable tags
      assert.ok(html.includes('name="mobile-web-app-capable" content="yes"'), 'index.html must specify mobile-web-app-capable');
      assert.ok(html.includes('name="apple-mobile-web-app-capable" content="yes"'), 'index.html must specify apple-mobile-web-app-capable');
      assert.ok(html.includes('name="apple-mobile-web-app-status-bar-style"'), 'index.html must specify apple status bar style');

      // Favicon & Touch icons
      assert.ok(html.includes('rel="icon" type="image/svg+xml" href="./icons/icon.svg"'), 'index.html must link svg favicon');
      assert.ok(html.includes('rel="apple-touch-icon" href="./icons/apple-touch-icon.png"'), 'index.html must link apple touch icon');
    });

    it('verifies that no blocking third-party CDN scripts/styles are loaded in index.html', () => {
      const html = fs.readFileSync(indexHtmlPath, 'utf8');
      
      // Ensure KaTeX, React, and styles are bundled locally rather than blocking CDN tags
      assert.ok(!html.includes('cdn.jsdelivr.net/npm/katex'), 'KaTeX should be locally bundled, not CDN-loaded');
      assert.ok(!html.includes('unpkg.com/react'), 'React should be locally bundled, not CDN-loaded');
      assert.ok(!html.includes('cdn.tailwindcss.com'), 'Tailwind should be locally bundled via PostCSS');
    });
  });

});
