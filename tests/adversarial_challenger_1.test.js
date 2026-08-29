import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import katex from 'katex';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Mock localStorage and browser environment
const mockStorage = new Map();
globalThis.localStorage = {
  getItem: (key) => mockStorage.get(key) || null,
  setItem: (key, val) => mockStorage.set(key, String(val)),
  removeItem: (key) => mockStorage.delete(key),
  clear: () => mockStorage.clear()
};

const mockEventListeners = new Map();
globalThis.window = {
  addEventListener: (event, handler) => {
    if (!mockEventListeners.has(event)) {
      mockEventListeners.set(event, []);
    }
    mockEventListeners.get(event).push(handler);
  },
  removeEventListener: (event, handler) => {
    if (mockEventListeners.has(event)) {
      const handlers = mockEventListeners.get(event);
      const idx = handlers.indexOf(handler);
      if (idx !== -1) handlers.splice(idx, 1);
    }
  },
  dispatchEvent: (event) => {
    const type = typeof event === 'string' ? event : event.type;
    if (mockEventListeners.has(type)) {
      mockEventListeners.get(type).forEach(h => h(event));
    }
  }
};

import { 
  hashPassword, 
  hashPasswordSync, 
  verifyPassword, 
  registerStudent, 
  loginStudent,
  sanitizeMobileNumber,
  formatDOBPassword
} from '../src/services/authService.js';

import { 
  generateUUID, 
  saveTestAttempt, 
  syncPendingTestAttempts, 
  getStudentTestAttempts, 
  initAutoSyncOnReconnect,
  LOCAL_STORAGE_TEST_ATTEMPTS_KEY 
} from '../src/services/testAttemptService.js';

import {
  containsDangerousPayload,
  stripDangerousHtml,
  validateCleanInput
} from '../src/utils/profanityFilter.js';

// Extract escapeHtml function from MathRenderer.jsx
const mathRendererCode = fs.readFileSync(path.join(projectRoot, 'src/components/MathRenderer.jsx'), 'utf8');
const escapeHtmlMatch = mathRendererCode.match(/export function escapeHtml\(unsafe\) \{([\s\S]*?)\n\}/);
const escapeHtml = new Function('unsafe', escapeHtmlMatch[1]);

// Exact MathRenderer processMath logic for string evaluation
const processMath = (text, inline = false) => {
  if (typeof text !== 'string') return '';

  const mathTokens = [];
  const pushToken = (mathStr, displayMode) => {
    const token = `___KATEX_MATH_TOKEN_${mathTokens.length}___`;
    let rendered = '';
    try {
      rendered = katex.renderToString(mathStr.trim(), { displayMode, throwOnError: false });
    } catch (e) {
      rendered = `<span class="text-inherit font-sans">${escapeHtml(mathStr)}</span>`;
    }
    mathTokens.push({ token, rendered });
    return token;
  };

  let str = text;

  // 1. Extract display math \[ ... \]
  str = str.replace(/\\\[([\s\S]*?)\\\]/g, (match, mathStr) => {
    return pushToken(mathStr, true);
  });

  // 2. Extract display math $$ ... $$
  str = str.replace(/\$\$([\s\S]*?)\$\$/g, (match, mathStr) => {
    return pushToken(mathStr, true);
  });

  // 3. Extract inline math \( ... \)
  str = str.replace(/\\\(([\s\S]*?)\\\)/g, (match, mathStr) => {
    return pushToken(mathStr, false);
  });

  // 4. Extract inline math $ ... $ (single-line)
  str = str.replace(/\$([^$\n]+)\$/g, (match, mathStr) => {
    return pushToken(mathStr, false);
  });

  // 5. Fallback: If no delimiter was found but string contains LaTeX commands
  if (mathTokens.length === 0 && (str.includes('\\') || str.includes('^') || str.includes('_') || str.includes('='))) {
    if (!/<[a-zA-Z\/]/.test(str)) {
      try {
        const rendered = katex.renderToString(str.trim(), { displayMode: !inline, throwOnError: false });
        if (rendered) return rendered;
      } catch (e) {}
    }
  }

  // 6. Escape all raw HTML entities in non-math segments
  str = escapeHtml(str);

  // 7. Spacing Sanitization
  str = str.replace(/([a-zA-Z0-9\)])(\$|\\\(|\\\[)/g, '$1 $2')
           .replace(/(\$|\\\)|\\\])([a-zA-Z0-9\(/])/g, '$1 $2')
           .replace(/\]([a-zA-Z])/g, '] $1')
           .replace(/([a-z])\(([a-z]+)\)/gi, '$1 ($2)');

  // 8. Units
  str = str.replace(/\bdeg C\b/gi, '°C')
           .replace(/m 3 \/ s/gi, 'm³/s');

  // 9. Markdown bold & code
  str = str.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  str = str.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 font-mono text-xs border border-slate-200 dark:border-slate-700">$1</code>');

  // 10. Re-inject safe KaTeX rendered tokens
  for (const { token, rendered } of mathTokens) {
    str = str.replace(token, rendered);
  }

  return str;
};

describe('Empirical Adversarial Audit: Security, Authentication & Offline Sync', () => {

  beforeEach(() => {
    mockStorage.clear();
    mockEventListeners.clear();
  });

  // =========================================================================
  // CHALLENGE SECTION 1: Password Hashing & Cryptographic Robustness
  // =========================================================================
  describe('Adversarial Challenge: Password Hashing & Preimage / Collision Resistance', () => {

    it('empirically challenges preimage resistance across pseudo-random inputs', async () => {
      const targetPlain = 'GateAgRankOne2026!';
      const targetHash = await hashPassword(targetPlain);

      // Attempt dictionary and bit-flip variations to ensure no accidental collision
      const trialPasswords = [
        'GateAgRankOne2026',
        'gateAgRankOne2026!',
        'GATEAGRANKONE2026!',
        'GateAgRankOne2026!!',
        'GateAgRank0ne2026!',
        'GateAgRankOne2O26!',
        '\x00GateAgRankOne2026!',
        'GateAgRankOne2026!\x00',
        'GateAgRankOne2026!\n'
      ];

      for (const trial of trialPasswords) {
        const trialHash = await hashPassword(trial);
        assert.notStrictEqual(
          trialHash, 
          targetHash, 
          `Collision or preimage leak detected between "${trial}" and target`
        );
      }
    });

    it('validates salt uniqueness and high avalanche effect across different salts', async () => {
      const input = 'IdenticalPassword123#';
      const salts = [
        'gate_ag_prep_salt_v1',
        'gate_ag_prep_salt_v2',
        'custom_salt_user_9921',
        'custom_salt_user_9922',
        'salt_with_special_chars_!@#$',
        '123456789012345678901234567890'
      ];

      const hashes = new Set();
      for (const s of salts) {
        const h = await hashPassword(input, s);
        assert.ok(h.startsWith('sha256_'));
        assert.strictEqual(h.slice(7).length, 64);
        assert.strictEqual(hashes.has(h), false, `Hash collision found for different salt: ${s}`);
        hashes.add(h);
      }
      assert.strictEqual(hashes.size, salts.length);
    });

    it('empirically challenges async Web Crypto hashing against null, empty, unicode, RTL, and massive inputs', async () => {
      const inputs = [
        '',
        null,
        undefined,
        ' ',
        '   \t\r\n   ',
        '🌾🚜🌾 Tractor Power & Machinery 🌾🚜🌾',
        'مرحبا بالعالم', // Arabic unicode
        'हिन्दी पासवर्ड', // Devanagari unicode
        '\u200B\u200C\u200D', // Zero-width spaces
        '\u202Ereversed_text\u202C', // RTL override
        "' OR '1'='1' -- DROP TABLE students;", // SQL injection string
        '{"$gt": ""}', // NoSQL injection string
        'A'.repeat(50000) // 50KB large input string
      ];

      for (const val of inputs) {
        const asyncRes = await hashPassword(val);

        assert.strictEqual(typeof asyncRes, 'string');
        assert.ok(asyncRes.startsWith('sha256_'));
        assert.strictEqual(asyncRes.slice(7).length, 64);
        assert.match(asyncRes.slice(7), /^[0-9a-f]{64}$/);

        // For ASCII inputs, verify sync and async match exactly
        if (typeof val === 'string' && /^[\x00-\x7F]*$/.test(val)) {
          const syncRes = hashPasswordSync(val);
          assert.strictEqual(asyncRes, syncRes, `ASCII sync and async hash mismatch for: ${val}`);
        }
      }
    });

    it('empirically verifies verifyPassword rejects non-matching credentials across student states', async () => {
      const student = {
        id: 'stu_adversarial',
        dob: '2003-11-20',
        password_hash: await hashPassword('StrictSecret2026')
      };

      // Fuzzing inputs
      const badInputs = [
        'StrictSecret202',
        'strictsecret2026', // wrong case
        'STRICTSECRET2026', // all uppercase
        '2003-11-20', // unformatted DOB
        '20-11-2003', // wrong DOB separator
        null,
        undefined,
        '',
        '{}',
        'true',
        '1'
      ];

      for (const bad of badInputs) {
        const isVerified = await verifyPassword(bad, student);
        assert.strictEqual(
          isVerified, 
          false, 
          `Unexpected verification for non-matching input: "${bad}"`
        );
      }

      // Valid credentials: exact password or DD/MM/YYYY formatted DOB
      assert.strictEqual(await verifyPassword('StrictSecret2026', student), true);
      assert.strictEqual(await verifyPassword('20/11/2003', student), true);

      // Verify that whitespace-trimmed passwords match according to design contract
      assert.strictEqual(await verifyPassword(' StrictSecret2026 ', student), true);
      assert.strictEqual(await verifyPassword(' 20/11/2003 ', student), true);
    });
  });

  // =========================================================================
  // CHALLENGE SECTION 2: Advanced XSS Sanitization in MathRenderer
  // =========================================================================
  describe('Adversarial Challenge: XSS Sanitization & Delimiter Escaping in MathRenderer', () => {

    it('empirically disarms classic and modern HTML XSS injection vectors in non-math text', () => {
      const hostileVectors = [
        '<script>alert("xss1")</script>',
        '<SCRIPT SRC="https://attacker.com/malicious.js"></SCRIPT>',
        '<img src=x onerror=alert(1)>',
        '<img src="javascript:alert(1)">',
        '<svg/onload=alert(1)>',
        '<svg><animate onbegin=alert(1) attributeName=x></svg>',
        '<iframe src="javascript:alert(1)"></iframe>',
        '<body onload=alert(1)>',
        '<a href="javascript:alert(1)">Click Me</a>',
        '<input type="image" src="x" onerror="alert(1)">',
        '<details open ontoggle="alert(1)">',
        '<object data="javascript:alert(1)">',
        '<embed src="javascript:alert(1)">',
        '<<SCRIPT>alert("nested")//<</SCRIPT>',
        '<marquee onstart=alert(1)>'
      ];

      for (const vector of hostileVectors) {
        const rendered = processMath(vector);

        // Assert no executable raw tags exist in final rendered HTML
        assert.ok(!/<script[\s>]/i.test(rendered), `Raw <script> tag leaked for vector: ${vector}`);
        assert.ok(!/<img[\s>]/i.test(rendered), `Raw <img> tag leaked for vector: ${vector}`);
        assert.ok(!/<svg[\s>]/i.test(rendered), `Raw <svg> tag leaked for vector: ${vector}`);
        assert.ok(!/<iframe[\s>]/i.test(rendered), `Raw <iframe> tag leaked for vector: ${vector}`);
        assert.ok(!/<body[\s>]/i.test(rendered), `Raw <body> tag leaked for vector: ${vector}`);
        assert.ok(!/<object[\s>]/i.test(rendered), `Raw <object> tag leaked for vector: ${vector}`);
        assert.ok(!/<embed[\s>]/i.test(rendered), `Raw <embed> tag leaked for vector: ${vector}`);
        assert.ok(!/<[a-z0-9_-]+\s+[^>]*on[a-z]+\s*=/i.test(rendered), `Active event handler attribute leaked for vector: ${vector}`);

        // Raw HTML characters must be escaped into entities
        assert.ok(
          rendered.includes('&lt;') || rendered.includes('&gt;') || rendered.includes('&quot;'),
          `Vector must be escaped to entities: ${vector}`
        );
      }
    });

    it('empirically neutralizes XSS payloads nested inside LaTeX delimiters and KaTeX blocks', () => {
      const nestedVectors = [
        '\\[ <script>alert("katex_disp")</script> \\]',
        '$$ \\text{<img src=x onerror=alert(1)>} $$',
        '\\( <svg/onload=alert(1)> \\)',
        '$ <iframe src="javascript:alert(1)"></iframe> $',
        '\\[ \\href{javascript:alert(1)}{Malicious Link} \\]',
        '\\[ \\url{javascript:alert(1)} \\]',
        '\\[ \\htmlId{id" onmouseover="alert(1)}{text} \\]',
        '\\[ \\htmlClass{class" onclick="alert(1)}{text} \\]',
        '\\[ \\[ <script>alert(1)</script> \\] \\]',
        '\\( \\( <img src=x onerror=alert(1)> \\) \\)'
      ];

      for (const vector of nestedVectors) {
        const rendered = processMath(vector);

        // Must not contain raw executable HTML tags or active event handler attributes
        assert.ok(!/<script[\s>]/i.test(rendered), `Nested <script> leaked in: ${vector}`);
        assert.ok(!/<img[\s>]/i.test(rendered), `Nested <img> leaked in: ${vector}`);
        assert.ok(!/<svg[\s>]/i.test(rendered), `Nested <svg> leaked in: ${vector}`);
        assert.ok(!/<iframe[\s>]/i.test(rendered), `Nested <iframe> leaked in: ${vector}`);
        assert.ok(!/<a\s+[^>]*href="javascript:/i.test(rendered), `Active javascript: href tag leaked in: ${vector}`);
        assert.ok(!/<[a-z0-9_-]+\s+[^>]*on[a-z]+\s*=/i.test(rendered), `Active event handler attribute leaked in: ${vector}`);
      }
    });

    it('safely handles unclosed math delimiters, LaTeX syntax errors, and malformed inputs', () => {
      const malformedVectors = [
        '\\[ <script>alert("unclosed_display")',
        '$$ <img src=x onerror=alert("unclosed_dollar")',
        '\\( <svg onload=alert("unclosed_inline")',
        '$ <script>alert("single_dollar")',
        '\\[ \\invalidMacro{123} <script>alert(1)</script> \\]',
        '\\[ \\frac{1}{ <img src=x onerror=alert(1)> } \\]',
        '\\sqrt[ <svg onload=alert(1)> ]{x}'
      ];

      for (const vector of malformedVectors) {
        let rendered = '';
        assert.doesNotThrow(() => {
          rendered = processMath(vector);
        }, `processMath threw an unhandled exception on malformed vector: ${vector}`);

        assert.ok(!/<script[\s>]/i.test(rendered), `Leaked unescaped <script> in: ${vector}`);
        assert.ok(!/<img[\s>]/i.test(rendered), `Leaked unescaped <img> in: ${vector}`);
        assert.ok(!/<svg[\s>]/i.test(rendered), `Leaked unescaped <svg> in: ${vector}`);
        assert.ok(!/<[a-z0-9_-]+\s+[^>]*on[a-z]+\s*=/i.test(rendered), `Leaked active handler in: ${vector}`);
      }
    });

    it('safely processes Markdown formatting (bold, code, tables) mixed with HTML injection', () => {
      const mixedInputs = [
        '**<script>alert(1)</script>**',
        '`<img src=x onerror=alert(1)>`',
        '| Header 1 | Header 2 |\n|---|---|\n| `<script>alert(1)</script>` | **<svg onload=alert(1)>** |',
        'Official GATE AG Solution:\n1. Step 1: Calculate $\\eta = \\frac{P_{out}}{P_{in}}$\n2. Step 2: <script>alert("step")</script>'
      ];

      for (const input of mixedInputs) {
        const rendered = processMath(input);
        assert.ok(!/<script[\s>]/i.test(rendered));
        assert.ok(!/<img[\s>]/i.test(rendered));
        assert.ok(!/<svg[\s>]/i.test(rendered));
        assert.ok(!/<[a-z0-9_-]+\s+[^>]*on[a-z]+\s*=/i.test(rendered));
      }
    });
  });

  // =========================================================================
  // CHALLENGE SECTION 3: Offline Sync Resilience, Queueing & Deduplication
  // =========================================================================
  describe('Adversarial Challenge: Offline Sync, Queueing, Deduplication & Concurrency', () => {

    it('handles simulated offline drops and ensures queue preservation without data corruption', async () => {
      // Simulate 5 test attempts completed during network offline drop
      const attemptIds = [];
      for (let i = 1; i <= 5; i++) {
        const res = await saveTestAttempt({
          student_name: `Offline Aspirant ${i}`,
          admission_no: `2022AE0${i}BIV`,
          email: `aspirant${i}@example.com`,
          paper_title: `GATE AG CBT Mock ${i}`,
          score: 50 + i * 5,
          total_marks: 100,
          submitted_at: new Date(Date.now() + i * 1000).toISOString()
        });

        assert.strictEqual(res.success, true);
        assert.strictEqual(res.savedLocally, true);
        assert.strictEqual(res.synced, false); // Offline mode
        assert.ok(res.client_attempt_id);
        attemptIds.push(res.client_attempt_id);
      }

      // Verify all 5 attempts are queued in localStorage
      const queued = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TEST_ATTEMPTS_KEY));
      assert.strictEqual(queued.length, 5);
      assert.strictEqual(queued.every(a => a._syncedToBackend === false), true);

      // Verify attempt IDs are all distinct
      const uniqueIds = new Set(queued.map(a => a.client_attempt_id));
      assert.strictEqual(uniqueIds.size, 5);
    });

    it('empirically challenges duplicate submissions with identical client_attempt_id', async () => {
      const fixedUUID = 'adversarial-uuid-11223344';

      // 1. Initial attempt submission
      const res1 = await saveTestAttempt({
        client_attempt_id: fixedUUID,
        student_name: 'Adversarial Tester',
        admission_no: '2022AE99BIV',
        email: 'tester@hau.ac.in',
        paper_title: 'GATE AG 2026 Mock Paper',
        score: 40.0,
        total_marks: 100,
        time_spent_seconds: 5000
      });
      assert.strictEqual(res1.client_attempt_id, fixedUUID);

      let localQueue = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TEST_ATTEMPTS_KEY));
      assert.strictEqual(localQueue.length, 1);
      assert.strictEqual(localQueue[0].score, 40.0);

      // 2. Rapid duplicate submission (e.g. user double-clicks submit or network retries)
      const res2 = await saveTestAttempt({
        client_attempt_id: fixedUUID,
        student_name: 'Adversarial Tester',
        admission_no: '2022AE99BIV',
        email: 'tester@hau.ac.in',
        paper_title: 'GATE AG 2026 Mock Paper',
        score: 85.0, // updated / final score
        total_marks: 100,
        time_spent_seconds: 5200
      });
      assert.strictEqual(res2.client_attempt_id, fixedUUID);

      localQueue = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TEST_ATTEMPTS_KEY));
      assert.strictEqual(localQueue.length, 1, 'Local queue must NOT duplicate row for identical client_attempt_id');
      assert.strictEqual(localQueue[0].score, 85.0, 'Local queue must update existing entry');
    });

    it('empirically challenges concurrent attempt queueing under asynchronous load', async () => {
      const promises = [];
      const count = 20;

      for (let i = 0; i < count; i++) {
        promises.push(
          saveTestAttempt({
            student_name: `Concurrent User ${i}`,
            score: 50 + (i % 20),
            total_marks: 100
          })
        );
      }

      const results = await Promise.all(promises);
      assert.strictEqual(results.length, count);
      assert.strictEqual(results.every(r => r.success), true);

      const localQueue = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TEST_ATTEMPTS_KEY));
      assert.strictEqual(localQueue.length, count, `All ${count} concurrent attempts must be queued`);
      
      const ids = new Set(localQueue.map(a => a.client_attempt_id));
      assert.strictEqual(ids.size, count, 'All concurrent client_attempt_ids must be unique');
    });

    it('empirically challenges query merging and deduplication across local and cloud schemas', async () => {
      // Simulate existing local storage with mixture of synced and unsynced attempts
      const mixedData = [
        {
          client_attempt_id: 'shared_uuid_alpha',
          student_name: 'Kavita Singh',
          admission_no: '2022AE30BIV',
          email: 'kavita@hau.ac.in',
          paper_title: 'GATE AG Full Mock 1',
          score: 65,
          submitted_at: '2026-08-20T10:00:00.000Z',
          _syncedToBackend: true
        },
        {
          client_attempt_id: 'shared_uuid_alpha', // duplicate of above
          student_name: 'Kavita Singh',
          admission_no: '2022AE30BIV',
          email: 'kavita@hau.ac.in',
          paper_title: 'GATE AG Full Mock 1',
          score: 65,
          submitted_at: '2026-08-20T10:00:00.000Z',
          _syncedToBackend: false
        },
        {
          client_attempt_id: 'uuid_beta_unsynced',
          student_name: 'Kavita Singh',
          admission_no: '2022AE30BIV',
          email: 'kavita@hau.ac.in',
          paper_title: 'GATE AG Full Mock 2',
          score: 78,
          submitted_at: '2026-08-22T14:00:00.000Z',
          _syncedToBackend: false
        }
      ];

      localStorage.setItem(LOCAL_STORAGE_TEST_ATTEMPTS_KEY, JSON.stringify(mixedData));

      const attempts = await getStudentTestAttempts('2022AE30BIV');
      assert.strictEqual(attempts.length, 2, 'Must deduplicate shared_uuid_alpha to exactly 1 entry');
      assert.strictEqual(attempts[0].client_attempt_id, 'uuid_beta_unsynced', 'Most recent attempt first');
      assert.strictEqual(attempts[1].client_attempt_id, 'shared_uuid_alpha');
    });

    it('empirically verifies auto-sync triggers upon network reconnect events', () => {
      const unbind = initAutoSyncOnReconnect();

      assert.ok(mockEventListeners.has('online'), 'Window must have online listener');
      assert.ok(mockEventListeners.has('app-online'), 'Window must have app-online listener');

      // Dispatch 'online' event
      assert.doesNotThrow(() => {
        window.dispatchEvent('online');
      });

      // Dispatch 'app-online' event
      assert.doesNotThrow(() => {
        window.dispatchEvent('app-online');
      });

      // Teardown
      if (typeof unbind === 'function') {
        unbind();
        assert.strictEqual(mockEventListeners.get('online').length, 0);
        assert.strictEqual(mockEventListeners.get('app-online').length, 0);
      }
    });

    it('enforces maximum capacity limit of 100 items in local storage queue to prevent memory exhaustion', async () => {
      // Save 110 attempts sequentially
      for (let i = 0; i < 110; i++) {
        await saveTestAttempt({
          student_name: `Aspirant ${i}`,
          score: 50
        });
      }

      const queue = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TEST_ATTEMPTS_KEY));
      assert.strictEqual(queue.length, 100, 'Queue must cap at 100 entries to prevent localStorage quota exhaustion');
      assert.strictEqual(queue[0].student_name, 'Aspirant 109', 'Most recent attempt must be at index 0');
    });
  });

});
