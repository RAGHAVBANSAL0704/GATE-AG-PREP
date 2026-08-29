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
try {
  Object.defineProperty(globalThis, 'navigator', {
    value: { userAgent: 'node-test-agent' },
    writable: true,
    configurable: true
  });
} catch (e) {
  // Ignore if navigator is non-configurable
}

import { registerStudent, loginStudent, updateStudentProfile } from '../src/services/authService.js';

describe('Username Sign-Up & Authentication Unit Tests', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  test('rejects registration when username is empty or invalid', async () => {
    const resEmpty = await registerStudent({
      studentType: 'visitor',
      fullName: 'Aman Kumar',
      username: '',
      gender: 'Male',
      mobileNumber: '9876543210',
      email: 'aman@example.com',
      dob: '2002-05-15'
    });
    assert.equal(resEmpty.success, false);
    assert.match(resEmpty.message, /valid username/i);

    const resShort = await registerStudent({
      studentType: 'visitor',
      fullName: 'Aman Kumar',
      username: 'ab',
      gender: 'Male',
      mobileNumber: '9876543210',
      email: 'aman@example.com',
      dob: '2002-05-15'
    });
    assert.equal(resShort.success, false);
    assert.match(resShort.message, /at least 3/i);
  });

  test('successfully registers student with valid username (with or without @ prefix)', async () => {
    const res = await registerStudent({
      studentType: 'visitor',
      fullName: 'Aman Kumar',
      username: '@amankumar2026',
      gender: 'Male',
      mobileNumber: '9876543210',
      email: 'aman@example.com',
      dob: '2002-05-15'
    });

    assert.equal(res.success, true);
    assert.equal(res.student.username, 'amankumar2026');
    assert.equal(res.student.full_name, 'Aman Kumar');
  });

  test('detects duplicate username registration', async () => {
    await registerStudent({
      studentType: 'visitor',
      fullName: 'Aman Kumar',
      username: 'amankumar',
      gender: 'Male',
      mobileNumber: '9876543210',
      email: 'aman@example.com',
      dob: '2002-05-15'
    });

    const resDup = await registerStudent({
      studentType: 'visitor',
      fullName: 'Rohan Sharma',
      username: '@AMANKUMAR',
      gender: 'Male',
      mobileNumber: '9123456789',
      email: 'rohan@example.com',
      dob: '2001-08-20'
    });

    assert.equal(resDup.success, false);
    assert.equal(resDup.isDuplicate, true);
    assert.match(resDup.message, /already taken/i);
  });

  test('allows student to log in using @username or plain username', async () => {
    await registerStudent({
      studentType: 'visitor',
      fullName: 'Sneha Verma',
      username: 'sneha_gate',
      gender: 'Female',
      mobileNumber: '9988776655',
      email: 'sneha@example.com',
      dob: '2003-12-10'
    });

    // Default password is DOB formatted DD/MM/YYYY => 10/12/2003
    const loginWithAt = await loginStudent('@sneha_gate', '10/12/2003');
    assert.equal(loginWithAt.success, true);
    assert.equal(loginWithAt.student.username, 'sneha_gate');

    const loginPlain = await loginStudent('sneha_gate', '10/12/2003');
    assert.equal(loginPlain.success, true);
    assert.equal(loginPlain.student.username, 'sneha_gate');
  });

  test('handles profile update username and password validation', async () => {
    const reg = await registerStudent({
      studentType: 'visitor',
      fullName: 'Vikram Singh',
      username: 'vikram_s',
      gender: 'Male',
      mobileNumber: '9888877777',
      email: 'vikram@example.com',
      dob: '2000-01-01'
    });

    assert.equal(reg.success, true);

    const updateRes = await updateStudentProfile(reg.student.id, {
      full_name: 'Vikram Singh',
      username: '@vikram_singh_2026',
      newPassword: 'newsecurepassword123'
    });

    assert.equal(updateRes.success, true);
    assert.equal(updateRes.student.username, 'vikram_singh_2026');
  });

});
