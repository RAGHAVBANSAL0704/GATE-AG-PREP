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

import { 
  registerStudent, 
  loginStudent, 
  registerFaculty, 
  loginFaculty, 
  updateStudentProfile,
  FACULTY_SALUTATIONS,
  AGRI_ENGG_DEPARTMENTS
} from '../src/services/authService.js';

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

describe('Faculty Authentication & Registration Unit Tests', () => {

  beforeEach(() => {
    localStorage.clear();
  });

  test('validates faculty salutations and department constants', () => {
    assert.ok(FACULTY_SALUTATIONS.includes('Dr.'));
    assert.ok(FACULTY_SALUTATIONS.includes('Er.'));
    assert.ok(FACULTY_SALUTATIONS.includes('Prof.'));
    assert.ok(AGRI_ENGG_DEPARTMENTS.length >= 5);
  });

  test('successfully registers faculty with title Dr., department, and institute', async () => {
    const res = await registerFaculty({
      titlePrefix: 'Dr.',
      fullName: 'Rajesh Kumar',
      department: 'Farm Machinery & Power Engineering (FMPE)',
      institute: 'COAET CCS HAU Hisar',
      mobileNumber: '9876543210',
      email: 'dr.rajesh@hau.ac.in',
      password: 'SecureFacultyPassword123'
    });

    assert.equal(res.success, true);
    assert.equal(res.student.is_faculty, true);
    assert.equal(res.student.role, 'faculty');
    assert.equal(res.student.title_prefix, 'Dr.');
    assert.equal(res.student.full_name, 'Rajesh Kumar');
    assert.equal(res.student.display_name, 'Dr. Rajesh Kumar');
    assert.equal(res.student.department, 'Farm Machinery & Power Engineering (FMPE)');
    assert.equal(res.student.college_name, 'COAET CCS HAU Hisar');
    assert.equal(res.student.email, 'dr.rajesh@hau.ac.in');
  });

  test('successfully registers faculty with title Prof. or Er.', async () => {
    const resProf = await registerFaculty({
      titlePrefix: 'Prof.',
      fullName: 'Sunil Sharma',
      department: 'Soil & Water Conservation Engineering (SWCE)',
      institute: 'IIT Kharagpur',
      mobileNumber: '9812345678',
      email: 'prof.sunil@iitkgp.ac.in',
      password: 'ProfPassword456'
    });

    assert.equal(resProf.success, true);
    assert.equal(resProf.student.title_prefix, 'Prof.');
    assert.equal(resProf.student.display_name, 'Prof. Sunil Sharma');
    assert.equal(resProf.student.is_faculty, true);

    const resEr = await registerFaculty({
      titlePrefix: 'Er.',
      fullName: 'Manish Verma',
      department: 'Processing & Food Engineering (PFE)',
      institute: 'PAU Ludhiana',
      mobileNumber: '9765432109',
      email: 'er.manish@pau.edu',
      password: 'ErPassword789'
    });

    assert.equal(resEr.success, true);
    assert.equal(resEr.student.title_prefix, 'Er.');
    assert.equal(resEr.student.display_name, 'Er. Manish Verma');
    assert.equal(resEr.student.is_faculty, true);
  });

  test('allows faculty login via email, mobile, or username', async () => {
    const reg = await registerFaculty({
      titlePrefix: 'Dr.',
      fullName: 'Anita Malik',
      username: 'dr_anita',
      department: 'Renewable Energy Engineering (REE)',
      institute: 'GBPUAT Pantnagar',
      mobileNumber: '9871122334',
      email: 'anita.malik@gbpuat.ac.in',
      password: 'MalikPassword@2026'
    });

    assert.equal(reg.success, true);

    // Login via email
    const loginEmail = await loginFaculty('anita.malik@gbpuat.ac.in', 'MalikPassword@2026');
    assert.equal(loginEmail.success, true);
    assert.equal(loginEmail.student.display_name, 'Dr. Anita Malik');
    assert.equal(loginEmail.student.is_faculty, true);

    // Login via mobile
    const loginMobile = await loginFaculty('9871122334', 'MalikPassword@2026');
    assert.equal(loginMobile.success, true);
    assert.equal(loginMobile.student.full_name, 'Anita Malik');

    // Login via username
    const loginUser = await loginFaculty('@dr_anita', 'MalikPassword@2026');
    assert.equal(loginUser.success, true);
    assert.equal(loginUser.student.username, 'dr_anita');
  });

  test('rejects faculty registration with duplicate email or mobile', async () => {
    await registerFaculty({
      titlePrefix: 'Dr.',
      fullName: 'Ramesh Chander',
      department: 'Farm Machinery & Power Engineering (FMPE)',
      institute: 'COAET CCS HAU Hisar',
      mobileNumber: '9998887776',
      email: 'dr.ramesh@hau.ac.in',
      password: 'Password123'
    });

    const dupEmail = await registerFaculty({
      titlePrefix: 'Prof.',
      fullName: 'Ramesh Dup',
      department: 'Soil & Water Conservation Engineering (SWCE)',
      institute: 'PAU Ludhiana',
      mobileNumber: '9112223334',
      email: 'dr.ramesh@hau.ac.in',
      password: 'Password456'
    });

    assert.equal(dupEmail.success, false);
    assert.equal(dupEmail.isDuplicate, true);
  });

  test('successfully registers faculty without mobile number and verifies login', async () => {
    const regFaculty = await registerFaculty({
      titlePrefix: 'Prof.',
      fullName: 'Sunil Kumar Rao',
      department: 'Processing & Food Engineering (PFE / APFE)',
      institute: 'IIT Kharagpur',
      email: 'prof.sunil@iitkgp.ac.in',
      password: 'FacultySecret@2026'
    });

    assert.equal(regFaculty.success, true);
    assert.equal(regFaculty.student.mobile_number, null);
    assert.equal(regFaculty.student.is_faculty, true);
    assert.equal(regFaculty.student.display_name, 'Prof. Sunil Kumar Rao');

    // Login using official email
    const loginRes = await loginFaculty('prof.sunil@iitkgp.ac.in', 'FacultySecret@2026');
    assert.equal(loginRes.success, true);
    assert.equal(loginRes.student.id, regFaculty.student.id);

    // Profile update with mobile number
    const updateRes = await updateStudentProfile(regFaculty.student.id, {
      mobile_number: '9811122233'
    });
    assert.equal(updateRes.success, true);
    assert.equal(updateRes.student.mobile_number, '9811122233');

    // Login via newly added mobile
    const loginMobile = await loginFaculty('9811122233', 'FacultySecret@2026');
    assert.equal(loginMobile.success, true);
  });

  test('successfully registers student without mobile number and allows updating mobile later in profile', async () => {
    // 1. Register with NO mobile number provided
    const regNoMobile = await registerStudent({
      studentType: 'external',
      fullName: 'Meera Patel',
      username: 'meera_patel',
      gender: 'Female',
      email: 'meera.patel@agri.edu',
      dob: '2003-04-12',
      collegeName: 'PAU Ludhiana'
    });

    assert.equal(regNoMobile.success, true);
    assert.equal(regNoMobile.student.mobile_number, null);
    assert.equal(regNoMobile.student.email, 'meera.patel@agri.edu');

    // 2. Login using email and default DOB password
    const loginRes = await loginStudent('meera.patel@agri.edu', '12/04/2003');
    assert.equal(loginRes.success, true);
    assert.equal(loginRes.student.username, 'meera_patel');

    // 3. User updates mobile number later in Profile Section
    const profileUpdate = await updateStudentProfile(regNoMobile.student.id, {
      mobile_number: '9876501234'
    });
    assert.equal(profileUpdate.success, true);
    assert.equal(profileUpdate.student.mobile_number, '9876501234');

    // 4. Now user can even log in using the newly updated mobile number
    const loginMobile = await loginStudent('9876501234', '12/04/2003');
    assert.equal(loginMobile.success, true);
    assert.equal(loginMobile.student.id, regNoMobile.student.id);
  });

});
