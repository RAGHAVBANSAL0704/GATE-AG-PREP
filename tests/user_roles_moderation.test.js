import { test, describe, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

// Mock localStorage for Node test environment
const mockStorage = new Map();
globalThis.localStorage = {
  getItem: (key) => mockStorage.get(key) || null,
  setItem: (key, val) => mockStorage.set(key, String(val)),
  removeItem: (key) => mockStorage.delete(key),
  clear: () => mockStorage.clear()
};

import { 
  canModerate, 
  getAllRegisteredUsers, 
  updateUserRole, 
  banUser, 
  unbanUser, 
  isUserBanned, 
  getBannedUsers,
  USER_ROLES
} from '../src/services/userRoleService.js';

describe('User Roles & Moderation Unit Tests', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  test('validates canModerate permission matrix', () => {
    // Normal student => no mod perks
    assert.equal(canModerate({ role: 'student', is_faculty: false }), false);
    assert.equal(canModerate(null), false);

    // Promoted Solver => has mod perks (delete, ban)
    assert.equal(canModerate({ role: 'solver' }), true);
    assert.equal(canModerate({ is_solver: true }), true);

    // Faculty Mentor => has mod perks
    assert.equal(canModerate({ role: 'mentor' }), true);

    // Admin => has mod perks
    assert.equal(canModerate({ role: 'admin' }), true);
    assert.equal(canModerate({ is_admin: true }), true);
  });

  test('updates user role to Solver and assigns contributor badge', async () => {
    // Pre-seed a mock student
    const studentObj = {
      id: 'stud_123',
      full_name: 'Harsh Vardhan',
      username: 'harsh_v',
      email: 'harsh@example.com',
      role: 'student'
    };
    localStorage.setItem('gate_ag_prep_mock_users', JSON.stringify([studentObj]));

    const res = await updateUserRole('stud_123', 'solver', 'Verified Solver');
    assert.equal(res.success, true);
    assert.equal(res.role, 'solver');
    assert.equal(res.contributor_badge, 'Verified Solver');

    const allUsers = await getAllRegisteredUsers();
    const updated = allUsers.find(u => u.id === 'stud_123');
    assert.ok(updated);
    assert.equal(updated.role, 'solver');
    assert.equal(updated.is_solver, true);
    assert.equal(updated.contributor_badge, 'Verified Solver');
  });

  test('updates user role to Faculty Mentor and persists', async () => {
    const facultyObj = {
      id: 'fac_999',
      full_name: 'Dr. Ramesh Kumar',
      email: 'ramesh@hau.ac.in',
      role: 'faculty',
      is_faculty: true
    };
    localStorage.setItem('gate_ag_prep_mock_users', JSON.stringify([facultyObj]));

    const res = await updateUserRole('fac_999', 'mentor', 'Academic Mentor');
    assert.equal(res.success, true);
    assert.equal(res.role, 'mentor');

    const allUsers = await getAllRegisteredUsers();
    const mentor = allUsers.find(u => u.id === 'fac_999');
    assert.ok(mentor);
    assert.equal(mentor.role, 'mentor');
    assert.equal(mentor.is_mentor, true);
  });

  test('handles banUser, isUserBanned, and unbanUser properly', () => {
    const abusiveStudent = {
      id: 'stud_bad_1',
      username: 'toxic_user',
      email: 'toxic@example.com',
      full_name: 'Toxic User'
    };

    assert.equal(isUserBanned(abusiveStudent), false);

    // Ban user
    banUser(abusiveStudent, 'Abusive message in lounge');
    assert.equal(isUserBanned(abusiveStudent), true);
    assert.equal(isUserBanned({ username: 'toxic_user' }), true);
    assert.equal(isUserBanned({ email: 'toxic@example.com' }), true);

    const bannedList = getBannedUsers();
    assert.equal(bannedList.length, 1);
    assert.equal(bannedList[0].username, 'toxic_user');

    // Unban user
    unbanUser('stud_bad_1');
    assert.equal(isUserBanned(abusiveStudent), false);
    assert.equal(getBannedUsers().length, 0);
  });

});
