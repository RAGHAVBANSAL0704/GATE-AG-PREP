import { supabase, isSupabaseConfigured } from './supabaseClient.js';
import { validateCleanInput } from '../utils/profanityFilter.js';
import { syncPendingTestAttempts } from './testAttemptService.js';

const LOCAL_STORAGE_SESSION_KEY = 'gate_ag_prep_session_token';
const LOCAL_STORAGE_USERS_KEY = 'gate_ag_prep_mock_users';
const LOCAL_STORAGE_REMEMBER_KEY = 'gate_ag_prep_remembered_id';

// Helper: Sanitize Mobile Number
export function sanitizeMobileNumber(input) {
  if (!input || !input.trim()) return null;
  let digits = input.replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    digits = digits.slice(2);
  } else if (digits.length === 11 && digits.startsWith('0')) {
    digits = digits.slice(1);
  }
  return digits.length > 0 ? digits : null;
}

// Helper: Format DOB to DD/MM/YYYY
export function formatDOBPassword(dobString) {
  if (!dobString) return '';
  const parts = dobString.split('-');
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${day}/${month}/${year}`;
  }
  return dobString;
}

export const FACULTY_SALUTATIONS = [
  'Dr.',
  'Er.',
  'Prof.',
  'Dr. (Prof.)',
  'Mr.',
  'Ms.'
];

export const AGRI_ENGG_DEPARTMENTS = [
  'Farm Machinery & Power Engineering (FMPE)',
  'Soil & Water Conservation Engineering (SWCE)',
  'Processing & Food Engineering (PFE / APFE)',
  'Renewable Energy Engineering (REE)',
  'Irrigation & Drainage Engineering (IDE)',
  'Dairy & Food Process Engineering',
  'Post-Harvest Engineering & Technology',
  'Hydrology & Water Resources Engineering',
  'Aquacultural & Environmental Engineering',
  'Agricultural Automation, Precision Farming & AI',
  'Basic Engineering & Applied Mathematics / Physics',
  'Agronomy, Soil Science & Plant Sciences',
  'Other / Allied Department'
];

// Automatic sync for all user data (Profile, Password, XP, Question attempts) to Supabase backend
export async function syncAllUserDataToBackend() {
  if (!isSupabaseConfigured || !supabase) return;

  try {
    // 1. Sync local users
    await syncLocalUsersToSupabase();

    // 2. Sync current active student session XP and Break XP
    const rawSession = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY);
    if (rawSession) {
      const session = JSON.parse(rawSession);
      const student = session?.student;
      if (student?.id) {
        const localAcademicXP = Number(localStorage.getItem('gate_ag_student_xp_data') || 0);
        const localBreakXP = Number(localStorage.getItem('gate_ag_break_xp') || 0);

        const updatePayload = {};
        if (localAcademicXP > 0) updatePayload.xp_points = localAcademicXP;
        if (localBreakXP > 0) updatePayload.break_xp = localBreakXP;

        if (Object.keys(updatePayload).length > 0) {
          await supabase.from('students').update(updatePayload).eq('id', student.id);
        }
      }
    }

    // 3. Sync local offline test attempts safely via idempotent upsert
    await syncPendingTestAttempts();
  } catch (e) {
    console.warn("Backend user data sync warning:", e);
  }
}

// Automatic sync for any local offline registrations to Supabase
export async function syncLocalUsersToSupabase() {
  if (!isSupabaseConfigured || !supabase) return;

  try {
    const savedUsersRaw = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
    if (!savedUsersRaw) return;

    const localUsers = JSON.parse(savedUsersRaw);
    if (!Array.isArray(localUsers) || localUsers.length === 0) return;

    const remainingUnsynced = [];

    for (const u of localUsers) {
      if (!u.full_name) continue;

      const payload = {
        student_type: u.student_type || 'hau',
        full_name: u.full_name,
        username: u.username ? u.username.trim().replace(/^@/, '').toLowerCase() : null,
        gender: u.gender || 'Male',
        mobile_number: u.mobile_number || null,
        email: u.email || null,
        email_verified: false,
        dob: u.dob,
        current_year_sem: u.current_year_sem,
        admission_no: u.admission_no || null,
        college_name: u.college_name || 'COAET CCS HAU Hisar',
        password_hash: u.password_hash,
        has_custom_password: Boolean(u.has_custom_password),
        profile_updates_count: 0
      };

      // Check existing before sync insert
      const conditions = [];
      if (payload.admission_no) conditions.push(`admission_no.eq.${payload.admission_no}`);
      if (payload.email) conditions.push(`email.eq.${payload.email}`);
      if (payload.mobile_number) conditions.push(`mobile_number.eq.${payload.mobile_number}`);
      if (payload.username) conditions.push(`username.eq.${payload.username}`);

      let isExisting = false;
      if (conditions.length > 0) {
        let { data: existing, error: checkErr } = await supabase
          .from('students')
          .select('id')
          .or(conditions.join(','));

        if (checkErr && checkErr.message && checkErr.message.includes('username')) {
          const fallbackConditions = conditions.filter(c => !c.startsWith('username.eq.'));
          if (fallbackConditions.length > 0) {
            const res = await supabase
              .from('students')
              .select('id')
              .or(fallbackConditions.join(','));
            existing = res.data;
          } else {
            existing = null;
          }
        }

        if (existing && existing.length > 0) isExisting = true;
      }

      if (!isExisting) {
        let { error: insertErr } = await supabase.from('students').insert([payload]);
        if (insertErr && insertErr.message && insertErr.message.includes('username')) {
          const fallbackPayload = { ...payload };
          delete fallbackPayload.username;
          const retryRes = await supabase.from('students').insert([fallbackPayload]);
          insertErr = retryRes.error;
        }

        if (insertErr) {
          console.warn("Failed to sync user to Supabase, keeping in offline queue:", u.full_name, insertErr.message);
          remainingUnsynced.push(u);
        }
      }
    }

    if (remainingUnsynced.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(remainingUnsynced));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_USERS_KEY);
    }
  } catch (e) {
    console.error("Local user migration error:", e);
  }
}

// Validate COAET CCS HAU Admission Number formats
export function validateHAUAdmissionNo(admNo) {
  if (!admNo || !admNo.trim()) return { isValid: false, message: 'Admission number is required' };
  
  const clean = admNo.trim().toUpperCase().replace(/[\s-]/g, '');
  const yearMatch = clean.match(/^(\d{4})/);
  
  if (!yearMatch) {
    return { isValid: false, message: 'Must start with a 4-digit year (e.g., 2022)' };
  }

  const year = parseInt(yearMatch[1], 10);
  const currentYear = new Date().getFullYear();
  
  if (year < 1987 || year > currentYear) {
    return { isValid: false, message: `Admission year must be between 1987 and ${currentYear}` };
  }

  const format1Regex = /^\d{4}AE\d{2}BIV$/;
  const format2Regex = /^\d{4}AE\d{2}B\(?L\)?II$/;
  const format3Regex = /^\d{4}AE\d{2}BIV\(?R\)?$/;

  if (format1Regex.test(clean) || format2Regex.test(clean) || format3Regex.test(clean)) {
    return { isValid: true, cleanCode: clean };
  }

  if (clean.includes('AE')) {
    return { isValid: true, cleanCode: clean };
  }

  return { 
    isValid: false, 
    message: 'Expected format: e.g. 2022AE01BIV, 2022AE05BLII, or 2022AE05BIV(R)' 
  };
}

const PASSWORD_SALT = 'gate_ag_prep_salt_v1';

// Pure JS SHA-256 implementation (standard, deterministic 256-bit hash)
function sha256Pure(ascii) {
  function rightRotate(value, amount) {
    return (value >>> amount) | (value << (32 - amount));
  }
  
  const mathPow = Math.pow;
  const maxWord = mathPow(2, 32);
  let lengthProperty = 'length';
  let i, j;
  let result = '';

  const words = [];
  const asciiBitLength = ascii[lengthProperty] * 8;
  
  let hash = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
  ];
  
  const k = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  ];

  for (i = 0; i < asciiBitLength; i += 8) {
    words[i >> 5] |= (ascii.charCodeAt(i / 8) & 0xff) << (24 - (i % 32));
  }
  words[asciiBitLength >> 5] |= 0x80 << (24 - (asciiBitLength % 32));
  words[(((asciiBitLength + 64) >> 9) << 4) + 15] = asciiBitLength;
  
  for (i = 0; i < words[lengthProperty]; i += 16) {
    const w = [];
    for (j = 0; j < 16; j++) {
      w[j] = words[i + j] || 0;
    }
    for (j = 16; j < 64; j++) {
      const s0 = rightRotate(w[j - 15], 7) ^ rightRotate(w[j - 15], 18) ^ (w[j - 15] >>> 3);
      const s1 = rightRotate(w[j - 2], 17) ^ rightRotate(w[j - 2], 19) ^ (w[j - 2] >>> 10);
      w[j] = (w[j - 16] + s0 + w[j - 7] + s1) | 0;
    }
    
    let a = hash[0];
    let b = hash[1];
    let c = hash[2];
    let d = hash[3];
    let e = hash[4];
    let f = hash[5];
    let g = hash[6];
    let h = hash[7];

    for (j = 0; j < 64; j++) {
      const S1 = rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25);
      const ch = (e & f) ^ ((~e) & g);
      const temp1 = (h + S1 + ch + k[j] + w[j]) | 0;
      const S0 = rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22);
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const temp2 = (S0 + maj) | 0;

      h = g;
      g = f;
      f = e;
      e = (d + temp1) | 0;
      d = c;
      c = b;
      b = a;
      a = (temp1 + temp2) | 0;
    }

    hash[0] = (hash[0] + a) | 0;
    hash[1] = (hash[1] + b) | 0;
    hash[2] = (hash[2] + c) | 0;
    hash[3] = (hash[3] + d) | 0;
    hash[4] = (hash[4] + e) | 0;
    hash[5] = (hash[5] + f) | 0;
    hash[6] = (hash[6] + g) | 0;
    hash[7] = (hash[7] + h) | 0;
  }

  for (i = 0; i < 8; i++) {
    for (j = 3; j >= 0; j--) {
      const b = (hash[i] >> (8 * j)) & 255;
      result += (b < 16 ? '0' : '') + b.toString(16);
    }
  }
  return result;
}

// Cryptographic Salted SHA-256 Hash using Web Crypto API with synchronous fallback
export async function hashPassword(password, salt = PASSWORD_SALT) {
  if (password === null || password === undefined) password = '';
  const str = String(password);
  const combined = str + ':' + salt;

  if (typeof globalThis !== 'undefined' && globalThis.crypto?.subtle) {
    try {
      const enc = new TextEncoder();
      const data = enc.encode(combined);
      const digestBuffer = await globalThis.crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(digestBuffer));
      return 'sha256_' + hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
      // Fall through to deterministic pure JS SHA-256 fallback
    }
  }

  return 'sha256_' + sha256Pure(combined);
}

// Synchronous password hash helper
export function hashPasswordSync(password, salt = PASSWORD_SALT) {
  if (password === null || password === undefined) password = '';
  const combined = String(password) + ':' + salt;
  return 'sha256_' + sha256Pure(combined);
}

// Legacy hash function for backward compatibility verification of existing accounts
function legacySimpleHash(str) {
  if (!str) return 'h_0';
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return 'h_' + Math.abs(hash).toString(36);
}

// Verify password against secure hash, legacy simpleHash, or formatted DOB
export async function verifyPassword(passwordInput, student) {
  if (!student) return false;
  const cleanInput = (passwordInput || '').trim();
  const secureHash = await hashPassword(cleanInput);
  const legacyHash = legacySimpleHash(cleanInput);
  const dobPassword = formatDOBPassword(student.dob);

  // 1. Direct match on new secure salted SHA-256 hash
  if (student.password_hash === secureHash) {
    return true;
  }

  // 2. Legacy simpleHash match (for existing accounts registered before upgrade)
  if (student.password_hash === legacyHash) {
    return true;
  }

  // 3. Default Date of Birth (DD/MM/YYYY) password match
  if (dobPassword && cleanInput === dobPassword) {
    return true;
  }

  // 4. Default DOB matching stored legacy or new hash of DOB
  if (dobPassword) {
    if (student.password_hash === legacySimpleHash(dobPassword)) {
      if (cleanInput === dobPassword) return true;
    }
    const secureDobHash = await hashPassword(dobPassword);
    if (student.password_hash === secureDobHash && cleanInput === dobPassword) {
      return true;
    }
  }

  return false;
}

export async function registerStudent(formData) {
  // Profanity / Abusive Language Validation
  const nameVal = validateCleanInput(formData.fullName, 'Full Name');
  if (!nameVal.isValid) return { success: false, message: nameVal.message };

  if (formData.username) {
    const userVal = validateCleanInput(formData.username, 'Username');
    if (!userVal.isValid) return { success: false, message: userVal.message };
  }

  if (formData.collegeName) {
    const collegeVal = validateCleanInput(formData.collegeName, 'College Name');
    if (!collegeVal.isValid) return { success: false, message: collegeVal.message };
  }

  const cleanMobile = sanitizeMobileNumber(formData.mobileNumber);
  const cleanEmail = formData.email && formData.email.trim() ? formData.email.trim().toLowerCase() : null;

  if (!cleanEmail) {
    return { success: false, message: 'Email address is required for registration.' };
  }
  if (!cleanMobile || cleanMobile.length < 10) {
    return { success: false, message: 'Valid 10-digit mobile number is required for registration.' };
  }

  const defaultPassword = formatDOBPassword(formData.dob);
  const passwordToUse = formData.customPassword && formData.customPassword.trim().length > 0 
    ? formData.customPassword.trim() 
    : defaultPassword;
  
  const passwordHash = await hashPassword(passwordToUse);
  const studentType = formData.studentType;

  const cleanUsername = formData.username ? formData.username.trim().replace(/^@/, '').toLowerCase().replace(/[^a-z0-9_]/g, '') : null;
  if (!cleanUsername || cleanUsername.length < 3) {
    return { success: false, message: 'A valid username (at least 3 alphanumeric characters/underscores) is required for registration.' };
  }

  const studentPayload = {
    student_type: studentType,
    full_name: formData.fullName.trim(),
    username: cleanUsername,
    gender: formData.gender || 'Male',
    mobile_number: cleanMobile,
    email: cleanEmail,
    email_verified: false,
    dob: formData.dob,
    current_year_sem: formData.currentYearSem || (studentType === 'visitor' ? 'Visitor Guest' : '3rd Year / 6th Sem'),
    admission_no: studentType === 'hau' && formData.admissionNo ? formData.admissionNo.trim().toUpperCase() : null,
    college_name: studentType === 'visitor'
      ? 'Guest Visitor / GATE AG Aspirant'
      : (studentType === 'external' ? formData.collegeName : 'COAET CCS HAU Hisar'),
    password_hash: passwordHash,
    has_custom_password: Boolean(formData.customPassword && formData.customPassword.trim()),
    profile_updates_count: 0,
    last_update_timestamp: new Date().toISOString()
  };

  if (isSupabaseConfigured && supabase) {
    // Check duplicates by admission_no, email, mobile, or username
    const conditions = [];
    if (studentPayload.admission_no) conditions.push(`admission_no.eq.${studentPayload.admission_no}`);
    if (cleanEmail) conditions.push(`email.eq.${cleanEmail}`);
    if (cleanMobile) conditions.push(`mobile_number.eq.${cleanMobile}`);
    if (cleanUsername) conditions.push(`username.eq.${cleanUsername}`);

    if (conditions.length > 0) {
      let { data: existing, error: checkErr } = await supabase
        .from('students')
        .select('id, mobile_number, admission_no, email, username')
        .or(conditions.join(','));

      if (checkErr && checkErr.message && checkErr.message.includes('username')) {
        const fallbackConditions = conditions.filter(c => !c.startsWith('username.eq.'));
        if (fallbackConditions.length > 0) {
          const res = await supabase
            .from('students')
            .select('id, mobile_number, admission_no, email')
            .or(fallbackConditions.join(','));
          existing = res.data;
        } else {
          existing = null;
        }
      }

      if (existing && existing.length > 0) {
        const isUserDup = existing.some(e => e.username && e.username.toLowerCase() === cleanUsername);
        return { 
          success: false, 
          isDuplicate: true, 
          message: isUserDup 
            ? `The username "@${cleanUsername}" is already taken. Please choose a different username.`
            : 'An account with this Admission No, Email, or Mobile already exists.',
          prefillIdentifier: cleanUsername || studentPayload.admission_no || cleanEmail || cleanMobile
        };
      }
    }

    let { data: newStudent, error } = await supabase
      .from('students')
      .insert([studentPayload])
      .select()
      .single();

    if (error && error.message && error.message.includes('username')) {
      const payloadNoUser = { ...studentPayload };
      delete payloadNoUser.username;
      const retryRes = await supabase
        .from('students')
        .insert([payloadNoUser])
        .select()
        .single();
      newStudent = retryRes.data;
      error = retryRes.error;
    }

    if (error) {
      return { success: false, message: error.message };
    }

    delete newStudent.password_plain;

    const deviceToken = 'dt_' + (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2));
    await supabase.from('device_sessions').insert([{
      student_id: newStudent.id,
      device_token: deviceToken,
      device_info: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown'
    }]);

    localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify({
      token: deviceToken,
      student: newStudent,
      savedAt: Date.now()
    }));

    return { success: true, student: newStudent };
  }

  // --- LOCAL FALLBACK MODE ---
  const savedUsersRaw = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
  const localUsers = savedUsersRaw ? JSON.parse(savedUsersRaw) : [];

  const duplicate = localUsers.find(u => 
    (cleanEmail && u.email === cleanEmail) || 
    (cleanMobile && u.mobile_number === cleanMobile) ||
    (cleanUsername && u.username && u.username.toLowerCase() === cleanUsername) ||
    (studentPayload.admission_no && u.admission_no === studentPayload.admission_no)
  );

  if (duplicate) {
    const isUserDup = duplicate.username && duplicate.username.toLowerCase() === cleanUsername;
    return {
      success: false,
      isDuplicate: true,
      message: isUserDup 
        ? `The username "@${cleanUsername}" is already taken. Please choose a different username.`
        : 'An account with this Admission No, Email, or Mobile already exists.',
      prefillIdentifier: cleanUsername || studentPayload.admission_no || cleanEmail || cleanMobile
    };
  }

  const mockUser = {
    id: 'user_' + Date.now(),
    ...studentPayload,
    created_at: new Date().toISOString()
  };
  delete mockUser.password_plain;

  localUsers.push(mockUser);
  localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(localUsers));

  const deviceToken = 'dt_' + (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2));
  localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify({
    token: deviceToken,
    student: mockUser,
    savedAt: Date.now()
  }));

  return { success: true, student: mockUser };
}

export async function registerFaculty(formData) {
  const titlePrefix = formData.titlePrefix || 'Dr.';
  const cleanFullName = (formData.fullName || '').trim();

  // Profanity Validation
  const nameVal = validateCleanInput(cleanFullName, 'Full Name');
  if (!nameVal.isValid) return { success: false, message: nameVal.message };

  if (formData.username) {
    const userVal = validateCleanInput(formData.username, 'Username');
    if (!userVal.isValid) return { success: false, message: userVal.message };
  }

  if (formData.department) {
    const deptVal = validateCleanInput(formData.department, 'Department');
    if (!deptVal.isValid) return { success: false, message: deptVal.message };
  }

  if (formData.institute) {
    const instVal = validateCleanInput(formData.institute, 'Institute');
    if (!instVal.isValid) return { success: false, message: instVal.message };
  }

  const cleanMobile = sanitizeMobileNumber(formData.mobileNumber);
  const cleanEmail = formData.email && formData.email.trim() ? formData.email.trim().toLowerCase() : null;

  if (!cleanEmail) {
    return { success: false, message: 'Email address is required for faculty registration.' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) {
    return { success: false, message: 'Please enter a valid email address (e.g. faculty@university.edu or gmail.com).' };
  }

  if (!cleanMobile || cleanMobile.length < 10) {
    return { success: false, message: 'Valid 10-digit mobile number is required for faculty registration.' };
  }

  const department = formData.department ? formData.department.trim() : 'Agricultural Engineering';
  const institute = formData.institute ? formData.institute.trim() : 'COAET CCS HAU Hisar';

  // Auto-generate clean username if omitted or format given one
  let cleanUsername = formData.username 
    ? formData.username.trim().replace(/^@/, '').toLowerCase().replace(/[^a-z0-9_]/g, '') 
    : '';
  if (!cleanUsername || cleanUsername.length < 3) {
    const prefixKey = titlePrefix.toLowerCase().replace(/[^a-z]/g, '');
    const nameKey = cleanFullName.toLowerCase().replace(/[^a-z0-9]/g, '_').substring(0, 15);
    cleanUsername = `${prefixKey}_${nameKey}_${cleanMobile.slice(-4)}`;
  }

  const plainPassword = formData.password && formData.password.trim().length >= 6
    ? formData.password.trim()
    : (formData.customPassword && formData.customPassword.trim().length >= 6 ? formData.customPassword.trim() : `Faculty@${cleanMobile.slice(-4)}`);

  const passwordHash = await hashPassword(plainPassword);

  const facultyPayload = {
    role: 'faculty',
    is_faculty: true,
    title_prefix: titlePrefix,
    student_type: 'faculty',
    full_name: cleanFullName,
    display_name: `${titlePrefix} ${cleanFullName}`,
    username: cleanUsername,
    gender: formData.gender || 'Male',
    department: department,
    college_name: institute,
    institute: institute,
    dob: formData.dob || '1990-01-01',
    current_year_sem: `Faculty • ${department}`,
    mobile_number: cleanMobile,
    email: cleanEmail,
    email_verified: true,
    admission_no: `FAC-${cleanMobile.slice(-4)}`,
    password_hash: passwordHash,
    has_custom_password: true,
    profile_updates_count: 0,
    last_update_timestamp: new Date().toISOString()
  };

  if (isSupabaseConfigured && supabase) {
    // Check duplicates by email, mobile, or username
    const conditions = [];
    if (cleanEmail) conditions.push(`email.eq.${cleanEmail}`);
    if (cleanMobile) conditions.push(`mobile_number.eq.${cleanMobile}`);
    if (cleanUsername) conditions.push(`username.eq.${cleanUsername}`);

    if (conditions.length > 0) {
      let { data: existing, error: checkErr } = await supabase
        .from('students')
        .select('id, mobile_number, email, username')
        .or(conditions.join(','));

      if (checkErr && checkErr.message && checkErr.message.includes('username')) {
        const fallbackConditions = conditions.filter(c => !c.startsWith('username.eq.'));
        if (fallbackConditions.length > 0) {
          const res = await supabase
            .from('students')
            .select('id, mobile_number, email')
            .or(fallbackConditions.join(','));
          existing = res.data;
        }
      }

      if (existing && existing.length > 0) {
        const isUserDup = existing.some(e => e.username && e.username.toLowerCase() === cleanUsername);
        return { 
          success: false, 
          isDuplicate: true, 
          message: isUserDup 
            ? `The username "@${cleanUsername}" is already in use. Please choose a different username.`
            : 'An account with this Email or Mobile number already exists.',
          prefillIdentifier: cleanUsername || cleanEmail || cleanMobile
        };
      }
    }

    let { data: newFaculty, error } = await supabase
      .from('students')
      .insert([facultyPayload])
      .select()
      .single();

    if (error && error.message && error.message.includes('username')) {
      const payloadNoUser = { ...facultyPayload };
      delete payloadNoUser.username;
      const retryRes = await supabase
        .from('students')
        .insert([payloadNoUser])
        .select()
        .single();
      newFaculty = retryRes.data;
      error = retryRes.error;
    }

    if (error) {
      // Fallback to local user registration if table schema restricts faculty columns
      console.warn("Supabase faculty insert fallback to local user:", error.message);
    } else if (newFaculty) {
      delete newFaculty.password_plain;
      const deviceToken = 'dt_' + (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2));
      
      try {
        await supabase.from('device_sessions').insert([{
          student_id: newFaculty.id,
          device_token: deviceToken,
          device_info: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown'
        }]);
      } catch (e) {
        // Safe ignore
      }

      localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify({
        token: deviceToken,
        student: newFaculty,
        savedAt: Date.now()
      }));

      return { success: true, student: newFaculty };
    }
  }

  // Local fallback storage
  const savedUsersRaw = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
  const localUsers = savedUsersRaw ? JSON.parse(savedUsersRaw) : [];

  const duplicate = localUsers.find(u => 
    (cleanEmail && u.email === cleanEmail) || 
    (cleanMobile && u.mobile_number === cleanMobile) ||
    (cleanUsername && u.username && u.username.toLowerCase() === cleanUsername)
  );

  if (duplicate) {
    const isUserDup = duplicate.username && duplicate.username.toLowerCase() === cleanUsername;
    return {
      success: false,
      isDuplicate: true,
      message: isUserDup 
        ? `The username "@${cleanUsername}" is already in use.`
        : 'An account with this Email or Mobile number already exists.',
      prefillIdentifier: cleanUsername || cleanEmail || cleanMobile
    };
  }

  const mockFaculty = {
    id: 'fac_' + Date.now(),
    ...facultyPayload,
    created_at: new Date().toISOString()
  };
  delete mockFaculty.password_plain;

  localUsers.push(mockFaculty);
  localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(localUsers));

  const deviceToken = 'dt_' + (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2));
  localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify({
    token: deviceToken,
    student: mockFaculty,
    savedAt: Date.now()
  }));

  return { success: true, student: mockFaculty };
}

export async function loginFaculty(identifierInput, passwordInput, rememberMe = true) {
  return loginStudent(identifierInput, passwordInput, rememberMe);
}

export async function loginStudent(identifierInput, passwordInput, rememberMe = true) {
  const cleanId = (identifierInput || '').trim();
  const cleanMobile = sanitizeMobileNumber(cleanId);
  const cleanUsername = cleanId.replace(/^@/, '').toLowerCase().replace(/[^a-z0-9_]/g, '');
  const cleanEmail = cleanId.includes('@') && !cleanId.startsWith('@') ? cleanId.toLowerCase() : null;
  const cleanAdmNo = cleanId.toUpperCase();

  if (rememberMe) {
    localStorage.setItem(LOCAL_STORAGE_REMEMBER_KEY, cleanId);
  } else {
    localStorage.removeItem(LOCAL_STORAGE_REMEMBER_KEY);
  }

  if (isSupabaseConfigured && supabase) {
    const conditions = [];
    if (cleanAdmNo) conditions.push(`admission_no.eq.${cleanAdmNo}`);
    if (cleanEmail) conditions.push(`email.eq.${cleanEmail}`);
    if (cleanMobile) conditions.push(`mobile_number.eq.${cleanMobile}`);
    if (cleanUsername && cleanUsername.length >= 3) conditions.push(`username.eq.${cleanUsername}`);

    if (conditions.length === 0) {
      return { success: false, message: 'Please enter a valid username, email, mobile number, or admission number.' };
    }

    let { data: students, error } = await supabase
      .from('students')
      .select('*')
      .or(conditions.join(','));

    if (error && error.message && error.message.includes('username')) {
      const fallbackConditions = conditions.filter(c => !c.startsWith('username.eq.'));
      if (fallbackConditions.length > 0) {
        const retryRes = await supabase
          .from('students')
          .select('*')
          .or(fallbackConditions.join(','));
        students = retryRes.data;
        error = retryRes.error;
      }
    }

    if (error || !students || students.length === 0) {
      return { success: false, message: 'No student account found with these credentials.' };
    }

    // Require exact match on one of the unique credential identifiers
    const student = students.find(s => 
      (cleanUsername && cleanUsername.length >= 3 && s.username && s.username.toLowerCase() === cleanUsername) ||
      (cleanEmail && s.email && s.email.toLowerCase() === cleanEmail) ||
      (cleanMobile && s.mobile_number && s.mobile_number === cleanMobile) ||
      (cleanAdmNo && s.admission_no && s.admission_no.toUpperCase() === cleanAdmNo)
    ) || students[0];

    const isMatch = await verifyPassword(passwordInput, student);

    if (!isMatch) {
      return { 
        success: false, 
        message: 'Incorrect password. Try your Date of Birth (DD/MM/YYYY) if not changed.' 
      };
    }

    const safeStudent = { ...student };
    delete safeStudent.password_plain;

    // Upgrade hash if account is using legacy hash
    const currentSecureHash = await hashPassword(passwordInput.trim());
    if (safeStudent.password_hash !== currentSecureHash) {
      safeStudent.password_hash = currentSecureHash;
      supabase.from('students').update({ password_hash: currentSecureHash }).eq('id', safeStudent.id).then();
    }

    const deviceToken = 'dt_' + (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2));
    await supabase.from('device_sessions').insert([{
      student_id: safeStudent.id,
      device_token: deviceToken,
      device_info: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown'
    }]);

    // Restore accumulated XP points to local cache so points are never lost across devices
    if (safeStudent.xp_points !== undefined && safeStudent.xp_points !== null) {
      const existingLocalXP = Number(localStorage.getItem('gate_ag_student_xp_data') || 0);
      const mergedXP = Math.max(existingLocalXP, Number(safeStudent.xp_points));
      localStorage.setItem('gate_ag_student_xp_data', String(mergedXP));
      safeStudent.xp_points = mergedXP;
    }
    if (safeStudent.break_xp !== undefined && safeStudent.break_xp !== null) {
      const existingLocalBreakXP = Number(localStorage.getItem('gate_ag_break_xp') || 0);
      const mergedBreakXP = Math.max(existingLocalBreakXP, Number(safeStudent.break_xp));
      localStorage.setItem('gate_ag_break_xp', String(mergedBreakXP));
      safeStudent.break_xp = mergedBreakXP;
    }

    localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify({
      token: deviceToken,
      student: safeStudent,
      savedAt: Date.now()
    }));

    return { success: true, student: safeStudent };
  }

  const savedUsersRaw = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
  const localUsers = savedUsersRaw ? JSON.parse(savedUsersRaw) : [];

  const student = localUsers.find(u => 
    (cleanUsername && cleanUsername.length >= 3 && u.username && u.username.toLowerCase() === cleanUsername) ||
    (cleanEmail && u.email && u.email.toLowerCase() === cleanEmail) || 
    (cleanMobile && u.mobile_number === cleanMobile) || 
    (cleanAdmNo && u.admission_no && u.admission_no.toUpperCase() === cleanAdmNo)
  );

  if (!student) {
    return { success: false, message: 'No student account found. Please sign up first!' };
  }

  const isMatch = await verifyPassword(passwordInput, student);

  if (!isMatch) {
    return { 
      success: false, 
      message: 'Incorrect password. Default password is your Date of Birth (DD/MM/YYYY).' 
    };
  }

  const safeStudent = { ...student };
  delete safeStudent.password_plain;

  // Upgrade local user hash
  const currentSecureHash = await hashPassword(passwordInput.trim());
  if (safeStudent.password_hash !== currentSecureHash) {
    safeStudent.password_hash = currentSecureHash;
    const idx = localUsers.findIndex(u => u.id === safeStudent.id);
    if (idx !== -1) {
      localUsers[idx] = { ...safeStudent };
      localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(localUsers));
    }
  }

  const deviceToken = 'dt_' + (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2));
  localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify({
    token: deviceToken,
    student: safeStudent,
    savedAt: Date.now()
  }));

  return { success: true, student: safeStudent };
}

export async function updateStudentProfile(studentId, updatedFields) {
  // Profanity / Abusive Language Validation for profile updates
  if (updatedFields.full_name) {
    const fnVal = validateCleanInput(updatedFields.full_name, 'Full Name');
    if (!fnVal.isValid) return { success: false, message: fnVal.message };
  }
  if (updatedFields.username) {
    const unVal = validateCleanInput(updatedFields.username, 'Username');
    if (!unVal.isValid) return { success: false, message: unVal.message };
  }
  if (updatedFields.address) {
    const addrVal = validateCleanInput(updatedFields.address, 'Address');
    if (!addrVal.isValid) return { success: false, message: addrVal.message };
  }
  if (updatedFields.college_name) {
    const colVal = validateCleanInput(updatedFields.college_name, 'College Name');
    if (!colVal.isValid) return { success: false, message: colVal.message };
  }

  const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

  const rawSession = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY);
  if (!rawSession) return { success: false, message: 'No active session found.' };

  const session = JSON.parse(rawSession);
  let currentStudent = session.student;
  delete currentStudent.password_plain;

  let count = currentStudent.profile_updates_count || 0;
  let lastUpdate = currentStudent.last_update_timestamp 
    ? new Date(currentStudent.last_update_timestamp).getTime() 
    : 0;

  if (Date.now() - lastUpdate > ONE_WEEK_MS) {
    count = 0;
  }

  if (count >= 3) {
    return {
      success: false,
      message: '🔒 Weekly limit reached! You can only update your profile 3 times per week.'
    };
  }

  const newCount = count + 1;
  const newTimestamp = new Date().toISOString();

  const payload = {
    full_name: updatedFields.full_name,
    gender: updatedFields.gender || currentStudent.gender || 'Male',
    mobile_number: sanitizeMobileNumber(updatedFields.mobile_number),
    email: updatedFields.email ? updatedFields.email.trim().toLowerCase() : currentStudent.email,
    dob: updatedFields.dob,
    current_year_sem: updatedFields.current_year_sem,
    college_name: updatedFields.college_name,
    address: updatedFields.address || null,
    profile_photo_url: updatedFields.profile_photo_url || null,
    title_prefix: updatedFields.title_prefix || currentStudent.title_prefix || null,
    department: updatedFields.department || currentStudent.department || null,
    institute: updatedFields.institute || updatedFields.college_name || currentStudent.institute || null,
    is_faculty: Boolean(updatedFields.is_faculty || currentStudent.is_faculty),
    role: updatedFields.role || currentStudent.role || (currentStudent.is_faculty ? 'faculty' : 'student'),
    display_name: updatedFields.title_prefix && updatedFields.full_name 
      ? `${updatedFields.title_prefix} ${updatedFields.full_name}` 
      : (currentStudent.display_name || updatedFields.full_name),
    profile_updates_count: newCount,
    last_update_timestamp: newTimestamp
  };

  if (updatedFields.admission_no) {
    payload.admission_no = updatedFields.admission_no.trim().toUpperCase();
  }

  if (updatedFields.username) {
    const formattedUsername = updatedFields.username.trim().replace(/^@/, '').toLowerCase();
    if (formattedUsername) {
      if (isSupabaseConfigured && supabase) {
        try {
          const { data: existingUser, error: checkErr } = await supabase
            .from('students')
            .select('id, username')
            .eq('username', formattedUsername)
            .neq('id', studentId)
            .maybeSingle();

          if (!checkErr && existingUser) {
            return { success: false, message: `Username "@${formattedUsername}" is already taken by another user.` };
          }
        } catch (e) {
          // Ignore schema cache errors when username column is missing in backend DB
        }
      }
      const savedUsersRaw = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
      if (savedUsersRaw) {
        const localUsers = JSON.parse(savedUsersRaw);
        const duplicateLocal = localUsers.find(u => u.id !== studentId && u.username && u.username.toLowerCase() === formattedUsername);
        if (duplicateLocal) {
          return { success: false, message: `Username "@${formattedUsername}" is already taken by another user.` };
        }
      }
      payload.username = formattedUsername;
    }
  }

  if (updatedFields.newPassword && updatedFields.newPassword.trim().length >= 6) {
    const plainPwd = updatedFields.newPassword.trim();
    payload.password_hash = await hashPassword(plainPwd);
    payload.has_custom_password = true;
  }

  if (isSupabaseConfigured && supabase) {
    let updated = null;
    let error = null;

    // 1. Try updating by exact ID first
    if (studentId) {
      const res = await supabase
        .from('students')
        .update(payload)
        .eq('id', studentId)
        .select()
        .maybeSingle();
      updated = res.data;
      error = res.error;
    }

    // 2. If no row updated by ID (e.g. legacy local ID), find matching student in Supabase by admission_no, email, mobile, or username
    if (!updated) {
      const matchConditions = [];
      if (currentStudent?.admission_no) matchConditions.push(`admission_no.eq.${currentStudent.admission_no}`);
      if (currentStudent?.email) matchConditions.push(`email.eq.${currentStudent.email}`);
      if (currentStudent?.mobile_number) matchConditions.push(`mobile_number.eq.${currentStudent.mobile_number}`);
      if (currentStudent?.username) matchConditions.push(`username.eq.${currentStudent.username}`);

      if (matchConditions.length > 0) {
        const { data: matched } = await supabase
          .from('students')
          .select('id')
          .or(matchConditions.join(','))
          .maybeSingle();

        if (matched?.id) {
          const res = await supabase
            .from('students')
            .update(payload)
            .eq('id', matched.id)
            .select()
            .maybeSingle();
          updated = res.data;
          error = res.error;
        }
      }
    }

    // 3. Fallback if schema cache is missing 'username' column
    if ((error && error.message && error.message.includes('username')) || (!updated && payload.username)) {
      const payloadNoUser = { ...payload };
      delete payloadNoUser.username;
      
      const targetId = updated?.id || studentId;
      let retryRes = await supabase
        .from('students')
        .update(payloadNoUser)
        .eq('id', targetId)
        .select()
        .maybeSingle();

      if (!retryRes.data && currentStudent?.email) {
        retryRes = await supabase
          .from('students')
          .update(payloadNoUser)
          .eq('email', currentStudent.email)
          .select()
          .maybeSingle();
      }

      if (retryRes.data) {
        updated = { ...retryRes.data, username: payload.username };
        error = null;
      }
    }

    if (error && !updated) {
      return { success: false, message: error.message };
    }

    if (updated) {
      delete updated.password_plain;
      session.student = updated;
      localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(session));

      // Also update local mock users array if present
      const savedUsersRaw = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
      if (savedUsersRaw) {
        const localUsers = JSON.parse(savedUsersRaw);
        const idx = localUsers.findIndex(u => u.id === studentId || u.email === updated.email || u.admission_no === updated.admission_no);
        if (idx !== -1) {
          localUsers[idx] = { ...localUsers[idx], ...updated };
          localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(localUsers));
        }
      }

      return { 
        success: true, 
        student: updated, 
        updatesRemaining: 3 - newCount 
      };
    }
  }

  const updatedUser = {
    ...currentStudent,
    ...payload
  };
  delete updatedUser.password_plain;

  session.student = updatedUser;
  localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(session));

  const savedUsersRaw = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
  if (savedUsersRaw) {
    const localUsers = JSON.parse(savedUsersRaw);
    const idx = localUsers.findIndex(u => u.id === studentId || u.email === updatedUser.email || u.admission_no === updatedUser.admission_no);
    if (idx !== -1) {
      localUsers[idx] = updatedUser;
      localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(localUsers));
    }
  }

  return { 
    success: true, 
    student: updatedUser, 
    updatesRemaining: 3 - newCount 
  };
}

export function checkCurrentSession() {
  try {
    // Automatically sync all user data (Profile, Passwords, Attempts, Leaderboards) to Supabase
    syncAllUserDataToBackend();

    const raw = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY);
    if (!raw) return null;

    const session = JSON.parse(raw);
    const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
    if (Date.now() - session.savedAt > THIRTY_DAYS_MS) {
      localStorage.removeItem(LOCAL_STORAGE_SESSION_KEY);
      return null;
    }
    if (session?.student) {
      delete session.student.password_plain;
    }
    return session.student;
  } catch (e) {
    return null;
  }
}

export function logoutStudent() {
  localStorage.removeItem(LOCAL_STORAGE_SESSION_KEY);
}

export function getRememberedIdentifier() {
  return localStorage.getItem(LOCAL_STORAGE_REMEMBER_KEY) || '';
}

