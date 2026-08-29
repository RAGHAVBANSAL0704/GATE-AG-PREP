/**
 * Profanity & Abusive Content Moderation Subsystem
 * Strictly checks and filters inappropriate words, insults, slurs, and abusive terms
 * across User Registration, Profiles, Community Chat, Feedback, and Q&A.
 */

// Core abusive terms dictionary (English + Hinglish / Hindi transliterated)
const ABUSIVE_WORDS = [
  // General English profanities & insults
  'fuck', 'fucker', 'fucking', 'shit', 'shitty', 'bullshit', 'ass', 'asshole', 'bitch', 'bitching',
  'bastard', 'dick', 'dickhead', 'pussy', 'cunt', 'cock', 'cocksucker', 'prick', 'twat', 'wanker',
  'whore', 'slut', 'motherfucker', 'motherfucking', 'nigger', 'nigga', 'retard', 'idiot', 'dumbass',

  // Hinglish / Hindi abusive terms (transliterated)
  'bhenchod', 'benchod', 'bc', 'madarchod', 'mc', 'gandu', 'gaand', 'gand', 'bhosdike', 'bhosdi',
  'bhosda', 'chutiya', 'chutiye', 'chut', 'harami', 'saala', 'saale', 'kutta', 'kutti', 'kamina',
  'kamine', 'chodd', 'chod', 'raand', 'randi', 'lund', 'lauda', 'lode', 'bhadwa', 'bhadwe',
  'teri maa', 'gaandmaru', 'gaandmariyega', 'tatte', 'tatta'
];

/**
 * Checks whether a given string contains any abusive or profane words.
 * @param {string} text 
 * @returns {boolean}
 */
export function containsAbusiveContent(text) {
  if (!text || typeof text !== 'string') return false;

  const normalized = text
    .toLowerCase()
    .replace(/[\W_]/g, ' ') // replace punctuation, symbols, and underscores with space
    .replace(/\s+/g, ' ');

  const tokens = normalized.split(' ');

  for (const token of tokens) {
    if (ABUSIVE_WORDS.includes(token)) {
      return true;
    }
  }

  // Check for multi-word or substrings for explicit terms
  for (const word of ABUSIVE_WORDS) {
    if (word.length > 2) {
      const regex = new RegExp(`\\b${word}\\b`, 'i');
      if (regex.test(normalized)) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Checks whether a given string contains dangerous HTML tags, script payloads, or XSS vectors.
 * @param {string} text 
 * @returns {boolean}
 */
export function containsDangerousPayload(text) {
  if (!text || typeof text !== 'string') return false;

  const dangerousPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /<script\b/i,
    /<\/script>/i,
    /<iframe\b/i,
    /<object\b/i,
    /<embed\b/i,
    /<applet\b/i,
    /javascript\s*:/i,
    /vbscript\s*:/i,
    /data\s*:\s*text\/html/i,
    /\bon\w+\s*=/i, // onload=, onerror=, onclick=, onmouseover=
    /<svg\b[^>]*\bon\w+/i,
    /<img\b[^>]*\bon\w+/i
  ];

  return dangerousPatterns.some(pattern => pattern.test(text));
}

/**
 * Strips dangerous HTML tags, script execution vectors, and inline event handlers from a string.
 * @param {string} text 
 * @returns {string}
 */
export function stripDangerousHtml(text) {
  if (!text || typeof text !== 'string') return '';

  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<script\b[^>]*>/gi, '')
    .replace(/<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<iframe\b[^>]*>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^>]*>/gi, '')
    .replace(/<applet\b[^>]*>/gi, '')
    .replace(/javascript\s*:/gi, '')
    .replace(/vbscript\s*:/gi, '')
    .replace(/data\s*:\s*text\/html/gi, '')
    .replace(/on\w+\s*=\s*(['"]).*?\1/gi, '')
    .replace(/on\w+\s*=\s*[^>\s]+/gi, '');
}

/**
 * Sanitizes abusive words and strips dangerous HTML/script tags from a string.
 * @param {string} text 
 * @returns {string}
 */
export function sanitizeText(text) {
  if (!text || typeof text !== 'string') return text;

  let sanitized = stripDangerousHtml(text);

  for (const word of ABUSIVE_WORDS) {
    if (word.length <= 2) continue; // avoid over-matching short codes like 'bc' or 'mc' in normal text unless exact word match
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    sanitized = sanitized.replace(regex, '***');
  }

  // Exact word boundary replacement for short codes
  for (const word of ['bc', 'mc']) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    sanitized = sanitized.replace(regex, '**');
  }

  return sanitized;
}

/**
 * Validates a user input field (e.g. Username, Full Name, Chat Message).
 * Returns validity status and error message if inappropriate language or script injection is detected.
 * @param {string} text 
 * @param {string} fieldName 
 * @returns {{ isValid: boolean, message: string | null }}
 */
export function validateCleanInput(text, fieldName = 'Field') {
  if (!text || typeof text !== 'string') return { isValid: true, message: null };

  if (containsDangerousPayload(text)) {
    return {
      isValid: false,
      message: `🚫 Dangerous script or HTML payload detected in ${fieldName}. Please remove all script tags and HTML.`
    };
  }

  if (containsAbusiveContent(text)) {
    return {
      isValid: false,
      message: `🚫 Inappropriate or abusive language detected in ${fieldName}. Please maintain professional standards.`
    };
  }

  return { isValid: true, message: null };
}
