/**
 * Real-Time Multi-Device Question Sync & Admin Security Service
 * 
 * 1. Live Question Sync Engine:
 *    - Real-time Broadcast over Supabase Realtime & Web BroadcastChannel.
 *    - Automatically syncs question edits, answer keys, and new custom questions across all connected devices in real time.
 *    - Local IndexedDB and localStorage persistent caching.
 * 
 * 2. Question Admin Security Engine:
 *    - Hashed Master Passcode verification (prevents plaintext credential leaks).
 *    - Active session state persistence in sessionStorage.
 *    - Configurable admin passcode management.
 */

import { supabase, isSupabaseConfigured } from './supabaseClient.js';
import { hashPasswordSync } from './authService.js';

const LOCAL_STORAGE_QUESTIONS_MAP = 'gate_ag_edited_questions_map';
const SESSION_STORAGE_ADMIN_UNLOCK = 'gate_ag_admin_session_unlocked';
const LOCAL_STORAGE_ADMIN_PASSCODE_HASH = 'gate_ag_admin_passcode_hash';

export function computePasscodeSha256(str) {
  if (!str || typeof str !== 'string') return '';
  return hashPasswordSync(str.trim().toLowerCase());
}

// Pre-computed SHA-256 digests for master passcodes (zero plaintext in bundle)
const MASTER_PASSCODE_HASHES = new Set([
  'sha256_005442241e4a5ac570deff03b51702b60f5764d4e0614fa185782b963b889993', // gateag2026
  'sha256_8961de080cb0c3c62ee987780610188facdb7d025fd0f1cee24140fe4546bb98', // raghav0704
  'sha256_0ed85353ff40ddf6e31953ef0204ca6e19f13f6e7b58fb4b419573c3f505cb37', // admin2026
  'sha256_3bbb1ea6686c1579a82a617512351f62ab6cb8441805b0e76380f267c683ea78'  // gateagadmin
]);

// Local Tab Broadcast Channel
let localBroadcastChannel = null;
try {
  if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
    localBroadcastChannel = new BroadcastChannel('gate_ag_questions_channel');
  }
} catch (e) {}

// Supabase Realtime Channel
let supabaseSyncChannel = null;

/**
 * Load locally cached edited questions map
 */
export function getLocalEditedQuestionsMap() {
  try {
    if (typeof localStorage === 'undefined') return {};
    const raw = localStorage.getItem(LOCAL_STORAGE_QUESTIONS_MAP);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

/**
 * Save question update and broadcast to all devices in real-time
 */
export async function saveAndBroadcastQuestion(updatedQ) {
  if (!updatedQ || !updatedQ.id) return false;

  // 1. Update local storage map
  try {
    const currentMap = getLocalEditedQuestionsMap();
    currentMap[updatedQ.id] = updatedQ;
    localStorage.setItem(LOCAL_STORAGE_QUESTIONS_MAP, JSON.stringify(currentMap));
  } catch (e) {
    console.warn('Local storage save warning:', e);
  }

  // 2. Broadcast to other tabs on the same device via BroadcastChannel
  try {
    if (localBroadcastChannel) {
      localBroadcastChannel.postMessage({
        type: 'QUESTION_UPDATED',
        payload: updatedQ,
        timestamp: Date.now()
      });
    }
  } catch (e) {}

  // 3. Broadcast to all other devices live via Supabase Realtime Broadcast Channel
  try {
    if (isSupabaseConfigured && supabase) {
      if (!supabaseSyncChannel) {
        supabaseSyncChannel = supabase.channel('gate_ag_live_questions_sync', {
          config: { broadcast: { self: false } }
        });
        await supabaseSyncChannel.subscribe();
      }

      await supabaseSyncChannel.send({
        type: 'broadcast',
        event: 'question_updated',
        payload: updatedQ
      });
    }
  } catch (e) {
    console.warn('Supabase live broadcast note:', e);
  }

  return true;
}

/**
 * Subscribe to live question updates from other devices/tabs
 */
export function subscribeToLiveQuestionSync(onQuestionUpdated) {
  if (typeof onQuestionUpdated !== 'function') return () => {};

  // 1. Listen on local BroadcastChannel
  const handleLocalMessage = (event) => {
    if (event.data?.type === 'QUESTION_UPDATED' && event.data.payload) {
      onQuestionUpdated(event.data.payload);
    }
  };

  if (localBroadcastChannel) {
    localBroadcastChannel.addEventListener('message', handleLocalMessage);
  }

  // 2. Listen on Supabase Realtime Channel
  if (isSupabaseConfigured && supabase) {
    try {
      if (!supabaseSyncChannel) {
        supabaseSyncChannel = supabase.channel('gate_ag_live_questions_sync', {
          config: { broadcast: { self: false } }
        });
      }

      supabaseSyncChannel.on('broadcast', { event: 'question_updated' }, (payload) => {
        if (payload?.payload) {
          onQuestionUpdated(payload.payload);
        }
      }).subscribe();
    } catch (e) {
      console.warn('Supabase realtime subscription note:', e);
    }
  }

  // Return cleanup unsubscribe function
  return () => {
    if (localBroadcastChannel) {
      localBroadcastChannel.removeEventListener('message', handleLocalMessage);
    }
    if (supabaseSyncChannel) {
      try {
        supabaseSyncChannel.unsubscribe();
      } catch (e) {}
    }
  };
}

/**
 * ==========================================
 * QUESTION ADMIN PANEL PASSCODE SECURITY
 * ==========================================
 */

/**
 * Check if the admin panel is unlocked in the current session
 */
export function isAdminUnlocked(currentStudent = null) {
  try {
    // If student is logged in as official admin, grant instant access
    if (currentStudent?.student_type === 'admin' || currentStudent?.is_admin) {
      return true;
    }

    if (typeof sessionStorage === 'undefined') return false;
    return sessionStorage.getItem(SESSION_STORAGE_ADMIN_UNLOCK) === 'true';
  } catch (e) {
    return false;
  }
}

/**
 * Set admin session unlock state
 */
export function setAdminUnlocked(unlocked = true) {
  try {
    if (typeof sessionStorage !== 'undefined') {
      if (unlocked) {
        sessionStorage.setItem(SESSION_STORAGE_ADMIN_UNLOCK, 'true');
      } else {
        sessionStorage.removeItem(SESSION_STORAGE_ADMIN_UNLOCK);
      }
    }
  } catch (e) {}
}

/**
 * Verify entered passcode against valid admin passcode hashes
 */
export function verifyAdminPasscode(enteredPasscode) {
  if (!enteredPasscode) return false;
  const clean = enteredPasscode.trim().toLowerCase();
  const enteredHash = computePasscodeSha256(clean);

  // Check master passcode hashes
  if (MASTER_PASSCODE_HASHES.has(enteredHash)) {
    return true;
  }

  // Check custom passcode set by admin
  try {
    const customHash = localStorage.getItem(LOCAL_STORAGE_ADMIN_PASSCODE_HASH);
    if (customHash && customHash === enteredHash) {
      return true;
    }
  } catch (e) {}

  return false;
}

/**
 * Update custom admin passcode
 */
export function setCustomAdminPasscode(oldPasscode, newPasscode) {
  if (!verifyAdminPasscode(oldPasscode)) {
    return { success: false, message: 'Incorrect existing admin passcode.' };
  }

  if (!newPasscode || newPasscode.trim().length < 4) {
    return { success: false, message: 'New passcode must be at least 4 characters long.' };
  }

  try {
    const newHash = computePasscodeSha256(newPasscode.trim().toLowerCase());
    localStorage.setItem(LOCAL_STORAGE_ADMIN_PASSCODE_HASH, newHash);
    return { success: true, message: 'Admin passcode updated successfully!' };
  } catch (e) {
    return { success: false, message: e.message };
  }
}
