/**
 * IndexedDB Offline Storage Engine & Data Backup/Restore Subsystem
 * Upgrades standard browser localStorage to high-capacity IndexedDB (`gate_ag_db`).
 * Supports complete offline state persistence, async indexing, and 1-click JSON backup export/import.
 */

const DB_NAME = 'gate_ag_prep_db';
const DB_VERSION = 2;

let dbInstance = null;

/**
 * Initialize IndexedDB database and object stores
 * @returns {Promise<IDBDatabase>}
 */
export function initDB() {
  return new Promise((resolve, reject) => {
    if (dbInstance) {
      resolve(dbInstance);
      return;
    }

    if (typeof window === 'undefined' || !window.indexedDB) {
      console.warn('IndexedDB not supported in environment, using localStorage fallback.');
      resolve(null);
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // 1. Test Attempts Store
      if (!db.objectStoreNames.contains('test_attempts')) {
        const attemptStore = db.createObjectStore('test_attempts', { keyPath: 'id', autoIncrement: true });
        attemptStore.createIndex('date', 'date', { unique: false });
        attemptStore.createIndex('year', 'year', { unique: false });
      }

      // 2. User Bookmarks Store
      if (!db.objectStoreNames.contains('bookmarks')) {
        db.createObjectStore('bookmarks', { keyPath: 'questionId' });
      }

      // 3. SM-2 Flashcards Store
      if (!db.objectStoreNames.contains('flashcards')) {
        db.createObjectStore('flashcards', { keyPath: 'cardId' });
      }

      // 4. Community Chat Messages Store
      if (!db.objectStoreNames.contains('chat_messages')) {
        const chatStore = db.createObjectStore('chat_messages', { keyPath: 'id' });
        chatStore.createIndex('channel', 'channel', { unique: false });
        chatStore.createIndex('timestamp', 'timestamp', { unique: false });
      }

      // 5. Community Discussions Store
      if (!db.objectStoreNames.contains('community_posts')) {
        const postStore = db.createObjectStore('community_posts', { keyPath: 'id' });
        postStore.createIndex('category', 'category', { unique: false });
      }

      // 6. Syllabus Progress Store
      if (!db.objectStoreNames.contains('syllabus_progress')) {
        db.createObjectStore('syllabus_progress', { keyPath: 'topicKey' });
      }

      // 7. Edited & Custom Questions Store
      if (!db.objectStoreNames.contains('edited_questions')) {
        db.createObjectStore('edited_questions', { keyPath: 'id' });
      }
    };

    request.onsuccess = (event) => {
      dbInstance = event.target.result;
      resolve(dbInstance);
    };

    request.onerror = (event) => {
      console.error('IndexedDB open error:', event.target.error);
      resolve(null); // Fallback to localStorage
    };
  });
}

/**
 * Save an item to an IndexedDB store
 */
export async function saveToIDB(storeName, item) {
  try {
    const db = await initDB();
    if (!db) return false;

    return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const req = store.put(item);

      req.onsuccess = () => resolve(true);
      req.onerror = () => resolve(false);
    });
  } catch (e) {
    console.error(`Error saving to IDB store ${storeName}:`, e);
    return false;
  }
}

/**
 * Get all items from an IndexedDB store
 */
export async function getAllFromIDB(storeName) {
  try {
    const db = await initDB();
    if (!db) return [];

    return new Promise((resolve) => {
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const req = store.getAll();

      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => resolve([]);
    });
  } catch (e) {
    console.error(`Error reading from IDB store ${storeName}:`, e);
    return [];
  }
}

/**
 * Export complete offline prep data (Stats, Attempts, Bookmarks, Syllabus, Flashcards) as a JSON payload
 */
export async function exportFullDataJSON() {
  const attempts = await getAllFromIDB('test_attempts');
  const flashcards = await getAllFromIDB('flashcards');
  const chatMessages = await getAllFromIDB('chat_messages');
  const posts = await getAllFromIDB('community_posts');
  const editedQuestions = await getAllFromIDB('edited_questions');
  const rawLocalAttempts = localStorage.getItem('gate_ag_prep_test_attempts');

  let localStats = {};
  let localBookmarks = [];
  let localProgress = {};
  let parsedLocalAttempts = [];

  try {
    localStats = JSON.parse(localStorage.getItem('gate_ag_user_stats') || '{}');
    localBookmarks = JSON.parse(localStorage.getItem('gate_ag_bookmarks') || '[]');
    localProgress = JSON.parse(localStorage.getItem('gate_ag_progress') || '{}');
    parsedLocalAttempts = rawLocalAttempts ? JSON.parse(rawLocalAttempts) : [];
  } catch (e) {
    // fallback
  }

  // Merge IndexedDB attempts and LocalStorage attempts deduplicated by client_attempt_id
  const attemptMap = new Map();
  (attempts || []).forEach(a => { if (a?.client_attempt_id) attemptMap.set(a.client_attempt_id, a); });
  (parsedLocalAttempts || []).forEach(a => { if (a?.client_attempt_id) attemptMap.set(a.client_attempt_id, a); });
  const unifiedAttempts = Array.from(attemptMap.values());

  const exportData = {
    app: 'GATE AG Prep Web Portal',
    version: '2.0',
    exportTimestamp: new Date().toISOString(),
    userStats: localStats,
    testHistory: unifiedAttempts.length > 0 ? unifiedAttempts : (localStats.testHistory || []),
    bookmarks: localBookmarks,
    syllabusProgress: localProgress,
    flashcardsState: flashcards,
    communityPosts: posts,
    chatMessages: chatMessages,
    editedQuestions: editedQuestions
  };

  return JSON.stringify(exportData, null, 2);
}

/**
 * Import complete offline prep data from a JSON string
 */
export async function importFullDataJSON(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    if (!data || data.app !== 'GATE AG Prep Web Portal') {
      return { success: false, message: 'Invalid backup file format.' };
    }

    if (data.userStats) {
      localStorage.setItem('gate_ag_user_stats', JSON.stringify(data.userStats));
    }
    if (Array.isArray(data.bookmarks)) {
      localStorage.setItem('gate_ag_bookmarks', JSON.stringify(data.bookmarks));
    }
    if (data.syllabusProgress) {
      localStorage.setItem('gate_ag_progress', JSON.stringify(data.syllabusProgress));
    }

    if (Array.isArray(data.testHistory)) {
      for (const att of data.testHistory) {
        await saveToIDB('test_attempts', att);
      }
      localStorage.setItem('gate_ag_prep_test_attempts', JSON.stringify(data.testHistory.slice(0, 100)));
    }

    if (Array.isArray(data.flashcardsState)) {
      for (const fc of data.flashcardsState) {
        await saveToIDB('flashcards', fc);
      }
    }

    if (Array.isArray(data.editedQuestions)) {
      for (const eq of data.editedQuestions) {
        await saveToIDB('edited_questions', eq);
      }
    }

    return { success: true, message: 'Data imported successfully! Reloading...' };
  } catch (e) {
    return { success: false, message: 'Failed to parse backup JSON file: ' + e.message };
  }
}
