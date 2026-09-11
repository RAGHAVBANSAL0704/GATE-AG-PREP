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
  getStudentMonthlyEditsStatus,
  getNextMonthlyResetInfo,
  subscribeToStudentProfileSync,
  refreshCurrentStudentProfile,
  fetchStudentProfileFromBackend,
  fetchSecurityQuestionForUser,
  resetPasswordViaSecurityQuestion,
  PRESET_SECURITY_QUESTIONS,
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

  test('handles profile update username and password validation with old password verification', async () => {
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

    // 1. Trying to update new password without old password should fail
    const failNoOld = await updateStudentProfile(reg.student.id, {
      full_name: 'Vikram Singh',
      newPassword: 'newsecurepassword123'
    });
    assert.equal(failNoOld.success, false);
    assert.match(failNoOld.message, /current \(old\) password/i);

    // 2. Trying to update new password with incorrect old password should fail
    const failWrongOld = await updateStudentProfile(reg.student.id, {
      full_name: 'Vikram Singh',
      oldPassword: 'wrongpassword999',
      newPassword: 'newsecurepassword123'
    });
    assert.equal(failWrongOld.success, false);
    assert.match(failWrongOld.message, /incorrect/i);

    // 3. Updating with correct old password (initial DOB 01/01/2000) should succeed
    const updateRes = await updateStudentProfile(reg.student.id, {
      full_name: 'Vikram Singh',
      username: '@vikram_singh_2026',
      oldPassword: '01/01/2000',
      newPassword: 'newsecurepassword123'
    });

    assert.equal(updateRes.success, true);
    assert.equal(updateRes.student.username, 'vikram_singh_2026');

    // 4. Verify login with the newly set password works
    const loginNew = await loginStudent('@vikram_singh_2026', 'newsecurepassword123');
    assert.equal(loginNew.success, true);
    assert.equal(loginNew.student.id, reg.student.id);
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

  test('subscribeToStudentProfileSync returns cleanup function and handles offline session gracefully', async () => {
    const student = {
      id: 'mock_student_sync_1',
      full_name: 'Raghav',
      email: 'raghav@example.com',
      username: 'raghav'
    };

    let receivedUpdate = null;
    const unsub = subscribeToStudentProfileSync(student, (updated) => {
      receivedUpdate = updated;
    });

    assert.equal(typeof unsub, 'function');
    unsub();
  });

  test('refreshCurrentStudentProfile returns current student when backend is unconfigured or offline', async () => {
    const student = {
      id: 'mock_student_sync_2',
      full_name: 'Raghav Bansal',
      email: 'raghav.bansal@example.com'
    };

    localStorage.setItem('gate_ag_prep_session_token', JSON.stringify({
      student,
      savedAt: Date.now()
    }));

    const refreshed = await refreshCurrentStudentProfile();
    assert.equal(refreshed.full_name, 'Raghav Bansal');
  });

  test('enforces strict 3-edit-per-month limit and calculates exact reset date & time', async () => {
    const reg = await registerStudent({
      studentType: 'external',
      fullName: 'Ananya Sharma',
      username: 'ananya_agri',
      gender: 'Female',
      email: 'ananya@agri.edu',
      dob: '2004-03-15',
      collegeName: 'GBPUAT Pantnagar'
    });

    assert.equal(reg.success, true);

    // Initial status should have 3 edits remaining
    const initialStatus = getStudentMonthlyEditsStatus(reg.student);
    assert.equal(initialStatus.editsRemaining, 3);
    assert.equal(initialStatus.isLimitReached, false);
    assert.match(initialStatus.resetInfo.formattedDate, /1 [A-Z][a-z]{2} \d{4}, 12:00 AM IST/);

    // 1st Edit: Update address and city
    const edit1 = await updateStudentProfile(reg.student.id, {
      full_name: 'Ananya Sharma',
      address: 'Hostel 4, Campus',
      city: 'Pantnagar',
      state: 'Uttarakhand',
      bio: 'Aiming for AIR 1 in GATE AG 2027!'
    });
    assert.equal(edit1.success, true);
    assert.equal(edit1.updatesRemaining, 2);
    assert.equal(edit1.student.city, 'Pantnagar');
    assert.equal(edit1.student.bio, 'Aiming for AIR 1 in GATE AG 2027!');

    // 2nd Edit: Update photo URL and target year
    const edit2 = await updateStudentProfile(reg.student.id, {
      profile_photo_url: 'https://example.com/photo.png',
      gate_target_year: 'GATE 2027'
    });
    assert.equal(edit2.success, true);
    assert.equal(edit2.updatesRemaining, 1);
    assert.equal(edit2.student.gate_target_year, 'GATE 2027');

    // 3rd Edit: Switch to faculty/mentor role with department
    const edit3 = await updateStudentProfile(reg.student.id, {
      role: 'faculty',
      is_faculty: true,
      title_prefix: 'Er.',
      department: 'Processing & Food Engineering (PFE / APFE)'
    });
    assert.equal(edit3.success, true);
    assert.equal(edit3.updatesRemaining, 0);
    assert.equal(edit3.student.is_faculty, true);
    assert.equal(edit3.student.role, 'faculty');

    // 4th Edit: Should be rejected because monthly limit is reached
    const edit4 = await updateStudentProfile(reg.student.id, {
      full_name: 'Ananya Sharma (Modified)'
    });
    assert.equal(edit4.success, false);
    assert.match(edit4.message, /Monthly limit reached \(3\/3 edits used\)/);
    assert.ok(edit4.resetInfo);
    assert.match(edit4.resetInfo.formattedDate, /1 [A-Z][a-z]{2} \d{4}, 12:00 AM IST/);
  });

  test('validates PRESET_SECURITY_QUESTIONS list', () => {
    assert.ok(Array.isArray(PRESET_SECURITY_QUESTIONS));
    assert.ok(PRESET_SECURITY_QUESTIONS.length >= 5);
    assert.ok(PRESET_SECURITY_QUESTIONS.some(q => q.includes('Agricultural Engineering')));
  });

  test('supports saving security question & answer and resetting forgotten password', async () => {
    // 1. Register a student
    const reg = await registerStudent({
      studentType: 'external',
      fullName: 'Gaurav Kumar',
      username: 'gaurav_agri',
      gender: 'Male',
      email: 'gaurav@example.com',
      dob: '2001-07-25',
      collegeName: 'IIT Kharagpur'
    });
    assert.equal(reg.success, true);

    // 2. Fetch security question before setting custom one -> falls back to registered DOB challenge
    const defaultQuestRes = await fetchSecurityQuestionForUser('gaurav_agri');
    assert.equal(defaultQuestRes.success, true);
    assert.equal(defaultQuestRes.isDobFallback, true);
    assert.match(defaultQuestRes.question, /Date of Birth/i);

    // 3. User sets a custom security question in profile
    const profileRes = await updateStudentProfile(reg.student.id, {
      security_question: 'What is your dream GATE AG All-India Rank / Goal?',
      security_answer: 'AIR 1'
    });
    assert.equal(profileRes.success, true);
    assert.equal(profileRes.student.security_question, 'What is your dream GATE AG All-India Rank / Goal?');

    // 4. Look up security question using email or @username
    const lookupRes = await fetchSecurityQuestionForUser('@gaurav_agri');
    assert.equal(lookupRes.success, true);
    assert.equal(lookupRes.question, 'What is your dream GATE AG All-India Rank / Goal?');
    assert.equal(lookupRes.isDobFallback, false);

    // 5. Attempt password reset with incorrect answer -> should fail
    const resetFail = await resetPasswordViaSecurityQuestion('gaurav@example.com', 'AIR 100', 'GauravNewPass#2027');
    assert.equal(resetFail.success, false);
    assert.match(resetFail.message, /incorrect/i);

    // 6. Attempt password reset with correct answer (case-insensitive) -> should succeed
    const resetSuccess = await resetPasswordViaSecurityQuestion('gaurav_agri', '  air 1  ', 'GauravNewPass#2027');
    assert.equal(resetSuccess.success, true);
    assert.match(resetSuccess.message, /successfully/i);

    // 7. Test logging in with newly reset password
    const newLogin = await loginStudent('gaurav_agri', 'GauravNewPass#2027');
    assert.equal(newLogin.success, true);
    assert.equal(newLogin.student.full_name, 'Gaurav Kumar');
  });

});
