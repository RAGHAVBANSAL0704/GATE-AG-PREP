import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Mock localStorage and browser environment for Node test environment
const mockStorage = new Map();
globalThis.localStorage = {
  getItem: (key) => mockStorage.get(key) || null,
  setItem: (key, val) => mockStorage.set(key, String(val)),
  removeItem: (key) => mockStorage.delete(key),
  clear: () => mockStorage.clear()
};

try {
  Object.defineProperty(globalThis, 'navigator', {
    value: { userAgent: 'node-test-agent' },
    writable: true,
    configurable: true
  });
} catch (e) {
  // Ignore if navigator is non-configurable
}

import { 
  hashPassword, 
  hashPasswordSync, 
  verifyPassword, 
  registerStudent, 
  loginStudent,
  sanitizeMobileNumber,
  formatDOBPassword,
  validateHAUAdmissionNo
} from '../src/services/authService.js';

import { 
  containsDangerousPayload, 
  stripDangerousHtml, 
  sanitizeText, 
  validateCleanInput, 
  containsAbusiveContent 
} from '../src/utils/profanityFilter.js';

// Dynamically extract escapeHtml function from MathRenderer.jsx source
const mathRendererCode = fs.readFileSync(path.join(projectRoot, 'src/components/MathRenderer.jsx'), 'utf8');
const escapeHtmlMatch = mathRendererCode.match(/export function escapeHtml\(unsafe\) \{([\s\S]*?)\n\}/);
const escapeHtml = new Function('unsafe', escapeHtmlMatch[1]);

describe('Security, Cryptography & Sanitization Defense Test Suite', () => {

  beforeEach(() => {
    mockStorage.clear();
  });

  // =========================================================================
  // 1. Source Code & Client Bundle Secret Key Auditing
  // =========================================================================
  describe('Zero Secret Keys in Client Source Files Audit', () => {
    
    it('verifies no Supabase service role keys or admin secrets exist in source tree', () => {
      const srcDir = path.join(projectRoot, 'src');
      
      function scanDir(dir) {
        const files = fs.readdirSync(dir);
        for (const file of files) {
          const fullPath = path.join(dir, file);
          const stat = fs.statSync(fullPath);
          if (stat.isDirectory()) {
            scanDir(fullPath);
          } else if (/\.(js|jsx|ts|tsx|json|html|css)$/.test(file)) {
            const content = fs.readFileSync(fullPath, 'utf8');
            
            assert.ok(
              !content.includes('SUPABASE_SERVICE_ROLE_KEY'),
              `File ${file} contains reference to SUPABASE_SERVICE_ROLE_KEY`
            );
            assert.ok(
              !content.includes('service_role_secret'),
              `File ${file} contains service_role_secret`
            );
            assert.ok(
              !content.includes('BEGIN PRIVATE KEY'),
              `File ${file} contains raw private key data`
            );
            assert.ok(
              !content.includes('BEGIN RSA PRIVATE KEY'),
              `File ${file} contains RSA private key data`
            );
          }
        }
      }

      scanDir(srcDir);
    });

    it('verifies .env.example contains only safe placeholders with no real secrets', () => {
      const envExamplePath = path.join(projectRoot, '.env.example');
      if (fs.existsSync(envExamplePath)) {
        const content = fs.readFileSync(envExamplePath, 'utf8');
        
        assert.ok(!content.includes('eyJh'), '.env.example must not contain live JWT tokens');
        assert.ok(!content.includes('service_role'), '.env.example must not expose service role key variable');
      }
    });

    it('verifies index.html has no exposed API secrets or hardcoded keys', () => {
      const indexHtmlPath = path.join(projectRoot, 'index.html');
      const content = fs.readFileSync(indexHtmlPath, 'utf8');
      assert.ok(!content.includes('SUPABASE_SERVICE_ROLE_KEY'));
      assert.ok(!content.includes('service_role'));
      assert.ok(!content.includes('secret_key'));
    });
  });

  // =========================================================================
  // 2. Password Hashing & Cryptographic Verification
  // =========================================================================
  describe('Cryptographic Salted SHA-256 Hashing Subsystem', () => {

    it('generates a deterministic 64-hex character salted SHA-256 hash with sha256_ prefix', async () => {
      const pwd = 'Student@Password2026';
      const hash1 = await hashPassword(pwd);
      const hash2 = await hashPassword(pwd);

      assert.strictEqual(hash1, hash2, 'Hash must be deterministic for identical input and salt');
      assert.ok(hash1.startsWith('sha256_'), 'Hash must have sha256_ prefix');
      
      const hexPart = hash1.slice(7);
      assert.strictEqual(hexPart.length, 64, 'SHA-256 hex digest must be exactly 64 characters');
      assert.match(hexPart, /^[0-9a-f]{64}$/, 'SHA-256 hex digest must be valid lowercase hex characters');
    });

    it('synchronous hashPasswordSync produces identical hash to async hashPassword', async () => {
      const pwd = 'SecureTestPassword99';
      const asyncHash = await hashPassword(pwd);
      const syncHash = hashPasswordSync(pwd);

      assert.strictEqual(syncHash, asyncHash, 'hashPasswordSync and hashPassword must generate matching hashes');
    });

    it('produces distinct hashes for different passwords (collision resistance)', async () => {
      const hashA = await hashPassword('Password123');
      const hashB = await hashPassword('Password124');
      const hashC = await hashPassword('password123'); // case difference

      assert.notStrictEqual(hashA, hashB, 'Different passwords must yield different hashes');
      assert.notStrictEqual(hashA, hashC, 'Password hashing must be case-sensitive');
    });

    it('produces distinct hashes when different salts are provided', async () => {
      const pwd = 'SharedPassword';
      const hashSalt1 = await hashPassword(pwd, 'salt_alpha');
      const hashSalt2 = await hashPassword(pwd, 'salt_beta');

      assert.notStrictEqual(hashSalt1, hashSalt2, 'Different salts must yield different hashes');
    });

    it('handles edge case inputs (empty string, null, undefined) safely', async () => {
      const hashEmpty = await hashPassword('');
      const hashNull = await hashPassword(null);
      const hashUndefined = await hashPassword(undefined);

      assert.ok(hashEmpty.startsWith('sha256_'));
      assert.strictEqual(hashNull, hashEmpty, 'null should default to empty string hash');
      assert.strictEqual(hashUndefined, hashEmpty, 'undefined should default to empty string hash');
    });

    it('verifies correct passwords and rejects wrong passwords against salted hash', async () => {
      const plainPassword = 'gateAgTopRanker2026';
      const correctHash = await hashPassword(plainPassword);

      const student = {
        id: 'stu_1',
        dob: '2001-08-15',
        password_hash: correctHash
      };

      // Correct password
      const matchCorrect = await verifyPassword(plainPassword, student);
      assert.strictEqual(matchCorrect, true, 'verifyPassword must return true for correct password');

      // Wrong passwords
      const matchWrong = await verifyPassword('wrongpassword', student);
      assert.strictEqual(matchWrong, false, 'verifyPassword must return false for wrong password');

      const matchClose = await verifyPassword('gateAgTopRanker2027', student);
      assert.strictEqual(matchClose, false, 'verifyPassword must return false for almost-matching password');

      const matchEmpty = await verifyPassword('', student);
      assert.strictEqual(matchEmpty, false, 'verifyPassword must return false for empty password against custom hash');
    });

    it('supports backward-compatible legacy simpleHash verification for existing accounts', async () => {
      let legacyCode = 0;
      const str = 'LegacyPass123';
      for (let i = 0; i < str.length; i++) {
        legacyCode = (legacyCode << 5) - legacyCode + str.charCodeAt(i);
        legacyCode |= 0;
      }
      const legacyHash = 'h_' + Math.abs(legacyCode).toString(36);

      const studentWithLegacy = {
        id: 'stu_legacy',
        dob: '2000-01-01',
        password_hash: legacyHash
      };

      const match = await verifyPassword('LegacyPass123', studentWithLegacy);
      assert.strictEqual(match, true, 'verifyPassword must verify accounts with legacy simpleHash');

      const wrongMatch = await verifyPassword('OtherPassword', studentWithLegacy);
      assert.strictEqual(wrongMatch, false, 'verifyPassword must reject wrong password for legacy account');
    });

    it('verifies default Date-of-Birth (DD/MM/YYYY) password correctly', async () => {
      const student = {
        id: 'stu_dob',
        dob: '2002-12-25', // YYYY-MM-DD
        password_hash: null
      };

      // Default password formatted as 25/12/2002
      const matchDOB = await verifyPassword('25/12/2002', student);
      assert.strictEqual(matchDOB, true, 'verifyPassword must accept formatted DD/MM/YYYY for DOB');

      // Raw unformatted YYYY-MM-DD should not match default
      const matchRawDOB = await verifyPassword('2002-12-25', student);
      assert.strictEqual(matchRawDOB, false, 'verifyPassword must reject unformatted YYYY-MM-DD');

      // Wrong DOB
      const matchWrongDOB = await verifyPassword('24/12/2002', student);
      assert.strictEqual(matchWrongDOB, false, 'verifyPassword must reject incorrect DOB');
    });

    it('handles null or missing student object in verifyPassword gracefully', async () => {
      const result = await verifyPassword('anyPassword', null);
      assert.strictEqual(result, false, 'verifyPassword must return false for null student');
    });
  });

  // =========================================================================
  // 3. MathRenderer HTML Escaping & XSS Protection
  // =========================================================================
  describe('MathRenderer HTML Escaping & XSS Defense', () => {

    it('verifies MathRenderer.jsx defines and exports escapeHtml', () => {
      assert.ok(escapeHtmlMatch, 'MathRenderer.jsx must export escapeHtml function');
      assert.strictEqual(typeof escapeHtml, 'function');
    });

    it('escapes standard dangerous HTML characters correctly', () => {
      const raw = '<script>alert("XSS & Injection")</script>\'';
      const escaped = escapeHtml(raw);

      assert.strictEqual(
        escaped,
        '&lt;script&gt;alert(&quot;XSS &amp; Injection&quot;)&lt;/script&gt;&#039;'
      );
      assert.ok(!escaped.includes('<script>'));
      assert.ok(!escaped.includes('</script>'));
    });

    it('escapes inline event handler attack payloads', () => {
      const imgPayload = '<img src=x onerror=alert(1)>';
      const escaped = escapeHtml(imgPayload);
      assert.strictEqual(escaped, '&lt;img src=x onerror=alert(1)&gt;');
      assert.ok(!escaped.includes('<img'));

      const svgPayload = '<svg onload="alert(\'xss\')">';
      const escapedSvg = escapeHtml(svgPayload);
      assert.strictEqual(escapedSvg, '&lt;svg onload=&quot;alert(&#039;xss&#039;)&quot;&gt;');
      assert.ok(!escapedSvg.includes('<svg'));
    });

    it('escapes iframe and object tag injection attempts', () => {
      const iframePayload = '<iframe src="javascript:alert(1)"></iframe>';
      const escaped = escapeHtml(iframePayload);
      assert.ok(!escaped.includes('<iframe'));
      assert.ok(escaped.includes('&lt;iframe'));
    });

    it('handles null, undefined, number, and non-string inputs safely in escapeHtml', () => {
      assert.strictEqual(escapeHtml(null), '');
      assert.strictEqual(escapeHtml(undefined), '');
      assert.strictEqual(escapeHtml(12345), '12345');
      assert.strictEqual(escapeHtml(true), 'true');
    });
  });

  // =========================================================================
  // 4. ProfanityFilter & Dangerous Payload Sanitization
  // =========================================================================
  describe('Profanity Filter & Dangerous Payload Detection', () => {

    it('detects dangerous HTML/script injection vectors with containsDangerousPayload', () => {
      const dangerousSamples = [
        '<script>alert(1)</script>',
        '<script src="https://evil.com/hook.js"></script>',
        '<SCRIPT>alert("uppercase")</SCRIPT>',
        '<iframe src="https://evil.com"></iframe>',
        '<svg onload=alert(document.cookie)>',
        '<img src=x onerror=alert(1)>',
        'javascript:alert(1)',
        'data:text/html,<script>alert(1)</script>',
        'Hello <img src="bad.jpg" onerror="steal()"> world',
        'Click <div onmouseover="hack()">here</div>'
      ];

      dangerousSamples.forEach(sample => {
        assert.strictEqual(
          containsDangerousPayload(sample), 
          true, 
          `containsDangerousPayload failed to detect: "${sample}"`
        );
      });
    });

    it('allows benign educational text, math formulas, and GATE content', () => {
      const safeSamples = [
        'GATE Agricultural Engineering 2026 Preparation',
        'Calculate Indicated Power: IP = (Pm * L * A * N * n) / 60000',
        'Universal Soil Loss Equation: A = R * K * LS * C * P',
        'The water requirement of Wheat in sandy loam soil is 450 mm.',
        'Psychrometric properties of moist air at dry bulb temperature 35 deg C.'
      ];

      safeSamples.forEach(sample => {
        assert.strictEqual(
          containsDangerousPayload(sample), 
          false, 
          `containsDangerousPayload falsely flagged safe text: "${sample}"`
        );
      });
    });

    it('strips dangerous HTML tags and event handlers via stripDangerousHtml', () => {
      const malicious = 'Hello <script>alert("hack")</script> Student <iframe src="evil.html"></iframe>';
      const stripped = stripDangerousHtml(malicious);
      assert.strictEqual(stripped.includes('<script>'), false);
      assert.strictEqual(stripped.includes('<iframe'), false);
      assert.ok(stripped.includes('Hello  Student'));
    });

    it('detects and masks abusive terms and profanity via containsAbusiveContent and sanitizeText', () => {
      assert.strictEqual(containsAbusiveContent('You are an asshole'), true);
      assert.strictEqual(containsAbusiveContent('Normal discussion on tractors'), false);

      const sanitized = sanitizeText('Stop being an asshole in chat');
      assert.ok(!sanitized.includes('asshole'));
      assert.ok(sanitized.includes('***'));
    });

    it('validates clean inputs for user registration fields via validateCleanInput', () => {
      // Clean input
      const cleanRes = validateCleanInput('Aman Kumar Sharma', 'Full Name');
      assert.strictEqual(cleanRes.isValid, true);
      assert.strictEqual(cleanRes.message, null);

      // Dangerous payload
      const xssRes = validateCleanInput('<script>steal()</script>', 'Username');
      assert.strictEqual(xssRes.isValid, false);
      assert.match(xssRes.message, /dangerous script/i);

      // Abusive payload
      const profRes = validateCleanInput('bhenchod_user', 'Username');
      assert.strictEqual(profRes.isValid, false);
      assert.match(profRes.message, /inappropriate or abusive language/i);
    });
  });

  // =========================================================================
  // 5. Exact-Match Login Logic & Substring Exploit Immunity
  // =========================================================================
  describe('Exact-Match Authentication & Substring Defense', () => {

    it('prevents substring or fuzzy matching login exploits in authService', async () => {
      // Register Student 1: 'rohit'
      const reg1 = await registerStudent({
        studentType: 'visitor',
        fullName: 'Rohit Verma',
        username: 'rohit',
        gender: 'Male',
        mobileNumber: '9876543211',
        email: 'rohit@example.com',
        dob: '2001-01-10',
        customPassword: 'RohitPassword123'
      });
      assert.strictEqual(reg1.success, true);

      // Register Student 2: 'rohit_kumar'
      const reg2 = await registerStudent({
        studentType: 'visitor',
        fullName: 'Rohit Kumar',
        username: 'rohit_kumar',
        gender: 'Male',
        mobileNumber: '9876543222',
        email: 'rohit_kumar@example.com',
        dob: '2001-02-20',
        customPassword: 'KumarPassword999'
      });
      assert.strictEqual(reg2.success, true);

      // Attempt login with substring 'rohit' using Rohit Kumar's password -> must FAIL
      const fakeLogin = await loginStudent('rohit', 'KumarPassword999');
      assert.strictEqual(fakeLogin.success, false, 'Substring match must not log into different account');

      // Exact login for Student 1 with own password -> must SUCCEED
      const correctLogin1 = await loginStudent('rohit', 'RohitPassword123');
      assert.strictEqual(correctLogin1.success, true);
      assert.strictEqual(correctLogin1.student.username, 'rohit');

      // Exact login for Student 2 with own password -> must SUCCEED
      const correctLogin2 = await loginStudent('rohit_kumar', 'KumarPassword999');
      assert.strictEqual(correctLogin2.success, true);
      assert.strictEqual(correctLogin2.student.username, 'rohit_kumar');
    });

    it('verifies exact matching on Admission Number', async () => {
      const regHAU = await registerStudent({
        studentType: 'hau',
        fullName: 'Pooja Rani',
        username: 'pooja_hau',
        admissionNo: '2022AE15BIV',
        gender: 'Female',
        mobileNumber: '9812345678',
        email: 'pooja@hau.ac.in',
        dob: '2002-06-15',
        customPassword: 'PoojaPassword123'
      });
      assert.strictEqual(regHAU.success, true);

      // Partial admission number prefix '2022AE15' must FAIL
      const partialLogin = await loginStudent('2022AE15', 'PoojaPassword123');
      assert.strictEqual(partialLogin.success, false);

      // Exact admission number must SUCCEED
      const exactLogin = await loginStudent('2022AE15BIV', 'PoojaPassword123');
      assert.strictEqual(exactLogin.success, true);
      assert.strictEqual(exactLogin.student.admission_no, '2022AE15BIV');
    });

    it('sanitizes mobile numbers correctly against international prefixes and formatting', () => {
      assert.strictEqual(sanitizeMobileNumber('9876543210'), '9876543210');
      assert.strictEqual(sanitizeMobileNumber('+91 9876543210'), '9876543210');
      assert.strictEqual(sanitizeMobileNumber('09876543210'), '9876543210');
      assert.strictEqual(sanitizeMobileNumber('98765-43210'), '9876543210');
      assert.strictEqual(sanitizeMobileNumber(''), null);
      assert.strictEqual(sanitizeMobileNumber(null), null);
    });

    it('formats Date-of-Birth strings into standard DD/MM/YYYY password format', () => {
      assert.strictEqual(formatDOBPassword('2001-05-18'), '18/05/2001');
      assert.strictEqual(formatDOBPassword('1999-12-01'), '01/12/1999');
      assert.strictEqual(formatDOBPassword(''), '');
      assert.strictEqual(formatDOBPassword(null), '');
    });

    it('validates CCS HAU Admission Number formats accurately', () => {
      const valid1 = validateHAUAdmissionNo('2022AE01BIV');
      assert.strictEqual(valid1.isValid, true);
      assert.strictEqual(valid1.cleanCode, '2022AE01BIV');

      const valid2 = validateHAUAdmissionNo('2021AE12BLII');
      assert.strictEqual(valid2.isValid, true);

      const invalidYear = validateHAUAdmissionNo('1980AE01BIV');
      assert.strictEqual(invalidYear.isValid, false);

      const invalidFormat = validateHAUAdmissionNo('ABCD123');
      assert.strictEqual(invalidFormat.isValid, false);
    });
  });

});
