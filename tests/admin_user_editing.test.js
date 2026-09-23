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

// Mock BroadcastChannel for Node test environment
class MockBroadcastChannel {
  constructor(name) {
    this.name = name;
  }
  postMessage(msg) {}
  addEventListener(event, cb) {}
  removeEventListener(event, cb) {}
}
globalThis.BroadcastChannel = MockBroadcastChannel;

import { 
  adminUpdateUserInfo, 
  adminResetUserPassword,
  getAllRegisteredUsers,
  getModerationAuditLog,
  subscribeToLiveRoleSync,
  subscribeToLiveUserSync
} from '../src/services/userRoleService.js';

describe('Admin User Info Editing & Live Sync Test Suite', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  test('adminUpdateUserInfo edits user personal, academic, and XP information correctly', async () => {
    const student = {
      id: 'stud_456',
      full_name: 'Ananya Sharma',
      email: 'ananya@agri.edu',
      mobile_number: '9876543210',
      college_name: 'GBPUAT Pantnagar',
      department: 'Farm Machinery & Power Engineering (FMPE)',
      gate_target_year: 'GATE 2026',
      xp_points: 150,
      role: 'student'
    };
    localStorage.setItem('gate_ag_prep_mock_users', JSON.stringify([student]));

    const updatePayload = {
      full_name: 'Ananya Sharma (AIR 1)',
      college_name: 'IIT Kharagpur',
      department: 'Soil & Water Conservation Engineering (SWCE)',
      gate_target_year: 'GATE 2027',
      xp_points: 350,
      role: 'solver',
      contributor_badge: 'Verified Solver'
    };

    const res = await adminUpdateUserInfo('stud_456', updatePayload, { name: 'Admin Lead', role: 'admin' });
    assert.equal(res.success, true);

    const allUsers = await getAllRegisteredUsers();
    const updated = allUsers.find(u => u.id === 'stud_456');
    assert.ok(updated);
    assert.equal(updated.full_name, 'Ananya Sharma (AIR 1)');
    assert.equal(updated.college_name, 'IIT Kharagpur');
    assert.equal(updated.department, 'Soil & Water Conservation Engineering (SWCE)');
    assert.equal(updated.gate_target_year, 'GATE 2027');
    assert.equal(updated.xp_points, 350);
    assert.equal(updated.role, 'solver');
    assert.equal(updated.is_solver, true);
    assert.equal(updated.contributor_badge, 'Verified Solver');
  });

  test('adminUpdateUserInfo synchronizes active session if target user is logged in', async () => {
    const activeSession = {
      student: {
        id: 'stud_active_789',
        full_name: 'Rohit Verma',
        email: 'rohit@example.com',
        college_name: 'PAU Ludhiana',
        role: 'student',
        xp_points: 50
      },
      token: 'mock-token'
    };
    localStorage.setItem('gate_ag_prep_session_token', JSON.stringify(activeSession));
    localStorage.setItem('gate_ag_prep_mock_users', JSON.stringify([activeSession.student]));

    const res = await adminUpdateUserInfo('stud_active_789', {
      full_name: 'Rohit Verma, M.Tech',
      college_name: 'IIT Kharagpur',
      xp_points: 500,
      role: 'mentor',
      contributor_badge: 'Academic Mentor'
    });

    assert.equal(res.success, true);

    // Verify session token was updated
    const rawSession = localStorage.getItem('gate_ag_prep_session_token');
    assert.ok(rawSession);
    const parsed = JSON.parse(rawSession);
    assert.equal(parsed.student.full_name, 'Rohit Verma, M.Tech');
    assert.equal(parsed.student.college_name, 'IIT Kharagpur');
    assert.equal(parsed.student.xp_points, 500);
    assert.equal(parsed.student.role, 'mentor');
    assert.equal(parsed.student.is_faculty, true);

    // Verify local XP storage key was updated
    assert.equal(localStorage.getItem('gate_ag_student_xp_data'), '500');
  });

  test('adminUpdateUserInfo logs moderation audit trail with admin credentials', async () => {
    const user = { id: 'stud_mod_1', full_name: 'Test Student', email: 'test@mod.com', role: 'student' };
    localStorage.setItem('gate_ag_prep_mock_users', JSON.stringify([user]));

    await adminUpdateUserInfo('stud_mod_1', { full_name: 'Test Student (Verified)' }, { name: 'Raghav (Lead Admin)', role: 'admin' });

    const auditLog = getModerationAuditLog();
    assert.ok(auditLog.length > 0);
    const lastEntry = auditLog[0];
    assert.equal(lastEntry.actorName, 'Raghav (Lead Admin)');
    assert.equal(lastEntry.action, 'UPDATE_USER_PROFILE');
  });

  test('adminResetUserPassword updates password and records audit entry', async () => {
    const user = { id: 'stud_pwd_1', email: 'user@pwd.com', password_plain: 'oldPass123' };
    localStorage.setItem('gate_ag_prep_mock_users', JSON.stringify([user]));

    // Rejection on too short password
    const shortRes = await adminResetUserPassword('stud_pwd_1', '123');
    assert.equal(shortRes.success, false);

    // Success on valid password
    const okRes = await adminResetUserPassword('stud_pwd_1', 'NewSecurePass@2027', { name: 'Admin', role: 'admin' });
    assert.equal(okRes.success, true);

    const rawUsers = JSON.parse(localStorage.getItem('gate_ag_prep_mock_users'));
    assert.equal(rawUsers[0].password_plain, 'NewSecurePass@2027');
    assert.equal(rawUsers[0].has_custom_password, true);

    const auditLog = getModerationAuditLog();
    const pwdAudit = auditLog.find(l => l.action === 'ADMIN_RESET_PASSWORD');
    assert.ok(pwdAudit);
    assert.equal(pwdAudit.targetUser, 'stud_pwd_1');
  });

  test('subscribeToLiveRoleSync and subscribeToLiveUserSync provide cleanup function', () => {
    const unsub1 = subscribeToLiveRoleSync(() => {});
    assert.equal(typeof unsub1, 'function');
    unsub1();

    const unsub2 = subscribeToLiveUserSync(() => {});
    assert.equal(typeof unsub2, 'function');
    unsub2();
  });

  test('adminUpdateUserInfo gracefully handles invalid input and missing user ID', async () => {
    const emptyRes = await adminUpdateUserInfo(null, {});
    assert.equal(emptyRes.success, false);

    const nonObjRes = await adminUpdateUserInfo('some_id', null);
    assert.equal(nonObjRes.success, false);
  });

});
