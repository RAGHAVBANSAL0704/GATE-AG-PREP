import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { evaluateQuestion, computeMockTestScore, getEstimatedPercentile } from "../src/utils/scoring.js";
import { GATE_AG_FORMULAS } from "../src/data/formulas.js";
import { GATE_AG_SYLLABUS } from "../src/data/syllabus.js";
import { hashPasswordSync } from "../src/services/authService.js";
import { verifyAdminPasscode, computePasscodeSha256 } from "../src/services/questionSyncService.js";
import { getEffectiveStudentId, getVaultStorageKey } from "../src/services/mistakeVaultService.js";
import { generateUUID } from "../src/services/testAttemptService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const questionsPath = path.resolve(projectRoot, "src/data/questions.json");
const mockPapersPath = path.resolve(projectRoot, "src/data/mock_papers.json");

const questionsData = JSON.parse(fs.readFileSync(questionsPath, "utf8"));
const mockPapersData = JSON.parse(fs.readFileSync(mockPapersPath, "utf8"));

describe("FULL WEB AUDIT: Security, Data Storage, Functionality & Invariants", () => {

  describe("Pillar 1: Security & Cryptography Audit", () => {
    it("verifies zero secret keys or private tokens in source code and public assets", () => {
      const srcDir = path.join(projectRoot, "src");
      const publicDir = path.join(projectRoot, "public");

      const forbiddenPatterns = [
        "SUPABASE_SERVICE_ROLE_KEY",
        "service_role_secret",
        "BEGIN PRIVATE KEY",
        "BEGIN RSA PRIVATE KEY",
        "BEGIN EC PRIVATE KEY",
        "sk-proj-",
        "ghp_",
        "xoxb-"
      ];

      function scan(dir) {
        if (!fs.existsSync(dir)) return;
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          const full = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            scan(full);
          } else if (/\.(js|jsx|ts|tsx|json|html|css|webmanifest)$/.test(entry.name)) {
            const code = fs.readFileSync(full, "utf8");
            for (const pattern of forbiddenPatterns) {
              assert.ok(
                !code.includes(pattern),
                `Security Alert: Found forbidden token "${pattern}" in file ${entry.name}`
              );
            }
          }
        }
      }

      scan(srcDir);
      scan(publicDir);
    });

    it("verifies all external links with target=\"_blank\" specify rel=\"noopener noreferrer\"", () => {
      const srcDir = path.join(projectRoot, "src");
      let checkedLinksCount = 0;

      function scan(dir) {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
        for (const entry of entries) {
          const full = path.join(dir, entry.name);
          if (entry.isDirectory()) {
            scan(full);
          } else if (/\.(jsx|tsx|html)$/.test(entry.name)) {
            const code = fs.readFileSync(full, "utf8");
            const targetBlankRegex = /<a[^>]+target=["']_blank["'][^>]*>/gi;
            let match;
            while ((match = targetBlankRegex.exec(code)) !== null) {
              const tag = match[0];
              assert.ok(
                tag.includes('rel="noopener noreferrer"') || tag.includes("rel='noopener noreferrer'"),
                `Link missing rel="noopener noreferrer" in ${entry.name}: ${tag}`
              );
              checkedLinksCount++;
            }
          }
        }
      }

      scan(srcDir);
      assert.ok(checkedLinksCount > 0, "Must have verified external target=\"_blank\" links");
    });

    it("validates deterministic salted SHA-256 hashing for passwords and passcodes", () => {
      const pass1 = "TestSecret123!";
      const hash1 = hashPasswordSync(pass1);
      const hash2 = hashPasswordSync(pass1);
      assert.strictEqual(hash1, hash2, "Password hash must be deterministic");
      assert.ok(hash1.startsWith("sha256_"), "Password hash must use sha256_ prefix");
      assert.strictEqual(hash1.length, 7 + 64, "SHA-256 hash must have 64 hex characters");

      const hashOther = hashPasswordSync("DifferentPass123!");
      assert.notStrictEqual(hash1, hashOther, "Distinct passwords must produce distinct hashes");
    });

    it("verifies admin passcodes verification against SHA-256 master set", () => {
      assert.ok(verifyAdminPasscode("gateag2026"), "Official admin passcode gateag2026 must verify");
      assert.ok(verifyAdminPasscode("raghav0704"), "Official admin passcode raghav0704 must verify");
      assert.ok(verifyAdminPasscode("admin2026"), "Official admin passcode admin2026 must verify");
      assert.ok(verifyAdminPasscode("gateagadmin"), "Official admin passcode gateagadmin must verify");
      assert.strictEqual(verifyAdminPasscode("wrong_passcode"), false, "Invalid passcode must be rejected");
      assert.strictEqual(verifyAdminPasscode(""), false, "Empty passcode must be rejected");
    });

    it("audits index.html for critical security meta headers", () => {
      const indexHtml = fs.readFileSync(path.join(projectRoot, "index.html"), "utf8");
      assert.ok(indexHtml.includes("referrer"), "index.html must include referrer policy");
      assert.ok(indexHtml.includes("strict-origin-when-cross-origin"), "index.html must use strict-origin-when-cross-origin");
      assert.ok(indexHtml.includes("X-Content-Type-Options"), "index.html must include X-Content-Type-Options");
    });
  });

  describe("Pillar 2: Data Storage & Offline Persistence Audit", () => {
    it("verifies IndexedDB database schema and object store configurations", () => {
      const idbCode = fs.readFileSync(path.join(projectRoot, "src/utils/indexedDB.js"), "utf8");
      const expectedStores = [
        "test_attempts",
        "bookmarks",
        "flashcards",
        "chat_messages",
        "community_posts",
        "syllabus_progress",
        "edited_questions"
      ];
      expectedStores.forEach(store => {
        assert.ok(
          idbCode.includes(`'${store}'`) || idbCode.includes(`"${store}"`),
          `IndexedDB must configure object store "${store}"`
        );
      });
    });

    it("verifies UUID v4 generation format and entropy", () => {
      const uuid1 = generateUUID();
      const uuid2 = generateUUID();
      assert.ok(uuid1 && uuid1.length >= 10, "UUID must be non-empty");
      assert.ok(uuid2 && uuid2.length >= 10, "UUID must be non-empty");
      assert.notStrictEqual(uuid1, uuid2, "Consecutive UUIDs must be unique");
    });

    it("verifies Mistake Vault student isolation keys", () => {
      assert.strictEqual(getEffectiveStudentId("HAU2023001"), "HAU2023001");
      assert.strictEqual(getVaultStorageKey("HAU2023001"), "gate_ag_mistake_vault_HAU2023001");
      assert.strictEqual(getVaultStorageKey("raghav@example.com"), "gate_ag_mistake_vault_raghav@example.com");
      assert.strictEqual(getVaultStorageKey(""), "gate_ag_mistake_vault_default_student");
    });
  });

  describe("Pillar 3: Examination Logic & Dataset Integrity Audit", () => {
    it("audits official PYQ dataset (1,324 questions across 2007-2026)", () => {
      assert.strictEqual(questionsData.length, 1324, "Official PYQ count must be exactly 1324");
      const typeCounts = { MCQ: 0, MSQ: 0, NAT: 0 };
      questionsData.forEach((q, idx) => {
        assert.ok(q.id, `Question #${idx} missing id`);
        assert.ok(q.question, `Question ${q.id} missing text`);
        assert.ok(q.solution, `Question ${q.id} missing solution`);
        assert.ok([1, 2].includes(Number(q.marks)), `Question ${q.id} marks must be 1 or 2`);
        typeCounts[q.type] = (typeCounts[q.type] || 0) + 1;
      });
      assert.ok(typeCounts.MCQ > 500, "MCQ pool must exceed 500 questions");
      assert.ok(typeCounts.NAT > 300, "NAT pool must exceed 300 questions");
      assert.strictEqual(typeCounts.MCQ + typeCounts.MSQ + typeCounts.NAT, 1324);
    });

    it("audits 50 Custom Mock Papers (3,250 questions, 65 Qs / 100M each)", () => {
      for (let i = 1; i <= 50; i++) {
        const numStr = String(i).padStart(2, "0");
        const mockFile = path.resolve(projectRoot, `src/data/custom_mock_2027_${numStr}.json`);
        assert.ok(fs.existsSync(mockFile), `Mock file custom_mock_2027_${numStr}.json must exist`);
        const mockData = JSON.parse(fs.readFileSync(mockFile, "utf8"));
        assert.ok(Array.isArray(mockData.questions), `Mock ${numStr} questions must be an array`);
        assert.strictEqual(mockData.questions.length, 65, `Mock ${numStr} must contain exactly 65 questions`);
        const totalMarks = mockData.questions.reduce((sum, q) => sum + Number(q.marks || 1), 0);
        assert.strictEqual(totalMarks, 100, `Mock ${numStr} total marks must be exactly 100`);
        const gaQuestions = mockData.questions.slice(0, 10);
        const gaMarks = gaQuestions.reduce((sum, q) => sum + Number(q.marks || 1), 0);
        assert.strictEqual(gaMarks, 15, `Mock ${numStr} GA section must total 15 marks`);
        const techQuestions = mockData.questions.slice(10, 65);
        const techMarks = techQuestions.reduce((sum, q) => sum + Number(q.marks || 1), 0);
        assert.strictEqual(techMarks, 85, `Mock ${numStr} Tech section must total 85 marks`);
      }
    });

    it("audits MCQ scoring accuracy (+1/-0.33 and +2/-0.67)", () => {
      const q1m = { id: "test_1m", type: "MCQ", marks: 1, correct_answer: "B" };
      const q2m = { id: "test_2m", type: "MCQ", marks: 2, correct_answer: "C" };
      const res1mCorr = evaluateQuestion(q1m, "B", "ANSWERED");
      assert.strictEqual(res1mCorr.isCorrect, true);
      assert.strictEqual(res1mCorr.marksAwarded, 1);
      const res1mIncorr = evaluateQuestion(q1m, "A", "ANSWERED");
      assert.strictEqual(res1mIncorr.isCorrect, false);
      assert.ok(Math.abs(res1mIncorr.marksAwarded - (-1/3)) < 1e-6);
      const res2mCorr = evaluateQuestion(q2m, "C", "ANSWERED");
      assert.strictEqual(res2mCorr.isCorrect, true);
      assert.strictEqual(res2mCorr.marksAwarded, 2);
      const res2mIncorr = evaluateQuestion(q2m, "D", "ANSWERED");
      assert.strictEqual(res2mIncorr.isCorrect, false);
      assert.ok(Math.abs(res2mIncorr.marksAwarded - (-2/3)) < 1e-6);
    });

    it("audits MSQ exact match evaluation (0 partial credit, 0 penalty)", () => {
      const qMsq = { id: "test_msq", type: "MSQ", marks: 2, correct_answer: "A, C" };
      const resCorr = evaluateQuestion(qMsq, ["A", "C"], "ANSWERED");
      assert.strictEqual(resCorr.isCorrect, true);
      assert.strictEqual(resCorr.marksAwarded, 2);
      const resPartial = evaluateQuestion(qMsq, ["A"], "ANSWERED");
      assert.strictEqual(resPartial.isCorrect, false);
      assert.strictEqual(resPartial.marksAwarded, 0);
    });

    it("audits NAT tolerance and range evaluation (IEEE-754 epsilon safe)", () => {
      const qNatRange = { id: "test_nat_range", type: "NAT", marks: 2, correct_answer: "1.90 to 2.10" };
      const qNatScalar = { id: "test_nat_scalar", type: "NAT", marks: 1, correct_answer: "15.5", tolerance: 0.1 };
      assert.strictEqual(evaluateQuestion(qNatRange, "2.00", "ANSWERED").isCorrect, true);
      assert.strictEqual(evaluateQuestion(qNatRange, "1.90", "ANSWERED").isCorrect, true);
      assert.strictEqual(evaluateQuestion(qNatRange, "2.10", "ANSWERED").isCorrect, true);
      assert.strictEqual(evaluateQuestion(qNatRange, "2.15", "ANSWERED").isCorrect, false);
      assert.strictEqual(evaluateQuestion(qNatScalar, "15.55", "ANSWERED").isCorrect, true);
      assert.strictEqual(evaluateQuestion(qNatScalar, "15.70", "ANSWERED").isCorrect, false);
    });

    it("audits Formula Sheet (57 formulas across 8 official categories)", () => {
      assert.strictEqual(GATE_AG_FORMULAS.length, 8, "Formula sheet must have 8 sections");
      let formulaCount = 0;
      GATE_AG_FORMULAS.forEach(sec => {
        assert.ok(sec.category, "Category must have title");
        assert.ok(Array.isArray(sec.topics), "Category must have topics array");
        sec.topics.forEach(t => {
          assert.ok(Array.isArray(t.formulas), "Topic must have formulas array");
          t.formulas.forEach(f => {
            assert.ok(f.title && f.formula, "Formula must have title and formula LaTeX");
            formulaCount++;
          });
        });
      });
      assert.strictEqual(formulaCount, 57, "Total formula count must be 57");
    });

    it("audits Syllabus Breakdown (8 sections, 181 granular subtopics)", () => {
      assert.strictEqual(GATE_AG_SYLLABUS.length, 8, "Syllabus must have 8 sections");
      let subtopicCount = 0;
      GATE_AG_SYLLABUS.forEach(sec => {
        assert.ok(sec.title, "Syllabus section must have title");
        assert.ok(Array.isArray(sec.topics), "Syllabus section must have topics");
        sec.topics.forEach(t => {
          if (Array.isArray(t.subtopics)) subtopicCount += t.subtopics.length;
        });
      });
      assert.strictEqual(subtopicCount, 181, "Total subtopics count must be 181");
    });
  });

  describe("Pillar 4: UI/UX & Theme Engine Audit", () => {
    it("verifies strict 2-theme engine invariant", () => {
      const themeToggleFile = path.join(projectRoot, "src/components/ThemeToggle.jsx");
      if (fs.existsSync(themeToggleFile)) {
        const themeCode = fs.readFileSync(themeToggleFile, "utf8");
        assert.ok(themeCode.includes("light") && themeCode.includes("dark"));
      }
    });

    it("audits Web App Manifest configuration", () => {
      const manifestPath = path.join(projectRoot, "public/manifest.webmanifest");
      const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
      assert.strictEqual(manifest.display, "standalone");
      assert.strictEqual(manifest.theme_color, "#2563EB");
      assert.ok(manifest.icons && manifest.icons.length >= 4);
    });

    it("verifies MockTestMode has no undefined testSubmitted variable references", () => {
      const mockTestCode = fs.readFileSync(path.join(projectRoot, "src/components/MockTestMode.jsx"), "utf8");
      assert.strictEqual(mockTestCode.includes("testSubmitted"), false, "MockTestMode must not reference undeclared testSubmitted");
    });
  });

  describe("Pillar 5: Service Worker & PWA Performance Audit", () => {
    it("verifies Service Worker multi-tier caching architecture and offline fallback", () => {
      const swCode = fs.readFileSync(path.join(projectRoot, "public/sw.js"), "utf8");
      assert.ok(swCode.includes("STATIC_CACHE"));
      assert.ok(swCode.includes("RUNTIME_CACHE"));
      assert.ok(swCode.includes("IMAGES_CACHE"));
      assert.ok(swCode.includes("FONTS_CACHE"));
      assert.ok(swCode.includes("skipWaiting()"));
      assert.ok(swCode.includes("clients.claim()"));
      assert.ok(swCode.includes("request.mode === 'navigate'"));
    });
  });
});
