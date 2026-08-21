import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const ROOT_DIR = path.resolve('/Users/raghav/Desktop/GATE AG PREP WEB');
const distDir = path.join(ROOT_DIR, 'dist');
const assetsDir = path.join(distDir, 'assets');

console.log('Checking all font and asset references in compiled CSS...');

const files = fs.readdirSync(assetsDir);
const cssFiles = files.filter(f => f.endsWith('.css'));

let totalRefs = 0;
let missingRefs = 0;

for (const cssFile of cssFiles) {
  const cssContent = fs.readFileSync(path.join(assetsDir, cssFile), 'utf-8');
  // Match url(...) references
  const urlMatches = [...cssContent.matchAll(/url\((?:['"]?)([^'")]+)(?:['"]?)\)/g)].map(m => m[1]);
  for (const url of urlMatches) {
    if (url.startsWith('data:') || url.startsWith('http:') || url.startsWith('https:')) continue;
    totalRefs++;
    // URLs in dist/assets/style.css are usually relative or absolute like KaTeX_Main-Regular.woff2 or /assets/KaTeX...
    const cleanUrl = url.split('?')[0].split('#')[0];
    const resolvedPath = cleanUrl.startsWith('/') 
      ? path.join(distDir, cleanUrl.replace(/^\//, ''))
      : path.join(assetsDir, cleanUrl);

    if (!fs.existsSync(resolvedPath)) {
      console.error(`  ✖ Missing asset referenced in ${cssFile}: ${url} -> ${resolvedPath}`);
      missingRefs++;
    }
  }
}

console.log(`Verified ${totalRefs} asset references in CSS. Missing: ${missingRefs}`);
assert.strictEqual(missingRefs, 0, `Found ${missingRefs} missing asset references in built CSS`);
console.log('✔ All CSS asset references resolved successfully on disk!');
