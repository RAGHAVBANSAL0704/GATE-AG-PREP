import { supabase, isSupabaseConfigured } from './supabaseClient';

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

function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return 'h_' + Math.abs(hash).toString(36);
}

export async function registerStudent(formData) {
  const cleanMobile = sanitizeMobileNumber(formData.mobileNumber);
  const defaultPassword = formatDOBPassword(formData.dob);
  const passwordToUse = formData.customPassword && formData.customPassword.trim().length > 0 
    ? formData.customPassword.trim() 
    : defaultPassword;
  
  const passwordHash = simpleHash(passwordToUse);
  const studentType = formData.studentType;
  const cleanEmail = formData.email && formData.email.trim() ? formData.email.trim().toLowerCase() : null;

  const studentPayload = {
    student_type: studentType,
    full_name: formData.fullName.trim(),
    gender: formData.gender || 'Male',
    mobile_number: cleanMobile, // OPTIONAL
    email: cleanEmail,          // OPTIONAL
    email_verified: false,
    dob: formData.dob,
    current_year_sem: formData.currentYearSem,
    admission_no: studentType === 'hau' ? formData.admissionNo.trim().toUpperCase() : null,
    college_name: studentType === 'external' ? formData.collegeName : 'COAET CCS HAU Hisar',
    password_hash: passwordHash,
    has_custom_password: Boolean(formData.customPassword && formData.customPassword.trim()),
    profile_updates_count: 0,
    last_update_timestamp: new Date().toISOString()
  };

  if (isSupabaseConfigured && supabase) {
    // Check duplicates by admission_no or email or mobile (if provided)
    const conditions = [];
    if (studentPayload.admission_no) conditions.push(`admission_no.eq.${studentPayload.admission_no}`);
    if (cleanEmail) conditions.push(`email.eq.${cleanEmail}`);
    if (cleanMobile) conditions.push(`mobile_number.eq.${cleanMobile}`);

    if (conditions.length > 0) {
      const { data: existing } = await supabase
        .from('students')
        .select('id, mobile_number, admission_no, email')
        .or(conditions.join(','));

      if (existing && existing.length > 0) {
        return { 
          success: false, 
          isDuplicate: true, 
          message: 'An account with this Admission No, Email, or Mobile already exists.',
          prefillIdentifier: studentPayload.admission_no || cleanEmail || cleanMobile
        };
      }
    }

    const { data: newStudent, error } = await supabase
      .from('students')
      .insert([studentPayload])
      .select()
      .single();

    if (error) {
      return { success: false, message: error.message };
    }

    const deviceToken = 'dt_' + crypto.randomUUID();
    await supabase.from('device_sessions').insert([{
      student_id: newStudent.id,
      device_token: deviceToken,
      device_info: navigator.userAgent
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
    (studentPayload.admission_no && u.admission_no === studentPayload.admission_no)
  );

  if (duplicate) {
    return {
      success: false,
      isDuplicate: true,
      message: 'An account with this Admission No, Email, or Mobile already exists.',
      prefillIdentifier: studentPayload.admission_no || cleanEmail || cleanMobile
    };
  }

  const mockUser = {
    id: 'user_' + Date.now(),
    ...studentPayload,
    created_at: new Date().toISOString()
  };

  localUsers.push(mockUser);
  localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(localUsers));

  const deviceToken = 'dt_' + Math.random().toString(36).substring(2);
  localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify({
    token: deviceToken,
    student: mockUser,
    savedAt: Date.now()
  }));

  return { success: true, student: mockUser };
}

export async function loginStudent(identifierInput, passwordInput, rememberMe = true) {
  const cleanId = identifierInput.trim();
  const cleanMobile = sanitizeMobileNumber(cleanId);
  const inputHash = simpleHash(passwordInput.trim());

  if (rememberMe) {
    localStorage.setItem(LOCAL_STORAGE_REMEMBER_KEY, cleanId);
  } else {
    localStorage.removeItem(LOCAL_STORAGE_REMEMBER_KEY);
  }

  if (isSupabaseConfigured && supabase) {
    const conditions = [
      `admission_no.eq.${cleanId.toUpperCase()}`,
      `email.eq.${cleanId.toLowerCase()}`,
      `full_name.ilike.%${cleanId}%`
    ];
    if (cleanMobile) conditions.push(`mobile_number.eq.${cleanMobile}`);

    const { data: students, error } = await supabase
      .from('students')
      .select('*')
      .or(conditions.join(','));

    if (error || !students || students.length === 0) {
      return { success: false, message: 'No student account found with these credentials.' };
    }

    const student = students[0];
    const isMatch = student.password_hash === inputHash || 
                    formatDOBPassword(student.dob) === passwordInput.trim();

    if (!isMatch) {
      return { 
        success: false, 
        message: 'Incorrect password. Try your Date of Birth (DD/MM/YYYY) if not changed.' 
      };
    }

    const deviceToken = 'dt_' + crypto.randomUUID();
    await supabase.from('device_sessions').insert([{
      student_id: student.id,
      device_token: deviceToken,
      device_info: navigator.userAgent
    }]);

    localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify({
      token: deviceToken,
      student,
      savedAt: Date.now()
    }));

    return { success: true, student };
  }

  const savedUsersRaw = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
  const localUsers = savedUsersRaw ? JSON.parse(savedUsersRaw) : [];

  const student = localUsers.find(u => 
    (u.email && u.email === cleanId.toLowerCase()) || 
    (cleanMobile && u.mobile_number === cleanMobile) || 
    (u.admission_no && u.admission_no === cleanId.toUpperCase()) ||
    (u.full_name && u.full_name.toLowerCase().includes(cleanId.toLowerCase()))
  );

  if (!student) {
    return { success: false, message: 'No student account found. Please sign up first!' };
  }

  const isMatch = student.password_hash === inputHash || 
                  formatDOBPassword(student.dob) === passwordInput.trim();

  if (!isMatch) {
    return { 
      success: false, 
      message: 'Incorrect password. Default password is your Date of Birth (DD/MM/YYYY).' 
    };
  }

  const deviceToken = 'dt_' + Math.random().toString(36).substring(2);
  localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify({
    token: deviceToken,
    student,
    savedAt: Date.now()
  }));

  return { success: true, student };
}

export async function updateStudentProfile(studentId, updatedFields) {
  const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

  const rawSession = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY);
  if (!rawSession) return { success: false, message: 'No active session found.' };

  const session = JSON.parse(rawSession);
  let currentStudent = session.student;

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
    profile_updates_count: newCount,
    last_update_timestamp: newTimestamp
  };

  if (updatedFields.admission_no) {
    payload.admission_no = updatedFields.admission_no.trim().toUpperCase();
  }

  if (updatedFields.newPassword && updatedFields.newPassword.trim().length >= 6) {
    payload.password_hash = simpleHash(updatedFields.newPassword.trim());
    payload.has_custom_password = true;
  }

  if (isSupabaseConfigured && supabase) {
    const { data: updated, error } = await supabase
      .from('students')
      .update(payload)
      .eq('id', studentId)
      .select()
      .single();

    if (error) return { success: false, message: error.message };

    session.student = updated;
    localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(session));

    return { 
      success: true, 
      student: updated, 
      updatesRemaining: 3 - newCount 
    };
  }

  const updatedUser = {
    ...currentStudent,
    ...payload
  };

  session.student = updatedUser;
  localStorage.setItem(LOCAL_STORAGE_SESSION_KEY, JSON.stringify(session));

  const savedUsersRaw = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
  if (savedUsersRaw) {
    const localUsers = JSON.parse(savedUsersRaw);
    const idx = localUsers.findIndex(u => u.id === studentId);
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
    const raw = localStorage.getItem(LOCAL_STORAGE_SESSION_KEY);
    if (!raw) return null;

    const session = JSON.parse(raw);
    const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
    if (Date.now() - session.savedAt > THIRTY_DAYS_MS) {
      localStorage.removeItem(LOCAL_STORAGE_SESSION_KEY);
      return null;
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
