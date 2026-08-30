/**
 * Gemini AI Service for GATE Agricultural Engineering
 * Provides verified step-by-step solutions, progressive hints, and conversational doubt resolution.
 */

const LOCAL_STORAGE_GEMINI_KEY = 'gate_ag_gemini_api_key';

// Default system prompt for GATE AG AI Tutor
const GATE_AG_SYSTEM_INSTRUCTION = `
You are the official Senior AI Tutor and Subject Matter Expert for GATE Agricultural Engineering (GATE AG).
Your goal is to provide accurate, verified, rigorous, step-by-step engineering solutions and explanations.

Core Subjects:
1. Farm Machinery and Power (FMP) - IC engines, tractor mechanics, tillage, harvesting machinery, sprayers.
2. Soil and Water Conservation Engineering (SWCE) - Hydrology, open channel flow, groundwater, Darcy's law, terraces, bunds, irrigation & drainage.
3. Agricultural Processing and Food Engineering (APFE) - Psychrometrics, drying, size reduction, heat & mass transfer, refrigeration, rheology.
4. Farm Structures and Renewable Energy (REE) - Solar, biogas, greenhouses, silos.
5. Engineering Mathematics - Linear algebra, calculus, differential equations, numerical methods, probability.
6. General Aptitude.

Formatting & Mathematical Guidelines:
- Format ALL formulas, equations, and mathematical variables using LaTeX notation with $ or $$.
  Example: $Q = \\frac{1}{n} A R^{2/3} S^{1/2}$, $D = C_s \\cdot w \\cdot d$.
- Always extract "Given Data" with respective units clearly.
- State all unit conversion steps explicitly (e.g. $km/h \\rightarrow m/s$, $bar \\rightarrow kPa$).
- Point out "Common Traps / Pitfalls" where GATE aspirants typically lose marks.
- Be concise, structured, encouraging, and pedagogically clear.
`;

function obfuscateKey(rawKey) {
  if (!rawKey) return '';
  try {
    return 'ag_sec_' + btoa(rawKey.split('').reverse().join(''));
  } catch (e) {
    return rawKey;
  }
}

function deobfuscateKey(stored) {
  if (!stored) return '';
  try {
    if (stored.startsWith('ag_sec_')) {
      const b64 = stored.slice(7);
      return atob(b64).split('').reverse().join('');
    }
    return stored;
  } catch (e) {
    return stored;
  }
}

export function getStoredApiKey() {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_GEMINI_KEY);
    if (stored) return deobfuscateKey(stored);
    return (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) || '';
  } catch (e) {
    return '';
  }
}

export function setStoredApiKey(apiKey) {
  try {
    if (apiKey && apiKey.trim()) {
      localStorage.setItem(LOCAL_STORAGE_GEMINI_KEY, obfuscateKey(apiKey.trim()));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_GEMINI_KEY);
    }
  } catch (e) {}
}

export function clearStoredApiKey() {
  try {
    localStorage.removeItem(LOCAL_STORAGE_GEMINI_KEY);
  } catch (e) {}
}

export function hasApiKey() {
  return Boolean(getStoredApiKey());
}

/**
 * Call Gemini REST API with model fallback
 */
async function callGeminiApi(contents, systemInstruction = GATE_AG_SYSTEM_INSTRUCTION) {
  const apiKey = getStoredApiKey();
  if (!apiKey) {
    throw new Error('NO_API_KEY');
  }

  const models = ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-pro'];
  let lastError = null;

  for (const model of models) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

      const payload = {
        contents,
        systemInstruction: {
          parts: [{ text: systemInstruction }]
        },
        generationConfig: {
          temperature: 0.2,
          topP: 0.95,
          maxOutputTokens: 2048
        }
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const message = errorData?.error?.message || `Gemini API Error (${response.status})`;
        lastError = new Error(message);
        continue; // Try next model
      }

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        throw new Error('Empty response received from Gemini.');
      }

      return text;
    } catch (err) {
      lastError = err;
    }
  }

  throw lastError || new Error('Failed to reach Gemini API.');
}

/**
 * Generate Step-by-Step Explanation for a Question
 */
export async function explainQuestionWithGemini(question, studentAnswer = null, isCorrect = null) {
  const questionDetails = `
Subject / Section: ${question.section || question.subject || 'GATE AG'}
Topic: ${question.topic || 'General'}
Question Type: ${question.type || 'MCQ/NAT'} (Marks: ${question.marks || 1})
Question Statement:
${question.question}

Options (if applicable):
${question.options ? Object.entries(question.options).map(([k, v]) => `${k}) ${v}`).join('\n') : 'NAT / Numerical Answer'}

Official Answer Key: ${Array.isArray(question.answer) ? question.answer.join(', ') : question.answer}
Existing Solution Notes: ${question.explanation || 'None provided'}
${studentAnswer !== null ? `Student Selected Answer: ${studentAnswer} (${isCorrect ? 'CORRECT' : 'INCORRECT'})` : ''}

Task:
Provide a comprehensive, verified, step-by-step pedagogical solution broken into:
1. **Given Data & Unit Identifications**
2. **Key Governing Formulas / Principles**
3. **Step-by-Step Derivation & Calculation**
4. **Final Answer Verification**
5. **Common Traps / Shortcut Trick for GATE Exam**
`;

  try {
    const response = await callGeminiApi([
      { role: 'user', parts: [{ text: questionDetails }] }
    ]);
    return { success: true, text: response };
  } catch (error) {
    // Generate intelligent offline fallback
    const offlineFallback = generateOfflineFallbackExplanation(question);
    return { 
      success: false, 
      error: error.message,
      isOffline: true,
      text: offlineFallback 
    };
  }
}

/**
 * Generate Progressive Hint for a Question
 */
export async function getProgressiveHint(question, hintLevel = 1) {
  const hintPrompt = `
Question Statement:
${question.question}

Topic: ${question.section} - ${question.topic}
Answer Key: ${Array.isArray(question.answer) ? question.answer.join(', ') : question.answer}

Request: Provide Hint Level ${hintLevel} out of 3.
Level 1: Subtle clue about the physical principle or concept without revealing the formula.
Level 2: The exact governing formula and necessary unit conversions.
Level 3: Intermediate calculation step leading directly to the answer.
Keep it strictly under 3 sentences. Use LaTeX math notation where needed.
`;

  try {
    const response = await callGeminiApi([
      { role: 'user', parts: [{ text: hintPrompt }] }
    ]);
    return { success: true, text: response };
  } catch (error) {
    return { 
      success: false, 
      text: generateOfflineHint(question, hintLevel) 
    };
  }
}

/**
 * Conversational Doubt Chat on a Specific Question
 */
export async function askDoubtChat(conversationHistory = [], questionContext, userDoubt) {
  const messages = [
    {
      role: 'user',
      parts: [{
        text: `Context Question: ${questionContext.question}\nOfficial Answer: ${Array.isArray(questionContext.answer) ? questionContext.answer.join(', ') : questionContext.answer}\nSubject: ${questionContext.section} - ${questionContext.topic}`
      }]
    },
    {
      role: 'model',
      parts: [{
        text: `I understand the question and context. Ask me any doubt or clarification about this question!`
      }]
    }
  ];

  // Append prior conversation turns
  conversationHistory.forEach(turn => {
    messages.push({
      role: turn.sender === 'user' ? 'user' : 'model',
      parts: [{ text: turn.text }]
    });
  });

  // Append new user message
  messages.push({
    role: 'user',
    parts: [{ text: userDoubt }]
  });

  try {
    const response = await callGeminiApi(messages);
    return { success: true, text: response };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      text: `Offline Assistant: For **${questionContext.topic || 'this topic'}**, ensure you verify the underlying formula $${questionContext.explanation || 'applicable formula'}$ and double check the SI units.`
    };
  }
}

/**
 * Standalone General Doubt Solver with Solver Modes, Multimodal Vision, and Intelligent Offline Knowledge Fallback
 */
export async function solveGeneralDoubt(prompt, options = {}) {
  const { 
    solverMode = 'rigorous', 
    imageBase64 = null, 
    imageMimeType = 'image/jpeg' 
  } = options;

  let modeInstruction = '';
  switch (solverMode) {
    case 'formula_shortcut':
      modeInstruction = `MODE: FORMULA & SHORTCUT FINDER\nFocus strictly on extracting:\n1. Core Governing Mathematical Formulas (KaTeX)\n2. Variable Definitions & Exact SI Units\n3. 14-Year GATE AG Exam Relevance & Shortcut Tricks\n4. Dimensional verification check.`;
      break;
    case 'mistake_checker':
      modeInstruction = `MODE: FORENSIC MISTAKE CHECKER\nThe student is seeking where their calculation or concept went wrong.\n1. Pinpoint the most common pitfalls (e.g. speed conversion km/h -> m/s, diameter vs radius, pressure bar -> kPa, wet vs dry basis moisture).\n2. Provide the exact step-by-step diagnostic breakdown.\n3. Show the correct mathematical calculation.`;
      break;
    case 'socratic':
      modeInstruction = `MODE: SOCRATIC CONCEPT MENTOR\nDo NOT spoon-feed the final answer immediately.\n1. State the fundamental agricultural engineering physical principle.\n2. Provide Level 1 Conceptual Clue and Level 2 Governing Equation.\n3. Ask the student a targeted question to lead them to the final numerical answer.`;
      break;
    case 'rigorous':
    default:
      modeInstruction = `MODE: STEP-BY-STEP RIGOROUS DERIVATION\nProvide a comprehensive, verified solution:\n1. Given Information & Unit Identifications\n2. Governing Engineering Formulas (with full KaTeX rendering)\n3. Step-by-Step Numerical Substitution & Intermediate Values\n4. Final Answer (with unit and NAT rounding bounds)\n5. Common GATE AG Marking Traps.`;
      break;
  }

  const userParts = [];
  if (imageBase64) {
    const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z0-9+.-]+;base64,/, '');
    userParts.push({
      inlineData: {
        mimeType: imageMimeType || 'image/jpeg',
        data: cleanBase64
      }
    });
  }

  userParts.push({
    text: `${modeInstruction}\n\nProblem / Question Statement:\n${prompt || 'Please analyze and solve the problem shown in the image step-by-step.'}`
  });

  try {
    const response = await callGeminiApi([
      { role: 'user', parts: userParts }
    ]);
    return { success: true, text: response, solverMode };
  } catch (error) {
    const offlineSolution = generateOfflineGeneralDoubtSolution(prompt, solverMode);
    return {
      success: true, // Gracefully return expert knowledge solution
      isOffline: true,
      error: error.message,
      text: offlineSolution,
      solverMode
    };
  }
}

/**
 * Intelligent Offline General Doubt Derivation Engine for GATE AG
 */
function generateOfflineGeneralDoubtSolution(prompt) {
  const p = prompt.toLowerCase();

  if (p.includes('drawbar') || p.includes('tractive') || p.includes('wheel slip') || p.includes('tractor')) {
    return `### 🚜 Tractor Mechanics & Drawbar Power Derivation (Offline Solver)

#### 1. Core Definitions & Governing Equations
* **Wheel Slip ($S$):**
  $$S = \\frac{v_0 - v_a}{v_0} \\times 100 = \\left(1 - \\frac{v_a}{v_0}\\right) \\times 100$$
  where $v_0$ is theoretical speed without load, and $v_a$ is actual forward speed under load ($m/s$).

* **Drawbar Power ($P_{db}$):**
  $$P_{db} = \\frac{\\text{Drawbar Pull } (kN) \\times \\text{Actual Speed } (km/h)}{3.6} \\quad [\\text{in } kW]$$
  $$P_{db} = \\text{Drawbar Pull } (N) \\times \\text{Actual Speed } (m/s) \\times 10^{-3} \\quad [\\text{in } kW]$$

* **Axle Power ($P_{axle}$):**
  $$P_{axle} = \\frac{2 \\pi N T}{60000} \\quad [kW]$$

* **Tractive Efficiency ($\\eta_{tr}$):**
  $$\\eta_{tr} = \\frac{P_{db}}{P_{axle}} = (1 - S) \\times \\frac{\\text{Drawbar Pull}}{\\text{Gross Tractive Force}}$$

#### 2. Key Unit Conversions & Exam Traps
* Speed given in $km/h$: always multiply by $\\frac{5}{18}$ or divide by $3.6$ to convert to $m/s$.
* For a 2WD tractor on tilled agricultural soil, maximum tractive efficiency occurs typically between **10% to 15% wheel slip**.`;
  }

  if (p.includes('darcy') || p.includes('aquifer') || p.includes('well') || p.includes('dupuit') || p.includes('thiem')) {
    return `### 🌊 Groundwater Hydraulics & Darcy's Law (Offline Solver)

#### 1. Darcy's Law for Porous Media
$$Q = -K \\cdot A \\cdot \\frac{dh}{dL} = K \\cdot A \\cdot i$$
where $K$ is hydraulic conductivity ($m/s$), $A$ is cross-sectional flow area ($m^2$), and $i = \\frac{dh}{dL}$ is hydraulic gradient.

#### 2. Well Hydraulics Formulations
* **Confined Aquifer (Thiem's Equation):**
  $$Q = \\frac{2 \\pi K b (h_2 - h_1)}{\\ln\\left(\\frac{r_2}{r_1}\\right)}$$
  where $b$ is aquifer thickness, $h_1, h_2$ are piezometric heads at radial distances $r_1, r_2$.

* **Unconfined Aquifer (Dupuit's Equation):**
  $$Q = \\frac{\\pi K (h_2^2 - h_1^2)}{\\ln\\left(\\frac{r_2}{r_1}\\right)}$$

#### 3. Key GATE AG Exam Traps
* Notice in **unconfined aquifers**, the equation contains differences of squared heads $(h_2^2 - h_1^2)$, whereas in **confined aquifers**, it is linear $(h_2 - h_1)$.`;
  }

  if (p.includes('psychrometric') || p.includes('drying') || p.includes('moisture') || p.includes('humidity')) {
    return `### 🌾 Psychrometric Principles & Grain Drying (Offline Solver)

#### 1. Fundamental Psychrometric Equations
* **Humidity Ratio / Specific Humidity ($W$):**
  $$W = 0.622 \\times \\frac{p_v}{p_b - p_v} \\quad [\\text{kg water / kg dry air}]$$
  where $p_v$ is partial pressure of water vapor, $p_b$ is barometric atmospheric pressure ($101.325 \\text{ kPa}$).

* **Relative Humidity ($RH$ or $\\phi$):**
  $$RH = \\frac{p_v}{p_{vs}} \\times 100$$
  where $p_{vs}$ is saturation vapor pressure at the dry bulb temperature ($DBT$).

* **Enthalpy of Moist Air ($h$):**
  $$h = 1.005 \\cdot T_{db} + W (2501 + 1.88 \\cdot T_{db}) \\quad [kJ/kg \\text{ dry air}]$$

#### 2. Grain Drying Mass Balance
$$\\text{Moisture to remove } (m_w) = W_d \\times \\left( \\frac{M_{in} - M_{out}}{100 - M_{out}} \\right)$$
where $M_{in}, M_{out}$ are initial and final moisture contents on **wet basis (%)**.`;
  }

  if (p.includes('manning') || p.includes('channel') || p.includes('hydraulic') || p.includes('open channel')) {
    return `### 📐 Open Channel Hydraulics & Manning's Flow (Offline Solver)

#### 1. Manning's Equation for Uniform Flow
$$Q = \\frac{1}{n} \\cdot A \\cdot R^{2/3} \\cdot S^{1/2}$$
where:
* $Q$: Discharge ($m^3/s$)
* $n$: Manning's roughness coefficient ($s/m^{1/3}$)
* $A$: Cross-sectional flow area ($m^2$)
* $R = \\frac{A}{P}$: Hydraulic radius ($m$), with wetted perimeter $P$ ($m$)
* $S$: Longitudinal bed slope (dimensionless ratio)

#### 2. Most Hydraulically Efficient Trapezoidal Section
* Side slope: $1:\\sqrt{3}$ (i.e. angle $\\theta = 60^\\circ$ from horizontal).
* Hydraulic radius: $R = \\frac{y}{2}$ (half of water flow depth).
* Top width $T = 2 \\times \\text{side slope length}$.`;
  }

  if (p.includes('draft') || p.includes('plow') || p.includes('plough') || p.includes('tillage') || p.includes('specific resistance')) {
    return `### 🚜 Tillage Draft & Specific Soil Resistance (Offline Solver)

#### 1. Total Draft Calculation
$$D = C_s \\times w \\times d$$
where:
* $D$: Total plow draft force ($kg$ or $N$)
* $C_s$: Specific soil resistance / unit draft ($kg/cm^2$ or $N/cm^2$)
* $w$: Total width of cut ($cm$) $= n_{bottoms} \\times w_{bottom}$
* $d$: Depth of plowing cut ($cm$)

#### 2. Drawbar Power Required ($P_{db}$)
$$P_{db} = \\frac{D (N) \\times v (m/s)}{1000} \\quad [kW]$$
$$P_{db} = \\frac{D (kg) \\times 9.81 \\times v (km/h) \\times \\frac{5}{18}}{1000} \\quad [kW]$$`;
  }

  if (p.includes('usle') || p.includes('soil loss') || p.includes('erosion')) {
    return `### ⛰️ Universal Soil Loss Equation (USLE) (Offline Solver)

#### 1. The Governing Equation
$$A = R \\cdot K \\cdot LS \\cdot C \\cdot P$$
where:
* $A$: Computed average annual soil loss ($t/ha/year$).
* $R$: Rainfall erosivity factor ($MJ \\cdot mm / ha \\cdot h \\cdot yr$).
* $K$: Soil erodibility factor ($t \\cdot ha \\cdot h / ha \\cdot MJ \\cdot mm$).
* $LS$: Topographic slope length and steepness factor (dimensionless).
* $C$: Cover and crop management factor ($0 \\le C \\le 1$).
* $P$: Conservation support practice factor ($0 \\le P \\le 1$, where $P=1.0$ for up-and-down slope farming).`;
  }

  return `### 📘 Step-by-Step Engineering Derivation (GATE AG Study Assistant)

**Query Analysis:**
"${prompt}"

#### 1. Core Engineering Principle & Given Identification
* Extract all given parameter variables and standardize units into the **SI System** ($m, s, kg, Pa, W, J$).
* State governing thermodynamic / mechanical / hydrological laws.

#### 2. Governing Equations & Substitution
* Apply standard GATE Agricultural Engineering analytical relations.
* Verify dimensional consistency on both sides of the equation.

#### 3. Examination Tips & Unit Precision
* For NAT questions: maintain at least 4 significant figures during intermediate calculations, and round off to the requested decimal places (usually 2 decimal places) at the final step.
* Watch for speed ($km/h \\leftrightarrow m/s$) and pressure ($bar \\leftrightarrow kPa \\leftrightarrow N/m^2$) conversion factors.

---
💡 *Configure your Gemini API Key in User Settings for live AI multi-method derivations.*`;
}

/**
 * Offline Fallback Explanation Generator
 */
function generateOfflineFallbackExplanation(q) {
  const ansStr = Array.isArray(q.answer) ? q.answer.join(', ') : q.answer;
  const expl = q.explanation || 'Standard GATE AG numerical derivation applies.';

  return `### 📘 Step-by-Step Solution Breakdown (Offline Mode)

**Section / Topic:** ${q.section || 'General'} → ${q.topic || 'GATE AG'}  
**Question Type:** ${q.type || 'MCQ/NAT'} | **Marks:** ${q.marks || 1} Mark

---

#### 1. Given Information & Target
* **Target Objective:** Compute the verified final value matching the GATE AG answer key.
* **Official Answer Key:** **\`${ansStr}\`**

#### 2. Governing Engineering Principle
${expl}

#### 3. Calculation & Unit Check
* Ensure all dimensional parameters are converted to consistent SI units (e.g. meters, seconds, Pascals, Watts) before numerical substitution.
* For NAT questions, preserve rounding accuracy up to 2 decimal places.

---
💡 *Connect online or configure your Gemini API Key in User Profile for dynamic, AI-generated multi-method derivations.*`;
}

function generateOfflineHint(q, level) {
  if (level === 1) {
    return `💡 **Hint 1 (Concept):** Identify the core governing physical law for **${q.topic || q.section}** and write down all given variables with units.`;
  } else if (level === 2) {
    return `📐 **Hint 2 (Formula):** Focus on the formula: ${q.explanation ? q.explanation.slice(0, 120) : 'Standard GATE AG relation'}. Watch out for unit conversions!`;
  } else {
    return `🎯 **Hint 3 (Calculation):** Substitute the SI values directly into the governing equation to arrive at the answer near **${Array.isArray(q.answer) ? q.answer[0] : q.answer}**.`;
  }
}
