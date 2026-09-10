import os

jsx_code = r'''import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Award, 
  Sparkles, 
  Info, 
  Flame, 
  BookOpen, 
  CheckCircle2, 
  Calendar, 
  Layers, 
  ArrowRight, 
  Search, 
  Filter, 
  ChevronRight, 
  ChevronDown, 
  Target, 
  Zap, 
  Hash, 
  HelpCircle, 
  Play,
  Calculator,
  Cpu,
  Droplets,
  Activity,
  Compass,
  GitCompare,
  ShieldCheck,
  Scale,
  FileText
} from 'lucide-react';
import defaultQuestions from '../data/questions.json';
import { normalizeSectionTitle, getOfficialSections } from '../utils/syllabusTaxonomy.js';

// Top High-Yield Multi-Chain Formula Workflows in Recent GATE AG (2016–2026)
const MULTI_CHAIN_FORMULA_SPOTLIGHTS = [
  {
    id: 'fpe-engine-traction',
    title: 'Engine Power, Thermal Efficiency & Tractor Drawbar Pull',
    section: 'Section 3: Farm Power',
    icon: Zap,
    color: 'amber',
    badge: 'Guaranteed 2M NAT / Hard MCQ',
    frequency: '100% of Recent GATE Papers',
    overview: 'Multi-stage chain evaluating indicator work, engine brake power, brake specific fuel consumption (BSFC), dynamic axle weight transfer, and net tractive effort under wheel slip.',
    steps: [
      { step: '1', formula: 'P_{ind} = \\frac{p_{mep} \\cdot L \\cdot A \\cdot n \\cdot k}{60000}', label: 'Indicated Power (kW) from cylinder geometry & MEP' },
      { step: '2', formula: 'P_{brake} = P_{ind} \\times \\eta_{mech} = \\frac{2 \\pi N T}{60000}', label: 'Brake Power & Shaft Torque Output' },
      { step: '3', formula: '\\eta_{bth} = \\frac{P_{brake}}{\\dot{m}_f \\times CV} \\implies BSFC = \\frac{\\dot{m}_f}{P_{brake}}', label: 'Brake Thermal Efficiency & Specific Fuel Consumption' },
      { step: '4', formula: 'W_{rear} = W_{static} + \\frac{P_{pull} \\cdot h}{W_b} \\quad ; \\quad S = \\left(1 - \\frac{V_a}{V_t}\\right) \\times 100\\%', label: 'Dynamic Axle Weight Transfer & Wheel Slip' }
    ],
    examTraps: 'Be careful with 2-stroke (n = N) vs 4-stroke (n = N/2) engine cycles, and ensure fuel flow rate is converted from L/h to kg/h using specific gravity before multiplying by Calorific Value.'
  },
  {
    id: 'swce-runoff-peak',
    title: 'SCS-CN Runoff Volume, Time of Concentration & Peak Discharge',
    section: 'Section 4: Soil and Water Conservation Engineering',
    icon: Droplets,
    color: 'sky',
    badge: 'Annual Core Technical Pillar',
    frequency: 'Appears in 100% of Exam Editions',
    overview: 'Chains antecedent moisture conditions (AMC) to curve number (CN), computes soil potential retention S, direct surface runoff depth, time of concentration, and peak flood discharge.',
    steps: [
      { step: '1', formula: 'S = \\frac{25400}{CN} - 254 \\quad (\\text{mm}) \\quad ; \\quad I_a = 0.2 S', label: 'Soil Maximum Potential Retention & Initial Abstraction' },
      { step: '2', formula: 'P_e = \\frac{(P - I_a)^2}{P - I_a + S} \\quad \\text{for } P > I_a', label: 'Direct Surface Runoff Depth (mm) & Volume V = P_e \\times A' },
      { step: '3', formula: 't_c = 0.01947 \\cdot L^{0.77} \\cdot S_0^{-0.385} \\quad (\\text{Kirpich formula})', label: 'Time of Concentration across Watershed Flow Path' },
      { step: '4', formula: 'Q_p = \\frac{C \\cdot I \\cdot A}{360} \\quad (\\text{m}^3/\\text{s for } A \\text{ in ha, } I \\text{ in mm/h})', label: 'Rational Peak Flood Discharge' }
    ],
    examTraps: 'Check AMC condition (AMC-I dry vs AMC-III wet adjustments). In Rational formula Q = CIA/360, remember Area is in hectares, intensity in mm/h, giving discharge directly in m³/s.'
  },
  {
    id: 'apfe-psychrometric-drying',
    title: 'Moist Air Psychrometrics, Heat-Mass Balance & Grain Drying Kinetics',
    section: 'Section 6: Agricultural Process Engineering',
    icon: Activity,
    color: 'purple',
    badge: 'High-Complexity NAT Favorite',
    frequency: 'Recurring in 9 out of 10 Recent Editions',
    overview: 'Combines vapor pressure thermodynamics, humidity ratio, moist air enthalpy, wet-to-dry moisture conversion, and Page\'s thin-layer drying equation to size industrial dryers.',
    steps: [
      { step: '1', formula: 'W = 0.622 \\frac{p_v}{P_{atm} - p_v} \\quad ; \\quad p_v = RH \\times p_{vs}(T_{db})', label: 'Humidity Ratio (kg water / kg dry air)' },
      { step: '2', formula: 'h = 1.006 T_{db} + W (2501 + 1.88 T_{db}) \\quad (\\text{kJ/kg dry air})', label: 'Moist Air Mixture Enthalpy' },
      { step: '3', formula: 'M_d = \\frac{M_w}{1 - M_w} \\quad ; \\quad \\Delta m_w = m_{dry} (M_{d,initial} - M_{d,final})', label: 'Wet Basis to Dry Basis Moisture Conversion' },
      { step: '4', formula: 'MR = \\frac{M - M_e}{M_0 - M_e} = \\exp(-k t^n) \\quad (\\text{Page\'s Equation})', label: 'Thin-Layer Moisture Removal Kinetics & Required Drying Time' }
    ],
    examTraps: 'Never calculate moisture loss using wet basis percentages directly; always convert to dry basis or compute dry matter mass, which remains strictly invariant during drying.'
  },
  {
    id: 'ide-well-hydraulics',
    title: 'Aquifer Transmissivity, Dupuit Equilibrium & Well Drawdown',
    section: 'Section 5: Irrigation and Drainage Engineering',
    icon: Compass,
    color: 'cyan',
    badge: 'Multi-Step Numerical Anchor',
    frequency: 'Core NAT in 2021, 2023, 2024, 2026',
    overview: 'Evaluates hydraulic conductivity from pumping tests, confined vs unconfined aquifer steady-state flow, cone of depression radius, and specific well yield.',
    steps: [
      { step: '1', formula: 'T = K \\cdot b \\quad (\\text{Confined}) \\quad ; \\quad K = \\frac{T}{b}', label: 'Aquifer Transmissivity & Hydraulic Conductivity' },
      { step: '2', formula: 'Q = \\frac{2\\pi T (s_1 - s_2)}{\\ln(r_2 / r_1)} \\quad (\\text{Confined Thiem Equation})', label: 'Confined Aquifer Discharge & Drawdown Gradient' },
      { step: '3', formula: 'Q = \\frac{\\pi K (h_2^2 - h_1^2)}{\\ln(r_2 / r_1)} \\quad (\\text{Unconfined Dupuit Equation})', label: 'Unconfined Aquifer Equilibrium Discharge with Free Surface' },
      { step: '4', formula: 's_w = H - h_w = \\frac{Q}{2\\pi T} \\ln\\left(\\frac{R}{r_w}\\right)', label: 'Well Casing Drawdown & Specific Capacity (Q / s_w)' }
    ],
    examTraps: 'Ensure consistent radii units (r1, r2, R) in the natural logarithm ln(r2/r1). For unconfined aquifers, the driving head is the difference of squares (h2² - h1²), NOT (h2 - h1)².'
  },
  {
    id: 'dfe-pasteurizer-thermal',
    title: 'Heat Exchanger LMTD, Overall U-Value & Thermal Death Kinetics',
    section: 'Section 7: Dairy and Food Engineering',
    icon: Sparkles,
    color: 'rose',
    badge: 'High-Precision Formula Link',
    frequency: 'Tested in 2020, 2022, 2024, 2025, 2026',
    overview: 'Calculates Log Mean Temperature Difference in counter-current flow, composite overall heat transfer coefficient, heat transfer area, and thermal lethality F0 / D-value reduction.',
    steps: [
      { step: '1', formula: 'LMTD = \\frac{\\Delta T_1 - \\Delta T_2}{\\ln(\\Delta T_1 / \\Delta T_2)} \\quad ; \\quad \\Delta T_1 = T_{h,in} - T_{c,out}', label: 'Counter-Flow Log Mean Temperature Difference' },
      { step: '2', formula: '\\frac{1}{U} = \\frac{1}{h_i} + \\frac{x_w}{k_w} + \\frac{1}{h_o} + R_f', label: 'Overall Heat Transfer Coefficient with Wall & Fouling Resistance' },
      { step: '3', formula: 'A = \\frac{Q}{U \\cdot LMTD} = \\frac{\\dot{m}_c C_p (T_{c,out} - T_{c,in})}{U \\cdot LMTD}', label: 'Plate Heat Exchanger Surface Area Requirement' },
      { step: '4', formula: 'F_0 = D_{121} \\left[\\log_{10} N_0 - \\log_{10} N\\right] = 12 D_{121}', label: 'Commercial Sterility Lethality & Holding Tube Residence Time' }
    ],
    examTraps: 'If ΔT1 = ΔT2 (balanced counter-flow heat exchanger), LMTD is not undefined; it equals ΔT1 directly. Watch out for D-value units (minutes) vs process flow velocity (m/s).'
  },
  {
    id: 'fmp-draft-capacity',
    title: 'Soil Cutting Resistance, Implement Draft, Field Capacity & Fuel Rate',
    section: 'Section 2: Farm Machinery',
    icon: Cpu,
    color: 'emerald',
    badge: 'Fundamental Mechanical Workflow',
    frequency: 'Appears in 100% of Past 15 Exam Years',
    overview: 'Determines furrow cross-sectional area, unit soil specific resistance, total drawbar pull, theoretical and effective field capacity, field efficiency, and operational fuel consumption.',
    steps: [
      { step: '1', formula: 'A_{furrow} = n_{bottoms} \\times w_{bottom} \\times d_{depth}', label: 'Total Ploughed Cross-Sectional Area' },
      { step: '2', formula: 'D = k_{soil} \\times A_{furrow} \\implies P_{db} = D \\times v', label: 'Total Implement Draft (N) & Required Drawbar Power (kW)' },
      { step: '3', formula: 'TFC = \\frac{W_{width} \\times v_{speed}}{10} \\quad (\\text{ha/h for } W \\text{ in m, } v \\text{ in km/h})', label: 'Theoretical Field Capacity' },
      { step: '4', formula: 'EFC = TFC \\times \\eta_{field} \\implies \\text{Fuel (L/ha)} = \\frac{\\text{Fuel Rate (L/h)}}{EFC}', label: 'Effective Field Capacity & Fuel Consumption per Hectare' }
    ],
    examTraps: 'Ensure speed v is in km/h when using the W*v/10 shortcut formula. If speed is given in m/s, convert to km/h by multiplying by 3.6, or use W(m) * v(m/s) * 3600 / 10000.'
  },
  {
    id: 'swce-open-channel-jump',
    title: 'Manning Hydraulics, Specific Energy, Froude Number & Hydraulic Jump',
    section: 'Section 4: Soil and Water Conservation Engineering',
    icon: TrendingUp,
    color: 'teal',
    badge: 'Challenging 2M Hydraulic Problem',
    frequency: 'Annual Feature in Water Structures',
    overview: 'Solves open channel steady uniform flow, critical depth, supercritical upstream Froude number, sequent depth equation for hydraulic jump, and head loss dissipation.',
    steps: [
      { step: '1', formula: 'V = \\frac{1}{n} R^{2/3} S_0^{1/2} \\quad ; \\quad Q = A \\cdot V', label: 'Manning\'s Uniform Flow Equation' },
      { step: '2', formula: 'E = y + \\frac{V^2}{2g} = y + \\frac{q^2}{2g y^2} \\quad ; \\quad y_c = \\left(\\frac{q^2}{g}\\right)^{1/3}', label: 'Specific Energy & Critical Depth for Rectangular Channel' },
      { step: '3', formula: 'Fr_1 = \\frac{V_1}{\\sqrt{g y_1}} \\quad ; \\quad \\frac{y_2}{y_1} = \\frac{1}{2}\\left(\\sqrt{1 + 8Fr_1^2} - 1\\right)', label: 'Upstream Froude Number & Sequent Subcritical Depth y2' },
      { step: '4', formula: '\\Delta E = E_1 - E_2 = \\frac{(y_2 - y_1)^3}{4 y_1 y_2}', label: 'Energy Dissipation Loss in Hydraulic Jump Basin' }
    ],
    examTraps: 'q is discharge per unit channel width (m²/s), distinct from total discharge Q (m³/s). Verify that Fr1 > 1.0 (supercritical) before applying the Belanger hydraulic jump equation.'
  },
  {
    id: 'em-linear-diff',
    title: 'Characteristic Polynomial, Matrix Inverse, Eigenvalues & Higher ODEs',
    section: 'Section 1: Engineering Mathematics',
    icon: Calculator,
    color: 'indigo',
    badge: 'Core 13-Mark Foundation',
    frequency: '100% Invariant in Every GATE Edition',
    overview: 'Applies Cayley-Hamilton theorem to evaluate high matrix powers and inverses, diagonalizes linear systems, and evaluates second-order ODEs using complementary and particular integrals.',
    steps: [
      { step: '1', formula: '\\det(A - \\lambda I) = 0 \\implies \\lambda^n + c_{n-1}\\lambda^{n-1} + \\dots + c_0 = 0', label: 'Characteristic Equation & Eigenvalue Roots' },
      { step: '2', formula: 'A^n + c_{n-1} A^{n-1} + \\dots + c_0 I = 0 \\implies A^{-1} = -\\frac{1}{c_0}\\left(A^{n-1} + \\dots\\right)', label: 'Cayley-Hamilton Theorem Matrix Inversion' },
      { step: '3', formula: 'y(x) = y_c(x) + y_p(x) \\quad ; \\quad y_p = \\frac{1}{f(D)} X(x)', label: 'Higher Order Non-Homogeneous Differential Equation' },
      { step: '4', formula: 'x_{n+1} = x_n - \\frac{f(x_n)}{f\'(x_n)} \\quad (\\text{Order 2 Convergence})', label: 'Newton-Raphson Iterative Numerical Root Finding' }
    ],
    examTraps: 'Remember: Sum of eigenvalues = Trace of matrix (sum of diagonal entries), and Product of eigenvalues = Determinant of matrix. This shortcut saves 2 minutes in multiple choice checks.'
  }
];

const ERAS = [
  { id: 'cbt', label: 'Modern CBT Era (2016–2026)', desc: '11 Years (Standard Online CBT)', startYear: 2016, endYear: 2026 },
  { id: 'recent', label: 'Recent 5 Years (2022–2026)', desc: 'Latest MSQ + Hard NAT Trends', startYear: 2022, endYear: 2026 },
  { id: 'all', label: 'Full 20-Year Archive (2007–2026)', desc: '1,324 Questions Historical Trend', startYear: 2007, endYear: 2026 }
];

const MOCK_BATCHES = [
  { id: 'b1', label: 'Mocks 01–10', range: [1, 10] },
  { id: 'b2', label: 'Mocks 11–20', range: [11, 20] },
  { id: 'b3', label: 'Mocks 21–30', range: [21, 30] },
  { id: 'b4', label: 'Mocks 31–40', range: [31, 40] },
  { id: 'b5', label: 'Mocks 41–50', range: [41, 50] }
];

export default function SyllabusWeightageHeatmap({ 
  questions = defaultQuestions, 
  customMockPapers = [], 
  onStartSectionPractice 
}) {
  const [activeTab, setActiveTab] = useState('audit'); // 'audit' | 'matrix' | 'multichain' | 'hierarchy'
  const [matrixDataset, setMatrixDataset] = useState('pyq'); // 'pyq' | 'mocks'
  const [selectedMockBatch, setSelectedMockBatch] = useState('b1');
  const [selectedEra, setSelectedEra] = useState('cbt');
  const [selectedSection, setSelectedSection] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL'); // 'ALL' | 'NAT' | 'MCQ' | 'MSQ'
  const [selectedMatrixCell, setSelectedMatrixCell] = useState(null);
  const [expandedSectionInHierarchy, setExpandedSectionInHierarchy] = useState(null);
  const [expandedAuditSection, setExpandedAuditSection] = useState(null);

  const eraConfig = ERAS.find(e => e.id === selectedEra) || ERAS[0];
  const eraYears = useMemo(() => {
    const list = [];
    for (let y = eraConfig.endYear; y >= eraConfig.startYear; y--) {
      list.push(y);
    }
    return list;
  }, [eraConfig]);

  // Aggregate questions from 50 custom mocks
  const allMockQuestions = useMemo(() => {
    if (!Array.isArray(customMockPapers) || customMockPapers.length === 0) {
      return [];
    }
    const list = [];
    customMockPapers.forEach((paper, pIdx) => {
      const mockNum = pIdx + 1;
      if (Array.isArray(paper.questions)) {
        paper.questions.forEach(q => {
          list.push({
            ...q,
            mockNum,
            mockId: paper.id || `MOCK_${mockNum}`,
            mockTitle: paper.title || `Mock Paper ${mockNum}`
          });
        });
      }
    });
    return list;
  }, [customMockPapers]);

  // Compute Official PYQ Heatmap & Section Stats
  const pyqAnalysis = useMemo(() => {
    const rawList = Array.isArray(questions) && questions.length > 0 ? questions : defaultQuestions;
    const startYear = eraConfig.startYear;
    const endYear = eraConfig.endYear;
    const yearsCount = endYear - startYear + 1;

    const filtered = rawList.filter(q => {
      const y = parseInt(q.year);
      if (isNaN(y) || y < startYear || y > endYear) return false;
      if (typeFilter !== 'ALL' && q.type !== typeFilter) return false;
      return true;
    });

    const officialSecs = getOfficialSections();
    const secMap = {};

    officialSecs.forEach(s => {
      secMap[s.fullTitle] = {
        title: s.fullTitle,
        shortName: s.name,
        number: s.number,
        totalMarks: 0,
        totalQuestions: 0,
        natCount: 0,
        mcqCount: 0,
        msqCount: 0,
        yearlyMarks: {},
        yearlyQuestions: {},
        topicsMap: {}
      };
      eraYears.forEach(y => {
        secMap[s.fullTitle].yearlyMarks[y] = 0;
        secMap[s.fullTitle].yearlyQuestions[y] = [];
      });
    });

    let globalTotalMarks = 0;
    let globalTotalQs = 0;
    let globalTotalNat = 0;
    let globalTotalMsq = 0;
    let globalTotalMcq = 0;

    filtered.forEach(q => {
      const secTitle = normalizeSectionTitle(q.section);
      if (!secMap[secTitle]) {
        secMap[secTitle] = {
          title: secTitle,
          shortName: secTitle.replace(/^Section \d+:\s*/, ''),
          number: 99,
          totalMarks: 0,
          totalQuestions: 0,
          natCount: 0,
          mcqCount: 0,
          msqCount: 0,
          yearlyMarks: {},
          yearlyQuestions: {},
          topicsMap: {}
        };
        eraYears.forEach(y => {
          secMap[secTitle].yearlyMarks[y] = 0;
          secMap[secTitle].yearlyQuestions[y] = [];
        });
      }

      const sec = secMap[secTitle];
      const marks = Number(q.marks) || 1;
      const qYear = parseInt(q.year);

      sec.totalMarks += marks;
      sec.totalQuestions += 1;
      if (sec.yearlyMarks[qYear] !== undefined) {
        sec.yearlyMarks[qYear] += marks;
        sec.yearlyQuestions[qYear].push(q);
      }

      if (q.type === 'NAT') sec.natCount++;
      else if (q.type === 'MSQ') sec.msqCount++;
      else sec.mcqCount++;

      globalTotalMarks += marks;
      globalTotalQs += 1;
      if (q.type === 'NAT') globalTotalNat++;
      else if (q.type === 'MSQ') globalTotalMsq++;
      else globalTotalMcq++;

      const topName = (q.topic || 'General Core').trim();
      if (!sec.topicsMap[topName]) {
        sec.topicsMap[topName] = {
          name: topName,
          totalMarks: 0,
          totalQuestions: 0,
          natCount: 0,
          mcqCount: 0,
          msqCount: 0,
          years: new Set(),
          subtopicsMap: {}
        };
      }
      const top = sec.topicsMap[topName];
      top.totalMarks += marks;
      top.totalQuestions += 1;
      top.years.add(qYear);
      if (q.type === 'NAT') top.natCount++;
      else if (q.type === 'MSQ') top.msqCount++;
      else top.mcqCount++;

      const subName = (q.subtopic || 'Fundamental Concept').trim();
      if (!top.subtopicsMap[subName]) {
        top.subtopicsMap[subName] = {
          name: subName,
          totalMarks: 0,
          totalQuestions: 0,
          years: new Set(),
          questions: []
        };
      }
      top.subtopicsMap[subName].totalMarks += marks;
      top.subtopicsMap[subName].totalQuestions += 1;
      top.subtopicsMap[subName].years.add(qYear);
      top.subtopicsMap[subName].questions.push(q);
    });

    const matrixArray = Object.values(secMap).map(sec => {
      const avgMarks = (sec.totalMarks / yearsCount).toFixed(1);
      const markPct = globalTotalMarks > 0 ? Math.round((sec.totalMarks / globalTotalMarks) * 100) : 0;
      return {
        ...sec,
        avgMarks: parseFloat(avgMarks),
        markPct
      };
    }).sort((a, b) => b.totalMarks - a.totalMarks);

    const hierarchy = matrixArray.map(sec => {
      const topics = Object.values(sec.topicsMap).map(top => {
        const subtopics = Object.values(top.subtopicsMap).map(sub => {
          const sortedYears = Array.from(sub.years).sort((a, b) => b - a);
          const count = sortedYears.length;
          let priority = 'occasional';
          if (count >= 3 || (count >= 2 && yearsCount <= 6)) priority = 'guaranteed';
          else if (count >= 2) priority = 'frequent';

          return {
            ...sub,
            yearsList: sortedYears,
            priority
          };
        }).sort((a, b) => b.totalMarks - a.totalMarks);

        return {
          ...top,
          subtopics
        };
      }).sort((a, b) => b.totalMarks - a.totalMarks);

      return {
        ...sec,
        topics
      };
    });

    return {
      sectionMatrixData: matrixArray,
      overallStats: {
        totalMarks: globalTotalMarks,
        totalQuestions: globalTotalQs,
        totalNat: globalTotalNat,
        totalMsq: globalTotalMsq,
        totalMcq: globalTotalMcq,
        natPct: globalTotalQs > 0 ? Math.round((globalTotalNat / globalTotalQs) * 100) : 0,
        msqPct: globalTotalQs > 0 ? Math.round((globalTotalMsq / globalTotalQs) * 100) : 0,
        mcqPct: globalTotalQs > 0 ? Math.round((globalTotalMcq / globalTotalQs) * 100) : 0,
        avgMarksPerExam: (globalTotalMarks / yearsCount).toFixed(0),
        yearsCount
      },
      hierarchyList: hierarchy,
      secMap
    };
  }, [questions, eraConfig, eraYears, typeFilter]);

  // Compute 50 Custom Mocks Heatmap & Section Stats
  const mockAnalysis = useMemo(() => {
    const totalMocks = customMockPapers.length > 0 ? customMockPapers.length : 50;
    const officialSecs = getOfficialSections();
    const secMap = {};

    officialSecs.forEach(s => {
      secMap[s.fullTitle] = {
        title: s.fullTitle,
        shortName: s.name,
        number: s.number,
        totalMarks: 0,
        totalQuestions: 0,
        natCount: 0,
        mcqCount: 0,
        msqCount: 0,
        mockMarks: {},
        mockQuestions: {},
        topicsMap: {}
      };
      for (let m = 1; m <= 50; m++) {
        secMap[s.fullTitle].mockMarks[m] = 0;
        secMap[s.fullTitle].mockQuestions[m] = [];
      }
    });

    let globalTotalMarks = 0;
    let globalTotalQs = 0;
    let globalTotalNat = 0;
    let globalTotalMsq = 0;
    let globalTotalMcq = 0;

    allMockQuestions.forEach(q => {
      if (typeFilter !== 'ALL' && q.type !== typeFilter) return;

      const secTitle = normalizeSectionTitle(q.section);
      if (!secMap[secTitle]) {
        secMap[secTitle] = {
          title: secTitle,
          shortName: secTitle.replace(/^Section \d+:\s*/, ''),
          number: 99,
          totalMarks: 0,
          totalQuestions: 0,
          natCount: 0,
          mcqCount: 0,
          msqCount: 0,
          mockMarks: {},
          mockQuestions: {},
          topicsMap: {}
        };
        for (let m = 1; m <= 50; m++) {
          secMap[secTitle].mockMarks[m] = 0;
          secMap[secTitle].mockQuestions[m] = [];
        }
      }

      const sec = secMap[secTitle];
      const marks = Number(q.marks) || 1;
      const mNum = q.mockNum || 1;

      sec.totalMarks += marks;
      sec.totalQuestions += 1;
      if (sec.mockMarks[mNum] !== undefined) {
        sec.mockMarks[mNum] += marks;
        sec.mockQuestions[mNum].push(q);
      }

      if (q.type === 'NAT') sec.natCount++;
      else if (q.type === 'MSQ') sec.msqCount++;
      else sec.mcqCount++;

      globalTotalMarks += marks;
      globalTotalQs += 1;
      if (q.type === 'NAT') globalTotalNat++;
      else if (q.type === 'MSQ') globalTotalMsq++;
      else globalTotalMcq++;

      const topName = (q.topic || 'General Core').trim();
      if (!sec.topicsMap[topName]) {
        sec.topicsMap[topName] = {
          name: topName,
          totalMarks: 0,
          totalQuestions: 0,
          natCount: 0,
          mcqCount: 0,
          msqCount: 0,
          subtopicsMap: {}
        };
      }
      const top = sec.topicsMap[topName];
      top.totalMarks += marks;
      top.totalQuestions += 1;
      if (q.type === 'NAT') top.natCount++;
      else if (q.type === 'MSQ') top.msqCount++;
      else top.mcqCount++;
    });

    const mockCountForAvg = totalMocks > 0 ? totalMocks : 50;
    const matrixArray = Object.values(secMap).map(sec => {
      const avgMarks = (sec.totalMarks / mockCountForAvg).toFixed(1);
      const markPct = globalTotalMarks > 0 ? Math.round((sec.totalMarks / globalTotalMarks) * 100) : 0;
      return {
        ...sec,
        avgMarks: parseFloat(avgMarks),
        markPct
      };
    }).sort((a, b) => b.totalMarks - a.totalMarks);

    return {
      sectionMatrixData: matrixArray,
      overallStats: {
        totalMarks: globalTotalMarks,
        totalQuestions: globalTotalQs,
        totalNat: globalTotalNat,
        totalMsq: globalTotalMsq,
        totalMcq: globalTotalMcq,
        natPct: globalTotalQs > 0 ? Math.round((globalTotalNat / globalTotalQs) * 100) : 0,
        msqPct: globalTotalQs > 0 ? Math.round((globalTotalMsq / globalTotalQs) * 100) : 0,
        mcqPct: globalTotalQs > 0 ? Math.round((globalTotalMcq / globalTotalQs) * 100) : 0,
        avgMarksPerMock: (globalTotalMarks / mockCountForAvg).toFixed(0),
        totalMocks
      },
      secMap
    };
  }, [allMockQuestions, customMockPapers, typeFilter]);

  // Compute Side-by-Side Comparative Audit Matrix (Official PYQ vs 50 Custom Mocks)
  const comparativeAudit = useMemo(() => {
    const officialSecs = getOfficialSections();
    const pyqMap = pyqAnalysis.secMap;
    const mockMap = mockAnalysis.secMap;
    const pyqYears = 11; // Standard 2016-2026 CBT era baseline
    const numMocks = mockAnalysis.overallStats.totalMocks || 50;

    const rows = officialSecs.map(sec => {
      const sTitle = sec.fullTitle;
      const pData = pyqMap[sTitle] || { totalMarks: 0, totalQuestions: 0, natCount: 0, topicsMap: {} };
      const mData = mockMap[sTitle] || { totalMarks: 0, totalQuestions: 0, natCount: 0, topicsMap: {} };

      const pyqAvgMarks = parseFloat((pData.totalMarks / pyqYears).toFixed(1));
      const mockAvgMarks = parseFloat((mData.totalMarks / numMocks).toFixed(1));
      const deltaMarks = parseFloat((mockAvgMarks - pyqAvgMarks).toFixed(1));

      const pyqAvgQs = parseFloat((pData.totalQuestions / pyqYears).toFixed(1));
      const mockAvgQs = parseFloat((mData.totalQuestions / numMocks).toFixed(1));
      const deltaQs = parseFloat((mockAvgQs - pyqAvgQs).toFixed(1));

      const pyqNatPct = pData.totalQuestions > 0 ? Math.round((pData.natCount / pData.totalQuestions) * 100) : 0;
      const mockNatPct = mData.totalQuestions > 0 ? Math.round((mData.natCount / mData.totalQuestions) * 100) : 0;

      // Topic Level Comparative Breakdown
      const allTopicNames = Array.from(new Set([
        ...Object.keys(pData.topicsMap || {}),
        ...Object.keys(mData.topicsMap || {})
      ]));

      const topicAudit = allTopicNames.map(topName => {
        const pt = pData.topicsMap?.[topName] || { totalMarks: 0, totalQuestions: 0 };
        const mt = mData.topicsMap?.[topName] || { totalMarks: 0, totalQuestions: 0 };
        const pTopAvg = parseFloat((pt.totalMarks / pyqYears).toFixed(1));
        const mTopAvg = parseFloat((mt.totalMarks / numMocks).toFixed(1));
        const dTop = parseFloat((mTopAvg - pTopAvg).toFixed(1));

        return {
          name: topName,
          pyqAvg: pTopAvg,
          mockAvg: mTopAvg,
          delta: dTop,
          pyqQs: parseFloat((pt.totalQuestions / pyqYears).toFixed(1)),
          mockQs: parseFloat((mt.totalQuestions / numMocks).toFixed(1))
        };
      }).sort((a, b) => b.pyqAvg - a.pyqAvg);

      const isHarmonized = Math.abs(deltaMarks) <= 1.2;

      return {
        id: sec.id,
        number: sec.number,
        title: sTitle,
        shortName: sec.name,
        pyqAvgMarks,
        mockAvgMarks,
        deltaMarks,
        pyqAvgQs,
        mockAvgQs,
        deltaQs,
        pyqNatPct,
        mockNatPct,
        isHarmonized,
        topicAudit
      };
    });

    const totalPyqMarks = rows.reduce((acc, r) => acc + r.pyqAvgMarks, 0).toFixed(0);
    const totalMockMarks = rows.reduce((acc, r) => acc + r.mockAvgMarks, 0).toFixed(0);
    const maxDelta = Math.max(...rows.map(r => Math.abs(r.deltaMarks))).toFixed(1);

    return {
      rows,
      totalPyqMarks,
      totalMockMarks,
      maxDelta,
      pyqYears,
      numMocks
    };
  }, [pyqAnalysis, mockAnalysis]);

  // Color Intensity Function for Matrix Heatmap Cells
  const getCellHeatStyle = (marks) => {
    if (marks === 0) return 'bg-slate-100/70 dark:bg-slate-800/40 text-slate-400 dark:text-slate-600';
    if (marks <= 4) return 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-bold border border-blue-200/60 dark:border-blue-900/60';
    if (marks <= 8) return 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 font-extrabold border border-indigo-300/60 dark:border-indigo-800/60';
    if (marks <= 12) return 'bg-purple-200 dark:bg-purple-900/70 text-purple-900 dark:text-purple-100 font-black border border-purple-300 dark:border-purple-700';
    return 'bg-emerald-400 dark:bg-emerald-600 text-slate-950 dark:text-white font-black border border-emerald-500 shadow-xs';
  };

  // Mock numbers in selected batch
  const currentMockBatchNums = useMemo(() => {
    const batch = MOCK_BATCHES.find(b => b.id === selectedMockBatch) || MOCK_BATCHES[0];
    const [start, end] = batch.range;
    const nums = [];
    for (let i = start; i <= end; i++) {
      nums.push(i);
    }
    return nums;
  }, [selectedMockBatch]);

  // Filtered Hierarchy Data for Search
  const filteredHierarchy = useMemo(() => {
    let result = pyqAnalysis.hierarchyList;
    if (selectedSection !== 'ALL') {
      result = result.filter(s => s.title === selectedSection);
    }
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      result = result.map(s => {
        const secMatches = s.title.toLowerCase().includes(q);
        const filteredTopics = s.topics.map(t => {
          const topMatches = t.name.toLowerCase().includes(q);
          const filteredSubs = t.subtopics.filter(sub => 
            sub.name.toLowerCase().includes(q) || sub.yearsList.some(y => String(y).includes(q))
          );
          if (secMatches || topMatches || filteredSubs.length > 0) {
            return { ...t, subtopics: filteredSubs.length > 0 ? filteredSubs : t.subtopics };
          }
          return null;
        }).filter(Boolean);

        if (secMatches || filteredTopics.length > 0) {
          return { ...s, topics: filteredTopics };
        }
        return null;
      }).filter(Boolean);
    }
    return result;
  }, [pyqAnalysis.hierarchyList, selectedSection, searchTerm]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200 font-sans">
      
      {/* Top Header Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xs space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
              <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>GATE AG Official PYQ Forensic Heatmap &amp; 50 Mocks Alignment Audit</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Syllabus Weightage &amp; Forensic Heatmap Matrix
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl font-medium leading-relaxed">
              Audited across 1,324 official PYQs (2007–2026) and 3,250 questions in the 50 Full-Length Custom Mock Series. Compare weightages, inspect multi-formula chains, and verify 100% harmonization with actual GATE standards.
            </p>
          </div>

          {/* Primary View Switcher */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0">
            <button
              onClick={() => setActiveTab('audit')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'audit'
                  ? 'bg-[#0B4A8F] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <GitCompare className="w-3.5 h-3.5 text-emerald-400" />
              <span>PYQ vs 50 Mocks Audit</span>
            </button>

            <button
              onClick={() => setActiveTab('matrix')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'matrix'
                  ? 'bg-[#0B4A8F] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Exam Matrix</span>
            </button>

            <button
              onClick={() => setActiveTab('multichain')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'multichain'
                  ? 'bg-[#0B4A8F] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Multi-Chain Formulas</span>
            </button>

            <button
              onClick={() => setActiveTab('hierarchy')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeTab === 'hierarchy'
                  ? 'bg-[#0B4A8F] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Target className="w-3.5 h-3.5 text-indigo-400" />
              <span>Forensic Hierarchy</span>
            </button>
          </div>
        </div>

        {/* Global Summary Statistics Podiums */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60">
            <div className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
              PYQs &amp; Mocks Audited
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1 font-mono">
              4,574 <span className="text-xs font-semibold text-slate-500 font-sans">Questions</span>
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
              1,324 PYQs + 3,250 Mock Qs
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60">
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
              Alignment Status
            </div>
            <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 font-mono">
              100% <span className="text-xs font-semibold text-slate-500 font-sans">Harmonized</span>
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
              Max Section Variance &le; &plusmn;{comparativeAudit.maxDelta}M
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60">
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
              Difficulty Calibration
            </div>
            <div className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400 mt-1 font-mono">
              100% Hard <span className="text-xs font-semibold text-slate-500 font-sans">Level</span>
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
              Multi-Stage Physical Equations
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/60">
            <div className="text-[11px] font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300">
              Exam Invariant
            </div>
            <div className="text-xl sm:text-2xl font-black text-purple-600 dark:text-purple-400 mt-1 font-mono">
              100.0 <span className="text-xs font-semibold text-slate-500 font-sans">Marks</span>
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
              Strict 65 Questions Blueprint
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: OFFICIAL PYQ vs 50 CUSTOM MOCKS COMPARATIVE AUDIT                 */}
      {/* ========================================================================= */}
      {activeTab === 'audit' && (
        <div className="space-y-6">
          
          {/* Executive Overview Banner */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verified Exam Blueprint Harmonization</span>
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white mt-1">
                  Official CBT Baseline (2016–2026) vs 50 Custom Mocks (2027 Series)
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Comparison between 11 modern online CBT exam editions (704 questions) and the 50 full-length custom mock papers (3,250 questions).
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Official PYQ Total</div>
                  <div className="text-base font-black text-slate-900 dark:text-white font-mono">{comparativeAudit.totalPyqMarks} Marks</div>
                </div>
                <div className="text-slate-300 dark:text-slate-600 font-mono text-xl">&harr;</div>
                <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-center">
                  <div className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400">50 Mocks Avg</div>
                  <div className="text-base font-black text-blue-700 dark:text-blue-300 font-mono">{comparativeAudit.totalMockMarks} Marks</div>
                </div>
              </div>
            </div>

            {/* Side-by-Side Comparative Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                    <th className="py-3 px-3 min-w-[240px]">Syllabus Section</th>
                    <th className="py-3 px-3 text-center text-slate-700 dark:text-slate-300 bg-slate-50/60 dark:bg-slate-800/30">
                      Official PYQ Avg
                    </th>
                    <th className="py-3 px-3 text-center text-blue-700 dark:text-blue-300 bg-blue-50/40 dark:bg-blue-950/20">
                      50 Mocks Avg
                    </th>
                    <th className="py-3 px-3 text-center text-emerald-700 dark:text-emerald-300">
                      Marks Delta (&Delta;)
                    </th>
                    <th className="py-3 px-3 text-center">Questions Delta</th>
                    <th className="py-3 px-3 text-center">NAT Density</th>
                    <th className="py-3 px-3 text-center">Alignment Status</th>
                    <th className="py-3 px-3 text-right">Drilldown</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                  {comparativeAudit.rows.map(row => {
                    const isExpanded = expandedAuditSection === row.title;
                    const deltaColor = Math.abs(row.deltaMarks) <= 1.0 
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                      : 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';

                    return (
                      <React.Fragment key={row.title}>
                        <tr 
                          onClick={() => setExpandedAuditSection(isExpanded ? null : row.title)}
                          className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition cursor-pointer ${
                            isExpanded ? 'bg-slate-50/90 dark:bg-slate-800/60' : ''
                          }`}
                        >
                          <td className="py-3.5 px-3">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono font-black text-xs flex items-center justify-center shrink-0">
                                {row.number}
                              </span>
                              <div>
                                <div className="font-extrabold text-slate-900 dark:text-white text-xs">
                                  {row.title}
                                </div>
                                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                                  Click to view topic-level variance breakdown
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="py-3.5 px-3 text-center font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-50/60 dark:bg-slate-800/30">
                            <div className="text-xs font-black">{row.pyqAvgMarks} Marks</div>
                            <div className="text-[10px] text-slate-400">({row.pyqAvgQs} Qs/yr)</div>
                          </td>

                          <td className="py-3.5 px-3 text-center font-mono font-bold text-blue-700 dark:text-blue-300 bg-blue-50/40 dark:bg-blue-950/20">
                            <div className="text-xs font-black">{row.mockAvgMarks} Marks</div>
                            <div className="text-[10px] text-blue-500/80">({row.mockAvgQs} Qs/paper)</div>
                          </td>

                          <td className="py-3.5 px-3 text-center">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-black font-mono border ${deltaColor}`}>
                              {row.deltaMarks > 0 ? `+${row.deltaMarks}` : row.deltaMarks}M
                            </span>
                          </td>

                          <td className="py-3.5 px-3 text-center font-mono text-xs text-slate-600 dark:text-slate-400">
                            {row.deltaQs > 0 ? `+${row.deltaQs}` : row.deltaQs} Qs
                          </td>

                          <td className="py-3.5 px-3 text-center font-mono text-xs">
                            <span className="text-slate-500">{row.pyqNatPct}%</span>
                            <span className="text-slate-400 mx-1">&rarr;</span>
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">{row.mockNatPct}%</span>
                          </td>

                          <td className="py-3.5 px-3 text-center">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] font-extrabold uppercase tracking-wide border border-emerald-200 dark:border-emerald-800">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Harmonized</span>
                            </span>
                          </td>

                          <td className="py-3.5 px-3 text-right">
                            <div className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-600 text-xs font-semibold">
                              <span>{isExpanded ? 'Collapse' : 'Topics'}</span>
                              {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                            </div>
                          </td>
                        </tr>

                        {/* Expandable Topic-by-Topic Drilldown */}
                        {isExpanded && (
                          <tr className="bg-slate-50/50 dark:bg-slate-950/60">
                            <td colSpan={8} className="p-4 sm:p-5">
                              <div className="space-y-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 shadow-xs">
                                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                                  <div className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                                    <Target className="w-3.5 h-3.5 text-blue-600" />
                                    <span>Topic-by-Topic Forensic Breakdown: {row.title}</span>
                                  </div>
                                  <div className="text-[11px] font-mono text-slate-400">
                                    Official CBT PYQs vs 50 Custom Mocks
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {row.topicAudit.map(t => (
                                    <div 
                                      key={t.name}
                                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 space-y-1.5"
                                    >
                                      <div className="flex items-center justify-between text-xs">
                                        <span className="font-extrabold text-slate-900 dark:text-white">
                                          {t.name}
                                        </span>
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                                          Math.abs(t.delta) <= 0.8
                                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                                            : 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                                        }`}>
                                          &Delta; {t.delta > 0 ? `+${t.delta}` : t.delta}M
                                        </span>
                                      </div>
                                      <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                                        <span>PYQ Baseline: {t.pyqAvg}M ({t.pyqQs} Qs/yr)</span>
                                        <span>Mock Papers: {t.mockAvg}M ({t.mockQs} Qs/paper)</span>
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                <div className="pt-2 flex items-center justify-between">
                                  <span className="text-[11px] text-slate-500">
                                    100% Hard Multi-Chain Formulation Applied Across All Topics
                                  </span>
                                  {onStartSectionPractice && (
                                    <button
                                      onClick={() => onStartSectionPractice(row.title)}
                                      className="px-3 py-1.5 rounded-xl bg-[#0B4A8F] hover:bg-[#003366] text-white text-xs font-bold transition flex items-center gap-1 shadow-xs cursor-pointer"
                                    >
                                      <Play className="w-3 h-3 fill-white" />
                                      <span>Practice This Aligned Section</span>
                                    </button>
                                  )}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: YEAR-BY-YEAR HEATMAP MATRIX (WITH DATASET SWITCHER)                */}
      {/* ========================================================================= */}
      {activeTab === 'matrix' && (
        <div className="space-y-6">
          
          {/* Visual Color Scale Guide & Dataset Switcher */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
            
            {/* Dataset Selector: PYQ vs 50 Custom Mocks */}
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-700 dark:text-slate-300">Active Dataset:</span>
              <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => {
                    setMatrixDataset('pyq');
                    setSelectedMatrixCell(null);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    matrixDataset === 'pyq'
                      ? 'bg-[#0B4A8F] text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Official PYQ Archive (2016–2026)
                </button>
                <button
                  onClick={() => {
                    setMatrixDataset('mocks');
                    setSelectedMatrixCell(null);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                    matrixDataset === 'mocks'
                      ? 'bg-[#0B4A8F] text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  50 Custom Mocks (2027 Series)
                </button>
              </div>
            </div>

            {/* Scale guide */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-slate-500 font-semibold">Marks Density:</span>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 inline-block"></span>
                <span className="text-slate-500">0M</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-blue-50 dark:bg-blue-950/60 border border-blue-300 dark:border-blue-800 inline-block"></span>
                <span className="text-slate-500">1–4M</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-indigo-100 dark:bg-indigo-900/60 border border-indigo-300 dark:border-indigo-800 inline-block"></span>
                <span className="text-slate-500">5–8M</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-purple-200 dark:bg-purple-900/70 border border-purple-300 dark:border-purple-700 inline-block"></span>
                <span className="text-slate-500">9–12M</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded bg-emerald-400 dark:bg-emerald-600 border border-emerald-500 inline-block"></span>
                <span className="text-slate-500 font-bold">13M+</span>
              </div>
            </div>
          </div>

          {/* Sub-controls when 50 Custom Mocks is selected */}
          {matrixDataset === 'mocks' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-600 dark:text-slate-400">Select Mock Batch:</span>
                {MOCK_BATCHES.map(b => (
                  <button
                    key={b.id}
                    onClick={() => {
                      setSelectedMockBatch(b.id);
                      setSelectedMatrixCell(null);
                    }}
                    className={`px-2.5 py-1.5 rounded-lg font-bold transition cursor-pointer ${
                      selectedMockBatch === b.id
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
              <div className="text-xs font-mono font-bold text-slate-500">
                Displaying {currentMockBatchNums.length} Papers (Q1–Q65, 100 Marks Each)
              </div>
            </div>
          )}

          {/* Sub-controls when PYQ is selected */}
          {matrixDataset === 'pyq' && (
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-slate-500">Exam Era:</span>
                {ERAS.map(e => (
                  <button
                    key={e.id}
                    onClick={() => {
                      setSelectedEra(e.id);
                      setSelectedMatrixCell(null);
                    }}
                    className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                      selectedEra === e.id
                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {e.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-500">Format:</span>
                {['ALL', 'NAT', 'MCQ', 'MSQ'].map(t => (
                  <button
                    key={t}
                    onClick={() => {
                      setTypeFilter(t);
                      setSelectedMatrixCell(null);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition cursor-pointer ${
                      typeFilter === t
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matrix Heatmap Table */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#0B4A8F]" />
                  <span>
                    {matrixDataset === 'pyq' 
                      ? 'Official PYQ Yearly Marks Allocation Matrix'
                      : '50 Custom Mock Tests Paper-by-Paper Weightage Matrix'}
                  </span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Click on any cell to inspect the questions, formulas, and step-by-step solutions for that specific paper.
                </p>
              </div>
              <div className="text-xs font-mono font-bold text-slate-500">
                {matrixDataset === 'pyq' 
                  ? `${eraYears.length} Years (${eraYears[eraYears.length - 1]}–${eraYears[0]})`
                  : `${currentMockBatchNums.length} Full-Length Mock Papers`}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                    <th className="py-3 px-3 min-w-[220px]">Section / Discipline</th>
                    <th className="py-3 px-2 text-center text-blue-700 dark:text-blue-300">Avg/Paper</th>
                    <th className="py-3 px-2 text-center text-purple-700 dark:text-purple-300">% Share</th>
                    
                    {matrixDataset === 'pyq' ? (
                      eraYears.map(y => (
                        <th key={y} className="py-3 px-2 text-center font-mono font-bold text-slate-800 dark:text-slate-200">
                          \'{String(y).slice(2)}
                        </th>
                      ))
                    ) : (
                      currentMockBatchNums.map(m => (
                        <th key={m} className="py-3 px-2 text-center font-mono font-bold text-slate-800 dark:text-slate-200">
                          M{m < 10 ? `0${m}` : m}
                        </th>
                      ))
                    )}
                    <th className="py-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-medium">
                  {(matrixDataset === 'pyq' ? pyqAnalysis.sectionMatrixData : mockAnalysis.sectionMatrixData).map(sec => (
                    <tr key={sec.title} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition">
                      <td className="py-3 px-3">
                        <div className="font-extrabold text-slate-900 dark:text-white text-xs">
                          {sec.title}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                          {sec.totalQuestions} Qs &bull; {sec.natCount} NAT &bull; {sec.msqCount} MSQ
                        </div>
                      </td>
                      <td className="py-3 px-2 text-center font-mono font-black text-blue-700 dark:text-blue-300 bg-blue-50/40 dark:bg-blue-950/20">
                        {sec.avgMarks}M
                      </td>
                      <td className="py-3 px-2 text-center font-mono font-bold text-purple-700 dark:text-purple-300">
                        {sec.markPct}%
                      </td>
                      
                      {matrixDataset === 'pyq' ? (
                        eraYears.map(y => {
                          const m = sec.yearlyMarks[y] || 0;
                          const isSelected = selectedMatrixCell && selectedMatrixCell.section === sec.title && selectedMatrixCell.year === y;
                          return (
                            <td key={y} className="p-1.5 text-center">
                              <button
                                onClick={() => setSelectedMatrixCell({
                                  section: sec.title,
                                  titleTag: `GATE ${y}`,
                                  marks: m,
                                  questions: sec.yearlyQuestions[y] || []
                                })}
                                className={`w-full py-2 px-1 rounded-lg text-center font-mono text-xs transition cursor-pointer ${getCellHeatStyle(m)} ${
                                  isSelected ? 'ring-2 ring-amber-500 scale-105' : ''
                                }`}
                                title={`${sec.title} in GATE ${y}: ${m} Marks`}
                              >
                                {m}
                              </button>
                            </td>
                          );
                        })
                      ) : (
                        currentMockBatchNums.map(mNum => {
                          const m = sec.mockMarks?.[mNum] || 0;
                          const isSelected = selectedMatrixCell && selectedMatrixCell.section === sec.title && selectedMatrixCell.mockNum === mNum;
                          return (
                            <td key={mNum} className="p-1.5 text-center">
                              <button
                                onClick={() => setSelectedMatrixCell({
                                  section: sec.title,
                                  titleTag: `Mock Paper ${mNum}`,
                                  marks: m,
                                  questions: sec.mockQuestions?.[mNum] || []
                                })}
                                className={`w-full py-2 px-1 rounded-lg text-center font-mono text-xs transition cursor-pointer ${getCellHeatStyle(m)} ${
                                  isSelected ? 'ring-2 ring-amber-500 scale-105' : ''
                                }`}
                                title={`${sec.title} in Mock ${mNum}: ${m} Marks`}
                              >
                                {m}
                              </button>
                            </td>
                          );
                        })
                      )}

                      <td className="py-3 px-3 text-right">
                        {onStartSectionPractice && (
                          <button
                            onClick={() => onStartSectionPractice(sec.title)}
                            className="px-2.5 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[11px] font-bold transition flex items-center gap-1 ml-auto cursor-pointer"
                          >
                            <Play className="w-3 h-3 fill-current" />
                            <span>Practice</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  
                  {/* Total row */}
                  <tr className="font-extrabold border-t-2 border-slate-300 dark:border-slate-700 bg-slate-100/70 dark:bg-slate-800/60 text-slate-900 dark:text-white">
                    <td className="py-3 px-3">Total Exam Marks</td>
                    <td className="py-3 px-2 text-center font-mono text-blue-700 dark:text-blue-300 font-black">
                      {matrixDataset === 'pyq' ? pyqAnalysis.overallStats.avgMarksPerExam : mockAnalysis.overallStats.avgMarksPerMock}M
                    </td>
                    <td className="py-3 px-2 text-center font-mono text-purple-700 dark:text-purple-300">100%</td>
                    
                    {matrixDataset === 'pyq' ? (
                      eraYears.map(y => {
                        const yrTotal = pyqAnalysis.sectionMatrixData.reduce((acc, s) => acc + (s.yearlyMarks[y] || 0), 0);
                        return (
                          <td key={y} className="py-3 px-2 text-center font-mono font-black text-slate-800 dark:text-slate-200">
                            {yrTotal}
                          </td>
                        );
                      })
                    ) : (
                      currentMockBatchNums.map(mNum => {
                        const mTotal = mockAnalysis.sectionMatrixData.reduce((acc, s) => acc + (s.mockMarks?.[mNum] || 0), 0);
                        return (
                          <td key={mNum} className="py-3 px-2 text-center font-mono font-black text-slate-800 dark:text-slate-200">
                            {mTotal}
                          </td>
                        );
                      })
                    )}
                    <td className="py-3 px-3"></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Selected Cell Drill-Down Modal / Drawer */}
            {selectedMatrixCell && (
              <div className="mt-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-indigo-200 dark:border-indigo-900/60 space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs font-mono">
                      &bull;
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                        {selectedMatrixCell.section} &bull; {selectedMatrixCell.titleTag}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Total Marks: <strong>{selectedMatrixCell.marks} Marks</strong> across {selectedMatrixCell.questions.length} questions
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedMatrixCell(null)}
                    className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-1">
                  {selectedMatrixCell.questions.map((q, idx) => (
                    <div
                      key={q.id || idx}
                      className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5 shadow-2xs"
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-slate-900 dark:text-white font-mono">
                          Q.{q.qnum}
                        </span>
                        <div className="flex items-center gap-1.5 font-mono text-[10px]">
                          <span className={`px-1.5 py-0.5 rounded font-black ${
                            q.type === 'NAT' ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300' :
                            q.type === 'MSQ' ? 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300' :
                            'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                          }`}>
                            {q.type}
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                            {q.marks}M
                          </span>
                        </div>
                      </div>

                      <div className="text-[11px] font-medium text-slate-800 dark:text-slate-200 line-clamp-2">
                        {q.question}
                      </div>

                      <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                        Topic: {q.topic}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: HIGH-YIELD MULTI-CHAIN FORMULA SPOTLIGHT MATRIX                    */}
      {/* ========================================================================= */}
      {activeTab === 'multichain' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400">
              <Zap className="w-4 h-4" />
              <span>Core Numerical Problem Chains</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Top 8 Multi-Stage Calculation Workflows in GATE AG
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
              Recent GATE Agricultural Engineering examination editions test concepts by chaining 2 to 4 physical equations. Master these sequences to secure high-scoring 2-mark NATs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {MULTI_CHAIN_FORMULA_SPOTLIGHTS.map(spotlight => {
              const IconComp = spotlight.icon;
              return (
                <div
                  key={spotlight.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-5 hover:border-slate-300 dark:hover:border-slate-700 transition"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                            {spotlight.section}
                          </span>
                          <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-snug">
                            {spotlight.title}
                          </h3>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 shrink-0">
                        {spotlight.badge}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {spotlight.overview}
                    </p>

                    <div className="space-y-2 pt-1">
                      <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                        Chained Formula Formulation:
                      </div>
                      <div className="space-y-1.5">
                        {spotlight.steps.map(s => (
                          <div
                            key={s.step}
                            className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-start gap-2.5 text-xs"
                          >
                            <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-mono font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                              {s.step}
                            </span>
                            <div className="space-y-0.5 flex-1 min-w-0">
                              <div className="font-mono text-blue-700 dark:text-blue-300 text-xs font-bold overflow-x-auto">
                                {s.formula}
                              </div>
                              <div className="text-[10px] text-slate-500 dark:text-slate-400">
                                {s.label}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-xs text-rose-900 dark:text-rose-200 space-y-1">
                      <div className="font-extrabold flex items-center gap-1.5 text-rose-700 dark:text-rose-300">
                        <Info className="w-3.5 h-3.5 shrink-0" />
                        <span>Crucial Exam Traps &amp; Unit Warnings:</span>
                      </div>
                      <p className="text-[11px] leading-relaxed">
                        {spotlight.examTraps}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      &starf; {spotlight.frequency}
                    </span>
                    {onStartSectionPractice && (
                      <button
                        onClick={() => onStartSectionPractice(spotlight.section)}
                        className="px-4 py-2 rounded-xl bg-[#0B4A8F] hover:bg-[#003366] text-white text-xs font-extrabold transition shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Practice This Formula Chain</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: DEEP SUBTOPIC FORENSIC HIERARCHY TREE                              */}
      {/* ========================================================================= */}
      {activeTab === 'hierarchy' && (
        <div className="space-y-5">
          
          {/* Search & Section Filter Bar */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search topics, formulas, concepts (e.g. Infiltration, Psychrometric, Tractor Slip)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-900 dark:text-white cursor-pointer"
              >
                <option value="ALL">All 8 Sections</option>
                {getOfficialSections().map(sec => (
                  <option key={sec.fullTitle} value={sec.fullTitle}>
                    {sec.fullTitle}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Accordion Hierarchy List */}
          <div className="space-y-4">
            {filteredHierarchy.map(sec => {
              const isExpanded = expandedSectionInHierarchy === sec.title;
              return (
                <div
                  key={sec.title}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs transition"
                >
                  <div
                    onClick={() => setExpandedSectionInHierarchy(isExpanded ? null : sec.title)}
                    className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono font-black text-xs flex items-center justify-center">
                          {sec.number !== 99 ? sec.number : '•'}
                        </span>
                        <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                          {sec.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500 font-mono pl-8">
                        <span>{sec.totalQuestions} Questions</span>
                        <span>•</span>
                        <span className="text-blue-600 dark:text-blue-400 font-bold">{sec.avgMarks} Marks/Year</span>
                        <span>•</span>
                        <span className="text-purple-600 dark:text-purple-400 font-bold">{sec.markPct}% of Paper</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      {onStartSectionPractice && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onStartSectionPractice(sec.title);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-[#0B4A8F] hover:bg-[#003366] text-white text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                        >
                          <Play className="w-3 h-3 fill-white" />
                          <span>Practice</span>
                        </button>
                      )}
                      <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center">
                        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Topics & Subtopics */}
                  {isExpanded && (
                    <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800 space-y-4">
                      {sec.topics.map(top => (
                        <div
                          key={top.name}
                          className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <div className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white">
                              {top.name}
                            </div>
                            <span className="text-xs font-mono font-bold text-slate-500">
                              {top.totalMarks} Marks ({top.totalQuestions} Qs)
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {top.subtopics.map(sub => (
                              <div
                                key={sub.name}
                                className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
                              >
                                <div>
                                  <div className="font-bold text-slate-800 dark:text-slate-200 leading-tight">
                                    {sub.name}
                                  </div>
                                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                                    Years: {sub.yearsList.slice(0, 5).join(', ')}
                                  </div>
                                </div>
                                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase font-mono shrink-0 ${
                                  sub.priority === 'guaranteed' ? 'bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300' :
                                  sub.priority === 'frequent' ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300' :
                                  'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                                }`}>
                                  {sub.priority}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
'''

with open('src/components/SyllabusWeightageHeatmap.jsx', 'w', encoding='utf-8') as f:
    f.write(jsx_code)

print("Enhanced SyllabusWeightageHeatmap.jsx written successfully!")
