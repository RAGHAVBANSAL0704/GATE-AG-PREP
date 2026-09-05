/**
 * Mistake Vault Service
 * Tracks and persists questions that the user answered incorrectly across CBT Mocks and Practice Sessions.
 * Enables targeted revision drills and re-attempting of specific error banks.
 */

const MISTAKE_VAULT_KEY = 'gate_ag_mistake_vault';

export function getMistakeVault() {
  try {
    const raw = localStorage.getItem(MISTAKE_VAULT_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === 'object' && parsed !== null ? parsed : {};
  } catch (err) {
    console.error('Failed to parse mistake vault:', err);
    return {};
  }
}

export function recordQuestionOutcomes({ attempted = [], correct = [], incorrect = [], source = 'practice' }) {
  try {
    const vault = getMistakeVault();
    const now = new Date().toISOString();

    // Record incorrect questions
    incorrect.forEach(qId => {
      if (!qId) return;
      if (!vault[qId]) {
        vault[qId] = {
          qId,
          mistakeCount: 1,
          mastered: false,
          firstMistakeAt: now,
          lastMistakeAt: now,
          source
        };
      } else {
        vault[qId].mistakeCount = (vault[qId].mistakeCount || 0) + 1;
        vault[qId].lastMistakeAt = now;
        vault[qId].mastered = false; // Reset mastered if failed again
      }
    });

    // Mark questions solved correctly as mastered
    correct.forEach(qId => {
      if (vault[qId]) {
        vault[qId].mastered = true;
        vault[qId].lastCorrectAt = now;
      }
    });

    localStorage.setItem(MISTAKE_VAULT_KEY, JSON.stringify(vault));

    // Also update legacy user stats for backward compatibility
    try {
      const statsRaw = localStorage.getItem('gate_ag_user_stats');
      let stats = statsRaw ? JSON.parse(statsRaw) : { attempted: [], correct: [], testHistory: [] };
      if (!Array.isArray(stats.attempted)) stats.attempted = [];
      if (!Array.isArray(stats.correct)) stats.correct = [];

      attempted.forEach(id => {
        if (!stats.attempted.includes(id)) stats.attempted.push(id);
      });
      correct.forEach(id => {
        if (!stats.correct.includes(id)) stats.correct.push(id);
      });
      // Remove any incorrect from correct list
      stats.correct = stats.correct.filter(id => !incorrect.includes(id));

      localStorage.setItem('gate_ag_user_stats', JSON.stringify(stats));
    } catch (e) {}

    return vault;
  } catch (err) {
    console.error('Failed to record question outcomes:', err);
    return getMistakeVault();
  }
}

export function getActiveMistakeIds() {
  const vault = getMistakeVault();
  return Object.values(vault)
    .filter(item => !item.mastered)
    .map(item => item.qId);
}

export function getAllMistakeItems() {
  const vault = getMistakeVault();
  return Object.values(vault);
}

export function removeMistake(qId) {
  const vault = getMistakeVault();
  if (vault[qId]) {
    delete vault[qId];
    localStorage.setItem(MISTAKE_VAULT_KEY, JSON.stringify(vault));
  }
}

export function clearMistakeVault() {
  localStorage.removeItem(MISTAKE_VAULT_KEY);
}
