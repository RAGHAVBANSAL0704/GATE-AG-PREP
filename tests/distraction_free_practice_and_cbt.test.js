import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Distraction-Free Question Practice & CBT Environment Test Suite', () => {

  describe('Application Shell & Distraction-Free State Wiring', () => {
    it('manages isDistractionFree state in App.jsx and hides peripheral chrome when active', () => {
      const appPath = path.resolve(__dirname, '../src/App.jsx');
      const appCode = fs.readFileSync(appPath, 'utf8');

      assert.ok(appCode.includes("const [isDistractionFree, setIsDistractionFree] = useState(false);"), 'App.jsx must declare isDistractionFree state');
      assert.ok(appCode.includes("onDistractionFreeChange={setIsDistractionFree}"), 'App.jsx must pass onDistractionFreeChange');
      assert.ok(appCode.includes("!isDistractionFree && (") && appCode.includes("<Sidebar"), 'App.jsx must hide Sidebar when distraction-free is active');
      assert.ok(appCode.includes('w-full min-h-screen p-0 m-0'), 'App.jsx main container must adapt to full-screen when distraction-free');
    });

    it('maintains original clean navigation and command palette without clutter', () => {
      const navbarPath = path.resolve(__dirname, '../src/components/Navbar.jsx');
      const navbarCode = fs.readFileSync(navbarPath, 'utf8');
      assert.ok(navbarCode.includes("'5-in-1'"), 'Navbar must retain original 5-in-1 badge for practicehub');

      const sidebarPath = path.resolve(__dirname, '../src/components/Sidebar.jsx');
      const sidebarCode = fs.readFileSync(sidebarPath, 'utf8');
      assert.ok(sidebarCode.includes("matches: ['practicehub', 'practice', 'custompractice', 'customtest', 'questionbank', 'qbank']"), 'Sidebar must maintain clean original practicehub matching tabs');

      const cmdPath = path.resolve(__dirname, '../src/components/CommandPaletteModal.jsx');
      const cmdCode = fs.readFileSync(cmdPath, 'utf8');
      assert.ok(!cmdCode.includes("nav_arena"), 'Command palette must not contain unnecessary extra arena shortcut');
    });
  });

  describe('PracticeHub Clean Architecture', () => {
    it('strictly maintains the 5 original sub-tabs with no clutter cards', () => {
      const hubPath = path.resolve(__dirname, '../src/components/PracticeHub.jsx');
      const hubCode = fs.readFileSync(hubPath, 'utf8');

      assert.ok(hubCode.includes("id: 'qbank'"), 'Must include Question Bank subtab');
      assert.ok(hubCode.includes("id: 'practice'"), 'Must include Official PYQ Pool subtab');
      assert.ok(hubCode.includes("id: 'custompractice'"), 'Must include Custom Pool subtab');
      assert.ok(hubCode.includes("id: 'customtest'"), 'Must include Speed Test subtab');
      assert.ok(hubCode.includes("id: 'generator'"), 'Must include PDF Generator subtab');

      // Ensure no extra tab IDs
      assert.ok(!hubCode.includes("id: 'arena'"), 'PracticeHub must NOT contain extra arena subtab');
      assert.ok(!hubCode.includes("Section-Wise Focus Practice"), 'PracticeHub must NOT contain redundant card grids');
    });

    it('hides top header strip in PracticeHub when isDistractionFree is active', () => {
      const hubPath = path.resolve(__dirname, '../src/components/PracticeHub.jsx');
      const hubCode = fs.readFileSync(hubPath, 'utf8');

      assert.ok(hubCode.includes("!isDistractionFree && ("), 'PracticeHub header must be hidden when isDistractionFree is true');
      assert.ok(hubCode.includes("isDistractionFree={isDistractionFree}"), 'Must forward isDistractionFree to QuestionBankView');
      assert.ok(hubCode.includes("onDistractionFreeChange={onDistractionFreeChange}"), 'Must forward onDistractionFreeChange to QuestionBankView');
    });
  });

  describe('DistractionFreePromptModal Approval Interface', () => {
    it('exists and exports accessible modal component', () => {
      const modalPath = path.resolve(__dirname, '../src/components/DistractionFreePromptModal.jsx');
      assert.ok(fs.existsSync(modalPath), 'DistractionFreePromptModal.jsx must exist');

      const modalCode = fs.readFileSync(modalPath, 'utf8');
      assert.ok(modalCode.includes("DistractionFreePromptModal"), 'Must export DistractionFreePromptModal');
      assert.ok(modalCode.includes("role=\"dialog\""), 'Must have accessible dialog role');
      assert.ok(modalCode.includes("onConfirmDistractionFree"), 'Must handle onConfirmDistractionFree');
      assert.ok(modalCode.includes("onConfirmStandard"), 'Must handle onConfirmStandard');
    });

    it('displays features checklist highlighting zero distraction and tools', () => {
      const modalPath = path.resolve(__dirname, '../src/components/DistractionFreePromptModal.jsx');
      const modalCode = fs.readFileSync(modalPath, 'utf8');

      assert.ok(modalCode.includes("Sidebars &amp; network strips hidden"), 'Must highlight hidden sidebars');
      assert.ok(modalCode.includes("Integrated GATE Virtual Calculator"), 'Must highlight virtual calculator');
      assert.ok(modalCode.includes("Quick-access GATE AG formulas"), 'Must highlight formulas');
      assert.ok(modalCode.includes("Yes, Launch Distraction-Free"), 'Must provide primary distraction-free button');
    });
  });

  describe('QuestionBankView Distraction-Free Focus Environment', () => {
    it('prompts approval modal before proceeding to practice question', () => {
      const qbPath = path.resolve(__dirname, '../src/components/QuestionBankView.jsx');
      const qbCode = fs.readFileSync(qbPath, 'utf8');

      assert.ok(qbCode.includes("setShowDistractionPrompt(true)"), 'handleStartPractice must trigger setShowDistractionPrompt');
      assert.ok(qbCode.includes("handleConfirmDistractionFree"), 'Must implement handleConfirmDistractionFree');
      assert.ok(qbCode.includes("handleConfirmStandardView"), 'Must implement handleConfirmStandardView');
      assert.ok(qbCode.includes("<DistractionFreePromptModal"), 'Must render DistractionFreePromptModal');
    });

    it('renders dedicated distraction-free focus console at top with timer, formula sheet, and fullscreen controls', () => {
      const qbPath = path.resolve(__dirname, '../src/components/QuestionBankView.jsx');
      const qbCode = fs.readFileSync(qbPath, 'utf8');

      assert.ok(qbCode.includes("activeView === 'practice' && isDistractionFreeLocal"), 'Must check distraction-free practice mode');
      assert.ok(qbCode.includes("Focus Arena"), 'Must display Focus Arena badge in distraction-free bar');
      assert.ok(qbCode.includes("handleExitFocus"), 'Must provide handleExitFocus button');
      assert.ok(qbCode.includes("toggleBrowserFullscreen"), 'Must provide toggleBrowserFullscreen');
      assert.ok(qbCode.includes("setShowFormulaSheetModal(true)"), 'Must provide formula sheet trigger');
    });

    it('safely extracts formulas from topics without throwing TypeError', () => {
      const qbPath = path.resolve(__dirname, '../src/components/QuestionBankView.jsx');
      const qbCode = fs.readFileSync(qbPath, 'utf8');
      assert.ok(qbCode.includes("catGroup.topics || []).flatMap"), 'QuestionBankView must safely extract formulas from topics');

      const mockPath = path.resolve(__dirname, '../src/components/MockTestMode.jsx');
      const mockCode = fs.readFileSync(mockPath, 'utf8');
      assert.ok(mockCode.includes("catGroup.topics || []).flatMap"), 'MockTestMode must safely extract formulas from topics');
    });
  });

  describe('MockTestMode Distraction-Free CBT Examination Hall', () => {
    it('prompts user confirmation for distraction-free CBT before launching exam', () => {
      const mockPath = path.resolve(__dirname, '../src/components/MockTestMode.jsx');
      const mockCode = fs.readFileSync(mockPath, 'utf8');

      assert.ok(mockCode.includes("setShowCbtPromptModal(true)"), 'handleStartExam must prompt confirmation');
      assert.ok(mockCode.includes("executeStartExam"), 'Must provide executeStartExam implementation');
      assert.ok(mockCode.includes("Launch Distraction-Free CBT Exam"), 'Modal must specify Launch Distraction-Free CBT Exam');
      
      // Ensure the modal is rendered in the pre-exam instructions view before early return
      const instructionsViewEnd = mockCode.indexOf("// VIEW 2: PAPERS SELECTION LIST");
      const instructionsPart = mockCode.slice(0, instructionsViewEnd);
      assert.ok(instructionsPart.includes("<DistractionFreePromptModal"), 'DistractionFreePromptModal must be rendered within pre-exam instructions view');
    });

    it('expands tcs-cbt-container to full-bleed distraction-free screen during exam', () => {
      const mockPath = path.resolve(__dirname, '../src/components/MockTestMode.jsx');
      const mockCode = fs.readFileSync(mockPath, 'utf8');

      assert.ok(mockCode.includes("isDistractionFree"), 'Must check isDistractionFree on tcs-cbt-container');
      assert.ok(mockCode.includes("w-full min-h-screen"), 'Must apply full width min-h-screen in distraction-free mode');
    });

    it('safely restores standard shell layout on test submit, save midway, or cancel', () => {
      const mockPath = path.resolve(__dirname, '../src/components/MockTestMode.jsx');
      const mockCode = fs.readFileSync(mockPath, 'utf8');

      const submitIndex = mockCode.indexOf("handleSubmitFinal");
      assert.ok(submitIndex !== -1, 'handleSubmitFinal must exist');

      const saveMidwayIndex = mockCode.indexOf("handleSaveTestMidway");
      assert.ok(saveMidwayIndex !== -1, 'handleSaveTestMidway must exist');

      const cancelIndex = mockCode.indexOf("handleCancelExam");
      assert.ok(cancelIndex !== -1, 'handleCancelExam must exist');

      assert.ok(mockCode.includes("onDistractionFreeChange?.(false)"), 'Must reset distraction-free mode on exam exit');
      assert.ok(mockCode.includes("onDistractionFreeChange?.(true)"), 'Must activate distraction-free mode on exam resume/start');
    });
  });

});
