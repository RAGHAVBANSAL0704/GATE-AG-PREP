import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('RevisionBank Component & Hook Integrity Suite', () => {

  test('RevisionBank.jsx imports all required React hooks including useEffect', () => {
    const filePath = path.resolve('src/components/RevisionBank.jsx');
    assert.ok(fs.existsSync(filePath), 'RevisionBank.jsx must exist');
    const content = fs.readFileSync(filePath, 'utf-8');

    // Must import useEffect and useState from react
    assert.match(content, /import\s+React,\s*\{\s*[^}]*\buseState\b[^}]*\}\s*from\s*['"]react['"]/, 'Must import useState');
    assert.match(content, /import\s+React,\s*\{\s*[^}]*\buseEffect\b[^}]*\}\s*from\s*['"]react['"]/, 'Must import useEffect');

    // Verify useEffect listener for progress sync
    assert.match(content, /window\.addEventListener\(['"]gate_ag_progress_synced['"]/, 'Must listen to gate_ag_progress_synced event');
    assert.match(content, /window\.removeEventListener\(['"]gate_ag_progress_synced['"]/, 'Must clean up gate_ag_progress_synced event');
  });

  test('All components in src/ correctly import their used React hooks', () => {
    const srcDir = path.resolve('src');
    function getFiles(dir) {
      let results = [];
      const list = fs.readdirSync(dir);
      list.forEach(file => {
        const full = path.join(dir, file);
        const stat = fs.statSync(full);
        if (stat && stat.isDirectory()) {
          results = results.concat(getFiles(full));
        } else if (file.endsWith('.jsx')) {
          results.push(full);
        }
      });
      return results;
    }

    const hooks = ['useState', 'useEffect', 'useMemo', 'useCallback', 'useRef'];
    const files = getFiles(srcDir);

    files.forEach(f => {
      const content = fs.readFileSync(f, 'utf-8');
      hooks.forEach(h => {
        const callRegex = new RegExp(`(?<![a-zA-Z0-9_.])(${h})\\s*\\(`, 'g');
        if (callRegex.test(content)) {
          const importRegex = new RegExp(`import\\s+.*\\b${h}\\b.*from\\s+['"]react['"]`);
          const destructureRegex = new RegExp(`const\\s+.*\\b${h}\\b.*=\\s*React`);
          const hasHook = importRegex.test(content) || destructureRegex.test(content);
          assert.ok(
            hasHook,
            `File ${path.relative(process.cwd(), f)} calls ${h}() but does not import ${h} from 'react'`
          );
        }
      });
    });
  });
});
